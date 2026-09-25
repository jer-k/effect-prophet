import type { BenchmarkCase } from "../case.ts";
import { growthScalingAndMixedMapCases } from "./growth-scaling-and-mixed-map.ts";

const dayMs = 86_400_000;

const base = (id: string): BenchmarkCase => {
  const found = growthScalingAndMixedMapCases.find((item) => item.id === id);

  if (found === undefined || found.workload.kind !== "stage-f-map") {
    throw new Error(`Missing benchmark source case: ${id}`);
  }

  return found;
};

/** Deterministic evaluation work on already-versioned, complete-row Stage F datasets. */
export const evaluationCases: ReadonlyArray<BenchmarkCase> = [
  { id: "linear", source: "linear-offset-scaling-absmax" },
  { id: "flat-mixed", source: "flat-mixed-components" },
  { id: "logistic", source: "logistic-implicit-floor-absmax" },
  { id: "flat-large", source: "flat-mixed-components-large" },
  { id: "logistic-large", source: "logistic-implicit-floor-large" },
  { id: "linear-failure", source: "linear-offset-scaling-absmax" },
].flatMap(({ id, source }) => {
  const original = base(source);
  const workload = original.workload;

  if (workload.kind !== "stage-f-map") {
    throw new Error("Evaluation source must be a Stage F MAP case");
  }

  const shared = {
    ...original,
    warmupIterations: 1,
    measuredIterations: 2,
    independentRuns: 2,
    timeoutSeconds: 900,
  };

  const configuration = {
    kind: "evaluation" as const,
    comparison: { kind: "different-public-work" as const, evidenceId: "stage-h-evaluation-v1" },
    configuration: workload.configuration,
    pythonOptimizer: workload.pythonOptimizer,
    metricAggregation: id.endsWith("large")
      ? ("rolling" as const)
      : id === "linear"
        ? ("overall" as const)
        : ("horizons" as const),
    mapeZeroActual: "exclude" as const,
    plan: {
      horizonMs: 7 * dayMs,
      cutoffs: id.endsWith("large")
        ? ["2020-08-12T00:00:00.000Z", "2020-08-19T00:00:00.000Z"]
        : id === "logistic"
          ? ["2020-03-17T00:00:00.000Z"]
          : id === "flat-mixed"
            ? ["2020-03-03T00:00:00.000Z", "2020-03-10T00:00:00.000Z", "2020-03-17T00:00:00.000Z"]
            : ["2020-03-10T00:00:00.000Z", "2020-03-17T00:00:00.000Z"],
    },
  };

  const declaration =
    workload.effectOptimizer === undefined
      ? configuration
      : { ...configuration, effectOptimizer: workload.effectOptimizer };

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
