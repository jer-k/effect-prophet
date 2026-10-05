import { caseMarkdown, overviewMarkdown } from "./pages.ts";
import { loadBenchmark } from "./run.ts";
import { benchmarkSuite, benchmarkSuites } from "./suite.ts";

/** One overview page per trend, at `/benchmarks/<suite>`. */
export const suitePaths = () =>
  benchmarkSuites.map((suite) => ({
    params: { suite: suite.id },
    content: overviewMarkdown(loadBenchmark(suite)),
  }));

/** One page per benchmarked case, at `/benchmarks/<suite>/<case>`. */
export const casePaths = (id: string) => {
  const suite = benchmarkSuite(id);

  return loadBenchmark(suite).groups.flatMap((group) =>
    group.cases.map((item) => ({ params: { case: item.id }, content: caseMarkdown(suite, item) })),
  );
};
