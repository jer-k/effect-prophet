import { Effect } from "effect";

import type { ConstantParameters } from "../fitted-model";
import type { FittingError } from "../errors";
import { fitConstantMean } from "./constant-mean";
import type { TrainingInput } from "./fitting-backend";

/**
 * Fit the explicitly tagged constant-mean teaching baseline.
 *
 * This operation is internal teaching material and is not selected by public
 * Prophet options. It is not Python Prophet flat MAP fitting.
 *
 * @param input - Packed training observations.
 * @returns Constant baseline parameters or a typed fitting failure.
 */
export const fitWithConstantMeanBackend = (
  input: TrainingInput,
): Effect.Effect<ConstantParameters, FittingError> => Effect.fromResult(fitConstantMean(input));
