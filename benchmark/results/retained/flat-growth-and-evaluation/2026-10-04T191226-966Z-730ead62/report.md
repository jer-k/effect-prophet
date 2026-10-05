# Effect Prophet benchmark — 2026-10-04T191226-966Z-730ead62

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| flat-mixed-components | equivalent-objective | passed | 2.361e-6 | 2.216e-5 | 5.865e-6 | 2.452e-5 | 7.913e-7 | Verified equivalent behavior for this configuration under evidence stage-f-flat-mixed-v1. |
| flat-mixed-components-large | equivalent-objective | passed | 1.999e-6 | 1.206e-5 | 7.490e-6 | 1.755e-5 | 2.089e-6 | Verified equivalent behavior for this configuration under evidence stage-f-flat-mixed-v1. |
| evaluation-linear-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.143e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.143e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.143e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.004e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.004e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-failure-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
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
| evaluation-linear-point | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall / exclude | n/a |
| evaluation-linear-intervals | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 64 | 19 / 0.8 | overall / exclude | n/a |
| evaluation-linear-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall / exclude | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 0 | 0 | n/a / n/a | horizons / exclude | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 0 | 128 | 19 / 0.8 | horizons / exclude | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 0 | 0 | n/a / n/a | horizons / exclude | 285e7251ecc2e6cb3c1ce6a3f2ff707fc782ff4df6b3a5086d8ce3fe1a856fc2, dbdeb05fe17bf42d396923238981fea7187dec239a32e6ab1c93dc665d0b0abe, 2d51500a53bf15ca176e6fdf576923588833aeac4bf90f5813df0b2730ce4b51 |
| evaluation-logistic-point | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | n/a |
| evaluation-logistic-intervals | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 256 | 19 / 0.8 | horizons / exclude | n/a |
| evaluation-logistic-search | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 2 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | ea6a5ef3fa66d70a4e00c996cfe9bc37217b3a0beb24a4ef92bc3f10f706c675, b06b02f1c576fa97c475d5837db49b1b93e6d43804b2cd8e2b6a95628977a5ae |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 0 | 0 | n/a / n/a | rolling / exclude | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 0 | 128 | 19 / 0.8 | rolling / exclude | n/a |
| evaluation-logistic-large-point | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 0 | n/a / n/a | rolling / exclude | n/a |
| evaluation-logistic-large-intervals | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 256 | 19 / 0.8 | rolling / exclude | n/a |
| evaluation-linear-failure-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 3 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93, 94447b1fe8ef74b557fb74394e1398e83dcd0e237d1ab301bac14978be162329 |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 8.482 | 10.404 | 7.235 | 10.404 | 154.7 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 48.535 | 51.577 | 48.370 | 51.577 | 118.7 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 185.571 | 195.801 | 183.951 | 195.801 | 153.4 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1486.175 | 1491.431 | 1476.900 | 1491.431 | 118.6 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 3.086 | 3.444 | 2.907 | 3.444 | 153.3 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.378 | 1.398 | 1.361 | 1.398 | 118.6 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.147 | 0.176 | 0.144 | 0.176 | 126.6 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.524 | 0.571 | 0.518 | 0.571 | 114.4 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.238 | 0.362 | 0.237 | 0.362 | 150.7 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.343 | 5.456 | 5.341 | 5.456 | 118.6 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.858 | 3.383 | 1.238 | 3.383 | 134.2 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.779 | 0.818 | 0.764 | 0.818 | 115.0 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.025 | 6.979 | 6.019 | 6.979 | 150.1 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 39.127 | 40.853 | 38.220 | 40.853 | 118.2 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 7.513 | 8.589 | 7.507 | 8.589 | 151.7 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 60.698 | 61.966 | 59.313 | 61.966 | 118.5 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 179.462 | 181.243 | 178.688 | 181.243 | 151.3 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1490.109 | 1524.809 | 1489.307 | 1524.809 | 118.6 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.638 | 1.796 | 1.165 | 1.796 | 151.2 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.490 | 1.602 | 1.468 | 1.602 | 118.6 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.081 | 0.180 | 0.062 | 0.180 | 127.8 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.450 | 0.489 | 0.446 | 0.489 | 114.4 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.232 | 0.382 | 0.229 | 0.382 | 150.6 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.427 | 5.699 | 5.331 | 5.699 | 118.6 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.515 | 1.850 | 1.185 | 1.850 | 133.1 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.822 | 0.938 | 0.808 | 0.938 | 115.1 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 6.519 | 7.593 | 5.617 | 7.593 | 150.4 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 46.311 | 47.604 | 45.791 | 47.604 | 118.1 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.090 | 2.560 | 2.081 | 2.560 | 154.6 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.346 | 13.546 | 13.276 | 13.546 | 118.5 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.210 | 0.226 | 0.199 | 0.226 | 156.6 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.006 | 0.008 | 0.005 | 0.008 | 118.5 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.212 | 0.246 | 0.204 | 0.246 | 155.6 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.012 | 0.009 | 0.012 | 118.5 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.604 | 15.301 | 12.348 | 15.301 | 150.0 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 145.619 | 171.161 | 142.778 | 171.161 | 118.5 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 5.762 | 6.342 | 5.631 | 6.342 | 158.1 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 30.825 | 32.103 | 30.524 | 32.103 | 118.4 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.200 | 0.235 | 0.190 | 0.235 | 158.9 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 118.4 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.224 | 0.254 | 0.223 | 0.254 | 158.3 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 118.4 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 20.958 | 29.119 | 18.957 | 29.119 | 155.6 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 154.274 | 160.095 | 153.262 | 160.095 | 118.4 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 9.219 | 10.754 | 8.997 | 10.754 | 143.8 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 78.198 | 78.560 | 77.524 | 78.560 | 118.3 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 179.664 | 187.390 | 179.335 | 187.390 | 153.3 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1509.939 | 1548.131 | 1509.198 | 1548.131 | 118.2 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.022 | 2.404 | 0.980 | 2.404 | 153.1 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.127 | 1.155 | 1.096 | 1.155 | 118.2 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.010 | 0.023 | 0.009 | 0.023 | 125.6 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.391 | 0.475 | 0.382 | 0.475 | 114.4 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.210 | 0.230 | 0.181 | 0.230 | 146.8 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.364 | 5.555 | 5.311 | 5.555 | 118.2 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.015 | 1.227 | 0.977 | 1.227 | 130.0 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.680 | 0.883 | 0.653 | 0.883 | 114.9 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 8.243 | 9.072 | 8.091 | 9.072 | 143.3 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 73.148 | 73.950 | 71.910 | 73.950 | 117.7 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 5.491 | 5.829 | 5.434 | 5.829 | 155.9 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 31.746 | 32.553 | 30.861 | 32.553 | 118.2 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.226 | 0.688 | 0.200 | 0.688 | 157.9 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 118.2 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.225 | 0.256 | 0.210 | 0.256 | 157.3 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 118.2 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 16.571 | 21.053 | 16.472 | 21.053 | 154.3 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 154.876 | 156.469 | 152.562 | 156.469 | 118.2 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 30.468 | 30.685 | 30.038 | 30.685 | 145.7 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 65.742 | 66.483 | 65.096 | 66.483 | 118.3 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 19.955 | 22.449 | 19.484 | 22.449 | 157.7 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 60.217 | 63.490 | 59.709 | 63.490 | 120.5 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 194.702 | 197.502 | 193.583 | 197.502 | 159.6 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1486.029 | 1498.445 | 1484.262 | 1498.445 | 118.3 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.057 | 2.160 | 2.049 | 2.160 | 159.6 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.339 | 1.359 | 1.300 | 1.359 | 118.3 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.039 | 0.053 | 0.037 | 0.053 | 126.5 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.472 | 0.641 | 0.443 | 0.641 | 114.4 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.247 | 0.302 | 0.243 | 0.302 | 159.6 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.453 | 5.603 | 5.429 | 5.603 | 118.3 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 2.144 | 2.461 | 1.990 | 2.461 | 132.5 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.716 | 0.790 | 0.705 | 0.790 | 115.0 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 15.845 | 19.219 | 15.823 | 19.219 | 158.8 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 42.488 | 47.096 | 42.417 | 47.096 | 117.8 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 201.732 | 209.386 | 197.534 | 209.386 | 151.2 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1504.496 | 1522.865 | 1496.985 | 1522.865 | 118.3 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.409 | 1.556 | 1.370 | 1.556 | 151.1 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.789 | 1.055 | 0.785 | 1.055 | 118.3 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.014 | 0.015 | 0.012 | 0.015 | 123.0 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.419 | 0.449 | 0.379 | 0.449 | 114.4 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.203 | 0.243 | 0.190 | 0.243 | 145.1 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.398 | 5.611 | 5.323 | 5.611 | 118.3 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 1.211 | 1.496 | 1.059 | 1.496 | 127.6 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.554 | 0.583 | 0.554 | 0.583 | 115.1 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 28.250 | 30.917 | 28.126 | 30.917 | 143.1 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 61.033 | 66.502 | 60.938 | 66.502 | 117.8 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 30.618 | 30.722 | 30.588 | 30.722 | 165.7 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 31.120 | 34.398 | 30.778 | 34.398 | 118.3 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.206 | 0.233 | 0.203 | 0.233 | 168.3 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 118.3 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.222 | 0.267 | 0.218 | 0.267 | 167.8 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.011 | 0.013 | 0.008 | 0.013 | 118.3 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 59.925 | 60.299 | 59.794 | 60.299 | 159.0 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 115.837 | 121.220 | 115.823 | 121.220 | 118.3 |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.242 | 161.348 | 151.848 | 161.348 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1444.275 | 1452.649 | 1438.889 | 1452.649 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.103 | 0.136 | 0.102 | 0.136 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.001 | 2.321 | 1.953 | 2.321 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.036 | 0.033 | 0.036 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.391 | 0.409 | 0.383 | 0.409 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.199 | 1.297 | 1.190 | 1.297 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.031 | 3.107 | 2.944 | 3.107 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.206 | 0.378 | 0.206 | 0.378 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.708 | 2.747 | 2.686 | 2.747 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.127 | 155.833 | 153.135 | 155.833 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1441.553 | 1454.323 | 1438.317 | 1454.323 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.108 | 0.215 | 0.089 | 0.215 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 1.938 | 1.998 | 1.898 | 1.998 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.039 | 0.034 | 0.039 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.395 | 0.407 | 0.388 | 0.407 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.120 | 1.182 | 1.073 | 1.182 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 2.932 | 3.077 | 2.918 | 3.077 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.217 | 0.261 | 0.212 | 0.261 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.688 | 2.749 | 2.657 | 2.749 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.046 | 163.366 | 158.189 | 163.366 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1444.546 | 1453.776 | 1438.555 | 1453.776 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.098 | 0.111 | 0.089 | 0.111 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 1.941 | 2.018 | 1.934 | 2.018 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.039 | 0.035 | 0.039 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.421 | 0.451 | 0.418 | 0.451 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.249 | 1.359 | 1.220 | 1.359 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 5.197 | 5.589 | 4.936 | 5.589 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.223 | 0.310 | 0.194 | 0.310 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.728 | 2.788 | 2.675 | 2.788 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.524 | 166.704 | 153.811 | 166.704 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1445.243 | 1460.425 | 1439.763 | 1460.425 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.114 | 0.224 | 0.108 | 0.224 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 1.993 | 2.164 | 1.916 | 2.164 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.037 | 0.042 | 0.036 | 0.042 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.419 | 0.435 | 0.411 | 0.435 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 1.129 | 1.156 | 1.120 | 1.156 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 4.903 | 7.361 | 4.903 | 7.361 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.230 | 0.236 | 0.199 | 0.236 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.740 | 2.924 | 2.686 | 2.924 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.936 | 174.772 | 156.350 | 174.772 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1452.060 | 1516.477 | 1448.879 | 1516.477 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.159 | 0.178 | 0.127 | 0.178 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.536 | 3.586 | 3.458 | 3.586 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.072 | 0.078 | 0.066 | 0.078 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.653 | 0.668 | 0.641 | 0.668 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 1.300 | 2.434 | 1.253 | 2.434 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.212 | 10.157 | 7.764 | 10.157 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.561 | 1.871 | 0.527 | 1.871 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.834 | 5.040 | 4.788 | 5.040 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.962 | 167.978 | 158.245 | 167.978 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1460.710 | 1467.019 | 1460.231 | 1467.019 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.125 | 0.212 | 0.116 | 0.212 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.840 | 4.008 | 3.827 | 4.008 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.052 | 0.078 | 0.048 | 0.078 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.810 | 0.841 | 0.809 | 0.841 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 3.407 | 3.624 | 3.337 | 3.624 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.347 | 9.745 | 9.103 | 9.745 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.567 | 0.590 | 0.556 | 0.590 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.884 | 4.992 | 4.847 | 4.992 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.042 | 0.074 | 0.041 | 0.074 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.660 | 0.687 | 0.652 | 0.687 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 170.361 | 176.260 | 166.730 | 176.260 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1464.921 | 1473.161 | 1460.470 | 1473.161 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 162.399 | 168.418 | 154.641 | 168.418 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1446.283 | 1464.211 | 1443.469 | 1464.211 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.082 | 0.099 | 0.074 | 0.099 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.723 | 3.784 | 3.693 | 3.784 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.057 | 0.060 | 0.052 | 0.060 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.813 | 0.846 | 0.800 | 0.846 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.773 | 2.647 | 1.761 | 2.647 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.544 | 15.609 | 14.507 | 15.609 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.145 | 2.869 | 1.999 | 2.869 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.855 | 14.617 | 13.771 | 14.617 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 1.914 | 2.005 | 1.911 | 2.005 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 8.888 | 9.544 | 8.885 | 9.544 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.554 | 0.931 | 0.530 | 0.931 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.780 | 4.829 | 4.770 | 4.829 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.061 | 0.066 | 0.060 | 0.066 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.546 | 0.562 | 0.541 | 0.562 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 160.661 | 176.211 | 158.067 | 176.211 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1452.086 | 1482.491 | 1445.065 | 1482.491 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 157.594 | 174.534 | 153.484 | 174.534 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1454.368 | 1479.225 | 1442.914 | 1479.225 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.078 | 0.094 | 0.075 | 0.094 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.571 | 3.737 | 3.484 | 3.737 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.053 | 0.063 | 0.052 | 0.063 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.647 | 0.671 | 0.642 | 0.671 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 0.942 | 1.037 | 0.903 | 1.037 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 12.990 | 13.275 | 12.857 | 13.275 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.271 | 1.303 | 1.207 | 1.303 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.147 | 12.916 | 12.076 | 12.916 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.363 | 1.641 | 1.291 | 1.641 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.488 | 7.888 | 7.442 | 7.888 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.463 | 0.481 | 0.452 | 0.481 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.771 | 5.583 | 4.769 | 5.583 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.143 | 164.138 | 152.091 | 164.138 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1449.904 | 1465.824 | 1446.728 | 1465.824 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.126 | 0.168 | 0.121 | 0.168 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 1.980 | 2.080 | 1.972 | 2.080 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.037 | 0.042 | 0.036 | 0.042 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.420 | 0.437 | 0.419 | 0.437 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.155 | 1.286 | 1.148 | 1.286 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 5.635 | 7.325 | 5.535 | 7.325 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.262 | 0.423 | 0.248 | 0.423 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.795 | 2.831 | 2.701 | 2.831 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.081 | 174.268 | 153.572 | 174.268 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1448.970 | 1466.595 | 1445.793 | 1466.595 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.104 | 0.162 | 0.090 | 0.162 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 1.998 | 2.236 | 1.987 | 2.236 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.039 | 0.034 | 0.039 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.423 | 0.434 | 0.423 | 0.434 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 1.125 | 1.165 | 1.099 | 1.165 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 4.895 | 5.432 | 4.857 | 5.432 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.231 | 0.396 | 0.221 | 0.396 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.748 | 2.805 | 2.680 | 2.805 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.098 | 168.178 | 159.518 | 168.178 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1482.087 | 1545.540 | 1453.288 | 1545.540 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.126 | 0.157 | 0.112 | 0.157 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.730 | 3.784 | 3.705 | 3.784 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.069 | 0.094 | 0.065 | 0.094 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.793 | 0.801 | 0.789 | 0.801 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.874 | 3.204 | 2.869 | 3.204 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.847 | 9.092 | 8.707 | 9.092 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.272 | 0.432 | 0.251 | 0.432 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.871 | 5.379 | 4.756 | 5.379 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.280 | 167.382 | 158.995 | 167.382 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1462.476 | 1477.566 | 1447.674 | 1477.566 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.117 | 0.145 | 0.106 | 0.145 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.682 | 3.981 | 3.646 | 3.981 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.076 | 1.875 | 0.047 | 1.875 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.799 | 1.126 | 0.780 | 1.126 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.284 | 3.543 | 2.797 | 3.543 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.855 | 8.969 | 8.640 | 8.969 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.369 | 0.765 | 0.246 | 0.765 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.763 | 4.935 | 4.715 | 4.935 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.735 | 169.495 | 156.908 | 169.495 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1455.920 | 1457.908 | 1447.842 | 1457.908 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.112 | 0.137 | 0.109 | 0.137 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.689 | 3.909 | 3.606 | 3.909 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.061 | 0.084 | 0.061 | 0.084 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.779 | 0.799 | 0.776 | 0.799 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.035 | 3.591 | 2.838 | 3.591 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.741 | 9.635 | 8.596 | 9.635 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.251 | 0.386 | 0.233 | 0.386 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.745 | 4.788 | 4.739 | 4.788 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.495 | 163.603 | 153.898 | 163.603 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1446.144 | 1466.709 | 1445.659 | 1466.709 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.115 | 0.178 | 0.104 | 0.178 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.733 | 4.163 | 3.694 | 4.163 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.068 | 0.151 | 0.047 | 0.151 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.796 | 0.828 | 0.780 | 0.828 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.132 | 3.391 | 2.863 | 3.391 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.932 | 16.131 | 8.850 | 16.131 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.240 | 0.311 | 0.237 | 0.311 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.783 | 5.227 | 4.735 | 5.227 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.077 | 164.125 | 155.785 | 164.125 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1451.752 | 1501.249 | 1446.335 | 1501.249 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.170 | 0.183 | 0.153 | 0.183 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.510 | 3.965 | 3.478 | 3.965 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.055 | 0.065 | 0.052 | 0.065 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.616 | 0.627 | 0.615 | 0.627 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.555 | 2.621 | 1.529 | 2.621 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.707 | 8.082 | 7.144 | 8.082 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.242 | 0.285 | 0.236 | 0.285 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.831 | 7.502 | 4.825 | 7.502 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.380 | 165.619 | 158.531 | 165.619 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1448.574 | 1463.872 | 1441.625 | 1463.872 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.152 | 0.362 | 0.140 | 0.362 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.504 | 3.562 | 3.444 | 3.562 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.059 | 0.065 | 0.055 | 0.065 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.617 | 0.646 | 0.616 | 0.646 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.664 | 4.304 | 1.377 | 4.304 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.525 | 8.341 | 7.234 | 8.341 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.208 | 0.227 | 0.206 | 0.227 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.722 | 4.792 | 4.650 | 4.792 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.741 | 168.657 | 155.246 | 168.657 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1456.903 | 1464.148 | 1456.014 | 1464.148 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.150 | 0.188 | 0.143 | 0.188 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.574 | 3.705 | 3.540 | 3.705 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.070 | 0.077 | 0.066 | 0.077 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.643 | 0.672 | 0.623 | 0.672 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 1.756 | 3.495 | 1.644 | 3.495 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.432 | 7.984 | 7.239 | 7.984 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.248 | 0.264 | 0.234 | 0.264 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.803 | 4.969 | 4.786 | 4.969 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.514 | 161.565 | 154.340 | 161.565 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1445.545 | 1468.365 | 1443.694 | 1468.365 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.161 | 0.192 | 0.151 | 0.192 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.448 | 3.559 | 3.423 | 3.559 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.075 | 0.077 | 0.073 | 0.077 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.616 | 0.650 | 0.613 | 0.650 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.726 | 3.994 | 1.216 | 3.994 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 8.305 | 9.641 | 7.543 | 9.641 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.248 | 0.262 | 0.240 | 0.262 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.706 | 4.766 | 4.674 | 4.766 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.916 | 158.670 | 154.200 | 158.670 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1448.686 | 1451.458 | 1446.843 | 1451.458 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.156 | 0.175 | 0.140 | 0.175 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.573 | 3.934 | 3.467 | 3.934 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.070 | 0.088 | 0.064 | 0.088 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.641 | 0.646 | 0.616 | 0.646 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 1.281 | 3.022 | 1.216 | 3.022 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.481 | 8.204 | 7.410 | 8.204 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.246 | 0.717 | 0.238 | 0.717 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.827 | 5.076 | 4.771 | 5.076 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.349 | 235.234 | 159.426 | 235.234 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1452.061 | 1459.458 | 1448.441 | 1459.458 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.170 | 0.234 | 0.164 | 0.234 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.660 | 3.936 | 3.623 | 3.936 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.084 | 0.098 | 0.066 | 0.098 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.647 | 0.661 | 0.643 | 0.661 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 3.106 | 3.514 | 1.942 | 3.514 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 8.147 | 9.497 | 7.768 | 9.497 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.309 | 0.344 | 0.284 | 0.344 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.935 | 5.744 | 4.830 | 5.744 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.378 | 178.816 | 149.897 | 178.816 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1442.369 | 1487.223 | 1435.423 | 1487.223 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.261 | 0.122 | 0.261 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.019 | 2.048 | 2.001 | 2.048 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.045 | 0.047 | 0.043 | 0.047 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.409 | 0.432 | 0.408 | 0.432 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 1.565 | 2.649 | 1.543 | 2.649 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 5.630 | 6.380 | 5.616 | 6.380 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.213 | 0.243 | 0.209 | 0.243 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.135 | 3.151 | 3.064 | 3.151 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.986 | 172.561 | 152.818 | 172.561 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1448.871 | 1470.103 | 1445.244 | 1470.103 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.154 | 0.127 | 0.154 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.019 | 2.202 | 1.951 | 2.202 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.051 | 0.081 | 0.044 | 0.081 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.420 | 0.442 | 0.411 | 0.442 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 1.588 | 1.939 | 1.522 | 1.939 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 5.904 | 8.682 | 5.594 | 8.682 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.232 | 0.243 | 0.228 | 0.243 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.114 | 3.147 | 3.037 | 3.147 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `730ead622275d37c6b7e0a3c863e82a7984de1b2` (dirty)
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `flat-mixed-components`, `flat-mixed-components-large`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `evaluation-linear-failure-search`, `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:cca4d379510a272c49e07c088b23c6b2c90a1368e53c9b66b99914f2203a2d3b`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:3525c4d03f5aa93b3edc0a134346e8ee16560438e52c86991eae072465885b00`

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

