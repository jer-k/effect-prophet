import { Effect } from "effect";
import { makeParameterGrid, prophetFittingBackendLayer, searchModels } from "effect-prophet";

const dayMs = 86_400_000;

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// Growth speeds up on day 70, and a weekly pattern grows with the trend.
const history = Array.from({ length: 120 }, (_, day) => {
  const trend = day < 70 ? 50 + day * 0.2 : 64 + (day - 70) * 1.2;

  return {
    timestamp: date(day),
    value: trend * (1 + 0.1 * Math.sin((2 * Math.PI * day) / 7)) + Math.sin(day * 12.9898),
  };
});

const result = await Effect.runPromise(
  Effect.gen(function* () {
    // Every combination of the values below: 3 × 2 = 6 candidates.
    const candidates = yield* makeParameterGrid({
      base: { builtInSeasonalities: { daily: "off", yearly: "off" } },
      axes: {
        changepointPriorScale: [0.01, 0.1, 0.5],
        seasonalityMode: ["additive", "multiplicative"],
      },
    });

    return yield* searchModels(history, {
      candidates,
      plan: {
        horizonMs: 7 * dayMs,
        cutoffs: { mode: "generated", initialMs: 60 * dayMs, periodMs: 7 * dayMs },
      },
      objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
      failurePolicy: "record",
    });
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const candidate of result.candidates) {
  if (candidate.kind === "success") {
    const { map, seasonalityMode } = candidate.options;

    console.log(
      candidate.id,
      map?.changepointPriorScale,
      seasonalityMode,
      candidate.score.toFixed(3),
    );
  }
}

console.log("best:", result.selected.id);
