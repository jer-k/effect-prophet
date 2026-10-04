# Coming from Python

::: info Outline
This page is an outline. It will be filled in once the remaining default-behavior fixes land.
:::

## A side-by-side example

- The Python quick start (`Prophet()`, `fit(df)`, `make_future_dataframe`, `predict`) next to the
  same program in Effect Prophet.

## Translation table

- Data: `ds`/`y`/`cap`/`floor` columns → `timestamp`/`value`/`capacity`/`floor` fields
- Constructor arguments → `fit` options (growth, changepoints, built-in seasonalities, modes,
  scaling)
- `add_seasonality`, `add_regressor`, `holidays` → `seasonalities`, `regressors`, `events`
- `make_future_dataframe` → build the timestamps yourself
- `predict` output columns (`yhat`, `trend`, `yhat_lower`/`yhat_upper`) → forecast fields and
  `predictUncertainty`
- `cross_validation` / `performance_metrics` → `crossValidate` / `performanceMetrics`
- `model_to_json` / `model_from_json` → `encodeFittedModel` / `decodeFittedModel`
- `regressor_coefficients` → `getRegressorCoefficients`

## Gotchas for Python users

- Timestamps must be exact UTC ISO strings
- Missing values: leave the row out instead of using `NaN`
- No plotting: forecasts are plain data for your own charts
