import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { alignConditionValues, conditionNamesFromLayout } from "../../../src/condition";
import { loadProphetWasmModule } from "../../../src/internal/prophet-wasm-module";
import { createSeasonalityMasks } from "../../../src/internal/seasonality-masks";
import { makeSeasonalityLayout, parseSeasonalities } from "../../../src/seasonality";

const expectClose = (actual: number, expected: number, absolute: number, relative: number) => {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(absolute + relative * Math.abs(expected));
};

describe("Prophet 1.4.0 conditional-seasonality compatibility", () => {
  it("matches strict masks, gated fixed components, and exact false-row zeros", async () => {
    const { conditionalSeasonality } = await Effect.runPromise(loadProphetFixtureBundle());
    const wasm = loadProphetWasmModule();
    const predictWithFeatures = wasm.predict_piecewise_map_with_features;

    for (const referenceCase of conditionalSeasonality.cases) {
      const definitions = await Effect.runPromise(parseSeasonalities(referenceCase.seasonalities));

      const layout = await Effect.runPromise(makeSeasonalityLayout(definitions));
      const conditionNames = conditionNamesFromLayout(layout);

      const aligned = await Effect.runPromise(
        alignConditionValues(
          referenceCase.conditionRows.map((conditions) => ({ conditions })),
          conditionNames,
          "prediction-rows",
        ),
      );

      const masks = await Effect.runPromise(createSeasonalityMasks(layout, aligned));
      const rowCount = referenceCase.timestamps.length;
      const columnCount = layout.coefficientCount;

      const manuallyGated = Array.from({ length: rowCount * columnCount }, () => 0);

      const manuallyComputedComponents = Array.from(
        { length: rowCount * layout.components.length },
        () => 0,
      );

      for (let row = 0; row < rowCount; row += 1) {
        for (const [componentIndex, component] of layout.components.entries()) {
          const mask = masks.values[row * layout.components.length + componentIndex] ?? 0;

          let componentValue = 0;

          for (let offset = 0; offset < component.coefficientCount; offset += 1) {
            const column = component.coefficientOffset + offset;

            const feature =
              referenceCase.expected.ungatedFeaturesRowMajor[row * columnCount + column] ?? 0;

            const gated = feature * mask;

            manuallyGated[row * columnCount + column] = gated;
            componentValue += gated * (referenceCase.coefficients[column] ?? 0);
          }

          manuallyComputedComponents[row * layout.components.length + componentIndex] =
            componentValue;
        }
      }

      for (const [index, expected] of referenceCase.expected.gatedFeaturesRowMajor.entries()) {
        expectClose(
          manuallyGated[index] ?? Number.NaN,
          expected,
          referenceCase.tolerance.absolute,
          referenceCase.tolerance.relative,
        );

        if (expected === 0) {
          expect(
            (manuallyGated[index] ?? Number.NaN) === 0,
            `${referenceCase.id} gated feature ${index}`,
          ).toBe(true);
        }
      }

      for (const [index, expected] of referenceCase.expected.componentsRowMajor.entries()) {
        expectClose(
          manuallyComputedComponents[index] ?? Number.NaN,
          expected,
          referenceCase.tolerance.absolute,
          referenceCase.tolerance.relative,
        );
      }

      const timestamps = new Float64Array(
        referenceCase.timestamps.map((timestamp) => Date.parse(timestamp)),
      );

      const packed = predictWithFeatures(
        timestamps,
        0,
        0,
        timestamps[0] ?? 0,
        Math.max(1, (timestamps.at(-1) ?? 0) - (timestamps[0] ?? 0)),
        new Float64Array(),
        new Float64Array(),
        1,
        new Float64Array(definitions.map((definition) => definition.periodDays)),
        new Float64Array(definitions.map((definition) => definition.fourierOrder)),
        new Float64Array(referenceCase.coefficients),
        new Float64Array(masks.values),
        0,
        new Float64Array(),
        new Float64Array(),
        new Float64Array(),
        new Float64Array(),
      );

      expect(packed[0], referenceCase.id).toBe(0);
      const rowWidth = layout.components.length + 3;

      for (let row = 0; row < rowCount; row += 1) {
        for (let component = 0; component < layout.components.length; component += 1) {
          const actual = packed[1 + row * rowWidth + 3 + component] ?? Number.NaN;

          const expected =
            referenceCase.expected.componentsRowMajor[row * layout.components.length + component] ??
            Number.NaN;

          expectClose(
            actual,
            expected,
            referenceCase.tolerance.absolute,
            referenceCase.tolerance.relative,
          );

          if (expected === 0) {
            expect(actual, `${referenceCase.id} component row ${row}`).toBe(0);
          }
        }
      }
    }
  });
});
