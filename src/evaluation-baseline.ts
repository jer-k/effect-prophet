import { Effect, Schema } from "effect";

import {
  EvaluationError,
  EvaluationMetricError,
  InputValidationError,
  inputValidationErrorFromIssue,
} from "./errors";
import {
  PositiveDurationMsSchema,
  resolveBaselinePlan,
  type CrossValidationPointRow,
  type CrossValidationResult,
  type RollingOriginFoldSummary,
  type RollingOriginPlanSummary,
} from "./evaluation";
import { performanceMetrics, type MetricOptions, type MetricReport } from "./evaluation-metrics";
import { checkedAdd } from "./internal/safe-arithmetic";
import { decodeObservations } from "./observation";

const BaselineDefinitionSchema = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("last-observation") }),
  Schema.Struct({ kind: Schema.Literal("training-mean") }),
  Schema.Struct({
    kind: Schema.Literal("seasonal-naive"),
    lagMs: PositiveDurationMsSchema,
  }),
]);

/** A training-only deterministic evaluation policy, not a fitted Prophet model. */
export type BaselineDefinition = typeof BaselineDefinitionSchema.Encoded;

/** One completed baseline fold; no fitted handle or future target is retained. */
export type BaselineFoldSummary = RollingOriginFoldSummary;

/** Owned point forecasts on exactly the plan's assessment instances. */
export interface BaselineCrossValidationResult {
  readonly kind: "baseline";
  readonly baseline: BaselineDefinition;
  readonly plan: RollingOriginPlanSummary;
  readonly rows: ReadonlyArray<CrossValidationPointRow>;
  readonly folds: ReadonlyArray<BaselineFoldSummary>;
}

/** Side-by-side metric values computed from one shared, explicit metric policy. */
export interface ComparisonReport {
  readonly model: MetricReport<"point" | "intervals">;
  readonly baselines: ReadonlyArray<{
    readonly baseline: BaselineDefinition;
    readonly metrics: MetricReport<"baseline">;
  }>;
}

const decodeBaseline = Schema.decodeUnknownEffect(BaselineDefinitionSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const baselineFailure = (
  fold: number,
  cutoff: number,
  reason: "baseline-unavailable" | "non-finite",
  rowIndex?: number,
): EvaluationError =>
  new EvaluationError(
    rowIndex === undefined
      ? {
          fold,
          cutoff,
          stage: "baseline",
          reason,
          message: `Evaluation baseline ${reason} in fold ${fold}`,
        }
      : {
          fold,
          cutoff,
          stage: "baseline",
          reason,
          rowIndex,
          message: `Evaluation baseline ${reason} in fold ${fold}`,
        },
  );

/** Evaluate a validated rolling-origin summary using only each fold's training prefix. */
export const crossValidateBaseline = Effect.fn("Prophet.crossValidateBaseline")(function* (
  history: Parameters<typeof decodeObservations>[0],
  summary: RollingOriginPlanSummary,
  definition: BaselineDefinition,
): Effect.fn.Return<BaselineCrossValidationResult, InputValidationError | EvaluationError> {
  const observations = yield* decodeObservations(history);

  const baseline = yield* decodeBaseline(definition).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-baseline", error.issue)),
  );

  const plan = yield* resolveBaselinePlan(observations, summary);
  const rows: Array<CrossValidationPointRow> = [];

  for (const fold of plan.indexes) {
    const last = observations[fold.trainingEndExclusive - 1];

    if (last === undefined) {
      return yield* Effect.fail(baselineFailure(fold.index, fold.cutoff, "baseline-unavailable"));
    }

    let predicted = last.value;

    if (baseline.kind === "training-mean") {
      let sum = 0;
      let correction = 0;

      for (let index = 0; index < fold.trainingEndExclusive; index += 1) {
        const value = observations[index]?.value;

        if (value === undefined) {
          return yield* Effect.fail(baselineFailure(fold.index, fold.cutoff, "non-finite"));
        }

        const next = sum + value;
        const term = Math.abs(sum) >= Math.abs(value) ? sum - next + value : value - next + sum;
        const corrected = correction + term;

        if (!Number.isFinite(next) || !Number.isFinite(corrected)) {
          return yield* Effect.fail(baselineFailure(fold.index, fold.cutoff, "non-finite"));
        }

        sum = next;
        correction = corrected;
      }

      const total = sum + correction;
      predicted = total / fold.trainingEndExclusive;

      if (!Number.isFinite(total) || !Number.isFinite(predicted)) {
        return yield* Effect.fail(baselineFailure(fold.index, fold.cutoff, "non-finite"));
      }
    }

    const trainingByTimestamp = new Map<number, number>();

    if (baseline.kind === "seasonal-naive") {
      for (let index = 0; index < fold.trainingEndExclusive; index += 1) {
        const row = observations[index];

        if (row !== undefined) {
          trainingByTimestamp.set(row.timestamp, row.value);
        }
      }
    }

    for (let index = fold.assessmentStart; index < fold.assessmentEndExclusive; index += 1) {
      const row = observations[index];
      const rowIndex = index - fold.assessmentStart;

      if (row === undefined) {
        return yield* Effect.fail(
          baselineFailure(fold.index, fold.cutoff, "baseline-unavailable", rowIndex),
        );
      }

      let forecast = predicted;

      if (baseline.kind === "seasonal-naive") {
        const lagTimestamp = checkedAdd(row.timestamp, -baseline.lagMs);

        const value =
          lagTimestamp === undefined ? undefined : trainingByTimestamp.get(lagTimestamp);

        if (value === undefined) {
          return yield* Effect.fail(
            baselineFailure(fold.index, fold.cutoff, "baseline-unavailable", rowIndex),
          );
        }

        forecast = value;
      }

      rows.push(
        Object.freeze({
          fold: fold.index,
          cutoff: fold.cutoff,
          timestamp: row.timestamp,
          horizonMs: row.timestamp - fold.cutoff,
          actual: row.value,
          predicted: forecast,
        }),
      );
    }
  }

  return Object.freeze({
    kind: "baseline" as const,
    baseline: Object.freeze(baseline),
    plan: plan.summary,
    rows: Object.freeze(rows),
    folds: plan.summary.folds,
  });
});

const samePlan = (left: RollingOriginPlanSummary, right: RollingOriginPlanSummary): boolean =>
  left.horizonMs === right.horizonMs &&
  left.cutoffs.length === right.cutoffs.length &&
  left.folds.length === right.folds.length &&
  left.cutoffs.every((cutoff, index) => cutoff === right.cutoffs[index]) &&
  left.folds.every((fold, index) => {
    const other = right.folds[index];

    return (
      other !== undefined &&
      fold.index === other.index &&
      fold.cutoff === other.cutoff &&
      fold.trainingCount === other.trainingCount &&
      fold.assessmentCount === other.assessmentCount
    );
  });

/** Compare aligned model and baseline forecasts under one shared metric policy. */
export const comparePerformance = Effect.fn("Prophet.comparePerformance")(function* (
  model: CrossValidationResult,
  baselines: ReadonlyArray<BaselineCrossValidationResult>,
  options: MetricOptions,
): Effect.fn.Return<ComparisonReport, InputValidationError | EvaluationMetricError> {
  // Parse metric options through the existing metrics operation before alignment diagnostics.
  const modelMetrics = yield* performanceMetrics(model, options);
  const first = options.metrics[0];

  if (first === undefined) {
    return yield* Effect.fail(
      new InputValidationError({
        input: "evaluation-metrics",
        issues: [{ path: ["metrics"], message: "At least one metric is required" }],
        message: "At least one metric is required",
      }),
    );
  }

  const compared: Array<ComparisonReport["baselines"][number]> = [];

  for (const [baselineIndex, baseline] of baselines.entries()) {
    if (!samePlan(model.plan, baseline.plan) || baseline.rows.length !== model.rows.length) {
      return yield* Effect.fail(
        new EvaluationMetricError({
          metric: first,
          aggregation: options.aggregation.kind,
          bucket: baselineIndex,
          reason: "misaligned",
          stage: "input",
          message: "Baseline plan or assessment count differs from model",
        }),
      );
    }

    for (const [index, row] of model.rows.entries()) {
      const other = baseline.rows[index];

      if (
        other === undefined ||
        row.fold !== other.fold ||
        row.cutoff !== other.cutoff ||
        row.timestamp !== other.timestamp ||
        row.horizonMs !== other.horizonMs ||
        !Object.is(row.actual, other.actual)
      ) {
        return yield* Effect.fail(
          new EvaluationMetricError({
            metric: first,
            aggregation: options.aggregation.kind,
            bucket: index,
            reason: "misaligned",
            stage: "input",
            message: "Baseline assessment row differs from model",
          }),
        );
      }
    }

    const metrics = yield* performanceMetrics(baseline, options);
    compared.push(Object.freeze({ baseline: baseline.baseline, metrics }));
  }

  return Object.freeze({ model: modelMetrics, baselines: Object.freeze(compared) });
});
