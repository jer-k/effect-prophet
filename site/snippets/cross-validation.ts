import { Effect } from "effect";
import { crossValidate, performanceMetrics, prophetFittingBackendLayer } from "effect-prophet";

const dayMs = 86_400_000;

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const history = Array.from({ length: 120 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 3 * Math.sin(day * 12.9898),
}));

const report = await Effect.runPromise(
  Effect.gen(function* () {
    // Train on the first 60 days, forecast the next 14, step forward and repeat.
    const result = yield* crossValidate(
      history,
      {},
      {
        horizonMs: 14 * dayMs,
        cutoffs: { mode: "generated", initialMs: 60 * dayMs, periodMs: 14 * dayMs },
      },
    );

    console.log(`${result.folds.length} rounds, ${result.rows.length} forecasts checked`);

    return yield* performanceMetrics(result, {
      metrics: ["mae", "rmse", "mape"],
      aggregation: { kind: "overall" },
    });
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

if (report.kind === "overall") {
  for (const score of report.bucket.scores) {
    console.log(score.metric, score.value.toFixed(3));
  }
}
