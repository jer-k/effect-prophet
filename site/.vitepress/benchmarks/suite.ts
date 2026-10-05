import { flatCaseDescriptions, flatGroups } from "./flat-cases.ts";
import { linearCaseDescriptions, linearGroups } from "./linear-cases.ts";

export interface CaseGroup {
  readonly id: string;
  readonly title: string;
  readonly intro: string;
}

export interface CaseDescription {
  readonly group: string;
  readonly title: string;
  readonly summary: string;
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
];

export const benchmarkSuite = (id: string): BenchmarkSuite => {
  const suite = benchmarkSuites.find((candidate) => candidate.id === id);

  if (suite === undefined) throw new Error(`Unknown benchmark suite ${id}`);

  return suite;
};
