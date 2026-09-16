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

const ModelDiscriminantSchema = Schema.Struct({
  model: Schema.Union([LinearModel, ConstantModel]),
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
  model: Schema.Literal("linear-additive-ridge"),
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

const ParametersSchema = Schema.Union([LinearParametersSchema, ConstantParametersSchema]);

const FittedLinearProphetSchema = LinearParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedLinearProphet"),
);

const FittedConstantProphetSchema = ConstantParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedConstantProphet"),
);

const FittedLinearAdditiveProphetSchema = LinearAdditiveParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedLinearAdditiveProphet"),
);

const FittedProphetSchema = Schema.Union([FittedLinearProphetSchema, FittedConstantProphetSchema]);

/** Untrusted parameters returned by a linear-trend fitting backend. */
export type LinearParameters = typeof LinearParametersSchema.Type;

/** Untrusted parameters returned by the constant-mean example backend. */
export type ConstantParameters = typeof ConstantParametersSchema.Type;

/** Untrusted fitted parameters returned by a fitting backend. */
export type Parameters = typeof ParametersSchema.Type;

/** Complete, untrusted fitted state for a linear-plus-additive-seasonal ridge model. */
export type LinearAdditiveParameters = typeof LinearAdditiveParametersSchema.Type;

/** A parsed ordinary least-squares linear-trend model. */
export type FittedLinearProphet = typeof FittedLinearProphetSchema.Type;

/** A parsed model from the explicitly named constant-mean example backend. */
export type FittedConstantProphet = typeof FittedConstantProphetSchema.Type;

/** A trusted, deeply immutable linear-plus-additive-seasonal ridge model. */
export type FittedLinearAdditiveProphet = typeof FittedLinearAdditiveProphetSchema.Type;

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

const decodeFittedModel = Schema.decodeUnknownEffect(FittedProphetSchema, {
  errors: "all",
});

const freezeLinearModel = (model: FittedLinearProphet): FittedLinearProphet => Object.freeze(model);

const freezeLinearAdditiveModel = (
  model: FittedLinearAdditiveProphet,
): FittedLinearAdditiveProphet => {
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

const freezeFittedModel = (model: FittedProphet): FittedProphet => Object.freeze(model);

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
 * This standalone parser does not add the model family to the public prediction union.
 *
 * @param input - Values at a fitting or future serialization trust boundary.
 * @returns A trusted additive model or structured fitted-model issues.
 */
export const parseLinearAdditiveModel = (
  input: FirstArgument<typeof decodeLinearAdditiveModel>,
): Effect.Effect<FittedLinearAdditiveProphet, InvalidFittedModel> =>
  decodeLinearAdditiveModel(input).pipe(
    Effect.map(freezeLinearAdditiveModel),
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
