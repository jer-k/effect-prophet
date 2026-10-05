use crate::additional_features::{
  AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::fourier::{checked_element_count, coefficient_count};
use crate::mixed_map::{
  ComponentMode, feature_priors, make_combined_features, validate_component_modes,
};
use crate::piecewise_map::{
  MapFitSummary, MapTermination, PiecewiseMapError, PiecewiseMapPredictionError,
  map_objective_error,
};
use crate::seasonality::SeasonalitySpec;
use crate::stan::linear_optimizer::LinearOptimizerOptions;
use crate::target_scaling::{
  LogisticScaling, ScalingMode, TargetScalingError, resolve_logistic_scaling,
};

const NOISE_PRIOR_SCALE: f64 = 0.5;

/// Dimensionless parameters of a piecewise-logistic trend.
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

struct StanLogisticSegments {
  rates: Vec<f64>,
  gamma: Vec<f64>,
  previous_offsets: Vec<f64>,
}

fn stan_logistic_segments(
  rate: f64,
  offset: f64,
  points: &[f64],
  deltas: &[f64],
) -> Result<StanLogisticSegments, PiecewiseMapError> {
  let mut rates = vec![rate];
  let mut cumulative_delta = 0.0;
  for delta in deltas {
    cumulative_delta += delta;
    rates.push(rate + cumulative_delta);
  }
  let mut gamma = Vec::with_capacity(points.len());
  let mut previous_offsets = Vec::with_capacity(points.len());
  let mut previous = offset;
  for (column, point) in points.iter().enumerate() {
    previous_offsets.push(previous);
    let adjustment = (point - previous) * (1.0 - rates[column] / rates[column + 1]);
    if !adjustment.is_finite() {
      return Err(PiecewiseMapError::NonFiniteResult);
    }
    gamma.push(adjustment);
    previous += adjustment;
  }
  Ok(StanLogisticSegments {
    rates,
    gamma,
    previous_offsets,
  })
}

struct Evaluation {
  objective: f64,
  gradient_rate: f64,
  gradient_offset: f64,
  // Complete derivatives, including the Laplace term.
  gradient_deltas: Vec<f64>,
  feature_gradients: Vec<f64>,
  noise_derivative: f64,
}

struct LogisticState {
  trend: Vec<f64>,
  residuals: Vec<f64>,
  segments: StanLogisticSegments,
  probabilities: Vec<f64>,
  /// Per row, the length of the active prefix of the sorted changepoints.
  active: Vec<usize>,
  /// Per row, Stan's rate change and offset adjustment for that prefix.
  changes: Vec<f64>,
  adjustments: Vec<f64>,
}

/// Each row's most recent logistic probability, keyed by the exact bits of
/// `eta`. The probability is a pure function of `eta`, so a hit returns the
/// identical value. Finite-difference Hessian perturbations of seasonal and
/// regressor coefficients, the noise scale, or a changepoint leave `eta`
/// bit-identical for every row, or every row before that changepoint, so
/// most of their `exp` calls are skipped.
pub(crate) struct ProbabilityCache {
  rows: std::cell::RefCell<Vec<Option<(u64, f64)>>>,
}

impl ProbabilityCache {
  pub(crate) fn new(row_count: usize) -> Self {
    Self {
      rows: std::cell::RefCell::new(vec![None; row_count]),
    }
  }

  fn probability(&self, row: usize, eta: f64) -> f64 {
    let mut rows = self.rows.borrow_mut();
    let key = eta.to_bits();

    if let Some((cached, probability)) = rows[row]
      && cached == key
    {
      return probability;
    }

    let probability = 1.0 / (1.0 + crate::stan::math::exp(-eta));
    rows[row] = Some((key, probability));
    probability
  }
}

/// Evaluate a row's changepoint `matrix_column_sum` once per distinct active
/// prefix. Callers pass sorted points, so a row's active columns are exactly
/// `column < active`, and the masked closure supplies each row the same values
/// the original per-row comparison did. Prefixes are memoized lazily, so the
/// work never exceeds one sum per row.
fn prefix_column_sums(row_count: usize, active: &[usize], values: &[f64]) -> Vec<f64> {
  let mut memo = vec![None; values.len() + 1];

  active
    .iter()
    .map(|&prefix| {
      *memo[prefix].get_or_insert_with(|| {
        crate::stan::reductions::matrix_column_sum(row_count, values.len(), |column| {
          if column < prefix { values[column] } else { 0.0 }
        })
      })
    })
    .collect()
}

/// Fit floor-aware logistic MAP state with Prophet's Stan optimizer policy.
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
  options: LinearOptimizerOptions,
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
  )?;

  let scaling = resolve_logistic_scaling(values, capacities, explicit_floors, scaling_mode)
    .map_err(map_scaling_error)?;
  let row_floors = row_floors(scaling, explicit_floors, values.len())?;
  let target = scale_rows(values, &row_floors, scaling.scale)?;
  let scaled_capacities = scale_capacities(capacities, &row_floors, scaling.scale)?;
  let times = normalized_times(timestamps);
  let seasonal_count = seasonalities
    .iter()
    .try_fold(0_usize, |total, seasonality| {
      seasonality
        .fourier_order
        .checked_mul(2)
        .and_then(|count| total.checked_add(count))
    })
    .ok_or(PiecewiseMapError::SizeOverflow)?;
  let features = make_combined_features(
    timestamps,
    &parse_fourier_seasonalities(seasonalities)?,
    seasonality_masks,
    additional_features,
  )?;
  let priors = feature_priors(seasonalities, additional_layout, seasonal_count)?;

  let origin = timestamps[0];
  let scale = timestamps[timestamps.len() - 1] - origin;
  let points: Vec<f64> = changepoints
    .iter()
    .map(|point| (*point - origin) / scale)
    .collect();
  let objective = StanLogisticObjective::new(
    &target,
    &scaled_capacities,
    &times,
    &points,
    &features,
    &priors,
    column_modes,
    changepoint_prior_scale,
  )
  .map_err(map_objective_error)?;
  let fit = objective
    .fit_model(options)
    .map_err(PiecewiseMapError::Optimizer)?;

  finish_model(
    timestamps,
    changepoints,
    seasonalities,
    seasonal_count,
    column_modes,
    scaling,
    fit.parameters.rate,
    fit.parameters.offset,
    fit.parameters.deltas,
    fit.coefficients,
    fit.noise_scale,
    MapFitSummary {
      value_scale: scaling.scale,
      observation_count: timestamps.len(),
      iterations: fit.optimization.iterations,
      objective: fit.objective,
      stationarity_residual: fit.stationarity_residual,
      termination: MapTermination::Stan(fit.optimization),
    },
  )
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
  let trend_state =
    LogisticPredictionTrend::new(parameters, time_origin, time_scale, changepoint_timestamps);

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

    let eta = trend_state
      .eta(time)
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
    || timestamps.windows(2).any(|pair| pair[1] < pair[0])
  {
    return Err(PiecewiseMapError::InvalidObservation);
  }

  let start = timestamps[0];
  let end = timestamps[timestamps.len() - 1];

  if !((end - start).is_finite() && end > start) {
    return Err(PiecewiseMapError::ZeroTimeRange);
  }

  if changepoints.iter().any(|value| !value.is_finite())
    || changepoints.windows(2).any(|pair| pair[1] < pair[0])
    || changepoints
      .iter()
      .any(|value| *value < start || *value > end)
    || !changepoint_prior_scale.is_finite()
    || changepoint_prior_scale <= 0.0
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

fn normalized_times(timestamps: &[f64]) -> Vec<f64> {
  let origin = timestamps[0];
  let scale = timestamps[timestamps.len() - 1] - origin;

  timestamps
    .iter()
    .map(|value| (*value - origin) / scale)
    .collect()
}

fn initialize_logistic(
  target: &[f64],
  capacities: &[f64],
  times: &[f64],
) -> Result<(f64, f64), PiecewiseMapError> {
  // Validated times are sorted. Python's idxmax selects the first tied final
  // timestamp; later instances still participate in the full fitting objective.
  let last = times.partition_point(|time| *time < times[times.len() - 1]);
  let first_target = target[0]
    .min(0.99 * capacities[0])
    .max(0.01 * capacities[0]);
  let last_target = target[last]
    .min(0.99 * capacities[last])
    .max(0.01 * capacities[last]);
  let mut first_inverse = capacities[0] / first_target;
  let last_inverse = capacities[last] / last_target;

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

/// Prepared public trend arithmetic shared by point prediction and simulation.
/// Callers validate aligned parameters and the time scale before construction.
pub(crate) struct LogisticPredictionTrend<'a> {
  parameters: &'a LogisticParameters,
  points: Vec<f64>,
  deltas: Vec<f64>,
  gammas: Vec<f64>,
}

impl<'a> LogisticPredictionTrend<'a> {
  pub(crate) fn new(
    parameters: &'a LogisticParameters,
    origin: f64,
    scale: f64,
    points: &[f64],
  ) -> Self {
    let points: Vec<f64> = if points.is_empty() {
      vec![0.0]
    } else {
      points
        .iter()
        .map(|point| (*point - origin) / scale)
        .collect()
    };
    let deltas = if parameters.deltas.is_empty() {
      vec![0.0]
    } else {
      parameters.deltas.clone()
    };
    let mut gammas = Vec::with_capacity(points.len());
    let mut cumulative_delta = 0.0;
    let mut old_rate = parameters.rate;

    for (&point, &delta) in points.iter().zip(&deltas) {
      cumulative_delta += delta;
      let new_rate = parameters.rate + cumulative_delta;
      // Python sums gamma before subtracting from the point. Stan's fitting
      // recurrence uses its own grouping; keep the two actual protocols distinct.
      let adjustment =
        (point - parameters.offset - gammas.iter().sum::<f64>()) * (1.0 - old_rate / new_rate);
      gammas.push(adjustment);
      old_rate = new_rate;
    }

    // A singular future segment must not poison rows preceding it. Retain the
    // nonfinite gamma here and translate only if an evaluated row activates it.
    Self {
      parameters,
      points,
      deltas,
      gammas,
    }
  }

  pub(crate) fn eta(&self, time: f64) -> Result<f64, PiecewiseMapError> {
    let mut rate = self.parameters.rate;
    let mut offset = self.parameters.offset;

    for ((&point, &delta), &gamma) in self.points.iter().zip(&self.deltas).zip(&self.gammas) {
      if time >= point {
        rate += delta;
        offset += gamma;
      }
    }

    let eta = rate * (time - offset);
    if eta.is_finite() {
      Ok(eta)
    } else {
      Err(PiecewiseMapError::NonFiniteResult)
    }
  }
}

#[allow(clippy::too_many_arguments)]
fn logistic_state(
  points: &[f64],
  target: &[f64],
  capacities: &[f64],
  times: &[f64],
  rate: f64,
  offset: f64,
  deltas: &[f64],
  features: &[f64],
  feature_count: usize,
  beta: &[f64],
  modes: &[ComponentMode],
  probabilities_cache: &ProbabilityCache,
) -> Result<LogisticState, PiecewiseMapError> {
  let mut trend = vec![0.0; target.len()];
  let mut residuals = vec![0.0; target.len()];
  let mut probabilities = vec![0.0; target.len()];
  let segments = stan_logistic_segments(rate, offset, points, deltas)?;
  let active: Vec<usize> = times
    .iter()
    .map(|&time| points.partition_point(|&point| time >= point))
    .collect();
  let changes = prefix_column_sums(target.len(), &active, deltas);
  let adjustments = prefix_column_sums(target.len(), &active, &segments.gamma);

  for row in 0..target.len() {
    let change = changes[row];
    let adjustment = adjustments[row];
    let eta = (rate + change) * (times[row] - (offset + adjustment));
    // Stan's matrix-of-var value view is not packet-accessible. Eigen's
    // logistic functor therefore uses scalar exp in fitting, on every row.
    let probability = probabilities_cache.probability(row, eta);
    probabilities[row] = probability;
    trend[row] = capacities[row] * probability;
    let mut additive = 0.0;
    let mut factor = 0.0;

    for column in 0..feature_count {
      let effect = features[row * feature_count + column] * beta[column];
      match modes[column] {
        ComponentMode::Additive => additive += effect,
        ComponentMode::Multiplicative => factor += effect,
      }
    }

    residuals[row] = -(target[row] - additive - trend[row] * (1.0 + factor));
  }

  if trend
    .iter()
    .chain(&residuals)
    .any(|value| !value.is_finite())
  {
    return Err(PiecewiseMapError::NonFiniteResult);
  }

  Ok(LogisticState {
    trend,
    residuals,
    segments,
    probabilities,
    active,
    changes,
    adjustments,
  })
}

#[allow(clippy::too_many_arguments)]
fn evaluate(
  points: &[f64],
  target: &[f64],
  capacities: &[f64],
  times: &[f64],
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
  probabilities_cache: &ProbabilityCache,
) -> Result<Evaluation, PiecewiseMapError> {
  let state = logistic_state(
    points,
    target,
    capacities,
    times,
    rate,
    offset,
    deltas,
    features,
    feature_count,
    beta,
    modes,
    probabilities_cache,
  )?;
  let segments = &state.segments;
  let inverse_noise = 1.0 / noise_scale;
  let scaled_sum_squares = crate::stan::reductions::sum(target.len(), |row| {
    let residual = state.residuals[row] * inverse_noise;
    residual * residual
  });
  let mut gradient_rate = (rate * 0.2) * 0.2;
  let mut gradient_offset = (offset * 0.2) * 0.2;
  let mut gradient_deltas: Vec<f64> = deltas
    .iter()
    .map(|&delta| crate::map_objective::laplace_derivative(delta, changepoint_prior_scale))
    .collect();
  let mut feature_gradients = vec![0.0; feature_count];
  let mut row_rate_adjoints = vec![0.0; target.len()];
  let mut row_offset_adjoints = vec![0.0; target.len()];

  for row in 0..target.len() {
    let mut factor = 1.0;
    for column in 0..feature_count {
      if modes[column] == ComponentMode::Multiplicative {
        factor += features[row * feature_count + column] * beta[column];
      }
    }

    let sigmoid = state.probabilities[row];
    let scaled_residual = (state.residuals[row] * inverse_noise) * inverse_noise;
    let mean_adjoint = scaled_residual * factor;
    let eta_adjoint = (mean_adjoint * capacities[row]) * sigmoid * (1.0 - sigmoid);
    let change = state.changes[row];
    let adjustment = state.adjustments[row];
    row_rate_adjoints[row] = eta_adjoint * (times[row] - (offset + adjustment));
    row_offset_adjoints[row] = -(rate + change) * eta_adjoint;
    gradient_rate += row_rate_adjoints[row];
    gradient_offset += row_offset_adjoints[row];

    for column in 0..feature_count {
      if modes[column] == ComponentMode::Multiplicative {
        let feature = features[row * feature_count + column];
        feature_gradients[column] += scaled_residual * (state.trend[row] * feature);
      }
    }
  }

  // Reverse the literal gamma recurrence and matrix products rather than
  // cancelling them into hinges. Scalar division follows Math 58ad15b0's
  // operator_division.hpp; cumulative-sum adjoints flow from last to first.
  let column_adjoints = crate::stan::reductions::matrix_adjoint_prefix_sums(
    target.len(),
    points.len(),
    |row| state.active[row],
    |row| [row_rate_adjoints[row], row_offset_adjoints[row]],
  );
  let mut rate_adjoints = vec![0.0; segments.rates.len()];
  let mut offset_adjoint = 0.0;
  for column in (0..points.len()).rev() {
    let [rate_sum, offset_sum] = column_adjoints[column];
    gradient_deltas[column] += rate_sum;
    let gamma_adjoint = offset_adjoint + offset_sum;
    let old_rate = segments.rates[column];
    let new_rate = segments.rates[column + 1];
    offset_adjoint -= gamma_adjoint * (1.0 - old_rate / new_rate);
    let ratio_adjoint = -gamma_adjoint * (points[column] - segments.previous_offsets[column]);
    rate_adjoints[column] += ratio_adjoint / new_rate;
    rate_adjoints[column + 1] -= ratio_adjoint * old_rate / (new_rate * new_rate);
  }
  gradient_offset += offset_adjoint;
  gradient_rate += rate_adjoints[0];
  for rate_adjoint in &rate_adjoints[1..] {
    gradient_rate += rate_adjoint;
  }
  let mut cumulative_adjoint = 0.0;
  for column in (0..points.len()).rev() {
    cumulative_adjoint += rate_adjoints[column + 1];
    gradient_deltas[column] += cumulative_adjoint;
  }

  for column in 0..feature_count {
    if modes[column] == ComponentMode::Additive {
      // The GLM's double-valued mu.transpose() * X uses row-major packets.
      // X_sm's variable-adjoint reverse product retains scalar accumulation;
      // the pinned cancellation probes distinguish these two paths.
      feature_gradients[column] = crate::stan::reductions::matrix_row_sum(target.len(), |row| {
        let scaled_residual = (state.residuals[row] * inverse_noise) * inverse_noise;
        scaled_residual * features[row * feature_count + column]
      });
    }

    let inverse = 1.0 / priors[column];
    feature_gradients[column] += (beta[column] * inverse) * inverse;
  }

  let noise_derivative = (target.len() as f64 - scaled_sum_squares) * inverse_noise
    + noise_scale / (NOISE_PRIOR_SCALE * NOISE_PRIOR_SCALE);

  // Preserve normal_id_glm's residual scaling and the model's prior-first
  // accumulation. Equivalent RSS/variance arithmetic changes nonsmooth stops.
  let mut density = 0.0;
  for parameter in [rate, offset] {
    let standardized = parameter * 0.2;
    density -= 0.5 * standardized * standardized;
  }
  density -= crate::stan::reductions::sum(deltas.len(), |column| {
    deltas[column].abs() * (1.0 / changepoint_prior_scale)
  });
  density -= 0.5 * (noise_scale * 2.0) * (noise_scale * 2.0);
  density -= 0.5
    * crate::stan::reductions::sum(feature_count, |column| {
      let standardized = beta[column] * (1.0 / priors[column]);
      standardized * standardized
    });
  density += -(target.len() as f64) * noise_scale.ln() - 0.5 * scaled_sum_squares;
  let objective = -density;

  if !objective.is_finite()
    || !gradient_rate.is_finite()
    || !gradient_offset.is_finite()
    || gradient_deltas.iter().any(|value| !value.is_finite())
  {
    return Err(PiecewiseMapError::NonFiniteResult);
  }

  Ok(Evaluation {
    objective,
    gradient_rate,
    gradient_offset,
    gradient_deltas,
    feature_gradients,
    noise_derivative,
  })
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
  summary: MapFitSummary,
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
    summary,
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

#[path = "logistic_objective.rs"]
mod stan_objective;
pub use stan_objective::{NormalizedLogisticMapFit, StanLogisticObjective};

#[cfg(test)]
#[path = "logistic_objective_fixtures.rs"]
mod objective_fixtures;

#[cfg(test)]
#[path = "logistic_newton_trajectory.rs"]
mod newton_trajectory;

#[cfg(test)]
#[path = "logistic_prediction_fixtures.rs"]
mod prediction_fixtures;

#[cfg(test)]
mod tests {
  use super::{LogisticParameters, fit_logistic_map, predict_logistic_map, stable_sigmoid};
  use crate::additional_features::{
    AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
  };
  use crate::mixed_map::ComponentMode;
  use crate::stan::linear_optimizer::LinearOptimizerOptions;
  use crate::target_scaling::{LogisticFloorPolicy, LogisticScaling, ScalingMode};

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
      LinearOptimizerOptions::default(),
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
      LinearOptimizerOptions::default(),
      ScalingMode::AbsMax,
    )
    .unwrap();

    assert_eq!(model.additional_coefficients.len(), 1);
  }
}
