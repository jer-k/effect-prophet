import type { BenchmarkCase } from "../../../tools/case.ts";

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

const effectOptimizer = {
  maxIterations: 10000,
  relativeTolerance: 1e-10,
  absoluteTolerance: 1e-12,
};

const pythonOptimizer = {
  algorithm: "Newton",
  maxIterations: 10000,
  newtonFallback: false,
} as const;

const automatic = { mode: "auto", count: 25, range: 0.8 } as const;

const explicit = { mode: "explicit", timestamps: ["2020-01-17T00:00:00.000Z"] } as const;

const comparison = { kind: "equivalent-objective", evidenceId: "training-row-map-v1" } as const;

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
        comparison,
        configuration: {
          ...configuration,
          changepoints: points === "explicit" ? explicit : automatic,
        },
        effectOptimizer,
        pythonOptimizer,
      },
      phases,
    })),
  ),
  {
    ...policy,
    id: "map-training-duplicate-features-auto",
    dataset: "v1/training-duplicate-features.json",
    workload: {
      kind: "stage-f-map",
      comparison,
      configuration: { ...configuration, ...features },
      effectOptimizer,
      pythonOptimizer,
    },
    phases,
  },
  {
    ...policy,
    id: "uncertainty-training-duplicates-auto",
    dataset: "v1/training-duplicates.json",
    workload: {
      kind: "stage-f-map",
      comparison,
      configuration,
      effectOptimizer,
      pythonOptimizer,
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
        comparison,
        configuration: {
          ...configuration,
          growth,
          changepoints:
            growth === "flat" ? { mode: "explicit" as const, timestamps: [] } : automatic,
        },
        pythonOptimizer,
      };

      return growth === "flat"
        ? { ...base, workload }
        : { ...base, workload: { ...workload, effectOptimizer } };
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
      effectOptimizer,
      pythonOptimizer,
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
