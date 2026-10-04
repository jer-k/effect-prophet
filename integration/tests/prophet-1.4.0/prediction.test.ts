import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { predict } from "../../../src/index";
import { parsePiecewiseMapModel } from "../../../src/fitted-model";
import { fixedPiecewiseParameters } from "../../../test/helpers/fixed-piecewise-model";

describe("Prophet 1.4.0 fixed-parameter prediction compatibility", () => {
  it("matches linear-trend references", async () => {
    const { linearTrend } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of linearTrend.cases) {
      const model = await Effect.runPromise(
        parsePiecewiseMapModel({
          ...fixedPiecewiseParameters,
          ...referenceCase.parameters,
        }),
      );

      const forecasts = await Effect.runPromise(predict(model, referenceCase.predictionTimestamps));

      expect(forecasts, referenceCase.id).toHaveLength(referenceCase.expected.trend.length);

      for (const [index, expected] of referenceCase.expected.trend.entries()) {
        const forecast = forecasts[index];

        expect(forecast, `${referenceCase.id} forecast ${index}`).toBeDefined();

        if (forecast === undefined) {
          continue;
        }

        const tolerance =
          referenceCase.tolerance.absolute + referenceCase.tolerance.relative * Math.abs(expected);

        expect(
          Math.abs(forecast.trend - expected),
          `${referenceCase.id} trend ${index}`,
        ).toBeLessThanOrEqual(tolerance);
        expect(
          Math.abs(forecast.value - expected),
          `${referenceCase.id} total forecast ${index}`,
        ).toBeLessThanOrEqual(tolerance);
      }
    }
  });
});
