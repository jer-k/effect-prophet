import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  EvaluationError,
  EvaluationMetricError,
  EvaluationSearchError,
  EvaluationReportError,
  HoldoutEvaluationError,
  FittingError,
  InputValidationError,
  PredictionError,
} from "../src/index";
import { CandidateIdSchema } from "../src/errors";

describe("typed domain errors", () => {
  it("keeps holdout causes in memory and separates portable report failures", () => {
    const original = new FittingError(
      {
        reason: "backend-failure",
        observationCount: 3,
        message: "Sensitive backend details",
      },
      { cause: new Error("private path") },
    );

    const holdout = new HoldoutEvaluationError(
      {
        step: "fit",
        reason: "operation-failed",
        message: "Holdout fit failed",
      },
      { cause: original },
    );

    const report = new EvaluationReportError({
      operation: "decode",
      issues: [{ path: ["forecasts"], message: "Invalid report" }],
      message: "Invalid report",
    });

    expect(holdout.cause).toBe(original);
    expect(JSON.stringify(holdout)).not.toContain("Sensitive backend details");
    expect(Schema.encodeSync(HoldoutEvaluationError)(holdout)).not.toHaveProperty("cause");
    expect(Schema.encodeSync(EvaluationReportError)(report)).toMatchObject({ operation: "decode" });
  });
  it("encodes structured evaluation-plan validation issues", () => {
    const error = new InputValidationError({
      input: "evaluation-plan",
      issues: [{ path: ["cutoffs", "timestamps", 0], message: "Cutoff has no assessment rows" }],
      message: "Cutoff has no assessment rows",
    });

    expect(Schema.encodeSync(InputValidationError)(error)).toMatchObject({
      input: "evaluation-plan",
      issues: [{ path: ["cutoffs", "timestamps", 0] }],
    });
  });

  it("encodes baseline input and fold failure context", () => {
    const input = new InputValidationError({
      input: "evaluation-baseline",
      issues: [{ path: ["lagMs"], message: "Expected a positive duration" }],
      message: "Expected a positive duration",
    });

    const failure = new EvaluationError({
      fold: 1,
      cutoff: 1_704_067_200_000,
      stage: "baseline",
      reason: "baseline-unavailable",
      rowIndex: 2,
      message: "Exact lag unavailable",
    });

    expect(Schema.encodeSync(InputValidationError)(input)).toMatchObject({
      input: "evaluation-baseline",
    });
    expect(Schema.encodeSync(EvaluationError)(failure)).toMatchObject({
      stage: "baseline",
      reason: "baseline-unavailable",
      fold: 1,
      rowIndex: 2,
    });
  });

  it("encodes bounded all-failed outcomes without a runtime cause or message projection", () => {
    const error = new EvaluationSearchError({
      reason: "no-success",
      outcomes: [
        {
          id: Schema.decodeSync(CandidateIdSchema)("candidate-1"),
          candidateIndex: 0,
          failure: {
            tag: "EvaluationError",
            fold: 0,
            stage: "fit",
            reason: "fit-failed",
            causeTag: "FittingError",
            causeReason: "backend-failure",
          },
        },
      ],
      message: "No search candidate succeeded",
    });

    const encoded = Schema.encodeSync(EvaluationSearchError)(error);

    expect(encoded).toMatchObject({
      reason: "no-success",
      outcomes: [{ candidateIndex: 0, failure: { causeReason: "backend-failure" } }],
    });
    expect(encoded).not.toHaveProperty("cause");
    expect(JSON.stringify(encoded)).not.toMatch(/stack|timestamp|observationCount/);
  });

  it("encodes bounded metric and aggregation failure context", () => {
    const error = new EvaluationMetricError({
      metric: "mdape",
      aggregation: "rolling",
      bucket: 2,
      reason: "zero-actual",
      stage: "division",
      message: "Zero actual in window",
    });

    expect(Schema.encodeSync(EvaluationMetricError)(error)).toMatchObject({
      metric: "mdape",
      aggregation: "rolling",
      bucket: 2,
      reason: "zero-actual",
      stage: "division",
    });
  });

  it("encodes fold context without the underlying typed error or its runtime cause", () => {
    const original = new FittingError(
      {
        reason: "backend-failure",
        observationCount: 2,
        message: "Backend did not load",
      },
      { cause: new Error("private path") },
    );

    const error = new EvaluationError(
      {
        fold: 0,
        cutoff: 1_704_067_200_000,
        stage: "fit",
        reason: "fit-failed",
        message: "Evaluation fold fit failed",
      },
      { cause: original },
    );

    expect(error.cause).toBe(original);
    expect(Object.keys(error)).not.toContain("cause");
    expect(Schema.encodeSync(EvaluationError)(error)).toMatchObject({
      fold: 0,
      stage: "fit",
      reason: "fit-failed",
    });
    expect(Schema.encodeSync(EvaluationError)(error)).not.toHaveProperty("cause");
    expect(JSON.parse(JSON.stringify(error))).not.toHaveProperty("cause");
  });

  it("encodes uncertainty fold context without disclosing prediction causes", () => {
    const original = new PredictionError({
      reason: "simulation-limit",
      timestamp: 1_704_067_200_000,
      message: "private simulation details",
    });

    const error = new EvaluationError(
      {
        fold: 1,
        cutoff: 1_704_067_200_000,
        stage: "uncertainty",
        reason: "uncertainty-failed",
        message: "Evaluation fold uncertainty failed",
      },
      { cause: original },
    );

    expect(error.cause).toBe(original);
    expect(Schema.encodeSync(EvaluationError)(error)).toMatchObject({
      stage: "uncertainty",
      reason: "uncertainty-failed",
      fold: 1,
    });
    expect(Schema.encodeSync(EvaluationError)(error)).not.toHaveProperty("cause");
  });

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
