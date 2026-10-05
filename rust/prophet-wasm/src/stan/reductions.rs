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

/// `matrix_row_sum` for every column of a row-major matrix scaled by a per-row
/// adjoint, in one row-major pass instead of one strided scan per column.
///
/// Column `column` accumulates exactly as
/// `matrix_row_sum(count, |row| row_values(row)[column] * adjoint)` would, where
/// the adjoint is `adjoints(row)[1]` for `alternate[column]` and
/// `adjoints(row)[0]` otherwise. Each pass over a row is a plain elementwise
/// loop, which the compiler can vectorize without reordering any sum.
pub(crate) fn scaled_matrix_row_sums<'a>(
  count: usize,
  alternate: &[bool],
  row_values: impl Fn(usize) -> &'a [f64],
  adjoints: impl Fn(usize) -> [f64; 2],
) -> Vec<f64> {
  let columns = alternate.len();
  let end = count / 2 * 2;
  let mut even = vec![0.0; columns];
  let mut odd = vec![0.0; columns];
  let accumulate = |totals: &mut [f64], row: usize| {
    let [primary, secondary] = adjoints(row);
    let values = &row_values(row)[..columns];
    for ((total, &value), &alternate) in totals.iter_mut().zip(values).zip(alternate) {
      *total += value * if alternate { secondary } else { primary };
    }
  };
  for row in (0..end).step_by(2) {
    accumulate(&mut even, row);
    accumulate(&mut odd, row + 1);
  }
  let mut totals: Vec<f64> = even
    .iter()
    .zip(&odd)
    .map(|(even, odd)| even + odd)
    .collect();
  if count > end {
    accumulate(&mut totals, end);
  }
  totals
}

/// Per row, `initial` plus each `row_values(row)[column] * coefficients[column]`
/// added in column order: into `[1]` for `alternate` columns and `[0]` otherwise.
///
/// A row's sum is a chain of dependent additions, so four rows accumulate side
/// by side to overlap their latency. Each row still adds in the same order.
pub(crate) fn row_split_sums<'a>(
  count: usize,
  alternate: &[bool],
  coefficients: &[f64],
  initial: [f64; 2],
  row_values: impl Fn(usize) -> &'a [f64],
) -> Vec<[f64; 2]> {
  const LANES: usize = 4;
  let full = count / LANES * LANES;
  let mut sums = Vec::with_capacity(count);
  for first in (0..full).step_by(LANES) {
    sums.extend(row_split_lanes::<LANES>(
      first,
      alternate,
      coefficients,
      initial,
      &row_values,
    ));
  }
  for row in full..count {
    sums.extend(row_split_lanes::<1>(
      row,
      alternate,
      coefficients,
      initial,
      &row_values,
    ));
  }
  sums
}

fn row_split_lanes<'a, const L: usize>(
  first: usize,
  alternate: &[bool],
  coefficients: &[f64],
  initial: [f64; 2],
  row_values: &impl Fn(usize) -> &'a [f64],
) -> [[f64; 2]; L] {
  let rows: [&[f64]; L] = std::array::from_fn(|lane| row_values(first + lane));
  let mut primary = [initial[0]; L];
  let mut secondary = [initial[1]; L];
  for (column, (&alternate, &coefficient)) in alternate.iter().zip(coefficients).enumerate() {
    // Separate loops keep both accumulator arrays in registers.
    if alternate {
      for (total, row) in secondary.iter_mut().zip(&rows) {
        *total += row[column] * coefficient;
      }
    } else {
      for (total, row) in primary.iter_mut().zip(&rows) {
        *total += row[column] * coefficient;
      }
    }
  }
  std::array::from_fn(|lane| [primary[lane], secondary[lane]])
}

/// `matrix_row_sum` per column of `K` row values that are nonzero only in each
/// row's active prefix of columns, such as hinge columns of sorted changepoints.
///
/// Column `column` accumulates exactly as `matrix_row_sum` would over values
/// that are `value(row)` where `column < active(row)` and an exact `0.0`
/// elsewhere. Zeros are skipped rather than added: accumulators start at
/// `+0.0`, can never become `-0.0`, and adding `+0.0` to any other value is the
/// identity. One row-major pass replaces a full branching scan per column.
pub(crate) fn matrix_row_prefix_sums<const K: usize>(
  count: usize,
  columns: usize,
  active: impl Fn(usize) -> usize,
  value: impl Fn(usize) -> [f64; K],
) -> Vec<[f64; K]> {
  let end = count / 2 * 2;
  let mut even = vec![[0.0; K]; columns];
  let mut odd = vec![[0.0; K]; columns];
  for row in (0..end).step_by(2) {
    for (accumulators, row) in [(&mut even, row), (&mut odd, row + 1)] {
      let values = value(row);
      for accumulator in &mut accumulators[..active(row)] {
        for index in 0..K {
          accumulator[index] += values[index];
        }
      }
    }
  }
  let tail = (count > end).then(|| (active(end), value(end)));
  even
    .iter()
    .zip(&odd)
    .enumerate()
    .map(|(column, (even, odd))| {
      std::array::from_fn(|index| {
        let mut total = even[index] + odd[index];
        if let Some((prefix, values)) = tail {
          total += if column < prefix { values[index] } else { 0.0 };
        }
        total
      })
    })
    .collect()
}

/// Products consuming variable-adjoint views have no packet access. Retain
/// scalar row order for their reductions, distinct from double-valued GLM work.
/// Values outside each row's active prefix are exact zeros, skipped as in
/// `matrix_row_prefix_sums`.
pub(crate) fn matrix_adjoint_prefix_sums<const K: usize>(
  count: usize,
  columns: usize,
  active: impl Fn(usize) -> usize,
  value: impl Fn(usize) -> [f64; K],
) -> Vec<[f64; K]> {
  let mut totals = vec![[0.0; K]; columns];
  for row in 0..count {
    let values = value(row);
    for total in &mut totals[..active(row)] {
      for index in 0..K {
        total[index] += values[index];
      }
    }
  }
  totals
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

#[cfg(test)]
mod tests {
  use super::*;

  /// Rounding-sensitive values, including signed zeros and cancellation.
  fn values(count: usize, seed: u64) -> Vec<f64> {
    let special = [1e16, 1.0, -1e16, 0.1, -0.0, 0.0, 3.0e-17, -2.5];
    let mut state = seed;
    (0..count)
      .map(|_| {
        state = state
          .wrapping_mul(6364136223846793005)
          .wrapping_add(1442695040888963407);
        special[(state >> 33) as usize % special.len()] * if state & 1 == 0 { 1.0 } else { 7.0 }
      })
      .collect()
  }

  fn prefixes(count: usize, columns: usize, seed: u64) -> Vec<usize> {
    let mut state = seed;
    (0..count)
      .map(|_| {
        state = state
          .wrapping_mul(6364136223846793005)
          .wrapping_add(1442695040888963407);
        (state >> 33) as usize % (columns + 1)
      })
      .collect()
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn scaled_row_sums_match_each_single_column_sum_bitwise() {
    for count in 0..12 {
      let columns = 5;
      let alternate = [false, true, false, false, true];
      let matrix = values(count * columns, count as u64);
      let primary = values(count, count as u64 + 50);
      let secondary = values(count, count as u64 + 60);
      let fused = scaled_matrix_row_sums(
        count,
        &alternate,
        |row| &matrix[row * columns..(row + 1) * columns],
        |row| [primary[row], secondary[row]],
      );

      for (column, total) in fused.iter().enumerate() {
        let expected = matrix_row_sum(count, |row| {
          let adjoint = if alternate[column] {
            secondary[row]
          } else {
            primary[row]
          };
          matrix[row * columns + column] * adjoint
        });
        assert_eq!(
          total.to_bits(),
          expected.to_bits(),
          "count {count} column {column}"
        );
      }
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn row_split_sums_match_each_sequential_row_sum_bitwise() {
    for count in 0..12 {
      let columns = 5;
      let alternate = [false, true, false, true, false];
      let matrix = values(count * columns, count as u64 + 400);
      let coefficients = values(columns, count as u64 + 500);
      let initial = [0.0, 1.0];
      let sums = row_split_sums(count, &alternate, &coefficients, initial, |row| {
        &matrix[row * columns..(row + 1) * columns]
      });

      for (row, [primary, secondary]) in sums.iter().enumerate() {
        let mut expected = initial;
        for column in 0..columns {
          let effect = matrix[row * columns + column] * coefficients[column];
          expected[usize::from(alternate[column])] += effect;
        }
        assert_eq!(
          primary.to_bits(),
          expected[0].to_bits(),
          "count {count} row {row}"
        );
        assert_eq!(
          secondary.to_bits(),
          expected[1].to_bits(),
          "count {count} row {row}"
        );
      }
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn prefix_row_sums_match_masked_single_column_sums_bitwise() {
    for count in 0..12 {
      for seed in 0..8 {
        let columns = 4;
        let active = prefixes(count, columns, seed);
        let first = values(count, seed + 100);
        let second = values(count, seed + 200);
        let fused = matrix_row_prefix_sums(
          count,
          columns,
          |row| active[row],
          |row| [first[row], second[row]],
        );

        for (column, [first_total, second_total]) in fused.iter().enumerate() {
          let masked = |series: &[f64], row: usize| {
            if column < active[row] {
              series[row]
            } else {
              0.0
            }
          };
          let expected_first = matrix_row_sum(count, |row| masked(&first, row));
          let expected_second = matrix_row_sum(count, |row| masked(&second, row));
          assert_eq!(first_total.to_bits(), expected_first.to_bits());
          assert_eq!(second_total.to_bits(), expected_second.to_bits());
        }
      }
    }
  }

  #[cfg_attr(target_arch = "wasm32", wasm_bindgen_test::wasm_bindgen_test)]
  #[cfg_attr(not(target_arch = "wasm32"), test)]
  fn prefix_adjoint_sums_match_masked_scalar_row_order_bitwise() {
    for count in 0..12 {
      for seed in 0..8 {
        let columns = 4;
        let active = prefixes(count, columns, seed);
        let series = values(count, seed + 300);
        let fused =
          matrix_adjoint_prefix_sums(count, columns, |row| active[row], |row| [series[row]]);

        for (column, [total]) in fused.iter().enumerate() {
          let mut expected = 0.0;
          for row in 0..count {
            expected += if column < active[row] {
              series[row]
            } else {
              0.0
            };
          }
          assert_eq!(total.to_bits(), expected.to_bits());
        }
      }
    }
  }
}
