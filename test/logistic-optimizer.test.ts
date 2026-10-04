import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { InputValidationError } from "../src/errors";
import { defaultLinearOptimizer } from "../src/linear-optimizer";
import { decodeLogisticOptimizer } from "../src/logistic-optimizer";
import { decodeOptions } from "../src/options";

const proximal = {
  algorithm: "proximal",
  maxIterations: 10_000,
  relativeTolerance: 1e-7,
  absoluteTolerance: 1e-9,
} as const;

describe("logistic optimizer parsing", () => {
  it("uses the same parsed defaults and budget overrides as the shared Stan policy", async () => {
    expect(await Effect.runPromise(decodeLogisticOptimizer({}))).toEqual(defaultLinearOptimizer);
    expect(await Effect.runPromise(decodeLogisticOptimizer({ maxIterations: 250 }))).toEqual({
      ...defaultLinearOptimizer,
      maxIterations: 250,
    });
  });

  it.each([
    [{ algorithm: "proximal" }, proximal],
    [{ relativeTolerance: 1e-6 }, { ...proximal, relativeTolerance: 1e-6 }],
    [{ absoluteTolerance: 1e-8 }, { ...proximal, absoluteTolerance: 1e-8 }],
  ])(
    "keeps explicit historical controls restorable without substituting them for defaults (%j)",
    async (input, expected) => {
      const parsed = await Effect.runPromise(decodeLogisticOptimizer(input));
      expect(parsed).toEqual(expected);
      expect(Object.isFrozen(parsed)).toBe(true);
    },
  );

  it.each([
    { algorithm: "newton", relativeTolerance: 1e-7 },
    { algorithm: "auto", absoluteTolerance: 1e-9 },
    { algorithm: "proximal", fallback: "newton" },
    { algorithm: "proximal", lbfgs: {} },
    { algorithm: "newton", lbfgs: {} },
    { algorithm: "proximal", maxIterations: 0 },
    { algorithm: "proximal", relativeTolerance: 0 },
    { algorithm: "proximal", absoluteTolerance: Number.NaN },
  ])("rejects incompatible or invalid controls before fitting (%j)", async (optimizer) => {
    const failure = await Effect.runPromise(
      Effect.flip(decodeOptions({ growth: "logistic", map: { optimizer } })),
    );

    expect(failure).toBeInstanceOf(InputValidationError);
    expect(failure.input).toBe("options");
  });
});
