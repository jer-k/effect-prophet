import { Effect, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "./errors";

/** Versioned scalar-path algorithm identity returned with every result. */
export const simulationIdentity = "prophet-map-scalar-xoshiro128ss-v2" as const;

const OptionsSchema = Schema.Struct({
  seed: Schema.Int.check(
    Schema.isGreaterThanOrEqualTo(0),
    Schema.isLessThanOrEqualTo(4_294_967_295),
  ),
  samples: Schema.optionalKey(
    Schema.Int.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(2_048)),
  ),
  intervalWidth: Schema.optionalKey(
    Schema.Finite.check(Schema.isGreaterThan(0), Schema.isLessThan(1)),
  ),
  output: Schema.optionalKey(Schema.Literals(["intervals", "samples"])),
});

/** Untrusted opt-in simulation request; an explicit seed is required. */
export type EncodedUncertaintyOptions = typeof OptionsSchema.Encoded;

/** Parsed exact-count simulation controls. */
export interface UncertaintyOptions {
  readonly seed: number;
  readonly samples: number;
  readonly intervalWidth: number;
  readonly output: "intervals" | "samples";
}

/** One finite equal-tailed predictive interval in observation units. */
export interface UncertaintyInterval {
  readonly lower: number;
  readonly upper: number;
}

/** Distinct owned interval or row-major sample results. */
export type UncertaintyResult =
  | {
      readonly kind: "intervals";
      readonly simulation: typeof simulationIdentity;
      readonly sampleCount: number;
      readonly intervalWidth: number;
      readonly rows: ReadonlyArray<{
        readonly timestamp: number;
        readonly trend: UncertaintyInterval;
        readonly value: UncertaintyInterval;
      }>;
    }
  | {
      readonly kind: "samples";
      readonly simulation: typeof simulationIdentity;
      readonly sampleCount: number;
      readonly timestamps: ReadonlyArray<number>;
      readonly trend: Float64Array;
      readonly value: Float64Array;
    };

const decodeOptions = Schema.decodeUnknownEffect(OptionsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** Parse explicit simulation controls without installing a random service. */
export const parseUncertaintyOptions = (
  input: EncodedUncertaintyOptions,
): Effect.Effect<UncertaintyOptions, InputValidationError> =>
  decodeOptions(input).pipe(
    Effect.map((parsed) => ({
      seed: parsed.seed,
      samples: parsed.samples ?? 1_000,
      intervalWidth: parsed.intervalWidth ?? 0.8,
      output: parsed.output ?? "intervals",
    })),
    Effect.mapError((error) => inputValidationErrorFromIssue("uncertainty-options", error.issue)),
  );
