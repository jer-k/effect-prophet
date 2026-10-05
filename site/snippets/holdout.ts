import { Effect } from "effect";
import { evaluateHoldout, prophetFittingBackendLayer, searchModels } from "effect-prophet";

const dayMs = 86_400_000;

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const all = Array.from({ length: 140 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 3 * Math.sin(day * 12.9898),
}));

// Lock away the last two weeks. The search never sees them.
const development = all.slice(0, 126);

const holdout = all.slice(126);

const report = await Effect.runPromise(
  Effect.gen(function* () {
    const search = yield* searchModels(development, {
      candidates: [
        { id: "default", options: {} },
        { id: "flexible-trend", options: { map: { changepointPriorScale: 0.5 } } },
      ],
      plan: {
        horizonMs: 14 * dayMs,
        cutoffs: { mode: "generated", initialMs: 60 * dayMs, periodMs: 14 * dayMs },
      },
      objective: { metric: "mae", aggregation: { kind: "overall" }, direction: "minimize" },
      failurePolicy: "record",
    });

    const winner = search.candidates[search.selected.candidateIndex];

    if (winner?.kind !== "success") {
      return yield* Effect.die(new Error("The search did not select a successful candidate"));
    }

    // Fit the winner once on all development data and score it on the locked-away weeks.
    return yield* evaluateHoldout({
      development,
      holdout,
      search,
      selectedCandidate: {
        id: winner.id,
        candidateIndex: winner.candidateIndex,
        options: winner.options,
        score: winner.score,
      },
      metrics: { metrics: ["mae", "rmse"], aggregation: { kind: "overall" } },
      baselines: [{ kind: "last-observation" }],
      provenance: { build: "docs-example", environment: "node" },
    });
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log("selected:", report.selected.id);

console.log(JSON.stringify(report.metrics, null, 2));
