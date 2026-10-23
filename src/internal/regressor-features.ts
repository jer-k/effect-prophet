import { Effect, Schema } from "effect";

import type { RegressorDefinition, RegressorTransform, ResolvedRegressor } from "../regressor";
import {
  createAdditionalFeatureLayout,
  createAdditionalFeatureMatrix,
  type InvalidAdditionalFeatures,
  type KnownAdditiveFeatures,
} from "./additional-features";
import { pairwiseSum } from "./pairwise-sum";
import { checkedElementCount } from "./safe-arithmetic";

/** Failure while resolving or applying regressor preprocessing. */
export class RegressorFeatureError extends Schema.TaggedError<RegressorFeatureError>()(
  "RegressorFeatureError",
  {
    path: Schema.Array(Schema.PropertyKey),
    message: Schema.String,
  },
) {}

/** Resolved train-only regressor metadata and its aligned feature matrix. */
export interface ResolvedRegressorFeatures {
  readonly regressors: ReadonlyArray<ResolvedRegressor>;
  readonly features: KnownAdditiveFeatures;
}

const fail = (path: ReadonlyArray<PropertyKey>, message: string) =>
  Effect.fail(new RegressorFeatureError({ path, message }));

const fromAdditionalFeatureError = (error: InvalidAdditionalFeatures): RegressorFeatureError =>
  new RegressorFeatureError({ path: error.path, message: error.message });

const checkRows = (
  values: ReadonlyArray<ReadonlyArray<number>>,
  columnCount: number,
): Effect.Effect<void, RegressorFeatureError> => {
  for (const [rowIndex, row] of values.entries()) {
    if (row.length !== columnCount) {
      return fail(
        [rowIndex],
        `Expected exactly ${columnCount} aligned regressor values in every row`,
      );
    }

    for (const [columnIndex, value] of row.entries()) {
      if (!Number.isFinite(value)) {
        return fail([rowIndex, columnIndex], "Aligned regressor values must be finite numbers");
      }
    }
  }

  return Effect.void;
};

/**
 * Resolve one transform with the arithmetic of pandas' `mean` and `std`, which Prophet uses.
 *
 * Both are two-pass numpy pairwise sums: the mean first, then the squared deviations from it.
 * Matching the summation order reproduces Prophet's statistics, and so its standardized
 * features, bit for bit.
 */
const resolveTransform = (
  definition: RegressorDefinition,
  values: ReadonlyArray<ReadonlyArray<number>>,
  columnIndex: number,
): Effect.Effect<RegressorTransform, RegressorFeatureError> => {
  const column: Array<number> = [];
  let first: number | undefined;
  let constant = true;
  let sawZero = false;
  let sawOne = false;
  let sawOther = false;

  for (const [rowIndex, row] of values.entries()) {
    const value = row[columnIndex];

    if (value === undefined || !Number.isFinite(value)) {
      return fail([rowIndex, columnIndex], "Aligned regressor values must be finite numbers");
    }

    if (first === undefined) {
      first = value;
    } else if (value !== first) {
      constant = false;
    }

    if (value === 0) {
      sawZero = true;
    } else if (value === 1) {
      sawOne = true;
    } else {
      sawOther = true;
    }

    column.push(value);
  }

  if (definition.standardization === "never") {
    return Effect.succeed(Object.freeze({ mode: "identity", reason: "disabled" }));
  }

  if (constant || column.length < 2) {
    return Effect.succeed(Object.freeze({ mode: "identity", reason: "constant" }));
  }

  if (definition.standardization === "auto" && sawZero && sawOne && !sawOther) {
    return Effect.succeed(Object.freeze({ mode: "identity", reason: "binary" }));
  }

  const mean = pairwiseSum(column) / column.length;

  const sumSquaredDeviation = pairwiseSum(
    column.map((value) => {
      const deviation = mean - value;

      return deviation * deviation;
    }),
  );

  if (!Number.isFinite(mean) || !Number.isFinite(sumSquaredDeviation)) {
    return fail(
      [columnIndex],
      `Regressor '${definition.name}' has unrepresentable training statistics`,
    );
  }

  const variance = sumSquaredDeviation / (column.length - 1);
  const sampleStandardDeviation = Math.sqrt(variance);

  if (
    !Number.isFinite(variance) ||
    variance <= 0 ||
    !Number.isFinite(sampleStandardDeviation) ||
    sampleStandardDeviation <= 0
  ) {
    return fail(
      [columnIndex],
      `Regressor '${definition.name}' has an unrepresentable sample standard deviation`,
    );
  }

  return Effect.succeed(Object.freeze({ mode: "standardized", mean, sampleStandardDeviation }));
};

const makeFeatures = (
  regressors: ReadonlyArray<ResolvedRegressor>,
  values: ReadonlyArray<ReadonlyArray<number>>,
): Effect.Effect<KnownAdditiveFeatures, RegressorFeatureError> =>
  Effect.gen(function* () {
    yield* checkRows(values, regressors.length);

    const elementCount = checkedElementCount(values.length, regressors.length);

    if (elementCount === undefined) {
      return yield* fail([], "Regressor feature dimensions exceed safe arithmetic");
    }

    const packed = new Float64Array(elementCount);

    for (const [rowIndex, row] of values.entries()) {
      for (const [columnIndex, regressor] of regressors.entries()) {
        const value = row[columnIndex];

        if (value === undefined) {
          return yield* fail(
            [rowIndex, columnIndex],
            "Aligned regressor rows omitted an expected value",
          );
        }

        const transformed =
          regressor.transform.mode === "standardized"
            ? (value - regressor.transform.mean) / regressor.transform.sampleStandardDeviation
            : value;

        if (!Number.isFinite(transformed)) {
          return yield* fail(
            [rowIndex, columnIndex],
            `Regressor '${regressor.definition.name}' produced a non-finite transformed value`,
          );
        }

        packed[rowIndex * regressors.length + columnIndex] = transformed;
      }
    }

    const components = regressors.map((regressor, index) => ({
      kind: "regressor" as const,
      name: regressor.definition.name,
      coefficientOffset: index,
      coefficientCount: 1,
      mode: regressor.definition.mode,
    }));

    const layout = yield* createAdditionalFeatureLayout(
      components,
      regressors.map((regressor) => regressor.definition.priorScale),
    ).pipe(Effect.mapError(fromAdditionalFeatureError));

    const matrix = yield* createAdditionalFeatureMatrix(
      values.length,
      regressors.length,
      packed,
    ).pipe(Effect.mapError(fromAdditionalFeatureError));

    return Object.freeze({ matrix, layout });
  });

/** Resolve train-only transforms and construct an aligned regressor feature matrix. */
export const resolveRegressorFeatures = (
  definitions: ReadonlyArray<RegressorDefinition>,
  trainingValues: ReadonlyArray<ReadonlyArray<number>>,
): Effect.Effect<ResolvedRegressorFeatures, RegressorFeatureError> =>
  Effect.gen(function* () {
    yield* checkRows(trainingValues, definitions.length);

    const regressors: Array<ResolvedRegressor> = [];

    for (const [columnIndex, definition] of definitions.entries()) {
      const transform = yield* resolveTransform(definition, trainingValues, columnIndex);
      regressors.push(Object.freeze({ definition, transform }));
    }

    const frozenRegressors = Object.freeze(regressors);
    const features = yield* makeFeatures(frozenRegressors, trainingValues);

    return Object.freeze({ regressors: frozenRegressors, features });
  });

/** Apply stored training transforms to aligned prediction regressor values. */
export const createRegressorFeatures = (
  regressors: ReadonlyArray<ResolvedRegressor>,
  values: ReadonlyArray<ReadonlyArray<number>>,
): Effect.Effect<KnownAdditiveFeatures, RegressorFeatureError> => makeFeatures(regressors, values);
