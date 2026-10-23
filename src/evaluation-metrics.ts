import { Effect, Schema } from "effect";

import {
  EvaluationMetricError,
  InputValidationError,
  inputValidationErrorFromIssue,
} from "./errors";
import type { BaselineCrossValidationResult } from "./evaluation-baseline";
import type {
  CrossValidationIntervalRow,
  CrossValidationPointRow,
  CrossValidationResult,
  IntervalCrossValidationResult,
  PointCrossValidationResult,
} from "./evaluation";
import { kahanSum } from "./internal/kahan-sum";

type MetricSource = CrossValidationResult["kind"] | "baseline";

const MetricNameSchema = Schema.Literals([
  "mae",
  "mse",
  "rmse",
  "mape",
  "mdape",
  "smape",
  "coverage",
]);

/** One of the seven fixed-release forecast metrics. */
export type MetricName = typeof MetricNameSchema.Type;

const AggregationSchema = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("rows") }),
  Schema.Struct({ kind: Schema.Literal("horizons") }),
  Schema.Struct({ kind: Schema.Literal("overall") }),
  Schema.Struct({
    kind: Schema.Literal("rolling"),
    window: Schema.Union([
      Schema.Struct({
        kind: Schema.Literal("count"),
        rows: Schema.Int.check(Schema.isGreaterThan(0)),
      }),
      Schema.Struct({
        kind: Schema.Literal("fraction"),
        value: Schema.Finite.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(1)),
      }),
    ]),
  }),
]);

/** A row, exact-horizon, rolling or overall aggregation, with Prophet's window semantics. */
export type MetricAggregation = typeof AggregationSchema.Type;

const MetricOptionsSchema = Schema.Struct({
  metrics: Schema.NonEmptyArray(MetricNameSchema).check(
    Schema.makeFilter((metrics) => {
      if (new Set(metrics).size !== metrics.length) {
        return { path: [], issue: "Metric names must be unique" };
      }
    }),
  ),
  aggregation: AggregationSchema,
});

/** Encoded metric selection and explicit aggregation. */
export type MetricOptions = typeof MetricOptionsSchema.Encoded;

/** A finite bucket score. */
export type MetricScore<Source extends MetricSource = MetricSource> =
  | {
      readonly metric: "mae" | "mse" | "rmse" | "mape" | "mdape" | "smape";
      readonly value: number;
    }
  | (Source extends "intervals" ? { readonly metric: "coverage"; readonly value: number } : never);

/** All requested metrics on the same set of forecast instances. */
export interface MetricBucket<Source extends MetricSource = MetricSource> {
  readonly rowCount: number;
  readonly scores: ReadonlyArray<MetricScore<Source>>;
}

/** A score for one forecast instance, in horizon order. */
export interface RowMetricPoint<
  Source extends MetricSource = MetricSource,
> extends MetricBucket<Source> {
  readonly fold: number;
  readonly cutoff: number;
  readonly timestamp: number;
  readonly horizonMs: number;
}

/** A score over every forecast instance at one exact horizon. */
export interface HorizonMetricPoint<
  Source extends MetricSource = MetricSource,
> extends MetricBucket<Source> {
  readonly horizonMs: number;
}

/** A score over exactly the report's `windowRows` forecast instances, at the window's right edge. */
export interface RollingMetricPoint<Source extends MetricSource = MetricSource> {
  readonly horizonMs: number;
  readonly scores: ReadonlyArray<MetricScore<Source>>;
}

/** The aggregation determines which bucket coordinates are available. */
export type MetricReport<Source extends MetricSource = MetricSource> =
  | {
      readonly source: Source;
      readonly kind: "rows";
      readonly points: ReadonlyArray<RowMetricPoint<Source>>;
    }
  | {
      readonly source: Source;
      readonly kind: "horizons";
      readonly points: ReadonlyArray<HorizonMetricPoint<Source>>;
    }
  | {
      readonly source: Source;
      readonly kind: "rolling";
      readonly windowRows: number;
      readonly points: ReadonlyArray<RollingMetricPoint<Source>>;
    }
  | { readonly source: Source; readonly kind: "overall"; readonly bucket: MetricBucket<Source> };

type Row = CrossValidationPointRow | CrossValidationIntervalRow;

type MetricInput =
  | { readonly kind: "point"; readonly rows: ReadonlyArray<CrossValidationPointRow> }
  | { readonly kind: "intervals"; readonly rows: ReadonlyArray<CrossValidationIntervalRow> }
  | { readonly kind: "baseline"; readonly rows: ReadonlyArray<CrossValidationPointRow> };

type Group = { readonly horizonMs: number; readonly start: number; end: number };

type Failure = (
  bucket: number,
  reason: EvaluationMetricError["reason"],
  stage: EvaluationMetricError["stage"],
) => EvaluationMetricError;

// Prophet drops MAPE from its result when any actual is this close to zero.
const nearZeroActual = 1e-8;

const decodeOptions = Schema.decodeUnknownEffect(MetricOptionsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const metricFailure =
  (metric: MetricName, aggregation: MetricAggregation["kind"]): Failure =>
  (bucket, reason, stage) =>
    new EvaluationMetricError({
      metric,
      aggregation,
      bucket,
      reason,
      stage,
      message: `Cannot compute ${metric} for ${aggregation} bucket ${bucket}: ${reason} at ${stage}`,
    });

// Prophet's per-row formulas, in the same operation order so each value rounds identically.
const contribution = (
  row: Row,
  metric: MetricName,
  bucket: number,
  fail: Failure,
): number | EvaluationMetricError => {
  const error = row.actual - row.predicted;

  if (!Number.isFinite(error)) return fail(bucket, "non-finite", "difference");

  switch (metric) {
    case "mae":
      return Math.abs(error);
    case "mse":
    case "rmse": {
      const square = error * error;

      return Number.isFinite(square) ? square : fail(bucket, "non-finite", "square");
    }

    case "mape":
    case "mdape": {
      // Prophet skips MAPE for near-zero actuals, but MDAPE divides by every nonzero actual.
      if (metric === "mape" ? Math.abs(row.actual) < nearZeroActual : row.actual === 0) {
        return fail(bucket, "zero-actual", "division");
      }

      const ratio = Math.abs(error / row.actual);

      return Number.isFinite(ratio) ? ratio : fail(bucket, "non-finite", "division");
    }

    case "smape": {
      const ratio = Math.abs(error) / ((Math.abs(row.actual) + Math.abs(row.predicted)) / 2);

      // Prophet replaces the NaN from 0/0 with 0.
      if (Number.isNaN(ratio)) return 0;

      return Number.isFinite(ratio) ? ratio : fail(bucket, "non-finite", "division");
    }

    case "coverage":
      if (!("lower" in row)) return fail(bucket, "unavailable", "input");

      return row.lower <= row.actual && row.actual <= row.upper ? 1 : 0;
  }
};

/**
 * Prophet's `rolling_mean_by_h`: sum each horizon group as pandas does, then walk from the largest
 * horizon down. Every mean covers exactly `windowRows` rows, taking a proportional share of the
 * oldest group's sum, and lands on the newest group in its window.
 */
const rollingMeans = (
  values: ReadonlyArray<number>,
  groups: ReadonlyArray<Group>,
  windowRows: number,
  bucket: (group: number) => number,
  fail: Failure,
): ReadonlyArray<number> | EvaluationMetricError => {
  const sums = groups.map((group) => kahanSum(values, group.start, group.end));
  const means: Array<number> = [];
  const size = (index: number) => (groups[index]?.end ?? 0) - (groups[index]?.start ?? 0);

  let trailing = groups.length - 1;
  let total = 0;
  let count = 0;

  for (let index = groups.length - 1; index >= 0; index -= 1) {
    const sum = sums[index] ?? Number.NaN;
    total += sum;
    count += size(index);

    while (count >= windowRows) {
      const excess = ((count - windowRows) * sum) / size(index);
      const mean = (total - excess) / windowRows;

      if (!Number.isFinite(total)) return fail(bucket(trailing), "non-finite", "sum");

      if (!Number.isFinite(mean)) return fail(bucket(trailing), "non-finite", "mean");

      means[trailing] = mean;
      total -= sums[trailing] ?? Number.NaN;
      count -= size(trailing);
      trailing -= 1;
    }
  }

  return means;
};

// A counted order statistic supports sliding MDAPE without sorting every overlapping window.
const medianIndex = (tree: ReadonlyArray<number>, rank: number): number => {
  let index = 0;
  let bit = 1;

  while (bit * 2 < tree.length) bit *= 2;

  for (; bit > 0; bit = Math.floor(bit / 2)) {
    const next = index + bit;

    if (next < tree.length && (tree[next] ?? 0) < rank) {
      rank -= tree[next] ?? 0;
      index = next;
    }
  }

  return index;
};

/**
 * Prophet's `rolling_median_by_h`: a group with at least `windowRows` rows is its own window;
 * a smaller one is filled to exactly `windowRows` with the rows just before it in horizon order.
 * Either way the window is a contiguous range whose ends only move forward.
 */
const rollingMedians = (
  values: ReadonlyArray<number>,
  groups: ReadonlyArray<Group>,
  first: number,
  windowRows: number,
  bucket: (group: number) => number,
  fail: Failure,
): ReadonlyArray<number> | EvaluationMetricError => {
  const sorted = Array.from(new Set(values)).sort((left, right) => left - right);
  const tree = Array.from({ length: sorted.length + 1 }, () => 0);
  const medians: Array<number> = [];

  const adjust = (value: number, direction: 1 | -1) => {
    let lower = 0;
    let upper = sorted.length;

    while (lower < upper) {
      const middle = Math.floor((lower + upper) / 2);

      if ((sorted[middle] ?? Infinity) < value) lower = middle + 1;
      else upper = middle;
    }

    for (let position = lower + 1; position < tree.length; position += position & -position) {
      tree[position] = (tree[position] ?? 0) + direction;
    }
  };

  let low = 0;
  let high = 0;

  for (let index = first; index < groups.length; index += 1) {
    const group = groups[index];

    if (group === undefined) continue;
    const start = Math.min(group.start, group.end - windowRows);

    for (; high < group.end; high += 1) adjust(values[high] ?? Number.NaN, 1);

    for (; low < start; low += 1) adjust(values[low] ?? Number.NaN, -1);

    const count = group.end - start;
    const upper = sorted[medianIndex(tree, Math.floor(count / 2) + 1)];
    const lower = count % 2 === 1 ? upper : sorted[medianIndex(tree, count / 2)];

    if (lower === undefined || upper === undefined) {
      return fail(bucket(index), "misaligned", "median");
    }

    // numpy averages the middle pair as (a + b) / 2 and returns an odd count's middle unchanged.
    const median = count % 2 === 1 ? upper : (lower + upper) / 2;

    if (!Number.isFinite(median)) return fail(bucket(index), "non-finite", "median");
    medians[index] = median;
  }

  return medians;
};

const computeMetrics = (
  result: MetricInput,
  input: MetricOptions,
): Effect.Effect<MetricReport, InputValidationError | EvaluationMetricError> =>
  Effect.gen(function* () {
    const options = yield* decodeOptions(input).pipe(
      Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-metrics", error.issue)),
    );

    const rows = result.rows;
    const aggregation = options.aggregation;
    const first = options.metrics[0];

    if (rows.length === 0 || rows.length > 1_000_000) {
      return yield* Effect.fail(
        new InputValidationError({
          input: "evaluation-metrics",
          issues: [{ path: ["rows"], message: "Expected 1 to 1,000,000 forecast instances" }],
          message: "Expected 1 to 1,000,000 forecast instances",
        }),
      );
    }

    if (result.kind !== "intervals" && options.metrics.includes("coverage")) {
      return yield* Effect.fail(
        metricFailure("coverage", aggregation.kind)(0, "unavailable", "input"),
      );
    }

    // Results from crossValidate are trusted; guard against malformed values at JS call sites.
    for (const [index, row] of rows.entries()) {
      if (
        !Number.isFinite(row.actual) ||
        !Number.isFinite(row.predicted) ||
        !Number.isSafeInteger(row.horizonMs) ||
        row.horizonMs <= 0 ||
        !Number.isSafeInteger(row.timestamp) ||
        !Number.isSafeInteger(row.cutoff) ||
        row.timestamp - row.cutoff !== row.horizonMs ||
        (result.kind === "intervals" &&
          (!Number.isFinite(result.rows[index]?.lower) ||
            !Number.isFinite(result.rows[index]?.upper) ||
            (result.rows[index]?.lower ?? Infinity) > (result.rows[index]?.upper ?? -Infinity)))
      ) {
        return yield* Effect.fail(
          metricFailure(first, aggregation.kind)(index, "misaligned", "input"),
        );
      }
    }

    // Prophet sorts by horizon with an unstable sort; a stable sort keeps equal horizons in input order.
    const ordered = Array.from(rows).sort((left, right) => left.horizonMs - right.horizonMs);
    const groups: Array<Group> = [];

    for (const row of ordered) {
      const previous = groups[groups.length - 1];

      if (previous !== undefined && previous.horizonMs === row.horizonMs) {
        previous.end += 1;
      } else {
        groups.push({
          horizonMs: row.horizonMs,
          start: previous?.end ?? 0,
          end: (previous?.end ?? 0) + 1,
        });
      }
    }

    if (aggregation.kind === "rows") {
      const points: Array<RowMetricPoint> = [];

      for (const [index, row] of ordered.entries()) {
        const scores: Array<MetricScore> = [];

        for (const metric of options.metrics) {
          const value = contribution(row, metric, index, metricFailure(metric, "rows"));

          if (value instanceof EvaluationMetricError) return yield* Effect.fail(value);

          scores.push(
            Object.freeze({ metric, value: metric === "rmse" ? Math.sqrt(value) : value }),
          );
        }

        points.push(
          Object.freeze({
            rowCount: 1,
            scores: Object.freeze(scores),
            fold: row.fold,
            cutoff: row.cutoff,
            timestamp: row.timestamp,
            horizonMs: row.horizonMs,
          }),
        );
      }

      return Object.freeze({
        source: result.kind,
        kind: "rows" as const,
        points: Object.freeze(points),
      });
    }

    // Prophet scores each horizon as a one-row window and the whole result as an n-row window.
    const windowRows =
      aggregation.kind === "horizons"
        ? 1
        : aggregation.kind === "overall"
          ? rows.length
          : aggregation.window.kind === "count"
            ? aggregation.window.rows
            : Math.max(1, Math.floor(aggregation.window.value * rows.length));

    if (windowRows > rows.length) {
      return yield* Effect.fail(
        new InputValidationError({
          input: "evaluation-metrics",
          issues: [
            { path: ["aggregation", "window"], message: "Window exceeds forecast instance count" },
          ],
          message: "Window exceeds forecast instance count",
        }),
      );
    }

    const bucket = (group: number) => (aggregation.kind === "overall" ? 0 : group);
    const firstPoint = groups.findIndex((group) => group.end >= windowRows);
    const columns: Array<{ metric: MetricName; values: ReadonlyArray<number> }> = [];

    for (const metric of options.metrics) {
      const fail = metricFailure(metric, aggregation.kind);
      const values: Array<number> = [];

      for (const [index, group] of groups.entries()) {
        for (let position = group.start; position < group.end; position += 1) {
          const row = ordered[position];

          if (row === undefined) continue;
          const value = contribution(row, metric, bucket(index), fail);

          if (value instanceof EvaluationMetricError) return yield* Effect.fail(value);
          values.push(value);
        }
      }

      const aggregated =
        metric === "mdape"
          ? rollingMedians(values, groups, firstPoint, windowRows, bucket, fail)
          : rollingMeans(values, groups, windowRows, bucket, fail);

      if (aggregated instanceof EvaluationMetricError) return yield* Effect.fail(aggregated);

      columns.push({
        metric,
        values: metric === "rmse" ? aggregated.map((value) => Math.sqrt(value)) : aggregated,
      });
    }

    const scoresAt = (index: number) =>
      Object.freeze(
        columns.map(({ metric, values }) =>
          Object.freeze({ metric, value: values[index] ?? Number.NaN }),
        ),
      );

    if (aggregation.kind === "overall") {
      const bucket = Object.freeze({ rowCount: rows.length, scores: scoresAt(groups.length - 1) });

      return Object.freeze({ source: result.kind, kind: "overall" as const, bucket });
    }

    if (aggregation.kind === "rolling") {
      const points = groups
        .slice(firstPoint)
        .map((group, offset) =>
          Object.freeze({ horizonMs: group.horizonMs, scores: scoresAt(firstPoint + offset) }),
        );

      return Object.freeze({
        source: result.kind,
        kind: "rolling" as const,
        windowRows,
        points: Object.freeze(points),
      });
    }

    const points = groups.map((group, index) =>
      Object.freeze({
        rowCount: group.end - group.start,
        scores: scoresAt(index),
        horizonMs: group.horizonMs,
      }),
    );

    return Object.freeze({
      source: result.kind,
      kind: "horizons" as const,
      points: Object.freeze(points),
    });
  });

/** Compute Prophet's point-error and interval-coverage metrics over trusted CV forecast instances. */
export function performanceMetrics(
  result: BaselineCrossValidationResult,
  input: MetricOptions,
): Effect.Effect<MetricReport<"baseline">, InputValidationError | EvaluationMetricError>;
export function performanceMetrics(
  result: PointCrossValidationResult,
  input: MetricOptions,
): Effect.Effect<MetricReport<"point">, InputValidationError | EvaluationMetricError>;
export function performanceMetrics(
  result: IntervalCrossValidationResult,
  input: MetricOptions,
): Effect.Effect<MetricReport<"intervals">, InputValidationError | EvaluationMetricError>;
export function performanceMetrics(
  result: CrossValidationResult,
  input: MetricOptions,
): Effect.Effect<
  MetricReport<CrossValidationResult["kind"]>,
  InputValidationError | EvaluationMetricError
>;
/** Compute metrics from owned forecast rows without requiring a rolling-origin plan. */
export function performanceMetrics(
  result: MetricInput,
  input: MetricOptions,
): Effect.Effect<MetricReport, InputValidationError | EvaluationMetricError>;
export function performanceMetrics(
  result: MetricInput,
  input: MetricOptions,
): Effect.Effect<MetricReport, InputValidationError | EvaluationMetricError> {
  return computeMetrics(result, input);
}
