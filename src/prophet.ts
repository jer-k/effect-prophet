import { Effect, Schema } from "effect";

import {
  FittingError,
  InputValidationError,
  PredictionError,
  inputValidationErrorFromIssue,
  type UnsupportedConfigurationError,
} from "./errors";
import { parseFittedModel, type FittedProphet } from "./fitted-model";
import { FittingBackend, type FitOptions, type TrainingInput } from "./internal/fitting-backend";
import { TimestampSchema } from "./internal/timestamp";
import { predictLinearTrendWithWasm } from "./internal/wasm-linear-trend-backend";
import { decodeObservations, type Observations } from "./observation";
import { decodeOptions } from "./options";

/** Canonical UTC timestamps accepted by the public prediction boundary. */
export type EncodedPredictionTimestamps = ReadonlyArray<string>;

/** Validated prediction timestamps represented as integer epoch milliseconds. */
export type PredictionTimestamps = ReadonlyArray<number>;

/** One point forecast and its currently available trend component. */
export interface Forecast {
  /** Prediction timestamp represented as integer epoch milliseconds. */
  readonly timestamp: number;

  /** Predicted observation value. */
  readonly value: number;

  /** Trend contribution to `value`. */
  readonly trend: number;
}

/** Forecasts in the same order as the supplied prediction timestamps. */
export type Forecasts = ReadonlyArray<Forecast>;

const PredictionTimestampsSchema: Schema.Codec<PredictionTimestamps, EncodedPredictionTimestamps> =
  Schema.Array(TimestampSchema);

const decodePredictionTimestampsSchema = Schema.decodeUnknownEffect(PredictionTimestampsSchema, {
  errors: "all",
});

const decodePredictionTimestamps = Effect.fn("decodePredictionTimestamps")(function* (
  input: Parameters<typeof decodePredictionTimestampsSchema>[0],
): Effect.fn.Return<PredictionTimestamps, InputValidationError> {
  return yield* decodePredictionTimestampsSchema(input).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("prediction-timestamps", error.issue)),
  );
});

const packTrainingInput = (observations: Observations): TrainingInput => {
  const timestamps = new Float64Array(observations.length);
  const values = new Float64Array(observations.length);

  for (const [index, observation] of observations.entries()) {
    timestamps[index] = observation.timestamp;
    values[index] = observation.value;
  }

  return { timestamps, values };
};

const makeFitOptions = (growth: FitOptions["growth"]): FitOptions => ({ growth });

/**
 * Validate observations and options, then fit through the provided backend Layer.
 *
 * @param observationsInput - Untrusted encoded observations.
 * @param optionsInput - Optional untrusted fitting options.
 * @returns A fitted model, validation failure, unsupported configuration, or fitting failure.
 */
export const fit = Effect.fn("Prophet.fit")(function* (
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput?: Parameters<typeof decodeOptions>[0],
): Effect.fn.Return<
  FittedProphet,
  InputValidationError | UnsupportedConfigurationError | FittingError,
  FittingBackend
> {
  const observations = yield* decodeObservations(observationsInput);
  const options = yield* decodeOptions(optionsInput);

  const input = packTrainingInput(observations);
  const backend = yield* FittingBackend;
  const parameters = yield* backend.fit(input, makeFitOptions(options.growth));

  return yield* parseFittedModel(parameters).pipe(
    Effect.mapError(
      () =>
        new FittingError({
          reason: "backend-failure",
          observationCount: observations.length,
          message: "Fitting backend returned invalid fitted-model parameters",
        }),
    ),
  );
});

/**
 * Predict point forecasts and trend components at validated timestamps.
 *
 * Linear models reuse their fitting-time origin and scale without recomputing
 * either value from prediction timestamps.
 *
 * @param model - A fitted trend model.
 * @param timestampsInput - Untrusted canonical UTC timestamps.
 * @returns Ordered point forecasts or a typed validation or prediction failure.
 */
export const predict = Effect.fn("Prophet.predict")(function* (
  model: FittedProphet,
  timestampsInput: Parameters<typeof decodePredictionTimestampsSchema>[0],
): Effect.fn.Return<Forecasts, InputValidationError | PredictionError> {
  const timestamps = yield* decodePredictionTimestamps(timestampsInput);
  const firstTimestamp = timestamps[0];

  if (firstTimestamp === undefined) {
    return [];
  }

  const parsedModel = yield* parseFittedModel(model).pipe(
    Effect.mapError(
      () =>
        new PredictionError({
          reason: "invalid-model",
          timestamp: firstTimestamp,
          message: "Fitted model is invalid",
        }),
    ),
  );

  if (parsedModel.model === "constant-mean-baseline") {
    return timestamps.map((timestamp): Forecast => ({
      timestamp,
      value: parsedModel.level,
      trend: parsedModel.level,
    }));
  }

  const predictions = yield* predictLinearTrendWithWasm(parsedModel, timestamps);
  const forecasts: Array<Forecast> = [];

  for (const [index, timestamp] of timestamps.entries()) {
    const prediction = predictions[index];

    if (prediction === undefined) {
      return yield* Effect.fail(
        new PredictionError({
          reason: "backend-failure",
          timestamp,
          message: "WASM prediction backend omitted an expected forecast",
        }),
      );
    }

    forecasts.push({
      timestamp,
      value: prediction,
      trend: prediction,
    });
  }

  return forecasts;
});
