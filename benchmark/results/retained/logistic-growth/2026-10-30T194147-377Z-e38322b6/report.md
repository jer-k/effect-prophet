# Effect Prophet benchmark — 2026-10-30T194147-377Z-e38322b6

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

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-logistic-point | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons | n/a |
| evaluation-logistic-intervals | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 0 | 1 | 77 | 7 | 4 | 1 | 256 | 19 / 0.8 | horizons | n/a |
| evaluation-logistic-search | logistic-implicit-floor-v1:n=96:h=24:changing-capacity:weekly / d8cde080f7a8af86acb6e70e2577d0d1d2ee8f813bf4836e5a61702a16dc1558 | logistic | 2 | 1 | 77 | 7 | 4 | 1 | 0 | n/a / n/a | horizons | ea6a5ef3fa66d70a4e00c996cfe9bc37217b3a0beb24a4ef92bc3f10f706c675, b06b02f1c576fa97c475d5837db49b1b93e6d43804b2cd8e2b6a95628977a5ae |
| evaluation-logistic-large-point | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 0 | n/a / n/a | rolling | n/a |
| evaluation-logistic-large-intervals | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 2 | 457 | 14 | 4 | 1 | 256 | 19 / 0.8 | rolling | n/a |
| evaluation-logistic-large-months-metrics | logistic-implicit-floor-large-v1:n=256:h=64:changing-capacity:weekly / 61b169aa9c925333f6dd11301febfdeb82e9ae7f2b95f3cb4c222e6dcfb080d9 | logistic | 0 | 3 | 436 | 273 | 4 | 1 | 0 | n/a / n/a | horizons | n/a |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| anomalies-logistic-defaults-99 | warm-anomalies | effect-prophet | 6 | 72.442 | 73.676 | 70.622 | 73.676 | n/a |
| anomalies-logistic-defaults-99 | warm-anomalies | python-prophet | 6 | 302.396 | 311.734 | 300.032 | 311.734 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | effect-prophet | 6 | 52.843 | 55.133 | 52.419 | 55.133 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | python-prophet | 6 | 48.633 | 52.442 | 45.424 | 52.442 | n/a |
| anomalies-logistic-defaults-99 | warm-uncertainty | effect-prophet | 6 | 14.573 | 14.808 | 14.348 | 14.808 | 153.1 |
| anomalies-logistic-defaults-99 | warm-uncertainty | python-prophet | 6 | 254.003 | 271.226 | 251.059 | 271.226 | 131.6 |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.027 | 0.043 | 0.018 | 0.043 | 142.9 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.487 | 0.500 | 0.464 | 0.500 | 131.6 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 240.809 | 244.147 | 211.204 | 244.147 | 157.1 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1503.862 | 1519.421 | 1491.304 | 1519.421 | 131.6 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 176.498 | 188.862 | 169.529 | 188.862 | 157.3 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1450.704 | 1862.169 | 1440.261 | 1862.169 | 131.6 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.467 | 2.106 | 0.391 | 2.106 | 157.3 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.133 | 4.186 | 4.029 | 4.186 | 131.6 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.033 | 0.049 | 0.017 | 0.049 | 157.1 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.721 | 0.734 | 0.711 | 0.734 | 131.6 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 32.286 | 33.717 | 31.218 | 33.717 | 157.0 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 55.670 | 56.859 | 55.485 | 56.859 | 131.6 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 31.671 | 32.199 | 31.602 | 32.199 | 156.8 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 56.308 | 59.118 | 55.165 | 59.118 | 131.6 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 33.501 | 35.438 | 32.862 | 35.438 | 150.5 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 50.173 | 51.316 | 50.073 | 51.316 | 131.6 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.244 | 2.594 | 0.186 | 2.594 | 156.5 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.869 | 4.974 | 4.819 | 4.974 | 131.6 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.020 | 0.032 | 0.014 | 0.032 | 140.8 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.490 | 0.567 | 0.469 | 0.567 | 131.6 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 219.909 | 224.182 | 213.988 | 224.182 | 153.9 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1499.451 | 1643.133 | 1479.022 | 1643.133 | 131.6 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 159.397 | 166.952 | 157.962 | 166.952 | 154.1 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1438.773 | 1460.830 | 1434.424 | 1460.830 | 131.6 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.372 | 0.383 | 0.319 | 0.383 | 153.9 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.076 | 4.244 | 4.007 | 4.244 | 131.6 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.025 | 0.049 | 0.017 | 0.049 | 153.9 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.724 | 0.747 | 0.704 | 0.747 | 131.6 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.346 | 43.849 | 43.145 | 43.849 | 153.3 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 64.081 | 68.684 | 62.649 | 68.684 | 131.6 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.569 | 44.103 | 43.341 | 44.103 | 153.2 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 63.147 | 78.080 | 62.385 | 78.080 | 131.6 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.344 | 46.275 | 44.234 | 46.275 | 149.1 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 58.181 | 58.857 | 58.002 | 58.857 | 131.6 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.195 | 0.216 | 0.181 | 0.216 | 149.1 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.809 | 4.911 | 4.787 | 4.911 | 131.6 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.032 | 0.016 | 0.032 | 141.9 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.521 | 0.584 | 0.494 | 0.584 | 147.3 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 210.880 | 215.461 | 206.795 | 215.461 | 155.1 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1690.627 | 1796.030 | 1666.541 | 1796.030 | 147.3 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 163.475 | 168.178 | 156.584 | 168.178 | 158.0 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1637.180 | 1653.741 | 1616.009 | 1653.741 | 147.3 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.755 | 0.879 | 0.711 | 0.879 | 155.3 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.106 | 4.359 | 4.054 | 4.359 | 147.3 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.118 | 0.128 | 0.095 | 0.128 | 155.3 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.728 | 0.779 | 0.713 | 0.779 | 147.3 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.739 | 32.527 | 31.472 | 32.527 | 153.9 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 60.977 | 69.672 | 59.676 | 69.672 | 147.3 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 31.577 | 32.035 | 31.383 | 32.035 | 152.1 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 60.220 | 60.957 | 59.510 | 60.957 | 147.3 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 33.287 | 33.833 | 32.272 | 33.833 | 147.4 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 54.529 | 55.303 | 53.714 | 55.303 | 147.3 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.269 | 0.374 | 0.216 | 0.374 | 149.0 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.784 | 6.032 | 5.678 | 6.032 | 147.3 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.038 | 0.016 | 0.038 | 144.0 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.527 | 0.570 | 0.481 | 0.570 | 148.3 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 219.485 | 235.503 | 216.823 | 235.503 | 160.8 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1773.852 | 2061.279 | 1728.598 | 2061.279 | 148.3 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 169.320 | 175.739 | 159.317 | 175.739 | 163.7 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1620.891 | 1722.176 | 1610.688 | 1722.176 | 148.3 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.764 | 0.830 | 0.721 | 0.830 | 160.9 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.853 | 9.300 | 4.674 | 9.300 | 148.3 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.105 | 0.126 | 0.101 | 0.126 | 160.9 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.756 | 1.268 | 0.684 | 1.268 | 148.3 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 44.223 | 45.990 | 44.037 | 45.990 | 159.5 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 72.209 | 78.455 | 71.792 | 78.455 | 148.3 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 45.244 | 46.267 | 44.306 | 46.267 | 157.7 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 67.444 | 72.633 | 67.172 | 72.633 | 148.3 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 45.107 | 50.267 | 44.612 | 50.267 | 154.3 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 61.778 | 63.030 | 60.117 | 63.030 | 148.3 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.289 | 0.411 | 0.200 | 0.411 | 156.2 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.821 | 6.235 | 5.780 | 6.235 | 148.3 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 18.601 | 20.095 | 18.142 | 20.095 | 145.5 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 66.656 | 68.592 | 65.799 | 68.592 | 131.6 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 16.128 | 19.389 | 15.667 | 19.389 | 158.5 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 60.720 | 69.862 | 60.218 | 69.862 | 131.6 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.418 | 1.627 | 1.286 | 1.627 | 154.1 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 13.127 | 13.372 | 12.933 | 13.372 | 131.6 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.358 | 0.378 | 0.357 | 0.378 | 153.2 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.126 | 5.324 | 5.055 | 5.324 | 131.6 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.845 | 1.641 | 0.558 | 1.641 | 153.2 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.546 | 5.760 | 5.498 | 5.760 | 131.6 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 192.731 | 213.104 | 192.110 | 213.104 | 164.8 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1476.363 | 1519.302 | 1472.267 | 1519.302 | 131.6 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.358 | 2.673 | 2.324 | 2.673 | 164.7 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.356 | 1.400 | 1.305 | 1.400 | 131.6 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.032 | 0.067 | 0.023 | 0.067 | 133.8 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.488 | 0.512 | 0.448 | 0.512 | 131.6 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.081 | 0.089 | 0.079 | 0.089 | 164.2 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.513 | 5.575 | 5.473 | 5.575 | 131.6 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.302 | 2.600 | 1.297 | 2.600 | 137.8 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.739 | 0.759 | 0.699 | 0.759 | 131.6 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 13.379 | 16.408 | 13.276 | 16.408 | 162.9 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 43.970 | 45.179 | 43.252 | 45.179 | 131.6 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 194.687 | 201.920 | 193.824 | 201.920 | 156.8 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1550.338 | 1630.141 | 1534.956 | 1630.141 | 131.6 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.176 | 3.386 | 1.001 | 3.386 | 156.7 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.795 | 0.842 | 0.794 | 0.842 | 131.6 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.017 | 0.019 | 0.014 | 0.019 | 130.6 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.473 | 0.679 | 0.400 | 0.679 | 131.6 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.089 | 0.105 | 0.065 | 0.105 | 154.5 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.341 | 6.229 | 5.339 | 6.229 | 131.6 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 1.049 | 1.109 | 0.986 | 1.109 | 134.1 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.594 | 1.010 | 0.549 | 1.010 | 131.6 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 17.727 | 18.612 | 17.289 | 18.612 | 154.5 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 60.243 | 70.771 | 59.876 | 70.771 | 131.6 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 18.485 | 20.604 | 18.044 | 20.604 | 155.1 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 31.012 | 31.777 | 30.930 | 31.777 | 131.6 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.201 | 0.269 | 0.171 | 0.269 | 157.7 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 131.6 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.254 | 0.266 | 0.244 | 0.266 | 155.2 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.012 | 0.008 | 0.012 | 131.6 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 39.969 | 45.475 | 39.020 | 45.475 | 154.6 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 116.076 | 142.709 | 115.499 | 142.709 | 131.6 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.029 | 0.070 | 0.026 | 0.070 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.515 | 0.541 | 0.498 | 0.541 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 195.416 | 201.450 | 193.716 | 201.450 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1456.873 | 1465.836 | 1455.780 | 1465.836 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 171.748 | 186.953 | 160.947 | 186.953 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1427.661 | 1489.699 | 1426.231 | 1489.699 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.102 | 0.128 | 0.102 | 0.128 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.534 | 2.665 | 2.480 | 2.665 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.032 | 0.041 | 0.027 | 0.041 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.457 | 0.502 | 0.445 | 0.502 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.928 | 21.412 | 20.729 | 21.412 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 36.366 | 36.914 | 36.342 | 36.914 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 21.594 | 22.091 | 20.989 | 22.091 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 35.830 | 39.853 | 35.688 | 39.853 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.715 | 22.127 | 21.626 | 22.127 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.272 | 33.393 | 32.192 | 33.393 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.424 | 0.634 | 0.379 | 0.634 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.601 | 5.145 | 3.523 | 5.145 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.035 | 0.048 | 0.028 | 0.048 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.520 | 0.552 | 0.485 | 0.552 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 196.882 | 199.608 | 189.361 | 199.608 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1491.949 | 1589.968 | 1474.258 | 1589.968 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.645 | 164.126 | 159.072 | 164.126 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1493.848 | 1610.156 | 1424.665 | 1610.156 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.120 | 0.701 | 0.112 | 0.701 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.526 | 2.579 | 2.511 | 2.579 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.045 | 0.034 | 0.045 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.482 | 0.500 | 0.466 | 0.500 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.355 | 18.131 | 17.066 | 18.131 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 31.033 | 34.457 | 30.616 | 34.457 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 17.483 | 18.765 | 17.443 | 18.765 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 30.474 | 30.926 | 29.815 | 30.926 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.729 | 18.734 | 17.686 | 18.734 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.827 | 28.609 | 26.776 | 28.609 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.402 | 0.450 | 0.381 | 0.450 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.556 | 3.869 | 3.546 | 3.869 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.022 | 0.013 | 0.022 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.492 | 0.496 | 0.485 | 0.496 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 189.152 | 202.355 | 189.032 | 202.355 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1455.828 | 1493.982 | 1453.021 | 1493.982 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.089 | 170.345 | 162.196 | 170.345 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1440.420 | 1560.785 | 1426.465 | 1560.785 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.106 | 0.205 | 0.104 | 0.205 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.301 | 2.317 | 2.294 | 2.317 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.037 | 0.044 | 0.029 | 0.044 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.467 | 1.577 | 0.452 | 1.577 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.685 | 19.409 | 18.443 | 19.409 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 32.984 | 37.735 | 32.983 | 37.735 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 19.122 | 20.870 | 18.992 | 20.870 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 32.273 | 37.365 | 32.161 | 37.365 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 19.000 | 19.497 | 18.916 | 19.497 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 29.300 | 30.723 | 28.659 | 30.723 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.321 | 0.409 | 0.306 | 0.409 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.370 | 3.519 | 3.285 | 3.519 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.020 | 0.028 | 0.019 | 0.028 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.486 | 0.519 | 0.485 | 0.519 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 192.518 | 206.733 | 187.402 | 206.733 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1540.279 | 1710.827 | 1499.058 | 1710.827 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 162.116 | 163.864 | 160.943 | 163.864 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1446.600 | 1472.407 | 1439.928 | 1472.407 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.087 | 0.128 | 0.082 | 0.128 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.364 | 2.882 | 2.279 | 2.882 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.028 | 0.046 | 0.026 | 0.046 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.439 | 0.896 | 0.434 | 0.896 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.658 | 18.701 | 18.650 | 18.701 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 33.312 | 40.239 | 32.861 | 40.239 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.055 | 19.503 | 18.939 | 19.503 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 32.411 | 33.773 | 32.280 | 33.773 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 18.997 | 19.406 | 18.822 | 19.406 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 29.599 | 30.378 | 28.861 | 30.378 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.350 | 0.368 | 0.327 | 0.368 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.292 | 3.317 | 3.183 | 3.317 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.039 | 0.049 | 0.039 | 0.049 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.583 | 0.591 | 0.571 | 0.591 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 180.362 | 190.529 | 177.394 | 190.529 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1442.623 | 1461.662 | 1440.373 | 1461.662 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 159.881 | 164.016 | 159.351 | 164.016 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1429.671 | 1477.121 | 1424.252 | 1477.121 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.107 | 0.122 | 0.099 | 0.122 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.555 | 2.679 | 2.505 | 2.679 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.029 | 0.041 | 0.028 | 0.041 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.630 | 0.686 | 0.623 | 0.686 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.231 | 4.642 | 4.029 | 4.642 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.812 | 14.014 | 13.485 | 14.014 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.446 | 4.978 | 4.338 | 4.978 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 13.366 | 13.438 | 13.051 | 13.438 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 5.891 | 6.610 | 5.003 | 6.610 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 10.335 | 10.700 | 10.049 | 10.700 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.396 | 0.412 | 0.385 | 0.412 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.303 | 3.387 | 3.261 | 3.387 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.022 | 0.027 | 0.021 | 0.027 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.467 | 0.566 | 0.459 | 0.566 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 198.253 | 201.606 | 193.716 | 201.606 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1463.589 | 1473.907 | 1458.094 | 1473.907 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.558 | 168.796 | 156.998 | 168.796 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1425.596 | 1444.246 | 1421.733 | 1444.246 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.139 | 0.262 | 0.100 | 0.262 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.297 | 2.379 | 2.295 | 2.379 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.066 | 0.031 | 0.066 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.430 | 0.439 | 0.425 | 0.439 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.246 | 20.683 | 20.194 | 20.683 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.738 | 36.910 | 35.613 | 36.910 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.916 | 21.052 | 20.854 | 21.052 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 35.289 | 40.067 | 35.233 | 40.067 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.791 | 21.007 | 20.746 | 21.007 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 34.307 | 36.082 | 32.284 | 36.082 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.382 | 0.408 | 0.335 | 0.408 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.349 | 3.992 | 3.204 | 3.992 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 164.383 | 486.113 | 160.597 | 486.113 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1581.624 | 1675.447 | 1549.287 | 1675.447 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.117 | 0.209 | 0.103 | 0.209 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.336 | 2.480 | 2.277 | 2.480 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.020 | 0.024 | 0.018 | 0.024 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.476 | 0.540 | 0.471 | 0.540 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.705 | 1.926 | 1.698 | 1.926 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 6.600 | 14.689 | 6.096 | 14.689 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.898 | 1.329 | 0.869 | 1.329 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 3.062 | 3.786 | 2.977 | 3.786 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 163.597 | 170.079 | 163.572 | 170.079 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1466.880 | 1568.266 | 1455.646 | 1568.266 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.111 | 0.117 | 0.101 | 0.117 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.590 | 2.808 | 2.531 | 2.808 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.017 | 0.020 | 0.014 | 0.020 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.636 | 0.654 | 0.628 | 0.654 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 3.199 | 3.669 | 3.106 | 3.669 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.931 | 12.592 | 7.027 | 12.592 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.030 | 1.144 | 0.991 | 1.144 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 3.066 | 3.952 | 2.996 | 3.952 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.615 | 173.290 | 162.300 | 173.290 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1483.118 | 1792.254 | 1446.530 | 1792.254 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.135 | 0.151 | 0.135 | 0.151 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.299 | 2.656 | 2.185 | 2.656 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.024 | 0.019 | 0.024 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.445 | 0.502 | 0.410 | 0.502 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 18.933 | 19.488 | 18.831 | 19.488 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 31.020 | 31.290 | 29.311 | 31.290 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.874 | 0.926 | 0.851 | 0.926 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 3.193 | 3.291 | 3.070 | 3.291 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 168.660 | 173.024 | 163.659 | 173.024 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1444.136 | 1641.431 | 1438.113 | 1641.431 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.143 | 0.246 | 0.133 | 0.246 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.232 | 2.344 | 2.184 | 2.344 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.028 | 0.020 | 0.028 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.431 | 0.450 | 0.430 | 0.450 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 9.391 | 10.272 | 9.306 | 10.272 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 18.720 | 19.617 | 18.710 | 19.617 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.909 | 1.025 | 0.894 | 1.025 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.958 | 3.081 | 2.944 | 3.081 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.702 | 189.924 | 163.992 | 189.924 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1459.931 | 1676.912 | 1444.916 | 1676.912 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.139 | 0.188 | 0.120 | 0.188 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.040 | 2.097 | 2.027 | 2.097 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.022 | 0.038 | 0.019 | 0.038 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.416 | 0.448 | 0.411 | 0.448 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.929 | 7.288 | 6.725 | 7.288 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 13.362 | 14.432 | 12.462 | 14.432 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.990 | 1.012 | 0.953 | 1.012 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.894 | 2.925 | 2.852 | 2.925 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 168.434 | 169.433 | 160.658 | 169.433 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1458.323 | 1468.809 | 1446.804 | 1468.809 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.130 | 0.143 | 0.124 | 0.143 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.085 | 2.126 | 2.084 | 2.126 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.029 | 0.020 | 0.029 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.458 | 0.474 | 0.426 | 0.474 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.329 | 8.559 | 8.305 | 8.559 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 16.262 | 18.188 | 15.513 | 18.188 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.855 | 0.969 | 0.852 | 0.969 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.915 | 3.401 | 2.901 | 3.401 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.120 | 167.135 | 158.254 | 167.135 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1699.512 | 1775.390 | 1669.197 | 1775.390 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.143 | 0.266 | 0.134 | 0.266 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.234 | 2.387 | 2.191 | 2.387 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.019 | 0.022 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.463 | 0.580 | 0.414 | 0.580 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.785 | 8.087 | 7.770 | 8.087 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 15.398 | 18.008 | 14.681 | 18.008 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.875 | 1.031 | 0.849 | 1.031 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.909 | 6.834 | 2.858 | 6.834 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.837 | 159.629 | 156.150 | 159.629 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1439.684 | 1478.916 | 1434.723 | 1478.916 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.119 | 0.146 | 0.115 | 0.146 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.203 | 2.411 | 2.192 | 2.411 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.019 | 0.023 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.415 | 0.440 | 0.411 | 0.440 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 16.613 | 17.022 | 16.551 | 17.022 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 24.386 | 24.827 | 24.148 | 24.827 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.858 | 0.941 | 0.851 | 0.941 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.862 | 2.964 | 2.860 | 2.964 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 164.557 | 180.588 | 162.298 | 180.588 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1686.297 | 1886.550 | 1527.858 | 1886.550 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.127 | 0.144 | 0.123 | 0.144 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.296 | 2.395 | 2.240 | 2.395 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.017 | 0.022 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.444 | 0.481 | 0.442 | 0.481 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 16.574 | 17.926 | 16.443 | 17.926 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 28.462 | 33.501 | 28.382 | 33.501 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.892 | 0.967 | 0.884 | 0.967 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 3.242 | 27.344 | 3.126 | 27.344 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 210.752 | 272.177 | 203.289 | 272.177 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1540.401 | 1715.401 | 1474.693 | 1715.401 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.167 | 0.221 | 0.145 | 0.221 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 3.023 | 6.709 | 2.810 | 6.709 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.023 | 0.043 | 0.022 | 0.043 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.512 | 0.535 | 0.499 | 0.535 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 19.846 | 33.696 | 19.681 | 33.696 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 27.834 | 29.899 | 27.486 | 29.899 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 2.443 | 4.817 | 1.790 | 4.817 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 4.097 | 4.295 | 3.786 | 4.295 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 184.075 | 189.102 | 181.235 | 189.102 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1488.542 | 1568.129 | 1487.318 | 1568.129 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.176 | 1.773 | 0.157 | 1.773 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.387 | 2.612 | 2.280 | 2.612 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.024 | 0.046 | 0.022 | 0.046 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.455 | 0.475 | 0.446 | 0.475 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 17.488 | 17.718 | 17.308 | 17.718 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 27.811 | 29.315 | 27.660 | 29.315 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.956 | 1.187 | 0.899 | 1.187 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 3.198 | 4.125 | 3.023 | 4.125 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 182.378 | 183.238 | 173.964 | 183.238 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1562.167 | 1629.305 | 1492.895 | 1629.305 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.115 | 0.142 | 0.113 | 0.142 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.392 | 2.626 | 2.353 | 2.626 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.021 | 0.057 | 0.017 | 0.057 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.468 | 0.495 | 0.441 | 0.495 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.625 | 6.722 | 6.461 | 6.722 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 15.560 | 16.468 | 14.925 | 16.468 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.920 | 1.004 | 0.847 | 1.004 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 3.156 | 4.058 | 3.080 | 4.058 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 171.779 | 194.603 | 167.975 | 194.603 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1552.457 | 1617.309 | 1512.525 | 1617.309 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.151 | 0.200 | 0.136 | 0.200 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.757 | 3.083 | 2.599 | 3.083 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.020 | 0.033 | 0.019 | 0.033 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.670 | 0.701 | 0.664 | 0.701 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 38.399 | 40.245 | 38.225 | 40.245 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 42.735 | 45.224 | 41.133 | 45.224 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.305 | 2.372 | 1.087 | 2.372 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 4.060 | 4.241 | 3.766 | 4.241 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 169.924 | 183.770 | 162.553 | 183.770 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1529.511 | 1574.990 | 1490.818 | 1574.990 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.163 | 0.266 | 0.152 | 0.266 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.360 | 2.685 | 2.326 | 2.685 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.026 | 0.032 | 0.020 | 0.032 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.494 | 0.569 | 0.459 | 0.569 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 102.707 | 102.899 | 102.120 | 102.899 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 125.400 | 127.447 | 124.062 | 127.447 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.311 | 1.444 | 1.119 | 1.444 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.716 | 4.723 | 3.671 | 4.723 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 172.922 | 242.804 | 171.921 | 242.804 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1549.843 | 1593.908 | 1453.674 | 1593.908 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.200 | 2.256 | 0.155 | 2.256 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.777 | 3.726 | 2.741 | 3.726 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.028 | 0.048 | 0.017 | 0.048 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.781 | 0.806 | 0.763 | 0.806 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 133.169 | 133.759 | 133.159 | 133.759 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 114.079 | 114.532 | 113.834 | 114.532 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.758 | 14.098 | 1.739 | 14.098 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.585 | 3.772 | 3.577 | 3.772 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 179.596 | 192.237 | 174.661 | 192.237 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1501.867 | 1727.781 | 1488.703 | 1727.781 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.114 | 0.149 | 0.114 | 0.149 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.237 | 2.651 | 2.169 | 2.651 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.019 | 0.021 | 0.019 | 0.021 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.439 | 0.711 | 0.415 | 0.711 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 6.394 | 6.452 | 5.951 | 6.452 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 15.642 | 17.965 | 14.551 | 17.965 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.971 | 1.035 | 0.907 | 1.035 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 3.162 | 4.716 | 3.065 | 4.716 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 162.506 | 173.979 | 162.076 | 173.979 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1510.752 | 1658.709 | 1488.434 | 1658.709 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.123 | 0.158 | 0.122 | 0.158 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.165 | 2.375 | 2.149 | 2.375 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.018 | 0.028 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.461 | 0.533 | 0.454 | 0.533 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 116.705 | 118.440 | 116.518 | 118.440 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 130.616 | 305.842 | 130.500 | 305.842 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.922 | 1.087 | 0.884 | 1.087 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 3.005 | 3.837 | 2.890 | 3.837 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.128 | 166.125 | 159.698 | 166.125 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1448.698 | 1873.589 | 1437.359 | 1873.589 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.156 | 0.301 | 0.130 | 0.301 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.067 | 2.149 | 2.025 | 2.149 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.016 | 0.023 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.434 | 0.640 | 0.430 | 0.640 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 15.268 | 15.628 | 15.169 | 15.628 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 21.456 | 23.953 | 20.208 | 23.953 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.917 | 1.028 | 0.912 | 1.028 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.922 | 3.280 | 2.878 | 3.280 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 174.509 | 294.865 | 168.073 | 294.865 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1506.058 | 1572.910 | 1469.657 | 1572.910 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.185 | 0.220 | 0.171 | 0.220 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.508 | 3.851 | 3.437 | 3.851 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.019 | 0.024 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.648 | 0.716 | 0.638 | 0.716 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 10.505 | 10.627 | 10.013 | 10.627 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 19.863 | 20.453 | 19.836 | 20.453 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 1.461 | 1.647 | 1.385 | 1.647 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.348 | 5.440 | 4.277 | 5.440 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.509 | 169.052 | 163.609 | 169.052 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1476.849 | 1649.121 | 1475.046 | 1649.121 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.139 | 0.142 | 0.130 | 0.142 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.262 | 2.361 | 2.239 | 2.361 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.029 | 0.016 | 0.029 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.458 | 0.460 | 0.446 | 0.460 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.662 | 7.164 | 6.564 | 7.164 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 14.270 | 14.569 | 13.843 | 14.569 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.911 | 1.005 | 0.893 | 1.005 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.946 | 3.750 | 2.791 | 3.750 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 168.921 | 264.574 | 161.359 | 264.574 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1460.945 | 1483.595 | 1455.224 | 1483.595 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.168 | 0.130 | 0.168 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.262 | 2.444 | 2.244 | 2.444 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.017 | 0.023 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.485 | 0.509 | 0.470 | 0.509 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.497 | 10.842 | 10.260 | 10.842 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 17.065 | 18.667 | 16.695 | 18.667 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.957 | 1.024 | 0.944 | 1.024 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.207 | 3.439 | 3.111 | 3.439 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 168.919 | 190.380 | 168.167 | 190.380 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1577.465 | 1667.648 | 1551.997 | 1667.648 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.206 | 1.194 | 0.181 | 1.194 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 4.435 | 6.294 | 4.218 | 6.294 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.035 | 0.021 | 0.035 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.751 | 1.161 | 0.741 | 1.161 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 29.100 | 31.528 | 29.020 | 31.528 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 44.921 | 46.952 | 44.810 | 46.952 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.929 | 0.972 | 0.896 | 0.972 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.209 | 5.979 | 5.104 | 5.979 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 217.975 | 245.898 | 185.587 | 245.898 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1549.759 | 1982.503 | 1502.007 | 1982.503 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.215 | 0.541 | 0.165 | 0.541 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 4.119 | 4.287 | 3.883 | 4.287 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.043 | 0.020 | 0.043 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.732 | 0.838 | 0.701 | 0.838 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 27.669 | 32.444 | 27.634 | 32.444 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 42.091 | 44.072 | 41.045 | 44.072 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 1.252 | 1.764 | 1.066 | 1.764 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.446 | 9.771 | 5.328 | 9.771 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 179.923 | 388.846 | 168.751 | 388.846 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1454.029 | 1703.493 | 1445.393 | 1703.493 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.170 | 0.289 | 0.139 | 0.289 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.276 | 2.366 | 2.192 | 2.366 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.018 | 0.024 | 0.018 | 0.024 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.452 | 0.489 | 0.444 | 0.489 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.951 | 9.615 | 8.758 | 9.615 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 17.276 | 18.290 | 16.524 | 18.290 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 1.026 | 1.946 | 0.913 | 1.946 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.983 | 3.772 | 2.906 | 3.772 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 171.824 | 177.971 | 171.343 | 177.971 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1491.516 | 1620.791 | 1459.017 | 1620.791 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.135 | 0.175 | 0.128 | 0.175 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.444 | 2.594 | 2.406 | 2.594 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.021 | 0.024 | 0.018 | 0.024 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.476 | 0.484 | 0.471 | 0.484 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 8.147 | 9.047 | 8.039 | 9.047 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 15.824 | 18.112 | 15.302 | 18.112 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 0.853 | 2.875 | 0.821 | 2.875 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.371 | 4.678 | 3.365 | 4.678 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 172.502 | 215.222 | 167.844 | 215.222 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1495.212 | 1520.892 | 1444.037 | 1520.892 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.139 | 0.142 | 0.133 | 0.142 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.561 | 2.920 | 2.423 | 2.920 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.021 | 0.032 | 0.018 | 0.032 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.490 | 0.513 | 0.464 | 0.513 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 10.278 | 11.885 | 10.221 | 11.885 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 19.550 | 20.144 | 18.677 | 20.144 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 0.796 | 2.517 | 0.747 | 2.517 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.412 | 3.813 | 3.404 | 3.813 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 174.151 | 199.898 | 173.173 | 199.898 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1495.948 | 1908.428 | 1457.645 | 1908.428 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.157 | 0.221 | 0.143 | 0.221 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.231 | 2.419 | 2.223 | 2.419 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.021 | 0.026 | 0.019 | 0.026 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.447 | 0.682 | 0.418 | 0.682 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.515 | 11.350 | 10.503 | 11.350 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 19.648 | 23.422 | 18.616 | 23.422 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.960 | 0.980 | 0.933 | 0.980 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 3.036 | 3.422 | 2.942 | 3.422 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 176.363 | 191.445 | 169.107 | 191.445 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1516.013 | 2016.171 | 1467.667 | 2016.171 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.138 | 0.272 | 0.126 | 0.272 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.309 | 2.823 | 2.284 | 2.823 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.022 | 0.035 | 0.020 | 0.035 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.430 | 0.457 | 0.428 | 0.457 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 8.200 | 8.491 | 7.760 | 8.491 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 15.837 | 16.305 | 15.351 | 16.305 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.908 | 1.165 | 0.907 | 1.165 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 3.031 | 3.249 | 2.947 | 3.249 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 208.813 | 254.534 | 202.605 | 254.534 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1501.679 | 1705.076 | 1499.891 | 1705.076 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.146 | 0.154 | 0.145 | 0.154 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.414 | 4.592 | 2.348 | 4.592 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.022 | 0.025 | 0.021 | 0.025 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.458 | 0.491 | 0.454 | 0.491 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 15.722 | 20.244 | 15.494 | 20.244 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 25.564 | 26.585 | 25.364 | 26.585 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 1.289 | 1.428 | 1.187 | 1.428 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.545 | 4.165 | 3.542 | 4.165 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 199.400 | 207.541 | 198.686 | 207.541 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1579.278 | 1642.961 | 1556.465 | 1642.961 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 164.381 | 173.874 | 162.366 | 173.874 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1534.208 | 1620.714 | 1526.919 | 1620.714 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.179 | 0.216 | 0.160 | 0.216 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.544 | 2.678 | 2.517 | 2.678 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.022 | 0.031 | 0.019 | 0.031 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.498 | 0.586 | 0.480 | 0.586 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.047 | 0.057 | 0.033 | 0.057 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.500 | 0.517 | 0.488 | 0.517 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.242 | 1.649 | 1.062 | 1.649 | 148.2 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 92.516 | 98.652 | 91.657 | 98.652 | 131.6 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 192.854 | 201.380 | 184.609 | 201.380 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1495.924 | 1530.252 | 1480.787 | 1530.252 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 172.199 | 195.546 | 161.261 | 195.546 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1463.679 | 1523.302 | 1434.792 | 1523.302 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.189 | 0.227 | 0.158 | 0.227 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.510 | 2.604 | 2.468 | 2.604 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.022 | 0.037 | 0.020 | 0.037 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.485 | 0.550 | 0.468 | 0.550 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 0.069 | 0.045 | 0.069 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.507 | 0.518 | 0.496 | 0.518 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.714 | 0.854 | 0.540 | 0.854 | 147.9 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 23.879 | 37.785 | 23.493 | 37.785 | 131.6 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 207.588 | 213.872 | 197.396 | 213.872 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1532.056 | 1718.571 | 1509.111 | 1718.571 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 175.927 | 181.809 | 166.621 | 181.809 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1500.951 | 2091.501 | 1454.185 | 2091.501 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.206 | 0.236 | 0.163 | 0.236 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.963 | 7.871 | 3.817 | 7.871 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.034 | 0.051 | 0.022 | 0.051 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.774 | 1.232 | 0.697 | 1.232 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.042 | 0.055 | 0.037 | 0.055 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.573 | 0.596 | 0.543 | 0.596 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.805 | 2.024 | 0.732 | 2.024 | 153.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 31.514 | 45.700 | 30.568 | 45.700 | 131.6 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 196.863 | 202.968 | 195.091 | 202.968 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1549.484 | 1990.293 | 1502.189 | 1990.293 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 166.500 | 182.534 | 164.082 | 182.534 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1492.648 | 2042.644 | 1449.752 | 2042.644 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.186 | 0.219 | 0.149 | 0.219 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 4.083 | 5.471 | 3.876 | 5.471 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.026 | 0.038 | 0.020 | 0.038 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.696 | 0.731 | 0.621 | 0.731 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.047 | 0.075 | 0.037 | 0.075 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.553 | 1.105 | 0.547 | 1.105 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.743 | 2.132 | 0.665 | 2.132 | 150.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 32.612 | 51.989 | 29.532 | 51.989 | 131.6 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 193.761 | 249.193 | 186.161 | 249.193 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1528.126 | 1724.765 | 1494.536 | 1724.765 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.482 | 188.955 | 164.827 | 188.955 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1537.981 | 1707.834 | 1499.853 | 1707.834 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.147 | 0.172 | 0.144 | 0.172 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.671 | 2.883 | 2.510 | 2.883 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.021 | 0.030 | 0.016 | 0.030 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.664 | 0.677 | 0.651 | 0.677 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.051 | 0.081 | 0.038 | 0.081 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.595 | 0.627 | 0.582 | 0.627 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 1.301 | 1.906 | 1.191 | 1.906 | 145.5 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.591 | 39.766 | 25.534 | 39.766 | 131.6 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 195.117 | 202.057 | 193.720 | 202.057 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1597.941 | 1625.708 | 1559.030 | 1625.708 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.846 | 268.757 | 158.381 | 268.757 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1544.448 | 1576.480 | 1518.056 | 1576.480 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.142 | 0.187 | 0.133 | 0.187 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.317 | 2.376 | 2.247 | 2.376 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.022 | 0.033 | 0.019 | 0.033 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.460 | 0.536 | 0.447 | 0.536 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.020 | 0.045 | 0.018 | 0.045 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.491 | 0.521 | 0.472 | 0.521 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.085 | 1.304 | 1.049 | 1.304 | 144.4 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 81.340 | 83.739 | 80.182 | 83.739 | 131.6 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 345.625 | 351.185 | 335.151 | 351.185 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1877.126 | 2042.937 | 1872.138 | 2042.937 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 191.348 | 209.515 | 185.280 | 209.515 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1762.479 | 1904.427 | 1738.089 | 1904.427 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.161 | 0.242 | 0.143 | 0.242 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.750 | 2.891 | 2.740 | 2.891 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.021 | 0.023 | 0.018 | 0.023 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.783 | 0.852 | 0.748 | 0.852 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.081 | 0.115 | 0.049 | 0.115 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.834 | 1.223 | 0.827 | 1.223 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 23.971 | 24.808 | 23.773 | 24.808 | 157.0 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 307.440 | 318.666 | 295.077 | 318.666 | 133.4 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 342.985 | 388.432 | 337.297 | 388.432 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1946.792 | 2156.638 | 1829.212 | 2156.638 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 202.232 | 254.659 | 193.098 | 254.659 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1902.053 | 2179.379 | 1733.836 | 2179.379 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.174 | 0.234 | 0.165 | 0.234 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.813 | 4.319 | 2.725 | 4.319 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.037 | 0.117 | 0.020 | 0.117 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.786 | 0.795 | 0.757 | 0.795 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.101 | 0.155 | 0.056 | 0.155 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.798 | 0.946 | 0.755 | 0.946 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 23.808 | 26.043 | 22.871 | 26.043 | 157.0 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 284.838 | 299.535 | 281.352 | 299.535 | 133.5 |
| warm-start-logistic-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 133.161 | 136.080 | 132.262 | 136.080 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-fit | python-prophet | 6 | 113.533 | 287.537 | 112.092 | 287.537 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 118.101 | 143.069 | 116.672 | 143.069 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 105.816 | 165.266 | 96.450 | 165.266 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `e38322b64aa058247a89e2197cd98ad9ea44f2f5`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-logistic-additive`, `country-explicit-us-logistic-additive`, `country-us-logistic-multiplicative`, `country-explicit-us-logistic-multiplicative`, `logistic-implicit-floor-absmax`, `logistic-implicit-floor-minmax`, `logistic-explicit-floor-absmax`, `logistic-explicit-floor-minmax`, `logistic-implicit-floor-auto-changepoints`, `logistic-implicit-floor-large`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7`, `uncertainty-logistic-implicit-floor-minmax-full-samples-512`, `uncertainty-logistic-implicit-floor-large-full-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-full-intervals-512`, `uncertainty-logistic-explicit-floor-minmax-full-samples-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128`, `anomalies-logistic-defaults-99`, `warm-start-logistic-defaults-7-new-rows`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `evaluation-logistic-large-months-metrics`, `logistic-reconcile-basic-96-empty-absmax`, `logistic-reconcile-basic-96-explicit-absmax`, `logistic-reconcile-basic-96-auto-absmax`, `logistic-reconcile-basic-96-empty-minmax`, `logistic-reconcile-basic-96-explicit-minmax`, `logistic-reconcile-basic-96-auto-minmax`, `logistic-reconcile-empty-loose-prior-absmax`, `logistic-reconcile-empty-loose-prior-minmax`, `logistic-reconcile-basic-99`, `logistic-reconcile-basic-100`, `logistic-reconcile-basic-256`, `logistic-reconcile-defaults-96`, `logistic-reconcile-defaults-256`, `logistic-reconcile-defaults-rate-changes`, `logistic-reconcile-weekly`, `logistic-reconcile-conditional`, `logistic-reconcile-event`, `logistic-reconcile-regressor-additive`, `logistic-reconcile-regressor-multiplicative`, `logistic-reconcile-explicit-floor-absmax`, `logistic-reconcile-mixed-absmax`, `logistic-reconcile-explicit-floor-minmax`, `logistic-reconcile-mixed-minmax`, `logistic-reconcile-unsorted`, `logistic-reconcile-duplicates`, `logistic-reconcile-declining`, `logistic-reconcile-saturated`, `logistic-reconcile-constant`, `logistic-reconcile-out-of-bounds`
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

