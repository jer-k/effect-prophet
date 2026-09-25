import { Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
  decodeEvaluationReport,
  encodeEvaluationReport,
  evaluateHoldout,
  prophetFittingBackendLayer,
  searchModels,
  type EncodedObservations,
  type HoldoutEvaluationInput,
  type ModelSearchResult,
} from "../src/index";

const day = 86_400_000;

const epoch = Date.parse("2024-01-01T00:00:00.000Z");

const timestamp = (index: number): string => new Date(epoch + index * day).toISOString();

const observations: EncodedObservations = [
  { timestamp: timestamp(0), value: 4 },
  ...Array.from({ length: 17 }, (_, index) => ({
    timestamp: timestamp(index + 1),
    value: 4 + (index + 1) * 0.8 + (index > 8 ? 2 : 0),
  })),
];

const holdout: EncodedObservations = [
  { timestamp: timestamp(18), value: 21 },
  { timestamp: timestamp(19), value: 22 },
];

const find = async (): Promise<ModelSearchResult> =>
  Effect.runPromise(
    searchModels(observations, {
      candidates: [
        {
          id: "early",
          options: {
            growth: "linear",
            map: {
              changepoints: { mode: "explicit", timestamps: [timestamp(5)] },
            },
          },
        },
        {
          id: "none",
          options: {
            growth: "linear",
            map: {
              changepoints: { mode: "explicit", timestamps: [] },
            },
          },
        },
      ],
      plan: {
        horizonMs: 2 * day,
        cutoffs: { mode: "explicit", timestamps: [timestamp(11), timestamp(14)] },
      },
      objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
      failurePolicy: "record",
    }).pipe(Effect.provide(prophetFittingBackendLayer)),
  );

const input = (search: ModelSearchResult): HoldoutEvaluationInput => {
  const selected = search.candidates[search.selected.candidateIndex];

  if (selected?.kind !== "success") throw new Error("Expected successful search");

  return {
    development: observations,
    holdout,
    search,
    selectedCandidate: {
      id: selected.id,
      candidateIndex: selected.candidateIndex,
      options: selected.options,
      score: selected.score,
    },
    metrics: { metrics: ["mae", "coverage"], aggregation: { kind: "overall" } },
    baselines: [{ kind: "last-observation" }, { kind: "seasonal-naive", lagMs: 7 * day }],
    uncertainty: { seed: 42, samples: 16, intervalWidth: 0.8 },
    provenance: { build: "local-test", environment: "node" },
  };
};

const run = (request: HoldoutEvaluationInput) =>
  evaluateHoldout(request).pipe(Effect.provide(prophetFittingBackendLayer));

describe("evaluateHoldout", () => {
  it("fits the selected MAP option only on development and roundtrips a strict report", async () => {
    const search = await find();
    const report = await Effect.runPromise(run(input(search)));
    expect(report.kind).toBe("intervals");
    expect(report.forecasts).toHaveLength(2);
    expect(report.baselines).toHaveLength(2);
    expect(report.metrics.bucket.rowCount).toBe(2);
    expect(report.selected.id).toBe(search.selected.id);
    expect(report.development.rowCount).toBe(18);
    expect(report.holdout.rowCount).toBe(2);
    expect(report.candidates).toHaveLength(2);
    expect(Object.isFrozen(report)).toBe(true);
    expect(Object.isFrozen(report.forecasts)).toBe(true);
    expect(Object.isFrozen(report.selected.options)).toBe(true);

    const encoded = await Effect.runPromise(encodeEvaluationReport(report));

    const decoded = await Effect.runPromise(
      decodeEvaluationReport(JSON.parse(JSON.stringify(encoded))),
    );

    expect(decoded).toEqual(encoded);
    expect(Object.isFrozen(decoded.baselines[0]?.forecasts)).toBe(true);
  });

  it("scores a point-only holdout without simulation or baselines", async () => {
    const search = await find();
    const { uncertainty: _simulation, ...request } = input(search);

    const report = await Effect.runPromise(
      run({
        ...request,
        metrics: { metrics: ["mae"], aggregation: { kind: "overall" } },
        baselines: [],
      }),
    );

    expect(report.kind).toBe("point");
    expect(report.metrics.source).toBe("point");
    expect(report.baselines).toEqual([]);
    expect(report.forecasts[0]).not.toHaveProperty("lower");
  });

  it("keeps fitted state and simulations independent of holdout targets", async () => {
    const search = await find();
    const original = await Effect.runPromise(run(input(search)));

    const changed = await Effect.runPromise(
      run({
        ...input(search),
        holdout: [
          { timestamp: timestamp(18), value: 1 },
          { timestamp: timestamp(19), value: 100 },
        ],
      }),
    );

    expect(changed.selected).toEqual(original.selected);
    expect(changed.model).toEqual(original.model);
    expect(changed.kind).toBe("intervals");
    expect(original.kind).toBe("intervals");

    if (changed.kind === "intervals" && original.kind === "intervals") {
      expect(changed.simulation).toEqual(original.simulation);
    }

    expect(changed.forecasts.map(({ actual: _actual, ...forecast }) => forecast)).toEqual(
      original.forecasts.map(({ actual: _actual, ...forecast }) => forecast),
    );
    expect(changed.metrics).not.toEqual(original.metrics);
  });

  it("rejects invalid partitions and mismatched receipts before the execution span", async () => {
    const search = await find();
    const spans: Array<Tracer.NativeSpan> = [];

    const tracer = Tracer.make({
      span: (attributes) => {
        const span = new Tracer.NativeSpan(attributes);
        spans.push(span);

        return span;
      },
    });

    const bad: ReadonlyArray<HoldoutEvaluationInput> = [
      { ...input(search), holdout: [{ timestamp: timestamp(17), value: 99 }] },
      { ...input(search), selectedCandidate: { ...input(search).selectedCandidate, score: -1 } },
      {
        ...input(search),
        selectedCandidate: { ...input(search).selectedCandidate, options: { growth: "flat" } },
      },
      { ...input(search), metrics: { metrics: ["coverage"], aggregation: { kind: "overall" } } },
      {
        ...input(search),
        holdout: [
          { timestamp: timestamp(20), value: 2 },
          { timestamp: timestamp(19), value: 3 },
        ],
      },
    ];

    for (const request of bad) {
      const result = await Effect.runPromise(
        Effect.result(run(request).pipe(Effect.withTracer(tracer))),
      );

      expect(result._tag).toBe("Failure");
    }

    expect(spans.some((span) => span.name === "effect-prophet.evaluation.holdout")).toBe(false);
    expect(spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(false);
  });

  it("rejects OLS intervals before entering the holdout/WASM boundary", async () => {
    const search = await Effect.runPromise(
      searchModels(observations, {
        candidates: [{ id: "ols", options: {} }],
        plan: {
          horizonMs: 2 * day,
          cutoffs: { mode: "explicit", timestamps: [timestamp(11), timestamp(14)] },
        },
        objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
        failurePolicy: "record",
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const spans: Array<Tracer.NativeSpan> = [];

    const tracer = Tracer.make({
      span: (attributes) => {
        const span = new Tracer.NativeSpan(attributes);
        spans.push(span);

        return span;
      },
    });

    const result = await Effect.runPromise(
      Effect.result(run(input(search)).pipe(Effect.withTracer(tracer))),
    );

    expect(result._tag).toBe("Failure");
    expect(
      spans.some(
        (span) =>
          span.name === "effect-prophet.evaluation.holdout" ||
          span.name.startsWith("effect-prophet.wasm."),
      ),
    ).toBe(false);
  });

  it("reports missing known future regressors after fit but before prediction WASM", async () => {
    const development: EncodedObservations = [
      { ...observations[0], regressors: { promotion: 0 } },
      ...observations
        .slice(1)
        .map((row, index) => ({ ...row, regressors: { promotion: (index + 1) % 3 } })),
    ];

    const search = await Effect.runPromise(
      searchModels(development, {
        candidates: [
          {
            id: "regressor",
            options: {
              growth: "linear",
              regressors: [{ name: "promotion" }],
              map: { changepoints: { mode: "explicit", timestamps: [] } },
            },
          },
        ],
        plan: {
          horizonMs: 2 * day,
          cutoffs: { mode: "explicit", timestamps: [timestamp(11), timestamp(14)] },
        },
        objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
        failurePolicy: "record",
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const spans: Array<Tracer.NativeSpan> = [];

    const tracer = Tracer.make({
      span: (attributes) => {
        const span = new Tracer.NativeSpan(attributes);
        spans.push(span);

        return span;
      },
    });

    const failure = await Effect.runPromise(
      Effect.flip(
        run({
          ...input(search),
          development,
        }).pipe(Effect.withTracer(tracer)),
      ),
    );

    expect(failure).toMatchObject({ step: "predict", reason: "operation-failed" });
    expect(failure.cause).toMatchObject({ input: "prediction-rows" });
    expect(spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(true);
    expect(spans.some((span) => span.name === "effect-prophet.wasm.predict")).toBe(false);
  });

  it("rejects unavailable seasonal baselines and malformed reports", async () => {
    const search = await find();

    const unavailable = await Effect.runPromise(
      Effect.result(run({ ...input(search), baselines: [{ kind: "seasonal-naive", lagMs: day }] })),
    );

    expect(unavailable._tag).toBe("Failure");

    if (Predicate.isTagged("Failure")(unavailable)) {
      expect(unavailable.failure).toMatchObject({
        step: "baseline",
        reason: "baseline-unavailable",
      });
    }

    const report = await Effect.runPromise(run(input(search)));

    for (const changed of [
      { ...report, holdout: { ...report.holdout, rowCount: 4 } },
      {
        ...report,
        metrics: { ...report.metrics, bucket: { ...report.metrics.bucket, rowCount: 1 } },
      },
      { ...report, selected: { ...report.selected, options: { growth: "invalid" } } },
      { ...report, candidates: report.candidates.slice(1) },
      {
        ...report,
        baselines: report.baselines.map((baseline, index) =>
          index === 0
            ? { ...baseline, forecasts: baseline.forecasts.map((value) => value + 1) }
            : baseline,
        ),
      },
      { ...report, unexpected: 1 },
    ]) {
      const result = await Effect.runPromise(Effect.result(decodeEvaluationReport(changed)));
      expect(result._tag).toBe("Failure");
    }
  });

  it("decodes without a backend or misleading holdout/WASM spans", async () => {
    const search = await find();
    const report = await Effect.runPromise(run(input(search)));
    const spans: Array<Tracer.NativeSpan> = [];

    const tracer = Tracer.make({
      span: (attributes) => {
        const span = new Tracer.NativeSpan(attributes);
        spans.push(span);

        return span;
      },
    });

    const decoded = await Effect.runPromise(
      decodeEvaluationReport(JSON.parse(JSON.stringify(report))).pipe(Effect.withTracer(tracer)),
    );

    expect(decoded).toEqual(report);
    expect(
      spans.some(
        (span) =>
          span.name === "effect-prophet.evaluation.holdout" ||
          span.name.startsWith("effect-prophet.wasm."),
      ),
    ).toBe(false);
  });

  it("ends a failed holdout boundary when an exact-lag baseline is unavailable", async () => {
    const search = await find();
    const spans: Array<Tracer.NativeSpan> = [];

    const tracer = Tracer.make({
      span: (attributes) => {
        const span = new Tracer.NativeSpan(attributes);
        spans.push(span);

        return span;
      },
    });

    const result = await Effect.runPromise(
      Effect.result(
        run({
          ...input(search),
          baselines: [{ kind: "seasonal-naive", lagMs: day }],
        }).pipe(Effect.withTracer(tracer)),
      ),
    );

    expect(result._tag).toBe("Failure");

    const boundary = spans.find((span) => span.name === "effect-prophet.evaluation.holdout");
    const fitting = spans.find((span) => span.name === "Prophet.fit");
    const wasm = spans.find((span) => span.name === "effect-prophet.wasm.fit");

    if (
      boundary === undefined ||
      fitting === undefined ||
      wasm === undefined ||
      !Predicate.isTagged("Ended")(boundary.status)
    )
      throw new Error("Missing failed holdout trace");

    expect(Exit.isFailure(boundary.status.exit)).toBe(true);
    expect(fitting.parent.pipe(Option.getOrUndefined)?.spanId).toBe(boundary.spanId);
    expect(wasm.parent.pipe(Option.getOrUndefined)?.spanId).toBe(fitting.spanId);
    expect(wasm.traceId).toBe(boundary.traceId);
  });

  it("ends the holdout span with safe attributes and directly nested real WASM operations", async () => {
    const search = await find();
    const spans: Array<Tracer.NativeSpan> = [];

    const tracer = Tracer.make({
      span: (attributes) => {
        const span = new Tracer.NativeSpan(attributes);
        spans.push(span);

        return span;
      },
    });

    await Effect.runPromise(
      run(input(search)).pipe(Effect.withSpan("holdout.parent"), Effect.withTracer(tracer)),
    );
    const parent = spans.find((span) => span.name === "holdout.parent");
    const operation = spans.find((span) => span.name === "Prophet.evaluateHoldout");
    const holdoutSpan = spans.find((span) => span.name === "effect-prophet.evaluation.holdout");
    const fit = spans.find((span) => span.name === "Prophet.fit");
    const wasm = spans.find((span) => span.name === "effect-prophet.wasm.fit");
    const simulation = spans.find((span) => span.name === "Prophet.predictUncertainty");

    if (
      parent === undefined ||
      operation === undefined ||
      holdoutSpan === undefined ||
      fit === undefined ||
      wasm === undefined ||
      simulation === undefined ||
      !Predicate.isTagged("Ended")(holdoutSpan.status) ||
      !Predicate.isTagged("Ended")(wasm.status)
    ) {
      throw new Error("Missing completed spans");
    }

    expect(operation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);
    expect(holdoutSpan.parent.pipe(Option.getOrUndefined)?.spanId).toBe(operation.spanId);
    expect(fit.parent.pipe(Option.getOrUndefined)?.spanId).toBe(holdoutSpan.spanId);
    expect(wasm.parent.pipe(Option.getOrUndefined)?.spanId).toBe(fit.spanId);
    expect(simulation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(holdoutSpan.spanId);
    expect(wasm.traceId).toBe(holdoutSpan.traceId);
    expect(Exit.isSuccess(holdoutSpan.status.exit)).toBe(true);
    expect(wasm.status.startTime).toBeGreaterThanOrEqual(holdoutSpan.status.startTime);
    expect(wasm.status.endTime).toBeLessThanOrEqual(holdoutSpan.status.endTime);
    expect(Object.fromEntries(holdoutSpan.attributes)).toMatchObject({
      "effect_prophet.training.count": 18,
      "effect_prophet.assessment.count": 2,
      "effect_prophet.baseline.count": 2,
      "effect_prophet.uncertainty.enabled": true,
    });
    expect(JSON.stringify(Object.fromEntries(holdoutSpan.attributes))).not.toContain("early");
  });
});
