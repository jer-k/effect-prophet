import { Effect, Exit, Option, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError } from "../../src/errors";
import { parseFlatMapModel } from "../../src/fitted-model";
import type { FlatMapWasmBindings } from "../../src/internal/prophet-wasm-module";
import { prophetFittingBackendLayer } from "../../src/internal/prophet-fitting-backend";
import { requireEndedSpan as requireEnded } from "./tracing-test-helpers";
import {
  makeWasmFlatMapAdapter,
  predictFlatMapWithWasm,
} from "../../src/internal/wasm-flat-map-backend";
import { fit, predict } from "../../src/prophet";
import * as Seasonality from "../../src/seasonality";

const DAY = 86_400_000;

const definitions = Effect.runSync(
  Seasonality.parseSeasonalities([
    { name: "daily-custom", periodDays: 1, fourierOrder: 1, priorScale: 10 },
  ]),
);

const seasonalities = Effect.runSync(Seasonality.makeSeasonalityLayout(definitions));

const input = {
  timestamps: new Float64Array([0, DAY / 4, DAY / 2, (3 * DAY) / 4, DAY, DAY * 1.25]),
  values: new Float64Array([1.1, 3, 0.9, -1.2, 1.2, 2.9]),
};

const validModel = Effect.runSync(
  parseFlatMapModel({
    model: "flat-map",
    level: 1,
    seasonalities,
    coefficients: [2, 0],
    noiseScale: 0.1,
    fitSummary: {
      method: "flat-map-coordinate-v1",
      termination: "converged",
      valueScale: 3,
      observationCount: 6,
      iterations: 4,
      objective: -1,
      stationarityResidual: 1e-12,
    },
  }),
);

const moduleReturning = (
  fitResult: Float64Array,
  predictionResult: Float64Array,
): FlatMapWasmBindings => ({
  fit_flat_map: () => fitResult,
  predict_flat_map: () => predictionResult,
});

describe("Rust/WASM flat MAP adapter boundary", () => {
  it("fits and predicts through the real generated binding", async () => {
    const model = await Effect.runPromise(
      fit(
        [
          { timestamp: "1970-01-01T00:00:00.000Z", value: 1.1 },
          { timestamp: "1970-01-01T06:00:00.000Z", value: 3 },
          { timestamp: "1970-01-01T12:00:00.000Z", value: 0.9 },
          { timestamp: "1970-01-01T18:00:00.000Z", value: -1.2 },
          { timestamp: "1970-01-02T00:00:00.000Z", value: 1.2 },
          { timestamp: "1970-01-02T06:00:00.000Z", value: 2.9 },
        ],
        {
          growth: "flat",
          seasonalities: [{ name: "daily-custom", periodDays: 1, fourierOrder: 1, priorScale: 10 }],
        },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("flat-map");

    if (model.model !== "flat-map") {
      throw new Error("Expected a flat-map model");
    }

    const batch = await Effect.runPromise(predictFlatMapWithWasm(model, [0, DAY / 4]));

    expect(batch.rowCount).toBe(2);
    expect(batch.componentCount).toBe(1);
    expect(batch.values[0]).toBe(batch.values[4]);
    expect(batch.values[2]).toBeCloseTo((batch.values[0] ?? 0) + (batch.values[1] ?? 0), 12);
  });

  it("preserves load and execute failures with coarse boundary phases", async () => {
    const loadCause = new Error("private load cause");

    const loadAdapter = makeWasmFlatMapAdapter(() => {
      throw loadCause;
    });

    const executeCause = new Error("private execute cause");

    const executeAdapter = makeWasmFlatMapAdapter(() => ({
      fit_flat_map: () => {
        throw executeCause;
      },
      predict_flat_map: () => {
        throw executeCause;
      },
    }));

    const loadError = await Effect.runPromise(Effect.flip(loadAdapter.fit(input, seasonalities)));

    const executeError = await Effect.runPromise(
      Effect.flip(executeAdapter.predict(validModel, [0])),
    );

    expect(loadError.backendPhase).toBe("load");
    expect(loadError.cause).toBe(loadCause);
    expect(executeError.backendPhase).toBe("execute");
    expect(executeError.cause).toBe(executeCause);
  });

  it.each([
    ["empty", []],
    ["fractional status", [1.5]],
    ["unknown status", [99]],
    ["wrong success width", [0, 1, 0.1]],
    ["wrong observation count", [0, 1, 0.1, 3, 5, 4, -1, 0, 0, 2, 0]],
    ["unknown termination", [0, 1, 0.1, 3, 6, 4, -1, 0, 9, 2, 0]],
    ["extra failure data", [7, 1]],
  ])("strictly rejects a malformed fit frame: %s", async (_label, frame) => {
    const adapter = makeWasmFlatMapAdapter(() =>
      moduleReturning(new Float64Array(frame), new Float64Array([0])),
    );

    const error = await Effect.runPromise(Effect.flip(adapter.fit(input, seasonalities)));

    expect(error).toBeInstanceOf(FittingError);
    expect(error.reason).toBe("backend-failure");
    expect(error.backendPhase).toBe("protocol");
  });

  it.each([
    [7, "noise-collapse"],
    [8, "non-convergence"],
    [6, "non-finite-result"],
  ] as const)("preserves flat numerical fit status %s", async (status, reason) => {
    const adapter = makeWasmFlatMapAdapter(() =>
      moduleReturning(new Float64Array([status]), new Float64Array([0])),
    );

    const error = await Effect.runPromise(Effect.flip(adapter.fit(input, seasonalities)));

    expect(error.reason).toBe(reason);
    expect(error.backendPhase).toBeUndefined();
  });

  it("strictly decodes prediction frames and maps indexed numerical failures", async () => {
    const malformed = makeWasmFlatMapAdapter(() =>
      moduleReturning(new Float64Array([1]), new Float64Array([0, 1])),
    );

    const numerical = makeWasmFlatMapAdapter(() =>
      moduleReturning(new Float64Array([1]), new Float64Array([6, 1])),
    );

    const malformedError = await Effect.runPromise(
      Effect.flip(malformed.predict(validModel, [0, DAY / 4])),
    );

    const numericalError = await Effect.runPromise(
      Effect.flip(numerical.predict(validModel, [0, DAY / 4])),
    );

    expect(malformedError.backendPhase).toBe("protocol");
    expect(numericalError.reason).toBe("non-finite-forecast");
    expect(numericalError.timestamp).toBe(DAY / 4);
  });

  it("returns an empty prediction without loading the WASM module", async () => {
    const adapter = makeWasmFlatMapAdapter(() => {
      throw new Error("loader must not run");
    });

    await expect(Effect.runPromise(adapter.predict(validModel, []))).resolves.toEqual({
      rowCount: 0,
      componentCount: 1,
      values: new Float64Array(),
    });
  });
});

describe("Rust/WASM flat MAP tracing", () => {
  it("records complete flat fit and prediction boundaries under public spans", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const observations = [
      { timestamp: "1970-01-01T00:00:00.000Z", value: 1.1 },
      { timestamp: "1970-01-01T06:00:00.000Z", value: 3 },
      { timestamp: "1970-01-01T12:00:00.000Z", value: 0.9 },
      { timestamp: "1970-01-01T18:00:00.000Z", value: -1.2 },
      { timestamp: "1970-01-02T00:00:00.000Z", value: 1.2 },
      { timestamp: "1970-01-02T06:00:00.000Z", value: 2.9 },
    ] as const;

    const forecasts = await Effect.runPromise(
      Effect.gen(function* () {
        const model = yield* fit(observations, {
          growth: "flat",
          seasonalities: [{ name: "daily-custom", periodDays: 1, fourierOrder: 1, priorScale: 10 }],
        }).pipe(Effect.provide(prophetFittingBackendLayer));

        return yield* predict(model, ["1970-01-02T12:00:00.000Z"]);
      }).pipe(Effect.withSpan("forecast.job"), Effect.withTracer(tracer)),
    );

    expect(forecasts).toHaveLength(1);

    const root = spans.find((span) => span.name === "forecast.job");

    const publicFit = spans.find((span) => span.name === "Prophet.fit");

    const publicPredict = spans.find((span) => span.name === "Prophet.predict");

    const wasmSpans = spans.filter((span) => span.name.startsWith("effect-prophet.wasm."));

    expect(root).toBeDefined();
    expect(publicFit).toBeDefined();
    expect(publicPredict).toBeDefined();
    expect(wasmSpans).toHaveLength(2);

    if (root === undefined || publicFit === undefined || publicPredict === undefined) {
      return;
    }

    for (const span of wasmSpans) {
      expect(span.traceId).toBe(root.traceId);
      expect(Option.isSome(span.parent)).toBe(true);
      expect(Exit.isSuccess(requireEnded(span).exit)).toBe(true);
      expect(Object.fromEntries(span.attributes)["effect_prophet.model.type"]).toBe("flat-map");
    }

    const wasmFit = wasmSpans.find((span) => span.name === "effect-prophet.wasm.fit");

    const wasmPredict = wasmSpans.find((span) => span.name === "effect-prophet.wasm.predict");

    expect(wasmFit?.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicFit.spanId);
    expect(wasmPredict?.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicPredict.spanId);

    if (wasmFit !== undefined) {
      const child = requireEnded(wasmFit);
      const parent = requireEnded(publicFit);

      expect(child.startTime >= parent.startTime).toBe(true);
      expect(child.endTime <= parent.endTime).toBe(true);
    }

    if (wasmPredict !== undefined) {
      const child = requireEnded(wasmPredict);
      const parent = requireEnded(publicPredict);

      expect(child.startTime >= parent.startTime).toBe(true);
      expect(child.endTime <= parent.endTime).toBe(true);
    }
  });

  it("short-circuits insufficient flat history before the numerical boundary", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const program = fit([{ timestamp: "1970-01-01T00:00:00.000Z", value: 1 }], {
      growth: "flat",
    }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer));

    const error = await Effect.runPromise(Effect.flip(program));
    const publicFit = spans.find((span) => span.name === "Prophet.fit");
    const wasmFit = spans.find((span) => span.name === "effect-prophet.wasm.fit");

    expect(error).toBeInstanceOf(FittingError);
    expect(publicFit).toBeDefined();
    expect(wasmFit).toBeUndefined();
  });

  it("does not enter a flat WASM boundary on option validation", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    await Effect.runPromise(
      fit(
        [
          { timestamp: "1970-01-01T00:00:00.000Z", value: 1 },
          { timestamp: "1970-01-02T00:00:00.000Z", value: 2 },
        ],
        // @ts-expect-error -- Unknown options exercise the untyped runtime boundary.
        { growth: "flat", unknown: true },
      ).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer), Effect.exit),
    );

    expect(spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(false);
  });
});
