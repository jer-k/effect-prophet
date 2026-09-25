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

/** A row, exact-horizon, whole-group rolling or overall aggregation. */
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
  mapeZeroActual: Schema.optionalKey(Schema.Literals(["error", "exclude"])),
});

/** Encoded metric selection and explicit aggregation; exact-zero actuals fail by default. */
export type MetricOptions = typeof MetricOptionsSchema.Encoded;

/** A finite bucket score, with denominators on actual-dependent percentage metrics. */
export type MetricScore<Source extends MetricSource = MetricSource> =
  | {
      readonly metric: "mape" | "mdape";
      readonly value: number;
      readonly includedCount: number;
      readonly excludedCount: number;
    }
  | { readonly metric: "mae" | "mse" | "rmse" | "smape"; readonly value: number }
  | (Source extends "intervals" ? { readonly metric: "coverage"; readonly value: number } : never);

/** All requested metrics on the same set of forecast instances. */
export interface MetricBucket<Source extends MetricSource = MetricSource> {
  readonly rowCount: number;
  readonly scores: ReadonlyArray<MetricScore<Source>>;
}

/** A score for one forecast instance in original fold/input order. */
export interface RowMetricPoint<
  Source extends MetricSource = MetricSource,
> extends MetricBucket<Source> {
  readonly fold: number;
  readonly cutoff: number;
  readonly timestamp: number;
  readonly horizonMs: number;
}

/** A score at the right edge of an exact-horizon or rolling bucket. */
export interface HorizonMetricPoint<
  Source extends MetricSource = MetricSource,
> extends MetricBucket<Source> {
  readonly horizonMs: number;
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
      readonly points: ReadonlyArray<HorizonMetricPoint<Source>>;
    }
  | { readonly source: Source; readonly kind: "overall"; readonly bucket: MetricBucket<Source> };

type ParsedOptions = typeof MetricOptionsSchema.Type;

type Row = CrossValidationPointRow | CrossValidationIntervalRow;

const decodeOptions = Schema.decodeUnknownEffect(MetricOptionsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const metricFailure = (
  metric: MetricName,
  aggregation: MetricAggregation["kind"],
  bucket: number,
  reason: EvaluationMetricError["reason"],
  stage: EvaluationMetricError["stage"],
): EvaluationMetricError =>
  new EvaluationMetricError({
    metric,
    aggregation,
    bucket,
    reason,
    stage,
    message: `Cannot compute ${metric} for ${aggregation} bucket ${bucket}: ${reason} at ${stage}`,
  });

const finite = (
  value: number,
  metric: MetricName,
  aggregation: MetricAggregation["kind"],
  bucket: number,
  stage: EvaluationMetricError["stage"],
) =>
  Number.isFinite(value)
    ? Effect.succeed(value)
    : Effect.fail(metricFailure(metric, aggregation, bucket, "non-finite", stage));

// Neumaier summation retains small contributions even when the running total is much larger.
const mean = (
  values: ReadonlyArray<number>,
  metric: MetricName,
  aggregation: MetricAggregation["kind"],
  bucket: number,
) =>
  Effect.gen(function* () {
    let sum = 0;
    let correction = 0;

    for (const value of values) {
      const next = yield* finite(sum + value, metric, aggregation, bucket, "sum");
      correction = yield* finite(
        correction + (Math.abs(sum) >= Math.abs(value) ? sum - next + value : value - next + sum),
        metric,
        aggregation,
        bucket,
        "sum",
      );
      sum = next;
    }

    const total = yield* finite(sum + correction, metric, aggregation, bucket, "sum");

    return yield* finite(total / values.length, metric, aggregation, bucket, "mean");
  });

const contribution = (
  row: Row,
  metric: MetricName,
  kind: MetricSource,
  aggregation: MetricAggregation["kind"],
  bucket: number,
  zeroPolicy: "error" | "exclude",
) =>
  Effect.gen(function* () {
    const actual = row.actual;
    const predicted = row.predicted;
    const error = yield* finite(actual - predicted, metric, aggregation, bucket, "difference");
    const absolute = Math.abs(error);

    switch (metric) {
      case "mae":
        return absolute;
      case "mse":
      case "rmse":
        return yield* finite(error * error, metric, aggregation, bucket, "square");
      case "mape":
      case "mdape":
        if (actual === 0) {
          if (zeroPolicy === "error") {
            return yield* Effect.fail(
              metricFailure(metric, aggregation, bucket, "zero-actual", "division"),
            );
          }

          return undefined;
        }

        return yield* finite(Math.abs(error / actual), metric, aggregation, bucket, "division");
      case "smape": {
        const denominator = yield* finite(
          Math.abs(actual) + Math.abs(predicted),
          metric,
          aggregation,
          bucket,
          "sum",
        );

        return denominator === 0
          ? 0
          : yield* finite((2 * absolute) / denominator, metric, aggregation, bucket, "division");
      }

      case "coverage":
        if (kind !== "intervals" || !("lower" in row)) {
          return yield* Effect.fail(
            metricFailure(metric, aggregation, bucket, "unavailable", "input"),
          );
        }

        return row.lower <= actual && actual <= row.upper ? 1 : 0;
    }
  });

const bucketScores = (
  rows: ReadonlyArray<Row>,
  options: ParsedOptions,
  kind: MetricSource,
  bucketIndex: number,
) =>
  Effect.gen(function* () {
    const aggregation = options.aggregation.kind;
    const scores: Array<MetricScore> = [];

    for (const metric of options.metrics) {
      const values: Array<number> = [];
      let excludedCount = 0;

      for (const row of rows) {
        const value = yield* contribution(
          row,
          metric,
          kind,
          aggregation,
          bucketIndex,
          options.mapeZeroActual ?? "error",
        );

        if (value === undefined) excludedCount += 1;
        else values.push(value);
      }

      if (values.length === 0) {
        return yield* Effect.fail(
          metricFailure(metric, aggregation, bucketIndex, "empty-bucket", "input"),
        );
      }

      let value: number;

      if (metric === "mdape") {
        // Own the scratch array; never sort the caller's forecast rows or shared values.
        values.sort((left, right) => left - right);
        const upper = values[Math.floor(values.length / 2)];
        const lower = values[Math.floor((values.length - 1) / 2)];

        if (upper === undefined || lower === undefined) {
          return yield* Effect.fail(
            metricFailure(metric, aggregation, bucketIndex, "empty-bucket", "median"),
          );
        }

        // Half-sums avoid overflow when two individually finite central values are large.
        value = yield* finite(lower / 2 + upper / 2, metric, aggregation, bucketIndex, "median");
      } else {
        value = yield* mean(values, metric, aggregation, bucketIndex);

        if (metric === "rmse") {
          value = yield* finite(Math.sqrt(value), metric, aggregation, bucketIndex, "mean");
        }
      }

      scores.push(
        metric === "mape" || metric === "mdape"
          ? Object.freeze({ metric, value, includedCount: values.length, excludedCount })
          : Object.freeze({ metric, value }),
      );
    }

    return Object.freeze({ rowCount: rows.length, scores: Object.freeze(scores) });
  });

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

const rollingPoints = (
  ordered: ReadonlyArray<Row>,
  groups: ReadonlyArray<{
    readonly horizonMs: number;
    readonly start: number;
    readonly end: number;
  }>,
  options: ParsedOptions,
  kind: MetricSource,
  windowRows: number,
) =>
  Effect.gen(function* () {
    const points: Array<HorizonMetricPoint> = [];

    // An indexed contribution is calculated once, even when it belongs to many windows.
    const series: Array<{
      metric: MetricName;
      values: ReadonlyArray<number | undefined>;
      sorted: ReadonlyArray<number>;
      tree: Array<number>;
    }> = [];

    for (const metric of options.metrics) {
      const values: Array<number | undefined> = [];

      for (const [index, group] of groups.entries()) {
        for (let rowIndex = group.start; rowIndex < group.end; rowIndex += 1) {
          const row = ordered[rowIndex];

          if (row !== undefined) {
            values.push(
              yield* contribution(
                row,
                metric,
                kind,
                "rolling",
                index,
                options.mapeZeroActual ?? "error",
              ),
            );
          }
        }
      }

      const sorted =
        metric === "mdape"
          ? Array.from(
              new Set(values.filter((value): value is number => value !== undefined)),
            ).sort((left, right) => left - right)
          : [];

      series.push({
        metric,
        values,
        sorted,
        tree: Array.from({ length: sorted.length + 1 }, () => 0),
      });
    }

    const sums = series.map(() => ({ sum: 0, correction: 0, included: 0 }));

    const update = (start: number, end: number, direction: 1 | -1, bucket: number) =>
      Effect.gen(function* () {
        for (const [metricIndex, column] of series.entries()) {
          const state = sums[metricIndex];

          if (state === undefined) continue;

          for (let rowIndex = start; rowIndex < end; rowIndex += 1) {
            const value = column.values[rowIndex];

            if (value === undefined) continue;
            state.included += direction;

            if (column.metric === "mdape") {
              let lower = 0;
              let upper = column.sorted.length;

              while (lower < upper) {
                const middle = Math.floor((lower + upper) / 2);

                if ((column.sorted[middle] ?? Infinity) < value) lower = middle + 1;
                else upper = middle;
              }

              for (
                let position = lower + 1;
                position < column.tree.length;
                position += position & -position
              ) {
                column.tree[position] = (column.tree[position] ?? 0) + direction;
              }
            } else {
              const delta = direction * value;

              const next = yield* finite(
                state.sum + delta,
                column.metric,
                "rolling",
                bucket,
                "sum",
              );

              state.correction = yield* finite(
                state.correction +
                  (Math.abs(state.sum) >= Math.abs(delta)
                    ? state.sum - next + delta
                    : delta - next + state.sum),
                column.metric,
                "rolling",
                bucket,
                "sum",
              );
              state.sum = next;
            }
          }
        }
      });

    let left = 0;
    let previousEnd = 0;

    for (const [index, group] of groups.entries()) {
      if (group.end >= windowRows) {
        // Evict first: the union of consecutive windows may overflow even when each window is finite.
        while (left < index && group.end - (groups[left + 1]?.start ?? group.end) >= windowRows) {
          const removed = groups[left];

          if (removed !== undefined) yield* update(removed.start, removed.end, -1, index);
          left += 1;
        }
      }

      yield* update(previousEnd, group.end, 1, index);
      previousEnd = group.end;

      if (group.end < windowRows) continue;

      const rowCount = group.end - (groups[left]?.start ?? 0);
      const scores: Array<MetricScore> = [];

      for (const [metricIndex, column] of series.entries()) {
        const state = sums[metricIndex];

        if (state === undefined) continue;
        const { metric } = column;

        if (state.included === 0) {
          return yield* Effect.fail(
            metricFailure(metric, "rolling", index, "empty-bucket", "input"),
          );
        }

        let value: number;

        if (metric === "mdape") {
          const lower =
            column.sorted[medianIndex(column.tree, Math.floor((state.included + 1) / 2))];

          const upper = column.sorted[medianIndex(column.tree, Math.floor(state.included / 2) + 1)];

          if (lower === undefined || upper === undefined) {
            return yield* Effect.fail(
              metricFailure(metric, "rolling", index, "misaligned", "median"),
            );
          }

          value = yield* finite(lower / 2 + upper / 2, metric, "rolling", index, "median");
        } else {
          const total = yield* finite(
            state.sum + state.correction,
            metric,
            "rolling",
            index,
            "sum",
          );

          value = yield* finite(total / state.included, metric, "rolling", index, "mean");

          if (metric === "rmse")
            value = yield* finite(Math.sqrt(value), metric, "rolling", index, "mean");
        }

        scores.push(
          metric === "mape" || metric === "mdape"
            ? Object.freeze({
                metric,
                value,
                includedCount: state.included,
                excludedCount: rowCount - state.included,
              })
            : Object.freeze({ metric, value }),
        );
      }

      points.push(
        Object.freeze({ horizonMs: group.horizonMs, rowCount, scores: Object.freeze(scores) }),
      );
    }

    return Object.freeze(points);
  });

const computeMetrics = (
  result: CrossValidationResult | BaselineCrossValidationResult,
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
        metricFailure("coverage", aggregation.kind, 0, "unavailable", "input"),
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
          metricFailure(first, aggregation.kind, index, "misaligned", "input"),
        );
      }
    }

    if (aggregation.kind === "rows") {
      const points: Array<RowMetricPoint> = [];

      for (const [index, row] of rows.entries()) {
        const scores = yield* bucketScores([row], options, result.kind, index);
        points.push(
          Object.freeze({
            ...scores,
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

    if (aggregation.kind === "overall") {
      const bucket = yield* bucketScores(rows, options, result.kind, 0);

      return Object.freeze({ source: result.kind, kind: "overall" as const, bucket });
    }

    // Sort a copy; original input order breaks ties among equal integer horizons.
    const ordered = Array.from(rows).sort((left, right) => left.horizonMs - right.horizonMs);
    const groups: Array<{ horizonMs: number; start: number; end: number }> = [];

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

    const windowRows =
      aggregation.kind === "rolling"
        ? aggregation.window.kind === "count"
          ? aggregation.window.rows
          : Math.max(1, Math.floor(aggregation.window.value * rows.length))
        : 1;

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

    if (aggregation.kind === "rolling") {
      const points = yield* rollingPoints(ordered, groups, options, result.kind, windowRows);

      return Object.freeze({ source: result.kind, kind: "rolling" as const, windowRows, points });
    }

    const points: Array<HorizonMetricPoint> = [];

    for (const [index, group] of groups.entries()) {
      const scores = yield* bucketScores(
        ordered.slice(group.start, group.end),
        options,
        result.kind,
        index,
      );

      points.push(Object.freeze({ ...scores, horizonMs: group.horizonMs }));
    }

    return Object.freeze({
      source: result.kind,
      kind: "horizons" as const,
      points: Object.freeze(points),
    });
  });

/** Compute checked point-error and interval-coverage metrics over trusted CV forecast instances. */
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
export function performanceMetrics(
  result: CrossValidationResult | BaselineCrossValidationResult,
  input: MetricOptions,
): Effect.Effect<MetricReport, InputValidationError | EvaluationMetricError> {
  return computeMetrics(result, input);
}
