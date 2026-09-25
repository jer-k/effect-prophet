import { Effect, Predicate, Schema } from "effect";

import {
  CandidateIdSchema,
  EvaluationError,
  EvaluationMetricError,
  EvaluationSearchError,
  FittingError,
  InputValidationError,
  PredictionError,
  inputValidationErrorFromIssue,
  type CandidateId,
  type PortableCandidateOutcome,
  type PortableEvaluationFailure,
} from "./errors";
import { performanceMetrics, type MetricName, type MetricReport } from "./evaluation-metrics";
import {
  crossValidateCandidate,
  planRollingOrigin,
  type CrossValidationIntervalInput,
  type CrossValidationResult,
  type RollingOriginPlanInput,
  type RollingOriginPlanSummary,
} from "./evaluation";
import { checkedAdd, checkedMultiply } from "./internal/safe-arithmetic";
import type { FittingBackend } from "./internal/fitting-backend";
import { decodeObservations } from "./observation";
import { decodeOptions, type EncodedProphetOptions } from "./options";
import { parseUncertaintyOptions } from "./uncertainty";

const ObjectiveMetricSchema = Schema.Literals(["mae", "mse", "rmse", "mape", "mdape", "smape"]);

const ObjectiveSchema = Schema.Struct({
  metric: ObjectiveMetricSchema,
  aggregation: Schema.Struct({ kind: Schema.Literal("overall") }),
  direction: Schema.Literal("minimize"),
  mapeZeroActual: Schema.optionalKey(Schema.Literals(["error", "exclude"])),
});

const SearchSchema = Schema.Struct({
  candidates: Schema.Array(Schema.Struct({ id: CandidateIdSchema, options: Schema.Unknown })).check(
    Schema.makeFilter((candidates) => {
      if (candidates.length === 0 || candidates.length > 32) {
        return { path: [], issue: "Expected 1 to 32 candidates" };
      }

      if (new Set(candidates.map((candidate) => candidate.id)).size !== candidates.length) {
        return { path: [], issue: "Candidate IDs must be unique" };
      }
    }),
  ),
  plan: Schema.Unknown,
  objective: ObjectiveSchema,
  failurePolicy: Schema.Literals(["record", "fail-fast"]),
  mode: Schema.optionalKey(Schema.Unknown),
  includeCrossValidation: Schema.optionalKey(Schema.Boolean),
});

const IntervalModeSchema = Schema.Struct({
  mode: Schema.Literal("intervals"),
  uncertainty: Schema.Unknown,
});

const decodeSearch = Schema.decodeUnknownEffect(SearchSchema, {
  errors: "all",
  onExcessProperty: "error",
});

const decodeIntervalMode = Schema.decodeUnknownEffect(IntervalModeSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** One complete, schema-parsed fit request with a stable, unique ASCII label. */
export interface SearchCandidateInput {
  readonly id: string;
  readonly options: EncodedProphetOptions;
}

/** One finite overall point-error objective; coverage cannot select a model. */
export interface SearchObjective {
  readonly metric: Exclude<MetricName, "coverage">;
  readonly aggregation: { readonly kind: "overall" };
  readonly direction: "minimize";
  readonly mapeZeroActual?: "error" | "exclude";
}

/** An explicit bounded selection request over a single fitting backend. */
export interface ModelSearchInput {
  readonly candidates: ReadonlyArray<SearchCandidateInput>;
  readonly plan: RollingOriginPlanInput;
  readonly objective: SearchObjective;
  readonly failurePolicy: "record" | "fail-fast";
  readonly mode?: CrossValidationIntervalInput;
  readonly includeCrossValidation?: boolean;
}

type OverallReport = Extract<MetricReport<"point" | "intervals">, { readonly kind: "overall" }>;

/** An executed candidate, with full rows only when explicitly requested. */
export type SearchCandidateResult =
  | {
      readonly kind: "success";
      readonly id: CandidateId;
      readonly candidateIndex: number;
      readonly options: EncodedProphetOptions;
      readonly score: number;
      readonly metrics: OverallReport;
      readonly crossValidation?: CrossValidationResult;
    }
  | {
      readonly kind: "failure";
      readonly id: CandidateId;
      readonly candidateIndex: number;
      readonly failure: PortableEvaluationFailure;
    };

/** Ordered outcomes and one selected input configuration, not a fitted model. */
export interface ModelSearchResult {
  readonly plan: RollingOriginPlanSummary;
  readonly objective: SearchObjective;
  readonly candidates: ReadonlyArray<SearchCandidateResult>;
  readonly selected: {
    readonly id: CandidateId;
    readonly candidateIndex: number;
    readonly score: number;
  };
}

const invalidSearch = (path: ReadonlyArray<PropertyKey>, message: string): InputValidationError =>
  new InputValidationError({ input: "evaluation-search", issues: [{ path, message }], message });

const searchInputContext = (
  error: InputValidationError,
  path: ReadonlyArray<PropertyKey>,
  message: string,
): InputValidationError =>
  new InputValidationError({
    input: "evaluation-search",
    issues: error.issues.map((issue) => ({
      path: [...path, ...(issue.path ?? [])],
      message: issue.message,
    })),
    message,
  });

// A parsed input is copied and recursively frozen so nested caller-owned references cannot survive.
const ownedInput = <T>(input: T): T => {
  const copy = structuredClone(input);

  // oxlint-disable-next-line anti-slop/no-object-parameters -- Parsed inputs are closed plain-object/array trees; only the owned copy is traversed.
  const freeze = (value: object): void => {
    for (const child of Object.values(value)) {
      if (Predicate.isObjectKeyword(child)) freeze(child);
    }

    Object.freeze(value);
  };

  if (Predicate.isObjectKeyword(copy)) freeze(copy);

  return copy;
};

const portableFailure = (
  error: InputValidationError | EvaluationError | EvaluationMetricError,
): PortableEvaluationFailure => {
  if (error instanceof EvaluationError) {
    const cause = error.cause;
    const causeTag = cause?._tag;

    const causeReason =
      cause instanceof FittingError || cause instanceof PredictionError ? cause.reason : undefined;

    const fields = {
      tag: "EvaluationError" as const,
      fold: error.fold,
      stage: error.stage,
      reason: error.reason,
    };

    if (error.rowIndex !== undefined) Object.assign(fields, { rowIndex: error.rowIndex });

    if (causeTag !== undefined) Object.assign(fields, { causeTag });

    if (causeReason !== undefined) Object.assign(fields, { causeReason });

    return Object.freeze(fields);
  }

  if (error instanceof EvaluationMetricError) {
    return Object.freeze({
      tag: "EvaluationMetricError",
      metric: error.metric,
      aggregation: error.aggregation,
      bucket: error.bucket,
      reason: error.reason,
      stage: error.stage,
    });
  }

  return Object.freeze({ tag: "InputValidationError", input: error.input });
};

const planMatches = (left: RollingOriginPlanSummary, right: RollingOriginPlanSummary): boolean =>
  left.horizonMs === right.horizonMs &&
  left.cutoffs.length === right.cutoffs.length &&
  left.cutoffs.every((cutoff, index) => cutoff === right.cutoffs[index]);

const checkWork = (
  plan: RollingOriginPlanSummary,
  candidates: number,
  samples: number,
): Effect.Effect<void, InputValidationError> => {
  let training = 0;
  let assessment = 0;

  for (const fold of plan.folds) {
    const foldCells = checkedMultiply(fold.assessmentCount, samples);

    if (
      samples > 0 &&
      (fold.assessmentCount > 10_000 || foldCells === undefined || foldCells > 1_000_000)
    ) {
      return Effect.fail(
        invalidSearch(
          ["mode", "uncertainty", "samples"],
          "Interval fold exceeds the simulation limit",
        ),
      );
    }

    const nextTraining = checkedAdd(training, fold.trainingCount);
    const nextAssessment = checkedAdd(assessment, fold.assessmentCount);

    if (nextTraining === undefined || nextAssessment === undefined) {
      return Effect.fail(invalidSearch(["candidates"], "Candidate work exceeds the integer range"));
    }

    training = nextTraining;
    assessment = nextAssessment;
  }

  const executions = checkedMultiply(candidates, plan.folds.length);
  const trainingVisits = checkedMultiply(candidates, training);
  const assessmentVisits = checkedMultiply(candidates, assessment);

  const sampleCells =
    assessmentVisits === undefined ? undefined : checkedMultiply(assessmentVisits, samples);

  if (
    executions === undefined ||
    executions > 2_048 ||
    trainingVisits === undefined ||
    trainingVisits > 2_000_000 ||
    assessmentVisits === undefined ||
    assessmentVisits > 1_000_000 ||
    sampleCells === undefined ||
    sampleCells > 8_000_000
  ) {
    return Effect.fail(invalidSearch(["candidates"], "Candidate work exceeds the search limit"));
  }

  return Effect.void;
};

/** Sequentially cross-validate a fixed list of options on identical rolling-origin folds. */
export const searchModels = Effect.fn("Prophet.searchModels")(function* (
  observationsInput: Parameters<typeof decodeObservations>[0],
  input: ModelSearchInput,
): Effect.fn.Return<
  ModelSearchResult,
  InputValidationError | EvaluationSearchError,
  FittingBackend
> {
  yield* decodeObservations(observationsInput);
  const observationsCopy = ownedInput(observationsInput);

  const parsed = yield* decodeSearch(input).pipe(
    Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-search", error.issue)),
  );

  if (
    (parsed.objective.metric === "mape" || parsed.objective.metric === "mdape") &&
    parsed.objective.mapeZeroActual === undefined
  ) {
    return yield* Effect.fail(
      invalidSearch(
        ["objective", "mapeZeroActual"],
        "Percentage objectives require a zero-actual policy",
      ),
    );
  }

  const candidates: Array<{ id: CandidateId; options: EncodedProphetOptions }> = [];

  for (const [index, candidate] of parsed.candidates.entries()) {
    const original = input.candidates[index];

    if (original === undefined) {
      return yield* Effect.die(new Error("Parsed candidate is missing its input"));
    }

    const parseOptions = (options: EncodedProphetOptions) =>
      decodeOptions(options).pipe(
        Effect.mapError((error) =>
          searchInputContext(error, ["candidates", index, "options"], "Invalid candidate options"),
        ),
      );

    yield* parseOptions(original.options);

    const copy = ownedInput(original.options);

    yield* parseOptions(copy);

    candidates.push({ id: candidate.id, options: copy });
  }

  let mode: CrossValidationIntervalInput | undefined;
  let samples = 0;

  if (parsed.mode !== undefined) {
    yield* decodeIntervalMode(parsed.mode).pipe(
      Effect.mapError((error) => inputValidationErrorFromIssue("evaluation-search", error.issue)),
    );
    const modeInput = input.mode;

    if (modeInput === undefined) {
      return yield* Effect.die(new Error("Parsed interval mode is missing its input"));
    }

    const uncertainty = yield* parseUncertaintyOptions(modeInput.uncertainty).pipe(
      Effect.mapError((error) =>
        searchInputContext(error, ["mode", "uncertainty"], "Invalid search interval controls"),
      ),
    );

    if (uncertainty.output !== "intervals") {
      return yield* Effect.fail(
        invalidSearch(["mode", "uncertainty", "output"], "Search requires interval output"),
      );
    }

    mode = Object.freeze({
      mode: "intervals",
      uncertainty: Object.freeze({
        seed: uncertainty.seed,
        samples: uncertainty.samples,
        intervalWidth: uncertainty.intervalWidth,
      }),
    });
    samples = uncertainty.samples;
  }

  // Validate the raw plan before attempting to copy it; schema failures remain typed.
  const firstCandidate = candidates[0];

  if (firstCandidate === undefined) {
    return yield* Effect.die(new Error("Parsed search is missing its candidates"));
  }

  yield* planRollingOrigin(observationsCopy, firstCandidate.options, input.plan);
  const planInput = ownedInput(input.plan);
  let sharedPlan: RollingOriginPlanSummary | undefined;

  for (const [index, candidate] of candidates.entries()) {
    // Python computes generated cutoffs using the model's seasonality settings. Preserve that
    // behavior per candidate, but refuse to compare scores on different resulting folds.
    const planned = yield* planRollingOrigin(observationsCopy, candidate.options, planInput);

    if (sharedPlan !== undefined && !planMatches(sharedPlan, planned)) {
      return yield* Effect.fail(
        invalidSearch(
          ["candidates", index, "options"],
          "Candidates produce different cutoffs; supply a common explicit or generated initial window",
        ),
      );
    }

    sharedPlan = planned;
  }

  if (sharedPlan === undefined) {
    return yield* Effect.die(new Error("Parsed search is missing its candidates"));
  }

  yield* checkWork(sharedPlan, candidates.length, samples);

  const objective: SearchObjective = Object.freeze({
    metric: parsed.objective.metric,
    aggregation: Object.freeze({ kind: "overall" }),
    direction: "minimize",
    mapeZeroActual: parsed.objective.mapeZeroActual ?? "error",
  });

  const outcomes: Array<SearchCandidateResult> = [];
  let selected: ModelSearchResult["selected"] | undefined;

  for (const [candidateIndex, candidate] of candidates.entries()) {
    const attempt = yield* Effect.gen(function* () {
      const cv = yield* crossValidateCandidate(
        observationsCopy,
        candidate.options,
        planInput,
        candidate.id,
        mode,
      );

      const report = yield* performanceMetrics(cv, {
        metrics: [objective.metric],
        aggregation: { kind: "overall" },
        mapeZeroActual: objective.mapeZeroActual ?? "error",
      });

      if (report.kind !== "overall") {
        return yield* Effect.die(new Error("Overall objective produced a non-overall report"));
      }

      const score = report.bucket.scores[0]?.value;

      if (score === undefined || !Number.isFinite(score)) {
        return yield* Effect.fail(
          new EvaluationMetricError({
            metric: objective.metric,
            aggregation: "overall",
            bucket: 0,
            reason: "non-finite",
            stage: "mean",
            message: "Search objective is not finite",
          }),
        );
      }

      const success = {
        kind: "success" as const,
        id: candidate.id,
        candidateIndex,
        options: candidate.options,
        score,
        metrics: report,
      };

      return Object.freeze(
        parsed.includeCrossValidation === true ? { ...success, crossValidation: cv } : success,
      );
    })
      .pipe(
        Effect.withSpan(
          "effect-prophet.evaluation.candidate",
          {
            attributes: {
              "effect_prophet.operation": "model-search",
              "effect_prophet.candidate.index": candidateIndex,
              "effect_prophet.candidate.count": candidates.length,
              "effect_prophet.fold.count": sharedPlan.folds.length,
              "effect_prophet.objective": objective.metric,
              "effect_prophet.uncertainty.enabled": mode !== undefined,
            },
          },
          { captureStackTrace: false },
        ),
      )
      .pipe(Effect.result);

    if (Predicate.isTagged("Failure")(attempt)) {
      if (parsed.failurePolicy === "fail-fast") {
        return yield* Effect.fail(
          new EvaluationSearchError(
            {
              reason: "candidate-failed",
              candidateId: candidate.id,
              candidateIndex,
              message: "Search candidate failed",
            },
            { cause: attempt.failure },
          ),
        );
      }

      outcomes.push(
        Object.freeze({
          kind: "failure",
          id: candidate.id,
          candidateIndex,
          failure: portableFailure(attempt.failure),
        }),
      );
      continue;
    }

    outcomes.push(attempt.success);

    if (selected === undefined || attempt.success.score < selected.score) {
      selected = Object.freeze({ id: candidate.id, candidateIndex, score: attempt.success.score });
    }
  }

  if (selected === undefined) {
    const failures: Array<PortableCandidateOutcome> = outcomes.flatMap((outcome) =>
      outcome.kind === "failure"
        ? [
            Object.freeze({
              id: outcome.id,
              candidateIndex: outcome.candidateIndex,
              failure: outcome.failure,
            }),
          ]
        : [],
    );

    return yield* Effect.fail(
      new EvaluationSearchError({
        reason: "no-success",
        outcomes: Object.freeze(failures),
        message: "No search candidate succeeded",
      }),
    );
  }

  return Object.freeze({
    plan: sharedPlan,
    objective,
    candidates: Object.freeze(outcomes),
    selected,
  });
});
