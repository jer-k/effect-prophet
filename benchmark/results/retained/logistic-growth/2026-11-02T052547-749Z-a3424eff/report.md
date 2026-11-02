# Effect Prophet benchmark — 2026-11-02T052547-749Z-a3424eff

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
| anomalies-logistic-defaults-99 | warm-anomalies | effect-prophet | 6 | 71.265 | 75.013 | 63.637 | 75.013 | n/a |
| anomalies-logistic-defaults-99 | warm-anomalies | python-prophet | 6 | 272.966 | 288.004 | 271.391 | 288.004 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | effect-prophet | 6 | 49.715 | 60.723 | 48.400 | 60.723 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | python-prophet | 6 | 41.124 | 41.677 | 40.905 | 41.677 | n/a |
| anomalies-logistic-defaults-99 | warm-uncertainty | effect-prophet | 6 | 13.430 | 13.767 | 13.202 | 13.767 | 158.1 |
| anomalies-logistic-defaults-99 | warm-uncertainty | python-prophet | 6 | 231.917 | 242.059 | 227.789 | 242.059 | 131.8 |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.017 | 0.015 | 0.017 | 136.2 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.526 | 0.449 | 0.526 | 131.8 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 194.743 | 219.707 | 191.653 | 219.707 | 149.6 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1353.743 | 1400.153 | 1341.676 | 1400.153 | 131.8 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 150.053 | 155.931 | 148.901 | 155.931 | 149.8 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1347.313 | 1777.857 | 1326.143 | 1777.857 | 131.8 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.349 | 0.374 | 0.331 | 0.374 | 149.8 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 3.776 | 4.049 | 3.708 | 4.049 | 131.8 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.026 | 0.030 | 0.016 | 0.030 | 149.6 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.664 | 0.718 | 0.654 | 0.718 | 131.8 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 35.810 | 39.294 | 34.946 | 39.294 | 149.4 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 50.610 | 51.248 | 50.429 | 51.248 | 131.8 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 36.095 | 44.558 | 35.328 | 44.558 | 146.3 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 50.157 | 50.701 | 50.048 | 50.701 | 131.8 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 36.820 | 41.283 | 35.978 | 41.283 | 145.9 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 45.999 | 46.444 | 45.565 | 46.444 | 131.8 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.162 | 0.169 | 0.124 | 0.169 | 146.0 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.435 | 4.735 | 4.346 | 4.735 | 131.8 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.012 | 0.023 | 0.011 | 0.023 | 139.4 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.488 | 0.529 | 0.474 | 0.529 | 131.8 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 211.231 | 223.684 | 208.242 | 223.684 | 152.1 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1369.985 | 1380.100 | 1361.018 | 1380.100 | 131.8 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 152.348 | 160.525 | 149.619 | 160.525 | 152.1 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1311.381 | 1349.758 | 1302.111 | 1349.758 | 131.8 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.359 | 0.559 | 0.285 | 0.559 | 152.1 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 3.877 | 4.450 | 3.718 | 4.450 | 131.8 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.026 | 0.042 | 0.016 | 0.042 | 152.1 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.675 | 0.742 | 0.645 | 0.742 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 39.975 | 41.324 | 39.849 | 41.324 | 151.9 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 58.333 | 60.525 | 57.860 | 60.525 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 40.083 | 48.805 | 39.532 | 48.805 | 148.3 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 57.318 | 60.190 | 56.843 | 60.190 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 40.743 | 42.422 | 40.626 | 42.422 | 145.4 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 53.733 | 64.127 | 53.108 | 64.127 | 131.8 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.182 | 0.264 | 0.138 | 0.264 | 148.1 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.515 | 4.665 | 4.346 | 4.665 | 131.8 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.023 | 0.015 | 0.023 | 145.7 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.478 | 0.511 | 0.458 | 0.511 | 148.4 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 208.085 | 223.149 | 197.210 | 223.149 | 158.2 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1507.113 | 1533.192 | 1499.588 | 1533.192 | 148.4 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 155.645 | 170.093 | 151.575 | 170.093 | 169.4 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1472.525 | 1623.996 | 1446.339 | 1623.996 | 148.4 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 1.065 | 1.186 | 1.008 | 1.186 | 166.7 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 3.762 | 3.894 | 3.612 | 3.894 | 148.4 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.112 | 0.120 | 0.098 | 0.120 | 158.2 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.688 | 0.713 | 0.628 | 0.713 | 148.4 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 28.739 | 28.851 | 28.408 | 28.851 | 157.9 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 54.821 | 55.158 | 54.576 | 55.158 | 148.4 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 28.487 | 29.097 | 28.130 | 29.097 | 157.0 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 54.586 | 56.940 | 54.126 | 56.940 | 148.4 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 28.909 | 29.319 | 28.715 | 29.319 | 153.6 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 49.159 | 51.330 | 48.710 | 51.330 | 148.4 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.194 | 0.213 | 0.185 | 0.213 | 153.6 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.199 | 5.425 | 5.106 | 5.425 | 148.4 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.020 | 0.028 | 0.015 | 0.028 | 141.6 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.663 | 0.730 | 0.532 | 0.730 | 148.5 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 226.007 | 253.841 | 215.477 | 253.841 | 152.6 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1716.196 | 2302.209 | 1520.272 | 2302.209 | 148.5 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 161.101 | 172.599 | 156.120 | 172.599 | 163.5 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1500.733 | 2110.903 | 1460.763 | 2110.903 | 148.5 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.866 | 1.343 | 0.807 | 1.343 | 160.7 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 3.844 | 5.457 | 3.662 | 5.457 | 148.5 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.145 | 0.149 | 0.117 | 0.149 | 152.6 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.738 | 2.999 | 0.688 | 2.999 | 148.5 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 40.722 | 46.231 | 40.505 | 46.231 | 152.5 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 74.739 | 80.571 | 68.416 | 80.571 | 148.5 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 40.537 | 51.077 | 40.378 | 51.077 | 151.5 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 64.233 | 76.384 | 63.920 | 76.384 | 148.5 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 42.448 | 53.033 | 40.835 | 53.033 | 147.4 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 61.352 | 73.147 | 59.515 | 73.147 | 148.5 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.206 | 0.478 | 0.198 | 0.478 | 147.5 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.624 | 7.231 | 5.343 | 7.231 | 148.5 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 16.616 | 17.172 | 16.093 | 17.172 | 147.4 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 60.271 | 61.340 | 60.009 | 61.340 | 131.8 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 13.494 | 17.024 | 12.903 | 17.024 | 160.3 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 55.255 | 69.122 | 55.059 | 69.122 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.267 | 1.576 | 1.215 | 1.576 | 155.1 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 11.778 | 11.921 | 11.649 | 11.921 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.327 | 0.353 | 0.325 | 0.353 | 155.1 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 4.667 | 5.325 | 4.640 | 5.325 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 1.507 | 1.817 | 1.492 | 1.817 | 155.1 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 4.938 | 5.023 | 4.916 | 5.023 | 131.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.702 | 2.462 | 0.463 | 2.462 | 154.9 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.096 | 5.191 | 5.006 | 5.191 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-point-processes | python-prophet | 4 | 1519.411 | 2122.259 | 1484.567 | 2122.259 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-point-threads | python-prophet | 4 | 160.732 | 166.040 | 158.170 | 166.040 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-point | effect-prophet | 4 | 56.498 | 57.309 | 56.114 | 57.309 | 159.9 |
| evaluation-logistic-large-parallel | evaluation-point | python-prophet | 4 | 157.861 | 174.970 | 156.273 | 174.970 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-search-processes | python-prophet | 4 | 5414.066 | 6381.277 | 4561.837 | 6381.277 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-search-threads | python-prophet | 4 | 496.962 | 523.983 | 492.112 | 523.983 | 131.8 |
| evaluation-logistic-large-parallel | evaluation-search | effect-prophet | 4 | 160.203 | 162.624 | 157.802 | 162.624 | 200.6 |
| evaluation-logistic-large-parallel | evaluation-search | python-prophet | 4 | 522.478 | 622.211 | 475.777 | 622.211 | 131.8 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 179.841 | 183.195 | 179.136 | 183.195 | 162.7 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1336.843 | 1458.860 | 1330.942 | 1458.860 | 131.8 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.272 | 2.372 | 2.196 | 2.372 | 162.6 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.210 | 1.352 | 1.195 | 1.352 | 131.8 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.024 | 0.030 | 0.024 | 0.030 | 132.4 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.453 | 0.551 | 0.440 | 0.551 | 131.8 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.074 | 0.091 | 0.068 | 0.091 | 162.1 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 4.883 | 4.935 | 4.834 | 4.935 | 131.8 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.234 | 1.662 | 1.209 | 1.662 | 138.2 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.689 | 0.713 | 0.667 | 0.713 | 131.8 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 12.681 | 13.044 | 12.253 | 13.044 | 160.9 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 39.072 | 39.647 | 39.005 | 39.647 | 131.8 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 179.823 | 186.474 | 179.754 | 186.474 | 157.5 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1346.208 | 1397.739 | 1344.024 | 1397.739 | 131.8 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 0.981 | 1.054 | 0.938 | 1.054 | 157.4 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.719 | 0.761 | 0.696 | 0.761 | 131.8 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.010 | 0.011 | 0.009 | 0.011 | 131.4 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.401 | 0.412 | 0.365 | 0.412 | 131.8 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.069 | 0.091 | 0.059 | 0.091 | 152.8 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 4.867 | 4.915 | 4.863 | 4.915 | 131.8 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.963 | 1.031 | 0.885 | 1.031 | 134.4 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.515 | 0.561 | 0.504 | 0.561 | 131.8 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 15.726 | 16.691 | 15.470 | 16.691 | 150.9 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 56.531 | 68.691 | 55.255 | 68.691 | 131.8 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 15.878 | 16.136 | 15.839 | 16.136 | 156.1 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 28.079 | 28.632 | 27.965 | 28.632 | 131.8 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.176 | 0.182 | 0.165 | 0.182 | 156.6 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 131.8 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.230 | 0.249 | 0.226 | 0.249 | 156.4 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.010 | 0.008 | 0.010 | 131.8 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 31.901 | 35.112 | 31.324 | 35.112 | 153.7 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 107.152 | 108.036 | 107.065 | 108.036 | 131.8 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.044 | 0.067 | 0.037 | 0.067 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.474 | 0.507 | 0.472 | 0.507 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 178.432 | 183.178 | 177.120 | 183.178 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1323.354 | 1419.854 | 1317.227 | 1419.854 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.439 | 155.319 | 150.919 | 155.319 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1309.673 | 1317.985 | 1298.799 | 1317.985 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.080 | 0.101 | 0.078 | 0.101 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.307 | 2.408 | 2.291 | 2.408 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.049 | 0.034 | 0.049 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.464 | 0.478 | 0.453 | 0.478 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 19.375 | 19.779 | 19.071 | 19.779 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 34.071 | 34.231 | 33.410 | 34.231 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 20.091 | 22.165 | 19.416 | 22.165 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 33.589 | 38.192 | 33.120 | 38.192 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 19.900 | 20.075 | 19.872 | 20.075 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 29.664 | 31.283 | 29.578 | 31.283 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.262 | 0.302 | 0.262 | 0.302 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.311 | 3.392 | 3.308 | 3.392 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.041 | 0.050 | 0.040 | 0.050 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.482 | 0.514 | 0.475 | 0.514 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 174.074 | 181.625 | 173.566 | 181.625 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1317.023 | 1327.378 | 1316.950 | 1327.378 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 147.764 | 152.443 | 147.409 | 152.443 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1290.837 | 1304.372 | 1288.344 | 1304.372 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.083 | 0.114 | 0.080 | 0.114 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.256 | 2.294 | 2.230 | 2.294 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.048 | 0.032 | 0.048 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.441 | 0.450 | 0.440 | 0.450 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 16.346 | 16.433 | 16.212 | 16.433 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 28.773 | 29.073 | 28.720 | 29.073 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 15.969 | 16.492 | 15.947 | 16.492 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 28.147 | 28.427 | 28.131 | 28.427 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 16.521 | 16.923 | 16.318 | 16.923 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 25.296 | 26.570 | 25.226 | 26.570 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.308 | 0.411 | 0.273 | 0.411 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.347 | 3.431 | 3.328 | 3.431 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.027 | 0.036 | 0.018 | 0.036 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.457 | 0.473 | 0.447 | 0.473 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 180.969 | 195.725 | 179.854 | 195.725 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1343.035 | 1362.253 | 1317.242 | 1362.253 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 151.971 | 159.201 | 150.124 | 159.201 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1315.712 | 2045.488 | 1310.500 | 2045.488 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.095 | 0.232 | 0.089 | 0.232 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.127 | 2.184 | 2.094 | 2.184 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.029 | 0.041 | 0.029 | 0.041 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.444 | 0.453 | 0.414 | 0.453 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.040 | 19.229 | 16.977 | 19.229 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 30.577 | 36.774 | 29.904 | 36.774 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 17.247 | 19.388 | 17.061 | 19.388 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 29.669 | 32.283 | 29.446 | 32.283 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 17.944 | 19.105 | 17.687 | 19.105 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 27.213 | 27.370 | 26.980 | 27.370 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.336 | 0.353 | 0.271 | 0.353 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 2.986 | 3.017 | 2.932 | 3.017 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.019 | 0.038 | 0.018 | 0.038 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.492 | 0.596 | 0.475 | 0.596 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 178.291 | 180.376 | 175.756 | 180.376 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1328.571 | 1334.099 | 1326.272 | 1334.099 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 151.166 | 172.109 | 147.769 | 172.109 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1304.803 | 1355.462 | 1304.110 | 1355.462 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.079 | 0.107 | 0.074 | 0.107 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.143 | 2.205 | 2.092 | 2.205 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.034 | 0.050 | 0.027 | 0.050 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.438 | 0.473 | 0.412 | 0.473 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.211 | 17.292 | 17.067 | 17.292 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 30.717 | 31.017 | 30.104 | 31.017 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 17.070 | 17.360 | 17.063 | 17.360 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 30.208 | 30.418 | 29.857 | 30.418 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 17.615 | 17.869 | 17.470 | 17.869 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 26.813 | 33.130 | 26.723 | 33.130 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.307 | 0.331 | 0.294 | 0.331 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 2.976 | 3.073 | 2.959 | 3.073 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.055 | 0.059 | 0.053 | 0.059 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.535 | 0.585 | 0.532 | 0.585 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 165.893 | 171.620 | 165.580 | 171.620 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1362.817 | 1698.572 | 1332.911 | 1698.572 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 151.734 | 153.292 | 149.199 | 153.292 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1326.951 | 1467.383 | 1297.412 | 1467.383 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.095 | 0.106 | 0.090 | 0.106 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.452 | 2.671 | 2.352 | 2.671 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.032 | 0.032 | 0.029 | 0.032 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.650 | 0.672 | 0.646 | 0.672 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 3.936 | 4.517 | 3.917 | 4.517 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.076 | 13.202 | 13.014 | 13.202 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 3.955 | 4.901 | 3.917 | 4.901 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.871 | 14.335 | 12.611 | 14.335 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.001 | 6.111 | 3.858 | 6.111 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.293 | 10.101 | 9.085 | 10.101 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.390 | 0.394 | 0.384 | 0.394 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 2.964 | 3.021 | 2.931 | 3.021 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.021 | 0.018 | 0.021 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.462 | 0.478 | 0.455 | 0.478 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 178.072 | 181.972 | 177.646 | 181.972 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1398.202 | 1435.043 | 1369.602 | 1435.043 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 150.228 | 153.286 | 150.184 | 153.286 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1305.041 | 1334.874 | 1301.152 | 1334.874 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.122 | 0.239 | 0.092 | 0.239 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.199 | 2.693 | 2.115 | 2.693 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.039 | 0.040 | 0.031 | 0.040 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.457 | 0.567 | 0.437 | 0.567 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.682 | 18.776 | 18.184 | 18.776 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 32.983 | 33.513 | 32.824 | 33.513 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 18.696 | 18.856 | 18.685 | 18.856 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 32.766 | 33.286 | 32.443 | 33.286 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 18.912 | 19.189 | 18.903 | 19.189 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 29.654 | 29.965 | 29.526 | 29.965 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.337 | 0.339 | 0.303 | 0.339 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 2.980 | 3.071 | 2.940 | 3.071 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 150.092 | 154.499 | 149.509 | 154.499 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1300.821 | 1310.837 | 1285.791 | 1310.837 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.133 | 0.247 | 0.125 | 0.247 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.042 | 2.118 | 1.996 | 2.118 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.020 | 0.032 | 0.017 | 0.032 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.420 | 0.434 | 0.416 | 0.434 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.779 | 2.620 | 1.649 | 2.620 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 5.397 | 5.878 | 5.342 | 5.878 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 0.927 | 2.635 | 0.864 | 2.635 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.641 | 2.736 | 2.593 | 2.736 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 153.895 | 157.780 | 151.648 | 157.780 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1316.491 | 1459.994 | 1293.666 | 1459.994 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.112 | 0.133 | 0.108 | 0.133 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.239 | 2.342 | 2.226 | 2.342 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.021 | 0.029 | 0.020 | 0.029 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.591 | 0.648 | 0.572 | 0.648 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 2.935 | 5.117 | 2.376 | 5.117 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 6.838 | 7.316 | 6.757 | 7.316 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.304 | 2.082 | 1.075 | 2.082 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.694 | 2.784 | 2.659 | 2.784 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 150.649 | 160.617 | 147.951 | 160.617 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1327.929 | 1334.773 | 1316.856 | 1334.773 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.125 | 0.207 | 0.122 | 0.207 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.061 | 2.128 | 2.021 | 2.128 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.028 | 0.015 | 0.028 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.425 | 0.450 | 0.411 | 0.450 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 17.508 | 17.632 | 17.415 | 17.632 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 25.422 | 25.625 | 24.767 | 25.625 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.852 | 0.909 | 0.833 | 0.909 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.757 | 2.887 | 2.715 | 2.887 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.694 | 167.217 | 151.310 | 167.217 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1300.694 | 1304.208 | 1297.826 | 1304.208 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.127 | 0.169 | 0.119 | 0.169 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.040 | 2.119 | 1.995 | 2.119 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.028 | 0.020 | 0.028 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.411 | 0.431 | 0.406 | 0.431 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 8.774 | 8.788 | 8.451 | 8.788 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 16.347 | 16.688 | 16.058 | 16.688 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 0.854 | 1.031 | 0.822 | 1.031 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.642 | 2.773 | 2.602 | 2.773 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.254 | 164.943 | 148.242 | 164.943 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1753.931 | 1898.479 | 1373.280 | 1898.479 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.121 | 0.150 | 0.118 | 0.150 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 1.909 | 2.463 | 1.879 | 2.463 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.033 | 0.017 | 0.033 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.415 | 0.545 | 0.410 | 0.545 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.600 | 6.810 | 6.418 | 6.810 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 13.305 | 31.972 | 13.128 | 31.972 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.880 | 2.132 | 0.844 | 2.132 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.825 | 3.773 | 2.796 | 3.773 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 150.195 | 151.324 | 149.742 | 151.324 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1302.633 | 1357.026 | 1290.598 | 1357.026 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.129 | 0.141 | 0.125 | 0.141 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 1.952 | 2.072 | 1.860 | 2.072 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.032 | 0.016 | 0.032 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.422 | 0.442 | 0.404 | 0.442 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 7.677 | 8.339 | 7.566 | 8.339 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 14.819 | 15.720 | 14.431 | 15.720 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 0.856 | 2.175 | 0.853 | 2.175 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.689 | 2.853 | 2.687 | 2.853 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.316 | 154.519 | 151.125 | 154.519 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1661.777 | 1853.371 | 1320.122 | 1853.371 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.138 | 0.143 | 0.128 | 0.143 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.837 | 3.017 | 2.685 | 3.017 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.030 | 0.018 | 0.030 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.543 | 0.639 | 0.502 | 0.639 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.107 | 8.124 | 6.991 | 8.124 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 19.840 | 62.644 | 18.354 | 62.644 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.892 | 2.177 | 0.871 | 2.177 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 4.016 | 4.456 | 3.728 | 4.456 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 149.302 | 160.260 | 148.283 | 160.260 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1294.735 | 1299.351 | 1294.389 | 1299.351 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.125 | 0.178 | 0.121 | 0.178 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.039 | 2.153 | 1.989 | 2.153 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.096 | 0.022 | 0.096 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.432 | 0.455 | 0.406 | 0.455 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 15.330 | 15.423 | 15.181 | 15.423 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 22.636 | 23.592 | 22.326 | 23.592 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.825 | 0.852 | 0.822 | 0.852 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.615 | 2.723 | 2.609 | 2.723 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 151.778 | 158.731 | 151.134 | 158.731 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1287.492 | 1323.669 | 1286.666 | 1323.669 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.121 | 0.151 | 0.113 | 0.151 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.073 | 2.387 | 2.060 | 2.387 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.015 | 0.028 | 0.015 | 0.028 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.413 | 0.432 | 0.405 | 0.432 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 15.632 | 15.978 | 15.578 | 15.978 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 23.761 | 24.875 | 22.477 | 24.875 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.950 | 2.070 | 0.887 | 2.070 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.672 | 2.811 | 2.650 | 2.811 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 154.049 | 159.414 | 150.568 | 159.414 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1304.870 | 1318.801 | 1294.771 | 1318.801 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.131 | 0.142 | 0.131 | 0.142 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.305 | 2.432 | 2.299 | 2.432 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.019 | 0.020 | 0.017 | 0.020 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.450 | 0.487 | 0.449 | 0.487 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 14.931 | 15.053 | 14.878 | 15.053 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 25.392 | 26.751 | 25.376 | 26.751 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 0.773 | 0.789 | 0.740 | 0.789 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.395 | 4.332 | 3.299 | 4.332 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 153.579 | 173.213 | 151.837 | 173.213 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1316.106 | 1581.939 | 1309.878 | 1581.939 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.132 | 0.168 | 0.128 | 0.168 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.044 | 2.125 | 2.035 | 2.125 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.016 | 0.031 | 0.016 | 0.031 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.412 | 0.445 | 0.397 | 0.445 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 15.678 | 15.866 | 15.371 | 15.866 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 23.673 | 30.411 | 23.282 | 30.411 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 0.856 | 2.799 | 0.820 | 2.799 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.694 | 2.735 | 2.644 | 2.735 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 153.091 | 160.892 | 152.170 | 160.892 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1306.343 | 1373.127 | 1304.146 | 1373.127 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.141 | 0.165 | 0.123 | 0.165 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.049 | 2.097 | 1.997 | 2.097 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.020 | 0.025 | 0.015 | 0.025 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.423 | 0.453 | 0.411 | 0.453 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.502 | 6.912 | 6.051 | 6.912 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 12.992 | 15.392 | 12.373 | 15.392 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 1.016 | 2.181 | 0.973 | 2.181 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.744 | 2.929 | 2.665 | 2.929 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 154.281 | 161.049 | 152.194 | 161.049 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1292.702 | 1707.953 | 1292.569 | 1707.953 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.134 | 0.182 | 0.129 | 0.182 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.365 | 2.419 | 2.298 | 2.419 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.018 | 0.019 | 0.017 | 0.019 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.586 | 0.611 | 0.585 | 0.611 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 34.867 | 36.479 | 34.139 | 36.479 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 35.807 | 36.046 | 35.791 | 36.046 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.664 | 1.917 | 1.437 | 1.917 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.160 | 3.250 | 3.112 | 3.250 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 153.066 | 163.446 | 151.985 | 163.446 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1294.145 | 1296.152 | 1290.209 | 1296.152 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.149 | 0.177 | 0.130 | 0.177 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.127 | 2.213 | 2.076 | 2.213 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.020 | 0.023 | 0.019 | 0.023 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.445 | 0.449 | 0.443 | 0.449 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 93.614 | 94.574 | 92.798 | 94.574 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 110.354 | 117.551 | 110.071 | 117.551 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 0.932 | 2.248 | 0.706 | 2.248 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.215 | 3.428 | 3.181 | 3.428 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 172.306 | 253.544 | 169.270 | 253.544 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1299.955 | 1330.329 | 1299.341 | 1330.329 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.159 | 0.201 | 0.137 | 0.201 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.513 | 2.569 | 2.510 | 2.569 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.024 | 0.028 | 0.022 | 0.028 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.732 | 0.798 | 0.719 | 0.798 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 128.295 | 146.346 | 128.154 | 146.346 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 103.843 | 108.279 | 102.153 | 108.279 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 2.479 | 5.361 | 1.722 | 5.361 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.298 | 3.341 | 3.199 | 3.341 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 165.652 | 177.993 | 158.713 | 177.993 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1301.365 | 1372.872 | 1294.116 | 1372.872 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.140 | 0.156 | 0.135 | 0.156 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.027 | 2.139 | 1.995 | 2.139 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.017 | 0.029 | 0.014 | 0.029 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.408 | 0.463 | 0.401 | 0.463 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 6.035 | 6.149 | 5.936 | 6.149 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.133 | 14.875 | 12.344 | 14.875 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.983 | 2.057 | 0.822 | 2.057 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 2.780 | 3.063 | 2.736 | 3.063 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.581 | 156.814 | 151.096 | 156.814 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1344.969 | 1859.662 | 1301.654 | 1859.662 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.134 | 0.188 | 0.124 | 0.188 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.027 | 2.337 | 1.959 | 2.337 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.031 | 0.018 | 0.031 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.423 | 0.435 | 0.421 | 0.435 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 106.419 | 107.193 | 105.281 | 107.193 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 117.708 | 120.559 | 117.182 | 120.559 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 0.872 | 2.363 | 0.844 | 2.363 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.778 | 2.854 | 2.769 | 2.854 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 155.595 | 161.190 | 149.279 | 161.190 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1337.531 | 1378.820 | 1325.744 | 1378.820 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.126 | 0.174 | 0.125 | 0.174 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 1.962 | 2.174 | 1.910 | 2.174 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.032 | 0.015 | 0.032 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.411 | 0.445 | 0.408 | 0.445 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 14.085 | 14.735 | 13.863 | 14.735 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 19.828 | 21.106 | 19.380 | 21.106 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.911 | 2.487 | 0.850 | 2.487 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.707 | 2.795 | 2.658 | 2.795 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 152.023 | 154.785 | 150.782 | 154.785 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1313.157 | 1372.262 | 1297.782 | 1372.262 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.158 | 0.168 | 0.150 | 0.168 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.166 | 4.592 | 3.042 | 4.592 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.021 | 0.022 | 0.017 | 0.022 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.596 | 0.868 | 0.580 | 0.868 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 8.544 | 9.041 | 8.519 | 9.041 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 17.063 | 22.562 | 16.238 | 22.562 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 0.670 | 0.764 | 0.661 | 0.764 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 3.898 | 7.354 | 3.826 | 7.354 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 153.817 | 158.084 | 150.597 | 158.084 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1338.245 | 1779.895 | 1316.802 | 1779.895 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.121 | 0.144 | 0.118 | 0.144 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.116 | 2.646 | 2.005 | 2.646 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.027 | 0.018 | 0.027 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.421 | 0.444 | 0.420 | 0.444 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.324 | 6.632 | 6.138 | 6.632 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.330 | 14.487 | 12.607 | 14.487 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.848 | 2.003 | 0.848 | 2.003 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.660 | 2.708 | 2.602 | 2.708 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.333 | 185.832 | 156.555 | 185.832 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1313.873 | 1332.992 | 1298.223 | 1332.992 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.149 | 0.272 | 0.144 | 0.272 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.045 | 2.145 | 1.995 | 2.145 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.033 | 0.015 | 0.033 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.416 | 0.441 | 0.413 | 0.441 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 9.608 | 9.923 | 9.193 | 9.923 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 15.090 | 15.429 | 15.054 | 15.429 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.969 | 2.631 | 0.872 | 2.631 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.612 | 2.657 | 2.565 | 2.657 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.929 | 182.814 | 156.630 | 182.814 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1334.550 | 1512.165 | 1327.184 | 1512.165 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.207 | 0.259 | 0.187 | 0.259 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.435 | 3.622 | 3.391 | 3.622 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.035 | 0.021 | 0.035 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.627 | 0.663 | 0.619 | 0.663 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 27.095 | 27.733 | 26.686 | 27.733 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 40.289 | 41.626 | 40.270 | 41.626 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.869 | 0.929 | 0.869 | 0.929 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 4.705 | 4.788 | 4.656 | 4.788 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 154.078 | 157.612 | 153.640 | 157.612 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1290.307 | 1293.424 | 1283.256 | 1293.424 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.158 | 0.183 | 0.152 | 0.183 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.406 | 3.539 | 3.404 | 3.539 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.026 | 0.019 | 0.026 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.656 | 0.681 | 0.625 | 0.681 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 23.401 | 24.530 | 23.317 | 24.530 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 37.754 | 40.709 | 36.945 | 40.709 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.866 | 0.953 | 0.833 | 0.953 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 4.753 | 7.550 | 4.690 | 7.550 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 154.402 | 174.164 | 152.207 | 174.164 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1301.009 | 1351.937 | 1285.706 | 1351.937 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.151 | 0.178 | 0.117 | 0.178 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.066 | 2.139 | 2.012 | 2.139 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.020 | 0.038 | 0.016 | 0.038 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.424 | 0.436 | 0.424 | 0.436 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.352 | 9.242 | 8.056 | 9.242 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 15.280 | 16.434 | 14.965 | 16.434 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.960 | 2.196 | 0.813 | 2.196 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.696 | 2.784 | 2.632 | 2.784 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 161.198 | 167.533 | 152.228 | 167.533 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1294.650 | 1382.567 | 1293.598 | 1382.567 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.127 | 0.145 | 0.119 | 0.145 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.223 | 2.317 | 2.175 | 2.317 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.017 | 0.021 | 0.016 | 0.021 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.444 | 0.453 | 0.439 | 0.453 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 7.849 | 8.795 | 7.387 | 8.795 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 14.103 | 14.952 | 13.756 | 14.952 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 0.737 | 0.760 | 0.669 | 0.760 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.055 | 3.182 | 2.991 | 3.182 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 151.593 | 162.459 | 151.286 | 162.459 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1318.477 | 1354.969 | 1308.909 | 1354.969 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.132 | 0.146 | 0.127 | 0.146 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.224 | 2.300 | 2.214 | 2.300 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.019 | 0.021 | 0.016 | 0.021 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.448 | 0.486 | 0.439 | 0.486 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 9.424 | 9.949 | 9.351 | 9.949 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 16.114 | 16.874 | 15.878 | 16.874 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 0.747 | 0.788 | 0.699 | 0.788 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.021 | 3.335 | 2.969 | 3.335 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 151.532 | 157.394 | 151.487 | 157.394 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1293.891 | 1327.451 | 1288.736 | 1327.451 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.155 | 0.181 | 0.117 | 0.181 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.044 | 2.095 | 2.035 | 2.095 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.017 | 0.031 | 0.016 | 0.031 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.423 | 0.454 | 0.415 | 0.454 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 9.755 | 10.236 | 9.470 | 10.236 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 16.841 | 17.242 | 16.643 | 17.242 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.837 | 2.040 | 0.818 | 2.040 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.717 | 2.848 | 2.635 | 2.848 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 151.334 | 155.387 | 149.262 | 155.387 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1303.921 | 1313.232 | 1289.252 | 1313.232 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.121 | 0.272 | 0.120 | 0.272 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.103 | 2.170 | 2.085 | 2.170 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.019 | 0.024 | 0.019 | 0.024 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.420 | 0.431 | 0.411 | 0.431 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 7.279 | 7.991 | 7.217 | 7.991 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.020 | 14.437 | 13.904 | 14.437 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.877 | 1.961 | 0.828 | 1.961 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.675 | 2.805 | 2.653 | 2.805 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 153.534 | 155.738 | 153.084 | 155.738 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1301.590 | 1474.331 | 1295.300 | 1474.331 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.131 | 0.160 | 0.121 | 0.160 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.104 | 2.150 | 2.099 | 2.150 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.018 | 0.020 | 0.018 | 0.020 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.420 | 0.444 | 0.413 | 0.444 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 13.548 | 14.213 | 13.368 | 14.213 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 23.057 | 25.837 | 22.830 | 25.837 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 1.000 | 2.476 | 0.674 | 2.476 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.060 | 3.101 | 3.038 | 3.101 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 205.955 | 252.088 | 202.915 | 252.088 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1431.343 | 1466.050 | 1421.367 | 1466.050 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 174.308 | 193.675 | 157.282 | 193.675 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1394.042 | 1444.047 | 1374.837 | 1444.047 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.197 | 1.824 | 0.180 | 1.824 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.291 | 2.474 | 2.232 | 2.474 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.036 | 0.059 | 0.022 | 0.059 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.460 | 0.495 | 0.446 | 0.495 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.043 | 0.059 | 0.027 | 0.059 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.484 | 0.568 | 0.464 | 0.568 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.357 | 2.064 | 0.944 | 2.064 | 147.5 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 81.270 | 83.038 | 80.902 | 83.038 | 131.8 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 180.077 | 194.396 | 178.534 | 194.396 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1351.582 | 1408.657 | 1334.259 | 1408.657 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 153.878 | 170.599 | 152.338 | 170.599 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1361.076 | 1670.966 | 1328.847 | 1670.966 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.157 | 0.192 | 0.124 | 0.192 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.255 | 2.374 | 2.198 | 2.374 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.021 | 0.037 | 0.020 | 0.037 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.467 | 0.525 | 0.435 | 0.525 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.049 | 0.077 | 0.042 | 0.077 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.478 | 0.533 | 0.466 | 0.533 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.741 | 1.148 | 0.678 | 1.148 | 146.5 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 21.847 | 33.569 | 21.398 | 33.569 | 131.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 186.792 | 192.654 | 178.893 | 192.654 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1347.817 | 1356.628 | 1342.850 | 1356.628 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 152.294 | 165.999 | 150.560 | 165.999 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1332.926 | 1362.759 | 1317.187 | 1362.759 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.196 | 0.284 | 0.134 | 0.284 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.382 | 3.509 | 3.376 | 3.509 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.023 | 0.104 | 0.020 | 0.104 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.629 | 0.662 | 0.606 | 0.662 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.053 | 0.072 | 0.032 | 0.072 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.513 | 0.533 | 0.500 | 0.533 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.890 | 2.162 | 0.688 | 2.162 | 148.3 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 27.570 | 39.628 | 27.280 | 39.628 | 131.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 181.428 | 191.987 | 180.195 | 191.987 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1360.007 | 1465.321 | 1342.165 | 1465.321 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 152.826 | 157.217 | 152.594 | 157.217 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1346.696 | 1630.234 | 1330.380 | 1630.234 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.164 | 0.229 | 0.137 | 0.229 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.484 | 3.613 | 3.410 | 3.613 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.020 | 0.032 | 0.019 | 0.032 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.656 | 0.670 | 0.619 | 0.670 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.056 | 0.086 | 0.051 | 0.086 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.517 | 0.541 | 0.492 | 0.541 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.716 | 0.937 | 0.687 | 0.937 | 148.4 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 23.577 | 36.104 | 23.362 | 36.104 | 131.8 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 171.813 | 206.613 | 166.686 | 206.613 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1351.928 | 1373.215 | 1347.945 | 1373.215 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.233 | 172.691 | 154.326 | 172.691 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1337.004 | 1354.955 | 1336.232 | 1354.955 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.168 | 0.214 | 0.134 | 0.214 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.411 | 2.617 | 2.387 | 2.617 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.021 | 0.032 | 0.017 | 0.032 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.633 | 0.654 | 0.605 | 0.654 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.068 | 0.079 | 0.062 | 0.079 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.555 | 0.641 | 0.539 | 0.641 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.922 | 1.345 | 0.883 | 1.345 | 149.0 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 24.023 | 37.683 | 23.276 | 37.683 | 131.8 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 184.681 | 187.527 | 180.740 | 187.527 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1475.349 | 1818.687 | 1420.313 | 1818.687 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.122 | 160.230 | 153.580 | 160.230 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1404.419 | 1479.280 | 1384.584 | 1479.280 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.153 | 0.173 | 0.133 | 0.173 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.170 | 2.950 | 2.107 | 2.950 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.019 | 0.034 | 0.018 | 0.034 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.522 | 0.743 | 0.434 | 0.743 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.020 | 0.034 | 0.018 | 0.034 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.456 | 0.487 | 0.433 | 0.487 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.163 | 1.444 | 0.927 | 1.444 | 144.0 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 72.995 | 84.624 | 72.216 | 84.624 | 131.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 315.624 | 352.981 | 311.550 | 352.981 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1667.884 | 1681.564 | 1662.512 | 1681.564 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 184.423 | 196.369 | 181.191 | 196.369 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1566.685 | 1633.917 | 1563.841 | 1633.917 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.169 | 0.256 | 0.141 | 0.256 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.515 | 2.644 | 2.442 | 2.644 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.022 | 0.025 | 0.019 | 0.025 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.711 | 0.764 | 0.700 | 0.764 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.089 | 0.146 | 0.072 | 0.146 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.741 | 0.777 | 0.724 | 0.777 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 22.285 | 23.505 | 21.253 | 23.505 | 161.6 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 264.454 | 275.575 | 254.584 | 275.575 | 133.5 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 320.601 | 334.967 | 315.366 | 334.967 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1695.074 | 1753.133 | 1687.464 | 1753.133 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 181.051 | 189.163 | 180.230 | 189.163 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1565.667 | 1590.690 | 1549.529 | 1590.690 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.152 | 0.188 | 0.143 | 0.188 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.505 | 2.638 | 2.459 | 2.638 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.021 | 0.022 | 0.018 | 0.022 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.743 | 0.811 | 0.726 | 0.811 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.072 | 0.089 | 0.043 | 0.089 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.762 | 0.885 | 0.722 | 0.885 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 21.878 | 24.957 | 21.107 | 24.957 | 154.3 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 260.410 | 280.006 | 259.922 | 280.006 | 133.5 |
| warm-start-logistic-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 120.770 | 121.683 | 120.051 | 121.683 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-fit | python-prophet | 6 | 102.525 | 104.254 | 102.269 | 104.254 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 106.216 | 106.854 | 104.915 | 106.854 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 86.841 | 89.044 | 86.559 | 89.044 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `a3424eff3a47970f12ddc3764fae47fc2aeb41e3`
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

