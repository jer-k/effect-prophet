import { Effect, Predicate, Schema } from "effect";

import { InputValidationError, PredictionError, inputValidationErrorFromIssue } from "./errors";
import { encodeTimestamp, TimestampSchema } from "./internal/timestamp";
import type { Observation } from "./observation";

/** One row accepted by the public prediction boundary. */
export type EncodedPredictionRow =
  | string
  | {
      readonly timestamp: string;
      readonly capacity?: number;
      readonly floor?: number;
      readonly regressors?: Readonly<Record<string, number>>;
      readonly conditions?: Readonly<Record<string, boolean>>;
    };

/** Ordered encoded prediction rows. */
export type EncodedPredictionRows = ReadonlyArray<EncodedPredictionRow>;

/** Legacy timestamp-only prediction input. */
export type EncodedPredictionTimestamps = ReadonlyArray<string>;

/** One structurally parsed prediction row. */
export interface PredictionRow {
  readonly timestamp: number;
  readonly capacity?: number;
  readonly floor?: number;
  readonly regressors?: Readonly<Record<string, number>>;
  readonly conditions?: Readonly<Record<string, boolean>>;
}

/** Ordered structurally parsed prediction rows. */
export type PredictionRows = ReadonlyArray<PredictionRow>;

type PredictionBounds = {
  -readonly [Key in "capacity" | "floor"]?: PredictionRow[Key];
};

const PredictionObjectSchema = Schema.Struct({
  timestamp: TimestampSchema,
  capacity: Schema.optionalKey(Schema.Finite),
  floor: Schema.optionalKey(Schema.Finite),
  regressors: Schema.optionalKey(Schema.Record(Schema.String, Schema.Finite)),
  conditions: Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)),
});

const PredictionRowsSchema = Schema.Array(Schema.Union([TimestampSchema, PredictionObjectSchema]));

const decodePredictionRowsSchema = Schema.decodeUnknownEffect(PredictionRowsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** Structurally parse prediction rows while preserving legacy diagnostic labels. */
export const decodePredictionRows = Effect.fnUntraced(function* (
  input: Parameters<typeof decodePredictionRowsSchema>[0],
): Effect.fn.Return<PredictionRows, InputValidationError> {
  const diagnosticInput =
    Array.isArray(input) &&
    input.some((value) => Predicate.isObjectKeyword(value) && !Array.isArray(value))
      ? ("prediction-rows" as const)
      : ("prediction-timestamps" as const);

  const decoded = yield* decodePredictionRowsSchema(input).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue(diagnosticInput, error.issue)),
  );

  return Object.freeze(
    decoded.map((row): PredictionRow => {
      if (Predicate.isNumber(row)) {
        return Object.freeze({ timestamp: row });
      }

      const bounds: PredictionBounds = {};

      if (row.capacity !== undefined) {
        bounds.capacity = row.capacity;
      }

      if (row.floor !== undefined) {
        bounds.floor = row.floor;
      }

      if (row.regressors === undefined && row.conditions === undefined) {
        return Object.freeze({ timestamp: row.timestamp, ...bounds });
      }

      if (row.regressors === undefined) {
        return Object.freeze({
          timestamp: row.timestamp,
          ...bounds,
          conditions: Object.freeze({ ...row.conditions }),
        });
      }

      if (row.conditions === undefined) {
        return Object.freeze({
          timestamp: row.timestamp,
          ...bounds,
          regressors: Object.freeze({ ...row.regressors }),
        });
      }

      return Object.freeze({
        timestamp: row.timestamp,
        ...bounds,
        regressors: Object.freeze({ ...row.regressors }),
        conditions: Object.freeze({ ...row.conditions }),
      });
    }),
  );
});

/** Project an observation onto the prediction row with the same timestamp and known inputs. */
export const predictionRowFromObservation = (
  observation: Observation,
): Exclude<EncodedPredictionRow, string> => {
  const { value: _actual, timestamp, ...known } = observation;

  return Object.freeze({ ...known, timestamp: encodeTimestamp(timestamp) });
};

/**
 * Pair each observation with the forecast predicted from its own row, by position.
 *
 * Forecasts come from `observations.map(predictionRowFromObservation)`, so position is the
 * join: tied timestamps keep their own rows, and a timestamp mismatch means the forecast
 * does not belong to these observations.
 */
export const pairForecastsWithObservations = <Forecast extends { readonly timestamp: number }>(
  observations: ReadonlyArray<Observation>,
  forecasts: ReadonlyArray<Forecast>,
  message: string,
): Effect.Effect<ReadonlyArray<readonly [Observation, Forecast]>, PredictionError> => {
  const pairs: Array<readonly [Observation, Forecast]> = [];

  for (const [index, observation] of observations.entries()) {
    const forecast = forecasts[index];

    if (forecast?.timestamp !== observation.timestamp || forecasts.length !== observations.length) {
      return Effect.fail(
        new PredictionError({
          reason: "backend-failure",
          timestamp: observation.timestamp,
          message,
        }),
      );
    }

    pairs.push([observation, forecast]);
  }

  return Effect.succeed(pairs);
};
