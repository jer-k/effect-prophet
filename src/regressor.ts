import { Effect, Schema, type SchemaIssue } from "effect";

import { ComponentModeSchema, type ComponentMode } from "./component-mode";
import type { EncodedEventOccurrence } from "./event";
import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";
import { FeatureNameSchema, type FeatureName } from "./feature-name";
import { defaultEventPriorScale } from "./event";
import { PositiveFinite } from "./internal/numeric-schemas";
import type { EncodedBuiltInSeasonalities, EncodedChangepointSetting } from "./options";
import type { TargetScalingMode } from "./target-scaling";

/** Public control for fitting-time regressor standardization. */
export type EncodedRegressorStandardization = "auto" | "always" | "never";

/**
 * Options for the model that forecasts one regressor, like the keyword arguments of Python's
 * `regressor_predictor`, which go to the `Prophet` constructor.
 *
 * Only constructor settings are accepted. Custom seasonalities, regressors and country holidays
 * are added after construction in Python, so a regressor model cannot have them, and logistic
 * growth would need a capacity no future row supplies. The main model's `map.optimizer` and
 * `map.warmStart`, when set, apply to the regressor model too, as Python passes its fit arguments
 * on.
 */
export interface EncodedRegressorModelOptions {
  readonly growth?: "linear" | "flat";
  readonly seasonalityMode?: ComponentMode;
  readonly holidaysMode?: ComponentMode;
  readonly seasonalityPriorScale?: number;
  readonly holidaysPriorScale?: number;
  readonly builtInSeasonalities?: EncodedBuiltInSeasonalities;
  readonly events?: ReadonlyArray<EncodedEventOccurrence>;
  readonly scaling?: TargetScalingMode;
  readonly map?: {
    readonly changepoints?: EncodedChangepointSetting;
    readonly changepointPriorScale?: number;
  };
}

/** One additive regressor definition accepted by public fit options. */
export interface EncodedRegressorDefinition {
  readonly name: string;
  readonly priorScale?: number;
  readonly standardization?: EncodedRegressorStandardization;
  readonly mode?: ComponentMode;

  /**
   * Forecast this regressor with its own model, like Python's `regressor_predictor`. `true` uses
   * the default options. The model is fitted to the regressor's training values, and its point
   * forecast replaces the regressor's value in every row after the training history.
   */
  readonly predictor?: true | EncodedRegressorModelOptions;
}

/** One parsed and fully defaulted additive regressor definition. */
export interface RegressorDefinition {
  readonly name: FeatureName;
  readonly priorScale: number;
  readonly standardization: EncodedRegressorStandardization;
  readonly mode: ComponentMode;
}

/** Training-derived transformation applied to one regressor. */
export type RegressorTransform =
  | {
      readonly mode: "identity";
      readonly reason: "disabled" | "binary" | "constant";
    }
  | {
      readonly mode: "standardized";
      readonly mean: number;
      readonly sampleStandardDeviation: number;
    };

/** Training-derived metadata needed to transform future regressor values. */
export interface ResolvedRegressor {
  readonly definition: RegressorDefinition;
  readonly transform: RegressorTransform;
}

/** Persisted regressor metadata and its transformed-feature coefficient. */
export interface FittedRegressor extends ResolvedRegressor {
  readonly coefficient: number;
}

/** A fitted coefficient expressed in the original regressor's units. */
export type RegressorCoefficient =
  | {
      readonly name: string;
      readonly mode: "additive";
      readonly coefficient: number;
      readonly center: number;
    }
  | {
      readonly name: string;
      readonly mode: "multiplicative";
      readonly coefficient: number;
      readonly center: number;
    };

/** A structured failure to parse or construct regressor metadata. */
export class InvalidRegressors extends Schema.TaggedError<InvalidRegressors>()(
  "InvalidRegressors",
  {
    issues: Schema.Array(ValidationIssueSchema),
    message: Schema.String,
  },
) {}

const RegressorStandardizationSchema = Schema.Literals(["auto", "always", "never"]);

/** Runtime schema for a parsed additive regressor definition. */
export const RegressorDefinitionSchema = Schema.Struct({
  name: FeatureNameSchema,
  priorScale: PositiveFinite,
  standardization: RegressorStandardizationSchema,
  mode: ComponentModeSchema.pipe(Schema.withDecodingDefaultKey(Effect.succeed("additive"))),
});

/** Runtime schema for a training-derived regressor transformation. */
export const RegressorTransformSchema = Schema.Union([
  Schema.Struct({
    mode: Schema.Literal("identity"),
    reason: Schema.Literals(["disabled", "binary", "constant"]),
  }),
  Schema.Struct({
    mode: Schema.Literal("standardized"),
    mean: Schema.Finite,
    sampleStandardDeviation: PositiveFinite,
  }),
]);

const ResolvedRegressorFieldsSchema = Schema.Struct({
  definition: RegressorDefinitionSchema,
  transform: RegressorTransformSchema,
});

const resolvedTransformConsistencyIssue = (
  regressor: typeof ResolvedRegressorFieldsSchema.Type,
) => {
  const { standardization } = regressor.definition;
  const { transform } = regressor;

  let consistent: boolean;

  switch (standardization) {
    case "never":
      consistent = transform.mode === "identity" && transform.reason === "disabled";
      break;

    case "always":
      consistent =
        transform.mode === "standardized" ||
        (transform.mode === "identity" && transform.reason === "constant");
      break;

    case "auto":
      consistent =
        transform.mode === "standardized" ||
        (transform.mode === "identity" &&
          (transform.reason === "binary" || transform.reason === "constant"));
      break;
  }

  if (!consistent) {
    return {
      path: ["transform"],
      issue: "Stored regressor transform is inconsistent with its standardization control",
    };
  }
};

const consistentResolvedTransform = Schema.makeFilter<typeof ResolvedRegressorFieldsSchema.Type>(
  resolvedTransformConsistencyIssue,
);

/** Runtime schema for resolved regressor metadata without a fitted coefficient. */
export const ResolvedRegressorSchema = ResolvedRegressorFieldsSchema.check(
  consistentResolvedTransform,
);

const FittedRegressorFieldsSchema = Schema.Struct({
  definition: RegressorDefinitionSchema,
  transform: RegressorTransformSchema,
  coefficient: Schema.Finite,
});

const consistentFittedTransform = Schema.makeFilter<typeof FittedRegressorFieldsSchema.Type>(
  resolvedTransformConsistencyIssue,
);

const finiteOriginalUnitProjection = Schema.makeFilter<typeof FittedRegressorFieldsSchema.Type>(
  (regressor) => {
    const coefficient =
      regressor.transform.mode === "standardized"
        ? regressor.coefficient / regressor.transform.sampleStandardDeviation
        : regressor.coefficient;

    if (!Number.isFinite(coefficient)) {
      return {
        path: ["coefficient"],
        issue: "Regressor coefficient cannot be represented in original units",
      };
    }
  },
);

/** Runtime schema for complete persisted fitted-regressor metadata. */
export const FittedRegressorSchema = FittedRegressorFieldsSchema.check(
  consistentFittedTransform,
  finiteOriginalUnitProjection,
);

// Only the keys are checked here; the options decoder validates their values.
const RegressorModelOptionsSyntaxSchema = Schema.Struct({
  growth: Schema.optionalKey(Schema.Literals(["linear", "flat"])),
  seasonalityMode: Schema.optionalKey(Schema.Unknown),
  holidaysMode: Schema.optionalKey(Schema.Unknown),
  seasonalityPriorScale: Schema.optionalKey(Schema.Unknown),
  holidaysPriorScale: Schema.optionalKey(Schema.Unknown),
  builtInSeasonalities: Schema.optionalKey(Schema.Unknown),
  events: Schema.optionalKey(Schema.Unknown),
  scaling: Schema.optionalKey(Schema.Unknown),
  map: Schema.optionalKey(
    Schema.Struct({
      changepoints: Schema.optionalKey(Schema.Unknown),
      changepointPriorScale: Schema.optionalKey(Schema.Unknown),
    }),
  ),
});

const EncodedRegressorDefinitionSchema = Schema.Struct({
  name: FeatureNameSchema,
  priorScale: Schema.optionalKey(PositiveFinite),
  standardization: RegressorStandardizationSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed("auto")),
  ),
  mode: Schema.optionalKey(ComponentModeSchema),
  predictor: Schema.optionalKey(
    Schema.Union([Schema.Literal(true), RegressorModelOptionsSyntaxSchema]),
  ),
});

const uniqueRegressorNames = Schema.makeFilter<ReadonlyArray<{ readonly name: string }>>(
  (definitions) => {
    const names = new Set<string>();

    for (const [index, definition] of definitions.entries()) {
      if (names.has(definition.name)) {
        return {
          path: [index, "name"],
          issue: `Regressor name '${definition.name}' is duplicated`,
        };
      }

      names.add(definition.name);
    }
  },
);

const RegressorDefinitionsSchema = Schema.Array(EncodedRegressorDefinitionSchema).check(
  uniqueRegressorNames,
);

const decodeRegressorDefinitions = Schema.decodeUnknownEffect(RegressorDefinitionsSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const invalidFromIssue = (issue: SchemaIssue.Issue): InvalidRegressors =>
  new InvalidRegressors({
    issues: validationIssuesFromIssue(issue),
    message: validationMessageFromIssue(issue),
  });

/** A regressor to forecast with its own model, with that model's options still unchecked. */
export interface RegressorModelSyntax {
  readonly index: number;
  readonly name: FeatureName;
  readonly options: typeof RegressorModelOptionsSyntaxSchema.Type;
}

const parseDefinitionsAndModels = Effect.fnUntraced(function* (
  input: Parameters<typeof decodeRegressorDefinitions>[0],
  inheritedMode: ComponentMode,
  defaultPriorScale: number,
): Effect.fn.Return<
  {
    readonly definitions: ReadonlyArray<RegressorDefinition>;
    readonly models: ReadonlyArray<RegressorModelSyntax>;
  },
  InvalidRegressors
> {
  const decoded = yield* decodeRegressorDefinitions(input).pipe(
    Effect.mapError((error) => invalidFromIssue(error.issue)),
  );

  const definitions = Object.freeze(
    decoded.map(({ predictor: _predictor, ...definition }) =>
      Object.freeze({
        ...definition,
        priorScale: definition.priorScale ?? defaultPriorScale,
        mode: definition.mode ?? inheritedMode,
      }),
    ),
  );

  const models = decoded.flatMap(({ name, predictor }, index) =>
    predictor === undefined ? [] : [{ index, name, options: predictor === true ? {} : predictor }],
  );

  return { definitions, models: Object.freeze(models) };
});

/**
 * Parse ordered additive regressor definitions and apply defaults.
 *
 * A definition without `priorScale` takes `defaultPriorScale`. Python's `add_regressor` takes the
 * model's `holidays_prior_scale`, so fit options pass `holidaysPriorScale` here. A `predictor` is
 * checked for unsupported keys but not returned; fit options validate and keep it.
 */
export const parseRegressorDefinitions = Effect.fn("Prophet.parseRegressorDefinitions")(function* (
  input: Parameters<typeof decodeRegressorDefinitions>[0],
  inheritedMode: ComponentMode = "additive",
  defaultPriorScale: number = defaultEventPriorScale,
): Effect.fn.Return<ReadonlyArray<RegressorDefinition>, InvalidRegressors> {
  const { definitions } = yield* parseDefinitionsAndModels(input, inheritedMode, defaultPriorScale);

  return definitions;
});

/** Parse definitions as `parseRegressorDefinitions` does, with the regressor models they request. */
export const parseRegressorDefinitionsAndModels = Effect.fn("Prophet.parseRegressorDefinitions")(
  parseDefinitionsAndModels,
);

/** Project a fitted transformed-feature coefficient into original regressor units. */
export const projectRegressorCoefficient = (regressor: FittedRegressor): RegressorCoefficient =>
  regressor.transform.mode === "standardized"
    ? Object.freeze({
        name: regressor.definition.name,
        mode: regressor.definition.mode,
        coefficient: regressor.coefficient / regressor.transform.sampleStandardDeviation,
        center: regressor.transform.mean,
      })
    : Object.freeze({
        name: regressor.definition.name,
        mode: regressor.definition.mode,
        coefficient: regressor.coefficient,
        center: 0,
      });
