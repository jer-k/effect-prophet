import { Context, type Effect } from "effect";

import type { FittingError, UnsupportedConfigurationError } from "../errors";
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

/** Parameters returned by a linear-trend fitting backend. */
export interface FittedLinearParameters {
  /** Identifies ordinary least-squares linear-trend parameters. */
  readonly model: "linear-trend";

  /** Predicted value at `timeOrigin`. */
  readonly intercept: number;

  /** Change in the prediction over one `timeScale` interval. */
  readonly slope: number;

  /** Training timestamp mapped to scaled time zero. */
  readonly timeOrigin: number;

  /** Training timestamp interval mapped to one scaled time unit. */
  readonly timeScale: number;
}

/** Parameters returned by the explicitly named constant-mean example backend. */
export interface FittedConstantParameters {
  /** Identifies the constant-mean example model. */
  readonly model: "constant-mean-baseline";

  /** Constant value predicted at every timestamp. */
  readonly level: number;
}

/** Fitted trend parameters understood by the public orchestration layer. */
export type FittedParameters = FittedLinearParameters | FittedConstantParameters;

/** Coarse-grained fitting capability implemented by TypeScript or WASM backends. */
export interface FittingBackend {
  /**
   * Fit one complete model without per-row or per-iteration service calls.
   *
   * @param input - Packed training timestamps and values.
   * @param options - Backend-facing fitting options.
   * @returns The fitted trend parameters, an unsupported configuration, or a typed fitting failure.
   */
  readonly fit: (
    input: TrainingInput,
    options: FitOptions,
  ) => Effect.Effect<FittedParameters, FittingError | UnsupportedConfigurationError>;
}

/** Effect context key for the fitting backend selected by the composition root. */
export const FittingBackend = Context.Service<FittingBackend>("effect-prophet/FittingBackend");
