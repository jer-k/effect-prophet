import type { BenchmarkCase } from "../../tools/case.ts";
import { growthScalingAndMixedMapCases } from "../growth/mixed-map.ts";

const dayMs = 86_400_000;

type EvaluationWorkload = Extract<BenchmarkCase["workload"], { kind: "evaluation" }>;

const base = (id: string): BenchmarkCase => {
  const found = growthScalingAndMixedMapCases.find((item) => item.id === id);

  if (found === undefined || found.workload.kind !== "map") {
    throw new Error(`Missing benchmark source case: ${id}`);
  }

  return found;
};

/** A source MAP case's dataset, gates and fit options, declared as evaluation work. */
const evaluationSource = (source: string) => {
  const original = base(source);
  const workload = original.workload;

  if (workload.kind !== "map") {
    throw new Error("Evaluation source must be a MAP case");
  }

  // Evaluation compares cross-validation rows, not one fit's optimizer endpoint.
  const { optimizerQuality: _optimizerQuality, ...declared } = original;

  const shared = {
    ...declared,
    warmupIterations: 1,
    measuredIterations: 2,
    independentRuns: 2,
    timeoutSeconds: 900,
  };

  const declare = (
    plan: EvaluationWorkload["plan"],
    metricAggregation: EvaluationWorkload["metricAggregation"],
  ): EvaluationWorkload => {
    const configuration = {
      kind: "evaluation" as const,
      comparison: {
        kind: "different-public-work" as const,
        evidenceId: "rolling-origin-evaluation-v1",
      },
      configuration: workload.configuration,
      pythonOptimizer: workload.pythonOptimizer,
      metricAggregation,
      plan,
    };

    return workload.effectOptimizer === undefined
      ? configuration
      : { ...configuration, effectOptimizer: workload.effectOptimizer };
  };

  return { shared, declare };
};

/** Deterministic evaluation work on already-versioned, complete-row MAP datasets. */
const rollingOriginCases: ReadonlyArray<BenchmarkCase> = [
  { id: "linear", source: "linear-offset-scaling-absmax" },
  { id: "flat-mixed", source: "flat-mixed-components" },
  { id: "logistic", source: "logistic-implicit-floor-absmax" },
  { id: "flat-large", source: "flat-mixed-components-large" },
  { id: "logistic-large", source: "logistic-implicit-floor-large" },
  { id: "linear-failure", source: "linear-offset-scaling-absmax" },
].flatMap(({ id, source }) => {
  const { shared, declare } = evaluationSource(source);

  const declaration = declare(
    {
      horizonMs: 7 * dayMs,
      cutoffs: id.endsWith("large")
        ? ["2020-08-12T00:00:00.000Z", "2020-08-19T00:00:00.000Z"]
        : id === "logistic"
          ? ["2020-03-17T00:00:00.000Z"]
          : id === "flat-mixed"
            ? ["2020-03-03T00:00:00.000Z", "2020-03-10T00:00:00.000Z", "2020-03-17T00:00:00.000Z"]
            : ["2020-03-10T00:00:00.000Z", "2020-03-17T00:00:00.000Z"],
    },
    id.endsWith("large") ? "rolling" : id === "linear" ? "overall" : "horizons",
  );

  const candidates = [
    { id: "prior-low", changepointPriorScale: id === "logistic" ? 0.2 : 0.05 },
    { id: "prior-high", changepointPriorScale: id === "logistic" ? 0.25 : 0.2 },
    ...(id === "flat-mixed" ? [{ id: "prior-third", changepointPriorScale: 0.5 }] : []),
    ...(id === "linear-failure"
      ? [{ id: "missing-capacity", changepointPriorScale: 0.1, growth: "logistic" as const }]
      : []),
  ];

  const selection =
    id === "linear-failure"
      ? { ...declaration, candidates, holdoutRows: 8, expectedFailures: 1 }
      : { ...declaration, candidates, holdoutRows: 8 };

  return [
    ...(!id.endsWith("failure")
      ? [
          {
            ...shared,
            id: `evaluation-${id}-point`,
            workload: declaration,
            phases: [
              "evaluation-input-conversion",
              "evaluation-plan",
              "evaluation-point",
              "evaluation-metrics",
              "evaluation-baseline",
              "cold-first-evaluation",
            ] as const,
          },
          {
            ...shared,
            id: `evaluation-${id}-intervals`,
            workload: {
              ...declaration,
              interval: {
                seed: 19,
                samples: id.includes("logistic") ? 256 : id.includes("flat") ? 128 : 64,
                intervalWidth: 0.8,
              },
            },
            phases: ["evaluation-intervals"] as const,
          },
        ]
      : []),
    ...(!id.endsWith("large")
      ? [
          {
            ...shared,
            id: `evaluation-${id}-search`,
            workload: selection,
            phases: [
              "evaluation-search",
              "evaluation-holdout",
              "evaluation-report-encode",
              "evaluation-report-decode",
            ] as const,
          },
        ]
      : []),
  ];
});

/**
 * Calendar-month and custom metrics on long horizons: three cutoffs four weeks apart, each
 * forecasting 91 days, so forecasts land zero to three months after their cutoff's month.
 */
const monthsPlan = {
  horizonMs: 91 * dayMs,
  cutoffs: ["2020-05-01T00:00:00.000Z", "2020-05-29T00:00:00.000Z", "2020-06-12T00:00:00.000Z"],
};

const metricCases: ReadonlyArray<BenchmarkCase> = [
  { id: "flat-large", source: "flat-mixed-components-large", aggregation: "rolling" as const },
  {
    id: "logistic-large",
    source: "logistic-implicit-floor-large",
    aggregation: "horizons" as const,
  },
].map(({ id, source, aggregation }) => {
  const { shared, declare } = evaluationSource(source);

  return {
    ...shared,
    id: `evaluation-${id}-months-metrics`,
    workload: declare(monthsPlan, aggregation),
    phases: [
      "evaluation-metrics",
      "evaluation-metrics-monthly",
      "evaluation-metrics-custom",
    ] as const,
  };
});

/** Choosing settings by a custom metric, next to the same search by `mae`. */
const customSearchCase: BenchmarkCase = (() => {
  const { shared, declare } = evaluationSource("linear-offset-scaling-absmax");

  return {
    ...shared,
    id: "evaluation-linear-custom-search",
    workload: {
      ...declare(
        {
          horizonMs: 7 * dayMs,
          cutoffs: ["2020-03-10T00:00:00.000Z", "2020-03-17T00:00:00.000Z"],
        },
        "overall",
      ),
      candidates: [
        { id: "prior-low", changepointPriorScale: 0.05 },
        { id: "prior-high", changepointPriorScale: 0.2 },
      ],
    },
    phases: ["evaluation-search", "evaluation-search-custom"] as const,
  };
})();

/** Every evaluation benchmark case. */
export const evaluationCases: ReadonlyArray<BenchmarkCase> = [
  ...rollingOriginCases,
  ...metricCases,
  customSearchCase,
];
