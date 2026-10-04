# Logistic reconciliation

**Latest public checkpoint:** under the [output-first acceptance policy](../decisions/logistic-map.md#benchmark-acceptance-output-first),
all 28 investigation cases and four controls pass. One case, `defaults-256`, carries investigation
flags for its fitting objective and stationarity residual; its forecasts agree within the
unchanged gates. Five earlier stationarity failures were traced to the residual's exact-zero
Laplace test ([below](#near-zero-delta-stationarity)). The two fit-endpoint numerical tests now
follow the same policy and report their gaps instead of failing ([below](#output-first-numerical-tests)).
Historical checkpoints below are retained separately.

## First red checkpoint

The release direction is **Python Prophet 1.4.0 behavior by default**, with improved edge behavior considered only through explicit opt-ins. Previous documented differences are investigation targets, not exclusions.

This checkpoint adds 28 [logistic investigation cases](../../benchmark/cases/growth/logistic/README.md) to the existing benchmark harness, 18 immutable v2 input datasets, and real pinned-Python adapter regressions. The harness now admits empty logistic changepoints and default optimizer controls. Growth-only requests actually omit all fitting/seasonality options in both adapters. Existing v1 bytes, case settings and tolerances are unchanged.

**The first checkpoint did not change production fitting, prediction, public options or saved-model implementation.** It established the red baseline, not completed reconciliation or a speed optimization. The subsequent numerical validation and first production fix are recorded separately below.

## Runs and provenance

- Initial 26-case run: `2026-10-03T001650-224Z-8be8f0e6` — all 26 investigation cases failed their declared contract.
- Expanded 28-case run plus four unchanged controls: `2026-10-03T002336-037Z-8be8f0e6` — **28 investigation failures, four control passes**.
- Package source: `8be8f0e68afa9c5a6b5935881d1ad4756b74fe83` plus local benchmark/tooling/documentation changes; dirty-tree provenance is explicit.
- Platform: Apple M4 Pro host, native `linux/arm64` Docker, release-built WASM, Python 3.12.11, unmodified `prophet==1.4.0`, CmdStanPy 1.3.0.
- Effect image: `sha256:9774878eeb9b9521eb82e5051f27fa5e784b854e38519a8ec7377aac7ec4a495`.
- Python image: `sha256:4fa59b2b2bdb05df5d84acf042ea5851a6b8c837cd1cbb8d620ef0097f5ac542`.

Raw artifacts are local, gitignored files in `benchmark/results/runs/<run-id>/`: frozen declarations/manifest, both adapters' correctness projections, eligibility and report. These are **not retained release baselines**. Retention requires the new shared inputs committed in HEAD; that check has not been bypassed. The checked-in selection, datasets and frozen gates let another developer reproduce the investigation.

Final run SHA-256 identities:

| Artifact              | SHA-256                                                            |
| --------------------- | ------------------------------------------------------------------ |
| `cases.json`          | `8ecdb14c13ea083e57b5a291c87ffba7c65d68937f2841cdc21de926f64ee768` |
| `manifest.json`       | `adfaf6d2299c012f6b816352432b6b735269be66cf2819086ed71f7578af327a` |
| `effect-prophet.json` | `561401afd7004d0df363ef7216729121e83b4384a8ef19ae70c039f09d9c5cee` |
| `python-prophet.json` | `4229b8d0569791daab8b311778d1e06ef04f9f1c9d2b44c9fe91d600b10c7bdf` |
| `report.json`         | `607b2db5280bb9cbbfc1abcd49a22e3f78d16fd9c203362397dde452d17970e6` |
| `report.md`           | `de9abc0fe4556c9a457ee6fe8d312ec425a06c2097cba8e5fe413ad6f9f2d930` |

Both adapters ran two independent correctness repetitions. Python had no local correctness failures. Effect's two growth-only cases failed seasonality metadata checks in both repetitions. The remaining new cases produced finite forecasts, passed local reconstruction and public persistence checks, but failed cross-language quality expectations. No new logistic case admitted timing.

The unchanged controls passed: `map-events-small-stan-v2`, `linear-offset-scaling-absmax-stan-v2`, `logistic-implicit-floor-minmax`, and `flat-constant-minmax`. Their existing contracts remain distinct from the stricter new logistic contract.

## Findings in everyday language

### 1. Default requests do not mean the same thing

Python enables a weekly pattern for these daily histories. Effect's built-in patterns default to off. The two growth-only requests therefore fail immediately on their learned feature lists. The adapter did not switch Effect to automatic seasonality to disguise this difference.

The shared option defaults also affect other growth families. A fix must reconcile that shared policy and its tests/documentation, not quietly install a logistic-only benchmark workaround.

### 2. No-changepoint handling can cause large forecast differences

The original no-point cases use Python's default preference for small changes, and their forecasts happen to agree closely. That does **not** resolve the internal-state difference.

Two additional cases keep the same input bytes but explicitly allow larger learned changes (`changepointPriorScale: 10`). Python still creates a private zero-time change parameter, then combines it with its public rate after fitting while leaving its time offset unchanged. Our current fitter never creates that parameter. On these cases the maximum forecast differences are about **23 units with absmax** and **41 units with minmax**.

A real pinned-Python regression confirms that the private parameter is nonzero and that independent fitting-score evidence comes from the executable's state before folding. Forecast comparison uses Python's actual public prediction behavior after folding. We do not substitute a corrected Python equation or remove these cases.

### 3. Small forecast differences can coexist with fitting differences

Many configured-feature examples produce very similar forecasts but substantially different stationarity diagnostics. Other cases also miss the fitting-score and forecast gates. The existing optimizer stops when parameters **or** fitting score change little; it does not require its stationarity diagnostic to be small.

Python itself can stop with a sizeable residual. A residual difference is not proof that Effect's result is always worse, and comparing independently fitted endpoints is not a same-point derivative test. These differences remain investigation work, not a reason to relax the gates or claim that every forecast is wrong.

Representative run-0 differences, with identical results across the two repetitions:

| Case suffix (`logistic-reconcile-`) | Absolute fitting-score difference | Maximum final-forecast difference (output units) |
| ----------------------------------- | --------------------------------: | -----------------------------------------------: |
| `basic-96-empty-absmax`             |                       0.000025659 |                                      0.000064844 |
| `basic-96-explicit-absmax`          |                       0.001107470 |                                      0.000429406 |
| `basic-96-auto-absmax`              |                       0.047398714 |                                      0.004858347 |
| `basic-96-explicit-minmax`          |                       0.047301877 |                                      0.049609228 |
| `basic-96-auto-minmax`              |                       3.138778269 |                                      0.369557261 |
| `empty-loose-prior-absmax`          |                       0.039387618 |                                     22.996506860 |
| `empty-loose-prior-minmax`          |                       0.100905363 |                                     41.154305549 |
| `basic-256`                         |                       4.574607911 |                                      0.044392878 |
| `weekly`                            |                       0.000922789 |                                      0.000493992 |
| `mixed-minmax`                      |                       0.000611861 |                                      0.000550286 |
| `duplicates`                        |                       0.000646933 |                                      0.000429362 |
| `constant`                          |                       0.186257331 |                                      0.000938766 |

These absolute differences are diagnostic readings of raw projections, not a second eligibility report. Official gates short-circuit at the first failure, so their displayed quantity columns may be `n/a`. All 28 new cases remain failed. No gate, budget or input was loosened after observing the results.

## Same-point numerics and first production fix

At the first numerical checkpoint, the generated [`stan-logistic-objective.json`](../../integration/fixtures/prophet-1.4.0/stan-logistic-objective.json) froze **22 probes across six cases**. They cover private dummy changepoints with default/loose priors, changing explicit floors/minmax, conditional additive seasonality with an event and multiplicative regressor, repeated final dates, endpoint clipping, Laplace kinks and nonzero rate sign crossings.

- Score and complete gradients come from the **unmodified bundled Stan executable**, with `jacobian=False` and `sig_figs=12`. Probe parameters are canonicalized before evaluation; CPU-sensitive feature columns are rounded before both implementations receive them.
- Native Rust and WASM run the **actual logistic evaluator** at those same points. Every score and gradient passes the frozen criteria (`1e-7` absolute).
- The existing **Stan Newton stencil** also matches (`2e-12` absolute), including perturbations crossing the Laplace kink. This does not assert that the old proximal optimizer's diagonal approximations are exact Hessians.
- The two fitted empty-point cases retain executable parameters before folding and actual Python public forecasts afterward. The loose-prior private delta is about **1.324**. Rust correctly scores that private state and predicts from the frozen public state without changing Python's offset. **At this checkpoint, our fitter did not yet return that state.**

In everyday language: the tested fitting equation and its derivatives agree when given identical inputs. That lets us investigate initialization, private state and solver behavior without mistaking independently fitted endpoints for a derivative test. It does not establish parity at exact zero segment-rate singularities or every possible numerical state, and it does not justify weakening the stationarity gate.

### Repeated-final-date initialization: red then green

The new initializer regression failed before the fix: the duplicate endpoint selected a starting rate near **4.23846** and offset **0.42401**, whereas Python selected **3.99831** and **0.44947**. Python uses the first row at the latest date; Rust used the last row.

[`logistic_map.rs`](../../rust/prophet-wasm/src/logistic_map.rs) now initializes from the first row at the final normalized time. Every repeated row still participates in fitting; nothing is deduplicated. The regression now passes natively and in WASM. This is a pure internal numerical change inside the existing traced fitting boundary, not a new Effect boundary. Public options, prediction equations, solver budgets/stopping and persisted model format remain unchanged.

Shared executable-probe and curvature tooling was extracted from the existing linear generator; **all pre-existing fixture JSON files remain byte-identical except the manifest**. Existing linear numerical tests still pass. The manifest now hashes both generator source files, not only the case-construction script.

### Unchanged-suite rerun

Run `2026-10-03T010303-468Z-8be8f0e6` uses the same native `linux/arm64` envelope and **byte-identical `cases.json`** as the original 32-case checkpoint. Both adapters again ran two correctness repetitions. Result: **28 investigation failures, four unchanged control passes**. No logistic investigation case admits timing; the initializer fix alone does not resolve the larger private-state/solver/default mismatches. This remains local dirty-tree evidence, not a retained baseline.

| Artifact                                                    | SHA-256                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------ |
| Initial numerical-checkpoint `stan-logistic-objective.json` | `ebd8f82fce6b781bda683a5c12e3126ca1741b6da0c8a2054e5bb011748ee246` |
| Run `cases.json`                                            | `8ecdb14c13ea083e57b5a291c87ffba7c65d68937f2841cdc21de926f64ee768` |
| Run `manifest.json`                                         | `217a275af7b2ac592d91066ad619442254d10feedd337359647886a51063717a` |
| Run `effect-prophet.json`                                   | `4cdf98c811491193da786b4d02908f9ff7934d820af37ee11c55a4080bcd153a` |
| Run `python-prophet.json`                                   | `6ff49bdd02350d6ae08c026d2eb3eace59289e301a76297ec30fa6f063878810` |
| Run `report.json`                                           | `06b5c7f38d699c14851e44d6fc2b024bf9c64ab1081c69d3a249f1af0b2b5c24` |
| Run `report.md`                                             | `cfc15d7e7eaba6cbaa81819b0ee180782b2034d7279d7b5bfbc8bd027d7d7797` |

Follow-on verification: **103 native Rust**, **22 WASM numerical**, **25 generated-binding**, **451 public**, **64 benchmark**, **29 fixture integration**, and **six real pinned-Python adapter tests** pass. `npm run fixtures:check` confirms regenerated bytes, manifest hashes and containerized integration tests. Typechecks, lint, Clippy, formatting and diff checks pass.

## Native Stan fitting checkpoint — not a public cutover

The shared Newton/L-BFGS policy now accepts a logistic objective without adding
another optimizer stack. It retains row-count selection, original-initialization
fallback, and per-attempt budgets. Native logistic fitting keeps private dummy
delta/beta coordinates, diagnoses the pre-fold state, and performs Python's actual
public fold (`k += delta[0]`, with `m` unchanged). Historical proximal controls remain
explicit; the TypeScript/WASM production framing still selects them. Built-in
seasonality defaults and public solver-control migration are not complete.

The expanded oracle consumes the unchanged 96-row benchmark bytes for both loose-prior
scaling cases. Together with the small loose-prior case, these pass native/WASM fitting
score, normalized noise, forecast, and stationarity comparisons at the existing gates.
The small default-prior case passes score/noise/forecast checks but remains **red** at
the `0.01` stationarity-difference gate:

- Rust and WASM: `66.78806427342305`, Newton objective-change completion at 40 iterations.
- Pinned Python: `66.8126860857`, with 38 accepted Newton steps.
- Absolute difference: approximately `0.024622`; no diagnostic waiver or tolerance change.

The artifact now contains **31 density/gradient probes across eight cases**, retaining
all 28 ordinary-curvature probes and their absolute `2e-12` gate. Three additional
low-noise states come from a saved unmodified Newton trajectory (`save_iterations`
changes output only). Their density/gradients pass `1e-7`. At each same state, a real
one-step bundled-executable optimization matches Rust/WASM coordinates within `1e-10`.
These same-state checks do **not** certify the independently fitted endpoint or full
trajectory. Low-noise curvature is not asserted from rounded executable gradients:
12-significant-digit output lacks the resolution needed for that existing absolute gate.

The Stan arithmetic path now follows literal gamma recurrence/reverse propagation,
keeps inverse-logit values for differentiation, and uses deterministic Eigen double
packet exponentials rather than substituting scalar libc exponentials. That packet-path choice
was subsequently disproved by the executable value-view probe below and removed from fitting.
The shared
spectral owner follows Eigen QR/deflation and projection grouping; Householder reduction
still uses nalgebra, so bitwise Eigen parity is not claimed. No spectral floors,
extra optimizer iterations, or relaxed stopping criteria were added. Remaining
full-trajectory sensitivity is an investigation target, not an acceptance exemption.

Checkpoint verification: **107 native tests pass / one fails**, and **26 WASM numerical
tests pass / the same one fails**. All existing linear fixture/solver regressions pass.
Public tests (**451**), generated-binding tests (**25**), and pinned-fixture integration
(**29**) pass. `npm run fixtures:check` confirms canonical regenerated bytes and hashes.
The new artifact SHA-256 is
`6970cca83bbd6bbc65bf11344066a17885b72a6522ddcce08aafd2500693e9dc`.
No new public benchmark result or retained baseline is claimed at this checkpoint.

## Public defaults and solver cutover

Run `2026-10-03T175723-858Z-8be8f0e6` retains **byte-identical declarations**
(`cases.json` SHA-256 `8ecdb14c13ea083e57b5a291c87ffba7c65d68937f2841cdc21de926f64ee768`),
unchanged datasets, gates and per-attempt budgets. Both native `linux/arm64` adapters ran two
correctness repetitions. Result: **21 investigation passes, seven failures, four unchanged control
passes**. Every failing case has zero admitted measurements. This remains local, gitignored,
dirty-tree evidence, not a retained release baseline.

### Public changes and regressions

- Omitted and partially specified built-in controls now default to `"auto"` for linear, flat and
  logistic. The existing timestamp-only resolver follows Python's thresholds and nonzero gaps.
  Growth-only logistic metadata now matches Python without adapter overrides.
- Generated CV initial windows now use full-history-resolved seasonality periods, as Python does,
  rather than the old conservative static yearly period. This does not fit the full history;
  fold fitting still uses only training prefixes. Explicit cutoffs/initial windows skip schedule
  seasonality resolution. OLS remains available with all built-ins explicitly off and no MAP/scaling
  request. Ordinary linear fitting still chooses OLS if automatic seasons resolve empty and no
  MAP/scaling controls are supplied; this separate linear-default difference is not reconciled
  by the logistic cutover. Historical custom-only/OLS tests now say so explicitly; fixture JSON
  is not changed.
- Public logistic controls now select the existing shared Stan stack. Newton below 100 retained
  rows, L-BFGS at/above 100, overrides, original-initialization Newton fallback and fresh per-attempt
  budgets reach WASM. Finite budget completion reports `iteration-limit`, not convergence.
- Private no-point fitting, pre-fold diagnostics, and Python's actual public fold now reach public
  prediction, persistence, uncertainty replay and CV. The former **23/41-unit** loose-prior forecast
  mismatches now pass; maximum differences are approximately `2.82e-8` / `1.39e-10` output units.
- Legacy proximal models remain restorable with their historical method identity. Explicit
  `algorithm: "proximal"` selects that policy; an untagged explicit historical tolerance override
  retains its meaning. Omission or a budget-only override selects Stan, never proximal.
- A shared Stan wire/diagnostic owner serves linear and logistic. Complete WASM boundary spans
  record bounded requested/actual choices and attempt counts; real fallback, typed failure,
  interval containment, parentage, and validation-before-boundary paths are tested.
- Real public tests cover 99/100 selection including duplicates, algorithm overrides, honest
  one-step completion, malformed saved evidence, legacy restoration, CV projection, candidate
  count reduction/repetition, irregular subdaily sorting and prediction-instance alignment.

The broader library suite passes **490 public tests**, **29 fixture integration tests**, and
**27 generated-binding tests**. Native numerics remain **107 passes / one unchanged failure**;
WASM numerics retain the same parked failure. Typechecks, benchmark tests, lint and strict Clippy
pass. These successes are scoped and do not turn the seven public compatibility failures green.

### Remaining frozen failures

Run-0 diagnostic readings below are identical across repetitions. The forecast column is an
inspection of raw projections, **not** a replacement gate or permission to admit timings.
The official report short-circuits at the first failed quality gate.

| Case suffix            | Objective absolute difference | Stationarity absolute difference | Maximum forecast difference |
| ---------------------- | ----------------------------: | -------------------------------: | --------------------------: |
| `basic-96-auto-minmax` |                     `1.33e-8` |                        `22.7822` |                   `2.23e-9` |
| `defaults-96`          |                     `7.34e-7` |                        `3.57065` |                   `1.33e-8` |
| `defaults-256`         |               **`0.0132904`** |                      `5245.0161` |               `0.000223265` |
| `weekly`               |                    `2.26e-10` |                      `0.0286520` |                   `8.67e-8` |
| `declining`            |                    `5.89e-11` |                      `0.0580222` |                   `1.41e-7` |
| `saturated`            |                     `2.56e-8` |                        `7.89857` |                  `5.27e-10` |
| `out-of-bounds`        |                     `1.79e-7` |                        `1.32676` |              `0.0000166918` |

Six first fail the unchanged `0.01` diagnostic-equality gate. `defaults-256` first fails the
unchanged `0.01` objective gate, and also differs on diagnostics. These are independently fitted
endpoint comparisons, not same-state equation checks. No root-cause or full-trajectory parity
claim follows from the passing cases. The separate 12-row default-prior numerical residual
(`66.78806427342305` versus `66.8126860857`) is deliberately parked and remains an asserted failure.

| Artifact              | SHA-256                                                            |
| --------------------- | ------------------------------------------------------------------ |
| `manifest.json`       | `471001ab36e0a2f6303c3cbfe4c9e30e30c73742a68ad9f3be1df32e1cae2dce` |
| `effect-prophet.json` | `d2f06ac2bfa526d8ec5839b2af7341339cc57b49678e6b02e28449ac807a5fce` |
| `python-prophet.json` | `47cba976471ab7e7bab277721aa54d43d2156860b55d588f7da565e3d9b95b20` |
| `report.json`         | `2a114f86de035b8ba7207180b8c81b1e6b3340c6f5135ff4e0dcfaaca72e9144` |
| `report.md`           | `5b1b5a3cde3d0062ebd44aa62e2463f33e5b92221bb4bcc63df727604e714c0c` |

## Fixed public prediction-state increment

The generated [`logistic-prediction-state.json`](../../integration/fixtures/prophet-1.4.0/logistic-prediction-state.json)
freezes **18 authored public states** through unmodified Prophet `setup_dataframe` and
`predict_trend`. Both scaling modes cover empty points, zero base/post-change rates, a zero
rate at the offset/origin/endpoint, later recovery, and nonzero sign crossings. Nonfinite
oracle rows are tagged in valid JSON, never replaced with a continuous equation.

The new regression was red before production changes: `empty-zero-absmax` returned the
finite midpoint `48.25` where Python's public dummy/gamma state produces a nonfinite row.
Twelve public fixture cases failed for the same continuous-extension mismatch. The fix is
method-specific public prediction, not a solver change:

- Stan models now evaluate Python's public gamma recurrence, including the zero-time,
  zero-delta prediction dummy after an empty-point fold. Python nonfinite forecasts become
  typed `PredictionError` values (`non-finite-forecast`), not successful NaN output.
- A singular future segment does not poison earlier rows. Complete batches fail at their
  first affected input row; per-row and prefix tests freeze this distinction.
- Point prediction and scalar simulation share one prepared fixed-trend owner. Simulation
  rejects a nonfinite baseline before drawing; its existing future-event/RNG policy is not
  changed or certified as Python-default uncertainty behavior.
- Persisted method identity selects the checked WASM prediction/simulation policy. Historical
  proximal states retain their continuous extension through restoration and uncertainty
  replay. Omitted/unknown wire policies are rejected rather than silently choosing a mode.
- Existing complete prediction/simulation spans record a bounded policy choice. Real public
  seams assert parentage, trace IDs, safe attributes, success/failure and interval containment,
  original typed error identity, and absence of boundaries on invalid/empty point requests.
- Additional public regressions cover a finite two-row, one-step Stan fit, single-row and
  zero-time-range fitting errors, incomplete capacity/floor policies, nonfinite bounds, and
  capacities at/below their floors. These are library input-contract checks, not a claim that
  Python's permissive handling of every malformed dataframe has been reproduced.

Verification: **501 public**, **59 pinned-fixture integration**, **28 generated-binding**,
and **64 benchmark-tooling** tests pass. Native numerics are **108 passes / one unchanged
failure**; WASM numerics are **27 passes / the same unchanged failure**. The parked default-prior
residual remains `66.78806427342305` versus `66.8126860857`, with its assertion and gate intact.
`npm run fixtures:check` confirms canonical bytes, manifest hashes and all 59 containerized
integration tests. Both TypeScript checks, lint, strict Clippy, formatting and diff checks pass.
The package-artifact smoke test passes (132 files), including the new public logistic-optimizer
declaration. Its historical featureless-OLS CV check now explicitly disables built-ins rather
than asserting the old default policy.
The original numerical artifact is byte-identical
(`6970cca83bbd6bbc65bf11344066a17885b72a6522ddcce08aafd2500693e9dc`); the new prediction-state
artifact SHA-256 is `402a14f3fa77db727b31d8fcec214ba8d2b0efade74b1d03b49a4d6cbc0b8634`.
These authored states do not establish universal extreme-arithmetic or sampled-future-state
parity, and no fitting gate, dataset, solver budget or stopping rule changed.

### Unchanged-suite rerun

Run `2026-10-03T202120-110Z-8be8f0e6` replays the previous 32-case selection with
**byte-identical `cases.json`**, unchanged inputs/gates/budgets, and the native `linux/arm64`
envelope. Both adapters run two correctness repetitions. The result remains **21 investigation
passes / seven failures / four control passes**, with exactly the same failed cases and zero
admitted measurements for each failure. All private fitting-quality evidence is identical to
the previous checkpoint in both adapters and repetitions: prediction-state changes do not
resolve the independently fitted endpoints. This is local dirty-tree evidence, not a retained
baseline or a speed claim.

| Artifact              | SHA-256                                                            |
| --------------------- | ------------------------------------------------------------------ |
| `cases.json`          | `8ecdb14c13ea083e57b5a291c87ffba7c65d68937f2841cdc21de926f64ee768` |
| `manifest.json`       | `31cac847e4da6331a7cc7bbe244747d49405e6038c5f7077994c5a82468b489e` |
| `effect-prophet.json` | `14b8a6c0c0ab662e9aec5b68c298df5e600dca34349b9cdbe802e2a08f9ba32c` |
| `python-prophet.json` | `0a534436575b812f64e255fe67ad927fbb813519bffe89d5b843b2b2b2e23526` |
| `report.json`         | `f37bf6be77dd15e418340bbc634f61bd40467ca031aa28a3b852e7203adb9411` |
| `report.md`           | `b2ae89f5ac490664a69fcdb237209601f14f6bb58f9356373af34026ae627bce` |

## Full-default 256-row L-BFGS localization

`stan-logistic-lbfgs.json` freezes the actual defaults-256 source dataset,
`benchmark/inputs/v2/logistic-weekly-256.json` (not the basic-256 control). A benchmark
contract test ties the oracle case ID, dataset path/checksum, iteration budget and
objective/noise gates to the unchanged catalog.

There are two deliberately distinct pinned `linux/amd64` oracles:

- **Unmodified public fit:** `Prophet(growth="logistic", uncertainty_samples=0).fit(...)`,
  with only output controls (`sig_figs=12`, saved iterations, refresh and output directory).
  It returns L-BFGS after 1220 iterations, terminating on relative gradient, with objective
  `-1786.03076039`, stationarity `6896.94379779` and normalized noise `0.000561079095016`.
  Private endpoint coordinates are retained at 12 significant digits. This endpoint is
  not the earlier native `linux/arm64` benchmark endpoint; neither is substituted for the other.
- **Controlled private problem:** the same preprocessing/problem with Fourier inputs rounded
  to 12 decimal places and the exact serialized 12-significant-digit initialization supplied
  to bundled Stan. Default L-BFGS controls and the 10,000-iteration budget are unchanged.
  The oracle returns density `1786.05680634` and normalized noise `0.000562876762052`
  after 975 iterations, also terminating on relative gradient. All 976 accepted states,
  including initialization, are retained. This is a diagnostic problem, not a changed public case.

The existing executable probe protocol supplies **13 same-state density/gradient probes**:
initialization, an authored nonzero-delta/feature state, the public endpoint evaluated on
rounded features, and controlled trajectory states 1, 8, 20, 38, 39, 50, 100, 300, 600 and 975.
The existing absolute `1e-7` density/gradient gates pass. Initialization passes `1e-10` and
accepted steps 1–8 pass the existing early-trajectory `1e-7` parameter gate.

The new full-budget regression is **red in both native Rust and WASM**, identically:

- First maximum coordinate difference exceeding `1e-7`: accepted iteration **39**, difference
  `2.87061903136987e-7`.
- Returned density: **`1786.0008343214663`**, versus **`1786.05680634`**, a difference of
  approximately **`0.0559720185`**, exceeding the unchanged **`0.01`** objective gate.
- Returned work: **1296 iterations**, relative-gradient termination.

This locates the first _thresholded accepted-state divergence_, not the first differing
floating-point operation. Passing these sampled gradients rules out discrepancies above
`1e-7` at these states; it does not establish bit-identical arithmetic or exclude smaller
errors amplified by a nonsmooth trajectory. Late states remain diagnostic evidence, not
an exact-trajectory release gate.

Two transient arithmetic experiments did not close the objective gate and were reverted:
column-major forward grouping returned density `1786.0180761138747` after 1047 iterations;
adding row-major feature-adjoint grouping returned `1786.004371086739` after 1095 iterations.
Neither establishes the cause of the first divergence. No production numerical change,
solver-budget change, relaxed stopping rule, waiver or benchmark-case change is retained.
The parked 12-row assertion remains intact with its original mismatch.

Verification: **65 benchmark tooling tests**, both TypeScript checks, lint, strict Clippy and
formatting pass. Canonical fixture regeneration/checking and container integration pass.
Native numerics now report **108 passes / two failures**; WASM numerics **27 passes / the same
two failures**: the newly frozen defaults-256 objective regression and the unchanged parked
12-row stationarity regression. The prior numerical-objective artifact remains byte-identical.
No new 32-case benchmark run or release baseline is claimed: runtime behavior is unchanged,
and the latest public evidence remains the seven-failure checkpoint above.

| Artifact                   | SHA-256                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| `stan-logistic-lbfgs.json` | `0bec00bc5b722a6951be657d1991f891842999558868f1c794e4020f76e1e29d` |
| Fixture `manifest.json`    | `9dd5dd958ef5c4fbd805ed070d39ba8e0e2538eb5af706dc2ad01932732d3e07` |
| `logistic-weekly-256.json` | `3110b94b54122792796675c0cf8be7017ca80a7147eb66663d0163c46ab2072c` |

## Operation-level arithmetic correction

The follow-on investigation replays identical vectors through pinned-source C++ `LBFGSUpdate`:
all 40 captured update factors and search directions match Rust exactly. This exonerates those
updates **for identical vectors**, not complete line search or optimizer trajectories. Temporary
operation tracing has been removed; the solver file matches its pre-tracing backup.

A density-accumulator experiment was rejected and reverted. Plain Eigen's seven-element reduction
returned `-6` for the authored cancellation input, but the actual
`stan::math::accumulator<stan::math::var>` returned the sequential `-4`. A transient better endpoint
was not accepted as proof. Default pandas CSV parsing also lost low bits in 18-digit diagnostics;
raw executable CSV parsing removed that ambiguity. Higher-precision diagnostics remain temporary,
not a change to fixture precision or fitted-output canonicalization.

Six authored normalized problems now accompany the existing controlled trajectory in
`stan-logistic-lbfgs.json`. Unmodified bundled-executable `log_prob`, `jacobian=False`, and
`sig_figs=12` supply every expected density and complete gradient. These are private arithmetic
probes, **not public preprocessing cases**; their observations and parameters are authored inputs,
not raw fitted optimizer output. The unchanged `1e-7` density/gradient checks run the real evaluator
on native Rust and WASM.

| Probe                            | Red observation                                                 | Proven correction                                                                        |
| -------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Additive adjoint cancellation    | Rust beta gradient `1`, executable `2`                          | GLM double-valued product uses row-major packet grouping.                                |
| Multiplicative adjoint control   | Packet grouping returns `2`, executable `1`                     | Variable-adjoint product retains scalar accumulation.                                    |
| Inverse-logit value view         | Density `-2.520131641538`, executable `-2.02013164154`          | Matrix-of-var value view is not packet-accessible; fitting uses scalar exp on every row. |
| Changepoint forward cancellation | Density about `-2.576e29`, executable `-4.02`                   | `A * delta` and `A * gamma` use column-major accumulation.                               |
| Changepoint column blocks        | Executable beta gradient `-0.99999998477`                       | 128 columns use the Eigen column-block heuristic, not a row-major reduction.             |
| Changepoint adjoint cancellation | Delta gradient `1.5728954659318548`, executable `1.78644773297` | Transposed products consuming variable-adjoint views use scalar row order.               |

The precise reduction owners live in `stan/reductions.rs`; both trend evaluation and reverse
propagation reuse the forward owner. The old packet exponential is test-only, retaining a bounded
counterexample. Historical proximal arithmetic and public prediction policy are unchanged. These
pure numerical corrections remain inside the existing complete traced fitting boundary; no
record-level spans, exporter requirements, new optimizer stack, or stopping/budget changes are added.
All six operation probes are green. This is bounded typed-path evidence, **not** identification of
every differing operation or a bit-identical default trajectory.

The scalar-value/additive increment temporarily passed the full objective gate (density
`1786.0542078843273`, gap `0.0025984557`, 1237 iterations). The subsequent independently proven
matrix-path corrections put the combined full-fit result outside that gate again:

- Native and WASM density: **`1786.0280819588352`**, oracle **`1786.05680634`**;
  gap **`0.0287243812`**, still above the unchanged **`0.01`** gate.
- **1249 iterations**, relative-gradient completion. First accepted-state difference exceeding
  `1e-7`: step **39**, `1.0436342368080886e-7`; initialization and steps 1–8 remain green.
- The parked assertion remains intact: `66.78563065905489` versus `66.8126860857`,
  42 Newton iterations with objective-change completion. It is not waived or moved.

Arithmetic is selected by executable/source-path evidence, not whichever grouping gives the
closest independently fitted endpoint.

### Unchanged public replay and verification

Run `2026-10-03T224208-182Z-8be8f0e6` replays the unchanged 32-case selection on native
`linux/arm64`: **22 investigation passes / six failures / four passing controls**. The declining
case now passes. Remaining failures are `basic-96-auto-minmax`, `defaults-96`, `defaults-256`,
`weekly`, `saturated`, and `out-of-bounds`. Defaults-256 still first fails objective equality;
the other five first fail stationarity equality. Both adapters' repeated fitting-quality evidence
is identical, and every failed case admits zero measurements. An intermediate scalar-value replay
(`2026-10-03T222001-871Z-8be8f0e6`) passed 23 investigation cases; out-of-bounds becomes red again
after the proven matrix corrections. It is not reported as a final pass.

This is local dirty-tree correctness evidence, with verification workloads on the host, not a
retained release baseline or performance claim. Canonical `linux/amd64` private fixture endpoints
remain distinct from these native `linux/arm64` public endpoints.

Verification: **501 public**, **59 containerized fixture integration**, **28 generated-binding**,
and **65 benchmark tooling** tests pass; the package smoke test passes **132 files**. Native
numerics are **109 passes / two failures**; WASM numerics are **28 passes / the same two failures**.
Canonical fixture checking, both TypeScript checks, lint, strict Clippy and formatting pass.
Concurrent local package/binding builds initially collided in generated output; sequential
rebuilds and reruns pass without source changes. The earlier numerical-objective artifact remains
byte-identical at `6970cca83bbd6bbc65bf11344066a17885b72a6522ddcce08aafd2500693e9dc`.

| Artifact                   | SHA-256                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| `stan-logistic-lbfgs.json` | `062a407eb72c7d06e7a22300f2b617f0aefa87e4e72b2e6fdead22b6b1f8fcc9` |
| Fixture `manifest.json`    | `89782bc23510ea0efa920c2567bb0d02804c5ec856220f1e0ba182a0c60ce4b7` |
| Run `cases.json`           | `8ecdb14c13ea083e57b5a291c87ffba7c65d68937f2841cdc21de926f64ee768` |
| Run `manifest.json`        | `a56bf2fcb37d30835e40b34541dbde4fa112047aaa265253d2922ad15c99ab6d` |
| Run `effect-prophet.json`  | `29df31c45204256c01fbd82c3d87ca2af08ebad1b83ded9a64d10e1c2188ce9b` |
| Run `python-prophet.json`  | `260b195b2ac0278d968e0535ddbaaef51693cb2f9b82b41290f96c47252491cf` |
| Run `report.json`          | `37a3dc0da402c08dd585c39a3e2117c3fb05b31e5f3111f61aea3cc2469e3c21` |
| Run `report.md`            | `df26d68c9ece9974ff52e81cde2b52a4a5deed9a383cda52bd837770fcba213f` |

## Near-zero-delta stationarity

### Diagnosis

Five of the six remaining failures (`basic-96-auto-minmax`, `defaults-96`, `weekly`, `saturated`,
`out-of-bounds`) first failed stationarity equality while their objectives agreed to about `1e-7`.
Each case was refit in the unchanged native `linux/arm64` benchmark images, and **both** endpoints
were evaluated by the same unmodified bundled executable (`log_prob`, `jacobian=False`). Effect's
endpoint reproduced Effect's reported objective and residual exactly, so the evaluator and
parameter mapping agree.

The residual is an infinity norm whose Laplace subgradient applied only when a delta was
**exactly** `0.0`. Stan's Newton and L-BFGS do not soft-threshold, so near-zero deltas land at
round-off magnitudes on either side of zero and contribute `smooth ± 1/tau`. In
`basic-96-auto-minmax`, Python stops at `delta[2] = +4.337e-11` and Effect at `-1.856e-9`. Both
have smooth log-density derivative `-11.39111`, inside `[-20, 20]`, giving `31.39111` versus
`8.60889`; their sum is exactly `2/tau = 40`. `out-of-bounds` shows the same pattern.

| Case                   | Exact-zero residual (Py / Effect) | Near-zero deltas with opposite signs | Kink-aware gap |
| ---------------------- | --------------------------------: | -----------------------------------: | -------------: |
| `basic-96-auto-minmax` |            `31.39111` / `8.60889` |                               1 of 1 |       `1.5e-6` |
| `defaults-96`          |           `29.82236` / `29.99340` |                              6 of 14 |       `1.5e-6` |
| `saturated`            |           `20.54664` / `28.44521` |                               1 of 1 |       `1.1e-3` |
| `out-of-bounds`        |           `19.33658` / `20.66342` |                               1 of 1 |       `2.6e-5` |
| `weekly`               |             `0.03019` / `0.00154` |                                 none |       `2.9e-2` |
| `defaults-256`         |           `1349.278` / `8818.191` |                              7 of 16 |         `7469` |

`weekly` has no near-zero deltas. Its objectives agree to about `1e-12`; Python's Newton run simply
stops less stationary than Effect's. `defaults-256` is dominated by the noise coordinate on both
sides and remains a genuine endpoint difference.

### Approved changes

Jeremy approved two changes on 2026-10-03:

- **One definition for every family.** A delta within `LAPLACE_KINK_TOLERANCE = 1e-6` of zero is
  at its kink: its smooth derivative is compared with `[-1/tau, 1/tau]`. Moving such a delta to
  zero changes the objective by at most about `1e-6 * (|derivative| + 1/tau)`, far below the
  `0.01` objective gate. The shared Rust owner is `laplace_stationarity_residual` in
  `map_objective.rs`, used by the Stan constrained residual and by the linear, mixed and logistic
  proximal evaluators. `tools/prophet/linear_optimizer_evidence.py` mirrors it for Python
  evidence. Deltas beyond the tolerance keep their complete derivative, bit-for-bit as before.
- **Logistic gate is `no-worse-than-python`.** Effect's residual may exceed Python's by at most
  `0.01`; a smaller Effect residual passes. Superseded the same day by the
  [output-first policy](#output-first-acceptance), which keeps this one-sided rule as an
  investigation threshold rather than a gate.

The cutoff is a convention, not a derived bound. In these cases, opposite-sign near-zero deltas
are at most `4.1e-9`; the closest separation between a kink delta and a moved delta is in
`defaults-96` (`3.3e-7` versus `1.8e-5`, same sign on both sides).

New regressions cover the shared helper (sign invariance, exact-zero equivalence, the tolerance
boundary, Stan log-density orientation), the mirrored Python function, schema parsing, and the
one-sided report rule.

### Fixture and benchmark evidence

`npm run fixtures:generate` changed exactly one value: a linear `conditional-map-fit.json`
residual from `2.03187242548` to `0.00426013530686`, the same artifact on a linear Stan fit.
All three logistic numerical artifacts are byte-identical, including the parked 12-row expected
residual (`66.8126860857`), so that regression is not a kink artifact.

Run `2026-10-04T011801-702Z-61e11737` uses the same 32 selected cases from the current catalog on
native `linux/arm64`, with rebuilt images and two correctness repetitions: **27 investigation
passes / one failure / four control passes**. The five cases above now pass; no previously
passing case regressed. Both repetitions are identical. Apart from `defaults-256`, Effect's residual
never exceeds Python's by more than `8.3e-5`, so only `weekly` depends on the one-sided rule.
`defaults-256` still first fails objective equality. This is local dirty-tree evidence on top of
checkpoint commit `61e1173`, not a retained baseline.

Verification: **501 public**, **59 containerized fixture integration**, **68 benchmark tooling**
and **seven pinned-Python adapter** tests pass, and the WASM node suite passes **28**. Native
Rust has **112 passes / two failures** and the WASM optimizer suite **28 passes / two failures**;
both failures are the unchanged defaults-256 objective and parked 12-row assertions.
`npm run fixtures:check`, formatting, lint, strict Clippy and both TypeScript checks pass.

| Artifact                  | SHA-256                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| Run `cases.json`          | `385012b1cec66bc9db3dfbe785c0e7f183420400b7e24650754d3979832cd3a3` |
| Run `manifest.json`       | `380296289f01fe353e37a92bcdfa5ffc7caeba92ef95781b4dabcd49b996c959` |
| Run `effect-prophet.json` | `31feb01f8458c76cdcff5febecfa55c755e43b888d5d3ff2cfe0e78a63222fce` |
| Run `python-prophet.json` | `bf5c8d730ccd0f209cc9825a93a98d618ba98221d6e5fe59a98def4efea57fb9` |
| Run `report.json`         | `dc906b8a447feccc618b5f8fa4d8f7dbe1997ff37409689dc83cbda9e4db61aa` |
| Run `report.md`           | `e79bf885bb218315820f0fcfffa291ebbbab24aaf362d2d222ac669870b84051` |

## Output-first acceptance

Jeremy chose to make fitted outputs the acceptance standard for logistic comparisons: forecasts,
components, metadata and persistence must match, while the fitting objective, normalized noise and
stationarity residual are reported and flagged for investigation, not failed. The
[decision](../decisions/logistic-map.md#benchmark-acceptance-output-first) records the gates,
thresholds and how this differs from linear, which still gates objective and noise.

The logistic declarations now use `{ kind: "output-first", investigate: { objectiveAbsolute: 0.01,
normalizedNoiseAbsolute: 0.0002, stationarityExcess: 0.01 } }`. Thresholds are the previous gate
values; none is loosened. Missing, nonfinite, negative-residual or nonpositive-noise evidence still
fails. Flags appear in each case's JSON `investigations`, its note, and a dedicated Markdown table.
New report tests cover a passing case with all three flags, stationarity flagged only when Effect
is worse, and forecast, metadata, persistence and run-alignment mismatches still failing.

Run `2026-10-04T015306-934Z-61e11737` repeats the same 32 cases on native `linux/arm64` with two
correctness repetitions: **all 28 investigation cases and four controls pass**, and timings are
admitted. Both repetitions are identical.

| Flag                        |        Effect |        Python | Effect - Python | Explanation                                                                                                                   |
| --------------------------- | ------------: | ------------: | --------------: | ----------------------------------------------------------------------------------------------------------------------------- |
| `defaults-256` objective    | `-1786.02978` | `-1786.06100` |        `0.0312` | Explained: Python itself splits across CPUs at the same step; see [cross-CPU check](#defaults-256-cross-cpu-check).           |
| `defaults-256` stationarity |     `8818.19` |     `1349.28` |          `7469` | Explained: the noise coordinate dominates both residuals, so neither endpoint is near-stationary; same cross-CPU sensitivity. |

The defaults-256 maximum differences are `0.00113` for trend, `0.00112` for forecast and
`1.27e-5` for components, all inside the unchanged `0.01` and `0.002` gates.

| Artifact                  | SHA-256                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| Run `cases.json`          | `589c22736a84635863453bcfe022fde0c04906002909e1b3ed2feb8cc2cd42da` |
| Run `manifest.json`       | `84fe2f9a38625d16af01d0b3ac49d11600815da52ba0f924975dc7c720a73360` |
| Run `effect-prophet.json` | `b8346fe7fd6b27a766aadf3bcbbd57ca65aba03885d0561a3c4cd35ac25c6ef6` |
| Run `python-prophet.json` | `5463e214dd2e283510e519b3c6778e15a567b48c1c84b7cf95103ce9e0a80e68` |
| Run `report.json`         | `f1cfa5f4011f160c47c619a355ac523079cb303dc4a38f8780e1489b5d5042d4` |
| Run `report.md`           | `47ba5c8e595c34da412f69f14fbf92d66af9025aef01fcc5c9a8aee8cf53c937` |

This is local dirty-tree evidence on top of checkpoint commit `61e1173`, not a retained baseline.

### defaults-256 cross-CPU check

The controlled defaults-256 problem was built once in the canonical `linux/amd64` reference image
(`data.json` SHA-256 `5b99d6ca85155c07eee92eb9f693a3d6934893a47eca7f0a0505e8113b6ec3c8`, `inits.json`
`cc7036c06fb716ad651a108f70a9928c61e04d12f1033f9fb653706b4532a08f`). Unmodified Prophet 1.4.0 and
its bundled executable then optimized those identical bytes with default L-BFGS controls, the
10,000-step budget and `sig_figs=18` output, on `linux/amd64` and on a `linux/arm64` build of the
same pinned Dockerfile:

| Run                                     | Iterations |        Final density |
| --------------------------------------- | ---------: | -------------------: |
| Python `linux/amd64` (repeat identical) |        975 | `1786.0568063418507` |
| Python `linux/arm64`                    |       1271 | `1786.0285726503103` |
| Effect native/WASM                      |       1249 | `1786.0280819588352` |

The amd64 trajectory reproduces the frozen fixture within `6.5e-12`. The two Python runs start
identically, differ by `1.1e-19` after step 1, and grow roughly tenfold every few steps: `8.2e-12` at
step 10, `6.9e-8` at step 38 and **`7.3e-7` at step 39**, the first step beyond `1e-7`. Effect's
trajectory against the amd64 oracle also first exceeds `1e-7` at step 39. Python's own final densities
differ by `0.028`, beyond the `0.01` investigation threshold.

**Conclusion:** the defaults-256 divergence is last-bit rounding amplified by this nonsmooth L-BFGS
problem, indistinguishable from Python's own cross-CPU behaviour. It is not evidence of an Effect
arithmetic bug, and no further trajectory-parity work is planned for it. Same-input tests remain
the guard against real arithmetic differences.

### Output-first numerical tests

Frozen-fixture tests split into two kinds. **Same-input tests** feed Python's frozen internal values
into our code: density and gradient probes, Newton stencils, operation probes, prediction from fixed
states, initialization and the early L-BFGS trajectory. These stay exact assertions; no search is
involved, so they should agree on every machine. **Fit-endpoint tests** run a complete optimization
and compare where it stops. Two of these were the remaining red tests; they now follow the
output-first policy:

- `logistic_defaults_256_matches_frozen_initialization_and_early_steps` still asserts
  initialization and accepted steps 1-8 within `1e-7`. It prints the first divergence (step 39) and
  the final density (`1786.0280819588352` versus `1786.05680634`) and noise against their thresholds.
- `fitting_empty_point_histories_matches_frozen_public_fold_and_forecasts` still asserts the public
  fold and fitted forecasts. Objective and normalized noise are printed as
  `investigate` lines when their absolute difference exceeds the threshold; stationarity, as in the
  benchmark, only when Effect's residual exceeds Python's. None is printed: the 12-row default-prior
  residual (`66.78563065905489` versus `66.8126860857`) is lower than Python's; see the
  [12-row cross-CPU check](#12-row-cross-cpu-check).

### 12-row cross-CPU check

The `implicit-empty-default` public Newton problem was built once on `linux/amd64` (`data12.json`
SHA-256 `4b69417c9cac0f365fa19eafe12b2a9e8f9d1f91258a1ae3f3c83264c9ea94b3`, `inits12.json`
`45204c8d775e7482cad3934a380d95fb2858417e41c96feb6234e9286599e1a8`) and optimized with unmodified
Prophet 1.4.0 Newton on `linux/amd64` and `linux/arm64`. Effect's native Newton path was recorded
with a temporary, since-removed test that reran the production optimizer with budgets 1, 2, 3, ...
Every endpoint was scored by the same pinned `linux/amd64` executable, which reproduces Effect's
reported residual exactly.

| Run                                     | Newton steps |        Objective |  Stationarity |
| --------------------------------------- | -----------: | ---------------: | ------------: |
| Python `linux/amd64` (repeat identical) |           38 | `-82.7699986481` | `66.81268614` |
| Python `linux/arm64`                    |           39 | `-82.7699991219` | `66.81895596` |
| Effect                                  |           43 | `-82.7699992767` | `66.78563066` |

The noise coordinate sets every residual. All three paths agree to four decimals of the residual
through step 35 (`66.8361`). The two Python runs differ from step 1 (`4.4e-16`) and pass `1e-7` at
step 38; Effect passes `1e-7` against both at step 36, where it takes a slightly different backtracking
step. Earlier per-step differences between Effect and Python are within a few times Python's own
cross-CPU differences. Each run then creeps toward the same limit until an objective change falls
below `1e-8`. Effect stops last, with the **lowest objective and lowest residual** of the three.

**Conclusion:** the 12-row stationarity gap reflects Effect stopping later on the same descent, not
an arithmetic bug. Under the one-sided stationarity rule shared by the benchmark and this test, it is not flagged.

Native Rust: **114 passed / 0 failed**. WASM optimizer: **30 passed / 0 failed**. Strict Clippy and
formatting pass.

## Remaining TDD increments

1. ~~Explain the defaults-256 investigation flags.~~ Explained by the
   [cross-CPU check](#defaults-256-cross-cpu-check).
2. Extend the bounded fixed-state/input coverage where further oracle evidence exposes gaps,
   especially extreme arithmetic, malformed/minimal Python preprocessing and sampled future
   singular states. Existing same-state and lifecycle regressions are not universal parity evidence.
3. ~~Explain the 12-row default-prior stationarity gap.~~ Explained by the
   [12-row cross-CPU check](#12-row-cross-cpu-check).
4. Rerun unchanged comparisons after each focused fix. Review/commit the complete working tree
   before using the established retention workflow; no baseline promotion is claimed here.

## First-checkpoint verification

- Package public tests: **451 passed**.
- Benchmark contract/tooling tests: **64 passed**.
- Pinned-fixture integration tests: **29 passed**.
- Native Rust tests: **100 passed**; real generated WASM tests: **25 passed**.
- Real pinned-Python adapter tests: **6 passed**, including the 99/100 algorithm boundary, actual default configuration and nonzero private no-point state.
- `npm run fixtures:check`: canonical fixture bytes/manifest match; all 29 containerized integration tests pass.
- Production and benchmark typechecks, lint, formatting and `git diff --check` pass.

Passing tooling/library tests establish that the harness and existing behavior still work. They do not make the 28 red compatibility targets green.
