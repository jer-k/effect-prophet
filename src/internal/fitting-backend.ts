import { Context, type Effect } from "effect";

import type { FittingError, UnsupportedConfigurationError } from "../errors";
import type { Parameters } from "../fitted-model";
import type { Growth } from "../options";
import type { SeasonalityLayout } from "../seasonality";

export type {
  ConstantParameters,
  LinearAdditiveParameters,
  LinearParameters,
  Parameters,
} from "../fitted-model";

/** Packed, index-aligned numerical observations supplied to a fitting backend. */
export interface TrainingInput {
  /** Epoch-millisecond timestamps stored contiguously for a numerical backend. */
  readonly timestamps: Float64Array;

  /** Observation values whose indexes correspond to `timestamps`. */
  readonly values: Float64Array;
}

/** Resolved backend-facing options for one complete model fit. */
export interface FitOptions {
  /** The trend form the backend must fit. */
  readonly growth: Growth;

  /** Ordered seasonal definitions and their deterministic coefficient layout. */
  readonly seasonalities: SeasonalityLayout;
}

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
  ) => Effect.Effect<Parameters, FittingError | UnsupportedConfigurationError>;
}

/** Effect context key for the fitting backend selected by the composition root. */
export const FittingBackend = Context.Service<FittingBackend>("effect-prophet/FittingBackend");
