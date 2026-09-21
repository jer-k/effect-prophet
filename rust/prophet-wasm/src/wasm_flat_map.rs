use wasm_bindgen::prelude::wasm_bindgen;

use crate::flat_map::{
  FlatMapError, FlatMapPredictionError, FlatMapTermination,
  fit_flat_map_with_scaling as fit_flat_map_kernel, predict_flat_map as predict_flat_map_kernel,
};
use crate::seasonality::SeasonalitySpec;
use crate::target_scaling::{ScalingMode, TargetScaling};
use crate::wasm_protocol::parse_positive_integer;

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

  /// Finite targets produced an unrepresentable scaling domain.
  NonRepresentableScaling = 9,
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
  fit_flat_map_protocol(
    timestamps,
    values,
    periods_days,
    fourier_orders,
    prior_scales,
    ScalingMode::AbsMax,
    false,
  )
}

/// Fit a reduced flat MAP model with explicit Prophet target scaling.
///
/// Success prepends `[mode, offset, scale]` to the legacy success payload.
#[must_use]
#[wasm_bindgen]
pub fn fit_flat_map_with_scaling(
  timestamps: &[f64],
  values: &[f64],
  scaling_mode: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  prior_scales: &[f64],
) -> Vec<f64> {
  let Some(scaling_mode) = ScalingMode::from_code(scaling_mode) else {
    return fit_status_frame(FlatMapFitStatus::InvalidConfiguration);
  };

  fit_flat_map_protocol(
    timestamps,
    values,
    periods_days,
    fourier_orders,
    prior_scales,
    scaling_mode,
    true,
  )
}

#[allow(clippy::too_many_arguments)]
fn fit_flat_map_protocol(
  timestamps: &[f64],
  values: &[f64],
  periods_days: &[f64],
  fourier_orders: &[f64],
  prior_scales: &[f64],
  scaling_mode: ScalingMode,
  include_scaling: bool,
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

  match fit_flat_map_kernel(timestamps, values, &seasonalities, scaling_mode) {
    Ok(model) => {
      let metadata_width = if include_scaling { 3 } else { 0 };
      let Some(capacity) = model.coefficients.len().checked_add(9 + metadata_width) else {
        return fit_status_frame(FlatMapFitStatus::SizeOverflow);
      };
      let termination = match model.summary.termination {
        FlatMapTermination::Converged => 0.0,
        FlatMapTermination::ConstantTargetShortcut => 1.0,
      };
      let mut packed = Vec::with_capacity(capacity);

      packed.push(f64::from(FlatMapFitStatus::Success as u32));

      if include_scaling {
        packed.extend_from_slice(&[
          model.target_scaling.mode.code(),
          model.target_scaling.offset,
          model.target_scaling.scale,
        ]);
      }

      packed.extend_from_slice(&[
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

      let order =
        parse_positive_integer(order).ok_or(ProtocolConfigurationError::InvalidConfiguration)?;

      if !period_days.is_finite() || !prior_scale.is_finite() || prior_scale <= 0.0 {
        return Err(ProtocolConfigurationError::InvalidConfiguration);
      }

      Ok(SeasonalitySpec {
        period_days,
        fourier_order: order,
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
    FlatMapError::NonRepresentableScaling => FlatMapFitStatus::NonRepresentableScaling,
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
