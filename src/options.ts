import { Effect, Predicate, Schema } from "effect";

import { ComponentModeSchema, type ComponentMode } from "./component-mode";
import { InputValidationError, inputValidationErrorFromIssue } from "./errors";
import {
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
import { TargetScalingModeSchema, type TargetScalingMode } from "./target-scaling";

/** Valid trend forms represented by the current public fitting configuration. */
export type Growth = "flat" | "linear" | "logistic";

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
  readonly seasonalityMode?: ComponentMode;
  readonly holidaysMode?: ComponentMode;
  readonly builtInSeasonalities?: EncodedBuiltInSeasonalities;
  readonly events?: ReadonlyArray<EncodedEventOccurrence>;
  readonly regressors?: ReadonlyArray<EncodedRegressorDefinition>;
  readonly scaling?: TargetScalingMode;
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

/** Check explicit MAP points against the inclusive range of the original observed history. */
export const checkExplicitChangepointBounds = (
  observations: Observations,
  options: ProphetOptions,
): Effect.Effect<void, InputValidationError> => {
  if (
    observations.length < 2 ||
    options.growth === "flat" ||
    options.map === undefined ||
    options.map.changepoints.mode !== "explicit"
  ) {
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

interface ParsedBuiltInOptions {
  readonly seasonalityMode: ComponentMode;
  readonly holidaysMode: ComponentMode;
  readonly builtInSeasonalities: BuiltInSeasonalities;
  readonly events: EventCalendar;
  readonly regressors: ReadonlyArray<RegressorDefinition>;
  readonly scaling?: TargetScalingMode;
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

/** Parsed logistic-growth MAP configuration. */
export interface LogisticOptions extends ParsedBuiltInOptions {
  readonly growth: "logistic";
  readonly seasonalities: ReadonlyArray<SeasonalityDefinition>;
  readonly map: MapOptions;
}

/** Validated and defaulted public fitting configuration awaiting fit-time resolution. */
export type ProphetOptions =
  | LinearTrendOptions
  | LinearAdditiveOptions
  | FlatTrendOptions
  | FlatAdditiveOptions
  | LogisticOptions;

/** Recognize the only known model configuration without MAP predictive simulation. */
export const isFeaturelessOls = (options: ProphetOptions): boolean =>
  options.growth === "linear" &&
  options.map === undefined &&
  options.scaling === undefined &&
  options.seasonalities.length === 0 &&
  options.events.layout.coefficientCount === 0 &&
  options.regressors.length === 0 &&
  options.builtInSeasonalities.yearly === "off" &&
  options.builtInSeasonalities.weekly === "off" &&
  options.builtInSeasonalities.daily === "off";

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

const defaultLogisticOptimizerControls: MapOptimizerControls = Object.freeze({
  maxIterations: 10_000,
  relativeTolerance: 1e-7,
  absoluteTolerance: 1e-9,
});

/**
 * Central defaults for public fitting configuration.
 *
 * Linear growth matches Prophet's default. Built-in seasonalities deliberately default to off;
 * callers opt into training-history-based resolution with `"auto"`.
 */
export const defaultProphetOptions: LinearTrendOptions = Object.freeze({
  growth: "linear",
  seasonalityMode: "additive",
  holidaysMode: "additive",
  seasonalities: emptySeasonalities,
  builtInSeasonalities: defaultBuiltInSeasonalities,
  events: emptyEventCalendar,
  regressors: emptyRegressors,
});

const GrowthSchema = Schema.Literals(["flat", "linear", "logistic"]);

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
  seasonalityMode: ComponentModeSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed("additive")),
  ),
  holidaysMode: Schema.optionalKey(ComponentModeSchema),
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

interface OptimizerControlPresence {
  readonly maxIterations: boolean;
  readonly relativeTolerance: boolean;
  readonly absoluteTolerance: boolean;
}

const logisticMapOptions = (
  options: MapOptions | undefined,
  supplied: OptimizerControlPresence,
): MapOptions => {
  const resolved = options ?? defaultAutomaticMapOptions;

  return Object.freeze({
    ...resolved,
    optimizer: Object.freeze({
      maxIterations: supplied.maxIterations
        ? resolved.optimizer.maxIterations
        : defaultLogisticOptimizerControls.maxIterations,
      relativeTolerance: supplied.relativeTolerance
        ? resolved.optimizer.relativeTolerance
        : defaultLogisticOptimizerControls.relativeTolerance,
      absoluteTolerance: supplied.absoluteTolerance
        ? resolved.optimizer.absoluteTolerance
        : defaultLogisticOptimizerControls.absoluteTolerance,
    }),
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

  const encodedMap =
    Predicate.isObjectKeyword(encoded) && Predicate.hasProperty(encoded, "map")
      ? encoded.map
      : undefined;

  const encodedOptimizer =
    Predicate.isObjectKeyword(encodedMap) && Predicate.hasProperty(encodedMap, "optimizer")
      ? encodedMap.optimizer
      : undefined;

  const optimizerControlPresence: OptimizerControlPresence = {
    maxIterations:
      Predicate.isObjectKeyword(encodedOptimizer) &&
      Predicate.hasProperty(encodedOptimizer, "maxIterations"),
    relativeTolerance:
      Predicate.isObjectKeyword(encodedOptimizer) &&
      Predicate.hasProperty(encodedOptimizer, "relativeTolerance"),
    absoluteTolerance:
      Predicate.isObjectKeyword(encodedOptimizer) &&
      Predicate.hasProperty(encodedOptimizer, "absoluteTolerance"),
  };

  const seasonalities = yield* parseSeasonalities(
    syntax.seasonalities,
    syntax.seasonalityMode,
  ).pipe(Effect.mapError(optionsValidationErrorFromSeasonality));

  const holidaysMode = syntax.holidaysMode ?? syntax.seasonalityMode;

  const events = yield* parseEventCalendar(syntax.events, holidaysMode).pipe(
    Effect.mapError(optionsValidationErrorFromEvents),
  );

  const regressors = yield* parseRegressorDefinitions(
    syntax.regressors,
    syntax.seasonalityMode,
  ).pipe(Effect.mapError(optionsValidationErrorFromRegressors));

  const seasonalityNames = new Set(seasonalities.map((seasonality) => seasonality.name));
  const conditionNames = new Set<string>();

  for (const [index, seasonality] of seasonalities.entries()) {
    const conditionName = seasonality.conditionName;

    if (conditionName === undefined) {
      continue;
    }

    if (seasonalityNames.has(conditionName)) {
      return yield* Effect.fail(
        new InputValidationError({
          input: "options",
          issues: [
            {
              path: ["seasonalities", index, "conditionName"],
              message: `Condition name '${conditionName}' collides with a seasonality`,
            },
          ],
          message: "Condition and seasonality names must be distinct",
        }),
      );
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
      return yield* Effect.fail(
        new InputValidationError({
          input: "options",
          issues: [
            {
              path: ["events", index, "name"],
              message: `Feature name '${occurrence.name}' collides with ${collision}`,
            },
          ],
          message: "Event names must be globally distinct",
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
        : conditionNames.has(regressor.name)
          ? "a condition"
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
  const scaling = syntax.scaling === undefined ? {} : { scaling: syntax.scaling };

  const resolvedModes = {
    seasonalityMode: syntax.seasonalityMode,
    holidaysMode,
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
      map: logisticMapOptions(map, optimizerControlPresence),
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
        ...scaling,
      };
    }

    return map === undefined
      ? {
          growth: "linear",
          ...resolvedModes,
          seasonalities: emptySeasonalities,
          builtInSeasonalities,
          events,
          regressors,
          ...scaling,
        }
      : {
          growth: "linear",
          ...resolvedModes,
          seasonalities: emptySeasonalities,
          builtInSeasonalities,
          events,
          regressors,
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
      ...scaling,
    };
  }

  return map === undefined
    ? {
        growth: "linear",
        ...resolvedModes,
        seasonalities: nonEmptySeasonalities,
        builtInSeasonalities,
        events,
        regressors,
        ...scaling,
      }
    : {
        growth: "linear",
        ...resolvedModes,
        seasonalities: nonEmptySeasonalities,
        builtInSeasonalities,
        events,
        regressors,
        map,
        ...scaling,
      };
});
