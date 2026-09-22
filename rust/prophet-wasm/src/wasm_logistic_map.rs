use wasm_bindgen::prelude::wasm_bindgen;

use crate::logistic_map::{LogisticParameters, fit_logistic_map, predict_logistic_map};
use crate::piecewise_map::resolve_automatic_changepoints;
use crate::target_scaling::{LogisticFloorPolicy, LogisticScaling, ScalingMode};
use crate::wasm_map::{
  PiecewiseMapFitStatus, PiecewiseMapPredictionStatus, prediction_error_frame, status_for_fit_error,
};
use crate::wasm_mixed_map::{
  layout_view, mask_view, matrix_view, parse_controls, parse_metadata, parse_modes,
  parse_seasonalities, termination_code,
};
use crate::wasm_protocol::parse_nonnegative_integer;

/// Fit a floor-aware logistic MAP model through one checked WASM call.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn fit_logistic_map_with_features(
  timestamps: &[f64],
  values: &[f64],
  capacities: &[f64],
  floor_policy: f64,
  explicit_floors: &[f64],
  scaling_mode: f64,
  changepoint_mode: f64,
  explicit_changepoints: &[f64],
  automatic_count: f64,
  automatic_range: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonal_prior_scales: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_prior_scales: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
  changepoint_prior_scale: f64,
  max_iterations: f64,
  relative_tolerance: f64,
  absolute_tolerance: f64,
) -> Vec<f64> {
  let Some(scaling) = ScalingMode::from_code(scaling_mode) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let floors = match floor_policy {
    0.0 if explicit_floors.is_empty() => None,
    1.0 => Some(explicit_floors),
    _ => return fit_error(PiecewiseMapFitStatus::InvalidConfiguration),
  };
  let Ok(seasonalities) =
    parse_seasonalities(periods_days, fourier_orders, Some(seasonal_prior_scales))
  else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Some(controls) = parse_controls(max_iterations, relative_tolerance, absolute_tolerance)
  else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let changepoints = if changepoint_mode == 0.0 {
    if automatic_count != 0.0 || automatic_range != 0.0 {
      return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
    }
    explicit_changepoints.to_vec()
  } else if changepoint_mode == 1.0 && explicit_changepoints.is_empty() {
    let Some(count) = parse_nonnegative_integer(automatic_count) else {
      return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
    };
    let Ok(points) = resolve_automatic_changepoints(timestamps, count, automatic_range) else {
      return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
    };
    points
  } else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Some(additional_columns) = parse_nonnegative_integer(additional_column_count) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Ok(metadata) = parse_metadata(
    timestamps.len(),
    seasonalities.len(),
    seasonality_masks,
    additional_columns,
    additional_values,
    additional_prior_scales,
    additional_component_offsets,
    additional_component_counts,
  ) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };
  let Ok(modes) = parse_modes(column_modes) else {
    return fit_error(PiecewiseMapFitStatus::InvalidConfiguration);
  };

  match fit_logistic_map(
    timestamps,
    values,
    capacities,
    floors,
    &changepoints,
    &seasonalities,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
    layout_view(additional_prior_scales, &metadata.offsets, &metadata.counts),
    &modes,
    changepoint_prior_scale,
    controls,
    scaling,
  ) {
    Ok(model) => {
      let changepoint_count = model.changepoint_timestamps.len();
      let mut packed = Vec::with_capacity(
        16 + changepoint_count * 2 + model.coefficients.len() + model.additional_coefficients.len(),
      );
      let (floor_code, implicit_floor) = match model.scaling.floor_policy {
        LogisticFloorPolicy::Implicit(floor) => (0.0, floor),
        LogisticFloorPolicy::Explicit => (1.0, 0.0),
      };

      packed.extend_from_slice(&[
        0.0,
        model.scaling.mode.code(),
        model.scaling.scale,
        floor_code,
        implicit_floor,
        model.parameters.rate,
        model.parameters.offset,
        model.time_origin,
        model.time_scale,
        model.noise_scale,
        changepoint_count as f64,
        model.summary.observation_count as f64,
        model.summary.iterations as f64,
        model.summary.objective,
        model.summary.stationarity_residual,
        termination_code(model.summary.termination),
      ]);
      packed.extend_from_slice(&model.changepoint_timestamps);
      packed.extend_from_slice(&model.parameters.deltas);
      packed.extend_from_slice(&model.coefficients);
      packed.extend_from_slice(&model.additional_coefficients);
      packed
    }
    Err(error) => fit_error(status_for_fit_error(error)),
  }
}

/// Predict a complete floor-aware logistic MAP batch.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn predict_logistic_map_with_features(
  timestamps: &[f64],
  capacities: &[f64],
  explicit_floors: &[f64],
  scaling_mode: f64,
  target_scale: f64,
  floor_policy: f64,
  implicit_floor: f64,
  rate: f64,
  offset: f64,
  time_origin: f64,
  time_scale: f64,
  changepoint_timestamps: &[f64],
  deltas: &[f64],
  noise_scale: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonal_coefficients: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_coefficients: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
) -> Vec<f64> {
  let Ok(scaling) =
    LogisticScaling::parse(scaling_mode, target_scale, floor_policy, implicit_floor)
  else {
    return prediction_error(PiecewiseMapPredictionStatus::InvalidModel);
  };
  let floors = match scaling.floor_policy {
    LogisticFloorPolicy::Implicit(_) if explicit_floors.is_empty() => None,
    LogisticFloorPolicy::Explicit => Some(explicit_floors),
    _ => return prediction_error(PiecewiseMapPredictionStatus::InvalidConfiguration),
  };
  let Ok(seasonalities) = parse_seasonalities(periods_days, fourier_orders, None) else {
    return prediction_error(PiecewiseMapPredictionStatus::InvalidConfiguration);
  };
  let Some(additional_columns) = parse_nonnegative_integer(additional_column_count) else {
    return prediction_error(PiecewiseMapPredictionStatus::InvalidConfiguration);
  };
  let placeholder_priors = vec![1.0; additional_columns];
  let Ok(metadata) = parse_metadata(
    timestamps.len(),
    seasonalities.len(),
    seasonality_masks,
    additional_columns,
    additional_values,
    &placeholder_priors,
    additional_component_offsets,
    additional_component_counts,
  ) else {
    return prediction_error(PiecewiseMapPredictionStatus::InvalidConfiguration);
  };
  let Ok(modes) = parse_modes(column_modes) else {
    return prediction_error(PiecewiseMapPredictionStatus::InvalidConfiguration);
  };

  match predict_logistic_map(
    timestamps,
    capacities,
    floors,
    scaling,
    &LogisticParameters {
      rate,
      offset,
      deltas: deltas.to_vec(),
    },
    time_origin,
    time_scale,
    changepoint_timestamps,
    noise_scale,
    &seasonalities,
    seasonal_coefficients,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
    layout_view(&placeholder_priors, &metadata.offsets, &metadata.counts),
    additional_coefficients,
    &modes,
  ) {
    Ok(batch) => success_frame(batch.values()),
    Err(error) => prediction_error_frame(error),
  }
}

fn fit_error(status: PiecewiseMapFitStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
}

fn prediction_error(status: PiecewiseMapPredictionStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
}

fn success_frame(values: &[f64]) -> Vec<f64> {
  let mut packed = Vec::with_capacity(values.len().saturating_add(1));
  packed.push(0.0);
  packed.extend_from_slice(values);
  packed
}

#[cfg(test)]
mod tests {
  use super::{fit_logistic_map_with_features, predict_logistic_map_with_features};

  #[test]
  fn frames_a_logistic_fit_and_prediction() {
    let fit = fit_logistic_map_with_features(
      &[0.0, 1.0, 2.0, 3.0, 4.0, 5.0],
      &[1.2, 2.2, 4.2, 6.1, 7.6, 8.9],
      &[10.0; 6],
      0.0,
      &[],
      0.0,
      0.0,
      &[],
      0.0,
      0.0,
      &[],
      &[],
      &[],
      &[],
      0.0,
      &[],
      &[],
      &[],
      &[],
      &[],
      0.05,
      10_000.0,
      1e-7,
      1e-9,
    );

    assert_eq!(fit[0], 0.0);
    assert_eq!(fit.len(), 16);

    let prediction = predict_logistic_map_with_features(
      &[6.0],
      &[10.0],
      &[],
      fit[1],
      fit[2],
      fit[3],
      fit[4],
      fit[5],
      fit[6],
      fit[7],
      fit[8],
      &[],
      &[],
      fit[9],
      &[],
      &[],
      &[],
      &[],
      0.0,
      &[],
      &[],
      &[],
      &[],
      &[],
    );

    assert_eq!(prediction[0], 0.0);
    assert_eq!(prediction.len(), 5);
    assert!(prediction[1] > 0.0 && prediction[1] < 10.0);
  }
}
