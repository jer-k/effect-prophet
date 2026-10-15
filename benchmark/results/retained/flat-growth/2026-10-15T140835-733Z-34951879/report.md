# Effect Prophet benchmark — 2026-10-15T140835-733Z-34951879

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| country-us-flat-additive | equivalent-objective | passed | 8.420e-7 | 3.143e-5 | 5.901e-5 | 5.816e-5 | 1.053e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-us-flat-additive | equivalent-objective | passed | 8.420e-7 | 3.143e-5 | 5.901e-5 | 5.816e-5 | 1.053e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-us-flat-multiplicative | equivalent-objective | passed | 7.623e-5 | 1.543e-3 | 0.000e+0 | 1.829e-3 | 4.935e-4 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-us-flat-multiplicative | equivalent-objective | passed | 7.623e-5 | 1.543e-3 | 0.000e+0 | 1.829e-3 | 4.935e-4 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-boundary-flat | equivalent-objective | passed | 1.545e-5 | 1.664e-3 | 1.664e-3 | 1.649e-3 | 1.345e-4 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-empty-bv-flat | equivalent-objective | passed | 3.893e-5 | 0.000e+0 | 0.000e+0 | 3.893e-5 | 4.860e-6 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-empty-flat | equivalent-objective | passed | 3.893e-5 | 0.000e+0 | 0.000e+0 | 3.893e-5 | 4.860e-6 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-estimated-sg-flat | equivalent-objective | passed | 1.355e-5 | 1.654e-3 | 1.654e-3 | 1.641e-3 | 1.338e-4 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-partial-in-flat | equivalent-objective | passed | 1.153e-6 | 4.218e-5 | 4.218e-5 | 4.102e-5 | 1.048e-4 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-mixed-us-flat | equivalent-objective | passed | 1.218e-7 | 2.411e-6 | 2.812e-6 | 2.715e-6 | 1.445e-6 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-none-flat-730 | equivalent-objective | passed | 3.303e-6 | 0.000e+0 | 0.000e+0 | 3.303e-6 | 9.732e-8 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-se-flat-730 | equivalent-objective | passed | 2.121e-12 | 1.191e-10 | 1.191e-10 | 1.169e-10 | 4.250e-12 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-se-flat-730 | equivalent-objective | passed | 2.121e-12 | 1.191e-10 | 1.191e-10 | 1.169e-10 | 4.250e-12 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-cn-flat-730 | equivalent-objective | passed | 2.093e-8 | 2.821e-7 | 2.821e-7 | 2.612e-7 | 2.035e-8 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-cn-flat-730 | equivalent-objective | passed | 2.093e-8 | 2.821e-7 | 2.821e-7 | 2.612e-7 | 2.035e-8 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-none-flat-2190 | equivalent-objective | passed | 4.825e-7 | 0.000e+0 | 0.000e+0 | 4.825e-7 | 2.688e-7 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-se-flat-2190 | equivalent-objective | passed | 1.077e-10 | 4.841e-10 | 4.612e-10 | 5.690e-10 | 5.141e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-se-flat-2190 | equivalent-objective | passed | 1.077e-10 | 4.841e-10 | 4.612e-10 | 5.690e-10 | 5.141e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-cn-flat-2190 | equivalent-objective | passed | 6.449e-7 | 5.896e-4 | 5.896e-4 | 5.902e-4 | 1.984e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-cn-flat-2190 | equivalent-objective | passed | 6.449e-7 | 5.896e-4 | 5.896e-4 | 5.902e-4 | 1.984e-5 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-none-flat-2190-batch-32 | equivalent-objective | passed | 4.825e-7 | 0.000e+0 | 0.000e+0 | 4.825e-7 | 2.688e-7 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-se-flat-2190-batch-32 | equivalent-objective | passed | 1.077e-10 | 4.247e-10 | 4.247e-10 | 5.324e-10 | 5.141e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-explicit-se-flat-2190-batch-32 | equivalent-objective | passed | 1.077e-10 | 4.247e-10 | 4.247e-10 | 5.324e-10 | 5.141e-11 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. |
| country-uncertainty-us-flat | scalar-process-different-public-work | passed | 8.420e-7 | 3.143e-5 | 5.901e-5 | 5.816e-5 | 1.053e-5 | 0.097 | Verified fitted point behavior under country-calendar-public-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. |
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

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-flat-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12253 | 23611 |
| country-us-flat-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12253 | 23611 |
| country-explicit-us-flat-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3534 | 26427 |
| country-explicit-us-flat-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3534 | 26427 |
| country-us-flat-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12276 | 23613 |
| country-us-flat-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12276 | 23613 |
| country-explicit-us-flat-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3545 | 26429 |
| country-explicit-us-flat-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 12 | 3545 | 26429 |
| country-boundary-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2010 | 13 | 11534 | 23878 |
| country-boundary-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2010 | 13 | 11534 | 23878 |
| country-empty-bv-flat | 0 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 0 | 2819 | 17324 |
| country-empty-bv-flat | 1 | BV / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 0 | 2819 | 17324 |
| country-explicit-empty-flat | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 0 | 485 | 17324 |
| country-explicit-empty-flat | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 0 | 485 | 17324 |
| country-estimated-sg-flat | 0 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 11 | 13193 | 21589 |
| country-estimated-sg-flat | 1 | SG / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 11 | 13193 | 21589 |
| country-partial-in-flat | 0 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2036 | 10 | 16630 | 21913 |
| country-partial-in-flat | 1 | IN / allow-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2036 | 10 | 16630 | 21913 |
| country-mixed-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12583 | 29566 |
| country-mixed-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12583 | 29566 |
| country-none-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 0 | 484 | 121076 |
| country-none-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 0 | 484 | 121076 |
| country-se-flat-730 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2020, 2021 | 14 | 60773 | 127208 |
| country-se-flat-730 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2020, 2021 | 14 | 60773 | 127208 |
| country-explicit-se-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 14 | 25755 | 158404 |
| country-explicit-se-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 14 | 25755 | 158404 |
| country-cn-flat-730 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2020, 2021 | 26 | 28794 | 153496 |
| country-cn-flat-730 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2020, 2021 | 26 | 28794 | 153496 |
| country-explicit-cn-flat-730 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 26 | 10006 | 164533 |
| country-explicit-cn-flat-730 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 26 | 10006 | 164533 |
| country-none-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 0 | 498 | 361210 |
| country-none-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 0 | 498 | 361210 |
| country-se-flat-2190 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85696 | 367351 |
| country-se-flat-2190 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85696 | 367351 |
| country-explicit-se-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 14 | 50564 | 429311 |
| country-explicit-se-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 14 | 50564 | 429311 |
| country-cn-flat-2190 | 0 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39077 | 509750 |
| country-cn-flat-2190 | 1 | CN / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 56 | 39077 | 509750 |
| country-explicit-cn-flat-2190 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 56 | 21030 | 533374 |
| country-explicit-cn-flat-2190 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 56 | 21030 | 533374 |
| country-none-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 0 | 498 | 361210 |
| country-none-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 0 | 498 | 361210 |
| country-se-flat-2190-batch-32 | 0 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85696 | 367351 |
| country-se-flat-2190-batch-32 | 1 | SE / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2020, 2021, 2022, 2023, 2024, 2025 | 14 | 85696 | 367351 |
| country-explicit-se-flat-2190-batch-32 | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 14 | 44368 | 421620 |
| country-explicit-se-flat-2190-batch-32 | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | false | n/a | 14 | 44368 | 421620 |
| country-uncertainty-us-flat | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12253 | 23611 |
| country-uncertainty-us-flat | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:71ee8daf33ec4d527ad865201555a2205f3bf5059a863e7c96da068855adcdb6 | true | 2024 | 12 | 12253 | 23611 |

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
| country-boundary-flat | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.023 | 0.013 | 0.023 | 140.1 |
| country-boundary-flat | adapter-input-conversion | python-prophet | 6 | 0.506 | 0.945 | 0.487 | 0.945 | 252.4 |
| country-boundary-flat | cold-first-forecast | effect-prophet | 6 | 174.395 | 178.402 | 173.434 | 178.402 | 155.1 |
| country-boundary-flat | cold-first-forecast | python-prophet | 6 | 1736.378 | 1779.813 | 1611.658 | 1779.813 | 252.4 |
| country-boundary-flat | fresh-process-restored-predict | effect-prophet | 6 | 158.151 | 160.492 | 156.795 | 160.492 | 157.7 |
| country-boundary-flat | fresh-process-restored-predict | python-prophet | 6 | 1594.102 | 1685.491 | 1577.189 | 1685.491 | 252.4 |
| country-boundary-flat | model-json-decode | effect-prophet | 6 | 0.744 | 0.782 | 0.728 | 0.782 | 157.7 |
| country-boundary-flat | model-json-decode | python-prophet | 6 | 3.134 | 3.872 | 3.066 | 3.872 | 252.4 |
| country-boundary-flat | model-json-encode | effect-prophet | 6 | 0.074 | 0.086 | 0.070 | 0.086 | 155.1 |
| country-boundary-flat | model-json-encode | python-prophet | 6 | 0.521 | 0.538 | 0.513 | 0.538 | 252.4 |
| country-boundary-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 9.661 | 10.563 | 9.581 | 10.563 | 155.0 |
| country-boundary-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 22.669 | 25.547 | 22.150 | 25.547 | 252.4 |
| country-boundary-flat | warm-fit-predict | effect-prophet | 6 | 9.905 | 10.393 | 9.815 | 10.393 | 153.1 |
| country-boundary-flat | warm-fit-predict | python-prophet | 6 | 22.814 | 24.985 | 21.378 | 24.985 | 252.4 |
| country-boundary-flat | warm-fit | effect-prophet | 6 | 11.115 | 11.784 | 10.260 | 11.784 | 152.5 |
| country-boundary-flat | warm-fit | python-prophet | 6 | 17.518 | 18.144 | 16.689 | 18.144 | 252.4 |
| country-boundary-flat | warm-predict | effect-prophet | 6 | 0.218 | 0.230 | 0.214 | 0.230 | 152.6 |
| country-boundary-flat | warm-predict | python-prophet | 6 | 5.644 | 7.149 | 5.507 | 7.149 | 252.4 |
| country-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 182.469 | 195.920 | 177.466 | 195.920 | 227.2 |
| country-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1600.754 | 1680.096 | 1593.283 | 1680.096 | 252.4 |
| country-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 2.889 | 3.576 | 2.833 | 3.576 | 219.8 |
| country-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.191 | 10.371 | 8.937 | 10.371 | 252.4 |
| country-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.113 | 0.121 | 0.110 | 0.121 | 213.0 |
| country-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.111 | 3.229 | 3.052 | 3.229 | 252.4 |
| country-cn-flat-2190 | warm-fit | effect-prophet | 6 | 24.664 | 28.954 | 19.838 | 28.954 | 200.6 |
| country-cn-flat-2190 | warm-fit | python-prophet | 6 | 84.203 | 89.431 | 82.509 | 89.431 | 252.4 |
| country-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.961 | 4.609 | 3.363 | 4.609 | 206.7 |
| country-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.552 | 10.707 | 8.972 | 10.707 | 252.4 |
| country-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 174.983 | 181.606 | 173.460 | 181.606 | 192.5 |
| country-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1598.600 | 1664.727 | 1579.647 | 1664.727 | 252.4 |
| country-cn-flat-730 | model-json-decode | effect-prophet | 6 | 1.771 | 2.801 | 1.694 | 2.801 | 189.1 |
| country-cn-flat-730 | model-json-decode | python-prophet | 6 | 4.833 | 4.961 | 4.797 | 4.961 | 252.4 |
| country-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.158 | 0.303 | 0.144 | 0.303 | 181.0 |
| country-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.247 | 1.377 | 1.241 | 1.377 | 252.4 |
| country-cn-flat-730 | warm-fit | effect-prophet | 6 | 8.072 | 9.436 | 7.097 | 9.436 | 150.3 |
| country-cn-flat-730 | warm-fit | python-prophet | 6 | 24.345 | 25.344 | 24.051 | 25.344 | 252.4 |
| country-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.645 | 4.495 | 2.292 | 4.495 | 165.1 |
| country-cn-flat-730 | warm-predict | python-prophet | 6 | 7.027 | 7.214 | 6.978 | 7.214 | 252.4 |
| country-empty-bv-flat | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.021 | 0.013 | 0.021 | 128.3 |
| country-empty-bv-flat | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.489 | 0.458 | 0.489 | 252.4 |
| country-empty-bv-flat | cold-first-forecast | effect-prophet | 6 | 157.084 | 163.250 | 154.936 | 163.250 | 141.8 |
| country-empty-bv-flat | cold-first-forecast | python-prophet | 6 | 1659.978 | 1763.275 | 1597.251 | 1763.275 | 252.4 |
| country-empty-bv-flat | fresh-process-restored-predict | effect-prophet | 6 | 154.049 | 156.141 | 152.991 | 156.141 | 143.5 |
| country-empty-bv-flat | fresh-process-restored-predict | python-prophet | 6 | 1591.179 | 1669.811 | 1577.888 | 1669.811 | 252.4 |
| country-empty-bv-flat | model-json-decode | effect-prophet | 6 | 0.203 | 0.257 | 0.166 | 0.257 | 142.3 |
| country-empty-bv-flat | model-json-decode | python-prophet | 6 | 2.055 | 3.115 | 1.960 | 3.115 | 252.4 |
| country-empty-bv-flat | model-json-encode | effect-prophet | 6 | 0.035 | 0.060 | 0.025 | 0.060 | 141.8 |
| country-empty-bv-flat | model-json-encode | python-prophet | 6 | 0.434 | 0.464 | 0.397 | 0.464 | 252.4 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 0.966 | 1.090 | 0.902 | 1.090 | 141.7 |
| country-empty-bv-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 12.392 | 13.443 | 12.146 | 13.443 | 252.4 |
| country-empty-bv-flat | warm-fit-predict | effect-prophet | 6 | 1.358 | 3.057 | 1.026 | 3.057 | 141.5 |
| country-empty-bv-flat | warm-fit-predict | python-prophet | 6 | 12.171 | 12.487 | 11.878 | 12.487 | 252.4 |
| country-empty-bv-flat | warm-fit | effect-prophet | 6 | 1.648 | 1.888 | 1.504 | 1.888 | 132.7 |
| country-empty-bv-flat | warm-fit | python-prophet | 6 | 9.107 | 10.073 | 8.476 | 10.073 | 252.4 |
| country-empty-bv-flat | warm-predict | effect-prophet | 6 | 0.133 | 0.144 | 0.115 | 0.144 | 134.5 |
| country-empty-bv-flat | warm-predict | python-prophet | 6 | 3.190 | 3.391 | 3.133 | 3.391 | 252.4 |
| country-estimated-sg-flat | adapter-input-conversion | effect-prophet | 6 | 0.063 | 0.071 | 0.036 | 0.071 | 143.5 |
| country-estimated-sg-flat | adapter-input-conversion | python-prophet | 6 | 0.612 | 0.660 | 0.588 | 0.660 | 252.4 |
| country-estimated-sg-flat | cold-first-forecast | effect-prophet | 6 | 179.762 | 180.453 | 175.864 | 180.453 | 176.3 |
| country-estimated-sg-flat | cold-first-forecast | python-prophet | 6 | 1717.187 | 1738.747 | 1656.752 | 1738.747 | 252.4 |
| country-estimated-sg-flat | fresh-process-restored-predict | effect-prophet | 6 | 166.433 | 171.517 | 163.318 | 171.517 | 189.3 |
| country-estimated-sg-flat | fresh-process-restored-predict | python-prophet | 6 | 1594.859 | 1766.352 | 1585.179 | 1766.352 | 252.4 |
| country-estimated-sg-flat | model-json-decode | effect-prophet | 6 | 1.080 | 1.149 | 0.955 | 1.149 | 181.7 |
| country-estimated-sg-flat | model-json-decode | python-prophet | 6 | 3.036 | 3.484 | 2.963 | 3.484 | 252.4 |
| country-estimated-sg-flat | model-json-encode | effect-prophet | 6 | 0.088 | 0.126 | 0.084 | 0.126 | 177.8 |
| country-estimated-sg-flat | model-json-encode | python-prophet | 6 | 0.498 | 0.524 | 0.487 | 0.524 | 252.4 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 9.813 | 10.639 | 9.497 | 10.639 | 168.6 |
| country-estimated-sg-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 21.492 | 26.224 | 21.073 | 26.224 | 252.4 |
| country-estimated-sg-flat | warm-fit-predict | effect-prophet | 6 | 9.843 | 10.249 | 9.649 | 10.249 | 159.4 |
| country-estimated-sg-flat | warm-fit-predict | python-prophet | 6 | 20.329 | 23.543 | 20.293 | 23.543 | 252.4 |
| country-estimated-sg-flat | warm-fit | effect-prophet | 6 | 8.960 | 9.990 | 8.734 | 9.990 | 148.9 |
| country-estimated-sg-flat | warm-fit | python-prophet | 6 | 15.045 | 15.607 | 14.999 | 15.607 | 252.4 |
| country-estimated-sg-flat | warm-predict | effect-prophet | 6 | 1.567 | 2.648 | 1.416 | 2.648 | 156.2 |
| country-estimated-sg-flat | warm-predict | python-prophet | 6 | 5.331 | 5.635 | 5.224 | 5.635 | 252.4 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 183.072 | 196.023 | 178.419 | 196.023 | 236.6 |
| country-explicit-cn-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1427.491 | 1441.159 | 1423.221 | 1441.159 | 252.4 |
| country-explicit-cn-flat-2190 | model-json-decode | effect-prophet | 6 | 1.664 | 2.068 | 1.596 | 2.068 | 230.6 |
| country-explicit-cn-flat-2190 | model-json-decode | python-prophet | 6 | 9.970 | 10.174 | 9.886 | 10.174 | 252.4 |
| country-explicit-cn-flat-2190 | model-json-encode | effect-prophet | 6 | 0.033 | 0.046 | 0.028 | 0.046 | 223.8 |
| country-explicit-cn-flat-2190 | model-json-encode | python-prophet | 6 | 3.283 | 3.339 | 3.273 | 3.339 | 252.4 |
| country-explicit-cn-flat-2190 | warm-fit | effect-prophet | 6 | 19.138 | 28.800 | 18.119 | 28.800 | 199.2 |
| country-explicit-cn-flat-2190 | warm-fit | python-prophet | 6 | 78.840 | 93.713 | 78.521 | 93.713 | 252.4 |
| country-explicit-cn-flat-2190 | warm-predict | effect-prophet | 6 | 3.402 | 3.853 | 3.173 | 3.853 | 216.5 |
| country-explicit-cn-flat-2190 | warm-predict | python-prophet | 6 | 9.319 | 9.448 | 9.207 | 9.448 | 252.4 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 169.242 | 174.397 | 167.595 | 174.397 | 200.7 |
| country-explicit-cn-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1422.675 | 1454.976 | 1411.751 | 1454.976 | 252.4 |
| country-explicit-cn-flat-730 | model-json-decode | effect-prophet | 6 | 0.940 | 1.649 | 0.786 | 1.649 | 199.0 |
| country-explicit-cn-flat-730 | model-json-decode | python-prophet | 6 | 5.691 | 6.268 | 5.654 | 6.268 | 252.4 |
| country-explicit-cn-flat-730 | model-json-encode | effect-prophet | 6 | 0.025 | 0.051 | 0.023 | 0.051 | 179.9 |
| country-explicit-cn-flat-730 | model-json-encode | python-prophet | 6 | 1.466 | 1.486 | 1.453 | 1.486 | 252.4 |
| country-explicit-cn-flat-730 | warm-fit | effect-prophet | 6 | 6.575 | 7.237 | 5.784 | 7.237 | 154.3 |
| country-explicit-cn-flat-730 | warm-fit | python-prophet | 6 | 20.614 | 21.074 | 20.359 | 21.074 | 252.4 |
| country-explicit-cn-flat-730 | warm-predict | effect-prophet | 6 | 2.734 | 3.045 | 2.292 | 3.045 | 161.7 |
| country-explicit-cn-flat-730 | warm-predict | python-prophet | 6 | 6.755 | 18.820 | 6.514 | 18.820 | 252.4 |
| country-explicit-empty-flat | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.012 | 0.016 | 128.8 |
| country-explicit-empty-flat | adapter-input-conversion | python-prophet | 6 | 0.474 | 0.502 | 0.463 | 0.502 | 252.4 |
| country-explicit-empty-flat | cold-first-forecast | effect-prophet | 6 | 152.598 | 157.617 | 152.313 | 157.617 | 145.9 |
| country-explicit-empty-flat | cold-first-forecast | python-prophet | 6 | 1415.950 | 1519.397 | 1410.571 | 1519.397 | 252.4 |
| country-explicit-empty-flat | fresh-process-restored-predict | effect-prophet | 6 | 149.824 | 151.884 | 147.703 | 151.884 | 146.1 |
| country-explicit-empty-flat | fresh-process-restored-predict | python-prophet | 6 | 1407.954 | 1430.721 | 1401.084 | 1430.721 | 252.4 |
| country-explicit-empty-flat | model-json-decode | effect-prophet | 6 | 0.074 | 0.087 | 0.061 | 0.087 | 146.1 |
| country-explicit-empty-flat | model-json-decode | python-prophet | 6 | 1.962 | 2.043 | 1.928 | 2.043 | 252.4 |
| country-explicit-empty-flat | model-json-encode | effect-prophet | 6 | 0.015 | 0.023 | 0.013 | 0.023 | 146.1 |
| country-explicit-empty-flat | model-json-encode | python-prophet | 6 | 0.409 | 0.483 | 0.383 | 0.483 | 252.4 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 0.899 | 2.363 | 0.754 | 2.363 | 145.8 |
| country-explicit-empty-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 10.732 | 12.299 | 10.639 | 12.299 | 252.4 |
| country-explicit-empty-flat | warm-fit-predict | effect-prophet | 6 | 0.891 | 0.966 | 0.819 | 0.966 | 137.6 |
| country-explicit-empty-flat | warm-fit-predict | python-prophet | 6 | 9.854 | 10.038 | 9.809 | 10.038 | 252.4 |
| country-explicit-empty-flat | warm-fit | effect-prophet | 6 | 1.246 | 2.360 | 0.839 | 2.360 | 134.2 |
| country-explicit-empty-flat | warm-fit | python-prophet | 6 | 7.221 | 7.554 | 7.150 | 7.554 | 252.4 |
| country-explicit-empty-flat | warm-predict | effect-prophet | 6 | 0.117 | 0.173 | 0.102 | 0.173 | 134.2 |
| country-explicit-empty-flat | warm-predict | python-prophet | 6 | 2.680 | 2.760 | 2.634 | 2.760 | 252.4 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 173.568 | 177.081 | 171.537 | 177.081 | 192.5 |
| country-explicit-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1455.418 | 1529.463 | 1428.985 | 1529.463 | 252.4 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 2.396 | 2.775 | 2.367 | 2.775 | 190.8 |
| country-explicit-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 7.419 | 9.371 | 7.021 | 9.371 | 252.4 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.055 | 0.082 | 0.044 | 0.082 | 174.9 |
| country-explicit-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 3.108 | 3.391 | 2.925 | 3.391 | 252.4 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 11.613 | 13.345 | 11.027 | 13.345 | 154.4 |
| country-explicit-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 42.931 | 59.329 | 41.404 | 59.329 | 252.4 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.373 | 0.402 | 0.365 | 0.402 | 155.5 |
| country-explicit-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 14.400 | 15.278 | 13.886 | 15.278 | 252.4 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 179.314 | 183.557 | 177.145 | 183.557 | 201.5 |
| country-explicit-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1514.254 | 1547.581 | 1431.776 | 1547.581 | 252.4 |
| country-explicit-se-flat-2190 | model-json-decode | effect-prophet | 6 | 2.809 | 2.995 | 2.785 | 2.995 | 199.2 |
| country-explicit-se-flat-2190 | model-json-decode | python-prophet | 6 | 7.942 | 10.964 | 7.236 | 10.964 | 252.4 |
| country-explicit-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.046 | 0.058 | 0.046 | 0.058 | 197.3 |
| country-explicit-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.952 | 3.363 | 2.950 | 3.363 | 252.4 |
| country-explicit-se-flat-2190 | warm-fit | effect-prophet | 6 | 13.036 | 14.815 | 12.015 | 14.815 | 170.2 |
| country-explicit-se-flat-2190 | warm-fit | python-prophet | 6 | 40.189 | 53.407 | 39.709 | 53.407 | 252.4 |
| country-explicit-se-flat-2190 | warm-predict | effect-prophet | 6 | 1.902 | 2.449 | 1.829 | 2.449 | 193.7 |
| country-explicit-se-flat-2190 | warm-predict | python-prophet | 6 | 13.936 | 17.733 | 13.344 | 17.733 | 252.4 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 171.723 | 178.108 | 169.862 | 178.108 | 175.5 |
| country-explicit-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1438.176 | 1505.476 | 1426.234 | 1505.476 | 252.4 |
| country-explicit-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.286 | 2.683 | 2.261 | 2.683 | 171.8 |
| country-explicit-se-flat-730 | model-json-decode | python-prophet | 6 | 5.144 | 5.337 | 5.022 | 5.337 | 252.4 |
| country-explicit-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.032 | 0.048 | 0.031 | 0.048 | 156.3 |
| country-explicit-se-flat-730 | model-json-encode | python-prophet | 6 | 1.460 | 1.495 | 1.432 | 1.495 | 252.4 |
| country-explicit-se-flat-730 | warm-fit | effect-prophet | 6 | 5.604 | 6.710 | 5.001 | 6.710 | 150.5 |
| country-explicit-se-flat-730 | warm-fit | python-prophet | 6 | 18.730 | 20.695 | 18.505 | 20.695 | 252.4 |
| country-explicit-se-flat-730 | warm-predict | effect-prophet | 6 | 2.036 | 2.472 | 1.873 | 2.472 | 154.8 |
| country-explicit-se-flat-730 | warm-predict | python-prophet | 6 | 8.972 | 9.189 | 8.928 | 9.189 | 252.4 |
| country-explicit-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.015 | 0.012 | 0.015 | 136.1 |
| country-explicit-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.490 | 0.519 | 0.461 | 0.519 | 252.4 |
| country-explicit-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 195.231 | 236.174 | 182.266 | 236.174 | 152.5 |
| country-explicit-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1437.465 | 1554.238 | 1423.372 | 1554.238 | 252.4 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 159.429 | 172.564 | 155.493 | 172.564 | 152.6 |
| country-explicit-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1414.054 | 1593.123 | 1405.347 | 1593.123 | 252.4 |
| country-explicit-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.459 | 0.543 | 0.399 | 0.543 | 152.5 |
| country-explicit-us-flat-additive | model-json-decode | python-prophet | 6 | 3.763 | 3.826 | 3.716 | 3.826 | 252.4 |
| country-explicit-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.029 | 0.041 | 0.018 | 0.041 | 152.5 |
| country-explicit-us-flat-additive | model-json-encode | python-prophet | 6 | 0.687 | 0.703 | 0.667 | 0.703 | 252.4 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 14.055 | 14.357 | 13.673 | 14.357 | 152.2 |
| country-explicit-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 26.619 | 28.223 | 24.862 | 28.223 | 252.4 |
| country-explicit-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 14.017 | 14.403 | 13.754 | 14.403 | 152.1 |
| country-explicit-us-flat-additive | warm-fit-predict | python-prophet | 6 | 25.392 | 26.543 | 24.401 | 26.543 | 252.4 |
| country-explicit-us-flat-additive | warm-fit | effect-prophet | 6 | 14.637 | 15.027 | 14.441 | 15.027 | 143.9 |
| country-explicit-us-flat-additive | warm-fit | python-prophet | 6 | 19.512 | 21.142 | 18.894 | 21.142 | 252.4 |
| country-explicit-us-flat-additive | warm-predict | effect-prophet | 6 | 0.201 | 0.252 | 0.178 | 0.252 | 146.4 |
| country-explicit-us-flat-additive | warm-predict | python-prophet | 6 | 4.788 | 6.571 | 4.671 | 6.571 | 252.4 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.024 | 0.013 | 0.024 | 135.6 |
| country-explicit-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.464 | 0.524 | 0.455 | 0.524 | 252.4 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 173.061 | 177.103 | 170.620 | 177.103 | 151.9 |
| country-explicit-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1480.432 | 1586.519 | 1418.312 | 1586.519 | 252.4 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 153.332 | 156.484 | 152.489 | 156.484 | 151.9 |
| country-explicit-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1432.697 | 1538.079 | 1419.977 | 1538.079 | 252.4 |
| country-explicit-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 0.417 | 0.440 | 0.374 | 0.440 | 151.9 |
| country-explicit-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.819 | 4.429 | 3.743 | 4.429 | 252.4 |
| country-explicit-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.021 | 0.030 | 0.021 | 0.030 | 151.9 |
| country-explicit-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.700 | 1.092 | 0.686 | 1.092 | 252.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 9.790 | 10.007 | 9.733 | 10.007 | 151.6 |
| country-explicit-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 17.824 | 20.701 | 15.682 | 20.701 | 252.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 9.978 | 10.190 | 9.882 | 10.190 | 151.4 |
| country-explicit-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 17.070 | 19.962 | 15.455 | 19.962 | 252.4 |
| country-explicit-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 10.685 | 12.251 | 10.180 | 12.251 | 142.8 |
| country-explicit-us-flat-multiplicative | warm-fit | python-prophet | 6 | 10.379 | 10.839 | 10.232 | 10.839 | 252.4 |
| country-explicit-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.204 | 0.318 | 0.179 | 0.318 | 145.2 |
| country-explicit-us-flat-multiplicative | warm-predict | python-prophet | 6 | 4.776 | 4.932 | 4.741 | 4.932 | 252.4 |
| country-mixed-us-flat | adapter-input-conversion | effect-prophet | 6 | 0.036 | 0.995 | 0.024 | 0.995 | 136.2 |
| country-mixed-us-flat | adapter-input-conversion | python-prophet | 6 | 0.525 | 0.539 | 0.501 | 0.539 | 252.4 |
| country-mixed-us-flat | cold-first-forecast | effect-prophet | 6 | 189.498 | 198.094 | 187.337 | 198.094 | 151.5 |
| country-mixed-us-flat | cold-first-forecast | python-prophet | 6 | 1611.416 | 1617.883 | 1600.954 | 1617.883 | 252.4 |
| country-mixed-us-flat | fresh-process-restored-predict | effect-prophet | 6 | 159.544 | 162.886 | 157.872 | 162.886 | 152.3 |
| country-mixed-us-flat | fresh-process-restored-predict | python-prophet | 6 | 1594.029 | 1707.458 | 1578.804 | 1707.458 | 252.4 |
| country-mixed-us-flat | model-json-decode | effect-prophet | 6 | 0.870 | 1.054 | 0.770 | 1.054 | 152.3 |
| country-mixed-us-flat | model-json-decode | python-prophet | 6 | 4.192 | 4.389 | 4.121 | 4.389 | 252.4 |
| country-mixed-us-flat | model-json-encode | effect-prophet | 6 | 0.107 | 0.222 | 0.093 | 0.222 | 152.3 |
| country-mixed-us-flat | model-json-encode | python-prophet | 6 | 0.727 | 0.751 | 0.717 | 0.751 | 252.4 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.646 | 18.982 | 18.325 | 18.982 | 151.3 |
| country-mixed-us-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 33.386 | 33.699 | 33.103 | 33.699 | 252.4 |
| country-mixed-us-flat | warm-fit-predict | effect-prophet | 6 | 18.738 | 19.428 | 18.518 | 19.428 | 150.6 |
| country-mixed-us-flat | warm-fit-predict | python-prophet | 6 | 32.867 | 33.193 | 32.437 | 33.193 | 252.4 |
| country-mixed-us-flat | warm-fit | effect-prophet | 6 | 19.282 | 20.997 | 18.934 | 20.997 | 148.3 |
| country-mixed-us-flat | warm-fit | python-prophet | 6 | 26.656 | 27.042 | 26.500 | 27.042 | 252.4 |
| country-mixed-us-flat | warm-predict | effect-prophet | 6 | 0.286 | 0.332 | 0.234 | 0.332 | 149.1 |
| country-mixed-us-flat | warm-predict | python-prophet | 6 | 6.330 | 6.452 | 6.224 | 6.452 | 252.4 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 160.447 | 172.331 | 158.436 | 172.331 | 149.9 |
| country-none-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1441.090 | 1454.113 | 1413.382 | 1454.113 | 252.4 |
| country-none-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 0.076 | 0.136 | 0.063 | 0.136 | 149.2 |
| country-none-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 4.593 | 4.766 | 4.480 | 4.766 | 252.4 |
| country-none-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | 148.5 |
| country-none-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.330 | 2.377 | 2.297 | 2.377 | 252.4 |
| country-none-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 6.920 | 9.297 | 6.098 | 9.297 | 147.5 |
| country-none-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 16.182 | 30.061 | 15.075 | 30.061 | 252.4 |
| country-none-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.177 | 0.190 | 0.148 | 0.190 | 148.0 |
| country-none-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 2.668 | 2.809 | 2.611 | 2.809 | 252.4 |
| country-none-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 165.130 | 191.486 | 163.155 | 191.486 | 169.6 |
| country-none-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1443.532 | 1501.338 | 1411.076 | 1501.338 | 252.4 |
| country-none-flat-2190 | model-json-decode | effect-prophet | 6 | 0.116 | 0.149 | 0.095 | 0.149 | 157.5 |
| country-none-flat-2190 | model-json-decode | python-prophet | 6 | 4.593 | 5.419 | 4.483 | 5.419 | 252.4 |
| country-none-flat-2190 | model-json-encode | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | 152.0 |
| country-none-flat-2190 | model-json-encode | python-prophet | 6 | 2.334 | 2.634 | 2.293 | 2.634 | 252.4 |
| country-none-flat-2190 | warm-fit | effect-prophet | 6 | 7.045 | 8.951 | 5.952 | 8.951 | 150.5 |
| country-none-flat-2190 | warm-fit | python-prophet | 6 | 16.178 | 32.726 | 14.864 | 32.726 | 252.4 |
| country-none-flat-2190 | warm-predict | effect-prophet | 6 | 1.210 | 1.566 | 1.197 | 1.566 | 151.5 |
| country-none-flat-2190 | warm-predict | python-prophet | 6 | 2.820 | 3.508 | 2.756 | 3.508 | 252.4 |
| country-none-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 160.867 | 163.541 | 158.229 | 163.541 | 147.4 |
| country-none-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1414.533 | 1419.131 | 1405.787 | 1419.131 | 252.4 |
| country-none-flat-730 | model-json-decode | effect-prophet | 6 | 0.067 | 0.126 | 0.059 | 0.126 | 146.6 |
| country-none-flat-730 | model-json-decode | python-prophet | 6 | 2.758 | 2.812 | 2.733 | 2.812 | 252.4 |
| country-none-flat-730 | model-json-encode | effect-prophet | 6 | 0.014 | 0.046 | 0.012 | 0.046 | 146.5 |
| country-none-flat-730 | model-json-encode | python-prophet | 6 | 1.003 | 1.010 | 0.990 | 1.010 | 252.4 |
| country-none-flat-730 | warm-fit | effect-prophet | 6 | 2.941 | 3.842 | 2.690 | 3.842 | 143.0 |
| country-none-flat-730 | warm-fit | python-prophet | 6 | 7.851 | 8.069 | 7.700 | 8.069 | 252.4 |
| country-none-flat-730 | warm-predict | effect-prophet | 6 | 1.251 | 1.379 | 1.199 | 1.379 | 145.8 |
| country-none-flat-730 | warm-predict | python-prophet | 6 | 2.827 | 2.895 | 2.789 | 2.895 | 252.4 |
| country-partial-in-flat | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.014 | 0.011 | 0.014 | 136.5 |
| country-partial-in-flat | adapter-input-conversion | python-prophet | 6 | 0.457 | 0.495 | 0.441 | 0.495 | 252.4 |
| country-partial-in-flat | cold-first-forecast | effect-prophet | 6 | 173.891 | 179.729 | 172.735 | 179.729 | 152.7 |
| country-partial-in-flat | cold-first-forecast | python-prophet | 6 | 1594.424 | 1720.157 | 1586.447 | 1720.157 | 252.4 |
| country-partial-in-flat | fresh-process-restored-predict | effect-prophet | 6 | 159.316 | 161.614 | 155.574 | 161.614 | 154.5 |
| country-partial-in-flat | fresh-process-restored-predict | python-prophet | 6 | 1592.348 | 1741.066 | 1582.150 | 1741.066 | 252.4 |
| country-partial-in-flat | model-json-decode | effect-prophet | 6 | 1.123 | 1.544 | 0.677 | 1.544 | 154.4 |
| country-partial-in-flat | model-json-decode | python-prophet | 6 | 2.981 | 3.173 | 2.913 | 3.173 | 252.4 |
| country-partial-in-flat | model-json-encode | effect-prophet | 6 | 0.090 | 0.108 | 0.080 | 0.108 | 152.7 |
| country-partial-in-flat | model-json-encode | python-prophet | 6 | 0.511 | 0.538 | 0.502 | 0.538 | 252.4 |
| country-partial-in-flat | warm-fit-predict-with-conversion | effect-prophet | 6 | 8.564 | 8.841 | 8.372 | 8.841 | 152.7 |
| country-partial-in-flat | warm-fit-predict-with-conversion | python-prophet | 6 | 18.980 | 19.351 | 18.743 | 19.351 | 252.4 |
| country-partial-in-flat | warm-fit-predict | effect-prophet | 6 | 8.895 | 8.993 | 8.754 | 8.993 | 151.7 |
| country-partial-in-flat | warm-fit-predict | python-prophet | 6 | 18.767 | 21.308 | 18.432 | 21.308 | 252.4 |
| country-partial-in-flat | warm-fit | effect-prophet | 6 | 9.973 | 10.687 | 9.349 | 10.687 | 149.0 |
| country-partial-in-flat | warm-fit | python-prophet | 6 | 13.468 | 13.790 | 13.214 | 13.790 | 252.4 |
| country-partial-in-flat | warm-predict | effect-prophet | 6 | 0.184 | 0.202 | 0.178 | 0.202 | 149.1 |
| country-partial-in-flat | warm-predict | python-prophet | 6 | 5.353 | 16.703 | 4.976 | 16.703 | 252.4 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | effect-prophet | 6 | 175.927 | 183.724 | 173.099 | 183.724 | 196.4 |
| country-se-flat-2190-batch-32 | fresh-process-restored-predict | python-prophet | 6 | 1709.529 | 1920.722 | 1660.492 | 1920.722 | 252.4 |
| country-se-flat-2190-batch-32 | model-json-decode | effect-prophet | 6 | 4.245 | 5.157 | 4.056 | 5.157 | 194.7 |
| country-se-flat-2190-batch-32 | model-json-decode | python-prophet | 6 | 5.787 | 5.993 | 5.690 | 5.993 | 252.4 |
| country-se-flat-2190-batch-32 | model-json-encode | effect-prophet | 6 | 0.311 | 0.342 | 0.270 | 0.342 | 191.7 |
| country-se-flat-2190-batch-32 | model-json-encode | python-prophet | 6 | 2.528 | 2.576 | 2.444 | 2.576 | 252.4 |
| country-se-flat-2190-batch-32 | warm-fit | effect-prophet | 6 | 15.896 | 20.154 | 14.405 | 20.154 | 179.0 |
| country-se-flat-2190-batch-32 | warm-fit | python-prophet | 6 | 42.493 | 43.126 | 42.431 | 43.126 | 252.4 |
| country-se-flat-2190-batch-32 | warm-predict | effect-prophet | 6 | 0.508 | 0.541 | 0.480 | 0.541 | 189.3 |
| country-se-flat-2190-batch-32 | warm-predict | python-prophet | 6 | 7.416 | 7.700 | 7.245 | 7.700 | 252.4 |
| country-se-flat-2190 | fresh-process-restored-predict | effect-prophet | 6 | 182.810 | 186.130 | 181.928 | 186.130 | 201.1 |
| country-se-flat-2190 | fresh-process-restored-predict | python-prophet | 6 | 1612.069 | 1635.708 | 1583.891 | 1635.708 | 252.4 |
| country-se-flat-2190 | model-json-decode | effect-prophet | 6 | 4.239 | 4.692 | 4.061 | 4.692 | 197.9 |
| country-se-flat-2190 | model-json-decode | python-prophet | 6 | 5.775 | 5.963 | 5.704 | 5.963 | 252.4 |
| country-se-flat-2190 | model-json-encode | effect-prophet | 6 | 0.308 | 0.332 | 0.276 | 0.332 | 196.2 |
| country-se-flat-2190 | model-json-encode | python-prophet | 6 | 2.531 | 2.551 | 2.444 | 2.551 | 252.4 |
| country-se-flat-2190 | warm-fit | effect-prophet | 6 | 16.187 | 17.764 | 15.795 | 17.764 | 183.5 |
| country-se-flat-2190 | warm-fit | python-prophet | 6 | 42.695 | 44.033 | 42.344 | 44.033 | 252.4 |
| country-se-flat-2190 | warm-predict | effect-prophet | 6 | 2.037 | 3.406 | 1.917 | 3.406 | 194.8 |
| country-se-flat-2190 | warm-predict | python-prophet | 6 | 8.846 | 9.224 | 8.651 | 9.224 | 252.4 |
| country-se-flat-730 | fresh-process-restored-predict | effect-prophet | 6 | 173.754 | 175.453 | 171.589 | 175.453 | 196.8 |
| country-se-flat-730 | fresh-process-restored-predict | python-prophet | 6 | 1581.656 | 1592.541 | 1574.279 | 1592.541 | 252.4 |
| country-se-flat-730 | model-json-decode | effect-prophet | 6 | 2.751 | 4.000 | 2.599 | 4.000 | 191.0 |
| country-se-flat-730 | model-json-decode | python-prophet | 6 | 4.029 | 4.121 | 3.968 | 4.121 | 252.4 |
| country-se-flat-730 | model-json-encode | effect-prophet | 6 | 0.286 | 0.299 | 0.246 | 0.299 | 188.5 |
| country-se-flat-730 | model-json-encode | python-prophet | 6 | 1.122 | 1.150 | 1.105 | 1.150 | 252.4 |
| country-se-flat-730 | warm-fit | effect-prophet | 6 | 7.885 | 8.716 | 6.899 | 8.716 | 150.5 |
| country-se-flat-730 | warm-fit | python-prophet | 6 | 20.893 | 21.504 | 20.630 | 21.504 | 252.4 |
| country-se-flat-730 | warm-predict | effect-prophet | 6 | 3.148 | 4.293 | 2.084 | 4.293 | 179.1 |
| country-se-flat-730 | warm-predict | python-prophet | 6 | 8.778 | 9.023 | 8.634 | 9.023 | 252.4 |
| country-uncertainty-us-flat | cold-first-uncertainty | effect-prophet | 6 | 184.437 | 186.614 | 182.937 | 186.614 | 138.8 |
| country-uncertainty-us-flat | cold-first-uncertainty | python-prophet | 6 | 1608.759 | 1662.935 | 1603.871 | 1662.935 | 252.4 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.923 | 161.491 | 158.101 | 161.491 | 148.8 |
| country-uncertainty-us-flat | fresh-process-restored-uncertainty | python-prophet | 6 | 1597.575 | 1676.833 | 1592.070 | 1676.833 | 252.4 |
| country-uncertainty-us-flat | model-json-decode | effect-prophet | 6 | 1.382 | 1.486 | 1.214 | 1.486 | 146.9 |
| country-uncertainty-us-flat | model-json-decode | python-prophet | 6 | 3.757 | 4.022 | 3.718 | 4.022 | 252.4 |
| country-uncertainty-us-flat | model-json-encode | effect-prophet | 6 | 0.123 | 0.159 | 0.115 | 0.159 | 142.2 |
| country-uncertainty-us-flat | model-json-encode | python-prophet | 6 | 0.684 | 1.026 | 0.673 | 1.026 | 252.4 |
| country-uncertainty-us-flat | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.013 | 0.016 | 132.7 |
| country-uncertainty-us-flat | uncertainty-input-conversion | python-prophet | 6 | 0.470 | 0.493 | 0.455 | 0.493 | 252.4 |
| country-uncertainty-us-flat | warm-uncertainty | effect-prophet | 6 | 0.303 | 0.383 | 0.267 | 0.383 | 136.3 |
| country-uncertainty-us-flat | warm-uncertainty | python-prophet | 6 | 14.447 | 15.149 | 14.150 | 15.149 | 252.4 |
| country-us-flat-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.020 | 0.013 | 0.020 | 137.6 |
| country-us-flat-additive | adapter-input-conversion | python-prophet | 6 | 0.485 | 0.801 | 0.466 | 0.801 | 252.4 |
| country-us-flat-additive | cold-first-forecast | effect-prophet | 6 | 178.818 | 187.250 | 177.333 | 187.250 | 152.5 |
| country-us-flat-additive | cold-first-forecast | python-prophet | 6 | 1673.116 | 1747.694 | 1603.471 | 1747.694 | 252.4 |
| country-us-flat-additive | fresh-process-restored-predict | effect-prophet | 6 | 163.533 | 202.748 | 153.595 | 202.748 | 154.9 |
| country-us-flat-additive | fresh-process-restored-predict | python-prophet | 6 | 1641.734 | 1772.031 | 1593.126 | 1772.031 | 252.4 |
| country-us-flat-additive | model-json-decode | effect-prophet | 6 | 0.953 | 1.009 | 0.934 | 1.009 | 154.9 |
| country-us-flat-additive | model-json-decode | python-prophet | 6 | 4.095 | 4.984 | 3.914 | 4.984 | 252.4 |
| country-us-flat-additive | model-json-encode | effect-prophet | 6 | 0.102 | 0.114 | 0.089 | 0.114 | 152.5 |
| country-us-flat-additive | model-json-encode | python-prophet | 6 | 0.771 | 1.623 | 0.734 | 1.623 | 252.4 |
| country-us-flat-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 14.122 | 15.979 | 14.064 | 15.979 | 152.5 |
| country-us-flat-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 28.765 | 33.246 | 27.842 | 33.246 | 252.4 |
| country-us-flat-additive | warm-fit-predict | effect-prophet | 6 | 14.424 | 14.786 | 14.373 | 14.786 | 150.3 |
| country-us-flat-additive | warm-fit-predict | python-prophet | 6 | 27.864 | 31.934 | 27.673 | 31.934 | 252.4 |
| country-us-flat-additive | warm-fit | effect-prophet | 6 | 15.602 | 16.167 | 14.695 | 16.167 | 149.6 |
| country-us-flat-additive | warm-fit | python-prophet | 6 | 24.074 | 25.419 | 22.809 | 25.419 | 252.4 |
| country-us-flat-additive | warm-predict | effect-prophet | 6 | 0.212 | 0.249 | 0.199 | 0.249 | 149.8 |
| country-us-flat-additive | warm-predict | python-prophet | 6 | 5.686 | 7.315 | 5.472 | 7.315 | 252.4 |
| country-us-flat-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.020 | 0.013 | 0.020 | 138.6 |
| country-us-flat-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.483 | 0.496 | 0.459 | 0.496 | 252.4 |
| country-us-flat-multiplicative | cold-first-forecast | effect-prophet | 6 | 180.031 | 187.767 | 178.370 | 187.767 | 153.2 |
| country-us-flat-multiplicative | cold-first-forecast | python-prophet | 6 | 1642.910 | 1722.034 | 1585.561 | 1722.034 | 252.4 |
| country-us-flat-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 161.819 | 167.801 | 158.368 | 167.801 | 153.8 |
| country-us-flat-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1592.764 | 1749.496 | 1574.084 | 1749.496 | 252.4 |
| country-us-flat-multiplicative | model-json-decode | effect-prophet | 6 | 1.003 | 1.858 | 0.844 | 1.858 | 153.8 |
| country-us-flat-multiplicative | model-json-decode | python-prophet | 6 | 3.801 | 4.244 | 3.706 | 4.244 | 252.4 |
| country-us-flat-multiplicative | model-json-encode | effect-prophet | 6 | 0.092 | 0.109 | 0.083 | 0.109 | 153.2 |
| country-us-flat-multiplicative | model-json-encode | python-prophet | 6 | 0.665 | 0.683 | 0.644 | 0.683 | 252.4 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 10.663 | 11.908 | 10.409 | 11.908 | 153.2 |
| country-us-flat-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 20.055 | 24.387 | 19.540 | 24.387 | 252.4 |
| country-us-flat-multiplicative | warm-fit-predict | effect-prophet | 6 | 10.921 | 11.481 | 10.792 | 11.481 | 151.3 |
| country-us-flat-multiplicative | warm-fit-predict | python-prophet | 6 | 19.347 | 22.028 | 19.110 | 22.028 | 252.4 |
| country-us-flat-multiplicative | warm-fit | effect-prophet | 6 | 12.044 | 12.893 | 11.278 | 12.893 | 150.7 |
| country-us-flat-multiplicative | warm-fit | python-prophet | 6 | 13.642 | 15.550 | 13.582 | 15.550 | 252.4 |
| country-us-flat-multiplicative | warm-predict | effect-prophet | 6 | 0.211 | 0.269 | 0.202 | 0.269 | 150.7 |
| country-us-flat-multiplicative | warm-predict | python-prophet | 6 | 5.534 | 5.805 | 5.473 | 5.805 | 252.4 |
| evaluation-flat-large-intervals | evaluation-intervals | effect-prophet | 4 | 6.917 | 11.818 | 6.764 | 11.818 | 148.6 |
| evaluation-flat-large-intervals | evaluation-intervals | python-prophet | 4 | 48.052 | 49.286 | 47.039 | 49.286 | 252.4 |
| evaluation-flat-large-point | cold-first-evaluation | effect-prophet | 4 | 179.037 | 180.482 | 178.615 | 180.482 | 153.0 |
| evaluation-flat-large-point | cold-first-evaluation | python-prophet | 4 | 1461.529 | 1474.852 | 1452.919 | 1474.852 | 252.4 |
| evaluation-flat-large-point | evaluation-baseline | effect-prophet | 4 | 2.701 | 5.876 | 2.643 | 5.876 | 150.9 |
| evaluation-flat-large-point | evaluation-baseline | python-prophet | 4 | 1.356 | 1.388 | 1.353 | 1.388 | 252.4 |
| evaluation-flat-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.135 | 0.143 | 0.128 | 0.143 | 124.4 |
| evaluation-flat-large-point | evaluation-input-conversion | python-prophet | 4 | 0.510 | 0.575 | 0.501 | 0.575 | 252.4 |
| evaluation-flat-large-point | evaluation-metrics | effect-prophet | 4 | 0.244 | 0.374 | 0.217 | 0.374 | 147.8 |
| evaluation-flat-large-point | evaluation-metrics | python-prophet | 4 | 5.394 | 5.490 | 5.383 | 5.490 | 252.4 |
| evaluation-flat-large-point | evaluation-plan | effect-prophet | 4 | 1.461 | 2.021 | 1.378 | 2.021 | 132.5 |
| evaluation-flat-large-point | evaluation-plan | python-prophet | 4 | 0.765 | 0.794 | 0.745 | 0.794 | 252.4 |
| evaluation-flat-large-point | evaluation-point | effect-prophet | 4 | 5.890 | 6.497 | 5.866 | 6.497 | 146.9 |
| evaluation-flat-large-point | evaluation-point | python-prophet | 4 | 38.560 | 39.861 | 37.826 | 39.861 | 252.4 |
| evaluation-flat-mixed-intervals | evaluation-intervals | effect-prophet | 4 | 6.928 | 7.436 | 6.411 | 7.436 | 147.9 |
| evaluation-flat-mixed-intervals | evaluation-intervals | python-prophet | 4 | 59.743 | 61.388 | 59.603 | 61.388 | 252.4 |
| evaluation-flat-mixed-point | cold-first-evaluation | effect-prophet | 4 | 175.109 | 179.877 | 174.397 | 179.877 | 148.0 |
| evaluation-flat-mixed-point | cold-first-evaluation | python-prophet | 4 | 1461.215 | 1487.896 | 1453.031 | 1487.896 | 252.4 |
| evaluation-flat-mixed-point | evaluation-baseline | effect-prophet | 4 | 1.252 | 1.689 | 1.248 | 1.689 | 148.0 |
| evaluation-flat-mixed-point | evaluation-baseline | python-prophet | 4 | 1.485 | 1.510 | 1.454 | 1.510 | 252.4 |
| evaluation-flat-mixed-point | evaluation-input-conversion | effect-prophet | 4 | 0.060 | 0.515 | 0.048 | 0.515 | 122.3 |
| evaluation-flat-mixed-point | evaluation-input-conversion | python-prophet | 4 | 0.425 | 0.485 | 0.416 | 0.485 | 252.4 |
| evaluation-flat-mixed-point | evaluation-metrics | effect-prophet | 4 | 0.239 | 0.431 | 0.214 | 0.431 | 147.4 |
| evaluation-flat-mixed-point | evaluation-metrics | python-prophet | 4 | 5.446 | 5.454 | 5.366 | 5.454 | 252.4 |
| evaluation-flat-mixed-point | evaluation-plan | effect-prophet | 4 | 1.418 | 1.821 | 1.407 | 1.821 | 127.8 |
| evaluation-flat-mixed-point | evaluation-plan | python-prophet | 4 | 0.792 | 0.818 | 0.759 | 0.818 | 252.4 |
| evaluation-flat-mixed-point | evaluation-point | effect-prophet | 4 | 6.084 | 7.434 | 5.633 | 7.434 | 146.8 |
| evaluation-flat-mixed-point | evaluation-point | python-prophet | 4 | 45.869 | 48.253 | 45.788 | 48.253 | 252.4 |
| evaluation-flat-mixed-search | evaluation-holdout | effect-prophet | 4 | 2.139 | 2.564 | 1.886 | 2.564 | 153.4 |
| evaluation-flat-mixed-search | evaluation-holdout | python-prophet | 4 | 13.001 | 13.158 | 12.939 | 13.158 | 252.4 |
| evaluation-flat-mixed-search | evaluation-report-decode | effect-prophet | 4 | 0.268 | 0.278 | 0.267 | 0.278 | 158.5 |
| evaluation-flat-mixed-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.005 | 0.006 | 252.4 |
| evaluation-flat-mixed-search | evaluation-report-encode | effect-prophet | 4 | 0.216 | 0.223 | 0.207 | 0.223 | 155.1 |
| evaluation-flat-mixed-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 252.4 |
| evaluation-flat-mixed-search | evaluation-search | effect-prophet | 4 | 12.912 | 14.140 | 12.283 | 14.140 | 152.4 |
| evaluation-flat-mixed-search | evaluation-search | python-prophet | 4 | 146.150 | 157.998 | 144.098 | 157.998 | 252.4 |
| flat-additive-components-large | adapter-input-conversion | effect-prophet | 4 | 0.040 | 0.045 | 0.040 | 0.045 | n/a |
| flat-additive-components-large | adapter-input-conversion | python-prophet | 4 | 0.657 | 0.718 | 0.630 | 0.718 | n/a |
| flat-additive-components-large | cold-first-forecast | effect-prophet | 4 | 170.153 | 176.234 | 168.470 | 176.234 | n/a |
| flat-additive-components-large | cold-first-forecast | python-prophet | 4 | 1533.213 | 1576.826 | 1434.395 | 1576.826 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | effect-prophet | 4 | 158.104 | 167.877 | 155.246 | 167.877 | n/a |
| flat-additive-components-large | fresh-process-restored-predict | python-prophet | 4 | 1564.746 | 1604.839 | 1561.126 | 1604.839 | n/a |
| flat-additive-components-large | model-json-decode | effect-prophet | 4 | 0.139 | 0.184 | 0.124 | 0.184 | n/a |
| flat-additive-components-large | model-json-decode | python-prophet | 4 | 4.112 | 5.108 | 3.902 | 5.108 | n/a |
| flat-additive-components-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.030 | 0.026 | 0.030 | n/a |
| flat-additive-components-large | model-json-encode | python-prophet | 4 | 0.879 | 0.930 | 0.878 | 0.930 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.734 | 3.099 | 2.135 | 3.099 | n/a |
| flat-additive-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.228 | 17.017 | 14.205 | 17.017 | n/a |
| flat-additive-components-large | warm-fit-predict | effect-prophet | 4 | 2.584 | 2.832 | 2.179 | 2.832 | n/a |
| flat-additive-components-large | warm-fit-predict | python-prophet | 4 | 13.722 | 16.406 | 13.452 | 16.406 | n/a |
| flat-additive-components-large | warm-fit | effect-prophet | 4 | 2.156 | 3.721 | 2.037 | 3.721 | n/a |
| flat-additive-components-large | warm-fit | python-prophet | 4 | 9.026 | 10.835 | 8.951 | 10.835 | n/a |
| flat-additive-components-large | warm-predict | effect-prophet | 4 | 0.470 | 0.973 | 0.424 | 0.973 | n/a |
| flat-additive-components-large | warm-predict | python-prophet | 4 | 4.706 | 5.337 | 4.689 | 5.337 | n/a |
| flat-additive-components | adapter-input-conversion | effect-prophet | 4 | 0.063 | 0.074 | 0.053 | 0.074 | n/a |
| flat-additive-components | adapter-input-conversion | python-prophet | 4 | 0.595 | 0.685 | 0.580 | 0.685 | n/a |
| flat-additive-components | cold-first-forecast | effect-prophet | 4 | 196.174 | 215.601 | 189.687 | 215.601 | n/a |
| flat-additive-components | cold-first-forecast | python-prophet | 4 | 1607.447 | 1621.055 | 1478.725 | 1621.055 | n/a |
| flat-additive-components | fresh-process-restored-predict | effect-prophet | 4 | 175.944 | 190.352 | 173.233 | 190.352 | n/a |
| flat-additive-components | fresh-process-restored-predict | python-prophet | 4 | 1456.194 | 1572.746 | 1426.390 | 1572.746 | n/a |
| flat-additive-components | model-json-decode | effect-prophet | 4 | 0.138 | 0.168 | 0.129 | 0.168 | n/a |
| flat-additive-components | model-json-decode | python-prophet | 4 | 3.696 | 3.969 | 3.487 | 3.969 | n/a |
| flat-additive-components | model-json-encode | effect-prophet | 4 | 0.022 | 0.030 | 0.022 | 0.030 | n/a |
| flat-additive-components | model-json-encode | python-prophet | 4 | 0.679 | 0.795 | 0.661 | 0.795 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.130 | 4.511 | 3.991 | 4.511 | n/a |
| flat-additive-components | warm-fit-predict-with-conversion | python-prophet | 4 | 21.772 | 23.896 | 21.099 | 23.896 | n/a |
| flat-additive-components | warm-fit-predict | effect-prophet | 4 | 4.311 | 4.611 | 4.249 | 4.611 | n/a |
| flat-additive-components | warm-fit-predict | python-prophet | 4 | 20.874 | 21.564 | 20.498 | 21.564 | n/a |
| flat-additive-components | warm-fit | effect-prophet | 4 | 4.674 | 5.457 | 4.630 | 5.457 | n/a |
| flat-additive-components | warm-fit | python-prophet | 4 | 15.546 | 16.386 | 14.821 | 16.386 | n/a |
| flat-additive-components | warm-predict | effect-prophet | 4 | 0.434 | 1.360 | 0.395 | 1.360 | n/a |
| flat-additive-components | warm-predict | python-prophet | 4 | 5.611 | 5.823 | 5.178 | 5.823 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.630 | 153.201 | 152.323 | 153.201 | n/a |
| flat-constant-absmax | fresh-process-restored-predict | python-prophet | 4 | 1601.843 | 1728.915 | 1518.974 | 1728.915 | n/a |
| flat-constant-absmax | model-json-decode | effect-prophet | 4 | 0.094 | 0.121 | 0.084 | 0.121 | n/a |
| flat-constant-absmax | model-json-decode | python-prophet | 4 | 2.055 | 2.632 | 1.978 | 2.632 | n/a |
| flat-constant-absmax | model-json-encode | effect-prophet | 4 | 0.015 | 0.024 | 0.015 | 0.024 | n/a |
| flat-constant-absmax | model-json-encode | python-prophet | 4 | 0.413 | 0.843 | 0.391 | 0.843 | n/a |
| flat-constant-absmax | warm-fit | effect-prophet | 4 | 1.117 | 1.195 | 1.098 | 1.195 | n/a |
| flat-constant-absmax | warm-fit | python-prophet | 4 | 3.184 | 3.517 | 3.072 | 3.517 | n/a |
| flat-constant-absmax | warm-predict | effect-prophet | 4 | 0.151 | 0.167 | 0.146 | 0.167 | n/a |
| flat-constant-absmax | warm-predict | python-prophet | 4 | 3.088 | 3.641 | 2.925 | 3.641 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.374 | 154.214 | 150.255 | 154.214 | n/a |
| flat-constant-minmax | fresh-process-restored-predict | python-prophet | 4 | 1621.697 | 1673.193 | 1594.138 | 1673.193 | n/a |
| flat-constant-minmax | model-json-decode | effect-prophet | 4 | 0.098 | 0.153 | 0.085 | 0.153 | n/a |
| flat-constant-minmax | model-json-decode | python-prophet | 4 | 2.017 | 5.334 | 1.923 | 5.334 | n/a |
| flat-constant-minmax | model-json-encode | effect-prophet | 4 | 0.016 | 0.021 | 0.016 | 0.021 | n/a |
| flat-constant-minmax | model-json-encode | python-prophet | 4 | 0.415 | 0.594 | 0.394 | 0.594 | n/a |
| flat-constant-minmax | warm-fit | effect-prophet | 4 | 1.157 | 1.331 | 1.107 | 1.331 | n/a |
| flat-constant-minmax | warm-fit | python-prophet | 4 | 3.410 | 4.215 | 3.219 | 4.215 | n/a |
| flat-constant-minmax | warm-predict | effect-prophet | 4 | 0.153 | 0.166 | 0.144 | 0.166 | n/a |
| flat-constant-minmax | warm-predict | python-prophet | 4 | 3.011 | 6.672 | 2.757 | 6.672 | n/a |
| flat-correlated-regressors | adapter-input-conversion | effect-prophet | 4 | 0.100 | 0.124 | 0.097 | 0.124 | n/a |
| flat-correlated-regressors | adapter-input-conversion | python-prophet | 4 | 0.946 | 1.003 | 0.910 | 1.003 | n/a |
| flat-correlated-regressors | cold-first-forecast | effect-prophet | 4 | 193.073 | 200.176 | 185.264 | 200.176 | n/a |
| flat-correlated-regressors | cold-first-forecast | python-prophet | 4 | 1519.586 | 1631.224 | 1506.118 | 1631.224 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | effect-prophet | 4 | 164.884 | 167.904 | 163.588 | 167.904 | n/a |
| flat-correlated-regressors | fresh-process-restored-predict | python-prophet | 4 | 1566.853 | 1604.715 | 1536.326 | 1604.715 | n/a |
| flat-correlated-regressors | model-json-decode | effect-prophet | 4 | 0.129 | 0.141 | 0.128 | 0.141 | n/a |
| flat-correlated-regressors | model-json-decode | python-prophet | 4 | 3.933 | 4.208 | 3.925 | 4.208 | n/a |
| flat-correlated-regressors | model-json-encode | effect-prophet | 4 | 0.021 | 0.027 | 0.021 | 0.027 | n/a |
| flat-correlated-regressors | model-json-encode | python-prophet | 4 | 1.243 | 1.335 | 1.223 | 1.335 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | effect-prophet | 4 | 6.722 | 7.814 | 6.705 | 7.814 | n/a |
| flat-correlated-regressors | warm-fit-predict-with-conversion | python-prophet | 4 | 31.155 | 35.362 | 30.815 | 35.362 | n/a |
| flat-correlated-regressors | warm-fit-predict | effect-prophet | 4 | 5.661 | 7.878 | 5.382 | 7.878 | n/a |
| flat-correlated-regressors | warm-fit-predict | python-prophet | 4 | 30.425 | 33.202 | 29.580 | 33.202 | n/a |
| flat-correlated-regressors | warm-fit | effect-prophet | 4 | 5.056 | 6.263 | 4.930 | 6.263 | n/a |
| flat-correlated-regressors | warm-fit | python-prophet | 4 | 28.204 | 28.288 | 25.836 | 28.288 | n/a |
| flat-correlated-regressors | warm-predict | effect-prophet | 4 | 0.936 | 1.085 | 0.893 | 1.085 | n/a |
| flat-correlated-regressors | warm-predict | python-prophet | 4 | 5.106 | 5.301 | 4.721 | 5.301 | n/a |
| flat-defaults-level | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.018 | 0.014 | 0.018 | n/a |
| flat-defaults-level | adapter-input-conversion | python-prophet | 6 | 0.472 | 0.513 | 0.465 | 0.513 | n/a |
| flat-defaults-level | cold-first-forecast | effect-prophet | 6 | 157.867 | 159.975 | 156.598 | 159.975 | n/a |
| flat-defaults-level | cold-first-forecast | python-prophet | 6 | 1414.141 | 1427.582 | 1413.502 | 1427.582 | n/a |
| flat-defaults-level | fresh-process-restored-predict | effect-prophet | 6 | 153.275 | 155.341 | 151.483 | 155.341 | n/a |
| flat-defaults-level | fresh-process-restored-predict | python-prophet | 6 | 1416.724 | 1437.580 | 1414.347 | 1437.580 | n/a |
| flat-defaults-level | model-json-decode | effect-prophet | 6 | 0.072 | 0.109 | 0.070 | 0.109 | n/a |
| flat-defaults-level | model-json-decode | python-prophet | 6 | 2.132 | 2.190 | 2.109 | 2.190 | n/a |
| flat-defaults-level | model-json-encode | effect-prophet | 6 | 0.022 | 0.047 | 0.016 | 0.047 | n/a |
| flat-defaults-level | model-json-encode | python-prophet | 6 | 0.427 | 0.453 | 0.424 | 0.453 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.285 | 2.588 | 1.258 | 2.588 | n/a |
| flat-defaults-level | warm-fit-predict-with-conversion | python-prophet | 6 | 12.280 | 12.452 | 12.153 | 12.452 | n/a |
| flat-defaults-level | warm-fit-predict | effect-prophet | 6 | 1.601 | 1.703 | 1.565 | 1.703 | n/a |
| flat-defaults-level | warm-fit-predict | python-prophet | 6 | 11.593 | 12.080 | 11.523 | 12.080 | n/a |
| flat-defaults-level | warm-fit | effect-prophet | 6 | 1.932 | 3.714 | 1.305 | 3.714 | n/a |
| flat-defaults-level | warm-fit | python-prophet | 6 | 8.883 | 11.495 | 8.464 | 11.495 | n/a |
| flat-defaults-level | warm-predict | effect-prophet | 6 | 0.172 | 0.499 | 0.162 | 0.499 | n/a |
| flat-defaults-level | warm-predict | python-prophet | 6 | 3.022 | 3.107 | 2.984 | 3.107 | n/a |
| flat-defaults-negative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.024 | 0.015 | 0.024 | n/a |
| flat-defaults-negative | adapter-input-conversion | python-prophet | 6 | 0.488 | 0.822 | 0.476 | 0.822 | n/a |
| flat-defaults-negative | cold-first-forecast | effect-prophet | 6 | 157.495 | 161.863 | 156.085 | 161.863 | n/a |
| flat-defaults-negative | cold-first-forecast | python-prophet | 6 | 1472.058 | 1573.982 | 1452.376 | 1573.982 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | effect-prophet | 6 | 153.936 | 164.071 | 153.465 | 164.071 | n/a |
| flat-defaults-negative | fresh-process-restored-predict | python-prophet | 6 | 1499.529 | 1591.142 | 1435.024 | 1591.142 | n/a |
| flat-defaults-negative | model-json-decode | effect-prophet | 6 | 0.085 | 0.111 | 0.071 | 0.111 | n/a |
| flat-defaults-negative | model-json-decode | python-prophet | 6 | 2.215 | 2.326 | 2.168 | 2.326 | n/a |
| flat-defaults-negative | model-json-encode | effect-prophet | 6 | 0.022 | 0.058 | 0.017 | 0.058 | n/a |
| flat-defaults-negative | model-json-encode | python-prophet | 6 | 0.461 | 0.545 | 0.430 | 0.545 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.248 | 2.415 | 1.244 | 2.415 | n/a |
| flat-defaults-negative | warm-fit-predict-with-conversion | python-prophet | 6 | 12.875 | 16.058 | 12.624 | 16.058 | n/a |
| flat-defaults-negative | warm-fit-predict | effect-prophet | 6 | 1.696 | 1.845 | 1.643 | 1.845 | n/a |
| flat-defaults-negative | warm-fit-predict | python-prophet | 6 | 12.249 | 15.864 | 12.115 | 15.864 | n/a |
| flat-defaults-negative | warm-fit | effect-prophet | 6 | 1.867 | 4.111 | 1.338 | 4.111 | n/a |
| flat-defaults-negative | warm-fit | python-prophet | 6 | 9.529 | 12.122 | 8.781 | 12.122 | n/a |
| flat-defaults-negative | warm-predict | effect-prophet | 6 | 0.172 | 0.272 | 0.158 | 0.272 | n/a |
| flat-defaults-negative | warm-predict | python-prophet | 6 | 3.157 | 4.121 | 3.059 | 4.121 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.024 | 0.013 | 0.024 | n/a |
| flat-defaults-seasonal | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.533 | 0.444 | 0.533 | n/a |
| flat-defaults-seasonal | cold-first-forecast | effect-prophet | 6 | 156.270 | 157.005 | 155.854 | 157.005 | n/a |
| flat-defaults-seasonal | cold-first-forecast | python-prophet | 6 | 1877.989 | 1994.368 | 1847.870 | 1994.368 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | effect-prophet | 6 | 152.113 | 154.942 | 150.337 | 154.942 | n/a |
| flat-defaults-seasonal | fresh-process-restored-predict | python-prophet | 6 | 1457.983 | 1558.037 | 1436.155 | 1558.037 | n/a |
| flat-defaults-seasonal | model-json-decode | effect-prophet | 6 | 0.076 | 0.111 | 0.070 | 0.111 | n/a |
| flat-defaults-seasonal | model-json-decode | python-prophet | 6 | 2.690 | 6.746 | 2.305 | 6.746 | n/a |
| flat-defaults-seasonal | model-json-encode | effect-prophet | 6 | 0.023 | 0.044 | 0.016 | 0.044 | n/a |
| flat-defaults-seasonal | model-json-encode | python-prophet | 6 | 0.461 | 0.482 | 0.428 | 0.482 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.286 | 2.729 | 1.240 | 2.729 | n/a |
| flat-defaults-seasonal | warm-fit-predict-with-conversion | python-prophet | 6 | 396.430 | 406.484 | 394.959 | 406.484 | n/a |
| flat-defaults-seasonal | warm-fit-predict | effect-prophet | 6 | 1.634 | 1.675 | 1.618 | 1.675 | n/a |
| flat-defaults-seasonal | warm-fit-predict | python-prophet | 6 | 392.016 | 413.545 | 391.712 | 413.545 | n/a |
| flat-defaults-seasonal | warm-fit | effect-prophet | 6 | 2.055 | 5.960 | 1.309 | 5.960 | n/a |
| flat-defaults-seasonal | warm-fit | python-prophet | 6 | 400.770 | 474.953 | 393.139 | 474.953 | n/a |
| flat-defaults-seasonal | warm-predict | effect-prophet | 6 | 0.164 | 0.736 | 0.150 | 0.736 | n/a |
| flat-defaults-seasonal | warm-predict | python-prophet | 6 | 3.227 | 3.844 | 3.094 | 3.844 | n/a |
| flat-level-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.371 | 157.179 | 153.279 | 157.179 | n/a |
| flat-level-absmax | fresh-process-restored-predict | python-prophet | 4 | 1507.758 | 1528.780 | 1461.187 | 1528.780 | n/a |
| flat-level-absmax | model-json-decode | effect-prophet | 4 | 0.085 | 0.121 | 0.082 | 0.121 | n/a |
| flat-level-absmax | model-json-decode | python-prophet | 4 | 1.960 | 2.040 | 1.901 | 2.040 | n/a |
| flat-level-absmax | model-json-encode | effect-prophet | 4 | 0.016 | 0.022 | 0.014 | 0.022 | n/a |
| flat-level-absmax | model-json-encode | python-prophet | 4 | 0.416 | 0.445 | 0.408 | 0.445 | n/a |
| flat-level-absmax | warm-fit | effect-prophet | 4 | 1.222 | 1.271 | 1.188 | 1.271 | n/a |
| flat-level-absmax | warm-fit | python-prophet | 4 | 5.425 | 6.441 | 4.910 | 6.441 | n/a |
| flat-level-absmax | warm-predict | effect-prophet | 4 | 0.152 | 0.169 | 0.146 | 0.169 | n/a |
| flat-level-absmax | warm-predict | python-prophet | 4 | 2.681 | 3.004 | 2.639 | 3.004 | n/a |
| flat-level-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.088 | 155.830 | 153.013 | 155.830 | n/a |
| flat-level-minmax | fresh-process-restored-predict | python-prophet | 4 | 1473.565 | 1644.926 | 1439.234 | 1644.926 | n/a |
| flat-level-minmax | model-json-decode | effect-prophet | 4 | 0.104 | 0.156 | 0.082 | 0.156 | n/a |
| flat-level-minmax | model-json-decode | python-prophet | 4 | 1.924 | 1.986 | 1.913 | 1.986 | n/a |
| flat-level-minmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.023 | 0.014 | 0.023 | n/a |
| flat-level-minmax | model-json-encode | python-prophet | 4 | 0.416 | 0.434 | 0.413 | 0.434 | n/a |
| flat-level-minmax | warm-fit | effect-prophet | 4 | 1.196 | 1.438 | 1.108 | 1.438 | n/a |
| flat-level-minmax | warm-fit | python-prophet | 4 | 5.123 | 5.353 | 4.853 | 5.353 | n/a |
| flat-level-minmax | warm-predict | effect-prophet | 4 | 0.157 | 0.166 | 0.151 | 0.166 | n/a |
| flat-level-minmax | warm-predict | python-prophet | 4 | 2.703 | 2.741 | 2.676 | 2.741 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | effect-prophet | 4 | 0.048 | 0.063 | 0.041 | 0.063 | n/a |
| flat-mixed-components-absmax-defaults | adapter-input-conversion | python-prophet | 4 | 0.576 | 1.222 | 0.546 | 1.222 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | effect-prophet | 4 | 172.426 | 192.868 | 172.149 | 192.868 | n/a |
| flat-mixed-components-absmax-defaults | cold-first-forecast | python-prophet | 4 | 1604.495 | 1634.546 | 1587.090 | 1634.546 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | effect-prophet | 4 | 168.951 | 172.246 | 164.048 | 172.246 | n/a |
| flat-mixed-components-absmax-defaults | fresh-process-restored-predict | python-prophet | 4 | 1525.610 | 1572.646 | 1495.630 | 1572.646 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | effect-prophet | 4 | 0.130 | 0.172 | 0.125 | 0.172 | n/a |
| flat-mixed-components-absmax-defaults | model-json-decode | python-prophet | 4 | 4.214 | 4.769 | 4.152 | 4.769 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | effect-prophet | 4 | 0.028 | 0.036 | 0.027 | 0.036 | n/a |
| flat-mixed-components-absmax-defaults | model-json-encode | python-prophet | 4 | 0.693 | 0.765 | 0.678 | 0.765 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | effect-prophet | 4 | 6.039 | 14.002 | 5.881 | 14.002 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict-with-conversion | python-prophet | 4 | 23.486 | 25.866 | 23.369 | 25.866 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | effect-prophet | 4 | 6.075 | 6.309 | 5.967 | 6.309 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit-predict | python-prophet | 4 | 22.504 | 23.395 | 22.205 | 23.395 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | effect-prophet | 4 | 6.497 | 6.533 | 6.471 | 6.533 | n/a |
| flat-mixed-components-absmax-defaults | warm-fit | python-prophet | 4 | 18.493 | 24.087 | 18.198 | 24.087 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | effect-prophet | 4 | 0.380 | 0.567 | 0.372 | 0.567 | n/a |
| flat-mixed-components-absmax-defaults | warm-predict | python-prophet | 4 | 5.273 | 9.565 | 5.110 | 9.565 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.960 | 158.304 | 154.416 | 158.304 | n/a |
| flat-mixed-components-absmax | fresh-process-restored-predict | python-prophet | 4 | 1407.689 | 1424.432 | 1405.968 | 1424.432 | n/a |
| flat-mixed-components-absmax | model-json-decode | effect-prophet | 4 | 0.205 | 0.301 | 0.197 | 0.301 | n/a |
| flat-mixed-components-absmax | model-json-decode | python-prophet | 4 | 3.497 | 3.625 | 3.490 | 3.625 | n/a |
| flat-mixed-components-absmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.048 | 0.021 | 0.048 | n/a |
| flat-mixed-components-absmax | model-json-encode | python-prophet | 4 | 0.660 | 0.752 | 0.647 | 0.752 | n/a |
| flat-mixed-components-absmax | warm-fit | effect-prophet | 4 | 1.524 | 3.689 | 1.385 | 3.689 | n/a |
| flat-mixed-components-absmax | warm-fit | python-prophet | 4 | 8.017 | 9.362 | 7.532 | 9.362 | n/a |
| flat-mixed-components-absmax | warm-predict | effect-prophet | 4 | 0.383 | 0.443 | 0.353 | 0.443 | n/a |
| flat-mixed-components-absmax | warm-predict | python-prophet | 4 | 4.783 | 4.828 | 4.760 | 4.828 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | effect-prophet | 4 | 175.266 | 192.383 | 172.459 | 192.383 | n/a |
| flat-mixed-components-large-absmax | fresh-process-restored-predict | python-prophet | 4 | 1461.595 | 1636.669 | 1460.711 | 1636.669 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | effect-prophet | 4 | 0.171 | 0.199 | 0.162 | 0.199 | n/a |
| flat-mixed-components-large-absmax | model-json-decode | python-prophet | 4 | 3.738 | 4.077 | 3.692 | 4.077 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.019 | 0.016 | 0.019 | n/a |
| flat-mixed-components-large-absmax | model-json-encode | python-prophet | 4 | 0.809 | 0.841 | 0.808 | 0.841 | n/a |
| flat-mixed-components-large-absmax | warm-fit | effect-prophet | 4 | 3.956 | 4.355 | 3.389 | 4.355 | n/a |
| flat-mixed-components-large-absmax | warm-fit | python-prophet | 4 | 9.033 | 10.156 | 8.810 | 10.156 | n/a |
| flat-mixed-components-large-absmax | warm-predict | effect-prophet | 4 | 0.461 | 0.533 | 0.445 | 0.533 | n/a |
| flat-mixed-components-large-absmax | warm-predict | python-prophet | 4 | 4.763 | 5.420 | 4.665 | 5.420 | n/a |
| flat-mixed-components-large | adapter-input-conversion | effect-prophet | 4 | 0.076 | 0.080 | 0.065 | 0.080 | n/a |
| flat-mixed-components-large | adapter-input-conversion | python-prophet | 4 | 0.682 | 0.713 | 0.652 | 0.713 | n/a |
| flat-mixed-components-large | cold-first-forecast | effect-prophet | 4 | 169.659 | 172.438 | 167.172 | 172.438 | n/a |
| flat-mixed-components-large | cold-first-forecast | python-prophet | 4 | 1487.790 | 1570.323 | 1453.337 | 1570.323 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | effect-prophet | 4 | 158.834 | 161.043 | 157.955 | 161.043 | n/a |
| flat-mixed-components-large | fresh-process-restored-predict | python-prophet | 4 | 1466.001 | 1590.418 | 1439.374 | 1590.418 | n/a |
| flat-mixed-components-large | model-json-decode | effect-prophet | 4 | 0.142 | 0.185 | 0.129 | 0.185 | n/a |
| flat-mixed-components-large | model-json-decode | python-prophet | 4 | 3.796 | 4.960 | 3.705 | 4.960 | n/a |
| flat-mixed-components-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.033 | 0.026 | 0.033 | n/a |
| flat-mixed-components-large | model-json-encode | python-prophet | 4 | 0.826 | 1.042 | 0.812 | 1.042 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 2.067 | 2.623 | 1.983 | 2.623 | n/a |
| flat-mixed-components-large | warm-fit-predict-with-conversion | python-prophet | 4 | 15.176 | 16.559 | 14.750 | 16.559 | n/a |
| flat-mixed-components-large | warm-fit-predict | effect-prophet | 4 | 3.381 | 4.264 | 2.791 | 4.264 | n/a |
| flat-mixed-components-large | warm-fit-predict | python-prophet | 4 | 14.017 | 15.334 | 13.932 | 15.334 | n/a |
| flat-mixed-components-large | warm-fit | effect-prophet | 4 | 2.563 | 3.855 | 2.200 | 3.855 | n/a |
| flat-mixed-components-large | warm-fit | python-prophet | 4 | 9.409 | 11.584 | 9.366 | 11.584 | n/a |
| flat-mixed-components-large | warm-predict | effect-prophet | 4 | 0.489 | 0.903 | 0.488 | 0.903 | n/a |
| flat-mixed-components-large | warm-predict | python-prophet | 4 | 4.910 | 5.173 | 4.815 | 5.173 | n/a |
| flat-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.052 | 0.062 | 0.050 | 0.062 | n/a |
| flat-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.554 | 0.808 | 0.534 | 0.808 | n/a |
| flat-mixed-components | cold-first-forecast | effect-prophet | 4 | 165.911 | 167.424 | 164.290 | 167.424 | n/a |
| flat-mixed-components | cold-first-forecast | python-prophet | 4 | 1447.051 | 1547.108 | 1426.469 | 1547.108 | n/a |
| flat-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 155.924 | 156.874 | 155.697 | 156.874 | n/a |
| flat-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1520.337 | 1616.170 | 1505.693 | 1616.170 | n/a |
| flat-mixed-components | model-json-decode | effect-prophet | 4 | 0.122 | 0.129 | 0.119 | 0.129 | n/a |
| flat-mixed-components | model-json-decode | python-prophet | 4 | 3.567 | 3.781 | 3.451 | 3.781 | n/a |
| flat-mixed-components | model-json-encode | effect-prophet | 4 | 0.025 | 0.032 | 0.025 | 0.032 | n/a |
| flat-mixed-components | model-json-encode | python-prophet | 4 | 0.653 | 0.661 | 0.643 | 0.661 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 1.111 | 1.145 | 1.068 | 1.145 | n/a |
| flat-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 13.304 | 18.869 | 13.260 | 18.869 | n/a |
| flat-mixed-components | warm-fit-predict | effect-prophet | 4 | 1.315 | 1.839 | 1.293 | 1.839 | n/a |
| flat-mixed-components | warm-fit-predict | python-prophet | 4 | 12.335 | 17.006 | 12.149 | 17.006 | n/a |
| flat-mixed-components | warm-fit | effect-prophet | 4 | 1.447 | 1.773 | 1.346 | 1.773 | n/a |
| flat-mixed-components | warm-fit | python-prophet | 4 | 9.835 | 10.000 | 8.097 | 10.000 | n/a |
| flat-mixed-components | warm-predict | effect-prophet | 4 | 0.388 | 1.093 | 0.386 | 1.093 | n/a |
| flat-mixed-components | warm-predict | python-prophet | 4 | 4.807 | 5.677 | 4.769 | 5.677 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.202 | 155.190 | 152.182 | 155.190 | n/a |
| flat-negative-absmax | fresh-process-restored-predict | python-prophet | 4 | 1569.570 | 1614.050 | 1564.089 | 1614.050 | n/a |
| flat-negative-absmax | model-json-decode | effect-prophet | 4 | 0.120 | 0.124 | 0.083 | 0.124 | n/a |
| flat-negative-absmax | model-json-decode | python-prophet | 4 | 2.072 | 2.544 | 2.003 | 2.544 | n/a |
| flat-negative-absmax | model-json-encode | effect-prophet | 4 | 0.015 | 0.020 | 0.014 | 0.020 | n/a |
| flat-negative-absmax | model-json-encode | python-prophet | 4 | 0.447 | 0.466 | 0.432 | 0.466 | n/a |
| flat-negative-absmax | warm-fit | effect-prophet | 4 | 1.190 | 1.379 | 1.161 | 1.379 | n/a |
| flat-negative-absmax | warm-fit | python-prophet | 4 | 6.105 | 7.034 | 5.489 | 7.034 | n/a |
| flat-negative-absmax | warm-predict | effect-prophet | 4 | 0.152 | 0.164 | 0.146 | 0.164 | n/a |
| flat-negative-absmax | warm-predict | python-prophet | 4 | 2.954 | 3.296 | 2.866 | 3.296 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.818 | 157.074 | 149.131 | 157.074 | n/a |
| flat-negative-minmax | fresh-process-restored-predict | python-prophet | 4 | 1448.937 | 1496.475 | 1448.610 | 1496.475 | n/a |
| flat-negative-minmax | model-json-decode | effect-prophet | 4 | 0.107 | 0.160 | 0.083 | 0.160 | n/a |
| flat-negative-minmax | model-json-decode | python-prophet | 4 | 1.926 | 2.005 | 1.925 | 2.005 | n/a |
| flat-negative-minmax | model-json-encode | effect-prophet | 4 | 0.016 | 0.021 | 0.014 | 0.021 | n/a |
| flat-negative-minmax | model-json-encode | python-prophet | 4 | 0.418 | 0.443 | 0.415 | 0.443 | n/a |
| flat-negative-minmax | warm-fit | effect-prophet | 4 | 1.236 | 1.427 | 1.133 | 1.427 | n/a |
| flat-negative-minmax | warm-fit | python-prophet | 4 | 5.615 | 5.894 | 5.270 | 5.894 | n/a |
| flat-negative-minmax | warm-predict | effect-prophet | 4 | 0.157 | 0.165 | 0.144 | 0.165 | n/a |
| flat-negative-minmax | warm-predict | python-prophet | 4 | 2.798 | 2.860 | 2.732 | 2.860 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.741 | 159.862 | 154.825 | 159.862 | n/a |
| flat-prefix-225-absmax | fresh-process-restored-predict | python-prophet | 4 | 1411.701 | 1440.360 | 1406.367 | 1440.360 | n/a |
| flat-prefix-225-absmax | model-json-decode | effect-prophet | 4 | 0.183 | 0.264 | 0.180 | 0.264 | n/a |
| flat-prefix-225-absmax | model-json-decode | python-prophet | 4 | 3.683 | 3.728 | 3.622 | 3.728 | n/a |
| flat-prefix-225-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.030 | 0.016 | 0.030 | n/a |
| flat-prefix-225-absmax | model-json-encode | python-prophet | 4 | 0.780 | 0.793 | 0.766 | 0.793 | n/a |
| flat-prefix-225-absmax | warm-fit | effect-prophet | 4 | 2.908 | 3.098 | 2.879 | 3.098 | n/a |
| flat-prefix-225-absmax | warm-fit | python-prophet | 4 | 8.519 | 8.624 | 8.356 | 8.624 | n/a |
| flat-prefix-225-absmax | warm-predict | effect-prophet | 4 | 0.142 | 0.159 | 0.139 | 0.159 | n/a |
| flat-prefix-225-absmax | warm-predict | python-prophet | 4 | 4.699 | 4.812 | 4.660 | 4.812 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | effect-prophet | 4 | 176.681 | 213.712 | 172.177 | 213.712 | n/a |
| flat-prefix-225-minmax | fresh-process-restored-predict | python-prophet | 4 | 1500.975 | 1645.253 | 1437.987 | 1645.253 | n/a |
| flat-prefix-225-minmax | model-json-decode | effect-prophet | 4 | 0.206 | 0.395 | 0.203 | 0.395 | n/a |
| flat-prefix-225-minmax | model-json-decode | python-prophet | 4 | 3.709 | 3.751 | 3.661 | 3.751 | n/a |
| flat-prefix-225-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.127 | 0.016 | 0.127 | n/a |
| flat-prefix-225-minmax | model-json-encode | python-prophet | 4 | 0.783 | 0.791 | 0.776 | 0.791 | n/a |
| flat-prefix-225-minmax | warm-fit | effect-prophet | 4 | 3.775 | 4.658 | 3.418 | 4.658 | n/a |
| flat-prefix-225-minmax | warm-fit | python-prophet | 4 | 9.914 | 10.042 | 9.592 | 10.042 | n/a |
| flat-prefix-225-minmax | warm-predict | effect-prophet | 4 | 0.143 | 0.190 | 0.131 | 0.190 | n/a |
| flat-prefix-225-minmax | warm-predict | python-prophet | 4 | 4.916 | 5.297 | 4.791 | 5.297 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | effect-prophet | 4 | 171.731 | 175.468 | 168.460 | 175.468 | n/a |
| flat-prefix-232-absmax | fresh-process-restored-predict | python-prophet | 4 | 1426.305 | 1488.820 | 1420.637 | 1488.820 | n/a |
| flat-prefix-232-absmax | model-json-decode | effect-prophet | 4 | 0.204 | 0.218 | 0.190 | 0.218 | n/a |
| flat-prefix-232-absmax | model-json-decode | python-prophet | 4 | 3.676 | 3.724 | 3.649 | 3.724 | n/a |
| flat-prefix-232-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.034 | 0.020 | 0.034 | n/a |
| flat-prefix-232-absmax | model-json-encode | python-prophet | 4 | 0.783 | 0.798 | 0.767 | 0.798 | n/a |
| flat-prefix-232-absmax | warm-fit | effect-prophet | 4 | 3.275 | 3.652 | 3.232 | 3.652 | n/a |
| flat-prefix-232-absmax | warm-fit | python-prophet | 4 | 8.648 | 8.765 | 8.560 | 8.765 | n/a |
| flat-prefix-232-absmax | warm-predict | effect-prophet | 4 | 0.154 | 0.178 | 0.144 | 0.178 | n/a |
| flat-prefix-232-absmax | warm-predict | python-prophet | 4 | 4.640 | 4.741 | 4.632 | 4.741 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | effect-prophet | 4 | 180.150 | 189.879 | 179.534 | 189.879 | n/a |
| flat-prefix-232-minmax | fresh-process-restored-predict | python-prophet | 4 | 1419.863 | 1542.915 | 1418.043 | 1542.915 | n/a |
| flat-prefix-232-minmax | model-json-decode | effect-prophet | 4 | 0.202 | 0.230 | 0.185 | 0.230 | n/a |
| flat-prefix-232-minmax | model-json-decode | python-prophet | 4 | 3.623 | 3.732 | 3.619 | 3.732 | n/a |
| flat-prefix-232-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.031 | 0.020 | 0.031 | n/a |
| flat-prefix-232-minmax | model-json-encode | python-prophet | 4 | 0.779 | 0.816 | 0.750 | 0.816 | n/a |
| flat-prefix-232-minmax | warm-fit | effect-prophet | 4 | 3.202 | 3.973 | 3.013 | 3.973 | n/a |
| flat-prefix-232-minmax | warm-fit | python-prophet | 4 | 8.821 | 8.934 | 8.814 | 8.934 | n/a |
| flat-prefix-232-minmax | warm-predict | effect-prophet | 4 | 0.140 | 0.184 | 0.136 | 0.184 | n/a |
| flat-prefix-232-minmax | warm-predict | python-prophet | 4 | 4.692 | 4.832 | 4.682 | 4.832 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.012 | 160.317 | 153.594 | 160.317 | n/a |
| flat-prefix-63-absmax | fresh-process-restored-predict | python-prophet | 4 | 1434.725 | 1519.661 | 1427.832 | 1519.661 | n/a |
| flat-prefix-63-absmax | model-json-decode | effect-prophet | 4 | 0.219 | 0.243 | 0.218 | 0.243 | n/a |
| flat-prefix-63-absmax | model-json-decode | python-prophet | 4 | 3.501 | 3.570 | 3.456 | 3.570 | n/a |
| flat-prefix-63-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.022 | 0.017 | 0.022 | n/a |
| flat-prefix-63-absmax | model-json-encode | python-prophet | 4 | 0.623 | 0.640 | 0.620 | 0.640 | n/a |
| flat-prefix-63-absmax | warm-fit | effect-prophet | 4 | 1.878 | 3.270 | 1.753 | 3.270 | n/a |
| flat-prefix-63-absmax | warm-fit | python-prophet | 4 | 7.270 | 8.004 | 7.154 | 8.004 | n/a |
| flat-prefix-63-absmax | warm-predict | effect-prophet | 4 | 0.160 | 0.194 | 0.154 | 0.194 | n/a |
| flat-prefix-63-absmax | warm-predict | python-prophet | 4 | 4.804 | 4.979 | 4.742 | 4.979 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.278 | 159.222 | 153.880 | 159.222 | n/a |
| flat-prefix-63-minmax | fresh-process-restored-predict | python-prophet | 4 | 1480.681 | 1484.318 | 1475.414 | 1484.318 | n/a |
| flat-prefix-63-minmax | model-json-decode | effect-prophet | 4 | 0.227 | 0.253 | 0.213 | 0.253 | n/a |
| flat-prefix-63-minmax | model-json-decode | python-prophet | 4 | 3.461 | 3.614 | 3.394 | 3.614 | n/a |
| flat-prefix-63-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.021 | 0.017 | 0.021 | n/a |
| flat-prefix-63-minmax | model-json-encode | python-prophet | 4 | 0.625 | 0.649 | 0.618 | 0.649 | n/a |
| flat-prefix-63-minmax | warm-fit | effect-prophet | 4 | 1.910 | 3.141 | 1.776 | 3.141 | n/a |
| flat-prefix-63-minmax | warm-fit | python-prophet | 4 | 7.240 | 7.890 | 7.187 | 7.890 | n/a |
| flat-prefix-63-minmax | warm-predict | effect-prophet | 4 | 0.169 | 0.263 | 0.164 | 0.263 | n/a |
| flat-prefix-63-minmax | warm-predict | python-prophet | 4 | 4.718 | 4.750 | 4.702 | 4.750 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.388 | 163.275 | 155.791 | 163.275 | n/a |
| flat-prefix-70-absmax | fresh-process-restored-predict | python-prophet | 4 | 1456.177 | 1463.157 | 1449.713 | 1463.157 | n/a |
| flat-prefix-70-absmax | model-json-decode | effect-prophet | 4 | 0.223 | 0.249 | 0.212 | 0.249 | n/a |
| flat-prefix-70-absmax | model-json-decode | python-prophet | 4 | 3.525 | 3.827 | 3.443 | 3.827 | n/a |
| flat-prefix-70-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.031 | 0.020 | 0.031 | n/a |
| flat-prefix-70-absmax | model-json-encode | python-prophet | 4 | 0.626 | 0.646 | 0.625 | 0.646 | n/a |
| flat-prefix-70-absmax | warm-fit | effect-prophet | 4 | 2.593 | 2.952 | 1.828 | 2.952 | n/a |
| flat-prefix-70-absmax | warm-fit | python-prophet | 4 | 8.323 | 9.057 | 7.328 | 9.057 | n/a |
| flat-prefix-70-absmax | warm-predict | effect-prophet | 4 | 0.181 | 0.204 | 0.167 | 0.204 | n/a |
| flat-prefix-70-absmax | warm-predict | python-prophet | 4 | 4.898 | 5.078 | 4.775 | 5.078 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.257 | 159.674 | 155.643 | 159.674 | n/a |
| flat-prefix-70-minmax | fresh-process-restored-predict | python-prophet | 4 | 1422.274 | 1427.399 | 1415.229 | 1427.399 | n/a |
| flat-prefix-70-minmax | model-json-decode | effect-prophet | 4 | 0.216 | 0.243 | 0.214 | 0.243 | n/a |
| flat-prefix-70-minmax | model-json-decode | python-prophet | 4 | 3.422 | 3.548 | 3.420 | 3.548 | n/a |
| flat-prefix-70-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.021 | 0.022 | n/a |
| flat-prefix-70-minmax | model-json-encode | python-prophet | 4 | 0.662 | 0.911 | 0.622 | 0.911 | n/a |
| flat-prefix-70-minmax | warm-fit | effect-prophet | 4 | 1.844 | 2.660 | 1.742 | 2.660 | n/a |
| flat-prefix-70-minmax | warm-fit | python-prophet | 4 | 7.281 | 7.896 | 7.121 | 7.896 | n/a |
| flat-prefix-70-minmax | warm-predict | effect-prophet | 4 | 0.156 | 0.172 | 0.149 | 0.172 | n/a |
| flat-prefix-70-minmax | warm-predict | python-prophet | 4 | 4.731 | 4.928 | 4.683 | 4.928 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.939 | 158.901 | 156.764 | 158.901 | n/a |
| flat-prefix-77-absmax | fresh-process-restored-predict | python-prophet | 4 | 1413.246 | 1418.399 | 1410.002 | 1418.399 | n/a |
| flat-prefix-77-absmax | model-json-decode | effect-prophet | 4 | 0.221 | 0.240 | 0.202 | 0.240 | n/a |
| flat-prefix-77-absmax | model-json-decode | python-prophet | 4 | 3.460 | 3.610 | 3.402 | 3.610 | n/a |
| flat-prefix-77-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.024 | 0.019 | 0.024 | n/a |
| flat-prefix-77-absmax | model-json-encode | python-prophet | 4 | 0.630 | 0.634 | 0.622 | 0.634 | n/a |
| flat-prefix-77-absmax | warm-fit | effect-prophet | 4 | 1.852 | 2.758 | 1.303 | 2.758 | n/a |
| flat-prefix-77-absmax | warm-fit | python-prophet | 4 | 7.848 | 9.720 | 7.164 | 9.720 | n/a |
| flat-prefix-77-absmax | warm-predict | effect-prophet | 4 | 0.170 | 0.215 | 0.161 | 0.215 | n/a |
| flat-prefix-77-absmax | warm-predict | python-prophet | 4 | 4.725 | 4.773 | 4.690 | 4.773 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.693 | 160.429 | 153.924 | 160.429 | n/a |
| flat-prefix-77-minmax | fresh-process-restored-predict | python-prophet | 4 | 1411.672 | 1417.198 | 1409.950 | 1417.198 | n/a |
| flat-prefix-77-minmax | model-json-decode | effect-prophet | 4 | 0.220 | 0.241 | 0.214 | 0.241 | n/a |
| flat-prefix-77-minmax | model-json-decode | python-prophet | 4 | 3.448 | 3.532 | 3.372 | 3.532 | n/a |
| flat-prefix-77-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.026 | 0.019 | 0.026 | n/a |
| flat-prefix-77-minmax | model-json-encode | python-prophet | 4 | 0.627 | 0.652 | 0.611 | 0.652 | n/a |
| flat-prefix-77-minmax | warm-fit | effect-prophet | 4 | 1.377 | 3.454 | 1.368 | 3.454 | n/a |
| flat-prefix-77-minmax | warm-fit | python-prophet | 4 | 7.356 | 7.940 | 7.281 | 7.940 | n/a |
| flat-prefix-77-minmax | warm-predict | effect-prophet | 4 | 0.164 | 0.212 | 0.151 | 0.212 | n/a |
| flat-prefix-77-minmax | warm-predict | python-prophet | 4 | 4.689 | 4.746 | 4.649 | 4.746 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.516 | 155.065 | 154.502 | 155.065 | n/a |
| flat-seasonal-absmax | fresh-process-restored-predict | python-prophet | 4 | 1440.382 | 1528.797 | 1430.778 | 1528.797 | n/a |
| flat-seasonal-absmax | model-json-decode | effect-prophet | 4 | 0.119 | 0.142 | 0.107 | 0.142 | n/a |
| flat-seasonal-absmax | model-json-decode | python-prophet | 4 | 2.045 | 2.141 | 1.998 | 2.141 | n/a |
| flat-seasonal-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.072 | 0.017 | 0.072 | n/a |
| flat-seasonal-absmax | model-json-encode | python-prophet | 4 | 0.419 | 0.429 | 0.398 | 0.429 | n/a |
| flat-seasonal-absmax | warm-fit | effect-prophet | 4 | 1.602 | 2.078 | 1.599 | 2.078 | n/a |
| flat-seasonal-absmax | warm-fit | python-prophet | 4 | 6.042 | 6.761 | 5.790 | 6.761 | n/a |
| flat-seasonal-absmax | warm-predict | effect-prophet | 4 | 0.172 | 0.177 | 0.164 | 0.177 | n/a |
| flat-seasonal-absmax | warm-predict | python-prophet | 4 | 3.113 | 3.153 | 3.074 | 3.153 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.284 | 156.878 | 153.101 | 156.878 | n/a |
| flat-seasonal-minmax | fresh-process-restored-predict | python-prophet | 4 | 1425.718 | 1472.257 | 1423.806 | 1472.257 | n/a |
| flat-seasonal-minmax | model-json-decode | effect-prophet | 4 | 0.115 | 0.143 | 0.108 | 0.143 | n/a |
| flat-seasonal-minmax | model-json-decode | python-prophet | 4 | 2.052 | 2.098 | 1.969 | 2.098 | n/a |
| flat-seasonal-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.028 | 0.017 | 0.028 | n/a |
| flat-seasonal-minmax | model-json-encode | python-prophet | 4 | 0.449 | 0.473 | 0.424 | 0.473 | n/a |
| flat-seasonal-minmax | warm-fit | effect-prophet | 4 | 1.722 | 1.745 | 1.645 | 1.745 | n/a |
| flat-seasonal-minmax | warm-fit | python-prophet | 4 | 5.769 | 6.390 | 5.757 | 6.390 | n/a |
| flat-seasonal-minmax | warm-predict | effect-prophet | 4 | 0.169 | 0.186 | 0.160 | 0.186 | n/a |
| flat-seasonal-minmax | warm-predict | python-prophet | 4 | 3.146 | 3.237 | 3.061 | 3.237 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 151.698 | 154.764 | 151.261 | 154.764 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1534.831 | 1583.359 | 1513.459 | 1583.359 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.135 | 0.162 | 0.114 | 0.162 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 1.933 | 2.213 | 1.867 | 2.213 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.025 | 0.028 | 0.017 | 0.028 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.336 | 0.346 | 0.323 | 0.346 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.489 | 0.512 | 0.462 | 0.512 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 2.979 | 3.839 | 2.873 | 3.839 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.115 | 0.157 | 0.107 | 0.157 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.761 | 3.055 | 2.643 | 3.055 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 153.405 | 158.779 | 152.253 | 158.779 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1410.185 | 1497.962 | 1404.001 | 1497.962 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.131 | 0.187 | 0.119 | 0.187 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 1.885 | 1.935 | 1.818 | 1.935 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.025 | 0.030 | 0.021 | 0.030 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.325 | 0.349 | 0.322 | 0.349 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.485 | 0.538 | 0.482 | 0.538 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 5.357 | 5.486 | 5.294 | 5.486 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.121 | 0.135 | 0.106 | 0.135 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 2.668 | 2.721 | 2.638 | 2.721 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 167.141 | 170.249 | 165.080 | 170.249 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1937.059 | 1961.043 | 1927.986 | 1961.043 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.017 | 165.066 | 160.794 | 165.066 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1552.296 | 1566.305 | 1547.769 | 1566.305 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.137 | 0.170 | 0.127 | 0.170 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-decode | python-prophet | 6 | 2.160 | 2.304 | 2.097 | 2.304 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.022 | 0.029 | 0.018 | 0.029 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | model-json-encode | python-prophet | 6 | 0.429 | 0.437 | 0.417 | 0.437 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.028 | 0.036 | 0.024 | 0.036 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.516 | 0.538 | 0.505 | 0.538 | n/a |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 4.448 | 4.781 | 4.281 | 4.781 | 134.0 |
| uncertainty-flat-defaults-seasonal-intervals-1000 | warm-uncertainty | python-prophet | 6 | 124.186 | 135.995 | 120.685 | 135.995 | 252.4 |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 166.054 | 170.902 | 165.627 | 170.902 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1518.790 | 1571.881 | 1509.690 | 1571.881 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 158.471 | 163.135 | 154.926 | 163.135 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1505.122 | 1528.534 | 1498.776 | 1528.534 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.228 | 0.438 | 0.201 | 0.438 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-decode | python-prophet | 6 | 3.466 | 3.654 | 3.422 | 3.654 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.021 | 0.030 | 0.019 | 0.030 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.634 | 0.680 | 0.628 | 0.680 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.046 | 0.078 | 0.043 | 0.078 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.548 | 0.581 | 0.527 | 0.581 | n/a |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.947 | 1.464 | 0.766 | 1.464 | 133.7 |
| uncertainty-flat-mixed-components-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 71.232 | 72.320 | 70.740 | 72.320 | 252.4 |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 167.888 | 169.418 | 165.266 | 169.418 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1446.657 | 1464.101 | 1438.463 | 1464.101 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.875 | 167.219 | 160.075 | 167.219 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1433.537 | 1469.022 | 1431.172 | 1469.022 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.175 | 0.422 | 0.163 | 0.422 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-decode | python-prophet | 6 | 3.684 | 3.774 | 3.666 | 3.774 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.028 | 0.016 | 0.028 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | model-json-encode | python-prophet | 6 | 0.799 | 0.804 | 0.785 | 0.804 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.073 | 0.080 | 0.040 | 0.080 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.649 | 0.668 | 0.646 | 0.668 | n/a |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 1.212 | 2.227 | 1.172 | 2.227 | 145.0 |
| uncertainty-flat-mixed-components-large-full-samples-128 | warm-uncertainty | python-prophet | 6 | 19.976 | 32.919 | 19.384 | 32.919 | 252.4 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `3495187941a358227641e3c27fd1dc6602b1f96f`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:63bcd28b405bd9562482d4dad56cb4c04d26a520fb2c193f7695937290e30522`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:dd23f2a2f63224aebf0f4bd6ab4e9f68dc44c64f3dedf4214bc6c3086c8ebf50`

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

