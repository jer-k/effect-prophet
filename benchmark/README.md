# Public API benchmark suite

This suite records **correctness-gated absolute timing evidence** for the built Effect Prophet
package and Python `prophet==1.4.0`. It is not a race: reports contain no speedup, winner, RAM
comparison, or cross-machine threshold.

Every accepted case represents the same MAP objective and feature matrix in both implementations.
The old OLS-versus-MAP and true-empty-versus-dummy cases were removed because they did not perform
equivalent fitting work.

## Workloads

Generated inputs are explicit, deterministic JSON records shared by both adapters. Training rows
contain every observation, regressor, and condition. Future rows contain every timestamp,
regressor, and condition; neither implementation invents future covariates or calendars.

| Case                                   | Shape                              | Capability                                                                                                     |
| -------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `map-events-small`                     | `N=96`, `H=28`, `Ks=0`, `Ka=6`     | Two event calendars, overlapping activations, asymmetric windows, future occurrences, one explicit changepoint |
| `map-regressors-medium`                | `N=256`, `H=64`, `Ks=0`, `Ka=4`    | Binary `auto`, numeric `auto`, numeric `always`, and numeric `never` regressors in caller order                |
| `map-conditional-seasonalities-medium` | `N=256`, `H=64`, `Ks=12`, `Ka=0`   | Two order-three weekly seasonalities with dense and sparse boolean masks                                       |
| `map-mixed-features-explicit-small`    | `N=24`, `H=3`                      | Fixture-scale conditional/unconditional seasonality, event, regressor, and explicit changepoint control        |
| `map-mixed-features-automatic-large`   | `N=768`, `H=128`, `Ks=10`, `Ka=10` | Mixed feature model with Effect's omitted-`map` automatic defaults (`25`, `0.8`)                               |

Eleven growth, scaling, and mixed-component MAP cases come from [`cases/growth-scaling-and-mixed-map.ts`](cases/growth-scaling-and-mixed-map.ts): absmax and minmax
large-offset linear fits (`N=96`), conditional flat mixed fits (`N=96,256`), linear mixed
(`N=96`), and floor-aware changing-capacity logistic fits (`N=96,256`) with both floor policies,
both scaling modes, and additive-only or mixed features. Logistic fits use nonempty explicit
or automatically resolved nonsingular changepoints; true-empty-point and singular-policy comparisons are deliberately not
part of the equivalent-fit timing set. Flat mixed fits have no changepoints and use Effect's fixed flat optimizer; the case does not
pretend to configure flat optimizer controls that the public API does not expose. The runner
serializes these declarations beside the run artifacts into `cases.json`, which both mounted
adapters and the report read; there is no second runner. Earlier EP-071 run artifacts use
`stage-f-*` IDs and dataset hashes; the descriptive names change only generated metadata,
not observation or prediction-row values. Do not merge those historical samples with new runs
without verifying that their recorded configurations and row values match.

EP-081 adds 12 opt-in MAP uncertainty cases from [`cases/uncertainty.ts`](cases/uncertainty.ts) using the same versioned datasets/configurations: linear with nonzero offset, mixed linear, feature-bearing flat, implicit/explicit logistic with changing bounds, and a new conditional/event/regressor logistic recipe. Row selections include historical-only, single-future, and irregular mixed historical/future requests. N, requested rows, output kind and S are recorded independently; every case is bounded by public row×sample policy. EP-080's [distribution evidence](../docs/validation/uncertainty.md) is a prerequisite, not established by timing; the [local run review](results/uncertainty/README.md) includes failures and findings.

Stage H adds the evaluation cases in [`cases/evaluation.ts`](cases/evaluation.ts) on the same versioned complete-row datasets. Linear additive, feature-bearing flat, changing-bound logistic and two larger-row variants exercise explicit rolling-origin folds. Fold count, aggregate training visits, assessment rows, feature/point columns, interval samples, and ordered candidate count are recorded separately. The `linear-failure` search includes one deliberately unsupported logistic candidate on a dataset without capacities; both adapters record its expected failure and select from the remaining candidates. A three-candidate flat search exercises stable ties. Development-only folds and the last eight rows reserved as final holdout remain disjoint.

For Stage H, `different-public-work` is the only comparison classification. Each adapter checks cutoff/row/actual alignment, finite point forecasts and MAE before the report admits timing samples. It also checks interval dimensions and bounds, search failure counts and holdout construction on the applicable cases. Matched point forecasts must meet the declared per-case tolerance. This gate does **not** establish equivalence of interval distributions, Python's vectorized sampler and Effect's scalar simulator, Python rolling/percentage metric policy, or report payloads. Failed cases remain visible with no accepted timings. The [`evaluation and selection policy`](../docs/decisions/evaluation-and-selection.md), [Stage G evidence](results/uncertainty/README.md), and [Stage H report](results/evaluation/README.md) provide interpretation.

`Ks` is the Fourier-column count and `Ka` is the event-plus-regressor column count. Fixed-equation
prediction and nonempty explicit-MAP controls remain as calibration cases.

`generate-data.ts` creates bounded-noise targets from known piecewise trends and named seasonal,
event, and regressor terms. The mixed automatic case uses smaller slope breaks and a larger but
bounded deterministic perturbation so the public default 10,000-iteration coordinate optimizer
converges at `N=768`; this preserves the required size and omitted-`map` path. Every generated
file's versioned recipe and SHA-256 appears in `data/generated/manifest.json`; the recipe is analytic and seedless (no random generator). Selected data hashes are
also captured in each run manifest.

## Exact API mapping

The original cases use linear growth and additive features. Stage F also maps public flat and
logistic growth, absmax/minmax scaling, inherited and overridden additive/multiplicative modes,
and logistic training/prediction `capacity`/optional `floor` rows to Prophet's `cap`/`floor`
DataFrame columns. Both adapters disable built-in seasonalities and uncertainty samples. The
Python adapter translates:

- Effect UTC event calendar days to a naive-date holidays DataFrame with matching names, dates,
  windows, and prior scales;
- Effect regressor `never`, `auto`, and `always` to Prophet `False`, `"auto"`, and `True`;
- conditional seasonalities to `add_seasonality(..., mode="additive", condition_name=...)`;
- explicit changepoints directly, or Effect's omitted-map defaults to Python
  `n_changepoints=25, changepoint_range=0.8`;
- each case's recorded Newton/LBFGS algorithm and iteration budget to public `fit` arguments.

Event names are ordered by Prophet's deterministic feature-column ordering in both projections.
This calendar/API translation does not change feature activation or the fitted objective.

Before timings are accepted, each independent worker verifies row identity, finite output,
`value = trend * (1 + multiplicative) + additive`, complete named-component reconstruction (including factor and output-unit contribution), condition-false exact zeros,
event-window activation, fitted regressor transforms and coefficient metadata, model kind,
resolved changepoints, optimizer evidence, and encode/stringify/parse/decode prediction
equivalence, including a separate fresh-process restoration check. The report then compares both languages using committed per-quantity trend,
component, additive, forecast, noise, and persistence tolerances. Fitted scaling mode/floor policy and train-only scale/offset are checked too. Any local or cross-language
failure suppresses that case's timing summary.

## Run

Requirements:

- Docker with Compose support;
- enough memory to build the Rust/WASM and Prophet images;
- no local Python, Rust, or uv installation.

Run every case:

```sh
npm run benchmark
```

Select cases or reuse built images:

```sh
npm run benchmark -- --case map-events-small --case map-mixed-features-automatic-large
npm run benchmark -- --no-build --case map-conditional-seasonalities-medium
npm run benchmark -- --case flat-mixed-components --case logistic-explicit-floor-minmax
npm run benchmark -- --case uncertainty-linear-mixed-components-mixed-samples-512
npm run benchmark -- --case evaluation-linear-point --case evaluation-flat-mixed-intervals
```

The host orchestrator maps Apple Silicon to `linux/arm64` and x64 to `linux/amd64`, then passes the
same platform to build and runtime services. The pinned uv, Python, Node, and Rust image indexes and
the locked Prophet wheel support both architectures. Normal runs are native. An explicit diagnostic
override is available:

```sh
BENCHMARK_CONTAINER_PLATFORM=linux/amd64 npm run benchmark -- --case map-events-small
```

Such a run is recorded as emulated on an ARM host and is not eligible for native baseline
promotion. Docker startup remains outside measured cold-process boundaries.

## Measurement boundaries

| Phase                              | Included                                                                                               | Excluded                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `adapter-input-conversion`         | Shared JSON records to Effect input objects or Python DataFrames                                       | File reads and JSON parsing           |
| `warm-fit`                         | Fresh public configuration, parsing, feature preprocessing, copies, and complete fit                   | Adapter conversion                    |
| `warm-predict`                     | Public future-row parsing/alignment, features, masks, numerical prediction, returned output            | Fit, restoration, adapter conversion  |
| `warm-fit-predict`                 | Fresh configuration, fit, and prediction                                                               | Adapter conversion                    |
| `warm-fit-predict-with-conversion` | Conversion, fresh configuration, fit, prediction, completed output                                     | File reads and JSON parsing           |
| `cold-first-forecast`              | Fresh language process, imports, conversion, configuration, fit, prediction, protocol output           | Docker startup and image construction |
| `model-json-encode`                | Effect public encode plus stringify; Python public `model_to_json`                                     | Report serialization                  |
| `model-json-decode`                | JSON parse plus Effect public decode; Python public `model_from_json`                                  | File reads                            |
| `fresh-process-restored-predict`   | Fresh imports, persisted-model parse/decode, future-row conversion, public prediction, protocol output | Fitting and Docker startup            |

Uncertainty-only phases use the **same** workers, correctness gate, results and report:

| Phase                                     | Included                                                                                                                                                                                                   | Excluded                                                                            |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `uncertainty-input-conversion`            | Shared complete JSON records → Effect objects / Python DataFrames                                                                                                                                          | File reads, JSON parsing, fit, simulation                                           |
| `warm-uncertainty`                        | Full public `predictUncertainty` (intervals or samples) / Python `predict(df, vectorized=False)` for intervals or `predictive_samples(df, vectorized=False)` for samples; Python per-call NumPy seed reset | Fit, adapter conversion, model persistence, Python default-vectorized approximation |
| `cold-first-uncertainty`                  | Fresh language process/imports, JSON input, conversion, public fit, first scalar uncertainty call, worker protocol response                                                                                | Image build and Docker startup                                                      |
| `fresh-process-restored-uncertainty`      | Fresh process/imports, JSON model decode, future-row conversion, first public scalar call, worker protocol response                                                                                        | Fit and Docker startup                                                              |
| `model-json-encode` / `model-json-decode` | Public model encode/stringify and parse/decode, respectively                                                                                                                                               | Sample-output serialization (not measured separately)                               |

Stage H phases follow the same worker and correctness-first orchestration. `evaluation-input-conversion` measures shared rows to Effect observation/prediction objects (including unused future rows) or Python's development DataFrame; these are different adapter workloads. `evaluation-point` and `evaluation-intervals` measure full warm `crossValidate` calls, including fold-local fits and results. Python's matching phases call public `cross_validation` sequentially (`parallel=None`), after an **untimed full-history fit** required by its mutable model; they include its pandas history copying, fold fits, predictions and output assembly. Python interval CV uses the documented default **vectorized** algorithm, not Effect's scalar simulation; S/width and seed are declared but seeded draws do not match. `cold-first-evaluation` includes fresh-process imports, input load and first point evaluation (plus Python's full-history fit), excluding Docker startup. `evaluation-plan` measures public `planRollingOrigin` against Python's explicit-cutoff/count application preparation, not matching planner APIs. `evaluation-metrics` measures only public `performanceMetrics` or `performance_metrics` on **untimed precomputed CV rows**, with exact horizons, overall, or rolling-half aggregation as declared by the case; MAPE uses an explicit Effect `exclude` zero-actual policy. Python's weighted rolling windows and near-zero MAPE handling are not identical policies. `evaluation-baseline` measures three pure train-only baselines against explicit Python application loops; no Prophet baseline API exists. `evaluation-search` includes sequential per-candidate CV and score ranking; Python uses documented public CV in an explicit grid loop. `evaluation-holdout` excludes the precomputed selection but includes fit/point prediction, baseline/metric/report construction against Python's explicit application counterpart. `evaluation-report-encode` includes schema encode/stringify on Effect and JSON stringify on Python; `evaluation-report-decode` measures parse/schema decode on Effect and JSON parse on Python. The Python payload is not an Effect report. No subtraction of measured phases estimates optimizer or Rust internals.

Stage H records process high-water RSS for every warm phase, via the worker's OS accounting; these include imports, previous work and setup, **exclude CmdStan child processes**, and are neither per-operation allocation deltas nor cross-runtime RAM rankings. Cold subprocess peaks, heap peaks and WASM-only allocation peaks are not captured; the report marks them unavailable rather than inventing estimates. The runner uses `process.hrtime.bigint` and `time.perf_counter_ns`; synchronous WASM is not preempted by Effect timeouts. Python parallel modes and private diagnostics kernels are not timed. The case manifest includes explicit folds/options and SHA-256 dataset recipes; raw per-run samples, lock/build/container versions, machine provenance and failures remain in the reviewed snapshot.

Effect explicitly disables tracing with `Effect.withTracerEnabled(false)` for public measurements; no tracer/exporter is installed or required. Warm measured `predict` includes Python point and component assembly plus marginal intervals, whereas `predictive_samples` only returns trend/yhat sample arrays. Effect's `predictUncertainty` returns either owned row-major sample arrays or intervals, with conversion, feature setup, WASM simulation, decoding and copying inside the complete public call. These are scalar **process** comparisons, not identical-work entrypoints or matching NumPy/xoshiro draws. Python's default `vectorized=True` grid algorithm is not an equivalent comparator and is not timed here. No private Python kernels are timed. Underlying Rust phase times cannot be derived from these boundaries or coarse tracing spans. Sampling and interval reduction consume `O(rows × S)` work and space; interval mode includes sample/workspace allocations rather than constant scratch.

Warm worker peak RSS uses Linux `maxRSS` / `ru_maxrss` high-water marks: **imports, previously fitted model, case preparation and uncertainty all contribute**, and Python's CmdStan fitting child is excluded. These process-only values are not simulation-only allocations, process-tree peaks or a cross-runtime RAM ranking. Runtime/library allocation limits apply to sampler buffers only, not total RSS. Synchronous WASM is not preempted by an Effect timeout. Raw nanosecond samples and per-case recipe hashes, build/lock/container/tool identities, clock choice (`process.hrtime.bigint` / `time.perf_counter_ns`) and memory method are retained in the run artifacts.

Effect imports `effect-prophet` through the built package entrypoint after a release WASM build.
The public API does not expose a supported parsing/copying/optimization split, so this suite does
not present Effect spans as an internal profiler.

Raw nanosecond repetitions retain their independent-run identities. Reports aggregate medians,
p90, minima, maxima, and counts; small sample counts are not claims of stable tail behavior.

## Results and reviewed snapshots

Local runs are ignored under:

```text
benchmark/results/runs/<run-id>/
  manifest.json
  cases.json
  inputs/generated/*.json  # exact complete-row snapshots used for selected cases
  effect-prophet.json
  python-prophet.json
  eligible-cases.json
  records.jsonl
  report.json
  report.md
```

After reviewing correctness, provenance, native architecture, git state, and the complete report,
promote a snapshot deliberately:

```sh
npm run benchmark:baseline -- <run-id> [baseline-id]
```

Promoted snapshots are committed under [`results/baselines/`](results/baselines/README.md) with raw
samples and correctness projections.

## Tests

Parser, semantic relationship, result, architecture, and report tests require no Docker or Python:

```sh
npm run benchmark:typecheck
npm run benchmark:test
```

Normal package tests do not install Python or execute this suite. The uncertainty cases record worker high-water RSS with the limitations above; process-tree peak RSS is unsupported.
