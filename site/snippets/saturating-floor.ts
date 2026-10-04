import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// A server's memory use, which can never drop below 2 GB or rise above 16 GB.
const history = Array.from({ length: 120 }, (_, day) => ({
  timestamp: date(day),
  value: 2 + 14 / (1 + Math.exp(-(day - 60) / 12)),
  floor: 2,
  capacity: 16,
}));

// When the history has a floor, every future row needs one as well.
const future = [{ timestamp: date(150), floor: 2, capacity: 16 }];

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history, { growth: "logistic" });

    return yield* predict(model, future);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log(forecast[0]?.value.toFixed(2));
