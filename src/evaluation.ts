import { DateTime, Effect, Option, Schema } from "effect";

import {
  EvaluationError,
  FittingError,
  InputValidationError,
  PredictionError,
  UnsupportedConfigurationError,
  inputValidationErrorFromIssue,
} from "./errors";
import type { FittingBackend } from "./internal/fitting-backend";
import { checkedAdd, checkedMultiply } from "./internal/safe-arithmetic";
import { deriveEvaluationFoldSeed } from "./evaluation-seed";
import { millisecondsPerDay } from "./internal/time";
import { TimestampSchema } from "./internal/timestamp";
import { decodeObservations, type EncodedObservation, type Observations } from "./observation";
import {
  checkExplicitChangepointBounds,
  decodeOptions,
  type EncodedProphetOptions,
  type ProphetOptions,
} from "./options";
import { fit, predict, predictUncertainty } from "./prophet";
import {
  parseUncertaintyOptions,
  simulationIdentity,
  type EncodedUncertaintyOptions,
  type UncertaintyOptions,
} from "./uncertainty";
import type { FittedProphet } from "./fitted-model";

const maximumDurationMs = 3_650 * millisecondsPerDay;

const maximumHistoryRows = 10_000;

const maximumFolds = 128;

const maximumAssessmentRows = 1_000_000;

const maximumIntervalCells = 8_000_000;

const maximumSimulationRows = 10_000;

const maximumSimulationCells = 1_000_000;

/** Shared positive elapsed-millisecond codec for evaluation plans and exact baseline lags. */
export const PositiveDurationMsSchema = Schema.Int.check(
  Schema.isGreaterThan(0),
  Schema.isLessThanOrEqualTo(maximumDurationMs),
).pipe(Schema.brand("effect-prophet/PositiveDurationMs"));

/** A positive, bounded integral number of elapsed milliseconds. */
export type PositiveDurationMs = typeof PositiveDurationMsSchema.Type;

const ExplicitCutoffsSchema = Schema.Array(TimestampSchema).check(
  Schema.makeFilter((timestamps) => {
    if (timestamps.length === 0) {
      return { path: [], issue: "At least one cutoff is required" };
    }

    for (let index = 1; index < timestamps.length; index += 1) {
      const previous = timestamps[index - 1];
      const current = timestamps[index];

      if (previous !== undefined && current !== undefined && current <= previous) {
        return {
          path: [index],
          issue: "Cutoffs must be strictly increasing and unique",
        };
      }
    }
  }),
);

const RollingOriginPlanInputSchema = Schema.Struct({
  horizonMs: PositiveDurationMsSchema,
  cutoffs: Schema.Union([
    Schema.Struct({ mode: Schema.Literal("explicit"), timestamps: ExplicitCutoffsSchema }),
    Schema.Struct({
      mode: Schema.Literal("generated"),
      initialMs: Schema.optionalKey(PositiveDurationMsSchema),
      periodMs: Schema.optionalKey(PositiveDurationMsSchema),
    }),
  ]),
});

/** Untrusted fixed-duration cutoff selection for rolling-origin evaluation. */
export type RollingOriginPlanInput = typeof RollingOriginPlanInputSchema.Encoded;

const IntervalModeSchema = Schema.Struct({
  mode: Schema.Literal("intervals"),
  uncertainty: Schema.Unknown,
});

const decodeIntervalMode = Schema.decodeUnknownEffect(IntervalModeSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** Explicit opt-in interval mode; Stage G's seeded controls and defaults apply. */
export interface CrossValidationIntervalInput {
  readonly mode: "intervals";
  readonly uncertainty: Omit<EncodedUncertaintyOptions, "output"> & { readonly output?: never };
}

/** One planned cutoff with row counts, never a reference to caller-owned history. */
export interface RollingOriginFoldSummary {
  readonly index: number;
  readonly cutoff: number;
  readonly trainingCount: number;
  readonly assessmentCount: number;
}

/** Immutable cutoff and fold-count summary, without fitted models or row aliases. */
export interface RollingOriginPlanSummary {
  readonly horizonMs: PositiveDurationMs;
  readonly cutoffs: ReadonlyArray<number>;
  readonly folds: ReadonlyArray<RollingOriginFoldSummary>;
}

/** One out-of-sample forecast instance, identified by its fold and cutoff. */
export interface CrossValidationPointRow {
  readonly fold: number;
  readonly cutoff: number;
  readonly timestamp: number;
  readonly horizonMs: number;
  readonly actual: number;
  readonly predicted: number;
}

/** An executed fold's counts and fitted model family, not its fitted handle. */
export interface CrossValidationFoldSummary extends RollingOriginFoldSummary {
  readonly model: FittedProphet["model"];
}

/** Owned, immutable point forecasts in cutoff order and original row order. */
export interface PointCrossValidationResult {
  readonly kind: "point";
  readonly plan: RollingOriginPlanSummary;
  readonly rows: ReadonlyArray<CrossValidationPointRow>;
  readonly folds: ReadonlyArray<CrossValidationFoldSummary>;
}

/** One point forecast plus complete, ordered value-interval bounds. */
export interface CrossValidationIntervalRow extends CrossValidationPointRow {
  readonly lower: number;
  readonly upper: number;
}

/** Atomically completed interval forecasts, not Monte Carlo point estimates. */
export interface IntervalCrossValidationResult {
  readonly kind: "intervals";
  readonly simulation: typeof simulationIdentity;
  readonly sampleCount: number;
  readonly intervalWidth: number;
  readonly plan: RollingOriginPlanSummary;
  readonly rows: ReadonlyArray<CrossValidationIntervalRow>;
  readonly folds: ReadonlyArray<CrossValidationFoldSummary>;
}

/** Only modes with implemented producers are published. */
export type CrossValidationResult = PointCrossValidationResult | IntervalCrossValidationResult;

/** Internal indexes into the immediately validated history; not portable model state. */
export interface EvaluationFoldIndexes {
  readonly index: number;
  readonly cutoff: number;
  readonly trainingEndExclusive: number;
  readonly assessmentStart: number;
  readonly assessmentEndExclusive: number;
}

/** Planner result for subsequent evaluation orchestration, not a public barrel export. */
export interface EvaluationFoldPlan {
  readonly summary: RollingOriginPlanSummary;
  readonly indexes: ReadonlyArray<EvaluationFoldIndexes>;
}

const decodePlan = Schema.decodeUnknownEffect(RollingOriginPlanInputSchema, {
  errors: "all",
  onExcessProperty: "error",
});

type ParsedPlan = typeof RollingOriginPlanInputSchema.Type;

const invalidPlan = (path: ReadonlyArray<PropertyKey>, message: string): InputValidationError =>
  new InputValidationError({ input: "evaluation-plan", issues: [{ path, message }], message });

const validEpoch = (epoch: number): boolean =>
  Number.isSafeInteger(epoch) && Option.isSome(DateTime.make(epoch));

const upperBound = (observations: Observations, cutoff: number): number => {
  let lower = 0;
  let upper = observations.length;

  while (lower < upper) {
    const middle = lower + Math.floor((upper - lower) / 2);
    const row = observations[middle];

    if (row !== undefined && row.timestamp <= cutoff) {
      lower = middle + 1;
    } else {
      upper = middle;
    }
  }

  return lower;
};

const seasonalityPeriodMs = (options: ProphetOptions): number | undefined => {
  let longest = 0;

  for (const seasonality of options.seasonalities) {
    const duration = Math.ceil(seasonality.periodDays * millisecondsPerDay);

    if (!Number.isSafeInteger(duration) || duration > maximumDurationMs) {
      return undefined;
    }

    longest = Math.max(longest, duration);
  }

  const builtIn = options.builtInSeasonalities;

  if (builtIn.yearly !== "off") {
    longest = Math.max(longest, 365.25 * millisecondsPerDay);
  }

  if (builtIn.weekly !== "off") {
    longest = Math.max(longest, 7 * millisecondsPerDay);
  }

  if (builtIn.daily !== "off") {
    longest = Math.max(longest, millisecondsPerDay);
  }

  return longest;
};

const generateCutoffs = (
  observations: Observations,
  options: ProphetOptions,
  input: ParsedPlan,
): ReadonlyArray<number> | InputValidationError => {
  if (input.cutoffs.mode === "explicit") {
    return input.cutoffs.timestamps;
  }

  const first = observations[0].timestamp;
  const last = observations[observations.length - 1]?.timestamp;

  const period = input.cutoffs.periodMs ?? Math.ceil(input.horizonMs / 2);

  const longest = input.cutoffs.initialMs === undefined ? seasonalityPeriodMs(options) : 0;

  const tripleHorizon = checkedAdd(input.horizonMs, 2 * input.horizonMs);

  const initial =
    input.cutoffs.initialMs ??
    (longest === undefined || tripleHorizon === undefined
      ? undefined
      : Math.max(tripleHorizon, longest));

  if (last === undefined || initial === undefined || initial > maximumDurationMs) {
    return invalidPlan(
      ["cutoffs", "initialMs"],
      "Generated initial window exceeds the duration limit",
    );
  }

  const boundary = checkedAdd(first, initial);
  const latest = checkedAdd(last, -input.horizonMs);

  if (
    boundary === undefined ||
    !validEpoch(boundary) ||
    latest === undefined ||
    !validEpoch(latest)
  ) {
    return invalidPlan(["cutoffs"], "Generated cutoff arithmetic exceeds the timestamp range");
  }

  if (latest < first) {
    return invalidPlan(["horizonMs"], "Less history than the forecast horizon");
  }

  const descending = [latest];
  let cutoff = latest;

  while (cutoff >= boundary) {
    const previous = checkedAdd(cutoff, -period);

    if (previous === undefined || !validEpoch(previous)) {
      return invalidPlan(["cutoffs", "periodMs"], "Generated cutoff exceeds the timestamp range");
    }

    cutoff = previous;

    const end = checkedAdd(cutoff, input.horizonMs);

    if (end === undefined || !validEpoch(end)) {
      return invalidPlan(
        ["horizonMs"],
        "Generated assessment endpoint exceeds the timestamp range",
      );
    }

    if (upperBound(observations, cutoff) === upperBound(observations, end) && cutoff > first) {
      const closest = observations[upperBound(observations, cutoff) - 1];

      const adjusted =
        closest === undefined ? undefined : checkedAdd(closest.timestamp, -input.horizonMs);

      if (adjusted === undefined || !validEpoch(adjusted)) {
        return invalidPlan(["cutoffs"], "Gap adjustment exceeds the timestamp range");
      }

      cutoff = adjusted;
    }

    descending.push(cutoff);

    if (descending.length > maximumFolds + 1) {
      return invalidPlan(["cutoffs"], "Generated fold count exceeds the limit");
    }
  }

  descending.pop();

  if (descending.length === 0) {
    return invalidPlan(["cutoffs"], "Less data than the horizon after the initial window");
  }

  return descending.reverse();
};

/** Compute owned fold indexes from fully parsed input for evaluation orchestration. */
export const planRollingOriginIndexes = (
  observations: Observations,
  options: ProphetOptions,
  input: ParsedPlan,
): Effect.Effect<EvaluationFoldPlan, InputValidationError> => {
  if (observations.length > maximumHistoryRows) {
    return Effect.fail(invalidPlan(["history"], "History row count exceeds the limit"));
  }

  const cutoffs = generateCutoffs(observations, options, input);

  if (cutoffs instanceof InputValidationError) {
    return Effect.fail(cutoffs);
  }

  if (cutoffs.length > maximumFolds) {
    return Effect.fail(invalidPlan(["cutoffs"], "Fold count exceeds the limit"));
  }

  const first = observations[0].timestamp;
  const last = observations[observations.length - 1]?.timestamp;
  const latest = last === undefined ? undefined : checkedAdd(last, -input.horizonMs);

  if (latest === undefined || !validEpoch(latest)) {
    return Effect.fail(invalidPlan(["horizonMs"], "Horizon exceeds the timestamp range"));
  }

  const indexes: Array<EvaluationFoldIndexes> = [];
  const folds: Array<RollingOriginFoldSummary> = [];
  let assessmentTotal = 0;
  let trainingEndExclusive = 0;
  let assessmentEndExclusive = 0;

  for (const [index, cutoff] of cutoffs.entries()) {
    const path =
      input.cutoffs.mode === "explicit" ? ["cutoffs", "timestamps", index] : ["cutoffs", index];

    if (cutoff <= first || cutoff > latest) {
      return Effect.fail(invalidPlan(path, "Cutoff is outside the legal history range"));
    }

    const end = checkedAdd(cutoff, input.horizonMs);

    if (end === undefined || !validEpoch(end)) {
      return Effect.fail(invalidPlan(path, "Assessment endpoint exceeds the timestamp range"));
    }

    while (true) {
      const row = observations[trainingEndExclusive];

      if (row === undefined || row.timestamp > cutoff) {
        break;
      }

      trainingEndExclusive += 1;
    }

    assessmentEndExclusive = Math.max(assessmentEndExclusive, trainingEndExclusive);

    while (true) {
      const row = observations[assessmentEndExclusive];

      if (row === undefined || row.timestamp > end) {
        break;
      }

      assessmentEndExclusive += 1;
    }

    const assessmentCount = assessmentEndExclusive - trainingEndExclusive;

    if (assessmentCount === 0) {
      return Effect.fail(invalidPlan(path, "Cutoff has no assessment observations"));
    }

    const nextAssessmentTotal = checkedAdd(assessmentTotal, assessmentCount);

    if (nextAssessmentTotal === undefined || nextAssessmentTotal > maximumAssessmentRows) {
      return Effect.fail(invalidPlan(["cutoffs"], "Assessment row count exceeds the limit"));
    }

    assessmentTotal = nextAssessmentTotal;

    indexes.push(
      Object.freeze({
        index,
        cutoff,
        trainingEndExclusive,
        assessmentStart: trainingEndExclusive,
        assessmentEndExclusive,
      }),
    );
    folds.push(
      Object.freeze({ index, cutoff, trainingCount: trainingEndExclusive, assessmentCount }),
    );
  }

  const summary: RollingOriginPlanSummary = Object.freeze({
    horizonMs: input.horizonMs,
    cutoffs: Object.freeze(Array.from(cutoffs)),
    folds: Object.freeze(folds),
  });

  return Effect.succeed(Object.freeze({ summary, indexes: Object.freeze(indexes) }));
};

const prepareRollingOrigin = (
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput: EncodedProphetOptions,
  input: RollingOriginPlanInput,
  modeInput?: CrossValidationIntervalInput,
) =>
  Effect.gen(function* () {
    const observations = yield* decodeObservations(observationsInput);
    const options = yield* decodeOptions(optionsInput);

    yield* checkExplicitChangepointBounds(observations, options);

    const plan = yield* decodePlan(input).pipe(
      Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-plan", error.issue)),
    );

    let uncertainty: UncertaintyOptions | undefined;

    if (modeInput !== undefined) {
      yield* decodeIntervalMode(modeInput).pipe(
        Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-plan", error.issue)),
      );

      uncertainty = yield* parseUncertaintyOptions(modeInput.uncertainty);

      if (uncertainty.output !== "intervals") {
        return yield* Effect.fail(
          new InputValidationError({
            input: "uncertainty-options",
            issues: [{ path: ["output"], message: "Cross-validation requires interval output" }],
            message: "Cross-validation requires interval output",
          }),
        );
      }
    }

    const foldPlan = yield* planRollingOriginIndexes(observations, options, plan);

    if (uncertainty !== undefined) {
      let totalCells = 0;

      for (const fold of foldPlan.summary.folds) {
        const cells = checkedMultiply(fold.assessmentCount, uncertainty.samples);
        const nextTotal = cells === undefined ? undefined : checkedAdd(totalCells, cells);

        if (
          fold.assessmentCount > maximumSimulationRows ||
          cells === undefined ||
          cells > maximumSimulationCells ||
          nextTotal === undefined ||
          nextTotal > maximumIntervalCells
        ) {
          return yield* Effect.fail(
            invalidPlan(
              ["uncertainty", "samples"],
              "Interval simulation exceeds the assessment work limit",
            ),
          );
        }

        totalCells = nextTotal;
      }

      if (
        options.growth === "linear" &&
        options.map === undefined &&
        options.scaling === undefined &&
        options.seasonalities.length === 0 &&
        options.events.layout.coefficientCount === 0 &&
        options.regressors.length === 0 &&
        options.builtInSeasonalities.yearly === "off" &&
        options.builtInSeasonalities.weekly === "off" &&
        options.builtInSeasonalities.daily === "off"
      ) {
        return yield* Effect.fail(
          invalidPlan(
            ["uncertainty"],
            "Featureless linear growth uses OLS, which has no predictive simulation",
          ),
        );
      }
    }

    return { observations, options, foldPlan, uncertainty };
  });

/** Parse complete ordered history, options and cutoffs into a pure rolling-origin plan summary. */
export const planRollingOrigin = Effect.fn("Prophet.planRollingOrigin")(function* (
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput: EncodedProphetOptions,
  input: RollingOriginPlanInput,
): Effect.fn.Return<RollingOriginPlanSummary, InputValidationError> {
  const { foldPlan } = yield* prepareRollingOrigin(observationsInput, optionsInput, input);

  return foldPlan.summary;
});

const encodeTimestamp = Schema.encodeSync(TimestampSchema);

/** Reconstruct and check a supplied fold summary against the complete observed history. */
export const resolveBaselinePlan = (
  observations: Observations,
  summary: RollingOriginPlanSummary,
): Effect.Effect<EvaluationFoldPlan, InputValidationError> =>
  Effect.gen(function* () {
    if (
      !Number.isSafeInteger(summary?.horizonMs) ||
      summary.horizonMs <= 0 ||
      !Array.isArray(summary.cutoffs) ||
      summary.cutoffs.length === 0 ||
      summary.cutoffs.length > maximumFolds ||
      !Array.isArray(summary.folds) ||
      summary.folds.length !== summary.cutoffs.length ||
      summary.cutoffs.some((cutoff) => !validEpoch(cutoff))
    ) {
      return yield* Effect.fail(invalidPlan(["summary"], "Invalid rolling-origin plan summary"));
    }

    const plan = yield* decodePlan({
      horizonMs: summary.horizonMs,
      cutoffs: {
        mode: "explicit",
        timestamps: summary.cutoffs.map((cutoff) => encodeTimestamp(cutoff)),
      },
    }).pipe(
      Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-plan", error.issue)),
    );

    // Explicit planning shares the same fold-index and resource checks as model CV.
    const options = yield* decodeOptions({});
    const resolved = yield* planRollingOriginIndexes(observations, options, plan);

    for (const [index, fold] of resolved.summary.folds.entries()) {
      const supplied = summary.folds[index];

      if (
        supplied?.index !== fold.index ||
        supplied.cutoff !== fold.cutoff ||
        supplied.trainingCount !== fold.trainingCount ||
        supplied.assessmentCount !== fold.assessmentCount
      ) {
        return yield* Effect.fail(
          invalidPlan(["summary", "folds", index], "Fold summary does not match history"),
        );
      }
    }

    return resolved;
  });

const projectTrainingRow = (row: Observations[number]): EncodedObservation =>
  Object.freeze({ ...row, timestamp: encodeTimestamp(row.timestamp) });

const projectPredictionRow = (row: Observations[number]) => {
  const { value: _actual, ...future } = row;

  return Object.freeze({ ...future, timestamp: encodeTimestamp(row.timestamp) });
};

const foldOptions = (
  input: EncodedProphetOptions,
  options: ProphetOptions,
  lastTrainingTimestamp: number,
): EncodedProphetOptions => {
  if (
    input.growth === "flat" ||
    options.growth === "flat" ||
    options.map?.changepoints.mode !== "explicit"
  ) {
    return input;
  }

  const originalMap = "map" in input ? input.map : undefined;

  return {
    ...input,
    map: {
      ...originalMap,
      changepoints: {
        mode: "explicit",
        timestamps: options.map.changepoints.timestamps
          .filter((timestamp) => timestamp < lastTrainingTimestamp)
          .map((timestamp) => encodeTimestamp(timestamp)),
      },
    },
  };
};

const foldFailure = (
  fold: EvaluationFoldIndexes,
  stage: "fit" | "predict" | "result" | "uncertainty" | "interval-result",
  cause: InputValidationError | UnsupportedConfigurationError | FittingError | PredictionError,
  rowIndex?: number,
): EvaluationError => {
  const reason = {
    fit: "fit-failed",
    predict: "prediction-failed",
    result: "result-mismatch",
    uncertainty: "uncertainty-failed",
    "interval-result": "interval-result-mismatch",
  } as const;

  const fields = {
    fold: fold.index,
    cutoff: fold.cutoff,
    stage,
    reason: reason[stage],
    message: `Evaluation fold ${stage} failed`,
  };

  return new EvaluationError(rowIndex === undefined ? fields : { ...fields, rowIndex }, { cause });
};

/** Sequentially refit each planned training prefix and predict its held-out point rows. */
const crossValidateOperation = Effect.fn("Prophet.crossValidate")(function* (
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput: EncodedProphetOptions,
  input: RollingOriginPlanInput,
  modeInput?: CrossValidationIntervalInput,
  candidateId = "",
): Effect.fn.Return<CrossValidationResult, InputValidationError | EvaluationError, FittingBackend> {
  const { observations, options, foldPlan, uncertainty } = yield* prepareRollingOrigin(
    observationsInput,
    optionsInput,
    input,
    modeInput,
  );

  const seeds =
    uncertainty === undefined
      ? []
      : foldPlan.indexes.map((fold) =>
          deriveEvaluationFoldSeed(uncertainty.seed, foldPlan.summary, candidateId, fold.cutoff),
        );

  if (seeds.some((seed) => seed === undefined)) {
    return yield* Effect.fail(
      invalidPlan(["cutoffs"], "Interval seed inputs exceed the integer range"),
    );
  }

  const rows: Array<CrossValidationPointRow> = [];
  const intervalRows: Array<CrossValidationIntervalRow> = [];
  const folds: Array<CrossValidationFoldSummary> = [];

  for (const fold of foldPlan.indexes) {
    const executed = yield* Effect.gen(function* () {
      const training = observations.slice(0, fold.trainingEndExclusive).map(projectTrainingRow);
      const lastTraining = observations[fold.trainingEndExclusive - 1];

      if (lastTraining === undefined || training[0] === undefined) {
        // The validated plan always contains a nonempty prefix.
        return yield* Effect.die(new Error("Evaluation plan contains an empty training prefix"));
      }

      const trainingRows: readonly [EncodedObservation, ...Array<EncodedObservation>] = [
        training[0],
        ...training.slice(1),
      ];

      const assessment = observations.slice(fold.assessmentStart, fold.assessmentEndExclusive);
      const predictionRows = assessment.map(projectPredictionRow);

      const model = yield* fit(
        trainingRows,
        foldOptions(optionsInput, options, lastTraining.timestamp),
      ).pipe(Effect.mapError((cause) => foldFailure(fold, "fit", cause)));

      yield* Effect.annotateCurrentSpan({ "effect_prophet.model.type": model.model });

      const forecasts = yield* predict(model, predictionRows).pipe(
        Effect.mapError((cause) => foldFailure(fold, "predict", cause)),
      );

      if (forecasts.length !== assessment.length) {
        return yield* Effect.fail(
          foldFailure(
            fold,
            "result",
            new PredictionError({
              reason: "backend-failure",
              timestamp: assessment[0]?.timestamp ?? fold.cutoff,
              message: "Evaluation forecast count does not match assessment rows",
            }),
          ),
        );
      }

      const pointRows: Array<CrossValidationPointRow> = [];

      for (const [rowIndex, actual] of assessment.entries()) {
        const forecast = forecasts[rowIndex];

        if (
          forecast === undefined ||
          forecast.timestamp !== actual.timestamp ||
          !Number.isFinite(forecast.value)
        ) {
          return yield* Effect.fail(
            foldFailure(
              fold,
              "result",
              new PredictionError({
                reason: "backend-failure",
                timestamp: actual.timestamp,
                message: "Evaluation forecast is misaligned or non-finite",
              }),
              rowIndex,
            ),
          );
        }

        pointRows.push(
          Object.freeze({
            fold: fold.index,
            cutoff: fold.cutoff,
            timestamp: actual.timestamp,
            horizonMs: actual.timestamp - fold.cutoff,
            actual: actual.value,
            predicted: forecast.value,
          }),
        );
      }

      let foldIntervals: ReadonlyArray<CrossValidationIntervalRow> | undefined;

      if (uncertainty !== undefined) {
        const seed = seeds[fold.index];

        if (seed === undefined) {
          return yield* Effect.die(new Error("Validated evaluation fold seed is missing"));
        }

        const intervals = yield* predictUncertainty(model, predictionRows, {
          seed,
          samples: uncertainty.samples,
          intervalWidth: uncertainty.intervalWidth,
          output: "intervals",
        }).pipe(Effect.mapError((cause) => foldFailure(fold, "uncertainty", cause)));

        if (
          intervals.kind !== "intervals" ||
          intervals.simulation !== simulationIdentity ||
          intervals.sampleCount !== uncertainty.samples ||
          intervals.intervalWidth !== uncertainty.intervalWidth ||
          intervals.rows.length !== pointRows.length
        ) {
          return yield* Effect.fail(
            foldFailure(
              fold,
              "interval-result",
              new PredictionError({
                reason: "backend-failure",
                timestamp: assessment[0]?.timestamp ?? fold.cutoff,
                message: "Evaluation interval frame does not match the fold request",
              }),
            ),
          );
        }

        const checked: Array<CrossValidationIntervalRow> = [];

        for (const [rowIndex, point] of pointRows.entries()) {
          const interval = intervals.rows[rowIndex];

          if (
            interval === undefined ||
            interval.timestamp !== point.timestamp ||
            !Number.isFinite(interval.value.lower) ||
            !Number.isFinite(interval.value.upper) ||
            interval.value.lower > interval.value.upper
          ) {
            return yield* Effect.fail(
              foldFailure(
                fold,
                "interval-result",
                new PredictionError({
                  reason: "backend-failure",
                  timestamp: point.timestamp,
                  message: "Evaluation interval is misaligned or non-finite",
                }),
                rowIndex,
              ),
            );
          }

          checked.push(
            Object.freeze({
              ...point,
              lower: interval.value.lower,
              upper: interval.value.upper,
            }),
          );
        }

        foldIntervals = checked;
      }

      return {
        pointRows,
        foldIntervals,
        summary: Object.freeze({
          index: fold.index,
          cutoff: fold.cutoff,
          trainingCount: fold.trainingEndExclusive,
          assessmentCount: fold.assessmentEndExclusive - fold.assessmentStart,
          model: model.model,
        }),
      };
    }).pipe(
      Effect.withSpan(
        "effect-prophet.evaluation.fold",
        {
          attributes: {
            "effect_prophet.operation": "cross-validate",
            "effect_prophet.fold.index": fold.index,
            "effect_prophet.fold.count": foldPlan.indexes.length,
            "effect_prophet.training.count": fold.trainingEndExclusive,
            "effect_prophet.assessment.count": fold.assessmentEndExclusive - fold.assessmentStart,
            "effect_prophet.growth": options.growth,
            "effect_prophet.uncertainty.enabled": uncertainty !== undefined,
            "effect_prophet.sample.count": uncertainty?.samples ?? 0,
          },
        },
        { captureStackTrace: false },
      ),
    );

    rows.push(...executed.pointRows);

    if (executed.foldIntervals !== undefined) {
      intervalRows.push(...executed.foldIntervals);
    }

    folds.push(executed.summary);
  }

  if (uncertainty !== undefined) {
    return Object.freeze({
      kind: "intervals",
      simulation: simulationIdentity,
      sampleCount: uncertainty.samples,
      intervalWidth: uncertainty.intervalWidth,
      plan: foldPlan.summary,
      rows: Object.freeze(intervalRows),
      folds: Object.freeze(folds),
    });
  }

  return Object.freeze({
    kind: "point",
    plan: foldPlan.summary,
    rows: Object.freeze(rows),
    folds: Object.freeze(folds),
  });
});

/** Search-only entry to the same named public CV operation, with candidate-isolated interval seeds. */
export const crossValidateCandidate = (
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput: EncodedProphetOptions,
  input: RollingOriginPlanInput,
  candidateId: string,
  modeInput?: CrossValidationIntervalInput,
): Effect.Effect<CrossValidationResult, InputValidationError | EvaluationError, FittingBackend> =>
  crossValidateOperation(observationsInput, optionsInput, input, modeInput, candidateId);

/** Point-only by default; opt in to complete seeded intervals with a tagged fourth argument. */
export function crossValidate(
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput: EncodedProphetOptions,
  input: RollingOriginPlanInput,
): Effect.Effect<
  PointCrossValidationResult,
  InputValidationError | EvaluationError,
  FittingBackend
>;
export function crossValidate(
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput: EncodedProphetOptions,
  input: RollingOriginPlanInput,
  mode: CrossValidationIntervalInput,
): Effect.Effect<
  IntervalCrossValidationResult,
  InputValidationError | EvaluationError,
  FittingBackend
>;
export function crossValidate(
  observationsInput: Parameters<typeof decodeObservations>[0],
  optionsInput: EncodedProphetOptions,
  input: RollingOriginPlanInput,
  mode?: CrossValidationIntervalInput,
): Effect.Effect<CrossValidationResult, InputValidationError | EvaluationError, FittingBackend> {
  return crossValidateOperation(observationsInput, optionsInput, input, mode);
}
