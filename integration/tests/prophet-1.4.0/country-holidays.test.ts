import { Effect, Match } from "effect";
import { describe, expect, it } from "vitest";

import { loadProphetFixtureBundle } from "../../helpers/prophet-fixture";
import { fit, predict, prophetFittingBackendLayer, parseCountryHolidays } from "../../../src/index";
import { emptyEventCalendar } from "../../../src/event";
import { featureNameDelimiter, comparePythonStrings } from "../../../src/feature-name";
import {
  fitCountryHolidayEvents,
  predictCountryHolidayEvents,
} from "../../../src/internal/country-holiday-model";
import { createEventFeatures } from "../../../src/internal/event-features";

const off = { daily: "off", weekly: "off", yearly: "off" } as const;

const columnNames = (model: { readonly events: typeof emptyEventCalendar }) =>
  model.events.columns.map(
    (column) =>
      `${column.eventName}${featureNameDelimiter}${column.offsetDays >= 0 ? "+" : ""}${column.offsetDays}`,
  );

describe("Prophet 1.4.0 / holidays 0.104 country calendars", () => {
  it("matches full-year frozen features, ignored new names, estimates and empty calendars", async () => {
    const { countryHolidays: fixture } = await Effect.runPromise(loadProphetFixtureBundle());
    expect(fixture.provider).toEqual({ prophet: "1.4.0", holidays: "0.104" });

    for (const reference of fixture.featureCases) {
      const selection = await Effect.runPromise(
        parseCountryHolidays({ country: reference.country, coverage: "allow-known-gaps" }),
      );

      const trainingTimestamps = reference.observations.map((row) => Date.parse(row.timestamp));

      const { events, state } = await Effect.runPromise(
        fitCountryHolidayEvents(selection, trainingTimestamps, emptyEventCalendar),
      );

      const timestamps = reference.predictionTimestamps.map(Date.parse);

      const predictionEvents = await Effect.runPromise(
        predictCountryHolidayEvents(state, timestamps, events),
      );

      const training = await Effect.runPromise(createEventFeatures(trainingTimestamps, events));
      const prediction = await Effect.runPromise(createEventFeatures(timestamps, predictionEvents));

      expect(columnNames({ events })).toEqual(reference.expected.columnNames);
      expect(
        events.layout.components.map((component) => component.name).sort(comparePythonStrings),
      ).toEqual(reference.expected.eventNames);
      expect(events.layout.priorScales).toEqual(reference.expected.priorScales);
      expect(Array.from(training.values)).toEqual(reference.expected.trainingRowMajor);
      expect(Array.from(prediction.values)).toEqual(reference.expected.predictionRowMajor);
      expect(predictionEvents.columns).toBe(events.columns);
      expect(
        predictionEvents.occurrences.some((occurrence) =>
          reference.expected.ignoredCountryNames.includes(occurrence.name),
        ),
      ).toBe(false);

      if (reference.id === "estimated-name-transition") {
        expect(
          reference.expected.ignoredCountryNames.some((name) => name.includes("(estimated)")),
        ).toBe(true);
        expect(reference.expected.eventNames).toContain("Chinese New Year");
        expect(reference.expected.eventNames).not.toContain("Chinese New Year (estimated)");
      }
    }
  });

  it("matches fitted country + custom forecasts for every trend and mode", async () => {
    const { countryHolidays: fixture } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const reference of fixture.fittedCases) {
      const common = {
        countryHolidays: { country: reference.country },
        events: reference.events,
        holidaysMode: reference.mode,
        builtInSeasonalities: off,
        map: { optimizer: { algorithm: "newton", maxIterations: 10_000 } },
      } as const;

      const options = Match.value(reference.growth).pipe(
        Match.when("flat", () => ({ ...common, growth: "flat" as const })),
        Match.when("logistic", () => ({
          ...common,
          growth: "logistic" as const,
          map: { ...common.map, changepoints: { mode: "explicit" as const, timestamps: [] } },
        })),
        Match.when("linear", () => ({
          ...common,
          growth: "linear" as const,
          map: { ...common.map, changepoints: { mode: "explicit" as const, timestamps: [] } },
        })),
        Match.exhaustive,
      );

      const model = await Effect.runPromise(
        fit(reference.observations, options).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      const state = model.countryHolidays;

      if (state === undefined) throw new Error("Expected retained country fixture state");
      const timestamps = reference.predictionRows.map((row) => Date.parse(row.timestamp));

      const events = await Effect.runPromise(
        predictCountryHolidayEvents(state, timestamps, model.events),
      );

      const trainingMatrix = await Effect.runPromise(
        createEventFeatures(
          reference.observations.map((row) => Date.parse(row.timestamp)),
          model.events,
        ),
      );

      const predictionMatrix = await Effect.runPromise(createEventFeatures(timestamps, events));

      expect(columnNames(model)).toEqual(reference.expected.columnNames);
      expect(Array.from(trainingMatrix.values)).toEqual(reference.expected.trainingRowMajor);
      expect(Array.from(predictionMatrix.values)).toEqual(reference.expected.predictionRowMajor);
      const forecasts = await Effect.runPromise(predict(model, reference.predictionRows));

      for (const [row, forecast] of forecasts.entries()) {
        for (const field of ["trend", "value", "additive", "multiplicative"] as const) {
          const expected = reference.expected[field][row];

          if (expected === undefined) throw new Error("Missing fixture row");

          const tolerance =
            reference.tolerance.absolute + Math.abs(expected) * reference.tolerance.relative;

          expect(
            Math.abs(forecast[field] - expected),
            `${reference.id}: ${field}`,
          ).toBeLessThanOrEqual(tolerance);
        }
      }
    }
  }, 60_000);
});
