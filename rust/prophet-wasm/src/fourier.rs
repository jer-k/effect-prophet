use std::f64::consts::TAU;

const MILLISECONDS_PER_DAY: f64 = 86_400_000.0;

/// Maximum number of `f64` entries owned by one dense numerical buffer.
///
/// The limit keeps a single WASM-side buffer at or below 128 MiB. Checked
/// arithmetic runs before this policy so integer overflow remains distinguishable.
pub const MAX_DENSE_ELEMENTS: usize = 16_777_216;

/// Period and harmonic count required to generate one seasonal component.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct FourierSeasonality {
  /// Seasonal period measured in fixed 24-hour days.
  pub period_days: f64,

  /// Number of sine/cosine harmonic pairs.
  pub fourier_order: usize,
}

/// Checked row-major Fourier features.
#[derive(Clone, Debug, PartialEq)]
pub struct FourierFeatureMatrix {
  row_count: usize,
  column_count: usize,
  values: Vec<f64>,
}

impl FourierFeatureMatrix {
  /// Number of timestamp rows.
  #[must_use]
  pub fn row_count(&self) -> usize {
    self.row_count
  }

  /// Number of ordered sine/cosine columns.
  #[must_use]
  pub fn column_count(&self) -> usize {
    self.column_count
  }

  /// Borrow the checked row-major values.
  #[must_use]
  pub fn values(&self) -> &[f64] {
    &self.values
  }
}

/// Checked row-major seasonal component values.
#[derive(Clone, Debug, PartialEq)]
pub struct SeasonalComponentMatrix {
  row_count: usize,
  component_count: usize,
  values: Vec<f64>,
}

impl SeasonalComponentMatrix {
  /// Number of timestamp rows.
  #[must_use]
  pub fn row_count(&self) -> usize {
    self.row_count
  }

  /// Number of seasonal components.
  #[must_use]
  pub fn component_count(&self) -> usize {
    self.component_count
  }

  /// Borrow the checked row-major component values.
  #[must_use]
  pub fn values(&self) -> &[f64] {
    &self.values
  }
}

/// Expected failures from Fourier feature generation and evaluation.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum FourierError {
  /// A timestamp is not finite.
  InvalidTimestamp { row: usize },

  /// A period is not finite and positive, or a Fourier order is zero.
  InvalidSeasonality { component: usize },

  /// The coefficient slice does not match the generated feature layout.
  InvalidCoefficients,

  /// Matrix dimensions overflowed `usize` arithmetic.
  SizeOverflow,

  /// A dense buffer would exceed the documented WASM memory policy.
  SizeLimitExceeded,

  /// Finite inputs produced a non-finite phase, feature, or component.
  NonFiniteResult { row: usize, component: usize },
}

/// Return the total sine/cosine coefficient count for a checked layout.
pub fn coefficient_count(seasonalities: &[FourierSeasonality]) -> Result<usize, FourierError> {
  let mut count = 0_usize;

  for (component, seasonality) in seasonalities.iter().enumerate() {
    if !seasonality.period_days.is_finite()
      || seasonality.period_days <= 0.0
      || seasonality.fourier_order == 0
    {
      return Err(FourierError::InvalidSeasonality { component });
    }

    let component_count = seasonality
      .fourier_order
      .checked_mul(2)
      .ok_or(FourierError::SizeOverflow)?;

    count = count
      .checked_add(component_count)
      .ok_or(FourierError::SizeOverflow)?;
  }

  Ok(count)
}

/// Generate Prophet-compatible epoch-day Fourier columns.
///
/// Columns preserve component order, then increasing harmonic order, with sine
/// before cosine. Timestamp rows remain in caller order.
pub fn make_fourier_features(
  timestamps: &[f64],
  seasonalities: &[FourierSeasonality],
) -> Result<FourierFeatureMatrix, FourierError> {
  let column_count = coefficient_count(seasonalities)?;
  let element_count = checked_element_count(timestamps.len(), column_count)?;
  let mut values = vec![0.0; element_count];

  for (row, &timestamp) in timestamps.iter().enumerate() {
    if !timestamp.is_finite() {
      return Err(FourierError::InvalidTimestamp { row });
    }

    let epoch_days = timestamp / MILLISECONDS_PER_DAY;
    let angular_days = TAU * epoch_days;

    if !angular_days.is_finite() {
      return Err(FourierError::NonFiniteResult { row, component: 0 });
    }

    let mut column = 0_usize;

    for (component, seasonality) in seasonalities.iter().enumerate() {
      for harmonic in 1..=seasonality.fourier_order {
        let frequency = harmonic as f64 / seasonality.period_days;
        let angle = frequency * angular_days;

        if !frequency.is_finite() || !angle.is_finite() {
          return Err(FourierError::NonFiniteResult { row, component });
        }

        let sine = angle.sin();
        let cosine = angle.cos();

        if !sine.is_finite() || !cosine.is_finite() {
          return Err(FourierError::NonFiniteResult { row, component });
        }

        let offset = row * column_count + column;
        values[offset] = sine;
        values[offset + 1] = cosine;
        column += 2;
      }
    }
  }

  Ok(FourierFeatureMatrix {
    row_count: timestamps.len(),
    column_count,
    values,
  })
}

/// Apply one binary value per row and seasonal component to all of its harmonics.
pub fn apply_seasonality_masks(
  features: &mut FourierFeatureMatrix,
  seasonalities: &[FourierSeasonality],
  masks: &[u8],
) -> Result<(), FourierError> {
  let expected_masks = features
    .row_count
    .checked_mul(seasonalities.len())
    .ok_or(FourierError::SizeOverflow)?;

  if masks.len() != expected_masks || masks.iter().any(|value| *value != 0 && *value != 1) {
    return Err(FourierError::InvalidCoefficients);
  }

  for row in 0..features.row_count {
    let mut coefficient_offset = 0_usize;

    for (component, seasonality) in seasonalities.iter().enumerate() {
      let component_columns = seasonality
        .fourier_order
        .checked_mul(2)
        .ok_or(FourierError::SizeOverflow)?;
      let mask = f64::from(masks[row * seasonalities.len() + component]);
      let row_offset = row * features.column_count;

      for column in coefficient_offset..(coefficient_offset + component_columns) {
        features.values[row_offset + column] *= mask;
      }

      coefficient_offset += component_columns;
    }
  }

  Ok(())
}

/// Evaluate each seasonal component from aligned Fourier coefficients.
pub fn evaluate_seasonal_components(
  features: &FourierFeatureMatrix,
  seasonalities: &[FourierSeasonality],
  coefficients: &[f64],
) -> Result<SeasonalComponentMatrix, FourierError> {
  let expected_columns = coefficient_count(seasonalities)?;

  if features.column_count != expected_columns || coefficients.len() != expected_columns {
    return Err(FourierError::InvalidCoefficients);
  }

  if coefficients
    .iter()
    .any(|coefficient| !coefficient.is_finite())
  {
    return Err(FourierError::InvalidCoefficients);
  }

  let element_count = checked_element_count(features.row_count, seasonalities.len())?;
  let mut values = vec![0.0; element_count];

  for row in 0..features.row_count {
    let mut coefficient_offset = 0_usize;

    for (component, seasonality) in seasonalities.iter().enumerate() {
      let component_columns = seasonality.fourier_order * 2;
      let mut sum = CompensatedSum::default();

      for local_column in 0..component_columns {
        let column = coefficient_offset + local_column;
        let feature = features.values[row * features.column_count + column];

        sum.add(feature * coefficients[column]);
      }

      let value = sum.total();

      if !value.is_finite() {
        return Err(FourierError::NonFiniteResult { row, component });
      }

      values[row * seasonalities.len() + component] = value;
      coefficient_offset += component_columns;
    }
  }

  Ok(SeasonalComponentMatrix {
    row_count: features.row_count,
    component_count: seasonalities.len(),
    values,
  })
}

pub(crate) fn checked_element_count(rows: usize, columns: usize) -> Result<usize, FourierError> {
  let count = rows
    .checked_mul(columns)
    .ok_or(FourierError::SizeOverflow)?;

  if count > MAX_DENSE_ELEMENTS {
    return Err(FourierError::SizeLimitExceeded);
  }

  Ok(count)
}

#[derive(Default)]
struct CompensatedSum {
  sum: f64,
  correction: f64,
}

impl CompensatedSum {
  fn add(&mut self, value: f64) {
    let next = self.sum + value;

    if self.sum.abs() >= value.abs() {
      self.correction += (self.sum - next) + value;
    } else {
      self.correction += (value - next) + self.sum;
    }

    self.sum = next;
  }

  fn total(self) -> f64 {
    self.sum + self.correction
  }
}

#[cfg(test)]
mod tests {
  use super::{
    FourierError, FourierFeatureMatrix, FourierSeasonality, checked_element_count,
    coefficient_count, evaluate_seasonal_components, make_fourier_features,
  };

  const TOLERANCE: f64 = 1e-12;

  fn assert_close(actual: f64, expected: f64) {
    assert!(
      (actual - expected).abs() <= TOLERANCE,
      "expected {actual} to be within {TOLERANCE} of {expected}"
    );
  }

  #[test]
  fn generates_epoch_relative_sine_then_cosine_columns() {
    let seasonality = FourierSeasonality {
      period_days: 1.0,
      fourier_order: 2,
    };
    let features = make_fourier_features(&[0.0, 21_600_000.0], &[seasonality])
      .expect("the features should be finite");

    assert_eq!(features.row_count(), 2);
    assert_eq!(features.column_count(), 4);
    assert_eq!(&features.values()[0..4], &[0.0, 1.0, 0.0, 1.0]);
    assert_close(features.values()[4], 1.0);
    assert_close(features.values()[5], 0.0);
    assert_close(features.values()[6], 0.0);
    assert_close(features.values()[7], -1.0);
  }

  #[test]
  fn preserves_repeated_and_out_of_order_rows() {
    let seasonality = FourierSeasonality {
      period_days: 7.0,
      fourier_order: 1,
    };
    let timestamps = [86_400_000.0, -86_400_000.0, 86_400_000.0];
    let features = make_fourier_features(&timestamps, &[seasonality]).expect("valid features");

    assert_eq!(&features.values()[0..2], &features.values()[4..6]);
    assert_ne!(&features.values()[0..2], &features.values()[2..4]);
  }

  #[test]
  fn evaluates_components_independently() {
    let seasonalities = [
      FourierSeasonality {
        period_days: 1.0,
        fourier_order: 1,
      },
      FourierSeasonality {
        period_days: 7.0,
        fourier_order: 1,
      },
    ];
    let features = make_fourier_features(&[0.0], &seasonalities).expect("valid features");
    let components = evaluate_seasonal_components(&features, &seasonalities, &[2.0, 3.0, 5.0, 7.0])
      .expect("aligned coefficients");

    assert_eq!(components.row_count(), 1);
    assert_eq!(components.component_count(), 2);
    assert_eq!(components.values(), &[3.0, 7.0]);
  }

  #[test]
  fn accepts_empty_batches_and_layouts() {
    let empty = make_fourier_features(&[], &[]).expect("an empty matrix is valid");

    assert_eq!(empty.values(), &[]);

    let rows = make_fourier_features(&[0.0, 1.0], &[]).expect("zero columns are valid");
    let components = evaluate_seasonal_components(&rows, &[], &[]).expect("zero components");

    assert_eq!(components.row_count(), 2);
    assert_eq!(components.values(), &[]);
  }

  #[test]
  fn remains_bounded_and_periodic_in_a_reasonable_epoch_domain() {
    let seasonality = FourierSeasonality {
      period_days: 7.0,
      fourier_order: 3,
    };
    let timestamp = 1_704_067_200_125.0;
    let features =
      make_fourier_features(&[timestamp, timestamp + 7.0 * 86_400_000.0], &[seasonality])
        .expect("reasonable epochs should evaluate");

    for column in 0..features.column_count() {
      assert!(features.values()[column].abs() <= 1.0);
      let repeated = features.values()[features.column_count() + column];

      assert!((features.values()[column] - repeated).abs() <= 1e-11);
    }
  }

  #[test]
  fn rejects_dimension_overflow_and_unrepresentable_phase() {
    assert_eq!(
      coefficient_count(&[FourierSeasonality {
        period_days: 1.0,
        fourier_order: usize::MAX,
      }]),
      Err(FourierError::SizeOverflow)
    );
    assert_eq!(
      checked_element_count(4_097, 4_097),
      Err(FourierError::SizeLimitExceeded)
    );
    assert_eq!(
      make_fourier_features(
        &[f64::MAX],
        &[FourierSeasonality {
          period_days: f64::MIN_POSITIVE,
          fourier_order: 1,
        }],
      ),
      Err(FourierError::NonFiniteResult {
        row: 0,
        component: 0,
      })
    );
  }

  #[test]
  fn rejects_invalid_inputs_and_alignment() {
    let valid = FourierSeasonality {
      period_days: 1.0,
      fourier_order: 1,
    };

    assert_eq!(
      make_fourier_features(&[f64::NAN], &[valid]),
      Err(FourierError::InvalidTimestamp { row: 0 })
    );
    assert_eq!(
      coefficient_count(&[FourierSeasonality {
        period_days: 0.0,
        fourier_order: 1,
      }]),
      Err(FourierError::InvalidSeasonality { component: 0 })
    );

    let malformed = FourierFeatureMatrix {
      row_count: 1,
      column_count: 0,
      values: vec![],
    };

    assert_eq!(
      evaluate_seasonal_components(&malformed, &[valid], &[1.0, 2.0]),
      Err(FourierError::InvalidCoefficients)
    );
  }
}
