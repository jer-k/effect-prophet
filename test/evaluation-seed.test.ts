import { describe, expect, it } from "vitest";

import { deriveEvaluationFoldSeed, evaluationSeedSchedule } from "../src/evaluation-seed";

const cutoffs = [Date.parse("2024-01-10T00:00:00.000Z"), Date.parse("2024-01-17T00:00:00.000Z")];

const plan = { horizonMs: 604_800_000, cutoffs };

describe("versioned evaluation seed schedule", () => {
  it("matches the frozen FNV-1a v1 byte-stream vectors", () => {
    expect(evaluationSeedSchedule).toBe("effect-prophet-eval-seed-v1");
    expect(deriveEvaluationFoldSeed(0, plan, "", cutoffs[0] ?? NaN)).toBe(3_165_536_520);
    expect(deriveEvaluationFoldSeed(19, plan, "cp-0.10", cutoffs[1] ?? NaN)).toBe(4_063_750_176);
  });

  it("binds complete plan, simulation version and candidate identity without order-dependent state", () => {
    const first = deriveEvaluationFoldSeed(19, plan, "cp-0.10", cutoffs[1] ?? NaN);

    expect(deriveEvaluationFoldSeed(19, plan, "cp-0.10", cutoffs[1] ?? NaN)).toBe(first);
    expect(deriveEvaluationFoldSeed(19, plan, "", cutoffs[1] ?? NaN)).not.toBe(first);
    expect(
      deriveEvaluationFoldSeed(
        19,
        { ...plan, cutoffs: cutoffs.slice(1) },
        "cp-0.10",
        cutoffs[1] ?? NaN,
      ),
    ).not.toBe(first);
    expect(
      deriveEvaluationFoldSeed(
        19,
        { ...plan, horizonMs: 604_800_001 },
        "cp-0.10",
        cutoffs[1] ?? NaN,
      ),
    ).not.toBe(first);
  });

  it("rejects unsafe numbers before converting to signed 64-bit bytes", () => {
    expect(deriveEvaluationFoldSeed(-1, plan, "", cutoffs[0] ?? NaN)).toBeUndefined();
    expect(deriveEvaluationFoldSeed(2 ** 32, plan, "", cutoffs[0] ?? NaN)).toBeUndefined();
    expect(
      deriveEvaluationFoldSeed(0, { ...plan, horizonMs: 1.5 }, "", cutoffs[0] ?? NaN),
    ).toBeUndefined();
    expect(
      deriveEvaluationFoldSeed(
        0,
        { ...plan, cutoffs: [Number.MAX_SAFE_INTEGER + 1] },
        "",
        Number.MAX_SAFE_INTEGER + 1,
      ),
    ).toBeUndefined();
  });
});
