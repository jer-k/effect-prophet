import { Cause, Effect, Exit, Option, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  CountryHolidayError,
  inspectCountryHolidays,
  parseCountryHolidays,
  resolveCountryHolidays,
  RetainedCountryHolidaySnapshotSchema,
} from "../src/country-holidays";
import { parseEventCalendar } from "../src/event";
import { countryHolidayCatalog } from "../src/internal/country-holiday-catalog";
import { freezeOwned } from "../src/internal/owned-input";
import { decodeOptions } from "../src/options";
import { fit, predict, predictUncertainty, prophetFittingBackendLayer } from "../src/index";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const loaderName = "effect-prophet.calendar.load-snapshot";

describe("country holiday inspection", () => {
  it("parses defaults and registered aliases without loading data", async () => {
    const { spans, tracer } = collectTestSpans();
    const caller = { country: "UK" };

    const selection = await Effect.runPromise(
      parseCountryHolidays(caller).pipe(Effect.withTracer(tracer)),
    );

    expect(selection).toEqual({ country: "GB", coverage: "reject-known-gaps", priorScale: 10 });
    expect(Object.isFrozen(selection)).toBe(true);
    expect(Object.isFrozen(caller)).toBe(false);
    expect(spans.some((span) => span.name === loaderName)).toBe(false);
    expect((await Effect.runPromise(parseCountryHolidays({ country: "TU" }))).country).toBe("TR");
    expect((await Effect.runPromise(parseCountryHolidays({ country: "USA" }))).country).toBe("US");
  });

  it("gives a selection without a prior the caller's default", async () => {
    const defaulted = await Effect.runPromise(parseCountryHolidays({ country: "US" }, 0.5));

    const explicit = await Effect.runPromise(
      parseCountryHolidays({ country: "US", priorScale: 4 }, 0.5),
    );

    expect(defaulted.priorScale).toBe(0.5);
    expect(explicit.priorScale).toBe(4);
  });

  it.each(["us", " US", "UnitedStates", "United States", "ZZ", "../US", "__proto__"])(
    "rejects unregistered or normalized country %s before the loader boundary",
    async (country) => {
      const { spans, tracer } = collectTestSpans();

      const failure = await Effect.runPromise(
        Effect.flip(inspectCountryHolidays({ country }, [2024]).pipe(Effect.withTracer(tracer))),
      );

      expect(failure).toBeInstanceOf(CountryHolidayError);
      expect(failure.reason).toBe("unknown-country");
      expect(failure.issues[0]?.path).toEqual(["country"]);
      expect(spans.some((span) => span.name === loaderName)).toBe(false);
    },
  );

  it.each([
    null,
    {},
    { country: 7 },
    { country: "US", priorScale: 0 },
    { country: "US", priorScale: Infinity },
    { country: "US", priorScale: NaN },
    { country: "US", coverage: "strict" },
    { country: "US", subdivision: "CA" },
  ])("rejects malformed selection before I/O: %j", async (selection) => {
    const { spans, tracer } = collectTestSpans();

    const failure = await Effect.runPromise(
      Effect.flip(inspectCountryHolidays(selection, [2024]).pipe(Effect.withTracer(tracer))),
    );

    expect(failure.reason).toBe("invalid-selection");
    expect(spans.some((span) => span.name === loaderName)).toBe(false);
  });

  it.each([[], [2024.5], [NaN], [Infinity], ["2024"], null])(
    "rejects malformed year selection before I/O: %j",
    async (years) => {
      const { spans, tracer } = collectTestSpans();

      const failure = await Effect.runPromise(
        Effect.flip(
          inspectCountryHolidays({ country: "US" }, years).pipe(Effect.withTracer(tracer)),
        ),
      );

      expect(failure.reason).toBe("invalid-selection");
      expect(failure.issues[0]?.path?.[0]).toBe("years");
      expect(spans.some((span) => span.name === loaderName)).toBe(false);
      expect(spans.some((span) => span.name === "Prophet.resolveCountryHolidays")).toBe(false);
    },
  );

  it.each([1994, 2061, -1, Number.MAX_SAFE_INTEGER])(
    "never extends the snapshot horizon for year %i",
    async (year) => {
      const { spans, tracer } = collectTestSpans();

      const failure = await Effect.runPromise(
        Effect.flip(
          inspectCountryHolidays({ country: "US", coverage: "allow-known-gaps" }, [year]).pipe(
            Effect.withTracer(tracer),
          ),
        ),
      );

      expect(failure.reason).toBe("outside-snapshot-horizon");
      expect(failure.issues[0]?.path).toEqual(["years", 0]);
      expect(spans.some((span) => span.name === loaderName)).toBe(false);
    },
  );

  it("deduplicates years and returns exact full-year occurrences with event defaults", async () => {
    const calendar = await Effect.runPromise(
      inspectCountryHolidays({ country: "US", priorScale: 2 }, [2022, 2021, 2022]),
    );

    const eventCalendar = await Effect.runPromise(
      parseEventCalendar(
        calendar.occurrences.map((event) => ({
          name: event.name,
          date: event.date,
          priorScale: event.priorScale,
        })),
      ),
    );

    expect(calendar.years).toEqual([2021, 2022]);
    expect(calendar.horizon).toEqual({ firstYear: 1995, lastYear: 2060 });
    expect(calendar.provider).toEqual({ prophet: "1.4.0", holidays: "0.104" });
    expect(calendar.snapshotId).toBe(countryHolidayCatalog.snapshotId);
    expect(calendar.completeOfficialCoverageVerified).toBe(false);
    expect(eventCalendar.occurrences).toEqual(calendar.occurrences);
    expect(calendar.occurrences).toContainEqual(
      expect.objectContaining({
        name: "New Year's Day (observed)",
        date: "2021-12-31",
        priorScale: 2,
        lowerWindowDays: 0,
        upperWindowDays: 0,
      }),
    );
    expect(Object.isFrozen(calendar.occurrences[0])).toBe(true);
    expect(Object.isFrozen(calendar)).toBe(true);
  });

  it.each([
    ["IN", 2000],
    ["IN", 2036],
    ["NP", 2033],
    ["NP", 2034],
    ["LK", 2027],
    ["ID", 2051],
    ["ES", 2007],
    ["GW", 2022],
    ["UA", 2022],
  ] as const)(
    "rejects reviewed restrictions in %s for %i; opt-in retains actual results and evidence",
    async (country, year) => {
      const failure = await Effect.runPromise(
        Effect.flip(inspectCountryHolidays({ country }, [year])),
      );

      const allowed = await Effect.runPromise(
        inspectCountryHolidays({ country, coverage: "allow-known-gaps" }, [year]),
      );

      expect(failure.reason).toBe("known-coverage-restriction");
      expect(failure.coverageIssues).toEqual(allowed.issues);
      expect(allowed.issues.some((issue) => issue.disposition === "restriction")).toBe(true);
      expect(allowed.issues.every((issue) => issue.sources.length > 0)).toBe(true);
    },
  );

  it("returns partial or empty provider data without fabrication", async () => {
    const india = await Effect.runPromise(
      inspectCountryHolidays({ country: "IN", coverage: "allow-known-gaps" }, [2036]),
    );

    const sriLanka = await Effect.runPromise(
      inspectCountryHolidays({ country: "LK", coverage: "allow-known-gaps" }, [2027]),
    );

    const ukraine = await Effect.runPromise(
      inspectCountryHolidays({ country: "UA", coverage: "allow-known-gaps" }, [2023]),
    );

    expect(india.occurrences.length).toBeGreaterThan(0);
    expect(india.occurrences.some((event) => event.name === "Holi")).toBe(false);
    expect(sriLanka.occurrences).toEqual([]);
    expect(ukraine.occurrences).toEqual([]);
  });

  it.each(["BV", "HM", "IO"])(
    "keeps deliberately empty %s distinct from missing coverage",
    async (country) => {
      const calendar = await Effect.runPromise(inspectCountryHolidays({ country }, [2060]));

      expect(calendar.occurrences).toEqual([]);
      expect(calendar.issues).toEqual([
        expect.objectContaining({ reason: "deliberately-empty", disposition: "advisory" }),
      ]);
    },
  );

  it("does not merge estimated-name transitions or classify them as missing dates", async () => {
    const calendar = await Effect.runPromise(
      inspectCountryHolidays({ country: "TU" }, [2032, 2033]),
    );

    const names = new Set<string>(calendar.occurrences.map((event) => event.name));

    expect(names.has("Eid al-Fitr")).toBe(true);
    expect(names.has("Eid al-Fitr (estimated)")).toBe(true);
    expect(calendar.issues).toEqual([
      expect.objectContaining({ reason: "estimated-dates", disposition: "advisory" }),
    ]);
  });

  it("resolves retained data and identity without emitting a filesystem span", async () => {
    const selection = await Effect.runPromise(parseCountryHolidays({ country: "US" }));
    const bundled = await Effect.runPromise(resolveCountryHolidays(selection, [2024]));

    // Embedded snapshots arrive deeply frozen from a parsed fitted model.
    const old = freezeOwned(
      Schema.decodeSync(RetainedCountryHolidaySnapshotSchema)({
        ...bundled.snapshot,
        snapshotId: `sha256:${"a".repeat(64)}`,
        // A synthetic earlier payload proves that embedded resolution does not
        // substitute the installed file's names or identity.
        data: {
          ...bundled.snapshot.data,
          names: ["Archived Christmas Day", ...bundled.snapshot.data.names.slice(1)],
        },
      }),
    );

    const { spans, tracer } = collectTestSpans();

    const embedded = await Effect.runPromise(
      resolveCountryHolidays(selection, [2060], old).pipe(Effect.withTracer(tracer)),
    );

    // Shared rather than deep-copied: cloning the snapshot dominated warm prediction.
    expect(embedded.snapshot).toBe(old);
    expect(Object.isFrozen(embedded.inspection)).toBe(true);
    expect(embedded.inspection.snapshotId).toBe(old.snapshotId);
    expect(embedded.inspection.provider.holidays).toBe("0.104");
    expect(embedded.inspection.occurrences).toContainEqual(
      expect.objectContaining({
        date: "2060-12-25",
        name: "Archived Christmas Day",
      }),
    );
    expect(spans.some((span) => span.name === loaderName)).toBe(false);
    expect(Object.fromEntries(spans[0]?.attributes ?? [])).toMatchObject({
      "effect_prophet.calendar.source": "embedded",
    });
    expect(
      await Effect.runPromise(Effect.flip(resolveCountryHolidays(selection, [2061], old))),
    ).toMatchObject({ reason: "outside-snapshot-horizon" });
  });

  it("traces complete success and coverage-failure operations with safe attributes and direct parentage", async () => {
    for (const country of ["US", "LK"]) {
      const { spans, tracer } = collectTestSpans();

      const exit = await Effect.runPromiseExit(
        inspectCountryHolidays({ country }, [2027]).pipe(
          Effect.withSpan("calendar.job"),
          Effect.withTracer(tracer),
        ),
      );

      const job = spans.find((span) => span.name === "calendar.job");
      const inspect = spans.find((span) => span.name === "Prophet.inspectCountryHolidays");
      const resolve = spans.find((span) => span.name === "Prophet.resolveCountryHolidays");
      const load = spans.find((span) => span.name === loaderName);

      expect(spans.filter((span) => span.name === loaderName)).toHaveLength(1);

      for (const [child, parent] of [
        [inspect, job],
        [resolve, inspect],
        [load, resolve],
      ]) {
        if (child === undefined || parent === undefined)
          throw new Error("Expected calendar boundary spans");

        const childStatus = requireEndedSpan(child);
        const parentStatus = requireEndedSpan(parent);

        expect(child.traceId).toBe(parent.traceId);
        expect(Option.getOrUndefined(child.parent)?.spanId).toBe(parent.spanId);
        expect(childStatus.startTime).toBeGreaterThanOrEqual(parentStatus.startTime);
        expect(childStatus.endTime).toBeLessThanOrEqual(parentStatus.endTime);
        expect(Exit.isSuccess(childStatus.exit)).toBe(child === load || country === "US");

        if (Exit.isFailure(childStatus.exit) && Exit.isFailure(exit)) {
          expect(Option.getOrUndefined(Cause.findErrorOption(childStatus.exit.cause))).toBe(
            Option.getOrUndefined(Cause.findErrorOption(exit.cause)),
          );
        }
      }

      expect(Object.fromEntries(load?.attributes ?? [])).toEqual({
        "effect_prophet.calendar.source": "bundled",
        "effect_prophet.calendar.name.count": country === "US" ? 16 : 31,
        "effect_prophet.calendar.partition.count": 66,
      });
      expect(Object.keys(Object.fromEntries(resolve?.attributes ?? [])).sort()).toEqual(
        country === "US"
          ? [
              "effect_prophet.calendar.coverage",
              "effect_prophet.calendar.issue.count",
              "effect_prophet.calendar.occurrence.count",
              "effect_prophet.calendar.source",
              "effect_prophet.calendar.year.count",
            ]
          : [
              "effect_prophet.calendar.coverage",
              "effect_prophet.calendar.source",
              "effect_prophet.calendar.year.count",
            ],
      );
    }
  });

  it("emits no calendar boundaries for ordinary fitting or empty predictions", async () => {
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      Effect.gen(function* () {
        const model = yield* fit([
          { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
          { timestamp: "2024-01-02T00:00:00.000Z", value: 3 },
          { timestamp: "2024-01-03T00:00:00.000Z", value: 4 },
        ]);

        expect(yield* predict(model, [])).toEqual([]);

        yield* predictUncertainty(model, [], { seed: 1, samples: 4 });
      }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
    );

    expect(
      spans.some(
        (span) => span.name.includes("calendar.") || span.name.includes("CountryHolidays"),
      ),
    ).toBe(false);
  });

  it("parses fit selections without calendar I/O", async () => {
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(decodeOptions({}).pipe(Effect.withTracer(tracer)));

    expect(spans.some((span) => span.name === loaderName)).toBe(false);

    const options = await Effect.runPromise(
      decodeOptions({ countryHolidays: { country: "USA" } }).pipe(Effect.withTracer(tracer)),
    );

    expect(options.countryHolidays).toEqual({
      country: "US",
      coverage: "reject-known-gaps",
      priorScale: 10,
    });
    expect(spans.some((span) => span.name === loaderName)).toBe(false);
  });
});
