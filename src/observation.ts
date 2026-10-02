import { Effect, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "./errors";
import { TimestampSchema } from "./internal/timestamp";

/** Input representation accepted at the public decoding boundary. */
export interface EncodedObservation {
  readonly timestamp: string;
  readonly value: number;
  readonly capacity?: number;
  readonly floor?: number;
  readonly regressors?: Readonly<Record<string, number>>;
  readonly conditions?: Readonly<Record<string, boolean>>;
}

/**
 * A validated observation used by the numerical core.
 *
 * `timestamp` is an integer count of milliseconds since the Unix epoch. Keeping
 * it as a number avoids mutable `Date` objects and maps directly to numerical
 * backend inputs.
 */
export interface Observation {
  readonly timestamp: number;
  readonly value: number;
  readonly capacity?: number;
  readonly floor?: number;
  readonly regressors?: Readonly<Record<string, number>>;
  readonly conditions?: Readonly<Record<string, boolean>>;
}

/** A non-empty encoded observation collection. */
export type EncodedObservations = readonly [EncodedObservation, ...Array<EncodedObservation>];

/** A validated, non-empty, nondecreasing history retaining every observation. */
export type Observations = readonly [Observation, ...Array<Observation>];

const ObservationSchema: Schema.Codec<Observation, EncodedObservation> = Schema.Struct({
  timestamp: TimestampSchema,
  value: Schema.Finite,
  capacity: Schema.optionalKey(Schema.Finite),
  floor: Schema.optionalKey(Schema.Finite),
  regressors: Schema.optionalKey(Schema.Record(Schema.String, Schema.Finite)),
  conditions: Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)),
});

const ObservationsSchema: Schema.Codec<Observations, EncodedObservations> =
  Schema.NonEmptyArray(ObservationSchema);

const decodeObservationsSchema = Schema.decodeUnknownEffect(ObservationsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** Decode every complete row, then stably sort an owned history without dropping ties. */
export const decodeObservations = Effect.fn("decodeObservations")(function* (
  input: Parameters<typeof decodeObservationsSchema>[0],
): Effect.fn.Return<Observations, InputValidationError> {
  const observations = yield* decodeObservationsSchema(input).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("observations", error.issue)),
  );

  const [first, ...rest] = observations;
  const sorted: [Observation, ...Array<Observation>] = [first, ...rest];

  // ECMAScript sorting is stable; only this newly owned array is mutated.
  sorted.sort((left, right) => left.timestamp - right.timestamp);

  return sorted;
});
