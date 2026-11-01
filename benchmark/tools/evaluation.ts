import { Effect, Exit, Layer } from "effect";
import {
  crossValidate,
  crossValidateBaseline,
  decodeEvaluationReport,
  encodeEvaluationReport,
  evaluateHoldout,
  performanceMetrics,
  planRollingOrigin,
  prophetFittingBackendLayer,
  scaledErrorMetric,
  searchModels,
  type CrossValidationResult,
  type EncodedProphetOptions,
  type MetricName,
  type MetricSelection,
  type ModelSearchResult,
  type RollingOriginPlanSummary,
  type SearchObjective,
} from "effect-prophet";

import { customMetrics } from "../../tools/prophet/custom-metrics.ts";
import type { BenchmarkCase, BenchmarkDataset, BenchmarkPhase } from "./case.ts";
import { effectOptionsForCase } from "./effect-case.ts";
import type { CorrectnessProjection } from "./result.ts";

const run = <A, E>(effect: Effect.Effect<A, E>): A =>
  Effect.runSync(effect.pipe(Effect.withTracerEnabled(false)));

const runFitting = <A, E>(
  effect: Effect.Effect<A, E, Layer.Success<typeof prophetFittingBackendLayer>>,
): A => run(effect.pipe(Effect.provide(prophetFittingBackendLayer)));

// Holdout is removed before search, planning and every fold fit.
const inputs = (benchmarkCase: BenchmarkCase, dataset: BenchmarkDataset) => {
  const workload = benchmarkCase.workload;

  if (workload.kind !== "evaluation") {
    throw new Error("Expected an evaluation workload");
  }

  // This application-owned temporal split must not leak late source rows into training.
  const ordered = [...dataset.observations].sort((left, right) =>
    left.timestamp.localeCompare(right.timestamp),
  );

  const development = ordered.slice(0, ordered.length - (workload.holdoutRows ?? 0));
  const holdout = ordered.slice(development.length);
  const options = effectOptionsForCase(benchmarkCase);

  if (options === undefined) {
    throw new Error("Expected MAP options");
  }

  return {
    workload,
    development,
    holdout,
    options,
    plan: {
      horizonMs: workload.plan.horizonMs,
      cutoffs: { mode: "explicit" as const, timestamps: workload.plan.cutoffs },
    },
  };
};

type EvaluationWorkload = Extract<BenchmarkCase["workload"], { kind: "evaluation" }>;

/** The aggregation that matches the Python adapter's `rolling_window` for this workload. */
const metricAggregation = (workload: EvaluationWorkload) =>
  workload.metricAggregation === "rolling"
    ? { kind: "rolling" as const, window: { kind: "fraction" as const, value: 0.5 } }
    : { kind: workload.metricAggregation };

const metricPolicy = (workload: EvaluationWorkload) => ({
  metrics: ["mae", "rmse", "smape", "mape"] as const,
  aggregation: metricAggregation(workload),
});

const builtInMetrics: ReadonlyArray<MetricName> = [
  "mae",
  "mse",
  "rmse",
  "mape",
  "mdape",
  "smape",
  "coverage",
];

/** A built-in metric, or the shared custom metric the Python adapter registered under `name`. */
const metricSelection = (name: string): MetricSelection<string> | undefined =>
  builtInMetrics.find((metric) => metric === name) ??
  customMetrics.find((metric) => metric.name === name);

// The custom metric a custom search ranks candidates by, as in the Python adapter.
const customObjective = customMetrics.find((metric) => metric.name === "wape");

/** The metric work a metrics phase times, on precomputed CV rows. */
const metricsFor = (
  result: CrossValidationResult,
  workload: EvaluationWorkload,
  phase: "evaluation-metrics" | "evaluation-metrics-monthly" | "evaluation-metrics-custom",
) => {
  if (phase === "evaluation-metrics")
    return run(performanceMetrics(result, metricPolicy(workload)));

  if (phase === "evaluation-metrics-monthly") {
    return run(
      performanceMetrics(result, { ...metricPolicy(workload), horizon: "calendar-month" }),
    );
  }

  return run(
    performanceMetrics(result, {
      metrics: customMetrics,
      aggregation: metricAggregation(workload),
    }),
  );
};

type Development = ReturnType<typeof inputs>["development"];

/** The MASE metrics `evaluation-metrics-scaled` times, which the Python adapter registers too. */
const scaledMetrics = (development: Development, summary: RollingOriginPlanSummary) =>
  [
    run(scaledErrorMetric(development, summary, { name: "mase", lag: { kind: "previous-row" } })),
    run(
      scaledErrorMetric(development, summary, {
        name: "mase_weekly",
        lag: { kind: "duration", lagMs: 7 * 86_400_000 },
      }),
    ),
  ] as const;

/** The work `evaluation-metrics-scaled` times: each fold's scale, then the metrics on CV rows. */
const scaledMetricsFor = (
  result: CrossValidationResult,
  workload: EvaluationWorkload,
  development: Development,
  summary: RollingOriginPlanSummary,
) =>
  run(
    performanceMetrics(result, {
      metrics: scaledMetrics(development, summary),
      aggregation: metricAggregation(workload),
    }),
  );

/** Each MASE metric's fold scales, in cutoff order, and its overall score on Effect's CV rows. */
const scaledErrorEvidence = (
  result: CrossValidationResult,
  development: Development,
  summary: RollingOriginPlanSummary,
) =>
  scaledMetrics(development, summary).map((metric) => {
    if (metric.reduce !== "mean") throw new Error("Expected a mean scaled metric");

    const report = run(
      performanceMetrics(result, { metrics: [metric], aggregation: { kind: "overall" } }),
    );

    const overall = report.kind === "overall" ? report.bucket.scores[0]?.value : undefined;

    if (overall === undefined) throw new Error("Expected an overall scaled score");

    return {
      metric: metric.name,
      // The metric doesn't expose its scales: a forecast that misses by one scores one over it.
      scales: summary.folds.map(
        (fold) =>
          1 /
          metric.score({
            fold: fold.index,
            cutoff: fold.cutoff,
            timestamp: fold.cutoff,
            horizonMs: 0,
            actual: 1,
            predicted: 0,
          }),
      ),
      overall,
    };
  });

const candidateOptions = (
  options: EncodedProphetOptions,
  prior: number,
  growth?: "logistic",
): EncodedProphetOptions => {
  if (options.growth === "flat") return options;

  if (growth === "logistic" && options.growth === "linear") {
    // A caller-owned growth change must not carry algorithm-specific linear controls.
    const { optimizer: _optimizer, ...map } = options.map ?? {};

    return {
      ...options,
      growth: "logistic",
      map: { ...map, changepointPriorScale: prior },
    };
  }

  if (options.growth === "logistic") {
    return {
      ...options,
      map: { ...options.map, changepointPriorScale: prior },
    };
  }

  return { ...options, map: { ...options.map, changepointPriorScale: prior } };
};

const search = (
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
  metric: SearchObjective["metric"] = "mae",
): ModelSearchResult => {
  const { workload, development, options, plan } = inputs(benchmarkCase, dataset);

  return runFitting(
    searchModels(development, {
      candidates: (workload.candidates ?? []).map((candidate) => ({
        id: candidate.id,
        options: candidateOptions(options, candidate.changepointPriorScale, candidate.growth),
      })),
      plan,
      objective: { metric, aggregation: { kind: "overall" }, direction: "minimize" },
      failurePolicy: "record",
    }),
  );
};

const customSearch = (benchmarkCase: BenchmarkCase, dataset: BenchmarkDataset) => {
  if (customObjective === undefined) throw new Error("Missing the custom search objective");

  return search(benchmarkCase, dataset, customObjective);
};

const holdoutUsingSearch = (
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
  result: ModelSearchResult,
) => {
  const { development, holdout: assessment } = inputs(benchmarkCase, dataset);
  const selected = result.candidates[result.selected.candidateIndex];

  if (selected?.kind !== "success") throw new Error("Search did not select a successful candidate");

  return runFitting(
    evaluateHoldout({
      development,
      holdout: assessment,
      search: result,
      selectedCandidate: {
        id: selected.id,
        candidateIndex: selected.candidateIndex,
        options: selected.options,
        score: selected.score,
      },
      metrics: { metrics: ["mae"], aggregation: { kind: "overall" } },
      baselines: [{ kind: "last-observation" }, { kind: "training-mean" }],
      provenance: {
        build: "benchmark-release",
        environment: "benchmark-container",
      },
    }),
  );
};

const holdout = (benchmarkCase: BenchmarkCase, dataset: BenchmarkDataset) =>
  holdoutUsingSearch(benchmarkCase, dataset, search(benchmarkCase, dataset));

/** Untimed fold identity, alignment, metric and replay checks before eligibility. */
export const evaluationCorrectness = (
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
  runIndex: number,
): CorrectnessProjection => {
  const { workload, development, options, plan } = inputs(benchmarkCase, dataset);
  const summary = run(planRollingOrigin(development, options, plan));
  const result = runFitting(crossValidate(development, options, plan));

  const rows = result.rows.map((row) => ({
    cutoff: row.cutoff,
    timestamp: row.timestamp,
    actual: row.actual,
    predicted: row.predicted,
  }));

  const expectedRows = summary.folds.flatMap((fold) =>
    development
      .filter((row) => {
        const timestamp = Date.parse(row.timestamp);

        return timestamp > fold.cutoff && timestamp <= fold.cutoff + summary.horizonMs;
      })
      .map((row) => ({
        cutoff: fold.cutoff,
        timestamp: Date.parse(row.timestamp),
        actual: row.value,
      })),
  );

  if (result.rows.length !== expectedRows.length || result.folds.length !== summary.folds.length) {
    throw new Error("Evaluation fold/row counts disagree with the public plan");
  }

  for (const [index, row] of result.rows.entries()) {
    const expected = expectedRows[index];

    if (
      expected?.actual !== row.actual ||
      expected.timestamp !== row.timestamp ||
      expected.cutoff !== row.cutoff ||
      !Number.isFinite(row.predicted) ||
      row.horizonMs !== row.timestamp - row.cutoff ||
      (index > 0 && row.fold < (result.rows[index - 1]?.fold ?? 0))
    ) {
      throw new Error("Evaluation output failed alignment or finite checks");
    }
  }

  const metrics = run(
    performanceMetrics(result, {
      metrics: ["mae"],
      aggregation: { kind: "overall" },
    }),
  );

  if (metrics.kind !== "overall") throw new Error("Expected overall evaluation metrics");

  const mae = metrics.bucket.scores[0]?.value;

  if (mae === undefined || !Number.isFinite(mae)) throw new Error("Evaluation MAE is not finite");

  for (const phase of benchmarkCase.phases) {
    if (phase === "evaluation-intervals") {
      if (workload.interval === undefined) throw new Error("Missing interval controls");

      const interval = runFitting(
        crossValidate(development, options, plan, {
          mode: "intervals",
          uncertainty: workload.interval,
        }),
      );

      if (
        interval.rows.length !== result.rows.length ||
        interval.rows.some(
          (row, index) =>
            row.timestamp !== result.rows[index]?.timestamp ||
            row.cutoff !== result.rows[index]?.cutoff ||
            !Number.isFinite(row.lower) ||
            !Number.isFinite(row.upper) ||
            row.lower > row.upper,
        )
      ) {
        throw new Error("Interval dimensions or bounds differ from point CV");
      }
    } else if (
      phase === "evaluation-search" ||
      phase === "evaluation-search-custom" ||
      phase === "evaluation-holdout" ||
      phase === "evaluation-report-encode" ||
      phase === "evaluation-report-decode"
    ) {
      if (phase === "evaluation-search" || phase === "evaluation-search-custom") {
        const selection =
          phase === "evaluation-search"
            ? search(benchmarkCase, dataset)
            : customSearch(benchmarkCase, dataset);

        if (
          selection.candidates.filter((candidate) => candidate.kind === "failure").length !==
          (workload.expectedFailures ?? 0)
        ) {
          throw new Error("Search recorded an unexpected candidate failure count");
        }
      } else {
        evaluationOperation(benchmarkCase, dataset, phase);
      }
    }
  }

  const evaluation: NonNullable<CorrectnessProjection["evaluation"]> = {
    cutoffs: Array.from(summary.cutoffs),
    trainingRows: summary.folds.reduce((count, fold) => count + fold.trainingCount, 0),
    assessmentRows: expectedRows.length,
    rows,
    mae,
  };

  return {
    caseId: benchmarkCase.id,
    run: runIndex,
    status: "locally-passed",
    modelKind: workload.configuration.growth,
    changepointTimestamps: [],
    seasonalities: [],
    events: [],
    regressors: [],
    forecasts: [],
    evaluation: benchmarkCase.phases.includes("evaluation-metrics-scaled")
      ? { ...evaluation, scaledErrors: scaledErrorEvidence(result, development, summary) }
      : evaluation,
  };
};

/** Prepare untimed inputs for pure phases so fitting is excluded from their samples. */
export const preparedEvaluationOperation = (
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
  phase: BenchmarkPhase,
): (() => string | ReturnType<typeof evaluationOperation>) => {
  const { workload, development, options, plan } = inputs(benchmarkCase, dataset);

  if (
    phase === "evaluation-metrics" ||
    phase === "evaluation-metrics-monthly" ||
    phase === "evaluation-metrics-custom"
  ) {
    const result = runFitting(crossValidate(development, options, plan));

    return () => metricsFor(result, workload, phase);
  }

  if (phase === "evaluation-metrics-scaled") {
    const result = runFitting(crossValidate(development, options, plan));
    const summary = run(planRollingOrigin(development, options, plan));

    return () => scaledMetricsFor(result, workload, development, summary);
  }

  if (phase === "evaluation-baseline") {
    const summary = run(planRollingOrigin(development, options, plan));

    return () => [
      run(
        crossValidateBaseline(development, summary, {
          kind: "last-observation",
        }),
      ),
      run(crossValidateBaseline(development, summary, { kind: "training-mean" })),
      run(
        crossValidateBaseline(development, summary, {
          kind: "seasonal-naive",
          lagMs: 7 * 86_400_000,
        }),
      ),
    ];
  }

  if (phase === "evaluation-holdout") {
    const selection = search(benchmarkCase, dataset);

    return () => holdoutUsingSearch(benchmarkCase, dataset, selection);
  }

  if (phase === "evaluation-report-encode") {
    const report = holdout(benchmarkCase, dataset);

    return () => JSON.stringify(run(encodeEvaluationReport(report)));
  }

  if (phase === "evaluation-report-decode") {
    const report = holdout(benchmarkCase, dataset);
    const encoded = JSON.stringify(run(encodeEvaluationReport(report)));

    return () => run(decodeEvaluationReport(JSON.parse(encoded)));
  }

  return () => evaluationOperation(benchmarkCase, dataset, phase);
};

/** Execute one complete, tracing-disabled public evaluation operation. */
export const evaluationOperation = (
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
  phase: BenchmarkPhase,
) => {
  const { workload, development, options, plan } = inputs(benchmarkCase, dataset);

  switch (phase) {
    case "evaluation-plan":
      return run(planRollingOrigin(development, options, plan));
    case "evaluation-point":
    case "cold-first-evaluation":
      return runFitting(crossValidate(development, options, plan));
    case "evaluation-intervals":
      if (workload.interval === undefined) throw new Error("Missing interval controls");

      return runFitting(
        crossValidate(development, options, plan, {
          mode: "intervals",
          uncertainty: workload.interval,
        }),
      );
    case "evaluation-metrics":
    case "evaluation-metrics-monthly":
    case "evaluation-metrics-custom":
      return metricsFor(runFitting(crossValidate(development, options, plan)), workload, phase);
    case "evaluation-metrics-scaled":
      return scaledMetricsFor(
        runFitting(crossValidate(development, options, plan)),
        workload,
        development,
        run(planRollingOrigin(development, options, plan)),
      );

    case "evaluation-baseline": {
      const summary = run(planRollingOrigin(development, options, plan));

      return [
        run(
          crossValidateBaseline(development, summary, {
            kind: "last-observation",
          }),
        ),
        run(
          crossValidateBaseline(development, summary, {
            kind: "training-mean",
          }),
        ),
        run(
          crossValidateBaseline(development, summary, {
            kind: "seasonal-naive",
            lagMs: 7 * 86_400_000,
          }),
        ),
      ];
    }

    case "evaluation-search":
      return search(benchmarkCase, dataset);
    case "evaluation-search-custom":
      return customSearch(benchmarkCase, dataset);
    case "evaluation-holdout":
      return holdout(benchmarkCase, dataset);
    case "evaluation-report-encode":
    case "evaluation-report-decode": {
      const report = holdout(benchmarkCase, dataset);
      const encoded = run(encodeEvaluationReport(report));

      return run(decodeEvaluationReport(JSON.parse(JSON.stringify(encoded))));
    }

    default:
      throw new Error(`Not an evaluation phase: ${phase}`);
  }
};

/**
 * Score Python's own CV rows with Effect, in the order Python's horizon sort left them, and require
 * `performance_metrics`' exact values. Returns why they differ, or `undefined` when every horizon
 * unit matches.
 */
export const metricParityFailure = (
  workload: EvaluationWorkload,
  evaluation: NonNullable<CorrectnessProjection["evaluation"]>,
): string | undefined => {
  for (const evidence of evaluation.metricParity ?? []) {
    const rows = [];

    for (const index of evidence.order) {
      const row = evaluation.rows[index];

      if (row === undefined) return "Python's metric row order names a missing row.";

      rows.push({
        fold: evaluation.cutoffs.indexOf(row.cutoff),
        cutoff: row.cutoff,
        timestamp: row.timestamp,
        horizonMs: row.timestamp - row.cutoff,
        actual: row.actual,
        predicted: row.predicted,
      });
    }

    if (new Set(evidence.order).size !== evaluation.rows.length) {
      return "Python's metric row order is not a permutation of its CV rows.";
    }

    const [first, ...rest] = evidence.metrics.map(metricSelection);
    const selections = rest.filter((selection) => selection !== undefined);

    if (first === undefined || selections.length !== rest.length) {
      return "Python scored a metric Effect has no definition for.";
    }

    const exit = Effect.runSyncExit(
      performanceMetrics(
        { kind: "point", rows },
        {
          metrics: [first, ...selections],
          aggregation: metricAggregation(workload),
          horizon: evidence.horizon,
        },
      ),
    );

    if (Exit.isFailure(exit)) return `Effect could not score Python's ${evidence.horizon} rows.`;
    const report = exit.value;

    // Prophet reports an overall score at the largest horizon, which the report doesn't carry.
    const buckets =
      report.kind === "overall"
        ? [{ horizon: evidence.points[0]?.horizon, scores: report.bucket.scores }]
        : report.points.map((point) => ({
            horizon: "horizonMonths" in point ? point.horizonMonths : point.horizonMs,
            scores: point.scores,
          }));

    const matches =
      buckets.length === evidence.points.length &&
      buckets.every((bucket, index) => {
        const expected = evidence.points[index];

        return (
          expected !== undefined &&
          bucket.horizon === expected.horizon &&
          bucket.scores.length === expected.scores.length &&
          bucket.scores.every(
            (score, position) =>
              score.metric === evidence.metrics[position] &&
              Object.is(score.value, expected.scores[position]),
          )
        );
      });

    if (!matches) {
      return `Effect's ${evidence.horizon} metrics on Python's CV rows differ from performance_metrics.`;
    }
  }

  return undefined;
};

// Both sides sum the same naive errors in a different order, so only rounding separates scales.
const scaleTolerance = 1e-12;

/**
 * Compare the MASE evidence of one Effect run and one Python run. Fold scales come from the history
 * alone, so they must agree to rounding. Each side divides its own forecasts' errors by them, so
 * overall scores may differ by the mean forecast difference over each row's scale, plus rounding.
 * Returns why they differ, or `undefined` when they agree.
 */
export const scaledErrorFailure = (
  effect: NonNullable<CorrectnessProjection["evaluation"]>,
  python: NonNullable<CorrectnessProjection["evaluation"]>,
): string | undefined => {
  const ours = effect.scaledErrors;
  const theirs = python.scaledErrors;

  if (ours === undefined || theirs === undefined) return "Scaled error evidence is missing.";

  if (ours.length !== theirs.length) return "Scaled error metrics differ.";

  for (const [index, mine] of ours.entries()) {
    const other = theirs[index];

    if (
      other?.metric !== mine.metric ||
      mine.scales.length !== effect.cutoffs.length ||
      other.scales.length !== mine.scales.length
    ) {
      return "Scaled error metrics or fold counts differ.";
    }

    const scalesAgree = mine.scales.every((scale, fold) => {
      const pythonScale = other.scales[fold] ?? Number.NaN;

      return Math.abs(scale - pythonScale) <= scaleTolerance * Math.max(scale, pythonScale);
    });

    if (!scalesAgree) return `${mine.metric} fold scales differ.`;

    // ||a - p| - |a - q|| <= |p - q|, so a row's scaled error moves at most this far.
    const bound =
      effect.rows.reduce((sum, row, rowIndex) => {
        const scale = mine.scales[effect.cutoffs.indexOf(row.cutoff)] ?? Number.NaN;
        const predicted = python.rows[rowIndex]?.predicted ?? Number.NaN;

        return sum + Math.abs(row.predicted - predicted) / scale;
      }, 0) / effect.rows.length;

    const allowed = bound + 2 * scaleTolerance * Math.max(mine.overall, other.overall);

    if (!(Math.abs(mine.overall - other.overall) <= allowed)) {
      return `${mine.metric} differs by more than the forecasts do.`;
    }
  }

  return undefined;
};
