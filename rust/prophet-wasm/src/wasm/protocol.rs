pub(crate) const MAX_WIRE_INTEGER: f64 = u32::MAX as f64;

/// Versioned Stan controls: Newton has no L-BFGS or fallback fields.
///
/// Version 2 starts from Prophet's initialization. Version 3 appends a warm start
/// after the algorithm's controls: `[k, m, sigmaObs, D, ...D delta, B, ...B beta]`.
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
  let warm = match *version {
    2.0 => false,
    3.0 => true,
    _ => return None,
  };
  let budget = parse_positive_integer(*budget)?;
  let control_count = if *algorithm == 1.0 { 0 } else { 8 };
  if tail.len() < control_count {
    return None;
  }
  let (controls, init) = tail.split_at(control_count);
  if !warm && !init.is_empty() {
    return None;
  }
  let choice = if *algorithm == 1.0 {
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
    ] = controls
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
  let options = LinearOptimizerOptions::parse(budget, choice).ok()?;
  if !warm {
    return Some(options);
  }
  Some(options.with_warm_start(parse_warm_start(init)?))
}

fn parse_warm_start(values: &[f64]) -> Option<crate::stan::linear_optimizer::WarmStart> {
  let [k, m, sigma_obs, delta_count, rest @ ..] = values else {
    return None;
  };
  let delta_count = parse_nonnegative_integer(*delta_count)?;
  if rest.len() <= delta_count {
    return None;
  }
  let (delta, rest) = rest.split_at(delta_count);
  let [beta_count, beta @ ..] = rest else {
    return None;
  };
  if parse_nonnegative_integer(*beta_count)? != beta.len() {
    return None;
  }
  crate::stan::linear_optimizer::WarmStart::parse(*k, *m, *sigma_obs, delta.to_vec(), beta.to_vec())
    .ok()
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
///
/// The last two record how `delta` and `beta` started: 0 from Prophet's initialization
/// without a warm start, 1 from the warm start, and 2 from Prophet's initialization
/// because the warm start's length did not match.
pub(crate) fn linear_summary_frame(termination: crate::piecewise_map::MapTermination) -> [f64; 6] {
  use crate::piecewise_map::MapTermination;
  use crate::stan::linear_optimizer::{Initialization, LinearAlgorithm};
  match termination {
    MapTermination::Stan(summary) => {
      let [delta, beta] = match summary.initialization {
        Initialization::Default => [0.0, 0.0],
        Initialization::WarmStart { delta, beta } => {
          [delta, beta].map(|used| if used { 1.0 } else { 2.0 })
        }
      };
      [
        match summary.algorithm {
          LinearAlgorithm::Newton => 1.0,
          LinearAlgorithm::Lbfgs => 2.0,
        },
        summary.attempt_count as f64,
        summary
          .failed_attempt_iterations
          .map_or(-1.0, |count| count as f64),
        summary.hessian_resets as f64,
        delta,
        beta,
      ]
    }
    _ => [0.0, 0.0, -1.0, 0.0, 0.0, 0.0],
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

/// Unit priors for a prediction-only feature layout.
///
/// Callers choose the column count, and zero prediction rows satisfy every row-by-column
/// check, so bound it by the dense-buffer policy before allocating rather than trapping.
pub(crate) fn placeholder_priors(columns: usize) -> Option<Vec<f64>> {
  (columns <= crate::fourier::MAX_DENSE_ELEMENTS).then(|| vec![1.0; columns])
}

#[cfg(test)]
mod tests {
  use super::parse_linear_optimizer;
  use crate::stan::linear_optimizer::{LinearOptimizerChoice, LinearOptimizerOptions, WarmStart};

  const LBFGS: [f64; 8] = [1.0, 5.0, 0.001, 1e-12, 1e4, 1e-8, 1e7, 1e-8];

  fn warm() -> WarmStart {
    WarmStart::parse(0.5, -0.25, 0.1, vec![0.01, 0.02], vec![0.3]).unwrap()
  }

  #[test]
  fn appends_a_warm_start_after_newton_and_lbfgs_controls() {
    let init = [0.5, -0.25, 0.1, 2.0, 0.01, 0.02, 1.0, 0.3];
    let newton = [&[3.0, 1.0, 50.0][..], &init].concat();
    let automatic = [&[3.0, 0.0, 50.0][..], &LBFGS, &init].concat();

    assert_eq!(
      parse_linear_optimizer(&newton),
      Some(
        LinearOptimizerOptions::parse(50, LinearOptimizerChoice::Newton)
          .unwrap()
          .with_warm_start(warm())
      )
    );
    assert_eq!(
      parse_linear_optimizer(&automatic),
      parse_linear_optimizer(&[&[2.0, 0.0, 50.0][..], &LBFGS].concat())
        .map(|options| options.with_warm_start(warm()))
    );
  }

  #[test]
  fn accepts_empty_warm_start_vectors() {
    let frame = [3.0, 1.0, 50.0, 0.5, -0.25, 0.1, 0.0, 0.0];

    assert_eq!(
      parse_linear_optimizer(&frame),
      Some(
        LinearOptimizerOptions::parse(50, LinearOptimizerChoice::Newton)
          .unwrap()
          .with_warm_start(WarmStart::parse(0.5, -0.25, 0.1, vec![], vec![]).unwrap())
      )
    );
  }

  #[test]
  fn rejects_malformed_warm_start_frames() {
    for frame in [
      // Version two carries no warm start.
      vec![2.0, 1.0, 50.0, 0.5, -0.25, 0.1, 0.0, 0.0],
      // Version three requires one.
      vec![3.0, 1.0, 50.0],
      // Counts must match the values that follow.
      vec![3.0, 1.0, 50.0, 0.5, -0.25, 0.1, 2.0, 0.01, 0.0],
      vec![3.0, 1.0, 50.0, 0.5, -0.25, 0.1, 0.0, 2.0, 0.3],
      vec![3.0, 1.0, 50.0, 0.5, -0.25, 0.1, 0.0, 0.0, 0.3],
      vec![3.0, 1.0, 50.0, 0.5, -0.25, 0.1, 0.5, 0.0],
      // Stan needs a positive noise scale and finite values.
      vec![3.0, 1.0, 50.0, 0.5, -0.25, 0.0, 0.0, 0.0],
      vec![3.0, 1.0, 50.0, f64::NAN, -0.25, 0.1, 0.0, 0.0],
      vec![3.0, 1.0, 50.0, 0.5, -0.25, 0.1, 1.0, f64::INFINITY, 0.0],
      vec![4.0, 1.0, 50.0, 0.5, -0.25, 0.1, 0.0, 0.0],
    ] {
      assert_eq!(parse_linear_optimizer(&frame), None, "{frame:?}");
    }
  }
}
