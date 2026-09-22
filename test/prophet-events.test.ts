import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  UnsupportedConfigurationError,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predict,
  prophetFittingBackendLayer,
  type ForecastComponent,
} from "../src/index";

const additiveValue = (component: ForecastComponent | undefined): number | undefined =>
  component?.mode === "additive" ? component.value : undefined;

const history = Array.from({ length: 8 }, (_, index) => {
  const day = index + 1;

  return {
    timestamp: new Date(Date.UTC(2024, 0, day, 12)).toISOString(),
    value: day === 3 ? 8 : 2 + index * 0.05,
  };
});

const events = [
  { name: "launch", date: "2024-01-03", priorScale: 100 },
  { name: "launch", date: "2024-01-10", priorScale: 100 },
] as const;

describe("custom event public lifecycle", () => {
  it("fits in Rust, predicts declared future occurrences, and survives JSON persistence", async () => {
    const model = await Effect.runPromise(
      fit(history, { events }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-piecewise-map");

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected event fitting to select linear piecewise MAP");
    }

    expect(model.events.layout.components.map((component) => component.name)).toEqual(["launch"]);
    expect(model.eventCoefficients).toHaveLength(1);

    const timestamps = ["2024-01-09T12:00:00.000Z", "2024-01-10T12:00:00.000Z"] as const;
    const before = await Effect.runPromise(predict(model, timestamps));

    expect(before[0]?.events).toEqual([{ name: "launch", mode: "additive", value: 0 }]);
    expect(Math.abs(additiveValue(before[1]?.events[0]) ?? 0)).toBeGreaterThan(1);
    expect(before[1]?.additive).toBeCloseTo(additiveValue(before[1]?.events[0]) ?? 0, 12);

    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));
    const after = await Effect.runPromise(predict(decoded, timestamps));

    expect(after).toEqual(before);
  });

  it("fits custom events jointly with linear MAP changepoints", async () => {
    const model = await Effect.runPromise(
      fit(history, {
        events,
        map: { changepoints: { mode: "explicit", timestamps: ["2024-01-05T12:00:00.000Z"] } },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-piecewise-map");

    if (model.model === "linear-piecewise-map") {
      expect(model.eventCoefficients).toHaveLength(1);
      expect(model.events.columns).toHaveLength(1);
    }
  });

  it("rejects events for flat growth before loading WASM", async () => {
    const error = await Effect.runPromise(
      Effect.flip(
        fit(history, { growth: "flat", events }).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(error).toBeInstanceOf(UnsupportedConfigurationError);

    if (error instanceof UnsupportedConfigurationError) {
      expect(error.option).toBe("events");
    }
  });
});
