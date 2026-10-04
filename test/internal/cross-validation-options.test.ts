import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { InputValidationError } from "../../src/errors";
import {
  crossValidationFitOptions,
  parseCrossValidationInput,
} from "../../src/internal/cross-validation-options";
import { decodeOptions } from "../../src/options";
import { builtInSeasonalitiesOff } from "../helpers/built-in-seasonalities";

describe("cross-validation controls", () => {
  it("parses omitted and scaling-only point controls", async () => {
    expect(await Effect.runPromise(parseCrossValidationInput())).toEqual({
      mode: "point",
    });

    const controls = await Effect.runPromise(parseCrossValidationInput({ scaling: "minmax" }));

    expect(controls).toEqual({ mode: "point", scaling: "minmax" });
    expect(Object.isFrozen(controls)).toBe(true);
  });

  it("shares seeded interval defaults while retaining an explicit scaling policy", async () => {
    const controls = await Effect.runPromise(
      parseCrossValidationInput({
        mode: "intervals",
        scaling: "minmax",
        uncertainty: { seed: 42 },
      }),
    );

    expect(controls).toEqual({
      mode: "intervals",
      scaling: "minmax",
      uncertainty: { seed: 42, samples: 1_000, intervalWidth: 0.8 },
      uncertaintyOptions: {
        seed: 42,
        samples: 1_000,
        intervalWidth: 0.8,
        output: "intervals",
      },
    });

    if (controls.mode !== "intervals") {
      throw new Error("Expected parsed interval controls");
    }

    expect(Object.isFrozen(controls)).toBe(true);
    expect(Object.isFrozen(controls.uncertainty)).toBe(true);
  });

  it("resolves MAP scaling independently of the original fit options without mutation", async () => {
    const input = { growth: "flat", scaling: "minmax" } as const;
    const options = await Effect.runPromise(decodeOptions(input));

    const resolved = crossValidationFitOptions(input, options, {});

    expect(resolved).toEqual({ growth: "flat", scaling: "absmax" });
    expect(Object.isFrozen(resolved)).toBe(true);
    expect(crossValidationFitOptions(input, options, { scaling: "minmax" })).toEqual(input);
    expect(input).toEqual({ growth: "flat", scaling: "minmax" });
  });

  it("keeps featureless OLS unconfigured unless scaling is explicitly selected", async () => {
    const input = { builtInSeasonalities: builtInSeasonalitiesOff };
    const options = await Effect.runPromise(decodeOptions(input));

    expect(crossValidationFitOptions(input, options, {})).toBe(input);
    expect(crossValidationFitOptions(input, options, { scaling: "absmax" })).toEqual({
      ...input,
      scaling: "absmax",
    });
  });

  it.each([
    ['{"scaling":"auto"}', "evaluation-plan"],
    ['{"mode":"point","uncertainty":{"seed":1}}', "evaluation-plan"],
    ['{"mode":"intervals","uncertainty":{}}', "uncertainty-options"],
    ['{"mode":"intervals","uncertainty":{"seed":1,"output":"samples"}}', "uncertainty-options"],
  ])("rejects malformed controls %s with a typed %s error", async (json, input) => {
    const error = await Effect.runPromise(Effect.flip(parseCrossValidationInput(JSON.parse(json))));

    expect(error).toBeInstanceOf(InputValidationError);
    expect(error.input).toBe(input);
  });
});
