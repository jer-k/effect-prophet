import { Effect, Schema } from "effect";

import { ValidationIssueSchema, type ValidationInput, type ValidationIssue } from "./errors";
import type { FeatureName } from "./feature-name";
import type { SeasonalityDefinition, SeasonalityLayout } from "./seasonality";

/** A row that may carry named boolean seasonality conditions. */
export interface ConditionRow {
  readonly conditions?: Readonly<Record<string, boolean>>;
}

/** Owned aligned boolean values in row-major condition-name order. */
export interface ConditionValues {
  readonly names: ReadonlyArray<FeatureName>;
  readonly rowCount: number;
  readonly values: Uint8Array;
}

/** Failure to align or construct strict boolean condition values. */
export class InvalidConditionValues extends Schema.TaggedError<InvalidConditionValues>()(
  "InvalidConditionValues",
  {
    issues: Schema.Array(ValidationIssueSchema),
    message: Schema.String,
  },
) {}

const checkedElementCount = (rows: number, columns: number): number | undefined => {
  if (!Number.isSafeInteger(rows) || rows < 0 || !Number.isSafeInteger(columns) || columns < 0) {
    return undefined;
  }

  const count = rows * columns;

  return Number.isSafeInteger(count) ? count : undefined;
};

const invalidConditionValues = (
  issues: ReadonlyArray<ValidationIssue>,
  message: string,
): InvalidConditionValues => new InvalidConditionValues({ issues, message });

/** Return distinct configured condition names in first-seasonality order. */
export const conditionNamesFromDefinitions = (
  definitions: ReadonlyArray<SeasonalityDefinition>,
): ReadonlyArray<FeatureName> => {
  const seen = new Set<string>();
  const names: Array<FeatureName> = [];

  for (const definition of definitions) {
    const name = definition.conditionName;

    if (name !== undefined && !seen.has(name)) {
      seen.add(name);
      names.push(name);
    }
  }

  return Object.freeze(names);
};

/** Return distinct configured condition names from a resolved seasonal layout. */
export const conditionNamesFromLayout = (layout: SeasonalityLayout): ReadonlyArray<FeatureName> =>
  conditionNamesFromDefinitions(layout.components.map((component) => component.definition));

/** Construct checked, owned row-major binary condition values. */
export const makeConditionValues = (
  names: ReadonlyArray<FeatureName>,
  rowCount: number,
  values: ArrayLike<number>,
): Effect.Effect<ConditionValues, InvalidConditionValues> => {
  const expectedLength = checkedElementCount(rowCount, names.length);

  if (expectedLength === undefined) {
    return Effect.fail(
      invalidConditionValues([], "Condition value dimensions exceed safe integer arithmetic"),
    );
  }

  const seen = new Set<string>();

  for (const [index, name] of names.entries()) {
    if (seen.has(name)) {
      return Effect.fail(
        invalidConditionValues(
          [{ path: ["names", index], message: `Condition name '${name}' is duplicated` }],
          "Condition names must be unique",
        ),
      );
    }

    seen.add(name);
  }

  if (values.length !== expectedLength) {
    return Effect.fail(
      invalidConditionValues(
        [
          {
            path: ["values"],
            message: `Expected exactly ${expectedLength} aligned condition values`,
          },
        ],
        "Condition values do not match their declared dimensions",
      ),
    );
  }

  const owned = new Uint8Array(expectedLength);

  for (let index = 0; index < expectedLength; index += 1) {
    const value = values[index];

    if (value !== 0 && value !== 1) {
      return Effect.fail(
        invalidConditionValues(
          [{ path: ["values", index], message: "Condition values must be exactly zero or one" }],
          "Condition values must be binary",
        ),
      );
    }

    owned[index] = value;
  }

  return Effect.succeed(
    Object.freeze({
      names: Object.freeze(Array.from(names)),
      rowCount,
      values: owned,
    }),
  );
};

/**
 * Align strict boolean row maps to the configured condition-name order.
 *
 * Every row must provide exactly the configured set. Omitted maps are equivalent to empty maps
 * only when no conditions are configured. Values have already passed structural boolean parsing;
 * this operation performs no truthiness coercion.
 */
export const alignConditionValues = (
  rows: ReadonlyArray<ConditionRow>,
  names: ReadonlyArray<FeatureName>,
  input: Extract<ValidationInput, "observations" | "prediction-rows">,
): Effect.Effect<ConditionValues, InvalidConditionValues> => {
  const expectedNames = new Set<string>(names);
  const elementCount = checkedElementCount(rows.length, names.length);

  if (elementCount === undefined) {
    return Effect.fail(
      invalidConditionValues([], "Condition value dimensions exceed safe integer arithmetic"),
    );
  }

  const values = new Uint8Array(elementCount);
  const issues: Array<ValidationIssue> = [];

  for (const [rowIndex, row] of rows.entries()) {
    const provided = row.conditions;

    for (const [conditionIndex, name] of names.entries()) {
      if (provided === undefined || !Object.hasOwn(provided, name)) {
        issues.push({
          path: [rowIndex, "conditions", name],
          message: `Missing required condition '${name}'`,
        });

        continue;
      }

      const value = provided[name];

      if (value === undefined) {
        issues.push({
          path: [rowIndex, "conditions", name],
          message: `Missing required condition '${name}'`,
        });
      } else {
        values[rowIndex * names.length + conditionIndex] = value ? 1 : 0;
      }
    }

    if (provided !== undefined) {
      for (const name of Object.keys(provided)) {
        if (!expectedNames.has(name)) {
          issues.push({
            path: [rowIndex, "conditions", name],
            message: `Unexpected condition '${name}'`,
          });
        }
      }
    }
  }

  if (issues.length > 0) {
    return Effect.fail(
      invalidConditionValues(
        issues,
        `Condition values must exactly match the fitted condition names for ${input}`,
      ),
    );
  }

  return makeConditionValues(names, rows.length, values);
};
