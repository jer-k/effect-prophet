import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError, PredictionError, UnsupportedConfigurationError } from "../src/index";

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

  it("exposes schema-backed unsupported configuration context", () => {
    const error = new UnsupportedConfigurationError({
      option: "growth",
      received: "flat",
      supported: ["linear"],
      message: "The selected backend supports only linear growth",
    });

    expect(error._tag).toBe("UnsupportedConfigurationError");
    expect(error.option).toBe("growth");
    expect(error.received).toBe("flat");
    expect(error.supported).toEqual(["linear"]);

    const encoded = Schema.encodeSync(UnsupportedConfigurationError)(error);

    expect(encoded._tag).toBe("UnsupportedConfigurationError");
    expect(encoded.option).toBe("growth");
    expect(encoded.received).toBe("flat");
    expect(encoded.supported).toEqual(["linear"]);
    expect(encoded.message).toBe("The selected backend supports only linear growth");
    expect(() =>
      Schema.decodeUnknownSync(UnsupportedConfigurationError)({
        ...encoded,
        supported: [],
      }),
    ).toThrow();
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
