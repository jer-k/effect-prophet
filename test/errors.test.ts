import { Schema } from "effect";
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

  it("retains fitting causes at runtime without encoding or enumerating them", () => {
    const cause = new Error("private runtime details");

    const error = new FittingError(
      {
        reason: "backend-failure",
        observationCount: 3,
        backendPhase: "load",
        message: "Failed to load the WASM fitting backend",
      },
      { cause },
    );

    expect(error.cause).toBe(cause);
    expect(Object.keys(error)).not.toContain("cause");

    const encoded = Schema.encodeSync(FittingError)(error);

    expect(encoded._tag).toBe("FittingError");
    expect(encoded.reason).toBe("backend-failure");
    expect(encoded.observationCount).toBe(3);
    expect(encoded.backendPhase).toBe("load");
    expect(encoded.message).toBe("Failed to load the WASM fitting backend");
    expect(encoded).not.toHaveProperty("cause");

    expect(JSON.parse(JSON.stringify(error))).not.toHaveProperty("cause");
  });

  it("retains prediction causes at runtime without encoding or enumerating them", () => {
    const cause = { localPath: "/private/module.wasm" };

    const error = new PredictionError(
      {
        reason: "backend-failure",
        timestamp: 1_704_067_200_000,
        backendPhase: "execute",
        message: "Failed to execute the WASM prediction backend",
      },
      { cause },
    );

    expect(error.cause).toBe(cause);
    expect(Object.keys(error)).not.toContain("cause");

    const encoded = Schema.encodeSync(PredictionError)(error);

    expect(encoded._tag).toBe("PredictionError");
    expect(encoded.reason).toBe("backend-failure");
    expect(encoded.timestamp).toBe(1_704_067_200_000);
    expect(encoded.backendPhase).toBe("execute");
    expect(encoded.message).toBe("Failed to execute the WASM prediction backend");
    expect(encoded).not.toHaveProperty("cause");

    expect(JSON.parse(JSON.stringify(error))).not.toHaveProperty("cause");
  });
});
