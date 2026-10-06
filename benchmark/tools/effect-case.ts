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

  if (workload.kind === "stage-f-map" && workload.fitRequest === "growth-only") {
    // Linear is the default growth, so a linear defaults probe passes no options at all.
    switch (workload.configuration.growth) {
      case "linear":
        return {};
      case "flat":
        return { growth: "flat" };
      case "logistic":
        return { growth: "logistic" };
    }
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

  if (workload.kind === "stage-f-map" || workload.kind === "evaluation") {
    const options = {
      ...common,
      scaling: workload.configuration.scaling,
      seasonalityMode: workload.configuration.seasonalityMode,
      holidaysMode: workload.configuration.holidaysMode,
    };

    if (workload.configuration.growth === "flat") {
      const flat =
        workload.effectOptimizer === undefined
          ? { ...options, growth: "flat" as const }
          : { ...options, growth: "flat" as const, map: { optimizer: workload.effectOptimizer } };

      return seasonalities === undefined
        ? { ...flat, seasonalities: [] }
        : { ...flat, seasonalities };
    }

    const mapConfiguration = {
      changepoints: workload.configuration.changepoints,
      changepointPriorScale: workload.configuration.changepointPriorScale,
    };

    const map =
      workload.effectOptimizer === undefined
        ? mapConfiguration
        : { ...mapConfiguration, optimizer: workload.effectOptimizer };

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
