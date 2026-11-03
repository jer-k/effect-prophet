/**
 * numpy's default `linear` quantile: interpolate between the order statistics around
 * `(count - 1) * probability`, working back from the upper one once its weight reaches one half,
 * and return the largest value at or past the last index.
 *
 * @param count - Number of values.
 * @param probability - Quantile in `[0, 1]`.
 * @param rank - The value with a 1-based rank, in ascending order.
 */
export const linearQuantile = (
  count: number,
  probability: number,
  rank: (rank: number) => number | undefined,
): number | undefined => {
  const virtual = (count - 1) * probability;

  if (virtual >= count - 1) return rank(count);
  const previous = Math.floor(virtual);
  const lower = rank(previous + 1);
  const upper = rank(previous + 2);

  if (lower === undefined || upper === undefined) return undefined;
  const weight = virtual - previous;
  const difference = upper - lower;

  return weight >= 0.5 ? upper - difference * (1 - weight) : lower + difference * weight;
};

/** numpy's `linear` quantile of values already sorted in ascending order. */
export const sortedLinearQuantile = (
  sorted: ArrayLike<number>,
  probability: number,
): number | undefined => linearQuantile(sorted.length, probability, (rank) => sorted[rank - 1]);
