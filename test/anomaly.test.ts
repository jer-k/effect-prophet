import { Effect, Exit, Option } from "effect";
import { describe, expect, it } from "vitest";

import {
  InputValidationError,
  PredictionError,
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
