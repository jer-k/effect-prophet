use crate::compensated_sum::CompensatedSum;

/// Parameters for `y = intercept + slope * scaled_time`.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct LinearTrend {
  /// Predicted value at `time_origin`.
  pub intercept: f64,

  /// Change in the predicted value over one `time_scale` interval.
  pub slope: f64,

  /// Timestamp mapped to scaled time zero.
  pub time_origin: f64,

  /// Timestamp interval mapped to one scaled time unit.
  pub time_scale: f64,
}

/// Expected numerical-domain failures from fitting a linear trend.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum LinearTrendError {
  /// Fewer than two values were supplied.
  InsufficientObservations,

  /// Timestamp and value slices have different lengths.
  LengthMismatch,

  /// A timestamp or time origin is not finite.
  NonFiniteTimestamp,

  /// An observation value is not finite.
  NonFiniteValue,

  /// The time scale is zero, so timestamps have no variance.
  ZeroTimeVariance,

  /// Finite inputs produced an unrepresentable scale or coefficient.
  NonFiniteResult,

  /// Evaluating a valid trend produced an unrepresentable prediction.
  NonFinitePrediction,
}

impl LinearTrend {
  /// Evaluate the fitted trend using the scaling learned during fitting.
  pub fn evaluate(self, timestamp: f64) -> Result<f64, LinearTrendError> {
    if !timestamp.is_finite() {
      return Err(LinearTrendError::NonFiniteTimestamp);
    }

    let scaled_time = (timestamp - self.time_origin) / self.time_scale;
    let prediction = self.intercept + self.slope * scaled_time;

    if !prediction.is_finite() {
      return Err(LinearTrendError::NonFinitePrediction);
    }

    Ok(prediction)
  }
}

/// Scale a timestamp using fitting-time origin and scale metadata.
pub fn scale_timestamp(
  timestamp: f64,
  time_origin: f64,
  time_scale: f64,
) -> Result<f64, LinearTrendError> {
  if !timestamp.is_finite() || !time_origin.is_finite() {
    return Err(LinearTrendError::NonFiniteTimestamp);
  }

  if time_scale == 0.0 {
    return Err(LinearTrendError::ZeroTimeVariance);
  }

  if !time_scale.is_finite() {
    return Err(LinearTrendError::NonFiniteResult);
  }

  let scaled_timestamp = (timestamp - time_origin) / time_scale;

  if !scaled_timestamp.is_finite() {
    return Err(LinearTrendError::NonFiniteResult);
  }

  Ok(scaled_timestamp)
}

/// Fit an ordinary least-squares line to timestamps and corresponding values.
///
/// Timestamps are mapped to `[0, 1]` using
/// `scaled_time = (timestamp - time_origin) / time_scale`, where `time_origin`
/// is the minimum training timestamp and `time_scale` is the training range.
/// Centering removes the large epoch offset, while scaling keeps the OLS
/// calculations well-conditioned. Prediction must retain and reuse both values.
///
/// OLS is evaluated in centered form:
///
/// `slope = sum((t - mean_t) * (y - mean_y)) / sum((t - mean_t)^2)`
///
/// `intercept = mean_y - slope * mean_t`
///
/// Values are also divided by their maximum magnitude during the calculation
/// to avoid overflowing sums whose final coefficients are representable.
pub fn fit_linear_trend(
  timestamps: &[f64],
  values: &[f64],
) -> Result<LinearTrend, LinearTrendError> {
  if values.len() < 2 {
    return Err(LinearTrendError::InsufficientObservations);
  }

  if timestamps.len() != values.len() {
    return Err(LinearTrendError::LengthMismatch);
  }

  let (time_origin, maximum_timestamp) = timestamp_bounds(timestamps)?;
  let time_scale = maximum_timestamp - time_origin;

  if time_scale == 0.0 {
    return Err(LinearTrendError::ZeroTimeVariance);
  }

  if !time_scale.is_finite() {
    return Err(LinearTrendError::NonFiniteResult);
  }

  let value_scale = maximum_value_magnitude(values)?;
  let observation_count = values.len() as f64;

  let mut scaled_time_sum = CompensatedSum::default();
  let mut scaled_value_sum = CompensatedSum::default();

  for (&timestamp, &value) in timestamps.iter().zip(values) {
    scaled_time_sum.add(scale_timestamp(timestamp, time_origin, time_scale)?);
    scaled_value_sum.add(scale_value(value, value_scale));
  }

  let mean_time = scaled_time_sum.total() / observation_count;
  let mean_value = scaled_value_sum.total() / observation_count;

  let mut covariance = CompensatedSum::default();
  let mut time_variance = CompensatedSum::default();

  for (&timestamp, &value) in timestamps.iter().zip(values) {
    let centered_time = scale_timestamp(timestamp, time_origin, time_scale)? - mean_time;
    let centered_value = scale_value(value, value_scale) - mean_value;

    covariance.add(centered_time * centered_value);
    time_variance.add(centered_time * centered_time);
  }

  let variance = time_variance.total();

  if variance == 0.0 {
    return Err(LinearTrendError::ZeroTimeVariance);
  }

  let normalized_slope = covariance.total() / variance;
  let normalized_intercept = mean_value - normalized_slope * mean_time;
  let slope = normalized_slope * value_scale;
  let intercept = normalized_intercept * value_scale;

  if !slope.is_finite() || !intercept.is_finite() {
    return Err(LinearTrendError::NonFiniteResult);
  }

  Ok(LinearTrend {
    intercept,
    slope,
    time_origin,
    time_scale,
  })
}

fn timestamp_bounds(timestamps: &[f64]) -> Result<(f64, f64), LinearTrendError> {
  let mut minimum = f64::INFINITY;
  let mut maximum = f64::NEG_INFINITY;

  for &timestamp in timestamps {
    if !timestamp.is_finite() {
      return Err(LinearTrendError::NonFiniteTimestamp);
    }

    minimum = minimum.min(timestamp);
    maximum = maximum.max(timestamp);
  }

  Ok((minimum, maximum))
}

fn maximum_value_magnitude(values: &[f64]) -> Result<f64, LinearTrendError> {
  let mut maximum_magnitude: f64 = 0.0;

  for &value in values {
    if !value.is_finite() {
      return Err(LinearTrendError::NonFiniteValue);
    }

    maximum_magnitude = maximum_magnitude.max(value.abs());
  }

  Ok(maximum_magnitude)
}

fn scale_value(value: f64, value_scale: f64) -> f64 {
  if value_scale == 0.0 {
    return 0.0;
  }

  value / value_scale
}

#[cfg(test)]
mod tests {
  use super::{LinearTrendError, fit_linear_trend, scale_timestamp};

  const PARAMETER_TOLERANCE: f64 = 1e-12;

  fn assert_close(actual: f64, expected: f64, tolerance: f64) {
    let error = (actual - expected).abs();

    assert!(
      error <= tolerance,
      "expected {actual} to be within {tolerance} of {expected}; error was {error}"
    );
  }

  #[test]
  fn scales_large_epoch_timestamps_to_the_unit_interval() {
    let base = 8_000_000_000_000_000.0;

    assert_eq!(scale_timestamp(base + 2.0, base, 4.0), Ok(0.5));
  }

  #[test]
  fn rejects_invalid_time_scaling_metadata() {
    assert_eq!(
      scale_timestamp(f64::NAN, 0.0, 1.0),
      Err(LinearTrendError::NonFiniteTimestamp)
    );
    assert_eq!(
      scale_timestamp(1.0, 0.0, 0.0),
      Err(LinearTrendError::ZeroTimeVariance)
    );
    assert_eq!(
      scale_timestamp(1.0, 0.0, f64::INFINITY),
      Err(LinearTrendError::NonFiniteResult)
    );
  }

  #[test]
  fn recovers_a_hand_computable_exact_line() {
    let base = 1_704_067_200_000.0;
    let trend = fit_linear_trend(&[base, base + 1_000.0, base + 2_000.0], &[2.0, 5.0, 8.0])
      .expect("the exact line should fit");

    assert_close(trend.intercept, 2.0, PARAMETER_TOLERANCE);
    assert_close(trend.slope, 6.0, PARAMETER_TOLERANCE);
    assert_eq!(trend.time_origin, base);
    assert_eq!(trend.time_scale, 2_000.0);
    assert_close(
      trend
        .evaluate(base + 3_000.0)
        .expect("the forecast should be finite"),
      11.0,
      PARAMETER_TOLERANCE,
    );
  }

  #[test]
  fn fits_a_deterministic_noisy_fixture() {
    let trend = fit_linear_trend(&[0.0, 1.0, 2.0, 3.0], &[1.1, 2.9, 5.2, 6.8])
      .expect("the noisy fixture should fit");

    assert_close(trend.intercept, 1.09, PARAMETER_TOLERANCE);
    assert_close(trend.slope, 5.82, PARAMETER_TOLERANCE);
  }

  #[test]
  fn remains_stable_with_large_epoch_timestamps() {
    let base = 8_000_000_000_000_000.0;
    let timestamps = [base, base + 1.0, base + 2.0, base + 3.0];
    let values = [-4.0, -1.5, 1.0, 3.5];
    let trend = fit_linear_trend(&timestamps, &values).expect("the epoch line should fit");

    assert_close(trend.intercept, -4.0, PARAMETER_TOLERANCE);
    assert_close(trend.slope, 7.5, PARAMETER_TOLERANCE);
    assert_eq!(trend.time_origin, base);
    assert_eq!(trend.time_scale, 3.0);
  }

  #[test]
  fn recovers_deterministically_generated_exact_lines() {
    for case in 1..=100 {
      let base = 1_600_000_000_000.0 + f64::from(case) * 10_000.0;
      let step = f64::from(case % 7 + 1) * 250.0;
      let expected_intercept = f64::from(case) * 0.25 - 8.0;
      let expected_slope = f64::from(case % 11) - 5.0;
      let timestamps: Vec<f64> = (0..8).map(|index| base + f64::from(index) * step).collect();
      let values: Vec<f64> = (0..8)
        .map(|index| expected_intercept + expected_slope * (f64::from(index) / 7.0))
        .collect();

      let trend =
        fit_linear_trend(&timestamps, &values).expect("every generated exact line should fit");

      assert_close(trend.intercept, expected_intercept, 1e-11);
      assert_close(trend.slope, expected_slope, 1e-11);
    }
  }

  #[test]
  fn fits_an_all_zero_line_without_dividing_by_the_value_scale() {
    let trend = fit_linear_trend(&[10.0, 20.0], &[0.0, 0.0]).expect("an all-zero line should fit");

    assert_eq!(trend.intercept, 0.0);
    assert_eq!(trend.slope, 0.0);
  }

  #[test]
  fn rejects_insufficient_observations() {
    assert_eq!(
      fit_linear_trend(&[1.0], &[2.0]),
      Err(LinearTrendError::InsufficientObservations)
    );
  }

  #[test]
  fn rejects_mismatched_slices() {
    assert_eq!(
      fit_linear_trend(&[1.0, 2.0], &[3.0, 4.0, 5.0]),
      Err(LinearTrendError::LengthMismatch)
    );
  }

  #[test]
  fn rejects_non_finite_input() {
    assert_eq!(
      fit_linear_trend(&[1.0, f64::INFINITY], &[3.0, 4.0]),
      Err(LinearTrendError::NonFiniteTimestamp)
    );
    assert_eq!(
      fit_linear_trend(&[1.0, 2.0], &[3.0, f64::NAN]),
      Err(LinearTrendError::NonFiniteValue)
    );
  }

  #[test]
  fn rejects_zero_time_variance() {
    assert_eq!(
      fit_linear_trend(&[1.0, 1.0, 1.0], &[3.0, 4.0, 5.0]),
      Err(LinearTrendError::ZeroTimeVariance)
    );
  }

  #[test]
  fn rejects_a_non_finite_time_range_or_coefficient() {
    assert_eq!(
      fit_linear_trend(&[-f64::MAX, f64::MAX], &[0.0, 1.0]),
      Err(LinearTrendError::NonFiniteResult)
    );
    assert_eq!(
      fit_linear_trend(&[0.0, 1.0], &[-f64::MAX, f64::MAX]),
      Err(LinearTrendError::NonFiniteResult)
    );
  }

  #[test]
  fn rejects_non_finite_prediction_input_and_output() {
    let trend =
      fit_linear_trend(&[0.0, 1.0], &[0.0, f64::MAX]).expect("the finite training line should fit");

    assert_eq!(
      trend.evaluate(f64::NAN),
      Err(LinearTrendError::NonFiniteTimestamp)
    );
    assert_eq!(
      trend.evaluate(2.0),
      Err(LinearTrendError::NonFinitePrediction)
    );
  }
}
