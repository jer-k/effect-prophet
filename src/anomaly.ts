import { Effect } from "effect";

import type { CountryHolidayError } from "./country-holidays";
import { PredictionError, type FittingError, type InputValidationError } from "./errors";
import type { FittedProphet } from "./fitted-model";
import type { FittingBackend } from "./internal/fitting-backend";
import { decodeObservations } from "./observation";
import type { EncodedProphetOptions } from "./options";
import { predictWithIntervals } from "./predict-with-intervals";
import { pairForecastsWithObservations, predictionRowFromObservation } from "./prediction-row";
import { fit } from "./prophet";
import {
  exceedsSimulationBudget,
  parseIntervalOptions,
  simulationIdentity,
  type EncodedIntervalOptions,
  type UncertaintyInterval,
} from "./uncertainty";

/** Interval width anomaly detection uses when a request omits one. */
export const defaultAnomalyIntervalWidth = 0.99;

/** Where an observed value falls relative to its predictive range. */
export type AnomalyPosition = "below" | "within" | "above";

/** One observation compared with the range a fitted model predicts for it. */
export interface AnomalyAssessment {
  /** Observation timestamp represented as integer epoch milliseconds. */
  readonly timestamp: number;

  /** Observed value. */
  readonly actual: number;

  /** Point forecast, exactly as `predict` returns it. */
  readonly predicted: number;

  /** Lower bound of the predictive value range. */
  readonly lower: number;

  /** Upper bound of the predictive value range. */
  readonly upper: number;

  /** `below` or `above` when `actual` lies strictly outside the range. */
  readonly position: AnomalyPosition;
}

/** Every assessed observation in chronological order, and the ones outside their range. */
export interface AnomalyReport {
  readonly simulation: typeof simulationIdentity;
  readonly sampleCount: number;
  readonly intervalWidth: number;
  readonly rows: ReadonlyArray<AnomalyAssessment>;
  readonly anomalies: ReadonlyArray<AnomalyAssessment>;
}

/** Classify a value by strict exceedance; a value on a bound is within the range. */
export const anomalyPosition = (actual: number, interval: UncertaintyInterval): AnomalyPosition => {
  if (actual < interval.lower) {
    return "below";
  }

  if (actual > interval.upper) {
    return "above";
  }

  return "within";
};

/**
 * Compare observations with the seeded predictive ranges of an already fitted model.
 *
 * Nothing is refitted, so the observations do not change the baseline they are judged
 * against. Whether the model has already seen them is the caller's responsibility.
 * Rows are returned chronologically, with equal timestamps in input order.
 *
 * @param model - A fitted model.
 * @param observationsInput - Untrusted observations, with any capacities, floors,
 *   regressors and conditions the model needs to predict them.
 * @param optionsInput - Simulation controls with an explicit seed; `intervalWidth`
 *   defaults to 0.99 and sample output is rejected.
 * @returns Every assessment and the anomalies among them, or a typed failure.
 */
export const detectAnomalies = Effect.fn("Prophet.detectAnomalies")(function* (
  model: FittedProphet,
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput: EncodedIntervalOptions,
): Effect.fn.Return<AnomalyReport, InputValidationError | PredictionError | CountryHolidayError> {
  const observations = yield* decodeObservations(observationsInput);

  const options = yield* parseIntervalOptions(
    optionsInput,
    "detectAnomalies requires interval output",
    defaultAnomalyIntervalWidth,
  );

  const forecast = yield* predictWithIntervals(
    model,
    observations.map(predictionRowFromObservation),
    { seed: options.seed, samples: options.samples, intervalWidth: options.intervalWidth },
  );

  const pairs = yield* pairForecastsWithObservations(
    observations,
    forecast.rows,
    "Anomaly assessment is misaligned with its observations",
  );

  const rows = pairs.map(([observation, row]) =>
    Object.freeze({
      timestamp: observation.timestamp,
      actual: observation.value,
      predicted: row.value,
      lower: row.valueInterval.lower,
      upper: row.valueInterval.upper,
      position: anomalyPosition(observation.value, row.valueInterval),
    }),
  );

  const anomalies = rows.filter((row) => row.position !== "within");

  yield* Effect.annotateCurrentSpan({
    "effect_prophet.observation.count": rows.length,
    "effect_prophet.anomaly.count": anomalies.length,
  });

  return Object.freeze({
    simulation: forecast.simulation,
    sampleCount: forecast.sampleCount,
    intervalWidth: forecast.intervalWidth,
    rows: Object.freeze(rows),
    anomalies: Object.freeze(anomalies),
  });
});

/**
 * Fit a model to a history and return the timestamps whose values fall outside the
 * seeded predictive range the model gives for that same history.
 *
 * This is retrospective, in-sample detection: the flagged observations also shaped the
 * model, so a large outlier can bend the fit or widen the ranges enough to hide itself.
 * Use `detectAnomalies` to judge later observations against an earlier model.
 *
 * Timestamps are returned chronologically, once per flagged observation, so equal
 * timestamps appear as often as their rows are flagged.
 *
 * @param historyInput - Untrusted observations, used both to fit and to check.
 * @param optionsInput - Simulation controls with an explicit seed; `intervalWidth`
 *   defaults to 0.99 and sample output is rejected.
 * @param modelOptionsInput - Optional model options, exactly as `fit` accepts them.
 * @returns Flagged timestamps as epoch milliseconds, or a typed failure.
 */
export const anomalies = Effect.fn("Prophet.anomalies")(function* (
  historyInput: Parameters<typeof decodeObservations>[0],
  optionsInput: EncodedIntervalOptions,
  modelOptionsInput?: EncodedProphetOptions,
): Effect.fn.Return<
  ReadonlyArray<number>,
  InputValidationError | FittingError | PredictionError | CountryHolidayError,
  FittingBackend
> {
  const observations = yield* decodeObservations(historyInput);

  const options = yield* parseIntervalOptions(
    optionsInput,
    "anomalies requires interval output",
    defaultAnomalyIntervalWidth,
  );

  // Every history row is simulated, so reject a history too long for that before fitting it.
  if (exceedsSimulationBudget(observations.length, options.samples, "intervals")) {
    return yield* Effect.fail(
      new PredictionError({
        reason: "simulation-limit",
        timestamp: observations[0].timestamp,
        message: "Anomaly detection exceeds the simulation row budget",
      }),
    );
  }

  const model = yield* fit(historyInput, modelOptionsInput);

  const report = yield* detectAnomalies(model, historyInput, {
    seed: options.seed,
    samples: options.samples,
    intervalWidth: options.intervalWidth,
  });

  yield* Effect.annotateCurrentSpan({
    "effect_prophet.observation.count": report.rows.length,
    "effect_prophet.anomaly.count": report.anomalies.length,
  });

  return Object.freeze(report.anomalies.map((row) => row.timestamp));
});
