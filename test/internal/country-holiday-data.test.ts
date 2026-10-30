import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { Cause, Effect, Exit, Match, Option, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { parseCountryHolidays } from "../../src/country-holidays";
import { countryHolidayCatalog } from "../../src/internal/country-holiday-catalog";
import {
  CountryHolidayDataError,
  loadCountryHolidaySnapshot,
} from "../../src/internal/country-holiday-data";
import { CanonicalCountrySchema } from "../../src/internal/country-holiday-snapshot";
import { collectTestSpans, requireEndedSpan } from "./tracing-test-helpers";

const root = new URL("../../calendars/", import.meta.url);

const loaderName = "effect-prophet.calendar.load-snapshot";

describe("packaged country snapshot loader", () => {
  it("loads every allowlisted country through real files and preserves canonical identity", async () => {
    for (const code of Object.keys(countryHolidayCatalog.countries)) {
      const country = Schema.decodeSync(CanonicalCountrySchema)(code);
      const snapshot = await Effect.runPromise(loadCountryHolidaySnapshot(country));

      expect(snapshot.country).toBe(code);
      expect(snapshot.years).toHaveLength(66);
      expect(Object.isFrozen(snapshot)).toBe(true);
      expect(Object.isFrozen(snapshot.years[0])).toBe(true);
      expect(Object.isFrozen(snapshot.coverage.issues)).toBe(true);
    }
  });

  it.each([
    ["missing", "snapshot-unavailable"],
    ["invalid-json", "corrupt-snapshot"],
    ["changed-bytes", "corrupt-snapshot"],
    ["invalid-header", "corrupt-snapshot"],
    ["future-version", "unsupported-snapshot-version"],
  ] as const)(
    "classifies %s through a real filesystem seam and fails the complete boundary",
    async (fixture, reason) => {
      const directory = await mkdtemp(join(tmpdir(), "effect-prophet-calendar-"));

      try {
        const selected = await Effect.runPromise(parseCountryHolidays({ country: "US" }));
        const countryRoot = pathToFileURL(`${directory}/`);

        await mkdir(join(directory, "countries"));

        if (fixture !== "missing") {
          const bundled = await readFile(new URL("countries/US.json", root), "utf8");

          const data = Match.value(fixture).pipe(
            Match.when("invalid-json", () => "{"),
            Match.when("changed-bytes", () => `${bundled} `),
            Match.when("invalid-header", () => "{}"),
            Match.when("future-version", () => '{"schemaVersion":2}'),
            Match.exhaustive,
          );

          await writeFile(join(directory, "countries/US.json"), data);
        }

        const { spans, tracer } = collectTestSpans();

        const failure = await Effect.runPromise(
          Effect.flip(
            loadCountryHolidaySnapshot(selected.country, countryRoot).pipe(
              Effect.withSpan("calendar.adapter.job"),
              Effect.withTracer(tracer),
            ),
          ),
        );

        const boundary = spans.find((span) => span.name === loaderName);
        const job = spans.find((span) => span.name === "calendar.adapter.job");

        expect(failure).toBeInstanceOf(CountryHolidayDataError);
        expect(failure.reason).toBe(reason);

        if (boundary === undefined || job === undefined)
          throw new Error("Expected adapter boundary spans");

        const child = requireEndedSpan(boundary);
        const parent = requireEndedSpan(job);

        expect(boundary.traceId).toBe(job.traceId);
        expect(Option.getOrUndefined(boundary.parent)?.spanId).toBe(job.spanId);
        expect(child.startTime).toBeGreaterThanOrEqual(parent.startTime);
        expect(child.endTime).toBeLessThanOrEqual(parent.endTime);
        expect(Exit.isFailure(child.exit)).toBe(true);
        expect(Exit.isFailure(parent.exit)).toBe(true);
        expect(Object.fromEntries(boundary.attributes)).toEqual({
          "effect_prophet.calendar.source": "bundled",
        });

        if (Exit.isFailure(child.exit)) {
          expect(Option.getOrUndefined(Cause.findErrorOption(child.exit.cause))).toBe(failure);
        }
      } finally {
        await rm(directory, { recursive: true, force: true });
      }
    },
  );

  it("reads afresh on repeated operations rather than hiding file damage in a cache", async () => {
    const directory = await mkdtemp(join(tmpdir(), "effect-prophet-calendar-"));

    try {
      const selected = await Effect.runPromise(parseCountryHolidays({ country: "US" }));
      const countryRoot = pathToFileURL(`${directory}/`);
      const file = join(directory, "countries/US.json");

      await mkdir(join(directory, "countries"));
      await writeFile(file, await readFile(new URL("countries/US.json", root)));

      const snapshot = await Effect.runPromise(
        loadCountryHolidaySnapshot(selected.country, countryRoot),
      );

      expect(snapshot.country).toBe("US");

      await writeFile(file, "{}");

      const failure = await Effect.runPromise(
        Effect.flip(loadCountryHolidaySnapshot(selected.country, countryRoot)),
      );

      expect(failure.reason).toBe("corrupt-snapshot");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
