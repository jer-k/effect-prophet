use crate::additional_features::{
  AdditionalFeatureError, AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
  evaluate_additional_components, unconditional_masks,
};
use crate::fourier::{
  FourierError, FourierSeasonality, apply_seasonality_masks, checked_element_count,
  coefficient_count, evaluate_seasonal_components, make_fourier_features,
};
use crate::map_objective::{MapObjectiveError, evaluate_map_objective};
use crate::piecewise_linear::{PiecewiseTrend, PiecewiseTrendError};
use crate::seasonality::SeasonalitySpec;
use crate::target_scaling::{
  ScalingMode, TargetScaling, TargetScalingError, resolve_target_scaling,
};

const TREND_PRIOR_SCALE: f64 = 5.0;
const NOISE_PRIOR_SCALE: f64 = 0.5;
const CONSTANT_TARGET_NOISE_SCALE: f64 = 1e-9;
const COLLAPSE_TOLERANCE: f64 = 1e-24;

/// Deterministic controls for linear piecewise MAP fitting.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct MapControls {
  /// Maximum complete coefficient/noise updates.
  pub max_iterations: usize,

  /// Scale-relative stopping tolerance.
  pub relative_tolerance: f64,

  /// Absolute stopping tolerance.
  pub absolute_tolerance: f64,
}

/// Successful linear MAP termination category.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum MapTermination {
  /// Alternating proximal coordinate and noise updates converged.
  Converged,

  /// Prophet's exact-constant-history shortcut was used.
  ConstantTargetShortcut,
}

/// Finite diagnostics for a successful linear piecewise MAP fit.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct MapFitSummary {
  /// Positive train-derived target scale.
  pub value_scale: f64,

  /// Number of fitted rows.
  pub observation_count: usize,

  /// Number of complete optimizer updates.
  pub iterations: usize,

  /// Final normalized summed negative log posterior.
  pub objective: f64,

  /// Maximum complete KKT residual in normalized coordinates.
  pub stationarity_residual: f64,

  /// Successful termination category.
  pub termination: MapTermination,
}

/// Complete output-unit state of a fitted linear piecewise MAP model.
#[derive(Clone, Debug, PartialEq)]
pub struct PiecewiseMapModel {
  /// Train-derived target scaling used by the fitted objective.
  pub target_scaling: TargetScaling,

  /// Continuous output-unit trend state relative to the stored target offset.
  pub trend: PiecewiseTrend,

  /// Ordered additive seasonal definitions.
  pub seasonalities: Vec<SeasonalitySpec>,

  /// Ordered output-unit Fourier coefficients.
  pub coefficients: Vec<f64>,

  /// Ordered output-unit additional-feature coefficients.
  pub additional_coefficients: Vec<f64>,

  /// Positive fitted observation noise in output units.
  pub noise_scale: f64,

  /// Successful fit diagnostics.
  pub summary: MapFitSummary,
}

/// Row-major `[trend, additive, value, component_0, ...]` predictions.
#[derive(Clone, Debug, PartialEq)]
pub struct PiecewiseMapPredictionBatch {
  values: Vec<f64>,
}

impl PiecewiseMapPredictionBatch {
  /// Borrow checked row-major prediction values.
  #[must_use]
  pub fn values(&self) -> &[f64] {
    &self.values
  }
}

/// Expected failures from linear piecewise MAP fitting.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum PiecewiseMapError {
  /// At least two observations are required.
  InsufficientObservations,
  /// Input arrays that must align have different lengths.
  LengthMismatch,
  /// A training row or timestamp order is invalid.
  InvalidObservation,
  /// A changepoint, seasonality, prior, or optimizer control is invalid.
  InvalidConfiguration,
  /// The training timestamp range is zero or unrepresentable.
  ZeroTimeRange,
  /// Dense dimensions overflow or exceed the memory policy.
  SizeOverflow,
  /// Finite input produced a non-finite numerical result.
  NonFiniteResult,
  /// Finite targets produced an unrepresentable scaling domain.
  NonRepresentableScaling,
  /// The posterior has no reliable finite interior noise optimum.
  NoiseCollapse,
  /// The deterministic optimizer budget was exhausted.
  NonConvergence,
}

/// Expected failures from linear piecewise prediction.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum PiecewiseMapPredictionError {
  /// Stored trend, noise, coefficient, or layout state is invalid.
  InvalidModel,
  /// A seasonal definition is invalid.
  InvalidConfiguration,
  /// A prediction timestamp is invalid.
  InvalidTimestamp { row: usize },
  /// Dense dimensions overflow or exceed the memory policy.
  SizeOverflow,
  /// Evaluation produced a non-finite result.
  NonFiniteResult { row: usize },
}

/// Resolve Prophet-compatible automatic changepoint candidates from ordered history.
pub fn resolve_automatic_changepoints(
  timestamps: &[f64],
  requested_count: usize,
  range: f64,
) -> Result<Vec<f64>, PiecewiseMapError> {
  if !range.is_finite() || range <= 0.0 || range > 1.0 {
    return Err(PiecewiseMapError::InvalidConfiguration);
  }

  validate_ordered_timestamps(timestamps)?;

  let eligible_count = ((timestamps.len() as f64) * range).floor() as usize;
  let selected_count = requested_count.min(eligible_count.saturating_sub(1));

  if selected_count == 0 {
    return Ok(vec![]);
  }

  let mut selected = Vec::with_capacity(selected_count);
  let last_eligible_index = eligible_count - 1;

  for grid_index in 1..=selected_count {
    let position = grid_index as f64 * last_eligible_index as f64 / selected_count as f64;
    let index = position.round_ties_even() as usize;
    let timestamp = timestamps
      .get(index)
      .copied()
      .ok_or(PiecewiseMapError::InvalidConfiguration)?;

    selected.push(timestamp);
  }

  Ok(selected)
}

/// Fit the legacy unconditional seasonal piecewise MAP objective.
#[allow(clippy::too_many_arguments)]
pub fn fit_piecewise_map(
  timestamps: &[f64],
  values: &[f64],
  changepoint_timestamps: &[f64],
  seasonalities: &[SeasonalitySpec],
  changepoint_prior_scale: f64,
  controls: MapControls,
) -> Result<PiecewiseMapModel, PiecewiseMapError> {
  fit_piecewise_map_with_scaling(
    timestamps,
    values,
    changepoint_timestamps,
    seasonalities,
    changepoint_prior_scale,
    controls,
    ScalingMode::AbsMax,
  )
}

/// Fit an unconditional seasonal piecewise MAP model with explicit target scaling.
#[allow(clippy::too_many_arguments)]
pub fn fit_piecewise_map_with_scaling(
  timestamps: &[f64],
  values: &[f64],
  changepoint_timestamps: &[f64],
  seasonalities: &[SeasonalitySpec],
  changepoint_prior_scale: f64,
  controls: MapControls,
  scaling_mode: ScalingMode,
) -> Result<PiecewiseMapModel, PiecewiseMapError> {
  let masks =
    unconditional_masks(timestamps.len(), seasonalities.len()).map_err(map_additional_fit_error)?;

  fit_piecewise_map_with_features_and_scaling(
    timestamps,
    values,
    changepoint_timestamps,
    seasonalities,
    SeasonalityMaskView {
      row_count: timestamps.len(),
      component_count: seasonalities.len(),
      values: &masks,
    },
    FeatureMatrixView {
      row_count: timestamps.len(),
      column_count: 0,
      values: &[],
    },
    AdditionalFeatureLayoutView {
      prior_scales: &[],
      component_offsets: &[],
      component_counts: &[],
    },
    changepoint_prior_scale,
    controls,
    scaling_mode,
  )
}

/// Fit trend, changepoints, masked seasonalities, known features, and noise jointly.
#[allow(clippy::too_many_arguments)]
pub fn fit_piecewise_map_with_features(
  timestamps: &[f64],
  values: &[f64],
  changepoint_timestamps: &[f64],
  seasonalities: &[SeasonalitySpec],
  seasonality_masks: SeasonalityMaskView<'_>,
  additional_features: FeatureMatrixView<'_>,
  additional_layout: AdditionalFeatureLayoutView<'_>,
  changepoint_prior_scale: f64,
  controls: MapControls,
) -> Result<PiecewiseMapModel, PiecewiseMapError> {
  fit_piecewise_map_with_features_and_scaling(
    timestamps,
    values,
    changepoint_timestamps,
    seasonalities,
    seasonality_masks,
    additional_features,
    additional_layout,
    changepoint_prior_scale,
    controls,
    ScalingMode::AbsMax,
  )
}

/// Fit grouped additive piecewise MAP state with explicit target scaling.
#[allow(clippy::too_many_arguments)]
pub fn fit_piecewise_map_with_features_and_scaling(
  timestamps: &[f64],
  values: &[f64],
  changepoint_timestamps: &[f64],
  seasonalities: &[SeasonalitySpec],
  seasonality_masks: SeasonalityMaskView<'_>,
  additional_features: FeatureMatrixView<'_>,
  additional_layout: AdditionalFeatureLayoutView<'_>,
  changepoint_prior_scale: f64,
  controls: MapControls,
  scaling_mode: ScalingMode,
) -> Result<PiecewiseMapModel, PiecewiseMapError> {
  if timestamps.len() != values.len() {
    return Err(PiecewiseMapError::LengthMismatch);
  }

  if timestamps.len() < 2 {
    return Err(PiecewiseMapError::InsufficientObservations);
  }

  validate_ordered_timestamps(timestamps)?;

  if values.iter().any(|value| !value.is_finite()) {
    return Err(PiecewiseMapError::InvalidObservation);
  }

  if !changepoint_prior_scale.is_finite()
    || changepoint_prior_scale <= 0.0
    || controls.max_iterations == 0
    || !controls.relative_tolerance.is_finite()
    || controls.relative_tolerance <= 0.0
    || !controls.absolute_tolerance.is_finite()
    || controls.absolute_tolerance <= 0.0
  {
    return Err(PiecewiseMapError::InvalidConfiguration);
  }

  let time_origin = timestamps[0];
  let time_end = timestamps[timestamps.len() - 1];
  let time_scale = time_end - time_origin;

  if !time_scale.is_finite() || time_scale <= 0.0 {
    return Err(PiecewiseMapError::ZeroTimeRange);
  }

  validate_changepoints(changepoint_timestamps, time_origin, time_end)?;

  seasonality_masks
    .validate(timestamps.len(), seasonalities.len())
    .map_err(map_additional_fit_error)?;
  additional_features
    .validate(timestamps.len())
    .map_err(map_additional_fit_error)?;
  additional_layout
    .validate(additional_features.column_count)
    .map_err(map_additional_fit_error)?;

  let fourier_seasonalities = parse_seasonalities(seasonalities)?;
  let seasonal_count = coefficient_count(&fourier_seasonalities).map_err(map_fourier_fit_error)?;
  let feature_count = seasonal_count
    .checked_add(additional_features.column_count)
    .ok_or(PiecewiseMapError::SizeOverflow)?;
  let column_count = 2_usize
    .checked_add(changepoint_timestamps.len())
    .and_then(|count| count.checked_add(feature_count))
    .ok_or(PiecewiseMapError::SizeOverflow)?;
  let design_count =
    checked_element_count(values.len(), column_count).map_err(map_fourier_fit_error)?;
  let mut features =
    make_fourier_features(timestamps, &fourier_seasonalities).map_err(map_fourier_fit_error)?;
  apply_seasonality_masks(
    &mut features,
    &fourier_seasonalities,
    seasonality_masks.values,
  )
  .map_err(map_fourier_fit_error)?;
  let mut design = vec![0.0; design_count];
  let mut target = vec![0.0; values.len()];
  let target_scaling =
    resolve_target_scaling(values, scaling_mode).map_err(map_target_scaling_error)?;
  let value_scale = target_scaling.scale;

  for row in 0..values.len() {
    let scaled_time = (timestamps[row] - time_origin) / time_scale;
    let row_offset = row * column_count;

    design[row_offset] = 1.0;
    design[row_offset + 1] = scaled_time;

    for (changepoint, &timestamp) in changepoint_timestamps.iter().enumerate() {
      let scaled_changepoint = (timestamp - time_origin) / time_scale;
      design[row_offset + 2 + changepoint] = (scaled_time - scaled_changepoint).max(0.0);
    }

    let feature_offset = row * seasonal_count;
    let seasonal_offset = row_offset + 2 + changepoint_timestamps.len();

    design[seasonal_offset..(seasonal_offset + seasonal_count)]
      .copy_from_slice(&features.values()[feature_offset..(feature_offset + seasonal_count)]);

    let additional_offset = row * additional_features.column_count;
    let additional_start = seasonal_offset + seasonal_count;
    design[additional_start..(additional_start + additional_features.column_count)]
      .copy_from_slice(
        &additional_features.values
          [additional_offset..(additional_offset + additional_features.column_count)],
      );
    target[row] = target_scaling
      .scale_value(values[row])
      .map_err(map_target_scaling_error)?;
  }

  if design.iter().chain(&target).any(|value| !value.is_finite()) {
    return Err(PiecewiseMapError::NonFiniteResult);
  }

  let mut feature_prior_scales = expand_seasonal_priors(seasonalities, seasonal_count)?;
  feature_prior_scales.extend_from_slice(additional_layout.prior_scales);
  let first_value = values[0];

  if values.iter().all(|value| *value == first_value) {
    let scaled_intercept = target_scaling
      .scale_value(first_value)
      .map_err(map_target_scaling_error)?;
    let objective = values.len() as f64 * CONSTANT_TARGET_NOISE_SCALE.ln()
      + scaled_intercept * scaled_intercept / (2.0 * TREND_PRIOR_SCALE * TREND_PRIOR_SCALE)
      + CONSTANT_TARGET_NOISE_SCALE * CONSTANT_TARGET_NOISE_SCALE
        / (2.0 * NOISE_PRIOR_SCALE * NOISE_PRIOR_SCALE);

    return Ok(PiecewiseMapModel {
      target_scaling,
      trend: PiecewiseTrend {
        intercept: scaled_intercept * value_scale,
        slope: 0.0,
        time_origin,
        time_scale,
        changepoint_timestamps: changepoint_timestamps.to_vec(),
        deltas: vec![0.0; changepoint_timestamps.len()],
      },
      seasonalities: seasonalities.to_vec(),
      coefficients: vec![0.0; seasonal_count],
      additional_coefficients: vec![0.0; additional_features.column_count],
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

  let mut coefficients = vec![0.0; column_count];
  coefficients[0] = target[0];
  coefficients[1] = target[target.len() - 1] - target[0];
  let mut residuals = fitted_residuals(&design, &target, &coefficients, column_count)?;
  let mut noise_scale = NOISE_PRIOR_SCALE;
  let target_magnitude = target.iter().map(|value| value * value).sum::<f64>();

  for iteration in 1..=controls.max_iterations {
    let mut maximum_change = 0.0_f64;
    let noise_variance = noise_scale * noise_scale;

    for column in 0..column_count {
      let old = coefficients[column];
      let mut squared_norm = 0.0;
      let mut partial_dot = 0.0;

      for row in 0..values.len() {
        let feature = design[row * column_count + column];
        squared_norm += feature * feature;
        partial_dot += feature * (-residuals[row] + feature * old);
      }

      let next = if column < 2 {
        partial_dot / (squared_norm + noise_variance / (TREND_PRIOR_SCALE * TREND_PRIOR_SCALE))
      } else if column < 2 + changepoint_timestamps.len() {
        if squared_norm == 0.0 {
          0.0
        } else {
          soft_threshold(partial_dot, noise_variance / changepoint_prior_scale) / squared_norm
        }
      } else {
        let feature = column - 2 - changepoint_timestamps.len();
        let prior = feature_prior_scales[feature];

        partial_dot / (squared_norm + noise_variance / (prior * prior))
      };

      if !next.is_finite() {
        return Err(PiecewiseMapError::NonFiniteResult);
      }

      let change = next - old;

      if change != 0.0 {
        for row in 0..values.len() {
          residuals[row] += design[row * column_count + column] * change;
        }
      }

      coefficients[column] = next;
      maximum_change = maximum_change.max(change.abs());
    }

    let residual_sum_squares = residuals.iter().map(|value| value * value).sum::<f64>();

    if !residual_sum_squares.is_finite()
      || residual_sum_squares <= COLLAPSE_TOLERANCE * target_magnitude.max(1.0)
    {
      return Err(PiecewiseMapError::NoiseCollapse);
    }

    let observation_count = values.len() as f64;
    let discriminant = observation_count * observation_count + 16.0 * residual_sum_squares;
    let noise_variance = 2.0 * residual_sum_squares / (observation_count + discriminant.sqrt());
    let next_noise_scale = noise_variance.sqrt();

    if !next_noise_scale.is_finite() || next_noise_scale <= 0.0 {
      return Err(PiecewiseMapError::NonFiniteResult);
    }

    maximum_change = maximum_change.max((next_noise_scale - noise_scale).abs());
    noise_scale = next_noise_scale;

    let maximum_magnitude = coefficients
      .iter()
      .fold(noise_scale.max(1.0), |maximum, value| {
        maximum.max(value.abs())
      });
    let threshold = controls.absolute_tolerance + controls.relative_tolerance * maximum_magnitude;

    if maximum_change <= threshold {
      let evaluation = evaluate_map_objective(
        values.len(),
        column_count,
        changepoint_timestamps.len(),
        &design,
        &target,
        &coefficients,
        &feature_prior_scales,
        changepoint_prior_scale,
        noise_scale,
      )
      .map_err(map_objective_error)?;
      let output_coefficients: Vec<f64> = coefficients
        .iter()
        .map(|coefficient| coefficient * value_scale)
        .collect();
      let delta_start = 2;
      let seasonal_start = delta_start + changepoint_timestamps.len();
      let additional_start = seasonal_start + seasonal_count;
      let output_noise_scale = noise_scale * value_scale;

      if output_coefficients.iter().any(|value| !value.is_finite())
        || !output_noise_scale.is_finite()
        || output_noise_scale <= 0.0
      {
        return Err(PiecewiseMapError::NonFiniteResult);
      }

      target_scaling
        .restore_trend(output_coefficients[0])
        .map_err(map_target_scaling_error)?;

      return Ok(PiecewiseMapModel {
        target_scaling,
        trend: PiecewiseTrend {
          intercept: output_coefficients[0],
          slope: output_coefficients[1],
          time_origin,
          time_scale,
          changepoint_timestamps: changepoint_timestamps.to_vec(),
          deltas: output_coefficients[delta_start..seasonal_start].to_vec(),
        },
        seasonalities: seasonalities.to_vec(),
        coefficients: output_coefficients[seasonal_start..additional_start].to_vec(),
        additional_coefficients: output_coefficients[additional_start..].to_vec(),
        noise_scale: output_noise_scale,
        summary: MapFitSummary {
          value_scale,
          observation_count: values.len(),
          iterations: iteration,
          objective: evaluation.objective,
          stationarity_residual: evaluation.stationarity_residual,
          termination: MapTermination::Converged,
        },
      });
    }
  }

  Err(PiecewiseMapError::NonConvergence)
}

/// Evaluate the legacy unconditional seasonal piecewise MAP model.
pub fn predict_piecewise_map(
  timestamps: &[f64],
  trend: &PiecewiseTrend,
  noise_scale: f64,
  seasonalities: &[SeasonalitySpec],
  coefficients: &[f64],
) -> Result<PiecewiseMapPredictionBatch, PiecewiseMapPredictionError> {
  let masks = unconditional_masks(timestamps.len(), seasonalities.len())
    .map_err(map_additional_prediction_error)?;

  predict_piecewise_map_with_features(
    timestamps,
    trend,
    noise_scale,
    seasonalities,
    coefficients,
    SeasonalityMaskView {
      row_count: timestamps.len(),
      component_count: seasonalities.len(),
      values: &masks,
    },
    FeatureMatrixView {
      row_count: timestamps.len(),
      column_count: 0,
      values: &[],
    },
    AdditionalFeatureLayoutView {
      prior_scales: &[],
      component_offsets: &[],
      component_counts: &[],
    },
    &[],
  )
}

/// Evaluate grouped masked-seasonal and additional components for piecewise MAP.
#[allow(clippy::too_many_arguments)]
pub fn predict_piecewise_map_with_features(
  timestamps: &[f64],
  trend: &PiecewiseTrend,
  noise_scale: f64,
  seasonalities: &[SeasonalitySpec],
  seasonal_coefficients: &[f64],
  seasonality_masks: SeasonalityMaskView<'_>,
  additional_features: FeatureMatrixView<'_>,
  additional_layout: AdditionalFeatureLayoutView<'_>,
  additional_coefficients: &[f64],
) -> Result<PiecewiseMapPredictionBatch, PiecewiseMapPredictionError> {
  trend.validate().map_err(map_trend_prediction_error)?;

  if !noise_scale.is_finite() || noise_scale <= 0.0 {
    return Err(PiecewiseMapPredictionError::InvalidModel);
  }

  let fourier_seasonalities =
    parse_seasonalities(seasonalities).map_err(map_fit_configuration_to_prediction)?;
  let expected_count =
    coefficient_count(&fourier_seasonalities).map_err(map_fourier_prediction_error)?;

  if seasonal_coefficients.len() != expected_count
    || seasonal_coefficients.iter().any(|value| !value.is_finite())
  {
    return Err(PiecewiseMapPredictionError::InvalidModel);
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

  if additional_coefficients.len() != additional_features.column_count
    || additional_coefficients
      .iter()
      .any(|value| !value.is_finite())
  {
    return Err(PiecewiseMapPredictionError::InvalidModel);
  }

  let component_count = seasonalities
    .len()
    .checked_add(additional_layout.component_offsets.len())
    .ok_or(PiecewiseMapPredictionError::SizeOverflow)?;
  let row_width = component_count
    .checked_add(3)
    .ok_or(PiecewiseMapPredictionError::SizeOverflow)?;
  let output_count =
    checked_element_count(timestamps.len(), row_width).map_err(map_fourier_prediction_error)?;
  let mut features = make_fourier_features(timestamps, &fourier_seasonalities)
    .map_err(map_fourier_prediction_error)?;
  apply_seasonality_masks(
    &mut features,
    &fourier_seasonalities,
    seasonality_masks.values,
  )
  .map_err(map_fourier_prediction_error)?;
  let components =
    evaluate_seasonal_components(&features, &fourier_seasonalities, seasonal_coefficients)
      .map_err(map_fourier_prediction_error)?;
  let additional_components = evaluate_additional_components(
    additional_features,
    additional_layout,
    additional_coefficients,
  )
  .map_err(map_additional_prediction_error)?;
  let mut values = vec![0.0; output_count];

  for (row, &timestamp) in timestamps.iter().enumerate() {
    let trend_value = trend
      .evaluate(timestamp, row)
      .map_err(map_trend_prediction_error)?;
    let seasonal_offset = row * seasonalities.len();
    let seasonal_values =
      &components.values()[seasonal_offset..(seasonal_offset + seasonalities.len())];
    let additional_count = additional_layout.component_offsets.len();
    let additional_offset = row * additional_count;
    let additional_values =
      &additional_components[additional_offset..(additional_offset + additional_count)];
    let additive = seasonal_values.iter().chain(additional_values).sum::<f64>();
    let value = trend_value + additive;

    if !additive.is_finite() || !value.is_finite() {
      return Err(PiecewiseMapPredictionError::NonFiniteResult { row });
    }

    let output_offset = row * row_width;
    values[output_offset] = trend_value;
    values[output_offset + 1] = additive;
    values[output_offset + 2] = value;
    let seasonal_output_end = output_offset + 3 + seasonalities.len();
    values[(output_offset + 3)..seasonal_output_end].copy_from_slice(seasonal_values);
    values[seasonal_output_end..(output_offset + row_width)].copy_from_slice(additional_values);
  }

  Ok(PiecewiseMapPredictionBatch { values })
}

fn validate_ordered_timestamps(timestamps: &[f64]) -> Result<(), PiecewiseMapError> {
  let mut previous = None;

  for &timestamp in timestamps {
    if !timestamp.is_finite()
      || timestamp.fract() != 0.0
      || previous.is_some_and(|value| timestamp <= value)
    {
      return Err(PiecewiseMapError::InvalidObservation);
    }

    previous = Some(timestamp);
  }

  Ok(())
}

fn validate_changepoints(
  changepoints: &[f64],
  start: f64,
  end: f64,
) -> Result<(), PiecewiseMapError> {
  let mut previous = None;

  for &changepoint in changepoints {
    if !changepoint.is_finite()
      || changepoint.fract() != 0.0
      || changepoint < start
      || changepoint > end
      || previous.is_some_and(|value| changepoint <= value)
    {
      return Err(PiecewiseMapError::InvalidConfiguration);
    }

    previous = Some(changepoint);
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

fn expand_seasonal_priors(
  seasonalities: &[SeasonalitySpec],
  coefficient_count: usize,
) -> Result<Vec<f64>, PiecewiseMapError> {
  let mut priors = Vec::with_capacity(coefficient_count);

  for seasonality in seasonalities {
    let count = seasonality
      .fourier_order
      .checked_mul(2)
      .ok_or(PiecewiseMapError::SizeOverflow)?;

    priors.extend(std::iter::repeat_n(seasonality.prior_scale, count));
  }

  Ok(priors)
}

fn fitted_residuals(
  design: &[f64],
  target: &[f64],
  coefficients: &[f64],
  column_count: usize,
) -> Result<Vec<f64>, PiecewiseMapError> {
  let mut residuals = Vec::with_capacity(target.len());

  for (row, &target_value) in target.iter().enumerate() {
    let offset = row * column_count;
    let fitted = coefficients
      .iter()
      .enumerate()
      .map(|(column, coefficient)| design[offset + column] * coefficient)
      .sum::<f64>();
    let residual = fitted - target_value;

    if !residual.is_finite() {
      return Err(PiecewiseMapError::NonFiniteResult);
    }

    residuals.push(residual);
  }

  Ok(residuals)
}

fn soft_threshold(value: f64, threshold: f64) -> f64 {
  value.signum() * (value.abs() - threshold).max(0.0)
}

fn map_additional_fit_error(error: AdditionalFeatureError) -> PiecewiseMapError {
  match error {
    AdditionalFeatureError::SizeOverflow => PiecewiseMapError::SizeOverflow,
    AdditionalFeatureError::InvalidDimensions
    | AdditionalFeatureError::InvalidValue
    | AdditionalFeatureError::InvalidLayout => PiecewiseMapError::InvalidConfiguration,
  }
}

fn map_additional_prediction_error(error: AdditionalFeatureError) -> PiecewiseMapPredictionError {
  match error {
    AdditionalFeatureError::SizeOverflow => PiecewiseMapPredictionError::SizeOverflow,
    AdditionalFeatureError::InvalidDimensions
    | AdditionalFeatureError::InvalidValue
    | AdditionalFeatureError::InvalidLayout => PiecewiseMapPredictionError::InvalidModel,
  }
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

fn map_target_scaling_error(error: TargetScalingError) -> PiecewiseMapError {
  match error {
    TargetScalingError::EmptyValues => PiecewiseMapError::InsufficientObservations,
    TargetScalingError::NonFiniteValue | TargetScalingError::InvalidScaling => {
      PiecewiseMapError::InvalidObservation
    }
    TargetScalingError::NonRepresentable => PiecewiseMapError::NonRepresentableScaling,
  }
}

fn map_objective_error(error: MapObjectiveError) -> PiecewiseMapError {
  match error {
    MapObjectiveError::InvalidDimensions | MapObjectiveError::InvalidInput => {
      PiecewiseMapError::InvalidConfiguration
    }
    MapObjectiveError::NonFiniteResult => PiecewiseMapError::NonFiniteResult,
  }
}

fn map_fit_configuration_to_prediction(error: PiecewiseMapError) -> PiecewiseMapPredictionError {
  match error {
    PiecewiseMapError::InvalidConfiguration => PiecewiseMapPredictionError::InvalidConfiguration,
    PiecewiseMapError::SizeOverflow => PiecewiseMapPredictionError::SizeOverflow,
    _ => PiecewiseMapPredictionError::InvalidModel,
  }
}

fn map_trend_prediction_error(error: PiecewiseTrendError) -> PiecewiseMapPredictionError {
  match error {
    PiecewiseTrendError::InvalidModel => PiecewiseMapPredictionError::InvalidModel,
    PiecewiseTrendError::InvalidTimestamp { row } => {
      PiecewiseMapPredictionError::InvalidTimestamp { row }
    }
    PiecewiseTrendError::NonFiniteResult { row } => {
      PiecewiseMapPredictionError::NonFiniteResult { row }
    }
  }
}

fn map_fourier_prediction_error(error: FourierError) -> PiecewiseMapPredictionError {
  match error {
    FourierError::InvalidTimestamp { row } => PiecewiseMapPredictionError::InvalidTimestamp { row },
    FourierError::InvalidSeasonality { .. } => PiecewiseMapPredictionError::InvalidConfiguration,
    FourierError::InvalidCoefficients => PiecewiseMapPredictionError::InvalidModel,
    FourierError::SizeOverflow | FourierError::SizeLimitExceeded => {
      PiecewiseMapPredictionError::SizeOverflow
    }
    FourierError::NonFiniteResult { row, .. } => {
      PiecewiseMapPredictionError::NonFiniteResult { row }
    }
  }
}

#[cfg(test)]
mod tests {
  use super::{
    MapControls, MapTermination, fit_piecewise_map, fit_piecewise_map_with_features,
    fit_piecewise_map_with_scaling, predict_piecewise_map, resolve_automatic_changepoints,
  };
  use crate::additional_features::{
    AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
  };
  use crate::seasonality::SeasonalitySpec;
  use crate::target_scaling::ScalingMode;

  const CONTROLS: MapControls = MapControls {
    max_iterations: 2_000,
    relative_tolerance: 1e-10,
    absolute_tolerance: 1e-12,
  };

  #[test]
  fn fits_and_predicts_a_noisy_piecewise_series() {
    let timestamps = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
    let values = [1.0, 1.9, 3.1, 3.2, 3.4, 3.5];
    let model = fit_piecewise_map(&timestamps, &values, &[2.0], &[], 0.5, CONTROLS)
      .expect("noisy data should have an interior optimum");

    assert_eq!(model.summary.termination, MapTermination::Converged);
    assert!(model.noise_scale > 0.0);
    assert_eq!(model.trend.deltas.len(), 1);

    let prediction = predict_piecewise_map(
      &[2.0, 6.0],
      &model.trend,
      model.noise_scale,
      &model.seasonalities,
      &model.coefficients,
    )
    .unwrap();

    assert_eq!(prediction.values().len(), 6);
    assert_eq!(prediction.values()[1], 0.0);
    assert_eq!(prediction.values()[2], prediction.values()[0]);
  }

  #[test]
  fn matches_the_pinned_one_break_prophet_fit() {
    let day = 86_400_000.0;
    let origin = 1_577_836_800_000.0;
    let timestamps: Vec<f64> = (0..10).map(|index| origin + index as f64 * day).collect();
    let values = [1.0, 1.8, 2.7, 3.6, 4.5, 4.7, 4.9, 5.2, 5.4, 5.7];
    let model = fit_piecewise_map(
      &timestamps,
      &values,
      &[origin + 4.0 * day],
      &[],
      0.2,
      MapControls {
        max_iterations: 10_000,
        relative_tolerance: 1e-8,
        absolute_tolerance: 1e-10,
      },
    )
    .unwrap();

    assert!((model.trend.intercept - 0.967_310_064).abs() <= 2e-3);
    assert!((model.trend.slope - 7.860_277_2).abs() <= 2e-3);
    assert!((model.trend.deltas[0] - -5.684_705_019).abs() <= 2e-3);
    assert!((model.noise_scale - 0.029_117_944_41).abs() <= 2e-3);
  }

  #[test]
  fn preserves_the_constant_target_shortcut() {
    let model = fit_piecewise_map(&[0.0, 1.0], &[-4.0, -4.0], &[], &[], 0.05, CONTROLS).unwrap();

    assert_eq!(model.trend.intercept, -4.0);
    assert_eq!(
      model.summary.termination,
      MapTermination::ConstantTargetShortcut
    );
    assert_eq!(model.summary.iterations, 0);
  }

  #[test]
  fn resolves_numpy_style_automatic_candidate_indexes() {
    let timestamps = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0];

    assert_eq!(
      resolve_automatic_changepoints(&timestamps, 2, 1.0).unwrap(),
      vec![2.0, 5.0]
    );
    assert_eq!(
      resolve_automatic_changepoints(&timestamps, 25, 0.8).unwrap(),
      vec![1.0, 2.0, 3.0]
    );
  }

  #[test]
  fn fits_known_additive_columns_in_the_map_objective() {
    let timestamps = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
    let values = [1.0, 1.1, 4.0, 1.2, 1.3, 1.4];
    let additional = [0.0, 0.0, 1.0, 0.0, 0.0, 0.0];
    let model = fit_piecewise_map_with_features(
      &timestamps,
      &values,
      &[],
      &[],
      SeasonalityMaskView {
        row_count: timestamps.len(),
        component_count: 0,
        values: &[],
      },
      FeatureMatrixView {
        row_count: timestamps.len(),
        column_count: 1,
        values: &additional,
      },
      AdditionalFeatureLayoutView {
        prior_scales: &[10.0],
        component_offsets: &[0],
        component_counts: &[1],
      },
      0.05,
      CONTROLS,
    )
    .expect("noisy event history should have an interior MAP optimum");

    assert!(model.additional_coefficients[0] > 2.0);
    assert!(model.coefficients.is_empty());
  }

  #[test]
  fn fits_minmax_trend_state_relative_to_a_nonzero_offset() {
    let model = fit_piecewise_map_with_scaling(
      &[0.0, 1.0, 2.0, 3.0, 4.0, 5.0],
      &[20.0, 21.5, 23.0, 23.2, 24.0, 25.0],
      &[2.0],
      &[],
      0.2,
      CONTROLS,
      ScalingMode::MinMax,
    )
    .expect("minmax targets should have an interior optimum");

    assert_eq!(model.target_scaling.mode, ScalingMode::MinMax);
    assert_eq!(model.target_scaling.offset, 20.0);
    assert_eq!(model.target_scaling.scale, 5.0);
    assert!(model.trend.intercept.abs() < 5.0);
  }

  #[test]
  fn fits_additive_seasonality_in_the_same_objective() {
    let day = 86_400_000.0;
    let timestamps = [0.0, day * 0.25, day * 0.5, day * 0.75, day, day * 1.25];
    let values = [1.1, 3.0, 1.0, -1.0, 1.2, 2.9];
    let seasonalities = [SeasonalitySpec {
      period_days: 1.0,
      fourier_order: 1,
      prior_scale: 10.0,
    }];
    let model = fit_piecewise_map(
      &timestamps,
      &values,
      &[day * 0.5],
      &seasonalities,
      0.05,
      CONTROLS,
    )
    .unwrap();

    assert_eq!(model.coefficients.len(), 2);
  }
}
