import { Effect, Layer } from "effect";

import { fitConstantMean } from "./constant-mean";
import { FittingBackend } from "./fitting-backend";

/**
 * Temporary TypeScript fitting Layer that predicts the training mean.
 *
 * This baseline deliberately ignores the requested growth mode. It exists to
 * exercise service composition and will be replaced by the linear backend.
 */
export const constantMeanFittingBackendLayer: Layer.Layer<FittingBackend> = Layer.succeed(
  FittingBackend,
  {
    fit: (input) => Effect.fromResult(fitConstantMean(input)),
  },
);
