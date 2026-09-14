import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError, UnsupportedConfigurationError } from "../../src/errors";
import { constantMeanFittingBackendLayer } from "../../src/internal/constant-fitting-backend";
import {
  FittingBackend,
  type FitOptions,
  type TrainingInput,
} from "../../src/internal/fitting-backend";

const trainingInput: TrainingInput = {
  timestamps: new Float64Array([1, 2, 3]),
  values: new Float64Array([1, 2, 6]),
};

const fitWithConstantBackend = (input: TrainingInput, options: FitOptions) =>
  Effect.gen(function* () {
    const backend = yield* FittingBackend;

    return yield* backend.fit(input, options);
  }).pipe(Effect.provide(constantMeanFittingBackendLayer));

describe("constantMeanFittingBackendLayer", () => {
  it("fits the arithmetic-mean baseline when flat growth is explicit", async () => {
    const parameters = await Effect.runPromise(
      fitWithConstantBackend(trainingInput, { growth: "flat" }),
    );

    expect(parameters).toEqual({ model: "constant-mean-baseline", level: 3 });
  });

  it("rejects linear growth with structured capability context", async () => {
    const error = await Effect.runPromise(
      Effect.flip(fitWithConstantBackend(trainingInput, { growth: "linear" })),
    );

    expect(error).toBeInstanceOf(UnsupportedConfigurationError);

    if (error instanceof UnsupportedConfigurationError) {
      expect(error.option).toBe("growth");
      expect(error.received).toBe("linear");
      expect(error.supported).toEqual(["flat"]);
    }
  });

  it("checks growth support before running the arithmetic kernel", async () => {
    const emptyInput: TrainingInput = {
      timestamps: new Float64Array(),
      values: new Float64Array(),
    };

    const unsupportedError = await Effect.runPromise(
      Effect.flip(fitWithConstantBackend(emptyInput, { growth: "linear" })),
    );

    const fittingError = await Effect.runPromise(
      Effect.flip(fitWithConstantBackend(emptyInput, { growth: "flat" })),
    );

    expect(unsupportedError).toBeInstanceOf(UnsupportedConfigurationError);
    expect(fittingError).toBeInstanceOf(FittingError);
  });
});
