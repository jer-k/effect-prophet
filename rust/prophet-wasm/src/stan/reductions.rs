//! Deterministic scalar and double-packet reduction orders for Eigen 3.4.
//! Math 58ad15b0847485d523aadd22cbae7add0a61b0e3 vendors Eigen 3.4.0.
//! Keep reduction grouping consistent in WASM without CPU-dependent SIMD/BLAS.

/// Forward column-major GEMV accumulates columns in Eigen's stride-sized blocks.
/// Express its 32000-byte heuristic in rows to avoid overflowing byte counts.
pub(crate) fn matrix_column_sum(
  row_count: usize,
  count: usize,
  value: impl Fn(usize) -> f64,
) -> f64 {
  let block = if count < 128 {
    count.max(1)
  } else if row_count < 4000 {
    16
  } else {
    4
  };

  let mut total = 0.0;
  for start in (0..count).step_by(block) {
    let mut accumulator = 0.0;
    for column in start..(start + block).min(count) {
      accumulator += value(column);
    }
    total += accumulator;
  }

  total
}

/// Products consuming variable-adjoint views have no packet access. Retain
/// scalar row order for their reductions, distinct from double-valued GLM work.
pub(crate) fn matrix_adjoint_sum(count: usize, value: impl Fn(usize) -> f64) -> f64 {
  let mut total = 0.0;
  for index in 0..count {
    total += value(index);
  }

  total
}

/// Row-major GEMV uses one two-double accumulator, unlike scalar Redux's two.
pub(crate) fn matrix_row_sum(count: usize, value: impl Fn(usize) -> f64) -> f64 {
  let end = count / 2 * 2;
  let mut even = 0.0;
  let mut odd = 0.0;
  for index in (0..end).step_by(2) {
    even += value(index);
    odd += value(index + 1);
  }
  let mut total = even + odd;
  if count > end {
    total += value(end);
  }
  total
}

pub(crate) fn sum(count: usize, value: impl Fn(usize) -> f64) -> f64 {
  if count < 2 {
    return if count == 0 { 0.0 } else { value(0) };
  }
  let end_four = count / 4 * 4;
  let end_two = count / 2 * 2;
  let mut even = value(0);
  let mut odd = value(1);
  if count >= 4 {
    let mut second_even = value(2);
    let mut second_odd = value(3);
    for index in (4..end_four).step_by(4) {
      even += value(index);
      odd += value(index + 1);
      second_even += value(index + 2);
      second_odd += value(index + 3);
    }
    even += second_even;
    odd += second_odd;
    if end_two > end_four {
      even += value(end_four);
      odd += value(end_four + 1);
    }
  }
  let mut total = even + odd;
  if count > end_two {
    total += value(end_two);
  }
  total
}
