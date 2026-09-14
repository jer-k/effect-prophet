import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  InvalidFittedModel,
  parseFittedModel,
  parseLinearModel,
  type FittedLinearProphet,
  type LinearParameters,
} from "../src/fitted-model";

const linearParameters: LinearParameters = {
  model: "linear-trend",
  intercept: 2,
  slope: 6,
  timeOrigin: 1_704_067_200_000,
  timeScale: 2_000,
};

const expectInvalidModel = async (
  parsing: ReturnType<typeof parseFittedModel>,
  expectedPathSegment: PropertyKey,
): Promise<InvalidFittedModel> => {
  const error = await Effect.runPromise(Effect.flip(parsing));

  expect(error).toBeInstanceOf(InvalidFittedModel);
  expect(error.issues.some((issue) => issue.path?.includes(expectedPathSegment))).toBe(true);
  expect(error.message.length).toBeGreaterThan(0);

  return error;
};

describe("fitted model domain", () => {
  it("parses valid linear parameters into a fresh frozen model", async () => {
    const input = { ...linearParameters };
    const model = await Effect.runPromise(parseLinearModel(input));

    expect(model).toEqual(linearParameters);
    expect(model).not.toBe(input);
    expect(Object.isFrozen(model)).toBe(true);

    input.intercept = 100;

    expect(model.intercept).toBe(2);
  });

  it("parses valid constant parameters into a fresh frozen model", async () => {
    const input = {
      model: "constant-mean-baseline" as const,
      level: 5,
    };

    const model = await Effect.runPromise(parseFittedModel(input));

    expect(model).toEqual(input);
    expect(model).not.toBe(input);
    expect(Object.isFrozen(model)).toBe(true);

    input.level = 100;

    if (model.model !== "constant-mean-baseline") {
      throw new Error("Expected the constant-mean fitted model");
    }

    expect(model.level).toBe(5);
  });

  it.each([
    ["intercept", Number.NaN],
    ["intercept", Number.POSITIVE_INFINITY],
    ["intercept", Number.NEGATIVE_INFINITY],
    ["slope", Number.NaN],
    ["slope", Number.POSITIVE_INFINITY],
    ["slope", Number.NEGATIVE_INFINITY],
    ["timeOrigin", Number.NaN],
    ["timeOrigin", Number.POSITIVE_INFINITY],
    ["timeOrigin", Number.NEGATIVE_INFINITY],
    ["timeScale", Number.NaN],
    ["timeScale", Number.POSITIVE_INFINITY],
    ["timeScale", Number.NEGATIVE_INFINITY],
  ] as const)("rejects a non-finite linear %s of %s", async (field, value) => {
    await expectInvalidModel(
      parseFittedModel({
        ...linearParameters,
        [field]: value,
      }),
      field,
    );
  });

  it.each([0, -1])("rejects a non-positive linear scale of %s", async (timeScale) => {
    await expectInvalidModel(
      parseFittedModel({
        ...linearParameters,
        timeScale,
      }),
      "timeScale",
    );
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "rejects a non-finite constant level of %s",
    async (level) => {
      await expectInvalidModel(
        parseFittedModel({
          model: "constant-mean-baseline",
          level,
        }),
        "level",
      );
    },
  );

  it("rejects unrecognized model tags with a structured path", async () => {
    await expectInvalidModel(parseFittedModel({ ...linearParameters, model: "seasonal" }), "model");
  });

  it("rejects missing fields with a structured path", async () => {
    const { slope: _slope, ...incomplete } = linearParameters;

    await expectInvalidModel(parseFittedModel(incomplete), "slope");
  });

  it("requires parsing before a raw parameter record is trusted", () => {
    const requiresTrustedModel = (_model: FittedLinearProphet): void => undefined;

    // @ts-expect-error -- Raw backend parameters do not carry the fitted-model brand.
    requiresTrustedModel(linearParameters);
  });
});
