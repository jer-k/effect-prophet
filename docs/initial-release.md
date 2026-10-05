# Initial release: status and remaining work

Last updated 2026-10-04 on branch `linear-growth-benchmarks`. This file is the current read on what's left before
a first release. Where the older docs under `docs/` disagree with it, trust this one.

## Summary

The library is functionally complete for a first release. It has all three Prophet trend types,
seasonalities, events, regressors, multiplicative components, uncertainty intervals,
cross-validation, model search and save/load.

What's left is mostly **cleanup and release mechanics**:

1. Benchmark logistic the way linear and flat now are, then finish the docs site's Python pages.
2. Settle packaging: license, version, peer dependency, publishing.
3. Retire the old `docs/` folder.

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

## Where things stand

| Area                                                 | Works | Matches Python?                                                                                      | Saved benchmark evidence                                                                          |
| ---------------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Linear growth                                        | Yes   | Yes. Every linear fit now uses Prophet's MAP model.                                                  | 31 of 33 pass (`linear-growth` baseline). The 2 others are zero-span inputs we reject on purpose. |
| Flat growth                                          | Yes   | Yes. Additive-only flat with events, regressors or conditional seasonality is rejected (decision 1). | 34 of 34 pass (`flat-growth` baseline)                                                            |
| Logistic growth                                      | Yes   | Yes, judged on outputs (forecasts must match; internal fit numbers are reported only)                | None saved yet. The 28 reconciliation cases and the 6 older cases pass locally.                   |
| Seasonalities (auto, custom, conditional)            | Yes   | Yes                                                                                                  | Covered by fixtures and the growth cases                                                          |
| Events/holidays (custom), regressors, multiplicative | Yes   | Yes                                                                                                  | Covered by fixtures and the growth cases                                                          |
| Uncertainty intervals                                | Yes   | Different method on purpose: Python's default is a vectorized shortcut (decision 2)                  | Linear: 5 of 5 pass (saved). Logistic: 6 of 6 pass locally.                                       |
| Cross-validation, metrics, search, holdout reports   | Yes   | Yes where Python has an equivalent                                                                   | 14 of 14 pass (`flat-growth-and-evaluation` baseline), plus linear's 5 in its own baseline.       |
| Save/load                                            | Yes   | Uses its own format. Python JSON is deliberately not supported.                                      | Lifecycle tests                                                                                   |

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

### 1. Benchmark logistic like linear and flat, then fill in the Python pages

- Rerun every logistic case (the 28 reconciliation cases, the 6 older ones, and the uncertainty and
  evaluation cases built from them), save a `logistic-growth` baseline, then add a description
  file and a suite entry for `/benchmarks/logistic`.
- Once logistic is saved, the `flat-growth-and-evaluation` snapshot is fully duplicated by the
  three per-trend baselines. Retire it and point the two tests that use it as a fixture
  (`catalog.test.ts`, `run-fixture.ts`) at one of the new ones.
- Every saved run so far is from a dirty tree. Before release, rerun all three from a clean commit.
- Write the remaining outline pages in `site/python/`: **Coming from Python** (a translation
  table) and **What's different** (the known gaps). **How close are the results?** is written;
  update its status table as each trend is verified.

### 2. Packaging

| Item       | Now                                                         | Needed                                                                                                                                                |
| ---------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| License    | `"UNLICENSED"`, no `LICENSE` file                           | Pick one. Prophet is MIT; the third-party notices for Stan, Eigen, nalgebra and ARM routines already ship in `wasm/third-party/`.                     |
| Version    | `0.0.0`                                                     | Choose a first version (e.g. `0.1.0`) and add a changelog                                                                                             |
| Effect     | Regular `dependency`, pinned to `4.0.0`                     | Effect libraries usually declare `effect` as a **peer** dependency so apps share one copy (decision 3)                                                |
| Runtime    | Node only: `wasm-pack --target nodejs` plus `createRequire` | Already stated in the README and docs. Add a bundler/browser build later if wanted (decision 4).                                                      |
| Publishing | No release workflow                                         | Add an npm publish workflow, or document manual steps. The README and site already show `npm install effect-prophet effect` with no pre-release note. |

### 3. Retire the old docs

`docs/` still holds 27 files, about 3,500 lines, written as build-out notes. Some are now wrong:

- `docs/usage/operations.md` says model search is not implemented.
- The compatibility doc and `tools/prophet/README.md` describe proximal fitting as available.
- The compatibility doc, several decision records and the evaluation modeling page link to
  benchmark snapshots that the current baselines replaced, so those links are now broken.

The docs site replaces the user-facing parts. Proposal:

- Delete `docs/usage/` and `docs/modeling/`; the site covers them.
- Delete or archive `docs/decisions/` and `docs/validation/`. Git history keeps them.
- Replace `docs/compatibility/prophet-1.4.0.md` with the site's Python pages.
- Keep this file until the release, then delete it.

## Smaller issues

- **`evaluateHoldout` needs non-empty tuple types** for `development` and `holdout`, while `fit`
  accepts plain arrays. Results of `array.slice(...)` need a guard first; see
  `site/snippets/holdout.ts`. Consider accepting plain arrays and validating at run time, as `fit`
  does.
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
