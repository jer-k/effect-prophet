import { Effect } from "effect";
import {
  comparePerformance,
  crossValidate,
  crossValidateBaseline,
  prophetFittingBackendLayer,
} from "effect-prophet";

const dayMs = 86_400_000;

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const history = Array.from({ length: 120 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 3 * Math.sin(day * 12.9898),
}));

const comparison = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* crossValidate(
      history,
      {},
      {
        horizonMs: 7 * dayMs,
        cutoffs: { mode: "generated", initialMs: 60 * dayMs, periodMs: 7 * dayMs },
      },
    );

    // Simple rules of thumb, checked on exactly the same days as the model.
    const lastValue = yield* crossValidateBaseline(history, model.plan, {
      kind: "last-observation",
    });

    const sameDayLastWeek = yield* crossValidateBaseline(history, model.plan, {
      kind: "seasonal-naive",
      lagMs: 7 * dayMs,
    });

    return yield* comparePerformance(model, [lastValue, sameDayLastWeek], {
      metrics: ["mae"],
      aggregation: { kind: "overall" },
    });
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

if (comparison.model.kind === "overall") {
  console.log("effect-prophet", comparison.model.bucket.scores[0]?.value.toFixed(2));
}

for (const { baseline, metrics } of comparison.baselines) {
  if (metrics.kind === "overall") {
    console.log(baseline.kind, metrics.bucket.scores[0]?.value.toFixed(2));
  }
}
