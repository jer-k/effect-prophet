import { Effect } from "effect";

import type { CountryHolidayError } from "./country-holidays";
import { PredictionError, type InputValidationError } from "./errors";
import type { FittedProphet } from "./fitted-model";
import { residualOf } from "./internal/residual";
import { decodeObservations } from "./observation";
import { pairForecastsWithObservations, predictionRowFromObservation } from "./prediction-row";
import { predict } from "./prophet";

/** One observation beside the point forecast a fitted model gives for its own row. */
export interface ResidualRow {
  /** Observation timestamp represented as integer epoch milliseconds. */
  readonly timestamp: number;

  /** Observed value. */
  readonly actual: number;

  /** Point forecast, exactly as `predict` returns it. */
  readonly predicted: number;

  /** `actual - predicted`: positive when the model predicted too low. */
  readonly residual: number;
}

/**
 * Predict each observation's own row with an already fitted model and return its residual,
 * defined as observed minus predicted.
 *
 * Nothing is refitted. Residuals for the training history are in-sample diagnostics: the model
 * has already seen those values, so they understate forecast error. Pass observations the model
 * did not see, or use `crossValidate` or `evaluateHoldout`, to measure forecast accuracy.
 *
 * Rows are returned chronologically, with equal timestamps in input order. Each row is predicted
 * from its own capacity, floor, regressors and conditions, so tied timestamps are never joined.
 *
 * @param model - A fitted model.
 * @param observationsInput - Untrusted observations, with any capacities, floors, regressors and
 *   conditions the model needs to predict them.
 * @returns One frozen residual row per observation, or a typed failure. A residual that
 *   overflows fails with `PredictionError` reason `non-finite-forecast`.
 */
export const residuals = Effect.fn("Prophet.residuals")(function* (
  model: FittedProphet,
  observationsInput: Parameters<typeof decodeObservations>[0],
): Effect.fn.Return<
  ReadonlyArray<ResidualRow>,
  InputValidationError | PredictionError | CountryHolidayError
> {
  const observations = yield* decodeObservations(observationsInput);
  const forecasts = yield* predict(model, observations.map(predictionRowFromObservation));

  const pairs = yield* pairForecastsWithObservations(
    observations,
    forecasts,
    "Residuals are misaligned with their observations",
  );

  const rows: Array<ResidualRow> = [];

  for (const [observation, forecast] of pairs) {
    const residual = residualOf(observation.value, forecast.value);

    if (residual === undefined) {
      return yield* Effect.fail(
        new PredictionError({
          reason: "non-finite-forecast",
          timestamp: observation.timestamp,
          message: "Residual is not finite",
        }),
      );
    }

    rows.push(
      Object.freeze({
        timestamp: observation.timestamp,
        actual: observation.value,
        predicted: forecast.value,
        residual,
      }),
    );
  }

  yield* Effect.annotateCurrentSpan({ "effect_prophet.observation.count": rows.length });

  return Object.freeze(rows);
});
