use wasm_bindgen::prelude::wasm_bindgen;

use crate::flat_map::{FlatMapPredictionError, predict_flat_map as predict_flat_map_kernel};
use crate::seasonality::SeasonalitySpec;
use crate::target_scaling::TargetScaling;
use crate::wasm::protocol::parse_positive_integer;

/// Status at index zero of a packed flat MAP prediction result.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
#[wasm_bindgen]
pub enum FlatMapPredictionStatus {
  /// Remaining entries contain row-major predictions.
  Success = 0,

  /// A timestamp is not finite.
  InvalidTimestamp = 1,

  /// Stored model state is invalid.
  InvalidModel = 2,

  /// A period or Fourier order is invalid.
  InvalidConfiguration = 3,

  /// Input slices that must align have different lengths.
  LengthMismatch = 4,

  /// Dimensions overflow or exceed the dense-buffer policy.
  SizeOverflow = 5,

  /// Evaluation produced a non-finite result.
  NonFiniteResult = 6,
}

/// Evaluate a complete flat MAP model through one coarse WASM call.
///
/// Success is `[0, ...rowMajor]`, where each row is
/// `[trend, additive, value, component_0, ...]`.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn predict_flat_map(
  timestamps: &[f64],
  level: f64,
  noise_scale: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  coefficients: &[f64],
) -> Vec<f64> {
  let seasonalities = match parse_seasonalities(periods_days, fourier_orders) {
    Ok(seasonalities) => seasonalities,
    Err(ProtocolConfigurationError::LengthMismatch) => {
      return prediction_status_frame(FlatMapPredictionStatus::LengthMismatch);
    }
    Err(ProtocolConfigurationError::InvalidConfiguration) => {
      return prediction_status_frame(FlatMapPredictionStatus::InvalidConfiguration);
    }
  };

  match predict_flat_map_kernel(timestamps, level, noise_scale, &seasonalities, coefficients) {
    Ok(prediction) => {
      let Some(capacity) = prediction.values().len().checked_add(1) else {
        return prediction_status_frame(FlatMapPredictionStatus::SizeOverflow);
      };
      let mut packed = Vec::with_capacity(capacity);

      packed.push(f64::from(FlatMapPredictionStatus::Success as u32));
      packed.extend_from_slice(prediction.values());

      packed
    }
    Err(error) => prediction_error_frame(error),
  }
}

/// Evaluate relative output-unit flat MAP state with stored target scaling.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn predict_flat_map_with_scaling(
  timestamps: &[f64],
  scaling_mode: f64,
  target_offset: f64,
  target_scale: f64,
  level: f64,
  noise_scale: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  coefficients: &[f64],
) -> Vec<f64> {
  let scaling = match TargetScaling::parse(scaling_mode, target_offset, target_scale) {
    Ok(value) => value,
    Err(_) => return prediction_status_frame(FlatMapPredictionStatus::InvalidModel),
  };
  let level = match scaling.restore_trend(level) {
    Ok(value) => value,
    Err(_) => return prediction_status_frame(FlatMapPredictionStatus::InvalidModel),
  };

  predict_flat_map(
    timestamps,
    level,
    noise_scale,
    periods_days,
    fourier_orders,
    coefficients,
  )
}

fn parse_seasonalities(
  periods_days: &[f64],
  fourier_orders: &[f64],
) -> Result<Vec<SeasonalitySpec>, ProtocolConfigurationError> {
  if periods_days.len() != fourier_orders.len() {
    return Err(ProtocolConfigurationError::LengthMismatch);
  }

  periods_days
    .iter()
    .zip(fourier_orders)
    .map(|(&period_days, &order)| {
      let order =
        parse_positive_integer(order).ok_or(ProtocolConfigurationError::InvalidConfiguration)?;

      if !period_days.is_finite() {
        return Err(ProtocolConfigurationError::InvalidConfiguration);
      }

      // Prediction ignores priors; the kernel only requires a valid positive scale.
      Ok(SeasonalitySpec {
        period_days,
        fourier_order: order,
        prior_scale: 1.0,
      })
    })
    .collect()
}

fn prediction_error_frame(error: FlatMapPredictionError) -> Vec<f64> {
  match error {
    FlatMapPredictionError::InvalidTimestamp { row } => vec![
      f64::from(FlatMapPredictionStatus::InvalidTimestamp as u32),
      row as f64,
    ],
    FlatMapPredictionError::NonFiniteResult { row } => vec![
      f64::from(FlatMapPredictionStatus::NonFiniteResult as u32),
      row as f64,
    ],
    FlatMapPredictionError::InvalidModel => {
      prediction_status_frame(FlatMapPredictionStatus::InvalidModel)
    }
    FlatMapPredictionError::InvalidConfiguration => {
      prediction_status_frame(FlatMapPredictionStatus::InvalidConfiguration)
    }
    FlatMapPredictionError::SizeOverflow => {
      prediction_status_frame(FlatMapPredictionStatus::SizeOverflow)
    }
  }
}

fn prediction_status_frame(status: FlatMapPredictionStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
}

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
enum ProtocolConfigurationError {
  LengthMismatch,
  InvalidConfiguration,
}

#[cfg(test)]
mod tests {
  use super::{FlatMapPredictionStatus, predict_flat_map};

  #[test]
  fn packs_successful_prediction_frames() {
    assert_eq!(
      predict_flat_map(&[4.0], 1.75, 0.5, &[], &[], &[]),
      vec![
        f64::from(FlatMapPredictionStatus::Success as u32),
        1.75,
        0.0,
        1.75,
      ]
    );
  }

  #[test]
  fn rejects_malformed_configuration() {
    assert_eq!(
      predict_flat_map(&[0.0], 1.0, 0.1, &[7.0], &[], &[]),
      vec![f64::from(FlatMapPredictionStatus::LengthMismatch as u32)]
    );
  }

  #[test]
  fn returns_the_nonzero_prediction_failure_index() {
    assert_eq!(
      predict_flat_map(&[0.0, f64::NAN], 1.0, 0.1, &[], &[], &[]),
      vec![
        f64::from(FlatMapPredictionStatus::InvalidTimestamp as u32),
        1.0,
      ]
    );
  }
}
