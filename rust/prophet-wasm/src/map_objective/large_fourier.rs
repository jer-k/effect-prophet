//! Portable same-point checks are independent from exact-fit endpoint tests.

use super::{StanFlatObjective, StanLinearObjective};
use crate::mixed_map::ComponentMode;
use crate::reference_fixtures::numbers;
use crate::stan::linear_optimizer::StanMapObjective;
use crate::stan::optimizer::{finite_difference_hessian, optimize_newton, spectral_direction};

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn large_fourier_same_point_matches_stan() {
  let fixture: serde_json::Value = serde_json::from_str(include_str!(
    "../../../../integration/fixtures/prophet-1.4.0/large-fourier-stan.json"
  ))
  .unwrap();
  let tolerance = &fixture["tolerances"];

  for case in fixture["cases"].as_array().unwrap() {
    let target = numbers(&case["target"]);
    let times = numbers(&case["times"]);
    let points = numbers(&case["changepoints"]);
    let features: Vec<Vec<f64>> = case["features"]
      .as_array()
      .unwrap()
      .iter()
      .map(numbers)
      .collect();
    let columns = features[0].len();
    let priors = vec![10.0; columns];
    let modes = vec![ComponentMode::Additive; columns];
    let flat = case["growth"] == "flat";
    let mut design = Vec::new();

    for row in 0..target.len() {
      let time = if flat { 0.0 } else { times[row] };
      design.extend_from_slice(&[1.0, time]);
      if !flat {
        for point in &points {
          design.push((time - point).max(0.0));
        }
      }
      design.extend_from_slice(&features[row]);
    }

    let flat_objective;
    let linear_objective;
    let objective: &dyn StanMapObjective = if flat {
      flat_objective =
        StanFlatObjective::new(&design, &target, points.len(), &priors, &modes, 0.05).unwrap();
      &flat_objective
    } else {
      linear_objective =
        StanLinearObjective::new(&design, &target, &points, &priors, &modes, 0.05).unwrap();
      &linear_objective
    };
    let point = numbers(&case["point"]);
    let evaluation = objective.evaluate(&point).unwrap();
    assert!(
      (evaluation.value - case["density"].as_f64().unwrap()).abs()
        <= tolerance["densityAbsolute"].as_f64().unwrap()
    );

    for (actual, expected) in evaluation.gradient.iter().zip(numbers(&case["gradient"])) {
      assert!(
        (actual - expected).abs() <= tolerance["gradientAbsolute"].as_f64().unwrap(),
        "{} gradient: {actual} != {expected}",
        case["growth"]
      );
    }

    let hessian = finite_difference_hessian(&point, &|state| objective.evaluate(state)).unwrap();
    for probe in case["curvature"].as_array().unwrap() {
      let row = probe["row"].as_u64().unwrap() as usize;
      let column = probe["column"].as_u64().unwrap() as usize;
      assert!(
        (hessian[row * point.len() + column] - probe["value"].as_f64().unwrap()).abs()
          <= tolerance["curvatureAbsolute"].as_f64().unwrap()
      );
    }

    let direction = spectral_direction(&hessian, &evaluation.gradient).unwrap();
    let action = numbers(&case["action"]);
    let norm = action.iter().map(|value| value.abs()).fold(1.0, f64::max);
    for (actual, expected) in direction.iter().zip(action) {
      assert!(
        (actual - expected).abs() <= norm * tolerance["actionRelativeNorm"].as_f64().unwrap(),
        "{} action: {actual} != {expected}",
        case["growth"]
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
    assert!(density >= evaluation.value);
    assert!(
      objective
        .evaluate(&previous)
        .map(|probe| probe.value < evaluation.value)
        .unwrap_or(true)
    );

    let fitted = optimize_newton(
      &point,
      evaluation.value + objective.log_density_constant(),
      1,
      |state| objective.evaluate(state),
    )
    .unwrap();
    for (actual, expected) in fitted.parameters.iter().zip(numbers(&case["next"])) {
      assert!((actual - expected).abs() <= tolerance["nextAbsolute"].as_f64().unwrap());
    }
    assert!(
      (fitted.evaluation.value - case["nextDensity"].as_f64().unwrap()).abs()
        <= tolerance["nextAbsolute"].as_f64().unwrap()
    );
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
    let actual = crate::stan::optimizer::optimize_newton_with_hessian(
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
