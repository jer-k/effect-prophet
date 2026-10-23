/**
 * Sum `values[start..end)` the way pandas' `groupby(...).sum()` sums one float64 group: Kahan
 * compensation in row order, resetting a NaN compensation to zero. Prophet's
 * `performance_metrics` totals each horizon group this way, so matching it reproduces Prophet's
 * group sums bit for bit.
 */
export const kahanSum = (values: ReadonlyArray<number>, start: number, end: number): number => {
  let sum = 0;
  let compensation = 0;

  for (let index = start; index < end; index += 1) {
    const corrected = (values[index] ?? Number.NaN) - compensation;
    const next = sum + corrected;

    compensation = next - sum - corrected;

    if (Number.isNaN(compensation)) compensation = 0;
    sum = next;
  }

  return sum;
};
