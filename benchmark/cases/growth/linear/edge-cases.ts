import type { BenchmarkCase } from "../../../tools/case.ts";
import { linearComparison, linearOptimizerQuality, linearOptimizers } from "./controls.ts";

const phases = [
  "warm-fit",
  "warm-predict",
  "model-json-encode",
  "model-json-decode",
  "fresh-process-restored-predict",
] as const;

const policy = {
  warmupIterations: 1,
  measuredIterations: 2,
  independentRuns: 2,
  timeoutSeconds: 300,
  correctnessTolerances: {
    trend: { absolute: 0.01, relative: 0.002 },
    component: { absolute: 0.01, relative: 0.002 },
    additive: { absolute: 0.01, relative: 0.002 },
    forecast: { absolute: 0.01, relative: 0.002 },
    noiseScale: { absolute: 0.01, relative: 0.02 },
    persistence: { absolute: 1e-10, relative: 0 },
  },
};

const automatic = { mode: "auto", count: 25, range: 0.8 } as const;

const explicit = { mode: "explicit", timestamps: ["2020-01-17T00:00:00.000Z"] } as const;

/** Flat zero-span probes keep their original row-handling evidence and Python controls. */
const flatComparison = {
  kind: "equivalent-objective",
  evidenceId: "training-row-map-v1",
} as const;

const flatPythonOptimizer = {
  algorithm: "Newton",
  maxIterations: 10000,
  newtonFallback: false,
} as const;

const configuration = {
  growth: "linear",
  scaling: "absmax",
  seasonalityMode: "additive",
  holidaysMode: "additive",
  changepoints: automatic,
  changepointPriorScale: 0.05,
  seasonalities: [],
  events: [],
  regressors: [],
} as const;

const features = {
  seasonalities: [
    {
      name: "weekly-active",
      periodDays: 7,
      fourierOrder: 1,
      priorScale: 10,
      conditionName: "active",
    },
  ],
  regressors: [{ name: "promotion", priorScale: 10, standardization: "never" }],
} as const;

/** Migration edge cases use the existing correctness-first MAP adapters. */
export const linearGrowthEdgeCases: ReadonlyArray<BenchmarkCase> = [
  ...(["ordered", "unsorted", "duplicates"] as const).flatMap((variant) =>
    (["explicit", "auto"] as const).map((points) => ({
      ...policy,
      id: `map-training-${variant}-${points}`,
      dataset: `v1/training-${variant}.json`,
      workload: {
        kind: "stage-f-map" as const,
        comparison: linearComparison,
        configuration: {
          ...configuration,
          changepoints: points === "explicit" ? explicit : automatic,
        },
        ...linearOptimizers,
      },
      optimizerQuality: linearOptimizerQuality,
      phases,
    })),
  ),
  {
    ...policy,
    id: "map-training-duplicate-features-auto",
    dataset: "v1/training-duplicate-features.json",
    workload: {
      kind: "stage-f-map",
      comparison: linearComparison,
      configuration: { ...configuration, ...features },
      ...linearOptimizers,
    },
    optimizerQuality: linearOptimizerQuality,
    phases,
  },
  {
    ...policy,
    id: "uncertainty-training-duplicates-auto",
    dataset: "v1/training-duplicates.json",
    workload: {
      kind: "stage-f-map",
      comparison: linearComparison,
      configuration,
      ...linearOptimizers,
      uncertainty: {
        seed: 42,
        samples: 128,
        intervalWidth: 0.8,
        output: "samples",
        algorithm: "scalar-continuous-time",
        evidence: "docs/validation/uncertainty.md",
        samplerMemoryLimitBytes: 33554432,
      },
    },
    optimizerQuality: linearOptimizerQuality,
    phases: ["warm-uncertainty", "fresh-process-restored-uncertainty"],
  },
  ...(["varied", "constant"] as const).flatMap((variant) =>
    (["linear", "flat"] as const).map((growth) => {
      const base = {
        ...policy,
        id: `map-training-zero-span-${growth}-${variant}`,
        dataset: `v1/training-zero-span-${variant}.json`,
        phases,
      };

      const workload = {
        kind: "stage-f-map" as const,
        configuration: {
          ...configuration,
          growth,
          changepoints:
            growth === "flat" ? { mode: "explicit" as const, timestamps: [] } : automatic,
        },
      };

      return growth === "flat"
        ? {
            ...base,
            workload: {
              ...workload,
              comparison: flatComparison,
              pythonOptimizer: flatPythonOptimizer,
            },
          }
        : {
            ...base,
            workload: { ...workload, comparison: linearComparison, ...linearOptimizers },
            optimizerQuality: linearOptimizerQuality,
          };
    }),
  ),
  {
    ...policy,
    id: "evaluation-training-duplicates",
    dataset: "v1/training-duplicates.json",
    workload: {
      kind: "evaluation",
      comparison: { kind: "different-public-work", evidenceId: "stage-h-evaluation-v1" },
      configuration: { ...configuration, changepoints: explicit },
      ...linearOptimizers,
      plan: {
        horizonMs: 3 * 86400000,
        cutoffs: ["2020-01-18T00:00:00.000Z", "2020-01-19T00:00:00.000Z"],
      },
      metricAggregation: "overall",
      mapeZeroActual: "exclude",
      candidates: [{ id: "control", changepointPriorScale: 0.05 }],
      holdoutRows: 8,
    },
    phases: [
      "evaluation-plan",
      "evaluation-point",
      "evaluation-baseline",
      "evaluation-search",
      "evaluation-holdout",
      "evaluation-report-encode",
      "evaluation-report-decode",
    ],
  },
];
