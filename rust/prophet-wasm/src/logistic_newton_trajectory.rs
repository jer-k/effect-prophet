//! Same-state Newton steps are distinct from independently fitted trajectories.

use super::StanLogisticObjective;
use crate::reference_fixtures::numbers;
use crate::stan::optimizer::{NewtonTermination, optimize_newton};

#[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
#[cfg_attr(not(target_arch = "wasm32"), test)]
fn low_noise_same_state_newton_steps_match_the_pinned_executable() {
  let fixture: serde_json::Value = serde_json::from_str(include_str!(
    "../../../integration/fixtures/prophet-1.4.0/stan-logistic-objective.json"
  ))
  .unwrap();
  let case = fixture["cases"]
    .as_array()
    .unwrap()
    .iter()
    .find(|case| case["id"] == "implicit-empty-default")
    .unwrap();
  let target = numbers(&case["target"]);
  let capacities = numbers(&case["capacities"]);
  let times = numbers(&case["times"]);
  let objective =
    StanLogisticObjective::new(&target, &capacities, &times, &[], &[], &[], &[], 0.05).unwrap();
  let tolerance = fixture["tolerances"]["initialAbsolute"].as_f64().unwrap();
  let mut checked = 0;

  for probe in case["probes"].as_array().unwrap() {
    let Some(step) = probe.get("newtonStep") else {
      continue;
    };
    let initial = numbers(&step["initial"]);
    let initial_density =
      objective.evaluate(&initial).unwrap().value + objective.log_density_constant();
    let fit = optimize_newton(&initial, initial_density, 1, |parameters| {
      objective.evaluate(parameters)
    })
    .unwrap();
    assert_eq!(fit.iterations, 1);
    assert_eq!(fit.termination, NewtonTermination::IterationLimit);
    let expected = numbers(&step["parameters"]);
    assert_eq!(fit.parameters.len(), expected.len());

    for (column, (actual, expected)) in fit.parameters.iter().zip(expected).enumerate() {
      assert!(
        (actual - expected).abs() <= tolerance,
        "iteration {} coordinate {column}: {actual} versus {expected}",
        probe["trajectoryIteration"]
      );
    }
    checked += 1;
  }
  assert_eq!(checked, 3, "all frozen low-noise seams must run");
}
