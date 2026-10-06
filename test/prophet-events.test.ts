import { Effect, Option, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
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

  it("traces event and fitted dimension counts on the fit boundaries", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const model = await Effect.runPromise(
      fit(history, {
        events,
        map: { changepoints: { mode: "explicit", timestamps: ["2024-01-05T12:00:00.000Z"] } },
      }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
    );

    const publicFit = spans.find((span) => span.name === "Prophet.fit");
    const wasmFit = spans.find((span) => span.name === "effect-prophet.wasm.fit");

    if (publicFit === undefined || wasmFit === undefined) {
      throw new Error("Expected public and WASM fit spans");
    }

    expect(wasmFit.traceId).toBe(publicFit.traceId);
    expect(wasmFit.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicFit.spanId);
    expect(Object.fromEntries(publicFit.attributes)["effect_prophet.event.count"]).toBe(1);
    expect(Object.fromEntries(wasmFit.attributes)).toMatchObject({
      "effect_prophet.changepoint.count": 1,
      "effect_prophet.parameter.count": 2 + 1 + model.coefficients.length + 1,
    });
  });

  it("fits additive events with flat growth through the mixed flat fitter", async () => {
    const model = await Effect.runPromise(
      fit(history, { growth: "flat", events }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "flat-map") {
      throw new Error("Expected flat growth to select flat MAP");
    }

    expect(model.fitSummary.method).toBe("flat-map-stan-v1");
    expect(model.eventCoefficients).toHaveLength(1);

    const timestamps = ["2024-01-09T12:00:00.000Z", "2024-01-10T12:00:00.000Z"] as const;
    const forecasts = await Effect.runPromise(predict(model, timestamps));

    expect(forecasts[0]?.events).toEqual([{ name: "launch", mode: "additive", value: 0 }]);
    expect(additiveValue(forecasts[1]?.events[0]) ?? 0).toBeGreaterThan(1);
    expect(forecasts[0]?.trend).toBe(forecasts[1]?.trend);
    expect(forecasts[1]?.value).toBeCloseTo(
      (forecasts[1]?.trend ?? Number.NaN) + (additiveValue(forecasts[1]?.events[0]) ?? 0),
      12,
    );
  });
});
