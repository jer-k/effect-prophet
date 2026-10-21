# What's different

Effect Prophet fits the same model as Python Prophet 1.4.0 (see
[How close are the results?](./accuracy)). This page lists where the library does less than
Python, where it differs on purpose, and the smaller behavior differences.

## Not available yet

- Full Bayesian fitting (`mcmc_samples`)
- Warm starts (`warm_start_params`)
- Forecasting regressors with their own models. Every future row must supply its regressor
  values.
- Monthly horizons and custom metrics in cross-validation

## Different on purpose

- Plain data and typed errors instead of a mutable `Prophet` object and pandas dataframes. Rows
  are `{ timestamp, value }` instead of `ds` and `y`.
- Strict UTC timestamps; no guessing at formats or time zones
- Missing values are rejected rather than silently dropped
- You supply future dates; there is no `make_future_dataframe`
- No built-in plotting
- Saved models use their own format, not Python's JSON
- Country calendars are offline Prophet 1.4.0 / `holidays` 0.104 snapshots with an outer
  1995–2060 horizon. Known missing coverage is rejected unless explicitly accepted with
  `coverage: "allow-known-gaps"`; neither policy guarantees completeness. Only country-level
  defaults are supported, not subdivisions/languages/categories. Saved models embed their
  selected snapshot and never silently adopt installed updates. See
  [Country holiday calendars](/guide/holiday-calendars).
- Cross-validation and model search run one fold after another, with no worker parallelism
- Uncertainty ranges are a separate [`predictUncertainty`](../examples/uncertainty) call, so
  point forecasts never pay for simulations. They need a seed, so results are repeatable.

## Small behavior differences

- **Uncertainty simulation.** Ranges use Prophet's per-path simulation (`vectorized=False`), not
  Python's default shortcut. The shortcut only allows trend changes at the requested rows and
  assumes they are evenly spaced, but here you supply your own rows. On evenly spaced rows the
  two agree: in our long-history benchmark, the average trend width of future ranges was 17.7
  for the shortcut and 17.8 for the per-path method over eight seeds.
- **Size limits on uncertainty.** One call takes up to 10,000 rows and 2,048 samples. Python has
  no such limits. See [Uncertainty ranges](../examples/uncertainty) for details.
- **Memory limit for Newton's method.** Newton's method, used for histories under 100 rows and
  as L-BFGS's fallback, keeps four tables of size parameters × parameters. The engine can use at
  most 4 GiB of memory, so Newton can never fit more than 11,585 parameters. In practice the limit
  is somewhat lower, because the rest of the fit needs memory too, and lower still if your
  runtime gives the engine less. Each Fourier order adds two parameters, and changepoints, events and
  regressors add more. Past the limit, `fit` fails with a `FittingError` whose `reason` is
  `"memory-limit"`, with `parameterCount` and `memoryLimitBytes`. Python has no such limit.
- **Inputs that cannot be fitted return an error.** If every row has the same timestamp, there
  is no way to draw a trend, so `fit` fails where Python returns `NaN` forecasts. These are the
  [intentional differences](/benchmarks/linear#intentional-differences) in the benchmarks.
- **Last-digit differences.** Fits stop when they are close enough, and rounding differs across
  computers, so forecasts agree to many decimal places but not always all of them. For logistic
  growth, the fitted internal numbers can differ slightly even when forecasts match; the
  [benchmarks](/benchmarks/logistic) flag these cases.
