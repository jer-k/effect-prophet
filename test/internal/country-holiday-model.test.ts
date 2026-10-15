import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { CountryHolidayError, parseCountryHolidays } from "../../src/country-holidays";
import { emptyEventCalendar, parseEventCalendar } from "../../src/event";
import {
  CountryHolidayModelSchema,
  ParsedCountryHolidayModelSchema,
  countryHolidayModelFields,
  countryHolidayTrainingEventsMatch,
  countryHolidayYears,
  decodedCountryHolidayFields,
  encodedCountryHolidayFields,
  fitCountryHolidayEvents,
  predictCountryHolidayEvents,
} from "../../src/internal/country-holiday-model";

const noon = (year: number, month: number, day: number) => Date.UTC(year, month - 1, day, 12);

const trainingTimestamps = [noon(2024, 1, 1), noon(2024, 7, 4), noon(2024, 12, 31)];

const selection = await Effect.runPromise(parseCountryHolidays({ country: "US" }));

const fitted = await Effect.runPromise(
  fitCountryHolidayEvents(selection, trainingTimestamps, emptyEventCalendar),
);

const decodeParsedState = Schema.decodeUnknownEffect(ParsedCountryHolidayModelSchema);

describe("country holiday model state", () => {
  it("resolves the unique UTC years represented by timestamps, in order", () => {
    expect(
      countryHolidayYears([noon(2025, 1, 1), noon(2023, 6, 1), noon(2025, 3, 1), noon(2024, 1, 1)]),
    ).toEqual([2023, 2024, 2025]);
    // The UTC year, not the local year, decides the partition.
    expect(countryHolidayYears([Date.UTC(2024, 0, 1, 0, 30)])).toEqual([2024]);
  });

  it("builds a frozen trusted state whose training calendar matches without being rebuilt", async () => {
    expect(fitted.state.trainingYears).toEqual([2024]);
    expect(fitted.state.selection).toBe(selection);
    expect(Object.isFrozen(fitted.state)).toBe(true);
    expect(Object.isFrozen(fitted.state.snapshot.data.years[0])).toBe(true);
    expect(fitted.events.occurrences.some((event) => event.name === "Independence Day")).toBe(true);

    // The recorded state is accepted by identity rather than re-decoded.
    expect(await Effect.runPromise(decodeParsedState(fitted.state))).toBe(fitted.state);
    expect(
      await Effect.runPromise(countryHolidayTrainingEventsMatch(fitted.state, fitted.events)),
    ).toBe(true);

    const fewer = { ...fitted.events, occurrences: fitted.events.occurrences.slice(1) };

    expect(await Effect.runPromise(countryHolidayTrainingEventsMatch(fitted.state, fewer))).toBe(
      false,
    );
  });

  it("fully validates and rebuilds the training calendar for a state it has not seen", async () => {
    const copy = structuredClone(fitted.state);
    const decoded = await Effect.runPromise(decodeParsedState(copy));

    expect(decoded).not.toBe(fitted.state);
    expect(decoded).toEqual(fitted.state);
    expect(await Effect.runPromise(countryHolidayTrainingEventsMatch(decoded, fitted.events))).toBe(
      true,
    );

    // Schema-invalid state fails decoding: training years must be unique and increasing.
    const malformed = { ...structuredClone(fitted.state), trainingYears: [2024, 2024] };

    expect(await Effect.runPromise(Effect.flip(decodeParsedState(malformed)))).toBeInstanceOf(
      Schema.SchemaError,
    );

    // Schema-valid state with other training years implies a different training calendar.
    const otherYears = await Effect.runPromise(
      decodeParsedState({ ...structuredClone(fitted.state), trainingYears: [2025] }),
    );

    expect(
      await Effect.runPromise(countryHolidayTrainingEventsMatch(otherYears, fitted.events)),
    ).toBe(false);
  });

  it("copies state only for encoded payloads and trusts state a payload decode validated", async () => {
    expect(countryHolidayModelFields(fitted.state).countryHolidays).toBe(fitted.state);
    expect(countryHolidayModelFields(undefined)).toEqual({});

    const encoded = encodedCountryHolidayFields(fitted.state).countryHolidays;

    expect(encoded).toEqual(fitted.state);
    expect(encoded).not.toBe(fitted.state);
    expect(Object.isFrozen(encoded)).toBe(false);

    const validated = await Effect.runPromise(
      Schema.decodeUnknownEffect(CountryHolidayModelSchema)(structuredClone(fitted.state)),
    );

    const trusted = decodedCountryHolidayFields(validated).countryHolidays;

    expect(trusted).toBe(validated);
    expect(Object.isFrozen(validated.snapshot.data.years[0])).toBe(true);
    expect(await Effect.runPromise(decodeParsedState(validated))).toBe(validated);
  });

  it("rejects a custom event sharing a country holiday's name but not its prior", async () => {
    const custom = await Effect.runPromise(
      parseEventCalendar([{ name: "Independence Day", date: "2024-07-05", priorScale: 3 }]),
    );

    const failure = await Effect.runPromise(
      Effect.flip(fitCountryHolidayEvents(selection, trainingTimestamps, custom)),
    );

    expect(failure).toBeInstanceOf(CountryHolidayError);
    expect(failure).toMatchObject({
      reason: "conflicting-event-prior",
      issues: [{ path: ["priorScale"] }],
    });

    // The same name with the selection's prior merges into one effect.
    const compatible = await Effect.runPromise(
      parseEventCalendar([{ name: "Independence Day", date: "2024-07-05" }]),
    );

    const merged = await Effect.runPromise(
      fitCountryHolidayEvents(selection, trainingTimestamps, compatible),
    );

    expect(
      merged.events.occurrences.filter((event) => event.name === "Independence Day"),
    ).toHaveLength(2);
  });

  it("expands prediction years into trained names only, keeping the fitted columns", async () => {
    const events = await Effect.runPromise(
      predictCountryHolidayEvents(fitted.state, [noon(2025, 7, 4)], fitted.events),
    );

    const trained = new Set(fitted.events.columns.map((column) => column.eventName));

    expect(events.columns).toBe(fitted.events.columns);
    expect(events.layout).toBe(fitted.events.layout);
    expect(events.occurrences.every((event) => trained.has(event.name))).toBe(true);
    expect(events.occurrences).toContainEqual(
      expect.objectContaining({ name: "Independence Day", date: "2025-07-04" }),
    );

    const outside = await Effect.runPromise(
      Effect.flip(predictCountryHolidayEvents(fitted.state, [noon(2061, 1, 1)], fitted.events)),
    );

    expect(outside).toMatchObject({ reason: "outside-snapshot-horizon" });
  });
});
