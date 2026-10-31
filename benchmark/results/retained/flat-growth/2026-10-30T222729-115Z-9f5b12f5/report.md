# Effect Prophet benchmark — 2026-10-30T222729-115Z-9f5b12f5

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
| evaluation-flat-large-parallel | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 4.904e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
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
| flat-regressor-model | equivalent-objective | passed | 2.250e-11 | 2.637e-4 | 2.637e-4 | 2.637e-4 | 5.001e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |
| uncertainty-flat-regressor-model-intervals-1000 | scalar-process-different-public-work | passed | 2.250e-11 | 2.637e-4 | 2.637e-4 | 2.637e-4 | 5.001e-13 | 0.261 | Verified fitted point behavior under flat-map-additive-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
| evaluation-flat-regressor-model-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.239e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-regressor-model-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.239e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-flat-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12254 | 25351 |
| country-us-flat-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12254 | 25351 |
| country-explicit-us-flat-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3535 | 28167 |
| country-explicit-us-flat-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3535 | 28167 |
| country-us-flat-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12276 | 25372 |
| country-us-flat-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12276 | 25372 |
| country-explicit-us-flat-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3545 | 28188 |
| country-explicit-us-flat-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3545 | 28188 |
| country-boundary-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2010 | 13 | 11509 | 25601 |
| country-boundary-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2010 | 13 | 11509 | 25601 |
| country-empty-bv-flat | 0 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 0 | 2904 | 19084 |
| country-empty-bv-flat | 1 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 0 | 2904 | 19084 |
| country-explicit-empty-flat | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 570 | 19084 |
| country-explicit-empty-flat | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 570 | 19084 |
| country-estimated-sg-flat | 0 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 11 | 13181 | 23312 |
| country-estimated-sg-flat | 1 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 11 | 13181 | 23312 |
| country-partial-in-flat | 0 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2036 | 10 | 16613 | 23664 |
| country-partial-in-flat | 1 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2036 | 10 | 16613 | 23664 |
| country-mixed-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12579 | 31303 |
| country-mixed-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12579 | 31303 |
| country-none-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 586 | 122498 |
| country-none-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 586 | 122498 |
| country-se-flat-730 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-se-flat-730 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-explicit-se-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 25756 | 159826 |
| country-explicit-se-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 25756 | 159826 |
| country-cn-flat-730 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-cn-flat-730 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-explicit-cn-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 26 | 10007 | 165955 |
| country-explicit-cn-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 26 | 10007 | 165955 |
| country-none-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 50561 | 430748 |
| country-explicit-se-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 50561 | 430748 |
| country-cn-flat-2190 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-cn-flat-2190 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-explicit-cn-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 56 | 21026 | 534811 |
| country-explicit-cn-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 56 | 21026 | 534811 |
| country-none-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190-batch-32 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190-batch-32 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 44365 | 423057 |
| country-explicit-se-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 14 | 44365 | 423057 |
| country-uncertainty-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12254 | 25352 |
| country-uncertainty-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12254 | 25352 |

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
| uncertainty-flat-regressor-model-intervals-1000 | 730 | 26 | 25 | 180 | 180 | 180 | 1000 | intervals | 67108864 | flat-correlated-regressors-v1:level=40+0.6*temperature(yearly-tracking,future+6)+yearly(phase=1)+weekly+constant-baseline+bounded-noise-x5:n=730:h=180 / bf69b68aa75b99e49972817a6f5e24654c3deabc452fa563fa2eee0340a9b121 | docs/validation/uncertainty.md#evidence-classes |

## Warm-start workloads

Warm-start cases fit the first rows of a history, read that fit's Stan parameters with `warmStartParameters` or `warm_start_params`, and refit the whole history from them. That refit is the model every correctness gate and prediction phase uses. `warm-start-fit` times the refit alone; the base fit is untimed. `warm-fit` times a fresh fit of the same history for comparison.

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Effect runs folds one at a time. Python runs them sequentially too, except in `-threads` and `-processes` phases, which time `cross_validation(parallel=...)` with Prophet's default pools and must return the sequential point rows and search scores exactly. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 128 | 19 / 0.8 | horizons | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons | d27263ab5e5b8f488de56085850577bb13a87b5ad4dca13da9039ce8de013341, ac378f98946578839b9dc1c9dbd10cc73c207ee8c103ad3c437807ee60fab209, d76d1f1e1ceb3370113274ddc7a004255a238dcdea9959d517623cb508c5da64 |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 0 | n/a / n/a | rolling | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 128 | 19 / 0.8 | rolling | n/a |
| evaluation-flat-large-months-metrics | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 3 | 436 | 273 | 6 | 25 | 0 | n/a / n/a | rolling | n/a |
| evaluation-flat-large-parallel | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 12 | 2526 | 84 | 6 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-flat-regressor-model-point | flat-correlated-regressors-v1:level=40+0.6*temperature(yearly-tracking,future+6)+yearly(phase=1)+weekly+constant-baseline+bounded-noise-x5:n=730:h=180 / bf69b68aa75b99e49972817a6f5e24654c3deabc452fa563fa2eee0340a9b121 | flat | 0 | 2 | 1418 | 14 | 26 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-flat-regressor-model-intervals | flat-correlated-regressors-v1:level=40+0.6*temperature(yearly-tracking,future+6)+yearly(phase=1)+weekly+constant-baseline+bounded-noise-x5:n=730:h=180 / bf69b68aa75b99e49972817a6f5e24654c3deabc452fa563fa2eee0340a9b121 | flat | 0 | 2 | 1418 | 14 | 26 | 25 | 128 | 19 / 0.8 | horizons | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-flat-defaults-99 | warm-anomalies | effect-prophet | 6 | 10.223 | 10.920 | 9.394 | 10.920 | n/a |
| anomalies-flat-defaults-99 | warm-anomalies | python-prophet | 6 | 131.745 | 144.762 | 129.194 | 144.762 | n/a |
| anomalies-flat-defaults-99 | warm-fit | effect-prophet | 6 | 1.795 | 2.529 | 1.657 | 2.529 | n/a |
| anomalies-flat-defaults-99 | warm-fit | python-prophet | 6 | 6.748 | 7.501 | 6.641 | 7.501 | n/a |
| anomalies-flat-defaults-99 | warm-uncertainty | effect-prophet | 6 | 6.456 | 7.138 | 6.420 | 7.138 | 149.6 |
| anomalies-flat-defaults-99 | warm-uncertainty | python-prophet | 6 | 131.324 | 145.260 | 120.627 | 145.260 | 256.0 |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.019 | 0.011 | 0.019 | 136.5 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.447 | 0.480 | 0.432 | 0.480 | 256.0 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 197.656 | 246.575 | 192.029 | 246.575 | 155.9 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1676.544 | 1701.607 | 1668.239 | 1701.607 | 256.0 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 161.764 | 167.757 | 159.944 | 167.757 | 158.8 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1588.202 | 1622.521 | 1576.984 | 1622.521 | 256.0 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.849 | 1.060 | 0.765 | 1.060 | 155.9 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.240 | 3.485 | 3.199 | 3.485 | 256.0 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.094 | 0.121 | 0.074 | 0.121 | 155.9 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.521 | 0.538 | 0.486 | 0.538 | 256.0 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.587 | 25.162 | 21.377 | 25.162 | 154.7 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 72.957 | 75.286 | 72.313 | 75.286 | 256.0 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 21.902 | 22.142 | 21.635 | 22.142 | 152.8 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 71.513 | 76.345 | 71.482 | 76.345 | 256.0 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 21.892 | 22.291 | 21.801 | 22.291 | 147.5 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 67.791 | 89.064 | 65.131 | 89.064 | 256.0 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.301 | 0.331 | 0.292 | 0.331 | 149.7 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.483 | 6.244 | 5.395 | 6.244 | 256.0 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 185.054 | 249.596 | 184.785 | 249.596 | 260.2 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1616.736 | 1666.991 | 1598.025 | 1666.991 | 256.0 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.873 | 4.207 | 2.826 | 4.207 | 260.1 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.112 | 9.303 | 9.063 | 9.303 | 256.0 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.119 | 2.093 | 0.099 | 2.093 | 259.8 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.071 | 3.499 | 3.017 | 3.499 | 256.0 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 21.951 | 30.711 | 21.081 | 30.711 | 207.3 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 83.090 | 84.482 | 82.587 | 84.482 | 256.0 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.181 | 3.846 | 2.709 | 3.846 | 222.4 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.820 | 9.013 | 8.714 | 9.013 | 256.0 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 176.599 | 178.948 | 175.815 | 178.948 | 198.7 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1608.051 | 1656.099 | 1576.288 | 1656.099 | 256.0 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.698 | 1.921 | 1.691 | 1.921 | 196.3 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.041 | 5.173 | 4.883 | 5.173 | 256.0 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.257 | 0.290 | 0.244 | 0.290 | 196.3 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.244 | 1.316 | 1.232 | 1.316 | 256.0 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 7.838 | 9.704 | 7.368 | 9.704 | 155.7 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 24.591 | 28.763 | 24.042 | 28.763 | 256.0 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 4.068 | 5.093 | 2.350 | 5.093 | 196.2 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 7.120 | 7.374 | 6.872 | 7.374 | 256.0 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.017 | 0.011 | 0.017 | 136.2 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.465 | 0.521 | 0.437 | 0.521 | 256.0 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 171.183 | 177.625 | 169.605 | 177.625 | 151.1 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1604.653 | 1638.926 | 1586.771 | 1638.926 | 256.0 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 159.506 | 164.824 | 158.025 | 164.824 | 151.8 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1653.825 | 1942.735 | 1593.489 | 1942.735 | 256.0 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.250 | 0.273 | 0.196 | 0.273 | 151.2 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.077 | 2.174 | 2.019 | 2.174 | 256.0 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.042 | 0.069 | 0.029 | 0.069 | 151.1 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.418 | 0.472 | 0.403 | 0.472 | 256.0 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.542 | 2.288 | 1.475 | 2.288 | 150.0 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 13.041 | 13.899 | 12.950 | 13.899 | 256.0 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.645 | 1.994 | 1.565 | 1.994 | 149.7 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.358 | 12.503 | 12.290 | 12.503 | 256.0 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.589 | 3.929 | 2.440 | 3.929 | 148.1 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.390 | 9.698 | 9.181 | 9.698 | 256.0 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.153 | 0.182 | 0.119 | 0.182 | 148.3 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.070 | 3.138 | 3.036 | 3.138 | 256.0 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.050 | 0.077 | 0.032 | 0.077 | 145.4 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.583 | 0.610 | 0.553 | 0.610 | 256.0 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 203.854 | 212.000 | 197.313 | 212.000 | 187.5 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1660.274 | 1700.508 | 1643.008 | 1700.508 | 256.0 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 173.349 | 205.189 | 168.080 | 205.189 | 194.1 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1595.142 | 1624.873 | 1586.022 | 1624.873 | 256.0 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 0.845 | 2.014 | 0.812 | 2.014 | 192.5 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.195 | 3.326 | 3.080 | 3.326 | 256.0 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.097 | 0.128 | 0.088 | 0.128 | 188.0 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.506 | 0.541 | 0.490 | 0.541 | 256.0 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 20.582 | 21.708 | 20.456 | 21.708 | 186.9 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 69.013 | 69.828 | 67.698 | 69.828 | 256.0 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 20.842 | 23.445 | 20.045 | 23.445 | 168.9 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 68.994 | 69.934 | 68.739 | 69.934 | 256.0 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 19.158 | 21.179 | 18.937 | 21.179 | 151.4 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 62.544 | 69.868 | 62.264 | 69.868 | 256.0 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.745 | 2.086 | 1.434 | 2.086 | 154.2 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.234 | 5.656 | 5.159 | 5.656 | 256.0 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 206.065 | 252.495 | 188.923 | 252.495 | 241.1 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1443.598 | 1461.317 | 1431.453 | 1461.317 | 256.0 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.029 | 2.300 | 1.847 | 2.300 | 232.7 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.119 | 10.623 | 9.966 | 10.623 | 256.0 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.033 | 0.061 | 0.028 | 0.061 | 226.5 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.311 | 3.477 | 3.275 | 3.477 | 256.0 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 21.608 | 24.913 | 19.461 | 24.913 | 202.3 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 80.948 | 97.063 | 79.149 | 97.063 | 256.0 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.670 | 4.080 | 3.013 | 4.080 | 217.6 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.164 | 9.914 | 9.054 | 9.914 | 256.0 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 175.875 | 278.673 | 168.899 | 278.673 | 207.1 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1465.065 | 1515.252 | 1430.027 | 1515.252 | 256.0 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.922 | 1.328 | 0.842 | 1.328 | 200.9 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.761 | 5.838 | 5.710 | 5.838 | 256.0 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.029 | 0.044 | 0.021 | 0.044 | 189.8 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.441 | 1.454 | 1.421 | 1.454 | 256.0 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 5.853 | 7.865 | 5.403 | 7.865 | 160.2 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 20.658 | 20.790 | 20.480 | 20.790 | 256.0 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.947 | 4.468 | 2.507 | 4.468 | 180.2 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.684 | 19.727 | 6.474 | 19.727 | 256.0 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.012 | 0.011 | 0.012 | 135.2 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.517 | 0.423 | 0.517 | 256.0 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 166.621 | 198.982 | 163.222 | 198.982 | 151.8 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1450.936 | 1532.911 | 1417.079 | 1532.911 | 256.0 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 159.109 | 168.746 | 155.845 | 168.746 | 152.1 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1429.014 | 1479.670 | 1414.130 | 1479.670 | 256.0 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.076 | 0.188 | 0.073 | 0.188 | 152.1 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.095 | 2.463 | 2.043 | 2.463 | 256.0 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.018 | 0.029 | 0.018 | 0.029 | 151.8 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.440 | 0.509 | 0.408 | 0.509 | 256.0 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.088 | 1.146 | 1.073 | 1.146 | 151.7 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.334 | 11.554 | 11.164 | 11.554 | 256.0 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.806 | 3.169 | 1.134 | 3.169 | 151.6 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 10.680 | 11.025 | 10.582 | 11.025 | 256.0 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.976 | 3.281 | 1.710 | 3.281 | 142.6 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.433 | 9.041 | 8.191 | 9.041 | 256.0 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.158 | 0.208 | 0.133 | 0.208 | 144.1 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.660 | 4.021 | 2.593 | 4.021 | 256.0 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 173.541 | 179.038 | 172.704 | 179.038 | 196.5 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1450.458 | 1532.602 | 1432.183 | 1532.602 | 256.0 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.750 | 3.571 | 2.717 | 3.571 | 195.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.312 | 7.615 | 7.232 | 7.615 | 256.0 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.043 | 0.058 | 0.040 | 0.058 | 193.9 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.889 | 2.934 | 2.864 | 2.934 | 256.0 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 12.363 | 18.184 | 11.909 | 18.184 | 177.9 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 39.342 | 52.685 | 38.427 | 52.685 | 256.0 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.379 | 0.556 | 0.361 | 0.556 | 192.4 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 12.078 | 12.097 | 11.932 | 12.097 | 256.0 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 186.870 | 656.767 | 181.372 | 656.767 | 204.3 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1460.900 | 1503.109 | 1445.593 | 1503.109 | 256.0 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 3.225 | 3.698 | 3.057 | 3.698 | 202.2 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.401 | 8.437 | 7.256 | 8.437 | 256.0 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.050 | 0.055 | 0.048 | 0.055 | 197.3 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.905 | 4.211 | 2.881 | 4.211 | 256.0 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 14.095 | 17.643 | 12.640 | 17.643 | 188.8 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 40.373 | 53.734 | 40.051 | 53.734 | 256.0 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.828 | 2.566 | 1.809 | 2.566 | 195.0 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.487 | 14.512 | 13.240 | 14.512 | 256.0 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 174.111 | 179.014 | 172.621 | 179.014 | 187.4 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1448.772 | 1551.806 | 1428.327 | 1551.806 | 256.0 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.085 | 2.873 | 1.681 | 2.873 | 178.3 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.228 | 5.367 | 5.165 | 5.367 | 256.0 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.033 | 0.038 | 0.031 | 0.038 | 162.5 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.447 | 1.482 | 1.426 | 1.482 | 256.0 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.801 | 6.629 | 5.113 | 6.629 | 156.8 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 18.793 | 19.011 | 18.589 | 19.011 | 256.0 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 1.858 | 2.455 | 1.733 | 2.455 | 161.0 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 8.908 | 9.003 | 8.841 | 9.003 | 256.0 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.022 | 0.013 | 0.022 | 141.3 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.486 | 0.502 | 0.471 | 0.502 | 256.0 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 187.134 | 206.497 | 184.345 | 206.497 | 158.7 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1492.637 | 1503.674 | 1481.858 | 1503.674 | 256.0 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 158.083 | 165.161 | 156.938 | 165.161 | 158.8 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1431.785 | 1540.509 | 1427.071 | 1540.509 | 256.0 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.429 | 0.692 | 0.413 | 0.692 | 158.8 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 3.980 | 4.115 | 3.909 | 4.115 | 256.0 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.035 | 0.046 | 0.022 | 0.046 | 158.7 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.707 | 0.722 | 0.675 | 0.722 | 256.0 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 12.853 | 12.951 | 12.806 | 12.951 | 158.6 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 48.684 | 53.771 | 47.034 | 53.771 | 256.0 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.023 | 13.170 | 12.927 | 13.170 | 154.9 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 46.871 | 51.319 | 46.700 | 51.319 | 256.0 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 13.791 | 14.878 | 13.762 | 14.878 | 154.8 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 41.883 | 42.874 | 41.495 | 42.874 | 256.0 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.193 | 0.235 | 0.154 | 0.235 | 154.8 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.775 | 4.910 | 4.705 | 4.910 | 256.0 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.042 | 0.010 | 0.042 | 143.3 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.471 | 0.483 | 0.435 | 0.483 | 256.0 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 171.343 | 185.251 | 169.031 | 185.251 | 158.9 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1442.653 | 1478.958 | 1425.850 | 1478.958 | 256.0 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.454 | 160.787 | 156.170 | 160.787 | 158.9 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1455.283 | 1485.937 | 1440.263 | 1485.937 | 256.0 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.414 | 0.507 | 0.414 | 0.507 | 158.9 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 4.014 | 4.296 | 3.976 | 4.296 | 256.0 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.023 | 0.033 | 0.022 | 0.033 | 158.9 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.715 | 0.752 | 0.706 | 0.752 | 256.0 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.560 | 3.360 | 2.548 | 3.360 | 158.5 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.466 | 18.855 | 18.291 | 18.855 | 256.0 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.832 | 2.963 | 2.753 | 2.963 | 158.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 17.991 | 18.308 | 17.543 | 18.308 | 256.0 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.387 | 3.620 | 3.377 | 3.620 | 152.5 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.151 | 13.411 | 12.890 | 13.411 | 256.0 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.174 | 0.194 | 0.156 | 0.194 | 158.4 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.630 | 4.814 | 4.618 | 4.814 | 256.0 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.054 | 0.068 | 0.036 | 0.068 | 144.1 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.499 | 0.523 | 0.491 | 0.523 | 256.0 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 194.397 | 224.653 | 189.864 | 224.653 | 169.1 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1670.125 | 1711.128 | 1637.333 | 1711.128 | 256.0 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 161.890 | 191.759 | 161.295 | 191.759 | 175.1 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1603.592 | 1632.649 | 1590.008 | 1632.649 | 256.0 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.978 | 1.363 | 0.847 | 1.363 | 175.1 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.390 | 4.669 | 4.340 | 4.669 | 256.0 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.127 | 0.145 | 0.120 | 0.145 | 173.0 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.749 | 0.786 | 0.735 | 0.786 | 256.0 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 17.210 | 19.256 | 16.792 | 19.256 | 165.5 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 66.581 | 68.471 | 62.415 | 68.471 | 256.0 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 17.205 | 18.863 | 17.029 | 18.863 | 158.6 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 61.935 | 70.033 | 61.396 | 70.033 | 256.0 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.813 | 19.940 | 17.366 | 19.940 | 156.1 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 55.349 | 57.096 | 54.356 | 57.096 | 256.0 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.254 | 0.278 | 0.229 | 0.278 | 156.1 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.407 | 22.964 | 6.181 | 22.964 | 256.0 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 178.980 | 202.359 | 164.814 | 202.359 | 175.0 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1434.719 | 1522.425 | 1428.878 | 1522.425 | 256.0 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.126 | 0.259 | 0.077 | 0.259 | 161.5 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.685 | 4.777 | 4.634 | 4.777 | 256.0 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.014 | 0.021 | 0.013 | 0.021 | 157.9 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.320 | 2.366 | 2.300 | 2.366 | 256.0 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.379 | 8.712 | 6.222 | 8.712 | 156.4 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 16.057 | 31.306 | 15.139 | 31.306 | 256.0 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.220 | 0.680 | 0.193 | 0.680 | 156.9 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.645 | 2.741 | 2.587 | 2.741 | 256.0 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 169.915 | 205.014 | 167.778 | 205.014 | 190.6 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1437.569 | 1447.012 | 1424.391 | 1447.012 | 256.0 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.133 | 0.280 | 0.090 | 0.280 | 188.9 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.823 | 5.375 | 4.798 | 5.375 | 256.0 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 173.2 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.319 | 2.522 | 2.246 | 2.522 | 256.0 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 6.847 | 8.743 | 6.105 | 8.743 | 155.2 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 15.535 | 29.843 | 15.207 | 29.843 | 256.0 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 2.383 | 3.288 | 1.820 | 3.288 | 166.2 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.769 | 2.835 | 2.749 | 2.835 | 256.0 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 169.253 | 193.802 | 165.405 | 193.802 | 157.5 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1445.505 | 1535.101 | 1420.810 | 1535.101 | 256.0 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.097 | 0.149 | 0.080 | 0.149 | 156.9 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.936 | 4.243 | 2.888 | 4.243 | 256.0 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.014 | 0.035 | 0.013 | 0.035 | 156.4 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.018 | 1.066 | 1.010 | 1.066 | 256.0 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 2.862 | 4.907 | 2.565 | 4.907 | 155.2 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.178 | 9.453 | 8.134 | 9.453 | 256.0 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.490 | 1.831 | 1.356 | 1.831 | 156.3 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.828 | 2.907 | 2.772 | 2.907 | 256.0 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.020 | 0.012 | 0.020 | 139.1 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.470 | 0.481 | 0.465 | 0.481 | 256.0 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 177.597 | 195.495 | 175.646 | 195.495 | 152.7 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1613.225 | 1720.159 | 1589.837 | 1720.159 | 256.0 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 161.824 | 172.240 | 161.777 | 172.240 | 166.1 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1609.147 | 1646.076 | 1580.008 | 1646.076 | 256.0 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.219 | 1.351 | 1.102 | 1.351 | 164.2 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.100 | 3.246 | 3.057 | 3.246 | 256.0 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.127 | 0.163 | 0.104 | 0.163 | 154.6 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.497 | 0.526 | 0.496 | 0.526 | 256.0 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.568 | 4.223 | 3.098 | 4.223 | 152.4 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 21.368 | 23.275 | 21.154 | 23.275 | 256.0 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 4.042 | 4.697 | 3.556 | 4.697 | 151.7 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 20.244 | 20.583 | 20.204 | 20.583 | 256.0 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 4.167 | 5.127 | 3.763 | 5.127 | 148.8 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.563 | 16.189 | 15.291 | 16.189 | 256.0 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.169 | 0.221 | 0.148 | 0.221 | 150.4 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.940 | 5.179 | 4.857 | 5.179 | 256.0 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 183.687 | 198.475 | 178.073 | 198.475 | 202.2 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1623.516 | 1666.505 | 1599.290 | 1666.505 | 256.0 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 4.910 | 5.368 | 4.702 | 5.368 | 200.9 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 6.049 | 6.690 | 5.851 | 6.690 | 256.0 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.321 | 0.894 | 0.276 | 0.894 | 195.4 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.530 | 2.576 | 2.450 | 2.576 | 256.0 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 18.771 | 23.478 | 15.434 | 23.478 | 190.6 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 42.255 | 43.332 | 41.742 | 43.332 | 256.0 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.519 | 0.572 | 0.489 | 0.572 | 192.9 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.218 | 7.541 | 7.120 | 7.541 | 256.0 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 189.785 | 240.878 | 186.603 | 240.878 | 215.9 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1609.123 | 1940.685 | 1596.400 | 1940.685 | 256.0 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.922 | 5.468 | 4.536 | 5.468 | 208.9 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.864 | 5.963 | 5.806 | 5.963 | 256.0 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.318 | 0.372 | 0.269 | 0.372 | 203.9 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.526 | 2.916 | 2.463 | 2.916 | 256.0 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 18.215 | 22.383 | 13.961 | 22.383 | 193.2 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 43.627 | 44.604 | 41.982 | 44.604 | 256.0 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.103 | 3.301 | 1.914 | 3.301 | 200.5 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.779 | 9.107 | 8.559 | 9.107 | 256.0 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 177.510 | 191.683 | 176.284 | 191.683 | 205.1 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1598.194 | 1634.912 | 1586.093 | 1634.912 | 256.0 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.942 | 4.293 | 2.907 | 4.293 | 203.9 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.178 | 4.239 | 4.093 | 4.239 | 256.0 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.284 | 0.305 | 0.267 | 0.305 | 199.0 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.153 | 1.179 | 1.121 | 1.179 | 256.0 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 8.551 | 10.616 | 8.013 | 10.616 | 172.0 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 21.323 | 23.205 | 21.165 | 23.205 | 256.0 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.269 | 3.217 | 2.155 | 3.217 | 196.4 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.675 | 9.976 | 8.578 | 9.976 | 256.0 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 189.144 | 192.856 | 185.441 | 192.856 | 146.2 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1661.255 | 1680.518 | 1639.307 | 1680.518 | 256.0 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 161.645 | 164.074 | 159.369 | 164.074 | 150.5 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1615.383 | 1675.915 | 1607.112 | 1675.915 | 256.0 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.444 | 2.083 | 1.254 | 2.083 | 150.3 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.915 | 4.029 | 3.875 | 4.029 | 256.0 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.088 | 0.115 | 0.086 | 0.115 | 146.2 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.699 | 0.730 | 0.662 | 0.730 | 256.0 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 136.7 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.446 | 0.459 | 0.425 | 0.459 | 256.0 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.328 | 0.371 | 0.319 | 0.371 | 141.5 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.568 | 14.766 | 14.466 | 14.766 | 256.0 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.028 | 0.012 | 0.028 | 142.1 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.452 | 0.487 | 0.432 | 0.487 | 256.0 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 189.961 | 202.477 | 187.349 | 202.477 | 158.8 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1689.436 | 1862.585 | 1659.435 | 1862.585 | 256.0 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 165.931 | 175.360 | 159.934 | 175.360 | 161.6 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1621.089 | 1681.403 | 1607.942 | 1681.403 | 256.0 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.768 | 0.814 | 0.743 | 0.814 | 158.8 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 3.939 | 4.092 | 3.875 | 4.092 | 256.0 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.096 | 0.119 | 0.085 | 0.119 | 158.8 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.714 | 0.758 | 0.683 | 0.758 | 256.0 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.838 | 14.609 | 13.707 | 14.609 | 157.5 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 51.733 | 64.185 | 51.560 | 64.185 | 256.0 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.852 | 14.308 | 13.753 | 14.308 | 155.6 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 51.443 | 53.970 | 50.469 | 53.970 | 256.0 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 14.331 | 16.150 | 14.061 | 16.150 | 153.0 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 45.183 | 46.007 | 44.910 | 46.007 | 256.0 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.234 | 0.295 | 0.205 | 0.295 | 153.0 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.500 | 6.121 | 5.439 | 6.121 | 256.0 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | 138.1 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.509 | 0.598 | 0.476 | 0.598 | 256.0 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 173.746 | 179.847 | 173.151 | 179.847 | 160.0 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1608.482 | 1680.872 | 1600.537 | 1680.872 | 256.0 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.843 | 160.177 | 157.398 | 160.177 | 162.9 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1614.132 | 1652.042 | 1602.299 | 1652.042 | 256.0 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.811 | 0.908 | 0.763 | 0.908 | 160.0 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.972 | 4.168 | 3.913 | 4.168 | 256.0 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.096 | 0.118 | 0.079 | 0.118 | 160.0 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.703 | 0.781 | 0.693 | 0.781 | 256.0 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.325 | 3.506 | 3.293 | 3.506 | 158.9 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 22.612 | 23.796 | 22.429 | 23.796 | 256.0 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.652 | 4.083 | 3.489 | 4.083 | 156.9 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 22.302 | 27.994 | 22.084 | 27.994 | 256.0 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.988 | 4.083 | 3.910 | 4.083 | 153.1 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 16.280 | 16.598 | 16.169 | 16.598 | 256.0 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.276 | 0.324 | 0.250 | 0.324 | 155.4 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.481 | 5.514 | 5.377 | 5.514 | 256.0 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 8.580 | 8.811 | 8.425 | 8.811 | 155.1 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 46.992 | 49.123 | 46.684 | 49.123 | 256.0 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.199 | 1.372 | 1.151 | 1.372 | 159.4 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 10.038 | 10.476 | 9.927 | 10.476 | 256.0 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.366 | 0.384 | 0.336 | 0.384 | 158.9 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.031 | 5.135 | 5.020 | 5.135 | 256.0 |
| evaluation-flat-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.483 | 0.736 | 0.460 | 0.736 | 153.4 |
| evaluation-flat-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.510 | 5.634 | 5.459 | 5.634 | 256.0 |
| evaluation-flat-large-parallel | evaluation-point-processes | python-prophet | 4 | 1533.854 | 1564.628 | 1495.877 | 1564.628 | 256.0 |
| evaluation-flat-large-parallel | evaluation-point-threads | python-prophet | 4 | 203.147 | 205.320 | 198.666 | 205.320 | 256.0 |
| evaluation-flat-large-parallel | evaluation-point | effect-prophet | 4 | 22.609 | 23.609 | 21.823 | 23.609 | 173.6 |
| evaluation-flat-large-parallel | evaluation-point | python-prophet | 4 | 177.488 | 192.303 | 176.747 | 192.303 | 256.0 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 191.159 | 197.724 | 187.779 | 197.724 | 154.1 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1466.638 | 1490.354 | 1456.673 | 1490.354 | 256.0 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.694 | 2.799 | 2.634 | 2.799 | 153.5 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.362 | 1.402 | 1.332 | 1.402 | 256.0 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.112 | 0.118 | 0.102 | 0.118 | 130.4 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.518 | 0.578 | 0.502 | 0.578 | 256.0 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.101 | 0.104 | 0.083 | 0.104 | 153.1 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.259 | 5.697 | 5.240 | 5.697 | 256.0 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.992 | 2.503 | 1.921 | 2.503 | 134.7 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.778 | 0.827 | 0.751 | 0.827 | 256.0 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.009 | 8.244 | 5.945 | 8.244 | 152.4 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 39.439 | 40.281 | 39.249 | 40.281 | 256.0 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 8.521 | 9.673 | 5.306 | 9.673 | 156.1 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 60.932 | 113.504 | 60.931 | 113.504 | 256.0 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 183.321 | 185.467 | 181.614 | 185.467 | 153.2 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1463.377 | 1474.043 | 1459.369 | 1474.043 | 256.0 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.216 | 1.247 | 1.205 | 1.247 | 153.1 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.510 | 1.569 | 1.489 | 1.569 | 256.0 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.034 | 0.048 | 0.034 | 0.048 | 130.6 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.510 | 0.593 | 0.414 | 0.593 | 256.0 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.103 | 0.114 | 0.096 | 0.114 | 152.5 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.358 | 5.549 | 5.269 | 5.549 | 256.0 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.143 | 1.585 | 1.055 | 1.585 | 130.6 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.768 | 1.138 | 0.742 | 1.138 | 256.0 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 4.439 | 7.204 | 4.043 | 7.204 | 149.1 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 47.149 | 49.728 | 47.001 | 49.728 | 256.0 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 1.925 | 3.372 | 1.811 | 3.372 | 160.2 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 12.992 | 13.155 | 12.957 | 13.155 | 256.0 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.227 | 0.311 | 0.196 | 0.311 | 187.4 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 256.0 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.245 | 0.307 | 0.219 | 0.307 | 175.9 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.010 | 0.008 | 0.010 | 256.0 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 13.286 | 16.990 | 13.057 | 16.990 | 159.1 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 148.966 | 168.263 | 145.218 | 168.263 | 256.0 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 61.496 | 62.343 | 61.260 | 62.343 | 166.5 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 307.447 | 318.204 | 299.921 | 318.204 | 256.0 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 254.321 | 264.386 | 252.751 | 264.386 | 196.8 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1704.958 | 1909.847 | 1676.780 | 1909.847 | 256.0 |
| evaluation-flat-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 6.388 | 10.474 | 6.317 | 10.474 | 196.6 |
| evaluation-flat-regressor-model-point | evaluation-baseline | python-prophet | 4 | 2.071 | 2.760 | 2.005 | 2.760 | 256.0 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.357 | 0.394 | 0.309 | 0.394 | 135.5 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.829 | 1.292 | 0.828 | 1.292 | 256.0 |
| evaluation-flat-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.101 | 0.116 | 0.099 | 0.116 | 178.1 |
| evaluation-flat-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.448 | 6.800 | 5.403 | 6.800 | 256.0 |
| evaluation-flat-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.478 | 4.472 | 2.451 | 4.472 | 147.4 |
| evaluation-flat-regressor-model-point | evaluation-plan | python-prophet | 4 | 1.087 | 1.119 | 1.027 | 1.119 | 256.0 |
| evaluation-flat-regressor-model-point | evaluation-point | effect-prophet | 4 | 58.813 | 60.675 | 58.430 | 60.675 | 160.9 |
| evaluation-flat-regressor-model-point | evaluation-point | python-prophet | 4 | 244.234 | 274.917 | 230.754 | 274.917 | 256.0 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.108 | 0.123 | 0.097 | 0.123 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.663 | 0.682 | 0.628 | 0.682 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 173.058 | 180.599 | 170.206 | 180.599 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1454.414 | 1616.818 | 1450.120 | 1616.818 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 158.014 | 164.704 | 157.909 | 164.704 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1437.719 | 1644.958 | 1432.456 | 1644.958 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.125 | 0.155 | 0.124 | 0.155 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.953 | 4.584 | 3.861 | 4.584 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.029 | 0.039 | 0.028 | 0.039 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.867 | 1.021 | 0.840 | 1.021 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.063 | 2.084 | 1.951 | 2.084 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.512 | 14.864 | 14.386 | 14.864 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.209 | 2.898 | 2.096 | 2.898 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 14.105 | 16.975 | 13.976 | 16.975 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.577 | 2.802 | 2.224 | 2.802 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 9.212 | 10.933 | 9.204 | 10.933 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.495 | 0.555 | 0.494 | 0.555 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.716 | 4.746 | 4.687 | 4.746 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.051 | 0.086 | 0.042 | 0.086 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.538 | 0.591 | 0.500 | 0.591 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 173.010 | 173.947 | 171.112 | 173.947 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1461.226 | 1602.011 | 1459.120 | 1602.011 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 157.149 | 162.110 | 154.528 | 162.110 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1451.052 | 1487.965 | 1447.891 | 1487.965 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.128 | 0.147 | 0.125 | 0.147 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.656 | 3.749 | 3.587 | 3.749 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.036 | 0.085 | 0.027 | 0.085 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.646 | 0.738 | 0.622 | 0.738 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.544 | 4.916 | 4.469 | 4.916 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.298 | 27.998 | 27.277 | 27.998 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.593 | 4.687 | 4.576 | 4.687 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 27.118 | 28.081 | 26.909 | 28.081 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 5.190 | 5.806 | 5.158 | 5.806 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 22.826 | 23.193 | 22.570 | 23.193 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.304 | 0.386 | 0.304 | 0.386 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.682 | 5.091 | 4.682 | 5.091 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.142 | 179.286 | 166.043 | 179.286 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1468.963 | 1565.044 | 1457.818 | 1565.044 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.146 | 0.175 | 0.131 | 0.175 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.106 | 2.358 | 2.056 | 2.358 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.018 | 0.022 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.413 | 0.415 | 0.409 | 0.415 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.957 | 2.573 | 1.318 | 2.573 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.028 | 3.166 | 3.011 | 3.166 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.226 | 0.276 | 0.199 | 0.276 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.641 | 2.706 | 2.623 | 2.706 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.629 | 178.104 | 160.072 | 178.104 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1494.698 | 1689.020 | 1455.480 | 1689.020 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.156 | 0.187 | 0.154 | 0.187 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.220 | 3.860 | 2.137 | 3.860 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.021 | 0.019 | 0.021 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.401 | 0.423 | 0.387 | 0.423 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 2.046 | 2.112 | 1.498 | 2.112 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.477 | 3.990 | 3.289 | 3.990 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.296 | 0.366 | 0.288 | 0.366 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.856 | 3.258 | 2.826 | 3.258 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.120 | 0.194 | 0.103 | 0.194 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.953 | 0.966 | 0.939 | 0.966 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 180.276 | 191.852 | 179.815 | 191.852 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1502.674 | 1532.906 | 1490.014 | 1532.906 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 174.160 | 199.983 | 172.256 | 199.983 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1462.398 | 1638.020 | 1443.181 | 1638.020 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.179 | 0.191 | 0.161 | 0.191 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.711 | 3.942 | 3.595 | 3.942 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.024 | 0.029 | 0.020 | 0.029 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.183 | 1.222 | 1.182 | 1.222 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.747 | 8.082 | 4.739 | 8.082 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 31.342 | 33.126 | 30.946 | 33.126 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 6.872 | 8.993 | 5.955 | 8.993 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 30.141 | 32.208 | 29.707 | 32.208 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 5.094 | 5.539 | 5.089 | 5.539 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 25.484 | 25.839 | 25.401 | 25.839 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 1.028 | 1.518 | 0.943 | 1.518 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.821 | 5.151 | 4.689 | 5.151 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.019 | 0.025 | 0.016 | 0.025 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.474 | 0.508 | 0.469 | 0.508 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 168.830 | 182.976 | 166.351 | 182.976 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1454.851 | 1506.816 | 1431.445 | 1506.816 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 161.726 | 178.761 | 157.177 | 178.761 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1445.970 | 1627.604 | 1439.402 | 1627.604 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.134 | 0.168 | 0.121 | 0.168 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.157 | 2.317 | 2.096 | 2.317 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.031 | 0.052 | 0.026 | 0.052 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.482 | 0.513 | 0.454 | 0.513 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.464 | 1.531 | 1.348 | 1.531 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.563 | 14.424 | 12.455 | 14.424 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.501 | 1.726 | 1.396 | 1.726 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 12.422 | 14.865 | 11.489 | 14.865 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 2.199 | 3.502 | 1.764 | 3.502 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 8.703 | 9.303 | 8.555 | 9.303 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.338 | 0.385 | 0.288 | 0.385 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.062 | 3.182 | 3.042 | 3.182 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.017 | 0.015 | 0.017 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.528 | 0.625 | 0.498 | 0.625 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 172.729 | 188.678 | 168.076 | 188.678 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1442.983 | 1799.109 | 1420.350 | 1799.109 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 161.013 | 192.428 | 154.356 | 192.428 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1487.195 | 8036.308 | 1431.256 | 8036.308 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.116 | 0.151 | 0.081 | 0.151 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.148 | 2.831 | 2.127 | 2.831 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.031 | 0.041 | 0.021 | 0.041 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.444 | 0.483 | 0.427 | 0.483 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.411 | 1.724 | 1.369 | 1.724 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.666 | 18.403 | 12.326 | 18.403 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 2.037 | 3.632 | 1.441 | 3.632 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 11.557 | 31.589 | 11.485 | 31.589 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.830 | 2.625 | 1.633 | 2.625 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 9.479 | 17.747 | 8.579 | 17.747 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.280 | 0.325 | 0.257 | 0.325 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.219 | 3.374 | 3.109 | 3.374 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.018 | 0.012 | 0.018 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.491 | 0.538 | 0.443 | 0.538 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 291.965 | 321.857 | 286.661 | 321.857 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1834.793 | 1952.588 | 1810.119 | 1952.588 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 163.553 | 176.064 | 156.542 | 176.064 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1445.501 | 1453.550 | 1426.879 | 1453.550 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.178 | 0.237 | 0.150 | 0.237 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.167 | 2.408 | 2.163 | 2.408 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.037 | 0.072 | 0.031 | 0.072 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.456 | 0.534 | 0.435 | 0.534 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 104.203 | 110.217 | 103.710 | 110.217 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 398.262 | 422.462 | 389.733 | 422.462 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 104.305 | 111.671 | 103.741 | 111.671 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 400.313 | 406.020 | 394.931 | 406.020 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 106.095 | 111.923 | 104.283 | 111.923 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 389.009 | 394.158 | 386.582 | 394.158 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.326 | 0.446 | 0.268 | 0.446 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.146 | 3.224 | 3.034 | 3.224 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.127 | 183.254 | 156.681 | 183.254 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1494.616 | 1573.042 | 1476.250 | 1573.042 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.142 | 0.173 | 0.125 | 0.173 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.136 | 2.216 | 2.113 | 2.216 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.021 | 0.019 | 0.021 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.460 | 0.476 | 0.456 | 0.476 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.777 | 3.476 | 1.529 | 3.476 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 8.838 | 10.122 | 8.203 | 10.122 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.202 | 0.261 | 0.201 | 0.261 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.756 | 2.877 | 2.692 | 2.877 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.594 | 161.580 | 156.476 | 161.580 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1469.716 | 1487.588 | 1460.576 | 1487.588 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.139 | 0.162 | 0.119 | 0.162 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.080 | 2.256 | 2.056 | 2.256 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.039 | 0.017 | 0.039 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.432 | 0.480 | 0.420 | 0.480 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 4.032 | 4.776 | 3.673 | 4.776 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 21.831 | 26.096 | 21.639 | 26.096 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.279 | 0.302 | 0.267 | 0.302 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.840 | 2.891 | 2.683 | 2.891 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.064 | 0.088 | 0.043 | 0.088 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.558 | 1.112 | 0.532 | 1.112 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 171.909 | 192.232 | 170.049 | 192.232 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1523.793 | 1703.007 | 1515.888 | 1703.007 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 161.197 | 178.805 | 156.785 | 178.805 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1451.616 | 1646.890 | 1443.097 | 1646.890 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.141 | 0.192 | 0.131 | 0.192 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.852 | 6.607 | 3.653 | 6.607 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.034 | 0.052 | 0.030 | 0.052 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.680 | 0.839 | 0.645 | 0.839 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.010 | 3.080 | 3.004 | 3.080 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 51.347 | 52.747 | 51.288 | 52.747 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.136 | 3.263 | 3.066 | 3.263 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 52.669 | 57.429 | 52.494 | 57.429 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 3.610 | 4.409 | 3.603 | 4.409 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 47.501 | 55.072 | 46.817 | 55.072 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.329 | 0.393 | 0.318 | 0.393 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.889 | 6.349 | 4.865 | 6.349 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.379 | 176.256 | 162.011 | 176.256 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1437.537 | 1449.314 | 1435.938 | 1449.314 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.177 | 0.187 | 0.164 | 0.187 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.657 | 3.744 | 3.628 | 3.744 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.027 | 0.016 | 0.027 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.692 | 1.074 | 0.669 | 1.074 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 2.610 | 2.837 | 2.113 | 2.837 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.517 | 12.095 | 8.026 | 12.095 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.323 | 0.416 | 0.322 | 0.416 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.759 | 5.273 | 4.730 | 5.273 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.262 | 163.991 | 157.901 | 163.991 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1498.242 | 1506.713 | 1497.002 | 1506.713 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.176 | 0.201 | 0.172 | 0.201 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.880 | 4.472 | 3.857 | 4.472 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.021 | 0.017 | 0.021 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.820 | 0.854 | 0.820 | 0.854 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 2.502 | 3.317 | 2.242 | 3.317 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.742 | 10.592 | 9.089 | 10.592 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.489 | 1.235 | 0.468 | 1.235 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.710 | 4.817 | 4.679 | 4.817 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.124 | 0.135 | 0.108 | 0.135 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.642 | 0.650 | 0.629 | 0.650 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 172.893 | 190.700 | 170.522 | 190.700 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1466.793 | 1489.301 | 1431.764 | 1489.301 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 161.562 | 166.746 | 159.336 | 166.746 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1450.429 | 1512.312 | 1432.052 | 1512.312 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.134 | 0.175 | 0.119 | 0.175 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.871 | 3.998 | 3.840 | 3.998 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.034 | 0.026 | 0.034 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.860 | 0.905 | 0.850 | 0.905 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.099 | 2.258 | 2.093 | 2.258 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.911 | 15.174 | 14.673 | 15.174 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.214 | 2.361 | 2.207 | 2.361 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.750 | 14.449 | 13.738 | 14.449 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.448 | 3.921 | 2.219 | 3.921 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.046 | 13.940 | 9.045 | 13.940 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.486 | 0.537 | 0.484 | 0.537 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.814 | 4.939 | 4.814 | 4.939 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.043 | 0.085 | 0.041 | 0.085 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.548 | 0.590 | 0.535 | 0.590 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 170.285 | 172.897 | 167.488 | 172.897 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1449.986 | 1473.375 | 1430.622 | 1473.375 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 158.527 | 177.118 | 155.244 | 177.118 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1441.332 | 1535.835 | 1431.359 | 1535.835 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.152 | 0.168 | 0.148 | 0.168 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.612 | 3.762 | 3.591 | 3.762 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.025 | 0.030 | 0.025 | 0.030 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.671 | 0.688 | 0.662 | 0.688 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.244 | 1.972 | 1.204 | 1.972 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 12.923 | 16.251 | 12.748 | 16.251 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.359 | 1.616 | 1.348 | 1.616 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 11.916 | 25.350 | 11.897 | 25.350 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 2.016 | 2.063 | 1.994 | 2.063 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.748 | 8.598 | 7.634 | 8.598 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.282 | 0.361 | 0.270 | 0.361 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.706 | 8.681 | 4.645 | 8.681 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.519 | 164.372 | 156.319 | 164.372 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1455.302 | 1483.021 | 1453.399 | 1483.021 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.153 | 0.123 | 0.153 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.116 | 2.224 | 2.106 | 2.224 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.050 | 0.020 | 0.050 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.433 | 0.452 | 0.430 | 0.452 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 2.464 | 4.170 | 1.373 | 4.170 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.763 | 8.513 | 7.250 | 8.513 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.314 | 0.371 | 0.280 | 0.371 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.699 | 2.789 | 2.696 | 2.789 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.023 | 162.505 | 158.794 | 162.505 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1477.582 | 1733.418 | 1463.913 | 1733.418 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.127 | 0.157 | 0.119 | 0.157 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.180 | 3.106 | 2.114 | 3.106 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.020 | 0.019 | 0.020 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.432 | 0.735 | 0.409 | 0.735 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.864 | 5.121 | 3.567 | 5.121 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 20.945 | 21.790 | 20.300 | 21.790 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.225 | 0.277 | 0.205 | 0.277 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.727 | 3.060 | 2.692 | 3.060 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 178.596 | 232.169 | 165.714 | 232.169 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1484.521 | 1486.350 | 1451.111 | 1486.350 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.207 | 0.273 | 0.186 | 0.273 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.821 | 3.881 | 3.781 | 3.881 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.040 | 0.018 | 0.040 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.777 | 0.795 | 0.777 | 0.795 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.779 | 6.570 | 2.252 | 6.570 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 9.018 | 9.363 | 8.853 | 9.363 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.164 | 0.182 | 0.153 | 0.182 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.667 | 4.956 | 4.598 | 4.956 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 163.020 | 177.062 | 160.323 | 177.062 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1463.546 | 1555.301 | 1441.278 | 1555.301 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.210 | 0.306 | 0.196 | 0.306 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.830 | 3.920 | 3.795 | 3.920 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.050 | 0.021 | 0.050 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.790 | 1.021 | 0.774 | 1.021 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 2.149 | 5.034 | 2.131 | 5.034 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.997 | 11.102 | 8.808 | 11.102 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.151 | 0.161 | 0.148 | 0.161 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.781 | 5.142 | 4.761 | 5.142 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.059 | 187.892 | 160.217 | 187.892 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1455.742 | 1533.080 | 1435.917 | 1533.080 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.199 | 0.211 | 0.190 | 0.211 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.875 | 5.006 | 3.779 | 5.006 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.025 | 0.021 | 0.025 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.805 | 0.820 | 0.799 | 0.820 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 2.235 | 4.905 | 2.173 | 4.905 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.920 | 9.354 | 8.836 | 9.354 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.163 | 0.173 | 0.159 | 0.173 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.708 | 4.765 | 4.690 | 4.765 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.565 | 160.273 | 153.995 | 160.273 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1459.505 | 1548.843 | 1438.409 | 1548.843 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.186 | 0.201 | 0.174 | 0.201 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.845 | 3.998 | 3.844 | 3.998 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.024 | 0.021 | 0.024 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.811 | 0.850 | 0.809 | 0.850 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 2.510 | 4.711 | 2.249 | 4.711 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.948 | 9.401 | 8.923 | 9.401 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.155 | 0.163 | 0.148 | 0.163 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.769 | 5.388 | 4.723 | 5.388 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.120 | 164.589 | 156.310 | 164.589 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1468.270 | 1536.702 | 1447.337 | 1536.702 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.247 | 2.480 | 0.184 | 2.480 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.681 | 3.868 | 3.553 | 3.868 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.025 | 0.022 | 0.025 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.629 | 0.650 | 0.624 | 0.650 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.885 | 3.544 | 1.776 | 3.544 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.519 | 8.332 | 7.426 | 8.332 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.242 | 0.275 | 0.240 | 0.275 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.693 | 4.868 | 4.668 | 4.868 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.453 | 174.496 | 155.157 | 174.496 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1447.679 | 1521.349 | 1436.945 | 1521.349 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.247 | 1.994 | 0.234 | 1.994 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.583 | 3.727 | 3.544 | 3.727 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.025 | 0.019 | 0.025 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.640 | 0.677 | 0.632 | 0.677 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 2.015 | 2.664 | 1.742 | 2.664 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 8.022 | 8.233 | 7.381 | 8.233 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.228 | 0.286 | 0.213 | 0.286 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.749 | 5.448 | 4.660 | 5.448 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.891 | 162.049 | 157.695 | 162.049 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1477.230 | 1699.980 | 1460.637 | 1699.980 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.188 | 0.235 | 0.178 | 0.235 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.706 | 3.853 | 3.566 | 3.853 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.027 | 0.019 | 0.027 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.637 | 0.986 | 0.631 | 0.986 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.064 | 4.012 | 1.914 | 4.012 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 8.320 | 10.598 | 8.259 | 10.598 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.235 | 0.264 | 0.235 | 0.264 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 5.113 | 5.380 | 4.912 | 5.380 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.109 | 160.842 | 155.650 | 160.842 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1564.851 | 1570.431 | 1548.143 | 1570.431 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.228 | 0.409 | 0.181 | 0.409 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.830 | 4.478 | 3.614 | 4.478 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.042 | 0.021 | 0.042 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.609 | 0.748 | 0.595 | 0.748 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.981 | 2.451 | 1.720 | 2.451 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 8.404 | 10.598 | 7.739 | 10.598 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.217 | 0.242 | 0.210 | 0.242 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.900 | 12.379 | 4.749 | 12.379 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 186.988 | 230.408 | 178.705 | 230.408 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1504.827 | 1518.165 | 1497.023 | 1518.165 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.193 | 2.039 | 0.189 | 2.039 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.818 | 3.986 | 3.707 | 3.986 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.063 | 0.021 | 0.063 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.650 | 0.684 | 0.639 | 0.684 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.079 | 2.719 | 2.069 | 2.719 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 9.850 | 10.386 | 9.152 | 10.386 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.229 | 0.286 | 0.224 | 0.286 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 5.073 | 6.635 | 4.886 | 6.635 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.537 | 172.274 | 154.782 | 172.274 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1485.367 | 1689.340 | 1455.695 | 1689.340 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.198 | 0.225 | 0.177 | 0.225 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.667 | 3.903 | 3.645 | 3.903 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.020 | 0.023 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.659 | 0.675 | 0.642 | 0.675 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.302 | 2.424 | 2.255 | 2.424 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 8.699 | 10.122 | 8.557 | 10.122 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.262 | 0.333 | 0.239 | 0.333 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.863 | 5.497 | 4.771 | 5.497 | n/a |
| flat-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.181 | 0.240 | 0.164 | 0.240 | n/a |
| flat-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.943 | 0.982 | 0.923 | 0.982 | n/a |
| flat-regressor-model | cold-first-forecast | effect-prophet | 4 | 217.080 | 243.598 | 215.165 | 243.598 | n/a |
| flat-regressor-model | cold-first-forecast | python-prophet | 4 | 1753.090 | 1769.878 | 1747.266 | 1769.878 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 23.686 | 25.493 | 23.639 | 25.493 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 145.365 | 145.978 | 141.913 | 145.978 | n/a |
| flat-regressor-model | warm-fit-predict | effect-prophet | 4 | 24.400 | 32.696 | 24.054 | 32.696 | n/a |
| flat-regressor-model | warm-fit-predict | python-prophet | 4 | 139.283 | 140.288 | 138.991 | 140.288 | n/a |
| flat-regressor-model | warm-fit | effect-prophet | 4 | 23.809 | 24.395 | 23.741 | 24.395 | n/a |
| flat-regressor-model | warm-fit | python-prophet | 4 | 113.003 | 129.986 | 110.842 | 129.986 | n/a |
| flat-regressor-model | warm-predict | effect-prophet | 4 | 2.029 | 2.236 | 1.954 | 2.236 | n/a |
| flat-regressor-model | warm-predict | python-prophet | 4 | 31.829 | 33.786 | 30.936 | 33.786 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.001 | 164.323 | 153.762 | 164.323 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1434.374 | 1477.175 | 1424.180 | 1477.175 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.198 | 0.268 | 0.174 | 0.268 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.176 | 2.265 | 2.137 | 2.265 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.036 | 0.019 | 0.036 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.425 | 0.454 | 0.410 | 0.454 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 152.657 | 157.865 | 151.881 | 157.865 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 617.936 | 625.282 | 616.735 | 625.282 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.324 | 0.351 | 0.316 | 0.351 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.075 | 3.277 | 3.002 | 3.277 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.422 | 174.278 | 161.740 | 174.278 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1507.123 | 1584.357 | 1450.870 | 1584.357 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.173 | 0.213 | 0.164 | 0.213 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.221 | 2.369 | 2.167 | 2.369 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.027 | 0.018 | 0.027 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.414 | 0.518 | 0.411 | 0.518 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.473 | 6.922 | 4.351 | 6.922 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 21.801 | 22.561 | 21.599 | 22.561 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.228 | 0.318 | 0.216 | 0.318 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.128 | 4.115 | 3.023 | 4.115 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 157.119 | 170.714 | 156.224 | 170.714 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1417.014 | 1695.626 | 1415.293 | 1695.626 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.160 | 0.188 | 0.132 | 0.188 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.900 | 2.444 | 1.847 | 2.444 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.016 | 0.021 | 0.016 | 0.021 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.335 | 0.615 | 0.327 | 0.615 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.569 | 0.943 | 0.541 | 0.943 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.934 | 4.242 | 2.806 | 4.242 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.135 | 0.163 | 0.120 | 0.163 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.692 | 3.258 | 2.649 | 3.258 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 159.241 | 173.926 | 156.691 | 173.926 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1450.625 | 1481.822 | 1437.689 | 1481.822 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.190 | 0.334 | 0.151 | 0.334 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.858 | 1.891 | 1.837 | 1.891 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.018 | 0.020 | 0.017 | 0.020 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.317 | 0.330 | 0.316 | 0.330 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.881 | 1.550 | 0.879 | 1.550 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.361 | 5.486 | 5.266 | 5.486 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.156 | 0.171 | 0.148 | 0.171 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.656 | 2.813 | 2.588 | 2.813 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 298.888 | 323.663 | 288.737 | 323.663 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1994.225 | 2074.788 | 1954.394 | 2074.788 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.114 | 178.154 | 164.821 | 178.154 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1590.009 | 1655.923 | 1551.919 | 1655.923 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.164 | 0.189 | 0.137 | 0.189 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.231 | 2.521 | 2.154 | 2.521 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.021 | 0.050 | 0.018 | 0.050 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.496 | 0.562 | 0.421 | 0.562 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.032 | 0.049 | 0.030 | 0.049 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.501 | 0.531 | 0.474 | 0.531 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.823 | 5.198 | 4.734 | 5.198 | 143.7 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 132.779 | 163.678 | 120.845 | 163.678 | 256.0 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 168.611 | 174.983 | 162.602 | 174.983 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1511.023 | 1687.335 | 1497.917 | 1687.335 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.616 | 162.513 | 156.969 | 162.513 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1520.439 | 1587.425 | 1513.732 | 1587.425 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.206 | 0.241 | 0.187 | 0.241 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.607 | 3.758 | 3.509 | 3.758 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.023 | 0.028 | 0.021 | 0.028 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.675 | 0.765 | 0.655 | 0.765 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.049 | 1.662 | 0.026 | 1.662 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.530 | 0.551 | 0.514 | 0.551 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.067 | 1.492 | 1.004 | 1.492 | 140.8 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 71.949 | 73.920 | 71.068 | 73.920 | 256.0 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 172.503 | 189.511 | 170.455 | 189.511 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1452.793 | 1487.416 | 1433.319 | 1487.416 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 164.645 | 169.282 | 159.995 | 169.282 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1442.845 | 1470.539 | 1429.213 | 1470.539 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.199 | 0.294 | 0.154 | 0.294 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 4.023 | 5.859 | 3.882 | 5.859 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.023 | 0.027 | 0.018 | 0.027 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.848 | 0.924 | 0.823 | 0.924 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.111 | 0.123 | 0.089 | 0.123 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.653 | 0.718 | 0.627 | 0.718 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.902 | 1.032 | 0.844 | 1.032 | 151.9 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 21.244 | 36.987 | 19.850 | 36.987 | 256.0 |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 239.177 | 249.442 | 235.192 | 249.442 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1900.078 | 1917.963 | 1896.566 | 1917.963 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.112 | 0.219 | 0.092 | 0.219 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.948 | 0.978 | 0.940 | 0.978 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 19.187 | 20.175 | 17.910 | 20.175 | 188.1 |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 283.382 | 295.259 | 276.483 | 295.259 | 256.0 |
| warm-start-flat-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 105.114 | 109.215 | 104.781 | 109.215 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-fit | python-prophet | 6 | 392.080 | 394.418 | 383.596 | 394.418 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 6.397 | 8.328 | 6.270 | 8.328 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 8.121 | 10.283 | 8.053 | 10.283 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `9f5b12f53b9529aae2350a864e2c3c632a658951`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-flat-additive`, `country-explicit-us-flat-additive`, `country-us-flat-multiplicative`, `country-explicit-us-flat-multiplicative`, `country-boundary-flat`, `country-empty-bv-flat`, `country-explicit-empty-flat`, `country-estimated-sg-flat`, `country-partial-in-flat`, `country-mixed-us-flat`, `country-none-flat-730`, `country-se-flat-730`, `country-explicit-se-flat-730`, `country-cn-flat-730`, `country-explicit-cn-flat-730`, `country-none-flat-2190`, `country-se-flat-2190`, `country-explicit-se-flat-2190`, `country-cn-flat-2190`, `country-explicit-cn-flat-2190`, `country-none-flat-2190-batch-32`, `country-se-flat-2190-batch-32`, `country-explicit-se-flat-2190-batch-32`, `country-uncertainty-us-flat`, `map-training-zero-span-flat-varied`, `map-training-zero-span-flat-constant`, `flat-mixed-components`, `flat-mixed-components-large`, `uncertainty-flat-defaults-seasonal-intervals-1000`, `uncertainty-flat-mixed-components-full-intervals-512`, `uncertainty-flat-mixed-components-large-full-samples-128`, `anomalies-flat-defaults-99`, `warm-start-flat-defaults-7-new-rows`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `evaluation-flat-large-months-metrics`, `evaluation-flat-large-parallel`, `flat-defaults-level`, `flat-defaults-seasonal`, `flat-defaults-negative`, `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`, `flat-additive-components`, `flat-additive-components-large`, `flat-mixed-components-absmax-defaults`, `flat-correlated-regressors`, `flat-regressor-model`, `uncertainty-flat-regressor-model-intervals-1000`, `evaluation-flat-regressor-model-point`, `evaluation-flat-regressor-model-intervals`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:ef20b2858f79a9dbdfa51029f7a079f79b53a70753cb01d859109a068f58850c`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:5a84d9680b8883e4107a99ca332320d8b42e431fe6e4e0f42b78b76b079484c7`

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
- Resources: `input-numeric-dtype=float64`, `logical-cpu-count=4`, `cross-validation-thread-workers=8`, `cross-validation-process-workers=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation/country lifecycle: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

