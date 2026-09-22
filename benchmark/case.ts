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
  "adapter-input-conversion",
  "warm-fit",
  "warm-predict",
  "warm-fit-predict",
  "warm-fit-predict-with-conversion",
  "cold-first-forecast",
  "model-json-encode",
  "model-json-decode",
  "fresh-process-restored-predict",
]);

/** A phase measured by the public benchmark adapters. */
export type BenchmarkPhase = typeof BenchmarkPhaseSchema.Type;

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

const BenchmarkSeasonalitySchema = Schema.Struct({
  name: NonEmptyString,
  periodDays: PositiveFinite,
  fourierOrder: PositiveInteger,
  priorScale: PositiveFinite,
  conditionName: Schema.optionalKey(NonEmptyString),
  mode: Schema.optionalKey(Schema.Literals(["additive", "multiplicative"])),
});

const BenchmarkEventSchema = Schema.Struct({
  name: NonEmptyString,
  date: Schema.String.check(
    Schema.makeFilter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Expected a UTC calendar date",
    }),
  ),
  lowerWindowDays: Schema.Int,
  upperWindowDays: Schema.Int,
  priorScale: PositiveFinite,
});

const BenchmarkRegressorSchema = Schema.Struct({
  name: NonEmptyString,
  priorScale: PositiveFinite,
  standardization: Schema.Literals(["auto", "always", "never"]),
  mode: Schema.optionalKey(Schema.Literals(["additive", "multiplicative"])),
});

const BenchmarkChangepointsSchema = Schema.Union([
  Schema.Struct({
    mode: Schema.Literal("explicit"),
    timestamps: Schema.Array(CanonicalTimestamp),
  }),
  Schema.Struct({
    mode: Schema.Literal("auto"),
    count: NonNegativeInteger,
    range: Schema.Finite.check(Schema.isGreaterThan(0), Schema.isLessThanOrEqualTo(1)),
  }),
]);

const LinearMapWorkloadSchema = Schema.Struct({
  kind: Schema.Literal("linear-map"),
  comparison: EquivalentObjectiveComparisonSchema,
  configuration: Schema.Struct({
    effectMap: Schema.Literals(["explicit", "omitted"]),
    changepoints: BenchmarkChangepointsSchema,
    changepointPriorScale: PositiveFinite,
    seasonalities: Schema.Array(BenchmarkSeasonalitySchema),
    events: Schema.Array(BenchmarkEventSchema),
    regressors: Schema.Array(BenchmarkRegressorSchema),
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

const StageFMapWorkloadSchema = Schema.Struct({
  kind: Schema.Literal("stage-f-map"),
  comparison: EquivalentObjectiveComparisonSchema,
  configuration: Schema.Struct({
    growth: Schema.Literals(["linear", "flat", "logistic"]),
    scaling: Schema.Literals(["absmax", "minmax"]),
    seasonalityMode: Schema.Literals(["additive", "multiplicative"]),
    holidaysMode: Schema.Literals(["additive", "multiplicative"]),
    changepoints: BenchmarkChangepointsSchema,
    changepointPriorScale: PositiveFinite,
    seasonalities: Schema.Array(BenchmarkSeasonalitySchema),
    events: Schema.Array(BenchmarkEventSchema),
    regressors: Schema.Array(BenchmarkRegressorSchema),
  }),
  effectOptimizer: Schema.optionalKey(LinearMapWorkloadSchema.fields.effectOptimizer),
  pythonOptimizer: LinearMapWorkloadSchema.fields.pythonOptimizer,
});

/** A public forecasting workload understood by both language adapters. */
export const BenchmarkWorkloadSchema = Schema.Union([
  FixedLinearPredictionWorkloadSchema,
  LinearMapWorkloadSchema,
  StageFMapWorkloadSchema,
]);

/** A public forecasting workload understood by both language adapters. */
export type BenchmarkWorkload = typeof BenchmarkWorkloadSchema.Type;

/** Runtime schema for one absolute-plus-relative numerical tolerance. */
export const CorrectnessToleranceSchema = Schema.Struct({
  absolute: NonNegativeFinite,
  relative: NonNegativeFinite,
});

/** Quantity-specific cross-language correctness tolerances. */
export const CorrectnessTolerancesSchema = Schema.Struct({
  trend: CorrectnessToleranceSchema,
  component: CorrectnessToleranceSchema,
  additive: CorrectnessToleranceSchema,
  forecast: CorrectnessToleranceSchema,
  noiseScale: CorrectnessToleranceSchema,
  persistence: CorrectnessToleranceSchema,
});

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
  correctnessTolerances: CorrectnessTolerancesSchema,
});

/** One parsed benchmark case declaration. */
export type BenchmarkCase = typeof BenchmarkCaseSchema.Type;

/** Runtime schema for one shared benchmark observation. */
export const BenchmarkObservationSchema = Schema.Struct({
  timestamp: CanonicalTimestamp,
  value: Schema.Finite,
  capacity: Schema.optionalKey(Schema.Finite),
  floor: Schema.optionalKey(Schema.Finite),
  regressors: Schema.optionalKey(Schema.Record(Schema.String, Schema.Finite)),
  conditions: Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)),
});

/** Runtime schema for one complete shared prediction row. */
export const BenchmarkPredictionRowSchema = Schema.Struct({
  timestamp: CanonicalTimestamp,
  capacity: Schema.optionalKey(Schema.Finite),
  floor: Schema.optionalKey(Schema.Finite),
  regressors: Schema.optionalKey(Schema.Record(Schema.String, Schema.Finite)),
  conditions: Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)),
});

/** Runtime schema for a shared dataset consumed by both language adapters. */
export const BenchmarkDatasetSchema = Schema.Struct({
  id: NonEmptyString,
  recipe: NonEmptyString,
  observations: Schema.Array(BenchmarkObservationSchema),
  predictionRows: Schema.Array(BenchmarkPredictionRowSchema),
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
  onExcessProperty: "error",
});

const decodeDataset = Schema.decodeUnknownEffect(BenchmarkDatasetSchema, {
  errors: "all",
  onExcessProperty: "error",
});

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
        (phase) => phase !== "adapter-input-conversion" && phase !== "warm-predict",
      )
    ) {
      return Effect.fail(
        new BenchmarkInputError({
          input: "cases",
          message: `Fixed prediction case ${benchmarkCase.id} may only convert input or predict`,
        }),
      );
    }

    if (benchmarkCase.workload.kind === "stage-f-map") {
      const configuration = benchmarkCase.workload.configuration;
      const points = configuration.changepoints;
      const flat = configuration.growth === "flat";

      const emptyPoints =
        points.mode === "explicit" ? points.timestamps.length === 0 : points.count === 0;

      if (
        (flat &&
          (!emptyPoints ||
            points.mode !== "explicit" ||
            benchmarkCase.workload.effectOptimizer !== undefined)) ||
        (!flat && (emptyPoints || benchmarkCase.workload.effectOptimizer === undefined))
      ) {
        return Effect.fail(
          new BenchmarkInputError({
            input: "cases",
            message: `Stage F case ${benchmarkCase.id} must use flat defaults or a nonempty comparable changepoint MAP fit`,
          }),
        );
      }
    }

    if (benchmarkCase.workload.kind === "linear-map") {
      const configuration = benchmarkCase.workload.configuration;

      if (
        configuration.effectMap === "omitted" &&
        (configuration.changepoints.mode !== "auto" ||
          configuration.changepoints.count !== 25 ||
          configuration.changepoints.range !== 0.8 ||
          configuration.changepointPriorScale !== 0.05)
      ) {
        return Effect.fail(
          new BenchmarkInputError({
            input: "cases",
            message: `Omitted-map case ${benchmarkCase.id} must declare Effect's automatic defaults`,
          }),
        );
      }
    }
  }

  return Effect.succeed(cases);
};

/** Parse untrusted benchmark case declarations and enforce cross-field invariants. */
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

/** Parse an untrusted shared benchmark dataset. */
export const parseBenchmarkDataset = (
  input: Parameters<typeof decodeDataset>[0],
): Effect.Effect<BenchmarkDataset, BenchmarkInputError> =>
  decodeDataset(input).pipe(
    Effect.mapError(
      (error) => new BenchmarkInputError({ input: "dataset", message: String(error) }),
    ),
    Effect.flatMap(validateDatasetRelationships),
  );
