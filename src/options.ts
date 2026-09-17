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

/** A public control for one built-in daily, weekly, or yearly seasonality. */
export type EncodedBuiltInSeasonalitySetting =
  | "off"
  | "auto"
  | {
      readonly mode: "on";
      readonly fourierOrder?: number;
      readonly priorScale?: number;
    };

/** Public controls for Prophet's three built-in seasonalities. */
export interface EncodedBuiltInSeasonalities {
  readonly daily?: EncodedBuiltInSeasonalitySetting;
  readonly weekly?: EncodedBuiltInSeasonalitySetting;
  readonly yearly?: EncodedBuiltInSeasonalitySetting;
}

/** A parsed control for one built-in seasonality. */
export type BuiltInSeasonalitySetting =
  | "off"
  | "auto"
  | {
      readonly mode: "on";
      readonly fourierOrder: number;
      readonly priorScale: number;
    };

/** Parsed and fully defaulted controls for all built-in seasonalities. */
export interface BuiltInSeasonalities {
  readonly daily: BuiltInSeasonalitySetting;
  readonly weekly: BuiltInSeasonalitySetting;
  readonly yearly: BuiltInSeasonalitySetting;
}

interface EncodedBuiltInOptions {
  readonly builtInSeasonalities?: EncodedBuiltInSeasonalities;
}

/** Public linear-growth options without configured custom seasonalities. */
export interface EncodedLinearTrendOptions extends EncodedBuiltInOptions {
  readonly growth?: "linear";
  readonly seasonalities?: readonly [];
}

/** Public linear-growth options with at least one configured custom seasonality. */
export interface EncodedLinearAdditiveOptions extends EncodedBuiltInOptions {
  readonly growth?: "linear";
  readonly seasonalities: readonly [EncodedSeasonality, ...ReadonlyArray<EncodedSeasonality>];
}

/** Public flat-growth MAP options without configured custom seasonalities. */
export interface EncodedFlatTrendOptions extends EncodedBuiltInOptions {
  readonly growth: "flat";
  readonly seasonalities?: readonly [];
}

/** Public flat-growth MAP options with at least one configured custom seasonality. */
export interface EncodedFlatAdditiveOptions extends EncodedBuiltInOptions {
  readonly growth: "flat";
  readonly seasonalities: readonly [EncodedSeasonality, ...ReadonlyArray<EncodedSeasonality>];
}

/** Supported configurations accepted by the public fitting operation. */
export type EncodedProphetOptions =
  | EncodedLinearTrendOptions
  | EncodedLinearAdditiveOptions
  | EncodedFlatTrendOptions
  | EncodedFlatAdditiveOptions;

interface ParsedBuiltInOptions {
  readonly builtInSeasonalities: BuiltInSeasonalities;
}

/** Parsed linear-growth options without configured custom seasonalities. */
export interface LinearTrendOptions extends ParsedBuiltInOptions {
  readonly growth: "linear";
  readonly seasonalities: readonly [];
}

/** Parsed linear-growth options with at least one configured custom seasonality. */
export interface LinearAdditiveOptions extends ParsedBuiltInOptions {
  readonly growth: "linear";
  readonly seasonalities: readonly [SeasonalityDefinition, ...ReadonlyArray<SeasonalityDefinition>];
}

/** Parsed flat-growth MAP options without configured custom seasonalities. */
export interface FlatTrendOptions extends ParsedBuiltInOptions {
  readonly growth: "flat";
  readonly seasonalities: readonly [];
}

/** Parsed flat-growth MAP options with at least one configured custom seasonality. */
export interface FlatAdditiveOptions extends ParsedBuiltInOptions {
  readonly growth: "flat";
  readonly seasonalities: readonly [SeasonalityDefinition, ...ReadonlyArray<SeasonalityDefinition>];
}

/** Validated and defaulted public fitting configuration awaiting fit-time resolution. */
export type ProphetOptions =
  | LinearTrendOptions
  | LinearAdditiveOptions
  | FlatTrendOptions
  | FlatAdditiveOptions;

const emptySeasonalities: readonly [] = Object.freeze([]);

const defaultBuiltInSeasonalities: BuiltInSeasonalities = Object.freeze({
  daily: "off",
  weekly: "off",
  yearly: "off",
});

/**
 * Central defaults for public fitting configuration.
 *
 * Linear growth matches Prophet's default. Built-in seasonalities deliberately default to off;
 * callers opt into training-history-based resolution with `"auto"`.
 */
export const defaultProphetOptions: LinearTrendOptions = Object.freeze({
  growth: "linear",
  seasonalities: emptySeasonalities,
  builtInSeasonalities: defaultBuiltInSeasonalities,
});

const GrowthSchema = Schema.Literals(["flat", "linear"]);

const PositiveFinite = Schema.Finite.check(Schema.isGreaterThan(0));

const maximumFourierOrder = Math.floor(Number.MAX_SAFE_INTEGER / 2);

const PositiveFourierOrder = Schema.Int.check(
  Schema.isGreaterThan(0),
  Schema.isLessThanOrEqualTo(maximumFourierOrder),
);

const BuiltInPriorScale = PositiveFinite.pipe(Schema.withDecodingDefaultKey(Effect.succeed(10)));

const builtInSettingSchema = (defaultOrder: number) =>
  Schema.Union([
    Schema.Literals(["off", "auto"]),
    Schema.Struct({
      mode: Schema.Literal("on"),
      fourierOrder: PositiveFourierOrder.pipe(
        Schema.withDecodingDefaultKey(Effect.succeed(defaultOrder)),
      ),
      priorScale: BuiltInPriorScale,
    }),
  ]);

const BuiltInSeasonalitiesSchema = Schema.Struct({
  daily: builtInSettingSchema(4).pipe(Schema.withDecodingDefaultKey(Effect.succeed("off"))),
  weekly: builtInSettingSchema(3).pipe(Schema.withDecodingDefaultKey(Effect.succeed("off"))),
  yearly: builtInSettingSchema(10).pipe(Schema.withDecodingDefaultKey(Effect.succeed("off"))),
});

const ProphetOptionsSyntaxSchema = Schema.Struct({
  growth: GrowthSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultProphetOptions.growth)),
  ),
  seasonalities: Schema.Array(Schema.Unknown).pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultProphetOptions.seasonalities)),
  ),
  builtInSeasonalities: BuiltInSeasonalitiesSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultBuiltInSeasonalities)),
  ),
});

const decodeProphetOptionsSyntax = Schema.decodeUnknownEffect(ProphetOptionsSyntaxSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const emptyOptions: EncodedLinearTrendOptions = {};

const freezeBuiltInSetting = (setting: BuiltInSeasonalitySetting): BuiltInSeasonalitySetting =>
  setting === "off" || setting === "auto" ? setting : Object.freeze(setting);

const freezeBuiltInSeasonalities = (seasonalities: BuiltInSeasonalities): BuiltInSeasonalities =>
  Object.freeze({
    daily: freezeBuiltInSetting(seasonalities.daily),
    weekly: freezeBuiltInSetting(seasonalities.weekly),
    yearly: freezeBuiltInSetting(seasonalities.yearly),
  });

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

  const builtInSeasonalities = freezeBuiltInSeasonalities(syntax.builtInSeasonalities);
  const firstSeasonality = seasonalities[0];

  if (firstSeasonality === undefined) {
    return syntax.growth === "flat"
      ? { growth: "flat", seasonalities: emptySeasonalities, builtInSeasonalities }
      : { growth: "linear", seasonalities: emptySeasonalities, builtInSeasonalities };
  }

  const nonEmptySeasonalities: readonly [
    SeasonalityDefinition,
    ...ReadonlyArray<SeasonalityDefinition>,
  ] = Object.freeze([firstSeasonality, ...seasonalities.slice(1)]);

  return syntax.growth === "linear"
    ? { growth: "linear", seasonalities: nonEmptySeasonalities, builtInSeasonalities }
    : { growth: "flat", seasonalities: nonEmptySeasonalities, builtInSeasonalities };
});
