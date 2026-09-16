import { Effect, Layer, Match } from "effect";

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
    fit: (input, options) =>
      Match.value(options.growth).pipe(
        Match.when("flat", () => {
          if (options.seasonalities.components.length > 0) {
            return Effect.fail(
              new UnsupportedConfigurationError({
                configuration: {
                  option: "seasonalities",
                  received: "configured",
                  supported: ["none"],
                },
                message: "The constant-mean baseline does not support configured seasonalities",
              }),
            );
          }

          return Effect.fromResult(fitConstantMean(input));
        }),
        Match.when("linear", (received) =>
          Effect.fail(
            new UnsupportedConfigurationError({
              configuration: {
                option: "growth",
                received,
                supported: ["flat"],
              },
              message: `The constant-mean baseline backend does not support ${received} growth`,
            }),
          ),
        ),
        Match.exhaustive,
      ),
  },
);
