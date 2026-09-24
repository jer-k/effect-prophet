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

const logisticTraining = [1.2, 2.2, 4.2, 6.1, 7.6, 8.9].map((value, index) => ({
  timestamp: new Date(Date.UTC(2024, 0, index + 1)).toISOString(),
  value,
  capacity: 10,
  floor: -2,
}));

const logistic = await Effect.runPromise(
  fit(logisticTraining, {
    growth: "logistic",
    map: { changepoints: { mode: "explicit", timestamps: ["2024-01-03T00:00:00.000Z"] } },
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

if (logistic.model === "logistic-piecewise-map") {
  const savedLogistic = await Effect.runPromise(encodeFittedModel(logistic));

  const reloaded = await Effect.runPromise(
    decodeFittedModel(JSON.parse(JSON.stringify(savedLogistic))),
  );

  const completeBounds = [
    { timestamp: "2024-01-08T00:00:00.000Z", capacity: 10, floor: -2 },
    { timestamp: "2024-01-08T00:00:00.000Z", capacity: 20, floor: -1 },
  ];

  const logisticBands = await Effect.runPromise(
    predictUncertainty(reloaded, completeBounds, { seed: 42, samples: 512 }),
  );

  if (logisticBands.kind === "intervals") {
    console.log(
      "Bounded trend intervals; observation bands can exceed the bounds:",
      logisticBands.rows,
    );
  }

  // Holdout targets are kept outside fitting and never passed into prediction rows.
  const heldOut = [
    { timestamp: "2024-01-07T00:00:00.000Z", capacity: 10, floor: -2, observed: 9.1 },
    { timestamp: "2024-01-08T00:00:00.000Z", capacity: 10, floor: -2, observed: 9.3 },
  ];

  const heldOutBands = await Effect.runPromise(
    predictUncertainty(
      reloaded,
      heldOut.map(({ timestamp, capacity, floor }) => ({ timestamp, capacity, floor })),
      { seed: 42, samples: 512 },
    ),
  );

  if (heldOutBands.kind === "intervals") {
    const coverage =
      heldOutBands.rows.filter((row, index) => {
        const observed = heldOut[index]?.observed ?? NaN;

        return observed >= row.value.lower && observed <= row.value.upper;
      }).length / heldOut.length;

    console.log(`Two-row illustrative holdout coverage: ${coverage} (not a calibration estimate)`);
  }
}
