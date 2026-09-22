import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  FittingError,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predict,
  prophetFittingBackendLayer,
} from "../src/index";

const observations = [
  { timestamp: "2024-01-01T00:00:00.000Z", value: 20 },
  { timestamp: "2024-01-02T00:00:00.000Z", value: 21.5 },
  { timestamp: "2024-01-03T00:00:00.000Z", value: 23 },
  { timestamp: "2024-01-04T00:00:00.000Z", value: 23.2 },
  { timestamp: "2024-01-05T00:00:00.000Z", value: 24 },
  { timestamp: "2024-01-06T00:00:00.000Z", value: 25 },
] as const;

const runFit = <Options extends Parameters<typeof fit>[1]>(options: Options) =>
  Effect.runPromise(fit(observations, options).pipe(Effect.provide(prophetFittingBackendLayer)));

describe("public target scaling", () => {
  it("uses explicit linear scaling to fit and persist MAP state", async () => {
    const model = await runFit({ scaling: "minmax" });

    expect(model.model).toBe("linear-piecewise-map");

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected linear piecewise MAP state");
    }

    expect(model.targetScaling).toEqual({ mode: "minmax", offset: 20, scale: 5 });
    expect(Object.isFrozen(model.targetScaling)).toBe(true);

    const encoded = await Effect.runPromise(encodeFittedModel(model));

    const restored = await Effect.runPromise(
      decodeFittedModel(JSON.parse(JSON.stringify(encoded))),
    );

    const rows = ["2024-01-07T00:00:00.000Z", "2024-01-09T00:00:00.000Z"] as const;

    expect(restored.model).toBe("linear-piecewise-map");
    expect("targetScaling" in restored ? restored.targetScaling : undefined).toEqual(
      model.targetScaling,
    );
    expect(await Effect.runPromise(predict(restored, rows))).toEqual(
      await Effect.runPromise(predict(model, rows)),
    );
  });

  it("supports minmax scaling for flat MAP and adds the offset only to trend", async () => {
    const model = await runFit({ growth: "flat", scaling: "minmax" });

    expect(model.model).toBe("flat-map");

    if (model.model !== "flat-map") {
      throw new Error("Expected flat MAP state");
    }

    expect(model.targetScaling).toEqual({ mode: "minmax", offset: 20, scale: 5 });

    const [forecast] = await Effect.runPromise(predict(model, ["2024-01-07T00:00:00.000Z"]));

    expect(forecast).toBeDefined();
    expect(forecast?.trend).toBeCloseTo(model.targetScaling.offset + model.level, 12);
    expect(forecast?.value).toBeCloseTo((forecast?.trend ?? 0) + (forecast?.additive ?? 0), 12);
  });

  it("keeps flat seasonal components in additive output units", async () => {
    const model = await Effect.runPromise(
      fit(
        [
          { timestamp: "1970-01-01T00:00:00.000Z", value: 11.1 },
          { timestamp: "1970-01-01T06:00:00.000Z", value: 13 },
          { timestamp: "1970-01-01T12:00:00.000Z", value: 10.9 },
          { timestamp: "1970-01-01T18:00:00.000Z", value: 8.8 },
          { timestamp: "1970-01-02T00:00:00.000Z", value: 11.2 },
          { timestamp: "1970-01-02T06:00:00.000Z", value: 12.9 },
        ],
        {
          growth: "flat",
          scaling: "minmax",
          seasonalities: [{ name: "daily-custom", periodDays: 1, fourierOrder: 1 }],
        },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "flat-map") {
      throw new Error("Expected flat MAP state");
    }

    const [forecast] = await Effect.runPromise(predict(model, ["1970-01-02T12:00:00.000Z"]));

    expect(forecast?.seasonalities).toHaveLength(1);

    const seasonality = forecast?.seasonalities[0];

    if (seasonality?.mode !== "additive") {
      throw new Error("Expected an additive seasonal component");
    }

    expect(seasonality.value).toBeCloseTo(forecast?.additive ?? 0, 12);
    expect(forecast?.value).toBeCloseTo((forecast?.trend ?? 0) + (forecast?.additive ?? 0), 12);
    expect(Math.abs(forecast?.additive ?? 0)).toBeLessThan(model.targetScaling.offset);
  });

  it("preserves Python Prophet's unit fallback for constant minmax targets", async () => {
    const model = await Effect.runPromise(
      fit(
        [
          { timestamp: "2024-01-01T00:00:00.000Z", value: -4 },
          { timestamp: "2024-01-02T00:00:00.000Z", value: -4 },
        ],
        { growth: "flat", scaling: "minmax" },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "flat-map") {
      throw new Error("Expected flat MAP state");
    }

    expect(model.targetScaling).toEqual({ mode: "minmax", offset: -4, scale: 1 });
    expect(model.level).toBe(0);
    expect(model.noiseScale).toBe(1e-9);

    const [forecast] = await Effect.runPromise(predict(model, ["2024-01-03T00:00:00.000Z"]));

    expect(forecast?.trend).toBe(-4);
    expect(forecast?.value).toBe(-4);
  });

  it("reports an overflowing finite minmax range as a typed numerical failure", async () => {
    const error = await Effect.runPromise(
      Effect.flip(
        fit(
          [
            { timestamp: "2024-01-01T00:00:00.000Z", value: -Number.MAX_VALUE },
            { timestamp: "2024-01-02T00:00:00.000Z", value: Number.MAX_VALUE },
          ],
          { growth: "flat", scaling: "minmax" },
        ).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(error).toBeInstanceOf(FittingError);

    if (error instanceof FittingError) {
      expect(error.reason).toBe("non-finite-result");
    }
  });
});
