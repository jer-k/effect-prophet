import { readFile } from "node:fs/promises";

import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  InvalidCountryHolidaySnapshot,
  parseCountryHolidaySnapshot,
} from "../../src/internal/country-holiday-snapshot";

const raw = JSON.parse(
  await readFile(new URL("../../calendars/countries/US.json", import.meta.url), "utf8"),
);

const original = await Effect.runPromise(parseCountryHolidaySnapshot(raw));

describe("compact country snapshot invariants", () => {
  it("owns the parsed tree without freezing caller input", () => {
    expect(Object.isFrozen(original)).toBe(true);
    expect(Object.isFrozen(raw)).toBe(false);
    expect(Object.isFrozen(original.years[0]?.[0])).toBe(true);
  });

  it("rejects corrupt versions, names, indexes, dates, partitions, ordering and coverage", async () => {
    const first = original.years[0];

    if (first === undefined) throw new Error("Expected the first country partition");

    const bad = [
      { ...original, schemaVersion: 2 },
      { ...original, country: "../../US" },
      { ...original, names: ["trend", ...original.names.slice(1)] },
      { ...original, names: ["bad_delim_name", ...original.names.slice(1)] },
      { ...original, names: [...original.names].reverse() },
      { ...original, names: [...original.names, "unused-name"] },
      { ...original, years: original.years.slice(1) },
      { ...original, years: [[[Number.MAX_SAFE_INTEGER, 0]], ...original.years.slice(1)] },
      { ...original, years: [[[1.5, 0]], ...original.years.slice(1)] },
      {
        ...original,
        years: [[[first[0]?.[0] ?? 0, original.names.length]], ...original.years.slice(1)],
      },
      { ...original, years: [[...first, ...first], ...original.years.slice(1)] },
      { ...original, years: [[...first].reverse(), ...original.years.slice(1)] },
      {
        ...original,
        coverage: { ...original.coverage, providerStartYear: 2101, providerEndYear: 2100 },
      },
      {
        ...original,
        coverage: {
          ...original.coverage,
          issues: [
            {
              country: "GB",
              firstYear: 2024,
              lastYear: 2025,
              reason: "missing-rule-table",
              disposition: "restriction",
              rule: "missing rule",
              description: "test evidence",
              sources: [
                {
                  path: "holidays/countries/united_kingdom.py",
                  symbol: "rule",
                  sha256: "a".repeat(64),
                  url: "https://github.com/vacanza/holidays/blob/v0.104/holidays/countries/united_kingdom.py",
                },
              ],
            },
          ],
        },
      },
      { ...original, unexpected: true },
    ];

    for (const candidate of bad) {
      const failure = await Effect.runPromise(Effect.flip(parseCountryHolidaySnapshot(candidate)));

      expect(failure).toBeInstanceOf(InvalidCountryHolidaySnapshot);
      expect(failure.issues.length).toBeGreaterThan(0);
    }
  });

  it("preserves separate names on an overlapping date", async () => {
    const china = await Effect.runPromise(
      parseCountryHolidaySnapshot(
        JSON.parse(
          await readFile(new URL("../../calendars/countries/CN.json", import.meta.url), "utf8"),
        ),
      ),
    );

    const entries = china.years.flat();
    const dates = new Set(entries.map(([day]) => day));

    expect(dates.size).toBeLessThan(entries.length);
  });
});
