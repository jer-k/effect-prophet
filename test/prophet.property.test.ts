import { Cause, Effect, Exit } from "effect";
import fc from "fast-check";
import { describe, expect, it } from "vitest";

import {
  CountryHolidayError,
  FittingError,
  InputValidationError,
  PredictionError,
  fit,
  predict,
  prophetFittingBackendLayer,
  type EncodedProphetOptions,
} from "../src/index";
import {
  canonicalTimestamp,
  edgeNumber,
  hostileObservation,
  insertAt,
  isTypedExit,
  malformedTimestamp,
  propertyParameters,
  timestampAtDay,
  timestampPoolDays,
  validObservations,
} from "./helpers/property";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const fitErrors = [InputValidationError, FittingError, CountryHolidayError];

const predictErrors = [InputValidationError, PredictionError, CountryHolidayError];

const fitOptions = fc.constantFrom<EncodedProphetOptions | undefined>(
  undefined,
  { growth: "flat" },
  { scaling: "minmax" },
  { builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" } },
);

const runFit = (observations: Parameters<typeof fit>[0], options?: EncodedProphetOptions) =>
  Effect.runPromiseExit(
    fit(observations, options).pipe(Effect.provide(prophetFittingBackendLayer)),
  );

/** Timestamps after the generated pool, so every forecast is a true extrapolation. */
const futureTimestamps = (count: number) =>
  Array.from({ length: count }, (_, index) => timestampAtDay(timestampPoolDays + index));

/** Moderate targets with at least two distinct timestamps, so fitting can reach the backend. */
const fittableObservations = validObservations(
  fc.double({ min: -1e6, max: 1e6, noNaN: true }),
).filter((rows) => new Set(rows.map((row) => row.timestamp)).size >= 2);

/** Project an exit onto its value or typed errors; causes also carry per-run stacks and spans. */
const exitOutcome = <A, E>(exit: Exit.Exit<A, E>) =>
  Exit.isSuccess(exit)
    ? { value: exit.value }
    : {
        errors: exit.cause.reasons.map((reason) =>
          Cause.isFailReason(reason) ? reason.error : reason,
        ),
      };

const wasmSpanNames = (names: ReadonlyArray<string>) =>
  names.filter((name) => name.startsWith("effect-prophet.wasm."));

describe("Prophet fit and predict properties", () => {
  it("fails with typed errors, never defects, for hostile histories and options", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.oneof(
          fc.array(hostileObservation, { maxLength: 8 }),
          validObservations(edgeNumber),
          validObservations(),
        ),
        fitOptions,
        async (observations, options) => {
          const fitted = await runFit(observations, options);

          expect(isTypedExit(fitted, fitErrors)).toBe(true);

          if (Exit.isSuccess(fitted)) {
            const predicted = await Effect.runPromiseExit(
              predict(fitted.value, futureTimestamps(3)),
            );

            expect(isTypedExit(predicted, predictErrors)).toBe(true);
          }
        },
      ),
      propertyParameters(150),
    );
  });

  it("does not enter the WASM boundary for histories that fail validation", async () => {
    const corruptRow = fc.oneof(
      fc.record({
        timestamp: canonicalTimestamp,
        value: fc.constantFrom(Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY),
      }),
      fc.record({ timestamp: malformedTimestamp, value: fc.double() }),
    );

    await fc.assert(
      fc.asyncProperty(
        validObservations(),
        corruptRow,
        fc.nat(),
        fitOptions,
        async (valid, corrupt, position, options) => {
          const { spans, tracer } = collectTestSpans();

          const exit = await Effect.runPromiseExit(
            fit(insertAt(valid, corrupt, position), options).pipe(
              Effect.provide(prophetFittingBackendLayer),
              Effect.withTracer(tracer),
            ),
          );

          expect(Exit.isFailure(exit)).toBe(true);
          expect(isTypedExit(exit, [InputValidationError])).toBe(true);
          expect(wasmSpanNames(spans.map((span) => span.name))).toEqual([]);

          const publicSpans = spans.filter((span) => span.name === "Prophet.fit");

          expect(publicSpans).toHaveLength(1);

          for (const span of publicSpans) {
            expect(Exit.isFailure(requireEndedSpan(span).exit)).toBe(true);
          }
        },
      ),
      propertyParameters(100),
    );
  });

  it("short-circuits single-timestamp histories without a WASM boundary span", async () => {
    await fc.assert(
      fc.asyncProperty(
        canonicalTimestamp,
        fc.double({ noNaN: true, noDefaultInfinity: true }),
        async (timestamp, value) => {
          const { spans, tracer } = collectTestSpans();

          const exit = await Effect.runPromiseExit(
            fit([{ timestamp, value }]).pipe(
              Effect.provide(prophetFittingBackendLayer),
              Effect.withTracer(tracer),
            ),
          );

          expect(Exit.isFailure(exit)).toBe(true);
          expect(isTypedExit(exit, [FittingError])).toBe(true);
          expect(wasmSpanNames(spans.map((span) => span.name))).toEqual([]);
        },
      ),
      propertyParameters(25),
    );
  });

  it("does not enter the WASM boundary for prediction rows that fail validation", async () => {
    const model = await Effect.runPromise(
      fit([
        { timestamp: timestampAtDay(0), value: 1 },
        { timestamp: timestampAtDay(1), value: 2 },
        { timestamp: timestampAtDay(2), value: 4 },
      ]).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const nonFinite = fc.constantFrom(
      Number.NaN,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    );

    const hostileRow = fc.oneof(
      malformedTimestamp,
      fc.record({ timestamp: canonicalTimestamp, capacity: nonFinite }),
      fc.record({ timestamp: malformedTimestamp }),
      fc.record({ timestamp: canonicalTimestamp, extra: fc.anything() }),
      fc.oneof(fc.integer(), fc.constant(null), fc.array(fc.anything(), { maxLength: 3 })),
    );

    await fc.assert(
      fc.asyncProperty(
        fc.array(canonicalTimestamp, { maxLength: 4 }),
        hostileRow,
        fc.nat(),
        async (valid, hostile, position) => {
          const { spans, tracer } = collectTestSpans();

          const exit = await Effect.runPromiseExit(
            predict(model, insertAt(valid, hostile, position)).pipe(Effect.withTracer(tracer)),
          );

          expect(Exit.isFailure(exit)).toBe(true);
          expect(isTypedExit(exit, [InputValidationError])).toBe(true);
          expect(wasmSpanNames(spans.map((span) => span.name))).toEqual([]);
        },
      ),
      propertyParameters(100),
    );
  });

  it("fits and predicts deterministically for identical input", async () => {
    await fc.assert(
      fc.asyncProperty(fittableObservations, fitOptions, async (observations, options) => {
        const first = await runFit(observations, options);
        const second = await runFit(observations, options);

        expect(exitOutcome(second)).toStrictEqual(exitOutcome(first));

        if (Exit.isSuccess(first) && Exit.isSuccess(second)) {
          const timestamps = futureTimestamps(4);
          const firstForecasts = await Effect.runPromiseExit(predict(first.value, timestamps));
          const secondForecasts = await Effect.runPromiseExit(predict(second.value, timestamps));

          expect(exitOutcome(secondForecasts)).toStrictEqual(exitOutcome(firstForecasts));
        }
      }),
      propertyParameters(40),
    );
  });

  it("predicts finite forecasts from models fitted to finite input", async () => {
    await fc.assert(
      fc.asyncProperty(
        fittableObservations,
        fitOptions,
        fc.integer({ min: 1, max: 8 }),
        async (observations, options, horizon) => {
          const fitted = await runFit(observations, options);

          if (!Exit.isSuccess(fitted)) {
            expect(isTypedExit(fitted, [FittingError])).toBe(true);

            return;
          }

          const forecasts = await Effect.runPromise(
            predict(fitted.value, futureTimestamps(horizon)),
          );

          expect(forecasts).toHaveLength(horizon);

          for (const forecast of forecasts) {
            expect(Number.isFinite(forecast.value)).toBe(true);
            expect(Number.isFinite(forecast.trend)).toBe(true);
            expect(Number.isFinite(forecast.additive)).toBe(true);
            expect(Number.isFinite(forecast.multiplicative)).toBe(true);
          }
        },
      ),
      propertyParameters(60),
    );
  });

  it("roughly recovers the parameters of a synthetic linear series", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.double({ min: -100, max: 100, noNaN: true }),
        fc.double({ min: -5, max: 5, noNaN: true }),
        fc.integer({ min: 20, max: 60 }),
        fc.array(fc.double({ min: -1, max: 1, noNaN: true }), { minLength: 60, maxLength: 60 }),
        async (intercept, slope, days, noise) => {
          const line = (day: number) => intercept + slope * day;

          // Noise and tolerance both scale with the series range so flat lines stay meaningful.
          const range = Math.abs(slope) * days + 1;

          const observations = Array.from({ length: days }, (_, day) => ({
            timestamp: timestampAtDay(day),
            value: line(day) + (noise[day] ?? 0) * 0.001 * range,
          }));

          const model = await Effect.runPromise(
            fit(observations, {
              builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
            }).pipe(Effect.provide(prophetFittingBackendLayer)),
          );

          const horizon = [days, days + 2, days + 5];
          const forecasts = await Effect.runPromise(predict(model, horizon.map(timestampAtDay)));

          for (const [index, forecast] of forecasts.entries()) {
            expect(Math.abs(forecast.trend - line(horizon[index] ?? 0))).toBeLessThan(0.02 * range);
          }
        },
      ),
      propertyParameters(30),
    );
  });
});
