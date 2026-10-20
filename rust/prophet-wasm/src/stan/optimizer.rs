//! Numerical behavior ported from Stan 2.37.0, commit
//! `1357c136bf22e3f0d25ed3529fea55fe76842eac`. See `third-party/stan-license.txt`.
//! This is a pure numerical boundary, not an Effect operation or a tracing site.

use nalgebra::DMatrix;

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
  /// Linear memory cannot hold the dense Newton workspace for this many parameters.
  WorkspaceAllocation { parameters: usize },
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

/// wasm32 linear memory addresses at most 65,536 pages of 64 KiB.
pub const WASM_MEMORY_LIMIT_BYTES: u64 = 65_536 * 65_536;

/// The Hessian, its dense copy, the eigenvectors and decomposition scratch coexist.
const NEWTON_WORKSPACE_MATRICES: usize = 4;

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
  optimize_newton_with_hessian(
    initial,
    initial_log_density,
    max_iterations,
    &evaluate,
    |parameters, _| finite_difference_hessian(parameters, &evaluate),
  )
}

/// Reuse the same Newton loop with a domain-specific, numerically identical stencil.
/// The complete state, spectral action, line search and termination stay shared.
pub(crate) fn optimize_newton_with_hessian(
  initial: &[f64],
  initial_log_density: f64,
  max_iterations: usize,
  evaluate: impl Fn(&[f64]) -> Result<LogDensityEvaluation, MapObjectiveError>,
  hessian: impl Fn(&[f64], &LogDensityEvaluation) -> Result<Vec<f64>, NewtonError>,
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
    let hessian = hessian(&parameters, &current)?;
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

/// Reserve the aggregate dense workspace before evaluating rows.
///
/// Reserving every matrix together grows linear memory once and turns a real
/// allocation failure into an error instead of an allocator trap. The released
/// pages stay with the allocator for the Newton loop that follows.
pub(crate) fn check_workspace(dimension: usize) -> Result<(), NewtonError> {
  let exhausted = NewtonError::WorkspaceAllocation {
    parameters: dimension,
  };
  let elements = dimension.checked_mul(dimension).ok_or(exhausted)?;

  if newton_workspace_bytes(elements).is_none_or(|bytes| bytes > WASM_MEMORY_LIMIT_BYTES) {
    return Err(exhausted);
  }

  let mut reserved = Vec::with_capacity(NEWTON_WORKSPACE_MATRICES);

  for _ in 0..NEWTON_WORKSPACE_MATRICES {
    let mut matrix = Vec::<f64>::new();
    matrix.try_reserve_exact(elements).map_err(|_| exhausted)?;
    reserved.push(matrix);
  }

  Ok(())
}

fn newton_workspace_bytes(elements: usize) -> Option<u64> {
  u64::try_from(elements)
    .ok()?
    .checked_mul((NEWTON_WORKSPACE_MATRICES * size_of::<f64>()) as u64)
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
  finite_difference_hessian_from_gradients(parameters, |state, _| {
    checked_evaluation(state, evaluate).map(|evaluation| evaluation.gradient)
  })
}

/// Accumulate the pinned four-point stencil, including its rounded off-diagonal
/// entries. The callback supplies a checked full gradient for each perturbation.
pub(crate) fn finite_difference_hessian_from_gradients(
  parameters: &[f64],
  gradient: impl Fn(&[f64], usize) -> Result<Vec<f64>, NewtonError>,
) -> Result<Vec<f64>, NewtonError> {
  let dimension = parameters.len();
  // Newton's workspace reservation owns the memory bound for this matrix.
  let count = dimension
    .checked_mul(dimension)
    .ok_or(NewtonError::SizeOverflow)?;
  let mut hessian = vec![0.0; count];
  let mut perturbed = parameters.to_vec();
  let perturbations = [-2.0, -1.0, 1.0, 2.0];
  let weights = [1.0 / 12.0, -2.0 / 3.0, 2.0 / 3.0, -1.0 / 12.0];

  for column in 0..dimension {
    for (perturbation, weight) in perturbations.into_iter().zip(weights) {
      perturbed[column] = parameters[column] + perturbation * HESSIAN_EPSILON;
      let gradient = gradient(&perturbed, column)?;
      if gradient.len() != dimension {
        return Err(NewtonError::InvalidConfiguration);
      }

      for row in 0..dimension {
        let increment = 0.5 * HESSIAN_EPSILON * weight * gradient[row];
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

pub(crate) fn spectral_direction(
  hessian: &[f64],
  gradient: &[f64],
) -> Result<Vec<f64>, NewtonError> {
  let dimension = gradient.len();
  let matrix = DMatrix::from_row_slice(dimension, dimension, hessian);
  // Preserve the symmetric spectral action without flooring eigenvalues.
  // The bounded owner follows Eigen's QR arithmetic and deflation.
  let max_iterations = dimension.checked_mul(30).ok_or(NewtonError::SizeOverflow)?;
  let (eigenvectors, eigenvalues) = crate::symmetric_eigen::decompose(matrix, max_iterations)?;
  let projected: Vec<f64> = (0..dimension)
    .map(|column| {
      let projection = crate::stan::reductions::matrix_row_sum(dimension, |row| {
        eigenvectors[(row, column)] * gradient[row]
      });

      -projection / eigenvalues[column].abs()
    })
    .collect();

  // Eigen's column-major GEMV restarts its accumulator at the pinned cache
  // block boundary. nalgebra's uninterrupted sum changes the spectral action
  // once the state has 128 coordinates, including its prior-only coordinates.
  let direction = (0..dimension)
    .map(|row| {
      crate::stan::reductions::matrix_column_sum(dimension, dimension, |column| {
        eigenvectors[(row, column)] * projected[column]
      })
    })
    .collect();

  // Stan does not reject an infinite/NaN spectral action here. Such proposals
  // fail the model's domain checks during backtracking, which returns the last
  // finite state at the minimum step. Keep that source no-progress completion.
  Ok(direction)
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
  fn rejects_workspace_beyond_wasm_memory_before_evaluating_the_objective() {
    // 4 * 11_586^2 doubles is the first dimension past 4 GiB.
    let initial = vec![0.0; 11_586];
    let evaluate = |_: &[f64]| -> Result<LogDensityEvaluation, MapObjectiveError> {
      panic!("oversized curvature must fail before objective evaluation")
    };
    assert_eq!(
      optimize_newton(&initial, 0.0, 10, evaluate),
      Err(NewtonError::WorkspaceAllocation { parameters: 11_586 })
    );
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn sizes_the_workspace_against_wasm_memory() {
    let bytes = |dimension: usize| newton_workspace_bytes(dimension * dimension).unwrap();

    assert!(bytes(11_585) <= WASM_MEMORY_LIMIT_BYTES);
    assert!(bytes(11_586) > WASM_MEMORY_LIMIT_BYTES);
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn reserves_workspace_for_prophet_order_1024() {
    // The 4-row, order-1024 flat fit Python completes has 2,053 parameters.
    assert_eq!(check_workspace(2_053), Ok(()));
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
