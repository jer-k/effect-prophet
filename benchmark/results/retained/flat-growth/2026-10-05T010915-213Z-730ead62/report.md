# Effect Prophet benchmark — 2026-10-05T010915-213Z-730ead62

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| map-training-zero-span-flat-varied | equivalent-objective | passed | 8.557e-5 | 0.000e+0 | 0.000e+0 | 8.557e-5 | 3.338e-4 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-zero-span-flat-constant | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| flat-mixed-components | equivalent-objective | passed | 2.361e-6 | 2.216e-5 | 5.865e-6 | 2.452e-5 | 7.913e-7 | Verified equivalent behavior for this configuration under evidence stage-f-flat-mixed-v1. |
| flat-mixed-components-large | equivalent-objective | passed | 1.999e-6 | 1.206e-5 | 7.490e-6 | 1.755e-5 | 2.089e-6 | Verified equivalent behavior for this configuration under evidence stage-f-flat-mixed-v1. |
| uncertainty-flat-mixed-components-full-intervals-512 | scalar-process-different-public-work | passed | 2.361e-6 | 2.216e-5 | 5.865e-6 | 2.452e-5 | 7.913e-7 | Verified fitted point behavior under stage-f-flat-mixed-v1; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. |
| uncertainty-flat-mixed-components-large-full-samples-128 | scalar-process-different-public-work | passed | 1.999e-6 | 1.206e-5 | 7.490e-6 | 1.755e-5 | 2.089e-6 | Verified fitted point behavior under stage-f-flat-mixed-v1; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. |
| evaluation-flat-mixed-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.143e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.143e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.143e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.004e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.004e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| flat-defaults-level | equivalent-objective | passed | 5.964e-10 | 4.657e-9 | 4.657e-9 | 4.060e-9 | 2.457e-9 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-defaults-seasonal | equivalent-objective | passed | 2.455e-7 | 9.364e-6 | 9.364e-6 | 9.610e-6 | 9.184e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-defaults-negative | equivalent-objective | passed | 6.543e-10 | 4.920e-9 | 4.920e-9 | 5.574e-9 | 2.537e-9 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-level-absmax | equivalent-objective | passed | 4.101e-7 | 0.000e+0 | 0.000e+0 | 4.101e-7 | 2.133e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-level-minmax | equivalent-objective | passed | 1.074e-7 | 0.000e+0 | 0.000e+0 | 1.074e-7 | 2.383e-7 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-constant-absmax | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-constant-minmax | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-negative-absmax | equivalent-objective | passed | 4.136e-7 | 0.000e+0 | 0.000e+0 | 4.136e-7 | 2.139e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-negative-minmax | equivalent-objective | passed | 1.074e-7 | 0.000e+0 | 0.000e+0 | 1.074e-7 | 2.383e-7 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-seasonal-absmax | equivalent-objective | passed | 1.353e-6 | 1.901e-6 | 1.901e-6 | 2.605e-6 | 1.436e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-seasonal-minmax | equivalent-objective | passed | 1.722e-6 | 8.017e-7 | 8.017e-7 | 2.314e-6 | 4.467e-7 | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-prefix-63-absmax | equivalent-objective | passed | 2.097e-6 | 3.768e-6 | 3.768e-6 | 2.467e-6 | 8.251e-7 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-63-minmax | equivalent-objective | passed | 6.389e-6 | 1.425e-5 | 6.729e-6 | 2.064e-5 | 2.052e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-70-absmax | equivalent-objective | passed | 4.964e-7 | 1.466e-5 | 1.466e-5 | 1.143e-5 | 3.228e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-70-minmax | equivalent-objective | passed | 9.622e-7 | 4.463e-6 | 3.186e-6 | 3.500e-6 | 3.013e-8 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-77-absmax | equivalent-objective | passed | 1.128e-6 | 4.099e-6 | 4.099e-6 | 2.971e-6 | 2.031e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-77-minmax | equivalent-objective | passed | 1.431e-6 | 1.707e-5 | 3.258e-6 | 1.564e-5 | 6.664e-7 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-mixed-components-absmax | equivalent-objective | passed | 4.412e-6 | 1.511e-5 | 1.511e-5 | 1.366e-5 | 2.120e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-225-absmax | equivalent-objective | passed | 2.938e-6 | 7.617e-6 | 1.443e-6 | 8.923e-6 | 1.703e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-225-minmax | equivalent-objective | passed | 5.239e-7 | 1.499e-5 | 4.108e-6 | 1.446e-5 | 8.012e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-232-absmax | equivalent-objective | passed | 2.011e-6 | 1.010e-5 | 5.100e-6 | 1.004e-5 | 4.192e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-232-minmax | equivalent-objective | passed | 9.003e-7 | 1.207e-5 | 6.540e-6 | 1.951e-5 | 2.939e-7 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-mixed-components-large-absmax | equivalent-objective | passed | 2.312e-6 | 5.486e-6 | 4.395e-6 | 7.799e-6 | 1.180e-6 | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-flat-mixed-components-full-intervals-512 | 96 | 6 | 0 | 24 | 24 | 24 | 512 | intervals | 67108864 | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-large-full-samples-128 | 256 | 6 | 0 | 64 | 64 | 64 | 128 | samples | 67108864 | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | docs/validation/uncertainty.md#evidence-classes |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 0 | 0 | n/a / n/a | horizons / exclude | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 0 | 128 | 19 / 0.8 | horizons / exclude | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 0 | 0 | n/a / n/a | horizons / exclude | 285e7251ecc2e6cb3c1ce6a3f2ff707fc782ff4df6b3a5086d8ce3fe1a856fc2, dbdeb05fe17bf42d396923238981fea7187dec239a32e6ab1c93dc665d0b0abe, 2d51500a53bf15ca176e6fdf576923588833aeac4bf90f5813df0b2730ce4b51 |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 0 | 0 | n/a / n/a | rolling / exclude | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 0 | 128 | 19 / 0.8 | rolling / exclude | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 9.136 | 12.435 | 7.217 | 12.435 | 154.7 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 47.834 | 49.368 | 47.087 | 49.368 | 118.5 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 183.407 | 192.610 | 182.040 | 192.610 | 154.4 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1479.165 | 1513.615 | 1478.103 | 1513.615 | 118.5 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.973 | 3.238 | 2.578 | 3.238 | 152.1 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.411 | 1.514 | 1.366 | 1.514 | 118.5 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.139 | 0.141 | 0.128 | 0.141 | 127.9 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.510 | 0.525 | 0.471 | 0.525 | 114.8 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.246 | 0.266 | 0.242 | 0.266 | 151.6 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.531 | 6.546 | 5.328 | 6.546 | 118.5 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.377 | 3.239 | 1.314 | 3.239 | 135.6 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.749 | 0.782 | 0.732 | 0.782 | 115.0 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 5.913 | 8.426 | 5.864 | 8.426 | 150.9 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 38.482 | 39.660 | 38.468 | 39.660 | 118.1 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 7.398 | 7.473 | 6.947 | 7.473 | 152.0 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 61.310 | 67.482 | 61.046 | 67.482 | 118.5 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 188.380 | 195.328 | 180.393 | 195.328 | 154.7 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1486.909 | 1499.481 | 1466.202 | 1499.481 | 118.7 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.360 | 2.318 | 1.239 | 2.318 | 154.7 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.461 | 1.523 | 1.456 | 1.523 | 118.7 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.061 | 0.086 | 0.056 | 0.086 | 125.3 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.465 | 0.489 | 0.412 | 0.489 | 114.8 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.341 | 0.797 | 0.236 | 0.797 | 154.3 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.297 | 5.394 | 5.276 | 5.394 | 118.7 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.291 | 2.119 | 1.238 | 2.119 | 130.8 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.792 | 0.832 | 0.791 | 0.832 | 115.1 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 7.539 | 8.359 | 6.947 | 8.359 | 154.0 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 47.906 | 50.723 | 45.580 | 50.723 | 118.2 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.238 | 2.290 | 2.049 | 2.290 | 157.7 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.650 | 15.885 | 13.321 | 15.885 | 118.6 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.206 | 0.635 | 0.205 | 0.635 | 160.8 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.005 | 0.004 | 0.005 | 118.6 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.203 | 0.225 | 0.203 | 0.225 | 158.5 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.018 | 0.009 | 0.018 | 118.6 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 13.207 | 14.489 | 12.104 | 14.489 | 154.6 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 144.977 | 170.962 | 143.357 | 170.962 | 118.6 |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.139 | 158.112 | 152.671 | 158.112 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1433.403 | 1439.966 | 1432.875 | 1439.966 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.107 | 0.114 | 0.101 | 0.114 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 1.907 | 1.980 | 1.877 | 1.980 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.039 | 0.032 | 0.039 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.389 | 0.542 | 0.388 | 0.542 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.178 | 1.185 | 1.126 | 1.185 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 2.950 | 3.027 | 2.884 | 3.027 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.212 | 0.261 | 0.205 | 0.261 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.669 | 2.701 | 2.628 | 2.701 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.520 | 168.497 | 150.247 | 168.497 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1469.094 | 1513.055 | 1428.442 | 1513.055 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.100 | 0.120 | 0.090 | 0.120 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 1.925 | 1.949 | 1.875 | 1.949 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.041 | 0.033 | 0.041 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.390 | 0.407 | 0.385 | 0.407 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.131 | 1.171 | 1.091 | 1.171 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 2.891 | 3.024 | 2.832 | 3.024 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.227 | 0.459 | 0.200 | 0.459 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.632 | 2.693 | 2.597 | 2.693 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.023 | 0.015 | 0.023 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.509 | 0.900 | 0.495 | 0.900 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 159.661 | 182.249 | 155.289 | 182.249 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1444.615 | 1466.823 | 1439.562 | 1466.823 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 157.534 | 188.781 | 153.055 | 188.781 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1449.884 | 1490.216 | 1440.060 | 1490.216 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.068 | 0.082 | 0.061 | 0.082 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.210 | 2.270 | 2.053 | 2.270 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.032 | 0.063 | 0.031 | 0.063 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.435 | 0.526 | 0.408 | 0.526 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.489 | 2.639 | 1.338 | 2.639 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.965 | 16.769 | 12.655 | 16.769 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.611 | 1.750 | 1.542 | 1.750 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 12.333 | 13.636 | 12.126 | 13.636 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.578 | 4.257 | 1.440 | 4.257 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 9.089 | 11.092 | 8.925 | 11.092 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.267 | 0.814 | 0.208 | 0.814 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.180 | 3.452 | 3.140 | 3.452 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.021 | 0.014 | 0.021 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.491 | 0.455 | 0.491 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 162.571 | 171.997 | 156.971 | 171.997 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1454.139 | 1499.231 | 1450.831 | 1499.231 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 151.140 | 169.509 | 149.787 | 169.509 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1441.100 | 1494.908 | 1428.373 | 1494.908 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.082 | 0.102 | 0.061 | 0.102 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.176 | 2.352 | 2.082 | 2.352 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.036 | 0.058 | 0.026 | 0.058 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.443 | 0.491 | 0.418 | 0.491 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.273 | 1.351 | 1.218 | 1.351 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.729 | 13.376 | 12.491 | 13.376 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.709 | 1.754 | 1.615 | 1.754 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 12.071 | 14.767 | 11.667 | 14.767 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.730 | 3.174 | 1.453 | 3.174 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 8.989 | 9.474 | 8.628 | 9.474 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.303 | 0.751 | 0.209 | 0.751 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.108 | 3.228 | 3.074 | 3.228 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.019 | 0.014 | 0.019 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.479 | 0.524 | 0.462 | 0.524 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 163.472 | 173.708 | 156.047 | 173.708 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1853.472 | 1870.841 | 1838.217 | 1870.841 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 154.534 | 175.200 | 151.082 | 175.200 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1440.327 | 1453.867 | 1431.754 | 1453.867 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.074 | 0.153 | 0.061 | 0.153 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.157 | 2.427 | 2.068 | 2.427 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.052 | 0.074 | 0.034 | 0.074 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.447 | 0.487 | 0.413 | 0.487 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.295 | 1.335 | 1.218 | 1.335 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 398.937 | 406.375 | 393.535 | 406.375 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 1.666 | 2.012 | 1.549 | 2.012 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 395.815 | 398.039 | 393.394 | 398.039 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 1.737 | 3.320 | 1.420 | 3.320 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 393.513 | 406.526 | 392.152 | 406.526 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.203 | 0.266 | 0.193 | 0.266 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.133 | 3.950 | 3.027 | 3.950 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.484 | 159.293 | 152.519 | 159.293 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1442.336 | 1456.108 | 1439.334 | 1456.108 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.105 | 0.123 | 0.093 | 0.123 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 1.957 | 2.019 | 1.907 | 2.019 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.042 | 0.045 | 0.042 | 0.045 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.428 | 0.438 | 0.425 | 0.438 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.291 | 1.375 | 1.262 | 1.375 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 5.066 | 6.135 | 4.840 | 6.135 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.218 | 0.261 | 0.207 | 0.261 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.683 | 2.728 | 2.647 | 2.728 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.612 | 166.709 | 152.359 | 166.709 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1446.440 | 1466.985 | 1438.050 | 1466.985 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.096 | 0.103 | 0.090 | 0.103 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 1.938 | 1.983 | 1.883 | 1.983 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.036 | 0.032 | 0.036 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.410 | 0.436 | 0.399 | 0.436 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 1.089 | 1.186 | 1.089 | 1.186 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 4.864 | 5.479 | 4.727 | 5.479 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.206 | 0.238 | 0.205 | 0.238 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.671 | 2.748 | 2.594 | 2.748 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.181 | 165.087 | 154.015 | 165.087 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1443.548 | 1477.132 | 1437.344 | 1477.132 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.154 | 0.193 | 0.152 | 0.193 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.464 | 3.544 | 3.449 | 3.544 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.085 | 0.104 | 0.083 | 0.104 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.654 | 0.665 | 0.654 | 0.665 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 1.588 | 3.330 | 1.256 | 3.330 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 7.534 | 8.288 | 7.523 | 8.288 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.535 | 0.558 | 0.509 | 0.558 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 5.034 | 5.680 | 4.821 | 5.680 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.099 | 195.896 | 160.659 | 195.896 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1457.941 | 1462.582 | 1454.218 | 1462.582 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.185 | 0.428 | 0.149 | 0.428 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.731 | 3.891 | 3.659 | 3.891 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.059 | 0.072 | 0.052 | 0.072 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.827 | 0.829 | 0.799 | 0.829 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 4.925 | 6.926 | 4.208 | 6.926 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.044 | 12.752 | 8.928 | 12.752 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.629 | 0.750 | 0.595 | 0.750 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.895 | 7.323 | 4.764 | 7.323 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.043 | 0.046 | 0.042 | 0.046 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.646 | 0.691 | 0.638 | 0.691 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 178.114 | 180.292 | 167.276 | 180.292 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1457.485 | 1471.662 | 1451.947 | 1471.662 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 161.306 | 166.480 | 159.950 | 166.480 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1453.989 | 1467.916 | 1442.133 | 1467.916 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.093 | 0.104 | 0.075 | 0.104 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.789 | 5.092 | 3.781 | 5.092 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.063 | 0.087 | 0.055 | 0.087 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.819 | 0.837 | 0.814 | 0.837 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.844 | 1.989 | 1.804 | 1.989 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.472 | 14.652 | 14.420 | 14.652 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.919 | 3.002 | 2.146 | 3.002 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.624 | 14.040 | 13.609 | 14.040 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 1.916 | 3.560 | 1.836 | 3.560 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 8.909 | 9.136 | 8.882 | 9.136 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.759 | 1.064 | 0.559 | 1.064 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.944 | 5.126 | 4.762 | 5.126 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.055 | 0.079 | 0.052 | 0.079 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.522 | 0.580 | 0.512 | 0.580 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 160.774 | 182.618 | 159.357 | 182.618 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1454.705 | 1466.720 | 1452.810 | 1466.720 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 156.043 | 163.226 | 155.542 | 163.226 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1443.957 | 1467.804 | 1441.654 | 1467.804 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.073 | 0.103 | 0.073 | 0.103 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.596 | 4.078 | 3.475 | 4.078 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.063 | 0.101 | 0.054 | 0.101 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.649 | 0.660 | 0.643 | 0.660 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 0.974 | 1.059 | 0.973 | 1.059 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 13.152 | 13.908 | 12.960 | 13.908 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.200 | 1.564 | 1.165 | 1.564 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.301 | 12.585 | 12.220 | 12.585 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.297 | 1.667 | 1.277 | 1.667 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.559 | 9.403 | 7.400 | 9.403 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.462 | 0.501 | 0.452 | 0.501 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.733 | 4.773 | 4.639 | 4.773 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.313 | 187.083 | 154.167 | 187.083 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1454.719 | 1532.611 | 1448.891 | 1532.611 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.106 | 0.192 | 0.094 | 0.192 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 1.997 | 2.388 | 1.928 | 2.388 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.038 | 0.034 | 0.038 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.488 | 0.660 | 0.448 | 0.660 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.189 | 1.229 | 1.176 | 1.229 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 5.344 | 5.402 | 4.999 | 5.402 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.237 | 0.256 | 0.234 | 0.256 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.684 | 2.732 | 2.635 | 2.732 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.091 | 167.911 | 152.513 | 167.911 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1442.347 | 1462.070 | 1441.061 | 1462.070 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.108 | 0.114 | 0.102 | 0.114 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 1.986 | 2.005 | 1.933 | 2.005 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.039 | 0.052 | 0.038 | 0.052 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.412 | 0.444 | 0.406 | 0.444 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 1.187 | 1.284 | 1.185 | 1.284 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 5.486 | 7.793 | 4.917 | 7.793 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.208 | 0.242 | 0.201 | 0.242 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.682 | 2.797 | 2.664 | 2.797 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.340 | 173.778 | 157.282 | 173.778 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1444.067 | 1466.105 | 1443.400 | 1466.105 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.210 | 0.127 | 0.210 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.682 | 3.962 | 3.657 | 3.962 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.047 | 0.079 | 0.047 | 0.079 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.767 | 0.783 | 0.755 | 0.783 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.927 | 3.511 | 2.593 | 3.511 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.535 | 10.152 | 8.531 | 10.152 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.263 | 0.320 | 0.243 | 0.320 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.743 | 4.834 | 4.677 | 4.834 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.377 | 173.045 | 159.233 | 173.045 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1443.297 | 1459.390 | 1436.906 | 1459.390 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.129 | 0.143 | 0.106 | 0.143 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.722 | 4.042 | 3.708 | 4.042 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.056 | 0.069 | 0.053 | 0.069 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.783 | 1.191 | 0.779 | 1.191 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 2.986 | 3.306 | 2.795 | 3.306 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.810 | 8.857 | 8.656 | 8.857 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.245 | 0.279 | 0.223 | 0.279 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.757 | 4.799 | 4.736 | 4.799 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.778 | 169.312 | 156.891 | 169.312 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1462.749 | 1510.236 | 1453.163 | 1510.236 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.150 | 0.276 | 0.114 | 0.276 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.711 | 3.793 | 3.655 | 3.793 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.052 | 0.070 | 0.051 | 0.070 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.785 | 0.820 | 0.782 | 0.820 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.287 | 4.970 | 2.826 | 4.970 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 9.009 | 9.091 | 8.683 | 9.091 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.247 | 0.261 | 0.222 | 0.261 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.905 | 5.400 | 4.875 | 5.400 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.841 | 167.106 | 159.179 | 167.106 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1443.578 | 1513.732 | 1427.374 | 1513.732 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.125 | 0.177 | 0.118 | 0.177 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.697 | 3.790 | 3.695 | 3.790 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.062 | 0.093 | 0.049 | 0.093 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.793 | 0.807 | 0.784 | 0.807 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.665 | 4.249 | 3.101 | 4.249 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.906 | 9.064 | 8.812 | 9.064 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.314 | 0.346 | 0.244 | 0.346 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.806 | 6.321 | 4.771 | 6.321 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.115 | 166.182 | 158.633 | 166.182 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1446.228 | 1490.837 | 1436.205 | 1490.837 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.169 | 0.213 | 0.132 | 0.213 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.505 | 3.679 | 3.471 | 3.679 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.067 | 0.075 | 0.051 | 0.075 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.609 | 0.636 | 0.605 | 0.636 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.559 | 3.061 | 1.482 | 3.061 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.278 | 8.052 | 7.175 | 8.052 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.241 | 0.690 | 0.238 | 0.690 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.975 | 5.423 | 4.972 | 5.423 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.606 | 164.254 | 154.908 | 164.254 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1437.295 | 1450.224 | 1434.986 | 1450.224 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.147 | 0.175 | 0.134 | 0.175 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.518 | 3.649 | 3.495 | 3.649 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.055 | 0.102 | 0.053 | 0.102 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.631 | 0.680 | 0.591 | 0.680 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 2.045 | 4.007 | 1.590 | 4.007 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.613 | 10.809 | 7.427 | 10.809 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.248 | 0.297 | 0.236 | 0.297 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 5.681 | 6.084 | 5.456 | 6.084 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.669 | 171.629 | 155.698 | 171.629 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1444.519 | 1515.418 | 1443.466 | 1515.418 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.213 | 0.318 | 0.156 | 0.318 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.513 | 3.942 | 3.420 | 3.942 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.072 | 0.201 | 0.068 | 0.201 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.630 | 1.151 | 0.626 | 1.151 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.221 | 3.892 | 1.657 | 3.892 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.798 | 10.160 | 7.154 | 10.160 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.259 | 0.361 | 0.240 | 0.361 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.713 | 5.200 | 4.637 | 5.200 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.181 | 167.542 | 154.299 | 167.542 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1456.738 | 1467.461 | 1456.210 | 1467.461 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.166 | 0.206 | 0.134 | 0.206 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.425 | 3.618 | 3.417 | 3.618 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.067 | 0.082 | 0.067 | 0.082 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.632 | 0.664 | 0.629 | 0.664 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 2.016 | 3.036 | 1.744 | 3.036 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.814 | 8.274 | 7.209 | 8.274 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.243 | 0.272 | 0.230 | 0.272 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.774 | 5.062 | 4.750 | 5.062 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.348 | 163.057 | 155.431 | 163.057 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1432.980 | 1453.679 | 1428.933 | 1453.679 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.156 | 0.200 | 0.151 | 0.200 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.479 | 3.674 | 3.439 | 3.674 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.068 | 0.070 | 0.067 | 0.070 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.614 | 0.647 | 0.612 | 0.647 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 1.855 | 3.544 | 1.334 | 3.544 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.371 | 8.372 | 7.217 | 8.372 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.274 | 0.413 | 0.258 | 0.413 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.694 | 4.826 | 4.683 | 4.826 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.030 | 163.021 | 153.195 | 163.021 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1445.424 | 1497.752 | 1442.836 | 1497.752 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.168 | 0.174 | 0.135 | 0.174 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.535 | 3.699 | 3.524 | 3.699 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.064 | 0.071 | 0.063 | 0.071 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.643 | 0.926 | 0.630 | 0.926 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 1.868 | 3.334 | 1.329 | 3.334 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 7.818 | 8.165 | 7.505 | 8.165 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.250 | 0.312 | 0.238 | 0.312 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.740 | 5.962 | 4.670 | 5.962 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.312 | 160.525 | 153.381 | 160.525 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1440.415 | 1479.852 | 1431.914 | 1479.852 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.121 | 0.177 | 0.114 | 0.177 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.018 | 2.149 | 1.998 | 2.149 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.042 | 0.050 | 0.041 | 0.050 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.420 | 0.447 | 0.394 | 0.447 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 1.540 | 1.605 | 1.519 | 1.605 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 6.395 | 9.349 | 5.569 | 9.349 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.211 | 0.240 | 0.208 | 0.240 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.961 | 4.936 | 3.363 | 4.936 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.622 | 158.217 | 153.521 | 158.217 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1454.345 | 1471.622 | 1450.491 | 1471.622 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.115 | 0.169 | 0.102 | 0.169 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.005 | 2.110 | 1.983 | 2.110 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.054 | 0.063 | 0.049 | 0.063 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.427 | 0.440 | 0.425 | 0.440 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 1.542 | 1.640 | 1.531 | 1.640 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 6.063 | 6.821 | 5.564 | 6.821 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.236 | 0.263 | 0.230 | 0.263 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.146 | 3.317 | 3.094 | 3.317 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 158.839 | 161.269 | 150.808 | 161.269 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1446.989 | 1475.892 | 1445.810 | 1475.892 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.141 | 0.163 | 0.136 | 0.163 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.872 | 1.921 | 1.872 | 1.921 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.046 | 0.076 | 0.040 | 0.076 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.335 | 0.338 | 0.329 | 0.338 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.551 | 0.603 | 0.505 | 0.603 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.983 | 3.269 | 2.863 | 3.269 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.180 | 0.199 | 0.174 | 0.199 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.636 | 2.749 | 2.595 | 2.749 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 155.445 | 165.719 | 154.297 | 165.719 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1460.070 | 1475.875 | 1454.347 | 1475.875 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.148 | 0.190 | 0.124 | 0.190 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.900 | 1.935 | 1.886 | 1.935 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.061 | 0.084 | 0.042 | 0.084 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.333 | 0.355 | 0.322 | 0.355 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.549 | 0.725 | 0.505 | 0.725 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 6.136 | 6.885 | 5.524 | 6.885 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.180 | 0.200 | 0.156 | 0.200 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.691 | 2.819 | 2.661 | 2.819 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 167.859 | 184.908 | 161.930 | 184.908 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1541.661 | 1618.329 | 1528.008 | 1618.329 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.938 | 166.328 | 156.970 | 166.328 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1545.147 | 1555.780 | 1529.332 | 1555.780 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.165 | 0.180 | 0.132 | 0.180 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.738 | 5.083 | 3.469 | 5.083 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.078 | 0.094 | 0.072 | 0.094 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.687 | 0.785 | 0.647 | 0.785 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 0.207 | 0.039 | 0.207 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.534 | 0.566 | 0.528 | 0.566 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.162 | 2.069 | 0.809 | 2.069 | 139.2 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 71.653 | 79.455 | 71.115 | 79.455 | 119.4 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 170.063 | 182.375 | 169.202 | 182.375 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1457.842 | 1469.002 | 1455.967 | 1469.002 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 161.312 | 173.443 | 159.853 | 173.443 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1464.818 | 1498.067 | 1444.924 | 1498.067 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.118 | 0.138 | 0.103 | 0.138 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.795 | 4.165 | 3.721 | 4.165 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.054 | 0.066 | 0.046 | 0.066 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.808 | 0.842 | 0.789 | 0.842 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.074 | 0.082 | 0.057 | 0.082 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.628 | 0.656 | 0.614 | 0.656 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 1.586 | 2.922 | 1.412 | 2.922 | 148.8 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 19.818 | 33.695 | 19.552 | 33.695 | 118.7 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `730ead622275d37c6b7e0a3c863e82a7984de1b2` (dirty)
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `map-training-zero-span-flat-varied`, `map-training-zero-span-flat-constant`, `flat-mixed-components`, `flat-mixed-components-large`, `uncertainty-flat-mixed-components-full-intervals-512`, `uncertainty-flat-mixed-components-large-full-samples-128`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `flat-defaults-level`, `flat-defaults-seasonal`, `flat-defaults-negative`, `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:f27eb0d9d0b174c1a139f5235d442aa679d9f4b495b0aab2ff4261dce78741eb`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:dcc27373162244a7ffdba25889e8d28b6e81046255eb6515d3489c5da95840e9`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.0`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via process.resourceUsage.maxRSS (Linux KiB); includes imports and previous operations; excludes subprocess peaks; heap/WASM-only peaks unavailable; Effect tracing disabled

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/aarch64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `input-numeric-dtype=float64`, `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

