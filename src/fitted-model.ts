import { Effect, Schema, type SchemaIssue } from "effect";

import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";

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

const ParametersSchema = Schema.Union([LinearParametersSchema, ConstantParametersSchema]);

const FittedLinearProphetSchema = LinearParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedLinearProphet"),
);

const FittedConstantProphetSchema = ConstantParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedConstantProphet"),
);

const FittedProphetSchema = Schema.Union([FittedLinearProphetSchema, FittedConstantProphetSchema]);

/** Untrusted parameters returned by a linear-trend fitting backend. */
export type LinearParameters = typeof LinearParametersSchema.Type;

/** Untrusted parameters returned by the constant-mean example backend. */
export type ConstantParameters = typeof ConstantParametersSchema.Type;

/** Untrusted fitted parameters returned by a fitting backend. */
export type Parameters = typeof ParametersSchema.Type;

/** A parsed ordinary least-squares linear-trend model. */
export type FittedLinearProphet = typeof FittedLinearProphetSchema.Type;

/** A parsed model from the explicitly named constant-mean example backend. */
export type FittedConstantProphet = typeof FittedConstantProphetSchema.Type;

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

const decodeFittedModel = Schema.decodeUnknownEffect(FittedProphetSchema, {
  errors: "all",
});

const freezeLinearModel = (model: FittedLinearProphet): FittedLinearProphet => Object.freeze(model);

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
