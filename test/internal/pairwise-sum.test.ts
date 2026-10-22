import { describe, expect, it } from "vitest";

import { pairwiseSum } from "../../src/internal/pairwise-sum";

const ones = (count: number) => Array.from({ length: count }, () => 1);

// Expected values are numpy 2.5.3's `ndarray.sum` in the pinned benchmark image. A left-to-right
// sum returns 1e16 for every large case, because each lone 1 rounds away.
describe("numpy pairwise summation", () => {
  it("sums fewer than eight values in order", () => {
    expect(pairwiseSum([0.1, 0.2, 0.3, 0.4, 0.5])).toBe(1.5);
  });

  it("accumulates a block in eight interleaved lanes", () => {
    expect(pairwiseSum([1e16, ...ones(15)])).toBe(1.0000000000000014e16);
  });

  it("adds the values past the last full set of lanes one at a time", () => {
    expect(pairwiseSum([1e16, ...ones(12)])).toBe(1.0000000000000008e16);
  });

  it("splits inputs longer than one block in half recursively", () => {
    expect(pairwiseSum([1e16, ...ones(299)])).toBe(1.000000000000029e16);
  });

  it("starts from numpy's additive identity", () => {
    expect(Object.is(pairwiseSum([-0, -0]), 0)).toBe(true);
    expect(pairwiseSum([])).toBe(0);
  });
});
