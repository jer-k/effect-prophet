import { Effect, Predicate, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "./errors";
import { TimestampSchema } from "./internal/timestamp";

/** One row accepted by the public prediction boundary. */
export type EncodedPredictionRow =
  | string
  | {
      readonly timestamp: string;
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
  readonly regressors?: Readonly<Record<string, number>>;
  readonly conditions?: Readonly<Record<string, boolean>>;
}

/** Ordered structurally parsed prediction rows. */
export type PredictionRows = ReadonlyArray<PredictionRow>;

const PredictionObjectSchema = Schema.Struct({
  timestamp: TimestampSchema,
  regressors: Schema.optionalKey(Schema.Record(Schema.String, Schema.Finite)),
  conditions: Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)),
});

const PredictionRowsSchema = Schema.Array(Schema.Union([TimestampSchema, PredictionObjectSchema]));

const decodePredictionRowsSchema = Schema.decodeUnknownEffect(PredictionRowsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** Structurally parse prediction rows while preserving legacy diagnostic labels. */
export const decodePredictionRows = Effect.fn("decodePredictionRows")(function* (
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

      if (row.regressors === undefined && row.conditions === undefined) {
        return Object.freeze({ timestamp: row.timestamp });
      }

      if (row.regressors === undefined) {
        return Object.freeze({
          timestamp: row.timestamp,
          conditions: Object.freeze({ ...row.conditions }),
        });
      }

      if (row.conditions === undefined) {
        return Object.freeze({
          timestamp: row.timestamp,
          regressors: Object.freeze({ ...row.regressors }),
        });
      }

      return Object.freeze({
        timestamp: row.timestamp,
        regressors: Object.freeze({ ...row.regressors }),
        conditions: Object.freeze({ ...row.conditions }),
      });
    }),
  );
});
