import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  createRegressorFeatures,
  resolveRegressorFeatures,
} from "../../src/internal/regressor-features";
import { parseRegressorDefinitions } from "../../src/regressor";

const definitions = (input: Parameters<typeof parseRegressorDefinitions>[0]) =>
  Effect.runSync(parseRegressorDefinitions(input));

describe("regressor feature preprocessing", () => {
  it("resolves binary, constant, disabled, and standardized transforms from training only", async () => {
    const resolved = await Effect.runPromise(
      resolveRegressorFeatures(
        definitions([
          { name: "binary" },
          { name: "constant", standardization: "always" },
          { name: "raw", standardization: "never" },
          { name: "numeric" },
        ]),
        [
          [0, 7, -2, 10],
          [1, 7, 3, 12],
          [0, 7, 9, 14],
        ],
      ),
    );

    expect(resolved.regressors.map((regressor) => regressor.transform)).toEqual([
      { mode: "identity", reason: "binary" },
      { mode: "identity", reason: "constant" },
      { mode: "identity", reason: "disabled" },
      { mode: "standardized", mean: 12, sampleStandardDeviation: 2 },
    ]);
    expect(Array.from(resolved.features.matrix.values)).toEqual([
      0, 7, -2, -1, 1, 7, 3, 0, 0, 7, 9, 1,
    ]);
    expect(resolved.features.layout.priorScales).toEqual([10, 10, 10, 10]);
  });

  it("reuses stored transforms for future values outside the training range", async () => {
    const resolved = await Effect.runPromise(
      resolveRegressorFeatures(definitions([{ name: "price" }]), [[10], [12], [14]]),
    );

    const future = await Effect.runPromise(
      createRegressorFeatures(resolved.regressors, [[20], [4]]),
    );

    expect(Array.from(future.matrix.values)).toEqual([4, -4]);
    expect(resolved.regressors[0]?.transform).toEqual({
      mode: "standardized",
      mean: 12,
      sampleStandardDeviation: 2,
    });
  });

  it("keeps two-valued nonbinary columns standardized", async () => {
    const resolved = await Effect.runPromise(
      resolveRegressorFeatures(definitions([{ name: "switch" }]), [[-1], [2], [-1], [2]]),
    );

    expect(resolved.regressors[0]?.transform.mode).toBe("standardized");
  });
});
