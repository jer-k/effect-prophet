# Initial release: status and remaining work

Last updated 2026-10-05 on branch `more-docs-benchmarks`. This file is the current read on what's left before
a first release. Delete it once the release ships.

## Summary

The library is functionally complete for a first release. It has all three Prophet trend types,
seasonalities, events, regressors, multiplicative components, uncertainty intervals,
cross-validation, model search and save/load.

What's left is mostly **cleanup and release mechanics**:

1. Rerun all three trend baselines from a clean commit, then finish the docs site's Python pages.
2. Settle packaging: version, peer dependency, publishing.

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

## Where things stand

| Area                                                 | Works | Matches Python?                                                                                      | Saved benchmark evidence                                                                                |
| ---------------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Linear growth                                        | Yes   | Yes. Every linear fit now uses Prophet's MAP model.                                                  | 31 of 33 pass (`linear-growth` baseline). The 2 others are zero-span inputs we reject on purpose.       |
| Flat growth                                          | Yes   | Yes. Additive-only flat with events, regressors or conditional seasonality is rejected (decision 1). | 34 of 34 pass (`flat-growth` baseline)                                                                  |
| Logistic growth                                      | Yes   | Yes, judged on outputs (forecasts must match; internal fit numbers are reported only)                | 45 of 45 pass (`logistic-growth` baseline)                                                              |
| Seasonalities (auto, custom, conditional)            | Yes   | Yes                                                                                                  | Fixtures, plus 31 of 31 feature cases across the three baselines (`/benchmarks/features`)               |
| Events/holidays (custom), regressors, multiplicative | Yes   | Yes                                                                                                  | Fixtures, plus 31 of 31 feature cases across the three baselines (`/benchmarks/features`)               |
| Uncertainty intervals                                | Yes   | Different method on purpose: Python's default is a vectorized shortcut (decision 2)                  | 13 of 13 pass across the three baselines (linear 5, flat 2, logistic 6; `/benchmarks/uncertainty`)      |
| Cross-validation, metrics, search, holdout reports   | Yes   | Yes where Python has an equivalent                                                                   | 15 of 15 pass across the three baselines (linear 5, flat 5, logistic 5; `/benchmarks/cross-validation`) |
| Save/load                                            | Yes   | Uses its own format. Python JSON is deliberately not supported.                                      | Lifecycle tests                                                                                         |

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
- Write the remaining outline pages in `site/python/`: **Coming from Python** (a translation
  table) and **What's different** (the known gaps). **How close are the results?** is written and
  marks all three trends as matching.

### 2. Packaging

| Item       | Now                                                         | Needed                                                                                                                                                |
| ---------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version    | `0.0.0`                                                     | Choose a first version (e.g. `0.1.0`) and add a changelog                                                                                             |
| Effect     | Regular `dependency`, pinned to `4.0.0`                     | Effect libraries usually declare `effect` as a **peer** dependency so apps share one copy (decision 3)                                                |
| Runtime    | Node only: `wasm-pack --target nodejs` plus `createRequire` | Already stated in the README and docs. Add a bundler/browser build later if wanted (decision 4).                                                      |
| Publishing | No release workflow                                         | Add an npm publish workflow, or document manual steps. The README and site already show `npm install effect-prophet effect` with no pre-release note. |

## Smaller issues

- **VitePress is on `2.0.0-alpha.20`.** The stable 1.6.4 is over a year old and pulls in Vite
  versions with audit warnings. Move to 2.0 stable when it ships.

## Decisions needed

1. **Flat growth with additive events, regressors or conditional seasonality.** These are rejected
   today, but work when a multiplicative component is present, and Python supports them. The docs
   site documents the limitation. _Recommendation:_ route them through the existing mixed flat
   fitter.
2. **Uncertainty method.** We use Python's exact per-path simulation, not its default vectorized
   shortcut, and intervals require an explicit `predictUncertainty` call with a seed.
   _Recommendation:_ keep, and list it as a documented difference.
3. **Effect as a peer dependency.** _Recommendation:_ make it a peer dependency with a `^4.0.0`
   range.
4. **Node-only for the first release.** _Recommendation:_ yes. Add browser/bundler support later.

Decided:

- Drop the OLS default and match Python (done).
- One acceptance policy: linear is judged output-first, like logistic (done).

## After the first release

- Country holiday calendars (needs a data-provider and license decision)
- Bayesian fitting / `mcmc_samples`
- Warm starts
- Regressor predictor models
- Browser/bundler build
- Worker-based parallel cross-validation
- Performance benchmarks for evaluation workloads
- Monthly horizons and custom metrics in diagnostics
