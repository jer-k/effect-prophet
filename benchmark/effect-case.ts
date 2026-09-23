import type { EncodedProphetOptions } from "effect-prophet";

import type { BenchmarkCase } from "./case.ts";

/** Translate a shared equivalent workload into the built package's public options. */
export const effectOptionsForCase = (
  benchmarkCase: BenchmarkCase,
): EncodedProphetOptions | undefined => {
  const workload = benchmarkCase.workload;

  if (workload.kind === "fixed-linear-prediction") {
    return undefined;
  }

  const configuration = workload.configuration;

  const firstSeasonality = configuration.seasonalities[0];

  const seasonalities =
    firstSeasonality === undefined
      ? undefined
      : ([firstSeasonality, ...configuration.seasonalities.slice(1)] as const);

  const common = {
    builtInSeasonalities: {
      daily: "off" as const,
      weekly: "off" as const,
      yearly: "off" as const,
    },
    events: configuration.events,
    regressors: configuration.regressors,
  };

  if (workload.kind === "stage-f-map") {
    const options = {
      ...common,
      scaling: workload.configuration.scaling,
      seasonalityMode: workload.configuration.seasonalityMode,
      holidaysMode: workload.configuration.holidaysMode,
    };

    if (workload.configuration.growth === "flat") {
      return seasonalities === undefined
        ? { ...options, growth: "flat", seasonalities: [] }
        : { ...options, growth: "flat", seasonalities };
    }

    if (workload.effectOptimizer === undefined) {
      throw new Error(`Stage F case ${benchmarkCase.id} has no numerical optimizer controls`);
    }

    const map = {
      changepoints: workload.configuration.changepoints,
      changepointPriorScale: workload.configuration.changepointPriorScale,
      optimizer: workload.effectOptimizer,
    };

    if (workload.configuration.growth === "logistic") {
      return { ...options, growth: "logistic", seasonalities: configuration.seasonalities, map };
    }

    return seasonalities === undefined
      ? { ...options, growth: "linear", seasonalities: [], map }
      : { ...options, growth: "linear", seasonalities, map };
  }

  const linear = { ...common, growth: "linear" as const };

  if (workload.configuration.effectMap === "omitted") {
    return seasonalities === undefined
      ? { ...linear, seasonalities: [] }
      : { ...linear, seasonalities };
  }

  const map = {
    changepoints: configuration.changepoints,
    changepointPriorScale: configuration.changepointPriorScale,
    optimizer: workload.effectOptimizer,
  };

  return seasonalities === undefined
    ? { ...linear, seasonalities: [], map }
    : { ...linear, seasonalities, map };
};
