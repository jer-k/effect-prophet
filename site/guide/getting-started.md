# Getting started

## Install

```sh
npm install effect-prophet effect
```

Effect Prophet needs **Node.js 22.19 or newer** and is an ES module, so use `import`, not
`require`.

## Your first forecast

Copy this into a file called `forecast.ts`:

<<< @/snippets/quick-start.ts

Run it:

```sh
node forecast.ts
```

You should see a forecast for each of the next seven days:

```txt
2025-04-01 137.2
2025-04-02 145.5
2025-04-03 153.8
2025-04-04 156.2
2025-04-05 151.3
2025-04-06 143.2
2025-04-07 138.3
```

The numbers rise and fall through the week because the model found the weekly pattern in the
history on its own.

## What just happened?

1. **History.** Each row has a `timestamp` and a `value`. Timestamps are UTC strings in the exact
   format that `Date.prototype.toISOString()` produces.
2. **Future dates.** You choose which dates to forecast. They can be in the future or the past.
3. **Fit, then predict.** `fit` learns the trend and patterns from your history. `predict` uses
   the fitted model to forecast your chosen dates.
4. **Run.** Steps 1 to 3 only _describe_ the work. `Effect.runPromise` runs it and gives you a
   normal `Promise`. `prophetFittingBackendLayer` supplies the forecasting engine that `fit` needs.

If steps 3 and 4 feel unfamiliar, read [Effect in five minutes](./effect-basics). It is short.

## Next steps

- [Prepare your own data](./your-data)
- [Understand what's in a forecast](./reading-forecasts)
- [Trace your forecasts](./tracing) in Jaeger or any OpenTelemetry backend
- Browse the [examples](../examples/trend)
