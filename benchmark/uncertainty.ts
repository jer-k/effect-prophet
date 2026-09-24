/** Equal-tailed linear-interpolated percentile of one finite sample row. */
export const percentile = (values: ArrayLike<number>, probability: number): number => {
  const sorted = Array.from(values).sort((a, b) => a - b);

  if (sorted.length === 0 || sorted.some((value) => !Number.isFinite(value))) {
    throw new Error("Uncertainty samples must be nonempty and finite");
  }

  const position = (sorted.length - 1) * probability;

  const lower = Math.floor(position);
  const left = sorted[lower];
  const right = sorted[Math.ceil(position)];

  if (left === undefined || right === undefined) {
    throw new Error("Invalid uncertainty percentile");
  }

  return left + (right - left) * (position - lower);
};
