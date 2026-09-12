import { Cause, Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError, PredictionError } from "../../src/errors";
import type { FittedLinearParameters } from "../../src/internal/fitting-backend";
import { wasmLinearTrendFittingBackendLayer } from "../../src/internal/wasm-linear-trend-backend";
import { fit, predict, type FittedProphet } from "../../src/prophet";
import { registerFittingBackendConformance } from "./fitting-backend-conformance";

const observations = [
  { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
  { timestamp: "2024-01-01T00:00:01.000Z", value: 5 },
  { timestamp: "2024-01-01T00:00:02.000Z", value: 8 },
] as const;

const predictionTimestamps = ["2024-01-01T00:00:03.000Z", "2024-01-01T00:00:04.000Z"] as const;

const validLinearModel: FittedLinearParameters = {
  model: "linear-trend",
  intercept: 2,
  slope: 6,
  timeOrigin: 1_704_067_200_000,
  timeScale: 2_000,
};

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

    const invalidModel: FittedProphet = {
      ...validLinearModel,
      intercept: Number.NaN,
    };

    const invalidModelExit = await Effect.runPromise(
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

    const overflowingModel: FittedProphet = {
      ...validLinearModel,
      intercept: 0,
      slope: Number.MAX_VALUE,
      timeOrigin: 1_704_067_200_000,
      timeScale: 1,
    };

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
