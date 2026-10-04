import { Cause, Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError, InputValidationError, PredictionError } from "../src/errors";
import { parseLogisticMapModel } from "../src/fitted-model";
import { decodeFittedModel, encodeFittedModel } from "../src/model-serialization";
import { prophetFittingBackendLayer } from "../src/internal/prophet-fitting-backend";
import { fit, predict, predictUncertainty } from "../src/prophet";
import { requireEndedSpan } from "./internal/tracing-test-helpers";

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

    expect(model.targetScaling.floorPolicy).toEqual({
      kind: "implicit",
      floor: 0,
    });

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
        builtInSeasonalities: { yearly: "off", weekly: "off", daily: "off" },
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

    const degenerate = observations.map((row) => ({
      ...row,
      timestamp: observations[0].timestamp,
    }));

    await Effect.runPromise(
      Effect.flip(
        fit(degenerate, options).pipe(
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

  it("traces singular Stan prediction failures without poisoning earlier rows", async () => {
    const fitted = await Effect.runPromise(
      fit(observations, options).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (fitted.model !== "logistic-piecewise-map") throw new Error("Expected logistic MAP");

    const change = fitted.timeOrigin + fitted.timeScale / 2;

    const model = await Effect.runPromise(
      parseLogisticMapModel({
        ...fitted,
        rate: 2,
        offset: 0.4,
        changepointTimestamps: [change],
        deltas: [-2],
      }),
    );

    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (spanOptions) => {
        const span = new Tracer.NativeSpan(spanOptions);
        spans.push(span);

        return span;
      },
    });

    const before = [{ timestamp: timestamp(0), capacity: 10 }];
    const atChange = [{ timestamp: new Date(change).toISOString(), capacity: 10 }];

    await Effect.runPromise(predict(model, before).pipe(Effect.withTracer(tracer)));
    await Effect.runPromise(
      predictUncertainty(model, before, { seed: 19, samples: 2 }).pipe(Effect.withTracer(tracer)),
    );

    for (const [boundaryName, operation] of [
      ["effect-prophet.wasm.predict", predict(model, [...before, ...atChange]).pipe(Effect.asVoid)],
      [
        "effect-prophet.wasm.simulate",
        predictUncertainty(model, [...before, ...atChange], { seed: 19, samples: 2 }).pipe(
          Effect.asVoid,
        ),
      ],
    ] as const) {
      const failure = await Effect.runPromise(
        Effect.flip(operation.pipe(Effect.withTracer(tracer))),
      );

      expect(failure).toBeInstanceOf(PredictionError);
      expect(failure).toMatchObject({ reason: "non-finite-forecast", timestamp: change });

      const boundaries = spans.filter((span) => span.name === boundaryName);
      expect(boundaries).toHaveLength(2);

      for (const [index, boundary] of boundaries.entries()) {
        const parent = spans.find(
          (span) => span.spanId === Option.getOrUndefined(boundary.parent)?.spanId,
        );

        if (parent === undefined) throw new Error("Expected a direct public parent");
        const status = requireEndedSpan(boundary);
        const parentStatus = requireEndedSpan(parent);

        expect(parent.name).toBe(
          boundaryName.endsWith("predict") ? "Prophet.predict" : "Prophet.predictUncertainty",
        );
        expect(boundary.traceId).toBe(parent.traceId);
        expect(Object.fromEntries(boundary.attributes)).toEqual({
          "effect_prophet.operation": boundaryName.endsWith("predict") ? "predict" : "simulate",
          "effect_prophet.backend.type": "rust-wasm",
          "effect_prophet.model.type": "logistic-piecewise-map",
          "effect_prophet.prediction.count": index === 0 ? 1 : 2,
          ...(boundaryName.endsWith("simulate")
            ? { "effect_prophet.output.kind": "intervals", "effect_prophet.sample.count": 2 }
            : { "effect_prophet.scaling.mode": "absmax", "effect_prophet.seasonality.count": 0 }),
        });
        expect(status.startTime).toBeGreaterThanOrEqual(parentStatus.startTime);
        expect(status.endTime).toBeLessThanOrEqual(parentStatus.endTime);
        expect(Exit.isSuccess(status.exit)).toBe(index === 0);
        expect(Exit.isSuccess(parentStatus.exit)).toBe(index === 0);

        if (Exit.isFailure(status.exit)) {
          expect(Option.getOrUndefined(Cause.findErrorOption(status.exit.cause))).toBe(failure);
        }
      }
    }

    const count = spans.filter((span) => span.name.startsWith("effect-prophet.wasm.")).length;
    expect(await Effect.runPromise(predict(model, []).pipe(Effect.withTracer(tracer)))).toEqual([]);

    const invalid = await Effect.runPromise(
      Effect.flip(
        predict(model, [{ timestamp: timestamp(0), capacity: 0 }]).pipe(Effect.withTracer(tracer)),
      ),
    );

    expect(invalid).toBeInstanceOf(InputValidationError);
    expect(spans.filter((span) => span.name.startsWith("effect-prophet.wasm."))).toHaveLength(
      count,
    );
  });

  it("fits a two-row history with honest finite one-step completion", async () => {
    const model = await Effect.runPromise(
      fit([observations[0], observations[1]], {
        ...options,
        map: { ...options.map, optimizer: { algorithm: "newton", maxIterations: 1 } },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "logistic-piecewise-map") throw new Error("Expected logistic MAP");
    expect(model.fitSummary).toMatchObject({
      method: "logistic-piecewise-map-stan-v2",
      observationCount: 2,
      termination: "iteration-limit",
      iterations: 1,
    });
    expect(
      await Effect.runPromise(predict(model, [{ timestamp: timestamp(2), capacity: 10 }])),
    ).toHaveLength(1);
  });

  it.each([
    ["single row", [observations[0]], "insufficient-observations", false],
    [
      "zero time range",
      observations.map((row) => ({ ...row, timestamp: observations[0].timestamp })),
      "degenerate-observations",
      true,
    ],
  ] as const)(
    "rejects %s with a typed fitting failure",
    async (_label, history, reason, boundaryExpected) => {
      const spans: Array<Tracer.Span> = [];

      const tracer = Tracer.make({
        span: (spanOptions) => {
          const span = new Tracer.NativeSpan(spanOptions);
          spans.push(span);

          return span;
        },
      });

      const failure = await Effect.runPromise(
        Effect.flip(
          fit(history, options).pipe(
            Effect.provide(prophetFittingBackendLayer),
            Effect.withTracer(tracer),
          ),
        ),
      );

      expect(failure).toBeInstanceOf(FittingError);
      expect(failure).toMatchObject({ reason });
      expect(spans.filter((span) => span.name === "effect-prophet.wasm.fit")).toHaveLength(
        boundaryExpected ? 1 : 0,
      );
    },
  );

  it.each([
    [
      "partially supplied capacities",
      observations.map((row, index) =>
        index === 1 ? { timestamp: row.timestamp, value: row.value } : row,
      ),
    ],
    [
      "partially supplied floors",
      observations.map((row, index) => (index === 1 ? row : { ...row, floor: -1 })),
    ],
    ["capacity equal to implicit floor", observations.map((row) => ({ ...row, capacity: 0 }))],
    [
      "capacity equal to explicit floor",
      observations.map((row) => ({ ...row, floor: row.capacity })),
    ],
    [
      "capacity below explicit floor",
      observations.map((row) => ({ ...row, floor: row.capacity + 1 })),
    ],
    [
      "nonfinite capacities",
      observations.map((row) => ({ ...row, capacity: Number.POSITIVE_INFINITY })),
    ],
    ["nonfinite floors", observations.map((row) => ({ ...row, floor: Number.NaN }))],
  ])("rejects %s before the WASM boundary", async (_label, history) => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (spanOptions) => {
        const span = new Tracer.NativeSpan(spanOptions);
        spans.push(span);

        return span;
      },
    });

    const failure = await Effect.runPromise(
      Effect.flip(
        fit(history, options).pipe(
          Effect.provide(prophetFittingBackendLayer),
          Effect.withTracer(tracer),
        ),
      ),
    );

    expect(failure).toBeInstanceOf(InputValidationError);
    expect(spans.some((span) => span.name.startsWith("effect-prophet.wasm."))).toBe(false);
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
