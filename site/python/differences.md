---
description: "Where Effect Prophet differs from Python Prophet 1.4.0: intentional differences, smaller behavior differences and limits."
---

# What's different

Effect Prophet fits the same model as Python Prophet 1.4.0 (see
[How close are the results?](./accuracy)). This page lists where it differs on purpose, and the
smaller behavior differences, including limits Python doesn't have.

## Different on purpose

- Plain data and typed errors instead of a mutable `Prophet` object and pandas dataframes. Rows
  are `{ timestamp, value }` instead of `ds` and `y`.
- Strict UTC timestamps; no guessing at formats or time zones
- Missing values are rejected rather than silently dropped
- `makeFutureTimestamps` accepts only the pandas frequencies `h`, `D`, `W`, `W-SUN` to `W-SAT`,
  `MS` and `ME`, never infers one (`freq=None`), and generates at most 100,000 future dates per
  call
- No built-in plotting
- Saved models use their own format, not Python's JSON
- Runs in browsers as well as Node.js, with no Python process or server. See
  [Browsers and bundlers](/guide/browsers).
- Country calendars are offline Prophet 1.4.0 / `holidays` 0.104 snapshots with an outer
  1995–2060 horizon. Known missing coverage is rejected unless explicitly accepted with
  `coverage: "allow-known-gaps"`; neither policy guarantees completeness. Only country-level
  defaults are supported, not subdivisions/languages/categories. Saved models embed their
  selected snapshot and never silently adopt installed updates. See
  [Country holiday calendars](/guide/holiday-calendars).
- Cross-validation and model search run one fold after another, with no counterpart to
  `cross_validation`'s `parallel` argument. The
  [benchmarks](/benchmarks/linear/evaluation-linear-long-history-parallel) time Python's parallel
  modes next to Effect Prophet's sequential runs. The two return different outputs, so the times
  show each library's cost rather than a speed ranking.
- Cross-validation rows have the cutoff, timestamp, horizon, actual value and forecast, plus the
  range when you ask for intervals. There's no counterpart to `cross_validation`'s
  `extra_output_columns`, which copies other `predict` columns, such as `trend`, into each row.
- Custom metrics are definitions you pass to each call, not entries in a global registry, and
  can't replace a built-in metric. Each scores one forecast at a time and combines a group with
  a mean, median, quantile or ratio of means, using Prophet's windows. Python's
  `register_performance_metric` takes any function of the whole result. Python has no
  quantile helper; the quantile follows numpy's `np.quantile` over the windows `mdape` uses. See
  [Your own metrics](../examples/cross-validation#your-own-metrics).
- `scaledErrorMetric` adds mean absolute scaled error (MASE), which Python doesn't have. Each
  round's scale comes from a naive rule's error on that round's training rows. See
  [Scaled errors](../examples/cross-validation#scaled-errors). The
  [benchmarks](/benchmarks/flat/evaluation-flat-large-months-metrics) check it against MASE
  registered in Python with `register_performance_metric`.
- Saved models keep the models that
  [forecast their regressors](../examples/regressors#forecasting-a-regressor), so a loaded model
  forecasts exactly as before. Python's `model_to_json` drops them, and a loaded model then asks
  for the regressor values.
- A regressor model's `predictor: {}` uses the default settings, like `predictor: true`. In
  Python, `regressor_predictor={}` counts as false and fits no regressor model.
- `predict` never simulates, so point forecasts never pay for it. Ranges come from
  [`predictWithIntervals`](../examples/uncertainty), or `predictUncertainty` for ranges alone.
  They need a seed, so results are repeatable.

- Full Bayesian fitting needs a `seed`; Python picks a random one when you don't give one. See
  [Full Bayesian fitting](../examples/bayesian).

## Small behavior differences

- **Bayesian chains.** The sampler is a port of Stan's NUTS, but its chains can't match CmdStan's
  draw for draw: tiny rounding differences grow along a chain. Posterior means and ranges agree
  with Python's within the variation expected from that many draws.
- **Size limits on Bayesian fitting.** Up to 16 chains, 100,000 warmup iterations per chain,
  20,000 kept draws and 2,000,000 kept values (draws times parameters). Python has no such limits.
  `mcmc` options past the first three fail with an `OptionsError`. A model whose kept values pass
  the last fails with a `FittingError` whose `reason` is `"sampling-limit"`. See
  [Bayesian fitting](/examples/bayesian#things-to-know).
- **Bayesian fits without features.** Python 1.4.0's `predict` fails for a model fitted with
  `mcmc_samples` that has no seasonalities, holidays or regressors: the posterior's placeholder
  coefficient comes back with the wrong shape. Here such a model forecasts normally.
- **Bayesian fits with one changepoint.** Python 1.4.0's per-path simulation
  (`vectorized=False`) fails for a model fitted with `mcmc_samples` and exactly one changepoint:
  CmdStan returns its changes as a flat array. Here such a model simulates normally.
- **Bayesian fits with regressor models.** Python passes `fit`'s arguments on to each
  `regressor_predictor` model. An optimizing one fails on sampling arguments, so
  `fit(df, chains=2)` fails there, and a sampling one fails on optimizer arguments such as
  `algorithm`. Here a regressor model's sampling settings are its own `mcmc`, so the main model's
  `chains` and `warmup` never reach it, and the main model's `map.optimizer` only reaches an
  optimizing one.
- **Regressor coefficient ranges.** `getRegressorCoefficients` always uses an 80% range, Python's
  default `interval_width`. Python's `regressor_coefficients` uses the model's own
  `interval_width`.

- **Uncertainty simulation.** Ranges use Prophet's per-path simulation (`vectorized=False`), not
  Python's default shortcut. The shortcut only allows trend changes at the requested rows and
  assumes they are evenly spaced, but here you supply your own rows. On evenly spaced rows the
  two agree: in our long-history benchmark, the average trend width of future ranges was 17.7
  for the shortcut and 17.8 for the per-path method over eight seeds.
- **Size limits on uncertainty.** One call takes up to 10,000 rows and 2,048 samples. Python has
  no such limits. With [regressors forecast by their own models](../examples/regressors#forecasting-a-regressor),
  the rows after the history × samples can be at most 1,000,000, because those models' draws are
  kept for every sample. A sampled model counts its `ceil(samples / draws) × draws` futures.
- **Draws from regressor models.** Python draws as many samples from each regressor model as its
  `uncertainty_samples`, 1,000 unless its options set another, and reuses them in turn when the
  main model draws more, all from numpy's one global generator. Each regressor model here draws
  as many samples as the call asks for, from its own seed derived from the call's, so the main
  model's draws are the same as without regressor models. A sampled regressor model runs
  `ceil(n / draws)` futures per posterior draw in both, for Python's `uncertainty_samples` or the
  call's count. Ranges agree in width: in the fixture,
  the average future range was 0.465 here over eight seeds and 0.461 in Python. See [Uncertainty ranges](../examples/uncertainty) for details. Because
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
- **Cross-validation with regressor models.** Each fold fits its
  [regressor models](../examples/regressors#forecasting-a-regressor) to that fold's own regressor
  values, exactly as `fit` at the cutoff would. Python's `cross_validation` refits them on the
  model's stored history, where Prophet has already standardized the regressor values. Prophet's
  scaling doesn't treat a shifted series the same, so Python's fold forecasts drift from fitting
  at the cutoff. The gap depends on the data: about 2% in fold errors on one test series, but
  about 15% too high on the flat regressor-model benchmark history, where fitting at the cutoff
  matches the actual values. The benchmarks therefore compare against Python fitted at each
  cutoff.
- **Order of forecasts with the same horizon.** Python sorts forecasts by horizon with a sort
  that leaves equal horizons in no fixed order. `performanceMetrics` keeps them in the order
  `crossValidate` returns them, oldest round first. This decides the order of `rows` scores and
  which forecasts `mdape` borrows from a shorter horizon to fill a window. It can also change the
  last digit of a total. Otherwise scores match Python's exactly.
- **Warm starts are checked.** Python quietly replaces a `k`, `m` or `sigma_obs` it can't read
  as a number with its default. `fit` rejects a warm start with a non-finite number, or a
  `sigmaObs` that isn't positive, with an `OptionsError`. Mismatched `delta` and `beta`
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
