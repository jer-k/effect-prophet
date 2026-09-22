import { Effect, Schema, type SchemaIssue } from "effect";

import { ComponentModeSchema, type ComponentMode } from "./component-mode";
import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";
import { FeatureNameSchema, type FeatureName } from "./feature-name";
import { PositiveFinite } from "./internal/numeric-schemas";

/** Public control for fitting-time regressor standardization. */
export type EncodedRegressorStandardization = "auto" | "always" | "never";

/** One additive regressor definition accepted by public fit options. */
export interface EncodedRegressorDefinition {
  readonly name: string;
  readonly priorScale?: number;
  readonly standardization?: EncodedRegressorStandardization;
  readonly mode?: ComponentMode;
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

const EncodedRegressorDefinitionSchema = Schema.Struct({
  name: FeatureNameSchema,
  priorScale: PositiveFinite.pipe(Schema.withDecodingDefaultKey(Effect.succeed(10))),
  standardization: RegressorStandardizationSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed("auto")),
  ),
  mode: Schema.optionalKey(ComponentModeSchema),
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

/** Parse ordered additive regressor definitions and apply defaults. */
export const parseRegressorDefinitions = Effect.fn("parseRegressorDefinitions")(function* (
  input: Parameters<typeof decodeRegressorDefinitions>[0],
  inheritedMode: ComponentMode = "additive",
): Effect.fn.Return<ReadonlyArray<RegressorDefinition>, InvalidRegressors> {
  const definitions = yield* decodeRegressorDefinitions(input).pipe(
    Effect.mapError((error) => invalidFromIssue(error.issue)),
  );

  return Object.freeze(
    definitions.map((definition) =>
      Object.freeze({ ...definition, mode: definition.mode ?? inheritedMode }),
    ),
  );
});

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
