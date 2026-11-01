import { Effect, Schema } from "effect";

import { InputValidationError, MetricScaleError, inputValidationErrorFromIssue } from "./errors";
import {
  PositiveDurationMsSchema,
  resolveBaselinePlan,
  type RollingOriginPlanSummary,
} from "./evaluation";
import type { CustomMetric } from "./evaluation-metrics";
import { kahanSum } from "./internal/kahan-sum";
import { laggedValue, valuesByTimestamp } from "./internal/lagged-value";
import { CustomMetricNameSchema } from "./internal/metric-names";
import { residualOf } from "./internal/residual";
import { decodeObservations } from "./observation";

const ScaledErrorOptionsSchema = Schema.Struct({
  name: Schema.optionalKey(CustomMetricNameSchema),
  lag: Schema.optionalKey(
    Schema.Union([
      Schema.Struct({ kind: Schema.Literal("previous-row") }),
      Schema.Struct({ kind: Schema.Literal("duration"), lagMs: PositiveDurationMsSchema }),
    ]),
  ),
});

/**
 * Which earlier training value a naive forecast repeats: the row just before, whatever the
 * spacing, or the value observed exactly `lagMs` earlier, as the seasonal-naive baseline matches it.
 */
export type ScaledErrorLag = NonNullable<(typeof ScaledErrorOptionsSchema.Encoded)["lag"]>;

/** The metric's name, `"mase"` when omitted, and its naive lag, the previous row when omitted. */
export interface ScaledErrorOptions<Name extends string = "mase"> {
  readonly name?: Name;
  readonly lag?: ScaledErrorLag;
}

const decodeScaledErrorOptions = Schema.decodeUnknownEffect(ScaledErrorOptionsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/**
 * A mean absolute scaled error (MASE) metric for one rolling-origin plan. Each fold's scale is the
 * mean absolute error of a naive forecast over that fold's training rows. The metric scores a
 * forecast as its absolute error over its fold's scale, and averages with Prophet's window
 * semantics, so `performanceMetrics`, `comparePerformance` and `searchModels` accept it like any
 * custom metric. It scores only rows from this plan's cutoffs.
 */
export const scaledErrorMetric = Effect.fn("Prophet.scaledErrorMetric")(function* <
  const Name extends string = "mase",
>(
  history: Parameters<typeof decodeObservations>[0],
  summary: RollingOriginPlanSummary,
  input?: ScaledErrorOptions<Name>,
): Effect.fn.Return<CustomMetric<Name>, InputValidationError | MetricScaleError> {
  const observations = yield* decodeObservations(history);

  const options = yield* decodeScaledErrorOptions(input ?? {}).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-metrics", error.issue)),
  );

  const plan = yield* resolveBaselinePlan(observations, summary);
  const name = options.name ?? "mase";
  const lag = options.lag ?? { kind: "previous-row" };

  // Each naive error, in row order, with the row it forecasts. A fold's training prefix holds
  // exactly the errors whose rows it contains, because every lagged value comes before its row.
  const errorRows: Array<number> = [];
  const errors: Array<number> = [];
  const lagMs = lag.kind === "duration" ? lag.lagMs : undefined;
  const byTimestamp = lagMs === undefined ? undefined : valuesByTimestamp(observations);

  for (const [index, row] of observations.entries()) {
    const previous =
      lagMs === undefined || byTimestamp === undefined
        ? observations[index - 1]?.value
        : laggedValue(byTimestamp, row.timestamp, lagMs);

    if (previous === undefined) continue;
    errorRows.push(index);
    errors.push(Math.abs(row.value - previous));
  }

  const scales = new Map<number, number>();
  let count = 0;

  for (const fold of plan.indexes) {
    while ((errorRows[count] ?? Infinity) < fold.trainingEndExclusive) count += 1;

    const failure = (reason: MetricScaleError["reason"]) =>
      new MetricScaleError({
        metric: name,
        fold: fold.index,
        cutoff: fold.cutoff,
        reason,
        message: `Cannot scale ${name} for fold ${fold.index}: ${reason}`,
      });

    if (count === 0) return yield* failure("insufficient-history");
    const scale = kahanSum(errors, 0, count) / count;

    if (!Number.isFinite(scale)) return yield* failure("non-finite");

    if (scale === 0) return yield* failure("zero-scale");
    scales.set(fold.cutoff, scale);
  }

  yield* Effect.annotateCurrentSpan({
    "effect_prophet.metric.lag": lag.kind,
    "effect_prophet.fold.count": plan.indexes.length,
  });

  return Object.freeze({
    // SAFETY: the decoded name is the caller's `Name`, or `"mase"` when they gave none.
    name: name as Name,
    reduce: "mean" as const,
    // A row from another plan has no scale, and fails as a non-finite score.
    score: (row) => {
      const scale = scales.get(row.cutoff);
      const residual = residualOf(row.actual, row.predicted);

      return scale === undefined || residual === undefined
        ? Number.NaN
        : Math.abs(residual) / scale;
    },
  });
});
