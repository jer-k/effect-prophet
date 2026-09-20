import { Effect, Schema } from "effect";

import type { EventCalendar } from "../event";
import {
  createAdditionalFeatureMatrix,
  type AdditionalFeatureMatrix,
  type InvalidAdditionalFeatures,
} from "./additional-features";

const millisecondsPerDay = 86_400_000;

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
  const elementCount = epochMilliseconds.length * columnCount;

  if (!Number.isSafeInteger(elementCount)) {
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

    for (const [columnIndex, column] of calendar.columns.entries()) {
      // A column at offset o is active when this row's day equals occurrence day + o.
      const matchingOccurrences = calendar.occurrences.some(
        (occurrence) =>
          occurrence.name === column.eventName &&
          column.offsetDays >= occurrence.lowerWindowDays &&
          column.offsetDays <= occurrence.upperWindowDays &&
          epochDay === occurrence.epochDay + column.offsetDays,
      );

      values[row * columnCount + columnIndex] = matchingOccurrences ? 1 : 0;
    }
  }

  return createAdditionalFeatureMatrix(epochMilliseconds.length, columnCount, values).pipe(
    Effect.mapError(matrixError),
  );
};
