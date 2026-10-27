# Effect Prophet

Time-series forecasting for TypeScript. Give it your history; get back a forecast with the
trend, weekly and yearly patterns, and holidays each broken out.

Effect Prophet uses the same model as [Prophet](https://facebook.github.io/prophet/), Meta's
forecasting library, and is tested against Python Prophet 1.4.0.

- **One peer dependency.** [`effect`](https://effect.website) (`^4.0.0`) is the only package it
  needs, and you install it yourself so your app and this library share one copy.
- **No Stan install.** Prophet's fitting runs on [Stan](https://mc-stan.org/). The parts Prophet
  uses are ported to Rust and compiled to WebAssembly, which ships inside the package.
  Attribution is in [`NOTICE.txt`](rust/prophet-wasm/third-party/NOTICE.txt).

**📖 [Documentation](https://jer-k.github.io/effect-prophet/)**

## Install

```sh
npm install effect-prophet effect
```

Requires Node.js 22.19 or newer.

## Quick start

```ts
import { Effect } from "effect";
import { fit, makeFutureTimestamps, predict, prophetFittingBackendLayer } from "effect-prophet";

// One row per day: a UTC timestamp and a value.
const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: new Date(Date.UTC(2025, 0, 1 + day)).toISOString(),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7),
}));

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history);

    // The seven days after the history, like Python's `make_future_dataframe`.
    const nextWeek = yield* makeFutureTimestamps(history, { periods: 7, includeHistory: false });

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
- Fitting and forecasting in one call
- Uncertainty ranges, on their own or alongside each forecast
- Finding anomalies, in new measurements or across a history
- Saving and loading fitted models, and warm-starting a refit from an earlier one
- Cross-validation, accuracy metrics and choosing between settings
- Tracing built in: every fit and forecast is traced, ready for any OpenTelemetry backend

See the [examples](https://jer-k.github.io/effect-prophet/examples/trend) for each one.

## Tracing built in

Every fit, forecast and evaluation creates [Effect](https://effect.website) spans automatically,
with no changes to how you call the library. Send them to Jaeger, Honeycomb, Grafana Tempo or any
OpenTelemetry backend using Effect's built-in exporter:

```ts
// Continues the quick start: `fit`, `predict`, `history` and `nextWeek` are defined there.
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

## AI disclosure

Effect Prophet is a TypeScript port of Meta's Python [Prophet](https://facebook.github.io/prophet/),
and most of the code was written with AI assistance. The forecasting math is easy to get subtly
wrong, so the project doesn't ask you to take correctness on trust. Results are checked against
Python Prophet itself, and you can see how closely they match in the
[benchmarks](https://jer-k.github.io/effect-prophet/benchmarks/) and the
[accuracy comparison](https://jer-k.github.io/effect-prophet/python/accuracy).

If you find a case where the results differ from Python Prophet, please
[open an issue](https://github.com/jer-k/effect-prophet/issues).

## Contributing

```sh
npm install
npm test          # unit tests (builds the WebAssembly first)
npm run check     # everything CI runs, and more
npm run docs:dev  # documentation site at http://localhost:5173/effect-prophet/
```

Building the WebAssembly requires Rust and [wasm-pack](https://rustwasm.github.io/wasm-pack/).
Comparing against Python requires Docker.

## License

[MIT](LICENSE). Effect Prophet reimplements [Prophet](https://github.com/facebook/prophet) (MIT)
and ports parts of Stan, Eigen, nalgebra and Arm optimized-routines; their notices and license
terms are in [`rust/prophet-wasm/third-party/`](rust/prophet-wasm/third-party/NOTICE.txt) and ship
in the package under `wasm/third-party/`.
