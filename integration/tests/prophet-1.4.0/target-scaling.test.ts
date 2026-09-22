import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { fit, predict, prophetFittingBackendLayer } from "../../../src/index";

const expectClose = (
  actual: number,
  expected: number,
  tolerance: { readonly absolute: number; readonly relative: number },
  label: string,
) => {
  const bound = tolerance.absolute + tolerance.relative * Math.abs(expected);

  expect(Math.abs(actual - expected), label).toBeLessThanOrEqual(bound);
};

describe("Prophet 1.4.0 target-scaling compatibility", () => {
  it("matches release preprocessing choices for absmax and minmax", async () => {
    const { targetScaling } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of targetScaling.preprocessingCases) {
      const expectedOffset =
        referenceCase.mode === "absmax" ? 0 : Math.min(...referenceCase.values);

      let expectedScale =
        referenceCase.mode === "absmax"
          ? Math.max(...referenceCase.values.map(Math.abs))
          : Math.max(...referenceCase.values) - Math.min(...referenceCase.values);

      if (expectedScale === 0) {
        expectedScale = 1;
      }

      expect(expectedOffset, `${referenceCase.id} offset`).toBe(referenceCase.expected.offset);
      expect(expectedScale, `${referenceCase.id} scale`).toBe(referenceCase.expected.scale);

      for (const [index, value] of referenceCase.values.entries()) {
        const expected = referenceCase.expected.scaledValues[index];

        expect(expected).toBeDefined();

        if (expected !== undefined) {
          expectClose(
            (value - expectedOffset) / expectedScale,
            expected,
            referenceCase.tolerance,
            `${referenceCase.id} scaled value ${index}`,
          );
        }
      }
    }
  });

  it("matches fitted minmax linear and flat release fixtures", async () => {
    const { targetScaling } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of targetScaling.fittedCases) {
      const model = await Effect.runPromise(
        Effect.gen(function* () {
          if (referenceCase.growth === "flat") {
            return yield* fit(referenceCase.observations, {
              growth: "flat",
              scaling: referenceCase.mode,
              seasonalities: [],
            });
          }

          const firstSeasonality = referenceCase.seasonalities[0];

          const map = {
            changepoints: {
              mode: "explicit" as const,
              timestamps: referenceCase.changepointTimestamps,
            },
            changepointPriorScale: referenceCase.settings.changepointPriorScale,
          };

          if (firstSeasonality === undefined) {
            return yield* fit(referenceCase.observations, {
              growth: "linear",
              scaling: referenceCase.mode,
              seasonalities: [],
              events: referenceCase.events,
              regressors: referenceCase.regressors,
              map,
            });
          }

          return yield* fit(referenceCase.observations, {
            growth: "linear",
            scaling: referenceCase.mode,
            seasonalities: [firstSeasonality, ...referenceCase.seasonalities.slice(1)],
            events: referenceCase.events,
            regressors: referenceCase.regressors,
            map,
          });
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      if (model.model === "linear-trend" || model.model === "logistic-piecewise-map") {
        throw new Error(`${referenceCase.id} unexpectedly selected a different model family`);
      }

      expect(model.targetScaling.mode, referenceCase.id).toBe(referenceCase.mode);
      expect(model.targetScaling.offset, referenceCase.id).toBe(referenceCase.expected.offset);
      expect(model.targetScaling.scale, referenceCase.id).toBe(referenceCase.expected.scale);

      const forecasts = await Effect.runPromise(predict(model, referenceCase.predictionRows));

      for (const [index, forecast] of forecasts.entries()) {
        const expectedTrend = referenceCase.expected.trend[index];
        const expectedAdditive = referenceCase.expected.additive[index];
        const expectedValue = referenceCase.expected.value[index];

        expect(expectedTrend).toBeDefined();
        expect(expectedAdditive).toBeDefined();
        expect(expectedValue).toBeDefined();

        if (
          expectedTrend !== undefined &&
          expectedAdditive !== undefined &&
          expectedValue !== undefined
        ) {
          expectClose(
            forecast.trend,
            expectedTrend,
            referenceCase.tolerance,
            `${referenceCase.id} trend ${index}`,
          );
          expectClose(
            forecast.additive,
            expectedAdditive,
            referenceCase.tolerance,
            `${referenceCase.id} additive ${index}`,
          );
          expectClose(
            forecast.value,
            expectedValue,
            referenceCase.tolerance,
            `${referenceCase.id} value ${index}`,
          );
        }
      }
    }
  });
});
