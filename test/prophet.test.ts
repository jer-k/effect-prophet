import { Effect, Result } from "effect";
import { describe, expect, it } from "vitest";

import {
  FittingError,
  InputValidationError,
  PredictionError,
  constantMeanFittingBackendLayer,
  fit,
  predict,
  type FittedProphet,
} from "../src/index";
import { makeTestFittingBackend } from "./internal/fitting-backend-test-layer";

const observations = [
  { timestamp: "2024-01-01T00:00:00.000Z", value: 0.1 },
  { timestamp: "2024-01-01T00:00:01.000Z", value: 0.2 },
] as const;

const predictionTimestamps = ["2024-01-01T00:00:02.000Z", "2024-01-01T00:00:03.000Z"] as const;

// Twelve decimal places tolerate representation noise while remaining strict for this baseline.
const constantForecastPrecisionDigits = 12;

describe("constant-mean Prophet vertical slice", () => {
  it("fits through the TypeScript Layer and predicts the training mean", async () => {
    const model = await Effect.runPromise(
      fit(observations).pipe(Effect.provide(constantMeanFittingBackendLayer)),
    );

    const forecasts = await Effect.runPromise(predict(model, predictionTimestamps));

    expect(model.model).toBe("constant-mean-baseline");
    expect(model.level).toBeCloseTo(0.15, constantForecastPrecisionDigits);
    expect(forecasts).toHaveLength(2);
    expect(forecasts[0]).toEqual({
      timestamp: 1_704_067_202_000,
      value: model.level,
    });
    expect(forecasts[1]).toEqual({
      timestamp: 1_704_067_203_000,
      value: model.level,
    });
  });

  it("substitutes the controlled test Layer and passes one packed fit operation", async () => {
    const testBackend = makeTestFittingBackend(Result.succeed({ level: 42 }));

    const model = await Effect.runPromise(
      fit(observations).pipe(Effect.provide(testBackend.layer)),
    );

    expect(model).toEqual({
      model: "constant-mean-baseline",
      level: 42,
    });
    expect(testBackend.invocations).toEqual([
      {
        input: {
          timestamps: new Float64Array([1_704_067_200_000, 1_704_067_201_000]),
          values: new Float64Array([0.1, 0.2]),
        },
        options: { growth: "linear" },
      },
    ]);
  });

  it("rejects invalid observations before executing the backend", async () => {
    const testBackend = makeTestFittingBackend(Result.succeed({ level: 42 }));

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
    const testBackend = makeTestFittingBackend(Result.succeed({ level: 42 }));

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

  it("rejects non-finite parameters returned by a backend", async () => {
    const testBackend = makeTestFittingBackend(Result.succeed({ level: Number.POSITIVE_INFINITY }));

    const program = fit(observations).pipe(Effect.provide(testBackend.layer));

    const error = await Effect.runPromise(Effect.flip(program));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("backend-failure");
    }
  });

  it("rejects invalid prediction timestamps", async () => {
    const model = await Effect.runPromise(
      fit(observations).pipe(Effect.provide(constantMeanFittingBackendLayer)),
    );

    const error = await Effect.runPromise(Effect.flip(predict(model, ["not-a-timestamp"])));

    expect(error).toBeInstanceOf(InputValidationError);

    if (error instanceof InputValidationError) {
      expect(error.input).toBe("prediction-timestamps");
    }
  });

  it("rejects a non-finite fitted model through the prediction error channel", async () => {
    const invalidModel: FittedProphet = {
      model: "constant-mean-baseline",
      level: Number.NaN,
    };

    const error = await Effect.runPromise(
      Effect.flip(predict(invalidModel, [predictionTimestamps[0]])),
    );

    expect(error).toBeInstanceOf(PredictionError);

    if (error instanceof PredictionError) {
      expect(error.reason).toBe("invalid-model");
      expect(error.timestamp).toBe(1_704_067_202_000);
    }
  });
});
