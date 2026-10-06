# Initial release: status and remaining work

Last updated 2026-10-05 on branch `more-docs-benchmarks`. This file is the current read on what's left before
a first release. Delete it once the release ships.

## Summary

The library is functionally complete for a first release. It has all three Prophet trend types,
seasonalities, events, regressors, multiplicative components, uncertainty intervals,
cross-validation, model search and save/load.

What's left is mostly **cleanup and release mechanics**:

1. Rerun all three trend baselines from a clean commit, then finish the docs site's Python pages.
2. Settle packaging: version and publishing.

## Done

- **Logistic growth merged** (PR #57): stationarity kink fix, output-first acceptance policy, and
  the old proximal algorithm removed.
- **Docs site** in `site/`, built with VitePress and deployed to GitHub Pages by
  `.github/workflows/docs.yml`. It has a beginner guide and 11 example pages. Every code sample
  comes from a runnable script in `site/snippets/`, and CI type-checks and runs all of them on
  every PR. The three Python pages are outlines for now.
- **README rewritten**: install, quick start, feature list, links to the site.
- **Effect upgraded** from `4.0.0-beta.107` to stable `4.0.0`. No code changes were needed, and
  the full check suite passes.
- **Effect is a peer dependency** (`^4.0.0`), so apps share one copy; the repository pins `4.0.0`
  as a dev dependency. `tools/test-package.ts` asserts the manifest keeps it that way.
- **OLS default removed** (branch `remove-ols`). Featureless linear fits now use Prophet's MAP
  model, as Python does. The same change makes `map.changepoints` default to automatic, fixing a
  bug where `fit(data, { map: { changepointPriorScale: 0.5 } })` silently turned changepoints off
  for linear and logistic growth.
- **Linear growth verified and published.**
  - All 33 linear benchmark cases rerun, including three new default-settings cases comparing
    `fit(history)` with `Prophet().fit(df)`. 31 match; the 2 that don't are the intentional
    zero-span differences.
  - Saved as the `linear-growth` baseline, replacing four older linear snapshots.
  - Linear now uses the same output-first policy as logistic: forecasts gate each case, and
    internal fit differences are flagged instead of failing it. Three cases are flagged; their
    forecasts match.
  - The docs site has a benchmark page for every case at `/benchmarks/linear`, generated from the
    saved baseline: input, both libraries' forecasts side by side, and timings.
  - The `-stan-v2` duplicate cases and their helper are gone; linear declarations use both
    libraries' defaults directly.
- **Flat growth verified and published.**
  - All 34 flat cases rerun, including three new default-settings cases comparing
    `fit(history, { growth: "flat" })` with `Prophet(growth="flat").fit(df)`. All 34 match.
  - Saved as the `flat-growth` baseline, with pages at `/benchmarks/flat`.
  - The report no longer compares changepoints for flat models: Python computes its defaults for
    a flat model but never uses them.
  - The page generator now serves every trend from one loader and page builder; each trend adds a
    description file and an entry in `site/.vitepress/benchmarks/suite.ts`.
- **Benchmark catalog repaired.** All 109 declared cases run again.
  - The six older logistic cases now use logistic's defaults and the output-first policy (shared
    with linear in `benchmark/cases/prophet-defaults.ts`). They and the 6 uncertainty cases built
    from them pass 12 of 12 locally.
  - The flat-and-evaluation suite, including the 5 logistic evaluation cases, was rerun and saved
    as the new `flat-growth-and-evaluation` baseline: 36 of 36 pass.
  - The case schema no longer accepts the retired `relativeTolerance`/`absoluteTolerance`
    settings, so a stale declaration fails catalog validation instead of failing mid-run.
  - All 68 benchmark-tooling tests pass.

- **Logistic growth verified and published.**
  - All 45 logistic cases rerun: the 28 reconciliation cases, the 6 older ones, and the 6
    uncertainty and 5 evaluation cases built from them. 45 of 45 pass. Three are flagged under the
    output-first policy with matching forecasts: `logistic-reconcile-defaults-256` (objective and
    stationarity, as before) and `logistic-implicit-floor-large` plus the uncertainty case built
    from it (stationarity residual; forecasts differ by at most 2.3e-5).
  - Saved as the `logistic-growth` baseline, with pages at `/benchmarks/logistic`. The site's
    accuracy page now marks all three trends as matching Python.
  - The `flat-growth-and-evaluation` snapshot is retired; its cases are covered by the three
    per-trend baselines. `catalog.test.ts` and `run-fixture.ts` now use `flat-growth`.
- **Fitting is 2–6× faster, with bit-identical results.**
  - The objective evaluation no longer rescans every changepoint for every row, and the logistic
    fit caches each row's probability across optimizer steps. The per-row `exp` also skips one
    software fused multiply-add, which WASM has to emulate.
  - Fitted models, forecasts and intervals are bit-for-bit unchanged, checked with before/after
    fingerprints natively and in WASM, plus new equivalence tests for each changed reduction.
  - Local WASM timings against Python Prophet 1.4.0 on the same machine: linear 90 rows 27 ms vs
    91 ms, 730 rows 28 ms vs 156 ms; logistic 90 rows 140 ms vs 171 ms, 730 rows 213 ms vs 407 ms.
    All three baselines were rerun on 2026-10-05 after the speedups: Effect Prophet is faster
    than Python on every benchmarked fit (median warm fit: linear 5.1 ms vs 23.5 ms, flat 1.6 ms
    vs 7.9 ms, logistic 12.8 ms vs 20.6 ms), with the same pass/fail and flag results as before.
- **Old `docs/` folder deleted.** Its 27 build-out notes were out of date, and several linked to
  benchmark snapshots the current baselines replaced. The docs site covers the user-facing parts,
  and git history keeps the rest. This file moved to the repository root. Benchmark READMEs,
  `tools/prophet/README.md` and the linear `scenarios.json` inventory now point to the site or
  to benchmark files instead. The `uncertainty.evidence` strings in the uncertainty and linear
  edge-case declarations still name `docs/validation/uncertainty.md`: they are part of the frozen
  case contracts, so change them only together with the clean baseline rerun.
- **Benchmark pages reorganized.**
  - `/benchmarks/` is now an overview with pass counts for every trend and feature; the nav, README
    and guide link there instead of `/benchmarks/linear`.
  - New feature pages gather each feature's cases from all three trend baselines:
    `/benchmarks/features` (seasonality, events and regressors, 31 cases),
    `/benchmarks/uncertainty` (13) and `/benchmarks/cross-validation` (15). They link to the
    existing case pages, so all 112 cases still have one page each, under their trend.
  - Features are defined by case group in `site/.vitepress/benchmarks/suite.ts`, and the sidebar
    is generated from the trend and feature lists.

- **Licensing settled.** The project is MIT (`LICENSE`, `package.json`), and npm packs `LICENSE`
  (asserted in `tools/test-package.ts`). `rust/prophet-wasm/third-party/NOTICE.txt` now credits
  Prophet itself (MIT text in `prophet-license.txt`), covers the Stan L-BFGS port as well as
  Newton, and lists the Rust crates compiled into the WASM binary, all used under Apache-2.0
  (`nalgebra-license.txt` renamed to `apache-2.0-license.txt`). `npm run notices:check`, also
  in CI's `rust` job, fails when that list drifts from `Cargo.lock` or a crate lacks Apache-2.0.
  The two Eigen-derived Rust files stay MPL-2.0. The README's broken `wasm/third-party/` link
  (that folder is gitignored) now points to the tracked notices.
- **`evaluateHoldout` accepts plain arrays.** `development` and `holdout` are now
  `ReadonlyArray<EncodedObservation>`, so `array.slice(...)` results pass straight in. Empty
  or malformed partitions fail at run time with an `evaluation-holdout` `InputValidationError`
  whose issue paths start with `development` or `holdout`. That re-pathing helper,
  `nestedInputValidationError`, now lives in `src/errors.ts` and is shared with `searchModels`. The
  non-empty guards in `site/snippets/holdout.ts` and `benchmark/tools/evaluation.ts` are gone.
- **Uncertainty intervals no longer cap rows × samples.** Interval output used to fail with
  `simulation-limit` past 1,000,000 draws (1,000 rows at the default 1,000 samples). The Rust
  simulator now draws each sample's trend changes first, saves where that sample's noise starts
  in the RNG stream, and emits one row at a time. Draws are bit-identical to before (checked by
  output fingerprints and a reference sample-major test). Intervals now take up to 10,000 rows ×
  2,048 samples (about 0.9 s, flat memory); `output: "samples"` keeps the 1,000,000-value cap.
  Cross-validation, search and holdout share the same check (`exceedsSimulationBudget` in
  `src/uncertainty.ts`), and `maximumSampleCells`/`maximumSimulationRows` are exported.
- **Uncertainty benchmarks compare intervals with Python.** Both adapters now project every
  row's trend and value bounds, and the report fails a case when any bound differs from Python's
  `vectorized=False` simulation by more than the point tolerance plus 6 × width / √samples. A
  new case, `uncertainty-linear-defaults-long-history-intervals-1000` (v3 input: three daily
  years, all 1,460 history and future rows, 1,000 samples), covers requests past the old cap. A
  local run on 2026-10-05 passed all 14 uncertainty cases; the largest bound difference used 39%
  of its allowance. On that case, observation-noise widths agree to 0.14%; trend widths differ by
  5.5% at seed 19, which over 8 seeds is Monte Carlo noise (Effect 17.4 ± 0.7, Python 17.8 ±
  0.7; Python's default vectorized method 17.7). The benchmark image now copies the locked
  `effect` in, since the production install omits the peer dependency.
- **Default-settings uncertainty cases.** Growth-only cases may now declare uncertainty, so four
  more cases run both libraries on their defaults at 1,000 samples over every row: linear with
  irregular spacing, flat, and logistic at seeds 19 and 7. Earlier logistic uncertainty cases all
  used one explicit changepoint, leaving trend ranges near zero, and the existing logistic
  datasets fit near-zero deltas under defaults too. A new v3 input, `logistic-rate-changes`
  (365 daily rows, growth-rate changes at 35% and 65%, 90 future rows), gives mean |delta| 0.28
  and trend ranges of about 8 at the last row. All four passed locally on 2026-10-05 (largest
  bound ratio 0.48); future logistic trend widths matched within 0.7% at seed 19 and 8% at
  seed 7, consistent with single-seed Monte Carlo noise.
- **Logistic defaults on real growth changes.** `logistic-reconcile-defaults-rate-changes` fits
  the same v3 input as a point-forecast case on the logistic page; the other logistic datasets
  are single smooth curves, so their automatic changepoints correctly fit near-zero deltas and
  never test fitting real changes. It passed locally: forecasts within 0.013 (allowance 0.032).
  Output-first flags the endpoint (Python's objective is 0.037 better; stationarity residual 209
  vs 201). It is also the first benchmarked fit where Effect is slower: median warm fit 151 ms vs
  120 ms. Site descriptions now cover every new case, and the uncertainty group intros say that
  ranges are compared with Python.

- **Flat growth accepts additive events, regressors and conditional seasonalities.** `fit` used
  to reject them unless the model also had a multiplicative component. Python has no such limit:
  its flat model is the linear Stan model with the trend fixed at `m`. Now any flat model with
  events, regressors, conditions or multiplicative components fits through that same Stan
  density with Prophet's `m = mean` start and default optimizer policy, with method
  `flat-map-stan-v1`. Plain additive seasonality keeps the exact reduced fitter
  (`flat-map-coordinate-v1`), so those results are unchanged.
  - `StanFlatObjective` optimizes only `[m, log(sigma), beta...]`: Prophet's flat model carries
    the linear `k` and `delta`, but its trend ignores both and their gradients are zero at the
    zero start, so the steps are the same in exact arithmetic. Keeping them let spectral-solve
    rounding push `delta` off zero, where its Laplace kink turned that noise into curvature: one
    96-row Newton fit took 214 iterations in WASM, 27 natively, and 32 in Python. Without them it
    takes 76 in both builds and reaches the optimum, slightly above Python's. Densities keep
    Prophet's constants, so objectives stay comparable with CmdStan's.
  - This replaced the one-coefficient-at-a-time flat fitter, which ran out of iterations on a
    constant regressor (exactly collinear with the level). That failure was already on `main`
    for multiplicative flat models.
  - `UnsupportedConfigurationError` is gone: nothing raises it any more.
  - Flat models accept `map: { optimizer }`, Python's `fit(algorithm=..., iter=...)`. An explicit
    optimizer always fits through Stan. `map.changepoints` and `map.changepointPriorScale` stay
    rejected for flat growth, with path-specific errors: they cannot affect a flat trend. Add this
    row to the "Coming from Python" translation table.
  - The mixed flat cases, and the prefix, uncertainty and evaluation cases built from them, now pin
    both libraries to L-BFGS without fallback; they used to pin only Python. The feature-free and
    seasonal-only flat cases keep Effect's exact reduced fitter.
  - A local run on 2026-10-06 passed 38 of 38: all 34 `flat-growth` cases plus 4 new ones on both
    libraries' default optimizer: `flat-additive-components` (and `-large`),
    `flat-correlated-regressors` (a v4 input: temperature tracking the yearly pattern, a constant
    regressor, and a warm winter in the forecast rows) and `flat-mixed-components-absmax-defaults`.
    Both libraries fit temperature at 0.60026 (true 0.6). After the `StanFlatObjective` change, a
    focused rerun of the 20 standalone flat Stan-path fit cases passed 20 of 20: objectives
    within Python's 8-significant-figure `lp` output, forecasts within 4.2e-6.
  - Timing (focused rerun, a busier machine): Stan-path flat fits take 1.4–6.0 ms against Python's
    7.1–23.8 ms. The 96-row default-settings Newton case dropped from 20.8 ms to 6.0 ms, against
    Python's 13.9 ms.

## Where things stand

| Area                                                 | Works | Matches Python?                                                                              | Saved benchmark evidence                                                                                |
| ---------------------------------------------------- | ----- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Linear growth                                        | Yes   | Yes. Every linear fit now uses Prophet's MAP model.                                          | 31 of 33 pass (`linear-growth` baseline). The 2 others are zero-span inputs we reject on purpose.       |
| Flat growth                                          | Yes   | Yes, including additive events, regressors and conditional seasonality on their own          | 34 of 34 pass (`flat-growth` baseline); 4 new cases pass locally, not yet in the saved baseline         |
| Logistic growth                                      | Yes   | Yes, judged on outputs (forecasts must match; internal fit numbers are reported only)        | 45 of 45 pass (`logistic-growth` baseline)                                                              |
| Seasonalities (auto, custom, conditional)            | Yes   | Yes                                                                                          | Fixtures, plus 31 of 31 feature cases across the three baselines (`/benchmarks/features`)               |
| Events/holidays (custom), regressors, multiplicative | Yes   | Yes                                                                                          | Fixtures, plus 31 of 31 feature cases across the three baselines (`/benchmarks/features`)               |
| Uncertainty intervals                                | Yes   | Same per-path method as Python's `vectorized=False` (decided); every interval bound is gated | 18 of 18 pass locally, including 5 default-settings cases; not yet in the saved baselines               |
| Cross-validation, metrics, search, holdout reports   | Yes   | Yes where Python has an equivalent                                                           | 15 of 15 pass across the three baselines (linear 5, flat 5, logistic 5; `/benchmarks/cross-validation`) |
| Save/load                                            | Yes   | Uses its own format. Python JSON is deliberately not supported.                              | Lifecycle tests                                                                                         |

### Not implemented (Python has these)

- Country holiday calendars (`add_country_holidays`)
- Full Bayesian fitting (`mcmc_samples`)
- Warm starts (`warm_start_params`)
- Regressor predictor models (nested forecasting of regressors)
- Monthly/calendar horizons and a custom-metric registry in diagnostics

### Deliberately different (keep as-is)

- Immutable Effect API instead of a mutable `Prophet` object; `{ timestamp, value }` instead of
  `ds`/`y`
- Strict canonical UTC timestamps; missing targets are rejected rather than dropped
- No `make_future_dataframe`: callers supply future rows
- No plotting
- No Python model JSON interchange
- Sequential evaluation (no worker parallelism)

## Must do before release

### 1. Clean baselines, then fill in the Python pages

- Every saved run so far is from a dirty tree, including the current three baselines (commit
  `d2a974c` with uncommitted changes). Before release, rerun all three from a clean commit.
  `--replay <baseline>` reruns only the recorded selection, and `--case` can only narrow it, so
  run each suite with an explicit `--case` list that includes the new cases:
  linear `uncertainty-linear-defaults-long-history-intervals-1000` and
  `uncertainty-linear-defaults-irregular-intervals-1000`; flat
  `uncertainty-flat-defaults-seasonal-intervals-1000`, `flat-additive-components`,
  `flat-additive-components-large`, `flat-correlated-regressors` and
  `flat-mixed-components-absmax-defaults`; logistic
  `logistic-reconcile-defaults-rate-changes` and
  `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000` (plus `-seed-7`). The
  site's uncertainty intros describe the new interval gate, which old baselines did not run.
- Write the remaining outline pages in `site/python/`: **Coming from Python** (a translation
  table) and **What's different** (the known gaps). **How close are the results?** is written and
  marks all three trends as matching.

### 2. Packaging

| Item       | Now                                                         | Needed                                                                                       |
| ---------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Version    | `0.1.0`, with `CHANGELOG.md` (dated "Unreleased")           | Date the changelog entry when releasing                                                      |
| Runtime    | Node only: `wasm-pack --target nodejs` plus `createRequire` | Already stated in the README and docs. Browser/bundler support is tracked in #67.            |
| Publishing | `.github/workflows/release.yml` (npm trusted publishing)    | Configure the trusted publisher on npmjs.com, then publish a GitHub release tagged `v0.1.0`. |

## Smaller issues

- **VitePress is on `2.0.0-alpha.20`.** The stable 1.6.4 is over a year old and pulls in Vite
  versions with audit warnings. Move to 2.0 stable when it ships.

## Decisions

None open.

Decided:

- Flat growth accepts additive events, regressors and conditional seasonalities, as Python does,
  and fits them through Prophet's Stan density (done).
- Drop the OLS default and match Python (done).
- One acceptance policy: linear is judged output-first, like logistic (done).
- Effect is a peer dependency with a `^4.0.0` range (done).
- Node-only for the first release; browser/bundler support comes later (#67).
- Uncertainty keeps Python's per-path simulation (`vectorized=False`), not its default vectorized
  shortcut. The shortcut only allows trend changes at the requested rows and assumes they are
  evenly spaced; callers here supply their own rows. On evenly spaced rows the two agree (mean
  future trend width 17.7 vs 17.8 over 8 seeds on the long-history case). List it on "What's
  different".
- The seed stays required. Making it optional later (for example, defaulting to Effect's `Random`
  service) is not breaking; making it required after release would be.
- Intervals stay a separate `predictUncertainty` call rather than part of every `predict`, so
  point forecasts never pay for 1,000 simulations.

## After the first release

- Country holiday calendars (needs a data-provider and license decision)
- Bayesian fitting / `mcmc_samples`
- Warm starts
- Regressor predictor models
- Browser/bundler build (#67)
- Worker-based parallel cross-validation
- Performance benchmarks for evaluation workloads
- Monthly horizons and custom metrics in diagnostics
