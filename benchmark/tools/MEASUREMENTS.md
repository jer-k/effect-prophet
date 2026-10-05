# Benchmark measurement contracts

Declarations and tolerances live in [the case catalog](../CASES.md); observed outcomes live in
[retained results](../results/RESULTS.md). This document defines measurement interpretation,
not another source of case declarations or current pass counts.

## Correctness before timing

Shared deterministic rows include every regressor, condition, bound and future timestamp.
Configured-feature adapters disable built-in seasonalities and use the declared priors, scaling,
changepoints and optimizer settings. Logistic growth-only probes instead leave actual fitting and
built-in seasonality defaults untouched; their resolved metadata is checked against Python.
See the [logistic reconciliation inventory](../cases/growth/logistic/README.md). Python numeric target/capacity/floor/regressor columns are
explicit float64, matching JavaScript numbers without changing source values; masks stay boolean.
Events map to Prophet holiday DataFrames, regressor standardization maps to False/auto/True,
and conditional seasonalities retain their names, modes and masks.

Local checks cover finite outputs, row identity, component reconstruction
`value = trend * (1 + multiplicative) + additive`, conditional zeros, event activations,
regressor transforms/coefficients, model kind, changepoints, scaling and noise where applicable.
Public JSON round trips and fresh-process restoration must retain predictions. The cross-language
report applies the exact declared per-quantity gates before admitting samples. There is no
second harness or permissive fallback gate.

Fitted linear cases run both libraries on their default optimizers (shared in
`cases/growth/linear/controls.ts`) with 10,000-step per-attempt budgets. Objective/noise acceptance and diagnostic-only stationarity are
specified in the [accepted policy](../../docs/decisions/linear-map-benchmark-acceptance.md).
Historical failed stationarity-equality gates are not retroactively repaired. Flat fits use
Effect's fixed optimizer; declarations must not invent unsupported flat optimizer controls.

## Direct fitting and lifecycle boundaries

| Phase                              | Included                                                                    | Excluded               |
| ---------------------------------- | --------------------------------------------------------------------------- | ---------------------- |
| `adapter-input-conversion`         | Shared JSON rows to public objects/DataFrames                               | Reads and JSON parsing |
| `warm-fit`                         | Fresh configuration, parsing, preprocessing and complete public fit         | Adapter conversion     |
| `warm-predict`                     | Public row alignment, features, numerical prediction and returned output    | Fit and conversion     |
| `warm-fit-predict`                 | Complete fit then prediction                                                | Adapter conversion     |
| `warm-fit-predict-with-conversion` | Conversion, fit and prediction                                              | Reads and JSON parsing |
| `cold-first-forecast`              | Fresh process/imports, conversion, fit, prediction and protocol output      | Docker startup/build   |
| `model-json-encode`                | Public model encode/stringify                                               | Report serialization   |
| `model-json-decode`                | Parse/public model decode                                                   | File reads             |
| `fresh-process-restored-predict`   | Fresh imports, model decode, row conversion, prediction and protocol output | Fit/Docker startup     |

## Uncertainty

Uncertainty phases use the same workers, eligibility gate and reports. Warm public calls exclude
fit, file reads, JSON parsing and adapter conversion. Cold calls include fresh imports, conversion,
fit and first uncertainty call; restored calls include imports, decoding and uncertainty but not
fit. Input conversion and model persistence have their own phases.

Python interval prediction includes point/component/interval assembly; predictive samples return
trend/yhat matrices. Effect returns owned row-major samples or intervals. Scalar
`vectorized=False` comparisons are **different public work**, not identical NumPy/xoshiro draws.
Python per-call NumPy seeds are reset. The default vectorized approximation is not used as the
scalar comparator. Sampling and interval reduction require O(rows × samples) work/space.
Interval mode is not constant-scratch, and sampler limits are not total-process RSS limits.

## Diagnostics and selection

Evaluation is `different-public-work`, even when point gates pass. MAP CV defaults independently
to absmax, matching Prophet's fold-copy behavior; Effect permits an explicit minmax override.
Every fold learns numerical scaling from its training prefix. See the
[accepted CV policy](../../docs/decisions/cross-validation-scaling.md).

Warm point/interval evaluation measures complete public CV, sequentially. Python requires an
untimed full-history model fit and includes history copies and fold fits. Interval CV uses
Python's vectorized algorithm versus Effect's scalar simulation. Seeded distributions do not
match. Input conversion, planning, metrics on precomputed CV, baselines, search, holdout and
report encode/decode are distinct phases. Python planning/baseline/search/holdout/report loops
are application counterparts, not Prophet APIs. Holdout excludes precomputed selection but
includes fitting and assessment; development folds and final holdout remain disjoint.

The gate checks fold/row/actual identities, finite point outputs within declared tolerances,
interval dimensions/bounds, applicable search failure counts and holdout construction. It does
not establish interval-distribution, metric-policy, report-payload or holdout-forecast equality.
Effect receipts retain effective CV scaling for holdout; Python's application loop uses its
original selected configuration. An intentionally missing-capacity candidate inside successful
search is not a failed benchmark workload.

## Timing, memory and provenance

Effect measures built public package entrypoints and release WASM, not private kernels. Tracing
is disabled for measured public operations; tool orchestration spans are outside those timings.
No exporter is required. JavaScript uses `process.hrtime.bigint`; Python uses `perf_counter_ns`.
Synchronous WASM cannot be preempted by an Effect timeout. Coarse spans/phase subtraction cannot
reconstruct optimizer or Rust-internal profiling.

Raw repetitions retain independent-run identities. Reports aggregate medians, p90, extrema and
counts; small samples do not establish stable tails. Absolute timings are descriptive, with no
cross-language rankings or thresholds.

Worker RSS is OS high-water accounting: imports, previous operations and fit/setup contribute.
Python CmdStan child processes are excluded. It is neither per-call allocation nor process-tree,
WASM-only or simulation-only memory. Cold/heap/process-tree peaks are not inferred. Source,
lockfile, image, environment and dataset identities are retained so scope limitations remain
visible when comparing runs.
