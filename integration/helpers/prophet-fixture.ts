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
 * @returns Parsed provenance plus linear, Fourier, and seasonality-policy references, or an explicit infrastructure failure.
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

  return { fourier, linearTrend, manifest, seasonalityResolution };
});
