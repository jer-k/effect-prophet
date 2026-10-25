import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError } from "../../src/errors";
import {
  decodeStanInitialization,
  encodeStanOptimizer,
  stanOptimizerFailure as linearOptimizerFailure,
  wasmMemoryLimitBytes,
} from "../../src/internal/stan-map-protocol";
import { defaultLbfgsSettings, defaultLinearOptimizer } from "../../src/linear-optimizer";

describe("Stan optimizer control frames", () => {
  const warmStart = { k: 0.5, m: -0.25, sigmaObs: 0.1, delta: [0.01, 0.02], beta: [0.3] };
  const lbfgs = Object.values(defaultLbfgsSettings);

  it("keeps version two when Prophet's initialization applies", () => {
    expect(Array.from(encodeStanOptimizer({ algorithm: "newton", maxIterations: 50 }))).toEqual([
      2, 1, 50,
    ]);
    expect(Array.from(encodeStanOptimizer(defaultLinearOptimizer))).toEqual([
      2,
      0,
      10_000,
      1,
      ...lbfgs,
    ]);
  });

  it("appends a counted warm start after the algorithm's controls", () => {
    const init = [0.5, -0.25, 0.1, 2, 0.01, 0.02, 1, 0.3];

    expect(
      Array.from(encodeStanOptimizer({ algorithm: "newton", maxIterations: 50 }, warmStart)),
    ).toEqual([3, 1, 50, ...init]);
    expect(Array.from(encodeStanOptimizer(defaultLinearOptimizer, warmStart))).toEqual([
      3,
      0,
      10_000,
      1,
      ...lbfgs,
      ...init,
    ]);
  });

  it.each([
    { codes: [0, 0], expected: null },
    { codes: [1, 1], expected: { delta: "warm-start", beta: "warm-start" } },
    { codes: [2, 1], expected: { delta: "default", beta: "warm-start" } },
    { codes: [1, 2], expected: { delta: "warm-start", beta: "default" } },
    { codes: [0, 1], expected: undefined },
    { codes: [3, 1], expected: undefined },
    { codes: [1], expected: undefined },
  ])("decodes initialization codes $codes", ({ codes, expected }) => {
    expect(decodeStanInitialization(new Float64Array([9, ...codes]), 1)).toEqual(expected);
  });
});

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
      expect(failure.reason).toBe("backend-failure");
      expect(failure.backendPhase).toBe("execute");
      expect(failure.cause).toEqual({ first, fallback });
    },
  );

  it.each([
    {
      frame: [11, 7, 2053, 0, -1],
      first: { reason: "workspace-allocation", parameterCount: 2053 },
      fallback: null,
    },
    {
      frame: [11, 6, 34, 7, 2053],
      first: { reason: "line-search-failure", iterations: 34 },
      fallback: { reason: "workspace-allocation", parameterCount: 2053 },
    },
  ])(
    "reports Newton workspace exhaustion as a memory limit: $frame",
    async ({ frame, first, fallback }) => {
      const failure = await Effect.runPromise(
        Effect.flip(linearOptimizerFailure(new Float64Array(frame), 4, "flat")),
      );

      expect(failure).toBeInstanceOf(FittingError);
      expect(failure.reason).toBe("memory-limit");
      expect(failure.parameterCount).toBe(2053);
      expect(failure.memoryLimitBytes).toBe(wasmMemoryLimitBytes);
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
      [11, 7, 0, 0, -1],
      [11, 7, 1.5, 0, -1],
      [11, 8, 1, 0, -1],
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
