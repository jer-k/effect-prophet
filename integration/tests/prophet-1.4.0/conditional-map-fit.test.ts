import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { fit, predict, prophetFittingBackendLayer } from "../../../src/index";

const expectWithin = (actual: number, expected: number, tolerance: number, label: string) => {
  expect(Math.abs(actual - expected), label).toBeLessThanOrEqual(tolerance);
};

describe("Prophet 1.4.0 fitted conditional MAP evidence", () => {
  it("fits the committed conditional and mixed-feature configurations through real WASM", async () => {
    const { conditionalMapFit } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of conditionalMapFit.cases) {
      const model = await Effect.runPromise(
        fit(referenceCase.observations, {
          seasonalities: referenceCase.seasonalities,
          events: referenceCase.events,
          regressors: referenceCase.regressors,
          map: {
            changepoints: {
              mode: "explicit",
              timestamps: referenceCase.settings.changepointTimestamps,
            },
            changepointPriorScale: referenceCase.settings.changepointPriorScale,
          },
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      expect(model.model, referenceCase.id).toBe("linear-piecewise-map");

      if (model.model !== "linear-piecewise-map") {
        continue;
      }

      const actualCoefficients = [
        ...model.coefficients,
        ...model.eventCoefficients,
        ...model.regressors.map((regressor) => regressor.coefficient),
      ];

      expect(actualCoefficients).toHaveLength(
        referenceCase.expected.observationUnitCoefficients.length,
      );
      expect(model.fitSummary.stationarityResidual).toBeLessThanOrEqual(1e-2);

      for (const [
        index,
        expected,
      ] of referenceCase.expected.observationUnitCoefficients.entries()) {
        expectWithin(
          actualCoefficients[index] ?? Number.NaN,
          expected,
          referenceCase.tolerance.componentAbsolute,
          `${referenceCase.id} coefficient ${index}`,
        );
      }

      expectWithin(
        model.noiseScale,
        referenceCase.expected.noiseScale,
        referenceCase.tolerance.forecastAbsolute,
        `${referenceCase.id} noise scale`,
      );

      for (const [row, predictionRow] of referenceCase.predictionRows.entries()) {
        for (const seasonality of referenceCase.seasonalities) {
          if (
            seasonality.conditionName === undefined ||
            predictionRow.conditions[seasonality.conditionName]
          ) {
            continue;
          }

          for (const [column, name] of referenceCase.expected.featureColumnNames.entries()) {
            if (name.startsWith(`${seasonality.name}_delim_`)) {
              expect(
                referenceCase.expected.featuresRowMajor[
                  row * referenceCase.expected.featureColumnNames.length + column
                ],
                `${referenceCase.id} false feature row ${row}`,
              ).toBe(0);
            }
          }
        }
      }

      const forecasts = await Effect.runPromise(predict(model, referenceCase.predictionRows));

      for (const [row, forecast] of forecasts.entries()) {
        const actualComponents = [
          ...forecast.seasonalities.map((component) =>
            component.mode === "additive" ? component.value : component.contribution,
          ),
          ...forecast.events.map((component) =>
            component.mode === "additive" ? component.value : component.contribution,
          ),
          ...forecast.regressors.map((component) =>
            component.mode === "additive" ? component.value : component.contribution,
          ),
        ];

        const expectedComponents = referenceCase.expected.componentsRowMajor.slice(
          row * referenceCase.expected.componentNames.length,
          (row + 1) * referenceCase.expected.componentNames.length,
        );

        expect(
          [
            ...forecast.seasonalities.map((component) => component.name),
            ...forecast.events.map((component) => component.name),
            ...forecast.regressors.map((component) => component.name),
          ],
          referenceCase.id,
        ).toEqual(referenceCase.expected.componentNames);

        for (const [component, expected] of expectedComponents.entries()) {
          expectWithin(
            actualComponents[component] ?? Number.NaN,
            expected,
            referenceCase.tolerance.componentAbsolute,
            `${referenceCase.id} row ${row} component ${component}`,
          );
        }

        expectWithin(
          forecast.trend,
          referenceCase.expected.trend[row] ?? Number.NaN,
          referenceCase.tolerance.forecastAbsolute,
          `${referenceCase.id} row ${row} trend`,
        );
        expectWithin(
          forecast.additive,
          referenceCase.expected.additive[row] ?? Number.NaN,
          referenceCase.tolerance.componentAbsolute,
          `${referenceCase.id} row ${row} additive`,
        );
        expectWithin(
          forecast.value,
          referenceCase.expected.value[row] ?? Number.NaN,
          referenceCase.tolerance.forecastAbsolute,
          `${referenceCase.id} row ${row} value`,
        );
        expect(forecast.additive).toBeCloseTo(
          actualComponents.reduce((total, value) => total + value, 0),
          11,
        );
        expect(forecast.value).toBeCloseTo(forecast.trend + forecast.additive, 11);
      }
    }
  });
});
