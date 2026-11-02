import { Effect, Schema } from "effect";

import { ValidationIssueSchema, validationIssuesFromIssue } from "../errors";
import { countryHolidayCatalog } from "./country-holiday-catalog";
import {
  parseCountryHolidaySnapshot,
  type CanonicalCountry,
  type CountryHolidaySnapshot,
} from "./country-holiday-snapshot";

const bundledCountries: ReadonlySet<string> = new Set(Object.keys(countryHolidayCatalog.countries));

/** Import one country's calendar file as a JSON module. */
export type CountryHolidayFileImporter = (
  country: CanonicalCountry,
) => Promise<{ readonly default: unknown }>;

// One static pattern lets bundlers split the calendars into a chunk per country.
const importBundledCountry: CountryHolidayFileImporter = (country) =>
  import(`../../calendars/countries/${country}.json`, { with: { type: "json" } });

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
 * Import, decode and own one allowlisted country file.
 *
 * The module loader reads each file once per process; every call still decodes a fresh, frozen
 * snapshot, so callers never share the imported value. The optional importer is a test seam,
 * not a public provider selection.
 */
export const loadCountryHolidaySnapshot = (
  country: CanonicalCountry,
  importCountry: CountryHolidayFileImporter = importBundledCountry,
): Effect.Effect<CountryHolidaySnapshot, CountryHolidayDataError> => {
  if (!bundledCountries.has(country)) {
    return Effect.fail(
      new CountryHolidayDataError({
        reason: "corrupt-snapshot",
        issues: [],
        message: "Country is absent from the bundled allowlist",
      }),
    );
  }

  return Effect.gen(function* () {
    const { default: json } = yield* Effect.tryPromise({
      try: () => importCountry(country),
      catch: () =>
        new CountryHolidayDataError({
          reason: "snapshot-unavailable",
          issues: [],
          message: "Unable to load the packaged country snapshot",
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
