//! Prophet's linear optimization selection, per-attempt budget and fallback.
//! This pure policy owns original initialization and never reuses a failed iterate.

use crate::map_objective::StanLinearObjective;
use crate::stan_lbfgs::{LbfgsControls, LbfgsResult, LbfgsTermination, optimize_lbfgs};
use crate::stan_optimizer::{
  LogDensityEvaluation, NewtonResult, NewtonTermination, StanOptimizerError,
};

/// Only qualifying L-BFGS numerical failures may trigger Newton.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum NewtonFallback {
  Enabled,
  Disabled,
}

/// Algorithm-specific legal settings, including Prophet's row-count selection.
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum LinearOptimizerChoice {
  Automatic {
    controls: LbfgsControls,
    fallback: NewtonFallback,
  },
  Newton,
  Lbfgs {
    controls: LbfgsControls,
    fallback: NewtonFallback,
  },
}

/// Parsed positive, CmdStan-representable per-attempt budget and algorithm policy.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct LinearOptimizerOptions {
  max_iterations: usize,
  choice: LinearOptimizerChoice,
}

impl LinearOptimizerOptions {
  pub const fn parse(
    max_iterations: usize,
    choice: LinearOptimizerChoice,
  ) -> Result<Self, StanOptimizerError> {
    if max_iterations == 0 || max_iterations > i32::MAX as usize {
      return Err(StanOptimizerError::InvalidConfiguration);
    }
    Ok(Self {
      max_iterations,
      choice,
    })
  }
  pub fn max_iterations(self) -> usize {
    self.max_iterations
  }
}

impl Default for LinearOptimizerOptions {
  fn default() -> Self {
    Self {
      max_iterations: 10000,
      choice: LinearOptimizerChoice::Automatic {
        controls: LbfgsControls::default(),
        fallback: NewtonFallback::Enabled,
      },
    }
  }
}

/// Successful attempts cannot be confused with failed line searches.
#[derive(Clone, Debug, PartialEq)]
pub enum LinearOptimizationAttempts {
  Newton {
    iterations: usize,
    termination: NewtonTermination,
  },
  Lbfgs {
    iterations: usize,
    termination: LbfgsTermination,
    hessian_resets: usize,
  },
  NewtonFallback {
    failure: StanOptimizerError,
    iterations: usize,
    termination: NewtonTermination,
  },
}

/// Actual algorithm that returned the accepted state.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum LinearAlgorithm {
  Newton,
  Lbfgs,
}

/// Caller-visible completion; finite exhaustion is not convergence.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum LinearTermination {
  NewtonObjectiveChange,
  NoProgress,
  AbsoluteObjective,
  RelativeObjective,
  AbsoluteGradient,
  RelativeGradient,
  ParameterChange,
  IterationLimit,
}

/// Bounded evidence for completed optimization attempts.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub struct LinearOptimizationSummary {
  pub algorithm: LinearAlgorithm,
  pub termination: LinearTermination,
  pub iterations: usize,
  pub attempt_count: usize,
  pub failed_attempt_iterations: Option<usize>,
  pub hessian_resets: usize,
}

impl LinearOptimizationAttempts {
  /// Preserve actual completion and fallback work rather than claiming convergence.
  pub fn summary(&self) -> LinearOptimizationSummary {
    let newton_termination = |termination| match termination {
      NewtonTermination::ObjectiveChange => LinearTermination::NewtonObjectiveChange,
      NewtonTermination::NoProgress => LinearTermination::NoProgress,
      NewtonTermination::IterationLimit => LinearTermination::IterationLimit,
    };
    match *self {
      Self::Newton {
        iterations,
        termination,
      } => LinearOptimizationSummary {
        algorithm: LinearAlgorithm::Newton,
        termination: newton_termination(termination),
        iterations,
        attempt_count: 1,
        failed_attempt_iterations: None,
        hessian_resets: 0,
      },
      Self::NewtonFallback {
        failure,
        iterations,
        termination,
      } => LinearOptimizationSummary {
        algorithm: LinearAlgorithm::Newton,
        termination: newton_termination(termination),
        iterations,
        attempt_count: 2,
        failed_attempt_iterations: match failure {
          StanOptimizerError::LineSearchFailure { iterations } => Some(iterations),
          _ => None,
        },
        hessian_resets: 0,
      },
      Self::Lbfgs {
        iterations,
        termination,
        hessian_resets,
      } => LinearOptimizationSummary {
        algorithm: LinearAlgorithm::Lbfgs,
        termination: match termination {
          LbfgsTermination::AbsoluteObjective => LinearTermination::AbsoluteObjective,
          LbfgsTermination::RelativeObjective => LinearTermination::RelativeObjective,
          LbfgsTermination::AbsoluteGradient => LinearTermination::AbsoluteGradient,
          LbfgsTermination::RelativeGradient => LinearTermination::RelativeGradient,
          LbfgsTermination::ParameterChange => LinearTermination::ParameterChange,
          LbfgsTermination::IterationLimit => LinearTermination::IterationLimit,
        },
        iterations,
        attempt_count: 1,
        failed_attempt_iterations: None,
        hessian_resets,
      },
    }
  }
}

/// Accepted finite state, with the actual algorithm and attempted-work evidence.
#[derive(Clone, Debug, PartialEq)]
pub struct LinearOptimizationResult {
  pub parameters: Vec<f64>,
  pub evaluation: LogDensityEvaluation,
  pub attempts: LinearOptimizationAttempts,
}

/// Preserve both expected numerical failures when a fallback also fails.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum LinearOptimizationError {
  Optimizer(StanOptimizerError),
  Fallback {
    lbfgs: StanOptimizerError,
    newton: StanOptimizerError,
  },
}

fn newton_result(
  fit: NewtonResult,
  failure: Option<StanOptimizerError>,
) -> LinearOptimizationResult {
  let attempts = match failure {
    Some(failure) => LinearOptimizationAttempts::NewtonFallback {
      failure,
      iterations: fit.iterations,
      termination: fit.termination,
    },
    None => LinearOptimizationAttempts::Newton {
      iterations: fit.iterations,
      termination: fit.termination,
    },
  };
  LinearOptimizationResult {
    parameters: fit.parameters,
    evaluation: fit.evaluation,
    attempts,
  }
}

fn lbfgs_result(fit: LbfgsResult) -> LinearOptimizationResult {
  LinearOptimizationResult {
    parameters: fit.parameters,
    evaluation: fit.evaluation,
    attempts: LinearOptimizationAttempts::Lbfgs {
      iterations: fit.iterations,
      termination: fit.termination,
      hessian_resets: fit.hessian_resets,
    },
  }
}

/// Fit the same objective on both attempts, with original Prophet initialization.
pub fn optimize_linear(
  objective: &StanLinearObjective<'_>,
  options: LinearOptimizerOptions,
) -> Result<LinearOptimizationResult, LinearOptimizationError> {
  let (controls, fallback) = match options.choice {
    LinearOptimizerChoice::Newton => {
      return objective
        .fit_newton(options.max_iterations)
        .map(|fit| newton_result(fit, None))
        .map_err(LinearOptimizationError::Optimizer);
    }
    LinearOptimizerChoice::Automatic { .. } if objective.observation_count() < 100 => {
      return objective
        .fit_newton(options.max_iterations)
        .map(|fit| newton_result(fit, None))
        .map_err(LinearOptimizationError::Optimizer);
    }
    LinearOptimizerChoice::Automatic { controls, fallback }
    | LinearOptimizerChoice::Lbfgs { controls, fallback } => (controls, fallback),
  };
  controls
    .check_workspace(objective.parameter_count())
    .map_err(LinearOptimizationError::Optimizer)?;
  let initial = objective.initial_parameters();
  match optimize_lbfgs(&initial, options.max_iterations, controls, |point| {
    objective.evaluate(point)
  }) {
    Ok(fit) => Ok(lbfgs_result(fit)),
    Err(error) => {
      let retry = fallback == NewtonFallback::Enabled
        && matches!(
          error,
          StanOptimizerError::LineSearchFailure { .. }
            | StanOptimizerError::Objective(
              crate::map_objective::MapObjectiveError::NonFiniteResult
            )
            | StanOptimizerError::NonFiniteResult
        );
      if !retry {
        return Err(LinearOptimizationError::Optimizer(error));
      }
      objective
        .fit_newton(options.max_iterations)
        .map(|fit| newton_result(fit, Some(error)))
        .map_err(|newton| LinearOptimizationError::Fallback {
          lbfgs: error,
          newton,
        })
    }
  }
}
