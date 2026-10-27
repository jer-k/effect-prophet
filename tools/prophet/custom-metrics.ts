/**
 * Effect definitions of the custom metrics `custom_metrics.py` registers with Prophet 1.4.0's
 * `register_performance_metric`, under the same names. The Prophet compatibility fixtures and the
 * benchmark's same-input metric gate both score them.
 *
 * Rows are typed structurally so this module works with both the source and the built package.
 */

interface ScoredRow {
  readonly actual: number;
  readonly predicted: number;
}

const absolutePercentageError = (row: ScoredRow) =>
  Math.abs((row.actual - row.predicted) / row.actual);

const apeQuantile = <const Name extends string>(name: Name, probability: number) =>
  ({
    name,
    reduce: { kind: "quantile", probability },
    score: absolutePercentageError,
  }) as const;

/** Every custom metric, in `CUSTOM_METRIC_NAMES` order. */
export const customMetrics = [
  {
    name: "pinball75",
    reduce: "mean",
    score: (row: ScoredRow) => {
      const error = row.actual - row.predicted;

      return Math.max(0.75 * error, -0.25 * error);
    },
  },
  {
    name: "root_mse",
    reduce: "mean",
    score: (row: ScoredRow) => {
      const error = row.actual - row.predicted;

      return error * error;
    },
    finalize: Math.sqrt,
  },
  {
    name: "wape",
    reduce: "ratio-of-means",
    score: (row: ScoredRow): readonly [number, number] => [
      Math.abs(row.actual - row.predicted),
      Math.abs(row.actual),
    ],
  },
  apeQuantile("ape_q0", 0),
  apeQuantile("ape_q30", 0.3),
  apeQuantile("ape_q50", 0.5),
  apeQuantile("ape_q90", 0.9),
  apeQuantile("ape_q100", 1),
] as const;
