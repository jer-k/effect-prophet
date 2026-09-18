import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { fit, predict, prophetFittingBackendLayer } from "../../../src/index";
import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";

describe("Prophet 1.4.0 fitted linear MAP compatibility", () => {
  it("matches a nonempty explicit-changepoint Newton fit within frozen tolerances", async () => {
    const { linearMapFit } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of linearMapFit.cases) {
      const model = await Effect.runPromise(
        fit(referenceCase.observations, {
          map: {
            changepoints: {
              mode: "explicit",
              timestamps: referenceCase.changepointTimestamps,
            },
            changepointPriorScale: referenceCase.settings.changepointPriorScale,
          },
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      expect(model.model).toBe("linear-piecewise-map");

      if (model.model !== "linear-piecewise-map") {
        continue;
      }

      expect(Math.abs(model.intercept - referenceCase.expected.intercept)).toBeLessThanOrEqual(
        referenceCase.tolerance.coefficientAbsolute,
      );
      expect(Math.abs(model.slope - referenceCase.expected.slope)).toBeLessThanOrEqual(
        referenceCase.tolerance.coefficientAbsolute,
      );
      expect(Math.abs(model.noiseScale - referenceCase.expected.noiseScale)).toBeLessThanOrEqual(
        referenceCase.tolerance.noiseAbsolute,
      );

      for (const [index, delta] of model.deltas.entries()) {
        const expected = referenceCase.expected.deltas[index];

        expect(expected).toBeDefined();

        if (expected !== undefined) {
          expect(Math.abs(delta - expected)).toBeLessThanOrEqual(
            referenceCase.tolerance.coefficientAbsolute,
          );
        }
      }

      const forecasts = await Effect.runPromise(predict(model, referenceCase.predictionTimestamps));

      for (const [index, forecast] of forecasts.entries()) {
        const expected = referenceCase.expected.trend[index];

        expect(expected).toBeDefined();

        if (expected !== undefined) {
          expect(Math.abs(forecast.trend - expected)).toBeLessThanOrEqual(
            referenceCase.tolerance.forecastAbsolute,
          );
        }
      }
    }
  });
});
