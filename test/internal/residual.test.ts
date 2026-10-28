import { describe, expect, it } from "vitest";

import { residualOf } from "../../src/internal/residual";

describe("residualOf", () => {
  it("subtracts the prediction from the observation", () => {
    expect(residualOf(5, 3)).toBe(2);
    expect(residualOf(3, 5)).toBe(-2);
    expect(residualOf(4, 4)).toBe(0);
  });

  it("rejects finite inputs whose difference overflows", () => {
    expect(residualOf(Number.MAX_VALUE, -Number.MAX_VALUE)).toBeUndefined();
    expect(residualOf(-Number.MAX_VALUE, Number.MAX_VALUE)).toBeUndefined();
  });
});
