import { Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { PredictionError, fit, prophetFittingBackendLayer } from "../../src/index";
import { simulateMapWithWasm } from "../../src/internal/wasm-map-uncertainty-backend";

const observations = [
  { timestamp: "2025-01-01T00:00:00.000Z", value: 1 },
  { timestamp: "2025-01-02T00:00:00.000Z", value: 2 },
  { timestamp: "2025-01-03T00:00:00.000Z", value: 3 },
] as const;

const fixture = async () => {
  const model = await Effect.runPromise(
    fit(observations, { growth: "flat" }).pipe(Effect.provide(prophetFittingBackendLayer)),
  );

  if (model.model !== "flat-map") {
    throw new Error("Expected flat MAP state");
  }

  const timestamps = [Date.UTC(2025, 0, 4)];

  const masks = { rowCount: 1, componentCount: 0, values: new Uint8Array() };

  const features = {
    matrix: { rowCount: 1, columnCount: 0, values: new Float64Array() },
    layout: { components: [], coefficientCount: 0, priorScales: [] },
  };

  return { model, timestamps, masks, features };
};

describe("MAP uncertainty WASM adapter", () => {
  it("rejects malformed real-seam frames without accepting NaN or aliases", async () => {
    const { model, timestamps, masks, features } = await fixture();

    for (const frame of [
      new Float64Array([0, 1, 1, 2, 1]),
      new Float64Array([0, 0, 1, 2, 0, 1, Number.NaN, 2]),
      new Float64Array([0, 0, 1, 2, 2, 1, 0, 1]),
      new Float64Array([9]),
      new Float64Array([1, 0]),
      new Float64Array([3, 0]),
      new Float64Array([4, 1, 0]),
      new Float64Array([4, 0, 2]),
    ]) {
      const error = await Effect.runPromise(
        Effect.flip(
          simulateMapWithWasm(
            model,
            timestamps,
            masks,
            features,
            { seed: 42, samples: 2, intervalWidth: 0.8, output: "intervals" },
            () => ({
              simulate_map_with_features: () => frame,
              simulate_logistic_map_with_features: () => frame,
            }),
          ),
        ),
      );

      expect(error).toBeInstanceOf(PredictionError);

      if (error instanceof PredictionError) {
        expect(error.backendPhase).toBe("protocol");
      }
    }
  });

  it("preserves typed status failures and direct parentage through the adapter seam", async () => {
    const { model, timestamps, masks, features } = await fixture();
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    for (const [frame, reason] of [
      [new Float64Array([1]), "backend-failure"],
      [new Float64Array([2]), "invalid-model"],
      [new Float64Array([3]), "simulation-limit"],
      [new Float64Array([4, 0, 1]), "non-finite-forecast"],
    ] as const) {
      spans.length = 0;

      const error = await Effect.runPromise(
        Effect.flip(
          simulateMapWithWasm(
            model,
            timestamps,
            masks,
            features,
            { seed: 42, samples: 2, intervalWidth: 0.8, output: "intervals" },
            () => ({
              simulate_map_with_features: () => frame,
              simulate_logistic_map_with_features: () => frame,
            }),
          ).pipe(Effect.withSpan("forecast.job"), Effect.withTracer(tracer)),
        ),
      );

      expect(error).toBeInstanceOf(PredictionError);

      if (error instanceof PredictionError) {
        expect(error.reason).toBe(reason);
        expect(error.timestamp).toBe(timestamps[0]);
      }

      const boundary = spans.find((span) => span.name === "effect-prophet.wasm.simulate");
      const parent = spans.find((span) => span.name === "forecast.job");

      if (
        boundary === undefined ||
        parent === undefined ||
        !Predicate.isTagged("Ended")(boundary.status) ||
        !Predicate.isTagged("Ended")(parent.status)
      ) {
        throw new Error("Expected ended failed adapter spans");
      }

      expect(boundary.traceId).toBe(parent.traceId);
      expect(boundary.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);
      expect(Exit.isFailure(boundary.status.exit)).toBe(true);
      expect(Exit.isFailure(parent.status.exit)).toBe(true);
      expect(boundary.status.startTime).toBeGreaterThanOrEqual(parent.status.startTime);
      expect(boundary.status.endTime).toBeLessThanOrEqual(parent.status.endTime);
      expect(Object.fromEntries(boundary.attributes)).toEqual({
        "effect_prophet.operation": "simulate",
        "effect_prophet.backend.type": "rust-wasm",
        "effect_prophet.model.type": "flat-map",
        "effect_prophet.output.kind": "intervals",
        "effect_prophet.prediction.count": 1,
        "effect_prophet.sample.count": 2,
      });
    }
  });

  it("keeps original execute failure as a runtime-only cause", async () => {
    const { model, timestamps, masks, features } = await fixture();
    const cause = new Error("test-only generated binding failure");

    const error = await Effect.runPromise(
      Effect.flip(
        simulateMapWithWasm(
          model,
          timestamps,
          masks,
          features,
          { seed: 42, samples: 2, intervalWidth: 0.8, output: "samples" },
          () => ({
            simulate_map_with_features: () => {
              throw cause;
            },
            simulate_logistic_map_with_features: () => {
              throw cause;
            },
          }),
        ),
      ),
    );

    expect(error).toBeInstanceOf(PredictionError);

    if (error instanceof PredictionError) {
      expect(error.backendPhase).toBe("execute");
      expect(error.cause).toBe(cause);
      expect(Object.keys(error)).not.toContain("cause");
    }
  });

  it("keeps original load failures in a completed failed child span", async () => {
    const { model, timestamps, masks, features } = await fixture();

    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const cause = new Error("test-only loader failure");

    const error = await Effect.runPromise(
      Effect.flip(
        simulateMapWithWasm(
          model,
          timestamps,
          masks,
          features,
          { seed: 42, samples: 2, intervalWidth: 0.8, output: "intervals" },
          () => {
            throw cause;
          },
        ).pipe(Effect.withSpan("forecast.job"), Effect.withTracer(tracer)),
      ),
    );

    expect(error).toBeInstanceOf(PredictionError);

    if (error instanceof PredictionError) {
      expect(error.backendPhase).toBe("load");
      expect(error.cause).toBe(cause);
    }

    const boundary = spans.find((span) => span.name === "effect-prophet.wasm.simulate");
    const parent = spans.find((span) => span.name === "forecast.job");

    if (
      boundary === undefined ||
      parent === undefined ||
      !Predicate.isTagged("Ended")(boundary.status) ||
      !Predicate.isTagged("Ended")(parent.status)
    ) {
      throw new Error("Expected ended simulation and caller spans");
    }

    expect(boundary.traceId).toBe(parent.traceId);
    expect(boundary.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);
    expect(Exit.isFailure(boundary.status.exit)).toBe(true);
    expect(boundary.status.startTime).toBeGreaterThanOrEqual(parent.status.startTime);
    expect(boundary.status.endTime).toBeLessThanOrEqual(parent.status.endTime);
    expect(Object.fromEntries(boundary.attributes)).not.toHaveProperty("seed");
  });
});
