import { Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
  comparePerformance,
  crossValidateBaseline,
  EvaluationError,
  EvaluationMetricError,
  InputValidationError,
  performanceMetrics,
  planRollingOrigin,
  type EncodedObservation,
  type EncodedObservations,
  type PointCrossValidationResult,
} from "../src/index";

const day = 86_400_000;

const at = (index: number) => new Date(Date.UTC(2024, 0, 1) + index * day).toISOString();

const history = (
  days: readonly [number, ...number[]],
  values: ReadonlyArray<number>,
): EncodedObservations => [
  { timestamp: at(days[0]), value: values[0] ?? 0 },
  ...days.slice(1).map((dayIndex, index) => ({
    timestamp: at(dayIndex),
    value: values[index + 1] ?? 0,
  })),
];

const observations = history([0, 1, 2, 3, 4, 5], [2, 4, 6, 8, 10, 12]);

const plan = () =>
  Effect.runPromise(
    planRollingOrigin(
      observations,
      {},
      {
        horizonMs: 2 * day,
        cutoffs: { mode: "explicit", timestamps: [at(1), at(2)] },
      },
    ),
  );

const run = async (definition: Parameters<typeof crossValidateBaseline>[2]) =>
  Effect.runPromise(crossValidateBaseline(observations, await plan(), definition));

const modelFrom = (baseline: Awaited<ReturnType<typeof run>>): PointCrossValidationResult => ({
  kind: "point",
  plan: baseline.plan,
  folds: baseline.folds.map((fold) => ({ ...fold, model: "flat-map" })),
  rows: baseline.rows.map((row) => ({ ...row, predicted: row.predicted + 1 })),
});

describe("forecast baselines", () => {
  it("uses each fold's training prefix and ignores future target changes", async () => {
    const last = await run({ kind: "last-observation" });
    const mean = await run({ kind: "training-mean" });

    expect(last.rows.map((row) => row.predicted)).toEqual([4, 4, 6, 6]);
    expect(mean.rows.map((row) => row.predicted)).toEqual([3, 3, 4, 4]);
    expect(last.rows.map((row) => row.actual)).toEqual([6, 8, 8, 10]);
    expect(Object.isFrozen(last.rows)).toBe(true);

    const changed = history([0, 1, 2, 3, 4, 5], [2, 4, 600, 800, 1000, 1200]);

    const recalculated = await Effect.runPromise(
      crossValidateBaseline(changed, last.plan, { kind: "last-observation" }),
    );

    expect(recalculated.rows.slice(0, 2).map((row) => row.predicted)).toEqual([4, 4]);
    expect(observations[2]?.value).toBe(6);
  });

  it("requires exact training lag timestamps, never filling irregular gaps", async () => {
    const seasonal = await run({ kind: "seasonal-naive", lagMs: 2 * day });

    expect(seasonal.rows.map((row) => row.predicted)).toEqual([2, 4, 4, 6]);

    const irregular = history([0, 1, 3, 4, 5], [2, 4, 8, 10, 12]);

    const summary = await Effect.runPromise(
      planRollingOrigin(
        irregular,
        {},
        {
          horizonMs: 2 * day,
          cutoffs: { mode: "explicit", timestamps: [at(1)] },
        },
      ),
    );

    const unavailable = await Effect.runPromise(
      crossValidateBaseline(irregular, summary, { kind: "seasonal-naive", lagMs: day }).pipe(
        Effect.flip,
      ),
    );

    expect(unavailable).toBeInstanceOf(EvaluationError);
    expect(unavailable).toMatchObject({
      stage: "baseline",
      reason: "baseline-unavailable",
      fold: 0,
      rowIndex: 0,
    });
  });

  it("predicts on exact subdaily lag timestamps without frequency inference", async () => {
    const hour = 3_600_000;

    const base = Date.UTC(2024, 0, 1);

    const hourly: EncodedObservations = [
      { timestamp: new Date(base).toISOString(), value: 1 },
      { timestamp: new Date(base + hour).toISOString(), value: 2 },
      { timestamp: new Date(base + 2 * hour).toISOString(), value: 3 },
      { timestamp: new Date(base + 3 * hour).toISOString(), value: 4 },
    ];

    const summary = await Effect.runPromise(
      planRollingOrigin(
        hourly,
        {},
        {
          horizonMs: hour,
          cutoffs: { mode: "explicit", timestamps: [new Date(base + hour).toISOString()] },
        },
      ),
    );

    const forecast = await Effect.runPromise(
      crossValidateBaseline(hourly, summary, { kind: "seasonal-naive", lagMs: 2 * hour }),
    );

    expect(forecast.rows.map((row) => row.predicted)).toEqual([1]);
  });

  it("ignores complete logistic and feature fields and accepts one-row training", async () => {
    const enrich = (row: EncodedObservation): EncodedObservation => ({
      ...row,
      capacity: 100,
      floor: 0,
      conditions: { active: true },
      regressors: { future: 999 },
    });

    const [first, ...rest] = observations;
    const enriched: EncodedObservations = [enrich(first), ...rest.map(enrich)];

    const result = await Effect.runPromise(
      crossValidateBaseline(enriched, await plan(), { kind: "last-observation" }),
    );

    expect(result.rows.map((row) => row.predicted)).toEqual([4, 4, 6, 6]);
    expect(result.rows[0]).not.toHaveProperty("regressors");

    const sparse = history([0, 2, 3, 4], [7, 9, 11, 13]);

    const summary = await Effect.runPromise(
      planRollingOrigin(
        sparse,
        {},
        {
          horizonMs: 2 * day,
          cutoffs: { mode: "explicit", timestamps: [at(1)] },
        },
      ),
    );

    const one = await Effect.runPromise(
      crossValidateBaseline(sparse, summary, { kind: "training-mean" }),
    );

    expect(one.folds[0]?.trainingCount).toBe(1);
    expect(one.rows.map((row) => row.predicted)).toEqual([7, 7]);
  });

  it("types overflow, invalid durations and inconsistent fold summaries", async () => {
    const large = history([0, 1, 2, 3], [1e308, 1e308, 2, 3]);

    const summary = await Effect.runPromise(
      planRollingOrigin(
        large,
        {},
        {
          horizonMs: day,
          cutoffs: { mode: "explicit", timestamps: [at(1)] },
        },
      ),
    );

    const overflow = await Effect.runPromise(
      crossValidateBaseline(large, summary, { kind: "training-mean" }).pipe(Effect.flip),
    );

    expect(overflow).toBeInstanceOf(EvaluationError);
    expect(overflow).toMatchObject({ stage: "baseline", reason: "non-finite" });

    const invalid = await Effect.runPromise(
      crossValidateBaseline(observations, await plan(), { kind: "seasonal-naive", lagMs: 0 }).pipe(
        Effect.flip,
      ),
    );

    expect(invalid).toBeInstanceOf(InputValidationError);
    expect(invalid).toMatchObject({ input: "evaluation-baseline" });

    const original = await plan();

    const forged = {
      ...original,
      folds: original.folds.map((fold) => ({ ...fold, trainingCount: 999 })),
    };

    const rejected = await Effect.runPromise(
      crossValidateBaseline(observations, forged, { kind: "last-observation" }).pipe(Effect.flip),
    );

    expect(rejected).toBeInstanceOf(InputValidationError);
    expect(rejected).toMatchObject({ input: "evaluation-plan" });
  });

  it("reuses point metric modes and rejects mismatched plan, rows and coverage", async () => {
    const baseline = await run({ kind: "training-mean" });
    const model = modelFrom(baseline);
    const metrics = ["mae", "mse", "rmse", "mape", "mdape", "smape"] as const;

    for (const aggregation of [
      { kind: "rows" },
      { kind: "horizons" },
      { kind: "rolling", window: { kind: "count", rows: 2 } },
      { kind: "overall" },
    ] as const) {
      const report = await Effect.runPromise(
        performanceMetrics(baseline, { metrics, aggregation }),
      );

      expect(report.source).toBe("baseline");
    }

    const comparison = await Effect.runPromise(
      comparePerformance(model, [baseline], {
        metrics: ["mae"],
        aggregation: { kind: "overall" },
      }),
    );

    expect(comparison.baselines[0]?.metrics).toMatchObject({ source: "baseline", kind: "overall" });
    expect(comparison.model).toMatchObject({ source: "point", kind: "overall" });

    const altered = {
      ...baseline,
      rows: baseline.rows.map((row, index) => (index === 0 ? { ...row, actual: 900 } : row)),
    };

    const mismatch = await Effect.runPromise(
      comparePerformance(model, [altered], {
        metrics: ["mae"],
        aggregation: { kind: "overall" },
      }).pipe(Effect.flip),
    );

    expect(mismatch).toBeInstanceOf(EvaluationMetricError);
    expect(mismatch).toMatchObject({ reason: "misaligned" });

    const unavailable = await Effect.runPromise(
      performanceMetrics(baseline, {
        metrics: ["coverage"],
        aggregation: { kind: "overall" },
      }).pipe(Effect.flip),
    );

    expect(unavailable).toMatchObject({ reason: "unavailable" });
  });

  it("checks plan and row alignment before reporting any comparison", async () => {
    const baseline = await run({ kind: "last-observation" });
    const model = modelFrom(baseline);
    const policy = { metrics: ["mae"], aggregation: { kind: "rows" } } as const;

    const otherPlan = await Effect.runPromise(
      planRollingOrigin(
        observations,
        {},
        {
          horizonMs: day,
          cutoffs: { mode: "explicit", timestamps: [at(1), at(2)] },
        },
      ),
    );

    const wrongPlan = { ...baseline, plan: otherPlan };

    const planError = await Effect.runPromise(
      comparePerformance(model, [wrongPlan], policy).pipe(Effect.flip),
    );

    expect(planError).toBeInstanceOf(EvaluationMetricError);
    expect(planError).toMatchObject({ reason: "misaligned" });

    const reversed = { ...baseline, rows: [...baseline.rows].reverse() };

    const rowError = await Effect.runPromise(
      comparePerformance(model, [reversed], policy).pipe(Effect.flip),
    );

    expect(rowError).toMatchObject({ reason: "misaligned" });

    const zero = await Effect.runPromise(
      comparePerformance(model, [baseline], {
        metrics: ["mape"],
        aggregation: { kind: "overall" },
        mapeZeroActual: "exclude",
      }),
    );

    expect(zero.baselines[0]?.metrics.kind).toBe("overall");
  });

  it("treats assessment-only and out-of-range lag matches as unavailable", async () => {
    const summary = await plan();

    const assessmentOnly = await Effect.runPromise(
      crossValidateBaseline(observations, summary, { kind: "seasonal-naive", lagMs: day }).pipe(
        Effect.flip,
      ),
    );

    expect(assessmentOnly).toMatchObject({ reason: "baseline-unavailable", fold: 0, rowIndex: 1 });

    const early = history([0, 1, 2, 3], [1, 2, 3, 4]);

    const earlyPlan = await Effect.runPromise(
      planRollingOrigin(
        early,
        {},
        {
          horizonMs: day,
          cutoffs: { mode: "explicit", timestamps: [at(1)] },
        },
      ),
    );

    const unavailable = await Effect.runPromise(
      crossValidateBaseline(early, earlyPlan, { kind: "seasonal-naive", lagMs: 3_650 * day }).pipe(
        Effect.flip,
      ),
    );

    expect(unavailable).toMatchObject({ reason: "baseline-unavailable", fold: 0, rowIndex: 0 });
  });

  it("traces public orchestration but emits no fictitious fold or WASM spans", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);

        spans.push(span);

        return span;
      },
    });

    await Effect.runPromise(
      crossValidateBaseline(observations, await plan(), { kind: "last-observation" }).pipe(
        Effect.withSpan("baseline.parent"),
        Effect.withTracer(tracer),
      ),
    );

    const parent = spans.find((span) => span.name === "baseline.parent");
    const operation = spans.find((span) => span.name === "Prophet.crossValidateBaseline");

    if (
      parent === undefined ||
      operation === undefined ||
      !Predicate.isTagged("Ended")(parent.status) ||
      !Predicate.isTagged("Ended")(operation.status)
    ) {
      throw new Error("Expected completed baseline spans");
    }

    expect(operation.traceId).toBe(parent.traceId);
    expect(operation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);
    expect(operation.status.startTime).toBeGreaterThanOrEqual(parent.status.startTime);
    expect(operation.status.endTime).toBeLessThanOrEqual(parent.status.endTime);
    expect(Exit.isSuccess(operation.status.exit)).toBe(true);
    expect(Array.from(operation.attributes)).toEqual([]);
    expect(
      spans.some((span) => span.name.includes("evaluation.fold") || span.name.includes("wasm")),
    ).toBe(false);

    spans.length = 0;

    const failure = await Effect.runPromise(
      crossValidateBaseline(observations, await plan(), {
        kind: "seasonal-naive",
        lagMs: 6 * day,
      }).pipe(Effect.withSpan("baseline.parent"), Effect.withTracer(tracer), Effect.exit),
    );

    const failed = spans.find((span) => span.name === "Prophet.crossValidateBaseline");

    expect(Exit.isFailure(failure)).toBe(true);

    if (failed === undefined || !Predicate.isTagged("Ended")(failed.status)) {
      throw new Error("Expected failed baseline span");
    }

    expect(Exit.isFailure(failed.status.exit)).toBe(true);

    spans.length = 0;

    const baseline = await run({ kind: "last-observation" });
    await Effect.runPromise(
      comparePerformance(modelFrom(baseline), [baseline], {
        metrics: ["mae"],
        aggregation: { kind: "overall" },
      }).pipe(Effect.withSpan("comparison.parent"), Effect.withTracer(tracer)),
    );

    const comparisonParent = spans.find((span) => span.name === "comparison.parent");
    const comparisonSpan = spans.find((span) => span.name === "Prophet.comparePerformance");

    if (
      comparisonParent === undefined ||
      comparisonSpan === undefined ||
      !Predicate.isTagged("Ended")(comparisonParent.status) ||
      !Predicate.isTagged("Ended")(comparisonSpan.status)
    ) {
      throw new Error("Expected completed comparison spans");
    }

    expect(comparisonSpan.traceId).toBe(comparisonParent.traceId);
    expect(comparisonSpan.parent.pipe(Option.getOrUndefined)?.spanId).toBe(comparisonParent.spanId);
    expect(comparisonSpan.status.startTime).toBeGreaterThanOrEqual(
      comparisonParent.status.startTime,
    );
    expect(comparisonSpan.status.endTime).toBeLessThanOrEqual(comparisonParent.status.endTime);
    expect(Exit.isSuccess(comparisonSpan.status.exit)).toBe(true);
    expect(Array.from(comparisonSpan.attributes)).toEqual([]);
    expect(
      spans.some((span) => span.name.includes("evaluation.fold") || span.name.includes("wasm")),
    ).toBe(false);
  });
});
