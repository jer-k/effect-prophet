import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  InvalidConditionValues,
  alignConditionValues,
  conditionNamesFromDefinitions,
  makeConditionValues,
} from "../src/condition";
import { parseSeasonalities } from "../src/seasonality";

describe("condition values", () => {
  it("deduplicates shared condition names in first-seasonality order", async () => {
    const definitions = await Effect.runPromise(
      parseSeasonalities([
        {
          name: "weekly-on",
          periodDays: 7,
          fourierOrder: 1,
          conditionName: "onSeason",
        },
        {
          name: "daily-on",
          periodDays: 1,
          fourierOrder: 1,
          conditionName: "onSeason",
        },
        {
          name: "weekly-promotion",
          periodDays: 7,
          fourierOrder: 1,
          conditionName: "promotion",
        },
      ]),
    );

    expect(conditionNamesFromDefinitions(definitions)).toEqual(["onSeason", "promotion"]);
  });

  it("aligns actual booleans without truthiness coercion", async () => {
    const definitions = await Effect.runPromise(
      parseSeasonalities([
        { name: "weekly-on", periodDays: 7, fourierOrder: 1, conditionName: "onSeason" },
        {
          name: "weekly-promotion",
          periodDays: 7,
          fourierOrder: 1,
          conditionName: "promotion",
        },
      ]),
    );

    const names = conditionNamesFromDefinitions(definitions);

    const values = await Effect.runPromise(
      alignConditionValues(
        [
          { conditions: { promotion: false, onSeason: true } },
          { conditions: { onSeason: false, promotion: true } },
        ],
        names,
        "observations",
      ),
    );

    expect(values.names).toEqual(["onSeason", "promotion"]);
    expect(Array.from(values.values)).toEqual([1, 0, 0, 1]);
    expect(Object.isFrozen(values.names)).toBe(true);
  });

  it("rejects missing and extra names with indexed semantic paths", async () => {
    const definitions = await Effect.runPromise(
      parseSeasonalities([
        { name: "weekly-on", periodDays: 7, fourierOrder: 1, conditionName: "onSeason" },
      ]),
    );

    const names = conditionNamesFromDefinitions(definitions);

    const error = await Effect.runPromise(
      Effect.flip(alignConditionValues([{ conditions: { typo: true } }], names, "prediction-rows")),
    );

    expect(error).toBeInstanceOf(InvalidConditionValues);
    expect(error.issues).toEqual([
      {
        path: [0, "conditions", "onSeason"],
        message: "Missing required condition 'onSeason'",
      },
      {
        path: [0, "conditions", "typo"],
        message: "Unexpected condition 'typo'",
      },
    ]);
  });

  it("accepts omitted or empty maps only for an empty configured set", async () => {
    const omitted = await Effect.runPromise(alignConditionValues([{}, {}], [], "observations"));

    const empty = await Effect.runPromise(
      alignConditionValues([{ conditions: {} }], [], "prediction-rows"),
    );

    expect(omitted.rowCount).toBe(2);
    expect(omitted.values).toHaveLength(0);
    expect(empty.rowCount).toBe(1);
  });

  it("rejects malformed internal dimensions and non-binary values", async () => {
    const definitions = await Effect.runPromise(
      parseSeasonalities([
        { name: "weekly-on", periodDays: 7, fourierOrder: 1, conditionName: "onSeason" },
      ]),
    );

    const names = conditionNamesFromDefinitions(definitions);

    for (const effect of [makeConditionValues(names, 2, [1]), makeConditionValues(names, 1, [2])]) {
      const error = await Effect.runPromise(Effect.flip(effect));

      expect(error).toBeInstanceOf(InvalidConditionValues);
    }
  });
});
