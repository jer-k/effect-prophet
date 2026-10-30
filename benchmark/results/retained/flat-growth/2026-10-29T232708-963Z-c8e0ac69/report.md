# Effect Prophet benchmark — 2026-10-29T232708-963Z-c8e0ac69

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| country-us-flat-additive | equivalent-objective | passed | 2.198e-6 | 8.204e-5 | 1.540e-4 | 1.518e-4 | 3.051e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-us-flat-additive | equivalent-objective | passed | 2.198e-6 | 8.204e-5 | 1.540e-4 | 1.518e-4 | 3.051e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-us-flat-multiplicative | equivalent-objective | passed | 1.068e-11 | 3.645e-10 | 0.000e+0 | 3.538e-10 | 3.253e-12 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-us-flat-multiplicative | equivalent-objective | passed | 1.068e-11 | 3.645e-10 | 0.000e+0 | 3.538e-10 | 3.253e-12 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-boundary-flat | equivalent-objective | passed | 4.071e-12 | 9.293e-12 | 9.293e-12 | 5.222e-12 | 8.532e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-empty-bv-flat | equivalent-objective | passed | 1.135e-11 | 0.000e+0 | 0.000e+0 | 1.135e-11 | 1.614e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-empty-flat | equivalent-objective | passed | 1.135e-11 | 0.000e+0 | 0.000e+0 | 1.135e-11 | 1.614e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-estimated-sg-flat | equivalent-objective | passed | 3.691e-12 | 1.789e-11 | 1.789e-11 | 1.420e-11 | 1.016e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-partial-in-flat | equivalent-objective | passed | 2.956e-12 | 2.062e-13 | 2.062e-13 | 3.162e-12 | 8.658e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-mixed-us-flat | equivalent-objective | passed | 1.351e-6 | 2.695e-5 | 3.165e-5 | 3.047e-5 | 7.054e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-none-flat-730 | equivalent-objective | passed | 3.062e-12 | 0.000e+0 | 0.000e+0 | 3.062e-12 | 8.921e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-se-flat-730 | equivalent-objective | passed | 1.933e-12 | 1.069e-11 | 1.069e-11 | 1.263e-11 | 9.048e-15 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-se-flat-730 | equivalent-objective | passed | 1.933e-12 | 1.069e-11 | 1.069e-11 | 1.263e-11 | 9.048e-15 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-cn-flat-730 | equivalent-objective | passed | 2.309e-12 | 6.989e-12 | 6.989e-12 | 4.682e-12 | 5.806e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-cn-flat-730 | equivalent-objective | passed | 2.309e-12 | 6.989e-12 | 6.989e-12 | 4.682e-12 | 5.806e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-none-flat-2190 | equivalent-objective | passed | 4.146e-12 | 0.000e+0 | 0.000e+0 | 4.146e-12 | 7.427e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-se-flat-2190 | equivalent-objective | passed | 9.604e-11 | 4.352e-10 | 4.146e-10 | 5.106e-10 | 4.594e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-se-flat-2190 | equivalent-objective | passed | 9.604e-11 | 4.352e-10 | 4.146e-10 | 5.106e-10 | 4.594e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-cn-flat-2190 | equivalent-objective | passed | 1.345e-6 | 2.604e-4 | 2.604e-4 | 2.618e-4 | 7.266e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-cn-flat-2190 | equivalent-objective | passed | 1.345e-6 | 2.604e-4 | 2.604e-4 | 2.618e-4 | 7.266e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-none-flat-2190-batch-32 | equivalent-objective | passed | 4.146e-12 | 0.000e+0 | 0.000e+0 | 4.146e-12 | 7.427e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-se-flat-2190-batch-32 | equivalent-objective | passed | 9.604e-11 | 3.817e-10 | 3.817e-10 | 4.778e-10 | 4.594e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-se-flat-2190-batch-32 | equivalent-objective | passed | 9.604e-11 | 3.817e-10 | 3.817e-10 | 4.778e-10 | 4.594e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-uncertainty-us-flat | scalar-process-different-public-work | passed | 2.198e-6 | 8.204e-5 | 1.540e-4 | 1.518e-4 | 3.051e-5 | 0.091 | Verified fitted point behavior under country-calendar-public-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| map-training-zero-span-flat-varied | equivalent-objective | passed | 2.942e-4 | 0.000e+0 | 0.000e+0 | 2.942e-4 | 9.174e-4 | n/a | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-zero-span-flat-constant | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| flat-mixed-components | equivalent-objective | passed | 1.109e-7 | 1.290e-7 | 7.644e-9 | 2.322e-7 | 7.402e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-mixed-v1. |
| flat-mixed-components-large | equivalent-objective | passed | 1.352e-7 | 2.799e-7 | 7.200e-9 | 3.987e-7 | 2.050e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-mixed-v1. |
| uncertainty-flat-defaults-seasonal-intervals-1000 | scalar-process-different-public-work | passed | 9.024e-13 | 1.051e-10 | 1.051e-10 | 1.060e-10 | 7.260e-13 | 0.116 | Verified fitted point behavior under flat-growth-reduced-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| uncertainty-flat-mixed-components-full-intervals-512 | scalar-process-different-public-work | passed | 1.109e-7 | 1.290e-7 | 7.644e-9 | 2.322e-7 | 7.402e-10 | 0.008 | Verified fitted point behavior under flat-map-mixed-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| uncertainty-flat-mixed-components-large-full-samples-128 | scalar-process-different-public-work | passed | 1.352e-7 | 2.799e-7 | 7.200e-9 | 3.987e-7 | 2.050e-10 | 0.021 | Verified fitted point behavior under flat-map-mixed-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| anomalies-flat-defaults-99 | scalar-process-different-public-work | passed | 5.002e-12 | 1.683e-12 | 1.683e-12 | 6.601e-12 | 1.265e-12 | 0.608 | Verified fitted point behavior under flat-growth-reduced-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Both libraries flagged all 3 injected outliers. Effect flagged at most 3 rows and Python 3; 0 were flagged by only one library, each between the two libraries' bounds. |
| warm-start-flat-defaults-7-new-rows | equivalent-objective | passed | 8.739e-7 | 4.699e-6 | 4.699e-6 | 5.573e-6 | 6.025e-7 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. Each library refit from its own fit of the first 89 rows; their starting parameters differed by at most 4.34e-13 in scaled units. |
| evaluation-flat-mixed-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.443e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.443e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-months-metrics | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 4.099e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed, and Effect's built-in and custom metrics on Python's own CV rows equal performance_metrics exactly in both horizon units; public evaluation/metric work differs. Absolute times only. |
| flat-defaults-level | equivalent-objective | passed | 1.218e-11 | 3.152e-15 | 3.152e-15 | 1.219e-11 | 1.745e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-defaults-seasonal | equivalent-objective | passed | 9.024e-13 | 1.051e-10 | 1.051e-10 | 1.060e-10 | 7.260e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-defaults-negative | equivalent-objective | passed | 1.069e-11 | 1.975e-15 | 1.975e-15 | 1.070e-11 | 6.573e-14 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-level-absmax | equivalent-objective | passed | 1.130e-11 | 0.000e+0 | 0.000e+0 | 1.130e-11 | 1.848e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-level-minmax | equivalent-objective | passed | 7.202e-8 | 0.000e+0 | 0.000e+0 | 7.202e-8 | 1.093e-4 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-constant-absmax | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-constant-minmax | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-negative-absmax | equivalent-objective | passed | 1.322e-11 | 0.000e+0 | 0.000e+0 | 1.322e-11 | 1.272e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-negative-minmax | equivalent-objective | passed | 7.202e-8 | 0.000e+0 | 0.000e+0 | 7.202e-8 | 1.093e-4 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-seasonal-absmax | equivalent-objective | passed | 1.115e-11 | 2.887e-13 | 2.887e-13 | 1.143e-11 | 2.119e-14 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-seasonal-minmax | equivalent-objective | passed | 9.948e-13 | 1.637e-12 | 1.637e-12 | 2.615e-12 | 1.455e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-reduced-v1. |
| flat-prefix-63-absmax | equivalent-objective | passed | 1.033e-7 | 1.759e-7 | 2.228e-9 | 2.814e-7 | 1.099e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-63-minmax | equivalent-objective | passed | 9.243e-8 | 1.060e-7 | 7.826e-9 | 1.984e-7 | 7.576e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-70-absmax | equivalent-objective | passed | 1.001e-7 | 9.092e-8 | 1.479e-8 | 1.910e-7 | 2.555e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-70-minmax | equivalent-objective | passed | 1.372e-7 | 2.744e-7 | 9.190e-9 | 4.116e-7 | 9.502e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-77-absmax | equivalent-objective | passed | 5.871e-8 | 1.429e-7 | 4.958e-9 | 2.016e-7 | 1.688e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-77-minmax | equivalent-objective | passed | 1.044e-6 | 7.814e-6 | 2.359e-6 | 8.858e-6 | 2.711e-7 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-mixed-components-absmax | equivalent-objective | passed | 1.107e-7 | 1.063e-7 | 3.407e-9 | 2.130e-7 | 2.439e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-225-absmax | equivalent-objective | passed | 1.627e-7 | 8.952e-8 | 1.230e-9 | 2.443e-7 | 9.071e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-225-minmax | equivalent-objective | passed | 7.836e-8 | 1.453e-7 | 1.366e-8 | 2.178e-7 | 2.623e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-232-absmax | equivalent-objective | passed | 4.856e-8 | 9.183e-8 | 2.275e-9 | 1.188e-7 | 1.398e-9 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-prefix-232-minmax | equivalent-objective | passed | 1.377e-7 | 1.074e-7 | 8.662e-9 | 2.382e-7 | 3.142e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-mixed-components-large-absmax | equivalent-objective | passed | 8.224e-8 | 1.116e-7 | 8.169e-9 | 1.938e-7 | 2.158e-10 | n/a | Verified equivalent behavior for this configuration under evidence flat-growth-mixed-scaling-v1. |
| flat-additive-components | equivalent-objective | passed | 7.695e-12 | 1.528e-11 | 1.528e-11 | 2.269e-11 | 7.447e-14 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |
| flat-additive-components-large | equivalent-objective | passed | 1.133e-11 | 1.275e-11 | 1.398e-11 | 2.300e-11 | 9.111e-14 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |
| flat-mixed-components-absmax-defaults | equivalent-objective | passed | 1.236e-2 | 8.702e-3 | 3.943e-3 | 2.107e-2 | 4.691e-2 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-mixed-v1. |
| flat-correlated-regressors | equivalent-objective | passed | 2.250e-11 | 3.414e-12 | 6.346e-12 | 2.885e-11 | 5.001e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-flat-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12254 | 25351 |
| country-us-flat-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12254 | 25351 |
| country-explicit-us-flat-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3535 | 28167 |
| country-explicit-us-flat-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3535 | 28167 |
| country-us-flat-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12276 | 25372 |
| country-us-flat-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12276 | 25372 |
| country-explicit-us-flat-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3545 | 28188 |
| country-explicit-us-flat-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 12 | 3545 | 28188 |
| country-boundary-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2010 | 13 | 11509 | 25601 |
| country-boundary-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2010 | 13 | 11509 | 25601 |
| country-empty-bv-flat | 0 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 0 | 2904 | 19084 |
| country-empty-bv-flat | 1 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 0 | 2904 | 19084 |
| country-explicit-empty-flat | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 0 | 570 | 19084 |
| country-explicit-empty-flat | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 0 | 570 | 19084 |
| country-estimated-sg-flat | 0 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 11 | 13181 | 23312 |
| country-estimated-sg-flat | 1 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 11 | 13181 | 23312 |
| country-partial-in-flat | 0 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2036 | 10 | 16613 | 23664 |
| country-partial-in-flat | 1 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2036 | 10 | 16613 | 23664 |
| country-mixed-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12579 | 31303 |
| country-mixed-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12579 | 31303 |
| country-none-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 0 | 586 | 122498 |
| country-none-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 0 | 586 | 122498 |
| country-se-flat-730 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-se-flat-730 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-explicit-se-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 14 | 25756 | 159826 |
| country-explicit-se-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 14 | 25756 | 159826 |
| country-cn-flat-730 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-cn-flat-730 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-explicit-cn-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 26 | 10007 | 165955 |
| country-explicit-cn-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 26 | 10007 | 165955 |
| country-none-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 14 | 50561 | 430748 |
| country-explicit-se-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 14 | 50561 | 430748 |
| country-cn-flat-2190 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-cn-flat-2190 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-explicit-cn-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 56 | 21026 | 534811 |
| country-explicit-cn-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 56 | 21026 | 534811 |
| country-none-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190-batch-32 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190-batch-32 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 14 | 44365 | 423057 |
| country-explicit-se-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | false | n/a | 14 | 44365 | 423057 |
| country-uncertainty-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12254 | 25352 |
| country-uncertainty-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:4965576c053594e7b7feb32f08acd4bc5b1ae4a2e185db3c2862da16ef0f3e00 | true | 2024 | 12 | 12254 | 25352 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

Anomaly workloads check the whole history in-sample. Effect's `warm-anomalies` times the public `anomalies` call, fit included; Python's times a fresh fit, `predict(history, vectorized=False)` and the strict `y < yhat_lower | y > yhat_upper` comparison. Each library's flags must be exactly the rows outside its own value intervals, and both must flag every declared outlier. Rows flagged by one library alone are counted, not failed.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| country-uncertainty-us-flat | 96 | 12 | 25 | 4 | 4 | 275 | 32 | intervals | 67108864 | country-v5:country-basic-96:level+jan1(3)+jan5(1.4)+bounded-noise:n=96:future=4:year=2024 / 9ff002c94ecdaa2f78ad32094f4af7cf5cbbe377f19cfdb5b3100e29005151f8 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-defaults-seasonal-intervals-1000 | 96 | 6 | 25 | 120 | 24 | 24 | 1000 | intervals | 67108864 | flat-seasonal-v1:n=96:h=24:level=35:bounded-noise=true / 801786aaae3b93349addcc9eca44eff79cb6f5640dce099ddd19082a85636e2a | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-full-intervals-512 | 96 | 6 | 25 | 24 | 24 | 24 | 512 | intervals | 67108864 | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-large-full-samples-128 | 256 | 6 | 25 | 64 | 64 | 64 | 128 | samples | 67108864 | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | docs/validation/uncertainty.md#evidence-classes |
| anomalies-flat-defaults-99 | 180 | 6 | 25 | 180 | 0 | 0 | 1000 | intervals | 67108864 | flat-anomalies-v1:level=35+weekly+bounded-noise-x5+outliers@30(+8),95(-8),150(+6):n=180:h=0 / 331e086f70aeba1edc5c406b58248c396c8666bda9fe70e084658fa5eabae0d8 | docs/validation/uncertainty.md#evidence-classes |

## Warm-start workloads

Warm-start cases fit the first rows of a history, read that fit's Stan parameters with `warmStartParameters` or `warm_start_params`, and refit the whole history from them. That refit is the model every correctness gate and prediction phase uses. `warm-start-fit` times the refit alone; the base fit is untimed. `warm-fit` times a fresh fit of the same history for comparison.

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 128 | 19 / 0.8 | horizons | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons | d27263ab5e5b8f488de56085850577bb13a87b5ad4dca13da9039ce8de013341, ac378f98946578839b9dc1c9dbd10cc73c207ee8c103ad3c437807ee60fab209, d76d1f1e1ceb3370113274ddc7a004255a238dcdea9959d517623cb508c5da64 |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 0 | n/a / n/a | rolling | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 128 | 19 / 0.8 | rolling | n/a |
| evaluation-flat-large-months-metrics | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 3 | 436 | 273 | 6 | 25 | 0 | n/a / n/a | rolling | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-flat-defaults-99 | warm-anomalies | effect-prophet | 6 | 10.117 | 10.336 | 9.456 | 10.336 | n/a |
| anomalies-flat-defaults-99 | warm-anomalies | python-prophet | 6 | 131.429 | 145.199 | 128.954 | 145.199 | n/a |
| anomalies-flat-defaults-99 | warm-fit | effect-prophet | 6 | 1.914 | 1.991 | 1.729 | 1.991 | n/a |
| anomalies-flat-defaults-99 | warm-fit | python-prophet | 6 | 6.804 | 7.413 | 6.684 | 7.413 | n/a |
| anomalies-flat-defaults-99 | warm-uncertainty | effect-prophet | 6 | 6.361 | 6.447 | 6.301 | 6.447 | 151.8 |
| anomalies-flat-defaults-99 | warm-uncertainty | python-prophet | 6 | 122.184 | 136.981 | 121.152 | 136.981 | 253.8 |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.013 | 0.016 | 141.7 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.447 | 0.482 | 0.424 | 0.482 | 253.8 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 190.861 | 194.678 | 189.229 | 194.678 | 158.5 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1636.723 | 1661.511 | 1631.907 | 1661.511 | 253.8 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 158.090 | 160.108 | 154.773 | 160.108 | 161.1 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1560.440 | 1599.262 | 1557.004 | 1599.262 | 253.8 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.734 | 0.780 | 0.725 | 0.780 | 158.6 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.261 | 3.360 | 3.168 | 3.360 | 253.8 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.076 | 0.104 | 0.074 | 0.104 | 158.5 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.519 | 0.555 | 0.518 | 0.555 | 253.8 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.247 | 21.801 | 21.173 | 21.801 | 156.5 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 71.673 | 72.535 | 71.419 | 72.535 | 253.8 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 22.263 | 22.723 | 21.630 | 22.723 | 155.4 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 70.881 | 74.175 | 69.904 | 74.175 | 253.8 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 22.185 | 24.827 | 21.585 | 24.827 | 154.5 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 65.664 | 66.060 | 64.682 | 66.060 | 253.8 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.283 | 0.318 | 0.261 | 0.318 | 154.6 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.391 | 5.516 | 5.341 | 5.516 | 253.8 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 182.024 | 184.842 | 177.825 | 184.842 | 233.3 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1581.924 | 1625.882 | 1563.830 | 1625.882 | 253.8 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.929 | 3.396 | 2.824 | 3.396 | 226.2 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.027 | 9.122 | 8.996 | 9.122 | 253.8 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.127 | 0.317 | 0.112 | 0.317 | 226.1 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 2.978 | 3.112 | 2.964 | 3.112 | 253.8 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 22.174 | 29.602 | 20.727 | 29.602 | 208.9 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 83.151 | 87.181 | 82.631 | 87.181 | 253.8 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.332 | 4.521 | 3.298 | 4.521 | 225.6 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.846 | 8.914 | 8.738 | 8.914 | 253.8 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 175.410 | 179.814 | 171.108 | 179.814 | 207.4 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1571.717 | 1598.009 | 1561.863 | 1598.009 | 253.8 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.773 | 1.923 | 1.730 | 1.923 | 203.8 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 4.960 | 5.001 | 4.859 | 5.001 | 253.8 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.114 | 0.138 | 0.108 | 0.138 | 201.3 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.238 | 1.264 | 1.232 | 1.264 | 253.8 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 8.982 | 10.091 | 7.819 | 10.091 | 169.9 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 24.570 | 26.125 | 24.247 | 26.125 | 253.8 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.505 | 4.318 | 2.425 | 4.318 | 198.8 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 6.941 | 7.163 | 6.911 | 7.163 | 253.8 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.010 | 0.012 | 0.009 | 0.012 | 136.7 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.510 | 0.449 | 0.510 | 253.8 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 164.979 | 177.541 | 163.014 | 177.541 | 153.9 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1609.156 | 1880.299 | 1582.040 | 1880.299 | 253.8 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 153.627 | 157.609 | 151.070 | 157.609 | 156.1 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1566.787 | 1585.882 | 1550.258 | 1585.882 | 253.8 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.216 | 0.251 | 0.204 | 0.251 | 154.0 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.069 | 2.226 | 2.014 | 2.226 | 253.8 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.035 | 0.063 | 0.028 | 0.063 | 153.9 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.431 | 0.488 | 0.399 | 0.488 | 253.8 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.519 | 1.872 | 1.460 | 1.872 | 153.4 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 13.514 | 19.113 | 13.280 | 19.113 | 253.8 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.714 | 2.290 | 1.590 | 2.290 | 153.2 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 14.351 | 20.862 | 12.708 | 20.862 | 253.8 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.281 | 2.755 | 2.216 | 2.755 | 145.5 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.233 | 13.013 | 9.045 | 13.013 | 253.8 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.139 | 0.177 | 0.134 | 0.177 | 149.4 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.113 | 5.838 | 3.052 | 5.838 | 253.8 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.058 | 0.061 | 0.032 | 0.061 | 148.7 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.581 | 0.587 | 0.550 | 0.587 | 253.8 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 200.369 | 240.280 | 193.031 | 240.280 | 191.2 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1642.072 | 1667.848 | 1632.606 | 1667.848 | 253.8 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 167.466 | 168.766 | 164.214 | 168.766 | 199.6 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1561.811 | 1591.762 | 1552.983 | 1591.762 | 253.8 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 1.154 | 2.233 | 0.840 | 2.233 | 199.4 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.087 | 3.286 | 3.028 | 3.286 | 253.8 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.097 | 0.127 | 0.085 | 0.127 | 191.7 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.498 | 0.569 | 0.494 | 0.569 | 253.8 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.174 | 22.082 | 20.515 | 22.082 | 190.6 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 68.251 | 68.844 | 67.907 | 68.844 | 253.8 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 21.171 | 22.265 | 20.318 | 22.265 | 172.3 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 68.042 | 71.449 | 67.020 | 71.449 | 253.8 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 19.016 | 19.731 | 18.942 | 19.731 | 154.5 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 63.010 | 66.104 | 62.872 | 66.104 | 253.8 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.597 | 2.023 | 1.369 | 2.023 | 157.8 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.306 | 5.759 | 5.229 | 5.759 | 253.8 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 179.016 | 200.855 | 173.011 | 200.855 | 241.0 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1418.792 | 1442.077 | 1404.546 | 1442.077 | 253.8 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.794 | 1.887 | 1.775 | 1.887 | 233.3 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.079 | 10.282 | 9.984 | 10.282 | 253.8 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.037 | 0.053 | 0.025 | 0.053 | 225.7 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.309 | 3.332 | 3.263 | 3.332 | 253.8 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 20.357 | 24.331 | 19.746 | 24.331 | 202.3 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 78.621 | 93.582 | 77.608 | 93.582 | 253.8 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.249 | 3.924 | 2.876 | 3.924 | 217.3 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.360 | 10.460 | 9.240 | 10.460 | 253.8 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 169.808 | 274.742 | 168.100 | 274.742 | 204.5 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1403.780 | 1457.211 | 1396.261 | 1457.211 | 253.8 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.814 | 1.567 | 0.787 | 1.567 | 201.1 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.802 | 5.847 | 5.722 | 5.847 | 253.8 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.027 | 0.041 | 0.024 | 0.041 | 193.8 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.475 | 1.484 | 1.465 | 1.484 | 253.8 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 6.280 | 6.812 | 5.743 | 6.812 | 156.8 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 20.527 | 20.773 | 20.269 | 20.773 | 253.8 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.820 | 4.039 | 2.298 | 4.039 | 180.1 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.515 | 19.181 | 6.366 | 19.181 | 253.8 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.013 | 0.016 | 139.3 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.479 | 0.535 | 0.466 | 0.535 | 253.8 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 161.730 | 164.113 | 157.654 | 164.113 | 160.4 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1421.196 | 1444.461 | 1408.911 | 1444.461 | 253.8 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 152.479 | 157.351 | 150.879 | 157.351 | 160.5 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1405.055 | 1420.098 | 1392.536 | 1420.098 | 253.8 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.072 | 0.116 | 0.068 | 0.116 | 160.5 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.050 | 2.198 | 2.023 | 2.198 | 253.8 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.016 | 0.021 | 0.015 | 0.021 | 160.4 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.431 | 0.463 | 0.430 | 0.463 | 253.8 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.110 | 1.213 | 1.078 | 1.213 | 160.1 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.503 | 14.330 | 11.237 | 14.330 | 253.8 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.438 | 1.597 | 1.349 | 1.597 | 155.7 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 10.862 | 12.662 | 10.673 | 12.662 | 253.8 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.563 | 2.589 | 1.527 | 2.589 | 147.7 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.929 | 11.554 | 8.176 | 11.554 | 253.8 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.152 | 0.296 | 0.133 | 0.296 | 150.2 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.718 | 3.474 | 2.648 | 3.474 | 253.8 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 170.986 | 179.521 | 169.071 | 179.521 | 193.9 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1437.965 | 1449.370 | 1419.175 | 1449.370 | 253.8 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.662 | 3.020 | 2.614 | 3.020 | 192.9 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.119 | 7.186 | 7.039 | 7.186 | 253.8 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.045 | 0.047 | 0.044 | 0.047 | 191.1 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.902 | 3.000 | 2.834 | 3.000 | 253.8 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 11.885 | 13.035 | 11.826 | 13.035 | 159.7 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 38.130 | 51.941 | 38.003 | 51.941 | 253.8 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.381 | 0.538 | 0.361 | 0.538 | 173.9 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 11.913 | 12.567 | 11.794 | 12.567 | 253.8 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 176.647 | 205.555 | 174.276 | 205.555 | 204.0 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1414.397 | 1435.002 | 1411.577 | 1435.002 | 253.8 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 3.023 | 3.776 | 2.953 | 3.776 | 200.4 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.289 | 7.462 | 7.189 | 7.462 | 253.8 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.044 | 0.060 | 0.042 | 0.060 | 197.9 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.881 | 2.900 | 2.842 | 2.900 | 253.8 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 14.203 | 17.300 | 12.186 | 17.300 | 188.5 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 39.625 | 57.874 | 39.207 | 57.874 | 253.8 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.916 | 2.371 | 1.822 | 2.371 | 195.5 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.142 | 13.412 | 12.996 | 13.412 | 253.8 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 174.439 | 180.224 | 171.210 | 180.224 | 196.7 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1404.218 | 1448.595 | 1396.214 | 1448.595 | 253.8 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 1.889 | 2.449 | 1.624 | 2.449 | 182.6 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.154 | 5.224 | 5.112 | 5.224 | 253.8 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.034 | 0.046 | 0.030 | 0.046 | 165.0 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.415 | 1.454 | 1.392 | 1.454 | 253.8 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.769 | 6.517 | 4.981 | 6.517 | 154.6 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 18.651 | 18.916 | 18.567 | 18.916 | 253.8 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 1.974 | 2.417 | 1.754 | 2.417 | 159.6 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 8.848 | 9.405 | 8.791 | 9.405 | 253.8 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.012 | 0.014 | 140.5 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.439 | 0.459 | 0.435 | 0.459 | 253.8 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 178.320 | 199.565 | 176.474 | 199.565 | 156.7 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1453.495 | 1477.927 | 1445.871 | 1477.927 | 253.8 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 153.175 | 160.289 | 151.762 | 160.289 | 156.7 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1429.263 | 1444.338 | 1406.264 | 1444.338 | 253.8 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.409 | 0.643 | 0.377 | 0.643 | 156.7 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 3.911 | 4.475 | 3.853 | 4.475 | 253.8 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.020 | 0.032 | 0.018 | 0.032 | 156.7 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.694 | 0.713 | 0.664 | 0.713 | 253.8 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.120 | 14.532 | 12.729 | 14.532 | 156.5 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 46.922 | 50.283 | 46.778 | 50.283 | 253.8 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.119 | 13.715 | 13.018 | 13.715 | 156.3 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 45.969 | 47.417 | 45.773 | 47.417 | 253.8 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 13.617 | 13.765 | 13.551 | 13.765 | 150.0 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 41.332 | 41.962 | 40.872 | 41.962 | 253.8 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.163 | 0.186 | 0.145 | 0.186 | 156.2 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.765 | 4.798 | 4.698 | 4.798 | 253.8 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.021 | 0.010 | 0.021 | 137.1 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.452 | 0.467 | 0.445 | 0.467 | 253.8 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 171.378 | 181.738 | 165.028 | 181.738 | 155.9 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1427.582 | 1447.079 | 1420.422 | 1447.079 | 253.8 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 154.228 | 157.633 | 151.407 | 157.633 | 155.9 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1400.879 | 1420.103 | 1398.813 | 1420.103 | 253.8 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.365 | 0.419 | 0.340 | 0.419 | 155.9 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 4.037 | 4.348 | 3.895 | 4.348 | 253.8 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.021 | 0.032 | 0.016 | 0.032 | 155.9 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.700 | 0.757 | 0.695 | 0.757 | 253.8 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.702 | 3.249 | 2.491 | 3.249 | 155.7 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.219 | 18.414 | 18.013 | 18.414 | 253.8 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.796 | 2.835 | 2.705 | 2.835 | 155.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 17.874 | 19.874 | 17.518 | 19.874 | 253.8 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.278 | 3.569 | 3.153 | 3.569 | 147.8 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.008 | 15.105 | 12.806 | 15.105 | 253.8 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.186 | 0.227 | 0.172 | 0.227 | 150.2 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.689 | 5.195 | 4.625 | 5.195 | 253.8 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.048 | 0.063 | 0.040 | 0.063 | 142.7 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.493 | 0.518 | 0.458 | 0.518 | 253.8 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 185.053 | 191.027 | 184.348 | 191.027 | 160.6 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1621.026 | 1699.728 | 1613.682 | 1699.728 | 253.8 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 158.485 | 159.575 | 157.733 | 159.575 | 174.6 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1565.173 | 1605.711 | 1556.976 | 1605.711 | 253.8 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 1.183 | 1.987 | 1.174 | 1.987 | 174.5 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.327 | 4.506 | 4.266 | 4.506 | 253.8 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.125 | 0.151 | 0.112 | 0.151 | 164.4 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.715 | 0.763 | 0.708 | 0.763 | 253.8 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 16.973 | 17.984 | 16.839 | 17.984 | 157.0 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 62.136 | 63.704 | 60.926 | 63.704 | 253.8 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 17.195 | 18.654 | 16.941 | 18.654 | 155.1 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 60.806 | 61.946 | 60.320 | 61.946 | 253.8 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.711 | 18.606 | 17.377 | 18.606 | 152.7 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 54.502 | 54.979 | 54.286 | 54.979 | 253.8 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.239 | 0.248 | 0.212 | 0.248 | 154.2 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.139 | 6.353 | 6.088 | 6.353 | 253.8 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 159.532 | 167.113 | 158.671 | 167.113 | 172.2 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1415.920 | 1488.500 | 1396.012 | 1488.500 | 253.8 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.094 | 0.177 | 0.075 | 0.177 | 167.0 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.661 | 5.055 | 4.559 | 5.055 | 253.8 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | 154.9 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.304 | 2.395 | 2.301 | 2.395 | 253.8 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.588 | 8.572 | 6.485 | 8.572 | 153.9 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 15.189 | 29.350 | 15.155 | 29.350 | 253.8 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.194 | 0.252 | 0.186 | 0.252 | 154.4 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.629 | 2.679 | 2.605 | 2.679 | 253.8 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 165.271 | 185.799 | 163.984 | 185.799 | 185.2 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1400.983 | 1438.203 | 1399.028 | 1438.203 | 253.8 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.095 | 0.177 | 0.074 | 0.177 | 177.6 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.630 | 4.712 | 4.576 | 4.712 | 253.8 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.016 | 0.017 | 0.014 | 0.017 | 167.9 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.299 | 2.329 | 2.283 | 2.329 | 253.8 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 6.809 | 9.106 | 6.374 | 9.106 | 149.7 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 15.414 | 28.574 | 14.965 | 28.574 | 253.8 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 1.426 | 2.242 | 1.306 | 2.242 | 155.5 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.795 | 2.908 | 2.690 | 2.908 | 253.8 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 160.386 | 164.789 | 158.181 | 164.789 | 155.1 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1409.453 | 1473.491 | 1402.742 | 1473.491 | 253.8 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.080 | 0.140 | 0.066 | 0.140 | 154.7 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.855 | 2.979 | 2.800 | 2.979 | 253.8 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.014 | 0.032 | 0.012 | 0.032 | 154.1 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.012 | 1.048 | 1.001 | 1.048 | 253.8 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 3.122 | 4.946 | 2.658 | 4.946 | 153.0 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.034 | 8.167 | 7.983 | 8.167 | 253.8 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.469 | 1.716 | 1.345 | 1.716 | 153.9 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.782 | 2.834 | 2.709 | 2.834 | 253.8 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.011 | 0.016 | 141.9 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.467 | 0.479 | 0.431 | 0.479 | 253.8 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 170.134 | 172.048 | 168.684 | 172.048 | 157.1 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1586.563 | 1642.598 | 1577.402 | 1642.598 | 253.8 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 159.214 | 160.008 | 157.743 | 160.008 | 170.5 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1574.111 | 1591.053 | 1556.479 | 1591.053 | 253.8 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.248 | 1.480 | 1.174 | 1.480 | 168.8 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.109 | 3.759 | 2.998 | 3.759 | 253.8 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.126 | 0.149 | 0.121 | 0.149 | 159.0 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.516 | 0.585 | 0.496 | 0.585 | 253.8 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.277 | 3.726 | 3.118 | 3.726 | 156.9 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 20.677 | 21.082 | 20.518 | 21.082 | 253.8 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.866 | 4.191 | 3.726 | 4.191 | 156.0 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 20.188 | 20.452 | 19.995 | 20.452 | 253.8 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 3.810 | 4.233 | 3.722 | 4.233 | 152.8 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.167 | 15.514 | 14.930 | 15.514 | 253.8 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.176 | 0.191 | 0.169 | 0.191 | 153.4 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.847 | 4.945 | 4.753 | 4.945 | 253.8 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 177.419 | 193.516 | 172.709 | 193.516 | 205.3 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1576.602 | 1621.192 | 1574.622 | 1621.192 | 253.8 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 5.648 | 6.486 | 4.846 | 6.486 | 200.5 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.903 | 5.993 | 5.776 | 5.993 | 253.8 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.309 | 0.484 | 0.263 | 0.484 | 195.5 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.412 | 2.536 | 2.387 | 2.536 | 253.8 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 18.229 | 20.214 | 14.222 | 20.214 | 195.0 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 42.165 | 42.520 | 41.988 | 42.520 | 253.8 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.539 | 0.620 | 0.515 | 0.620 | 195.5 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.123 | 7.392 | 7.007 | 7.392 | 253.8 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 184.703 | 208.385 | 179.378 | 208.385 | 214.7 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1587.480 | 1648.632 | 1566.165 | 1648.632 | 253.8 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.899 | 5.215 | 4.667 | 5.215 | 210.1 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.809 | 5.906 | 5.771 | 5.906 | 253.8 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.310 | 0.326 | 0.267 | 0.326 | 206.9 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.500 | 2.597 | 2.423 | 2.597 | 253.8 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 16.861 | 19.377 | 13.490 | 19.377 | 196.9 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 42.154 | 45.474 | 41.839 | 45.474 | 253.8 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.975 | 2.381 | 1.932 | 2.381 | 205.8 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.610 | 9.099 | 8.516 | 9.099 | 253.8 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 177.583 | 189.537 | 175.097 | 189.537 | 209.0 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1592.123 | 1667.106 | 1581.292 | 1667.106 | 253.8 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 3.029 | 4.228 | 2.855 | 4.228 | 204.2 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.116 | 4.271 | 4.071 | 4.271 | 253.8 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.285 | 0.296 | 0.248 | 0.296 | 199.0 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.125 | 1.145 | 1.105 | 1.145 | 253.8 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 8.326 | 10.797 | 7.779 | 10.797 | 168.4 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 21.103 | 21.790 | 20.916 | 21.790 | 253.8 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.306 | 4.281 | 2.206 | 4.281 | 198.4 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.702 | 9.776 | 8.689 | 9.776 | 253.8 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 183.767 | 194.602 | 180.608 | 194.602 | 152.1 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1632.714 | 1648.002 | 1627.145 | 1648.002 | 253.8 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.092 | 158.661 | 155.143 | 158.661 | 156.1 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1612.706 | 1630.950 | 1587.642 | 1630.950 | 253.8 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.271 | 2.062 | 1.078 | 2.062 | 156.0 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.907 | 3.993 | 3.838 | 3.993 | 253.8 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.085 | 0.116 | 0.081 | 0.116 | 152.1 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.672 | 0.708 | 0.660 | 0.708 | 253.8 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.013 | 0.014 | 141.1 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.443 | 0.467 | 0.435 | 0.467 | 253.8 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.377 | 0.574 | 0.313 | 0.574 | 145.9 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.503 | 14.736 | 14.406 | 14.736 | 253.8 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.024 | 0.012 | 0.024 | 142.1 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.460 | 0.475 | 0.449 | 0.475 | 253.8 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 183.432 | 198.736 | 181.540 | 198.736 | 159.9 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1628.249 | 1651.229 | 1617.959 | 1651.229 | 253.8 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 156.914 | 167.129 | 154.724 | 167.129 | 162.8 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1603.799 | 1687.392 | 1586.758 | 1687.392 | 253.8 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.777 | 0.910 | 0.766 | 0.910 | 160.1 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 3.880 | 4.351 | 3.801 | 4.351 | 253.8 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.101 | 0.117 | 0.089 | 0.117 | 159.9 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.684 | 0.714 | 0.674 | 0.714 | 253.8 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.528 | 13.841 | 13.448 | 13.841 | 158.8 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 50.910 | 57.786 | 50.298 | 57.786 | 253.8 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.836 | 14.329 | 13.802 | 14.329 | 154.9 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 51.670 | 54.111 | 50.384 | 54.111 | 253.8 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 14.188 | 14.483 | 13.964 | 14.483 | 150.8 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 45.545 | 48.048 | 44.364 | 48.048 | 253.8 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.313 | 0.353 | 0.259 | 0.353 | 151.8 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.510 | 5.603 | 5.469 | 5.603 | 253.8 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.023 | 0.013 | 0.023 | 139.3 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.454 | 0.477 | 0.438 | 0.477 | 253.8 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 173.849 | 221.344 | 168.747 | 221.344 | 157.0 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1592.921 | 1626.926 | 1579.452 | 1626.926 | 253.8 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 154.782 | 165.191 | 153.922 | 165.191 | 160.0 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1578.488 | 1659.889 | 1563.689 | 1659.889 | 253.8 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.773 | 0.867 | 0.745 | 0.867 | 157.3 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.900 | 3.912 | 3.796 | 3.912 | 253.8 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.088 | 0.124 | 0.076 | 0.124 | 157.0 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.682 | 0.748 | 0.669 | 0.748 | 253.8 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.342 | 3.370 | 3.208 | 3.370 | 155.9 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 22.057 | 22.776 | 21.997 | 22.776 | 253.8 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.557 | 3.741 | 3.441 | 3.741 | 154.0 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 21.683 | 24.209 | 21.502 | 24.209 | 253.8 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 4.001 | 4.697 | 3.752 | 4.697 | 150.7 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 16.006 | 16.479 | 15.876 | 16.479 | 253.8 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.268 | 0.330 | 0.236 | 0.330 | 151.4 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.494 | 5.536 | 5.408 | 5.536 | 253.8 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.318 | 9.043 | 6.398 | 9.043 | 154.1 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 48.434 | 49.812 | 47.835 | 49.812 | 253.8 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.381 | 1.621 | 1.322 | 1.621 | 155.3 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 10.016 | 10.316 | 9.916 | 10.316 | 253.8 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.355 | 0.415 | 0.352 | 0.415 | 154.5 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.012 | 5.069 | 4.967 | 5.069 | 253.8 |
| evaluation-flat-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.617 | 0.708 | 0.447 | 0.708 | 153.4 |
| evaluation-flat-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.476 | 5.592 | 5.468 | 5.592 | 253.8 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 179.049 | 182.965 | 178.564 | 182.965 | 150.9 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1471.787 | 1484.186 | 1471.704 | 1484.186 | 253.8 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.624 | 2.990 | 2.587 | 2.990 | 150.6 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.352 | 1.393 | 1.343 | 1.393 | 253.8 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.107 | 0.156 | 0.104 | 0.156 | 130.3 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.514 | 0.976 | 0.511 | 0.976 | 253.8 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.086 | 0.098 | 0.085 | 0.098 | 150.4 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.287 | 5.370 | 5.226 | 5.370 | 253.8 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.838 | 2.247 | 1.838 | 2.247 | 137.6 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.786 | 0.915 | 0.751 | 0.915 | 253.8 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.043 | 8.118 | 5.577 | 8.118 | 149.8 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 38.992 | 44.023 | 38.172 | 44.023 | 253.8 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 7.599 | 9.025 | 5.433 | 9.025 | 154.2 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 60.966 | 61.429 | 60.015 | 61.429 | 253.8 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 180.234 | 192.128 | 177.552 | 192.128 | 155.1 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1472.102 | 1503.652 | 1471.597 | 1503.652 | 253.8 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.154 | 1.186 | 1.086 | 1.186 | 154.9 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.483 | 1.491 | 1.467 | 1.491 | 253.8 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.048 | 0.061 | 0.034 | 0.061 | 132.9 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.433 | 0.494 | 0.396 | 0.494 | 253.8 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.099 | 0.127 | 0.094 | 0.127 | 154.9 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.336 | 5.435 | 5.288 | 5.435 | 253.8 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.423 | 2.336 | 0.976 | 2.336 | 137.0 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.757 | 0.811 | 0.744 | 0.811 | 253.8 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 4.797 | 9.567 | 4.274 | 9.567 | 151.5 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 46.502 | 46.954 | 46.013 | 46.954 | 253.8 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.178 | 2.559 | 1.807 | 2.559 | 158.2 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.556 | 16.153 | 13.442 | 16.153 | 253.8 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.236 | 0.334 | 0.207 | 0.334 | 178.0 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 253.8 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.220 | 0.254 | 0.210 | 0.254 | 160.8 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 253.8 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 13.034 | 15.730 | 11.910 | 15.730 | 155.1 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 147.441 | 161.199 | 143.243 | 161.199 | 253.8 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.114 | 0.117 | 0.106 | 0.117 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.645 | 0.696 | 0.638 | 0.696 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 169.699 | 180.144 | 165.801 | 180.144 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1426.991 | 1445.132 | 1420.618 | 1445.132 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 159.440 | 159.892 | 158.995 | 159.892 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1423.643 | 1442.601 | 1414.247 | 1442.601 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.130 | 0.143 | 0.123 | 0.143 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.919 | 3.955 | 3.869 | 3.955 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.030 | 0.043 | 0.027 | 0.043 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.848 | 0.890 | 0.834 | 0.890 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.062 | 4.235 | 1.962 | 4.235 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.777 | 15.701 | 14.702 | 15.701 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.608 | 2.915 | 2.052 | 2.915 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 14.636 | 15.257 | 14.230 | 15.257 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.090 | 2.916 | 2.049 | 2.916 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 9.243 | 9.260 | 9.047 | 9.260 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.470 | 0.703 | 0.460 | 0.703 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.712 | 5.036 | 4.711 | 5.036 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.042 | 0.045 | 0.039 | 0.045 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.540 | 0.635 | 0.533 | 0.635 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 174.879 | 181.703 | 174.322 | 181.703 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1455.161 | 1480.033 | 1438.710 | 1480.033 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 156.119 | 165.232 | 154.710 | 165.232 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1445.270 | 1476.658 | 1437.773 | 1476.658 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.123 | 0.155 | 0.121 | 0.155 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.694 | 9.189 | 3.656 | 9.189 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.031 | 0.041 | 0.028 | 0.041 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.657 | 0.701 | 0.645 | 0.701 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.559 | 5.430 | 4.545 | 5.430 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.289 | 29.071 | 27.952 | 29.071 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.687 | 4.800 | 4.634 | 4.800 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 27.504 | 27.690 | 26.948 | 27.690 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 5.139 | 5.413 | 5.136 | 5.413 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 22.797 | 27.993 | 22.679 | 27.993 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.297 | 0.513 | 0.282 | 0.513 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.715 | 4.832 | 4.648 | 4.832 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.482 | 159.663 | 153.831 | 159.663 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1438.814 | 1451.670 | 1429.040 | 1451.670 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.132 | 0.157 | 0.126 | 0.157 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.095 | 2.411 | 2.077 | 2.411 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.055 | 0.019 | 0.055 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.410 | 0.422 | 0.403 | 0.422 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.171 | 2.016 | 0.972 | 2.016 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.036 | 3.180 | 2.991 | 3.180 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.275 | 0.307 | 0.251 | 0.307 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.671 | 2.746 | 2.662 | 2.746 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.605 | 161.115 | 155.296 | 161.115 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1426.424 | 1439.306 | 1423.856 | 1439.306 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.147 | 0.155 | 0.136 | 0.155 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.083 | 2.156 | 2.072 | 2.156 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.026 | 0.021 | 0.026 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.406 | 0.409 | 0.405 | 0.409 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.163 | 2.305 | 0.968 | 2.305 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.074 | 3.194 | 3.024 | 3.194 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.221 | 0.466 | 0.204 | 0.466 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.664 | 2.704 | 2.629 | 2.704 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.186 | 0.236 | 0.185 | 0.236 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.950 | 1.001 | 0.938 | 1.001 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 179.067 | 191.544 | 178.745 | 191.544 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1449.044 | 1482.774 | 1443.561 | 1482.774 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 163.151 | 213.264 | 162.153 | 213.264 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1412.514 | 1483.101 | 1411.042 | 1483.101 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.198 | 0.331 | 0.172 | 0.331 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.630 | 3.695 | 3.555 | 3.695 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.022 | 0.028 | 0.021 | 0.028 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.218 | 1.237 | 1.202 | 1.237 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.926 | 7.817 | 4.881 | 7.817 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 30.442 | 30.727 | 30.273 | 30.727 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 6.440 | 8.568 | 5.499 | 8.568 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 29.848 | 32.015 | 29.791 | 32.015 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 5.210 | 5.334 | 4.561 | 5.334 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 25.219 | 27.742 | 25.189 | 27.742 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 1.050 | 1.462 | 1.036 | 1.462 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.387 | 5.073 | 4.331 | 5.073 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.012 | 0.014 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.458 | 0.500 | 0.441 | 0.500 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 168.192 | 174.783 | 162.436 | 174.783 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1436.957 | 1478.909 | 1435.521 | 1478.909 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 155.359 | 156.802 | 152.880 | 156.802 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1428.121 | 1460.063 | 1420.118 | 1460.063 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.113 | 0.150 | 0.087 | 0.150 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.185 | 2.288 | 2.117 | 2.288 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.024 | 0.032 | 0.014 | 0.032 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.475 | 0.506 | 0.445 | 0.506 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.373 | 1.422 | 1.336 | 1.422 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.504 | 12.881 | 12.471 | 12.881 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.507 | 3.098 | 1.405 | 3.098 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 11.914 | 12.262 | 11.759 | 12.262 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 2.232 | 2.816 | 1.745 | 2.816 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 8.839 | 9.246 | 8.676 | 9.246 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.276 | 0.441 | 0.259 | 0.441 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.079 | 3.170 | 3.065 | 3.170 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.019 | 0.011 | 0.019 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.489 | 0.523 | 0.467 | 0.523 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 171.267 | 175.847 | 163.604 | 175.847 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1440.472 | 1468.980 | 1432.965 | 1468.980 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 157.468 | 218.315 | 156.626 | 218.315 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1437.012 | 1455.051 | 1417.962 | 1455.051 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.114 | 0.137 | 0.070 | 0.137 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.154 | 2.244 | 2.125 | 2.244 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.027 | 0.036 | 0.015 | 0.036 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.468 | 0.485 | 0.447 | 0.485 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.378 | 1.564 | 1.341 | 1.564 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.729 | 14.152 | 12.199 | 14.152 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.488 | 3.178 | 1.390 | 3.178 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 12.415 | 13.689 | 11.623 | 13.689 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.827 | 2.219 | 1.614 | 2.219 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 9.153 | 11.062 | 8.533 | 11.062 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.280 | 0.379 | 0.262 | 0.379 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.126 | 3.411 | 3.050 | 3.411 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.028 | 0.015 | 0.028 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.479 | 0.519 | 0.447 | 0.519 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 280.998 | 288.436 | 278.173 | 288.436 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1829.093 | 1876.210 | 1821.867 | 1876.210 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 152.791 | 159.097 | 149.831 | 159.097 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1420.912 | 1453.996 | 1420.705 | 1453.996 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.112 | 0.137 | 0.077 | 0.137 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.236 | 2.950 | 2.106 | 2.950 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.026 | 0.031 | 0.016 | 0.031 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.442 | 0.487 | 0.404 | 0.487 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 103.645 | 107.279 | 103.347 | 107.279 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 396.293 | 404.342 | 392.324 | 404.342 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 105.238 | 107.444 | 103.798 | 107.444 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 396.505 | 398.392 | 389.022 | 398.392 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 104.124 | 109.623 | 103.460 | 109.623 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 388.482 | 393.755 | 386.225 | 393.755 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.297 | 0.400 | 0.273 | 0.400 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.102 | 3.241 | 3.016 | 3.241 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.578 | 164.995 | 155.572 | 164.995 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1441.000 | 1466.109 | 1421.861 | 1466.109 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.158 | 0.216 | 0.140 | 0.216 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.084 | 2.209 | 2.049 | 2.209 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.033 | 0.020 | 0.033 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.434 | 0.458 | 0.423 | 0.458 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.744 | 6.126 | 1.551 | 6.126 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 6.993 | 7.737 | 6.892 | 7.737 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.212 | 0.326 | 0.199 | 0.326 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.672 | 2.701 | 2.623 | 2.701 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.872 | 159.511 | 152.720 | 159.511 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1446.101 | 1550.700 | 1445.610 | 1550.700 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.152 | 0.134 | 0.152 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.116 | 2.132 | 2.036 | 2.132 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.030 | 0.025 | 0.030 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.435 | 0.449 | 0.425 | 0.449 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.781 | 5.013 | 3.607 | 5.013 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 19.772 | 20.215 | 19.684 | 20.215 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.272 | 0.321 | 0.263 | 0.321 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.641 | 2.695 | 2.639 | 2.695 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.041 | 0.043 | 0.036 | 0.043 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.514 | 0.537 | 0.499 | 0.537 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 168.745 | 170.796 | 167.621 | 170.796 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1465.664 | 1489.468 | 1463.941 | 1489.468 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 154.410 | 158.978 | 152.801 | 158.978 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1419.995 | 1436.224 | 1416.205 | 1436.224 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.125 | 0.131 | 0.119 | 0.131 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.615 | 4.006 | 3.516 | 4.006 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.029 | 0.038 | 0.027 | 0.038 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.630 | 0.653 | 0.619 | 0.653 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.049 | 3.482 | 3.034 | 3.482 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 48.779 | 49.768 | 48.746 | 49.768 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.091 | 3.223 | 3.070 | 3.223 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 48.009 | 48.661 | 47.491 | 48.661 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 3.592 | 3.646 | 3.505 | 3.646 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 43.873 | 47.500 | 43.550 | 47.500 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.365 | 2.143 | 0.365 | 2.143 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.652 | 4.841 | 4.615 | 4.841 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.218 | 157.219 | 153.138 | 157.219 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1437.945 | 1453.925 | 1433.106 | 1453.925 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.157 | 0.175 | 0.152 | 0.175 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.660 | 3.769 | 3.636 | 3.769 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.022 | 0.017 | 0.022 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.643 | 0.685 | 0.602 | 0.685 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 1.970 | 2.959 | 1.783 | 2.959 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 7.853 | 8.632 | 7.719 | 8.632 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.394 | 0.747 | 0.375 | 0.747 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.808 | 4.852 | 4.742 | 4.852 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.714 | 165.614 | 155.179 | 165.614 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1443.323 | 1559.794 | 1443.160 | 1559.794 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.157 | 0.196 | 0.154 | 0.196 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.926 | 4.055 | 3.887 | 4.055 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.033 | 0.018 | 0.033 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.822 | 0.830 | 0.819 | 0.830 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 2.595 | 4.782 | 2.209 | 4.782 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.367 | 9.804 | 9.081 | 9.804 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.559 | 1.199 | 0.500 | 1.199 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.772 | 4.797 | 4.743 | 4.797 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.129 | 0.164 | 0.123 | 0.164 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.669 | 0.690 | 0.665 | 0.690 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 174.170 | 179.745 | 167.592 | 179.745 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1438.664 | 1454.666 | 1437.059 | 1454.666 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 156.647 | 161.516 | 156.647 | 161.516 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1444.862 | 1549.252 | 1432.657 | 1549.252 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.142 | 0.156 | 0.139 | 0.156 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.878 | 3.915 | 3.819 | 3.915 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.025 | 0.031 | 0.025 | 0.031 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.827 | 0.851 | 0.820 | 0.851 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.089 | 2.137 | 2.069 | 2.137 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.855 | 15.980 | 14.716 | 15.980 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.209 | 2.740 | 2.155 | 2.740 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.941 | 14.107 | 13.928 | 14.107 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.350 | 3.409 | 2.150 | 3.409 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.138 | 9.485 | 9.045 | 9.485 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.477 | 0.547 | 0.451 | 0.547 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.750 | 4.819 | 4.736 | 4.819 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.053 | 0.066 | 0.041 | 0.066 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.554 | 0.578 | 0.543 | 0.578 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 161.216 | 162.411 | 159.256 | 162.411 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1433.189 | 1443.201 | 1421.523 | 1443.201 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 152.556 | 157.734 | 152.201 | 157.734 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1422.963 | 1433.060 | 1421.784 | 1433.060 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.131 | 0.140 | 0.112 | 0.140 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.696 | 3.868 | 3.657 | 3.868 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.025 | 0.028 | 0.023 | 0.028 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.672 | 0.684 | 0.665 | 0.684 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.155 | 1.390 | 1.152 | 1.390 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 12.911 | 13.619 | 12.892 | 13.619 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.304 | 1.462 | 1.271 | 1.462 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.319 | 12.372 | 12.250 | 12.372 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.815 | 1.887 | 1.762 | 1.887 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.777 | 7.979 | 7.716 | 7.979 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.290 | 0.641 | 0.265 | 0.641 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.704 | 4.730 | 4.631 | 4.730 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.285 | 168.811 | 156.400 | 168.811 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1425.938 | 1440.442 | 1420.468 | 1440.442 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.142 | 0.328 | 0.136 | 0.328 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.088 | 2.156 | 2.086 | 2.156 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.027 | 0.020 | 0.027 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.437 | 0.450 | 0.437 | 0.450 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.436 | 5.819 | 1.405 | 5.819 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.233 | 7.860 | 7.090 | 7.860 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.228 | 0.280 | 0.198 | 0.280 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.680 | 2.703 | 2.648 | 2.703 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.345 | 174.863 | 153.305 | 174.863 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1438.777 | 1455.952 | 1421.629 | 1455.952 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.129 | 0.166 | 0.123 | 0.166 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.075 | 2.130 | 2.069 | 2.130 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.034 | 0.020 | 0.034 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.419 | 0.440 | 0.405 | 0.440 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.977 | 4.946 | 3.766 | 4.946 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 19.778 | 20.262 | 19.685 | 20.262 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.276 | 0.287 | 0.271 | 0.287 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.638 | 2.829 | 2.619 | 2.829 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.575 | 172.579 | 160.650 | 172.579 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1436.871 | 1446.682 | 1430.356 | 1446.682 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.183 | 0.215 | 0.178 | 0.215 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.823 | 3.902 | 3.793 | 3.902 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.017 | 0.021 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.795 | 0.817 | 0.793 | 0.817 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 3.307 | 4.717 | 2.203 | 4.717 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.898 | 9.056 | 8.811 | 9.056 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.152 | 0.166 | 0.142 | 0.166 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.772 | 4.875 | 4.767 | 4.875 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.092 | 161.754 | 155.582 | 161.754 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1436.486 | 1440.707 | 1424.080 | 1440.707 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.181 | 0.205 | 0.177 | 0.205 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.851 | 3.926 | 3.756 | 3.926 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.034 | 0.019 | 0.034 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.800 | 0.808 | 0.792 | 0.808 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.564 | 4.185 | 3.292 | 4.185 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.914 | 9.199 | 8.856 | 9.199 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.157 | 0.162 | 0.148 | 0.162 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.820 | 4.891 | 4.736 | 4.891 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.372 | 166.293 | 155.978 | 166.293 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1450.749 | 1466.028 | 1434.369 | 1466.028 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.180 | 0.230 | 0.174 | 0.230 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.876 | 3.914 | 3.847 | 3.914 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.018 | 0.023 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.807 | 0.819 | 0.787 | 0.819 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.372 | 4.809 | 2.188 | 4.809 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 9.116 | 9.355 | 8.893 | 9.355 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.138 | 0.152 | 0.136 | 0.152 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.759 | 4.893 | 4.744 | 4.893 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.518 | 165.168 | 160.121 | 165.168 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1438.735 | 1464.522 | 1429.120 | 1464.522 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.199 | 0.287 | 0.163 | 0.287 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.851 | 3.951 | 3.827 | 3.951 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.021 | 0.018 | 0.021 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.823 | 0.835 | 0.810 | 0.835 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.489 | 3.930 | 3.360 | 3.930 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 10.085 | 10.118 | 9.172 | 10.118 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.156 | 0.157 | 0.155 | 0.157 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.769 | 6.391 | 4.711 | 6.391 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.267 | 160.824 | 154.896 | 160.824 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1454.901 | 1486.656 | 1442.889 | 1486.656 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.225 | 0.228 | 0.217 | 0.228 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.594 | 3.682 | 3.564 | 3.682 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.025 | 0.020 | 0.025 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.634 | 0.650 | 0.627 | 0.650 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.721 | 2.625 | 1.660 | 2.625 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.580 | 8.122 | 7.460 | 8.122 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.219 | 0.253 | 0.217 | 0.253 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.757 | 4.775 | 4.745 | 4.775 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.188 | 156.880 | 155.382 | 156.880 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1439.763 | 1463.540 | 1425.751 | 1463.540 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.216 | 0.234 | 0.208 | 0.234 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.685 | 3.892 | 3.541 | 3.892 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.031 | 0.021 | 0.031 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.638 | 0.657 | 0.625 | 0.657 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.609 | 1.824 | 1.344 | 1.824 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 8.280 | 8.597 | 7.466 | 8.597 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.214 | 0.252 | 0.214 | 0.252 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.745 | 4.815 | 4.735 | 4.815 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.891 | 157.789 | 155.833 | 157.789 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1434.581 | 1441.222 | 1429.988 | 1441.222 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.214 | 0.245 | 0.214 | 0.245 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.721 | 4.037 | 3.597 | 4.037 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.027 | 0.019 | 0.027 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.646 | 0.680 | 0.643 | 0.680 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 1.967 | 3.506 | 1.730 | 3.506 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 8.208 | 8.662 | 7.594 | 8.662 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.203 | 0.210 | 0.199 | 0.210 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 5.086 | 5.433 | 4.887 | 5.433 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.726 | 158.313 | 156.201 | 158.313 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1444.889 | 1460.893 | 1429.030 | 1460.893 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.232 | 0.630 | 0.208 | 0.630 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.619 | 3.754 | 3.591 | 3.754 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.032 | 0.022 | 0.032 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.646 | 0.670 | 0.640 | 0.670 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.881 | 4.436 | 1.766 | 4.436 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.600 | 8.074 | 7.413 | 8.074 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.216 | 0.247 | 0.214 | 0.247 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.792 | 4.897 | 4.727 | 4.897 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.398 | 169.154 | 156.154 | 169.154 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1440.021 | 1451.575 | 1430.879 | 1451.575 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.222 | 0.263 | 0.219 | 0.263 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.675 | 4.399 | 3.583 | 4.399 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.023 | 0.020 | 0.023 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.660 | 0.675 | 0.637 | 0.675 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.015 | 2.814 | 1.820 | 2.814 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 8.217 | 9.305 | 7.879 | 9.305 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.245 | 0.259 | 0.223 | 0.259 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.753 | 4.968 | 4.741 | 4.968 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.685 | 159.214 | 155.039 | 159.214 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1460.473 | 1471.132 | 1428.952 | 1471.132 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.182 | 0.196 | 0.167 | 0.196 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.624 | 3.722 | 3.602 | 3.722 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.041 | 0.023 | 0.041 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.669 | 0.697 | 0.656 | 0.697 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.289 | 2.513 | 1.847 | 2.513 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 7.665 | 8.435 | 7.590 | 8.435 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.213 | 0.217 | 0.210 | 0.217 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.765 | 4.872 | 4.753 | 4.872 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.336 | 172.495 | 157.656 | 172.495 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1464.801 | 1611.683 | 1462.008 | 1611.683 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.210 | 0.247 | 0.181 | 0.247 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.157 | 2.227 | 2.131 | 2.227 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.037 | 0.057 | 0.028 | 0.057 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.432 | 0.662 | 0.429 | 0.662 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 150.107 | 153.752 | 150.013 | 153.752 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 635.920 | 644.589 | 612.696 | 644.589 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.373 | 0.412 | 0.294 | 0.412 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.162 | 3.510 | 3.020 | 3.510 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.664 | 172.234 | 158.000 | 172.234 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1444.655 | 1476.707 | 1441.193 | 1476.707 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.183 | 0.255 | 0.163 | 0.255 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.201 | 2.236 | 2.150 | 2.236 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.029 | 0.021 | 0.029 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.485 | 0.518 | 0.476 | 0.518 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.380 | 5.948 | 3.943 | 5.948 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 20.950 | 24.826 | 20.674 | 24.826 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.237 | 0.320 | 0.225 | 0.320 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.166 | 3.261 | 3.070 | 3.261 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 152.998 | 158.053 | 152.025 | 158.053 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1432.859 | 1724.955 | 1427.402 | 1724.955 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.133 | 0.161 | 0.126 | 0.161 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.888 | 1.978 | 1.843 | 1.978 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.024 | 0.163 | 0.023 | 0.163 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.335 | 0.365 | 0.312 | 0.365 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.541 | 0.547 | 0.520 | 0.547 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.922 | 3.149 | 2.763 | 3.149 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.194 | 0.356 | 0.172 | 0.356 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.649 | 2.863 | 2.579 | 2.863 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 155.440 | 169.946 | 152.491 | 169.946 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1410.481 | 1462.014 | 1407.002 | 1462.014 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.154 | 0.162 | 0.139 | 0.162 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.873 | 1.926 | 1.864 | 1.926 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.020 | 0.028 | 0.020 | 0.028 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.328 | 0.347 | 0.320 | 0.347 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.881 | 0.981 | 0.851 | 0.981 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.269 | 5.641 | 5.256 | 5.641 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.149 | 0.154 | 0.146 | 0.154 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.667 | 2.726 | 2.649 | 2.726 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 292.442 | 298.455 | 286.726 | 298.455 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1961.285 | 2029.668 | 1944.966 | 2029.668 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.097 | 175.548 | 160.804 | 175.548 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1573.687 | 1621.942 | 1559.909 | 1621.942 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.133 | 0.155 | 0.105 | 0.155 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.148 | 2.256 | 2.088 | 2.256 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.025 | 0.028 | 0.017 | 0.028 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.446 | 0.492 | 0.421 | 0.492 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.024 | 0.029 | 0.022 | 0.029 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.524 | 0.559 | 0.500 | 0.559 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.610 | 5.308 | 4.486 | 5.308 | 144.3 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 127.857 | 138.167 | 123.847 | 138.167 | 253.8 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 163.254 | 175.728 | 161.867 | 175.728 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1513.898 | 1518.288 | 1509.988 | 1518.288 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.448 | 162.673 | 154.284 | 162.673 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1526.048 | 1540.733 | 1498.032 | 1540.733 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.178 | 0.252 | 0.162 | 0.252 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.690 | 4.319 | 3.539 | 4.319 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.021 | 0.028 | 0.018 | 0.028 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.680 | 0.708 | 0.661 | 0.708 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.039 | 0.050 | 0.028 | 0.050 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.531 | 0.575 | 0.510 | 0.575 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.977 | 1.369 | 0.927 | 1.369 | 140.9 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 72.444 | 76.106 | 70.718 | 76.106 | 253.8 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 169.091 | 201.574 | 167.699 | 201.574 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1450.572 | 1485.012 | 1444.946 | 1485.012 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.933 | 173.874 | 157.217 | 173.874 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1448.636 | 1476.387 | 1446.163 | 1476.387 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.189 | 0.369 | 0.148 | 0.369 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.841 | 3.932 | 3.810 | 3.932 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.027 | 0.017 | 0.027 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.820 | 0.836 | 0.787 | 0.836 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.121 | 0.130 | 0.110 | 0.130 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.648 | 0.666 | 0.629 | 0.666 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.930 | 1.033 | 0.910 | 1.033 | 153.1 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 19.927 | 33.184 | 19.735 | 33.184 | 253.8 |
| warm-start-flat-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 107.257 | 109.013 | 106.880 | 109.013 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-fit | python-prophet | 6 | 393.262 | 406.057 | 391.317 | 406.057 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 6.559 | 6.865 | 6.362 | 6.865 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 8.359 | 8.933 | 8.287 | 8.933 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `c8e0ac696ab935429e6c9466a88935b409a8da6f`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-flat-additive`, `country-explicit-us-flat-additive`, `country-us-flat-multiplicative`, `country-explicit-us-flat-multiplicative`, `country-boundary-flat`, `country-empty-bv-flat`, `country-explicit-empty-flat`, `country-estimated-sg-flat`, `country-partial-in-flat`, `country-mixed-us-flat`, `country-none-flat-730`, `country-se-flat-730`, `country-explicit-se-flat-730`, `country-cn-flat-730`, `country-explicit-cn-flat-730`, `country-none-flat-2190`, `country-se-flat-2190`, `country-explicit-se-flat-2190`, `country-cn-flat-2190`, `country-explicit-cn-flat-2190`, `country-none-flat-2190-batch-32`, `country-se-flat-2190-batch-32`, `country-explicit-se-flat-2190-batch-32`, `country-uncertainty-us-flat`, `map-training-zero-span-flat-varied`, `map-training-zero-span-flat-constant`, `flat-mixed-components`, `flat-mixed-components-large`, `uncertainty-flat-defaults-seasonal-intervals-1000`, `uncertainty-flat-mixed-components-full-intervals-512`, `uncertainty-flat-mixed-components-large-full-samples-128`, `anomalies-flat-defaults-99`, `warm-start-flat-defaults-7-new-rows`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `evaluation-flat-large-months-metrics`, `flat-defaults-level`, `flat-defaults-seasonal`, `flat-defaults-negative`, `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`, `flat-additive-components`, `flat-additive-components-large`, `flat-mixed-components-absmax-defaults`, `flat-correlated-regressors`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:bd623c697976c1db3281c474b5cd04635ebdee459563e4916ddc70ca4d297651`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:1590afe8612860fb938dcb91de6e620a3bbfa84ef7e3752109fe9fdb6a7de4f1`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.6`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: warm-uncertainty/evaluation/country lifecycle: worker high-water RSS via process.resourceUsage.maxRSS (Linux KiB); includes imports and previous operations; excludes subprocess peaks; heap/WASM-only peaks unavailable; Effect tracing disabled

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/aarch64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `input-numeric-dtype=float64`, `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation/country lifecycle: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

