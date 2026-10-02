# Linear MAP alignment with frozen Prophet 1.4.0

**Status:** Coordinated implementation and local acceptance checks complete under the [approved fit-quality policy](linear-map-benchmark-acceptance.md); pending final review/merge. Near-stationarity acceptance remains deferred to EP-097.

**Owner/review:** Jeremy reviews optimizer, convergence, public-control and persistence changes before implementation.

**Related:** [Current optimizer decision](map-optimizer.md), [compatibility matrix](../compatibility/prophet-1.4.0.md), EP-096, and the separate EP-093 logistic investigation.

## Pre-adoption compatibility decision

Jeremy confirmed that the package has no real-world users and no saved models. This migration may make a clean breaking change to linear MAP options and the saved linear MAP format. Do not add legacy coordinate-model decoding, compatibility unions, migration shims, or legacy restoration tests solely to preserve the superseded format.

New models must still serialize and restore without refitting, preserve their actual method/termination/fallback diagnostics, and support prediction and uncertainty after restoration. Reject obsolete linear controls and incompatible saved formats explicitly rather than silently reinterpreting them. Preserve the original benchmark failure evidence; it is diagnostic history, not a model-format compatibility obligation. Flat/logistic policies remain outside this migration.

## Implementation progress

### Final local closeout

Jeremy approved explicit diagnostic-only stationarity reporting under EP-097, without optimizer changes or wider numerical tolerances. The native-arm64 run `2026-10-02T043132-582Z-4d661a06` covers 24 cases: 22 pass their independently declared fit-quality/lifecycle gates; two zero-span linear comparisons remain unusable failures with no timing. This includes the full migration edge set, original linear feature workloads, large automatic features, scaling, mixed components, duplicate uncertainty and evaluation. The [retained review](../../benchmark/results/baselines/linear-map-stan-fit-quality-native-arm64/README.md) discloses dirty-tree provenance, executable hashes and descriptive timing limits.

`npm run check` and `npm run fixtures:check` pass: 433 public, 100 native Rust, 19 Node-WASM numerical, 25 direct WASM, 29 integration and 46 benchmark tests, plus formatting, lint/clippy/typechecks, package smoke and all examples. The public optimizer lifecycle suite additionally asserts real success/failure/fallback span completion, safe optimizer attributes, trace/direct-parent IDs and interval containment. All 62 snapshotted fixture/historical files remain byte-identical. The previously recorded formatting blocker is no longer reproducible; full checks pass without a closeout edit to that unrelated file.

Review covered stable complete-row sorting/duplicates, generated versus explicit candidate invariants, controls/selection, original-initialization fallback and per-attempt budgets, honest stopping, persistence/obsolete-input rejection, bounded allocation/protocol failures and complete public/WASM tracing. Flat/logistic fitting policies and featureless-default OLS remain separate. No new legacy coordinate-model decoder or runtime compatibility shim was introduced.

This closes local EP-096 implementation/validation, not EP-097. Objective, forecast and noise gates pass independently for every qualified case, but residual differences reach about `79.984`; the other cases' causes are not established by the ordered-case investigation. Small residuals, global optima, bitwise trajectories, calibration and blanket Prophet compatibility are not claimed. Everything remains local/uncommitted and pending final review/merge.

### Numerical policy and production integration (pre-closeout record)

The Newton/L-BFGS policy now passes all 26 frozen optimizer cases on Linux amd64, native macOS arm64, and Node-hosted WASM. This includes the 99/100/101 retained-row threshold, duplicate-row selection, explicit overrides, finite budgets, stopping precedence, and original-initialization Newton fallback. Literal reduction/adjoint ordering and the pure-Rust portable exponential resolved the trajectory portability gap without changing the fitting problem or acceptance tolerances.

The normalized model-fitting seam now preserves objective and constrained stationarity diagnostics from the internal pre-fold state and records actual algorithm, termination, attempt count, known failed-attempt work, and final L-BFGS resets. The frozen suite exercises this seam as well as the raw optimizer. The public linear-control parser defines algorithm-specific settings and explicitly rejects obsolete coordinate tolerances. Additive and mixed linear paths now share the Stan model seam, version-two packed controls/completions, and new method identities. Flat/logistic and featureless-default OLS remain separate.

Validation includes 100 native Rust tests, 19 Node-hosted WASM numerical tests, 25 direct WASM tests, 433 public tests, 29 integration tests, 33 benchmark tests, and the 22-test strict parser/tracing suite. Fixture regeneration/checks pass. Added public oracle lifecycle coverage exercises threshold/duplicates, overrides, original-initialization fallback, finite exhaustion, restoration without refitting, and reference predictions. Additional acceptance tests reject obsolete public controls, incompatible coordinate-model identities, and malformed bounded optimizer-failure frames. Complete WASM spans now retain bounded requested/actual algorithm, budget, fallback, completion, and work counts.

Fresh native-arm64 versioned benchmark runs retain the original datasets and 10,000-step per-attempt budget. The run `2026-10-01T222129-649Z-4d661a06` qualifies eight of sixteen cases; six automatic-changepoint cases fail the declared stationarity-comparison gate and have no timing evidence. Two zero-span linear cases remain expected unusable comparisons. Objectives and normalized noise are close, but that does not authorize ignoring the stationarity failures. Twelve-digit CmdStan output was explicitly declared to avoid diagnostic rounding loss; the gate failures persist. Investigation also identified Eigen's ascending eigenpair ordering, now preserved with unchanged oracle gates. The sorted-eigenpair native run `2026-10-01T224335-779Z-4d661a06` still qualifies eight cases. Emulated amd64 run `2026-10-01T225338-666Z-4d661a06` reproduces the stationarity failures in all four targeted automatic cases, with no accepted timings; a CPU-only cause is not established. Both are retained as diagnostic snapshots under `benchmark/results/baselines/linear-map-stan-{native-arm64,amd64}-diagnostic/`. Package smoke (125 files), all example checks/runs, lint/clippy/typechecks, and `git diff --check` pass. Full formatting/check remains blocked only by the preexisting unrelated `benchmark/docker/buildkitd.toml` formatting issue, left untouched.

A [focused same-point investigation](linear-map-stan-same-point-investigation.md) now freezes `map-training-ordered-auto-stan-v2`. Prepared inputs and initialization agree exactly, and ten identical-vector probes agree within the existing density/gradient oracle tolerances, including both fitted endpoints and the reconstructed real WASM endpoint. Native accepted-step comparison localizes the first consequential divergence to step 103: slightly different accumulated states take different near-threshold backtracking decisions; Rust replay from the saved Stan starting vector reproduces Stan's next step within approximately `2.09e-12`. Native Rust stops at 106 steps, Stan at 124, both under the declared objective-change rule. The public WASM endpoint exactly reproduces the retained failure, whose dominant constrained residual is sigma. This establishes endpoint/stopping sensitivity rather than a same-point objective/gradient discrepancy for this case, not universal acceptance or the precise earlier floating-point source of state drift. At that investigation checkpoint the endpoint-residual gate remained unchanged and broader acceptance was deferred. The reviewed policy and final local rerun above now supersede that gate for new evidence only; historical failures are unchanged.

Numerical and lifecycle acceptance do not establish near-stationarity or universal compatibility.

### Earlier Newton-stage record

The first stage adds the shared additive/mixed unconstrained linear density, private dummy parameters, Prophet initialization, and the pinned Newton finite-difference/joint-update/backtracking/termination strategy. Frozen executable diagnostics and fitted results are generated in `stan-linear-optimizer.json`, including the original ordered/unsorted 96-row datasets. Pure numerical tests run natively and in Node-hosted WASM without introducing production debug APIs.

The executable reports Stan 2.37.0 and its amd64 hash matches the existing fixture manifest. The Rust spectral primitive uses pinned nalgebra 0.34.1 Householder tridiagonalization and a bounded symmetric QR adaptation with a stable terminal 2×2 rotation. A direct use of nalgebra's fixed-root terminal eigenvector basis failed the declared one-step comparison; the reconstruction/residual regression remains to prevent that loss of accuracy. Source notices/licenses are carried into package artifacts.

Stage validation passed: 92 native Rust tests, 11 Node-hosted WASM numerical tests, 25 existing WASM adapter tests, 384 public tests, 33 benchmark tests, 29 integration tests, locked fixture regeneration/checking, lint/typechecking, and package/example checks. `npm run check` remains blocked at the initial format check by the pre-existing `benchmark/docker/buildkitd.toml` formatting issue; that unrelated file was left unchanged and the remaining check stages were run separately.

This stage does **not** switch the public solver, complete L-BFGS/selection/fallback, migrate controls or persisted method/termination identities, or close the public migration blocker. Flat/logistic/coordinate fitting and existing public spans are unchanged. The next stage is L-BFGS and policy coverage, followed by the coordinated Rust/WASM/TypeScript fitting and lifecycle migration. Do not mark the full acceptance gates complete based on numerical-core tests alone.

## Goal

Replace the linear MAP coordinate-descent strategy with behavior aligned to the optimization stack shipped with the frozen Python Prophet 1.4.0 reference. Alignment includes the model parameterization, initialization, algorithm selection, numerical updates, stopping rules, fallback policy and caller-visible termination behavior—not merely making the two failing controls return a model.

Keep execution in Rust/WASM. Applications must not require Python, CmdStan, a native subprocess, BLAS, a network service or a tracer/exporter dependency.

This plan intentionally revisits the accepted coordinate-descent decision. Matching Stan's actual behavior takes precedence over that decision's preference for exact coordinate updates and change-based convergence. Do not approximate the Laplace objective, raise budgets to hide failures, or loosen comparison tolerances.

## Scope and preserved boundaries

- All **linear MAP** fitting paths: featureless, seasonal, conditional, event/regressor, and additive/multiplicative mixtures. Implement additive first, then mixed; do not declare completion after fixing only the featureless 96-row case.
- Prediction, uncertainty, evaluation and persistence consumers of those fitted models must continue to work without rerunning fitting or candidate selection.
- Flat and logistic solvers remain unchanged. EP-093 is linked evidence, not authorization to change logistic convergence.
- The separate featureless-default OLS policy remains unchanged and explicitly different from Python's default MAP. This work cannot establish blanket default/API parity.
- Preserve stable training-row sorting, independent duplicate rows, aligned covariates, repeated generated candidates, and strictly increasing explicit user changepoints.
- Preserve canonical UTC ingestion, missing-target rejection, prediction order and duplicates, caller-owned temporal partitions, and caller-owned forecast schedules.
- Continue to reject unusable/non-finite fitted state. Do not emulate Python's nominal success producing NaN models on degenerate histories. Record these safety exceptions explicitly rather than claiming exact parity for them.

## Evidence motivating the change

The [retained EP-096 run](../../benchmark/results/baselines/linear-growth-training-rows-native-arm64/README.md) includes ordered and unsorted unique-history controls. Both exhaust Effect's declared 10,000 iterations; Python returns finite models in two independent runs. The ordered control rules out sorting as the cause.

An isolated native-Rust diagnostic of the same 96-row, 25-candidate problem reproduced `NonConvergence` at 10,000 iterations. Maximum parameter change was about `2.104e-6` against a `1.01e-10` threshold; the complete KKT residual was about `12.1`. Continuing the same algorithm in the temporary diagnostic reached that threshold around iteration 464,274. Adjacent hinge-column normalized similarities ranged from approximately 0.994 to 0.9996.

This is evidence of slow coordinate convergence. The extended run is not a passing WASM benchmark, a new default budget, or a fresh measurement of Python's optimality. Python returning a model is also not proof that it satisfies our old stopping rule: Stan uses different termination rules and can return a model at budget exhaustion.

## Reference pin and source authority

Prophet is pinned to version `1.4.0`, source commit `abf69a215604afcaa7ecb4359f592d13bf6dea9f` in `tools/prophet/reference.json`. Its backend declares CmdStan `2.37.0` and loads the wheel's compiled `prophet_model.bin`.

Pin the **actual executable and dependency stack**, not just the Prophet version string. The existing fixture manifest and benchmark provenance already record dependency locks, executable hashes and execution platforms. The amd64 fixture executable and arm64 benchmark executable have different hashes; preserve this distinction.

Source chain identified for the CmdStan 2.37.0 release:

- CmdStan release: `v2.37.0`.
- Its Stan submodule: `1357c136bf22e3f0d25ed3529fea55fe76842eac`.
- That Stan tree's Math submodule: `58ad15b0847485d523aadd22cbae7add0a61b0e3`.

Before porting, verify the frozen executable's reported Stan version and build provenance against this source chain. Resolve Eigen and any other numerical-source revisions used by the release. Record immutable commit/file hashes and license obligations. Do not substitute latest Stan or independently upgrade CmdStanPy/NumPy/pandas while producing evidence.

### Source entrypoints

Prophet's pinned source is the authority for wrapper and model behavior:

- [`python/prophet/forecaster.py`](https://github.com/facebook/prophet/blob/abf69a215604afcaa7ecb4359f592d13bf6dea9f/python/prophet/forecaster.py): preprocessing, candidates, initialization, shortcuts and postprocessing.
- [`python/prophet/models.py`](https://github.com/facebook/prophet/blob/abf69a215604afcaa7ecb4359f592d13bf6dea9f/python/prophet/models.py): algorithm selection, controls and fallback.
- [`python/stan/prophet.stan`](https://github.com/facebook/prophet/blob/abf69a215604afcaa7ecb4359f592d13bf6dea9f/python/stan/prophet.stan): likelihood, priors and parameterization.

Stan source authority for the numerical port:

- [`services/optimize/newton.hpp`](https://github.com/stan-dev/stan/blob/1357c136bf22e3f0d25ed3529fea55fe76842eac/src/stan/services/optimize/newton.hpp).
- [`optimization/newton.hpp`](https://github.com/stan-dev/stan/blob/1357c136bf22e3f0d25ed3529fea55fe76842eac/src/stan/optimization/newton.hpp).
- [`model/grad_hess_log_prob.hpp`](https://github.com/stan-dev/stan/blob/1357c136bf22e3f0d25ed3529fea55fe76842eac/src/stan/model/grad_hess_log_prob.hpp).
- [`services/optimize/lbfgs.hpp`](https://github.com/stan-dev/stan/blob/1357c136bf22e3f0d25ed3529fea55fe76842eac/src/stan/services/optimize/lbfgs.hpp).
- [`services/optimize/defaults.hpp`](https://github.com/stan-dev/stan/blob/1357c136bf22e3f0d25ed3529fea55fe76842eac/src/stan/services/optimize/defaults.hpp).
- [`optimization/bfgs.hpp`](https://github.com/stan-dev/stan/blob/1357c136bf22e3f0d25ed3529fea55fe76842eac/src/stan/optimization/bfgs.hpp), its line-search/update includes, and pinned Math operations used by the model.

## Target behavior

| Concern                   | Current linear MAP                                             | Planned reference-aligned behavior                                                                                   |
| ------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Default method            | Cyclic coordinate updates                                      | Newton for fewer than 100 fitted rows; L-BFGS otherwise                                                              |
| Row count                 | Every retained observation                                     | Same; count duplicate rows, not distinct timestamps                                                                  |
| Initialization            | Endpoint line, zero adjustments/features, normalized noise 0.5 | Prophet initialization, including normalized noise 1.0                                                               |
| Parameter updates         | One coefficient at a time, then conditional noise              | Joint optimizer state including observation noise                                                                    |
| Positive noise            | Direct positive sigma                                          | Stan's unconstrained positive-parameter transform; default optimization excludes the transform Jacobian              |
| Laplace penalty           | Exact soft-threshold updates                                   | Exact Stan log density and derivative conventions; no objective smoothing                                            |
| Newton curvature          | None                                                           | Stan's finite-difference-of-gradient Hessian construction and spectral modification                                  |
| Default budget            | 10,000 sweeps                                                  | 10,000 optimizer steps per attempt, matching Prophet's override of Stan's service default                            |
| Newton stop               | Maximum parameter/noise change                                 | Absolute change in log posterior at most `1e-8`                                                                      |
| L-BFGS stop               | Not applicable                                                 | Pinned Stan criteria, ordering, norm definitions and machine-epsilon scaling                                         |
| Budget exhaustion         | Typed `non-convergence` failure                                | Return finite reference-aligned state with explicit iteration-limit termination, not falsely labeled convergence     |
| L-BFGS failure            | No corresponding policy                                        | Retry Newton from the original initialization when reference fallback is enabled                                     |
| No requested changepoints | Truly reduced objective                                        | Include Prophet's internal zero-time delta during fitting, then fold it into slope and expose zero public candidates |

The public summary remains more explicit than Python's wrapper: distinguish objective/gradient/parameter termination, iteration limit, no-progress termination and constant shortcut as supported by verified reference behavior. A returned model must not imply a global optimum or a passed KKT threshold.

## Implementation sequence

### 1. Freeze the behavioral oracle and acceptance criteria

Before replacing code:

1. Rebuild/use the locked reference environment and verify wheel/executable/lock/platform provenance.
2. Capture reference results for automatic and explicitly selected Newton/L-BFGS, fallback enabled/disabled, and deliberately small iteration budgets. Use reference iteration output to distinguish stopping from budget exhaustion.
3. Capture initialization, ordered optimizer coordinates, proportional log density, gradients, finite-difference curvature, selected steps and termination for small diagnostic problems. Use a test-only pinned reference harness when CmdStanPy's public outputs are insufficient; do not add production debug APIs.
4. Check exact-zero and near-zero delta derivatives against pinned Stan Math. Verify sigma transformation, objective constants/proportional terms, dummy feature columns and no-changepoint folding. Preserve these details where they affect updates or termination.
5. Declare numerical comparison tolerances and fit-quality checks before implementation. Compare forecasts/components/noise and independently evaluated posterior/KKT quality; parameter equality alone is inappropriate for non-identifiable duplicate columns.

**Deliverable:** a source-backed behavior table, reproducible oracle cases, and reviewed controls/termination contract. Existing compatibility gaps are not assumed to have been exhaustively audited merely because the two control failures were diagnosed.

### 2. Establish one linear MAP objective owner

Audit the whole repository before adding numerical helpers. Existing owners include `map_objective.rs`, `piecewise_map.rs`, `mixed_map.rs`, `map_least_squares.rs`, `target_scaling.rs`, and the shared size/feature/protocol helpers.

- Reuse target scaling, time/candidate resolution, feature layout and checked dimensions.
- Extend/refactor the objective into a cohesive linear MAP owner that supports both additive and mixed likelihoods, constrained diagnostics, and the ordered unconstrained optimizer value/gradient evaluation.
- Share prior, parameter-transform and dummy-parameter behavior rather than duplicating it in two optimizers or two fitting paths.
- Keep the existing complete KKT diagnostic available in documented normalized constrained coordinates. It remains independent of Stan's termination tests.
- Preserve the approved likelihood and priors, including nonsmooth Laplace terms. No observation-count normalization, sigma floor, arbitrary ridge, coefficient pruning or new target.
- Model ordinary numerical/configuration failures as typed Rust results; translate them to existing Effect error boundaries.

**Deliverable:** value/gradient/transform and parameterization tests against the frozen oracle, plus an independent finite-difference check away from Laplace kinks.

### 3. Port Newton faithfully for the failing workload

Implement the pinned numerical behavior, not a generic textbook Newton method:

1. Initialize the complete Stan-ordered parameter vector, including transformed sigma and required internal dummy parameters.
2. Evaluate the reference log density and gradient.
3. Build curvature using the pinned four-perturbation stencil with `epsilon = 1e-3`, preserving its actual weights/scaling, accumulation and symmetrization. Do not silently replace it with an analytic Hessian: crossing Laplace kinks changes the effective curvature.
4. Match Stan's symmetric eigendecomposition-based direction, including its negative-definite modification using absolute eigenvalues. A ridge solve or Cholesky substitute is not automatically equivalent.
5. Match joint proposal, domain-rejection handling, step halving and minimum step (`1e-50`). Preserve the pinned no-progress behavior.
6. Match the objective-change stopping test and 10,000-step default, including initialization versus later proportional-log-density handling verified by the oracle.
7. Restore finite output-unit state, calculate independent diagnostics, and report the actual termination category.

Audit existing linear algebra before introducing an eigensolver. The existing pivoted Householder ridge QR is not the required symmetric spectral solve. Prefer a vetted deterministic Rust/WASM-compatible implementation; any dependency or numerical substitute needs an explicit review of source fidelity, licensing, singular/repeated-eigenvalue handling, WASM size and supported targets. Do not introduce an arbitrary eigenvalue floor to make singular cases pass.

Check `P × P` curvature/workspace allocations against the existing memory policy. Document the larger Newton cost and retain typed resource failures; do not switch algorithms based on an invented size heuristic while claiming Prophet selection parity.

**Deliverable:** both 96-row controls' Stan-aligned counterparts return accepted models through real WASM at the declared 10,000-step budget. Native-only evidence does not close the gap.

### 4. Port L-BFGS, selection and fallback

Complete linear MAP coverage before switching the default:

- Port the pinned limited-memory update, curvature-history rules, scaling, Wolfe line search, interpolation, restart/reset policy and error behavior.
- Use CmdStan's effective defaults: history size 5, initial alpha `0.001`, `tol_obj = 1e-12`, `tol_rel_obj = 1e4`, `tol_grad = 1e-8`, `tol_rel_grad = 1e7`, and `tol_param = 1e-8`, subject to the oracle/source pin verification.
- Preserve that relative objective/gradient controls are multiplied by machine epsilon and use Stan's formulas; they are not our existing relative parameter tolerance.
- Preserve stopping-condition precedence and the positive iteration-limit termination code. The pinned service treats it as a normal returned result.
- Select Newton for `N < 100`, L-BFGS for `N >= 100`, counting all fitted rows.
- Honor explicit method selection. On the corresponding L-BFGS backend failure, run Newton from the original initialization when enabled; do not fall back on normal iteration-limit completion or reuse the failed iterate.
- Preserve a full per-attempt iteration budget and expose bounded summary metadata identifying fallback/attempt counts. Do not create a hidden larger single-method budget.
- Do not substitute OLS, the old coordinate solver, flat growth or a changed objective on failure.

**Deliverable:** threshold, override, fallback and budget cases match the reference through the real fitting seam.

### 5. Integrate every linear fitting path and migrate contracts

Update the linear paths in `piecewise_map.rs` and `mixed_map.rs`, WASM wire adapters, TypeScript adapters, resolved fitting inputs, option parsing and fitted-state schemas together.

Proposed contract migration, requiring review before implementation:

- Introduce explicit linear algorithm selection (`auto`, `newton`, `lbfgs`), fallback policy, maximum iterations and algorithm-specific controls. Keep parsed internal options as legal tagged states rather than arbitrary control bags.
- Do not reinterpret the old `relativeTolerance`/`absoluteTolerance` coordinate-change fields as Stan controls or silently ignore them. Prefer a documented linear-MAP breaking migration that rejects obsolete explicit fields; retain flat/logistic controls unchanged. Resolve release/versioning before default cutover.
- Introduce honest new method identities and termination variants. Update method/component consistency checks; a new solver must never serialize itself as `piecewise-map-coordinate-v1`.
- Replace the superseded saved linear coordinate-model format without legacy decoding or migration shims, per the pre-adoption decision above. New saved models must restore without refitting and retain their actual diagnostics; incompatible old formats must be rejected explicitly.
- Version or explicitly revise packed WASM result protocols where needed; coordinate Rust and TypeScript parsers and reject malformed frames.
- Return finite budget-limited models as the reference does, but preserve typed failures for invalid/non-finite state, actual optimizer failures and resource limits. Do not turn budget-limited completion into a misleading `converged` summary.
- For no-changepoint fits, calculate objective/diagnostics in the internal pre-fold optimization state. Document why those diagnostics cannot be recomputed from folded public slope alone; verify prediction, restoration and future uncertainty with zero public candidates.
- Audit uncertainty and evaluation model parsing, reports and selected-option persistence for assumptions that every successful fit says `converged` or uses an old method identity.

**Deliverable:** a public options/model format specification and passing new-model lifecycle tests, including explicit rejection of obsolete controls and incompatible formats. No silent control or serialized-state reinterpretation.

### 6. Preserve operation tracing

Keep the existing named public fitting spans and complete WASM boundary coverage, including input packing, invocation, result copying/decoding and typed failure translation.

- Add named `Effect.fn`/`Effect.withSpan` boundaries only if the integration genuinely introduces a new public/coarse operation. Do not trace gradients, records, line-search trials or tight numerical loops.
- Preserve active parentage and normal success/failure/defect completion. A finite iteration-limit result is a successful operation with explicit result metadata; a typed numerical failure remains failed.
- Use only stable, bounded metadata such as backend, algorithm, termination category and counts. No raw coefficients, observations, protocol payloads, objectives, error messages or runtime causes in span attributes.
- Test with the existing in-memory `Tracer.make` approach through real public/WASM seams: names, safe attributes, trace/direct-parent IDs, ended status, completion, interval containment, and no boundary span on pre-boundary validation/short circuits.

### 7. Prove compatibility before measuring speed

Test layers and cases:

1. **Rust numerical tests:** value/gradient/transform, finite-difference curvature, spectral direction, line-search acceptance/rejection, kink behavior, optimizer stops and budget returns.
2. **Real WASM tests:** protocol, initialization, dispatch, fallback, typed numerical/resource failures, and new termination states.
3. **Pinned Prophet fixtures:** 99/100/101 rows; duplicate histories crossing the 100-row boundary; explicit/automatic/no changepoints; repeated candidates and endpoint/zero columns; constant targets; absmax/minmax; conditional/additive/mixed features; and intentionally exhausted small budgets.
4. **Public lifecycle tests:** fit/predict, input ordering and duplicates, serialization and fresh-process restoration, uncertainty, cross-validation/search/holdout/report consumers, and tracing.
5. **Migration benchmarks:** the same ordered/unsorted unique automatic-MAP datasets and the entire 13-case edge set, plus larger linear histories exercising L-BFGS and mixed linear fits.

Keep the original run and its failure evidence immutable. Add explicitly versioned Stan-aligned cases/controls rather than pretending the old coordinate-change tolerances are still the new solver's stopping rule. Preserve datasets, objectives, prior settings, gating-quantity tolerances and the 10,000 per-attempt budget; disclose the approved algorithm/termination-policy change and the later [explicit stationarity deferral](linear-map-benchmark-acceptance.md) in before/after reports. Do not rewrite stored case snapshots, drop failures, or loosen correctness tolerances.

Extend the existing fixture generator and evidence harness. Generate fixtures with `npm run fixtures:generate`, canonicalize optimizer values with the shared helper to at most 12 significant digits, retain CPU-sensitive Fourier precision at 12 decimal places, and verify with `npm run fixtures:check`. Do not hand-edit generated JSON.

Run independent correctness comparisons before retaining timing. Evaluate returned models—including budget-limited models—under forecast, component, noise, persistence and independently declared objective/optimality gates. Returning the same termination type as Python is not itself compatibility evidence.

Retain raw runs, source state, locks, executable/WASM hashes, complete row snapshots, algorithm controls, termination evidence and architecture. Validate supported amd64/arm64 fixture reproducibility and real WASM behavior, not only the native diagnostic host.

Run `npm run check`, `npm run fixtures:check`, applicable Rust/WASM/benchmark/integration suites, and `git diff --check`. Place TypeScript tests at the same relative level as their `src/` owners; use real seams, not module mocks.

### 8. Document and cut over

After acceptance:

- Supersede the relevant parts of `map-optimizer.md`, including its rejection of reference-style L-BFGS, initialization, stopping and no-changepoint policy. Explain that exact objective compatibility and Stan-style nonsmooth derivative behavior are distinct from a guaranteed KKT certificate.
- Update linear MAP usage/options, compatibility exceptions, method/termination meanings and model migration notes.
- Update benchmark evidence/version declarations and preserve links to the original migration failures.
- Update EP-096 with fresh evidence; keep EP-093 separate unless an explicitly approved follow-up extends the shared optimizer machinery to logistic fits.
- Remove superseded linear fitting implementations and coordinate-model decoding after the reuse/duplicate audit. Do not retain compatibility shims or an undocumented automatic runtime fallback.

## Acceptance gates

Local implementation/validation is complete under the [approved fit-quality requirements](linear-map-benchmark-acceptance.md). Near-stationarity certification is explicitly excluded from this closeout and remains EP-097 work. Review/merge is still pending.

Acceptance gates:

- [x] The frozen reference stack is evidenced by immutable source, lock and executable identities.
- [x] Both ordered/unsorted automatic-MAP controls' versioned aligned counterparts pass declared fit-quality gates under 10,000 per-attempt optimizer steps through actual WASM.
- [x] Newton, L-BFGS, row-count selection, explicit overrides and fallback have independent reference evidence.
- [x] Budget exhaustion and no-progress behavior match the verified reference without false convergence claims or unusable model returns.
- [x] Additive and mixed linear MAP paths share the intended numerical owners and satisfy lifecycle/evaluation/uncertainty tests.
- [x] No-changepoint internal fitting and public folding are evidenced, not left as an unmentioned objective difference.
- [x] Clean public-control/model-format changes, obsolete-input rejection, and new-model restoration are reviewed and tested locally; flat/logistic fitting policies are unchanged.
- [x] Declared fitted-quantity quality, resource limits, deterministic fixtures and tracing requirements pass; near-stationarity remains deferred to EP-097.
- [x] Every newly retained timing is independently correctness-eligible, and all original failure evidence remains available.

Bitwise equality with Eigen/Stan across CPUs is not promised. A merely similarly named optimizer is insufficient. Any remaining numerical behavior difference must be explicit and supported by bounded evidence before claiming alignment.
