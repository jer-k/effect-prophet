import type { BenchmarkCase } from "../case.ts";

const phases = [
  "adapter-input-conversion",
  "warm-fit",
  "warm-predict",
  "warm-fit-predict",
  "warm-fit-predict-with-conversion",
  "cold-first-forecast",
  "model-json-encode",
  "model-json-decode",
  "fresh-process-restored-predict",
] as const;

const tolerances = {
  trend: { absolute: 0.25, relative: 0.02 },
  component: { absolute: 0.15, relative: 0.04 },
  additive: { absolute: 0.15, relative: 0.04 },
  forecast: { absolute: 0.3, relative: 0.02 },
  noiseScale: { absolute: 0.1, relative: 0.2 },
  persistence: { absolute: 1e-8, relative: 0 },
};

const optimizer = { maxIterations: 10000, relativeTolerance: 1e-7, absoluteTolerance: 1e-9 };

const pythonOptimizer = {
  algorithm: "LBFGS",
  maxIterations: 10000,
  newtonFallback: false,
} as const;

const noPoints = { mode: "explicit", timestamps: [] } as const;

const onePoint = { mode: "explicit", timestamps: ["2020-02-10T00:00:00.000Z"] } as const;

const weekly = { name: "weekly-custom", periodDays: 7, fourierOrder: 2, priorScale: 10 };

const promotion = { name: "promotion", priorScale: 10, standardization: "never" } as const;

const campaign = {
  name: "campaign",
  date: "2020-01-22",
  lowerWindowDays: 0,
  upperWindowDays: 0,
  priorScale: 10,
};

/** Deterministic growth, scaling, and mixed-component MAP workloads for both adapters. */
export const growthScalingAndMixedMapCases: ReadonlyArray<BenchmarkCase> = [
  ...(["absmax", "minmax"] as const).map((scaling) => ({
    id: `linear-offset-scaling-${scaling}`,
    dataset: "generated/linear-offset-scaling.json",
    workload: {
      kind: "stage-f-map" as const,
      comparison: { kind: "equivalent-objective" as const, evidenceId: "stage-f-scaling-v1" },
      configuration: {
        growth: "linear" as const,
        scaling,
        seasonalityMode: "additive" as const,
        holidaysMode: "additive" as const,
        changepoints: onePoint,
        changepointPriorScale: 0.2,
        seasonalities: [weekly],
        events: [],
        regressors: [],
      },
      effectOptimizer: optimizer,
      pythonOptimizer,
    },
    phases,
    warmupIterations: 1,
    measuredIterations: 2,
    independentRuns: 2,
    timeoutSeconds: 600,
    correctnessTolerances: tolerances,
  })),
  {
    id: "flat-mixed-components",
    dataset: "generated/flat-mixed-components.json",
    workload: {
      kind: "stage-f-map",
      comparison: { kind: "equivalent-objective", evidenceId: "stage-f-flat-mixed-v1" },
      configuration: {
        growth: "flat",
        scaling: "minmax",
        seasonalityMode: "additive",
        holidaysMode: "additive",
        changepoints: noPoints,
        changepointPriorScale: 0.05,
        seasonalities: [{ ...weekly, conditionName: "active", mode: "multiplicative" }],
        events: [campaign],
        regressors: [promotion],
      },
      pythonOptimizer,
    },
    phases,
    warmupIterations: 1,
    measuredIterations: 2,
    independentRuns: 2,
    timeoutSeconds: 600,
    correctnessTolerances: tolerances,
  },
  {
    id: "linear-mixed-components",
    dataset: "generated/linear-mixed-components.json",
    workload: {
      kind: "stage-f-map",
      comparison: { kind: "equivalent-objective", evidenceId: "stage-f-linear-mixed-v1" },
      configuration: {
        growth: "linear",
        scaling: "absmax",
        seasonalityMode: "multiplicative",
        holidaysMode: "additive",
        changepoints: onePoint,
        changepointPriorScale: 0.2,
        seasonalities: [{ ...weekly, conditionName: "active" }],
        events: [campaign],
        regressors: [promotion],
      },
      effectOptimizer: optimizer,
      pythonOptimizer,
    },
    phases,
    warmupIterations: 1,
    measuredIterations: 2,
    independentRuns: 2,
    timeoutSeconds: 600,
    correctnessTolerances: tolerances,
  },
  {
    id: "flat-mixed-components-large",
    dataset: "generated/flat-mixed-components-large.json",
    workload: {
      kind: "stage-f-map",
      comparison: { kind: "equivalent-objective", evidenceId: "stage-f-flat-mixed-v1" },
      configuration: {
        growth: "flat",
        scaling: "minmax",
        seasonalityMode: "additive",
        holidaysMode: "additive",
        changepoints: noPoints,
        changepointPriorScale: 0.05,
        seasonalities: [{ ...weekly, conditionName: "active", mode: "multiplicative" }],
        events: [campaign],
        regressors: [promotion],
      },
      pythonOptimizer,
    },
    phases,
    warmupIterations: 1,
    measuredIterations: 2,
    independentRuns: 2,
    timeoutSeconds: 600,
    correctnessTolerances: tolerances,
  },
  ...(["implicit", "explicit"] as const).flatMap((floorPolicy) =>
    (["absmax", "minmax"] as const).map((scaling) => ({
      id: `logistic-${floorPolicy}-floor-${scaling}`,
      dataset: `generated/logistic-${floorPolicy}-floor.json`,
      workload: {
        kind: "stage-f-map" as const,
        comparison: { kind: "equivalent-objective" as const, evidenceId: "stage-f-logistic-v1" },
        configuration: {
          growth: "logistic" as const,
          scaling,
          seasonalityMode: "additive" as const,
          holidaysMode: "additive" as const,
          changepoints: onePoint,
          changepointPriorScale: 0.2,
          seasonalities: [weekly],
          events: [],
          regressors:
            floorPolicy === "explicit" ? [{ ...promotion, mode: "multiplicative" as const }] : [],
        },
        effectOptimizer: optimizer,
        pythonOptimizer,
      },
      phases,
      warmupIterations: 1,
      measuredIterations: 2,
      independentRuns: 2,
      timeoutSeconds: 600,
      correctnessTolerances: tolerances,
    })),
  ),
  {
    id: "logistic-implicit-floor-auto-changepoints",
    dataset: "generated/logistic-implicit-floor.json",
    workload: {
      kind: "stage-f-map",
      comparison: { kind: "equivalent-objective", evidenceId: "stage-f-logistic-v1" },
      configuration: {
        growth: "logistic",
        scaling: "minmax",
        seasonalityMode: "additive",
        holidaysMode: "additive",
        changepoints: { mode: "auto", count: 2, range: 0.8 },
        changepointPriorScale: 0.2,
        seasonalities: [weekly],
        events: [],
        regressors: [],
      },
      effectOptimizer: optimizer,
      pythonOptimizer,
    },
    phases,
    warmupIterations: 1,
    measuredIterations: 2,
    independentRuns: 2,
    timeoutSeconds: 600,
    correctnessTolerances: tolerances,
  },
  {
    id: "logistic-implicit-floor-large",
    dataset: "generated/logistic-implicit-floor-large.json",
    workload: {
      kind: "stage-f-map",
      comparison: { kind: "equivalent-objective", evidenceId: "stage-f-logistic-v1" },
      configuration: {
        growth: "logistic",
        scaling: "minmax",
        seasonalityMode: "additive",
        holidaysMode: "additive",
        changepoints: onePoint,
        changepointPriorScale: 0.2,
        seasonalities: [weekly],
        events: [],
        regressors: [],
      },
      effectOptimizer: optimizer,
      pythonOptimizer,
    },
    phases,
    warmupIterations: 1,
    measuredIterations: 2,
    independentRuns: 2,
    timeoutSeconds: 600,
    correctnessTolerances: tolerances,
  },
];
