use crate::fourier::checked_element_count;
use crate::mixed_map::ComponentMode;
use crate::stan::optimizer::{LogDensityEvaluation, NewtonError, NewtonResult, optimize_newton};

const TREND_PRIOR_VARIANCE: f64 = 25.0;
const NOISE_PRIOR_VARIANCE: f64 = 0.25;

/// Checked evaluation of the linear piecewise MAP objective.
#[derive(Clone, Debug, PartialEq)]
pub struct MapObjectiveEvaluation {
  /// Summed negative log posterior up to parameter-independent constants.
  pub objective: f64,

  /// Sum of squared residuals in scaled target coordinates.
  pub residual_sum_squares: f64,

  /// Smooth coefficient derivatives in `[m,k,delta...,beta...]` order.
  pub smooth_gradient: Vec<f64>,

  /// Derivative with respect to positive `sigma`.
  pub noise_derivative: f64,

  /// Maximum complete KKT residual including Laplace subgradients.
  pub stationarity_residual: f64,
}

/// Expected failures from objective evaluation.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum MapObjectiveError {
  /// Matrix, coefficient, or prior dimensions do not align.
  InvalidDimensions,

  /// A scale or finite numerical input is invalid.
  InvalidInput,

  /// Finite inputs produced an unrepresentable result.
  NonFiniteResult,

  /// Dense dimensions overflow or exceed the shared memory policy.
  SizeOverflow,
}

/// Evaluate the approved summed MAP objective and complete stationarity certificate.
#[allow(clippy::too_many_arguments)]
pub fn evaluate_map_objective(
  row_count: usize,
  column_count: usize,
  changepoint_count: usize,
  design: &[f64],
  target: &[f64],
  coefficients: &[f64],
  seasonal_prior_scales: &[f64],
  changepoint_prior_scale: f64,
  noise_scale: f64,
) -> Result<MapObjectiveEvaluation, MapObjectiveError> {
  let seasonal_count = column_count
    .checked_sub(2 + changepoint_count)
    .ok_or(MapObjectiveError::InvalidDimensions)?;

  if row_count < 2
    || target.len() != row_count
    || design.len()
      != row_count
        .checked_mul(column_count)
        .ok_or(MapObjectiveError::InvalidDimensions)?
    || coefficients.len() != column_count
    || seasonal_prior_scales.len() != seasonal_count
    || !changepoint_prior_scale.is_finite()
    || changepoint_prior_scale <= 0.0
    || !noise_scale.is_finite()
    || noise_scale <= 0.0
    || design
      .iter()
      .chain(target)
      .chain(coefficients)
      .any(|value| !value.is_finite())
    || seasonal_prior_scales
      .iter()
      .any(|scale| !scale.is_finite() || *scale <= 0.0)
  {
    return Err(MapObjectiveError::InvalidInput);
  }

  let mut gradient = vec![0.0; column_count];
  let mut residual_sum_squares = 0.0;

  for (row, &target_value) in target.iter().enumerate() {
    let offset = row * column_count;
    let fitted = coefficients
      .iter()
      .enumerate()
      .map(|(column, coefficient)| design[offset + column] * coefficient)
      .sum::<f64>();
    let residual = fitted - target_value;

    residual_sum_squares += residual * residual;

    for column in 0..column_count {
      gradient[column] += design[offset + column] * residual;
    }
  }

  let noise_variance = noise_scale * noise_scale;
  let mut objective = row_count as f64 * noise_scale.ln()
    + residual_sum_squares / (2.0 * noise_variance)
    + noise_variance / (2.0 * NOISE_PRIOR_VARIANCE);

  for value in gradient.iter_mut() {
    *value /= noise_variance;
  }

  for column in 0..2 {
    objective += coefficients[column] * coefficients[column] / (2.0 * TREND_PRIOR_VARIANCE);
    gradient[column] += coefficients[column] / TREND_PRIOR_VARIANCE;
  }

  for delta in coefficients.iter().skip(2).take(changepoint_count) {
    objective += delta.abs() / changepoint_prior_scale;
  }

  for (seasonal, &prior_scale) in seasonal_prior_scales.iter().enumerate() {
    let column = 2 + changepoint_count + seasonal;
    let prior_variance = prior_scale * prior_scale;

    objective += coefficients[column] * coefficients[column] / (2.0 * prior_variance);
    gradient[column] += coefficients[column] / prior_variance;
  }

  let noise_derivative = row_count as f64 / noise_scale
    - residual_sum_squares / (noise_scale * noise_variance)
    + noise_scale / NOISE_PRIOR_VARIANCE;
  let mut stationarity_residual = noise_derivative.abs();

  for (column, &derivative) in gradient.iter().enumerate() {
    let residual = if column >= 2 && column < 2 + changepoint_count {
      let delta = coefficients[column];

      if delta == 0.0 {
        (derivative.abs() - 1.0 / changepoint_prior_scale).max(0.0)
      } else {
        (derivative + delta.signum() / changepoint_prior_scale).abs()
      }
    } else {
      derivative.abs()
    };

    stationarity_residual = stationarity_residual.max(residual);
  }

  if !objective.is_finite()
    || !residual_sum_squares.is_finite()
    || gradient.iter().any(|value| !value.is_finite())
    || !noise_derivative.is_finite()
    || !stationarity_residual.is_finite()
  {
    return Err(MapObjectiveError::NonFiniteResult);
  }

  Ok(MapObjectiveEvaluation {
    objective,
    residual_sum_squares,
    smooth_gradient: gradient,
    noise_derivative,
    stationarity_residual,
  })
}

/// Shared additive/mixed linear density in Stan's unconstrained parameter order.
///
/// Design columns are `[m,k,delta...,beta...]`; optimizer coordinates are
/// `[k,m,delta...,log(sigma),beta...]`. A zero requested changepoint count uses
/// Prophet's internal zero-time delta. An absent feature block uses its private
/// zero-valued beta with prior scale one. Neither is exposed as a public feature.
pub struct StanLinearObjective<'a> {
  design: &'a [f64],
  target: &'a [f64],
  changepoint_count: usize,
  changepoint_times: Vec<f64>,
  feature_priors: &'a [f64],
  modes: &'a [ComponentMode],
  changepoint_prior: f64,
  column_count: usize,
}

impl<'a> StanLinearObjective<'a> {
  /// Parse complete, aligned normalized rows and resolved numerical features.
  pub fn new(
    design: &'a [f64],
    target: &'a [f64],
    changepoint_times: &[f64],
    feature_priors: &'a [f64],
    modes: &'a [ComponentMode],
    changepoint_prior: f64,
  ) -> Result<Self, MapObjectiveError> {
    let changepoint_count = changepoint_times.len();
    let column_count = changepoint_count
      .checked_add(2)
      .and_then(|count| count.checked_add(feature_priors.len()))
      .ok_or(MapObjectiveError::SizeOverflow)?;
    let count = checked_element_count(target.len(), column_count)
      .map_err(|_| MapObjectiveError::SizeOverflow)?;

    if target.len() < 2 || design.len() != count || modes.len() != feature_priors.len() {
      return Err(MapObjectiveError::InvalidDimensions);
    }

    if design.iter().chain(target).any(|value| !value.is_finite())
      || design.chunks_exact(column_count).any(|row| row[0] != 1.0)
      || feature_priors
        .iter()
        .any(|value| !value.is_finite() || *value <= 0.0)
      || changepoint_times
        .iter()
        .any(|time| !time.is_finite() || *time < 0.0 || *time > 1.0)
      || changepoint_times.windows(2).any(|pair| pair[1] < pair[0])
      || !changepoint_prior.is_finite()
      || changepoint_prior <= 0.0
    {
      return Err(MapObjectiveError::InvalidInput);
    }

    Ok(Self {
      design,
      target,
      changepoint_count,
      changepoint_times: changepoint_times.to_vec(),
      feature_priors,
      modes,
      changepoint_prior,
      column_count,
    })
  }

  fn effective_changepoint_count(&self) -> usize {
    self.changepoint_count.max(1)
  }

  fn sigma_index(&self) -> usize {
    2 + self.effective_changepoint_count()
  }

  /// Number of unconstrained coordinates, including private dummy parameters.
  pub fn parameter_count(&self) -> usize {
    self.sigma_index() + 1 + self.feature_priors.len().max(1)
  }

  /// Every retained observation contributes to selection, including tied dates.
  pub fn observation_count(&self) -> usize {
    self.target.len()
  }

  /// Fit with Prophet's parsed selection/override/fallback policy.
  pub fn fit_stan(
    &self,
    options: crate::stan::linear_optimizer::LinearOptimizerOptions,
  ) -> Result<
    crate::stan::linear_optimizer::LinearOptimizationResult,
    crate::stan::linear_optimizer::LinearOptimizationError,
  > {
    crate::stan::linear_optimizer::optimize_linear(self, options)
  }

  /// Prophet's endpoint initialization with normalized sigma equal to one.
  pub fn initial_parameters(&self) -> Vec<f64> {
    let mut parameters = vec![0.0; self.parameter_count()];
    // Python's argmin/argmax retain the first tied endpoint, not stable-last.
    let mut earliest = 0;
    let mut latest = 0;
    for row in 1..self.target.len() {
      let time = self.design[row * self.column_count + 1];
      if time < self.design[earliest * self.column_count + 1] {
        earliest = row;
      }
      if time > self.design[latest * self.column_count + 1] {
        latest = row;
      }
    }
    let start = self.design[earliest * self.column_count + 1];
    let end = self.design[latest * self.column_count + 1];
    parameters[0] = (self.target[latest] - self.target[earliest]) / (end - start);
    parameters[1] = self.target[earliest] - parameters[0] * start;
    parameters
  }

  /// Parameter-independent constants included in Stan's initial service density.
  pub fn log_density_constant(&self) -> f64 {
    let normal_count = self.target.len() + 3 + self.feature_priors.len().max(1);
    -(normal_count as f64) * 0.5 * std::f64::consts::TAU.ln()
      - TREND_PRIOR_VARIANCE.ln()
      - 0.5 * NOISE_PRIOR_VARIANCE.ln()
      - self
        .feature_priors
        .iter()
        .map(|prior| prior.ln())
        .sum::<f64>()
      - self.effective_changepoint_count() as f64 * (2.0 * self.changepoint_prior).ln()
  }

  /// Evaluate the exact density and Stan's zero-at-the-kink Laplace derivative.
  /// The sigma transform changes coordinates but does not add a Jacobian term.
  pub fn evaluate(&self, parameters: &[f64]) -> Result<LogDensityEvaluation, MapObjectiveError> {
    if parameters.len() != self.parameter_count() {
      return Err(MapObjectiveError::InvalidDimensions);
    }

    if parameters.iter().any(|value| !value.is_finite()) {
      return Err(MapObjectiveError::NonFiniteResult);
    }

    let sigma_index = self.sigma_index();
    let beta_start = sigma_index + 1;
    let sigma = crate::stan::math::exp(parameters[sigma_index]);
    let variance = sigma * sigma;

    if !variance.is_finite() || variance <= 0.0 {
      return Err(MapObjectiveError::NonFiniteResult);
    }

    let mut gradient = vec![0.0; parameters.len()];
    let inv_sigma = 1.0 / sigma;
    let mut squared_residuals = vec![0.0; self.target.len()];
    let mut scores = vec![0.0; self.target.len()];
    let mut trend_scores = vec![0.0; self.target.len()];
    let mut trends = vec![0.0; self.target.len()];

    for (row, &target) in self.target.iter().enumerate() {
      let offset = row * self.column_count;
      let time = self.design[offset + 1];
      let mut rate_adjustment = 0.0;
      let mut offset_adjustment = 0.0;
      for delta in 0..self.effective_changepoint_count() {
        let point = self.changepoint_times.get(delta).copied().unwrap_or(0.0);
        if time >= point {
          rate_adjustment += parameters[2 + delta];
          offset_adjustment += -point * parameters[2 + delta];
        }
      }
      let trend = (parameters[0] + rate_adjustment) * time + (parameters[1] + offset_adjustment);

      let mut additive = 0.0;
      let mut factor = 1.0;

      for (column, mode) in self.modes.iter().enumerate() {
        let feature = self.design[offset + 2 + self.changepoint_count + column];
        let contribution = feature * parameters[beta_start + column];

        match mode {
          ComponentMode::Additive => additive += contribution,
          ComponentMode::Multiplicative => factor += contribution,
        }
      }

      // Match normal_id_glm's evaluation order, not an algebraically equivalent
      // direct RSS/variance expression: scale residual first, then scale its
      // derivative. Small rounding changes matter along nonsmooth L-BFGS paths.
      let scaled_residual = (target - additive - trend * factor) * inv_sigma;
      squared_residuals[row] = scaled_residual * scaled_residual;
      let score = inv_sigma * scaled_residual;
      scores[row] = score;
      trend_scores[row] = score * factor;
      trends[row] = trend;
    }

    // Reverse-mode matrix products aggregate each adjoint before multiplying by
    // its changepoint or feature value. Do not distribute the offset product
    // into per-observation hinge derivatives: that changes floating arithmetic.
    let count = self.target.len();
    let scaled_sum_squares = crate::stan::reductions::sum(count, |row| squared_residuals[row]);
    // Transformed parameters are constructed before the priors. On the reverse
    // tape the prior adjoints reach k/m before the trend's scalar broadcasts.
    gradient[0] = -(parameters[0] * 0.2) * 0.2;
    gradient[1] = -(parameters[1] * 0.2) * 0.2;
    for (row, score) in trend_scores.iter().enumerate() {
      gradient[0] += self.design[row * self.column_count + 1] * score;
      gradient[1] += score;
    }
    for delta in 0..self.effective_changepoint_count() {
      let point = self.changepoint_times.get(delta).copied().unwrap_or(0.0);
      let rate_adjoint = crate::stan::reductions::matrix_row_sum(count, |row| {
        let time = self.design[row * self.column_count + 1];
        if time >= point {
          time * trend_scores[row]
        } else {
          0.0
        }
      });
      let offset_adjoint = crate::stan::reductions::matrix_row_sum(count, |row| {
        if self.design[row * self.column_count + 1] >= point {
          trend_scores[row]
        } else {
          0.0
        }
      });
      let coefficient = parameters[2 + delta];
      let sign = if coefficient > 0.0 {
        1.0
      } else if coefficient < 0.0 {
        -1.0
      } else {
        0.0
      };
      gradient[2 + delta] = -sign / self.changepoint_prior;
      gradient[2 + delta] += rate_adjoint;
      gradient[2 + delta] += -point * offset_adjoint;
    }
    for (column, mode) in self.modes.iter().enumerate() {
      gradient[beta_start + column] = crate::stan::reductions::matrix_row_sum(count, |row| {
        let adjoint = match mode {
          ComponentMode::Additive => scores[row],
          ComponentMode::Multiplicative => trends[row] * scores[row],
        };
        self.design[row * self.column_count + 2 + self.changepoint_count + column] * adjoint
      });
    }

    let mut value = 0.0;

    for parameter in parameters.iter().take(2) {
      let standardized = parameter * 0.2;
      value -= 0.5 * standardized * standardized;
    }

    let inverse_delta_prior = 1.0 / self.changepoint_prior;
    value -= crate::stan::reductions::sum(self.effective_changepoint_count(), |index| {
      parameters[2 + index].abs() * inverse_delta_prior
    });
    value -= 0.5 * (sigma * 2.0) * (sigma * 2.0);

    for column in 0..self.feature_priors.len().max(1) {
      let index = beta_start + column;
      let prior = self.feature_priors.get(column).copied().unwrap_or(1.0);
      let inverse = 1.0 / prior;
      let standardized = parameters[index] * inverse;
      gradient[index] -= standardized * inverse;
    }
    value -= 0.5
      * crate::stan::reductions::sum(self.feature_priors.len().max(1), |column| {
        let prior = self.feature_priors.get(column).copied().unwrap_or(1.0);
        let standardized = parameters[beta_start + column] * (1.0 / prior);
        standardized * standardized
      });

    value += -(self.target.len() as f64) * sigma.ln() - 0.5 * scaled_sum_squares;
    gradient[sigma_index] = ((scaled_sum_squares - self.target.len() as f64) * inv_sigma
      - sigma / NOISE_PRIOR_VARIANCE)
      * sigma;

    if !value.is_finite() || gradient.iter().any(|value| !value.is_finite()) {
      return Err(MapObjectiveError::NonFiniteResult);
    }

    Ok(LogDensityEvaluation { value, gradient })
  }

  /// Optimize from the original Prophet initialization using the pinned Newton path.
  pub fn fit_newton(&self, max_iterations: usize) -> Result<NewtonResult, NewtonError> {
    if max_iterations == 0 {
      return Err(NewtonError::InvalidConfiguration);
    }

    crate::stan::optimizer::check_workspace(self.parameter_count())?;
    let initial = self.initial_parameters();
    let density = self.evaluate(&initial).map_err(NewtonError::Objective)?;
    optimize_newton(
      &initial,
      density.value + self.log_density_constant(),
      max_iterations,
      |parameters| self.evaluate(parameters),
    )
  }

  /// Fit and diagnose the internal state before folding any private parameters.
  pub fn fit_model(
    &self,
    options: crate::stan::linear_optimizer::LinearOptimizerOptions,
  ) -> Result<NormalizedLinearMapFit, crate::stan::linear_optimizer::LinearOptimizationError> {
    use crate::stan::linear_optimizer::LinearOptimizationError;
    use crate::stan::optimizer::StanOptimizerError;

    let fit = self.fit_stan(options)?;
    let (coefficients, noise_scale) = self
      .coefficients(&fit.parameters)
      .map_err(|error| LinearOptimizationError::Optimizer(StanOptimizerError::Objective(error)))?;
    let mut stationarity_residual = 0.0_f64;
    for (column, gradient) in fit.evaluation.gradient.iter().enumerate() {
      let residual = if column == self.sigma_index() {
        gradient.abs() / noise_scale
      } else if column >= 2 && column < self.sigma_index() && fit.parameters[column] == 0.0 {
        (gradient.abs() - 1.0 / self.changepoint_prior).max(0.0)
      } else {
        gradient.abs()
      };
      stationarity_residual = stationarity_residual.max(residual);
    }
    if !stationarity_residual.is_finite() {
      return Err(LinearOptimizationError::Optimizer(
        StanOptimizerError::NonFiniteResult,
      ));
    }

    Ok(NormalizedLinearMapFit {
      coefficients,
      noise_scale,
      objective: -fit.evaluation.value,
      stationarity_residual,
      optimization: fit.attempts.summary(),
    })
  }

  /// Restore `[m,k,delta...,beta...]` coefficients and positive normalized noise.
  /// Fold the private zero-time adjustment into slope for a no-candidate model.
  pub fn coefficients(&self, parameters: &[f64]) -> Result<(Vec<f64>, f64), MapObjectiveError> {
    self.evaluate(parameters)?;
    let mut coefficients = vec![0.0; self.column_count];
    coefficients[0] = parameters[1];
    coefficients[1] = parameters[0];

    if self.changepoint_count == 0 {
      coefficients[1] += parameters[2];
    } else {
      coefficients[2..2 + self.changepoint_count]
        .copy_from_slice(&parameters[2..self.sigma_index()]);
    }

    let beta_start = self.sigma_index() + 1;
    coefficients[2 + self.changepoint_count..]
      .copy_from_slice(&parameters[beta_start..beta_start + self.feature_priors.len()]);
    Ok((
      coefficients,
      crate::stan::math::exp(parameters[self.sigma_index()]),
    ))
  }
}

/// Accepted normalized linear state with pre-fold constrained diagnostics.
#[derive(Clone, Debug, PartialEq)]
pub struct NormalizedLinearMapFit {
  pub coefficients: Vec<f64>,
  pub noise_scale: f64,
  pub objective: f64,
  pub stationarity_residual: f64,
  pub optimization: crate::stan::linear_optimizer::LinearOptimizationSummary,
}

#[cfg(test)]
mod tests {
  use super::{StanLinearObjective, evaluate_map_objective};
  use crate::mixed_map::ComponentMode;
  use crate::stan::optimizer::{NewtonTermination, finite_difference_hessian};

  fn termination_name(
    attempts: &crate::stan::linear_optimizer::LinearOptimizationAttempts,
  ) -> &'static str {
    use crate::stan::lbfgs::LbfgsTermination as L;
    use crate::stan::linear_optimizer::LinearOptimizationAttempts as A;
    match attempts {
      A::Newton { termination, .. } | A::NewtonFallback { termination, .. } => match termination {
        NewtonTermination::ObjectiveChange => "objective-change",
        NewtonTermination::IterationLimit => "iteration-limit",
        NewtonTermination::NoProgress => "no-progress",
      },
      A::Lbfgs { termination, .. } => match termination {
        L::AbsoluteObjective => "absolute-objective",
        L::RelativeObjective => "relative-objective",
        L::AbsoluteGradient => "absolute-gradient",
        L::RelativeGradient => "relative-gradient",
        L::ParameterChange => "parameter-change",
        L::IterationLimit => "iteration-limit",
      },
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn linear_policy_and_lbfgs_match_the_frozen_executable() {
    use crate::stan::lbfgs::{LbfgsControls, LbfgsSettings};
    use crate::stan::linear_optimizer::NewtonFallback;
    use crate::stan::linear_optimizer::{
      LinearOptimizationAttempts as A, LinearOptimizationError, LinearOptimizerChoice as C,
      LinearOptimizerOptions,
    };
    use crate::stan::optimizer::StanOptimizerError;
    let fixture = reference();
    let tolerances = &fixture["tolerances"];
    let mut termination_mismatches = Vec::new();
    for case in fixture["cases"].as_array().unwrap() {
      let design = numbers(&case["design"]);
      let target = numbers(&case["target"]);
      let priors = numbers(&case["featurePriors"]);
      let modes = modes(&case["featureModes"]);
      let points = case["changepointCount"].as_u64().unwrap() as usize;
      let objective = StanLinearObjective::new(
        &design,
        &target,
        &numbers(&case["changepointTimes"]),
        &priors,
        &modes,
        case["changepointPrior"].as_f64().unwrap(),
      )
      .unwrap();
      let raw = &case["lbfgsControls"];
      let defaults = LbfgsSettings::default();
      let settings = LbfgsSettings {
        history_size: raw["history_size"]
          .as_u64()
          .map(|n| n as usize)
          .unwrap_or(defaults.history_size),
        init_alpha: raw["init_alpha"].as_f64().unwrap_or(defaults.init_alpha),
        tol_obj: raw["tol_obj"].as_f64().unwrap_or(defaults.tol_obj),
        tol_rel_obj: raw["tol_rel_obj"].as_f64().unwrap_or(defaults.tol_rel_obj),
        tol_grad: raw["tol_grad"].as_f64().unwrap_or(defaults.tol_grad),
        tol_rel_grad: raw["tol_rel_grad"]
          .as_f64()
          .unwrap_or(defaults.tol_rel_grad),
        tol_param: raw["tol_param"].as_f64().unwrap_or(defaults.tol_param),
      };
      let controls = LbfgsControls::parse(settings).unwrap();
      let fallback = if case["newtonFallback"].as_bool().unwrap() {
        NewtonFallback::Enabled
      } else {
        NewtonFallback::Disabled
      };
      let choice = match case["requestedAlgorithm"].as_str().unwrap() {
        "auto" => C::Automatic { controls, fallback },
        "Newton" => C::Newton,
        "LBFGS" => C::Lbfgs { controls, fallback },
        _ => panic!("known fixture algorithm"),
      };
      let budget = case["maxIterations"].as_u64().unwrap() as usize;
      if case["expected"]["parameters"].is_array() {
        let reference_value = objective
          .evaluate(&numbers(&case["expected"]["parameters"]))
          .unwrap()
          .value;
        assert!(
          (reference_value - case["expected"]["logDensity"].as_f64().unwrap()).abs() <= 1e-4,
          "{} reference-state density {reference_value} vs {}",
          case["id"],
          case["expected"]["logDensity"]
        );
      }
      let options = LinearOptimizerOptions::parse(budget, choice).unwrap();
      let model_fit = objective.fit_model(options);
      let fit = objective.fit_stan(options);
      if case["expected"]["failure"].is_string() {
        assert_eq!(
          model_fit.as_ref().err(),
          fit.as_ref().err(),
          "{}",
          case["id"]
        );
        assert_eq!(
          fit,
          Err(LinearOptimizationError::Optimizer(
            StanOptimizerError::LineSearchFailure { iterations: 1 }
          )),
          "{}",
          case["id"]
        );
        continue;
      }
      let fit = fit.unwrap_or_else(|error| panic!("{}: {error:?}", case["id"]));
      let method = match fit.attempts {
        A::Lbfgs { .. } => "LBFGS",
        _ => "Newton",
      };
      assert_eq!(
        method,
        case["returnedAlgorithm"].as_str().unwrap(),
        "{}",
        case["id"]
      );
      assert_eq!(
        matches!(fit.attempts, A::NewtonFallback { .. }),
        case["attempts"].as_array().unwrap().len() == 2,
        "{}",
        case["id"]
      );
      let model_fit = model_fit.unwrap();
      assert_eq!(
        model_fit.optimization,
        fit.attempts.summary(),
        "{}",
        case["id"]
      );
      assert_eq!(
        model_fit.optimization.attempt_count,
        case["attempts"].as_array().unwrap().len()
      );
      assert_eq!(model_fit.objective, -fit.evaluation.value);
      assert!(model_fit.stationarity_residual.is_finite());
      assert!(model_fit.stationarity_residual >= 0.0);
      let (coefficients, noise) = objective.coefficients(&fit.parameters).unwrap();
      assert_eq!(model_fit.coefficients, coefficients);
      assert_eq!(model_fit.noise_scale, noise);
      eprintln!("{} {:?}", case["id"], fit.attempts);
      if termination_name(&fit.attempts) != case["expected"]["termination"].as_str().unwrap() {
        termination_mismatches.push(format!(
          "{}: {} vs {}",
          case["id"],
          termination_name(&fit.attempts),
          case["expected"]["termination"]
        ));
      }
      assert!(
        (fit.evaluation.value - case["expected"]["logDensity"].as_f64().unwrap()).abs()
          <= tolerances["fitLogDensityAbsolute"].as_f64().unwrap(),
        "{} density {} vs {}",
        case["id"],
        fit.evaluation.value,
        case["expected"]["logDensity"]
      );
      let (coefficients, noise) = objective.coefficients(&fit.parameters).unwrap();
      assert!(
        (noise - case["expected"]["noise"].as_f64().unwrap()).abs()
          <= tolerances["noiseAbsolute"].as_f64().unwrap(),
        "{} noise",
        case["id"]
      );
      if budget == 1 {
        for (actual, expected) in fit
          .parameters
          .iter()
          .zip(numbers(&case["expected"]["parameters"]))
        {
          assert!(
            (actual - expected).abs() <= tolerances["oneStepParameterAbsolute"].as_f64().unwrap(),
            "{} one-step {actual} vs {expected}",
            case["id"]
          );
        }
      }
      let width = 2 + points + priors.len();
      for (row, expected) in design
        .chunks_exact(width)
        .zip(numbers(&case["expected"]["predictions"]))
      {
        let trend = row[..2 + points]
          .iter()
          .zip(&coefficients)
          .map(|(a, b)| a * b)
          .sum::<f64>();
        let mut additive = 0.0;
        let mut factor = 1.0;
        for (column, mode) in modes.iter().enumerate() {
          let index = 2 + points + column;
          match mode {
            ComponentMode::Additive => additive += row[index] * coefficients[index],
            ComponentMode::Multiplicative => factor += row[index] * coefficients[index],
          }
        }
        assert!(
          (trend * factor + additive - expected).abs()
            <= tolerances["predictionAbsolute"].as_f64().unwrap(),
          "{} prediction",
          case["id"]
        );
      }
    }
    assert!(
      termination_mismatches.is_empty(),
      "{termination_mismatches:?}"
    );
  }

  fn reference() -> serde_json::Value {
    serde_json::from_str(include_str!(
      "../../../integration/fixtures/prophet-1.4.0/stan-linear-optimizer.json"
    ))
    .unwrap()
  }

  fn numbers(value: &serde_json::Value) -> Vec<f64> {
    value
      .as_array()
      .unwrap()
      .iter()
      .map(|value| value.as_f64().unwrap())
      .collect()
  }

  fn modes(value: &serde_json::Value) -> Vec<ComponentMode> {
    value
      .as_array()
      .unwrap()
      .iter()
      .map(|value| match value.as_str().unwrap() {
        "additive" => ComponentMode::Additive,
        "multiplicative" => ComponentMode::Multiplicative,
        _ => panic!("generated fixture must declare a known mode"),
      })
      .collect()
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn stan_density_gradient_and_curvature_match_the_frozen_executable() {
    let fixture = reference();
    let tolerances = &fixture["tolerances"];

    for case in fixture["cases"].as_array().unwrap() {
      let design = numbers(&case["design"]);
      let target = numbers(&case["target"]);
      let priors = numbers(&case["featurePriors"]);
      let modes = modes(&case["featureModes"]);
      let objective = StanLinearObjective::new(
        &design,
        &target,
        &numbers(&case["changepointTimes"]),
        &priors,
        &modes,
        case["changepointPrior"].as_f64().unwrap(),
      )
      .unwrap();

      for (actual, expected) in objective
        .initial_parameters()
        .iter()
        .zip(numbers(&case["initialParameters"]))
      {
        assert!(
          (actual - expected).abs() < 1e-10,
          "{} initialization",
          case["id"]
        );
      }

      for probe in case["probes"].as_array().unwrap() {
        let parameters = numbers(&probe["parameters"]);
        let evaluation = objective.evaluate(&parameters).unwrap();
        assert!(
          (evaluation.value - probe["logDensity"].as_f64().unwrap()).abs()
            <= tolerances["valueAbsolute"].as_f64().unwrap(),
          "{} density",
          case["id"]
        );

        for (actual, expected) in evaluation.gradient.iter().zip(numbers(&probe["gradient"])) {
          assert!(
            (actual - expected).abs() <= tolerances["gradientAbsolute"].as_f64().unwrap(),
            "{} gradient: {actual} versus {expected}",
            case["id"]
          );
        }

        let hessian =
          finite_difference_hessian(&parameters, &|point| objective.evaluate(point)).unwrap();

        for (actual, expected) in hessian.iter().zip(numbers(&probe["curvature"])) {
          assert!(
            (actual - expected).abs() <= tolerances["curvatureAbsolute"].as_f64().unwrap(),
            "{} curvature: {actual} versus {expected}",
            case["id"]
          );
        }
      }
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn newton_fits_match_the_frozen_executable_including_mixed_and_dummy_parameters() {
    let fixture = reference();
    let tolerances = &fixture["tolerances"];

    for case in fixture["cases"].as_array().unwrap() {
      if !case["id"].as_str().unwrap().starts_with("newton-") {
        continue;
      }
      let design = numbers(&case["design"]);
      let target = numbers(&case["target"]);
      let priors = numbers(&case["featurePriors"]);
      let modes = modes(&case["featureModes"]);
      let changepoints = case["changepointCount"].as_u64().unwrap() as usize;
      let objective = StanLinearObjective::new(
        &design,
        &target,
        &numbers(&case["changepointTimes"]),
        &priors,
        &modes,
        case["changepointPrior"].as_f64().unwrap(),
      )
      .unwrap();
      let budget = case["maxIterations"].as_u64().unwrap() as usize;
      let fitted = objective.fit_newton(budget).unwrap();
      let expected = &case["expected"];
      assert!(fitted.iterations <= budget);
      assert!(
        (fitted.evaluation.value - expected["logDensity"].as_f64().unwrap()).abs()
          <= tolerances["fitLogDensityAbsolute"].as_f64().unwrap(),
        "{} density: {} versus {}",
        case["id"],
        fitted.evaluation.value,
        expected["logDensity"]
      );

      if budget == 1 {
        assert_eq!(fitted.termination, NewtonTermination::IterationLimit);
        for (actual, expected) in fitted
          .parameters
          .iter()
          .zip(numbers(&expected["parameters"]))
        {
          assert!(
            (actual - expected).abs() <= tolerances["oneStepParameterAbsolute"].as_f64().unwrap(),
            "{} one-step: {actual} versus {expected}",
            case["id"]
          );
        }
      } else {
        assert_eq!(fitted.termination, NewtonTermination::ObjectiveChange);
      }

      let (coefficients, noise) = objective.coefficients(&fitted.parameters).unwrap();
      assert!(
        (noise - expected["noise"].as_f64().unwrap()).abs()
          <= tolerances["noiseAbsolute"].as_f64().unwrap(),
        "{} noise",
        case["id"]
      );

      // Independently project returned public coefficients, including folded
      // slope in no-candidate models, rather than reuse the optimizer evaluator.
      let width = 2 + changepoints + priors.len();

      for (row, expected) in design
        .chunks_exact(width)
        .zip(numbers(&expected["predictions"]))
      {
        let trend = row[..2 + changepoints]
          .iter()
          .zip(&coefficients)
          .map(|(x, theta)| x * theta)
          .sum::<f64>();
        let mut additive = 0.0;
        let mut factor = 1.0;

        for (column, mode) in modes.iter().enumerate() {
          let index = 2 + changepoints + column;
          let contribution = row[index] * coefficients[index];

          match mode {
            ComponentMode::Additive => additive += contribution,
            ComponentMode::Multiplicative => factor += contribution,
          }
        }

        assert!(
          (trend * factor + additive - expected).abs()
            <= tolerances["predictionAbsolute"].as_f64().unwrap(),
          "{} prediction",
          case["id"]
        );
      }
    }
  }

  #[test]
  fn isolates_likelihood_priors_and_laplace_stationarity() {
    let evaluation = evaluate_map_objective(
      2,
      4,
      1,
      &[1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.5, -1.0],
      &[1.0, 2.0],
      &[0.5, 0.25, 0.0, 0.1],
      &[2.0],
      0.05,
      0.5,
    )
    .expect("the hand-authored objective is finite");

    assert!(evaluation.objective.is_finite());
    assert!(evaluation.residual_sum_squares > 0.0);
    assert_eq!(evaluation.smooth_gradient.len(), 4);
    assert!(evaluation.stationarity_residual >= 0.0);
  }

  #[test]
  fn smooth_derivatives_match_central_finite_differences() {
    let design = [1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.5, -1.0];
    let target = [1.0, 2.0];
    let coefficients = [0.5, 0.25, 0.2, 0.1];
    let evaluate = |point: &[f64], sigma: f64| {
      evaluate_map_objective(2, 4, 1, &design, &target, point, &[2.0], 0.05, sigma).unwrap()
    };
    let evaluation = evaluate(&coefficients, 0.5);
    let step = 1e-6;

    for column in [0, 1, 3] {
      let mut lower = coefficients;
      let mut upper = coefficients;
      lower[column] -= step;
      upper[column] += step;
      let finite_difference =
        (evaluate(&upper, 0.5).objective - evaluate(&lower, 0.5).objective) / (2.0 * step);

      assert!((finite_difference - evaluation.smooth_gradient[column]).abs() < 1e-5);
    }

    let noise_difference = (evaluate(&coefficients, 0.5 + step).objective
      - evaluate(&coefficients, 0.5 - step).objective)
      / (2.0 * step);

    assert!((noise_difference - evaluation.noise_derivative).abs() < 1e-5);
  }

  #[test]
  fn accepts_a_zero_delta_inside_its_subgradient_interval() {
    let evaluation = evaluate_map_objective(
      2,
      3,
      1,
      &[1.0, 0.0, 0.0, 1.0, 1.0, 0.0],
      &[0.0, 0.0],
      &[0.0, 0.0, 0.0],
      &[],
      0.05,
      0.5,
    )
    .unwrap();

    assert_eq!(evaluation.smooth_gradient[2], 0.0);
  }
}
