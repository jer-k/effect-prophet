import { Effect } from "effect";
import { prophetFittingBackendLayer, searchModels } from "effect-prophet";

const dayMs = 86_400_000;

const observations = Array.from({ length: 20 }, (_, day) => ({
  timestamp: new Date(Date.UTC(2024, 0, day + 1)).toISOString(),
  value: 4 + day * 0.8 + (day > 9 ? 2 : 0),
}));

const result = await Effect.runPromise(
  searchModels(observations, {
    candidates: [
      {
        id: "cp-none",
        options: { growth: "linear", map: { changepoints: { mode: "explicit", timestamps: [] } } },
      },
      {
        id: "cp-early",
        options: {
          growth: "linear",
          map: {
            changepoints: { mode: "explicit", timestamps: [observations[5]?.timestamp ?? ""] },
            changepointPriorScale: 0.1,
          },
        },
      },
      {
        id: "cp-late",
        options: {
          growth: "linear",
          map: {
            changepoints: { mode: "explicit", timestamps: [observations[9]?.timestamp ?? ""] },
            changepointPriorScale: 1,
          },
        },
      },
    ],
    plan: {
      horizonMs: 2 * dayMs,
      cutoffs: { mode: "generated", initialMs: 8 * dayMs, periodMs: 2 * dayMs },
    },
    objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
    failurePolicy: "record",
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const candidate of result.candidates) {
  if (candidate.kind === "success") {
    console.log(candidate.id, candidate.score);
  } else {
    console.log(candidate.id, candidate.failure.tag);
  }
}

// This is development-fold configuration evidence, not a fitted model or a final quality estimate.
console.log("selected", result.selected.id, result.selected.score);
