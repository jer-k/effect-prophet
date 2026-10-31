# Effect Prophet benchmark — 2026-10-30T225507-898Z-9f5b12f5

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
| evaluation-logistic-large-months-metrics | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.682e-1 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed, and Effect's built-in and custom metrics on Python's own CV rows equal performance_metrics exactly in both horizon units; public evaluation/metric work differs. Absolute times only. |
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
| anomalies-logistic-defaults-99 | warm-anomalies | effect-prophet | 6 | 68.957 | 69.715 | 68.828 | 69.715 | n/a |
| anomalies-logistic-defaults-99 | warm-anomalies | python-prophet | 6 | 301.928 | 329.291 | 296.941 | 329.291 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | effect-prophet | 6 | 52.348 | 53.788 | 50.705 | 53.788 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | python-prophet | 6 | 44.266 | 44.505 | 44.024 | 44.505 | n/a |
| anomalies-logistic-defaults-99 | warm-uncertainty | effect-prophet | 6 | 14.066 | 14.400 | 13.978 | 14.400 | 159.5 |
| anomalies-logistic-defaults-99 | warm-uncertainty | python-prophet | 6 | 253.366 | 264.804 | 249.033 | 264.804 | 131.8 |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.014 | 0.012 | 0.014 | 141.4 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.493 | 0.530 | 0.448 | 0.530 | 131.8 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 195.708 | 229.129 | 192.421 | 229.129 | 150.5 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1442.132 | 1580.796 | 1392.942 | 1580.796 | 131.8 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 153.155 | 167.533 | 149.662 | 167.533 | 150.7 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1434.527 | 1474.322 | 1389.302 | 1474.322 | 131.8 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.339 | 0.355 | 0.322 | 0.355 | 150.7 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 3.834 | 4.142 | 3.820 | 4.142 | 131.8 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.025 | 0.033 | 0.016 | 0.033 | 150.5 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.702 | 0.806 | 0.655 | 0.806 | 131.8 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 29.961 | 30.552 | 29.526 | 30.552 | 150.4 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 59.889 | 63.870 | 52.158 | 63.870 | 131.8 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 30.000 | 30.259 | 29.171 | 30.259 | 146.0 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 53.566 | 67.861 | 53.096 | 67.861 | 131.8 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 30.686 | 31.742 | 30.150 | 31.742 | 143.4 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 53.297 | 63.608 | 47.072 | 63.608 | 131.8 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.168 | 0.186 | 0.128 | 0.186 | 145.9 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.568 | 5.699 | 4.479 | 5.699 | 131.8 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.031 | 0.015 | 0.031 | 143.8 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.460 | 0.501 | 0.442 | 0.501 | 131.8 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 209.448 | 245.449 | 208.479 | 245.449 | 153.8 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1458.870 | 1500.082 | 1421.017 | 1500.082 | 131.8 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 153.184 | 167.423 | 150.299 | 167.423 | 154.3 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1401.769 | 1461.023 | 1367.654 | 1461.023 | 131.8 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.342 | 0.357 | 0.336 | 0.357 | 154.1 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.129 | 7.171 | 3.965 | 7.171 | 131.8 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.026 | 0.030 | 0.017 | 0.030 | 153.8 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.685 | 0.771 | 0.651 | 0.771 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.707 | 46.601 | 42.094 | 46.601 | 153.6 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 61.763 | 70.193 | 61.697 | 70.193 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 42.231 | 43.097 | 41.840 | 43.097 | 152.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 62.580 | 70.623 | 62.073 | 70.623 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 43.193 | 44.837 | 42.605 | 44.837 | 150.0 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 57.990 | 60.113 | 57.280 | 60.113 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.173 | 1.773 | 0.137 | 1.773 | 152.7 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.718 | 6.795 | 4.561 | 6.795 | 131.8 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.026 | 0.013 | 0.026 | 141.2 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.496 | 0.550 | 0.463 | 0.550 | 148.3 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 205.595 | 212.050 | 197.498 | 212.050 | 150.3 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1576.357 | 1676.672 | 1561.579 | 1676.672 | 148.3 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 154.573 | 160.747 | 152.751 | 160.747 | 152.6 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1531.332 | 1546.991 | 1490.257 | 1546.991 | 148.3 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.836 | 0.910 | 0.716 | 0.910 | 151.2 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 3.760 | 4.221 | 3.718 | 4.221 | 148.3 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.113 | 0.203 | 0.096 | 0.203 | 151.2 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.693 | 1.004 | 0.661 | 1.004 | 148.3 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 30.506 | 31.949 | 30.180 | 31.949 | 150.2 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 56.066 | 60.750 | 55.124 | 60.750 | 148.3 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 30.628 | 31.476 | 30.225 | 31.476 | 147.9 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 57.124 | 57.839 | 54.605 | 57.839 | 148.3 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 30.952 | 37.148 | 30.159 | 37.148 | 146.0 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 51.197 | 57.641 | 50.052 | 57.641 | 148.3 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.212 | 0.287 | 0.189 | 0.287 | 146.0 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.196 | 5.397 | 5.087 | 5.397 | 148.3 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.024 | 0.011 | 0.024 | 143.5 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.518 | 0.825 | 0.473 | 0.825 | 147.3 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 210.219 | 211.135 | 209.358 | 211.135 | 163.9 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1633.505 | 1742.159 | 1592.827 | 1742.159 | 147.3 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 152.207 | 171.990 | 151.128 | 171.990 | 166.9 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1546.285 | 1559.983 | 1518.891 | 1559.983 | 147.3 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.673 | 0.753 | 0.656 | 0.753 | 164.1 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 3.786 | 4.303 | 3.742 | 4.303 | 147.3 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.109 | 0.124 | 0.094 | 0.124 | 164.0 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.655 | 0.948 | 0.632 | 0.948 | 147.3 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 42.627 | 44.053 | 42.226 | 44.053 | 162.8 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 66.427 | 68.730 | 64.990 | 68.730 | 147.3 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 42.584 | 43.097 | 42.107 | 43.097 | 161.0 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 65.257 | 66.228 | 64.432 | 66.228 | 147.3 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 43.149 | 43.845 | 42.787 | 43.845 | 158.1 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 58.382 | 61.649 | 57.559 | 61.649 | 147.3 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.211 | 0.299 | 0.189 | 0.299 | 158.4 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.411 | 5.512 | 5.364 | 5.512 | 147.3 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 19.623 | 27.447 | 17.801 | 27.447 | 152.5 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 64.582 | 70.571 | 63.200 | 70.571 | 131.8 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 15.434 | 18.677 | 13.719 | 18.677 | 157.1 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 68.646 | 72.839 | 68.241 | 72.839 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.379 | 1.567 | 1.231 | 1.567 | 158.0 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 14.216 | 14.400 | 13.956 | 14.400 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.343 | 0.687 | 0.309 | 0.687 | 153.5 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 6.681 | 26.547 | 6.400 | 26.547 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 1.040 | 3.393 | 0.870 | 3.393 | 153.4 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | python-prophet | 4 | 6.260 | 6.895 | 6.138 | 6.895 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-point-processes | python-prophet | 4 | 1502.184 | 1596.178 | 1496.837 | 1596.178 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-point-threads | python-prophet | 4 | 174.034 | 218.149 | 172.400 | 218.149 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-point | effect-prophet | 4 | 61.577 | 68.605 | 60.073 | 68.605 | 163.4 |
| evaluation-logistic-large-parallel | evaluation-point | python-prophet | 4 | 184.148 | 261.818 | 174.145 | 261.818 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-search-processes | python-prophet | 4 | 4553.790 | 4646.103 | 4535.884 | 4646.103 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-search-threads | python-prophet | 4 | 522.507 | 539.152 | 519.823 | 539.152 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-search | effect-prophet | 4 | 181.440 | 197.807 | 180.823 | 197.807 | 203.3 |
| evaluation-logistic-large-parallel | evaluation-search | python-prophet | 4 | 539.165 | 602.525 | 535.387 | 602.525 | 131.8 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 185.819 | 208.102 | 182.649 | 208.102 | 164.8 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1708.363 | 1852.735 | 1524.443 | 1852.735 | 131.8 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.349 | 2.984 | 2.126 | 2.984 | 164.6 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.299 | 1.521 | 1.283 | 1.521 | 131.8 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.035 | 0.042 | 0.034 | 0.042 | 133.1 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.481 | 0.592 | 0.433 | 0.592 | 131.8 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.067 | 0.099 | 0.059 | 0.099 | 164.6 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.308 | 5.960 | 5.265 | 5.960 | 131.8 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.700 | 3.686 | 0.834 | 3.686 | 140.2 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.733 | 0.765 | 0.668 | 0.765 | 131.8 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 14.669 | 15.715 | 13.027 | 15.715 | 163.9 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 46.168 | 52.264 | 40.881 | 52.264 | 131.8 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 186.791 | 192.665 | 185.366 | 192.665 | 154.0 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1467.109 | 1517.353 | 1462.797 | 1517.353 | 131.8 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 0.964 | 3.392 | 0.950 | 3.392 | 153.9 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.784 | 0.836 | 0.769 | 0.836 | 131.8 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.028 | 0.032 | 0.022 | 0.032 | 130.7 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.425 | 0.452 | 0.395 | 0.452 | 131.8 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.110 | 0.125 | 0.092 | 0.125 | 152.1 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.296 | 5.523 | 5.248 | 5.523 | 131.8 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 1.053 | 1.214 | 0.977 | 1.214 | 135.2 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.573 | 0.586 | 0.550 | 0.586 | 131.8 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 17.420 | 17.687 | 17.253 | 17.687 | 152.1 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 59.615 | 59.802 | 59.498 | 59.802 | 131.8 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.165 | 18.035 | 16.972 | 18.035 | 158.3 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 30.188 | 30.292 | 30.002 | 30.292 | 131.8 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.167 | 0.175 | 0.166 | 0.175 | 159.7 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 131.8 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.220 | 0.238 | 0.218 | 0.238 | 159.1 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.011 | 0.008 | 0.011 | 131.8 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 35.906 | 40.086 | 35.467 | 40.086 | 154.4 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 113.748 | 114.685 | 112.195 | 114.685 | 131.8 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.025 | 0.046 | 0.024 | 0.046 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.539 | 0.562 | 0.486 | 0.562 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 181.827 | 183.999 | 178.231 | 183.999 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1476.294 | 1486.080 | 1419.907 | 1486.080 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 150.577 | 153.733 | 150.247 | 153.733 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1385.033 | 1444.809 | 1383.546 | 1444.809 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.079 | 0.092 | 0.076 | 0.092 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.489 | 3.058 | 2.436 | 3.058 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.031 | 0.050 | 0.031 | 0.050 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.446 | 0.465 | 0.442 | 0.465 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.388 | 20.465 | 19.979 | 20.465 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.998 | 39.214 | 35.880 | 39.214 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 20.590 | 20.907 | 20.587 | 20.907 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 35.844 | 38.058 | 35.379 | 38.058 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.084 | 21.166 | 20.581 | 21.166 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.960 | 33.400 | 32.214 | 33.400 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.417 | 0.479 | 0.391 | 0.479 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.487 | 3.716 | 3.461 | 3.716 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.050 | 0.069 | 0.038 | 0.069 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.488 | 0.557 | 0.479 | 0.557 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 179.751 | 182.757 | 179.066 | 182.757 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1456.026 | 1699.346 | 1427.389 | 1699.346 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 156.385 | 158.251 | 150.194 | 158.251 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1433.442 | 1473.766 | 1429.603 | 1473.766 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.078 | 0.098 | 0.078 | 0.098 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.395 | 3.547 | 2.369 | 3.547 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.037 | 0.062 | 0.030 | 0.062 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.453 | 1.755 | 0.438 | 1.755 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 16.584 | 16.709 | 16.446 | 16.709 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 30.315 | 37.564 | 29.902 | 37.564 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 17.028 | 17.199 | 16.997 | 17.199 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 29.528 | 36.182 | 29.017 | 36.182 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.232 | 17.609 | 17.018 | 17.609 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 25.898 | 31.489 | 25.731 | 31.489 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.383 | 1.129 | 0.382 | 1.129 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.561 | 5.429 | 3.489 | 5.429 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.013 | 0.014 | 0.013 | 0.014 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.484 | 0.523 | 0.448 | 0.523 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 178.027 | 181.160 | 177.383 | 181.160 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1429.510 | 1450.313 | 1412.729 | 1450.313 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.393 | 156.590 | 151.461 | 156.590 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1381.602 | 1398.145 | 1374.219 | 1398.145 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.098 | 0.112 | 0.088 | 0.112 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.407 | 2.518 | 2.160 | 2.518 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.030 | 0.040 | 0.029 | 0.040 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.424 | 0.451 | 0.417 | 0.451 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.990 | 18.483 | 17.897 | 18.483 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 33.490 | 34.458 | 31.831 | 34.458 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 18.493 | 19.820 | 18.180 | 19.820 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 32.503 | 33.265 | 31.360 | 33.265 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 18.513 | 19.588 | 18.350 | 19.588 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 27.761 | 29.286 | 27.624 | 29.286 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.334 | 0.414 | 0.306 | 0.414 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.072 | 3.211 | 3.007 | 3.211 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.021 | 0.030 | 0.019 | 0.030 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.510 | 0.552 | 0.482 | 0.552 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 191.841 | 209.343 | 182.839 | 209.343 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1493.326 | 1521.006 | 1443.805 | 1521.006 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 159.182 | 169.679 | 152.322 | 169.679 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1444.708 | 1533.375 | 1399.173 | 1533.375 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.098 | 0.119 | 0.097 | 0.119 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.311 | 2.362 | 2.233 | 2.362 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.041 | 0.054 | 0.036 | 0.054 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.426 | 0.440 | 0.425 | 0.440 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.288 | 18.593 | 18.283 | 18.593 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 32.497 | 37.631 | 32.271 | 37.631 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.152 | 19.483 | 18.928 | 19.483 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 31.878 | 32.596 | 31.441 | 32.596 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 18.488 | 18.844 | 18.327 | 18.844 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 30.019 | 30.914 | 29.136 | 30.914 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.321 | 0.350 | 0.313 | 0.350 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.119 | 4.057 | 3.111 | 4.057 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.041 | 0.074 | 0.039 | 0.074 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.605 | 2.010 | 0.573 | 2.010 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 173.065 | 175.238 | 171.406 | 175.238 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1472.270 | 1529.929 | 1404.650 | 1529.929 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 158.341 | 172.013 | 150.241 | 172.013 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1457.496 | 1460.146 | 1426.181 | 1460.146 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.103 | 0.124 | 0.100 | 0.124 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.557 | 2.790 | 2.477 | 2.790 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.026 | 0.036 | 0.026 | 0.036 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.662 | 0.684 | 0.655 | 0.684 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.089 | 4.411 | 3.881 | 4.411 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.310 | 18.951 | 13.239 | 18.951 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.326 | 4.790 | 4.310 | 4.790 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.888 | 17.693 | 12.695 | 17.693 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.873 | 5.842 | 4.848 | 5.842 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.461 | 27.037 | 9.380 | 27.037 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.380 | 0.427 | 0.354 | 0.427 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.282 | 5.591 | 3.211 | 5.591 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.018 | 0.017 | 0.018 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.484 | 0.859 | 0.466 | 0.859 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 181.317 | 187.817 | 179.020 | 187.817 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1484.177 | 1582.063 | 1426.389 | 1582.063 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 151.115 | 156.124 | 150.982 | 156.124 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1502.660 | 1538.962 | 1485.783 | 1538.962 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.087 | 0.273 | 0.087 | 0.273 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.574 | 3.356 | 2.240 | 3.356 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.055 | 0.026 | 0.055 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.475 | 0.507 | 0.454 | 0.507 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 19.761 | 22.304 | 19.727 | 22.304 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 34.629 | 37.149 | 33.972 | 37.149 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 19.936 | 20.400 | 19.781 | 20.400 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 35.448 | 37.351 | 34.350 | 37.351 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 19.942 | 20.189 | 19.885 | 20.189 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 42.676 | 54.490 | 31.778 | 54.490 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.316 | 0.342 | 0.307 | 0.342 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.206 | 4.120 | 3.167 | 4.120 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 223.674 | 276.473 | 213.091 | 276.473 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1458.908 | 1484.619 | 1445.747 | 1484.619 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.175 | 0.246 | 0.153 | 0.246 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.313 | 2.908 | 2.303 | 2.908 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.025 | 0.065 | 0.021 | 0.065 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.474 | 0.490 | 0.451 | 0.490 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 5.130 | 131.627 | 4.705 | 131.627 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 6.304 | 6.821 | 6.158 | 6.821 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 3.558 | 6.947 | 1.756 | 6.947 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 3.000 | 3.087 | 2.922 | 3.087 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 213.595 | 234.528 | 210.724 | 234.528 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1529.647 | 1782.082 | 1520.433 | 1782.082 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.152 | 0.354 | 0.120 | 0.354 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.592 | 2.669 | 2.496 | 2.669 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.020 | 0.025 | 0.018 | 0.025 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.631 | 0.656 | 0.626 | 0.656 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 4.720 | 6.920 | 3.586 | 6.920 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.362 | 7.880 | 7.212 | 7.880 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.410 | 2.110 | 1.368 | 2.110 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.996 | 3.039 | 2.943 | 3.039 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 230.464 | 585.319 | 208.365 | 585.319 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1576.471 | 1606.633 | 1569.163 | 1606.633 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.122 | 0.238 | 0.114 | 0.238 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.323 | 2.902 | 2.239 | 2.902 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.049 | 0.020 | 0.049 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.475 | 0.564 | 0.460 | 0.564 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 18.666 | 20.306 | 18.389 | 20.306 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 28.446 | 31.161 | 27.102 | 31.161 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.874 | 1.666 | 0.806 | 1.666 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.979 | 3.584 | 2.893 | 3.584 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 147.441 | 167.179 | 146.562 | 167.179 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1550.700 | 1597.904 | 1465.713 | 1597.904 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.132 | 0.144 | 0.126 | 0.144 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.317 | 2.472 | 2.241 | 2.472 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.029 | 0.018 | 0.029 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.451 | 0.567 | 0.445 | 0.567 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 8.484 | 9.731 | 8.456 | 9.731 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 18.392 | 19.398 | 17.815 | 19.398 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.909 | 0.953 | 0.816 | 0.953 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 3.005 | 3.207 | 2.911 | 3.207 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.405 | 157.892 | 153.203 | 157.892 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1469.244 | 1567.019 | 1460.508 | 1567.019 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.129 | 0.196 | 0.122 | 0.196 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.092 | 2.197 | 2.080 | 2.197 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.026 | 0.018 | 0.026 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.493 | 0.642 | 0.491 | 0.642 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.668 | 6.771 | 6.562 | 6.771 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 13.455 | 14.650 | 12.913 | 14.650 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.858 | 0.898 | 0.858 | 0.898 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.957 | 4.593 | 2.871 | 4.593 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 197.978 | 208.336 | 190.000 | 208.336 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1556.541 | 1604.180 | 1496.610 | 1604.180 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.132 | 0.157 | 0.125 | 0.157 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.169 | 2.846 | 2.086 | 2.846 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.026 | 0.020 | 0.026 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.477 | 0.688 | 0.454 | 0.688 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 9.362 | 9.646 | 9.054 | 9.646 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 16.914 | 18.937 | 16.058 | 18.937 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 1.010 | 1.215 | 0.967 | 1.215 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 3.009 | 3.291 | 2.923 | 3.291 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.429 | 161.120 | 152.716 | 161.120 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1458.472 | 1539.393 | 1451.384 | 1539.393 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.124 | 0.142 | 0.122 | 0.142 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.696 | 3.312 | 2.570 | 3.312 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.017 | 0.024 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.556 | 0.742 | 0.502 | 0.742 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.576 | 7.818 | 7.472 | 7.818 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 16.888 | 17.397 | 16.048 | 17.397 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.836 | 0.926 | 0.834 | 0.926 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 3.335 | 4.374 | 3.180 | 4.374 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 192.425 | 202.292 | 190.952 | 202.292 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1482.601 | 1582.596 | 1455.290 | 1582.596 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.149 | 0.254 | 0.127 | 0.254 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.541 | 3.145 | 2.442 | 3.145 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.039 | 0.019 | 0.039 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.456 | 0.475 | 0.455 | 0.475 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 18.123 | 18.297 | 18.022 | 18.297 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 25.478 | 28.470 | 24.910 | 28.470 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 1.139 | 1.215 | 0.976 | 1.215 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 3.061 | 3.393 | 2.965 | 3.393 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 568.375 | 1760.255 | 157.090 | 1760.255 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1417.285 | 1449.450 | 1415.843 | 1449.450 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.147 | 0.269 | 0.141 | 0.269 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.254 | 2.283 | 2.226 | 2.283 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.022 | 0.032 | 0.019 | 0.032 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.453 | 0.460 | 0.437 | 0.460 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 15.417 | 27.936 | 15.315 | 27.936 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 25.174 | 28.730 | 24.761 | 28.730 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.985 | 2.232 | 0.884 | 2.232 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.974 | 3.017 | 2.901 | 3.017 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 157.935 | 178.541 | 156.022 | 178.541 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1555.022 | 3949.215 | 1387.496 | 3949.215 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.140 | 0.155 | 0.127 | 0.155 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.240 | 3.327 | 2.191 | 3.327 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.022 | 0.033 | 0.016 | 0.033 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.446 | 0.606 | 0.438 | 0.606 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 15.194 | 15.367 | 15.131 | 15.367 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 30.852 | 37.077 | 27.256 | 37.077 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 1.165 | 2.360 | 1.037 | 2.360 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.297 | 6.065 | 3.196 | 6.065 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 161.965 | 173.713 | 153.634 | 173.713 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1397.431 | 1881.591 | 1385.368 | 1881.591 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.168 | 0.248 | 0.146 | 0.248 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.085 | 2.329 | 1.983 | 2.329 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.018 | 0.056 | 0.015 | 0.056 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.430 | 0.490 | 0.401 | 0.490 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 16.244 | 17.188 | 15.936 | 17.188 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 26.122 | 27.271 | 25.562 | 27.271 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.862 | 1.030 | 0.845 | 1.030 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.789 | 3.250 | 2.680 | 3.250 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 156.852 | 163.343 | 150.576 | 163.343 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1958.389 | 2056.882 | 1583.935 | 2056.882 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.164 | 0.214 | 0.133 | 0.214 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.261 | 4.004 | 2.213 | 4.004 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.022 | 0.033 | 0.018 | 0.033 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.473 | 0.923 | 0.450 | 0.923 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.091 | 6.306 | 5.813 | 6.306 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.967 | 31.820 | 13.951 | 31.820 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.814 | 0.901 | 0.804 | 0.901 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.962 | 6.068 | 2.882 | 6.068 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 164.293 | 171.762 | 155.580 | 171.762 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1864.113 | 3702.991 | 1820.243 | 3702.991 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.138 | 0.174 | 0.124 | 0.174 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.849 | 13.057 | 2.647 | 13.057 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.021 | 0.029 | 0.020 | 0.029 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.835 | 4.098 | 0.808 | 4.098 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 36.085 | 38.352 | 35.043 | 38.352 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 95.001 | 150.550 | 62.665 | 150.550 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.108 | 1.359 | 1.064 | 1.359 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 14.934 | 26.464 | 8.128 | 26.464 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 158.427 | 177.103 | 154.733 | 177.103 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1930.023 | 3001.042 | 1466.011 | 3001.042 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.143 | 0.220 | 0.135 | 0.220 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.392 | 3.351 | 2.371 | 3.351 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.019 | 0.024 | 0.019 | 0.024 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.499 | 0.654 | 0.484 | 0.654 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 94.306 | 98.225 | 92.698 | 98.225 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 124.098 | 153.669 | 123.141 | 153.669 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.069 | 1.917 | 1.051 | 1.917 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.648 | 4.725 | 3.549 | 4.725 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 178.737 | 190.459 | 172.756 | 190.459 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1363.466 | 1618.874 | 1337.698 | 1618.874 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.179 | 0.340 | 0.129 | 0.340 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.568 | 3.314 | 2.506 | 3.314 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.021 | 0.026 | 0.019 | 0.026 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.806 | 0.937 | 0.727 | 0.937 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 122.584 | 124.262 | 121.807 | 124.262 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 103.241 | 131.708 | 103.191 | 131.708 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.710 | 1.898 | 1.670 | 1.898 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.420 | 4.306 | 3.363 | 4.306 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 156.308 | 163.205 | 152.452 | 163.205 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1369.986 | 1601.588 | 1351.968 | 1601.588 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.137 | 0.144 | 0.121 | 0.144 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.134 | 2.847 | 1.993 | 2.847 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.017 | 0.020 | 0.016 | 0.020 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.467 | 0.587 | 0.447 | 0.587 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 6.113 | 7.020 | 5.749 | 7.020 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.232 | 22.651 | 12.513 | 22.651 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.891 | 0.897 | 0.861 | 0.897 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 2.833 | 4.413 | 2.725 | 4.413 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.586 | 164.452 | 151.262 | 164.452 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1423.058 | 1449.975 | 1420.657 | 1449.975 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.139 | 0.159 | 0.132 | 0.159 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.122 | 2.207 | 2.076 | 2.207 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.027 | 0.015 | 0.027 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.453 | 0.473 | 0.451 | 0.473 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 108.554 | 112.145 | 106.206 | 112.145 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 128.434 | 132.347 | 128.078 | 132.347 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.827 | 0.918 | 0.812 | 0.918 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 3.005 | 3.089 | 2.940 | 3.089 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 152.017 | 162.431 | 149.704 | 162.431 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1452.046 | 1484.871 | 1429.682 | 1484.871 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.145 | 0.214 | 0.122 | 0.214 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.176 | 2.596 | 2.103 | 2.596 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.461 | 0.806 | 0.447 | 0.806 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 13.583 | 13.821 | 13.485 | 13.821 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 21.258 | 21.908 | 20.519 | 21.908 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.818 | 0.830 | 0.772 | 0.830 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 3.055 | 3.913 | 3.022 | 3.913 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 151.636 | 153.318 | 149.611 | 153.318 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1389.516 | 1705.115 | 1294.660 | 1705.115 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.152 | 0.189 | 0.149 | 0.189 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.178 | 4.138 | 3.046 | 4.138 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.017 | 0.024 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.607 | 0.747 | 0.577 | 0.747 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 8.837 | 9.128 | 8.801 | 9.128 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 16.999 | 21.792 | 16.202 | 21.792 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 0.931 | 1.058 | 0.901 | 1.058 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 3.893 | 5.060 | 3.798 | 5.060 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 154.792 | 185.398 | 151.899 | 185.398 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1800.335 | 4185.395 | 1685.983 | 4185.395 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.120 | 0.144 | 0.120 | 0.144 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 3.279 | 8.749 | 2.945 | 8.749 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.026 | 0.018 | 0.026 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.614 | 1.827 | 0.596 | 1.827 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.245 | 6.439 | 6.234 | 6.439 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 19.099 | 40.179 | 16.862 | 40.179 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.846 | 0.865 | 0.845 | 0.865 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.613 | 13.506 | 3.531 | 13.506 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.839 | 180.362 | 156.502 | 180.362 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 2196.154 | 2638.089 | 2072.933 | 2638.089 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.141 | 0.154 | 0.133 | 0.154 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 3.175 | 5.001 | 2.908 | 5.001 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.022 | 0.017 | 0.022 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.680 | 0.752 | 0.655 | 0.752 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 9.449 | 9.841 | 9.303 | 9.841 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 27.844 | 29.617 | 22.499 | 29.617 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.857 | 1.074 | 0.849 | 1.074 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 5.014 | 6.162 | 4.290 | 6.162 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.796 | 177.624 | 154.799 | 177.624 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 2039.910 | 2341.642 | 1579.889 | 2341.642 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.166 | 0.179 | 0.156 | 0.179 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 5.832 | 21.490 | 5.487 | 21.490 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.025 | 0.018 | 0.025 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 1.181 | 1.810 | 1.170 | 1.810 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 26.649 | 28.383 | 26.416 | 28.383 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 67.170 | 242.361 | 63.796 | 242.361 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.894 | 0.937 | 0.864 | 0.937 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 8.912 | 14.806 | 8.669 | 14.806 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.901 | 163.018 | 157.106 | 163.018 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1932.050 | 1978.007 | 1303.901 | 1978.007 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.153 | 0.188 | 0.143 | 0.188 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 8.220 | 10.614 | 7.701 | 10.614 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.035 | 0.022 | 0.035 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 1.193 | 1.752 | 1.193 | 1.752 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 24.559 | 25.680 | 24.439 | 25.680 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 39.053 | 188.336 | 37.452 | 188.336 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.915 | 0.927 | 0.872 | 0.927 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 7.239 | 28.538 | 6.644 | 28.538 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 159.576 | 164.169 | 158.664 | 164.169 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 2084.845 | 2600.204 | 1968.107 | 2600.204 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.135 | 0.163 | 0.127 | 0.163 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.556 | 5.317 | 2.483 | 5.317 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.019 | 0.022 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.529 | 1.269 | 0.517 | 1.269 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.517 | 8.817 | 8.503 | 8.817 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 19.619 | 41.208 | 18.120 | 41.208 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.960 | 1.130 | 0.889 | 1.130 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 3.319 | 7.095 | 3.258 | 7.095 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 154.503 | 162.317 | 152.753 | 162.317 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1359.358 | 1875.817 | 1312.103 | 1875.817 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.121 | 0.148 | 0.117 | 0.148 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.437 | 2.461 | 2.327 | 2.461 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.023 | 0.034 | 0.020 | 0.034 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.452 | 0.496 | 0.447 | 0.496 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 7.419 | 8.490 | 7.377 | 8.490 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 15.479 | 17.672 | 15.121 | 17.672 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 0.771 | 2.418 | 0.723 | 2.418 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.264 | 3.304 | 3.141 | 3.304 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 155.645 | 168.606 | 153.990 | 168.606 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1505.723 | 2136.616 | 1369.398 | 2136.616 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.133 | 0.144 | 0.131 | 0.144 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.392 | 2.812 | 2.297 | 2.812 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.021 | 0.040 | 0.019 | 0.040 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.541 | 0.575 | 0.513 | 0.575 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 9.602 | 10.495 | 9.151 | 10.495 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 16.803 | 19.208 | 16.212 | 19.208 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 0.852 | 3.235 | 0.770 | 3.235 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.034 | 3.769 | 2.999 | 3.769 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 155.040 | 161.514 | 151.805 | 161.514 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1353.542 | 3981.226 | 1304.299 | 3981.226 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.131 | 0.182 | 0.129 | 0.182 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.457 | 5.907 | 2.330 | 5.907 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.018 | 0.023 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.559 | 1.228 | 0.453 | 1.228 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.355 | 13.595 | 9.917 | 13.595 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 21.739 | 45.543 | 20.003 | 45.543 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.839 | 2.487 | 0.776 | 2.487 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 3.139 | 6.991 | 3.043 | 6.991 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 152.994 | 162.498 | 148.260 | 162.498 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1494.336 | 2164.781 | 1391.223 | 2164.781 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.148 | 1.340 | 0.144 | 1.340 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.037 | 3.998 | 1.989 | 3.998 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.019 | 0.029 | 0.019 | 0.029 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.422 | 1.140 | 0.400 | 1.140 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 7.308 | 8.027 | 7.199 | 8.027 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 15.526 | 24.649 | 14.891 | 24.649 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.845 | 0.908 | 0.831 | 0.908 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.744 | 4.666 | 2.655 | 4.666 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 154.711 | 174.893 | 152.865 | 174.893 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1770.770 | 4398.159 | 1563.305 | 4398.159 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.139 | 0.153 | 0.130 | 0.153 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.555 | 4.401 | 2.547 | 4.401 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.021 | 0.027 | 0.020 | 0.027 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.537 | 1.363 | 0.516 | 1.363 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 14.164 | 15.953 | 13.885 | 15.953 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 25.423 | 32.826 | 24.346 | 32.826 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 1.085 | 2.410 | 1.039 | 2.410 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.447 | 4.829 | 3.325 | 4.829 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 181.544 | 184.040 | 179.659 | 184.040 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1538.615 | 1589.184 | 1520.391 | 1589.184 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.606 | 166.470 | 150.942 | 166.470 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1506.058 | 1536.616 | 1486.376 | 1536.616 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.165 | 0.211 | 0.140 | 0.211 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.515 | 2.725 | 2.465 | 2.725 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.020 | 0.028 | 0.018 | 0.028 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.478 | 0.492 | 0.445 | 0.492 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.047 | 0.056 | 0.037 | 0.056 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.498 | 0.515 | 0.480 | 0.515 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.100 | 1.475 | 1.004 | 1.475 | 149.6 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 91.614 | 98.894 | 88.287 | 98.894 | 131.8 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 180.873 | 185.181 | 180.014 | 185.181 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1477.492 | 1522.357 | 1458.920 | 1522.357 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 153.970 | 161.550 | 151.881 | 161.550 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1450.054 | 1513.442 | 1436.496 | 1513.442 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.183 | 0.218 | 0.151 | 0.218 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.821 | 2.994 | 2.724 | 2.994 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.021 | 0.032 | 0.018 | 0.032 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.591 | 1.840 | 0.560 | 1.840 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.055 | 0.036 | 0.055 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.484 | 0.535 | 0.475 | 0.535 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.679 | 1.347 | 0.591 | 1.347 | 147.7 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 24.802 | 38.813 | 24.420 | 38.813 | 131.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 186.153 | 234.375 | 185.977 | 234.375 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1473.526 | 1497.350 | 1466.161 | 1497.350 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.887 | 169.955 | 152.777 | 169.955 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1458.307 | 1472.324 | 1437.991 | 1472.324 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.196 | 0.331 | 0.163 | 0.331 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.766 | 4.385 | 3.691 | 4.385 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.037 | 0.069 | 0.022 | 0.069 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.676 | 0.706 | 0.641 | 0.706 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.040 | 0.048 | 0.036 | 0.048 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.528 | 0.557 | 0.521 | 0.557 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.756 | 1.232 | 0.710 | 1.232 | 151.3 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 30.620 | 42.438 | 29.617 | 42.438 | 131.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 188.707 | 215.377 | 184.985 | 215.377 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1472.094 | 1476.084 | 1459.701 | 1476.084 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.057 | 169.066 | 153.743 | 169.066 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1461.103 | 1490.888 | 1424.864 | 1490.888 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.177 | 0.223 | 0.136 | 0.223 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.740 | 5.250 | 3.713 | 5.250 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.024 | 0.037 | 0.023 | 0.037 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.666 | 0.710 | 0.648 | 0.710 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.045 | 0.050 | 0.039 | 0.050 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.544 | 0.584 | 0.515 | 0.584 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.907 | 1.825 | 0.705 | 1.825 | 148.5 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 25.501 | 41.055 | 24.896 | 41.055 | 131.8 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 167.966 | 177.684 | 167.136 | 177.684 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1451.143 | 1474.518 | 1447.543 | 1474.518 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 152.960 | 155.502 | 152.536 | 155.502 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1464.949 | 1732.249 | 1437.340 | 1732.249 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.141 | 0.146 | 0.133 | 0.146 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.607 | 2.932 | 2.561 | 2.932 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.027 | 0.017 | 0.027 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.664 | 0.705 | 0.616 | 0.705 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.039 | 0.047 | 0.027 | 0.047 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.591 | 0.612 | 0.589 | 0.612 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.910 | 2.205 | 0.863 | 2.205 | 145.9 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.851 | 38.253 | 25.230 | 38.253 | 131.8 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 185.638 | 189.671 | 180.847 | 189.671 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1523.095 | 1557.722 | 1516.363 | 1557.722 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 152.585 | 154.052 | 151.269 | 154.052 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1506.234 | 1602.995 | 1471.660 | 1602.995 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.145 | 0.176 | 0.132 | 0.176 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.236 | 2.366 | 2.219 | 2.366 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.022 | 0.048 | 0.019 | 0.048 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.444 | 0.478 | 0.411 | 0.478 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.019 | 0.024 | 0.018 | 0.024 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.470 | 0.513 | 0.457 | 0.513 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.997 | 1.193 | 0.911 | 1.193 | 149.3 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 80.501 | 82.190 | 78.684 | 82.190 | 131.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 325.634 | 332.581 | 323.027 | 332.581 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1811.637 | 1837.320 | 1784.503 | 1837.320 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 181.772 | 193.378 | 179.691 | 193.378 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1696.893 | 1731.092 | 1685.447 | 1731.092 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.155 | 0.187 | 0.126 | 0.187 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.792 | 2.981 | 2.705 | 2.981 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.021 | 0.029 | 0.018 | 0.029 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.745 | 0.774 | 0.699 | 0.774 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.085 | 0.093 | 0.051 | 0.093 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.775 | 0.859 | 0.752 | 0.859 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 22.708 | 22.908 | 22.555 | 22.908 | 160.4 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 282.711 | 293.246 | 278.412 | 293.246 | 133.7 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 325.332 | 335.224 | 324.836 | 335.224 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1816.365 | 1922.130 | 1806.358 | 1922.130 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 184.200 | 197.512 | 178.489 | 197.512 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1704.089 | 1772.180 | 1700.531 | 1772.180 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.156 | 0.204 | 0.127 | 0.204 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.751 | 2.843 | 2.679 | 2.843 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.021 | 0.023 | 0.018 | 0.023 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.751 | 0.823 | 0.743 | 0.823 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.086 | 0.106 | 0.047 | 0.106 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.790 | 0.832 | 0.748 | 0.832 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 22.901 | 23.257 | 22.461 | 23.257 | 154.5 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 289.649 | 319.944 | 285.487 | 319.944 | 133.4 |
| warm-start-logistic-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 130.529 | 136.078 | 129.535 | 136.078 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-fit | python-prophet | 6 | 111.942 | 146.422 | 111.322 | 146.422 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 116.517 | 117.013 | 115.135 | 117.013 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 94.396 | 96.201 | 94.327 | 96.201 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `9f5b12f53b9529aae2350a864e2c3c632a658951`
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

