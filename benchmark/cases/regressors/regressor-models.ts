import type { BenchmarkCase } from "../../tools/case.ts";
import { flatDefaultOptimizerCases } from "../growth/mixed-map.ts";
import {
  linearComparison,
  linearOptimizerQuality,
  linearOptimizers,
} from "../growth/linear/controls.ts";
import { prophetDefaultChangepoints } from "../prophet-defaults.ts";
import { scalarUncertaintyControls } from "../uncertainty/controls.ts";

const dayMs = 86_400_000;

type MapWorkload = Extract<BenchmarkCase["workload"], { kind: "map" }>;

/**
 * Fit and forecast phases. Python's `model_to_json` drops each regressor model, so its restored
 * model would need the regressor's future values, and the persistence phases are left out.
 */
const phases = [
  "adapter-input-conversion",
  "warm-fit",
  "warm-predict",
  "warm-fit-predict",
  "warm-fit-predict-with-conversion",
  "cold-first-forecast",
] as const;

const flatSource = flatDefaultOptimizerCases.find(
  (candidate) => candidate.id === "flat-correlated-regressors",
);

if (flatSource === undefined || flatSource.workload.kind !== "map") {
  throw new Error("Missing flat regressor benchmark source");
}

const flatWorkload: MapWorkload = flatSource.workload;

/**
 * Two years of daily rows whose temperature regressor gets its own default model, like
 * `add_regressor("temperature", regressor_predictor=True)`. The dataset's future temperatures
 * are replaced by that model's forecast in both libraries.
 */
const flatCase: BenchmarkCase = {
  ...flatSource,
  id: "flat-regressor-model",
  workload: {
    ...flatWorkload,
    configuration: {
      ...flatWorkload.configuration,
      regressors: flatWorkload.configuration.regressors.map((regressor) =>
        regressor.name === "temperature" ? { ...regressor, predictor: true as const } : regressor,
      ),
    },
  },
  phases,
};

/**
 * 256 daily rows on Prophet's linear defaults with four regressors. The smooth cyclical one gets
 * its own default model; the binary and scaled ones are supplied as usual. Both libraries keep
 * their default optimizers, which the regressor model shares.
 */
const linearCase: BenchmarkCase = {
  id: "linear-regressor-model",
  dataset: "v1/map-regressors-medium.json",
  workload: {
    kind: "map",
    comparison: linearComparison,
    configuration: {
      growth: "linear",
      scaling: "absmax",
      seasonalityMode: "additive",
      holidaysMode: "additive",
      changepoints: prophetDefaultChangepoints,
      changepointPriorScale: 0.05,
      seasonalities: [],
      events: [],
      regressors: [
        { name: "binary-auto", priorScale: 10, standardization: "auto" },
        { name: "numeric-auto", priorScale: 10, standardization: "auto", predictor: true },
        { name: "numeric-always", priorScale: 7, standardization: "always" },
        { name: "numeric-never", priorScale: 5, standardization: "never" },
      ],
    },
    ...linearOptimizers,
  },
  optimizerQuality: linearOptimizerQuality,
  phases,
  warmupIterations: 1,
  measuredIterations: 2,
  independentRuns: 2,
  timeoutSeconds: 600,
  correctnessTolerances: flatSource.correctnessTolerances,
};

/**
 * Ranges from 1,000 simulated futures, each with one of the regressor model's own draws. Python
 * draws 1,000 from each regressor model whatever the main model's count, so only this count
 * compares the same distribution.
 */
const uncertaintyCase = (source: BenchmarkCase): BenchmarkCase => {
  if (source.workload.kind !== "map") {
    throw new Error("Uncertainty requires a MAP model");
  }

  return {
    ...source,
    id: `uncertainty-${source.id}-intervals-1000`,
    workload: { ...source.workload, uncertainty: scalarUncertaintyControls("intervals", 1_000) },
    phases: ["uncertainty-input-conversion", "warm-uncertainty", "cold-first-uncertainty"],
    warmupIterations: 1,
    measuredIterations: 3,
    independentRuns: 2,
  };
};

/**
 * Cross-validation that fits each fold's regressor model to that fold's history, with points
 * and with ranges. Python's `cross_validation` refits it on standardized values instead, so the
 * Python adapter fits each cutoff through `fit` and `predict`, the same work Effect does.
 */
const evaluationCases = (
  source: BenchmarkCase,
  cutoffs: ReadonlyArray<string>,
): ReadonlyArray<BenchmarkCase> => {
  if (source.workload.kind !== "map") {
    throw new Error("Evaluation requires a MAP model");
  }

  const { optimizerQuality: _optimizerQuality, ...declared } = source;

  const declaration = {
    kind: "evaluation" as const,
    comparison: {
      kind: "different-public-work" as const,
      evidenceId: "rolling-origin-evaluation-v1",
    },
    configuration: source.workload.configuration,
    pythonOptimizer: source.workload.pythonOptimizer,
    metricAggregation: "horizons" as const,
    plan: { horizonMs: 7 * dayMs, cutoffs },
  };

  const { effectOptimizer } = source.workload;

  const workload =
    effectOptimizer === undefined ? declaration : { ...declaration, effectOptimizer };

  const shared = {
    ...declared,
    warmupIterations: 1,
    measuredIterations: 2,
    independentRuns: 2,
    timeoutSeconds: 900,
  };

  return [
    {
      ...shared,
      id: `evaluation-${source.id}-point`,
      workload,
      phases: [
        "evaluation-input-conversion",
        "evaluation-plan",
        "evaluation-point",
        "evaluation-metrics",
        "evaluation-baseline",
        "cold-first-evaluation",
      ],
    },
    {
      ...shared,
      id: `evaluation-${source.id}-intervals`,
      workload: { ...workload, interval: { seed: 19, samples: 128, intervalWidth: 0.8 } },
      phases: ["evaluation-intervals"],
    },
  ];
};

/** Regressors forecast by their own models: fitting, forecasting, ranges and cross-validation. */
export const regressorModelCases: ReadonlyArray<BenchmarkCase> = [
  flatCase,
  linearCase,
  uncertaintyCase(flatCase),
  uncertaintyCase(linearCase),
  ...evaluationCases(flatCase, ["2021-12-02T00:00:00.000Z", "2021-12-16T00:00:00.000Z"]),
  ...evaluationCases(linearCase, ["2020-08-22T00:00:00.000Z", "2020-09-02T00:00:00.000Z"]),
];
