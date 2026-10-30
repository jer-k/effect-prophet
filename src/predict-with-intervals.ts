import { Effect } from "effect";

import type { CountryHolidayError } from "./country-holidays";
import { PredictionError, type InputValidationError } from "./errors";
import type { FittedProphet } from "./fitted-model";
import { decodePredictionRows } from "./prediction-row";
import { predict, predictUncertainty, type Forecast } from "./prophet";
import {
  alignIntervalRows,
  parseIntervalOptions,
  simulationIdentity,
  type EncodedIntervalOptions,
  type UncertaintyInterval,
} from "./uncertainty";

/** One point forecast with the simulated ranges around its value and trend. */
export interface ForecastWithIntervals extends Forecast {
  /** Predictive range for `value`, including trend changes and observation noise. */
  readonly valueInterval: UncertaintyInterval;

  /** Range for `trend` from simulated future trend changes alone. */
  readonly trendInterval: UncertaintyInterval;
}

/** Point forecasts with ranges, in the same order as the supplied prediction rows. */
export interface ForecastsWithIntervals {
  readonly simulation: typeof simulationIdentity;
  readonly sampleCount: number;
  readonly intervalWidth: number;
  readonly rows: ReadonlyArray<ForecastWithIntervals>;
}

/**
 * Forecast each row and attach its seeded simulated ranges.
 *
 * The point forecast is exactly what `predict` returns, and the ranges are exactly what
 * `predictUncertainty` returns for the same rows and controls. Rows are paired by
 * position, so duplicate timestamps keep their own auxiliary inputs.
 *
 * @param model - A fitted model.
 * @param rowsInput - Untrusted timestamp strings or row-shaped future covariates.
 * @param optionsInput - Simulation controls with an explicit seed; sample output is rejected.
 * @returns Ordered forecasts with ranges or a typed validation or prediction failure.
 */
export const predictWithIntervals = Effect.fn("Prophet.predictWithIntervals")(function* (
  model: FittedProphet,
  rowsInput: Parameters<typeof decodePredictionRows>[0],
  optionsInput: EncodedIntervalOptions,
): Effect.fn.Return<
  ForecastsWithIntervals,
  InputValidationError | PredictionError | CountryHolidayError
> {
  // Keep the constituents' precedence: malformed rows fail before malformed options.
  const rows = yield* decodePredictionRows(rowsInput);

  const options = yield* parseIntervalOptions(
    optionsInput,
    "predictWithIntervals requires interval output",
  );

  // Simulate first so a simulation-limit failure costs no point prediction.
  const intervals = yield* predictUncertainty(model, rowsInput, options);
  const forecasts = yield* predict(model, rowsInput);
  const alignment = alignIntervalRows(intervals, options, forecasts);

  if (alignment.kind !== "aligned" || forecasts.length !== rows.length) {
    return yield* new PredictionError({
      reason: "backend-failure",
      timestamp:
        alignment.kind === "row-mismatch" ? alignment.timestamp : (rows[0]?.timestamp ?? 0),
      message: "Point forecasts and intervals are misaligned",
    });
  }

  return Object.freeze({
    simulation: simulationIdentity,
    sampleCount: options.samples,
    intervalWidth: options.intervalWidth,
    rows: Object.freeze(
      alignment.rows.map(({ row, interval }) =>
        Object.freeze({
          ...row,
          valueInterval: Object.freeze({ ...interval.value }),
          trendInterval: Object.freeze({ ...interval.trend }),
        }),
      ),
    ),
  });
});
