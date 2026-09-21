import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  InvalidRegressors,
  parseRegressorDefinitions,
  projectRegressorCoefficient,
} from "../src/regressor";

describe("regressor domain", () => {
  it("parses ordered definitions and applies defaults", async () => {
    const definitions = await Effect.runPromise(
      parseRegressorDefinitions([
        { name: "price" },
        { name: "promotion", priorScale: 2, standardization: "never" },
      ]),
    );

    expect(definitions).toEqual([
      { name: "price", priorScale: 10, standardization: "auto" },
      { name: "promotion", priorScale: 2, standardization: "never" },
    ]);
    expect(Object.isFrozen(definitions)).toBe(true);
    expect(Object.isFrozen(definitions[0])).toBe(true);
  });

  it("rejects duplicates, reserved names, nonpositive priors, and unknown fields", async () => {
    for (const input of [
      [{ name: "price" }, { name: "price" }],
      [{ name: "trend" }],
      [{ name: "price", priorScale: 0 }],
      [{ name: "price", mode: "additive" }],
    ]) {
      const error = await Effect.runPromise(Effect.flip(parseRegressorDefinitions(input)));

      expect(error).toBeInstanceOf(InvalidRegressors);
    }
  });

  it("projects transformed coefficients into original units", () => {
    const [definition] = Effect.runSync(
      parseRegressorDefinitions([{ name: "price", priorScale: 10, standardization: "always" }]),
    );

    if (definition === undefined) {
      throw new Error("Expected one parsed regressor definition");
    }

    expect(
      projectRegressorCoefficient({
        definition,
        transform: { mode: "standardized", mean: 12, sampleStandardDeviation: 4 },
        coefficient: 6,
      }),
    ).toEqual({ name: "price", coefficient: 1.5, center: 12 });
  });
});
