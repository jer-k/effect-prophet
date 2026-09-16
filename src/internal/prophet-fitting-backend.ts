import { Layer } from "effect";

import { fitWithConstantMeanBackend } from "./constant-fitting-backend";
import { FitPlan, FittingBackend } from "./fitting-backend";
import { fitAdditiveWithWasm } from "./wasm-additive-backend";
import { fitLinearTrendWithWasm } from "./wasm-linear-trend-backend";

/**
 * Complete public fitting Layer for every currently accepted Prophet configuration.
 *
 * Flat growth temporarily routes to the explicitly tagged constant-mean teaching
 * baseline. It does not claim Python Prophet flat MAP numerical compatibility.
 */
export const prophetFittingBackendLayer: Layer.Layer<FittingBackend> = Layer.succeed(
  FittingBackend,
  {
    fit: (input, plan) =>
      FitPlan.$match(plan, {
        ConstantMeanBaseline: () => fitWithConstantMeanBackend(input),
        LinearTrend: () => fitLinearTrendWithWasm(input),
        LinearAdditive: ({ seasonalities }) => fitAdditiveWithWasm(input, seasonalities),
      }),
  },
);
