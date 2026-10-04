import { Effect, Result } from "effect";
import { describe, expect, expectTypeOf, it } from "vitest";

import { FittingError } from "../../src/errors";
import {
  FitPlan,
  FittingBackend,
  type Parameters,
  type TrainingInput,
} from "../../src/internal/fitting-backend";
import { makeTestFittingBackend } from "./fitting-backend-test-layer";
import { fixedPiecewiseParameters } from "../helpers/fixed-piecewise-model";
import { defaultAutomaticMapOptions } from "../../src/options";

const runnableWithoutServices = <A, E>(effect: Effect.Effect<A, E>): Effect.Effect<A, E> => effect;

const trainingInput: TrainingInput = {
  timestamps: new Float64Array([1_704_067_200_000, 1_704_067_201_000]),
  values: new Float64Array([1.5, 2.5]),
};

const fitPlan = FitPlan.LinearPiecewiseMap({
  ...defaultAutomaticMapOptions,
  scaling: "absmax",
  seasonalities: fixedPiecewiseParameters.seasonalities,
  seasonalityMasks: { rowCount: 2, componentCount: 0, values: new Uint8Array() },
  additionalFeatures: {
    matrix: { rowCount: 2, columnCount: 0, values: new Float64Array() },
    layout: { coefficientCount: 0, components: [], priorScales: [] },
  },
  events: fixedPiecewiseParameters.events,
  regressors: [],
});

const fittedParameters: Parameters = fixedPiecewiseParameters;

const fitWithBackend = Effect.fn("fitWithBackend")(function* (
  input: TrainingInput,
  plan: FitPlan,
): Effect.fn.Return<Parameters, FittingError, FittingBackend> {
  const backend = yield* FittingBackend;

  return yield* backend.fit(input, plan);
});

describe("FittingBackend", () => {
  it("runs a complete fit when its Layer is provided", async () => {
    const testBackend = makeTestFittingBackend(Result.succeed(fittedParameters));
    const program = fitWithBackend(trainingInput, fitPlan);

    expectTypeOf(program).toEqualTypeOf<Effect.Effect<Parameters, FittingError, FittingBackend>>();

    // @ts-expect-error -- The unprovided program intentionally still requires FittingBackend.
    void runnableWithoutServices(program);

    const providedProgram = program.pipe(Effect.provide(testBackend.layer));

    expectTypeOf(providedProgram).toEqualTypeOf<Effect.Effect<Parameters, FittingError, never>>();

    void runnableWithoutServices(providedProgram);

    const result = await Effect.runPromise(providedProgram);

    expect(result).toBe(fittedParameters);
    expect(testBackend.invocations).toEqual([
      {
        input: trainingInput,
        options: fitPlan,
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

    const providedProgram = fitWithBackend(trainingInput, fitPlan).pipe(
      Effect.provide(testBackend.layer),
    );

    expectTypeOf(providedProgram).toEqualTypeOf<Effect.Effect<Parameters, FittingError, never>>();

    const error = await Effect.runPromise(Effect.flip(providedProgram));

    expect(error).toBe(fittingError);
    expect(testBackend.invocations).toHaveLength(1);
  });
});
