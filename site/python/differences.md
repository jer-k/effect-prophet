# What's different

::: info Outline
This page is an outline.
:::

## Not available yet

- Country holiday calendars (`add_country_holidays`)
- Full Bayesian fitting (`mcmc_samples`)
- Warm starts
- Forecasting regressors with their own models
- Monthly horizons and custom metrics in cross-validation

## Different on purpose

- Plain data and typed errors instead of a mutable `Prophet` object and pandas dataframes
- Strict UTC timestamps; no guessing at formats or time zones
- You supply future dates; there is no `make_future_dataframe`
- No built-in plotting
- Saved models use their own format, not Python's JSON
- Uncertainty ranges use Prophet's per-path simulation, not its default shortcut, and need a seed

## Small behavior differences

- To be listed once the remaining default-behavior fixes are settled
