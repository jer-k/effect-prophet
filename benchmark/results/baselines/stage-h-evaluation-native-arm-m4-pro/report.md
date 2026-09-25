# Effect Prophet benchmark — 2026-09-25T205622-287Z-85139681

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| evaluation-linear-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.957e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.957e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.957e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-point | different-public-work | failed | n/a | n/a | n/a | n/a | n/a | Cross-language evaluation point forecasts exceed the declared tolerance. |
| evaluation-flat-mixed-intervals | different-public-work | failed | n/a | n/a | n/a | n/a | n/a | Cross-language evaluation point forecasts exceed the declared tolerance. |
| evaluation-flat-mixed-search | different-public-work | failed | n/a | n/a | n/a | n/a | n/a | Cross-language evaluation point forecasts exceed the declared tolerance. |
| evaluation-logistic-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.352e-4 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.352e-4 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.352e-4 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-point | different-public-work | failed | n/a | n/a | n/a | n/a | n/a | Cross-language evaluation point forecasts exceed the declared tolerance. |
| evaluation-flat-large-intervals | different-public-work | failed | n/a | n/a | n/a | n/a | n/a | Cross-language evaluation point forecasts exceed the declared tolerance. |
| evaluation-logistic-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 5.667e-4 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 5.667e-4 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-failure-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.957e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-linear-point | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall / exclude | n/a |
| evaluation-linear-intervals | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 64 | 19 / 0.8 | overall / exclude | n/a |
| evaluation-linear-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall / exclude | bf3c207aa0527b3fed26c6457a38096f22eb265b1f14cfb914dbba06c9c586b7, 26bc8f8bd4f0cee5faf2f59db6e36fb571eca1651ff35f9e3af955f31e7a1bd2 |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 0 | 0 | n/a / n/a | horizons / exclude | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 0 | 128 | 19 / 0.8 | horizons / exclude | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 0 | 0 | n/a / n/a | horizons / exclude | 285e7251ecc2e6cb3c1ce6a3f2ff707fc782ff4df6b3a5086d8ce3fe1a856fc2, dbdeb05fe17bf42d396923238981fea7187dec239a32e6ab1c93dc665d0b0abe, 2d51500a53bf15ca176e6fdf576923588833aeac4bf90f5813df0b2730ce4b51 |
| evaluation-logistic-point | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | n/a |
| evaluation-logistic-intervals | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 256 | 19 / 0.8 | horizons / exclude | n/a |
| evaluation-logistic-search | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 2 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | dba3d8a0e0e3ddcb7dd9692b3ab9750e8e1bffa1d9fc232268475e0bc8ba8ee9, 0d80f40ef7483ec9065f001be65b89994445474261459293f7e262af838bb5c1 |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 0 | 0 | n/a / n/a | rolling / exclude | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 0 | 128 | 19 / 0.8 | rolling / exclude | n/a |
| evaluation-logistic-large-point | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 0 | n/a / n/a | rolling / exclude | n/a |
| evaluation-logistic-large-intervals | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 256 | 19 / 0.8 | rolling / exclude | n/a |
| evaluation-linear-failure-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 3 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | bf3c207aa0527b3fed26c6457a38096f22eb265b1f14cfb914dbba06c9c586b7, 26bc8f8bd4f0cee5faf2f59db6e36fb571eca1651ff35f9e3af955f31e7a1bd2, bd41a7b2cd8f20228fba957e8872693bd9f7239910257231775ff02553340aca |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 1.939 | 2.486 | 1.878 | 2.486 | 147.4 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 12.604 | 12.909 | 12.434 | 12.909 | 118.0 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.207 | 0.227 | 0.198 | 0.227 | 150.2 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.005 | 0.006 | 118.0 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.249 | 0.328 | 0.243 | 0.328 | 149.6 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.012 | 0.009 | 0.012 | 118.0 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 9.669 | 12.103 | 9.348 | 12.103 | 146.9 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 71.476 | 71.712 | 69.993 | 71.712 | 118.0 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 5.098 | 6.043 | 5.084 | 6.043 | 137.8 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 40.055 | 40.919 | 39.532 | 40.919 | 118.1 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 185.354 | 194.096 | 183.711 | 194.096 | 147.5 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1676.501 | 1732.843 | 1622.915 | 1732.843 | 118.1 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.463 | 2.145 | 1.356 | 2.145 | 147.5 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.177 | 2.689 | 1.150 | 2.689 | 118.1 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.008 | 0.020 | 0.007 | 0.020 | 127.7 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.427 | 0.505 | 0.410 | 0.505 | 114.0 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.209 | 0.335 | 0.185 | 0.335 | 147.5 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 6.726 | 10.163 | 5.861 | 10.163 | 118.1 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 0.784 | 1.199 | 0.691 | 1.199 | 130.2 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.743 | 1.086 | 0.705 | 1.086 | 114.8 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 5.994 | 6.053 | 5.424 | 6.053 | 142.8 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 33.606 | 39.630 | 31.513 | 39.630 | 117.6 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 2.322 | 3.415 | 2.272 | 3.415 | 145.1 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 12.015 | 12.969 | 11.732 | 12.969 | 118.1 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.252 | 0.393 | 0.247 | 0.393 | 145.6 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.006 | 0.091 | 0.005 | 0.091 | 118.1 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.264 | 0.361 | 0.256 | 0.361 | 145.2 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.009 | 0.011 | 118.1 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 7.367 | 13.223 | 7.137 | 13.223 | 144.2 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 68.138 | 69.938 | 67.882 | 69.938 | 118.1 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 4.461 | 9.404 | 4.412 | 9.404 | 139.5 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 28.092 | 32.000 | 27.116 | 32.000 | 118.1 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 18.403 | 22.796 | 16.855 | 22.796 | 150.5 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 70.975 | 100.866 | 68.846 | 100.866 | 120.3 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 202.862 | 206.469 | 199.499 | 206.469 | 152.1 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1636.891 | 1687.065 | 1621.029 | 1687.065 | 118.0 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.555 | 2.943 | 2.315 | 2.943 | 152.0 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.383 | 1.457 | 1.343 | 1.457 | 118.0 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.049 | 0.067 | 0.044 | 0.067 | 128.9 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.521 | 0.596 | 0.518 | 0.596 | 113.9 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.217 | 0.241 | 0.216 | 0.241 | 151.6 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.854 | 6.407 | 5.784 | 6.407 | 118.0 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.686 | 2.835 | 1.549 | 2.835 | 131.5 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.774 | 0.808 | 0.768 | 0.808 | 114.8 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 16.518 | 18.314 | 16.229 | 18.314 | 151.3 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 50.828 | 51.719 | 50.702 | 51.719 | 117.5 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 186.479 | 189.405 | 180.310 | 189.405 | 149.3 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1705.920 | 1757.864 | 1604.787 | 1757.864 | 118.2 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.280 | 1.582 | 1.266 | 1.582 | 149.3 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.834 | 0.872 | 0.815 | 0.872 | 118.2 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.015 | 0.026 | 0.014 | 0.026 | 128.1 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.481 | 2.286 | 0.437 | 2.286 | 114.0 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.321 | 0.376 | 0.244 | 0.376 | 143.1 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 6.085 | 8.084 | 5.750 | 8.084 | 118.2 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.891 | 1.104 | 0.863 | 1.104 | 130.4 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.632 | 0.875 | 0.584 | 0.875 | 114.9 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 4.333 | 5.380 | 4.119 | 5.380 | 140.2 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 24.701 | 26.975 | 22.645 | 26.975 | 117.7 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 3.130 | 3.697 | 3.077 | 3.697 | 148.9 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 12.903 | 13.291 | 12.536 | 13.291 | 118.1 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.256 | 0.526 | 0.236 | 0.526 | 149.5 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 118.1 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.267 | 0.833 | 0.262 | 0.833 | 149.4 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.012 | 0.009 | 0.012 | 118.1 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 7.358 | 13.440 | 7.088 | 13.440 | 148.3 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 48.236 | 49.140 | 48.078 | 49.140 | 118.1 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `851396812952749bc7f8bfa6f415f880279ec544`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `evaluation-linear-failure-search`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:636cace0ebe769b03820e45e654af64a1e8078d7abf13d3b7494dbf5b1725c49`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:5d27409f26f1a65b107932fb279ee318cf07553272402f2de2003c2594f4c042`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.0-beta.107`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via process.resourceUsage.maxRSS (Linux KiB); includes imports and previous operations; excludes subprocess peaks; heap/WASM-only peaks unavailable; Effect tracing disabled

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/aarch64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

