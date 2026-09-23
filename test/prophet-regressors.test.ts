import { Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
  InputValidationError,
  UnsupportedConfigurationError,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  getRegressorCoefficients,
  predict,
  prophetFittingBackendLayer,
} from "../src/index";

const temperatures = [10, 12, 9, 13, 11, 14, 8, 15] as const;

const history = temperatures.map((temperature, index) => {
  const promotion = index % 2;

  return {
    timestamp: new Date(Date.UTC(2025, 0, index + 1)).toISOString(),
    value: 5 + index * 0.2 + promotion * 3 + temperature * 0.5,
    regressors: { promotion, temperature, constant: 2 },
  };
});

const options = {
  regressors: [
    { name: "promotion", priorScale: 100 },
    { name: "temperature", priorScale: 100 },
    { name: "constant", priorScale: 100, standardization: "always" },
  ],
} as const;

const futureRows = [
  {
    timestamp: "2025-01-09T00:00:00.000Z",
    regressors: { promotion: 0, temperature: 10, constant: 2 },
  },
  {
    timestamp: "2025-01-09T00:00:00.000Z",
    regressors: { promotion: 1, temperature: 14, constant: 2 },
  },
] as const;

describe("additional regressor public lifecycle", () => {
  it("fits jointly, predicts complete rows, inspects coefficients, and survives serialization", async () => {
    const model = await Effect.runPromise(
      fit(history, options).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-piecewise-map");

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected regressors to select linear piecewise MAP");
    }

    expect(model.regressors.map((regressor) => regressor.definition.name)).toEqual([
      "promotion",
      "temperature",
      "constant",
    ]);
    expect(model.regressors.map((regressor) => regressor.transform.mode)).toEqual([
      "identity",
      "standardized",
      "identity",
    ]);
    expect(model.regressors[2]?.transform).toEqual({ mode: "identity", reason: "constant" });

    const before = await Effect.runPromise(predict(model, futureRows));

    expect(before).toHaveLength(2);
    expect(before[0]?.timestamp).toBe(before[1]?.timestamp);
    expect(before[0]?.regressors.map((component) => component.name)).toEqual([
      "promotion",
      "temperature",
      "constant",
    ]);
    expect(before[0]?.value).not.toBe(before[1]?.value);

    for (const forecast of before) {
      const componentTotal = forecast.regressors.reduce(
        (total, component) =>
          total + (component.mode === "additive" ? component.value : component.contribution),
        0,
      );

      expect(forecast.additive).toBeCloseTo(componentTotal, 11);
      expect(forecast.value).toBeCloseTo(forecast.trend + forecast.additive, 11);
    }

    const coefficients = getRegressorCoefficients(model);

    expect(coefficients.map((coefficient) => coefficient.name)).toEqual([
      "promotion",
      "temperature",
      "constant",
    ]);
    expect(coefficients[0]?.center).toBe(0);
    expect(coefficients[1]?.center).toBeCloseTo(11.5, 12);

    for (const [rowIndex, row] of futureRows.entries()) {
      for (const [componentIndex, component] of before[rowIndex]?.regressors.entries() ?? []) {
        const coefficient = coefficients[componentIndex];
        const inputValues: Readonly<Record<string, number>> = row.regressors;
        const inputValue = inputValues[component.name];

        if (
          coefficient === undefined ||
          inputValue === undefined ||
          component.mode !== "additive"
        ) {
          throw new Error("Expected aligned additive coefficient reconstruction metadata");
        }

        expect(component.value).toBeCloseTo(
          coefficient.coefficient * (inputValue - coefficient.center),
          11,
        );
      }
    }

    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));
    const after = await Effect.runPromise(predict(decoded, futureRows));

    expect(decoded).toEqual(model);
    expect(after).toEqual(before);
  });

  it("fits regressors and events in one linear MAP boundary", async () => {
    const model = await Effect.runPromise(
      fit(history, {
        regressors: options.regressors,
        events: [{ name: "launch", date: "2025-01-04", priorScale: 10 }],
        map: {
          changepoints: {
            mode: "explicit",
            timestamps: ["2025-01-05T00:00:00.000Z"],
          },
        },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-piecewise-map");

    if (model.model === "linear-piecewise-map") {
      expect(model.eventCoefficients).toHaveLength(1);
      expect(model.regressors).toHaveLength(3);
    }

    const before = await Effect.runPromise(predict(model, futureRows));
    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));
    const after = await Effect.runPromise(predict(decoded, futureRows));

    expect(after).toEqual(before);
  });

  it("rejects missing, extra, non-finite, and timestamp-only future values", async () => {
    const model = await Effect.runPromise(
      fit(history, options).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const invalidRows = [
      { timestamp: "2025-01-09T00:00:00.000Z", regressors: { promotion: 1 } },
      {
        timestamp: "2025-01-09T00:00:00.000Z",
        regressors: { promotion: 1, temperature: 10, constant: 2, typo: 3 },
      },
      {
        timestamp: "2025-01-09T00:00:00.000Z",
        regressors: { promotion: 1, temperature: Number.NaN, constant: 2 },
      },
      "2025-01-09T00:00:00.000Z",
    ];

    for (const row of invalidRows) {
      const error = await Effect.runPromise(Effect.flip(predict(model, [row])));

      expect(error).toBeInstanceOf(InputValidationError);

      if (error instanceof InputValidationError) {
        expect(error.input).toBe("prediction-rows");
      }
    }
  });

  it("records safe regressor fit and prediction boundaries", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (spanOptions) => {
        const span = new Tracer.NativeSpan(spanOptions);
        spans.push(span);

        return span;
      },
    });

    await Effect.runPromise(
      Effect.gen(function* () {
        const model = yield* fit(history, options);
        yield* predict(model, futureRows);
      }).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withSpan("forecast.job"),
        Effect.withTracer(tracer),
      ),
    );

    const root = spans.find((span) => span.name === "forecast.job");
    const publicFit = spans.find((span) => span.name === "Prophet.fit");
    const publicPredict = spans.find((span) => span.name === "Prophet.predict");
    const wasmFit = spans.find((span) => span.name === "effect-prophet.wasm.fit");
    const wasmPredict = spans.find((span) => span.name === "effect-prophet.wasm.predict");

    expect(root).toBeDefined();
    expect(publicFit).toBeDefined();
    expect(publicPredict).toBeDefined();
    expect(wasmFit).toBeDefined();
    expect(wasmPredict).toBeDefined();

    if (
      root === undefined ||
      publicFit === undefined ||
      publicPredict === undefined ||
      wasmFit === undefined ||
      wasmPredict === undefined
    ) {
      throw new Error("Expected complete regressor tracing boundaries");
    }

    expect(wasmFit.traceId).toBe(root.traceId);
    expect(wasmPredict.traceId).toBe(root.traceId);
    expect(wasmFit.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicFit.spanId);
    expect(wasmPredict.parent.pipe(Option.getOrUndefined)?.spanId).toBe(publicPredict.spanId);
    expect(Object.fromEntries(publicFit.attributes)["effect_prophet.regressor.count"]).toBe(3);
    expect(Object.fromEntries(wasmFit.attributes)["effect_prophet.coefficient.count"]).toBe(3);

    for (const [span, parent] of [
      [wasmFit, publicFit],
      [wasmPredict, publicPredict],
    ] as const) {
      if (
        !Predicate.isTagged("Ended")(span.status) ||
        !Predicate.isTagged("Ended")(parent.status)
      ) {
        throw new Error(`Expected ${span.name} and its public parent to have ended`);
      }

      expect(Exit.isSuccess(span.status.exit)).toBe(true);
      expect(span.status.startTime).toBeGreaterThanOrEqual(parent.status.startTime);
      expect(span.status.endTime).toBeLessThanOrEqual(parent.status.endTime);
    }
  });

  it("rejects training alignment before entering fitting WASM", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (spanOptions) => {
        const span = new Tracer.NativeSpan(spanOptions);
        spans.push(span);

        return span;
      },
    });

    const error = await Effect.runPromise(
      Effect.flip(
        fit(
          history.map(({ timestamp, value }) => ({ timestamp, value })),
          options,
        ).pipe(Effect.provide(prophetFittingBackendLayer), Effect.withTracer(tracer)),
      ),
    );

    expect(error).toBeInstanceOf(InputValidationError);
    expect(spans.some((span) => span.name === "Prophet.fit")).toBe(true);
    expect(spans.some((span) => span.name === "effect-prophet.wasm.fit")).toBe(false);
  });

  it("does not enter prediction WASM when regressor alignment fails", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (spanOptions) => {
        const span = new Tracer.NativeSpan(spanOptions);
        spans.push(span);

        return span;
      },
    });

    const model = await Effect.runPromise(
      fit(history, options).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    await Effect.runPromise(
      predict(model, ["2025-01-09T00:00:00.000Z"]).pipe(Effect.withTracer(tracer), Effect.exit),
    );

    expect(spans.some((span) => span.name === "Prophet.predict")).toBe(true);
    expect(spans.some((span) => span.name === "effect-prophet.wasm.predict")).toBe(false);
  });

  it("rejects flat regressors before semantic row alignment", async () => {
    const error = await Effect.runPromise(
      Effect.flip(
        fit(
          history.map(({ timestamp, value }) => ({ timestamp, value })),
          { growth: "flat", regressors: [{ name: "price" }] },
        ).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(error).toBeInstanceOf(UnsupportedConfigurationError);

    if (error instanceof UnsupportedConfigurationError) {
      expect(error.option).toBe("regressors");
    }
  });
});
