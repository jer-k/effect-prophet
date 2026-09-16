import { Effect } from "effect";

import type { ConstantParameters } from "../fitted-model";
import type { FittingError } from "../errors";
import { fitConstantMean } from "./constant-mean";
import type { TrainingInput } from "./fitting-backend";

/**
 * Fit the explicitly tagged constant-mean teaching baseline.
 *
 * Public option parsing selects this operation only for the currently supported
 * featureless `growth: "flat"` plan. It is not Python Prophet flat MAP fitting.
 *
 * @param input - Packed training observations.
 * @returns Constant baseline parameters or a typed fitting failure.
 */
export const fitWithConstantMeanBackend = (
  input: TrainingInput,
): Effect.Effect<ConstantParameters, FittingError> => Effect.fromResult(fitConstantMean(input));
