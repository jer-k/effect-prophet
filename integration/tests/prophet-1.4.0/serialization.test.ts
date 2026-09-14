import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { decodeFittedModel, encodeFittedModel, predict } from "../../../src/index";

describe("Prophet 1.4.0 serialization compatibility", () => {
  it("reloads fixed models with equivalent reference predictions", async () => {
    const { linearTrend } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of linearTrend.cases) {
      const model = await Effect.runPromise(
        decodeFittedModel({
          modelKind: "linear-trend",
          coefficients: {
            intercept: referenceCase.parameters.intercept,
            slope: referenceCase.parameters.slope,
          },
          timeScaling: {
            origin: referenceCase.parameters.timeOrigin,
            scale: referenceCase.parameters.timeScale,
          },
        }),
      );

      const encoded = await Effect.runPromise(encodeFittedModel(model));
      const jsonValue: unknown = JSON.parse(JSON.stringify(encoded));
      const reloaded = await Effect.runPromise(decodeFittedModel(jsonValue));

      const forecasts = await Effect.runPromise(
        predict(reloaded, referenceCase.predictionTimestamps),
      );

      for (const [index, expected] of referenceCase.expected.trend.entries()) {
        const forecast = forecasts[index];

        expect(forecast, `${referenceCase.id} forecast ${index}`).toBeDefined();

        if (forecast === undefined) {
          continue;
        }

        const tolerance =
          referenceCase.tolerance.absolute + referenceCase.tolerance.relative * Math.abs(expected);

        expect(Math.abs(forecast.value - expected)).toBeLessThanOrEqual(tolerance);
      }
    }
  });
});
