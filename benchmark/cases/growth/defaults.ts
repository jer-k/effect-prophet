import type { BenchmarkCase } from "../../tools/case.ts";
import { linearComparison, linearOptimizerQuality } from "./linear/controls.ts";

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
  trend: { absolute: 0.01, relative: 0.002 },
  component: { absolute: 0.01, relative: 0.002 },
  additive: { absolute: 0.01, relative: 0.002 },
  forecast: { absolute: 0.01, relative: 0.002 },
  noiseScale: { absolute: 0.01, relative: 0.02 },
  persistence: { absolute: 1e-10, relative: 0 },
};

const defaultCase = (growth: "linear" | "flat", id: string, dataset: string): BenchmarkCase => {
  const benchmarkCase: BenchmarkCase = {
    id: `${growth}-defaults-${id}`,
    dataset,
    workload: {
      kind: "stage-f-map",
      comparison:
        growth === "linear"
          ? linearComparison
          : { kind: "equivalent-objective", evidenceId: "flat-growth-reduced-v1" },
      // Effect `fit(observations, { growth })` against Python `Prophet(growth=...)`, nothing else.
      fitRequest: "growth-only",
      configuration: {
        growth,
        scaling: "absmax",
        seasonalityMode: "additive",
        holidaysMode: "additive",
        // Flat trends have no changepoints; linear uses Prophet's automatic defaults.
        changepoints:
          growth === "linear"
            ? { mode: "auto", count: 25, range: 0.8 }
            : { mode: "explicit", timestamps: [] },
        changepointPriorScale: 0.05,
        // Expected resolved metadata, NOT a custom seasonality request.
        seasonalities: [{ name: "weekly", periodDays: 7, fourierOrder: 3, priorScale: 10 }],
        events: [],
        regressors: [],
      },
      pythonOptimizer: { algorithm: "Auto", maxIterations: 10_000, newtonFallback: true },
    },
    phases,
    warmupIterations: 1,
    measuredIterations: 3,
    independentRuns: 2,
    timeoutSeconds: 300,
    correctnessTolerances: tolerances,
  };

  return growth === "linear"
    ? { ...benchmarkCase, optimizerQuality: linearOptimizerQuality }
    : benchmarkCase;
};

/** Library defaults on both sides; history length and spacing decide the seasonalities. */
export const linearDefaultCases: ReadonlyArray<BenchmarkCase> = [
  defaultCase("linear", "small", "v1/linear-small.json"),
  defaultCase("linear", "medium", "v1/linear-medium.json"),
  defaultCase("linear", "irregular", "v1/map-irregular-medium.json"),
];

export const flatDefaultCases: ReadonlyArray<BenchmarkCase> = [
  defaultCase("flat", "level", "v1/flat-level.json"),
  defaultCase("flat", "seasonal", "v1/flat-seasonal.json"),
  defaultCase("flat", "negative", "v1/flat-negative.json"),
];
