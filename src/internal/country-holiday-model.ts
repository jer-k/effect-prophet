import { Effect, Predicate, Schema } from "effect";

import {
  CountryHolidaysSchema,
  RetainedCountryHolidaySnapshotSchema,
  countryHolidayOccurrences,
  countryHolidayCoverageIssues,
  CountryHolidayError,
  resolveCountryHolidays,
  type CountryHolidays,
} from "../country-holidays";
import {
  EventCalendarSchema,
  eventCalendarFromOccurrences,
  eventCalendarsMatch,
  mergeEventOccurrences,
  type EventCalendar,
  type EventOccurrence,
  type InvalidEventCalendar,
} from "../event";
import {
  CountryHolidayCoverageIssueSchema,
  countryHolidayHorizon,
} from "./country-holiday-snapshot";
import { copyOwned, freezeOwned } from "./owned-input";

const TrainingYearsSchema = Schema.Array(
  Schema.Int.check(
    Schema.isGreaterThanOrEqualTo(countryHolidayHorizon.firstYear),
    Schema.isLessThanOrEqualTo(countryHolidayHorizon.lastYear),
  ),
).check(
  Schema.makeFilter(
    (years) =>
      (years.length > 0 &&
        years.every((year, index) => index === 0 || year > (years[index - 1] ?? year))) ||
      "Training calendar years must be unique and increasing",
  ),
);

const CountryHolidayModelFields = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  selection: CountryHolidaysSchema,
  snapshot: RetainedCountryHolidaySnapshotSchema,
  trainingYears: TrainingYearsSchema,
  trainingIssues: Schema.Array(CountryHolidayCoverageIssueSchema),
  customEvents: EventCalendarSchema,
});

/** Portable calendar state, separate from the frozen numerical event layout. */
export const CountryHolidayModelSchema = CountryHolidayModelFields.check(
  Schema.makeFilter((state) => {
    const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];

    if (state.selection.country !== state.snapshot.data.country) {
      issues.push({
        path: ["selection", "country"],
        issue: "Selection and embedded country must match",
      });
    }

    const expectedIssues = countryHolidayCoverageIssues(state.snapshot.data, state.trainingYears);

    if (JSON.stringify(state.trainingIssues) !== JSON.stringify(expectedIssues)) {
      issues.push({
        path: ["trainingIssues"],
        issue: "Training coverage issues must match embedded evidence",
      });
    }

    if (
      state.selection.coverage === "reject-known-gaps" &&
      expectedIssues.some((issue) => issue.disposition === "restriction")
    ) {
      issues.push({
        path: ["selection", "coverage"],
        issue: "Restricted training years require explicit allow-known-gaps",
      });
    }

    return issues;
  }),
);

/** Owned selected-country snapshot and explicit custom-event provenance. */
export type CountryHolidayModel = typeof CountryHolidayModelSchema.Type;

// States known to satisfy CountryHolidayModelSchema, keyed by identity, with their expected training
// calendar once known. Every key is deeply frozen, so neither the state nor its value can go stale.
const verifiedStates = new WeakMap<object, EventCalendar | undefined>();

/**
 * Record a state that already satisfies CountryHolidayModelSchema, because fitting built it from
 * validated parts or a portable payload decode just validated it, so model parsing need not repeat
 * the checks. Fitting also supplies the training calendar it built from the state.
 */
const trustCountryHolidayModel = (
  state: CountryHolidayModel,
  trainingEvents?: EventCalendar,
): CountryHolidayModel => {
  const frozen = freezeOwned(state);

  verifiedStates.set(frozen, trainingEvents ?? verifiedStates.get(frozen));

  return frozen;
};

/** Model field schema: recorded states are accepted by identity and anything else is validated. */
export const ParsedCountryHolidayModelSchema = Schema.Union([
  Schema.declare(
    (input): input is CountryHolidayModel => Predicate.isObject(input) && verifiedStates.has(input),
  ),
  CountryHolidayModelSchema,
]);

interface PortableCountryHolidayFields {
  readonly countryHolidays?: CountryHolidayModel;
}

/**
 * Attach calendar state to model-parser input without changing legacy no-calendar payloads. Not
 * copied: parsing decodes a fresh owned tree, so cloning here only repeated the work.
 */
export const countryHolidayModelFields = (
  state: CountryHolidayModel | undefined,
): PortableCountryHolidayFields => {
  if (state === undefined) {
    return {};
  }

  return { countryHolidays: state };
};

/** Attach state that a portable payload decode has just validated against the model schema. */
export const decodedCountryHolidayFields = (
  state: CountryHolidayModel | undefined,
): PortableCountryHolidayFields =>
  countryHolidayModelFields(state === undefined ? undefined : trustCountryHolidayModel(state));

/** Attach a caller-owned mutable copy of calendar state to an encoded portable payload. */
export const encodedCountryHolidayFields = (
  state: CountryHolidayModel | undefined,
): PortableCountryHolidayFields => countryHolidayModelFields(copyOwned(state));

/** Unique UTC years represented by validated rows, never the full history's date range. */
export const countryHolidayYears = (timestamps: ReadonlyArray<number>): ReadonlyArray<number> =>
  Object.freeze(
    [...new Set(timestamps.map((timestamp) => new Date(timestamp).getUTCFullYear()))].sort(
      (left, right) => left - right,
    ),
  );

/**
 * Generated holidays all use the selection's prior, so the only possible prior conflict is a custom
 * event that shares a generated holiday's name but uses a different prior.
 */
const conflictingPrior = (
  customEvents: EventCalendar,
  generated: ReadonlyArray<EventOccurrence>,
  priorScale: number,
): CountryHolidayError | undefined => {
  const names = new Set(generated.map((occurrence) => occurrence.name));

  const conflict = customEvents.occurrences.find(
    (occurrence) => names.has(occurrence.name) && occurrence.priorScale !== priorScale,
  );

  if (conflict === undefined) {
    return undefined;
  }

  return new CountryHolidayError({
    reason: "conflicting-event-prior",
    issues: [
      {
        path: ["priorScale"],
        message: `Custom event '${conflict.name}' shares a country holiday's name but not its prior scale`,
      },
    ],
    coverageIssues: [],
    message: "A custom event and a country holiday with the same name must use one prior scale",
  });
};

// Both inputs are parsed occurrences, so the calendar is built directly rather than re-parsed. With
// prior conflicts ruled out beforehand, the only remaining failure is the event column limit.
const mergeCountryEvents = (
  customEvents: EventCalendar,
  generated: ReadonlyArray<EventOccurrence>,
): Effect.Effect<EventCalendar, CountryHolidayError> =>
  eventCalendarFromOccurrences([...customEvents.occurrences, ...generated], customEvents.mode).pipe(
    Effect.mapError(
      (error) =>
        new CountryHolidayError({
          reason: "event-column-limit",
          issues: error.issues,
          coverageIssues: [],
          message: "Country holidays and custom events together exceed the event column limit",
        }),
    ),
  );

/** Resolve full represented years and retain the entire selected-country payload. */
export const fitCountryHolidayEvents = Effect.fnUntraced(function* (
  selection: CountryHolidays,
  timestamps: ReadonlyArray<number>,
  customEvents: EventCalendar,
): Effect.fn.Return<
  { readonly events: EventCalendar; readonly state: CountryHolidayModel },
  CountryHolidayError
> {
  const resolved = yield* resolveCountryHolidays(selection, countryHolidayYears(timestamps));

  const conflict = conflictingPrior(
    customEvents,
    resolved.inspection.occurrences,
    selection.priorScale,
  );

  if (conflict !== undefined) {
    return yield* Effect.fail(conflict);
  }

  const events = yield* mergeCountryEvents(customEvents, resolved.inspection.occurrences);

  // Every part is validated already: the resolved snapshot, its coverage issues and policy for these
  // years, the parsed selection and custom events. The state is trusted rather than deep-copied.
  return {
    events,
    state: trustCountryHolidayModel(
      {
        schemaVersion: 1 as const,
        selection,
        snapshot: resolved.snapshot,
        trainingYears: resolved.inspection.years,
        trainingIssues: resolved.inspection.issues,
        customEvents,
      },
      events,
    ),
  };
});

/** Rebuild the canonical training calendar a state implies; undefined if its custom events are not. */
const expectedTrainingEvents = Effect.fnUntraced(function* (
  state: CountryHolidayModel,
): Effect.fn.Return<EventCalendar | undefined, CountryHolidayError | InvalidEventCalendar> {
  // The schema already validated each occurrence; rebuilding confirms the layout is canonical.
  const custom = yield* eventCalendarFromOccurrences(
    state.customEvents.occurrences,
    state.customEvents.mode,
  );

  if (!eventCalendarsMatch(custom, state.customEvents)) {
    return undefined;
  }

  const generated = yield* countryHolidayOccurrences(
    state.snapshot.data,
    state.trainingYears,
    state.selection.priorScale,
  );

  return yield* mergeCountryEvents(custom, generated);
});

/** Check provenance against the exact canonical training layout without any dataset lookup. */
export const countryHolidayTrainingEventsMatch = Effect.fnUntraced(function* (
  state: CountryHolidayModel,
  events: EventCalendar,
): Effect.fn.Return<boolean, CountryHolidayError | InvalidEventCalendar> {
  const recorded = verifiedStates.get(state);
  const expected = recorded ?? (yield* expectedTrainingEvents(state));

  if (expected === undefined) {
    return false;
  }

  // Remember the rebuilt calendar only for recorded (deeply frozen) states.
  if (recorded === undefined && verifiedStates.has(state)) {
    verifiedStates.set(state, expected);
  }

  return eventCalendarsMatch(expected, events);
});

/** Expand prediction partitions from embedded state while preserving every fitted column. */
export const predictCountryHolidayEvents = Effect.fnUntraced(function* (
  state: CountryHolidayModel,
  timestamps: ReadonlyArray<number>,
  fittedEvents: EventCalendar,
): Effect.fn.Return<EventCalendar, CountryHolidayError> {
  const resolved = yield* resolveCountryHolidays(
    state.selection,
    countryHolidayYears(timestamps),
    state.snapshot,
  );

  const fittedNames = new Set(fittedEvents.columns.map((column) => column.eventName));

  const generated = resolved.inspection.occurrences.filter((occurrence) =>
    fittedNames.has(occurrence.name),
  );

  // A name trained only as a custom event can first appear as a country holiday in a later year.
  const conflict = conflictingPrior(state.customEvents, generated, state.selection.priorScale);

  if (conflict !== undefined) {
    return yield* Effect.fail(conflict);
  }

  // Same deduplication rules as parsing, but the fitted columns are kept as they are, so
  // re-parsing the merged calendar would only rebuild a layout that is then discarded.
  const occurrences = yield* mergeEventOccurrences([
    ...state.customEvents.occurrences,
    ...generated,
  ]).pipe(
    Effect.mapError(
      (error) =>
        new CountryHolidayError({
          reason: "conflicting-event-prior",
          issues: error.issues,
          coverageIssues: [],
          message: error.message,
        }),
    ),
  );

  return Object.freeze({ ...fittedEvents, occurrences });
});
