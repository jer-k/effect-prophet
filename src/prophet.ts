import { Effect, Schema } from "effect";

import {
  FittingError,
  InputValidationError,
  PredictionError,
  inputValidationErrorFromIssue,
} from "./errors";
import { FittingBackend, type FitOptions, type TrainingInput } from "./internal/fitting-backend";
import { TimestampSchema } from "./internal/timestamp";
import { decodeObservations, type Observations } from "./observation";
import { decodeOptions } from "./options";

/** Canonical UTC timestamps accepted by the public prediction boundary. */
export type EncodedPredictionTimestamps = ReadonlyArray<string>;

/** Validated prediction timestamps represented as integer epoch milliseconds. */
export type PredictionTimestamps = ReadonlyArray<number>;

/** The temporary fitted constant-mean model. */
export interface FittedProphet {
  /** Identifies this model as scaffolding rather than Prophet-compatible behavior. */
  readonly model: "constant-mean-baseline";

  /** Constant value predicted at every timestamp. */
  readonly level: number;
}

/** One point forecast from the temporary constant-mean model. */
export interface Forecast {
  /** Prediction timestamp represented as integer epoch milliseconds. */
  readonly timestamp: number;

  /** Predicted observation value. */
  readonly value: number;
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
 * The current TypeScript backend is a temporary constant-mean baseline rather
 * than a Prophet-compatible fitting implementation.
 *
 * @param observationsInput - Untrusted encoded observations.
 * @param optionsInput - Optional untrusted fitting options.
 * @returns A fitted model, validation failure, or fitting failure.
 */
export const fit = Effect.fn("Prophet.fit")(function* (
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput?: Parameters<typeof decodeOptions>[0],
): Effect.fn.Return<FittedProphet, InputValidationError | FittingError, FittingBackend> {
  const observations = yield* decodeObservations(observationsInput);
  const options = yield* decodeOptions(optionsInput);

  const input = packTrainingInput(observations);
  const backend = yield* FittingBackend;
  const parameters = yield* backend.fit(input, makeFitOptions(options.growth));

  if (!Number.isFinite(parameters.level)) {
    return yield* Effect.fail(
      new FittingError({
        reason: "backend-failure",
        observationCount: observations.length,
        message: "Fitting backend returned a non-finite constant level",
      }),
    );
  }

  return {
    model: "constant-mean-baseline",
    level: parameters.level,
  };
});

/**
 * Predict the fitted constant level at validated timestamps.
 *
 * @param model - A fitted constant-mean baseline model.
 * @param timestampsInput - Untrusted canonical UTC timestamps.
 * @returns Ordered point forecasts or a typed validation or prediction failure.
 */
export const predict = Effect.fn("Prophet.predict")(function* (
  model: FittedProphet,
  timestampsInput: Parameters<typeof decodePredictionTimestampsSchema>[0],
): Effect.fn.Return<Forecasts, InputValidationError | PredictionError> {
  const timestamps = yield* decodePredictionTimestamps(timestampsInput);
  const firstTimestamp = timestamps[0];

  if (firstTimestamp !== undefined && !Number.isFinite(model.level)) {
    return yield* Effect.fail(
      new PredictionError({
        reason: "invalid-model",
        timestamp: firstTimestamp,
        message: "Fitted model contains a non-finite constant level",
      }),
    );
  }

  return timestamps.map((timestamp): Forecast => ({
    timestamp,
    value: model.level,
  }));
});
