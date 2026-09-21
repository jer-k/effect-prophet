import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  InvalidConditionValues,
  alignConditionValues,
  conditionNamesFromLayout,
  makeConditionValues,
  type ConditionValues,
} from "../../src/condition";
import { createSeasonalityMasks } from "../../src/internal/seasonality-masks";
import { makeSeasonalityLayout, parseSeasonalities } from "../../src/seasonality";

const makeLayout = async () => {
  const definitions = await Effect.runPromise(
    parseSeasonalities([
      { name: "unconditional", periodDays: 3, fourierOrder: 1 },
      { name: "weekly-on", periodDays: 7, fourierOrder: 2, conditionName: "onSeason" },
      { name: "daily-on", periodDays: 1, fourierOrder: 1, conditionName: "onSeason" },
      {
        name: "weekly-promotion",
        periodDays: 7,
        fourierOrder: 1,
        conditionName: "promotion",
      },
    ]),
  );

  return Effect.runPromise(makeSeasonalityLayout(definitions));
};

describe("seasonality masks", () => {
  it("gates components by shared and independent conditions without changing layout", async () => {
    const layout = await makeLayout();
    const names = conditionNamesFromLayout(layout);

    const conditions = await Effect.runPromise(
      alignConditionValues(
        [
          { conditions: { onSeason: true, promotion: false } },
          { conditions: { onSeason: false, promotion: true } },
        ],
        names,
        "observations",
      ),
    );

    const masks = await Effect.runPromise(createSeasonalityMasks(layout, conditions));

    expect(layout.coefficientCount).toBe(10);
    expect(masks.rowCount).toBe(2);
    expect(masks.componentCount).toBe(4);
    expect(Array.from(masks.values)).toEqual([1, 1, 1, 0, 1, 0, 0, 1]);
  });

  it("is deterministic and equivariant when complete rows are permuted", async () => {
    const layout = await makeLayout();
    const names = conditionNamesFromLayout(layout);

    const rows = [
      { conditions: { onSeason: true, promotion: false } },
      { conditions: { onSeason: false, promotion: false } },
      { conditions: { onSeason: true, promotion: true } },
    ] as const;

    const originalConditions = await Effect.runPromise(
      alignConditionValues(rows, names, "observations"),
    );

    const repeated = await Effect.runPromise(createSeasonalityMasks(layout, originalConditions));

    const repeatedAgain = await Effect.runPromise(
      createSeasonalityMasks(layout, originalConditions),
    );

    const permutedConditions = await Effect.runPromise(
      alignConditionValues([rows[2], rows[0], rows[1]], names, "observations"),
    );

    const permuted = await Effect.runPromise(createSeasonalityMasks(layout, permutedConditions));
    const width = layout.components.length;

    const originalRows = Array.from({ length: rows.length }, (_, index) =>
      Array.from(repeated.values.slice(index * width, (index + 1) * width)),
    );

    expect(Array.from(repeatedAgain.values)).toEqual(Array.from(repeated.values));
    expect(Array.from(permuted.values)).toEqual(
      [2, 0, 1].flatMap((index) => originalRows[index] ?? []),
    );
  });

  it("returns correctly dimensioned empty matrices", async () => {
    const definitions = await Effect.runPromise(parseSeasonalities([]));
    const layout = await Effect.runPromise(makeSeasonalityLayout(definitions));
    const noRows = await Effect.runPromise(makeConditionValues([], 0, []));
    const threeRows = await Effect.runPromise(makeConditionValues([], 3, []));

    const empty = await Effect.runPromise(createSeasonalityMasks(layout, noRows));

    const rowsOnly = await Effect.runPromise(createSeasonalityMasks(layout, threeRows));

    expect(empty).toMatchObject({ rowCount: 0, componentCount: 0 });
    expect(rowsOnly).toMatchObject({ rowCount: 3, componentCount: 0 });
    expect(rowsOnly.values).toHaveLength(0);
  });

  it("rejects missing names, extra names, malformed buffers, and non-binary buffers", async () => {
    const layout = await makeLayout();
    const names = conditionNamesFromLayout(layout);

    const valid = await Effect.runPromise(makeConditionValues(names, 1, [1, 0]));
    const promotion = names[1];

    if (promotion === undefined) {
      throw new Error("Expected the promotion condition");
    }

    const forgedValues = new Uint8Array([2, 0]);
    const forged: ConditionValues = { ...valid, values: forgedValues };

    const missing = await Effect.runPromise(makeConditionValues([promotion], 1, [1]));

    for (const effect of [
      createSeasonalityMasks(layout, forged),
      createSeasonalityMasks(layout, missing),
    ]) {
      const error = await Effect.runPromise(Effect.flip(effect));

      expect(error).toBeInstanceOf(InvalidConditionValues);
    }
  });
});
