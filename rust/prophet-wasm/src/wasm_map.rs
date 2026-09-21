use wasm_bindgen::prelude::wasm_bindgen;

use crate::piecewise_linear::PiecewiseTrend;
use crate::piecewise_map::{
  MapControls, MapTermination, PiecewiseMapError, PiecewiseMapPredictionError,
  fit_piecewise_map_with_scaling as fit_kernel_with_scaling,
  predict_piecewise_map as predict_kernel, resolve_automatic_changepoints,
};
use crate::seasonality::SeasonalitySpec;
use crate::target_scaling::{ScalingMode, TargetScaling};
use crate::wasm_protocol::{parse_nonnegative_integer, parse_positive_integer};

/// Status at index zero of a packed linear piecewise MAP fit result.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
#[wasm_bindgen]
pub enum PiecewiseMapFitStatus {
  /// Remaining entries contain fitted state and diagnostics.
  Success = 0,
  /// At least two observations are required.
  InsufficientObservations = 1,
  /// Input arrays that must align have different lengths.
  LengthMismatch = 2,
  /// A training row or timestamp order is invalid.
  InvalidObservation = 3,
  /// A changepoint, seasonality, prior, or control is invalid.
  InvalidConfiguration = 4,
  /// The training timestamp range is zero or unrepresentable.
  ZeroTimeRange = 5,
  /// Dimensions overflow or exceed the dense-buffer policy.
  SizeOverflow = 6,
  /// Finite input produced a non-finite result.
  NonFiniteResult = 7,
  /// No reliable finite interior noise optimum exists.
  NoiseCollapse = 8,
  /// The deterministic optimizer budget was exhausted.
  NonConvergence = 9,
  /// Finite targets produced an unrepresentable scaling domain.
  NonRepresentableScaling = 10,
}

/// Status at index zero of a packed linear piecewise prediction result.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
#[wasm_bindgen]
pub enum PiecewiseMapPredictionStatus {
  /// Remaining entries contain row-major predictions.
  Success = 0,
  /// A prediction timestamp is invalid.
  InvalidTimestamp = 1,
  /// Stored model metadata is invalid.
  InvalidModel = 2,
  /// A seasonal definition is invalid.
  InvalidConfiguration = 3,
  /// Dimensions overflow or exceed the dense-buffer policy.
  SizeOverflow = 4,
  /// Evaluation produced a non-finite result.
  NonFiniteResult = 5,
}

/// Fit a linear piecewise MAP model through one coarse WASM call.
///
/// Changepoint mode is zero for explicit timestamps and one for automatic selection.
/// Success is `[0,C,intercept,slope,timeOrigin,timeScale,valueScale,noiseScale,
/// observationCount,iterations,objective,stationarity,termination,
/// ...C changepointTimestamps,...C deltas,...K coefficients]`.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn fit_piecewise_map(
  timestamps: &[f64],
  values: &[f64],
  changepoint_mode: f64,
  explicit_changepoints: &[f64],
  automatic_count: f64,
  automatic_range: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  prior_scales: &[f64],
  changepoint_prior_scale: f64,
  max_iterations: f64,
  relative_tolerance: f64,
  absolute_tolerance: f64,
) -> Vec<f64> {
  fit_piecewise_map_protocol(
    timestamps,
    values,
    changepoint_mode,
    explicit_changepoints,
    automatic_count,
    automatic_range,
    periods_days,
    fourier_orders,
    prior_scales,
    changepoint_prior_scale,
    max_iterations,
    relative_tolerance,
    absolute_tolerance,
    ScalingMode::AbsMax,
    false,
  )
}

/// Fit a linear piecewise MAP model with explicit Prophet target scaling.
///
/// Success prepends `[mode, offset, scale]` to the legacy success payload.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn fit_piecewise_map_with_scaling(
  timestamps: &[f64],
  values: &[f64],
  scaling_mode: f64,
  changepoint_mode: f64,
  explicit_changepoints: &[f64],
  automatic_count: f64,
  automatic_range: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  prior_scales: &[f64],
  changepoint_prior_scale: f64,
  max_iterations: f64,
  relative_tolerance: f64,
  absolute_tolerance: f64,
) -> Vec<f64> {
  let Some(scaling_mode) = ScalingMode::from_code(scaling_mode) else {
    return fit_status_frame(PiecewiseMapFitStatus::InvalidConfiguration);
  };

  fit_piecewise_map_protocol(
    timestamps,
    values,
    changepoint_mode,
    explicit_changepoints,
    automatic_count,
    automatic_range,
    periods_days,
    fourier_orders,
    prior_scales,
    changepoint_prior_scale,
    max_iterations,
    relative_tolerance,
    absolute_tolerance,
    scaling_mode,
    true,
  )
}

#[allow(clippy::too_many_arguments)]
fn fit_piecewise_map_protocol(
  timestamps: &[f64],
  values: &[f64],
  changepoint_mode: f64,
  explicit_changepoints: &[f64],
  automatic_count: f64,
  automatic_range: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  prior_scales: &[f64],
  changepoint_prior_scale: f64,
  max_iterations: f64,
  relative_tolerance: f64,
  absolute_tolerance: f64,
  scaling_mode: ScalingMode,
  include_scaling: bool,
) -> Vec<f64> {
  let seasonalities = match parse_seasonalities(periods_days, fourier_orders, prior_scales) {
    Ok(value) => value,
    Err(status) => return fit_status_frame(status),
  };
  let controls = match parse_controls(max_iterations, relative_tolerance, absolute_tolerance) {
    Ok(value) => value,
    Err(status) => return fit_status_frame(status),
  };
  let changepoints = if changepoint_mode == 0.0 {
    if automatic_count != 0.0 || automatic_range != 0.0 {
      return fit_status_frame(PiecewiseMapFitStatus::InvalidConfiguration);
    }

    explicit_changepoints.to_vec()
  } else if changepoint_mode == 1.0 {
    if !explicit_changepoints.is_empty() {
      return fit_status_frame(PiecewiseMapFitStatus::InvalidConfiguration);
    }

    let count = match parse_nonnegative_integer(automatic_count) {
      Some(value) => value,
      None => return fit_status_frame(PiecewiseMapFitStatus::InvalidConfiguration),
    };

    match resolve_automatic_changepoints(timestamps, count, automatic_range) {
      Ok(value) => value,
      Err(error) => return fit_status_frame(status_for_fit_error(error)),
    }
  } else {
    return fit_status_frame(PiecewiseMapFitStatus::InvalidConfiguration);
  };

  match fit_kernel_with_scaling(
    timestamps,
    values,
    &changepoints,
    &seasonalities,
    changepoint_prior_scale,
    controls,
    scaling_mode,
  ) {
    Ok(model) => {
      let changepoint_count = model.trend.changepoint_timestamps.len();
      let metadata_width = if include_scaling { 3 } else { 0 };
      let Some(capacity) = changepoint_count
        .checked_mul(2)
        .and_then(|count| count.checked_add(model.coefficients.len()))
        .and_then(|count| count.checked_add(13 + metadata_width))
      else {
        return fit_status_frame(PiecewiseMapFitStatus::SizeOverflow);
      };
      let termination = match model.summary.termination {
        MapTermination::Converged => 0.0,
        MapTermination::ConstantTargetShortcut => 1.0,
      };
      let mut packed = Vec::with_capacity(capacity);

      packed.push(f64::from(PiecewiseMapFitStatus::Success as u32));

      if include_scaling {
        packed.extend_from_slice(&[
          model.target_scaling.mode.code(),
          model.target_scaling.offset,
          model.target_scaling.scale,
        ]);
      }

      packed.extend_from_slice(&[
        changepoint_count as f64,
        model.trend.intercept,
        model.trend.slope,
        model.trend.time_origin,
        model.trend.time_scale,
        model.summary.value_scale,
        model.noise_scale,
        model.summary.observation_count as f64,
        model.summary.iterations as f64,
        model.summary.objective,
        model.summary.stationarity_residual,
        termination,
      ]);
      packed.extend_from_slice(&model.trend.changepoint_timestamps);
      packed.extend_from_slice(&model.trend.deltas);
      packed.extend_from_slice(&model.coefficients);

      packed
    }
    Err(error) => fit_status_frame(status_for_fit_error(error)),
  }
}

/// Evaluate a stored linear piecewise MAP model through one coarse WASM call.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn predict_piecewise_map(
  timestamps: &[f64],
  intercept: f64,
  slope: f64,
  time_origin: f64,
  time_scale: f64,
  changepoint_timestamps: &[f64],
  deltas: &[f64],
  noise_scale: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  coefficients: &[f64],
) -> Vec<f64> {
  let seasonalities = match parse_seasonalities_without_priors(periods_days, fourier_orders) {
    Ok(value) => value,
    Err(status) => return prediction_status_frame(status),
  };
  let trend = PiecewiseTrend {
    intercept,
    slope,
    time_origin,
    time_scale,
    changepoint_timestamps: changepoint_timestamps.to_vec(),
    deltas: deltas.to_vec(),
  };

  match predict_kernel(
    timestamps,
    &trend,
    noise_scale,
    &seasonalities,
    coefficients,
  ) {
    Ok(prediction) => {
      let Some(capacity) = prediction.values().len().checked_add(1) else {
        return prediction_status_frame(PiecewiseMapPredictionStatus::SizeOverflow);
      };
      let mut packed = Vec::with_capacity(capacity);

      packed.push(f64::from(PiecewiseMapPredictionStatus::Success as u32));
      packed.extend_from_slice(prediction.values());

      packed
    }
    Err(error) => prediction_error_frame(error),
  }
}

/// Evaluate relative output-unit MAP state with stored target scaling.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn predict_piecewise_map_with_scaling(
  timestamps: &[f64],
  scaling_mode: f64,
  target_offset: f64,
  target_scale: f64,
  intercept: f64,
  slope: f64,
  time_origin: f64,
  time_scale: f64,
  changepoint_timestamps: &[f64],
  deltas: &[f64],
  noise_scale: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  coefficients: &[f64],
) -> Vec<f64> {
  let scaling = match TargetScaling::parse(scaling_mode, target_offset, target_scale) {
    Ok(value) => value,
    Err(_) => return prediction_status_frame(PiecewiseMapPredictionStatus::InvalidModel),
  };
  let intercept = match scaling.restore_trend(intercept) {
    Ok(value) => value,
    Err(_) => return prediction_status_frame(PiecewiseMapPredictionStatus::InvalidModel),
  };

  predict_piecewise_map(
    timestamps,
    intercept,
    slope,
    time_origin,
    time_scale,
    changepoint_timestamps,
    deltas,
    noise_scale,
    periods_days,
    fourier_orders,
    coefficients,
  )
}

fn parse_controls(
  max_iterations: f64,
  relative_tolerance: f64,
  absolute_tolerance: f64,
) -> Result<MapControls, PiecewiseMapFitStatus> {
  let max_iterations =
    parse_positive_integer(max_iterations).ok_or(PiecewiseMapFitStatus::InvalidConfiguration)?;

  if !relative_tolerance.is_finite()
    || relative_tolerance <= 0.0
    || !absolute_tolerance.is_finite()
    || absolute_tolerance <= 0.0
  {
    return Err(PiecewiseMapFitStatus::InvalidConfiguration);
  }

  Ok(MapControls {
    max_iterations,
    relative_tolerance,
    absolute_tolerance,
  })
}

fn parse_seasonalities(
  periods_days: &[f64],
  fourier_orders: &[f64],
  prior_scales: &[f64],
) -> Result<Vec<SeasonalitySpec>, PiecewiseMapFitStatus> {
  if periods_days.len() != fourier_orders.len() || periods_days.len() != prior_scales.len() {
    return Err(PiecewiseMapFitStatus::LengthMismatch);
  }

  periods_days
    .iter()
    .zip(fourier_orders)
    .zip(prior_scales)
    .map(|((&period_days, &order), &prior_scale)| {
      let fourier_order =
        parse_positive_integer(order).ok_or(PiecewiseMapFitStatus::InvalidConfiguration)?;

      if !period_days.is_finite()
        || period_days <= 0.0
        || !prior_scale.is_finite()
        || prior_scale <= 0.0
      {
        return Err(PiecewiseMapFitStatus::InvalidConfiguration);
      }

      Ok(SeasonalitySpec {
        period_days,
        fourier_order,
        prior_scale,
      })
    })
    .collect()
}

fn parse_seasonalities_without_priors(
  periods_days: &[f64],
  fourier_orders: &[f64],
) -> Result<Vec<SeasonalitySpec>, PiecewiseMapPredictionStatus> {
  if periods_days.len() != fourier_orders.len() {
    return Err(PiecewiseMapPredictionStatus::InvalidConfiguration);
  }

  periods_days
    .iter()
    .zip(fourier_orders)
    .map(|(&period_days, &order)| {
      let fourier_order =
        parse_positive_integer(order).ok_or(PiecewiseMapPredictionStatus::InvalidConfiguration)?;

      if !period_days.is_finite() || period_days <= 0.0 {
        return Err(PiecewiseMapPredictionStatus::InvalidConfiguration);
      }

      Ok(SeasonalitySpec {
        period_days,
        fourier_order,
        prior_scale: 1.0,
      })
    })
    .collect()
}

pub(crate) fn status_for_fit_error(error: PiecewiseMapError) -> PiecewiseMapFitStatus {
  match error {
    PiecewiseMapError::InsufficientObservations => PiecewiseMapFitStatus::InsufficientObservations,
    PiecewiseMapError::LengthMismatch => PiecewiseMapFitStatus::LengthMismatch,
    PiecewiseMapError::InvalidObservation => PiecewiseMapFitStatus::InvalidObservation,
    PiecewiseMapError::InvalidConfiguration => PiecewiseMapFitStatus::InvalidConfiguration,
    PiecewiseMapError::ZeroTimeRange => PiecewiseMapFitStatus::ZeroTimeRange,
    PiecewiseMapError::SizeOverflow => PiecewiseMapFitStatus::SizeOverflow,
    PiecewiseMapError::NonFiniteResult => PiecewiseMapFitStatus::NonFiniteResult,
    PiecewiseMapError::NonRepresentableScaling => PiecewiseMapFitStatus::NonRepresentableScaling,
    PiecewiseMapError::NoiseCollapse => PiecewiseMapFitStatus::NoiseCollapse,
    PiecewiseMapError::NonConvergence => PiecewiseMapFitStatus::NonConvergence,
  }
}

pub(crate) fn prediction_error_frame(error: PiecewiseMapPredictionError) -> Vec<f64> {
  match error {
    PiecewiseMapPredictionError::InvalidTimestamp { row } => vec![
      f64::from(PiecewiseMapPredictionStatus::InvalidTimestamp as u32),
      row as f64,
    ],
    PiecewiseMapPredictionError::NonFiniteResult { row } => vec![
      f64::from(PiecewiseMapPredictionStatus::NonFiniteResult as u32),
      row as f64,
    ],
    PiecewiseMapPredictionError::InvalidModel => {
      prediction_status_frame(PiecewiseMapPredictionStatus::InvalidModel)
    }
    PiecewiseMapPredictionError::InvalidConfiguration => {
      prediction_status_frame(PiecewiseMapPredictionStatus::InvalidConfiguration)
    }
    PiecewiseMapPredictionError::SizeOverflow => {
      prediction_status_frame(PiecewiseMapPredictionStatus::SizeOverflow)
    }
  }
}

fn fit_status_frame(status: PiecewiseMapFitStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
}

fn prediction_status_frame(status: PiecewiseMapPredictionStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
}

#[cfg(test)]
mod tests {
  use super::{
    PiecewiseMapFitStatus, PiecewiseMapPredictionStatus, fit_piecewise_map, predict_piecewise_map,
  };

  #[test]
  fn packs_explicit_and_automatic_fit_state() {
    let explicit = fit_piecewise_map(
      &[0.0, 1.0, 2.0, 3.0, 4.0, 5.0],
      &[1.0, 1.9, 3.1, 3.2, 3.4, 3.5],
      0.0,
      &[2.0],
      0.0,
      0.0,
      &[],
      &[],
      &[],
      0.5,
      2_000.0,
      1e-10,
      1e-12,
    );

    assert_eq!(
      explicit[0],
      f64::from(PiecewiseMapFitStatus::Success as u32)
    );
    assert_eq!(explicit[1], 1.0);
    assert_eq!(explicit.len(), 15);

    let automatic = fit_piecewise_map(
      &[0.0, 1.0, 2.0, 3.0, 4.0, 5.0],
      &[1.0, 1.9, 3.1, 3.2, 3.4, 3.5],
      1.0,
      &[],
      2.0,
      1.0,
      &[],
      &[],
      &[],
      0.5,
      2_000.0,
      1e-10,
      1e-12,
    );

    assert_eq!(
      automatic[0],
      f64::from(PiecewiseMapFitStatus::Success as u32)
    );
    assert_eq!(automatic[1], 2.0);
  }

  #[test]
  fn packs_prediction_and_indexed_failure_frames() {
    let prediction = predict_piecewise_map(
      &[0.0, 2.0],
      1.0,
      2.0,
      0.0,
      2.0,
      &[1.0],
      &[-1.0],
      0.1,
      &[],
      &[],
      &[],
    );

    assert_eq!(
      prediction[0],
      f64::from(PiecewiseMapPredictionStatus::Success as u32)
    );
    assert_eq!(prediction.len(), 7);

    assert_eq!(
      predict_piecewise_map(
        &[0.0, f64::NAN],
        1.0,
        2.0,
        0.0,
        2.0,
        &[],
        &[],
        0.1,
        &[],
        &[],
        &[],
      ),
      vec![
        f64::from(PiecewiseMapPredictionStatus::InvalidTimestamp as u32),
        1.0
      ]
    );
  }
}
