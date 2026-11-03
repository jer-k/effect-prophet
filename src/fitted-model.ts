import { Effect, Match, Predicate, Schema, type SchemaIssue } from "effect";

import {
  ValidationIssueSchema,
  validationIssuesFromIssue,
  validationMessageFromIssue,
} from "./errors";
import { EventCalendarSchema, emptyEventCalendar } from "./event";
import { FeatureNameSchema } from "./feature-name";
import { FittedRegressorSchema } from "./regressor";
import { SeasonalityLayoutSchema } from "./seasonality";
import {
  ParsedCountryHolidayModelSchema,
  countryHolidayTrainingEventsMatch,
} from "./internal/country-holiday-model";
import { PositiveFinite } from "./internal/numeric-schemas";
import { freezeOwned } from "./internal/owned-input";
import { LogisticTargetScalingSchema } from "./logistic";
import {
  McmcDiagnosticsSchema,
  McmcSamplerSchema,
  maximumMcmcDraws,
  maximumPosteriorValues,
} from "./mcmc";
import { TargetScalingSchema } from "./target-scaling";

const FlatMapModel = Schema.Literal("flat-map");

const PiecewiseMapModel = Schema.Literal("linear-piecewise-map");

const LogisticMapModel = Schema.Literal("logistic-piecewise-map");

const FlatMcmcModel = Schema.Literal("flat-mcmc");

const PiecewiseMcmcModel = Schema.Literal("linear-piecewise-mcmc");

const LogisticMcmcModel = Schema.Literal("logistic-piecewise-mcmc");

const ModelDiscriminantSchema = Schema.Struct({
  model: Schema.Union([
    FlatMapModel,
    PiecewiseMapModel,
    LogisticMapModel,
    FlatMcmcModel,
    PiecewiseMcmcModel,
    LogisticMcmcModel,
  ]),
});

const StanCompletionFieldsSchema = Schema.Struct({
  termination: Schema.Literals([
    "constant-target-shortcut",
    "objective-change",
    "no-progress",
    "absolute-objective",
    "relative-objective",
    "absolute-gradient",
    "relative-gradient",
    "parameter-change",
    "iteration-limit",
  ]),
  optimization: Schema.Union([
    Schema.Struct({
      algorithm: Schema.Literal("none"),
      attemptCount: Schema.Literal(0),
      failedAttemptIterations: Schema.Null,
      hessianResets: Schema.Literal(0),
    }),
    Schema.Struct({
      algorithm: Schema.Literal("newton"),
      attemptCount: Schema.Literal(1),
      failedAttemptIterations: Schema.Null,
      hessianResets: Schema.Literal(0),
    }),
    Schema.Struct({
      algorithm: Schema.Literal("newton"),
      attemptCount: Schema.Literal(2),
      failedAttemptIterations: Schema.NullOr(Schema.Natural),
      hessianResets: Schema.Literal(0),
    }),
    Schema.Struct({
      algorithm: Schema.Literal("lbfgs"),
      attemptCount: Schema.Literal(1),
      failedAttemptIterations: Schema.Null,
      hessianResets: Schema.Natural,
    }),
  ]),
  valueScale: PositiveFinite,
  observationCount: Schema.Int.check(Schema.isGreaterThanOrEqualTo(2)),
  iterations: Schema.Natural,
  objective: Schema.Finite,
  stationarityResidual: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
});

const consistentStanMapCompletion = Schema.makeFilter(
  (summary: typeof StanCompletionFieldsSchema.Type) => {
    const algorithm = summary.optimization.algorithm;

    const valid = Match.value(algorithm).pipe(
      Match.when(
        "none",
        () => summary.termination === "constant-target-shortcut" && summary.iterations === 0,
      ),
      Match.when("newton", () =>
        ["objective-change", "no-progress", "iteration-limit"].includes(summary.termination),
      ),
      Match.when("lbfgs", () =>
        [
          "absolute-objective",
          "relative-objective",
          "absolute-gradient",
          "relative-gradient",
          "parameter-change",
          "iteration-limit",
        ].includes(summary.termination),
      ),
      Match.exhaustive,
    );

    return valid
      ? undefined
      : {
          path: ["optimization"],
          issue: "Stan optimization completion does not match its actual algorithm",
        };
  },
);

type Issue = {
  readonly path: ReadonlyArray<PropertyKey>;
  readonly issue: string;
};

/** Reduced coordinate diagnostics, still decoded for flat models saved by earlier releases. */
const FlatMapCoordinateFitSummarySchema = Schema.Struct({
  method: Schema.Literal("flat-map-coordinate-v1"),
  termination: Schema.Literals(["converged", "constant-target-shortcut"]),
  valueScale: PositiveFinite,
  observationCount: Schema.Int.check(Schema.isGreaterThanOrEqualTo(2)),
  iterations: Schema.Natural,
  objective: Schema.Finite,
  stationarityResidual: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
});

/** Flat completion evidence from Prophet's Stan density with the trend fixed at its level. */
export const FlatMapStanFitSummarySchema = Schema.Struct({
  ...StanCompletionFieldsSchema.fields,
  method: Schema.Literal("flat-map-stan-v1"),
}).check(consistentStanMapCompletion);

/** Stan flat MAP diagnostics, or reduced coordinate diagnostics from a saved model. */
export const FlatMapFitSummarySchema = Schema.Union([
  FlatMapCoordinateFitSummarySchema,
  FlatMapStanFitSummarySchema,
]);

const FlatMapParametersFieldsSchema = Schema.Struct({
  model: FlatMapModel,
  countryHolidays: Schema.optionalKey(ParsedCountryHolidayModelSchema),
  targetScaling: TargetScalingSchema,
  level: Schema.Finite,
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
  fitSummary: FlatMapFitSummarySchema,
});

type FlatMapParametersFields = typeof FlatMapParametersFieldsSchema.Type;

const hasMultiplicativeComponents = (parameters: {
  readonly seasonalities: typeof SeasonalityLayoutSchema.Type;
  readonly events: typeof EventCalendarSchema.Type;
  readonly regressors: ReadonlyArray<typeof FittedRegressorSchema.Type>;
}): boolean =>
  parameters.seasonalities.components.some(
    (component) => component.definition.mode === "multiplicative",
  ) ||
  parameters.events.layout.components.some((component) => component.mode === "multiplicative") ||
  parameters.regressors.some((regressor) => regressor.definition.mode === "multiplicative");

/**
 * Whether a flat model has features the retired reduced coordinate fitter never produced.
 *
 * That fitter covered only unconditional additive seasonalities, so a saved coordinate
 * summary with events, regressors, conditional or multiplicative components is invalid.
 */
const exceedsCoordinateFitter = (features: {
  readonly seasonalities: typeof SeasonalityLayoutSchema.Type;
  readonly events: typeof EventCalendarSchema.Type;
  readonly regressors: ReadonlyArray<unknown>;
}): boolean =>
  features.events.layout.components.length > 0 ||
  features.regressors.length > 0 ||
  features.seasonalities.components.some(
    (component) =>
      component.definition.mode === "multiplicative" ||
      component.definition.conditionName !== undefined,
  );

const featureIdentityIssues = (parameters: {
  readonly seasonalities: typeof SeasonalityLayoutSchema.Type;
  readonly events: typeof EventCalendarSchema.Type;
  readonly regressors: ReadonlyArray<typeof FittedRegressorSchema.Type>;
}): Array<{
  readonly path: ReadonlyArray<PropertyKey>;
  readonly issue: string;
}> => {
  const issues: Array<{
    readonly path: ReadonlyArray<PropertyKey>;
    readonly issue: string;
  }> = [];

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

  for (const [index, component] of parameters.seasonalities.components.entries()) {
    const conditionName = component.definition.conditionName;

    if (conditionName !== undefined && featureNames.has(conditionName)) {
      issues.push({
        path: ["seasonalities", "components", index, "definition", "conditionName"],
        issue: "Fitted condition names must be distinct from component names",
      });
    }
  }

  return issues;
};

/** Checks every flat model shares, whether fitted by optimization or sampling. */
const flatModelIssues = (
  parameters: Pick<
    FlatMapParametersFields,
    | "targetScaling"
    | "level"
    | "seasonalities"
    | "coefficients"
    | "events"
    | "eventCoefficients"
    | "regressors"
  > & { readonly fitSummary: { readonly valueScale: number } },
): Array<Issue> => {
  const issues: Array<Issue> = [];

  if (parameters.targetScaling.scale !== parameters.fitSummary.valueScale) {
    issues.push({
      path: ["targetScaling", "scale"],
      issue: "Target scale must match the fitted objective value scale",
    });
  }

  if (!Number.isFinite(parameters.targetScaling.offset + parameters.level)) {
    issues.push({
      path: ["level"],
      issue: "Target offset and relative level must produce a finite trend",
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

  issues.push(...featureIdentityIssues(parameters));

  return issues;
};

const consistentFlatMapParameters = Schema.makeFilter<FlatMapParametersFields>((parameters) => {
  const issues = flatModelIssues(parameters);

  if (
    parameters.fitSummary.method === "flat-map-coordinate-v1" &&
    exceedsCoordinateFitter(parameters)
  ) {
    issues.push({
      path: ["fitSummary", "method"],
      issue: "The reduced flat MAP method supports only unconditional additive seasonalities",
    });
  }

  if (parameters.fitSummary.termination === "constant-target-shortcut") {
    if (parameters.fitSummary.iterations !== 0) {
      issues.push({
        path: ["fitSummary", "iterations"],
        issue: "Expected zero iterations for the constant-target shortcut",
      });
    }

    if (
      parameters.coefficients.some((coefficient) => coefficient !== 0) ||
      parameters.eventCoefficients.some((coefficient) => coefficient !== 0) ||
      parameters.regressors.some((regressor) => regressor.coefficient !== 0)
    ) {
      issues.push({
        path: ["fitSummary", "termination"],
        issue: "Constant-target shortcut state requires zero feature coefficients",
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
});

const BaseFlatMapParametersSchema = FlatMapParametersFieldsSchema.check(
  consistentFlatMapParameters,
);

/** Version-two linear MAP diagnostics with algorithm-consistent completion evidence. */
export const PiecewiseMapFitSummarySchema = Schema.Struct({
  ...StanCompletionFieldsSchema.fields,
  changepointPriorScale: PositiveFinite,
  method: Schema.Literals(["piecewise-map-stan-v2", "mixed-piecewise-map-stan-v2"]),
}).check(consistentStanMapCompletion);

/** Logistic completion evidence from the shared Stan optimizer policy. */
export const LogisticMapFitSummarySchema = Schema.Struct({
  ...StanCompletionFieldsSchema.fields,
  changepointPriorScale: PositiveFinite,
  method: Schema.Literal("logistic-piecewise-map-stan-v2"),
}).check(
  consistentStanMapCompletion,
  Schema.makeFilter(
    (summary) =>
      summary.optimization.algorithm !== "none" || "Expected a logistic Stan optimization attempt",
  ),
);

/** Shared Stan diagnostics used by the complete adapter tracing boundary. */
export const StanMapFitSummarySchema = Schema.Union([
  PiecewiseMapFitSummarySchema,
  LogisticMapFitSummarySchema,
  FlatMapStanFitSummarySchema,
]);

const PiecewiseMapParametersFieldsSchema = Schema.Struct({
  model: PiecewiseMapModel,
  countryHolidays: Schema.optionalKey(ParsedCountryHolidayModelSchema),
  targetScaling: TargetScalingSchema,
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

/** Checks every linear model shares, whether fitted by optimization or sampling. */
const piecewiseModelIssues = (
  parameters: Omit<PiecewiseMapParametersFields, "model" | "fitSummary" | "countryHolidays"> & {
    readonly fitSummary: { readonly valueScale: number };
  },
): Array<Issue> => {
  const issues: Array<Issue> = [];

  if (parameters.targetScaling.scale !== parameters.fitSummary.valueScale) {
    issues.push({
      path: ["targetScaling", "scale"],
      issue: "Target scale must match the fitted objective value scale",
    });
  }

  if (!Number.isFinite(parameters.targetScaling.offset + parameters.intercept)) {
    issues.push({
      path: ["intercept"],
      issue: "Target offset and relative intercept must produce a finite trend",
    });
  }

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

  issues.push(...featureIdentityIssues(parameters));

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
      (previous !== undefined && changepoint < previous)
    ) {
      issues.push({
        path: ["changepointTimestamps", index],
        issue: "Changepoints must be safe, nondecreasing timestamps in training bounds",
      });
    }
  }

  return issues;
};

const consistentPiecewiseMapParameters = Schema.makeFilter<PiecewiseMapParametersFields>(
  (parameters) => {
    const issues = piecewiseModelIssues(parameters);

    const mixed = hasMultiplicativeComponents(parameters);

    if (mixed !== (parameters.fitSummary.method === "mixed-piecewise-map-stan-v2")) {
      issues.push({
        path: ["fitSummary", "method"],
        issue: "Linear MAP method identity must match its resolved component modes",
      });
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

const BasePiecewiseMapParametersSchema = PiecewiseMapParametersFieldsSchema.check(
  consistentPiecewiseMapParameters,
);

const LogisticMapParametersFieldsSchema = Schema.Struct({
  model: LogisticMapModel,
  countryHolidays: Schema.optionalKey(ParsedCountryHolidayModelSchema),
  targetScaling: LogisticTargetScalingSchema,
  rate: Schema.Finite,
  offset: Schema.Finite,
  timeOrigin: Schema.Int,
  timeScale: Schema.Int.check(Schema.isGreaterThan(0)),
  changepointTimestamps: Schema.Array(Schema.Int),
  deltas: Schema.Array(Schema.Finite),
  seasonalities: SeasonalityLayoutSchema,
  coefficients: Schema.Array(Schema.Finite),
  events: EventCalendarSchema,
  eventCoefficients: Schema.Array(Schema.Finite),
  regressors: Schema.Array(FittedRegressorSchema),
  noiseScale: PositiveFinite,
  fitSummary: LogisticMapFitSummarySchema,
});

type LogisticMapParametersFields = typeof LogisticMapParametersFieldsSchema.Type;

/** Checks every logistic model shares, whether fitted by optimization or sampling. */
const logisticModelIssues = (
  parameters: Omit<LogisticMapParametersFields, "model" | "fitSummary" | "countryHolidays"> & {
    readonly fitSummary: { readonly valueScale: number };
  },
): Array<Issue> => {
  const issues: Array<Issue> = [];

  if (parameters.targetScaling.scale !== parameters.fitSummary.valueScale) {
    issues.push({
      path: ["targetScaling", "scale"],
      issue: "Target scale must match the fitted objective value scale",
    });
  }

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

  issues.push(...featureIdentityIssues(parameters));

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
      (previous !== undefined && changepoint < previous)
    ) {
      issues.push({
        path: ["changepointTimestamps", index],
        issue: "Changepoints must be safe, nondecreasing timestamps in training bounds",
      });
    }
  }

  return issues;
};

const consistentLogisticMapParameters =
  Schema.makeFilter<LogisticMapParametersFields>(logisticModelIssues);

/** Posterior sampling summary: how the draws were made and the sampler's health. */
export const McmcFitSummarySchema = Schema.Struct({
  method: Schema.Literal("stan-nuts-v1"),

  /** `"constant-target-shortcut"` keeps Prophet's single state for a constant history. */
  termination: Schema.Literals(["sampled", "constant-target-shortcut"]),
  valueScale: PositiveFinite,
  observationCount: Schema.Int.check(Schema.isGreaterThanOrEqualTo(2)),
  sampler: McmcSamplerSchema,

  /** `null` for the constant-target shortcut, which never samples. */
  diagnostics: Schema.NullOr(McmcDiagnosticsSchema),
});

/** Linear sampling summaries also keep the changepoint prior, like linear MAP summaries. */
export const PiecewiseMcmcFitSummarySchema = Schema.Struct({
  ...McmcFitSummarySchema.fields,
  changepointPriorScale: PositiveFinite,
});

const DrawRows = Schema.Array(Schema.Array(Schema.Finite));

/** Every draw of a flat posterior, in observation units, in Python's pooled draw order. */
export const FlatPosteriorSchema = Schema.Struct({
  level: Schema.Array(Schema.Finite),
  noiseScale: Schema.Array(PositiveFinite),
  coefficients: DrawRows,
  eventCoefficients: DrawRows,
  regressorCoefficients: DrawRows,
});

/** Every draw of a linear posterior, in observation units, in Python's pooled draw order. */
export const PiecewisePosteriorSchema = Schema.Struct({
  intercept: Schema.Array(Schema.Finite),
  slope: Schema.Array(Schema.Finite),
  deltas: DrawRows,
  noiseScale: Schema.Array(PositiveFinite),
  coefficients: DrawRows,
  eventCoefficients: DrawRows,
  regressorCoefficients: DrawRows,
});

/** Every draw of a logistic posterior: dimensionless trend draws, observation-unit features. */
export const LogisticPosteriorSchema = Schema.Struct({
  rate: Schema.Array(Schema.Finite),
  offset: Schema.Array(Schema.Finite),
  deltas: DrawRows,
  noiseScale: Schema.Array(PositiveFinite),
  coefficients: DrawRows,
  eventCoefficients: DrawRows,
  regressorCoefficients: DrawRows,
});

/** Check draw counts, row widths, the saved-size limit and the termination's evidence. */
const posteriorIssues = (
  summary: typeof McmcFitSummarySchema.Type,
  columns: ReadonlyArray<readonly [string, ReadonlyArray<unknown>, number | undefined]>,
): Array<Issue> => {
  const issues: Array<Issue> = [];
  const { sampler, termination, diagnostics } = summary;
  const expected = termination === "sampled" ? sampler.chains * sampler.drawsPerChain : 1;
  let width = 0;

  if (expected > maximumMcmcDraws) {
    issues.push({ path: ["fitSummary", "sampler"], issue: "Too many posterior draws" });
  }

  if ((termination === "sampled") !== (diagnostics !== null)) {
    issues.push({
      path: ["fitSummary", "diagnostics"],
      issue: "Sampled fits keep diagnostics and the constant-target shortcut has none",
    });
  }

  if (diagnostics !== null && diagnostics.stepSizes.length !== sampler.chains) {
    issues.push({
      path: ["fitSummary", "diagnostics", "stepSizes"],
      issue: "Expected one step size per chain",
    });
  }

  for (const [name, draws, rowWidth] of columns) {
    if (draws.length !== expected) {
      issues.push({ path: ["posterior", name], issue: `Expected exactly ${expected} draws` });
    }

    if (rowWidth === undefined) {
      width += 1;
      continue;
    }

    width += rowWidth;

    for (const [index, row] of draws.entries()) {
      if (!Array.isArray(row) || row.length !== rowWidth) {
        issues.push({
          path: ["posterior", name, index],
          issue: `Expected exactly ${rowWidth} values in each draw`,
        });
        break;
      }
    }
  }

  if (expected * width > maximumPosteriorValues) {
    issues.push({ path: ["posterior"], issue: "The posterior has too many values to keep" });
  }

  return issues;
};

const posteriorFeatureColumns = (parameters: {
  readonly coefficients: ReadonlyArray<number>;
  readonly eventCoefficients: ReadonlyArray<number>;
  readonly regressors: ReadonlyArray<unknown>;
  readonly posterior: {
    readonly coefficients: ReadonlyArray<ReadonlyArray<number>>;
    readonly eventCoefficients: ReadonlyArray<ReadonlyArray<number>>;
    readonly regressorCoefficients: ReadonlyArray<ReadonlyArray<number>>;
  };
}) =>
  [
    ["coefficients", parameters.posterior.coefficients, parameters.coefficients.length],
    [
      "eventCoefficients",
      parameters.posterior.eventCoefficients,
      parameters.eventCoefficients.length,
    ],
    [
      "regressorCoefficients",
      parameters.posterior.regressorCoefficients,
      parameters.regressors.length,
    ],
  ] as const;

const FlatMcmcParametersFieldsSchema = Schema.Struct({
  ...FlatMapParametersFieldsSchema.fields,
  model: FlatMcmcModel,
  fitSummary: McmcFitSummarySchema,
  posterior: FlatPosteriorSchema,
});

const consistentFlatMcmcParameters = Schema.makeFilter<typeof FlatMcmcParametersFieldsSchema.Type>(
  (parameters) => [
    ...flatModelIssues(parameters),
    ...posteriorIssues(parameters.fitSummary, [
      ["level", parameters.posterior.level, undefined],
      ["noiseScale", parameters.posterior.noiseScale, undefined],
      ...posteriorFeatureColumns(parameters),
    ]),
  ],
);

const PiecewiseMcmcParametersFieldsSchema = Schema.Struct({
  ...PiecewiseMapParametersFieldsSchema.fields,
  model: PiecewiseMcmcModel,
  fitSummary: PiecewiseMcmcFitSummarySchema,
  posterior: PiecewisePosteriorSchema,
});

const consistentPiecewiseMcmcParameters = Schema.makeFilter<
  typeof PiecewiseMcmcParametersFieldsSchema.Type
>((parameters) => [
  ...piecewiseModelIssues(parameters),
  ...posteriorIssues(parameters.fitSummary, [
    ["intercept", parameters.posterior.intercept, undefined],
    ["slope", parameters.posterior.slope, undefined],
    ["deltas", parameters.posterior.deltas, parameters.deltas.length],
    ["noiseScale", parameters.posterior.noiseScale, undefined],
    ...posteriorFeatureColumns(parameters),
  ]),
]);

const LogisticMcmcParametersFieldsSchema = Schema.Struct({
  ...LogisticMapParametersFieldsSchema.fields,
  model: LogisticMcmcModel,
  fitSummary: PiecewiseMcmcFitSummarySchema,
  posterior: LogisticPosteriorSchema,
});

const consistentLogisticMcmcParameters = Schema.makeFilter<
  typeof LogisticMcmcParametersFieldsSchema.Type
>((parameters) => [
  ...logisticModelIssues(parameters),
  ...posteriorIssues(parameters.fitSummary, [
    ["rate", parameters.posterior.rate, undefined],
    ["offset", parameters.posterior.offset, undefined],
    ["deltas", parameters.posterior.deltas, parameters.deltas.length],
    ["noiseScale", parameters.posterior.noiseScale, undefined],
    ...posteriorFeatureColumns(parameters),
  ]),
  ...(parameters.fitSummary.termination === "sampled"
    ? []
    : [
        {
          path: ["fitSummary", "termination"],
          issue: "Logistic posteriors are always sampled",
        },
      ]),
]);

// A regressor model has no regressors of its own, so the base schemas type it without recursion.
const RegressorFlatMapModelSchema = BaseFlatMapParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedFlatMapProphet"),
);

const RegressorPiecewiseMapModelSchema = BasePiecewiseMapParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedPiecewiseMapProphet"),
);

type RegressorFlatMapModelType = typeof RegressorFlatMapModelSchema.Type;

type RegressorPiecewiseMapModelType = typeof RegressorPiecewiseMapModelSchema.Type;

// Interfaces keep declarations naming these types instead of repeating them in every model type.

/** The flat model fitted to one regressor, which has no regressors of its own. */
export interface RegressorFlatMapModel extends RegressorFlatMapModelType {}

/** The linear model fitted to one regressor, which has no regressors of its own. */
export interface RegressorPiecewiseMapModel extends RegressorPiecewiseMapModelType {}

const RegressorModelFitSchema: Schema.Codec<
  RegressorFlatMapModel | RegressorPiecewiseMapModel,
  unknown
> = Schema.Union([RegressorFlatMapModelSchema, RegressorPiecewiseMapModelSchema]);

const RegressorModelFieldsSchema = Schema.Struct({
  name: FeatureNameSchema,
  timestamps: Schema.Array(Schema.Int),
  values: Schema.Array(Schema.Finite),
  model: RegressorModelFitSchema,
});

const consistentRegressorModel = Schema.makeFilter<typeof RegressorModelFieldsSchema.Type>(
  (regressorModel) => {
    const issues: Array<{
      readonly path: ReadonlyArray<PropertyKey>;
      readonly issue: string;
    }> = [];

    if (regressorModel.values.length !== regressorModel.timestamps.length) {
      issues.push({
        path: ["values"],
        issue: "Regressor model training timestamps and values must align",
      });
    }

    if (
      regressorModel.timestamps.some(
        (timestamp, index) => index > 0 && timestamp < (regressorModel.timestamps[index - 1] ?? 0),
      )
    ) {
      issues.push({
        path: ["timestamps"],
        issue: "Regressor model training timestamps must be nondecreasing",
      });
    }

    if (regressorModel.model.fitSummary.observationCount !== regressorModel.timestamps.length) {
      issues.push({
        path: ["model", "fitSummary", "observationCount"],
        issue: "A regressor model must be fitted to its own training values",
      });
    }

    if (
      regressorModel.model.regressors.length > 0 ||
      regressorModel.model.countryHolidays !== undefined
    ) {
      issues.push({
        path: ["model"],
        issue: "A regressor model cannot have regressors or country holidays",
      });
    }

    return issues;
  },
);

/** One regressor forecast by its own model, with the training values it was fitted to. */
export const RegressorModelSchema = RegressorModelFieldsSchema.check(consistentRegressorModel);

const RegressorModelsSchema = Schema.optionalKey(Schema.Array(RegressorModelSchema));

/**
 * Check that regressor models name regressors in definition order and were trained on the main
 * model's history, inside its time bounds when it has them.
 */
const regressorModelIssues = (
  parameters: {
    readonly regressors: ReadonlyArray<typeof FittedRegressorSchema.Type>;
    readonly regressorModels?: ReadonlyArray<typeof RegressorModelSchema.Type>;
    readonly fitSummary: { readonly observationCount: number };
  },
  bounds?: { readonly start: number; readonly end: number },
): Array<{
  readonly path: ReadonlyArray<PropertyKey>;
  readonly issue: string;
}> => {
  const issues: Array<{
    readonly path: ReadonlyArray<PropertyKey>;
    readonly issue: string;
  }> = [];

  const names = parameters.regressors.map((regressor) => regressor.definition.name);
  const firstTimestamps = parameters.regressorModels?.[0]?.timestamps;
  let previous = -1;

  for (const [index, regressorModel] of (parameters.regressorModels ?? []).entries()) {
    const position = names.indexOf(regressorModel.name);

    if (position <= previous) {
      issues.push({
        path: ["regressorModels", index, "name"],
        issue: "Regressor models must name distinct regressors in definition order",
      });
    }

    previous = Math.max(previous, position);

    if (
      regressorModel.timestamps.length !== parameters.fitSummary.observationCount ||
      regressorModel.timestamps.some((timestamp, row) => timestamp !== firstTimestamps?.[row])
    ) {
      issues.push({
        path: ["regressorModels", index, "timestamps"],
        issue: "Every regressor model must be trained on the main model's history",
      });
    }

    if (
      bounds !== undefined &&
      regressorModel.timestamps.some(
        (timestamp) => timestamp < bounds.start || timestamp > bounds.end,
      )
    ) {
      issues.push({
        path: ["regressorModels", index, "timestamps"],
        issue: "Regressor model training timestamps must be inside the training bounds",
      });
    }
  }

  return issues;
};

const FlatMapParametersSchema = Schema.Struct({
  ...FlatMapParametersFieldsSchema.fields,
  regressorModels: RegressorModelsSchema,
}).check(
  consistentFlatMapParameters,
  Schema.makeFilter((parameters) => regressorModelIssues(parameters)),
);

const PiecewiseMapParametersSchema = Schema.Struct({
  ...PiecewiseMapParametersFieldsSchema.fields,
  regressorModels: RegressorModelsSchema,
}).check(
  consistentPiecewiseMapParameters,
  Schema.makeFilter((parameters) =>
    regressorModelIssues(parameters, {
      start: parameters.timeOrigin,
      end: parameters.timeOrigin + parameters.timeScale,
    }),
  ),
);

const LogisticMapParametersSchema = Schema.Struct({
  ...LogisticMapParametersFieldsSchema.fields,
  regressorModels: RegressorModelsSchema,
}).check(
  consistentLogisticMapParameters,
  Schema.makeFilter((parameters) =>
    regressorModelIssues(parameters, {
      start: parameters.timeOrigin,
      end: parameters.timeOrigin + parameters.timeScale,
    }),
  ),
);

const FittedFlatMapProphetSchema = FlatMapParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedFlatMapProphet"),
);

const FittedPiecewiseMapProphetSchema = PiecewiseMapParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedPiecewiseMapProphet"),
);

const FittedLogisticMapProphetSchema = LogisticMapParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedLogisticMapProphet"),
);

const FlatMcmcParametersSchema = Schema.Struct({
  ...FlatMcmcParametersFieldsSchema.fields,
  regressorModels: RegressorModelsSchema,
}).check(
  consistentFlatMcmcParameters,
  Schema.makeFilter((parameters) => regressorModelIssues(parameters)),
);

const PiecewiseMcmcParametersSchema = Schema.Struct({
  ...PiecewiseMcmcParametersFieldsSchema.fields,
  regressorModels: RegressorModelsSchema,
}).check(
  consistentPiecewiseMcmcParameters,
  Schema.makeFilter((parameters) =>
    regressorModelIssues(parameters, {
      start: parameters.timeOrigin,
      end: parameters.timeOrigin + parameters.timeScale,
    }),
  ),
);

const LogisticMcmcParametersSchema = Schema.Struct({
  ...LogisticMcmcParametersFieldsSchema.fields,
  regressorModels: RegressorModelsSchema,
}).check(
  consistentLogisticMcmcParameters,
  Schema.makeFilter((parameters) =>
    regressorModelIssues(parameters, {
      start: parameters.timeOrigin,
      end: parameters.timeOrigin + parameters.timeScale,
    }),
  ),
);

const FittedLogisticMcmcProphetSchema = LogisticMcmcParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedLogisticMcmcProphet"),
);

const FittedFlatMcmcProphetSchema = FlatMcmcParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedFlatMcmcProphet"),
);

const FittedPiecewiseMcmcProphetSchema = PiecewiseMcmcParametersSchema.pipe(
  Schema.brand("effect-prophet/FittedPiecewiseMcmcProphet"),
);

const FittedProphetSchema = Schema.Union([
  FittedFlatMapProphetSchema,
  FittedPiecewiseMapProphetSchema,
  FittedLogisticMapProphetSchema,
  FittedFlatMcmcProphetSchema,
  FittedPiecewiseMcmcProphetSchema,
  FittedLogisticMcmcProphetSchema,
]);

type ParsedPiecewiseMapParameters = typeof PiecewiseMapParametersSchema.Type;

type ParsedFlatMapParameters = typeof FlatMapParametersSchema.Type;

/** Complete, untrusted fitted state for a reduced flat MAP model. */
export type FlatMapParameters = Omit<
  ParsedFlatMapParameters,
  "events" | "eventCoefficients" | "regressors"
> & {
  readonly events?: ParsedFlatMapParameters["events"];
  readonly eventCoefficients?: ParsedFlatMapParameters["eventCoefficients"];
  readonly regressors?: ParsedFlatMapParameters["regressors"];
};

/** Complete, untrusted fitted state for a linear piecewise MAP model. */
export type PiecewiseMapParameters = Omit<ParsedPiecewiseMapParameters, "regressors"> & {
  readonly regressors?: ParsedPiecewiseMapParameters["regressors"];
};

type ParsedLogisticMapParameters = typeof LogisticMapParametersSchema.Type;

/** Complete, untrusted fitted state for a logistic piecewise MAP model. */
export type LogisticMapParameters = ParsedLogisticMapParameters;

/** Complete, untrusted fitted state for a flat posterior. */
export type FlatMcmcParameters = typeof FlatMcmcParametersSchema.Type;

/** Complete, untrusted fitted state for a linear posterior. */
export type PiecewiseMcmcParameters = typeof PiecewiseMcmcParametersSchema.Type;

/** Complete, untrusted fitted state for a logistic posterior. */
export type LogisticMcmcParameters = typeof LogisticMcmcParametersSchema.Type;

/** Untrusted fitted parameters returned by a fitting backend. */
export type Parameters =
  | FlatMapParameters
  | PiecewiseMapParameters
  | LogisticMapParameters
  | FlatMcmcParameters
  | PiecewiseMcmcParameters
  | LogisticMcmcParameters;

/** A trusted, deeply immutable reduced flat MAP model. */
export type FittedFlatMapProphet = typeof FittedFlatMapProphetSchema.Type;

/** A trusted, deeply immutable linear piecewise MAP model. */
export type FittedPiecewiseMapProphet = typeof FittedPiecewiseMapProphetSchema.Type;

/** A trusted, deeply immutable logistic piecewise MAP model. */
export type FittedLogisticMapProphet = typeof FittedLogisticMapProphetSchema.Type;

/** A trusted, deeply immutable flat posterior. */
export type FittedFlatMcmcProphet = typeof FittedFlatMcmcProphetSchema.Type;

/** A trusted, deeply immutable linear posterior. */
export type FittedPiecewiseMcmcProphet = typeof FittedPiecewiseMcmcProphetSchema.Type;

/** A trusted, deeply immutable logistic posterior. */
export type FittedLogisticMcmcProphet = typeof FittedLogisticMcmcProphetSchema.Type;

/** A model fitted by posterior sampling. */
export type FittedMcmcProphet =
  | FittedFlatMcmcProphet
  | FittedPiecewiseMcmcProphet
  | FittedLogisticMcmcProphet;

/** A model with a capacity-bounded logistic trend, fitted either way. */
export type FittedLogisticProphet = FittedLogisticMapProphet | FittedLogisticMcmcProphet;

/** Whether a model's trend is logistic, so prediction rows need capacities. */
export const isLogisticModel = (model: FittedProphet): model is FittedLogisticProphet =>
  model.model === "logistic-piecewise-map" || model.model === "logistic-piecewise-mcmc";

/** A model fitted by optimization, whose `fitSummary` reports the optimizer's progress. */
export type FittedMapProphet = Exclude<FittedProphet, FittedMcmcProphet>;

/** Whether a model was fitted by posterior sampling. */
export const isMcmcModel = (model: FittedProphet): model is FittedMcmcProphet =>
  model.model === "flat-mcmc" ||
  model.model === "linear-piecewise-mcmc" ||
  model.model === "logistic-piecewise-mcmc";

/** Number of posterior draws a model keeps, or `undefined` for a MAP model. */
export const posteriorDrawCount = (model: FittedProphet): number | undefined =>
  isMcmcModel(model) ? model.posterior.noiseScale.length : undefined;

/** A parsed fitted model accepted by the public prediction operation. */
export type FittedProphet = typeof FittedProphetSchema.Type;

/** One regressor forecast by its own fitted model, with the training values it was fitted to. */
export type RegressorModel = typeof RegressorModelSchema.Type;

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

const decodeFlatMapModel = Schema.decodeUnknownEffect(FittedFlatMapProphetSchema, {
  errors: "all",
});

const decodePiecewiseMapModel = Schema.decodeUnknownEffect(FittedPiecewiseMapProphetSchema, {
  errors: "all",
});

const decodeLogisticMapModel = Schema.decodeUnknownEffect(FittedLogisticMapProphetSchema, {
  errors: "all",
});

const decodeFittedModel = Schema.decodeUnknownEffect(FittedProphetSchema, {
  errors: "all",
});

// Models parsed here, keyed by identity. Each is a deeply frozen fresh decode, so its contents
// cannot have changed since validation and re-parsing it would only repeat the same work.
const parsedModels = new WeakMap<object, FittedProphet>();

const previouslyParsed = (
  input:
    | FirstArgument<typeof decodeFittedModel>
    | FirstArgument<typeof decodeFlatMapModel>
    | FirstArgument<typeof decodePiecewiseMapModel>
    | FirstArgument<typeof decodeLogisticMapModel>,
): FittedProphet | undefined => (Predicate.isObject(input) ? parsedModels.get(input) : undefined);

const freezeFeatureModel = <Model extends FittedProphet>(model: Model): Model => {
  // Decoding produced a fresh tree, so it is frozen in place rather than cloned.
  const frozen = freezeOwned(model);

  parsedModels.set(frozen, frozen);

  for (const regressorModel of frozen.regressorModels ?? []) {
    parsedModels.set(regressorModel.model, regressorModel.model);
  }

  return frozen;
};

const checkCountryHolidayModel = <Model extends FittedProphet>(
  model: Model,
): Effect.Effect<Model, InvalidFittedModel> =>
  Effect.gen(function* () {
    const state = model.countryHolidays;

    if (state === undefined) {
      return model;
    }

    const invalidState = new InvalidFittedModel({
      issues: [
        {
          path: ["countryHolidays"],
          message: "Embedded calendar provenance must match the complete training event state",
        },
      ],
      message: "Embedded calendar provenance must match the complete training event state",
    });

    const matches = yield* countryHolidayTrainingEventsMatch(state, model.events).pipe(
      Effect.mapError(() => invalidState),
    );

    if (!matches) {
      return yield* invalidState;
    }

    if ("timeOrigin" in model) {
      const firstYear = new Date(model.timeOrigin).getUTCFullYear();
      const lastYear = new Date(model.timeOrigin + model.timeScale).getUTCFullYear();

      if (state.trainingYears[0] !== firstYear || state.trainingYears.at(-1) !== lastYear) {
        return yield* invalidState;
      }
    }

    return model;
  });

const freezeFittedModel = (model: FittedProphet): FittedProphet => freezeFeatureModel(model);

type FirstArgument<Function> = Function extends (
  input: infer Input,
  ...rest: infer _Rest
) => infer _Output
  ? Input
  : never;

/**
 * Parse complete flat MAP state into a fresh, deeply frozen fitted model.
 *
 * @param input - Values at a fitting or serialization trust boundary.
 * @returns A trusted flat MAP model or structured fitted-model issues.
 */
export const parseFlatMapModel = (
  input: FirstArgument<typeof decodeFlatMapModel>,
): Effect.Effect<FittedFlatMapProphet, InvalidFittedModel> => {
  const parsed = previouslyParsed(input);

  if (parsed?.model === "flat-map") {
    return Effect.succeed(parsed);
  }

  return decodeFlatMapModel(input).pipe(
    Effect.mapError((error) => invalidFittedModelFromIssue(error.issue)),
    Effect.flatMap(checkCountryHolidayModel),
    Effect.map(freezeFeatureModel),
  );
};

/**
 * Parse complete linear piecewise MAP state into a fresh, deeply frozen model.
 *
 * @param input - Values at a fitting or serialization trust boundary.
 * @returns A trusted linear piecewise MAP model or structured issues.
 */
export const parsePiecewiseMapModel = (
  input: FirstArgument<typeof decodePiecewiseMapModel>,
): Effect.Effect<FittedPiecewiseMapProphet, InvalidFittedModel> => {
  const parsed = previouslyParsed(input);

  if (parsed?.model === "linear-piecewise-map") {
    return Effect.succeed(parsed);
  }

  return decodePiecewiseMapModel(input).pipe(
    Effect.mapError((error) => invalidFittedModelFromIssue(error.issue)),
    Effect.flatMap(checkCountryHolidayModel),
    Effect.map(freezeFeatureModel),
  );
};

/** Parse complete logistic MAP state into a fresh, deeply frozen model. */
export const parseLogisticMapModel = (
  input: FirstArgument<typeof decodeLogisticMapModel>,
): Effect.Effect<FittedLogisticMapProphet, InvalidFittedModel> => {
  const parsed = previouslyParsed(input);

  if (parsed?.model === "logistic-piecewise-map") {
    return Effect.succeed(parsed);
  }

  return decodeLogisticMapModel(input).pipe(
    Effect.mapError((error) => invalidFittedModelFromIssue(error.issue)),
    Effect.flatMap(checkCountryHolidayModel),
    Effect.map(freezeFeatureModel),
  );
};

/**
 * Parse untrusted parameters into a fresh, frozen fitted-model union. A model previously
 * returned by a parser is already validated and deeply frozen, so it is returned unchanged.
 *
 * @param input - Values at a fitting, prediction, or serialization trust boundary.
 * @returns A trusted fitted model or structured fitted-model issues.
 */
export const parseFittedModel = (
  input: FirstArgument<typeof decodeFittedModel>,
): Effect.Effect<FittedProphet, InvalidFittedModel> => {
  const parsed = previouslyParsed(input);

  if (parsed !== undefined) {
    return Effect.succeed(parsed);
  }

  return decodeModelDiscriminant(input).pipe(
    Effect.flatMap(() => decodeFittedModel(input)),
    Effect.mapError((error) => invalidFittedModelFromIssue(error.issue)),
    Effect.flatMap(checkCountryHolidayModel),
    Effect.map(freezeFittedModel),
  );
};
