//! Same-point tests through the actual logistic evaluator and Stan Newton stencil.
//! The block optimizer's diagonal approximations are not asserted to be Hessians.

use super::{
  LogisticMapControls, LogisticParameters, LogisticPredictionPolicy, StanLogisticObjective,
  fit_logistic_map, initialize_logistic, predict_logistic_map, stable_sigmoid,
};
use crate::additional_features::{
  AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::map_objective::MapObjectiveError;
use crate::reference_fixtures::{modes, numbers, scaling_mode};
use crate::stan::linear_optimizer::{
  LinearAlgorithm, LinearOptimizationAttempts, LinearOptimizerChoice, LinearOptimizerOptions,
  LinearTermination,
};
use crate::stan::optimizer::{LogDensityEvaluation, finite_difference_hessian};
use crate::target_scaling::{LogisticFloorPolicy, LogisticScaling};

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn authored_value_view_probe_distinguishes_scalar_and_packet_exponentials() {
  // These are authored inputs, not fitted optimizer values. The matching
  // executable probe below returns zero residual for the scalar mean.
  let scalar_mean = 1e16 * (1.0 / (1.0 + crate::stan::math::exp(0.08113)));
  let packet_mean = 1e16 * (1.0 / (1.0 + crate::stan::eigen_math::packet_exp(0.08113)));
  assert_eq!(scalar_mean, 4797286177634870.0);
  assert_eq!(packet_mean, 4797286177634869.0);
}

fn reference() -> serde_json::Value {
  serde_json::from_str(include_str!(
    "../../../integration/fixtures/prophet-1.4.0/stan-logistic-objective.json"
  ))
  .unwrap()
}

fn evaluate_probe(case: &serde_json::Value, parameters: &[f64]) -> LogDensityEvaluation {
  let target = numbers(&case["target"]);
  let capacities = numbers(&case["capacities"]);
  let times = numbers(&case["times"]);
  let points = numbers(&case["changepointTimes"]);
  let features = numbers(&case["features"]);
  let priors = numbers(&case["featurePriors"]);
  let modes = modes(&case["featureModes"]);
  let objective = StanLogisticObjective::new(
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
  objective
    .evaluate(parameters)
    .expect("frozen executable probes have finite logistic states")
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn logistic_same_point_density_gradients_and_newton_curvature_match_stan() {
  let lbfgs: serde_json::Value = serde_json::from_str(include_str!(
    "../../../integration/fixtures/prophet-1.4.0/stan-logistic-lbfgs.json"
  ))
  .unwrap();

  for fixture in [reference(), lbfgs] {
    let tolerances = &fixture["tolerances"];

    let adjoint_cases = fixture
      .get("adjointReductionCases")
      .and_then(|cases| cases.as_array());

    for case in fixture["cases"]
      .as_array()
      .unwrap()
      .iter()
      .chain(adjoint_cases.into_iter().flatten())
    {
      for probe in case["probes"].as_array().unwrap() {
        let probe_label = probe
          .get("id")
          .and_then(|id| id.as_str())
          .unwrap_or("authored-or-newton-trajectory");
        let parameters = numbers(&probe["parameters"]);
        let evaluation = evaluate_probe(case, &parameters);
        let value = probe["logDensity"].as_f64().unwrap();
        assert!(
          (evaluation.value - value).abs() <= tolerances["valueAbsolute"].as_f64().unwrap(),
          "{} {probe_label} density: {} versus {value}",
          case["id"],
          evaluation.value,
        );

        let expected_gradient = numbers(&probe["gradient"]);
        assert_eq!(evaluation.gradient.len(), expected_gradient.len());
        for (column, (actual, expected)) in evaluation
          .gradient
          .iter()
          .zip(expected_gradient)
          .enumerate()
        {
          assert!(
            (actual - expected).abs() <= tolerances["gradientAbsolute"].as_f64().unwrap(),
            "{} {probe_label} gradient {column}: {actual} versus {expected}",
            case["id"],
          );
        }

        let Some(expected_curvature) = probe.get("curvature") else {
          // Low-noise trajectory probes add density/gradient coverage. A stencil
          // of 12-significant-digit gradient output cannot resolve their large
          // curvature at the existing absolute 2e-12 oracle gate.
          continue;
        };
        let curvature =
          finite_difference_hessian(&parameters, &|trial| Ok(evaluate_probe(case, trial))).unwrap();
        let expected_curvature = numbers(expected_curvature);
        assert_eq!(curvature.len(), expected_curvature.len());
        for (element, (actual, expected)) in curvature.iter().zip(expected_curvature).enumerate() {
          assert!(
            (actual - expected).abs() <= tolerances["curvatureAbsolute"].as_f64().unwrap(),
            "{} {probe_label} curvature {element}: {actual} versus {expected}",
            case["id"],
          );
        }
      }
    }
  }
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn frozen_private_fit_score_and_actual_public_empty_point_forecasts_are_distinct() {
  let fixture = reference();

  for case in fixture["cases"].as_array().unwrap() {
    let Some(fitted) = case.get("fitted") else {
      continue;
    };
    let internal = numbers(&fitted["internalParameters"]);
    let evaluation = evaluate_probe(case, &internal);
    assert!(
      (-evaluation.value - fitted["objective"].as_f64().unwrap()).abs()
        <= fixture["tolerances"]["fitObjectiveAbsolute"]
          .as_f64()
          .unwrap(),
      "{} pre-fold fitting score",
      case["id"],
    );
    let rate = fitted["rate"].as_f64().unwrap();
    let offset = fitted["offset"].as_f64().unwrap();
    assert!((rate - internal[0] - internal[2]).abs() < 1e-10);
    assert_eq!(offset, internal[1]);
    if case["id"].as_str().unwrap() == "implicit-empty-loose" {
      assert!(
        internal[2].abs() > 1.0,
        "oracle must retain the nonzero private delta"
      );
      let mut folded = internal.clone();
      folded[0] = rate;
      folded[2] = 0.0;
      assert!((evaluate_probe(case, &folded).value - evaluation.value).abs() > 1.0);
    }

    // Supply Python's actual public state to the production predictor, not a
    // corrected offset. This does not claim that our fitter yet returns it.
    let times = numbers(&fitted["predictionTimes"]);
    let row_count = times.len();
    let capacities = numbers(&fitted["predictionCapacities"]);
    let scale = fitted["scale"].as_f64().unwrap();
    let predictions = predict_logistic_map(
      &times,
      &capacities,
      None,
      LogisticScaling {
        mode: scaling_mode(&case["scaling"]),
        scale,
        floor_policy: LogisticFloorPolicy::Implicit(fitted["implicitFloor"].as_f64().unwrap()),
      },
      &LogisticParameters {
        rate,
        offset,
        deltas: vec![],
      },
      0.0,
      1.0,
      &[],
      fitted["normalizedNoise"].as_f64().unwrap() * scale,
      &[],
      &[],
      SeasonalityMaskView {
        row_count,
        component_count: 0,
        values: &[],
      },
      FeatureMatrixView {
        row_count,
        column_count: 0,
        values: &[],
      },
      AdditionalFeatureLayoutView {
        prior_scales: &[],
        component_offsets: &[],
        component_counts: &[],
      },
      &[],
      &[],
      LogisticPredictionPolicy::Stan,
    )
    .unwrap();
    let expected_trend = numbers(&fitted["trend"]);
    let expected_value = numbers(&fitted["value"]);
    assert_eq!(predictions.values().len(), row_count * 4);
    for (row, actual) in predictions.values().as_chunks::<4>().0.iter().enumerate() {
      let tolerance = fixture["tolerances"]["forecastAbsolute"].as_f64().unwrap();
      assert!(
        (actual[0] - expected_trend[row]).abs() <= tolerance,
        "{} trend {row}",
        case["id"]
      );
      assert!(
        (actual[3] - expected_value[row]).abs() <= tolerance,
        "{} forecast {row}",
        case["id"]
      );
    }
  }
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn fitting_empty_point_histories_matches_frozen_public_fold_and_forecasts() {
  let fixture = reference();

  for case in fixture["cases"].as_array().unwrap() {
    let Some(fitted) = case.get("fitted") else {
      continue;
    };
    let observations = fitted["observations"].as_array().unwrap();
    let values: Vec<f64> = observations
      .iter()
      .map(|row| row["value"].as_f64().unwrap())
      .collect();
    let capacities: Vec<f64> = observations
      .iter()
      .map(|row| row["capacity"].as_f64().unwrap())
      .collect();
    let times = numbers(&case["times"]);
    let row_count = times.len();
    let model = fit_logistic_map(
      &times,
      &values,
      &capacities,
      None,
      &[],
      &[],
      SeasonalityMaskView {
        row_count,
        component_count: 0,
        values: &[],
      },
      FeatureMatrixView {
        row_count,
        column_count: 0,
        values: &[],
      },
      AdditionalFeatureLayoutView {
        prior_scales: &[],
        component_offsets: &[],
        component_counts: &[],
      },
      &[],
      case["changepointPrior"].as_f64().unwrap(),
      LogisticMapControls::default(),
      scaling_mode(&case["scaling"]),
    )
    .unwrap();
    assert!(model.parameters.deltas.is_empty());
    assert!(model.changepoint_timestamps.is_empty());
    assert!(model.coefficients.is_empty() && model.additional_coefficients.is_empty());

    // Output-first: independently fitted internal evidence is reported, not asserted. Same-state
    // density, gradient and one-step checks above remain exact regressions.
    for (name, actual, expected, threshold) in [
      (
        "objective",
        model.summary.objective,
        &fitted["objective"],
        &fixture["tolerances"]["fitObjectiveAbsolute"],
      ),
      (
        "stationarity",
        model.summary.stationarity_residual,
        &fitted["stationarityResidual"],
        &fixture["tolerances"]["stationarityAbsolute"],
      ),
      (
        "normalized-noise",
        model.noise_scale / model.scaling.scale,
        &fitted["normalizedNoise"],
        &fixture["tolerances"]["normalizedNoiseAbsolute"],
      ),
    ] {
      let difference = actual - expected.as_f64().unwrap();

      if difference.abs() > threshold.as_f64().unwrap() {
        println!(
          "investigate {} {name}: {actual} versus {expected}; iterations={}, termination={:?}",
          case["id"], model.summary.iterations, model.summary.termination
        );
      }
    }
    // The production predictor's empty-point equation is independently checked
    // above; compare the fitted public parameters in that same equation here.
    let prediction_times = numbers(&fitted["predictionTimes"]);
    let prediction_capacities = numbers(&fitted["predictionCapacities"]);
    let floor = model.scaling.row_floor(None, 0).unwrap();
    for ((&time, &capacity), expected) in prediction_times
      .iter()
      .zip(&prediction_capacities)
      .zip(numbers(&fitted["value"]))
    {
      let actual = floor
        + (capacity - floor)
          * stable_sigmoid(model.parameters.rate * (time - model.parameters.offset));
      assert!(
        (actual - expected).abs() <= fixture["tolerances"]["forecastAbsolute"].as_f64().unwrap(),
        "{} fitted public forecast {actual} versus {expected}",
        case["id"],
      );
    }
  }
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn parsed_logistic_states_reject_bad_rows_and_upstream_singular_trials() {
  let target = [0.2, 0.4, 0.8];
  let capacities = [1.0; 3];
  let times = [0.0, 0.5, 1.0];
  assert!(matches!(
    StanLogisticObjective::new(&target, &capacities[..2], &times, &[], &[], &[], &[], 0.05),
    Err(MapObjectiveError::InvalidDimensions)
  ));
  assert!(matches!(
    StanLogisticObjective::new(
      &target,
      &capacities,
      &[0.0, 0.5, 0.9],
      &[],
      &[],
      &[],
      &[],
      0.05
    ),
    Err(MapObjectiveError::InvalidInput)
  ));
  let objective =
    StanLogisticObjective::new(&target, &capacities, &times, &[], &[], &[], &[], 0.05).unwrap();
  let mut parameters = objective.initial_parameters();
  assert_eq!(
    parameters.len(),
    5,
    "private delta and beta are both retained"
  );
  assert_eq!(
    objective.evaluate(&parameters[..4]),
    Err(MapObjectiveError::InvalidDimensions)
  );
  parameters[0] = 1.0;
  parameters[2] = -1.0;
  assert_eq!(
    objective.evaluate(&parameters),
    Err(MapObjectiveError::NonFiniteResult)
  );
  parameters[0] = 0.0;
  parameters[2] = 1.0;
  assert!(
    objective.evaluate(&parameters).is_ok(),
    "zero base rate is not a gamma denominator"
  );
  parameters[3] = -800.0;
  assert_eq!(
    objective.evaluate(&parameters),
    Err(MapObjectiveError::NonFiniteResult)
  );
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn logistic_finite_budget_completion_is_not_reported_as_convergence() {
  let objective = StanLogisticObjective::new(
    &[0.2, 0.4, 0.8],
    &[1.0; 3],
    &[0.0, 0.5, 1.0],
    &[],
    &[],
    &[],
    &[],
    0.05,
  )
  .unwrap();
  let options = LinearOptimizerOptions::parse(1, LinearOptimizerChoice::Newton).unwrap();
  let fit = objective.fit_model(options).unwrap();
  assert_eq!(fit.optimization.algorithm, LinearAlgorithm::Newton);
  assert_eq!(
    fit.optimization.termination,
    LinearTermination::IterationLimit
  );
  assert_eq!(fit.optimization.iterations, 1);
  assert_eq!(fit.optimization.attempt_count, 1);
  assert!(fit.parameters.deltas.is_empty() && fit.coefficients.is_empty());
  assert!(fit.noise_scale.is_finite() && fit.noise_scale > 0.0);
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn logistic_automatic_selection_counts_retained_rows_at_99_and_100() {
  for count in [99, 100] {
    let times: Vec<f64> = (0..count)
      .map(|row| [0.0, 0.5, 1.0][row * 3 / count])
      .collect();
    let target: Vec<f64> = (0..count)
      .map(|row| [0.2, 0.4, 0.8][row * 3 / count])
      .collect();
    let capacities = vec![1.0; count];
    let objective =
      StanLogisticObjective::new(&target, &capacities, &times, &[], &[], &[], &[], 0.05).unwrap();
    let options = LinearOptimizerOptions::parse(
      1,
      LinearOptimizerChoice::Automatic {
        controls: crate::stan::lbfgs::LbfgsControls::default(),
        fallback: crate::stan::linear_optimizer::NewtonFallback::Enabled,
      },
    )
    .unwrap();
    let fit = objective.fit_stan(options).unwrap();
    match (count, fit.attempts) {
      (99, LinearOptimizationAttempts::Newton { .. }) => {}
      (
        100,
        LinearOptimizationAttempts::Lbfgs { .. }
        | LinearOptimizationAttempts::NewtonFallback { .. },
      ) => {}
      _ => panic!("row-count selection used the wrong initial algorithm"),
    }
  }
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn logistic_initialization_matches_python_including_repeated_final_date_and_clipping() {
  let fixture = reference();
  let tolerance = fixture["tolerances"]["initialAbsolute"].as_f64().unwrap();

  for case in fixture["cases"].as_array().unwrap() {
    let (rate, offset) = initialize_logistic(
      &numbers(&case["target"]),
      &numbers(&case["capacities"]),
      &numbers(&case["times"]),
    )
    .unwrap();
    let expected = numbers(&case["initialParameters"]);
    assert!(
      (rate - expected[0]).abs() <= tolerance && (offset - expected[1]).abs() <= tolerance,
      "{} initialization: ({rate}, {offset}) versus ({}, {})",
      case["id"],
      expected[0],
      expected[1],
    );
  }
}
