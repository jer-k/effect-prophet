//! Posterior sampling for floor-aware logistic Prophet models, like Python's `mcmc_samples`.
//!
//! Draws keep the dimensionless rate, offset and rate changes, then the noise and feature
//! coefficients in observation units, as `mixed_mcmc` does for linear growth.

use crate::additional_features::{
  AdditionalFeatureLayoutView, FeatureMatrixView, SeasonalityMaskView,
};
use crate::logistic_map::{LogisticMapModel, LogisticParameters, prepare_logistic_fit};
use crate::mixed_map::ComponentMode;
use crate::mixed_mcmc::{
  McmcDiagnostics, McmcError, McmcSettings, check_posterior_size, restore_features,
  sample_posterior,
};
use crate::piecewise_map::{MapFitSummary, MapTermination};
use crate::seasonality::SeasonalitySpec;
use crate::stan::linear_optimizer::WarmStart;
use crate::target_scaling::ScalingMode;

/// A logistic posterior: its draws, their means as a point model, and sampler health.
#[derive(Clone, Debug, PartialEq)]
pub struct LogisticMcmcModel {
  /// Posterior means, laid out as a MAP model so point predictions reuse its equations.
  pub mean: LogisticMapModel,

  /// Number of kept draws over every chain.
  pub draw_count: usize,

  /// Row-major draws: `[rate, offset, deltas..., noise, coefficients...]`.
  pub draws: Vec<f64>,

  pub diagnostics: McmcDiagnostics,
}

/// Sample a floor-aware logistic posterior with Prophet's density and initialization.
///
/// Python never takes the constant-target shortcut for logistic growth, so neither does this.
#[allow(clippy::too_many_arguments)]
pub fn fit_logistic_mcmc(
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
  scaling_mode: ScalingMode,
  settings: McmcSettings,
  warm_start: Option<&WarmStart>,
) -> Result<LogisticMcmcModel, McmcError> {
  let changepoint_count = changepoints.len();
  let width = 3_usize
    .checked_add(changepoint_count)
    .and_then(|width| width.checked_add(column_modes.len()))
    .ok_or(McmcError::SamplingLimit)?;

  check_posterior_size(settings, width)?;

  let prepared = prepare_logistic_fit(
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
    scaling_mode,
  )?;
  let objective = prepared.objective(column_modes, changepoint_prior_scale)?;
  let scale = prepared.scaling.scale;

  // Python folds the private zero-time delta into the rate and leaves the offset unchanged.
  let restore = |state: &[f64], sigma_index: usize, output: &mut Vec<f64>| {
    let start = output.len();
    let rate = if changepoint_count == 0 {
      state[0] + state[2]
    } else {
      state[0]
    };

    output.push(rate);
    output.push(state[1]);
    output.extend_from_slice(&state[2..2 + changepoint_count]);
    restore_features(state, sigma_index, column_modes, scale, output)?;

    if output[start..].iter().any(|value| !value.is_finite()) {
      return Err(McmcError::NonFiniteDraw);
    }

    Ok(())
  };

  let posterior = sample_posterior(&objective, settings, warm_start, width, restore)?;
  let means = &posterior.means;
  let coefficients = &means[3 + changepoint_count..];

  let mean = LogisticMapModel {
    scaling: prepared.scaling,
    parameters: LogisticParameters {
      rate: means[0],
      offset: means[1],
      deltas: means[2..2 + changepoint_count].to_vec(),
    },
    time_origin: timestamps[0],
    time_scale: timestamps[timestamps.len() - 1] - timestamps[0],
    changepoint_timestamps: changepoints.to_vec(),
    seasonalities: seasonalities.to_vec(),
    coefficients: coefficients[..prepared.seasonal_count].to_vec(),
    additional_coefficients: coefficients[prepared.seasonal_count..].to_vec(),
    column_modes: column_modes.to_vec(),
    noise_scale: means[2 + changepoint_count],
    // Posterior fits report their own summary; nothing reads this optimizer placeholder.
    summary: MapFitSummary {
      value_scale: scale,
      observation_count: values.len(),
      iterations: 0,
      objective: 0.0,
      stationarity_residual: 0.0,
      termination: MapTermination::ConstantTargetShortcut,
    },
  };

  Ok(LogisticMcmcModel {
    mean,
    draw_count: posterior.draw_count,
    draws: posterior.draws,
    diagnostics: posterior.diagnostics,
  })
}

#[cfg(test)]
mod tests;
