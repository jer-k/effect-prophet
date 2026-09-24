//! Checked coarse generated bindings for MAP predictive draws.

use wasm_bindgen::prelude::wasm_bindgen;

use crate::logistic_map::{LogisticParameters, predict_logistic_map};
use crate::map_uncertainty::{
  PredictiveSamples, SimulationError, SimulationOptions, SimulationRows, SimulationTrend,
  checked_cells, reduce_intervals, simulate_map,
};
use crate::mixed_map::{MixedTrendModel, predict_mixed_map};
use crate::piecewise_linear::PiecewiseTrend;
use crate::piecewise_map::PiecewiseMapPredictionError;
use crate::target_scaling::{LogisticFloorPolicy, LogisticScaling, TargetScaling};
use crate::wasm_mixed_map::{
  layout_view, mask_view, matrix_view, parse_metadata, parse_modes, parse_seasonalities,
};
use crate::wasm_protocol::{parse_nonnegative_integer, parse_positive_integer};

const INVALID_REQUEST: f64 = 1.0;
const INVALID_MODEL: f64 = 2.0;
const RESOURCE_LIMIT: f64 = 3.0;
const NONFINITE_RESULT: f64 = 4.0;

fn error_frame(error: SimulationError) -> Vec<f64> {
  match error {
    SimulationError::InvalidShape | SimulationError::InvalidOptions => vec![INVALID_REQUEST],
    SimulationError::InvalidModel => vec![INVALID_MODEL],
    SimulationError::ResourceLimit => vec![RESOURCE_LIMIT],
    SimulationError::NonFiniteResult { row, sample } => {
      vec![NONFINITE_RESULT, row as f64, sample as f64]
    }
  }
}

fn prediction_error(error: PiecewiseMapPredictionError) -> Vec<f64> {
  match error {
    PiecewiseMapPredictionError::InvalidModel => vec![INVALID_MODEL],
    PiecewiseMapPredictionError::SizeOverflow => vec![RESOURCE_LIMIT],
    PiecewiseMapPredictionError::InvalidTimestamp { .. } => vec![INVALID_REQUEST],
    PiecewiseMapPredictionError::NonFiniteResult { row } => {
      vec![NONFINITE_RESULT, row as f64, 0.0]
    }
    _ => vec![INVALID_REQUEST],
  }
}

/// Simulate and optionally reduce a featureful MAP prediction in one WASM call.
///
/// Growth code 0 is linear and 1 is flat. Output code 0 returns intervals and 1 returns
/// row-major samples. Success frames are `[0, output, N, S, ...]`, with interval rows
/// `[trend_low, trend_high, value_low, value_high]` or two N*S arrays for samples.
/// Failure frames contain a bounded status (1 request, 2 model, 3 limit, 4 nonfinite),
/// optionally followed by a row or row/sample index. No borrowed WASM view escapes.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn simulate_map_with_features(
  timestamps: &[f64],
  growth_code: f64,
  scaling_mode: f64,
  target_offset: f64,
  target_scale: f64,
  intercept_or_level: f64,
  slope: f64,
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
  seed: f64,
  sample_count: f64,
  interval_width: f64,
  output_code: f64,
) -> Vec<f64> {
  let Some(seed) = parse_nonnegative_integer(seed).and_then(|value| u32::try_from(value).ok())
  else {
    return vec![INVALID_REQUEST];
  };
  let Some(samples) = parse_positive_integer(sample_count) else {
    return vec![INVALID_REQUEST];
  };
  if !matches!(output_code, 0.0 | 1.0)
    || !interval_width.is_finite()
    || interval_width <= 0.0
    || interval_width >= 1.0
    || !matches!(growth_code, 0.0 | 1.0)
  {
    return vec![INVALID_REQUEST];
  }
  if let Err(error) = checked_cells(timestamps.len(), samples) {
    return error_frame(error);
  }
  if changepoint_timestamps.len() > 10_000 || deltas.len() > 10_000 {
    return vec![RESOURCE_LIMIT];
  }

  let Ok(scaling) = TargetScaling::parse(scaling_mode, target_offset, target_scale) else {
    return vec![INVALID_MODEL];
  };
  let trend = match growth_code {
    0.0 => MixedTrendModel::Linear(PiecewiseTrend {
      intercept: intercept_or_level,
      slope,
      time_origin,
      time_scale,
      changepoint_timestamps: changepoint_timestamps.to_vec(),
      deltas: deltas.to_vec(),
    }),
    _ => {
      if !slope.is_finite()
        || slope != 0.0
        || !time_origin.is_finite()
        || time_origin != 0.0
        || !time_scale.is_finite()
        || time_scale != 0.0
        || !changepoint_timestamps.is_empty()
        || !deltas.is_empty()
      {
        return vec![INVALID_MODEL];
      }
      MixedTrendModel::Flat {
        level: intercept_or_level,
      }
    }
  };
  let Ok(seasonalities) = parse_seasonalities(periods_days, fourier_orders, None) else {
    return vec![INVALID_REQUEST];
  };
  let Some(additional_columns) = parse_nonnegative_integer(additional_column_count) else {
    return vec![INVALID_REQUEST];
  };
  if additional_columns > 10_000
    || timestamps
      .len()
      .checked_mul(additional_columns)
      .is_none_or(|cells| cells > 1_000_000)
  {
    return vec![RESOURCE_LIMIT];
  }
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
    return vec![INVALID_REQUEST];
  };
  let Ok(modes) = parse_modes(column_modes) else {
    return vec![INVALID_REQUEST];
  };

  let fixed = match predict_mixed_map(
    timestamps,
    scaling,
    &trend,
    noise_scale,
    &seasonalities,
    seasonal_coefficients,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
    layout_view(&placeholder_priors, &metadata.offsets, &metadata.counts),
    additional_coefficients,
    &modes,
  ) {
    Ok(fixed) => fixed,
    Err(error) => return prediction_error(error),
  };
  let width = seasonalities.len() + metadata.offsets.len() + 4;
  let additive: Vec<f64> = fixed
    .values()
    .chunks_exact(width)
    .map(|row| row[1])
    .collect();
  let multiplicative: Vec<f64> = fixed
    .values()
    .chunks_exact(width)
    .map(|row| row[2])
    .collect();
  let simulation_trend = match &trend {
    MixedTrendModel::Linear(trend) => SimulationTrend::Linear { trend, scaling },
    MixedTrendModel::Flat { level } => SimulationTrend::Flat {
      level: *level,
      scaling,
    },
  };
  let draws = match simulate_map(
    simulation_trend,
    noise_scale,
    SimulationRows {
      timestamps,
      additive: &additive,
      multiplicative: &multiplicative,
    },
    SimulationOptions {
      seed,
      samples,
      interval_width,
    },
  ) {
    Ok(draws) => draws,
    Err(error) => return error_frame(error),
  };

  pack_samples(draws, interval_width, output_code)
}

/// Simulate floor-aware logistic MAP from the complete deterministic prediction state.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn simulate_logistic_map_with_features(
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
  seed: f64,
  sample_count: f64,
  interval_width: f64,
  output_code: f64,
) -> Vec<f64> {
  let Some(seed) = parse_nonnegative_integer(seed).and_then(|value| u32::try_from(value).ok())
  else {
    return vec![INVALID_REQUEST];
  };
  let Some(samples) = parse_positive_integer(sample_count) else {
    return vec![INVALID_REQUEST];
  };
  if !matches!(output_code, 0.0 | 1.0)
    || !interval_width.is_finite()
    || interval_width <= 0.0
    || interval_width >= 1.0
  {
    return vec![INVALID_REQUEST];
  }
  if let Err(error) = checked_cells(timestamps.len(), samples) {
    return error_frame(error);
  }
  if changepoint_timestamps.len() > 10_000 || deltas.len() > 10_000 {
    return vec![RESOURCE_LIMIT];
  }
  let Ok(scaling) =
    LogisticScaling::parse(scaling_mode, target_scale, floor_policy, implicit_floor)
  else {
    return vec![INVALID_MODEL];
  };
  let floors = match scaling.floor_policy {
    LogisticFloorPolicy::Implicit(_) if explicit_floors.is_empty() => None,
    LogisticFloorPolicy::Explicit => Some(explicit_floors),
    _ => return vec![INVALID_REQUEST],
  };
  let Ok(seasonalities) = parse_seasonalities(periods_days, fourier_orders, None) else {
    return vec![INVALID_REQUEST];
  };
  let Some(additional_columns) = parse_nonnegative_integer(additional_column_count) else {
    return vec![INVALID_REQUEST];
  };
  if additional_columns > 10_000
    || timestamps
      .len()
      .checked_mul(additional_columns)
      .is_none_or(|cells| cells > 1_000_000)
  {
    return vec![RESOURCE_LIMIT];
  }
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
    return vec![INVALID_REQUEST];
  };
  let Ok(modes) = parse_modes(column_modes) else {
    return vec![INVALID_REQUEST];
  };
  let parameters = LogisticParameters {
    rate,
    offset,
    deltas: deltas.to_vec(),
  };
  let fixed = match predict_logistic_map(
    timestamps,
    capacities,
    floors,
    scaling,
    &parameters,
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
    Ok(fixed) => fixed,
    Err(error) => return prediction_error(error),
  };
  let width = seasonalities.len() + metadata.offsets.len() + 4;
  let additive: Vec<f64> = fixed
    .values()
    .chunks_exact(width)
    .map(|row| row[1])
    .collect();
  let multiplicative: Vec<f64> = fixed
    .values()
    .chunks_exact(width)
    .map(|row| row[2])
    .collect();
  let draws = match simulate_map(
    SimulationTrend::Logistic {
      parameters: &parameters,
      scaling,
      capacities,
      floors,
      time_origin,
      time_scale,
      changepoints: changepoint_timestamps,
    },
    noise_scale,
    SimulationRows {
      timestamps,
      additive: &additive,
      multiplicative: &multiplicative,
    },
    SimulationOptions {
      seed,
      samples,
      interval_width,
    },
  ) {
    Ok(draws) => draws,
    Err(error) => return error_frame(error),
  };

  pack_samples(draws, interval_width, output_code)
}

fn pack_samples(draws: PredictiveSamples, interval_width: f64, output_code: f64) -> Vec<f64> {
  if output_code == 0.0 {
    match reduce_intervals(&draws, interval_width) {
      Ok(intervals) => {
        let mut frame = vec![0.0, 0.0, draws.rows as f64, draws.samples as f64];
        frame.extend(intervals.values);
        frame
      }
      Err(error) => error_frame(error),
    }
  } else {
    let mut frame = vec![0.0, 1.0, draws.rows as f64, draws.samples as f64];
    frame.extend(draws.trend);
    frame.extend(draws.value);
    frame
  }
}
