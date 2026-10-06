# Tracing

Every fit, forecast and evaluation is traced automatically. You don't add any code to the
library calls: point your app at a tracing backend such as Jaeger, Honeycomb or Grafana Tempo,
and each step shows up there with how long it took and what kind of work it did.

If your app doesn't set up a tracer, nothing is sent anywhere.

## See your first trace

Start [Jaeger](https://www.jaegertracing.io/) locally:

```sh
docker run --rm -p 16686:16686 -p 4318:4318 jaegertracing/jaeger:latest
```

Then send spans to it with Effect's built-in OpenTelemetry exporter. No extra packages are needed:

<<< @/snippets/tracing.ts

Open `http://localhost:16686`, choose the `sales-forecast` service and open the trace:

```txt
weekly-sales-forecast                 your span
├─ Prophet.fit
│  ├─ Prophet.decodeObservations      checking your history
│  ├─ Prophet.decodeOptions           checking your settings
│  └─ effect-prophet.wasm.fit         the forecasting engine fitting the model
└─ Prophet.predict
   └─ effect-prophet.wasm.predict     the forecasting engine computing the forecast
```

Spans from Effect Prophet join whatever trace is already active. Wrap your own work in
`Effect.withSpan`, as above, and the forecast appears as part of your request, job or pipeline.
Any tracer you give Effect works the same way, including one your app already provides.

## Why was this fit slow?

The engine runs as one step, so a trace has no spans _inside_ it. Instead, the
`effect-prophet.wasm.fit` span records what the engine did. For example:

| Attribute                   | Value              | What it tells you                                            |
| --------------------------- | ------------------ | ------------------------------------------------------------ |
| `observation.count`         | `90`               | Rows in the history                                          |
| `changepoint.count`         | `25`               | Places the trend was allowed to bend                         |
| `parameter.count`           | `33`               | Values the engine had to solve for                           |
| `optimizer.algorithm`       | `newton`           | The solving method that ran                                  |
| `optimizer.iteration.count` | `600`              | Solving steps taken                                          |
| `optimizer.termination`     | `objective-change` | Why it stopped. `iteration-limit` means it ran out of steps. |
| `wasm.cold_start`           | `true`             | This call also loaded the engine, which only happens once    |

(Every attribute name starts with `effect_prophet.`, left off here to keep the table short.)

Fitting time is roughly the number of steps times the cost of each step. The cost of a step grows
with `parameter.count`, and the 25 default changepoints are often a large share of the parameters.
With the default settings, histories under 100 rows use Newton's method, whose steps get expensive
as parameters grow.

The number of steps is usually a few dozen to a few hundred. A count much higher than that, as in
the example above, usually means the data has almost no noise: a perfectly smooth synthetic series
can be fitted exactly, so the solver keeps shrinking its noise estimate toward zero, one step at a
time. Python Prophet does the same on such data. Real data rarely triggers this. If yours does,
fewer changepoints (see [Trends and changepoints](../examples/trend)) make each step cheaper. Let
the trace tell you whether it helped.

The first engine call in a process also loads the engine. `wasm.cold_start` marks that call so
the one-time cost isn't mistaken for a slow fit.

## What is never recorded

Spans contain only counts and fixed labels, such as `growth: "linear"` or
`optimizer.algorithm: "newton"`. They never contain:

- your values, timestamps or forecasts
- regressor, event or seasonality names
- fitted coefficients or other model internals
- error messages, stack traces or seeds

That makes traces safe to send to a shared backend, even when your data is sensitive.

## Span reference

### Operations

Each of these functions creates a span named after it:

| Span                                                                                               | Created by                                |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `Prophet.fit`                                                                                      | `fit`                                     |
| `Prophet.predict`                                                                                  | `predict`                                 |
| `Prophet.predictUncertainty`                                                                       | `predictUncertainty`                      |
| `Prophet.crossValidate`                                                                            | `crossValidate`                           |
| `Prophet.planRollingOrigin`                                                                        | `planRollingOrigin`                       |
| `Prophet.searchModels`                                                                             | `searchModels`                            |
| `Prophet.evaluateHoldout`                                                                          | `evaluateHoldout`                         |
| `Prophet.crossValidateBaseline`                                                                    | `crossValidateBaseline`                   |
| `Prophet.comparePerformance`                                                                       | `comparePerformance`                      |
| `Prophet.encodeFittedModel`, `Prophet.decodeFittedModel`                                           | Saving and loading models                 |
| `Prophet.encodeEvaluationReport`, `Prophet.decodeEvaluationReport`                                 | Saving and loading evaluation reports     |
| `Prophet.decodeObservations`, `Prophet.decodeOptions`                                              | Checking input, also called inside `fit`  |
| `Prophet.parseEventCalendar`, `Prophet.parseRegressorDefinitions`, `Prophet.decodeLinearOptimizer` | Checking settings, inside `decodeOptions` |

### Engine and evaluation steps

| Span                                  | Covers                                                          |
| ------------------------------------- | --------------------------------------------------------------- |
| `effect-prophet.wasm.fit`             | Fitting in the engine, including loading it and reading results |
| `effect-prophet.wasm.predict`         | Computing a forecast in the engine                              |
| `effect-prophet.wasm.simulate`        | Simulating uncertainty ranges in the engine                     |
| `effect-prophet.evaluation.fold`      | One cross-validation fold: a fit and a forecast                 |
| `effect-prophet.evaluation.candidate` | One candidate setting during `searchModels`                     |
| `effect-prophet.evaluation.holdout`   | The final check in `evaluateHoldout`                            |

Input that fails validation, or a request with nothing to do, such as an empty list of dates,
returns before reaching the engine and creates no engine span.

### Attributes

Every attribute name starts with `effect_prophet.`.

**`Prophet.fit`**

| Attribute                                              | Meaning                                                                                                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `seasonality.custom.count`                             | Custom seasonalities you added                                                                                                                  |
| `seasonality.builtin.enabled.count`                    | Built-in seasonalities (yearly, weekly, daily) in use                                                                                           |
| `seasonality.builtin.{yearly,weekly,daily}.resolution` | Why each was used or skipped: `explicitly-enabled`, `automatic-enabled`, `explicitly-disabled`, `insufficient-history` or `sampling-too-sparse` |
| `regressor.count`                                      | Extra factors (regressors). Only present when there are some.                                                                                   |
| `event.count`                                          | Holidays and events. Only present when there are some.                                                                                          |
| `seasonality.condition.count`                          | Conditions used by conditional seasonalities. Only present when there are some.                                                                 |

**`effect-prophet.wasm.fit`**

| Attribute                                                                                              | Meaning                                                                                                     |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `backend.type`, `operation`                                                                            | Always `rust-wasm` and `fit`                                                                                |
| `model.type`, `growth`                                                                                 | `flat-map`, `linear-piecewise-map` or `logistic-piecewise-map`, and the trend type                          |
| `observation.count`                                                                                    | Rows in the history                                                                                         |
| `seasonality.count`, `coefficient.count`                                                               | Seasonal, event and regressor components, and the coefficients behind them                                  |
| `changepoint.count`, `parameter.count`                                                                 | Changepoints and total values solved for, as fitted                                                         |
| `scaling.mode`                                                                                         | How values were scaled before fitting                                                                       |
| `component.mode`                                                                                       | `mixed` for multiplicative effects and capped trends; `additive` for flat trends with only additive effects |
| `wasm.cold_start`                                                                                      | `true` only for the call that loaded the engine                                                             |
| `optimizer.requested_algorithm`, `optimizer.max_iterations`, `optimizer.fallback`                      | The optimizer settings you passed in `map.optimizer`, or Prophet's defaults                                 |
| `optimizer.algorithm`, `optimizer.termination`, `optimizer.iteration.count`                            | What ran, why it stopped and how many steps it took                                                         |
| `optimizer.attempt.count`, `optimizer.failed_attempt.iteration.count`, `optimizer.hessian_reset.count` | Retries and recoveries, when the first method fell back to the second                                       |

**`effect-prophet.wasm.predict` and `effect-prophet.wasm.simulate`**

| Attribute                           | Meaning                                                              |
| ----------------------------------- | -------------------------------------------------------------------- |
| `model.type`, `prediction.count`    | The model and the number of dates forecast                           |
| `seasonality.count`, `scaling.mode` | As for fitting (`predict` only)                                      |
| `output.kind`, `sample.count`       | `intervals` or `samples`, and simulations per date (`simulate` only) |
| `wasm.cold_start`                   | `true` only for the call that loaded the engine                      |

**Evaluation**

| Span                                            | Attributes                                                                                                                                                              |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Prophet.crossValidate`, `Prophet.searchModels` | `evaluation.scaling.mode`                                                                                                                                               |
| `effect-prophet.evaluation.fold`                | `operation`, `fold.index`, `fold.count`, `training.count`, `assessment.count`, `growth`, `model.type`, `evaluation.scaling.mode`, `uncertainty.enabled`, `sample.count` |
| `effect-prophet.evaluation.candidate`           | `operation`, `candidate.index`, `candidate.count`, `fold.count`, `objective`, `uncertainty.enabled`, `evaluation.scaling.mode`                                          |
| `effect-prophet.evaluation.holdout`             | `operation`, `growth`, `model.type`, `training.count`, `assessment.count`, `baseline.count`, `uncertainty.enabled`                                                      |
