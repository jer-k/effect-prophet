import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { fit, predict, prophetFittingBackendLayer, type FittedProphet } from "../../../src/index";

// Each component's prior by name, as the fixture records Prophet's.
const componentPriorScales = (model: FittedProphet): Record<string, number> =>
  Object.fromEntries([
    ...model.seasonalities.components.map(({ definition }) => [
      definition.name,
      definition.priorScale,
    ]),
    ...model.events.columns.map((column) => [column.eventName, column.priorScale]),
    ...model.regressors.map(({ definition }) => [definition.name, definition.priorScale]),
  ]);

describe("Prophet 1.4.0 global prior scales", () => {
  it("fills in the same priors as Python's constructor and matches its forecasts", async () => {
    const { globalPriorScales: fixture } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const reference of fixture.fittedCases) {
      const { seasonalities = [], ...options } = reference.options;
      const [first, ...rest] = seasonalities;

      // Python fits with n_changepoints=0 and Newton.
      const map = {
        optimizer: { algorithm: "newton", maxIterations: 10_000 },
        changepoints: { mode: "explicit", timestamps: [] },
      } as const;

      const model = await Effect.runPromise(
        fit(
          reference.observations,
          first === undefined
            ? { ...options, seasonalities: [], map }
            : { ...options, seasonalities: [first, ...rest], map },
        ).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      expect(componentPriorScales(model), reference.id).toEqual(reference.expected.priorScales);

      const forecasts = await Effect.runPromise(predict(model, reference.predictionRows));

      for (const [row, forecast] of forecasts.entries()) {
        for (const field of ["trend", "value", "additive", "multiplicative"] as const) {
          const expected = reference.expected[field][row];

          if (expected === undefined) throw new Error("Missing fixture row");

          const tolerance =
            reference.tolerance.absolute + Math.abs(expected) * reference.tolerance.relative;

          expect(
            Math.abs(forecast[field] - expected),
            `${reference.id}: ${field}`,
          ).toBeLessThanOrEqual(tolerance);
        }
      }
    }
  }, 60_000);
});
