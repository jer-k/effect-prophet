import { Result } from "effect";

import { FittingError, type FittingFailureReason } from "../errors";
import type { FittedParameters, TrainingInput } from "./fitting-backend";

const fittingFailure = (
  reason: FittingFailureReason,
  observationCount: number,
  message: string,
): Result.Result<never, FittingError> =>
  Result.fail(
    new FittingError({
      reason,
      observationCount,
      message,
    }),
  );

const calculateFiniteMean = (values: Float64Array): number => {
  let maximumMagnitude = 0;

  for (const value of values) {
    maximumMagnitude = Math.max(maximumMagnitude, Math.abs(value));
  }

  if (maximumMagnitude === 0) {
    return 0;
  }

  let scaledSum = 0;

  for (const value of values) {
    scaledSum += value / maximumMagnitude;
  }

  return maximumMagnitude * (scaledSum / values.length);
};

/**
 * Fit the temporary constant baseline by calculating the finite arithmetic mean.
 *
 * The calculation scales values before summing so repeated large finite values
 * do not overflow an otherwise representable mean.
 *
 * @param input - Packed timestamps and corresponding observation values.
 * @returns The constant level or a structured fitting failure.
 */
export const fitConstantMean = (
  input: TrainingInput,
): Result.Result<FittedParameters, FittingError> => {
  const observationCount = input.values.length;

  if (observationCount === 0) {
    return fittingFailure(
      "insufficient-observations",
      observationCount,
      "At least one observation is required to fit the constant baseline",
    );
  }

  if (input.timestamps.length !== observationCount) {
    return fittingFailure(
      "backend-failure",
      observationCount,
      "Training timestamps and values must have equal lengths",
    );
  }

  for (const timestamp of input.timestamps) {
    if (!Number.isFinite(timestamp)) {
      return fittingFailure(
        "backend-failure",
        observationCount,
        "Training timestamps must be finite",
      );
    }
  }

  for (const value of input.values) {
    if (!Number.isFinite(value)) {
      return fittingFailure("backend-failure", observationCount, "Training values must be finite");
    }
  }

  const level = calculateFiniteMean(input.values);

  if (!Number.isFinite(level)) {
    return fittingFailure(
      "degenerate-observations",
      observationCount,
      "Training values did not produce a finite mean",
    );
  }

  return Result.succeed({ level });
};
