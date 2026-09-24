import { Effect } from "effect";
import {
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predictUncertainty,
  prophetFittingBackendLayer,
} from "effect-prophet";

const observations = [
  { timestamp: "2025-01-01T00:00:00.000Z", value: 2, regressors: { promotion: 0 } },
  { timestamp: "2025-01-02T00:00:00.000Z", value: 4, regressors: { promotion: 1 } },
  { timestamp: "2025-01-03T00:00:00.000Z", value: 3, regressors: { promotion: 0 } },
  { timestamp: "2025-01-04T00:00:00.000Z", value: 5, regressors: { promotion: 1 } },
  { timestamp: "2025-01-05T00:00:00.000Z", value: 4, regressors: { promotion: 0 } },
  { timestamp: "2025-01-06T00:00:00.000Z", value: 6, regressors: { promotion: 1 } },
];

const future = [
  { timestamp: "2025-01-07T00:00:00.000Z", regressors: { promotion: 0 } },
  { timestamp: "2025-01-08T00:00:00.000Z", regressors: { promotion: 1 } },
];

const model = await Effect.runPromise(
  fit(observations, { regressors: [{ name: "promotion" }] }).pipe(
    Effect.provide(prophetFittingBackendLayer),
  ),
);

const saved = await Effect.runPromise(encodeFittedModel(model));

const restored = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(saved))));

const intervals = await Effect.runPromise(predictUncertainty(restored, future, { seed: 42 }));

if (intervals.kind === "intervals") {
  console.log(intervals.rows.map((row) => row.value));
}

const samples = await Effect.runPromise(
  predictUncertainty(restored, future, { seed: 42, samples: 16, output: "samples" }),
);

if (samples.kind === "samples") {
  console.log(`Draws for ${samples.timestamps.length} complete rows: ${samples.value.length}`);
}
