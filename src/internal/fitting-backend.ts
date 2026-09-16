import { Context, Data, type Effect } from "effect";

import type { FittingError } from "../errors";
import type { Parameters } from "../fitted-model";
import type { NonEmptySeasonalityLayout } from "../seasonality";

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

/** Request for the provisional constant-mean flat baseline. */
export interface ConstantMeanFitPlan {
  readonly _tag: "ConstantMeanBaseline";
}

/** Request for ordinary linear-trend fitting without seasonal components. */
export interface LinearTrendFitPlan {
  readonly _tag: "LinearTrend";
}

/** Request for joint linear-trend and additive-seasonality fitting. */
export interface LinearAdditiveFitPlan {
  readonly _tag: "LinearAdditive";

  /** Non-empty ordered seasonality coefficient layout established by public parsing. */
  readonly seasonalities: NonEmptySeasonalityLayout;
}

/** Exhaustive set of configurations supported by the public fitting backend. */
export type FitPlan = ConstantMeanFitPlan | LinearTrendFitPlan | LinearAdditiveFitPlan;

/** Constructors and exhaustive matching for supported fitting plans. */
export const FitPlan = Data.taggedEnum<FitPlan>();

/** Coarse-grained fitting capability that is total over every public fit plan. */
export interface FittingBackend {
  /**
   * Fit one complete model without per-row or per-iteration service calls.
   *
   * @param input - Packed training timestamps and values.
   * @param plan - Parsed, supported fitting plan.
   * @returns Fitted model parameters or a typed fitting failure.
   */
  readonly fit: (input: TrainingInput, plan: FitPlan) => Effect.Effect<Parameters, FittingError>;
}

/** Effect context key for the fitting backend selected by the composition root. */
export const FittingBackend = Context.Service<FittingBackend>("effect-prophet/FittingBackend");
