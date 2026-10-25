# What's different

Effect Prophet fits the same model as Python Prophet 1.4.0 (see
[How close are the results?](./accuracy)). This page lists where the library does less than
Python, where it differs on purpose, and the smaller behavior differences.

## Not available yet

- Full Bayesian fitting (`mcmc_samples`)
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
- `predict` never simulates, so point forecasts never pay for it. Ranges come from
  [`predictWithIntervals`](../examples/uncertainty), or `predictUncertainty` for ranges alone.
  They need a seed, so results are repeatable.

## Small behavior differences

- **Uncertainty simulation.** Ranges use Prophet's per-path simulation (`vectorized=False`), not
  Python's default shortcut. The shortcut only allows trend changes at the requested rows and
  assumes they are evenly spaced, but here you supply your own rows. On evenly spaced rows the
  two agree: in our long-history benchmark, the average trend width of future ranges was 17.7
  for the shortcut and 17.8 for the per-path method over eight seeds.
- **Size limits on uncertainty.** One call takes up to 10,000 rows and 2,048 samples. Python has
  no such limits. See [Uncertainty ranges](../examples/uncertainty) for details. Because
  `anomalies` simulates its whole history, it takes histories of up to 10,000 rows; see
  [Finding anomalies](../examples/anomalies#looking-back-over-a-history) for longer ones.
- **Memory limit for Newton's method.** Newton's method, used for histories under 100 rows and
  as L-BFGS's fallback, keeps four tables of size parameters × parameters. The engine can use at
  most 4 GiB of memory, so Newton can never fit more than 11,585 parameters. In practice the limit
  is somewhat lower, because the rest of the fit needs memory too, and lower still if your
  runtime gives the engine less. Each Fourier order adds two parameters, and changepoints, events and
  regressors add more. Past the limit, `fit` fails with a `FittingError` whose `reason` is
  `"memory-limit"`, with `parameterCount` and `memoryLimitBytes`. Python has no such limit.
- **Percentage scores near zero.** When an actual value is within `1e-8` of zero, Python drops
  `mape` from `performance_metrics` and logs a message. `performanceMetrics` fails with an
  `EvaluationMetricError` whose `reason` is `"zero-actual"` instead, so a requested score never
  goes missing. For `mdape`, Python keeps the infinite or `NaN` ratio an actual of exactly zero
  produces, and the median may or may not hide it. `performanceMetrics` fails the same way for
  that actual. A score that overflows fails with `"non-finite"` where Python returns infinity.
  See [Actual values of zero](../examples/cross-validation#actual-values-of-zero).
- **Order of forecasts with the same horizon.** Python sorts forecasts by horizon with a sort
  that leaves equal horizons in no fixed order. `performanceMetrics` keeps them in the order
  `crossValidate` returns them, oldest round first. This decides the order of `rows` scores and
  which forecasts `mdape` borrows from a shorter horizon to fill a window. It can also change the
  last digit of a total. Otherwise scores match Python's exactly.
- **Warm starts are checked.** Python quietly replaces a `k`, `m` or `sigma_obs` it can't read
  as a number with its default. `fit` rejects a warm start with a non-finite number, or a
  `sigmaObs` that isn't positive, with an `InputValidationError`. Mismatched `delta` and `beta`
  lengths fall back to the defaults, as in Python.
- **Warm starts from flat models.** Flat models don't keep Stan's rate and changepoint
  adjustments, which don't affect a flat trend, so `warmStartParameters` returns `k: 0` and an
  empty `delta` for them, and the next fit starts the adjustments from Prophet's defaults.
  Python's values for these after a converged fit are close to zero.
- **Inputs that cannot be fitted return an error.** If every row has the same timestamp, there
  is no way to draw a trend, so `fit` fails where Python returns `NaN` forecasts. These are the
  [intentional differences](/benchmarks/linear#intentional-differences) in the benchmarks.
- **Last-digit differences.** Fits stop when they are close enough, and rounding differs across
  computers, so forecasts agree to many decimal places but not always all of them. For logistic
  growth, the fitted internal numbers can differ slightly even when forecasts match; the
  [benchmarks](/benchmarks/logistic) flag these cases.
