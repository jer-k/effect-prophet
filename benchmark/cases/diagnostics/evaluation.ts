import type { BenchmarkCase } from "../../tools/case.ts";
import { defaultCaseTolerances } from "../growth/defaults.ts";
import { linearOptimizers } from "../growth/linear/controls.ts";
import { growthScalingAndMixedMapCases } from "../growth/mixed-map.ts";
import { prophetDefaultChangepoints } from "../prophet-defaults.ts";

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
 * Calendar-month, custom and scaled metrics on long horizons: three cutoffs four weeks apart, each
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
      "evaluation-metrics-scaled",
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

/** `count` cutoffs `spacingDays` apart, starting at `first`. */
const cutoffsFrom = (first: string, count: number, spacingDays: number) =>
  Array.from({ length: count }, (_, index) =>
    new Date(Date.parse(first) + index * spacingDays * dayMs).toISOString(),
  );

const pointPhases = [
  "evaluation-point",
  "evaluation-point-threads",
  "evaluation-point-processes",
] as const;

/**
 * Twelve folds, enough for parallel work to show, timed sequentially on both sides and through
 * Python's `parallel="threads"` and `parallel="processes"`. Effect runs folds one at a time.
 */
const parallelCases: ReadonlyArray<BenchmarkCase> = [
  {
    // Three years of daily rows and Prophet's default model, written out so a fold can't drop
    // yearly seasonality: monthly cutoffs through the last year, each forecasting 30 days.
    id: "evaluation-linear-long-history-parallel",
    dataset: "v3/linear-long-history.json",
    workload: {
      kind: "evaluation",
      comparison: { kind: "different-public-work", evidenceId: "rolling-origin-evaluation-v1" },
      configuration: {
        growth: "linear",
        scaling: "absmax",
        seasonalityMode: "additive",
        holidaysMode: "additive",
        changepoints: prophetDefaultChangepoints,
        changepointPriorScale: 0.05,
        seasonalities: [
          { name: "yearly-custom", periodDays: 365.25, fourierOrder: 10, priorScale: 10 },
          { name: "weekly-custom", periodDays: 7, fourierOrder: 3, priorScale: 10 },
        ],
        events: [],
        regressors: [],
      },
      ...linearOptimizers,
      metricAggregation: "horizons",
      plan: { horizonMs: 30 * dayMs, cutoffs: cutoffsFrom("2022-01-01T00:00:00.000Z", 12, 30) },
      interval: { seed: 19, samples: 256, intervalWidth: 0.8 },
    },
    phases: [
      ...pointPhases,
      "evaluation-intervals",
      "evaluation-intervals-threads",
      "evaluation-intervals-processes",
    ],
    warmupIterations: 1,
    measuredIterations: 2,
    independentRuns: 2,
    timeoutSeconds: 900,
    correctnessTolerances: defaultCaseTolerances,
  },
  ...[
    { id: "flat-large", source: "flat-mixed-components-large" },
    { id: "logistic-large", source: "logistic-implicit-floor-large" },
  ].map(({ id, source }): BenchmarkCase => {
    const { shared, declare } = evaluationSource(source);

    // Weekly cutoffs through the last twelve weeks, each forecasting a week.
    const declaration = declare(
      { horizonMs: 7 * dayMs, cutoffs: cutoffsFrom("2020-06-20T00:00:00.000Z", 12, 7) },
      "horizons",
    );

    return id === "logistic-large"
      ? {
          ...shared,
          id: `evaluation-${id}-parallel`,
          workload: {
            ...declaration,
            candidates: [
              { id: "prior-low", changepointPriorScale: 0.1 },
              { id: "prior-mid", changepointPriorScale: 0.2 },
              { id: "prior-high", changepointPriorScale: 0.5 },
            ],
          },
          phases: [
            ...pointPhases,
            "evaluation-search",
            "evaluation-search-threads",
            "evaluation-search-processes",
          ],
        }
      : { ...shared, id: `evaluation-${id}-parallel`, workload: declaration, phases: pointPhases };
  }),
];

/** Every evaluation benchmark case. */
export const evaluationCases: ReadonlyArray<BenchmarkCase> = [
  ...rollingOriginCases,
  ...metricCases,
  customSearchCase,
  ...parallelCases,
];
