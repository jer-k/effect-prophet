//! Fixed public prediction states, including Prophet's singular gamma results.

use super::{LogisticParameters, predict_logistic_map};
use crate::additional_features::{
  AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::map_uncertainty::{
  SimulationError, SimulationOptions, SimulationRows, SimulationTrend, simulate_map,
};
use crate::piecewise_map::PiecewiseMapPredictionError;
use crate::reference_fixtures::{numbers, scaling_mode};
use crate::target_scaling::{LogisticFloorPolicy, LogisticScaling};

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn fixed_public_logistic_states_match_python_finite_and_singular_rows() {
  let fixture: serde_json::Value = serde_json::from_str(include_str!(
    "../../../integration/fixtures/prophet-1.4.0/logistic-prediction-state.json"
  ))
  .unwrap();
  let tolerance = fixture["toleranceAbsolute"].as_f64().unwrap();

  for case in fixture["cases"].as_array().unwrap() {
    let times = numbers(&case["times"]);
    let capacities = numbers(&case["capacities"]);
    let floors = numbers(&case["floors"]);
    let points = numbers(&case["parameters"]["changepoints"]);
    let parameters = LogisticParameters {
      rate: case["parameters"]["rate"].as_f64().unwrap(),
      offset: case["parameters"]["offset"].as_f64().unwrap(),
      deltas: numbers(&case["parameters"]["deltas"]),
    };

    for (row, expected) in case["expected"].as_array().unwrap().iter().enumerate() {
      let actual = predict_logistic_map(
        &times[row..row + 1],
        &capacities[row..row + 1],
        Some(&floors[row..row + 1]),
        LogisticScaling {
          mode: scaling_mode(&case["scaling"]),
          scale: case["scale"].as_f64().unwrap(),
          floor_policy: LogisticFloorPolicy::Explicit,
        },
        &parameters,
        0.0,
        1.0,
        &points,
        1.0,
        &[],
        &[],
        SeasonalityMaskView {
          row_count: 1,
          component_count: 0,
          values: &[],
        },
        FeatureMatrixView {
          row_count: 1,
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
      );

      let simulation = simulate_map(
        SimulationTrend::Logistic {
          parameters: &parameters,
          scaling: LogisticScaling {
            mode: scaling_mode(&case["scaling"]),
            scale: case["scale"].as_f64().unwrap(),
            floor_policy: LogisticFloorPolicy::Explicit,
          },
          capacities: &capacities[row..row + 1],
          floors: Some(&floors[row..row + 1]),
          time_origin: 0.0,
          time_scale: 1.0,
          changepoints: &points,
        },
        1.0,
        SimulationRows {
          timestamps: &times[row..row + 1],
          additive: &[0.0],
          multiplicative: &[0.0],
        },
        SimulationOptions {
          seed: 19,
          samples: 2,
          interval_width: 0.8,
        },
      );

      match expected["kind"].as_str().unwrap() {
        "finite" => {
          assert!(
            simulation.is_ok(),
            "{} row {row}: finite simulation baseline",
            case["id"]
          );
          let prediction =
            actual.unwrap_or_else(|error| panic!("{} row {row}: {error:?}", case["id"]));
          assert!(
            (prediction.values()[0] - expected["trend"].as_f64().unwrap()).abs() <= tolerance,
            "{} row {row}: {} versus {}",
            case["id"],
            prediction.values()[0],
            expected["trend"],
          );
        }
        "non-finite" => {
          assert_eq!(
            actual,
            Err(PiecewiseMapPredictionError::NonFiniteResult { row: 0 }),
            "{} row {row}: do not substitute the continuous extension",
            case["id"],
          );
          assert!(
            matches!(
              simulation,
              Err(SimulationError::NonFiniteResult { row: 0, sample: 0 })
            ),
            "{} row {row}: shared simulation baseline must retain the failure",
            case["id"]
          );
        }
        _ => panic!("unknown generated oracle outcome"),
      }
    }
  }
}
