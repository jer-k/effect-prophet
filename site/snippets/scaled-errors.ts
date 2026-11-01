import { Effect } from "effect";
import {
  crossValidate,
  performanceMetrics,
  prophetFittingBackendLayer,
  scaledErrorMetric,
} from "effect-prophet";

const dayMs = 86_400_000;

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const history = Array.from({ length: 120 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 3 * Math.sin(day * 12.9898),
}));

const report = await Effect.runPromise(
  Effect.gen(function* () {
    const result = yield* crossValidate(
      history,
      {},
      {
        horizonMs: 7 * dayMs,
        cutoffs: { mode: "generated", initialMs: 60 * dayMs, periodMs: 7 * dayMs },
      },
    );

    // Each round's scale comes from the days it trained on.
    const mase = yield* scaledErrorMetric(history, result.plan);

    const maseWeekly = yield* scaledErrorMetric(history, result.plan, {
      name: "mase_weekly",
      lag: { kind: "duration", lagMs: 7 * dayMs },
    });

    return yield* performanceMetrics(result, {
      metrics: ["mae", mase, maseWeekly],
      aggregation: { kind: "overall" },
    });
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

if (report.kind === "overall") {
  for (const { metric, value } of report.bucket.scores) {
    console.log(metric, value.toFixed(3));
  }
}
