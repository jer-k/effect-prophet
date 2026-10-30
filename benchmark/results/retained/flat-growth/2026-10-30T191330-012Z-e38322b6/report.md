# Effect Prophet benchmark — 2026-10-30T191330-012Z-e38322b6

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

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 128 | 19 / 0.8 | horizons | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons | d27263ab5e5b8f488de56085850577bb13a87b5ad4dca13da9039ce8de013341, ac378f98946578839b9dc1c9dbd10cc73c207ee8c103ad3c437807ee60fab209, d76d1f1e1ceb3370113274ddc7a004255a238dcdea9959d517623cb508c5da64 |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 0 | n/a / n/a | rolling | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 128 | 19 / 0.8 | rolling | n/a |
| evaluation-flat-large-months-metrics | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 3 | 436 | 273 | 6 | 25 | 0 | n/a / n/a | rolling | n/a |
| evaluation-flat-regressor-model-point | flat-correlated-regressors-v1:level=40+0.6*temperature(yearly-tracking,future+6)+yearly(phase=1)+weekly+constant-baseline+bounded-noise-x5:n=730:h=180 / bf69b68aa75b99e49972817a6f5e24654c3deabc452fa563fa2eee0340a9b121 | flat | 0 | 2 | 1418 | 14 | 26 | 25 | 0 | n/a / n/a | horizons | n/a |
| evaluation-flat-regressor-model-intervals | flat-correlated-regressors-v1:level=40+0.6*temperature(yearly-tracking,future+6)+yearly(phase=1)+weekly+constant-baseline+bounded-noise-x5:n=730:h=180 / bf69b68aa75b99e49972817a6f5e24654c3deabc452fa563fa2eee0340a9b121 | flat | 0 | 2 | 1418 | 14 | 26 | 25 | 128 | 19 / 0.8 | horizons | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-flat-defaults-99 | warm-anomalies | effect-prophet | 6 | 10.212 | 10.897 | 9.517 | 10.897 | n/a |
| anomalies-flat-defaults-99 | warm-anomalies | python-prophet | 6 | 146.345 | 165.710 | 137.792 | 165.710 | n/a |
| anomalies-flat-defaults-99 | warm-fit | effect-prophet | 6 | 2.585 | 3.861 | 1.751 | 3.861 | n/a |
| anomalies-flat-defaults-99 | warm-fit | python-prophet | 6 | 8.735 | 11.814 | 8.004 | 11.814 | n/a |
| anomalies-flat-defaults-99 | warm-uncertainty | effect-prophet | 6 | 6.683 | 7.346 | 6.457 | 7.346 | 151.4 |
| anomalies-flat-defaults-99 | warm-uncertainty | python-prophet | 6 | 136.076 | 164.483 | 134.781 | 164.483 | 256.7 |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.015 | 0.012 | 0.015 | 140.3 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.473 | 0.723 | 0.434 | 0.723 | 256.7 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 222.511 | 499.210 | 208.604 | 499.210 | 159.2 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1742.577 | 1760.083 | 1680.073 | 1760.083 | 256.7 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 183.805 | 200.623 | 164.000 | 200.623 | 162.1 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1668.668 | 1805.377 | 1628.237 | 1805.377 | 256.7 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.909 | 1.068 | 0.833 | 1.068 | 159.2 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.311 | 3.607 | 3.265 | 3.607 | 256.7 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.108 | 0.200 | 0.093 | 0.200 | 159.2 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.572 | 0.604 | 0.521 | 0.604 | 256.7 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 23.104 | 23.661 | 22.814 | 23.661 | 158.1 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 74.187 | 76.401 | 72.815 | 76.401 | 256.7 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 22.264 | 23.856 | 21.793 | 23.856 | 156.2 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 73.728 | 76.933 | 72.512 | 76.933 | 256.7 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 22.370 | 23.251 | 22.028 | 23.251 | 152.3 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 67.997 | 72.035 | 67.546 | 72.035 | 256.7 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.322 | 0.344 | 0.268 | 0.344 | 154.7 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.575 | 7.035 | 5.436 | 7.035 | 256.7 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 207.241 | 645.877 | 196.240 | 645.877 | 229.7 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1628.992 | 1682.044 | 1605.082 | 1682.044 | 256.7 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 3.196 | 3.560 | 2.893 | 3.560 | 224.7 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.148 | 9.362 | 9.074 | 9.362 | 256.7 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.124 | 0.306 | 0.110 | 0.306 | 224.7 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.032 | 3.074 | 2.988 | 3.074 | 256.7 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 27.164 | 54.239 | 21.841 | 54.239 | 205.8 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 84.148 | 85.327 | 83.922 | 85.327 | 256.7 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.375 | 32.278 | 3.248 | 32.278 | 221.2 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.025 | 9.673 | 8.853 | 9.673 | 256.7 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 180.264 | 205.521 | 177.891 | 205.521 | 207.8 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1683.848 | 1913.852 | 1633.974 | 1913.852 | 256.7 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.745 | 1.809 | 1.670 | 1.809 | 205.1 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.289 | 12.167 | 4.988 | 12.167 | 256.7 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.111 | 0.285 | 0.102 | 0.285 | 202.3 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.283 | 1.913 | 1.235 | 1.913 | 256.7 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 8.693 | 9.702 | 7.613 | 9.702 | 169.7 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 24.986 | 31.589 | 24.413 | 31.589 | 256.7 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.770 | 6.357 | 2.748 | 6.357 | 200.1 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 7.125 | 12.875 | 6.960 | 12.875 | 256.7 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.013 | 0.011 | 0.013 | 133.9 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.507 | 6.222 | 0.458 | 6.222 | 256.7 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 186.630 | 208.467 | 179.535 | 208.467 | 152.0 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1702.189 | 1755.282 | 1650.734 | 1755.282 | 256.7 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 174.199 | 184.165 | 166.234 | 184.165 | 152.0 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1634.303 | 1722.768 | 1607.387 | 1722.768 | 256.7 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.279 | 0.661 | 0.250 | 0.661 | 152.0 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.111 | 2.272 | 2.074 | 2.272 | 256.7 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.043 | 0.066 | 0.034 | 0.066 | 152.0 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.462 | 0.691 | 0.437 | 0.691 | 256.7 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.928 | 2.670 | 1.885 | 2.670 | 151.9 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 14.879 | 17.063 | 13.534 | 17.063 | 256.7 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 2.126 | 2.488 | 1.949 | 2.488 | 150.5 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.714 | 14.948 | 12.585 | 14.948 | 256.7 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 3.085 | 4.849 | 2.729 | 4.849 | 150.4 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.627 | 10.818 | 9.465 | 10.818 | 256.7 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.134 | 0.154 | 0.117 | 0.154 | 150.5 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.202 | 3.291 | 3.094 | 3.291 | 256.7 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.052 | 0.072 | 0.042 | 0.072 | 148.7 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.616 | 0.739 | 0.596 | 0.739 | 256.7 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 234.496 | 297.532 | 199.725 | 297.532 | 191.5 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1676.757 | 1790.951 | 1665.892 | 1790.951 | 256.7 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 171.739 | 204.696 | 168.197 | 204.696 | 194.9 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1677.974 | 1794.232 | 1655.395 | 1794.232 | 256.7 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 1.030 | 1.724 | 0.896 | 1.724 | 193.3 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.207 | 3.421 | 3.118 | 3.421 | 256.7 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.107 | 0.174 | 0.089 | 0.174 | 191.9 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.493 | 0.531 | 0.485 | 0.531 | 256.7 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 22.858 | 25.868 | 21.748 | 25.868 | 190.9 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 72.696 | 75.396 | 71.193 | 75.396 | 256.7 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 21.284 | 23.311 | 20.188 | 23.311 | 172.6 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 70.692 | 72.314 | 68.693 | 72.314 | 256.7 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 20.100 | 21.740 | 19.311 | 21.740 | 154.4 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 64.524 | 66.276 | 63.810 | 66.276 | 256.7 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.696 | 2.935 | 1.530 | 2.935 | 157.4 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.317 | 5.607 | 5.187 | 5.607 | 256.7 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 196.847 | 461.539 | 184.029 | 461.539 | 244.0 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1474.737 | 1606.478 | 1454.455 | 1606.478 | 256.7 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.888 | 2.363 | 1.789 | 2.363 | 237.2 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.134 | 11.104 | 10.049 | 11.104 | 256.7 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.037 | 0.048 | 0.028 | 0.048 | 232.2 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.330 | 3.370 | 3.312 | 3.370 | 256.7 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 21.276 | 25.900 | 20.788 | 25.900 | 209.9 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 79.778 | 93.496 | 78.817 | 93.496 | 256.7 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.477 | 4.155 | 3.181 | 4.155 | 223.9 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.284 | 9.517 | 9.223 | 9.517 | 256.7 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 183.194 | 235.826 | 174.565 | 235.826 | 201.4 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1457.713 | 1482.301 | 1438.977 | 1482.301 | 256.7 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.847 | 0.950 | 0.825 | 0.950 | 197.5 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.847 | 5.946 | 5.806 | 5.946 | 256.7 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.038 | 0.044 | 0.028 | 0.044 | 190.5 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.483 | 1.556 | 1.464 | 1.556 | 256.7 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 6.230 | 6.853 | 6.083 | 6.853 | 154.7 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 20.900 | 21.143 | 20.818 | 21.143 | 256.7 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.461 | 4.707 | 1.986 | 4.707 | 176.9 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.658 | 20.453 | 6.466 | 20.453 | 256.7 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.020 | 0.011 | 0.020 | 137.0 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.474 | 0.537 | 0.433 | 0.537 | 256.7 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 184.627 | 198.952 | 174.309 | 198.952 | 156.3 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1470.111 | 1482.569 | 1442.917 | 1482.569 | 256.7 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 168.978 | 344.209 | 160.775 | 344.209 | 156.3 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1440.989 | 1473.172 | 1424.993 | 1473.172 | 256.7 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.086 | 0.106 | 0.075 | 0.106 | 156.3 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.177 | 2.439 | 2.124 | 2.439 | 256.7 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.022 | 0.034 | 0.017 | 0.034 | 156.3 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.472 | 0.507 | 0.445 | 0.507 | 256.7 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.148 | 2.801 | 1.094 | 2.801 | 155.9 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.938 | 13.626 | 11.492 | 13.626 | 256.7 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.433 | 3.030 | 1.243 | 3.030 | 155.8 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 11.175 | 16.591 | 10.943 | 16.591 | 256.7 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.642 | 2.355 | 1.501 | 2.355 | 146.2 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.415 | 9.167 | 8.284 | 9.167 | 256.7 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.195 | 0.224 | 0.157 | 0.224 | 148.7 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.683 | 2.813 | 2.660 | 2.813 | 256.7 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 188.583 | 196.656 | 179.704 | 196.656 | 194.1 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1464.745 | 1502.003 | 1455.247 | 1502.003 | 256.7 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.911 | 3.669 | 2.716 | 3.669 | 192.7 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.305 | 8.085 | 7.239 | 8.085 | 256.7 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.048 | 0.056 | 0.045 | 0.056 | 191.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.868 | 3.231 | 2.843 | 3.231 | 256.7 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 12.334 | 14.131 | 11.286 | 14.131 | 160.6 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 38.697 | 52.607 | 38.311 | 52.607 | 256.7 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.551 | 0.622 | 0.414 | 0.622 | 175.5 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 11.980 | 12.436 | 11.869 | 12.436 | 256.7 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 190.180 | 196.435 | 183.835 | 196.435 | 200.7 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1526.862 | 1649.698 | 1464.201 | 1649.698 | 256.7 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 3.381 | 3.896 | 3.352 | 3.896 | 198.3 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.685 | 8.440 | 7.336 | 8.440 | 256.7 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.047 | 0.121 | 0.045 | 0.121 | 196.2 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 3.023 | 3.367 | 2.946 | 3.367 | 256.7 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 15.520 | 18.417 | 14.702 | 18.417 | 187.7 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 42.373 | 56.556 | 40.889 | 56.556 | 256.7 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.954 | 2.536 | 1.822 | 2.536 | 193.9 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 14.050 | 14.548 | 13.424 | 14.548 | 256.7 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 182.744 | 215.158 | 177.046 | 215.158 | 193.7 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1528.604 | 1574.222 | 1454.273 | 1574.222 | 256.7 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 1.836 | 2.877 | 1.742 | 2.877 | 180.3 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.521 | 7.098 | 5.347 | 7.098 | 256.7 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.033 | 0.070 | 0.031 | 0.070 | 163.7 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.510 | 1.812 | 1.485 | 1.812 | 256.7 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.883 | 7.865 | 5.627 | 7.865 | 156.4 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 22.333 | 23.432 | 20.574 | 23.432 | 256.7 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 2.212 | 2.617 | 1.961 | 2.617 | 161.0 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 9.508 | 11.042 | 9.343 | 11.042 | 256.7 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.039 | 0.013 | 0.039 | 141.2 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.486 | 0.501 | 0.455 | 0.501 | 256.7 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 186.664 | 211.758 | 179.489 | 211.758 | 158.0 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1552.077 | 1641.753 | 1510.823 | 1641.753 | 256.7 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 159.890 | 165.796 | 157.157 | 165.796 | 158.4 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1529.770 | 1852.517 | 1477.750 | 1852.517 | 256.7 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.406 | 0.433 | 0.400 | 0.433 | 158.3 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 4.207 | 4.471 | 4.022 | 4.471 | 256.7 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.028 | 0.044 | 0.022 | 0.044 | 158.0 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.742 | 1.005 | 0.706 | 1.005 | 256.7 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.643 | 14.732 | 13.088 | 14.732 | 157.9 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 51.159 | 53.615 | 48.027 | 53.615 | 256.7 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.215 | 13.558 | 13.169 | 13.558 | 154.7 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 47.399 | 50.352 | 46.125 | 50.352 | 256.7 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 13.959 | 15.550 | 13.889 | 15.550 | 154.5 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 42.471 | 46.189 | 41.852 | 46.189 | 256.7 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.177 | 0.216 | 0.161 | 0.216 | 154.5 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.725 | 5.011 | 4.654 | 5.011 | 256.7 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.015 | 0.011 | 0.015 | 136.0 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.465 | 0.500 | 0.456 | 0.500 | 256.7 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 171.732 | 188.240 | 171.377 | 188.240 | 152.6 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1557.023 | 1706.884 | 1506.594 | 1706.884 | 256.7 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 171.974 | 180.235 | 161.230 | 180.235 | 152.8 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1488.190 | 1592.685 | 1456.841 | 1592.685 | 256.7 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.399 | 0.424 | 0.394 | 0.424 | 152.7 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 4.432 | 4.790 | 4.082 | 4.790 | 256.7 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.028 | 0.054 | 0.021 | 0.054 | 152.6 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.735 | 0.962 | 0.701 | 0.962 | 256.7 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.538 | 3.571 | 2.490 | 3.571 | 152.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 21.172 | 31.065 | 19.244 | 31.065 | 256.7 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.829 | 3.044 | 2.693 | 3.044 | 148.8 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 23.578 | 45.879 | 20.446 | 45.879 | 256.7 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.511 | 5.377 | 3.302 | 5.377 | 148.6 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 15.922 | 17.445 | 14.392 | 17.445 | 256.7 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.177 | 0.200 | 0.172 | 0.200 | 148.7 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.957 | 5.454 | 4.798 | 5.454 | 256.7 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.036 | 0.058 | 0.023 | 0.058 | 145.0 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.511 | 0.537 | 0.478 | 0.537 | 256.7 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 208.888 | 226.129 | 197.416 | 226.129 | 164.2 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1683.163 | 1949.471 | 1676.140 | 1949.471 | 256.7 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 177.525 | 184.475 | 169.129 | 184.475 | 179.9 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1629.117 | 1702.429 | 1603.073 | 1702.429 | 256.7 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.799 | 2.493 | 0.780 | 2.493 | 179.6 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.437 | 5.942 | 4.365 | 5.942 | 256.7 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.146 | 0.371 | 0.139 | 0.371 | 169.5 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.714 | 1.197 | 0.686 | 1.197 | 256.7 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 17.548 | 18.757 | 17.426 | 18.757 | 160.5 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 63.803 | 68.306 | 62.709 | 68.306 | 256.7 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 17.558 | 18.689 | 17.287 | 18.689 | 157.7 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 62.395 | 63.194 | 61.549 | 63.194 | 256.7 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 18.179 | 18.748 | 17.818 | 18.748 | 154.2 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 56.165 | 57.019 | 55.178 | 57.019 | 256.7 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.237 | 0.268 | 0.217 | 0.268 | 156.1 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.448 | 6.920 | 6.250 | 6.920 | 256.7 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 169.333 | 192.427 | 168.428 | 192.427 | 166.8 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1461.363 | 1538.594 | 1433.987 | 1538.594 | 256.7 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.109 | 0.236 | 0.080 | 0.236 | 160.4 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.777 | 5.083 | 4.662 | 5.083 | 256.7 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.014 | 0.015 | 0.013 | 0.015 | 155.9 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.334 | 2.359 | 2.323 | 2.359 | 256.7 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.374 | 8.301 | 6.623 | 8.301 | 154.9 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 15.541 | 28.244 | 15.189 | 28.244 | 256.7 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.221 | 0.232 | 0.188 | 0.232 | 155.5 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.675 | 2.976 | 2.655 | 2.976 | 256.7 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 175.965 | 188.862 | 173.755 | 188.862 | 189.2 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1576.879 | 1662.070 | 1491.278 | 1662.070 | 256.7 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.126 | 0.187 | 0.103 | 0.187 | 185.1 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 5.332 | 10.650 | 4.758 | 10.650 | 256.7 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 171.7 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.365 | 2.543 | 2.341 | 2.543 | 256.7 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 6.722 | 7.907 | 6.160 | 7.907 | 154.3 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 17.308 | 31.244 | 16.352 | 31.244 | 256.7 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 1.944 | 2.621 | 1.399 | 2.621 | 163.5 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.883 | 3.032 | 2.783 | 3.032 | 256.7 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 166.211 | 176.946 | 164.058 | 176.946 | 160.0 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1581.528 | 1992.409 | 1546.132 | 1992.409 | 256.7 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.127 | 0.165 | 0.074 | 0.165 | 159.4 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 3.004 | 3.553 | 2.909 | 3.553 | 256.7 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.013 | 0.017 | 0.013 | 0.017 | 159.0 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.017 | 1.679 | 1.007 | 1.679 | 256.7 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 3.327 | 5.683 | 3.291 | 5.683 | 157.4 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.460 | 71.809 | 8.047 | 71.809 | 256.7 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.786 | 4.497 | 1.375 | 4.497 | 158.7 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.890 | 7.300 | 2.791 | 7.300 | 256.7 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.022 | 0.012 | 0.022 | 139.0 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.481 | 0.535 | 0.464 | 0.535 | 256.7 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 192.774 | 208.208 | 188.681 | 208.208 | 158.9 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1660.201 | 1727.636 | 1635.996 | 1727.636 | 256.7 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 185.988 | 210.377 | 179.093 | 210.377 | 172.2 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1707.401 | 1868.790 | 1589.824 | 1868.790 | 256.7 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.405 | 1.738 | 1.295 | 1.738 | 170.4 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.124 | 3.324 | 3.056 | 3.324 | 256.7 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.139 | 0.177 | 0.131 | 0.177 | 160.8 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.531 | 0.570 | 0.494 | 0.570 | 256.7 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.705 | 10.915 | 3.520 | 10.915 | 158.8 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 23.295 | 29.717 | 22.362 | 29.717 | 256.7 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.971 | 4.522 | 3.812 | 4.522 | 157.7 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 21.694 | 26.645 | 21.346 | 26.645 | 256.7 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 4.569 | 7.786 | 4.035 | 7.786 | 154.8 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.737 | 20.759 | 15.539 | 20.759 | 256.7 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.181 | 0.214 | 0.177 | 0.214 | 156.3 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.989 | 6.390 | 4.863 | 6.390 | 256.7 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 186.436 | 198.626 | 183.156 | 198.626 | 205.0 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1621.407 | 1644.855 | 1611.233 | 1644.855 | 256.7 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 5.262 | 6.821 | 4.638 | 6.821 | 201.9 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.947 | 6.075 | 5.858 | 6.075 | 256.7 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.319 | 0.389 | 0.264 | 0.389 | 200.2 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.498 | 2.550 | 2.455 | 2.550 | 256.7 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 18.259 | 21.305 | 14.988 | 21.305 | 197.6 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 43.239 | 45.602 | 42.652 | 45.602 | 256.7 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.579 | 1.188 | 0.549 | 1.188 | 199.4 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.250 | 7.362 | 7.119 | 7.362 | 256.7 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 188.616 | 194.604 | 185.133 | 194.604 | 215.6 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1654.391 | 1680.450 | 1639.635 | 1680.450 | 256.7 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.993 | 5.736 | 4.577 | 5.736 | 210.6 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.986 | 6.182 | 5.911 | 6.182 | 256.7 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.319 | 0.375 | 0.291 | 0.375 | 204.2 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.510 | 2.653 | 2.448 | 2.653 | 256.7 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 17.594 | 20.258 | 13.750 | 20.258 | 194.5 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 44.208 | 45.949 | 43.954 | 45.949 | 256.7 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.036 | 2.372 | 1.867 | 2.372 | 201.1 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.862 | 9.344 | 8.693 | 9.344 | 256.7 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 182.668 | 185.828 | 179.661 | 185.828 | 209.0 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1698.721 | 1770.138 | 1616.860 | 1770.138 | 256.7 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 3.133 | 4.228 | 2.876 | 4.228 | 204.4 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.293 | 5.051 | 4.165 | 5.051 | 256.7 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.287 | 0.310 | 0.258 | 0.310 | 199.7 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.150 | 1.163 | 1.147 | 1.163 | 256.7 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 8.987 | 10.583 | 8.051 | 10.583 | 172.1 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 22.432 | 23.887 | 21.626 | 23.887 | 256.7 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.310 | 4.460 | 2.261 | 4.460 | 198.4 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.993 | 9.320 | 8.894 | 9.320 | 256.7 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 195.538 | 209.797 | 189.394 | 209.797 | 149.9 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1690.585 | 1836.522 | 1671.471 | 1836.522 | 256.7 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.665 | 172.841 | 167.192 | 172.841 | 153.8 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1668.931 | 1715.946 | 1639.915 | 1715.946 | 256.7 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.409 | 2.047 | 1.256 | 2.047 | 153.8 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.962 | 4.047 | 3.878 | 4.047 | 256.7 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.114 | 0.239 | 0.087 | 0.239 | 151.6 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.707 | 0.724 | 0.674 | 0.724 | 256.7 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.011 | 0.048 | 0.010 | 0.048 | 140.5 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.453 | 0.469 | 0.428 | 0.469 | 256.7 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.358 | 0.476 | 0.342 | 0.476 | 145.2 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.624 | 18.736 | 14.491 | 18.736 | 256.7 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.015 | 0.013 | 0.015 | 139.2 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.479 | 0.523 | 0.450 | 0.523 | 256.7 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 192.952 | 206.994 | 185.020 | 206.994 | 158.3 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1724.403 | 2016.567 | 1675.379 | 2016.567 | 256.7 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 161.577 | 166.193 | 159.700 | 166.193 | 161.2 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1708.922 | 1782.362 | 1632.089 | 1782.362 | 256.7 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.773 | 0.903 | 0.718 | 0.903 | 158.4 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 4.143 | 4.515 | 4.099 | 4.515 | 256.7 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.093 | 0.110 | 0.084 | 0.110 | 158.3 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.711 | 0.808 | 0.694 | 0.808 | 256.7 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 14.273 | 14.804 | 14.159 | 14.804 | 157.2 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 51.730 | 52.344 | 51.233 | 52.344 | 256.7 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 14.478 | 15.269 | 14.124 | 15.269 | 155.2 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 51.687 | 52.854 | 51.313 | 52.854 | 256.7 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 14.815 | 15.918 | 14.305 | 15.918 | 150.1 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 45.517 | 52.390 | 45.294 | 52.390 | 256.7 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.287 | 0.341 | 0.241 | 0.341 | 152.2 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.536 | 5.692 | 5.478 | 5.692 | 256.7 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.029 | 0.012 | 0.029 | 135.2 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.481 | 0.513 | 0.469 | 0.513 | 256.7 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 176.446 | 207.609 | 174.255 | 207.609 | 156.7 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1709.303 | 1871.276 | 1642.814 | 1871.276 | 256.7 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 162.527 | 177.858 | 162.242 | 177.858 | 161.6 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1657.046 | 1708.992 | 1629.597 | 1708.992 | 256.7 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.768 | 0.974 | 0.744 | 0.974 | 158.7 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 4.068 | 5.048 | 3.873 | 5.048 | 256.7 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.095 | 0.126 | 0.079 | 0.126 | 156.7 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.747 | 0.789 | 0.729 | 0.789 | 256.7 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.428 | 3.792 | 3.289 | 3.792 | 155.5 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 24.034 | 26.069 | 23.489 | 26.069 | 256.7 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.611 | 4.711 | 3.477 | 4.711 | 153.7 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 25.389 | 27.488 | 24.470 | 27.488 | 256.7 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 4.453 | 6.166 | 3.984 | 6.166 | 149.8 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 20.197 | 21.829 | 16.954 | 21.829 | 256.7 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.278 | 0.315 | 0.262 | 0.315 | 152.0 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 6.088 | 7.669 | 5.924 | 7.669 | 256.7 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.967 | 9.096 | 7.966 | 9.096 | 159.8 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 51.439 | 56.006 | 50.553 | 56.006 | 256.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.341 | 1.425 | 1.246 | 1.425 | 156.8 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 10.190 | 10.393 | 10.004 | 10.393 | 256.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.371 | 0.454 | 0.368 | 0.454 | 155.8 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.105 | 5.222 | 5.080 | 5.222 | 256.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.507 | 0.694 | 0.441 | 0.694 | 151.3 |
| evaluation-flat-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.779 | 7.607 | 5.632 | 7.607 | 256.7 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 188.873 | 196.106 | 186.428 | 196.106 | 156.7 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1489.641 | 1582.627 | 1486.352 | 1582.627 | 256.7 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.642 | 2.671 | 2.624 | 2.671 | 156.6 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.390 | 1.495 | 1.348 | 1.495 | 256.7 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.154 | 0.174 | 0.152 | 0.174 | 131.0 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.546 | 0.582 | 0.542 | 0.582 | 256.7 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.088 | 0.108 | 0.085 | 0.108 | 156.4 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.542 | 6.439 | 5.356 | 6.439 | 256.7 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 2.189 | 2.392 | 1.887 | 2.392 | 134.8 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.789 | 0.812 | 0.779 | 0.812 | 256.7 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 5.869 | 7.951 | 5.659 | 7.951 | 155.5 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 40.081 | 40.227 | 39.430 | 40.227 | 256.7 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 6.375 | 10.856 | 5.838 | 10.856 | 151.7 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 62.488 | 68.173 | 62.107 | 68.173 | 256.7 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 189.974 | 200.323 | 187.248 | 200.323 | 153.7 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1664.814 | 1719.324 | 1552.304 | 1719.324 | 256.7 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.210 | 1.277 | 1.159 | 1.277 | 153.6 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.493 | 1.583 | 1.485 | 1.583 | 256.7 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.037 | 0.043 | 0.037 | 0.043 | 130.6 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.437 | 0.481 | 0.434 | 0.481 | 256.7 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.118 | 0.128 | 0.111 | 0.128 | 152.2 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.682 | 7.589 | 5.468 | 7.589 | 256.7 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.070 | 1.326 | 1.062 | 1.326 | 130.6 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.836 | 1.037 | 0.790 | 1.037 | 256.7 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 4.229 | 7.806 | 3.973 | 7.806 | 149.8 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 52.988 | 64.635 | 51.819 | 64.635 | 256.7 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 1.890 | 2.960 | 1.866 | 2.960 | 157.5 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.612 | 16.015 | 13.528 | 16.015 | 256.7 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.272 | 0.331 | 0.267 | 0.331 | 182.6 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.007 | 0.005 | 0.007 | 256.7 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.304 | 0.355 | 0.270 | 0.355 | 173.0 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.011 | 0.009 | 0.011 | 256.7 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 14.069 | 15.957 | 13.652 | 15.957 | 153.6 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 172.755 | 215.806 | 172.390 | 215.806 | 256.7 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 62.127 | 66.257 | 60.357 | 66.257 | 162.8 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 308.110 | 384.600 | 307.885 | 384.600 | 256.7 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 269.807 | 272.368 | 264.196 | 272.368 | 197.5 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1762.904 | 1816.001 | 1758.294 | 1816.001 | 256.7 |
| evaluation-flat-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 7.127 | 11.782 | 6.532 | 11.782 | 197.4 |
| evaluation-flat-regressor-model-point | evaluation-baseline | python-prophet | 4 | 2.125 | 2.303 | 2.035 | 2.303 | 256.7 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.249 | 0.277 | 0.244 | 0.277 | 133.2 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.767 | 0.835 | 0.747 | 0.835 | 256.7 |
| evaluation-flat-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.111 | 0.114 | 0.106 | 0.114 | 179.7 |
| evaluation-flat-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.588 | 5.789 | 5.585 | 5.789 | 256.7 |
| evaluation-flat-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.901 | 4.160 | 2.463 | 4.160 | 143.1 |
| evaluation-flat-regressor-model-point | evaluation-plan | python-prophet | 4 | 1.050 | 1.297 | 1.039 | 1.297 | 256.7 |
| evaluation-flat-regressor-model-point | evaluation-point | effect-prophet | 4 | 60.625 | 63.078 | 59.843 | 63.078 | 165.4 |
| evaluation-flat-regressor-model-point | evaluation-point | python-prophet | 4 | 233.822 | 251.266 | 231.295 | 251.266 | 256.7 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.135 | 0.156 | 0.128 | 0.156 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.655 | 0.813 | 0.617 | 0.813 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 184.827 | 200.778 | 179.512 | 200.778 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1553.746 | 1627.085 | 1550.067 | 1627.085 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 174.211 | 193.624 | 170.514 | 193.624 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1548.881 | 1586.197 | 1547.750 | 1586.197 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.151 | 0.189 | 0.135 | 0.189 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 4.482 | 5.315 | 4.266 | 5.315 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.058 | 0.119 | 0.048 | 0.119 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.992 | 1.526 | 0.894 | 1.526 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.150 | 2.988 | 1.973 | 2.988 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 16.038 | 19.606 | 15.457 | 19.606 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.239 | 2.621 | 2.227 | 2.621 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 15.276 | 17.296 | 15.096 | 17.296 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.156 | 2.746 | 2.103 | 2.746 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 10.764 | 11.559 | 10.499 | 11.559 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.520 | 0.565 | 0.496 | 0.565 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 5.149 | 5.893 | 5.140 | 5.893 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.045 | 0.051 | 0.031 | 0.051 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.536 | 0.581 | 0.522 | 0.581 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 176.027 | 182.308 | 175.893 | 182.308 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1552.976 | 1812.210 | 1514.364 | 1812.210 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 166.079 | 170.694 | 165.364 | 170.694 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1609.692 | 1774.069 | 1516.412 | 1774.069 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.137 | 0.175 | 0.123 | 0.175 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.817 | 3.963 | 3.697 | 3.963 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.037 | 0.041 | 0.027 | 0.041 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.761 | 0.870 | 0.729 | 0.870 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.784 | 5.369 | 4.461 | 5.369 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.864 | 31.090 | 28.214 | 31.090 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.721 | 4.995 | 4.593 | 4.995 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 30.360 | 30.655 | 29.958 | 30.655 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 5.282 | 6.136 | 5.226 | 6.136 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 23.023 | 24.576 | 22.824 | 24.576 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.481 | 2.570 | 0.392 | 2.570 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 5.284 | 5.940 | 5.013 | 5.940 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.428 | 170.796 | 163.398 | 170.796 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1488.977 | 1541.251 | 1455.979 | 1541.251 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.165 | 0.122 | 0.165 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.074 | 2.110 | 2.044 | 2.110 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.018 | 0.021 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.404 | 0.419 | 0.398 | 0.419 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.218 | 2.382 | 1.161 | 2.382 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.069 | 3.196 | 2.985 | 3.196 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.326 | 0.360 | 0.298 | 0.360 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.645 | 2.764 | 2.589 | 2.764 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 165.140 | 187.313 | 161.534 | 187.313 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1473.032 | 1521.226 | 1450.035 | 1521.226 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.152 | 0.171 | 0.123 | 0.171 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.113 | 2.351 | 2.067 | 2.351 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.040 | 0.018 | 0.040 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.397 | 0.409 | 0.384 | 0.409 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.256 | 2.189 | 0.998 | 2.189 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.133 | 3.455 | 3.099 | 3.455 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.266 | 0.294 | 0.244 | 0.294 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.702 | 2.762 | 2.687 | 2.762 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.142 | 0.215 | 0.110 | 0.215 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.949 | 0.987 | 0.948 | 0.987 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 189.955 | 195.778 | 180.314 | 195.778 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1496.911 | 1570.924 | 1472.031 | 1570.924 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 178.659 | 188.276 | 171.329 | 188.276 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1471.051 | 1730.597 | 1470.568 | 1730.597 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.191 | 0.287 | 0.172 | 0.287 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.673 | 4.442 | 3.591 | 4.442 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.021 | 0.033 | 0.020 | 0.033 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.205 | 1.256 | 1.202 | 1.256 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.909 | 8.334 | 4.816 | 8.334 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 34.053 | 35.082 | 31.778 | 35.082 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 6.911 | 8.976 | 5.900 | 8.976 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 31.602 | 35.596 | 31.383 | 35.596 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 5.125 | 5.155 | 5.012 | 5.155 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 26.499 | 28.355 | 25.713 | 28.355 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.975 | 1.400 | 0.973 | 1.400 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.720 | 4.829 | 4.504 | 4.829 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.017 | 0.014 | 0.017 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.506 | 0.548 | 0.498 | 0.548 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 177.281 | 195.216 | 175.317 | 195.216 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1485.170 | 1528.787 | 1444.336 | 1528.787 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 166.136 | 169.909 | 163.605 | 169.909 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1460.588 | 1643.963 | 1454.525 | 1643.963 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.118 | 0.165 | 0.077 | 0.165 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.190 | 2.331 | 2.118 | 2.331 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.024 | 0.028 | 0.022 | 0.028 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.471 | 0.497 | 0.446 | 0.497 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.426 | 1.605 | 1.402 | 1.605 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.852 | 15.610 | 12.672 | 15.610 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 2.029 | 3.390 | 1.506 | 3.390 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 12.113 | 15.004 | 11.991 | 15.004 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.883 | 2.264 | 1.796 | 2.264 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 10.709 | 12.614 | 9.133 | 12.614 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.312 | 0.511 | 0.289 | 0.511 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.212 | 4.346 | 3.181 | 4.346 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.018 | 0.011 | 0.018 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.455 | 0.515 | 0.454 | 0.515 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 183.517 | 195.608 | 169.800 | 195.608 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1499.978 | 1557.307 | 1486.347 | 1557.307 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 162.842 | 180.686 | 158.532 | 180.686 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1484.969 | 1638.321 | 1449.915 | 1638.321 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.111 | 0.134 | 0.100 | 0.134 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.145 | 2.290 | 2.089 | 2.290 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.024 | 0.078 | 0.021 | 0.078 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.445 | 0.485 | 0.431 | 0.485 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.463 | 1.811 | 1.415 | 1.811 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 13.373 | 15.423 | 12.553 | 15.423 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.845 | 3.861 | 1.398 | 3.861 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 12.442 | 14.122 | 12.187 | 14.122 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 2.284 | 3.130 | 1.793 | 3.130 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 9.396 | 10.601 | 8.811 | 10.601 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.277 | 0.316 | 0.266 | 0.316 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.109 | 4.178 | 3.075 | 4.178 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.022 | 0.015 | 0.022 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.502 | 0.563 | 0.488 | 0.563 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 293.791 | 315.440 | 284.031 | 315.440 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1913.744 | 2044.159 | 1862.930 | 2044.159 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 163.256 | 173.824 | 160.600 | 173.824 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1487.798 | 1554.679 | 1470.491 | 1554.679 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.137 | 0.145 | 0.096 | 0.145 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.625 | 3.319 | 2.433 | 3.319 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.025 | 0.045 | 0.025 | 0.045 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.621 | 2.842 | 0.514 | 2.842 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 105.166 | 119.982 | 103.935 | 119.982 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 404.124 | 448.175 | 395.612 | 448.175 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 104.194 | 112.117 | 103.715 | 112.117 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 398.334 | 431.313 | 395.150 | 431.313 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 104.653 | 107.366 | 103.299 | 107.366 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 392.657 | 405.811 | 390.916 | 405.811 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.324 | 0.573 | 0.301 | 0.573 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.763 | 4.603 | 3.381 | 4.603 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 167.539 | 318.936 | 159.464 | 318.936 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1483.851 | 1499.997 | 1461.909 | 1499.997 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.149 | 0.181 | 0.133 | 0.181 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.236 | 2.938 | 2.119 | 2.938 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.028 | 0.018 | 0.028 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.464 | 0.722 | 0.439 | 0.722 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.713 | 2.551 | 1.590 | 2.551 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.616 | 8.373 | 7.191 | 8.373 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.297 | 0.416 | 0.286 | 0.416 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.788 | 3.593 | 2.739 | 3.593 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 185.820 | 217.939 | 175.296 | 217.939 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1467.600 | 2225.522 | 1455.191 | 2225.522 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.176 | 0.224 | 0.136 | 0.224 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.104 | 14.659 | 2.056 | 14.659 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.043 | 0.019 | 0.043 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.417 | 0.506 | 0.415 | 0.506 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 4.113 | 5.501 | 3.962 | 5.501 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 20.183 | 22.204 | 19.996 | 22.204 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.365 | 0.465 | 0.346 | 0.465 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.704 | 3.641 | 2.690 | 3.641 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.136 | 2.083 | 0.037 | 2.083 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.558 | 0.584 | 0.530 | 0.584 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 231.654 | 278.937 | 230.399 | 278.937 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1517.370 | 1579.219 | 1512.536 | 1579.219 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 231.457 | 239.393 | 200.944 | 239.393 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1511.839 | 1787.515 | 1473.582 | 1787.515 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.174 | 0.834 | 0.174 | 0.834 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.740 | 6.004 | 3.578 | 6.004 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.037 | 0.049 | 0.030 | 0.049 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.670 | 1.175 | 0.662 | 1.175 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.763 | 4.088 | 3.529 | 4.088 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 52.552 | 53.387 | 51.281 | 53.387 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.821 | 4.091 | 3.812 | 4.091 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 51.173 | 52.790 | 50.097 | 52.790 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 4.779 | 5.118 | 4.654 | 5.118 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 46.113 | 50.905 | 45.666 | 50.905 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.385 | 0.504 | 0.332 | 0.504 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.856 | 5.202 | 4.809 | 5.202 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.930 | 179.241 | 158.992 | 179.241 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1605.111 | 1768.496 | 1585.917 | 1768.496 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.181 | 0.185 | 0.175 | 0.185 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.834 | 4.786 | 3.662 | 4.786 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.021 | 0.017 | 0.021 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.687 | 0.691 | 0.675 | 0.691 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 2.565 | 4.285 | 2.010 | 4.285 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 9.103 | 10.454 | 9.035 | 10.454 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.423 | 0.612 | 0.334 | 0.612 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 5.018 | 6.391 | 4.927 | 6.391 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.841 | 166.240 | 162.923 | 166.240 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1511.346 | 1535.014 | 1500.917 | 1535.014 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.172 | 0.179 | 0.164 | 0.179 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.997 | 4.709 | 3.893 | 4.709 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.017 | 0.021 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.846 | 1.201 | 0.833 | 1.201 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 3.264 | 4.915 | 2.311 | 4.915 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 11.548 | 12.301 | 10.255 | 12.301 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.525 | 1.148 | 0.490 | 1.148 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.935 | 5.215 | 4.911 | 5.215 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.115 | 0.140 | 0.088 | 0.140 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.705 | 0.825 | 0.659 | 0.825 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 182.759 | 189.766 | 181.906 | 189.766 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1443.227 | 1546.473 | 1439.251 | 1546.473 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 170.123 | 171.466 | 169.549 | 171.466 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1497.252 | 1559.690 | 1443.843 | 1559.690 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.156 | 0.377 | 0.124 | 0.377 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.980 | 4.448 | 3.855 | 4.448 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.030 | 0.050 | 0.025 | 0.050 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.823 | 0.946 | 0.806 | 0.946 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.053 | 2.128 | 2.000 | 2.128 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 15.249 | 19.361 | 14.901 | 19.361 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.217 | 3.514 | 2.203 | 3.514 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 14.112 | 18.351 | 13.890 | 18.351 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.490 | 2.996 | 2.448 | 2.996 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.772 | 11.713 | 9.386 | 11.713 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.524 | 0.831 | 0.480 | 0.831 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.763 | 6.518 | 4.763 | 6.518 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.046 | 0.058 | 0.040 | 0.058 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.534 | 0.566 | 0.524 | 0.566 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 176.497 | 200.239 | 175.054 | 200.239 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1472.998 | 1512.339 | 1443.266 | 1512.339 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 166.993 | 184.916 | 165.577 | 184.916 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1473.604 | 1543.534 | 1435.692 | 1543.534 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.152 | 0.244 | 0.122 | 0.244 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 4.121 | 5.101 | 3.838 | 5.101 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.029 | 0.033 | 0.028 | 0.033 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.689 | 0.719 | 0.655 | 0.719 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.205 | 2.154 | 1.200 | 2.154 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 13.214 | 13.729 | 12.895 | 13.729 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.342 | 1.402 | 1.335 | 1.402 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.291 | 15.840 | 12.261 | 15.840 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.920 | 2.334 | 1.790 | 2.334 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.543 | 7.648 | 7.529 | 7.648 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.286 | 0.305 | 0.278 | 0.305 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.671 | 4.707 | 4.620 | 4.707 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.428 | 181.682 | 161.102 | 181.682 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1452.179 | 1475.783 | 1446.921 | 1475.783 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.159 | 0.173 | 0.123 | 0.173 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.111 | 2.168 | 2.059 | 2.168 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.020 | 0.017 | 0.020 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.427 | 0.468 | 0.401 | 0.468 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 2.269 | 4.979 | 1.574 | 4.979 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.716 | 8.201 | 6.989 | 8.201 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.216 | 0.298 | 0.214 | 0.298 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.661 | 2.994 | 2.657 | 2.994 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.098 | 191.320 | 160.131 | 191.320 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1516.039 | 1649.442 | 1445.183 | 1649.442 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.219 | 0.136 | 0.219 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.139 | 2.433 | 2.045 | 2.433 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.022 | 0.017 | 0.022 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.536 | 0.842 | 0.512 | 0.842 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 4.278 | 6.002 | 3.885 | 6.002 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 21.870 | 23.130 | 21.617 | 23.130 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.293 | 0.346 | 0.272 | 0.346 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.930 | 3.134 | 2.896 | 3.134 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.119 | 169.920 | 165.080 | 169.920 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1467.983 | 1777.417 | 1464.764 | 1777.417 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.203 | 0.255 | 0.188 | 0.255 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.894 | 4.408 | 3.780 | 4.408 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.018 | 0.021 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.791 | 0.849 | 0.789 | 0.849 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 3.386 | 5.638 | 2.184 | 5.638 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 9.308 | 12.666 | 9.017 | 12.666 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.168 | 0.176 | 0.151 | 0.176 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.767 | 11.781 | 4.703 | 11.781 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.572 | 166.729 | 159.688 | 166.729 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1459.658 | 1502.715 | 1436.286 | 1502.715 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.210 | 0.226 | 0.183 | 0.226 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 4.039 | 4.425 | 3.908 | 4.425 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.029 | 0.021 | 0.029 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.797 | 0.824 | 0.790 | 0.824 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 2.244 | 5.616 | 2.191 | 5.616 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.970 | 9.442 | 8.810 | 9.442 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.178 | 0.309 | 0.165 | 0.309 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.725 | 5.866 | 4.692 | 5.866 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 172.265 | 187.897 | 167.995 | 187.897 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1504.619 | 1848.739 | 1455.463 | 1848.739 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.216 | 0.311 | 0.184 | 0.311 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.873 | 5.042 | 3.864 | 5.042 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.041 | 0.022 | 0.041 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.798 | 0.827 | 0.788 | 0.827 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.415 | 5.298 | 3.131 | 5.298 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 9.028 | 9.225 | 8.851 | 9.225 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.168 | 0.171 | 0.163 | 0.171 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.878 | 5.007 | 4.763 | 5.007 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 167.075 | 167.985 | 165.487 | 167.985 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1566.851 | 1676.328 | 1453.469 | 1676.328 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.188 | 0.200 | 0.184 | 0.200 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.848 | 4.116 | 3.834 | 4.116 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.036 | 0.021 | 0.036 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.807 | 0.846 | 0.803 | 0.846 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 2.276 | 6.097 | 2.262 | 6.097 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 9.002 | 9.839 | 8.837 | 9.839 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.152 | 0.172 | 0.152 | 0.172 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.733 | 4.973 | 4.692 | 4.973 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 167.116 | 181.077 | 165.043 | 181.077 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1557.633 | 1722.282 | 1537.143 | 1722.282 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.267 | 2.164 | 0.243 | 2.164 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.731 | 4.202 | 3.697 | 4.202 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.028 | 0.018 | 0.028 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.646 | 0.673 | 0.629 | 0.673 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.939 | 3.617 | 1.726 | 3.617 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 9.158 | 9.666 | 9.006 | 9.666 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.237 | 1.108 | 0.231 | 1.108 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.967 | 5.938 | 4.926 | 5.938 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.443 | 171.543 | 158.600 | 171.543 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1474.828 | 1495.714 | 1472.742 | 1495.714 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.255 | 2.671 | 0.213 | 2.671 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.797 | 4.565 | 3.716 | 4.565 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.024 | 0.020 | 0.024 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.641 | 0.661 | 0.634 | 0.661 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.898 | 3.953 | 1.797 | 3.953 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 8.211 | 10.434 | 7.592 | 10.434 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.244 | 1.037 | 0.219 | 1.037 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.995 | 5.509 | 4.761 | 5.509 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.512 | 171.699 | 163.292 | 171.699 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1533.230 | 1660.059 | 1462.816 | 1660.059 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.183 | 0.208 | 0.179 | 0.208 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.653 | 4.199 | 3.623 | 4.199 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.028 | 0.021 | 0.028 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.679 | 0.787 | 0.649 | 0.787 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 1.935 | 2.931 | 1.702 | 2.931 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 9.024 | 11.646 | 8.433 | 11.646 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.216 | 0.283 | 0.201 | 0.283 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 5.390 | 6.049 | 5.110 | 6.049 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.243 | 167.260 | 157.132 | 167.260 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1493.634 | 1585.040 | 1455.345 | 1585.040 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.172 | 0.468 | 0.166 | 0.468 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 4.018 | 4.882 | 3.903 | 4.882 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.023 | 0.020 | 0.023 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.632 | 0.665 | 0.595 | 0.665 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.714 | 2.097 | 1.413 | 2.097 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 9.579 | 10.926 | 8.420 | 10.926 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.238 | 0.405 | 0.232 | 0.405 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.951 | 6.300 | 4.807 | 6.300 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.484 | 188.543 | 161.934 | 188.543 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1449.086 | 1576.309 | 1438.551 | 1576.309 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.214 | 0.294 | 0.203 | 0.294 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.684 | 3.842 | 3.613 | 3.842 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.046 | 0.020 | 0.046 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.639 | 0.653 | 0.629 | 0.653 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.600 | 6.061 | 2.393 | 6.061 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 8.414 | 8.831 | 8.216 | 8.831 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.344 | 1.090 | 0.343 | 1.090 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 5.198 | 5.460 | 4.833 | 5.460 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.806 | 170.104 | 164.315 | 170.104 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1503.379 | 1568.992 | 1476.654 | 1568.992 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.187 | 0.265 | 0.181 | 0.265 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.886 | 4.231 | 3.866 | 4.231 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.023 | 0.022 | 0.023 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.618 | 0.754 | 0.584 | 0.754 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 1.813 | 2.341 | 1.456 | 2.341 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 8.530 | 9.838 | 7.707 | 9.838 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.259 | 0.312 | 0.240 | 0.312 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.777 | 6.745 | 4.706 | 6.745 | n/a |
| flat-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.104 | 0.113 | 0.102 | 0.113 | n/a |
| flat-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.955 | 1.225 | 0.933 | 1.225 | n/a |
| flat-regressor-model | cold-first-forecast | effect-prophet | 4 | 216.760 | 236.940 | 211.376 | 236.940 | n/a |
| flat-regressor-model | cold-first-forecast | python-prophet | 4 | 1648.421 | 1692.730 | 1590.544 | 1692.730 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 24.408 | 24.862 | 23.761 | 24.862 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 137.610 | 141.298 | 134.753 | 141.298 | n/a |
| flat-regressor-model | warm-fit-predict | effect-prophet | 4 | 26.732 | 29.148 | 25.738 | 29.148 | n/a |
| flat-regressor-model | warm-fit-predict | python-prophet | 4 | 134.520 | 141.241 | 133.942 | 141.241 | n/a |
| flat-regressor-model | warm-fit | effect-prophet | 4 | 24.624 | 26.547 | 24.575 | 26.547 | n/a |
| flat-regressor-model | warm-fit | python-prophet | 4 | 113.457 | 147.892 | 110.648 | 147.892 | n/a |
| flat-regressor-model | warm-predict | effect-prophet | 4 | 1.586 | 1.769 | 1.555 | 1.769 | n/a |
| flat-regressor-model | warm-predict | python-prophet | 4 | 29.960 | 33.602 | 28.746 | 33.602 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.497 | 187.679 | 161.665 | 187.679 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1467.193 | 1558.887 | 1460.098 | 1558.887 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.225 | 0.282 | 0.181 | 0.282 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.202 | 2.530 | 2.139 | 2.530 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.028 | 0.020 | 0.028 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.483 | 0.599 | 0.429 | 0.599 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 152.650 | 158.322 | 150.375 | 158.322 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 620.190 | 625.082 | 615.701 | 625.082 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.353 | 0.383 | 0.314 | 0.383 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.196 | 3.645 | 3.029 | 3.645 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 173.204 | 176.695 | 165.180 | 176.695 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1472.628 | 1644.790 | 1435.760 | 1644.790 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.173 | 0.199 | 0.173 | 0.199 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.213 | 2.740 | 2.144 | 2.740 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.043 | 0.020 | 0.043 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.437 | 0.460 | 0.401 | 0.460 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.279 | 5.248 | 4.041 | 5.248 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 20.346 | 24.299 | 20.148 | 24.299 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.313 | 0.443 | 0.313 | 0.443 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.101 | 4.253 | 3.065 | 4.253 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 167.198 | 174.792 | 166.892 | 174.792 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1454.232 | 1504.843 | 1435.335 | 1504.843 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.169 | 0.236 | 0.127 | 0.236 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.877 | 1.949 | 1.799 | 1.949 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.019 | 0.039 | 0.018 | 0.039 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.342 | 0.346 | 0.331 | 0.346 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.605 | 0.730 | 0.564 | 0.730 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.936 | 3.075 | 2.852 | 3.075 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.164 | 0.221 | 0.155 | 0.221 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.669 | 3.029 | 2.656 | 3.029 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 169.118 | 176.407 | 168.120 | 176.407 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1440.134 | 1544.828 | 1426.064 | 1544.828 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.151 | 0.215 | 0.143 | 0.215 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.941 | 2.032 | 1.835 | 2.032 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.020 | 0.028 | 0.018 | 0.028 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.331 | 0.363 | 0.320 | 0.363 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 1.019 | 1.321 | 0.991 | 1.321 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.435 | 5.811 | 5.302 | 5.811 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.168 | 0.356 | 0.159 | 0.356 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.747 | 2.898 | 2.667 | 2.898 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 305.133 | 319.585 | 297.372 | 319.585 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2019.601 | 2110.082 | 1992.065 | 2110.082 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 172.147 | 182.312 | 169.128 | 182.312 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1586.930 | 1663.018 | 1570.484 | 1663.018 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.142 | 0.171 | 0.123 | 0.171 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.194 | 2.295 | 2.117 | 2.295 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.019 | 0.035 | 0.016 | 0.035 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.451 | 0.503 | 0.424 | 0.503 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.027 | 0.041 | 0.025 | 0.041 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.498 | 0.574 | 0.485 | 0.574 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.784 | 5.680 | 4.623 | 5.680 | 148.4 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 123.668 | 138.096 | 121.706 | 138.096 | 256.7 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 178.226 | 181.026 | 170.957 | 181.026 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1665.127 | 2080.444 | 1608.640 | 2080.444 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 169.044 | 174.232 | 164.274 | 174.232 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1898.331 | 2014.938 | 1683.296 | 2014.938 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.188 | 0.305 | 0.166 | 0.305 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 4.277 | 5.235 | 4.118 | 5.235 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.023 | 0.031 | 0.022 | 0.031 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.685 | 0.986 | 0.654 | 0.986 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.043 | 0.057 | 0.031 | 0.057 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.545 | 0.733 | 0.526 | 0.733 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.295 | 1.818 | 0.977 | 1.818 | 139.6 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 77.414 | 78.648 | 73.637 | 78.648 | 256.7 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 182.737 | 191.690 | 174.582 | 191.690 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1704.913 | 2445.069 | 1658.704 | 2445.069 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 170.707 | 208.500 | 165.279 | 208.500 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1658.055 | 1723.939 | 1620.409 | 1723.939 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.206 | 0.458 | 0.180 | 0.458 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 5.246 | 7.037 | 4.537 | 7.037 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.022 | 0.035 | 0.019 | 0.035 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.901 | 1.072 | 0.851 | 1.072 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.113 | 0.171 | 0.086 | 0.171 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.692 | 0.858 | 0.664 | 0.858 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.997 | 1.187 | 0.962 | 1.187 | 151.2 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 23.288 | 43.134 | 21.328 | 43.134 | 256.7 |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 239.210 | 247.157 | 235.235 | 247.157 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1922.876 | 2029.326 | 1900.394 | 2029.326 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.111 | 0.206 | 0.100 | 0.206 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.936 | 0.961 | 0.924 | 0.961 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 18.884 | 19.737 | 17.884 | 19.737 | 192.6 |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 288.481 | 436.199 | 272.601 | 436.199 | 256.7 |
| warm-start-flat-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 106.616 | 108.326 | 104.566 | 108.326 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-fit | python-prophet | 6 | 405.624 | 412.168 | 397.402 | 412.168 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 6.609 | 7.955 | 6.294 | 7.955 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 8.960 | 10.865 | 8.849 | 10.865 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `e38322b64aa058247a89e2197cd98ad9ea44f2f5`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-flat-additive`, `country-explicit-us-flat-additive`, `country-us-flat-multiplicative`, `country-explicit-us-flat-multiplicative`, `country-boundary-flat`, `country-empty-bv-flat`, `country-explicit-empty-flat`, `country-estimated-sg-flat`, `country-partial-in-flat`, `country-mixed-us-flat`, `country-none-flat-730`, `country-se-flat-730`, `country-explicit-se-flat-730`, `country-cn-flat-730`, `country-explicit-cn-flat-730`, `country-none-flat-2190`, `country-se-flat-2190`, `country-explicit-se-flat-2190`, `country-cn-flat-2190`, `country-explicit-cn-flat-2190`, `country-none-flat-2190-batch-32`, `country-se-flat-2190-batch-32`, `country-explicit-se-flat-2190-batch-32`, `country-uncertainty-us-flat`, `map-training-zero-span-flat-varied`, `map-training-zero-span-flat-constant`, `flat-mixed-components`, `flat-mixed-components-large`, `uncertainty-flat-defaults-seasonal-intervals-1000`, `uncertainty-flat-mixed-components-full-intervals-512`, `uncertainty-flat-mixed-components-large-full-samples-128`, `anomalies-flat-defaults-99`, `warm-start-flat-defaults-7-new-rows`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `evaluation-flat-large-months-metrics`, `flat-defaults-level`, `flat-defaults-seasonal`, `flat-defaults-negative`, `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`, `flat-additive-components`, `flat-additive-components-large`, `flat-mixed-components-absmax-defaults`, `flat-correlated-regressors`, `flat-regressor-model`, `uncertainty-flat-regressor-model-intervals-1000`, `evaluation-flat-regressor-model-point`, `evaluation-flat-regressor-model-intervals`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:cd8988251fd7923096182d824ed43a8c3f0f87f9df88dacf371f852210b2b070`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:2fab6886e0c60430dea9af2941531e60a69de9161b2f5de67a7e17206490660e`

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

