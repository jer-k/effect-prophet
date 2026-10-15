import { Effect } from "effect";
import { inspectCountryHolidays, type EventCalendar, type FittedProphet } from "effect-prophet";

import { BenchmarkArtifactError } from "./artifacts.ts";
import type { BenchmarkCase, BenchmarkDataset } from "./case.ts";
import type { CorrectnessProjection, ForecastProjection } from "./result.ts";

// Independently project the shared protocol rows, rather than reusing the library's parsed-epoch
// training-year resolver: this check must be able to catch incorrect year selection in that owner.
const yearsFor = (timestamps: ReadonlyArray<string>) =>
  [...new Set(timestamps.map((timestamp) => new Date(timestamp).getUTCFullYear()))].sort(
    (left, right) => left - right,
  );

// This is an untimed semantic oracle, not another measured feature kernel. Grouped forecasts are
// checked against these indicators and the public fitted coefficients before admitting timings.
const activations = (
  timestamps: ReadonlyArray<string>,
  calendar: EventCalendar,
): ReadonlyArray<0 | 1> => {
  const activeDays = calendar.columns.map(
    (column) =>
      new Set(
        calendar.occurrences
          .filter(
            (occurrence) =>
              occurrence.name === column.eventName &&
              column.offsetDays >= occurrence.lowerWindowDays &&
              column.offsetDays <= occurrence.upperWindowDays,
          )
          .map((occurrence) => occurrence.epochDay + column.offsetDays),
      ),
  );

  return timestamps.flatMap((timestamp) => {
    const day = Math.floor(Date.parse(timestamp) / 86_400_000);

    return activeDays.map((days) => (days.has(day) ? (1 as const) : (0 as const)));
  });
};

/** Untimed country/calendar correctness evidence, using public inspection and fitted state. */
export const projectCountryHolidays = Effect.fn("benchmark.calendar.project")(function* (
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
  model: FittedProphet,
  forecasts: ReadonlyArray<ForecastProjection>,
) {
  const state = model.countryHolidays;

  const selection =
    benchmarkCase.workload.kind === "fixed-linear-prediction"
      ? undefined
      : benchmarkCase.workload.configuration.countryHolidays;

  if (selection === undefined) {
    if (state !== undefined)
      return yield* Effect.fail(
        new BenchmarkArtifactError({ message: "Unrequested country state" }),
      );

    return undefined;
  }

  if (
    state === undefined ||
    state.snapshot.snapshotId !== benchmarkCase.calendarSnapshot?.snapshotId
  ) {
    return yield* Effect.fail(
      new BenchmarkArtifactError({
        message: "Country benchmark omitted or replaced the pinned snapshot",
      }),
    );
  }

  const trainingTimestamps = dataset.observations.map((row) => row.timestamp);
  const predictionTimestamps = dataset.predictionRows.map((row) => row.timestamp);
  const trainingYears = yearsFor(trainingTimestamps);
  const predictionYears = yearsFor(predictionTimestamps);
  const training = yield* inspectCountryHolidays(selection, trainingYears);
  const future = yield* inspectCountryHolidays(selection, predictionYears);

  if (
    training.country !== state.selection.country ||
    JSON.stringify(trainingYears) !== JSON.stringify(state.trainingYears) ||
    selection.priorScale !== state.selection.priorScale ||
    selection.coverage !== state.selection.coverage
  ) {
    return yield* Effect.fail(
      new BenchmarkArtifactError({
        message: "Country selection or represented training years changed",
      }),
    );
  }

  const fittedNames = new Set(model.events.columns.map((column) => column.eventName));

  const predictionEvents: EventCalendar = {
    ...model.events,
    occurrences: [
      ...state.customEvents.occurrences,
      ...future.occurrences.filter((occurrence) => fittedNames.has(occurrence.name)),
    ],
  };

  const predictionActivations = activations(predictionTimestamps, predictionEvents);

  for (const [row, forecast] of forecasts.entries()) {
    if (
      JSON.stringify(forecast.events.map((component) => component.name)) !==
      JSON.stringify(model.events.layout.components.map((component) => component.name))
    ) {
      return yield* Effect.fail(
        new BenchmarkArtifactError({
          message: "Prediction changed the frozen country event layout",
        }),
      );
    }

    for (const [index, component] of model.events.layout.components.entries()) {
      let expected = 0;

      for (
        let column = component.coefficientOffset;
        column < component.coefficientOffset + component.coefficientCount;
        column += 1
      ) {
        expected +=
          (predictionActivations[row * model.events.columns.length + column] ?? 0) *
          (model.eventCoefficients[column] ?? Number.NaN);
      }

      const actual = forecast.events[index];
      const value = actual?.mode === "multiplicative" ? actual.factor : actual?.value;

      if (value === undefined || !Number.isFinite(expected) || Math.abs(value - expected) > 1e-8) {
        return yield* Effect.fail(
          new BenchmarkArtifactError({
            message: "Country event effects do not match dynamic year activations",
          }),
        );
      }
    }
  }

  const ignoredNames = new Set(
    future.occurrences
      .filter((occurrence) => !fittedNames.has(occurrence.name))
      .map((occurrence) => occurrence.name),
  );

  const projection: NonNullable<CorrectnessProjection["countryHolidays"]> = {
    country: training.country,
    coverage: state.selection.coverage,
    priorScale: state.selection.priorScale,
    provider: { ...state.snapshot.provider },
    trainingYears,
    columns: model.events.columns.map((column) => ({
      name: column.eventName,
      offsetDays: column.offsetDays,
      priorScale: column.priorScale,
    })),
    trainingActivations: activations(trainingTimestamps, model.events),
    predictionActivations,
    ignoredPredictionNames: state.snapshot.data.names.filter((name) => ignoredNames.has(name)),
  };

  return projection;
});
