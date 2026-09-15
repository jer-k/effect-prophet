import { Cause, Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError, PredictionError } from "../../src/errors";
import { parseLinearModel, type LinearParameters } from "../../src/fitted-model";
import {
  makeWasmLinearTrendAdapter,
  wasmLinearTrendFittingBackendLayer,
  type WasmLinearTrendModule,
} from "../../src/internal/wasm-linear-trend-backend";
import { fit, predict } from "../../src/prophet";
import { registerFittingBackendConformance } from "./fitting-backend-conformance";

const observations = [
  { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
  { timestamp: "2024-01-01T00:00:01.000Z", value: 5 },
  { timestamp: "2024-01-01T00:00:02.000Z", value: 8 },
] as const;

const predictionTimestamps = ["2024-01-01T00:00:03.000Z", "2024-01-01T00:00:04.000Z"] as const;

const validLinearParameters: LinearParameters = {
  model: "linear-trend",
  intercept: 2,
  slope: 6,
  timeOrigin: 1_704_067_200_000,
  timeScale: 2_000,
};

const validLinearModel = Effect.runSync(parseLinearModel(validLinearParameters));

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
  expect(Option.isSome(span.parent), `Expected ${span.name} to have a parent span`).toBe(true);

  if (Option.isNone(span.parent)) {
    throw new Error(`Expected ${span.name} to have a parent span`);
  }

  return span.parent.value;
};

const requireEndedStatus = (span: Tracer.Span): EndedSpanStatus => {
  const isEnded = Predicate.isTagged("Ended");

  expect(isEnded(span.status), `Expected ${span.name} to have ended`).toBe(true);

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

registerFittingBackendConformance("Rust/WASM linear-trend", wasmLinearTrendFittingBackendLayer);

const fittingInput = {
  timestamps: new Float64Array([100, 200, 300]),
  values: new Float64Array([2, 5, 8]),
};

const linearFitOptions = { growth: "linear" } as const;

const moduleReturning = (
  fitResult: Float64Array,
  predictionResult: Float64Array,
): WasmLinearTrendModule => ({
  fit_linear_trend: () => fitResult,
  predict_linear_trend: () => predictionResult,
});

describe("Rust/WASM adapter boundary", () => {
  it("distinguishes loader failures and preserves their causes", async () => {
    const sentinel = new Error("private loader details");

    const adapter = makeWasmLinearTrendAdapter(() => {
      throw sentinel;
    });

    const fittingError = await Effect.runPromise(
      Effect.flip(adapter.fit(fittingInput, linearFitOptions)),
    );

    const predictionError = await Effect.runPromise(
      Effect.flip(adapter.predict(validLinearModel, [300])),
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
      expect(predictionError.timestamp).toBe(300);
      expect(predictionError.cause).toBe(sentinel);
      expect(predictionError.message).not.toContain(sentinel.message);
    }
  });

  it("distinguishes fitting and prediction execution failures", async () => {
    const fitSentinel = new Error("private fit trap");
    const predictionSentinel = new Error("private prediction trap");

    const adapter = makeWasmLinearTrendAdapter(() => ({
      fit_linear_trend: () => {
        throw fitSentinel;
      },
      predict_linear_trend: () => {
        throw predictionSentinel;
      },
    }));

    const fittingError = await Effect.runPromise(
      Effect.flip(adapter.fit(fittingInput, linearFitOptions)),
    );

    const predictionError = await Effect.runPromise(
      Effect.flip(adapter.predict(validLinearModel, [300])),
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

  it("checks unsupported growth before loading", async () => {
    const adapter = makeWasmLinearTrendAdapter(() => {
      throw new Error("loader must not run");
    });

    const error = await Effect.runPromise(
      Effect.flip(adapter.fit(fittingInput, { growth: "flat" })),
    );

    expect(error).toBeInstanceOf(Error);
    expect(error._tag).toBe("UnsupportedConfigurationError");
  });

  it("returns an empty prediction without loading", async () => {
    const adapter = makeWasmLinearTrendAdapter(() => {
      throw new Error("loader must not run");
    });

    const predictions = await Effect.runPromise(adapter.predict(validLinearModel, []));

    expect(predictions).toEqual([]);
  });

  it("rejects malformed module exports during loading", async () => {
    const adapter = makeWasmLinearTrendAdapter(
      // @ts-expect-error -- Missing exports deliberately exercise the untyped Node module boundary.
      () => ({ fit_linear_trend: () => new Float64Array([0, 2, 6, 100, 200]) }),
    );

    const error = await Effect.runPromise(Effect.flip(adapter.fit(fittingInput, linearFitOptions)));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.backendPhase).toBe("load");
      expect(error.cause).toBeInstanceOf(TypeError);
    }
  });

  it.each([
    ["an empty frame", []],
    ["a fractional status", [1.5]],
    ["an unknown status", [99]],
    ["the wrong success length", [0, 2, 6, 100]],
    ["an invalid successful scale", [0, 2, 6, 100, 0]],
    ["a non-finite successful parameter", [0, Number.NaN, 6, 100, 200]],
    ["an extra fitting failure entry", [1, 0]],
    ["an extra numerical failure entry", [6, 0]],
  ])("rejects fitting protocol result with %s", async (_label, values) => {
    const adapter = makeWasmLinearTrendAdapter(() =>
      moduleReturning(new Float64Array(values), new Float64Array([0])),
    );

    const error = await Effect.runPromise(Effect.flip(adapter.fit(fittingInput, linearFitOptions)));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("backend-failure");
      expect(error.backendPhase).toBe("protocol");
      expect(error.observationCount).toBe(3);
      expect(error.cause).toBeUndefined();
    }
  });

  it("rejects a JavaScript-shaped fitting result container", async () => {
    const adapter = makeWasmLinearTrendAdapter(
      // @ts-expect-error -- A plain array deliberately violates the generated binding contract.
      () => moduleReturning([0, 2, 6, 100, 200], new Float64Array([0])),
    );

    const error = await Effect.runPromise(Effect.flip(adapter.fit(fittingInput, linearFitOptions)));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.backendPhase).toBe("protocol");
    }
  });

  it.each([
    ["an empty frame", []],
    ["a fractional status", [1.5]],
    ["an unknown status", [99]],
    ["the wrong success length", [0, 11]],
    ["a non-finite claimed success", [0, 11, Number.POSITIVE_INFINITY]],
    ["an unsupported metadata failure", [1]],
    ["an indexed metadata-only status", [5, 0]],
    ["an extra failure entry", [6, 0, 1]],
    ["a missing evaluation index", [6, Number.NaN]],
    ["a negative evaluation index", [6, -1]],
    ["a fractional evaluation index", [6, 0.5]],
    ["an out-of-range evaluation index", [6, 2]],
  ])("rejects prediction protocol result with %s", async (_label, values) => {
    const adapter = makeWasmLinearTrendAdapter(() =>
      moduleReturning(new Float64Array([0, 2, 6, 100, 200]), new Float64Array(values)),
    );

    const error = await Effect.runPromise(
      Effect.flip(adapter.predict(validLinearModel, [300, 400])),
    );

    expect(error).toBeInstanceOf(PredictionError);

    if (error instanceof PredictionError) {
      expect(error.reason).toBe("backend-failure");
      expect(error.backendPhase).toBe("protocol");
      expect(error.timestamp).toBe(300);
      expect(error.cause).toBeUndefined();
    }
  });

  it("rejects a JavaScript-shaped prediction result container", async () => {
    const adapter = makeWasmLinearTrendAdapter(
      // @ts-expect-error -- A plain array deliberately violates the generated binding contract.
      () => moduleReturning(new Float64Array([0, 2, 6, 100, 200]), [0, 11]),
    );

    const error = await Effect.runPromise(Effect.flip(adapter.predict(validLinearModel, [300])));

    expect(error).toBeInstanceOf(PredictionError);

    if (error instanceof PredictionError) {
      expect(error.backendPhase).toBe("protocol");
    }
  });

  it("maps metadata and indexed numerical failures using their frame context", async () => {
    const metadataAdapter = makeWasmLinearTrendAdapter(() =>
      moduleReturning(new Float64Array([0, 2, 6, 100, 200]), new Float64Array([6])),
    );

    const evaluationAdapter = makeWasmLinearTrendAdapter(() =>
      moduleReturning(new Float64Array([0, 2, 6, 100, 200]), new Float64Array([6, 1])),
    );

    const metadataError = await Effect.runPromise(
      Effect.flip(metadataAdapter.predict(validLinearModel, [300, 400])),
    );

    const evaluationError = await Effect.runPromise(
      Effect.flip(evaluationAdapter.predict(validLinearModel, [300, 400])),
    );

    expect(metadataError).toBeInstanceOf(PredictionError);
    expect(evaluationError).toBeInstanceOf(PredictionError);

    if (metadataError instanceof PredictionError) {
      expect(metadataError.reason).toBe("invalid-model");
      expect(metadataError.timestamp).toBe(300);
      expect(metadataError.backendPhase).toBeUndefined();
    }

    if (evaluationError instanceof PredictionError) {
      expect(evaluationError.reason).toBe("non-finite-forecast");
      expect(evaluationError.timestamp).toBe(400);
      expect(evaluationError.backendPhase).toBeUndefined();
    }
  });

  it("preserves successful prediction ordering", async () => {
    const adapter = makeWasmLinearTrendAdapter(() =>
      moduleReturning(new Float64Array([0, 2, 6, 100, 200]), new Float64Array([0, 30, 10])),
    );

    const predictions = await Effect.runPromise(adapter.predict(validLinearModel, [300, 100]));

    expect(predictions).toEqual([30, 10]);
  });
});

describe("Rust/WASM boundary tracing", () => {
  it("records fit and prediction spans under the public operations", async () => {
    const recording = makeRecordingTracer();

    const forecasts = await Effect.runPromise(
      Effect.gen(function* () {
        const model = yield* fit(observations).pipe(
          Effect.provide(wasmLinearTrendFittingBackendLayer),
        );

        return yield* predict(model, predictionTimestamps);
      }).pipe(Effect.withSpan("forecast.job"), Effect.withTracer(recording.tracer)),
    );

    expect(forecasts.map((forecast) => forecast.value)).toEqual([11, 14]);

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
      "effect_prophet.model.type": "linear-trend",
      "effect_prophet.growth": "linear",
      "effect_prophet.observation.count": observations.length,
    });
    expect(Object.fromEntries(wasmPredictSpan.attributes)).toEqual({
      "effect_prophet.backend.type": "rust-wasm",
      "effect_prophet.operation": "predict",
      "effect_prophet.model.type": "linear-trend",
      "effect_prophet.prediction.count": predictionTimestamps.length,
    });

    expect(Exit.isSuccess(requireEndedStatus(wasmFitSpan).exit)).toBe(true);
    expect(Exit.isSuccess(requireEndedStatus(wasmPredictSpan).exit)).toBe(true);
    expectContainedInterval(wasmFitSpan, fitSpan);
    expectContainedInterval(wasmPredictSpan, predictSpan);
  });

  it("marks a numerical fitting failure span failed without replacing its typed error", async () => {
    const recording = makeRecordingTracer();

    const program = fit([{ timestamp: observations[0].timestamp, value: 2 }]).pipe(
      Effect.provide(wasmLinearTrendFittingBackendLayer),
      Effect.withSpan("forecast.job"),
      Effect.withTracer(recording.tracer),
    );

    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("insufficient-observations");
      expect(error.observationCount).toBe(1);
    }

    const fitSpan = requireSpan(recording.spans, "Prophet.fit");
    const wasmFitSpan = requireSpan(recording.spans, "effect-prophet.wasm.fit");
    const wasmStatus = requireEndedStatus(wasmFitSpan);

    expect(requireParent(wasmFitSpan).spanId).toBe(fitSpan.spanId);
    expect(Exit.isFailure(wasmStatus.exit)).toBe(true);
    expectContainedInterval(wasmFitSpan, fitSpan);

    if (Exit.isFailure(wasmStatus.exit)) {
      expect(Option.getOrUndefined(Cause.findErrorOption(wasmStatus.exit.cause))).toBe(error);
    }
  });

  it("does not record fit boundary spans for validation or unsupported growth failures", async () => {
    const recording = makeRecordingTracer();

    const invalidInputExit = await Effect.runPromise(
      fit([{ timestamp: "not-a-timestamp", value: 1 }]).pipe(
        Effect.provide(wasmLinearTrendFittingBackendLayer),
        Effect.withTracer(recording.tracer),
        Effect.exit,
      ),
    );

    const unsupportedGrowthExit = await Effect.runPromise(
      fit(observations, { growth: "flat" }).pipe(
        Effect.provide(wasmLinearTrendFittingBackendLayer),
        Effect.withTracer(recording.tracer),
        Effect.exit,
      ),
    );

    expect(Exit.isFailure(invalidInputExit)).toBe(true);
    expect(Exit.isFailure(unsupportedGrowthExit)).toBe(true);
    expect(recording.spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(false);
  });

  it("does not record prediction boundary spans for empty input or an invalid model", async () => {
    const recording = makeRecordingTracer();

    const emptyForecasts = await Effect.runPromise(
      predict(validLinearModel, []).pipe(Effect.withTracer(recording.tracer)),
    );

    const invalidModel: LinearParameters = {
      ...validLinearParameters,
      intercept: Number.NaN,
    };

    const invalidModelExit = await Effect.runPromise(
      // @ts-expect-error -- A plain backend record deliberately exercises the JavaScript runtime boundary.
      predict(invalidModel, [predictionTimestamps[0]]).pipe(
        Effect.withTracer(recording.tracer),
        Effect.exit,
      ),
    );

    expect(emptyForecasts).toEqual([]);
    expect(Exit.isFailure(invalidModelExit)).toBe(true);
    expect(recording.spans.some((span) => span.name === "effect-prophet.wasm.predict")).toBe(false);
  });

  it("marks a numerical prediction failure span failed without replacing its typed error", async () => {
    const recording = makeRecordingTracer();

    const overflowingModel = Effect.runSync(
      parseLinearModel({
        ...validLinearParameters,
        intercept: 0,
        slope: Number.MAX_VALUE,
        timeOrigin: 1_704_067_200_000,
        timeScale: 1,
      }),
    );

    const program = predict(overflowingModel, ["2024-01-01T00:00:00.002Z"]).pipe(
      Effect.withTracer(recording.tracer),
    );

    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBeInstanceOf(PredictionError);

    const predictSpan = requireSpan(recording.spans, "Prophet.predict");
    const wasmPredictSpan = requireSpan(recording.spans, "effect-prophet.wasm.predict");
    const wasmStatus = requireEndedStatus(wasmPredictSpan);

    expect(requireParent(wasmPredictSpan).spanId).toBe(predictSpan.spanId);
    expect(Exit.isFailure(wasmStatus.exit)).toBe(true);
    expectContainedInterval(wasmPredictSpan, predictSpan);

    if (Exit.isFailure(wasmStatus.exit)) {
      expect(Option.getOrUndefined(Cause.findErrorOption(wasmStatus.exit.cause))).toBe(error);
    }
  });
});
