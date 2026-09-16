import { Effect, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "./errors";
import {
  parseSeasonalities,
  type EncodedSeasonality,
  type InvalidSeasonality,
  type SeasonalityDefinition,
} from "./seasonality";

/** Valid trend forms that fitting backends may support selectively. */
export type Growth = "flat" | "linear";

/** Untrusted options accepted at the public decoding boundary. */
export interface EncodedProphetOptions {
  readonly growth?: Growth;
  readonly seasonalities?: ReadonlyArray<EncodedSeasonality>;
}

/**
 * Validated fitting configuration with every default applied.
 *
 * Successful parsing establishes that each option is valid, not that the
 * fitting backend selected by the caller supports the complete configuration.
 */
export interface ProphetOptions {
  readonly growth: Growth;
  readonly seasonalities: ReadonlyArray<SeasonalityDefinition>;
}

/**
 * Central defaults for public fitting configuration.
 *
 * Linear growth matches Prophet's default. Built-in seasonalities remain
 * disabled until their fit-time resolution policy is implemented.
 */
export const defaultProphetOptions: ProphetOptions = Object.freeze({
  growth: "linear",
  seasonalities: Object.freeze([]),
});

const GrowthSchema = Schema.Literals(["flat", "linear"]);

const ProphetOptionsSyntaxSchema = Schema.Struct({
  growth: GrowthSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultProphetOptions.growth)),
  ),
  seasonalities: Schema.Array(Schema.Unknown).pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultProphetOptions.seasonalities)),
  ),
});

const decodeProphetOptionsSyntax = Schema.decodeUnknownEffect(ProphetOptionsSyntaxSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const emptyOptions: EncodedProphetOptions = {};

/**
 * Translate seasonality-domain issues at the public options boundary.
 *
 * @param error - The internal seasonality parsing or layout failure.
 * @returns A public options validation failure with option-relative issue paths.
 */
export const optionsValidationErrorFromSeasonality = (
  error: InvalidSeasonality,
): InputValidationError =>
  new InputValidationError({
    input: "options",
    issues: error.issues.map((issue) => ({
      message: issue.message,
      path: ["seasonalities", ...(issue.path ?? [])],
    })),
    message: error.message,
  });

/** Decode optional, untrusted fitting options and apply the documented defaults. */
export const decodeOptions = Effect.fn("decodeOptions")(function* (
  input?: Parameters<typeof decodeProphetOptionsSyntax>[0],
): Effect.fn.Return<ProphetOptions, InputValidationError> {
  const encoded = input === undefined ? emptyOptions : input;

  const syntax = yield* decodeProphetOptionsSyntax(encoded).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("options", error.issue)),
  );

  const seasonalities = yield* parseSeasonalities(syntax.seasonalities).pipe(
    Effect.mapError(optionsValidationErrorFromSeasonality),
  );

  return {
    growth: syntax.growth,
    seasonalities,
  };
});
