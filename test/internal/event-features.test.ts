import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseEventCalendar } from "../../src/event";
import { createEventFeatures } from "../../src/internal/event-features";

describe("event feature construction", () => {
  it("uses UTC calendar days for subdaily, pre-epoch, and duplicate rows", async () => {
    const calendar = await Effect.runPromise(
      parseEventCalendar([
        { name: "launch", date: "1970-01-01", lowerWindowDays: -1, upperWindowDays: 1 },
      ]),
    );

    const timestamps = [
      Date.parse("1969-12-31T23:59:59.999Z"),
      Date.parse("1970-01-01T00:00:00.000Z"),
      Date.parse("1970-01-01T18:00:00.000Z"),
      Date.parse("1970-01-02T00:00:00.000Z"),
      Date.parse("1970-01-01T00:00:00.000Z"),
    ];

    const matrix = await Effect.runPromise(createEventFeatures(timestamps, calendar));

    expect(calendar.columns.map((column) => column.offsetDays)).toEqual([0, 1, -1]);
    expect(Array.from(matrix.values)).toEqual([0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0]);
  });

  it("copies its successful matrix buffer", async () => {
    const calendar = await Effect.runPromise(
      parseEventCalendar([{ name: "launch", date: "2024-01-01" }]),
    );

    const matrix = await Effect.runPromise(
      createEventFeatures([Date.parse("2024-01-01T00:00:00.000Z")], calendar),
    );

    expect(matrix.rowCount).toBe(1);
    expect(matrix.columnCount).toBe(1);
    expect(matrix.values[0]).toBe(1);
  });
});
