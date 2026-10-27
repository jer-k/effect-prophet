import { Effect, Predicate, Schema } from "effect";

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
import { utcMonth } from "./internal/calendar-month";
import { kahanSum } from "./internal/kahan-sum";
import {
  CustomMetricNameSchema,
  MetricNameSchema,
  PointMetricNameSchema,
  metricName,
  repeatedMetricName,
} from "./internal/metric-names";

type MetricSource = CrossValidationResult["kind"] | "baseline";

/** One of the seven fixed-release forecast metrics. */
export type MetricName = typeof MetricNameSchema.Type;

/** A forecast metric that needs only point predictions. */
type PointMetricName = typeof PointMetricNameSchema.Type;

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

const HorizonUnitSchema = Schema.Literals(["duration", "calendar-month"]);

/**
 * How forecast instances are grouped by distance from their cutoff: exact elapsed milliseconds,
 * or Prophet's `monthly=True` count of UTC calendar months from the cutoff's month.
 */
export type MetricHorizonUnit = typeof HorizonUnitSchema.Type;

/** One forecast instance as a custom metric scores it; interval sources add `lower` and `upper`. */
export interface MetricRow {
  readonly fold: number;
  readonly cutoff: number;
  readonly timestamp: number;
  readonly horizonMs: number;
  readonly actual: number;
  readonly predicted: number;
  readonly lower?: number;
  readonly upper?: number;
}

/**
 * A caller-defined metric. `score` gives each forecast instance a value, `reduce` combines a
 * window's values with Prophet's window semantics, and `finalize` transforms each combined value,
 * as `rmse` takes the square root of a mean:
 *
 * - `"mean"`: Prophet's `rolling_mean_by_h`, as `mae` uses.
 * - `"median"`: Prophet's `rolling_median_by_h`, as `mdape` uses.
 * - `{ kind: "quantile", probability }`: numpy's linear `np.quantile` over the median's windows.
 * - `"ratio-of-means"`: `score` returns a numerator and a denominator, and each window's value is
 *   the mean numerator over the mean denominator, as for WAPE.
 */
export type CustomMetric<Name extends string = string> = {
  readonly name: Name;
  readonly finalize?: (value: number) => number;
} & (
  | { readonly reduce: "mean" | "median"; readonly score: (row: MetricRow) => number }
  | {
      readonly reduce: { readonly kind: "quantile"; readonly probability: number };
      readonly score: (row: MetricRow) => number;
    }
  | {
      readonly reduce: "ratio-of-means";
      readonly score: (row: MetricRow) => readonly [numerator: number, denominator: number];
    }
);

/** A built-in metric name or a custom metric definition. */
export type MetricSelection<Name extends string = never> = MetricName | CustomMetric<Name>;

const ScoreFunctionSchema = Schema.declare((input): input is (row: MetricRow) => number =>
  Predicate.isFunction(input),
);

const RatioScoreFunctionSchema = Schema.declare(
  (input): input is (row: MetricRow) => readonly [number, number] => Predicate.isFunction(input),
);

const FinalizeFunctionSchema = Schema.declare((input): input is (value: number) => number =>
  Predicate.isFunction(input),
);

const customMetricFields = {
  name: CustomMetricNameSchema,
  finalize: Schema.optionalKey(FinalizeFunctionSchema),
};

/** A custom metric definition, checked before any forecast instance is scored. */
export const CustomMetricSchema = Schema.Union([
  Schema.Struct({
    ...customMetricFields,
    reduce: Schema.Literals(["mean", "median"]),
    score: ScoreFunctionSchema,
  }),
  Schema.Struct({
    ...customMetricFields,
    reduce: Schema.Struct({
      kind: Schema.Literal("quantile"),
      probability: Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(1),
      ),
    }),
    score: ScoreFunctionSchema,
  }),
  Schema.Struct({
    ...customMetricFields,
    reduce: Schema.Literal("ratio-of-means"),
    score: RatioScoreFunctionSchema,
  }),
]);

const MetricOptionsSchema = Schema.Struct({
  metrics: Schema.NonEmptyArray(Schema.Union([MetricNameSchema, CustomMetricSchema])).check(
    Schema.makeFilter((metrics) => repeatedMetricName(metrics.map(metricName))),
  ),
  aggregation: AggregationSchema,
  horizon: Schema.optionalKey(HorizonUnitSchema),
});

/**
 * Built-in and custom metrics, each named once, an explicit aggregation and a horizon unit,
 * `"duration"` when omitted.
 */
export interface MetricOptions<
  Horizon extends MetricHorizonUnit = "duration",
  Name extends string = never,
> {
  readonly metrics: readonly [MetricSelection<Name>, ...Array<MetricSelection<Name>>];
  readonly aggregation: typeof AggregationSchema.Encoded;
  readonly horizon?: Horizon;
}

/** A finite bucket score. */
export type MetricScore<Source extends MetricSource = MetricSource, Name extends string = never> =
  | { readonly metric: PointMetricName; readonly value: number }
  | (Source extends "intervals" ? { readonly metric: "coverage"; readonly value: number } : never)
  | ([Name] extends [never] ? never : { readonly metric: Name; readonly value: number });

/** All requested metrics on the same set of forecast instances. */
export interface MetricBucket<
  Source extends MetricSource = MetricSource,
  Name extends string = never,
> {
  readonly rowCount: number;
  readonly scores: ReadonlyArray<MetricScore<Source, Name>>;
}

/** A bucket's horizon: elapsed milliseconds, or calendar months from the cutoff's month. */
export type HorizonCoordinate<Horizon extends MetricHorizonUnit = "duration"> =
  Horizon extends "calendar-month"
    ? { readonly horizonMonths: number }
    : { readonly horizonMs: number };

/** A score for one forecast instance, in horizon order. */
export type RowMetricPoint<
  Source extends MetricSource = MetricSource,
  Horizon extends MetricHorizonUnit = "duration",
  Name extends string = never,
> = MetricBucket<Source, Name> & {
  readonly fold: number;
  readonly cutoff: number;
  readonly timestamp: number;
  readonly horizonMs: number;
} & (Horizon extends "calendar-month" ? { readonly horizonMonths: number } : unknown);

/** A score over every forecast instance at one horizon. */
export type HorizonMetricPoint<
  Source extends MetricSource = MetricSource,
  Horizon extends MetricHorizonUnit = "duration",
  Name extends string = never,
> = MetricBucket<Source, Name> & HorizonCoordinate<Horizon>;

/** A score over exactly the report's `windowRows` forecast instances, at the window's right edge. */
export type RollingMetricPoint<
  Source extends MetricSource = MetricSource,
  Horizon extends MetricHorizonUnit = "duration",
  Name extends string = never,
> = { readonly scores: ReadonlyArray<MetricScore<Source, Name>> } & HorizonCoordinate<Horizon>;

/**
 * The aggregation determines which bucket coordinates are available. An overall score covers
 * every forecast instance in either unit, so it carries no horizon.
 */
export type MetricReport<
  Source extends MetricSource = MetricSource,
  Horizon extends MetricHorizonUnit = "duration",
  Name extends string = never,
> = Horizon extends MetricHorizonUnit
  ?
      | {
          readonly source: Source;
          readonly kind: "rows";
          readonly horizon: Horizon;
          readonly points: ReadonlyArray<RowMetricPoint<Source, Horizon, Name>>;
        }
      | {
          readonly source: Source;
          readonly kind: "horizons";
          readonly horizon: Horizon;
          readonly points: ReadonlyArray<HorizonMetricPoint<Source, Horizon, Name>>;
        }
      | {
          readonly source: Source;
          readonly kind: "rolling";
          readonly horizon: Horizon;
          readonly windowRows: number;
          readonly points: ReadonlyArray<RollingMetricPoint<Source, Horizon, Name>>;
        }
      | {
          readonly source: Source;
          readonly kind: "overall";
          readonly bucket: MetricBucket<Source, Name>;
        }
  : never;

type Row = CrossValidationPointRow | CrossValidationIntervalRow;

type MetricInput =
  | { readonly kind: "point"; readonly rows: ReadonlyArray<CrossValidationPointRow> }
  | { readonly kind: "intervals"; readonly rows: ReadonlyArray<CrossValidationIntervalRow> }
  | { readonly kind: "baseline"; readonly rows: ReadonlyArray<CrossValidationPointRow> };

type Group = { readonly horizon: number; readonly start: number; end: number };

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
  (metric: string, aggregation: MetricAggregation["kind"]): Failure =>
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

// A counted order statistic supports sliding medians and quantiles without sorting every window.
const rankIndex = (tree: ReadonlyArray<number>, rank: number): number => {
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

/** A window statistic from its size and its 1-based order statistics. */
interface OrderStatistic {
  readonly stage: "median" | "quantile";
  readonly pick: (count: number, rank: (rank: number) => number | undefined) => number | undefined;
}

const median: OrderStatistic = {
  stage: "median",
  pick: (count, rank) => {
    const upper = rank(Math.floor(count / 2) + 1);
    const lower = count % 2 === 1 ? upper : rank(count / 2);

    if (lower === undefined || upper === undefined) return undefined;

    // numpy averages the middle pair as (a + b) / 2 and returns an odd count's middle unchanged.
    return count % 2 === 1 ? upper : (lower + upper) / 2;
  },
};

/**
 * numpy's default `linear` quantile: interpolate between the order statistics around
 * `(count - 1) * probability`, working back from the upper one once its weight reaches one half,
 * and return the largest value at or past the last index.
 */
const quantile = (probability: number): OrderStatistic => ({
  stage: "quantile",
  pick: (count, rank) => {
    const virtual = (count - 1) * probability;

    if (virtual >= count - 1) return rank(count);
    const previous = Math.floor(virtual);
    const lower = rank(previous + 1);
    const upper = rank(previous + 2);

    if (lower === undefined || upper === undefined) return undefined;
    const weight = virtual - previous;
    const difference = upper - lower;

    return weight >= 0.5 ? upper - difference * (1 - weight) : lower + difference * weight;
  },
});

/**
 * Prophet's `rolling_median_by_h`: a group with at least `windowRows` rows is its own window;
 * a smaller one is filled to exactly `windowRows` with the rows just before it in horizon order.
 * Either way the window is a contiguous range whose ends only move forward.
 */
const rollingOrderStatistics = (
  values: ReadonlyArray<number>,
  groups: ReadonlyArray<Group>,
  first: number,
  windowRows: number,
  statistic: OrderStatistic,
  bucket: (group: number) => number,
  fail: Failure,
): ReadonlyArray<number> | EvaluationMetricError => {
  const sorted = Array.from(new Set(values)).sort((left, right) => left - right);
  const tree = Array.from({ length: sorted.length + 1 }, () => 0);
  const results: Array<number> = [];

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

  const rank = (position: number) => sorted[rankIndex(tree, position)];

  let low = 0;
  let high = 0;

  for (let index = first; index < groups.length; index += 1) {
    const group = groups[index];

    if (group === undefined) continue;
    const start = Math.min(group.start, group.end - windowRows);

    for (; high < group.end; high += 1) adjust(values[high] ?? Number.NaN, 1);

    for (; low < start; low += 1) adjust(values[low] ?? Number.NaN, -1);

    const result = statistic.pick(group.end - start, rank);

    if (result === undefined) return fail(bucket(index), "misaligned", statistic.stage);

    if (!Number.isFinite(result)) return fail(bucket(index), "non-finite", statistic.stage);
    results[index] = result;
  }

  return results;
};

type AnyMetricReport = MetricReport<MetricSource, MetricHorizonUnit, string>;

/** A forecast instance in horizon order, with the frozen copy custom metrics score. */
interface Entry {
  readonly row: Row;
  readonly horizon: number;
  readonly view: MetricRow;
}

/** How one requested metric scores a forecast instance and combines a window. */
interface Column {
  readonly metric: string;
  readonly reduce: CustomMetric["reduce"];
  readonly value: (
    entry: Entry,
    bucket: number,
    fail: Failure,
  ) => number | readonly [number, number] | EvaluationMetricError;
  readonly finalize: ((value: number) => number) | undefined;
}

const builtInColumn = (metric: MetricName): Column => ({
  metric,
  reduce: metric === "mdape" ? "median" : "mean",
  value: (entry, bucket, fail) => contribution(entry.row, metric, bucket, fail),
  finalize: metric === "rmse" ? Math.sqrt : undefined,
});

const customColumn = (metric: typeof CustomMetricSchema.Type): Column => ({
  metric: metric.name,
  reduce: metric.reduce,
  // Caller code returns these values, so anything but finite numbers fails here.
  value: (entry, bucket, fail) => {
    if (metric.reduce === "ratio-of-means") {
      const pair = metric.score(entry.view);
      const [numerator, denominator] = pair;

      return pair.length === 2 && Number.isFinite(numerator) && Number.isFinite(denominator)
        ? [numerator, denominator]
        : fail(bucket, "non-finite", "score");
    }

    const value = metric.score(entry.view);

    return Number.isFinite(value) ? value : fail(bucket, "non-finite", "score");
  },
  finalize: metric.finalize,
});

const ratio = (
  numerator: number,
  denominator: number,
  bucket: number,
  fail: Failure,
): number | EvaluationMetricError => {
  if (denominator === 0) return fail(bucket, "zero-denominator", "division");
  const value = numerator / denominator;

  return Number.isFinite(value) ? value : fail(bucket, "non-finite", "division");
};

const finalized = (
  column: Column,
  value: number,
  bucket: number,
  fail: Failure,
): number | EvaluationMetricError => {
  if (column.finalize === undefined) return value;
  const result = column.finalize(value);

  return Number.isFinite(result) ? result : fail(bucket, "non-finite", "finalize");
};

/** Combine every window's values with the column's reducer, leaving short windows unscored. */
const windowValues = (
  reduce: Column["reduce"],
  values: ReadonlyArray<number>,
  denominators: ReadonlyArray<number>,
  groups: ReadonlyArray<Group>,
  first: number,
  windowRows: number,
  bucket: (group: number) => number,
  fail: Failure,
): ReadonlyArray<number> | EvaluationMetricError => {
  if (reduce === "mean") return rollingMeans(values, groups, windowRows, bucket, fail);

  if (reduce === "median") {
    return rollingOrderStatistics(values, groups, first, windowRows, median, bucket, fail);
  }

  if (reduce !== "ratio-of-means") {
    const statistic = quantile(reduce.probability);

    return rollingOrderStatistics(values, groups, first, windowRows, statistic, bucket, fail);
  }

  // Prophet's mean of a ratio's numerators over the mean of its denominators, window by window.
  const numerators = rollingMeans(values, groups, windowRows, bucket, fail);

  if (numerators instanceof EvaluationMetricError) return numerators;
  const means = rollingMeans(denominators, groups, windowRows, bucket, fail);

  if (means instanceof EvaluationMetricError) return means;
  const ratios: Array<number> = [];

  for (let index = first; index < groups.length; index += 1) {
    const value = ratio(
      numerators[index] ?? Number.NaN,
      means[index] ?? Number.NaN,
      bucket(index),
      fail,
    );

    if (value instanceof EvaluationMetricError) return value;
    ratios[index] = value;
  }

  return ratios;
};

const bucketed = (report: {
  readonly source: MetricSource;
  readonly kind: "rows" | "horizons" | "rolling";
  readonly horizon: MetricHorizonUnit;
  readonly windowRows?: number;
  readonly points: ReadonlyArray<object>;
}): AnyMetricReport =>
  // SAFETY: computeMetrics builds every point's coordinate from the same decoded unit as
  // `horizon`, and only rolling reports carry `windowRows`.
  Object.freeze({ ...report, points: Object.freeze(report.points) }) as AnyMetricReport;

const computeMetrics = (
  result: MetricInput,
  input: MetricOptions<MetricHorizonUnit, string>,
): Effect.Effect<AnyMetricReport, InputValidationError | EvaluationMetricError> =>
  Effect.gen(function* () {
    const options = yield* decodeOptions(input).pipe(
      Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-metrics", error.issue)),
    );

    const rows = result.rows;
    const aggregation = options.aggregation;
    const first = metricName(options.metrics[0]);

    const columns = options.metrics.map((metric) =>
      Predicate.isString(metric) ? builtInColumn(metric) : customColumn(metric),
    );

    const custom = columns.length > options.metrics.filter(Predicate.isString).length;

    if (rows.length === 0 || rows.length > 1_000_000) {
      return yield* Effect.fail(
        new InputValidationError({
          input: "evaluation-metrics",
          issues: [{ path: ["rows"], message: "Expected 1 to 1,000,000 forecast instances" }],
          message: "Expected 1 to 1,000,000 forecast instances",
        }),
      );
    }

    if (result.kind !== "intervals" && options.metrics.some((metric) => metric === "coverage")) {
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

    const unit = options.horizon ?? "duration";

    // Prophet's `monthly=True` subtracts the cutoff's month period from the forecast's.
    const horizonOf = (row: Row) =>
      unit === "calendar-month" ? utcMonth(row.timestamp) - utcMonth(row.cutoff) : row.horizonMs;

    const coordinate = (horizon: number) =>
      unit === "calendar-month" ? { horizonMonths: horizon } : { horizonMs: horizon };

    // Prophet sorts by horizon with an unstable sort; a stable sort keeps equal horizons in input order.
    const ordered: ReadonlyArray<Entry> = rows
      .map((row) => ({
        row,
        horizon: horizonOf(row),
        view: custom ? Object.freeze({ ...row }) : row,
      }))
      .sort((left, right) => left.horizon - right.horizon);

    const groups: Array<Group> = [];

    for (const { horizon } of ordered) {
      const previous = groups[groups.length - 1];

      if (previous !== undefined && previous.horizon === horizon) {
        previous.end += 1;
      } else {
        groups.push({ horizon, start: previous?.end ?? 0, end: (previous?.end ?? 0) + 1 });
      }
    }

    if (aggregation.kind === "rows") {
      const points: Array<RowMetricPoint<MetricSource, MetricHorizonUnit, string>> = [];

      for (const [index, entry] of ordered.entries()) {
        const { row, horizon } = entry;
        const scores: Array<MetricScore<MetricSource, string>> = [];

        for (const column of columns) {
          const fail = metricFailure(column.metric, "rows");
          const raw = column.value(entry, index, fail);

          if (raw instanceof EvaluationMetricError) return yield* Effect.fail(raw);

          // Prophet's per-row windows hold one value, so a ratio is just this row's.
          const single = Predicate.isNumber(raw) ? raw : ratio(raw[0], raw[1], index, fail);

          if (single instanceof EvaluationMetricError) return yield* Effect.fail(single);
          const value = finalized(column, single, index, fail);

          if (value instanceof EvaluationMetricError) return yield* Effect.fail(value);
          scores.push(Object.freeze({ metric: column.metric, value }));
        }

        const point = {
          rowCount: 1,
          scores: Object.freeze(scores),
          fold: row.fold,
          cutoff: row.cutoff,
          timestamp: row.timestamp,
          horizonMs: row.horizonMs,
        };

        points.push(
          Object.freeze(unit === "calendar-month" ? { ...point, horizonMonths: horizon } : point),
        );
      }

      return bucketed({ source: result.kind, kind: "rows", horizon: unit, points });
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
    const scored: Array<{ metric: string; values: ReadonlyArray<number> }> = [];

    for (const column of columns) {
      const fail = metricFailure(column.metric, aggregation.kind);
      const values: Array<number> = [];
      const denominators: Array<number> = [];

      for (const [index, group] of groups.entries()) {
        for (let position = group.start; position < group.end; position += 1) {
          const entry = ordered[position];

          if (entry === undefined) continue;
          const value = column.value(entry, bucket(index), fail);

          if (value instanceof EvaluationMetricError) return yield* Effect.fail(value);

          if (Predicate.isNumber(value)) {
            values.push(value);
          } else {
            values.push(value[0]);
            denominators.push(value[1]);
          }
        }
      }

      const aggregated = windowValues(
        column.reduce,
        values,
        denominators,
        groups,
        firstPoint,
        windowRows,
        bucket,
        fail,
      );

      if (aggregated instanceof EvaluationMetricError) return yield* Effect.fail(aggregated);
      const results: Array<number> = [];

      for (let index = firstPoint; index < groups.length; index += 1) {
        const value = finalized(column, aggregated[index] ?? Number.NaN, bucket(index), fail);

        if (value instanceof EvaluationMetricError) return yield* Effect.fail(value);
        results[index] = value;
      }

      scored.push({ metric: column.metric, values: results });
    }

    const scoresAt = (index: number) =>
      Object.freeze(
        scored.map(({ metric, values }) =>
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
          Object.freeze({ ...coordinate(group.horizon), scores: scoresAt(firstPoint + offset) }),
        );

      return bucketed({ source: result.kind, kind: "rolling", horizon: unit, windowRows, points });
    }

    const points = groups.map((group, index) =>
      Object.freeze({
        rowCount: group.end - group.start,
        scores: scoresAt(index),
        ...coordinate(group.horizon),
      }),
    );

    return bucketed({ source: result.kind, kind: "horizons", horizon: unit, points });
  });

type MetricEffect<
  Source extends MetricSource,
  Horizon extends MetricHorizonUnit,
  Name extends string,
> = Effect.Effect<
  MetricReport<Source, Horizon, Name>,
  InputValidationError | EvaluationMetricError
>;

/**
 * Compute Prophet's point-error and interval-coverage metrics, and any custom metrics, over
 * trusted CV forecast instances.
 */
export function performanceMetrics<
  Horizon extends MetricHorizonUnit = "duration",
  const Name extends string = never,
>(
  result: BaselineCrossValidationResult,
  input: MetricOptions<Horizon, Name>,
): MetricEffect<"baseline", Horizon, Name>;
export function performanceMetrics<
  Horizon extends MetricHorizonUnit = "duration",
  const Name extends string = never,
>(
  result: PointCrossValidationResult,
  input: MetricOptions<Horizon, Name>,
): MetricEffect<"point", Horizon, Name>;
export function performanceMetrics<
  Horizon extends MetricHorizonUnit = "duration",
  const Name extends string = never,
>(
  result: IntervalCrossValidationResult,
  input: MetricOptions<Horizon, Name>,
): MetricEffect<"intervals", Horizon, Name>;
export function performanceMetrics<
  Horizon extends MetricHorizonUnit = "duration",
  const Name extends string = never,
>(
  result: CrossValidationResult,
  input: MetricOptions<Horizon, Name>,
): MetricEffect<CrossValidationResult["kind"], Horizon, Name>;
/** Compute metrics from owned forecast rows without requiring a rolling-origin plan. */
export function performanceMetrics<
  Horizon extends MetricHorizonUnit = "duration",
  const Name extends string = never,
>(
  result: MetricInput,
  input: MetricOptions<Horizon, Name>,
): MetricEffect<MetricSource, Horizon, Name>;
export function performanceMetrics<Horizon extends MetricHorizonUnit, Name extends string>(
  result: MetricInput,
  input: MetricOptions<Horizon, Name>,
): MetricEffect<MetricSource, Horizon, Name> {
  // SAFETY: The report's unit is the decoded `input.horizon`, which `Horizon` describes, and every
  // score is named by a built-in metric or by one of the definitions `Name` describes.
  return computeMetrics(result, input) as MetricEffect<MetricSource, Horizon, Name>;
}
