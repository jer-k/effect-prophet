import { Effect } from "effect";
import { detectAnomalies, fit, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const sales = (day: number) =>
  100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7) + 4 * Math.sin(day * 12.9898);

// Train on the first 90 days.
const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: date(day),
  value: sales(day),
}));

// Then check the next week's measurements: an outage on day 3 and a spike on day 6.
const incidents = new Map([
  [2, -40],
  [5, 30],
]);

const thisWeek = Array.from({ length: 7 }, (_, offset) => ({
  timestamp: date(90 + offset),
  value: sales(90 + offset) + (incidents.get(offset) ?? 0),
}));

const report = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history);

    return yield* detectAnomalies(model, thisWeek, { seed: 42 });
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const row of report.rows) {
  console.log(
    new Date(row.timestamp).toISOString().slice(0, 10),
    `${row.actual.toFixed(1)}  (99% range ${row.lower.toFixed(1)} to ${row.upper.toFixed(1)})`,
    row.position,
  );
}

console.log(`${report.anomalies.length} of ${report.rows.length} days outside the range`);
