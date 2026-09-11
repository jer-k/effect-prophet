import { Effect, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "./errors";

/** Trend forms available to fitting backend implementations. */
export type Growth = "flat" | "linear";

/** Untrusted options accepted at the public decoding boundary. */
export interface EncodedProphetOptions {
  readonly growth?: Growth;
}

/** Validated fitting configuration with every default applied. */
export interface ProphetOptions {
  readonly growth: Growth;
}

/**
 * Central defaults for public fitting configuration.
 *
 * Linear growth matches Prophet's default. Select `flat` for a constant trend.
 */
export const defaultProphetOptions: ProphetOptions = {
  growth: "linear",
};

const GrowthSchema = Schema.Literals(["flat", "linear"]);

const ProphetOptionsSchema: Schema.Codec<ProphetOptions, EncodedProphetOptions> = Schema.Struct({
  growth: GrowthSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultProphetOptions.growth)),
  ),
});

const decodeProphetOptionsSchema = Schema.decodeUnknownEffect(ProphetOptionsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const emptyOptions: EncodedProphetOptions = {};

/** Decode optional, untrusted fitting options and apply the documented defaults. */
export const decodeOptions = Effect.fn("decodeOptions")(function* (
  input?: Parameters<typeof decodeProphetOptionsSchema>[0],
): Effect.fn.Return<ProphetOptions, InputValidationError> {
  const encoded = input === undefined ? emptyOptions : input;

  return yield* decodeProphetOptionsSchema(encoded).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("options", error.issue)),
  );
});
