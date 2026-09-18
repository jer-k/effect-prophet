import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { fit, prophetFittingBackendLayer } from "../../../src/index";
import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";

describe("Prophet 1.4.0 automatic changepoint resolution", () => {
  it("matches release row-index selection through the real Rust/WASM fit", async () => {
    const { changepointResolution } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of changepointResolution.cases) {
      if (referenceCase.trainingTimestamps.length < 2) {
        continue;
      }

      const observations = referenceCase.trainingTimestamps.map((timestamp, index) => ({
        timestamp,
        value: 1 + index * 0.4 + (index % 2) * 0.07,
      }));

      const model = await Effect.runPromise(
        fit(observations, {
          map: {
            changepoints: {
              mode: "auto",
              count: referenceCase.controls.count,
              range: referenceCase.controls.range,
            },
          },
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      expect(model.model).toBe("linear-piecewise-map");

      if (model.model === "linear-piecewise-map") {
        expect(model.changepointTimestamps).toEqual(
          referenceCase.expectedSelectedTimestamps.map((timestamp) => Date.parse(timestamp)),
        );
      }
    }
  });
});
