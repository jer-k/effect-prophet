import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer, warmStartParameters } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const sales = (days: number) =>
  Array.from({ length: days }, (_, day) => ({
    timestamp: date(day),
    value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 3 * Math.sin(day * 12.9898),
  }));

const forecasts = await Effect.runPromise(
  Effect.gen(function* () {
    const yesterday = yield* fit(sales(500));

    // A new day of sales arrives. Refit, starting from where yesterday's model ended.
    const warmStart = warmStartParameters(yesterday);
    const today = yield* fit(sales(501), { map: { warmStart } });
    const fresh = yield* fit(sales(501));

    return {
      warm: yield* predict(today, [date(501)]),
      fresh: yield* predict(fresh, [date(501)]),
    };
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log(`warm start:   ${forecasts.warm[0]?.value.toFixed(2)}`);

console.log(`from scratch: ${forecasts.fresh[0]?.value.toFixed(2)}`);
