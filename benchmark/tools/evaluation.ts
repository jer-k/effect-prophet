import { Effect, Layer } from "effect";
import {
  crossValidate,
  crossValidateBaseline,
  decodeEvaluationReport,
  encodeEvaluationReport,
  evaluateHoldout,
  performanceMetrics,
  planRollingOrigin,
  prophetFittingBackendLayer,
  searchModels,
  type EncodedProphetOptions,
  type ModelSearchResult,
} from "effect-prophet";

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

const metricPolicy = (workload: Extract<BenchmarkCase["workload"], { kind: "evaluation" }>) => ({
  metrics: ["mae", "rmse", "smape", "mape"] as const,
  aggregation:
    workload.metricAggregation === "rolling"
      ? {
          kind: "rolling" as const,
          window: { kind: "fraction" as const, value: 0.5 },
        }
      : { kind: workload.metricAggregation },
  mapeZeroActual: workload.mapeZeroActual,
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

const search = (benchmarkCase: BenchmarkCase, dataset: BenchmarkDataset): ModelSearchResult => {
  const { workload, development, options, plan } = inputs(benchmarkCase, dataset);

  return runFitting(
    searchModels(development, {
      candidates: (workload.candidates ?? []).map((candidate) => ({
        id: candidate.id,
        options: candidateOptions(options, candidate.changepointPriorScale, candidate.growth),
      })),
      plan,
      objective: {
        metric: "mae",
        aggregation: { kind: "overall" },
        direction: "minimize",
      },
      failurePolicy: "record",
    }),
  );
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
      phase === "evaluation-holdout" ||
      phase === "evaluation-report-encode" ||
      phase === "evaluation-report-decode"
    ) {
      if (phase === "evaluation-search") {
        const selection = search(benchmarkCase, dataset);

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
    evaluation: {
      cutoffs: Array.from(summary.cutoffs),
      trainingRows: summary.folds.reduce((count, fold) => count + fold.trainingCount, 0),
      assessmentRows: expectedRows.length,
      rows,
      mae,
    },
  };
};

/** Prepare untimed inputs for pure phases so fitting is excluded from their samples. */
export const preparedEvaluationOperation = (
  benchmarkCase: BenchmarkCase,
  dataset: BenchmarkDataset,
  phase: BenchmarkPhase,
): (() => string | ReturnType<typeof evaluationOperation>) => {
  const { workload, development, options, plan } = inputs(benchmarkCase, dataset);

  if (phase === "evaluation-metrics") {
    const result = runFitting(crossValidate(development, options, plan));

    return () => run(performanceMetrics(result, metricPolicy(workload)));
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
    case "evaluation-metrics": {
      const result = runFitting(crossValidate(development, options, plan));

      return run(performanceMetrics(result, metricPolicy(workload)));
    }

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
