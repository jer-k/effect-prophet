//! Checked coarse bindings for posterior sampling, simulation and component ranges.

use wasm_bindgen::prelude::wasm_bindgen;

use crate::logistic_mcmc::{LogisticMcmcModel, fit_logistic_mcmc};
use crate::map_uncertainty::{SampleOffsets, SimulationError, SimulationOptions};
use crate::mixed_map::{
  MixedTrendInput, MixedTrendModel, make_combined_features, validate_component_modes,
};
use crate::mixed_mcmc::{McmcDiagnostics, McmcError, McmcSettings, MixedMcmcModel, fit_mixed_mcmc};
use crate::posterior_uncertainty::{
  ComponentColumns, DrawCoefficients, PosteriorDraws, PosteriorRows, PosteriorSimulation,
  PosteriorTrend, posterior_component_intervals, simulate_posterior,
};
use crate::seasonality::SeasonalitySpec;
use crate::stan::nuts::NutsError;
use crate::target_scaling::{LogisticFloorPolicy, LogisticScaling, ScalingMode, TargetScaling};
use crate::wasm::map::PiecewiseMapFitStatus;
use crate::wasm::mixed_map::{
  layout_view, mask_view, matrix_view, parse_changepoints, parse_metadata, parse_modes,
  parse_seasonalities,
};
use crate::wasm::protocol::{
  parse_nonnegative_integer, parse_positive_integer, parse_warm_start, placeholder_priors,
};

/// The draws, chains or saved size pass their limits.
const SAMPLING_LIMIT: f64 = 12.0;

/// The sampler stopped; the next value says why.
const SAMPLER_FAILURE: f64 = 13.0;

/// Values before the step sizes in a successful fit frame.
const FIT_HEADER: usize = 20;

const INVALID_REQUEST: f64 = 1.0;
const INVALID_MODEL: f64 = 2.0;
const RESOURCE_LIMIT: f64 = 3.0;
const NONFINITE_RESULT: f64 = 4.0;

fn fit_status(status: PiecewiseMapFitStatus) -> Vec<f64> {
  vec![f64::from(status as u32)]
}

fn fit_failure(error: McmcError) -> Vec<f64> {
  match error {
    McmcError::Fit(error) => crate::wasm::map::fit_error_frame(error),
    McmcError::SamplingLimit => vec![SAMPLING_LIMIT],
    McmcError::NonFiniteDraw => fit_status(PiecewiseMapFitStatus::NonFiniteResult),
    McmcError::Sampler(error) => vec![
      SAMPLER_FAILURE,
      match error {
        NutsError::InvalidConfiguration => 1.0,
        NutsError::Objective(_) => 2.0,
        NutsError::InitialDensity => 3.0,
        NutsError::ImproperPosterior => 4.0,
        NutsError::StepSizeCollapse => 5.0,
        NutsError::MetricOverflow => 6.0,
      },
    ],
  }
}

/// Sample a mixed linear posterior. See `fit_mixed_mcmc_protocol` for the frame.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn fit_mixed_linear_mcmc(
  timestamps: &[f64],
  values: &[f64],
  scaling_mode: f64,
  changepoint_mode: f64,
  explicit_changepoints: &[f64],
  automatic_count: f64,
  automatic_range: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonal_prior_scales: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_prior_scales: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
  changepoint_prior_scale: f64,
  sampler: &[f64],
  warm_start: &[f64],
) -> Vec<f64> {
  fit_mixed_mcmc_protocol(
    false,
    timestamps,
    values,
    scaling_mode,
    [changepoint_mode, automatic_count, automatic_range],
    explicit_changepoints,
    [periods_days, fourier_orders, seasonal_prior_scales],
    seasonality_masks,
    additional_column_count,
    [
      additional_values,
      additional_prior_scales,
      additional_component_offsets,
      additional_component_counts,
    ],
    column_modes,
    changepoint_prior_scale,
    sampler,
    warm_start,
  )
}

/// Sample a flat posterior. Changepoints size Stan's prior-only deltas, as in the MAP fit.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn fit_mixed_flat_mcmc(
  timestamps: &[f64],
  values: &[f64],
  scaling_mode: f64,
  changepoint_mode: f64,
  explicit_changepoints: &[f64],
  automatic_count: f64,
  automatic_range: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonal_prior_scales: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_prior_scales: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
  changepoint_prior_scale: f64,
  sampler: &[f64],
  warm_start: &[f64],
) -> Vec<f64> {
  fit_mixed_mcmc_protocol(
    true,
    timestamps,
    values,
    scaling_mode,
    [changepoint_mode, automatic_count, automatic_range],
    explicit_changepoints,
    [periods_days, fourier_orders, seasonal_prior_scales],
    seasonality_masks,
    additional_column_count,
    [
      additional_values,
      additional_prior_scales,
      additional_component_offsets,
      additional_component_counts,
    ],
    column_modes,
    changepoint_prior_scale,
    sampler,
    warm_start,
  )
}

/// Parse `[chains, warmup, draws per chain, seed]`.
fn parse_sampler(values: &[f64]) -> Option<McmcSettings> {
  let [chains, warmup, draws, seed] = values else {
    return None;
  };

  Some(McmcSettings {
    chains: parse_positive_integer(*chains)?,
    warmup: parse_nonnegative_integer(*warmup)?,
    draws: parse_positive_integer(*draws)?,
    seed: u32::try_from(parse_nonnegative_integer(*seed)?).ok()?,
  })
}

/// Success frames are `[0, scaling mode, offset, scale, S, D, W, time origin, time scale,
/// observations, termination, divergences, warmup divergences, depth hits, mean acceptance,
/// max R-hat, min bulk ESS, min tail ESS, chains, flat prior-only deltas, step sizes..., changepoints...,
/// means..., draws...]`. Termination 0 sampled and 1 kept the constant-target shortcut, whose
/// diagnostics are NaN and which has no step sizes. Flat fits have zero time bounds.
#[allow(clippy::too_many_arguments)]
fn fit_mixed_mcmc_protocol(
  flat: bool,
  timestamps: &[f64],
  values: &[f64],
  scaling_mode: f64,
  [changepoint_mode, automatic_count, automatic_range]: [f64; 3],
  explicit_changepoints: &[f64],
  [periods_days, fourier_orders, seasonal_prior_scales]: [&[f64]; 3],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  [
    additional_values,
    additional_prior_scales,
    component_offsets,
    component_counts,
  ]: [&[f64]; 4],
  column_modes: &[f64],
  changepoint_prior_scale: f64,
  sampler: &[f64],
  warm_start: &[f64],
) -> Vec<f64> {
  let invalid = || fit_status(PiecewiseMapFitStatus::InvalidConfiguration);

  let Some(scaling) = ScalingMode::from_code(scaling_mode) else {
    return invalid();
  };
  let Some(settings) = parse_sampler(sampler) else {
    return invalid();
  };
  let warm_start = if warm_start.is_empty() {
    None
  } else {
    let Some(parsed) = parse_warm_start(warm_start) else {
      return invalid();
    };
    Some(parsed)
  };
  let Ok(seasonalities) =
    parse_seasonalities(periods_days, fourier_orders, Some(seasonal_prior_scales))
  else {
    return invalid();
  };
  let Ok(changepoints) = parse_changepoints(
    timestamps,
    changepoint_mode,
    explicit_changepoints,
    automatic_count,
    automatic_range,
  ) else {
    return invalid();
  };
  let Some(additional_columns) = parse_nonnegative_integer(additional_column_count) else {
    return invalid();
  };
  let Ok(metadata) = parse_metadata(
    timestamps.len(),
    seasonalities.len(),
    seasonality_masks,
    additional_columns,
    additional_values,
    additional_prior_scales,
    component_offsets,
    component_counts,
  ) else {
    return invalid();
  };
  let Ok(modes) = parse_modes(column_modes) else {
    return invalid();
  };
  let trend = if flat {
    MixedTrendInput::Flat {
      changepoints: &changepoints,
    }
  } else {
    MixedTrendInput::Linear {
      changepoints: &changepoints,
    }
  };

  match fit_mixed_mcmc(
    timestamps,
    values,
    trend,
    &seasonalities,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
    layout_view(additional_prior_scales, &metadata.offsets, &metadata.counts),
    &modes,
    changepoint_prior_scale,
    scaling,
    settings,
    warm_start.as_ref(),
  ) {
    Ok(model) => pack_fit(
      &model,
      values.len(),
      if flat { changepoints.len() } else { 0 },
    ),
    Err(error) => fit_failure(error),
  }
}

/// The fields a fit frame's header and body need, whichever trend was sampled.
struct FitFrame<'a> {
  scaling_mode: f64,
  offset: f64,
  scale: f64,
  changepoints: &'a [f64],
  time_origin: f64,
  time_scale: f64,
  observation_count: usize,
  prior_only: usize,
  diagnostics: Option<&'a McmcDiagnostics>,
  draw_count: usize,
  means: Vec<f64>,
  draws: &'a [f64],
  /// Values appended to the 20-value header, such as a logistic floor policy.
  extra: &'a [f64],
}

fn pack_frame(frame: FitFrame<'_>) -> Vec<f64> {
  let width = frame.draws.len() / frame.draw_count;
  let diagnostics = frame.diagnostics;
  let step_sizes = diagnostics.map_or(&[][..], |value| value.step_sizes.as_slice());
  let count = |value: Option<usize>| value.map_or(0.0, |value| value as f64);
  let real = |value: Option<f64>| value.unwrap_or(f64::NAN);

  let mut packed = Vec::with_capacity(
    FIT_HEADER
      + frame.extra.len()
      + step_sizes.len()
      + frame.changepoints.len()
      + width * (frame.draw_count + 1),
  );

  packed.extend_from_slice(&[
    0.0,
    frame.scaling_mode,
    frame.offset,
    frame.scale,
    frame.changepoints.len() as f64,
    frame.draw_count as f64,
    width as f64,
    frame.time_origin,
    frame.time_scale,
    frame.observation_count as f64,
    if diagnostics.is_some() { 0.0 } else { 1.0 },
    count(diagnostics.map(|value| value.divergences)),
    count(diagnostics.map(|value| value.warmup_divergences)),
    count(diagnostics.map(|value| value.max_depth_hits)),
    real(diagnostics.map(|value| value.mean_accept_stat)),
    real(diagnostics.map(|value| value.max_rhat)),
    real(diagnostics.map(|value| value.min_ess_bulk)),
    real(diagnostics.map(|value| value.min_ess_tail)),
    step_sizes.len() as f64,
    frame.prior_only as f64,
  ]);
  packed.extend_from_slice(frame.extra);
  packed.extend_from_slice(step_sizes);
  packed.extend_from_slice(frame.changepoints);
  packed.extend_from_slice(&frame.means);
  packed.extend_from_slice(frame.draws);
  packed
}

fn pack_fit(model: &MixedMcmcModel, observation_count: usize, prior_only: usize) -> Vec<f64> {
  let mean = &model.mean;
  let (changepoints, time_origin, time_scale, mut means): (&[f64], f64, f64, Vec<f64>) =
    match &mean.trend {
      MixedTrendModel::Linear(trend) => {
        let mut means = vec![trend.intercept, trend.slope];
        means.extend_from_slice(&trend.deltas);
        (
          &trend.changepoint_timestamps,
          trend.time_origin,
          trend.time_scale,
          means,
        )
      }
      MixedTrendModel::Flat { level } => (&[], 0.0, 0.0, vec![*level]),
    };

  means.push(mean.noise_scale);
  means.extend_from_slice(&mean.coefficients);
  means.extend_from_slice(&mean.additional_coefficients);

  pack_frame(FitFrame {
    scaling_mode: mean.target_scaling.mode.code(),
    offset: mean.target_scaling.offset,
    scale: mean.target_scaling.scale,
    changepoints,
    time_origin,
    time_scale,
    observation_count,
    prior_only,
    diagnostics: model.diagnostics.as_ref(),
    draw_count: model.draw_count,
    means,
    draws: &model.draws,
    extra: &[],
  })
}

/// Logistic frames add `[floor policy, implicit floor]` after the header; the offset is zero.
fn pack_logistic_fit(model: &LogisticMcmcModel, observation_count: usize) -> Vec<f64> {
  let mean = &model.mean;
  let (floor_code, implicit_floor) = match mean.scaling.floor_policy {
    LogisticFloorPolicy::Implicit(floor) => (0.0, floor),
    LogisticFloorPolicy::Explicit => (1.0, 0.0),
  };
  let mut means = vec![mean.parameters.rate, mean.parameters.offset];

  means.extend_from_slice(&mean.parameters.deltas);
  means.push(mean.noise_scale);
  means.extend_from_slice(&mean.coefficients);
  means.extend_from_slice(&mean.additional_coefficients);

  pack_frame(FitFrame {
    scaling_mode: mean.scaling.mode.code(),
    offset: 0.0,
    scale: mean.scaling.scale,
    changepoints: &mean.changepoint_timestamps,
    time_origin: mean.time_origin,
    time_scale: mean.time_scale,
    observation_count,
    prior_only: 0,
    diagnostics: Some(&model.diagnostics),
    draw_count: model.draw_count,
    means,
    draws: &model.draws,
    extra: &[floor_code, implicit_floor],
  })
}

/// Sample a floor-aware logistic posterior. Frames are `fit_mixed_linear_mcmc`'s, with
/// `[floor policy, implicit floor]` after the header.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn fit_logistic_mcmc_with_features(
  timestamps: &[f64],
  values: &[f64],
  capacities: &[f64],
  floor_policy: f64,
  explicit_floors: &[f64],
  scaling_mode: f64,
  changepoint_mode: f64,
  explicit_changepoints: &[f64],
  automatic_count: f64,
  automatic_range: f64,
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonal_prior_scales: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_prior_scales: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
  changepoint_prior_scale: f64,
  sampler: &[f64],
  warm_start: &[f64],
) -> Vec<f64> {
  let invalid = || fit_status(PiecewiseMapFitStatus::InvalidConfiguration);

  let Some(scaling) = ScalingMode::from_code(scaling_mode) else {
    return invalid();
  };
  let floors = match floor_policy {
    0.0 if explicit_floors.is_empty() => None,
    1.0 => Some(explicit_floors),
    _ => return invalid(),
  };
  let Some(settings) = parse_sampler(sampler) else {
    return invalid();
  };
  let warm_start = if warm_start.is_empty() {
    None
  } else {
    let Some(parsed) = parse_warm_start(warm_start) else {
      return invalid();
    };
    Some(parsed)
  };
  let Ok(seasonalities) =
    parse_seasonalities(periods_days, fourier_orders, Some(seasonal_prior_scales))
  else {
    return invalid();
  };
  let Ok(changepoints) = parse_changepoints(
    timestamps,
    changepoint_mode,
    explicit_changepoints,
    automatic_count,
    automatic_range,
  ) else {
    return invalid();
  };
  let Some(additional_columns) = parse_nonnegative_integer(additional_column_count) else {
    return invalid();
  };
  let Ok(metadata) = parse_metadata(
    timestamps.len(),
    seasonalities.len(),
    seasonality_masks,
    additional_columns,
    additional_values,
    additional_prior_scales,
    additional_component_offsets,
    additional_component_counts,
  ) else {
    return invalid();
  };
  let Ok(modes) = parse_modes(column_modes) else {
    return invalid();
  };

  match fit_logistic_mcmc(
    timestamps,
    values,
    capacities,
    floors,
    &changepoints,
    &seasonalities,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
    layout_view(additional_prior_scales, &metadata.offsets, &metadata.counts),
    &modes,
    changepoint_prior_scale,
    scaling,
    settings,
    warm_start.as_ref(),
  ) {
    Ok(model) => pack_logistic_fit(&model, values.len()),
    Err(error) => fit_failure(error),
  }
}

/// Prediction rows' combined features and each named component's columns.
struct PredictionFeatures {
  values: Vec<f64>,
  starts: Vec<usize>,
  counts: Vec<usize>,
  modes: Vec<crate::mixed_map::ComponentMode>,
}

#[allow(clippy::too_many_arguments)]
fn prediction_features(
  timestamps: &[f64],
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  component_offsets: &[f64],
  component_counts: &[f64],
  column_modes: &[f64],
) -> Result<PredictionFeatures, f64> {
  let seasonalities: Vec<SeasonalitySpec> =
    parse_seasonalities(periods_days, fourier_orders, None).map_err(|()| INVALID_REQUEST)?;
  let additional_columns =
    parse_nonnegative_integer(additional_column_count).ok_or(INVALID_REQUEST)?;

  if additional_columns > 10_000
    || timestamps
      .len()
      .checked_mul(additional_columns)
      .is_none_or(|cells| cells > 1_000_000)
  {
    return Err(RESOURCE_LIMIT);
  }

  let priors = placeholder_priors(additional_columns).ok_or(RESOURCE_LIMIT)?;
  let metadata = parse_metadata(
    timestamps.len(),
    seasonalities.len(),
    seasonality_masks,
    additional_columns,
    additional_values,
    &priors,
    component_offsets,
    component_counts,
  )
  .map_err(|()| INVALID_REQUEST)?;
  let modes = parse_modes(column_modes).map_err(|()| INVALID_REQUEST)?;
  let fourier =
    crate::mixed_map::parse_seasonalities(&seasonalities).map_err(|_| INVALID_REQUEST)?;
  let layout = layout_view(&priors, &metadata.offsets, &metadata.counts);
  let seasonal_count: usize = seasonalities
    .iter()
    .map(|seasonality| seasonality.fourier_order * 2)
    .sum();

  if modes.len() != seasonal_count + additional_columns
    || validate_component_modes(&seasonalities, layout, &modes, seasonal_count).is_err()
  {
    return Err(INVALID_REQUEST);
  }

  let values = make_combined_features(
    timestamps,
    &fourier,
    mask_view(timestamps.len(), seasonalities.len(), &metadata),
    matrix_view(timestamps.len(), additional_columns, additional_values),
  )
  .map_err(|_| RESOURCE_LIMIT)?;

  let mut starts = Vec::new();
  let mut counts = Vec::new();
  let mut start = 0;

  for seasonality in &seasonalities {
    starts.push(start);
    counts.push(seasonality.fourier_order * 2);
    start += seasonality.fourier_order * 2;
  }

  for (&offset, &count) in metadata.offsets.iter().zip(&metadata.counts) {
    starts.push(seasonal_count + offset);
    counts.push(count);
  }

  Ok(PredictionFeatures {
    values,
    starts,
    counts,
    modes,
  })
}

fn simulation_failure(error: SimulationError) -> Vec<f64> {
  match error {
    SimulationError::InvalidShape | SimulationError::InvalidOptions => vec![INVALID_REQUEST],
    SimulationError::InvalidModel => vec![INVALID_MODEL],
    SimulationError::ResourceLimit => vec![RESOURCE_LIMIT],
    SimulationError::NonFiniteResult { row, sample } => {
      vec![NONFINITE_RESULT, row as f64, sample as f64]
    }
  }
}

/// Simulate a linear or flat posterior's paths in one call.
///
/// Frames match `simulate_map_with_features`, except the sample count in the header is the
/// number of paths actually run: `ceil(samples / draws)` for each draw.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn simulate_mcmc_with_features(
  timestamps: &[f64],
  growth_code: f64,
  scaling_mode: f64,
  target_offset: f64,
  target_scale: f64,
  time_origin: f64,
  time_scale: f64,
  changepoint_timestamps: &[f64],
  draw_count: f64,
  draws: &[f64],
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
  offset_rows: &[f64],
  offset_additive: &[f64],
  offset_multiplicative: &[f64],
  seed: f64,
  sample_count: f64,
  interval_width: f64,
  output_code: f64,
) -> Vec<f64> {
  let Ok(scaling) = TargetScaling::parse(scaling_mode, target_offset, target_scale) else {
    return vec![INVALID_MODEL];
  };
  let trend = match growth_code {
    0.0 => PosteriorTrend::Linear {
      time_origin,
      time_scale,
      changepoints: changepoint_timestamps,
      scaling,
    },
    1.0 if changepoint_timestamps.is_empty() && time_origin == 0.0 && time_scale == 0.0 => {
      PosteriorTrend::Flat { scaling }
    }
    _ => return vec![INVALID_MODEL],
  };

  simulate_protocol(
    timestamps,
    trend,
    draw_count,
    draws,
    [periods_days, fourier_orders, seasonality_masks],
    additional_column_count,
    [
      additional_values,
      additional_component_offsets,
      additional_component_counts,
      column_modes,
    ],
    [offset_rows, offset_additive, offset_multiplicative],
    [seed, sample_count, interval_width, output_code],
  )
}

/// Simulate a floor-aware logistic posterior's paths with each row's capacity and the floor
/// policy, through the same frame as `simulate_mcmc_with_features`.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn simulate_logistic_mcmc_with_features(
  timestamps: &[f64],
  capacities: &[f64],
  explicit_floors: &[f64],
  scaling_mode: f64,
  target_scale: f64,
  floor_policy: f64,
  implicit_floor: f64,
  time_origin: f64,
  time_scale: f64,
  changepoint_timestamps: &[f64],
  draw_count: f64,
  draws: &[f64],
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
  offset_rows: &[f64],
  offset_additive: &[f64],
  offset_multiplicative: &[f64],
  seed: f64,
  sample_count: f64,
  interval_width: f64,
  output_code: f64,
) -> Vec<f64> {
  let Ok(scaling) =
    LogisticScaling::parse(scaling_mode, target_scale, floor_policy, implicit_floor)
  else {
    return vec![INVALID_MODEL];
  };
  let floors = match scaling.floor_policy {
    LogisticFloorPolicy::Implicit(_) if explicit_floors.is_empty() => None,
    LogisticFloorPolicy::Explicit => Some(explicit_floors),
    _ => return vec![INVALID_REQUEST],
  };

  simulate_protocol(
    timestamps,
    PosteriorTrend::Logistic {
      time_origin,
      time_scale,
      changepoints: changepoint_timestamps,
      scaling,
      capacities,
      floors,
    },
    draw_count,
    draws,
    [periods_days, fourier_orders, seasonality_masks],
    additional_column_count,
    [
      additional_values,
      additional_component_offsets,
      additional_component_counts,
      column_modes,
    ],
    [offset_rows, offset_additive, offset_multiplicative],
    [seed, sample_count, interval_width, output_code],
  )
}

#[allow(clippy::too_many_arguments)]
fn simulate_protocol(
  timestamps: &[f64],
  trend: PosteriorTrend<'_>,
  draw_count: f64,
  draws: &[f64],
  [periods_days, fourier_orders, seasonality_masks]: [&[f64]; 3],
  additional_column_count: f64,
  [
    additional_values,
    component_offsets,
    component_counts,
    column_modes,
  ]: [&[f64]; 4],
  [offset_rows, offset_additive, offset_multiplicative]: [&[f64]; 3],
  [seed, sample_count, interval_width, output_code]: [f64; 4],
) -> Vec<f64> {
  let Some(seed) = parse_nonnegative_integer(seed).and_then(|value| u32::try_from(value).ok())
  else {
    return vec![INVALID_REQUEST];
  };
  let Some(samples) = parse_positive_integer(sample_count) else {
    return vec![INVALID_REQUEST];
  };
  let Some(count) = parse_positive_integer(draw_count) else {
    return vec![INVALID_REQUEST];
  };
  if !matches!(output_code, 0.0 | 1.0) {
    return vec![INVALID_REQUEST];
  }
  let Some(offset_rows) = offset_rows
    .iter()
    .map(|&row| parse_nonnegative_integer(row))
    .collect::<Option<Vec<_>>>()
  else {
    return vec![INVALID_REQUEST];
  };
  let features = match prediction_features(
    timestamps,
    periods_days,
    fourier_orders,
    seasonality_masks,
    additional_column_count,
    additional_values,
    component_offsets,
    component_counts,
    column_modes,
  ) {
    Ok(features) => features,
    Err(status) => return vec![status],
  };
  let posterior = PosteriorDraws {
    trend,
    count,
    values: draws,
    modes: &features.modes,
  };
  let offsets = if offset_rows.is_empty() && offset_additive.is_empty() {
    None
  } else {
    Some(SampleOffsets {
      rows: &offset_rows,
      additive: offset_additive,
      multiplicative: offset_multiplicative,
    })
  };

  let result = simulate_posterior(
    posterior,
    PosteriorRows {
      timestamps,
      features: &features.values,
      offsets,
    },
    SimulationOptions {
      seed,
      samples,
      interval_width,
    },
    output_code == 1.0,
  );

  match result {
    Ok(PosteriorSimulation::Intervals(intervals)) => {
      let total = crate::posterior_uncertainty::samples_per_draw(samples, count) * count;
      let mut frame = vec![0.0, 0.0, timestamps.len() as f64, total as f64];
      frame.extend(intervals.values);
      frame
    }
    Ok(PosteriorSimulation::Samples(draws)) => {
      let mut frame = vec![0.0, 1.0, timestamps.len() as f64, draws.samples as f64];
      frame.extend(draws.trend);
      frame.extend(draws.value);
      frame
    }
    Err(error) => simulation_failure(error),
  }
}

/// Each row's posterior ranges for the additive total, multiplicative total and every named
/// component: `[0, rows, series, lower, upper, ...]`, or a simulation failure frame. Each draw
/// holds `trend_width` trend values, the noise, then the coefficients.
#[must_use]
#[wasm_bindgen]
#[allow(clippy::too_many_arguments)]
pub fn posterior_component_ranges(
  timestamps: &[f64],
  trend_width: f64,
  draw_count: f64,
  draws: &[f64],
  periods_days: &[f64],
  fourier_orders: &[f64],
  seasonality_masks: &[f64],
  additional_column_count: f64,
  additional_values: &[f64],
  additional_component_offsets: &[f64],
  additional_component_counts: &[f64],
  column_modes: &[f64],
  interval_width: f64,
) -> Vec<f64> {
  let (Some(trend_width), Some(count)) = (
    parse_positive_integer(trend_width),
    parse_positive_integer(draw_count),
  ) else {
    return vec![INVALID_REQUEST];
  };
  let features = match prediction_features(
    timestamps,
    periods_days,
    fourier_orders,
    seasonality_masks,
    additional_column_count,
    additional_values,
    additional_component_offsets,
    additional_component_counts,
    column_modes,
  ) {
    Ok(features) => features,
    Err(status) => return vec![status],
  };

  match posterior_component_intervals(
    DrawCoefficients {
      count,
      values: draws,
      trend_width,
      modes: &features.modes,
    },
    timestamps,
    &features.values,
    ComponentColumns {
      starts: &features.starts,
      counts: &features.counts,
    },
    interval_width,
  ) {
    Ok(values) => {
      let series = features.starts.len() + 2;
      let mut frame = vec![0.0, timestamps.len() as f64, series as f64];
      frame.extend(values);
      frame
    }
    Err(error) => simulation_failure(error),
  }
}
