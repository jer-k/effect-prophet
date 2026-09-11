import { describe, expect, it } from "vitest";

import { FittingError, PredictionError } from "../src/index";

describe("typed domain errors", () => {
  it("exposes structured fitting failure context", () => {
    const error = new FittingError({
      reason: "insufficient-observations",
      observationCount: 1,
      message: "At least two observations are required for linear growth",
    });

    expect(error._tag).toBe("FittingError");
    expect(error.reason).toBe("insufficient-observations");
    expect(error.observationCount).toBe(1);
  });

  it("exposes structured prediction failure context", () => {
    const error = new PredictionError({
      reason: "non-finite-forecast",
      timestamp: 1_704_067_200_000,
      message: "Prediction produced a non-finite value",
    });

    expect(error._tag).toBe("PredictionError");
    expect(error.reason).toBe("non-finite-forecast");
    expect(error.timestamp).toBe(1_704_067_200_000);
  });
});
