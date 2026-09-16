import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  InvalidFittedModel,
  parseFittedModel,
  parseLinearAdditiveModel,
  parseLinearModel,
  type FittedLinearAdditiveProphet,
  type FittedLinearProphet,
  type LinearAdditiveParameters,
  type LinearParameters,
} from "../src/fitted-model";
import { makeSeasonalityLayout, parseSeasonalities } from "../src/seasonality";

const linearParameters: LinearParameters = {
  model: "linear-trend",
  intercept: 2,
  slope: 6,
  timeOrigin: 1_704_067_200_000,
  timeScale: 2_000,
};

const validLinearAdditiveParameters = async (): Promise<LinearAdditiveParameters> => {
  const definitions = await Effect.runPromise(
    parseSeasonalities([{ name: "custom-week", periodDays: 7, fourierOrder: 1 }]),
  );

  const seasonalities = await Effect.runPromise(makeSeasonalityLayout(definitions));

  return {
    model: "linear-additive-ridge",
    intercept: 2,
    slope: 6,
    timeOrigin: 1_704_067_200_000,
    timeScale: 2_000,
    seasonalities,
    coefficients: [0.25, -0.5],
    fitSummary: {
      method: "normalized-ridge-v1",
      valueScale: 8,
      observationCount: 12,
      numericalRank: 4,
      normalizedResidualSumSquares: 0.125,
      penalizedObjective: 0.25,
    },
  };
};

const expectInvalidModel = async (
  parsing: Effect.Effect<unknown, InvalidFittedModel>,
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

  it("parses complete additive state with full-rank diagnostics", async () => {
    const parameters = await validLinearAdditiveParameters();
    const model = await Effect.runPromise(parseLinearAdditiveModel(parameters));

    expect(model).toEqual(parameters);
    expect(model).not.toBe(parameters);
    expect(Object.isFrozen(model)).toBe(true);
  });

  it("deeply clones and freezes all additive state", async () => {
    const definition = {
      name: "custom-week",
      periodDays: 7,
      fourierOrder: 1,
      priorScale: 10,
    };

    const component = {
      definition,
      coefficientOffset: 0,
      coefficientCount: 2,
    };

    const components = [component];
    const seasonalities = { components, coefficientCount: 2 };
    const coefficients = [0.25, -0.5];

    const fitSummary = {
      method: "normalized-ridge-v1",
      valueScale: 8,
      observationCount: 12,
      numericalRank: 4,
      normalizedResidualSumSquares: 0.125,
      penalizedObjective: 0.25,
    };

    const input = {
      model: "linear-additive-ridge",
      intercept: 2,
      slope: 6,
      timeOrigin: 1_704_067_200_000,
      timeScale: 2_000,
      seasonalities,
      coefficients,
      fitSummary,
    };

    const model = await Effect.runPromise(parseLinearAdditiveModel(input));
    const parsedComponent = model.seasonalities.components[0];

    if (parsedComponent === undefined) {
      throw new Error("Expected one parsed seasonal component");
    }

    expect(model.seasonalities).not.toBe(seasonalities);
    expect(model.seasonalities.components).not.toBe(components);
    expect(parsedComponent).not.toBe(component);
    expect(parsedComponent.definition).not.toBe(definition);
    expect(model.coefficients).not.toBe(coefficients);
    expect(model.fitSummary).not.toBe(fitSummary);

    expect(Object.isFrozen(model.seasonalities)).toBe(true);
    expect(Object.isFrozen(model.seasonalities.components)).toBe(true);
    expect(Object.isFrozen(parsedComponent)).toBe(true);
    expect(Object.isFrozen(parsedComponent.definition)).toBe(true);
    expect(Object.isFrozen(model.coefficients)).toBe(true);
    expect(Object.isFrozen(model.fitSummary)).toBe(true);

    input.intercept = 100;
    definition.name = "changed";
    component.coefficientOffset = 100;
    components.push({ ...component });
    coefficients[0] = 100;
    fitSummary.valueScale = 100;

    expect(model.intercept).toBe(2);
    expect(parsedComponent.definition.name).toBe("custom-week");
    expect(parsedComponent.coefficientOffset).toBe(0);
    expect(model.seasonalities.components).toHaveLength(1);
    expect(model.coefficients[0]).toBe(0.25);
    expect(model.fitSummary.valueScale).toBe(8);
  });

  it.each([
    ["intercept", Number.NaN],
    ["slope", Number.POSITIVE_INFINITY],
    ["timeOrigin", Number.NEGATIVE_INFINITY],
    ["timeScale", 0],
  ] as const)("rejects invalid additive %s state", async (field, value) => {
    const parameters = await validLinearAdditiveParameters();

    await expectInvalidModel(parseLinearAdditiveModel({ ...parameters, [field]: value }), field);
  });

  it("rejects non-finite and misaligned seasonal coefficients", async () => {
    const parameters = await validLinearAdditiveParameters();

    await expectInvalidModel(
      parseLinearAdditiveModel({ ...parameters, coefficients: [Number.NaN, 0] }),
      "coefficients",
    );
    await expectInvalidModel(
      parseLinearAdditiveModel({ ...parameters, coefficients: [0] }),
      "coefficients",
    );
  });

  it("rejects inconsistent persisted seasonality metadata", async () => {
    const parameters = await validLinearAdditiveParameters();
    const component = parameters.seasonalities.components[0];

    if (component === undefined) {
      throw new Error("Expected one seasonal component");
    }

    await expectInvalidModel(
      parseLinearAdditiveModel({
        ...parameters,
        seasonalities: {
          components: [{ ...component, coefficientOffset: 1 }],
          coefficientCount: 2,
        },
      }),
      "coefficientOffset",
    );
  });

  it.each([
    ["method", "other"],
    ["valueScale", 0],
    ["valueScale", Number.POSITIVE_INFINITY],
    ["observationCount", 1],
    ["observationCount", 3.5],
    ["numericalRank", 3],
    ["normalizedResidualSumSquares", -1],
    ["normalizedResidualSumSquares", Number.NaN],
    ["penalizedObjective", -1],
    ["penalizedObjective", Number.POSITIVE_INFINITY],
  ] as const)("rejects invalid additive fit summary %s", async (field, value) => {
    const parameters = await validLinearAdditiveParameters();

    await expectInvalidModel(
      parseLinearAdditiveModel({
        ...parameters,
        fitSummary: { ...parameters.fitSummary, [field]: value },
      }),
      field,
    );
  });

  it("accepts fewer observations than design columns for a full-rank ridge fit", async () => {
    const parameters = await validLinearAdditiveParameters();

    const model = await Effect.runPromise(
      parseLinearAdditiveModel({
        ...parameters,
        fitSummary: { ...parameters.fitSummary, observationCount: 2 },
      }),
    );

    expect(model.fitSummary.observationCount).toBe(2);
    expect(model.fitSummary.numericalRank).toBe(4);
  });

  it("rejects additive design-size overflow without coefficient-sized allocation", async () => {
    const maximumFourierOrder = Math.floor(Number.MAX_SAFE_INTEGER / 2);

    await expectInvalidModel(
      parseLinearAdditiveModel({
        model: "linear-additive-ridge",
        intercept: 0,
        slope: 0,
        timeOrigin: 0,
        timeScale: 1,
        seasonalities: {
          components: [
            {
              definition: {
                name: "huge",
                periodDays: 1,
                fourierOrder: maximumFourierOrder,
                priorScale: 10,
              },
              coefficientOffset: 0,
              coefficientCount: maximumFourierOrder * 2,
            },
          ],
          coefficientCount: maximumFourierOrder * 2,
        },
        coefficients: [],
        fitSummary: {
          method: "normalized-ridge-v1",
          valueScale: 1,
          observationCount: 2,
          numericalRank: 2,
          normalizedResidualSumSquares: 0,
          penalizedObjective: 0,
        },
      }),
      "coefficientCount",
    );
  });

  it("includes deeply immutable additive models in the public fitted-model union", async () => {
    const parameters = await validLinearAdditiveParameters();
    const model = await Effect.runPromise(parseFittedModel(parameters));

    expect(model.model).toBe("linear-additive-ridge");
    expect(Object.isFrozen(model)).toBe(true);

    if (model.model === "linear-additive-ridge") {
      expect(Object.isFrozen(model.coefficients)).toBe(true);
      expect(Object.isFrozen(model.seasonalities)).toBe(true);
      expect(Object.isFrozen(model.fitSummary)).toBe(true);
    }
  });

  it("requires parsing before raw parameter records are trusted", async () => {
    const requiresTrustedLinearModel = (_model: FittedLinearProphet): void => undefined;
    const requiresTrustedAdditiveModel = (_model: FittedLinearAdditiveProphet): void => undefined;
    const additiveParameters = await validLinearAdditiveParameters();

    // @ts-expect-error -- Raw backend parameters do not carry the fitted-model brand.
    requiresTrustedLinearModel(linearParameters);
    // @ts-expect-error -- Raw additive parameters do not carry the fitted-model brand.
    requiresTrustedAdditiveModel(additiveParameters);
  });
});
