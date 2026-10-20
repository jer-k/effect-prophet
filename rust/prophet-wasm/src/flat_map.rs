use crate::fourier::{
  FourierError, FourierSeasonality, checked_element_count, coefficient_count,
  evaluate_seasonal_components, make_fourier_features,
};
use crate::seasonality::SeasonalitySpec;

/// Row-major `[trend, additive, value, component_0, ...]` predictions.
#[derive(Clone, Debug, PartialEq)]
pub struct FlatMapPredictionBatch {
  values: Vec<f64>,
}

impl FlatMapPredictionBatch {
  /// Borrow the row-major prediction values.
  #[must_use]
  pub fn values(&self) -> &[f64] {
    &self.values
  }
}

/// Expected failures from flat MAP evaluation.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum FlatMapPredictionError {
  /// Stored level, noise, or coefficient state is invalid.
  InvalidModel,

  /// A seasonal definition is invalid.
  InvalidConfiguration,

  /// A prediction timestamp is invalid.
  InvalidTimestamp { row: usize },

  /// Dense dimensions overflow or exceed the buffer policy.
  SizeOverflow,

  /// Evaluation produced a non-finite value.
  NonFiniteResult { row: usize },
}

/// Evaluate a flat MAP model and its ordered additive seasonal components.
pub fn predict_flat_map(
  timestamps: &[f64],
  level: f64,
  noise_scale: f64,
  seasonalities: &[SeasonalitySpec],
  coefficients: &[f64],
) -> Result<FlatMapPredictionBatch, FlatMapPredictionError> {
  if !level.is_finite() || !noise_scale.is_finite() || noise_scale <= 0.0 {
    return Err(FlatMapPredictionError::InvalidModel);
  }

  let fourier_seasonalities = parse_seasonalities(seasonalities)?;
  let expected_coefficient_count =
    coefficient_count(&fourier_seasonalities).map_err(map_fourier_prediction_error)?;

  if coefficients.len() != expected_coefficient_count
    || coefficients
      .iter()
      .any(|coefficient| !coefficient.is_finite())
  {
    return Err(FlatMapPredictionError::InvalidModel);
  }

  let row_width = seasonalities
    .len()
    .checked_add(3)
    .ok_or(FlatMapPredictionError::SizeOverflow)?;
  let output_count =
    checked_element_count(timestamps.len(), row_width).map_err(map_fourier_prediction_error)?;
  let features = make_fourier_features(timestamps, &fourier_seasonalities)
    .map_err(map_fourier_prediction_error)?;
  let components = evaluate_seasonal_components(&features, &fourier_seasonalities, coefficients)
    .map_err(map_fourier_prediction_error)?;
  let mut values = vec![0.0; output_count];

  for (row, &timestamp) in timestamps.iter().enumerate() {
    if !timestamp.is_finite() {
      return Err(FlatMapPredictionError::InvalidTimestamp { row });
    }

    let component_offset = row * seasonalities.len();
    let component_values =
      &components.values()[component_offset..(component_offset + seasonalities.len())];
    let additive = if component_values.is_empty() {
      0.0
    } else {
      component_values.iter().sum::<f64>()
    };
    let value = level + additive;

    if !additive.is_finite() || !value.is_finite() {
      return Err(FlatMapPredictionError::NonFiniteResult { row });
    }

    let output_offset = row * row_width;
    values[output_offset] = level;
    values[output_offset + 1] = additive;
    values[output_offset + 2] = value;
    values[(output_offset + 3)..(output_offset + row_width)].copy_from_slice(component_values);
  }

  Ok(FlatMapPredictionBatch { values })
}

fn parse_seasonalities(
  seasonalities: &[SeasonalitySpec],
) -> Result<Vec<FourierSeasonality>, FlatMapPredictionError> {
  seasonalities
    .iter()
    .map(|seasonality| {
      if !seasonality.period_days.is_finite()
        || seasonality.period_days <= 0.0
        || seasonality.fourier_order == 0
        || !seasonality.prior_scale.is_finite()
        || seasonality.prior_scale <= 0.0
      {
        return Err(FlatMapPredictionError::InvalidConfiguration);
      }

      Ok(FourierSeasonality {
        period_days: seasonality.period_days,
        fourier_order: seasonality.fourier_order,
      })
    })
    .collect()
}

fn map_fourier_prediction_error(error: FourierError) -> FlatMapPredictionError {
  match error {
    FourierError::InvalidTimestamp { row } => FlatMapPredictionError::InvalidTimestamp { row },
    FourierError::InvalidSeasonality { .. } => FlatMapPredictionError::InvalidConfiguration,
    FourierError::InvalidCoefficients => FlatMapPredictionError::InvalidModel,
    FourierError::SizeOverflow | FourierError::SizeLimitExceeded => {
      FlatMapPredictionError::SizeOverflow
    }
    FourierError::NonFiniteResult { row, .. } => FlatMapPredictionError::NonFiniteResult { row },
  }
}

#[cfg(test)]
mod tests {
  use super::{FlatMapPredictionError, predict_flat_map};
  use crate::seasonality::SeasonalitySpec;

  fn assert_close(actual: f64, expected: f64, tolerance: f64) {
    assert!(
      (actual - expected).abs() <= tolerance,
      "expected {actual} to be within {tolerance} of {expected}"
    );
  }

  #[test]
  fn seasonal_components_vary_around_a_flat_trend() {
    let day = 86_400_000.0;
    let seasonalities = [SeasonalitySpec {
      period_days: 1.0,
      fourier_order: 1,
      prior_scale: 10.0,
    }];
    let predictions = predict_flat_map(&[0.0, day * 0.25], 1.5, 0.2, &seasonalities, &[0.4, -1.1])
      .expect("a complete flat model should predict");

    assert_close(predictions.values()[0], predictions.values()[4], 1e-12);
    assert_close(
      predictions.values()[2],
      predictions.values()[0] + predictions.values()[1],
      1e-12,
    );
    assert_ne!(predictions.values()[1], predictions.values()[5]);
  }

  #[test]
  fn rejects_incomplete_model_state() {
    assert_eq!(
      predict_flat_map(&[0.0], 1.0, 0.0, &[], &[]),
      Err(FlatMapPredictionError::InvalidModel)
    );
    assert_eq!(
      predict_flat_map(&[0.0], 1.0, 0.5, &[], &[1.0]),
      Err(FlatMapPredictionError::InvalidModel)
    );
  }
}
