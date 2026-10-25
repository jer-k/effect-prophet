//! Prophet's shared MAP optimization selection, per-attempt budget and fallback.
//! Historical linear type/entrypoint names remain source-compatible. This pure
//! policy owns initialization, Prophet's or a caller's warm start, and never
//! reuses a failed iterate.

use crate::map_objective::MapObjectiveError;
use crate::stan::lbfgs::{LbfgsControls, LbfgsResult, LbfgsTermination, optimize_lbfgs};
use crate::stan::optimizer::{
  LogDensityEvaluation, NewtonResult, NewtonTermination, StanOptimizerError,
};

/// A parsed MAP objective in the pinned executable's unconstrained coordinates.
/// Domain owners supply calculus and initialization; this policy owns attempts.
pub trait StanMapObjective {
  /// Every retained observation contributes to automatic algorithm selection.
  fn observation_count(&self) -> usize;
  /// Complete state size, including private dummy coordinates.
  fn parameter_count(&self) -> usize;
  /// Fresh Prophet initialization, never a failed attempt's final iterate.
  fn initial_parameters(&self) -> Vec<f64>;
  /// Index of `log(sigma)`, after `k`, `m` and every delta, including a private dummy.
  fn sigma_index(&self) -> usize;
  /// Parameter-independent constants in Stan's initial service density.
  fn log_density_constant(&self) -> f64;
  /// Proportional density and unconstrained gradient, without a Jacobian.
  fn evaluate(&self, parameters: &[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>;

  /// Complete finite-difference curvature in the pinned unconstrained coordinates.
  fn newton_hessian(
    &self,
    parameters: &[f64],
    _current: &LogDensityEvaluation,
  ) -> Result<Vec<f64>, StanOptimizerError> {
    crate::stan::optimizer::finite_difference_hessian(parameters, &|state| self.evaluate(state))
  }

  /// Run the existing Newton machinery from the original initialization.
  fn fit_newton(&self, max_iterations: usize) -> Result<NewtonResult, StanOptimizerError> {
    self.fit_newton_from(&self.initial_parameters(), max_iterations)
  }

  /// Run the existing Newton machinery from a complete unconstrained state.
  fn fit_newton_from(
    &self,
    initial: &[f64],
    max_iterations: usize,
  ) -> Result<NewtonResult, StanOptimizerError> {
    if max_iterations == 0 {
      return Err(StanOptimizerError::InvalidConfiguration);
    }
    crate::stan::optimizer::check_workspace(self.parameter_count())?;
    let density = self
      .evaluate(initial)
      .map_err(StanOptimizerError::Objective)?;
    crate::stan::optimizer::optimize_newton_with_hessian(
      initial,
      density.value + self.log_density_constant(),
      max_iterations,
      |parameters| self.evaluate(parameters),
      |parameters, current| self.newton_hessian(parameters, current),
    )
  }
}

/// Only qualifying L-BFGS numerical failures may trigger Newton.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum NewtonFallback {
  Enabled,
  Disabled,
}

/// Algorithm-specific legal settings, including Prophet's row-count selection.
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum LinearOptimizerChoice {
  Automatic {
    controls: LbfgsControls,
    fallback: NewtonFallback,
  },
  Newton,
  Lbfgs {
    controls: LbfgsControls,
    fallback: NewtonFallback,
  },
}

/// A caller's starting point in Prophet's constrained Stan parameters, like Python's `init`.
#[derive(Clone, Debug, PartialEq)]
pub struct WarmStart {
  pub k: f64,
  pub m: f64,
  pub sigma_obs: f64,
  pub delta: Vec<f64>,
  pub beta: Vec<f64>,
}

impl WarmStart {
  /// Accept finite values and a positive noise scale, which Stan's bound requires.
  pub fn parse(
    k: f64,
    m: f64,
    sigma_obs: f64,
    delta: Vec<f64>,
    beta: Vec<f64>,
  ) -> Result<Self, StanOptimizerError> {
    if !k.is_finite()
      || !m.is_finite()
      || !sigma_obs.is_finite()
      || sigma_obs <= 0.0
      || delta.iter().chain(&beta).any(|value| !value.is_finite())
    {
      return Err(StanOptimizerError::InvalidConfiguration);
    }
    Ok(Self {
      k,
      m,
      sigma_obs,
      delta,
      beta,
    })
  }
}

/// Where the accepted attempt started.
#[derive(Clone, Copy, Debug, Default, Eq, PartialEq)]
pub enum Initialization {
  /// Prophet's default initialization.
  #[default]
  Default,
  /// A caller's warm start, recording whether `delta` and `beta` had the model's lengths.
  WarmStart { delta: bool, beta: bool },
}

/// Parsed positive, CmdStan-representable per-attempt budget, algorithm policy and start.
#[derive(Clone, Debug, PartialEq)]
pub struct LinearOptimizerOptions {
  max_iterations: usize,
  choice: LinearOptimizerChoice,
  warm_start: Option<WarmStart>,
}

impl LinearOptimizerOptions {
  pub const fn parse(
    max_iterations: usize,
    choice: LinearOptimizerChoice,
  ) -> Result<Self, StanOptimizerError> {
    if max_iterations == 0 || max_iterations > i32::MAX as usize {
      return Err(StanOptimizerError::InvalidConfiguration);
    }
    Ok(Self {
      max_iterations,
      choice,
      warm_start: None,
    })
  }
  pub fn max_iterations(&self) -> usize {
    self.max_iterations
  }
  /// Start every attempt, including a Newton fallback, from `warm_start`.
  #[must_use]
  pub fn with_warm_start(self, warm_start: WarmStart) -> Self {
    Self {
      warm_start: Some(warm_start),
      ..self
    }
  }
}

impl Default for LinearOptimizerOptions {
  fn default() -> Self {
    Self {
      max_iterations: 10000,
      choice: LinearOptimizerChoice::Automatic {
        controls: LbfgsControls::default(),
        fallback: NewtonFallback::Enabled,
      },
      warm_start: None,
    }
  }
}

/// Prophet's initialization, overridden like `CmdStanPyBackend.sanitize_custom_inits`:
/// `k`, `m` and `sigma_obs` always, and `delta` or `beta` only when its length matches.
/// Stan reads `sigma_obs` through its lower bound, so the state holds its logarithm.
fn initial_state(
  objective: &impl StanMapObjective,
  warm_start: Option<&WarmStart>,
) -> (Vec<f64>, Initialization) {
  let mut parameters = objective.initial_parameters();

  let Some(warm_start) = warm_start else {
    return (parameters, Initialization::Default);
  };

  let sigma_index = objective.sigma_index();
  parameters[0] = warm_start.k;
  parameters[1] = warm_start.m;
  parameters[sigma_index] = warm_start.sigma_obs.ln();

  let deltas = &mut parameters[2..sigma_index];
  let delta = warm_start.delta.len() == deltas.len();
  if delta {
    deltas.copy_from_slice(&warm_start.delta);
  }

  let betas = &mut parameters[sigma_index + 1..];
  let beta = warm_start.beta.len() == betas.len();
  if beta {
    betas.copy_from_slice(&warm_start.beta);
  }

  (parameters, Initialization::WarmStart { delta, beta })
}

/// Successful attempts cannot be confused with failed line searches.
#[derive(Clone, Debug, PartialEq)]
pub enum LinearOptimizationAttempts {
  Newton {
    iterations: usize,
    termination: NewtonTermination,
  },
  Lbfgs {
    iterations: usize,
    termination: LbfgsTermination,
    hessian_resets: usize,
  },
  NewtonFallback {
    failure: StanOptimizerError,
    iterations: usize,
    termination: NewtonTermination,
  },
}

/// Actual algorithm that returned the accepted state.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum LinearAlgorithm {
  Newton,
  Lbfgs,
}

/// Caller-visible completion; finite exhaustion is not convergence.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum LinearTermination {
  NewtonObjectiveChange,
  NoProgress,
  AbsoluteObjective,
  RelativeObjective,
  AbsoluteGradient,
  RelativeGradient,
  ParameterChange,
  IterationLimit,
}

/// Bounded evidence for completed optimization attempts.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub struct LinearOptimizationSummary {
  pub algorithm: LinearAlgorithm,
  pub termination: LinearTermination,
  pub iterations: usize,
  pub attempt_count: usize,
  pub failed_attempt_iterations: Option<usize>,
  pub hessian_resets: usize,
  pub initialization: Initialization,
}

impl LinearOptimizationAttempts {
  /// Preserve actual completion and fallback work rather than claiming convergence.
  pub fn summary(&self) -> LinearOptimizationSummary {
    let newton_termination = |termination| match termination {
      NewtonTermination::ObjectiveChange => LinearTermination::NewtonObjectiveChange,
      NewtonTermination::NoProgress => LinearTermination::NoProgress,
      NewtonTermination::IterationLimit => LinearTermination::IterationLimit,
    };
    match *self {
      Self::Newton {
        iterations,
        termination,
      } => LinearOptimizationSummary {
        algorithm: LinearAlgorithm::Newton,
        termination: newton_termination(termination),
        iterations,
        attempt_count: 1,
        failed_attempt_iterations: None,
        hessian_resets: 0,
        initialization: Initialization::Default,
      },
      Self::NewtonFallback {
        failure,
        iterations,
        termination,
      } => LinearOptimizationSummary {
        algorithm: LinearAlgorithm::Newton,
        termination: newton_termination(termination),
        iterations,
        attempt_count: 2,
        failed_attempt_iterations: match failure {
          StanOptimizerError::LineSearchFailure { iterations } => Some(iterations),
          _ => None,
        },
        hessian_resets: 0,
        initialization: Initialization::Default,
      },
      Self::Lbfgs {
        iterations,
        termination,
        hessian_resets,
      } => LinearOptimizationSummary {
        algorithm: LinearAlgorithm::Lbfgs,
        termination: match termination {
          LbfgsTermination::AbsoluteObjective => LinearTermination::AbsoluteObjective,
          LbfgsTermination::RelativeObjective => LinearTermination::RelativeObjective,
          LbfgsTermination::AbsoluteGradient => LinearTermination::AbsoluteGradient,
          LbfgsTermination::RelativeGradient => LinearTermination::RelativeGradient,
          LbfgsTermination::ParameterChange => LinearTermination::ParameterChange,
          LbfgsTermination::IterationLimit => LinearTermination::IterationLimit,
        },
        iterations,
        attempt_count: 1,
        failed_attempt_iterations: None,
        hessian_resets,
        initialization: Initialization::Default,
      },
    }
  }
}

/// Accepted finite state, with the actual algorithm and attempted-work evidence.
#[derive(Clone, Debug, PartialEq)]
pub struct LinearOptimizationResult {
  pub parameters: Vec<f64>,
  pub evaluation: LogDensityEvaluation,
  pub attempts: LinearOptimizationAttempts,
  pub initialization: Initialization,
}

impl LinearOptimizationResult {
  /// Attempt evidence together with where those attempts started.
  pub fn summary(&self) -> LinearOptimizationSummary {
    LinearOptimizationSummary {
      initialization: self.initialization,
      ..self.attempts.summary()
    }
  }
}

/// Preserve both expected numerical failures when a fallback also fails.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum LinearOptimizationError {
  Optimizer(StanOptimizerError),
  Fallback {
    lbfgs: StanOptimizerError,
    newton: StanOptimizerError,
  },
}

/// Preserve the historical linear entrypoint while using the shared policy.
pub use optimize_map as optimize_linear;

fn newton_result(
  fit: NewtonResult,
  failure: Option<StanOptimizerError>,
  initialization: Initialization,
) -> LinearOptimizationResult {
  let attempts = match failure {
    Some(failure) => LinearOptimizationAttempts::NewtonFallback {
      failure,
      iterations: fit.iterations,
      termination: fit.termination,
    },
    None => LinearOptimizationAttempts::Newton {
      iterations: fit.iterations,
      termination: fit.termination,
    },
  };
  LinearOptimizationResult {
    parameters: fit.parameters,
    evaluation: fit.evaluation,
    attempts,
    initialization,
  }
}

fn lbfgs_result(fit: LbfgsResult, initialization: Initialization) -> LinearOptimizationResult {
  LinearOptimizationResult {
    parameters: fit.parameters,
    evaluation: fit.evaluation,
    attempts: LinearOptimizationAttempts::Lbfgs {
      iterations: fit.iterations,
      termination: fit.termination,
      hessian_resets: fit.hessian_resets,
    },
    initialization,
  }
}

/// Fit the same objective on both attempts, each from the same initialization:
/// Prophet's, or the caller's warm start, which Python also reuses for its fallback.
pub fn optimize_map(
  objective: &impl StanMapObjective,
  options: LinearOptimizerOptions,
) -> Result<LinearOptimizationResult, LinearOptimizationError> {
  let (initial, initialization) = initial_state(objective, options.warm_start.as_ref());

  let (controls, fallback) = match options.choice {
    LinearOptimizerChoice::Newton => {
      return objective
        .fit_newton_from(&initial, options.max_iterations)
        .map(|fit| newton_result(fit, None, initialization))
        .map_err(LinearOptimizationError::Optimizer);
    }
    LinearOptimizerChoice::Automatic { .. } if objective.observation_count() < 100 => {
      return objective
        .fit_newton_from(&initial, options.max_iterations)
        .map(|fit| newton_result(fit, None, initialization))
        .map_err(LinearOptimizationError::Optimizer);
    }
    LinearOptimizerChoice::Automatic { controls, fallback }
    | LinearOptimizerChoice::Lbfgs { controls, fallback } => (controls, fallback),
  };
  controls
    .check_workspace(objective.parameter_count())
    .map_err(LinearOptimizationError::Optimizer)?;
  match optimize_lbfgs(&initial, options.max_iterations, controls, |point| {
    objective.evaluate(point)
  }) {
    Ok(fit) => Ok(lbfgs_result(fit, initialization)),
    Err(error) => {
      let retry = fallback == NewtonFallback::Enabled
        && matches!(
          error,
          StanOptimizerError::LineSearchFailure { .. }
            | StanOptimizerError::Objective(
              crate::map_objective::MapObjectiveError::NonFiniteResult
            )
            | StanOptimizerError::NonFiniteResult
        );
      if !retry {
        return Err(LinearOptimizationError::Optimizer(error));
      }
      objective
        .fit_newton_from(&initial, options.max_iterations)
        .map(|fit| newton_result(fit, Some(error), initialization))
        .map_err(|newton| LinearOptimizationError::Fallback {
          lbfgs: error,
          newton,
        })
    }
  }
}

#[cfg(test)]
mod tests {
  use std::cell::RefCell;

  use super::{
    Initialization, LinearOptimizationAttempts, LinearOptimizerChoice, LinearOptimizerOptions,
    NewtonFallback, StanMapObjective, WarmStart, initial_state, optimize_map,
  };
  use crate::map_objective::MapObjectiveError;
  use crate::stan::lbfgs::LbfgsControls;
  use crate::stan::optimizer::LogDensityEvaluation;

  /// `[k, m, delta, delta, log(sigma), beta]` with a concave quadratic density that
  /// records every evaluated state and can fail its first evaluation.
  struct Quadratic {
    fail_first: bool,
    evaluated: RefCell<Vec<Vec<f64>>>,
  }

  impl Quadratic {
    fn new(fail_first: bool) -> Self {
      Self {
        fail_first,
        evaluated: RefCell::new(vec![]),
      }
    }
  }

  impl StanMapObjective for Quadratic {
    fn observation_count(&self) -> usize {
      2
    }
    fn parameter_count(&self) -> usize {
      6
    }
    fn initial_parameters(&self) -> Vec<f64> {
      vec![0.5, 0.25, 0.0, 0.0, 0.0, 0.0]
    }
    fn sigma_index(&self) -> usize {
      4
    }
    fn log_density_constant(&self) -> f64 {
      0.0
    }
    fn evaluate(&self, parameters: &[f64]) -> Result<LogDensityEvaluation, MapObjectiveError> {
      let mut evaluated = self.evaluated.borrow_mut();
      evaluated.push(parameters.to_vec());
      if self.fail_first && evaluated.len() == 1 {
        return Err(MapObjectiveError::NonFiniteResult);
      }
      Ok(LogDensityEvaluation {
        value: -0.5 * parameters.iter().map(|value| value * value).sum::<f64>(),
        gradient: parameters.iter().map(|value| -value).collect(),
      })
    }
  }

  fn warm_start(delta: Vec<f64>, beta: Vec<f64>) -> WarmStart {
    WarmStart::parse(2.0, -1.0, 0.5, delta, beta).unwrap()
  }

  fn newton() -> LinearOptimizerOptions {
    LinearOptimizerOptions::parse(100, LinearOptimizerChoice::Newton).unwrap()
  }

  #[test]
  fn starts_from_prophet_initialization_without_a_warm_start() {
    let objective = Quadratic::new(false);

    assert_eq!(
      initial_state(&objective, None),
      (objective.initial_parameters(), Initialization::Default)
    );
  }

  #[test]
  fn replaces_every_coordinate_when_the_lengths_match() {
    let warm = warm_start(vec![0.1, -0.2], vec![0.3]);

    assert_eq!(
      initial_state(&Quadratic::new(false), Some(&warm)),
      (
        vec![2.0, -1.0, 0.1, -0.2, 0.5_f64.ln(), 0.3],
        Initialization::WarmStart {
          delta: true,
          beta: true,
        }
      )
    );
  }

  #[test]
  fn keeps_prophet_defaults_for_each_mismatched_vector_like_python() {
    let objective = Quadratic::new(false);

    assert_eq!(
      initial_state(&objective, Some(&warm_start(vec![0.1], vec![0.3]))),
      (
        vec![2.0, -1.0, 0.0, 0.0, 0.5_f64.ln(), 0.3],
        Initialization::WarmStart {
          delta: false,
          beta: true,
        }
      )
    );
    assert_eq!(
      initial_state(&objective, Some(&warm_start(vec![0.1, -0.2], vec![]))),
      (
        vec![2.0, -1.0, 0.1, -0.2, 0.5_f64.ln(), 0.0],
        Initialization::WarmStart {
          delta: true,
          beta: false,
        }
      )
    );
  }

  #[test]
  fn records_the_initialization_in_the_accepted_summary() {
    let objective = Quadratic::new(false);
    let options = newton().with_warm_start(warm_start(vec![0.1, -0.2], vec![0.3, 0.4]));
    let fit = optimize_map(&objective, options).unwrap();

    assert_eq!(objective.evaluated.borrow()[0][..2], [2.0, -1.0]);
    assert_eq!(
      fit.summary().initialization,
      Initialization::WarmStart {
        delta: true,
        beta: false,
      }
    );
    assert_eq!(
      optimize_map(&Quadratic::new(false), newton())
        .unwrap()
        .summary()
        .initialization,
      Initialization::Default
    );
  }

  #[test]
  fn restarts_the_newton_fallback_from_the_same_warm_start() {
    let objective = Quadratic::new(true);
    let options = LinearOptimizerOptions::parse(
      100,
      LinearOptimizerChoice::Lbfgs {
        controls: LbfgsControls::default(),
        fallback: NewtonFallback::Enabled,
      },
    )
    .unwrap()
    .with_warm_start(warm_start(vec![0.1, -0.2], vec![0.3]));
    let fit = optimize_map(&objective, options).unwrap();
    let evaluated = objective.evaluated.borrow();
    let start = vec![2.0, -1.0, 0.1, -0.2, 0.5_f64.ln(), 0.3];

    assert!(matches!(
      fit.attempts,
      LinearOptimizationAttempts::NewtonFallback { .. }
    ));
    assert_eq!(evaluated[0], start);
    assert_eq!(evaluated[1], start);
  }

  #[test]
  fn rejects_warm_starts_stan_cannot_initialize() {
    for (sigma_obs, delta) in [
      (0.0, vec![]),
      (-1.0, vec![]),
      (f64::INFINITY, vec![]),
      (1.0, vec![f64::NAN]),
    ] {
      assert!(WarmStart::parse(0.0, 0.0, sigma_obs, delta, vec![]).is_err());
    }
    assert!(WarmStart::parse(f64::NAN, 0.0, 1.0, vec![], vec![]).is_err());
  }
}
