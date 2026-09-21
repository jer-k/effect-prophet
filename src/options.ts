import { Effect, Schema } from "effect";

import { InputValidationError, inputValidationErrorFromIssue } from "./errors";
import {
  emptyEventCalendar,
  parseEventCalendar,
  type EncodedEventOccurrence,
  type EventCalendar,
  type InvalidEventCalendar,
} from "./event";
import { TimestampSchema } from "./internal/timestamp";
import {
  parseRegressorDefinitions,
  type EncodedRegressorDefinition,
  type InvalidRegressors,
  type RegressorDefinition,
} from "./regressor";
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
  readonly events?: ReadonlyArray<EncodedEventOccurrence>;
  readonly regressors?: ReadonlyArray<EncodedRegressorDefinition>;
}

/** Public explicit or automatic changepoint configuration for linear MAP fitting. */
export type EncodedChangepointSetting =
  | {
      readonly mode: "explicit";
      readonly timestamps: ReadonlyArray<string>;
    }
  | {
      readonly mode: "auto";
      readonly count?: number;
      readonly range?: number;
    };

/** Public linear piecewise MAP controls. */
export interface EncodedMapOptions {
  readonly changepoints?: EncodedChangepointSetting;
  readonly changepointPriorScale?: number;
  readonly optimizer?: {
    readonly maxIterations?: number;
    readonly relativeTolerance?: number;
    readonly absoluteTolerance?: number;
  };
}

/** Parsed explicit or automatic changepoint request. */
export type ChangepointSetting =
  | {
      readonly mode: "explicit";
      readonly timestamps: ReadonlyArray<number>;
    }
  | {
      readonly mode: "auto";
      readonly count: number;
      readonly range: number;
    };

/** Parsed deterministic optimizer controls. */
export interface MapOptimizerControls {
  readonly maxIterations: number;
  readonly relativeTolerance: number;
  readonly absoluteTolerance: number;
}

/** Parsed linear piecewise MAP configuration. */
export interface MapOptions {
  readonly changepoints: ChangepointSetting;
  readonly changepointPriorScale: number;
  readonly optimizer: MapOptimizerControls;
}

/** Public linear-growth options without configured custom seasonalities. */
export interface EncodedLinearTrendOptions extends EncodedBuiltInOptions {
  readonly growth?: "linear";
  readonly seasonalities?: readonly [];
  readonly map?: EncodedMapOptions;
}

/** Public linear-growth options with at least one configured custom seasonality. */
export interface EncodedLinearAdditiveOptions extends EncodedBuiltInOptions {
  readonly growth?: "linear";
  readonly seasonalities: readonly [EncodedSeasonality, ...ReadonlyArray<EncodedSeasonality>];
  readonly map?: EncodedMapOptions;
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
  readonly events: EventCalendar;
  readonly regressors: ReadonlyArray<RegressorDefinition>;
}

/** Parsed linear-growth options without configured custom seasonalities. */
export interface LinearTrendOptions extends ParsedBuiltInOptions {
  readonly growth: "linear";
  readonly seasonalities: readonly [];
  readonly map?: MapOptions;
}

/** Parsed linear-growth options with at least one configured custom seasonality. */
export interface LinearAdditiveOptions extends ParsedBuiltInOptions {
  readonly growth: "linear";
  readonly seasonalities: readonly [SeasonalityDefinition, ...ReadonlyArray<SeasonalityDefinition>];
  readonly map?: MapOptions;
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

const emptyRegressors: readonly [] = Object.freeze([]);

const defaultBuiltInSeasonalities: BuiltInSeasonalities = Object.freeze({
  daily: "off",
  weekly: "off",
  yearly: "off",
});

/** Default automatic changepoint controls for additive linear requests. */
export const defaultAutomaticMapOptions: MapOptions = Object.freeze({
  changepoints: Object.freeze({ mode: "auto", count: 25, range: 0.8 }),
  changepointPriorScale: 0.05,
  optimizer: Object.freeze({
    maxIterations: 10_000,
    relativeTolerance: 1e-10,
    absoluteTolerance: 1e-12,
  }),
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
  events: emptyEventCalendar,
  regressors: emptyRegressors,
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

const ExplicitChangepointTimestampsSchema = Schema.Array(TimestampSchema).check(
  Schema.makeFilter((timestamps) => {
    for (let index = 1; index < timestamps.length; index += 1) {
      const previous = timestamps[index - 1];
      const current = timestamps[index];

      if (previous !== undefined && current !== undefined && current <= previous) {
        return {
          path: [index],
          issue: "Explicit changepoint timestamps must be strictly increasing and unique",
        };
      }
    }
  }),
);

const MapOptionsSchema = Schema.Struct({
  changepoints: Schema.Union([
    Schema.Struct({
      mode: Schema.Literal("explicit"),
      timestamps: ExplicitChangepointTimestampsSchema,
    }),
    Schema.Struct({
      mode: Schema.Literal("auto"),
      count: Schema.Int.check(
        Schema.isGreaterThanOrEqualTo(0),
        Schema.isLessThanOrEqualTo(Number.MAX_SAFE_INTEGER),
      ).pipe(Schema.withDecodingDefaultKey(Effect.succeed(25))),
      range: Schema.Finite.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(1)).pipe(
        Schema.withDecodingDefaultKey(Effect.succeed(0.8)),
      ),
    }),
  ]).pipe(
    Schema.withDecodingDefaultKey(Effect.succeed({ mode: "explicit", timestamps: [] } as const)),
  ),
  changepointPriorScale: PositiveFinite.pipe(Schema.withDecodingDefaultKey(Effect.succeed(0.05))),
  optimizer: Schema.Struct({
    maxIterations: Schema.Int.check(
      Schema.isGreaterThan(0),
      Schema.isLessThanOrEqualTo(4_294_967_295),
    ).pipe(Schema.withDecodingDefaultKey(Effect.succeed(10_000))),
    relativeTolerance: PositiveFinite.pipe(Schema.withDecodingDefaultKey(Effect.succeed(1e-10))),
    absoluteTolerance: PositiveFinite.pipe(Schema.withDecodingDefaultKey(Effect.succeed(1e-12))),
  }).pipe(
    Schema.withDecodingDefaultKey(
      Effect.succeed({
        maxIterations: 10_000,
        relativeTolerance: 1e-10,
        absoluteTolerance: 1e-12,
      }),
    ),
  ),
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
  events: Schema.Array(Schema.Unknown).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
  regressors: Schema.Array(Schema.Unknown).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
  map: Schema.optionalKey(MapOptionsSchema),
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

const freezeMapOptions = (options: MapOptions): MapOptions => {
  const changepoints: ChangepointSetting =
    options.changepoints.mode === "explicit"
      ? Object.freeze({
          mode: "explicit",
          timestamps: Object.freeze(Array.from(options.changepoints.timestamps)),
        })
      : Object.freeze({ ...options.changepoints });

  return Object.freeze({
    changepoints,
    changepointPriorScale: options.changepointPriorScale,
    optimizer: Object.freeze({ ...options.optimizer }),
  });
};

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

const optionsValidationErrorFromEvents = (error: InvalidEventCalendar): InputValidationError =>
  new InputValidationError({
    input: "options",
    issues: error.issues.map((issue) => ({
      message: issue.message,
      path: ["events", ...(issue.path ?? [])],
    })),
    message: error.message,
  });

const optionsValidationErrorFromRegressors = (error: InvalidRegressors): InputValidationError =>
  new InputValidationError({
    input: "options",
    issues: error.issues.map((issue) => ({
      message: issue.message,
      path: ["regressors", ...(issue.path ?? [])],
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

  const events = yield* parseEventCalendar(syntax.events).pipe(
    Effect.mapError(optionsValidationErrorFromEvents),
  );

  const regressors = yield* parseRegressorDefinitions(syntax.regressors).pipe(
    Effect.mapError(optionsValidationErrorFromRegressors),
  );

  const seasonalityNames = new Set(seasonalities.map((seasonality) => seasonality.name));

  for (const [index, occurrence] of events.occurrences.entries()) {
    if (seasonalityNames.has(occurrence.name)) {
      return yield* Effect.fail(
        new InputValidationError({
          input: "options",
          issues: [
            {
              path: ["events", index, "name"],
              message: `Feature name '${occurrence.name}' collides with a seasonality`,
            },
          ],
          message: "Event and seasonality names must be distinct",
        }),
      );
    }
  }

  const eventNames = new Set(events.occurrences.map((occurrence) => occurrence.name));

  for (const [index, regressor] of regressors.entries()) {
    const collision = seasonalityNames.has(regressor.name)
      ? "a seasonality"
      : eventNames.has(regressor.name)
        ? "an event"
        : undefined;

    if (collision !== undefined) {
      return yield* Effect.fail(
        new InputValidationError({
          input: "options",
          issues: [
            {
              path: ["regressors", index, "name"],
              message: `Feature name '${regressor.name}' collides with ${collision}`,
            },
          ],
          message: "Regressor names must be globally distinct",
        }),
      );
    }
  }

  if (syntax.growth === "flat" && syntax.map !== undefined) {
    return yield* Effect.fail(
      new InputValidationError({
        input: "options",
        issues: [{ path: ["map"], message: "Linear MAP options require linear growth" }],
        message: "Linear MAP options require linear growth",
      }),
    );
  }

  const builtInSeasonalities = freezeBuiltInSeasonalities(syntax.builtInSeasonalities);
  const map = syntax.map === undefined ? undefined : freezeMapOptions(syntax.map);
  const firstSeasonality = seasonalities[0];

  if (firstSeasonality === undefined) {
    if (syntax.growth === "flat") {
      return {
        growth: "flat",
        seasonalities: emptySeasonalities,
        builtInSeasonalities,
        events,
        regressors,
      };
    }

    return map === undefined
      ? {
          growth: "linear",
          seasonalities: emptySeasonalities,
          builtInSeasonalities,
          events,
          regressors,
        }
      : {
          growth: "linear",
          seasonalities: emptySeasonalities,
          builtInSeasonalities,
          events,
          regressors,
          map,
        };
  }

  const nonEmptySeasonalities: readonly [
    SeasonalityDefinition,
    ...ReadonlyArray<SeasonalityDefinition>,
  ] = Object.freeze([firstSeasonality, ...seasonalities.slice(1)]);

  if (syntax.growth === "flat") {
    return {
      growth: "flat",
      seasonalities: nonEmptySeasonalities,
      builtInSeasonalities,
      events,
      regressors,
    };
  }

  return map === undefined
    ? {
        growth: "linear",
        seasonalities: nonEmptySeasonalities,
        builtInSeasonalities,
        events,
        regressors,
      }
    : {
        growth: "linear",
        seasonalities: nonEmptySeasonalities,
        builtInSeasonalities,
        events,
        regressors,
        map,
      };
});
