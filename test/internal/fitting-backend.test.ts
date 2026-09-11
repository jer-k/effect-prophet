import { Effect, Result } from "effect";
import { describe, expect, expectTypeOf, it } from "vitest";

import { FittingError } from "../../src/errors";
import {
  FittingBackend,
  type FitOptions,
  type FittedParameters,
  type TrainingInput,
} from "../../src/internal/fitting-backend";
import { makeTestFittingBackend } from "./fitting-backend-test-layer";

const runnableWithoutServices = <A, E>(effect: Effect.Effect<A, E>): Effect.Effect<A, E> => effect;

const trainingInput: TrainingInput = {
  timestamps: new Float64Array([1_704_067_200_000, 1_704_067_201_000]),
  values: new Float64Array([1.5, 2.5]),
};

const fitOptions: FitOptions = { growth: "linear" };

const fittedParameters: FittedParameters = {
  model: "linear-trend",
  intercept: 1.5,
  slope: 1,
  timeOrigin: 1_704_067_200_000,
  timeScale: 1_000,
};

const fitWithBackend = Effect.fn("fitWithBackend")(function* (
  input: TrainingInput,
  options: FitOptions,
): Effect.fn.Return<FittedParameters, FittingError, FittingBackend> {
  const backend = yield* FittingBackend;

  return yield* backend.fit(input, options);
});

describe("FittingBackend", () => {
  it("runs a complete fit when its Layer is provided", async () => {
    const testBackend = makeTestFittingBackend(Result.succeed(fittedParameters));
    const program = fitWithBackend(trainingInput, fitOptions);

    expectTypeOf(program).toEqualTypeOf<
      Effect.Effect<FittedParameters, FittingError, FittingBackend>
    >();

    // @ts-expect-error -- The unprovided program intentionally still requires FittingBackend.
    void runnableWithoutServices(program);

    const providedProgram = program.pipe(Effect.provide(testBackend.layer));

    expectTypeOf(providedProgram).toEqualTypeOf<
      Effect.Effect<FittedParameters, FittingError, never>
    >();

    void runnableWithoutServices(providedProgram);

    const result = await Effect.runPromise(providedProgram);

    expect(result).toBe(fittedParameters);
    expect(testBackend.invocations).toEqual([
      {
        input: trainingInput,
        options: fitOptions,
      },
    ]);
  });

  it("keeps expected backend failure in the typed error channel", async () => {
    const fittingError = new FittingError({
      reason: "backend-failure",
      observationCount: trainingInput.values.length,
      message: "Controlled fitting backend failure",
    });

    const testBackend = makeTestFittingBackend(Result.fail(fittingError));

    const providedProgram = fitWithBackend(trainingInput, fitOptions).pipe(
      Effect.provide(testBackend.layer),
    );

    expectTypeOf(providedProgram).toEqualTypeOf<
      Effect.Effect<FittedParameters, FittingError, never>
    >();

    const error = await Effect.runPromise(Effect.flip(providedProgram));

    expect(error).toBe(fittingError);
    expect(testBackend.invocations).toHaveLength(1);
  });
});
