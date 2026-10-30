import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { fit, predict, prophetFittingBackendLayer } from "../../../src/index";

const within = (
  actual: number,
  expected: number,
  tolerance: { absolute: number; relative: number },
) => Math.abs(actual - expected) <= tolerance.absolute + Math.abs(expected) * tolerance.relative;

describe("Prophet 1.4.0 regressor models", () => {
  it("forecasts each regressor with its own model and matches Python's predictions", async () => {
    const { regressorModels: fixture } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const reference of fixture.fittedCases) {
      const model = await Effect.runPromise(
        fit(reference.observations, reference.options).pipe(
          Effect.provide(prophetFittingBackendLayer),
        ),
      );

      const regressorModel = model.regressorModels?.find(
        ({ name }) => name === reference.expected.regressor,
      );

      if (regressorModel === undefined) throw new Error("Missing regressor model");

      const { timestamps, value } = reference.expected.regressorForecast;
      const regressorForecasts = await Effect.runPromise(predict(regressorModel.model, timestamps));

      for (const [row, forecast] of regressorForecasts.entries()) {
        const expected = value[row];

        if (expected === undefined) throw new Error("Missing fixture row");

        expect(
          within(forecast.value, expected, reference.tolerance),
          `${reference.id}: regressor`,
        ).toBe(true);
      }

      const forecasts = await Effect.runPromise(predict(model, reference.predictionRows));

      expect(forecasts).toHaveLength(reference.predictionRows.length);

      for (const [row, forecast] of forecasts.entries()) {
        for (const field of ["trend", "value", "additive", "multiplicative"] as const) {
          const expected = reference.expected[field][row];

          if (expected === undefined) throw new Error("Missing fixture row");

          expect(
            Math.abs(forecast[field] - expected),
            `${reference.id}: ${field} at row ${row}`,
          ).toBeLessThanOrEqual(
            reference.tolerance.absolute + Math.abs(expected) * reference.tolerance.relative,
          );
        }
      }
    }
  }, 60_000);
});
