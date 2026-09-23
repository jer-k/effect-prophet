import { Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { InputValidationError } from "../src/errors";
import { decodeFittedModel, encodeFittedModel } from "../src/model-serialization";
import { prophetFittingBackendLayer } from "../src/internal/prophet-fitting-backend";
import { fit, predict } from "../src/prophet";

const observations = [
  { timestamp: "2024-01-01T00:00:00.000Z", value: 1.2, capacity: 10 },
  { timestamp: "2024-01-02T00:00:00.000Z", value: 2.2, capacity: 10 },
  { timestamp: "2024-01-03T00:00:00.000Z", value: 4.2, capacity: 10 },
  { timestamp: "2024-01-04T00:00:00.000Z", value: 6.1, capacity: 10 },
  { timestamp: "2024-01-05T00:00:00.000Z", value: 7.6, capacity: 10 },
  { timestamp: "2024-01-06T00:00:00.000Z", value: 8.9, capacity: 10 },
] as const;

const timestamp = (day: number): string =>
  new Date(Date.parse("2024-01-01T00:00:00.000Z") + day * 86_400_000).toISOString();

const options = {
  growth: "logistic",
  map: {
    changepoints: { mode: "explicit", timestamps: [] },
  },
} as const;

describe("logistic MAP forecasting", () => {
  it("fits, predicts changing capacities, and survives serialization", async () => {
    const model = await Effect.runPromise(
      fit(observations, options).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("logistic-piecewise-map");

    if (model.model !== "logistic-piecewise-map") {
      throw new Error("Expected logistic MAP model");
    }

    expect(model.targetScaling.floorPolicy).toEqual({ kind: "implicit", floor: 0 });

    const rows = [
      { timestamp: "2024-01-07T00:00:00.000Z", capacity: 10 },
      { timestamp: "2024-01-07T00:00:00.000Z", capacity: 20 },
    ] as const;

    const before = await Effect.runPromise(predict(model, rows));
    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const restored = await Effect.runPromise(decodeFittedModel(encoded));
    const after = await Effect.runPromise(predict(restored, rows));

    expect(after).toEqual(before);
    expect(before[0]?.trend).toBeGreaterThan(0);
    expect(before[0]?.trend).toBeLessThan(10);
    expect(before[1]?.trend).toBeGreaterThan(before[0]?.trend ?? 0);
    expect(before[1]?.trend).toBeLessThan(20);
  });

  it("fits automatic changepoints with mixed seasonal, event, and regressor components", async () => {
    const mixedObservations = Array.from({ length: 21 }, (_, index) => {
      const trend = 100 / (1 + Math.exp(-6 * (index / 20 - 0.45)));
      const weekly = 0.08 * Math.sin((2 * Math.PI * index) / 7);
      const promotion = index % 2;

      return {
        timestamp: timestamp(index),
        value: trend * (1 + weekly) + 1.5 * promotion + (index === 8 ? 2 : 0),
        capacity: 100,
        regressors: { promotion },
      };
    });

    const model = await Effect.runPromise(
      fit(mixedObservations, {
        growth: "logistic",
        seasonalityMode: "multiplicative",
        seasonalities: [{ name: "weekly-wave", periodDays: 7, fourierOrder: 1 }],
        events: [{ name: "launch", date: timestamp(8).slice(0, 10) }],
        regressors: [{ name: "promotion", standardization: "never" }],
        map: { changepoints: { mode: "auto", count: 2, range: 0.8 } },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "logistic-piecewise-map") {
      throw new Error("Expected logistic MAP model");
    }

    expect(model.changepointTimestamps).toHaveLength(2);

    const [forecast] = await Effect.runPromise(
      predict(model, [
        {
          timestamp: timestamp(21),
          capacity: 110,
          regressors: { promotion: 1 },
        },
      ]),
    );

    expect(forecast).toBeDefined();
    expect(forecast?.seasonalities.map((component) => component.name)).toEqual(["weekly-wave"]);
    expect(forecast?.events.map((component) => component.name)).toEqual(["launch"]);
    expect(forecast?.regressors.map((component) => component.name)).toEqual(["promotion"]);
    expect(forecast?.value).toBeCloseTo(
      (forecast?.trend ?? 0) * (1 + (forecast?.multiplicative ?? 0)) + (forecast?.additive ?? 0),
      12,
    );
  });

  it("supports explicit row floors without clipping out-of-bound targets", async () => {
    const explicit = observations.map((row, index) => ({
      ...row,
      floor: -2 + index * 0.1,
      value: index === 0 ? 11 : row.value,
    }));

    const model = await Effect.runPromise(
      fit(explicit, options).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("logistic-piecewise-map");

    if (model.model !== "logistic-piecewise-map") {
      throw new Error("Expected logistic MAP model");
    }

    expect(model.targetScaling.floorPolicy).toEqual({ kind: "explicit" });

    const forecasts = await Effect.runPromise(
      predict(model, [{ timestamp: "2024-01-07T00:00:00.000Z", capacity: 12, floor: -1 }]),
    );

    expect(forecasts[0]?.trend).toBeGreaterThan(-1);
    expect(forecasts[0]?.trend).toBeLessThan(12);
  });

  it("records complete logistic WASM boundaries and skips them on validation failure", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (spanOptions) => {
        const span = new Tracer.NativeSpan(spanOptions);
        spans.push(span);

        return span;
      },
    });

    const model = await Effect.runPromise(
      fit(observations, options).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withTracer(tracer),
      ),
    );

    await Effect.runPromise(
      predict(model, [{ timestamp: "2024-01-07T00:00:00.000Z", capacity: 12 }]).pipe(
        Effect.withTracer(tracer),
      ),
    );

    const publicFit = spans.find((span) => span.name === "Prophet.fit");
    const publicPredict = spans.find((span) => span.name === "Prophet.predict");
    const wasmFit = spans.find((span) => span.name === "effect-prophet.wasm.fit");
    const wasmPredict = spans.find((span) => span.name === "effect-prophet.wasm.predict");

    if (
      publicFit === undefined ||
      publicPredict === undefined ||
      wasmFit === undefined ||
      wasmPredict === undefined
    ) {
      throw new Error("Expected complete logistic tracing boundaries");
    }

    expect(Object.fromEntries(wasmFit.attributes)["effect_prophet.model.type"]).toBe(
      "logistic-piecewise-map",
    );
    expect(wasmFit.traceId).toBe(publicFit.traceId);
    expect(wasmPredict.traceId).toBe(publicPredict.traceId);
    expect(wasmFit.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicFit.spanId);
    expect(wasmPredict.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicPredict.spanId);

    for (const [span, parent] of [
      [wasmFit, publicFit],
      [wasmPredict, publicPredict],
    ] as const) {
      if (
        !Predicate.isTagged("Ended")(span.status) ||
        !Predicate.isTagged("Ended")(parent.status)
      ) {
        throw new Error(`Expected ${span.name} and its parent to end`);
      }

      expect(Exit.isSuccess(span.status.exit)).toBe(true);
      expect(span.status.startTime).toBeGreaterThanOrEqual(parent.status.startTime);
      expect(span.status.endTime).toBeLessThanOrEqual(parent.status.endTime);
    }

    const boundaryCount = spans.filter((span) =>
      span.name.startsWith("effect-prophet.wasm."),
    ).length;

    await Effect.runPromise(
      Effect.flip(
        predict(model, [{ timestamp: "2024-01-08T00:00:00.000Z" }]).pipe(Effect.withTracer(tracer)),
      ),
    );

    expect(spans.filter((span) => span.name.startsWith("effect-prophet.wasm."))).toHaveLength(
      boundaryCount,
    );

    const collapse = observations.map((row) => ({ ...row, value: 5 }));
    await Effect.runPromise(
      Effect.flip(
        fit(collapse, options).pipe(
          Effect.provide(prophetFittingBackendLayer),
          Effect.withTracer(tracer),
        ),
      ),
    );

    const failedBoundary = spans.filter((span) => span.name === "effect-prophet.wasm.fit").at(-1);

    if (failedBoundary === undefined || !Predicate.isTagged("Ended")(failedBoundary.status)) {
      throw new Error("Expected a failed logistic WASM fit span");
    }

    expect(Exit.isFailure(failedBoundary.status.exit)).toBe(true);
  });

  it("rejects missing and extraneous bounds at public row boundaries", async () => {
    const missingCapacity = observations.map(({ capacity: _capacity, ...row }) => row);

    const fitError = await Effect.runPromise(
      Effect.flip(fit(missingCapacity, options).pipe(Effect.provide(prophetFittingBackendLayer))),
    );

    expect(fitError).toBeInstanceOf(InputValidationError);

    const nonlogisticError = await Effect.runPromise(
      Effect.flip(
        fit(observations, { growth: "linear" }).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(nonlogisticError).toBeInstanceOf(InputValidationError);
  });
});
