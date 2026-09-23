use crate::additional_features::{
  AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::compensated_sum::CompensatedSum;
use crate::fourier::{checked_element_count, coefficient_count};
use crate::mixed_map::{
  ComponentMode, feature_priors, make_combined_features, soft_threshold, validate_component_modes,
};
use crate::piecewise_map::{
  MapControls, MapFitSummary, MapTermination, PiecewiseMapError, PiecewiseMapPredictionError,
};
use crate::seasonality::SeasonalitySpec;
use crate::target_scaling::{
  LogisticScaling, ScalingMode, TargetScalingError, resolve_logistic_scaling,
};

const TREND_PRIOR_SCALE: f64 = 5.0;
const NOISE_PRIOR_SCALE: f64 = 0.5;
const COLLAPSE_TOLERANCE: f64 = 1e-24;
const MAX_BACKTRACKS: usize = 40;
const BACKTRACK_FACTOR: f64 = 0.5;
const MIN_STEP: f64 = 9.094_947_017_729_282e-13;

/// Dimensionless parameters of a continuous piecewise-logistic trend.
#[derive(Clone, Debug, PartialEq)]
pub struct LogisticParameters {
  /// Base dimensionless growth rate.
  pub rate: f64,

  /// Dimensionless time offset at which the base logistic reaches its midpoint.
  pub offset: f64,

  /// Ordered dimensionless rate changes aligned to changepoints.
  pub deltas: Vec<f64>,
}

/// Complete fitted logistic MAP state returned by the pure Rust kernel.
#[derive(Clone, Debug, PartialEq)]
pub struct LogisticMapModel {
  /// Train-derived floor and target-scaling policy.
  pub scaling: LogisticScaling,

  /// Dimensionless logistic parameters.
  pub parameters: LogisticParameters,

  /// Training timestamp mapped to normalized time zero.
  pub time_origin: f64,

  /// Positive training interval mapped to one normalized time unit.
  pub time_scale: f64,

  /// Ordered changepoint timestamps.
  pub changepoint_timestamps: Vec<f64>,

  /// Ordered seasonal definitions.
  pub seasonalities: Vec<SeasonalitySpec>,

  /// Seasonal coefficients: output units for additive, dimensionless for multiplicative.
  pub coefficients: Vec<f64>,

  /// Additional coefficients: output units for additive, dimensionless for multiplicative.
  pub additional_coefficients: Vec<f64>,

  /// One mode per seasonal then additional feature column.
  pub column_modes: Vec<ComponentMode>,

  /// Positive fitted noise in output units.
  pub noise_scale: f64,

  /// Finite deterministic optimizer diagnostics.
  pub summary: MapFitSummary,
}

/// Row-major `[trend, additive, multiplicative, value, component...]` predictions.
#[derive(Clone, Debug, PartialEq)]
pub struct LogisticPredictionBatch {
  values: Vec<f64>,
}

impl LogisticPredictionBatch {
  /// Borrow checked row-major prediction values.
  #[must_use]
  pub fn values(&self) -> &[f64] {
    &self.values
  }
}

struct Evaluation {
  objective: f64,
  residual_sum_squares: f64,
  stationarity_residual: f64,
  gradient_rate: f64,
  gradient_offset: f64,
  gradient_deltas: Vec<f64>,
  curvature_rate: f64,
  curvature_offset: f64,
  curvature_deltas: Vec<f64>,
}

struct LogisticState {
  trend: Vec<f64>,
  residuals: Vec<f64>,
}

/// Fit Prophet's floor-aware logistic MAP objective with deterministic block updates.
#[allow(clippy::too_many_arguments)]
pub fn fit_logistic_map(
  timestamps: &[f64],
  values: &[f64],
  capacities: &[f64],
  explicit_floors: Option<&[f64]>,
  changepoints: &[f64],
  seasonalities: &[SeasonalitySpec],
  seasonality_masks: SeasonalityMaskView<'_>,
  additional_features: FeatureMatrixView<'_>,
  additional_layout: AdditionalFeatureLayoutView<'_>,
  column_modes: &[ComponentMode],
  changepoint_prior_scale: f64,
  controls: MapControls,
  scaling_mode: ScalingMode,
) -> Result<LogisticMapModel, PiecewiseMapError> {
  validate_fit(
    timestamps,
    values,
    capacities,
    explicit_floors,
    changepoints,
    seasonalities,
    seasonality_masks,
    additional_features,
    additional_layout,
    column_modes,
    changepoint_prior_scale,
    controls,
  )?;

  let scaling = resolve_logistic_scaling(values, capacities, explicit_floors, scaling_mode)
    .map_err(map_scaling_error)?;
  let row_floors = row_floors(scaling, explicit_floors, values.len())?;
  let target = scale_rows(values, &row_floors, scaling.scale)?;
  let scaled_capacities = scale_capacities(capacities, &row_floors, scaling.scale)?;
  let (times, hinges) = normalized_time_and_hinges(timestamps, changepoints)?;
  let seasonal_count = seasonalities
    .iter()
    .try_fold(0_usize, |total, seasonality| {
      seasonality
        .fourier_order
        .checked_mul(2)
        .and_then(|count| total.checked_add(count))
    })
    .ok_or(PiecewiseMapError::SizeOverflow)?;
  let feature_count = seasonal_count
    .checked_add(additional_features.column_count)
    .ok_or(PiecewiseMapError::SizeOverflow)?;
  let features = make_combined_features(
    timestamps,
    &parse_fourier_seasonalities(seasonalities)?,
    seasonality_masks,
    additional_features,
  )?;
  let priors = feature_priors(seasonalities, additional_layout, seasonal_count)?;
  let (mut rate, mut offset) = initialize_logistic(
    target[0],
    target[target.len() - 1],
    scaled_capacities[0],
    scaled_capacities[scaled_capacities.len() - 1],
  )?;
  let mut deltas = vec![0.0; changepoints.len()];
  let mut beta = vec![0.0; feature_count];
  let mut noise_scale = 1.0;
  let mut previous_objective: Option<f64> = None;
  let target_magnitude = target.iter().map(|value| value * value).sum::<f64>();

  for iteration in 1..=controls.max_iterations {
    let previous_rate = rate;
    let previous_offset = offset;
    let previous_deltas = deltas.clone();
    let previous_beta = beta.clone();
    let previous_noise = noise_scale;

    let mut state = logistic_state(
      &target,
      &scaled_capacities,
      &times,
      &hinges,
      rate,
      offset,
      &deltas,
      &features,
      feature_count,
      &beta,
      column_modes,
    )?;
    let noise_variance = noise_scale * noise_scale;

    for column in 0..feature_count {
      let old = beta[column];
      let mut squared_norm = 0.0;
      let mut partial_dot = 0.0;

      for row in 0..target.len() {
        let feature = features[row * feature_count + column];
        let derivative = match column_modes[column] {
          ComponentMode::Additive => feature,
          ComponentMode::Multiplicative => state.trend[row] * feature,
        };

        squared_norm += derivative * derivative;
        partial_dot += derivative * (-state.residuals[row] + derivative * old);
      }

      let prior = priors[column];
      let next = partial_dot / (squared_norm + noise_variance / (prior * prior));

      if !next.is_finite() {
        return Err(PiecewiseMapError::NonFiniteResult);
      }

      let change = next - old;

      if change != 0.0 {
        for row in 0..target.len() {
          let feature = features[row * feature_count + column];
          let derivative = match column_modes[column] {
            ComponentMode::Additive => feature,
            ComponentMode::Multiplicative => state.trend[row] * feature,
          };
          state.residuals[row] += derivative * change;
        }
      }

      beta[column] = next;
    }

    let current = evaluate(
      &target,
      &scaled_capacities,
      &times,
      &hinges,
      rate,
      offset,
      &deltas,
      &features,
      feature_count,
      &beta,
      column_modes,
      &priors,
      changepoint_prior_scale,
      noise_scale,
    )?;
    let mut step = 1.0;
    let mut accepted = None;

    for _ in 0..MAX_BACKTRACKS {
      let candidate_rate = rate - step * current.gradient_rate / current.curvature_rate;
      let candidate_offset = offset - step * current.gradient_offset / current.curvature_offset;
      let candidate_deltas: Vec<f64> = deltas
        .iter()
        .zip(&current.gradient_deltas)
        .enumerate()
        .map(|(index, (&value, &gradient))| {
          soft_threshold(
            value - step * gradient / current.curvature_deltas[index],
            step / (changepoint_prior_scale * current.curvature_deltas[index]),
          )
        })
        .collect();

      if candidate_rate.is_finite()
        && candidate_offset.is_finite()
        && candidate_deltas.iter().all(|value| value.is_finite())
      {
        let candidate = evaluate(
          &target,
          &scaled_capacities,
          &times,
          &hinges,
          candidate_rate,
          candidate_offset,
          &candidate_deltas,
          &features,
          feature_count,
          &beta,
          column_modes,
          &priors,
          changepoint_prior_scale,
          noise_scale,
        );

        if let Ok(candidate_evaluation) = candidate {
          let tolerance = 1e-14 * current.objective.abs().max(1.0);

          if candidate_evaluation.objective <= current.objective + tolerance {
            accepted = Some((candidate_rate, candidate_offset, candidate_deltas));
            break;
          }
        }
      }

      step *= BACKTRACK_FACTOR;

      if step < MIN_STEP {
        break;
      }
    }

    let Some((next_rate, next_offset, next_deltas)) = accepted else {
      return Err(PiecewiseMapError::NonConvergence);
    };

    rate = next_rate;
    offset = next_offset;
    deltas = next_deltas;

    let evaluation = evaluate(
      &target,
      &scaled_capacities,
      &times,
      &hinges,
      rate,
      offset,
      &deltas,
      &features,
      feature_count,
      &beta,
      column_modes,
      &priors,
      changepoint_prior_scale,
      noise_scale,
    )?;

    if evaluation.residual_sum_squares <= COLLAPSE_TOLERANCE * target_magnitude.max(1.0) {
      return Err(PiecewiseMapError::NoiseCollapse);
    }

    let observation_count = values.len() as f64;
    let discriminant =
      observation_count * observation_count + 16.0 * evaluation.residual_sum_squares;
    let noise_variance =
      2.0 * evaluation.residual_sum_squares / (observation_count + discriminant.sqrt());
    let next_noise = noise_variance.sqrt();

    if !next_noise.is_finite() || next_noise <= 0.0 {
      return Err(PiecewiseMapError::NonFiniteResult);
    }

    noise_scale = next_noise;
    let maximum_change = maximum_change(
      previous_rate,
      rate,
      previous_offset,
      offset,
      &previous_deltas,
      &deltas,
      &previous_beta,
      &beta,
      previous_noise,
      noise_scale,
    );
    let maximum_magnitude = deltas.iter().chain(&beta).fold(
      rate.abs().max(offset.abs()).max(noise_scale).max(1.0),
      |maximum, value| maximum.max(value.abs()),
    );
    let threshold = controls.absolute_tolerance + controls.relative_tolerance * maximum_magnitude;

    let final_evaluation = evaluate(
      &target,
      &scaled_capacities,
      &times,
      &hinges,
      rate,
      offset,
      &deltas,
      &features,
      feature_count,
      &beta,
      column_modes,
      &priors,
      changepoint_prior_scale,
      noise_scale,
    )?;
    let objective_change = previous_objective
      .map(|previous| (previous - final_evaluation.objective).abs())
      .unwrap_or(f64::INFINITY);
    let objective_threshold = controls.absolute_tolerance
      + controls.relative_tolerance * final_evaluation.objective.abs().max(1.0);

    if maximum_change <= threshold || objective_change <= objective_threshold {
      return finish_model(
        timestamps,
        changepoints,
        seasonalities,
        seasonal_count,
        column_modes,
        scaling,
        rate,
        offset,
        deltas,
        beta,
        noise_scale,
        iteration,
        final_evaluation,
      );
    }

    previous_objective = Some(final_evaluation.objective);
  }

  Err(PiecewiseMapError::NonConvergence)
}

/// Predict a floor-aware logistic batch with mixed named components.
#[allow(clippy::too_many_arguments)]
pub fn predict_logistic_map(
  timestamps: &[f64],
  capacities: &[f64],
  explicit_floors: Option<&[f64]>,
  scaling: LogisticScaling,
  parameters: &LogisticParameters,
  time_origin: f64,
  time_scale: f64,
  changepoint_timestamps: &[f64],
  noise_scale: f64,
  seasonalities: &[SeasonalitySpec],
  seasonal_coefficients: &[f64],
  seasonality_masks: SeasonalityMaskView<'_>,
  additional_features: FeatureMatrixView<'_>,
  additional_layout: AdditionalFeatureLayoutView<'_>,
  additional_coefficients: &[f64],
  column_modes: &[ComponentMode],
) -> Result<LogisticPredictionBatch, PiecewiseMapPredictionError> {
  use PiecewiseMapPredictionError as Error;

  if timestamps.len() != capacities.len()
    || explicit_floors.is_some_and(|floors| floors.len() != timestamps.len())
    || !time_origin.is_finite()
    || !time_scale.is_finite()
    || time_scale <= 0.0
    || !noise_scale.is_finite()
    || noise_scale <= 0.0
    || !parameters.rate.is_finite()
    || !parameters.offset.is_finite()
    || parameters.deltas.len() != changepoint_timestamps.len()
    || parameters.deltas.iter().any(|value| !value.is_finite())
  {
    return Err(Error::InvalidModel);
  }

  let fourier =
    parse_fourier_seasonalities(seasonalities).map_err(|_| Error::InvalidConfiguration)?;
  let seasonal_count = coefficient_count(&fourier).map_err(map_prediction_fourier_error)?;
  let feature_count = seasonal_count
    .checked_add(additional_features.column_count)
    .ok_or(Error::SizeOverflow)?;

  if seasonal_coefficients.len() != seasonal_count
    || additional_coefficients.len() != additional_features.column_count
    || column_modes.len() != feature_count
    || seasonal_coefficients
      .iter()
      .chain(additional_coefficients)
      .any(|value| !value.is_finite())
  {
    return Err(Error::InvalidModel);
  }

  seasonality_masks
    .validate(timestamps.len(), seasonalities.len())
    .map_err(|_| Error::InvalidConfiguration)?;
  additional_features
    .validate(timestamps.len())
    .map_err(|_| Error::InvalidConfiguration)?;
  additional_layout
    .validate(additional_features.column_count)
    .map_err(|_| Error::InvalidConfiguration)?;
  validate_component_modes(
    seasonalities,
    additional_layout,
    column_modes,
    seasonal_count,
  )
  .map_err(|_| Error::InvalidConfiguration)?;

  let features =
    make_combined_features(timestamps, &fourier, seasonality_masks, additional_features)
      .map_err(map_fit_to_prediction)?;
  let coefficients: Vec<f64> = seasonal_coefficients
    .iter()
    .chain(additional_coefficients)
    .copied()
    .collect();
  let component_count = seasonalities
    .len()
    .checked_add(additional_layout.component_offsets.len())
    .ok_or(Error::SizeOverflow)?;
  let row_width = component_count.checked_add(4).ok_or(Error::SizeOverflow)?;
  let output_count =
    checked_element_count(timestamps.len(), row_width).map_err(map_prediction_fourier_error)?;
  let mut output = vec![0.0; output_count];

  for row in 0..timestamps.len() {
    let timestamp = timestamps[row];
    let capacity = capacities[row];

    if !timestamp.is_finite() || !capacity.is_finite() {
      return Err(Error::InvalidTimestamp { row });
    }

    let floor = scaling
      .row_floor(explicit_floors, row)
      .map_err(|_| Error::InvalidConfiguration)?;

    if capacity <= floor {
      return Err(Error::InvalidConfiguration);
    }

    let time = (timestamp - time_origin) / time_scale;

    if !time.is_finite() {
      return Err(Error::NonFiniteResult { row });
    }

    let eta = logistic_eta(
      time,
      time_origin,
      time_scale,
      changepoint_timestamps,
      parameters.rate,
      parameters.offset,
      &parameters.deltas,
    )
    .map_err(|_| Error::NonFiniteResult { row })?;
    let trend = floor + (capacity - floor) * stable_sigmoid(eta);
    let mut additive = 0.0;
    let mut multiplicative = 0.0;
    let mut column_effects = vec![0.0; feature_count];

    for column in 0..feature_count {
      let effect = features[row * feature_count + column] * coefficients[column];
      column_effects[column] = effect;

      match column_modes[column] {
        ComponentMode::Additive => additive += effect,
        ComponentMode::Multiplicative => multiplicative += effect,
      }
    }

    let value = trend * (1.0 + multiplicative) + additive;

    if !trend.is_finite()
      || !additive.is_finite()
      || !multiplicative.is_finite()
      || !value.is_finite()
    {
      return Err(Error::NonFiniteResult { row });
    }

    let output_offset = row * row_width;
    output[output_offset] = trend;
    output[output_offset + 1] = additive;
    output[output_offset + 2] = multiplicative;
    output[output_offset + 3] = value;
    let mut component_output = output_offset + 4;
    let mut seasonal_offset = 0;

    for seasonality in seasonalities {
      let count = seasonality.fourier_order * 2;
      output[component_output] = column_effects[seasonal_offset..(seasonal_offset + count)]
        .iter()
        .sum();
      seasonal_offset += count;
      component_output += 1;
    }

    for (&offset, &count) in additional_layout
      .component_offsets
      .iter()
      .zip(additional_layout.component_counts)
    {
      let start = seasonal_count + offset;
      output[component_output] = column_effects[start..(start + count)].iter().sum();
      component_output += 1;
    }
  }

  Ok(LogisticPredictionBatch { values: output })
}

#[allow(clippy::too_many_arguments)]
fn validate_fit(
  timestamps: &[f64],
  values: &[f64],
  capacities: &[f64],
  explicit_floors: Option<&[f64]>,
  changepoints: &[f64],
  seasonalities: &[SeasonalitySpec],
  masks: SeasonalityMaskView<'_>,
  additional: FeatureMatrixView<'_>,
  layout: AdditionalFeatureLayoutView<'_>,
  modes: &[ComponentMode],
  changepoint_prior_scale: f64,
  controls: MapControls,
) -> Result<(), PiecewiseMapError> {
  if timestamps.len() != values.len()
    || capacities.len() != values.len()
    || explicit_floors.is_some_and(|floors| floors.len() != values.len())
  {
    return Err(PiecewiseMapError::LengthMismatch);
  }

  if values.len() < 2 {
    return Err(PiecewiseMapError::InsufficientObservations);
  }

  if timestamps
    .iter()
    .chain(values)
    .chain(capacities)
    .any(|value| !value.is_finite())
    || explicit_floors.is_some_and(|floors| floors.iter().any(|value| !value.is_finite()))
    || timestamps.windows(2).any(|pair| pair[1] <= pair[0])
  {
    return Err(PiecewiseMapError::InvalidObservation);
  }

  let start = timestamps[0];
  let end = timestamps[timestamps.len() - 1];

  if !((end - start).is_finite() && end > start)
    || changepoints.iter().any(|value| !value.is_finite())
    || changepoints.windows(2).any(|pair| pair[1] <= pair[0])
    || changepoints
      .iter()
      .any(|value| *value < start || *value > end)
    || !changepoint_prior_scale.is_finite()
    || changepoint_prior_scale <= 0.0
    || controls.max_iterations == 0
    || !controls.relative_tolerance.is_finite()
    || controls.relative_tolerance <= 0.0
    || !controls.absolute_tolerance.is_finite()
    || controls.absolute_tolerance <= 0.0
  {
    return Err(PiecewiseMapError::InvalidConfiguration);
  }

  masks
    .validate(values.len(), seasonalities.len())
    .map_err(|_| PiecewiseMapError::InvalidConfiguration)?;
  additional
    .validate(values.len())
    .map_err(|_| PiecewiseMapError::InvalidConfiguration)?;
  layout
    .validate(additional.column_count)
    .map_err(|_| PiecewiseMapError::InvalidConfiguration)?;
  let seasonal_count = seasonalities
    .iter()
    .try_fold(0_usize, |total, seasonality| {
      seasonality
        .fourier_order
        .checked_mul(2)
        .and_then(|count| total.checked_add(count))
    })
    .ok_or(PiecewiseMapError::SizeOverflow)?;

  if modes.len() != seasonal_count + additional.column_count {
    return Err(PiecewiseMapError::InvalidConfiguration);
  }

  validate_component_modes(seasonalities, layout, modes, seasonal_count)
}

fn parse_fourier_seasonalities(
  seasonalities: &[SeasonalitySpec],
) -> Result<Vec<crate::fourier::FourierSeasonality>, PiecewiseMapError> {
  seasonalities
    .iter()
    .map(|seasonality| {
      if !seasonality.period_days.is_finite()
        || seasonality.period_days <= 0.0
        || seasonality.fourier_order == 0
        || !seasonality.prior_scale.is_finite()
        || seasonality.prior_scale <= 0.0
      {
        return Err(PiecewiseMapError::InvalidConfiguration);
      }

      Ok(crate::fourier::FourierSeasonality {
        period_days: seasonality.period_days,
        fourier_order: seasonality.fourier_order,
      })
    })
    .collect()
}

fn row_floors(
  scaling: LogisticScaling,
  explicit: Option<&[f64]>,
  count: usize,
) -> Result<Vec<f64>, PiecewiseMapError> {
  (0..count)
    .map(|row| scaling.row_floor(explicit, row).map_err(map_scaling_error))
    .collect()
}

fn scale_rows(values: &[f64], floors: &[f64], scale: f64) -> Result<Vec<f64>, PiecewiseMapError> {
  values
    .iter()
    .zip(floors)
    .map(|(&value, &floor)| {
      let scaled = (value - floor) / scale;
      if scaled.is_finite() {
        Ok(scaled)
      } else {
        Err(PiecewiseMapError::NonRepresentableScaling)
      }
    })
    .collect()
}

fn scale_capacities(
  capacities: &[f64],
  floors: &[f64],
  scale: f64,
) -> Result<Vec<f64>, PiecewiseMapError> {
  capacities
    .iter()
    .zip(floors)
    .map(|(&capacity, &floor)| {
      let scaled = (capacity - floor) / scale;
      if scaled.is_finite() && scaled > 0.0 {
        Ok(scaled)
      } else {
        Err(PiecewiseMapError::NonRepresentableScaling)
      }
    })
    .collect()
}

fn normalized_time_and_hinges(
  timestamps: &[f64],
  changepoints: &[f64],
) -> Result<(Vec<f64>, Vec<f64>), PiecewiseMapError> {
  let origin = timestamps[0];
  let scale = timestamps[timestamps.len() - 1] - origin;
  let times: Vec<f64> = timestamps
    .iter()
    .map(|value| (*value - origin) / scale)
    .collect();
  let points: Vec<f64> = changepoints
    .iter()
    .map(|value| (*value - origin) / scale)
    .collect();
  let count = checked_element_count(timestamps.len(), changepoints.len())
    .map_err(|_| PiecewiseMapError::SizeOverflow)?;
  let mut hinges = vec![0.0; count];

  for (row, &time) in times.iter().enumerate() {
    for (column, &point) in points.iter().enumerate() {
      hinges[row * points.len() + column] = (time - point).max(0.0);
    }
  }

  Ok((times, hinges))
}

fn initialize_logistic(
  first_target: f64,
  last_target: f64,
  first_capacity: f64,
  last_capacity: f64,
) -> Result<(f64, f64), PiecewiseMapError> {
  let first_ratio = (first_target / first_capacity).clamp(0.01, 0.99);
  let last_ratio = (last_target / last_capacity).clamp(0.01, 0.99);
  let mut first_inverse = 1.0 / first_ratio;
  let last_inverse = 1.0 / last_ratio;

  if (first_inverse - last_inverse).abs() <= 0.01 {
    first_inverse *= 1.05;
  }

  let first_logit = (first_inverse - 1.0).ln();
  let last_logit = (last_inverse - 1.0).ln();
  let rate = first_logit - last_logit;
  let offset = first_logit / rate;

  if !rate.is_finite() || !offset.is_finite() || rate == 0.0 {
    return Err(PiecewiseMapError::NonFiniteResult);
  }

  Ok((rate, offset))
}

pub(crate) fn stable_sigmoid(value: f64) -> f64 {
  if value >= 0.0 {
    1.0 / (1.0 + (-value).exp())
  } else {
    let exponential = value.exp();
    exponential / (1.0 + exponential)
  }
}

fn eta_from_hinges(
  time: f64,
  hinge_row: &[f64],
  rate: f64,
  offset: f64,
  deltas: &[f64],
) -> Result<f64, PiecewiseMapError> {
  let mut sum = CompensatedSum::default();
  sum.add(rate * (time - offset));

  for (&hinge, &delta) in hinge_row.iter().zip(deltas) {
    sum.add(delta * hinge);
  }

  let eta = sum.total();
  if eta.is_finite() {
    Ok(eta)
  } else {
    Err(PiecewiseMapError::NonFiniteResult)
  }
}

pub(crate) fn logistic_eta(
  time: f64,
  origin: f64,
  scale: f64,
  changepoints: &[f64],
  rate: f64,
  offset: f64,
  deltas: &[f64],
) -> Result<f64, PiecewiseMapError> {
  let hinges: Vec<f64> = changepoints
    .iter()
    .map(|point| (time - (*point - origin) / scale).max(0.0))
    .collect();
  eta_from_hinges(time, &hinges, rate, offset, deltas)
}

#[allow(clippy::too_many_arguments)]
fn logistic_state(
  target: &[f64],
  capacities: &[f64],
  times: &[f64],
  hinges: &[f64],
  rate: f64,
  offset: f64,
  deltas: &[f64],
  features: &[f64],
  feature_count: usize,
  beta: &[f64],
  modes: &[ComponentMode],
) -> Result<LogisticState, PiecewiseMapError> {
  let mut trend = vec![0.0; target.len()];
  let mut residuals = vec![0.0; target.len()];

  for row in 0..target.len() {
    let hinge_start = row * deltas.len();
    let eta = eta_from_hinges(
      times[row],
      &hinges[hinge_start..(hinge_start + deltas.len())],
      rate,
      offset,
      deltas,
    )?;
    trend[row] = capacities[row] * stable_sigmoid(eta);
    let mut additive = 0.0;
    let mut factor = 0.0;

    for column in 0..feature_count {
      let effect = features[row * feature_count + column] * beta[column];
      match modes[column] {
        ComponentMode::Additive => additive += effect,
        ComponentMode::Multiplicative => factor += effect,
      }
    }

    residuals[row] = trend[row] * (1.0 + factor) + additive - target[row];
  }

  if trend
    .iter()
    .chain(&residuals)
    .any(|value| !value.is_finite())
  {
    return Err(PiecewiseMapError::NonFiniteResult);
  }

  Ok(LogisticState { trend, residuals })
}

#[allow(clippy::too_many_arguments)]
fn evaluate(
  target: &[f64],
  capacities: &[f64],
  times: &[f64],
  hinges: &[f64],
  rate: f64,
  offset: f64,
  deltas: &[f64],
  features: &[f64],
  feature_count: usize,
  beta: &[f64],
  modes: &[ComponentMode],
  priors: &[f64],
  changepoint_prior_scale: f64,
  noise_scale: f64,
) -> Result<Evaluation, PiecewiseMapError> {
  let state = logistic_state(
    target,
    capacities,
    times,
    hinges,
    rate,
    offset,
    deltas,
    features,
    feature_count,
    beta,
    modes,
  )?;
  let residual_sum_squares = state
    .residuals
    .iter()
    .map(|value| value * value)
    .sum::<f64>();
  let noise_variance = noise_scale * noise_scale;
  let mut smooth_objective = target.len() as f64 * noise_scale.ln()
    + residual_sum_squares / (2.0 * noise_variance)
    + (rate * rate + offset * offset) / (2.0 * TREND_PRIOR_SCALE * TREND_PRIOR_SCALE)
    + noise_variance / (2.0 * NOISE_PRIOR_SCALE * NOISE_PRIOR_SCALE);
  let prior_curvature = 1.0 / (TREND_PRIOR_SCALE * TREND_PRIOR_SCALE);
  let mut gradient_rate = rate * prior_curvature;
  let mut gradient_offset = offset * prior_curvature;
  let mut gradient_deltas = vec![0.0; deltas.len()];
  let mut curvature_rate = prior_curvature;
  let mut curvature_offset = prior_curvature;
  let mut curvature_deltas = vec![f64::EPSILON; deltas.len()];
  let mut feature_gradients = vec![0.0; feature_count];

  for row in 0..target.len() {
    let mut factor = 1.0;
    for column in 0..feature_count {
      if modes[column] == ComponentMode::Multiplicative {
        factor += features[row * feature_count + column] * beta[column];
      }
    }

    let sigmoid = state.trend[row] / capacities[row];
    let mean_eta_derivative = factor * capacities[row] * sigmoid * (1.0 - sigmoid);
    let scaled_residual = state.residuals[row] / noise_variance;
    let rate_derivative = mean_eta_derivative * (times[row] - offset);
    let offset_derivative = -mean_eta_derivative * rate;
    gradient_rate += scaled_residual * rate_derivative;
    gradient_offset += scaled_residual * offset_derivative;
    curvature_rate += rate_derivative * rate_derivative / noise_variance;
    curvature_offset += offset_derivative * offset_derivative / noise_variance;

    for column in 0..deltas.len() {
      let derivative = mean_eta_derivative * hinges[row * deltas.len() + column];
      gradient_deltas[column] += scaled_residual * derivative;
      curvature_deltas[column] += derivative * derivative / noise_variance;
    }

    for column in 0..feature_count {
      let feature = features[row * feature_count + column];
      let derivative = match modes[column] {
        ComponentMode::Additive => feature,
        ComponentMode::Multiplicative => state.trend[row] * feature,
      };
      feature_gradients[column] += scaled_residual * derivative;
    }
  }

  let mut stationarity_residual = gradient_rate.abs().max(gradient_offset.abs());

  for column in 0..feature_count {
    let variance = priors[column] * priors[column];
    smooth_objective += beta[column] * beta[column] / (2.0 * variance);
    feature_gradients[column] += beta[column] / variance;
    stationarity_residual = stationarity_residual.max(feature_gradients[column].abs());
  }

  let mut objective = smooth_objective;
  for (index, &delta) in deltas.iter().enumerate() {
    objective += delta.abs() / changepoint_prior_scale;
    let residual = if delta == 0.0 {
      (gradient_deltas[index].abs() - 1.0 / changepoint_prior_scale).max(0.0)
    } else {
      (gradient_deltas[index] + delta.signum() / changepoint_prior_scale).abs()
    };
    stationarity_residual = stationarity_residual.max(residual);
  }

  let noise_derivative = target.len() as f64 / noise_scale
    - residual_sum_squares / (noise_scale * noise_variance)
    + noise_scale / (NOISE_PRIOR_SCALE * NOISE_PRIOR_SCALE);
  stationarity_residual = stationarity_residual.max(noise_derivative.abs());

  if !objective.is_finite()
    || !smooth_objective.is_finite()
    || !residual_sum_squares.is_finite()
    || !stationarity_residual.is_finite()
    || !gradient_rate.is_finite()
    || !gradient_offset.is_finite()
    || gradient_deltas.iter().any(|value| !value.is_finite())
  {
    return Err(PiecewiseMapError::NonFiniteResult);
  }

  Ok(Evaluation {
    objective,
    residual_sum_squares,
    stationarity_residual,
    gradient_rate,
    gradient_offset,
    gradient_deltas,
    curvature_rate,
    curvature_offset,
    curvature_deltas,
  })
}

#[allow(clippy::too_many_arguments)]
fn maximum_change(
  old_rate: f64,
  rate: f64,
  old_offset: f64,
  offset: f64,
  old_deltas: &[f64],
  deltas: &[f64],
  old_beta: &[f64],
  beta: &[f64],
  old_noise: f64,
  noise: f64,
) -> f64 {
  old_deltas
    .iter()
    .zip(deltas)
    .chain(old_beta.iter().zip(beta))
    .map(|(old, next)| (next - old).abs())
    .fold(
      (rate - old_rate)
        .abs()
        .max((offset - old_offset).abs())
        .max((noise - old_noise).abs()),
      f64::max,
    )
}

#[allow(clippy::too_many_arguments)]
fn finish_model(
  timestamps: &[f64],
  changepoints: &[f64],
  seasonalities: &[SeasonalitySpec],
  seasonal_count: usize,
  modes: &[ComponentMode],
  scaling: LogisticScaling,
  rate: f64,
  offset: f64,
  deltas: Vec<f64>,
  beta: Vec<f64>,
  noise_scale: f64,
  iterations: usize,
  evaluation: Evaluation,
) -> Result<LogisticMapModel, PiecewiseMapError> {
  let output_beta: Vec<f64> = beta
    .iter()
    .enumerate()
    .map(|(index, value)| match modes[index] {
      ComponentMode::Additive => value * scaling.scale,
      ComponentMode::Multiplicative => *value,
    })
    .collect();
  let output_noise = noise_scale * scaling.scale;

  if output_beta.iter().any(|value| !value.is_finite())
    || !output_noise.is_finite()
    || output_noise <= 0.0
  {
    return Err(PiecewiseMapError::NonFiniteResult);
  }

  Ok(LogisticMapModel {
    scaling,
    parameters: LogisticParameters {
      rate,
      offset,
      deltas,
    },
    time_origin: timestamps[0],
    time_scale: timestamps[timestamps.len() - 1] - timestamps[0],
    changepoint_timestamps: changepoints.to_vec(),
    seasonalities: seasonalities.to_vec(),
    coefficients: output_beta[..seasonal_count].to_vec(),
    additional_coefficients: output_beta[seasonal_count..].to_vec(),
    column_modes: modes.to_vec(),
    noise_scale: output_noise,
    summary: MapFitSummary {
      value_scale: scaling.scale,
      observation_count: timestamps.len(),
      iterations,
      objective: evaluation.objective,
      stationarity_residual: evaluation.stationarity_residual,
      termination: MapTermination::Converged,
    },
  })
}

fn map_scaling_error(error: TargetScalingError) -> PiecewiseMapError {
  match error {
    TargetScalingError::EmptyValues => PiecewiseMapError::InsufficientObservations,
    TargetScalingError::NonFiniteValue => PiecewiseMapError::InvalidObservation,
    TargetScalingError::InvalidScaling => PiecewiseMapError::InvalidConfiguration,
    TargetScalingError::NonRepresentable => PiecewiseMapError::NonRepresentableScaling,
  }
}

fn map_prediction_fourier_error(
  error: crate::fourier::FourierError,
) -> PiecewiseMapPredictionError {
  use crate::fourier::FourierError;
  use PiecewiseMapPredictionError as Error;

  match error {
    FourierError::InvalidTimestamp { row } => Error::InvalidTimestamp { row },
    FourierError::InvalidSeasonality { .. } => Error::InvalidConfiguration,
    FourierError::SizeOverflow | FourierError::SizeLimitExceeded => Error::SizeOverflow,
    FourierError::InvalidCoefficients => Error::InvalidModel,
    FourierError::NonFiniteResult { row, .. } => Error::NonFiniteResult { row },
  }
}

fn map_fit_to_prediction(error: PiecewiseMapError) -> PiecewiseMapPredictionError {
  match error {
    PiecewiseMapError::SizeOverflow => PiecewiseMapPredictionError::SizeOverflow,
    PiecewiseMapError::NonFiniteResult | PiecewiseMapError::NonRepresentableScaling => {
      PiecewiseMapPredictionError::NonFiniteResult { row: 0 }
    }
    _ => PiecewiseMapPredictionError::InvalidConfiguration,
  }
}

#[cfg(test)]
mod tests {
  use super::{LogisticParameters, fit_logistic_map, predict_logistic_map, stable_sigmoid};
  use crate::additional_features::{
    AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
  };
  use crate::mixed_map::ComponentMode;
  use crate::piecewise_map::MapControls;
  use crate::target_scaling::{LogisticFloorPolicy, LogisticScaling, ScalingMode};

  const CONTROLS: MapControls = MapControls {
    max_iterations: 10_000,
    relative_tolerance: 1e-7,
    absolute_tolerance: 1e-9,
  };

  #[test]
  fn evaluates_stable_logistic_midpoint_and_saturation() {
    assert_eq!(stable_sigmoid(0.0), 0.5);
    assert_eq!(stable_sigmoid(1_000.0), 1.0);
    assert_eq!(stable_sigmoid(-1_000.0), 0.0);
  }

  #[test]
  fn predicts_changing_capacity_and_floor() {
    let batch = predict_logistic_map(
      &[0.0, 1.0],
      &[10.0, 20.0],
      Some(&[-2.0, 2.0]),
      LogisticScaling {
        mode: ScalingMode::AbsMax,
        scale: 10.0,
        floor_policy: LogisticFloorPolicy::Explicit,
      },
      &LogisticParameters {
        rate: 1.0,
        offset: 0.0,
        deltas: vec![],
      },
      0.0,
      1.0,
      &[],
      1.0,
      &[],
      &[],
      SeasonalityMaskView {
        row_count: 2,
        component_count: 0,
        values: &[],
      },
      FeatureMatrixView {
        row_count: 2,
        column_count: 0,
        values: &[],
      },
      AdditionalFeatureLayoutView {
        prior_scales: &[],
        component_offsets: &[],
        component_counts: &[],
      },
      &[],
      &[],
    )
    .unwrap();

    assert_eq!(batch.values()[0], 4.0);
    assert!((batch.values()[4] - (2.0 + 18.0 * stable_sigmoid(1.0))).abs() < 1e-12);
  }

  #[test]
  fn fits_a_simple_logistic_history() {
    let timestamps = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
    let values = [1.192029, 2.314752, 4.013123, 5.986877, 7.685248, 8.807971];
    let capacities = [10.0; 6];
    let model = fit_logistic_map(
      &timestamps,
      &values,
      &capacities,
      None,
      &[],
      &[],
      SeasonalityMaskView {
        row_count: 6,
        component_count: 0,
        values: &[],
      },
      FeatureMatrixView {
        row_count: 6,
        column_count: 0,
        values: &[],
      },
      AdditionalFeatureLayoutView {
        prior_scales: &[],
        component_offsets: &[],
        component_counts: &[],
      },
      &[],
      0.05,
      CONTROLS,
      ScalingMode::AbsMax,
    )
    .unwrap();

    assert!(model.parameters.rate.is_finite());
    assert!(model.parameters.offset.is_finite());
    assert!(model.noise_scale > 0.0);
  }

  #[test]
  fn accepts_mixed_feature_modes() {
    let timestamps = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
    let values = [1.2, 2.2, 4.2, 6.1, 7.6, 8.9];
    let capacities = [10.0; 6];
    let features = [1.0, -1.0, 0.5, 1.0, -0.5, 0.0];
    let model = fit_logistic_map(
      &timestamps,
      &values,
      &capacities,
      None,
      &[],
      &[],
      SeasonalityMaskView {
        row_count: 6,
        component_count: 0,
        values: &[],
      },
      FeatureMatrixView {
        row_count: 6,
        column_count: 1,
        values: &features,
      },
      AdditionalFeatureLayoutView {
        prior_scales: &[10.0],
        component_offsets: &[0],
        component_counts: &[1],
      },
      &[ComponentMode::Multiplicative],
      0.05,
      CONTROLS,
      ScalingMode::AbsMax,
    )
    .unwrap();

    assert_eq!(model.additional_coefficients.len(), 1);
  }
}
