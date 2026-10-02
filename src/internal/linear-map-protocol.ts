import { Effect, Match } from "effect";

import { FittingError } from "../errors";
import type { LinearOptimizer } from "../linear-optimizer";
import type { PiecewiseMapFitSummarySchema } from "../fitted-model";

/** Annotate bounded controls within the existing complete WASM fit boundary. */
export const annotateLinearRequest = (optimizer: LinearOptimizer) =>
  Effect.annotateCurrentSpan({
    "effect_prophet.optimizer.requested_algorithm": optimizer.algorithm,
    "effect_prophet.optimizer.max_iterations": optimizer.maxIterations,
    "effect_prophet.optimizer.fallback":
      optimizer.algorithm === "newton" ? "none" : optimizer.fallback,
  });

/** Annotate a completed linear fit within its existing WASM boundary span. */
export const annotateLinearCompletion = (summary: typeof PiecewiseMapFitSummarySchema.Type) => {
  const attributes = {
    "effect_prophet.optimizer.algorithm": summary.optimization.algorithm,
    "effect_prophet.optimizer.termination": summary.termination,
    "effect_prophet.optimizer.iteration.count": summary.iterations,
    "effect_prophet.optimizer.attempt.count": summary.optimization.attemptCount,
    "effect_prophet.optimizer.hessian_reset.count": summary.optimization.hessianResets,
  };

  if (summary.optimization.failedAttemptIterations === null) {
    return Effect.annotateCurrentSpan(attributes);
  }

  return Effect.annotateCurrentSpan({
    ...attributes,
    "effect_prophet.optimizer.failed_attempt.iteration.count":
      summary.optimization.failedAttemptIterations,
  });
};

/** Decode bounded failure evidence without losing either failed optimization attempt. */
export const linearOptimizerFailure = (
  packed: Float64Array,
  observationCount: number,
): Effect.Effect<never, FittingError> => {
  const reasons = [
    "invalid-configuration",
    "size-overflow",
    "objective-failure",
    "curvature-failure",
    "non-finite-result",
    "line-search-failure",
  ] as const;

  const first = reasons[(packed[1] ?? Number.NaN) - 1];
  const second = packed[3] === 0 ? null : reasons[(packed[3] ?? Number.NaN) - 1];

  const iterations = (value: number | undefined) =>
    value === -1 || (value !== undefined && Number.isSafeInteger(value) && value >= 0);

  const valid =
    packed.length === 5 &&
    first !== undefined &&
    second !== undefined &&
    iterations(packed[2]) &&
    iterations(packed[4]) &&
    (second !== null || packed[4] === -1);

  return Effect.fail(
    new FittingError(
      {
        reason: "backend-failure",
        observationCount,
        backendPhase: valid ? "execute" : "protocol",
        message: valid
          ? "Linear MAP optimizer failed"
          : "WASM linear optimizer returned malformed failure evidence",
      },
      valid
        ? {
            cause: {
              first: { reason: first, iterations: packed[2] === -1 ? null : packed[2] },
              fallback:
                second === null
                  ? null
                  : { reason: second, iterations: packed[4] === -1 ? null : packed[4] },
            },
          }
        : undefined,
    ),
  );
};

/** Linear control wire version two, with no inapplicable Newton fields. */
export const encodeLinearOptimizer = (optimizer: LinearOptimizer): Float64Array => {
  if (optimizer.algorithm === "newton") {
    return new Float64Array([2, 1, optimizer.maxIterations]);
  }

  const controls = optimizer.lbfgs;

  return new Float64Array([
    2,
    optimizer.algorithm === "auto" ? 0 : 2,
    optimizer.maxIterations,
    optimizer.fallback === "newton" ? 1 : 0,
    controls.historySize,
    controls.initAlpha,
    controls.tolObj,
    controls.tolRelObj,
    controls.tolGrad,
    controls.tolRelGrad,
    controls.tolParam,
  ]);
};

const terminations = [
  "constant-target-shortcut",
  "objective-change",
  "no-progress",
  "absolute-objective",
  "relative-objective",
  "absolute-gradient",
  "relative-gradient",
  "parameter-change",
  "iteration-limit",
] as const;

/** Project the version-two completion fields; model parsing owns semantic checks. */
export const decodeLinearCompletion = (packed: Float64Array) => ({
  termination: terminations[(packed[15] ?? Number.NaN) - 1],
  optimization: {
    algorithm: Match.value(packed[16]).pipe(
      Match.when(0, () => "none" as const),
      Match.when(1, () => "newton" as const),
      Match.when(2, () => "lbfgs" as const),
      Match.orElse(() => undefined),
    ),
    attemptCount: packed[17],
    failedAttemptIterations: packed[18] === -1 ? null : packed[18],
    hessianResets: packed[19],
  },
});
