import { Effect, Exit, Layer, Option, Predicate, Result, Schema, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
  EvaluationError,
  FittingError,
  InputValidationError,
  crossValidate,
  fit,
  planRollingOrigin,
  predict,
  predictUncertainty,
  prophetFittingBackendLayer,
} from "../src/index";
import { deriveEvaluationFoldSeed } from "../src/evaluation-seed";
import { FittingBackend, type FitPlan } from "../src/internal/fitting-backend";
import { makeWasmLinearTrendAdapter } from "../src/internal/wasm-linear-trend-backend";
import { makeTestFittingBackend } from "./internal/fitting-backend-test-layer";

const dayMs = 86_400_000;

const epoch = Date.parse("2024-01-01T00:00:00.000Z");

const at = (day: number): string => new Date(epoch + day * dayMs).toISOString();

const history = (days: ReadonlyArray<number>) =>
  days.map((day) => ({ timestamp: at(day), value: day + 1 }));

const run = (days: ReadonlyArray<number>, input: Parameters<typeof planRollingOrigin>[2]) =>
  Effect.runPromise(planRollingOrigin(history(days), {}, input));

const failure = (days: ReadonlyArray<number>, input: Parameters<typeof planRollingOrigin>[2]) =>
  Effect.runPromise(Effect.flip(planRollingOrigin(history(days), {}, input)));

describe("planRollingOrigin", () => {
  it("matches release backwards cutoff generation and exact fold endpoints", async () => {
    const plan = await run(
      Array.from({ length: 12 }, (_, index) => index),
      {
        horizonMs: 2 * dayMs,
        cutoffs: { mode: "generated" },
      },
    );

    expect(plan.cutoffs).toEqual([6, 7, 8, 9].map((day) => epoch + day * dayMs));
    expect(plan.folds).toEqual(
      [6, 7, 8, 9].map((day, index) => ({
        index,
        cutoff: epoch + day * dayMs,
        trainingCount: day + 1,
        assessmentCount: 2,
      })),
    );
    expect(Object.isFrozen(plan)).toBe(true);
    expect(Object.isFrozen(plan.cutoffs)).toBe(true);
    expect(Object.isFrozen(plan.folds[0])).toBe(true);
  });

  it("uses between-observation cutoffs and includes the horizon endpoint", async () => {
    const plan = await run([0, 2, 5, 7], {
      horizonMs: 2 * dayMs,
      cutoffs: { mode: "explicit", timestamps: [at(1), at(3), at(5)] },
    });

    expect(
      plan.folds.map(({ trainingCount, assessmentCount }) => [trainingCount, assessmentCount]),
    ).toEqual([
      [1, 1],
      [2, 1],
      [3, 1],
    ]);
  });

  it("adjusts backwards across irregular gaps like release generate_cutoffs", async () => {
    const plan = await run([0, 4, 20, 21, 22, 23, 24], {
      horizonMs: 2 * dayMs,
      cutoffs: { mode: "generated", initialMs: dayMs, periodMs: dayMs },
    });

    expect(plan.cutoffs).toEqual([2, 18, 19, 20, 21, 22].map((day) => epoch + day * dayMs));
    expect(plan.folds[0]).toEqual({
      index: 0,
      cutoff: epoch + 2 * dayMs,
      trainingCount: 1,
      assessmentCount: 1,
    });
  });

  it("rounds odd half-horizon milliseconds upward and handles subdaily history", async () => {
    const observations = Array.from({ length: 41 }, (_, index) => ({
      timestamp: new Date(epoch + index).toISOString(),
      value: index,
    }));

    const plan = await Effect.runPromise(
      planRollingOrigin(
        observations,
        {},
        {
          horizonMs: 5,
          cutoffs: { mode: "generated" },
        },
      ),
    );

    expect(plan.cutoffs).toEqual([17, 20, 23, 26, 29, 32, 35].map((ms) => epoch + ms));
  });

  it("uses only static seasonality definitions for the generated initial default", async () => {
    const days = Array.from({ length: 40 }, (_, index) => index);

    const noSeasonality = await run(days, { horizonMs: 2 * dayMs, cutoffs: { mode: "generated" } });

    const weekly = await Effect.runPromise(
      planRollingOrigin(
        history(days),
        { builtInSeasonalities: { weekly: "auto" } },
        {
          horizonMs: 2 * dayMs,
          cutoffs: { mode: "generated" },
        },
      ),
    );

    expect(noSeasonality.cutoffs[0]).toBe(epoch + 6 * dayMs);
    expect(weekly.cutoffs[0]).toBe(epoch + 7 * dayMs);

    const explicit = await Effect.runPromise(
      planRollingOrigin(
        history(days),
        { builtInSeasonalities: { yearly: "auto" } },
        {
          horizonMs: 2 * dayMs,
          cutoffs: { mode: "explicit", timestamps: [at(5)] },
        },
      ),
    );

    expect(explicit.cutoffs).toEqual([epoch + 5 * dayMs]);

    const custom = await Effect.runPromise(
      planRollingOrigin(
        history(days),
        {
          seasonalities: [{ name: "nine-day", periodDays: 9, fourierOrder: 1 }],
        },
        {
          horizonMs: 2 * dayMs,
          cutoffs: { mode: "generated" },
        },
      ),
    );

    expect(custom.cutoffs[0]).toBe(epoch + 9 * dayMs);

    const overridden = await Effect.runPromise(
      planRollingOrigin(
        history(days),
        { builtInSeasonalities: { yearly: "auto" } },
        {
          horizonMs: 2 * dayMs,
          cutoffs: { mode: "generated", initialMs: 5 * dayMs },
        },
      ),
    );

    expect(overridden.cutoffs[0]).toBe(epoch + 5 * dayMs);
  });

  it("reports exact syntax, semantic, gap and budget errors without fitting", async () => {
    const cases = [
      { horizonMs: 0, cutoffs: { mode: "generated" } },
      { horizonMs: 1.5, cutoffs: { mode: "generated" } },
      { horizonMs: 3_650 * dayMs + 1, cutoffs: { mode: "generated" } },
      { horizonMs: dayMs, cutoffs: { mode: "explicit", timestamps: [] } },
      { horizonMs: dayMs, cutoffs: { mode: "explicit", timestamps: [at(2), at(2)] } },
      { horizonMs: dayMs, cutoffs: { mode: "explicit", timestamps: [at(3), at(2)] } },
      { horizonMs: dayMs, cutoffs: { mode: "explicit", timestamps: [at(0)] } },
      { horizonMs: dayMs, cutoffs: { mode: "explicit", timestamps: [at(7)] } },
      { horizonMs: dayMs, cutoffs: { mode: "explicit", timestamps: [at(1)] } },
      { horizonMs: dayMs, cutoffs: { mode: "generated", initialMs: dayMs * 8 } },
    ];

    for (const input of cases) {
      const error = await failure([0, 3, 5, 7], JSON.parse(JSON.stringify(input)));

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error.input).toBe("evaluation-plan");
      expect(error.issues[0]?.path).toBeDefined();
    }
  });

  it("enforces fold, history, assessment and timestamp budgets before returning any plan", async () => {
    const tooManyFolds = Array.from({ length: 129 }, (_, index) => at(index + 1));

    const folds = await failure(
      Array.from({ length: 131 }, (_, index) => index),
      {
        horizonMs: dayMs,
        cutoffs: { mode: "explicit", timestamps: tooManyFolds },
      },
    );

    expect(folds.input).toBe("evaluation-plan");
    expect(folds.issues[0]?.path).toContain("cutoffs");

    const observations = Array.from({ length: 10_001 }, (_, index) => ({
      timestamp: new Date(epoch + index).toISOString(),
      value: index,
    }));

    const historyError = await Effect.runPromise(
      Effect.flip(
        planRollingOrigin(
          observations,
          {},
          {
            horizonMs: 1,
            cutoffs: { mode: "explicit", timestamps: [new Date(epoch + 1).toISOString()] },
          },
        ),
      ),
    );

    expect(historyError.input).toBe("evaluation-plan");

    const cutoffs = Array.from({ length: 128 }, (_, index) =>
      new Date(epoch + index + 1).toISOString(),
    );

    const assessmentError = await Effect.runPromise(
      Effect.flip(
        planRollingOrigin(
          observations.slice(0, 10_000),
          {},
          {
            horizonMs: 9_000,
            cutoffs: { mode: "explicit", timestamps: cutoffs },
          },
        ),
      ),
    );

    expect(assessmentError.input).toBe("evaluation-plan");
    expect(assessmentError.issues[0]?.path).toContain("cutoffs");

    const nearLimit = [
      { timestamp: "+275760-09-11T00:00:00.000Z", value: 1 },
      { timestamp: "+275760-09-12T00:00:00.000Z", value: 2 },
    ];

    const overflow = await Effect.runPromise(
      Effect.flip(
        planRollingOrigin(
          nearLimit,
          {},
          {
            horizonMs: dayMs,
            cutoffs: { mode: "generated", initialMs: 3_650 * dayMs },
          },
        ),
      ),
    );

    expect(overflow.input).toBe("evaluation-plan");
  });

  it("partitions ordered irregular histories deterministically for every legal cutoff", async () => {
    for (let step = 1; step <= 8; step++) {
      const days = [0, step, step + 2, step + 7, step + 10, step + 13];

      const requested = Array.from({ length: step + 12 }, (_, index) => index + 1).filter(
        (cutoff) => cutoff <= step + 11 && days.some((day) => day > cutoff && day <= cutoff + 2),
      );

      const plan = await run(days, {
        horizonMs: 2 * dayMs,
        cutoffs: { mode: "explicit", timestamps: requested.map(at) },
      });

      expect(plan.cutoffs).toEqual(requested.map((day) => epoch + day * dayMs));

      for (const fold of plan.folds) {
        expect(fold.trainingCount).toBe(
          days.filter((day) => epoch + day * dayMs <= fold.cutoff).length,
        );
        expect(fold.assessmentCount).toBe(
          days.filter(
            (day) =>
              epoch + day * dayMs > fold.cutoff && epoch + day * dayMs <= fold.cutoff + 2 * dayMs,
          ).length,
        );
      }
    }
  });

  it("traces only the named pure public planner without fold or WASM boundaries", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    await Effect.runPromise(
      planRollingOrigin(
        history([0, 1, 2, 3, 4]),
        {},
        {
          horizonMs: dayMs,
          cutoffs: { mode: "explicit", timestamps: [at(2)] },
        },
      ).pipe(Effect.withSpan("evaluation.parent"), Effect.withTracer(tracer)),
    );

    const parent = spans.find((span) => span.name === "evaluation.parent");
    const planner = spans.find((span) => span.name === "Prophet.planRollingOrigin");

    if (
      parent === undefined ||
      planner === undefined ||
      !Predicate.isTagged("Ended")(parent.status) ||
      !Predicate.isTagged("Ended")(planner.status)
    ) {
      throw new Error("Expected completed planner span");
    }

    expect(planner.traceId).toBe(parent.traceId);
    expect(planner.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);
    expect(planner.status.startTime).toBeGreaterThanOrEqual(parent.status.startTime);
    expect(planner.status.endTime).toBeLessThanOrEqual(parent.status.endTime);
    expect(Exit.isSuccess(planner.status.exit)).toBe(true);
    expect(Array.from(planner.attributes)).toEqual([]);
    expect(
      spans.some((span) => span.name.includes("evaluation.fold") || span.name.includes("wasm")),
    ).toBe(false);

    spans.length = 0;

    const failed = await Effect.runPromise(
      planRollingOrigin(
        history([0, 1, 2]),
        {},
        {
          horizonMs: dayMs,
          cutoffs: { mode: "explicit", timestamps: [at(0)] },
        },
      ).pipe(Effect.withSpan("evaluation.parent"), Effect.withTracer(tracer), Effect.exit),
    );

    const failedParent = spans.find((span) => span.name === "evaluation.parent");
    const failedPlanner = spans.find((span) => span.name === "Prophet.planRollingOrigin");

    if (
      failedParent === undefined ||
      failedPlanner === undefined ||
      !Predicate.isTagged("Ended")(failedParent.status) ||
      !Predicate.isTagged("Ended")(failedPlanner.status)
    ) {
      throw new Error("Expected completed failed planner span");
    }

    expect(Exit.isFailure(failed)).toBe(true);
    expect(Exit.isFailure(failedPlanner.status.exit)).toBe(true);
    expect(failedPlanner.traceId).toBe(failedParent.traceId);
    expect(failedPlanner.parent.pipe(Option.getOrUndefined)?.spanId).toBe(failedParent.spanId);
    expect(failedPlanner.status.startTime).toBeGreaterThanOrEqual(failedParent.status.startTime);
    expect(failedPlanner.status.endTime).toBeLessThanOrEqual(failedParent.status.endTime);
    expect(
      spans.some((span) => span.name.includes("evaluation.fold") || span.name.includes("wasm")),
    ).toBe(false);
  });

  it("preserves history/options precedence and ignores target and feature values while planning", async () => {
    const badRows = await Effect.runPromise(
      Effect.flip(
        planRollingOrigin(JSON.parse("[]"), JSON.parse('{"growth":"bad"}'), JSON.parse("{}")),
      ),
    );

    const badOptions = await Effect.runPromise(
      Effect.flip(
        planRollingOrigin(history([0, 2, 3]), JSON.parse('{"growth":"bad"}'), JSON.parse("{}")),
      ),
    );

    expect(badRows.input).toBe("observations");
    expect(badOptions.input).toBe("options");

    const outsidePoint = await Effect.runPromise(
      Effect.flip(
        planRollingOrigin(
          history([0, 2, 3]),
          { map: { changepoints: { mode: "explicit", timestamps: [at(4)] } } },
          JSON.parse("{}"),
        ),
      ),
    );

    expect(outsidePoint.input).toBe("options");
    expect(outsidePoint.issues[0]?.path).toEqual(["map", "changepoints", "timestamps", 0]);

    const input = { horizonMs: dayMs, cutoffs: { mode: "explicit", timestamps: [at(2)] } } as const;

    const original = await Effect.runPromise(planRollingOrigin(history([0, 1, 2, 3]), {}, input));

    const poisoned = await Effect.runPromise(
      planRollingOrigin(
        history([0, 1, 2, 3]).map((row, index) => ({
          ...row,
          value: index > 2 ? 1e100 : -1e100,
          regressors: { future: index },
        })),
        {},
        input,
      ),
    );

    expect(poisoned).toEqual(original);
  });
});

describe("crossValidate", () => {
  const plan = {
    horizonMs: 2 * dayMs,
    cutoffs: { mode: "explicit", timestamps: [at(2), at(3)] },
  } as const;

  it("refits in cutoff order and preserves overlapping forecast instances without leaking targets", async () => {
    const observations = history([0, 1, 2, 3, 4, 5]);

    const operation = (rows: typeof observations) =>
      crossValidate(rows, {}, plan).pipe(Effect.provide(prophetFittingBackendLayer));

    const result = await Effect.runPromise(operation(observations));

    const poisoned = await Effect.runPromise(
      operation(
        observations.map((row, index) => ({ ...row, value: index > 2 ? -1e8 : row.value })),
      ),
    );

    const independent = await Effect.runPromise(
      fit(observations.slice(0, 3)).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const independentPredictions = await Effect.runPromise(predict(independent, [at(3), at(4)]));

    expect(result.kind).toBe("point");
    expect(result.plan.cutoffs).toEqual([epoch + 2 * dayMs, epoch + 3 * dayMs]);
    expect(result.folds).toEqual([
      {
        index: 0,
        cutoff: epoch + 2 * dayMs,
        trainingCount: 3,
        assessmentCount: 2,
        model: "linear-trend",
      },
      {
        index: 1,
        cutoff: epoch + 3 * dayMs,
        trainingCount: 4,
        assessmentCount: 2,
        model: "linear-trend",
      },
    ]);
    expect(result.rows.map((row) => [row.fold, row.timestamp, row.horizonMs, row.actual])).toEqual([
      [0, epoch + 3 * dayMs, dayMs, 4],
      [0, epoch + 4 * dayMs, 2 * dayMs, 5],
      [1, epoch + 4 * dayMs, dayMs, 5],
      [1, epoch + 5 * dayMs, 2 * dayMs, 6],
    ]);
    expect(result.rows.slice(0, 2).map((row) => row.predicted)).toEqual(
      independentPredictions.map((forecast) => forecast.value),
    );
    expect(result.rows.slice(0, 2).map((row) => row.predicted)).toEqual(
      poisoned.rows.slice(0, 2).map((row) => row.predicted),
    );
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.rows)).toBe(true);
    expect(Object.isFrozen(result.rows[0])).toBe(true);
    expect(Object.isFrozen(result.folds[0])).toBe(true);

    expect(result.rows[0]).not.toHaveProperty("model");
    expect(result.rows[0]).not.toHaveProperty("regressors");
  });

  it("projects explicit changepoints strictly before the final observed training row", async () => {
    const requested: Array<FitPlan> = [];

    const layer = Layer.effect(
      FittingBackend,
      Effect.map(FittingBackend, (backend) => ({
        fit: (input: Parameters<FittingBackend["fit"]>[0], fitPlan: FitPlan) =>
          Effect.sync(() => requested.push(fitPlan)).pipe(
            Effect.flatMap(() => backend.fit(input, fitPlan)),
          ),
      })),
    ).pipe(Layer.provide(prophetFittingBackendLayer));

    const options = {
      map: { changepoints: { mode: "explicit", timestamps: [at(0), at(2), at(3), at(4)] } },
    } as const;

    const result = await Effect.runPromise(
      crossValidate(history([0, 1, 2, 3, 4, 5]), options, plan).pipe(Effect.provide(layer)),
    );

    expect(result.folds.map((fold) => fold.model)).toEqual([
      "linear-piecewise-map",
      "linear-piecewise-map",
    ]);
    expect(
      requested.map((fitPlan) =>
        Predicate.isTagged("LinearPiecewiseMap")(fitPlan) ? fitPlan.changepoints : undefined,
      ),
    ).toEqual([
      { mode: "explicit", timestamps: [epoch] },
      { mode: "explicit", timestamps: [epoch, epoch + 2 * dayMs] },
    ]);
    expect(options.map.changepoints.timestamps).toEqual([at(0), at(2), at(3), at(4)]);
  });

  it("completes full plan validation before the first backend fit", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const backend = makeTestFittingBackend(
      Result.fail(
        new FittingError({
          reason: "backend-failure",
          observationCount: 2,
          message: "should not be called",
        }),
      ),
    );

    const runError = async (
      rows: Parameters<typeof crossValidate>[0],
      options: Parameters<typeof crossValidate>[1],
      selection: Parameters<typeof crossValidate>[2],
    ) => {
      const error = await Effect.runPromise(
        Effect.flip(
          crossValidate(
            JSON.parse(JSON.stringify(rows)),
            JSON.parse(JSON.stringify(options)),
            JSON.parse(JSON.stringify(selection)),
          ).pipe(Effect.provide(backend.layer), Effect.withTracer(tracer)),
        ),
      );

      if (!(error instanceof InputValidationError)) {
        throw new Error("Expected whole-plan validation before fitting");
      }

      return error;
    };

    expect(
      (await runError(JSON.parse("[]"), JSON.parse('{"growth":"bad"}'), JSON.parse("{}"))).input,
    ).toBe("observations");
    expect(
      (await runError(history([0, 1, 2]), JSON.parse('{"growth":"bad"}'), JSON.parse("{}"))).input,
    ).toBe("options");
    expect((await runError(history([0, 1, 2]), {}, JSON.parse('{"horizonMs":0}'))).input).toBe(
      "evaluation-plan",
    );
    expect(
      (
        await runError(
          history([0, 1, 2]),
          {},
          { horizonMs: dayMs, cutoffs: { mode: "explicit", timestamps: [at(0)] } },
        )
      ).input,
    ).toBe("evaluation-plan");
    expect(backend.invocations).toHaveLength(0);
    expect(
      spans.some(
        (span) =>
          span.name === "effect-prophet.evaluation.fold" ||
          span.name.startsWith("effect-prophet.wasm."),
      ),
    ).toBe(false);
  });

  it("returns the first typed fold failure without running any later fit", async () => {
    const invoked: Array<number> = [];

    const layer = Layer.succeed(FittingBackend, {
      fit: (input) =>
        Effect.sync(() => {
          invoked.push(input.timestamps.length);

          if (input.timestamps.length > 2) {
            return Result.fail(
              new FittingError({
                reason: "non-convergence",
                observationCount: input.timestamps.length,
                message: "Controlled second fold failure",
              }),
            );
          }

          return Result.succeed({
            model: "linear-trend" as const,
            intercept: 1,
            slope: 1,
            timeOrigin: epoch,
            timeScale: dayMs,
          });
        }).pipe(Effect.flatMap(Effect.fromResult)),
    });

    const selection = {
      horizonMs: dayMs,
      cutoffs: { mode: "explicit", timestamps: [at(1), at(2), at(3)] },
    } as const;

    const error = await Effect.runPromise(
      Effect.flip(
        crossValidate(history([0, 1, 2, 3, 4]), {}, selection).pipe(Effect.provide(layer)),
      ),
    );

    expect(invoked).toEqual([2, 3]);

    if (!(error instanceof EvaluationError)) {
      throw new Error("Expected typed fold error");
    }

    expect(error).toMatchObject({
      fold: 1,
      cutoff: epoch + 2 * dayMs,
      stage: "fit",
      reason: "fit-failed",
    });

    expect(error.cause).toBeInstanceOf(FittingError);

    if (!(error.cause instanceof FittingError)) {
      throw new Error("Expected retained fitting failure");
    }

    expect(error.cause.reason).toBe("non-convergence");
    expect(Object.keys(error)).not.toContain("cause");
    expect(Schema.encodeSync(EvaluationError)(error)).not.toHaveProperty("cause");
  });

  it("retains fit minimum and pre-WASM missing future regressor diagnostics", async () => {
    const oneRow = await Effect.runPromise(
      Effect.flip(
        crossValidate(
          history([0, 1, 2]),
          {},
          {
            horizonMs: dayMs,
            cutoffs: { mode: "explicit", timestamps: [at(0)] },
          },
        ).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    // A cutoff must be later than first history, so a between-observation cutoff selects one row.
    expect(oneRow).toBeInstanceOf(InputValidationError);

    const early = await Effect.runPromise(
      Effect.flip(
        crossValidate(
          history([0, 2, 3]),
          {},
          {
            horizonMs: dayMs,
            cutoffs: { mode: "explicit", timestamps: [at(1)] },
          },
        ).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(early).toMatchObject({ fold: 0, stage: "fit", reason: "fit-failed" });
    expect(early.cause).toMatchObject({ reason: "insufficient-observations" });

    const rows = history([0, 1, 2, 3, 4, 5, 6, 7]).map((row, index) => ({
      ...row,
      regressors: index < 6 ? { x: [1, 3, 2, 6, 4, 5][index] } : {},
    }));

    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const missing = await Effect.runPromise(
      Effect.flip(
        crossValidate(
          rows,
          { regressors: [{ name: "x" }] },
          {
            horizonMs: dayMs,
            cutoffs: { mode: "explicit", timestamps: [at(5)] },
          },
        ).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
      ),
    );

    expect(missing).toMatchObject({ fold: 0, stage: "predict", reason: "prediction-failed" });
    expect(missing.cause).toBeInstanceOf(InputValidationError);

    if (!(missing.cause instanceof InputValidationError)) {
      throw new Error("Expected retained prediction validation error");
    }

    expect(missing.cause.input).toBe("prediction-rows");
    expect(spans.some((span) => span.name === "effect-prophet.wasm.predict")).toBe(false);
  });

  it("runs flat and bounded logistic MAP families with row-specific future inputs", async () => {
    const flat = await Effect.runPromise(
      crossValidate(history([0, 1, 2, 3, 4, 5]), { growth: "flat" }, plan).pipe(
        Effect.provide(prophetFittingBackendLayer),
      ),
    );

    const bounded = history([0, 1, 2, 3, 4, 5]).map((row, index) => ({
      ...row,
      value: 3 + index * 0.3,
      floor: index * 0.05,
      capacity: 8 + index * 0.1,
    }));

    const logistic = await Effect.runPromise(
      crossValidate(bounded, { growth: "logistic" }, plan).pipe(
        Effect.provide(prophetFittingBackendLayer),
      ),
    );

    expect(flat.folds.map((fold) => fold.model)).toEqual(["flat-map", "flat-map"]);
    expect(logistic.folds.map((fold) => fold.model)).toEqual([
      "logistic-piecewise-map",
      "logistic-piecewise-map",
    ]);
    expect(logistic.rows).toHaveLength(4);
    expect(logistic.rows.every((row) => Number.isFinite(row.predicted))).toBe(true);

    const incomplete = bounded.map((row, index) => {
      if (index !== 3) {
        return row;
      }

      const { capacity: _capacity, ...withoutCapacity } = row;

      return withoutCapacity;
    });

    const error = await Effect.runPromise(
      Effect.flip(
        crossValidate(incomplete, { growth: "logistic" }, plan).pipe(
          Effect.provide(prophetFittingBackendLayer),
        ),
      ),
    );

    expect(error).toMatchObject({ fold: 0, stage: "predict", reason: "prediction-failed" });
    expect(error.cause).toMatchObject({ input: "prediction-rows" });
  });

  it("preserves future regressors and conditions with static events and train-only feature resolution", async () => {
    const start = Date.UTC(2025, 0, 1);

    const observations = Array.from({ length: 18 }, (_, index) => ({
      timestamp: new Date(start + index * dayMs).toISOString(),
      value: 10 + index * 0.2 + (index % 3) * 0.7,
      regressors: { promotion: index % 3 },
      conditions: { onSeason: index % 2 === 0 },
    }));

    const options = {
      seasonalities: [
        { name: "conditional-weekly", periodDays: 7, fourierOrder: 1, conditionName: "onSeason" },
      ],
      builtInSeasonalities: { weekly: "auto" },
      regressors: [{ name: "promotion" }],
      events: [{ name: "launch", date: "2025-01-13" }],
      map: { changepoints: { mode: "explicit", timestamps: [] } },
    } as const;

    const selection = {
      horizonMs: 2 * dayMs,
      cutoffs: {
        mode: "explicit",
        timestamps: [observations[11]?.timestamp ?? "", observations[13]?.timestamp ?? ""],
      },
    } as const;

    const result = await Effect.runPromise(
      crossValidate(observations, options, selection).pipe(
        Effect.provide(prophetFittingBackendLayer),
      ),
    );

    const prefix = await Effect.runPromise(
      fit(observations.slice(0, 12), options).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const standalone = await Effect.runPromise(
      predict(
        prefix,
        observations.slice(12, 14).map(({ value: _actual, ...row }) => row),
      ),
    );

    expect(result.folds.map(({ model, trainingCount }) => [model, trainingCount])).toEqual([
      ["linear-piecewise-map", 12],
      ["linear-piecewise-map", 14],
    ]);
    expect(result.rows.slice(0, 2).map(({ predicted }) => predicted)).toEqual(
      standalone.map(({ value }) => value),
    );
    expect(result.rows.map(({ actual }) => actual)).toEqual(
      [12, 13, 14, 15].map((index) => observations[index]?.value),
    );
  });

  it("retains real WASM loader failure and failed nested fold spans", async () => {
    const adapter = makeWasmLinearTrendAdapter(() => {
      throw new Error("private loader path");
    });

    const layer = Layer.succeed(FittingBackend, { fit: adapter.fit });
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const failure = await Effect.runPromise(
      Effect.flip(
        crossValidate(
          history([0, 1, 2, 3, 4]),
          {},
          {
            horizonMs: dayMs,
            cutoffs: { mode: "explicit", timestamps: [at(2), at(3)] },
          },
        ).pipe(Effect.provide(layer), Effect.withTracer(tracer)),
      ),
    );

    const operation = spans.find((span) => span.name === "Prophet.crossValidate");
    const fold = spans.find((span) => span.name === "effect-prophet.evaluation.fold");
    const fit = spans.find((span) => span.name === "Prophet.fit");
    const wasm = spans.find((span) => span.name === "effect-prophet.wasm.fit");

    if (
      !(failure instanceof EvaluationError) ||
      operation === undefined ||
      fold === undefined ||
      fit === undefined ||
      wasm === undefined
    ) {
      throw new Error("Expected typed fold failure and complete traced WASM load");
    }

    expect(failure).toMatchObject({ fold: 0, stage: "fit", reason: "fit-failed" });
    expect(failure.cause).toMatchObject({ reason: "backend-failure", backendPhase: "load" });
    expect(spans.filter((span) => span.name === "effect-prophet.evaluation.fold")).toHaveLength(1);
    expect(spans.some((span) => span.name === "Prophet.predict")).toBe(false);

    for (const [child, parent] of [
      [fold, operation],
      [fit, fold],
      [wasm, fit],
    ] as const) {
      if (
        !Predicate.isTagged("Ended")(child.status) ||
        !Predicate.isTagged("Ended")(parent.status)
      ) {
        throw new Error("Expected ended failing boundary");
      }

      expect(child.traceId).toBe(operation.traceId);
      expect(child.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);
      expect(child.status.startTime).toBeGreaterThanOrEqual(parent.status.startTime);
      expect(child.status.endTime).toBeLessThanOrEqual(parent.status.endTime);
      expect(Exit.isFailure(child.status.exit)).toBe(true);
    }
  });

  it("traces each real fold and its fitting/prediction boundaries under the public operation", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    await Effect.runPromise(
      crossValidate(history([0, 1, 2, 3, 4, 5]), {}, plan).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withSpan("evaluation.parent"),
        Effect.withTracer(tracer),
      ),
    );

    const parent = spans.find((span) => span.name === "evaluation.parent");
    const operation = spans.find((span) => span.name === "Prophet.crossValidate");
    const foldSpans = spans.filter((span) => span.name === "effect-prophet.evaluation.fold");

    const fitSpans = spans.filter((span) => span.name === "Prophet.fit");
    const predictSpans = spans.filter((span) => span.name === "Prophet.predict");
    const wasmFitSpans = spans.filter((span) => span.name === "effect-prophet.wasm.fit");
    const wasmPredictSpans = spans.filter((span) => span.name === "effect-prophet.wasm.predict");

    expect(foldSpans).toHaveLength(2);
    expect(fitSpans).toHaveLength(2);
    expect(predictSpans).toHaveLength(2);
    expect(wasmFitSpans).toHaveLength(2);
    expect(wasmPredictSpans).toHaveLength(2);

    if (parent === undefined || operation === undefined) {
      throw new Error("Expected public evaluation span and parent");
    }

    for (const [index, fold] of foldSpans.entries()) {
      const parentStatus = parent.status;
      const operationStatus = operation.status;
      const foldStatus = fold.status;

      if (
        !Predicate.isTagged("Ended")(parentStatus) ||
        !Predicate.isTagged("Ended")(operationStatus) ||
        !Predicate.isTagged("Ended")(foldStatus)
      ) {
        throw new Error("Expected ended evaluation spans");
      }

      expect(fold.traceId).toBe(parent.traceId);
      expect(operation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);
      expect(fold.parent.pipe(Option.getOrUndefined)?.spanId).toBe(operation.spanId);
      expect(foldStatus.startTime).toBeGreaterThanOrEqual(operationStatus.startTime);
      expect(foldStatus.endTime).toBeLessThanOrEqual(operationStatus.endTime);
      expect(Exit.isSuccess(foldStatus.exit)).toBe(true);
      expect(Object.fromEntries(fold.attributes)).toMatchObject({
        "effect_prophet.fold.index": index,
        "effect_prophet.training.count": index + 3,
        "effect_prophet.assessment.count": 2,
        "effect_prophet.model.type": "linear-trend",
      });

      for (const [child, directParent] of [
        [fitSpans[index], fold],
        [predictSpans[index], fold],
        [wasmFitSpans[index], fitSpans[index]],
        [wasmPredictSpans[index], predictSpans[index]],
      ] as const) {
        if (
          child === undefined ||
          directParent === undefined ||
          !Predicate.isTagged("Ended")(child.status) ||
          !Predicate.isTagged("Ended")(directParent.status)
        ) {
          throw new Error("Expected ended nested evaluation span");
        }

        expect(child.parent.pipe(Option.getOrUndefined)?.spanId).toBe(directParent.spanId);
        expect(child.traceId).toBe(parent.traceId);
        expect(child.status.startTime).toBeGreaterThanOrEqual(directParent.status.startTime);
        expect(child.status.endTime).toBeLessThanOrEqual(directParent.status.endTime);
      }

      expect(
        Array.from(fold.attributes).some(
          ([key]) => key.includes("cutoff") || key.includes("timestamp") || key.includes("value"),
        ),
      ).toBe(false);
    }
  });
});

describe("crossValidate intervals", () => {
  const plan = {
    horizonMs: 2 * dayMs,
    cutoffs: { mode: "explicit", timestamps: [at(2), at(3)] },
  } as const;

  const mode = {
    mode: "intervals",
    uncertainty: { seed: 19, samples: 64, intervalWidth: 0.8 },
  } as const;

  const map = { map: { changepoints: { mode: "explicit", timestamps: [] } } } as const;

  it("returns seeded, immutable MAP intervals with the independent point forecast and prefix-only state", async () => {
    const rows = history([0, 1, 2, 3, 4, 5]).map((row, index) => ({
      ...row,
      value: 2 + index * 0.45 + (index % 2) * 0.2,
    }));

    const run = (observations: typeof rows) =>
      Effect.runPromise(
        crossValidate(observations, map, plan, mode).pipe(
          Effect.provide(prophetFittingBackendLayer),
        ),
      );

    const first = await run(rows);
    const replay = await run(rows);

    const traced = await Effect.runPromise(
      crossValidate(rows, map, plan, mode).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withTracer(Tracer.make({ span: (options) => new Tracer.NativeSpan(options) })),
      ),
    );

    const poisoned = await run(
      rows.map((row, index) => ({ ...row, value: index > 2 ? row.value + 1000 : row.value })),
    );

    const prefix = await Effect.runPromise(
      fit(rows.slice(0, 3), map).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const standalonePoint = await Effect.runPromise(predict(prefix, [at(3), at(4)]));

    const seed = deriveEvaluationFoldSeed(
      mode.uncertainty.seed,
      first.plan,
      "",
      first.plan.cutoffs[0] ?? NaN,
    );

    const standaloneIntervals = await Effect.runPromise(
      predictUncertainty(prefix, [at(3), at(4)], {
        seed: seed ?? NaN,
        samples: mode.uncertainty.samples,
        intervalWidth: mode.uncertainty.intervalWidth,
      }),
    );

    expect(first).toEqual(replay);
    expect(first).toEqual(traced);
    expect(first.kind).toBe("intervals");
    expect(first.simulation).toBe("prophet-map-scalar-xoshiro128ss-v2");
    expect(first.sampleCount).toBe(64);
    expect(first.intervalWidth).toBe(0.8);
    expect(first.rows).toHaveLength(4);
    expect(first.rows.map(({ fold, horizonMs }) => [fold, horizonMs])).toEqual([
      [0, dayMs],
      [0, 2 * dayMs],
      [1, dayMs],
      [1, 2 * dayMs],
    ]);
    expect(first.rows.slice(0, 2).map(({ predicted }) => predicted)).toEqual(
      standalonePoint.map(({ value }) => value),
    );
    expect(first.rows.slice(0, 2)).toEqual(
      poisoned.rows.slice(0, 2).map((row, index) => ({
        ...row,
        actual: first.rows[index]?.actual,
      })),
    );

    if (standaloneIntervals.kind !== "intervals") {
      throw new Error("Expected Stage G interval result");
    }

    expect(first.rows.slice(0, 2).map(({ lower, upper }) => ({ lower, upper }))).toEqual(
      standaloneIntervals.rows.map(({ value }) => value),
    );
    expect(
      first.rows.every(
        ({ lower, upper }) => Number.isFinite(lower) && Number.isFinite(upper) && lower <= upper,
      ),
    ).toBe(true);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.rows)).toBe(true);
    expect(Object.isFrozen(first.rows[0])).toBe(true);
    expect(Object.isFrozen(first.folds[0])).toBe(true);
  });

  it("supports flat and floor-aware logistic MAP with training-only bounds", async () => {
    const flat = await Effect.runPromise(
      crossValidate(
        history([0, 1, 2, 3, 4, 5]),
        { growth: "flat", scaling: "minmax" },
        plan,
        mode,
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const bounded = history([0, 1, 2, 3, 4, 5]).map((row, index) => ({
      ...row,
      value: 3 + index * 0.3,
      capacity: 8 + index * 0.1,
      floor: index * 0.05,
    }));

    const logistic = await Effect.runPromise(
      crossValidate(bounded, { growth: "logistic", scaling: "minmax" }, plan, mode).pipe(
        Effect.provide(prophetFittingBackendLayer),
      ),
    );

    const defaults = await Effect.runPromise(
      crossValidate(
        history([0, 1, 2, 3, 4, 5]),
        { growth: "flat" },
        {
          horizonMs: dayMs,
          cutoffs: { mode: "explicit", timestamps: [at(2)] },
        },
        { mode: "intervals", uncertainty: { seed: 0 } },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(defaults.sampleCount).toBe(1_000);
    expect(defaults.intervalWidth).toBe(0.8);
    expect(flat.folds.map(({ model }) => model)).toEqual(["flat-map", "flat-map"]);
    expect(logistic.folds.map(({ model }) => model)).toEqual([
      "logistic-piecewise-map",
      "logistic-piecewise-map",
    ]);
    expect(flat.rows.every(({ lower, upper }) => Number.isFinite(lower) && lower <= upper)).toBe(
      true,
    );
    expect(
      logistic.rows.every(({ lower, upper }) => Number.isFinite(upper) && lower <= upper),
    ).toBe(true);

    const poisoned = await Effect.runPromise(
      crossValidate(
        bounded.map((row, index) => ({ ...row, value: index > 2 ? 6 + index * 0.1 : row.value })),
        { growth: "logistic", scaling: "minmax" },
        plan,
        mode,
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(
      poisoned.rows.slice(0, 2).map(({ lower, upper, predicted }) => [lower, upper, predicted]),
    ).toEqual(
      logistic.rows.slice(0, 2).map(({ lower, upper, predicted }) => [lower, upper, predicted]),
    );
  });

  it("replays mixed conditional/event/regressor MAP intervals from fold-local fitted state", async () => {
    const start = Date.UTC(2025, 0, 1);

    const rows = Array.from({ length: 18 }, (_, index) => ({
      timestamp: new Date(start + index * dayMs).toISOString(),
      value: 10 + index * 0.2 + (index % 3) * 0.7,
      regressors: { promotion: index % 3 },
      conditions: { onSeason: index % 2 === 0 },
    }));

    const options = {
      seasonalities: [
        { name: "conditional-weekly", periodDays: 7, fourierOrder: 1, conditionName: "onSeason" },
      ],
      builtInSeasonalities: { weekly: "auto" },
      regressors: [{ name: "promotion" }],
      events: [{ name: "launch", date: "2025-01-13" }],
      map: { changepoints: { mode: "explicit", timestamps: [] } },
    } as const;

    const selection = {
      horizonMs: 2 * dayMs,
      cutoffs: {
        mode: "explicit",
        timestamps: [rows[11]?.timestamp ?? "", rows[13]?.timestamp ?? ""],
      },
    } as const;

    const result = await Effect.runPromise(
      crossValidate(rows, options, selection, {
        mode: "intervals",
        uncertainty: { seed: 21, samples: 32 },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const replay = await Effect.runPromise(
      crossValidate(rows, options, selection, {
        mode: "intervals",
        uncertainty: { seed: 21, samples: 32 },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(result).toEqual(replay);
    expect(result.intervalWidth).toBe(0.8);
    expect(result.folds.map(({ model }) => model)).toEqual([
      "linear-piecewise-map",
      "linear-piecewise-map",
    ]);
    expect(result.rows.map(({ actual }) => actual)).toEqual(
      [12, 13, 14, 15].map((index) => rows[index]?.value),
    );
    expect(result.rows.every(({ lower, upper }) => Number.isFinite(lower) && lower <= upper)).toBe(
      true,
    );
  });

  it("parses Stage G options between plan syntax and plan semantics, without entering a fold", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const backend = makeTestFittingBackend(
      Result.fail(
        new FittingError({
          reason: "backend-failure",
          observationCount: 2,
          message: "should not fit",
        }),
      ),
    );

    const run = (
      selection: Parameters<typeof crossValidate>[2],
      requested: Parameters<typeof crossValidate>[3],
    ) =>
      Effect.runPromise(
        Effect.flip(
          crossValidate(history([0, 1, 2, 3]), map, selection, requested).pipe(
            Effect.provide(backend.layer),
            Effect.withTracer(tracer),
          ),
        ),
      );

    const badPlan = await run(
      JSON.parse('{"horizonMs":0}'),
      JSON.parse('{"mode":"intervals","uncertainty":{}}'),
    );

    const badUncertainty = await run(
      { horizonMs: dayMs, cutoffs: { mode: "explicit", timestamps: [at(0)] } },
      JSON.parse('{"mode":"intervals","uncertainty":{"samples":0}}'),
    );

    const badOutput = await run(
      plan,
      JSON.parse('{"mode":"intervals","uncertainty":{"seed":1,"output":"samples"}}'),
    );

    const badCutoff = await run(
      { horizonMs: dayMs, cutoffs: { mode: "explicit", timestamps: [at(0)] } },
      mode,
    );

    expect(badPlan).toMatchObject({ input: "evaluation-plan" });
    expect(badUncertainty).toMatchObject({ input: "uncertainty-options" });
    expect(badOutput).toMatchObject({ input: "uncertainty-options" });
    expect(badCutoff).toMatchObject({ input: "evaluation-plan" });
    expect(backend.invocations).toHaveLength(0);
    expect(
      spans.some(
        (span) =>
          span.name === "effect-prophet.evaluation.fold" ||
          span.name.startsWith("effect-prophet.wasm."),
      ),
    ).toBe(false);
  });

  it("rejects statically guaranteed OLS and per-fold or aggregate simulation work before fit", async () => {
    const backend = makeTestFittingBackend(
      Result.fail(
        new FittingError({
          reason: "backend-failure",
          observationCount: 2,
          message: "should not fit",
        }),
      ),
    );

    const impossible = await Effect.runPromise(
      Effect.flip(
        crossValidate(history([0, 1, 2, 3, 4, 5]), {}, plan, mode).pipe(
          Effect.provide(backend.layer),
        ),
      ),
    );

    if (!(impossible instanceof InputValidationError)) {
      throw new Error("Expected preflight support failure");
    }

    expect(impossible).toMatchObject({ input: "evaluation-plan" });
    expect(impossible.issues[0]?.path).toEqual(["uncertainty"]);

    const historyRows = Array.from({ length: 300 }, (_, index) => ({
      timestamp: new Date(epoch + index).toISOString(),
      value: index,
    }));

    const cutoffs = Array.from({ length: 128 }, (_, index) =>
      new Date(epoch + index + 1).toISOString(),
    );

    const budget = await Effect.runPromise(
      Effect.flip(
        crossValidate(
          historyRows,
          map,
          { horizonMs: 50, cutoffs: { mode: "explicit", timestamps: cutoffs } },
          { mode: "intervals", uncertainty: { seed: 1, samples: 2_048 } },
        ).pipe(Effect.provide(backend.layer)),
      ),
    );

    if (!(budget instanceof InputValidationError)) {
      throw new Error("Expected preflight work limit");
    }

    expect(budget).toMatchObject({ input: "evaluation-plan" });
    expect(budget.issues[0]?.path).toEqual(["uncertainty", "samples"]);

    const perFoldHistory = Array.from({ length: 2_003 }, (_, index) => ({
      timestamp: new Date(epoch + index).toISOString(),
      value: index,
    }));

    const perFold = await Effect.runPromise(
      Effect.flip(
        crossValidate(
          perFoldHistory,
          map,
          {
            horizonMs: 2_000,
            cutoffs: { mode: "explicit", timestamps: [new Date(epoch + 1).toISOString()] },
          },
          { mode: "intervals", uncertainty: { seed: 1, samples: 1_024 } },
        ).pipe(Effect.provide(backend.layer)),
      ),
    );

    expect(perFold).toMatchObject({ input: "evaluation-plan" });
    expect(backend.invocations).toHaveLength(0);
  });

  it("preserves a runtime unsupported-model cause and the point-first failure order", async () => {
    const modelLayer = makeTestFittingBackend(
      Result.succeed({
        model: "linear-trend",
        intercept: 2,
        slope: 1,
        timeOrigin: epoch,
        timeScale: dayMs,
      }),
    );

    const unsupported = await Effect.runPromise(
      Effect.flip(
        crossValidate(history([0, 1, 2, 3, 4, 5]), map, plan, mode).pipe(
          Effect.provide(modelLayer.layer),
        ),
      ),
    );

    expect(unsupported).toMatchObject({
      fold: 0,
      stage: "uncertainty",
      reason: "uncertainty-failed",
    });
    expect(unsupported.cause).toMatchObject({ reason: "unsupported-uncertainty" });
    expect(modelLayer.invocations).toHaveLength(1);

    const missing = history([0, 1, 2, 3, 4, 5]).map((row, index) => ({
      ...row,
      regressors: index < 3 ? { x: [1, 3, 2][index] } : {},
    }));

    const pointError = await Effect.runPromise(
      Effect.flip(
        crossValidate(missing, { ...map, regressors: [{ name: "x" }] }, plan, mode).pipe(
          Effect.provide(prophetFittingBackendLayer),
        ),
      ),
    );

    expect(pointError).toMatchObject({ fold: 0, stage: "predict", reason: "prediction-failed" });
    expect(pointError.cause).toMatchObject({ input: "prediction-rows" });
  });

  it("returns a typed simulation-limit after a successful point forecast", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const remote = history([0, 1, 1000]);

    const error = await Effect.runPromise(
      Effect.flip(
        crossValidate(
          remote,
          map,
          {
            horizonMs: 999 * dayMs,
            cutoffs: { mode: "explicit", timestamps: [at(1)] },
          },
          { mode: "intervals", uncertainty: { seed: 1, samples: 8 } },
        ).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
      ),
    );

    expect(error).toMatchObject({ fold: 0, stage: "uncertainty", reason: "uncertainty-failed" });
    expect(error.cause).toMatchObject({ reason: "simulation-limit" });

    const fold = spans.find((span) => span.name === "effect-prophet.evaluation.fold");
    const prediction = spans.find((span) => span.name === "Prophet.predict");
    const simulation = spans.find((span) => span.name === "Prophet.predictUncertainty");

    if (
      fold === undefined ||
      prediction === undefined ||
      simulation === undefined ||
      !Predicate.isTagged("Ended")(fold.status) ||
      !Predicate.isTagged("Ended")(prediction.status) ||
      !Predicate.isTagged("Ended")(simulation.status)
    ) {
      throw new Error("Expected completed point-first simulation failure trace");
    }

    expect(Exit.isSuccess(prediction.status.exit)).toBe(true);
    expect(Exit.isFailure(simulation.status.exit)).toBe(true);
    expect(Exit.isFailure(fold.status.exit)).toBe(true);
    expect(prediction.parent.pipe(Option.getOrUndefined)?.spanId).toBe(fold.spanId);
    expect(simulation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(fold.spanId);
    expect(spans.some((span) => span.name === "effect-prophet.wasm.simulate")).toBe(false);
  });

  it("traces complete real MAP folds and nested simulation with bounded attributes", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    await Effect.runPromise(
      crossValidate(history([0, 1, 2, 3, 4, 5]), map, plan, mode).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withSpan("evaluation.parent"),
        Effect.withTracer(tracer),
      ),
    );

    const operation = spans.find(({ name }) => name === "Prophet.crossValidate");

    const folds = spans.filter(({ name }) => name === "effect-prophet.evaluation.fold");
    const simulations = spans.filter(({ name }) => name === "Prophet.predictUncertainty");
    const wasm = spans.filter(({ name }) => name === "effect-prophet.wasm.simulate");

    expect(folds).toHaveLength(2);
    expect(simulations).toHaveLength(2);
    expect(wasm).toHaveLength(2);

    if (operation === undefined) {
      throw new Error("Expected public evaluation operation");
    }

    for (const [index, fold] of folds.entries()) {
      const simulation = simulations[index];
      const boundary = wasm[index];

      if (
        simulation === undefined ||
        boundary === undefined ||
        !Predicate.isTagged("Ended")(fold.status) ||
        !Predicate.isTagged("Ended")(simulation.status) ||
        !Predicate.isTagged("Ended")(boundary.status)
      ) {
        throw new Error("Expected completed simulation boundaries");
      }

      expect(fold.parent.pipe(Option.getOrUndefined)?.spanId).toBe(operation.spanId);
      expect(simulation.parent.pipe(Option.getOrUndefined)?.spanId).toBe(fold.spanId);
      expect(boundary.parent.pipe(Option.getOrUndefined)?.spanId).toBe(simulation.spanId);
      expect(simulation.traceId).toBe(fold.traceId);
      expect(boundary.traceId).toBe(fold.traceId);
      expect(simulation.status.startTime).toBeGreaterThanOrEqual(fold.status.startTime);
      expect(simulation.status.endTime).toBeLessThanOrEqual(fold.status.endTime);
      expect(boundary.status.startTime).toBeGreaterThanOrEqual(simulation.status.startTime);
      expect(boundary.status.endTime).toBeLessThanOrEqual(simulation.status.endTime);
      expect(Exit.isSuccess(boundary.status.exit)).toBe(true);
      expect(Object.fromEntries(fold.attributes)).toMatchObject({
        "effect_prophet.uncertainty.enabled": true,
        "effect_prophet.sample.count": mode.uncertainty.samples,
      });
      expect(
        Array.from(fold.attributes).some(([key]) =>
          /seed|cutoff|timestamp|value|lower|upper/.test(key),
        ),
      ).toBe(false);
    }
  });
});
