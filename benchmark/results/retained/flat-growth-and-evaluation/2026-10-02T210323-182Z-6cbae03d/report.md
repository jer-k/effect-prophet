# Effect Prophet benchmark — 2026-10-02T210323-182Z-6cbae03d

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| flat-mixed-components | equivalent-objective | passed | 2.361e-6 | 2.216e-5 | 5.865e-6 | 2.452e-5 | 7.913e-7 | Verified equivalent behavior for this configuration under evidence stage-f-flat-mixed-v1. |
| flat-mixed-components-large | equivalent-objective | passed | 1.999e-6 | 1.206e-5 | 7.490e-6 | 1.755e-5 | 2.089e-6 | Verified equivalent behavior for this configuration under evidence stage-f-flat-mixed-v1. |
| evaluation-linear-point-stan-v2 | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.858e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-intervals-stan-v2 | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.858e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-search-stan-v2 | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.858e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.143e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.143e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.143e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.352e-4 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.352e-4 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.352e-4 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.004e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.004e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.805e-2 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.805e-2 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-failure-search-stan-v2 | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.858e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
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

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-linear-point-stan-v2 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall / exclude | n/a |
| evaluation-linear-intervals-stan-v2 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 64 | 19 / 0.8 | overall / exclude | n/a |
| evaluation-linear-search-stan-v2 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall / exclude | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
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
| evaluation-linear-failure-search-stan-v2 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 3 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93, 94447b1fe8ef74b557fb74394e1398e83dcd0e237d1ab301bac14978be162329 |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.790 | 8.122 | 7.679 | 8.122 | 155.9 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 49.065 | 83.544 | 48.729 | 83.544 | 118.6 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 192.540 | 193.986 | 191.140 | 193.986 | 155.4 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1543.434 | 1597.409 | 1498.258 | 1597.409 | 118.7 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.632 | 2.905 | 2.602 | 2.905 | 153.2 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.395 | 1.441 | 1.376 | 1.441 | 118.7 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.170 | 0.289 | 0.150 | 0.289 | 131.1 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.572 | 0.633 | 0.570 | 0.633 | 114.7 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.223 | 0.249 | 0.199 | 0.249 | 152.6 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.580 | 6.373 | 5.364 | 6.373 | 118.7 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.957 | 3.111 | 1.788 | 3.111 | 139.1 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.808 | 0.963 | 0.803 | 0.963 | 115.0 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.760 | 8.689 | 5.993 | 8.689 | 151.6 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 43.768 | 44.644 | 40.971 | 44.644 | 118.2 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 5.147 | 10.300 | 5.078 | 10.300 | 150.0 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 72.150 | 85.657 | 64.412 | 85.657 | 118.5 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 186.103 | 193.576 | 185.819 | 193.576 | 152.4 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1543.034 | 1569.937 | 1492.286 | 1569.937 | 118.5 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.239 | 1.352 | 1.182 | 1.352 | 152.3 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.472 | 1.641 | 1.426 | 1.641 | 118.5 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.034 | 0.048 | 0.033 | 0.048 | 129.8 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.437 | 0.500 | 0.405 | 0.500 | 114.7 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.291 | 0.430 | 0.237 | 0.430 | 152.3 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.314 | 6.374 | 5.253 | 6.374 | 118.5 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.532 | 1.736 | 1.381 | 1.736 | 134.4 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.816 | 0.840 | 0.801 | 0.840 | 115.0 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 4.845 | 7.608 | 4.614 | 7.608 | 151.4 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 50.890 | 52.565 | 49.576 | 52.565 | 118.1 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.529 | 4.715 | 2.439 | 4.715 | 175.3 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.179 | 15.558 | 13.134 | 15.558 | 118.4 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.213 | 0.239 | 0.211 | 0.239 | 194.0 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.007 | 0.004 | 0.007 | 118.4 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.357 | 0.371 | 0.356 | 0.371 | 188.2 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.014 | 0.009 | 0.014 | 118.4 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 13.955 | 15.707 | 13.467 | 15.707 | 155.5 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 154.120 | 167.075 | 142.016 | 167.075 | 118.4 |
| evaluation-linear-failure-search-stan-v2 | evaluation-holdout | effect-prophet | 4 | 6.190 | 6.579 | 6.181 | 6.579 | 161.1 |
| evaluation-linear-failure-search-stan-v2 | evaluation-holdout | python-prophet | 4 | 32.401 | 33.849 | 31.757 | 33.849 | 118.3 |
| evaluation-linear-failure-search-stan-v2 | evaluation-report-decode | effect-prophet | 4 | 0.337 | 1.014 | 0.268 | 1.014 | 177.9 |
| evaluation-linear-failure-search-stan-v2 | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 118.3 |
| evaluation-linear-failure-search-stan-v2 | evaluation-report-encode | effect-prophet | 4 | 0.294 | 0.328 | 0.279 | 0.328 | 162.0 |
| evaluation-linear-failure-search-stan-v2 | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.009 | 0.011 | 118.3 |
| evaluation-linear-failure-search-stan-v2 | evaluation-search | effect-prophet | 4 | 22.011 | 23.640 | 21.179 | 23.640 | 158.2 |
| evaluation-linear-failure-search-stan-v2 | evaluation-search | python-prophet | 4 | 161.389 | 171.979 | 161.088 | 171.979 | 118.3 |
| evaluation-linear-intervals-stan-v2 | evaluation-intervals | effect-prophet | 4 | 11.423 | 11.980 | 11.350 | 11.980 | 152.2 |
| evaluation-linear-intervals-stan-v2 | evaluation-intervals | python-prophet | 4 | 80.880 | 82.160 | 80.411 | 82.160 | 118.2 |
| evaluation-linear-point-stan-v2 | cold-first-evaluation | effect-prophet | 4 | 180.744 | 191.313 | 178.520 | 191.313 | 152.8 |
| evaluation-linear-point-stan-v2 | cold-first-evaluation | python-prophet | 4 | 1563.964 | 1576.120 | 1561.023 | 1576.120 | 118.2 |
| evaluation-linear-point-stan-v2 | evaluation-baseline | effect-prophet | 4 | 1.188 | 1.847 | 1.183 | 1.847 | 152.8 |
| evaluation-linear-point-stan-v2 | evaluation-baseline | python-prophet | 4 | 1.148 | 1.170 | 1.144 | 1.170 | 118.2 |
| evaluation-linear-point-stan-v2 | evaluation-input-conversion | effect-prophet | 4 | 0.008 | 0.011 | 0.006 | 0.011 | 130.5 |
| evaluation-linear-point-stan-v2 | evaluation-input-conversion | python-prophet | 4 | 0.434 | 0.474 | 0.417 | 0.474 | 114.7 |
| evaluation-linear-point-stan-v2 | evaluation-metrics | effect-prophet | 4 | 0.163 | 0.179 | 0.154 | 0.179 | 152.8 |
| evaluation-linear-point-stan-v2 | evaluation-metrics | python-prophet | 4 | 5.631 | 5.790 | 5.606 | 5.790 | 118.2 |
| evaluation-linear-point-stan-v2 | evaluation-plan | effect-prophet | 4 | 1.255 | 1.706 | 1.231 | 1.706 | 134.7 |
| evaluation-linear-point-stan-v2 | evaluation-plan | python-prophet | 4 | 0.668 | 0.716 | 0.658 | 0.716 | 114.9 |
| evaluation-linear-point-stan-v2 | evaluation-point | effect-prophet | 4 | 8.789 | 12.064 | 8.686 | 12.064 | 152.8 |
| evaluation-linear-point-stan-v2 | evaluation-point | python-prophet | 4 | 76.514 | 79.603 | 73.711 | 79.603 | 117.7 |
| evaluation-linear-search-stan-v2 | evaluation-holdout | effect-prophet | 4 | 6.236 | 6.471 | 6.201 | 6.471 | 157.3 |
| evaluation-linear-search-stan-v2 | evaluation-holdout | python-prophet | 4 | 32.084 | 34.844 | 31.758 | 34.844 | 118.2 |
| evaluation-linear-search-stan-v2 | evaluation-report-decode | effect-prophet | 4 | 0.246 | 0.331 | 0.229 | 0.331 | 159.6 |
| evaluation-linear-search-stan-v2 | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.006 | 0.004 | 0.006 | 118.2 |
| evaluation-linear-search-stan-v2 | evaluation-report-encode | effect-prophet | 4 | 0.283 | 0.327 | 0.265 | 0.327 | 158.3 |
| evaluation-linear-search-stan-v2 | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.013 | 0.009 | 0.013 | 118.2 |
| evaluation-linear-search-stan-v2 | evaluation-search | effect-prophet | 4 | 19.596 | 20.766 | 19.470 | 20.766 | 156.6 |
| evaluation-linear-search-stan-v2 | evaluation-search | python-prophet | 4 | 152.284 | 161.079 | 150.996 | 161.079 | 118.2 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 4.622 | 6.111 | 4.379 | 6.111 | 145.4 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 24.199 | 25.643 | 23.086 | 25.643 | 118.3 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 12.851 | 13.274 | 12.280 | 13.274 | 154.5 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 62.433 | 69.145 | 62.125 | 69.145 | 120.8 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 191.728 | 198.924 | 186.588 | 198.924 | 157.6 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1498.564 | 1547.857 | 1488.995 | 1547.857 | 118.2 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.409 | 2.878 | 2.363 | 2.878 | 157.6 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.346 | 1.524 | 1.316 | 1.524 | 118.2 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.041 | 0.068 | 0.026 | 0.068 | 131.9 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.516 | 0.651 | 0.465 | 0.651 | 114.7 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.224 | 0.706 | 0.217 | 0.706 | 155.2 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.437 | 5.649 | 5.416 | 5.649 | 118.2 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.777 | 2.206 | 1.759 | 2.206 | 139.6 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.756 | 0.806 | 0.719 | 0.806 | 115.0 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 11.726 | 12.348 | 11.572 | 12.348 | 154.4 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 44.690 | 51.464 | 41.733 | 51.464 | 117.7 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 182.908 | 184.532 | 182.810 | 184.532 | 151.1 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1510.680 | 1564.272 | 1490.412 | 1564.272 | 118.1 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.161 | 1.343 | 1.161 | 1.343 | 151.1 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.786 | 0.828 | 0.769 | 0.828 | 118.1 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.010 | 0.013 | 0.008 | 0.013 | 131.7 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.410 | 0.481 | 0.396 | 0.481 | 114.7 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.174 | 0.195 | 0.173 | 0.195 | 151.1 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.473 | 5.735 | 5.417 | 5.735 | 118.1 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 1.117 | 1.346 | 1.055 | 1.346 | 134.6 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.568 | 0.597 | 0.545 | 0.597 | 114.9 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 4.506 | 5.947 | 3.708 | 5.947 | 149.5 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 18.198 | 19.818 | 17.681 | 19.818 | 117.6 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 3.256 | 3.970 | 3.165 | 3.970 | 153.3 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 12.073 | 13.520 | 10.655 | 13.520 | 118.3 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.257 | 0.311 | 0.244 | 0.311 | 156.7 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.029 | 0.004 | 0.029 | 118.3 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.269 | 0.277 | 0.261 | 0.277 | 153.7 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.011 | 0.012 | 0.009 | 0.012 | 118.3 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 8.454 | 11.239 | 8.294 | 11.239 | 152.3 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 41.316 | 52.678 | 40.446 | 52.678 | 118.3 |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.359 | 162.597 | 161.072 | 162.597 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1470.404 | 1513.298 | 1467.902 | 1513.298 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.132 | 1.728 | 0.126 | 1.728 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.099 | 2.380 | 2.027 | 2.380 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.057 | 0.073 | 0.040 | 0.073 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.387 | 0.566 | 0.386 | 0.566 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.268 | 1.339 | 1.249 | 1.339 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.245 | 3.845 | 3.026 | 3.845 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.289 | 0.305 | 0.265 | 0.305 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 3.028 | 3.731 | 2.917 | 3.731 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.107 | 174.629 | 159.871 | 174.629 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1476.196 | 1498.394 | 1411.196 | 1498.394 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.090 | 0.110 | 0.088 | 0.110 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.029 | 2.280 | 1.968 | 2.280 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.047 | 0.054 | 0.039 | 0.054 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.411 | 0.450 | 0.399 | 0.450 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.231 | 1.258 | 1.227 | 1.258 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.077 | 3.245 | 3.072 | 3.245 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.290 | 0.329 | 0.257 | 0.329 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.806 | 2.907 | 2.752 | 2.907 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.421 | 165.509 | 157.861 | 165.509 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1490.099 | 1548.030 | 1478.170 | 1548.030 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.107 | 0.130 | 0.103 | 0.130 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.012 | 2.174 | 1.985 | 2.174 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.054 | 0.066 | 0.053 | 0.066 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.446 | 0.467 | 0.421 | 0.467 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.245 | 1.554 | 1.225 | 1.554 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 5.770 | 6.475 | 5.310 | 6.475 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.301 | 0.420 | 0.254 | 0.420 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.818 | 2.920 | 2.755 | 2.920 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.360 | 165.934 | 157.698 | 165.934 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1458.353 | 1482.910 | 1440.469 | 1482.910 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.130 | 1.547 | 0.116 | 1.547 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.014 | 2.410 | 1.903 | 2.410 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.050 | 0.060 | 0.038 | 0.060 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.411 | 0.441 | 0.394 | 0.441 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 1.352 | 1.477 | 1.350 | 1.477 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 5.123 | 5.738 | 4.775 | 5.738 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.279 | 0.328 | 0.255 | 0.328 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.697 | 2.791 | 2.682 | 2.791 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.700 | 185.680 | 161.758 | 185.680 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1484.347 | 1510.730 | 1463.465 | 1510.730 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.146 | 0.325 | 0.125 | 0.325 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.709 | 3.766 | 3.652 | 3.766 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.078 | 0.737 | 0.059 | 0.737 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.680 | 0.697 | 0.680 | 0.697 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 1.905 | 2.522 | 1.624 | 2.522 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.137 | 8.451 | 7.740 | 8.451 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.641 | 3.064 | 0.437 | 3.064 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.991 | 5.226 | 4.968 | 5.226 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.668 | 168.687 | 162.564 | 168.687 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1539.492 | 1829.929 | 1498.785 | 1829.929 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.122 | 0.158 | 0.120 | 0.158 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.912 | 4.145 | 3.795 | 4.145 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.088 | 0.146 | 0.062 | 0.146 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.844 | 1.041 | 0.833 | 1.041 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 2.091 | 4.528 | 1.904 | 4.528 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 10.452 | 13.106 | 9.911 | 13.106 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.573 | 0.583 | 0.571 | 0.583 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 5.482 | 5.783 | 5.207 | 5.783 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.094 | 0.129 | 0.084 | 0.129 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.654 | 0.707 | 0.649 | 0.707 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 173.700 | 188.741 | 171.732 | 188.741 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1527.681 | 1562.476 | 1525.851 | 1562.476 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 162.710 | 172.634 | 157.114 | 172.634 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1474.142 | 1516.002 | 1469.321 | 1516.002 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.108 | 0.163 | 0.094 | 0.163 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 4.151 | 4.211 | 3.993 | 4.211 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.062 | 0.080 | 0.054 | 0.080 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.834 | 1.095 | 0.823 | 1.095 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.849 | 1.958 | 1.751 | 1.958 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 15.326 | 15.887 | 15.221 | 15.887 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.096 | 2.575 | 2.012 | 2.575 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 14.755 | 15.700 | 14.483 | 15.700 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 1.827 | 1.940 | 1.820 | 1.940 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.677 | 9.983 | 9.623 | 9.983 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.573 | 0.611 | 0.572 | 0.611 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 5.183 | 5.252 | 5.118 | 5.252 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.062 | 0.132 | 0.044 | 0.132 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.552 | 0.597 | 0.543 | 0.597 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 164.257 | 173.650 | 163.750 | 173.650 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1503.408 | 1564.563 | 1491.002 | 1564.563 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 165.264 | 173.928 | 164.886 | 173.928 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1526.733 | 1536.599 | 1516.717 | 1536.599 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.098 | 0.132 | 0.084 | 0.132 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.661 | 3.834 | 3.513 | 3.834 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.072 | 0.094 | 0.062 | 0.094 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.674 | 0.691 | 0.654 | 0.691 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.129 | 1.312 | 0.987 | 1.312 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 14.021 | 14.941 | 13.547 | 14.941 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.213 | 1.478 | 1.179 | 1.478 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 13.455 | 14.993 | 13.440 | 14.993 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.878 | 6.008 | 1.756 | 6.008 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 8.339 | 10.695 | 8.039 | 10.695 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.336 | 1.237 | 0.311 | 1.237 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.868 | 5.567 | 4.861 | 5.567 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.959 | 166.441 | 159.253 | 166.441 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1484.004 | 1518.466 | 1451.562 | 1518.466 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.107 | 0.118 | 0.086 | 0.118 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 1.968 | 2.158 | 1.873 | 2.158 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.046 | 0.086 | 0.041 | 0.086 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.422 | 0.442 | 0.386 | 0.442 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.255 | 1.392 | 1.223 | 1.392 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 5.190 | 6.069 | 4.828 | 6.069 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.313 | 0.620 | 0.295 | 0.620 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.702 | 2.858 | 2.692 | 2.858 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.606 | 164.594 | 162.238 | 164.594 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1471.894 | 1521.607 | 1416.575 | 1521.607 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.105 | 1.672 | 0.102 | 1.672 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 1.941 | 1.992 | 1.883 | 1.992 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.061 | 0.089 | 0.052 | 0.089 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.412 | 0.794 | 0.408 | 0.794 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 1.425 | 2.148 | 1.374 | 2.148 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 5.652 | 6.676 | 5.251 | 6.676 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.278 | 0.315 | 0.266 | 0.315 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.774 | 2.902 | 2.738 | 2.902 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.017 | 167.569 | 160.377 | 167.569 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1463.401 | 1494.724 | 1453.142 | 1494.724 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.146 | 0.167 | 0.141 | 0.167 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.701 | 4.027 | 3.678 | 4.027 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.083 | 0.288 | 0.063 | 0.288 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.786 | 0.827 | 0.782 | 0.827 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.257 | 4.636 | 1.941 | 4.636 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.552 | 9.214 | 8.546 | 9.214 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.231 | 0.235 | 0.226 | 0.235 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.859 | 5.767 | 4.723 | 5.767 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 172.731 | 179.443 | 161.787 | 179.443 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1461.786 | 1503.272 | 1426.615 | 1503.272 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.233 | 0.268 | 0.185 | 0.268 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.635 | 3.699 | 3.603 | 3.699 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.086 | 0.218 | 0.059 | 0.218 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.802 | 0.816 | 0.785 | 0.816 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 2.070 | 5.780 | 1.871 | 5.780 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.516 | 8.701 | 8.401 | 8.701 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.229 | 0.239 | 0.209 | 0.239 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.743 | 4.955 | 4.721 | 4.955 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.697 | 170.306 | 163.815 | 170.306 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1505.964 | 1538.877 | 1497.018 | 1538.877 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.131 | 0.185 | 0.128 | 0.185 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.683 | 4.595 | 3.643 | 4.595 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.075 | 0.130 | 0.061 | 0.130 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.775 | 0.792 | 0.774 | 0.792 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.830 | 4.779 | 2.086 | 4.779 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.759 | 9.432 | 8.523 | 9.432 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.241 | 0.262 | 0.235 | 0.262 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.707 | 4.909 | 4.653 | 4.909 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 165.956 | 167.855 | 163.005 | 167.855 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1458.867 | 1604.320 | 1421.200 | 1604.320 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.153 | 0.246 | 0.152 | 0.246 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.850 | 4.025 | 3.684 | 4.025 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.144 | 0.625 | 0.130 | 0.625 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.785 | 0.896 | 0.776 | 0.896 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 2.396 | 4.567 | 2.016 | 4.567 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 9.707 | 12.386 | 9.367 | 12.386 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.231 | 0.234 | 0.222 | 0.234 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.998 | 5.451 | 4.980 | 5.451 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.625 | 162.800 | 160.688 | 162.800 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1492.656 | 1536.329 | 1460.688 | 1536.329 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.244 | 0.125 | 0.244 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.565 | 3.758 | 3.545 | 3.758 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.088 | 0.103 | 0.078 | 0.103 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.654 | 0.699 | 0.633 | 0.699 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.639 | 1.690 | 1.467 | 1.690 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.825 | 8.592 | 7.758 | 8.592 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.299 | 0.323 | 0.286 | 0.323 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 5.054 | 5.106 | 5.003 | 5.106 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.660 | 162.420 | 160.063 | 162.420 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1490.177 | 1536.142 | 1464.400 | 1536.142 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.145 | 0.179 | 0.144 | 0.179 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.550 | 4.228 | 3.541 | 4.228 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.087 | 0.097 | 0.077 | 0.097 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.654 | 0.688 | 0.650 | 0.688 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.684 | 1.829 | 1.542 | 1.829 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 8.358 | 9.532 | 7.939 | 9.532 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.291 | 0.301 | 0.284 | 0.301 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.979 | 5.711 | 4.886 | 5.711 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.890 | 166.737 | 164.884 | 166.737 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1497.785 | 1542.317 | 1442.410 | 1542.317 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.196 | 0.326 | 0.169 | 0.326 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.770 | 4.010 | 3.664 | 4.010 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.083 | 0.098 | 0.075 | 0.098 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.664 | 0.676 | 0.629 | 0.676 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 1.778 | 4.057 | 1.647 | 4.057 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 8.048 | 8.682 | 7.835 | 8.682 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.326 | 0.342 | 0.321 | 0.342 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 5.003 | 5.168 | 4.963 | 5.168 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.043 | 165.421 | 160.707 | 165.421 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1488.028 | 1550.627 | 1473.470 | 1550.627 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.165 | 0.313 | 0.154 | 0.313 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.526 | 3.657 | 3.415 | 3.657 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.102 | 2.680 | 0.094 | 2.680 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.601 | 0.680 | 0.600 | 0.680 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.867 | 1.970 | 1.622 | 1.970 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.718 | 8.592 | 7.200 | 8.592 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.326 | 0.610 | 0.316 | 0.610 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.777 | 5.082 | 4.701 | 5.082 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.013 | 167.936 | 164.287 | 167.936 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1483.400 | 1505.239 | 1463.571 | 1505.239 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.129 | 0.155 | 0.122 | 0.155 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.653 | 3.788 | 3.540 | 3.788 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.058 | 0.081 | 0.054 | 0.081 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.643 | 0.657 | 0.627 | 0.657 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 1.735 | 2.187 | 1.657 | 2.187 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 8.185 | 9.137 | 7.668 | 9.137 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.317 | 0.330 | 0.291 | 0.330 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.945 | 5.726 | 4.937 | 5.726 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.415 | 164.143 | 159.182 | 164.143 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1484.897 | 1494.551 | 1479.551 | 1494.551 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.158 | 0.366 | 0.132 | 0.366 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.702 | 3.796 | 3.681 | 3.796 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.067 | 0.086 | 0.061 | 0.086 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.666 | 0.675 | 0.666 | 0.675 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 1.859 | 2.058 | 1.856 | 2.058 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 8.119 | 8.966 | 7.840 | 8.966 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.383 | 1.052 | 0.372 | 1.052 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.839 | 5.490 | 4.831 | 5.490 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.753 | 163.855 | 158.967 | 163.855 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1483.532 | 1522.309 | 1466.253 | 1522.309 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.123 | 0.127 | 0.110 | 0.127 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.130 | 2.611 | 2.096 | 2.611 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.056 | 0.062 | 0.049 | 0.062 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.449 | 0.490 | 0.444 | 0.490 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 1.703 | 2.635 | 1.678 | 2.635 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 6.028 | 6.761 | 5.854 | 6.761 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.292 | 0.318 | 0.269 | 0.318 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.340 | 3.502 | 3.265 | 3.502 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.373 | 164.741 | 156.580 | 164.741 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1490.304 | 1497.972 | 1441.273 | 1497.972 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.124 | 0.140 | 0.121 | 0.140 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.076 | 2.161 | 2.042 | 2.161 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.043 | 0.049 | 0.041 | 0.049 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.419 | 0.464 | 0.389 | 0.464 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 1.761 | 2.059 | 1.714 | 2.059 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 6.520 | 6.683 | 6.210 | 6.683 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.316 | 0.445 | 0.296 | 0.445 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.252 | 3.340 | 3.238 | 3.340 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `6cbae03dc72a263bd0e77a8360a762643b4a7a37` (dirty)
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`, `flat-mixed-components`, `flat-mixed-components-large`, `evaluation-linear-point-stan-v2`, `evaluation-linear-intervals-stan-v2`, `evaluation-linear-search-stan-v2`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `evaluation-linear-failure-search-stan-v2`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:bd93b1c50611bae40c5b04e4855897c02e3a4854a63fde7116f834bbae7fde97`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:9b59915b58c6d99ecb9825fb5706f52fbf60ef0f3af5a872114e7a6e88d23208`

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
- Resources: `input-numeric-dtype=float64`, `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

