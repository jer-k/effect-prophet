# Effect Prophet benchmark — 2026-10-20T030119-668Z-7835012b

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
| flat-correlated-regressors | equivalent-objective | passed | 2.255e-11 | 1.948e-12 | 5.112e-12 | 2.765e-11 | 2.945e-13 | n/a | Verified equivalent behavior for this configuration under evidence flat-map-additive-v1. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-flat-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 12 | 12254 | 25351 |
| country-us-flat-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 12 | 12254 | 25351 |
| country-explicit-us-flat-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 12 | 3535 | 28167 |
| country-explicit-us-flat-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 12 | 3535 | 28167 |
| country-us-flat-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 12 | 12276 | 25372 |
| country-us-flat-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 12 | 12276 | 25372 |
| country-explicit-us-flat-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 12 | 3545 | 28188 |
| country-explicit-us-flat-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 12 | 3545 | 28188 |
| country-boundary-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2010 | 13 | 11509 | 25601 |
| country-boundary-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2010 | 13 | 11509 | 25601 |
| country-empty-bv-flat | 0 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 0 | 2904 | 19084 |
| country-empty-bv-flat | 1 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 0 | 2904 | 19084 |
| country-explicit-empty-flat | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 0 | 570 | 19084 |
| country-explicit-empty-flat | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 0 | 570 | 19084 |
| country-estimated-sg-flat | 0 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 11 | 13181 | 23312 |
| country-estimated-sg-flat | 1 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 11 | 13181 | 23312 |
| country-partial-in-flat | 0 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2036 | 10 | 16613 | 23664 |
| country-partial-in-flat | 1 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2036 | 10 | 16613 | 23664 |
| country-mixed-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 12 | 12579 | 31303 |
| country-mixed-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 12 | 12579 | 31303 |
| country-none-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 0 | 586 | 122498 |
| country-none-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 0 | 586 | 122498 |
| country-se-flat-730 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-se-flat-730 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2020, 2021 | 14 | 60774 | 128630 |
| country-explicit-se-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 14 | 25756 | 159826 |
| country-explicit-se-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 14 | 25756 | 159826 |
| country-cn-flat-730 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-cn-flat-730 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2020, 2021 | 26 | 28795 | 154918 |
| country-explicit-cn-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 26 | 10007 | 165955 |
| country-explicit-cn-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 26 | 10007 | 165955 |
| country-none-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 14 | 50561 | 430748 |
| country-explicit-se-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 14 | 50561 | 430748 |
| country-cn-flat-2190 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-cn-flat-2190 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39073 | 511187 |
| country-explicit-cn-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 56 | 21026 | 534811 |
| country-explicit-cn-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 56 | 21026 | 534811 |
| country-none-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 0 | 600 | 362647 |
| country-none-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 0 | 600 | 362647 |
| country-se-flat-2190-batch-32 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-se-flat-2190-batch-32 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85693 | 368788 |
| country-explicit-se-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 14 | 44365 | 423057 |
| country-explicit-se-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | false | n/a | 14 | 44365 | 423057 |
| country-uncertainty-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 12 | 12254 | 25351 |
| country-uncertainty-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:a164d63f6d89813d3d28c19a1390af4acde19bafd396dac2c7f90e5cede5605b | true | 2024 | 12 | 12254 | 25351 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| country-uncertainty-us-flat | 96 | 12 | 0 | 4 | 4 | 275 | 32 | intervals | 67108864 | country-v5:country-basic-96:level+jan1(3)+jan5(1.4)+bounded-noise:n=96:future=4:year=2024 / 9ff002c94ecdaa2f78ad32094f4af7cf5cbbe377f19cfdb5b3100e29005151f8 | docs/validation/uncertainty.md#evidence-classes |
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
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.034 | 0.014 | 0.034 | 141.0 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.441 | 0.462 | 0.427 | 0.462 | 252.6 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 209.911 | 259.862 | 200.199 | 259.862 | 161.1 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1661.646 | 1755.901 | 1632.269 | 1755.901 | 252.6 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 171.618 | 206.677 | 158.588 | 206.677 | 161.7 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1648.775 | 2336.709 | 1575.319 | 2336.709 | 252.6 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.881 | 3.175 | 0.806 | 3.175 | 161.6 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.284 | 3.451 | 3.227 | 3.451 | 252.6 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.097 | 0.113 | 0.093 | 0.113 | 161.1 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.517 | 0.542 | 0.498 | 0.542 | 252.6 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 22.005 | 26.471 | 21.415 | 26.471 | 161.1 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 73.897 | 74.545 | 72.466 | 74.545 | 252.6 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 22.052 | 29.052 | 21.688 | 29.052 | 160.3 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 74.164 | 89.177 | 72.632 | 89.177 | 252.6 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 23.492 | 28.762 | 23.369 | 28.762 | 157.7 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 67.396 | 68.906 | 66.919 | 68.906 | 252.6 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.243 | 0.262 | 0.238 | 0.262 | 157.7 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.471 | 6.086 | 5.426 | 6.086 | 252.6 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 191.288 | 257.030 | 187.655 | 257.030 | 227.9 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1669.980 | 1757.401 | 1658.591 | 1757.401 | 252.6 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.840 | 2.900 | 2.800 | 2.900 | 227.8 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.283 | 9.793 | 9.182 | 9.793 | 252.6 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.282 | 0.316 | 0.279 | 0.316 | 227.7 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.086 | 3.205 | 3.047 | 3.205 | 252.6 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 22.117 | 35.928 | 20.684 | 35.928 | 208.8 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 84.683 | 87.020 | 84.073 | 87.020 | 252.6 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 4.434 | 4.726 | 3.655 | 4.726 | 225.1 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.179 | 9.532 | 8.867 | 9.532 | 252.6 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 178.192 | 194.858 | 171.918 | 194.858 | 200.1 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1664.803 | 1740.008 | 1639.402 | 1740.008 | 252.6 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.698 | 3.213 | 1.674 | 3.213 | 197.4 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.558 | 6.792 | 5.178 | 6.792 | 252.6 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.140 | 0.161 | 0.106 | 0.161 | 186.0 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.288 | 1.392 | 1.252 | 1.392 | 252.6 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 7.412 | 9.527 | 7.082 | 9.527 | 155.1 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 25.652 | 27.341 | 25.384 | 27.341 | 252.6 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.713 | 4.370 | 2.421 | 4.370 | 171.0 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 7.289 | 7.756 | 7.042 | 7.756 | 252.6 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.019 | 0.014 | 0.019 | 132.5 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.511 | 0.560 | 0.482 | 0.560 | 252.6 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 170.287 | 182.354 | 166.254 | 182.354 | 152.3 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1875.435 | 1963.073 | 1785.259 | 1963.073 | 252.6 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 159.194 | 192.365 | 155.575 | 192.365 | 152.7 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1676.826 | 1941.063 | 1653.582 | 1941.063 | 252.6 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.179 | 0.242 | 0.167 | 0.242 | 152.7 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.243 | 3.024 | 2.145 | 3.024 | 252.6 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.039 | 0.060 | 0.030 | 0.060 | 152.3 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.490 | 0.523 | 0.453 | 0.523 | 252.6 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.473 | 1.656 | 1.435 | 1.656 | 152.2 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 16.909 | 22.376 | 15.524 | 22.376 | 252.6 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.738 | 3.725 | 1.509 | 3.725 | 152.1 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 15.537 | 16.716 | 15.139 | 16.716 | 252.6 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 2.358 | 3.567 | 2.012 | 3.567 | 142.2 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 12.557 | 13.751 | 11.015 | 13.751 | 252.6 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.194 | 0.220 | 0.179 | 0.220 | 145.0 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.447 | 4.687 | 3.276 | 4.687 | 252.6 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.062 | 0.066 | 0.031 | 0.066 | 140.5 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.628 | 0.659 | 0.601 | 0.659 | 252.6 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 203.422 | 212.766 | 196.405 | 212.766 | 176.1 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1673.148 | 1790.879 | 1637.099 | 1790.879 | 252.6 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 176.033 | 195.906 | 164.389 | 195.906 | 189.1 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1579.430 | 1662.064 | 1576.019 | 1662.064 | 252.6 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 1.117 | 1.189 | 0.984 | 1.189 | 181.5 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.209 | 3.962 | 3.091 | 3.962 | 252.6 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.085 | 0.117 | 0.083 | 0.117 | 177.7 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.531 | 0.588 | 0.516 | 0.588 | 252.6 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 20.194 | 21.510 | 19.769 | 21.510 | 168.3 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 70.432 | 82.113 | 69.556 | 82.113 | 252.6 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 20.763 | 21.189 | 20.146 | 21.189 | 161.2 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 69.584 | 73.973 | 68.683 | 73.973 | 252.6 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 19.387 | 19.987 | 19.018 | 19.987 | 148.6 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 63.764 | 66.614 | 62.830 | 66.614 | 252.6 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.639 | 2.947 | 1.486 | 2.947 | 156.0 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.313 | 6.808 | 5.189 | 6.808 | 252.6 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 178.278 | 194.863 | 177.370 | 194.863 | 240.6 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1513.979 | 1797.280 | 1469.600 | 1797.280 | 252.6 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.736 | 2.558 | 1.602 | 2.558 | 240.6 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 10.953 | 17.870 | 10.786 | 17.870 | 252.6 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.033 | 0.050 | 0.027 | 0.050 | 233.2 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.394 | 7.466 | 3.373 | 7.466 | 252.6 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 22.072 | 27.446 | 19.719 | 27.446 | 208.9 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 83.535 | 100.619 | 80.455 | 100.619 | 252.6 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.618 | 4.014 | 3.513 | 4.014 | 226.2 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 10.894 | 18.060 | 10.058 | 18.060 | 252.6 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 181.582 | 202.451 | 172.511 | 202.451 | 200.9 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1518.157 | 1576.312 | 1454.927 | 1576.312 | 252.6 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.367 | 1.412 | 1.298 | 1.412 | 197.9 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 6.067 | 6.217 | 5.860 | 6.217 | 252.6 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.023 | 0.034 | 0.022 | 0.034 | 180.4 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.493 | 1.541 | 1.486 | 1.541 | 252.6 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 6.515 | 6.972 | 5.516 | 6.972 | 154.5 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 23.035 | 26.024 | 22.950 | 26.024 | 252.6 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.986 | 3.556 | 2.437 | 3.556 | 165.6 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 8.046 | 25.166 | 6.874 | 25.166 | 252.6 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.014 | 0.016 | 135.7 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.477 | 0.510 | 0.457 | 0.510 | 252.6 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 172.206 | 186.039 | 165.865 | 186.039 | 157.4 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1495.231 | 1540.636 | 1455.088 | 1540.636 | 252.6 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 156.453 | 170.272 | 154.896 | 170.272 | 157.7 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1457.342 | 1677.051 | 1443.966 | 1677.051 | 252.6 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.094 | 0.111 | 0.089 | 0.111 | 157.5 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 2.108 | 2.577 | 2.071 | 2.577 | 252.6 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.016 | 0.027 | 0.013 | 0.027 | 157.4 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.475 | 0.577 | 0.434 | 0.577 | 252.6 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.433 | 2.708 | 1.326 | 2.708 | 157.4 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 12.033 | 15.732 | 11.625 | 15.732 | 252.6 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 1.493 | 2.478 | 1.376 | 2.478 | 149.0 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 11.863 | 14.059 | 11.244 | 14.059 | 252.6 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 2.107 | 4.397 | 1.426 | 4.397 | 144.5 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 8.969 | 11.238 | 8.694 | 11.238 | 252.6 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.139 | 0.266 | 0.121 | 0.266 | 145.4 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.798 | 3.525 | 2.731 | 3.525 | 252.6 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 178.562 | 200.363 | 176.121 | 200.363 | 196.9 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1554.539 | 1613.431 | 1522.404 | 1613.431 | 252.6 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.557 | 2.669 | 2.483 | 2.669 | 195.4 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.570 | 8.191 | 7.336 | 8.191 | 252.6 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.059 | 0.075 | 0.047 | 0.075 | 179.8 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.929 | 2.982 | 2.874 | 2.982 | 252.6 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 12.161 | 13.855 | 11.319 | 13.855 | 159.3 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 41.889 | 61.212 | 40.966 | 61.212 | 252.6 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.390 | 0.672 | 0.373 | 0.672 | 166.7 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 12.531 | 13.067 | 12.238 | 13.067 | 252.6 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 184.192 | 199.101 | 181.624 | 199.101 | 207.0 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1557.674 | 1653.028 | 1506.842 | 1653.028 | 252.6 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 2.918 | 3.292 | 2.847 | 3.292 | 204.7 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.406 | 7.874 | 7.309 | 7.874 | 252.6 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.048 | 0.054 | 0.046 | 0.054 | 201.7 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.955 | 3.018 | 2.911 | 3.018 | 252.6 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 12.777 | 16.661 | 12.396 | 16.661 | 175.8 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 42.546 | 60.788 | 41.524 | 60.788 | 252.6 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.889 | 3.666 | 1.693 | 3.666 | 199.3 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.657 | 14.186 | 13.543 | 14.186 | 252.6 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 175.226 | 183.814 | 172.251 | 183.814 | 181.2 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1527.083 | 1684.460 | 1501.765 | 1684.460 | 252.6 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.366 | 2.554 | 2.279 | 2.554 | 178.6 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 6.440 | 9.834 | 5.466 | 9.834 | 252.6 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.032 | 0.037 | 0.031 | 0.037 | 162.0 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.593 | 2.052 | 1.460 | 2.052 | 252.6 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.594 | 6.678 | 5.240 | 6.678 | 156.0 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 21.538 | 24.647 | 20.360 | 24.647 | 252.6 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 2.244 | 2.516 | 1.937 | 2.516 | 160.7 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 9.451 | 10.596 | 9.023 | 10.596 | 252.6 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.027 | 0.014 | 0.027 | 137.1 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.473 | 0.501 | 0.434 | 0.501 | 252.6 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 197.784 | 215.462 | 186.139 | 215.462 | 154.6 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1461.963 | 1545.988 | 1459.275 | 1545.988 | 252.6 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 193.538 | 348.118 | 166.793 | 348.118 | 154.7 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1463.235 | 1587.514 | 1433.257 | 1587.514 | 252.6 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.450 | 0.626 | 0.429 | 0.626 | 154.7 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 4.002 | 4.158 | 3.928 | 4.158 | 252.6 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.030 | 0.046 | 0.022 | 0.046 | 154.6 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.716 | 0.787 | 0.692 | 0.787 | 252.6 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 13.088 | 14.468 | 13.002 | 14.468 | 154.4 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 47.187 | 52.049 | 47.005 | 52.049 | 252.6 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 13.232 | 14.875 | 13.077 | 14.875 | 154.4 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 46.593 | 50.188 | 46.194 | 50.188 | 252.6 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 14.624 | 26.291 | 13.483 | 26.291 | 144.9 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 42.874 | 45.227 | 41.958 | 45.227 | 252.6 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.218 | 0.355 | 0.207 | 0.355 | 147.4 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.706 | 4.833 | 4.660 | 4.833 | 252.6 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.021 | 0.014 | 0.021 | 136.4 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.457 | 0.491 | 0.444 | 0.491 | 252.6 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 175.489 | 183.839 | 169.844 | 183.839 | 154.7 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1455.733 | 1576.924 | 1422.138 | 1576.924 | 252.6 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 161.411 | 203.177 | 153.499 | 203.177 | 154.9 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1418.607 | 1474.528 | 1411.043 | 1474.528 | 252.6 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.409 | 0.459 | 0.368 | 0.459 | 154.7 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 4.484 | 5.761 | 4.048 | 5.761 | 252.6 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.021 | 0.035 | 0.018 | 0.035 | 154.7 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.761 | 1.361 | 0.725 | 1.361 | 252.6 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.570 | 2.676 | 2.554 | 2.676 | 154.5 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 18.443 | 18.995 | 18.146 | 18.995 | 252.6 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 2.713 | 2.801 | 2.641 | 2.801 | 154.5 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 17.608 | 18.787 | 17.459 | 18.787 | 252.6 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 3.259 | 3.907 | 2.981 | 3.907 | 145.4 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.065 | 13.513 | 12.992 | 13.513 | 252.6 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.195 | 0.213 | 0.172 | 0.213 | 147.7 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.664 | 4.807 | 4.648 | 4.807 | 252.6 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.034 | 0.056 | 0.025 | 0.056 | 142.6 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.518 | 0.631 | 0.508 | 0.631 | 252.6 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 194.546 | 283.506 | 189.375 | 283.506 | 160.3 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1693.218 | 1786.049 | 1663.109 | 1786.049 | 252.6 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 165.720 | 183.658 | 164.049 | 183.658 | 161.2 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1645.044 | 1907.548 | 1581.182 | 1907.548 | 252.6 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.842 | 0.999 | 0.807 | 0.999 | 161.2 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.450 | 5.269 | 4.262 | 5.269 | 252.6 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.119 | 0.133 | 0.105 | 0.133 | 160.3 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.784 | 1.019 | 0.737 | 1.019 | 252.6 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 17.273 | 18.267 | 16.632 | 18.267 | 160.3 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 63.685 | 150.022 | 62.482 | 150.022 | 252.6 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 17.407 | 18.166 | 16.940 | 18.166 | 159.9 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 63.123 | 67.315 | 61.454 | 67.315 | 252.6 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 17.619 | 19.548 | 17.312 | 19.548 | 157.5 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 58.270 | 59.720 | 56.967 | 59.720 | 252.6 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.230 | 0.279 | 0.222 | 0.279 | 157.6 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.444 | 7.378 | 6.212 | 7.378 | 252.6 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 161.117 | 163.038 | 158.735 | 163.038 | 159.3 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1494.443 | 1593.987 | 1485.920 | 1593.987 | 252.6 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.095 | 0.148 | 0.076 | 0.148 | 158.5 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.814 | 5.164 | 4.665 | 5.164 | 252.6 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.014 | 0.022 | 0.013 | 0.022 | 158.0 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.362 | 2.510 | 2.313 | 2.510 | 252.6 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 7.232 | 8.285 | 6.190 | 8.285 | 157.0 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 18.030 | 34.691 | 16.312 | 34.691 | 252.6 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.208 | 0.230 | 0.206 | 0.230 | 157.5 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.839 | 3.362 | 2.668 | 3.362 | 252.6 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 174.209 | 323.014 | 167.775 | 323.014 | 174.2 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1506.224 | 1601.260 | 1446.551 | 1601.260 | 252.6 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.116 | 0.172 | 0.109 | 0.172 | 164.7 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.887 | 6.050 | 4.737 | 6.050 | 252.6 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.014 | 0.023 | 0.014 | 0.023 | 157.2 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.358 | 2.876 | 2.315 | 2.876 | 252.6 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 7.360 | 7.638 | 6.321 | 7.638 | 155.3 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 17.389 | 30.428 | 15.665 | 30.428 | 252.6 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 1.418 | 1.864 | 1.345 | 1.864 | 156.5 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 3.005 | 3.603 | 2.929 | 3.603 | 252.6 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 165.182 | 172.824 | 161.996 | 172.824 | 152.7 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1578.684 | 2521.890 | 1528.069 | 2521.890 | 252.6 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.078 | 0.134 | 0.069 | 0.134 | 152.5 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 3.007 | 4.186 | 2.891 | 4.186 | 252.6 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.014 | 0.022 | 0.014 | 0.022 | 152.2 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.040 | 1.185 | 1.023 | 1.185 | 252.6 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 3.126 | 3.480 | 2.783 | 3.480 | 150.8 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 8.352 | 13.907 | 8.159 | 13.907 | 252.6 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.371 | 1.502 | 1.353 | 1.502 | 151.5 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.857 | 4.125 | 2.804 | 4.125 | 252.6 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.012 | 0.016 | 140.1 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.475 | 0.518 | 0.457 | 0.518 | 252.6 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 177.672 | 194.200 | 170.928 | 194.200 | 157.9 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1596.435 | 1699.400 | 1582.247 | 1699.400 | 252.6 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 161.730 | 165.729 | 159.818 | 165.729 | 160.6 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1570.909 | 1585.410 | 1568.401 | 1585.410 | 252.6 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.321 | 2.016 | 0.719 | 2.016 | 160.6 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 3.062 | 3.172 | 2.976 | 3.172 | 252.6 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.111 | 0.131 | 0.093 | 0.131 | 158.0 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.515 | 0.536 | 0.501 | 0.536 | 252.6 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.257 | 3.655 | 3.225 | 3.655 | 157.7 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 20.858 | 21.585 | 20.665 | 21.585 | 252.6 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 3.557 | 3.697 | 3.377 | 3.697 | 156.7 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 20.576 | 20.962 | 20.165 | 20.962 | 252.6 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 5.696 | 6.502 | 3.899 | 6.502 | 156.0 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 15.453 | 15.807 | 15.288 | 15.807 | 252.6 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.190 | 0.220 | 0.180 | 0.220 | 156.2 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 4.883 | 4.993 | 4.874 | 4.993 | 252.6 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 182.022 | 196.292 | 177.026 | 196.292 | 203.1 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1762.163 | 1890.354 | 1653.730 | 1890.354 | 252.6 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 4.502 | 5.830 | 4.039 | 5.830 | 201.6 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 6.324 | 6.714 | 6.062 | 6.714 | 252.6 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.306 | 0.350 | 0.264 | 0.350 | 195.4 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.595 | 3.303 | 2.567 | 3.303 | 252.6 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 16.670 | 23.369 | 14.554 | 23.369 | 183.9 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 46.367 | 65.372 | 44.424 | 65.372 | 252.6 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.529 | 0.643 | 0.491 | 0.643 | 194.1 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 8.140 | 9.619 | 7.575 | 9.619 | 252.6 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 187.022 | 236.333 | 180.251 | 236.333 | 204.2 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1809.302 | 2083.454 | 1743.561 | 2083.454 | 252.6 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.394 | 5.120 | 4.171 | 5.120 | 203.8 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 6.190 | 7.339 | 5.952 | 7.339 | 252.6 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.328 | 0.351 | 0.318 | 0.351 | 203.8 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.631 | 3.197 | 2.517 | 3.197 | 252.6 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 16.964 | 19.278 | 16.062 | 19.278 | 190.5 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 46.445 | 57.573 | 43.597 | 57.573 | 252.6 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.058 | 2.885 | 1.970 | 2.885 | 202.7 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 11.197 | 18.809 | 9.710 | 18.809 | 252.6 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 178.254 | 185.169 | 177.087 | 185.169 | 201.8 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1789.076 | 1924.630 | 1696.240 | 1924.630 | 252.6 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.710 | 3.980 | 2.561 | 3.980 | 199.3 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.410 | 5.213 | 4.193 | 5.213 | 252.6 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.274 | 0.294 | 0.262 | 0.294 | 197.5 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.164 | 1.567 | 1.123 | 1.567 | 252.6 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 7.206 | 8.545 | 6.888 | 8.545 | 156.3 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 24.051 | 36.865 | 21.936 | 36.865 | 252.6 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 2.785 | 4.893 | 2.155 | 4.893 | 183.5 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 9.701 | 12.228 | 8.715 | 12.228 | 252.6 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 192.236 | 197.017 | 190.882 | 197.017 | 148.3 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1775.791 | 1890.367 | 1757.613 | 1890.367 | 252.6 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 166.562 | 184.309 | 163.524 | 184.309 | 156.3 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1790.044 | 1944.599 | 1734.684 | 1944.599 | 252.6 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.277 | 1.341 | 1.241 | 1.341 | 156.3 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 5.147 | 8.684 | 4.344 | 8.684 | 252.6 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.126 | 0.158 | 0.108 | 0.158 | 151.8 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.783 | 1.048 | 0.713 | 1.048 | 252.6 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.015 | 0.017 | 0.013 | 0.017 | 139.8 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.505 | 0.531 | 0.478 | 0.531 | 252.6 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.315 | 0.352 | 0.261 | 0.352 | 143.4 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 15.125 | 19.438 | 14.792 | 19.438 | 252.6 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.031 | 0.013 | 0.031 | 136.7 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.490 | 0.499 | 0.457 | 0.499 | 252.6 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 192.608 | 293.812 | 190.662 | 293.812 | 157.1 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1654.105 | 1683.688 | 1631.834 | 1683.688 | 252.6 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 169.831 | 177.231 | 165.328 | 177.231 | 157.6 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1585.954 | 1595.091 | 1578.576 | 1595.091 | 252.6 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 1.057 | 1.445 | 0.986 | 1.445 | 157.6 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 4.055 | 4.373 | 3.927 | 4.373 | 252.6 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.110 | 0.140 | 0.087 | 0.140 | 157.1 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.714 | 0.722 | 0.702 | 0.722 | 252.6 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 14.335 | 15.520 | 13.942 | 15.520 | 156.9 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 56.477 | 59.752 | 51.379 | 59.752 | 252.6 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 14.953 | 15.395 | 14.570 | 15.395 | 155.1 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 52.732 | 54.452 | 51.692 | 54.452 | 252.6 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 15.119 | 16.536 | 14.119 | 16.536 | 152.4 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 45.472 | 47.301 | 44.682 | 47.301 | 252.6 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.220 | 0.247 | 0.197 | 0.247 | 152.4 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.506 | 5.716 | 5.388 | 5.716 | 252.6 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.034 | 0.013 | 0.034 | 138.5 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.453 | 0.489 | 0.448 | 0.489 | 252.6 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 193.982 | 225.274 | 186.501 | 225.274 | 155.1 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1607.610 | 1699.984 | 1599.275 | 1699.984 | 252.6 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 176.647 | 181.662 | 163.977 | 181.662 | 156.7 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1594.555 | 1680.870 | 1568.248 | 1680.870 | 252.6 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 1.004 | 1.849 | 0.931 | 1.849 | 155.7 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.962 | 4.035 | 3.929 | 4.035 | 252.6 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.108 | 0.138 | 0.102 | 0.138 | 155.1 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.697 | 0.733 | 0.679 | 0.733 | 252.6 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.983 | 4.603 | 3.303 | 4.603 | 154.9 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 22.439 | 22.966 | 22.323 | 22.966 | 252.6 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 3.924 | 4.716 | 3.708 | 4.716 | 153.8 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 22.313 | 25.226 | 21.811 | 25.226 | 252.6 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 4.874 | 7.264 | 4.147 | 7.264 | 151.2 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 17.104 | 17.768 | 16.644 | 17.768 | 252.6 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.246 | 0.372 | 0.189 | 0.372 | 151.2 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.606 | 6.004 | 5.552 | 6.004 | 252.6 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 7.570 | 9.969 | 6.940 | 9.969 | 157.6 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 48.542 | 51.872 | 48.151 | 51.872 | 252.6 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 183.860 | 185.905 | 179.478 | 185.905 | 160.9 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1469.928 | 1573.999 | 1462.791 | 1573.999 | 252.6 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.994 | 3.289 | 2.813 | 3.289 | 160.3 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.415 | 2.150 | 1.372 | 2.150 | 252.6 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.137 | 0.149 | 0.136 | 0.149 | 128.2 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.490 | 0.630 | 0.481 | 0.630 | 252.6 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.218 | 0.244 | 0.212 | 0.244 | 158.7 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.510 | 6.764 | 5.414 | 6.764 | 252.6 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.388 | 2.257 | 1.362 | 2.257 | 136.2 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.779 | 0.821 | 0.760 | 0.821 | 252.6 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 6.280 | 6.709 | 5.604 | 6.709 | 158.0 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 39.543 | 49.491 | 39.328 | 49.491 | 252.6 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 6.898 | 7.944 | 6.851 | 7.944 | 156.3 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 64.266 | 75.757 | 62.438 | 75.757 | 252.6 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 189.288 | 193.314 | 186.356 | 193.314 | 156.4 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1559.790 | 1562.257 | 1509.106 | 1562.257 | 252.6 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.280 | 1.764 | 1.269 | 1.764 | 156.1 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.452 | 1.490 | 1.433 | 1.490 | 252.6 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.068 | 0.082 | 0.048 | 0.082 | 126.2 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.415 | 0.463 | 0.411 | 0.463 | 252.6 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.229 | 0.315 | 0.207 | 0.315 | 155.6 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.372 | 5.445 | 5.365 | 5.445 | 252.6 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.409 | 1.638 | 1.396 | 1.638 | 131.5 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.778 | 0.858 | 0.770 | 0.858 | 252.6 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 6.460 | 6.821 | 6.226 | 6.821 | 155.4 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 47.764 | 63.825 | 47.060 | 63.825 | 252.6 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.210 | 2.865 | 2.203 | 2.865 | 160.3 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 14.044 | 28.510 | 13.655 | 28.510 | 252.6 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.218 | 0.319 | 0.195 | 0.319 | 176.6 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.005 | 0.006 | 252.6 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.237 | 0.264 | 0.231 | 0.264 | 161.6 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.012 | 0.009 | 0.012 | 252.6 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.503 | 13.995 | 11.981 | 13.995 | 156.1 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 154.437 | 180.830 | 146.228 | 180.830 | 252.6 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.072 | 0.076 | 0.060 | 0.076 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.653 | 0.978 | 0.641 | 0.978 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 176.230 | 183.438 | 173.011 | 183.438 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1655.294 | 1737.462 | 1552.590 | 1737.462 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 162.968 | 186.357 | 161.658 | 186.357 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1489.556 | 2152.667 | 1478.559 | 2152.667 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.130 | 0.182 | 0.111 | 0.182 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 4.047 | 5.741 | 3.900 | 5.741 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.030 | 0.026 | 0.030 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.910 | 1.264 | 0.860 | 1.264 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.027 | 2.952 | 1.983 | 2.952 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 17.041 | 19.133 | 16.742 | 19.133 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.506 | 3.954 | 2.178 | 3.954 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 17.282 | 18.058 | 16.679 | 18.058 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.323 | 4.312 | 2.122 | 4.312 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 11.224 | 12.710 | 9.886 | 12.710 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.525 | 0.957 | 0.481 | 0.957 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.798 | 5.906 | 4.789 | 5.906 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.057 | 0.074 | 0.057 | 0.074 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.549 | 0.560 | 0.541 | 0.560 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 173.271 | 187.586 | 172.344 | 187.586 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1515.233 | 1760.631 | 1488.237 | 1760.631 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 167.614 | 179.957 | 164.073 | 179.957 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1438.448 | 1499.703 | 1423.567 | 1499.703 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.127 | 0.159 | 0.125 | 0.159 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.693 | 4.109 | 3.658 | 4.109 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.027 | 0.110 | 0.025 | 0.110 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.787 | 0.934 | 0.742 | 0.934 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.693 | 4.796 | 4.576 | 4.796 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 29.992 | 32.557 | 28.689 | 32.557 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.737 | 4.817 | 4.684 | 4.817 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 28.433 | 29.054 | 27.936 | 29.054 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 4.867 | 5.109 | 4.703 | 5.109 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 23.828 | 25.549 | 23.634 | 25.549 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.463 | 0.540 | 0.379 | 0.540 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 4.844 | 5.342 | 4.747 | 5.342 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.844 | 175.361 | 158.733 | 175.361 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1722.258 | 1754.053 | 1649.918 | 1754.053 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.169 | 0.102 | 0.169 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.342 | 3.375 | 2.215 | 3.375 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.026 | 0.017 | 0.026 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.445 | 0.568 | 0.426 | 0.568 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.235 | 1.374 | 1.190 | 1.374 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.568 | 4.444 | 3.274 | 4.444 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.224 | 0.239 | 0.198 | 0.239 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 2.728 | 3.567 | 2.651 | 3.567 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.554 | 169.004 | 160.386 | 169.004 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1423.239 | 1462.072 | 1412.083 | 1462.072 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.110 | 0.135 | 0.102 | 0.135 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.106 | 2.143 | 2.085 | 2.143 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.027 | 0.020 | 0.027 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.419 | 0.444 | 0.401 | 0.444 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.251 | 1.385 | 1.206 | 1.385 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.147 | 3.210 | 3.112 | 3.210 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.205 | 0.235 | 0.204 | 0.235 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 2.735 | 3.464 | 2.691 | 3.464 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.099 | 0.106 | 0.086 | 0.106 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.966 | 0.998 | 0.966 | 0.998 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 185.276 | 194.971 | 182.181 | 194.971 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1458.246 | 1494.071 | 1441.641 | 1494.071 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 168.005 | 266.817 | 167.683 | 266.817 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1435.730 | 1519.266 | 1418.037 | 1519.266 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.140 | 0.157 | 0.131 | 0.157 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.618 | 3.726 | 3.614 | 3.726 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.021 | 0.027 | 0.021 | 0.027 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.230 | 1.252 | 1.186 | 1.252 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 7.405 | 24.191 | 6.473 | 24.191 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 34.276 | 34.991 | 31.359 | 34.991 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 5.330 | 7.848 | 5.132 | 7.848 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 30.973 | 34.009 | 30.423 | 34.009 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 4.818 | 5.498 | 4.787 | 5.498 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 25.542 | 27.693 | 25.349 | 27.693 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.949 | 1.048 | 0.910 | 1.048 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 4.566 | 5.210 | 4.443 | 5.210 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.022 | 0.015 | 0.022 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.498 | 0.532 | 0.465 | 0.532 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 167.450 | 185.839 | 164.427 | 185.839 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1445.240 | 1530.351 | 1425.987 | 1530.351 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 153.578 | 154.714 | 151.475 | 154.714 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1515.020 | 1647.186 | 1422.975 | 1647.186 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.104 | 0.147 | 0.072 | 0.147 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.189 | 2.279 | 2.150 | 2.279 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.029 | 0.038 | 0.015 | 0.038 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.448 | 0.499 | 0.435 | 0.499 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.429 | 3.309 | 1.385 | 3.309 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 13.073 | 17.969 | 12.394 | 17.969 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.791 | 1.932 | 1.696 | 1.932 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 12.322 | 14.013 | 12.079 | 14.013 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.660 | 4.971 | 1.437 | 4.971 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 9.003 | 10.341 | 8.766 | 10.341 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.207 | 0.218 | 0.190 | 0.218 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.170 | 3.465 | 3.123 | 3.465 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.039 | 0.015 | 0.039 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.508 | 0.563 | 0.485 | 0.563 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 188.547 | 194.562 | 182.289 | 194.562 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1533.214 | 1649.795 | 1490.479 | 1649.795 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 169.746 | 179.684 | 160.203 | 179.684 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1554.795 | 1575.353 | 1454.554 | 1575.353 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.098 | 0.155 | 0.083 | 0.155 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.333 | 2.922 | 2.159 | 2.922 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.025 | 0.037 | 0.016 | 0.037 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.501 | 0.825 | 0.441 | 0.825 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.548 | 2.007 | 1.519 | 2.007 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 14.802 | 18.394 | 14.225 | 18.394 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.928 | 2.428 | 1.774 | 2.428 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 13.452 | 15.165 | 13.049 | 15.165 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.955 | 4.198 | 1.544 | 4.198 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 11.077 | 18.894 | 10.069 | 18.894 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.436 | 0.824 | 0.251 | 0.824 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.523 | 4.214 | 3.324 | 4.214 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.019 | 0.037 | 0.015 | 0.037 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.486 | 0.504 | 0.471 | 0.504 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 327.825 | 987.545 | 304.070 | 987.545 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1866.265 | 1948.707 | 1812.536 | 1948.707 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 202.471 | 248.690 | 171.942 | 248.690 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1437.406 | 2071.241 | 1419.287 | 2071.241 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.165 | 0.326 | 0.127 | 0.326 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.257 | 2.367 | 2.208 | 2.367 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.039 | 0.137 | 0.027 | 0.137 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.473 | 0.539 | 0.468 | 0.539 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 107.378 | 129.169 | 106.199 | 129.169 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 393.016 | 397.703 | 391.941 | 397.703 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 105.117 | 117.134 | 104.848 | 117.134 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 393.430 | 402.775 | 388.912 | 402.775 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 105.514 | 110.332 | 103.613 | 110.332 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 403.191 | 441.749 | 387.888 | 441.749 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.350 | 0.577 | 0.306 | 0.577 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.167 | 3.281 | 3.114 | 3.281 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.629 | 166.774 | 158.190 | 166.774 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1434.127 | 1477.859 | 1414.250 | 1477.859 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.161 | 0.102 | 0.161 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 2.142 | 2.332 | 2.088 | 2.332 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.029 | 0.017 | 0.029 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.438 | 0.477 | 0.428 | 0.477 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.900 | 2.002 | 1.872 | 2.002 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 7.429 | 9.215 | 6.991 | 9.215 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.209 | 0.233 | 0.207 | 0.233 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.704 | 3.052 | 2.639 | 3.052 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.876 | 162.016 | 160.918 | 162.016 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1562.925 | 1631.721 | 1429.201 | 1631.721 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.151 | 0.103 | 0.151 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 2.083 | 2.139 | 2.041 | 2.139 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.111 | 0.016 | 0.111 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.423 | 0.433 | 0.419 | 0.433 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 3.902 | 4.109 | 3.769 | 4.109 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 20.543 | 21.432 | 19.603 | 21.432 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.201 | 0.233 | 0.196 | 0.233 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.693 | 2.741 | 2.689 | 2.741 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.047 | 0.074 | 0.042 | 0.074 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.552 | 0.569 | 0.526 | 0.569 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 177.283 | 179.638 | 169.479 | 179.638 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1545.254 | 1876.657 | 1542.448 | 1876.657 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 167.137 | 182.331 | 156.477 | 182.331 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1444.962 | 1590.763 | 1444.332 | 1590.763 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.130 | 0.166 | 0.106 | 0.166 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 3.727 | 4.205 | 3.623 | 4.205 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.029 | 0.039 | 0.025 | 0.039 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.664 | 0.977 | 0.660 | 0.977 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.945 | 3.700 | 2.914 | 3.700 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 50.500 | 64.153 | 49.896 | 64.153 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 3.116 | 3.233 | 3.035 | 3.233 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 52.082 | 62.470 | 51.202 | 62.470 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 3.621 | 3.811 | 3.341 | 3.811 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 46.268 | 48.255 | 45.515 | 48.255 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.385 | 1.299 | 0.356 | 1.299 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 4.764 | 4.834 | 4.760 | 4.834 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.273 | 170.432 | 164.032 | 170.432 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1541.971 | 1568.929 | 1500.303 | 1568.929 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.224 | 0.265 | 0.211 | 0.265 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.658 | 3.791 | 3.624 | 3.791 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.023 | 0.021 | 0.023 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.655 | 0.664 | 0.653 | 0.664 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 3.054 | 3.359 | 2.229 | 3.359 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.755 | 9.551 | 8.671 | 9.551 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.414 | 0.641 | 0.382 | 0.641 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.739 | 4.993 | 4.686 | 4.993 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.964 | 166.650 | 162.632 | 166.650 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1553.850 | 1559.374 | 1515.177 | 1559.374 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.172 | 0.182 | 0.161 | 0.182 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 4.048 | 4.333 | 3.867 | 4.333 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.020 | 0.019 | 0.020 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.826 | 0.848 | 0.822 | 0.848 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 3.594 | 4.205 | 3.537 | 4.205 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 10.288 | 11.265 | 10.157 | 11.265 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.496 | 0.516 | 0.478 | 0.516 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.954 | 5.295 | 4.930 | 5.295 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.077 | 0.081 | 0.076 | 0.081 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.650 | 0.709 | 0.640 | 0.709 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 185.599 | 314.782 | 179.057 | 314.782 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1504.292 | 2275.713 | 1490.235 | 2275.713 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 179.237 | 192.223 | 173.592 | 192.223 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1492.743 | 1516.034 | 1475.988 | 1516.034 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.130 | 0.283 | 0.125 | 0.283 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 4.197 | 4.300 | 3.967 | 4.300 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.028 | 0.043 | 0.026 | 0.043 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.924 | 1.099 | 0.900 | 1.099 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.142 | 2.515 | 2.071 | 2.515 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 16.561 | 17.349 | 16.118 | 17.349 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 2.279 | 2.594 | 2.234 | 2.594 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 14.961 | 16.214 | 14.558 | 16.214 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.961 | 3.702 | 2.195 | 3.702 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 10.335 | 11.833 | 10.334 | 11.833 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.589 | 1.050 | 0.484 | 1.050 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.832 | 5.151 | 4.805 | 5.151 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.055 | 0.079 | 0.047 | 0.079 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.524 | 0.587 | 0.517 | 0.587 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 174.634 | 175.219 | 169.946 | 175.219 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1477.983 | 1541.258 | 1472.521 | 1541.258 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 168.137 | 185.617 | 165.064 | 185.617 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1501.834 | 1600.618 | 1494.304 | 1600.618 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.128 | 0.198 | 0.126 | 0.198 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 4.020 | 4.440 | 3.991 | 4.440 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.034 | 0.589 | 0.032 | 0.589 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.686 | 0.713 | 0.684 | 0.713 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.146 | 1.188 | 1.129 | 1.188 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 14.339 | 14.870 | 14.232 | 14.870 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.462 | 2.187 | 1.355 | 2.187 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 14.511 | 16.611 | 13.752 | 16.611 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.970 | 2.447 | 1.859 | 2.447 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 8.580 | 9.657 | 8.351 | 9.657 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.529 | 0.894 | 0.501 | 0.894 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.758 | 5.522 | 4.721 | 5.522 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.559 | 182.907 | 160.132 | 182.907 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1430.813 | 1474.097 | 1428.921 | 1474.097 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.161 | 0.161 | 0.120 | 0.161 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.102 | 2.150 | 2.070 | 2.150 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.037 | 0.017 | 0.037 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.440 | 0.474 | 0.425 | 0.474 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.744 | 1.800 | 1.715 | 1.800 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 7.811 | 8.887 | 7.035 | 8.887 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.225 | 0.241 | 0.207 | 0.241 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.674 | 2.783 | 2.646 | 2.783 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 166.971 | 175.047 | 155.865 | 175.047 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1429.675 | 1581.052 | 1417.523 | 1581.052 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.105 | 0.138 | 0.103 | 0.138 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 2.090 | 2.140 | 2.071 | 2.140 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.023 | 0.017 | 0.023 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.439 | 0.462 | 0.417 | 0.462 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 3.995 | 18.967 | 3.966 | 18.967 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 20.407 | 20.741 | 20.007 | 20.741 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.222 | 0.237 | 0.200 | 0.237 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.667 | 2.754 | 2.663 | 2.754 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.341 | 165.550 | 162.866 | 165.550 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1476.561 | 1572.263 | 1457.155 | 1572.263 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.203 | 0.324 | 0.194 | 0.324 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.855 | 5.312 | 3.822 | 5.312 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.037 | 0.018 | 0.037 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.783 | 0.809 | 0.780 | 0.809 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 3.308 | 3.718 | 3.209 | 3.718 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 10.029 | 11.437 | 9.529 | 11.437 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.159 | 0.241 | 0.141 | 0.241 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.793 | 5.213 | 4.788 | 5.213 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.468 | 169.289 | 160.514 | 169.289 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1747.399 | 1861.932 | 1599.749 | 1861.932 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.186 | 0.209 | 0.182 | 0.209 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 4.921 | 5.119 | 4.014 | 5.119 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.017 | 0.021 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 1.013 | 1.592 | 0.973 | 1.592 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.085 | 3.645 | 3.012 | 3.645 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 11.843 | 12.542 | 11.111 | 12.542 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.155 | 0.161 | 0.138 | 0.161 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 6.218 | 6.560 | 5.443 | 6.560 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.878 | 185.722 | 162.476 | 185.722 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1529.682 | 1648.884 | 1483.136 | 1648.884 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.177 | 0.206 | 0.177 | 0.206 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 4.646 | 6.228 | 4.199 | 6.228 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.023 | 0.020 | 0.023 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.823 | 0.858 | 0.819 | 0.858 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.289 | 3.919 | 3.089 | 3.919 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 12.018 | 17.371 | 11.673 | 17.371 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.147 | 0.170 | 0.143 | 0.170 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 5.392 | 7.111 | 5.274 | 7.111 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.846 | 174.072 | 159.833 | 174.072 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1477.431 | 1624.105 | 1432.953 | 1624.105 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.189 | 0.210 | 0.175 | 0.210 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.949 | 4.435 | 3.811 | 4.435 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.017 | 0.022 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.811 | 0.851 | 0.795 | 0.851 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.284 | 4.057 | 3.118 | 4.057 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 9.722 | 14.722 | 9.721 | 14.722 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.150 | 0.158 | 0.148 | 0.158 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.823 | 5.562 | 4.774 | 5.562 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.087 | 168.897 | 155.061 | 168.897 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1551.627 | 1635.970 | 1490.120 | 1635.970 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.222 | 0.240 | 0.212 | 0.240 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 4.173 | 4.541 | 3.839 | 4.541 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.025 | 0.019 | 0.025 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.619 | 0.653 | 0.615 | 0.653 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.932 | 4.187 | 1.798 | 4.187 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 9.679 | 12.088 | 9.387 | 12.088 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.170 | 0.188 | 0.161 | 0.188 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 5.387 | 21.028 | 4.982 | 21.028 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.191 | 164.299 | 156.195 | 164.299 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1465.777 | 1473.769 | 1442.754 | 1473.769 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.234 | 0.244 | 0.222 | 0.244 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.809 | 4.577 | 3.658 | 4.577 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.018 | 0.023 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.630 | 1.249 | 0.602 | 1.249 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.970 | 3.017 | 1.880 | 3.017 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 8.127 | 9.087 | 7.834 | 9.087 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.167 | 0.206 | 0.155 | 0.206 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.767 | 4.934 | 4.707 | 4.934 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.920 | 159.444 | 156.788 | 159.444 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1728.236 | 1853.198 | 1663.038 | 1853.198 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.199 | 0.219 | 0.168 | 0.219 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 4.189 | 5.277 | 4.185 | 5.277 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.150 | 0.019 | 0.150 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.674 | 1.078 | 0.661 | 1.078 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.111 | 3.911 | 2.053 | 3.911 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 9.879 | 10.638 | 9.599 | 10.638 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.167 | 0.177 | 0.166 | 0.177 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 5.540 | 6.385 | 4.992 | 6.385 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.299 | 159.292 | 152.016 | 159.292 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1519.397 | 1695.826 | 1470.132 | 1695.826 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.198 | 0.228 | 0.192 | 0.228 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 4.122 | 4.526 | 4.071 | 4.526 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.024 | 0.021 | 0.024 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.692 | 0.894 | 0.684 | 0.894 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 2.394 | 3.623 | 1.857 | 3.623 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 9.916 | 10.864 | 9.819 | 10.864 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.167 | 0.223 | 0.166 | 0.223 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 5.619 | 6.129 | 5.200 | 6.129 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.452 | 182.194 | 156.025 | 182.194 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1505.462 | 1534.123 | 1503.080 | 1534.123 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.214 | 0.258 | 0.212 | 0.258 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.663 | 4.119 | 3.586 | 4.119 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.027 | 0.022 | 0.027 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.636 | 0.665 | 0.633 | 0.665 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 2.214 | 3.333 | 2.016 | 3.333 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 9.557 | 10.324 | 9.332 | 10.324 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.199 | 1.200 | 0.187 | 1.200 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 5.208 | 5.821 | 4.895 | 5.821 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 167.072 | 184.256 | 154.555 | 184.256 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1496.744 | 1504.405 | 1430.456 | 1504.405 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.309 | 0.373 | 0.254 | 0.373 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.650 | 3.761 | 3.631 | 3.761 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.037 | 0.050 | 0.023 | 0.050 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.651 | 0.688 | 0.650 | 0.688 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 2.632 | 3.704 | 1.401 | 3.704 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 8.243 | 9.200 | 8.019 | 9.200 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.180 | 0.300 | 0.173 | 0.300 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.830 | 4.891 | 4.823 | 4.891 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.491 | 164.244 | 155.468 | 164.244 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1469.923 | 1937.944 | 1458.148 | 1937.944 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.170 | 0.223 | 0.126 | 0.223 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.266 | 2.352 | 2.226 | 2.352 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.031 | 0.021 | 0.031 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.443 | 0.512 | 0.431 | 0.512 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 155.402 | 156.404 | 154.254 | 156.404 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 623.128 | 697.264 | 616.196 | 697.264 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.227 | 0.294 | 0.220 | 0.294 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.192 | 3.763 | 3.101 | 3.763 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.064 | 161.320 | 154.397 | 161.320 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1450.508 | 1853.589 | 1432.329 | 1853.589 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.157 | 0.191 | 0.143 | 0.191 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.170 | 2.390 | 2.153 | 2.390 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.033 | 0.018 | 0.033 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.433 | 0.458 | 0.421 | 0.458 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 4.487 | 4.847 | 4.337 | 4.847 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 21.595 | 23.552 | 21.389 | 23.552 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.214 | 0.245 | 0.209 | 0.245 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.061 | 3.173 | 3.002 | 3.173 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 167.316 | 173.779 | 161.905 | 173.779 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1500.441 | 1561.650 | 1495.863 | 1561.650 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.148 | 0.180 | 0.125 | 0.180 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 2.254 | 2.679 | 2.063 | 2.679 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.026 | 0.032 | 0.024 | 0.032 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.324 | 0.366 | 0.320 | 0.366 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.560 | 0.666 | 0.538 | 0.666 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 3.039 | 3.204 | 2.988 | 3.204 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.186 | 0.293 | 0.151 | 0.293 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.760 | 2.899 | 2.711 | 2.899 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 174.143 | 208.010 | 162.951 | 208.010 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1599.450 | 2094.044 | 1536.907 | 2094.044 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.160 | 0.200 | 0.160 | 0.200 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 2.223 | 2.274 | 2.075 | 2.274 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.020 | 0.044 | 0.020 | 0.044 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.333 | 0.348 | 0.332 | 0.348 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.884 | 1.197 | 0.873 | 1.197 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 9.647 | 17.470 | 8.460 | 17.470 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.193 | 0.306 | 0.176 | 0.306 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 3.218 | 3.424 | 2.858 | 3.424 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 305.970 | 379.182 | 295.699 | 379.182 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2050.698 | 2060.278 | 2013.120 | 2060.278 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 175.418 | 185.504 | 170.282 | 185.504 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1648.504 | 2090.898 | 1578.005 | 2090.898 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.187 | 0.311 | 0.171 | 0.311 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.640 | 2.753 | 2.292 | 2.753 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.025 | 0.057 | 0.018 | 0.057 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.466 | 0.519 | 0.442 | 0.519 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.026 | 0.032 | 0.026 | 0.032 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.514 | 0.873 | 0.491 | 0.873 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.459 | 5.015 | 4.295 | 5.015 | 142.5 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 137.802 | 151.128 | 123.939 | 151.128 | 252.6 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 175.174 | 193.239 | 171.025 | 193.239 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1588.930 | 1685.815 | 1528.994 | 1685.815 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 170.637 | 178.852 | 169.557 | 178.852 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1551.459 | 1593.067 | 1547.611 | 1593.067 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.218 | 0.361 | 0.205 | 0.361 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.766 | 4.380 | 3.641 | 4.380 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.020 | 0.044 | 0.017 | 0.044 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.686 | 0.889 | 0.661 | 0.889 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 0.081 | 0.042 | 0.081 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.542 | 0.597 | 0.529 | 0.597 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.966 | 1.586 | 0.819 | 1.586 | 137.0 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 77.073 | 128.751 | 74.357 | 128.751 | 252.6 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 180.430 | 198.421 | 171.948 | 198.421 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1584.028 | 1672.558 | 1528.323 | 1672.558 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 174.258 | 212.367 | 158.946 | 212.367 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1495.562 | 1656.108 | 1471.889 | 1656.108 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.207 | 0.243 | 0.163 | 0.243 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 4.049 | 4.739 | 3.818 | 4.739 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.021 | 0.028 | 0.016 | 0.028 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.872 | 0.919 | 0.837 | 0.919 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.127 | 0.172 | 0.108 | 0.172 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.647 | 0.688 | 0.627 | 0.688 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 1.294 | 2.945 | 0.902 | 2.945 | 150.9 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 23.953 | 40.924 | 20.705 | 40.924 | 252.6 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `7835012b486794900684ff67778502e6da02ab6e`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:3a018d4ce96a517eb09f103492e495b30942278c3abbb223c4f732b58e09f806`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:07a082e9f600a895c9e0973811282072db901d31f67fa4f8604eeeb71e2720cb`

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

