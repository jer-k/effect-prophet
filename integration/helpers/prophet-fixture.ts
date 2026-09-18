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

/** A parsed Prophet built-in seasonality-resolution reference case. */
export type SeasonalityResolutionReferenceCase =
  typeof SeasonalityResolutionReferenceCaseSchema.Type;

/** A parsed collection of Prophet seasonality-resolution reference cases. */
export type SeasonalityResolutionReferenceFile =
  typeof SeasonalityResolutionReferenceFileSchema.Type;

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
    fourier,
    linearMapFit,
    linearTrend,
    manifest,
    piecewiseLinear,
    seasonalityResolution,
  };
});
