use crate::additional_features::{
  AdditionalFeatureError, AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::fourier::{
  FourierError, FourierSeasonality, apply_seasonality_masks, checked_element_count,
  coefficient_count, make_fourier_features,
};
use crate::piecewise_linear::PiecewiseTrend;
use crate::piecewise_map::{MapFitSummary, MapTermination, PiecewiseMapError};
use crate::seasonality::SeasonalitySpec;
use crate::stan::linear_optimizer::LinearOptimizerOptions;
use crate::target_scaling::{
  ScalingMode, TargetScaling, TargetScalingError, resolve_target_scaling,
};

const TREND_PRIOR_SCALE: f64 = 5.0;
const NOISE_PRIOR_SCALE: f64 = 0.5;
const CONSTANT_TARGET_NOISE_SCALE: f64 = 1e-9;

/// Resolved mode for one numerical feature column.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum ComponentMode {
  /// The coefficient contributes directly in scaled target units.
  Additive,

  /// The coefficient is a dimensionless factor multiplying the trend.
  Multiplicative,
}

/// Trend family optimized by the mixed MAP kernel.
#[derive(Clone, Copy, Debug)]
pub enum MixedTrendInput<'a> {
  /// Continuous piecewise-linear growth with ordered changepoints.
  Linear { changepoints: &'a [f64] },

  /// A single flat level: Prophet's linear density with its time column fixed at zero.
  Flat,
}

/// Stored output-unit mixed trend state.
#[derive(Clone, Debug, PartialEq)]
pub enum MixedTrendModel {
  /// Continuous output-unit piecewise-linear trend relative to target offset.
  Linear(PiecewiseTrend),

  /// Output-unit flat level relative to target offset.
  Flat { level: f64 },
}

/// Complete fitted mixed MAP state returned by the pure Rust kernel.
#[derive(Clone, Debug, PartialEq)]
pub struct MixedMapModel {
  /// Train-derived target scaling.
  pub target_scaling: TargetScaling,

  /// Output-unit trend state relative to the target offset.
  pub trend: MixedTrendModel,

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
pub struct MixedMapPredictionBatch {
  values: Vec<f64>,
}

impl MixedMapPredictionBatch {
  /// Borrow checked row-major prediction values.
  #[must_use]
  pub fn values(&self) -> &[f64] {
    &self.values
  }
}

/// Fit mixed linear or flat state with Prophet's Stan optimization policy.
#[allow(clippy::too_many_arguments)]
pub fn fit_mixed_map(
  timestamps: &[f64],
  values: &[f64],
  trend_input: MixedTrendInput<'_>,
  seasonalities: &[SeasonalitySpec],
  seasonality_masks: SeasonalityMaskView<'_>,
  additional_features: FeatureMatrixView<'_>,
  additional_layout: AdditionalFeatureLayoutView<'_>,
  column_modes: &[ComponentMode],
  changepoint_prior_scale: f64,
  controls: LinearOptimizerOptions,
  scaling_mode: ScalingMode,
) -> Result<MixedMapModel, PiecewiseMapError> {
  validate_common(
    timestamps,
    values,
    trend_input,
    seasonalities,
    seasonality_masks,
    additional_features,
    additional_layout,
    column_modes,
    changepoint_prior_scale,
  )?;

  let fourier_seasonalities = parse_seasonalities(seasonalities)?;
  let seasonal_count = coefficient_count(&fourier_seasonalities).map_err(map_fourier_fit_error)?;
  let feature_count = seasonal_count
    .checked_add(additional_features.column_count)
    .ok_or(PiecewiseMapError::SizeOverflow)?;
  let trend_count = match trend_input {
    MixedTrendInput::Linear { changepoints } => 2_usize
      .checked_add(changepoints.len())
      .ok_or(PiecewiseMapError::SizeOverflow)?,
    MixedTrendInput::Flat => 2,
  };
  let feature_values = make_combined_features(
    timestamps,
    &fourier_seasonalities,
    seasonality_masks,
    additional_features,
  )?;
  let trend_design = make_trend_design(timestamps, trend_input, trend_count)?;
  let target_scaling =
    resolve_target_scaling(values, scaling_mode).map_err(map_target_scaling_error)?;
  let value_scale = target_scaling.scale;
  let target = values
    .iter()
    .map(|value| {
      target_scaling
        .scale_value(*value)
        .map_err(map_target_scaling_error)
    })
    .collect::<Result<Vec<_>, _>>()?;
  let feature_priors = feature_priors(seasonalities, additional_layout, seasonal_count)?;
  let first_value = values[0];

  if values.iter().all(|value| *value == first_value) {
    let scaled_level = target_scaling
      .scale_value(first_value)
      .map_err(map_target_scaling_error)?;
    let objective = values.len() as f64 * CONSTANT_TARGET_NOISE_SCALE.ln()
      + scaled_level * scaled_level / (2.0 * TREND_PRIOR_SCALE * TREND_PRIOR_SCALE)
      + CONSTANT_TARGET_NOISE_SCALE * CONSTANT_TARGET_NOISE_SCALE
        / (2.0 * NOISE_PRIOR_SCALE * NOISE_PRIOR_SCALE);
    let trend = match trend_input {
      MixedTrendInput::Linear { changepoints } => MixedTrendModel::Linear(PiecewiseTrend {
        intercept: scaled_level * value_scale,
        slope: 0.0,
        time_origin: timestamps[0],
        time_scale: timestamps[timestamps.len() - 1] - timestamps[0],
        changepoint_timestamps: changepoints.to_vec(),
        deltas: vec![0.0; changepoints.len()],
      }),
      MixedTrendInput::Flat => MixedTrendModel::Flat {
        level: scaled_level * value_scale,
      },
    };

    return Ok(MixedMapModel {
      target_scaling,
      trend,
      seasonalities: seasonalities.to_vec(),
      coefficients: vec![0.0; seasonal_count],
      additional_coefficients: vec![0.0; additional_features.column_count],
      column_modes: column_modes.to_vec(),
      noise_scale: value_scale * CONSTANT_TARGET_NOISE_SCALE,
      summary: MapFitSummary {
        value_scale,
        observation_count: values.len(),
        iterations: 0,
        objective,
        stationarity_residual: 0.0,
        termination: MapTermination::ConstantTargetShortcut,
      },
    });
  }

  let column_count = trend_count
    .checked_add(feature_count)
    .ok_or(PiecewiseMapError::SizeOverflow)?;
  let count = checked_element_count(values.len(), column_count).map_err(map_fourier_fit_error)?;
  let mut design = vec![0.0; count];

  for row in 0..values.len() {
    let start = row * column_count;
    design[start..start + trend_count]
      .copy_from_slice(&trend_design[row * trend_count..(row + 1) * trend_count]);
    design[start + trend_count..start + column_count]
      .copy_from_slice(&feature_values[row * feature_count..(row + 1) * feature_count]);
  }

  let fit = match trend_input {
    MixedTrendInput::Linear { changepoints } => {
      let origin = timestamps[0];
      let time_scale = timestamps[timestamps.len() - 1] - origin;
      let points: Vec<f64> = changepoints
        .iter()
        .map(|point| (point - origin) / time_scale)
        .collect();

      crate::map_objective::StanLinearObjective::new(
        &design,
        &target,
        &points,
        &feature_priors,
        column_modes,
        changepoint_prior_scale,
      )
      .map_err(crate::piecewise_map::map_objective_error)?
      .fit_model(controls)
    }
    MixedTrendInput::Flat => crate::map_objective::StanFlatObjective::new(
      &design,
      &target,
      &feature_priors,
      column_modes,
      changepoint_prior_scale,
    )
    .map_err(crate::piecewise_map::map_objective_error)?
    .fit_model(controls),
  }
  .map_err(PiecewiseMapError::Optimizer)?;

  // A flat fit never moves its rate; only the level is trend state.
  let fitted_trend_count = match trend_input {
    MixedTrendInput::Linear { .. } => trend_count,
    MixedTrendInput::Flat => 1,
  };

  finish_model(
    timestamps,
    values.len(),
    trend_input,
    seasonalities,
    seasonal_count,
    column_modes,
    target_scaling,
    fit.coefficients[..fitted_trend_count].to_vec(),
    fit.coefficients[trend_count..].to_vec(),
    fit.noise_scale,
    fit.optimization.iterations,
    fit.objective,
    fit.stationarity_residual,
    MapTermination::Stan(fit.optimization),
  )
}

/// Evaluate fitted mixed state and return additive values, factors, totals, and named effects.
#[allow(clippy::too_many_arguments)]
pub fn predict_mixed_map(
  timestamps: &[f64],
  target_scaling: TargetScaling,
  trend: &MixedTrendModel,
  noise_scale: f64,
  seasonalities: &[SeasonalitySpec],
  seasonal_coefficients: &[f64],
  seasonality_masks: SeasonalityMaskView<'_>,
  additional_features: FeatureMatrixView<'_>,
  additional_layout: AdditionalFeatureLayoutView<'_>,
  additional_coefficients: &[f64],
  column_modes: &[ComponentMode],
) -> Result<MixedMapPredictionBatch, crate::piecewise_map::PiecewiseMapPredictionError> {
  use crate::piecewise_map::PiecewiseMapPredictionError as Error;

  if !noise_scale.is_finite() || noise_scale <= 0.0 {
    return Err(Error::InvalidModel);
  }

  let fourier = parse_seasonalities(seasonalities).map_err(|_| Error::InvalidConfiguration)?;
  let seasonal_count = coefficient_count(&fourier).map_err(map_fourier_prediction_error)?;
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
    .map_err(map_additional_prediction_error)?;
  additional_features
    .validate(timestamps.len())
    .map_err(map_additional_prediction_error)?;
  additional_layout
    .validate(additional_features.column_count)
    .map_err(map_additional_prediction_error)?;
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
    checked_element_count(timestamps.len(), row_width).map_err(map_fourier_prediction_error)?;
  let mut output = vec![0.0; output_count];

  for (row, &timestamp) in timestamps.iter().enumerate() {
    if !timestamp.is_finite() {
      return Err(Error::InvalidTimestamp { row });
    }

    let relative_trend = match trend {
      MixedTrendModel::Linear(piecewise) => {
        piecewise
          .evaluate(timestamp, row)
          .map_err(|error| match error {
            crate::piecewise_linear::PiecewiseTrendError::InvalidTimestamp { row } => {
              Error::InvalidTimestamp { row }
            }
            crate::piecewise_linear::PiecewiseTrendError::NonFiniteResult { row } => {
              Error::NonFiniteResult { row }
            }
            _ => Error::InvalidModel,
          })?
      }
      MixedTrendModel::Flat { level } if level.is_finite() => *level,
      MixedTrendModel::Flat { .. } => return Err(Error::InvalidModel),
    };
    let trend_value = target_scaling
      .restore_trend(relative_trend)
      .map_err(|_| Error::InvalidModel)?;
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

    let value = trend_value * (1.0 + multiplicative) + additive;

    if !trend_value.is_finite()
      || !additive.is_finite()
      || !multiplicative.is_finite()
      || !value.is_finite()
    {
      return Err(Error::NonFiniteResult { row });
    }

    let output_offset = row * row_width;
    output[output_offset] = trend_value;
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

  Ok(MixedMapPredictionBatch { values: output })
}

#[allow(clippy::too_many_arguments)]
fn validate_common(
  timestamps: &[f64],
  values: &[f64],
  trend_input: MixedTrendInput<'_>,
  seasonalities: &[SeasonalitySpec],
  masks: SeasonalityMaskView<'_>,
  additional: FeatureMatrixView<'_>,
  layout: AdditionalFeatureLayoutView<'_>,
  modes: &[ComponentMode],
  changepoint_prior_scale: f64,
) -> Result<(), PiecewiseMapError> {
  if timestamps.len() != values.len() {
    return Err(PiecewiseMapError::LengthMismatch);
  }

  if values.len() < 2 {
    return Err(PiecewiseMapError::InsufficientObservations);
  }

  if timestamps
    .iter()
    .chain(values)
    .any(|value| !value.is_finite())
    || timestamps.windows(2).any(|pair| pair[1] < pair[0])
  {
    return Err(PiecewiseMapError::InvalidObservation);
  }

  if !changepoint_prior_scale.is_finite() || changepoint_prior_scale <= 0.0 {
    return Err(PiecewiseMapError::InvalidConfiguration);
  }

  if let MixedTrendInput::Linear { changepoints } = trend_input {
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
    {
      return Err(PiecewiseMapError::InvalidConfiguration);
    }
  }

  masks
    .validate(values.len(), seasonalities.len())
    .map_err(map_additional_fit_error)?;
  additional
    .validate(values.len())
    .map_err(map_additional_fit_error)?;
  layout
    .validate(additional.column_count)
    .map_err(map_additional_fit_error)?;
  let seasonal_count = seasonalities
    .iter()
    .try_fold(0_usize, |total, seasonality| {
      seasonality
        .fourier_order
        .checked_mul(2)
        .and_then(|count| total.checked_add(count))
    });
  let seasonal_count = seasonal_count.ok_or(PiecewiseMapError::SizeOverflow)?;

  if modes.len() != seasonal_count + additional.column_count {
    return Err(PiecewiseMapError::InvalidConfiguration);
  }

  validate_component_modes(seasonalities, layout, modes, seasonal_count)
}

pub(crate) fn validate_component_modes(
  seasonalities: &[SeasonalitySpec],
  layout: AdditionalFeatureLayoutView<'_>,
  modes: &[ComponentMode],
  seasonal_count: usize,
) -> Result<(), PiecewiseMapError> {
  let mut offset = 0;

  for seasonality in seasonalities {
    let count = seasonality
      .fourier_order
      .checked_mul(2)
      .ok_or(PiecewiseMapError::SizeOverflow)?;
    let mode = modes
      .get(offset)
      .ok_or(PiecewiseMapError::InvalidConfiguration)?;

    if modes[offset..(offset + count)]
      .iter()
      .any(|value| value != mode)
    {
      return Err(PiecewiseMapError::InvalidConfiguration);
    }

    offset += count;
  }

  for (&component_offset, &count) in layout.component_offsets.iter().zip(layout.component_counts) {
    let start = seasonal_count + component_offset;
    let mode = modes
      .get(start)
      .ok_or(PiecewiseMapError::InvalidConfiguration)?;

    if modes[start..(start + count)]
      .iter()
      .any(|value| value != mode)
    {
      return Err(PiecewiseMapError::InvalidConfiguration);
    }
  }

  Ok(())
}

fn parse_seasonalities(
  seasonalities: &[SeasonalitySpec],
) -> Result<Vec<FourierSeasonality>, PiecewiseMapError> {
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

      Ok(FourierSeasonality {
        period_days: seasonality.period_days,
        fourier_order: seasonality.fourier_order,
      })
    })
    .collect()
}

pub(crate) fn make_combined_features(
  timestamps: &[f64],
  seasonalities: &[FourierSeasonality],
  masks: SeasonalityMaskView<'_>,
  additional: FeatureMatrixView<'_>,
) -> Result<Vec<f64>, PiecewiseMapError> {
  let seasonal_count = coefficient_count(seasonalities).map_err(map_fourier_fit_error)?;
  let feature_count = seasonal_count
    .checked_add(additional.column_count)
    .ok_or(PiecewiseMapError::SizeOverflow)?;
  let count =
    checked_element_count(timestamps.len(), feature_count).map_err(map_fourier_fit_error)?;
  let mut seasonal =
    make_fourier_features(timestamps, seasonalities).map_err(map_fourier_fit_error)?;
  apply_seasonality_masks(&mut seasonal, seasonalities, masks.values)
    .map_err(map_fourier_fit_error)?;
  let mut values = vec![0.0; count];

  for row in 0..timestamps.len() {
    let target = row * feature_count;
    let seasonal_source = row * seasonal_count;
    let additional_source = row * additional.column_count;
    values[target..(target + seasonal_count)]
      .copy_from_slice(&seasonal.values()[seasonal_source..(seasonal_source + seasonal_count)]);
    values[(target + seasonal_count)..(target + feature_count)].copy_from_slice(
      &additional.values[additional_source..(additional_source + additional.column_count)],
    );
  }

  Ok(values)
}

fn make_trend_design(
  timestamps: &[f64],
  trend_input: MixedTrendInput<'_>,
  trend_count: usize,
) -> Result<Vec<f64>, PiecewiseMapError> {
  let count =
    checked_element_count(timestamps.len(), trend_count).map_err(map_fourier_fit_error)?;
  let mut design = vec![0.0; count];

  match trend_input {
    MixedTrendInput::Flat => {
      for row in design.chunks_exact_mut(trend_count) {
        row[0] = 1.0;
      }
    }
    MixedTrendInput::Linear { changepoints } => {
      let origin = timestamps[0];
      let scale = timestamps[timestamps.len() - 1] - origin;

      for (row, timestamp) in timestamps.iter().enumerate() {
        let time = (*timestamp - origin) / scale;
        let offset = row * trend_count;
        design[offset] = 1.0;
        design[offset + 1] = time;

        for (index, changepoint) in changepoints.iter().enumerate() {
          let point = (*changepoint - origin) / scale;
          design[offset + 2 + index] = (time - point).max(0.0);
        }
      }
    }
  }

  Ok(design)
}

pub(crate) fn feature_priors(
  seasonalities: &[SeasonalitySpec],
  additional: AdditionalFeatureLayoutView<'_>,
  seasonal_count: usize,
) -> Result<Vec<f64>, PiecewiseMapError> {
  let mut priors = Vec::with_capacity(seasonal_count + additional.prior_scales.len());

  for seasonality in seasonalities {
    let count = seasonality
      .fourier_order
      .checked_mul(2)
      .ok_or(PiecewiseMapError::SizeOverflow)?;
    priors.extend(std::iter::repeat_n(seasonality.prior_scale, count));
  }

  priors.extend_from_slice(additional.prior_scales);
  Ok(priors)
}

#[allow(clippy::too_many_arguments)]
fn finish_model(
  timestamps: &[f64],
  observation_count: usize,
  trend_input: MixedTrendInput<'_>,
  seasonalities: &[SeasonalitySpec],
  seasonal_count: usize,
  modes: &[ComponentMode],
  target_scaling: TargetScaling,
  trend_coefficients: Vec<f64>,
  beta: Vec<f64>,
  noise_scale: f64,
  iterations: usize,
  objective: f64,
  stationarity_residual: f64,
  termination: MapTermination,
) -> Result<MixedMapModel, PiecewiseMapError> {
  let value_scale = target_scaling.scale;
  let output_trend: Vec<f64> = trend_coefficients
    .iter()
    .map(|value| value * value_scale)
    .collect();
  let output_beta: Vec<f64> = beta
    .iter()
    .enumerate()
    .map(|(index, value)| match modes[index] {
      ComponentMode::Additive => value * value_scale,
      ComponentMode::Multiplicative => *value,
    })
    .collect();
  let output_noise = noise_scale * value_scale;

  if output_trend
    .iter()
    .chain(&output_beta)
    .any(|value| !value.is_finite())
    || !output_noise.is_finite()
    || output_noise <= 0.0
  {
    return Err(PiecewiseMapError::NonFiniteResult);
  }

  let trend = match trend_input {
    MixedTrendInput::Linear { changepoints } => MixedTrendModel::Linear(PiecewiseTrend {
      intercept: output_trend[0],
      slope: output_trend[1],
      time_origin: timestamps[0],
      time_scale: timestamps[timestamps.len() - 1] - timestamps[0],
      changepoint_timestamps: changepoints.to_vec(),
      deltas: output_trend[2..].to_vec(),
    }),
    MixedTrendInput::Flat => MixedTrendModel::Flat {
      level: output_trend[0],
    },
  };

  target_scaling
    .restore_trend(output_trend[0])
    .map_err(map_target_scaling_error)?;

  Ok(MixedMapModel {
    target_scaling,
    trend,
    seasonalities: seasonalities.to_vec(),
    coefficients: output_beta[..seasonal_count].to_vec(),
    additional_coefficients: output_beta[seasonal_count..].to_vec(),
    column_modes: modes.to_vec(),
    noise_scale: output_noise,
    summary: MapFitSummary {
      value_scale,
      observation_count,
      iterations,
      objective,
      stationarity_residual,
      termination,
    },
  })
}

fn map_fourier_fit_error(error: FourierError) -> PiecewiseMapError {
  match error {
    FourierError::InvalidTimestamp { .. } => PiecewiseMapError::InvalidObservation,
    FourierError::InvalidSeasonality { .. } => PiecewiseMapError::InvalidConfiguration,
    FourierError::SizeOverflow | FourierError::SizeLimitExceeded => PiecewiseMapError::SizeOverflow,
    FourierError::InvalidCoefficients | FourierError::NonFiniteResult { .. } => {
      PiecewiseMapError::NonFiniteResult
    }
  }
}

fn map_fourier_prediction_error(
  error: FourierError,
) -> crate::piecewise_map::PiecewiseMapPredictionError {
  use crate::piecewise_map::PiecewiseMapPredictionError as Error;

  match error {
    FourierError::InvalidTimestamp { row } => Error::InvalidTimestamp { row },
    FourierError::InvalidSeasonality { .. } => Error::InvalidConfiguration,
    FourierError::SizeOverflow | FourierError::SizeLimitExceeded => Error::SizeOverflow,
    FourierError::InvalidCoefficients => Error::InvalidModel,
    FourierError::NonFiniteResult { row, .. } => Error::NonFiniteResult { row },
  }
}

fn map_additional_fit_error(error: AdditionalFeatureError) -> PiecewiseMapError {
  match error {
    AdditionalFeatureError::SizeOverflow => PiecewiseMapError::SizeOverflow,
    AdditionalFeatureError::InvalidDimensions
    | AdditionalFeatureError::InvalidValue
    | AdditionalFeatureError::InvalidLayout => PiecewiseMapError::InvalidConfiguration,
  }
}

fn map_additional_prediction_error(
  error: AdditionalFeatureError,
) -> crate::piecewise_map::PiecewiseMapPredictionError {
  use crate::piecewise_map::PiecewiseMapPredictionError as Error;

  match error {
    AdditionalFeatureError::SizeOverflow => Error::SizeOverflow,
    AdditionalFeatureError::InvalidDimensions
    | AdditionalFeatureError::InvalidValue
    | AdditionalFeatureError::InvalidLayout => Error::InvalidConfiguration,
  }
}

fn map_target_scaling_error(error: TargetScalingError) -> PiecewiseMapError {
  match error {
    TargetScalingError::EmptyValues => PiecewiseMapError::InsufficientObservations,
    TargetScalingError::InvalidScaling => PiecewiseMapError::InvalidConfiguration,
    TargetScalingError::NonFiniteValue => PiecewiseMapError::InvalidObservation,
    TargetScalingError::NonRepresentable => PiecewiseMapError::NonRepresentableScaling,
  }
}

fn map_fit_to_prediction(
  error: PiecewiseMapError,
) -> crate::piecewise_map::PiecewiseMapPredictionError {
  use crate::piecewise_map::PiecewiseMapPredictionError as Error;

  match error {
    PiecewiseMapError::SizeOverflow => Error::SizeOverflow,
    PiecewiseMapError::NonFiniteResult => Error::NonFiniteResult { row: 0 },
    _ => Error::InvalidConfiguration,
  }
}

#[cfg(test)]
mod tests {
  use super::{ComponentMode, MixedTrendInput, MixedTrendModel, fit_mixed_map, predict_mixed_map};
  use crate::additional_features::{
    AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
  };
  use crate::piecewise_map::MapTermination;
  use crate::seasonality::SeasonalitySpec;
  use crate::stan::linear_optimizer::LinearOptimizerOptions;
  use crate::target_scaling::ScalingMode;

  const DAY: f64 = 86_400_000.0;

  fn flat_level(model: &super::MixedMapModel) -> f64 {
    match model.trend {
      MixedTrendModel::Flat { level } => level,
      MixedTrendModel::Linear(_) => panic!("expected a flat trend"),
    }
  }

  #[test]
  fn fits_and_predicts_flat_mixed_components() {
    let timestamps = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
    let feature_values = [1.0, -1.0, 0.5, 1.0, -0.5, 0.0];
    let values = [11.0, 8.0, 10.5, 11.0, 9.5, 10.0];
    let model = fit_mixed_map(
      &timestamps,
      &values,
      MixedTrendInput::Flat,
      &[],
      SeasonalityMaskView {
        row_count: 6,
        component_count: 0,
        values: &[],
      },
      FeatureMatrixView {
        row_count: 6,
        column_count: 1,
        values: &feature_values,
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
    .expect("mixed flat fit should converge");

    assert!(model.additional_coefficients[0].is_finite());
    assert!(matches!(model.summary.termination, MapTermination::Stan(_)));

    let predictions = predict_mixed_map(
      &[6.0],
      model.target_scaling,
      &model.trend,
      model.noise_scale,
      &[],
      &[],
      SeasonalityMaskView {
        row_count: 1,
        component_count: 0,
        values: &[],
      },
      FeatureMatrixView {
        row_count: 1,
        column_count: 1,
        values: &[2.0],
      },
      AdditionalFeatureLayoutView {
        prior_scales: &[10.0],
        component_offsets: &[0],
        component_counts: &[1],
      },
      &model.additional_coefficients,
      &model.column_modes,
    )
    .expect("mixed flat prediction should be finite");

    assert_eq!(predictions.values().len(), 5);
    assert_eq!(predictions.values()[1], 0.0);
    assert_eq!(predictions.values()[2], predictions.values()[4]);
  }

  #[test]
  fn preserves_dimensionless_multiplicative_and_output_unit_additive_coefficients() {
    let timestamps = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
    let features = [
      1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.5, 0.5, -0.5,
    ];
    let values = [12.0, 11.0, 13.0, 9.0, 7.5, 10.5];
    let model = fit_mixed_map(
      &timestamps,
      &values,
      MixedTrendInput::Linear { changepoints: &[] },
      &[],
      SeasonalityMaskView {
        row_count: 6,
        component_count: 0,
        values: &[],
      },
      FeatureMatrixView {
        row_count: 6,
        column_count: 2,
        values: &features,
      },
      AdditionalFeatureLayoutView {
        prior_scales: &[10.0, 10.0],
        component_offsets: &[0, 1],
        component_counts: &[1, 1],
      },
      &[ComponentMode::Additive, ComponentMode::Multiplicative],
      0.05,
      LinearOptimizerOptions::default(),
      ScalingMode::AbsMax,
    )
    .expect("mixed linear fit should converge");

    assert!(matches!(model.trend, MixedTrendModel::Linear(_)));
    assert!(
      model
        .additional_coefficients
        .iter()
        .all(|value| value.is_finite())
    );
    assert!(model.noise_scale > 0.0);
  }

  #[test]
  fn rejects_component_ranges_with_mixed_column_modes() {
    let result = fit_mixed_map(
      &[0.0, 1.0],
      &[1.0, 2.0],
      MixedTrendInput::Flat,
      &[SeasonalitySpec {
        period_days: 7.0,
        fourier_order: 1,
        prior_scale: 10.0,
      }],
      SeasonalityMaskView {
        row_count: 2,
        component_count: 1,
        values: &[1, 1],
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
      &[ComponentMode::Additive, ComponentMode::Multiplicative],
      0.05,
      LinearOptimizerOptions::default(),
      ScalingMode::AbsMax,
    );

    assert_eq!(
      result,
      Err(crate::piecewise_map::PiecewiseMapError::InvalidConfiguration)
    );
  }

  #[test]
  fn flat_stan_fit_matches_the_exact_additive_ridge_fit() {
    let timestamps: Vec<f64> = (0..42).map(|day| f64::from(day) * DAY).collect();
    let values: Vec<f64> = (0..42)
      .map(|day| {
        let angle = std::f64::consts::TAU * f64::from(day) / 7.0;
        20.0 + 3.0 * angle.sin() - 1.5 * (2.0 * angle).cos() + 0.4 * f64::from(day % 5)
      })
      .collect();
    let weekly = [SeasonalitySpec {
      period_days: 7.0,
      fourier_order: 2,
      prior_scale: 10.0,
    }];

    let reduced = crate::flat_map::fit_flat_map_with_scaling(
      &timestamps,
      &values,
      &weekly,
      ScalingMode::AbsMax,
    )
    .expect("reduced flat fit should converge");
    let stan = fit_mixed_map(
      &timestamps,
      &values,
      MixedTrendInput::Flat,
      &weekly,
      SeasonalityMaskView {
        row_count: 42,
        component_count: 1,
        values: &[1; 42],
      },
      FeatureMatrixView {
        row_count: 42,
        column_count: 0,
        values: &[],
      },
      AdditionalFeatureLayoutView {
        prior_scales: &[],
        component_offsets: &[],
        component_counts: &[],
      },
      &[ComponentMode::Additive; 4],
      0.05,
      LinearOptimizerOptions::default(),
      ScalingMode::AbsMax,
    )
    .expect("Stan flat fit should converge");

    let close = |left: f64, right: f64| (left - right).abs() <= 1e-5 * right.abs().max(1.0);

    assert!(close(flat_level(&stan), reduced.level));
    // Stan's Newton stops on a 1e-8 objective change, before sigma fully settles.
    assert!((stan.noise_scale - reduced.noise_scale).abs() <= 1e-4 * reduced.noise_scale);

    for (left, right) in stan.coefficients.iter().zip(&reduced.coefficients) {
      assert!(close(*left, *right), "{left} vs {right}");
    }
  }

  #[test]
  fn flat_stan_fit_separates_a_regressor_collinear_with_the_level() {
    let timestamps: Vec<f64> = (0..8).map(|day| f64::from(day) * DAY).collect();
    let values = [10.0, 13.0, 9.0, 14.0, 11.0, 15.0, 8.0, 16.0];
    let promotion = [0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0];
    let features: Vec<f64> = promotion.iter().flat_map(|value| [*value, 2.0]).collect();

    let model = fit_mixed_map(
      &timestamps,
      &values,
      MixedTrendInput::Flat,
      &[],
      SeasonalityMaskView {
        row_count: 8,
        component_count: 0,
        values: &[],
      },
      FeatureMatrixView {
        row_count: 8,
        column_count: 2,
        values: &features,
      },
      AdditionalFeatureLayoutView {
        prior_scales: &[10.0, 10.0],
        component_offsets: &[0, 1],
        component_counts: &[1, 1],
      },
      &[ComponentMode::Additive, ComponentMode::Additive],
      0.05,
      LinearOptimizerOptions::default(),
      ScalingMode::AbsMax,
    )
    .expect("a constant regressor should not prevent convergence");

    let [promotion_effect, constant] = model.additional_coefficients[..] else {
      panic!("expected two regressor coefficients");
    };
    let mean_off_promotion = (10.0 + 9.0 + 11.0 + 8.0) / 4.0;

    assert!(matches!(model.summary.termination, MapTermination::Stan(_)));
    assert!((promotion_effect - 5.0).abs() < 0.01);
    assert!(constant > 0.0 && flat_level(&model) > 0.0);
    assert!((flat_level(&model) + 2.0 * constant - mean_off_promotion).abs() < 0.01);
  }
}
