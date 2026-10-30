import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { fit, predict, predictWithIntervals, prophetFittingBackendLayer } from "../../../src/index";

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

describe("Prophet 1.4.0 regressor model intervals", () => {
  it("widens future intervals with the regressor model's draws as much as Python does", async () => {
    const { regressorModels: fixture } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const reference of fixture.intervalCases) {
      const model = await Effect.runPromise(
        fit(reference.observations, reference.options).pipe(
          Effect.provide(prophetFittingBackendLayer),
        ),
      );

      const mean = (values: ReadonlyArray<number>) =>
        values.reduce((sum, value) => sum + value, 0) / values.length;

      // Draws come from different generators, so several seeds are averaged against Python's.
      const widths: Array<number> = [];

      for (const seed of [1, 2, 3, 4]) {
        const forecasts = await Effect.runPromise(
          predictWithIntervals(model, reference.predictionRows, {
            seed,
            samples: reference.sampleCount,
            intervalWidth: reference.intervalWidth,
          }),
        );

        widths.push(
          mean(
            forecasts.rows.map(({ valueInterval }) => valueInterval.upper - valueInterval.lower),
          ),
        );
      }

      const expected = mean(reference.expected.widenedWidths);

      expect(Math.abs(mean(widths) - expected) / expected, reference.id).toBeLessThanOrEqual(
        reference.tolerance.meanWidthRelative,
      );

      // The fixture's point-forecast widths are far narrower, so the comparison has power.
      expect(mean(reference.expected.pointWidths)).toBeLessThan(
        expected * (1 - 2 * reference.tolerance.meanWidthRelative),
      );
    }
  }, 60_000);
});
