# Public API benchmark suite

This suite records **descriptive correctness and absolute timing evidence** for the built Effect
Prophet package and Python `prophet==1.4.0`. It is not a race, does not rank implementations, and
has no performance acceptance threshold.

Every timing case must first pass its applicable correctness checks. OLS and no-changepoint MAP
cases have intentionally different objectives, so each implementation receives local checks but
no cross-language forecast-equality claim. Fixed-equation prediction and nonempty explicit MAP
cases additionally require reviewed evidence and cross-language quantity checks.

## Run

Requirements:

- Docker with Compose support;
- enough memory to build the Rust/WASM and Prophet images;
- no local Python, Rust, or uv installation is required.

Run every case:

```sh
npm run benchmark
```

Select one or more cases:

```sh
npm run benchmark -- --case linear-small --case fixed-linear-prediction-medium
```

Reuse already-built images:

```sh
npm run benchmark -- --no-build --case linear-small
```

The host orchestrator generates deterministic datasets, builds images, and runs these Compose
services **sequentially**:

1. `effect-prophet-benchmark`;
2. `python-prophet-benchmark`;
3. `benchmark-report`.

The runtime containers have no network, mount cases/data read-only, use one configured numerical
thread, and write only to the selected result directory. Docker image startup is outside measured
cold-process regions. A cold sample starts a fresh language worker inside the already-running
container and includes imports, setup, public fit, public predict, and completed output.

Both images currently use `linux/amd64` to retain the pinned Prophet 1.4.0 environment. A report
created through emulation is useful diagnostic evidence but should not be promoted as a native
machine baseline without an explicit review note.

## Measurement boundaries

| Phase                              | Included                                                                         | Excluded                                   |
| ---------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------ |
| `input-preparation`                | Common records to encoded objects or Pandas DataFrames                           | File reads and JSON parsing                |
| `warm-fit`                         | Fresh public model configuration, public fit, validation and numerical execution | Dataset loading and adapter conversion     |
| `warm-predict`                     | Public prediction and normal returned output construction                        | Fit/model restoration and input conversion |
| `warm-fit-predict`                 | Fresh configuration, public fit, and public predict                              | Input conversion                           |
| `warm-fit-predict-with-conversion` | Conversion, fresh configuration, fit, and predict                                | File reads and JSON parsing                |
| `cold-first-forecast`              | Fresh process, imports, conversion, fit, predict, completed output               | Docker startup and image construction      |
| `model-json-encode`                | Public model conversion plus JSON serialization                                  | Report serialization                       |
| `model-json-decode`                | JSON parsing plus public model restoration                                       | File reads                                 |

Effect measurements import `effect-prophet` through the built package entrypoint after
`npm run build`, which creates release WASM. Python fit samples instantiate a fresh `Prophet`
object because the public object can only be fit once. Fixed prediction prepares equivalent state
outside the timed region, restores it through each public persistence API, and verifies the authored
equation before samples are accepted.

The suite retains raw nanosecond samples. Reports show medians, p90, minima, maxima, and counts;
small sample counts are not presented as stable tail estimates. They do not calculate a winner or
enforce a timing threshold. Memory is currently marked
unsupported because Prophet fitting can use a child process and a comparable process-tree peak is
not yet collected.

## Results and reviewed snapshots

Local runs are written to ignored directories:

```text
benchmark/results/runs/<run-id>/
  manifest.json
  effect-prophet.json
  python-prophet.json
  records.jsonl
  report.json
  report.md
```

After reviewing correctness, provenance, platform suitability, and the report, promote a complete
snapshot deliberately:

```sh
npm run benchmark:baseline -- <run-id> [baseline-id]
```

Promoted snapshots are committed under [`results/baselines/`](results/baselines/README.md). The
snapshot includes raw samples and projections so its summaries remain reproducible. Failed and
timed-out cases remain visible rather than being removed from reports.

## Tests

Parser and report tests do not require Docker, Python, or WASM:

```sh
npm run benchmark:test
npm run benchmark:typecheck
```

Python dependencies are independently locked under `benchmark/python/`. Normal package builds and
tests do not install Python or execute this suite.
