import { Effect, Predicate, Schema } from "effect";

import { ComponentModeSchema, type ComponentMode } from "./component-mode";
import {
  parseCountryHolidays,
  type CountryHolidayError,
  type CountryHolidays,
  type EncodedCountryHolidays,
} from "./country-holidays";
import { InputValidationError, inputValidationErrorFromIssue } from "./errors";
import type { FeatureName } from "./feature-name";
import {
  defaultEventPriorScale,
  emptyEventCalendar,
  parseEventCalendar,
  type EncodedEventOccurrence,
  type EventCalendar,
  type InvalidEventCalendar,
} from "./event";
import { PositiveFinite, PositiveFourierOrder } from "./internal/numeric-schemas";
import { TimestampSchema } from "./internal/timestamp";
import type { Observations } from "./observation";
import {
  decodeLinearOptimizer,
  defaultLinearOptimizer,
  type EncodedLinearOptimizer,
  type LinearOptimizer,
} from "./linear-optimizer";
import {
  parseRegressorDefinitionsAndModels,
  type EncodedRegressorDefinition,
  type InvalidRegressors,
  type RegressorDefinition,
  type RegressorModelSyntax,
} from "./regressor";
import {
  defaultSeasonalityPriorScale,
  parseSeasonalities,
  type EncodedSeasonality,
  type InvalidSeasonality,
  type SeasonalityDefinition,
} from "./seasonality";
import { TargetScalingModeSchema, type TargetScalingMode } from "./target-scaling";
import { WarmStartParametersSchema, type WarmStartParameters } from "./warm-start";

/** Valid trend forms represented by the current public fitting configuration. */
export type Growth = "flat" | "linear" | "logistic";

/**
 * A public control for one built-in daily, weekly, or yearly seasonality. `"auto"`, and `"on"`
 * without a `priorScale`, use the options' `seasonalityPriorScale`.
 */
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
  readonly countryHolidays?: EncodedCountryHolidays;
  readonly seasonalityMode?: ComponentMode;
  readonly holidaysMode?: ComponentMode;

  /**
   * Like Python's `seasonality_prior_scale`: the prior scale for built-in and custom seasonalities
   * that do not set their own. Defaults to `10`.
   */
  readonly seasonalityPriorScale?: number;

  /**
   * Like Python's `holidays_prior_scale`: the prior scale for events, country holidays and
   * regressors that do not set their own. Defaults to `10`. Regressors follow it as in Python, so
   * give them their own `priorScale` to tune holidays alone.
   */
  readonly holidaysPriorScale?: number;

  readonly builtInSeasonalities?: EncodedBuiltInSeasonalities;
  readonly events?: ReadonlyArray<EncodedEventOccurrence>;
  readonly regressors?: ReadonlyArray<EncodedRegressorDefinition>;
  readonly scaling?: TargetScalingMode;
}

/** Public explicit or automatic changepoint configuration for MAP fitting. */
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
  readonly optimizer?: EncodedLinearOptimizer;

  /** Where the optimizer starts, like Python's `init`; see `warmStartParameters`. */
  readonly warmStart?: WarmStartParameters;
}

/**
 * Public flat-growth MAP controls.
 *
 * Prophet resolves changepoints for flat growth too. The flat trend ignores them, but each
 * adds a prior-only rate adjustment to Stan's optimizer state, scaled by
 * `changepointPriorScale`. They never move the fitted level or forecasts directly.
 */
export type EncodedFlatMapOptions = EncodedMapOptions;

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

/** Check explicit MAP points against the inclusive range of the original observed history. */
export const checkExplicitChangepointBounds = (
  observations: Observations,
  options: ProphetOptions,
): Effect.Effect<void, InputValidationError> => {
  if (observations.length < 2 || options.map.changepoints.mode !== "explicit") {
    return Effect.void;
  }

  const first = observations[0];
  const last = observations.at(-1);

  if (first === undefined || last === undefined) {
    return Effect.void;
  }

  for (const [index, changepoint] of options.map.changepoints.timestamps.entries()) {
    if (changepoint < first.timestamp || changepoint > last.timestamp) {
      return Effect.fail(
        new InputValidationError({
          input: "options",
          issues: [
            {
              path: ["map", "changepoints", "timestamps", index],
              message: "Explicit changepoints must be inside the inclusive training range",
            },
          ],
          message: "Explicit changepoints must be inside the inclusive training range",
        }),
      );
    }
  }

  return Effect.void;
};

/** Parsed linear piecewise MAP configuration. */
export interface MapOptions<Optimizer = LinearOptimizer> {
  readonly changepoints: ChangepointSetting;
  readonly changepointPriorScale: number;
  readonly optimizer: Optimizer;

  /** Requested optimizer start; Prophet's initialization applies when absent. */
  readonly warmStart?: WarmStartParameters;
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
  readonly map?: EncodedFlatMapOptions;
}

/** Public flat-growth MAP options with at least one configured custom seasonality. */
export interface EncodedFlatAdditiveOptions extends EncodedBuiltInOptions {
  readonly growth: "flat";
  readonly seasonalities: readonly [EncodedSeasonality, ...ReadonlyArray<EncodedSeasonality>];
  readonly map?: EncodedFlatMapOptions;
}

/** Public logistic-growth MAP options. */
export interface EncodedLogisticOptions extends EncodedBuiltInOptions {
  readonly growth: "logistic";
  readonly seasonalities?: ReadonlyArray<EncodedSeasonality>;
  readonly map?: EncodedMapOptions;
}

/** Supported configurations accepted by the public fitting operation. */
export type EncodedProphetOptions =
  | EncodedLinearTrendOptions
  | EncodedLinearAdditiveOptions
  | EncodedFlatTrendOptions
  | EncodedFlatAdditiveOptions
  | EncodedLogisticOptions;

/** A regressor forecast by its own model, with that model's parsed options. */
export interface RegressorModelRequest {
  readonly name: FeatureName;
  readonly options: ProphetOptions;
}

interface ParsedBuiltInOptions {
  readonly countryHolidays?: CountryHolidays;
  readonly seasonalityMode: ComponentMode;
  readonly holidaysMode: ComponentMode;
  readonly seasonalityPriorScale: number;
  readonly holidaysPriorScale: number;
  readonly builtInSeasonalities: BuiltInSeasonalities;
  readonly events: EventCalendar;
  readonly regressors: ReadonlyArray<RegressorDefinition>;

  /** The regressors forecast by their own models, in definition order. */
  readonly regressorModels: ReadonlyArray<RegressorModelRequest>;
  readonly scaling?: TargetScalingMode;
}

/** Parsed linear-growth options without configured custom seasonalities. */
export interface LinearTrendOptions extends ParsedBuiltInOptions {
  readonly growth: "linear";
  readonly seasonalities: readonly [];
  readonly map: MapOptions;
}

/** Parsed linear-growth options with at least one configured custom seasonality. */
export interface LinearAdditiveOptions extends ParsedBuiltInOptions {
  readonly growth: "linear";
  readonly seasonalities: readonly [SeasonalityDefinition, ...ReadonlyArray<SeasonalityDefinition>];
  readonly map: MapOptions;
}

/**
 * Parsed flat-growth controls with Prophet's changepoint defaults.
 *
 * `optimizer` is present only when requested; otherwise Prophet's selection policy applies.
 * Changepoint settings shape only the Stan state, never the flat trend.
 */
export interface FlatMapOptions {
  readonly changepoints: ChangepointSetting;
  readonly changepointPriorScale: number;
  readonly optimizer?: LinearOptimizer;
  readonly warmStart?: WarmStartParameters;
}

/** Parsed flat-growth MAP options without configured custom seasonalities. */
export interface FlatTrendOptions extends ParsedBuiltInOptions {
  readonly growth: "flat";
  readonly seasonalities: readonly [];
  readonly map: FlatMapOptions;
}

/** Parsed flat-growth MAP options with at least one configured custom seasonality. */
export interface FlatAdditiveOptions extends ParsedBuiltInOptions {
  readonly growth: "flat";
  readonly seasonalities: readonly [SeasonalityDefinition, ...ReadonlyArray<SeasonalityDefinition>];
  readonly map: FlatMapOptions;
}

/** Parsed logistic-growth MAP configuration. */
export interface LogisticOptions extends ParsedBuiltInOptions {
  readonly growth: "logistic";
  readonly seasonalities: ReadonlyArray<SeasonalityDefinition>;
  readonly map: MapOptions<LinearOptimizer>;
}

/** Validated and defaulted public fitting configuration awaiting fit-time resolution. */
export type ProphetOptions =
  | LinearTrendOptions
  | LinearAdditiveOptions
  | FlatTrendOptions
  | FlatAdditiveOptions
  | LogisticOptions;

const emptySeasonalities: readonly [] = Object.freeze([]);

const emptyRegressors: readonly [] = Object.freeze([]);

const emptyRegressorModels: readonly [] = Object.freeze([]);

const defaultBuiltInSeasonalities: BuiltInSeasonalities = Object.freeze({
  daily: "auto",
  weekly: "auto",
  yearly: "auto",
});

const defaultAutomaticChangepoints = Object.freeze({
  mode: "auto",
  count: 25,
  range: 0.8,
} as const);

/** Default automatic changepoint controls, matching Prophet's for every growth. */
export const defaultAutomaticMapOptions: MapOptions = Object.freeze({
  changepoints: defaultAutomaticChangepoints,
  changepointPriorScale: 0.05,
  optimizer: defaultLinearOptimizer,
});

/**
 * Central defaults for public fitting configuration.
 *
 * Linear growth and automatic built-in seasonality requests match Prophet's defaults.
 * Training history resolves automatic requests; callers may explicitly opt out with `"off"`.
 */
export const defaultProphetOptions: LinearTrendOptions = Object.freeze({
  growth: "linear",
  seasonalityMode: "additive",
  holidaysMode: "additive",
  seasonalityPriorScale: defaultSeasonalityPriorScale,
  holidaysPriorScale: defaultEventPriorScale,
  seasonalities: emptySeasonalities,
  builtInSeasonalities: defaultBuiltInSeasonalities,
  events: emptyEventCalendar,
  regressors: emptyRegressors,
  regressorModels: emptyRegressorModels,
  map: defaultAutomaticMapOptions,
});

const GrowthSchema = Schema.Literals(["flat", "linear", "logistic"]);

const builtInSettingSchema = (defaultOrder: number) =>
  Schema.Union([
    Schema.Literals(["off", "auto"]),
    Schema.Struct({
      mode: Schema.Literal("on"),
      fourierOrder: PositiveFourierOrder.pipe(
        Schema.withDecodingDefaultKey(Effect.succeed(defaultOrder)),
      ),
      priorScale: Schema.optionalKey(PositiveFinite),
    }),
  ]);

const BuiltInSeasonalitiesSchema = Schema.Struct({
  daily: builtInSettingSchema(4).pipe(Schema.withDecodingDefaultKey(Effect.succeed("auto"))),
  weekly: builtInSettingSchema(3).pipe(Schema.withDecodingDefaultKey(Effect.succeed("auto"))),
  yearly: builtInSettingSchema(10).pipe(Schema.withDecodingDefaultKey(Effect.succeed("auto"))),
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
  ]).pipe(Schema.optionalKey),
  changepointPriorScale: Schema.optionalKey(PositiveFinite),
  optimizer: Schema.optionalKey(Schema.Unknown),
  warmStart: Schema.optionalKey(WarmStartParametersSchema),
});

const ProphetOptionsSyntaxSchema = Schema.Struct({
  countryHolidays: Schema.optionalKey(Schema.Unknown),
  growth: GrowthSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultProphetOptions.growth)),
  ),
  seasonalityMode: ComponentModeSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed("additive")),
  ),
  holidaysMode: Schema.optionalKey(ComponentModeSchema),
  seasonalityPriorScale: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultSeasonalityPriorScale)),
  ),
  holidaysPriorScale: PositiveFinite.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultEventPriorScale)),
  ),
  seasonalities: Schema.Array(Schema.Unknown).pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultProphetOptions.seasonalities)),
  ),
  builtInSeasonalities: BuiltInSeasonalitiesSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(defaultBuiltInSeasonalities)),
  ),
  events: Schema.Array(Schema.Unknown).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
  regressors: Schema.Array(Schema.Unknown).pipe(Schema.withDecodingDefaultKey(Effect.succeed([]))),
  scaling: Schema.optionalKey(TargetScalingModeSchema),
  map: Schema.optionalKey(MapOptionsSchema),
});

const decodeProphetOptionsSyntax = Schema.decodeUnknownEffect(ProphetOptionsSyntaxSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const emptyOptions: EncodedLinearTrendOptions = {};

type DecodedBuiltInSeasonalities = typeof BuiltInSeasonalitiesSchema.Type;

type DecodedBuiltInSeasonalitySetting = DecodedBuiltInSeasonalities["daily"];

// "auto" stays a request; fit-time resolution gives it the same default prior scale.
const resolveBuiltInSetting = (
  setting: DecodedBuiltInSeasonalitySetting,
  defaultPriorScale: number,
): BuiltInSeasonalitySetting =>
  setting === "off" || setting === "auto"
    ? setting
    : Object.freeze({
        mode: setting.mode,
        fourierOrder: setting.fourierOrder,
        priorScale: setting.priorScale ?? defaultPriorScale,
      });

const resolveBuiltInSeasonalities = (
  seasonalities: DecodedBuiltInSeasonalities,
  defaultPriorScale: number,
): BuiltInSeasonalities =>
  Object.freeze({
    daily: resolveBuiltInSetting(seasonalities.daily, defaultPriorScale),
    weekly: resolveBuiltInSetting(seasonalities.weekly, defaultPriorScale),
    yearly: resolveBuiltInSetting(seasonalities.yearly, defaultPriorScale),
  });

const freezeMapOptions = <Optimizer extends object>(
  options: MapOptions<Optimizer>,
): MapOptions<Optimizer> => {
  const changepoints: ChangepointSetting =
    options.changepoints.mode === "explicit"
      ? Object.freeze({
          mode: "explicit",
          timestamps: Object.freeze(Array.from(options.changepoints.timestamps)),
        })
      : Object.freeze({ ...options.changepoints });

  const warmStart =
    options.warmStart === undefined
      ? {}
      : {
          warmStart: Object.freeze({
            ...options.warmStart,
            delta: Object.freeze(Array.from(options.warmStart.delta)),
            beta: Object.freeze(Array.from(options.warmStart.beta)),
          }),
        };

  return Object.freeze({
    changepoints,
    changepointPriorScale: options.changepointPriorScale,
    optimizer: Object.freeze({ ...options.optimizer }),
    ...warmStart,
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

/** Translate custom/country event merge failures at the public options seam. */
export const optionsValidationErrorFromEvents = (
  error: InvalidEventCalendar,
): InputValidationError =>
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

/** Recheck global identities after training-derived seasonalities and events are resolved. */
export const checkOptionFeatureNames = (
  seasonalities: ReadonlyArray<SeasonalityDefinition>,
  events: EventCalendar,
  regressors: ReadonlyArray<RegressorDefinition>,
): Effect.Effect<void, InputValidationError> =>
  Effect.gen(function* () {
    const seasonalityNames = new Set(seasonalities.map((seasonality) => seasonality.name));
    const conditionNames = new Set<string>();

    for (const [index, seasonality] of seasonalities.entries()) {
      const conditionName = seasonality.conditionName;

      if (conditionName === undefined) {
        continue;
      }

      if (seasonalityNames.has(conditionName)) {
        return yield* new InputValidationError({
          input: "options",
          issues: [
            {
              path: ["seasonalities", index, "conditionName"],
              message: `Condition name '${conditionName}' collides with a seasonality`,
            },
          ],
          message: "Condition and seasonality names must be distinct",
        });
      }

      conditionNames.add(conditionName);
    }

    for (const [index, occurrence] of events.occurrences.entries()) {
      const collision = seasonalityNames.has(occurrence.name)
        ? "a seasonality"
        : conditionNames.has(occurrence.name)
          ? "a condition"
          : undefined;

      if (collision !== undefined) {
        return yield* new InputValidationError({
          input: "options",
          issues: [
            {
              path: ["events", index, "name"],
              message: `Feature name '${occurrence.name}' collides with ${collision}`,
            },
          ],
          message: "Event names must be globally distinct",
        });
      }
    }

    const eventNames = new Set(events.occurrences.map((occurrence) => occurrence.name));

    for (const [index, regressor] of regressors.entries()) {
      const collision = seasonalityNames.has(regressor.name)
        ? "a seasonality"
        : eventNames.has(regressor.name)
          ? "an event"
          : conditionNames.has(regressor.name)
            ? "a condition"
            : undefined;

      if (collision !== undefined) {
        return yield* new InputValidationError({
          input: "options",
          issues: [
            {
              path: ["regressors", index, "name"],
              message: `Feature name '${regressor.name}' collides with ${collision}`,
            },
          ],
          message: "Regressor names must be globally distinct",
        });
      }
    }
  });

/** Move option issues under a path, such as the regressor whose model options they belong to. */
export const prefixOptionsIssues = (
  error: InputValidationError,
  prefix: ReadonlyArray<PropertyKey>,
): InputValidationError =>
  new InputValidationError({
    input: "options",
    issues: error.issues.map((issue) => ({
      message: issue.message,
      path: [...prefix, ...(issue.path ?? [])],
    })),
    message: error.message,
  });

/**
 * Parse each requested regressor model's options with the main model's fit settings.
 *
 * Python passes its fit arguments on to each regressor model, so a requested optimizer and warm
 * start apply to them too. A warm start's `delta` and `beta` then fall back to their defaults
 * unless their lengths happen to match the regressor model's, as in Python.
 */
const parseRegressorModels = Effect.fnUntraced(function* (
  models: ReadonlyArray<RegressorModelSyntax>,
  map: typeof MapOptionsSchema.Type | undefined,
): Effect.fn.Return<
  ReadonlyArray<RegressorModelRequest>,
  InputValidationError | CountryHolidayError
> {
  if (models.length === 0) {
    return emptyRegressorModels;
  }

  const optimizer = map?.optimizer === undefined ? {} : { optimizer: map.optimizer };
  const warmStart = map?.warmStart === undefined ? {} : { warmStart: map.warmStart };
  const inheritsFitSettings = map?.optimizer !== undefined || map?.warmStart !== undefined;

  const requests: Array<RegressorModelRequest> = [];

  for (const { index, name, options } of models) {
    const inherited =
      options.map === undefined && !inheritsFitSettings
        ? options
        : { ...options, map: { ...options.map, ...optimizer, ...warmStart } };

    const parsed = yield* decodeOptionsInput(inherited).pipe(
      Effect.mapError((error) =>
        Predicate.isTagged("InputValidationError")(error)
          ? prefixOptionsIssues(error, ["regressors", index, "predictor"])
          : error,
      ),
    );

    requests.push(Object.freeze({ name, options: parsed }));
  }

  return Object.freeze(requests);
});

/** Decode optional, untrusted fitting options and apply the documented defaults. */
export const decodeOptions = Effect.fn("Prophet.decodeOptions")(function* (
  input?: Parameters<typeof decodeProphetOptionsSyntax>[0],
): Effect.fn.Return<ProphetOptions, InputValidationError | CountryHolidayError> {
  return yield* decodeOptionsInput(input);
});

const decodeOptionsInput = Effect.fnUntraced(function* (
  input?: Parameters<typeof decodeProphetOptionsSyntax>[0],
): Effect.fn.Return<ProphetOptions, InputValidationError | CountryHolidayError> {
  const encoded = input === undefined ? emptyOptions : input;

  const syntax = yield* decodeProphetOptionsSyntax(encoded).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("options", error.issue)),
  );

  // Each component without its own prior scale takes the global one, as in Python.
  const { seasonalityPriorScale, holidaysPriorScale } = syntax;

  const countryHolidays =
    syntax.countryHolidays === undefined
      ? undefined
      : yield* parseCountryHolidays(syntax.countryHolidays, holidaysPriorScale);

  const seasonalities = yield* parseSeasonalities(
    syntax.seasonalities,
    syntax.seasonalityMode,
    seasonalityPriorScale,
  ).pipe(Effect.mapError(optionsValidationErrorFromSeasonality));

  const holidaysMode = syntax.holidaysMode ?? syntax.seasonalityMode;

  const events = yield* parseEventCalendar(syntax.events, holidaysMode, holidaysPriorScale).pipe(
    Effect.mapError(optionsValidationErrorFromEvents),
  );

  // Python's add_regressor falls back to holidays_prior_scale, not seasonality_prior_scale.
  const { definitions: regressors, models: regressorModelSyntax } =
    yield* parseRegressorDefinitionsAndModels(
      syntax.regressors,
      syntax.seasonalityMode,
      holidaysPriorScale,
    ).pipe(Effect.mapError(optionsValidationErrorFromRegressors));

  yield* checkOptionFeatureNames(seasonalities, events, regressors);

  const builtInSeasonalities = resolveBuiltInSeasonalities(
    syntax.builtInSeasonalities,
    seasonalityPriorScale,
  );

  const optimizer =
    syntax.map?.optimizer === undefined
      ? undefined
      : yield* decodeLinearOptimizer(syntax.map.optimizer);

  const regressorModels = yield* parseRegressorModels(regressorModelSyntax, syntax.map);

  const warmStart = syntax.map?.warmStart === undefined ? {} : { warmStart: syntax.map.warmStart };

  const map =
    syntax.map === undefined
      ? defaultAutomaticMapOptions
      : freezeMapOptions({
          changepoints: syntax.map.changepoints ?? defaultAutomaticMapOptions.changepoints,
          changepointPriorScale:
            syntax.map.changepointPriorScale ?? defaultAutomaticMapOptions.changepointPriorScale,
          optimizer: optimizer ?? defaultAutomaticMapOptions.optimizer,
          ...warmStart,
        });

  const { optimizer: requestedOptimizer, ...flatChangepoints } = map;

  const flatMap: FlatMapOptions = Object.freeze(
    optimizer === undefined
      ? flatChangepoints
      : { ...flatChangepoints, optimizer: requestedOptimizer },
  );

  const scaling = syntax.scaling === undefined ? {} : { scaling: syntax.scaling };

  const calendarOptions: Pick<ParsedBuiltInOptions, "countryHolidays"> = {};

  if (countryHolidays !== undefined) {
    Object.assign(calendarOptions, { countryHolidays });
  }

  const resolvedModes = {
    ...calendarOptions,
    seasonalityMode: syntax.seasonalityMode,
    holidaysMode,
    seasonalityPriorScale,
    holidaysPriorScale,
  } as const;

  const firstSeasonality = seasonalities[0];

  if (syntax.growth === "logistic") {
    return {
      growth: "logistic",
      ...resolvedModes,
      seasonalities: Object.freeze(Array.from(seasonalities)),
      builtInSeasonalities,
      events,
      regressors,
      regressorModels,
      map,
      ...scaling,
    };
  }

  if (firstSeasonality === undefined) {
    if (syntax.growth === "flat") {
      return {
        growth: "flat",
        ...resolvedModes,
        seasonalities: emptySeasonalities,
        builtInSeasonalities,
        events,
        regressors,
        regressorModels,
        map: flatMap,
        ...scaling,
      };
    }

    return {
      growth: "linear",
      ...resolvedModes,
      seasonalities: emptySeasonalities,
      builtInSeasonalities,
      events,
      regressors,
      regressorModels,
      map,
      ...scaling,
    };
  }

  const nonEmptySeasonalities: readonly [
    SeasonalityDefinition,
    ...ReadonlyArray<SeasonalityDefinition>,
  ] = Object.freeze([firstSeasonality, ...seasonalities.slice(1)]);

  if (syntax.growth === "flat") {
    return {
      growth: "flat",
      ...resolvedModes,
      seasonalities: nonEmptySeasonalities,
      builtInSeasonalities,
      events,
      regressors,
      regressorModels,
      map: flatMap,
      ...scaling,
    };
  }

  return {
    growth: "linear",
    ...resolvedModes,
    seasonalities: nonEmptySeasonalities,
    builtInSeasonalities,
    events,
    regressors,
    regressorModels,
    map,
    ...scaling,
  };
});
