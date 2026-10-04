# Initial release: status and remaining work

Snapshot taken 2026-10-03 on branch `logistic-growth` (`bcf6fd1`). This is a fresh starting
point. It does not depend on the older docs, and where they disagree, this file is the current
read.

## Summary

The library is functionally complete for a first release. It has all three Prophet trend types,
seasonalities, events, regressors, multiplicative components, uncertainty intervals,
cross-validation, model search and save/load. All tests pass.

What is left is mostly **cleanup and release mechanics**, not modeling work:

1. Repair the benchmark catalog: about a third of it no longer runs.
2. Record one clean benchmark baseline.
3. Settle packaging: license, how Effect is declared, Node-only support.
4. Make a few product decisions about where we knowingly differ from Python.
5. Replace the docs with a small, current set.

## Where things stand

| Area                                                 | Works | Matches Python?                                                                                                            | Saved benchmark evidence                                                                                    |
| ---------------------------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Linear growth                                        | Yes   | Yes once fitting uses MAP (see decision 1)                                                                                 | 22 of 24 pass. The 2 failures are zero-span inputs (every timestamp identical), which we reject on purpose. |
| Flat growth                                          | Yes   | Yes for the covered cases. Additive-only flat with events, regressors or conditional seasonality is rejected (decision 2). | 22 of 22 pass                                                                                               |
| Logistic growth                                      | Yes   | Yes, judged on outputs (forecasts must match; internal fit numbers are reported only)                                      | None saved yet. 32 of 32 passed locally before the proximal removal.                                        |
| Seasonalities (auto, custom, conditional)            | Yes   | Yes                                                                                                                        | Covered by fixtures and the growth cases                                                                    |
| Events/holidays (custom), regressors, multiplicative | Yes   | Yes                                                                                                                        | Covered by fixtures and the growth cases                                                                    |
| Uncertainty intervals                                | Yes   | Different method on purpose: Python's default is a vectorized shortcut (decision 3)                                        | None runnable: 10 of 12 cases are stale                                                                     |
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
(`relativeTolerance`/`absoluteTolerance`) that the library now rejects as invalid options.

| Group                                                                       | Stale cases | Why                                                                                              |
| --------------------------------------------------------------------------- | ----------: | ------------------------------------------------------------------------------------------------ |
| Original linear MAP cases (`map-*`, `map-training-*`, `linear-offset-*`, …) |          21 | Old coordinate optimizer; `-stan-v2` copies replace them. Includes the README's example command. |
| Original logistic cases and their `-stan-v2` copies                         |          12 | The `-stan-v2` helper doesn't touch logistic, so both copies still carry proximal settings.      |
| `evaluation-logistic-*`                                                     |           5 | Built from `logistic-implicit-floor-*`. Still listed in the current saved baseline.              |
| `uncertainty-*` (linear and logistic)                                       |          10 | Built from the stale cases above. No `-stan-v2` copies exist.                                    |

To fix:

- Delete the historical linear and logistic originals and their `-stan-v2` copies. The
  `logistic-reconcile-*` cases already cover logistic.
- Point the evaluation and uncertainty cases at current, default-controlled sources.
- Remove the old-control branch of `effectOptimizer` in `benchmark/tools/case.ts`, so a stale case
  fails catalog validation instead of failing at run time.

### 2. Record one clean baseline

Every saved run is marked "dirty tree". Several predate the linear rewrite or today's kink fix.
Once the catalog is repaired:

- Run the full suite from a clean commit.
- Save it as one current baseline.
- Prune the older saved snapshots under `benchmark/results/retained/`.

### 3. Merge `logistic-growth`

The branch includes:

- the stationarity kink fix
- the output-first logistic acceptance policy
- the removal of the proximal algorithm

It is green locally.

### 4. Packaging

| Item        | Now                                                                                 | Needed                                                                                                                                                  |
| ----------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| License     | `"UNLICENSED"`, no `LICENSE` file                                                   | Pick one. Prophet is MIT; the third-party notices for Stan, Eigen, nalgebra and ARM routines already ship in `wasm/third-party/`.                       |
| Version     | `0.0.0`                                                                             | Choose a first version (e.g. `0.1.0`) and add a changelog                                                                                               |
| Effect      | Regular `dependency`, pinned to `4.0.0-beta.107`                                    | Effect libraries usually declare `effect` as a **peer** dependency so apps share one copy (decision 4)                                                  |
| Runtime     | Node only: `wasm-pack --target nodejs` plus `createRequire`                         | State "Node ≥ 22.19 only" clearly, or add a bundler/browser build (decision 5)                                                                          |
| Publishing  | No release workflow                                                                 | Add an npm publish workflow, or document manual steps                                                                                                   |
| CI coverage | CI runs format, lint, typecheck, unit tests, package smoke, Rust and fixture checks | Also run `benchmark:test`, `benchmark:typecheck`, `test:wasm:optimizer` and the four example scripts. `npm run check` covers them locally; CI does not. |

### 5. README

Rewrite it for a first-time user:

- install
- one quick-start example
- supported features
- a short "differences from Python" list

Remove the ticket numbers (EP-0xx) and benchmark-history caveats. Its benchmark command currently
points at a stale case.

### 6. Docs reset

There are 27 docs and about 3,500 lines, much of them investigation history. Some are already
wrong:

- `docs/usage/operations.md` says model search is not implemented.
- The compatibility doc and `tools/prophet/README.md` describe proximal fitting as available.

Proposal:

- **Keep and rewrite briefly:**
  - README
  - this file
  - a slimmed compatibility table (one line per capability, no history)
  - the usage guides
- **Archive or delete:**
  - `docs/decisions/`
  - `docs/validation/`
  - the investigation-heavy `docs/modeling/` pages

  Git history preserves them.

## Bugs found while writing the docs site

- **Passing `map` without `changepoints` turns changepoints off.** `fit(data)` uses 25 automatic
  changepoints, but `fit(data, { map: { changepointPriorScale: 0.5 } })` silently uses none (a
  straight-line trend). The `map.changepoints` default in `src/options.ts` is
  `{ mode: "explicit", timestamps: [] }`; Python's default is always 25 automatic. Logistic growth
  is affected the same way. The docs examples work around it with `changepoints: { mode: "auto" }`,
  and `site/examples/trend.md` has a warning to remove once fixed.
- **`evaluateHoldout` needs non-empty tuple types** for `development`/`holdout`, while `fit`
  accepts plain arrays, so `array.slice(...)` results need a guard first.

## Decisions needed

1. **Featureless linear default.** `fit(observations)` with no seasonalities, events or regressors
   uses ordinary least squares. Python always fits MAP with 25 automatic changepoints. Automatic
   seasonalities make this rare, but it still happens for short daily histories (under two weeks)
   and monthly data under two years. _Recommendation:_ default to MAP to match Python. OLS stays
   available only if we want it as an explicit option.
2. **Flat growth with additive events, regressors or conditional seasonality.** These are rejected
   today, but work when a multiplicative component is present, and Python supports them.
   _Recommendation:_ route them through the existing mixed flat fitter, or list them as known
   gaps.
3. **Uncertainty method.** We use Python's exact per-path simulation, not its default vectorized
   shortcut, and intervals require an explicit `predictUncertainty` call with a seed.
   _Recommendation:_ keep, and list it as a documented difference.
4. **Effect as a peer dependency, and shipping on an Effect beta.** _Recommendation:_ make it a peer
   dependency with a compatible range. Decide whether to wait for a stable Effect 4.
5. **Node-only for v0.1.** _Recommendation:_ yes. Add browser/bundler support later.
6. **One acceptance policy.** Logistic is judged output-first; linear still gates on objective and
   noise. _Recommendation:_ move linear to output-first too, so there is one rule.

## After the first release

- Country holiday calendars (needs a data-provider and license decision)
- Bayesian fitting / `mcmc_samples`
- Warm starts
- Regressor predictor models
- Browser/bundler build
- Worker-based parallel cross-validation
- Performance benchmarks for evaluation workloads
- Monthly horizons and custom metrics in diagnostics
