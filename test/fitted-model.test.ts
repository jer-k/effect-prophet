import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { emptyEventCalendar } from "../src/event";
import {
  InvalidFittedModel,
  parseFittedModel,
  parseFlatMapModel,
  parseLinearModel,
  parsePiecewiseMapModel,
  type FlatMapParameters,
  type LinearParameters,
  type PiecewiseMapParameters,
} from "../src/fitted-model";
import { makeSeasonalityLayout, parseSeasonalities } from "../src/seasonality";

const linearParameters: LinearParameters = {
  model: "linear-trend",
  intercept: 2,
  slope: 6,
  timeOrigin: 1_704_067_200_000,
  timeScale: 2_000,
};

const validFlatMapParameters = async (): Promise<FlatMapParameters> => {
  const definitions = await Effect.runPromise(
    parseSeasonalities([{ name: "custom-day", periodDays: 1, fourierOrder: 1 }]),
  );

  const seasonalities = await Effect.runPromise(makeSeasonalityLayout(definitions));

  return {
    model: "flat-map",
    targetScaling: { mode: "absmax", offset: 0, scale: 3 },
    level: 2,
    seasonalities,
    coefficients: [1, 0],
    noiseScale: 0.25,
    fitSummary: {
      method: "flat-map-coordinate-v1",
      termination: "converged",
      valueScale: 3,
      observationCount: 6,
      iterations: 5,
      objective: -2,
      stationarityResidual: 1e-12,
    },
  };
};

const validPiecewiseMapParameters = async (): Promise<PiecewiseMapParameters> => {
  const definitions = await Effect.runPromise(parseSeasonalities([]));
  const seasonalities = await Effect.runPromise(makeSeasonalityLayout(definitions));

  return {
    model: "linear-piecewise-map",
    targetScaling: { mode: "absmax", offset: 0, scale: 3 },
    intercept: 1,
    slope: 2,
    timeOrigin: 1_704_067_200_000,
    timeScale: 172_800_000,
    changepointTimestamps: [1_704_153_600_000],
    deltas: [-1],
    seasonalities,
    coefficients: [],
    events: emptyEventCalendar,
    eventCoefficients: [],
    regressors: [],
    noiseScale: 0.1,
    fitSummary: {
      method: "piecewise-map-coordinate-v1",
      termination: "converged",
      valueScale: 3,
      observationCount: 4,
      iterations: 20,
      objective: -2,
      stationarityResidual: 1e-6,
      changepointPriorScale: 0.05,
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

  return error;
};

describe("fitted model domain", () => {
  it("parses and freezes linear state", async () => {
    const input = { ...linearParameters };
    const model = await Effect.runPromise(parseLinearModel(input));

    expect(model).toEqual(linearParameters);
    expect(model).not.toBe(input);
    expect(Object.isFrozen(model)).toBe(true);
  });

  it("parses and freezes complete piecewise MAP state", async () => {
    const parameters = await validPiecewiseMapParameters();
    const model = await Effect.runPromise(parsePiecewiseMapModel(parameters));

    expect(model).toEqual(parameters);
    expect(Object.isFrozen(model)).toBe(true);
    expect(Object.isFrozen(model.changepointTimestamps)).toBe(true);
    expect(Object.isFrozen(model.deltas)).toBe(true);
    expect(Object.isFrozen(model.targetScaling)).toBe(true);
  });

  it("rejects inconsistent piecewise MAP state", async () => {
    const parameters = await validPiecewiseMapParameters();

    await expectInvalidModel(parsePiecewiseMapModel({ ...parameters, deltas: [] }), "deltas");
    await expectInvalidModel(
      parsePiecewiseMapModel({
        ...parameters,
        changepointTimestamps: [parameters.timeOrigin - 1],
      }),
      "changepointTimestamps",
    );
    await expectInvalidModel(
      parsePiecewiseMapModel({
        ...parameters,
        targetScaling: { ...parameters.targetScaling, scale: 2 },
      }),
      "targetScaling",
    );
  });

  it("rejects unrecognized model tags", async () => {
    await expectInvalidModel(parseFittedModel({ ...linearParameters, model: "seasonal" }), "model");
  });

  it("includes flat and piecewise MAP models in the fitted union", async () => {
    const flat = await Effect.runPromise(parseFlatMapModel(await validFlatMapParameters()));

    const piecewise = await Effect.runPromise(
      parseFittedModel(await validPiecewiseMapParameters()),
    );

    expect(flat.model).toBe("flat-map");
    expect(piecewise.model).toBe("linear-piecewise-map");
  });

  it("rejects invalid flat MAP coefficient state", async () => {
    const parameters = await validFlatMapParameters();

    const error = await Effect.runPromise(
      Effect.flip(parseFlatMapModel({ ...parameters, coefficients: [1] })),
    );

    expect(error).toBeInstanceOf(InvalidFittedModel);

    await expectInvalidModel(
      parseFlatMapModel({
        ...parameters,
        level: Number.MAX_VALUE,
        targetScaling: {
          ...parameters.targetScaling,
          offset: Number.MAX_VALUE,
        },
      }),
      "level",
    );
  });
});
