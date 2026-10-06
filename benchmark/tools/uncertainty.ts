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

/** One row's equal-tailed trend and value bounds, as both adapters project them. */
export interface IntervalBounds {
  readonly trendLower: number;
  readonly trendUpper: number;
  readonly valueLower: number;
  readonly valueUpper: number;
}

/**
 * Monte Carlo allowance for two independent seeded interval estimates, in interval widths per
 * square root of the sample count.
 *
 * The difference of two independent sample quantiles at the 10th/90th percentile has a standard
 * error near 0.94 widths/√S for Gaussian draws and 1.32 widths/√S for Laplace draws. Six allows
 * about 4.5 standard errors for the heavier-tailed trend paths and over 6 for observation noise.
 */
export const intervalWidthsPerRootSample = 6;

/** Point differences allowed for trend and value bounds before any Monte Carlo allowance. */
export interface PointAllowance {
  readonly trend: number;
  readonly value: number;
}

/**
 * Largest bound difference between two libraries as a fraction of its allowance; at most 1 passes.
 * Each bound may differ by the point allowance plus the Monte Carlo allowance for the narrower of
 * the two intervals, so a collapsed or inflated interval cannot widen its own allowance. Returns
 * undefined when the row counts differ.
 */
export const intervalBoundRatio = (
  effect: ReadonlyArray<IntervalBounds>,
  python: ReadonlyArray<IntervalBounds>,
  samples: number,
  point: PointAllowance,
): number | undefined => {
  if (effect.length !== python.length) {
    return undefined;
  }

  const perWidth = intervalWidthsPerRootSample / Math.sqrt(samples);
  let ratio = 0;

  for (const [index, left] of effect.entries()) {
    const right = python[index];

    if (right === undefined) {
      return undefined;
    }

    for (const [kind, lowerKey, upperKey] of [
      ["trend", "trendLower", "trendUpper"],
      ["value", "valueLower", "valueUpper"],
    ] as const) {
      const width = Math.max(
        0,
        Math.min(left[upperKey] - left[lowerKey], right[upperKey] - right[lowerKey]),
      );

      const allowance = point[kind] + perWidth * width;

      for (const key of [lowerKey, upperKey]) {
        const difference = Math.abs(left[key] - right[key]);

        ratio = Math.max(ratio, difference === 0 ? 0 : difference / allowance);
      }
    }
  }

  return ratio;
};
