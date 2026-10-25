import { Effect } from "effect";

import type { CountryHolidayError } from "./country-holidays";
import type { FittingError, InputValidationError, PredictionError } from "./errors";
import type { FittingBackend } from "./internal/fitting-backend";
import { decodeObservations } from "./observation";
import type { EncodedProphetOptions } from "./options";
import { decodePredictionRows } from "./prediction-row";
import { fit, predict, type Forecasts } from "./prophet";

/**
 * Fit a model to a history and forecast the supplied rows in one call.
 *
 * The result is exactly what `fit` followed by `predict` returns, in the order of the
 * supplied rows. The fitted model is not returned, so call `fit` and `predict` directly
 * to reuse it. Nothing is inferred: future timestamps, capacities, floors, regressors
 * and conditions all come from the rows, as `predict` requires them.
 *
 * The history and rows are checked before anything is fitted, so malformed rows cost
 * no fit; model options are checked by `fit`.
 *
 * @param historyInput - Untrusted observations to fit.
 * @param rowsInput - Untrusted timestamp strings or row-shaped future covariates.
 * @param optionsInput - Optional model options, exactly as `fit` accepts them.
 * @returns Ordered point forecasts, or a typed validation, fitting or prediction failure.
 */
export const forecast = Effect.fn("Prophet.forecast")(function* (
  historyInput: Parameters<typeof decodeObservations>[0],
  rowsInput: Parameters<typeof decodePredictionRows>[0],
  optionsInput?: EncodedProphetOptions,
): Effect.fn.Return<
  Forecasts,
  InputValidationError | FittingError | PredictionError | CountryHolidayError,
  FittingBackend
> {
  const observations = yield* decodeObservations(historyInput);
  const rows = yield* decodePredictionRows(rowsInput);

  const model = yield* fit(historyInput, optionsInput);
  const forecasts = yield* predict(model, rowsInput);

  yield* Effect.annotateCurrentSpan({
    "effect_prophet.observation.count": observations.length,
    "effect_prophet.prediction.count": rows.length,
  });

  return forecasts;
});
