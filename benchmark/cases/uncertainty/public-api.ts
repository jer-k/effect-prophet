import type { BenchmarkCase } from "../../tools/case.ts";
import { defaultCase, flatDefaultCases, linearDefaultCases } from "../growth/defaults.ts";
import { logisticReconciliationCases } from "../growth/logistic/public-api.ts";
import { growthScalingAndMixedMapCases } from "../growth/mixed-map.ts";

const phases = [
  "uncertainty-input-conversion",
  "warm-uncertainty",
  "cold-first-uncertainty",
  "model-json-encode",
  "model-json-decode",
  "fresh-process-restored-uncertainty",
] as const;

const source = (id: string): BenchmarkCase => {
  const found = growthScalingAndMixedMapCases.find((candidate) => candidate.id === id);

  if (found === undefined || found.workload.kind !== "stage-f-map") {
    throw new Error(`Missing MAP benchmark source: ${id}`);
  }

  return found;
};

const controls = (output: "intervals" | "samples", samples: number, seed = 19) => ({
  seed,
  samples,
  intervalWidth: 0.8,
  output,
  algorithm: "scalar-continuous-time" as const,
  evidence: "docs/validation/uncertainty.md#evidence-classes",
  samplerMemoryLimitBytes: 64 * 1_048_576,
});

const makeCase = (
  sourceId: string,
  suffix: string,
  output: "intervals" | "samples",
  samples: number,
  rowSelection?: BenchmarkCase["rowSelection"],
): BenchmarkCase => {
  const base = source(sourceId);

  if (base.workload.kind !== "stage-f-map") {
    throw new Error("Uncertainty requires a MAP model");
  }

  const benchmarkCase: BenchmarkCase = {
    ...base,
    id: `uncertainty-${sourceId}-${suffix}-${output}-${samples}`,
    workload: {
      ...base.workload,
      comparison: {
        kind: "equivalent-objective",
        evidenceId: base.workload.comparison.evidenceId,
      },
      uncertainty: controls(output, samples),
    },
    phases,
    warmupIterations: 1,
    measuredIterations: 3,
    independentRuns: 2,
  };

  if (rowSelection !== undefined) {
    return { ...benchmarkCase, rowSelection };
  }

  return benchmarkCase;
};

const declared = (cases: ReadonlyArray<BenchmarkCase>, id: string): BenchmarkCase => {
  const found = cases.find((candidate) => candidate.id === id);

  if (found === undefined) {
    throw new Error(`Missing defaults benchmark source: ${id}`);
  }

  return found;
};

/**
 * What a Python user's default `predict()` returns: library defaults on both sides and intervals
 * at Python's default 1,000 samples. A seed other than 19 is part of the id.
 */
const defaultsCase = (
  base: BenchmarkCase,
  seed = 19,
  rowSelection?: BenchmarkCase["rowSelection"],
): BenchmarkCase => {
  if (base.workload.kind !== "stage-f-map" || base.workload.fitRequest !== "growth-only") {
    throw new Error("Defaults uncertainty requires a growth-only MAP case");
  }

  const benchmarkCase: BenchmarkCase = {
    ...base,
    id: `uncertainty-${base.id}-intervals-1000${seed === 19 ? "" : `-seed-${seed}`}`,
    workload: { ...base.workload, uncertainty: controls("intervals", 1_000, seed) },
    phases,
    warmupIterations: 1,
    measuredIterations: 3,
    independentRuns: 2,
    timeoutSeconds: 900,
  };

  return rowSelection === undefined ? benchmarkCase : { ...benchmarkCase, rowSelection };
};

/**
 * Default linear fit on three daily years, with intervals over all 1,460 history and future rows:
 * past the 1,000,000-draw sample-output budget.
 */
const longHistoryCase = (): BenchmarkCase => {
  const base = defaultCase("linear", "long-history", "v3/linear-long-history.json");

  if (base.workload.kind !== "stage-f-map") {
    throw new Error("Uncertainty requires a MAP model");
  }

  return defaultsCase(
    {
      ...base,
      workload: {
        ...base.workload,
        configuration: {
          ...base.workload.configuration,
          // Expected resolved metadata: three years of daily rows enable yearly and weekly.
          seasonalities: [
            { name: "yearly", periodDays: 365.25, fourierOrder: 10, priorScale: 10 },
            { name: "weekly", periodDays: 7, fourierOrder: 3, priorScale: 10 },
          ],
        },
      },
    },
    19,
    { historical: 1_095, future: 365, stride: 1 },
  );
};

/** Default fits with realistic trend uncertainty: 25 automatic changepoints, every history row. */
const defaultsCases: ReadonlyArray<BenchmarkCase> = [
  longHistoryCase(),
  // Uneven gaps between history rows; the 48 future rows are the dataset's own.
  defaultsCase(declared(linearDefaultCases, "linear-defaults-irregular"), 19, {
    historical: 192,
    future: 48,
    stride: 1,
  }),
  // A flat trend has no trend uncertainty, so this checks noise ranges under defaults.
  defaultsCase(declared(flatDefaultCases, "flat-defaults-seasonal"), 19, {
    historical: 96,
    future: 24,
    stride: 1,
  }),
  // Real growth-rate changes, so 25 automatic changepoints carry trend uncertainty. The
  // prediction rows hold all 365 history rows and 90 future ones. Two seeds, because one seed
  // can sit on a percentile boundary and pass or fail by chance.
  ...[19, 7].map((seed) =>
    defaultsCase(
      declared(logisticReconciliationCases, "logistic-reconcile-defaults-rate-changes"),
      seed,
    ),
  ),
];

/** Public MAP uncertainty workloads over shared, versioned Stage F synthetic datasets. */
export const uncertaintyCases: ReadonlyArray<BenchmarkCase> = [
  ...defaultsCases,
  makeCase("linear-offset-scaling-absmax", "historical", "intervals", 128, {
    historical: 8,
    future: 0,
    stride: 1,
  }),
  makeCase("linear-offset-scaling-absmax", "one-future", "samples", 128, {
    historical: 0,
    future: 1,
    stride: 1,
  }),
  makeCase("linear-mixed-components", "mixed", "intervals", 128, {
    historical: 4,
    future: 8,
    stride: 2,
  }),
  makeCase("linear-mixed-components", "mixed", "samples", 512, {
    historical: 4,
    future: 8,
    stride: 2,
  }),
  makeCase("flat-mixed-components", "full", "intervals", 512),
  makeCase("flat-mixed-components-large", "full", "samples", 128),
  makeCase("logistic-implicit-floor-minmax", "full", "samples", 512),
  makeCase("logistic-implicit-floor-large", "full", "intervals", 128),
  makeCase("logistic-explicit-floor-minmax", "full", "intervals", 512),
  makeCase("logistic-explicit-floor-minmax", "full", "samples", 128),
  ...(["intervals", "samples"] as const).map((output) => {
    const base = makeCase("logistic-explicit-floor-minmax", "mixed-conditions-events", output, 128);

    if (base.workload.kind !== "stage-f-map") {
      throw new Error("Expected logistic MAP workload");
    }

    return {
      ...base,
      dataset: "v1/logistic-uncertainty-mixed.json",
      workload: {
        ...base.workload,
        configuration: {
          ...base.workload.configuration,
          seasonalities: base.workload.configuration.seasonalities.map((seasonality) => ({
            ...seasonality,
            conditionName: "active",
          })),
          events: [
            {
              name: "campaign",
              date: "2020-01-22",
              lowerWindowDays: 0,
              upperWindowDays: 0,
              priorScale: 10,
            },
            {
              name: "campaign",
              date: "2020-04-16",
              lowerWindowDays: 0,
              upperWindowDays: 0,
              priorScale: 10,
            },
          ],
        },
      },
    };
  }),
];
