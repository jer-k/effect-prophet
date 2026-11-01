import { describe, expect, it } from "vitest";

import { laggedValue, valuesByTimestamp } from "../../src/internal/lagged-value";

describe("valuesByTimestamp", () => {
  it("keeps the last row at a repeated timestamp", () => {
    const values = valuesByTimestamp([
      { timestamp: 0, value: 1 },
      { timestamp: 10, value: 2 },
      { timestamp: 10, value: 3 },
    ]);

    expect([...values]).toEqual([
      [0, 1],
      [10, 3],
    ]);
  });
});

describe("laggedValue", () => {
  const values = valuesByTimestamp([
    { timestamp: 0, value: 1 },
    { timestamp: 10, value: 2 },
    { timestamp: 30, value: 4 },
  ]);

  it("finds only the value observed exactly the lag earlier", () => {
    expect(laggedValue(values, 30, 20)).toBe(2);
    expect(laggedValue(values, 30, 30)).toBe(1);
    expect(laggedValue(values, 30, 10)).toBeUndefined();
    expect(laggedValue(values, 25, 20)).toBeUndefined();
  });

  it("finds nothing when the lagged timestamp is not a safe integer", () => {
    expect(laggedValue(values, -Number.MAX_SAFE_INTEGER, 1)).toBeUndefined();
    expect(laggedValue(values, 30, 0.5)).toBeUndefined();
  });
});
