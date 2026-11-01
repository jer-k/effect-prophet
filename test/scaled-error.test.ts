import { Effect, Exit, Option } from "effect";
import { describe, expect, it } from "vitest";

import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

import {
  EvaluationMetricError,
  InputValidationError,
  MetricScaleError,
  comparePerformance,
  crossValidateBaseline,
  performanceMetrics,
  planRollingOrigin,
  prophetFittingBackendLayer,
  scaledErrorMetric,
  searchModels,
  type EncodedObservations,
  type RollingOriginPlanSummary,
  type ScaledErrorOptions,
} from "../src/index";

const day = 86_400_000;

const at = (index: number) => new Date(Date.UTC(2024, 0, 1) + index * day).toISOString();

const history = (
  days: ReadonlyArray<number>,
  values: ReadonlyArray<number>,
): EncodedObservations => {
  const [first, ...rest] = days.map((dayIndex, index) => ({
    timestamp: at(dayIndex),
    value: values[index] ?? 0,
  }));

  if (first === undefined) throw new Error("Expected at least one row");

  return [first, ...rest];
};

const planFor = (rows: EncodedObservations, cutoffs: ReadonlyArray<number>, horizonDays = 2) =>
  Effect.runPromise(
    planRollingOrigin(
      rows,
      {},
      {
        horizonMs: horizonDays * day,
        cutoffs: { mode: "explicit", timestamps: cutoffs.map(at) },
      },
    ),
  );

// Naive errors |5-2|, |4-5|, |8-4|, |7-8|, |12-7| = 3, 1, 4, 1, 5.
const observations = history([0, 1, 2, 3, 4, 5], [2, 5, 4, 8, 7, 12]);

const scoresOf = (report: { readonly points: ReadonlyArray<{ readonly scores: unknown }> }) =>
  report.points.map(({ scores }) => scores);

// A typed failure; defects still reject.
const failureOf = <A, E>(effect: Effect.Effect<A, E>): Promise<E> =>
  Effect.runPromise(Effect.flip(effect));

describe("scaledErrorMetric", () => {
  it("scales each fold's absolute errors by its own training rows' naive error", async () => {
    const summary = await planFor(observations, [2, 3]);
    const mase = await Effect.runPromise(scaledErrorMetric(observations, summary));

    const forecasts = await Effect.runPromise(
      crossValidateBaseline(observations, summary, { kind: "last-observation" }),
    );

    // Fold 0 trains on days 0-2 (scale (3 + 1) / 2 = 2) and repeats 4; fold 1 trains on days 0-3
    // (scale (3 + 1 + 4) / 3 = 8/3) and repeats 8.
    const rows = await Effect.runPromise(
      performanceMetrics(forecasts, { metrics: ["mae", mase], aggregation: { kind: "rows" } }),
    );

    if (rows.kind !== "rows") throw new Error("Expected row metrics");

    expect(
      rows.points.map(({ cutoff, timestamp, scores }) => [
        cutoff,
        timestamp,
        scores.map(({ value }) => value),
      ]),
    ).toEqual([
      [Date.parse(at(2)), Date.parse(at(3)), [4, 2]],
      [Date.parse(at(3)), Date.parse(at(4)), [1, 0.375]],
      [Date.parse(at(2)), Date.parse(at(4)), [3, 1.5]],
      [Date.parse(at(3)), Date.parse(at(5)), [4, 1.5]],
    ]);

    const overall = await Effect.runPromise(
      performanceMetrics(forecasts, { metrics: [mase], aggregation: { kind: "overall" } }),
    );

    if (overall.kind !== "overall") throw new Error("Expected overall metrics");

    expect(overall.bucket.scores).toEqual([{ metric: "mase", value: 5.375 / 4 }]);

    const horizons = await Effect.runPromise(
      performanceMetrics(forecasts, { metrics: [mase], aggregation: { kind: "horizons" } }),
    );

    if (horizons.kind !== "horizons") throw new Error("Expected horizon metrics");

    expect(scoresOf(horizons)).toEqual([
      [{ metric: "mase", value: (2 + 0.375) / 2 }],
      [{ metric: "mase", value: (1.5 + 1.5) / 2 }],
    ]);
  });

  it("pairs consecutive rows or exact lags, never filling irregular gaps", async () => {
    // Days 3 and 6 are missing.
    const rows = history([0, 1, 2, 4, 5, 7, 8, 9], [1, 3, 4, 10, 6, 7, 15, 16]);
    const summary = await planFor(rows, [8], 1);

    const forecasts = await Effect.runPromise(
      crossValidateBaseline(rows, summary, { kind: "last-observation" }),
    );

    const score = async (options?: ScaledErrorOptions<string>) => {
      const metric = await Effect.runPromise(scaledErrorMetric(rows, summary, options));

      const report = await Effect.runPromise(
        performanceMetrics(forecasts, { metrics: [metric], aggregation: { kind: "overall" } }),
      );

      if (report.kind !== "overall") throw new Error("Expected overall metrics");

      return report.bucket.scores[0];
    };

    // The forecast for day 9 repeats 15, one off. Consecutive rows: 2, 1, 6, 4, 1, 8, mean 22/6.
    expect(await score()).toEqual({
      metric: "mase",
      value: 1 / (22 / 6),
    });

    // Two days back: day 2 (4 - 1), day 4 (10 - 4), day 7 (7 - 6); days 1, 5 and 8 have no match.
    expect(
      await score({ name: "mase_two_day", lag: { kind: "duration", lagMs: 2 * day } }),
    ).toEqual({ metric: "mase_two_day", value: 1 / (10 / 3) });
  });

  it("types folds without lag pairs, constant training values and overflow", async () => {
    const summary = await planFor(observations, [1, 3]);

    const insufficient = await failureOf(
      scaledErrorMetric(observations, summary, { lag: { kind: "duration", lagMs: 2 * day } }),
    );

    expect(insufficient).toBeInstanceOf(MetricScaleError);
    expect(insufficient).toMatchObject({
      metric: "mase",
      fold: 0,
      cutoff: Date.parse(at(1)),
      reason: "insufficient-history",
    });

    const flat = history([0, 1, 2, 3, 4, 5], [3, 3, 3, 4, 5, 6]);

    const constant = await failureOf(
      scaledErrorMetric(flat, await planFor(flat, [2, 3]), { name: "flat_mase" }),
    );

    expect(constant).toBeInstanceOf(MetricScaleError);
    expect(constant).toMatchObject({
      metric: "flat_mase",
      fold: 0,
      cutoff: Date.parse(at(2)),
      reason: "zero-scale",
    });

    const extreme = history([0, 1, 2, 3, 4], [-1e308, 1e308, 0, 1, 2]);

    expect(await failureOf(scaledErrorMetric(extreme, await planFor(extreme, [2])))).toMatchObject({
      reason: "non-finite",
      fold: 0,
    });
  });

  it("rejects invalid names, lags, extra keys and plans that don't match the history", async () => {
    const summary = await planFor(observations, [2, 3]);

    for (const options of [
      { name: "mae" },
      { name: "1st" },
      { lag: { kind: "duration", lagMs: 0 } },
      { lag: { kind: "previous-row" }, window: 3 },
    ]) {
      // SAFETY: deliberately invalid JavaScript input.
      const failure = await failureOf(scaledErrorMetric(observations, summary, options as never));

      expect(failure).toBeInstanceOf(InputValidationError);
      expect(failure).toMatchObject({ input: "evaluation-metrics" });
    }

    const shorter = history([0, 1, 2, 3], [2, 5, 4, 8]);

    const mismatched = await failureOf(scaledErrorMetric(shorter, summary));

    expect(mismatched).toBeInstanceOf(InputValidationError);
    expect(mismatched).toMatchObject({ input: "evaluation-plan" });
  });

  it("fails rows from another plan as unscorable rather than inventing a scale", async () => {
    const mase = await Effect.runPromise(
      scaledErrorMetric(observations, await planFor(observations, [2])),
    );

    const forecasts = await Effect.runPromise(
      crossValidateBaseline(observations, await planFor(observations, [3]), {
        kind: "last-observation",
      }),
    );

    const failure = await failureOf(
      performanceMetrics(forecasts, { metrics: [mase], aggregation: { kind: "overall" } }),
    );

    expect(failure).toBeInstanceOf(EvaluationMetricError);
    expect(failure).toMatchObject({ metric: "mase", reason: "non-finite", stage: "score" });
  });

  it("keeps its scales when the caller's history and plan change afterwards", async () => {
    const rows = history([0, 1, 2, 3, 4, 5], [2, 5, 4, 8, 7, 12]);
    const summary: RollingOriginPlanSummary = await planFor(rows, [2, 3]);
    const mase = await Effect.runPromise(scaledErrorMetric(rows, summary));

    const forecasts = await Effect.runPromise(
      crossValidateBaseline(rows, summary, { kind: "last-observation" }),
    );

    const before = await Effect.runPromise(
      performanceMetrics(forecasts, { metrics: [mase], aggregation: { kind: "overall" } }),
    );

    expect(Object.isFrozen(mase)).toBe(true);
    expect(Object.isFrozen(rows)).toBe(false);

    const first = rows[1];

    if (first === undefined) throw new Error("Missing history row");
    // SAFETY: mutating the caller's own encoded rows after the metric was made.
    (first as { value: number }).value = 500;

    const after = await Effect.runPromise(
      performanceMetrics(forecasts, { metrics: [mase], aggregation: { kind: "overall" } }),
    );

    expect(after).toEqual(before);
  });

  it("compares a model with a naive baseline under the same scale", async () => {
    const summary = await planFor(observations, [2, 3]);
    const mase = await Effect.runPromise(scaledErrorMetric(observations, summary));

    const naive = await Effect.runPromise(
      crossValidateBaseline(observations, summary, { kind: "last-observation" }),
    );

    const mean = await Effect.runPromise(
      crossValidateBaseline(observations, summary, { kind: "training-mean" }),
    );

    const model = {
      kind: "point" as const,
      plan: mean.plan,
      folds: mean.folds.map((fold) => ({ ...fold, model: "flat-map" as const })),
      rows: mean.rows,
    };

    const report = await Effect.runPromise(
      comparePerformance(model, [naive], { metrics: [mase], aggregation: { kind: "overall" } }),
    );

    if (report.model.kind !== "overall" || report.baselines[0]?.metrics.kind !== "overall") {
      throw new Error("Expected overall comparison");
    }

    expect(report.baselines[0].metrics.bucket.scores).toEqual([
      { metric: "mase", value: 5.375 / 4 },
    ]);

    expect(report.model.bucket.scores[0]?.metric).toBe("mase");
  });

  it("ranks searched candidates by MASE on the plan it was scaled for", async () => {
    const rows = history(
      Array.from({ length: 14 }, (_, index) => index),
      Array.from({ length: 14 }, (_, index) => 4 + index * 0.8 + (index > 6 ? 2 : 0)),
    );

    const planInput = {
      horizonMs: 2 * day,
      cutoffs: { mode: "explicit", timestamps: [at(7), at(9)] },
    } as const;

    const summary = await Effect.runPromise(planRollingOrigin(rows, {}, planInput));
    const mase = await Effect.runPromise(scaledErrorMetric(rows, summary));

    const candidates = [
      {
        id: "stiff",
        options: { growth: "linear" as const, map: { changepointPriorScale: 0.001 } },
      },
      { id: "loose", options: { growth: "linear" as const, map: { changepointPriorScale: 0.5 } } },
    ];

    const result = await Effect.runPromise(
      searchModels(rows, {
        candidates,
        plan: planInput,
        objective: { metric: mase, aggregation: { kind: "overall" }, direction: "minimize" },
        failurePolicy: "fail-fast",
        includeCrossValidation: true,
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    for (const candidate of result.candidates) {
      if (candidate.kind !== "success" || candidate.crossValidation === undefined) {
        throw new Error("Expected scored candidates");
      }

      const expected = await Effect.runPromise(
        performanceMetrics(candidate.crossValidation, {
          metrics: [mase],
          aggregation: { kind: "overall" },
        }),
      );

      if (expected.kind !== "overall") throw new Error("Expected overall metrics");

      expect(candidate.score).toBe(expected.bucket.scores[0]?.value);
    }

    expect(result.plan).toEqual(summary);
  });

  it("traces the factory under its caller and annotates only successful scales", async () => {
    const { spans, tracer } = collectTestSpans();
    const summary = await planFor(observations, [2, 3]);

    await Effect.runPromise(
      scaledErrorMetric(observations, summary, { lag: { kind: "duration", lagMs: day } }).pipe(
        Effect.withSpan("scale.parent"),
        Effect.withTracer(tracer),
      ),
    );

    const parent = spans.find((span) => span.name === "scale.parent");
    const operation = spans.find((span) => span.name === "Prophet.scaledErrorMetric");

    if (parent === undefined || operation === undefined) throw new Error("Expected spans");
    const parentStatus = requireEndedSpan(parent);
    const status = requireEndedSpan(operation);

    expect(operation.traceId).toBe(parent.traceId);
    expect(operation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);
    expect(status.startTime).toBeGreaterThanOrEqual(parentStatus.startTime);
    expect(status.endTime).toBeLessThanOrEqual(parentStatus.endTime);
    expect(Exit.isSuccess(status.exit)).toBe(true);

    expect(Object.fromEntries(operation.attributes)).toEqual({
      "effect_prophet.metric.lag": "duration",
      "effect_prophet.fold.count": 2,
    });

    spans.length = 0;

    const flat = history([0, 1, 2, 3, 4, 5], [3, 3, 3, 4, 5, 6]);
    const flatSummary = await planFor(flat, [2]);

    const failure = await Effect.runPromiseExit(
      scaledErrorMetric(flat, flatSummary).pipe(
        Effect.withSpan("scale.parent"),
        Effect.withTracer(tracer),
      ),
    );

    const failed = spans.find((span) => span.name === "Prophet.scaledErrorMetric");

    if (failed === undefined) throw new Error("Expected failed span");

    expect(Exit.isFailure(failure)).toBe(true);
    expect(Exit.isFailure(requireEndedSpan(failed).exit)).toBe(true);
    expect(Array.from(failed.attributes)).toEqual([]);
  });
});
