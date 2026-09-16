use wasm_bindgen::prelude::wasm_bindgen;

use crate::additive_ridge::{
  AdditivePredictionError, AdditiveRidgeError, SeasonalitySpec,
  fit_additive_ridge as fit_additive_ridge_kernel,
  predict_additive_ridge as predict_additive_ridge_kernel,
};
use crate::linear_trend::LinearTrend;

const MAX_WIRE_FOURIER_ORDER: f64 = u32::MAX as f64;

/// Status at index zero of a packed additive fit result.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
#[wasm_bindgen]
pub enum AdditiveFitStatus {
  /// Remaining entries contain the fitted model and diagnostics.
  Success = 0,

  /// At least two observations are required.
  InsufficientObservations = 1,

  /// Input slices that must align have different lengths.
  LengthMismatch = 2,

  /// A training timestamp or value is not finite.
  InvalidObservation = 3,

  /// A period, order, or prior scale is invalid.
  InvalidConfiguration = 4,

  /// All training timestamps are equal.
  ZeroTimeRange = 5,

  /// The augmented design is numerically rank deficient.
  RankDeficient = 6,

  /// Dimensions overflow or exceed the dense WASM memory policy.
  SizeOverflow = 7,

  /// Finite inputs produced a non-finite result.
  NonFiniteResult = 8,
}

/// Status at index zero of a packed additive prediction result.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
#[wasm_bindgen]
pub enum AdditivePredictionStatus {
  /// Remaining entries contain row-major predictions.
  Success = 0,

  /// A timestamp is not finite.
  InvalidTimestamp = 1,

  /// Trend metadata or coefficient alignment is invalid.
  InvalidModel = 2,

  /// A period or Fourier order is invalid.
  InvalidConfiguration = 3,

  /// Input slices that must align have different lengths.
  LengthMismatch = 4,

  /// Dimensions overflow or exceed the dense WASM memory policy.
  SizeOverflow = 5,

  /// Evaluation produced a non-finite result.
  NonFiniteResult = 6,
}

/// Fit a complete normalized additive ridge model through one WASM call.
///
/// Success is packed as `[0, intercept, slope, time_origin, time_scale,
/// value_scale, numerical_rank, normalized_rss, objective, ...coefficients]`.
/// Failure is a one-entry status frame.
#[must_use]
#[wasm_bindgen]
pub fn fit_additive_ridge(
  timestamps: &[f64],
  values: &[f64],
  periods_days: &[f64],
  fourier_orders: &[f64],
  prior_scales: &[f64],
) -> Vec<f64> {
  let seasonalities = match parse_seasonalities(periods_days, fourier_orders, Some(prior_scales)) {
    Ok(seasonalities) => seasonalities,
    Err(ProtocolConfigurationError::LengthMismatch) => {
      return status_frame(AdditiveFitStatus::LengthMismatch);
    }
    Err(ProtocolConfigurationError::InvalidConfiguration) => {
      return status_frame(AdditiveFitStatus::InvalidConfiguration);
    }
  };

  match fit_additive_ridge_kernel(timestamps, values, &seasonalities) {
    Ok(model) => {
      let Some(capacity) = model.coefficients.len().checked_add(9) else {
        return status_frame(AdditiveFitStatus::SizeOverflow);
      };
      let mut packed = Vec::with_capacity(capacity);

      packed.extend_from_slice(&[
        f64::from(AdditiveFitStatus::Success as u32),
        model.trend.intercept,
        model.trend.slope,
        model.trend.time_origin,
        model.trend.time_scale,
        model.summary.value_scale,
        model.summary.numerical_rank as f64,
        model.summary.normalized_residual_sum_squares,
        model.summary.penalized_objective,
      ]);
      packed.extend_from_slice(&model.coefficients);

      packed
    }
    Err(error) => status_frame(status_for_fit_error(error)),
  }
}

/// Evaluate a complete additive model through one WASM call.
///
/// Success is packed as `[0, ...rowMajor]`, where each row is
/// `[trend, additive, value, component_0, ...]`. Metadata/configuration
/// failures contain only a status. Evaluation failures also include the
/// failing timestamp index.
#[must_use]
#[wasm_bindgen]
// The coarse numeric ABI intentionally crosses all model metadata in one call.
#[allow(clippy::too_many_arguments)]
pub fn predict_additive_ridge(
  timestamps: &[f64],
  intercept: f64,
  slope: f64,
  time_origin: f64,
  time_scale: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  coefficients: &[f64],
) -> Vec<f64> {
  let seasonalities = match parse_seasonalities(periods_days, fourier_orders, None) {
    Ok(seasonalities) => seasonalities,
    Err(ProtocolConfigurationError::LengthMismatch) => {
      return prediction_status_frame(AdditivePredictionStatus::LengthMismatch);
    }
    Err(ProtocolConfigurationError::InvalidConfiguration) => {
      return prediction_status_frame(AdditivePredictionStatus::InvalidConfiguration);
    }
  };
  let trend = LinearTrend {
    intercept,
    slope,
    time_origin,
    time_scale,
  };

  match predict_additive_ridge_kernel(timestamps, trend, &seasonalities, coefficients) {
    Ok(prediction) => {
      let Some(capacity) = prediction.values().len().checked_add(1) else {
        return prediction_status_frame(AdditivePredictionStatus::SizeOverflow);
      };
      let mut packed = Vec::with_capacity(capacity);

      packed.push(f64::from(AdditivePredictionStatus::Success as u32));
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

fn status_for_fit_error(error: AdditiveRidgeError) -> AdditiveFitStatus {
  match error {
    AdditiveRidgeError::InsufficientObservations => AdditiveFitStatus::InsufficientObservations,
    AdditiveRidgeError::LengthMismatch => AdditiveFitStatus::LengthMismatch,
    AdditiveRidgeError::InvalidObservation { .. } => AdditiveFitStatus::InvalidObservation,
    AdditiveRidgeError::InvalidConfiguration { .. } => AdditiveFitStatus::InvalidConfiguration,
    AdditiveRidgeError::ZeroTimeRange => AdditiveFitStatus::ZeroTimeRange,
    AdditiveRidgeError::RankDeficient { .. } => AdditiveFitStatus::RankDeficient,
    AdditiveRidgeError::SizeOverflow => AdditiveFitStatus::SizeOverflow,
    AdditiveRidgeError::NonFiniteResult => AdditiveFitStatus::NonFiniteResult,
  }
}

fn prediction_error_frame(error: AdditivePredictionError) -> Vec<f64> {
  match error {
    AdditivePredictionError::InvalidTimestamp { row } => vec![
      f64::from(AdditivePredictionStatus::InvalidTimestamp as u32),
      row as f64,
    ],
    AdditivePredictionError::NonFiniteResult { row } => vec![
      f64::from(AdditivePredictionStatus::NonFiniteResult as u32),
      row as f64,
    ],
    AdditivePredictionError::InvalidModel => {
      prediction_status_frame(AdditivePredictionStatus::InvalidModel)
    }
    AdditivePredictionError::InvalidConfiguration { .. } => {
      prediction_status_frame(AdditivePredictionStatus::InvalidConfiguration)
    }
    AdditivePredictionError::SizeOverflow => {
      prediction_status_frame(AdditivePredictionStatus::SizeOverflow)
    }
  }
}

fn status_frame(status: AdditiveFitStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
}

fn prediction_status_frame(status: AdditivePredictionStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
}

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
enum ProtocolConfigurationError {
  LengthMismatch,
  InvalidConfiguration,
}

#[cfg(test)]
mod tests {
  use super::{
    AdditiveFitStatus, AdditivePredictionStatus, fit_additive_ridge, predict_additive_ridge,
  };

  #[test]
  fn packs_a_successful_fit_and_prediction() {
    let fit = fit_additive_ridge(
      &[0.0, 21_600_000.0, 43_200_000.0, 64_800_000.0, 86_400_000.0],
      &[1.0, 3.0, 1.0, -1.0, 1.0],
      &[1.0],
      &[1.0],
      &[10.0],
    );

    assert_eq!(fit.len(), 11);
    assert_eq!(fit[0], f64::from(AdditiveFitStatus::Success as u32));
    assert_eq!(fit[5], 3.0);
    assert_eq!(fit[6], 4.0);

    let prediction = predict_additive_ridge(
      &[21_600_000.0],
      fit[1],
      fit[2],
      fit[3],
      fit[4],
      &[1.0],
      &[1.0],
      &fit[9..],
    );

    assert_eq!(
      prediction[0],
      f64::from(AdditivePredictionStatus::Success as u32)
    );
    assert_eq!(prediction.len(), 5);
  }

  #[test]
  fn rejects_fractional_orders_before_conversion() {
    assert_eq!(
      fit_additive_ridge(&[0.0, 1.0], &[0.0, 1.0], &[7.0], &[1.5], &[10.0]),
      vec![f64::from(AdditiveFitStatus::InvalidConfiguration as u32)]
    );
  }

  #[test]
  fn returns_the_nonzero_failing_prediction_index() {
    assert_eq!(
      predict_additive_ridge(&[0.0, f64::NAN], 0.0, 1.0, 0.0, 1.0, &[], &[], &[],),
      vec![
        f64::from(AdditivePredictionStatus::InvalidTimestamp as u32),
        1.0,
      ]
    );
  }

  #[test]
  fn packs_an_empty_prediction_as_success_only() {
    assert_eq!(
      predict_additive_ridge(&[], 0.0, 1.0, 0.0, 1.0, &[], &[], &[]),
      vec![f64::from(AdditivePredictionStatus::Success as u32)]
    );
  }
}
