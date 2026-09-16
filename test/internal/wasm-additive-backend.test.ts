import { Cause, Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError, PredictionError, UnsupportedConfigurationError } from "../../src/errors";
import { parseLinearAdditiveModel } from "../../src/fitted-model";
import type { FitOptions } from "../../src/internal/fitting-backend";
import type { AdditiveRidgeWasmBindings } from "../../src/internal/prophet-wasm-module";
import {
  makeWasmAdditiveAdapter,
  predictAdditiveWithWasm,
  wasmAdditiveFittingBackendLayer,
} from "../../src/internal/wasm-additive-backend";
import { fit, predict } from "../../src/prophet";
import * as Seasonality from "../../src/seasonality";
import { registerAdditiveBackendConformance } from "./additive-backend-conformance";

const DAY = 86_400_000;

const definitions = Effect.runSync(
  Seasonality.parseSeasonalities([
    { name: "daily-custom", periodDays: 1, fourierOrder: 1, priorScale: 10 },
  ]),
);

const seasonalities = Effect.runSync(Seasonality.makeSeasonalityLayout(definitions));

const emptySeasonalities = Effect.runSync(Seasonality.makeSeasonalityLayout([]));

const additiveOptions: FitOptions = { growth: "linear", seasonalities };

const fittingInput = {
  timestamps: new Float64Array([0, DAY / 4, DAY / 2]),
  values: new Float64Array([1, 3, 1]),
};

const validModel = Effect.runSync(
  parseLinearAdditiveModel({
    model: "linear-additive-ridge",
    intercept: 1,
    slope: 2,
    timeOrigin: 0,
    timeScale: DAY,
    seasonalities,
    coefficients: [2, 3],
    fitSummary: {
      method: "normalized-ridge-v1",
      valueScale: 3,
      observationCount: 3,
      numericalRank: 4,
      normalizedResidualSumSquares: 0.1,
      penalizedObjective: 0.2,
    },
  }),
);

const moduleReturning = (
  fitResult: Float64Array,
  predictionResult: Float64Array,
): AdditiveRidgeWasmBindings => ({
  fit_additive_ridge: () => fitResult,
  predict_additive_ridge: () => predictionResult,
});

registerAdditiveBackendConformance(
  "Rust/WASM",
  wasmAdditiveFittingBackendLayer,
  predictAdditiveWithWasm,
);

describe("Rust/WASM additive adapter boundary", () => {
  it("distinguishes loader failures and preserves their causes", async () => {
    const sentinel = new Error("private additive loader details");

    const adapter = makeWasmAdditiveAdapter(() => {
      throw sentinel;
    });

    const fittingError = await Effect.runPromise(
      Effect.flip(adapter.fit(fittingInput, additiveOptions)),
    );

    const predictionError = await Effect.runPromise(
      Effect.flip(adapter.predict(validModel, [DAY])),
    );

    expect(fittingError).toBeInstanceOf(FittingError);
    expect(predictionError).toBeInstanceOf(PredictionError);

    if (fittingError instanceof FittingError) {
      expect(fittingError.backendPhase).toBe("load");
      expect(fittingError.cause).toBe(sentinel);
      expect(fittingError.message).not.toContain(sentinel.message);
    }

    if (predictionError instanceof PredictionError) {
      expect(predictionError.backendPhase).toBe("load");
      expect(predictionError.cause).toBe(sentinel);
      expect(predictionError.message).not.toContain(sentinel.message);
    }
  });

  it("distinguishes fitting and prediction execution failures", async () => {
    const fitSentinel = new Error("private additive fit trap");
    const predictionSentinel = new Error("private additive prediction trap");

    const adapter = makeWasmAdditiveAdapter(() => ({
      fit_additive_ridge: () => {
        throw fitSentinel;
      },
      predict_additive_ridge: () => {
        throw predictionSentinel;
      },
    }));

    const fittingError = await Effect.runPromise(
      Effect.flip(adapter.fit(fittingInput, additiveOptions)),
    );

    const predictionError = await Effect.runPromise(
      Effect.flip(adapter.predict(validModel, [DAY])),
    );

    expect(fittingError).toBeInstanceOf(FittingError);
    expect(predictionError).toBeInstanceOf(PredictionError);

    if (fittingError instanceof FittingError) {
      expect(fittingError.backendPhase).toBe("execute");
      expect(fittingError.cause).toBe(fitSentinel);
    }

    if (predictionError instanceof PredictionError) {
      expect(predictionError.backendPhase).toBe("execute");
      expect(predictionError.cause).toBe(predictionSentinel);
    }
  });

  it("rejects unsupported growth before loading", async () => {
    const adapter = makeWasmAdditiveAdapter(() => {
      throw new Error("loader must not run");
    });

    const error = await Effect.runPromise(
      Effect.flip(adapter.fit(fittingInput, { growth: "flat", seasonalities: emptySeasonalities })),
    );

    expect(error).toBeInstanceOf(UnsupportedConfigurationError);

    if (error instanceof UnsupportedConfigurationError) {
      expect(error.configuration).toEqual({
        option: "growth",
        received: "flat",
        supported: ["linear"],
      });
    }
  });

  it("returns an empty prediction without loading", async () => {
    const adapter = makeWasmAdditiveAdapter(() => {
      throw new Error("loader must not run");
    });

    const batch = await Effect.runPromise(adapter.predict(validModel, []));

    expect(batch).toEqual({
      rowCount: 0,
      componentCount: 1,
      values: new Float64Array(),
    });
  });

  it.each([
    ["an empty frame", []],
    ["a fractional status", [1.5]],
    ["an unknown status", [99]],
    ["the wrong success length", [0, 1, 2]],
    ["an invalid successful scale", [0, 1, 2, 0, 0, 3, 4, 0.1, 0.2, 2, 3]],
    ["an invalid successful rank", [0, 1, 2, 0, DAY, 3, 3, 0.1, 0.2, 2, 3]],
    ["an extra failure entry", [6, 0]],
  ])("rejects fitting protocol result with %s", async (_label, values) => {
    const adapter = makeWasmAdditiveAdapter(() =>
      moduleReturning(new Float64Array(values), new Float64Array([0])),
    );

    const error = await Effect.runPromise(Effect.flip(adapter.fit(fittingInput, additiveOptions)));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("backend-failure");
      expect(error.backendPhase).toBe("protocol");
      expect(error.parameterCount).toBe(4);
    }
  });

  it.each([
    [6, "rank-deficient"],
    [8, "non-finite-result"],
  ] as const)("maps numerical fit status %s precisely", async (status, reason) => {
    const adapter = makeWasmAdditiveAdapter(() =>
      moduleReturning(new Float64Array([status]), new Float64Array([0])),
    );

    const error = await Effect.runPromise(Effect.flip(adapter.fit(fittingInput, additiveOptions)));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe(reason);
      expect(error.parameterCount).toBe(4);
      expect(error.backendPhase).toBeUndefined();
    }
  });

  it.each([
    ["an empty frame", []],
    ["a fractional status", [1.5]],
    ["an unknown status", [99]],
    ["the wrong success length", [0, 1, 2]],
    ["a non-finite success", [0, 1, 2, 3, 4, 1, 2, Number.NaN, 4]],
    ["an indexed metadata failure", [2, 0]],
    ["a missing evaluation index", [6]],
    ["a fractional evaluation index", [6, 0.5]],
    ["an out-of-range evaluation index", [6, 2]],
  ])("rejects prediction protocol result with %s", async (_label, values) => {
    const adapter = makeWasmAdditiveAdapter(() =>
      moduleReturning(new Float64Array([1]), new Float64Array(values)),
    );

    const error = await Effect.runPromise(Effect.flip(adapter.predict(validModel, [0, DAY / 4])));

    expect(error).toBeInstanceOf(PredictionError);

    if (error instanceof PredictionError) {
      expect(error.reason).toBe("backend-failure");
      expect(error.backendPhase).toBe("protocol");
    }
  });

  it("maps metadata and indexed numerical prediction failures", async () => {
    const metadataAdapter = makeWasmAdditiveAdapter(() =>
      moduleReturning(new Float64Array([1]), new Float64Array([2])),
    );

    const numericalAdapter = makeWasmAdditiveAdapter(() =>
      moduleReturning(new Float64Array([1]), new Float64Array([6, 1])),
    );

    const metadataError = await Effect.runPromise(
      Effect.flip(metadataAdapter.predict(validModel, [0, DAY / 4])),
    );

    const numericalError = await Effect.runPromise(
      Effect.flip(numericalAdapter.predict(validModel, [0, DAY / 4])),
    );

    expect(metadataError).toBeInstanceOf(PredictionError);
    expect(numericalError).toBeInstanceOf(PredictionError);

    if (metadataError instanceof PredictionError) {
      expect(metadataError.reason).toBe("invalid-model");
      expect(metadataError.timestamp).toBe(0);
    }

    if (numericalError instanceof PredictionError) {
      expect(numericalError.reason).toBe("non-finite-forecast");
      expect(numericalError.timestamp).toBe(DAY / 4);
    }
  });

  it("preserves successful row ordering and duplicate timestamps", async () => {
    const packed = new Float64Array([0, 10, 2, 12, 2, 5, 1, 6, 1, 10, 2, 12, 2]);

    const adapter = makeWasmAdditiveAdapter(() => moduleReturning(new Float64Array([1]), packed));

    const batch = await Effect.runPromise(adapter.predict(validModel, [DAY, 0, DAY]));

    expect(batch.rowCount).toBe(3);
    expect(Array.from(batch.values)).toEqual(Array.from(packed.slice(1)));
  });
});

type EndedSpanStatus = Extract<Tracer.SpanStatus, { readonly _tag: "Ended" }>;

const makeRecordingTracer = () => {
  const spans: Array<Tracer.Span> = [];

  const tracer = Tracer.make({
    span: (options) => {
      const span = new Tracer.NativeSpan(options);
      spans.push(span);

      return span;
    },
  });

  return { spans, tracer };
};

const requireSpan = (spans: ReadonlyArray<Tracer.Span>, name: string): Tracer.Span => {
  const span = spans.find((candidate) => candidate.name === name);

  expect(span, `Expected the ${name} span to be recorded`).toBeDefined();

  if (span === undefined) {
    throw new Error(`Expected the ${name} span to be recorded`);
  }

  return span;
};

const requireParent = (span: Tracer.Span): Tracer.AnySpan => {
  expect(Option.isSome(span.parent)).toBe(true);

  if (Option.isNone(span.parent)) {
    throw new Error(`Expected ${span.name} to have a parent span`);
  }

  return span.parent.value;
};

const requireEndedStatus = (span: Tracer.Span): EndedSpanStatus => {
  const isEnded = Predicate.isTagged("Ended");

  expect(isEnded(span.status)).toBe(true);

  if (!isEnded(span.status)) {
    throw new Error(`Expected ${span.name} to have ended`);
  }

  return span.status;
};

const expectContainedInterval = (child: Tracer.Span, parent: Tracer.Span): void => {
  const childStatus = requireEndedStatus(child);
  const parentStatus = requireEndedStatus(parent);

  expect(childStatus.startTime >= parentStatus.startTime).toBe(true);
  expect(childStatus.endTime <= parentStatus.endTime).toBe(true);
};

const publicObservations = [
  { timestamp: "1970-01-01T00:00:00.000Z", value: 1 },
  { timestamp: "1970-01-01T06:00:00.000Z", value: 3 },
  { timestamp: "1970-01-01T12:00:00.000Z", value: 1 },
  { timestamp: "1970-01-01T18:00:00.000Z", value: -1 },
  { timestamp: "1970-01-02T00:00:00.000Z", value: 1 },
] as const;

const publicOptions = {
  seasonalities: [{ name: "daily-custom", periodDays: 1, fourierOrder: 1, priorScale: 10 }],
} as const;

describe("Rust/WASM additive boundary tracing", () => {
  it("records successful additive boundaries under the public operations", async () => {
    const recording = makeRecordingTracer();

    const forecasts = await Effect.runPromise(
      Effect.gen(function* () {
        const model = yield* fit(publicObservations, publicOptions).pipe(
          Effect.provide(wasmAdditiveFittingBackendLayer),
        );

        return yield* predict(model, ["1970-01-01T06:00:00.000Z", "1970-01-02T06:00:00.000Z"]);
      }).pipe(Effect.withSpan("forecast.job"), Effect.withTracer(recording.tracer)),
    );

    expect(forecasts).toHaveLength(2);

    const rootSpan = requireSpan(recording.spans, "forecast.job");
    const fitSpan = requireSpan(recording.spans, "Prophet.fit");
    const wasmFitSpan = requireSpan(recording.spans, "effect-prophet.wasm.fit");
    const predictSpan = requireSpan(recording.spans, "Prophet.predict");
    const wasmPredictSpan = requireSpan(recording.spans, "effect-prophet.wasm.predict");

    for (const span of recording.spans) {
      expect(span.traceId).toBe(rootSpan.traceId);
    }

    expect(requireParent(fitSpan).spanId).toBe(rootSpan.spanId);
    expect(requireParent(wasmFitSpan).spanId).toBe(fitSpan.spanId);
    expect(requireParent(predictSpan).spanId).toBe(rootSpan.spanId);
    expect(requireParent(wasmPredictSpan).spanId).toBe(predictSpan.spanId);

    expect(Object.fromEntries(wasmFitSpan.attributes)).toEqual({
      "effect_prophet.backend.type": "rust-wasm",
      "effect_prophet.operation": "fit",
      "effect_prophet.model.type": "linear-additive-ridge",
      "effect_prophet.growth": "linear",
      "effect_prophet.observation.count": 5,
      "effect_prophet.seasonality.count": 1,
      "effect_prophet.coefficient.count": 2,
    });
    expect(Object.fromEntries(wasmPredictSpan.attributes)).toEqual({
      "effect_prophet.backend.type": "rust-wasm",
      "effect_prophet.operation": "predict",
      "effect_prophet.model.type": "linear-additive-ridge",
      "effect_prophet.prediction.count": 2,
      "effect_prophet.seasonality.count": 1,
    });

    expect(Exit.isSuccess(requireEndedStatus(wasmFitSpan).exit)).toBe(true);
    expect(Exit.isSuccess(requireEndedStatus(wasmPredictSpan).exit)).toBe(true);
    expectContainedInterval(wasmFitSpan, fitSpan);
    expectContainedInterval(wasmPredictSpan, predictSpan);
  });

  it("marks an additive numerical failure span failed without replacing its error", async () => {
    const recording = makeRecordingTracer();

    const program = fit([publicObservations[0]], publicOptions).pipe(
      Effect.provide(wasmAdditiveFittingBackendLayer),
      Effect.withTracer(recording.tracer),
    );

    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBeInstanceOf(FittingError);

    const fitSpan = requireSpan(recording.spans, "Prophet.fit");
    const wasmFitSpan = requireSpan(recording.spans, "effect-prophet.wasm.fit");
    const status = requireEndedStatus(wasmFitSpan);

    expect(requireParent(wasmFitSpan).spanId).toBe(fitSpan.spanId);
    expect(Exit.isFailure(status.exit)).toBe(true);
    expectContainedInterval(wasmFitSpan, fitSpan);

    if (Exit.isFailure(status.exit)) {
      expect(Option.getOrUndefined(Cause.findErrorOption(status.exit.cause))).toBe(error);
    }
  });

  it("marks an additive prediction failure span failed without replacing its error", async () => {
    const recording = makeRecordingTracer();

    const overflowingModel = Effect.runSync(
      parseLinearAdditiveModel({
        model: "linear-additive-ridge",
        intercept: 0,
        slope: Number.MAX_VALUE,
        timeOrigin: 0,
        timeScale: 1,
        seasonalities: emptySeasonalities,
        coefficients: [],
        fitSummary: {
          method: "normalized-ridge-v1",
          valueScale: 1,
          observationCount: 2,
          numericalRank: 2,
          normalizedResidualSumSquares: 0,
          penalizedObjective: 0,
        },
      }),
    );

    const program = predict(overflowingModel, ["1970-01-01T00:00:00.002Z"]).pipe(
      Effect.withTracer(recording.tracer),
    );

    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBeInstanceOf(PredictionError);

    const predictSpan = requireSpan(recording.spans, "Prophet.predict");
    const wasmPredictSpan = requireSpan(recording.spans, "effect-prophet.wasm.predict");
    const status = requireEndedStatus(wasmPredictSpan);

    expect(requireParent(wasmPredictSpan).spanId).toBe(predictSpan.spanId);
    expect(Exit.isFailure(status.exit)).toBe(true);
    expectContainedInterval(wasmPredictSpan, predictSpan);

    if (Exit.isFailure(status.exit)) {
      expect(Option.getOrUndefined(Cause.findErrorOption(status.exit.cause))).toBe(error);
    }
  });

  it("does not record additive boundaries for validation, unsupported growth, or empty prediction", async () => {
    const recording = makeRecordingTracer();

    await Effect.runPromise(
      fit(publicObservations, {
        seasonalities: [{ name: "daily", periodDays: 1, fourierOrder: 1 }],
      }).pipe(
        Effect.provide(wasmAdditiveFittingBackendLayer),
        Effect.withTracer(recording.tracer),
        Effect.exit,
      ),
    );

    await Effect.runPromise(
      fit(publicObservations, { growth: "flat" }).pipe(
        Effect.provide(wasmAdditiveFittingBackendLayer),
        Effect.withTracer(recording.tracer),
        Effect.exit,
      ),
    );

    const empty = await Effect.runPromise(
      predict(validModel, []).pipe(Effect.withTracer(recording.tracer)),
    );

    const invalidModel = {
      ...validModel,
      coefficients: [Number.NaN, 3],
    };

    const invalidModelExit = await Effect.runPromise(
      predict(invalidModel, ["1970-01-01T00:00:00.000Z"]).pipe(
        Effect.withTracer(recording.tracer),
        Effect.exit,
      ),
    );

    expect(empty).toEqual([]);
    expect(Exit.isFailure(invalidModelExit)).toBe(true);
    expect(recording.spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(false);
    expect(recording.spans.some((span) => span.name === "effect-prophet.wasm.predict")).toBe(false);
  });
});
