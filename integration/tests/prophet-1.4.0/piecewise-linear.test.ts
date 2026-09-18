import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parsePiecewiseMapModel } from "../../../src/fitted-model";
import { predict } from "../../../src/prophet";
import * as Seasonality from "../../../src/seasonality";
import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";

const expectClose = (
  actual: number,
  expected: number,
  tolerance: { readonly absolute: number; readonly relative: number },
): void => {
  const maximumError = tolerance.absolute + tolerance.relative * Math.abs(expected);

  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(maximumError);
};

describe("Prophet 1.4.0 fixed piecewise-linear compatibility", () => {
  it("matches trend, ordered components, and reconstructed values through real WASM", async () => {
    const { piecewiseLinear } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of piecewiseLinear.cases) {
      const definitions = await Effect.runPromise(
        Seasonality.parseSeasonalityDefinitions(referenceCase.seasonalities),
      );

      const seasonalities = await Effect.runPromise(Seasonality.makeSeasonalityLayout(definitions));

      const model = await Effect.runPromise(
        parsePiecewiseMapModel({
          model: "linear-piecewise-map",
          intercept: referenceCase.parameters.intercept,
          slope: referenceCase.parameters.slope,
          timeOrigin: referenceCase.parameters.timeOrigin,
          timeScale: referenceCase.parameters.timeScale,
          changepointTimestamps: referenceCase.changepointTimestamps.map((timestamp) =>
            Date.parse(timestamp),
          ),
          deltas: referenceCase.parameters.deltas,
          seasonalities,
          coefficients: referenceCase.parameters.seasonalCoefficients,
          noiseScale: 1,
          fitSummary: {
            method: "piecewise-map-coordinate-v1",
            termination: "converged",
            valueScale: 1,
            observationCount: referenceCase.observations.length,
            iterations: 1,
            objective: 0,
            stationarityResidual: 0,
            changepointPriorScale: 0.05,
          },
        }),
      );

      const forecasts = await Effect.runPromise(predict(model, referenceCase.predictionTimestamps));

      expect(forecasts).toHaveLength(referenceCase.predictionTimestamps.length);

      for (const [row, forecast] of forecasts.entries()) {
        const expectedTrend = referenceCase.expected.trend[row];
        const expectedAdditive = referenceCase.expected.additive[row];
        const expectedValue = referenceCase.expected.value[row];

        expect(expectedTrend).toBeDefined();
        expect(expectedAdditive).toBeDefined();
        expect(expectedValue).toBeDefined();

        if (
          expectedTrend === undefined ||
          expectedAdditive === undefined ||
          expectedValue === undefined
        ) {
          continue;
        }

        expectClose(forecast.trend, expectedTrend, referenceCase.tolerance);
        expectClose(forecast.additive, expectedAdditive, referenceCase.tolerance);
        expectClose(forecast.value, expectedValue, referenceCase.tolerance);

        for (const [component, seasonalForecast] of forecast.seasonalities.entries()) {
          const expectedComponent =
            referenceCase.expected.seasonalComponentsRowMajor[
              row * referenceCase.seasonalities.length + component
            ];

          expect(expectedComponent).toBeDefined();

          if (expectedComponent !== undefined) {
            expectClose(seasonalForecast.value, expectedComponent, referenceCase.tolerance);
          }
        }
      }
    }
  });
});
