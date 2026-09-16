import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError } from "../../src/errors";
import {
  parseLinearAdditiveModel,
  type FittedLinearAdditiveProphet,
  type Parameters as FittedParameters,
} from "../../src/fitted-model";
import type { TrainingInput } from "../../src/internal/fitting-backend";
import type { AdditivePredictionBatch } from "../../src/internal/wasm-additive-backend";
import * as Seasonality from "../../src/seasonality";

const DAY = 86_400_000;

const tolerance = 1e-10;

const makeInput = (
  timestamps: ReadonlyArray<number>,
  values: ReadonlyArray<number>,
): TrainingInput => ({
  timestamps: new Float64Array(timestamps),
  values: new Float64Array(values),
});

const makeLayout = (input: Parameters<typeof Seasonality.parseSeasonalities>[0]) => {
  const definitions = Effect.runSync(Seasonality.parseSeasonalities(input));

  return Effect.runSync(Seasonality.makeSeasonalityLayout(definitions));
};

type FitAdditive = (
  input: TrainingInput,
  seasonalities: Seasonality.SeasonalityLayout,
) => Effect.Effect<FittedParameters, FittingError>;

const fitWith = (
  fit: FitAdditive,
  input: TrainingInput,
  seasonalities: Seasonality.SeasonalityLayout,
) => fit(input, seasonalities);

const requireAdditiveModel = (parameters: FittedParameters): FittedLinearAdditiveProphet => {
  expect(parameters.model).toBe("linear-additive-ridge");

  if (parameters.model !== "linear-additive-ridge") {
    throw new Error(`Expected linear-additive-ridge parameters, received ${parameters.model}`);
  }

  return Effect.runSync(parseLinearAdditiveModel(parameters));
};

/**
 * Register reusable behavioral cases for a normalized additive ridge backend.
 *
 * @param backendName - Human-readable backend name used in test output.
 * @param fit - Additive fitting operation under test.
 * @param predict - Matching checked prediction operation.
 */
export const registerAdditiveBackendConformance = (
  backendName: string,
  fit: FitAdditive,
  predict: (
    model: FittedLinearAdditiveProphet,
    timestamps: ReadonlyArray<number>,
  ) => Effect.Effect<AdditivePredictionBatch, unknown>,
): void => {
  describe(`${backendName} additive backend conformance`, () => {
    it("reduces an empty seasonal layout to the established linear equation", async () => {
      const model = requireAdditiveModel(
        await Effect.runPromise(
          fitWith(fit, makeInput([100, 200, 300], [2, 5, 8]), makeLayout([])),
        ),
      );

      const prediction = await Effect.runPromise(predict(model, [400]));

      expect(model.model).toBe("linear-additive-ridge");
      expect(model.coefficients).toEqual([]);
      expect(model.fitSummary.method).toBe("normalized-ridge-v1");
      expect(model.fitSummary.numericalRank).toBe(2);
      expect(prediction.rowCount).toBe(1);
      expect(prediction.componentCount).toBe(0);
      expect(Array.from(prediction.values)).toHaveLength(3);
      expect(prediction.values[0]).toBeCloseTo(11, 10);
      expect(prediction.values[1]).toBeCloseTo(0, 10);
      expect(prediction.values[2]).toBeCloseTo(11, 10);
    });

    it("returns ordered components that reconstruct the additive total and value", async () => {
      const timestamps = [0, DAY / 4, DAY / 2, (3 * DAY) / 4, DAY];
      const values = [1, 3, 1, -1, 1];

      const options = makeLayout([
        { name: "daily-custom", periodDays: 1, fourierOrder: 1, priorScale: 10 },
        { name: "weekly-custom", periodDays: 7, fourierOrder: 1, priorScale: 4 },
      ]);

      const model = requireAdditiveModel(
        await Effect.runPromise(fitWith(fit, makeInput(timestamps, values), options)),
      );

      const prediction = await Effect.runPromise(predict(model, [DAY / 4, 0, DAY / 4]));
      const rowWidth = prediction.componentCount + 3;

      expect(model.seasonalities.components.map((component) => component.definition.name)).toEqual([
        "daily-custom",
        "weekly-custom",
      ]);
      expect(prediction.rowCount).toBe(3);
      expect(prediction.componentCount).toBe(2);

      for (let row = 0; row < prediction.rowCount; row += 1) {
        const offset = row * rowWidth;
        const trend = prediction.values[offset];
        const additive = prediction.values[offset + 1];
        const value = prediction.values[offset + 2];
        const first = prediction.values[offset + 3];
        const second = prediction.values[offset + 4];

        expect(trend).toBeDefined();
        expect(additive).toBeDefined();
        expect(value).toBeDefined();
        expect(first).toBeDefined();
        expect(second).toBeDefined();

        if (
          trend === undefined ||
          additive === undefined ||
          value === undefined ||
          first === undefined ||
          second === undefined
        ) {
          continue;
        }

        expect(Math.abs(additive - (first + second))).toBeLessThanOrEqual(tolerance);
        expect(Math.abs(value - (trend + additive))).toBeLessThanOrEqual(tolerance);
      }

      expect(Array.from(prediction.values.slice(0, rowWidth))).toEqual(
        Array.from(prediction.values.slice(rowWidth * 2, rowWidth * 3)),
      );
    });

    it("returns deterministic parameters for repeated fits", async () => {
      const input = makeInput([0, DAY / 2, DAY, DAY * 1.5], [1, 4, 2, -1]);

      const options = makeLayout([
        { name: "daily-custom", periodDays: 1, fourierOrder: 1, priorScale: 10 },
      ]);

      const first = await Effect.runPromise(fitWith(fit, input, options));

      const second = await Effect.runPromise(fitWith(fit, input, options));

      expect(second).toEqual(first);
    });

    it("maps insufficient data and zero time range precisely", async () => {
      const options = makeLayout([]);

      const insufficient = await Effect.runPromise(
        Effect.flip(fitWith(fit, makeInput([], []), options)),
      );

      const degenerate = await Effect.runPromise(
        Effect.flip(fitWith(fit, makeInput([1, 1], [2, 3]), options)),
      );

      expect(insufficient).toBeInstanceOf(FittingError);
      expect(degenerate).toBeInstanceOf(FittingError);

      if (insufficient instanceof FittingError) {
        expect(insufficient.reason).toBe("insufficient-observations");
        expect(insufficient.parameterCount).toBe(2);
      }

      if (degenerate instanceof FittingError) {
        expect(degenerate.reason).toBe("degenerate-observations");
        expect(degenerate.parameterCount).toBe(2);
      }
    });
  });
};
