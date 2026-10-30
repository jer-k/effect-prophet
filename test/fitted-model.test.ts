import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { emptyEventCalendar, parseEventCalendar } from "../src/event";
import { fit, prophetFittingBackendLayer } from "../src/index";
import {
  InvalidFittedModel,
  parseFittedModel,
  parseFlatMapModel,
  parsePiecewiseMapModel,
  type FlatMapParameters,
  type PiecewiseMapParameters,
} from "../src/fitted-model";
import { makeSeasonalityLayout, parseSeasonalities } from "../src/seasonality";

import { fixedPiecewiseParameters } from "./helpers/fixed-piecewise-model";

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
      method: "piecewise-map-stan-v2",
      termination: "objective-change",
      optimization: {
        algorithm: "newton",
        attemptCount: 1,
        failedAttemptIterations: null,
        hessianResets: 0,
      },
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
  it("rejects the removed ordinary-linear model kind", async () => {
    await expectInvalidModel(
      parseFittedModel({
        model: "linear-trend",
        intercept: 2,
        slope: 6,
        timeOrigin: 0,
        timeScale: 1,
      }),
      "model",
    );
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

  it("returns its own deeply frozen models unchanged and still parses fresh copies", async () => {
    const parameters = await validPiecewiseMapParameters();
    const model = await Effect.runPromise(parsePiecewiseMapModel(parameters));

    // Every nested part is frozen, so a remembered model cannot change after validation.
    expect(Object.isFrozen(model.fitSummary)).toBe(true);

    if (model.fitSummary.method !== "piecewise-map-stan-v2")
      throw new Error("Expected Stan MAP fit summary");

    expect(Object.isFrozen(model.fitSummary.optimization)).toBe(true);
    expect(Object.isFrozen(model.seasonalities.components)).toBe(true);
    expect(await Effect.runPromise(parseFittedModel(model))).toBe(model);
    expect(await Effect.runPromise(parsePiecewiseMapModel(model))).toBe(model);

    // A remembered model of another kind is not accepted by a narrower parser.
    await expectInvalidModel(parseFlatMapModel(model), "model");

    // Copies are new identities, so they receive full validation.
    const copy = await Effect.runPromise(parseFittedModel({ ...model }));

    expect(copy).not.toBe(model);
    expect(copy).toEqual(model);
    await expectInvalidModel(parseFittedModel({ ...model, deltas: [] }), "deltas");
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
    await expectInvalidModel(
      parseFittedModel({ ...fixedPiecewiseParameters, model: "seasonal" }),
      "model",
    );
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

  it("keeps the reduced flat MAP method to features it can represent", async () => {
    const parameters = await validFlatMapParameters();

    const stanSummary = {
      method: "flat-map-stan-v1",
      termination: "objective-change",
      optimization: {
        algorithm: "newton",
        attemptCount: 1,
        failedAttemptIterations: null,
        hessianResets: 0,
      },
      valueScale: 3,
      observationCount: 6,
      iterations: 7,
      objective: -2,
      stationarityResidual: 1e-6,
    } as const;

    const conditionalDefinitions = await Effect.runPromise(
      parseSeasonalities([
        { name: "custom-day", periodDays: 1, fourierOrder: 1, conditionName: "active" },
      ]),
    );

    const conditional = {
      ...parameters,
      seasonalities: await Effect.runPromise(makeSeasonalityLayout(conditionalDefinitions)),
    };

    const events = await Effect.runPromise(
      parseEventCalendar([{ name: "launch", date: "2024-01-03" }]),
    );

    const withEvent = { ...parameters, events, eventCoefficients: [0.5] };

    const requestedStan = await Effect.runPromise(
      parseFlatMapModel({ ...parameters, fitSummary: stanSummary }),
    );

    expect(requestedStan.fitSummary.method).toBe("flat-map-stan-v1");

    await expectInvalidModel(parseFlatMapModel(conditional), "method");
    await expectInvalidModel(parseFlatMapModel(withEvent), "method");

    const conditionalModel = await Effect.runPromise(
      parseFlatMapModel({ ...conditional, fitSummary: stanSummary }),
    );

    const eventModel = await Effect.runPromise(
      parseFlatMapModel({ ...withEvent, fitSummary: stanSummary }),
    );

    expect(conditionalModel.fitSummary.method).toBe("flat-map-stan-v1");
    expect(eventModel.events.layout.components[0]?.mode).toBe("additive");

    await expectInvalidModel(
      parseFlatMapModel({
        ...withEvent,
        fitSummary: {
          ...stanSummary,
          optimization: { ...stanSummary.optimization, algorithm: "lbfgs" },
        },
      }),
      "optimization",
    );
  });

  describe("regressor models", () => {
    const fitWithRegressorModel = () =>
      Effect.runPromise(
        fit(
          Array.from({ length: 12 }, (_, index) => ({
            timestamp: new Date(Date.UTC(2025, 0, index + 1)).toISOString(),
            value: 5 + index + (index % 3),
            regressors: { price: 2 + Math.sin(index), promotion: index % 2 },
          })),
          {
            regressors: [{ name: "price", predictor: true }, { name: "promotion" }],
          },
        ).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

    it("parses fresh copies and freezes the regressor models", async () => {
      const model = await fitWithRegressorModel();
      const parsed = await Effect.runPromise(parseFittedModel(structuredClone(model)));
      const regressorModel = parsed.regressorModels?.[0];

      expect(parsed).toEqual(model);
      expect(Object.isFrozen(regressorModel?.timestamps)).toBe(true);
      expect(Object.isFrozen(regressorModel?.model)).toBe(true);

      if (regressorModel === undefined) {
        throw new Error("Expected a regressor model");
      }

      // Each regressor model is parsed with its main model, so parsing it again returns it.
      expect(await Effect.runPromise(parseFittedModel(regressorModel.model))).toBe(
        regressorModel.model,
      );
    });

    it.each([
      ["an unknown regressor", { name: "other" }, ["regressorModels", 0, "name"]],
      [
        "a regressor without a feature name",
        { name: "promotion " },
        ["regressorModels", 0, "name"],
      ],
      ["misaligned training values", { values: [1, 2] }, ["regressorModels", 0, "values"]],
      [
        "decreasing training timestamps",
        { timestamps: Array.from({ length: 12 }, (_, index) => Date.UTC(2025, 0, 12 - index)) },
        ["regressorModels", 0, "timestamps"],
      ],
      [
        "training timestamps outside the main model's bounds",
        { timestamps: Array.from({ length: 12 }, (_, index) => Date.UTC(2025, 1, index + 1)) },
        ["regressorModels", 0, "timestamps"],
      ],
    ])("rejects %s", async (_, change, path) => {
      const model = await fitWithRegressorModel();
      const [regressorModel] = model.regressorModels ?? [];

      const error = await Effect.runPromise(
        Effect.flip(
          // SAFETY: deliberately inconsistent state, as an untrusted payload could hold.
          parseFittedModel({
            ...model,
            regressorModels: [{ ...regressorModel, ...change }],
          } as never),
        ),
      );

      expect(error).toBeInstanceOf(InvalidFittedModel);
      expect(error.issues.map((issue) => issue.path)).toContainEqual(path);
    });

    it("rejects repeated regressor models and a regressor model with regressors", async () => {
      const model = await fitWithRegressorModel();
      const [regressorModel] = model.regressorModels ?? [];

      if (regressorModel === undefined || model.model === "logistic-piecewise-map") {
        throw new Error("Expected a linear model with a regressor model");
      }

      const { regressorModels: _, ...main } = model;

      for (const regressorModels of [
        [regressorModel, regressorModel],
        [{ ...regressorModel, model: main }],
      ]) {
        const error = await Effect.runPromise(
          // SAFETY: deliberately inconsistent state, as an untrusted payload could hold.
          Effect.flip(parseFittedModel({ ...model, regressorModels } as never)),
        );

        expect(error).toBeInstanceOf(InvalidFittedModel);
      }
    });
  });
});
