use crate::fourier::{FourierError, checked_element_count};

/// A checked-by-the-solver dense ridge least-squares problem.
pub struct RidgeLeastSquaresInput<'a> {
  /// Number of observation rows in `design`.
  pub row_count: usize,

  /// Number of model coefficients.
  pub column_count: usize,

  /// Observation design in row-major order.
  pub design: &'a [f64],

  /// One normalized target per observation row.
  pub target: &'a [f64],

  /// Per-column ridge weight. Zero leaves a coefficient unpenalized.
  pub penalty_weights: &'a [f64],
}

/// Coefficients and numerical rank from an augmented ridge solve.
#[derive(Clone, Debug, PartialEq)]
pub struct RidgeLeastSquaresSolution {
  /// Coefficients restored to the input column order.
  pub coefficients: Vec<f64>,

  /// Numerical rank of the augmented matrix.
  pub numerical_rank: usize,
}

/// Expected failures from the dense ridge least-squares solver.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum RidgeSolveError {
  /// Slice lengths or dimensions are inconsistent.
  InvalidDimensions,

  /// A design, target, or penalty value is invalid.
  NonFiniteInput,

  /// The augmented matrix is not numerically full rank.
  RankDeficient {
    augmented_row_count: usize,
    column_count: usize,
    numerical_rank: usize,
  },

  /// Matrix dimensions overflow or exceed the documented dense-buffer limit.
  SizeOverflow,

  /// Factorization or substitution produced a non-finite result.
  NonFiniteResult,
}

/// Solve ridge least squares using augmented, column-pivoted Householder QR.
///
/// The augmented problem is `[X; R] θ ≈ [y; 0]`, where each positive entry in
/// `penalty_weights` contributes one diagonal row to `R`. Rank uses the stable
/// rule `epsilon * max(augmented_rows, columns) * max(abs(diag(R_qr)))`.
pub fn solve_ridge_least_squares(
  input: RidgeLeastSquaresInput<'_>,
) -> Result<RidgeLeastSquaresSolution, RidgeSolveError> {
  validate_input(&input)?;

  if input.column_count == 0 {
    return Ok(RidgeLeastSquaresSolution {
      coefficients: Vec::new(),
      numerical_rank: 0,
    });
  }

  let penalty_row_count = input
    .penalty_weights
    .iter()
    .filter(|&&weight| weight > 0.0)
    .count();
  let augmented_row_count = input
    .row_count
    .checked_add(penalty_row_count)
    .ok_or(RidgeSolveError::SizeOverflow)?;

  let augmented_element_count =
    checked_element_count(augmented_row_count, input.column_count).map_err(map_size_error)?;
  let mut matrix = vec![0.0; augmented_element_count];
  let mut target = vec![0.0; augmented_row_count];

  matrix[..input.design.len()].copy_from_slice(input.design);
  target[..input.target.len()].copy_from_slice(input.target);

  let mut penalty_row = input.row_count;

  for (column, &weight) in input.penalty_weights.iter().enumerate() {
    if weight == 0.0 {
      continue;
    }

    matrix[penalty_row * input.column_count + column] = weight;
    penalty_row += 1;
  }

  let mut permutation: Vec<usize> = (0..input.column_count).collect();
  factorize_with_column_pivoting(
    &mut matrix,
    &mut target,
    augmented_row_count,
    input.column_count,
    &mut permutation,
  )?;

  let diagonal_count = augmented_row_count.min(input.column_count);
  let largest_diagonal = (0..diagonal_count)
    .map(|index| matrix[index * input.column_count + index].abs())
    .fold(0.0_f64, f64::max);
  let rank_threshold =
    f64::EPSILON * augmented_row_count.max(input.column_count) as f64 * largest_diagonal;
  let numerical_rank = (0..diagonal_count)
    .filter(|&index| matrix[index * input.column_count + index].abs() > rank_threshold)
    .count();

  if numerical_rank != input.column_count {
    return Err(RidgeSolveError::RankDeficient {
      augmented_row_count,
      column_count: input.column_count,
      numerical_rank,
    });
  }

  let permuted_coefficients =
    back_substitute(&matrix, &target, input.column_count, input.column_count)?;
  let mut coefficients = vec![0.0; input.column_count];

  for (pivoted_column, &original_column) in permutation.iter().enumerate() {
    coefficients[original_column] = permuted_coefficients[pivoted_column];
  }

  if coefficients
    .iter()
    .any(|coefficient| !coefficient.is_finite())
  {
    return Err(RidgeSolveError::NonFiniteResult);
  }

  Ok(RidgeLeastSquaresSolution {
    coefficients,
    numerical_rank,
  })
}

fn validate_input(input: &RidgeLeastSquaresInput<'_>) -> Result<(), RidgeSolveError> {
  let expected_design_length = input
    .row_count
    .checked_mul(input.column_count)
    .ok_or(RidgeSolveError::SizeOverflow)?;

  if input.design.len() != expected_design_length
    || input.target.len() != input.row_count
    || input.penalty_weights.len() != input.column_count
  {
    return Err(RidgeSolveError::InvalidDimensions);
  }

  if input.design.iter().any(|value| !value.is_finite())
    || input.target.iter().any(|value| !value.is_finite())
    || input
      .penalty_weights
      .iter()
      .any(|weight| !weight.is_finite() || *weight < 0.0)
  {
    return Err(RidgeSolveError::NonFiniteInput);
  }

  Ok(())
}

fn factorize_with_column_pivoting(
  matrix: &mut [f64],
  target: &mut [f64],
  row_count: usize,
  column_count: usize,
  permutation: &mut [usize],
) -> Result<(), RidgeSolveError> {
  for step in 0..column_count.min(row_count) {
    let pivot = (step..column_count)
      .max_by(|&left, &right| {
        trailing_column_norm(matrix, row_count, column_count, step, left).total_cmp(
          &trailing_column_norm(matrix, row_count, column_count, step, right),
        )
      })
      .ok_or(RidgeSolveError::InvalidDimensions)?;

    if pivot != step {
      swap_columns(matrix, row_count, column_count, step, pivot);
      permutation.swap(step, pivot);
    }

    apply_householder(matrix, target, row_count, column_count, step)?;
  }

  Ok(())
}

fn trailing_column_norm(
  matrix: &[f64],
  row_count: usize,
  column_count: usize,
  first_row: usize,
  column: usize,
) -> f64 {
  let mut norm = 0.0_f64;

  for row in first_row..row_count {
    norm = norm.hypot(matrix[row * column_count + column]);
  }

  norm
}

fn swap_columns(
  matrix: &mut [f64],
  row_count: usize,
  column_count: usize,
  left: usize,
  right: usize,
) {
  for row in 0..row_count {
    matrix.swap(row * column_count + left, row * column_count + right);
  }
}

fn apply_householder(
  matrix: &mut [f64],
  target: &mut [f64],
  row_count: usize,
  column_count: usize,
  step: usize,
) -> Result<(), RidgeSolveError> {
  let diagonal_index = step * column_count + step;
  let alpha = matrix[diagonal_index];
  let mut tail_norm = 0.0_f64;

  for row in (step + 1)..row_count {
    tail_norm = tail_norm.hypot(matrix[row * column_count + step]);
  }

  if tail_norm == 0.0 {
    return Ok(());
  }

  let norm = alpha.hypot(tail_norm);
  let beta = if alpha <= 0.0 { norm } else { -norm };
  let tau = (beta - alpha) / beta;
  let inverse_head = 1.0 / (alpha - beta);

  if !beta.is_finite() || !tau.is_finite() || !inverse_head.is_finite() {
    return Err(RidgeSolveError::NonFiniteResult);
  }

  for row in (step + 1)..row_count {
    matrix[row * column_count + step] *= inverse_head;
  }

  matrix[diagonal_index] = beta;

  for column in (step + 1)..column_count {
    let mut projection = matrix[step * column_count + column];

    for row in (step + 1)..row_count {
      projection += matrix[row * column_count + step] * matrix[row * column_count + column];
    }

    projection *= tau;
    matrix[step * column_count + column] -= projection;

    for row in (step + 1)..row_count {
      let index = row * column_count + column;
      matrix[index] -= matrix[row * column_count + step] * projection;
    }
  }

  let mut target_projection = target[step];

  for row in (step + 1)..row_count {
    target_projection += matrix[row * column_count + step] * target[row];
  }

  target_projection *= tau;
  target[step] -= target_projection;

  for row in (step + 1)..row_count {
    target[row] -= matrix[row * column_count + step] * target_projection;
  }

  if target.iter().any(|value| !value.is_finite()) {
    return Err(RidgeSolveError::NonFiniteResult);
  }

  Ok(())
}

fn back_substitute(
  matrix: &[f64],
  target: &[f64],
  row_stride: usize,
  column_count: usize,
) -> Result<Vec<f64>, RidgeSolveError> {
  let mut coefficients = vec![0.0; column_count];

  for row in (0..column_count).rev() {
    let mut remainder = target[row];

    for column in (row + 1)..column_count {
      remainder -= matrix[row * row_stride + column] * coefficients[column];
    }

    coefficients[row] = remainder / matrix[row * row_stride + row];

    if !coefficients[row].is_finite() {
      return Err(RidgeSolveError::NonFiniteResult);
    }
  }

  Ok(coefficients)
}

fn map_size_error(error: FourierError) -> RidgeSolveError {
  match error {
    FourierError::SizeOverflow | FourierError::SizeLimitExceeded => RidgeSolveError::SizeOverflow,
    _ => RidgeSolveError::InvalidDimensions,
  }
}

#[cfg(test)]
mod tests {
  use super::{RidgeLeastSquaresInput, RidgeSolveError, solve_ridge_least_squares};

  fn assert_close(actual: f64, expected: f64, tolerance: f64) {
    assert!(
      (actual - expected).abs() <= tolerance,
      "expected {actual} to be within {tolerance} of {expected}"
    );
  }

  #[test]
  fn solves_an_unpenalized_exact_line() {
    let design = [1.0, 0.0, 1.0, 0.5, 1.0, 1.0];
    let target = [2.0, 5.0, 8.0];
    let solution = solve_ridge_least_squares(RidgeLeastSquaresInput {
      row_count: 3,
      column_count: 2,
      design: &design,
      target: &target,
      penalty_weights: &[0.0, 0.0],
    })
    .expect("the line has full rank");

    assert_close(solution.coefficients[0], 2.0, 1e-12);
    assert_close(solution.coefficients[1], 6.0, 1e-12);
    assert_eq!(solution.numerical_rank, 2);
  }

  #[test]
  fn solves_a_hand_computable_ridge_coefficient() {
    let solution = solve_ridge_least_squares(RidgeLeastSquaresInput {
      row_count: 1,
      column_count: 1,
      design: &[2.0],
      target: &[4.0],
      penalty_weights: &[1.0],
    })
    .expect("the augmented column has full rank");

    // (2 * 4) / (2^2 + 1^2)
    assert_close(solution.coefficients[0], 1.6, 1e-12);
  }

  #[test]
  fn unpermutes_pivoted_columns() {
    let solution = solve_ridge_least_squares(RidgeLeastSquaresInput {
      row_count: 3,
      column_count: 2,
      design: &[0.001, 1.0, 0.002, 0.0, 0.003, 1.0],
      target: &[2.001, 0.002, 2.003],
      penalty_weights: &[0.0, 0.0],
    })
    .expect("independent columns should solve");

    assert_close(solution.coefficients[0], 1.0, 1e-10);
    assert_close(solution.coefficients[1], 2.0, 1e-10);
  }

  #[test]
  fn ridge_identifies_more_columns_than_observations() {
    let solution = solve_ridge_least_squares(RidgeLeastSquaresInput {
      row_count: 2,
      column_count: 4,
      design: &[1.0, 0.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0],
      target: &[2.0, 5.0],
      penalty_weights: &[0.0, 0.0, 1.0, 1.0],
    })
    .expect("penalty rows identify the seasonal columns");

    assert_close(solution.coefficients[0], 2.0, 1e-11);
    assert_close(solution.coefficients[1], 3.0, 1e-11);
    assert_close(solution.coefficients[2], 0.0, 1e-11);
    assert_close(solution.coefficients[3], 0.0, 1e-11);
    assert_eq!(solution.numerical_rank, 4);
  }

  #[test]
  fn rejects_rank_deficiency_and_invalid_input() {
    assert_eq!(
      solve_ridge_least_squares(RidgeLeastSquaresInput {
        row_count: 2,
        column_count: 2,
        design: &[1.0, 1.0, 1.0, 1.0],
        target: &[1.0, 2.0],
        penalty_weights: &[0.0, 0.0],
      }),
      Err(RidgeSolveError::RankDeficient {
        augmented_row_count: 2,
        column_count: 2,
        numerical_rank: 1,
      })
    );
    assert_eq!(
      solve_ridge_least_squares(RidgeLeastSquaresInput {
        row_count: 1,
        column_count: 2,
        design: &[1.0, 2.0],
        target: &[1.0],
        penalty_weights: &[0.0, 0.0],
      }),
      Err(RidgeSolveError::RankDeficient {
        augmented_row_count: 1,
        column_count: 2,
        numerical_rank: 1,
      })
    );

    assert_eq!(
      solve_ridge_least_squares(RidgeLeastSquaresInput {
        row_count: 1,
        column_count: 1,
        design: &[f64::NAN],
        target: &[1.0],
        penalty_weights: &[0.0],
      }),
      Err(RidgeSolveError::NonFiniteInput)
    );
  }
}
