import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  InvalidEventCalendar,
  eventCalendarFromOccurrences,
  mergeEventOccurrences,
  parseEventCalendar,
} from "../src/event";

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

  it("builds the parser's exact calendar from already-parsed occurrences", async () => {
    const encoded = [
      { name: "launch", date: "2024-01-01", lowerWindowDays: -1, upperWindowDays: 1 },
      { name: "Festival (observed)", date: "2024-01-03" },
      { name: "Festival", date: "2024-01-02", priorScale: 3 },
      { name: "launch", date: "2024-01-01", lowerWindowDays: -1, upperWindowDays: 1 },
    ];

    for (const mode of ["additive", "multiplicative"] as const) {
      const parsed = await Effect.runPromise(parseEventCalendar(encoded, mode));
      const built = await Effect.runPromise(eventCalendarFromOccurrences(parsed.occurrences, mode));

      expect(built).toEqual(parsed);
      expect(Object.isFrozen(built)).toBe(true);
    }

    const empty = await Effect.runPromise(eventCalendarFromOccurrences([], "additive"));
    expect(empty).toBe(await Effect.runPromise(parseEventCalendar([])));

    const parsed = await Effect.runPromise(parseEventCalendar(encoded));
    const [first] = parsed.occurrences;

    if (first === undefined) throw new Error("Expected a parsed occurrence");

    const conflict = await Effect.runPromise(
      Effect.flip(eventCalendarFromOccurrences([first, { ...first, priorScale: 2 }], "additive")),
    );

    expect(conflict.issues).toEqual([
      { path: [1, "priorScale"], message: "Event 'launch' must use one consistent prior scale" },
    ]);
  });

  it("merges parsed occurrences under the parser's prior and duplicate rules", async () => {
    const encoded = [
      { name: "launch", date: "2024-01-01" },
      { name: "promo", date: "2024-01-02", upperWindowDays: 1, priorScale: 3 },
      { name: "launch", date: "2024-01-01" },
      { name: "launch", date: "2024-01-01", upperWindowDays: 1 },
    ];

    const parsed = await Effect.runPromise(parseEventCalendar(encoded));
    // The parser already dropped the exact duplicate at index 2.
    const [first, second, third] = parsed.occurrences;

    if (first === undefined || second === undefined || third === undefined)
      throw new Error("Expected parsed occurrences");

    const merged = await Effect.runPromise(
      mergeEventOccurrences([first, second, first, third, second]),
    );

    expect(merged).toEqual(parsed.occurrences);
    expect(merged[0]).toBe(first);
    expect(Object.isFrozen(merged)).toBe(true);

    const conflict = await Effect.runPromise(
      Effect.flip(mergeEventOccurrences([first, second, { ...second, priorScale: 4 }])),
    );

    expect(conflict).toBeInstanceOf(InvalidEventCalendar);
    expect(conflict.issues).toEqual([
      { path: [2, "priorScale"], message: "Event 'promo' must use one consistent prior scale" },
    ]);
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
