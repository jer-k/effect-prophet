pub(crate) const MAX_WIRE_INTEGER: f64 = u32::MAX as f64;

/// Versioned linear-only controls: Newton has no L-BFGS or fallback fields.
pub(crate) fn parse_linear_optimizer(
  values: &[f64],
) -> Option<crate::stan::linear_optimizer::LinearOptimizerOptions> {
  use crate::stan::lbfgs::{LbfgsControls, LbfgsSettings};
  use crate::stan::linear_optimizer::{
    LinearOptimizerChoice as Choice, LinearOptimizerOptions, NewtonFallback,
  };

  let [version, algorithm, budget, tail @ ..] = values else {
    return None;
  };
  if *version != 2.0 {
    return None;
  }
  let budget = parse_positive_integer(*budget)?;
  let choice = if *algorithm == 1.0 && tail.is_empty() {
    Choice::Newton
  } else {
    let [
      fallback,
      history,
      alpha,
      obj,
      rel_obj,
      grad,
      rel_grad,
      param,
    ] = tail
    else {
      return None;
    };
    let fallback = match *fallback {
      0.0 => NewtonFallback::Disabled,
      1.0 => NewtonFallback::Enabled,
      _ => return None,
    };
    let controls = LbfgsControls::parse(LbfgsSettings {
      history_size: parse_positive_integer(*history)?,
      init_alpha: *alpha,
      tol_obj: *obj,
      tol_rel_obj: *rel_obj,
      tol_grad: *grad,
      tol_rel_grad: *rel_grad,
      tol_param: *param,
    })
    .ok()?;
    match *algorithm {
      0.0 => Choice::Automatic { controls, fallback },
      2.0 => Choice::Lbfgs { controls, fallback },
      _ => return None,
    }
  };
  LinearOptimizerOptions::parse(budget, choice).ok()
}

/// Stable linear completions; zero is reserved for the unchanged coordinate policies.
pub(crate) fn map_termination_code(termination: crate::piecewise_map::MapTermination) -> f64 {
  use crate::piecewise_map::MapTermination;
  use crate::stan::linear_optimizer::LinearTermination as T;
  match termination {
    MapTermination::ConstantTargetShortcut => 1.0,
    MapTermination::Stan(summary) => match summary.termination {
      T::NewtonObjectiveChange => 2.0,
      T::NoProgress => 3.0,
      T::AbsoluteObjective => 4.0,
      T::RelativeObjective => 5.0,
      T::AbsoluteGradient => 6.0,
      T::RelativeGradient => 7.0,
      T::ParameterChange => 8.0,
      T::IterationLimit => 9.0,
    },
  }
}

/// Extra linear summary fields, excluding any raw numerical state or failure payload.
pub(crate) fn linear_summary_frame(termination: crate::piecewise_map::MapTermination) -> [f64; 4] {
  use crate::piecewise_map::MapTermination;
  use crate::stan::linear_optimizer::LinearAlgorithm;
  match termination {
    MapTermination::Stan(summary) => [
      match summary.algorithm {
        LinearAlgorithm::Newton => 1.0,
        LinearAlgorithm::Lbfgs => 2.0,
      },
      summary.attempt_count as f64,
      summary
        .failed_attempt_iterations
        .map_or(-1.0, |count| count as f64),
      summary.hessian_resets as f64,
    ],
    _ => [0.0, 0.0, -1.0, 0.0],
  }
}

/// Explicit wire options remain unique; generated row-index candidates may repeat.
pub(crate) fn parse_explicit_changepoints(values: &[f64]) -> Option<Vec<f64>> {
  if values
    .iter()
    .any(|value| !value.is_finite() || value.fract() != 0.0)
    || values.windows(2).any(|pair| pair[1] <= pair[0])
  {
    return None;
  }

  Some(values.to_vec())
}

pub(crate) fn parse_positive_integer(value: f64) -> Option<usize> {
  if !value.is_finite() || value <= 0.0 || value.fract() != 0.0 || value > MAX_WIRE_INTEGER {
    return None;
  }

  Some(value as usize)
}

pub(crate) fn parse_nonnegative_integer(value: f64) -> Option<usize> {
  if !value.is_finite() || value < 0.0 || value.fract() != 0.0 || value > MAX_WIRE_INTEGER {
    return None;
  }

  Some(value as usize)
}
