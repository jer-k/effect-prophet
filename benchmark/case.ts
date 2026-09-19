import { Effect, Schema } from "effect";

const NonEmptyString = Schema.String.check(Schema.isMinLength(1));

const PositiveInteger = Schema.Int.check(Schema.isGreaterThan(0));

const NonNegativeInteger = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0));

const PositiveFinite = Schema.Finite.check(Schema.isGreaterThan(0));

const NonNegativeFinite = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

const CanonicalTimestamp = Schema.String.check(
  Schema.makeFilter((value) => {
    const parsed = Date.parse(value);

    if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
      return "Expected a canonical UTC timestamp";
    }
  }),
);

/** A phase measured by the public benchmark adapters. */
export const BenchmarkPhaseSchema = Schema.Literals([
  "input-preparation",
  "warm-fit",
  "warm-predict",
  "warm-fit-predict",
  "warm-fit-predict-with-conversion",
  "cold-first-forecast",
  "model-json-encode",
  "model-json-decode",
]);

/** A phase measured by the public benchmark adapters. */
export type BenchmarkPhase = typeof BenchmarkPhaseSchema.Type;

const DifferentObjectiveComparisonSchema = Schema.Struct({
  kind: Schema.Literal("different-objective"),
  effectObjective: NonEmptyString,
  pythonObjective: NonEmptyString,
  explanation: NonEmptyString,
});

const EquivalentEquationComparisonSchema = Schema.Struct({
  kind: Schema.Literal("equivalent-equation"),
  evidenceId: NonEmptyString,
});

const EquivalentObjectiveComparisonSchema = Schema.Struct({
  kind: Schema.Literal("equivalent-objective"),
  evidenceId: NonEmptyString,
});

/** Why two measurements may be viewed together and which correctness evidence is required. */
export const BenchmarkComparisonSchema = Schema.Union([
  DifferentObjectiveComparisonSchema,
  EquivalentEquationComparisonSchema,
  EquivalentObjectiveComparisonSchema,
]);

/** Why two measurements may be viewed together and which correctness evidence is required. */
export type BenchmarkComparison = typeof BenchmarkComparisonSchema.Type;

const FixedLinearPredictionWorkloadSchema = Schema.Struct({
  kind: Schema.Literal("fixed-linear-prediction"),
  comparison: EquivalentEquationComparisonSchema,
  parameters: Schema.Struct({
    intercept: Schema.Finite,
    slope: Schema.Finite,
    timeOrigin: Schema.Int,
    timeScale: PositiveFinite,
  }),
});

const LinearFitWorkloadSchema = Schema.Struct({
  kind: Schema.Literal("linear-fit"),
  comparison: DifferentObjectiveComparisonSchema,
});

const BenchmarkSeasonalitySchema = Schema.Struct({
  name: NonEmptyString,
  periodDays: PositiveFinite,
  fourierOrder: PositiveInteger,
  priorScale: PositiveFinite,
});

const ExplicitLinearMapWorkloadSchema = Schema.Struct({
  kind: Schema.Literal("explicit-linear-map"),
  comparison: Schema.Union([
    DifferentObjectiveComparisonSchema,
    EquivalentObjectiveComparisonSchema,
  ]),
  configuration: Schema.Struct({
    changepointTimestamps: Schema.Array(CanonicalTimestamp),
    changepointPriorScale: PositiveFinite,
    seasonalities: Schema.Array(BenchmarkSeasonalitySchema),
  }),
  effectOptimizer: Schema.Struct({
    maxIterations: PositiveInteger,
    relativeTolerance: PositiveFinite,
    absoluteTolerance: PositiveFinite,
  }),
  pythonOptimizer: Schema.Struct({
    algorithm: Schema.Literals(["Newton", "LBFGS"]),
    maxIterations: PositiveInteger,
    newtonFallback: Schema.Boolean,
  }),
});

/** A public forecasting workload understood by both language adapters. */
export const BenchmarkWorkloadSchema = Schema.Union([
  LinearFitWorkloadSchema,
  FixedLinearPredictionWorkloadSchema,
  ExplicitLinearMapWorkloadSchema,
]);

/** A public forecasting workload understood by both language adapters. */
export type BenchmarkWorkload = typeof BenchmarkWorkloadSchema.Type;

/** Runtime schema for one benchmark case declaration. */
export const BenchmarkCaseSchema = Schema.Struct({
  id: NonEmptyString,
  dataset: NonEmptyString,
  workload: BenchmarkWorkloadSchema,
  phases: Schema.Array(BenchmarkPhaseSchema),
  warmupIterations: NonNegativeInteger,
  measuredIterations: PositiveInteger,
  independentRuns: PositiveInteger,
  timeoutSeconds: PositiveInteger,
  correctnessTolerance: Schema.Struct({
    absolute: NonNegativeFinite,
    relative: NonNegativeFinite,
  }),
});

/** One parsed benchmark case declaration. */
export type BenchmarkCase = typeof BenchmarkCaseSchema.Type;

/** Runtime schema for one shared benchmark observation. */
export const BenchmarkObservationSchema = Schema.Struct({
  timestamp: CanonicalTimestamp,
  value: Schema.Finite,
});

/** Runtime schema for a shared dataset consumed by both language adapters. */
export const BenchmarkDatasetSchema = Schema.Struct({
  id: NonEmptyString,
  recipe: NonEmptyString,
  observations: Schema.Array(BenchmarkObservationSchema),
  predictionTimestamps: Schema.Array(CanonicalTimestamp),
});

/** A parsed shared dataset consumed by both language adapters. */
export type BenchmarkDataset = typeof BenchmarkDatasetSchema.Type;

/** Expected failure while parsing a benchmark case or dataset boundary. */
export class BenchmarkInputError extends Schema.TaggedError<BenchmarkInputError>()(
  "BenchmarkInputError",
  {
    input: Schema.Literals(["cases", "dataset"]),
    message: Schema.String,
  },
) {}

const decodeCases = Schema.decodeUnknownEffect(Schema.Array(BenchmarkCaseSchema), {
  errors: "all",
});

const decodeDataset = Schema.decodeUnknownEffect(BenchmarkDatasetSchema, { errors: "all" });

const hasSafeDatasetPath = (value: string): boolean => {
  if (value.startsWith("/") || value.includes("\\")) {
    return false;
  }

  const segments = value.split("/");

  return segments.every((segment) => segment !== "" && segment !== "." && segment !== "..");
};

const validateCaseRelationships = (
  cases: ReadonlyArray<BenchmarkCase>,
): Effect.Effect<ReadonlyArray<BenchmarkCase>, BenchmarkInputError> => {
  const ids = new Set<string>();

  for (const benchmarkCase of cases) {
    if (ids.has(benchmarkCase.id)) {
      return Effect.fail(
        new BenchmarkInputError({
          input: "cases",
          message: `Duplicate benchmark case id: ${benchmarkCase.id}`,
        }),
      );
    }

    ids.add(benchmarkCase.id);

    if (!hasSafeDatasetPath(benchmarkCase.dataset)) {
      return Effect.fail(
        new BenchmarkInputError({
          input: "cases",
          message: `Benchmark case ${benchmarkCase.id} has an unsafe dataset path`,
        }),
      );
    }

    if (new Set(benchmarkCase.phases).size !== benchmarkCase.phases.length) {
      return Effect.fail(
        new BenchmarkInputError({
          input: "cases",
          message: `Benchmark case ${benchmarkCase.id} contains duplicate phases`,
        }),
      );
    }

    if (
      benchmarkCase.workload.kind === "fixed-linear-prediction" &&
      benchmarkCase.phases.some(
        (phase) => phase !== "input-preparation" && phase !== "warm-predict",
      )
    ) {
      return Effect.fail(
        new BenchmarkInputError({
          input: "cases",
          message: `Fixed prediction case ${benchmarkCase.id} may only prepare input or predict`,
        }),
      );
    }

    if (
      benchmarkCase.workload.kind === "explicit-linear-map" &&
      benchmarkCase.workload.configuration.changepointTimestamps.length === 0 &&
      benchmarkCase.workload.comparison.kind !== "different-objective"
    ) {
      return Effect.fail(
        new BenchmarkInputError({
          input: "cases",
          message: `No-changepoint MAP case ${benchmarkCase.id} must be different-objective`,
        }),
      );
    }
  }

  return Effect.succeed(cases);
};

/**
 * Parse untrusted benchmark case declarations and enforce cross-field invariants.
 *
 * @param input - Untrusted JSON-compatible case declarations.
 * @returns Parsed cases or a typed benchmark input failure.
 */
export const parseBenchmarkCases = (
  input: Parameters<typeof decodeCases>[0],
): Effect.Effect<ReadonlyArray<BenchmarkCase>, BenchmarkInputError> =>
  decodeCases(input).pipe(
    Effect.mapError((error) => new BenchmarkInputError({ input: "cases", message: String(error) })),
    Effect.flatMap(validateCaseRelationships),
  );

const validateDatasetRelationships = (
  dataset: BenchmarkDataset,
): Effect.Effect<BenchmarkDataset, BenchmarkInputError> => {
  if (dataset.observations.length < 2) {
    return Effect.fail(
      new BenchmarkInputError({
        input: "dataset",
        message: `Dataset ${dataset.id} must contain at least two observations`,
      }),
    );
  }

  let previousTimestamp = Number.NEGATIVE_INFINITY;

  for (const observation of dataset.observations) {
    const timestamp = Date.parse(observation.timestamp);

    if (timestamp <= previousTimestamp) {
      return Effect.fail(
        new BenchmarkInputError({
          input: "dataset",
          message: `Dataset ${dataset.id} observations must be strictly ordered and unique`,
        }),
      );
    }

    previousTimestamp = timestamp;
  }

  return Effect.succeed(dataset);
};

/**
 * Parse an untrusted shared benchmark dataset.
 *
 * @param input - Untrusted JSON-compatible dataset.
 * @returns A parsed dataset or a typed benchmark input failure.
 */
export const parseBenchmarkDataset = (
  input: Parameters<typeof decodeDataset>[0],
): Effect.Effect<BenchmarkDataset, BenchmarkInputError> =>
  decodeDataset(input).pipe(
    Effect.mapError(
      (error) => new BenchmarkInputError({ input: "dataset", message: String(error) }),
    ),
    Effect.flatMap(validateDatasetRelationships),
  );
