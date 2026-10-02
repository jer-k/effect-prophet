# effect-prophet

```ts
import { readFile, writeFile } from "node:fs/promises";
import { Effect } from "effect";
import {
  crossValidate,
  decodeFittedModel,
  encodeFittedModel,
  fit,
  getRegressorCoefficients,
  performanceMetrics,
  predict,
  predictUncertainty,
  prophetFittingBackendLayer,
  searchModels,
} from "effect-prophet";

const dayMs = 86_400_000;

const observations = Array.from({ length: 56 }, (_, day) => ({
  timestamp: new Date(Date.UTC(2025, 0, day + 1)).toISOString(),
  value: 20 + day * 0.25 + 4 * Math.sin((2 * Math.PI * day) / 7),
}));

const futureTimestamps = Array.from({ length: 7 }, (_, offset) =>
  new Date(Date.UTC(2025, 1, 26 + offset)).toISOString(),
);
```

## Linear Growth

`fit` validates complete rows, stably sorts decoded training observations, and retains every duplicate timestamp without mutating caller data. Prediction preserves requested order and duplicates. Featureless `fit(observations)` uses OLS, not Python Prophet's default MAP objective; use explicit `map` controls for comparable MAP fitting. See the [compatibility contract](docs/compatibility/prophet-1.4.0.md) and [migration edge cases](benchmark/cases/growth/linear/README.md). The [original run](benchmark/results/retained/linear-growth-training-rows/2026-09-30T224402-292Z-4d661a06/README.md) preserves the former coordinate-optimizer exhaustion. The [Stan fit-quality closeout](benchmark/results/retained/linear-map-fit-quality/2026-10-02T043132-582Z-4d661a06/README.md) passes all 22 usable comparisons, with two zero-span linear exceptions. Stationarity remains diagnostic-only under EP-097; blanket compatibility and small-KKT-residual claims are not made.

```ts
const model = await Effect.runPromise(
  fit(observations).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, futureTimestamps));

console.log(forecast);
```

### Changepoints

```ts
const model = await Effect.runPromise(
  fit(observations, {
    map: {
      changepoints: {
        mode: "explicit",
        timestamps: ["2025-01-29T00:00:00.000Z"],
      },
      changepointPriorScale: 0.2,
    },
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, futureTimestamps));
```

```ts
const model = await Effect.runPromise(
  fit(observations, {
    seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 3 }],
    map: {
      changepoints: { mode: "auto", count: 25, range: 0.8 },
    },
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);
```

### Weekly Seasonality with Changepoints

```ts
const benchmarkDataset = JSON.parse(
  await readFile("benchmark/inputs/v1/map-irregular-medium.json", "utf8"),
) as {
  readonly observations: ReadonlyArray<{ readonly timestamp: string; readonly value: number }>;
  readonly predictionRows: ReadonlyArray<{ readonly timestamp: string }>;
};

const benchmarkModel = await Effect.runPromise(
  fit(benchmarkDataset.observations, {
    seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 3 }],
    map: {
      changepoints: {
        mode: "explicit",
        timestamps: ["2020-03-26T00:00:00.000Z", "2020-06-09T00:00:00.000Z"],
      },
      changepointPriorScale: 0.2,
    },
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const benchmarkForecast = await Effect.runPromise(
  predict(benchmarkModel, benchmarkDataset.predictionRows),
);

console.log(benchmarkForecast);
```

## Seasonalities

### Built-in Weekly Seasonality

```ts
const model = await Effect.runPromise(
  fit(observations, {
    builtInSeasonalities: { weekly: "auto" },
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, futureTimestamps));

console.log(
  forecast.map(({ timestamp, value, trend, seasonalities }) => ({
    timestamp,
    value,
    trend,
    seasonalities,
  })),
);
```

### Custom Seasonality

```ts
const model = await Effect.runPromise(
  fit(observations, {
    seasonalities: [
      { name: "weekly-custom", periodDays: 7, fourierOrder: 3 },
      { name: "monthly", periodDays: 30.5, fourierOrder: 5 },
    ],
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, futureTimestamps));
```

### Conditional Seasonality

```ts
const seasonalObservations = observations.map((row, day) => ({
  ...row,
  conditions: { active: day % 7 < 5 },
}));

const seasonalFuture = futureTimestamps.map((timestamp, offset) => ({
  timestamp,
  conditions: { active: offset < 5 },
}));

const model = await Effect.runPromise(
  fit(seasonalObservations, {
    seasonalities: [
      {
        name: "weekday-weekly",
        periodDays: 7,
        fourierOrder: 3,
        conditionName: "active",
      },
    ],
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, seasonalFuture));
```

## Events

```ts
const observationsWithEvents = observations.map((row) => ({ ...row }));

const model = await Effect.runPromise(
  fit(observationsWithEvents, {
    events: [
      { name: "launch", date: "2025-01-15", lowerWindowDays: 0, upperWindowDays: 2 },
      { name: "launch", date: "2025-02-10", lowerWindowDays: 0, upperWindowDays: 2 },
    ],
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, futureTimestamps));
```

## Regressors

```ts
const trainingWithPromotion = observations.map((row, day) => ({
  ...row,
  regressors: { promotion: day % 7 === 0 ? 1 : 0 },
}));

const futureWithPromotion = futureTimestamps.map((timestamp, offset) => ({
  timestamp,
  regressors: { promotion: offset === 2 ? 1 : 0 },
}));

const model = await Effect.runPromise(
  fit(trainingWithPromotion, {
    regressors: [{ name: "promotion", standardization: "auto" }],
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, futureWithPromotion));

console.log(getRegressorCoefficients(model));
```

## Components

### Multiplicative Components

```ts
const model = await Effect.runPromise(
  fit(observations, {
    seasonalityMode: "multiplicative",
    seasonalities: [
      { name: "weekly-custom", periodDays: 7, fourierOrder: 3 },
      { name: "monthly-additive", periodDays: 30.5, fourierOrder: 5, mode: "additive" },
    ],
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, futureTimestamps));
```

## Flat Growth

```ts
const model = await Effect.runPromise(
  fit(observations, {
    growth: "flat",
    seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 3 }],
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, futureTimestamps));
```

## Logistic Growth

```ts
const boundedObservations = observations.map((row) => ({
  ...row,
  value: Math.min(row.value, 100),
  capacity: 100,
  floor: 0,
}));

const boundedFuture = futureTimestamps.map((timestamp) => ({
  timestamp,
  capacity: 100,
  floor: 0,
}));

const model = await Effect.runPromise(
  fit(boundedObservations, {
    growth: "logistic",
    map: {
      changepoints: {
        mode: "explicit",
        timestamps: ["2025-01-29T00:00:00.000Z"],
      },
    },
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const forecast = await Effect.runPromise(predict(model, boundedFuture));
```

## Predictive Intervals

```ts
const model = await Effect.runPromise(
  fit(observations, {
    seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 3 }],
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const intervals = await Effect.runPromise(
  predictUncertainty(model, futureTimestamps, { seed: 42, samples: 500 }),
);

if (intervals.kind === "intervals") {
  console.log(intervals.rows);
}
```

## Save and Load a Model

```ts
const model = await Effect.runPromise(
  fit(observations, {
    seasonalities: [{ name: "weekly-custom", periodDays: 7, fourierOrder: 3 }],
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const encoded = await Effect.runPromise(encodeFittedModel(model));
await writeFile("model.json", JSON.stringify(encoded));

const loaded = await readFile("model.json", "utf8");
const restored = await Effect.runPromise(decodeFittedModel(JSON.parse(loaded)));

const forecast = await Effect.runPromise(predict(restored, futureTimestamps));
```

## Cross-Validation

```ts
const result = await Effect.runPromise(
  crossValidate(
    observations,
    {},
    {
      horizonMs: 7 * dayMs,
      cutoffs: { mode: "generated", initialMs: 28 * dayMs },
    },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log(result.rows);

const metrics = await Effect.runPromise(
  performanceMetrics(result, {
    metrics: ["mae", "rmse"],
    aggregation: { kind: "overall" },
  }),
);

console.log(metrics);
```

## Model Search

```ts
const result = await Effect.runPromise(
  searchModels(observations, {
    candidates: [
      { id: "few-changepoints", options: { map: { changepoints: { mode: "auto", count: 5 } } } },
      { id: "many-changepoints", options: { map: { changepoints: { mode: "auto", count: 20 } } } },
    ],
    plan: {
      horizonMs: 7 * dayMs,
      cutoffs: { mode: "generated", initialMs: 28 * dayMs },
    },
    objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
    failurePolicy: "record",
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log(result.selected);
```

## Benchmark This Example Against Python Prophet

```sh
npm run benchmark -- --case map-seasonal-breaks-irregular-medium
```

| Case                                   | Trend difference | Component difference | Forecast difference | Noise difference | Result                     |
| -------------------------------------- | ---------------: | -------------------: | ------------------: | ---------------: | -------------------------- |
| `map-seasonal-breaks-irregular-medium` |         1.077e-3 |             1.088e-4 |            1.124e-3 |         3.340e-4 | Passed recorded tolerances |

[Benchmark report](benchmark/results/retained/public-api/2026-09-20T224643-979Z-ff2c99b0/report.md)

## Prepare Data

```ts
const sourceRows = [
  { kind: "observed", observation: { timestamp: "2025-01-01T00:00:00.000Z", value: 2 } },
  { kind: "observed", observation: { timestamp: "2025-01-02T00:00:00.000Z", value: 5 } },
  { kind: "missing-target", timestamp: "2025-01-03T00:00:00.000Z" },
  { kind: "observed", observation: { timestamp: "2025-01-04T00:00:00.000Z", value: 8 } },
] as const;

const completeObservations = sourceRows.flatMap((row) =>
  row.kind === "observed" ? [row.observation] : [],
);

const model = await Effect.runPromise(
  fit(completeObservations).pipe(Effect.provide(prophetFittingBackendLayer)),
);
```
