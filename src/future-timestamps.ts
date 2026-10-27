import { Effect, Predicate, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "./errors";
import { daysInUtcMonth, utcDayOfMonth, utcMonth, utcMonthDay } from "./internal/calendar-month";
import { millisecondsPerDay, millisecondsPerHour, utcTimeOfDay } from "./internal/time";
import { TimestampSchema, encodeTimestamp, isValidTimestamp } from "./internal/timestamp";
import { ObservationsSchema, type EncodedObservation, type Observations } from "./observation";

/** The most timestamps one call generates. */
export const maximumFuturePeriods = 100_000;

const weeklyFrequencies = ["W-SUN", "W-MON", "W-TUE", "W-WED", "W-THU", "W-FRI", "W-SAT"] as const;

const FrequencySchema = Schema.Literals(["h", "D", "W", ...weeklyFrequencies, "MS", "ME"]);

/**
 * A pandas frequency alias: hourly, daily, weekly on a weekday (`W` is `W-SUN`), month starts or
 * month ends.
 */
export type FutureFrequency = typeof FrequencySchema.Type;

const FutureTimestampOptionsSchema = Schema.Struct({
  periods: Schema.Int.check(
    Schema.isGreaterThanOrEqualTo(0),
    Schema.isLessThanOrEqualTo(maximumFuturePeriods),
  ),
  frequency: FrequencySchema.pipe(Schema.withDecodingDefaultKey(Effect.succeed("D" as const))),
  includeHistory: Schema.Boolean.pipe(Schema.withDecodingDefaultKey(Effect.succeed(true))),
});

/** How many timestamps to generate and how far apart, like `make_future_dataframe`. */
export type FutureTimestampOptions = typeof FutureTimestampOptionsSchema.Encoded;

const decodeFutureTimestampOptions = Schema.decodeUnknownEffect(FutureTimestampOptionsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const decodeAnchor = Schema.decodeUnknownEffect(
  Schema.Union([TimestampSchema, ObservationsSchema]),
  {
    errors: "all",
    onExcessProperty: "error",
  },
);

/**
 * The anchor and, for a history, its distinct timestamps in increasing order, like Prophet's
 * `history_dates`. A lone timestamp is its own anchor and has no history to include.
 */
const resolveAnchor = (decoded: number | Observations) => {
  if (Predicate.isNumber(decoded)) {
    return { anchor: decoded, history: [] };
  }

  const history = [...new Set(decoded.map(({ timestamp }) => timestamp))].sort(
    (left, right) => left - right,
  );

  return { anchor: history.at(-1) ?? decoded[0].timestamp, history };
};

/**
 * The epoch millisecond of each period from 1, at the anchor's UTC time of day for calendar
 * schedules. Every period is strictly after the anchor, and later periods are later.
 */
const scheduleAfter = (
  anchor: number,
  frequency: FutureFrequency,
): ((period: number) => number) => {
  if (frequency === "h" || frequency === "D") {
    const step = frequency === "h" ? millisecondsPerHour : millisecondsPerDay;

    return (period) => anchor + period * step;
  }

  const timeOfDay = utcTimeOfDay(anchor);
  const month = utcMonth(anchor);

  if (frequency === "MS") {
    // The anchor's own month start is never after it, so the schedule starts next month.
    return (period) => utcMonthDay(month + period, 1, timeOfDay);
  }

  if (frequency === "ME") {
    const first = utcDayOfMonth(anchor) < daysInUtcMonth(month) ? month : month + 1;

    return (period) => {
      const target = first + period - 1;

      return utcMonthDay(target, daysInUtcMonth(target), timeOfDay);
    };
  }

  const weekday = weeklyFrequencies.indexOf(frequency === "W" ? "W-SUN" : frequency);
  const daysUntil = (weekday - new Date(anchor).getUTCDay() + 7) % 7 || 7;
  const first = anchor + daysUntil * millisecondsPerDay;

  return (period) => first + (period - 1) * 7 * millisecondsPerDay;
};

/**
 * Generate the next timestamps after an anchor, like Python Prophet's `make_future_dataframe`.
 *
 * The anchor is a timestamp or a history, whose latest timestamp is used. As in Python, a history's
 * distinct timestamps come first, in increasing order, unless `includeHistory` is `false`. Every
 * generated timestamp is strictly after the anchor, and hourly and daily steps keep its exact
 * offset. Weekly and monthly schedules keep its UTC time of day: `MS` gives the next first days of
 * a month, `ME` the next last days, and `W` the next Sundays. Output uses the encoded UTC format
 * `predict` accepts.
 *
 * @param anchorInput - A canonical UTC timestamp, or a history of observations.
 * @param optionsInput - `periods`, an optional `frequency`, which defaults to `"D"`, and an optional
 *   `includeHistory`, which defaults to `true`.
 * @returns Canonical UTC timestamps in increasing order, or a typed failure.
 */
export const makeFutureTimestamps = Effect.fn("Prophet.makeFutureTimestamps")(function* (
  anchorInput: string | ReadonlyArray<EncodedObservation>,
  optionsInput: FutureTimestampOptions,
): Effect.fn.Return<ReadonlyArray<string>, InputValidationError> {
  const options = yield* decodeFutureTimestampOptions(optionsInput).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("future-timestamps", error.issue)),
  );

  const decodedAnchor = yield* decodeAnchor(anchorInput).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("future-timestamps", error.issue)),
  );

  const { anchor, history } = resolveAnchor(decodedAnchor);
  const included = options.includeHistory ? history : [];

  const timestampAt = scheduleAfter(anchor, options.frequency);

  // Periods only move forward, so a representable last timestamp bounds every earlier one.
  if (options.periods > 0 && !isValidTimestamp(timestampAt(options.periods))) {
    return yield* Effect.fail(
      new InputValidationError({
        input: "future-timestamps",
        issues: [
          {
            path: ["periods"],
            message: "Future timestamps must stay inside the supported timestamp range",
          },
        ],
        message: "Future timestamps must stay inside the supported timestamp range",
      }),
    );
  }

  yield* Effect.annotateCurrentSpan({
    "effect_prophet.frequency": options.frequency,
    "effect_prophet.timestamp.count": included.length + options.periods,
  });

  return Object.freeze([
    ...included.map((timestamp) => encodeTimestamp(timestamp)),
    ...Array.from({ length: options.periods }, (_, index) =>
      encodeTimestamp(timestampAt(index + 1)),
    ),
  ]);
});
