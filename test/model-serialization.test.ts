import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  ModelSerializationError,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predict,
  prophetFittingBackendLayer,
  type EncodedFittedModel,
  type FittedLinearProphet,
} from "../src/index";
import { parseLinearModel, type LinearParameters } from "../src/fitted-model";

const fittedParameters: LinearParameters = {
  model: "linear-trend",
  intercept: 2,
  slope: 6,
  timeOrigin: 1_704_067_200_000,
  timeScale: 2_000,
};

const fittedModel = Effect.runSync(parseLinearModel(fittedParameters));

const encodedModel: EncodedFittedModel = {
  modelKind: "linear-trend",
  coefficients: { intercept: 2, slope: 6 },
  timeScaling: { origin: 1_704_067_200_000, scale: 2_000 },
};

const expectDecodeFailure = async (decoding: ReturnType<typeof decodeFittedModel>) => {
  const error = await Effect.runPromise(Effect.flip(decoding));

  expect(error).toBeInstanceOf(ModelSerializationError);
  expect(error.operation).toBe("decode");
};

describe("fitted model serialization", () => {
  it("round-trips an OLS model through JSON", async () => {
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
    const modelWithBackendState: FittedLinearProphet & {
      readonly backend: "wasm";
      readonly handle: object;
    } = { ...fittedModel, backend: "wasm", handle: {} };

    const encoded = await Effect.runPromise(encodeFittedModel(modelWithBackendState));

    expect(encoded).toEqual(encodedModel);
  });
});
