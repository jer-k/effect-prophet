import { Effect, Schema, type SchemaIssue } from "effect";

import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";
import { SeasonalityLayoutSchema } from "./seasonality";

const PositiveFinite = Schema.Finite.check(Schema.isGreaterThan(0));

const LinearModel = Schema.Literal("linear-trend");

const ConstantModel = Schema.Literal("constant-mean-baseline");

const LinearAdditiveModel = Schema.Literal("linear-additive-ridge");

const FlatMapModel = Schema.Literal("flat-map");

const ModelDiscriminantSchema = Schema.Struct({
  model: Schema.Union([LinearModel, LinearAdditiveModel, FlatMapModel]),
});

const LinearParametersSchema = Schema.Struct({
  model: LinearModel,
  intercept: Schema.Finite,
  slope: Schema.Finite,
  timeOrigin: Schema.Finite,
  timeScale: PositiveFinite,
});

const ConstantParametersSchema = Schema.Struct({
  model: ConstantModel,
  level: Schema.Finite,
});

const LinearAdditiveFitSummarySchema = Schema.Struct({
  method: Schema.Literal("normalized-ridge-v1"),
  valueScale: PositiveFinite,
  observationCount: Schema.Int.check(Schema.isGreaterThanOrEqualTo(2)),
  numericalRank: Schema.Natural,
  normalizedResidualSumSquares: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
  penalizedObjective: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
});

const LinearAdditiveParametersFieldsSchema = Schema.Struct({
  model: LinearAdditiveModel,
  intercept: Schema.Finite,
  slope: Schema.Finite,
  timeOrigin: Schema.Finite,
  timeScale: PositiveFinite,
  seasonalities: SeasonalityLayoutSchema,
  coefficients: Schema.Array(Schema.Finite),
  fitSummary: LinearAdditiveFitSummarySchema,
});

type LinearAdditiveParametersFields = typeof LinearAdditiveParametersFieldsSchema.Type;

const consistentLinearAdditiveParameters = Schema.makeFilter<LinearAdditiveParametersFields>(
  (parameters) => {
    const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];
    const coefficientCount = parameters.seasonalities.coefficientCount;

    if (parameters.coefficients.length !== coefficientCount) {
      issues.push({
        path: ["coefficients"],
        issue: `Expected exactly ${coefficientCount} seasonal coefficients`,
      });
    }

    if (coefficientCount > Number.MAX_SAFE_INTEGER - 2) {
      issues.push({
        path: ["seasonalities", "coefficientCount"],
        issue: "Fitted design column count exceeds safe integer arithmetic",
      });

      return issues;
    }

    const designColumnCount = coefficientCount + 2;

    if (parameters.fitSummary.numericalRank !== designColumnCount) {
      issues.push({
        path: ["fitSummary", "numericalRank"],
        issue: `Expected full fitted design rank ${designColumnCount}`,
      });
    }

    return issues;
  },
);

const LinearAdditiveParametersSchema = LinearAdditiveParametersFieldsSchema.check(
  consistentLinearAdditiveParameters,
);

const FlatMapFitSummarySchema = Schema.Struct({
  method: Schema.Literal("flat-map-coordinate-v1"),
  termination: Schema.Literals(["converged", "constant-target-shortcut"]),
  valueScale: PositiveFinite,
  observationCount: Schema.Int.check(Schema.isGreaterThanOrEqualTo(2)),
  iterations: Schema.Natural,
  objective: Schema.Finite,
  stationarityResidual: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
});

const FlatMapParametersFieldsSchema = Schema.Struct({
  model: FlatMapModel,
  level: Schema.Finite,
  seasonalities: SeasonalityLayoutSchema,
  coefficients: Schema.Array(Schema.Finite),
  noiseScale: PositiveFinite,
  fitSummary: FlatMapFitSummarySchema,
});

type FlatMapParametersFields = typeof FlatMapParametersFieldsSchema.Type;

const consistentFlatMapParameters = Schema.makeFilter<FlatMapParametersFields>((parameters) => {
  const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];

  if (parameters.coefficients.length !== parameters.seasonalities.coefficientCount) {
    issues.push({
      path: ["coefficients"],
      issue: `Expected exactly ${parameters.seasonalities.coefficientCount} seasonal coefficients`,
    });
  }

  if (
    parameters.fitSummary.termination === "constant-target-shortcut" &&
    parameters.fitSummary.iterations !== 0
  ) {
    issues.push({
      path: ["fitSummary", "iterations"],
      issue: "Expected zero iterations for the constant-target shortcut",
    });
  }

  return issues;
});

const FlatMapParametersSchema = FlatMapParametersFieldsSchema.check(consistentFlatMapParameters);

const ParametersSchema = Schema.Union([
  LinearParametersSchema,
  LinearAdditiveParametersSchema,
  FlatMapParametersSchema,
]);

const FittedLinearProphetSchema = LinearParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedLinearProphet"),
);

const FittedLinearAdditiveProphetSchema = LinearAdditiveParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedLinearAdditiveProphet"),
);

const FittedFlatMapProphetSchema = FlatMapParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedFlatMapProphet"),
);

const FittedProphetSchema = Schema.Union([
  FittedLinearProphetSchema,
  FittedLinearAdditiveProphetSchema,
  FittedFlatMapProphetSchema,
]);

/** Untrusted parameters returned by a linear-trend fitting backend. */
export type LinearParameters = typeof LinearParametersSchema.Type;

/** Untrusted parameters returned by the constant-mean example backend. */
export type ConstantParameters = typeof ConstantParametersSchema.Type;

/** Untrusted fitted parameters returned by a fitting backend. */
export type Parameters = typeof ParametersSchema.Type;

/** Complete, untrusted fitted state for a linear-plus-additive-seasonal ridge model. */
export type LinearAdditiveParameters = typeof LinearAdditiveParametersSchema.Type;

/** Complete, untrusted fitted state for a reduced flat MAP model. */
export type FlatMapParameters = typeof FlatMapParametersSchema.Type;

/** A parsed ordinary least-squares linear-trend model. */
export type FittedLinearProphet = typeof FittedLinearProphetSchema.Type;

/** A trusted, deeply immutable linear-plus-additive-seasonal ridge model. */
export type FittedLinearAdditiveProphet = typeof FittedLinearAdditiveProphetSchema.Type;

/** A trusted, deeply immutable reduced flat MAP model. */
export type FittedFlatMapProphet = typeof FittedFlatMapProphetSchema.Type;

/** A parsed fitted model accepted by the public prediction operation. */
export type FittedProphet = typeof FittedProphetSchema.Type;

/** An internal failure to establish the fitted-model invariants. */
export class InvalidFittedModel extends Schema.TaggedError<InvalidFittedModel>()(
  "InvalidFittedModel",
  {
    issues: Schema.Array(ValidationIssueSchema),
    message: Schema.String,
  },
) {}

const invalidFittedModelFromIssue = (issue: SchemaIssue.Issue): InvalidFittedModel =>
  new InvalidFittedModel({
    issues: validationIssuesFromIssue(issue),
    message: validationMessageFromIssue(issue),
  });

const decodeModelDiscriminant = Schema.decodeUnknownEffect(ModelDiscriminantSchema, {
  errors: "all",
});

const decodeLinearModel = Schema.decodeUnknownEffect(FittedLinearProphetSchema, {
  errors: "all",
});

const decodeLinearAdditiveModel = Schema.decodeUnknownEffect(FittedLinearAdditiveProphetSchema, {
  errors: "all",
});

const decodeFlatMapModel = Schema.decodeUnknownEffect(FittedFlatMapProphetSchema, {
  errors: "all",
});

const decodeFittedModel = Schema.decodeUnknownEffect(FittedProphetSchema, {
  errors: "all",
});

const freezeLinearModel = (model: FittedLinearProphet): FittedLinearProphet => Object.freeze(model);

const freezeFeatureModel = <Model extends FittedLinearAdditiveProphet | FittedFlatMapProphet>(
  model: Model,
): Model => {
  for (const component of model.seasonalities.components) {
    Object.freeze(component.definition);
    Object.freeze(component);
  }

  Object.freeze(model.seasonalities.components);
  Object.freeze(model.seasonalities);
  Object.freeze(model.coefficients);
  Object.freeze(model.fitSummary);

  return Object.freeze(model);
};

const freezeFittedModel = (model: FittedProphet): FittedProphet => {
  if (model.model === "linear-additive-ridge" || model.model === "flat-map") {
    return freezeFeatureModel(model);
  }

  return Object.freeze(model);
};

type FirstArgument<Function> = Function extends (
  input: infer Input,
  ...rest: infer _Rest
) => infer _Output
  ? Input
  : never;

/**
 * Parse untrusted linear parameters into a fresh, frozen fitted model.
 *
 * @param input - Values at a fitting, prediction, or serialization trust boundary.
 * @returns A trusted linear model or structured fitted-model issues.
 */
export const parseLinearModel = (
  input: FirstArgument<typeof decodeLinearModel>,
): Effect.Effect<FittedLinearProphet, InvalidFittedModel> =>
  decodeLinearModel(input).pipe(
    Effect.map(freezeLinearModel),
    Effect.mapError((error) => invalidFittedModelFromIssue(error.issue)),
  );

/**
 * Parse complete additive ridge state into a fresh, deeply frozen fitted model.
 *
 * @param input - Values at a fitting or future serialization trust boundary.
 * @returns A trusted additive model or structured fitted-model issues.
 */
export const parseLinearAdditiveModel = (
  input: FirstArgument<typeof decodeLinearAdditiveModel>,
): Effect.Effect<FittedLinearAdditiveProphet, InvalidFittedModel> =>
  decodeLinearAdditiveModel(input).pipe(
    Effect.map(freezeFeatureModel),
    Effect.mapError((error) => invalidFittedModelFromIssue(error.issue)),
  );

/**
 * Parse complete flat MAP state into a fresh, deeply frozen fitted model.
 *
 * @param input - Values at a fitting or serialization trust boundary.
 * @returns A trusted flat MAP model or structured fitted-model issues.
 */
export const parseFlatMapModel = (
  input: FirstArgument<typeof decodeFlatMapModel>,
): Effect.Effect<FittedFlatMapProphet, InvalidFittedModel> =>
  decodeFlatMapModel(input).pipe(
    Effect.map(freezeFeatureModel),
    Effect.mapError((error) => invalidFittedModelFromIssue(error.issue)),
  );

/**
 * Parse untrusted parameters into a fresh, frozen fitted-model union.
 *
 * @param input - Values at a fitting, prediction, or serialization trust boundary.
 * @returns A trusted fitted model or structured fitted-model issues.
 */
export const parseFittedModel = (
  input: FirstArgument<typeof decodeFittedModel>,
): Effect.Effect<FittedProphet, InvalidFittedModel> =>
  decodeModelDiscriminant(input).pipe(
    Effect.flatMap(() => decodeFittedModel(input)),
    Effect.map(freezeFittedModel),
    Effect.mapError((error) => invalidFittedModelFromIssue(error.issue)),
  );
