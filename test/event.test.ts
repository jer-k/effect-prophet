import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { InvalidEventCalendar, parseEventCalendar } from "../src/event";

describe("event calendar", () => {
  it("parses dates, unions windows, and follows Python lexical column ordering", async () => {
    const calendar = await Effect.runPromise(
      parseEventCalendar([
        { name: "launch", date: "2024-02-29", lowerWindowDays: -1, upperWindowDays: 2 },
        { name: "launch", date: "2025-02-28", lowerWindowDays: -1, upperWindowDays: 10 },
      ]),
    );

    expect(calendar.columns.map((column) => column.offsetDays)).toEqual([
      0, 1, 10, 2, 3, 4, 5, 6, 7, 8, 9, -1,
    ]);
    expect(calendar.layout.components).toEqual([
      {
        kind: "event",
        name: "launch",
        coefficientOffset: 0,
        coefficientCount: 12,
        mode: "additive",
      },
    ]);
    expect(calendar.layout.priorScales).toEqual(Array.from({ length: 12 }, () => 10));
    expect(Object.isFrozen(calendar)).toBe(true);
  });

  it("deduplicates exact occurrences and rejects inconsistent priors", async () => {
    const calendar = await Effect.runPromise(
      parseEventCalendar([
        { name: "launch", date: "2024-01-01" },
        { name: "launch", date: "2024-01-01" },
      ]),
    );

    expect(calendar.occurrences).toHaveLength(1);
    expect(calendar.columns).toHaveLength(1);

    const error = await Effect.runPromise(
      Effect.flip(
        parseEventCalendar([
          { name: "launch", date: "2024-01-01", priorScale: 1 },
          { name: "launch", date: "2025-01-01", priorScale: 2 },
        ]),
      ),
    );

    expect(error).toBeInstanceOf(InvalidEventCalendar);
    expect(error.issues[0]?.path).toEqual([1, "priorScale"]);
  });

  it.each(["2023-02-29", "2024-2-01", "2024-13-01"])(
    "rejects malformed Gregorian date %s",
    async (date) => {
      const error = await Effect.runPromise(
        Effect.flip(parseEventCalendar([{ name: "launch", date }])),
      );

      expect(error).toBeInstanceOf(InvalidEventCalendar);
      expect(error.issues[0]?.path).toEqual([0, "date"]);
    },
  );
});
