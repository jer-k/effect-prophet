import { Effect, Schema } from "effect";

import type { EventCalendar } from "../event";
import {
  createAdditionalFeatureMatrix,
  type AdditionalFeatureMatrix,
  type InvalidAdditionalFeatures,
} from "./additional-features";
import { checkedElementCount } from "./safe-arithmetic";
import { millisecondsPerDay } from "./time";

/** Failure while aligning timestamps to a parsed event calendar. */
export class EventFeatureError extends Schema.TaggedError<EventFeatureError>()(
  "EventFeatureError",
  {
    row: Schema.optionalKey(Schema.Natural),
    message: Schema.String,
  },
) {}

const matrixError = (error: InvalidAdditionalFeatures): EventFeatureError =>
  new EventFeatureError({ message: error.message });

/** Build stable row-major binary indicators for timestamps against a fitted event calendar. */
export const createEventFeatures = (
  epochMilliseconds: ReadonlyArray<number> | Float64Array,
  calendar: EventCalendar,
): Effect.Effect<AdditionalFeatureMatrix, EventFeatureError> => {
  const columnCount = calendar.columns.length;
  const elementCount = checkedElementCount(epochMilliseconds.length, columnCount);

  if (elementCount === undefined) {
    return Effect.fail(
      new EventFeatureError({ message: "Event feature dimensions exceed safe arithmetic" }),
    );
  }

  const values = new Float64Array(elementCount);

  for (const occurrence of calendar.occurrences) {
    if (
      !Number.isSafeInteger(occurrence.epochDay + occurrence.lowerWindowDays) ||
      !Number.isSafeInteger(occurrence.epochDay + occurrence.upperWindowDays)
    ) {
      return Effect.fail(
        new EventFeatureError({ message: "Event window exceeds safe epoch-day arithmetic" }),
      );
    }
  }

  const rowsByDay = new Map<number, Array<number>>();

  for (let row = 0; row < epochMilliseconds.length; row += 1) {
    const timestamp = epochMilliseconds[row];

    if (
      timestamp === undefined ||
      !Number.isFinite(timestamp) ||
      !Number.isSafeInteger(timestamp)
    ) {
      return Effect.fail(
        new EventFeatureError({
          row,
          message: "Event feature timestamps must be finite safe integers",
        }),
      );
    }

    const epochDay = Math.floor(timestamp / millisecondsPerDay);

    const rows = rowsByDay.get(epochDay);

    if (rows === undefined) {
      rowsByDay.set(epochDay, [row]);
    } else {
      rows.push(row);
    }
  }

  const occurrencesByName = new Map<string, Array<EventCalendar["occurrences"][number]>>();

  for (const occurrence of calendar.occurrences) {
    const occurrences = occurrencesByName.get(occurrence.name);

    if (occurrences === undefined) {
      occurrencesByName.set(occurrence.name, [occurrence]);
    } else {
      occurrences.push(occurrence);
    }
  }

  for (const [columnIndex, column] of calendar.columns.entries()) {
    for (const occurrence of occurrencesByName.get(column.eventName) ?? []) {
      if (
        column.offsetDays < occurrence.lowerWindowDays ||
        column.offsetDays > occurrence.upperWindowDays
      ) {
        continue;
      }

      // Duplicate rows and simultaneous occurrences remain binary, in caller row order.
      for (const row of rowsByDay.get(occurrence.epochDay + column.offsetDays) ?? []) {
        values[row * columnCount + columnIndex] = 1;
      }
    }
  }

  return createAdditionalFeatureMatrix(epochMilliseconds.length, columnCount, values).pipe(
    Effect.mapError(matrixError),
  );
};
