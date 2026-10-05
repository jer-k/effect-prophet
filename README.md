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
- Tracing built in: every fit and forecast is traced, ready for any OpenTelemetry backend

See the [examples](https://jer-k.github.io/effect-prophet/examples/trend) for each one.

## Tracing built in

Every fit, forecast and evaluation creates [Effect](https://effect.website) spans automatically,
with no changes to how you call the library. Send them to Jaeger, Honeycomb, Grafana Tempo or any
OpenTelemetry backend using Effect's built-in exporter:

```ts
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";
import { OtlpSerialization, OtlpTracer } from "effect/observability";

const tracing = OtlpTracer.layer({
  url: "http://localhost:4318/v1/traces",
  resource: { serviceName: "sales-forecast" },
}).pipe(Layer.provide([OtlpSerialization.layerJson, FetchHttpClient.layer]));

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history);

    return yield* predict(model, nextWeek);
  }).pipe(Effect.provide(prophetFittingBackendLayer), Effect.provide(tracing)),
);
```

Each fit records what the forecasting engine did (rows, changepoints, parameters, solver steps),
so a slow fit explains itself. Spans contain only counts and labels, never your data. See
[Tracing](https://jer-k.github.io/effect-prophet/guide/tracing) for what's recorded.

## Coming from Python Prophet?

Start with [Coming from Python](https://jer-k.github.io/effect-prophet/python/coming-from-python),
then see [how close the results are](https://jer-k.github.io/effect-prophet/python/accuracy).

## Built with AI

This package is a port of Facebook's Python [Prophet](https://facebook.github.io/prophet/) and
was built with the help of AI. Because it is math-heavy, I have done my best to make sure it
behaves the same as the original. The [benchmarks](https://jer-k.github.io/effect-prophet/benchmarks/linear)
and [accuracy comparison](https://jer-k.github.io/effect-prophet/python/accuracy) in the docs
show how closely the results match. If you find a difference, please open an issue.

## Contributing

```sh
npm install
npm test          # unit tests (builds the WebAssembly first)
npm run check     # everything CI runs, and more
npm run docs:dev  # documentation site at http://localhost:5173/effect-prophet/
```

Building the WebAssembly requires Rust and [wasm-pack](https://rustwasm.github.io/wasm-pack/).
Comparing against Python requires Docker.
