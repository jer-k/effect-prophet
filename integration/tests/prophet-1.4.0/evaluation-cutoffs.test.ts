import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { planRollingOrigin } from "../../../src/index";
import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";

describe("Prophet 1.4.0 generated rolling-origin cutoffs", () => {
  it("matches release daily, subdaily and irregular-gap cutoff/fold records", async () => {
    const { evaluationCutoffs } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of evaluationCutoffs.cases) {
      const observations = referenceCase.trainingTimestamps.map((timestamp, index) => ({
        timestamp,
        value: index + 1,
      }));

      const result = await Effect.runPromise(
        planRollingOrigin(
          observations,
          {},
          {
            horizonMs: referenceCase.horizonMs,
            cutoffs: {
              mode: "generated",
              initialMs: referenceCase.initialMs,
              periodMs: referenceCase.periodMs,
            },
          },
        ),
      );

      expect(result.cutoffs, referenceCase.id).toEqual(
        referenceCase.expectedCutoffs.map((timestamp) => Date.parse(timestamp)),
      );
      expect(
        result.folds.map(({ trainingCount, assessmentCount }) => ({
          training: trainingCount,
          assessment: assessmentCount,
        })),
        referenceCase.id,
      ).toEqual(referenceCase.expectedFoldCounts);
    }
  });
});
