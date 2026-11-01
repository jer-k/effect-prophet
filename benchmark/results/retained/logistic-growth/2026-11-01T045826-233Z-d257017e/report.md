# Effect Prophet benchmark — 2026-11-01T045826-233Z-d257017e

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
| anomalies-logistic-defaults-99 | scalar-process-different-public-work | passed | 1.096e-1 | 7.468e-4 | 7.468e-4 | 1.097e-1 | 1.382e-2 | 0.657 | Verified fitted point behavior under logistic-python-reconciliation-v1; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Both libraries flagged all 3 injected outliers. Effect flagged at most 3 rows and Python 3; 0 were flagged by only one library, each between the two libraries' bounds. Output-first: investigate internal fit differences in objective. |
| warm-start-logistic-defaults-7-new-rows | equivalent-objective | passed | 5.800e-2 | 1.353e-4 | 1.353e-4 | 5.795e-2 | 1.295e-3 | n/a | Verified equivalent behavior for this configuration under evidence logistic-python-reconciliation-v1. Each library refit from its own fit of the first 358 rows; their starting parameters differed by at most 0.0656 in scaled units. Output-first: investigate internal fit differences in objective, warm-start-parameters. |
| evaluation-logistic-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.613e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.807e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-logistic-large-months-metrics | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.682e-1 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed, and Effect's built-in and custom metrics on Python's own CV rows equal performance_metrics exactly in both horizon units; public evaluation/metric work differs. MASE fold scales agree within 1e-12 relative, and overall MASE within its forecasts' difference. Absolute times only. |
| evaluation-logistic-large-parallel | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 6.622e-2 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
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
| country-us-logistic-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12550 | 27746 |
| country-us-logistic-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12550 | 27746 |
| country-explicit-us-logistic-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3831 | 30562 |
| country-explicit-us-logistic-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3831 | 30562 |
| country-us-logistic-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12570 | 27760 |
| country-us-logistic-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | true | 2024 | 12 | 12570 | 27760 |
| country-explicit-us-logistic-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3839 | 30576 |
| country-explicit-us-logistic-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:11cd784d6c90ad62f915def4f2a73bb1dc85446feb1a048eb0ed8fc56937e33b | false | n/a | 12 | 3839 | 30576 |

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
| anomalies-logistic-defaults-99 | 0 | 6.473574e+0 | 6.184515e+1 | 5.537158e+1 | output-first | n/a |
| anomalies-logistic-defaults-99 | 1 | 6.473574e+0 | 6.184515e+1 | 5.537158e+1 | output-first | n/a |
| warm-start-logistic-defaults-7-new-rows | 0 | 6.886317e+1 | 1.450545e+2 | 7.619138e+1 | output-first | n/a |
| warm-start-logistic-defaults-7-new-rows | 1 | 6.886317e+1 | 1.450545e+2 | 7.619138e+1 | output-first | n/a |
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

Internal fit evidence that differs from Python beyond its declared investigation threshold. These rows do not fail the case: fitted outputs gate eligibility. Each flag should be explained in validation notes. Stationarity is flagged only when Effect's residual exceeds Python's. Warm-start parameters are flagged when the two libraries' base fits start their refits further apart than the case allows.

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
| anomalies-logistic-defaults-99 | 0 | objective | -1.234595e+3 | -1.233998e+3 | -5.977039e-1 | 1.000e-2 |
| anomalies-logistic-defaults-99 | 1 | objective | -1.234595e+3 | -1.233998e+3 | -5.977039e-1 | 1.000e-2 |
| warm-start-logistic-defaults-7-new-rows | 0 | objective | -1.687641e+3 | -1.688476e+3 | 8.349156e-1 | 1.000e-2 |
| warm-start-logistic-defaults-7-new-rows | 1 | objective | -1.687641e+3 | -1.688476e+3 | 8.349156e-1 | 1.000e-2 |
| warm-start-logistic-defaults-7-new-rows | 0 | warm-start-parameters | -2.623396e+0 | -2.689005e+0 | 6.560831e-2 | 1.000e-2 |
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

Anomaly workloads check the whole history in-sample. Effect's `warm-anomalies` times the public `anomalies` call, fit included; Python's times a fresh fit, `predict(history, vectorized=False)` and the strict `y < yhat_lower | y > yhat_upper` comparison. Each library's flags must be exactly the rows outside its own value intervals, and both must flag every declared outlier. Rows flagged by one library alone are counted, not failed.

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
| anomalies-logistic-defaults-99 | 365 | 6 | 25 | 365 | 0 | 0 | 1000 | intervals | 67108864 | logistic-anomalies-v1:logit=-3+6t|1.5t|4t@0.35,0.65+weekly+bounded-noise-x10+outliers@70(+25),180(-25),290(+20):changing-capacity:n=365:h=0 / f92aff28ec2c019e6c7a4aa0e8212f37dc46671743801175f23c953ca5e56275 | docs/validation/uncertainty.md#evidence-classes |

## Warm-start workloads

Warm-start cases fit the first rows of a history, read that fit's Stan parameters with `warmStartParameters` or `warm_start_params`, and refit the whole history from them. That refit is the model every correctness gate and prediction phase uses. `warm-start-fit` times the refit alone; the base fit is untimed. `warm-fit` times a fresh fit of the same history for comparison.

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Effect runs folds one at a time. Python runs them sequentially too, except in `-threads` and `-processes` phases, which time `cross_validation(parallel=...)` with Prophet's default pools and must return the sequential point rows and search scores exactly. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-logistic-point | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons | n/a |
| evaluation-logistic-intervals | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 256 | 19 / 0.8 | horizons | n/a |
| evaluation-logistic-search | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 2 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons | ea6a5ef3fa66d70a4e00c996cfe9bc37217b3a0beb24a4ef92bc3f10f706c675, b06b02f1c576fa97c475d5837db49b1b93e6d43804b2cd8e2b6a95628977a5ae |
| evaluation-logistic-large-point | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 0 | n/a / n/a | rolling | n/a |
| evaluation-logistic-large-intervals | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 256 | 19 / 0.8 | rolling | n/a |
| evaluation-logistic-large-months-metrics | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 3 | 436 | 273 | 4 | 1 | 0 | n/a / n/a | horizons | n/a |
| evaluation-logistic-large-parallel | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 3 | 12 | 2526 | 84 | 4 | 1 | 0 | n/a / n/a | horizons | b2ade82f1451af519f00e057ad5b8db860287430d3130093fd06b6a70c24c8ce, f21b216c86b55d627c58d554ce407ce8677c0a34e4551bf9d1a2a471efcee514, c2f468d0f6458fa1d0c67d783d8c7e5eb721726c6756c4a00dc9bc8d42ebce0a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-logistic-defaults-99 | warm-anomalies | effect-prophet | 6 | 70.632 | 71.692 | 70.253 | 71.692 | n/a |
| anomalies-logistic-defaults-99 | warm-anomalies | python-prophet | 6 | 302.847 | 323.148 | 298.579 | 323.148 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | effect-prophet | 6 | 52.154 | 52.339 | 51.868 | 52.339 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | python-prophet | 6 | 45.047 | 45.357 | 44.348 | 45.357 | n/a |
| anomalies-logistic-defaults-99 | warm-uncertainty | effect-prophet | 6 | 14.327 | 14.482 | 14.152 | 14.482 | 160.8 |
| anomalies-logistic-defaults-99 | warm-uncertainty | python-prophet | 6 | 250.948 | 269.886 | 249.314 | 269.886 | 131.8 |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.037 | 0.017 | 0.037 | 141.2 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.508 | 0.577 | 0.483 | 0.577 | 131.8 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 204.519 | 210.165 | 200.436 | 210.165 | 149.0 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1482.568 | 1567.835 | 1474.031 | 1567.835 | 131.8 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 154.540 | 157.900 | 152.069 | 157.900 | 149.1 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1450.640 | 1485.428 | 1437.890 | 1485.428 | 131.8 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.353 | 0.462 | 0.337 | 0.462 | 149.1 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.165 | 4.321 | 4.071 | 4.321 | 131.8 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.027 | 0.034 | 0.017 | 0.034 | 149.0 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.751 | 0.799 | 0.727 | 0.799 | 131.8 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.117 | 32.476 | 30.587 | 32.476 | 148.8 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 55.883 | 56.205 | 55.519 | 56.205 | 131.8 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 31.129 | 31.300 | 30.666 | 31.300 | 145.5 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 55.270 | 56.005 | 54.910 | 56.005 | 131.8 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 31.565 | 33.071 | 31.295 | 33.071 | 145.2 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 50.225 | 51.564 | 50.012 | 51.564 | 131.8 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.153 | 0.188 | 0.137 | 0.188 | 145.2 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 5.092 | 5.455 | 4.980 | 5.455 | 131.8 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.030 | 0.012 | 0.030 | 143.5 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.492 | 0.596 | 0.483 | 0.596 | 131.8 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 213.518 | 218.829 | 211.526 | 218.829 | 155.8 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1499.311 | 1533.715 | 1483.279 | 1533.715 | 131.8 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.199 | 165.235 | 156.044 | 165.235 | 156.2 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1442.103 | 1464.535 | 1431.424 | 1464.535 | 131.8 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.351 | 0.402 | 0.338 | 0.402 | 155.9 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.171 | 5.306 | 4.059 | 5.306 | 131.8 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.028 | 0.032 | 0.017 | 0.032 | 155.8 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.718 | 0.761 | 0.695 | 0.761 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.164 | 44.018 | 42.631 | 44.018 | 155.6 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 63.904 | 64.834 | 62.928 | 64.834 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.051 | 43.414 | 42.836 | 43.414 | 152.2 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 63.458 | 65.425 | 63.258 | 65.425 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 43.896 | 45.435 | 43.622 | 45.435 | 149.3 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 57.971 | 59.351 | 57.510 | 59.351 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.157 | 0.173 | 0.131 | 0.173 | 152.1 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.844 | 4.950 | 4.786 | 4.950 | 131.8 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.026 | 0.015 | 0.026 | 145.1 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.526 | 0.540 | 0.509 | 0.540 | 148.3 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 206.809 | 212.132 | 201.988 | 212.132 | 155.1 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1687.744 | 1712.965 | 1651.593 | 1712.965 | 148.3 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 164.904 | 175.923 | 159.235 | 175.923 | 158.1 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1611.362 | 1627.326 | 1591.436 | 1627.326 | 148.3 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.754 | 1.004 | 0.725 | 1.004 | 155.4 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.107 | 4.281 | 4.058 | 4.281 | 148.3 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.116 | 0.140 | 0.104 | 0.140 | 155.2 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.721 | 0.771 | 0.705 | 0.771 | 148.3 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.288 | 40.421 | 30.520 | 40.421 | 154.0 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 60.340 | 62.821 | 60.038 | 62.821 | 148.3 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 31.650 | 41.706 | 31.003 | 41.706 | 152.5 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 59.483 | 61.108 | 59.041 | 61.108 | 148.3 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 32.070 | 42.864 | 31.721 | 42.864 | 150.9 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 55.100 | 57.596 | 53.568 | 57.596 | 148.3 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.252 | 0.426 | 0.236 | 0.426 | 150.9 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.689 | 5.959 | 5.638 | 5.959 | 148.3 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.018 | 0.015 | 0.018 | 139.7 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.513 | 0.552 | 0.492 | 0.552 | 147.5 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 217.437 | 226.421 | 215.075 | 226.421 | 153.1 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1676.546 | 1766.136 | 1667.791 | 1766.136 | 147.5 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 157.103 | 160.331 | 155.616 | 160.331 | 156.1 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1611.016 | 1647.775 | 1599.024 | 1647.775 | 147.5 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.722 | 0.789 | 0.701 | 0.789 | 153.1 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.120 | 4.202 | 4.055 | 4.202 | 147.5 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.112 | 0.136 | 0.097 | 0.136 | 153.1 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.734 | 0.801 | 0.712 | 0.801 | 147.5 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.993 | 44.646 | 43.776 | 44.646 | 152.0 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 67.755 | 69.040 | 67.501 | 69.040 | 147.5 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 44.192 | 49.569 | 43.659 | 49.569 | 150.4 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 68.465 | 74.192 | 66.953 | 74.192 | 147.5 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.027 | 44.317 | 43.687 | 44.317 | 144.6 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 62.069 | 66.263 | 61.116 | 66.263 | 147.5 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.265 | 0.291 | 0.235 | 0.291 | 146.5 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.865 | 5.923 | 5.813 | 5.923 | 147.5 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 18.065 | 18.809 | 17.821 | 18.809 | 148.0 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 64.457 | 65.432 | 63.569 | 65.432 | 131.8 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 14.729 | 17.860 | 13.970 | 17.860 | 155.0 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 58.882 | 64.763 | 57.972 | 64.763 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.322 | 1.672 | 1.286 | 1.672 | 153.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 12.904 | 13.053 | 12.822 | 13.053 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.364 | 0.372 | 0.359 | 0.372 | 152.6 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.208 | 6.173 | 5.128 | 6.173 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 1.627 | 1.729 | 1.592 | 1.729 | 154.4 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 5.447 | 5.456 | 5.402 | 5.456 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.862 | 1.967 | 0.525 | 1.967 | 152.6 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.660 | 5.971 | 5.522 | 5.971 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-point-processes | python-prophet | 4 | 1499.260 | 1649.447 | 1499.069 | 1649.447 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-point-threads | python-prophet | 4 | 169.683 | 178.256 | 161.767 | 178.256 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-point | effect-prophet | 4 | 63.292 | 64.190 | 61.557 | 64.190 | 159.5 |
| evaluation-logistic-large-parallel | evaluation-point | python-prophet | 4 | 178.334 | 196.286 | 164.988 | 196.286 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-search-processes | python-prophet | 4 | 4535.360 | 4648.033 | 4504.924 | 4648.033 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-search-threads | python-prophet | 4 | 511.425 | 521.384 | 508.801 | 521.384 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-search | effect-prophet | 4 | 171.060 | 180.166 | 170.770 | 180.166 | 199.4 |
| evaluation-logistic-large-parallel | evaluation-search | python-prophet | 4 | 537.184 | 566.204 | 517.562 | 566.204 | 131.8 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 192.330 | 201.185 | 189.103 | 201.185 | 161.2 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1465.030 | 1497.128 | 1449.908 | 1497.128 | 131.8 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.440 | 2.647 | 2.310 | 2.647 | 161.1 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.332 | 1.367 | 1.298 | 1.367 | 131.8 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.044 | 0.080 | 0.044 | 0.080 | 130.7 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.503 | 0.525 | 0.501 | 0.525 | 131.8 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.063 | 0.084 | 0.061 | 0.084 | 160.6 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.403 | 5.540 | 5.358 | 5.540 | 131.8 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.398 | 2.368 | 1.246 | 2.368 | 135.3 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.751 | 0.808 | 0.742 | 0.808 | 131.8 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 13.096 | 15.745 | 13.057 | 15.745 | 160.2 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 42.035 | 42.118 | 41.878 | 42.118 | 131.8 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 189.566 | 204.441 | 187.306 | 204.441 | 160.5 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1472.174 | 1533.956 | 1470.836 | 1533.956 | 131.8 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 0.984 | 3.129 | 0.971 | 3.129 | 160.3 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.783 | 0.826 | 0.771 | 0.826 | 131.8 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.011 | 0.017 | 0.011 | 0.017 | 133.4 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.403 | 0.468 | 0.370 | 0.468 | 131.8 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.076 | 0.100 | 0.064 | 0.100 | 155.0 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.273 | 5.546 | 5.254 | 5.546 | 131.8 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.863 | 1.062 | 0.742 | 1.062 | 135.7 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.546 | 0.593 | 0.545 | 0.593 | 131.8 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 17.035 | 17.868 | 17.025 | 17.868 | 153.0 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 59.697 | 60.915 | 59.382 | 60.915 | 131.8 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.388 | 17.776 | 17.331 | 17.776 | 153.3 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 30.243 | 30.606 | 29.906 | 30.606 | 131.8 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.189 | 0.213 | 0.185 | 0.213 | 154.2 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 131.8 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.222 | 0.259 | 0.210 | 0.259 | 154.0 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 131.8 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 35.072 | 38.599 | 34.096 | 38.599 | 151.1 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 114.804 | 122.836 | 114.049 | 122.836 | 131.8 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.028 | 0.057 | 0.026 | 0.057 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.499 | 0.507 | 0.491 | 0.507 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 185.929 | 192.646 | 185.904 | 192.646 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1464.363 | 1479.743 | 1460.318 | 1479.743 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.020 | 167.504 | 156.124 | 167.504 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1429.765 | 1465.099 | 1427.291 | 1465.099 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.090 | 0.114 | 0.088 | 0.114 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.508 | 2.588 | 2.500 | 2.588 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.044 | 0.064 | 0.035 | 0.064 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.476 | 0.515 | 0.461 | 0.515 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.713 | 20.974 | 20.618 | 20.974 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 36.338 | 36.896 | 35.938 | 36.896 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 20.891 | 21.456 | 20.819 | 21.456 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 36.333 | 36.583 | 35.872 | 36.583 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.205 | 21.452 | 21.131 | 21.452 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.526 | 33.379 | 32.421 | 33.379 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.399 | 0.463 | 0.362 | 0.463 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.615 | 3.653 | 3.592 | 3.653 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.041 | 0.044 | 0.036 | 0.044 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.546 | 0.573 | 0.529 | 0.573 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 184.041 | 189.017 | 181.673 | 189.017 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1460.549 | 1471.319 | 1443.661 | 1471.319 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.182 | 178.004 | 153.073 | 178.004 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1429.894 | 1439.433 | 1424.978 | 1439.433 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.090 | 0.099 | 0.086 | 0.099 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.528 | 2.594 | 2.522 | 2.594 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.047 | 0.064 | 0.028 | 0.064 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.473 | 0.503 | 0.451 | 0.503 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.469 | 17.621 | 17.464 | 17.621 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 31.246 | 31.497 | 31.130 | 31.497 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 17.317 | 17.521 | 17.247 | 17.521 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 30.345 | 30.626 | 30.266 | 30.626 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.728 | 18.028 | 17.636 | 18.028 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 27.030 | 27.242 | 26.746 | 27.242 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.312 | 0.329 | 0.271 | 0.329 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.576 | 3.700 | 3.567 | 3.700 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.025 | 0.015 | 0.025 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.479 | 0.490 | 0.471 | 0.490 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 181.007 | 191.172 | 180.659 | 191.172 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1450.292 | 1472.347 | 1448.296 | 1472.347 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.522 | 159.520 | 151.403 | 159.520 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1431.302 | 1528.003 | 1429.766 | 1528.003 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.113 | 0.161 | 0.090 | 0.161 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.340 | 2.415 | 2.302 | 2.415 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.037 | 0.058 | 0.027 | 0.058 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.441 | 0.473 | 0.427 | 0.473 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.654 | 18.823 | 18.483 | 18.823 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 32.885 | 33.115 | 32.278 | 33.115 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 19.235 | 20.744 | 18.777 | 20.744 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 32.406 | 35.184 | 32.317 | 35.184 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 19.153 | 20.283 | 19.104 | 20.283 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 28.979 | 29.318 | 28.264 | 29.318 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.329 | 0.469 | 0.311 | 0.469 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.380 | 3.689 | 3.286 | 3.689 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.014 | 0.033 | 0.013 | 0.033 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.485 | 0.530 | 0.461 | 0.530 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 186.539 | 194.620 | 184.400 | 194.620 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1483.822 | 1539.671 | 1471.592 | 1539.671 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 156.468 | 161.581 | 154.832 | 161.581 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1447.078 | 1452.774 | 1439.829 | 1452.774 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.093 | 0.119 | 0.088 | 0.119 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.345 | 2.382 | 2.285 | 2.382 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.033 | 0.052 | 0.030 | 0.052 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.452 | 0.504 | 0.447 | 0.504 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.472 | 18.682 | 18.224 | 18.682 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 33.128 | 36.720 | 32.833 | 36.720 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 18.877 | 20.373 | 18.694 | 20.373 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 32.296 | 38.571 | 32.150 | 38.571 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.001 | 19.344 | 18.970 | 19.344 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 28.788 | 29.994 | 28.725 | 29.994 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.336 | 0.397 | 0.334 | 0.397 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.264 | 3.387 | 3.252 | 3.387 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.053 | 0.143 | 0.040 | 0.143 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.605 | 0.628 | 0.590 | 0.628 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 170.805 | 173.197 | 168.444 | 173.197 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1436.017 | 1465.241 | 1431.541 | 1465.241 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 157.165 | 185.267 | 156.839 | 185.267 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1460.831 | 1491.505 | 1445.965 | 1491.505 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.095 | 0.136 | 0.095 | 0.136 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.603 | 2.679 | 2.578 | 2.679 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.029 | 0.045 | 0.024 | 0.045 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.647 | 0.704 | 0.642 | 0.704 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.250 | 5.515 | 4.157 | 5.515 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.630 | 14.483 | 13.598 | 14.483 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.225 | 5.231 | 4.171 | 5.231 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 13.000 | 13.716 | 12.897 | 13.716 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.662 | 5.896 | 4.186 | 5.896 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.968 | 10.373 | 9.898 | 10.373 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.377 | 0.406 | 0.372 | 0.406 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.269 | 3.367 | 3.245 | 3.367 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.014 | 0.037 | 0.013 | 0.037 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.508 | 0.527 | 0.489 | 0.527 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 186.072 | 196.986 | 184.588 | 196.986 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1468.843 | 1485.401 | 1460.076 | 1485.401 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.428 | 158.765 | 152.974 | 158.765 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1434.908 | 1452.325 | 1429.828 | 1452.325 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.096 | 0.098 | 0.095 | 0.098 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.308 | 2.388 | 2.278 | 2.388 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.031 | 0.041 | 0.031 | 0.041 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.456 | 0.483 | 0.442 | 0.483 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.300 | 21.321 | 20.096 | 21.321 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 37.922 | 41.490 | 37.910 | 41.490 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.367 | 20.557 | 20.240 | 20.557 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 35.884 | 36.802 | 34.951 | 36.802 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.847 | 21.019 | 20.401 | 21.019 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 32.173 | 33.053 | 32.134 | 33.053 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.328 | 0.347 | 0.304 | 0.347 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.316 | 4.606 | 3.279 | 4.606 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 158.146 | 168.461 | 157.139 | 168.461 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1418.590 | 1434.583 | 1407.008 | 1434.583 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.126 | 0.155 | 0.107 | 0.155 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.241 | 2.270 | 2.187 | 2.270 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.021 | 0.027 | 0.017 | 0.027 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.455 | 0.471 | 0.434 | 0.471 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.743 | 1.837 | 1.494 | 1.837 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 6.514 | 8.162 | 5.779 | 8.162 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.965 | 1.554 | 0.897 | 1.554 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.897 | 2.936 | 2.850 | 2.936 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 163.037 | 167.920 | 157.494 | 167.920 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1422.930 | 1472.804 | 1409.352 | 1472.804 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.116 | 0.135 | 0.111 | 0.135 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.508 | 2.577 | 2.427 | 2.577 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.018 | 0.023 | 0.017 | 0.023 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.617 | 0.643 | 0.585 | 0.643 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 3.408 | 4.395 | 3.109 | 4.395 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.001 | 7.446 | 6.958 | 7.446 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.106 | 1.256 | 1.037 | 1.256 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.969 | 3.033 | 2.935 | 3.033 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.795 | 161.665 | 158.749 | 161.665 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1439.872 | 1476.220 | 1427.367 | 1476.220 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.117 | 0.133 | 0.116 | 0.133 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.262 | 2.348 | 2.238 | 2.348 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.022 | 0.015 | 0.022 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.440 | 0.453 | 0.440 | 0.453 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 19.073 | 19.109 | 18.921 | 19.109 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 28.057 | 32.671 | 27.840 | 32.671 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.921 | 0.950 | 0.918 | 0.950 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.919 | 3.014 | 2.902 | 3.014 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.660 | 170.950 | 158.651 | 170.950 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1429.697 | 1508.441 | 1419.625 | 1508.441 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.134 | 0.201 | 0.134 | 0.201 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.211 | 2.285 | 2.190 | 2.285 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.016 | 0.023 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.451 | 0.478 | 0.441 | 0.478 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 9.133 | 11.684 | 9.083 | 11.684 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 17.381 | 17.552 | 17.007 | 17.552 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.913 | 3.034 | 0.868 | 3.034 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.898 | 3.047 | 2.794 | 3.047 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 168.001 | 195.372 | 159.374 | 195.372 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1439.445 | 1454.816 | 1437.451 | 1454.816 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.173 | 0.183 | 0.149 | 0.183 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.116 | 2.165 | 2.082 | 2.165 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.032 | 0.020 | 0.032 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.447 | 0.462 | 0.440 | 0.462 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.775 | 9.626 | 6.650 | 9.626 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 13.291 | 13.656 | 13.152 | 13.656 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.877 | 1.219 | 0.835 | 1.219 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.942 | 3.039 | 2.901 | 3.039 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.864 | 168.380 | 154.922 | 168.380 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1431.234 | 1437.231 | 1429.585 | 1437.231 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.125 | 0.149 | 0.121 | 0.149 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.091 | 2.138 | 2.084 | 2.138 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.016 | 0.021 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.435 | 0.462 | 0.424 | 0.462 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.445 | 8.624 | 8.366 | 8.624 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 15.807 | 16.095 | 15.548 | 16.095 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.917 | 2.031 | 0.876 | 2.031 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.921 | 3.031 | 2.920 | 3.031 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.606 | 180.282 | 160.355 | 180.282 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1432.375 | 1445.227 | 1427.585 | 1445.227 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.161 | 0.189 | 0.130 | 0.189 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.243 | 2.315 | 2.225 | 2.315 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.024 | 0.018 | 0.024 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.451 | 0.469 | 0.447 | 0.469 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.799 | 8.263 | 7.716 | 8.263 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 15.281 | 15.801 | 14.992 | 15.801 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.880 | 1.144 | 0.834 | 1.144 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.974 | 3.057 | 2.941 | 3.057 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.119 | 163.506 | 159.900 | 163.506 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1423.560 | 1456.171 | 1414.468 | 1456.171 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.137 | 0.147 | 0.129 | 0.147 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.299 | 2.441 | 2.259 | 2.441 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.018 | 0.024 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.420 | 0.431 | 0.406 | 0.431 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 16.633 | 16.889 | 16.611 | 16.889 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 23.982 | 24.368 | 23.922 | 24.368 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.892 | 2.095 | 0.887 | 2.095 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.920 | 2.977 | 2.882 | 2.977 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 158.549 | 162.956 | 158.162 | 162.956 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1455.412 | 1567.804 | 1423.568 | 1567.804 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.120 | 0.144 | 0.117 | 0.144 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.234 | 2.286 | 2.228 | 2.286 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.434 | 0.481 | 0.419 | 0.481 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 16.942 | 17.253 | 16.715 | 17.253 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 25.410 | 26.524 | 25.079 | 26.524 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.961 | 1.122 | 0.888 | 1.122 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.899 | 3.608 | 2.881 | 3.608 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 162.708 | 164.504 | 162.225 | 164.504 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1427.453 | 1475.096 | 1418.624 | 1475.096 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.145 | 0.153 | 0.139 | 0.153 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.416 | 2.474 | 2.411 | 2.474 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.023 | 0.028 | 0.018 | 0.028 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.444 | 0.489 | 0.427 | 0.489 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 16.262 | 17.324 | 16.099 | 17.324 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 26.608 | 27.199 | 26.309 | 27.199 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.162 | 2.166 | 0.780 | 2.166 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.481 | 3.563 | 3.451 | 3.563 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 159.781 | 162.599 | 159.334 | 162.599 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1414.351 | 1436.993 | 1412.513 | 1436.993 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.120 | 0.137 | 0.117 | 0.137 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.155 | 2.186 | 2.127 | 2.186 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.018 | 0.023 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.424 | 0.447 | 0.410 | 0.447 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 16.471 | 16.826 | 16.342 | 16.826 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 25.231 | 26.127 | 25.124 | 26.127 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.924 | 1.059 | 0.903 | 1.059 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.864 | 2.892 | 2.861 | 2.892 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 159.585 | 166.053 | 159.239 | 166.053 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1421.149 | 1458.740 | 1407.938 | 1458.740 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.130 | 0.154 | 0.130 | 0.154 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.166 | 2.199 | 2.161 | 2.199 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.018 | 0.024 | 0.017 | 0.024 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.415 | 0.430 | 0.400 | 0.430 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.239 | 6.290 | 6.085 | 6.290 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.702 | 14.525 | 13.045 | 14.525 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.957 | 2.824 | 0.941 | 2.824 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.834 | 2.886 | 2.828 | 2.886 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 162.878 | 166.897 | 162.314 | 166.897 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1419.147 | 1437.805 | 1418.112 | 1437.805 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.136 | 0.207 | 0.136 | 0.207 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.546 | 2.692 | 2.485 | 2.692 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.021 | 0.029 | 0.020 | 0.029 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.624 | 0.678 | 0.597 | 0.678 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 38.941 | 40.800 | 38.676 | 40.800 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 39.419 | 42.746 | 38.629 | 42.746 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.306 | 1.926 | 1.105 | 1.926 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.464 | 3.496 | 3.413 | 3.496 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 162.456 | 174.702 | 157.953 | 174.702 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1412.109 | 1449.506 | 1409.244 | 1449.506 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.176 | 0.225 | 0.143 | 0.225 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.347 | 2.578 | 2.270 | 2.578 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.021 | 0.027 | 0.019 | 0.027 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.466 | 5.155 | 0.448 | 5.155 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 101.344 | 104.796 | 100.692 | 104.796 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 121.592 | 122.354 | 120.973 | 122.354 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.012 | 3.401 | 0.922 | 3.401 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.326 | 3.376 | 3.315 | 3.376 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 165.721 | 175.522 | 165.249 | 175.522 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1421.775 | 1451.075 | 1417.393 | 1451.075 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.154 | 0.189 | 0.147 | 0.189 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.773 | 3.009 | 2.686 | 3.009 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.020 | 0.038 | 0.019 | 0.038 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.822 | 1.168 | 0.802 | 1.168 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 132.263 | 132.768 | 132.054 | 132.768 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 111.227 | 114.508 | 111.018 | 114.508 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.649 | 2.038 | 1.613 | 2.038 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.555 | 3.707 | 3.499 | 3.707 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 158.978 | 160.534 | 156.803 | 160.534 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1413.481 | 1490.535 | 1402.241 | 1490.535 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.131 | 0.137 | 0.115 | 0.137 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.117 | 2.213 | 2.094 | 2.213 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.019 | 0.022 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.408 | 0.433 | 0.398 | 0.433 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 5.756 | 6.156 | 5.644 | 6.156 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.101 | 13.520 | 12.877 | 13.520 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.880 | 0.916 | 0.867 | 0.916 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 3.068 | 3.108 | 3.064 | 3.108 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.269 | 165.558 | 159.166 | 165.558 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1422.392 | 1456.612 | 1412.716 | 1456.612 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.135 | 0.186 | 0.121 | 0.186 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.052 | 2.112 | 2.046 | 2.112 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.036 | 0.020 | 0.036 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.444 | 0.473 | 0.436 | 0.473 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 115.679 | 117.246 | 115.528 | 117.246 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 127.000 | 128.595 | 126.572 | 128.595 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.981 | 1.050 | 0.959 | 1.050 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.985 | 3.067 | 2.908 | 3.067 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.840 | 174.141 | 157.522 | 174.141 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1423.581 | 1451.306 | 1418.489 | 1451.306 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.126 | 0.149 | 0.117 | 0.149 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.113 | 2.150 | 2.062 | 2.150 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.023 | 0.015 | 0.023 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.436 | 0.462 | 0.415 | 0.462 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 14.944 | 15.107 | 14.887 | 15.107 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 21.308 | 23.058 | 20.968 | 23.058 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.844 | 2.381 | 0.838 | 2.381 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.924 | 3.270 | 2.922 | 3.270 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 160.596 | 162.575 | 159.225 | 162.575 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1412.130 | 1456.751 | 1408.718 | 1456.751 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.173 | 0.195 | 0.161 | 0.195 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.340 | 3.462 | 3.318 | 3.462 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.019 | 0.024 | 0.017 | 0.024 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.583 | 0.615 | 0.578 | 0.615 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.987 | 11.034 | 9.647 | 11.034 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 17.511 | 18.819 | 16.821 | 18.819 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 0.734 | 2.294 | 0.718 | 2.294 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.248 | 4.357 | 4.110 | 4.357 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.492 | 164.080 | 158.751 | 164.080 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1428.839 | 1451.474 | 1417.826 | 1451.474 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.131 | 0.138 | 0.120 | 0.138 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.186 | 2.229 | 2.185 | 2.229 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.031 | 0.018 | 0.031 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.443 | 0.447 | 0.438 | 0.447 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.763 | 6.857 | 6.561 | 6.857 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.474 | 14.322 | 13.462 | 14.322 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.885 | 2.160 | 0.879 | 2.160 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.766 | 2.948 | 2.734 | 2.948 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.374 | 162.427 | 158.843 | 162.427 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1470.051 | 1603.029 | 1409.179 | 1603.029 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.131 | 0.150 | 0.127 | 0.150 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.200 | 4.330 | 2.168 | 4.330 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 1.335 | 0.017 | 1.335 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.424 | 1.190 | 0.407 | 1.190 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.097 | 10.516 | 9.985 | 10.516 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 16.459 | 20.425 | 15.541 | 20.425 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.883 | 0.933 | 0.883 | 0.933 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.814 | 3.723 | 2.809 | 3.723 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.196 | 195.964 | 161.440 | 195.964 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1416.492 | 1459.156 | 1412.582 | 1459.156 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.167 | 0.192 | 0.160 | 0.192 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.714 | 3.765 | 3.711 | 3.765 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.026 | 0.019 | 0.026 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.656 | 0.672 | 0.644 | 0.672 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 28.181 | 30.548 | 28.002 | 30.548 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 42.466 | 42.946 | 42.145 | 42.946 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.937 | 0.998 | 0.899 | 0.998 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.228 | 5.314 | 5.187 | 5.314 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.778 | 161.952 | 159.941 | 161.952 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1412.184 | 1427.107 | 1410.613 | 1427.107 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.168 | 0.181 | 0.164 | 0.181 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.719 | 3.821 | 3.710 | 3.821 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.032 | 0.020 | 0.032 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.649 | 0.672 | 0.638 | 0.672 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 26.466 | 27.795 | 26.122 | 27.795 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 39.721 | 41.525 | 39.440 | 41.525 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.948 | 1.012 | 0.896 | 1.012 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.015 | 5.028 | 4.976 | 5.028 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 157.011 | 162.210 | 156.372 | 162.210 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1416.798 | 1439.185 | 1407.189 | 1439.185 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.134 | 0.171 | 0.124 | 0.171 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.142 | 2.233 | 2.137 | 2.233 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.017 | 0.029 | 0.017 | 0.029 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.428 | 0.434 | 0.419 | 0.434 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.933 | 9.187 | 8.701 | 9.187 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 16.064 | 16.317 | 15.535 | 16.317 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.916 | 0.948 | 0.875 | 0.948 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.853 | 2.879 | 2.789 | 2.879 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 163.345 | 243.312 | 158.839 | 243.312 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1420.214 | 1445.991 | 1418.593 | 1445.991 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.129 | 0.295 | 0.129 | 0.295 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.384 | 2.423 | 2.370 | 2.423 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.021 | 0.029 | 0.019 | 0.029 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.458 | 0.485 | 0.450 | 0.485 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 8.526 | 9.511 | 8.162 | 9.511 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 14.930 | 15.472 | 14.708 | 15.472 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 0.739 | 3.549 | 0.715 | 3.549 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.257 | 3.406 | 3.188 | 3.406 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 159.279 | 160.858 | 159.220 | 160.858 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1413.931 | 1421.861 | 1411.114 | 1421.861 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.138 | 0.173 | 0.134 | 0.173 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.414 | 2.538 | 2.367 | 2.538 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.018 | 0.023 | 0.018 | 0.023 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.443 | 0.460 | 0.442 | 0.460 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 10.239 | 12.352 | 9.896 | 12.352 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 17.023 | 17.857 | 16.661 | 17.857 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 0.741 | 0.911 | 0.735 | 0.911 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.213 | 3.391 | 3.173 | 3.391 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 167.862 | 182.438 | 159.728 | 182.438 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1409.220 | 1422.721 | 1407.105 | 1422.721 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.129 | 0.164 | 0.121 | 0.164 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.168 | 2.205 | 2.142 | 2.205 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.018 | 0.023 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.423 | 0.429 | 0.420 | 0.429 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.448 | 10.978 | 10.193 | 10.978 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 17.635 | 18.342 | 17.302 | 18.342 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.869 | 1.012 | 0.830 | 1.012 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.813 | 2.824 | 2.802 | 2.824 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 160.335 | 163.558 | 159.311 | 163.558 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1411.250 | 1432.627 | 1398.425 | 1432.627 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.148 | 0.193 | 0.136 | 0.193 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.224 | 2.572 | 2.135 | 2.572 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.020 | 0.022 | 0.020 | 0.022 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.439 | 0.452 | 0.411 | 0.452 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 8.019 | 8.337 | 7.948 | 8.337 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.641 | 14.793 | 14.590 | 14.793 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.947 | 0.975 | 0.946 | 0.975 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.877 | 2.925 | 2.870 | 2.925 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 157.495 | 161.315 | 157.213 | 161.315 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1461.341 | 1675.948 | 1418.128 | 1675.948 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.135 | 0.139 | 0.133 | 0.139 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.250 | 2.572 | 2.219 | 2.572 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.019 | 0.022 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.435 | 0.461 | 0.433 | 0.461 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 15.087 | 15.302 | 14.824 | 15.302 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 23.889 | 24.826 | 23.889 | 24.826 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 0.991 | 1.103 | 0.982 | 1.103 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.266 | 3.286 | 3.229 | 3.286 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 192.075 | 204.997 | 186.356 | 204.997 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1563.738 | 1776.233 | 1555.739 | 1776.233 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.916 | 163.522 | 155.367 | 163.522 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1569.901 | 1802.514 | 1513.637 | 1802.514 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.157 | 0.187 | 0.127 | 0.187 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.511 | 2.603 | 2.451 | 2.603 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.026 | 0.032 | 0.021 | 0.032 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.496 | 0.536 | 0.482 | 0.536 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.056 | 0.111 | 0.042 | 0.111 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.516 | 0.521 | 0.502 | 0.521 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.098 | 1.515 | 1.029 | 1.515 | 144.8 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 91.103 | 104.768 | 89.672 | 104.768 | 131.8 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 192.007 | 221.833 | 189.173 | 221.833 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1483.293 | 1794.675 | 1472.979 | 1794.675 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.652 | 197.252 | 160.078 | 197.252 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1462.021 | 1547.332 | 1454.775 | 1547.332 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.160 | 0.231 | 0.133 | 0.231 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.546 | 2.617 | 2.478 | 2.617 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.023 | 0.032 | 0.020 | 0.032 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.491 | 0.513 | 0.454 | 0.513 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.030 | 0.052 | 0.024 | 0.052 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.517 | 0.548 | 0.516 | 0.548 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.920 | 1.194 | 0.686 | 1.194 | 144.8 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 24.104 | 37.318 | 23.623 | 37.318 | 131.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 192.485 | 195.602 | 190.568 | 195.602 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1524.003 | 1601.112 | 1492.203 | 1601.112 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.275 | 170.596 | 158.589 | 170.596 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1474.711 | 1493.479 | 1469.936 | 1493.479 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.178 | 0.248 | 0.145 | 0.248 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.840 | 4.094 | 3.745 | 4.094 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.025 | 0.035 | 0.019 | 0.035 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.729 | 0.786 | 0.692 | 0.786 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.045 | 0.094 | 0.035 | 0.094 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.553 | 0.593 | 0.529 | 0.593 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.826 | 1.666 | 0.739 | 1.666 | 150.6 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 30.251 | 43.301 | 30.020 | 43.301 | 131.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 194.789 | 199.007 | 188.601 | 199.007 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1503.462 | 1537.128 | 1502.843 | 1537.128 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 161.017 | 231.554 | 159.437 | 231.554 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1458.067 | 1608.407 | 1452.116 | 1608.407 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.199 | 0.257 | 0.147 | 0.257 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.894 | 4.063 | 3.747 | 4.063 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.026 | 0.048 | 0.022 | 0.048 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.701 | 0.752 | 0.687 | 0.752 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.066 | 0.110 | 0.054 | 0.110 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.559 | 0.586 | 0.543 | 0.586 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.790 | 1.802 | 0.731 | 1.802 | 150.4 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 26.048 | 39.732 | 25.375 | 39.732 | 131.8 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 174.472 | 175.513 | 172.585 | 175.513 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1481.937 | 1596.901 | 1466.821 | 1596.901 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.851 | 182.488 | 156.522 | 182.488 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1450.093 | 1537.496 | 1445.980 | 1537.496 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.148 | 0.169 | 0.145 | 0.169 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.660 | 3.131 | 2.509 | 3.131 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.032 | 0.017 | 0.032 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.699 | 1.210 | 0.674 | 1.210 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 0.076 | 0.050 | 0.076 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.604 | 0.653 | 0.577 | 0.653 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 1.102 | 1.228 | 0.935 | 1.228 | 150.5 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.674 | 39.325 | 25.571 | 39.325 | 131.8 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 188.861 | 193.314 | 187.437 | 193.314 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1549.645 | 1609.565 | 1545.016 | 1609.565 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 158.621 | 163.082 | 155.163 | 163.082 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1506.034 | 1533.870 | 1499.656 | 1533.870 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.153 | 0.177 | 0.143 | 0.177 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.289 | 2.435 | 2.237 | 2.435 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.022 | 0.036 | 0.020 | 0.036 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.452 | 0.479 | 0.443 | 0.479 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.019 | 0.024 | 0.013 | 0.024 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.475 | 0.498 | 0.462 | 0.498 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.218 | 1.435 | 1.177 | 1.435 | 144.6 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 80.002 | 80.835 | 78.997 | 80.835 | 131.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 339.523 | 378.789 | 332.982 | 378.789 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1854.107 | 1979.174 | 1840.990 | 1979.174 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 189.277 | 194.823 | 188.888 | 194.823 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1737.509 | 1864.495 | 1721.559 | 1864.495 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.200 | 0.305 | 0.184 | 0.305 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.783 | 3.167 | 2.763 | 3.167 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.022 | 0.044 | 0.018 | 0.044 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.776 | 0.816 | 0.761 | 0.816 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.067 | 0.086 | 0.048 | 0.086 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.809 | 0.916 | 0.780 | 0.916 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 25.317 | 39.269 | 23.530 | 39.269 | 156.7 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 286.133 | 301.667 | 281.383 | 301.667 | 133.6 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 331.141 | 336.160 | 330.451 | 336.160 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1848.462 | 1884.687 | 1844.965 | 1884.687 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 187.701 | 189.724 | 185.060 | 189.724 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1728.931 | 1749.929 | 1725.412 | 1749.929 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.164 | 0.179 | 0.139 | 0.179 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.802 | 2.904 | 2.730 | 2.904 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.024 | 0.039 | 0.019 | 0.039 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.768 | 0.867 | 0.762 | 0.867 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.071 | 0.101 | 0.044 | 0.101 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.797 | 0.839 | 0.789 | 0.839 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 23.250 | 24.813 | 22.792 | 24.813 | 153.3 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 287.974 | 303.384 | 285.111 | 303.384 | 133.6 |
| warm-start-logistic-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 132.182 | 134.395 | 131.537 | 134.395 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-fit | python-prophet | 6 | 113.153 | 126.116 | 112.352 | 126.116 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 117.556 | 121.347 | 116.561 | 121.347 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 95.801 | 102.605 | 94.230 | 102.605 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `d257017e74eed1851f8b417b13292b5664bceab4`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-logistic-additive`, `country-explicit-us-logistic-additive`, `country-us-logistic-multiplicative`, `country-explicit-us-logistic-multiplicative`, `logistic-implicit-floor-absmax`, `logistic-implicit-floor-minmax`, `logistic-explicit-floor-absmax`, `logistic-explicit-floor-minmax`, `logistic-implicit-floor-auto-changepoints`, `logistic-implicit-floor-large`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7`, `uncertainty-logistic-implicit-floor-minmax-full-samples-512`, `uncertainty-logistic-implicit-floor-large-full-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-full-intervals-512`, `uncertainty-logistic-explicit-floor-minmax-full-samples-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128`, `anomalies-logistic-defaults-99`, `warm-start-logistic-defaults-7-new-rows`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `evaluation-logistic-large-months-metrics`, `evaluation-logistic-large-parallel`, `logistic-reconcile-basic-96-empty-absmax`, `logistic-reconcile-basic-96-explicit-absmax`, `logistic-reconcile-basic-96-auto-absmax`, `logistic-reconcile-basic-96-empty-minmax`, `logistic-reconcile-basic-96-explicit-minmax`, `logistic-reconcile-basic-96-auto-minmax`, `logistic-reconcile-empty-loose-prior-absmax`, `logistic-reconcile-empty-loose-prior-minmax`, `logistic-reconcile-basic-99`, `logistic-reconcile-basic-100`, `logistic-reconcile-basic-256`, `logistic-reconcile-defaults-96`, `logistic-reconcile-defaults-256`, `logistic-reconcile-defaults-rate-changes`, `logistic-reconcile-weekly`, `logistic-reconcile-conditional`, `logistic-reconcile-event`, `logistic-reconcile-regressor-additive`, `logistic-reconcile-regressor-multiplicative`, `logistic-reconcile-explicit-floor-absmax`, `logistic-reconcile-mixed-absmax`, `logistic-reconcile-explicit-floor-minmax`, `logistic-reconcile-mixed-minmax`, `logistic-reconcile-unsorted`, `logistic-reconcile-duplicates`, `logistic-reconcile-declining`, `logistic-reconcile-saturated`, `logistic-reconcile-constant`, `logistic-reconcile-out-of-bounds`
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

