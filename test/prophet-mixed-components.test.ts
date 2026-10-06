import { Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
  ModelSerializationError,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  getRegressorCoefficients,
  predict,
  predictUncertainty,
  prophetFittingBackendLayer,
} from "../src/index";

const day = 86_400_000;

const start = Date.UTC(2025, 0, 1);

const timestamp = (index: number): string => new Date(start + index * day).toISOString();

const reconstruct = (forecast: {
  readonly trend: number;
  readonly additive: number;
  readonly multiplicative: number;
  readonly value: number;
}): void => {
  expect(forecast.value).toBeCloseTo(
    forecast.trend * (1 + forecast.multiplicative) + forecast.additive,
    10,
  );
};

describe("mixed component public lifecycle", () => {
  it("fits, predicts, inspects, and reloads mixed linear components", async () => {
    const observations = Array.from({ length: 28 }, (_, index) => {
      const trend = 20 + index * 0.35;
      const onSeason = index % 3 !== 0;
      const weeklyFactor = onSeason ? 0.18 * Math.sin((2 * Math.PI * index) / 7) : 0;
      const price = 8 + (index % 5);
      const launch = index === 12 ? 3 : 0;

      return {
        timestamp: timestamp(index),
        value: trend * (1 + weeklyFactor) + 0.7 * price + launch,
        conditions: { onSeason },
        regressors: { price },
      };
    });

    const model = await Effect.runPromise(
      fit(observations, {
        seasonalityMode: "multiplicative",
        holidaysMode: "additive",
        seasonalities: [
          {
            name: "weekly-relative",
            periodDays: 7,
            fourierOrder: 2,
            conditionName: "onSeason",
          },
        ],
        events: [{ name: "launch", date: "2025-01-13" }],
        regressors: [{ name: "price", mode: "additive", standardization: "always" }],
        map: { changepoints: { mode: "explicit", timestamps: [] } },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-piecewise-map");

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected linear MAP state");
    }

    expect(model.fitSummary.method).toBe("mixed-piecewise-map-stan-v2");
    expect(model.seasonalities.components[0]?.definition.mode).toBe("multiplicative");
    expect(model.events.mode).toBe("additive");
    expect(model.regressors[0]?.definition.mode).toBe("additive");

    const rows = [
      { timestamp: timestamp(28), conditions: { onSeason: true }, regressors: { price: 11 } },
      { timestamp: timestamp(12), conditions: { onSeason: false }, regressors: { price: 10 } },
    ];

    const forecasts = await Effect.runPromise(predict(model, rows));

    for (const forecast of forecasts) {
      reconstruct(forecast);
      expect(forecast.seasonalities[0]?.mode).toBe("multiplicative");
      expect(forecast.regressors[0]?.mode).toBe("additive");
      expect(forecast.events[0]?.mode).toBe("additive");
    }

    const seasonal = forecasts[0]?.seasonalities[0];

    if (seasonal?.mode !== "multiplicative") {
      throw new Error("Expected a multiplicative seasonal component");
    }

    expect(seasonal.contribution).toBeCloseTo(
      (forecasts[0]?.trend ?? Number.NaN) * seasonal.factor,
      12,
    );

    const gatedSeasonal = forecasts[1]?.seasonalities[0];
    expect(gatedSeasonal?.mode).toBe("multiplicative");

    if (gatedSeasonal?.mode === "multiplicative") {
      expect(gatedSeasonal.factor).toBeCloseTo(0, 15);
      expect(gatedSeasonal.contribution).toBeCloseTo(0, 15);
    }

    expect(getRegressorCoefficients(model)[0]?.mode).toBe("additive");

    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const restored = await Effect.runPromise(decodeFittedModel(encoded));
    const replay = await Effect.runPromise(predict(restored, rows));

    expect(replay).toEqual(forecasts);

    if (encoded.modelKind !== "linear-piecewise-map") {
      throw new Error("Expected encoded linear MAP state");
    }

    const invalidMode = {
      ...encoded,
      seasonalities: encoded.seasonalities.map((seasonality, index) =>
        index === 0 ? { ...seasonality, mode: "invalid" } : seasonality,
      ),
    };

    const invalidMethod = {
      ...encoded,
      fitSummary: { ...encoded.fitSummary, method: "piecewise-map-stan-v2" as const },
    };

    const modeError = await Effect.runPromise(Effect.flip(decodeFittedModel(invalidMode)));
    const methodError = await Effect.runPromise(Effect.flip(decodeFittedModel(invalidMethod)));

    expect(modeError).toBeInstanceOf(ModelSerializationError);
    expect(methodError).toBeInstanceOf(ModelSerializationError);
  });

  it("records mixed fit and prediction boundary spans", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const observations = Array.from({ length: 14 }, (_, index) => ({
      timestamp: timestamp(index),
      value: 20 * (1 + 0.1 * Math.sin((2 * Math.PI * index) / 7)),
    }));

    await Effect.runPromise(
      Effect.gen(function* () {
        const model = yield* fit(observations, {
          seasonalityMode: "multiplicative",
          seasonalities: [{ name: "relative-week", periodDays: 7, fourierOrder: 1 }],
          map: { changepoints: { mode: "explicit", timestamps: [] } },
        });

        yield* predict(model, [timestamp(14)]);
      }).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withSpan("mixed.forecast.job"),
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
      throw new Error("Expected complete mixed tracing boundaries");
    }

    expect(Object.fromEntries(wasmFit.attributes)["effect_prophet.component.mode"]).toBe("mixed");
    expect(Object.fromEntries(wasmPredict.attributes)["effect_prophet.component.mode"]).toBe(
      "mixed",
    );
    expect(wasmFit.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicFit.spanId);
    expect(wasmPredict.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicPredict.spanId);

    for (const span of [wasmFit, wasmPredict]) {
      if (!Predicate.isTagged("Ended")(span.status)) {
        throw new Error(`Expected ${span.name} to end`);
      }

      expect(Exit.isSuccess(span.status.exit)).toBe(true);
    }
  });

  it("supports mixed flat seasonalities, events, and regressors", async () => {
    const observations = Array.from({ length: 21 }, (_, index) => {
      const factor = 0.12 * Math.cos((2 * Math.PI * index) / 7);
      const promotion = index % 2;

      return {
        timestamp: timestamp(index),
        value: 30 * (1 + factor + promotion * 0.04) + (index === 7 ? 2 : 0),
        regressors: { promotion },
      };
    });

    const model = await Effect.runPromise(
      fit(observations, {
        growth: "flat",
        seasonalityMode: "multiplicative",
        holidaysMode: "additive",
        seasonalities: [{ name: "weekly-relative", periodDays: 7, fourierOrder: 2 }],
        events: [{ name: "campaign", date: "2025-01-08" }],
        regressors: [{ name: "promotion", standardization: "never" }],
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("flat-map");

    if (model.model !== "flat-map") {
      throw new Error("Expected flat MAP state");
    }

    expect(model.fitSummary.method).toBe("flat-map-stan-v1");

    const [forecast] = await Effect.runPromise(
      predict(model, [{ timestamp: timestamp(22), regressors: { promotion: 1 } }]),
    );

    if (forecast === undefined) {
      throw new Error("Expected one forecast");
    }

    reconstruct(forecast);
    expect(forecast.events[0]?.mode).toBe("additive");
    expect(forecast.regressors[0]?.mode).toBe("multiplicative");
    expect(getRegressorCoefficients(model)[0]?.mode).toBe("multiplicative");
  });

  describe("additive flat features", () => {
    const observations = Array.from({ length: 28 }, (_, index) => {
      const active = index % 3 !== 0;
      const weekly = active ? 1.5 * Math.sin((2 * Math.PI * index) / 7) : 0;
      const promotion = index % 2;

      return {
        timestamp: timestamp(index),
        value: 30 + weekly + 2 * promotion + (index === 7 ? 4 : 0) + 0.3 * Math.sin(index * 1.7),
        conditions: { active },
        regressors: { promotion },
      };
    });

    const options = {
      growth: "flat",
      seasonalities: [
        { name: "weekly-active", periodDays: 7, fourierOrder: 2, conditionName: "active" },
      ],
      events: [{ name: "campaign", date: "2025-01-08" }],
      regressors: [{ name: "promotion", standardization: "never" }],
    } as const;

    const rows = [
      { timestamp: timestamp(28), conditions: { active: true }, regressors: { promotion: 1 } },
      { timestamp: timestamp(29), conditions: { active: false }, regressors: { promotion: 0 } },
    ];

    it("fits, predicts, simulates, and reloads all-additive flat features", async () => {
      const model = await Effect.runPromise(
        fit(observations, options).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      if (model.model !== "flat-map") {
        throw new Error("Expected flat MAP state");
      }

      expect(model.fitSummary.method).toBe("flat-map-stan-v1");
      expect(model.seasonalities.components[0]?.definition.mode).toBe("additive");
      expect(model.events.mode).toBe("additive");
      expect(getRegressorCoefficients(model)[0]?.coefficient).toBeCloseTo(2, 0);

      const forecasts = await Effect.runPromise(predict(model, rows));

      for (const forecast of forecasts) {
        reconstruct(forecast);
        expect(forecast.multiplicative).toBe(0);
        expect(forecast.trend).toBeCloseTo(model.level + model.targetScaling.offset, 12);
      }

      expect(forecasts[1]?.seasonalities[0]).toEqual({
        name: "weekly-active",
        mode: "additive",
        value: 0,
      });

      const intervals = await Effect.runPromise(predictUncertainty(model, rows, { seed: 3 }));

      if (intervals.kind !== "intervals") {
        throw new Error("Expected interval output");
      }

      expect(intervals.rows.map((row) => row.trend.upper - row.trend.lower)).toEqual([0, 0]);

      for (const [index, row] of intervals.rows.entries()) {
        const value = forecasts[index]?.value ?? Number.NaN;

        expect(row.value.lower).toBeLessThan(value);
        expect(row.value.upper).toBeGreaterThan(value);
      }

      const encoded = await Effect.runPromise(encodeFittedModel(model));

      const restored = await Effect.runPromise(
        decodeFittedModel(JSON.parse(JSON.stringify(encoded))),
      );

      expect(await Effect.runPromise(predict(restored, rows))).toEqual(forecasts);

      if (encoded.modelKind !== "flat-map") {
        throw new Error("Expected encoded flat MAP state");
      }

      const reducedMethod = {
        ...encoded,
        fitSummary: { ...encoded.fitSummary, method: "flat-map-coordinate-v1" as const },
      };

      const methodError = await Effect.runPromise(Effect.flip(decodeFittedModel(reducedMethod)));

      expect(methodError).toBeInstanceOf(ModelSerializationError);
    });

    it("honors an explicit flat optimizer, as Prophet's fit(algorithm=...) does", async () => {
      const lbfgs = { algorithm: "lbfgs", fallback: "none" } as const;

      const featured = await Effect.runPromise(
        fit(observations, { ...options, map: { optimizer: lbfgs } }).pipe(
          Effect.provide(prophetFittingBackendLayer),
        ),
      );

      if (featured.model !== "flat-map" || featured.fitSummary.method !== "flat-map-stan-v1") {
        throw new Error("Expected a flat Stan fit");
      }

      expect(featured.fitSummary.optimization.algorithm).toBe("lbfgs");

      const seasonalOnly = {
        growth: "flat",
        seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 2 }],
      } as const;

      const history = observations.map(({ timestamp, value }) => ({ timestamp, value }));

      const [exact, requested] = await Effect.runPromise(
        Effect.all([
          fit(history, seasonalOnly),
          fit(history, { ...seasonalOnly, map: { optimizer: lbfgs } }),
        ]).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      expect(exact.fitSummary.method).toBe("flat-map-coordinate-v1");
      expect(requested.fitSummary.method).toBe("flat-map-stan-v1");

      const future = [timestamp(28), timestamp(29)];
      const exactForecasts = await Effect.runPromise(predict(exact, future));
      const requestedForecasts = await Effect.runPromise(predict(requested, future));

      for (const [index, forecast] of requestedForecasts.entries()) {
        expect(forecast.value).toBeCloseTo(exactForecasts[index]?.value ?? Number.NaN, 4);
      }
    });

    it("records additive flat fit and prediction boundary spans", async () => {
      const spans: Array<Tracer.Span> = [];

      const tracer = Tracer.make({
        span: (spanOptions) => {
          const span = new Tracer.NativeSpan(spanOptions);
          spans.push(span);

          return span;
        },
      });

      await Effect.runPromise(
        Effect.gen(function* () {
          const model = yield* fit(observations, options);

          yield* predict(model, rows);
        }).pipe(
          Effect.provide(prophetFittingBackendLayer),
          Effect.withSpan("flat.forecast.job"),
          Effect.withTracer(tracer),
        ),
      );

      const job = spans.find((span) => span.name === "flat.forecast.job");
      const publicFit = spans.find((span) => span.name === "Prophet.fit");
      const publicPredict = spans.find((span) => span.name === "Prophet.predict");
      const wasmFit = spans.find((span) => span.name === "effect-prophet.wasm.fit");
      const wasmPredict = spans.find((span) => span.name === "effect-prophet.wasm.predict");

      if (
        job === undefined ||
        publicFit === undefined ||
        publicPredict === undefined ||
        wasmFit === undefined ||
        wasmPredict === undefined
      ) {
        throw new Error("Expected complete additive flat tracing boundaries");
      }

      expect(Object.fromEntries(wasmFit.attributes)).toMatchObject({
        "effect_prophet.model.type": "flat-map",
        "effect_prophet.growth": "flat",
        "effect_prophet.component.mode": "additive",
        "effect_prophet.optimizer.requested_algorithm": "auto",
        "effect_prophet.optimizer.algorithm": "newton",
      });
      expect(Object.fromEntries(wasmPredict.attributes)["effect_prophet.component.mode"]).toBe(
        "additive",
      );
      expect(publicFit.parent.pipe(Option.getOrUndefined)?.spanId).toBe(job.spanId);
      expect(wasmFit.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicFit.spanId);
      expect(wasmPredict.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicPredict.spanId);

      for (const span of [publicFit, publicPredict, wasmFit, wasmPredict]) {
        expect(span.traceId).toBe(job.traceId);

        if (!Predicate.isTagged("Ended")(span.status)) {
          throw new Error(`Expected ${span.name} to end`);
        }

        expect(Exit.isSuccess(span.status.exit)).toBe(true);
      }

      for (const [child, parent] of [
        [wasmFit, publicFit],
        [wasmPredict, publicPredict],
      ] as const) {
        if (
          !Predicate.isTagged("Ended")(child.status) ||
          !Predicate.isTagged("Ended")(parent.status)
        ) {
          throw new Error("Expected ended spans");
        }

        expect(child.status.startTime).toBeGreaterThanOrEqual(parent.status.startTime);
        expect(child.status.endTime).toBeLessThanOrEqual(parent.status.endTime);
      }
    });
  });
});
