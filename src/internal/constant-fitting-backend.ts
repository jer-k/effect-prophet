import { Effect, Layer } from "effect";

import { fitConstantMean } from "./constant-mean";
import { FittingBackend } from "./fitting-backend";

/**
 * Explicit example Layer that predicts the training mean.
 *
 * This baseline deliberately ignores the requested growth mode. Production
 * linear fitting uses `wasmLinearTrendFittingBackendLayer` instead.
 */
export const constantMeanFittingBackendLayer: Layer.Layer<FittingBackend> = Layer.succeed(
  FittingBackend,
  {
    fit: (input) => Effect.fromResult(fitConstantMean(input)),
  },
);
