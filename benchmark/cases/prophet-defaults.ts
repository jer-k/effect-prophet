/** Python Prophet's own fitting defaults, saving 12 significant digits for comparison. */
export const pythonDefaultOptimizer = {
  algorithm: "Auto",
  maxIterations: 10_000,
  newtonFallback: true,
  sigFigs: 12,
} as const;

/**
 * Forecasts, components, noise and persistence gate each case. Fitting objective, normalized noise
 * and stationarity are reported, and gaps beyond these thresholds are flagged for investigation.
 */
export const outputFirstQuality = {
  kind: "output-first",
  investigate: {
    objectiveAbsolute: 0.01,
    normalizedNoiseAbsolute: 0.0002,
    stationarityExcess: 0.01,
  },
} as const;
