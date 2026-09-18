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
      ]).pipe(Effect.provide(prophetFittingBackendLayer)),
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
    expect(Object.isFrozen(decoded)).toBe(true);
    expect(after).toEqual(before);
  });

  it("round-trips complete additive state and preserves named predictions", async () => {
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
          seasonalities: [
            { name: "daily-custom", periodDays: 1, fourierOrder: 1, priorScale: 10 },
            { name: "weekly-custom", periodDays: 7, fourierOrder: 1, priorScale: 4 },
          ],
        },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "linear-additive-ridge") {
      throw new Error("The additive fitting backend returned an unexpected model kind");
    }

    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const jsonValue: unknown = JSON.parse(JSON.stringify(encoded));
    const decoded = await Effect.runPromise(decodeFittedModel(jsonValue));
    const timestamps = ["1970-01-01T06:00:00.000Z", "1970-01-03T06:00:00.000Z"] as const;
    const before = await Effect.runPromise(predict(model, timestamps));
    const after = await Effect.runPromise(predict(decoded, timestamps));

    expect(encoded.modelKind).toBe("linear-additive-ridge");

    if (encoded.modelKind === "linear-additive-ridge") {
      expect(encoded.seasonalities.map((seasonality) => seasonality.name)).toEqual([
        "daily-custom",
        "weekly-custom",
      ]);
      expect(encoded.coefficients.seasonal).toEqual(model.coefficients);
      expect(encoded.fitSummary).toEqual(model.fitSummary);
    }

    expect(decoded).toEqual(model);
    expect(after).toEqual(before);
    expect(Object.isFrozen(decoded)).toBe(true);

    if (decoded.model === "linear-additive-ridge") {
      expect(Object.isFrozen(decoded.coefficients)).toBe(true);
      expect(Object.isFrozen(decoded.seasonalities)).toBe(true);
      expect(Object.isFrozen(decoded.fitSummary)).toBe(true);
    }
  });

  it("persists the fitting-time automatic layout without rerunning resolution", async () => {
    const observations = Array.from({ length: 15 }, (_, index) => ({
      timestamp: new Date(
        Date.parse("2024-01-01T00:00:00.000Z") + index * 86_400_000,
      ).toISOString(),
      value: index + Math.sin((2 * Math.PI * index) / 7),
    }));

    const model = await Effect.runPromise(
      fit(observations, {
        builtInSeasonalities: { daily: "auto", weekly: "auto", yearly: "auto" },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-additive-ridge");

    if (model.model !== "linear-additive-ridge") {
      throw new Error("Expected an automatically resolved additive model");
    }

    expect(model.seasonalities.components.map((component) => component.definition.name)).toEqual([
      "weekly",
    ]);

    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));
    const timestamps = ["1900-01-01T00:00:00.000Z", "2200-01-01T00:00:00.000Z"] as const;
    const before = await Effect.runPromise(predict(model, timestamps));
    const after = await Effect.runPromise(predict(decoded, timestamps));

    expect(decoded).toEqual(model);
    expect(after).toEqual(before);
  });

  it("round-trips complete flat MAP state and preserves a constant trend", async () => {
    const model = await Effect.runPromise(
      fit(
        [
          { timestamp: "1970-01-01T00:00:00.000Z", value: 1.1 },
          { timestamp: "1970-01-01T06:00:00.000Z", value: 3 },
          { timestamp: "1970-01-01T12:00:00.000Z", value: 0.9 },
          { timestamp: "1970-01-01T18:00:00.000Z", value: -1.2 },
          { timestamp: "1970-01-02T00:00:00.000Z", value: 1.2 },
          { timestamp: "1970-01-02T06:00:00.000Z", value: 2.9 },
        ],
        {
          growth: "flat",
          seasonalities: [{ name: "daily-custom", periodDays: 1, fourierOrder: 1, priorScale: 10 }],
        },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "flat-map") {
      throw new Error("The flat fitting backend returned an unexpected model kind");
    }

    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));
    const timestamps = ["1970-01-01T06:00:00.000Z", "1970-01-03T06:00:00.000Z"] as const;
    const before = await Effect.runPromise(predict(model, timestamps));
    const after = await Effect.runPromise(predict(decoded, timestamps));

    expect(encoded.modelKind).toBe("flat-map");
    expect(decoded).toEqual(model);
    expect(after).toEqual(before);
    expect(before[0]?.trend).toBe(model.level);
    expect(before[1]?.trend).toBe(model.level);
    expect(Object.isFrozen(decoded)).toBe(true);

    if (decoded.model === "flat-map") {
      expect(Object.isFrozen(decoded.coefficients)).toBe(true);
      expect(Object.isFrozen(decoded.seasonalities)).toBe(true);
      expect(Object.isFrozen(decoded.fitSummary)).toBe(true);
    }
  });

  it("round-trips resolved linear MAP state without rerunning automatic selection", async () => {
    const observations = Array.from({ length: 10 }, (_, index) => ({
      timestamp: new Date(Date.UTC(2024, 0, index + 1)).toISOString(),
      value: 1 + index * 0.5 + (index >= 5 ? 1 : 0) + (index % 2) * 0.05,
    }));

    const model = await Effect.runPromise(
      fit(observations, {
        map: { changepoints: { mode: "auto", count: 2, range: 0.8 } },
        seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 1 }],
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected a linear-piecewise-map model");
    }

    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));
    const timestamps = ["2024-01-05T00:00:00.000Z", "2024-01-15T00:00:00.000Z"] as const;
    const before = await Effect.runPromise(predict(model, timestamps));
    const after = await Effect.runPromise(predict(decoded, timestamps));

    expect(encoded.modelKind).toBe("linear-piecewise-map");
    expect(decoded).toEqual(model);
    expect(after).toEqual(before);

    if (decoded.model === "linear-piecewise-map") {
      expect(Object.isFrozen(decoded.changepointTimestamps)).toBe(true);
      expect(Object.isFrozen(decoded.deltas)).toBe(true);
      expect(Object.isFrozen(decoded.fitSummary)).toBe(true);
    }
  });

  it("reconstructs additive layout metadata and rejects coefficient misalignment", async () => {
    const encoded = {
      modelKind: "linear-additive-ridge",
      coefficients: {
        intercept: 1,
        slope: 2,
        seasonal: [0.5],
      },
      timeScaling: {
        origin: 0,
        scale: 86_400_000,
      },
      seasonalities: [
        {
          name: "daily-custom",
          periodDays: 1,
          fourierOrder: 1,
          priorScale: 10,
        },
      ],
      fitSummary: {
        method: "normalized-ridge-v1",
        valueScale: 3,
        observationCount: 5,
        numericalRank: 4,
        normalizedResidualSumSquares: 0.1,
        penalizedObjective: 0.2,
      },
    } as const;

    await expectDecodeFailure(decodeFittedModel(encoded), "seasonal");
  });

  it("reports persisted seasonality failures at portable paths", async () => {
    const error = await Effect.runPromise(
      Effect.flip(
        decodeFittedModel({
          modelKind: "linear-additive-ridge",
          coefficients: {
            intercept: 1,
            slope: 2,
            seasonal: [0.5, 0.25, 0.1, -0.1],
          },
          timeScaling: {
            origin: 0,
            scale: 86_400_000,
          },
          seasonalities: [
            { name: "duplicate", periodDays: 1, fourierOrder: 1, priorScale: 10 },
            { name: "duplicate", periodDays: 7, fourierOrder: 1, priorScale: 4 },
          ],
          fitSummary: {
            method: "normalized-ridge-v1",
            valueScale: 3,
            observationCount: 5,
            numericalRank: 6,
            normalizedResidualSumSquares: 0.1,
            penalizedObjective: 0.2,
          },
        }),
      ),
    );

    expect(error).toBeInstanceOf(ModelSerializationError);
    expect(error.issues).toContainEqual({
      path: ["seasonalities", 1, "name"],
      message: expect.stringContaining("duplicated"),
    });
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
    const invalidModel: LinearParameters = {
      ...fittedParameters,
      timeScale: Number.NEGATIVE_INFINITY,
    };

    const error = await Effect.runPromise(
      // @ts-expect-error -- A plain backend record deliberately exercises the JavaScript runtime boundary.
      Effect.flip(encodeFittedModel(invalidModel)),
    );

    expect(error).toBeInstanceOf(ModelSerializationError);
    expect(error.operation).toBe("encode");
    expect(error.issues.some((issue) => issue.path?.includes("timeScale"))).toBe(true);
  });
});
