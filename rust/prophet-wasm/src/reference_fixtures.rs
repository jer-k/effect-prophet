//! Trusted, generated reference-fixture projections shared by numerical tests.

use crate::mixed_map::ComponentMode;
use crate::target_scaling::ScalingMode;

pub(crate) fn numbers(value: &serde_json::Value) -> Vec<f64> {
  value
    .as_array()
    .unwrap()
    .iter()
    .map(|value| value.as_f64().unwrap())
    .collect()
}

pub(crate) fn scaling_mode(value: &serde_json::Value) -> ScalingMode {
  match value.as_str().unwrap() {
    "absmax" => ScalingMode::AbsMax,
    "minmax" => ScalingMode::MinMax,
    _ => panic!("generated fixture must declare a known scaling mode"),
  }
}

pub(crate) fn modes(value: &serde_json::Value) -> Vec<ComponentMode> {
  value
    .as_array()
    .unwrap()
    .iter()
    .map(|value| match value.as_str().unwrap() {
      "additive" => ComponentMode::Additive,
      "multiplicative" => ComponentMode::Multiplicative,
      _ => panic!("generated fixture must declare a known mode"),
    })
    .collect()
}
