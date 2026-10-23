# Effect Prophet benchmark — 2026-10-22T195711-087Z-bc4f2208

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
| country-us-logistic-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12550 | 27746 |
| country-us-logistic-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12550 | 27746 |
| country-explicit-us-logistic-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3831 | 30562 |
| country-explicit-us-logistic-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3831 | 30562 |
| country-us-logistic-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12570 | 27760 |
| country-us-logistic-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12570 | 27760 |
| country-explicit-us-logistic-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3839 | 30576 |
| country-explicit-us-logistic-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3839 | 30576 |

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
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.028 | 0.016 | 0.028 | 139.1 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.484 | 0.506 | 0.446 | 0.506 | 128.2 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 201.063 | 210.251 | 199.801 | 210.251 | 162.2 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1476.777 | 1500.509 | 1456.743 | 1500.509 | 128.2 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 154.404 | 159.463 | 153.019 | 159.463 | 162.5 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1425.970 | 1479.362 | 1415.553 | 1479.362 | 128.2 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.330 | 0.350 | 0.313 | 0.350 | 162.5 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.041 | 4.203 | 3.950 | 4.203 | 128.2 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.028 | 0.035 | 0.018 | 0.035 | 162.5 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.681 | 0.695 | 0.667 | 0.695 | 128.2 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 30.454 | 30.738 | 30.133 | 30.738 | 162.2 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 54.769 | 55.543 | 54.389 | 55.543 | 128.2 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 30.640 | 32.033 | 30.341 | 32.033 | 162.1 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 54.174 | 55.841 | 54.085 | 55.841 | 128.2 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 30.893 | 31.243 | 30.604 | 31.243 | 152.6 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 50.087 | 51.876 | 49.800 | 51.876 | 128.2 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.184 | 0.201 | 0.158 | 0.201 | 155.0 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.765 | 4.833 | 4.747 | 4.833 | 128.2 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.017 | 0.016 | 0.017 | 138.8 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.497 | 0.542 | 0.480 | 0.542 | 128.2 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 211.706 | 223.251 | 208.855 | 223.251 | 162.2 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1465.895 | 1476.102 | 1461.147 | 1476.102 | 128.2 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 156.256 | 160.347 | 150.381 | 160.347 | 162.6 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1418.055 | 1492.716 | 1409.681 | 1492.716 | 128.2 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.331 | 0.410 | 0.306 | 0.410 | 162.6 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.099 | 4.263 | 4.086 | 4.263 | 128.2 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.027 | 0.038 | 0.019 | 0.038 | 162.6 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.715 | 0.725 | 0.695 | 0.725 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.063 | 43.346 | 42.736 | 43.346 | 162.1 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 62.975 | 63.353 | 62.684 | 63.353 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 42.892 | 43.366 | 42.702 | 43.366 | 162.1 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 62.630 | 63.187 | 61.876 | 63.187 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 43.566 | 44.371 | 43.119 | 44.371 | 152.6 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 57.464 | 57.628 | 57.145 | 57.628 | 128.2 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.174 | 0.205 | 0.172 | 0.205 | 154.9 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.898 | 4.963 | 4.851 | 4.963 | 128.2 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.021 | 0.032 | 0.019 | 0.032 | 140.6 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.491 | 0.516 | 0.476 | 0.516 | 147.8 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 203.625 | 222.465 | 198.300 | 222.465 | 160.7 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1645.941 | 1661.304 | 1631.238 | 1661.304 | 147.8 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 157.745 | 168.230 | 154.961 | 168.230 | 161.5 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1599.440 | 1755.442 | 1585.332 | 1755.442 | 147.8 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.788 | 1.619 | 0.745 | 1.619 | 161.4 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.023 | 4.176 | 3.986 | 4.176 | 147.8 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.116 | 0.146 | 0.091 | 0.146 | 160.7 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.710 | 0.725 | 0.701 | 0.725 | 147.8 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.545 | 32.273 | 31.246 | 32.273 | 160.7 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 59.235 | 60.878 | 59.023 | 60.878 | 147.8 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 31.802 | 32.496 | 31.489 | 32.496 | 160.0 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 59.380 | 59.862 | 59.080 | 59.862 | 147.8 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 33.855 | 34.804 | 32.807 | 34.804 | 159.4 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 53.766 | 54.302 | 53.206 | 54.302 | 147.8 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.240 | 0.362 | 0.235 | 0.362 | 159.5 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.653 | 5.971 | 5.579 | 5.971 | 147.8 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.018 | 0.016 | 0.018 | 141.0 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.477 | 0.512 | 0.460 | 0.512 | 146.9 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 215.363 | 220.993 | 213.412 | 220.993 | 156.7 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1657.633 | 1722.824 | 1646.171 | 1722.824 | 146.9 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.687 | 175.502 | 155.008 | 175.502 | 157.2 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1629.742 | 1840.585 | 1608.620 | 1840.585 | 146.9 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.927 | 0.945 | 0.915 | 0.945 | 157.2 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.149 | 5.317 | 4.019 | 5.317 | 146.9 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.106 | 0.113 | 0.089 | 0.113 | 156.9 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.711 | 0.740 | 0.675 | 0.740 | 146.9 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.662 | 45.338 | 43.576 | 45.338 | 156.6 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 67.044 | 70.069 | 66.739 | 70.069 | 146.9 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 44.510 | 45.924 | 43.958 | 45.924 | 154.9 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 66.269 | 91.483 | 65.896 | 91.483 | 146.9 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 45.157 | 45.691 | 44.791 | 45.691 | 154.2 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 60.621 | 62.510 | 60.376 | 62.510 | 146.9 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.226 | 0.299 | 0.225 | 0.299 | 154.5 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.881 | 9.865 | 5.732 | 9.865 | 146.9 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 19.189 | 19.391 | 19.117 | 19.391 | 145.2 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 65.847 | 67.011 | 65.340 | 67.011 | 128.2 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 16.121 | 16.154 | 16.074 | 16.154 | 153.9 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 58.586 | 60.203 | 57.706 | 60.203 | 128.2 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 198.680 | 215.936 | 189.416 | 215.936 | 155.8 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1536.280 | 1589.552 | 1474.469 | 1589.552 | 128.2 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.489 | 4.090 | 2.256 | 4.090 | 155.8 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.305 | 1.347 | 1.294 | 1.347 | 128.2 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.054 | 0.070 | 0.051 | 0.070 | 122.9 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.474 | 0.528 | 0.473 | 0.528 | 128.2 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.246 | 0.279 | 0.236 | 0.279 | 155.0 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.368 | 5.466 | 5.350 | 5.466 | 128.2 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 2.591 | 3.248 | 1.875 | 3.248 | 132.0 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.769 | 0.923 | 0.716 | 0.923 | 128.2 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 14.991 | 22.299 | 13.743 | 22.299 | 154.8 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 45.649 | 50.115 | 44.726 | 50.115 | 128.2 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 197.887 | 220.219 | 196.009 | 220.219 | 152.6 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1488.944 | 1518.891 | 1480.310 | 1518.891 | 128.2 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.795 | 1.888 | 1.693 | 1.888 | 152.4 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.806 | 1.362 | 0.769 | 1.362 | 128.2 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.018 | 0.020 | 0.015 | 0.020 | 121.8 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.408 | 0.449 | 0.397 | 0.449 | 128.2 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.214 | 0.221 | 0.195 | 0.221 | 146.4 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.274 | 6.107 | 5.262 | 6.107 | 128.2 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.961 | 1.253 | 0.887 | 1.253 | 126.3 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.574 | 0.632 | 0.572 | 0.632 | 128.2 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 17.283 | 23.385 | 16.170 | 23.385 | 145.2 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 61.860 | 63.972 | 61.252 | 63.972 | 128.2 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.897 | 18.295 | 17.722 | 18.295 | 160.6 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 34.613 | 53.020 | 31.977 | 53.020 | 128.2 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.189 | 0.210 | 0.181 | 0.210 | 161.9 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 128.2 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.249 | 0.266 | 0.244 | 0.266 | 161.3 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.011 | 0.008 | 0.011 | 128.2 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 36.502 | 36.981 | 36.501 | 36.981 | 159.9 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 117.132 | 127.969 | 116.952 | 127.969 | 128.2 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.041 | 0.044 | 0.041 | 0.044 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.488 | 0.525 | 0.485 | 0.525 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 187.688 | 197.767 | 187.402 | 197.767 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1464.170 | 1558.946 | 1432.919 | 1558.946 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.009 | 213.764 | 154.173 | 213.764 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1405.767 | 1458.943 | 1405.294 | 1458.943 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.097 | 0.135 | 0.087 | 0.135 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.429 | 2.467 | 2.405 | 2.467 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.044 | 0.030 | 0.044 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.506 | 0.507 | 0.475 | 0.507 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.804 | 21.146 | 20.748 | 21.146 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 39.270 | 40.630 | 37.345 | 40.630 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 21.674 | 22.452 | 21.518 | 22.452 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 35.744 | 40.436 | 35.629 | 40.436 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.049 | 21.417 | 20.946 | 21.417 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.155 | 32.806 | 32.125 | 32.806 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.341 | 0.377 | 0.341 | 0.377 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.603 | 3.622 | 3.567 | 3.622 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.055 | 0.073 | 0.043 | 0.073 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.490 | 0.508 | 0.480 | 0.508 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 184.674 | 195.010 | 180.532 | 195.010 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1443.025 | 1454.115 | 1432.725 | 1454.115 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.970 | 185.834 | 153.434 | 185.834 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1429.466 | 1512.073 | 1403.490 | 1512.073 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.086 | 0.103 | 0.085 | 0.103 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.483 | 2.522 | 2.467 | 2.522 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.045 | 0.026 | 0.045 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.458 | 0.481 | 0.444 | 0.481 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.172 | 17.336 | 17.096 | 17.336 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 30.554 | 31.702 | 30.380 | 31.702 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 18.268 | 19.360 | 17.985 | 19.360 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 29.653 | 30.091 | 29.558 | 30.091 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.878 | 18.968 | 17.498 | 18.968 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.480 | 27.758 | 26.164 | 27.758 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.416 | 0.517 | 0.394 | 0.517 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.526 | 3.692 | 3.521 | 3.692 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.025 | 0.018 | 0.025 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.476 | 0.492 | 0.469 | 0.492 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 186.109 | 193.411 | 183.339 | 193.411 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1475.998 | 1490.665 | 1467.151 | 1490.665 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.138 | 154.221 | 150.671 | 154.221 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1434.438 | 1476.452 | 1409.149 | 1476.452 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.097 | 0.124 | 0.081 | 0.124 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.351 | 4.825 | 2.289 | 4.825 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.038 | 0.026 | 0.038 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.443 | 0.462 | 0.428 | 0.462 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 19.243 | 20.825 | 18.785 | 20.825 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 33.061 | 33.468 | 32.792 | 33.468 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 18.918 | 18.979 | 18.891 | 18.979 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 31.708 | 32.642 | 31.505 | 32.642 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 19.052 | 20.255 | 19.001 | 20.255 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 28.358 | 28.938 | 28.292 | 28.938 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.238 | 0.255 | 0.238 | 0.255 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.296 | 3.350 | 3.235 | 3.350 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.020 | 0.020 | 0.019 | 0.020 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.487 | 0.572 | 0.487 | 0.572 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 180.347 | 185.806 | 179.867 | 185.806 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1462.698 | 1547.305 | 1457.072 | 1547.305 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 153.170 | 153.689 | 150.035 | 153.689 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1488.868 | 1503.101 | 1431.180 | 1503.101 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.105 | 0.131 | 0.086 | 0.131 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.313 | 2.381 | 2.287 | 2.381 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.029 | 0.047 | 0.029 | 0.047 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.448 | 0.472 | 0.443 | 0.472 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 19.066 | 20.506 | 18.448 | 20.506 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 32.646 | 35.566 | 32.550 | 35.566 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.081 | 19.344 | 18.971 | 19.344 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 31.837 | 33.351 | 31.704 | 33.351 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.312 | 20.078 | 19.046 | 20.078 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 29.139 | 32.572 | 28.460 | 32.572 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.227 | 0.337 | 0.224 | 0.337 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.175 | 3.251 | 3.167 | 3.251 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.056 | 0.060 | 0.048 | 0.060 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.590 | 0.623 | 0.554 | 0.623 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 171.516 | 178.704 | 170.359 | 178.704 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1457.952 | 1466.253 | 1416.096 | 1466.253 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 157.631 | 170.194 | 155.906 | 170.194 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1422.629 | 1435.113 | 1418.878 | 1435.113 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.086 | 0.092 | 0.080 | 0.092 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.563 | 2.707 | 2.548 | 2.707 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.027 | 0.030 | 0.026 | 0.030 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.632 | 0.693 | 0.625 | 0.693 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.162 | 4.721 | 4.036 | 4.721 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.331 | 14.018 | 13.264 | 14.018 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.366 | 4.429 | 4.317 | 4.429 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 13.134 | 13.907 | 12.837 | 13.907 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.979 | 5.260 | 4.790 | 5.260 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.758 | 12.180 | 9.642 | 12.180 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.376 | 0.418 | 0.368 | 0.418 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.256 | 3.407 | 3.208 | 3.407 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.020 | 0.021 | 0.018 | 0.021 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.493 | 0.554 | 0.479 | 0.554 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 180.894 | 184.834 | 180.287 | 184.834 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1460.996 | 1490.217 | 1452.230 | 1490.217 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.157 | 170.908 | 152.709 | 170.908 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1405.766 | 1485.324 | 1403.236 | 1485.324 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.086 | 0.112 | 0.075 | 0.112 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.263 | 2.337 | 2.255 | 2.337 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.037 | 0.028 | 0.037 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.450 | 0.491 | 0.449 | 0.491 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.709 | 21.729 | 20.685 | 21.729 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.742 | 36.078 | 34.817 | 36.078 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.792 | 20.890 | 20.743 | 20.890 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 34.919 | 35.387 | 34.685 | 35.387 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 21.094 | 22.444 | 20.374 | 22.444 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 32.153 | 47.748 | 31.955 | 47.748 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.233 | 0.259 | 0.221 | 0.259 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.292 | 3.401 | 3.153 | 3.401 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 156.955 | 165.673 | 151.897 | 165.673 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1420.272 | 1460.181 | 1415.983 | 1460.181 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.155 | 0.167 | 0.147 | 0.167 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.224 | 2.265 | 2.223 | 2.265 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.024 | 0.039 | 0.020 | 0.039 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.458 | 0.473 | 0.458 | 0.473 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.757 | 5.633 | 1.687 | 5.633 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 5.836 | 6.395 | 5.751 | 6.395 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.773 | 0.871 | 0.746 | 0.871 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.890 | 2.958 | 2.856 | 2.958 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 158.620 | 162.332 | 157.115 | 162.332 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1425.807 | 1493.121 | 1422.865 | 1493.121 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.116 | 0.136 | 0.115 | 0.136 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.472 | 2.593 | 2.456 | 2.593 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.024 | 0.031 | 0.018 | 0.031 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.624 | 0.655 | 0.601 | 0.655 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 2.964 | 3.113 | 2.949 | 3.113 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.130 | 7.871 | 6.897 | 7.871 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.120 | 1.317 | 1.112 | 1.317 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.980 | 3.016 | 2.936 | 3.016 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.373 | 167.791 | 158.046 | 167.791 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1446.109 | 1448.190 | 1430.790 | 1448.190 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.154 | 0.174 | 0.149 | 0.174 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.178 | 2.223 | 2.150 | 2.223 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.031 | 0.020 | 0.031 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.427 | 0.441 | 0.427 | 0.441 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 18.893 | 20.216 | 18.634 | 20.216 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 27.457 | 27.863 | 26.953 | 27.863 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.829 | 0.907 | 0.635 | 0.907 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.856 | 2.921 | 2.804 | 2.921 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 167.269 | 181.144 | 156.505 | 181.144 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1510.738 | 1526.165 | 1471.761 | 1526.165 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.151 | 0.262 | 0.147 | 0.262 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.221 | 2.285 | 2.170 | 2.285 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.020 | 0.028 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.428 | 0.453 | 0.417 | 0.453 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 9.546 | 10.708 | 9.447 | 10.708 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 18.949 | 22.588 | 17.789 | 22.588 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.750 | 0.869 | 0.714 | 0.869 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.902 | 2.977 | 2.855 | 2.977 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.031 | 173.570 | 156.934 | 173.570 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1438.681 | 1460.258 | 1434.105 | 1460.258 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.145 | 0.176 | 0.136 | 0.176 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.076 | 2.149 | 2.063 | 2.149 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.039 | 0.021 | 0.039 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.430 | 0.450 | 0.422 | 0.450 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 7.912 | 9.740 | 6.657 | 9.740 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 12.820 | 13.584 | 12.657 | 13.584 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.908 | 0.969 | 0.664 | 0.969 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.850 | 3.047 | 2.818 | 3.047 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.928 | 157.317 | 155.323 | 157.317 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1421.416 | 1430.192 | 1419.554 | 1430.192 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.157 | 0.164 | 0.149 | 0.164 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.053 | 2.130 | 2.024 | 2.130 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.035 | 0.020 | 0.035 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.457 | 0.470 | 0.447 | 0.470 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 9.040 | 9.955 | 8.543 | 9.955 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 15.632 | 16.481 | 15.614 | 16.481 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.717 | 0.888 | 0.696 | 0.888 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.872 | 2.924 | 2.814 | 2.924 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.656 | 167.224 | 161.018 | 167.224 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1455.600 | 1614.031 | 1434.678 | 1614.031 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.172 | 0.174 | 0.171 | 0.174 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.256 | 2.373 | 2.216 | 2.373 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.031 | 0.026 | 0.031 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.455 | 0.499 | 0.432 | 0.499 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 8.064 | 9.298 | 7.823 | 9.298 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 15.346 | 15.768 | 15.215 | 15.768 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.761 | 1.083 | 0.757 | 1.083 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 4.521 | 4.926 | 3.208 | 4.926 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.638 | 168.706 | 155.769 | 168.706 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1435.466 | 1510.016 | 1432.663 | 1510.016 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.152 | 0.265 | 0.139 | 0.265 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.226 | 2.275 | 2.219 | 2.275 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.034 | 0.027 | 0.034 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.474 | 0.511 | 0.459 | 0.511 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 17.017 | 18.395 | 16.692 | 18.395 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 26.764 | 26.895 | 24.483 | 26.895 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.882 | 0.951 | 0.805 | 0.951 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.926 | 3.723 | 2.881 | 3.723 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 155.935 | 168.505 | 155.521 | 168.505 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1431.136 | 1434.380 | 1421.058 | 1434.380 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.151 | 0.168 | 0.137 | 0.168 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.213 | 2.276 | 2.199 | 2.276 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.027 | 0.031 | 0.026 | 0.031 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.421 | 0.447 | 0.418 | 0.447 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 16.869 | 17.951 | 16.850 | 17.951 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 24.332 | 24.985 | 24.250 | 24.985 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.915 | 1.027 | 0.841 | 1.027 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.923 | 2.973 | 2.863 | 2.973 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 171.515 | 244.882 | 160.531 | 244.882 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1454.663 | 1479.636 | 1422.230 | 1479.636 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.152 | 0.170 | 0.142 | 0.170 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.482 | 2.496 | 2.442 | 2.496 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.026 | 0.036 | 0.025 | 0.036 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.451 | 0.468 | 0.451 | 0.468 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 16.294 | 18.348 | 15.996 | 18.348 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 26.555 | 27.185 | 26.339 | 27.185 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.394 | 1.530 | 1.233 | 1.530 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.464 | 3.593 | 3.372 | 3.593 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 155.406 | 183.321 | 155.300 | 183.321 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1446.984 | 1529.899 | 1432.763 | 1529.899 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.141 | 0.166 | 0.137 | 0.166 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.188 | 2.232 | 2.185 | 2.232 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.026 | 0.071 | 0.021 | 0.071 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.440 | 0.449 | 0.418 | 0.449 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 16.814 | 18.087 | 16.721 | 18.087 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 25.794 | 26.599 | 25.171 | 26.599 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.815 | 0.912 | 0.599 | 0.912 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.949 | 3.078 | 2.870 | 3.078 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 160.156 | 165.143 | 156.592 | 165.143 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1432.289 | 1462.755 | 1422.624 | 1462.755 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.154 | 0.257 | 0.134 | 0.257 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.210 | 2.287 | 2.196 | 2.287 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.027 | 0.035 | 0.020 | 0.035 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.449 | 0.461 | 0.439 | 0.461 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 7.456 | 22.771 | 6.450 | 22.771 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.738 | 13.964 | 13.440 | 13.964 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.873 | 0.972 | 0.665 | 0.972 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.918 | 3.024 | 2.915 | 3.024 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 165.429 | 172.451 | 159.762 | 172.451 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1549.157 | 1624.588 | 1467.811 | 1624.588 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.139 | 0.198 | 0.132 | 0.198 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.784 | 3.180 | 2.616 | 3.180 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.017 | 0.021 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.645 | 0.689 | 0.600 | 0.689 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 40.077 | 41.558 | 39.710 | 41.558 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 41.367 | 43.573 | 39.584 | 43.573 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.120 | 1.291 | 1.115 | 1.291 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.508 | 4.812 | 3.434 | 4.812 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 155.624 | 160.400 | 154.003 | 160.400 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1500.918 | 1538.863 | 1481.545 | 1538.863 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.181 | 0.255 | 0.177 | 0.255 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.339 | 2.478 | 2.322 | 2.478 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.025 | 0.033 | 0.024 | 0.033 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.550 | 0.609 | 0.506 | 0.609 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 101.481 | 107.011 | 100.207 | 107.011 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 121.710 | 126.682 | 121.520 | 126.682 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 0.995 | 1.366 | 0.991 | 1.366 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.632 | 3.751 | 3.439 | 3.751 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 163.548 | 181.901 | 159.862 | 181.901 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1501.343 | 1812.416 | 1444.180 | 1812.416 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.178 | 0.237 | 0.141 | 0.237 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.730 | 3.198 | 2.721 | 3.198 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.025 | 0.061 | 0.019 | 0.061 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.762 | 0.769 | 0.741 | 0.769 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 134.052 | 145.628 | 134.050 | 145.628 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 113.467 | 113.852 | 113.149 | 113.852 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.580 | 3.041 | 1.544 | 3.041 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.559 | 3.636 | 3.539 | 3.636 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 156.947 | 178.705 | 154.943 | 178.705 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1465.539 | 1556.924 | 1434.313 | 1556.924 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.154 | 0.256 | 0.139 | 0.256 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.235 | 2.709 | 2.166 | 2.709 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.023 | 0.031 | 0.021 | 0.031 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.442 | 0.445 | 0.437 | 0.445 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 6.058 | 9.190 | 5.985 | 9.190 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.789 | 15.294 | 13.432 | 15.294 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.802 | 0.921 | 0.737 | 0.921 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 3.047 | 3.192 | 3.025 | 3.192 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.595 | 163.352 | 155.268 | 163.352 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1428.888 | 1442.512 | 1421.598 | 1442.512 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.182 | 0.207 | 0.141 | 0.207 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.137 | 2.904 | 2.058 | 2.904 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.034 | 0.022 | 0.034 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.434 | 0.448 | 0.424 | 0.448 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 116.536 | 117.576 | 116.437 | 117.576 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 129.139 | 129.325 | 128.149 | 129.325 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.761 | 0.918 | 0.746 | 0.918 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.918 | 3.006 | 2.830 | 3.006 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.935 | 157.051 | 154.502 | 157.051 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1431.896 | 1812.167 | 1419.489 | 1812.167 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.146 | 0.168 | 0.137 | 0.168 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.019 | 2.091 | 1.976 | 2.091 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.067 | 0.026 | 0.067 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.408 | 0.435 | 0.403 | 0.435 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 15.142 | 16.436 | 15.088 | 16.436 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 20.181 | 20.879 | 20.147 | 20.879 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.738 | 0.932 | 0.647 | 0.932 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.828 | 2.912 | 2.820 | 2.912 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 160.502 | 162.219 | 160.300 | 162.219 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1436.995 | 1525.239 | 1431.290 | 1525.239 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.164 | 0.167 | 0.142 | 0.167 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.429 | 3.487 | 3.369 | 3.487 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.023 | 0.038 | 0.022 | 0.038 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.612 | 0.640 | 0.605 | 0.640 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.375 | 11.515 | 9.208 | 11.515 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 17.679 | 18.719 | 17.380 | 18.719 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 1.008 | 1.064 | 1.006 | 1.064 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.196 | 4.283 | 4.141 | 4.283 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 167.946 | 178.207 | 165.170 | 178.207 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1433.295 | 1466.123 | 1429.036 | 1466.123 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.172 | 0.273 | 0.156 | 0.273 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.197 | 2.328 | 2.150 | 2.328 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.034 | 0.022 | 0.034 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.437 | 0.437 | 0.433 | 0.437 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.664 | 10.084 | 6.624 | 10.084 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.862 | 15.143 | 13.352 | 15.143 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.827 | 0.902 | 0.770 | 0.902 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.783 | 2.838 | 2.773 | 2.838 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.058 | 158.794 | 156.870 | 158.794 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1434.357 | 1445.877 | 1433.300 | 1445.877 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.157 | 0.274 | 0.148 | 0.274 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.186 | 2.265 | 2.179 | 2.265 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.079 | 0.026 | 0.079 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.425 | 0.450 | 0.407 | 0.450 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.936 | 11.251 | 10.307 | 11.251 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 16.027 | 16.712 | 15.846 | 16.712 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.815 | 0.947 | 0.767 | 0.947 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.861 | 2.906 | 2.841 | 2.906 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.238 | 192.116 | 159.522 | 192.116 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1451.288 | 1664.118 | 1429.297 | 1664.118 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.177 | 0.186 | 0.174 | 0.186 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.733 | 3.779 | 3.704 | 3.779 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.052 | 0.021 | 0.052 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.672 | 0.707 | 0.640 | 0.707 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 28.434 | 29.404 | 28.345 | 29.404 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 43.374 | 43.921 | 43.108 | 43.921 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.919 | 1.003 | 0.882 | 1.003 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.227 | 5.467 | 5.099 | 5.467 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.876 | 185.983 | 157.733 | 185.983 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1463.999 | 1500.233 | 1444.014 | 1500.233 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.177 | 0.187 | 0.172 | 0.187 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.699 | 3.772 | 3.690 | 3.772 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.028 | 0.021 | 0.028 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.671 | 0.698 | 0.670 | 0.698 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 25.668 | 28.324 | 25.255 | 28.324 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 40.062 | 40.391 | 39.971 | 40.391 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.945 | 2.604 | 0.890 | 2.604 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.190 | 5.937 | 5.124 | 5.937 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 162.937 | 182.401 | 161.172 | 182.401 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1432.531 | 1489.823 | 1432.332 | 1489.823 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.149 | 0.174 | 0.134 | 0.174 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.224 | 2.349 | 2.202 | 2.349 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.025 | 0.032 | 0.020 | 0.032 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.422 | 0.453 | 0.420 | 0.453 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 9.236 | 10.300 | 9.172 | 10.300 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 17.051 | 19.368 | 16.424 | 19.368 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.871 | 0.878 | 0.722 | 0.878 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.862 | 2.904 | 2.854 | 2.904 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 173.439 | 239.380 | 159.167 | 239.380 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1513.683 | 1646.474 | 1481.300 | 1646.474 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.126 | 0.135 | 0.123 | 0.135 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.461 | 2.541 | 2.433 | 2.541 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.024 | 0.027 | 0.023 | 0.027 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.473 | 0.502 | 0.456 | 0.502 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 7.760 | 9.286 | 7.705 | 9.286 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 15.870 | 16.348 | 14.891 | 16.348 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 1.182 | 1.232 | 1.180 | 1.232 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.233 | 3.359 | 3.228 | 3.359 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 161.788 | 180.027 | 160.683 | 180.027 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1470.230 | 1522.515 | 1467.257 | 1522.515 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.132 | 0.144 | 0.125 | 0.144 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.466 | 2.508 | 2.418 | 2.508 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.027 | 0.029 | 0.025 | 0.029 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.454 | 0.467 | 0.450 | 0.467 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 10.018 | 10.260 | 9.842 | 10.260 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 17.764 | 18.807 | 17.718 | 18.807 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 1.165 | 1.252 | 1.135 | 1.252 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.275 | 3.348 | 3.244 | 3.348 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 165.076 | 182.345 | 159.435 | 182.345 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1437.549 | 1651.960 | 1434.744 | 1651.960 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.154 | 0.156 | 0.135 | 0.156 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.211 | 2.289 | 2.207 | 2.289 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.025 | 0.035 | 0.021 | 0.035 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.422 | 0.452 | 0.421 | 0.452 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 11.018 | 11.940 | 10.727 | 11.940 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 18.089 | 18.497 | 17.572 | 18.497 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.862 | 0.932 | 0.804 | 0.932 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.884 | 2.949 | 2.877 | 2.949 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 155.309 | 184.815 | 154.920 | 184.815 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1509.936 | 1571.442 | 1480.103 | 1571.442 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.141 | 0.160 | 0.128 | 0.160 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.229 | 2.373 | 2.213 | 2.373 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.026 | 0.033 | 0.021 | 0.033 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.455 | 0.547 | 0.451 | 0.547 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 8.920 | 10.100 | 7.910 | 10.100 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 15.124 | 16.668 | 14.849 | 16.668 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.891 | 1.202 | 0.711 | 1.202 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.856 | 2.988 | 2.852 | 2.988 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 174.213 | 207.971 | 161.888 | 207.971 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1487.137 | 1604.406 | 1434.739 | 1604.406 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.161 | 0.418 | 0.151 | 0.418 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.323 | 2.382 | 2.269 | 2.382 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.027 | 0.068 | 0.022 | 0.068 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.451 | 0.484 | 0.435 | 0.484 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 17.308 | 19.969 | 15.886 | 19.969 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 25.049 | 26.528 | 24.891 | 26.528 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 1.011 | 2.041 | 0.935 | 2.041 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.352 | 3.442 | 3.335 | 3.442 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 195.694 | 234.125 | 188.315 | 234.125 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1745.129 | 4157.832 | 1666.715 | 4157.832 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 165.932 | 175.395 | 154.940 | 175.395 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1698.387 | 1821.556 | 1575.048 | 1821.556 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.177 | 0.207 | 0.151 | 0.207 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.772 | 3.013 | 2.570 | 3.013 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.031 | 0.041 | 0.027 | 0.041 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.616 | 0.823 | 0.519 | 0.823 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.043 | 0.066 | 0.042 | 0.066 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.525 | 0.603 | 0.498 | 0.603 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 0.962 | 3.035 | 0.897 | 3.035 | 149.1 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 88.769 | 100.187 | 88.299 | 100.187 | 128.2 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 189.479 | 196.901 | 183.743 | 196.901 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1505.085 | 1676.991 | 1486.843 | 1676.991 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.347 | 168.665 | 157.840 | 168.665 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1556.585 | 1721.621 | 1533.516 | 1721.621 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.176 | 0.219 | 0.149 | 0.219 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.538 | 2.631 | 2.499 | 2.631 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.033 | 0.036 | 0.031 | 0.036 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.511 | 0.597 | 0.500 | 0.597 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.045 | 0.059 | 0.043 | 0.059 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.524 | 0.559 | 0.519 | 0.559 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.550 | 2.342 | 0.518 | 2.342 | 142.3 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 27.160 | 66.120 | 23.598 | 66.120 | 128.2 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 190.786 | 194.338 | 189.292 | 194.338 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1525.198 | 1654.583 | 1488.506 | 1654.583 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.998 | 161.763 | 156.785 | 161.763 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1496.176 | 1521.520 | 1461.132 | 1521.520 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.228 | 0.340 | 0.179 | 0.340 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.738 | 3.942 | 3.667 | 3.942 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.029 | 0.035 | 0.021 | 0.035 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.675 | 0.835 | 0.657 | 0.835 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.070 | 0.090 | 0.053 | 0.090 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.564 | 0.578 | 0.549 | 0.578 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.699 | 1.279 | 0.569 | 1.279 | 144.1 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 30.183 | 43.850 | 30.004 | 43.850 | 128.2 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 193.001 | 273.890 | 189.045 | 273.890 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1544.413 | 1693.096 | 1518.139 | 1693.096 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.246 | 178.655 | 155.806 | 178.655 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1464.670 | 1528.248 | 1447.405 | 1528.248 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.223 | 0.371 | 0.194 | 0.371 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.830 | 4.073 | 3.800 | 4.073 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.041 | 0.054 | 0.025 | 0.054 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.778 | 1.451 | 0.709 | 1.451 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.055 | 0.074 | 0.052 | 0.074 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.555 | 0.578 | 0.518 | 0.578 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.598 | 1.131 | 0.559 | 1.131 | 144.0 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 25.515 | 40.732 | 25.176 | 40.732 | 128.2 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 185.706 | 213.185 | 177.298 | 213.185 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1501.716 | 1560.292 | 1463.561 | 1560.292 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 179.774 | 250.295 | 158.912 | 250.295 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1475.268 | 1544.424 | 1451.516 | 1544.424 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.206 | 0.313 | 0.142 | 0.313 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.564 | 2.703 | 2.534 | 2.703 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.025 | 0.045 | 0.020 | 0.045 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.627 | 0.674 | 0.624 | 0.674 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.058 | 0.066 | 0.054 | 0.066 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.595 | 0.619 | 0.580 | 0.619 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.919 | 0.990 | 0.845 | 0.990 | 148.7 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 30.504 | 43.969 | 25.296 | 43.969 | 128.2 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 192.674 | 221.011 | 188.299 | 221.011 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1565.435 | 1646.716 | 1535.905 | 1646.716 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 165.966 | 206.103 | 154.568 | 206.103 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1514.415 | 1538.219 | 1511.566 | 1538.219 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.147 | 0.201 | 0.142 | 0.201 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.339 | 2.569 | 2.228 | 2.569 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.019 | 0.029 | 0.017 | 0.029 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.468 | 0.506 | 0.448 | 0.506 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.021 | 0.028 | 0.019 | 0.028 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.480 | 0.501 | 0.474 | 0.501 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.389 | 2.617 | 1.129 | 2.617 | 150.9 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 79.333 | 81.776 | 78.238 | 81.776 | 128.2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 349.921 | 586.471 | 330.047 | 586.471 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1854.085 | 1989.039 | 1843.625 | 1989.039 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 204.503 | 235.941 | 192.894 | 235.941 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1792.197 | 1854.788 | 1747.145 | 1854.788 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.168 | 0.293 | 0.142 | 0.293 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.954 | 3.402 | 2.826 | 3.402 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.029 | 0.048 | 0.019 | 0.048 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.795 | 0.817 | 0.780 | 0.817 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.087 | 0.138 | 0.050 | 0.138 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.824 | 1.159 | 0.803 | 1.159 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 23.552 | 24.170 | 23.038 | 24.170 | 156.4 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 291.942 | 314.713 | 274.571 | 314.713 | 133.1 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 332.400 | 362.469 | 327.366 | 362.469 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1840.626 | 1885.202 | 1822.590 | 1885.202 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 199.829 | 222.426 | 192.859 | 222.426 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1731.874 | 1798.890 | 1720.677 | 1798.890 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.235 | 0.368 | 0.163 | 0.368 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.806 | 3.066 | 2.741 | 3.066 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.029 | 0.041 | 0.020 | 0.041 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.800 | 0.819 | 0.770 | 0.819 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.081 | 0.128 | 0.061 | 0.128 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.775 | 0.819 | 0.763 | 0.819 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 23.145 | 24.126 | 23.099 | 24.126 | 158.5 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 285.734 | 296.705 | 279.357 | 296.705 | 133.4 |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `bc4f2208715745367a9d8a2b9708bfefd1a48b2d`
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

