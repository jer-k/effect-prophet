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

Normal package tests do not install Python or execute this suite. Memory measurements are not a
Stage F requirement; the environment records that process-tree peak RSS is unsupported.
