// SPDX-License-Identifier: Apache-2.0 AND MPL-2.0
//! Symmetric spectral decomposition for the Stan Newton direction.
//!
//! Householder tridiagonalization is reused from nalgebra 0.34.1 (Apache-2.0).
//! The QR iteration follows Eigen 3.4.0's SelfAdjointEigenSolver.h and Jacobi.h
//! (MPL-2.0), including deflation and arithmetic grouping, without a terminal
//! atan2 substitution. Eigen copyrights: Gael Guennebaud (2008-2010),
//! Jitse Niesen (2010), Benoit Jacob (2009).
//! Modified: bounded pure Rust, real scalars, nalgebra tridiagonalization.
//! This Source Code Form is subject to the terms of the Mozilla Public License,
//! v. 2.0. See third-party/eigen-license.txt or https://mozilla.org/MPL/2.0/.

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
  let mut start = 0;
  let mut end = dimension - 1;
  let mut iterations = 0;

  while end > 0 {
    for column in start..end {
      let scaled = off_diagonal[column] / f64::EPSILON;
      if off_diagonal[column].abs() < f64::MIN_POSITIVE
        || scaled * scaled <= diagonal[column].abs() + diagonal[column + 1].abs()
      {
        off_diagonal[column] = 0.0;
      }
    }
    while end > 0 && off_diagonal[end - 1] == 0.0 {
      end -= 1;
    }
    if end == 0 {
      break;
    }
    if iterations == max_iterations {
      return Err(NewtonError::CurvatureFailure);
    }
    iterations += 1;
    start = end - 1;
    while start > 0 && off_diagonal[start - 1] != 0.0 {
      start -= 1;
    }

    let gap = (diagonal[end - 1] - diagonal[end]) * 0.5;
    let b = off_diagonal[end - 1];
    let mut shift = diagonal[end];
    if gap == 0.0 {
      shift -= b.abs();
    } else if b != 0.0 {
      let square = b * b;
      // Eigen's numext::hypot uses scaled sqrt, not host-libm hypot.
      let maximum = gap.abs().max(b.abs());
      let ratio = gap.abs().min(b.abs()) / maximum;
      let hypotenuse = maximum * (1.0 + ratio * ratio).sqrt();
      let denominator = gap + if gap > 0.0 { hypotenuse } else { -hypotenuse };
      shift -= if square == 0.0 {
        b / (denominator / b)
      } else {
        square / denominator
      };
    }
    let mut x = diagonal[start] - shift;
    let mut z = off_diagonal[start];

    for column in start..end {
      if z == 0.0 {
        break;
      }
      let (cosine, sine) = givens(x, z);
      let a = diagonal[column];
      let d = diagonal[column + 1];
      let b = off_diagonal[column];
      let first = sine * a + cosine * b;
      let second = sine * b + cosine * d;
      diagonal[column] = cosine * (cosine * a - sine * b) - sine * (cosine * b - sine * d);
      diagonal[column + 1] = sine * first + cosine * second;
      off_diagonal[column] = cosine * first - sine * second;
      if column > start {
        off_diagonal[column - 1] = cosine * off_diagonal[column - 1] - sine * z;
      }
      x = off_diagonal[column];
      if column < end - 1 {
        z = -sine * off_diagonal[column + 1];
        off_diagonal[column + 1] *= cosine;
      }
      rotate_columns(&mut vectors, column, cosine, -sine);
    }
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

fn givens(p: f64, q: f64) -> (f64, f64) {
  if q == 0.0 {
    return (if p < 0.0 { -1.0 } else { 1.0 }, 0.0);
  }
  if p == 0.0 {
    return (0.0, if q < 0.0 { 1.0 } else { -1.0 });
  }
  if p.abs() > q.abs() {
    let t = q / p;
    let u = (1.0 + t * t).sqrt().copysign(p);
    let cosine = 1.0 / u;
    (cosine, -t * cosine)
  } else {
    let t = p / q;
    let u = (1.0 + t * t).sqrt().copysign(q);
    let sine = -1.0 / u;
    (-t * sine, sine)
  }
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
