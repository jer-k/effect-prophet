# Effect Prophet benchmark — 2026-11-02T043353-755Z-a3424eff

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
| anomalies-flat-defaults-99 | warm-anomalies | effect-prophet | 6 | 9.867 | 12.020 | 9.519 | 12.020 | n/a |
| anomalies-flat-defaults-99 | warm-anomalies | python-prophet | 6 | 138.114 | 157.945 | 130.846 | 157.945 | n/a |
| anomalies-flat-defaults-99 | warm-fit | effect-prophet | 6 | 1.896 | 4.799 | 1.706 | 4.799 | n/a |
| anomalies-flat-defaults-99 | warm-fit | python-prophet | 6 | 6.824 | 7.477 | 6.801 | 7.477 | n/a |
| anomalies-flat-defaults-99 | warm-uncertainty | effect-prophet | 6 | 6.421 | 7.224 | 6.351 | 7.224 | 151.4 |
| anomalies-flat-defaults-99 | warm-uncertainty | python-prophet | 6 | 123.745 | 141.734 | 121.806 | 141.734 | 256.9 |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.041 | 0.098 | 0.013 | 0.098 | 139.9 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.494 | 0.805 | 0.423 | 0.805 | 256.9 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 209.646 | 490.189 | 189.891 | 490.189 | 155.3 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1719.538 | 2251.402 | 1652.085 | 2251.402 | 256.9 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 176.238 | 298.797 | 154.670 | 298.797 | 168.0 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1575.435 | 1717.083 | 1571.222 | 1717.083 | 256.9 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 1.053 | 1.191 | 0.780 | 1.191 | 165.1 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.274 | 4.240 | 3.199 | 4.240 | 256.9 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.101 | 1.456 | 0.097 | 1.456 | 156.1 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.529 | 0.558 | 0.513 | 0.558 | 256.9 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 20.821 | 21.449 | 20.546 | 21.449 | 155.1 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 76.219 | 97.749 | 71.528 | 97.749 | 256.9 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 21.037 | 21.455 | 20.311 | 21.455 | 154.4 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 72.310 | 76.394 | 70.900 | 76.394 | 256.9 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 21.379 | 28.053 | 20.794 | 28.053 | 150.5 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 66.784 | 68.511 | 65.325 | 68.511 | 256.9 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.209 | 0.255 | 0.205 | 0.255 | 150.6 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.610 | 6.121 | 5.431 | 6.121 | 256.9 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 190.838 | 230.988 | 180.859 | 230.988 | 249.3 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1687.046 | 1789.469 | 1594.187 | 1789.469 | 256.9 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.894 | 3.512 | 2.703 | 3.512 | 242.0 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.148 | 12.302 | 8.992 | 12.302 | 256.9 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.110 | 0.152 | 0.103 | 0.152 | 235.5 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.045 | 3.231 | 3.027 | 3.231 | 256.9 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 21.360 | 26.598 | 20.196 | 26.598 | 210.2 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 85.758 | 91.658 | 82.774 | 91.658 | 256.9 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.647 | 4.223 | 3.213 | 4.223 | 226.2 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.991 | 9.499 | 8.927 | 9.499 | 256.9 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 172.489 | 180.714 | 168.882 | 180.714 | 207.0 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1674.378 | 1744.455 | 1600.097 | 1744.455 | 256.9 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.836 | 2.439 | 1.613 | 2.439 | 203.0 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 4.993 | 5.463 | 4.949 | 5.463 | 256.9 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.102 | 0.152 | 0.097 | 0.152 | 199.7 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.241 | 1.349 | 1.236 | 1.349 | 256.9 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 8.267 | 9.811 | 8.099 | 9.811 | 173.4 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 24.688 | 25.592 | 24.598 | 25.592 | 256.9 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.591 | 2.866 | 2.367 | 2.866 | 197.4 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 7.130 | 8.901 | 7.057 | 8.901 | 256.9 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.018 | 0.011 | 0.018 | 131.7 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.513 | 1.059 | 0.436 | 1.059 | 256.9 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 187.422 | 205.711 | 176.890 | 205.711 | 150.9 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1591.968 | 1718.279 | 1575.692 | 1718.279 | 256.9 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 175.320 | 196.128 | 164.005 | 196.128 | 156.1 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1582.049 | 1648.192 | 1568.697 | 1648.192 | 256.9 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.263 | 0.310 | 0.216 | 0.310 | 154.0 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.103 | 2.221 | 2.026 | 2.221 | 256.9 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.053 | 0.105 | 0.052 | 0.105 | 152.4 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.424 | 0.493 | 0.409 | 0.493 | 256.9 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.363 | 1.593 | 1.221 | 1.593 | 150.4 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 13.258 | 17.885 | 13.181 | 17.885 | 256.9 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.646 | 1.711 | 1.544 | 1.711 | 150.4 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.762 | 17.671 | 12.476 | 17.671 | 256.9 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.154 | 2.807 | 2.016 | 2.807 | 142.8 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.743 | 12.931 | 9.222 | 12.931 | 256.9 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.205 | 0.273 | 0.165 | 0.273 | 145.6 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.163 | 3.358 | 3.072 | 3.358 | 256.9 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.055 | 0.086 | 0.030 | 0.086 | 154.5 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.584 | 0.602 | 0.578 | 0.602 | 256.9 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 193.308 | 202.899 | 192.012 | 202.899 | 201.2 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1635.024 | 1853.381 | 1633.357 | 1853.381 | 256.9 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 170.081 | 174.608 | 162.257 | 174.608 | 203.6 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1657.792 | 1721.194 | 1651.682 | 1721.194 | 256.9 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 0.730 | 1.728 | 0.712 | 1.728 | 203.3 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.159 | 3.484 | 3.082 | 3.484 | 256.9 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.087 | 0.123 | 0.075 | 0.123 | 201.6 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.501 | 0.877 | 0.489 | 0.877 | 256.9 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 20.508 | 20.888 | 18.830 | 20.888 | 200.7 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 68.339 | 74.169 | 68.179 | 74.169 | 256.9 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 20.068 | 21.304 | 19.031 | 21.304 | 181.4 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 68.088 | 72.740 | 67.417 | 72.740 | 256.9 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 18.999 | 20.082 | 18.017 | 20.082 | 158.2 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 64.711 | 70.057 | 63.549 | 70.057 | 256.9 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.603 | 2.921 | 1.404 | 2.921 | 160.6 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.530 | 8.282 | 5.231 | 8.282 | 256.9 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 219.773 | 237.674 | 197.402 | 237.674 | 245.8 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1515.534 | 1558.895 | 1444.229 | 1558.895 | 256.9 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.752 | 2.241 | 1.617 | 2.241 | 236.4 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.142 | 12.665 | 9.995 | 12.665 | 256.9 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.039 | 0.053 | 0.035 | 0.053 | 229.2 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.401 | 3.485 | 3.346 | 3.485 | 256.9 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 21.115 | 27.382 | 19.844 | 27.382 | 206.8 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 79.444 | 95.293 | 78.679 | 95.293 | 256.9 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.550 | 6.575 | 2.829 | 6.575 | 222.5 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.273 | 9.609 | 9.158 | 9.609 | 256.9 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 171.326 | 184.273 | 166.469 | 184.273 | 200.4 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1499.054 | 1580.645 | 1472.577 | 1580.645 | 256.9 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.847 | 1.636 | 0.826 | 1.636 | 199.3 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 6.332 | 7.598 | 5.983 | 7.598 | 256.9 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.035 | 0.040 | 0.021 | 0.040 | 195.8 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.473 | 1.755 | 1.472 | 1.755 | 256.9 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 6.860 | 7.243 | 5.748 | 7.243 | 154.1 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 22.734 | 25.725 | 21.846 | 25.725 | 256.9 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 3.352 | 5.674 | 2.413 | 5.674 | 186.8 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 8.306 | 25.002 | 7.430 | 25.002 | 256.9 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.019 | 0.011 | 0.019 | 134.3 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.449 | 0.498 | 0.429 | 0.498 | 256.9 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 161.210 | 177.906 | 159.212 | 177.906 | 149.4 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1418.839 | 1488.540 | 1410.016 | 1488.540 | 256.9 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 151.259 | 155.694 | 150.539 | 155.694 | 149.5 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1432.118 | 1492.995 | 1395.045 | 1492.995 | 256.9 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.094 | 0.105 | 0.081 | 0.105 | 149.5 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.029 | 2.157 | 2.020 | 2.157 | 256.9 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.020 | 0.025 | 0.016 | 0.025 | 149.5 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.407 | 0.435 | 0.392 | 0.435 | 256.9 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.030 | 1.202 | 0.997 | 1.202 | 149.1 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.311 | 11.711 | 11.203 | 11.711 | 256.9 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.136 | 2.977 | 1.029 | 2.977 | 149.1 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 10.858 | 11.027 | 10.740 | 11.027 | 256.9 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.665 | 3.691 | 1.577 | 3.691 | 140.7 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.295 | 9.120 | 8.139 | 9.120 | 256.9 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.130 | 0.179 | 0.114 | 0.179 | 142.4 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.629 | 2.698 | 2.589 | 2.698 | 256.9 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 177.660 | 180.646 | 170.083 | 180.646 | 195.0 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1519.893 | 1653.077 | 1426.767 | 1653.077 | 256.9 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.655 | 3.310 | 2.592 | 3.310 | 193.6 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.322 | 7.480 | 7.229 | 7.480 | 256.9 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.042 | 0.074 | 0.039 | 0.074 | 192.6 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.920 | 2.988 | 2.882 | 2.988 | 256.9 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 12.074 | 15.494 | 11.234 | 15.494 | 174.6 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 39.435 | 53.062 | 38.388 | 53.062 | 256.9 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.378 | 0.980 | 0.334 | 0.980 | 191.6 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 12.300 | 12.770 | 12.074 | 12.770 | 256.9 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 180.347 | 198.120 | 175.336 | 198.120 | 205.6 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1444.327 | 1591.801 | 1439.243 | 1591.801 | 256.9 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 3.048 | 3.954 | 2.989 | 3.954 | 201.8 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.539 | 10.441 | 7.167 | 10.441 | 256.9 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.045 | 0.046 | 0.044 | 0.046 | 200.0 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.928 | 3.302 | 2.901 | 3.302 | 256.9 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 14.893 | 16.790 | 13.418 | 16.790 | 192.2 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 46.608 | 75.408 | 40.394 | 75.408 | 256.9 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.056 | 2.929 | 1.811 | 2.929 | 197.3 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.924 | 17.012 | 13.710 | 17.012 | 256.9 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 171.841 | 276.715 | 167.368 | 276.715 | 186.2 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1540.945 | 1664.382 | 1468.821 | 1664.382 | 256.9 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 1.722 | 3.055 | 1.560 | 3.055 | 177.2 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.850 | 6.245 | 5.419 | 6.245 | 256.9 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.031 | 0.046 | 0.030 | 0.046 | 158.9 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.498 | 1.868 | 1.391 | 1.868 | 256.9 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.808 | 6.385 | 5.347 | 6.385 | 153.7 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 19.253 | 20.391 | 19.011 | 20.391 | 256.9 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 1.751 | 2.298 | 1.645 | 2.298 | 158.1 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 9.754 | 12.159 | 9.055 | 12.159 | 256.9 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.024 | 0.032 | 0.016 | 0.032 | 135.8 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.462 | 0.481 | 0.443 | 0.481 | 256.9 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 211.642 | 382.971 | 190.619 | 382.971 | 153.9 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1450.181 | 1467.087 | 1441.134 | 1467.087 | 256.9 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 160.801 | 213.284 | 153.590 | 213.284 | 154.0 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1430.586 | 1617.023 | 1413.663 | 1617.023 | 256.9 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.388 | 0.435 | 0.377 | 0.435 | 154.0 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 3.980 | 4.683 | 3.869 | 4.683 | 256.9 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.032 | 0.046 | 0.026 | 0.046 | 153.9 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.695 | 0.775 | 0.665 | 0.775 | 256.9 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 12.102 | 12.493 | 11.857 | 12.493 | 153.7 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 46.931 | 47.697 | 46.313 | 47.697 | 256.9 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 12.555 | 25.240 | 12.414 | 25.240 | 150.4 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 45.654 | 49.551 | 45.492 | 49.551 | 256.9 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 15.433 | 23.097 | 13.615 | 23.097 | 150.0 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 41.185 | 42.753 | 40.923 | 42.753 | 256.9 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.190 | 0.253 | 0.162 | 0.253 | 150.0 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.650 | 5.107 | 4.569 | 5.107 | 256.9 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.015 | 0.011 | 0.015 | 134.3 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.448 | 0.468 | 0.428 | 0.468 | 256.9 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 166.448 | 183.365 | 161.031 | 183.365 | 152.6 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1431.660 | 1473.590 | 1422.011 | 1473.590 | 256.9 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 161.487 | 291.413 | 151.321 | 291.413 | 152.6 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1406.438 | 1431.901 | 1403.410 | 1431.901 | 256.9 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.397 | 0.563 | 0.382 | 0.563 | 152.6 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.888 | 3.991 | 3.837 | 3.991 | 256.9 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.023 | 0.052 | 0.021 | 0.052 | 152.6 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.683 | 0.719 | 0.671 | 0.719 | 256.9 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.336 | 3.320 | 2.294 | 3.320 | 152.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.559 | 19.270 | 18.419 | 19.270 | 256.9 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.614 | 2.787 | 2.522 | 2.787 | 149.2 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 19.739 | 22.493 | 17.648 | 22.493 | 256.9 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.408 | 5.117 | 3.222 | 5.117 | 148.9 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.492 | 16.011 | 12.939 | 16.011 | 256.9 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.162 | 0.227 | 0.146 | 0.227 | 149.1 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.710 | 6.061 | 4.556 | 6.061 | 256.9 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.057 | 0.068 | 0.040 | 0.068 | 141.3 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.502 | 0.535 | 0.470 | 0.535 | 256.9 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 188.583 | 198.691 | 182.603 | 198.691 | 159.4 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1695.572 | 1883.932 | 1631.119 | 1883.932 | 256.9 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 157.652 | 173.405 | 153.628 | 173.405 | 175.2 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1600.790 | 1870.707 | 1586.350 | 1870.707 | 256.9 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 1.157 | 1.297 | 1.100 | 1.297 | 172.9 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 5.380 | 5.854 | 4.577 | 5.854 | 256.9 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.132 | 0.137 | 0.118 | 0.137 | 163.2 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.755 | 0.814 | 0.751 | 0.814 | 256.9 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 16.321 | 16.536 | 16.250 | 16.536 | 158.0 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 62.239 | 65.806 | 61.672 | 65.806 | 256.9 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 16.829 | 17.212 | 15.888 | 17.212 | 157.0 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 61.698 | 67.465 | 60.466 | 67.465 | 256.9 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 16.794 | 17.562 | 16.642 | 17.562 | 154.7 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 56.082 | 59.996 | 54.541 | 59.996 | 256.9 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.234 | 0.265 | 0.226 | 0.265 | 156.0 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.321 | 7.485 | 6.171 | 7.485 | 256.9 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 175.527 | 200.771 | 167.404 | 200.771 | 176.1 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1515.380 | 1568.809 | 1474.497 | 1568.809 | 256.9 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.115 | 0.240 | 0.092 | 0.240 | 173.5 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.836 | 5.694 | 4.754 | 5.694 | 256.9 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.015 | 0.025 | 0.013 | 0.025 | 159.1 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.358 | 2.692 | 2.334 | 2.692 | 256.9 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 8.076 | 9.773 | 6.830 | 9.773 | 156.6 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 18.864 | 34.516 | 18.007 | 34.516 | 256.9 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.218 | 0.238 | 0.211 | 0.238 | 156.9 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.843 | 4.467 | 2.630 | 4.467 | 256.9 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 166.954 | 170.422 | 161.782 | 170.422 | 188.1 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1421.902 | 1545.829 | 1411.874 | 1545.829 | 256.9 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.115 | 0.177 | 0.093 | 0.177 | 185.2 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.748 | 5.808 | 4.715 | 5.808 | 256.9 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.014 | 0.017 | 0.014 | 0.017 | 170.8 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.353 | 2.367 | 2.316 | 2.367 | 256.9 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 6.650 | 8.968 | 5.949 | 8.968 | 153.2 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 16.000 | 28.070 | 15.676 | 28.070 | 256.9 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 2.316 | 3.165 | 1.741 | 3.165 | 162.7 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.821 | 2.894 | 2.782 | 2.894 | 256.9 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 165.651 | 206.175 | 161.753 | 206.175 | 152.7 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1463.531 | 1536.951 | 1408.796 | 1536.951 | 256.9 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.097 | 0.165 | 0.082 | 0.165 | 152.1 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.933 | 3.009 | 2.873 | 3.009 | 256.9 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.014 | 0.015 | 0.013 | 0.015 | 151.7 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.022 | 1.046 | 1.018 | 1.046 | 256.9 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 2.862 | 4.430 | 2.481 | 4.430 | 150.6 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.194 | 8.320 | 8.051 | 8.320 | 256.9 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.490 | 1.736 | 1.378 | 1.736 | 151.5 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.824 | 2.892 | 2.790 | 2.892 | 256.9 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.017 | 0.011 | 0.017 | 138.4 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.487 | 0.522 | 0.457 | 0.522 | 256.9 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 167.814 | 174.772 | 165.847 | 174.772 | 159.9 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1611.284 | 1754.190 | 1579.787 | 1754.190 | 256.9 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 156.428 | 159.948 | 154.133 | 159.948 | 173.6 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1721.558 | 1753.133 | 1592.125 | 1753.133 | 256.9 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.342 | 2.144 | 1.198 | 2.144 | 173.1 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.225 | 4.145 | 3.052 | 4.145 | 256.9 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.128 | 0.198 | 0.106 | 0.198 | 163.5 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.525 | 0.722 | 0.508 | 0.722 | 256.9 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.808 | 3.011 | 2.767 | 3.011 | 156.6 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 21.333 | 22.551 | 21.095 | 22.551 | 256.9 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.091 | 3.892 | 2.956 | 3.892 | 155.7 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 20.271 | 23.133 | 20.188 | 23.133 | 256.9 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 3.351 | 6.044 | 3.265 | 6.044 | 151.1 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.573 | 16.109 | 15.451 | 16.109 | 256.9 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.200 | 0.246 | 0.189 | 0.246 | 153.5 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.924 | 5.302 | 4.846 | 5.302 | 256.9 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 193.715 | 200.364 | 183.590 | 200.364 | 207.6 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1606.151 | 1819.729 | 1590.438 | 1819.729 | 256.9 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 4.771 | 5.543 | 4.222 | 5.543 | 204.0 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.997 | 7.272 | 5.827 | 7.272 | 256.9 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.283 | 0.322 | 0.254 | 0.322 | 198.4 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.546 | 2.964 | 2.446 | 2.964 | 256.9 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 18.718 | 21.748 | 13.304 | 21.748 | 193.8 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 43.445 | 48.233 | 42.620 | 48.233 | 256.9 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.498 | 0.770 | 0.422 | 0.770 | 196.7 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.382 | 10.445 | 7.288 | 10.445 | 256.9 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 218.510 | 514.257 | 197.328 | 514.257 | 213.4 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1624.142 | 1744.136 | 1592.687 | 1744.136 | 256.9 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 5.193 | 6.463 | 4.394 | 6.463 | 208.6 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.986 | 6.212 | 5.899 | 6.212 | 256.9 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.288 | 0.345 | 0.265 | 0.345 | 203.3 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.553 | 2.757 | 2.454 | 2.757 | 256.9 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 16.760 | 24.223 | 13.251 | 24.223 | 193.1 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 43.054 | 45.126 | 42.686 | 45.126 | 256.9 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.298 | 3.042 | 2.099 | 3.042 | 200.1 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.961 | 9.357 | 8.785 | 9.357 | 256.9 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 180.955 | 186.945 | 175.942 | 186.945 | 209.4 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1583.400 | 1638.635 | 1573.040 | 1638.635 | 256.9 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 3.135 | 4.255 | 2.826 | 4.255 | 206.1 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.205 | 4.448 | 4.151 | 4.448 | 256.9 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.285 | 0.301 | 0.267 | 0.301 | 200.6 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.127 | 1.148 | 1.121 | 1.148 | 256.9 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 8.666 | 9.908 | 7.675 | 9.908 | 176.1 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 21.107 | 21.424 | 20.952 | 21.424 | 256.9 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.274 | 3.083 | 2.160 | 3.083 | 198.5 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.844 | 9.146 | 8.755 | 9.146 | 256.9 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 185.819 | 191.361 | 183.900 | 191.361 | 149.3 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1710.056 | 1832.090 | 1671.950 | 1832.090 | 256.9 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 166.329 | 175.258 | 162.924 | 175.258 | 156.9 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1699.949 | 1740.741 | 1629.386 | 1740.741 | 256.9 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.006 | 1.405 | 0.966 | 1.405 | 154.2 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.967 | 4.046 | 3.921 | 4.046 | 256.9 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.094 | 0.113 | 0.088 | 0.113 | 152.9 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.708 | 0.733 | 0.699 | 0.733 | 256.9 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.012 | 0.015 | 0.012 | 0.015 | 140.8 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.488 | 0.891 | 0.470 | 0.891 | 256.9 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.320 | 0.496 | 0.265 | 0.496 | 145.4 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 16.846 | 31.757 | 15.236 | 31.757 | 256.9 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.014 | 0.011 | 0.014 | 139.9 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.450 | 0.474 | 0.433 | 0.474 | 256.9 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 185.463 | 375.622 | 176.567 | 375.622 | 155.4 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1656.379 | 1891.464 | 1653.463 | 1891.464 | 256.9 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 182.470 | 2298.693 | 157.918 | 2298.693 | 168.1 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1688.647 | 1876.706 | 1598.589 | 1876.706 | 256.9 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.873 | 7.565 | 0.784 | 7.565 | 165.5 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 4.095 | 6.914 | 3.871 | 6.914 | 256.9 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.111 | 1.204 | 0.100 | 1.204 | 156.5 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.666 | 0.895 | 0.663 | 0.895 | 256.9 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.321 | 13.431 | 13.214 | 13.431 | 155.3 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 50.786 | 51.656 | 50.236 | 51.656 | 256.9 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.593 | 14.104 | 13.416 | 14.104 | 154.1 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 51.064 | 59.816 | 49.723 | 59.816 | 256.9 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 13.909 | 14.024 | 13.812 | 14.024 | 150.5 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 44.760 | 45.025 | 44.363 | 45.025 | 256.9 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.219 | 0.317 | 0.205 | 0.317 | 150.8 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.493 | 6.570 | 5.382 | 6.570 | 256.9 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.017 | 0.011 | 0.017 | 144.7 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.459 | 0.475 | 0.433 | 0.475 | 256.9 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 168.494 | 196.569 | 167.667 | 196.569 | 161.8 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1606.631 | 1766.297 | 1596.078 | 1766.297 | 256.9 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 156.258 | 200.646 | 153.111 | 200.646 | 174.8 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1616.636 | 2105.788 | 1594.269 | 2105.788 | 256.9 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 1.187 | 1.308 | 1.137 | 1.308 | 171.9 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.904 | 5.553 | 3.817 | 5.553 | 256.9 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.134 | 0.153 | 0.106 | 0.153 | 162.9 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.679 | 0.707 | 0.635 | 0.707 | 256.9 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.973 | 3.336 | 2.898 | 3.336 | 161.6 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 22.594 | 22.806 | 22.095 | 22.806 | 256.9 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.142 | 3.343 | 3.044 | 3.343 | 160.8 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 21.646 | 24.979 | 21.602 | 24.979 | 256.9 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.571 | 4.100 | 3.387 | 4.100 | 156.9 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 16.261 | 16.663 | 16.080 | 16.663 | 256.9 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.232 | 0.322 | 0.211 | 0.322 | 157.1 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.481 | 5.559 | 5.425 | 5.559 | 256.9 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.441 | 7.785 | 7.440 | 7.785 | 159.3 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 49.022 | 49.759 | 48.358 | 49.759 | 256.9 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.335 | 1.601 | 1.156 | 1.601 | 160.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 10.128 | 10.285 | 9.994 | 10.285 | 256.9 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.356 | 0.439 | 0.326 | 0.439 | 157.9 |
| evaluation-flat-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.052 | 5.123 | 5.020 | 5.123 | 256.9 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 2.004 | 2.945 | 1.977 | 2.945 | 161.7 |
| evaluation-flat-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 5.444 | 5.479 | 5.434 | 5.479 | 256.9 |
| evaluation-flat-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.520 | 2.144 | 0.487 | 2.144 | 154.6 |
| evaluation-flat-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.526 | 5.630 | 5.459 | 5.630 | 256.9 |
| evaluation-flat-large-parallel | evaluation-point-processes | python-prophet | 4 | 1511.336 | 1563.236 | 1503.301 | 1563.236 | 256.9 |
| evaluation-flat-large-parallel | evaluation-point-threads | python-prophet | 4 | 200.257 | 214.872 | 197.243 | 214.872 | 256.9 |
| evaluation-flat-large-parallel | evaluation-point | effect-prophet | 4 | 24.496 | 25.940 | 23.795 | 25.940 | 175.1 |
| evaluation-flat-large-parallel | evaluation-point | python-prophet | 4 | 190.808 | 203.936 | 176.564 | 203.936 | 256.9 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 176.380 | 184.821 | 173.733 | 184.821 | 154.4 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1480.152 | 1570.143 | 1476.516 | 1570.143 | 256.9 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.629 | 2.677 | 2.567 | 2.677 | 152.4 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.339 | 1.423 | 1.302 | 1.423 | 256.9 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.156 | 0.160 | 0.154 | 0.160 | 131.7 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.565 | 0.592 | 0.522 | 0.592 | 256.9 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.062 | 0.086 | 0.061 | 0.086 | 152.0 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.442 | 5.658 | 5.401 | 5.658 | 256.9 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.821 | 2.336 | 1.651 | 2.336 | 141.2 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.788 | 0.842 | 0.776 | 0.842 | 256.9 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 5.434 | 7.658 | 5.331 | 7.658 | 151.3 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 45.868 | 48.052 | 39.322 | 48.052 | 256.9 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 5.651 | 11.132 | 4.913 | 11.132 | 155.9 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 63.001 | 68.790 | 60.830 | 68.790 | 256.9 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 179.812 | 181.224 | 177.771 | 181.224 | 158.4 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1519.797 | 1547.250 | 1462.853 | 1547.250 | 256.9 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.189 | 1.232 | 1.176 | 1.232 | 158.3 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.482 | 1.507 | 1.461 | 1.507 | 256.9 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.035 | 0.046 | 0.034 | 0.046 | 132.0 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.452 | 0.470 | 0.403 | 0.470 | 256.9 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.090 | 0.105 | 0.086 | 0.105 | 158.2 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.449 | 5.516 | 5.370 | 5.516 | 256.9 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.318 | 1.603 | 1.213 | 1.603 | 136.7 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.789 | 0.805 | 0.759 | 0.805 | 256.9 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 4.227 | 7.249 | 4.044 | 7.249 | 154.7 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 48.068 | 52.523 | 46.807 | 52.523 | 256.9 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 1.988 | 2.560 | 1.828 | 2.560 | 164.1 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.218 | 13.620 | 13.162 | 13.620 | 256.9 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.241 | 0.296 | 0.194 | 0.296 | 182.6 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 256.9 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.239 | 0.333 | 0.213 | 0.333 | 172.9 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.009 | 0.011 | 256.9 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.692 | 16.079 | 11.752 | 16.079 | 159.0 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 146.281 | 159.097 | 142.587 | 159.097 | 256.9 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | effect-prophet | 4 | 61.816 | 65.523 | 61.324 | 65.523 | 167.6 |
| evaluation-flat-regressor-model-intervals | evaluation-intervals | python-prophet | 4 | 305.189 | 333.885 | 302.428 | 333.885 | 256.9 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | effect-prophet | 4 | 257.546 | 283.577 | 252.766 | 283.577 | 195.4 |
| evaluation-flat-regressor-model-point | cold-first-evaluation | python-prophet | 4 | 1678.517 | 1736.557 | 1657.757 | 1736.557 | 256.9 |
| evaluation-flat-regressor-model-point | evaluation-baseline | effect-prophet | 4 | 6.828 | 7.529 | 6.676 | 7.529 | 195.2 |
| evaluation-flat-regressor-model-point | evaluation-baseline | python-prophet | 4 | 2.051 | 2.087 | 2.013 | 2.087 | 256.9 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | effect-prophet | 4 | 0.263 | 0.318 | 0.261 | 0.318 | 137.2 |
| evaluation-flat-regressor-model-point | evaluation-input-conversion | python-prophet | 4 | 0.838 | 0.906 | 0.783 | 0.906 | 256.9 |
| evaluation-flat-regressor-model-point | evaluation-metrics | effect-prophet | 4 | 0.112 | 0.139 | 0.102 | 0.139 | 178.0 |
| evaluation-flat-regressor-model-point | evaluation-metrics | python-prophet | 4 | 5.471 | 5.536 | 5.353 | 5.536 | 256.9 |
| evaluation-flat-regressor-model-point | evaluation-plan | effect-prophet | 4 | 2.486 | 2.887 | 2.377 | 2.887 | 147.3 |
| evaluation-flat-regressor-model-point | evaluation-plan | python-prophet | 4 | 1.083 | 1.123 | 1.050 | 1.123 | 256.9 |
| evaluation-flat-regressor-model-point | evaluation-point | effect-prophet | 4 | 61.424 | 69.336 | 61.348 | 69.336 | 164.9 |
| evaluation-flat-regressor-model-point | evaluation-point | python-prophet | 4 | 230.789 | 250.253 | 230.006 | 250.253 | 256.9 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.122 | 0.175 | 0.119 | 0.175 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.656 | 0.705 | 0.646 | 0.705 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 178.287 | 309.937 | 173.650 | 309.937 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1427.237 | 1443.894 | 1423.058 | 1443.894 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 162.011 | 192.441 | 161.046 | 192.441 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1430.237 | 1653.334 | 1421.991 | 1653.334 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.150 | 0.216 | 0.148 | 0.216 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.879 | 4.008 | 3.847 | 4.008 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.032 | 0.104 | 0.026 | 0.104 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.849 | 0.855 | 0.843 | 0.855 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.239 | 2.966 | 2.183 | 2.966 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.593 | 14.644 | 14.536 | 14.644 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.393 | 2.831 | 2.311 | 2.831 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 13.868 | 13.937 | 13.818 | 13.937 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.557 | 3.996 | 2.082 | 3.996 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 9.163 | 9.277 | 9.101 | 9.277 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.523 | 0.556 | 0.481 | 0.556 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.754 | 4.784 | 4.722 | 4.784 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.042 | 0.066 | 0.040 | 0.066 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.528 | 0.559 | 0.505 | 0.559 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 174.048 | 177.179 | 172.707 | 177.179 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1451.720 | 1513.540 | 1442.019 | 1513.540 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 159.109 | 159.976 | 157.709 | 159.976 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1436.642 | 1484.997 | 1423.930 | 1484.997 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.129 | 0.142 | 0.122 | 0.142 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.999 | 4.821 | 3.910 | 4.821 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.026 | 0.030 | 0.025 | 0.030 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.693 | 0.739 | 0.684 | 0.739 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.517 | 5.303 | 4.426 | 5.303 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.105 | 28.557 | 27.969 | 28.557 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.716 | 4.944 | 4.596 | 4.944 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 27.565 | 27.640 | 27.518 | 27.640 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 5.262 | 5.330 | 5.212 | 5.330 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 22.875 | 24.519 | 22.608 | 24.519 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.282 | 0.291 | 0.274 | 0.291 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.777 | 4.820 | 4.717 | 4.820 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 174.295 | 201.217 | 172.925 | 201.217 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1445.640 | 1568.254 | 1442.694 | 1568.254 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.124 | 0.151 | 0.123 | 0.151 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.097 | 2.746 | 2.050 | 2.746 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.035 | 0.022 | 0.035 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.410 | 0.429 | 0.408 | 0.429 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.158 | 1.460 | 1.145 | 1.460 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.169 | 3.845 | 3.078 | 3.845 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.272 | 0.385 | 0.271 | 0.385 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.697 | 3.186 | 2.663 | 3.186 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 172.358 | 177.904 | 170.142 | 177.904 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1436.305 | 1456.305 | 1434.714 | 1456.305 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.132 | 0.168 | 0.129 | 0.168 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.143 | 2.585 | 2.107 | 2.585 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.032 | 0.016 | 0.032 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.421 | 0.425 | 0.406 | 0.425 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.207 | 2.383 | 1.177 | 2.383 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.211 | 3.403 | 3.119 | 3.403 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.277 | 0.342 | 0.271 | 0.342 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.743 | 3.021 | 2.689 | 3.021 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.192 | 0.227 | 0.166 | 0.227 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.956 | 2.247 | 0.931 | 2.247 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 192.611 | 203.704 | 191.870 | 203.704 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1462.881 | 1551.130 | 1458.279 | 1551.130 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 168.230 | 185.086 | 164.490 | 185.086 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1438.726 | 1475.903 | 1434.894 | 1475.903 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.190 | 0.292 | 0.188 | 0.292 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.637 | 3.710 | 3.626 | 3.710 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.022 | 0.029 | 0.022 | 0.029 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.228 | 1.247 | 1.193 | 1.247 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.803 | 5.018 | 4.720 | 5.018 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 31.401 | 36.249 | 31.344 | 36.249 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 5.771 | 7.779 | 5.635 | 7.779 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 30.343 | 34.461 | 29.786 | 34.461 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 5.277 | 5.536 | 5.172 | 5.536 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 27.738 | 30.062 | 25.260 | 30.062 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.971 | 1.100 | 0.955 | 1.100 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.522 | 5.367 | 4.466 | 5.367 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.020 | 0.012 | 0.020 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.503 | 0.641 | 0.490 | 0.641 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 179.353 | 214.461 | 167.556 | 214.461 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1513.460 | 1611.255 | 1490.536 | 1611.255 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 163.242 | 171.464 | 157.493 | 171.464 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1591.754 | 1694.969 | 1486.449 | 1694.969 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.127 | 0.164 | 0.102 | 0.164 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.327 | 2.546 | 2.174 | 2.546 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.032 | 0.077 | 0.028 | 0.077 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.481 | 0.531 | 0.450 | 0.531 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.395 | 1.494 | 1.345 | 1.494 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 13.195 | 15.233 | 12.935 | 15.233 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.459 | 1.689 | 1.407 | 1.689 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 13.731 | 14.438 | 12.451 | 14.438 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 2.061 | 2.515 | 1.867 | 2.515 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 11.395 | 12.216 | 10.778 | 12.216 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.285 | 0.311 | 0.266 | 0.311 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.817 | 3.959 | 3.715 | 3.959 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.021 | 0.012 | 0.021 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.499 | 0.517 | 0.471 | 0.517 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 169.140 | 180.129 | 164.844 | 180.129 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1464.328 | 1650.692 | 1429.152 | 1650.692 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 154.714 | 156.777 | 151.362 | 156.777 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1496.388 | 1657.787 | 1454.820 | 1657.787 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.119 | 0.171 | 0.102 | 0.171 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.254 | 2.550 | 2.143 | 2.550 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.029 | 0.101 | 0.026 | 0.101 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.470 | 0.535 | 0.446 | 0.535 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.413 | 1.602 | 1.311 | 1.602 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.939 | 16.865 | 12.594 | 16.865 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.475 | 1.584 | 1.387 | 1.584 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 12.446 | 14.405 | 12.082 | 14.405 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 2.024 | 2.897 | 1.877 | 2.897 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 10.119 | 11.211 | 8.982 | 11.211 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.269 | 0.307 | 0.259 | 0.307 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.186 | 4.292 | 3.071 | 4.292 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.018 | 0.014 | 0.018 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.493 | 0.543 | 0.484 | 0.543 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 287.528 | 301.383 | 279.112 | 301.383 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1871.544 | 1982.729 | 1841.668 | 1982.729 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 156.950 | 168.728 | 153.422 | 168.728 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1467.087 | 1615.254 | 1430.634 | 1615.254 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.124 | 0.223 | 0.103 | 0.223 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.306 | 2.988 | 2.156 | 2.988 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.030 | 0.050 | 0.023 | 0.050 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.432 | 0.475 | 0.420 | 0.475 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 104.097 | 106.034 | 102.527 | 106.034 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 399.124 | 411.602 | 397.149 | 411.602 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 103.661 | 107.638 | 102.551 | 107.638 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 395.822 | 415.246 | 394.478 | 415.246 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 103.951 | 107.402 | 103.179 | 107.402 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 392.866 | 405.289 | 391.382 | 405.289 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.316 | 0.460 | 0.270 | 0.460 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.381 | 3.816 | 3.269 | 3.816 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.133 | 152.006 | 150.944 | 152.006 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1451.975 | 1599.453 | 1444.396 | 1599.453 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.168 | 0.136 | 0.168 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.137 | 2.502 | 2.088 | 2.502 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.031 | 0.018 | 0.031 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.447 | 0.461 | 0.435 | 0.461 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.739 | 1.874 | 1.659 | 1.874 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.700 | 9.161 | 7.125 | 9.161 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.267 | 0.280 | 0.267 | 0.280 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.734 | 3.520 | 2.706 | 3.520 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.894 | 168.728 | 161.452 | 168.728 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1440.205 | 1542.013 | 1435.899 | 1542.013 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.154 | 0.204 | 0.133 | 0.204 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.215 | 2.568 | 2.135 | 2.568 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.025 | 0.018 | 0.025 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.436 | 0.483 | 0.432 | 0.483 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.820 | 4.020 | 3.772 | 4.020 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 20.459 | 23.721 | 20.036 | 23.721 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.263 | 0.276 | 0.251 | 0.276 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.825 | 3.211 | 2.778 | 3.211 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.052 | 0.117 | 0.040 | 0.117 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.546 | 0.557 | 0.521 | 0.557 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 191.715 | 231.443 | 184.869 | 231.443 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1465.340 | 1476.335 | 1463.222 | 1476.335 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 186.507 | 336.696 | 170.561 | 336.696 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1427.184 | 1558.430 | 1424.471 | 1558.430 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.150 | 0.173 | 0.128 | 0.173 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.621 | 3.776 | 3.573 | 3.776 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.030 | 0.070 | 0.028 | 0.070 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.667 | 0.682 | 0.654 | 0.682 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.444 | 4.300 | 2.972 | 4.300 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 50.348 | 52.365 | 49.644 | 52.365 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.144 | 3.534 | 3.064 | 3.534 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 48.861 | 49.167 | 48.688 | 49.167 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 3.950 | 5.324 | 3.762 | 5.324 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 44.813 | 45.543 | 44.456 | 45.543 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.278 | 0.325 | 0.269 | 0.325 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.831 | 4.971 | 4.736 | 4.971 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 168.059 | 188.149 | 158.703 | 188.149 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1489.836 | 1548.910 | 1459.897 | 1548.910 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.168 | 0.215 | 0.163 | 0.215 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.748 | 4.932 | 3.660 | 4.932 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.037 | 0.019 | 0.037 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.682 | 0.858 | 0.660 | 0.858 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 1.929 | 3.229 | 1.901 | 3.229 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.584 | 10.784 | 7.812 | 10.784 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.599 | 2.702 | 0.374 | 2.702 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.915 | 6.377 | 4.785 | 6.377 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.627 | 169.036 | 161.011 | 169.036 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1443.649 | 1552.392 | 1430.249 | 1552.392 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.157 | 0.253 | 0.157 | 0.253 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 4.085 | 4.263 | 3.971 | 4.263 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.019 | 0.022 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.854 | 2.042 | 0.846 | 2.042 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 2.357 | 2.489 | 2.311 | 2.489 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.240 | 9.454 | 9.096 | 9.454 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.491 | 1.154 | 0.473 | 1.154 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.800 | 5.525 | 4.754 | 5.525 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.122 | 0.126 | 0.121 | 0.126 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.668 | 0.744 | 0.589 | 0.744 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 167.248 | 170.406 | 165.621 | 170.406 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1476.621 | 1590.313 | 1466.907 | 1590.313 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 154.478 | 158.162 | 152.595 | 158.162 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1436.307 | 1451.611 | 1431.397 | 1451.611 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.140 | 0.161 | 0.133 | 0.161 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.886 | 3.943 | 3.846 | 3.943 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.029 | 0.066 | 0.025 | 0.066 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.830 | 0.843 | 0.823 | 0.843 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.031 | 2.660 | 1.990 | 2.660 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 17.998 | 18.236 | 17.570 | 18.236 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.079 | 2.214 | 1.980 | 2.214 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 18.630 | 19.696 | 16.596 | 19.696 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.452 | 3.702 | 2.306 | 3.702 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 10.945 | 13.413 | 10.583 | 13.413 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.461 | 0.520 | 0.461 | 0.520 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 5.368 | 6.492 | 5.080 | 6.492 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.058 | 0.063 | 0.054 | 0.063 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.537 | 0.637 | 0.492 | 0.637 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 160.376 | 175.964 | 158.421 | 175.964 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1430.931 | 1592.920 | 1420.330 | 1592.920 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 171.413 | 178.180 | 159.250 | 178.180 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1527.676 | 1574.430 | 1464.505 | 1574.430 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.146 | 0.286 | 0.121 | 0.286 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.664 | 5.384 | 3.551 | 5.384 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.025 | 0.032 | 0.023 | 0.032 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.672 | 0.685 | 0.653 | 0.685 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.229 | 1.329 | 1.219 | 1.329 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 13.345 | 13.418 | 12.812 | 13.418 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.286 | 1.386 | 1.284 | 1.386 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.245 | 13.972 | 12.201 | 13.972 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.884 | 4.264 | 1.838 | 4.264 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.684 | 9.027 | 7.656 | 9.027 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.278 | 0.369 | 0.271 | 0.369 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.739 | 4.904 | 4.687 | 4.904 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 175.101 | 177.667 | 174.179 | 177.667 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1485.833 | 1589.149 | 1472.791 | 1589.149 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.131 | 0.150 | 0.111 | 0.150 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.229 | 2.381 | 2.108 | 2.381 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.028 | 0.019 | 0.028 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.454 | 0.497 | 0.443 | 0.497 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 2.159 | 2.220 | 2.135 | 2.220 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.617 | 8.914 | 7.130 | 8.914 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.274 | 0.290 | 0.260 | 0.290 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.749 | 3.804 | 2.647 | 3.804 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.079 | 170.369 | 158.024 | 170.369 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1483.777 | 1620.982 | 1449.020 | 1620.982 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.123 | 0.177 | 0.112 | 0.177 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.154 | 2.268 | 2.105 | 2.268 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.029 | 0.016 | 0.029 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.446 | 0.520 | 0.435 | 0.520 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.879 | 4.693 | 3.667 | 4.693 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 22.814 | 74.336 | 20.431 | 74.336 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.274 | 0.285 | 0.262 | 0.285 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.823 | 4.339 | 2.707 | 4.339 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.342 | 170.092 | 157.323 | 170.092 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1466.158 | 1493.288 | 1438.926 | 1493.288 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.202 | 0.254 | 0.200 | 0.254 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.935 | 4.068 | 3.789 | 4.068 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.017 | 0.021 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.797 | 1.082 | 0.787 | 1.082 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.347 | 4.607 | 2.182 | 4.607 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.935 | 10.475 | 8.896 | 10.475 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.151 | 0.154 | 0.151 | 0.154 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.950 | 5.014 | 4.871 | 5.014 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.444 | 169.444 | 157.879 | 169.444 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1461.475 | 1564.606 | 1424.736 | 1564.606 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.207 | 0.258 | 0.190 | 0.258 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 4.970 | 5.897 | 4.422 | 5.897 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.024 | 0.017 | 0.024 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.839 | 1.838 | 0.794 | 1.838 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 2.463 | 4.777 | 2.250 | 4.777 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 11.942 | 12.973 | 11.409 | 12.973 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.165 | 0.166 | 0.151 | 0.166 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 5.828 | 6.669 | 4.979 | 6.669 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.004 | 165.352 | 157.382 | 165.352 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1553.654 | 1656.190 | 1473.342 | 1656.190 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.201 | 0.219 | 0.200 | 0.219 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 4.546 | 5.016 | 4.484 | 5.016 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.023 | 0.021 | 0.023 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.821 | 1.894 | 0.807 | 1.894 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 2.295 | 4.776 | 2.116 | 4.776 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 11.569 | 12.397 | 11.097 | 12.397 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.148 | 0.155 | 0.147 | 0.155 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 5.547 | 7.080 | 5.060 | 7.080 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.241 | 160.943 | 158.030 | 160.943 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1423.692 | 1569.122 | 1423.082 | 1569.122 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.193 | 0.265 | 0.184 | 0.265 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.967 | 4.696 | 3.901 | 4.696 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.025 | 0.021 | 0.025 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.818 | 0.834 | 0.807 | 0.834 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 2.199 | 4.658 | 2.174 | 4.658 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 9.276 | 10.664 | 9.121 | 10.664 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.149 | 0.152 | 0.146 | 0.152 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.933 | 5.151 | 4.872 | 5.151 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.681 | 171.770 | 157.557 | 171.770 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1426.392 | 1558.823 | 1426.305 | 1558.823 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.319 | 2.136 | 0.300 | 2.136 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.737 | 11.058 | 3.555 | 11.058 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.021 | 0.024 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.638 | 0.662 | 0.626 | 0.662 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 2.009 | 2.608 | 1.847 | 2.608 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 8.108 | 8.815 | 7.449 | 8.815 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.211 | 0.264 | 0.203 | 0.264 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.772 | 7.779 | 4.738 | 7.779 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 180.520 | 534.218 | 169.860 | 534.218 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1431.744 | 1484.587 | 1418.593 | 1484.587 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.313 | 0.639 | 0.261 | 0.639 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.573 | 3.704 | 3.572 | 3.704 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.048 | 0.022 | 0.048 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.645 | 0.671 | 0.641 | 0.671 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 2.146 | 2.729 | 1.694 | 2.729 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 8.192 | 9.102 | 7.709 | 9.102 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.252 | 0.453 | 0.242 | 0.453 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.783 | 4.813 | 4.775 | 4.813 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.061 | 167.815 | 161.937 | 167.815 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1483.121 | 1640.399 | 1474.519 | 1640.399 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.267 | 0.397 | 0.238 | 0.397 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.687 | 3.776 | 3.573 | 3.776 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.056 | 0.020 | 0.056 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.642 | 0.665 | 0.632 | 0.665 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.540 | 2.887 | 2.173 | 2.887 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 8.157 | 9.529 | 7.619 | 9.529 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.259 | 0.315 | 0.258 | 0.315 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.805 | 4.934 | 4.762 | 4.934 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 163.813 | 179.080 | 162.166 | 179.080 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1557.677 | 1592.714 | 1556.299 | 1592.714 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.342 | 0.377 | 0.296 | 0.377 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.997 | 4.683 | 3.780 | 4.683 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.032 | 0.022 | 0.032 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.638 | 0.850 | 0.623 | 0.850 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 3.064 | 3.273 | 2.402 | 3.273 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 9.869 | 11.295 | 9.657 | 11.295 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.321 | 0.359 | 0.275 | 0.359 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 5.496 | 6.730 | 5.111 | 6.730 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.723 | 204.900 | 163.931 | 204.900 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1461.691 | 1564.166 | 1441.298 | 1564.166 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.203 | 0.326 | 0.194 | 0.326 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.840 | 4.520 | 3.815 | 4.520 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.037 | 0.021 | 0.037 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.667 | 0.724 | 0.662 | 0.724 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.005 | 2.415 | 1.829 | 2.415 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 9.905 | 10.152 | 9.272 | 10.152 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.235 | 0.266 | 0.227 | 0.266 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 5.040 | 5.958 | 4.882 | 5.958 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.537 | 168.190 | 158.044 | 168.190 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1549.028 | 1663.379 | 1500.832 | 1663.379 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.204 | 0.220 | 0.194 | 0.220 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.860 | 4.573 | 3.732 | 4.573 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.035 | 0.019 | 0.035 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.694 | 1.031 | 0.675 | 1.031 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.205 | 3.019 | 2.155 | 3.019 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 9.194 | 11.458 | 8.809 | 11.458 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.242 | 0.382 | 0.205 | 0.382 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 5.140 | 5.893 | 4.909 | 5.893 | n/a |
| flat-regressor-model | adapter-input-conversion | effect-prophet | 4 | 0.110 | 0.198 | 0.106 | 0.198 | n/a |
| flat-regressor-model | adapter-input-conversion | python-prophet | 4 | 0.944 | 0.980 | 0.942 | 0.980 | n/a |
| flat-regressor-model | cold-first-forecast | effect-prophet | 4 | 208.626 | 213.170 | 206.311 | 213.170 | n/a |
| flat-regressor-model | cold-first-forecast | python-prophet | 4 | 1574.475 | 1709.227 | 1552.415 | 1709.227 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | effect-prophet | 4 | 23.803 | 24.272 | 23.555 | 24.272 | n/a |
| flat-regressor-model | warm-fit-predict-with-conversion | python-prophet | 4 | 132.724 | 133.256 | 132.583 | 133.256 | n/a |
| flat-regressor-model | warm-fit-predict | effect-prophet | 4 | 24.668 | 28.351 | 24.111 | 28.351 | n/a |
| flat-regressor-model | warm-fit-predict | python-prophet | 4 | 130.335 | 143.510 | 129.614 | 143.510 | n/a |
| flat-regressor-model | warm-fit | effect-prophet | 4 | 23.857 | 24.643 | 23.465 | 24.643 | n/a |
| flat-regressor-model | warm-fit | python-prophet | 4 | 102.901 | 118.258 | 102.348 | 118.258 | n/a |
| flat-regressor-model | warm-predict | effect-prophet | 4 | 1.934 | 2.087 | 1.823 | 2.087 | n/a |
| flat-regressor-model | warm-predict | python-prophet | 4 | 27.652 | 28.203 | 27.421 | 28.203 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.786 | 161.132 | 152.748 | 161.132 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1442.988 | 1602.510 | 1435.074 | 1602.510 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.187 | 0.267 | 0.177 | 0.267 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.231 | 2.261 | 2.184 | 2.261 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.032 | 0.018 | 0.032 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.477 | 0.518 | 0.469 | 0.518 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 148.871 | 150.176 | 148.431 | 150.176 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 626.668 | 646.695 | 616.815 | 646.695 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.311 | 0.429 | 0.279 | 0.429 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.227 | 3.372 | 3.210 | 3.372 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.334 | 166.951 | 154.426 | 166.951 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1420.169 | 1584.372 | 1418.844 | 1584.372 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.176 | 0.187 | 0.172 | 0.187 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.274 | 2.604 | 2.186 | 2.604 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.029 | 0.019 | 0.029 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.444 | 0.549 | 0.443 | 0.549 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.252 | 4.456 | 4.250 | 4.456 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 21.270 | 24.884 | 20.911 | 24.884 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.278 | 0.303 | 0.266 | 0.303 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.067 | 5.067 | 3.061 | 5.067 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 167.132 | 180.206 | 162.481 | 180.206 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1422.844 | 1580.224 | 1417.122 | 1580.224 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.248 | 0.491 | 0.223 | 0.491 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.963 | 2.465 | 1.864 | 2.465 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.018 | 0.020 | 0.015 | 0.020 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.340 | 0.634 | 0.329 | 0.634 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.552 | 0.853 | 0.469 | 0.853 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.894 | 3.020 | 2.868 | 3.020 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.117 | 0.138 | 0.111 | 0.138 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.692 | 2.796 | 2.651 | 2.796 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 164.695 | 168.736 | 161.821 | 168.736 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1433.766 | 1531.865 | 1423.897 | 1531.865 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.164 | 0.498 | 0.161 | 0.498 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.867 | 1.950 | 1.863 | 1.950 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.019 | 0.021 | 0.016 | 0.021 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.312 | 0.349 | 0.305 | 0.349 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.904 | 1.232 | 0.812 | 1.232 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.470 | 5.686 | 5.388 | 5.686 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.130 | 0.132 | 0.120 | 0.132 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.721 | 3.066 | 2.674 | 3.066 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 289.882 | 306.548 | 284.962 | 306.548 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1963.870 | 2000.010 | 1955.442 | 2000.010 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 176.901 | 179.926 | 170.472 | 179.926 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1595.002 | 1660.356 | 1561.821 | 1660.356 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.136 | 0.174 | 0.125 | 0.174 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.150 | 2.348 | 2.101 | 2.348 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.017 | 0.027 | 0.015 | 0.027 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.455 | 0.464 | 0.436 | 0.464 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.020 | 0.028 | 0.019 | 0.028 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.510 | 0.943 | 0.500 | 0.943 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.508 | 4.763 | 4.475 | 4.763 | 148.2 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 136.214 | 148.760 | 124.443 | 148.760 | 256.9 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 180.575 | 193.590 | 170.444 | 193.590 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1527.157 | 1694.801 | 1515.508 | 1694.801 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 173.190 | 176.911 | 157.663 | 176.911 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1564.755 | 1655.379 | 1514.973 | 1655.379 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.214 | 0.399 | 0.188 | 0.399 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.804 | 5.507 | 3.601 | 5.507 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.029 | 0.040 | 0.025 | 0.040 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.688 | 0.975 | 0.672 | 0.975 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.047 | 0.106 | 0.028 | 0.106 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.538 | 0.558 | 0.520 | 0.558 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.380 | 2.430 | 0.956 | 2.430 | 140.1 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 72.833 | 78.508 | 72.451 | 78.508 | 256.9 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 180.862 | 192.603 | 172.698 | 192.603 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1470.643 | 1670.446 | 1452.144 | 1670.446 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 164.895 | 183.616 | 157.426 | 183.616 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1452.876 | 1465.359 | 1440.109 | 1465.359 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.198 | 0.662 | 0.168 | 0.662 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.985 | 5.224 | 3.854 | 5.224 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.021 | 0.042 | 0.018 | 0.042 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.950 | 1.203 | 0.844 | 1.203 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.127 | 0.179 | 0.095 | 0.179 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.668 | 0.912 | 0.639 | 0.912 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.933 | 1.232 | 0.769 | 1.232 | 153.5 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 22.353 | 48.027 | 19.973 | 48.027 | 256.9 |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 229.686 | 293.882 | 226.652 | 293.882 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1966.137 | 2146.113 | 1881.736 | 2146.113 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.186 | 0.206 | 0.104 | 0.206 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.943 | 0.971 | 0.925 | 0.971 | n/a |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 18.463 | 18.855 | 17.687 | 18.855 | 191.5 |
| uncertainty-flat-regressor-model-intervals-1000 | warm-uncertainty | python-prophet | 6 | 270.899 | 294.433 | 268.947 | 294.433 | 256.9 |
| warm-start-flat-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 103.894 | 108.164 | 103.678 | 108.164 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-fit | python-prophet | 6 | 399.447 | 458.704 | 390.396 | 458.704 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 6.257 | 8.357 | 5.971 | 8.357 | n/a |
| warm-start-flat-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 8.763 | 10.256 | 8.624 | 10.256 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `a3424eff3a47970f12ddc3764fae47fc2aeb41e3`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:9f188929a72b1631b26ef01a65b6f50dda889b753e2e869a503d09daeb6f6f4a`
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

