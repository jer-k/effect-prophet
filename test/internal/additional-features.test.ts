import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseFeatureName } from "../../src/feature-name";
import {
  InvalidAdditionalFeatures,
  createAdditionalFeatureLayout,
  createAdditionalFeatureMatrix,
  createSeasonalityMaskMatrix,
} from "../../src/internal/additional-features";

describe("additional feature contracts", () => {
  it("copies matrix buffers and constructs contiguous layouts", async () => {
    const launch = await Effect.runPromise(parseFeatureName("launch"));
    const source = new Float64Array([1, 0, 0, 1]);
    const matrix = await Effect.runPromise(createAdditionalFeatureMatrix(2, 2, source));

    const layout = await Effect.runPromise(
      createAdditionalFeatureLayout(
        [
          {
            kind: "event",
            name: launch,
            coefficientOffset: 0,
            coefficientCount: 2,
            mode: "additive",
          },
        ],
        [1, 2],
      ),
    );

    source[0] = 0;

    expect(Array.from(matrix.values)).toEqual([1, 0, 0, 1]);
    expect(layout.coefficientCount).toBe(2);
    expect(Object.isFrozen(layout.components[0])).toBe(true);
  });

  it("rejects layout gaps, invalid priors, malformed matrices, and non-binary masks", async () => {
    const launch = await Effect.runPromise(parseFeatureName("launch"));

    const failures: ReadonlyArray<Effect.Effect<unknown, InvalidAdditionalFeatures>> = [
      createAdditionalFeatureLayout(
        [
          {
            kind: "event",
            name: launch,
            coefficientOffset: 1,
            coefficientCount: 1,
            mode: "additive",
          },
        ],
        [1],
      ),
      createAdditionalFeatureLayout(
        [
          {
            kind: "event",
            name: launch,
            coefficientOffset: 0,
            coefficientCount: 1,
            mode: "additive",
          },
        ],
        [0],
      ),
      createAdditionalFeatureMatrix(2, 2, [1, 2, 3]),
      createSeasonalityMaskMatrix(1, 1, [2]),
    ];

    for (const failure of failures) {
      const error = await Effect.runPromise(Effect.flip(failure));

      expect(error).toBeInstanceOf(InvalidAdditionalFeatures);
    }
  });
});
