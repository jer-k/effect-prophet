import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2024, 0, 1 + day)).toISOString();

// Sales jump on sale days and stay a little higher the day after.
const saleDays = new Set(["2024-03-15", "2024-06-14", "2024-09-13"]);

const history = Array.from({ length: 300 }, (_, day) => {
  const today = date(day).slice(0, 10);
  const yesterday = date(day - 1).slice(0, 10);

  return {
    timestamp: date(day),
    value: 500 + day * 0.5 + (saleDays.has(today) ? 300 : 0) + (saleDays.has(yesterday) ? 100 : 0),
  };
});

const model = fit(history, {
  // List every occurrence: past ones to learn from, future ones to forecast.
  events: [
    { name: "flash-sale", date: "2024-03-15", upperWindowDays: 1 },
    { name: "flash-sale", date: "2024-06-14", upperWindowDays: 1 },
    { name: "flash-sale", date: "2024-09-13", upperWindowDays: 1 },
    { name: "flash-sale", date: "2024-12-13", upperWindowDays: 1 },
  ],
});

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    return yield* predict(yield* model, ["2024-12-12T00:00:00.000Z", "2024-12-13T00:00:00.000Z"]);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const row of forecast) {
  const sale = row.events.find((event) => event.name === "flash-sale");
  const effect = sale?.mode === "additive" ? sale.value : 0;

  console.log(
    new Date(row.timestamp).toISOString().slice(0, 10),
    row.value.toFixed(0),
    effect.toFixed(0),
  );
}
