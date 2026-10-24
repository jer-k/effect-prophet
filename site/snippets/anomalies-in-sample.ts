import { Effect } from "effect";
import { anomalies, prophetFittingBackendLayer } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// An outage on day 40 and a spike on day 70.
const incidents = new Map([
  [40, -40],
  [70, 30],
]);

const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: date(day),
  value:
    100 +
    day * 0.5 +
    10 * Math.sin((2 * Math.PI * day) / 7) +
    4 * Math.sin(day * 12.9898) +
    (incidents.get(day) ?? 0),
}));

// Fit the whole history, then flag the days outside their own 99% range.
const flagged = await Effect.runPromise(
  anomalies(history, { seed: 42 }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

for (const timestamp of flagged) {
  console.log(new Date(timestamp).toISOString().slice(0, 10));
}
