import { Effect, Exit, Option } from "effect";
import { describe, expect, it } from "vitest";

import {
  FittingError,
  InputValidationError,
  PredictionError,
  anomalies,
  defaultAnomalyIntervalWidth,
  detectAnomalies,
  fit,
  predictUncertainty,
  predictWithIntervals,
  prophetFittingBackendLayer,
  simulationIdentity,
  type EncodedObservation,
  type EncodedObservations,
  type FittedProphet,
} from "../src/index";
import { anomalyPosition } from "../src/anomaly";
import { collectTestSpans, requireEndedSpan } from "./internal/tracing-test-helpers";

const day = (offset: number) => new Date(Date.UTC(2025, 0, 1 + offset)).toISOString();

// Scattered, non-periodic noise in [-1, 1] that no seasonality can fit.
const noise = (offset: number) => ((offset * 7_919) % 101) / 50 - 1;

const history = Array.from({ length: 60 }, (_, offset) => ({
  timestamp: day(offset),
  value: 100 + offset * 0.5 + noise(offset),
}));

const expected = (offset: number) => 100 + offset * 0.5;

// Later measurements: a spike, a dip, and two ordinary days, deliberately out of order.
const later = [
  { timestamp: day(63), value: expected(63) },
  { timestamp: day(61), value: expected(61) + 25 },
  { timestamp: day(60), value: expected(60) },
  { timestamp: day(62), value: expected(62) - 25 },
] as const satisfies EncodedObservations;

const fitBaseline = () =>
  Effect.runPromise(
    fit(history, {
      builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
    }).pipe(Effect.provide(prophetFittingBackendLayer)),
  );

const options = { seed: 11, samples: 200 } as const;

describe("anomalyPosition", () => {
  it("flags only strict exceedance", () => {
    const interval = { lower: 1, upper: 3 };

    expect(anomalyPosition(0.999, interval)).toBe("below");
    expect(anomalyPosition(1, interval)).toBe("within");
    expect(anomalyPosition(2, interval)).toBe("within");
    expect(anomalyPosition(3, interval)).toBe("within");
    expect(anomalyPosition(3.001, interval)).toBe("above");
    expect(anomalyPosition(5, { lower: 5, upper: 5 })).toBe("within");
  });
});

describe("detectAnomalies", () => {
  it("assesses later observations against an earlier baseline in chronological order", async () => {
    const model = await fitBaseline();
    const report = await Effect.runPromise(detectAnomalies(model, later, options));

    expect(report.simulation).toBe(simulationIdentity);
    expect(report.sampleCount).toBe(200);
    expect(report.intervalWidth).toBe(defaultAnomalyIntervalWidth);

    expect(report.rows.map(({ timestamp, position }) => [timestamp, position])).toEqual([
      [Date.parse(day(60)), "within"],
      [Date.parse(day(61)), "above"],
      [Date.parse(day(62)), "below"],
      [Date.parse(day(63)), "within"],
    ]);

    expect(report.anomalies).toEqual(report.rows.filter((row) => row.position !== "within"));
    expect(report.rows.map((row) => row.actual)).toEqual([
      later[2].value,
      later[1].value,
      later[3].value,
      later[0].value,
    ]);
  });

  it("equals manual seeded interval prediction and honors explicit controls", async () => {
    const model = await fitBaseline();
    const sorted = [later[2], later[1], later[3], later[0]];
    const rows = sorted.map(({ timestamp }) => timestamp);

    for (const request of [
      { options, intervalWidth: defaultAnomalyIntervalWidth },
      { options: { ...options, intervalWidth: 0.5 }, intervalWidth: 0.5 },
    ]) {
      const { intervalWidth } = request;

      const [report, manual, intervals] = await Effect.runPromise(
        Effect.all([
          detectAnomalies(model, later, request.options),
          predictWithIntervals(model, rows, { ...options, intervalWidth }),
          predictUncertainty(model, rows, { ...options, intervalWidth }),
        ]),
      );

      if (intervals.kind !== "intervals") {
        throw new Error("Expected interval output");
      }

      expect(report.intervalWidth).toBe(intervalWidth);

      expect(report.rows).toEqual(
        manual.rows.map((row, index) => ({
          timestamp: row.timestamp,
          actual: sorted[index]?.value,
          predicted: row.value,
          lower: intervals.rows[index]?.value.lower,
          upper: intervals.rows[index]?.value.upper,
          position: anomalyPosition(sorted[index]?.value ?? NaN, row.valueInterval),
        })),
      );
    }

    // Narrower ranges can only flag more observations.
    const wide = await Effect.runPromise(detectAnomalies(model, later, options));

    const narrow = await Effect.runPromise(
      detectAnomalies(model, later, { ...options, intervalWidth: 0.5 }),
    );

    expect(narrow.anomalies.length).toBeGreaterThanOrEqual(wide.anomalies.length);
  });

  it("treats values exactly on a bound as within, and just past it as anomalous", async () => {
    const model = await fitBaseline();
    const timestamps = [day(60), day(61)] as const;
    const probe = timestamps.map((timestamp) => ({ timestamp, value: 0 }));
    const baseline = await Effect.runPromise(detectAnomalies(model, probe, options));
    const [first, second] = baseline.rows;

    if (first === undefined || second === undefined) {
      throw new Error("Expected two assessments");
    }

    // The ranges depend on the rows and seed, not on the observed values.
    const onBounds = await Effect.runPromise(
      detectAnomalies(
        model,
        [
          { timestamp: timestamps[0], value: first.lower },
          { timestamp: timestamps[1], value: second.upper },
        ],
        options,
      ),
    );

    expect(onBounds.rows.map((row) => row.position)).toEqual(["within", "within"]);
    expect(onBounds.anomalies).toEqual([]);

    const pastBounds = await Effect.runPromise(
      detectAnomalies(
        model,
        [
          { timestamp: timestamps[0], value: first.lower - 1e-9 },
          { timestamp: timestamps[1], value: second.upper + 1e-9 },
        ],
        options,
      ),
    );

    expect(pastBounds.rows.map((row) => row.position)).toEqual(["below", "above"]);
  });

  it("keeps tied observations' own regressors, capacities and conditions", async () => {
    const regressorHistory = Array.from({ length: 12 }, (_, offset) => {
      const promotion = offset % 3 === 0 ? 1 : 0;

      return {
        timestamp: day(offset),
        value: 5 + offset * 0.2 + promotion * 3 + noise(offset) * 0.1,
        regressors: { promotion },
      };
    });

    const logisticHistory = [1.2, 2.2, 4.2, 6.1, 7.6, 8.9].map((value, offset) => ({
      timestamp: day(offset),
      value,
      capacity: 10,
    }));

    const conditionalHistory = Array.from({ length: 14 }, (_, offset) => {
      const onSeason = offset % 3 !== 1;

      return {
        timestamp: day(offset),
        value: 10 + offset * 0.15 + (onSeason ? Math.sin((2 * Math.PI * offset) / 7) * 2 : 0),
        conditions: { onSeason },
      };
    });

    const [regressor, logistic, conditional] = await Effect.runPromise(
      Effect.all([
        fit(regressorHistory, { regressors: [{ name: "promotion", priorScale: 100 }] }),
        fit(logisticHistory, {
          growth: "logistic",
          map: { changepoints: { mode: "explicit", timestamps: [day(2)] } },
        }),
        fit(conditionalHistory, {
          map: { changepoints: { mode: "explicit", timestamps: [] } },
          seasonalities: [
            {
              name: "weekly-on-season",
              periodDays: 7,
              fourierOrder: 2,
              priorScale: 20,
              conditionName: "onSeason",
            },
          ],
        }),
      ]).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const cases: ReadonlyArray<{
      readonly model: FittedProphet;
      readonly tied: readonly [EncodedObservation, EncodedObservation];
    }> = [
      {
        model: regressor,
        tied: [
          { timestamp: day(13), value: 8, regressors: { promotion: 1 } },
          { timestamp: day(13), value: 8, regressors: { promotion: 0 } },
        ],
      },
      {
        model: logistic,
        tied: [
          { timestamp: day(7), value: 9, capacity: 20 },
          { timestamp: day(7), value: 9, capacity: 10 },
        ],
      },
      {
        model: conditional,
        tied: [
          { timestamp: day(16), value: 12, conditions: { onSeason: true } },
          { timestamp: day(16), value: 12, conditions: { onSeason: false } },
        ],
      },
    ];

    for (const { model, tied } of cases) {
      const earlier = { ...tied[1], timestamp: day(5) };
      const input: EncodedObservations = [tied[0], earlier, tied[1]];
      const report = await Effect.runPromise(detectAnomalies(model, input, options));

      const manual = await Effect.runPromise(
        predictWithIntervals(
          model,
          [earlier, tied[0], tied[1]].map(({ value: _value, ...row }) => row),
          { ...options, intervalWidth: 0.99 },
        ),
      );

      expect(report.rows.map((row) => row.timestamp)).toEqual([
        Date.parse(day(5)),
        Date.parse(tied[0].timestamp),
        Date.parse(tied[1].timestamp),
      ]);

      expect(report.rows.map((row) => row.predicted)).toEqual(manual.rows.map((row) => row.value));
      expect(report.rows[1]?.predicted).not.toBe(report.rows[2]?.predicted);
    }
  });

  it("replays by seed without refitting or mutating its inputs", async () => {
    const model = await fitBaseline();
    const input = later.map((row) => ({ ...row }));
    const before = structuredClone({ model, input, options });

    // No fitting backend is provided: assessment can only predict.
    const first = await Effect.runPromise(detectAnomalies(model, input, options));
    const again = await Effect.runPromise(detectAnomalies(model, input, options));

    const reseeded = await Effect.runPromise(
      detectAnomalies(model, input, { ...options, seed: 12 }),
    );

    expect(again).toEqual(first);
    expect(reseeded.rows.map((row) => row.lower)).not.toEqual(first.rows.map((row) => row.lower));
    expect({ model, input, options }).toEqual(before);

    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.rows)).toBe(true);
    expect(Object.isFrozen(first.rows[0])).toBe(true);
    expect(Object.isFrozen(first.anomalies)).toBe(true);
  });

  it("keeps observation, option, model and simulation failure precedence", async () => {
    const model = await fitBaseline();

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected linear MAP model");
    }

    for (const input of [[], [{ timestamp: "bad", value: 1 }], [{ timestamp: day(60) }]]) {
      const error = await Effect.runPromise(
        Effect.flip(detectAnomalies(model, JSON.parse(JSON.stringify(input)), { seed: -1 })),
      );

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error).toMatchObject({ input: "observations" });
    }

    for (const request of [{ seed: -1 }, { seed: 1, intervalWidth: 1 }, { seed: 1, typo: 1 }]) {
      const error = await Effect.runPromise(
        Effect.flip(detectAnomalies(model, later, JSON.parse(JSON.stringify(request)))),
      );

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error).toMatchObject({ input: "uncertainty-options" });
    }

    const samples = await Effect.runPromise(
      Effect.flip(detectAnomalies(model, later, JSON.parse('{"seed":1,"output":"samples"}'))),
    );

    expect(samples).toBeInstanceOf(InputValidationError);
    expect(samples).toMatchObject({ issues: [{ path: ["output"] }] });

    const invalidModel = await Effect.runPromise(
      Effect.flip(detectAnomalies({ ...model, noiseScale: -1 }, later, options)),
    );

    expect(invalidModel).toBeInstanceOf(PredictionError);
    expect(invalidModel).toMatchObject({ reason: "invalid-model" });

    const capacity = await Effect.runPromise(
      Effect.flip(detectAnomalies(model, [{ timestamp: day(60), value: 1, capacity: 5 }], options)),
    );

    expect(capacity).toBeInstanceOf(InputValidationError);

    const row = { timestamp: day(60), value: 1 };
    const tooMany: EncodedObservations = [row, ...Array.from({ length: 10_000 }, () => row)];

    const budget = await Effect.runPromise(
      Effect.flip(
        detectAnomalies(model, tooMany, {
          seed: 1,
          samples: 1,
        }),
      ),
    );

    expect(budget).toBeInstanceOf(PredictionError);
    expect(budget).toMatchObject({ reason: "simulation-limit" });
  });

  it("ends one safe trace that predicts and never fits", async () => {
    const model = await fitBaseline();
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      detectAnomalies(model, later, options).pipe(
        Effect.withSpan("monitor.job"),
        Effect.withTracer(tracer),
      ),
    );

    const span = (name: string) => {
      const found = spans.find((candidate) => candidate.name === name);

      if (found === undefined) {
        throw new Error(`Expected ${name}`);
      }

      return found;
    };

    const parentOf = (child: ReturnType<typeof span>) =>
      child.parent.pipe(Option.getOrUndefined)?.spanId;

    const job = span("monitor.job");
    const operation = span("Prophet.detectAnomalies");
    const decode = span("Prophet.decodeObservations");
    const intervals = span("Prophet.predictWithIntervals");
    const simulate = span("effect-prophet.wasm.simulate");
    const engine = span("effect-prophet.wasm.predict");

    expect(parentOf(operation)).toBe(job.spanId);
    expect(parentOf(decode)).toBe(operation.spanId);
    expect(parentOf(intervals)).toBe(operation.spanId);
    expect(parentOf(span("Prophet.predictUncertainty"))).toBe(intervals.spanId);
    expect(parentOf(span("Prophet.predict"))).toBe(intervals.spanId);

    const operationStatus = requireEndedSpan(operation);

    for (const child of [decode, intervals, simulate, engine]) {
      const status = requireEndedSpan(child);

      expect(child.traceId).toBe(job.traceId);
      expect(Exit.isSuccess(status.exit)).toBe(true);
      expect(status.startTime).toBeGreaterThanOrEqual(operationStatus.startTime);
      expect(status.endTime).toBeLessThanOrEqual(operationStatus.endTime);
    }

    expect(Exit.isSuccess(operationStatus.exit)).toBe(true);

    expect(Object.fromEntries(operation.attributes)).toEqual({
      "effect_prophet.observation.count": 4,
      "effect_prophet.anomaly.count": 2,
    });

    expect(spans.some((candidate) => candidate.name.includes("fit"))).toBe(false);
  });

  it("ends a failed span and starts no engine work on pre-boundary failures", async () => {
    const model = await fitBaseline();

    if (model.model !== "linear-piecewise-map") {
      throw new Error("Expected linear MAP model");
    }

    const { spans, tracer } = collectTestSpans();

    const failed = await Effect.runPromise(
      detectAnomalies({ ...model, noiseScale: -1 }, later, options).pipe(
        Effect.withTracer(tracer),
        Effect.exit,
      ),
    );

    const operation = spans.find((span) => span.name === "Prophet.detectAnomalies");
    const status = operation === undefined ? undefined : requireEndedSpan(operation);

    expect(Exit.isFailure(failed)).toBe(true);
    expect(status !== undefined && Exit.isFailure(status.exit)).toBe(true);
    expect(operation === undefined ? undefined : Object.fromEntries(operation.attributes)).toEqual(
      {},
    );

    expect(spans.filter((span) => span.name.startsWith("effect-prophet.wasm."))).toEqual([]);

    spans.length = 0;

    for (const request of [
      detectAnomalies(model, JSON.parse("[]"), options),
      detectAnomalies(model, later, { seed: -1 }),
      detectAnomalies(model, later, JSON.parse('{"seed":1,"output":"samples"}')),
    ]) {
      await Effect.runPromise(request.pipe(Effect.withTracer(tracer), Effect.exit));
    }

    expect(spans.some((span) => span.name === "Prophet.predictWithIntervals")).toBe(false);
    expect(spans.filter((span) => span.name.startsWith("effect-prophet.wasm."))).toEqual([]);
  });
});

// The same history with an in-sample spike on day 20 and dip on day 40.
const incidents = new Map([
  [20, 25],
  [40, -25],
]);

const disturbed = history.map((row, offset) => ({
  ...row,
  value: row.value + (incidents.get(offset) ?? 0),
}));

// One row more than a single simulation accepts.
const tooLong = Array.from({ length: 10_001 }, (_, offset) => ({
  timestamp: new Date(Date.UTC(2000, 0, 1) + offset * 3_600_000).toISOString(),
  value: noise(offset),
}));

const baselineOptions = {
  builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
} as const;

const runAnomalies = (...args: Parameters<typeof anomalies>) =>
  Effect.runPromise(anomalies(...args).pipe(Effect.provide(prophetFittingBackendLayer)));

describe("anomalies", () => {
  it("returns the in-sample spike and dip, and nothing for an undisturbed history", async () => {
    const flagged = await runAnomalies(disturbed, options, baselineOptions);
    const clean = await runAnomalies(history, options, baselineOptions);

    expect(flagged).toEqual([Date.parse(day(20)), Date.parse(day(40))]);
    expect(clean).toEqual([]);
  });

  it("equals fitting the history and comparing it with its own seeded value ranges", async () => {
    for (const intervalWidth of [undefined, 0.1]) {
      const request = intervalWidth === undefined ? options : { ...options, intervalWidth };

      const [flagged, manual] = await Effect.runPromise(
        Effect.gen(function* () {
          const model = yield* fit(disturbed, baselineOptions);

          const intervals = yield* predictUncertainty(
            model,
            disturbed.map(({ timestamp }) => timestamp),
            { ...options, intervalWidth: intervalWidth ?? defaultAnomalyIntervalWidth },
          );

          if (intervals.kind !== "intervals") {
            throw new Error("Expected interval output");
          }

          const expectedFlags = intervals.rows
            .filter((row, index) => {
              const actual = disturbed[index]?.value ?? NaN;

              return actual < row.value.lower || actual > row.value.upper;
            })
            .map((row) => row.timestamp);

          return [yield* anomalies(disturbed, request, baselineOptions), expectedFlags];
        }).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

      expect(flagged).toEqual(manual);
    }

    // Narrower ranges flag more, and omitted model options fall back to fit's defaults.
    const wide = await runAnomalies(disturbed, options, baselineOptions);
    const narrowOptions = { ...options, intervalWidth: 0.1 };
    const narrow = await runAnomalies(disturbed, narrowOptions, baselineOptions);

    const automatic = await runAnomalies(disturbed, options);

    expect(narrow.length).toBeGreaterThan(wide.length);
    expect(wide.every((timestamp) => narrow.includes(timestamp))).toBe(true);
    expect(automatic).toEqual(expect.arrayContaining([...wide]));
  });

  it("orders flags chronologically and keeps one flag per tied row", async () => {
    const tie = history[30];

    if (tie === undefined) {
      throw new Error("Expected a day 30 observation");
    }

    const spike = { ...tie, value: tie.value + 25 };

    for (const tied of [
      [tie, spike],
      [spike, tie],
    ]) {
      const shuffled = [...disturbed.slice(31).reverse(), ...tied, ...disturbed.slice(0, 30)];
      const flagged = await runAnomalies(shuffled, options, baselineOptions);

      expect(flagged).toEqual([Date.parse(day(20)), Date.parse(day(30)), Date.parse(day(40))]);
    }
  });

  it("replays by seed without mutating its inputs", async () => {
    const input = disturbed.map((row) => ({ ...row }));
    const modelOptions = structuredClone(baselineOptions);
    const before = structuredClone({ input, options, modelOptions });

    const first = await runAnomalies(input, options, modelOptions);
    const again = await runAnomalies(input, options, modelOptions);

    expect(again).toEqual(first);
    expect({ input, options, modelOptions }).toEqual(before);
    expect(Object.isFrozen(first)).toBe(true);

    const [seeded, reseeded] = await Effect.runPromise(
      Effect.gen(function* () {
        const model = yield* fit(input, modelOptions);

        return yield* Effect.all([
          detectAnomalies(model, input, options),
          detectAnomalies(model, input, { ...options, seed: 12 }),
        ]);
      }).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    expect(first).toEqual(seeded.anomalies.map((row) => row.timestamp));
    expect(reseeded.rows.map((row) => row.lower)).not.toEqual(seeded.rows.map((row) => row.lower));
  });

  it("keeps input, option, fit and simulation failure precedence", async () => {
    const fail = (...args: Parameters<typeof anomalies>) =>
      Effect.runPromise(
        Effect.flip(anomalies(...args)).pipe(Effect.provide(prophetFittingBackendLayer)),
      );

    for (const input of [[], [{ timestamp: "bad", value: 1 }], [{ timestamp: day(0) }]]) {
      const error = await fail(JSON.parse(JSON.stringify(input)), JSON.parse('{"seed":-1}'));

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error).toMatchObject({ input: "observations" });
    }

    for (const request of [{ seed: -1 }, { seed: 1, intervalWidth: 1 }, { seed: 1, typo: 1 }]) {
      const error = await fail(disturbed, JSON.parse(JSON.stringify(request)), {
        growth: JSON.parse('"sideways"'),
      });

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error).toMatchObject({ input: "uncertainty-options" });
    }

    const samples = await fail(disturbed, JSON.parse('{"seed":1,"output":"samples"}'));

    expect(samples).toBeInstanceOf(InputValidationError);
    expect(samples).toMatchObject({ issues: [{ path: ["output"] }] });

    const modelOptions = await fail(disturbed, options, {
      growth: JSON.parse('"sideways"'),
    });

    expect(modelOptions).toBeInstanceOf(InputValidationError);
    expect(modelOptions).toMatchObject({ input: "options" });

    const single = await fail([{ timestamp: day(0), value: 1 }], options);

    expect(single).toBeInstanceOf(FittingError);
    expect(single).toMatchObject({ reason: "insufficient-observations" });

    const uncapped = await fail(disturbed, options, { growth: "logistic" });

    expect(uncapped).toBeInstanceOf(InputValidationError);

    const capped = await runAnomalies(
      disturbed.map((row) => ({ ...row, capacity: 200 })),
      options,
      { ...baselineOptions, growth: "logistic" },
    );

    expect(capped).toEqual(expect.arrayContaining([Date.parse(day(20)), Date.parse(day(40))]));

    const budget = await fail(tooLong, { seed: 1, samples: 1 });

    expect(budget).toBeInstanceOf(PredictionError);
    expect(budget).toMatchObject({ reason: "simulation-limit" });
  });

  it("ends one safe trace that fits, then checks the same history", async () => {
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      anomalies(disturbed, options, baselineOptions).pipe(
        Effect.withSpan("audit.job"),
        Effect.withTracer(tracer),
        Effect.provide(prophetFittingBackendLayer),
      ),
    );

    const span = (name: string) => {
      const found = spans.find((candidate) => candidate.name === name);

      if (found === undefined) {
        throw new Error(`Expected ${name}`);
      }

      return found;
    };

    const parentOf = (child: ReturnType<typeof span>) =>
      child.parent.pipe(Option.getOrUndefined)?.spanId;

    const job = span("audit.job");
    const operation = span("Prophet.anomalies");
    const fitted = span("Prophet.fit");
    const detected = span("Prophet.detectAnomalies");
    const engineFit = span("effect-prophet.wasm.fit");
    const simulate = span("effect-prophet.wasm.simulate");

    expect(parentOf(operation)).toBe(job.spanId);
    expect(parentOf(fitted)).toBe(operation.spanId);
    expect(parentOf(detected)).toBe(operation.spanId);
    expect(parentOf(engineFit)).toBe(fitted.spanId);

    expect(
      spans.filter((candidate) => parentOf(candidate) === operation.spanId).map(({ name }) => name),
    ).toEqual(["Prophet.decodeObservations", "Prophet.fit", "Prophet.detectAnomalies"]);

    const operationStatus = requireEndedSpan(operation);
    const fitStatus = requireEndedSpan(fitted);
    const detectStatus = requireEndedSpan(detected);

    for (const child of [fitted, detected, engineFit, simulate]) {
      const status = requireEndedSpan(child);

      expect(child.traceId).toBe(job.traceId);
      expect(Exit.isSuccess(status.exit)).toBe(true);
      expect(status.startTime).toBeGreaterThanOrEqual(operationStatus.startTime);
      expect(status.endTime).toBeLessThanOrEqual(operationStatus.endTime);
    }

    expect(fitStatus.endTime).toBeLessThanOrEqual(detectStatus.startTime);
    expect(Exit.isSuccess(operationStatus.exit)).toBe(true);

    expect(Object.fromEntries(operation.attributes)).toEqual({
      "effect_prophet.observation.count": 60,
      "effect_prophet.anomaly.count": 2,
    });
  });

  it("ends a failed span, and fits nothing when validation or the row budget fails", async () => {
    const { spans, tracer } = collectTestSpans();

    const failed = await Effect.runPromise(
      anomalies([{ timestamp: day(0), value: 1 }], options).pipe(
        Effect.withTracer(tracer),
        Effect.provide(prophetFittingBackendLayer),
        Effect.exit,
      ),
    );

    const operation = spans.find((span) => span.name === "Prophet.anomalies");
    const status = operation === undefined ? undefined : requireEndedSpan(operation);

    expect(Exit.isFailure(failed)).toBe(true);
    expect(status !== undefined && Exit.isFailure(status.exit)).toBe(true);
    expect(operation === undefined ? undefined : Object.fromEntries(operation.attributes)).toEqual(
      {},
    );

    expect(spans.some((span) => span.name === "Prophet.detectAnomalies")).toBe(false);

    spans.length = 0;

    for (const request of [
      anomalies(JSON.parse("[]"), options),
      anomalies(disturbed, { seed: -1 }),
      anomalies(disturbed, JSON.parse('{"seed":1,"output":"samples"}')),
      anomalies(tooLong, { seed: 1, samples: 1 }),
    ]) {
      await Effect.runPromise(
        request.pipe(
          Effect.withTracer(tracer),
          Effect.provide(prophetFittingBackendLayer),
          Effect.exit,
        ),
      );
    }

    expect(spans.filter((span) => span.name === "Prophet.anomalies")).toHaveLength(4);
    expect(spans.some((span) => span.name === "Prophet.fit")).toBe(false);
    expect(spans.filter((span) => span.name.startsWith("effect-prophet.wasm."))).toEqual([]);
  });
});
