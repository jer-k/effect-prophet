//! Posterior sampling for linear and flat Prophet models, like Python's `mcmc_samples`.
//!
//! The density, design and initialization are the MAP fit's. Sampling runs Stan's adaptive
//! NUTS from `stan::nuts`, then keeps each draw in observation units, in Python's order:
//! the first draw of every chain, then the second of every chain, and so on.

use crate::additional_features::{
  AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::map_objective::{StanFlatObjective, StanLinearObjective};
use crate::mixed_map::{
  ComponentMode, MixedFitInput, MixedMapModel, MixedTrendInput, MixedTrendModel, PreparedMixedFit,
  normalized_changepoints, prepare_mixed_fit,
};
use crate::piecewise_map::{PiecewiseMapError, map_objective_error};
use crate::seasonality::SeasonalitySpec;
use crate::stan::linear_optimizer::{StanMapObjective, WarmStart, initial_state};
use crate::stan::mcmc_diagnostics::convergence_diagnostics;
use crate::stan::nuts::{NutsChain, NutsError, NutsSettings, sample_nuts};
use crate::target_scaling::{ScalingMode, TargetScaling};

/// Most chains one fit may run.
pub const MAX_CHAINS: usize = 16;

/// Most warmup iterations per chain.
pub const MAX_WARMUP: usize = 100_000;

/// Most draws kept over every chain.
pub const MAX_DRAWS: usize = 20_000;

/// Most kept values, draws times saved parameters, so a model stays a reasonable size.
pub const MAX_POSTERIOR_CELLS: usize = 2_000_000;

/// Chains, warmup and kept draws per chain, as CmdStan's `chains`, `iter_warmup` and
/// `iter_sampling`, with the seed of the first chain's stream.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub struct McmcSettings {
  pub chains: usize,
  pub warmup: usize,
  pub draws: usize,
  pub seed: u32,
}

impl McmcSettings {
  fn total_draws(self) -> Option<usize> {
    self.chains.checked_mul(self.draws)
  }

  fn is_valid(self) -> bool {
    (1..=MAX_CHAINS).contains(&self.chains)
      && self.draws > 0
      && self.warmup <= MAX_WARMUP
      && self.total_draws().is_some_and(|total| total <= MAX_DRAWS)
  }
}

/// Sampler health over every chain. Undefined convergence values are NaN.
#[derive(Clone, Debug, PartialEq)]
pub struct McmcDiagnostics {
  /// Divergent transitions among the kept draws.
  pub divergences: usize,
  /// Divergent transitions during warmup.
  pub warmup_divergences: usize,
  /// Kept draws whose tree reached the maximum depth.
  pub max_depth_hits: usize,
  /// Mean acceptance statistic over the kept draws.
  pub mean_accept_stat: f64,
  /// Each chain's adapted step size.
  pub step_sizes: Vec<f64>,
  /// Largest of the bulk and tail R-hat over every saved parameter.
  pub max_rhat: f64,
  /// Smallest bulk effective sample size over every saved parameter.
  pub min_ess_bulk: f64,
  /// Smallest tail effective sample size over every saved parameter.
  pub min_ess_tail: f64,
}

/// A posterior fit: the draws, their means as a point model, and sampler health.
#[derive(Clone, Debug, PartialEq)]
pub struct MixedMcmcModel {
  /// Posterior means, laid out as a MAP model so point predictions reuse its equations.
  pub mean: MixedMapModel,

  /// Number of kept draws over every chain.
  pub draw_count: usize,

  /// Row-major draws in observation units. Linear rows are `[intercept, slope, deltas...,
  /// noise, coefficients...]`; flat rows are `[level, noise, coefficients...]`.
  pub draws: Vec<f64>,

  /// Absent for Prophet's constant-target shortcut, which keeps one draw and never samples.
  pub diagnostics: Option<McmcDiagnostics>,
}

/// Why a posterior fit failed.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum McmcError {
  /// Training input or configuration was rejected before sampling.
  Fit(PiecewiseMapError),
  /// The draws would exceed the chain, draw or saved-size limits.
  SamplingLimit,
  /// The sampler stopped.
  Sampler(NutsError),
  /// A draw could not be restored to observation units.
  NonFiniteDraw,
}

impl From<PiecewiseMapError> for McmcError {
  fn from(error: PiecewiseMapError) -> Self {
    Self::Fit(error)
  }
}

/// Number of saved values in one draw.
pub fn draw_width(trend: MixedTrendInput<'_>, feature_count: usize) -> Option<usize> {
  match trend {
    MixedTrendInput::Linear { changepoints } => 3_usize
      .checked_add(changepoints.len())?
      .checked_add(feature_count),
    MixedTrendInput::Flat { .. } => 2_usize.checked_add(feature_count),
  }
}

/// Sample a linear or flat posterior with Prophet's density, initialization and CmdStan's
/// default sampler. A constant target keeps Prophet's single shortcut draw.
#[allow(clippy::too_many_arguments)]
pub fn fit_mixed_mcmc(
  timestamps: &[f64],
  values: &[f64],
  trend_input: MixedTrendInput<'_>,
  seasonalities: &[SeasonalitySpec],
  seasonality_masks: SeasonalityMaskView<'_>,
  additional_features: FeatureMatrixView<'_>,
  additional_layout: AdditionalFeatureLayoutView<'_>,
  column_modes: &[ComponentMode],
  changepoint_prior_scale: f64,
  scaling_mode: ScalingMode,
  settings: McmcSettings,
  warm_start: Option<&WarmStart>,
) -> Result<MixedMcmcModel, McmcError> {
  if !settings.is_valid() {
    return Err(McmcError::SamplingLimit);
  }

  let prepared = prepare_mixed_fit(
    timestamps,
    values,
    trend_input,
    seasonalities,
    seasonality_masks,
    additional_features,
    additional_layout,
    column_modes,
    changepoint_prior_scale,
    scaling_mode,
  )?;

  let feature_count = column_modes.len();
  let width = draw_width(trend_input, feature_count).ok_or(McmcError::SamplingLimit)?;
  let total = settings.total_draws().ok_or(McmcError::SamplingLimit)?;

  if total
    .checked_mul(width)
    .is_none_or(|cells| cells > MAX_POSTERIOR_CELLS)
  {
    return Err(McmcError::SamplingLimit);
  }

  let prepared = match prepared {
    MixedFitInput::Prepared(prepared) => prepared,
    MixedFitInput::Constant(model) => return Ok(constant_draw(model)),
  };

  let nuts = NutsSettings::cmdstan(settings.warmup, settings.draws);
  let layout = DrawLayout {
    trend: trend_input,
    feature_count,
    modes: column_modes,
    scaling: prepared.target_scaling,
  };

  let chains = match trend_input {
    MixedTrendInput::Linear { changepoints } => {
      let points = normalized_changepoints(timestamps, changepoints);
      let objective = StanLinearObjective::new(
        &prepared.design,
        &prepared.target,
        &points,
        &prepared.feature_priors,
        column_modes,
        changepoint_prior_scale,
      )
      .map_err(map_objective_error)?;

      sample(&objective, settings, nuts, warm_start)?
    }
    MixedTrendInput::Flat { changepoints } => {
      let objective = StanFlatObjective::new(
        &prepared.design,
        &prepared.target,
        changepoints.len(),
        &prepared.feature_priors,
        column_modes,
        changepoint_prior_scale,
      )
      .map_err(map_objective_error)?;

      sample(&objective, settings, nuts, warm_start)?
    }
  };

  finish(
    timestamps,
    values.len(),
    seasonalities,
    &prepared,
    &layout,
    &chains,
    settings,
    width,
    nuts.max_depth,
  )
}

fn sample(
  objective: &impl StanMapObjective,
  settings: McmcSettings,
  nuts: NutsSettings,
  warm_start: Option<&WarmStart>,
) -> Result<Vec<SampledChain>, McmcError> {
  let (initial, _) = initial_state(objective, warm_start);
  let sigma_index = objective.sigma_index();

  let chains = sample_nuts(&initial, settings.chains, settings.seed, nuts, |state| {
    objective.evaluate_posterior(state)
  })
  .map_err(McmcError::Sampler)?;

  Ok(
    chains
      .into_iter()
      .map(|chain| SampledChain {
        chain,
        parameter_count: initial.len(),
        sigma_index,
      })
      .collect(),
  )
}

/// One chain's unconstrained draws, with the coordinates needed to read them.
struct SampledChain {
  chain: NutsChain,
  parameter_count: usize,
  sigma_index: usize,
}

/// How unconstrained Stan coordinates map to saved observation-unit values.
struct DrawLayout<'a> {
  trend: MixedTrendInput<'a>,
  feature_count: usize,
  modes: &'a [ComponentMode],
  scaling: TargetScaling,
}

impl DrawLayout<'_> {
  /// Restore one draw as Python does: fold the private zero-time delta into `k` when no
  /// changepoints were requested, and keep `k` and `delta` only for linear growth.
  fn restore(
    &self,
    state: &[f64],
    sigma_index: usize,
    output: &mut Vec<f64>,
  ) -> Result<(), McmcError> {
    let scale = self.scaling.scale;
    let beta_start = sigma_index + 1;
    let sigma = crate::stan::math::exp(state[sigma_index]) * scale;
    let start = output.len();

    match self.trend {
      MixedTrendInput::Linear { changepoints } => {
        let folded = if changepoints.is_empty() {
          state[0] + state[2]
        } else {
          state[0]
        };

        output.push(state[1] * scale);
        output.push(folded * scale);
        output.extend(
          state[2..2 + changepoints.len()]
            .iter()
            .map(|delta| delta * scale),
        );
      }
      MixedTrendInput::Flat { .. } => output.push(state[1] * scale),
    }

    output.push(sigma);
    output.extend(
      state[beta_start..beta_start + self.feature_count]
        .iter()
        .zip(self.modes)
        .map(|(value, mode)| match mode {
          ComponentMode::Additive => value * scale,
          ComponentMode::Multiplicative => *value,
        }),
    );

    if output[start..].iter().any(|value| !value.is_finite()) || sigma <= 0.0 {
      return Err(McmcError::NonFiniteDraw);
    }

    Ok(())
  }
}

#[allow(clippy::too_many_arguments)]
fn finish(
  timestamps: &[f64],
  observation_count: usize,
  seasonalities: &[SeasonalitySpec],
  prepared: &PreparedMixedFit,
  layout: &DrawLayout<'_>,
  chains: &[SampledChain],
  settings: McmcSettings,
  width: usize,
  max_depth: usize,
) -> Result<MixedMcmcModel, McmcError> {
  // Each chain's restored draws, chain-major, for diagnostics.
  let mut per_chain = Vec::with_capacity(chains.len());

  for sampled in chains {
    let mut restored = Vec::with_capacity(settings.draws * width);

    for state in sampled.chain.draws.chunks_exact(sampled.parameter_count) {
      layout.restore(state, sampled.sigma_index, &mut restored)?;
    }

    per_chain.push(restored);
  }

  let draw_count = settings.chains * settings.draws;
  let mut draws = Vec::with_capacity(draw_count * width);

  for draw in 0..settings.draws {
    for chain in &per_chain {
      draws.extend_from_slice(&chain[draw * width..(draw + 1) * width]);
    }
  }

  let diagnostics = diagnose(chains, &per_chain, settings.draws, width, max_depth);
  let mean = column_means(&draws, width);
  let model = mean_model(
    timestamps,
    observation_count,
    seasonalities,
    prepared,
    layout,
    &mean,
  )?;

  Ok(MixedMcmcModel {
    mean: model,
    draw_count,
    draws,
    diagnostics: Some(diagnostics),
  })
}

fn column_means(draws: &[f64], width: usize) -> Vec<f64> {
  let count = draws.len() / width;
  let mut sums: Vec<crate::compensated_sum::CompensatedSum> =
    (0..width).map(|_| Default::default()).collect();

  for row in draws.chunks_exact(width) {
    for (sum, value) in sums.iter_mut().zip(row) {
      sum.add(*value);
    }
  }

  sums
    .into_iter()
    .map(|sum| sum.total() / count as f64)
    .collect()
}

fn diagnose(
  chains: &[SampledChain],
  per_chain: &[Vec<f64>],
  draws: usize,
  width: usize,
  max_depth: usize,
) -> McmcDiagnostics {
  let mut max_rhat = f64::NAN;
  let mut min_ess_bulk = f64::NAN;
  let mut min_ess_tail = f64::NAN;
  let mut columns = vec![vec![0.0; draws]; per_chain.len()];

  for parameter in 0..width {
    for (column, chain) in columns.iter_mut().zip(per_chain) {
      for (draw, value) in column.iter_mut().enumerate() {
        *value = chain[draw * width + parameter];
      }
    }

    let views: Vec<&[f64]> = columns.iter().map(Vec::as_slice).collect();
    let diagnostics = convergence_diagnostics(&views);

    // NaN marks an undefined value, such as a parameter that never moves; it never wins.
    max_rhat = max_rhat.max(diagnostics.rhat_bulk.max(diagnostics.rhat_tail));
    min_ess_bulk = min_ess_bulk.min(diagnostics.ess_bulk);
    min_ess_tail = min_ess_tail.min(diagnostics.ess_tail);
  }

  let kept = chains.iter().map(|sampled| &sampled.chain);
  let accept: Vec<f64> = kept
    .clone()
    .flat_map(|chain| chain.accept_stat.iter().copied())
    .collect();

  McmcDiagnostics {
    divergences: kept
      .clone()
      .map(|chain| {
        chain
          .divergent
          .iter()
          .filter(|&&divergent| divergent)
          .count()
      })
      .sum(),
    warmup_divergences: kept.clone().map(|chain| chain.warmup_divergences).sum(),
    max_depth_hits: kept
      .clone()
      .map(|chain| {
        chain
          .tree_depth
          .iter()
          .filter(|&&depth| depth as usize >= max_depth)
          .count()
      })
      .sum(),
    mean_accept_stat: accept.iter().sum::<f64>() / accept.len().max(1) as f64,
    step_sizes: kept.map(|chain| chain.step_size).collect(),
    max_rhat,
    min_ess_bulk,
    min_ess_tail,
  }
}

/// Lay the posterior means out as a MAP model; Python's point forecasts use the means.
fn mean_model(
  timestamps: &[f64],
  observation_count: usize,
  seasonalities: &[SeasonalitySpec],
  prepared: &PreparedMixedFit,
  layout: &DrawLayout<'_>,
  mean: &[f64],
) -> Result<MixedMapModel, McmcError> {
  let (trend, rest) = match layout.trend {
    MixedTrendInput::Linear { changepoints } => {
      let count = changepoints.len();
      let trend = MixedTrendModel::Linear(crate::piecewise_linear::PiecewiseTrend {
        intercept: mean[0],
        slope: mean[1],
        time_origin: timestamps[0],
        time_scale: timestamps[timestamps.len() - 1] - timestamps[0],
        changepoint_timestamps: changepoints.to_vec(),
        deltas: mean[2..2 + count].to_vec(),
      });

      (trend, &mean[2 + count..])
    }
    MixedTrendInput::Flat { .. } => (MixedTrendModel::Flat { level: mean[0] }, &mean[1..]),
  };

  let noise_scale = rest[0];
  let coefficients = &rest[1..];

  layout
    .scaling
    .restore_trend(mean[0])
    .map_err(|_| McmcError::NonFiniteDraw)?;

  Ok(MixedMapModel {
    target_scaling: layout.scaling,
    trend,
    seasonalities: seasonalities.to_vec(),
    coefficients: coefficients[..prepared.seasonal_count].to_vec(),
    additional_coefficients: coefficients[prepared.seasonal_count..].to_vec(),
    column_modes: layout.modes.to_vec(),
    noise_scale,
    // Posterior fits report their own summary; nothing reads this optimizer placeholder.
    summary: crate::piecewise_map::MapFitSummary {
      value_scale: layout.scaling.scale,
      observation_count,
      iterations: 0,
      objective: 0.0,
      stationarity_residual: 0.0,
      termination: crate::piecewise_map::MapTermination::ConstantTargetShortcut,
    },
  })
}

/// Python keeps the constant-target shortcut's single state as the only draw.
fn constant_draw(model: MixedMapModel) -> MixedMcmcModel {
  let mut draws = Vec::new();

  match &model.trend {
    MixedTrendModel::Linear(trend) => {
      draws.push(trend.intercept);
      draws.push(trend.slope);
      draws.extend_from_slice(&trend.deltas);
    }
    MixedTrendModel::Flat { level } => draws.push(*level),
  }

  draws.push(model.noise_scale);
  draws.extend_from_slice(&model.coefficients);
  draws.extend_from_slice(&model.additional_coefficients);

  MixedMcmcModel {
    mean: model,
    draw_count: 1,
    draws,
    diagnostics: None,
  }
}

#[cfg(test)]
mod tests;
