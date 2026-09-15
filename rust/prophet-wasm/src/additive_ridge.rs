use crate::fourier::{
  FourierError, FourierSeasonality, checked_element_count, coefficient_count,
  evaluate_seasonal_components, make_fourier_features,
};
use crate::linear_trend::{LinearTrend, LinearTrendError};
use crate::ridge_least_squares::{
  RidgeLeastSquaresInput, RidgeSolveError, solve_ridge_least_squares,
};

/// Complete configuration for one fitted additive seasonal component.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct SeasonalitySpec {
  /// Seasonal period measured in fixed 24-hour days.
  pub period_days: f64,

  /// Number of sine/cosine harmonic pairs.
  pub fourier_order: usize,

  /// Positive coefficient scale used by the Stage B ridge penalty.
  pub prior_scale: f64,
}

impl SeasonalitySpec {
  fn fourier(self) -> FourierSeasonality {
    FourierSeasonality {
      period_days: self.period_days,
      fourier_order: self.fourier_order,
    }
  }
}

/// Finite diagnostics for a successful normalized ridge fit.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct FitSummary {
  /// Positive target normalization scale.
  pub value_scale: f64,

  /// Number of training observations.
  pub observation_count: usize,

  /// Numerical rank of the augmented design.
  pub numerical_rank: usize,

  /// Sum of squared residuals in normalized target units.
  pub normalized_residual_sum_squares: f64,

  /// Half residual sum of squares plus half the coefficient penalty.
  pub penalized_objective: f64,
}

/// A fitted linear trend plus jointly estimated additive seasonalities.
#[derive(Clone, Debug, PartialEq)]
pub struct AdditiveRidgeModel {
  /// Unpenalized linear trend in observation units.
  pub trend: LinearTrend,

  /// Ordered seasonal definitions.
  pub seasonalities: Vec<SeasonalitySpec>,

  /// Ordered seasonal coefficients in observation units.
  pub coefficients: Vec<f64>,

  /// Fitting diagnostics.
  pub summary: FitSummary,
}

/// Row-major `[trend, additive, value, component_0, ...]` predictions.
#[derive(Clone, Debug, PartialEq)]
pub struct AdditivePredictionBatch {
  row_count: usize,
  component_count: usize,
  values: Vec<f64>,
}

impl AdditivePredictionBatch {
  /// Number of prediction timestamps.
  #[must_use]
  pub fn row_count(&self) -> usize {
    self.row_count
  }

  /// Number of named seasonal component columns per row.
  #[must_use]
  pub fn component_count(&self) -> usize {
    self.component_count
  }

  /// Borrow the row-major prediction values.
  #[must_use]
  pub fn values(&self) -> &[f64] {
    &self.values
  }
}

/// Expected failures from normalized additive ridge fitting.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum AdditiveRidgeError {
  /// At least two observations are required.
  InsufficientObservations,

  /// Timestamp and value lengths differ.
  LengthMismatch,

  /// A timestamp or observation value is not finite.
  InvalidObservation { row: usize },

  /// A seasonal period, order, prior, or coefficient layout is invalid.
  InvalidConfiguration { component: usize },

  /// Distinct trend timestamps are required.
  ZeroTimeRange,

  /// The augmented least-squares system is numerically rank deficient.
  RankDeficient { numerical_rank: usize },

  /// Dense dimensions overflow or exceed the documented buffer policy.
  SizeOverflow,

  /// Finite inputs produced an unrepresentable intermediate or result.
  NonFiniteResult,
}

/// Expected failures from additive model evaluation.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum AdditivePredictionError {
  /// A model field or coefficient layout is invalid.
  InvalidModel,

  /// A seasonal period or order is invalid.
  InvalidConfiguration { component: usize },

  /// A prediction timestamp is invalid.
  InvalidTimestamp { row: usize },

  /// Dense output dimensions overflow or exceed the documented buffer policy.
  SizeOverflow,

  /// Evaluation produced a non-finite value at one row.
  NonFiniteResult { row: usize },
}

/// Fit the `normalized-ridge-v1` objective jointly across trend and Fourier columns.
pub fn fit_additive_ridge(
  timestamps: &[f64],
  values: &[f64],
  seasonalities: &[SeasonalitySpec],
) -> Result<AdditiveRidgeModel, AdditiveRidgeError> {
  if values.len() < 2 {
    return Err(AdditiveRidgeError::InsufficientObservations);
  }

  if timestamps.len() != values.len() {
    return Err(AdditiveRidgeError::LengthMismatch);
  }

  for (row, (&timestamp, &value)) in timestamps.iter().zip(values).enumerate() {
    if !timestamp.is_finite() || !value.is_finite() {
      return Err(AdditiveRidgeError::InvalidObservation { row });
    }
  }

  let fourier_seasonalities = parse_fourier_seasonalities(seasonalities)?;
  let seasonal_coefficient_count =
    coefficient_count(&fourier_seasonalities).map_err(map_fourier_fit)?;
  let column_count = seasonal_coefficient_count
    .checked_add(2)
    .ok_or(AdditiveRidgeError::SizeOverflow)?;
  let design_element_count =
    checked_element_count(timestamps.len(), column_count).map_err(map_fourier_fit)?;

  let (time_origin, maximum_timestamp) = timestamp_bounds(timestamps);
  let time_scale = maximum_timestamp - time_origin;

  if time_scale == 0.0 {
    return Err(AdditiveRidgeError::ZeroTimeRange);
  }

  if !time_scale.is_finite() {
    return Err(AdditiveRidgeError::NonFiniteResult);
  }

  let value_scale = maximum_value_magnitude(values);
  let features =
    make_fourier_features(timestamps, &fourier_seasonalities).map_err(map_fourier_fit)?;
  let mut design = vec![0.0; design_element_count];
  let mut target = vec![0.0; timestamps.len()];

  for row in 0..timestamps.len() {
    let scaled_time = (timestamps[row] - time_origin) / time_scale;
    let scaled_value = values[row] / value_scale;

    if !scaled_time.is_finite() || !scaled_value.is_finite() {
      return Err(AdditiveRidgeError::NonFiniteResult);
    }

    let row_offset = row * column_count;
    let feature_offset = row * seasonal_coefficient_count;

    design[row_offset] = 1.0;
    design[row_offset + 1] = scaled_time;
    design[(row_offset + 2)..(row_offset + column_count)].copy_from_slice(
      &features.values()[feature_offset..(feature_offset + seasonal_coefficient_count)],
    );
    target[row] = scaled_value;
  }

  let mut penalty_weights = vec![0.0; column_count];
  let mut coefficient_offset = 2_usize;

  for (component, seasonality) in seasonalities.iter().enumerate() {
    let penalty_weight = 1.0 / seasonality.prior_scale;

    if !penalty_weight.is_finite() || penalty_weight <= 0.0 {
      return Err(AdditiveRidgeError::InvalidConfiguration { component });
    }

    let component_coefficient_count = seasonality
      .fourier_order
      .checked_mul(2)
      .ok_or(AdditiveRidgeError::SizeOverflow)?;

    penalty_weights[coefficient_offset..(coefficient_offset + component_coefficient_count)]
      .fill(penalty_weight);
    coefficient_offset += component_coefficient_count;
  }

  let solution = solve_ridge_least_squares(RidgeLeastSquaresInput {
    row_count: timestamps.len(),
    column_count,
    design: &design,
    target: &target,
    penalty_weights: &penalty_weights,
  })
  .map_err(map_ridge_error)?;

  let normalized_residual_sum_squares = residual_sum_squares(
    &design,
    &target,
    timestamps.len(),
    column_count,
    &solution.coefficients,
  )?;
  let penalty_sum_squares = solution.coefficients[2..]
    .iter()
    .zip(&penalty_weights[2..])
    .try_fold(0.0, |sum, (&coefficient, &weight)| {
      let penalized = coefficient * weight;
      let next = sum + penalized * penalized;

      if next.is_finite() {
        Ok(next)
      } else {
        Err(AdditiveRidgeError::NonFiniteResult)
      }
    })?;
  let penalized_objective = 0.5 * normalized_residual_sum_squares + 0.5 * penalty_sum_squares;

  if !penalized_objective.is_finite() {
    return Err(AdditiveRidgeError::NonFiniteResult);
  }

  let intercept = solution.coefficients[0] * value_scale;
  let slope = solution.coefficients[1] * value_scale;
  let coefficients: Vec<f64> = solution.coefficients[2..]
    .iter()
    .map(|coefficient| coefficient * value_scale)
    .collect();

  if !intercept.is_finite()
    || !slope.is_finite()
    || coefficients
      .iter()
      .any(|coefficient| !coefficient.is_finite())
  {
    return Err(AdditiveRidgeError::NonFiniteResult);
  }

  Ok(AdditiveRidgeModel {
    trend: LinearTrend {
      intercept,
      slope,
      time_origin,
      time_scale,
    },
    seasonalities: seasonalities.to_vec(),
    coefficients,
    summary: FitSummary {
      value_scale,
      observation_count: timestamps.len(),
      numerical_rank: solution.numerical_rank,
      normalized_residual_sum_squares,
      penalized_objective,
    },
  })
}

/// Evaluate trend, additive total, final value, and each component in one batch.
pub fn predict_additive_ridge(
  timestamps: &[f64],
  trend: LinearTrend,
  seasonalities: &[SeasonalitySpec],
  coefficients: &[f64],
) -> Result<AdditivePredictionBatch, AdditivePredictionError> {
  if !trend.intercept.is_finite()
    || !trend.slope.is_finite()
    || !trend.time_origin.is_finite()
    || !trend.time_scale.is_finite()
    || trend.time_scale <= 0.0
  {
    return Err(AdditivePredictionError::InvalidModel);
  }

  let fourier_seasonalities =
    parse_fourier_seasonalities(seasonalities).map_err(map_fit_configuration_to_prediction)?;
  let expected_coefficients =
    coefficient_count(&fourier_seasonalities).map_err(map_fourier_prediction)?;

  if coefficients.len() != expected_coefficients
    || coefficients
      .iter()
      .any(|coefficient| !coefficient.is_finite())
  {
    return Err(AdditivePredictionError::InvalidModel);
  }

  let output_width = seasonalities
    .len()
    .checked_add(3)
    .ok_or(AdditivePredictionError::SizeOverflow)?;
  let output_count =
    checked_element_count(timestamps.len(), output_width).map_err(map_fourier_prediction)?;
  let features =
    make_fourier_features(timestamps, &fourier_seasonalities).map_err(map_fourier_prediction)?;
  let components = evaluate_seasonal_components(&features, &fourier_seasonalities, coefficients)
    .map_err(map_fourier_prediction)?;
  let mut values = vec![0.0; output_count];

  for (row, &timestamp) in timestamps.iter().enumerate() {
    let trend_value = trend.evaluate(timestamp).map_err(|error| match error {
      LinearTrendError::NonFiniteTimestamp => AdditivePredictionError::InvalidTimestamp { row },
      _ => AdditivePredictionError::NonFiniteResult { row },
    })?;
    let component_offset = row * seasonalities.len();
    let component_values =
      &components.values()[component_offset..(component_offset + seasonalities.len())];
    let additive = component_values.iter().sum::<f64>();
    let value = trend_value + additive;

    if !additive.is_finite() || !value.is_finite() {
      return Err(AdditivePredictionError::NonFiniteResult { row });
    }

    let output_offset = row * output_width;

    values[output_offset] = trend_value;
    values[output_offset + 1] = additive;
    values[output_offset + 2] = value;
    values[(output_offset + 3)..(output_offset + output_width)].copy_from_slice(component_values);
  }

  Ok(AdditivePredictionBatch {
    row_count: timestamps.len(),
    component_count: seasonalities.len(),
    values,
  })
}

fn parse_fourier_seasonalities(
  seasonalities: &[SeasonalitySpec],
) -> Result<Vec<FourierSeasonality>, AdditiveRidgeError> {
  seasonalities
    .iter()
    .enumerate()
    .map(|(component, seasonality)| {
      if !seasonality.period_days.is_finite()
        || seasonality.period_days <= 0.0
        || seasonality.fourier_order == 0
        || !seasonality.prior_scale.is_finite()
        || seasonality.prior_scale <= 0.0
      {
        return Err(AdditiveRidgeError::InvalidConfiguration { component });
      }

      Ok(seasonality.fourier())
    })
    .collect()
}

fn timestamp_bounds(timestamps: &[f64]) -> (f64, f64) {
  timestamps.iter().fold(
    (f64::INFINITY, f64::NEG_INFINITY),
    |(minimum, maximum), &timestamp| (minimum.min(timestamp), maximum.max(timestamp)),
  )
}

fn maximum_value_magnitude(values: &[f64]) -> f64 {
  let maximum = values
    .iter()
    .fold(0.0_f64, |current, value| current.max(value.abs()));

  if maximum == 0.0 { 1.0 } else { maximum }
}

fn residual_sum_squares(
  design: &[f64],
  target: &[f64],
  row_count: usize,
  column_count: usize,
  coefficients: &[f64],
) -> Result<f64, AdditiveRidgeError> {
  let mut sum = 0.0;

  for row in 0..row_count {
    let mut prediction = 0.0;

    for column in 0..column_count {
      prediction += design[row * column_count + column] * coefficients[column];
    }

    let residual = target[row] - prediction;
    sum += residual * residual;

    if !sum.is_finite() {
      return Err(AdditiveRidgeError::NonFiniteResult);
    }
  }

  Ok(sum)
}

fn map_fourier_fit(error: FourierError) -> AdditiveRidgeError {
  match error {
    FourierError::InvalidTimestamp { row } => AdditiveRidgeError::InvalidObservation { row },
    FourierError::InvalidSeasonality { component } => {
      AdditiveRidgeError::InvalidConfiguration { component }
    }
    FourierError::SizeOverflow | FourierError::SizeLimitExceeded => {
      AdditiveRidgeError::SizeOverflow
    }
    FourierError::InvalidCoefficients | FourierError::NonFiniteResult { .. } => {
      AdditiveRidgeError::NonFiniteResult
    }
  }
}

fn map_ridge_error(error: RidgeSolveError) -> AdditiveRidgeError {
  match error {
    RidgeSolveError::RankDeficient { numerical_rank, .. } => {
      AdditiveRidgeError::RankDeficient { numerical_rank }
    }
    RidgeSolveError::SizeOverflow => AdditiveRidgeError::SizeOverflow,
    RidgeSolveError::InvalidDimensions
    | RidgeSolveError::NonFiniteInput
    | RidgeSolveError::NonFiniteResult => AdditiveRidgeError::NonFiniteResult,
  }
}

fn map_fit_configuration_to_prediction(error: AdditiveRidgeError) -> AdditivePredictionError {
  match error {
    AdditiveRidgeError::InvalidConfiguration { component } => {
      AdditivePredictionError::InvalidConfiguration { component }
    }
    AdditiveRidgeError::SizeOverflow => AdditivePredictionError::SizeOverflow,
    _ => AdditivePredictionError::InvalidModel,
  }
}

fn map_fourier_prediction(error: FourierError) -> AdditivePredictionError {
  match error {
    FourierError::InvalidTimestamp { row } => AdditivePredictionError::InvalidTimestamp { row },
    FourierError::InvalidSeasonality { component } => {
      AdditivePredictionError::InvalidConfiguration { component }
    }
    FourierError::InvalidCoefficients => AdditivePredictionError::InvalidModel,
    FourierError::SizeOverflow | FourierError::SizeLimitExceeded => {
      AdditivePredictionError::SizeOverflow
    }
    FourierError::NonFiniteResult { row, .. } => AdditivePredictionError::NonFiniteResult { row },
  }
}

#[cfg(test)]
mod tests {
  use super::{
    AdditivePredictionError, AdditiveRidgeError, SeasonalitySpec, fit_additive_ridge,
    predict_additive_ridge,
  };

  fn assert_close(actual: f64, expected: f64, tolerance: f64) {
    assert!(
      (actual - expected).abs() <= tolerance,
      "expected {actual} to be within {tolerance} of {expected}"
    );
  }

  #[test]
  fn trend_only_fit_matches_the_existing_ols_contract() {
    let model = fit_additive_ridge(&[100.0, 200.0, 300.0], &[2.0, 5.0, 8.0], &[])
      .expect("the trend design has full rank");

    assert_close(model.trend.intercept, 2.0, 1e-12);
    assert_close(model.trend.slope, 6.0, 1e-12);
    assert_eq!(model.summary.value_scale, 8.0);
    assert_eq!(model.summary.observation_count, 3);
    assert_eq!(model.summary.numerical_rank, 2);
    assert!(model.summary.normalized_residual_sum_squares <= 1e-28);
    assert!(model.summary.penalized_objective <= 1e-28);
  }

  #[test]
  fn jointly_fits_and_predicts_a_regularized_seasonality() {
    let day = 86_400_000.0;
    let timestamps = [0.0, day * 0.25, day * 0.5, day * 0.75, day];
    let values = [1.0, 3.0, 1.0, -1.0, 1.0];
    let seasonalities = [SeasonalitySpec {
      period_days: 1.0,
      fourier_order: 1,
      prior_scale: 10.0,
    }];
    let model = fit_additive_ridge(&timestamps, &values, &seasonalities)
      .expect("the penalized design should fit");

    assert_eq!(model.coefficients.len(), 2);
    assert!(model.coefficients[0] > 1.9 && model.coefficients[0] < 2.0);
    assert_close(model.coefficients[1], 0.0, 1e-10);
    assert_eq!(model.summary.numerical_rank, 4);

    let predictions = predict_additive_ridge(
      &[day * 0.25],
      model.trend,
      &model.seasonalities,
      &model.coefficients,
    )
    .expect("the fitted model should evaluate");

    assert_eq!(predictions.row_count(), 1);
    assert_eq!(predictions.component_count(), 1);
    assert_close(predictions.values()[1], model.coefficients[0], 1e-10);
    assert_close(
      predictions.values()[2],
      predictions.values()[0] + predictions.values()[1],
      1e-12,
    );
    assert_close(predictions.values()[3], predictions.values()[1], 1e-12);
  }

  #[test]
  fn supports_more_coefficients_than_observations() {
    let model = fit_additive_ridge(
      &[0.0, 86_400_000.0],
      &[2.0, 5.0],
      &[SeasonalitySpec {
        period_days: 7.0,
        fourier_order: 3,
        prior_scale: 1.0,
      }],
    )
    .expect("positive penalties identify all seasonal coefficients");

    assert_eq!(model.summary.observation_count, 2);
    assert_eq!(model.summary.numerical_rank, 8);
    assert!(
      model
        .coefficients
        .iter()
        .all(|coefficient| coefficient.abs() <= 1e-10)
    );
  }

  #[test]
  fn stronger_regularization_reduces_a_controlled_seasonal_magnitude() {
    let day = 86_400_000.0;
    let timestamps = [0.0, day * 0.25, day * 0.5, day * 0.75, day];
    let values = [1.0, 3.0, 1.0, -1.0, 1.0];
    let weak = fit_additive_ridge(
      &timestamps,
      &values,
      &[SeasonalitySpec {
        period_days: 1.0,
        fourier_order: 1,
        prior_scale: 10.0,
      }],
    )
    .expect("the weakly regularized model should fit");
    let strong = fit_additive_ridge(
      &timestamps,
      &values,
      &[SeasonalitySpec {
        period_days: 1.0,
        fourier_order: 1,
        prior_scale: 0.1,
      }],
    )
    .expect("the strongly regularized model should fit");

    assert!(strong.coefficients[0].abs() < weak.coefficients[0].abs());
  }

  #[test]
  fn rejects_expected_fitting_failures() {
    assert_eq!(
      fit_additive_ridge(&[0.0], &[1.0], &[]),
      Err(AdditiveRidgeError::InsufficientObservations)
    );
    assert_eq!(
      fit_additive_ridge(&[0.0, 1.0], &[1.0, 2.0, 3.0], &[]),
      Err(AdditiveRidgeError::LengthMismatch)
    );
    assert_eq!(
      fit_additive_ridge(&[0.0, f64::NAN], &[1.0, 2.0], &[]),
      Err(AdditiveRidgeError::InvalidObservation { row: 1 })
    );
    assert_eq!(
      fit_additive_ridge(&[1.0, 1.0], &[1.0, 2.0], &[]),
      Err(AdditiveRidgeError::ZeroTimeRange)
    );
    assert_eq!(
      fit_additive_ridge(
        &[0.0, 1.0],
        &[1.0, 2.0],
        &[SeasonalitySpec {
          period_days: 7.0,
          fourier_order: 1,
          prior_scale: f64::MIN_POSITIVE,
        }],
      ),
      Err(AdditiveRidgeError::RankDeficient { numerical_rank: 2 })
    );
  }

  #[test]
  fn rejects_invalid_prediction_state() {
    let model = fit_additive_ridge(&[0.0, 1.0], &[1.0, 2.0], &[]).expect("the trend should fit");

    assert_eq!(
      predict_additive_ridge(&[0.0], model.trend, &[], &[1.0]),
      Err(AdditivePredictionError::InvalidModel)
    );
    assert_eq!(
      predict_additive_ridge(&[0.0, f64::NAN], model.trend, &[], &[]),
      Err(AdditivePredictionError::InvalidTimestamp { row: 1 })
    );
  }

  #[test]
  fn fits_zero_values_without_a_zero_normalization_scale() {
    let model =
      fit_additive_ridge(&[0.0, 1.0], &[0.0, 0.0], &[]).expect("the zero target should fit");

    assert_eq!(model.summary.value_scale, 1.0);
    assert_eq!(model.trend.intercept, 0.0);
    assert_eq!(model.trend.slope, 0.0);
  }

  #[test]
  fn predicts_empty_batches_and_trend_only_rows() {
    let model = fit_additive_ridge(&[0.0, 1.0], &[2.0, 5.0], &[]).expect("the line should fit");
    let empty =
      predict_additive_ridge(&[], model.trend, &[], &[]).expect("an empty prediction is valid");
    let prediction =
      predict_additive_ridge(&[2.0], model.trend, &[], &[]).expect("the trend should extrapolate");

    assert_eq!(empty.values(), &[]);
    assert_eq!(prediction.values(), &[8.0, 0.0, 8.0]);
  }
}
