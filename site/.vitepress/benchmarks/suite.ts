import { flatCaseDescriptions, flatGroups } from "./flat-cases.ts";
import { linearCaseDescriptions, linearGroups } from "./linear-cases.ts";
import { logisticCaseDescriptions, logisticGroups } from "./logistic-cases.ts";

export interface CaseGroup {
  readonly id: string;
  readonly title: string;
  readonly intro: string;
}

export interface CaseDescription {
  readonly group: string;
  readonly title: string;
  readonly summary: string;
  /** For intentional differences: what each library does, shown where the numbers would be. */
  readonly outcomes?: { readonly effect: string; readonly python: string };
}

/** One trend's benchmark pages: where its baseline lives and how its cases are explained. */
export interface BenchmarkSuite {
  readonly id: string;
  readonly title: string;
  readonly baseline: string;
  readonly groups: ReadonlyArray<CaseGroup>;
  readonly descriptions: ReadonlyMap<string, CaseDescription>;
}

/** Cases in this group are expected to differ from Python and are shown as such. */
export const intentionalDifferences = "differences";

export const benchmarkSuites: ReadonlyArray<BenchmarkSuite> = [
  {
    id: "linear",
    title: "Linear growth",
    baseline: "linear-growth",
    groups: linearGroups,
    descriptions: new Map(Object.entries(linearCaseDescriptions)),
  },
  {
    id: "flat",
    title: "Flat growth",
    baseline: "flat-growth",
    groups: flatGroups,
    descriptions: new Map(Object.entries(flatCaseDescriptions)),
  },
  {
    id: "logistic",
    title: "Logistic growth",
    baseline: "logistic-growth",
    groups: logisticGroups,
    descriptions: new Map(Object.entries(logisticCaseDescriptions)),
  },
];

/** A capability benchmarked under every trend: one page gathering its group from each suite. */
export interface BenchmarkFeature {
  readonly id: string;
  readonly title: string;
  /** The case group that holds this feature's cases in every suite. */
  readonly group: string;
  readonly intro: string;
}

export const benchmarkFeatures: ReadonlyArray<BenchmarkFeature> = [
  {
    id: "features",
    title: "Seasonality, events and regressors",
    group: "features",
    intro:
      "Custom and switchable seasonal patterns, events with windows, extra regressors, and additive and multiplicative effects together, on every trend type.",
  },
  {
    id: "uncertainty",
    title: "Uncertainty ranges",
    group: "uncertainty",
    intro:
      "Both libraries simulate possible futures with random draws, so individual simulated values never match. Each range must still match Python's within the variation expected from that many draws, on every trend type.",
  },
  {
    id: "cross-validation",
    title: "Cross-validation and choosing settings",
    group: "evaluation",
    intro:
      "Rolling-origin cross-validation, metrics, baselines, settings search and a final holdout check, on every trend type.",
  },
];

export const suitePath = (suite: BenchmarkSuite) => `/benchmarks/${suite.id}`;

export const featurePath = (feature: BenchmarkFeature) => `/benchmarks/${feature.id}`;

export const benchmarkSuite = (id: string): BenchmarkSuite => {
  const suite = benchmarkSuites.find((candidate) => candidate.id === id);

  if (suite === undefined) throw new Error(`Unknown benchmark suite ${id}`);

  return suite;
};
