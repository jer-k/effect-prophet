import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";

import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { parseEventCalendar } from "../../../src/event";
import {
  CanonicalCountrySchema,
  CountryHolidayCoverageIssueSchema,
  CountryHolidaySnapshotSchema,
} from "../../../src/internal/country-holiday-snapshot";
import { countryHolidayCatalog } from "../../../src/internal/country-holiday-catalog";
import { millisecondsPerDay } from "../../../src/internal/time";

const root = new URL("../../../", import.meta.url);

const sha256 = (bytes: Uint8Array | string): string =>
  createHash("sha256").update(bytes).digest("hex");

const Sha256 = Schema.String.check(Schema.isPattern(/^[a-f0-9]{64}$/u));

const CanonicalCountry = CanonicalCountrySchema;

const CoverageIssue = CountryHolidayCoverageIssueSchema;

const CountryFile = CountryHolidaySnapshotSchema;

const CountryEntry = Schema.Struct({
  file: Schema.String,
  sha256: Sha256,
  bytes: Schema.Natural,
  names: Schema.Natural,
  uniqueOccurrences: Schema.Natural,
  partitionOccurrences: Schema.Natural,
});

const Manifest = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  snapshotId: Schema.String.check(Schema.isPattern(/^sha256:[a-f0-9]{64}$/u)),
  provider: Schema.Struct({ name: Schema.Literal("holidays"), version: Schema.Literal("0.104") }),
  aliases: Schema.Record(Schema.String, CanonicalCountry),
  countries: Schema.Record(CanonicalCountry, CountryEntry),
  generatorSources: Schema.Record(Schema.String, Sha256),
  inputSources: Schema.Record(Schema.String, Sha256),
  files: Schema.Record(Schema.String, Schema.Struct({ sha256: Sha256, bytes: Schema.Natural })),
  coverage: Schema.Struct({ completeOfficialCoverageVerified: Schema.Literal(false) }),
  counts: Schema.Struct({
    countries: Schema.Natural,
    aliases: Schema.Natural,
    uniqueOccurrences: Schema.Natural,
    partitionOccurrences: Schema.Natural,
  }),
});

const Inventory = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  inventoryVersion: Schema.Literal(1),
  provider: Schema.Struct({ name: Schema.Literal("holidays"), version: Schema.Literal("0.104") }),
  reviewScope: Schema.NonEmptyString,
  issues: Schema.Array(CoverageIssue),
});

const readManifest = async () =>
  Schema.decodeUnknownSync(Manifest)(
    JSON.parse(await readFile(new URL("calendars/manifest.json", root), "utf8")),
  );

const readCountry = async (country: string) =>
  Schema.decodeUnknownSync(CountryFile, { onExcessProperty: "error" })(
    JSON.parse(await readFile(new URL(`calendars/countries/${country}.json`, root), "utf8")),
  );

const eventsForYear = (country: typeof CountryFile.Type, year: number) =>
  (country.years[year - country.firstYear] ?? []).map(([epochDay, index]) => {
    const name = country.names[index];

    if (name === undefined) {
      throw new Error(`Unresolved generated name index: ${country.country}, ${index}`);
    }

    return {
      name,
      date: new Date(epochDay * millisecondsPerDay).toISOString().slice(0, 10),
    };
  });

// Match generate.stable_json, including Python's ASCII escaping. This verifies
// the manifest's content identity without mutating or relying on insertion order.
// Escape UTF-16 code units separately so supplementary characters become the
// surrogate-pair escapes emitted by Python's ensure_ascii encoder.
const stableJson = (value: Schema.Json): string => {
  const ordered = Schema.is(Schema.Array(Schema.Json))(value)
    ? value.map((entry) => JSON.parse(stableJson(entry)))
    : Schema.is(Schema.Record(Schema.String, Schema.Json))(value)
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((key) => [key, JSON.parse(stableJson(value[key] ?? null))]),
        )
      : value;

  return `${JSON.stringify(ordered, null, 2).replace(
    /[\u007f-\uffff]/g,
    (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`,
  )}\n`;
};

describe("production country-calendar artifacts", () => {
  it("covers the exact files, notices, generator inputs, aliases and content identity", async () => {
    const manifest = await readManifest();
    const countries = Object.keys(manifest.countries);
    const actualFiles: Array<string> = [];

    for (const folder of ["calendars/", "third-party/calendars/"]) {
      const entries = await readdir(new URL(folder, root), {
        recursive: true,
        withFileTypes: true,
      });

      for (const entry of entries) {
        if (entry.isFile()) {
          actualFiles.push(relative(fileURLToPath(root), `${entry.parentPath}/${entry.name}`));
        }
      }
    }

    expect(actualFiles.sort()).toEqual(
      [...Object.keys(manifest.files), "calendars/manifest.json"].sort(),
    );
    expect(countryHolidayCatalog.snapshotId).toBe(manifest.snapshotId);
    expect(countryHolidayCatalog.aliases).toEqual(manifest.aliases);
    expect(countryHolidayCatalog.countries).toEqual(
      Object.fromEntries(
        Object.entries(manifest.countries).map(([country, entry]) => [
          country,
          {
            file: entry.file,
            sha256: entry.sha256,
            bytes: entry.bytes,
          },
        ]),
      ),
    );
    expect(countries).toHaveLength(250);
    expect(Object.keys(manifest.aliases)).toHaveLength(252);
    expect(manifest.aliases["UK"]).toBe("GB");
    expect(manifest.aliases["TU"]).toBe("TR");

    for (const [alias, canonical] of Object.entries(manifest.aliases)) {
      expect(countries).not.toContain(alias);
      expect(countries).toContain(canonical);
    }

    for (const [path, identity] of Object.entries(manifest.files)) {
      const bytes = await readFile(new URL(path, root));

      expect(bytes.length, path).toBe(identity.bytes);
      expect(sha256(bytes), path).toBe(identity.sha256);
    }

    for (const [path, hash] of Object.entries({
      ...manifest.generatorSources,
      ...manifest.inputSources,
    })) {
      expect(sha256(await readFile(new URL(path, root))), path).toBe(hash);
    }

    expect(Object.keys(manifest.generatorSources).sort()).toEqual([
      "tools/prophet/calendar_collection.py",
      "tools/prophet/generate.py",
      "tools/prophet/generate_calendars.py",
      "tools/prophet/linear_optimizer_evidence.py",
    ]);
    expect(Object.keys(manifest.files).filter((name) => name.startsWith("third-party/"))).toEqual([
      "third-party/calendars/CONTRIBUTORS",
      "third-party/calendars/LICENSE",
      "third-party/calendars/NOTICE.txt",
      "third-party/calendars/prophet-license.txt",
    ]);

    const complete = Schema.decodeUnknownSync(Schema.Record(Schema.String, Schema.Json))(
      JSON.parse(await readFile(new URL("calendars/manifest.json", root), "utf8")),
    );

    const { snapshotId, ...identity } = complete;

    expect(snapshotId).toBe(
      `sha256:${sha256(`effect-prophet.country-holidays.v1\0${stableJson(identity)}`)}`,
    );
  });

  it("parses every occurrence through the existing event/date/name invariants", async () => {
    const manifest = await readManifest();

    const inventory = Schema.decodeUnknownSync(Inventory)(
      JSON.parse(await readFile(new URL("calendars/coverage.json", root), "utf8")),
    );

    let uniqueOccurrences = 0;
    let partitionOccurrences = 0;

    for (const [code, entry] of Object.entries(manifest.countries)) {
      const country = await readCountry(code);

      expect(country.country).toBe(code);
      expect(entry.file).toBe(`countries/${code}.json`);
      expect(country.years).toHaveLength(66);
      expect(country.names).toHaveLength(entry.names);
      expect(new Set(country.names).size).toBe(country.names.length);
      expect(country.coverage.issues).toEqual(
        inventory.issues.filter((issue) => issue.country === code),
      );

      const events = country.years.flatMap((_, index) => eventsForYear(country, 1995 + index));
      const calendar = await Effect.runPromise(parseEventCalendar(events));

      expect(calendar.occurrences).toHaveLength(entry.uniqueOccurrences);
      expect(calendar.columns).toHaveLength(country.names.length);
      expect(events).toHaveLength(entry.partitionOccurrences);
      expect(new Set(calendar.columns.map((column) => column.eventName))).toEqual(
        new Set(country.names),
      );

      for (const [index, partition] of country.years.entries()) {
        const keys = partition.map(([day, name]) => `${day}:${name}`);

        expect(new Set(keys).size).toBe(partition.length);
        expect(partition).toEqual(
          [...partition].sort(
            ([leftDay, leftName], [rightDay, rightName]) =>
              leftDay - rightDay || leftName - rightName,
          ),
        );

        // Requested-year partitions may include adjacent Gregorian dates; do not
        // enforce same-year equality or filter spillovers out of the artifact.
        for (const [day, nameIndex] of partition) {
          const year = new Date(day * millisecondsPerDay).getUTCFullYear();

          expect(year).toBeGreaterThanOrEqual(1994 + index);
          expect(year).toBeLessThanOrEqual(1996 + index);
          expect(country.names[nameIndex]).toBeDefined();
        }
      }

      uniqueOccurrences += entry.uniqueOccurrences;
      partitionOccurrences += entry.partitionOccurrences;
    }

    expect(manifest.counts).toEqual({
      countries: 250,
      aliases: 252,
      uniqueOccurrences,
      partitionOccurrences,
    });
  }, 30_000);

  it("preserves Prophet's year-boundary observed-day membership", async () => {
    const country = await readCountry("US");
    const observed = { name: "New Year's Day (observed)", date: "2021-12-31" };

    // The pinned provider emits this next year's observed holiday when requesting
    // 2021, not 2022. Do not infer generation membership from the base holiday.
    expect(eventsForYear(country, 2021)).toContainEqual(observed);
    expect(eventsForYear(country, 2022)).not.toContainEqual(observed);
  });

  it("retains the actual partial provider results at finite-table cutoffs", async () => {
    const india = await readCountry("IN");
    const nepal = await readCountry("NP");
    const indonesia = await readCountry("ID");

    const namesFor = (country: typeof CountryFile.Type, year: number) =>
      eventsForYear(country, year).map((event) => event.name);

    expect(namesFor(india, 2000)).not.toContain("Holi");
    expect(namesFor(india, 2001)).toContain("Holi");
    expect(namesFor(india, 2035)).toContain("Holi");
    expect(namesFor(india, 2036)).not.toContain("Holi");
    expect(eventsForYear(india, 2036).length).toBeGreaterThan(0);

    expect(namesFor(nepal, 2032)).toContain("Republic Day");
    expect(namesFor(nepal, 2033)).not.toContain("Republic Day");
    expect(namesFor(nepal, 2033)).toContain("Martyr's Day");
    expect(namesFor(nepal, 2034)).not.toContain("Martyr's Day");
    expect(eventsForYear(nepal, 2036).length).toBeGreaterThan(0);

    expect(namesFor(indonesia, 2050)).toContain("Day of Silence");
    expect(namesFor(indonesia, 2051)).not.toContain("Day of Silence");
    expect(eventsForYear(indonesia, 2051).length).toBeGreaterThan(0);
  });

  it("retains restrictions, advisory estimates, empty calendars and historical evidence distinctly", async () => {
    const issueFor = async (code: string, year: number) => {
      const country = await readCountry(code);

      return country.coverage.issues.filter(
        (issue) => issue.firstYear <= year && year <= issue.lastYear,
      );
    };

    for (const [code, year] of [
      ["IN", 2000],
      ["IN", 2036],
      ["NP", 2033],
      ["NP", 2034],
      ["LK", 2027],
      ["ID", 2051],
      ["GW", 2022],
      ["ES", 2007],
      ["UA", 2022],
    ] as const) {
      expect(
        (await issueFor(code, year)).some((issue) => issue.disposition === "restriction"),
      ).toBe(true);
    }

    expect(await issueFor("ID", 2050)).toEqual([]);
    expect(await issueFor("IN", 2001)).toEqual([]);
    expect(await issueFor("LK", 2026)).toEqual([]);
    expect(await issueFor("GW", 2023)).toEqual([]);
    expect(await issueFor("TR", 2033)).toEqual([
      expect.objectContaining({ reason: "estimated-dates", disposition: "advisory" }),
    ]);

    const turkey = await readCountry("TR");

    expect(eventsForYear(turkey, 2032).some((event) => event.name === "Eid al-Fitr")).toBe(true);
    expect(
      eventsForYear(turkey, 2033).some((event) => event.name === "Eid al-Fitr (estimated)"),
    ).toBe(true);

    for (const code of ["BV", "HM", "IO"]) {
      const country = await readCountry(code);

      expect(country.years.flat()).toEqual([]);
      expect(await issueFor(code, 2060)).toEqual([
        expect.objectContaining({ reason: "deliberately-empty", disposition: "advisory" }),
      ]);
    }

    expect(eventsForYear(await readCountry("LK"), 2027)).toEqual([]);
    expect(eventsForYear(await readCountry("UA"), 2023)).toEqual([]);
    expect(await issueFor("US", 2060)).toEqual([]);
  });
});
