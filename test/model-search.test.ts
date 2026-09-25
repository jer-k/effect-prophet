import { Effect, Exit, Option, Predicate, Result, Schema, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { makeTestFittingBackend } from "./internal/fitting-backend-test-layer";

import {
  EvaluationError,
  EvaluationSearchError,
  InputValidationError,
  crossValidate,
  performanceMetrics,
  prophetFittingBackendLayer,
  searchModels,
  type EncodedObservations,
  type ModelSearchInput,
} from "../src/index";

const dayMs = 86_400_000;

const epoch = Date.parse("2024-01-01T00:00:00.000Z");

const at = (day: number): string => new Date(epoch + day * dayMs).toISOString();

const rows: EncodedObservations = [
  { timestamp: at(0), value: 4 },
  ...Array.from({ length: 13 }, (_, index) => {
    const day = index + 1;

    return { timestamp: at(day), value: 4 + day * 0.8 + (day > 6 ? 2 : 0) };
  }),
];

const plan = {
  horizonMs: 2 * dayMs,
  cutoffs: { mode: "explicit", timestamps: [at(7), at(9)] },
} as const;

const objective = {
  metric: "mae",
  aggregation: { kind: "overall" },
  direction: "minimize",
} as const;

const firstOption = { growth: "linear" as const, map: { changepointPriorScale: 0.01 } };

const options = [
  {
    id: "none",
    options: {
      growth: "linear" as const,
      map: { changepoints: { mode: "explicit" as const, timestamps: [] } },
    },
  },
  {
    id: "early",
    options: {
      growth: "linear" as const,
      map: {
        changepoints: { mode: "explicit" as const, timestamps: [at(4)] },
        changepointPriorScale: 0.1,
      },
    },
  },
  {
    id: "late",
    options: {
      growth: "linear" as const,
      map: {
        changepoints: { mode: "explicit" as const, timestamps: [at(6)] },
        changepointPriorScale: 1,
      },
    },
  },
];

const search = (input: ModelSearchInput) =>
  searchModels(rows, input).pipe(Effect.provide(prophetFittingBackendLayer));

describe("searchModels", () => {
  it("ranks three real MAP configurations using the same folds and independent CV scores", async () => {
    const result = await Effect.runPromise(
      search({ candidates: options, plan, objective, failurePolicy: "record" }),
    );

    expect(result.candidates).toHaveLength(3);
    expect(result.plan.cutoffs).toEqual([epoch + 7 * dayMs, epoch + 9 * dayMs]);
    expect(Object.isFrozen(result.candidates)).toBe(true);
    expect(result.candidates.every((candidate) => candidate.kind === "success")).toBe(true);

    for (const candidate of result.candidates) {
      if (candidate.kind !== "success") throw new Error("Expected a successful MAP candidate");

      const cv = await Effect.runPromise(
        crossValidate(rows, candidate.options, plan).pipe(
          Effect.provide(prophetFittingBackendLayer),
        ),
      );

      const report = await Effect.runPromise(
        performanceMetrics(cv, { metrics: ["mae"], aggregation: { kind: "overall" } }),
      );

      expect(report.kind).toBe("overall");

      if (report.kind === "overall") {
        expect(candidate.score).toBe(report.bucket.scores[0]?.value);
      }

      expect(candidate.metrics).toEqual(report);
      expect(candidate.crossValidation).toBeUndefined();
      expect(Object.isFrozen(candidate.options)).toBe(true);
      expect(Object.isFrozen(candidate.options)).toBe(true);
    }

    const successful = result.candidates.filter((candidate) => candidate.kind === "success");

    expect(new Set(successful.map((candidate) => candidate.score)).size).toBeGreaterThan(1);

    const best = successful.reduce((left, right) => (left.score <= right.score ? left : right));
    expect(result.selected).toEqual({
      id: best.id,
      candidateIndex: best.candidateIndex,
      score: best.score,
    });
  });

  it("copies options and retains CV detail only when requested", async () => {
    const original = { id: "owned", options: { map: { changepointPriorScale: 0.1 } } };
    const candidates = [original];

    const result = await Effect.runPromise(
      search({
        candidates,
        plan,
        objective,
        failurePolicy: "record",
        includeCrossValidation: true,
      }),
    );

    original.options.map.changepointPriorScale = 0.5;
    const winner = result.candidates[0];

    expect(winner?.kind).toBe("success");

    if (winner?.kind === "success") {
      expect(winner.options).toMatchObject({ map: { changepointPriorScale: 0.1 } });
      expect(winner.crossValidation?.rows.length).toBe(4);
      expect(Object.isFrozen(winner.options)).toBe(true);
    }
  });

  it("rejects different Python-style generated schedules before executing candidates", async () => {
    const input: ModelSearchInput = {
      candidates: [
        { id: "base", options: { growth: "linear" } },
        { id: "weekly", options: { growth: "linear", builtInSeasonalities: { weekly: "auto" } } },
      ],
      plan: { horizonMs: 2 * dayMs, cutoffs: { mode: "generated" } },
      objective,
      failurePolicy: "record",
    };

    const result = await Effect.runPromise(Effect.result(search(input)));

    expect(result._tag).toBe("Failure");

    if (Predicate.isTagged("Failure")(result)) {
      expect(result.failure).toMatchObject({ input: "evaluation-search" });
    }
  });

  it("rejects empty, duplicate, malformed and over-budget requests before candidate spans", async () => {
    const invalid: ReadonlyArray<ModelSearchInput> = [
      { candidates: [], plan, objective, failurePolicy: "record" },
      {
        candidates: [
          { id: "dupe", options: {} },
          { id: "dupe", options: {} },
        ],
        plan,
        objective,
        failurePolicy: "record",
      },
      { candidates: [{ id: "bad id", options: {} }], plan, objective, failurePolicy: "record" },
      {
        candidates: [{ id: "bad", options: { map: { changepointPriorScale: -1 } } }],
        plan,
        objective,
        failurePolicy: "record",
      },
      {
        candidates: Array.from({ length: 33 }, (_, index) => ({ id: `${index}`, options: {} })),
        plan,
        objective,
        failurePolicy: "record",
      },
    ];

    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (attributes) => {
        const span = new Tracer.NativeSpan(attributes);
        spans.push(span);

        return span;
      },
    });

    for (const input of invalid) {
      const result = await Effect.runPromise(
        Effect.result(search(input).pipe(Effect.withTracer(tracer))),
      );

      expect(result._tag).toBe("Failure");

      if (Predicate.isTagged("Failure")(result))
        expect(result.failure).toBeInstanceOf(InputValidationError);
    }

    expect(spans.some((span) => span.name === "effect-prophet.evaluation.candidate")).toBe(false);
    expect(spans.some((span) => span.name === "effect-prophet.evaluation.fold")).toBe(false);
  });

  it("checks full candidate-fold budget before any fit or candidate span", async () => {
    const history = Array.from({ length: 75 }, (_, day) => ({
      timestamp: at(day),
      value: day + 1,
    }));

    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (attributes) => {
        const span = new Tracer.NativeSpan(attributes);
        spans.push(span);

        return span;
      },
    });

    const result = await Effect.runPromise(
      Effect.result(
        searchModels(history, {
          candidates: Array.from({ length: 32 }, (_, index) => ({ id: `${index}`, options: {} })),
          plan: {
            horizonMs: dayMs,
            cutoffs: {
              mode: "explicit",
              timestamps: Array.from({ length: 65 }, (_, index) => at(index + 2)),
            },
          },
          objective,
          failurePolicy: "record",
        }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
      ),
    );

    expect(result._tag).toBe("Failure");

    if (Predicate.isTagged("Failure")(result)) {
      expect(result.failure).toMatchObject({ input: "evaluation-search" });
    }

    expect(spans.some((span) => span.name === "effect-prophet.evaluation.candidate")).toBe(false);
    expect(spans.some((span) => span.name === "Prophet.fit")).toBe(false);
  });

  it("keeps a fold's fitted prefix and interval seeds independent of held-out targets", async () => {
    const input: ModelSearchInput = {
      candidates: [{ id: "prefix", options: firstOption }],
      plan,
      objective,
      mode: { mode: "intervals", uncertainty: { seed: 19, samples: 16 } },
      failurePolicy: "record",
      includeCrossValidation: true,
    };

    const original = await Effect.runPromise(search(input));

    const poisoned = await Effect.runPromise(
      searchModels(
        rows.map((row, day) => ({ ...row, value: day === 8 ? -999 : row.value })),
        input,
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const first = original.candidates[0];
    const changed = poisoned.candidates[0];

    expect(first?.kind).toBe("success");
    expect(changed?.kind).toBe("success");

    if (first?.kind === "success" && changed?.kind === "success") {
      const forecastOnly = (candidate: typeof first) =>
        candidate.crossValidation?.rows
          .slice(0, 2)
          .map(({ actual: _actual, ...forecast }) => forecast);

      expect(forecastOnly(first)).toEqual(forecastOnly(changed));
      expect(first.crossValidation?.rows[0]?.actual).not.toBe(
        changed.crossValidation?.rows[0]?.actual,
      );
    }
  });

  it("records nonfinite objective arithmetic without promoting it to a defect", async () => {
    const backend = makeTestFittingBackend(
      Result.succeed({
        model: "linear-trend",
        intercept: 0,
        slope: 0,
        timeOrigin: epoch,
        timeScale: dayMs,
      }),
    );

    const result = await Effect.runPromise(
      Effect.result(
        searchModels(
          rows.map((row) => ({ ...row, value: 1e200 })),
          {
            candidates: [{ id: "overflow", options: {} }],
            plan,
            objective: { metric: "mse", aggregation: { kind: "overall" }, direction: "minimize" },
            failurePolicy: "record",
          },
        ).pipe(Effect.provide(backend.layer)),
      ),
    );

    expect(backend.invocations).toHaveLength(2);
    expect(result._tag).toBe("Failure");

    if (Predicate.isTagged("Failure")(result)) {
      expect(result.failure).toMatchObject({
        reason: "no-success",
        outcomes: [
          { failure: { tag: "EvaluationMetricError", reason: "non-finite", metric: "mse" } },
        ],
      });
    }
  });

  it("records interval-unsupported candidates without a fold, then runs supported MAP", async () => {
    const result = await Effect.runPromise(
      search({
        candidates: [
          { id: "ols", options: {} },
          { id: "map", options: firstOption },
        ],
        plan,
        objective,
        mode: { mode: "intervals", uncertainty: { seed: 19, samples: 16 } },
        failurePolicy: "record",
      }),
    );

    expect(result.candidates[0]).toMatchObject({
      kind: "failure",
      failure: { tag: "InputValidationError", input: "evaluation-plan" },
    });
    expect(result.selected.id).toBe("map");
  });

  it("requires an explicit exact-zero policy for percentage objectives", async () => {
    const failure = await Effect.runPromise(
      Effect.result(
        search({
          candidates: [{ id: "one", options: {} }],
          plan,
          objective: { metric: "mape", aggregation: { kind: "overall" }, direction: "minimize" },
          failurePolicy: "record",
        }),
      ),
    );

    expect(failure._tag).toBe("Failure");

    if (Predicate.isTagged("Failure")(failure)) {
      expect(failure.failure).toMatchObject({ input: "evaluation-search" });
    }
  });

  it("records typed candidate failures and keeps the outer search successful", async () => {
    const result = await Effect.runPromise(
      search({
        candidates: [
          { id: "unsupported", options: { growth: "logistic" } },
          { id: "supported", options: firstOption },
        ],
        plan,
        objective,
        failurePolicy: "record",
      }),
    );

    expect(result.selected.id).toBe("supported");
    expect(result.candidates[0]).toMatchObject({
      kind: "failure",
      candidateIndex: 0,
      failure: { tag: "EvaluationError", stage: "fit", reason: "fit-failed" },
    });
    expect(JSON.stringify(result.candidates[0])).not.toMatch(/stack|message|timestamp/);
  });

  it("preserves original typed failure in fail-fast and safe outcomes if all fail", async () => {
    const candidates = [
      { id: "one", options: { growth: "logistic" as const } },
      { id: "two", options: { growth: "logistic" as const } },
    ];

    const failFast = await Effect.runPromise(
      Effect.result(search({ candidates, plan, objective, failurePolicy: "fail-fast" })),
    );

    expect(failFast._tag).toBe("Failure");

    if (Predicate.isTagged("Failure")(failFast)) {
      const error = failFast.failure;
      expect(error).toBeInstanceOf(EvaluationSearchError);
      expect(error).toMatchObject({
        reason: "candidate-failed",
        candidateIndex: 0,
        candidateId: "one",
      });

      if (error instanceof EvaluationSearchError) {
        expect(error.cause).toBeInstanceOf(EvaluationError);
        expect(Object.keys(error)).not.toContain("cause");
        expect(Schema.encodeSync(EvaluationSearchError)(error)).not.toHaveProperty("cause");
      }
    }

    const allFailed = await Effect.runPromise(
      Effect.result(search({ candidates, plan, objective, failurePolicy: "record" })),
    );

    expect(allFailed._tag).toBe("Failure");

    if (Predicate.isTagged("Failure")(allFailed)) {
      expect(allFailed.failure).toMatchObject({
        reason: "no-success",
        outcomes: [
          { id: "one", candidateIndex: 0 },
          { id: "two", candidateIndex: 1 },
        ],
      });
      expect(JSON.stringify(allFailed.failure)).not.toMatch(/stack|timestamp|backendPhase/);
    }
  });

  it("uses original index for ties and candidate ID, not execution order, for interval replay", async () => {
    const tied = [
      { id: "first", options: firstOption },
      { id: "second", options: firstOption },
    ];

    const mode = { mode: "intervals", uncertainty: { seed: 19, samples: 16 } } as const;

    const run = (candidates: typeof tied) =>
      Effect.runPromise(
        search({
          candidates,
          plan,
          objective,
          mode,
          failurePolicy: "record",
          includeCrossValidation: true,
        }),
      );

    const original = await run(tied);
    const reordered = await run([...tied].reverse());
    const replay = await run(tied);

    for (const id of ["first", "second"]) {
      const first = original.candidates.find((candidate) => candidate.id === id);
      const second = reordered.candidates.find((candidate) => candidate.id === id);
      const again = replay.candidates.find((candidate) => candidate.id === id);
      expect(first?.kind).toBe("success");
      expect(first).toMatchObject({ score: second?.kind === "success" ? second.score : undefined });

      if (first?.kind === "success" && second?.kind === "success" && again?.kind === "success") {
        expect(first.crossValidation).toEqual(second.crossValidation);
        expect(first.crossValidation).toEqual(again.crossValidation);
      }
    }

    expect(original.selected.id).toBe("first");
    expect(reordered.selected.id).toBe("second");
  });

  it("traces recorded candidate failure and successful fold/WASM descendants without user labels", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (attributes) => {
        const span = new Tracer.NativeSpan(attributes);
        spans.push(span);

        return span;
      },
    });

    await Effect.runPromise(
      search({
        candidates: [
          { id: "sensitive-label", options: { growth: "logistic" } },
          { id: "ok", options: firstOption },
        ],
        plan,
        objective,
        mode: { mode: "intervals", uncertainty: { seed: 19, samples: 16 } },
        failurePolicy: "record",
      }).pipe(Effect.withSpan("search.parent"), Effect.withTracer(tracer)),
    );

    const outer = spans.find((span) => span.name === "Prophet.searchModels");
    const parent = spans.find((span) => span.name === "search.parent");
    const candidates = spans.filter((span) => span.name === "effect-prophet.evaluation.candidate");
    const cv = spans.filter((span) => span.name === "Prophet.crossValidate");
    const folds = spans.filter((span) => span.name === "effect-prophet.evaluation.fold");
    const wasm = spans.filter((span) => span.name === "effect-prophet.wasm.fit");
    const simulations = spans.filter((span) => span.name === "Prophet.predictUncertainty");
    const wasmSimulations = spans.filter((span) => span.name === "effect-prophet.wasm.simulate");

    expect(simulations).toHaveLength(2);
    expect(wasmSimulations).toHaveLength(2);
    expect(candidates).toHaveLength(2);
    expect(cv).toHaveLength(2);
    expect(folds).toHaveLength(3);
    expect(wasm.length).toBeGreaterThanOrEqual(2);

    if (outer === undefined || parent === undefined) throw new Error("Missing search spans");
    expect(outer.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);

    for (const [index, candidate] of candidates.entries()) {
      const nested = cv[index];

      if (
        nested === undefined ||
        !Predicate.isTagged("Ended")(candidate.status) ||
        !Predicate.isTagged("Ended")(nested.status) ||
        !Predicate.isTagged("Ended")(outer.status)
      ) {
        throw new Error("Missing complete candidate span");
      }

      expect(candidate.traceId).toBe(outer.traceId);
      expect(candidate.parent.pipe(Option.getOrUndefined)?.spanId).toBe(outer.spanId);
      expect(nested.parent.pipe(Option.getOrUndefined)?.spanId).toBe(candidate.spanId);
      expect(candidate.status.startTime).toBeGreaterThanOrEqual(outer.status.startTime);
      expect(candidate.status.endTime).toBeLessThanOrEqual(outer.status.endTime);
      expect(Exit.isFailure(candidate.status.exit)).toBe(index === 0);
      expect(Exit.isSuccess(outer.status.exit)).toBe(true);
      expect(Object.fromEntries(candidate.attributes)).toMatchObject({
        "effect_prophet.candidate.index": index,
        "effect_prophet.candidate.count": 2,
        "effect_prophet.objective": "mae",
      });
    }

    for (const fold of folds) {
      const directParent = cv.find(
        (span) => span.spanId === fold.parent.pipe(Option.getOrUndefined)?.spanId,
      );

      expect(directParent).toBeDefined();
      expect(fold.traceId).toBe(outer.traceId);
    }

    for (const fit of wasm) {
      expect(
        spans.some(
          (span) =>
            span.name === "Prophet.fit" &&
            span.spanId === fit.parent.pipe(Option.getOrUndefined)?.spanId,
        ),
      ).toBe(true);
    }

    for (const [index, simulation] of simulations.entries()) {
      const fold = folds[index + 1];
      const wasmSimulation = wasmSimulations[index];

      if (
        fold === undefined ||
        wasmSimulation === undefined ||
        !Predicate.isTagged("Ended")(fold.status) ||
        !Predicate.isTagged("Ended")(simulation.status) ||
        !Predicate.isTagged("Ended")(wasmSimulation.status)
      ) {
        throw new Error("Missing completed interval simulation");
      }

      expect(simulation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(fold.spanId);
      expect(wasmSimulation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(simulation.spanId);
      expect(simulation.traceId).toBe(outer.traceId);
      expect(wasmSimulation.status.startTime).toBeGreaterThanOrEqual(simulation.status.startTime);
      expect(wasmSimulation.status.endTime).toBeLessThanOrEqual(simulation.status.endTime);
      expect(Exit.isSuccess(wasmSimulation.status.exit)).toBe(true);
    }

    expect(
      spans.some((span) =>
        JSON.stringify(Object.fromEntries(span.attributes)).includes("sensitive-label"),
      ),
    ).toBe(false);
  });
});
