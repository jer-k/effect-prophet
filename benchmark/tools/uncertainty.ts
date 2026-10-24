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

/** One library's flagged anomaly rows, as indexes into the interval rows. */
export interface AnomalyEvidence {
  readonly rows: number;
  readonly flagged: ReadonlyArray<{
    readonly index: number;
    readonly timestamp: number;
    readonly actual: number;
  }>;
}

/** How two libraries' in-sample anomaly flags compare for one run. */
export type AnomalyAgreement =
  | { readonly kind: "inconsistent" }
  | {
      readonly kind: "compared";
      readonly effectFlagged: number;
      readonly pythonFlagged: number;
      /** Rows only one library flagged; their actuals lie between the two libraries' bounds. */
      readonly oneSided: number;
      /** Declared outliers at least one library did not flag. */
      readonly missedExpected: ReadonlyArray<number>;
    };

const flagsOutsideOwnIntervals = (
  evidence: AnomalyEvidence,
  intervals: ReadonlyArray<IntervalBounds>,
): boolean =>
  evidence.rows === intervals.length &&
  evidence.flagged.every(({ index, actual }, position) => {
    const bounds = intervals[index];

    return (
      bounds !== undefined &&
      (position === 0 || index > (evidence.flagged[position - 1]?.index ?? Infinity)) &&
      (actual < bounds.valueLower || actual > bounds.valueUpper)
    );
  });

/**
 * Compare in-sample anomaly flags. Each library's flags must be strictly outside its own value
 * intervals, so a row flagged by only one of them always lies between their two bounds: whether
 * that is acceptable is decided by the interval-bound gate, not here. Every declared outlier must
 * be flagged by both.
 */
export const anomalyAgreement = (
  effect: AnomalyEvidence,
  python: AnomalyEvidence,
  effectIntervals: ReadonlyArray<IntervalBounds>,
  pythonIntervals: ReadonlyArray<IntervalBounds>,
  expected: ReadonlyArray<number>,
): AnomalyAgreement => {
  if (
    effect.rows !== python.rows ||
    !flagsOutsideOwnIntervals(effect, effectIntervals) ||
    !flagsOutsideOwnIntervals(python, pythonIntervals)
  ) {
    return { kind: "inconsistent" };
  }

  const effectIndexes = new Set(effect.flagged.map((row) => row.index));
  const pythonIndexes = new Set(python.flagged.map((row) => row.index));
  const shared = [...effectIndexes].filter((index) => pythonIndexes.has(index)).length;

  const flaggedAt = (evidence: AnomalyEvidence, timestamp: number) =>
    evidence.flagged.some((row) => row.timestamp === timestamp);

  return {
    kind: "compared",
    effectFlagged: effectIndexes.size,
    pythonFlagged: pythonIndexes.size,
    oneSided: effectIndexes.size + pythonIndexes.size - 2 * shared,
    missedExpected: expected.filter(
      (timestamp) => !flaggedAt(effect, timestamp) || !flaggedAt(python, timestamp),
    ),
  };
};
