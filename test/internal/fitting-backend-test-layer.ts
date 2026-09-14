import { Effect, Layer, Result } from "effect";

import {
  FittingBackend,
  type FitOptions,
  type Parameters,
  type TrainingInput,
} from "../../src/internal/fitting-backend";
import type { FittingError, UnsupportedConfigurationError } from "../../src/errors";

/** One complete fitting invocation captured by the deterministic test backend. */
export interface FittingBackendInvocation {
  /** A snapshot of the packed training input received by the backend. */
  readonly input: TrainingInput;

  /** The fitting options received with the training input. */
  readonly options: FitOptions;
}

/** A deterministic fitting Layer and its observable invocation history. */
export interface TestFittingBackend {
  /** Complete fit invocations in execution order. */
  readonly invocations: ReadonlyArray<FittingBackendInvocation>;

  /** Layer that provides the controlled fitting backend. */
  readonly layer: Layer.Layer<FittingBackend>;
}

/**
 * Create a fitting backend Layer that records each complete call and returns a controlled result.
 *
 * @param result - The success or typed failure returned for every invocation.
 * @returns The test Layer and its live, read-only invocation history.
 */
export const makeTestFittingBackend = (
  result: Result.Result<Parameters, FittingError | UnsupportedConfigurationError>,
): TestFittingBackend => {
  const invocations: Array<FittingBackendInvocation> = [];

  const layer = Layer.succeed(FittingBackend, {
    fit: (input, options) =>
      Effect.sync(() => {
        invocations.push({
          input: {
            timestamps: input.timestamps.slice(),
            values: input.values.slice(),
          },
          options,
        });

        return result;
      }).pipe(Effect.flatMap(Effect.fromResult)),
  });

  return { invocations, layer };
};
