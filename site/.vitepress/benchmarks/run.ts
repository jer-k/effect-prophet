import { readFileSync } from "node:fs";

import type { BenchmarkSuite } from "./suite.ts";

const repository = "https://github.com/jer-k/effect-prophet/blob/main";

const benchmarkRoot = new URL("../../../benchmark/", import.meta.url);

/** Phases in display order, with reader-facing names. */
const phaseLabels: ReadonlyArray<readonly [string, string]> = [
  ["adapter-input-conversion", "Convert input rows"],
  ["uncertainty-input-conversion", "Convert input rows"],
  ["evaluation-input-conversion", "Convert input rows"],
  ["warm-fit", "Fit"],
  ["warm-predict", "Predict"],
  ["warm-fit-predict", "Fit and predict"],
  ["warm-fit-predict-with-conversion", "Convert, fit and predict"],
  ["cold-first-forecast", "First forecast in a new process"],
  ["model-json-encode", "Save model to JSON"],
  ["model-json-decode", "Load model from JSON"],
  ["fresh-process-restored-predict", "Load and predict in a new process"],
  ["warm-uncertainty", "Simulate uncertainty"],
  ["cold-first-uncertainty", "First simulation in a new process"],
  ["fresh-process-restored-uncertainty", "Load and simulate in a new process"],
  ["evaluation-plan", "Plan cross-validation folds"],
  ["evaluation-point", "Cross-validate"],
  ["evaluation-intervals", "Cross-validate with ranges"],
  ["evaluation-metrics", "Compute metrics"],
  ["evaluation-baseline", "Score baselines"],
  ["evaluation-search", "Search settings"],
  ["evaluation-holdout", "Final holdout check"],
  ["evaluation-report-encode", "Save report"],
  ["evaluation-report-decode", "Load report"],
  ["cold-first-evaluation", "First cross-validation in a new process"],
];

const flagLabels = new Map([
  ["objective", "Fitting objective (lower is a better fit)"],
  ["normalized-noise", "Normalized noise"],
  ["stationarity-residual", "Stationarity residual (lower is closer to the best fit)"],
]);

/** The single timing shown in the overview table, by preference. */
const headlinePhases = [
  "warm-fit-predict",
  "warm-uncertainty",
  "evaluation-point",
  "evaluation-intervals",
  "evaluation-search",
  "warm-fit",
  "warm-predict",
];

export interface ComparedValue {
  readonly timestamp: string;
  readonly effect: number;
  readonly python: number;
  readonly actual: number | undefined;
}

export interface PhaseTiming {
  readonly phase: string;
  readonly label: string;
  readonly effectMs: number;
  readonly pythonMs: number;
}

export interface FitFlag {
  readonly label: string;
  readonly effect: number;
  readonly python: number;
  readonly threshold: number;
}

export interface CaseResult {
  readonly id: string;
  readonly group: string;
  readonly title: string;
  readonly summary: string;
  readonly outcomes?: { readonly effect: string; readonly python: string };
  readonly kind: "forecast" | "cross-validation";
  readonly passed: boolean;
  readonly dataset: {
    readonly name: string;
    readonly url: string;
    readonly trainingRows: number;
    readonly futureRows: number;
    readonly range: number;
  };
  readonly settings: unknown;
  readonly maximumDifference: number | undefined;
  readonly relativeDifference: number | undefined;
  readonly values: ReadonlyArray<ComparedValue>;
  readonly lastValue: ComparedValue | undefined;
  readonly timings: ReadonlyArray<PhaseTiming>;
  readonly headline: PhaseTiming | undefined;
  readonly failures: ReadonlyArray<{ readonly implementation: string; readonly message: string }>;
  readonly flags: ReadonlyArray<FitFlag>;
}

export interface Benchmark {
  readonly suite: BenchmarkSuite;
  readonly run: {
    readonly id: string;
    readonly date: string;
    readonly revision: string;
    readonly dirty: boolean;
    readonly processor: string;
    readonly platform: string;
    readonly versions: ReadonlyArray<{ readonly name: string; readonly value: string }>;
    readonly reportUrl: string;
  };
  readonly groups: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly intro: string;
    readonly cases: ReadonlyArray<CaseResult>;
  }>;
  readonly passed: number;
  readonly total: number;
}

const readJson = (path: string): any =>
  JSON.parse(readFileSync(new URL(path, benchmarkRoot), "utf8"));

const iso = (timestamp: number) => new Date(timestamp).toISOString().slice(0, 10);

const firstRun = (projection: any, caseId: string) =>
  projection.correctness.find((entry: any) => entry.caseId === caseId && entry.run === 0);

const comparedValues = (effect: any, python: any): ReadonlyArray<ComparedValue> => {
  if (effect?.evaluation !== undefined && python?.evaluation !== undefined) {
    return effect.evaluation.rows.map((row: any, index: number) => ({
      timestamp: iso(row.timestamp),
      effect: row.predicted,
      python: python.evaluation.rows[index]?.predicted ?? Number.NaN,
      actual: row.actual,
    }));
  }

  return (effect?.forecasts ?? []).map((row: any, index: number) => ({
    timestamp: iso(row.timestamp),
    effect: row.value,
    python: python?.forecasts?.[index]?.value ?? Number.NaN,
    actual: undefined,
  }));
};

const errorLine = /^\s*[\w.]*(Error|Exception|Warning)\b.*:/;

/** Keep each distinct error line from a captured failure, without tracebacks or solver logs. */
const readableFailure = (message: string) => {
  const lines = message.split("\n");

  const errors = [
    ...new Set(lines.filter((line) => errorLine.test(line)).map((line) => line.trim())),
  ];

  const kept = errors.length > 0 ? errors : lines.slice(-3);

  return kept
    .slice(0, 4)
    .map((line) => (line.length > 200 ? `${line.slice(0, 200)}…` : line))
    .join("\n");
};

/** Read one suite's retained baseline into page-ready data. */
export const loadBenchmark = (suite: BenchmarkSuite): Benchmark => {
  const runPath: string | undefined = readJson("results/baselines.json").baselines[suite.baseline];

  if (runPath === undefined) {
    throw new Error(
      `No ${suite.baseline} benchmark baseline is recorded in benchmark/results/baselines.json`,
    );
  }

  const directory = `results/${runPath}/`;
  const manifest = readJson(`${directory}manifest.json`);
  const report = readJson(`${directory}report.json`);
  const declarations: ReadonlyArray<any> = readJson(`${directory}cases.json`);
  const effect = readJson(`${directory}effect-prophet.json`);
  const python = readJson(`${directory}python-prophet.json`);

  const cases = declarations.map((declaration): CaseResult => {
    const description = suite.descriptions.get(declaration.id);

    if (description === undefined) {
      throw new Error(`Add a description for ${suite.id} benchmark case ${declaration.id}`);
    }

    const dataset = readJson(`inputs/${declaration.dataset}`);
    const observed: ReadonlyArray<number> = dataset.observations.map((row: any) => row.value);
    const range = Math.max(...observed) - Math.min(...observed);
    const correctness = report.correctness.find((entry: any) => entry.caseId === declaration.id);

    const values = comparedValues(
      firstRun(effect, declaration.id),
      firstRun(python, declaration.id),
    );

    const timings = phaseLabels.flatMap(([phase, label]): ReadonlyArray<PhaseTiming> => {
      const median = (implementation: string) =>
        report.timings.find(
          (timing: any) =>
            timing.caseId === declaration.id &&
            timing.phase === phase &&
            timing.implementation === implementation,
        )?.medianNanoseconds;

      const effectNs = median("effect-prophet");
      const pythonNs = median("python-prophet");

      return effectNs === undefined || pythonNs === undefined
        ? []
        : [{ phase, label, effectMs: effectNs / 1e6, pythonMs: pythonNs / 1e6 }];
    });

    const headline = headlinePhases
      .map((phase) => timings.find((timing) => timing.phase === phase))
      .find((timing) => timing !== undefined);

    const maximumDifference: number | undefined =
      correctness?.maximumDifferences?.forecast ??
      (values.length === 0
        ? undefined
        : Math.max(...values.map((value) => Math.abs(value.effect - value.python))));

    return {
      id: declaration.id,
      ...description,
      kind: declaration.workload.kind === "evaluation" ? "cross-validation" : "forecast",
      passed: correctness?.status === "passed",
      dataset: {
        name: declaration.dataset,
        url: `${repository}/benchmark/inputs/${declaration.dataset}`,
        trainingRows: dataset.observations.length,
        futureRows: dataset.predictionRows?.length ?? 0,
        range,
      },
      settings: declaration.workload,
      maximumDifference,
      relativeDifference:
        maximumDifference === undefined || range === 0 ? undefined : maximumDifference / range,
      values,
      lastValue: values.at(-1),
      timings,
      headline,
      failures: report.failures
        .filter((failure: any) => failure.caseId === declaration.id && failure.run === 0)
        .map((failure: any) => ({
          implementation: failure.implementation,
          message: readableFailure(failure.message),
        })),
      flags: (correctness?.investigations ?? [])
        .filter((flag: any) => flag.run === 0)
        .map((flag: any) => ({
          label: flagLabels.get(flag.name) ?? flag.name,
          effect: flag.effectValue,
          python: flag.pythonValue,
          threshold: flag.threshold,
        })),
    };
  });

  const order = [...suite.descriptions.keys()];

  return {
    run: {
      id: manifest.runId,
      date: manifest.createdAt.slice(0, 10),
      revision: manifest.gitRevision.slice(0, 7),
      dirty: manifest.gitDirty,
      processor: manifest.hostProcessor,
      platform: manifest.containerPlatform,
      versions: [...effect.environment.versions, ...python.environment.versions].filter(
        (version: any) =>
          ["effect-prophet", "effect", "prophet", "cmdstan", "python"].includes(version.name),
      ),
      reportUrl: `${repository}/benchmark/${directory}report.md`,
    },
    suite,
    groups: suite.groups.map((group) => ({
      ...group,
      // Authored description order, not run order.
      cases: order.flatMap((id) =>
        cases.filter((item) => item.id === id && item.group === group.id),
      ),
    })),
    passed: cases.filter((item) => item.passed).length,
    total: cases.length,
  };
};
