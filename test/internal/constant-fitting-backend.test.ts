import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError } from "../../src/errors";
import { fitWithConstantMeanBackend } from "../../src/internal/constant-fitting-backend";
import type { TrainingInput } from "../../src/internal/fitting-backend";

const trainingInput: TrainingInput = {
  timestamps: new Float64Array([1, 2, 3]),
  values: new Float64Array([1, 2, 6]),
};

describe("fitWithConstantMeanBackend", () => {
  it("fits the arithmetic-mean teaching baseline", async () => {
    const parameters = await Effect.runPromise(fitWithConstantMeanBackend(trainingInput));

    expect(parameters).toEqual({ model: "constant-mean-baseline", level: 3 });
  });

  it("preserves numerical failures in the typed error channel", async () => {
    const emptyInput: TrainingInput = {
      timestamps: new Float64Array(),
      values: new Float64Array(),
    };

    const error = await Effect.runPromise(Effect.flip(fitWithConstantMeanBackend(emptyInput)));

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("insufficient-observations");
    }
  });
});
