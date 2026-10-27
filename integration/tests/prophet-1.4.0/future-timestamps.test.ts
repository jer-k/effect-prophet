import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { makeFutureTimestamps } from "../../../src/index";
import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";

describe("Prophet 1.4.0 make_future_dataframe", () => {
  it("matches release schedules, with and without the history", async () => {
    const { futureTimestamps } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of futureTimestamps.cases) {
      const history = referenceCase.trainingTimestamps.map((timestamp, index) => ({
        timestamp,
        value: index + 1,
      }));

      const timestamps = await Effect.runPromise(
        makeFutureTimestamps(history, {
          periods: referenceCase.periods,
          frequency: referenceCase.freq,
          includeHistory: referenceCase.includeHistory,
        }),
      );

      expect(timestamps, referenceCase.id).toEqual(referenceCase.expectedTimestamps);
    }
  });
});
