import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { resolveRegressorFeatures } from "../../../src/internal/regressor-features";
import { parseRegressorDefinitions } from "../../../src/regressor";

describe("Prophet 1.4.0 regressor standardization compatibility", () => {
  it("reproduces pandas' statistics and standardized columns bit for bit", async () => {
    const { regressorStandardization } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of regressorStandardization.cases) {
      const definitions = await Effect.runPromise(
        parseRegressorDefinitions(
          referenceCase.regressors.map(({ name, standardization }) => ({ name, standardization })),
        ),
      );

      const rows = referenceCase.observations.map((observation) =>
        referenceCase.regressors.map(({ name }) => observation.regressors[name] ?? Number.NaN),
      );

      const resolved = await Effect.runPromise(resolveRegressorFeatures(definitions, rows));

      for (const [index, expected] of referenceCase.regressors.entries()) {
        const label = `${referenceCase.id} ${expected.name}`;
        const transform = resolved.regressors[index]?.transform;

        if (transform?.mode === "standardized") {
          expect(transform.mean, `${label} mean`).toBe(expected.mean);
          expect(transform.sampleStandardDeviation, `${label} std`).toBe(
            expected.standardDeviation,
          );
        } else {
          // Prophet records mu = 0 and std = 1 for columns it leaves unchanged.
          expect([expected.mean, expected.standardDeviation], label).toEqual([0, 1]);
        }

        const column = rows.map(
          (_, row) =>
            resolved.features.matrix.values[row * referenceCase.regressors.length + index],
        );

        expect(column, `${label} standardized values`).toEqual(expected.standardizedValues);
      }
    }
  });
});
