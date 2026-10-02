import type { BenchmarkCase } from "../../../tools/case.ts";
import { growthScalingAndMixedMapCases } from "../mixed-map.ts";

/** Flat controls retain original gates and datasets; no passing classification is assumed. */
export const flatGrowthCases: ReadonlyArray<BenchmarkCase> = growthScalingAndMixedMapCases.flatMap(
  (original) => {
    const workload = original.workload;

    if (workload.kind !== "stage-f-map" || workload.configuration.growth !== "flat") {
      return [];
    }

    const large = original.id.endsWith("large");

    const counts = large ? [225, 232] : [63, 70, 77];

    const common = {
      ...original,
      phases: [
        "warm-fit",
        "warm-predict",
        "model-json-encode",
        "model-json-decode",
        "fresh-process-restored-predict",
      ] as const,
    };

    const prefixes: ReadonlyArray<BenchmarkCase> = counts.flatMap((count) =>
      (["absmax", "minmax"] as const).map((scaling) => ({
        ...common,
        id: `flat-prefix-${count}-${scaling}`,
        dataset: `v1/${large ? "flat-mixed-components-large" : "flat-mixed-components"}-prefix-${count}.json`,
        workload: {
          ...workload,
          comparison: { ...workload.comparison, evidenceId: "flat-growth-mixed-scaling-v1" },
          configuration: { ...workload.configuration, scaling },
        },
      })),
    );

    const fullHistory: BenchmarkCase = {
      ...common,
      id: `${original.id}-absmax`,
      workload: {
        ...workload,
        comparison: { ...workload.comparison, evidenceId: "flat-growth-mixed-scaling-v1" },
        configuration: { ...workload.configuration, scaling: "absmax" },
      },
    };

    if (large) {
      return [...prefixes, fullHistory];
    }

    const basics: ReadonlyArray<BenchmarkCase> = (
      ["level", "constant", "negative", "seasonal"] as const
    ).flatMap((variant) =>
      (["absmax", "minmax"] as const).map((scaling) => ({
        ...common,
        id: `flat-${variant}-${scaling}`,
        dataset: `v1/flat-${variant}.json`,
        workload: {
          ...workload,
          comparison: { ...workload.comparison, evidenceId: "flat-growth-reduced-v1" },
          configuration: {
            ...workload.configuration,
            scaling,
            seasonalities:
              variant === "seasonal"
                ? [{ name: "weekly-custom", periodDays: 7, fourierOrder: 2, priorScale: 10 }]
                : [],
            events: [],
            regressors: [],
          },
        },
      })),
    );

    return [...basics, ...prefixes, fullHistory];
  },
);
