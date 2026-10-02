# Effect Prophet benchmark — 2026-09-20T224643-979Z-ff2c99b0

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| fixed-linear-prediction-medium | equivalent-equation | passed | 1.421e-14 | 0.000e+0 | 0.000e+0 | 1.421e-14 | 0.000e+0 | Cross-language projections passed evidence fixed-linear-equation-v1. |
| map-explicit-break-small | equivalent-objective | passed | 7.107e-5 | 0.000e+0 | 0.000e+0 | 7.107e-5 | 2.561e-5 | Cross-language projections passed evidence explicit-linear-map-objective-v1. |
| map-seasonal-breaks-irregular-medium | equivalent-objective | passed | 1.077e-3 | 1.088e-4 | 1.088e-4 | 1.124e-3 | 3.340e-4 | Cross-language projections passed evidence explicit-linear-map-seasonal-objective-v1. |
| map-events-small | equivalent-objective | passed | 9.934e-6 | 1.066e-5 | 1.066e-5 | 1.798e-5 | 2.535e-5 | Cross-language projections passed evidence events-map-v1. |
| map-regressors-medium | equivalent-objective | passed | 2.848e-4 | 7.313e-5 | 8.094e-5 | 3.513e-4 | 2.826e-4 | Cross-language projections passed evidence regressors-map-v1. |
| map-conditional-seasonalities-medium | equivalent-objective | passed | 1.184e-3 | 7.386e-4 | 7.218e-4 | 1.209e-3 | 5.618e-5 | Cross-language projections passed evidence conditional-seasonalities-map-v1. |
| map-mixed-features-explicit-small | equivalent-objective | passed | 6.114e-8 | 9.230e-8 | 9.990e-8 | 4.087e-8 | 1.740e-6 | Cross-language projections passed evidence mixed-features-explicit-map-v1. |
| map-mixed-features-automatic-large | equivalent-objective | passed | 1.799e-3 | 1.213e-1 | 1.165e-1 | 1.148e-1 | 6.817e-3 | Cross-language projections passed evidence mixed-features-automatic-map-v1. |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.018 | 0.028 | 0.008 | 0.030 |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.601 | 0.727 | 0.565 | 1.050 |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.461 | 0.620 | 0.302 | 1.611 |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 3.036 | 3.331 | 2.786 | 4.342 |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.092 | 0.129 | 0.084 | 0.129 |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.704 | 0.895 | 0.680 | 0.895 |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 211.181 | 328.186 | 194.400 | 328.186 |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1622.883 | 1899.526 | 1544.114 | 1899.526 |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 160.062 | 191.805 | 153.357 | 191.805 |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1557.723 | 1632.527 | 1549.827 | 1632.527 |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.120 | 0.228 | 0.091 | 0.228 |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 3.130 | 4.327 | 3.013 | 4.327 |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.057 | 0.095 | 0.045 | 0.095 |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.690 | 0.785 | 0.683 | 0.785 |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 7.429 | 7.571 | 7.316 | 7.571 |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 19.957 | 22.710 | 18.556 | 22.710 |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 7.579 | 8.950 | 7.253 | 8.950 |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 18.650 | 20.055 | 18.085 | 20.055 |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 8.693 | 69.212 | 8.167 | 69.212 |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 14.266 | 14.984 | 13.960 | 14.984 |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.447 | 0.940 | 0.430 | 0.940 |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 4.243 | 5.010 | 4.106 | 5.010 |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.007 | 0.010 | 0.007 | 0.010 |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.540 | 0.845 | 0.511 | 0.845 |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 163.293 | 187.934 | 161.253 | 187.934 |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1606.793 | 1699.942 | 1572.308 | 1699.942 |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 152.600 | 171.316 | 150.410 | 171.316 |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1584.069 | 1646.353 | 1571.881 | 1646.353 |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.278 | 0.437 | 0.190 | 0.437 |
| map-events-small | model-json-decode | python-prophet | 6 | 3.696 | 4.279 | 3.473 | 4.279 |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.079 | 0.084 | 0.076 | 0.084 |
| map-events-small | model-json-encode | python-prophet | 6 | 0.683 | 0.714 | 0.665 | 0.714 |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.343 | 2.429 | 1.275 | 2.429 |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 39.694 | 40.556 | 38.555 | 40.556 |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 1.392 | 1.530 | 1.370 | 1.530 |
| map-events-small | warm-fit-predict | python-prophet | 6 | 38.235 | 40.464 | 37.283 | 40.464 |
| map-events-small | warm-fit | effect-prophet | 6 | 1.591 | 3.303 | 1.395 | 3.303 |
| map-events-small | warm-fit | python-prophet | 6 | 33.293 | 34.002 | 32.100 | 34.002 |
| map-events-small | warm-predict | effect-prophet | 6 | 0.548 | 0.858 | 0.507 | 0.858 |
| map-events-small | warm-predict | python-prophet | 6 | 4.884 | 5.647 | 4.688 | 5.647 |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.002 | 0.003 | 0.002 | 0.003 |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.522 | 0.556 | 0.504 | 0.556 |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 162.416 | 171.224 | 157.321 | 171.224 |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1585.970 | 1690.982 | 1565.187 | 1690.982 |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 154.317 | 159.435 | 149.621 | 159.435 |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1554.083 | 1607.290 | 1549.287 | 1607.290 |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.129 | 0.147 | 0.088 | 0.147 |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.351 | 3.158 | 2.166 | 3.158 |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.051 | 0.066 | 0.044 | 0.066 |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.492 | 0.737 | 0.401 | 0.737 |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 0.754 | 0.951 | 0.545 | 0.951 |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.163 | 17.516 | 15.944 | 17.516 |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.039 | 2.184 | 0.917 | 2.184 |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 15.668 | 16.355 | 15.268 | 16.355 |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.047 | 1.523 | 0.950 | 1.523 |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 12.800 | 13.185 | 12.090 | 13.185 |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.267 | 0.319 | 0.246 | 0.319 |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.979 | 4.109 | 2.826 | 4.109 |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.195 | 0.362 | 0.179 | 0.362 |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.329 | 1.396 | 1.300 | 1.396 |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 245.615 | 296.691 | 245.368 | 296.691 |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1597.462 | 1632.433 | 1586.200 | 1632.433 |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 168.376 | 176.612 | 161.269 | 176.612 |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1580.270 | 1822.033 | 1550.777 | 1822.033 |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.255 | 0.356 | 0.228 | 0.356 |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 6.072 | 6.677 | 5.952 | 6.677 |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.137 | 0.175 | 0.120 | 0.175 |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.803 | 1.914 | 1.777 | 1.914 |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 15.567 | 19.845 | 14.972 | 19.845 |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 49.335 | 55.529 | 49.078 | 55.529 |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 16.465 | 17.918 | 16.295 | 17.918 |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 47.306 | 48.584 | 47.121 | 48.584 |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 15.432 | 15.956 | 15.150 | 15.956 |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 40.824 | 41.281 | 40.764 | 41.281 |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.956 | 1.501 | 0.922 | 1.501 |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.707 | 7.345 | 6.628 | 7.345 |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.015 | 0.010 | 0.015 |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.536 | 0.569 | 0.510 | 0.569 |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 163.864 | 172.259 | 158.440 | 172.259 |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1598.967 | 1643.855 | 1564.098 | 1643.855 |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 153.444 | 157.015 | 150.142 | 157.015 |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1546.939 | 1562.536 | 1541.162 | 1562.536 |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.196 | 0.241 | 0.161 | 0.241 |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 4.046 | 4.813 | 3.965 | 4.813 |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.089 | 0.120 | 0.080 | 0.120 |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.691 | 1.068 | 0.628 | 1.068 |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.076 | 1.282 | 0.878 | 1.282 |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 19.032 | 19.752 | 18.842 | 19.752 |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 0.915 | 1.615 | 0.732 | 1.615 |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 18.868 | 19.702 | 18.217 | 19.702 |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.199 | 2.158 | 1.094 | 2.158 |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 13.293 | 14.358 | 13.003 | 14.358 |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.309 | 0.367 | 0.285 | 0.367 |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 5.484 | 6.252 | 5.329 | 6.252 |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.145 | 0.180 | 0.128 | 0.180 |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.814 | 0.848 | 0.802 | 0.848 |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 201.579 | 265.197 | 190.334 | 265.197 |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1593.980 | 1640.128 | 1568.506 | 1640.128 |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 175.263 | 432.882 | 159.449 | 432.882 |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1643.616 | 2256.135 | 1558.929 | 2256.135 |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.145 | 0.213 | 0.123 | 0.213 |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 3.523 | 4.129 | 3.253 | 4.129 |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.114 | 0.198 | 0.078 | 0.198 |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.798 | 0.862 | 0.753 | 0.862 |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.044 | 5.654 | 4.647 | 5.654 |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 17.309 | 18.286 | 16.446 | 18.286 |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 4.917 | 5.585 | 4.737 | 5.585 |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 15.819 | 16.437 | 15.563 | 16.437 |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 5.697 | 7.834 | 4.723 | 7.834 |
| map-regressors-medium | warm-fit | python-prophet | 6 | 11.809 | 12.552 | 11.622 | 12.552 |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.660 | 1.544 | 0.592 | 1.544 |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.984 | 4.939 | 3.876 | 4.939 |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.023 | 0.028 | 0.013 | 0.028 |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.576 | 0.596 | 0.545 | 0.596 |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 159.873 | 165.315 | 158.537 | 165.315 |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1576.944 | 1651.563 | 1561.971 | 1651.563 |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.106 | 0.111 | 0.072 | 0.111 |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.568 | 3.229 | 2.385 | 3.229 |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.041 | 0.044 | 0.032 | 0.044 |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.539 | 0.589 | 0.528 | 0.589 |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.118 | 3.921 | 2.994 | 3.921 |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 13.497 | 14.778 | 13.197 | 14.778 |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 3.055 | 4.390 | 3.002 | 4.390 |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 12.872 | 13.453 | 12.277 | 13.453 |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 3.265 | 6.439 | 2.936 | 6.439 |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 9.430 | 10.507 | 9.372 | 10.507 |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.426 | 0.574 | 0.394 | 0.574 |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.324 | 3.994 | 3.292 | 3.994 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `ff2c99b0929094e8ac0ce712e276c39d5fed6ebc` (dirty)
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:a6ad3ddda8365f00a5cfcbe1fb6bc151d3f235a72dae6518a903c97e688c25ef`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:a9400a08fcc8bd5e9a3d18632bc1382e8d2b5850191a52c81df1f7e9be7f72b7`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.0-beta.107`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: unsupported; timings do not report a process-tree peak RSS

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/aarch64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: unsupported; Prophet fitting may use a backend child process and timings do not report a process-tree peak RSS

