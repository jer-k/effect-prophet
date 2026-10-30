import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  ModelSerializationError,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predict,
  prophetFittingBackendLayer,
  warmStartParameters,
  type EncodedFittedModel,
  type EncodedProphetOptions,
  type FittedPiecewiseMapProphet,
} from "../src/index";
import { fixedPiecewiseModel as fittedModel } from "./helpers/fixed-piecewise-model";

const encodedModel: EncodedFittedModel = Effect.runSync(encodeFittedModel(fittedModel));

const expectDecodeFailure = async (decoding: ReturnType<typeof decodeFittedModel>) => {
  const error = await Effect.runPromise(Effect.flip(decoding));

  expect(error).toBeInstanceOf(ModelSerializationError);
  expect(error.operation).toBe("decode");
};

describe("fitted model serialization", () => {
  it("round-trips a featureless MAP model through JSON", async () => {
    const encoded = await Effect.runPromise(encodeFittedModel(fittedModel));
    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));

    expect(encoded).toEqual(encodedModel);
    expect(decoded).toEqual(fittedModel);
  });

  it("round-trips a linear MAP model with resolved seasonal metadata", async () => {
    const model = await Effect.runPromise(
      fit(
        [
          { timestamp: "1970-01-01T00:00:00.000Z", value: 1 },
          { timestamp: "1970-01-01T06:00:00.000Z", value: 3 },
          { timestamp: "1970-01-01T12:00:00.000Z", value: 1 },
          { timestamp: "1970-01-01T18:00:00.000Z", value: -1 },
          { timestamp: "1970-01-02T00:00:00.000Z", value: 1 },
        ],
        {
          map: { changepoints: { mode: "explicit", timestamps: [] } },
          seasonalities: [{ name: "daily-custom", periodDays: 1, fourierOrder: 1 }],
        },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-piecewise-map");

    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));
    const timestamps = ["1970-01-01T06:00:00.000Z", "1970-01-03T06:00:00.000Z"] as const;

    expect(decoded).toEqual(model);
    expect(await Effect.runPromise(predict(decoded, timestamps))).toEqual(
      await Effect.runPromise(predict(model, timestamps)),
    );

    if (encoded.modelKind !== "linear-piecewise-map") {
      throw new Error("Expected an encoded linear MAP model");
    }

    const { targetScaling: _omitted, ...legacy } = encoded;
    const restoredLegacy = await Effect.runPromise(decodeFittedModel(legacy));

    if (restoredLegacy.model !== "linear-piecewise-map") {
      throw new Error("Expected restored linear MAP state");
    }

    expect(restoredLegacy.targetScaling).toEqual({
      mode: "absmax",
      offset: 0,
      scale: restoredLegacy.fitSummary.valueScale,
    });
    expect(await Effect.runPromise(predict(restoredLegacy, timestamps))).toEqual(
      await Effect.runPromise(predict(model, timestamps)),
    );
  });

  it("stores global prior scales only as resolved component priors", async () => {
    const day = 86_400_000;
    const start = Date.UTC(2024, 5, 20);

    const observations = Array.from({ length: 30 }, (_, index) => ({
      timestamp: new Date(start + index * day).toISOString(),
      value: 20 + 0.1 * index + Math.sin(index) + (index === 14 ? 2 : 0),
      regressors: { promotion: index % 3 },
    }));

    const fitWith = (options: EncodedProphetOptions) =>
      Effect.runPromise(
        fit(observations, options).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

    const common = {
      map: { changepoints: { mode: "explicit", timestamps: [] } },
      builtInSeasonalities: { daily: "off", yearly: "off" },
    } as const;

    const globals = await fitWith({
      ...common,
      seasonalityPriorScale: 0.5,
      holidaysPriorScale: 0.25,
      countryHolidays: { country: "US" },
      seasonalities: [{ name: "three-day", periodDays: 3, fourierOrder: 1 }],
      events: [{ name: "launch", date: "2024-07-04" }],
      regressors: [{ name: "promotion" }],
    });

    // Every prior written out, except automatic weekly's, which only the global value can set.
    const explicit = await fitWith({
      ...common,
      seasonalityPriorScale: 0.5,
      countryHolidays: { country: "US", priorScale: 0.25 },
      seasonalities: [{ name: "three-day", periodDays: 3, fourierOrder: 1, priorScale: 0.5 }],
      events: [{ name: "launch", date: "2024-07-04", priorScale: 0.25 }],
      regressors: [{ name: "promotion", priorScale: 0.25 }],
    });

    const encoded = await Effect.runPromise(encodeFittedModel(globals));

    expect(encoded).toEqual(await Effect.runPromise(encodeFittedModel(explicit)));

    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));

    const rows = [
      { timestamp: "2024-07-20T00:00:00.000Z", regressors: { promotion: 1 } },
      { timestamp: "2025-07-04T00:00:00.000Z", regressors: { promotion: 2 } },
    ];

    expect(decoded).toEqual(globals);
    expect(await Effect.runPromise(predict(decoded, rows))).toEqual(
      await Effect.runPromise(predict(globals, rows)),
    );

    const warm = await fitWith({
      ...common,
      seasonalityPriorScale: 0.5,
      holidaysPriorScale: 0.25,
      countryHolidays: { country: "US" },
      seasonalities: [{ name: "three-day", periodDays: 3, fourierOrder: 1 }],
      events: [{ name: "launch", date: "2024-07-04" }],
      regressors: [{ name: "promotion" }],
      map: { ...common.map, warmStart: warmStartParameters(decoded) },
    });

    expect(warm.events).toEqual(globals.events);
  });

  it("decodes legacy MAP payloads with their historical absmax scale", async () => {
    const model = await Effect.runPromise(
      fit(
        [
          { timestamp: "1970-01-01T00:00:00.000Z", value: 1 },
          { timestamp: "1970-01-02T00:00:00.000Z", value: 2 },
          { timestamp: "1970-01-03T00:00:00.000Z", value: 1.5 },
        ],
        { growth: "flat" },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const encoded = await Effect.runPromise(encodeFittedModel(model));

    if (encoded.modelKind !== "flat-map") {
      throw new Error("Expected an encoded flat MAP model");
    }

    const { targetScaling: _omitted, ...legacy } = encoded;
    const restored = await Effect.runPromise(decodeFittedModel(legacy));

    if (restored.model !== "flat-map") {
      throw new Error("Expected a restored flat MAP model");
    }

    expect(restored.targetScaling).toEqual({
      mode: "absmax",
      offset: 0,
      scale: restored.fitSummary.valueScale,
    });
  });

  it("rejects removed OLS payloads without fitting", async () => {
    await expectDecodeFailure(
      decodeFittedModel({
        modelKind: "linear-trend",
        coefficients: { intercept: 2, slope: 6 },
        timeScaling: { origin: 1_704_067_200_000, scale: 2_000 },
      }),
    );
  });

  it("rejects former additive ridge payloads without fitting", async () => {
    await expectDecodeFailure(
      decodeFittedModel({
        modelKind: "linear-additive-ridge",
        coefficients: { intercept: 1, slope: 2, seasonal: [] },
        timeScaling: { origin: 0, scale: 86_400_000 },
        seasonalities: [],
        fitSummary: {
          method: "normalized-ridge-v1",
          valueScale: 1,
          observationCount: 2,
          numericalRank: 2,
          normalizedResidualSumSquares: 0,
          penalizedObjective: 0,
        },
      }),
    );
  });

  it("serializes only portable prediction state", async () => {
    const modelWithBackendState: FittedPiecewiseMapProphet & {
      readonly backend: "wasm";
      readonly handle: object;
    } = { ...fittedModel, backend: "wasm", handle: {} };

    const encoded = await Effect.runPromise(encodeFittedModel(modelWithBackendState));

    expect(encoded).toEqual(encodedModel);
  });

  it("decodes regressor models and reports their issues under the regressor model's path", async () => {
    const model = await Effect.runPromise(
      fit(
        Array.from({ length: 12 }, (_, index) => ({
          timestamp: new Date(Date.UTC(2025, 0, index + 1)).toISOString(),
          value: 5 + index + (index % 3),
          regressors: { price: 2 + Math.sin(index) },
        })),
        { regressors: [{ name: "price", predictor: true }] },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const [regressorModel] = encoded.regressorModels ?? [];

    expect(regressorModel?.model.modelKind).toBe("linear-piecewise-map");
    expect(await Effect.runPromise(decodeFittedModel(encoded))).toEqual(model);

    if (regressorModel === undefined || regressorModel.model.modelKind !== "linear-piecewise-map") {
      throw new Error("Expected a linear regressor model");
    }

    const error = await Effect.runPromise(
      Effect.flip(
        decodeFittedModel({
          ...encoded,
          regressorModels: [
            {
              ...regressorModel,
              model: { ...regressorModel.model, timeScaling: { origin: 0, scale: -1 } },
            },
          ],
        }),
      ),
    );

    expect(error).toBeInstanceOf(ModelSerializationError);
    expect(error.issues[0]?.path?.slice(0, 3)).toEqual(["regressorModels", 0, "model"]);

    await expectDecodeFailure(
      decodeFittedModel({ ...encoded, regressorModels: [{ ...regressorModel, name: "other" }] }),
    );
  });

  it("omits regressor models from payloads without them", async () => {
    expect(Object.hasOwn(encodedModel, "regressorModels")).toBe(false);
  });
});
