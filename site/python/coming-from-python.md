# Coming from Python

Effect Prophet fits the same model as Python Prophet, so the ideas carry over: changepoints,
seasonalities, holidays, regressors, and the same defaults. What changes is the shape of the API.
You pass plain data and options to functions instead of calling methods on a mutable `Prophet`
object.

## A side-by-side example

The Python version of a small forecast:

```python
from prophet import Prophet

model = Prophet(changepoint_prior_scale=0.5, weekly_seasonality=False)
model.fit(df)  # df has `ds` and `y` columns

future = model.make_future_dataframe(periods=7)
forecast = model.predict(future)
print(forecast[["ds", "yhat"]])
```

And the same program here:

<<< @/snippets/from-python.ts

Three differences to notice. `fit` and `predict` return Effects, so you `yield*` them inside
`Effect.gen` and run the result once at the edge. The forecasting engine comes from
`prophetFittingBackendLayer`. And you build the future dates yourself. New to Effect? Start with
the [five-minute introduction](../guide/effect-basics).

## Translation table

### Data

| Python                              | Effect Prophet                                         |
| ----------------------------------- | ------------------------------------------------------ |
| `ds` column                         | `timestamp`: an exact UTC ISO string                   |
| `y` column                          | `value`                                                |
| `cap` and `floor` columns           | `capacity` and `floor` fields on each row              |
| extra regressor columns             | a `regressors: { name: number }` object on each row    |
| condition columns for seasonalities | a `conditions: { name: boolean }` object on each row   |
| `make_future_dataframe(periods=n)`  | build the timestamps yourself, as in the example above |
| dropping `NaN` rows                 | leave the row out; see [Your data](../guide/your-data) |

### Model settings

| Python                                                                            | Effect Prophet                                                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `growth="linear"`, `"flat"`, `"logistic"`                                         | `growth: "linear" \| "flat" \| "logistic"` (linear is the default)                                                  |
| `n_changepoints`, `changepoint_range`                                             | `map.changepoints: { mode: "auto", count, range }`                                                                  |
| `changepoints=[...]`                                                              | `map.changepoints: { mode: "explicit", timestamps }`                                                                |
| `changepoint_prior_scale`                                                         | `map.changepointPriorScale`                                                                                         |
| `fit(algorithm="Newton", iter=n)`                                                 | `map.optimizer: { algorithm: "newton", maxIterations: n }`                                                          |
| `fit(df, init=warm_start_params(m))`                                              | `map.warmStart: warmStartParameters(model)`                                                                         |
| `yearly_seasonality`, `weekly_seasonality`, `daily_seasonality`                   | `builtInSeasonalities: { yearly, weekly, daily }`: `"auto"`, `"off"`, or `{ mode: "on", fourierOrder, priorScale }` |
| `seasonality_mode="multiplicative"`                                               | `seasonalityMode: "multiplicative"`                                                                                 |
| `holidays_mode`                                                                   | `holidaysMode`                                                                                                      |
| `scaling="minmax"`                                                                | `scaling: "minmax"`                                                                                                 |
| `add_seasonality(name, period, fourier_order, prior_scale, mode, condition_name)` | an entry in `seasonalities`: `{ name, periodDays, fourierOrder, priorScale, mode, conditionName }`                  |
| `add_regressor(name, prior_scale, standardize, mode)`                             | an entry in `regressors`: `{ name, priorScale, standardization, mode }`                                             |
| `holidays` dataframe                                                              | `events`: one `{ name, date, lowerWindowDays, upperWindowDays, priorScale }` per occurrence                         |
| `add_country_holidays(country_name="US")`                                         | `countryHolidays: { country: "US", coverage, priorScale }`                                                          |

The defaults are Prophet's, so a fit with no options produces the same model as Python. See
[How close are the results?](./accuracy) for the evidence.

### Output and evaluation

| Python                                           | Effect Prophet                                                                               |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `fit(df)` then `predict(future)`                 | `forecast(history, future, options)`, which fits and predicts in one call                    |
| `predict(future)` columns `yhat`, `trend`        | `predict(model, timestamps)`: `value`, `trend`, and every component broken out               |
| `yhat_lower`, `yhat_upper`                       | `predictWithIntervals(model, timestamps, { seed, samples, intervalWidth })`: `valueInterval` |
| `trend_lower`, `trend_upper`                     | `trendInterval` on each `predictWithIntervals` row                                           |
| `interval_width`, `uncertainty_samples`          | `intervalWidth` and `samples` on `predictWithIntervals` or `predictUncertainty`              |
| comparing `y` with `yhat_lower`, `yhat_upper`    | `detectAnomalies(model, observations, { seed })`                                             |
| the same, on the history the model was fitted on | `anomalies(history, { seed })`, which fits and checks in one call                            |
| `predictive_samples`                             | `predictUncertainty(..., { output: "samples" })`                                             |
| `regressor_coefficients(model)`                  | `getRegressorCoefficients(model)`                                                            |
| `cross_validation`                               | `crossValidate`                                                                              |
| `performance_metrics`                            | `performanceMetrics`                                                                         |
| `model_to_json`, `model_from_json`               | `encodeFittedModel`, `decodeFittedModel`; the format is not Python's                         |
| a loop over parameter grids                      | `searchModels` and `evaluateHoldout`                                                         |

## Gotchas for Python users

- **Timestamps must be exact UTC ISO strings**, such as `"2025-01-31T00:00:00.000Z"`. There is
  no format guessing and no time-zone conversion.
- **Missing values:** leave the row out instead of using `NaN`. A row without a value is rejected.
- **Future rows carry their own inputs.** Every future row needs its `capacity` (and `floor`),
  regressor values and condition flags, because there is no dataframe to look them up in.
- **The seed is required** for uncertainty ranges, so results are repeatable.
- **Intervals are a separate call.** `predict` returns point forecasts only, so you never pay for
  simulations you didn't ask for.
- **Models are immutable.** Fitting returns a new model. There is nothing to mutate; to refit from an
  earlier model, pass `warmStartParameters(model)` as `map.warmStart`.
- **Country coverage is explicit.** The offline snapshot covers request years 1995–2060;
  reviewed gaps fail by default. Opting into `"allow-known-gaps"` accepts actual partial provider
  data, not complete coverage. Fitted models embed their selected snapshot; updates require a
  refit. See [Country holiday calendars](/guide/holiday-calendars).
- **No plotting.** Forecasts are plain data for your own charts.

See [What's different](./differences) for what isn't available yet and where behavior differs on
purpose.
