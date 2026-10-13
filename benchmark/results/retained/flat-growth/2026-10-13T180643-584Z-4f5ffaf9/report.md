# Effect Prophet benchmark — 2026-10-13T180643-584Z-4f5ffaf9

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| map-training-zero-span-flat-varied | equivalent-objective | passed | 8.557e-5 | 0.000e+0 | 0.000e+0 | 8.557e-5 | 3.338e-4 | n/a | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-zero-span-flat-constant | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| flat-mixed-components | equivalent-objective | passed | 1.109e-7 | 1.288e-7 | 7.557e-9 | 2.325e-7 | 7.427e-10 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-flat-mixed-v1. |
| flat-mixed-components-large | equivalent-objective | passed | 1.352e-7 | 2.761e-7 | 8.043e-9 | 4.023e-7 | 6.678e-10 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-flat-mixed-v1. |
| uncertainty-flat-defaults-seasonal-intervals-1000 | scalar-process-different-public-work | passed | 2.455e-7 | 9.364e-6 | 9.364e-6 | 9.610e-6 | 9.184e-6 | 0.116 | Verified fitted point behavior under flat-growth-reduced-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| uncertainty-flat-mixed-components-full-intervals-512 | scalar-process-different-public-work | passed | 1.109e-7 | 1.288e-7 | 7.557e-9 | 2.325e-7 | 7.427e-10 | 0.009 | Verified fitted point behavior under stage-f-flat-mixed-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| uncertainty-flat-mixed-components-large-full-samples-128 | scalar-process-different-public-work | passed | 1.352e-7 | 2.761e-7 | 8.043e-9 | 4.023e-7 | 6.678e-10 | 0.020 | Verified fitted point behavior under stage-f-flat-mixed-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| evaluation-flat-mixed-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.443e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.443e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| flat-defaults-level | equivalent-objective | passed | 5.964e-10 | 4.657e-9 | 4.657e-9 | 4.060e-9 | 2.457e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-defaults-seasonal | equivalent-objective | passed | 2.455e-7 | 9.364e-6 | 9.364e-6 | 9.610e-6 | 9.184e-6 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-defaults-negative | equivalent-objective | passed | 6.543e-10 | 4.920e-9 | 4.920e-9 | 5.574e-9 | 2.537e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-level-absmax | equivalent-objective | passed | 4.101e-7 | 0.000e+0 | 0.000e+0 | 4.101e-7 | 2.133e-6 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-level-minmax | equivalent-objective | passed | 1.074e-7 | 0.000e+0 | 0.000e+0 | 1.074e-7 | 2.383e-7 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-constant-absmax | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-constant-minmax | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-negative-absmax | equivalent-objective | passed | 4.136e-7 | 0.000e+0 | 0.000e+0 | 4.136e-7 | 2.139e-6 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-negative-minmax | equivalent-objective | passed | 1.074e-7 | 0.000e+0 | 0.000e+0 | 1.074e-7 | 2.383e-7 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-seasonal-absmax | equivalent-objective | passed | 1.353e-6 | 1.901e-6 | 1.901e-6 | 2.605e-6 | 1.436e-6 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-seasonal-minmax | equivalent-objective | passed | 1.722e-6 | 8.017e-7 | 8.017e-7 | 2.314e-6 | 4.467e-7 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-prefix-63-absmax | equivalent-objective | passed | 1.033e-7 | 1.759e-7 | 2.228e-9 | 2.814e-7 | 1.099e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-63-minmax | equivalent-objective | passed | 9.243e-8 | 1.060e-7 | 7.808e-9 | 1.984e-7 | 7.599e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-70-absmax | equivalent-objective | passed | 1.001e-7 | 9.089e-8 | 1.490e-8 | 1.910e-7 | 2.273e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-70-minmax | equivalent-objective | passed | 1.371e-7 | 2.747e-7 | 9.563e-9 | 4.118e-7 | 8.990e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-77-absmax | equivalent-objective | passed | 5.870e-8 | 1.429e-7 | 4.952e-9 | 2.016e-7 | 1.694e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-77-minmax | equivalent-objective | passed | 6.030e-7 | 3.591e-6 | 9.913e-7 | 4.194e-6 | 4.136e-8 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-mixed-components-absmax | equivalent-objective | passed | 1.107e-7 | 1.063e-7 | 3.381e-9 | 2.130e-7 | 2.445e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-225-absmax | equivalent-objective | passed | 1.627e-7 | 8.952e-8 | 1.230e-9 | 2.443e-7 | 9.075e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-225-minmax | equivalent-objective | passed | 7.836e-8 | 1.453e-7 | 1.366e-8 | 2.178e-7 | 2.623e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-232-absmax | equivalent-objective | passed | 4.856e-8 | 9.183e-8 | 2.272e-9 | 1.188e-7 | 1.399e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-232-minmax | equivalent-objective | passed | 1.377e-7 | 1.074e-7 | 8.664e-9 | 2.382e-7 | 3.139e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-mixed-components-large-absmax | equivalent-objective | passed | 8.224e-8 | 1.116e-7 | 8.190e-9 | 1.939e-7 | 2.145e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-additive-components | equivalent-objective | passed | 1.522e-7 | 2.677e-6 | 2.677e-6 | 2.829e-6 | 1.240e-6 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-flat-additive-v1. |
| flat-additive-components-large | equivalent-objective | passed | 1.133e-11 | 1.275e-11 | 1.398e-11 | 2.300e-11 | 9.389e-14 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-flat-additive-v1. |
| flat-mixed-components-absmax-defaults | equivalent-objective | passed | 6.167e-7 | 4.071e-7 | 1.962e-7 | 1.024e-6 | 1.211e-5 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-flat-mixed-v1. |
| flat-correlated-regressors | equivalent-objective | passed | 2.265e-11 | 2.941e-12 | 4.493e-12 | 2.714e-11 | 3.431e-13 | n/a | Verified equivalent behavior for this configuration under evidence stage-f-flat-additive-v1. |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-flat-defaults-seasonal-intervals-1000 | 96 | 6 | 0 | 120 | 24 | 24 | 1000 | intervals | 67108864 | flat-seasonal-v1:n=96:h=24:level=35:bounded-noise=true / 801786aaae3b93349addcc9eca44eff79cb6f5640dce099ddd19082a85636e2a | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-full-intervals-512 | 96 | 6 | 0 | 24 | 24 | 24 | 512 | intervals | 67108864 | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-large-full-samples-128 | 256 | 6 | 0 | 64 | 64 | 64 | 128 | samples | 67108864 | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | docs/validation/uncertainty.md#evidence-classes |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 0 | 0 | n/a / n/a | horizons / exclude | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 0 | 128 | 19 / 0.8 | horizons / exclude | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 0 | 0 | n/a / n/a | horizons / exclude | d80326b5f66ac7d8cf75cd914579246fe78193f53083e68b4ae38d5d36c1b282, a8011ef8c87fa2f4e0f95f3e07a97905d63e72799c6762c6062f9682ba422b4f, d3513d5f9a69954556378d229fd923c6381fe817fb5d4e92e31bde7b48564999 |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 0 | 0 | n/a / n/a | rolling / exclude | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 0 | 128 | 19 / 0.8 | rolling / exclude | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.389 | 9.798 | 6.845 | 9.798 | 149.7 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 47.627 | 47.867 | 47.258 | 47.867 | 118.6 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 172.776 | 178.435 | 172.655 | 178.435 | 157.7 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1447.877 | 1450.200 | 1444.177 | 1450.200 | 118.8 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.610 | 3.437 | 2.600 | 3.437 | 154.9 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.367 | 1.403 | 1.366 | 1.403 | 118.8 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.139 | 0.152 | 0.129 | 0.152 | 127.7 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.510 | 0.531 | 0.482 | 0.531 | 117.5 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.231 | 0.389 | 0.230 | 0.389 | 151.7 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.353 | 5.473 | 5.285 | 5.473 | 118.8 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.523 | 1.929 | 1.511 | 1.929 | 135.4 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.775 | 0.783 | 0.751 | 0.783 | 117.5 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.066 | 6.700 | 5.552 | 6.700 | 150.0 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 37.831 | 38.212 | 37.820 | 38.212 | 118.2 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 6.822 | 8.712 | 6.756 | 8.712 | 152.0 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 59.906 | 61.418 | 58.880 | 61.418 | 118.4 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 172.098 | 175.218 | 170.455 | 175.218 | 151.6 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1454.940 | 1467.250 | 1451.354 | 1467.250 | 118.5 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.215 | 1.599 | 1.200 | 1.599 | 151.5 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.461 | 1.480 | 1.447 | 1.480 | 118.5 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.056 | 0.068 | 0.055 | 0.068 | 127.3 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.411 | 0.458 | 0.388 | 0.458 | 117.5 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.232 | 0.309 | 0.218 | 0.309 | 151.0 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.290 | 5.363 | 5.269 | 5.363 | 118.5 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.361 | 1.605 | 1.294 | 1.605 | 132.8 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.782 | 0.826 | 0.774 | 0.826 | 117.5 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 5.957 | 7.125 | 5.692 | 7.125 | 150.6 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 45.707 | 46.034 | 44.585 | 46.034 | 118.1 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.252 | 2.768 | 1.912 | 2.768 | 160.8 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 12.894 | 13.022 | 12.818 | 13.022 | 118.5 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.229 | 0.250 | 0.228 | 0.250 | 162.9 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.005 | 0.006 | 118.5 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.224 | 0.242 | 0.218 | 0.242 | 161.6 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.009 | 0.011 | 118.5 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 13.570 | 16.564 | 13.477 | 16.564 | 154.9 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 143.852 | 157.049 | 141.203 | 157.049 | 118.5 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.071 | 0.078 | 0.068 | 0.078 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.645 | 0.676 | 0.641 | 0.676 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 164.674 | 169.581 | 163.249 | 169.581 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1421.829 | 1429.355 | 1420.954 | 1429.355 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 155.998 | 161.603 | 155.918 | 161.603 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1419.973 | 1423.033 | 1412.214 | 1423.033 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.100 | 0.120 | 0.098 | 0.120 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.684 | 3.763 | 3.666 | 3.763 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.085 | 0.135 | 0.066 | 0.135 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.780 | 0.845 | 0.776 | 0.845 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.926 | 2.558 | 1.882 | 2.558 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.083 | 14.109 | 14.068 | 14.109 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.124 | 3.411 | 2.085 | 3.411 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 13.393 | 13.595 | 13.308 | 13.595 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.221 | 3.057 | 2.168 | 3.057 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 8.738 | 8.982 | 8.668 | 8.982 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.662 | 1.121 | 0.589 | 1.121 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.708 | 4.737 | 4.695 | 4.737 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.057 | 0.067 | 0.041 | 0.067 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.528 | 0.567 | 0.518 | 0.567 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 170.142 | 172.936 | 168.703 | 172.936 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1423.947 | 1427.149 | 1422.046 | 1427.149 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 156.566 | 157.657 | 155.578 | 157.657 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1415.913 | 1435.363 | 1415.118 | 1435.363 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.102 | 0.122 | 0.099 | 0.122 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.423 | 3.543 | 3.417 | 3.543 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.059 | 0.082 | 0.055 | 0.082 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.647 | 0.661 | 0.641 | 0.661 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.749 | 3.921 | 3.694 | 3.921 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 17.991 | 18.316 | 17.892 | 18.316 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 3.972 | 4.427 | 3.909 | 4.427 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 17.615 | 17.838 | 17.552 | 17.838 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 4.208 | 4.555 | 4.081 | 4.555 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 13.122 | 13.251 | 12.817 | 13.251 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.465 | 0.503 | 0.454 | 0.503 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.593 | 4.694 | 4.593 | 4.694 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.216 | 155.843 | 152.028 | 155.843 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1411.877 | 1419.373 | 1406.345 | 1419.373 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.128 | 0.131 | 0.116 | 0.131 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 1.901 | 1.960 | 1.892 | 1.960 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.042 | 0.033 | 0.042 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.391 | 0.405 | 0.386 | 0.405 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.206 | 2.265 | 1.149 | 2.265 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 2.886 | 3.011 | 2.861 | 3.011 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.183 | 0.223 | 0.182 | 0.223 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.641 | 2.668 | 2.621 | 2.668 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.822 | 153.725 | 151.031 | 153.725 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1411.537 | 1418.827 | 1408.794 | 1418.827 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.112 | 0.135 | 0.108 | 0.135 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 1.918 | 2.077 | 1.883 | 2.077 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.043 | 0.035 | 0.043 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.393 | 0.409 | 0.380 | 0.409 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.136 | 3.036 | 1.121 | 3.036 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 2.932 | 3.062 | 2.881 | 3.062 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.185 | 0.198 | 0.179 | 0.198 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.685 | 2.724 | 2.674 | 2.724 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.110 | 0.152 | 0.095 | 0.152 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.907 | 0.968 | 0.900 | 0.968 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 179.346 | 182.512 | 175.298 | 182.512 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1438.353 | 1454.904 | 1437.083 | 1454.904 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 161.737 | 165.480 | 161.601 | 165.480 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1417.364 | 1418.003 | 1416.887 | 1418.003 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.101 | 0.109 | 0.098 | 0.109 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.432 | 3.493 | 3.416 | 3.493 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.050 | 0.089 | 0.050 | 0.089 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.171 | 1.188 | 1.159 | 1.188 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 6.346 | 7.833 | 6.020 | 7.833 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 30.470 | 30.499 | 30.173 | 30.499 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 5.285 | 8.545 | 5.042 | 8.545 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 29.215 | 29.313 | 29.169 | 29.313 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 4.648 | 5.288 | 4.638 | 5.288 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 24.702 | 24.768 | 24.612 | 24.768 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.975 | 0.986 | 0.966 | 0.986 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.401 | 4.503 | 4.377 | 4.503 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.018 | 0.013 | 0.018 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.473 | 0.500 | 0.460 | 0.500 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 156.373 | 164.280 | 155.375 | 164.280 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1419.446 | 1430.574 | 1417.549 | 1430.574 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 151.357 | 153.289 | 149.780 | 153.289 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1416.391 | 1428.695 | 1412.024 | 1428.695 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.057 | 0.099 | 0.054 | 0.099 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.109 | 2.243 | 2.103 | 2.243 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.045 | 0.059 | 0.034 | 0.059 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.420 | 0.487 | 0.410 | 0.487 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.214 | 1.446 | 1.186 | 1.446 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.425 | 12.628 | 12.219 | 12.628 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.627 | 1.715 | 1.585 | 1.715 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 11.612 | 11.733 | 11.441 | 11.733 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.639 | 3.849 | 1.320 | 3.849 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 8.718 | 9.651 | 8.487 | 9.651 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.241 | 0.316 | 0.198 | 0.316 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.050 | 3.118 | 3.029 | 3.118 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.017 | 0.014 | 0.017 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.468 | 0.500 | 0.460 | 0.500 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 156.596 | 159.469 | 153.663 | 159.469 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1419.315 | 1422.987 | 1413.612 | 1422.987 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 150.858 | 152.708 | 149.993 | 152.708 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1411.880 | 1425.255 | 1408.754 | 1425.255 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.056 | 0.092 | 0.052 | 0.092 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.105 | 2.202 | 2.078 | 2.202 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.043 | 0.054 | 0.034 | 0.054 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.442 | 0.475 | 0.405 | 0.475 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.213 | 1.450 | 1.206 | 1.450 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.376 | 12.551 | 12.318 | 12.551 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.616 | 1.710 | 1.558 | 1.710 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 11.783 | 11.995 | 11.468 | 11.995 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.489 | 3.221 | 1.424 | 3.221 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 8.573 | 9.416 | 8.475 | 9.416 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.231 | 0.258 | 0.218 | 0.258 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.008 | 3.082 | 2.990 | 3.082 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.021 | 0.013 | 0.021 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.462 | 0.495 | 0.443 | 0.495 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 155.750 | 159.131 | 154.641 | 159.131 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1804.068 | 1816.151 | 1794.181 | 1816.151 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 151.401 | 155.330 | 150.575 | 155.330 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1416.203 | 1429.362 | 1415.105 | 1429.362 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.057 | 0.088 | 0.052 | 0.088 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.134 | 2.254 | 2.080 | 2.254 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.038 | 0.057 | 0.034 | 0.057 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.436 | 0.469 | 0.431 | 0.469 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.211 | 1.417 | 1.179 | 1.417 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 391.948 | 398.719 | 388.426 | 398.719 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 1.652 | 1.735 | 1.561 | 1.735 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 391.323 | 399.572 | 388.316 | 399.572 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 1.497 | 5.380 | 1.406 | 5.380 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 390.247 | 396.841 | 387.389 | 396.841 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.217 | 0.302 | 0.198 | 0.302 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.090 | 3.240 | 3.014 | 3.240 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 150.338 | 159.118 | 150.287 | 159.118 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1411.112 | 1415.393 | 1407.364 | 1415.393 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.131 | 0.201 | 0.114 | 0.201 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 1.933 | 1.972 | 1.906 | 1.972 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.043 | 0.030 | 0.043 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.417 | 0.433 | 0.407 | 0.433 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.192 | 2.699 | 1.154 | 2.699 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 4.755 | 5.239 | 4.689 | 5.239 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.182 | 0.194 | 0.179 | 0.194 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.684 | 2.755 | 2.640 | 2.755 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.316 | 156.117 | 150.778 | 156.117 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1413.170 | 1423.227 | 1409.917 | 1423.227 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.126 | 0.182 | 0.110 | 0.182 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 1.956 | 2.029 | 1.935 | 2.029 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.033 | 0.038 | 0.031 | 0.038 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.421 | 0.446 | 0.420 | 0.446 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 1.237 | 1.372 | 1.148 | 1.372 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 4.875 | 5.280 | 4.818 | 5.280 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.193 | 0.203 | 0.183 | 0.203 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.689 | 2.733 | 2.632 | 2.733 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.046 | 0.069 | 0.044 | 0.069 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.540 | 0.560 | 0.533 | 0.560 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 171.372 | 172.884 | 170.990 | 172.884 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1427.870 | 1432.977 | 1426.537 | 1432.977 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 155.055 | 158.223 | 154.843 | 158.223 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1419.759 | 1428.218 | 1416.937 | 1428.218 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.105 | 0.123 | 0.104 | 0.123 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.443 | 3.596 | 3.401 | 3.596 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.055 | 0.080 | 0.055 | 0.080 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.634 | 0.667 | 0.612 | 0.667 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.817 | 5.915 | 5.719 | 5.915 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 20.063 | 20.252 | 20.011 | 20.252 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 6.108 | 6.166 | 6.046 | 6.166 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 19.289 | 19.863 | 19.039 | 19.863 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 6.250 | 6.757 | 6.233 | 6.757 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 14.860 | 15.223 | 14.495 | 15.223 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.468 | 0.479 | 0.458 | 0.479 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.698 | 4.727 | 4.697 | 4.727 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.507 | 167.165 | 157.695 | 167.165 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1413.952 | 1423.206 | 1410.824 | 1423.206 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.170 | 0.256 | 0.124 | 0.256 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.583 | 3.690 | 3.459 | 3.690 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.073 | 0.079 | 0.066 | 0.079 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.664 | 0.679 | 0.654 | 0.679 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 1.244 | 1.735 | 1.239 | 1.735 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 7.727 | 8.435 | 7.411 | 8.435 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.494 | 0.542 | 0.489 | 0.542 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.796 | 5.158 | 4.782 | 5.158 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.252 | 160.511 | 157.012 | 160.511 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1419.633 | 1423.574 | 1416.050 | 1423.574 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.132 | 0.145 | 0.129 | 0.145 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.692 | 3.758 | 3.690 | 3.758 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.056 | 0.061 | 0.050 | 0.061 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.799 | 0.823 | 0.796 | 0.823 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 3.635 | 4.304 | 3.418 | 4.304 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 8.750 | 8.877 | 8.734 | 8.877 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.559 | 0.616 | 0.522 | 0.616 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.714 | 4.767 | 4.708 | 4.767 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.075 | 0.082 | 0.063 | 0.082 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.640 | 0.686 | 0.634 | 0.686 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 164.335 | 166.664 | 163.822 | 166.664 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1425.818 | 1435.262 | 1422.089 | 1435.262 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 157.034 | 158.864 | 154.811 | 158.864 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1421.408 | 1445.069 | 1418.604 | 1445.069 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.090 | 0.110 | 0.088 | 0.110 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.682 | 3.803 | 3.680 | 3.803 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.058 | 0.070 | 0.057 | 0.070 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.805 | 0.812 | 0.800 | 0.812 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.957 | 1.967 | 1.955 | 1.967 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.238 | 14.363 | 14.167 | 14.363 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.190 | 3.418 | 2.141 | 3.418 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.692 | 14.128 | 13.582 | 14.128 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.161 | 2.242 | 2.090 | 2.242 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 8.895 | 9.107 | 8.776 | 9.107 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.624 | 1.068 | 0.553 | 1.068 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.752 | 5.068 | 4.704 | 5.068 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.056 | 0.069 | 0.041 | 0.069 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.537 | 0.566 | 0.524 | 0.566 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 158.897 | 164.553 | 158.834 | 164.553 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1423.705 | 1448.419 | 1422.419 | 1448.419 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 153.669 | 157.042 | 153.534 | 157.042 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1421.273 | 1425.964 | 1418.922 | 1425.964 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.112 | 0.128 | 0.105 | 0.128 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.471 | 3.547 | 3.449 | 3.547 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.055 | 0.079 | 0.052 | 0.079 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.652 | 0.677 | 0.631 | 0.677 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.080 | 1.116 | 1.056 | 1.116 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 12.597 | 14.155 | 12.527 | 14.155 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.354 | 1.754 | 1.278 | 1.754 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.204 | 12.347 | 12.169 | 12.347 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.699 | 2.002 | 1.551 | 2.002 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.369 | 7.471 | 7.305 | 7.471 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.435 | 0.465 | 0.431 | 0.465 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.747 | 4.966 | 4.663 | 4.966 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.027 | 153.660 | 151.530 | 153.660 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1408.581 | 1431.920 | 1407.060 | 1431.920 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.130 | 0.169 | 0.127 | 0.169 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 1.926 | 1.975 | 1.910 | 1.975 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.038 | 0.044 | 0.030 | 0.044 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.421 | 0.436 | 0.410 | 0.436 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.192 | 2.399 | 1.181 | 2.399 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 4.927 | 5.263 | 4.780 | 5.263 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.192 | 0.196 | 0.185 | 0.196 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.655 | 2.766 | 2.640 | 2.766 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.936 | 157.234 | 151.141 | 157.234 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1416.431 | 1424.607 | 1411.514 | 1424.607 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.102 | 0.130 | 0.093 | 0.130 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 1.950 | 2.000 | 1.928 | 2.000 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.038 | 0.050 | 0.033 | 0.050 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.416 | 0.427 | 0.409 | 0.427 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 1.175 | 3.125 | 1.142 | 3.125 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 4.775 | 5.503 | 4.741 | 5.503 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.187 | 0.202 | 0.185 | 0.202 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.736 | 2.754 | 2.717 | 2.754 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.980 | 155.901 | 152.995 | 155.901 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1410.723 | 1419.577 | 1409.464 | 1419.577 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.132 | 0.171 | 0.128 | 0.171 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.680 | 4.236 | 3.653 | 4.236 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.061 | 0.082 | 0.058 | 0.082 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.767 | 0.805 | 0.766 | 0.805 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 3.187 | 3.424 | 2.898 | 3.424 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.545 | 8.682 | 8.475 | 8.682 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.269 | 0.406 | 0.255 | 0.406 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.747 | 4.817 | 4.738 | 4.817 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.380 | 159.189 | 151.501 | 159.189 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1414.367 | 1419.373 | 1409.219 | 1419.373 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.127 | 0.152 | 0.116 | 0.152 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.684 | 3.724 | 3.679 | 3.724 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.061 | 0.067 | 0.051 | 0.067 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.792 | 0.809 | 0.775 | 0.809 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.204 | 4.127 | 3.043 | 4.127 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.600 | 8.804 | 8.546 | 8.804 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.265 | 0.275 | 0.258 | 0.275 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.726 | 4.766 | 4.726 | 4.766 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.663 | 159.093 | 155.304 | 159.093 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1418.026 | 1422.049 | 1417.514 | 1422.049 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.160 | 0.140 | 0.160 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.712 | 3.748 | 3.628 | 3.748 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.057 | 0.080 | 0.053 | 0.080 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.790 | 0.823 | 0.776 | 0.823 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 2.985 | 3.303 | 2.964 | 3.303 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.575 | 8.773 | 8.563 | 8.773 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.248 | 0.810 | 0.234 | 0.810 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.711 | 4.786 | 4.677 | 4.786 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.734 | 162.598 | 158.002 | 162.598 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1412.902 | 1423.150 | 1410.282 | 1423.150 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.165 | 0.128 | 0.165 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.705 | 3.951 | 3.682 | 3.951 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.054 | 0.069 | 0.051 | 0.069 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.783 | 0.795 | 0.777 | 0.795 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.263 | 3.371 | 3.032 | 3.371 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.594 | 8.738 | 8.540 | 8.738 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.261 | 0.702 | 0.231 | 0.702 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.720 | 4.786 | 4.673 | 4.786 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.848 | 155.540 | 151.333 | 155.540 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1413.711 | 1422.184 | 1409.384 | 1422.184 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.163 | 0.207 | 0.149 | 0.207 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.386 | 3.504 | 3.380 | 3.504 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.062 | 0.074 | 0.061 | 0.074 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.610 | 0.632 | 0.609 | 0.632 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.430 | 4.170 | 1.330 | 4.170 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 6.977 | 7.731 | 6.912 | 7.731 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.259 | 0.269 | 0.252 | 0.269 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.676 | 4.729 | 4.653 | 4.729 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 150.931 | 153.997 | 150.212 | 153.997 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1420.033 | 1423.919 | 1416.392 | 1423.919 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.157 | 0.183 | 0.149 | 0.183 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.515 | 3.585 | 3.424 | 3.585 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.066 | 0.070 | 0.065 | 0.070 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.624 | 0.629 | 0.598 | 0.629 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.243 | 3.088 | 1.204 | 3.088 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.206 | 8.634 | 7.094 | 8.634 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.273 | 0.331 | 0.269 | 0.331 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.732 | 4.980 | 4.708 | 4.980 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.463 | 156.254 | 151.798 | 156.254 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1418.242 | 1432.889 | 1418.105 | 1432.889 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.187 | 0.201 | 0.166 | 0.201 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.461 | 3.552 | 3.384 | 3.552 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.065 | 0.076 | 0.063 | 0.076 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.603 | 0.636 | 0.603 | 0.636 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 1.149 | 3.619 | 1.146 | 3.619 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.261 | 7.981 | 7.220 | 7.981 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.247 | 0.259 | 0.247 | 0.259 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.820 | 4.847 | 4.755 | 4.847 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.678 | 154.630 | 153.486 | 154.630 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1418.587 | 1423.423 | 1412.290 | 1423.423 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.165 | 0.185 | 0.156 | 0.185 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.427 | 3.502 | 3.404 | 3.502 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.069 | 0.084 | 0.062 | 0.084 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.619 | 0.645 | 0.619 | 0.645 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.139 | 3.663 | 1.115 | 3.663 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.297 | 7.970 | 7.164 | 7.970 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.258 | 0.292 | 0.239 | 0.292 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.738 | 5.535 | 4.702 | 5.535 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.726 | 155.952 | 153.916 | 155.952 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1413.579 | 1419.005 | 1409.958 | 1419.005 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.178 | 0.190 | 0.158 | 0.190 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.435 | 3.545 | 3.387 | 3.545 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.076 | 0.081 | 0.075 | 0.081 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.622 | 0.652 | 0.581 | 0.652 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 1.192 | 3.402 | 1.192 | 3.402 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.222 | 8.043 | 7.206 | 8.043 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.339 | 0.441 | 0.317 | 0.441 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.723 | 5.196 | 4.678 | 5.196 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.220 | 156.735 | 151.175 | 156.735 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1419.601 | 1428.240 | 1416.928 | 1428.240 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.167 | 0.259 | 0.163 | 0.259 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.444 | 3.693 | 3.390 | 3.693 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.073 | 0.083 | 0.067 | 0.083 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.596 | 0.638 | 0.590 | 0.638 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.035 | 3.890 | 1.283 | 3.890 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 7.400 | 8.306 | 7.341 | 8.306 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.369 | 0.415 | 0.333 | 0.415 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.808 | 4.924 | 4.790 | 4.924 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.220 | 155.129 | 152.008 | 155.129 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1415.337 | 1443.288 | 1412.997 | 1443.288 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.124 | 0.148 | 0.111 | 0.148 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 1.998 | 2.045 | 1.982 | 2.045 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.043 | 0.045 | 0.036 | 0.045 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.424 | 0.444 | 0.416 | 0.444 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 1.605 | 3.610 | 1.581 | 3.610 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 5.630 | 6.021 | 5.491 | 6.021 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.214 | 0.239 | 0.205 | 0.239 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.032 | 3.123 | 3.018 | 3.123 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.325 | 153.929 | 150.665 | 153.929 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1414.247 | 1421.039 | 1413.530 | 1421.039 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.115 | 0.138 | 0.106 | 0.138 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.002 | 2.084 | 1.970 | 2.084 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.041 | 0.056 | 0.037 | 0.056 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.421 | 0.441 | 0.421 | 0.441 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 1.668 | 3.064 | 1.651 | 3.064 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 5.560 | 6.005 | 5.448 | 6.005 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.209 | 0.215 | 0.199 | 0.215 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.062 | 3.096 | 2.992 | 3.096 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 149.270 | 153.036 | 148.938 | 153.036 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1420.431 | 1433.438 | 1415.452 | 1433.438 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.121 | 0.239 | 0.117 | 0.239 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.914 | 1.961 | 1.856 | 1.961 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.048 | 0.056 | 0.041 | 0.056 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.340 | 0.347 | 0.330 | 0.347 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.477 | 0.497 | 0.467 | 0.497 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.907 | 3.067 | 2.846 | 3.067 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.141 | 0.308 | 0.137 | 0.308 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.658 | 2.765 | 2.614 | 2.765 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 148.672 | 151.317 | 147.234 | 151.317 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1413.778 | 1434.172 | 1409.693 | 1434.172 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.131 | 0.136 | 0.119 | 0.136 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.898 | 1.959 | 1.891 | 1.959 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.037 | 0.055 | 0.037 | 0.055 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.328 | 0.352 | 0.328 | 0.352 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.502 | 0.530 | 0.492 | 0.530 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.301 | 5.349 | 5.300 | 5.349 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.134 | 0.172 | 0.130 | 0.172 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.675 | 2.749 | 2.659 | 2.749 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 163.157 | 165.391 | 162.091 | 165.391 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1937.981 | 1945.877 | 1930.336 | 1945.877 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 164.679 | 171.252 | 159.993 | 171.252 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1548.804 | 1551.069 | 1545.141 | 1551.069 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.130 | 0.157 | 0.111 | 0.157 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.174 | 2.263 | 2.133 | 2.263 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.051 | 0.063 | 0.042 | 0.063 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.446 | 0.466 | 0.410 | 0.466 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.030 | 0.040 | 0.027 | 0.040 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.491 | 0.520 | 0.472 | 0.520 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.421 | 4.581 | 4.388 | 4.581 | 138.2 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 122.793 | 135.206 | 119.560 | 135.206 | 121.5 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 162.663 | 168.891 | 158.806 | 168.891 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1498.304 | 1505.951 | 1495.563 | 1505.951 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.491 | 159.510 | 156.300 | 159.510 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1499.403 | 1510.778 | 1491.498 | 1510.778 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.173 | 0.198 | 0.154 | 0.198 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.460 | 3.612 | 3.426 | 3.612 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.079 | 0.104 | 0.071 | 0.104 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.657 | 0.672 | 0.638 | 0.672 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.047 | 0.071 | 0.038 | 0.071 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.530 | 0.572 | 0.519 | 0.572 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.918 | 1.231 | 0.858 | 1.231 | 138.5 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 70.550 | 71.823 | 70.166 | 71.823 | 119.5 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 164.432 | 166.663 | 160.650 | 166.663 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1438.259 | 1439.786 | 1432.500 | 1439.786 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.776 | 160.297 | 156.558 | 160.297 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1434.555 | 1449.653 | 1428.368 | 1449.653 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.127 | 0.174 | 0.110 | 0.174 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.750 | 3.818 | 3.680 | 3.818 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.051 | 0.085 | 0.047 | 0.085 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.805 | 0.830 | 0.803 | 0.830 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.069 | 0.077 | 0.042 | 0.077 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.649 | 0.670 | 0.637 | 0.670 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 1.339 | 2.572 | 0.921 | 2.572 | 149.9 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 19.825 | 32.752 | 19.589 | 32.752 | 118.8 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `4f5ffaf996e4159ada941b6d0d6d3e4e2b1f1ba5`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `map-training-zero-span-flat-varied`, `map-training-zero-span-flat-constant`, `flat-mixed-components`, `flat-mixed-components-large`, `uncertainty-flat-defaults-seasonal-intervals-1000`, `uncertainty-flat-mixed-components-full-intervals-512`, `uncertainty-flat-mixed-components-large-full-samples-128`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `flat-defaults-level`, `flat-defaults-seasonal`, `flat-defaults-negative`, `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`, `flat-additive-components`, `flat-additive-components-large`, `flat-mixed-components-absmax-defaults`, `flat-correlated-regressors`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:51ab5e440765ab69603e6c4e39bc1600d05b2f4c02478795aa57d310c8a475af`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:9ecbb1d6fc43605464860e35230c82ee75838d3406c020a0d4d381327304cdb5`

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

