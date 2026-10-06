import { Layer } from "effect";

import { FitPlan, FittingBackend } from "./fitting-backend";
import { fitFlatMapWithWasm } from "./wasm-flat-map-backend";
import { fitLogisticMapWithWasm } from "./wasm-logistic-map-backend";
import {
  fitFlatStanMapWithWasm,
  fitMixedLinearMapWithWasm,
  hasMultiplicativeMode,
} from "./wasm-mixed-map-backend";
import { fitPiecewiseMapFeaturesWithWasm } from "./wasm-piecewise-map-backend";

/** Complete public fitting Layer for every currently accepted Prophet configuration. */
export const prophetFittingBackendLayer: Layer.Layer<FittingBackend> = Layer.succeed(
  FittingBackend,
  {
    fit: (input, plan) =>
      FitPlan.$match(plan, {
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
        LogisticPiecewiseMap: ({
          scaling,
          bounds,
          seasonalities,
          changepoints,
          changepointPriorScale,
          optimizer,
          seasonalityMasks,
          additionalFeatures,
          events,
          regressors,
        }) =>
          fitLogisticMapWithWasm(
            input,
            bounds,
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
        FlatStanMap: ({
          scaling,
          seasonalities,
          optimizer,
          seasonalityMasks,
          additionalFeatures,
          events,
          regressors,
        }) =>
          fitFlatStanMapWithWasm(
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
