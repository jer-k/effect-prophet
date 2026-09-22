import { Context, Data, type Effect } from "effect";

import type { FittingError } from "../errors";
import type { EventCalendar } from "../event";
import type { Parameters } from "../fitted-model";
import type { LogisticTrainingBounds } from "../logistic";
import type { ChangepointSetting, MapOptimizerControls } from "../options";
import type { ResolvedRegressor } from "../regressor";
import type { TargetScalingMode } from "../target-scaling";
import type {
  EmptySeasonalityLayout,
  NonEmptySeasonalityLayout,
  SeasonalityLayout,
} from "../seasonality";
import type { KnownAdditiveFeatures, SeasonalityMaskMatrix } from "./additional-features";

export type {
  FlatMapParameters,
  LinearParameters,
  Parameters,
  PiecewiseMapParameters,
} from "../fitted-model";

/** Packed, index-aligned numerical observations supplied to a fitting backend. */
export interface TrainingInput {
  /** Epoch-millisecond timestamps stored contiguously for a numerical backend. */
  readonly timestamps: Float64Array;

  /** Observation values whose indexes correspond to `timestamps`. */
  readonly values: Float64Array;
}

/** Request for ordinary linear-trend fitting without seasonal components. */
export interface LinearTrendFitPlan {
  readonly _tag: "LinearTrend";
}

/** Request for joint linear piecewise MAP fitting and additive-seasonality fitting. */
export interface LinearPiecewiseMapFitPlan {
  readonly _tag: "LinearPiecewiseMap";

  /** Train-only target-scaling policy used by the MAP objective. */
  readonly scaling: TargetScalingMode;

  /** Ordered resolved seasonality layout, possibly empty. */
  readonly seasonalities: SeasonalityLayout;

  /** Explicit or automatic changepoint request parsed from public options. */
  readonly changepoints: ChangepointSetting;

  /** Positive Laplace scale for changepoint rate adjustments. */
  readonly changepointPriorScale: number;

  /** Deterministic optimizer controls. */
  readonly optimizer: MapOptimizerControls;

  /** Unconditional or condition-resolved masks aligned to training rows. */
  readonly seasonalityMasks: SeasonalityMaskMatrix;

  /** Checked known additive columns aligned to training rows. */
  readonly additionalFeatures: KnownAdditiveFeatures;

  /** Semantic event state retained in the fitted model. */
  readonly events: EventCalendar;

  /** Training-derived regressor metadata retained in the fitted model. */
  readonly regressors: ReadonlyArray<ResolvedRegressor>;
}

/** Request for featureless reduced flat MAP fitting. */
export interface FlatMapFitPlan {
  readonly _tag: "FlatMap";

  /** Train-only target-scaling policy used by the MAP objective. */
  readonly scaling: TargetScalingMode;

  /** Canonical empty feature layout established by public parsing. */
  readonly seasonalities: EmptySeasonalityLayout;
}

/** Request for reduced flat MAP fitting with a non-empty additive layout. */
export interface FlatAdditiveMapFitPlan {
  readonly _tag: "FlatAdditiveMap";

  /** Train-only target-scaling policy used by the MAP objective. */
  readonly scaling: TargetScalingMode;

  /** Non-empty ordered seasonality coefficient layout established by public parsing. */
  readonly seasonalities: NonEmptySeasonalityLayout;
}

/** Request for mixed reduced-flat MAP fitting with resolved feature modes. */
export interface FlatMixedMapFitPlan {
  readonly _tag: "FlatMixedMap";
  readonly scaling: TargetScalingMode;
  readonly seasonalities: SeasonalityLayout;
  readonly optimizer: MapOptimizerControls;
  readonly seasonalityMasks: SeasonalityMaskMatrix;
  readonly additionalFeatures: KnownAdditiveFeatures;
  readonly events: EventCalendar;
  readonly regressors: ReadonlyArray<ResolvedRegressor>;
}

/** Request for joint floor-aware logistic MAP fitting. */
export interface LogisticPiecewiseMapFitPlan {
  readonly _tag: "LogisticPiecewiseMap";
  readonly scaling: TargetScalingMode;
  readonly bounds: LogisticTrainingBounds;
  readonly seasonalities: SeasonalityLayout;
  readonly changepoints: ChangepointSetting;
  readonly changepointPriorScale: number;
  readonly optimizer: MapOptimizerControls;
  readonly seasonalityMasks: SeasonalityMaskMatrix;
  readonly additionalFeatures: KnownAdditiveFeatures;
  readonly events: EventCalendar;
  readonly regressors: ReadonlyArray<ResolvedRegressor>;
}

/** Exhaustive set of configurations supported by the public fitting backend. */
export type FitPlan =
  | LinearTrendFitPlan
  | LinearPiecewiseMapFitPlan
  | FlatMapFitPlan
  | FlatAdditiveMapFitPlan
  | FlatMixedMapFitPlan
  | LogisticPiecewiseMapFitPlan;

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
