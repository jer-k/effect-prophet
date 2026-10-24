import { Effect, Exit, Option } from "effect";
import { describe, expect, it } from "vitest";

import {
  InputValidationError,
  PredictionError,
  fit,
  predict,
  predictUncertainty,
  predictWithIntervals,
  prophetFittingBackendLayer,
  simulationIdentity,
  type EncodedIntervalOptions,
  type EncodedPredictionRows,
  type FittedProphet,
} from "../src/index";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const history = [
  { timestamp: "2025-01-01T00:00:00.000Z", value: 1 },
  { timestamp: "2025-01-02T00:00:00.000Z", value: 2.1 },
  { timestamp: "2025-01-03T00:00:00.000Z", value: 3.2 },
  { timestamp: "2025-01-04T00:00:00.000Z", value: 3.3 },
  { timestamp: "2025-01-05T00:00:00.000Z", value: 3.5 },
  { timestamp: "2025-01-06T00:00:00.000Z", value: 3.6 },
] as const;

const future = ["2025-01-08T00:00:00.000Z", "2025-01-03T00:00:00.000Z", "2025-01-08T00:00:00.000Z"];

const explicitChangepoint = {
  map: { changepoints: { mode: "explicit", timestamps: ["2025-01-03T00:00:00.000Z"] } },
} as const;

const linearModel = () =>
  Effect.runPromise(
    fit(history, explicitChangepoint).pipe(Effect.provide(prophetFittingBackendLayer)),
  );

const regressorHistory = Array.from({ length: 8 }, (_, index) => {
  const promotion = index % 3 === 0 ? 1 : 0;

  return {
    timestamp: new Date(Date.UTC(2025, 0, index + 1)).toISOString(),
    value: 5 + index * 0.2 + promotion * 3,
    regressors: { promotion },
  };
});

const regressorRows = [
  { timestamp: "2025-01-10T00:00:00.000Z", regressors: { promotion: 0 } },
  { timestamp: "2025-01-10T00:00:00.000Z", regressors: { promotion: 1 } },
  { timestamp: "2025-01-09T00:00:00.000Z", regressors: { promotion: 0 } },
] as const;

const logisticHistory = [1.2, 2.2, 4.2, 6.1, 7.6, 8.9].map((value, index) => ({
  timestamp: new Date(Date.UTC(2024, 0, index + 1)).toISOString(),
  value,
  capacity: 10,
}));

const logisticRows = [
  { timestamp: "2024-01-08T00:00:00.000Z", capacity: 10 },
  { timestamp: "2024-01-08T00:00:00.000Z", capacity: 20 },
] as const;

const families = async (): Promise<
  ReadonlyArray<{ readonly model: FittedProphet; readonly rows: EncodedPredictionRows }>
> => {
  const fitted = await Effect.runPromise(
    Effect.all([
      fit(history, { growth: "flat" }),
      fit(history, explicitChangepoint),
      fit(regressorHistory, { regressors: [{ name: "promotion", priorScale: 100 }] }),
      fit(logisticHistory, {
        growth: "logistic",
        map: { changepoints: { mode: "explicit", timestamps: ["2024-01-03T00:00:00.000Z"] } },
      }),
    ]).pipe(Effect.provide(prophetFittingBackendLayer)),
  );

  const [flat, linear, regressor, logistic] = fitted;

  return [
    { model: flat, rows: future },
    { model: linear, rows: future },
    { model: regressor, rows: regressorRows },
    { model: logistic, rows: logisticRows },
  ];
};

describe("predictWithIntervals", () => {
  it("equals manual predict and predictUncertainty composition for every model family", async () => {
    const options = { seed: 7, samples: 64, intervalWidth: 0.9 } as const;

    for (const { model, rows } of await families()) {
      const [combined, forecasts, intervals] = await Effect.runPromise(
        Effect.all([
          predictWithIntervals(model, rows, options),
          predict(model, rows),
          predictUncertainty(model, rows, options),
        ]),
      );

      if (intervals.kind !== "intervals") {
        throw new Error("Expected interval output");
      }

      expect(combined).toEqual({
        simulation: simulationIdentity,
        sampleCount: 64,
        intervalWidth: 0.9,
        rows: forecasts.map((forecast, index) => ({
          ...forecast,
          valueInterval: intervals.rows[index]?.value,
          trendInterval: intervals.rows[index]?.trend,
        })),
      });
    }
  });

  it("keeps request order and each tied row's own auxiliary inputs", async () => {
    const [, , regressor, logistic] = await families();

    if (regressor === undefined || logistic === undefined) {
      throw new Error("Expected regressor and logistic models");
    }

    const promoted = await Effect.runPromise(
      predictWithIntervals(regressor.model, regressorRows, { seed: 3, samples: 32 }),
    );

    expect(promoted.rows.map((row) => row.timestamp)).toEqual([
      Date.parse("2025-01-10T00:00:00.000Z"),
      Date.parse("2025-01-10T00:00:00.000Z"),
      Date.parse("2025-01-09T00:00:00.000Z"),
    ]);

    const [plain, promotion] = promoted.rows;
    expect(promotion?.value).toBeGreaterThan(plain?.value ?? Number.POSITIVE_INFINITY);
    expect(promotion?.valueInterval.lower).toBeGreaterThan(plain?.valueInterval.lower ?? Infinity);

    const capped = await Effect.runPromise(
      predictWithIntervals(logistic.model, logisticRows, { seed: 3, samples: 32 }),
    );

    const [low, high] = capped.rows;
    expect(high?.trend).toBeCloseTo(2 * (low?.trend ?? NaN), 11);
    expect(high?.trendInterval.upper).toBeGreaterThan(low?.trendInterval.upper ?? Infinity);
  });

  it("replays by seed, keeps predict's point value, and owns its result", async () => {
    const model = await linearModel();
    const rows = future.map((timestamp) => ({ timestamp }));
    const options = { seed: 42, samples: 128 };
    const before = structuredClone({ model, rows, options });

    const first = await Effect.runPromise(predictWithIntervals(model, rows, options));
    const again = await Effect.runPromise(predictWithIntervals(model, rows, options));
    const reseeded = await Effect.runPromise(predictWithIntervals(model, rows, { seed: 43 }));
    const forecasts = await Effect.runPromise(predict(model, rows));

    expect(again).toEqual(first);
    expect(reseeded.rows).not.toEqual(first.rows);
    expect(first.rows.map((row) => row.value)).toEqual(forecasts.map((row) => row.value));
    expect({ model, rows, options }).toEqual(before);

    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.rows)).toBe(true);
    expect(Object.isFrozen(first.rows[0])).toBe(true);
    expect(Object.isFrozen(first.rows[0]?.valueInterval)).toBe(true);
    expect(Object.isFrozen(first.rows[0]?.trendInterval)).toBe(true);
  });

  it("returns an empty aligned frame for empty rows, like its constituents", async () => {
    const model = await linearModel();

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected linear MAP model");
    }

    for (const candidate of [model, { ...model, noiseScale: -1 }]) {
      const empty = await Effect.runPromise(predictWithIntervals(candidate, [], { seed: 0 }));

      expect(empty).toEqual({
        simulation: simulationIdentity,
        sampleCount: 1000,
        intervalWidth: 0.8,
        rows: [],
      });
    }
  });

  it("keeps row, option, model and auxiliary failure precedence", async () => {
    const model = await linearModel();

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected linear MAP model");
    }

    const rowError = await Effect.runPromise(
      Effect.flip(predictWithIntervals(model, ["bad"], { seed: -1 })),
    );

    expect(rowError).toBeInstanceOf(InputValidationError);
    expect(rowError).toMatchObject({ input: "prediction-timestamps" });

    for (const options of [
      JSON.parse("{}"),
      { seed: -1 },
      { seed: 1, samples: 0 },
      { seed: 1, intervalWidth: 1 },
      { seed: 1, typo: true },
    ]) {
      const error = await Effect.runPromise(
        Effect.flip(predictWithIntervals(model, future, options)),
      );

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error).toMatchObject({ input: "uncertainty-options" });
    }

    // Callers outside TypeScript can still ask for samples; that is rejected, not ignored.
    const samples = await Effect.runPromise(
      Effect.flip(predictWithIntervals(model, future, JSON.parse('{"seed":1,"output":"samples"}'))),
    );

    expect(samples).toBeInstanceOf(InputValidationError);
    expect(samples).toMatchObject({
      input: "uncertainty-options",
      issues: [{ path: ["output"] }],
    });

    const explicit: EncodedIntervalOptions = JSON.parse('{"seed":1,"output":"intervals"}');
    const accepted = await Effect.runPromise(predictWithIntervals(model, future, explicit));

    expect(accepted.rows).toHaveLength(future.length);

    const invalidModel = await Effect.runPromise(
      Effect.flip(predictWithIntervals({ ...model, noiseScale: -1 }, future, { seed: 1 })),
    );

    expect(invalidModel).toBeInstanceOf(PredictionError);
    expect(invalidModel).toMatchObject({ reason: "invalid-model" });

    const capacity = await Effect.runPromise(
      Effect.flip(
        predictWithIntervals(model, [{ timestamp: "2025-01-08T00:00:00.000Z", capacity: 10 }], {
          seed: 1,
        }),
      ),
    );

    expect(capacity).toBeInstanceOf(InputValidationError);

    const [, , regressor, logistic] = await families();

    const missingRegressor = await Effect.runPromise(
      Effect.flip(
        predictWithIntervals(regressor?.model ?? model, future, {
          seed: 1,
        }),
      ),
    );

    expect(missingRegressor).toBeInstanceOf(InputValidationError);

    const missingCapacity = await Effect.runPromise(
      Effect.flip(
        predictWithIntervals(logistic?.model ?? model, ["2024-01-08T00:00:00.000Z"], { seed: 1 }),
      ),
    );

    expect(missingCapacity).toBeInstanceOf(InputValidationError);
  });

  it("fails on simulation budgets before computing point forecasts", async () => {
    const model = await linearModel();
    const { spans, tracer } = collectTestSpans();
    const tooManyRows = Array.from({ length: 10_001 }, () => future[0] ?? "");

    const budget = await Effect.runPromise(
      Effect.flip(predictWithIntervals(model, tooManyRows, { seed: 1, samples: 1 })).pipe(
        Effect.withTracer(tracer),
      ),
    );

    expect(budget).toBeInstanceOf(PredictionError);
    expect(budget).toMatchObject({ reason: "simulation-limit" });
    expect(spans.map((span) => span.name)).toEqual([
      "Prophet.predictWithIntervals",
      "Prophet.predictUncertainty",
    ]);
  });

  it("ends one safe operation trace around both constituents and their engine calls", async () => {
    const model = await linearModel();
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      predictWithIntervals(model, future, { seed: 42, samples: 8 }).pipe(
        Effect.withSpan("forecast.job"),
        Effect.withTracer(tracer),
      ),
    );

    const span = (name: string) => {
      const found = spans.find((candidate) => candidate.name === name);

      if (found === undefined) {
        throw new Error(`Expected ${name}`);
      }

      return found;
    };

    const job = span("forecast.job");
    const operation = span("Prophet.predictWithIntervals");
    const uncertainty = span("Prophet.predictUncertainty");
    const simulate = span("effect-prophet.wasm.simulate");
    const point = span("Prophet.predict");
    const engine = span("effect-prophet.wasm.predict");

    const parentOf = (child: typeof operation) => child.parent.pipe(Option.getOrUndefined)?.spanId;

    expect(parentOf(operation)).toBe(job.spanId);
    expect(parentOf(uncertainty)).toBe(operation.spanId);
    expect(parentOf(point)).toBe(operation.spanId);
    expect(parentOf(simulate)).toBe(uncertainty.spanId);
    expect(parentOf(engine)).toBe(point.spanId);

    const operationStatus = requireEndedSpan(operation);

    for (const child of [uncertainty, simulate, point, engine]) {
      const status = requireEndedSpan(child);

      expect(child.traceId).toBe(job.traceId);
      expect(Exit.isSuccess(status.exit)).toBe(true);
      expect(status.startTime).toBeGreaterThanOrEqual(operationStatus.startTime);
      expect(status.endTime).toBeLessThanOrEqual(operationStatus.endTime);
    }

    expect(operation.traceId).toBe(job.traceId);
    expect(Exit.isSuccess(operationStatus.exit)).toBe(true);
    expect(Object.fromEntries(operation.attributes)).toEqual({});
  });

  it("ends a failed operation span without engine spans on pre-boundary failures", async () => {
    const model = await linearModel();

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected linear MAP model");
    }

    const { spans, tracer } = collectTestSpans();

    const failed = await Effect.runPromise(
      predictWithIntervals({ ...model, noiseScale: -1 }, future, { seed: 1 }).pipe(
        Effect.withTracer(tracer),
        Effect.exit,
      ),
    );

    expect(Exit.isFailure(failed)).toBe(true);

    const operation = spans.find((span) => span.name === "Prophet.predictWithIntervals");
    const status = operation === undefined ? undefined : requireEndedSpan(operation);

    expect(status !== undefined && Exit.isFailure(status.exit)).toBe(true);

    if (status !== undefined && Exit.isFailure(status.exit) && Exit.isFailure(failed)) {
      expect(status.exit.cause).toEqual(failed.cause);
    }

    expect(spans.map((span) => span.name)).toEqual([
      "Prophet.predictWithIntervals",
      "Prophet.predictUncertainty",
    ]);

    spans.length = 0;

    // Malformed input fails before either constituent operation starts.
    for (const request of [
      predictWithIntervals(model, ["bad"], { seed: 1 }),
      predictWithIntervals(model, future, { seed: -1 }),
      predictWithIntervals(model, future, JSON.parse('{"seed":1,"output":"samples"}')),
    ]) {
      await Effect.runPromise(request.pipe(Effect.withTracer(tracer), Effect.exit));
    }

    expect(spans.map((span) => span.name)).toEqual([
      "Prophet.predictWithIntervals",
      "Prophet.predictWithIntervals",
      "Prophet.predictWithIntervals",
    ]);

    spans.length = 0;

    await Effect.runPromise(
      predictWithIntervals(model, [], { seed: 1 }).pipe(Effect.withTracer(tracer)),
    );

    expect(spans.filter((span) => span.name.startsWith("effect-prophet.wasm."))).toEqual([]);
  });
});
