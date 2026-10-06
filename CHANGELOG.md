# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows
[Semantic Versioning](https://semver.org/). Before 1.0, minor versions may include breaking changes.

## [0.1.0] - Unreleased

First release. Effect Prophet is a TypeScript implementation of Meta's
[Prophet](https://facebook.github.io/prophet/) forecasting model, built on
[Effect](https://effect.website) with a Rust/WebAssembly numerical backend, and checked against
Python Prophet 1.4.0.

### Forecasting

- **`fit(history, options?)`** fits a model from `{ timestamp, value }` rows and returns an
  immutable fitted model. **`predict(model, timestamps | rows)`** returns, for each row, the
  forecast value, the trend, and every additive and multiplicative component broken out.
- **Three trend types**, each fitted with Prophet's MAP model:
  - **Linear** with automatic or explicit changepoints (count, range, prior scale), or none.
  - **Flat**: a constant level. Accepts additive events, regressors and conditional
    seasonalities as well as multiplicative components, like Python.
  - **Logistic** (growth with a ceiling), with per-row `capacity` and optional `floor`, and
    automatic or explicit changepoints.
- **Seasonality**: automatic yearly, weekly and daily patterns that switch on once there is enough
  history (two years for yearly, two weeks for weekly, and two days for daily); custom seasonalities with their own
  period, Fourier order and prior scale; per-seasonality additive or multiplicative mode; and
  **conditional seasonalities** that apply only on rows where a flag is set.
- **Events and holidays**: named events with date lists, lower and upper windows, per-event prior
  scales and additive or multiplicative mode. `parseEventCalendar` validates calendars up front.
- **Regressors**: extra numeric factors with prior scale, additive or multiplicative mode, and
  standardization (`auto`, `always`, `never`). `getRegressorCoefficients` reports what the model
  learned for each regressor.
- **Multiplicative components**: seasonality, events and regressors can scale with the trend
  instead of adding to it, with a global `seasonalityMode` and `holidaysMode` and per-component
  overrides.
- **Target scaling**: Prophet's `absmax` and `minmax` modes. Logistic growth has explicit
  target-scaling and floor policies.
- **Optimizer settings**: choose Newton or L-BFGS through the optimizer option, with Prophet's
  defaults, including its L-BFGS-to-Newton fallback and tunable L-BFGS settings.
- **Uncertainty intervals**: `predictUncertainty` simulates future trend changes and observation
  noise per path, as Python's `vectorized=False` does, and returns either intervals or the raw
  samples. A seed is required so results are repeatable. Intervals support up to 10,000 rows and
  2,048 samples; `output: "samples"` is capped at 1,000,000 values.
- **Input checking**: timestamps must be exact UTC ISO strings. Missing targets, duplicate or
  unordered rows, bad capacities and missing regressor values are rejected with specific errors
  instead of being silently dropped.

### Evaluation and model selection

- **Rolling-origin cross-validation**: `planRollingOrigin` previews the folds and `crossValidate`
  runs them, with point or interval forecasts, explicit or generated cutoffs, and a configurable
  horizon, period and initial window.
- **Metrics**: `performanceMetrics` computes MAE, MSE, RMSE, MAPE, MDAPE, SMAPE and interval
  coverage, per row, per horizon, overall or rolling, with a choice of how MAPE treats zero actuals.
- **Baselines**: `crossValidateBaseline` and `comparePerformance` score simple rules (last
  observation, training mean, seasonal naive) on the same folds and compare them with a model.
- **Model search**: `searchModels` fits and cross-validates candidate settings, ranks them by a
  chosen metric, and either records or stops on candidate failures.
- **Holdout evaluation**: `evaluateHoldout` selects settings on a development set and then
  evaluates once on a final holdout. Reports can be saved with `encodeEvaluationReport` and
  restored with `decodeEvaluationReport`. Plain arrays are accepted for both partitions.

### Saving models

- `encodeFittedModel` and `decodeFittedModel` turn a fitted model into plain JSON-friendly data and
  back, with validation. A restored model forecasts identically, without refitting and without the
  fitting backend layer.
- The format is this library's own. Python Prophet's `model_to_json` format is not supported.

### Effect integration

- Everything returns an `Effect` with typed errors. Fitting runs through a
  `prophetFittingBackendLayer` that you provide.
- **Typed errors with a `reason` field**: `InputValidationError` (with issue paths),
  `FittingError`, `PredictionError`, `ModelSerializationError` and the evaluation, metric, search,
  report and holdout errors. Failures inside the WebAssembly engine are reported with the phase
  they happened in.
- **Tracing**: named spans on the public operations (`Prophet.fit`, `Prophet.predict` and others)
  and on engine calls (`effect-prophet.wasm.fit` and `.predict`) that join whatever trace is active.
  Fit spans record counts and labels such as rows, changepoints, parameters, solver iterations and
  termination reason, and whether the call loaded the engine. They never contain data, names,
  coefficients, seeds or error messages. Nothing is exported unless your app provides a tracer.

### Numerical backend

- Prophet's Stan model is ported to Rust and compiled to WebAssembly, so no Stan install is
  needed. It includes ports of Stan's L-BFGS optimizer and a Newton optimizer, the linear, flat
  and logistic densities, and the uncertainty simulator.
- Fitting runs 2 to 6 times faster than an earlier version of this library, with bit-identical
  results. In the benchmarks, the median warm fit is faster than Python Prophet 1.4.0 for linear
  (5.1 ms vs 23.5 ms) and flat (1.6 ms vs 7.9 ms), and for logistic (12.8 ms vs 20.6 ms). The one
  benchmarked fit that is slower is logistic with real growth-rate changes (151 ms vs 120 ms).
- Uncertainty simulation emits one row at a time with flat memory, so it is not limited by rows
  times samples.
- The package bundles the notices and license texts for the code it adapts: Prophet (MIT), Stan,
  Eigen, nalgebra and Arm optimized-routines, and the Rust crates in the binary.

### Verification against Python Prophet

- **Compatibility fixtures** generated from Python Prophet 1.4.0 are checked in CI. They are
  deterministic across CPU implementations.
- **Benchmark suite** of 100+ cases that run both libraries on the same input and compare every
  forecast row. Saved baselines cover linear, flat and logistic growth, with default-settings
  cases, seasonality, events, regressors, uncertainty, cross-validation, model search and holdout
  evaluation. Forecasts must match; internal fit differences are reported but do not fail a case.
- **Uncertainty benchmarks** compare every interval bound with Python's simulation, allowing for
  Monte Carlo error.

### Documentation

- **Docs site** (VitePress, deployed to GitHub Pages) with an introduction, a five-minute Effect
  primer, a getting-started guide, data preparation, reading forecasts, tracing, and examples for
  trends, flat and capped growth, seasonality, events, regressors, uncertainty, cross-validation,
  choosing settings, saving models and error handling. Every code sample is a runnable script that
  CI type-checks and runs.
- **Benchmark pages** for every case, with inputs, both libraries' forecasts side by side and
  timings, plus overview and feature pages.
- **Python pages**: how close the results are, a "Coming from Python" translation guide, and
  "What's different".
- A README with install, quick start, features and tracing.

### Packaging

- ESM package with bundled type declarations for Node.js 22.19 or newer. `effect` `^4.0.0` is a
  peer dependency, so your app shares one copy.
- The WebAssembly binary ships inside the package. A package test installs the built tarball and
  exercises the public API.
- Published to npm from GitHub releases using trusted publishing with provenance.

### Not included

These Python Prophet features are not implemented in this release:

- Country holiday calendars (`add_country_holidays`)
- Full Bayesian fitting (`mcmc_samples`)
- Warm starts
- Forecasting regressors with their own models
- Monthly horizons and custom metrics in cross-validation diagnostics
- Browser and bundler builds (Node.js only for now)

### Different from Python on purpose

- An immutable functional API with plain data (`{ timestamp, value }`) instead of a mutable
  `Prophet` object and pandas dataframes.
- Strict UTC timestamps; missing targets are rejected rather than dropped.
- No `make_future_dataframe`: you supply the future rows.
- No plotting.
- Uncertainty uses Prophet's per-path simulation instead of its default vectorized shortcut, and
  requires a seed.
- Inputs that cannot define a trend, such as every row sharing one timestamp, return an error where
  Python returns `NaN` forecasts.

[0.1.0]: https://github.com/jer-k/effect-prophet/releases/tag/v0.1.0
