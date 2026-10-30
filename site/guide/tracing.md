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

| Span                                                                                               | Created by                                                                                    |
| -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `Prophet.fit`                                                                                      | `fit`                                                                                         |
| `Prophet.predict`                                                                                  | `predict`                                                                                     |
| `Prophet.predictUncertainty`                                                                       | `predictUncertainty`                                                                          |
| `Prophet.predictWithIntervals`                                                                     | `predictWithIntervals`, around its `Prophet.predictUncertainty` and `Prophet.predict` spans   |
| `Prophet.detectAnomalies`                                                                          | `detectAnomalies`, around `Prophet.decodeObservations` and `Prophet.predictWithIntervals`     |
| `Prophet.residuals`                                                                                | `residuals`, around `Prophet.decodeObservations` and `Prophet.predict`                        |
| `Prophet.forecast`                                                                                 | `forecast`, around `Prophet.decodeObservations`, `Prophet.fit` and `Prophet.predict`          |
| `Prophet.anomalies`                                                                                | `anomalies`, around `Prophet.decodeObservations`, `Prophet.fit` and `Prophet.detectAnomalies` |
| `Prophet.crossValidate`                                                                            | `crossValidate`                                                                               |
| `Prophet.makeFutureTimestamps`                                                                     | `makeFutureTimestamps`                                                                        |
| `Prophet.planRollingOrigin`                                                                        | `planRollingOrigin`                                                                           |
| `Prophet.makeParameterGrid`                                                                        | `makeParameterGrid`, around one `Prophet.decodeOptions` for the base and one per candidate    |
| `Prophet.searchModels`                                                                             | `searchModels`                                                                                |
| `Prophet.evaluateHoldout`                                                                          | `evaluateHoldout`                                                                             |
| `Prophet.crossValidateBaseline`                                                                    | `crossValidateBaseline`                                                                       |
| `Prophet.comparePerformance`                                                                       | `comparePerformance`                                                                          |
| `Prophet.encodeFittedModel`, `Prophet.decodeFittedModel`                                           | Saving and loading models                                                                     |
| `Prophet.encodeEvaluationReport`, `Prophet.decodeEvaluationReport`                                 | Saving and loading evaluation reports                                                         |
| `Prophet.decodeObservations`, `Prophet.decodeOptions`                                              | Checking input, also called inside `fit`                                                      |
| `Prophet.inspectCountryHolidays`                                                                   | `inspectCountryHolidays`                                                                      |
| `Prophet.parseCountryHolidays`                                                                     | Checking a `countryHolidays` selection, inside `decodeOptions` and `inspectCountryHolidays`   |
| `Prophet.parseEventCalendar`, `Prophet.parseRegressorDefinitions`, `Prophet.decodeLinearOptimizer` | Checking settings, inside `decodeOptions`                                                     |

### Regressor models

A regressor [forecast by its own model](../examples/regressors#forecasting-a-regressor) adds a
span for that model's work:

| Span                             | Covers                                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Prophet.fitRegressorModel`      | Fitting one regressor's model inside `Prophet.fit`, with its own `effect-prophet.wasm.fit` span and `Prophet.fit` attributes   |
| `Prophet.predictRegressorModel`  | Forecasting one regressor inside `Prophet.predict`, with its own `effect-prophet.wasm.predict` span                            |
| `Prophet.simulateRegressorModel` | Simulating one regressor's future values inside `Prophet.predictUncertainty`, with its own `effect-prophet.wasm.simulate` span |

Each regressor model is fitted before the main model, so its `effect-prophet.wasm.fit` span comes
first. A prediction whose rows all fall inside the history needs no regressor forecast and creates
no `Prophet.predictRegressorModel` or `Prophet.simulateRegressorModel` span. Options that fail
validation create no `Prophet.fitRegressorModel` span.

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
returns before reaching the engine and creates no engine span. `forecast` checks its history and
future rows before fitting, so malformed rows create no `Prophet.fit` span. `anomalies` also
checks the history's length before fitting, so a history too long to simulate creates no
`Prophet.fit` span.

### Country calendar steps

| Span                                    | Covers                                                                                                                                                |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Prophet.resolveCountryHolidays`        | Resolving a country calendar's dates and coverage for the requested years, inside `fit`, `predict`, `predictUncertainty` and `inspectCountryHolidays` |
| `effect-prophet.calendar.load-snapshot` | Reading and checking a packaged country calendar file, inside a resolution for `fit` or `inspectCountryHolidays`                                      |

Prediction resolves dates from the snapshot saved in the model, so it reads no file and creates no
`effect-prophet.calendar.load-snapshot` span. A malformed selection or year list fails before
resolution and creates no calendar step span; an empty prediction creates none either.

### Attributes

Every attribute name starts with `effect_prophet.`.

**`Prophet.fit`**

| Attribute                                              | Meaning                                                                                                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `seasonality.custom.count`                             | Custom seasonalities you added                                                                                                                  |
| `seasonality.builtin.enabled.count`                    | Built-in seasonalities (yearly, weekly, daily) in use                                                                                           |
| `seasonality.builtin.{yearly,weekly,daily}.resolution` | Why each was used or skipped: `explicitly-enabled`, `automatic-enabled`, `explicitly-disabled`, `insufficient-history` or `sampling-too-sparse` |
| `regressor.count`                                      | Extra factors (regressors). Only present when there are some.                                                                                   |
| `regressor_model.count`                                | Regressors forecast by their own models. Only present when there are some.                                                                      |
| `event.count`                                          | Holidays and events, including country holidays. Only present when there are some.                                                              |
| `seasonality.condition.count`                          | Conditions used by conditional seasonalities. Only present when there are some.                                                                 |

**`Prophet.makeFutureTimestamps`**

| Attribute         | Meaning                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| `frequency`       | The `frequency` used, such as `D` or `MS`                                        |
| `timestamp.count` | Timestamps returned, history included. Neither is set when the input is invalid. |

**`Prophet.makeParameterGrid`**

| Attribute         | Meaning                                               |
| ----------------- | ----------------------------------------------------- |
| `axis.count`      | Settings varied. Set only when the grid is valid.     |
| `candidate.count` | Candidates returned. Set only when the grid is valid. |

A grid that is too large, has an empty or repeated setting, or isn't shaped like a grid fails
before any `Prophet.decodeOptions` span.

**`effect-prophet.wasm.fit`**

| Attribute                                                                                              | Meaning                                                                                                     |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `backend.type`, `operation`                                                                            | Always `rust-wasm` and `fit`                                                                                |
| `model.type`, `growth`                                                                                 | `flat-map`, `linear-piecewise-map` or `logistic-piecewise-map`, and the trend type                          |
| `observation.count`                                                                                    | Rows in the history                                                                                         |
| `seasonality.count`, `coefficient.count`                                                               | Seasonal, event and regressor components, and the coefficients behind them                                  |
| `changepoint.count`                                                                                    | Places the trend was allowed to bend. Always `0` for flat trends                                            |
| `parameter.count`                                                                                      | Total values solved for, including one per changepoint for flat trends, which never use them                |
| `scaling.mode`                                                                                         | How values were scaled before fitting                                                                       |
| `component.mode`                                                                                       | `mixed` for multiplicative effects and capped trends; `additive` for flat trends with only additive effects |
| `wasm.cold_start`                                                                                      | `true` only for the call that loaded the engine                                                             |
| `optimizer.requested_algorithm`, `optimizer.max_iterations`, `optimizer.fallback`                      | The optimizer settings you passed in `map.optimizer`, or Prophet's defaults                                 |
| `optimizer.algorithm`, `optimizer.termination`, `optimizer.iteration.count`                            | What ran, why it stopped and how many steps it took                                                         |
| `optimizer.attempt.count`, `optimizer.failed_attempt.iteration.count`, `optimizer.hessian_reset.count` | Retries and recoveries, when the first method fell back to the second                                       |
| `optimizer.initialization`                                                                             | `warm-start` when you passed `map.warmStart`. Only present then.                                            |
| `optimizer.warm_start.delta`, `optimizer.warm_start.beta`                                              | `warm-start`, or `default` when the counts differed. Only present when a warm-started fit ran the optimizer |

**`effect-prophet.wasm.predict` and `effect-prophet.wasm.simulate`**

| Attribute                           | Meaning                                                              |
| ----------------------------------- | -------------------------------------------------------------------- |
| `model.type`, `prediction.count`    | The model and the number of dates forecast                           |
| `seasonality.count`, `scaling.mode` | As for fitting (`predict` only)                                      |
| `output.kind`, `sample.count`       | `intervals` or `samples`, and simulations per date (`simulate` only) |
| `wasm.cold_start`                   | `true` only for the call that loaded the engine                      |

**`Prophet.forecast`**

| Attribute           | Meaning                                                   |
| ------------------- | --------------------------------------------------------- |
| `observation.count` | Rows in the history. Set only when the forecast succeeds. |
| `prediction.count`  | Rows forecast. Set only when the forecast succeeds.       |

**`Prophet.detectAnomalies` and `Prophet.anomalies`**

| Attribute           | Meaning                                                 |
| ------------------- | ------------------------------------------------------- |
| `observation.count` | Measurements checked. Set only when the check succeeds. |
| `anomaly.count`     | Measurements outside their range. Set only on success.  |

**`Prophet.residuals`**

| Attribute           | Meaning                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `observation.count` | Measurements compared. Set only when every residual is computed. |

**Country calendars**

| Span                                    | Attributes                                                                                                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Prophet.resolveCountryHolidays`        | `calendar.source` (`bundled` from the package, `embedded` from a fitted model), `calendar.coverage`, `calendar.year.count`, `calendar.occurrence.count`, `calendar.issue.count` |
| `effect-prophet.calendar.load-snapshot` | `calendar.source` (always `bundled`), `calendar.name.count`, `calendar.partition.count`                                                                                         |

`calendar.occurrence.count` and `calendar.issue.count` are set only when resolution succeeds.

**Evaluation**

| Span                                            | Attributes                                                                                                                                                              |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Prophet.crossValidate`, `Prophet.searchModels` | `evaluation.scaling.mode`                                                                                                                                               |
| `effect-prophet.evaluation.fold`                | `operation`, `fold.index`, `fold.count`, `training.count`, `assessment.count`, `growth`, `model.type`, `evaluation.scaling.mode`, `uncertainty.enabled`, `sample.count` |
| `effect-prophet.evaluation.candidate`           | `operation`, `candidate.index`, `candidate.count`, `fold.count`, `objective`, `uncertainty.enabled`, `evaluation.scaling.mode`                                          |
| `effect-prophet.evaluation.holdout`             | `operation`, `growth`, `model.type`, `training.count`, `assessment.count`, `baseline.count`, `uncertainty.enabled`                                                      |

`objective` is the built-in metric name, such as `mae`, or `custom` for a
[custom metric](../examples/cross-validation#your-own-metrics). A custom metric's own name is
never recorded, because you choose it.
