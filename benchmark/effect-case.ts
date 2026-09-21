import type { EncodedProphetOptions } from "effect-prophet";

import type { BenchmarkCase } from "./case.ts";

/** Translate a shared equivalent workload into the built package's public options. */
export const effectOptionsForCase = (
  benchmarkCase: BenchmarkCase,
): EncodedProphetOptions | undefined => {
  if (benchmarkCase.workload.kind !== "linear-map") {
    return undefined;
  }

  const workload = benchmarkCase.workload;
  const configuration = workload.configuration;
  const firstSeasonality = configuration.seasonalities[0];

  const seasonalities =
    firstSeasonality === undefined
      ? undefined
      : ([firstSeasonality, ...configuration.seasonalities.slice(1)] as const);

  const common = {
    growth: "linear" as const,
    builtInSeasonalities: {
      daily: "off" as const,
      weekly: "off" as const,
      yearly: "off" as const,
    },
    events: configuration.events,
    regressors: configuration.regressors,
  };

  if (configuration.effectMap === "omitted") {
    return seasonalities === undefined
      ? { ...common, seasonalities: [] }
      : { ...common, seasonalities };
  }

  const map = {
    changepoints: configuration.changepoints,
    changepointPriorScale: configuration.changepointPriorScale,
    optimizer: workload.effectOptimizer,
  };

  return seasonalities === undefined
    ? { ...common, seasonalities: [], map }
    : { ...common, seasonalities, map };
};
