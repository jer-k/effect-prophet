import { Effect, Layer } from "effect";

import { UnsupportedConfigurationError } from "../errors";
import { fitConstantMean } from "./constant-mean";
import { FittingBackend } from "./fitting-backend";

/**
 * Explicit flat-growth learning example Layer that predicts the training mean.
 *
 * Callers must select `growth: "flat"`. This arithmetic baseline is not a full
 * Prophet flat-growth implementation and does not apply Prophet priors.
 */
export const constantMeanFittingBackendLayer: Layer.Layer<FittingBackend> = Layer.succeed(
  FittingBackend,
  {
    fit: (input, options) => {
      if (options.growth !== "flat") {
        return Effect.fail(
          new UnsupportedConfigurationError({
            option: "growth",
            received: options.growth,
            supported: ["flat"],
            message: `The constant-mean baseline backend does not support ${options.growth} growth`,
          }),
        );
      }

      return Effect.fromResult(fitConstantMean(input));
    },
  },
);
