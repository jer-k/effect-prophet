import { Effect, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "./errors";
import { TimestampSchema } from "./internal/timestamp";

/** Input representation accepted at the public decoding boundary. */
export interface EncodedObservation {
  readonly timestamp: string;
  readonly value: number;
  readonly regressors?: Readonly<Record<string, number>>;
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
  readonly regressors?: Readonly<Record<string, number>>;
}

/** A non-empty encoded observation collection. */
export type EncodedObservations = readonly [EncodedObservation, ...Array<EncodedObservation>];

/** A validated, non-empty, strictly time-ordered observation collection. */
export type Observations = readonly [Observation, ...Array<Observation>];

const ObservationSchema: Schema.Codec<Observation, EncodedObservation> = Schema.Struct({
  timestamp: TimestampSchema,
  value: Schema.Finite,
  regressors: Schema.optionalKey(Schema.Record(Schema.String, Schema.Finite)),
});

const observationsAreStrictlyOrdered = Schema.makeFilter<Observations>((observations) => {
  let previous = observations[0];

  for (const [index, current] of observations.entries()) {
    if (index === 0) {
      continue;
    }

    if (current.timestamp === previous.timestamp) {
      return {
        path: [index, "timestamp"],
        issue: "Duplicate timestamps are not allowed",
      };
    }

    if (current.timestamp < previous.timestamp) {
      return {
        path: [index, "timestamp"],
        issue: "Observations must be sorted by timestamp in ascending order",
      };
    }

    previous = current;
  }
});

const ObservationsSchema: Schema.Codec<Observations, EncodedObservations> = Schema.NonEmptyArray(
  ObservationSchema,
).check(observationsAreStrictlyOrdered);

const decodeObservationsSchema = Schema.decodeUnknownEffect(ObservationsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** Decode untrusted input into validated observations without throwing expected failures. */
export const decodeObservations = Effect.fn("decodeObservations")(function* (
  input: Parameters<typeof decodeObservationsSchema>[0],
): Effect.fn.Return<Observations, InputValidationError> {
  return yield* decodeObservationsSchema(input).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("observations", error.issue)),
  );
});
