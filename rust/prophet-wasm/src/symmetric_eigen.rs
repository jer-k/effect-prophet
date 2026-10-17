// SPDX-License-Identifier: Apache-2.0 AND MPL-2.0
//! Symmetric spectral decomposition for the Stan Newton direction.
//!
//! Householder tridiagonalization and Q assembly are adapted from nalgebra
//! 0.34.1 (Apache-2.0), Copyright the nalgebra authors, including Sebastien Crozet.
//! The QR iteration follows Eigen 3.4.0's SelfAdjointEigenSolver.h and Jacobi.h
//! (MPL-2.0), including deflation and arithmetic grouping, without a terminal
//! atan2 substitution. Eigen copyrights: Gael Guennebaud (2008-2010),
//! Jitse Niesen (2010), Benoit Jacob (2009).
//! Modified: bounded pure Rust, real scalars, contiguous fused rank updates and
//! column rotations. Pinned nalgebra normalization and reductions are reused.
//! This Source Code Form is subject to the terms of the Mozilla Public License,
//! v. 2.0. See third-party/eigen-license.txt or https://mozilla.org/MPL/2.0/.

use nalgebra::{DMatrix, DVector, DVectorView, linalg::householder};

#[cfg(test)]
mod reference;

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

  let (mut vectors, mut diagonal, mut off_diagonal) = tridiagonalize(matrix);
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

/// nalgebra 0.34.1's Householder arithmetic, with the three lower-triangle
/// rank updates fused per entry. Each entry retains all three rounded updates
/// in their original order; neither a reduction nor a product is reassociated.
#[allow(clippy::assign_op_pattern, clippy::neg_multiply)] // Preserve pinned operand order.
fn tridiagonalize(mut matrix: DMatrix<f64>) -> (DMatrix<f64>, DVector<f64>, DVector<f64>) {
  let dimension = matrix.nrows();
  let mut off_diagonal = DVector::zeros(dimension - 1);
  let mut work = DVector::zeros(dimension - 1);

  for step in 0..dimension - 1 {
    let (mut axis, mut tail) = matrix.columns_range_pair_mut(step, step + 1..);
    let mut axis = axis.rows_range_mut(step + 1..);
    let mut tail = tail.rows_range_mut(step + 1..);
    let (norm, not_zero) = householder::reflection_axis_mut(&mut axis);
    off_diagonal[step] = norm;

    if !not_zero {
      continue;
    }

    let mut work = work.rows_range_mut(step..);
    work.hegemv(2.0, &tail, &axis, 0.0);
    let dot = axis.dotc(&work);
    let axis = axis.as_slice();
    let work = work.as_slice();

    for column in 0..tail.ncols() {
      let first = -1.0 * axis[column];
      let second = -1.0 * work[column];
      let third = (dot * 2.0) * axis[column];
      let mut target = tail.column_mut(column);

      let (entries, remainder) = target.as_mut_slice()[column..].as_chunks_mut::<8>();
      let (p, p_tail) = work[column..].as_chunks::<8>();
      let (u, u_tail) = axis[column..].as_chunks::<8>();

      for ((entries, p), u) in entries.iter_mut().zip(p).zip(u) {
        for lane in 0..8 {
          entries[lane] = first * p[lane] + entries[lane];
          entries[lane] = second * u[lane] + entries[lane];
          entries[lane] = third * u[lane] + entries[lane];
        }
      }

      for ((entry, &p), &u) in remainder.iter_mut().zip(p_tail).zip(u_tail) {
        *entry = first * p + *entry;
        *entry = second * u + *entry;
        *entry = third * u + *entry;
      }
    }
  }

  let diagonal = matrix.diagonal();
  let mut vectors = DMatrix::identity(dimension, dimension);

  for step in (0..dimension - 1).rev() {
    let axis = matrix.column(step);
    let axis = &axis.as_slice()[step + 1..];
    let sign = off_diagonal[step].signum();

    for column in vectors
      .as_mut_slice()
      .chunks_exact_mut(dimension)
      .skip(step)
    {
      let target = &mut column[step + 1..];
      // Keep nalgebra's eight-lane dot reduction, including its signed zeros.
      let dot = DVectorView::from_slice(axis, axis.len())
        .dotc(&DVectorView::from_slice(target, target.len()));
      let factor = (dot - 0.0) * (sign * -2.0);

      let (entries, remainder) = target.as_chunks_mut::<8>();
      let (axes, axis_tail) = axis.as_chunks::<8>();

      for (entries, axes) in entries.iter_mut().zip(axes) {
        for lane in 0..8 {
          entries[lane] = factor * axes[lane] + sign * entries[lane];
        }
      }

      for (entry, &axis) in remainder.iter_mut().zip(axis_tail) {
        *entry = factor * axis + sign * *entry;
      }
    }
  }

  for value in off_diagonal.iter_mut() {
    *value = value.abs();
  }

  (vectors, diagonal, off_diagonal)
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
  let dimension = vectors.nrows();
  let (left, right) = vectors
    .as_mut_slice()
    .split_at_mut((column + 1) * dimension);
  let first = &mut left[column * dimension..];
  let second = &mut right[..dimension];

  for (x, y) in first.iter_mut().zip(second) {
    let previous_x = *x;
    let previous_y = *y;
    *x = cosine * previous_x + sine * previous_y;
    *y = -sine * previous_x + cosine * previous_y;
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  fn assert_reference_bits(matrix: DMatrix<f64>) {
    let budget = 30 * matrix.nrows();
    let (expected_vectors, expected_values) = reference::decompose(matrix.clone(), budget).unwrap();
    let (vectors, values) = decompose(matrix, budget).unwrap();

    for (index, (actual, expected)) in vectors.iter().zip(&expected_vectors).enumerate() {
      assert_eq!(
        actual.to_bits(),
        expected.to_bits(),
        "eigenvector entry {index}"
      );
    }

    for (index, (actual, expected)) in values.iter().zip(&expected_values).enumerate() {
      assert_eq!(actual.to_bits(), expected.to_bits(), "eigenvalue {index}");
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn eigenpairs_match_pre_optimization_bits() {
    for dimension in [1, 2, 3, 5, 17, 29, 64] {
      let matrix = DMatrix::from_fn(dimension, dimension, |row, column| {
        let low = row.min(column);
        let high = row.max(column);
        ((low * 17 + high * 31 + 1) as f64).sin() * 1e-6
      });
      assert_reference_bits(matrix);
      assert_reference_bits(DMatrix::identity(dimension, dimension));
      assert_reference_bits(DMatrix::zeros(dimension, dimension));
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn large_fourier_hessian_eigenpairs_match_pre_optimization_bits() {
    use crate::fourier::{FourierSeasonality, make_fourier_features};
    use crate::map_objective::{StanFlatObjective, StanLinearObjective};
    use crate::mixed_map::ComponentMode;
    use crate::stan::linear_optimizer::StanMapObjective;
    use crate::stan::optimizer::finite_difference_hessian;

    let target = [1.0 / 3.0, 2.0 / 3.0, 0.5, 1.0];
    let timestamps = [0.0, 86_400_000.0, 172_800_000.0, 259_200_000.0];

    for order in [128, 256] {
      let features = make_fourier_features(
        &timestamps,
        &[FourierSeasonality {
          period_days: 7.0,
          fourier_order: order,
        }],
      )
      .unwrap();
      let columns = 2 * order;
      let priors = vec![10.0; columns];
      let modes = vec![ComponentMode::Additive; columns];
      let mut flat_design = Vec::new();
      let mut linear_design = Vec::new();

      for row in 0..4 {
        let time = row as f64 / 3.0;
        let values = &features.values()[row * columns..(row + 1) * columns];
        flat_design.extend_from_slice(&[1.0, 0.0]);
        flat_design.extend_from_slice(values);
        linear_design.extend_from_slice(&[
          1.0,
          time,
          (time - 1.0 / 3.0).max(0.0),
          (time - 2.0 / 3.0).max(0.0),
        ]);
        linear_design.extend_from_slice(values);
      }

      let flat = StanFlatObjective::new(&flat_design, &target, &priors, &modes, 0.05).unwrap();
      let initial = flat.initial_parameters();
      let hessian = finite_difference_hessian(&initial, &|point| flat.evaluate(point)).unwrap();
      assert_reference_bits(DMatrix::from_row_slice(
        initial.len(),
        initial.len(),
        &hessian,
      ));

      let linear = StanLinearObjective::new(
        &linear_design,
        &target,
        &[1.0 / 3.0, 2.0 / 3.0],
        &priors,
        &modes,
        0.05,
      )
      .unwrap();
      let initial = linear.initial_parameters();
      let hessian = finite_difference_hessian(&initial, &|point| linear.evaluate(point)).unwrap();
      assert_reference_bits(DMatrix::from_row_slice(
        initial.len(),
        initial.len(),
        &hessian,
      ));
    }
  }

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
