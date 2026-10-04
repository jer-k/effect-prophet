import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError } from "../../src/errors";
import { stanOptimizerFailure as linearOptimizerFailure } from "../../src/internal/stan-map-protocol";

describe("linear optimizer failure protocol", () => {
  it.each([
    {
      frame: [11, 6, 34, 0, -1],
      first: { reason: "line-search-failure", iterations: 34 },
      fallback: null,
    },
    {
      frame: [11, 5, -1, 4, -1],
      first: { reason: "non-finite-result", iterations: null },
      fallback: { reason: "curvature-failure", iterations: null },
    },
  ])(
    "preserves both attempts without inventing unknown work: $frame",
    async ({ frame, first, fallback }) => {
      const failure = await Effect.runPromise(
        Effect.flip(linearOptimizerFailure(new Float64Array(frame), 100)),
      );

      expect(failure).toBeInstanceOf(FittingError);
      expect(failure.backendPhase).toBe("execute");
      expect(failure.cause).toEqual({ first, fallback });
    },
  );

  it.each(
    [
      [11],
      [11, 6, 1, 0],
      [11, 6, 1, 0, -1, 0],
      [11, 0, -1, 0, -1],
      [11, 1.5, -1, 0, -1],
      [11, 7, -1, 0, -1],
      [11, 6, -2, 0, -1],
      [11, 6, 1.5, 0, -1],
      [11, 6, Number.POSITIVE_INFINITY, 0, -1],
      [11, 6, Number.MAX_SAFE_INTEGER + 1, 0, -1],
      [11, 6, 1, 7, -1],
      [11, 6, 1, 0, 1],
      [11, 6, 1, 4, Number.NaN],
    ].map((frame) => ({ frame })),
  )("rejects malformed evidence %# without a runtime cause", async ({ frame }) => {
    const failure = await Effect.runPromise(
      Effect.flip(linearOptimizerFailure(new Float64Array(frame), 100)),
    );

    expect(failure.backendPhase).toBe("protocol");
    expect(failure.cause).toBeUndefined();
  });
});
