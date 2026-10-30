import { fileURLToPath } from "node:url";

import { Effect } from "effect";

import { countryHolidayCases } from "../cases/holidays/country-calendars.ts";
import { evaluationCases } from "../cases/diagnostics/evaluation.ts";
import { flatGrowthCases } from "../cases/growth/flat/public-api.ts";
import { flatDefaultCases, linearDefaultCases } from "../cases/growth/defaults.ts";
import { linearGrowthEdgeCases } from "../cases/growth/linear/edge-cases.ts";
import {
  flatDefaultOptimizerCases,
  growthScalingAndMixedMapCases,
} from "../cases/growth/mixed-map.ts";
import { logisticReconciliationCases } from "../cases/growth/logistic/public-api.ts";
import { warmStartCases } from "../cases/growth/warm-start.ts";
import { anomalyCases } from "../cases/uncertainty/anomalies.ts";
import { uncertaintyCases } from "../cases/uncertainty/public-api.ts";
import { BenchmarkArtifactError, readJson } from "./artifacts.ts";
import { parseBenchmarkCases, type BenchmarkCase } from "./case.ts";

const coreFiles = [
  "growth/linear/public-api.json",
  "holidays/public-api.json",
  "regressors/public-api.json",
  "seasonalities/public-api.json",
];

/** Load the original feature declarations from their single capability owners. */
export const loadCoreCases = Effect.fn("benchmark.catalog.core")(function* () {
  const groups = yield* Effect.forEach(coreFiles, (file) =>
    readJson(fileURLToPath(new URL(`../cases/${file}`, import.meta.url)), parseBenchmarkCases),
  );

  return groups.flat();
});

/** Load and parse the complete runnable catalog. */
export const loadCaseCatalog = Effect.fn("benchmark.catalog.load")(function* () {
  const originals = yield* loadCoreCases();
  const template = originals.find((item) => item.id === "map-events-small");

  if (template === undefined)
    return yield* new BenchmarkArtifactError({
      message: "Country cases require the core explicit-event lifecycle declaration",
    });

  const countries = yield* countryHolidayCases(template);

  return yield* parseBenchmarkCases([
    ...originals,
    ...countries,
    ...linearDefaultCases,
    ...linearGrowthEdgeCases,
    ...growthScalingAndMixedMapCases,
    ...uncertaintyCases,
    ...anomalyCases,
    ...warmStartCases,
    ...evaluationCases,
    ...flatDefaultCases,
    ...flatGrowthCases,
    ...flatDefaultOptimizerCases,
    ...logisticReconciliationCases,
  ]);
});

/** Select unique declared IDs; an empty selection means the full catalog. */
export const selectCases = (cases: ReadonlyArray<BenchmarkCase>, ids: ReadonlyArray<string>) => {
  const requested = new Set(ids);
  const missing = ids.find((id) => !cases.some((item) => item.id === id));

  if (missing !== undefined) {
    return Effect.fail(
      new BenchmarkArtifactError({ message: `Unknown benchmark case: ${missing}` }),
    );
  }

  return Effect.succeed(cases.filter((item) => requested.size === 0 || requested.has(item.id)));
};

/** The growth type a case exercises; it names the trend suite the case belongs to. */
export type BenchmarkSuiteId = "linear" | "flat" | "logistic";

export const benchmarkSuiteIds: ReadonlyArray<BenchmarkSuiteId> = ["linear", "flat", "logistic"];

/**
 * Trend suite of a case. Derived from the growth type every workload already declares, so derived
 * uncertainty and evaluation cases stay with the trend of their source and nothing can drift.
 */
export const suiteForCase = (item: BenchmarkCase): BenchmarkSuiteId =>
  item.workload.kind === "fixed-linear-prediction" || item.workload.kind === "linear-map"
    ? "linear"
    : item.workload.configuration.growth;

/** Classify a case by its primary Prophet capability without duplicating declarations. */
export const capabilityForCase = (item: BenchmarkCase): string => {
  if (item.workload.kind === "evaluation") return "diagnostics";

  if (item.workload.kind === "map" && item.workload.anomalies !== undefined) return "anomalies";

  if (item.workload.kind === "map" && item.workload.warmStart !== undefined) return "warm-start";

  if (item.workload.kind === "map" && item.workload.uncertainty !== undefined) return "uncertainty";

  if (item.id.startsWith("map-events-") || item.id.startsWith("country-")) return "holidays";

  if (item.id.startsWith("map-regressors-")) return "regressors";

  if (item.id.startsWith("map-conditional-seasonalities-")) return "seasonalities";

  return `growth/${suiteForCase(item)}`;
};

/** Select every declared case of the named trend suites, in catalog order. */
export const casesInSuites = (
  catalog: ReadonlyArray<BenchmarkCase>,
  suites: ReadonlyArray<string>,
) => {
  const unknown = suites.find((suite) => !benchmarkSuiteIds.some((known) => known === suite));

  if (unknown !== undefined) {
    return Effect.fail(
      new BenchmarkArtifactError({
        message: `Unknown benchmark suite: ${unknown} (expected ${benchmarkSuiteIds.join(", ")})`,
      }),
    );
  }

  return Effect.succeed(catalog.filter((item) => suites.includes(suiteForCase(item))));
};

/**
 * A named baseline stands for its trends' whole catalog. Refuse a run that covers part of a suite
 * it contains, so a case declared since the last refresh cannot be silently left out.
 */
export const assertCompleteSuites = (
  catalog: ReadonlyArray<BenchmarkCase>,
  runCaseIds: ReadonlyArray<string>,
) => {
  const ran = new Set(runCaseIds);

  const represented = new Set(
    catalog.flatMap((item) => (ran.has(item.id) ? [suiteForCase(item)] : [])),
  );

  const unknown = runCaseIds.filter((id) => !catalog.some((item) => item.id === id));

  const missing = catalog.filter(
    (item) => represented.has(suiteForCase(item)) && !ran.has(item.id),
  );

  if (represented.size === 0 || unknown.length > 0 || missing.length > 0) {
    const detail = [
      represented.size === 0 ? "the run contains no catalog cases" : undefined,
      unknown.length > 0 ? `not in the catalog: ${unknown.join(", ")}` : undefined,
      missing.length > 0
        ? `declared but not run: ${missing.map((item) => item.id).join(", ")}`
        : undefined,
    ].filter((part) => part !== undefined);

    return Effect.fail(
      new BenchmarkArtifactError({
        message: `Cannot point a baseline at a run that does not cover its whole suite (${detail.join("; ")}). Rerun with --suite <${benchmarkSuiteIds.join("|")}>.`,
      }),
    );
  }

  return Effect.succeed(benchmarkSuiteIds.filter((suite) => represented.has(suite)));
};

/** Render declared coverage only; run outcomes belong to the results overview. */
export const renderCaseCatalog = (cases: ReadonlyArray<BenchmarkCase>): string => {
  const groups = Array.from(new Set(cases.map(capabilityForCase))).sort();

  const lines = [
    "# Benchmark cases",
    "",
    "Generated by `npm run benchmark:catalog`. A declaration is coverage, not passing evidence.",
    "See [retained results](results/RESULTS.md) for outcomes and [the runner guide](README.md) for commands.",
    "Serialization is exercised by lifecycle phases rather than copied into separate cases.",
    "",
  ];

  for (const group of groups) {
    lines.push(
      `## ${group}`,
      "",
      "| Case | Input | Contract | Phases |",
      "| --- | --- | --- | ---: |",
    );

    for (const item of cases.filter((candidate) => capabilityForCase(candidate) === group)) {
      lines.push(
        `| \`${item.id}\` | [${item.dataset}](inputs/${item.dataset}) | ${item.workload.comparison.kind} | ${item.phases.length} |`,
      );
    }

    lines.push("");
  }

  return lines.join("\n");
};
