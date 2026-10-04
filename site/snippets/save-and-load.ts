import { readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Effect } from "effect";
import {
  decodeFittedModel,
  encodeFittedModel,
  fit,
  predict,
  prophetFittingBackendLayer,
} from "effect-prophet";

const date = (day: number) => new Date(Date.UTC(2025, 0, 1 + day)).toISOString();

const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: date(day),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7),
}));

const file = join(tmpdir(), "effect-prophet-model.json");

// Train once and save the model as plain JSON.
const model = await Effect.runPromise(
  fit(history).pipe(Effect.provide(prophetFittingBackendLayer)),
);

const encoded = await Effect.runPromise(encodeFittedModel(model));

await writeFile(file, JSON.stringify(encoded));

// Later, maybe in another process: load it and forecast without retraining.
const saved: unknown = JSON.parse(await readFile(file, "utf8"));

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    const restored = yield* decodeFittedModel(saved);

    return yield* predict(restored, [date(90)]);
  }),
);

console.log(forecast[0]?.value.toFixed(2));

await rm(file);
