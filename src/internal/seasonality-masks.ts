import { Effect } from "effect";

import {
  invalidConditionValues as makeInvalidConditionValues,
  type ConditionValues,
  type InvalidConditionValues,
} from "../condition";
import type { SeasonalityLayout } from "../seasonality";
import { createSeasonalityMaskMatrix, type SeasonalityMaskMatrix } from "./additional-features";
import { checkedElementCount } from "./safe-arithmetic";

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
          makeInvalidConditionValues(
            [{ path: ["names", index], message: `Condition name '${name}' is duplicated` }],
            `Condition name '${name}' is duplicated`,
          ),
        );
      }

      actualSet.add(name);

      if (!expectedSet.has(name)) {
        return yield* Effect.fail(
          makeInvalidConditionValues(
            [{ path: ["names", index], message: `Unexpected aligned condition '${name}'` }],
            `Unexpected aligned condition '${name}'`,
          ),
        );
      }
    }

    for (const name of expectedNames) {
      if (!actualSet.has(name)) {
        return yield* Effect.fail(
          makeInvalidConditionValues(
            [{ path: ["names", name], message: `Missing aligned condition '${name}'` }],
            `Missing aligned condition '${name}'`,
          ),
        );
      }
    }

    const expectedValueCount = checkedElementCount(conditions.rowCount, conditions.names.length);

    if (expectedValueCount === undefined || conditions.values.length !== expectedValueCount) {
      return yield* Effect.fail(
        makeInvalidConditionValues(
          [{ path: ["values"], message: "Aligned condition dimensions are inconsistent" }],
          "Aligned condition dimensions are inconsistent",
        ),
      );
    }

    for (const [index, value] of conditions.values.entries()) {
      if (value !== 0 && value !== 1) {
        return yield* Effect.fail(
          makeInvalidConditionValues(
            [
              {
                path: ["values", index],
                message: "Aligned condition values must be exactly zero or one",
              },
            ],
            "Aligned condition values must be exactly zero or one",
          ),
        );
      }
    }

    const maskCount = checkedElementCount(conditions.rowCount, layout.components.length);

    if (maskCount === undefined) {
      return yield* Effect.fail(
        makeInvalidConditionValues(
          [{ path: [], message: "Seasonality mask dimensions exceed safe integer arithmetic" }],
          "Seasonality mask dimensions exceed safe integer arithmetic",
        ),
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
            makeInvalidConditionValues(
              [
                {
                  path: ["names", conditionName],
                  message: `Missing aligned condition '${conditionName}'`,
                },
              ],
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
    ).pipe(
      Effect.mapError((error) =>
        makeInvalidConditionValues([{ path: error.path, message: error.message }], error.message),
      ),
    );
  });
