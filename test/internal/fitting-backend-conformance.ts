import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError, type UnsupportedConfigurationError } from "../../src/errors";
import {
  FittingBackend,
  type FitOptions,
  type LinearParameters,
  type Parameters,
  type TrainingInput,
} from "../../src/internal/fitting-backend";
import * as Seasonality from "../../src/seasonality";

/**
 * Absolute tolerance for coefficients fitted from small normalized fixtures.
 *
 * JS and WASM may differ in final floating-point bits, so the contract requires
 * agreement near double-precision rounding rather than bit-for-bit equality.
 */
const parameterTolerance = 1e-12;

/** Forecast tolerance allows coefficient rounding to accumulate during evaluation. */
const forecastTolerance = 1e-11;

const linearOptions: FitOptions = {
  growth: "linear",
  seasonalities: Effect.runSync(Seasonality.makeSeasonalityLayout([])),
};

const makeInput = (
  timestamps: ReadonlyArray<number>,
  values: ReadonlyArray<number>,
): TrainingInput => ({
  timestamps: new Float64Array(timestamps),
  values: new Float64Array(values),
});

const fitWith = (
  layer: Layer.Layer<FittingBackend>,
  input: TrainingInput,
): Effect.Effect<Parameters, FittingError | UnsupportedConfigurationError> =>
  Effect.gen(function* () {
    const backend = yield* FittingBackend;

    return yield* backend.fit(input, linearOptions);
  }).pipe(Effect.provide(layer));

const requireLinearParameters = (parameters: Parameters): LinearParameters => {
  expect(parameters.model).toBe("linear-trend");

  if (parameters.model !== "linear-trend") {
    throw new Error(`Expected linear-trend parameters, received ${parameters.model}`);
  }

  return parameters;
};

const evaluateContract = (parameters: LinearParameters, timestamp: number): number =>
  parameters.intercept +
  parameters.slope * ((timestamp - parameters.timeOrigin) / parameters.timeScale);

const expectFailure = async (
  layer: Layer.Layer<FittingBackend>,
  input: TrainingInput,
): Promise<FittingError> => {
  const error = await Effect.runPromise(Effect.flip(fitWith(layer, input)));

  if (error instanceof FittingError) {
    return error;
  }

  throw new Error(`Linear growth unexpectedly failed with ${error._tag}`);
};

/**
 * Register the behavior required of every linear fitting backend.
 *
 * Implementations may choose their language, summation strategy, and internal
 * representation. They must return the documented scaled-time equation,
 * deterministic finite output, and equivalent typed failures.
 *
 * @param backendName - Human-readable implementation name used in test output.
 * @param layer - Layer providing the backend implementation under test.
 */
export const registerFittingBackendConformance = (
  backendName: string,
  layer: Layer.Layer<FittingBackend>,
): void => {
  describe(`${backendName} fitting backend conformance`, () => {
    it("fits known linear data and returns reusable scaling metadata", async () => {
      const base = 1_704_067_200_000;

      const parameters = requireLinearParameters(
        await Effect.runPromise(
          fitWith(layer, makeInput([base, base + 1_000, base + 2_000], [2, 5, 8])),
        ),
      );

      expect(Math.abs(parameters.intercept - 2)).toBeLessThanOrEqual(parameterTolerance);
      expect(Math.abs(parameters.slope - 6)).toBeLessThanOrEqual(parameterTolerance);
      expect(parameters.timeOrigin).toBe(base);
      expect(parameters.timeScale).toBe(2_000);
      expect(Math.abs(evaluateContract(parameters, base + 3_000) - 11)).toBeLessThanOrEqual(
        forecastTolerance,
      );
    });

    it("returns deterministic parameters for repeated fits", async () => {
      const input = makeInput([0, 1, 2, 3], [1.1, 2.9, 5.2, 6.8]);
      const first = await Effect.runPromise(fitWith(layer, input));
      const second = await Effect.runPromise(fitWith(layer, input));

      expect(second).toEqual(first);
    });

    it("reports zero time variance as degenerate observations", async () => {
      const error = await expectFailure(layer, makeInput([1, 1, 1], [3, 4, 5]));

      expect(error).toBeInstanceOf(FittingError);
      expect(error._tag).toBe("FittingError");
      expect(error.reason).toBe("degenerate-observations");
      expect(error.observationCount).toBe(3);
      expect(error.message.length).toBeGreaterThan(0);
    });

    it("prevents non-finite coefficients from escaping", async () => {
      const error = await expectFailure(
        layer,
        makeInput([0, 1], [-Number.MAX_VALUE, Number.MAX_VALUE]),
      );

      expect(error._tag).toBe("FittingError");
      expect(error.reason).toBe("degenerate-observations");
      expect(error.observationCount).toBe(2);
      expect(error.message.length).toBeGreaterThan(0);
    });

    it.each([
      {
        name: "insufficient observations",
        input: makeInput([], []),
        reason: "insufficient-observations" as const,
        observationCount: 0,
      },
      {
        name: "mismatched packed lengths",
        input: makeInput([1, 2], [3, 4, 5]),
        reason: "backend-failure" as const,
        observationCount: 3,
      },
      {
        name: "non-finite timestamps",
        input: makeInput([1, Number.POSITIVE_INFINITY], [3, 4]),
        reason: "backend-failure" as const,
        observationCount: 2,
      },
      {
        name: "non-finite values",
        input: makeInput([1, 2], [3, Number.NaN]),
        reason: "backend-failure" as const,
        observationCount: 2,
      },
    ])("returns structured diagnostics for $name", async ({ input, reason, observationCount }) => {
      const error = await expectFailure(layer, input);

      expect(error._tag).toBe("FittingError");
      expect(error.reason).toBe(reason);
      expect(error.observationCount).toBe(observationCount);
      expect(error.message.length).toBeGreaterThan(0);
    });
  });
};
