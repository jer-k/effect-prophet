use crate::additive_ridge::SeasonalitySpec;
use crate::fourier::{
  FourierError, FourierSeasonality, checked_element_count, coefficient_count,
  evaluate_seasonal_components, make_fourier_features,
};
use crate::ridge_least_squares::{
  RidgeLeastSquaresInput, RidgeSolveError, solve_ridge_least_squares,
};

const TREND_PRIOR_SCALE: f64 = 5.0;
const NOISE_PRIOR_SCALE: f64 = 0.5;
const CONSTANT_TARGET_NOISE_SCALE: f64 = 1e-9;
const MAXIMUM_ITERATIONS: usize = 200;
const CONVERGENCE_TOLERANCE: f64 = 1e-10;
const COLLAPSE_TOLERANCE: f64 = 1e-24;

/// How a successful reduced flat MAP fit terminated.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum FlatMapTermination {
  /// Block-coordinate updates satisfied the deterministic change tolerance.
  Converged,

  /// Prophet's explicit exact-constant-history shortcut was used.
  ConstantTargetShortcut,
}

/// Finite diagnostics for reduced flat MAP fitting.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct FlatMapFitSummary {
  /// Positive absmax target scale.
  pub value_scale: f64,

  /// Number of fitted observations.
  pub observation_count: usize,

  /// Number of complete coefficient/noise updates.
  pub iterations: usize,

  /// Summed negative log posterior up to parameter-independent constants.
  pub objective: f64,

  /// Maximum absolute first-order residual in scaled coordinates.
  pub stationarity_residual: f64,

  /// Successful termination category.
  pub termination: FlatMapTermination,
}

/// Complete output-unit state of a reduced flat MAP model.
#[derive(Clone, Debug, PartialEq)]
pub struct FlatMapModel {
  /// Constant trend level in observation units.
  pub level: f64,

  /// Ordered seasonal definitions.
  pub seasonalities: Vec<SeasonalitySpec>,

  /// Ordered additive Fourier coefficients in observation units.
  pub coefficients: Vec<f64>,

  /// Positive observation noise in observation units.
  pub noise_scale: f64,

  /// Fitting diagnostics.
  pub summary: FlatMapFitSummary,
}

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

/// Expected failures from reduced flat MAP fitting.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum FlatMapError {
  /// At least two observations are required.
  InsufficientObservations,

  /// Timestamp and value lengths differ.
  LengthMismatch,

  /// A training timestamp or value is not finite.
  InvalidObservation,

  /// A seasonal period, order, or prior is invalid.
  InvalidConfiguration,

  /// Dense dimensions overflow or exceed the buffer policy.
  SizeOverflow,

  /// Finite input did not produce a finite numerical result.
  NonFiniteResult,

  /// The posterior has no reliable finite interior noise optimum.
  NoiseCollapse,

  /// The deterministic iteration budget was exhausted.
  NonConvergence,
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

struct Evaluation {
  objective: f64,
  residual_sum_squares: f64,
  stationarity_residual: f64,
}

/// Fit a constant level, additive Fourier coefficients, and observation noise jointly.
pub fn fit_flat_map(
  timestamps: &[f64],
  values: &[f64],
  seasonalities: &[SeasonalitySpec],
) -> Result<FlatMapModel, FlatMapError> {
  if timestamps.len() != values.len() {
    return Err(FlatMapError::LengthMismatch);
  }

  if values.len() < 2 {
    return Err(FlatMapError::InsufficientObservations);
  }

  if timestamps.iter().any(|value| !value.is_finite())
    || values.iter().any(|value| !value.is_finite())
  {
    return Err(FlatMapError::InvalidObservation);
  }

  let fourier_seasonalities = parse_seasonalities(seasonalities)?;
  let seasonal_coefficient_count =
    coefficient_count(&fourier_seasonalities).map_err(map_fourier_fit_error)?;
  let column_count = seasonal_coefficient_count
    .checked_add(1)
    .ok_or(FlatMapError::SizeOverflow)?;

  let mut value_scale = values
    .iter()
    .fold(0.0_f64, |maximum, value| maximum.max(value.abs()));

  if value_scale == 0.0 {
    value_scale = 1.0;
  }

  if !value_scale.is_finite() {
    return Err(FlatMapError::NonFiniteResult);
  }

  let first_value = values[0];

  if values.iter().all(|value| *value == first_value) {
    let scaled_level = first_value / value_scale;
    let objective = values.len() as f64 * CONSTANT_TARGET_NOISE_SCALE.ln()
      + scaled_level * scaled_level / (2.0 * TREND_PRIOR_SCALE * TREND_PRIOR_SCALE)
      + CONSTANT_TARGET_NOISE_SCALE * CONSTANT_TARGET_NOISE_SCALE
        / (2.0 * NOISE_PRIOR_SCALE * NOISE_PRIOR_SCALE);

    return Ok(FlatMapModel {
      level: first_value,
      seasonalities: seasonalities.to_vec(),
      coefficients: vec![0.0; seasonal_coefficient_count],
      noise_scale: value_scale * CONSTANT_TARGET_NOISE_SCALE,
      summary: FlatMapFitSummary {
        value_scale,
        observation_count: values.len(),
        iterations: 0,
        objective,
        stationarity_residual: 0.0,
        termination: FlatMapTermination::ConstantTargetShortcut,
      },
    });
  }

  let features =
    make_fourier_features(timestamps, &fourier_seasonalities).map_err(map_fourier_fit_error)?;
  let design_count =
    checked_element_count(values.len(), column_count).map_err(map_fourier_fit_error)?;
  let mut design = vec![0.0; design_count];
  let mut target = vec![0.0; values.len()];

  for row in 0..values.len() {
    let row_offset = row * column_count;
    let feature_offset = row * seasonal_coefficient_count;

    design[row_offset] = 1.0;
    design[(row_offset + 1)..(row_offset + column_count)].copy_from_slice(
      &features.values()[feature_offset..(feature_offset + seasonal_coefficient_count)],
    );
    target[row] = values[row] / value_scale;
  }

  if target.iter().any(|value| !value.is_finite()) {
    return Err(FlatMapError::NonFiniteResult);
  }

  let mut prior_scales = vec![TREND_PRIOR_SCALE; column_count];

  for (component, seasonality) in seasonalities.iter().enumerate() {
    let start = fourier_seasonalities[..component]
      .iter()
      .try_fold(1_usize, |offset, definition| {
        definition
          .fourier_order
          .checked_mul(2)
          .and_then(|count| offset.checked_add(count))
      })
      .ok_or(FlatMapError::SizeOverflow)?;
    let count = seasonality
      .fourier_order
      .checked_mul(2)
      .ok_or(FlatMapError::SizeOverflow)?;

    prior_scales[start..(start + count)].fill(seasonality.prior_scale);
  }

  let target_magnitude = target.iter().map(|value| value * value).sum::<f64>();
  let mut coefficients = vec![0.0; column_count];
  let mut noise_scale = NOISE_PRIOR_SCALE;

  for iteration in 1..=MAXIMUM_ITERATIONS {
    let penalty_weights: Vec<f64> = prior_scales
      .iter()
      .map(|prior_scale| noise_scale / prior_scale)
      .collect();
    let solution = solve_ridge_least_squares(RidgeLeastSquaresInput {
      row_count: values.len(),
      column_count,
      design: &design,
      target: &target,
      penalty_weights: &penalty_weights,
    })
    .map_err(map_solve_error)?;
    let coefficient_evaluation = evaluate(
      &design,
      &target,
      &solution.coefficients,
      &prior_scales,
      noise_scale,
    )?;

    if coefficient_evaluation.residual_sum_squares <= COLLAPSE_TOLERANCE * target_magnitude.max(1.0)
    {
      return Err(FlatMapError::NoiseCollapse);
    }

    let observation_count = values.len() as f64;
    let discriminant =
      observation_count * observation_count + 16.0 * coefficient_evaluation.residual_sum_squares;
    let noise_variance =
      2.0 * coefficient_evaluation.residual_sum_squares / (observation_count + discriminant.sqrt());
    let next_noise_scale = noise_variance.sqrt();

    if !next_noise_scale.is_finite() || next_noise_scale <= 0.0 {
      return Err(FlatMapError::NonFiniteResult);
    }

    let mut maximum_change = (next_noise_scale - noise_scale).abs();

    for (&next, &previous) in solution.coefficients.iter().zip(&coefficients) {
      maximum_change = maximum_change.max((next - previous).abs());
    }

    coefficients = solution.coefficients;
    noise_scale = next_noise_scale;

    let maximum_magnitude = coefficients
      .iter()
      .fold(noise_scale.max(1.0), |maximum, value| {
        maximum.max(value.abs())
      });

    if maximum_change <= CONVERGENCE_TOLERANCE * maximum_magnitude {
      let final_evaluation = evaluate(&design, &target, &coefficients, &prior_scales, noise_scale)?;
      let level = coefficients[0] * value_scale;
      let output_coefficients: Vec<f64> = coefficients[1..]
        .iter()
        .map(|coefficient| coefficient * value_scale)
        .collect();
      let output_noise_scale = noise_scale * value_scale;

      if !level.is_finite()
        || !output_noise_scale.is_finite()
        || output_noise_scale <= 0.0
        || output_coefficients
          .iter()
          .any(|coefficient| !coefficient.is_finite())
      {
        return Err(FlatMapError::NonFiniteResult);
      }

      return Ok(FlatMapModel {
        level,
        seasonalities: seasonalities.to_vec(),
        coefficients: output_coefficients,
        noise_scale: output_noise_scale,
        summary: FlatMapFitSummary {
          value_scale,
          observation_count: values.len(),
          iterations: iteration,
          objective: final_evaluation.objective,
          stationarity_residual: final_evaluation.stationarity_residual,
          termination: FlatMapTermination::Converged,
        },
      });
    }
  }

  Err(FlatMapError::NonConvergence)
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

  let fourier_seasonalities =
    parse_seasonalities(seasonalities).map_err(map_fit_configuration_to_prediction)?;
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

fn evaluate(
  design: &[f64],
  target: &[f64],
  coefficients: &[f64],
  prior_scales: &[f64],
  noise_scale: f64,
) -> Result<Evaluation, FlatMapError> {
  let column_count = coefficients.len();
  let mut gradient = vec![0.0; column_count];
  let mut residual_sum_squares = 0.0;

  for (row, &target_value) in target.iter().enumerate() {
    let row_offset = row * column_count;
    let fitted = coefficients
      .iter()
      .enumerate()
      .map(|(column, coefficient)| design[row_offset + column] * coefficient)
      .sum::<f64>();
    let residual = fitted - target_value;
    residual_sum_squares += residual * residual;

    for column in 0..column_count {
      gradient[column] += design[row_offset + column] * residual;
    }
  }

  let noise_variance = noise_scale * noise_scale;
  let mut prior_penalty = 0.0;
  let mut stationarity_residual = 0.0_f64;

  for column in 0..column_count {
    let prior_variance = prior_scales[column] * prior_scales[column];
    prior_penalty += coefficients[column] * coefficients[column] / (2.0 * prior_variance);
    let derivative = gradient[column] / noise_variance + coefficients[column] / prior_variance;
    stationarity_residual = stationarity_residual.max(derivative.abs());
  }

  let noise_derivative = target.len() as f64 / noise_scale
    - residual_sum_squares / (noise_scale * noise_variance)
    + noise_scale / (NOISE_PRIOR_SCALE * NOISE_PRIOR_SCALE);
  stationarity_residual = stationarity_residual.max(noise_derivative.abs());

  let objective = target.len() as f64 * noise_scale.ln()
    + residual_sum_squares / (2.0 * noise_variance)
    + prior_penalty
    + noise_variance / (2.0 * NOISE_PRIOR_SCALE * NOISE_PRIOR_SCALE);

  if !objective.is_finite()
    || !residual_sum_squares.is_finite()
    || !stationarity_residual.is_finite()
  {
    return Err(FlatMapError::NonFiniteResult);
  }

  Ok(Evaluation {
    objective,
    residual_sum_squares,
    stationarity_residual,
  })
}

fn parse_seasonalities(
  seasonalities: &[SeasonalitySpec],
) -> Result<Vec<FourierSeasonality>, FlatMapError> {
  seasonalities
    .iter()
    .map(|seasonality| {
      if !seasonality.period_days.is_finite()
        || seasonality.period_days <= 0.0
        || seasonality.fourier_order == 0
        || !seasonality.prior_scale.is_finite()
        || seasonality.prior_scale <= 0.0
      {
        return Err(FlatMapError::InvalidConfiguration);
      }

      Ok(FourierSeasonality {
        period_days: seasonality.period_days,
        fourier_order: seasonality.fourier_order,
      })
    })
    .collect()
}

fn map_fourier_fit_error(error: FourierError) -> FlatMapError {
  match error {
    FourierError::InvalidTimestamp { .. } => FlatMapError::InvalidObservation,
    FourierError::InvalidSeasonality { .. } => FlatMapError::InvalidConfiguration,
    FourierError::SizeOverflow | FourierError::SizeLimitExceeded => FlatMapError::SizeOverflow,
    FourierError::InvalidCoefficients | FourierError::NonFiniteResult { .. } => {
      FlatMapError::NonFiniteResult
    }
  }
}

fn map_solve_error(error: RidgeSolveError) -> FlatMapError {
  match error {
    RidgeSolveError::SizeOverflow => FlatMapError::SizeOverflow,
    RidgeSolveError::InvalidDimensions
    | RidgeSolveError::NonFiniteInput
    | RidgeSolveError::RankDeficient { .. }
    | RidgeSolveError::NonFiniteResult => FlatMapError::NonFiniteResult,
  }
}

fn map_fit_configuration_to_prediction(error: FlatMapError) -> FlatMapPredictionError {
  match error {
    FlatMapError::InvalidConfiguration => FlatMapPredictionError::InvalidConfiguration,
    FlatMapError::SizeOverflow => FlatMapPredictionError::SizeOverflow,
    _ => FlatMapPredictionError::InvalidModel,
  }
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
  use super::{FlatMapError, FlatMapTermination, fit_flat_map, predict_flat_map};
  use crate::additive_ridge::SeasonalitySpec;

  fn assert_close(actual: f64, expected: f64, tolerance: f64) {
    assert!(
      (actual - expected).abs() <= tolerance,
      "expected {actual} to be within {tolerance} of {expected}"
    );
  }

  #[test]
  fn fits_a_reduced_flat_level_and_noise() {
    let model = fit_flat_map(&[0.0, 1.0, 2.0, 3.0], &[1.0, 2.0, 1.5, 2.5], &[])
      .expect("noisy values have an interior flat MAP optimum");

    assert_eq!(model.summary.termination, FlatMapTermination::Converged);
    assert!(model.level > 1.0 && model.level < 2.5);
    assert!(model.noise_scale > 0.0);
    assert!(model.summary.stationarity_residual < 1e-7);
  }

  #[test]
  fn preserves_the_constant_target_shortcut() {
    let model = fit_flat_map(&[0.0, 1.0], &[-4.0, -4.0], &[])
      .expect("constant targets use the explicit shortcut");

    assert_eq!(model.level, -4.0);
    assert_eq!(model.noise_scale, 4e-9);
    assert_eq!(
      model.summary.termination,
      FlatMapTermination::ConstantTargetShortcut
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
    let model = fit_flat_map(
      &[0.0, day * 0.25, day * 0.5, day * 0.75, day, day * 1.25],
      &[1.1, 3.0, 0.9, -1.2, 1.2, 2.9],
      &seasonalities,
    )
    .expect("noisy seasonal values should fit");
    let predictions = predict_flat_map(
      &[0.0, day * 0.25],
      model.level,
      model.noise_scale,
      &seasonalities,
      &model.coefficients,
    )
    .expect("the fitted model should predict");

    assert_close(predictions.values()[0], predictions.values()[4], 1e-12);
    assert_close(
      predictions.values()[2],
      predictions.values()[0] + predictions.values()[1],
      1e-12,
    );
    assert_ne!(predictions.values()[1], predictions.values()[5]);
  }

  #[test]
  fn rejects_insufficient_history() {
    assert_eq!(
      fit_flat_map(&[0.0], &[1.0], &[]),
      Err(FlatMapError::InsufficientObservations)
    );
  }
}
