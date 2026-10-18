//! Pinned-Stan Newton parity. Same-point checks cover every generated case;
//! fitted endpoints are compared only where the MAP problem is well posed.

use serde_json::Value;

use super::{StanFlatObjective, StanLinearObjective};
use crate::mixed_map::ComponentMode;
use crate::reference_fixtures::{modes, numbers};
use crate::stan::linear_optimizer::StanMapObjective;
use crate::stan::optimizer::{
  NewtonResult, NewtonTermination, finite_difference_hessian, optimize_newton,
  optimize_newton_with_hessian, spectral_direction,
};

/// Prophet's default iteration budget for every Stan optimizer.
const BUDGET: usize = 10_000;

/// Owned Stan data for one generated case, in the objective's design layout.
struct Problem {
  flat: bool,
  target: Vec<f64>,
  design: Vec<f64>,
  changepoints: Vec<f64>,
  priors: Vec<f64>,
  modes: Vec<ComponentMode>,
  changepoint_prior: f64,
}

impl Problem {
  fn parse(case: &Value) -> Self {
    let flat = case["growth"] == "flat";
    let target = numbers(&case["target"]);
    let times = numbers(&case["times"]);
    let changepoints = numbers(&case["changepoints"]);
    let mut design = Vec::new();

    for (row, features) in case["features"].as_array().unwrap().iter().enumerate() {
      let time = if flat { 0.0 } else { times[row] };

      design.extend_from_slice(&[1.0, time]);
      if !flat {
        design.extend(changepoints.iter().map(|point| (time - point).max(0.0)));
      }
      design.extend(numbers(features));
    }

    Self {
      flat,
      target,
      design,
      changepoints,
      priors: numbers(&case["featurePriors"]),
      modes: modes(&case["featureModes"]),
      changepoint_prior: case["changepointPrior"].as_f64().unwrap(),
    }
  }

  fn objective(&self) -> Box<dyn StanMapObjective + '_> {
    if self.flat {
      Box::new(
        StanFlatObjective::new(
          &self.design,
          &self.target,
          self.changepoints.len(),
          &self.priors,
          &self.modes,
          self.changepoint_prior,
        )
        .unwrap(),
      )
    } else {
      Box::new(
        StanLinearObjective::new(
          &self.design,
          &self.target,
          &self.changepoints,
          &self.priors,
          &self.modes,
          self.changepoint_prior,
        )
        .unwrap(),
      )
    }
  }

  /// Flat, additive training values `m + X beta` at a complete Stan state.
  fn flat_training_values(&self, parameters: &[f64]) -> Vec<f64> {
    let columns = self.priors.len() + 2;
    let beta = &parameters[parameters.len() - self.priors.len()..];

    self
      .design
      .chunks_exact(columns)
      .map(|row| {
        row[2..]
          .iter()
          .zip(beta)
          .fold(parameters[1], |total, (feature, beta)| {
            total + feature * beta
          })
      })
      .collect()
  }
}

fn fixture(source: &str) -> Value {
  serde_json::from_str(source).unwrap()
}

/// Compare density, gradient, stencil, spectral action and one accepted step.
fn assert_same_point(objective: &dyn StanMapObjective, case: &Value, tolerance: &Value) {
  let label = case["id"]
    .as_str()
    .unwrap_or_else(|| case["growth"].as_str().unwrap());
  let point = numbers(&case["point"]);
  let evaluation = objective.evaluate(&point).unwrap();

  assert!(
    (evaluation.value - case["density"].as_f64().unwrap()).abs()
      <= tolerance["densityAbsolute"].as_f64().unwrap(),
    "{label} density"
  );

  for (actual, expected) in evaluation.gradient.iter().zip(numbers(&case["gradient"])) {
    assert!(
      (actual - expected).abs() <= tolerance["gradientAbsolute"].as_f64().unwrap(),
      "{label} gradient: {actual} != {expected}"
    );
  }

  let hessian = finite_difference_hessian(&point, &|state| objective.evaluate(state)).unwrap();

  for probe in case["curvature"].as_array().unwrap() {
    let row = probe["row"].as_u64().unwrap() as usize;
    let column = probe["column"].as_u64().unwrap() as usize;

    assert!(
      (hessian[row * point.len() + column] - probe["value"].as_f64().unwrap()).abs()
        <= tolerance["curvatureAbsolute"].as_f64().unwrap(),
      "{label} curvature ({row}, {column})"
    );
  }

  let direction = spectral_direction(&hessian, &evaluation.gradient).unwrap();
  let action = numbers(&case["action"]);
  let norm = action.iter().map(|value| value.abs()).fold(1.0, f64::max);

  for (actual, expected) in direction.iter().zip(action) {
    assert!(
      (actual - expected).abs() <= norm * tolerance["actionRelativeNorm"].as_f64().unwrap(),
      "{label} action: {actual} != {expected}"
    );
  }

  let step = case["step"].as_f64().unwrap();
  let candidate: Vec<_> = point
    .iter()
    .zip(&direction)
    .map(|(value, direction)| value - step * direction)
    .collect();
  let previous: Vec<_> = point
    .iter()
    .zip(&direction)
    .map(|(value, direction)| value - (2.0 * step) * direction)
    .collect();
  let density = objective.evaluate(&candidate).unwrap().value;

  assert!(density >= evaluation.value, "{label} accepted step");
  assert!(
    objective
      .evaluate(&previous)
      .map(|probe| probe.value < evaluation.value)
      .unwrap_or(true),
    "{label} rejected step"
  );

  let fitted = optimize_newton(
    &point,
    evaluation.value + objective.log_density_constant(),
    1,
    |state| objective.evaluate(state),
  )
  .unwrap();

  for (actual, expected) in fitted.parameters.iter().zip(numbers(&case["next"])) {
    assert!(
      (actual - expected).abs() <= tolerance["nextAbsolute"].as_f64().unwrap(),
      "{label} next state"
    );
  }
  assert!(
    (fitted.evaluation.value - case["nextDensity"].as_f64().unwrap()).abs()
      <= tolerance["nextAbsolute"].as_f64().unwrap(),
    "{label} next density"
  );
}

/// Run the production Newton loop from the generated Prophet initialization.
fn fit_from_fixture_point(objective: &dyn StanMapObjective, case: &Value) -> (f64, NewtonResult) {
  let point = numbers(&case["point"]);
  let start = objective.evaluate(&point).unwrap().value;
  let fit = optimize_newton_with_hessian(
    &point,
    start + objective.log_density_constant(),
    BUDGET,
    |state| objective.evaluate(state),
    |state, current| objective.newton_hessian(state, current),
  )
  .unwrap();

  (start, fit)
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn large_fourier_same_point_matches_stan() {
  let fixture = fixture(include_str!(
    "../../../../integration/fixtures/prophet-1.4.0/large-fourier-stan.json"
  ));

  for case in fixture["cases"].as_array().unwrap() {
    let problem = Problem::parse(case);

    assert_same_point(&*problem.objective(), case, &fixture["tolerances"]);
  }
}

/// Four rows and 256 seasonal coefficients interpolate exactly, so the flat MAP
/// has no finite maximum. Unmodified pinned Stan ends at different densities when
/// single Fourier ULPs change, and Python's ARM64/AMD64 endpoints differ by 0.31.
/// A density floor would measure that trajectory noise, so require convergence,
/// interpolation and progress from the start instead. Same-point parity is above.
#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn large_flat_fourier_newton_converges_without_a_density_floor() {
  let fixture = fixture(include_str!(
    "../../../../integration/fixtures/prophet-1.4.0/large-fourier-stan.json"
  ));
  let case = fixture["cases"]
    .as_array()
    .unwrap()
    .iter()
    .find(|case| case["growth"] == "flat" && case["order"] == 128)
    .unwrap();
  let problem = Problem::parse(case);
  let objective = problem.objective();
  let (start, fit) = fit_from_fixture_point(&*objective, case);

  assert_ne!(fit.termination, NewtonTermination::IterationLimit);
  assert!(fit.iterations < 1_000, "iterations {}", fit.iterations);
  assert!(fit.evaluation.value.is_finite());
  assert!(fit.evaluation.value >= start);

  for (actual, expected) in problem
    .flat_training_values(&fit.parameters)
    .iter()
    .zip(&problem.target)
  {
    assert!((actual - expected).abs() <= 1e-6, "{actual} != {expected}");
  }
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn flat_low_order_newton_matches_stan_endpoints() {
  let fixture = fixture(include_str!(
    "../../../../integration/fixtures/prophet-1.4.0/flat-low-order-stan.json"
  ));
  let tolerance = &fixture["tolerances"];
  let absolute = |name: &str| tolerance[name].as_f64().unwrap();

  for case in fixture["cases"].as_array().unwrap() {
    let label = case["id"].as_str().unwrap();
    let problem = Problem::parse(case);
    let objective = problem.objective();

    assert_same_point(&*objective, case, tolerance);

    let (start, fit) = fit_from_fixture_point(&*objective, case);
    let endpoint = &case["endpoint"];

    assert_eq!(endpoint["termination"], "objective-change");
    assert_eq!(
      fit.termination,
      NewtonTermination::ObjectiveChange,
      "{label}"
    );
    assert!(fit.evaluation.value >= start, "{label} density");

    for (actual, expected) in problem
      .flat_training_values(&fit.parameters)
      .iter()
      .zip(numbers(&endpoint["predictions"]))
    {
      assert!(
        (actual - expected).abs() <= absolute("endpointPredictionAbsolute"),
        "{label} training fit: {actual} != {expected}"
      );
    }

    if case["trajectorySensitive"].as_bool().unwrap() {
      continue;
    }

    let iterations = endpoint["iterations"].as_u64().unwrap() as usize;

    assert!(
      fit.iterations.abs_diff(iterations)
        <= tolerance["endpointIterations"].as_u64().unwrap() as usize,
      "{label} iterations: {} != {iterations}",
      fit.iterations
    );
    assert!(
      (fit.evaluation.value - endpoint["logDensity"].as_f64().unwrap()).abs()
        <= absolute("endpointDensityAbsolute"),
      "{label} density: {}",
      fit.evaluation.value
    );

    for (actual, expected) in fit.parameters.iter().zip(numbers(&endpoint["parameters"])) {
      assert!(
        (actual - expected).abs() <= absolute("endpointParameterAbsolute"),
        "{label} parameter: {actual} != {expected}"
      );
    }
  }
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn flat_cached_prior_stencil_preserves_every_bit() {
  let target: Vec<_> = (0..28)
    .map(|row| 0.6 + (row as f64 * 1.7).sin() * 0.03)
    .collect();
  let design: Vec<_> = (0..28)
    .flat_map(|row| [1.0, 0.0, (row as f64).sin(), (row as f64).cos()])
    .collect();
  let modes = [ComponentMode::Additive, ComponentMode::Multiplicative];
  let objective = StanFlatObjective::new(&design, &target, 21, &[10.0, 5.0], &modes, 0.05).unwrap();

  for sign in [-1.0, 0.0, 1.0] {
    let mut point = objective.initial_parameters();
    point[0] = sign * 1e-17;
    for (index, delta) in point[2..23].iter_mut().enumerate() {
      *delta = sign * (index as f64 + 1.0) * 1e-18;
    }
    point[23] = -0.8;
    point[24] = 0.01;
    point[25] = -0.02;
    let evaluation = objective.evaluate(&point).unwrap();
    let expected = finite_difference_hessian(&point, &|state| objective.evaluate(state)).unwrap();
    let actual = objective.newton_hessian(&point, &evaluation).unwrap();

    for (index, (actual, expected)) in actual.iter().zip(&expected).enumerate() {
      assert_eq!(
        actual.to_bits(),
        expected.to_bits(),
        "stencil entry {index}"
      );
    }

    let expected = optimize_newton(
      &point,
      evaluation.value + objective.log_density_constant(),
      8,
      |state| objective.evaluate(state),
    )
    .unwrap();
    let actual = optimize_newton_with_hessian(
      &point,
      evaluation.value + objective.log_density_constant(),
      8,
      |state| objective.evaluate(state),
      |state, current| objective.newton_hessian(state, current),
    )
    .unwrap();
    assert_eq!(actual.iterations, expected.iterations);
    assert_eq!(actual.termination, expected.termination);
    assert_eq!(
      actual.evaluation.value.to_bits(),
      expected.evaluation.value.to_bits()
    );
    for (actual, expected) in actual.parameters.iter().zip(&expected.parameters) {
      assert_eq!(actual.to_bits(), expected.to_bits());
    }
  }
}
