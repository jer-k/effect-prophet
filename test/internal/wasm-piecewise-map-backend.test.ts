import { Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError } from "../../src/errors";
import type { PiecewiseMapWasmBindings } from "../../src/internal/prophet-wasm-module";
import { prophetFittingBackendLayer } from "../../src/internal/prophet-fitting-backend";
import { makeWasmPiecewiseMapAdapter } from "../../src/internal/wasm-piecewise-map-backend";
import { fit, predict } from "../../src/prophet";
import * as Seasonality from "../../src/seasonality";

const input = {
  timestamps: new Float64Array([0, 1, 2, 3, 4, 5]),
  values: new Float64Array([1, 1.9, 3.1, 3.2, 3.4, 3.5]),
};

const seasonalities = Effect.runSync(
  Seasonality.parseSeasonalities([]).pipe(Effect.flatMap(Seasonality.makeSeasonalityLayout)),
);

const optimizer = {
  maxIterations: 2_000,
  relativeTolerance: 1e-10,
  absoluteTolerance: 1e-12,
} as const;

const moduleReturning = (fitResult: ReadonlyArray<number>): PiecewiseMapWasmBindings => ({
  fit_piecewise_map: () => new Float64Array(fitResult),
  predict_piecewise_map: () => new Float64Array([0]),
});

describe("Rust/WASM linear piecewise MAP adapter", () => {
  it("fits through the real generated binding", async () => {
    const model = await Effect.runPromise(
      fit(
        [
          { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
          { timestamp: "2024-01-02T00:00:00.000Z", value: 2.1 },
          { timestamp: "2024-01-03T00:00:00.000Z", value: 3.2 },
          { timestamp: "2024-01-04T00:00:00.000Z", value: 3.3 },
          { timestamp: "2024-01-05T00:00:00.000Z", value: 3.5 },
          { timestamp: "2024-01-06T00:00:00.000Z", value: 3.6 },
        ],
        {
          map: {
            changepoints: {
              mode: "explicit",
              timestamps: ["2024-01-03T00:00:00.000Z"],
            },
            changepointPriorScale: 0.5,
          },
        },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-piecewise-map");
  });

  it.each([
    ["empty", []],
    ["fractional status", [1.5]],
    ["unknown status", [99]],
    ["bad changepoint count", [0, 1.5]],
    ["wrong success width", [0, 0, 1]],
    ["extra failure data", [8, 1]],
  ])("strictly rejects a malformed frame: %s", async (_label, frame) => {
    const adapter = makeWasmPiecewiseMapAdapter(() => moduleReturning(frame));

    const error = await Effect.runPromise(
      Effect.flip(
        adapter.fit(input, seasonalities, { mode: "explicit", timestamps: [2] }, 0.5, optimizer),
      ),
    );

    expect(error).toBeInstanceOf(FittingError);
    expect(error.reason).toBe("backend-failure");
    expect(error.backendPhase).toBe("protocol");
  });
});

type EndedSpanStatus = Extract<Tracer.SpanStatus, { readonly _tag: "Ended" }>;

const requireEnded = (span: Tracer.Span): EndedSpanStatus => {
  if (!Predicate.isTagged("Ended")(span.status)) {
    throw new Error(`Expected ${span.name} to have ended`);
  }

  return span.status;
};

describe("linear piecewise MAP tracing", () => {
  it("records complete fit and prediction boundaries under public spans", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const observations = Array.from({ length: 8 }, (_, index) => ({
      timestamp: new Date(Date.UTC(2024, 0, index + 1)).toISOString(),
      value: 1 + index * 0.4 + (index >= 4 ? 0.8 : 0) + (index % 2) * 0.05,
    }));

    await Effect.runPromise(
      Effect.gen(function* () {
        const model = yield* fit(observations, {
          map: { changepoints: { mode: "auto", count: 2, range: 0.8 } },
        }).pipe(Effect.provide(prophetFittingBackendLayer));

        yield* predict(model, ["2024-01-10T00:00:00.000Z"]);
      }).pipe(Effect.withSpan("forecast.job"), Effect.withTracer(tracer)),
    );

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
      expect(Exit.isSuccess(requireEnded(span).exit)).toBe(true);
      expect(Object.fromEntries(span.attributes)["effect_prophet.model.type"]).toBe(
        "linear-piecewise-map",
      );
    }

    expect(wasmSpans[0]?.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicFit.spanId);
    expect(wasmSpans[1]?.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicPredict.spanId);
  });

  it("marks non-convergence as a failed WASM boundary without replacing the typed error", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const observations = Array.from({ length: 8 }, (_, index) => ({
      timestamp: new Date(Date.UTC(2024, 0, index + 1)).toISOString(),
      value: 1 + index * 0.4 + (index >= 4 ? 0.8 : 0) + (index % 2) * 0.05,
    }));

    const error = await Effect.runPromise(
      Effect.flip(
        fit(observations, {
          map: {
            changepoints: { mode: "auto", count: 2, range: 0.8 },
            optimizer: { maxIterations: 1 },
          },
        }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
      ),
    );

    const wasmFit = spans.find((span) => span.name === "effect-prophet.wasm.fit");

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("non-convergence");
    }

    expect(wasmFit).toBeDefined();

    if (wasmFit !== undefined) {
      expect(Exit.isFailure(requireEnded(wasmFit).exit)).toBe(true);
    }
  });

  it("does not enter WASM when explicit changepoints are outside training bounds", async () => {
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
          { timestamp: "2024-01-01T00:00:00.000Z", value: 1 },
          { timestamp: "2024-01-02T00:00:00.000Z", value: 2 },
        ],
        {
          map: {
            changepoints: {
              mode: "explicit",
              timestamps: ["2023-12-01T00:00:00.000Z"],
            },
          },
        },
      ).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer), Effect.exit),
    );

    expect(spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(false);
  });
});
