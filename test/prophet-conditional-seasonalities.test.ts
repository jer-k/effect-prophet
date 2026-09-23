import { Effect, Option, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
  FittingError,
  InputValidationError,
  UnsupportedConfigurationError,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predict,
  predictUncertainty,
  prophetFittingBackendLayer,
  type ForecastComponent,
} from "../src/index";

const additiveValue = (component: ForecastComponent | undefined): number | undefined =>
  component?.mode === "additive" ? component.value : undefined;

const history = Array.from({ length: 14 }, (_, index) => {
  const onSeason = index % 3 !== 1;
  const timestamp = new Date(Date.UTC(2025, 0, index + 1)).toISOString();
  const weekly = Math.sin((2 * Math.PI * index) / 7);

  return {
    timestamp,
    value: 10 + index * 0.15 + (onSeason ? weekly * 2 : 0),
    conditions: { onSeason },
  };
});

const conditionalOptions = {
  map: { changepoints: { mode: "explicit", timestamps: [] } },
  seasonalities: [
    {
      name: "weekly-on-season",
      periodDays: 7,
      fourierOrder: 2,
      priorScale: 20,
      conditionName: "onSeason",
    },
    {
      name: "three-day-unconditional",
      periodDays: 3,
      fourierOrder: 1,
      priorScale: 20,
    },
  ],
} as const;

const predictionRows = [
  {
    timestamp: "2025-01-15T00:00:00.000Z",
    conditions: { onSeason: false },
  },
  {
    timestamp: "2025-01-15T00:00:00.000Z",
    conditions: { onSeason: true },
  },
] as const;

describe("conditional seasonality public lifecycle", () => {
  it("fits masked Fourier columns, predicts complete rows, and survives JSON persistence", async () => {
    const model = await Effect.runPromise(
      fit(history, conditionalOptions).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-piecewise-map");

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected conditional seasonalities to select linear piecewise MAP");
    }

    expect(model.seasonalities.components.map((component) => component.definition)).toEqual([
      {
        name: "weekly-on-season",
        periodDays: 7,
        fourierOrder: 2,
        priorScale: 20,
        mode: "additive",
        conditionName: "onSeason",
      },
      {
        name: "three-day-unconditional",
        periodDays: 3,
        fourierOrder: 1,
        priorScale: 20,
        mode: "additive",
      },
    ]);

    const before = await Effect.runPromise(predict(model, predictionRows));

    const split = [
      ...(await Effect.runPromise(predict(model, [predictionRows[0]]))),
      ...(await Effect.runPromise(predict(model, [predictionRows[1]]))),
    ];

    const permuted = await Effect.runPromise(
      predict(model, [predictionRows[1], predictionRows[0]]),
    );

    expect(split).toEqual(before);
    expect(permuted).toEqual([before[1], before[0]]);

    const falseComponents = before[0]?.seasonalities;
    const trueComponents = before[1]?.seasonalities;

    expect(falseComponents?.[0]).toEqual({
      name: "weekly-on-season",
      mode: "additive",
      value: 0,
    });
    expect(additiveValue(falseComponents?.[1])).toBeCloseTo(
      additiveValue(trueComponents?.[1]) ?? Number.NaN,
      12,
    );
    expect(Math.abs(additiveValue(trueComponents?.[0]) ?? 0)).toBeGreaterThan(0);
    expect(before[0]?.value).not.toBe(before[1]?.value);

    for (const forecast of before) {
      const seasonalTotal = forecast.seasonalities.reduce(
        (total, component) =>
          total + (component.mode === "additive" ? component.value : component.contribution),
        0,
      );

      expect(forecast.additive).toBeCloseTo(seasonalTotal, 12);
      expect(forecast.value).toBeCloseTo(forecast.trend + forecast.additive, 12);
    }

    const encoded = await Effect.runPromise(encodeFittedModel(model));

    if (encoded.modelKind !== "linear-piecewise-map") {
      throw new Error("Expected a portable linear piecewise MAP model");
    }

    expect(encoded.seasonalities[0]?.conditionName).toBe("onSeason");
    expect(encoded).not.toHaveProperty("conditions");

    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));
    const after = await Effect.runPromise(predict(decoded, predictionRows));

    expect(decoded).toEqual(model);
    expect(after).toEqual(before);
  });

  it("makes an all-true conditional component agree with its unconditional design", async () => {
    const allTrueHistory = history.map((row) => ({
      ...row,
      conditions: { onSeason: true },
    }));

    const definition = conditionalOptions.seasonalities[0];

    const conditional = await Effect.runPromise(
      fit(allTrueHistory, { seasonalities: [definition] }).pipe(
        Effect.provide(prophetFittingBackendLayer),
      ),
    );

    const unconditional = await Effect.runPromise(
      fit(
        allTrueHistory.map(({ conditions: _conditions, ...row }) => row),
        {
          seasonalities: [
            {
              name: definition.name,
              periodDays: definition.periodDays,
              fourierOrder: definition.fourierOrder,
              priorScale: definition.priorScale,
            },
          ],
        },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (
      conditional.model !== "linear-piecewise-map" ||
      unconditional.model !== "linear-piecewise-map"
    ) {
      throw new Error("Expected linear piecewise MAP models");
    }

    expect(conditional.coefficients).toEqual(unconditional.coefficients);
    expect(conditional.intercept).toBe(unconditional.intercept);
    expect(conditional.slope).toBe(unconditional.slope);
  });

  it("supports an all-false regularized component without removing its coefficient block", async () => {
    const allFalse = history.map((row) => ({
      ...row,
      conditions: { onSeason: false },
    }));

    const model = await Effect.runPromise(
      fit(allFalse, {
        seasonalities: [conditionalOptions.seasonalities[0]],
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected a linear piecewise MAP model");
    }

    expect(model.coefficients).toHaveLength(4);
    expect(model.coefficients).toEqual([0, 0, 0, 0]);

    const forecasts = await Effect.runPromise(predict(model, predictionRows));

    expect(forecasts.every((forecast) => additiveValue(forecast.seasonalities[0]) === 0)).toBe(
      true,
    );
  });

  it("fits conditional seasonalities with an event and regressor through linear MAP", async () => {
    const mixedHistory = history.map((row, index) => ({
      ...row,
      value: row.value + (index === 5 ? 1.5 : 0) + (index % 2) * 0.4,
      regressors: { promotion: index % 2 },
    }));

    const model = await Effect.runPromise(
      fit(mixedHistory, {
        seasonalities: [conditionalOptions.seasonalities[0]],
        events: [{ name: "launch", date: "2025-01-06", priorScale: 10 }],
        regressors: [{ name: "promotion", priorScale: 10 }],
        map: {
          changepoints: {
            mode: "explicit",
            timestamps: ["2025-01-08T00:00:00.000Z"],
          },
        },
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(model.model).toBe("linear-piecewise-map");

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected a linear piecewise MAP model");
    }

    const rows = predictionRows.map((row, index) => ({
      ...row,
      regressors: { promotion: index },
    }));

    const before = await Effect.runPromise(predict(model, rows));
    const encoded = await Effect.runPromise(encodeFittedModel(model));
    const decoded = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));
    const after = await Effect.runPromise(predict(decoded, rows));

    expect(additiveValue(before[0]?.seasonalities[0])).toBe(0);
    expect(before[0]?.events).toHaveLength(1);
    expect(before[0]?.regressors).toHaveLength(1);
    expect(after).toEqual(before);

    const uncertaintyRows = [
      ...rows,
      {
        timestamp: "2025-01-06T00:00:00.000Z",
        conditions: { onSeason: true },
        regressors: { promotion: 1 },
      },
    ];

    const request = { seed: 5, samples: 32, output: "samples" } as const;
    const samples = await Effect.runPromise(predictUncertainty(model, uncertaintyRows, request));
    const replay = await Effect.runPromise(predictUncertainty(decoded, uncertaintyRows, request));

    expect(replay).toEqual(samples);

    if (samples.kind !== "samples") {
      throw new Error("Expected mixed uncertainty samples");
    }

    expect(samples.trend).toHaveLength(uncertaintyRows.length * request.samples);
    expect(samples.trend[0]).toBe(samples.trend[request.samples]);
    expect(samples.value[0]).not.toBe(samples.value[request.samples]);
    expect(
      samples.trend
        .slice(2 * request.samples)
        .every((value) => value === samples.trend[2 * request.samples]),
    ).toBe(true);
  });

  it("rejects malformed, missing, and extra condition values before WASM", async () => {
    const nonBooleanError = await Effect.runPromise(
      Effect.flip(
        fit(
          [
            {
              timestamp: "2025-01-01T00:00:00.000Z",
              value: 1,
              conditions: { onSeason: 1 },
            },
            {
              timestamp: "2025-01-02T00:00:00.000Z",
              value: 2,
              conditions: { onSeason: true },
            },
          ],
          { seasonalities: [conditionalOptions.seasonalities[0]] },
        ).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(nonBooleanError).toBeInstanceOf(InputValidationError);

    const model = await Effect.runPromise(
      fit(history, conditionalOptions).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    for (const row of [
      "2025-01-15T00:00:00.000Z",
      { timestamp: "2025-01-15T00:00:00.000Z" },
      {
        timestamp: "2025-01-15T00:00:00.000Z",
        conditions: { onSeason: true, typo: false },
      },
    ]) {
      const error = await Effect.runPromise(Effect.flip(predict(model, [row])));

      expect(error).toBeInstanceOf(InputValidationError);

      if (error instanceof InputValidationError) {
        expect(error.input).toBe("prediction-rows");
      }
    }
  });

  it("preserves history and structural-validation precedence", async () => {
    const oneRowError = await Effect.runPromise(
      Effect.flip(
        fit([{ timestamp: "2025-01-01T00:00:00.000Z", value: 1 }], {
          seasonalities: [conditionalOptions.seasonalities[0]],
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(oneRowError).toBeInstanceOf(FittingError);

    if (oneRowError instanceof FittingError) {
      expect(oneRowError.reason).toBe("insufficient-observations");
    }

    const malformedFlatError = await Effect.runPromise(
      Effect.flip(
        fit(
          [
            {
              timestamp: "2025-01-01T00:00:00.000Z",
              value: 1,
              conditions: { onSeason: 1 },
            },
            {
              timestamp: "2025-01-02T00:00:00.000Z",
              value: 2,
              conditions: { onSeason: true },
            },
          ],
          {
            growth: "flat",
            seasonalities: [conditionalOptions.seasonalities[0]],
          },
        ).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(malformedFlatError).toBeInstanceOf(InputValidationError);
  });

  it("rejects condition values when no condition is fitted", async () => {
    const model = await Effect.runPromise(
      fit(
        history.map(({ conditions: _conditions, ...row }) => row),
        {
          seasonalities: [
            { name: "weekly-custom", periodDays: 7, fourierOrder: 1, priorScale: 10 },
          ],
        },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const error = await Effect.runPromise(
      Effect.flip(
        predict(model, [
          {
            timestamp: "2025-01-15T00:00:00.000Z",
            conditions: { typo: true },
          },
        ]),
      ),
    );

    expect(error).toBeInstanceOf(InputValidationError);
  });

  it("rejects conditional flat models before semantic training alignment", async () => {
    const error = await Effect.runPromise(
      Effect.flip(
        fit(
          history.map(({ conditions: _conditions, ...row }) => row),
          { growth: "flat", seasonalities: [conditionalOptions.seasonalities[0]] },
        ).pipe(Effect.provide(prophetFittingBackendLayer)),
      ),
    );

    expect(error).toBeInstanceOf(UnsupportedConfigurationError);

    if (error instanceof UnsupportedConfigurationError) {
      expect(error.option).toBe("conditional-seasonalities");
    }
  });

  it("records safe conditional featureful boundaries and skips prediction WASM on alignment failure", async () => {
    const spans: Array<Tracer.Span> = [];

    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);

        return span;
      },
    });

    const model = await Effect.runPromise(
      fit(history, conditionalOptions).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withSpan("forecast.job"),
        Effect.withTracer(tracer),
      ),
    );

    await Effect.runPromise(
      predict(model, predictionRows).pipe(
        Effect.withSpan("forecast.job"),
        Effect.withTracer(tracer),
      ),
    );

    const fitSpan = spans.find((span) => span.name === "Prophet.fit");
    const wasmFit = spans.find((span) => span.name === "effect-prophet.wasm.fit");

    expect(fitSpan).toBeDefined();
    expect(wasmFit).toBeDefined();
    expect(
      Object.fromEntries(fitSpan?.attributes ?? [])["effect_prophet.seasonality.condition.count"],
    ).toBe(1);
    expect(wasmFit?.parent.pipe(Option.getOrUndefined)?.spanId).toBe(fitSpan?.spanId);

    const beforeFailure = spans.filter(
      (span) => span.name === "effect-prophet.wasm.predict",
    ).length;

    await Effect.runPromise(
      predict(model, ["2025-01-16T00:00:00.000Z"]).pipe(Effect.withTracer(tracer), Effect.exit),
    );

    expect(spans.filter((span) => span.name === "effect-prophet.wasm.predict")).toHaveLength(
      beforeFailure,
    );
  });
});
