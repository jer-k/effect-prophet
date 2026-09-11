import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  ModelSerializationError,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predict,
  wasmLinearTrendFittingBackendLayer,
  type EncodedFittedModel,
  type FittedLinearProphet,
} from "../src/index";

const fittedModel: FittedLinearProphet = {
  model: "linear-trend",
  intercept: 2,
  slope: 6,
  timeOrigin: 1_704_067_200_000,
  timeScale: 2_000,
};

const encodedModel: EncodedFittedModel = {
  modelKind: "linear-trend",
  coefficients: {
    intercept: 2,
    slope: 6,
  },
  timeScaling: {
    origin: 1_704_067_200_000,
    scale: 2_000,
  },
};

const expectDecodeFailure = async (
  decoding: ReturnType<typeof decodeFittedModel>,
  expectedPathSegment: PropertyKey,
) => {
  const error = await Effect.runPromise(Effect.flip(decoding));

  expect(error).toBeInstanceOf(ModelSerializationError);
  expect(error.operation).toBe("decode");
  expect(error.issues.some((issue) => issue.path?.includes(expectedPathSegment))).toBe(true);
};

describe("fitted model serialization", () => {
  it("round-trips a fitted model through JSON with equivalent predictions", async () => {
    const model = await Effect.runPromise(
      fit([
        { timestamp: "2024-01-01T00:00:00.000Z", value: 2 },
        { timestamp: "2024-01-01T00:00:01.000Z", value: 5 },
        { timestamp: "2024-01-01T00:00:02.000Z", value: 8 },
      ]).pipe(Effect.provide(wasmLinearTrendFittingBackendLayer)),
    );

    if (model.model !== "linear-trend") {
      throw new Error("The linear fitting backend returned an unexpected model kind");
    }

    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const jsonValue: unknown = JSON.parse(JSON.stringify(encoded));
    const decoded = await Effect.runPromise(decodeFittedModel(jsonValue));
    const predictionTimestamps = ["2024-01-01T00:00:03.000Z", "2024-01-01T00:00:04.000Z"] as const;

    const before = await Effect.runPromise(predict(model, predictionTimestamps));
    const after = await Effect.runPromise(predict(decoded, predictionTimestamps));

    expect(encoded).toEqual(encodedModel);
    expect(decoded).toEqual(model);
    expect(after).toEqual(before);
  });

  it("serializes only portable prediction state", async () => {
    const modelWithBackendState: FittedLinearProphet & {
      readonly backend: "wasm";
      readonly handle: object;
    } = {
      ...fittedModel,
      backend: "wasm",
      handle: {},
    };

    const encoded = await Effect.runPromise(encodeFittedModel(modelWithBackendState));

    expect(encoded).toEqual(encodedModel);
    expect(encoded).not.toHaveProperty("backend");
    expect(encoded).not.toHaveProperty("handle");
  });

  it("rejects unsupported model kinds", async () => {
    await expectDecodeFailure(
      decodeFittedModel({ ...encodedModel, modelKind: "constant" }),
      "modelKind",
    );
  });

  it("rejects missing prediction fields", async () => {
    const { slope: _slope, ...incompleteCoefficients } = encodedModel.coefficients;

    await expectDecodeFailure(
      decodeFittedModel({ ...encodedModel, coefficients: incompleteCoefficients }),
      "slope",
    );
  });

  it.each([
    [
      "non-finite coefficients",
      { ...encodedModel, coefficients: { intercept: 2, slope: NaN } },
      "slope",
    ],
    [
      "non-finite scaling origins",
      { ...encodedModel, timeScaling: { origin: Infinity, scale: 2_000 } },
      "origin",
    ],
    [
      "non-positive scaling intervals",
      { ...encodedModel, timeScaling: { origin: 1_704_067_200_000, scale: 0 } },
      "scale",
    ],
  ])("rejects %s", async (_description, input, expectedPathSegment) => {
    await expectDecodeFailure(decodeFittedModel(input), expectedPathSegment);
  });

  it("fails invalid runtime models through the typed encoding path", async () => {
    const invalidModel: FittedLinearProphet = {
      ...fittedModel,
      timeScale: Number.NEGATIVE_INFINITY,
    };

    const error = await Effect.runPromise(Effect.flip(encodeFittedModel(invalidModel)));

    expect(error).toBeInstanceOf(ModelSerializationError);
    expect(error.operation).toBe("encode");
    expect(error.issues.some((issue) => issue.path?.includes("timeScale"))).toBe(true);
  });
});
