import { Effect, Schema, type SchemaIssue } from "effect";

import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";
import {
  FeatureNameSchema,
  featureNameDelimiter,
  parseFeatureName,
  type FeatureName,
} from "./feature-name";
import {
  createAdditionalFeatureLayout,
  type AdditionalFeatureComponent,
  type AdditionalFeatureLayout,
  type InvalidAdditionalFeatures,
} from "./internal/additional-features";
import { PositiveFinite } from "./internal/numeric-schemas";
import { millisecondsPerDay } from "./internal/time";

const maximumExpandedColumns = 10_000;

const calendarDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

/** One custom event occurrence accepted by public fit options. */
export interface EncodedEventOccurrence {
  readonly name: string;
  readonly date: string;
  readonly lowerWindowDays?: number;
  readonly upperWindowDays?: number;
  readonly priorScale?: number;
}

/** A parsed integer UTC calendar day relative to the Unix epoch. */
export type EpochDay = number;

/** One parsed custom event occurrence with fully resolved defaults. */
export interface EventOccurrence {
  readonly name: FeatureName;
  readonly date: string;
  readonly epochDay: EpochDay;
  readonly lowerWindowDays: number;
  readonly upperWindowDays: number;
  readonly priorScale: number;
}

/** One deterministic binary column identified by event name and day offset. */
export interface EventFeatureColumn {
  readonly eventName: FeatureName;
  readonly offsetDays: number;
  readonly priorScale: number;
}

/** Additional-feature layout containing only grouped custom events. */
export type EventFeatureLayout = AdditionalFeatureLayout & {
  readonly components: ReadonlyArray<AdditionalFeatureComponent & { readonly kind: "event" }>;
};

/** Parsed event metadata retained by fitted models for future feature generation. */
export interface EventCalendar {
  readonly occurrences: ReadonlyArray<EventOccurrence>;
  readonly columns: ReadonlyArray<EventFeatureColumn>;
  readonly layout: EventFeatureLayout;
}

/** A structured failure to parse or construct an event calendar. */
export class InvalidEventCalendar extends Schema.TaggedError<InvalidEventCalendar>()(
  "InvalidEventCalendar",
  {
    issues: Schema.Array(ValidationIssueSchema),
    message: Schema.String,
  },
) {}

const WindowInteger = Schema.Int.check(
  Schema.isGreaterThanOrEqualTo(-Number.MAX_SAFE_INTEGER),
  Schema.isLessThanOrEqualTo(Number.MAX_SAFE_INTEGER),
);

const EncodedEventOccurrenceSchema = Schema.Struct({
  name: Schema.String,
  date: Schema.String,
  lowerWindowDays: WindowInteger.pipe(Schema.withDecodingDefaultKey(Effect.succeed(0))),
  upperWindowDays: WindowInteger.pipe(Schema.withDecodingDefaultKey(Effect.succeed(0))),
  priorScale: PositiveFinite.pipe(Schema.withDecodingDefaultKey(Effect.succeed(10))),
});

const EncodedEventCalendarSchema = Schema.Array(EncodedEventOccurrenceSchema);

const EventOccurrenceSchema = Schema.Struct({
  name: FeatureNameSchema,
  date: Schema.String,
  epochDay: Schema.Int,
  lowerWindowDays: WindowInteger,
  upperWindowDays: WindowInteger,
  priorScale: PositiveFinite,
});

const EventFeatureColumnSchema = Schema.Struct({
  eventName: FeatureNameSchema,
  offsetDays: WindowInteger,
  priorScale: PositiveFinite,
});

const AdditionalFeatureComponentSchema = Schema.Struct({
  kind: Schema.Literal("event"),
  name: FeatureNameSchema,
  coefficientOffset: Schema.Natural,
  coefficientCount: Schema.Int.check(Schema.isGreaterThan(0)),
});

const AdditionalFeatureLayoutSchema = Schema.Struct({
  components: Schema.Array(AdditionalFeatureComponentSchema),
  coefficientCount: Schema.Natural,
  priorScales: Schema.Array(PositiveFinite),
});

const EventCalendarFieldsSchema = Schema.Struct({
  occurrences: Schema.Array(EventOccurrenceSchema),
  columns: Schema.Array(EventFeatureColumnSchema),
  layout: AdditionalFeatureLayoutSchema,
});

const decodeEventCalendarSyntax = Schema.decodeUnknownEffect(EncodedEventCalendarSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const invalidFromIssue = (issue: SchemaIssue.Issue): InvalidEventCalendar =>
  new InvalidEventCalendar({
    issues: validationIssuesFromIssue(issue),
    message: validationMessageFromIssue(issue),
  });

const invalid = (path: ReadonlyArray<PropertyKey>, message: string): InvalidEventCalendar =>
  new InvalidEventCalendar({ issues: [{ path, message }], message });

const invalidFromFeatureName = (
  index: number,
  error: {
    readonly issues: ReadonlyArray<{
      readonly path?: ReadonlyArray<PropertyKey>;
      readonly message: string;
    }>;
    readonly message: string;
  },
): InvalidEventCalendar =>
  new InvalidEventCalendar({
    issues: error.issues.map((issue) => ({
      path: [index, "name", ...(issue.path ?? [])],
      message: issue.message,
    })),
    message: error.message,
  });

const invalidFromLayout = (error: InvalidAdditionalFeatures): InvalidEventCalendar =>
  invalid(error.path, error.message);

const parseEpochDay = (date: string): EpochDay | undefined => {
  const match = calendarDatePattern.exec(date);

  if (match === null) {
    return undefined;
  }

  const yearText = match[1];
  const monthText = match[2];
  const dayText = match[3];

  if (yearText === undefined || monthText === undefined || dayText === undefined) {
    return undefined;
  }

  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const instant = new Date(0);

  instant.setUTCFullYear(year, month - 1, day);
  instant.setUTCHours(0, 0, 0, 0);

  if (
    instant.getUTCFullYear() !== year ||
    instant.getUTCMonth() !== month - 1 ||
    instant.getUTCDate() !== day
  ) {
    return undefined;
  }

  const epochDay = instant.getTime() / millisecondsPerDay;

  return Number.isSafeInteger(epochDay) ? epochDay : undefined;
};

const consistentEventCalendar = Schema.makeFilter<typeof EventCalendarFieldsSchema.Type>(
  (calendar) => {
    const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];

    for (const [index, occurrence] of calendar.occurrences.entries()) {
      if (parseEpochDay(occurrence.date) !== occurrence.epochDay) {
        issues.push({
          path: ["occurrences", index, "date"],
          issue: "Event date and epoch day must identify the same UTC calendar day",
        });
      }

      if (occurrence.lowerWindowDays > 0 || occurrence.upperWindowDays < 0) {
        issues.push({
          path: ["occurrences", index],
          issue: "Event windows must contain offset zero",
        });
      }
    }

    if (
      calendar.layout.coefficientCount !== calendar.columns.length ||
      calendar.layout.priorScales.length !== calendar.columns.length
    ) {
      issues.push({
        path: ["layout", "coefficientCount"],
        issue: "Event layout must align exactly with event columns",
      });
    }

    let expectedOffset = 0;

    for (const [index, component] of calendar.layout.components.entries()) {
      if (component.coefficientOffset !== expectedOffset || component.coefficientCount <= 0) {
        issues.push({
          path: ["layout", "components", index],
          issue: "Event component ranges must be positive and contiguous",
        });
      }

      for (
        let columnIndex = component.coefficientOffset;
        columnIndex < component.coefficientOffset + component.coefficientCount;
        columnIndex += 1
      ) {
        if (calendar.columns[columnIndex]?.eventName !== component.name) {
          issues.push({
            path: ["layout", "components", index, "name"],
            issue: "Event component names must own their complete column range",
          });
          break;
        }
      }

      expectedOffset += component.coefficientCount;
    }

    if (expectedOffset !== calendar.columns.length) {
      issues.push({
        path: ["layout", "components"],
        issue: "Event components must exactly cover all columns",
      });
    }

    for (const [index, column] of calendar.columns.entries()) {
      if (calendar.layout.priorScales[index] !== column.priorScale) {
        issues.push({
          path: ["layout", "priorScales", index],
          issue: "Event layout priors must align with event columns",
        });
      }
    }

    return issues;
  },
);

/** Runtime schema for complete parsed event state retained by a fitted model. */
export const EventCalendarSchema = EventCalendarFieldsSchema.check(consistentEventCalendar);

const eventColumnKey = (name: string, offset: number): string =>
  `${name}${featureNameDelimiter}${offset >= 0 ? "+" : ""}${offset}`;

const comparePythonStrings = (left: string, right: string): number => {
  const leftPoints = Array.from(left, (value) => value.codePointAt(0) ?? 0);
  const rightPoints = Array.from(right, (value) => value.codePointAt(0) ?? 0);
  const sharedLength = Math.min(leftPoints.length, rightPoints.length);

  for (let index = 0; index < sharedLength; index += 1) {
    const difference = (leftPoints[index] ?? 0) - (rightPoints[index] ?? 0);

    if (difference !== 0) {
      return difference;
    }
  }

  return leftPoints.length - rightPoints.length;
};

/** Canonical deeply frozen empty event calendar. */
export const emptyEventCalendar: EventCalendar = Object.freeze({
  occurrences: Object.freeze([]),
  columns: Object.freeze([]),
  layout: Object.freeze({
    components: Object.freeze([]),
    coefficientCount: 0,
    priorScales: Object.freeze([]),
  }),
});

/** Parse event occurrences and derive their deterministic Prophet-compatible column layout. */
export const parseEventCalendar = Effect.fn("parseEventCalendar")(function* (
  input: Parameters<typeof decodeEventCalendarSyntax>[0],
): Effect.fn.Return<EventCalendar, InvalidEventCalendar> {
  const encoded = yield* decodeEventCalendarSyntax(input).pipe(
    Effect.mapError((error) => invalidFromIssue(error.issue)),
  );

  const occurrences: Array<EventOccurrence> = [];
  const priorsByName = new Map<string, number>();
  const columnsByKey = new Map<string, EventFeatureColumn>();
  const occurrenceKeys = new Set<string>();

  for (const [index, occurrence] of encoded.entries()) {
    const name = yield* parseFeatureName(occurrence.name).pipe(
      Effect.mapError((error) => invalidFromFeatureName(index, error)),
    );

    const epochDay = parseEpochDay(occurrence.date);

    if (epochDay === undefined) {
      return yield* Effect.fail(
        invalid(
          [index, "date"],
          "Event dates must be valid zero-padded Gregorian YYYY-MM-DD values",
        ),
      );
    }

    if (occurrence.lowerWindowDays > 0) {
      return yield* Effect.fail(
        invalid(
          [index, "lowerWindowDays"],
          "Lower event windows must be less than or equal to zero",
        ),
      );
    }

    if (occurrence.upperWindowDays < 0) {
      return yield* Effect.fail(
        invalid(
          [index, "upperWindowDays"],
          "Upper event windows must be greater than or equal to zero",
        ),
      );
    }

    const width = occurrence.upperWindowDays - occurrence.lowerWindowDays + 1;

    if (!Number.isSafeInteger(width) || width > maximumExpandedColumns) {
      return yield* Effect.fail(
        invalid(
          [index],
          `One event occurrence cannot expand beyond ${maximumExpandedColumns} columns`,
        ),
      );
    }

    const previousPrior = priorsByName.get(name);

    if (previousPrior !== undefined && previousPrior !== occurrence.priorScale) {
      return yield* Effect.fail(
        invalid([index, "priorScale"], `Event '${name}' must use one consistent prior scale`),
      );
    }

    priorsByName.set(name, occurrence.priorScale);

    const occurrenceKey = `${name}\u0000${epochDay}\u0000${occurrence.lowerWindowDays}\u0000${occurrence.upperWindowDays}`;

    if (!occurrenceKeys.has(occurrenceKey)) {
      occurrences.push(
        Object.freeze({
          name,
          date: occurrence.date,
          epochDay,
          lowerWindowDays: occurrence.lowerWindowDays,
          upperWindowDays: occurrence.upperWindowDays,
          priorScale: occurrence.priorScale,
        }),
      );
      occurrenceKeys.add(occurrenceKey);
    }

    for (
      let offset = occurrence.lowerWindowDays;
      offset <= occurrence.upperWindowDays;
      offset += 1
    ) {
      const key = eventColumnKey(name, offset);
      columnsByKey.set(
        key,
        Object.freeze({ eventName: name, offsetDays: offset, priorScale: occurrence.priorScale }),
      );

      if (columnsByKey.size > maximumExpandedColumns) {
        return yield* Effect.fail(
          invalid([], `An event calendar cannot exceed ${maximumExpandedColumns} columns`),
        );
      }
    }
  }

  const columns = Array.from(columnsByKey.entries())
    .sort(([left], [right]) => comparePythonStrings(left, right))
    .map(([, column]) => column);

  const components: Array<{
    readonly kind: "event";
    readonly name: FeatureName;
    readonly coefficientOffset: number;
    readonly coefficientCount: number;
  }> = [];

  for (const [index, column] of columns.entries()) {
    const previous = components.at(-1);

    if (previous?.name === column.eventName) {
      components[components.length - 1] = {
        ...previous,
        coefficientCount: previous.coefficientCount + 1,
      };
    } else {
      components.push({
        kind: "event",
        name: column.eventName,
        coefficientOffset: index,
        coefficientCount: 1,
      });
    }
  }

  const layout = yield* createAdditionalFeatureLayout(
    components,
    columns.map((column) => column.priorScale),
  ).pipe(Effect.mapError(invalidFromLayout));

  if (columns.length === 0) {
    return emptyEventCalendar;
  }

  return Object.freeze({
    occurrences: Object.freeze(occurrences),
    columns: Object.freeze(columns),
    layout,
  });
});
