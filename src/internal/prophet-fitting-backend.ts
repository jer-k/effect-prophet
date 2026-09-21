import { Layer } from "effect";

import { FitPlan, FittingBackend } from "./fitting-backend";
import { fitFlatMapWithWasm } from "./wasm-flat-map-backend";
import { fitLinearTrendWithWasm } from "./wasm-linear-trend-backend";
import { fitPiecewiseMapFeaturesWithWasm } from "./wasm-piecewise-map-backend";

/** Complete public fitting Layer for every currently accepted Prophet configuration. */
export const prophetFittingBackendLayer: Layer.Layer<FittingBackend> = Layer.succeed(
  FittingBackend,
  {
    fit: (input, plan) =>
      FitPlan.$match(plan, {
        LinearTrend: () => fitLinearTrendWithWasm(input),
        LinearPiecewiseMap: ({
          seasonalities,
          changepoints,
          changepointPriorScale,
          optimizer,
          seasonalityMasks,
          additionalFeatures,
          events,
        }) =>
          fitPiecewiseMapFeaturesWithWasm(
            input,
            seasonalities,
            changepoints,
            changepointPriorScale,
            optimizer,
            seasonalityMasks,
            additionalFeatures,
            events,
          ),
        FlatMap: ({ seasonalities }) => fitFlatMapWithWasm(input, seasonalities),
        FlatAdditiveMap: ({ seasonalities }) => fitFlatMapWithWasm(input, seasonalities),
      }),
  },
);
