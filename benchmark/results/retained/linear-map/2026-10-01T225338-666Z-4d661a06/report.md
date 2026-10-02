# Effect Prophet benchmark — 2026-10-01T225338-666Z-4d661a06

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| map-mixed-features-automatic-large-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | Independent linear optimizer stationarity-residual evidence is missing or exceeds its declared tolerance. |
| map-training-ordered-auto-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | Independent linear optimizer stationarity-residual evidence is missing or exceeds its declared tolerance. |
| map-training-unsorted-auto-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | Independent linear optimizer stationarity-residual evidence is missing or exceeds its declared tolerance. |
| map-training-duplicates-auto-stan-v2 | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | Independent linear optimizer stationarity-residual evidence is missing or exceeds its declared tolerance. |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `4d661a06a7e2f588f4b466cdcd4905753e3cce6b` (dirty)
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/amd64`
- Execution mode: architecture-emulated diagnostic run
- Selected cases: `map-training-ordered-auto-stan-v2`, `map-training-unsorted-auto-stan-v2`, `map-training-duplicates-auto-stan-v2`, `map-mixed-features-automatic-large-stan-v2`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/amd64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/amd64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/amd64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/amd64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/amd64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/amd64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:15f4e5dc42cccd62668e3f30c1e13ab5eb1f855dcecb4b3a0c34be89d6f58777`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:a87eb00bcd99d24241bc78ea3e326ef02c5cd1c3a6090dc243fbcef0a58b41e8`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/x64`
- Processor: `VirtualApple @ 2.50GHz`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.0-beta.107`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via process.resourceUsage.maxRSS (Linux KiB); includes imports and previous operations; excludes subprocess peaks; heap/WASM-only peaks unavailable; Effect tracing disabled

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/x86_64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

