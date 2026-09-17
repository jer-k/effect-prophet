import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { resolveSeasonalities } from "../../../src/internal/seasonality-resolution";
import { decodeObservations } from "../../../src/observation";
import { decodeOptions } from "../../../src/options";
import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";

describe("Prophet 1.4.0 seasonality resolution compatibility", () => {
  it("matches generated built-in selection, period, order, and prior fixtures", async () => {
    const bundle = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of bundle.seasonalityResolution.cases) {
      const observations = await Effect.runPromise(
        decodeObservations(
          referenceCase.trainingTimestamps.map((timestamp, index) => ({
            timestamp,
            value: index,
          })),
        ),
      );

      const options = await Effect.runPromise(
        decodeOptions({
          builtInSeasonalities: referenceCase.configurationMapping.effectProphetBuiltIns,
          seasonalities: referenceCase.configurationMapping.effectProphetCustomSeasonalities,
        }),
      );

      const resolved = await Effect.runPromise(resolveSeasonalities(observations, options));

      const actualBuiltIns = resolved.layout.components
        .map((component) => component.definition)
        .filter(
          (definition) =>
            definition.name === "yearly" ||
            definition.name === "weekly" ||
            definition.name === "daily",
        );

      expect(actualBuiltIns, referenceCase.id).toEqual(referenceCase.expectedEnabled);
      expect(
        resolved.decisions.filter((decision) => decision.enabled).map((decision) => decision.name),
        referenceCase.id,
      ).toEqual(referenceCase.expectedEnabled.map((seasonality) => seasonality.name));
    }
  });
});
