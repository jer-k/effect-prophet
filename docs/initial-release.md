# Initial release: status and remaining work

Last updated 2026-10-04 on `main` (`585b5be`). This file is the current read on what's left before
a first release. Where the older docs under `docs/` disagree with it, trust this one.

## Summary

The library is functionally complete for a first release. It has all three Prophet trend types,
seasonalities, events, regressors, multiplicative components, uncertainty intervals,
cross-validation, model search and save/load.

What's left is mostly **cleanup and release mechanics**:

1. Repair the benchmark catalog: about a third of it no longer runs.
2. Record one clean benchmark baseline, then write the docs site's Python comparison pages.
3. Settle packaging: license, version, peer dependency, publishing.
4. Retire the old `docs/` folder.

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

## Docs follow-ups from the OLS removal

- Remove the changepoint warning in `site/examples/trend.md`.
- Optionally drop the explicit `changepoints: { mode: "auto" }` from the docs examples. It is
  harmless, but no longer needed.
- Run `npm run docs:examples` again and update the outputs shown on the pages if any changed.

## Where things stand

| Area                                                 | Works | Matches Python?                                                                                                            | Saved benchmark evidence                                                                                    |
| ---------------------------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Linear growth                                        | Yes   | Yes. Every linear fit now uses Prophet's MAP model.                                                                        | 22 of 24 pass. The 2 failures are zero-span inputs (every timestamp identical), which we reject on purpose. |
| Flat growth                                          | Yes   | Yes for the covered cases. Additive-only flat with events, regressors or conditional seasonality is rejected (decision 1). | 22 of 22 pass                                                                                               |
| Logistic growth                                      | Yes   | Yes, judged on outputs (forecasts must match; internal fit numbers are reported only)                                      | None saved yet. 28 of 28 passed locally.                                                                    |
| Seasonalities (auto, custom, conditional)            | Yes   | Yes                                                                                                                        | Covered by fixtures and the growth cases                                                                    |
| Events/holidays (custom), regressors, multiplicative | Yes   | Yes                                                                                                                        | Covered by fixtures and the growth cases                                                                    |
| Uncertainty intervals                                | Yes   | Different method on purpose: Python's default is a vectorized shortcut (decision 2)                                        | None runnable: 10 of 12 cases are stale                                                                     |
| Cross-validation, metrics, search, holdout reports   | Yes   | Yes where Python has an equivalent                                                                                         | 14 saved; the 5 logistic ones are now stale                                                                 |
| Save/load                                            | Yes   | Uses its own format. Python JSON is deliberately not supported.                                                            | Lifecycle tests                                                                                             |

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

### 1. Repair the benchmark catalog

**48 of 138 declared cases can no longer run.** They pass optimizer settings
(`relativeTolerance`/`absoluteTolerance`) that the library now rejects as invalid options. One
benchmark-tooling unit test also fails because of this, in
`benchmark/tools/test/evaluation.test.ts`, which builds the logistic evaluation cases.

| Group                                                                       | Stale cases | Why                                                                                         |
| --------------------------------------------------------------------------- | ----------: | ------------------------------------------------------------------------------------------- |
| Original linear MAP cases (`map-*`, `map-training-*`, `linear-offset-*`, …) |          21 | Old coordinate optimizer; `-stan-v2` copies replace them.                                   |
| Original logistic cases and their `-stan-v2` copies                         |          12 | The `-stan-v2` helper doesn't touch logistic, so both copies still carry proximal settings. |
| `evaluation-logistic-*`                                                     |           5 | Built from `logistic-implicit-floor-*`. Still listed in the current saved baseline.         |
| `uncertainty-*` (linear and logistic)                                       |          10 | Built from the stale cases above. No `-stan-v2` copies exist.                               |

To fix:

- Delete the historical linear and logistic originals and their `-stan-v2` copies. The
  `logistic-reconcile-*` cases already cover logistic.
- Point the evaluation and uncertainty cases at current, default-controlled sources.
- Remove the old-control branch of `effectOptimizer` in `benchmark/tools/case.ts`, so a stale case
  fails catalog validation instead of failing at run time.
- Drop the `-stan-v2` suffix once the originals are gone.

### 2. Record one clean baseline, then fill in the Python pages

Every saved run is marked "dirty tree", and several predate the linear rewrite or the kink fix.
After the catalog repair:

- Run the full suite from a clean commit.
- Save it as one current baseline.
- Prune the older saved snapshots under `benchmark/results/retained/`.
- Write the three outline pages in `site/python/` from that baseline:
  - **Accuracy:** for each feature area, the largest forecast difference as a share of the data's
    range.
  - **Coming from Python:** a translation table.
  - **Differences:** the known gaps.

  The outlines list what each page needs.

### 3. Packaging

| Item       | Now                                                         | Needed                                                                                                                                                |
| ---------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| License    | `"UNLICENSED"`, no `LICENSE` file                           | Pick one. Prophet is MIT; the third-party notices for Stan, Eigen, nalgebra and ARM routines already ship in `wasm/third-party/`.                     |
| Version    | `0.0.0`                                                     | Choose a first version (e.g. `0.1.0`) and add a changelog                                                                                             |
| Effect     | Regular `dependency`, pinned to `4.0.0`                     | Effect libraries usually declare `effect` as a **peer** dependency so apps share one copy (decision 3)                                                |
| Runtime    | Node only: `wasm-pack --target nodejs` plus `createRequire` | Already stated in the README and docs. Add a bundler/browser build later if wanted (decision 4).                                                      |
| Publishing | No release workflow                                         | Add an npm publish workflow, or document manual steps. The README and site already show `npm install effect-prophet effect` with no pre-release note. |

### 4. CI and local checks

- **CI skips several checks** that `npm run check` runs locally: `benchmark:test`,
  `benchmark:typecheck`, `test:wasm:optimizer` and the four `examples/` scripts. The new docs
  workflow covers the site examples only.
- **`npm run check` fails on a fresh clone.** `benchmark:test` imports `effect-prophet` from
  `dist/`, but `check` only builds `dist/` later, in `test:package`. Existing checkouts pass
  because an old `dist/` is lying around. Fix: build before `benchmark:test`, or point the
  benchmark's Vitest at `src/` the way the root `tsconfig.json` does.
- **Decide whether `examples/` should stay.** The four scripts overlap with the docs-site
  snippets, which are now type-checked and run in CI. Consider removing them, or moving anything
  they cover that the site doesn't.

### 5. Retire the old docs

`docs/` still holds 27 files, about 3,500 lines, written as build-out notes. Some are now wrong:

- `docs/usage/operations.md` says model search is not implemented.
- The compatibility doc and `tools/prophet/README.md` describe proximal fitting as available.

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
5. **One acceptance policy.** Logistic is judged output-first; linear still gates on objective and
   noise. _Recommendation:_ move linear to output-first too, so there is one rule.

Decided: drop the OLS default and match Python (done).

## After the first release

- Country holiday calendars (needs a data-provider and license decision)
- Bayesian fitting / `mcmc_samples`
- Warm starts
- Regressor predictor models
- Browser/bundler build
- Worker-based parallel cross-validation
- Performance benchmarks for evaluation workloads
- Monthly horizons and custom metrics in diagnostics
