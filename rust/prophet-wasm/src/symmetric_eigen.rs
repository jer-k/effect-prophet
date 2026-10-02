// SPDX-License-Identifier: Apache-2.0
//! Symmetric spectral decomposition for the Stan Newton direction.
//!
//! The QR iteration follows nalgebra 0.34.1's symmetric_eigen.rs (Apache-2.0).
//! Householder tridiagonalization is reused from that pinned dependency. The
//! terminal 2×2 rotation uses atan2 rather than a cancellation-prone eigenvalue
//! difference. See `third-party/nalgebra-license.txt`.

use nalgebra::{DMatrix, DVector, SymmetricTridiagonal};

use crate::stan::optimizer::NewtonError;

pub(crate) fn decompose(
  mut matrix: DMatrix<f64>,
  max_iterations: usize,
) -> Result<(DMatrix<f64>, DVector<f64>), NewtonError> {
  let dimension = matrix.nrows();
  let scale = matrix.iter().map(|value| value.abs()).fold(0.0, f64::max);

  if scale != 0.0 {
    matrix /= scale;
  }

  let (mut vectors, mut diagonal, mut off_diagonal) = SymmetricTridiagonal::new(matrix).unpack();
  let (mut start, mut end) = delimit(&diagonal, &mut off_diagonal, dimension - 1);
  let mut iterations = 0;

  while end != start {
    if iterations == max_iterations {
      return Err(NewtonError::CurvatureFailure);
    }

    if end - start == 1 {
      let a = diagonal[start];
      let b = off_diagonal[start];
      let d = diagonal[end];
      let angle = 0.5 * (2.0 * b).atan2(a - d);
      let (sine, cosine) = angle.sin_cos();
      let twice_cross = 2.0 * cosine * sine * b;
      diagonal[start] = cosine * cosine * a + sine * sine * d + twice_cross;
      diagonal[end] = sine * sine * a + cosine * cosine * d - twice_cross;
      off_diagonal[start] = 0.0;
      rotate_columns(&mut vectors, start, cosine, sine);
    } else {
      let gap = 0.5 * (diagonal[end - 1] - diagonal[end]);
      let b = off_diagonal[end - 1];
      let sign = if gap < 0.0 { -1.0 } else { 1.0 };
      let shift = diagonal[end] - b * b / (gap + sign * gap.hypot(b));
      let mut x = diagonal[start] - shift;
      let mut y = off_diagonal[start];

      for column in start..end {
        let norm = x.hypot(y);

        if norm == 0.0 {
          break;
        }

        let cosine = x / norm;
        let sine = y / norm;

        if column > start {
          off_diagonal[column - 1] = norm;
        }

        let a = diagonal[column];
        let d = diagonal[column + 1];
        let b = off_diagonal[column];
        let twice_cross = 2.0 * cosine * sine * b;
        diagonal[column] = cosine * cosine * a + sine * sine * d + twice_cross;
        diagonal[column + 1] = sine * sine * a + cosine * cosine * d - twice_cross;
        off_diagonal[column] = cosine * sine * (d - a) + b * (cosine * cosine - sine * sine);

        if column != end - 1 {
          x = off_diagonal[column];
          y = sine * off_diagonal[column + 1];
          off_diagonal[column + 1] *= cosine;
        }

        rotate_columns(&mut vectors, column, cosine, sine);
      }
    }

    (start, end) = delimit(&diagonal, &mut off_diagonal, end);
    iterations += 1;
  }

  diagonal *= scale;

  if vectors
    .iter()
    .chain(diagonal.iter())
    .any(|value| !value.is_finite())
  {
    return Err(NewtonError::NonFiniteResult);
  }

  // Eigen's SelfAdjointEigenSolver returns ascending eigenpairs. Preserve that
  // ordering before the spectral projection: its floating reduction order is
  // observable in tightly coupled Newton trajectories.
  for column in 0..dimension {
    let mut minimum = column;

    for candidate in column + 1..dimension {
      if diagonal[candidate] < diagonal[minimum] {
        minimum = candidate;
      }
    }

    if minimum != column {
      diagonal.swap_rows(column, minimum);
      vectors.swap_columns(column, minimum);
    }
  }

  Ok((vectors, diagonal))
}

fn delimit(
  diagonal: &DVector<f64>,
  off_diagonal: &mut DVector<f64>,
  mut end: usize,
) -> (usize, usize) {
  while end > 0 {
    let threshold = f64::EPSILON * (diagonal[end].abs() + diagonal[end - 1].abs());

    if off_diagonal[end - 1].abs() > threshold {
      break;
    }

    off_diagonal[end - 1] = 0.0;
    end -= 1;
  }

  if end == 0 {
    return (0, 0);
  }

  let mut start = end - 1;

  while start > 0 {
    let threshold = f64::EPSILON * (diagonal[start].abs() + diagonal[start - 1].abs());

    if off_diagonal[start - 1].abs() <= threshold {
      off_diagonal[start - 1] = 0.0;
      break;
    }

    start -= 1;
  }

  (start, end)
}

fn rotate_columns(vectors: &mut DMatrix<f64>, column: usize, cosine: f64, sine: f64) {
  for row in 0..vectors.nrows() {
    let x = vectors[(row, column)];
    let y = vectors[(row, column + 1)];
    vectors[(row, column)] = cosine * x + sine * y;
    vectors[(row, column + 1)] = -sine * x + cosine * y;
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn preserves_orthogonality_and_reconstructs_unequal_and_repeated_curvature() {
    for dimension in [1, 2, 5, 29] {
      let mut basis = DMatrix::identity(dimension, dimension);

      for column in 0..dimension.saturating_sub(1) {
        let (sine, cosine) = (0.31 * (column + 1) as f64).sin_cos();
        rotate_columns(&mut basis, column, cosine, sine);
      }

      let values = DVector::from_iterator(
        dimension,
        (0..dimension).map(|column| {
          if column % 3 == 0 {
            -0.023333533333
          } else {
            1e-6
          }
        }),
      );
      let matrix = &basis * DMatrix::from_diagonal(&values) * basis.transpose();
      let (vectors, diagonal) = decompose(matrix.clone(), 30 * dimension).unwrap();
      assert!(
        diagonal
          .as_slice()
          .windows(2)
          .all(|pair| pair[0] <= pair[1])
      );

      let reconstructed = &vectors * DMatrix::from_diagonal(&diagonal) * vectors.transpose();
      let orthogonal = vectors.transpose() * vectors;

      for row in 0..dimension {
        for column in 0..dimension {
          assert!((reconstructed[(row, column)] - matrix[(row, column)]).abs() < 1e-12);
          let expected = if row == column { 1.0 } else { 0.0 };
          assert!((orthogonal[(row, column)] - expected).abs() < 1e-12);
        }
      }
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn returns_a_typed_curvature_failure_at_its_numerical_work_limit() {
    let matrix = DMatrix::from_row_slice(2, 2, &[1.0, 0.5, 0.5, 1.0]);
    assert_eq!(decompose(matrix, 0), Err(NewtonError::CurvatureFailure));
  }
}
