import { Layer } from "effect";

import { FitPlan, FittingBackend } from "./fitting-backend";
import { fitFlatMapWithWasm } from "./wasm-flat-map-backend";
import { fitLinearTrendWithWasm } from "./wasm-linear-trend-backend";
import { fitMixedFlatMapWithWasm, fitMixedLinearMapWithWasm } from "./wasm-mixed-map-backend";
import { fitPiecewiseMapFeaturesWithWasm } from "./wasm-piecewise-map-backend";

const hasMultiplicativeMode = (
  seasonalities: Parameters<typeof fitMixedLinearMapWithWasm>[2],
  features: Parameters<typeof fitMixedLinearMapWithWasm>[7],
): boolean =>
  seasonalities.components.some((component) => component.definition.mode === "multiplicative") ||
  features.layout.components.some((component) => component.mode === "multiplicative");

/** Complete public fitting Layer for every currently accepted Prophet configuration. */
export const prophetFittingBackendLayer: Layer.Layer<FittingBackend> = Layer.succeed(
  FittingBackend,
  {
    fit: (input, plan) =>
      FitPlan.$match(plan, {
        LinearTrend: () => fitLinearTrendWithWasm(input),
        LinearPiecewiseMap: ({
          scaling,
          seasonalities,
          changepoints,
          changepointPriorScale,
          optimizer,
          seasonalityMasks,
          additionalFeatures,
          events,
          regressors,
        }) =>
          hasMultiplicativeMode(seasonalities, additionalFeatures)
            ? fitMixedLinearMapWithWasm(
                input,
                scaling,
                seasonalities,
                changepoints,
                changepointPriorScale,
                optimizer,
                seasonalityMasks,
                additionalFeatures,
                events,
                regressors,
              )
            : fitPiecewiseMapFeaturesWithWasm(
                input,
                scaling,
                seasonalities,
                changepoints,
                changepointPriorScale,
                optimizer,
                seasonalityMasks,
                additionalFeatures,
                events,
                regressors,
              ),
        FlatMap: ({ scaling, seasonalities }) => fitFlatMapWithWasm(input, scaling, seasonalities),
        FlatAdditiveMap: ({ scaling, seasonalities }) =>
          fitFlatMapWithWasm(input, scaling, seasonalities),
        FlatMixedMap: ({
          scaling,
          seasonalities,
          optimizer,
          seasonalityMasks,
          additionalFeatures,
          events,
          regressors,
        }) =>
          fitMixedFlatMapWithWasm(
            input,
            scaling,
            seasonalities,
            optimizer,
            seasonalityMasks,
            additionalFeatures,
            events,
            regressors,
          ),
      }),
  },
);
