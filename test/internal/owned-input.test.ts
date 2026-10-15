import { describe, expect, it } from "vitest";

import { copyOwned, freezeOwned } from "../../src/internal/owned-input";

describe("owned input", () => {
  it("skips subtrees it already deep-froze but still traverses merely shallow-frozen ones", () => {
    const trusted = freezeOwned({ partitions: [[1, 2]] });
    const shallow = Object.freeze({ nested: { values: [3] } });
    const tree = freezeOwned({ trusted, shallow, fresh: { values: [4] } });

    expect(tree.trusted).toBe(trusted);
    expect(Object.isFrozen(tree.trusted.partitions[0])).toBe(true);
    expect(Object.isFrozen(tree.shallow.nested.values)).toBe(true);
    expect(Object.isFrozen(tree.fresh.values)).toBe(true);
    expect(Object.isFrozen(tree)).toBe(true);
  });

  it("copies a frozen schema-parsed tree into fresh mutable arrays and objects", () => {
    const owned = freezeOwned({
      name: "snapshot",
      years: [
        [
          [9131, 0],
          [9132, 1],
        ],
        [],
      ],
      coverage: { issues: [{ firstYear: 1995, sources: [{ path: "a.py" }] }], missing: null },
    });

    const copy = copyOwned(owned);

    expect(copy).toEqual(owned);
    expect(copy).not.toBe(owned);
    expect(copy.years[0]).not.toBe(owned.years[0]);
    expect(copy.coverage.issues[0]?.sources[0]).not.toBe(owned.coverage.issues[0]?.sources[0]);
    expect(Object.isFrozen(copy)).toBe(false);
    expect(Object.isFrozen(copy.years[0]?.[0])).toBe(false);
    expect(Array.isArray(copy.years[0]?.[0])).toBe(true);
    expect(copyOwned(undefined)).toBeUndefined();
  });
});
