import { Effect, Predicate, Schema } from "effect";

import {
  CandidateIdSchema,
  EvaluationError,
  EvaluationMetricError,
  EvaluationSearchError,
  FittingError,
  isInputError,
  OptionsError,
  pathErrorFields,
  portableInputFailure,
  PredictionError,
  prefixIssues,
  schemaPathErrorFields,
  SearchOptionsError,
  singleIssueFields,
  UncertaintyOptionsError,
  type CandidateId,
  type EvaluationPlanError,
  type InputError,
  type ObservationError,
  type SearchOptionsCause,
  type SearchOptionsFailureReason,
  type PortableCandidateOutcome,
  type PortableEvaluationFailure,
} from "./errors";
import { CountryHolidayError } from "./country-holidays";
import {
  CustomMetricSchema,
  performanceMetrics,
  type CustomMetric,
  type MetricName,
  type MetricReport,
} from "./evaluation-metrics";
import {
  crossValidateCandidate,
  planRollingOrigin,
  type CrossValidationInput,
  type CrossValidationResult,
  type RollingOriginPlanInput,
  type RollingOriginPlanSummary,
} from "./evaluation";
import { PointMetricNameSchema, isPointMetricName, metricName } from "./internal/metric-names";
import { checkedAdd, checkedMultiply } from "./internal/safe-arithmetic";
import { copyFrozen as ownedInput } from "./internal/owned-input";
import type { FittingBackend } from "./internal/fitting-backend";
import { maximumSearchCandidates } from "./internal/search-limits";
import {
  crossValidationFitOptions,
  parseCrossValidationInput,
} from "./internal/cross-validation-options";
import { defaultTargetScalingMode } from "./target-scaling";
import { decodeObservations } from "./observation";
import { decodeOptions, type EncodedProphetOptions, type ProphetOptions } from "./options";
import { exceedsSimulationBudget } from "./uncertainty";

const ObjectiveSchema = Schema.Struct({
  metric: Schema.Union([PointMetricNameSchema, CustomMetricSchema]),
  aggregation: Schema.Struct({ kind: Schema.Literal("overall") }),
  direction: Schema.Literal("minimize"),
});

const SearchSchema = Schema.Struct({
  candidates: Schema.Array(Schema.Struct({ id: CandidateIdSchema, options: Schema.Unknown })).check(
    Schema.makeFilter((candidates) => {
      if (candidates.length === 0 || candidates.length > maximumSearchCandidates) {
        return { path: [], issue: `Expected 1 to ${maximumSearchCandidates} candidates` };
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

// Custom metric names come from callers, so telemetry records only that the objective is custom.
const objectiveAttribute = (metric: SearchObjective["metric"]) =>
  isPointMetricName(metric) ? metric : "custom";

const decodeSearch = Schema.decodeUnknownEffect(SearchSchema, {
  errors: "all",
  onExcessProperty: "error",
});

/** One complete, schema-parsed fit request with a stable, unique ASCII label. */
export interface SearchCandidateInput {
  readonly id: string;
  readonly options: EncodedProphetOptions;
}

/**
 * One finite overall objective: a built-in point-error metric or a custom metric. Coverage cannot
 * select a model.
 */
export interface SearchObjective {
  readonly metric: Exclude<MetricName, "coverage"> | CustomMetric;
  readonly aggregation: { readonly kind: "overall" };
  readonly direction: "minimize";
}

/** An explicit bounded selection request over a single fitting backend. */
export interface ModelSearchInput {
  readonly candidates: ReadonlyArray<SearchCandidateInput>;
  readonly plan: RollingOriginPlanInput;
  readonly objective: SearchObjective;
  readonly failurePolicy: "record" | "fail-fast";
  readonly mode?: CrossValidationInput;
  readonly includeCrossValidation?: boolean;
}

type OverallReport = Extract<
  MetricReport<"point" | "intervals", "duration", string>,
  { readonly kind: "overall" }
>;

/** An executed candidate, with full rows only when explicitly requested. */
export type SearchCandidateResult =
  | {
      readonly kind: "success";
      readonly id: CandidateId;
      readonly candidateIndex: number;
      /** Effective CV fit options, including the resolved scaling used by later holdout fitting. */
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

const invalidSearch = (
  reason: SearchOptionsFailureReason,
  path: ReadonlyArray<PropertyKey>,
  message: string,
): SearchOptionsError => new SearchOptionsError(singleIssueFields(reason, path, message));

/** Re-home a candidate options or controls failure under its location in the search input. */
const nestedSearchError = (
  reason: "invalid-candidate-options" | "invalid-mode",
  error: SearchOptionsCause,
  prefix: ReadonlyArray<PropertyKey>,
  message: string,
  candidateIndex?: number,
): SearchOptionsError => {
  const fields = pathErrorFields(reason, prefixIssues(error.issues, prefix), message);

  return new SearchOptionsError(
    candidateIndex === undefined ? fields : { ...fields, candidateIndex },
    { cause: error },
  );
};

const invalidCandidateOptions = (error: OptionsError, candidateIndex: number) =>
  nestedSearchError(
    "invalid-candidate-options",
    error,
    ["candidates", candidateIndex, "options"],
    "Invalid candidate options",
    candidateIndex,
  );

const portableFailure = (
  error: InputError | EvaluationError | EvaluationMetricError | CountryHolidayError,
): PortableEvaluationFailure => {
  if (error instanceof EvaluationError) {
    const cause = error.cause;
    const causeTag = cause?._tag;

    const causeReason =
      cause instanceof FittingError ||
      cause instanceof PredictionError ||
      cause instanceof CountryHolidayError ||
      isInputError(cause)
        ? cause.reason
        : undefined;

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

  if (error instanceof CountryHolidayError) {
    return Object.freeze({ tag: "CountryHolidayError", reason: error.reason });
  }

  return portableInputFailure(error);
};

/** A candidate's country calendar is unusable; the candidate is named, the calendar error kept. */
const invalidCandidateCalendar = (
  error: CountryHolidayError,
  candidateIndex: number,
  candidateId: CandidateId,
): EvaluationSearchError =>
  new EvaluationSearchError(
    {
      reason: "invalid-candidate",
      candidateIndex,
      candidateId,
      message: "Search candidate's country calendar is invalid",
    },
    { cause: error },
  );

const planMatches = (left: RollingOriginPlanSummary, right: RollingOriginPlanSummary): boolean =>
  left.horizonMs === right.horizonMs &&
  left.cutoffs.length === right.cutoffs.length &&
  left.cutoffs.every((cutoff, index) => cutoff === right.cutoffs[index]);

const checkWork = (
  plan: RollingOriginPlanSummary,
  candidates: number,
  samples: number,
): Effect.Effect<void, SearchOptionsError> => {
  let training = 0;
  let assessment = 0;

  for (const fold of plan.folds) {
    if (samples > 0 && exceedsSimulationBudget(fold.assessmentCount, samples, "intervals")) {
      return Effect.fail(
        invalidSearch(
          "limit-exceeded",
          ["mode", "uncertainty", "samples"],
          "Interval fold exceeds the simulation limit",
        ),
      );
    }

    const nextTraining = checkedAdd(training, fold.trainingCount);
    const nextAssessment = checkedAdd(assessment, fold.assessmentCount);

    if (nextTraining === undefined || nextAssessment === undefined) {
      return Effect.fail(
        invalidSearch("limit-exceeded", ["candidates"], "Candidate work exceeds the integer range"),
      );
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
    return Effect.fail(
      invalidSearch("limit-exceeded", ["candidates"], "Candidate work exceeds the search limit"),
    );
  }

  return Effect.void;
};

/** Sequentially cross-validate a fixed list of options on identical rolling-origin folds. */
export const searchModels = Effect.fn("Prophet.searchModels")(function* (
  observationsInput: Parameters<typeof decodeObservations>[0],
  input: ModelSearchInput,
): Effect.fn.Return<
  ModelSearchResult,
  ObservationError | EvaluationPlanError | SearchOptionsError | EvaluationSearchError,
  FittingBackend
> {
  yield* decodeObservations(observationsInput);
  const observationsCopy = ownedInput(observationsInput);

  const parsed = yield* decodeSearch(input).pipe(
    Effect.mapError((error) => new SearchOptionsError(schemaPathErrorFields(error.issue))),
  );

  const validatedCandidates: Array<{
    id: CandidateId;
    options: EncodedProphetOptions;
    parsedOptions: ProphetOptions;
  }> = [];

  for (const [index, candidate] of parsed.candidates.entries()) {
    const original = input.candidates[index];

    if (original === undefined) {
      return yield* Effect.die(new Error("Parsed candidate is missing its input"));
    }

    const parseOptions = (options: EncodedProphetOptions) =>
      decodeOptions(options).pipe(
        Effect.mapError((error) =>
          error instanceof CountryHolidayError
            ? invalidCandidateCalendar(error, index, candidate.id)
            : invalidCandidateOptions(error, index),
        ),
      );

    yield* parseOptions(original.options);

    const copy = ownedInput(original.options);

    const parsedOptions = yield* parseOptions(copy);

    validatedCandidates.push({ id: candidate.id, options: copy, parsedOptions });
  }

  const controls = yield* parseCrossValidationInput(input.mode).pipe(
    Effect.mapError((error) =>
      nestedSearchError(
        "invalid-mode",
        error,
        error instanceof UncertaintyOptionsError ? ["mode", "uncertainty"] : ["mode"],
        "Invalid search cross-validation controls",
      ),
    ),
  );

  let mode: CrossValidationInput;
  let samples = 0;

  if (controls.mode === "intervals") {
    const { uncertaintyOptions, ...intervalInput } = controls;
    mode = Object.freeze(intervalInput);
    samples = uncertaintyOptions.samples;
  } else {
    mode = controls;
  }

  yield* Effect.annotateCurrentSpan({
    "effect_prophet.evaluation.scaling.mode": controls.scaling ?? defaultTargetScalingMode,
  });

  const candidates = validatedCandidates.map((candidate) => ({
    id: candidate.id,
    options: crossValidationFitOptions(candidate.options, controls),
  }));

  // Validate the raw plan before attempting to copy it; schema failures remain typed.
  const firstCandidate = candidates[0];

  if (firstCandidate === undefined) {
    return yield* Effect.die(new Error("Parsed search is missing its candidates"));
  }

  yield* planRollingOrigin(observationsCopy, firstCandidate.options, input.plan).pipe(
    Effect.catchTags({
      CountryHolidayError: (error) =>
        Effect.fail(invalidCandidateCalendar(error, 0, firstCandidate.id)),
      OptionsError: (error) => Effect.fail(invalidCandidateOptions(error, 0)),
    }),
  );
  const planInput = ownedInput(input.plan);
  let sharedPlan: RollingOriginPlanSummary | undefined;

  for (const [index, candidate] of candidates.entries()) {
    // Python computes generated cutoffs using the model's seasonality settings. Preserve that
    // behavior per candidate, but refuse to compare scores on different resulting folds.
    const planned = yield* planRollingOrigin(observationsCopy, candidate.options, planInput).pipe(
      Effect.catchTags({
        CountryHolidayError: (error) =>
          Effect.fail(invalidCandidateCalendar(error, index, candidate.id)),
        OptionsError: (error) => Effect.fail(invalidCandidateOptions(error, index)),
      }),
    );

    if (sharedPlan !== undefined && !planMatches(sharedPlan, planned)) {
      return yield* invalidSearch(
        "cutoff-mismatch",
        ["candidates", index, "options"],
        "Candidates produce different cutoffs; supply a common explicit or generated initial window",
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
      });

      if (report.kind !== "overall") {
        return yield* Effect.die(new Error("Overall objective produced a non-overall report"));
      }

      const score = report.bucket.scores[0]?.value;

      if (score === undefined || !Number.isFinite(score)) {
        return yield* new EvaluationMetricError({
          metric: metricName(objective.metric),
          aggregation: "overall",
          bucket: 0,
          reason: "non-finite",
          stage: "mean",
          message: "Search objective is not finite",
        });
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
    }).pipe(
      Effect.withSpan(
        "effect-prophet.evaluation.candidate",
        {
          attributes: {
            "effect_prophet.operation": "model-search",
            "effect_prophet.candidate.index": candidateIndex,
            "effect_prophet.candidate.count": candidates.length,
            "effect_prophet.fold.count": sharedPlan.folds.length,
            "effect_prophet.objective": objectiveAttribute(objective.metric),
            "effect_prophet.uncertainty.enabled": mode.mode === "intervals",
            "effect_prophet.evaluation.scaling.mode": controls.scaling ?? defaultTargetScalingMode,
          },
        },
        { captureStackTrace: false },
      ),
      Effect.result,
    );

    if (Predicate.isTagged("Failure")(attempt)) {
      if (parsed.failurePolicy === "fail-fast") {
        return yield* new EvaluationSearchError(
          {
            reason: "candidate-failed",
            candidateId: candidate.id,
            candidateIndex,
            message: "Search candidate failed",
          },
          { cause: attempt.failure },
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

    return yield* new EvaluationSearchError({
      reason: "no-success",
      outcomes: Object.freeze(failures),
      message: "No search candidate succeeded",
    });
  }

  return Object.freeze({
    plan: sharedPlan,
    objective,
    candidates: Object.freeze(outcomes),
    selected,
  });
});
