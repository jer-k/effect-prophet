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
      { name: "price", priorScale: 10, standardization: "auto", mode: "additive" },
      { name: "promotion", priorScale: 2, standardization: "never", mode: "additive" },
    ]);
    expect(Object.isFrozen(definitions)).toBe(true);
    expect(Object.isFrozen(definitions[0])).toBe(true);
  });

  it("rejects duplicates, reserved names, nonpositive priors, and unknown fields", async () => {
    for (const input of [
      [{ name: "price" }, { name: "price" }],
      [{ name: "trend" }],
      [{ name: "price", priorScale: 0 }],
      [{ name: "price", unexpected: true }],
    ]) {
      const error = await Effect.runPromise(Effect.flip(parseRegressorDefinitions(input)));

      expect(error).toBeInstanceOf(InvalidRegressors);
    }
  });

  it("projects transformed coefficients into original mode-correct units", () => {
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
    ).toEqual({ name: "price", mode: "additive", coefficient: 1.5, center: 12 });

    const [multiplicative] = Effect.runSync(
      parseRegressorDefinitions([
        { name: "relative-price", mode: "multiplicative", standardization: "always" },
      ]),
    );

    if (multiplicative === undefined) {
      throw new Error("Expected one parsed multiplicative regressor definition");
    }

    expect(
      projectRegressorCoefficient({
        definition: multiplicative,
        transform: { mode: "standardized", mean: 20, sampleStandardDeviation: 5 },
        coefficient: 0.25,
      }),
    ).toEqual({
      name: "relative-price",
      mode: "multiplicative",
      coefficient: 0.05,
      center: 20,
    });
  });
});
