import type { BenchmarkCase } from "../case.ts";
import { growthScalingAndMixedMapCases } from "./growth-scaling-and-mixed-map.ts";

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
      uncertainty: {
        seed: 19,
        samples,
        intervalWidth: 0.8,
        output,
        algorithm: "scalar-continuous-time",
        evidence: "docs/validation/uncertainty.md#evidence-classes",
        samplerMemoryLimitBytes: 64 * 1_048_576,
      },
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

/** Public MAP uncertainty workloads over shared, versioned Stage F synthetic datasets. */
export const uncertaintyCases: ReadonlyArray<BenchmarkCase> = [
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
      dataset: "generated/logistic-uncertainty-mixed.json",
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
