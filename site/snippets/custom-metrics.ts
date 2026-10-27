import { Effect } from "effect";
import {
  crossValidate,
  performanceMetrics,
  prophetFittingBackendLayer,
  type CustomMetric,
} from "effect-prophet";

const dayMs = 86_400_000;

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const history = Array.from({ length: 120 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 3 * Math.sin(day * 12.9898),
}));

// Total error as a share of the total actual value, so busy days count for more than in `mape`.
const wape = {
  name: "wape",
  reduce: "ratio-of-means",
  score: (row) => [Math.abs(row.actual - row.predicted), Math.abs(row.actual)],
} as const satisfies CustomMetric;

// Nine forecasts in ten miss by no more than this.
const p90Error = {
  name: "p90_error",
  reduce: { kind: "quantile", probability: 0.9 },
  score: (row) => Math.abs(row.actual - row.predicted),
} as const satisfies CustomMetric;

// Forecasting too low costs three times as much as forecasting too high.
const pinball = {
  name: "pinball75",
  reduce: "mean",
  score: (row) => {
    const error = row.actual - row.predicted;

    return Math.max(0.75 * error, -0.25 * error);
  },
} as const satisfies CustomMetric;

const report = await Effect.runPromise(
  Effect.gen(function* () {
    const result = yield* crossValidate(
      history,
      {},
      {
        horizonMs: 14 * dayMs,
        cutoffs: { mode: "generated", initialMs: 60 * dayMs, periodMs: 14 * dayMs },
      },
    );

    return yield* performanceMetrics(result, {
      metrics: ["mae", wape, p90Error, pinball],
      aggregation: { kind: "overall" },
    });
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

if (report.kind === "overall") {
  for (const score of report.bucket.scores) {
    console.log(score.metric, score.value.toFixed(3));
  }
}
