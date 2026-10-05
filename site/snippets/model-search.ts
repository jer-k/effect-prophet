import { Effect } from "effect";
import { prophetFittingBackendLayer, searchModels } from "effect-prophet";

const dayMs = 86_400_000;

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const history = Array.from({ length: 120 }, (_, day) => ({
  timestamp: date(day),
  value: (day < 70 ? 50 + day * 0.2 : 64 + (day - 70) * 1.2) + 3 * Math.sin(day * 12.9898),
}));

const result = await Effect.runPromise(
  searchModels(history, {
    // Each candidate is a set of fit options you want to try.
    candidates: [
      { id: "stiff-trend", options: { map: { changepointPriorScale: 0.001 } } },
      { id: "default-trend", options: { map: { changepointPriorScale: 0.05 } } },
      { id: "flexible-trend", options: { map: { changepointPriorScale: 0.5 } } },
    ],
    plan: {
      horizonMs: 7 * dayMs,
      cutoffs: { mode: "generated", initialMs: 60 * dayMs, periodMs: 7 * dayMs },
    },
    objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
    // "record" keeps going if one candidate fails; "fail-fast" stops at the first failure.
    failurePolicy: "record",
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const candidate of result.candidates) {
  if (candidate.kind === "success") {
    console.log(candidate.id, candidate.score.toFixed(3));
  } else {
    console.log(candidate.id, "failed:", candidate.failure.tag);
  }
}

console.log("best:", result.selected.id);
