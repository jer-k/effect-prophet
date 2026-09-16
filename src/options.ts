import { Effect, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "./errors";
import {
  parseSeasonalities,
  type EncodedSeasonality,
  type InvalidSeasonality,
  type SeasonalityDefinition,
} from "./seasonality";

/** Valid trend forms represented by the current public fitting configuration. */
export type Growth = "flat" | "linear";

/** Public linear-growth options without configured seasonalities. */
export interface EncodedLinearTrendOptions {
  readonly growth?: "linear";
  readonly seasonalities?: readonly [];
}

/** Public linear-growth options with at least one configured seasonality. */
export interface EncodedLinearAdditiveOptions {
  readonly growth?: "linear";
  readonly seasonalities: readonly [EncodedSeasonality, ...ReadonlyArray<EncodedSeasonality>];
}

/**
 * Provisional flat-growth baseline options.
 *
 * The current implementation is the explicitly tagged constant-mean teaching
 * baseline, not Python Prophet's jointly fitted flat MAP model.
 */
export interface EncodedFlatBaselineOptions {
  readonly growth: "flat";
  readonly seasonalities?: readonly [];
}

/** Supported configurations accepted by the public fitting operation. */
export type EncodedProphetOptions =
  | EncodedLinearTrendOptions
  | EncodedLinearAdditiveOptions
  | EncodedFlatBaselineOptions;

/** Parsed linear-growth options without configured seasonalities. */
export interface LinearTrendOptions {
  readonly growth: "linear";
  readonly seasonalities: readonly [];
}

/** Parsed linear-growth options with at least one configured seasonality. */
export interface LinearAdditiveOptions {
  readonly growth: "linear";
  readonly seasonalities: readonly [SeasonalityDefinition, ...ReadonlyArray<SeasonalityDefinition>];
}

/** Parsed options for the provisional constant-mean flat baseline. */
export interface FlatBaselineOptions {
  readonly growth: "flat";
  readonly seasonalities: readonly [];
}

/** Validated and defaulted public fitting configuration. */
export type ProphetOptions = LinearTrendOptions | LinearAdditiveOptions | FlatBaselineOptions;

const emptySeasonalities: readonly [] = Object.freeze([]);

/**
 * Central defaults for public fitting configuration.
 *
 * Linear growth matches Prophet's default. Built-in seasonalities remain
 * disabled until their fit-time resolution policy is implemented.
 */
export const defaultProphetOptions: LinearTrendOptions = Object.freeze({
  growth: "linear",
  seasonalities: emptySeasonalities,
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

const emptyOptions: EncodedLinearTrendOptions = {};

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

  const firstSeasonality = seasonalities[0];

  if (syntax.growth === "flat") {
    if (firstSeasonality !== undefined) {
      return yield* Effect.fail(
        new InputValidationError({
          input: "options",
          issues: [
            {
              path: ["seasonalities"],
              message: "The provisional flat baseline does not support seasonalities",
            },
          ],
          message: "Flat growth with seasonalities is not implemented yet",
        }),
      );
    }

    return {
      growth: "flat",
      seasonalities: emptySeasonalities,
    };
  }

  if (firstSeasonality === undefined) {
    return defaultProphetOptions;
  }

  const nonEmptySeasonalities: readonly [
    SeasonalityDefinition,
    ...ReadonlyArray<SeasonalityDefinition>,
  ] = Object.freeze([firstSeasonality, ...seasonalities.slice(1)]);

  return {
    growth: "linear",
    seasonalities: nonEmptySeasonalities,
  };
});
