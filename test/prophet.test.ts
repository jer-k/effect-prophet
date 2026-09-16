import { Effect, Result } from "effect";
import { describe, expect, expectTypeOf, it } from "vitest";

import {
  FittingError,
  InputValidationError,
  PredictionError,
  fit,
  predict,
  prophetFittingBackendLayer,
  type FittedProphet,
} from "../src/index";
import { parseLinearModel, type LinearParameters } from "../src/fitted-model";
import { FitPlan, FittingBackend } from "../src/internal/fitting-backend";
import { makeTestFittingBackend } from "./internal/fitting-backend-test-layer";

const observations = [
  { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
  { timestamp: "2024-01-01T00:00:01.000Z", value: 5 },
  { timestamp: "2024-01-01T00:00:02.000Z", value: 8 },
] as const;

const predictionTimestamps = ["2024-01-01T00:00:03.000Z", "2024-01-01T00:00:04.000Z"] as const;

// Twelve decimal places are strict for this normalized exact-line fixture while allowing rounding.
const linearForecastPrecisionDigits = 12;

describe("linear-trend Prophet integration", () => {
  it("exposes validation and numerical failures precisely", () => {
    expectTypeOf(fit(observations)).toEqualTypeOf<
      Effect.Effect<FittedProphet, InputValidationError | FittingError, FittingBackend>
    >();
  });

  it("fits through the TypeScript Layer and predicts trend forecasts", async () => {
    const model = await Effect.runPromise(
      fit(observations).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const forecasts = await Effect.runPromise(predict(model, predictionTimestamps));

    expect(model).toEqual({
      model: "linear-trend",
      intercept: 2,
      slope: 6,
      timeOrigin: 1_704_067_200_000,
      timeScale: 2_000,
    });
    expect(Object.isFrozen(model)).toBe(true);
    expect(forecasts).toHaveLength(2);
    expect(forecasts[0]?.timestamp).toBe(1_704_067_203_000);
    expect(forecasts[0]?.value).toBeCloseTo(11, linearForecastPrecisionDigits);
    expect(forecasts[0]?.trend).toBeCloseTo(11, linearForecastPrecisionDigits);
    expect(forecasts[1]?.timestamp).toBe(1_704_067_204_000);
    expect(forecasts[1]?.value).toBeCloseTo(14, linearForecastPrecisionDigits);
    expect(forecasts[1]?.trend).toBeCloseTo(14, linearForecastPrecisionDigits);
  });

  it("uses exactly the origin and scale returned by the backend", async () => {
    const testBackend = makeTestFittingBackend(
      Result.succeed({
        model: "linear-trend",
        intercept: 10,
        slope: 4,
        timeOrigin: 1_704_067_199_000,
        timeScale: 4_000,
      }),
    );

    const model = await Effect.runPromise(
      fit(observations).pipe(Effect.provide(testBackend.layer)),
    );

    const [forecast] = await Effect.runPromise(predict(model, [predictionTimestamps[0]]));

    expect(forecast).toEqual({
      timestamp: 1_704_067_203_000,
      value: 14,
      trend: 14,
      additive: 0,
      seasonalities: [],
    });
    expect(testBackend.invocations).toEqual([
      {
        input: {
          timestamps: new Float64Array([1_704_067_200_000, 1_704_067_201_000, 1_704_067_202_000]),
          values: new Float64Array([2, 5, 8]),
        },
        options: FitPlan.LinearTrend(),
      },
    ]);
  });

  it("routes explicit flat growth to the provisional constant-mean baseline", async () => {
    const model = await Effect.runPromise(
      fit(observations, { growth: "flat" }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const [forecast] = await Effect.runPromise(predict(model, [predictionTimestamps[0]]));

    expect(model).toEqual({ model: "constant-mean-baseline", level: 5 });
    expect(Object.isFrozen(model)).toBe(true);
    expect(forecast).toEqual({
      timestamp: 1_704_067_203_000,
      value: 5,
      trend: 5,
      additive: 0,
      seasonalities: [],
    });
  });

  it("rejects invalid observations before executing the backend", async () => {
    const testBackend = makeTestFittingBackend(
      Result.succeed({
        model: "linear-trend",
        intercept: 0,
        slope: 1,
        timeOrigin: 0,
        timeScale: 1,
      }),
    );

    const program = fit([{ timestamp: "not-a-timestamp", value: 1 }]).pipe(
      Effect.provide(testBackend.layer),
    );

    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBeInstanceOf(InputValidationError);

    if (error instanceof InputValidationError) {
      expect(error.input).toBe("observations");
    }

    expect(testBackend.invocations).toHaveLength(0);
  });

  it("rejects invalid options before executing the backend", async () => {
    const testBackend = makeTestFittingBackend(
      Result.succeed({
        model: "linear-trend",
        intercept: 0,
        slope: 1,
        timeOrigin: 0,
        timeScale: 1,
      }),
    );

    // @ts-expect-error -- Invalid JavaScript input still exercises runtime option parsing.
    const program = fit(observations, { growth: "logistic" }).pipe(
      Effect.provide(testBackend.layer),
    );

    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBeInstanceOf(InputValidationError);

    if (error instanceof InputValidationError) {
      expect(error.input).toBe("options");
    }

    expect(testBackend.invocations).toHaveLength(0);
  });

  it("maps insufficient data from the linear kernel to a fitting error", async () => {
    const program = fit([{ timestamp: "2024-01-01T00:00:00.000Z", value: 2 }]).pipe(
      Effect.provide(prophetFittingBackendLayer),
    );

    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("insufficient-observations");
      expect(error.observationCount).toBe(1);
    }
  });

  it("maps non-finite numerical results to degenerate observations", async () => {
    const extremeObservations = [
      { timestamp: "2024-01-01T00:00:00.000Z", value: -Number.MAX_VALUE },
      { timestamp: "2024-01-01T00:00:01.000Z", value: Number.MAX_VALUE },
    ] as const;

    const program = fit(extremeObservations).pipe(Effect.provide(prophetFittingBackendLayer));

    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("degenerate-observations");
      expect(error.observationCount).toBe(2);
    }
  });

  it("preserves fitting backend failures", async () => {
    const fittingError = new FittingError({
      reason: "backend-failure",
      observationCount: observations.length,
      message: "Controlled end-to-end fitting failure",
    });

    const testBackend = makeTestFittingBackend(Result.fail(fittingError));
    const program = fit(observations).pipe(Effect.provide(testBackend.layer));
    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBe(fittingError);
  });

  it("rejects invalid parameters returned by a backend", async () => {
    const testBackend = makeTestFittingBackend(
      Result.succeed({
        model: "linear-trend",
        intercept: 0,
        slope: 1,
        timeOrigin: 0,
        timeScale: 0,
      }),
    );

    const program = fit(observations).pipe(Effect.provide(testBackend.layer));
    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("backend-failure");
    }
  });

  it("rejects invalid prediction timestamps", async () => {
    const model = await Effect.runPromise(
      fit(observations).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const error = await Effect.runPromise(Effect.flip(predict(model, ["not-a-timestamp"])));

    expect(error).toBeInstanceOf(InputValidationError);

    if (error instanceof InputValidationError) {
      expect(error.input).toBe("prediction-timestamps");
    }
  });

  it("rejects an invalid fitted model through the prediction error channel", async () => {
    const invalidModel: LinearParameters = {
      model: "linear-trend",
      intercept: Number.NaN,
      slope: 1,
      timeOrigin: 1_704_067_200_000,
      timeScale: 1_000,
    };

    const error = await Effect.runPromise(
      // @ts-expect-error -- A plain backend record deliberately exercises the JavaScript runtime boundary.
      Effect.flip(predict(invalidModel, [predictionTimestamps[0]])),
    );

    expect(error).toBeInstanceOf(PredictionError);

    if (error instanceof PredictionError) {
      expect(error.reason).toBe("invalid-model");
      expect(error.timestamp).toBe(1_704_067_203_000);
    }
  });

  it("rejects a non-finite forecast through the prediction error channel", async () => {
    const model = Effect.runSync(
      parseLinearModel({
        model: "linear-trend",
        intercept: 0,
        slope: Number.MAX_VALUE,
        timeOrigin: 1_704_067_200_000,
        timeScale: 1,
      }),
    );

    const error = await Effect.runPromise(
      Effect.flip(predict(model, ["2024-01-01T00:00:00.002Z"])),
    );

    expect(error).toBeInstanceOf(PredictionError);

    if (error instanceof PredictionError) {
      expect(error.reason).toBe("non-finite-forecast");
      expect(error.timestamp).toBe(1_704_067_200_002);
    }
  });
});

const DAY = 86_400_000;

const syntheticValue = (timestamp: number): number => {
  const epochDays = timestamp / DAY;
  const trend = 4 + 0.05 * epochDays;
  const daily = 2 * Math.sin(2 * Math.PI * epochDays);
  const weekly = 3 * Math.cos((2 * Math.PI * epochDays) / 7);

  return trend + daily + weekly;
};

const syntheticStart = Date.parse("2024-01-01T00:00:00.000Z");

const syntheticObservations = Array.from({ length: 56 }, (_, index) => {
  const timestamp = syntheticStart + index * (DAY / 4);

  return {
    timestamp: new Date(timestamp).toISOString(),
    value: syntheticValue(timestamp),
  };
});

const additiveOptions = {
  seasonalities: [
    { name: "daily-custom", periodDays: 1, fourierOrder: 1, priorScale: 1_000 },
    { name: "weekly-custom", periodDays: 7, fourierOrder: 1, priorScale: 1_000 },
  ],
} as const;

describe("linear-additive Prophet integration", () => {
  it("fits multiple components and forecasts held-out timestamps through real WASM", async () => {
    const model = await Effect.runPromise(
      fit(syntheticObservations, additiveOptions).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-additive-ridge");

    if (model.model !== "linear-additive-ridge") {
      throw new Error("Expected a linear-additive-ridge model");
    }

    expect(model.seasonalities.components.map((component) => component.definition.name)).toEqual([
      "daily-custom",
      "weekly-custom",
    ]);
    expect(model.fitSummary.method).toBe("normalized-ridge-v1");
    expect(Number.isFinite(model.fitSummary.penalizedObjective)).toBe(true);

    const heldOutTimestamps = [
      syntheticStart + 56 * (DAY / 4),
      syntheticStart + 57 * (DAY / 4),
      syntheticStart + 56 * (DAY / 4),
    ];

    const encodedTimestamps = heldOutTimestamps.map((timestamp) =>
      new Date(timestamp).toISOString(),
    );

    const forecasts = await Effect.runPromise(predict(model, encodedTimestamps));

    expect(forecasts.map((forecast) => forecast.timestamp)).toEqual(heldOutTimestamps);

    for (const [index, forecast] of forecasts.entries()) {
      const expected = heldOutTimestamps[index];

      expect(expected).toBeDefined();

      if (expected === undefined) {
        continue;
      }

      expect(forecast.seasonalities.map((component) => component.name)).toEqual([
        "daily-custom",
        "weekly-custom",
      ]);
      expect(forecast.additive).toBeCloseTo(
        forecast.seasonalities.reduce((sum, component) => sum + component.value, 0),
        10,
      );
      expect(forecast.value).toBeCloseTo(forecast.trend + forecast.additive, 10);
      expect(forecast.value).toBeCloseTo(syntheticValue(expected), 3);
    }

    expect(forecasts[2]).toEqual(forecasts[0]);
  });
});
