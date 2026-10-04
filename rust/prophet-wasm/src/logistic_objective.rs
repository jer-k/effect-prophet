//! Parsed logistic MAP state for the existing Stan numerical strategies.
//! The public no-point fold deliberately leaves m unchanged, matching Prophet.

use super::{LogisticParameters, evaluate, initialize_logistic};
use crate::fourier::checked_element_count;
use crate::map_objective::{
  MapObjectiveError, constrained_stationarity_residual, stan_log_density_constant,
};
use crate::mixed_map::ComponentMode;
use crate::stan::linear_optimizer::{
  LinearOptimizationError, LinearOptimizationResult, LinearOptimizationSummary,
  LinearOptimizerOptions, StanMapObjective, optimize_map,
};
use crate::stan::optimizer::{LogDensityEvaluation, StanOptimizerError};

/// Normalized logistic inputs with executable-private coordinates kept inside fitting.
pub struct StanLogisticObjective<'a> {
  target: &'a [f64],
  capacities: &'a [f64],
  times: &'a [f64],
  changepoint_times: Vec<f64>,
  changepoint_count: usize,
  features: &'a [f64],
  priors: &'a [f64],
  modes: &'a [ComponentMode],
  changepoint_prior: f64,
  sigma_index: usize,
  parameter_count: usize,
  initial: (f64, f64),
}

impl<'a> StanLogisticObjective<'a> {
  /// Parse aligned, normalized rows and resolved feature columns. Empty logical
  /// changepoints and features acquire Stan's private dummy coordinates.
  #[allow(clippy::too_many_arguments)]
  pub fn new(
    target: &'a [f64],
    capacities: &'a [f64],
    times: &'a [f64],
    changepoints: &[f64],
    features: &'a [f64],
    priors: &'a [f64],
    modes: &'a [ComponentMode],
    changepoint_prior: f64,
  ) -> Result<Self, MapObjectiveError> {
    let element_count = checked_element_count(target.len(), priors.len())
      .map_err(|_| MapObjectiveError::SizeOverflow)?;
    if target.len() < 2
      || capacities.len() != target.len()
      || times.len() != target.len()
      || features.len() != element_count
      || modes.len() != priors.len()
    {
      return Err(MapObjectiveError::InvalidDimensions);
    }
    if target
      .iter()
      .chain(times)
      .chain(features)
      .any(|value| !value.is_finite())
      || capacities
        .iter()
        .chain(priors)
        .any(|value| !value.is_finite() || *value <= 0.0)
      || times[0] != 0.0
      || times[times.len() - 1] != 1.0
      || times.windows(2).any(|pair| pair[1] < pair[0])
      || changepoints
        .iter()
        .any(|point| !point.is_finite() || *point < 0.0 || *point > 1.0)
      || changepoints.windows(2).any(|pair| pair[1] < pair[0])
      || !changepoint_prior.is_finite()
      || changepoint_prior <= 0.0
    {
      return Err(MapObjectiveError::InvalidInput);
    }
    let internal_points = if changepoints.is_empty() {
      &[0.0][..]
    } else {
      changepoints
    };
    let sigma_index = 2_usize
      .checked_add(internal_points.len())
      .ok_or(MapObjectiveError::SizeOverflow)?;
    let parameter_count = sigma_index
      .checked_add(1)
      .and_then(|count| count.checked_add(priors.len().max(1)))
      .ok_or(MapObjectiveError::SizeOverflow)?;
    let initial = initialize_logistic(target, capacities, times)
      .map_err(|_| MapObjectiveError::NonFiniteResult)?;

    Ok(Self {
      target,
      capacities,
      times,
      changepoint_times: internal_points.to_vec(),
      changepoint_count: changepoints.len(),
      features,
      priors,
      modes,
      changepoint_prior,
      sigma_index,
      parameter_count,
      initial,
    })
  }

  /// Every retained row contributes, including repeated timestamps.
  pub fn observation_count(&self) -> usize {
    self.target.len()
  }
  /// Complete optimizer dimension, including otherwise invisible parameters.
  pub fn parameter_count(&self) -> usize {
    self.parameter_count
  }
  /// Prophet endpoint initialization, zero delta/beta and normalized sigma one.
  pub fn initial_parameters(&self) -> Vec<f64> {
    let mut parameters = vec![0.0; self.parameter_count];
    parameters[0] = self.initial.0;
    parameters[1] = self.initial.1;
    parameters
  }
  /// Constants included in Stan's initial service density, but not subsequent scores.
  pub fn log_density_constant(&self) -> f64 {
    stan_log_density_constant(
      self.target.len(),
      self.changepoint_count,
      self.priors,
      self.changepoint_prior,
    )
  }

  /// Evaluate the actual logistic kernel in unconstrained Stan coordinates,
  /// selecting zero at the Laplace kink without adding a sigma Jacobian.
  pub fn evaluate(&self, parameters: &[f64]) -> Result<LogDensityEvaluation, MapObjectiveError> {
    if parameters.len() != self.parameter_count {
      return Err(MapObjectiveError::InvalidDimensions);
    }
    if parameters.iter().any(|value| !value.is_finite()) {
      return Err(MapObjectiveError::NonFiniteResult);
    }
    let deltas = &parameters[2..self.sigma_index];
    let mut delta_sum = 0.0;
    for delta in deltas {
      delta_sum += delta;
      // Upstream gamma divides by each post-change rate. A stable hinge
      // extension must not turn its singular optimizer trials into successes.
      let next_rate = parameters[0] + delta_sum;
      if !next_rate.is_finite() || next_rate == 0.0 {
        return Err(MapObjectiveError::NonFiniteResult);
      }
    }
    let sigma = crate::stan::math::exp(parameters[self.sigma_index]);
    let variance = sigma * sigma;
    if !variance.is_finite() || variance <= 0.0 {
      return Err(MapObjectiveError::NonFiniteResult);
    }
    let beta_start = self.sigma_index + 1;
    let beta = &parameters[beta_start..beta_start + self.priors.len()];
    let evaluation = evaluate(
      &self.changepoint_times,
      self.target,
      self.capacities,
      self.times,
      parameters[0],
      parameters[1],
      deltas,
      self.features,
      self.priors.len(),
      beta,
      self.modes,
      self.priors,
      self.changepoint_prior,
      sigma,
    )
    .map_err(|_| MapObjectiveError::NonFiniteResult)?;

    let mut gradient = vec![-evaluation.gradient_rate, -evaluation.gradient_offset];
    gradient.extend(evaluation.gradient_deltas.iter().map(|value| -value));
    gradient.push(-evaluation.noise_derivative * sigma);
    gradient.extend(evaluation.feature_gradients.iter().map(|value| -value));
    let mut value = -evaluation.objective;
    if self.priors.is_empty() {
      let dummy_beta = parameters[beta_start];
      value -= 0.5 * dummy_beta * dummy_beta;
      gradient.push(-dummy_beta);
    }
    if !value.is_finite() || gradient.iter().any(|value| !value.is_finite()) {
      return Err(MapObjectiveError::NonFiniteResult);
    }
    Ok(LogDensityEvaluation { value, gradient })
  }

  /// Use shared row-count selection, fresh per-attempt budgets and Newton fallback.
  pub fn fit_stan(
    &self,
    options: LinearOptimizerOptions,
  ) -> Result<LinearOptimizationResult, LinearOptimizationError> {
    optimize_map(self, options)
  }

  /// Diagnose the executable-private state before returning Python's actual
  /// public fold. The adjusted rate does not preserve the private offset curve.
  pub fn fit_model(
    &self,
    options: LinearOptimizerOptions,
  ) -> Result<NormalizedLogisticMapFit, LinearOptimizationError> {
    let fit = self.fit_stan(options)?;
    let noise_scale = crate::stan::math::exp(fit.parameters[self.sigma_index]);
    let stationarity_residual = constrained_stationarity_residual(
      &fit.parameters,
      &fit.evaluation.gradient,
      self.sigma_index,
      noise_scale,
      self.changepoint_prior,
    )
    .map_err(|error| LinearOptimizationError::Optimizer(StanOptimizerError::Objective(error)))?;
    let mut rate = fit.parameters[0];
    let deltas = if self.changepoint_count == 0 {
      rate += fit.parameters[2];
      vec![]
    } else {
      fit.parameters[2..self.sigma_index].to_vec()
    };
    if !rate.is_finite() {
      return Err(LinearOptimizationError::Optimizer(
        StanOptimizerError::NonFiniteResult,
      ));
    }
    Ok(NormalizedLogisticMapFit {
      parameters: LogisticParameters {
        rate,
        offset: fit.parameters[1],
        deltas,
      },
      coefficients: fit.parameters[self.sigma_index + 1..self.sigma_index + 1 + self.priors.len()]
        .to_vec(),
      noise_scale,
      objective: -fit.evaluation.value,
      stationarity_residual,
      optimization: fit.attempts.summary(),
    })
  }
}

impl StanMapObjective for StanLogisticObjective<'_> {
  fn observation_count(&self) -> usize {
    self.observation_count()
  }
  fn parameter_count(&self) -> usize {
    self.parameter_count()
  }
  fn initial_parameters(&self) -> Vec<f64> {
    self.initial_parameters()
  }
  fn log_density_constant(&self) -> f64 {
    self.log_density_constant()
  }
  fn evaluate(&self, parameters: &[f64]) -> Result<LogDensityEvaluation, MapObjectiveError> {
    self.evaluate(parameters)
  }
}

/// Accepted normalized state with pre-fold constrained fitting diagnostics.
#[derive(Clone, Debug, PartialEq)]
pub struct NormalizedLogisticMapFit {
  /// Public rate, unchanged offset and logical-only deltas.
  pub parameters: LogisticParameters,
  /// Normalized coefficients for real feature columns only.
  pub coefficients: Vec<f64>,
  /// Positive normalized observation noise.
  pub noise_scale: f64,
  /// Summed negative density at the private state before folding.
  pub objective: f64,
  /// Constrained normalized KKT residual at that same private state.
  pub stationarity_residual: f64,
  /// Actual algorithm, completion and attempted-work evidence.
  pub optimization: LinearOptimizationSummary,
}
