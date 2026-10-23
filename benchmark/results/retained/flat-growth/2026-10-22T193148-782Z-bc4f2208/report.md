# Effect Prophet benchmark — 2026-10-22T193148-782Z-bc4f2208

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
| evaluation-flat-mixed-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-mixed-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.814e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.443e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-flat-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.443e-7 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
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
| country-us-flat-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12254 | 25351 |
| country-us-flat-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12254 | 25351 |
| country-explicit-us-flat-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3535 | 28167 |
| country-explicit-us-flat-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3535 | 28167 |
| country-us-flat-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12276 | 25372 |
| country-us-flat-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12276 | 25372 |
| country-explicit-us-flat-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3545 | 28188 |
| country-explicit-us-flat-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3545 | 28188 |
| country-boundary-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2010 | 13 | 11509 | 25601 |
| country-boundary-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2010 | 13 | 11509 | 25601 |
| country-empty-bv-flat | 0 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 0 | 2904 | 19084 |
| country-empty-bv-flat | 1 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 0 | 2904 | 19084 |
| country-explicit-empty-flat | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 0 | 570 | 19084 |
| country-explicit-empty-flat | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 0 | 570 | 19084 |
| country-estimated-sg-flat | 0 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 11 | 13181 | 23312 |
| country-estimated-sg-flat | 1 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 11 | 13181 | 23312 |
| country-partial-in-flat | 0 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2036 | 10 | 16613 | 23664 |
| country-partial-in-flat | 1 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2036 | 10 | 16613 | 23664 |
| country-mixed-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12579 | 31303 |
| country-mixed-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12579 | 31303 |
| country-none-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 0 | 586 | 122498 |
| country-none-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 0 | 586 | 122498 |
| country-se-flat-730 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-se-flat-730 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-explicit-se-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 14 | 25756 | 159826 |
| country-explicit-se-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 14 | 25756 | 159826 |
| country-cn-flat-730 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-cn-flat-730 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-explicit-cn-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 26 | 10007 | 165955 |
| country-explicit-cn-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 26 | 10007 | 165955 |
| country-none-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 14 | 50561 | 430748 |
| country-explicit-se-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 14 | 50561 | 430748 |
| country-cn-flat-2190 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-cn-flat-2190 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-explicit-cn-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 56 | 21026 | 534811 |
| country-explicit-cn-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 56 | 21026 | 534811 |
| country-none-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190-batch-32 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190-batch-32 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 14 | 44365 | 423057 |
| country-explicit-se-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 14 | 44365 | 423057 |
| country-uncertainty-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12254 | 25351 |
| country-uncertainty-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12254 | 25351 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| country-uncertainty-us-flat | 96 | 12 | 25 | 4 | 4 | 275 | 32 | intervals | 67108864 | country-v5:country-basic-96:level+jan1(3)+jan5(1.4)+bounded-noise:n=96:future=4:year=2024 / 9ff002c94ecdaa2f78ad32094f4af7cf5cbbe377f19cfdb5b3100e29005151f8 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-defaults-seasonal-intervals-1000 | 96 | 6 | 25 | 120 | 24 | 24 | 1000 | intervals | 67108864 | flat-seasonal-v1:n=96:h=24:level=35:bounded-noise=true / 801786aaae3b93349addcc9eca44eff79cb6f5640dce099ddd19082a85636e2a | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-full-intervals-512 | 96 | 6 | 25 | 24 | 24 | 24 | 512 | intervals | 67108864 | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-flat-mixed-components-large-full-samples-128 | 256 | 6 | 25 | 64 | 64 | 64 | 128 | samples | 67108864 | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | docs/validation/uncertainty.md#evidence-classes |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-flat-mixed-point | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons / exclude | n/a |
| evaluation-flat-mixed-intervals | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 0 | 3 | 210 | 21 | 6 | 25 | 128 | 19 / 0.8 | horizons / exclude | n/a |
| evaluation-flat-mixed-search | flat-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 4e1e4fd02c0e9a88f9f8369942d9ae9deaa9a3ebe0dcdffbb6d45e8a23c3263f | flat | 3 | 3 | 210 | 21 | 6 | 25 | 0 | n/a / n/a | horizons / exclude | d27263ab5e5b8f488de56085850577bb13a87b5ad4dca13da9039ce8de013341, ac378f98946578839b9dc1c9dbd10cc73c207ee8c103ad3c437807ee60fab209, d76d1f1e1ceb3370113274ddc7a004255a238dcdea9959d517623cb508c5da64 |
| evaluation-flat-large-point | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 0 | n/a / n/a | rolling / exclude | n/a |
| evaluation-flat-large-intervals | flat-mixed-components-large-v1:n=256:h=64:conditional-weekly+event+regressor / 7ee4bb9692dfb115e926da542b37298a311e06037c0e5a638ca067a1fb937b11 | flat | 0 | 2 | 457 | 14 | 6 | 25 | 128 | 19 / 0.8 | rolling / exclude | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.029 | 0.013 | 0.029 | 141.6 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.441 | 0.474 | 0.431 | 0.474 | 252.2 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 217.472 | 242.237 | 207.180 | 242.237 | 160.7 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1702.661 | 1740.421 | 1666.330 | 1740.421 | 252.2 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 170.024 | 199.224 | 165.592 | 199.224 | 163.3 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1597.916 | 1781.084 | 1592.727 | 1781.084 | 252.2 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.921 | 1.684 | 0.824 | 1.684 | 161.2 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.410 | 4.397 | 3.315 | 4.397 | 252.2 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.094 | 0.119 | 0.075 | 0.119 | 160.7 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.557 | 0.652 | 0.536 | 0.652 | 252.2 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 22.019 | 24.138 | 21.287 | 24.138 | 160.7 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 72.632 | 73.140 | 72.202 | 73.140 | 252.2 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 22.368 | 22.778 | 21.930 | 22.778 | 160.2 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 71.888 | 73.588 | 71.650 | 73.588 | 252.2 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 23.215 | 27.032 | 22.298 | 27.032 | 159.5 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 66.325 | 66.579 | 66.063 | 66.579 | 252.2 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.247 | 0.423 | 0.221 | 0.423 | 159.6 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.512 | 5.649 | 5.372 | 5.649 | 252.2 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 185.711 | 200.143 | 185.323 | 200.143 | 230.8 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1622.973 | 1742.843 | 1617.056 | 1742.843 | 252.2 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.863 | 3.659 | 2.834 | 3.659 | 223.6 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.146 | 9.284 | 9.045 | 9.284 | 252.2 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.112 | 0.142 | 0.107 | 0.142 | 218.0 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.031 | 3.052 | 3.012 | 3.052 | 252.2 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 27.346 | 29.334 | 21.939 | 29.334 | 206.0 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 82.819 | 110.678 | 82.118 | 110.678 | 252.2 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.963 | 4.520 | 3.621 | 4.520 | 209.3 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 8.752 | 9.018 | 8.716 | 9.018 | 252.2 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 180.169 | 197.228 | 177.056 | 197.228 | 197.8 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1635.604 | 1673.073 | 1601.977 | 1673.073 | 252.2 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 2.251 | 3.221 | 1.816 | 3.221 | 196.5 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 4.931 | 5.085 | 4.899 | 5.085 | 252.2 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.153 | 0.311 | 0.141 | 0.311 | 186.7 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.266 | 1.528 | 1.244 | 1.528 | 252.2 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 7.550 | 9.003 | 7.189 | 9.003 | 155.2 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 24.692 | 27.537 | 24.536 | 27.537 | 252.2 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.701 | 4.390 | 2.386 | 4.390 | 169.4 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 7.022 | 7.457 | 6.919 | 7.457 | 252.2 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.021 | 0.013 | 0.021 | 135.4 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.508 | 0.439 | 0.508 | 252.2 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 175.507 | 212.835 | 171.975 | 212.835 | 149.9 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1658.784 | 1719.018 | 1596.342 | 1719.018 | 252.2 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 162.422 | 170.821 | 159.427 | 170.821 | 150.2 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1600.250 | 1677.709 | 1574.510 | 1677.709 | 252.2 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.247 | 0.280 | 0.190 | 0.280 | 150.2 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.122 | 2.202 | 2.057 | 2.202 | 252.2 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.038 | 0.057 | 0.030 | 0.057 | 150.2 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.437 | 0.493 | 0.432 | 0.493 | 252.2 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.599 | 2.271 | 1.544 | 2.271 | 149.9 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 13.204 | 49.950 | 13.193 | 49.950 | 252.2 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 2.158 | 4.135 | 1.697 | 4.135 | 149.9 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.642 | 13.961 | 12.444 | 13.961 | 252.2 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.765 | 3.241 | 2.263 | 3.241 | 141.7 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.788 | 25.637 | 9.411 | 25.637 | 252.2 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.190 | 0.208 | 0.158 | 0.208 | 143.7 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.213 | 4.534 | 3.071 | 4.534 | 252.2 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.058 | 0.091 | 0.036 | 0.091 | 140.8 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.638 | 6.135 | 0.616 | 6.135 | 252.2 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 206.867 | 230.311 | 206.136 | 230.311 | 173.7 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1687.419 | 1827.593 | 1647.700 | 1827.593 | 252.2 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 172.144 | 180.218 | 165.973 | 180.218 | 191.6 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1641.514 | 1684.104 | 1622.427 | 1684.104 | 252.2 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 1.168 | 2.276 | 1.003 | 2.276 | 191.2 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.210 | 4.552 | 3.128 | 4.552 | 252.2 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.115 | 0.189 | 0.087 | 0.189 | 178.4 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.511 | 0.562 | 0.488 | 0.562 | 252.2 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 20.774 | 22.729 | 19.949 | 22.729 | 172.5 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 69.540 | 70.516 | 68.792 | 70.516 | 252.2 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 20.382 | 20.610 | 20.131 | 20.610 | 158.7 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 68.577 | 94.197 | 67.573 | 94.197 | 252.2 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 19.372 | 20.386 | 19.147 | 20.386 | 148.1 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 64.132 | 68.803 | 63.657 | 68.803 | 252.2 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.733 | 2.937 | 1.470 | 2.937 | 155.3 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.315 | 5.628 | 5.216 | 5.628 | 252.2 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 181.938 | 186.809 | 181.342 | 186.809 | 239.1 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1474.263 | 1542.866 | 1452.094 | 1542.866 | 252.2 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.991 | 5.435 | 1.697 | 5.435 | 239.0 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.181 | 10.808 | 10.030 | 10.808 | 252.2 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.038 | 0.056 | 0.029 | 0.056 | 231.6 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.428 | 3.532 | 3.321 | 3.532 | 252.2 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 21.468 | 29.040 | 20.482 | 29.040 | 208.4 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 83.580 | 100.261 | 79.904 | 100.261 | 252.2 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.076 | 3.772 | 2.757 | 3.772 | 223.7 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.577 | 19.131 | 9.333 | 19.131 | 252.2 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 179.994 | 269.973 | 178.043 | 269.973 | 202.6 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1506.506 | 1584.801 | 1467.394 | 1584.801 | 252.2 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.938 | 10.090 | 0.829 | 10.090 | 193.6 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.829 | 6.029 | 5.747 | 6.029 | 252.2 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.033 | 0.050 | 0.023 | 0.050 | 182.5 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.486 | 1.525 | 1.468 | 1.525 | 252.2 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 6.402 | 6.995 | 5.708 | 6.995 | 157.1 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 21.407 | 21.889 | 20.797 | 21.889 | 252.2 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.548 | 2.802 | 2.314 | 2.802 | 165.1 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 7.024 | 26.651 | 6.485 | 26.651 | 252.2 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.021 | 0.013 | 0.021 | 127.7 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.459 | 0.498 | 0.435 | 0.498 | 252.2 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 172.547 | 195.607 | 171.249 | 195.607 | 151.1 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1431.889 | 1477.084 | 1422.117 | 1477.084 | 252.2 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 158.936 | 164.927 | 156.629 | 164.927 | 151.3 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1430.977 | 1444.198 | 1422.045 | 1444.198 | 252.2 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.107 | 0.124 | 0.103 | 0.124 | 151.1 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.084 | 2.261 | 2.079 | 2.261 | 252.2 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.016 | 0.024 | 0.013 | 0.024 | 151.1 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.439 | 0.473 | 0.423 | 0.473 | 252.2 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.439 | 2.733 | 1.088 | 2.733 | 150.9 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 11.469 | 11.845 | 11.243 | 11.845 | 252.2 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.542 | 1.795 | 1.482 | 1.795 | 142.8 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 11.006 | 14.300 | 10.740 | 14.300 | 252.2 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.872 | 4.022 | 1.396 | 4.022 | 138.0 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.451 | 9.596 | 8.184 | 9.596 | 252.2 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.120 | 0.168 | 0.108 | 0.168 | 138.6 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.645 | 3.530 | 2.614 | 3.530 | 252.2 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 178.052 | 188.829 | 177.049 | 188.829 | 196.0 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1479.494 | 1527.162 | 1451.630 | 1527.162 | 252.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.607 | 2.672 | 2.518 | 2.672 | 194.3 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.412 | 7.717 | 7.054 | 7.717 | 252.2 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.080 | 0.111 | 0.076 | 0.111 | 179.1 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.900 | 3.399 | 2.858 | 3.399 | 252.2 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 12.555 | 13.252 | 11.354 | 13.252 | 158.1 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 39.316 | 54.337 | 38.577 | 54.337 | 252.2 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.384 | 0.416 | 0.357 | 0.416 | 159.1 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 12.154 | 12.354 | 12.028 | 12.354 | 252.2 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 188.249 | 192.021 | 185.452 | 192.021 | 204.9 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1449.813 | 1482.168 | 1436.006 | 1482.168 | 252.2 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 2.858 | 3.021 | 2.781 | 3.021 | 202.6 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.230 | 7.425 | 7.189 | 7.425 | 252.2 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.047 | 0.050 | 0.047 | 0.050 | 200.8 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.884 | 2.932 | 2.849 | 2.932 | 252.2 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 14.490 | 15.770 | 12.210 | 15.770 | 173.8 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 40.494 | 53.057 | 39.638 | 53.057 | 252.2 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.067 | 2.257 | 1.881 | 2.257 | 197.4 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.255 | 13.655 | 13.227 | 13.655 | 252.2 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 181.391 | 192.720 | 176.893 | 192.720 | 177.4 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1459.182 | 1500.168 | 1439.068 | 1500.168 | 252.2 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.364 | 2.510 | 2.277 | 2.510 | 174.8 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.194 | 5.746 | 5.109 | 5.746 | 252.2 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.031 | 0.033 | 0.031 | 0.033 | 158.3 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.435 | 1.486 | 1.432 | 1.486 | 252.2 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.669 | 6.716 | 5.513 | 6.716 | 152.2 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 19.281 | 20.116 | 19.000 | 20.116 | 252.2 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 2.161 | 2.756 | 1.875 | 2.756 | 156.8 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 8.831 | 9.009 | 8.679 | 9.009 | 252.2 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.023 | 0.012 | 0.023 | 135.2 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.480 | 0.448 | 0.480 | 252.2 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 194.703 | 270.543 | 188.833 | 270.543 | 155.6 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1472.152 | 1512.645 | 1470.334 | 1512.645 | 252.2 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 167.476 | 258.913 | 161.552 | 258.913 | 155.8 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1440.029 | 1488.967 | 1422.977 | 1488.967 | 252.2 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.483 | 0.697 | 0.439 | 0.697 | 155.8 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 3.981 | 4.132 | 3.917 | 4.132 | 252.2 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.028 | 0.040 | 0.021 | 0.040 | 155.6 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.747 | 0.780 | 0.706 | 0.780 | 252.2 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 12.899 | 14.398 | 12.811 | 14.398 | 155.4 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 48.130 | 50.021 | 47.570 | 50.021 | 252.2 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.313 | 15.605 | 13.157 | 15.605 | 155.4 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 46.805 | 47.659 | 46.592 | 47.659 | 252.2 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 13.705 | 16.975 | 13.228 | 16.975 | 146.4 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 42.583 | 45.331 | 42.303 | 45.331 | 252.2 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.212 | 0.294 | 0.196 | 0.294 | 149.0 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.760 | 4.889 | 4.708 | 4.889 | 252.2 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.020 | 0.013 | 0.020 | 138.5 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.473 | 0.492 | 0.445 | 0.492 | 252.2 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 176.929 | 229.441 | 171.148 | 229.441 | 160.4 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1466.020 | 1481.618 | 1430.550 | 1481.618 | 252.2 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 169.460 | 877.805 | 157.713 | 877.805 | 160.4 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1443.189 | 1484.852 | 1431.113 | 1484.852 | 252.2 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.439 | 0.600 | 0.390 | 0.600 | 160.4 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 4.097 | 4.500 | 3.938 | 4.500 | 252.2 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.025 | 0.046 | 0.019 | 0.046 | 160.4 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.770 | 2.439 | 0.714 | 2.439 | 252.2 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.566 | 2.809 | 2.541 | 2.809 | 160.0 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.641 | 19.390 | 18.498 | 19.390 | 252.2 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.728 | 2.972 | 2.679 | 2.972 | 160.0 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 17.903 | 18.121 | 17.640 | 18.121 | 252.2 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.433 | 3.770 | 3.133 | 3.770 | 150.7 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.374 | 14.408 | 13.274 | 14.408 | 252.2 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.291 | 0.387 | 0.212 | 0.387 | 153.2 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.727 | 4.830 | 4.698 | 4.830 | 252.2 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.034 | 0.042 | 0.023 | 0.042 | 137.9 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.516 | 0.738 | 0.511 | 0.738 | 252.2 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 195.284 | 224.430 | 191.287 | 224.430 | 160.8 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1661.483 | 1753.766 | 1644.893 | 1753.766 | 252.2 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 169.245 | 178.126 | 166.965 | 178.126 | 161.5 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1625.935 | 2315.659 | 1602.902 | 2315.659 | 252.2 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.879 | 1.234 | 0.806 | 1.234 | 160.8 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.329 | 4.461 | 4.255 | 4.461 | 252.2 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.109 | 0.233 | 0.097 | 0.233 | 160.8 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.763 | 0.791 | 0.734 | 0.791 | 252.2 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.484 | 19.925 | 17.897 | 19.925 | 158.7 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 63.121 | 69.181 | 61.860 | 69.181 | 252.2 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 17.656 | 18.266 | 17.073 | 18.266 | 157.1 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 61.837 | 70.861 | 61.498 | 70.861 | 252.2 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.887 | 20.104 | 17.339 | 20.104 | 152.1 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 55.936 | 57.971 | 54.853 | 57.971 | 252.2 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.283 | 0.362 | 0.233 | 0.362 | 154.1 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.280 | 6.385 | 6.173 | 6.385 | 252.2 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 165.246 | 170.043 | 164.033 | 170.043 | 157.6 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1435.956 | 1492.381 | 1416.770 | 1492.381 | 252.2 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.091 | 0.143 | 0.082 | 0.143 | 156.7 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.731 | 4.842 | 4.667 | 4.842 | 252.2 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.014 | 0.023 | 0.013 | 0.023 | 156.4 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.369 | 2.445 | 2.310 | 2.445 | 252.2 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 8.088 | 8.293 | 6.337 | 8.293 | 155.3 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 15.644 | 32.868 | 15.190 | 32.868 | 252.2 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.204 | 0.225 | 0.191 | 0.225 | 155.8 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.817 | 3.831 | 2.709 | 3.831 | 252.2 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 174.231 | 216.767 | 173.478 | 216.767 | 173.6 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1437.845 | 1448.304 | 1433.908 | 1448.304 | 252.2 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.114 | 0.221 | 0.096 | 0.221 | 164.5 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.894 | 5.039 | 4.702 | 5.039 | 252.2 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.015 | 0.025 | 0.014 | 0.025 | 156.6 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.340 | 2.374 | 2.322 | 2.374 | 252.2 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 7.266 | 7.938 | 6.527 | 7.938 | 154.8 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 16.528 | 29.834 | 15.612 | 29.834 | 252.2 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 1.451 | 1.918 | 1.341 | 1.918 | 156.0 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.833 | 2.901 | 2.749 | 2.901 | 252.2 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 171.789 | 175.953 | 167.608 | 175.953 | 156.2 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1456.287 | 1522.918 | 1440.882 | 1522.918 | 252.2 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.081 | 0.170 | 0.074 | 0.170 | 156.0 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.962 | 3.013 | 2.892 | 3.013 | 252.2 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.014 | 0.025 | 0.014 | 0.025 | 155.3 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.025 | 1.031 | 1.010 | 1.031 | 252.2 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 3.338 | 3.618 | 2.949 | 3.618 | 154.2 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.088 | 8.365 | 8.053 | 8.365 | 252.2 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.374 | 1.498 | 1.322 | 1.498 | 155.0 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.830 | 2.907 | 2.777 | 2.907 | 252.2 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 140.3 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.470 | 0.687 | 0.454 | 0.687 | 252.2 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 177.672 | 223.150 | 176.217 | 223.150 | 161.3 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1619.698 | 1654.555 | 1606.947 | 1654.555 | 252.2 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 165.509 | 200.507 | 163.350 | 200.507 | 163.9 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1589.916 | 1641.784 | 1588.016 | 1641.784 | 252.2 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.110 | 1.556 | 0.672 | 1.556 | 163.9 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.076 | 3.206 | 3.036 | 3.206 | 252.2 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.092 | 0.115 | 0.085 | 0.115 | 161.3 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.510 | 0.541 | 0.493 | 0.541 | 252.2 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.485 | 3.660 | 3.243 | 3.660 | 161.3 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 21.377 | 22.824 | 21.150 | 22.824 | 252.2 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.580 | 4.333 | 3.479 | 4.333 | 158.2 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 21.713 | 23.109 | 21.127 | 23.109 | 252.2 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 5.392 | 6.577 | 4.086 | 6.577 | 157.6 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.709 | 15.862 | 15.523 | 15.862 | 252.2 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.183 | 0.196 | 0.171 | 0.196 | 157.6 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.912 | 5.040 | 4.838 | 5.040 | 252.2 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 179.084 | 190.390 | 177.663 | 190.390 | 204.2 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1606.853 | 1654.631 | 1592.916 | 1654.631 | 252.2 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 4.285 | 5.506 | 4.082 | 5.506 | 200.9 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.946 | 6.103 | 5.883 | 6.103 | 252.2 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.312 | 0.323 | 0.269 | 0.323 | 198.4 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.517 | 2.581 | 2.457 | 2.581 | 252.2 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 16.117 | 18.349 | 15.668 | 18.349 | 179.5 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 42.254 | 42.747 | 42.064 | 42.747 | 252.2 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.523 | 0.556 | 0.486 | 0.556 | 196.6 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.361 | 7.465 | 7.282 | 7.465 | 252.2 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 194.676 | 200.729 | 188.190 | 200.729 | 203.1 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1610.786 | 1665.049 | 1602.120 | 1665.049 | 252.2 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.381 | 4.931 | 4.151 | 4.931 | 203.0 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.937 | 6.202 | 5.920 | 6.202 | 252.2 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.329 | 0.351 | 0.315 | 0.351 | 203.0 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.505 | 2.554 | 2.467 | 2.554 | 252.2 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 16.584 | 18.391 | 15.317 | 18.391 | 189.4 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 42.265 | 43.442 | 42.148 | 43.442 | 252.2 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.180 | 2.250 | 2.107 | 2.250 | 201.7 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.610 | 8.812 | 8.561 | 8.812 | 252.2 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 181.237 | 191.762 | 179.160 | 191.762 | 195.1 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1611.545 | 1723.945 | 1595.596 | 1723.945 | 252.2 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.809 | 4.349 | 2.773 | 4.349 | 192.6 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.120 | 4.232 | 4.086 | 4.232 | 252.2 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.283 | 0.297 | 0.266 | 0.297 | 190.8 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.139 | 1.163 | 1.117 | 1.163 | 252.2 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 7.951 | 8.708 | 7.047 | 8.708 | 151.1 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 21.173 | 22.319 | 21.016 | 22.319 | 252.2 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 3.311 | 4.604 | 2.140 | 4.604 | 179.5 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.666 | 8.900 | 8.608 | 8.900 | 252.2 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 195.263 | 200.613 | 191.396 | 200.613 | 146.3 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1694.554 | 1743.159 | 1652.557 | 1743.159 | 252.2 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 173.491 | 201.294 | 163.705 | 201.294 | 156.1 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1613.160 | 2107.916 | 1583.440 | 2107.916 | 252.2 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.300 | 1.577 | 1.236 | 1.577 | 156.1 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.901 | 4.077 | 3.854 | 4.077 | 252.2 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.112 | 0.155 | 0.109 | 0.155 | 149.8 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.674 | 0.701 | 0.641 | 0.701 | 252.2 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.018 | 0.037 | 0.014 | 0.037 | 138.4 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.453 | 0.483 | 0.439 | 0.483 | 252.2 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.304 | 0.445 | 0.261 | 0.445 | 142.0 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.589 | 16.059 | 14.321 | 16.059 | 252.2 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.036 | 0.014 | 0.036 | 138.6 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.487 | 0.535 | 0.464 | 0.535 | 252.2 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 194.961 | 204.774 | 187.005 | 204.774 | 153.5 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1685.733 | 1801.437 | 1630.132 | 1801.437 | 252.2 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 163.568 | 171.586 | 160.820 | 171.586 | 154.1 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1624.076 | 1666.012 | 1613.905 | 1666.012 | 252.2 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.985 | 1.045 | 0.963 | 1.045 | 154.1 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 4.296 | 5.929 | 3.991 | 5.929 | 252.2 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.099 | 0.116 | 0.089 | 0.116 | 153.5 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.730 | 0.795 | 0.701 | 0.795 | 252.2 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 14.447 | 15.371 | 14.086 | 15.371 | 153.5 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 51.621 | 52.991 | 51.153 | 52.991 | 252.2 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 14.880 | 15.364 | 14.662 | 15.364 | 151.5 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 51.278 | 52.081 | 50.638 | 52.081 | 252.2 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 15.217 | 16.097 | 14.518 | 16.097 | 150.9 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 46.238 | 60.406 | 45.259 | 60.406 | 252.2 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.251 | 0.307 | 0.227 | 0.307 | 151.0 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.637 | 6.111 | 5.497 | 6.111 | 252.2 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.027 | 0.013 | 0.027 | 138.0 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.477 | 0.551 | 0.458 | 0.551 | 252.2 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 179.622 | 193.095 | 174.925 | 193.095 | 157.2 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1660.600 | 1759.383 | 1619.299 | 1759.383 | 252.2 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 178.596 | 197.671 | 159.132 | 197.671 | 157.7 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1685.392 | 1844.507 | 1602.878 | 1844.507 | 252.2 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.842 | 0.903 | 0.825 | 0.903 | 157.7 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 4.049 | 6.883 | 3.938 | 6.883 | 252.2 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.102 | 0.130 | 0.092 | 0.130 | 157.2 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.706 | 0.755 | 0.694 | 0.755 | 252.2 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.740 | 5.478 | 3.313 | 5.478 | 157.1 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.092 | 23.638 | 22.783 | 23.638 | 252.2 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.113 | 14.994 | 3.625 | 14.994 | 152.8 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 22.283 | 25.320 | 22.015 | 25.320 | 252.2 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 4.913 | 5.863 | 3.920 | 5.863 | 152.1 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 18.110 | 22.285 | 16.927 | 22.285 | 252.2 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.230 | 0.246 | 0.210 | 0.246 | 152.4 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.709 | 6.699 | 5.624 | 6.699 | 252.2 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 8.001 | 11.036 | 7.166 | 11.036 | 155.5 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 47.588 | 49.404 | 47.476 | 49.404 | 252.2 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 197.089 | 208.948 | 189.218 | 208.948 | 156.3 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1481.276 | 1531.648 | 1467.894 | 1531.648 | 252.2 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.826 | 3.593 | 2.714 | 3.593 | 155.7 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.364 | 2.033 | 1.351 | 2.033 | 252.2 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.152 | 0.208 | 0.150 | 0.208 | 129.2 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.504 | 0.529 | 0.500 | 0.529 | 252.2 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.266 | 0.305 | 0.222 | 0.305 | 155.2 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.406 | 5.818 | 5.276 | 5.818 | 252.2 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.944 | 2.315 | 1.704 | 2.315 | 136.4 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.752 | 0.802 | 0.742 | 0.802 | 252.2 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.528 | 8.822 | 6.220 | 8.822 | 154.5 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 38.305 | 38.506 | 38.184 | 38.506 | 252.2 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 8.640 | 9.037 | 7.182 | 9.037 | 158.7 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 59.707 | 66.259 | 59.305 | 66.259 | 252.2 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 194.753 | 228.128 | 190.290 | 228.128 | 156.2 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1466.318 | 1510.497 | 1464.153 | 1510.497 | 252.2 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.255 | 1.701 | 1.250 | 1.701 | 156.2 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.463 | 1.508 | 1.419 | 1.508 | 252.2 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.066 | 0.088 | 0.062 | 0.088 | 125.9 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.397 | 0.469 | 0.392 | 0.469 | 252.2 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.235 | 0.379 | 0.216 | 0.379 | 155.6 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.433 | 5.490 | 5.391 | 5.490 | 252.2 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.535 | 1.851 | 1.502 | 1.851 | 131.6 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.733 | 0.755 | 0.726 | 0.755 | 252.2 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 6.582 | 7.303 | 6.485 | 7.303 | 154.7 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 46.676 | 48.131 | 46.126 | 48.131 | 252.2 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.175 | 2.252 | 2.173 | 2.252 | 160.5 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.153 | 13.349 | 13.124 | 13.349 | 252.2 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.316 | 0.422 | 0.298 | 0.422 | 165.3 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.005 | 0.006 | 252.2 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.234 | 0.244 | 0.220 | 0.244 | 161.8 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 252.2 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.903 | 14.314 | 12.619 | 14.314 | 159.0 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 144.651 | 162.693 | 142.240 | 162.693 | 252.2 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.074 | 0.086 | 0.073 | 0.086 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.656 | 0.729 | 0.653 | 0.729 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 184.669 | 198.043 | 180.414 | 198.043 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1446.140 | 1481.784 | 1441.299 | 1481.784 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 172.194 | 181.205 | 164.971 | 181.205 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1459.996 | 1543.173 | 1456.587 | 1543.173 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.124 | 0.166 | 0.122 | 0.166 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 3.889 | 4.095 | 3.797 | 4.095 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.028 | 0.042 | 0.027 | 0.042 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.856 | 0.902 | 0.819 | 0.902 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.969 | 2.805 | 1.955 | 2.805 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.465 | 14.862 | 14.337 | 14.862 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.498 | 3.199 | 2.295 | 3.199 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 13.893 | 14.091 | 13.845 | 14.091 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.261 | 4.224 | 2.115 | 4.224 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 9.023 | 12.940 | 8.991 | 12.940 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.466 | 1.134 | 0.465 | 1.134 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.683 | 4.842 | 4.638 | 4.842 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.072 | 0.078 | 0.046 | 0.078 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.496 | 0.515 | 0.493 | 0.515 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 181.595 | 198.458 | 177.845 | 198.458 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1459.749 | 1495.979 | 1424.523 | 1495.979 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 161.873 | 184.113 | 158.982 | 184.113 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1443.590 | 1469.619 | 1441.066 | 1469.619 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.169 | 0.254 | 0.164 | 0.254 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.648 | 4.681 | 3.499 | 4.681 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.029 | 0.040 | 0.026 | 0.040 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.658 | 0.735 | 0.639 | 0.735 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.798 | 5.099 | 4.774 | 5.099 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.575 | 27.788 | 27.460 | 27.788 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.791 | 5.370 | 4.789 | 5.370 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 27.016 | 27.317 | 26.904 | 27.317 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 5.063 | 16.882 | 4.841 | 16.882 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 22.238 | 24.659 | 22.135 | 24.659 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.424 | 0.704 | 0.420 | 0.704 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.635 | 4.671 | 4.633 | 4.671 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.293 | 164.653 | 159.046 | 164.653 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1423.359 | 1461.775 | 1421.629 | 1461.775 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.102 | 0.136 | 0.102 | 0.136 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.071 | 2.110 | 2.048 | 2.110 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.063 | 0.017 | 0.063 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.402 | 0.418 | 0.402 | 0.418 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.288 | 1.437 | 1.263 | 1.437 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.044 | 3.239 | 3.002 | 3.239 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.204 | 0.232 | 0.194 | 0.232 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.666 | 2.775 | 2.638 | 2.775 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.854 | 164.739 | 159.046 | 164.739 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1414.347 | 1434.988 | 1412.281 | 1434.988 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.121 | 0.127 | 0.102 | 0.127 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.052 | 2.104 | 2.046 | 2.104 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.046 | 0.017 | 0.046 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.400 | 0.407 | 0.399 | 0.407 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.262 | 2.613 | 1.213 | 2.613 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.013 | 3.148 | 3.004 | 3.148 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.224 | 0.230 | 0.200 | 0.230 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.643 | 2.681 | 2.595 | 2.681 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.103 | 0.111 | 0.089 | 0.111 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.933 | 0.979 | 0.922 | 0.979 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 186.936 | 200.822 | 185.189 | 200.822 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1464.831 | 1486.334 | 1435.104 | 1486.334 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 168.786 | 171.168 | 167.486 | 171.168 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1439.887 | 1477.762 | 1438.013 | 1477.762 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.167 | 0.190 | 0.152 | 0.190 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.604 | 3.706 | 3.584 | 3.706 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.026 | 0.041 | 0.021 | 0.041 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.216 | 1.245 | 1.202 | 1.245 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 6.886 | 7.516 | 6.166 | 7.516 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 31.681 | 36.593 | 31.183 | 36.593 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 5.271 | 8.638 | 5.175 | 8.638 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 29.437 | 32.099 | 29.304 | 32.099 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 4.772 | 5.178 | 4.648 | 5.178 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 25.126 | 31.334 | 24.863 | 31.334 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.927 | 1.032 | 0.899 | 1.032 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.395 | 5.058 | 4.382 | 5.058 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.022 | 0.036 | 0.019 | 0.036 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.491 | 0.640 | 0.476 | 0.640 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 173.764 | 188.711 | 170.968 | 188.711 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1477.637 | 1683.939 | 1464.677 | 1683.939 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 160.179 | 187.977 | 156.122 | 187.977 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1459.112 | 1509.979 | 1421.523 | 1509.979 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.095 | 0.168 | 0.086 | 0.168 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.239 | 2.541 | 2.154 | 2.541 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.025 | 0.041 | 0.020 | 0.041 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.460 | 0.503 | 0.443 | 0.503 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.403 | 1.899 | 1.349 | 1.899 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.401 | 15.764 | 12.349 | 15.764 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.884 | 2.023 | 1.756 | 2.023 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 17.246 | 29.995 | 13.631 | 29.995 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.804 | 5.424 | 1.503 | 5.424 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 8.949 | 11.879 | 8.443 | 11.879 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.217 | 0.505 | 0.200 | 0.505 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 2.990 | 4.414 | 2.945 | 4.414 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.031 | 0.015 | 0.031 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.457 | 0.509 | 0.435 | 0.509 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 172.820 | 179.367 | 170.877 | 179.367 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1455.037 | 1513.434 | 1430.506 | 1513.434 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 162.164 | 168.213 | 157.343 | 168.213 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1414.059 | 1479.501 | 1408.137 | 1479.501 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.113 | 0.279 | 0.088 | 0.279 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.200 | 2.428 | 2.083 | 2.428 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.029 | 0.070 | 0.026 | 0.070 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.441 | 0.501 | 0.432 | 0.501 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.456 | 1.540 | 1.432 | 1.540 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.805 | 15.495 | 12.137 | 15.495 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.966 | 2.207 | 1.801 | 2.207 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 11.585 | 11.690 | 11.534 | 11.690 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 2.178 | 7.065 | 1.491 | 7.065 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 8.944 | 9.296 | 8.719 | 9.296 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.271 | 0.346 | 0.242 | 0.346 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.088 | 3.169 | 3.041 | 3.169 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.032 | 0.015 | 0.032 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.500 | 1.049 | 0.494 | 1.049 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 300.356 | 321.028 | 291.248 | 321.028 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1814.106 | 1856.238 | 1798.820 | 1856.238 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 161.064 | 165.201 | 156.756 | 165.201 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1441.282 | 1494.104 | 1413.089 | 1494.104 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.149 | 0.267 | 0.083 | 0.267 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.155 | 2.327 | 2.092 | 2.327 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.038 | 0.060 | 0.029 | 0.060 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.482 | 0.501 | 0.448 | 0.501 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 104.021 | 104.473 | 103.206 | 104.473 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 392.356 | 400.534 | 388.294 | 400.534 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 104.757 | 108.108 | 104.156 | 108.108 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 399.711 | 403.091 | 391.027 | 403.091 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 103.941 | 106.004 | 103.510 | 106.004 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 389.495 | 395.347 | 387.512 | 395.347 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.217 | 0.362 | 0.203 | 0.362 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.051 | 3.178 | 3.012 | 3.178 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.728 | 166.779 | 157.397 | 166.779 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1441.178 | 1460.565 | 1415.479 | 1460.565 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.120 | 0.169 | 0.102 | 0.169 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.108 | 2.158 | 2.055 | 2.158 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.027 | 0.016 | 0.027 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.442 | 0.464 | 0.431 | 0.464 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 2.077 | 2.831 | 1.987 | 2.831 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.080 | 7.657 | 7.033 | 7.657 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.239 | 0.244 | 0.208 | 0.244 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.710 | 2.768 | 2.691 | 2.768 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.251 | 168.277 | 157.142 | 168.277 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1418.586 | 1452.168 | 1414.648 | 1452.168 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.104 | 0.135 | 0.099 | 0.135 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.038 | 2.067 | 1.991 | 2.067 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.030 | 0.017 | 0.030 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.418 | 0.494 | 0.411 | 0.494 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.906 | 4.349 | 3.866 | 4.349 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 19.649 | 19.949 | 19.156 | 19.949 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.207 | 0.222 | 0.192 | 0.222 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.617 | 2.689 | 2.597 | 2.689 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.067 | 0.070 | 0.059 | 0.070 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.505 | 0.577 | 0.477 | 0.577 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 179.728 | 190.799 | 177.610 | 190.799 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1478.842 | 1549.140 | 1474.608 | 1549.140 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 167.437 | 199.564 | 157.356 | 199.564 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1437.515 | 1527.943 | 1417.412 | 1527.943 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.182 | 0.216 | 0.143 | 0.216 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.612 | 3.843 | 3.606 | 3.843 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.030 | 0.094 | 0.026 | 0.094 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.662 | 0.674 | 0.656 | 0.674 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.138 | 3.732 | 2.960 | 3.732 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 50.450 | 51.081 | 48.815 | 51.081 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.127 | 3.416 | 3.042 | 3.416 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 49.593 | 52.802 | 48.456 | 52.802 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 3.218 | 3.674 | 3.084 | 3.674 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 45.124 | 51.123 | 45.044 | 51.123 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.408 | 1.646 | 0.406 | 1.646 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 6.746 | 8.121 | 5.177 | 8.121 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 179.943 | 197.436 | 164.780 | 197.436 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1508.926 | 1590.887 | 1455.998 | 1590.887 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.217 | 0.271 | 0.212 | 0.271 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 5.280 | 10.920 | 4.237 | 10.920 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.036 | 0.022 | 0.036 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.616 | 0.745 | 0.616 | 0.745 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 2.261 | 8.437 | 1.513 | 8.437 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 9.807 | 12.526 | 8.256 | 12.526 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.392 | 0.661 | 0.387 | 0.661 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 5.420 | 6.931 | 5.374 | 6.931 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 173.288 | 200.660 | 173.024 | 200.660 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1421.550 | 1443.916 | 1416.974 | 1443.916 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.183 | 0.230 | 0.172 | 0.230 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.904 | 4.088 | 3.856 | 4.088 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.033 | 0.019 | 0.033 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.803 | 0.832 | 0.773 | 0.832 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 4.097 | 4.796 | 3.595 | 4.796 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.170 | 9.773 | 9.046 | 9.773 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.519 | 0.625 | 0.478 | 0.625 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.898 | 5.046 | 4.803 | 5.046 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.078 | 0.141 | 0.077 | 0.141 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.647 | 0.849 | 0.626 | 0.849 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 181.143 | 214.189 | 176.407 | 214.189 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1532.282 | 1717.056 | 1442.064 | 1717.056 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 187.042 | 197.176 | 172.858 | 197.176 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1504.628 | 1515.021 | 1502.855 | 1515.021 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.207 | 0.268 | 0.202 | 0.268 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 4.185 | 4.711 | 3.979 | 4.711 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.032 | 0.025 | 0.032 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.848 | 0.903 | 0.842 | 0.903 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.485 | 3.377 | 1.996 | 3.377 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 15.084 | 16.088 | 15.018 | 16.088 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.556 | 3.986 | 2.218 | 3.986 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 13.732 | 17.885 | 13.420 | 17.885 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 3.531 | 4.541 | 3.262 | 4.541 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.048 | 9.090 | 8.902 | 9.090 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.726 | 1.887 | 0.492 | 1.887 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.723 | 5.359 | 4.665 | 5.359 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.051 | 0.083 | 0.044 | 0.083 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.551 | 0.729 | 0.512 | 0.729 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 167.362 | 180.065 | 164.358 | 180.065 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1439.938 | 1463.145 | 1430.329 | 1463.145 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 159.249 | 164.901 | 159.089 | 164.901 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1450.880 | 1520.883 | 1427.372 | 1520.883 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.138 | 0.183 | 0.117 | 0.183 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.570 | 3.754 | 3.546 | 3.754 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.025 | 0.028 | 0.025 | 0.028 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.665 | 0.709 | 0.655 | 0.709 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.226 | 1.377 | 1.165 | 1.377 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 13.048 | 14.071 | 12.925 | 14.071 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.439 | 1.590 | 1.321 | 1.590 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.547 | 16.875 | 12.499 | 16.875 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 2.146 | 3.839 | 2.140 | 3.839 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 7.716 | 8.914 | 7.479 | 8.914 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.456 | 0.469 | 0.450 | 0.469 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.776 | 5.132 | 4.671 | 5.132 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.021 | 174.609 | 162.845 | 174.609 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1471.320 | 1553.485 | 1466.029 | 1553.485 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.117 | 0.132 | 0.103 | 0.132 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.123 | 2.717 | 2.070 | 2.717 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.022 | 0.016 | 0.022 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.507 | 0.700 | 0.447 | 0.700 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 2.199 | 3.603 | 1.856 | 3.603 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.392 | 8.277 | 7.297 | 8.277 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.215 | 0.225 | 0.203 | 0.225 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.646 | 3.138 | 2.631 | 3.138 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 163.622 | 177.843 | 161.582 | 177.843 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1457.555 | 1475.747 | 1442.085 | 1475.747 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.111 | 0.140 | 0.110 | 0.140 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.097 | 2.179 | 2.014 | 2.179 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.029 | 0.017 | 0.029 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.413 | 0.434 | 0.402 | 0.434 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 4.056 | 4.340 | 3.972 | 4.340 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 20.795 | 22.651 | 20.312 | 22.651 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.226 | 0.245 | 0.199 | 0.245 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.668 | 2.739 | 2.653 | 2.739 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 170.920 | 180.409 | 163.624 | 180.409 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1437.745 | 1509.199 | 1436.532 | 1509.199 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.206 | 0.294 | 0.200 | 0.294 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.813 | 3.870 | 3.802 | 3.870 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.032 | 0.019 | 0.032 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.790 | 0.818 | 0.775 | 0.818 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 3.868 | 4.162 | 3.224 | 4.162 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.760 | 8.968 | 8.621 | 8.968 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.147 | 0.198 | 0.144 | 0.198 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.700 | 4.983 | 4.681 | 4.983 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.613 | 171.809 | 160.970 | 171.809 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1488.175 | 1544.228 | 1458.537 | 1544.228 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.201 | 0.228 | 0.196 | 0.228 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.791 | 3.861 | 3.783 | 3.861 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.029 | 0.018 | 0.029 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.798 | 0.811 | 0.791 | 0.811 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.239 | 3.859 | 3.079 | 3.859 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 8.900 | 8.964 | 8.710 | 8.964 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.154 | 0.166 | 0.148 | 0.166 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.681 | 4.764 | 4.671 | 4.764 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 168.145 | 172.888 | 166.556 | 172.888 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1468.133 | 1514.881 | 1436.050 | 1514.881 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.201 | 0.209 | 0.186 | 0.209 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.843 | 4.597 | 3.800 | 4.597 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.025 | 0.020 | 0.025 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.797 | 0.853 | 0.786 | 0.853 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.613 | 3.943 | 3.067 | 3.943 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 9.133 | 11.524 | 8.882 | 11.524 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.143 | 0.155 | 0.131 | 0.155 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.751 | 5.177 | 4.736 | 5.177 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 168.069 | 176.897 | 165.006 | 176.897 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1451.805 | 1488.099 | 1448.659 | 1488.099 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.185 | 0.200 | 0.182 | 0.200 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.873 | 4.104 | 3.793 | 4.104 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.016 | 0.022 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.790 | 0.829 | 0.786 | 0.829 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.277 | 3.985 | 3.188 | 3.985 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 9.134 | 10.202 | 9.131 | 10.202 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.171 | 0.187 | 0.161 | 0.187 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.755 | 4.818 | 4.678 | 4.818 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.864 | 169.866 | 157.858 | 169.866 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1424.529 | 1463.276 | 1411.239 | 1463.276 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.224 | 0.247 | 0.215 | 0.247 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.526 | 3.636 | 3.521 | 3.636 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.032 | 0.020 | 0.032 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.612 | 0.642 | 0.610 | 0.642 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.844 | 3.185 | 1.834 | 3.185 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.375 | 8.840 | 7.232 | 8.840 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.167 | 0.177 | 0.165 | 0.177 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.623 | 4.765 | 4.612 | 4.765 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.577 | 164.324 | 158.702 | 164.324 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1640.813 | 1766.740 | 1530.602 | 1766.740 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.237 | 1.421 | 0.210 | 1.421 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.668 | 5.819 | 3.662 | 5.819 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.019 | 0.023 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.639 | 0.649 | 0.625 | 0.649 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 2.067 | 3.397 | 2.010 | 3.397 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 8.012 | 10.973 | 7.413 | 10.973 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.165 | 0.184 | 0.162 | 0.184 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.735 | 5.208 | 4.666 | 5.208 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.072 | 164.433 | 159.735 | 164.433 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1514.326 | 1579.322 | 1478.440 | 1579.322 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.237 | 0.261 | 0.223 | 0.261 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.620 | 3.723 | 3.595 | 3.723 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.025 | 0.021 | 0.025 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.631 | 0.646 | 0.622 | 0.646 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 3.139 | 4.013 | 1.947 | 4.013 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 7.541 | 8.077 | 7.327 | 8.077 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.171 | 0.240 | 0.161 | 0.240 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.684 | 4.875 | 4.582 | 4.875 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 164.853 | 166.906 | 159.353 | 166.906 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1449.589 | 1681.464 | 1443.116 | 1681.464 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.232 | 0.267 | 0.220 | 0.267 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.729 | 3.857 | 3.685 | 3.857 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.032 | 0.019 | 0.032 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.648 | 0.695 | 0.636 | 0.695 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 2.045 | 6.509 | 1.944 | 6.509 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 8.496 | 9.699 | 7.467 | 9.699 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.163 | 0.170 | 0.161 | 0.170 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.760 | 4.921 | 4.734 | 4.921 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.740 | 166.902 | 156.828 | 166.902 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1419.052 | 1484.138 | 1410.714 | 1484.138 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.224 | 0.242 | 0.214 | 0.242 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.611 | 3.674 | 3.596 | 3.674 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.024 | 0.021 | 0.024 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.644 | 0.656 | 0.643 | 0.656 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.353 | 3.448 | 2.238 | 3.448 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.374 | 8.193 | 7.359 | 8.193 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.171 | 0.182 | 0.170 | 0.182 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.697 | 4.715 | 4.628 | 4.715 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.794 | 164.127 | 156.882 | 164.127 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1440.782 | 1447.184 | 1415.231 | 1447.184 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.227 | 0.248 | 0.211 | 0.248 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.700 | 5.851 | 3.567 | 5.851 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.021 | 0.028 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.655 | 1.549 | 0.632 | 1.549 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.498 | 5.093 | 1.519 | 5.093 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 7.623 | 8.418 | 7.573 | 8.418 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.168 | 0.188 | 0.164 | 0.188 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.763 | 9.867 | 4.622 | 9.867 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.352 | 182.788 | 160.904 | 182.788 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1431.976 | 1461.184 | 1417.214 | 1461.184 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.246 | 0.301 | 0.204 | 0.301 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.205 | 2.416 | 2.173 | 2.416 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.040 | 0.020 | 0.040 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.442 | 0.487 | 0.439 | 0.487 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 150.261 | 151.294 | 150.134 | 151.294 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 615.336 | 626.433 | 607.115 | 626.433 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.275 | 0.332 | 0.223 | 0.332 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.035 | 3.093 | 2.977 | 3.093 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 187.940 | 194.569 | 171.001 | 194.569 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1408.616 | 1446.070 | 1403.476 | 1446.070 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.199 | 0.275 | 0.196 | 0.275 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.115 | 2.144 | 2.100 | 2.144 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.112 | 0.021 | 0.112 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.437 | 0.482 | 0.426 | 0.482 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 5.072 | 5.381 | 4.671 | 5.381 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 20.006 | 20.225 | 19.846 | 20.225 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.249 | 0.277 | 0.237 | 0.277 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.064 | 3.307 | 3.008 | 3.307 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 190.607 | 197.782 | 173.917 | 197.782 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1405.822 | 1451.666 | 1405.341 | 1451.666 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.175 | 0.257 | 0.155 | 0.257 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.920 | 1.935 | 1.850 | 1.935 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.031 | 0.035 | 0.022 | 0.035 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.332 | 0.343 | 0.317 | 0.343 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.763 | 0.997 | 0.720 | 0.997 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.889 | 3.053 | 2.802 | 3.053 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.232 | 0.277 | 0.227 | 0.277 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.633 | 2.714 | 2.575 | 2.714 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 158.660 | 172.997 | 157.148 | 172.997 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1419.947 | 1442.311 | 1409.882 | 1442.311 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.168 | 0.203 | 0.158 | 0.203 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.869 | 1.956 | 1.843 | 1.956 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.040 | 0.183 | 0.021 | 0.183 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.345 | 0.373 | 0.340 | 0.373 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.986 | 1.234 | 0.863 | 1.234 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.496 | 5.861 | 5.452 | 5.861 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.165 | 0.337 | 0.163 | 0.337 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.673 | 2.723 | 2.636 | 2.723 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 322.307 | 387.454 | 295.928 | 387.454 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1946.860 | 1994.727 | 1936.071 | 1994.727 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 211.735 | 225.197 | 182.576 | 225.197 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1568.608 | 1581.778 | 1545.788 | 1581.778 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.219 | 0.326 | 0.188 | 0.326 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.105 | 2.219 | 2.082 | 2.219 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.029 | 0.069 | 0.020 | 0.069 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.467 | 0.497 | 0.420 | 0.497 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.031 | 0.091 | 0.027 | 0.091 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.489 | 0.541 | 0.474 | 0.541 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.552 | 5.159 | 4.297 | 5.159 | 141.3 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 122.017 | 178.842 | 120.817 | 178.842 | 252.2 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 177.649 | 217.260 | 175.706 | 217.260 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1552.533 | 1557.950 | 1509.106 | 1557.950 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 170.448 | 186.081 | 169.841 | 186.081 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1555.268 | 1564.991 | 1504.645 | 1564.991 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.263 | 0.665 | 0.220 | 0.665 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.613 | 4.002 | 3.536 | 4.002 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.026 | 0.034 | 0.022 | 0.034 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.673 | 0.815 | 0.668 | 0.815 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.083 | 0.044 | 0.083 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.524 | 0.555 | 0.518 | 0.555 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.053 | 2.827 | 0.785 | 2.827 | 138.9 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 72.004 | 75.207 | 71.239 | 75.207 | 252.2 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 189.393 | 215.276 | 181.003 | 215.276 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1478.049 | 1791.766 | 1459.895 | 1791.766 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 172.778 | 216.055 | 170.136 | 216.055 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1442.575 | 1463.691 | 1435.371 | 1463.691 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.223 | 0.262 | 0.169 | 0.262 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.890 | 4.294 | 3.789 | 4.294 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.020 | 0.041 | 0.017 | 0.041 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.852 | 0.907 | 0.825 | 0.907 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.074 | 0.082 | 0.041 | 0.082 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.642 | 0.660 | 0.637 | 0.660 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 1.432 | 2.704 | 1.377 | 2.704 | 154.8 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 20.065 | 33.517 | 19.577 | 33.517 | 252.2 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `bc4f2208715745367a9d8a2b9708bfefd1a48b2d`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-flat-additive`, `country-explicit-us-flat-additive`, `country-us-flat-multiplicative`, `country-explicit-us-flat-multiplicative`, `country-boundary-flat`, `country-empty-bv-flat`, `country-explicit-empty-flat`, `country-estimated-sg-flat`, `country-partial-in-flat`, `country-mixed-us-flat`, `country-none-flat-730`, `country-se-flat-730`, `country-explicit-se-flat-730`, `country-cn-flat-730`, `country-explicit-cn-flat-730`, `country-none-flat-2190`, `country-se-flat-2190`, `country-explicit-se-flat-2190`, `country-cn-flat-2190`, `country-explicit-cn-flat-2190`, `country-none-flat-2190-batch-32`, `country-se-flat-2190-batch-32`, `country-explicit-se-flat-2190-batch-32`, `country-uncertainty-us-flat`, `map-training-zero-span-flat-varied`, `map-training-zero-span-flat-constant`, `flat-mixed-components`, `flat-mixed-components-large`, `uncertainty-flat-defaults-seasonal-intervals-1000`, `uncertainty-flat-mixed-components-full-intervals-512`, `uncertainty-flat-mixed-components-large-full-samples-128`, `evaluation-flat-mixed-point`, `evaluation-flat-mixed-intervals`, `evaluation-flat-mixed-search`, `evaluation-flat-large-point`, `evaluation-flat-large-intervals`, `flat-defaults-level`, `flat-defaults-seasonal`, `flat-defaults-negative`, `flat-level-absmax`, `flat-level-minmax`, `flat-constant-absmax`, `flat-constant-minmax`, `flat-negative-absmax`, `flat-negative-minmax`, `flat-seasonal-absmax`, `flat-seasonal-minmax`, `flat-prefix-63-absmax`, `flat-prefix-63-minmax`, `flat-prefix-70-absmax`, `flat-prefix-70-minmax`, `flat-prefix-77-absmax`, `flat-prefix-77-minmax`, `flat-mixed-components-absmax`, `flat-prefix-225-absmax`, `flat-prefix-225-minmax`, `flat-prefix-232-absmax`, `flat-prefix-232-minmax`, `flat-mixed-components-large-absmax`, `flat-additive-components`, `flat-additive-components-large`, `flat-mixed-components-absmax-defaults`, `flat-correlated-regressors`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:975ae3983e38742e93445bba7316ee6a34d905ddcc8a10497adfca866ba8a718`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:6184e1c348bfdcb4cf50766f9b542337ea93ca6d7afd631db59651cf65ec0ee2`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.0`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
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

