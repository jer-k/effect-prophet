import { Effect } from "effect";

import { InvalidConditionValues, type ConditionValues } from "../condition";
import type { SeasonalityLayout } from "../seasonality";
import { createSeasonalityMaskMatrix, type SeasonalityMaskMatrix } from "./additional-features";

const invalidConditionValues = (
  path: ReadonlyArray<PropertyKey>,
  message: string,
): InvalidConditionValues =>
  new InvalidConditionValues({
    issues: [{ path, message }],
    message,
  });

/**
 * Build one checked binary mask column per ordered seasonal component.
 *
 * Unconditional components receive ones. Conditional components resolve their named aligned
 * column without changing Fourier coefficient offsets or component order.
 */
export const createSeasonalityMasks = (
  layout: SeasonalityLayout,
  conditions: ConditionValues,
): Effect.Effect<SeasonalityMaskMatrix, InvalidConditionValues> =>
  Effect.gen(function* () {
    const expectedNames: Array<string> = [];
    const expectedSet = new Set<string>();

    for (const component of layout.components) {
      const name = component.definition.conditionName;

      if (name !== undefined && !expectedSet.has(name)) {
        expectedSet.add(name);
        expectedNames.push(name);
      }
    }

    const actualSet = new Set<string>();

    for (const [index, name] of conditions.names.entries()) {
      if (actualSet.has(name)) {
        return yield* Effect.fail(
          invalidConditionValues(["names", index], `Condition name '${name}' is duplicated`),
        );
      }

      actualSet.add(name);

      if (!expectedSet.has(name)) {
        return yield* Effect.fail(
          invalidConditionValues(["names", index], `Unexpected aligned condition '${name}'`),
        );
      }
    }

    for (const name of expectedNames) {
      if (!actualSet.has(name)) {
        return yield* Effect.fail(
          invalidConditionValues(["names", name], `Missing aligned condition '${name}'`),
        );
      }
    }

    const expectedValueCount = conditions.rowCount * conditions.names.length;

    if (
      !Number.isSafeInteger(conditions.rowCount) ||
      conditions.rowCount < 0 ||
      !Number.isSafeInteger(expectedValueCount) ||
      conditions.values.length !== expectedValueCount
    ) {
      return yield* Effect.fail(
        invalidConditionValues(["values"], "Aligned condition dimensions are inconsistent"),
      );
    }

    for (const [index, value] of conditions.values.entries()) {
      if (value !== 0 && value !== 1) {
        return yield* Effect.fail(
          invalidConditionValues(
            ["values", index],
            "Aligned condition values must be exactly zero or one",
          ),
        );
      }
    }

    const maskCount = conditions.rowCount * layout.components.length;

    if (!Number.isSafeInteger(maskCount)) {
      return yield* Effect.fail(
        invalidConditionValues([], "Seasonality mask dimensions exceed safe integer arithmetic"),
      );
    }

    const conditionIndexes = new Map<string, number>(
      conditions.names.map((name, index) => [name, index]),
    );

    const values = new Uint8Array(maskCount);

    for (let row = 0; row < conditions.rowCount; row += 1) {
      for (const [componentIndex, component] of layout.components.entries()) {
        const conditionName = component.definition.conditionName;
        const maskIndex = row * layout.components.length + componentIndex;

        if (conditionName === undefined) {
          values[maskIndex] = 1;
          continue;
        }

        const conditionIndex = conditionIndexes.get(conditionName);

        if (conditionIndex === undefined) {
          return yield* Effect.fail(
            invalidConditionValues(
              ["names", conditionName],
              `Missing aligned condition '${conditionName}'`,
            ),
          );
        }

        values[maskIndex] = conditions.values[row * conditions.names.length + conditionIndex] ?? 0;
      }
    }

    return yield* createSeasonalityMaskMatrix(
      conditions.rowCount,
      layout.components.length,
      values,
    ).pipe(Effect.mapError((error) => invalidConditionValues(error.path, error.message)));
  });
