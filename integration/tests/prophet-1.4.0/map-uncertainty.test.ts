import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { loadProphetWasmModule } from "../../../src/internal/prophet-wasm-module";

const epoch = (timestamp: string): number => new Date(timestamp).getTime();

describe("Prophet 1.4.0 fixed-state scalar predictive distributions", () => {
  it("compares generated WASM moments and quantiles to the pinned release", async () => {
    const { mapUncertainty } = await Effect.runPromise(loadProphetFixtureBundle());
    const wasm = loadProphetWasmModule();

    for (const reference of mapUncertainty.cases) {
      const parameters = reference.parameters;
      const timestamps = new Float64Array(reference.predictionTimestamps.map(epoch));
      const timeOrigin = epoch(reference.trainingTimestamps.at(0) ?? "");
      const timeScale = epoch(reference.trainingTimestamps.at(-1) ?? "") - timeOrigin;
      const empty = new Float64Array();
      const logistic = reference.logistic;

      if (reference.growth === "logistic" && logistic === null) {
        throw new Error("Logistic reference is missing its required bounds");
      }

      const inputs = [
        timestamps,
        reference.growth === "linear" ? 0 : 1,
        0,
        parameters.targetOffset,
        parameters.targetScale,
        parameters.interceptOrLevel,
        reference.growth === "linear" ? parameters.slope : 0,
        reference.growth === "linear" ? timeOrigin : 0,
        reference.growth === "linear" ? timeScale : 0,
        reference.growth === "linear"
          ? new Float64Array([epoch(parameters.changepointTimestamp)])
          : empty,
        reference.growth === "linear" ? new Float64Array([parameters.delta]) : empty,
        parameters.noiseScale,
        empty,
        empty,
        empty,
        empty,
        reference.additionalCoefficients.length,
        new Float64Array(reference.additionalValuesRowMajor),
        new Float64Array(reference.additionalCoefficients),
        new Float64Array(reference.additionalCoefficients.map((_, index) => index)),
        new Float64Array(reference.additionalCoefficients.map(() => 1)),
        new Float64Array(reference.additionalModes.map((mode) => (mode === "additive" ? 0 : 1))),
        42,
        reference.sampleCount,
        0.8,
      ] as const;

      const logisticInputs =
        logistic === null
          ? undefined
          : ([
              timestamps,
              new Float64Array(logistic.capacities),
              empty,
              0,
              parameters.targetScale,
              0,
              logistic.floor,
              logistic.rate,
              logistic.offset,
              timeOrigin,
              timeScale,
              new Float64Array([epoch(parameters.changepointTimestamp)]),
              new Float64Array([parameters.delta]),
              parameters.noiseScale,
              empty,
              empty,
              empty,
              empty,
              0,
              empty,
              empty,
              empty,
              empty,
              empty,
              42,
              reference.sampleCount,
              0.8,
            ] as const);

      const samples =
        logisticInputs === undefined
          ? wasm.simulate_map_with_features(...inputs, 1)
          : wasm.simulate_logistic_map_with_features(...logisticInputs, 1);

      const intervals =
        logisticInputs === undefined
          ? wasm.simulate_map_with_features(...inputs, 0)
          : wasm.simulate_logistic_map_with_features(...logisticInputs, 0);

      const count = reference.sampleCount;

      expect(Array.from(samples.slice(0, 4))).toEqual([0, 1, timestamps.length, count]);
      expect(Array.from(intervals.slice(0, 4))).toEqual([0, 0, timestamps.length, count]);

      for (const [row] of reference.predictionTimestamps.entries()) {
        for (const [kind, base, pair] of [
          ["trend", 4, 0],
          ["yhat", 4 + timestamps.length * count, 2],
        ] as const) {
          const values = samples.slice(base + row * count, base + (row + 1) * count);
          const mean = values.reduce((sum, value) => sum + value, 0) / count;
          const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / count;
          const expected = reference.expected[kind];
          const bandLow = intervals[4 + row * 4 + pair];
          const bandHigh = intervals[4 + row * 4 + pair + 1];

          expect(Math.abs(mean - (expected.mean[row] ?? NaN))).toBeLessThanOrEqual(
            reference.tolerances.meanAbsolute,
          );
          expect(Math.abs(variance - (expected.variance[row] ?? NaN))).toBeLessThanOrEqual(
            kind === "trend"
              ? reference.tolerances.trendVarianceAbsolute
              : reference.tolerances.valueVarianceAbsolute,
          );
          expect(Math.abs((bandLow ?? NaN) - (expected.low[row] ?? NaN))).toBeLessThanOrEqual(
            reference.tolerances.quantileAbsolute,
          );
          expect(Math.abs((bandHigh ?? NaN) - (expected.high[row] ?? NaN))).toBeLessThanOrEqual(
            reference.tolerances.quantileAbsolute,
          );
        }
      }
    }
  });
});
