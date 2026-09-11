import { Context, type Effect } from "effect";

import type { FittingError } from "../errors";
import type { Growth } from "../options";

/** Packed, index-aligned numerical observations supplied to a fitting backend. */
export interface TrainingInput {
  /** Epoch-millisecond timestamps stored contiguously for a numerical backend. */
  readonly timestamps: Float64Array;

  /** Observation values whose indexes correspond to `timestamps`. */
  readonly values: Float64Array;
}

/** Backend-facing options for the currently supported trend models. */
export interface FitOptions {
  /** The trend form the backend must fit. */
  readonly growth: Growth;
}

/** Parameters returned by the temporary constant-mean fitting model. */
export interface FittedParameters {
  /** Constant value predicted at every timestamp. */
  readonly level: number;
}

/** Coarse-grained fitting capability implemented by TypeScript or WASM backends. */
export interface FittingBackend {
  /**
   * Fit one complete model without per-row or per-iteration service calls.
   *
   * @param input - Packed training timestamps and values.
   * @param options - Backend-facing fitting options.
   * @returns The fitted trend parameters or a typed fitting failure.
   */
  readonly fit: (
    input: TrainingInput,
    options: FitOptions,
  ) => Effect.Effect<FittedParameters, FittingError>;
}

/** Effect context key for the fitting backend selected by the composition root. */
export const FittingBackend = Context.Service<FittingBackend>("effect-prophet/FittingBackend");
