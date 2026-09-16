import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { fit, prophetFittingBackendLayer } from "../../../src/index";

describe("Prophet 1.4.0 preprocessing compatibility", () => {
  it("returns matching training origins and scales", async () => {
    const { linearTrend } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of linearTrend.cases) {
      const model = await Effect.runPromise(
        fit(referenceCase.observations).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      expect(model.model, referenceCase.id).toBe("linear-trend");

      if (model.model !== "linear-trend") {
        continue;
      }

      expect(model.timeOrigin, referenceCase.id).toBe(referenceCase.parameters.timeOrigin);
      expect(model.timeScale, referenceCase.id).toBe(referenceCase.parameters.timeScale);

      for (const [index, observation] of referenceCase.observations.entries()) {
        const expected = referenceCase.expected.scaledTrainingTimes[index];
        const actual = (Date.parse(observation.timestamp) - model.timeOrigin) / model.timeScale;

        expect(expected, `${referenceCase.id} scaled training time ${index}`).toBeDefined();

        if (expected === undefined) {
          continue;
        }

        const tolerance =
          referenceCase.tolerance.absolute + referenceCase.tolerance.relative * Math.abs(expected);

        expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
      }
    }
  });
});
