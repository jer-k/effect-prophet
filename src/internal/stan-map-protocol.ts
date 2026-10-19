import { Effect, Match } from "effect";

import { FittingError } from "../errors";
import type { LinearOptimizer } from "../linear-optimizer";
import type { StanMapFitSummarySchema } from "../fitted-model";

/** Annotate bounded controls within the existing complete WASM fit boundary. */
export const annotateStanRequest = (optimizer: LinearOptimizer) =>
  Effect.annotateCurrentSpan({
    "effect_prophet.optimizer.requested_algorithm": optimizer.algorithm,
    "effect_prophet.optimizer.max_iterations": optimizer.maxIterations,
    "effect_prophet.optimizer.fallback":
      optimizer.algorithm === "newton" ? "none" : optimizer.fallback,
  });

/** Annotate a completed Stan fit within its existing WASM boundary span. */
export const annotateStanCompletion = (summary: typeof StanMapFitSummarySchema.Type) => {
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

const growthLabels = { flat: "Flat", linear: "Linear", logistic: "Logistic" } as const;

/** wasm32 linear memory addresses at most 65,536 pages of 64 KiB. */
export const wasmMemoryLimitBytes = 65_536 * 65_536;

/** Decode bounded failure evidence without losing either failed optimization attempt. */
export const stanOptimizerFailure = (
  packed: Float64Array,
  observationCount: number,
  growth: "flat" | "linear" | "logistic" = "linear",
): Effect.Effect<never, FittingError> => {
  const reasons = [
    "invalid-configuration",
    "size-overflow",
    "objective-failure",
    "curvature-failure",
    "non-finite-result",
    "line-search-failure",
    "workspace-allocation",
  ] as const;

  const first = reasons[(packed[1] ?? Number.NaN) - 1];
  const second = packed[3] === 0 ? null : reasons[(packed[3] ?? Number.NaN) - 1];

  const iterations = (value: number | undefined) =>
    value === -1 || (value !== undefined && Number.isSafeInteger(value) && value >= 0);

  // Workspace failures carry the Newton parameter count where others carry iterations.
  const detail = (reason: (typeof reasons)[number] | null, value: number | undefined) =>
    reason === "workspace-allocation"
      ? value !== undefined && Number.isSafeInteger(value) && value > 0
      : iterations(value);

  const valid =
    packed.length === 5 &&
    first !== undefined &&
    second !== undefined &&
    detail(first, packed[2]) &&
    detail(second, packed[4]) &&
    (second !== null || packed[4] === -1);

  if (!valid) {
    return Effect.fail(
      new FittingError({
        reason: "backend-failure",
        observationCount,
        backendPhase: "protocol",
        message: `WASM ${growth} optimizer returned malformed failure evidence`,
      }),
    );
  }

  const firstDetail = packed[2] ?? -1;
  const secondDetail = packed[4] ?? -1;

  const attempt = (reason: (typeof reasons)[number], value: number) =>
    reason === "workspace-allocation"
      ? { reason, parameterCount: value }
      : { reason, iterations: value === -1 ? null : value };

  const cause = {
    first: attempt(first, firstDetail),
    fallback: second === null ? null : attempt(second, secondDetail),
  };

  const parameterCount =
    first === "workspace-allocation"
      ? firstDetail
      : second === "workspace-allocation"
        ? secondDetail
        : undefined;

  if (parameterCount !== undefined) {
    return Effect.fail(
      new FittingError(
        {
          reason: "memory-limit",
          observationCount,
          parameterCount,
          memoryLimitBytes: wasmMemoryLimitBytes,
          backendPhase: "execute",
          message: `${growthLabels[growth]} MAP Newton workspace for ${parameterCount} parameters exceeds WASM memory`,
        },
        { cause },
      ),
    );
  }

  return Effect.fail(
    new FittingError(
      {
        reason: "backend-failure",
        observationCount,
        backendPhase: "execute",
        message: `${growthLabels[growth]} MAP optimizer failed`,
      },
      { cause },
    ),
  );
};

/** Shared Stan control wire version two, with no inapplicable Newton fields. */
export const encodeStanOptimizer = (optimizer: LinearOptimizer): Float64Array => {
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

/** Project shared completion fields; model parsing owns semantic checks. */
export const decodeStanCompletion = (packed: Float64Array, offset = 15) => ({
  termination: terminations[(packed[offset] ?? Number.NaN) - 1],
  optimization: {
    algorithm: Match.value(packed[offset + 1]).pipe(
      Match.when(0, () => "none" as const),
      Match.when(1, () => "newton" as const),
      Match.when(2, () => "lbfgs" as const),
      Match.orElse(() => undefined),
    ),
    attemptCount: packed[offset + 2],
    failedAttemptIterations: packed[offset + 3] === -1 ? null : packed[offset + 3],
    hessianResets: packed[offset + 4],
  },
});
