//! Numerical behavior ported from Stan 2.37.0, commit
//! `1357c136bf22e3f0d25ed3529fea55fe76842eac`. See `third-party/stan-license.txt`.
//! This is a pure numerical boundary, not an Effect operation or a tracing site.

use nalgebra::{DMatrix, DVector};

use crate::fourier::checked_element_count;
use crate::map_objective::MapObjectiveError;

/// A proportional log density and its unconstrained-coordinate gradient.
#[derive(Clone, Debug, PartialEq)]
pub struct LogDensityEvaluation {
  /// Finite log density, without the positive-parameter transform Jacobian.
  pub value: f64,
  /// Derivatives aligned with the complete optimizer state.
  pub gradient: Vec<f64>,
}

/// Ordinary failures of the pinned Stan numerical strategies.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum StanOptimizerError {
  /// The state, gradient dimensions or iteration control is invalid.
  InvalidConfiguration,
  /// Curvature/workspace dimensions exceed the shared dense-memory policy.
  SizeOverflow,
  /// The objective cannot be evaluated at a required state.
  Objective(MapObjectiveError),
  /// Curvature decomposition failed within its bounded numerical work.
  CurvatureFailure,
  /// A finite state produced an unrepresentable direction or result.
  NonFiniteResult,
  /// Strong Wolfe search failed after the permitted Hessian reset.
  LineSearchFailure { iterations: usize },
}

/// Source-compatible name for the Newton entrypoint's shared numerical errors.
pub type NewtonError = StanOptimizerError;

/// The actual reason a finite Newton result was returned.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum NewtonTermination {
  /// Absolute log-density change is at most Stan's `1e-8` threshold.
  ObjectiveChange,
  /// The configured number of complete Newton steps was reached.
  IterationLimit,
  /// Stan's backtracking minimum was reached without accepting a proposal.
  NoProgress,
}

/// Finite optimizer state; iteration-limit completion is not called convergence.
#[derive(Clone, Debug, PartialEq)]
pub struct NewtonResult {
  /// Unconstrained state in the caller's documented parameter order.
  pub parameters: Vec<f64>,
  /// Final proportional density and unconstrained gradient.
  pub evaluation: LogDensityEvaluation,
  /// Number of complete direction/backtracking operations.
  pub iterations: usize,
  /// Why optimization stopped.
  pub termination: NewtonTermination,
}

const HESSIAN_EPSILON: f64 = 1e-3;
const OBJECTIVE_TOLERANCE: f64 = 1e-8;
const MINIMUM_STEP: f64 = 1e-50;

/// Run Stan's joint Newton strategy with a bounded spectral decomposition.
///
/// `initial_log_density` is the non-proportional initial density used by the
/// pinned Stan service. All subsequent evaluations use proportional density.
/// Numerical domain failures during backtracking reject that trial; malformed
/// dimensions and resource failures are never swallowed as rejected proposals.
pub fn optimize_newton(
  initial: &[f64],
  initial_log_density: f64,
  max_iterations: usize,
  evaluate: impl Fn(&[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>,
) -> Result<NewtonResult, NewtonError> {
  if initial.is_empty()
    || initial.iter().any(|value| !value.is_finite())
    || !initial_log_density.is_finite()
    || max_iterations == 0
  {
    return Err(NewtonError::InvalidConfiguration);
  }

  let dimension = initial.len();
  check_workspace(dimension)?;

  let mut parameters = initial.to_vec();
  let mut previous_density = initial_log_density;

  for iteration in 1..=max_iterations {
    let current = checked_evaluation(&parameters, &evaluate)?;
    let hessian = finite_difference_hessian(&parameters, &evaluate)?;
    let direction = spectral_direction(&hessian, &current.gradient)?;
    let mut step = 2.0;
    let mut proposal = vec![0.0; dimension];

    let accepted = loop {
      step *= 0.5;

      if step < MINIMUM_STEP {
        break None;
      }

      for column in 0..dimension {
        proposal[column] = parameters[column] - step * direction[column];
      }

      match checked_evaluation(&proposal, &evaluate) {
        Ok(evaluation) if evaluation.value >= current.value => break Some(evaluation),
        Ok(_) | Err(NewtonError::Objective(MapObjectiveError::NonFiniteResult)) => {}
        Err(error) => return Err(error),
      }
    };

    let Some(evaluation) = accepted else {
      return Ok(NewtonResult {
        parameters,
        evaluation: current,
        iterations: iteration,
        termination: NewtonTermination::NoProgress,
      });
    };

    parameters.copy_from_slice(&proposal);

    if (evaluation.value - previous_density).abs() <= OBJECTIVE_TOLERANCE {
      return Ok(NewtonResult {
        parameters,
        evaluation,
        iterations: iteration,
        termination: NewtonTermination::ObjectiveChange,
      });
    }

    previous_density = evaluation.value;

    if iteration == max_iterations {
      return Ok(NewtonResult {
        parameters,
        evaluation,
        iterations: iteration,
        termination: NewtonTermination::IterationLimit,
      });
    }
  }

  // Positive max_iterations always returns from the final loop iteration.
  unreachable!("validated Newton budget must produce a termination result")
}

/// Bound aggregate dense workspace before allocating state or evaluating rows.
pub(crate) fn check_workspace(dimension: usize) -> Result<(), NewtonError> {
  checked_element_count(
    dimension,
    dimension.checked_mul(4).ok_or(NewtonError::SizeOverflow)?,
  )
  .map_err(|_| NewtonError::SizeOverflow)?;
  Ok(())
}

pub(crate) fn checked_evaluation(
  parameters: &[f64],
  evaluate: &impl Fn(&[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>,
) -> Result<LogDensityEvaluation, NewtonError> {
  let evaluation = evaluate(parameters).map_err(NewtonError::Objective)?;

  if evaluation.gradient.len() != parameters.len() {
    return Err(NewtonError::InvalidConfiguration);
  }

  if !evaluation.value.is_finite() || evaluation.gradient.iter().any(|value| !value.is_finite()) {
    return Err(NewtonError::Objective(MapObjectiveError::NonFiniteResult));
  }

  Ok(evaluation)
}

/// Preserve the pinned source's actual stencil scaling, not a textbook Hessian.
/// Crossing exact Laplace kinks contributes curvature even though the density
/// itself is not smoothed. Stan accumulates both transposed entries to symmetrize.
pub(crate) fn finite_difference_hessian(
  parameters: &[f64],
  evaluate: &impl Fn(&[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>,
) -> Result<Vec<f64>, NewtonError> {
  let dimension = parameters.len();
  let count = checked_element_count(dimension, dimension).map_err(|_| NewtonError::SizeOverflow)?;
  let mut hessian = vec![0.0; count];
  let mut perturbed = parameters.to_vec();
  let perturbations = [-2.0, -1.0, 1.0, 2.0];
  let weights = [1.0 / 12.0, -2.0 / 3.0, 2.0 / 3.0, -1.0 / 12.0];

  for column in 0..dimension {
    for (perturbation, weight) in perturbations.into_iter().zip(weights) {
      perturbed[column] = parameters[column] + perturbation * HESSIAN_EPSILON;
      let evaluation = checked_evaluation(&perturbed, evaluate)?;

      for row in 0..dimension {
        let increment = 0.5 * HESSIAN_EPSILON * weight * evaluation.gradient[row];
        hessian[column * dimension + row] += increment;
        hessian[row * dimension + column] += increment;
      }
    }

    perturbed[column] = parameters[column];
  }

  if hessian.iter().any(|value| !value.is_finite()) {
    return Err(NewtonError::NonFiniteResult);
  }

  Ok(hessian)
}

fn spectral_direction(hessian: &[f64], gradient: &[f64]) -> Result<Vec<f64>, NewtonError> {
  let dimension = gradient.len();
  let matrix = DMatrix::from_row_slice(dimension, dimension, hessian);
  // Preserve the symmetric spectral action without flooring eigenvalues. The
  // bounded QR owner avoids a cancellation-prone terminal 2×2 eigenvector basis.
  let max_iterations = dimension.checked_mul(30).ok_or(NewtonError::SizeOverflow)?;
  let (eigenvectors, eigenvalues) = crate::symmetric_eigen::decompose(matrix, max_iterations)?;
  let mut projected = eigenvectors.transpose() * DVector::from_column_slice(gradient);

  for column in 0..dimension {
    projected[column] = -projected[column] / eigenvalues[column].abs();
  }

  let direction = eigenvectors * projected;

  // Stan does not reject an infinite/NaN spectral action here. Such proposals
  // fail the model's domain checks during backtracking, which returns the last
  // finite state at the minimum step. Keep that source no-progress completion.
  Ok(direction.as_slice().to_vec())
}

#[cfg(test)]
mod tests {
  use super::*;

  fn quadratic(parameters: &[f64]) -> Result<LogDensityEvaluation, MapObjectiveError> {
    Ok(LogDensityEvaluation {
      value: -0.5 * parameters.iter().map(|value| value * value).sum::<f64>(),
      gradient: parameters.iter().map(|value| -value).collect(),
    })
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn preserves_the_pinned_hessian_stencil_scaling() {
    let hessian = finite_difference_hessian(&[0.5, -1.0], &quadratic).unwrap();

    assert!((hessian[0] + 1e-6).abs() < 1e-18);
    assert!(hessian[1].abs() < 1e-18);
    assert!(hessian[2].abs() < 1e-18);
    assert!((hessian[3] + 1e-6).abs() < 1e-18);
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn returns_finite_iteration_limited_state_without_claiming_convergence() {
    let result = optimize_newton(&[1.0], -0.5, 1, quadratic).unwrap();

    assert_eq!(result.iterations, 1);
    assert_eq!(result.termination, NewtonTermination::IterationLimit);
    assert!(result.evaluation.value > -0.5);
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn handles_indefinite_curvature_using_absolute_eigenvalues() {
    let direction = spectral_direction(&[2.0, 0.0, 0.0, -4.0], &[6.0, 8.0]).unwrap();

    assert!((direction[0] + 3.0).abs() < 1e-12);
    assert!((direction[1] + 2.0).abs() < 1e-12);
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn spectral_direction_solves_coupled_negative_curvature() {
    let matrix = [
      -2.24e-6,
      -3e-6,
      -5.6e-7,
      1.93e-8,
      0.0,
      -3e-6,
      -6.04e-6,
      -6e-7,
      2.85e-8,
      0.0,
      -5.6e-7,
      -6e-7,
      -0.02333353333,
      1.29e-9,
      0.0,
      1.93e-8,
      2.85e-8,
      1.29e-9,
      -8.000283e-6,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      -1e-6,
    ];
    let gradient = [-0.012, -0.052, -0.000644, -9.99986, 0.0];
    let direction = spectral_direction(&matrix, &gradient).unwrap();

    for (row, expected) in matrix.as_chunks::<5>().0.iter().zip(gradient) {
      let actual = row.iter().zip(&direction).map(|(x, y)| x * y).sum::<f64>();
      assert!(
        (actual - expected).abs() < 1e-7,
        "spectral residual: {actual} versus {expected}; direction={direction:?}"
      );
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn does_not_regularize_a_singular_curvature_matrix() {
    assert!(spectral_direction(&[0.0], &[0.0]).unwrap()[0].is_nan());

    let result = optimize_newton(&[1.0], 0.0, 10, |parameters| {
      if parameters.iter().any(|value| !value.is_finite()) {
        return Err(MapObjectiveError::NonFiniteResult);
      }
      Ok(LogDensityEvaluation {
        value: 0.0,
        gradient: vec![0.0],
      })
    })
    .unwrap();

    assert_eq!(result.parameters, vec![1.0]);
    assert_eq!(result.iterations, 1);
    assert_eq!(result.termination, NewtonTermination::NoProgress);
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn rejects_oversized_workspace_before_evaluating_the_objective() {
    let initial = vec![0.0; 4097];
    let evaluate = |_: &[f64]| -> Result<LogDensityEvaluation, MapObjectiveError> {
      panic!("oversized curvature must fail before objective evaluation")
    };
    assert_eq!(
      optimize_newton(&initial, 0.0, 10, evaluate),
      Err(NewtonError::SizeOverflow)
    );
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn rejects_bad_controls_and_gradient_dimensions() {
    assert_eq!(
      optimize_newton(&[1.0], -0.5, 0, quadratic),
      Err(NewtonError::InvalidConfiguration)
    );
    assert_eq!(
      optimize_newton(&[], -0.5, 10, quadratic),
      Err(NewtonError::InvalidConfiguration)
    );
    let wrong = |_: &[f64]| {
      Ok(LogDensityEvaluation {
        value: 0.0,
        gradient: vec![],
      })
    };
    assert_eq!(
      optimize_newton(&[1.0], -0.5, 10, wrong),
      Err(NewtonError::InvalidConfiguration)
    );
  }
}
