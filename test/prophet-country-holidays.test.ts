import { Cause, Effect, Exit, Match, Option } from "effect";
import { describe, expect, it } from "vitest";

import {
  decodeFittedModel,
  encodeFittedModel,
  fit,
  inspectCountryHolidays,
  predict,
  predictUncertainty,
  prophetFittingBackendLayer,
  InputValidationError,
  FittingError,
  PredictionError,
  ModelSerializationError,
  type EncodedProphetOptions,
} from "../src/index";
import { InvalidFittedModel, parseFittedModel } from "../src/fitted-model";
import { createEventFeatures } from "../src/internal/event-features";
import { encodeEventOccurrences } from "../src/event";
import { predictCountryHolidayEvents } from "../src/internal/country-holiday-model";
import { FittingBackend } from "../src/internal/fitting-backend";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const off = { daily: "off", weekly: "off", yearly: "off" } as const;

const at = (year: number, day: number) => new Date(Date.UTC(year, 0, day, 12)).toISOString();

const history = (year = 2024) =>
  Array.from({ length: 80 }, (_, index) => ({
    timestamp: at(year, index + 1),
    value: 20 + index * 0.03 + Math.sin(index * 0.8) * 0.15 + (index === 0 ? 5 : 0),
  }));

const runFit = (options: EncodedProphetOptions, rows = history()) =>
  Effect.runPromise(
    fit(rows, { builtInSeasonalities: off, ...options }).pipe(
      Effect.provide(prophetFittingBackendLayer),
    ),
  );

// Exercise the public WASM lifecycle, not a holiday-specific numerical implementation.
describe("country holiday model lifecycle", () => {
  it.each(["linear", "flat", "logistic"] as const)(
    "fits and restores %s country events in both modes",
    async (growth) => {
      for (const mode of ["additive", "multiplicative"] as const) {
        const rows = history().map((row) =>
          growth === "logistic" ? { ...row, capacity: 100, floor: 0 } : row,
        );

        const options = { holidaysMode: mode, countryHolidays: { country: "USA" } };

        const fitOptions = Match.value(growth).pipe(
          Match.when("flat", () => ({ ...options, growth: "flat" as const })),
          Match.when("linear", () => ({ ...options, growth: "linear" as const })),
          Match.when("logistic", () => ({ ...options, growth: "logistic" as const })),
          Match.exhaustive,
        );

        const model = await runFit(fitOptions, rows);

        const state = model.countryHolidays;

        expect(state?.selection).toEqual({
          country: "US",
          coverage: "reject-known-gaps",
          priorScale: 10,
        });
        expect(state?.trainingYears).toEqual([2024]);
        expect(state?.customEvents.occurrences).toEqual([]);
        expect(Object.isFrozen(state?.snapshot.data.years)).toBe(true);
        expect(model.events.columns.every((column) => column.offsetDays === 0)).toBe(true);
        expect(model.events.layout.components.every((component) => component.mode === mode)).toBe(
          true,
        );
        expect(model.eventCoefficients).toHaveLength(model.events.columns.length);

        const christmasIndex = model.events.columns.findIndex(
          (column) => column.eventName === "Christmas Day",
        );

        const training = await Effect.runPromise(
          createEventFeatures(
            rows.map((row) => Date.parse(row.timestamp)),
            model.events,
          ),
        );

        expect(christmasIndex).toBeGreaterThanOrEqual(0);
        expect(
          Array.from(
            { length: rows.length },
            (_, row) => training.values[row * training.columnCount + christmasIndex],
          ).every((value) => value === 0),
        ).toBe(true);

        const future = [at(2025, 1), at(2025, 2), at(2025, 1)].map((timestamp) =>
          growth === "logistic" ? { timestamp, capacity: 100, floor: 0 } : timestamp,
        );

        const before = await Effect.runPromise(predict(model, future));
        const holiday = before[0]?.events.find((event) => event.name === "New Year's Day");

        expect(holiday?.mode).toBe(mode);
        expect(holiday?.mode === "additive" ? holiday.value : holiday?.factor).not.toBe(0);
        expect(before[0]).toEqual(before[2]);
        expect(
          before[1]?.events.every((event) =>
            event.mode === "additive" ? event.value === 0 : event.factor === 0,
          ),
        ).toBe(true);

        const uncertainty = { seed: 17, samples: 8, output: "samples" } as const;
        const samples = await Effect.runPromise(predictUncertainty(model, future, uncertainty));
        const encoded = await Effect.runPromise(encodeFittedModel(model));

        const restored = await Effect.runPromise(
          decodeFittedModel(JSON.parse(JSON.stringify(encoded))),
        );

        expect(await Effect.runPromise(predict(restored, future))).toEqual(before);
        expect(await Effect.runPromise(predictUncertainty(restored, future, uncertainty))).toEqual(
          samples,
        );
      }
    },
  );

  it("matches equivalent explicit events alongside conditional seasonality and regressors", async () => {
    const calendar = await Effect.runPromise(
      inspectCountryHolidays({ country: "US" }, [2024, 2025]),
    );

    const events = [
      { name: "campaign", date: "2024-01-05", priorScale: 3 },
      { name: "campaign", date: "2025-01-05", priorScale: 3 },
    ];

    const common = {
      growth: "flat",
      holidaysMode: "multiplicative",
      seasonalities: [
        { name: "weekly-active", periodDays: 7, fourierOrder: 1, conditionName: "active" },
      ],
      regressors: [{ name: "promotion", standardization: "never" }],
    } as const;

    const rows = history().map((row, index) => ({
      ...row,
      value: row.value + (index % 3 === 0 ? 0.5 : 0),
      conditions: { active: index % 4 !== 0 },
      regressors: { promotion: index % 3 === 0 ? 1 : 0 },
    }));

    const country = await runFit({ ...common, events, countryHolidays: { country: "US" } }, rows);

    const explicit = await runFit(
      { ...common, events: [...events, ...encodeEventOccurrences(calendar.occurrences)] },
      rows,
    );

    const future = [1, 2, 5].map((day) => ({
      timestamp: at(2025, day),
      conditions: { active: day !== 2 },
      regressors: { promotion: day === 5 ? 1 : 0 },
    }));

    expect(country.eventCoefficients).toEqual(explicit.eventCoefficients);
    expect(country.coefficients).toEqual(explicit.coefficients);
    expect(await Effect.runPromise(predict(country, future))).toEqual(
      await Effect.runPromise(predict(explicit, future)),
    );
    const options = { seed: 42, samples: 8, output: "samples" } as const;

    expect(await Effect.runPromise(predictUncertainty(country, future, options))).toEqual(
      await Effect.runPromise(predictUncertainty(explicit, future, options)),
    );
  });

  it("merges compatible custom names/windows and rejects conflicting priors and global names", async () => {
    const events = [
      {
        name: "New Year's Day",
        date: "2025-01-05",
        lowerWindowDays: -1,
        upperWindowDays: 1,
        priorScale: 10,
      },
    ];

    const model = await runFit({ countryHolidays: { country: "US" }, events });

    expect(model.countryHolidays?.customEvents.occurrences).toHaveLength(1);
    expect(
      model.events.columns.filter((column) => column.eventName === "New Year's Day"),
    ).toHaveLength(3);

    const forecasts = await Effect.runPromise(
      predict(model, [at(2025, 4), at(2025, 5), at(2025, 6)]),
    );

    expect(forecasts).toHaveLength(3);

    const failure = await Effect.runPromise(
      Effect.flip(
        fit(history(), {
          countryHolidays: { country: "US", priorScale: 5 },
          events,
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(failure).toBeInstanceOf(InputValidationError);
    expect(failure).toMatchObject({ input: "options" });
    expect(failure.message).toContain("consistent prior");

    for (const options of [
      { seasonalities: [{ name: "Christmas Day", periodDays: 10, fourierOrder: 1 }] },
      {
        seasonalities: [
          { name: "conditional", periodDays: 10, fourierOrder: 1, conditionName: "Christmas Day" },
        ],
      },
      { regressors: [{ name: "Christmas Day" }] },
    ] as const) {
      const rows = history().map((row) => {
        if ("regressors" in options) {
          return { ...row, regressors: { "Christmas Day": 1 } };
        }

        if ("conditionName" in options.seasonalities[0]) {
          return { ...row, conditions: { "Christmas Day": true } };
        }

        return row;
      });

      const error = await Effect.runPromise(
        Effect.flip(
          fit(rows, {
            ...options,
            countryHolidays: { country: "US" },
            builtInSeasonalities: off,
          }).pipe(Effect.provide(prophetFittingBackendLayer)),
        ),
      );

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error).toMatchObject({ input: "options" });
    }
  });

  it("rejects a future country/custom prior collision for a name originally trained only as custom", async () => {
    const calendar = await Effect.runPromise(inspectCountryHolidays({ country: "US" }, [2021]));

    const holiday = calendar.occurrences.find(
      (occurrence) =>
        occurrence.name.includes("Juneteenth") && !occurrence.name.includes("observed"),
    );

    if (holiday === undefined) throw new Error("Expected newly introduced Juneteenth holiday");

    const model = await runFit(
      {
        countryHolidays: { country: "US" },
        events: [{ name: holiday.name, date: "2010-01-03", priorScale: 3 }],
      },
      history(2010),
    );

    for (const operation of [
      Effect.asVoid(predict(model, [at(2021, 170)])),
      Effect.asVoid(predictUncertainty(model, [at(2021, 170)], { seed: 1, samples: 4 })),
    ]) {
      const { spans, tracer } = collectTestSpans();
      const error = await Effect.runPromise(Effect.flip(operation.pipe(Effect.withTracer(tracer))));

      expect(error).toBeInstanceOf(PredictionError);
      expect(error).toMatchObject({ reason: "conflicting-event-prior" });
      expect(spans.some((span) => span.name.includes("wasm."))).toBe(false);
    }
  });

  it("freezes training-year names and ignores new future names without dropping trained zero columns", async () => {
    const model = await runFit({ countryHolidays: { country: "US" } }, history(2010));
    const state = model.countryHolidays;

    if (state === undefined) throw new Error("Expected embedded country state");

    expect(model.events.columns.some((column) => column.eventName.includes("Juneteenth"))).toBe(
      false,
    );
    expect(
      (await Effect.runPromise(inspectCountryHolidays({ country: "US" }, [2021]))).occurrences.some(
        (occurrence) => occurrence.name.includes("Juneteenth"),
      ),
    ).toBe(true);

    const timestamps = [Date.parse(at(2021, 170)), Date.parse("2021-12-31T12:00:00Z")];

    const calendar = await Effect.runPromise(
      predictCountryHolidayEvents(state, timestamps, model.events),
    );

    const matrix = await Effect.runPromise(createEventFeatures(timestamps, calendar));

    expect(calendar.columns).toBe(model.events.columns);
    expect(calendar.layout).toBe(model.events.layout);
    expect(calendar.occurrences.some((occurrence) => occurrence.name.includes("Juneteenth"))).toBe(
      false,
    );
    expect(matrix.columnCount).toBe(model.events.columns.length);
    expect(Array.from(matrix.values.slice(0, matrix.columnCount))).toEqual(
      Array(matrix.columnCount).fill(0),
    );

    const observed = model.events.columns.findIndex(
      (column) => column.eventName === "New Year's Day (observed)",
    );

    expect(matrix.values[matrix.columnCount + observed]).toBe(1);
  });

  it("uses represented years only, retaining opt-in coverage evidence", async () => {
    const rows = [2001, 2035].flatMap((year) => history(year).slice(0, 4));
    const model = await runFit({ growth: "flat", countryHolidays: { country: "IN" } }, rows);
    expect(model.countryHolidays?.trainingYears).toEqual([2001, 2035]);

    const partial = await runFit(
      { growth: "flat", countryHolidays: { country: "IN", coverage: "allow-known-gaps" } },
      history(2036),
    );

    expect(
      partial.countryHolidays?.trainingIssues.some((issue) => issue.disposition === "restriction"),
    ).toBe(true);
    expect(await Effect.runPromise(predict(partial, [at(2037, 1)]))).toHaveLength(1);
  });

  it("checks prediction coverage even when the fitted calendar has no columns", async () => {
    const model = await runFit({
      growth: "flat",
      holidaysMode: "multiplicative",
      countryHolidays: { country: "BV" },
    });

    expect(model.events.mode).toBe("multiplicative");
    expect(model.events.columns).toEqual([]);

    for (const operation of [
      Effect.asVoid(predict(model, [at(2061, 1)])),
      Effect.asVoid(predictUncertainty(model, [at(2061, 1)], { seed: 1, samples: 4 })),
    ]) {
      const { spans, tracer } = collectTestSpans();

      const failure = await Effect.runPromise(
        Effect.flip(operation.pipe(Effect.withTracer(tracer))),
      );

      expect(failure).toBeInstanceOf(PredictionError);
      expect(failure).toMatchObject({ reason: "outside-snapshot-horizon" });
      expect(spans.some((span) => span.name.includes("wasm."))).toBe(false);
      expect(spans.some((span) => span.name === "effect-prophet.calendar.load-snapshot")).toBe(
        false,
      );
    }

    const { spans, tracer } = collectTestSpans();
    await Effect.runPromise(predict(model, []).pipe(Effect.withTracer(tracer)));
    await Effect.runPromise(
      predictUncertainty(model, [], { seed: 1, samples: 4 }).pipe(Effect.withTracer(tracer)),
    );
    expect(spans.some((span) => span.name === "Prophet.resolveCountryHolidays")).toBe(false);
  });

  it("translates fit and future restrictions without entering WASM", async () => {
    const { spans, tracer } = collectTestSpans();

    const failure = await Effect.runPromise(
      Effect.flip(
        fit(history(2036), {
          countryHolidays: { country: "IN" },
        }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
      ),
    );

    expect(failure).toBeInstanceOf(FittingError);
    expect(failure).toMatchObject({ reason: "known-coverage-restriction" });
    expect(spans.some((span) => span.name.includes("wasm."))).toBe(false);
    const resolution = spans.find((span) => span.name === "Prophet.resolveCountryHolidays");
    const parent = spans.find((span) => span.name === "Prophet.fit");

    if (resolution === undefined || parent === undefined)
      throw new Error("Expected failed calendar trace");
    const ended = requireEndedSpan(resolution);
    const parentEnded = requireEndedSpan(parent);

    expect(Exit.isFailure(ended.exit)).toBe(true);
    expect(Exit.isFailure(parentEnded.exit)).toBe(true);
    expect(resolution.traceId).toBe(parent.traceId);
    expect(Option.getOrUndefined(resolution.parent)?.spanId).toBe(parent.spanId);
    expect(ended.startTime).toBeGreaterThanOrEqual(parentEnded.startTime);
    expect(ended.endTime).toBeLessThanOrEqual(parentEnded.endTime);

    if (Exit.isFailure(ended.exit) && failure instanceof FittingError) {
      expect(Option.getOrUndefined(Cause.findErrorOption(ended.exit.cause))).toBe(failure.cause);
    }

    const model = await runFit({ countryHolidays: { country: "LK" } });

    for (const operation of [
      Effect.asVoid(predict(model, [at(2027, 1)])),
      Effect.asVoid(predictUncertainty(model, [at(2027, 1)], { seed: 1, samples: 4 })),
    ]) {
      const error = await Effect.runPromise(Effect.flip(operation));

      expect(error).toBeInstanceOf(PredictionError);
      expect(error).toMatchObject({ reason: "known-coverage-restriction" });
    }
  });

  it("traces one bundled resolution on fit and one embedded resolution per prediction", async () => {
    const { spans, tracer } = collectTestSpans();

    const model = await Effect.runPromise(
      fit(history(), {
        builtInSeasonalities: off,
        countryHolidays: { country: "US" },
      }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
    );

    await Effect.runPromise(predict(model, [at(2025, 1)]).pipe(Effect.withTracer(tracer)));
    await Effect.runPromise(
      predictUncertainty(model, [at(2025, 1)], { seed: 2, samples: 4 }).pipe(
        Effect.withTracer(tracer),
      ),
    );

    const resolutions = spans.filter((span) => span.name === "Prophet.resolveCountryHolidays");
    expect(resolutions).toHaveLength(3);
    expect(
      spans.filter((span) => span.name === "effect-prophet.calendar.load-snapshot"),
    ).toHaveLength(1);

    for (const [index, resolution] of resolutions.entries()) {
      const parentName = ["Prophet.fit", "Prophet.predict", "Prophet.predictUncertainty"][index];
      const parent = spans.find((span) => span.name === parentName);

      if (parent === undefined) throw new Error("Expected public parent span");
      expect(resolution.traceId).toBe(parent.traceId);
      expect(Option.getOrUndefined(resolution.parent)?.spanId).toBe(parent.spanId);
      expect(Object.fromEntries(resolution.attributes)).toEqual({
        "effect_prophet.calendar.source": index === 0 ? "bundled" : "embedded",
        "effect_prophet.calendar.coverage": "reject-known-gaps",
        "effect_prophet.calendar.year.count": 1,
        "effect_prophet.calendar.occurrence.count":
          index === 0 ? model.events.occurrences.length : 11,
        "effect_prophet.calendar.issue.count": 0,
      });
      const ended = requireEndedSpan(resolution);
      const parentEnded = requireEndedSpan(parent);

      expect(Exit.isSuccess(ended.exit)).toBe(true);
      expect(ended.startTime).toBeGreaterThanOrEqual(parentEnded.startTime);
      expect(ended.endTime).toBeLessThanOrEqual(parentEnded.endTime);
    }

    // Calendar merges and provenance checks are internal; only option decoding parses settings.
    const eventParses = spans.filter((span) => span.name === "Prophet.parseEventCalendar");
    const decodeOptions = spans.find((span) => span.name === "Prophet.decodeOptions");

    expect(eventParses).toHaveLength(1);
    expect(Option.getOrUndefined(eventParses[0]?.parent ?? Option.none())?.spanId).toBe(
      decodeOptions?.spanId,
    );
  });

  it("rejects a real backend response whose event provenance was misaligned", async () => {
    const failure = await Effect.runPromise(
      Effect.flip(
        Effect.gen(function* () {
          const backend = yield* FittingBackend;

          return yield* fit(history(), { countryHolidays: { country: "US" } }).pipe(
            Effect.provideService(FittingBackend, {
              fit: (input, plan) =>
                backend.fit(input, plan).pipe(
                  Effect.map((parameters) => {
                    if (parameters.events === undefined)
                      throw new Error("Expected fitted event metadata");

                    return { ...parameters, events: { ...parameters.events, occurrences: [] } };
                  }),
                ),
            }),
          );
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(failure).toBeInstanceOf(FittingError);
    expect(failure).toMatchObject({
      reason: "backend-failure",
      message: "Fitting backend returned misaligned feature metadata",
    });
  });

  it("uses embedded future partitions even when their identity and dates differ from the bundled snapshot", async () => {
    const model = await runFit({ countryHolidays: { country: "US" } });
    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const state = encoded.countryHolidays;

    if (state === undefined) throw new Error("Expected encoded country state");
    const nameIndex = state.snapshot.data.names.findIndex((name) => name === "New Year's Day");

    const years = state.snapshot.data.years.map((partition, index) => {
      if (index !== 2025 - state.snapshot.data.firstYear) return partition;

      return partition
        .map(([day, name]) => [name === nameIndex ? day + 1 : day, name])
        .sort(
          (left, right) => (left[0] ?? 0) - (right[0] ?? 0) || (left[1] ?? 0) - (right[1] ?? 0),
        );
    });

    const caller = {
      ...encoded,
      countryHolidays: {
        ...state,
        snapshot: {
          ...state.snapshot,
          snapshotId: `sha256:${"a".repeat(64)}`,
          data: { ...state.snapshot.data, years },
        },
      },
    };

    const { spans, tracer } = collectTestSpans();

    const restored = await Effect.runPromise(
      decodeFittedModel(caller).pipe(Effect.withTracer(tracer)),
    );

    const forecasts = await Effect.runPromise(
      predict(restored, [at(2025, 1), at(2025, 2)]).pipe(Effect.withTracer(tracer)),
    );

    const first = forecasts[0]?.events.find((event) => event.name === "New Year's Day");
    const second = forecasts[1]?.events.find((event) => event.name === "New Year's Day");

    expect(first?.mode === "additive" ? first.value : undefined).toBe(0);
    expect(second?.mode === "additive" ? second.value : undefined).not.toBe(0);
    expect(restored.countryHolidays?.snapshot.snapshotId).toBe(`sha256:${"a".repeat(64)}`);
    expect(Object.isFrozen(caller.countryHolidays.snapshot.data.years)).toBe(false);
    expect(spans.some((span) => span.name === "effect-prophet.calendar.load-snapshot")).toBe(false);
  });

  it("reuses already-validated embedded state by identity but still checks its training events", async () => {
    const model = await runFit({ countryHolidays: { country: "US" } });
    const state = model.countryHolidays;

    if (state === undefined) throw new Error("Expected embedded calendar state");

    const copy = await Effect.runPromise(parseFittedModel({ ...model }));
    expect(copy.countryHolidays).toBe(state);

    // A structurally equal fresh state is not recorded, so it is validated and decoded anew.
    const fresh = await Effect.runPromise(
      parseFittedModel({ ...model, countryHolidays: structuredClone(state) }),
    );

    expect(fresh.countryHolidays).not.toBe(state);
    expect(fresh.countryHolidays).toEqual(state);

    const decoded = await Effect.runPromise(
      decodeFittedModel(
        JSON.parse(JSON.stringify(await Effect.runPromise(encodeFittedModel(model)))),
      ),
    );

    expect(decoded.countryHolidays).toEqual(state);

    // Recorded states still have to match the model's training calendar.
    const mismatched = await Effect.runPromise(
      Effect.flip(
        parseFittedModel({
          ...model,
          events: { ...model.events, occurrences: model.events.occurrences.slice(1) },
        }),
      ),
    );

    expect(mismatched).toBeInstanceOf(InvalidFittedModel);
    expect(mismatched.issues).toEqual([
      {
        path: ["countryHolidays"],
        message: "Embedded calendar provenance must match the complete training event state",
      },
    ]);
  });

  it("rejects missing, versioned and inconsistent embedded state without lookup", async () => {
    const model = await runFit({ countryHolidays: { country: "US" } });
    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const { spans, tracer } = collectTestSpans();

    for (const change of [
      { snapshot: undefined },
      { schemaVersion: 2 },
      { trainingYears: [] },
      { trainingYears: [2025] },
      { trainingYears: [2024, 2024] },
      { trainingIssues: [{ country: "US" }] },
      { selection: { country: "GB", priorScale: 10, coverage: "reject-known-gaps" } },
      { customEvents: { ...model.events, mode: "multiplicative" } },
    ]) {
      const failure = await Effect.runPromise(
        Effect.flip(
          decodeFittedModel({
            ...encoded,
            countryHolidays: { ...encoded.countryHolidays, ...change },
          }).pipe(Effect.withTracer(tracer)),
        ),
      );

      expect(failure).toBeInstanceOf(ModelSerializationError);
      expect(failure).toMatchObject({ operation: "decode" });
    }

    expect(spans.some((span) => span.name === "effect-prophet.calendar.load-snapshot")).toBe(false);

    const invalid = await Effect.runPromise(
      Effect.flip(
        parseFittedModel({
          ...model,
          countryHolidays: { ...model.countryHolidays, trainingYears: [2025] },
        }),
      ),
    );

    expect(invalid).toBeInstanceOf(InvalidFittedModel);
  });
});
