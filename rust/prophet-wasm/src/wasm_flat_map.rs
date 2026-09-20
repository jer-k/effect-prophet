use wasm_bindgen::prelude::wasm_bindgen;

use crate::flat_map::{
  FlatMapError, FlatMapPredictionError, FlatMapTermination, fit_flat_map as fit_flat_map_kernel,
  predict_flat_map as predict_flat_map_kernel,
};
use crate::seasonality::SeasonalitySpec;

const MAX_WIRE_FOURIER_ORDER: f64 = u32::MAX as f64;

/// Status at index zero of a packed flat MAP fit result.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
#[wasm_bindgen]
pub enum FlatMapFitStatus {
  /// Remaining entries contain fitted state and diagnostics.
  Success = 0,

  /// At least two observations are required.
  InsufficientObservations = 1,

  /// Input slices that must align have different lengths.
  LengthMismatch = 2,

  /// A training timestamp or value is not finite.
  InvalidObservation = 3,

  /// A period, order, or prior scale is invalid.
  InvalidConfiguration = 4,

  /// Dimensions overflow or exceed the dense-buffer policy.
  SizeOverflow = 5,

  /// Finite inputs produced a non-finite result.
  NonFiniteResult = 6,

  /// No reliable finite interior observation-noise optimum exists.
  NoiseCollapse = 7,

  /// The deterministic optimizer budget was exhausted.
  NonConvergence = 8,
}

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

/// Fit a complete reduced flat MAP model through one coarse WASM call.
///
/// Success is `[0, level, noise_scale, value_scale, observation_count,
/// iterations, objective, stationarity_residual, termination, ...coefficients]`.
#[must_use]
#[wasm_bindgen]
pub fn fit_flat_map(
  timestamps: &[f64],
  values: &[f64],
  periods_days: &[f64],
  fourier_orders: &[f64],
  prior_scales: &[f64],
) -> Vec<f64> {
  let seasonalities = match parse_seasonalities(periods_days, fourier_orders, Some(prior_scales)) {
    Ok(seasonalities) => seasonalities,
    Err(ProtocolConfigurationError::LengthMismatch) => {
      return fit_status_frame(FlatMapFitStatus::LengthMismatch);
    }
    Err(ProtocolConfigurationError::InvalidConfiguration) => {
      return fit_status_frame(FlatMapFitStatus::InvalidConfiguration);
    }
  };

  match fit_flat_map_kernel(timestamps, values, &seasonalities) {
    Ok(model) => {
      let Some(capacity) = model.coefficients.len().checked_add(9) else {
        return fit_status_frame(FlatMapFitStatus::SizeOverflow);
      };
      let termination = match model.summary.termination {
        FlatMapTermination::Converged => 0.0,
        FlatMapTermination::ConstantTargetShortcut => 1.0,
      };
      let mut packed = Vec::with_capacity(capacity);

      packed.extend_from_slice(&[
        f64::from(FlatMapFitStatus::Success as u32),
        model.level,
        model.noise_scale,
        model.summary.value_scale,
        model.summary.observation_count as f64,
        model.summary.iterations as f64,
        model.summary.objective,
        model.summary.stationarity_residual,
        termination,
      ]);
      packed.extend_from_slice(&model.coefficients);

      packed
    }
    Err(error) => fit_status_frame(status_for_fit_error(error)),
  }
}

/// Evaluate a complete reduced flat MAP model through one coarse WASM call.
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
  let seasonalities = match parse_seasonalities(periods_days, fourier_orders, None) {
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

fn parse_seasonalities(
  periods_days: &[f64],
  fourier_orders: &[f64],
  prior_scales: Option<&[f64]>,
) -> Result<Vec<SeasonalitySpec>, ProtocolConfigurationError> {
  if periods_days.len() != fourier_orders.len()
    || prior_scales.is_some_and(|scales| scales.len() != periods_days.len())
  {
    return Err(ProtocolConfigurationError::LengthMismatch);
  }

  periods_days
    .iter()
    .zip(fourier_orders)
    .enumerate()
    .map(|(component, (&period_days, &order))| {
      let prior_scale = prior_scales.map_or(1.0, |scales| scales[component]);

      if !period_days.is_finite()
        || period_days <= 0.0
        || !order.is_finite()
        || order <= 0.0
        || order.fract() != 0.0
        || order > MAX_WIRE_FOURIER_ORDER
        || !prior_scale.is_finite()
        || prior_scale <= 0.0
      {
        return Err(ProtocolConfigurationError::InvalidConfiguration);
      }

      let order_u32 = order as u32;

      Ok(SeasonalitySpec {
        period_days,
        fourier_order: order_u32 as usize,
        prior_scale,
      })
    })
    .collect()
}

fn status_for_fit_error(error: FlatMapError) -> FlatMapFitStatus {
  match error {
    FlatMapError::InsufficientObservations => FlatMapFitStatus::InsufficientObservations,
    FlatMapError::LengthMismatch => FlatMapFitStatus::LengthMismatch,
    FlatMapError::InvalidObservation => FlatMapFitStatus::InvalidObservation,
    FlatMapError::InvalidConfiguration => FlatMapFitStatus::InvalidConfiguration,
    FlatMapError::SizeOverflow => FlatMapFitStatus::SizeOverflow,
    FlatMapError::NonFiniteResult => FlatMapFitStatus::NonFiniteResult,
    FlatMapError::NoiseCollapse => FlatMapFitStatus::NoiseCollapse,
    FlatMapError::NonConvergence => FlatMapFitStatus::NonConvergence,
  }
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

fn fit_status_frame(status: FlatMapFitStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
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
  use super::{FlatMapFitStatus, FlatMapPredictionStatus, fit_flat_map, predict_flat_map};

  #[test]
  fn packs_successful_fit_and_prediction_frames() {
    let fit = fit_flat_map(&[0.0, 1.0, 2.0, 3.0], &[1.0, 2.0, 1.5, 2.5], &[], &[], &[]);

    assert_eq!(fit.len(), 9);
    assert_eq!(fit[0], f64::from(FlatMapFitStatus::Success as u32));

    let prediction = predict_flat_map(&[4.0], fit[1], fit[2], &[], &[], &[]);

    assert_eq!(
      prediction,
      vec![
        f64::from(FlatMapPredictionStatus::Success as u32),
        fit[1],
        0.0,
        fit[1],
      ]
    );
  }

  #[test]
  fn rejects_malformed_configuration() {
    assert_eq!(
      fit_flat_map(&[0.0, 1.0], &[1.0, 2.0], &[7.0], &[], &[10.0]),
      vec![f64::from(FlatMapFitStatus::LengthMismatch as u32)]
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
