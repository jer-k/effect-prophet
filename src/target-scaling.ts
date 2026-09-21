import { Schema } from "effect";

import { PositiveFinite } from "./internal/numeric-schemas";

/** Target-scaling policies supported by Python Prophet for nonlogistic models. */
export type TargetScalingMode = "absmax" | "minmax";

/** Complete train-derived state required to reproduce output-unit predictions. */
export interface TargetScaling {
  /** Policy used to transform training targets. */
  readonly mode: TargetScalingMode;

  /** Output-unit value subtracted from targets before fitting. */
  readonly offset: number;

  /** Positive output-unit divisor applied after centering. */
  readonly scale: number;
}

/** Runtime schema for a supported target-scaling policy. */
export const TargetScalingModeSchema = Schema.Literals(["absmax", "minmax"]);

/** Runtime schema for complete persisted target-scaling state. */
export const TargetScalingSchema = Schema.Struct({
  mode: TargetScalingModeSchema,
  offset: Schema.Finite,
  scale: PositiveFinite,
});

/** Python Prophet's default target-scaling policy. */
export const defaultTargetScalingMode: TargetScalingMode = "absmax";

/** Convert a parsed target-scaling mode to the Rust/WASM protocol code. */
export const targetScalingModeCode = (mode: TargetScalingMode): number =>
  mode === "absmax" ? 0 : 1;
