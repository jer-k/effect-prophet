import { Effect, Schema } from "effect";

import { InputValidationError, type ValidationIssue } from "./errors";
import { PositiveFinite } from "./internal/numeric-schemas";
import type { Observation } from "./observation";
import type { PredictionRow } from "./prediction-row";
import { TargetScalingModeSchema, type TargetScalingMode } from "./target-scaling";

/** Persisted policy for resolving row floors in a logistic model. */
export type LogisticFloorPolicy =
  | { readonly kind: "implicit"; readonly floor: number }
  | { readonly kind: "explicit" };

/** Train-derived target scaling for logistic growth. */
export interface LogisticTargetScaling {
  readonly mode: TargetScalingMode;
  readonly scale: number;
  readonly floorPolicy: LogisticFloorPolicy;
}

/** Runtime schema for persisted logistic target scaling. */
export const LogisticTargetScalingSchema = Schema.Struct({
  mode: TargetScalingModeSchema,
  scale: PositiveFinite,
  floorPolicy: Schema.Union([
    Schema.Struct({ kind: Schema.Literal("implicit"), floor: Schema.Finite }),
    Schema.Struct({ kind: Schema.Literal("explicit") }),
  ]),
});

/** Checked bounds supplied to one logistic fitting call. */
export interface LogisticTrainingBounds {
  readonly capacities: Float64Array;
  readonly explicitFloors: Float64Array;
  readonly floorPolicy: "implicit" | "explicit";
}

/** Checked bounds supplied to one logistic prediction call. */
export interface LogisticPredictionBounds {
  readonly capacities: Float64Array;
  readonly explicitFloors: Float64Array;
}

const validationFailure = (
  input: "observations" | "prediction-rows",
  issues: ReadonlyArray<ValidationIssue>,
  message: string,
): InputValidationError => new InputValidationError({ input, issues, message });

/** Parse complete logistic training bounds and enforce one floor policy for all rows. */
export const parseLogisticTrainingBounds = (
  observations: ReadonlyArray<Observation>,
  scaling: TargetScalingMode,
): Effect.Effect<LogisticTrainingBounds, InputValidationError> => {
  const issues: Array<ValidationIssue> = [];
  const capacities = new Float64Array(observations.length);
  const floorsPresent = observations.map((observation) => observation.floor !== undefined);
  const hasFloor = floorsPresent.some(Boolean);

  if (hasFloor && floorsPresent.some((present) => !present)) {
    for (const [index, present] of floorsPresent.entries()) {
      if (!present) {
        issues.push({
          path: [index, "floor"],
          message: "Every logistic training row must supply floor when any row does",
        });
      }
    }
  }

  const implicitFloor =
    scaling === "absmax"
      ? 0
      : observations.reduce(
          (minimum, observation) => Math.min(minimum, observation.value),
          Number.POSITIVE_INFINITY,
        );

  const explicitFloors = hasFloor ? new Float64Array(observations.length) : new Float64Array();

  for (const [index, observation] of observations.entries()) {
    const capacity = observation.capacity;

    if (capacity === undefined) {
      issues.push({ path: [index, "capacity"], message: "Logistic growth requires capacity" });
      continue;
    }

    capacities[index] = capacity;
    const floor = hasFloor ? observation.floor : implicitFloor;

    if (floor === undefined) {
      continue;
    }

    if (hasFloor) {
      explicitFloors[index] = floor;
    }

    if (capacity <= floor) {
      issues.push({ path: [index, "capacity"], message: "Capacity must be greater than floor" });
    }
  }

  return issues.length === 0
    ? Effect.succeed({
        capacities,
        explicitFloors,
        floorPolicy: hasFloor ? "explicit" : "implicit",
      })
    : Effect.fail(
        validationFailure(
          "observations",
          issues,
          "Logistic rows require complete capacities and a consistent valid floor policy",
        ),
      );
};

/** Reject logistic-only row bounds for a nonlogistic fit. */
export const rejectNonLogisticTrainingBounds = (
  observations: ReadonlyArray<Observation>,
): Effect.Effect<void, InputValidationError> => {
  const issues: Array<ValidationIssue> = [];

  for (const [index, observation] of observations.entries()) {
    if (observation.capacity !== undefined) {
      issues.push({
        path: [index, "capacity"],
        message: "Capacity is only valid for logistic growth",
      });
    }

    if (observation.floor !== undefined) {
      issues.push({ path: [index, "floor"], message: "Floor is only valid for logistic growth" });
    }
  }

  return issues.length === 0
    ? Effect.void
    : Effect.fail(
        validationFailure(
          "observations",
          issues,
          "Nonlogistic rows cannot contain capacity or floor",
        ),
      );
};

/** Parse prediction bounds according to one fitted logistic floor policy. */
export const parseLogisticPredictionBounds = (
  rows: ReadonlyArray<PredictionRow>,
  floorPolicy: LogisticFloorPolicy,
): Effect.Effect<LogisticPredictionBounds, InputValidationError> => {
  const issues: Array<ValidationIssue> = [];
  const capacities = new Float64Array(rows.length);

  const explicitFloors =
    floorPolicy.kind === "explicit" ? new Float64Array(rows.length) : new Float64Array();

  for (const [index, row] of rows.entries()) {
    const capacity = row.capacity;

    if (capacity === undefined) {
      issues.push({ path: [index, "capacity"], message: "Logistic prediction requires capacity" });
      continue;
    }

    capacities[index] = capacity;

    if (floorPolicy.kind === "explicit") {
      if (row.floor === undefined) {
        issues.push({ path: [index, "floor"], message: "This logistic model requires floor" });
        continue;
      }

      explicitFloors[index] = row.floor;

      if (capacity <= row.floor) {
        issues.push({ path: [index, "capacity"], message: "Capacity must be greater than floor" });
      }
    } else {
      if (row.floor !== undefined) {
        issues.push({
          path: [index, "floor"],
          message: "This logistic model uses its persisted implicit floor",
        });
      }

      if (capacity <= floorPolicy.floor) {
        issues.push({
          path: [index, "capacity"],
          message: "Capacity must be greater than the fitted implicit floor",
        });
      }
    }
  }

  return issues.length === 0
    ? Effect.succeed({ capacities, explicitFloors })
    : Effect.fail(
        validationFailure("prediction-rows", issues, "Logistic prediction bounds are invalid"),
      );
};

/** Reject logistic-only row bounds when predicting a nonlogistic model. */
export const rejectNonLogisticPredictionBounds = (
  rows: ReadonlyArray<PredictionRow>,
): Effect.Effect<void, InputValidationError> => {
  const issues: Array<ValidationIssue> = [];

  for (const [index, row] of rows.entries()) {
    if (row.capacity !== undefined) {
      issues.push({
        path: [index, "capacity"],
        message: "Capacity is only valid for logistic models",
      });
    }

    if (row.floor !== undefined) {
      issues.push({ path: [index, "floor"], message: "Floor is only valid for logistic models" });
    }
  }

  return issues.length === 0
    ? Effect.void
    : Effect.fail(
        validationFailure(
          "prediction-rows",
          issues,
          "Nonlogistic predictions cannot contain capacity or floor",
        ),
      );
};
