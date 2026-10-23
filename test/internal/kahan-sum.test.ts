import { describe, expect, it } from "vitest";

import { kahanSum } from "../../src/internal/kahan-sum";

// Expected values are pandas 3.0.5's `groupby(...).agg(["sum", "count"])` in the pinned fixture
// image. A left-to-right sum returns 1e16 for the lone ones, and Neumaier summation returns 2 for
// the cancellation.
describe("pandas grouped Kahan summation", () => {
  it("keeps contributions a plain running sum rounds away", () => {
    expect(kahanSum([1e16, ...Array.from({ length: 15 }, () => 1)], 0, 16)).toBe(
      1.0000000000000016e16,
    );
  });

  it("loses what Kahan's compensation loses, unlike Neumaier summation", () => {
    expect(kahanSum([1, 1e100, 1, -1e100], 0, 4)).toBe(0);
  });

  it("sums only the requested range, starting from positive zero", () => {
    expect(kahanSum([1e100, 0.5, 0.25, 1e100], 1, 3)).toBe(0.75);
    expect(Object.is(kahanSum([-0, -0], 0, 2), 0)).toBe(true);
  });
});
