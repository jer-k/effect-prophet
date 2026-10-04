# Effect Prophet

Time-series forecasting for TypeScript. Give it your history; get back a forecast with the
trend, weekly and yearly patterns, and holidays each broken out.

Effect Prophet uses the same model as [Prophet](https://facebook.github.io/prophet/), Meta's
forecasting library, and is tested against Python Prophet 1.4.0. The math runs in WebAssembly,
so there's no Python to install.

**📖 [Documentation](https://jer-k.github.io/effect-prophet/)**

## Install

```sh
npm install effect-prophet effect
```

Requires Node.js 22.19 or newer.

## Quick start

```ts
import { Effect } from "effect";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

// One row per day: a UTC timestamp and a value.
const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: new Date(Date.UTC(2025, 0, 1 + day)).toISOString(),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7),
}));

// The dates you want forecasts for.
const nextWeek = Array.from({ length: 7 }, (_, offset) =>
  new Date(Date.UTC(2025, 0, 91 + offset)).toISOString(),
);

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history);

    return yield* predict(model, nextWeek);
  }).pipe(Effect.provide(prophetFittingBackendLayer)),
);

console.log(forecast.map((row) => row.value));
```

New to [Effect](https://effect.website)? The docs have a
[five-minute introduction](https://jer-k.github.io/effect-prophet/guide/effect-basics).

## What it can do

- Linear, flat and capped (logistic) trends with automatic changepoints
- Weekly, yearly and daily patterns, plus your own custom ones
- Holidays and events, and extra factors such as temperature or ad spend
- Uncertainty ranges
- Saving and loading fitted models
- Cross-validation, accuracy metrics and choosing between settings

See the [examples](https://jer-k.github.io/effect-prophet/examples/trend) for each one.

## Coming from Python Prophet?

Start with [Coming from Python](https://jer-k.github.io/effect-prophet/python/coming-from-python),
then see [how close the results are](https://jer-k.github.io/effect-prophet/python/accuracy).

## Contributing

```sh
npm install
npm test          # unit tests (builds the WebAssembly first)
npm run check     # everything CI runs, and more
npm run docs:dev  # documentation site at http://localhost:5173/effect-prophet/
```

Building the WebAssembly requires Rust and [wasm-pack](https://rustwasm.github.io/wasm-pack/).
Comparing against Python requires Docker.
