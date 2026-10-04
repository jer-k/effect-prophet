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

      const inputs = (seed: number) =>
        [
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
          seed,
          reference.wasmSamplesPerSeed,
          0.8,
        ] as const;

      const logisticInputs =
        logistic === null
          ? undefined
          : (seed: number) =>
              [
                timestamps,
                new Float64Array(logistic.capacities),
                logistic.explicitFloors === null
                  ? empty
                  : new Float64Array(logistic.explicitFloors),
                0,
                parameters.targetScale,
                logistic.explicitFloors === null ? 0 : 1,
                logistic.floor ?? 0,
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
                reference.additionalCoefficients.length,
                new Float64Array(reference.additionalValuesRowMajor),
                new Float64Array(reference.additionalCoefficients),
                new Float64Array(reference.additionalCoefficients.map((_, index) => index)),
                new Float64Array(reference.additionalCoefficients.map(() => 1)),
                new Float64Array(
                  reference.additionalModes.map((mode) => (mode === "additive" ? 0 : 1)),
                ),
                seed,
                reference.wasmSamplesPerSeed,
                0.8,
              ] as const;

      const count = reference.wasmSamplesPerSeed;

      const samples = reference.wasmSeeds.map((seed) =>
        logisticInputs === undefined
          ? wasm.simulate_map_with_features(...inputs(seed), 1)
          : wasm.simulate_logistic_map_with_features(...logisticInputs(seed), 1),
      );

      const intervals =
        logisticInputs === undefined
          ? wasm.simulate_map_with_features(...inputs(reference.wasmSeeds[0] ?? 0), 0)
          : wasm.simulate_logistic_map_with_features(
              ...logisticInputs(reference.wasmSeeds[0] ?? 0),
              0,
            );

      for (const frame of samples) {
        expect(Array.from(frame.slice(0, 4))).toEqual([0, 1, timestamps.length, count]);
      }

      expect(Array.from(intervals.slice(0, 4))).toEqual([0, 0, timestamps.length, count]);

      for (const [row] of reference.predictionTimestamps.entries()) {
        for (const [kind, base, pair] of [
          ["trend", 4, 0],
          ["yhat", 4 + timestamps.length * count, 2],
        ] as const) {
          const values = samples.flatMap((frame) =>
            Array.from(frame.slice(base + row * count, base + (row + 1) * count)),
          );

          const mean = values.reduce((sum, value) => sum + value, 0) / reference.sampleCount;

          const variance =
            values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / reference.sampleCount;

          const expected = reference.expected[kind];

          values.sort((left, right) => left - right);

          const quantile = (probability: number): number => {
            const position = (values.length - 1) * probability;
            const lower = Math.floor(position);
            const upper = Math.ceil(position);
            const fraction = position - lower;

            return (values[lower] ?? NaN) * (1 - fraction) + (values[upper] ?? NaN) * fraction;
          };

          const bandLow = quantile(0.1);
          const bandHigh = quantile(0.9);

          if (samples.length === 1) {
            expect(intervals[4 + row * 4 + pair]).toBeCloseTo(bandLow, 10);
            expect(intervals[4 + row * 4 + pair + 1]).toBeCloseTo(bandHigh, 10);
          }

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
