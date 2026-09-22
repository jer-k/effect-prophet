import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import * as nodePath from "node:path";
import { fileURLToPath } from "node:url";

import { DateTime, Effect, Option, Schema, SchemaIssue } from "effect";

const fixtureRoot = fileURLToPath(new URL("../fixtures/prophet-1.4.0/", import.meta.url));

const canonicalTimestampExpected = "a canonical UTC timestamp such as 2024-01-01T00:00:00.000Z";

const CanonicalTimestamp = Schema.String.check(
  Schema.makeFilter(
    (timestamp) =>
      Option.match(DateTime.make(timestamp), {
        onNone: () => false,
        onSome: (dateTime) => DateTime.formatIso(dateTime) === timestamp,
      }),
    { expected: canonicalTimestampExpected },
  ),
);

const Sha256 = Schema.String.check(
  Schema.makeFilter((value) => /^[a-f0-9]{64}$/.test(value), {
    expected: "a lowercase SHA-256 digest",
  }),
);

const GitCommit = Schema.String.check(
  Schema.makeFilter((value) => /^[a-f0-9]{40}$/.test(value), {
    expected: "a lowercase 40-character Git commit",
  }),
);

const NonNegativeFinite = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

const PositiveFinite = Schema.Finite.check(Schema.isGreaterThan(0));

const NumericToleranceSchema = Schema.Struct({
  absolute: NonNegativeFinite,
  relative: NonNegativeFinite,
});

const ObservationSchema = Schema.Struct({
  timestamp: CanonicalTimestamp,
  value: Schema.Finite,
});

const LinearTrendReferenceCaseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: Schema.Literal("fixed-linear-trend"),
  observations: Schema.NonEmptyArray(ObservationSchema),
  predictionTimestamps: Schema.Array(CanonicalTimestamp),
  parameters: Schema.Struct({
    intercept: Schema.Finite,
    slope: Schema.Finite,
    timeOrigin: Schema.Finite,
    timeScale: PositiveFinite,
  }),
  expected: Schema.Struct({
    scaledTrainingTimes: Schema.Array(Schema.Finite),
    scaledPredictionTimes: Schema.Array(Schema.Finite),
    trend: Schema.Array(Schema.Finite),
  }),
  tolerance: NumericToleranceSchema,
}).check(
  Schema.makeFilter((referenceCase) => {
    const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];

    if (referenceCase.expected.scaledTrainingTimes.length !== referenceCase.observations.length) {
      issues.push({
        path: ["expected", "scaledTrainingTimes"],
        issue: "Scaled training times must align with observations",
      });
    }

    if (
      referenceCase.expected.scaledPredictionTimes.length !==
      referenceCase.predictionTimestamps.length
    ) {
      issues.push({
        path: ["expected", "scaledPredictionTimes"],
        issue: "Scaled prediction times must align with prediction timestamps",
      });
    }

    if (referenceCase.expected.trend.length !== referenceCase.predictionTimestamps.length) {
      issues.push({
        path: ["expected", "trend"],
        issue: "Trend values must align with prediction timestamps",
      });
    }

    return issues;
  }),
);

const LinearTrendReferenceFileSchema = Schema.Struct({
  cases: Schema.NonEmptyArray(LinearTrendReferenceCaseSchema),
}).check(
  Schema.makeFilter((fixture) => {
    const identifiers = new Set<string>();

    for (const [index, referenceCase] of fixture.cases.entries()) {
      if (identifiers.has(referenceCase.id)) {
        return {
          path: ["cases", index, "id"],
          issue: "Reference case IDs must be unique",
        };
      }

      identifiers.add(referenceCase.id);
    }
  }),
);

const FourierReferenceCaseSchema = Schema.Struct({
  kind: Schema.Literal("fourier-features"),
  id: Schema.NonEmptyString,
  timestamps: Schema.Array(CanonicalTimestamp),
  seasonalities: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      periodDays: PositiveFinite,
      fourierOrder: Schema.Int.check(Schema.isGreaterThan(0)),
      priorScale: PositiveFinite,
    }),
  ),
  coefficients: Schema.Array(Schema.Finite),
  expected: Schema.Struct({
    rowCount: Schema.Natural,
    columnCount: Schema.Natural,
    featuresRowMajor: Schema.Array(Schema.Finite),
    componentsRowMajor: Schema.Array(Schema.Finite),
  }),
  tolerance: NumericToleranceSchema,
}).check(
  Schema.makeFilter((referenceCase) => {
    const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];

    const expectedColumnCount = referenceCase.seasonalities.reduce(
      (count, seasonality) => count + seasonality.fourierOrder * 2,
      0,
    );

    if (referenceCase.expected.rowCount !== referenceCase.timestamps.length) {
      issues.push({
        path: ["expected", "rowCount"],
        issue: "Fourier row count must align with timestamps",
      });
    }

    if (
      referenceCase.expected.columnCount !== expectedColumnCount ||
      referenceCase.coefficients.length !== expectedColumnCount
    ) {
      issues.push({
        path: ["expected", "columnCount"],
        issue: "Fourier columns and coefficients must align with seasonalities",
      });
    }

    if (
      referenceCase.expected.featuresRowMajor.length !==
      referenceCase.expected.rowCount * referenceCase.expected.columnCount
    ) {
      issues.push({
        path: ["expected", "featuresRowMajor"],
        issue: "Fourier feature values must match the declared matrix dimensions",
      });
    }

    if (
      referenceCase.expected.componentsRowMajor.length !==
      referenceCase.expected.rowCount * referenceCase.seasonalities.length
    ) {
      issues.push({
        path: ["expected", "componentsRowMajor"],
        issue: "Fourier component values must align with timestamps and seasonalities",
      });
    }

    return issues;
  }),
);

const FourierReferenceFileSchema = Schema.Struct({
  cases: Schema.NonEmptyArray(FourierReferenceCaseSchema),
}).check(
  Schema.makeFilter((fixture) => {
    const identifiers = new Set<string>();

    for (const [index, referenceCase] of fixture.cases.entries()) {
      if (identifiers.has(referenceCase.id)) {
        return {
          path: ["cases", index, "id"],
          issue: "Fourier reference case IDs must be unique",
        };
      }

      identifiers.add(referenceCase.id);
    }
  }),
);

const ConditionalSeasonalityDefinitionSchema = Schema.Struct({
  name: Schema.NonEmptyString,
  periodDays: PositiveFinite,
  fourierOrder: Schema.Int.check(Schema.isGreaterThan(0)),
  priorScale: PositiveFinite,
  conditionName: Schema.optionalKey(Schema.NonEmptyString),
});

const BooleanRecordSchema = Schema.Record(Schema.String, Schema.Boolean);

const ConditionalSeasonalityReferenceCaseSchema = Schema.Struct({
  kind: Schema.Literal("conditional-seasonality-features"),
  id: Schema.NonEmptyString,
  timestamps: Schema.Array(CanonicalTimestamp),
  seasonalities: Schema.Array(ConditionalSeasonalityDefinitionSchema),
  conditionRows: Schema.Array(BooleanRecordSchema),
  coefficients: Schema.Array(Schema.Finite),
  expected: Schema.Struct({
    rowCount: Schema.Natural,
    columnCount: Schema.Natural,
    ungatedFeaturesRowMajor: Schema.Array(Schema.Finite),
    gatedFeaturesRowMajor: Schema.Array(Schema.Finite),
    componentsRowMajor: Schema.Array(Schema.Finite),
  }),
  tolerance: NumericToleranceSchema,
  note: Schema.NonEmptyString,
}).check(
  Schema.makeFilter((referenceCase) => {
    const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];

    const rowCount = referenceCase.timestamps.length;

    const columnCount = referenceCase.seasonalities.reduce(
      (count, seasonality) => count + seasonality.fourierOrder * 2,
      0,
    );

    const conditionNames = new Set(
      referenceCase.seasonalities.flatMap((seasonality) =>
        seasonality.conditionName === undefined ? [] : [seasonality.conditionName],
      ),
    );

    if (
      referenceCase.expected.rowCount !== rowCount ||
      referenceCase.conditionRows.length !== rowCount
    ) {
      issues.push({ path: ["expected", "rowCount"], issue: "Conditional rows must align" });
    }

    if (
      referenceCase.expected.columnCount !== columnCount ||
      referenceCase.coefficients.length !== columnCount
    ) {
      issues.push({
        path: ["expected", "columnCount"],
        issue: "Conditional Fourier columns and coefficients must align",
      });
    }

    for (const field of ["ungatedFeaturesRowMajor", "gatedFeaturesRowMajor"] as const) {
      if (referenceCase.expected[field].length !== rowCount * columnCount) {
        issues.push({
          path: ["expected", field],
          issue: "Conditional feature matrix is misaligned",
        });
      }
    }

    if (
      referenceCase.expected.componentsRowMajor.length !==
      rowCount * referenceCase.seasonalities.length
    ) {
      issues.push({
        path: ["expected", "componentsRowMajor"],
        issue: "Conditional components are misaligned",
      });
    }

    for (const [row, conditions] of referenceCase.conditionRows.entries()) {
      const provided = new Set(Object.keys(conditions));

      if (
        provided.size !== conditionNames.size ||
        Array.from(conditionNames).some((name) => !provided.has(name))
      ) {
        issues.push({
          path: ["conditionRows", row],
          issue: "Condition rows must contain exactly the configured condition names",
        });
      }
    }

    return issues;
  }),
);

const ConditionalSeasonalityReferenceFileSchema = Schema.Struct({
  cases: Schema.NonEmptyArray(ConditionalSeasonalityReferenceCaseSchema),
});

const PiecewiseLinearReferenceCaseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: Schema.Literal("fixed-piecewise-linear"),
  observations: Schema.NonEmptyArray(ObservationSchema),
  predictionTimestamps: Schema.Array(CanonicalTimestamp),
  changepointTimestamps: Schema.Array(CanonicalTimestamp),
  seasonalities: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      periodDays: PositiveFinite,
      fourierOrder: Schema.Int.check(Schema.isGreaterThan(0)),
      priorScale: PositiveFinite,
    }),
  ),
  parameters: Schema.Struct({
    intercept: Schema.Finite,
    slope: Schema.Finite,
    timeOrigin: Schema.Int,
    timeScale: Schema.Int.check(Schema.isGreaterThan(0)),
    deltas: Schema.Array(Schema.Finite),
    seasonalCoefficients: Schema.Array(Schema.Finite),
  }),
  expected: Schema.Struct({
    scaledTrainingTimes: Schema.Array(Schema.Finite),
    scaledPredictionTimes: Schema.Array(Schema.Finite),
    scaledChangepointTimes: Schema.Array(Schema.Finite),
    featuresRowMajor: Schema.Array(Schema.Finite),
    trend: Schema.Array(Schema.Finite),
    seasonalComponentsRowMajor: Schema.Array(Schema.Finite),
    additive: Schema.Array(Schema.Finite),
    value: Schema.Array(Schema.Finite),
  }),
  tolerance: NumericToleranceSchema,
}).check(
  Schema.makeFilter((referenceCase) => {
    const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];
    const predictionCount = referenceCase.predictionTimestamps.length;
    const changepointCount = referenceCase.changepointTimestamps.length;
    const componentCount = referenceCase.seasonalities.length;

    const coefficientCount = referenceCase.seasonalities.reduce(
      (count, seasonality) => count + seasonality.fourierOrder * 2,
      0,
    );

    if (referenceCase.expected.scaledTrainingTimes.length !== referenceCase.observations.length) {
      issues.push({
        path: ["expected", "scaledTrainingTimes"],
        issue: "Scaled training times must align with observations",
      });
    }

    if (
      referenceCase.expected.scaledPredictionTimes.length !== predictionCount ||
      referenceCase.expected.trend.length !== predictionCount ||
      referenceCase.expected.additive.length !== predictionCount ||
      referenceCase.expected.value.length !== predictionCount
    ) {
      issues.push({
        path: ["expected"],
        issue: "Piecewise prediction arrays must align with prediction timestamps",
      });
    }

    if (
      referenceCase.parameters.deltas.length !== changepointCount ||
      referenceCase.expected.scaledChangepointTimes.length !== changepointCount
    ) {
      issues.push({
        path: ["parameters", "deltas"],
        issue: "Changepoint timestamps, scaled times, and deltas must align",
      });
    }

    if (referenceCase.parameters.seasonalCoefficients.length !== coefficientCount) {
      issues.push({
        path: ["parameters", "seasonalCoefficients"],
        issue: "Seasonal coefficients must align with the ordered seasonality layout",
      });
    }

    if (referenceCase.expected.featuresRowMajor.length !== predictionCount * coefficientCount) {
      issues.push({
        path: ["expected", "featuresRowMajor"],
        issue: "Piecewise Fourier features must match the declared matrix dimensions",
      });
    }

    if (
      referenceCase.expected.seasonalComponentsRowMajor.length !==
      predictionCount * componentCount
    ) {
      issues.push({
        path: ["expected", "seasonalComponentsRowMajor"],
        issue: "Seasonal components must align with prediction timestamps and definitions",
      });
    }

    const firstObservation = referenceCase.observations[0];
    const lastObservation = referenceCase.observations.at(-1);

    for (const [index, changepoint] of referenceCase.changepointTimestamps.entries()) {
      const previous = referenceCase.changepointTimestamps[index - 1];
      const scaled = referenceCase.expected.scaledChangepointTimes[index];

      if (previous !== undefined && changepoint <= previous) {
        issues.push({
          path: ["changepointTimestamps", index],
          issue: "Changepoint timestamps must be strictly increasing",
        });
      }

      if (
        firstObservation !== undefined &&
        lastObservation !== undefined &&
        (changepoint < firstObservation.timestamp || changepoint > lastObservation.timestamp)
      ) {
        issues.push({
          path: ["changepointTimestamps", index],
          issue: "Changepoint timestamps must be inside the inclusive training range",
        });
      }

      if (scaled !== undefined && (scaled < 0 || scaled > 1)) {
        issues.push({
          path: ["expected", "scaledChangepointTimes", index],
          issue: "Scaled changepoint times must be inside the inclusive unit interval",
        });
      }
    }

    return issues;
  }),
);

const PiecewiseLinearReferenceFileSchema = Schema.Struct({
  cases: Schema.NonEmptyArray(PiecewiseLinearReferenceCaseSchema),
}).check(
  Schema.makeFilter((fixture) => {
    const identifiers = new Set<string>();

    for (const [index, referenceCase] of fixture.cases.entries()) {
      if (identifiers.has(referenceCase.id)) {
        return {
          path: ["cases", index, "id"],
          issue: "Piecewise-linear reference case IDs must be unique",
        };
      }

      identifiers.add(referenceCase.id);
    }
  }),
);

const ChangepointResolutionReferenceCaseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: Schema.Literal("changepoint-resolution"),
  trainingTimestamps: Schema.NonEmptyArray(CanonicalTimestamp),
  controls: Schema.Struct({
    count: Schema.Natural,
    range: Schema.Finite.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(1)),
  }),
  expectedSelectedIndexes: Schema.Array(Schema.Natural),
  expectedSelectedTimestamps: Schema.Array(CanonicalTimestamp),
  note: Schema.NonEmptyString,
}).check(
  Schema.makeFilter((referenceCase) => {
    if (
      referenceCase.expectedSelectedIndexes.length !==
      referenceCase.expectedSelectedTimestamps.length
    ) {
      return {
        path: ["expectedSelectedIndexes"],
        issue: "Selected changepoint indexes and timestamps must align",
      };
    }

    for (const [selected, index] of referenceCase.expectedSelectedIndexes.entries()) {
      if (
        index >= referenceCase.trainingTimestamps.length ||
        referenceCase.trainingTimestamps[index] !==
          referenceCase.expectedSelectedTimestamps[selected]
      ) {
        return {
          path: ["expectedSelectedIndexes", selected],
          issue: "Selected changepoint indexes must identify the expected training timestamps",
        };
      }
    }
  }),
);

const ChangepointResolutionReferenceFileSchema = Schema.Struct({
  cases: Schema.NonEmptyArray(ChangepointResolutionReferenceCaseSchema),
});

const LinearMapFitReferenceCaseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: Schema.Literal("fitted-linear-map"),
  observations: Schema.NonEmptyArray(ObservationSchema),
  predictionTimestamps: Schema.NonEmptyArray(CanonicalTimestamp),
  changepointTimestamps: Schema.NonEmptyArray(CanonicalTimestamp),
  settings: Schema.Struct({
    algorithm: Schema.NonEmptyString,
    changepointPriorScale: PositiveFinite,
    densityConvention: Schema.NonEmptyString,
    timeOrigin: Schema.Int,
    timeScale: Schema.Int.check(Schema.isGreaterThan(0)),
    valueScale: PositiveFinite,
  }),
  expected: Schema.Struct({
    intercept: Schema.Finite,
    slope: Schema.Finite,
    deltas: Schema.Array(Schema.Finite),
    noiseScale: PositiveFinite,
    trend: Schema.Array(Schema.Finite),
  }),
  tolerance: Schema.Struct({
    coefficientAbsolute: NonNegativeFinite,
    forecastAbsolute: NonNegativeFinite,
    noiseAbsolute: NonNegativeFinite,
  }),
}).check(
  Schema.makeFilter((referenceCase) => {
    if (referenceCase.expected.deltas.length !== referenceCase.changepointTimestamps.length) {
      return {
        path: ["expected", "deltas"],
        issue: "Fitted deltas must align with changepoints",
      };
    }

    if (referenceCase.expected.trend.length !== referenceCase.predictionTimestamps.length) {
      return {
        path: ["expected", "trend"],
        issue: "Fitted trend must align with prediction timestamps",
      };
    }
  }),
);

const LinearMapFitReferenceFileSchema = Schema.Struct({
  cases: Schema.NonEmptyArray(LinearMapFitReferenceCaseSchema),
});

const ConditionalMapObservationSchema = Schema.Struct({
  timestamp: CanonicalTimestamp,
  value: Schema.Finite,
  conditions: BooleanRecordSchema,
  regressors: Schema.optionalKey(Schema.Record(Schema.String, Schema.Finite)),
});

const ConditionalMapPredictionRowSchema = Schema.Struct({
  timestamp: CanonicalTimestamp,
  conditions: BooleanRecordSchema,
  regressors: Schema.optionalKey(Schema.Record(Schema.String, Schema.Finite)),
});

const ConditionalMapFitReferenceCaseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: Schema.Literal("conditional-map-fit"),
  observations: Schema.NonEmptyArray(ConditionalMapObservationSchema),
  predictionRows: Schema.NonEmptyArray(ConditionalMapPredictionRowSchema),
  seasonalities: Schema.NonEmptyArray(ConditionalSeasonalityDefinitionSchema),
  events: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      date: Schema.String.check(
        Schema.makeFilter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
          expected: "a canonical calendar date",
        }),
      ),
      priorScale: PositiveFinite,
    }),
  ),
  regressors: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      priorScale: PositiveFinite,
      standardization: Schema.Literals(["auto", "always", "never"]),
    }),
  ),
  settings: Schema.Struct({
    algorithm: Schema.NonEmptyString,
    changepointPriorScale: PositiveFinite,
    changepointTimestamps: Schema.Array(CanonicalTimestamp),
    densityConvention: Schema.NonEmptyString,
  }),
  expected: Schema.Struct({
    additive: Schema.Array(Schema.Finite),
    componentNames: Schema.Array(Schema.NonEmptyString),
    componentsRowMajor: Schema.Array(Schema.Finite),
    featureColumnNames: Schema.Array(Schema.NonEmptyString),
    featurePriorScales: Schema.Array(PositiveFinite),
    featuresRowMajor: Schema.Array(Schema.Finite),
    noiseScale: PositiveFinite,
    observationUnitCoefficients: Schema.Array(Schema.Finite),
    trend: Schema.Array(Schema.Finite),
    value: Schema.Array(Schema.Finite),
  }),
  tolerance: Schema.Struct({
    componentAbsolute: NonNegativeFinite,
    featureAbsolute: NonNegativeFinite,
    forecastAbsolute: NonNegativeFinite,
  }),
}).check(
  Schema.makeFilter((referenceCase) => {
    const issues: Array<{ readonly path: ReadonlyArray<PropertyKey>; readonly issue: string }> = [];
    const rowCount = referenceCase.predictionRows.length;
    const componentCount = referenceCase.expected.componentNames.length;
    const featureCount = referenceCase.expected.featureColumnNames.length;

    if (
      referenceCase.expected.additive.length !== rowCount ||
      referenceCase.expected.trend.length !== rowCount ||
      referenceCase.expected.value.length !== rowCount
    ) {
      issues.push({ path: ["expected"], issue: "Conditional MAP forecasts must align to rows" });
    }

    if (referenceCase.expected.componentsRowMajor.length !== rowCount * componentCount) {
      issues.push({
        path: ["expected", "componentsRowMajor"],
        issue: "Conditional MAP components must align to rows and names",
      });
    }

    if (
      referenceCase.expected.featuresRowMajor.length !== rowCount * featureCount ||
      referenceCase.expected.featurePriorScales.length !== featureCount ||
      referenceCase.expected.observationUnitCoefficients.length !== featureCount
    ) {
      issues.push({
        path: ["expected", "featuresRowMajor"],
        issue: "Conditional MAP feature metadata must align",
      });
    }

    return issues;
  }),
);

const ConditionalMapFitReferenceFileSchema = Schema.Struct({
  cases: Schema.NonEmptyArray(ConditionalMapFitReferenceCaseSchema),
});

const EncodedBuiltInSettingSchema = Schema.Union([
  Schema.Literals(["off", "auto"]),
  Schema.Struct({
    mode: Schema.Literal("on"),
    fourierOrder: Schema.optionalKey(Schema.Int.check(Schema.isGreaterThan(0))),
  }),
]);

const BuiltInControlsSchema = Schema.Struct({
  daily: EncodedBuiltInSettingSchema,
  weekly: EncodedBuiltInSettingSchema,
  yearly: EncodedBuiltInSettingSchema,
});

const UpstreamBuiltInControlsSchema = Schema.Struct({
  daily: Schema.Union([
    Schema.Literal("auto"),
    Schema.Boolean,
    Schema.Int.check(Schema.isGreaterThan(0)),
  ]),
  weekly: Schema.Union([
    Schema.Literal("auto"),
    Schema.Boolean,
    Schema.Int.check(Schema.isGreaterThan(0)),
  ]),
  yearly: Schema.Union([
    Schema.Literal("auto"),
    Schema.Boolean,
    Schema.Int.check(Schema.isGreaterThan(0)),
  ]),
});

const ResolvedSeasonalitySchema = Schema.Struct({
  name: Schema.Literals(["yearly", "weekly", "daily"]),
  periodDays: PositiveFinite,
  fourierOrder: Schema.Int.check(Schema.isGreaterThan(0)),
  priorScale: PositiveFinite,
});

const MappedCustomSeasonalitySchema = Schema.Struct({
  name: Schema.NonEmptyString,
  periodDays: PositiveFinite,
  fourierOrder: Schema.Int.check(Schema.isGreaterThan(0)),
  priorScale: PositiveFinite,
});

const SeasonalityResolutionReferenceCaseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: Schema.Literal("seasonality-resolution"),
  trainingTimestamps: Schema.NonEmptyArray(CanonicalTimestamp),
  upstreamControls: UpstreamBuiltInControlsSchema,
  configurationMapping: Schema.Struct({
    effectProphetBuiltIns: BuiltInControlsSchema,
    effectProphetCustomSeasonalities: Schema.Array(MappedCustomSeasonalitySchema),
    note: Schema.NonEmptyString,
  }),
  expectedEnabled: Schema.Array(ResolvedSeasonalitySchema),
});

const SeasonalityResolutionReferenceFileSchema = Schema.Struct({
  cases: Schema.NonEmptyArray(SeasonalityResolutionReferenceCaseSchema),
}).check(
  Schema.makeFilter((fixture) => {
    const identifiers = new Set<string>();

    for (const [index, referenceCase] of fixture.cases.entries()) {
      if (identifiers.has(referenceCase.id)) {
        return {
          path: ["cases", index, "id"],
          issue: "Seasonality-resolution reference case IDs must be unique",
        };
      }

      identifiers.add(referenceCase.id);
    }
  }),
);

const TargetScalingModeSchema = Schema.Literals(["absmax", "minmax"]);

const NumericRecordSchema = Schema.Record(Schema.String, Schema.Finite);

const TargetScalingPreprocessingCaseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: Schema.Literal("target-scaling-preprocessing"),
  mode: TargetScalingModeSchema,
  values: Schema.NonEmptyArray(Schema.Finite),
  expected: Schema.Struct({
    offset: Schema.Finite,
    scale: PositiveFinite,
    scaledValues: Schema.NonEmptyArray(Schema.Finite),
  }),
  tolerance: NumericToleranceSchema,
}).check(
  Schema.makeFilter((referenceCase) => {
    if (referenceCase.values.length !== referenceCase.expected.scaledValues.length) {
      return {
        path: ["expected", "scaledValues"],
        issue: "Scaled target values must align with source values",
      };
    }
  }),
);

const TargetScalingFittedCaseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: Schema.Literal("target-scaling-fitted-map"),
  growth: Schema.Literals(["flat", "linear"]),
  mode: TargetScalingModeSchema,
  observations: Schema.NonEmptyArray(
    Schema.Struct({
      timestamp: CanonicalTimestamp,
      value: Schema.Finite,
      regressors: Schema.optionalKey(NumericRecordSchema),
    }),
  ),
  predictionRows: Schema.NonEmptyArray(
    Schema.Struct({
      timestamp: CanonicalTimestamp,
      regressors: Schema.optionalKey(NumericRecordSchema),
    }),
  ),
  changepointTimestamps: Schema.Array(CanonicalTimestamp),
  seasonalities: Schema.Array(ConditionalSeasonalityDefinitionSchema),
  events: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      date: Schema.NonEmptyString,
      priorScale: PositiveFinite,
    }),
  ),
  regressors: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      priorScale: PositiveFinite,
      standardization: Schema.Literals(["auto", "always", "never"]),
    }),
  ),
  settings: Schema.Struct({ changepointPriorScale: PositiveFinite }),
  expected: Schema.Struct({
    offset: Schema.Finite,
    scale: PositiveFinite,
    trend: Schema.NonEmptyArray(Schema.Finite),
    additive: Schema.NonEmptyArray(Schema.Finite),
    value: Schema.NonEmptyArray(Schema.Finite),
  }),
  tolerance: NumericToleranceSchema,
}).check(
  Schema.makeFilter((referenceCase) => {
    const predictionCount = referenceCase.predictionRows.length;

    if (
      referenceCase.expected.trend.length !== predictionCount ||
      referenceCase.expected.additive.length !== predictionCount ||
      referenceCase.expected.value.length !== predictionCount
    ) {
      return {
        path: ["expected"],
        issue: "Fitted scaling predictions must align with prediction rows",
      };
    }
  }),
);

const TargetScalingReferenceFileSchema = Schema.Struct({
  preprocessingCases: Schema.NonEmptyArray(TargetScalingPreprocessingCaseSchema),
  fittedCases: Schema.NonEmptyArray(TargetScalingFittedCaseSchema),
});

const ComponentModeSchema = Schema.Literals(["additive", "multiplicative"]);

const MixedMapIndependentCaseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: Schema.Literal("mixed-map-independent"),
  rowCount: Schema.Int.check(Schema.isGreaterThan(0)),
  columnCount: Schema.Int.check(Schema.isGreaterThan(0)),
  designRowMajor: Schema.Array(Schema.Finite),
  modes: Schema.Array(ComponentModeSchema),
  beta: Schema.Array(Schema.Finite),
  priorScales: Schema.Array(PositiveFinite),
  scaledTrend: Schema.Array(Schema.Finite),
  scaledTarget: Schema.Array(Schema.Finite),
  sigma: PositiveFinite,
  targetScaling: Schema.Struct({
    mode: TargetScalingModeSchema,
    offset: Schema.Finite,
    scale: PositiveFinite,
  }),
  expected: Schema.Struct({
    additiveScaled: Schema.Array(Schema.Finite),
    betaGradient: Schema.Array(Schema.Finite),
    factor: Schema.Array(Schema.Finite),
    likelihoodMean: Schema.Array(Schema.Finite),
    objective: Schema.Finite,
    publicAdditive: Schema.Array(Schema.Finite),
    publicTrend: Schema.Array(Schema.Finite),
    publicValue: Schema.Array(Schema.Finite),
  }),
  tolerance: NumericToleranceSchema,
}).check(
  Schema.makeFilter((referenceCase) => {
    const rowCount = referenceCase.rowCount;
    const columnCount = referenceCase.columnCount;

    if (
      referenceCase.designRowMajor.length !== rowCount * columnCount ||
      referenceCase.modes.length !== columnCount ||
      referenceCase.beta.length !== columnCount ||
      referenceCase.priorScales.length !== columnCount ||
      referenceCase.expected.betaGradient.length !== columnCount
    ) {
      return { path: ["designRowMajor"], issue: "Mixed objective columns must align" };
    }

    for (const field of [
      "scaledTrend",
      "scaledTarget",
      "additiveScaled",
      "factor",
      "likelihoodMean",
      "publicAdditive",
      "publicTrend",
      "publicValue",
    ] as const) {
      const values =
        field === "scaledTrend" || field === "scaledTarget"
          ? referenceCase[field]
          : referenceCase.expected[field];

      if (values.length !== rowCount) {
        return { path: [field], issue: "Mixed objective rows must align" };
      }
    }
  }),
);

const MixedMapFittedCaseSchema = Schema.Struct({
  id: Schema.NonEmptyString,
  kind: Schema.Literal("mixed-map-fitted"),
  growth: Schema.Literals(["flat", "linear"]),
  scaling: TargetScalingModeSchema,
  observations: Schema.NonEmptyArray(
    Schema.Struct({
      timestamp: CanonicalTimestamp,
      value: Schema.Finite,
      conditions: BooleanRecordSchema,
      regressors: NumericRecordSchema,
    }),
  ),
  predictionRows: Schema.NonEmptyArray(
    Schema.Struct({
      timestamp: CanonicalTimestamp,
      conditions: BooleanRecordSchema,
      regressors: NumericRecordSchema,
    }),
  ),
  seasonalities: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      periodDays: PositiveFinite,
      fourierOrder: Schema.Int.check(Schema.isGreaterThan(0)),
      priorScale: PositiveFinite,
      conditionName: Schema.optionalKey(Schema.NonEmptyString),
      mode: ComponentModeSchema,
    }),
  ),
  events: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      date: Schema.NonEmptyString,
      priorScale: PositiveFinite,
      mode: ComponentModeSchema,
    }),
  ),
  regressors: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      priorScale: PositiveFinite,
      standardization: Schema.Literals(["auto", "always", "never"]),
      mode: ComponentModeSchema,
    }),
  ),
  settings: Schema.Struct({
    algorithm: Schema.Literal("Newton"),
    changepointPriorScale: PositiveFinite,
    densityConvention: Schema.NonEmptyString,
    offset: Schema.Finite,
    scale: PositiveFinite,
  }),
  expected: Schema.Struct({
    featureColumnNames: Schema.Array(Schema.NonEmptyString),
    featureModes: Schema.Array(ComponentModeSchema),
    featurePriorScales: Schema.Array(PositiveFinite),
    trainingFeaturesRowMajor: Schema.Array(Schema.Finite),
    featuresRowMajor: Schema.Array(Schema.Finite),
    intercept: Schema.Finite,
    slope: Schema.Finite,
    deltas: Schema.Array(Schema.Finite),
    changepointTimestamps: Schema.Array(CanonicalTimestamp),
    coefficients: Schema.Array(Schema.Finite),
    noiseScale: PositiveFinite,
    scaledLikelihoodMean: Schema.Array(Schema.Finite),
    componentNames: Schema.Array(Schema.NonEmptyString),
    componentsRowMajor: Schema.Array(Schema.Finite),
    trend: Schema.Array(Schema.Finite),
    additive: Schema.Array(Schema.Finite),
    multiplicative: Schema.Array(Schema.Finite),
    value: Schema.Array(Schema.Finite),
  }),
  tolerance: Schema.Struct({
    coefficientAbsolute: NonNegativeFinite,
    componentAbsolute: NonNegativeFinite,
    forecastAbsolute: NonNegativeFinite,
  }),
}).check(
  Schema.makeFilter((referenceCase) => {
    const featureCount = referenceCase.expected.featureColumnNames.length;
    const predictionCount = referenceCase.predictionRows.length;
    const componentCount = referenceCase.expected.componentNames.length;

    if (
      referenceCase.expected.featureModes.length !== featureCount ||
      referenceCase.expected.featurePriorScales.length !== featureCount ||
      referenceCase.expected.coefficients.length !== featureCount ||
      referenceCase.expected.trainingFeaturesRowMajor.length !==
        referenceCase.observations.length * featureCount ||
      referenceCase.expected.featuresRowMajor.length !== predictionCount * featureCount
    ) {
      return { path: ["expected", "featuresRowMajor"], issue: "Mixed feature columns must align" };
    }

    if (
      referenceCase.expected.componentsRowMajor.length !== predictionCount * componentCount ||
      referenceCase.expected.deltas.length !==
        referenceCase.expected.changepointTimestamps.length ||
      referenceCase.expected.trend.length !== predictionCount ||
      referenceCase.expected.additive.length !== predictionCount ||
      referenceCase.expected.multiplicative.length !== predictionCount ||
      referenceCase.expected.value.length !== predictionCount ||
      referenceCase.expected.scaledLikelihoodMean.length !== referenceCase.observations.length
    ) {
      return { path: ["expected"], issue: "Mixed fitted rows and components must align" };
    }
  }),
);

const MixedMapReferenceFileSchema = Schema.Struct({
  independentCases: Schema.NonEmptyArray(MixedMapIndependentCaseSchema),
  fittedCases: Schema.NonEmptyArray(MixedMapFittedCaseSchema),
});

const ArtifactPath = Schema.String.check(
  Schema.makeFilter(
    (value) =>
      value.length > 0 &&
      !value.includes("\\") &&
      !nodePath.posix.isAbsolute(value) &&
      nodePath.posix.normalize(value) === value &&
      value !== ".." &&
      !value.startsWith("../"),
    { expected: "a normalized fixture-folder-relative path" },
  ),
);

const ArtifactSchema = Schema.Struct({
  path: ArtifactPath,
  sha256: Sha256,
});

const FixtureManifestSchema = Schema.Struct({
  prophetVersion: Schema.Literal("1.4.0"),
  prophetSourceCommit: GitCommit,
  pythonVersion: Schema.NonEmptyString,
  generatorRevision: Sha256,
  dependencyLockSha256: Sha256,
  executionEnvironment: Schema.Struct({
    baseImage: Schema.NonEmptyString,
    platform: Schema.Literal("linux/amd64"),
    uvVersion: Schema.NonEmptyString,
  }),
  numericalEnvironment: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      version: Schema.NonEmptyString,
    }),
  ),
  backendArtifacts: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      version: Schema.NonEmptyString,
      sha256: Sha256,
    }),
  ),
  artifacts: Schema.NonEmptyArray(ArtifactSchema),
}).check(
  Schema.makeFilter((manifest) => {
    const paths = new Set<string>();

    for (const [index, artifact] of manifest.artifacts.entries()) {
      if (paths.has(artifact.path)) {
        return {
          path: ["artifacts", index, "path"],
          issue: "Manifest artifact paths must be unique",
        };
      }

      paths.add(artifact.path);
    }

    for (const requiredPath of [
      "linear-trend.json",
      "fourier.json",
      "piecewise-linear.json",
      "changepoint-resolution.json",
      "linear-map-fit.json",
      "seasonality-resolution.json",
      "conditional-seasonality.json",
      "conditional-map-fit.json",
      "target-scaling.json",
      "mixed-map.json",
    ]) {
      if (!paths.has(requiredPath)) {
        return {
          path: ["artifacts"],
          issue: `Manifest must declare ${requiredPath}`,
        };
      }
    }
  }),
);

const decodeLinearTrendReferenceSchema = Schema.decodeUnknownEffect(
  LinearTrendReferenceFileSchema,
  { errors: "all" },
);

const decodeFourierReferenceSchema = Schema.decodeUnknownEffect(FourierReferenceFileSchema, {
  errors: "all",
});

const decodeConditionalSeasonalityReferenceSchema = Schema.decodeUnknownEffect(
  ConditionalSeasonalityReferenceFileSchema,
  { errors: "all" },
);

const decodePiecewiseLinearReferenceSchema = Schema.decodeUnknownEffect(
  PiecewiseLinearReferenceFileSchema,
  { errors: "all" },
);

const decodeChangepointResolutionReferenceSchema = Schema.decodeUnknownEffect(
  ChangepointResolutionReferenceFileSchema,
  { errors: "all" },
);

const decodeLinearMapFitReferenceSchema = Schema.decodeUnknownEffect(
  LinearMapFitReferenceFileSchema,
  { errors: "all" },
);

const decodeSeasonalityResolutionReferenceSchema = Schema.decodeUnknownEffect(
  SeasonalityResolutionReferenceFileSchema,
  { errors: "all" },
);

const decodeConditionalMapFitReferenceSchema = Schema.decodeUnknownEffect(
  ConditionalMapFitReferenceFileSchema,
  { errors: "all" },
);

const decodeTargetScalingReferenceSchema = Schema.decodeUnknownEffect(
  TargetScalingReferenceFileSchema,
  { errors: "all" },
);

const decodeMixedMapReferenceSchema = Schema.decodeUnknownEffect(MixedMapReferenceFileSchema, {
  errors: "all",
});

const decodeFixtureManifestSchema = Schema.decodeUnknownEffect(FixtureManifestSchema, {
  errors: "all",
});

const formatSchemaIssue = SchemaIssue.makeFormatterDefault();

/** A parsed tolerance used for absolute-plus-relative numerical comparisons. */
export type NumericTolerance = typeof NumericToleranceSchema.Type;

/** A parsed fixed-parameter Prophet linear-trend reference case. */
export type LinearTrendReferenceCase = typeof LinearTrendReferenceCaseSchema.Type;

/** A parsed collection of uniquely identified linear-trend reference cases. */
export type LinearTrendReferenceFile = typeof LinearTrendReferenceFileSchema.Type;

/** A parsed fixed-parameter Prophet Fourier reference case. */
export type FourierReferenceCase = typeof FourierReferenceCaseSchema.Type;

/** A parsed collection of Prophet Fourier reference cases. */
export type FourierReferenceFile = typeof FourierReferenceFileSchema.Type;

/** A parsed fixed-parameter conditional-seasonality feature case. */
export type ConditionalSeasonalityReferenceCase =
  typeof ConditionalSeasonalityReferenceCaseSchema.Type;

/** A parsed collection of conditional-seasonality feature cases. */
export type ConditionalSeasonalityReferenceFile =
  typeof ConditionalSeasonalityReferenceFileSchema.Type;

/** A parsed fixed-parameter piecewise-linear and Fourier composition case. */
export type PiecewiseLinearReferenceCase = typeof PiecewiseLinearReferenceCaseSchema.Type;

/** A parsed collection of Prophet piecewise-linear reference cases. */
export type PiecewiseLinearReferenceFile = typeof PiecewiseLinearReferenceFileSchema.Type;

/** A parsed automatic changepoint-resolution reference case. */
export type ChangepointResolutionReferenceCase =
  typeof ChangepointResolutionReferenceCaseSchema.Type;

/** A parsed collection of automatic changepoint-resolution cases. */
export type ChangepointResolutionReferenceFile =
  typeof ChangepointResolutionReferenceFileSchema.Type;

/** A parsed fitted linear MAP reference case. */
export type LinearMapFitReferenceCase = typeof LinearMapFitReferenceCaseSchema.Type;

/** A parsed collection of fitted linear MAP reference cases. */
export type LinearMapFitReferenceFile = typeof LinearMapFitReferenceFileSchema.Type;

/** A parsed fitted conditional MAP reference case. */
export type ConditionalMapFitReferenceCase = typeof ConditionalMapFitReferenceCaseSchema.Type;

/** A parsed collection of fitted conditional MAP cases. */
export type ConditionalMapFitReferenceFile = typeof ConditionalMapFitReferenceFileSchema.Type;

/** A parsed Prophet built-in seasonality-resolution reference case. */
export type SeasonalityResolutionReferenceCase =
  typeof SeasonalityResolutionReferenceCaseSchema.Type;

/** A parsed collection of Prophet seasonality-resolution reference cases. */
export type SeasonalityResolutionReferenceFile =
  typeof SeasonalityResolutionReferenceFileSchema.Type;

/** Parsed Prophet target-scaling preprocessing and fitted MAP evidence. */
export type TargetScalingReferenceFile = typeof TargetScalingReferenceFileSchema.Type;

/** Parsed independent and Prophet-fitted mixed MAP evidence. */
export type MixedMapReferenceFile = typeof MixedMapReferenceFileSchema.Type;

/** Parsed provenance and artifact integrity metadata for the fixture folder. */
export type FixtureManifest = typeof FixtureManifestSchema.Type;

/** An expected filesystem, JSON, schema, or integrity failure in test fixture infrastructure. */
export class FixtureLoadError extends Schema.TaggedError<FixtureLoadError>()("FixtureLoadError", {
  operation: Schema.Literals(["read", "json", "schema", "integrity"]),
  fixturePath: Schema.String,
  message: Schema.String,
  cause: Schema.Unknown,
}) {}

const readFixtureText = Effect.fn("ProphetFixture.readText")(function* (
  path: string,
): Effect.fn.Return<string, FixtureLoadError> {
  return yield* Effect.tryPromise({
    try: () => readFile(path, "utf8"),
    catch: (cause) =>
      new FixtureLoadError({
        operation: "read",
        fixturePath: path,
        message: `Unable to read Prophet fixture ${path}`,
        cause,
      }),
  });
});

const invalidJson = (path: string, cause: unknown): FixtureLoadError =>
  new FixtureLoadError({
    operation: "json",
    fixturePath: path,
    message: `Prophet fixture is not valid JSON: ${path}`,
    cause,
  });

/** Parse an untrusted linear-trend fixture payload with all cross-field checks. */
export const decodeLinearTrendReference = Effect.fn("ProphetFixture.decodeLinearTrendReference")(
  function* (
    input: Parameters<typeof decodeLinearTrendReferenceSchema>[0],
    path = "<memory>",
  ): Effect.fn.Return<LinearTrendReferenceFile, FixtureLoadError> {
    return yield* decodeLinearTrendReferenceSchema(input).pipe(
      Effect.mapError(
        (cause) =>
          new FixtureLoadError({
            operation: "schema",
            fixturePath: path,
            message: formatSchemaIssue(cause.issue),
            cause,
          }),
      ),
    );
  },
);

/** Parse an untrusted Fourier fixture payload with matrix-alignment checks. */
export const decodeFourierReference = Effect.fn("ProphetFixture.decodeFourierReference")(function* (
  input: Parameters<typeof decodeFourierReferenceSchema>[0],
  path = "<memory>",
): Effect.fn.Return<FourierReferenceFile, FixtureLoadError> {
  return yield* decodeFourierReferenceSchema(input).pipe(
    Effect.mapError(
      (cause) =>
        new FixtureLoadError({
          operation: "schema",
          fixturePath: path,
          message: formatSchemaIssue(cause.issue),
          cause,
        }),
    ),
  );
});

/** Parse untrusted conditional-seasonality fixtures with all alignment checks. */
export const decodeConditionalSeasonalityReference = Effect.fn(
  "ProphetFixture.decodeConditionalSeasonalityReference",
)(function* (
  input: Parameters<typeof decodeConditionalSeasonalityReferenceSchema>[0],
  path = "<memory>",
): Effect.fn.Return<ConditionalSeasonalityReferenceFile, FixtureLoadError> {
  return yield* decodeConditionalSeasonalityReferenceSchema(input).pipe(
    Effect.mapError(
      (cause) =>
        new FixtureLoadError({
          operation: "schema",
          fixturePath: path,
          message: formatSchemaIssue(cause.issue),
          cause,
        }),
    ),
  );
});

/** Parse untrusted piecewise-linear fixtures with all alignment checks. */
export const decodePiecewiseLinearReference = Effect.fn(
  "ProphetFixture.decodePiecewiseLinearReference",
)(function* (
  input: Parameters<typeof decodePiecewiseLinearReferenceSchema>[0],
  path = "<memory>",
): Effect.fn.Return<PiecewiseLinearReferenceFile, FixtureLoadError> {
  return yield* decodePiecewiseLinearReferenceSchema(input).pipe(
    Effect.mapError(
      (cause) =>
        new FixtureLoadError({
          operation: "schema",
          fixturePath: path,
          message: formatSchemaIssue(cause.issue),
          cause,
        }),
    ),
  );
});

/** Parse untrusted automatic changepoint-resolution fixture evidence. */
export const decodeChangepointResolutionReference = Effect.fn(
  "ProphetFixture.decodeChangepointResolutionReference",
)(function* (
  input: Parameters<typeof decodeChangepointResolutionReferenceSchema>[0],
  path = "<memory>",
): Effect.fn.Return<ChangepointResolutionReferenceFile, FixtureLoadError> {
  return yield* decodeChangepointResolutionReferenceSchema(input).pipe(
    Effect.mapError(
      (cause) =>
        new FixtureLoadError({
          operation: "schema",
          fixturePath: path,
          message: formatSchemaIssue(cause.issue),
          cause,
        }),
    ),
  );
});

/** Parse untrusted fitted linear MAP fixture evidence. */
export const decodeLinearMapFitReference = Effect.fn("ProphetFixture.decodeLinearMapFitReference")(
  function* (
    input: Parameters<typeof decodeLinearMapFitReferenceSchema>[0],
    path = "<memory>",
  ): Effect.fn.Return<LinearMapFitReferenceFile, FixtureLoadError> {
    return yield* decodeLinearMapFitReferenceSchema(input).pipe(
      Effect.mapError(
        (cause) =>
          new FixtureLoadError({
            operation: "schema",
            fixturePath: path,
            message: formatSchemaIssue(cause.issue),
            cause,
          }),
      ),
    );
  },
);

/** Parse untrusted fitted conditional MAP fixture evidence. */
export const decodeConditionalMapFitReference = Effect.fn(
  "ProphetFixture.decodeConditionalMapFitReference",
)(function* (
  input: Parameters<typeof decodeConditionalMapFitReferenceSchema>[0],
  path = "<memory>",
): Effect.fn.Return<ConditionalMapFitReferenceFile, FixtureLoadError> {
  return yield* decodeConditionalMapFitReferenceSchema(input).pipe(
    Effect.mapError(
      (cause) =>
        new FixtureLoadError({
          operation: "schema",
          fixturePath: path,
          message: formatSchemaIssue(cause.issue),
          cause,
        }),
    ),
  );
});

/** Parse untrusted seasonality-resolution fixture evidence and configuration mappings. */
export const decodeSeasonalityResolutionReference = Effect.fn(
  "ProphetFixture.decodeSeasonalityResolutionReference",
)(function* (
  input: Parameters<typeof decodeSeasonalityResolutionReferenceSchema>[0],
  path = "<memory>",
): Effect.fn.Return<SeasonalityResolutionReferenceFile, FixtureLoadError> {
  return yield* decodeSeasonalityResolutionReferenceSchema(input).pipe(
    Effect.mapError(
      (cause) =>
        new FixtureLoadError({
          operation: "schema",
          fixturePath: path,
          message: formatSchemaIssue(cause.issue),
          cause,
        }),
    ),
  );
});

/** Parse untrusted target-scaling preprocessing and fitted MAP evidence. */
export const decodeTargetScalingReference = Effect.fn(
  "ProphetFixture.decodeTargetScalingReference",
)(function* (
  input: Parameters<typeof decodeTargetScalingReferenceSchema>[0],
  path = "<memory>",
): Effect.fn.Return<TargetScalingReferenceFile, FixtureLoadError> {
  return yield* decodeTargetScalingReferenceSchema(input).pipe(
    Effect.mapError(
      (cause) =>
        new FixtureLoadError({
          operation: "schema",
          fixturePath: path,
          message: formatSchemaIssue(cause.issue),
          cause,
        }),
    ),
  );
});

/** Parse untrusted independent and fitted mixed MAP evidence. */
export const decodeMixedMapReference = Effect.fn("ProphetFixture.decodeMixedMapReference")(
  function* (
    input: Parameters<typeof decodeMixedMapReferenceSchema>[0],
    path = "<memory>",
  ): Effect.fn.Return<MixedMapReferenceFile, FixtureLoadError> {
    return yield* decodeMixedMapReferenceSchema(input).pipe(
      Effect.mapError(
        (cause) =>
          new FixtureLoadError({
            operation: "schema",
            fixturePath: path,
            message: formatSchemaIssue(cause.issue),
            cause,
          }),
      ),
    );
  },
);

/** Parse an untrusted fixture manifest, including safe relative artifact paths. */
export const decodeFixtureManifest = Effect.fn("ProphetFixture.decodeFixtureManifest")(function* (
  input: Parameters<typeof decodeFixtureManifestSchema>[0],
  path = "<memory>",
): Effect.fn.Return<FixtureManifest, FixtureLoadError> {
  return yield* decodeFixtureManifestSchema(input).pipe(
    Effect.mapError(
      (cause) =>
        new FixtureLoadError({
          operation: "schema",
          fixturePath: path,
          message: formatSchemaIssue(cause.issue),
          cause,
        }),
    ),
  );
});

const verifyArtifact = Effect.fn("ProphetFixture.verifyArtifact")(function* (
  root: string,
  artifact: FixtureManifest["artifacts"][number],
): Effect.fn.Return<void, FixtureLoadError> {
  const path = nodePath.join(root, artifact.path);

  const contents = yield* Effect.tryPromise({
    try: () => readFile(path),
    catch: (cause) =>
      new FixtureLoadError({
        operation: "read",
        fixturePath: path,
        message: `Unable to read declared Prophet fixture artifact ${path}`,
        cause,
      }),
  });

  const actual = createHash("sha256").update(contents).digest("hex");

  if (actual !== artifact.sha256) {
    return yield* Effect.fail(
      new FixtureLoadError({
        operation: "integrity",
        fixturePath: path,
        message: `Prophet fixture artifact digest does not match its manifest: ${path}`,
        cause: { actual, expected: artifact.sha256 },
      }),
    );
  }
});

/**
 * Load the committed Prophet fixture bundle and verify every declared artifact digest.
 *
 * @param root - Fixture directory, defaulting to the directory containing this module.
 * @returns Parsed provenance plus linear, piecewise, Fourier, and seasonality-policy references, or an explicit infrastructure failure.
 */
export const loadProphetFixtureBundle = Effect.fn("ProphetFixture.loadBundle")(function* (
  root = fixtureRoot,
) {
  const manifestPath = nodePath.join(root, "manifest.json");

  const manifestContents = yield* readFixtureText(manifestPath);

  const manifestInput: unknown = yield* Effect.try({
    try: () => JSON.parse(manifestContents),
    catch: (cause) => invalidJson(manifestPath, cause),
  });

  const manifest = yield* decodeFixtureManifest(manifestInput, manifestPath);

  yield* Effect.forEach(manifest.artifacts, (artifact) => verifyArtifact(root, artifact), {
    concurrency: 1,
    discard: true,
  });

  const linearTrendPath = nodePath.join(root, "linear-trend.json");

  const linearTrendContents = yield* readFixtureText(linearTrendPath);

  const linearTrendInput: unknown = yield* Effect.try({
    try: () => JSON.parse(linearTrendContents),
    catch: (cause) => invalidJson(linearTrendPath, cause),
  });

  const linearTrend = yield* decodeLinearTrendReference(linearTrendInput, linearTrendPath);
  const fourierPath = nodePath.join(root, "fourier.json");
  const fourierContents = yield* readFixtureText(fourierPath);

  const fourierInput: unknown = yield* Effect.try({
    try: () => JSON.parse(fourierContents),
    catch: (cause) => invalidJson(fourierPath, cause),
  });

  const fourier = yield* decodeFourierReference(fourierInput, fourierPath);
  const conditionalSeasonalityPath = nodePath.join(root, "conditional-seasonality.json");
  const conditionalSeasonalityContents = yield* readFixtureText(conditionalSeasonalityPath);

  const conditionalSeasonalityInput: unknown = yield* Effect.try({
    try: () => JSON.parse(conditionalSeasonalityContents),
    catch: (cause) => invalidJson(conditionalSeasonalityPath, cause),
  });

  const conditionalSeasonality = yield* decodeConditionalSeasonalityReference(
    conditionalSeasonalityInput,
    conditionalSeasonalityPath,
  );

  const piecewiseLinearPath = nodePath.join(root, "piecewise-linear.json");
  const piecewiseLinearContents = yield* readFixtureText(piecewiseLinearPath);

  const piecewiseLinearInput: unknown = yield* Effect.try({
    try: () => JSON.parse(piecewiseLinearContents),
    catch: (cause) => invalidJson(piecewiseLinearPath, cause),
  });

  const piecewiseLinear = yield* decodePiecewiseLinearReference(
    piecewiseLinearInput,
    piecewiseLinearPath,
  );

  const changepointResolutionPath = nodePath.join(root, "changepoint-resolution.json");
  const changepointResolutionContents = yield* readFixtureText(changepointResolutionPath);

  const changepointResolutionInput: unknown = yield* Effect.try({
    try: () => JSON.parse(changepointResolutionContents),
    catch: (cause) => invalidJson(changepointResolutionPath, cause),
  });

  const changepointResolution = yield* decodeChangepointResolutionReference(
    changepointResolutionInput,
    changepointResolutionPath,
  );

  const linearMapFitPath = nodePath.join(root, "linear-map-fit.json");
  const linearMapFitContents = yield* readFixtureText(linearMapFitPath);

  const linearMapFitInput: unknown = yield* Effect.try({
    try: () => JSON.parse(linearMapFitContents),
    catch: (cause) => invalidJson(linearMapFitPath, cause),
  });

  const linearMapFit = yield* decodeLinearMapFitReference(linearMapFitInput, linearMapFitPath);
  const conditionalMapFitPath = nodePath.join(root, "conditional-map-fit.json");
  const conditionalMapFitContents = yield* readFixtureText(conditionalMapFitPath);

  const conditionalMapFitInput: unknown = yield* Effect.try({
    try: () => JSON.parse(conditionalMapFitContents),
    catch: (cause) => invalidJson(conditionalMapFitPath, cause),
  });

  const conditionalMapFit = yield* decodeConditionalMapFitReference(
    conditionalMapFitInput,
    conditionalMapFitPath,
  );

  const targetScalingPath = nodePath.join(root, "target-scaling.json");
  const targetScalingContents = yield* readFixtureText(targetScalingPath);

  const targetScalingInput: unknown = yield* Effect.try({
    try: () => JSON.parse(targetScalingContents),
    catch: (cause) => invalidJson(targetScalingPath, cause),
  });

  const targetScaling = yield* decodeTargetScalingReference(targetScalingInput, targetScalingPath);

  const mixedMapPath = nodePath.join(root, "mixed-map.json");
  const mixedMapContents = yield* readFixtureText(mixedMapPath);

  const mixedMapInput: unknown = yield* Effect.try({
    try: () => JSON.parse(mixedMapContents),
    catch: (cause) => invalidJson(mixedMapPath, cause),
  });

  const mixedMap = yield* decodeMixedMapReference(mixedMapInput, mixedMapPath);

  const seasonalityResolutionPath = nodePath.join(root, "seasonality-resolution.json");
  const seasonalityResolutionContents = yield* readFixtureText(seasonalityResolutionPath);

  const seasonalityResolutionInput: unknown = yield* Effect.try({
    try: () => JSON.parse(seasonalityResolutionContents),
    catch: (cause) => invalidJson(seasonalityResolutionPath, cause),
  });

  const seasonalityResolution = yield* decodeSeasonalityResolutionReference(
    seasonalityResolutionInput,
    seasonalityResolutionPath,
  );

  return {
    changepointResolution,
    conditionalMapFit,
    conditionalSeasonality,
    fourier,
    linearMapFit,
    linearTrend,
    manifest,
    mixedMap,
    piecewiseLinear,
    seasonalityResolution,
    targetScaling,
  };
});
