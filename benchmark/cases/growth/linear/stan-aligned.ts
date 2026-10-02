import { defaultLinearOptimizer } from "effect-prophet";

import type { BenchmarkCase } from "../../../tools/case.ts";

/** Versioned counterparts keep original snapshots, datasets, priors and forecast gates intact. */
export const stanAlignedCases = (
  originals: ReadonlyArray<BenchmarkCase>,
): ReadonlyArray<BenchmarkCase> =>
  originals.map((original) => {
    const workload = original.workload;
    const id = `${original.id}-stan-v2`;

    if (workload.kind === "fixed-linear-prediction") {
      return { ...original, id };
    }

    if (workload.kind !== "linear-map" && workload.configuration.growth !== "linear") {
      return { ...original, id };
    }

    const controls = {
      effectOptimizer: defaultLinearOptimizer,
      pythonOptimizer: {
        algorithm: "Auto" as const,
        maxIterations: 10_000,
        newtonFallback: true,
        sigFigs: 12,
      },
    };

    if (workload.kind === "evaluation") {
      return { ...original, id, workload: { ...workload, ...controls } };
    }

    return {
      ...original,
      id,
      workload: {
        ...workload,
        ...controls,
        comparison: { kind: "equivalent-objective", evidenceId: "linear-stan-map-fit-quality-v3" },
      },
      optimizerQuality: {
        objectiveAbsolute: 0.01,
        normalizedNoiseAbsolute: 0.0002,
        stationarity: { kind: "diagnostic-only", followUp: "EP-097" },
      },
    };
  });
