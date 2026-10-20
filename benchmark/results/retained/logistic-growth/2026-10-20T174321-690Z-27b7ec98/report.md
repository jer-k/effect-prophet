# Effect Prophet benchmark — 2026-10-20T174321-690Z-27b7ec98

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| country-us-logistic-additive | equivalent-objective | passed | 1.167e-11 | 3.583e-12 | 3.583e-12 | 1.525e-11 | 2.174e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-logistic-additive | equivalent-objective | passed | 1.167e-11 | 3.583e-12 | 3.583e-12 | 1.525e-11 | 2.174e-13 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-us-logistic-multiplicative | equivalent-objective | passed | 2.675e-9 | 1.628e-9 | 0.000e+0 | 5.343e-9 | 2.181e-10 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-logistic-multiplicative | equivalent-objective | passed | 2.675e-9 | 1.628e-9 | 0.000e+0 | 5.343e-9 | 2.181e-10 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-absmax | equivalent-objective | passed | 1.180e-11 | 2.829e-13 | 2.829e-13 | 1.208e-11 | 1.994e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-minmax | equivalent-objective | passed | 1.958e-11 | 3.144e-13 | 3.144e-13 | 1.930e-11 | 3.199e-12 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-explicit-floor-absmax | equivalent-objective | passed | 1.369e-11 | 3.264e-13 | 3.264e-13 | 1.384e-11 | 7.563e-15 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-explicit-floor-minmax | equivalent-objective | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-auto-changepoints | equivalent-objective | passed | 2.389e-11 | 2.405e-13 | 2.405e-13 | 2.396e-11 | 1.941e-13 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-implicit-floor-large | equivalent-objective | passed | 2.251e-6 | 2.106e-5 | 2.106e-5 | 2.322e-5 | 3.759e-4 | n/a | Verified equivalent behavior for this configuration under evidence logistic-map-v1. Output-first: investigate internal fit differences in stationarity-residual. |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | scalar-process-different-public-work | passed | 1.285e-2 | 1.480e-4 | 1.480e-4 | 1.281e-2 | 1.323e-3 | 0.440 | Verified fitted point behavior under logistic-python-reconciliation-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | scalar-process-different-public-work | passed | 1.285e-2 | 1.480e-4 | 1.480e-4 | 1.281e-2 | 1.323e-3 | 0.482 | Verified fitted point behavior under logistic-python-reconciliation-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | scalar-process-different-public-work | passed | 1.958e-11 | 3.144e-13 | 3.144e-13 | 1.930e-11 | 3.199e-12 | 0.082 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | scalar-process-different-public-work | passed | 2.251e-6 | 2.106e-5 | 2.106e-5 | 2.322e-5 | 3.759e-4 | 0.094 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in stationarity-residual. |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | scalar-process-different-public-work | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | 0.007 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | scalar-process-different-public-work | passed | 1.150e-11 | 3.535e-13 | 5.685e-14 | 1.148e-11 | 2.243e-13 | 0.022 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | scalar-process-different-public-work | passed | 1.775e-11 | 1.187e-12 | 1.111e-12 | 1.774e-11 | 6.954e-14 | 0.022 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | scalar-process-different-public-work | passed | 1.775e-11 | 1.187e-12 | 1.111e-12 | 1.774e-11 | 6.954e-14 | 0.022 | Verified fitted point behavior under logistic-map-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| evaluation-logistic-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| logistic-reconcile-basic-96-empty-absmax | equivalent-objective | passed | 3.905e-8 | 0.000e+0 | 0.000e+0 | 3.905e-8 | 1.179e-11 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-explicit-absmax | equivalent-objective | passed | 2.399e-11 | 0.000e+0 | 0.000e+0 | 2.399e-11 | 2.577e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-auto-absmax | equivalent-objective | passed | 1.273e-11 | 0.000e+0 | 0.000e+0 | 1.273e-11 | 3.247e-15 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-empty-minmax | equivalent-objective | passed | 1.559e-10 | 0.000e+0 | 0.000e+0 | 1.559e-10 | 9.770e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-explicit-minmax | equivalent-objective | passed | 3.867e-11 | 0.000e+0 | 0.000e+0 | 3.867e-11 | 2.794e-12 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-96-auto-minmax | equivalent-objective | passed | 2.374e-9 | 0.000e+0 | 0.000e+0 | 2.374e-9 | 9.145e-11 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-empty-loose-prior-absmax | equivalent-objective | passed | 9.034e-9 | 0.000e+0 | 0.000e+0 | 9.034e-9 | 3.456e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-empty-loose-prior-minmax | equivalent-objective | passed | 1.397e-11 | 0.000e+0 | 0.000e+0 | 1.397e-11 | 3.443e-12 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-99 | equivalent-objective | passed | 3.772e-11 | 0.000e+0 | 0.000e+0 | 3.772e-11 | 5.922e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-100 | equivalent-objective | passed | 4.670e-11 | 0.000e+0 | 0.000e+0 | 4.670e-11 | 4.095e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-basic-256 | equivalent-objective | passed | 2.169e-11 | 0.000e+0 | 0.000e+0 | 2.169e-11 | 4.034e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-defaults-96 | equivalent-objective | passed | 2.965e-9 | 2.560e-10 | 2.560e-10 | 3.077e-9 | 1.086e-10 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-defaults-256 | equivalent-objective | passed | 1.133e-3 | 1.273e-5 | 1.273e-5 | 1.122e-3 | 7.028e-4 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| logistic-reconcile-defaults-rate-changes | equivalent-objective | passed | 1.285e-2 | 1.480e-4 | 1.480e-4 | 1.281e-2 | 1.323e-3 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| logistic-reconcile-weekly | equivalent-objective | passed | 5.460e-8 | 3.208e-8 | 3.208e-8 | 8.668e-8 | 5.013e-9 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-conditional | equivalent-objective | passed | 4.785e-11 | 4.619e-13 | 4.619e-13 | 4.808e-11 | 2.232e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-event | equivalent-objective | passed | 3.766e-11 | 4.705e-12 | 4.705e-12 | 4.074e-11 | 2.844e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-regressor-additive | equivalent-objective | passed | 1.130e-11 | 1.915e-12 | 1.915e-12 | 1.133e-11 | 1.733e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-regressor-multiplicative | equivalent-objective | passed | 4.558e-11 | 4.103e-12 | 0.000e+0 | 4.840e-11 | 4.628e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-explicit-floor-absmax | equivalent-objective | passed | 4.539e-11 | 0.000e+0 | 0.000e+0 | 4.539e-11 | 2.362e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-mixed-absmax | equivalent-objective | passed | 4.205e-11 | 3.521e-12 | 3.561e-12 | 4.330e-11 | 1.402e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-explicit-floor-minmax | equivalent-objective | passed | 3.185e-11 | 0.000e+0 | 0.000e+0 | 3.185e-11 | 1.549e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-mixed-minmax | equivalent-objective | passed | 4.333e-11 | 3.867e-12 | 3.997e-12 | 4.559e-11 | 2.427e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-unsorted | equivalent-objective | passed | 2.399e-11 | 0.000e+0 | 0.000e+0 | 2.399e-11 | 2.577e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-duplicates | equivalent-objective | passed | 2.563e-11 | 0.000e+0 | 0.000e+0 | 2.563e-11 | 2.678e-14 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-declining | equivalent-objective | passed | 3.874e-11 | 0.000e+0 | 0.000e+0 | 3.874e-11 | 6.897e-15 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-saturated | equivalent-objective | passed | 1.005e-9 | 0.000e+0 | 0.000e+0 | 1.005e-9 | 2.266e-10 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-constant | equivalent-objective | passed | 7.894e-12 | 0.000e+0 | 0.000e+0 | 7.894e-12 | 4.140e-12 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |
| logistic-reconcile-out-of-bounds | equivalent-objective | passed | 4.331e-8 | 0.000e+0 | 0.000e+0 | 4.331e-8 | 4.639e-8 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Output-first: internal fit evidence is reported, not gated. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-logistic-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12550 | 27746 |
| country-us-logistic-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12550 | 27746 |
| country-explicit-us-logistic-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3831 | 30562 |
| country-explicit-us-logistic-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3831 | 30562 |
| country-us-logistic-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12570 | 27760 |
| country-us-logistic-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12570 | 27760 |
| country-explicit-us-logistic-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3839 | 30576 |
| country-explicit-us-logistic-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3839 | 30576 |

## Stationarity diagnostics

Constrained normalized infinity-norm residuals at independently fitted endpoints, not a same-point gradient comparison. Deltas within the Laplace kink tolerance use the subgradient interval on both sides. Equality-gate rows bound the absolute difference. Output-first rows never gate eligibility; they are flagged for investigation when Effect's residual exceeds Python's by more than the declared threshold. Diagnostic-only rows do not certify near-stationarity; EP-097 owns that deferred requirement. Forecast, component, metadata, persistence and applicable uncertainty gates always apply; density and normalized noise also gate except under output-first.

| Case | Run | Effect residual | Python residual | Absolute difference | Policy | Follow-up |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| country-us-logistic-additive | 0 | 8.287845e-1 | 8.287845e-1 | 4.044807e-8 | output-first | n/a |
| country-us-logistic-additive | 1 | 8.287845e-1 | 8.287845e-1 | 4.044807e-8 | output-first | n/a |
| country-explicit-us-logistic-additive | 0 | 8.287845e-1 | 8.287845e-1 | 4.044807e-8 | output-first | n/a |
| country-explicit-us-logistic-additive | 1 | 8.287845e-1 | 8.287845e-1 | 4.044807e-8 | output-first | n/a |
| country-us-logistic-multiplicative | 0 | 1.828999e-1 | 1.828964e-1 | 3.470091e-6 | output-first | n/a |
| country-us-logistic-multiplicative | 1 | 1.828999e-1 | 1.828964e-1 | 3.470091e-6 | output-first | n/a |
| country-explicit-us-logistic-multiplicative | 0 | 1.828999e-1 | 1.828964e-1 | 3.470091e-6 | output-first | n/a |
| country-explicit-us-logistic-multiplicative | 1 | 1.828999e-1 | 1.828964e-1 | 3.470091e-6 | output-first | n/a |
| logistic-implicit-floor-absmax | 0 | 2.775607e+0 | 2.775607e+0 | 6.245631e-8 | output-first | n/a |
| logistic-implicit-floor-absmax | 1 | 2.775607e+0 | 2.775607e+0 | 6.245631e-8 | output-first | n/a |
| logistic-implicit-floor-minmax | 0 | 3.856188e-1 | 3.856187e-1 | 9.671451e-8 | output-first | n/a |
| logistic-implicit-floor-minmax | 1 | 3.856188e-1 | 3.856187e-1 | 9.671451e-8 | output-first | n/a |
| logistic-explicit-floor-absmax | 0 | 2.998344e+0 | 2.998344e+0 | 1.578685e-8 | output-first | n/a |
| logistic-explicit-floor-absmax | 1 | 2.998344e+0 | 2.998344e+0 | 1.578685e-8 | output-first | n/a |
| logistic-explicit-floor-minmax | 0 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| logistic-explicit-floor-minmax | 1 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| logistic-implicit-floor-auto-changepoints | 0 | 2.795426e-1 | 2.795426e-1 | 1.026899e-8 | output-first | n/a |
| logistic-implicit-floor-auto-changepoints | 1 | 2.795426e-1 | 2.795426e-1 | 1.026899e-8 | output-first | n/a |
| logistic-implicit-floor-large | 0 | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | output-first | n/a |
| logistic-implicit-floor-large | 1 | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | output-first | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 0 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 1 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 0 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 1 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | 0 | 3.856188e-1 | 3.856187e-1 | 9.671451e-8 | output-first | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | 1 | 3.856188e-1 | 3.856187e-1 | 9.671451e-8 | output-first | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 0 | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | output-first | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 1 | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | 0 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | 1 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | 0 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | 1 | 2.559238e+0 | 2.559238e+0 | 5.105636e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | 0 | 2.424968e+0 | 2.424969e+0 | 1.662717e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | 1 | 2.424968e+0 | 2.424969e+0 | 1.662717e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | 0 | 2.424968e+0 | 2.424969e+0 | 1.662717e-7 | output-first | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | 1 | 2.424968e+0 | 2.424969e+0 | 1.662717e-7 | output-first | n/a |
| logistic-reconcile-basic-96-empty-absmax | 0 | 5.596132e+1 | 5.596157e+1 | 2.453791e-4 | output-first | n/a |
| logistic-reconcile-basic-96-empty-absmax | 1 | 5.596132e+1 | 5.596157e+1 | 2.453791e-4 | output-first | n/a |
| logistic-reconcile-basic-96-explicit-absmax | 0 | 1.162613e+1 | 1.162613e+1 | 1.306350e-7 | output-first | n/a |
| logistic-reconcile-basic-96-explicit-absmax | 1 | 1.162613e+1 | 1.162613e+1 | 1.306350e-7 | output-first | n/a |
| logistic-reconcile-basic-96-auto-absmax | 0 | 5.778612e+0 | 5.778612e+0 | 1.073255e-8 | output-first | n/a |
| logistic-reconcile-basic-96-auto-absmax | 1 | 5.778612e+0 | 5.778612e+0 | 1.073255e-8 | output-first | n/a |
| logistic-reconcile-basic-96-empty-minmax | 0 | 3.851771e-2 | 3.851771e-2 | 4.093843e-10 | output-first | n/a |
| logistic-reconcile-basic-96-empty-minmax | 1 | 3.851771e-2 | 3.851771e-2 | 4.093843e-10 | output-first | n/a |
| logistic-reconcile-basic-96-explicit-minmax | 0 | 2.627372e-1 | 2.627371e-1 | 4.410863e-8 | output-first | n/a |
| logistic-reconcile-basic-96-explicit-minmax | 1 | 2.627372e-1 | 2.627371e-1 | 4.410863e-8 | output-first | n/a |
| logistic-reconcile-basic-96-auto-minmax | 0 | 7.819626e-1 | 7.819642e-1 | 1.545846e-6 | output-first | n/a |
| logistic-reconcile-basic-96-auto-minmax | 1 | 7.819626e-1 | 7.819642e-1 | 1.545846e-6 | output-first | n/a |
| logistic-reconcile-empty-loose-prior-absmax | 0 | 2.334662e+0 | 2.334678e+0 | 1.559136e-5 | output-first | n/a |
| logistic-reconcile-empty-loose-prior-absmax | 1 | 2.334662e+0 | 2.334678e+0 | 1.559136e-5 | output-first | n/a |
| logistic-reconcile-empty-loose-prior-minmax | 0 | 5.898676e-2 | 5.898682e-2 | 5.426538e-8 | output-first | n/a |
| logistic-reconcile-empty-loose-prior-minmax | 1 | 5.898676e-2 | 5.898682e-2 | 5.426538e-8 | output-first | n/a |
| logistic-reconcile-basic-99 | 0 | 6.445543e+0 | 6.445544e+0 | 3.002141e-7 | output-first | n/a |
| logistic-reconcile-basic-99 | 1 | 6.445543e+0 | 6.445544e+0 | 3.002141e-7 | output-first | n/a |
| logistic-reconcile-basic-100 | 0 | 9.730062e+1 | 9.730062e+1 | 2.132167e-7 | output-first | n/a |
| logistic-reconcile-basic-100 | 1 | 9.730062e+1 | 9.730062e+1 | 2.132167e-7 | output-first | n/a |
| logistic-reconcile-basic-256 | 0 | 1.724594e+1 | 1.724585e+1 | 8.251495e-5 | output-first | n/a |
| logistic-reconcile-basic-256 | 1 | 1.724594e+1 | 1.724585e+1 | 8.251495e-5 | output-first | n/a |
| logistic-reconcile-defaults-96 | 0 | 7.692917e+0 | 7.692919e+0 | 1.480945e-6 | output-first | n/a |
| logistic-reconcile-defaults-96 | 1 | 7.692917e+0 | 7.692919e+0 | 1.480945e-6 | output-first | n/a |
| logistic-reconcile-defaults-256 | 0 | 8.818191e+3 | 1.349278e+3 | 7.468913e+3 | output-first | n/a |
| logistic-reconcile-defaults-256 | 1 | 8.818191e+3 | 1.349278e+3 | 7.468913e+3 | output-first | n/a |
| logistic-reconcile-defaults-rate-changes | 0 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| logistic-reconcile-defaults-rate-changes | 1 | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | output-first | n/a |
| logistic-reconcile-weekly | 0 | 1.541596e-3 | 3.019356e-2 | 2.865197e-2 | output-first | n/a |
| logistic-reconcile-weekly | 1 | 1.541596e-3 | 3.019356e-2 | 2.865197e-2 | output-first | n/a |
| logistic-reconcile-conditional | 0 | 2.659943e-2 | 2.660012e-2 | 6.835484e-7 | output-first | n/a |
| logistic-reconcile-conditional | 1 | 2.659943e-2 | 2.660012e-2 | 6.835484e-7 | output-first | n/a |
| logistic-reconcile-event | 0 | 3.346656e+0 | 3.346656e+0 | 1.451913e-7 | output-first | n/a |
| logistic-reconcile-event | 1 | 3.346656e+0 | 3.346656e+0 | 1.451913e-7 | output-first | n/a |
| logistic-reconcile-regressor-additive | 0 | 2.139794e-2 | 2.139802e-2 | 7.703051e-8 | output-first | n/a |
| logistic-reconcile-regressor-additive | 1 | 2.139794e-2 | 2.139802e-2 | 7.703051e-8 | output-first | n/a |
| logistic-reconcile-regressor-multiplicative | 0 | 3.828836e-1 | 3.828834e-1 | 2.333604e-7 | output-first | n/a |
| logistic-reconcile-regressor-multiplicative | 1 | 3.828836e-1 | 3.828834e-1 | 2.333604e-7 | output-first | n/a |
| logistic-reconcile-explicit-floor-absmax | 0 | 2.905198e-3 | 2.905296e-3 | 9.777836e-8 | output-first | n/a |
| logistic-reconcile-explicit-floor-absmax | 1 | 2.905198e-3 | 2.905296e-3 | 9.777836e-8 | output-first | n/a |
| logistic-reconcile-mixed-absmax | 0 | 3.549139e+0 | 3.549139e+0 | 3.679589e-8 | output-first | n/a |
| logistic-reconcile-mixed-absmax | 1 | 3.549139e+0 | 3.549139e+0 | 3.679589e-8 | output-first | n/a |
| logistic-reconcile-explicit-floor-minmax | 0 | 1.667647e-3 | 1.624910e-3 | 4.273681e-5 | output-first | n/a |
| logistic-reconcile-explicit-floor-minmax | 1 | 1.667647e-3 | 1.624910e-3 | 4.273681e-5 | output-first | n/a |
| logistic-reconcile-mixed-minmax | 0 | 4.698194e+0 | 4.698195e+0 | 7.219327e-8 | output-first | n/a |
| logistic-reconcile-mixed-minmax | 1 | 4.698194e+0 | 4.698195e+0 | 7.219327e-8 | output-first | n/a |
| logistic-reconcile-unsorted | 0 | 1.162613e+1 | 1.162613e+1 | 1.306350e-7 | output-first | n/a |
| logistic-reconcile-unsorted | 1 | 1.162613e+1 | 1.162613e+1 | 1.306350e-7 | output-first | n/a |
| logistic-reconcile-duplicates | 0 | 6.305502e-3 | 6.305381e-3 | 1.217013e-7 | output-first | n/a |
| logistic-reconcile-duplicates | 1 | 6.305502e-3 | 6.305381e-3 | 1.217013e-7 | output-first | n/a |
| logistic-reconcile-declining | 0 | 3.123213e-3 | 3.150439e-3 | 2.722630e-5 | output-first | n/a |
| logistic-reconcile-declining | 1 | 3.123213e-3 | 3.150439e-3 | 2.722630e-5 | output-first | n/a |
| logistic-reconcile-saturated | 0 | 2.054553e+1 | 2.054664e+1 | 1.118189e-3 | output-first | n/a |
| logistic-reconcile-saturated | 1 | 2.054553e+1 | 2.054664e+1 | 1.118189e-3 | output-first | n/a |
| logistic-reconcile-constant | 0 | 3.285123e+1 | 3.285234e+1 | 1.112908e-3 | output-first | n/a |
| logistic-reconcile-constant | 1 | 3.285123e+1 | 3.285234e+1 | 1.112908e-3 | output-first | n/a |
| logistic-reconcile-out-of-bounds | 0 | 1.200530e+0 | 1.200504e+0 | 2.595364e-5 | output-first | n/a |
| logistic-reconcile-out-of-bounds | 1 | 1.200530e+0 | 1.200504e+0 | 2.595364e-5 | output-first | n/a |

## Output-first investigation flags

Internal fit evidence that differs from Python beyond its declared investigation threshold. These rows do not fail the case: fitted outputs gate eligibility. Each flag should be explained in validation notes. Stationarity is flagged only when Effect's residual exceeds Python's.

| Case | Run | Quantity | Effect | Python | Effect - Python | Threshold |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| logistic-implicit-floor-large | 0 | stationarity-residual | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | 1.000e-2 |
| logistic-implicit-floor-large | 1 | stationarity-residual | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 0 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 0 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 1 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 1 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 0 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 0 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 1 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 1 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 0 | stationarity-residual | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | 1.000e-2 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 1 | stationarity-residual | 1.081047e+2 | 4.444100e+0 | 1.036606e+2 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 0 | objective | -1.786030e+3 | -1.786061e+3 | 3.122188e-2 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 0 | stationarity-residual | 8.818191e+3 | 1.349278e+3 | 7.468913e+3 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 1 | objective | -1.786030e+3 | -1.786061e+3 | 3.122188e-2 | 1.000e-2 |
| logistic-reconcile-defaults-256 | 1 | stationarity-residual | 8.818191e+3 | 1.349278e+3 | 7.468913e+3 | 1.000e-2 |
| logistic-reconcile-defaults-rate-changes | 0 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| logistic-reconcile-defaults-rate-changes | 0 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |
| logistic-reconcile-defaults-rate-changes | 1 | objective | -1.686726e+3 | -1.686763e+3 | 3.682862e-2 | 1.000e-2 |
| logistic-reconcile-defaults-rate-changes | 1 | stationarity-residual | 2.088102e+2 | 2.007674e+2 | 8.042825e+0 | 1.000e-2 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | 365 | 6 | 25 | 455 | 455 | 90 | 1000 | intervals | 67108864 | logistic-rate-changes-v1:logit=-3+6t|1.5t|4t@0.35,0.65+weekly+bounded-noise-x10:changing-capacity:n=365:h=90 / a2b86c23197e401e7531c84acd97a4af204be36a92bcf992ce229f99096fe628 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | 365 | 6 | 25 | 455 | 455 | 90 | 1000 | intervals | 67108864 | logistic-rate-changes-v1:logit=-3+6t|1.5t|4t@0.35,0.65+weekly+bounded-noise-x10:changing-capacity:n=365:h=90 / a2b86c23197e401e7531c84acd97a4af204be36a92bcf992ce229f99096fe628 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | 96 | 4 | 1 | 24 | 24 | 24 | 512 | samples | 67108864 | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | 256 | 4 | 1 | 64 | 64 | 64 | 128 | intervals | 67108864 | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | 96 | 5 | 1 | 24 | 24 | 24 | 512 | intervals | 67108864 | logistic-explicit-floor-v1:n=96:h=24:changing-capacity:weekly / c6fa262b4fd7353c7113029e7863b000afba00ec339f72dfaaa26b08a76a0f9b | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | 96 | 5 | 1 | 24 | 24 | 24 | 128 | samples | 67108864 | logistic-explicit-floor-v1:n=96:h=24:changing-capacity:weekly / c6fa262b4fd7353c7113029e7863b000afba00ec339f72dfaaa26b08a76a0f9b | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | 96 | 6 | 1 | 24 | 24 | 24 | 128 | intervals | 67108864 | logistic-uncertainty-mixed-v1:n=96:h=24:changing-capacity-floor+conditional-weekly+campaign+promotion / 6dd8e686d92b341795f6e1f4cf7be9c247ccdb275ca309059fd9114369416767 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | 96 | 6 | 1 | 24 | 24 | 24 | 128 | samples | 67108864 | logistic-uncertainty-mixed-v1:n=96:h=24:changing-capacity-floor+conditional-weekly+campaign+promotion / 6dd8e686d92b341795f6e1f4cf7be9c247ccdb275ca309059fd9114369416767 | docs/validation/uncertainty.md#evidence-classes |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-logistic-point | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | n/a |
| evaluation-logistic-intervals | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 256 | 19 / 0.8 | horizons / exclude | n/a |
| evaluation-logistic-search | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 2 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | ea6a5ef3fa66d70a4e00c996cfe9bc37217b3a0beb24a4ef92bc3f10f706c675, b06b02f1c576fa97c475d5837db49b1b93e6d43804b2cd8e2b6a95628977a5ae |
| evaluation-logistic-large-point | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 0 | n/a / n/a | rolling / exclude | n/a |
| evaluation-logistic-large-intervals | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 256 | 19 / 0.8 | rolling / exclude | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.016 | 0.015 | 0.016 | 137.9 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.478 | 0.546 | 0.475 | 0.546 | 128.1 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 198.812 | 210.168 | 193.886 | 210.168 | 159.2 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1494.199 | 1548.239 | 1474.026 | 1548.239 | 128.1 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 152.434 | 154.484 | 150.965 | 154.484 | 159.7 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1436.656 | 1526.643 | 1405.046 | 1526.643 | 128.1 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.333 | 0.361 | 0.311 | 0.361 | 159.7 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.005 | 4.163 | 3.981 | 4.163 | 128.1 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.027 | 0.034 | 0.018 | 0.034 | 159.7 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.684 | 0.735 | 0.666 | 0.735 | 128.1 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 30.501 | 30.719 | 30.338 | 30.719 | 159.1 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 55.386 | 56.042 | 54.739 | 56.042 | 128.1 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 30.706 | 31.778 | 30.444 | 31.778 | 159.1 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 54.428 | 58.190 | 54.025 | 58.190 | 128.1 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 31.077 | 31.964 | 30.921 | 31.964 | 149.5 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 50.047 | 51.031 | 48.837 | 51.031 | 128.1 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.177 | 0.224 | 0.155 | 0.224 | 152.0 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.839 | 5.106 | 4.692 | 5.106 | 128.1 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.018 | 0.014 | 0.018 | 139.7 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.477 | 0.526 | 0.462 | 0.526 | 128.1 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 220.394 | 251.088 | 213.377 | 251.088 | 157.8 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1470.836 | 1477.544 | 1463.811 | 1477.544 | 128.1 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 155.098 | 174.330 | 152.260 | 174.330 | 158.3 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1410.119 | 1493.352 | 1396.498 | 1493.352 | 128.1 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.345 | 0.393 | 0.325 | 0.393 | 158.3 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.129 | 4.421 | 3.962 | 4.421 | 128.1 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.027 | 0.048 | 0.018 | 0.048 | 158.2 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.692 | 0.741 | 0.680 | 0.741 | 128.1 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 42.969 | 43.080 | 42.928 | 43.080 | 157.7 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 63.276 | 64.191 | 62.152 | 64.191 | 128.1 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.305 | 43.791 | 42.997 | 43.791 | 157.7 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 62.862 | 64.964 | 62.274 | 64.964 | 128.1 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.400 | 93.273 | 42.992 | 93.273 | 148.0 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 57.908 | 60.209 | 57.044 | 60.209 | 128.1 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.213 | 0.282 | 0.181 | 0.282 | 150.5 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.911 | 5.095 | 4.820 | 5.095 | 128.1 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.015 | 0.013 | 0.015 | 140.6 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.498 | 0.543 | 0.469 | 0.543 | 147.9 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 209.706 | 222.873 | 202.661 | 222.873 | 158.8 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1652.070 | 1719.559 | 1623.002 | 1719.559 | 147.9 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 157.740 | 162.701 | 153.014 | 162.701 | 159.6 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1580.021 | 1601.116 | 1571.515 | 1601.116 | 147.9 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.934 | 1.752 | 0.857 | 1.752 | 159.5 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.114 | 4.240 | 4.016 | 4.240 | 147.9 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.104 | 0.112 | 0.095 | 0.112 | 158.8 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.716 | 0.747 | 0.682 | 0.747 | 147.9 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.588 | 32.284 | 31.213 | 32.284 | 158.7 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 59.819 | 62.688 | 59.275 | 62.688 | 147.9 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 31.511 | 32.725 | 31.230 | 32.725 | 158.1 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 60.061 | 61.386 | 59.083 | 61.386 | 147.9 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 33.021 | 34.581 | 32.282 | 34.581 | 157.3 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 53.264 | 69.733 | 52.748 | 69.733 | 147.9 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.245 | 0.429 | 0.241 | 0.429 | 157.5 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.787 | 5.962 | 5.768 | 5.962 | 147.9 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.021 | 0.014 | 0.021 | 141.6 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.491 | 0.505 | 0.465 | 0.505 | 147.9 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 238.992 | 291.814 | 221.811 | 291.814 | 159.0 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1684.499 | 1787.515 | 1637.896 | 1787.515 | 147.9 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 160.246 | 187.954 | 155.662 | 187.954 | 159.7 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1588.302 | 1724.902 | 1584.264 | 1724.902 | 147.9 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 1.208 | 3.375 | 1.104 | 3.375 | 159.5 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.445 | 5.132 | 4.372 | 5.132 | 147.9 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.111 | 0.138 | 0.096 | 0.138 | 159.0 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.723 | 0.818 | 0.720 | 0.818 | 147.9 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 44.052 | 86.702 | 43.845 | 86.702 | 158.6 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 67.481 | 76.308 | 66.255 | 76.308 | 147.9 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 44.035 | 44.461 | 43.769 | 44.461 | 158.1 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 65.996 | 71.956 | 65.720 | 71.956 | 147.9 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.899 | 45.994 | 44.323 | 45.994 | 157.3 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 62.600 | 158.498 | 61.348 | 158.498 | 147.9 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.240 | 0.317 | 0.235 | 0.317 | 157.5 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.792 | 6.833 | 5.633 | 6.833 | 147.9 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 18.465 | 19.283 | 18.423 | 19.283 | 150.5 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 64.792 | 72.931 | 64.390 | 72.931 | 128.1 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 16.114 | 16.696 | 15.712 | 16.696 | 162.4 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 56.821 | 58.314 | 56.054 | 58.314 | 128.1 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 185.412 | 187.984 | 183.382 | 187.984 | 159.4 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1443.261 | 1557.771 | 1438.507 | 1557.771 | 128.1 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.337 | 4.534 | 2.148 | 4.534 | 159.4 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.345 | 2.033 | 1.300 | 2.033 | 128.1 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.045 | 0.057 | 0.042 | 0.057 | 126.6 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.479 | 0.486 | 0.467 | 0.486 | 128.1 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.238 | 0.432 | 0.219 | 0.432 | 159.0 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.404 | 25.476 | 5.373 | 25.476 | 128.1 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 2.041 | 2.718 | 1.807 | 2.718 | 135.6 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.721 | 0.756 | 0.705 | 0.756 | 128.1 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 14.165 | 18.020 | 13.025 | 18.020 | 158.6 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 42.198 | 45.523 | 41.789 | 45.523 | 128.1 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 184.232 | 187.370 | 183.757 | 187.370 | 153.3 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1525.963 | 1619.681 | 1518.740 | 1619.681 | 128.1 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.431 | 1.571 | 1.422 | 1.571 | 153.2 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.787 | 0.815 | 0.773 | 0.815 | 128.1 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.017 | 0.036 | 0.014 | 0.036 | 125.6 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.364 | 0.409 | 0.360 | 0.409 | 128.1 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.192 | 0.215 | 0.187 | 0.215 | 150.4 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.342 | 5.458 | 5.337 | 5.458 | 128.1 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.971 | 1.402 | 0.878 | 1.402 | 130.0 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.543 | 0.566 | 0.514 | 0.566 | 128.1 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 16.632 | 18.964 | 16.314 | 18.964 | 150.4 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 60.187 | 60.950 | 59.565 | 60.950 | 128.1 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.787 | 18.323 | 17.628 | 18.323 | 167.9 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 30.960 | 36.108 | 30.794 | 36.108 | 128.1 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.171 | 0.182 | 0.162 | 0.182 | 168.9 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 128.1 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.256 | 0.329 | 0.243 | 0.329 | 168.4 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.007 | 0.011 | 128.1 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 36.754 | 37.547 | 36.657 | 37.547 | 167.5 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 122.787 | 129.993 | 117.878 | 129.993 | 128.1 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.038 | 0.039 | 0.037 | 0.039 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.480 | 0.520 | 0.477 | 0.520 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 191.500 | 215.408 | 184.030 | 215.408 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1439.772 | 1443.810 | 1437.615 | 1443.810 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.424 | 164.524 | 151.315 | 164.524 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1438.420 | 1445.935 | 1393.894 | 1445.935 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.103 | 0.167 | 0.088 | 0.167 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.433 | 2.544 | 2.419 | 2.544 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.037 | 0.066 | 0.034 | 0.066 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.480 | 0.482 | 0.470 | 0.482 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 21.170 | 22.092 | 20.877 | 22.092 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 36.225 | 36.744 | 35.789 | 36.744 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 21.543 | 23.963 | 21.516 | 23.963 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 35.924 | 36.389 | 35.252 | 36.389 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.413 | 21.582 | 21.192 | 21.582 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.099 | 32.951 | 31.606 | 32.951 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.339 | 0.385 | 0.329 | 0.385 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.464 | 3.593 | 3.428 | 3.593 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.039 | 0.056 | 0.035 | 0.056 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.524 | 0.529 | 0.521 | 0.529 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 180.557 | 186.330 | 180.534 | 186.330 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1437.115 | 1450.777 | 1424.930 | 1450.777 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.416 | 158.470 | 152.209 | 158.470 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1394.771 | 1418.783 | 1389.640 | 1418.783 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.096 | 0.116 | 0.092 | 0.116 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.489 | 2.499 | 2.474 | 2.499 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.030 | 0.048 | 0.030 | 0.048 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.446 | 0.479 | 0.440 | 0.479 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.127 | 17.265 | 17.116 | 17.265 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 30.692 | 31.377 | 30.514 | 31.377 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 18.533 | 19.366 | 17.701 | 19.366 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 30.125 | 30.261 | 29.668 | 30.261 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.531 | 24.915 | 17.161 | 24.915 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.656 | 27.801 | 26.249 | 27.801 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.376 | 0.412 | 0.349 | 0.412 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.617 | 3.692 | 3.578 | 3.692 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.019 | 0.017 | 0.019 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.486 | 0.497 | 0.453 | 0.497 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 180.045 | 182.354 | 179.860 | 182.354 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1489.319 | 1548.548 | 1443.268 | 1548.548 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.030 | 181.330 | 153.107 | 181.330 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1464.193 | 1647.128 | 1414.281 | 1647.128 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.089 | 0.101 | 0.087 | 0.101 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.266 | 2.294 | 2.261 | 2.294 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.057 | 0.027 | 0.057 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.421 | 0.457 | 0.406 | 0.457 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.631 | 20.037 | 18.604 | 20.037 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 33.354 | 35.938 | 33.305 | 35.938 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 18.901 | 18.932 | 18.859 | 18.932 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 32.574 | 34.350 | 32.273 | 34.350 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 19.213 | 20.756 | 18.918 | 20.756 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 28.530 | 29.008 | 28.434 | 29.008 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.229 | 0.236 | 0.225 | 0.236 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.245 | 4.479 | 3.167 | 4.479 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.019 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.494 | 0.504 | 0.449 | 0.504 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 183.667 | 185.454 | 183.001 | 185.454 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1446.266 | 1600.762 | 1433.181 | 1600.762 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 154.928 | 157.281 | 153.298 | 157.281 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1416.729 | 1474.110 | 1400.868 | 1474.110 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.103 | 0.185 | 0.092 | 0.185 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.333 | 2.450 | 2.333 | 2.450 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.036 | 0.052 | 0.027 | 0.052 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.500 | 0.965 | 0.449 | 0.965 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.740 | 20.238 | 18.628 | 20.238 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 33.976 | 34.383 | 33.459 | 34.383 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 18.873 | 19.583 | 18.865 | 19.583 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 32.612 | 38.234 | 31.838 | 38.234 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.207 | 20.483 | 18.968 | 20.483 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 30.608 | 31.426 | 30.442 | 31.426 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.236 | 0.240 | 0.220 | 0.240 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.350 | 4.315 | 3.110 | 4.315 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.053 | 0.075 | 0.048 | 0.075 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.577 | 0.601 | 0.569 | 0.601 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 178.594 | 209.503 | 175.772 | 209.503 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1409.994 | 1427.599 | 1404.040 | 1427.599 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 192.390 | 216.801 | 174.374 | 216.801 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1404.526 | 1436.473 | 1403.671 | 1436.473 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.107 | 0.125 | 0.096 | 0.125 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.581 | 2.684 | 2.541 | 2.684 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.034 | 0.054 | 0.024 | 0.054 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.643 | 0.702 | 0.641 | 0.702 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.041 | 4.192 | 4.005 | 4.192 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.268 | 13.576 | 13.158 | 13.576 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.316 | 4.398 | 4.268 | 4.398 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.934 | 13.603 | 12.728 | 13.603 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.813 | 4.953 | 4.723 | 4.953 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.508 | 9.746 | 9.482 | 9.746 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.399 | 0.440 | 0.355 | 0.440 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.210 | 3.353 | 3.178 | 3.353 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.026 | 0.018 | 0.026 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.486 | 0.510 | 0.473 | 0.510 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 185.107 | 213.713 | 183.734 | 213.713 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1449.643 | 1469.820 | 1440.923 | 1469.820 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.581 | 233.762 | 151.482 | 233.762 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1405.520 | 1415.004 | 1403.625 | 1415.004 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.082 | 0.114 | 0.074 | 0.114 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.235 | 2.258 | 2.229 | 2.258 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.033 | 0.114 | 0.028 | 0.114 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.435 | 0.468 | 0.434 | 0.468 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.452 | 21.481 | 20.230 | 21.481 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 37.826 | 41.656 | 36.131 | 41.656 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.515 | 22.011 | 20.456 | 22.011 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 34.495 | 36.005 | 34.472 | 36.005 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 21.437 | 22.870 | 20.566 | 22.870 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 32.044 | 33.173 | 31.666 | 33.173 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.235 | 0.261 | 0.234 | 0.261 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.169 | 3.251 | 3.120 | 3.251 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 153.291 | 155.035 | 152.966 | 155.035 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1571.857 | 1819.059 | 1518.226 | 1819.059 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.157 | 0.405 | 0.135 | 0.405 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.308 | 2.475 | 2.295 | 2.475 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.027 | 0.040 | 0.020 | 0.040 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.473 | 0.626 | 0.445 | 0.626 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.847 | 5.556 | 1.490 | 5.556 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 7.738 | 10.381 | 6.518 | 10.381 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.819 | 1.292 | 0.815 | 1.292 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 3.286 | 3.883 | 3.034 | 3.883 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 157.181 | 161.358 | 156.147 | 161.358 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1516.981 | 1709.435 | 1479.905 | 1709.435 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.121 | 0.141 | 0.116 | 0.141 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.553 | 2.656 | 2.531 | 2.656 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.019 | 0.036 | 0.019 | 0.036 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.647 | 0.857 | 0.647 | 0.857 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 2.820 | 3.182 | 2.811 | 3.182 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.889 | 10.124 | 7.216 | 10.124 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.103 | 1.311 | 1.087 | 1.311 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 3.053 | 3.090 | 2.984 | 3.090 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.560 | 168.817 | 155.972 | 168.817 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1426.762 | 1510.694 | 1423.883 | 1510.694 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.160 | 0.231 | 0.148 | 0.231 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.290 | 3.054 | 2.235 | 3.054 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.031 | 0.024 | 0.031 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.459 | 1.181 | 0.449 | 1.181 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 19.011 | 20.734 | 18.811 | 20.734 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 30.240 | 31.796 | 28.947 | 31.796 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.699 | 0.826 | 0.667 | 0.826 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 3.525 | 5.049 | 3.147 | 5.049 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.199 | 155.088 | 149.973 | 155.088 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1500.238 | 1821.548 | 1426.557 | 1821.548 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.145 | 0.175 | 0.145 | 0.175 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.306 | 2.368 | 2.268 | 2.368 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.031 | 0.020 | 0.031 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.453 | 0.507 | 0.419 | 0.507 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 9.516 | 10.608 | 9.305 | 10.608 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 17.975 | 19.755 | 17.815 | 19.755 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.778 | 0.946 | 0.764 | 0.946 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.909 | 4.233 | 2.844 | 4.233 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 155.233 | 159.210 | 151.379 | 159.210 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1414.553 | 1462.064 | 1403.487 | 1462.064 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.133 | 0.166 | 0.130 | 0.166 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.078 | 2.251 | 2.048 | 2.251 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.033 | 0.025 | 0.033 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.428 | 0.438 | 0.427 | 0.438 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.776 | 10.010 | 6.737 | 10.010 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 12.675 | 13.097 | 12.337 | 13.097 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.675 | 0.808 | 0.673 | 0.808 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.845 | 2.933 | 2.826 | 2.933 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.406 | 158.945 | 154.490 | 158.945 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1467.705 | 1511.207 | 1397.041 | 1511.207 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.145 | 0.173 | 0.138 | 0.173 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.067 | 2.187 | 2.021 | 2.187 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.051 | 0.020 | 0.051 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.424 | 0.466 | 0.414 | 0.466 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.512 | 9.880 | 8.420 | 9.880 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 15.784 | 17.988 | 15.410 | 17.988 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.656 | 0.817 | 0.598 | 0.817 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.981 | 3.671 | 2.905 | 3.671 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 166.511 | 194.197 | 159.878 | 194.197 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1460.815 | 1570.229 | 1416.128 | 1570.229 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.148 | 0.215 | 0.133 | 0.215 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.255 | 2.927 | 2.159 | 2.927 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.042 | 0.024 | 0.042 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.420 | 0.440 | 0.416 | 0.440 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 8.593 | 10.883 | 7.962 | 10.883 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 15.153 | 16.418 | 14.709 | 16.418 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.809 | 0.934 | 0.691 | 0.934 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.854 | 3.689 | 2.830 | 3.689 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.620 | 159.010 | 155.412 | 159.010 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1583.111 | 1636.539 | 1536.563 | 1636.539 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.183 | 0.135 | 0.183 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.174 | 2.552 | 2.168 | 2.552 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.033 | 0.020 | 0.033 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.432 | 0.704 | 0.423 | 0.704 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 16.767 | 18.145 | 16.608 | 18.145 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 24.180 | 30.048 | 23.514 | 30.048 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.724 | 0.857 | 0.608 | 0.857 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.874 | 3.659 | 2.850 | 3.659 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 157.570 | 161.238 | 152.165 | 161.238 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1589.016 | 1637.216 | 1587.864 | 1637.216 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.129 | 0.171 | 0.128 | 0.171 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.365 | 2.473 | 2.352 | 2.473 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.025 | 0.029 | 0.020 | 0.029 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.494 | 0.513 | 0.473 | 0.513 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 16.886 | 18.076 | 16.733 | 18.076 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 26.488 | 27.981 | 26.239 | 27.981 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.851 | 0.924 | 0.807 | 0.924 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 3.247 | 3.860 | 3.233 | 3.860 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 168.927 | 183.712 | 163.344 | 183.712 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1493.489 | 1562.158 | 1430.981 | 1562.158 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.148 | 0.161 | 0.138 | 0.161 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.496 | 2.614 | 2.446 | 2.614 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.028 | 0.042 | 0.027 | 0.042 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.481 | 0.498 | 0.465 | 0.498 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 16.208 | 18.089 | 16.082 | 18.089 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 28.309 | 29.779 | 26.992 | 29.779 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.083 | 1.326 | 1.027 | 1.326 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.546 | 3.652 | 3.479 | 3.652 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 155.662 | 163.373 | 155.647 | 163.373 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1524.846 | 1727.869 | 1453.691 | 1727.869 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.148 | 0.182 | 0.145 | 0.182 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.377 | 2.847 | 2.289 | 2.847 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.024 | 0.055 | 0.022 | 0.055 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.788 | 0.859 | 0.683 | 0.859 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 17.794 | 18.969 | 16.790 | 18.969 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 26.732 | 27.404 | 26.499 | 27.404 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.733 | 0.894 | 0.702 | 0.894 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.951 | 3.212 | 2.947 | 3.212 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 177.334 | 234.996 | 166.911 | 234.996 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1697.530 | 1768.362 | 1610.188 | 1768.362 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.161 | 0.214 | 0.140 | 0.214 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.675 | 3.094 | 2.619 | 3.094 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.040 | 0.123 | 0.032 | 0.123 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.493 | 0.536 | 0.459 | 0.536 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 8.248 | 9.275 | 7.293 | 9.275 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 16.153 | 16.951 | 15.751 | 16.951 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.846 | 0.992 | 0.793 | 0.992 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 3.707 | 3.879 | 3.075 | 3.879 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 161.078 | 167.485 | 157.800 | 167.485 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1657.638 | 1831.332 | 1571.910 | 1831.332 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.150 | 0.194 | 0.133 | 0.194 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.895 | 3.571 | 2.735 | 3.571 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.018 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.657 | 0.685 | 0.657 | 0.685 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 37.683 | 38.062 | 37.656 | 38.062 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 42.748 | 43.429 | 42.019 | 43.429 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.221 | 1.331 | 1.091 | 1.331 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.818 | 4.827 | 3.615 | 4.827 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 158.359 | 166.359 | 152.918 | 166.359 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1592.578 | 1802.516 | 1575.594 | 1802.516 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.261 | 0.409 | 0.172 | 0.409 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.388 | 2.433 | 2.373 | 2.433 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.023 | 0.032 | 0.022 | 0.032 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.506 | 0.529 | 0.491 | 0.529 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 101.756 | 106.144 | 101.718 | 106.144 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 122.894 | 133.333 | 121.894 | 133.333 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.005 | 1.051 | 0.938 | 1.051 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 4.502 | 4.566 | 3.868 | 4.566 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 159.277 | 169.135 | 158.852 | 169.135 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1638.153 | 1687.785 | 1585.484 | 1687.785 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.157 | 0.186 | 0.126 | 0.186 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.864 | 3.382 | 2.782 | 3.382 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.016 | 0.021 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.816 | 0.851 | 0.814 | 0.851 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 132.994 | 133.549 | 132.661 | 133.549 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 121.285 | 139.736 | 121.254 | 139.736 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.658 | 2.354 | 1.574 | 2.354 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 4.086 | 5.136 | 3.937 | 5.136 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 155.090 | 185.058 | 154.988 | 185.058 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1588.085 | 2016.271 | 1585.560 | 2016.271 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.149 | 0.164 | 0.146 | 0.164 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.409 | 2.628 | 2.340 | 2.628 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.026 | 0.031 | 0.024 | 0.031 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.475 | 0.501 | 0.468 | 0.501 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 6.011 | 10.183 | 5.923 | 10.183 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 16.687 | 18.354 | 15.980 | 18.354 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.688 | 0.841 | 0.592 | 0.841 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 4.144 | 5.012 | 3.544 | 5.012 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.326 | 172.157 | 151.981 | 172.157 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1543.952 | 1580.696 | 1530.683 | 1580.696 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.150 | 0.173 | 0.145 | 0.173 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.090 | 3.224 | 2.053 | 3.224 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.030 | 0.033 | 0.021 | 0.033 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.427 | 0.482 | 0.426 | 0.482 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 116.498 | 117.425 | 116.024 | 117.425 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 128.356 | 130.274 | 126.896 | 130.274 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.719 | 0.845 | 0.696 | 0.845 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 3.123 | 4.031 | 3.028 | 4.031 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.896 | 159.848 | 152.709 | 159.848 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1686.573 | 1963.668 | 1559.005 | 1963.668 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.169 | 0.235 | 0.152 | 0.235 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.150 | 2.229 | 2.150 | 2.229 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.032 | 0.023 | 0.032 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.449 | 0.494 | 0.435 | 0.494 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 15.233 | 16.451 | 14.938 | 16.451 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 20.490 | 25.029 | 20.121 | 25.029 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.727 | 0.854 | 0.689 | 0.854 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.935 | 3.649 | 2.884 | 3.649 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 157.681 | 169.006 | 155.918 | 169.006 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1486.202 | 1536.032 | 1438.616 | 1536.032 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.150 | 0.223 | 0.147 | 0.223 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.445 | 3.699 | 3.428 | 3.699 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.022 | 0.031 | 0.020 | 0.031 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.656 | 0.697 | 0.626 | 0.697 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.086 | 11.827 | 8.981 | 11.827 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 17.939 | 18.358 | 17.857 | 18.358 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 0.925 | 0.969 | 0.852 | 0.969 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.201 | 4.349 | 4.166 | 4.349 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.558 | 181.460 | 160.317 | 181.460 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1435.800 | 1516.299 | 1426.636 | 1516.299 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.160 | 0.188 | 0.135 | 0.188 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.260 | 2.399 | 2.208 | 2.399 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.029 | 0.019 | 0.029 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.470 | 0.506 | 0.451 | 0.506 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 7.754 | 13.007 | 6.641 | 13.007 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.833 | 14.150 | 13.567 | 14.150 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.883 | 1.012 | 0.870 | 1.012 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.893 | 2.940 | 2.844 | 2.940 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.474 | 164.469 | 152.639 | 164.469 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1565.467 | 1587.680 | 1559.625 | 1587.680 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.174 | 0.239 | 0.162 | 0.239 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.410 | 3.189 | 2.348 | 3.189 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.034 | 0.021 | 0.034 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.460 | 0.494 | 0.457 | 0.494 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 11.551 | 11.949 | 10.216 | 11.949 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 19.228 | 19.912 | 18.964 | 19.912 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.793 | 1.023 | 0.777 | 1.023 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.076 | 3.175 | 3.054 | 3.175 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.569 | 162.275 | 156.072 | 162.275 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1600.743 | 1656.455 | 1488.627 | 1656.455 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.176 | 0.183 | 0.164 | 0.183 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 4.045 | 5.097 | 3.937 | 5.097 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.026 | 0.019 | 0.026 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.691 | 0.751 | 0.685 | 0.751 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 28.980 | 32.049 | 28.155 | 32.049 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 46.624 | 48.256 | 45.624 | 48.256 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 1.015 | 2.559 | 0.899 | 2.559 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.611 | 6.247 | 5.379 | 6.247 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 163.872 | 187.907 | 161.349 | 187.907 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1606.293 | 1648.436 | 1585.270 | 1648.436 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.180 | 0.193 | 0.173 | 0.193 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.935 | 4.400 | 3.735 | 4.400 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.029 | 0.020 | 0.029 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.795 | 0.970 | 0.785 | 0.970 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 25.276 | 25.834 | 25.206 | 25.834 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 44.029 | 57.526 | 43.479 | 57.526 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.911 | 2.450 | 0.910 | 2.450 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 6.506 | 6.890 | 6.069 | 6.890 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 156.396 | 160.114 | 152.496 | 160.114 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1464.536 | 1628.368 | 1441.168 | 1628.368 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.149 | 0.164 | 0.144 | 0.164 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.263 | 2.336 | 2.252 | 2.336 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.030 | 0.076 | 0.026 | 0.076 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.470 | 0.503 | 0.435 | 0.503 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 9.036 | 10.322 | 8.855 | 10.322 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 16.647 | 18.634 | 16.098 | 18.634 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.799 | 0.960 | 0.713 | 0.960 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 3.012 | 3.344 | 3.001 | 3.344 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 157.654 | 159.574 | 154.633 | 159.574 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1428.075 | 1489.697 | 1424.058 | 1489.697 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.131 | 0.158 | 0.113 | 0.158 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.445 | 2.501 | 2.442 | 2.501 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.028 | 0.041 | 0.027 | 0.041 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.480 | 0.505 | 0.473 | 0.505 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 7.940 | 8.594 | 7.640 | 8.594 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 15.765 | 16.695 | 15.411 | 16.695 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 1.077 | 1.171 | 1.023 | 1.171 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.288 | 3.311 | 3.281 | 3.311 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 166.676 | 193.243 | 157.369 | 193.243 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1416.410 | 1480.203 | 1414.320 | 1480.203 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.135 | 0.176 | 0.123 | 0.176 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.471 | 2.602 | 2.456 | 2.602 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.026 | 0.033 | 0.023 | 0.033 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.481 | 0.560 | 0.478 | 0.560 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 11.342 | 25.737 | 9.807 | 25.737 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 18.603 | 19.954 | 18.402 | 19.954 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 1.063 | 1.618 | 1.013 | 1.618 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.627 | 3.755 | 3.428 | 3.755 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 160.184 | 169.072 | 153.874 | 169.072 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1529.887 | 1573.668 | 1507.140 | 1573.668 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.142 | 0.187 | 0.136 | 0.187 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.289 | 2.503 | 2.232 | 2.503 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.021 | 0.030 | 0.020 | 0.030 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.482 | 0.522 | 0.471 | 0.522 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.899 | 11.597 | 10.547 | 11.597 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 20.304 | 33.499 | 19.972 | 33.499 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.825 | 0.883 | 0.822 | 0.883 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 3.102 | 3.640 | 3.017 | 3.640 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 157.720 | 164.728 | 154.614 | 164.728 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1619.059 | 1677.209 | 1596.234 | 1677.209 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.134 | 0.189 | 0.131 | 0.189 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.488 | 2.754 | 2.377 | 2.754 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.019 | 0.032 | 0.018 | 0.032 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.435 | 0.759 | 0.435 | 0.759 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 8.285 | 10.050 | 7.990 | 10.050 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 17.881 | 18.662 | 17.553 | 18.662 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.842 | 0.898 | 0.685 | 0.898 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 3.223 | 3.588 | 3.023 | 3.588 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 167.049 | 203.546 | 166.883 | 203.546 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1565.417 | 1663.259 | 1550.351 | 1663.259 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.166 | 0.242 | 0.153 | 0.242 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.546 | 2.634 | 2.355 | 2.634 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.027 | 0.034 | 0.027 | 0.034 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.482 | 0.511 | 0.461 | 0.511 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 15.642 | 19.041 | 15.256 | 19.041 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 27.474 | 27.986 | 25.485 | 27.986 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 0.944 | 1.528 | 0.843 | 1.528 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.452 | 3.609 | 3.338 | 3.609 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 185.106 | 192.628 | 183.239 | 192.628 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1588.190 | 1647.932 | 1534.827 | 1647.932 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 153.946 | 165.494 | 153.344 | 165.494 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1548.888 | 1753.752 | 1511.593 | 1753.752 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.200 | 0.489 | 0.145 | 0.489 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.518 | 3.921 | 2.465 | 3.921 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.034 | 0.043 | 0.031 | 0.043 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.499 | 0.559 | 0.463 | 0.559 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.043 | 0.065 | 0.037 | 0.065 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.492 | 0.506 | 0.459 | 0.506 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.945 | 2.989 | 0.892 | 2.989 | 149.9 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 89.000 | 91.458 | 87.692 | 91.458 | 128.1 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 184.212 | 484.422 | 181.915 | 484.422 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1632.291 | 1799.970 | 1546.344 | 1799.970 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 161.885 | 177.265 | 155.795 | 177.265 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1570.187 | 1612.960 | 1535.325 | 1612.960 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.187 | 0.219 | 0.141 | 0.219 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.835 | 3.278 | 2.602 | 3.278 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.031 | 0.055 | 0.022 | 0.055 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.570 | 0.720 | 0.543 | 0.720 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.039 | 0.072 | 0.036 | 0.072 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.532 | 0.607 | 0.528 | 0.607 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.563 | 2.435 | 0.515 | 2.435 | 146.8 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 25.995 | 43.401 | 24.728 | 43.401 | 128.1 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 189.811 | 201.316 | 188.858 | 201.316 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1496.011 | 1721.369 | 1464.970 | 1721.369 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.553 | 162.440 | 153.825 | 162.440 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1509.023 | 1577.683 | 1438.292 | 1577.683 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.244 | 0.363 | 0.193 | 0.363 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 4.018 | 4.430 | 3.799 | 4.430 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.025 | 0.034 | 0.020 | 0.034 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.676 | 0.766 | 0.653 | 0.766 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.079 | 0.118 | 0.068 | 0.118 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.563 | 0.627 | 0.545 | 0.627 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.629 | 1.187 | 0.598 | 1.187 | 149.4 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 34.612 | 49.013 | 30.619 | 49.013 | 128.1 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 185.625 | 190.019 | 184.712 | 190.019 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1513.864 | 1641.507 | 1464.309 | 1641.507 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.425 | 157.747 | 154.060 | 157.747 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1467.447 | 1621.040 | 1433.680 | 1621.040 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.209 | 0.235 | 0.162 | 0.235 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 4.173 | 5.735 | 3.847 | 5.735 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.030 | 0.043 | 0.021 | 0.043 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.677 | 0.730 | 0.673 | 0.730 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.069 | 0.080 | 0.051 | 0.080 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.532 | 0.602 | 0.518 | 0.602 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.794 | 1.106 | 0.560 | 1.106 | 150.3 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 27.510 | 41.858 | 25.694 | 41.858 | 128.1 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 170.341 | 177.000 | 168.904 | 177.000 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1540.054 | 1636.383 | 1507.718 | 1636.383 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.838 | 160.328 | 155.929 | 160.328 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1486.658 | 1763.605 | 1457.865 | 1763.605 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.146 | 0.164 | 0.135 | 0.164 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.587 | 3.366 | 2.524 | 3.366 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.032 | 0.017 | 0.032 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.638 | 0.734 | 0.619 | 0.734 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.052 | 0.058 | 0.047 | 0.058 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.591 | 0.684 | 0.571 | 0.684 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.861 | 2.015 | 0.780 | 2.015 | 147.9 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 26.608 | 58.033 | 25.877 | 58.033 | 128.1 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 190.588 | 201.568 | 183.752 | 201.568 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1538.436 | 1573.136 | 1522.312 | 1573.136 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.158 | 168.931 | 153.439 | 168.931 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1534.369 | 1575.096 | 1514.012 | 1575.096 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.136 | 0.260 | 0.120 | 0.260 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.297 | 2.459 | 2.197 | 2.459 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.019 | 0.031 | 0.018 | 0.031 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.456 | 0.485 | 0.437 | 0.485 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.022 | 0.069 | 0.017 | 0.069 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.501 | 0.538 | 0.476 | 0.538 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.223 | 2.461 | 1.095 | 2.461 | 147.2 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 80.658 | 83.306 | 79.038 | 83.306 | 128.1 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 332.501 | 358.406 | 330.092 | 358.406 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1921.395 | 2049.328 | 1817.092 | 2049.328 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 202.024 | 220.772 | 197.317 | 220.772 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1835.893 | 1924.739 | 1733.883 | 1924.739 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.182 | 0.298 | 0.139 | 0.298 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.850 | 3.081 | 2.743 | 3.081 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.022 | 0.030 | 0.018 | 0.030 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.802 | 0.854 | 0.762 | 0.854 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.078 | 0.103 | 0.035 | 0.103 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.780 | 1.001 | 0.763 | 1.001 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 23.069 | 23.676 | 22.909 | 23.676 | 159.0 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 288.040 | 388.186 | 276.821 | 388.186 | 133.2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 333.197 | 361.492 | 326.764 | 361.492 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1821.112 | 1843.198 | 1801.536 | 1843.198 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 183.423 | 192.564 | 183.329 | 192.564 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1700.907 | 1846.803 | 1690.227 | 1846.803 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.193 | 0.247 | 0.157 | 0.247 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.728 | 3.003 | 2.616 | 3.003 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.027 | 0.074 | 0.019 | 0.074 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.809 | 0.862 | 0.748 | 0.862 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.079 | 0.162 | 0.052 | 0.162 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.776 | 0.783 | 0.769 | 0.783 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 23.467 | 26.213 | 23.173 | 26.213 | 157.4 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 282.013 | 303.523 | 279.174 | 303.523 | 133.1 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `27b7ec98aff8098fc16dd0abc828045b94569e9a`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-logistic-additive`, `country-explicit-us-logistic-additive`, `country-us-logistic-multiplicative`, `country-explicit-us-logistic-multiplicative`, `logistic-implicit-floor-absmax`, `logistic-implicit-floor-minmax`, `logistic-explicit-floor-absmax`, `logistic-explicit-floor-minmax`, `logistic-implicit-floor-auto-changepoints`, `logistic-implicit-floor-large`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7`, `uncertainty-logistic-implicit-floor-minmax-full-samples-512`, `uncertainty-logistic-implicit-floor-large-full-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-full-intervals-512`, `uncertainty-logistic-explicit-floor-minmax-full-samples-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `logistic-reconcile-basic-96-empty-absmax`, `logistic-reconcile-basic-96-explicit-absmax`, `logistic-reconcile-basic-96-auto-absmax`, `logistic-reconcile-basic-96-empty-minmax`, `logistic-reconcile-basic-96-explicit-minmax`, `logistic-reconcile-basic-96-auto-minmax`, `logistic-reconcile-empty-loose-prior-absmax`, `logistic-reconcile-empty-loose-prior-minmax`, `logistic-reconcile-basic-99`, `logistic-reconcile-basic-100`, `logistic-reconcile-basic-256`, `logistic-reconcile-defaults-96`, `logistic-reconcile-defaults-256`, `logistic-reconcile-defaults-rate-changes`, `logistic-reconcile-weekly`, `logistic-reconcile-conditional`, `logistic-reconcile-event`, `logistic-reconcile-regressor-additive`, `logistic-reconcile-regressor-multiplicative`, `logistic-reconcile-explicit-floor-absmax`, `logistic-reconcile-mixed-absmax`, `logistic-reconcile-explicit-floor-minmax`, `logistic-reconcile-mixed-minmax`, `logistic-reconcile-unsorted`, `logistic-reconcile-duplicates`, `logistic-reconcile-declining`, `logistic-reconcile-saturated`, `logistic-reconcile-constant`, `logistic-reconcile-out-of-bounds`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:2061871ed43219e5d693e330002a01b52a6f651da9905f06adbc8776c3534dd4`
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

