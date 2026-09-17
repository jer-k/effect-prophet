use wasm_bindgen::prelude::wasm_bindgen;

pub mod additive_ridge;
pub mod flat_map;
pub mod fourier;
pub mod linear_trend;
pub mod ridge_least_squares;
mod wasm_additive;
mod wasm_flat_map;

use linear_trend::{LinearTrend, LinearTrendError, fit_linear_trend as fit_linear_trend_kernel};

/// Status stored at index zero of the packed `fit_linear_trend` result.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
#[wasm_bindgen]
pub enum LinearTrendFitStatus {
  /// The remaining entries contain fitted parameters.
  Success = 0,

  /// At least two observations are required.
  InsufficientObservations = 1,

  /// Timestamp and value slices have different lengths.
  LengthMismatch = 2,

  /// At least one timestamp is not finite.
  NonFiniteTimestamp = 3,

  /// At least one observation value is not finite.
  NonFiniteValue = 4,

  /// All timestamps are equal.
  ZeroTimeVariance = 5,

  /// The finite inputs produced an unrepresentable parameter or time range.
  NonFiniteResult = 6,
}

/// Fits an ordinary least-squares linear trend through one coarse WASM call.
///
/// On success, the packed result is
/// `[Success, intercept, slope, time_origin, time_scale]`. Predictions use
/// `intercept + slope * ((timestamp - time_origin) / time_scale)`.
/// On failure, the result contains only the corresponding status code.
///
/// `wasm-bindgen` copies both input arrays into WASM memory and copies the one
/// result array back to JavaScript. No per-observation callback crosses the
/// boundary.
#[must_use]
#[wasm_bindgen]
pub fn fit_linear_trend(timestamps: &[f64], values: &[f64]) -> Vec<f64> {
  match fit_linear_trend_kernel(timestamps, values) {
    Ok(trend) => vec![
      f64::from(LinearTrendFitStatus::Success as u32),
      trend.intercept,
      trend.slope,
      trend.time_origin,
      trend.time_scale,
    ],
    Err(error) => vec![f64::from(status_for_error(error) as u32)],
  }
}

/// Evaluates a fitted trend for all timestamps through one coarse WASM call.
///
/// On success, the packed result is `[Success, ...predictions]`. A failure
/// while evaluating a timestamp returns `[status, timestamp_index]`; invalid
/// model metadata returns only its status code.
#[must_use]
#[wasm_bindgen]
pub fn predict_linear_trend(
  timestamps: &[f64],
  intercept: f64,
  slope: f64,
  time_origin: f64,
  time_scale: f64,
) -> Vec<f64> {
  if !intercept.is_finite() || !slope.is_finite() || !time_scale.is_finite() || time_scale < 0.0 {
    return vec![f64::from(LinearTrendFitStatus::NonFiniteResult as u32)];
  }

  if !time_origin.is_finite() {
    return vec![f64::from(LinearTrendFitStatus::NonFiniteTimestamp as u32)];
  }

  if time_scale == 0.0 {
    return vec![f64::from(LinearTrendFitStatus::ZeroTimeVariance as u32)];
  }

  let trend = LinearTrend {
    intercept,
    slope,
    time_origin,
    time_scale,
  };
  let mut packed = Vec::with_capacity(timestamps.len() + 1);

  packed.push(f64::from(LinearTrendFitStatus::Success as u32));

  for (index, &timestamp) in timestamps.iter().enumerate() {
    match trend.evaluate(timestamp) {
      Ok(prediction) => packed.push(prediction),
      Err(error) => {
        return vec![f64::from(status_for_error(error) as u32), index as f64];
      }
    }
  }

  packed
}

fn status_for_error(error: LinearTrendError) -> LinearTrendFitStatus {
  match error {
    LinearTrendError::InsufficientObservations => LinearTrendFitStatus::InsufficientObservations,
    LinearTrendError::LengthMismatch => LinearTrendFitStatus::LengthMismatch,
    LinearTrendError::NonFiniteTimestamp => LinearTrendFitStatus::NonFiniteTimestamp,
    LinearTrendError::NonFiniteValue => LinearTrendFitStatus::NonFiniteValue,
    LinearTrendError::ZeroTimeVariance => LinearTrendFitStatus::ZeroTimeVariance,
    LinearTrendError::NonFiniteResult | LinearTrendError::NonFinitePrediction => {
      LinearTrendFitStatus::NonFiniteResult
    }
  }
}

#[cfg(test)]
mod tests {
  use super::{LinearTrendFitStatus, fit_linear_trend, predict_linear_trend};

  #[test]
  fn packs_a_successful_linear_fit() {
    assert_eq!(
      fit_linear_trend(&[100.0, 200.0, 300.0], &[2.0, 5.0, 8.0]),
      vec![
        f64::from(LinearTrendFitStatus::Success as u32),
        2.0,
        6.0,
        100.0,
        200.0,
      ]
    );
  }

  #[test]
  fn packs_a_linear_fit_failure() {
    assert_eq!(
      fit_linear_trend(&[100.0, 100.0], &[2.0, 5.0]),
      vec![f64::from(LinearTrendFitStatus::ZeroTimeVariance as u32)]
    );
  }

  #[test]
  fn packs_batch_linear_predictions() {
    assert_eq!(
      predict_linear_trend(&[400.0, 500.0], 2.0, 6.0, 100.0, 200.0),
      vec![f64::from(LinearTrendFitStatus::Success as u32), 11.0, 14.0,]
    );
  }

  #[test]
  fn packs_a_linear_prediction_failure() {
    assert_eq!(
      predict_linear_trend(&[2.0], 0.0, f64::MAX, 0.0, 1.0),
      vec![f64::from(LinearTrendFitStatus::NonFiniteResult as u32), 0.0,]
    );
  }
}
