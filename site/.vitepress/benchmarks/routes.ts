import { caseMarkdown, featureMarkdown, indexMarkdown, overviewMarkdown } from "./pages.ts";
import { loadBenchmark } from "./run.ts";
import { benchmarkFeatures, benchmarkSuite, benchmarkSuites } from "./suite.ts";

/**
 * The landing page at `/benchmarks/`, one overview per trend at `/benchmarks/<suite>`, and one
 * per feature at `/benchmarks/<feature>` gathering that feature's cases from every trend.
 */
export const overviewPaths = () => {
  const benchmarks = benchmarkSuites.map(loadBenchmark);

  return [
    { params: { page: "index" }, content: indexMarkdown(benchmarks) },
    ...benchmarks.map((benchmark) => ({
      params: { page: benchmark.suite.id },
      content: overviewMarkdown(benchmark),
    })),
    ...benchmarkFeatures.map((feature) => ({
      params: { page: feature.id },
      content: featureMarkdown(feature, benchmarks),
    })),
  ];
};

/** One page per benchmarked case, at `/benchmarks/<suite>/<case>`. */
export const casePaths = (id: string) => {
  const suite = benchmarkSuite(id);

  return loadBenchmark(suite).groups.flatMap((group) =>
    group.cases.map((item) => ({ params: { case: item.id }, content: caseMarkdown(suite, item) })),
  );
};
