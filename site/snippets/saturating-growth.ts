import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// Sign-ups for a service in a town of 10,000 people: growth slows as it approaches the limit.
const history = Array.from({ length: 150 }, (_, day) => ({
  timestamp: date(day),
  value: 10_000 / (1 + Math.exp(-(day - 90) / 15)),
  capacity: 10_000,
}));

// Every future row needs a capacity too. It can change over time, e.g. if the town grows.
const future = Array.from({ length: 5 }, (_, offset) => ({
  timestamp: date(150 + offset * 30),
  capacity: 10_000,
}));

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history, { growth: "logistic" });

    return yield* predict(model, future);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const row of forecast) {
  console.log(new Date(row.timestamp).toISOString().slice(0, 10), row.value.toFixed(0));
}
