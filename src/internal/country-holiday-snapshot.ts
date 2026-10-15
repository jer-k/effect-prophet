import { Effect, Schema } from "effect";

import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "../errors";
import { parseEpochDay } from "../event";
import { comparePythonStrings, FeatureNameSchema } from "../feature-name";
import { freezeOwned } from "./owned-input";

/** Outer request-year bounds of the version-one snapshot format, not completeness bounds. */
export const countryHolidayHorizon = Object.freeze({ firstYear: 1995, lastYear: 2060 });

/** A canonical ISO-style provider country identity, independent of an installed snapshot revision. */
export const CanonicalCountrySchema = Schema.String.check(Schema.isPattern(/^[A-Z]{2}$/u)).pipe(
  Schema.brand("effect-prophet/CanonicalCountry"),
);

/** Parsed canonical country identity; public code parsing additionally requires registration. */
export type CanonicalCountry = typeof CanonicalCountrySchema.Type;

const Digest = Schema.String.check(Schema.isPattern(/^[a-f0-9]{64}$/u));

const EvidenceSource = Schema.Struct({
  // The same source paths the calendar generator accepts for reviewed evidence.
  path: Schema.String.check(
    Schema.isPattern(
      /^holidays\/(?:(?:countries|calendars)\/[a-z_]+|holiday_base|no_holiday_base)\.py$/u,
    ),
  ),
  symbol: Schema.NonEmptyString,
  sha256: Digest,
  url: Schema.String,
}).check(
  Schema.makeFilter(
    (source) => source.url === `https://github.com/vacanza/holidays/blob/v0.104/${source.path}`,
    { message: "Coverage evidence must reference the pinned provider source" },
  ),
);

/** Reviewed source-backed limitation, explicitly distinguished from a completeness claim. */
export const CountryHolidayCoverageIssueSchema = Schema.Struct({
  country: CanonicalCountrySchema,
  firstYear: Schema.Int.check(Schema.isGreaterThanOrEqualTo(countryHolidayHorizon.firstYear)),
  lastYear: Schema.Int.check(Schema.isLessThanOrEqualTo(countryHolidayHorizon.lastYear)),
  reason: Schema.Literals([
    "provider-year-bound",
    "missing-rule-table",
    "provider-category-policy",
    "deliberately-empty",
    "estimated-dates",
    "source-accuracy",
    "annual-announcements",
  ]),
  disposition: Schema.Literals(["restriction", "advisory"]),
  rule: Schema.NonEmptyString,
  description: Schema.NonEmptyString,
  sources: Schema.NonEmptyArray(EvidenceSource),
}).check(
  Schema.makeFilter(
    (issue) => {
      const restriction =
        issue.reason === "provider-year-bound" ||
        issue.reason === "missing-rule-table" ||
        issue.reason === "provider-category-policy";

      return (
        issue.firstYear <= issue.lastYear &&
        issue.disposition === (restriction ? "restriction" : "advisory")
      );
    },
    { message: "Coverage intervals and dispositions must agree with their reviewed reason" },
  ),
);

/** One retained machine-readable coverage restriction or advisory. */
export type CountryHolidayCoverageIssue = typeof CountryHolidayCoverageIssueSchema.Type;

const SnapshotFields = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  country: CanonicalCountrySchema,
  firstYear: Schema.Literal(countryHolidayHorizon.firstYear),
  lastYear: Schema.Literal(countryHolidayHorizon.lastYear),
  names: Schema.Array(FeatureNameSchema),
  years: Schema.Array(Schema.Array(Schema.Tuple([Schema.Int, Schema.Natural]))),
  coverage: Schema.Struct({
    providerStartYear: Schema.Int.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(9999)),
    providerEndYear: Schema.Int.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(9999)),
    issues: Schema.Array(CountryHolidayCoverageIssueSchema),
  }),
});

const consistentSnapshot = Schema.makeFilter<typeof SnapshotFields.Type>((snapshot) => {
  const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];

  if (snapshot.years.length !== snapshot.lastYear - snapshot.firstYear + 1) {
    issues.push({
      path: ["years"],
      issue: "Every generation year must have exactly one partition",
    });
  }

  for (let index = 1; index < snapshot.names.length; index += 1) {
    const previous = snapshot.names[index - 1];
    const current = snapshot.names[index];

    if (
      previous !== undefined &&
      current !== undefined &&
      comparePythonStrings(previous, current) >= 0
    ) {
      issues.push({
        path: ["names", index],
        issue: "Names must be unique and Python-code-point ordered",
      });
    }
  }

  const usedNames = new Set<number>();

  for (const [index, partition] of snapshot.years.entries()) {
    const year = snapshot.firstYear + index;
    const lower = parseEpochDay(`${year - 1}-01-01`);
    const upper = parseEpochDay(`${year + 1}-12-31`);
    let previous: readonly [number, number] | undefined;

    for (const [entryIndex, entry] of partition.entries()) {
      const [day, nameIndex] = entry;

      if (lower === undefined || upper === undefined || day < lower || day > upper) {
        issues.push({
          path: ["years", index, entryIndex, 0],
          issue: "Epoch day must lie within the generation year or an adjacent year",
        });
      }

      if (snapshot.names[nameIndex] === undefined) {
        issues.push({
          path: ["years", index, entryIndex, 1],
          issue: "Occurrence index must resolve to an exact name",
        });
      }

      if (
        previous !== undefined &&
        (day < previous[0] || (day === previous[0] && nameIndex <= previous[1]))
      ) {
        issues.push({
          path: ["years", index, entryIndex],
          issue: "Partition entries must be unique and ordered by day and name",
        });
      }

      usedNames.add(nameIndex);
      previous = entry;
    }
  }

  if (usedNames.size !== snapshot.names.length) {
    issues.push({
      path: ["names"],
      issue: "Every dictionary name must have a generation-year occurrence",
    });
  }

  if (snapshot.coverage.providerStartYear > snapshot.coverage.providerEndYear) {
    issues.push({ path: ["coverage"], issue: "Provider bounds must be ordered" });
  }

  for (const [firstYear, lastYear] of [
    [snapshot.firstYear, Math.min(snapshot.lastYear, snapshot.coverage.providerStartYear - 1)],
    [Math.max(snapshot.firstYear, snapshot.coverage.providerEndYear + 1), snapshot.lastYear],
  ] as const) {
    if (
      firstYear <= lastYear &&
      !snapshot.coverage.issues.some(
        (issue) =>
          issue.reason === "provider-year-bound" &&
          issue.firstYear === firstYear &&
          issue.lastYear === lastYear,
      )
    ) {
      issues.push({
        path: ["coverage", "issues"],
        issue: "Provider bounds intersecting the snapshot must retain reviewed restrictions",
      });
    }
  }

  const coverageIdentities = new Set<string>();

  for (const [index, issue] of snapshot.coverage.issues.entries()) {
    const identity = JSON.stringify([issue.firstYear, issue.lastYear, issue.reason, issue.rule]);

    if (coverageIdentities.has(identity)) {
      issues.push({
        path: ["coverage", "issues", index],
        issue: "Coverage issues must not duplicate the same reviewed rule interval",
      });
    }

    coverageIdentities.add(identity);

    if (issue.country !== snapshot.country) {
      issues.push({
        path: ["coverage", "issues", index, "country"],
        issue: "Coverage evidence must belong to the selected country",
      });
    }
  }

  return issues;
});

/** Pure schema for compact country data; runtime decoding never consults Python or a newer snapshot. */
export const CountryHolidaySnapshotSchema = SnapshotFields.check(consistentSnapshot).pipe(
  Schema.brand("effect-prophet/CountryHolidaySnapshot"),
);

/** Parsed immutable selected-country generation partitions and reviewed coverage evidence. */
export type CountryHolidaySnapshot = typeof CountryHolidaySnapshotSchema.Type;

/** A malformed compact country payload, before adapter-specific failure translation. */
export class InvalidCountryHolidaySnapshot extends Schema.TaggedError<InvalidCountryHolidaySnapshot>()(
  "InvalidCountryHolidaySnapshot",
  { issues: Schema.Array(ValidationIssueSchema), message: Schema.String },
) {}

const decodeSnapshot = Schema.decodeUnknownEffect(CountryHolidaySnapshotSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** Parse and own a compact snapshot; malformed indexes, names and relationships are typed failures. */
export const parseCountryHolidaySnapshot = (
  input: Parameters<typeof decodeSnapshot>[0],
): Effect.Effect<CountryHolidaySnapshot, InvalidCountryHolidaySnapshot> =>
  decodeSnapshot(input).pipe(
    Effect.mapError(
      (error) =>
        new InvalidCountryHolidaySnapshot({
          issues: validationIssuesFromIssue(error.issue),
          message: validationMessageFromIssue(error.issue),
        }),
    ),
    Effect.map(freezeOwned),
  );
