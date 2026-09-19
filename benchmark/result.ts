import { Effect, Schema } from "effect";

import { BenchmarkPhaseSchema } from "./case.ts";

const NonEmptyString = Schema.String.check(Schema.isMinLength(1));

const NonNegativeInteger = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0));

const PositiveInteger = Schema.Int.check(Schema.isGreaterThan(0));

const NonNegativeFinite = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/** Runtime schema for the implementation names used by the benchmark protocol. */
export const BenchmarkImplementationSchema = Schema.Literals(["effect-prophet", "python-prophet"]);

/** One benchmarked public implementation. */
export type BenchmarkImplementation = typeof BenchmarkImplementationSchema.Type;

/** Runtime schema for one named environment or tool version. */
export const EnvironmentValueSchema = Schema.Struct({
  name: NonEmptyString,
  value: NonEmptyString,
});

/** Runtime schema for implementation-specific execution provenance. */
export const BenchmarkEnvironmentSchema = Schema.Struct({
  runtime: NonEmptyString,
  runtimeVersion: NonEmptyString,
  operatingSystem: NonEmptyString,
  architecture: NonEmptyString,
  processor: NonEmptyString,
  containerPlatform: NonEmptyString,
  versions: Schema.Array(EnvironmentValueSchema),
  artifactHashes: Schema.Array(EnvironmentValueSchema),
  numericalThreads: Schema.Array(EnvironmentValueSchema),
  resources: Schema.Array(EnvironmentValueSchema),
  memoryMeasurement: NonEmptyString,
});

/** Implementation-specific execution provenance. */
export type BenchmarkEnvironment = typeof BenchmarkEnvironmentSchema.Type;

/** Runtime schema for one public forecast projected into the shared correctness surface. */
export const ForecastProjectionSchema = Schema.Struct({
  timestamp: Schema.Int,
  value: Schema.Finite,
  trend: Schema.Finite,
  additive: Schema.Finite,
  seasonalities: Schema.Array(
    Schema.Struct({
      name: NonEmptyString,
      value: Schema.Finite,
    }),
  ),
});

/** One public forecast projected into the shared correctness surface. */
export type ForecastProjection = typeof ForecastProjectionSchema.Type;

/** Runtime schema for untimed correctness evidence emitted by one independent run. */
export const CorrectnessProjectionSchema = Schema.Struct({
  caseId: NonEmptyString,
  run: NonNegativeInteger,
  status: Schema.Literal("locally-passed"),
  modelKind: NonEmptyString,
  forecasts: Schema.Array(ForecastProjectionSchema),
  noiseScale: Schema.optionalKey(Schema.Finite),
  fitQuality: Schema.optionalKey(
    Schema.Array(Schema.Struct({ name: NonEmptyString, value: Schema.Finite })),
  ),
  persistenceMaximumAbsoluteError: Schema.optionalKey(NonNegativeFinite),
});

/** Untimed correctness evidence emitted by one independent run. */
export type CorrectnessProjection = typeof CorrectnessProjectionSchema.Type;

/** Runtime schema for one independently collected timing sample set. */
export const BenchmarkMeasurementSchema = Schema.Struct({
  caseId: NonEmptyString,
  implementation: BenchmarkImplementationSchema,
  phase: BenchmarkPhaseSchema,
  comparison: Schema.Literals([
    "different-objective",
    "equivalent-equation",
    "equivalent-objective",
  ]),
  evidenceId: Schema.optionalKey(NonEmptyString),
  run: NonNegativeInteger,
  samplesNanoseconds: Schema.Array(PositiveInteger).check(Schema.isMinLength(1)),
  correctness: Schema.Literal("locally-passed"),
});

/** One independently collected timing sample set. */
export type BenchmarkMeasurement = typeof BenchmarkMeasurementSchema.Type;

/** Runtime schema for an expected setup, correctness, timeout, or runtime failure. */
export const BenchmarkFailureSchema = Schema.Struct({
  caseId: NonEmptyString,
  implementation: BenchmarkImplementationSchema,
  run: NonNegativeInteger,
  stage: Schema.Literals(["setup", "correctness", "timeout", "runtime"]),
  message: NonEmptyString,
});

/** An expected setup, correctness, timeout, or runtime failure. */
export type BenchmarkFailure = typeof BenchmarkFailureSchema.Type;

/** Runtime schema for one implementation's complete raw benchmark output. */
export const ImplementationResultSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  implementation: BenchmarkImplementationSchema,
  generatedAt: NonEmptyString,
  environment: BenchmarkEnvironmentSchema,
  measurements: Schema.Array(BenchmarkMeasurementSchema),
  failures: Schema.Array(BenchmarkFailureSchema),
  correctness: Schema.Array(CorrectnessProjectionSchema),
});

/** One implementation's complete raw benchmark output. */
export type ImplementationResult = typeof ImplementationResultSchema.Type;

/** Runtime schema for host and source provenance captured before Compose execution. */
export const RunManifestSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  runId: NonEmptyString,
  createdAt: NonEmptyString,
  gitRevision: NonEmptyString,
  gitDirty: Schema.Boolean,
  hostPlatform: NonEmptyString,
  hostArchitecture: NonEmptyString,
  containerPlatform: NonEmptyString,
  emulated: Schema.Boolean,
  selectedCases: Schema.Array(NonEmptyString),
  commands: Schema.Array(NonEmptyString),
  inputHashes: Schema.Array(EnvironmentValueSchema),
  containerImages: Schema.Array(EnvironmentValueSchema),
});

/** Host and source provenance captured before Compose execution. */
export type RunManifest = typeof RunManifestSchema.Type;

/** Expected failure while parsing a benchmark result artifact. */
export class BenchmarkResultError extends Schema.TaggedError<BenchmarkResultError>()(
  "BenchmarkResultError",
  { message: Schema.String },
) {}

const decodeImplementationResult = Schema.decodeUnknownEffect(ImplementationResultSchema, {
  errors: "all",
});

const decodeRunManifest = Schema.decodeUnknownEffect(RunManifestSchema, { errors: "all" });

/**
 * Parse an untrusted implementation result artifact.
 *
 * @param input - Untrusted JSON-compatible result data.
 * @returns A parsed implementation result or a typed result failure.
 */
export const parseImplementationResult = (
  input: Parameters<typeof decodeImplementationResult>[0],
): Effect.Effect<ImplementationResult, BenchmarkResultError> =>
  decodeImplementationResult(input).pipe(
    Effect.mapError(
      (error) =>
        new BenchmarkResultError({ message: `Invalid benchmark result: ${String(error)}` }),
    ),
  );

/**
 * Parse an untrusted run manifest.
 *
 * @param input - Untrusted JSON-compatible manifest data.
 * @returns A parsed manifest or a typed result failure.
 */
export const parseRunManifest = (
  input: Parameters<typeof decodeRunManifest>[0],
): Effect.Effect<RunManifest, BenchmarkResultError> =>
  decodeRunManifest(input).pipe(
    Effect.mapError(
      (error) => new BenchmarkResultError({ message: `Invalid run manifest: ${String(error)}` }),
    ),
  );
