import { Effect } from "effect";
import { fit, prophetFittingBackendLayer, residuals } from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

// Sales grow steadily, then jump on day 60 and stay higher.
const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: date(day),
  value:
    100 +
    day * 0.5 +
    10 * Math.sin((2 * Math.PI * day) / 7) +
    4 * Math.sin(day * 12.9898) +
    (day >= 60 ? 15 : 0),
}));

const rows = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history, {
      map: { changepoints: { mode: "explicit", timestamps: [] } },
    });

    return yield* residuals(model, history);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

// One point per day, ready for any charting library.
const points = rows.map((row) => ({
  date: new Date(row.timestamp).toISOString().slice(0, 10),
  residual: Number(row.residual.toFixed(1)),
}));

console.log(points.slice(0, 3));

// A straight trend can't follow the jump, so the residuals drift instead of centering on zero.
for (const start of [0, 30, 60]) {
  const block = rows.slice(start, start + 30);
  const mean = block.reduce((total, row) => total + row.residual, 0) / block.length;

  console.log(`days ${start}-${start + 29}: mean residual ${mean.toFixed(1)}`);
}
