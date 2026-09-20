use crate::fourier::{FourierError, MAX_DENSE_ELEMENTS, checked_element_count};

/// Borrowed checked row-major additional-feature values.
#[derive(Clone, Copy, Debug)]
pub struct FeatureMatrixView<'a> {
  /// Number of rows.
  pub row_count: usize,
  /// Number of feature columns.
  pub column_count: usize,
  /// Row-major finite values.
  pub values: &'a [f64],
}

/// Borrowed priors and contiguous component ranges for additional columns.
#[derive(Clone, Copy, Debug)]
pub struct AdditionalFeatureLayoutView<'a> {
  /// One positive finite prior scale per feature column.
  pub prior_scales: &'a [f64],
  /// One starting column per named component.
  pub component_offsets: &'a [usize],
  /// One positive column count per named component.
  pub component_counts: &'a [usize],
}

/// Borrowed row-major binary mask with one column per seasonal component.
#[derive(Clone, Copy, Debug)]
pub struct SeasonalityMaskView<'a> {
  /// Number of timestamp rows.
  pub row_count: usize,
  /// Number of ordered seasonal components.
  pub component_count: usize,
  /// Row-major values, each exactly zero or one.
  pub values: &'a [u8],
}

/// Validated additional-feature and mask failures.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum AdditionalFeatureError {
  /// Matrix dimensions or aligned lengths differ.
  InvalidDimensions,
  /// A matrix value or prior scale is invalid.
  InvalidValue,
  /// Component ranges are not contiguous exact coverage.
  InvalidLayout,
  /// Dense dimensions overflow or exceed the memory policy.
  SizeOverflow,
}

impl FeatureMatrixView<'_> {
  /// Validate dimensions and finite matrix values.
  pub fn validate(&self, expected_rows: usize) -> Result<(), AdditionalFeatureError> {
    let expected = self
      .row_count
      .checked_mul(self.column_count)
      .ok_or(AdditionalFeatureError::SizeOverflow)?;

    if self.row_count != expected_rows || self.values.len() != expected {
      return Err(AdditionalFeatureError::InvalidDimensions);
    }

    if expected > MAX_DENSE_ELEMENTS {
      return Err(AdditionalFeatureError::SizeOverflow);
    }

    if self.values.iter().any(|value| !value.is_finite()) {
      return Err(AdditionalFeatureError::InvalidValue);
    }

    Ok(())
  }
}

impl AdditionalFeatureLayoutView<'_> {
  /// Validate priors and exact contiguous component coverage.
  pub fn validate(&self, column_count: usize) -> Result<(), AdditionalFeatureError> {
    if self.prior_scales.len() != column_count
      || self.component_offsets.len() != self.component_counts.len()
      || self
        .prior_scales
        .iter()
        .any(|value| !value.is_finite() || *value <= 0.0)
    {
      return Err(AdditionalFeatureError::InvalidValue);
    }

    let mut expected_offset = 0_usize;

    for (&offset, &count) in self.component_offsets.iter().zip(self.component_counts) {
      if offset != expected_offset || count == 0 {
        return Err(AdditionalFeatureError::InvalidLayout);
      }

      expected_offset = expected_offset
        .checked_add(count)
        .ok_or(AdditionalFeatureError::SizeOverflow)?;
    }

    if expected_offset != column_count {
      return Err(AdditionalFeatureError::InvalidLayout);
    }

    Ok(())
  }
}

impl SeasonalityMaskView<'_> {
  /// Validate mask dimensions and binary values.
  pub fn validate(
    &self,
    expected_rows: usize,
    expected_components: usize,
  ) -> Result<(), AdditionalFeatureError> {
    let expected = self
      .row_count
      .checked_mul(self.component_count)
      .ok_or(AdditionalFeatureError::SizeOverflow)?;

    if self.row_count != expected_rows
      || self.component_count != expected_components
      || self.values.len() != expected
    {
      return Err(AdditionalFeatureError::InvalidDimensions);
    }

    if expected > MAX_DENSE_ELEMENTS {
      return Err(AdditionalFeatureError::SizeOverflow);
    }

    if self.values.iter().any(|value| *value != 0 && *value != 1) {
      return Err(AdditionalFeatureError::InvalidValue);
    }

    Ok(())
  }
}

/// Return an owned all-one mask for unconditional components.
pub fn unconditional_masks(
  row_count: usize,
  component_count: usize,
) -> Result<Vec<u8>, AdditionalFeatureError> {
  let count = checked_element_count(row_count, component_count).map_err(|error| match error {
    FourierError::SizeOverflow | FourierError::SizeLimitExceeded => {
      AdditionalFeatureError::SizeOverflow
    }
    _ => AdditionalFeatureError::InvalidDimensions,
  })?;

  Ok(vec![1; count])
}

/// Evaluate grouped additional-feature contributions in row-major order.
pub fn evaluate_additional_components(
  matrix: FeatureMatrixView<'_>,
  layout: AdditionalFeatureLayoutView<'_>,
  coefficients: &[f64],
) -> Result<Vec<f64>, AdditionalFeatureError> {
  matrix.validate(matrix.row_count)?;
  layout.validate(matrix.column_count)?;

  if coefficients.len() != matrix.column_count
    || coefficients.iter().any(|value| !value.is_finite())
  {
    return Err(AdditionalFeatureError::InvalidDimensions);
  }

  let output_count = checked_element_count(matrix.row_count, layout.component_offsets.len())
    .map_err(|_| AdditionalFeatureError::SizeOverflow)?;
  let mut output = vec![0.0; output_count];

  for row in 0..matrix.row_count {
    for component in 0..layout.component_offsets.len() {
      let offset = layout.component_offsets[component];
      let count = layout.component_counts[component];
      let mut value = 0.0;

      for (column, &coefficient) in coefficients.iter().enumerate().skip(offset).take(count) {
        value += matrix.values[row * matrix.column_count + column] * coefficient;
      }

      if !value.is_finite() {
        return Err(AdditionalFeatureError::InvalidValue);
      }

      output[row * layout.component_offsets.len() + component] = value;
    }
  }

  Ok(output)
}
