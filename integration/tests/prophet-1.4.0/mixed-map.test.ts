import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { fit, predict, prophetFittingBackendLayer } from "../../../src/index";
import { loadProphetWasmModule } from "../../../src/internal/prophet-wasm-module";

const epoch = (timestamp: string): number => new Date(timestamp).getTime();

const expectClose = (actual: number, expected: number, tolerance: number): void => {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
};

describe("Prophet 1.4.0 mixed MAP evidence", () => {
  it("matches linear and flat Newton fits through real mixed WASM operations", async () => {
    const fixture = await Effect.runPromise(loadProphetFixtureBundle());
    const wasm = loadProphetWasmModule();

    for (const referenceCase of fixture.mixedMap.fittedCases) {
      const rowCount = referenceCase.observations.length;
      const columnCount = referenceCase.expected.featureColumnNames.length;

      const timestamps = new Float64Array(
        referenceCase.observations.map((observation) => epoch(observation.timestamp)),
      );

      const values = new Float64Array(
        referenceCase.observations.map((observation) => observation.value),
      );

      const modes = new Float64Array(
        referenceCase.expected.featureModes.map((mode) => (mode === "additive" ? 0 : 1)),
      );

      const componentOffsets = new Float64Array([0, 2, 4, 5]);
      const componentCounts = new Float64Array([2, 2, 1, 1]);
      const scaling = referenceCase.scaling === "absmax" ? 0 : 1;

      const common = [
        timestamps,
        values,
        scaling,
        new Float64Array(),
        new Float64Array(),
        new Float64Array(),
        new Float64Array(),
        columnCount,
        new Float64Array(referenceCase.expected.trainingFeaturesRowMajor),
        new Float64Array(referenceCase.expected.featurePriorScales),
        componentOffsets,
        componentCounts,
        modes,
      ] as const;

      const fit =
        referenceCase.growth === "linear"
          ? wasm.fit_mixed_linear_map(
              timestamps,
              values,
              scaling,
              0,
              new Float64Array(referenceCase.expected.changepointTimestamps.map(epoch)),
              0,
              0,
              new Float64Array(),
              new Float64Array(),
              new Float64Array(),
              new Float64Array(),
              columnCount,
              new Float64Array(referenceCase.expected.trainingFeaturesRowMajor),
              new Float64Array(referenceCase.expected.featurePriorScales),
              componentOffsets,
              componentCounts,
              modes,
              referenceCase.settings.changepointPriorScale,
              10_000,
              1e-10,
              1e-12,
            )
          : wasm.fit_mixed_flat_map(...common, 10_000, 1e-10, 1e-12);

      expect(fit[0]).toBe(0);

      const coefficientStart =
        referenceCase.growth === "linear"
          ? 16 + referenceCase.expected.changepointTimestamps.length * 2
          : 12;

      for (const [index, expected] of referenceCase.expected.coefficients.entries()) {
        expectClose(
          fit[coefficientStart + index] ?? Number.NaN,
          expected,
          referenceCase.tolerance.coefficientAbsolute,
        );
      }

      const predictionTimestamps = new Float64Array(
        referenceCase.predictionRows.map((row) => epoch(row.timestamp)),
      );

      const predictionFeatures = new Float64Array(referenceCase.expected.featuresRowMajor);
      const coefficients = fit.slice(coefficientStart);

      const prediction =
        referenceCase.growth === "linear"
          ? wasm.predict_mixed_linear_map(
              predictionTimestamps,
              fit[1],
              fit[2],
              fit[3],
              fit[5],
              fit[6],
              fit[7],
              fit[8],
              new Float64Array(referenceCase.expected.changepointTimestamps.map(epoch)),
              fit.slice(16 + referenceCase.expected.changepointTimestamps.length, coefficientStart),
              fit[10],
              new Float64Array(),
              new Float64Array(),
              new Float64Array(),
              new Float64Array(),
              columnCount,
              predictionFeatures,
              coefficients,
              componentOffsets,
              componentCounts,
              modes,
            )
          : wasm.predict_mixed_flat_map(
              predictionTimestamps,
              fit[1],
              fit[2],
              fit[3],
              fit[4],
              fit[5],
              new Float64Array(),
              new Float64Array(),
              new Float64Array(),
              new Float64Array(),
              columnCount,
              predictionFeatures,
              coefficients,
              componentOffsets,
              componentCounts,
              modes,
            );

      expect(prediction[0]).toBe(0);
      const width = 8;

      for (let row = 0; row < referenceCase.predictionRows.length; row += 1) {
        const offset = 1 + row * width;
        expectClose(
          prediction[offset] ?? Number.NaN,
          referenceCase.expected.trend[row] ?? Number.NaN,
          referenceCase.tolerance.forecastAbsolute,
        );
        expectClose(
          prediction[offset + 1] ?? Number.NaN,
          referenceCase.expected.additive[row] ?? Number.NaN,
          referenceCase.tolerance.componentAbsolute,
        );
        expectClose(
          prediction[offset + 2] ?? Number.NaN,
          referenceCase.expected.multiplicative[row] ?? Number.NaN,
          referenceCase.tolerance.componentAbsolute,
        );
        expectClose(
          prediction[offset + 3] ?? Number.NaN,
          referenceCase.expected.value[row] ?? Number.NaN,
          referenceCase.tolerance.forecastAbsolute,
        );
      }

      expect(rowCount).toBeGreaterThan(1);
    }
  });

  it("matches the mixed fixtures through the public fit and prediction lifecycle", async () => {
    const fixture = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of fixture.mixedMap.fittedCases) {
      const seasonalities = referenceCase.seasonalities.map((seasonality) => {
        const fields = {
          name: seasonality.name,
          periodDays: seasonality.periodDays,
          fourierOrder: seasonality.fourierOrder,
          priorScale: seasonality.priorScale,
          mode: seasonality.mode,
        };

        return seasonality.conditionName === undefined
          ? fields
          : { ...fields, conditionName: seasonality.conditionName };
      });

      const firstSeasonality = seasonalities[0];

      if (firstSeasonality === undefined) {
        throw new Error("Mixed fixture requires at least one seasonality");
      }

      const nonEmptySeasonalities = [firstSeasonality, ...seasonalities.slice(1)] as const;

      const events = referenceCase.events.map((event) => ({
        name: event.name,
        date: event.date,
        priorScale: event.priorScale,
      }));

      const regressors = referenceCase.regressors.map((regressor) => ({
        name: regressor.name,
        priorScale: regressor.priorScale,
        standardization: regressor.standardization,
        mode: regressor.mode,
      }));

      const commonOptions = {
        scaling: referenceCase.scaling,
        seasonalityMode: "additive" as const,
        holidaysMode: "additive" as const,
        seasonalities: nonEmptySeasonalities,
        events,
        regressors,
      };

      const options =
        referenceCase.growth === "linear"
          ? {
              ...commonOptions,
              growth: "linear" as const,
              map: {
                changepoints: {
                  mode: "explicit" as const,
                  timestamps: referenceCase.expected.changepointTimestamps,
                },
                changepointPriorScale: referenceCase.settings.changepointPriorScale,
              },
            }
          : { ...commonOptions, growth: "flat" as const };

      const model = await Effect.runPromise(
        fit(referenceCase.observations, options).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      const forecasts = await Effect.runPromise(predict(model, referenceCase.predictionRows));

      for (const [row, forecast] of forecasts.entries()) {
        expectClose(
          forecast.trend,
          referenceCase.expected.trend[row] ?? Number.NaN,
          referenceCase.tolerance.forecastAbsolute,
        );
        expectClose(
          forecast.additive,
          referenceCase.expected.additive[row] ?? Number.NaN,
          referenceCase.tolerance.componentAbsolute,
        );
        expectClose(
          forecast.multiplicative,
          referenceCase.expected.multiplicative[row] ?? Number.NaN,
          referenceCase.tolerance.componentAbsolute,
        );
        expectClose(
          forecast.value,
          referenceCase.expected.value[row] ?? Number.NaN,
          referenceCase.tolerance.forecastAbsolute,
        );
      }
    }
  });
});
