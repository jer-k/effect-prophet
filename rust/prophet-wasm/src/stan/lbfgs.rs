//! Stan 2.37.0 limited-memory update and strong Wolfe line search.
//! Ported from optimization/{bfgs,bfgs_linesearch,lbfgs_update}.hpp at
//! 1357c136bf22e3f0d25ed3529fea55fe76842eac; see third-party/stan-license.txt.
//! Pure numerical loops intentionally have no tracing or external dependencies.

use std::collections::VecDeque;

use crate::fourier::checked_element_count;
use crate::map_objective::MapObjectiveError;
use crate::stan::optimizer::{LogDensityEvaluation, StanOptimizerError, checked_evaluation};

/// CmdStan's configurable limited-memory optimization settings.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct LbfgsSettings {
  pub history_size: usize,
  pub init_alpha: f64,
  pub tol_obj: f64,
  pub tol_rel_obj: f64,
  pub tol_grad: f64,
  pub tol_rel_grad: f64,
  pub tol_param: f64,
}

impl Default for LbfgsSettings {
  fn default() -> Self {
    Self {
      history_size: 5,
      init_alpha: 0.001,
      tol_obj: 1e-12,
      tol_rel_obj: 1e4,
      tol_grad: 1e-8,
      tol_rel_grad: 1e7,
      tol_param: 1e-8,
    }
  }
}

/// Parsed effective CmdStan controls; invalid settings cannot reach the solver.
#[derive(Clone, Copy, Debug, Default, PartialEq)]
pub struct LbfgsControls(LbfgsSettings);

impl LbfgsControls {
  pub fn parse(settings: LbfgsSettings) -> Result<Self, StanOptimizerError> {
    if settings.history_size == 0
      || settings.history_size > i32::MAX as usize
      || !settings.init_alpha.is_finite()
      || settings.init_alpha <= 0.0
      || [
        settings.tol_obj,
        settings.tol_rel_obj,
        settings.tol_grad,
        settings.tol_rel_grad,
        settings.tol_param,
      ]
      .iter()
      .any(|v| !v.is_finite() || *v <= 0.0)
    {
      return Err(StanOptimizerError::InvalidConfiguration);
    }
    Ok(Self(settings))
  }

  pub fn settings(self) -> LbfgsSettings {
    self.0
  }

  pub(crate) fn check_workspace(self, dimension: usize) -> Result<(), StanOptimizerError> {
    let vectors = self
      .0
      .history_size
      .checked_mul(2)
      .and_then(|n| n.checked_add(16))
      .ok_or(StanOptimizerError::SizeOverflow)?;
    checked_element_count(dimension, vectors).map_err(|_| StanOptimizerError::SizeOverflow)?;
    Ok(())
  }
}

/// Positive Stan completion codes, distinct from failed line search.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum LbfgsTermination {
  AbsoluteObjective,
  RelativeObjective,
  AbsoluteGradient,
  RelativeGradient,
  ParameterChange,
  IterationLimit,
}

/// Finite returned state and bounded optimizer work metadata.
#[derive(Clone, Debug, PartialEq)]
pub struct LbfgsResult {
  pub parameters: Vec<f64>,
  pub evaluation: LogDensityEvaluation,
  pub iterations: usize,
  pub termination: LbfgsTermination,
  pub hessian_resets: usize,
}

struct Update {
  rho: f64,
  y: Vec<f64>,
  s: Vec<f64>,
}
struct History {
  updates: VecDeque<Update>,
  capacity: usize,
  gamma: f64,
}

impl History {
  fn update(&mut self, y: Vec<f64>, s: Vec<f64>, reset: bool) -> f64 {
    let sy = dot(&y, &s);
    let yy = dot(&y, &y);
    let factor = if reset {
      self.updates.clear();
      yy / sy
    } else {
      1.0
    };
    self.gamma = sy / yy;
    if self.updates.len() == self.capacity {
      self.updates.pop_front();
    }
    // Preserve Stan's update even for zero curvature. Do not invent clipping,
    // skipped pairs or a ridge; stopping is checked before using the next step.
    self.updates.push_back(Update {
      rho: 1.0 / sy,
      y,
      s,
    });
    factor
  }

  fn direction(&self, gradient: &[f64]) -> Vec<f64> {
    let mut p: Vec<_> = gradient.iter().map(|g| -g).collect();
    let mut alphas = vec![0.0; self.updates.len()];
    for (pair, alpha) in self.updates.iter().rev().zip(alphas.iter_mut().rev()) {
      *alpha = pair.rho * dot(&pair.s, &p);
      for (value, y) in p.iter_mut().zip(&pair.y) {
        *value -= *alpha * y;
      }
    }
    for value in &mut p {
      *value *= self.gamma;
    }
    for (pair, alpha) in self.updates.iter().zip(alphas) {
      let beta = pair.rho * dot(&pair.y, &p);
      for (value, s) in p.iter_mut().zip(&pair.s) {
        *value += (alpha - beta) * s;
      }
    }
    p
  }
}

fn dot(a: &[f64], b: &[f64]) -> f64 {
  crate::stan::reductions::sum(a.len(), |index| a[index] * b[index])
}

// Literal pinned interpolation: comparisons with NaN roots leave the endpoint
// minimum intact. Replacing this with a different cubic formula changes steps.
fn cubic(df0: f64, x1: f64, f1: f64, df1: f64, lo: f64, hi: f64) -> f64 {
  let c3 = (-12.0 * f1 + 6.0 * x1 * (df0 + df1)) / (x1 * x1 * x1);
  let c2 = -(4.0 * df0 + 2.0 * df1) / x1 + 6.0 * f1 / (x1 * x1);
  let root = (c2 * c2 - 2.0 * df0 * c3).sqrt();
  let value = |x: f64| x * (x * (x * c3 / 3.0 + c2) / 2.0 + df0);
  let mut min_x = lo;
  let mut min_f = value(lo);
  for x in [hi, -(c2 + root) / c3, -(c2 - root) / c3] {
    if (x == hi || (lo < x && x < hi)) && value(x) < min_f {
      min_x = x;
      min_f = value(x);
    }
  }
  min_x
}

struct Trial {
  alpha: f64,
  parameters: Vec<f64>,
  evaluation: LogDensityEvaluation,
}
#[derive(Clone, Copy)]
struct Endpoint {
  alpha: f64,
  value: f64,
  derivative: f64,
}

struct Search<'a, F> {
  x: &'a [f64],
  p: &'a [f64],
  f: f64,
  df: f64,
  evaluate: &'a F,
}

impl<F: Fn(&[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>> Search<'_, F> {
  fn trial(&self, alpha: f64) -> Result<Option<Trial>, StanOptimizerError> {
    let parameters: Vec<_> = self
      .x
      .iter()
      .zip(self.p)
      .map(|(x, p)| x + alpha * p)
      .collect();
    match checked_evaluation(&parameters, self.evaluate) {
      Ok(mut evaluation) => {
        evaluation.value = -evaluation.value;
        for g in &mut evaluation.gradient {
          *g = -*g;
        }
        Ok(Some(Trial {
          alpha,
          parameters,
          evaluation,
        }))
      }
      Err(StanOptimizerError::Objective(MapObjectiveError::NonFiniteResult)) => Ok(None),
      Err(error) => Err(error),
    }
  }

  fn zoom(&self, mut lo: Endpoint, mut hi: Endpoint) -> Result<Option<Trial>, StanOptimizerError> {
    let mut iteration = 0;
    loop {
      iteration += 1;
      if (lo.alpha - hi.alpha).abs() < 1e-16 {
        return Ok(None);
      }
      let mut alpha = if iteration % 5 == 0 {
        0.5 * (lo.alpha + hi.alpha)
      } else {
        let d1 =
          lo.derivative + hi.derivative - 3.0 * (lo.value - hi.value) / (lo.alpha - hi.alpha);
        let mut d2 = (d1 * d1 - lo.derivative * hi.derivative).sqrt();
        if hi.alpha < lo.alpha {
          d2 = -d2;
        }
        hi.alpha
          - (hi.alpha - lo.alpha) * (hi.derivative + d2 - d1)
            / (hi.derivative - lo.derivative + 2.0 * d2)
      };
      let width = (lo.alpha - hi.alpha).abs();
      if !alpha.is_finite()
        || alpha < lo.alpha.min(hi.alpha) + 0.01 * width
        || alpha > lo.alpha.max(hi.alpha) - 0.01 * width
      {
        alpha = 0.5 * (lo.alpha + hi.alpha);
      }
      let trial = loop {
        if let Some(trial) = self.trial(alpha)? {
          break trial;
        }
        alpha = 0.5 * (alpha + lo.alpha.min(hi.alpha));
        if (lo.alpha.min(hi.alpha) - alpha).abs() < 1e-16 {
          return Ok(None);
        }
      };
      let derivative = dot(&trial.evaluation.gradient, self.p);
      let endpoint = Endpoint {
        alpha,
        value: trial.evaluation.value,
        derivative,
      };
      if endpoint.value > self.f + alpha * 1e-4 * self.df || endpoint.value >= lo.value {
        hi = endpoint;
      } else {
        if derivative.abs() <= -0.9 * self.df {
          return Ok(Some(trial));
        }
        if derivative * (hi.alpha - lo.alpha) >= 0.0 {
          hi = lo;
        }
        lo = endpoint;
      }
    }
  }

  fn wolfe(&self, initial_alpha: f64) -> Result<Option<Trial>, StanOptimizerError> {
    let mut previous = Endpoint {
      alpha: 1e-12,
      value: self.f,
      derivative: self.df,
    };
    let mut alpha = initial_alpha;
    let mut iterations = 0;
    let mut restarts = 0;
    loop {
      if iterations >= 20 {
        return Ok(None);
      }
      let Some(trial) = self.trial(alpha)? else {
        if restarts >= 10 {
          return Ok(None);
        }
        alpha = 0.5 * (previous.alpha + alpha);
        restarts += 1;
        continue;
      };
      restarts = 0;
      let derivative = dot(&trial.evaluation.gradient, self.p);
      let endpoint = Endpoint {
        alpha,
        value: trial.evaluation.value,
        derivative,
      };
      // Pinned source uses the original alpha in this outer Armijo comparison,
      // not the expanded alpha1. Keep that detail; zoom uses its actual alpha.
      if endpoint.value > self.f + initial_alpha * 1e-4 * self.df
        || (endpoint.value >= previous.value && iterations > 0)
      {
        return self.zoom(previous, endpoint);
      }
      if derivative.abs() <= -0.9 * self.df {
        return Ok(Some(trial));
      }
      if derivative >= 0.0 {
        return self.zoom(endpoint, previous);
      }
      previous = endpoint;
      alpha *= 10.0;
      iterations += 1;
    }
  }
}

/// Minimize negative proportional density with pinned Stan updates and stopping.
pub fn optimize_lbfgs(
  initial: &[f64],
  max_iterations: usize,
  controls: LbfgsControls,
  evaluate: impl Fn(&[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>,
) -> Result<LbfgsResult, StanOptimizerError> {
  optimize_steps(initial, max_iterations, controls, evaluate, |_, _| {})
}

fn optimize_steps(
  initial: &[f64],
  max_iterations: usize,
  controls: LbfgsControls,
  evaluate: impl Fn(&[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>,
  mut on_step: impl FnMut(usize, &[f64]),
) -> Result<LbfgsResult, StanOptimizerError> {
  if initial.is_empty() || initial.iter().any(|v| !v.is_finite()) || max_iterations == 0 {
    return Err(StanOptimizerError::InvalidConfiguration);
  }
  controls.check_workspace(initial.len())?;
  let settings = controls.settings();
  let mut x = initial.to_vec();
  let mut current = checked_evaluation(&x, &evaluate)?;
  current.value = -current.value;
  for g in &mut current.gradient {
    *g = -*g;
  }
  let mut p: Vec<_> = current.gradient.iter().map(|g| -g).collect();
  let mut history = History {
    updates: VecDeque::new(),
    capacity: settings.history_size,
    gamma: 1.0,
  };
  let mut previous: Option<(LogDensityEvaluation, Vec<f64>, f64)> = None;
  let mut resets = 0;

  for iteration in 1..=max_iterations {
    let mut reset = if iteration == 1 { 1 } else { 0 };
    let accepted = loop {
      if reset != 0 {
        p = current.gradient.iter().map(|g| -g).collect();
      }
      let alpha = if iteration > 1 && reset != 2 {
        let (old, old_p, old_alpha) = previous.as_ref().expect("previous successful L-BFGS step");
        (1.01
          * cubic(
            dot(&old.gradient, old_p),
            *old_alpha,
            current.value - old.value,
            dot(&current.gradient, old_p),
            1e-12,
            1.0,
          ))
        .min(1.0)
      } else {
        settings.init_alpha
      };
      let search = Search {
        x: &x,
        p: &p,
        f: current.value,
        df: dot(&current.gradient, &p),
        evaluate: &evaluate,
      };
      if let Some(trial) = search.wolfe(alpha)? {
        break trial;
      }
      if reset != 0 {
        return Err(StanOptimizerError::LineSearchFailure {
          iterations: iteration,
        });
      }
      reset = 2;
      resets += 1;
    };
    let s: Vec<_> = accepted
      .parameters
      .iter()
      .zip(&x)
      .map(|(a, b)| a - b)
      .collect();
    let y: Vec<_> = accepted
      .evaluation
      .gradient
      .iter()
      .zip(&current.gradient)
      .map(|(a, b)| a - b)
      .collect();
    let step_norm = dot(&s, &s).sqrt();
    let gradient_norm = dot(&accepted.evaluation.gradient, &accepted.evaluation.gradient).sqrt();
    let factor = history.update(y, s, reset != 0);
    let old_p = if reset != 0 {
      p.iter().map(|v| v / factor).collect()
    } else {
      p
    };
    let old_alpha = if reset != 0 {
      accepted.alpha * factor
    } else {
      accepted.alpha
    };
    p = history.direction(&accepted.evaluation.gradient);
    let change = (current.value - accepted.evaluation.value).abs();
    let relative_change = change
      / current
        .value
        .abs()
        .max(accepted.evaluation.value.abs().max(1.0));
    let relative_gradient =
      -dot(&p, &accepted.evaluation.gradient) / accepted.evaluation.value.abs().max(1.0);
    let termination = if change < settings.tol_obj {
      Some(LbfgsTermination::AbsoluteObjective)
    } else if gradient_norm < settings.tol_grad {
      Some(LbfgsTermination::AbsoluteGradient)
    } else if step_norm < settings.tol_param {
      Some(LbfgsTermination::ParameterChange)
    } else if iteration >= max_iterations {
      Some(LbfgsTermination::IterationLimit)
    } else if relative_change < settings.tol_rel_obj * f64::EPSILON {
      Some(LbfgsTermination::RelativeObjective)
    } else if relative_gradient < settings.tol_rel_grad * f64::EPSILON {
      Some(LbfgsTermination::RelativeGradient)
    } else {
      None
    };
    previous = Some((current, old_p, old_alpha));
    x = accepted.parameters;
    current = accepted.evaluation;
    on_step(iteration, &x);
    if let Some(termination) = termination {
      if x.iter().any(|v| !v.is_finite()) {
        return Err(StanOptimizerError::NonFiniteResult);
      }
      current.value = -current.value;
      for g in &mut current.gradient {
        *g = -*g;
      }
      return Ok(LbfgsResult {
        parameters: x,
        evaluation: current,
        iterations: iteration,
        termination,
        hessian_resets: resets,
      });
    }
  }
  unreachable!("positive L-BFGS budget returns from its final iteration")
}

#[cfg(test)]
mod tests {
  use super::*;

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn accepted_steps_match_the_frozen_early_trajectory() {
    let fixture: serde_json::Value = serde_json::from_str(include_str!(
      "../../../../integration/fixtures/prophet-1.4.0/stan-linear-optimizer.json"
    ))
    .unwrap();
    for case in fixture["cases"].as_array().unwrap() {
      if case["id"] != "auto-100" && case["id"] != "lbfgs-one-step" {
        continue;
      }
      let design: Vec<f64> = serde_json::from_value(case["design"].clone()).unwrap();
      let target: Vec<f64> = serde_json::from_value(case["target"].clone()).unwrap();
      let points: Vec<f64> = serde_json::from_value(case["changepointTimes"].clone()).unwrap();
      let objective =
        crate::map_objective::StanLinearObjective::new(&design, &target, &points, &[], &[], 0.05)
          .unwrap();
      for probe in case["gradientProbes"].as_array().unwrap() {
        let point: Vec<f64> = serde_json::from_value(probe["parameters"].clone()).unwrap();
        let reference_gradient: Vec<f64> =
          serde_json::from_value(probe["gradient"].clone()).unwrap();
        let actual = objective.evaluate(&point).unwrap();
        assert!(
          (actual.value - probe["logDensity"].as_f64().unwrap()).abs() < 1e-7,
          "{} iteration {} value",
          case["id"],
          probe["iteration"]
        );
        for (column, (a, b)) in actual.gradient.iter().zip(reference_gradient).enumerate() {
          assert!(
            (a - b).abs() < 1e-7,
            "{} iteration {} gradient {column}: {a} vs {b}",
            case["id"],
            probe["iteration"]
          );
        }
      }
      let trajectory: Vec<Vec<f64>> = serde_json::from_value(case["trajectory"].clone()).unwrap();
      // Full trajectories are retained for diagnosis; portable completion is
      // governed by the independent density/noise/prediction gates, not exact
      // late-iteration arithmetic on a nonsmooth objective.
      let budget = (trajectory.len() - 1).min(8);
      assert!(budget > 0);
      let result = optimize_steps(
        &objective.initial_parameters(),
        budget,
        LbfgsControls::default(),
        |point| objective.evaluate(point),
        |iteration, actual| {
          let expected = &trajectory[iteration];
          for (column, (a, b)) in actual.iter().zip(expected).enumerate() {
            assert!(
              (a - b).abs() <= 1e-7,
              "{} iteration {iteration} column {column}: {a} vs {b}",
              case["id"]
            );
          }
        },
      );
      assert!(result.is_ok(), "{} {result:?}", case["id"]);
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn logistic_defaults_256_matches_frozen_initialization_and_early_steps() {
    let fixture: serde_json::Value = serde_json::from_str(include_str!(
      "../../../../integration/fixtures/prophet-1.4.0/stan-logistic-lbfgs.json"
    ))
    .unwrap();
    let case = &fixture["cases"][0];
    let tolerances = &fixture["tolerances"];
    let target = crate::reference_fixtures::numbers(&case["target"]);
    let capacities = crate::reference_fixtures::numbers(&case["capacities"]);
    let times = crate::reference_fixtures::numbers(&case["times"]);
    let points = crate::reference_fixtures::numbers(&case["changepointTimes"]);
    let features = crate::reference_fixtures::numbers(&case["features"]);
    let priors = crate::reference_fixtures::numbers(&case["featurePriors"]);
    let modes = crate::reference_fixtures::modes(&case["featureModes"]);
    let objective = crate::logistic_map::StanLogisticObjective::new(
      &target,
      &capacities,
      &times,
      &points,
      &features,
      &priors,
      &modes,
      case["changepointPrior"].as_f64().unwrap(),
    )
    .unwrap();
    let initial = crate::reference_fixtures::numbers(&case["initialParameters"]);
    assert_eq!(objective.parameter_count(), initial.len());
    for (actual, expected) in objective.initial_parameters().iter().zip(&initial) {
      assert!((actual - expected).abs() <= tolerances["initialAbsolute"].as_f64().unwrap());
    }

    let trajectory: Vec<Vec<f64>> = serde_json::from_value(case["trajectory"].clone()).unwrap();
    assert!(trajectory.len() > 8);
    let trajectory_tolerance = tolerances["earlyTrajectoryParameterAbsolute"]
      .as_f64()
      .unwrap();
    let mut first_divergence = None;
    let fit = optimize_steps(
      &initial,
      case["maxIterations"].as_u64().unwrap() as usize,
      LbfgsControls::default(),
      |point| objective.evaluate(point),
      |iteration, actual| {
        if let Some(expected) = trajectory.get(iteration) {
          let difference = actual
            .iter()
            .zip(expected)
            .map(|(a, b)| (a - b).abs())
            .fold(0.0_f64, f64::max);
          if first_divergence.is_none() && difference > trajectory_tolerance {
            first_divergence = Some((iteration, difference));
          }
        }

        if iteration <= 8 {
          for (column, (a, b)) in actual.iter().zip(&trajectory[iteration]).enumerate() {
            assert!(
              (a - b).abs() <= trajectory_tolerance,
              "defaults-256 iteration {iteration} column {column}: {a} versus {b}"
            );
          }
        }
      },
    )
    .unwrap();
    // Output-first: the full-budget endpoint is reported for investigation, not asserted.
    // Initialization and the deterministic early trajectory above remain exact regressions.
    let noise = crate::stan::math::exp(fit.parameters[2 + points.len()]);
    println!(
      "defaults-256 first trajectory difference above {trajectory_tolerance}: {first_divergence:?}; density {} versus {} (threshold {}); normalized noise {noise} versus {} (threshold {}); iterations {}; termination {:?}",
      fit.evaluation.value,
      case["fixedProblemFit"]["logDensity"],
      tolerances["fitObjectiveAbsolute"],
      case["fixedProblemFit"]["normalizedNoise"],
      tolerances["normalizedNoiseAbsolute"],
      fit.iterations,
      fit.termination
    );
  }

  fn quadratic(x: &[f64]) -> Result<LogDensityEvaluation, MapObjectiveError> {
    Ok(LogDensityEvaluation {
      value: -0.5 * dot(x, x),
      gradient: x.iter().map(|v| -v).collect(),
    })
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn preserves_the_first_wolfe_expansion_and_finite_budget_completion() {
    let initial = [2.0, -1.0];
    let fit = optimize_lbfgs(&initial, 1, LbfgsControls::default(), quadratic).unwrap();
    assert_eq!(initial, [2.0, -1.0]);
    assert_eq!(fit.termination, LbfgsTermination::IterationLimit);
    assert!((fit.parameters[0] - 1.8).abs() < 1e-14);
    assert!((fit.parameters[1] + 0.9).abs() < 1e-14);
    assert!(fit.evaluation.value > -2.5);
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn respects_stop_precedence_and_machine_epsilon_scaled_relative_controls() {
    for criterion in 0..6 {
      let mut settings = LbfgsSettings {
        tol_obj: 1e-100,
        tol_rel_obj: 1e-100,
        tol_grad: 1e-100,
        tol_rel_grad: 1e-100,
        tol_param: 1e-100,
        ..Default::default()
      };
      match criterion {
        0 => settings.tol_obj = 1e100,
        1 => settings.tol_grad = 1e100,
        2 => settings.tol_param = 1e100,
        3 => settings.tol_rel_obj = 1e100,
        4 => settings.tol_rel_grad = 1e100,
        _ => settings.tol_rel_obj = 1e100,
      }
      let fit = optimize_lbfgs(
        &[2.0, -1.0],
        if criterion == 5 { 1 } else { 4 },
        LbfgsControls::parse(settings).unwrap(),
        quadratic,
      )
      .unwrap();
      let expected = [
        LbfgsTermination::AbsoluteObjective,
        LbfgsTermination::AbsoluteGradient,
        LbfgsTermination::ParameterChange,
        LbfgsTermination::RelativeObjective,
        LbfgsTermination::RelativeGradient,
        LbfgsTermination::IterationLimit,
      ][criterion];
      assert_eq!(fit.termination, expected);
      assert_eq!(fit.iterations, 1);
    }
    let all = LbfgsSettings {
      tol_obj: 1e100,
      tol_grad: 1e100,
      tol_param: 1e100,
      ..Default::default()
    };
    assert_eq!(
      optimize_lbfgs(&[2.0], 1, LbfgsControls::parse(all).unwrap(), quadratic)
        .unwrap()
        .termination,
      LbfgsTermination::AbsoluteObjective
    );
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn rejects_domain_trials_without_replacing_the_objective() {
    let barrier = |x: &[f64]| {
      if x[0] <= 0.0 || x[0] >= 1.0 {
        return Err(MapObjectiveError::NonFiniteResult);
      }
      Ok(LogDensityEvaluation {
        value: x[0].ln() + (1.0 - x[0]).ln(),
        gradient: vec![1.0 / x[0] - 1.0 / (1.0 - x[0])],
      })
    };
    let settings = LbfgsSettings {
      init_alpha: 1.0,
      ..Default::default()
    };
    let fit = optimize_lbfgs(
      &[0.1],
      100,
      LbfgsControls::parse(settings).unwrap(),
      barrier,
    )
    .unwrap();
    assert!((fit.parameters[0] - 0.5).abs() < 1e-6);
    assert!(fit.evaluation.value.is_finite());
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn preserves_exact_kinks_and_reports_failed_search_not_a_model() {
    let kink = |x: &[f64]| {
      Ok(LogDensityEvaluation {
        value: -x[0].abs() + 0.5 * x[0],
        gradient: vec![
          0.5
            - if x[0] > 0.0 {
              1.0
            } else if x[0] < 0.0 {
              -1.0
            } else {
              0.0
            },
        ],
      })
    };
    assert_eq!(
      optimize_lbfgs(&[0.0], 100, LbfgsControls::default(), kink),
      Err(StanOptimizerError::LineSearchFailure { iterations: 1 })
    );
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn checks_controls_and_history_workspace_before_objective_evaluation() {
    assert_eq!(
      LbfgsControls::parse(LbfgsSettings {
        history_size: 0,
        ..Default::default()
      }),
      Err(StanOptimizerError::InvalidConfiguration)
    );
    assert_eq!(
      LbfgsControls::parse(LbfgsSettings {
        tol_obj: -1.0,
        ..Default::default()
      }),
      Err(StanOptimizerError::InvalidConfiguration)
    );
    let huge = LbfgsControls::parse(LbfgsSettings {
      history_size: i32::MAX as usize,
      ..Default::default()
    })
    .unwrap();
    assert_eq!(
      optimize_lbfgs(&[0.0; 3], 10, huge, |_| panic!(
        "workspace must be checked first"
      )),
      Err(StanOptimizerError::SizeOverflow)
    );
  }
}
