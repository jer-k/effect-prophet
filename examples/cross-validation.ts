import { Effect } from "effect";
import {
  crossValidate,
  prophetFittingBackendLayer,
  type CrossValidationResult,
} from "effect-prophet";

const observations = Array.from({ length: 10 }, (_, day) => ({
  timestamp: new Date(Date.UTC(2024, 0, day + 1)).toISOString(),
  value: 4 + day * 0.5,
}));

const result = await Effect.runPromise(
  crossValidate(
    observations,
    {},
    {
      horizonMs: 2 * 86_400_000,
      cutoffs: { mode: "generated", initialMs: 4 * 86_400_000 },
    },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log(
  result.folds.map(({ cutoff, trainingCount, assessmentCount, model }) => ({
    cutoff: new Date(cutoff).toISOString(),
    trainingCount,
    assessmentCount,
    model,
  })),
);

console.log(
  result.rows.map(({ fold, horizonMs, actual, predicted }) => ({
    fold,
    horizonMs,
    actual,
    predicted,
  })),
);

const intervalResult: CrossValidationResult = await Effect.runPromise(
  crossValidate(
    observations,
    { map: { changepoints: { mode: "explicit", timestamps: [] } } },
    {
      horizonMs: 2 * 86_400_000,
      cutoffs: { mode: "explicit", timestamps: [observations[4]?.timestamp ?? ""] },
    },
    { mode: "intervals", uncertainty: { seed: 19, samples: 32 } },
  ).pipe(Effect.provide(prophetFittingBackendLayer)),
);

if (intervalResult.kind === "intervals") {
  console.log(
    intervalResult.rows.map(({ fold, actual, predicted, lower, upper }) => ({
      fold,
      actual,
      predicted,
      lower,
      upper,
    })),
  );
}
