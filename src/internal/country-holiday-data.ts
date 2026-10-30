import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import { Effect, Schema } from "effect";

import { ValidationIssueSchema, validationIssuesFromIssue } from "../errors";
import { countryHolidayCatalog } from "./country-holiday-catalog";
import {
  parseCountryHolidaySnapshot,
  type CanonicalCountry,
  type CountryHolidaySnapshot,
} from "./country-holiday-snapshot";

type BundledCountryFile =
  (typeof countryHolidayCatalog.countries)[keyof typeof countryHolidayCatalog.countries];

const files: ReadonlyMap<string, BundledCountryFile> = new Map(
  Object.entries(countryHolidayCatalog.countries),
);

const bundledRoot = new URL("../../calendars/", import.meta.url);

const Header = Schema.Struct({ schemaVersion: Schema.Int });

/** A classified packaged-file failure; messages and payloads are never tracing attributes. */
export class CountryHolidayDataError extends Schema.TaggedError<CountryHolidayDataError>()(
  "CountryHolidayDataError",
  {
    reason: Schema.Literals([
      "snapshot-unavailable",
      "corrupt-snapshot",
      "unsupported-snapshot-version",
    ]),
    issues: Schema.Array(ValidationIssueSchema),
    message: Schema.String,
  },
) {}

/**
 * Read, integrity-check, decode and own one allowlisted country file without caching.
 * The optional root is a filesystem adapter seam, not a public provider selection.
 */
export const loadCountryHolidaySnapshot = (
  country: CanonicalCountry,
  root: URL = bundledRoot,
): Effect.Effect<CountryHolidaySnapshot, CountryHolidayDataError> => {
  const identity = files.get(country);

  if (identity === undefined) {
    return Effect.fail(
      new CountryHolidayDataError({
        reason: "corrupt-snapshot",
        issues: [],
        message: "Country is absent from the bundled allowlist",
      }),
    );
  }

  return Effect.gen(function* () {
    const path = new URL(identity.file, root);

    const bytes = yield* Effect.tryPromise({
      try: () => readFile(path),
      catch: () =>
        new CountryHolidayDataError({
          reason: "snapshot-unavailable",
          issues: [],
          message: "Unable to read the packaged country snapshot",
        }),
    });

    const json = yield* Effect.try({
      try: () => JSON.parse(bytes.toString("utf8")),
      catch: () =>
        new CountryHolidayDataError({
          reason: "corrupt-snapshot",
          issues: [],
          message: "Packaged country snapshot is not valid JSON",
        }),
    });

    const header = yield* Schema.decodeUnknownEffect(Header)(json).pipe(
      Effect.mapError(
        (error) =>
          new CountryHolidayDataError({
            reason: "corrupt-snapshot",
            issues: validationIssuesFromIssue(error.issue),
            message: "Packaged country snapshot has an invalid version header",
          }),
      ),
    );

    if (header.schemaVersion !== countryHolidayCatalog.schemaVersion) {
      return yield* new CountryHolidayDataError({
        reason: "unsupported-snapshot-version",
        issues: [
          { path: ["schemaVersion"], message: "Unsupported country snapshot schema version" },
        ],
        message: "Unsupported country snapshot schema version",
      });
    }

    const digest = createHash("sha256").update(bytes).digest("hex");

    if (bytes.length !== identity.bytes || digest !== identity.sha256) {
      return yield* new CountryHolidayDataError({
        reason: "corrupt-snapshot",
        issues: [],
        message: "Packaged country snapshot integrity check failed",
      });
    }

    const snapshot = yield* parseCountryHolidaySnapshot(json).pipe(
      Effect.mapError(
        (error) =>
          new CountryHolidayDataError({
            reason: "corrupt-snapshot",
            issues: error.issues,
            message: error.message,
          }),
      ),
    );

    if (snapshot.country !== country) {
      return yield* new CountryHolidayDataError({
        reason: "corrupt-snapshot",
        issues: [
          { path: ["country"], message: "Packaged data must belong to the selected country" },
        ],
        message: "Packaged data must belong to the selected country",
      });
    }

    yield* Effect.annotateCurrentSpan({
      "effect_prophet.calendar.name.count": snapshot.names.length,
      "effect_prophet.calendar.partition.count": snapshot.years.length,
    });

    return snapshot;
  }).pipe(
    Effect.withSpan("effect-prophet.calendar.load-snapshot", {
      attributes: { "effect_prophet.calendar.source": "bundled" },
    }),
  );
};
