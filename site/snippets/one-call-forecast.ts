import { Effect } from "effect";
import { forecast, prophetFittingBackendLayer } from "effect-prophet";

const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: new Date(Date.UTC(2025, 0, 1 + day)).toISOString(),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7),
}));

const nextWeek = Array.from({ length: 7 }, (_, offset) =>
  new Date(Date.UTC(2025, 0, 91 + offset)).toISOString(),
);

// Fit the history and forecast next week in one call.
const rows = await Effect.runPromise(
  forecast(history, nextWeek).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const row of rows) {
  console.log(new Date(row.timestamp).toISOString().slice(0, 10), row.value.toFixed(1));
}
