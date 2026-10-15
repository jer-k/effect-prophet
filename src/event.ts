import { Effect, Schema, type SchemaIssue } from "effect";

import { ComponentModeSchema, type ComponentMode } from "./component-mode";
import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";
import {
  FeatureNameSchema,
  featureNameDelimiter,
  comparePythonStrings,
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

/** Prophet-compatible default prior for custom and generated holiday occurrences. */
export const defaultEventPriorScale = 10;

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
  readonly mode: ComponentMode;
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
  priorScale: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultEventPriorScale)),
  ),
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
  mode: ComponentModeSchema.pipe(Schema.withDecodingDefaultKey(Effect.succeed("additive"))),
});

const AdditionalFeatureLayoutSchema = Schema.Struct({
  components: Schema.Array(AdditionalFeatureComponentSchema),
  coefficientCount: Schema.Natural,
  priorScales: Schema.Array(PositiveFinite),
});

const EventCalendarFieldsSchema = Schema.Struct({
  mode: ComponentModeSchema.pipe(Schema.withDecodingDefaultKey(Effect.succeed("additive"))),
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

/** Parse a zero-padded Gregorian event date into an integer UTC day without normalization. */
export const parseEpochDay = (date: string): EpochDay | undefined => {
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
      if (component.mode !== calendar.mode) {
        issues.push({
          path: ["layout", "components", index, "mode"],
          issue: "Every event component must use the calendar's resolved mode",
        });
      }

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

/** Project parsed occurrences back to the shared event parsing boundary. */
export const encodeEventOccurrences = (
  occurrences: ReadonlyArray<EventOccurrence>,
): ReadonlyArray<EncodedEventOccurrence> =>
  occurrences.map((occurrence) => ({
    name: occurrence.name,
    date: occurrence.date,
    lowerWindowDays: occurrence.lowerWindowDays,
    upperWindowDays: occurrence.upperWindowDays,
    priorScale: occurrence.priorScale,
  }));

/** Exact canonical event-state alignment, including occurrence provenance and column order. */
export const eventCalendarsMatch = (left: EventCalendar, right: EventCalendar): boolean =>
  left.mode === right.mode &&
  left.occurrences.length === right.occurrences.length &&
  left.occurrences.every((occurrence, index) => {
    const other = right.occurrences[index];

    return (
      other !== undefined &&
      occurrence.name === other.name &&
      occurrence.date === other.date &&
      occurrence.epochDay === other.epochDay &&
      occurrence.lowerWindowDays === other.lowerWindowDays &&
      occurrence.upperWindowDays === other.upperWindowDays &&
      occurrence.priorScale === other.priorScale
    );
  }) &&
  left.columns.length === right.columns.length &&
  left.columns.every((column, index) => {
    const other = right.columns[index];

    return (
      other !== undefined &&
      column.eventName === other.eventName &&
      column.offsetDays === other.offsetDays &&
      column.priorScale === other.priorScale
    );
  }) &&
  left.layout.coefficientCount === right.layout.coefficientCount &&
  left.layout.priorScales.length === right.layout.priorScales.length &&
  left.layout.priorScales.every((prior, index) => prior === right.layout.priorScales[index]) &&
  left.layout.components.length === right.layout.components.length &&
  left.layout.components.every((component, index) => {
    const other = right.layout.components[index];

    return (
      other !== undefined &&
      component.kind === other.kind &&
      component.name === other.name &&
      component.mode === other.mode &&
      component.coefficientOffset === other.coefficientOffset &&
      component.coefficientCount === other.coefficientCount
    );
  });

/** Canonical deeply frozen empty event calendar. */
export const emptyEventCalendar: EventCalendar = Object.freeze({
  mode: "additive",
  occurrences: Object.freeze([]),
  columns: Object.freeze([]),
  layout: Object.freeze({
    components: Object.freeze([]),
    coefficientCount: 0,
    priorScales: Object.freeze([]),
  }),
});

interface CalendarBuilder {
  readonly occurrences: Array<EventOccurrence>;
  readonly priorsByName: Map<string, number>;
  readonly keys: Set<string>;
  readonly columnsByKey: Map<string, EventFeatureColumn>;
}

const makeCalendarBuilder = (): CalendarBuilder => ({
  occurrences: [],
  priorsByName: new Map(),
  keys: new Set(),
  columnsByKey: new Map(),
});

/** Add one parsed occurrence, rejecting an inconsistent prior and skipping exact duplicates. */
const collectOccurrence = (
  builder: CalendarBuilder,
  occurrence: EventOccurrence,
  index: number,
): InvalidEventCalendar | undefined => {
  const previousPrior = builder.priorsByName.get(occurrence.name);

  if (previousPrior !== undefined && previousPrior !== occurrence.priorScale) {
    return invalid(
      [index, "priorScale"],
      `Event '${occurrence.name}' must use one consistent prior scale`,
    );
  }

  builder.priorsByName.set(occurrence.name, occurrence.priorScale);

  const key = `${occurrence.name}\u0000${occurrence.epochDay}\u0000${occurrence.lowerWindowDays}\u0000${occurrence.upperWindowDays}`;

  if (!builder.keys.has(key)) {
    builder.occurrences.push(occurrence);
    builder.keys.add(key);
  }

  return undefined;
};

/** Collect one parsed occurrence and every column its window covers. */
const addOccurrence = (
  builder: CalendarBuilder,
  occurrence: EventOccurrence,
  index: number,
): InvalidEventCalendar | undefined => {
  const collected = collectOccurrence(builder, occurrence, index);

  if (collected !== undefined) {
    return collected;
  }

  for (let offset = occurrence.lowerWindowDays; offset <= occurrence.upperWindowDays; offset += 1) {
    const key = eventColumnKey(occurrence.name, offset);
    builder.columnsByKey.set(
      key,
      Object.freeze({
        eventName: occurrence.name,
        offsetDays: offset,
        priorScale: occurrence.priorScale,
      }),
    );

    if (builder.columnsByKey.size > maximumExpandedColumns) {
      return invalid([], `An event calendar cannot exceed ${maximumExpandedColumns} columns`);
    }
  }

  return undefined;
};

/** Order collected columns as Python Prophet does and derive their grouped feature layout. */
const finishCalendar = (
  builder: CalendarBuilder,
  mode: ComponentMode,
): Effect.Effect<EventCalendar, InvalidEventCalendar> => {
  const columns = Array.from(builder.columnsByKey.entries())
    .sort(([left], [right]) => comparePythonStrings(left, right))
    .map(([, column]) => column);

  const components: Array<{
    readonly kind: "event";
    readonly name: FeatureName;
    readonly coefficientOffset: number;
    readonly coefficientCount: number;
    readonly mode: ComponentMode;
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
        mode,
      });
    }
  }

  return createAdditionalFeatureLayout(
    components,
    columns.map((column) => column.priorScale),
  ).pipe(
    Effect.mapError(invalidFromLayout),
    Effect.map((layout) =>
      columns.length === 0 && mode === "additive"
        ? emptyEventCalendar
        : Object.freeze({
            mode,
            occurrences: Object.freeze(builder.occurrences),
            columns: Object.freeze(columns),
            layout,
          }),
    ),
  );
};

/**
 * Build a calendar from already-parsed occurrences under the parser's prior, duplicate and column
 * rules, skipping the syntax, name and date parsing they already passed.
 */
export const eventCalendarFromOccurrences = (
  occurrences: ReadonlyArray<EventOccurrence>,
  mode: ComponentMode,
): Effect.Effect<EventCalendar, InvalidEventCalendar> => {
  const builder = makeCalendarBuilder();

  for (const [index, occurrence] of occurrences.entries()) {
    const added = addOccurrence(builder, occurrence, index);

    if (added !== undefined) {
      return Effect.fail(added);
    }
  }

  return finishCalendar(builder, mode);
};

/**
 * Merge already-parsed occurrences under the parser's prior and duplicate rules, without
 * rebuilding columns. Prediction keeps its fitted column layout and needs only the occurrences.
 */
export const mergeEventOccurrences = (
  occurrences: ReadonlyArray<EventOccurrence>,
): Effect.Effect<ReadonlyArray<EventOccurrence>, InvalidEventCalendar> => {
  const builder = makeCalendarBuilder();

  for (const [index, occurrence] of occurrences.entries()) {
    const collected = collectOccurrence(builder, occurrence, index);

    if (collected !== undefined) {
      return Effect.fail(collected);
    }
  }

  return Effect.succeed(Object.freeze(builder.occurrences));
};

/** Parse event occurrences and derive their deterministic Prophet-compatible column layout. */
export const parseEventCalendar = Effect.fn("Prophet.parseEventCalendar")(function* (
  input: Parameters<typeof decodeEventCalendarSyntax>[0],
  mode: ComponentMode = "additive",
): Effect.fn.Return<EventCalendar, InvalidEventCalendar> {
  const encoded = yield* decodeEventCalendarSyntax(input).pipe(
    Effect.mapError((error) => invalidFromIssue(error.issue)),
  );

  const builder = makeCalendarBuilder();

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

    const added = addOccurrence(
      builder,
      Object.freeze({
        name,
        date: occurrence.date,
        epochDay,
        lowerWindowDays: occurrence.lowerWindowDays,
        upperWindowDays: occurrence.upperWindowDays,
        priorScale: occurrence.priorScale,
      }),
      index,
    );

    if (added !== undefined) {
      return yield* Effect.fail(added);
    }
  }

  return yield* finishCalendar(builder, mode);
});
