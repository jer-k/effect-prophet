import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { parseEventCalendar } from "../../src/event";
import { createEventFeatures } from "../../src/internal/event-features";

describe("event feature construction", () => {
  it("indexes long multi-year histories without changing binary window semantics", async () => {
    const epoch = Date.parse("2000-01-01T00:00:00Z");

    const events = Array.from({ length: 800 }, (_, index) => ({
      name: `event-${index % 16}`,
      date: new Date(epoch + index * 7 * 86_400_000).toISOString().slice(0, 10),
      lowerWindowDays: -1,
      upperWindowDays: 2,
    }));

    const calendar = await Effect.runPromise(parseEventCalendar(events));

    const timestamps = Array.from(
      { length: 10_000 },
      (_, index) => epoch + ((index * 31) % 6_000) * 86_400_000 + 43_200_000,
    );

    const matrix = await Effect.runPromise(createEventFeatures(timestamps, calendar));

    expect(matrix.rowCount).toBe(10_000);
    expect(matrix.columnCount).toBe(64);

    for (let row = 0; row < timestamps.length; row += 79) {
      const timestamp = timestamps[row];

      if (timestamp === undefined) throw new Error("Expected test row");
      const day = Math.floor(timestamp / 86_400_000);

      for (const [columnIndex, column] of calendar.columns.entries()) {
        const expected = calendar.occurrences.some(
          (occurrence) =>
            occurrence.name === column.eventName &&
            column.offsetDays >= occurrence.lowerWindowDays &&
            column.offsetDays <= occurrence.upperWindowDays &&
            day === occurrence.epochDay + column.offsetDays,
        );

        expect(matrix.values[row * matrix.columnCount + columnIndex]).toBe(expected ? 1 : 0);
      }
    }
  });

  it("preserves typed unsafe arithmetic and invalid timestamp failures", async () => {
    const calendar = await Effect.runPromise(
      parseEventCalendar([{ name: "event", date: "2024-01-01", upperWindowDays: 1 }]),
    );

    const occurrence = calendar.occurrences[0];

    if (occurrence === undefined) throw new Error("Expected test occurrence");

    expect(
      await Effect.runPromise(
        Effect.flip(
          createEventFeatures([0], {
            ...calendar,
            occurrences: [{ ...occurrence, epochDay: Number.MAX_SAFE_INTEGER }],
          }),
        ),
      ),
    ).toMatchObject({
      message: "Event window exceeds safe epoch-day arithmetic",
    });

    expect(
      await Effect.runPromise(Effect.flip(createEventFeatures([0, NaN], calendar))),
    ).toMatchObject({ row: 1 });
  });
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
