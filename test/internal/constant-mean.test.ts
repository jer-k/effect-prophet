import { Result } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError } from "../../src/errors";
import { fitConstantMean } from "../../src/internal/constant-mean";
import type { TrainingInput } from "../../src/internal/fitting-backend";

const makeTrainingInput = (
  timestamps: ReadonlyArray<number>,
  values: ReadonlyArray<number>,
): TrainingInput => ({
  timestamps: new Float64Array(timestamps),
  values: new Float64Array(values),
});

const getFailure = (result: Result.Result<unknown, FittingError>): FittingError =>
  Result.getOrThrow(Result.flip(result));

describe("fitConstantMean", () => {
  it("calculates the arithmetic mean without an Effect wrapper", () => {
    const result = fitConstantMean(makeTrainingInput([1, 2, 3], [1, 2, 6]));

    expect(result).toEqual(Result.succeed({ model: "constant-mean-baseline", level: 3 }));
  });

  it("avoids overflowing a representable mean of large values", () => {
    const result = fitConstantMean(makeTrainingInput([1, 2], [Number.MAX_VALUE, Number.MAX_VALUE]));

    expect(result).toEqual(
      Result.succeed({ model: "constant-mean-baseline", level: Number.MAX_VALUE }),
    );
  });

  it("rejects empty training data", () => {
    const error = getFailure(fitConstantMean(makeTrainingInput([], [])));

    expect(error).toBeInstanceOf(FittingError);
    expect(error.reason).toBe("insufficient-observations");
    expect(error.observationCount).toBe(0);
  });

  it("rejects mismatched packed arrays", () => {
    const error = getFailure(fitConstantMean(makeTrainingInput([1, 2], [1])));

    expect(error.reason).toBe("backend-failure");
    expect(error.message).toContain("equal lengths");
  });

  it("rejects non-finite packed values", () => {
    const error = getFailure(fitConstantMean(makeTrainingInput([1], [Number.NaN])));

    expect(error.reason).toBe("backend-failure");
    expect(error.message).toContain("values must be finite");
  });
});
