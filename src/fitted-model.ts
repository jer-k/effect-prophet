import { Effect, Schema, type SchemaIssue } from "effect";

import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";
import { EventCalendarSchema, emptyEventCalendar } from "./event";
import { FittedRegressorSchema } from "./regressor";
import { SeasonalityLayoutSchema } from "./seasonality";

const PositiveFinite = Schema.Finite.check(Schema.isGreaterThan(0));

const LinearModel = Schema.Literal("linear-trend");

const FlatMapModel = Schema.Literal("flat-map");

const PiecewiseMapModel = Schema.Literal("linear-piecewise-map");

const ModelDiscriminantSchema = Schema.Struct({
  model: Schema.Union([LinearModel, FlatMapModel, PiecewiseMapModel]),
});

const LinearParametersSchema = Schema.Struct({
  model: LinearModel,
  intercept: Schema.Finite,
  slope: Schema.Finite,
  timeOrigin: Schema.Finite,
  timeScale: PositiveFinite,
});

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

const PiecewiseMapFitSummarySchema = Schema.Struct({
  method: Schema.Literal("piecewise-map-coordinate-v1"),
  termination: Schema.Literals(["converged", "constant-target-shortcut"]),
  valueScale: PositiveFinite,
  observationCount: Schema.Int.check(Schema.isGreaterThanOrEqualTo(2)),
  iterations: Schema.Natural,
  objective: Schema.Finite,
  stationarityResidual: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
  changepointPriorScale: PositiveFinite,
});

const PiecewiseMapParametersFieldsSchema = Schema.Struct({
  model: PiecewiseMapModel,
  intercept: Schema.Finite,
  slope: Schema.Finite,
  timeOrigin: Schema.Int,
  timeScale: Schema.Int.check(Schema.isGreaterThan(0)),
  changepointTimestamps: Schema.Array(Schema.Int),
  deltas: Schema.Array(Schema.Finite),
  seasonalities: SeasonalityLayoutSchema,
  coefficients: Schema.Array(Schema.Finite),
  events: EventCalendarSchema.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed(emptyEventCalendar)),
  ),
  eventCoefficients: Schema.Array(Schema.Finite).pipe(
    Schema.withDecodingDefaultKey(Effect.succeed([])),
  ),
  regressors: Schema.Array(FittedRegressorSchema).pipe(
    Schema.withDecodingDefaultKey(Effect.succeed([])),
  ),
  noiseScale: PositiveFinite,
  fitSummary: PiecewiseMapFitSummarySchema,
});

type PiecewiseMapParametersFields = typeof PiecewiseMapParametersFieldsSchema.Type;

const consistentPiecewiseMapParameters = Schema.makeFilter<PiecewiseMapParametersFields>(
  (parameters) => {
    const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];

    if (parameters.changepointTimestamps.length !== parameters.deltas.length) {
      issues.push({
        path: ["deltas"],
        issue: "Changepoint timestamps and deltas must align",
      });
    }

    if (parameters.coefficients.length !== parameters.seasonalities.coefficientCount) {
      issues.push({
        path: ["coefficients"],
        issue: `Expected exactly ${parameters.seasonalities.coefficientCount} seasonal coefficients`,
      });
    }

    if (parameters.eventCoefficients.length !== parameters.events.layout.coefficientCount) {
      issues.push({
        path: ["eventCoefficients"],
        issue: `Expected exactly ${parameters.events.layout.coefficientCount} event coefficients`,
      });
    }

    const featureNames = new Set(
      parameters.seasonalities.components.map((component) => component.definition.name),
    );

    for (const [index, component] of parameters.events.layout.components.entries()) {
      if (featureNames.has(component.name)) {
        issues.push({
          path: ["events", "layout", "components", index, "name"],
          issue: "Fitted event names must be distinct from seasonality names",
        });
      }

      featureNames.add(component.name);
    }

    for (const [index, regressor] of parameters.regressors.entries()) {
      if (featureNames.has(regressor.definition.name)) {
        issues.push({
          path: ["regressors", index, "definition", "name"],
          issue: "Fitted regressor names must be globally distinct",
        });
      }

      featureNames.add(regressor.definition.name);
    }

    const end = parameters.timeOrigin + parameters.timeScale;

    if (
      !Number.isSafeInteger(parameters.timeOrigin) ||
      !Number.isSafeInteger(parameters.timeScale) ||
      !Number.isSafeInteger(end)
    ) {
      issues.push({
        path: ["timeScale"],
        issue: "Training time bounds must remain inside safe integer arithmetic",
      });
    }

    for (const [index, changepoint] of parameters.changepointTimestamps.entries()) {
      const previous = parameters.changepointTimestamps[index - 1];

      if (
        !Number.isSafeInteger(changepoint) ||
        changepoint < parameters.timeOrigin ||
        changepoint > end ||
        (previous !== undefined && changepoint <= previous)
      ) {
        issues.push({
          path: ["changepointTimestamps", index],
          issue: "Changepoints must be safe, strictly increasing timestamps in training bounds",
        });
      }
    }

    if (parameters.fitSummary.termination === "constant-target-shortcut") {
      if (parameters.fitSummary.iterations !== 0) {
        issues.push({
          path: ["fitSummary", "iterations"],
          issue: "Expected zero iterations for the constant-target shortcut",
        });
      }

      if (
        parameters.slope !== 0 ||
        parameters.deltas.some((delta) => delta !== 0) ||
        parameters.coefficients.some((coefficient) => coefficient !== 0) ||
        parameters.eventCoefficients.some((coefficient) => coefficient !== 0) ||
        parameters.regressors.some((regressor) => regressor.coefficient !== 0)
      ) {
        issues.push({
          path: ["fitSummary", "termination"],
          issue: "Constant-target shortcut state requires zero rate and feature coefficients",
        });
      }

      if (parameters.noiseScale !== parameters.fitSummary.valueScale * 1e-9) {
        issues.push({
          path: ["noiseScale"],
          issue: "Constant-target shortcut noise must equal valueScale times 1e-9",
        });
      }
    }

    return issues;
  },
);

const PiecewiseMapParametersSchema = PiecewiseMapParametersFieldsSchema.check(
  consistentPiecewiseMapParameters,
);

const FittedLinearProphetSchema = LinearParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedLinearProphet"),
);

const FittedFlatMapProphetSchema = FlatMapParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedFlatMapProphet"),
);

const FittedPiecewiseMapProphetSchema = PiecewiseMapParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedPiecewiseMapProphet"),
);

const FittedProphetSchema = Schema.Union([
  FittedLinearProphetSchema,
  FittedFlatMapProphetSchema,
  FittedPiecewiseMapProphetSchema,
]);

type ParsedPiecewiseMapParameters = typeof PiecewiseMapParametersSchema.Type;

/** Untrusted parameters returned by a linear-trend fitting backend. */
export type LinearParameters = typeof LinearParametersSchema.Type;

/** Complete, untrusted fitted state for a reduced flat MAP model. */
export type FlatMapParameters = typeof FlatMapParametersSchema.Type;

/** Complete, untrusted fitted state for a linear piecewise MAP model. */
export type PiecewiseMapParameters = Omit<ParsedPiecewiseMapParameters, "regressors"> & {
  readonly regressors?: ParsedPiecewiseMapParameters["regressors"];
};

/** Untrusted fitted parameters returned by a fitting backend. */
export type Parameters = LinearParameters | FlatMapParameters | PiecewiseMapParameters;

/** A parsed ordinary least-squares linear-trend model. */
export type FittedLinearProphet = typeof FittedLinearProphetSchema.Type;

/** A trusted, deeply immutable reduced flat MAP model. */
export type FittedFlatMapProphet = typeof FittedFlatMapProphetSchema.Type;

/** A trusted, deeply immutable linear piecewise MAP model. */
export type FittedPiecewiseMapProphet = typeof FittedPiecewiseMapProphetSchema.Type;

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

const decodeFlatMapModel = Schema.decodeUnknownEffect(FittedFlatMapProphetSchema, {
  errors: "all",
});

const decodePiecewiseMapModel = Schema.decodeUnknownEffect(FittedPiecewiseMapProphetSchema, {
  errors: "all",
});

const decodeFittedModel = Schema.decodeUnknownEffect(FittedProphetSchema, {
  errors: "all",
});

const freezeLinearModel = (model: FittedLinearProphet): FittedLinearProphet => Object.freeze(model);

const freezeFeatureModel = <Model extends FittedFlatMapProphet | FittedPiecewiseMapProphet>(
  model: Model,
): Model => {
  for (const component of model.seasonalities.components) {
    Object.freeze(component.definition);
    Object.freeze(component);
  }

  Object.freeze(model.seasonalities.components);
  Object.freeze(model.seasonalities);
  Object.freeze(model.coefficients);

  if (model.model === "linear-piecewise-map") {
    for (const occurrence of model.events.occurrences) {
      Object.freeze(occurrence);
    }

    for (const column of model.events.columns) {
      Object.freeze(column);
    }

    for (const component of model.events.layout.components) {
      Object.freeze(component);
    }

    Object.freeze(model.events.occurrences);
    Object.freeze(model.events.columns);
    Object.freeze(model.events.layout.components);
    Object.freeze(model.events.layout.priorScales);
    Object.freeze(model.events.layout);
    Object.freeze(model.events);
    Object.freeze(model.eventCoefficients);

    for (const regressor of model.regressors) {
      Object.freeze(regressor.definition);
      Object.freeze(regressor.transform);
      Object.freeze(regressor);
    }

    Object.freeze(model.regressors);
  }

  if (model.model === "linear-piecewise-map") {
    Object.freeze(model.changepointTimestamps);
    Object.freeze(model.deltas);
  }

  Object.freeze(model.fitSummary);

  return Object.freeze(model);
};

const freezeFittedModel = (model: FittedProphet): FittedProphet => {
  if (model.model === "flat-map" || model.model === "linear-piecewise-map") {
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
 * Parse complete linear piecewise MAP state into a fresh, deeply frozen model.
 *
 * @param input - Values at a fitting or serialization trust boundary.
 * @returns A trusted linear piecewise MAP model or structured issues.
 */
export const parsePiecewiseMapModel = (
  input: FirstArgument<typeof decodePiecewiseMapModel>,
): Effect.Effect<FittedPiecewiseMapProphet, InvalidFittedModel> =>
  decodePiecewiseMapModel(input).pipe(
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
