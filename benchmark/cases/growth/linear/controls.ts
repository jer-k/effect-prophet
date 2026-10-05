import { defaultLinearOptimizer } from "effect-prophet";

import { outputFirstQuality, pythonDefaultOptimizer } from "../../prophet-defaults.ts";

/** Both libraries fit with their defaults: Effect's Stan-style policy and CmdStan's Auto. */
export const linearOptimizers = {
  effectOptimizer: defaultLinearOptimizer,
  pythonOptimizer: pythonDefaultOptimizer,
} as const;

/** Fitted linear comparisons share one evidence identity and the output-first policy. */
export const linearComparison = {
  kind: "equivalent-objective",
  evidenceId: "linear-output-first-v4",
} as const;

export const linearOptimizerQuality = outputFirstQuality;
