# Effect Prophet benchmark — 2026-10-05T145818-926Z-d2a974c1

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
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.151 | 11.238 | 6.906 | 11.238 | 152.1 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 49.995 | 54.262 | 47.934 | 54.262 | 118.7 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 198.779 | 214.038 | 187.090 | 214.038 | 156.1 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1503.497 | 1654.332 | 1480.176 | 1654.332 | 118.8 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 3.333 | 8.556 | 2.703 | 8.556 | 155.2 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.415 | 1.895 | 1.404 | 1.895 | 118.8 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.181 | 0.205 | 0.176 | 0.205 | 128.8 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.528 | 0.654 | 0.485 | 0.654 | 114.9 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.231 | 0.258 | 0.224 | 0.258 | 153.0 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.521 | 7.256 | 5.435 | 7.256 | 118.8 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.882 | 4.371 | 1.757 | 4.371 | 135.3 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.817 | 1.163 | 0.794 | 1.163 | 115.0 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.477 | 7.103 | 5.740 | 7.103 | 152.5 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 41.589 | 45.879 | 40.678 | 45.879 | 118.3 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 7.323 | 12.345 | 7.144 | 12.345 | 153.2 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 63.081 | 64.843 | 62.348 | 64.843 | 118.5 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 194.149 | 200.252 | 179.552 | 200.252 | 153.9 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1499.871 | 1530.393 | 1498.656 | 1530.393 | 118.4 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.171 | 1.682 | 1.126 | 1.682 | 153.8 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.470 | 1.501 | 1.462 | 1.501 | 118.4 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.065 | 0.082 | 0.055 | 0.082 | 126.2 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.425 | 0.453 | 0.423 | 0.453 | 114.8 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.252 | 0.342 | 0.238 | 0.342 | 153.2 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.370 | 5.608 | 5.296 | 5.608 | 118.4 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.292 | 1.638 | 1.272 | 1.638 | 131.6 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.767 | 0.801 | 0.735 | 0.801 | 115.0 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 7.188 | 7.676 | 6.222 | 7.676 | 151.1 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 47.918 | 50.886 | 45.987 | 50.886 | 118.0 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.119 | 4.741 | 1.703 | 4.741 | 160.0 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.824 | 15.542 | 13.025 | 15.542 | 118.4 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.230 | 1.079 | 0.214 | 1.079 | 162.3 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 118.4 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.205 | 0.231 | 0.195 | 0.231 | 161.3 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.011 | 0.016 | 0.009 | 0.016 | 118.4 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.745 | 13.723 | 11.440 | 13.723 | 155.7 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 155.845 | 184.377 | 154.756 | 184.377 | 118.4 |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.719 | 166.476 | 154.834 | 166.476 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1446.820 | 1471.458 | 1442.832 | 1471.458 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.113 | 0.121 | 0.105 | 0.121 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 1.930 | 2.115 | 1.877 | 2.115 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.038 | 0.041 | 0.038 | 0.041 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.396 | 0.400 | 0.385 | 0.400 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.135 | 1.172 | 1.125 | 1.172 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 2.972 | 3.124 | 2.942 | 3.124 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.212 | 0.227 | 0.189 | 0.227 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.686 | 3.066 | 2.649 | 3.066 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.935 | 166.865 | 153.732 | 166.865 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1457.774 | 1481.928 | 1450.430 | 1481.928 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.088 | 0.101 | 0.085 | 0.101 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 1.907 | 1.965 | 1.876 | 1.965 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.047 | 0.033 | 0.047 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.385 | 0.393 | 0.383 | 0.393 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.144 | 1.320 | 1.141 | 1.320 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 2.926 | 3.028 | 2.877 | 3.028 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.222 | 0.232 | 0.183 | 0.232 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.678 | 2.684 | 2.605 | 2.684 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.016 | 0.014 | 0.016 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.489 | 0.530 | 0.464 | 0.530 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 158.298 | 183.382 | 154.444 | 183.382 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1452.710 | 1524.115 | 1438.432 | 1524.115 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 165.091 | 184.649 | 152.150 | 184.649 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1463.294 | 1492.168 | 1447.830 | 1492.168 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.077 | 1.206 | 0.052 | 1.206 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.135 | 2.403 | 2.096 | 2.403 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.067 | 0.147 | 0.040 | 0.147 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.450 | 0.514 | 0.424 | 0.514 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.313 | 1.845 | 1.215 | 1.845 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.508 | 13.018 | 12.414 | 13.018 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.410 | 1.785 | 1.284 | 1.785 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 11.856 | 12.041 | 11.749 | 12.041 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.803 | 3.958 | 1.378 | 3.958 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 8.840 | 9.268 | 8.733 | 9.268 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.244 | 0.407 | 0.213 | 0.407 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.068 | 6.036 | 3.039 | 6.036 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.021 | 0.015 | 0.021 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.489 | 0.419 | 0.489 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 172.441 | 176.080 | 156.178 | 176.080 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1459.486 | 1506.816 | 1454.138 | 1506.816 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 158.624 | 178.997 | 154.877 | 178.997 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1464.932 | 1580.107 | 1446.309 | 1580.107 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.081 | 0.108 | 0.053 | 0.108 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.217 | 2.489 | 2.195 | 2.489 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.046 | 0.090 | 0.036 | 0.090 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.455 | 0.540 | 0.428 | 0.540 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.245 | 2.547 | 1.228 | 2.547 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.262 | 12.603 | 12.232 | 12.603 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.757 | 1.886 | 1.693 | 1.886 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 11.734 | 11.879 | 11.480 | 11.879 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.604 | 3.894 | 1.381 | 3.894 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 9.131 | 10.646 | 8.513 | 10.646 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.214 | 0.230 | 0.196 | 0.230 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.079 | 4.029 | 3.025 | 4.029 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.043 | 0.014 | 0.043 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.499 | 0.802 | 0.465 | 0.802 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 187.546 | 219.251 | 184.649 | 219.251 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1846.742 | 1928.707 | 1826.021 | 1928.707 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 159.131 | 174.998 | 151.836 | 174.998 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1499.974 | 1583.833 | 1449.460 | 1583.833 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.080 | 0.137 | 0.067 | 0.137 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.404 | 3.287 | 2.162 | 3.287 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.053 | 0.059 | 0.044 | 0.059 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.475 | 0.520 | 0.442 | 0.520 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.338 | 1.793 | 1.160 | 1.793 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 393.240 | 412.768 | 390.681 | 412.768 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 1.886 | 1.966 | 1.723 | 1.966 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 395.338 | 403.101 | 388.111 | 403.101 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 1.790 | 3.879 | 1.502 | 3.879 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 391.016 | 400.514 | 382.385 | 400.514 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.233 | 0.346 | 0.187 | 0.346 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.125 | 3.286 | 3.097 | 3.286 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.827 | 174.819 | 150.898 | 174.819 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1468.510 | 1558.035 | 1468.249 | 1558.035 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.098 | 0.229 | 0.088 | 0.229 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 1.974 | 2.051 | 1.912 | 2.051 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.039 | 0.030 | 0.039 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.421 | 0.467 | 0.414 | 0.467 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.190 | 1.441 | 1.175 | 1.441 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 5.243 | 5.889 | 4.916 | 5.889 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.226 | 0.233 | 0.198 | 0.233 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.684 | 2.848 | 2.617 | 2.848 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.465 | 171.315 | 152.866 | 171.315 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1438.808 | 1454.550 | 1430.154 | 1454.550 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.099 | 0.231 | 0.085 | 0.231 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 1.968 | 1.993 | 1.925 | 1.993 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.033 | 0.036 | 0.032 | 0.036 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.407 | 0.427 | 0.400 | 0.427 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 1.229 | 1.392 | 1.183 | 1.392 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 5.036 | 6.164 | 4.778 | 6.164 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.189 | 0.242 | 0.181 | 0.242 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.683 | 2.798 | 2.638 | 2.798 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.595 | 161.829 | 149.153 | 161.829 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1457.452 | 1467.017 | 1451.975 | 1467.017 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.160 | 0.186 | 0.157 | 0.186 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.599 | 4.455 | 3.410 | 4.455 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.098 | 0.157 | 0.078 | 0.157 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.645 | 0.832 | 0.643 | 0.832 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 1.512 | 3.431 | 1.230 | 3.431 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.351 | 12.365 | 7.750 | 12.365 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.510 | 0.608 | 0.498 | 0.608 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.823 | 4.877 | 4.712 | 4.877 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.669 | 179.589 | 155.342 | 179.589 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1483.763 | 1622.364 | 1482.832 | 1622.364 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.119 | 0.137 | 0.113 | 0.137 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.711 | 4.265 | 3.663 | 4.265 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.056 | 0.079 | 0.055 | 0.079 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.808 | 1.446 | 0.804 | 1.446 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 3.542 | 6.822 | 3.342 | 6.822 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 10.103 | 11.821 | 9.601 | 11.821 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.569 | 0.572 | 0.553 | 0.572 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.929 | 5.739 | 4.839 | 5.739 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.076 | 0.086 | 0.068 | 0.086 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.646 | 0.710 | 0.638 | 0.710 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 180.190 | 188.072 | 178.673 | 188.072 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1466.554 | 1477.754 | 1455.990 | 1477.754 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 165.551 | 184.038 | 157.035 | 184.038 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1470.005 | 1486.493 | 1455.731 | 1486.493 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.094 | 0.135 | 0.076 | 0.135 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.755 | 3.859 | 3.691 | 3.859 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.071 | 0.143 | 0.068 | 0.143 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.798 | 0.816 | 0.797 | 0.816 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.908 | 2.098 | 1.883 | 2.098 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.215 | 14.877 | 14.157 | 14.877 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.381 | 3.131 | 2.306 | 3.131 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.532 | 13.956 | 13.524 | 13.956 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.083 | 2.368 | 1.985 | 2.368 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.017 | 9.071 | 8.923 | 9.071 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.576 | 1.015 | 0.561 | 1.015 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.675 | 4.738 | 4.612 | 4.738 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.056 | 0.089 | 0.048 | 0.089 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.503 | 0.636 | 0.473 | 0.636 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 162.015 | 170.171 | 161.267 | 170.171 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1455.981 | 1600.085 | 1451.804 | 1600.085 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 158.474 | 161.407 | 152.928 | 161.407 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1457.262 | 1489.534 | 1442.765 | 1489.534 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.080 | 0.087 | 0.075 | 0.087 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.562 | 4.466 | 3.516 | 4.466 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.058 | 0.076 | 0.057 | 0.076 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.672 | 0.722 | 0.660 | 0.722 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.016 | 1.116 | 0.995 | 1.116 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 13.137 | 17.178 | 12.777 | 17.178 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.245 | 1.284 | 1.226 | 1.284 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.240 | 15.838 | 12.222 | 15.838 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.439 | 2.476 | 1.254 | 2.476 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 8.233 | 10.564 | 8.136 | 10.564 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.493 | 0.986 | 0.477 | 0.986 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.765 | 6.233 | 4.734 | 6.233 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.370 | 176.680 | 152.054 | 176.680 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1467.172 | 1536.738 | 1434.367 | 1536.738 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.099 | 0.158 | 0.092 | 0.158 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 1.953 | 2.027 | 1.925 | 2.027 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.031 | 0.035 | 0.031 | 0.035 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.417 | 0.437 | 0.416 | 0.437 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.191 | 1.309 | 1.171 | 1.309 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 5.092 | 5.710 | 4.854 | 5.710 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.186 | 0.233 | 0.181 | 0.233 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.706 | 2.781 | 2.654 | 2.781 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.806 | 166.463 | 152.477 | 166.463 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1454.961 | 1564.753 | 1440.495 | 1564.753 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.105 | 0.148 | 0.082 | 0.148 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 1.995 | 2.247 | 1.938 | 2.247 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.042 | 0.034 | 0.042 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.450 | 0.463 | 0.427 | 0.463 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 1.230 | 1.445 | 1.187 | 1.445 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 5.953 | 7.515 | 5.355 | 7.515 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.208 | 0.247 | 0.205 | 0.247 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 3.123 | 4.390 | 3.120 | 4.390 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.433 | 166.172 | 155.397 | 166.172 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1465.001 | 1583.532 | 1459.590 | 1583.532 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.127 | 0.217 | 0.125 | 0.217 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.728 | 3.854 | 3.655 | 3.854 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.056 | 0.077 | 0.055 | 0.077 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.766 | 0.796 | 0.766 | 0.796 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 3.736 | 4.109 | 3.451 | 4.109 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.591 | 8.781 | 8.582 | 8.781 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.227 | 0.575 | 0.225 | 0.575 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.757 | 4.854 | 4.732 | 4.854 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.986 | 159.167 | 155.907 | 159.167 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1461.801 | 1478.982 | 1450.202 | 1478.982 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.128 | 0.196 | 0.120 | 0.196 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.672 | 4.769 | 3.635 | 4.769 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.057 | 0.063 | 0.057 | 0.063 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.764 | 0.805 | 0.757 | 0.805 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 2.884 | 3.264 | 2.806 | 3.264 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.701 | 8.780 | 8.688 | 8.780 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.239 | 0.266 | 0.225 | 0.266 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.698 | 5.172 | 4.653 | 5.172 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.857 | 167.379 | 155.008 | 167.379 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1455.693 | 1603.773 | 1450.145 | 1603.773 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.155 | 0.230 | 0.133 | 0.230 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.697 | 4.064 | 3.666 | 4.064 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.063 | 0.170 | 0.057 | 0.170 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.788 | 0.800 | 0.781 | 0.800 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.108 | 3.663 | 3.107 | 3.663 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.781 | 9.678 | 8.503 | 9.678 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.225 | 0.254 | 0.222 | 0.254 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.750 | 5.072 | 4.737 | 5.072 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.178 | 171.369 | 154.026 | 171.369 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1458.717 | 1478.157 | 1455.401 | 1478.157 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.148 | 0.151 | 0.143 | 0.151 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.656 | 3.765 | 3.649 | 3.765 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.069 | 0.230 | 0.058 | 0.230 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.737 | 0.810 | 0.730 | 0.810 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 4.128 | 5.421 | 3.882 | 5.421 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.666 | 9.494 | 8.648 | 9.494 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.229 | 0.255 | 0.225 | 0.255 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.699 | 4.807 | 4.656 | 4.807 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.437 | 162.494 | 151.311 | 162.494 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1459.993 | 1488.190 | 1445.709 | 1488.190 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.169 | 0.479 | 0.154 | 0.479 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.452 | 3.597 | 3.317 | 3.597 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.056 | 0.076 | 0.055 | 0.076 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.568 | 0.652 | 0.549 | 0.652 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.720 | 3.154 | 1.503 | 3.154 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.780 | 8.807 | 7.750 | 8.807 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.236 | 0.257 | 0.236 | 0.257 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.694 | 5.554 | 4.609 | 5.554 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.996 | 155.514 | 152.143 | 155.514 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1447.516 | 1509.109 | 1442.107 | 1509.109 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.191 | 0.222 | 0.175 | 0.222 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.466 | 3.532 | 3.404 | 3.532 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.074 | 0.116 | 0.055 | 0.116 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.608 | 0.614 | 0.605 | 0.614 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.639 | 4.492 | 1.638 | 4.492 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.653 | 7.948 | 7.068 | 7.948 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.220 | 0.224 | 0.214 | 0.224 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.720 | 5.120 | 4.667 | 5.120 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.463 | 162.970 | 151.184 | 162.970 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1527.172 | 1608.275 | 1454.218 | 1608.275 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.177 | 0.191 | 0.168 | 0.191 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.480 | 3.982 | 3.429 | 3.982 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.070 | 0.109 | 0.069 | 0.109 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.634 | 0.758 | 0.613 | 0.758 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 1.684 | 4.779 | 1.665 | 4.779 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.949 | 9.481 | 7.185 | 9.481 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.235 | 0.284 | 0.229 | 0.284 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.731 | 5.982 | 4.651 | 5.982 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.346 | 169.327 | 155.926 | 169.327 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1456.763 | 1485.690 | 1444.983 | 1485.690 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.173 | 0.224 | 0.159 | 0.224 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.466 | 3.542 | 3.327 | 3.542 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.056 | 0.076 | 0.056 | 0.076 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.620 | 0.639 | 0.615 | 0.639 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.759 | 3.221 | 1.697 | 3.221 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.982 | 10.049 | 7.399 | 10.049 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.231 | 0.233 | 0.220 | 0.233 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.800 | 5.381 | 4.721 | 5.381 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.221 | 179.252 | 156.570 | 179.252 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1447.356 | 1489.570 | 1444.991 | 1489.570 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.156 | 0.172 | 0.155 | 0.172 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.516 | 3.622 | 3.431 | 3.622 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.072 | 0.078 | 0.070 | 0.078 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.627 | 0.655 | 0.619 | 0.655 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.115 | 4.924 | 1.796 | 4.924 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.925 | 8.539 | 7.255 | 8.539 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.225 | 0.353 | 0.220 | 0.353 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.786 | 5.126 | 4.720 | 5.126 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.779 | 171.365 | 152.188 | 171.365 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1457.437 | 1544.049 | 1453.943 | 1544.049 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.179 | 0.400 | 0.159 | 0.400 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.483 | 3.693 | 3.451 | 3.693 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.073 | 0.094 | 0.072 | 0.094 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.642 | 0.670 | 0.639 | 0.670 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 3.167 | 3.525 | 1.592 | 3.525 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 7.491 | 8.246 | 7.463 | 8.246 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.300 | 0.335 | 0.295 | 0.335 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.796 | 6.374 | 4.750 | 6.374 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.317 | 156.677 | 152.194 | 156.677 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1449.454 | 1483.412 | 1445.331 | 1483.412 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.129 | 0.185 | 0.121 | 0.185 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.014 | 3.483 | 1.955 | 3.483 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.046 | 0.221 | 0.042 | 0.221 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.409 | 0.785 | 0.386 | 0.785 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 1.517 | 2.013 | 1.507 | 2.013 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 6.171 | 6.991 | 5.678 | 6.991 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.194 | 0.327 | 0.190 | 0.327 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.076 | 4.077 | 3.046 | 4.077 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.386 | 159.999 | 151.479 | 159.999 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1476.237 | 1581.768 | 1460.017 | 1581.768 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.116 | 0.153 | 0.098 | 0.153 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.005 | 2.074 | 1.977 | 2.074 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.050 | 0.110 | 0.041 | 0.110 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.415 | 0.424 | 0.398 | 0.424 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 1.596 | 3.712 | 1.556 | 3.712 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 6.249 | 7.971 | 5.711 | 7.971 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.200 | 0.235 | 0.194 | 0.235 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.096 | 3.947 | 3.023 | 3.947 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 155.796 | 162.263 | 150.686 | 162.263 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1462.458 | 1534.072 | 1447.289 | 1534.072 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.110 | 0.127 | 0.102 | 0.127 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.855 | 1.936 | 1.851 | 1.936 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.047 | 0.065 | 0.041 | 0.065 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.329 | 0.331 | 0.321 | 0.331 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.597 | 0.749 | 0.536 | 0.749 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.861 | 2.984 | 2.822 | 2.984 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.164 | 0.176 | 0.157 | 0.176 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.630 | 2.696 | 2.624 | 2.696 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 155.921 | 170.928 | 152.186 | 170.928 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1456.357 | 1512.914 | 1451.528 | 1512.914 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.128 | 0.151 | 0.125 | 0.151 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.950 | 3.130 | 1.883 | 3.130 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.042 | 0.072 | 0.041 | 0.072 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.331 | 0.338 | 0.328 | 0.338 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.515 | 0.770 | 0.511 | 0.770 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.428 | 5.572 | 5.341 | 5.572 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.146 | 0.166 | 0.138 | 0.166 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.722 | 3.414 | 2.665 | 3.414 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 166.172 | 201.959 | 164.523 | 201.959 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1571.432 | 1629.706 | 1528.891 | 1629.706 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.934 | 164.133 | 156.720 | 164.133 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1533.736 | 1686.149 | 1517.822 | 1686.149 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.156 | 0.173 | 0.126 | 0.173 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.737 | 4.169 | 3.402 | 4.169 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.085 | 0.123 | 0.058 | 0.123 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.706 | 0.754 | 0.687 | 0.754 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.050 | 0.074 | 0.047 | 0.074 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.532 | 0.579 | 0.520 | 0.579 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.104 | 3.161 | 0.853 | 3.161 | 136.2 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 72.666 | 84.209 | 71.631 | 84.209 | 119.3 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 171.211 | 180.173 | 168.903 | 180.173 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1481.253 | 1518.781 | 1470.978 | 1518.781 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.255 | 172.343 | 158.806 | 172.343 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1478.566 | 1578.816 | 1463.198 | 1578.816 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.116 | 0.144 | 0.088 | 0.144 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.772 | 3.894 | 3.698 | 3.894 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.058 | 0.072 | 0.054 | 0.072 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.864 | 1.128 | 0.854 | 1.128 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.066 | 0.091 | 0.043 | 0.091 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.638 | 0.652 | 0.603 | 0.652 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 1.713 | 2.752 | 1.418 | 2.752 | 152.1 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 19.665 | 32.853 | 19.545 | 32.853 | 118.7 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `d2a974c150fb09fb54fb4b3aeac555247a1deb35` (dirty)
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
  - `effect-prophet/benchmark-effect:local`: `sha256:ecdbf1674372adc3d7d3f78ffa30dbabfe2d98d32f90ca17f5d424a05b4ada05`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:9209b9f8b7905d93190c45ac0caa73f28a714f9fa18d93ff3bd3a2777e81a8d7`

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

