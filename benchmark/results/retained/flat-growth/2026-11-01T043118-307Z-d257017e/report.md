# Effect Prophet benchmark — 2026-11-01T043118-307Z-d257017e

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
| evaluation-flat-large-months-metrics | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 4.099e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed, and Effect's built-in and custom metrics on Python's own CV rows equal performance_metrics exactly in both horizon units; public evaluation/metric work differs. MASE fold scales agree within 1e-12 relative, and overall MASE within its forecasts' difference. Absolute times only. |
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
| anomalies-flat-defaults-99 | warm-anomalies | effect-prophet | 6 | 10.222 | 10.500 | 9.356 | 10.500 | n/a |
| anomalies-flat-defaults-99 | warm-anomalies | python-prophet | 6 | 141.837 | 185.409 | 138.633 | 185.409 | n/a |
| anomalies-flat-defaults-99 | warm-fit | effect-prophet | 6 | 2.491 | 4.061 | 1.775 | 4.061 | n/a |
| anomalies-flat-defaults-99 | warm-fit | python-prophet | 6 | 7.090 | 8.348 | 6.849 | 8.348 | n/a |
| anomalies-flat-defaults-99 | warm-uncertainty | effect-prophet | 6 | 6.469 | 7.440 | 6.378 | 7.440 | 150.5 |
| anomalies-flat-defaults-99 | warm-uncertainty | python-prophet | 6 | 123.538 | 137.318 | 121.543 | 137.318 | 256.9 |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.010 | 0.016 | 0.009 | 0.016 | 141.9 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.437 | 0.459 | 0.417 | 0.459 | 256.9 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 195.579 | 199.267 | 192.862 | 199.267 | 161.6 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1658.151 | 1703.936 | 1645.387 | 1703.936 | 256.9 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 160.226 | 161.038 | 158.899 | 161.038 | 164.7 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1580.139 | 1643.349 | 1564.629 | 1643.349 | 256.9 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.742 | 0.845 | 0.690 | 0.845 | 161.8 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.292 | 3.449 | 3.230 | 3.449 | 256.9 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.076 | 0.093 | 0.075 | 0.093 | 161.6 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.514 | 0.543 | 0.499 | 0.543 | 256.9 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 21.747 | 22.422 | 21.230 | 22.422 | 159.7 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 71.517 | 74.087 | 71.081 | 74.087 | 256.9 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 22.043 | 22.733 | 21.441 | 22.733 | 158.1 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 71.318 | 72.565 | 70.527 | 72.565 | 256.9 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 22.297 | 23.532 | 21.902 | 23.532 | 155.0 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 65.851 | 66.745 | 64.564 | 66.745 | 256.9 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.236 | 0.310 | 0.219 | 0.310 | 155.1 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.268 | 5.328 | 5.182 | 5.328 | 256.9 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 186.308 | 192.303 | 182.497 | 192.303 | 233.0 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1640.830 | 1656.868 | 1618.953 | 1656.868 | 256.9 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.966 | 3.462 | 2.881 | 3.462 | 225.8 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.153 | 9.305 | 9.111 | 9.305 | 256.9 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.137 | 0.287 | 0.114 | 0.287 | 219.4 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.078 | 3.211 | 2.997 | 3.211 | 256.9 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 21.067 | 29.807 | 20.668 | 29.807 | 206.0 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 83.248 | 84.349 | 82.468 | 84.349 | 256.9 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.335 | 5.013 | 2.569 | 5.013 | 218.3 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.783 | 9.026 | 8.724 | 9.026 | 256.9 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 180.591 | 190.924 | 175.741 | 190.924 | 210.8 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1601.955 | 1609.115 | 1588.123 | 1609.115 | 256.9 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.750 | 2.487 | 1.714 | 2.487 | 210.7 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 4.967 | 5.122 | 4.900 | 5.122 | 256.9 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.122 | 0.549 | 0.106 | 0.549 | 205.5 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.267 | 1.296 | 1.249 | 1.296 | 256.9 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 7.923 | 10.056 | 7.130 | 10.056 | 159.0 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 24.640 | 25.652 | 24.354 | 25.652 | 256.9 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.748 | 6.509 | 2.649 | 6.509 | 195.7 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 7.076 | 7.627 | 6.944 | 7.627 | 256.9 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.016 | 0.011 | 0.016 | 138.1 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.475 | 0.573 | 0.458 | 0.573 | 256.9 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 167.772 | 173.326 | 166.312 | 173.326 | 150.9 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1596.212 | 1632.658 | 1580.922 | 1632.658 | 256.9 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 157.966 | 176.084 | 157.332 | 176.084 | 153.1 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1573.255 | 1743.346 | 1554.562 | 1743.346 | 256.9 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.237 | 0.309 | 0.203 | 0.309 | 151.0 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.026 | 2.101 | 2.021 | 2.101 | 256.9 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.037 | 0.054 | 0.026 | 0.054 | 150.9 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.439 | 0.471 | 0.395 | 0.471 | 256.9 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.582 | 2.081 | 1.486 | 2.081 | 150.8 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 12.944 | 18.391 | 12.899 | 18.391 | 256.9 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.679 | 2.124 | 1.607 | 2.124 | 149.7 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.479 | 13.009 | 12.253 | 13.009 | 256.9 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.550 | 3.738 | 2.419 | 3.738 | 149.5 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.489 | 9.863 | 9.344 | 9.863 | 256.9 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.150 | 0.160 | 0.118 | 0.160 | 149.5 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.136 | 3.282 | 3.045 | 3.282 | 256.9 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.047 | 0.054 | 0.037 | 0.054 | 149.2 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.571 | 0.588 | 0.541 | 0.588 | 256.9 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 201.472 | 204.739 | 198.277 | 204.739 | 187.9 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1651.842 | 1665.666 | 1642.914 | 1665.666 | 256.9 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 168.913 | 173.149 | 165.810 | 173.149 | 190.4 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1582.318 | 1663.686 | 1569.764 | 1663.686 | 256.9 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 0.784 | 2.253 | 0.776 | 2.253 | 190.1 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.128 | 3.275 | 3.089 | 3.275 | 256.9 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.087 | 0.121 | 0.086 | 0.121 | 189.4 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.491 | 0.532 | 0.484 | 0.532 | 256.9 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 20.271 | 21.224 | 19.491 | 21.224 | 187.0 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 68.986 | 70.392 | 67.982 | 70.392 | 256.9 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 20.247 | 22.128 | 19.642 | 22.128 | 173.0 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 67.728 | 68.365 | 66.798 | 68.365 | 256.9 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 19.690 | 20.188 | 19.089 | 20.188 | 155.2 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 62.471 | 63.731 | 61.701 | 63.731 | 256.9 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 2.099 | 2.329 | 1.478 | 2.329 | 160.0 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.155 | 5.194 | 5.095 | 5.194 | 256.9 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 181.232 | 205.153 | 180.945 | 205.153 | 247.7 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1453.198 | 1514.433 | 1439.540 | 1514.433 | 256.9 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.914 | 2.747 | 1.845 | 2.747 | 239.6 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.203 | 10.373 | 9.923 | 10.373 | 256.9 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.034 | 0.046 | 0.028 | 0.046 | 232.3 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.364 | 3.410 | 3.307 | 3.410 | 256.9 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 19.924 | 25.371 | 19.726 | 25.371 | 210.5 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 80.246 | 93.755 | 79.481 | 93.755 | 256.9 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.252 | 4.050 | 2.971 | 4.050 | 225.5 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.250 | 9.612 | 9.199 | 9.612 | 256.9 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 175.809 | 189.601 | 172.512 | 189.601 | 197.1 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1440.835 | 1483.580 | 1438.887 | 1483.580 | 256.9 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.825 | 1.050 | 0.797 | 1.050 | 194.5 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.918 | 6.056 | 5.846 | 6.056 | 256.9 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.026 | 0.037 | 0.023 | 0.037 | 191.0 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.497 | 1.513 | 1.463 | 1.513 | 256.9 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 6.130 | 7.966 | 5.607 | 7.966 | 150.2 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 20.875 | 22.530 | 20.803 | 22.530 | 256.9 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 4.174 | 4.650 | 2.720 | 4.650 | 183.2 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.704 | 20.681 | 6.467 | 20.681 | 256.9 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.011 | 0.013 | 0.011 | 0.013 | 137.6 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.504 | 0.428 | 0.504 | 256.9 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 168.241 | 178.062 | 163.664 | 178.062 | 156.9 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1422.609 | 1429.061 | 1416.363 | 1429.061 | 256.9 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 165.261 | 189.529 | 155.377 | 189.529 | 156.9 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1419.694 | 1430.794 | 1412.044 | 1430.794 | 256.9 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.089 | 0.111 | 0.071 | 0.111 | 156.9 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.042 | 2.126 | 1.997 | 2.126 | 256.9 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.019 | 0.039 | 0.018 | 0.039 | 156.9 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.442 | 0.498 | 0.414 | 0.498 | 256.9 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.175 | 1.538 | 1.119 | 1.538 | 156.8 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.342 | 11.719 | 11.216 | 11.719 | 256.9 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.563 | 3.347 | 1.193 | 3.347 | 156.7 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 10.723 | 11.364 | 10.681 | 11.364 | 256.9 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.874 | 2.065 | 1.631 | 2.065 | 145.8 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.056 | 8.783 | 7.962 | 8.783 | 256.9 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.170 | 0.180 | 0.129 | 0.180 | 148.3 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.633 | 2.712 | 2.565 | 2.712 | 256.9 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 173.180 | 191.248 | 171.611 | 191.248 | 189.7 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1462.146 | 1493.361 | 1441.462 | 1493.361 | 256.9 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.772 | 3.487 | 2.750 | 3.487 | 188.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.397 | 7.719 | 7.177 | 7.719 | 256.9 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.070 | 0.798 | 0.064 | 0.798 | 185.7 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.922 | 2.952 | 2.908 | 2.952 | 256.9 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 11.700 | 15.901 | 11.199 | 15.901 | 167.1 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 39.684 | 53.642 | 38.568 | 53.642 | 256.9 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.413 | 1.102 | 0.402 | 1.102 | 184.2 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 12.233 | 12.787 | 12.021 | 12.787 | 256.9 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 182.469 | 186.178 | 179.998 | 186.178 | 202.6 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1461.093 | 1471.740 | 1440.299 | 1471.740 | 256.9 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 3.181 | 3.461 | 3.127 | 3.461 | 200.0 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.339 | 7.522 | 7.149 | 7.522 | 256.9 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.055 | 0.058 | 0.050 | 0.058 | 198.1 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.951 | 2.980 | 2.908 | 2.980 | 256.9 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 14.654 | 17.298 | 13.516 | 17.298 | 187.3 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 40.278 | 53.391 | 39.490 | 53.391 | 256.9 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.917 | 2.605 | 1.853 | 2.605 | 192.5 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.474 | 18.187 | 13.422 | 18.187 | 256.9 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 177.494 | 182.100 | 173.153 | 182.100 | 187.7 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1451.045 | 1485.553 | 1440.942 | 1485.553 | 256.9 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 1.772 | 2.928 | 1.611 | 2.928 | 176.2 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.292 | 6.465 | 5.140 | 6.465 | 256.9 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.030 | 0.034 | 0.028 | 0.034 | 157.8 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.455 | 1.480 | 1.421 | 1.480 | 256.9 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 6.078 | 6.796 | 5.534 | 6.796 | 152.0 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 19.272 | 19.804 | 18.900 | 19.804 | 256.9 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 1.783 | 2.180 | 1.674 | 2.180 | 156.4 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 8.991 | 9.275 | 8.826 | 9.275 | 256.9 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.015 | 0.011 | 0.015 | 135.4 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.441 | 0.470 | 0.432 | 0.470 | 256.9 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 184.060 | 200.375 | 179.808 | 200.375 | 154.2 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1466.110 | 1512.919 | 1445.921 | 1512.919 | 256.9 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 159.259 | 163.843 | 157.032 | 163.843 | 154.3 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1413.401 | 1423.512 | 1407.040 | 1423.512 | 256.9 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.410 | 0.454 | 0.399 | 0.454 | 154.3 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 3.876 | 3.984 | 3.810 | 3.984 | 256.9 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.025 | 0.034 | 0.022 | 0.034 | 154.3 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.680 | 0.694 | 0.667 | 0.694 | 256.9 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 12.898 | 13.862 | 12.893 | 13.862 | 153.9 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 47.002 | 47.677 | 46.418 | 47.677 | 256.9 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.642 | 14.708 | 13.016 | 14.708 | 150.7 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 46.175 | 46.499 | 45.965 | 46.499 | 256.9 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 14.861 | 16.823 | 13.626 | 16.823 | 150.0 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 41.904 | 42.096 | 41.363 | 42.096 | 256.9 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.175 | 0.454 | 0.167 | 0.454 | 150.4 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.686 | 4.774 | 4.599 | 4.774 | 256.9 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.014 | 0.009 | 0.014 | 138.2 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.452 | 0.493 | 0.446 | 0.493 | 256.9 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 168.608 | 172.762 | 165.947 | 172.762 | 156.7 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1428.208 | 1439.958 | 1422.968 | 1439.958 | 256.9 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 155.910 | 161.724 | 154.976 | 161.724 | 156.7 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1435.920 | 1509.700 | 1411.283 | 1509.700 | 256.9 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.420 | 0.426 | 0.386 | 0.426 | 156.7 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.900 | 3.989 | 3.828 | 3.989 | 256.9 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.024 | 0.032 | 0.021 | 0.032 | 156.7 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.685 | 0.724 | 0.678 | 0.724 | 256.9 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.528 | 3.252 | 2.499 | 3.252 | 156.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.077 | 18.252 | 17.768 | 18.252 | 256.9 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.760 | 2.916 | 2.711 | 2.916 | 153.1 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 17.719 | 17.923 | 17.525 | 17.923 | 256.9 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.747 | 5.592 | 3.513 | 5.592 | 152.0 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.221 | 13.354 | 13.085 | 13.354 | 256.9 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.199 | 0.227 | 0.163 | 0.227 | 153.0 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.687 | 4.769 | 4.614 | 4.769 | 256.9 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.062 | 0.079 | 0.041 | 0.079 | 137.5 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.505 | 0.531 | 0.473 | 0.531 | 256.9 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 195.924 | 266.642 | 190.734 | 266.642 | 163.3 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1652.085 | 1683.986 | 1638.737 | 1683.986 | 256.9 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 167.775 | 175.570 | 162.567 | 175.570 | 169.5 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1609.335 | 1626.221 | 1594.672 | 1626.221 | 256.9 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.854 | 1.424 | 0.803 | 1.424 | 169.4 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.311 | 4.561 | 4.206 | 4.561 | 256.9 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.149 | 0.181 | 0.118 | 0.181 | 167.0 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.761 | 0.918 | 0.714 | 0.918 | 256.9 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 19.142 | 21.224 | 17.091 | 21.224 | 159.4 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 63.210 | 71.199 | 61.520 | 71.199 | 256.9 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 17.577 | 20.705 | 17.130 | 20.705 | 154.5 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 61.345 | 61.911 | 60.840 | 61.911 | 256.9 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 18.646 | 21.699 | 17.890 | 21.699 | 151.8 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 55.039 | 55.828 | 54.771 | 55.828 | 256.9 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.241 | 0.428 | 0.233 | 0.428 | 152.0 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.301 | 6.710 | 6.112 | 6.710 | 256.9 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 171.549 | 182.919 | 168.859 | 182.919 | 174.1 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1441.880 | 1716.104 | 1433.754 | 1716.104 | 256.9 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.116 | 0.201 | 0.079 | 0.201 | 173.0 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.738 | 4.806 | 4.690 | 4.806 | 256.9 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.015 | 0.016 | 0.014 | 0.016 | 157.9 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.346 | 2.355 | 2.298 | 2.355 | 256.9 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.385 | 8.841 | 6.084 | 8.841 | 156.4 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 15.770 | 30.336 | 15.366 | 30.336 | 256.9 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.213 | 0.824 | 0.183 | 0.824 | 157.0 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.706 | 2.768 | 2.654 | 2.768 | 256.9 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 172.561 | 181.279 | 169.936 | 181.279 | 188.5 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1438.279 | 1513.281 | 1429.794 | 1513.281 | 256.9 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.118 | 0.175 | 0.080 | 0.175 | 182.4 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.813 | 4.891 | 4.747 | 4.891 | 256.9 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.016 | 0.018 | 0.014 | 0.018 | 169.1 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.312 | 2.333 | 2.301 | 2.333 | 256.9 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 7.520 | 8.007 | 6.351 | 8.007 | 152.9 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 15.611 | 29.880 | 15.362 | 29.880 | 256.9 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 1.780 | 2.826 | 1.477 | 2.826 | 160.9 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.812 | 2.878 | 2.746 | 2.878 | 256.9 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 170.512 | 172.345 | 168.429 | 172.345 | 150.8 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1427.842 | 1445.299 | 1419.493 | 1445.299 | 256.9 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.094 | 0.171 | 0.071 | 0.171 | 150.2 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.949 | 3.106 | 2.872 | 3.106 | 256.9 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.014 | 0.035 | 0.014 | 0.035 | 149.7 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.012 | 1.025 | 1.010 | 1.025 | 256.9 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 3.910 | 4.387 | 2.874 | 4.387 | 148.2 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.074 | 8.282 | 8.037 | 8.282 | 256.9 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.495 | 1.823 | 1.372 | 1.823 | 149.4 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.783 | 2.851 | 2.742 | 2.851 | 256.9 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.022 | 0.012 | 0.022 | 139.7 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.441 | 0.507 | 0.433 | 0.507 | 256.9 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 175.708 | 248.470 | 172.063 | 248.470 | 157.2 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1607.639 | 1642.799 | 1595.353 | 1642.799 | 256.9 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 163.051 | 174.872 | 158.403 | 174.872 | 170.5 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1572.828 | 1620.939 | 1560.948 | 1620.939 | 256.9 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.263 | 1.380 | 1.170 | 1.380 | 168.7 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.079 | 3.160 | 3.030 | 3.160 | 256.9 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.150 | 0.162 | 0.129 | 0.162 | 159.0 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.525 | 0.542 | 0.489 | 0.542 | 256.9 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.525 | 5.773 | 3.230 | 5.773 | 157.0 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 20.981 | 21.185 | 20.866 | 21.185 | 256.9 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.750 | 4.455 | 3.610 | 4.455 | 156.0 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 20.535 | 20.933 | 20.131 | 20.933 | 256.9 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 3.916 | 5.143 | 3.727 | 5.143 | 152.9 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.270 | 16.937 | 15.216 | 16.937 | 256.9 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.183 | 0.197 | 0.168 | 0.197 | 154.7 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.927 | 5.224 | 4.839 | 5.224 | 256.9 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 178.818 | 183.796 | 177.829 | 183.796 | 208.8 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1623.246 | 1739.856 | 1618.653 | 1739.856 | 256.9 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 4.822 | 5.608 | 4.420 | 5.608 | 204.9 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 6.035 | 6.150 | 5.983 | 6.150 | 256.9 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.304 | 0.343 | 0.264 | 0.343 | 199.4 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.488 | 2.699 | 2.476 | 2.699 | 256.9 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 17.740 | 19.933 | 13.972 | 19.933 | 195.0 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 45.818 | 68.322 | 42.810 | 68.322 | 256.9 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.517 | 0.698 | 0.476 | 0.698 | 197.2 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.357 | 7.843 | 7.308 | 7.843 | 256.9 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 184.793 | 186.031 | 183.830 | 186.031 | 200.8 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1608.442 | 1707.057 | 1598.647 | 1707.057 | 256.9 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.999 | 5.346 | 4.627 | 5.346 | 200.4 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.945 | 6.108 | 5.920 | 6.108 | 256.9 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.323 | 0.343 | 0.302 | 0.343 | 199.4 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.560 | 3.475 | 2.509 | 3.475 | 256.9 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 18.494 | 20.395 | 14.550 | 20.395 | 192.1 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 42.596 | 43.226 | 42.365 | 43.226 | 256.9 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.020 | 2.761 | 1.997 | 2.761 | 199.2 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.868 | 9.134 | 8.752 | 9.134 | 256.9 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 178.534 | 195.303 | 174.487 | 195.303 | 200.6 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1602.858 | 1743.445 | 1590.010 | 1743.445 | 256.9 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.976 | 4.363 | 2.873 | 4.363 | 195.8 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.129 | 4.523 | 4.116 | 4.523 | 256.9 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.287 | 0.293 | 0.246 | 0.293 | 192.7 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.139 | 1.160 | 1.134 | 1.160 | 256.9 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 8.552 | 10.198 | 8.229 | 10.198 | 164.7 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 21.129 | 21.624 | 21.033 | 21.624 | 256.9 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.317 | 3.866 | 2.186 | 3.866 | 191.6 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.886 | 9.140 | 8.681 | 9.140 | 256.9 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 187.624 | 190.742 | 186.094 | 190.742 | 146.0 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1665.179 | 1722.927 | 1651.513 | 1722.927 | 256.9 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 166.611 | 171.023 | 161.640 | 171.023 | 151.8 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1624.804 | 1637.859 | 1617.968 | 1637.859 | 256.9 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.422 | 1.611 | 1.038 | 1.611 | 150.2 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.924 | 4.109 | 3.876 | 4.109 | 256.9 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.103 | 0.197 | 0.086 | 0.197 | 146.8 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.719 | 0.752 | 0.699 | 0.752 | 256.9 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.010 | 0.013 | 0.009 | 0.013 | 138.1 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.467 | 0.489 | 0.458 | 0.489 | 256.9 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.337 | 0.442 | 0.322 | 0.442 | 140.2 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.708 | 14.771 | 14.590 | 14.771 | 256.9 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.022 | 0.013 | 0.022 | 139.6 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.457 | 0.575 | 0.425 | 0.575 | 256.9 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 185.848 | 191.235 | 181.924 | 191.235 | 156.6 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1649.157 | 1805.387 | 1621.983 | 1805.387 | 256.9 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 163.943 | 173.878 | 161.722 | 173.878 | 159.6 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1591.647 | 1675.251 | 1578.716 | 1675.251 | 256.9 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.779 | 0.828 | 0.725 | 0.828 | 156.6 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 4.005 | 4.402 | 3.831 | 4.402 | 256.9 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.093 | 0.113 | 0.079 | 0.113 | 156.6 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.708 | 0.936 | 0.654 | 0.936 | 256.9 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.672 | 13.884 | 13.533 | 13.884 | 155.6 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 51.031 | 53.489 | 50.878 | 53.489 | 256.9 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 14.023 | 14.665 | 13.801 | 14.665 | 153.6 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 50.256 | 51.249 | 50.132 | 51.249 | 256.9 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 14.196 | 14.624 | 14.172 | 14.624 | 148.2 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 44.727 | 47.137 | 44.423 | 47.137 | 256.9 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.282 | 0.357 | 0.244 | 0.357 | 150.5 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.633 | 6.220 | 5.482 | 6.220 | 256.9 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.027 | 0.013 | 0.027 | 136.4 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.457 | 0.486 | 0.443 | 0.486 | 256.9 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 175.013 | 187.133 | 171.620 | 187.133 | 155.0 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1635.793 | 1914.234 | 1582.529 | 1914.234 | 256.9 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 162.039 | 166.482 | 160.550 | 166.482 | 157.9 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1601.602 | 1624.810 | 1580.551 | 1624.810 | 256.9 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.773 | 0.796 | 0.752 | 0.796 | 155.1 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.882 | 4.001 | 3.810 | 4.001 | 256.9 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.088 | 0.118 | 0.083 | 0.118 | 155.0 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.679 | 0.720 | 0.649 | 0.720 | 256.9 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.471 | 3.573 | 3.318 | 3.573 | 153.9 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 22.775 | 24.042 | 22.272 | 24.042 | 256.9 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.620 | 4.136 | 3.399 | 4.136 | 152.0 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 22.183 | 23.751 | 21.638 | 23.751 | 256.9 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.843 | 9.416 | 3.724 | 9.416 | 148.0 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 16.367 | 16.577 | 16.203 | 16.577 | 256.9 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.267 | 0.305 | 0.241 | 0.305 | 150.1 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.537 | 5.606 | 5.464 | 5.606 | 256.9 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.996 | 8.889 | 7.397 | 8.889 | 156.6 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 49.187 | 55.908 | 48.963 | 55.908 | 256.9 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.266 | 1.359 | 1.207 | 1.359 | 160.8 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 10.052 | 10.247 | 10.045 | 10.247 | 256.9 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.350 | 0.371 | 0.337 | 0.371 | 160.0 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.124 | 5.160 | 5.082 | 5.160 | 256.9 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 1.988 | 2.354 | 1.960 | 2.354 | 161.8 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 5.442 | 5.642 | 5.412 | 5.642 | 256.9 |
| evaluation-flat-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.458 | 0.641 | 0.447 | 0.641 | 155.8 |
| evaluation-flat-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.615 | 5.755 | 5.521 | 5.755 | 256.9 |
| evaluation-flat-large-parallel | evaluation-point-processes | python-prophet | 4 | 1515.396 | 1543.340 | 1508.307 | 1543.340 | 256.9 |
| evaluation-flat-large-parallel | evaluation-point-threads | python-prophet | 4 | 200.458 | 203.202 | 195.893 | 203.202 | 256.9 |
| evaluation-flat-large-parallel | evaluation-point | effect-prophet | 4 | 21.523 | 22.310 | 21.329 | 22.310 | 171.8 |
| evaluation-flat-large-parallel | evaluation-point | python-prophet | 4 | 186.338 | 202.983 | 179.348 | 202.983 | 256.9 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 180.463 | 184.926 | 177.600 | 184.926 | 153.1 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1514.145 | 1526.190 | 1475.877 | 1526.190 | 256.9 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.646 | 2.660 | 2.596 | 2.660 | 150.8 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.384 | 1.404 | 1.356 | 1.404 | 256.9 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.131 | 0.166 | 0.105 | 0.166 | 131.2 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.533 | 0.593 | 0.515 | 0.593 | 256.9 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.086 | 0.106 | 0.083 | 0.106 | 150.3 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.318 | 5.419 | 5.287 | 5.419 | 256.9 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.872 | 2.316 | 1.815 | 2.316 | 134.8 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.788 | 0.828 | 0.788 | 0.828 | 256.9 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.462 | 7.784 | 6.196 | 7.784 | 149.6 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 39.801 | 41.758 | 39.787 | 41.758 | 256.9 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 5.998 | 10.292 | 5.573 | 10.292 | 154.9 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 61.762 | 62.431 | 61.270 | 62.431 | 256.9 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 181.698 | 186.637 | 181.592 | 186.637 | 153.0 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1511.531 | 1873.548 | 1507.908 | 1873.548 | 256.9 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.223 | 1.246 | 1.186 | 1.246 | 152.8 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.811 | 1.992 | 1.753 | 1.992 | 256.9 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.034 | 0.051 | 0.034 | 0.051 | 131.7 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.483 | 0.550 | 0.432 | 0.550 | 256.9 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.088 | 0.111 | 0.082 | 0.111 | 151.2 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 6.168 | 22.668 | 5.894 | 22.668 | 256.9 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.136 | 1.554 | 1.054 | 1.554 | 133.9 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.840 | 0.864 | 0.808 | 0.864 | 256.9 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 4.491 | 7.870 | 4.249 | 7.870 | 149.0 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 58.653 | 100.489 | 57.139 | 100.489 | 256.9 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 1.902 | 2.486 | 1.814 | 2.486 | 157.1 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.623 | 15.953 | 13.454 | 15.953 | 256.9 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.289 | 0.337 | 0.272 | 0.337 | 182.5 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.005 | 0.006 | 256.9 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.302 | 0.330 | 0.252 | 0.330 | 172.7 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.009 | 0.011 | 256.9 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.157 | 16.378 | 12.047 | 16.378 | 155.8 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 150.899 | 165.380 | 147.447 | 165.380 | 256.9 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 61.891 | 62.379 | 61.109 | 62.379 | 160.5 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 295.574 | 297.982 | 295.054 | 297.982 | 256.9 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 248.407 | 255.868 | 248.141 | 255.868 | 198.3 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1725.306 | 1795.976 | 1632.286 | 1795.976 | 256.9 |
| evaluation-flat-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 6.411 | 10.792 | 6.296 | 10.792 | 198.1 |
| evaluation-flat-regressor-model-point | evaluation-baseline | python-prophet | 4 | 2.022 | 2.036 | 2.016 | 2.036 | 256.9 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.255 | 0.374 | 0.225 | 0.374 | 137.8 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.766 | 0.843 | 0.730 | 0.843 | 256.9 |
| evaluation-flat-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.090 | 0.117 | 0.059 | 0.117 | 179.0 |
| evaluation-flat-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.392 | 6.067 | 5.380 | 6.067 | 256.9 |
| evaluation-flat-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.822 | 4.104 | 2.445 | 4.104 | 148.0 |
| evaluation-flat-regressor-model-point | evaluation-plan | python-prophet | 4 | 1.021 | 1.095 | 1.020 | 1.095 | 256.9 |
| evaluation-flat-regressor-model-point | evaluation-point | effect-prophet | 4 | 59.250 | 60.898 | 58.498 | 60.898 | 166.5 |
| evaluation-flat-regressor-model-point | evaluation-point | python-prophet | 4 | 238.097 | 239.237 | 224.570 | 239.237 | 256.9 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.125 | 0.135 | 0.117 | 0.135 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.647 | 0.696 | 0.630 | 0.696 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 174.143 | 175.637 | 172.226 | 175.637 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1433.149 | 1469.978 | 1419.095 | 1469.978 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 165.844 | 174.224 | 160.431 | 174.224 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1423.791 | 1467.384 | 1418.695 | 1467.384 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.134 | 0.140 | 0.122 | 0.140 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.888 | 5.836 | 3.782 | 5.836 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.027 | 0.031 | 0.026 | 0.031 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.839 | 0.856 | 0.830 | 0.856 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.995 | 2.085 | 1.968 | 2.085 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.950 | 18.955 | 14.495 | 18.955 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.163 | 2.495 | 2.052 | 2.495 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 13.860 | 13.958 | 13.767 | 13.958 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.145 | 2.764 | 2.094 | 2.764 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 9.220 | 9.406 | 9.103 | 9.406 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.529 | 0.544 | 0.496 | 0.544 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.688 | 4.803 | 4.646 | 4.803 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.062 | 0.076 | 0.051 | 0.076 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.527 | 0.554 | 0.491 | 0.554 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 173.797 | 176.079 | 172.165 | 176.079 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1442.882 | 1467.560 | 1442.661 | 1467.560 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 159.472 | 160.090 | 159.284 | 160.090 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1414.886 | 1441.605 | 1414.433 | 1441.605 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.127 | 0.148 | 0.126 | 0.148 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.552 | 3.706 | 3.498 | 3.706 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.033 | 0.038 | 0.026 | 0.038 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.624 | 0.636 | 0.606 | 0.636 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.568 | 4.628 | 4.506 | 4.628 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.440 | 27.891 | 26.992 | 27.891 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.680 | 4.759 | 4.620 | 4.759 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 26.700 | 27.124 | 26.675 | 27.124 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 5.193 | 5.367 | 5.177 | 5.367 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 22.431 | 23.142 | 22.199 | 23.142 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.303 | 0.403 | 0.290 | 0.403 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.607 | 4.615 | 4.565 | 4.615 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.209 | 162.261 | 155.733 | 162.261 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1435.089 | 1455.471 | 1429.222 | 1455.471 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.162 | 0.289 | 0.145 | 0.289 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.081 | 2.164 | 2.031 | 2.164 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.023 | 0.018 | 0.023 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.403 | 0.412 | 0.399 | 0.412 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.242 | 1.487 | 1.195 | 1.487 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.043 | 3.146 | 2.971 | 3.146 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.277 | 0.296 | 0.266 | 0.296 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.661 | 2.708 | 2.650 | 2.708 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.511 | 161.915 | 155.462 | 161.915 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1419.983 | 1461.521 | 1419.418 | 1461.521 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.130 | 0.167 | 0.128 | 0.167 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.051 | 2.128 | 2.023 | 2.128 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.020 | 0.016 | 0.020 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.400 | 0.420 | 0.384 | 0.420 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.231 | 1.609 | 1.225 | 1.609 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.022 | 3.139 | 3.004 | 3.139 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.281 | 0.306 | 0.270 | 0.306 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.648 | 2.748 | 2.578 | 2.748 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.119 | 0.200 | 0.101 | 0.200 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.928 | 1.019 | 0.921 | 1.019 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 185.939 | 219.497 | 182.164 | 219.497 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1452.190 | 1527.631 | 1448.072 | 1527.631 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 183.735 | 198.778 | 173.075 | 198.778 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1426.945 | 1471.581 | 1415.899 | 1471.581 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.206 | 0.264 | 0.182 | 0.264 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 4.607 | 5.254 | 4.512 | 5.254 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.030 | 0.067 | 0.024 | 0.067 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.211 | 1.252 | 1.206 | 1.252 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.954 | 5.277 | 4.737 | 5.277 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 30.441 | 36.326 | 30.407 | 36.326 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 6.240 | 9.085 | 5.557 | 9.085 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 31.548 | 33.808 | 30.962 | 33.808 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 5.142 | 6.472 | 5.009 | 6.472 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 24.949 | 32.736 | 24.870 | 32.736 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 1.026 | 1.139 | 0.941 | 1.139 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.349 | 5.154 | 4.313 | 5.154 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.021 | 0.012 | 0.021 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.501 | 0.513 | 0.482 | 0.513 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 168.453 | 171.735 | 164.424 | 171.735 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1463.854 | 1526.647 | 1437.058 | 1526.647 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 160.591 | 215.149 | 157.706 | 215.149 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1486.172 | 1563.412 | 1454.298 | 1563.412 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.139 | 0.152 | 0.099 | 0.152 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.204 | 2.358 | 2.126 | 2.358 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.025 | 0.039 | 0.020 | 0.039 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.482 | 0.495 | 0.469 | 0.495 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.406 | 1.768 | 1.361 | 1.768 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 13.024 | 13.419 | 12.842 | 13.419 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.484 | 3.045 | 1.412 | 3.045 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 12.386 | 12.956 | 12.079 | 12.956 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 2.088 | 2.548 | 1.842 | 2.548 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 9.095 | 9.903 | 8.947 | 9.903 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.277 | 0.318 | 0.246 | 0.318 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.165 | 3.226 | 3.121 | 3.226 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.017 | 0.014 | 0.017 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.470 | 0.487 | 0.458 | 0.487 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 167.167 | 172.619 | 164.186 | 172.619 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1464.339 | 1679.015 | 1428.480 | 1679.015 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 165.899 | 252.236 | 157.262 | 252.236 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1436.501 | 1534.385 | 1423.940 | 1534.385 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.139 | 0.161 | 0.107 | 0.161 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.464 | 4.649 | 2.339 | 4.649 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.036 | 0.037 | 0.029 | 0.037 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.493 | 0.533 | 0.444 | 0.533 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.443 | 1.628 | 1.347 | 1.628 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.638 | 13.084 | 12.182 | 13.084 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.558 | 1.688 | 1.427 | 1.688 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 11.781 | 12.067 | 11.607 | 12.067 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.950 | 2.497 | 1.749 | 2.497 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 8.843 | 9.717 | 8.563 | 9.717 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.299 | 0.628 | 0.269 | 0.628 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.081 | 3.135 | 3.051 | 3.135 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.017 | 0.014 | 0.017 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.489 | 0.544 | 0.463 | 0.544 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 288.579 | 296.531 | 284.260 | 296.531 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1848.414 | 1860.766 | 1838.369 | 1860.766 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 155.362 | 159.173 | 155.052 | 159.173 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1478.052 | 1554.653 | 1445.777 | 1554.653 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.142 | 0.158 | 0.112 | 0.158 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.222 | 2.426 | 2.170 | 2.426 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.030 | 0.048 | 0.027 | 0.048 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.449 | 0.477 | 0.429 | 0.477 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 106.775 | 109.882 | 106.441 | 109.882 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 397.064 | 401.787 | 395.560 | 401.787 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 106.907 | 109.563 | 106.626 | 109.563 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 401.775 | 418.001 | 393.525 | 418.001 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 107.439 | 109.684 | 106.097 | 109.684 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 397.392 | 412.049 | 389.557 | 412.049 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.345 | 0.469 | 0.266 | 0.469 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.192 | 3.384 | 3.146 | 3.384 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.480 | 194.354 | 159.200 | 194.354 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1425.214 | 1444.448 | 1423.224 | 1444.448 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.170 | 0.140 | 0.170 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.117 | 2.184 | 2.064 | 2.184 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.036 | 0.022 | 0.036 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.439 | 0.466 | 0.435 | 0.466 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.883 | 2.151 | 1.762 | 2.151 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 8.356 | 11.423 | 8.192 | 11.423 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.307 | 0.314 | 0.286 | 0.314 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.689 | 2.785 | 2.671 | 2.785 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.218 | 166.680 | 158.810 | 166.680 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1465.686 | 1475.416 | 1439.025 | 1475.416 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.133 | 0.193 | 0.129 | 0.193 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.098 | 2.180 | 2.036 | 2.180 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.025 | 0.018 | 0.025 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.414 | 0.429 | 0.398 | 0.429 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.924 | 3.985 | 3.913 | 3.985 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 20.201 | 20.772 | 20.019 | 20.772 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.272 | 0.276 | 0.259 | 0.276 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.718 | 3.375 | 2.707 | 3.375 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.045 | 0.083 | 0.043 | 0.083 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.513 | 0.605 | 0.487 | 0.605 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 174.023 | 177.775 | 171.587 | 177.775 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1462.903 | 1483.497 | 1453.016 | 1483.497 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 157.737 | 163.231 | 157.558 | 163.231 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1417.286 | 1480.021 | 1405.711 | 1480.021 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.132 | 0.145 | 0.128 | 0.145 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.660 | 4.145 | 3.522 | 4.145 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.036 | 0.044 | 0.027 | 0.044 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.626 | 0.705 | 0.622 | 0.705 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.001 | 3.106 | 2.999 | 3.106 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 49.133 | 50.787 | 48.778 | 50.787 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.142 | 3.285 | 3.087 | 3.285 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 48.023 | 48.688 | 47.667 | 48.688 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 3.744 | 3.936 | 3.723 | 3.936 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 43.990 | 51.350 | 43.577 | 51.350 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.278 | 0.293 | 0.272 | 0.293 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.637 | 4.729 | 4.582 | 4.729 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.461 | 158.711 | 154.948 | 158.711 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1437.898 | 1468.936 | 1429.871 | 1468.936 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.169 | 0.206 | 0.169 | 0.206 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.696 | 3.801 | 3.651 | 3.801 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.036 | 0.017 | 0.036 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.700 | 1.017 | 0.661 | 1.017 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 2.506 | 2.687 | 2.009 | 2.687 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.118 | 9.524 | 7.691 | 9.524 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.304 | 0.329 | 0.294 | 0.329 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.741 | 4.866 | 4.738 | 4.866 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.818 | 179.539 | 164.747 | 179.539 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1425.582 | 1432.372 | 1419.615 | 1432.372 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.179 | 0.181 | 0.156 | 0.181 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.873 | 3.917 | 3.803 | 3.917 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.017 | 0.023 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.812 | 0.850 | 0.811 | 0.850 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 2.388 | 3.129 | 2.271 | 3.129 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.025 | 9.502 | 8.831 | 9.502 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.483 | 1.218 | 0.480 | 1.218 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.702 | 4.997 | 4.701 | 4.997 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.122 | 0.199 | 0.120 | 0.199 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.665 | 0.682 | 0.650 | 0.682 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 176.601 | 184.258 | 171.328 | 184.258 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1449.482 | 1497.158 | 1439.765 | 1497.158 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 168.308 | 177.839 | 164.137 | 177.839 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1455.928 | 1481.334 | 1443.897 | 1481.334 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.142 | 0.195 | 0.128 | 0.195 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.962 | 4.069 | 3.874 | 4.069 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.027 | 0.035 | 0.025 | 0.035 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.832 | 0.879 | 0.811 | 0.879 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.144 | 2.267 | 2.134 | 2.267 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.841 | 15.350 | 14.667 | 15.350 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.295 | 2.584 | 2.285 | 2.584 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.985 | 14.388 | 13.958 | 14.388 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.419 | 6.087 | 2.399 | 6.087 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.419 | 9.929 | 9.256 | 9.929 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.497 | 0.549 | 0.480 | 0.549 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.831 | 4.949 | 4.785 | 4.949 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.048 | 0.068 | 0.039 | 0.068 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.547 | 0.656 | 0.520 | 0.656 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 174.898 | 189.750 | 163.334 | 189.750 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1460.130 | 1519.759 | 1458.806 | 1519.759 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 159.511 | 197.862 | 158.990 | 197.862 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1443.048 | 1475.315 | 1434.365 | 1475.315 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.146 | 0.193 | 0.118 | 0.193 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.784 | 4.005 | 3.664 | 4.005 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.031 | 0.050 | 0.026 | 0.050 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.678 | 0.765 | 0.663 | 0.765 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.458 | 2.744 | 1.441 | 2.744 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 13.310 | 13.662 | 13.260 | 13.662 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.575 | 1.757 | 1.491 | 1.757 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.753 | 13.407 | 12.712 | 13.407 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.863 | 2.026 | 1.817 | 2.026 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.869 | 8.033 | 7.742 | 8.033 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.298 | 0.337 | 0.253 | 0.337 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.717 | 4.828 | 4.653 | 4.828 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.849 | 160.425 | 153.284 | 160.425 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1413.379 | 1422.465 | 1412.793 | 1422.465 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.143 | 0.154 | 0.136 | 0.154 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.082 | 2.118 | 2.068 | 2.118 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.032 | 0.020 | 0.032 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.427 | 0.439 | 0.423 | 0.439 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.952 | 1.969 | 1.774 | 1.969 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.298 | 7.800 | 7.077 | 7.800 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.278 | 0.372 | 0.274 | 0.372 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.762 | 2.815 | 2.683 | 2.815 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.525 | 163.731 | 156.683 | 163.731 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1454.414 | 1480.829 | 1442.115 | 1480.829 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.130 | 0.174 | 0.120 | 0.174 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.057 | 2.112 | 2.026 | 2.112 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.020 | 0.018 | 0.020 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.414 | 0.442 | 0.404 | 0.442 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.965 | 4.019 | 3.717 | 4.019 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 20.155 | 21.089 | 19.903 | 21.089 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.251 | 0.279 | 0.235 | 0.279 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.702 | 2.762 | 2.649 | 2.762 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.676 | 161.148 | 156.137 | 161.148 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1442.880 | 1551.323 | 1427.898 | 1551.323 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.185 | 0.221 | 0.184 | 0.221 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.780 | 3.837 | 3.761 | 3.837 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.023 | 0.019 | 0.023 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.776 | 0.799 | 0.775 | 0.799 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.347 | 5.373 | 2.110 | 5.373 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.853 | 10.454 | 8.681 | 10.454 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.160 | 0.167 | 0.141 | 0.167 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.714 | 4.818 | 4.695 | 4.818 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 163.433 | 170.065 | 160.888 | 170.065 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1418.715 | 1444.036 | 1417.217 | 1444.036 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.223 | 0.425 | 0.190 | 0.425 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.775 | 3.795 | 3.759 | 3.795 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.030 | 0.020 | 0.030 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.767 | 0.790 | 0.759 | 0.790 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 2.461 | 5.805 | 2.177 | 5.805 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.893 | 9.143 | 8.841 | 9.143 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.163 | 0.176 | 0.154 | 0.176 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.745 | 5.036 | 4.630 | 5.036 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.871 | 162.069 | 157.977 | 162.069 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1455.772 | 1624.656 | 1410.722 | 1624.656 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.185 | 0.214 | 0.180 | 0.214 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.772 | 3.838 | 3.746 | 3.838 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.027 | 0.020 | 0.027 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.803 | 0.814 | 0.757 | 0.814 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 2.313 | 5.091 | 2.184 | 5.091 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.722 | 10.017 | 8.664 | 10.017 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.153 | 0.173 | 0.152 | 0.173 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.625 | 4.720 | 4.581 | 4.720 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.221 | 164.683 | 159.204 | 164.683 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1428.653 | 1435.239 | 1425.163 | 1435.239 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.182 | 0.208 | 0.174 | 0.208 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.794 | 3.842 | 3.739 | 3.842 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.020 | 0.022 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.770 | 0.787 | 0.758 | 0.787 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 2.288 | 4.915 | 2.221 | 4.915 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 9.006 | 9.072 | 8.943 | 9.072 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.158 | 0.165 | 0.142 | 0.165 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.695 | 5.444 | 4.621 | 5.444 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.964 | 164.516 | 154.929 | 164.516 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1427.892 | 1452.154 | 1416.615 | 1452.154 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.255 | 1.913 | 0.209 | 1.913 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.575 | 3.699 | 3.555 | 3.699 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.025 | 0.021 | 0.025 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.631 | 0.647 | 0.616 | 0.647 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 2.179 | 2.577 | 1.765 | 2.577 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.363 | 8.123 | 7.270 | 8.123 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.223 | 0.252 | 0.215 | 0.252 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.687 | 4.974 | 4.684 | 4.974 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.690 | 164.050 | 158.660 | 164.050 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1439.574 | 1454.873 | 1414.608 | 1454.873 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.212 | 1.957 | 0.182 | 1.957 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.610 | 3.704 | 3.554 | 3.704 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.025 | 0.020 | 0.025 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.625 | 0.647 | 0.618 | 0.647 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.879 | 2.136 | 1.869 | 2.136 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.360 | 8.255 | 7.255 | 8.255 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.247 | 0.261 | 0.222 | 0.261 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.646 | 4.679 | 4.620 | 4.679 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.231 | 161.389 | 158.257 | 161.389 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1452.282 | 1513.859 | 1435.991 | 1513.859 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.205 | 0.218 | 0.187 | 0.218 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.567 | 3.681 | 3.490 | 3.681 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.031 | 0.018 | 0.031 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.622 | 0.649 | 0.567 | 0.649 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.031 | 2.849 | 1.900 | 2.849 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.594 | 8.781 | 7.247 | 8.781 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.216 | 0.300 | 0.212 | 0.300 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.603 | 4.823 | 4.577 | 4.823 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.023 | 161.587 | 156.083 | 161.587 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1452.244 | 1499.755 | 1437.212 | 1499.755 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.178 | 0.256 | 0.175 | 0.256 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.657 | 4.571 | 3.548 | 4.571 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.030 | 0.022 | 0.030 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.649 | 0.964 | 0.639 | 0.964 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.923 | 2.498 | 1.718 | 2.498 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 8.052 | 9.579 | 7.312 | 9.579 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.216 | 0.231 | 0.202 | 0.231 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.716 | 4.977 | 4.703 | 4.977 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.099 | 160.256 | 155.703 | 160.256 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1445.471 | 1480.022 | 1421.095 | 1480.022 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.193 | 0.270 | 0.186 | 0.270 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.637 | 3.789 | 3.569 | 3.789 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.025 | 0.022 | 0.025 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.642 | 0.678 | 0.635 | 0.678 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.154 | 4.442 | 1.918 | 4.442 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.546 | 8.631 | 7.537 | 8.631 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.242 | 0.813 | 0.218 | 0.813 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.818 | 4.833 | 4.770 | 4.833 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.405 | 159.461 | 158.129 | 159.461 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1433.047 | 1461.890 | 1420.098 | 1461.890 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.195 | 0.212 | 0.190 | 0.212 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.607 | 3.788 | 3.597 | 3.788 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.031 | 0.021 | 0.031 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.639 | 0.665 | 0.632 | 0.665 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.186 | 2.279 | 1.992 | 2.279 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 7.792 | 8.800 | 7.483 | 8.800 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.220 | 0.332 | 0.219 | 0.332 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.660 | 4.870 | 4.632 | 4.870 | n/a |
| flat-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.132 | 0.261 | 0.104 | 0.261 | n/a |
| flat-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.933 | 0.943 | 0.913 | 0.943 | n/a |
| flat-regressor-model | cold-first-forecast | effect-prophet | 4 | 211.548 | 244.417 | 207.583 | 244.417 | n/a |
| flat-regressor-model | cold-first-forecast | python-prophet | 4 | 1543.066 | 1564.533 | 1536.836 | 1564.533 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 23.563 | 24.229 | 23.502 | 24.229 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 130.108 | 132.714 | 129.500 | 132.714 | n/a |
| flat-regressor-model | warm-fit-predict | effect-prophet | 4 | 24.293 | 28.070 | 24.105 | 28.070 | n/a |
| flat-regressor-model | warm-fit-predict | python-prophet | 4 | 128.229 | 138.592 | 127.576 | 138.592 | n/a |
| flat-regressor-model | warm-fit | effect-prophet | 4 | 23.865 | 24.660 | 23.649 | 24.660 | n/a |
| flat-regressor-model | warm-fit | python-prophet | 4 | 102.400 | 118.133 | 100.219 | 118.133 | n/a |
| flat-regressor-model | warm-predict | effect-prophet | 4 | 1.830 | 2.315 | 1.759 | 2.315 | n/a |
| flat-regressor-model | warm-predict | python-prophet | 4 | 26.715 | 27.384 | 26.228 | 27.384 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.763 | 163.159 | 159.347 | 163.159 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1444.742 | 1474.945 | 1444.631 | 1474.945 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.232 | 0.243 | 0.220 | 0.243 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.152 | 2.216 | 2.075 | 2.216 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.032 | 0.044 | 0.022 | 0.044 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.419 | 0.444 | 0.411 | 0.444 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 152.659 | 156.842 | 150.140 | 156.842 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 618.881 | 626.674 | 614.595 | 626.674 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.315 | 0.385 | 0.311 | 0.385 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.046 | 3.116 | 3.001 | 3.116 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.906 | 168.418 | 153.888 | 168.418 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1436.333 | 1443.526 | 1434.287 | 1443.526 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.190 | 0.742 | 0.157 | 0.742 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.161 | 2.186 | 2.090 | 2.186 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.059 | 0.021 | 0.059 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.428 | 0.469 | 0.415 | 0.469 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.395 | 5.545 | 4.326 | 5.545 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 20.257 | 21.757 | 19.960 | 21.757 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.304 | 0.422 | 0.284 | 0.422 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.001 | 3.154 | 2.963 | 3.154 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 156.189 | 157.125 | 152.847 | 157.125 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1440.190 | 1549.731 | 1434.993 | 1549.731 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.140 | 0.180 | 0.137 | 0.180 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.869 | 1.958 | 1.854 | 1.958 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.019 | 0.024 | 0.018 | 0.024 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.335 | 0.402 | 0.333 | 0.402 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.483 | 0.499 | 0.476 | 0.499 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.902 | 3.001 | 2.853 | 3.001 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.157 | 0.351 | 0.153 | 0.351 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.718 | 2.745 | 2.591 | 2.745 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 154.867 | 162.080 | 152.675 | 162.080 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1435.167 | 1441.407 | 1430.073 | 1441.407 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.149 | 0.208 | 0.143 | 0.208 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.879 | 1.957 | 1.877 | 1.957 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.017 | 0.023 | 0.017 | 0.023 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.332 | 0.370 | 0.328 | 0.370 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.870 | 0.994 | 0.795 | 0.994 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.510 | 6.782 | 5.400 | 6.782 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.132 | 0.201 | 0.125 | 0.201 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.687 | 2.788 | 2.651 | 2.788 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 298.159 | 300.935 | 296.347 | 300.935 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1974.154 | 2040.081 | 1947.018 | 2040.081 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 171.333 | 172.352 | 164.164 | 172.352 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1590.428 | 1631.515 | 1565.684 | 1631.515 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.167 | 0.241 | 0.136 | 0.241 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.214 | 2.349 | 2.155 | 2.349 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.018 | 0.038 | 0.017 | 0.038 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.474 | 0.539 | 0.417 | 0.539 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.024 | 0.054 | 0.023 | 0.054 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.504 | 0.513 | 0.476 | 0.513 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.589 | 4.880 | 4.499 | 4.880 | 147.5 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 129.062 | 140.842 | 123.694 | 140.842 | 256.9 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 166.640 | 171.459 | 162.665 | 171.459 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1536.894 | 1553.467 | 1520.059 | 1553.467 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.538 | 175.595 | 158.905 | 175.595 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1514.702 | 1573.842 | 1510.066 | 1573.842 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.189 | 0.259 | 0.168 | 0.259 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.624 | 3.803 | 3.547 | 3.803 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.023 | 0.032 | 0.019 | 0.032 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.702 | 0.721 | 0.689 | 0.721 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.047 | 0.076 | 0.041 | 0.076 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.551 | 0.593 | 0.532 | 0.593 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.450 | 3.338 | 0.971 | 3.338 | 139.6 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 73.778 | 79.196 | 73.255 | 79.196 | 256.9 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 176.566 | 177.481 | 170.656 | 177.481 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1463.334 | 1522.072 | 1459.855 | 1522.072 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 161.581 | 172.372 | 161.099 | 172.372 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1452.040 | 1542.012 | 1442.503 | 1542.012 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.192 | 0.236 | 0.149 | 0.236 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.933 | 4.992 | 3.838 | 4.992 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.022 | 0.025 | 0.020 | 0.025 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.858 | 0.887 | 0.819 | 0.887 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.147 | 0.167 | 0.131 | 0.167 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.650 | 0.746 | 0.634 | 0.746 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.913 | 1.093 | 0.858 | 1.093 | 149.4 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 20.676 | 34.801 | 20.139 | 34.801 | 256.9 |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 231.226 | 238.356 | 229.890 | 238.356 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1808.664 | 1866.987 | 1777.011 | 1866.987 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.189 | 0.224 | 0.099 | 0.224 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.936 | 0.996 | 0.906 | 0.996 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 17.725 | 19.564 | 16.839 | 19.564 | 184.8 |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 269.050 | 292.862 | 258.950 | 292.862 | 256.9 |
| warm-start-flat-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 104.264 | 107.870 | 103.834 | 107.870 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-fit | python-prophet | 6 | 444.494 | 453.533 | 436.566 | 453.533 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 6.502 | 7.537 | 6.274 | 7.537 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 10.384 | 11.333 | 9.412 | 11.333 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `d257017e74eed1851f8b417b13292b5664bceab4`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:f392e6fb56de40f0d00e5ccc66468444dc556abc02d29cfa10ba0de95202ccfc`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:e0c58934a5fdcefc8fde2f0c0c67c85982d6e9862c3d3165b724a767a8143ce7`

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

