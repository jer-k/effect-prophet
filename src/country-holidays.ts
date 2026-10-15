import { Effect, Schema } from "effect";

import {
  CountryHolidayFailureReasonSchema,
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";
import { defaultEventPriorScale, type EventOccurrence } from "./event";
import { countryHolidayCatalog } from "./internal/country-holiday-catalog";
import { loadCountryHolidaySnapshot } from "./internal/country-holiday-data";
import {
  CanonicalCountrySchema,
  CountryHolidayCoverageIssueSchema,
  CountryHolidaySnapshotSchema,
  countryHolidayHorizon,
  type CanonicalCountry,
  type CountryHolidayCoverageIssue,
  type CountryHolidaySnapshot,
} from "./internal/country-holiday-snapshot";
import { PositiveFinite } from "./internal/numeric-schemas";
import { copyFrozen } from "./internal/owned-input";
import { millisecondsPerDay } from "./internal/time";

export type {
  CanonicalCountry,
  CountryHolidayCoverageIssue,
} from "./internal/country-holiday-snapshot";

/** Whether to reject reviewed missing/provider-limited coverage, never a completeness guarantee. */
export const CountryHolidayCoveragePolicySchema = Schema.Literals([
  "reject-known-gaps",
  "allow-known-gaps",
]);

/** Explicit coverage policy for a country calendar. */
export type CountryHolidayCoveragePolicy = typeof CountryHolidayCoveragePolicySchema.Type;

/** Country-level provider defaults; only registered, case-sensitive codes and aliases are accepted. */
export interface EncodedCountryHolidays {
  readonly country: string;
  readonly coverage?: CountryHolidayCoveragePolicy;
  readonly priorScale?: number;
}

const selectionFields = {
  coverage: CountryHolidayCoveragePolicySchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed("reject-known-gaps")),
  ),
  priorScale: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultEventPriorScale)),
  ),
};

const SelectionSyntax = Schema.Struct({ country: Schema.String, ...selectionFields });

/** Fully parsed canonical selection, ready for training-year or inspection resolution. */
export const CountryHolidaysSchema = Schema.Struct({
  country: CanonicalCountrySchema,
  ...selectionFields,
}).pipe(Schema.brand("effect-prophet/CountryHolidays"));

/** Parsed country selection, coverage policy and positive finite prior. */
export type CountryHolidays = typeof CountryHolidaysSchema.Type;

/**
 * Every country-calendar failure from inspection, option decoding, fitting and prediction: a bad
 * selection, an unusable year or snapshot, or a conflict with the model's own events or features.
 */
export class CountryHolidayError extends Schema.TaggedError<CountryHolidayError>()(
  "CountryHolidayError",
  {
    reason: CountryHolidayFailureReasonSchema,
    issues: Schema.Array(ValidationIssueSchema),
    coverageIssues: Schema.Array(CountryHolidayCoverageIssueSchema),
    message: Schema.String,
  },
) {}

const codes: ReadonlyMap<string, string> = new Map([
  ...Object.keys(countryHolidayCatalog.countries).map((country) => [country, country] as const),
  ...Object.entries(countryHolidayCatalog.aliases),
]);

const decodeSelection = Schema.decodeUnknownEffect(SelectionSyntax, {
  errors: "all",
  onExcessProperty: "error",
});

const decodeYears = Schema.decodeUnknownEffect(Schema.NonEmptyArray(Schema.Int), { errors: "all" });

const invalidSelection = (error: Schema.SchemaError): CountryHolidayError =>
  new CountryHolidayError({
    reason: "invalid-selection",
    issues: validationIssuesFromIssue(error.issue),
    coverageIssues: [],
    message: validationMessageFromIssue(error.issue),
  });

/** Parse country syntax and aliases without reading calendar files or resolving training years. */
export const parseCountryHolidays = Effect.fn("Prophet.parseCountryHolidays")(function* (
  input: Parameters<typeof decodeSelection>[0],
): Effect.fn.Return<CountryHolidays, CountryHolidayError> {
  const selection = yield* decodeSelection(input).pipe(Effect.mapError(invalidSelection));

  const country = codes.get(selection.country);

  if (country === undefined) {
    return yield* Effect.fail(
      new CountryHolidayError({
        reason: "unknown-country",
        issues: [{ path: ["country"], message: "Country code is not registered in the snapshot" }],
        coverageIssues: [],
        message: "Country code is not registered in the snapshot",
      }),
    );
  }

  return yield* Schema.decodeUnknownEffect(CountryHolidaysSchema)({ ...selection, country }).pipe(
    Effect.mapError(invalidSelection),
    Effect.map(copyFrozen),
  );
});

const parseYears = (input: Parameters<typeof decodeYears>[0]) =>
  Effect.gen(function* () {
    const years = yield* decodeYears(input).pipe(
      Effect.mapError(
        (error) =>
          new CountryHolidayError({
            reason: "invalid-selection",
            issues: validationIssuesFromIssue(error.issue).map((issue) => ({
              ...issue,
              path: ["years", ...(issue.path ?? [])],
            })),
            coverageIssues: [],
            message: "Requested calendar years must be a nonempty array of integers",
          }),
      ),
    );

    for (const [index, year] of years.entries()) {
      if (year < countryHolidayHorizon.firstYear || year > countryHolidayHorizon.lastYear) {
        return yield* Effect.fail(
          new CountryHolidayError({
            reason: "outside-snapshot-horizon",
            issues: [
              {
                path: ["years", index],
                message: "Requested year is outside the 1995–2060 snapshot horizon",
              },
            ],
            coverageIssues: [],
            message: "Requested year is outside the 1995–2060 snapshot horizon",
          }),
        );
      }
    }

    return Object.freeze([...new Set(years)].sort((left, right) => left - right));
  });

/** Versioned per-country payload and identity for future embedded-model resolution. */
export const RetainedCountryHolidaySnapshotSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  snapshotId: Schema.String.check(Schema.isPattern(/^sha256:[a-f0-9]{64}$/u)),
  provider: Schema.Struct({ prophet: Schema.Literal("1.4.0"), holidays: Schema.Literal("0.104") }),
  data: CountryHolidaySnapshotSchema,
});

/** Selected-country compact payload; never replace it with a newer installed snapshot. */
export type RetainedCountryHolidaySnapshot = typeof RetainedCountryHolidaySnapshotSchema.Type;

/** Calendar inspection result for deterministic full-generation-year requests. */
export interface CountryHolidayInspection {
  readonly country: CanonicalCountry;
  readonly coverage: CountryHolidayCoveragePolicy;
  readonly priorScale: number;
  readonly years: ReadonlyArray<number>;
  readonly snapshotId: string;
  readonly schemaVersion: 1;
  readonly provider: RetainedCountryHolidaySnapshot["provider"];
  readonly horizon: typeof countryHolidayHorizon;
  readonly occurrences: ReadonlyArray<EventOccurrence>;
  readonly issues: ReadonlyArray<CountryHolidayCoverageIssue>;
  readonly completeOfficialCoverageVerified: false;
}

/** Internal shared resolution result, including the complete selected-country portable payload. */
export interface ResolvedCountryHolidays {
  readonly inspection: CountryHolidayInspection;
  readonly snapshot: RetainedCountryHolidaySnapshot;
}

/** Select reviewed evidence intersecting requested generation years. */
export const countryHolidayCoverageIssues = (
  data: CountryHolidaySnapshot,
  years: ReadonlyArray<number>,
): ReadonlyArray<CountryHolidayCoverageIssue> =>
  Object.freeze(
    data.coverage.issues.filter((issue) =>
      years.some((year) => issue.firstYear <= year && year <= issue.lastYear),
    ),
  );

/** Expand only requested generation partitions, preserving exact pair union semantics. */
export const countryHolidayOccurrences = (
  data: CountryHolidaySnapshot,
  years: ReadonlyArray<number>,
  priorScale: number,
): Effect.Effect<ReadonlyArray<EventOccurrence>, CountryHolidayError> =>
  Effect.gen(function* () {
    const entries = new Map<string, readonly [number, number]>();

    for (const year of years) {
      for (const entry of data.years[year - data.firstYear] ?? []) {
        entries.set(`${entry[0]}:${entry[1]}`, entry);
      }
    }

    const occurrences: Array<EventOccurrence> = [];

    for (const [day, nameIndex] of [...entries.values()].sort(
      ([leftDay, leftName], [rightDay, rightName]) => leftDay - rightDay || leftName - rightName,
    )) {
      const name = data.names[nameIndex];

      if (name === undefined) {
        return yield* Effect.fail(
          new CountryHolidayError({
            reason: "corrupt-snapshot",
            issues: [],
            coverageIssues: [],
            message: "Unresolved retained holiday name index",
          }),
        );
      }

      occurrences.push({
        name,
        date: new Date(day * millisecondsPerDay).toISOString().slice(0, 10),
        epochDay: day,
        lowerWindowDays: 0,
        upperWindowDays: 0,
        priorScale,
      });
    }

    return Object.freeze(occurrences.map((occurrence) => Object.freeze(occurrence)));
  });

/**
 * Resolve requested partitions from bundled or retained data, applying the same coverage policy.
 * A retained snapshot must come from a parsed, frozen fitted model; it is shared, not copied.
 */
export const resolveCountryHolidays = (
  selection: CountryHolidays,
  requestedYears: Parameters<typeof decodeYears>[0],
  retained?: RetainedCountryHolidaySnapshot,
): Effect.Effect<ResolvedCountryHolidays, CountryHolidayError> =>
  Effect.gen(function* () {
    const years = yield* parseYears(requestedYears);

    return yield* Effect.fn("Prophet.resolveCountryHolidays")(function* () {
      yield* Effect.annotateCurrentSpan({
        "effect_prophet.calendar.source": retained === undefined ? "bundled" : "embedded",
        "effect_prophet.calendar.coverage": selection.coverage,
        "effect_prophet.calendar.year.count": years.length,
      });

      const snapshot: RetainedCountryHolidaySnapshot =
        retained ??
        Object.freeze({
          schemaVersion: 1,
          snapshotId: countryHolidayCatalog.snapshotId,
          provider: countryHolidayCatalog.provider,
          data: yield* loadCountryHolidaySnapshot(selection.country).pipe(
            Effect.mapError(
              (error) =>
                new CountryHolidayError({
                  reason: error.reason,
                  issues: error.issues,
                  coverageIssues: [],
                  message: error.message,
                }),
            ),
          ),
        });

      if (snapshot.data.country !== selection.country) {
        return yield* Effect.fail(
          new CountryHolidayError({
            reason: "invalid-selection",
            issues: [
              {
                path: ["country"],
                message: "Retained snapshot must belong to the selected country",
              },
            ],
            coverageIssues: [],
            message: "Retained snapshot must belong to the selected country",
          }),
        );
      }

      const issues = countryHolidayCoverageIssues(snapshot.data, years);

      const restrictions = issues.filter((issue) => issue.disposition === "restriction");

      if (selection.coverage === "reject-known-gaps" && restrictions.length > 0) {
        return yield* Effect.fail(
          new CountryHolidayError({
            reason: "known-coverage-restriction",
            issues: [],
            coverageIssues: issues,
            message:
              "Requested calendar years intersect reviewed coverage restrictions; explicit allow-known-gaps is required",
          }),
        );
      }

      const occurrences = yield* countryHolidayOccurrences(
        snapshot.data,
        years,
        selection.priorScale,
      );

      yield* Effect.annotateCurrentSpan({
        "effect_prophet.calendar.occurrence.count": occurrences.length,
        "effect_prophet.calendar.issue.count": issues.length,
      });

      // Every part is already frozen; deep-cloning the snapshot here dominated warm prediction.
      return Object.freeze({
        snapshot,
        inspection: Object.freeze({
          country: selection.country,
          coverage: selection.coverage,
          priorScale: selection.priorScale,
          years,
          snapshotId: snapshot.snapshotId,
          schemaVersion: snapshot.schemaVersion,
          provider: snapshot.provider,
          horizon: countryHolidayHorizon,
          occurrences,
          issues,
          completeOfficialCoverageVerified: false as const,
        }),
      });
    })();
  });

/** Inspect one registered country calendar without Python, network access or application services. */
export const inspectCountryHolidays = Effect.fn("Prophet.inspectCountryHolidays")(function* (
  input: Parameters<typeof decodeSelection>[0],
  years: Parameters<typeof decodeYears>[0],
): Effect.fn.Return<CountryHolidayInspection, CountryHolidayError> {
  const selection = yield* parseCountryHolidays(input);
  const result = yield* resolveCountryHolidays(selection, years);

  return result.inspection;
});
