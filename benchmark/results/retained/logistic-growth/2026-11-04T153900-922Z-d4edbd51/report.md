# Effect Prophet benchmark — 2026-11-04T153900-922Z-d4edbd51

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
| mcmc-logistic-explicit-floor-minmax | equivalent-posterior | passed | 6.689e-4 | 4.305e-3 | 1.363e-3 | 4.383e-3 | 3.028e-4 | 0.392 | Verified 600-draw posterior agreement under posterior-nuts-v1; posterior means and every interval bound matched Python's within their Monte Carlo allowances. |
| mcmc-logistic-rate-changes | equivalent-posterior | passed | 3.285e-2 | 1.135e-2 | 1.135e-2 | 3.979e-2 | 2.609e-4 | 0.494 | Verified 600-draw posterior agreement under posterior-nuts-v1; posterior means and every interval bound matched Python's within their Monte Carlo allowances. |

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
| mcmc-logistic-explicit-floor-minmax | 96 | 5 | 2 | 24 | 24 | 24 | 1000 | intervals | 67108864 | logistic-explicit-floor-v1:n=96:h=24:changing-capacity:weekly / c6fa262b4fd7353c7113029e7863b000afba00ec339f72dfaaa26b08a76a0f9b | docs/validation/uncertainty.md#evidence-classes |
| mcmc-logistic-rate-changes | 365 | 6 | 25 | 455 | 455 | 90 | 1000 | intervals | 67108864 | logistic-rate-changes-v1:logit=-3+6t|1.5t|4t@0.35,0.65+weekly+bounded-noise-x10:changing-capacity:n=365:h=90 / a2b86c23197e401e7531c84acd97a4af204be36a92bcf992ce229f99096fe628 | docs/validation/uncertainty.md#evidence-classes |

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
| anomalies-logistic-defaults-99 | warm-anomalies | effect-prophet | 6 | 71.449 | 72.018 | 70.186 | 72.018 | n/a |
| anomalies-logistic-defaults-99 | warm-anomalies | python-prophet | 6 | 297.086 | 313.078 | 294.118 | 313.078 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | effect-prophet | 6 | 52.266 | 53.457 | 52.000 | 53.457 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | python-prophet | 6 | 44.550 | 46.672 | 44.161 | 46.672 | n/a |
| anomalies-logistic-defaults-99 | warm-uncertainty | effect-prophet | 6 | 14.262 | 14.541 | 14.196 | 14.541 | 155.7 |
| anomalies-logistic-defaults-99 | warm-uncertainty | python-prophet | 6 | 248.016 | 262.029 | 245.850 | 262.029 | 133.8 |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.017 | 0.013 | 0.017 | 143.6 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.503 | 0.515 | 0.477 | 0.515 | 133.8 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 203.953 | 211.464 | 201.608 | 211.464 | 159.4 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1509.404 | 1825.581 | 1477.944 | 1825.581 | 133.8 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 159.465 | 163.309 | 159.168 | 163.309 | 159.6 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1459.993 | 1574.960 | 1422.912 | 1574.960 | 133.8 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.346 | 0.410 | 0.325 | 0.410 | 159.5 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.120 | 4.354 | 4.023 | 4.354 | 133.8 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.030 | 0.043 | 0.017 | 0.043 | 159.4 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.715 | 0.808 | 0.690 | 0.808 | 133.8 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 30.523 | 31.627 | 29.996 | 31.627 | 159.2 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 56.670 | 84.023 | 56.175 | 84.023 | 133.8 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 30.661 | 31.783 | 30.255 | 31.783 | 156.1 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 55.684 | 74.648 | 54.790 | 74.648 | 133.8 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 31.274 | 32.439 | 31.152 | 32.439 | 155.7 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 50.196 | 52.318 | 50.013 | 52.318 | 133.8 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.152 | 0.190 | 0.127 | 0.190 | 156.0 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 5.063 | 6.382 | 4.828 | 6.382 | 133.8 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.028 | 0.016 | 0.028 | 144.0 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.539 | 0.598 | 0.518 | 0.598 | 133.8 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 216.751 | 225.712 | 215.683 | 225.712 | 158.6 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1503.585 | 1654.480 | 1484.066 | 1654.480 | 133.8 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 160.702 | 179.151 | 159.255 | 179.151 | 158.8 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1542.959 | 1702.120 | 1469.099 | 1702.120 | 133.8 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.338 | 0.611 | 0.315 | 0.611 | 158.6 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.285 | 5.172 | 4.095 | 5.172 | 133.8 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.029 | 0.049 | 0.019 | 0.049 | 158.6 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.725 | 0.786 | 0.699 | 0.786 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 42.712 | 43.258 | 42.562 | 43.258 | 158.5 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 66.420 | 70.295 | 64.465 | 70.295 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 42.813 | 43.060 | 42.574 | 43.060 | 155.3 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 64.830 | 72.132 | 63.743 | 72.132 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 43.728 | 45.368 | 43.369 | 45.368 | 155.0 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 62.292 | 63.225 | 60.331 | 63.225 | 133.8 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.154 | 0.165 | 0.139 | 0.165 | 155.1 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.942 | 5.235 | 4.832 | 5.235 | 133.8 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.020 | 0.026 | 0.016 | 0.026 | 140.0 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.508 | 0.516 | 0.492 | 0.516 | 147.6 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 211.268 | 218.837 | 209.739 | 218.837 | 158.1 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1669.347 | 1852.226 | 1630.475 | 1852.226 | 147.6 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 163.208 | 192.343 | 162.319 | 192.343 | 169.7 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1662.927 | 1790.919 | 1645.651 | 1790.919 | 147.6 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 1.197 | 1.285 | 1.039 | 1.285 | 167.1 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.032 | 4.402 | 3.977 | 4.402 | 147.6 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.132 | 0.179 | 0.119 | 0.179 | 158.3 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.693 | 0.788 | 0.671 | 0.788 | 147.6 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.485 | 31.831 | 31.136 | 31.831 | 158.0 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 59.870 | 64.902 | 59.267 | 64.902 | 147.6 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 32.227 | 32.557 | 31.233 | 32.557 | 156.8 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 59.170 | 60.723 | 58.672 | 60.723 | 147.6 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 31.566 | 32.969 | 31.070 | 32.969 | 150.6 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 54.052 | 55.400 | 53.375 | 55.400 | 147.6 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.205 | 0.249 | 0.197 | 0.249 | 150.8 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.644 | 5.759 | 5.579 | 5.759 | 147.6 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.020 | 0.028 | 0.016 | 0.028 | 140.3 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.501 | 0.967 | 0.479 | 0.967 | 147.6 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 232.084 | 253.166 | 222.667 | 253.166 | 157.6 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1703.112 | 1751.436 | 1688.933 | 1751.436 | 147.6 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 164.016 | 187.538 | 162.687 | 187.538 | 168.0 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1642.832 | 1815.884 | 1601.592 | 1815.884 | 147.6 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 1.161 | 1.270 | 1.145 | 1.270 | 165.2 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.065 | 4.316 | 4.005 | 4.316 | 147.6 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.126 | 0.159 | 0.103 | 0.159 | 157.6 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.773 | 0.826 | 0.739 | 0.826 | 147.6 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 44.374 | 45.922 | 44.234 | 45.922 | 157.5 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 68.246 | 71.077 | 67.893 | 71.077 | 147.6 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 44.108 | 44.420 | 43.357 | 44.420 | 156.2 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 67.767 | 71.237 | 67.369 | 71.237 | 147.6 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.249 | 49.213 | 43.867 | 49.213 | 152.0 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 61.732 | 67.921 | 61.249 | 67.921 | 147.6 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.224 | 0.287 | 0.208 | 0.287 | 152.0 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 5.785 | 5.882 | 5.661 | 5.882 | 147.6 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 17.947 | 18.292 | 17.798 | 18.292 | 144.6 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 63.313 | 65.528 | 63.010 | 65.528 | 133.8 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 15.205 | 18.044 | 14.145 | 18.044 | 156.6 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 56.818 | 57.415 | 56.754 | 57.415 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.395 | 1.677 | 1.258 | 1.677 | 157.1 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 12.482 | 12.802 | 12.477 | 12.802 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.349 | 0.381 | 0.347 | 0.381 | 150.7 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 4.962 | 4.985 | 4.948 | 4.985 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 1.652 | 1.760 | 1.592 | 1.760 | 157.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 5.346 | 6.348 | 5.285 | 6.348 | 133.8 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.445 | 2.320 | 0.433 | 2.320 | 150.5 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.430 | 5.672 | 5.333 | 5.672 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-point-processes | python-prophet | 4 | 1557.758 | 1667.574 | 1520.346 | 1667.574 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-point-threads | python-prophet | 4 | 163.717 | 166.375 | 159.205 | 166.375 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-point | effect-prophet | 4 | 60.865 | 62.200 | 60.640 | 62.200 | 155.7 |
| evaluation-logistic-large-parallel | evaluation-point | python-prophet | 4 | 168.460 | 194.907 | 165.172 | 194.907 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-search-processes | python-prophet | 4 | 4536.777 | 4726.508 | 4512.235 | 4726.508 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-search-threads | python-prophet | 4 | 525.760 | 564.674 | 520.098 | 564.674 | 133.8 |
| evaluation-logistic-large-parallel | evaluation-search | effect-prophet | 4 | 170.197 | 176.384 | 169.891 | 176.384 | 195.7 |
| evaluation-logistic-large-parallel | evaluation-search | python-prophet | 4 | 525.258 | 553.588 | 505.190 | 553.588 | 133.8 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 185.562 | 190.613 | 183.830 | 190.613 | 156.2 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1436.873 | 1464.335 | 1431.839 | 1464.335 | 133.8 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.291 | 2.765 | 2.260 | 2.765 | 156.1 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.318 | 1.352 | 1.286 | 1.352 | 133.8 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.030 | 0.041 | 0.029 | 0.041 | 133.9 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.488 | 0.590 | 0.437 | 0.590 | 133.8 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.062 | 0.087 | 0.062 | 0.087 | 155.5 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.257 | 5.454 | 5.247 | 5.454 | 133.8 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.546 | 1.732 | 1.210 | 1.732 | 138.6 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.725 | 0.752 | 0.717 | 0.752 | 133.8 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 13.921 | 14.082 | 13.471 | 14.082 | 152.9 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 41.608 | 45.083 | 41.173 | 45.083 | 133.8 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 191.959 | 192.793 | 188.380 | 192.793 | 158.9 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1476.501 | 1483.022 | 1451.177 | 1483.022 | 133.8 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.016 | 1.088 | 0.972 | 1.088 | 158.8 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.799 | 0.812 | 0.751 | 0.812 | 133.8 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.010 | 0.010 | 0.010 | 0.010 | 132.2 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.407 | 0.444 | 0.359 | 0.444 | 133.8 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.103 | 1.480 | 0.054 | 1.480 | 158.6 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.233 | 5.289 | 5.199 | 5.289 | 133.8 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 0.983 | 1.037 | 0.911 | 1.037 | 135.3 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.530 | 0.555 | 0.508 | 0.555 | 133.8 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 17.016 | 17.433 | 16.926 | 17.433 | 152.9 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 59.107 | 61.377 | 59.002 | 61.377 | 133.8 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.356 | 17.542 | 17.257 | 17.542 | 162.0 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 31.179 | 34.591 | 29.849 | 34.591 | 133.8 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.188 | 0.195 | 0.174 | 0.195 | 162.6 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.007 | 0.004 | 0.007 | 133.8 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.216 | 0.247 | 0.209 | 0.247 | 162.1 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.007 | 0.010 | 133.8 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 34.828 | 38.101 | 34.310 | 38.101 | 158.4 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 120.314 | 127.504 | 114.342 | 127.504 | 133.8 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.044 | 0.057 | 0.042 | 0.057 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.535 | 0.862 | 0.517 | 0.862 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 190.682 | 195.519 | 190.035 | 195.519 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1571.741 | 1609.868 | 1490.211 | 1609.868 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.479 | 178.609 | 157.915 | 178.609 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1529.381 | 1570.591 | 1525.770 | 1570.591 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.093 | 0.104 | 0.086 | 0.104 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.649 | 2.806 | 2.586 | 2.806 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.071 | 0.034 | 0.071 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.535 | 0.640 | 0.516 | 0.640 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 21.372 | 22.132 | 21.187 | 22.132 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 39.720 | 41.226 | 37.840 | 41.226 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 21.156 | 22.841 | 21.010 | 22.841 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 36.781 | 41.525 | 36.414 | 41.525 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.728 | 22.030 | 21.301 | 22.030 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 36.117 | 49.847 | 35.179 | 49.847 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.260 | 0.305 | 0.260 | 0.305 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.881 | 4.127 | 3.790 | 4.127 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.051 | 0.060 | 0.044 | 0.060 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.506 | 0.537 | 0.503 | 0.537 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 191.434 | 194.714 | 185.717 | 194.714 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1474.396 | 1553.503 | 1471.870 | 1553.503 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.357 | 163.064 | 157.850 | 163.064 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1510.831 | 1574.749 | 1465.674 | 1574.749 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.112 | 0.135 | 0.093 | 0.135 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.509 | 2.563 | 2.481 | 2.563 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.032 | 0.050 | 0.030 | 0.050 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.492 | 0.524 | 0.484 | 0.524 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.830 | 18.248 | 17.751 | 18.248 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 32.404 | 35.133 | 31.169 | 35.133 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 17.431 | 17.954 | 17.312 | 17.954 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 30.600 | 30.863 | 30.587 | 30.863 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 18.248 | 18.770 | 18.023 | 18.770 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.920 | 27.429 | 26.742 | 27.429 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.279 | 0.291 | 0.258 | 0.291 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.563 | 3.787 | 3.555 | 3.787 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.019 | 0.046 | 0.015 | 0.046 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.544 | 0.597 | 0.537 | 0.597 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 188.875 | 198.853 | 188.710 | 198.853 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1581.369 | 1656.215 | 1578.978 | 1656.215 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 157.288 | 161.237 | 155.020 | 161.237 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1594.917 | 1624.364 | 1558.211 | 1624.364 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.105 | 0.162 | 0.098 | 0.162 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.554 | 2.702 | 2.531 | 2.702 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.037 | 0.047 | 0.031 | 0.047 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.504 | 0.555 | 0.483 | 0.555 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.474 | 18.587 | 18.461 | 18.587 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 35.577 | 40.107 | 34.816 | 40.107 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 18.781 | 19.155 | 18.739 | 19.155 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 35.720 | 46.901 | 34.838 | 46.901 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 18.848 | 19.171 | 18.806 | 19.171 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 31.777 | 32.236 | 31.322 | 32.236 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.303 | 0.336 | 0.289 | 0.336 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.545 | 7.084 | 3.367 | 7.084 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.020 | 0.026 | 0.015 | 0.026 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.484 | 0.510 | 0.480 | 0.510 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 188.883 | 209.256 | 187.892 | 209.256 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1464.000 | 1523.468 | 1463.164 | 1523.468 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 158.739 | 161.096 | 156.935 | 161.096 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1426.591 | 1460.601 | 1422.698 | 1460.601 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.097 | 0.130 | 0.092 | 0.130 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.343 | 2.590 | 2.266 | 2.590 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.034 | 0.046 | 0.033 | 0.046 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.438 | 0.453 | 0.428 | 0.453 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.492 | 19.147 | 18.417 | 19.147 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 33.258 | 34.252 | 32.883 | 34.252 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 18.755 | 21.406 | 18.595 | 21.406 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 32.810 | 33.826 | 32.606 | 33.826 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.179 | 19.977 | 18.857 | 19.977 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 29.041 | 29.920 | 28.943 | 29.920 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.345 | 0.405 | 0.338 | 0.405 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.289 | 3.338 | 3.231 | 3.338 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.070 | 1.295 | 0.053 | 1.295 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.598 | 0.610 | 0.597 | 0.610 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 178.009 | 192.283 | 175.177 | 192.283 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1475.319 | 1489.824 | 1445.761 | 1489.824 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 169.876 | 175.821 | 163.148 | 175.821 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1442.728 | 1484.094 | 1422.859 | 1484.094 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.101 | 0.125 | 0.098 | 0.125 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.678 | 3.027 | 2.537 | 3.027 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.030 | 0.032 | 0.027 | 0.032 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.662 | 0.717 | 0.632 | 0.717 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.149 | 5.010 | 4.035 | 5.010 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 14.746 | 18.886 | 14.202 | 18.886 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 4.325 | 5.360 | 4.322 | 5.360 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 15.846 | 23.253 | 14.602 | 23.253 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.271 | 6.291 | 4.176 | 6.291 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 10.313 | 11.279 | 9.988 | 11.279 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.407 | 0.539 | 0.403 | 0.539 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.310 | 3.438 | 3.293 | 3.438 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.020 | 0.014 | 0.020 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.556 | 0.581 | 0.518 | 0.581 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 188.829 | 191.405 | 188.765 | 191.405 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1602.846 | 1706.114 | 1572.285 | 1706.114 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 162.208 | 172.953 | 161.837 | 172.953 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1554.808 | 1657.071 | 1531.647 | 1657.071 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.124 | 0.136 | 0.122 | 0.136 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.774 | 3.185 | 2.771 | 3.185 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.031 | 0.040 | 0.027 | 0.040 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.487 | 0.576 | 0.475 | 0.576 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.176 | 20.517 | 20.132 | 20.517 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 39.694 | 40.796 | 39.669 | 40.796 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.331 | 22.131 | 20.239 | 22.131 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 38.728 | 39.203 | 38.529 | 39.203 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.747 | 21.368 | 20.426 | 21.368 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 35.923 | 54.702 | 34.669 | 54.702 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.311 | 0.443 | 0.304 | 0.443 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.555 | 4.511 | 3.424 | 4.511 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 160.672 | 188.352 | 158.131 | 188.352 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1518.716 | 1614.579 | 1513.580 | 1614.579 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.145 | 0.238 | 0.132 | 0.238 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.554 | 2.848 | 2.430 | 2.848 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.022 | 0.030 | 0.021 | 0.030 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.474 | 0.769 | 0.459 | 0.769 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 1.741 | 1.911 | 1.739 | 1.911 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 6.590 | 8.105 | 5.789 | 8.105 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 1.089 | 2.698 | 0.623 | 2.698 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 3.118 | 4.424 | 3.001 | 4.424 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 161.974 | 163.374 | 158.520 | 163.374 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1433.476 | 1537.055 | 1420.752 | 1537.055 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.120 | 0.140 | 0.111 | 0.140 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.520 | 2.597 | 2.489 | 2.597 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.020 | 0.039 | 0.016 | 0.039 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.628 | 0.645 | 0.617 | 0.645 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 2.618 | 4.971 | 2.606 | 4.971 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.128 | 8.802 | 7.122 | 8.802 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.269 | 1.892 | 1.255 | 1.892 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 3.023 | 3.192 | 3.009 | 3.192 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.655 | 162.079 | 157.812 | 162.079 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1507.541 | 2348.322 | 1447.048 | 2348.322 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.165 | 0.120 | 0.165 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.261 | 2.320 | 2.207 | 2.320 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.112 | 0.017 | 0.112 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.443 | 0.460 | 0.423 | 0.460 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 18.956 | 19.041 | 18.902 | 19.041 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 28.194 | 30.638 | 27.844 | 30.638 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.883 | 2.188 | 0.864 | 2.188 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.983 | 3.006 | 2.967 | 3.006 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 158.678 | 170.178 | 155.690 | 170.178 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1661.417 | 1895.319 | 1619.098 | 1895.319 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.128 | 0.150 | 0.123 | 0.150 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.251 | 2.349 | 2.234 | 2.349 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.025 | 0.037 | 0.016 | 0.037 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.446 | 0.457 | 0.436 | 0.457 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 9.205 | 10.189 | 9.201 | 10.189 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 18.167 | 20.214 | 17.328 | 20.214 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 1.109 | 2.054 | 0.862 | 2.054 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.994 | 3.024 | 2.979 | 3.024 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 159.095 | 172.377 | 158.810 | 172.377 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1426.916 | 1455.436 | 1426.178 | 1455.436 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.139 | 0.153 | 0.121 | 0.153 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.119 | 2.176 | 2.084 | 2.176 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.028 | 0.018 | 0.028 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.441 | 0.465 | 0.435 | 0.465 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 6.867 | 7.135 | 6.808 | 7.135 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 12.866 | 13.521 | 12.739 | 13.521 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 0.838 | 2.014 | 0.825 | 2.014 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 2.930 | 3.026 | 2.908 | 3.026 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.011 | 160.163 | 158.793 | 160.163 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1524.600 | 1964.066 | 1424.329 | 1964.066 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.138 | 0.156 | 0.134 | 0.156 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.073 | 2.382 | 2.044 | 2.382 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.036 | 0.018 | 0.036 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.454 | 0.466 | 0.417 | 0.466 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.366 | 8.592 | 8.166 | 8.592 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 16.376 | 18.459 | 15.497 | 18.459 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 1.021 | 2.055 | 0.966 | 2.055 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 2.968 | 3.473 | 2.864 | 3.473 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.160 | 159.605 | 158.048 | 159.605 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1533.560 | 1902.295 | 1461.299 | 1902.295 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.119 | 0.154 | 0.114 | 0.154 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.384 | 2.962 | 2.290 | 2.962 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.016 | 0.034 | 0.016 | 0.034 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.494 | 0.521 | 0.473 | 0.521 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 7.794 | 7.980 | 7.643 | 7.980 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 17.019 | 17.733 | 15.993 | 17.733 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 0.870 | 0.891 | 0.851 | 0.891 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 3.485 | 4.399 | 3.395 | 4.399 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 159.721 | 160.795 | 155.226 | 160.795 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1437.211 | 1488.136 | 1425.546 | 1488.136 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.139 | 0.150 | 0.118 | 0.150 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.241 | 2.311 | 2.210 | 2.311 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.022 | 0.016 | 0.022 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.432 | 0.467 | 0.420 | 0.467 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 16.727 | 17.906 | 16.540 | 17.906 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 24.354 | 25.594 | 24.312 | 25.594 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 0.901 | 1.954 | 0.840 | 1.954 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 2.889 | 2.933 | 2.837 | 2.933 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 156.749 | 160.272 | 156.362 | 160.272 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1468.860 | 1490.311 | 1444.406 | 1490.311 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.134 | 0.139 | 0.133 | 0.139 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.259 | 3.030 | 2.234 | 3.030 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.019 | 0.029 | 0.018 | 0.029 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.453 | 0.493 | 0.438 | 0.493 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 16.963 | 17.166 | 16.793 | 17.166 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 26.177 | 28.351 | 26.106 | 28.351 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.922 | 2.714 | 0.649 | 2.714 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.960 | 3.837 | 2.886 | 3.837 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 161.556 | 167.096 | 161.035 | 167.096 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1515.863 | 1627.088 | 1495.093 | 1627.088 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.136 | 0.156 | 0.134 | 0.156 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.413 | 2.515 | 2.396 | 2.515 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.017 | 0.021 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.463 | 0.527 | 0.436 | 0.527 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 16.675 | 17.659 | 16.409 | 17.659 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 29.504 | 30.462 | 29.296 | 30.462 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 0.744 | 0.847 | 0.744 | 0.847 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.658 | 5.378 | 3.641 | 5.378 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 158.117 | 167.830 | 156.816 | 167.830 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1411.843 | 1460.645 | 1398.871 | 1460.645 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.128 | 0.156 | 0.122 | 0.156 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.150 | 2.638 | 2.125 | 2.638 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.016 | 0.023 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.408 | 0.477 | 0.400 | 0.477 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 16.904 | 17.644 | 16.558 | 17.644 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 24.900 | 26.348 | 24.687 | 26.348 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 1.081 | 2.320 | 0.639 | 2.320 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.827 | 2.862 | 2.801 | 2.862 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 159.062 | 162.322 | 158.157 | 162.322 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1425.844 | 1454.848 | 1398.809 | 1454.848 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.123 | 0.144 | 0.123 | 0.144 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.193 | 2.227 | 2.167 | 2.227 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.017 | 0.034 | 0.015 | 0.034 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.414 | 0.439 | 0.407 | 0.439 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.299 | 6.755 | 6.277 | 6.755 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.665 | 15.688 | 13.501 | 15.688 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 0.969 | 2.112 | 0.863 | 2.112 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.812 | 2.830 | 2.780 | 2.830 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 162.495 | 164.728 | 162.442 | 164.728 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1446.290 | 1486.371 | 1422.755 | 1486.371 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.132 | 0.182 | 0.131 | 0.182 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.699 | 2.989 | 2.615 | 2.989 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.019 | 0.026 | 0.016 | 0.026 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.652 | 0.716 | 0.650 | 0.716 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 38.452 | 40.218 | 37.277 | 40.218 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 41.594 | 43.623 | 39.595 | 43.623 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.824 | 2.127 | 1.822 | 2.127 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.590 | 4.572 | 3.558 | 4.572 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 161.002 | 175.598 | 159.899 | 175.598 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1500.120 | 1580.927 | 1414.433 | 1580.927 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.148 | 0.200 | 0.134 | 0.200 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.467 | 2.920 | 2.380 | 2.920 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.021 | 0.035 | 0.019 | 0.035 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.468 | 0.562 | 0.453 | 0.562 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 101.843 | 103.498 | 101.370 | 103.498 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 124.567 | 129.598 | 122.456 | 129.598 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 0.985 | 2.749 | 0.723 | 2.749 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.512 | 5.173 | 3.436 | 5.173 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 167.577 | 197.250 | 164.095 | 197.250 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1456.986 | 1595.897 | 1432.709 | 1595.897 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.148 | 0.226 | 0.130 | 0.226 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.721 | 2.849 | 2.704 | 2.849 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.023 | 0.046 | 0.019 | 0.046 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.752 | 0.776 | 0.748 | 0.776 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 133.385 | 133.670 | 132.565 | 133.670 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 112.680 | 113.595 | 112.263 | 113.595 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.661 | 2.052 | 1.572 | 2.052 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.511 | 3.777 | 3.470 | 3.777 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 158.410 | 169.761 | 155.203 | 169.761 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1440.526 | 1533.720 | 1405.374 | 1533.720 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.126 | 0.151 | 0.121 | 0.151 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.219 | 2.241 | 2.167 | 2.241 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.021 | 0.030 | 0.017 | 0.030 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.422 | 0.453 | 0.421 | 0.453 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 5.923 | 6.017 | 5.872 | 6.017 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.548 | 14.916 | 12.962 | 14.916 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.853 | 0.918 | 0.846 | 0.918 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 3.034 | 3.108 | 2.973 | 3.108 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.656 | 166.675 | 157.224 | 166.675 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1576.198 | 1619.242 | 1534.498 | 1619.242 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.135 | 0.154 | 0.126 | 0.154 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.121 | 2.925 | 2.099 | 2.925 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.027 | 0.016 | 0.027 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.470 | 0.505 | 0.446 | 0.505 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 115.716 | 116.290 | 114.773 | 116.290 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 131.628 | 134.419 | 130.224 | 134.419 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 1.131 | 2.340 | 0.852 | 2.340 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 3.175 | 3.945 | 3.080 | 3.945 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.107 | 174.772 | 158.246 | 174.772 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1447.766 | 1690.180 | 1436.953 | 1690.180 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.136 | 0.201 | 0.118 | 0.201 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.110 | 2.188 | 2.041 | 2.188 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.017 | 0.023 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.439 | 0.466 | 0.430 | 0.466 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 15.156 | 15.778 | 15.123 | 15.778 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 20.252 | 20.712 | 19.890 | 20.712 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 0.939 | 2.010 | 0.814 | 2.010 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.951 | 2.979 | 2.946 | 2.979 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 162.038 | 176.988 | 161.119 | 176.988 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1481.156 | 1520.077 | 1454.485 | 1520.077 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.158 | 0.187 | 0.154 | 0.187 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.965 | 4.833 | 3.738 | 4.833 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.016 | 0.021 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.692 | 0.760 | 0.665 | 0.760 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.380 | 9.511 | 9.336 | 9.511 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 21.551 | 52.721 | 19.597 | 52.721 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 0.703 | 0.728 | 0.666 | 0.728 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.634 | 5.694 | 4.308 | 5.694 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 158.403 | 160.614 | 157.856 | 160.614 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1457.363 | 1553.006 | 1442.026 | 1553.006 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.131 | 0.164 | 0.121 | 0.164 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.186 | 2.547 | 2.169 | 2.547 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.030 | 0.015 | 0.030 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.438 | 0.913 | 0.419 | 0.913 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.458 | 7.154 | 6.376 | 7.154 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 15.701 | 17.744 | 14.155 | 17.744 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.684 | 2.558 | 0.670 | 2.558 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.882 | 4.160 | 2.836 | 4.160 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 178.948 | 185.211 | 175.730 | 185.211 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1421.895 | 1557.733 | 1400.187 | 1557.733 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.185 | 0.123 | 0.185 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.363 | 2.624 | 2.159 | 2.624 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.027 | 0.019 | 0.027 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.437 | 0.626 | 0.410 | 0.626 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.384 | 10.797 | 10.083 | 10.797 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 16.491 | 17.625 | 15.964 | 17.625 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 1.051 | 2.497 | 0.631 | 2.497 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.083 | 3.740 | 2.766 | 3.740 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 163.306 | 165.884 | 162.895 | 165.884 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1459.386 | 1472.161 | 1456.082 | 1472.161 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.167 | 0.178 | 0.166 | 0.178 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.745 | 3.826 | 3.708 | 3.826 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.024 | 0.028 | 0.022 | 0.028 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.651 | 0.694 | 0.647 | 0.694 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 28.225 | 28.992 | 28.081 | 28.992 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 43.742 | 46.187 | 42.977 | 46.187 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.909 | 0.954 | 0.898 | 0.954 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 5.165 | 5.251 | 5.155 | 5.251 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 173.189 | 182.240 | 164.748 | 182.240 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1434.007 | 1464.910 | 1420.518 | 1464.910 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.194 | 0.234 | 0.166 | 0.234 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.756 | 4.223 | 3.716 | 4.223 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.026 | 0.029 | 0.021 | 0.029 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.685 | 0.792 | 0.675 | 0.792 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 28.061 | 29.968 | 26.722 | 29.968 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 39.672 | 40.539 | 39.337 | 40.539 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.912 | 1.078 | 0.890 | 1.078 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.231 | 5.486 | 5.220 | 5.486 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 159.113 | 161.225 | 157.523 | 161.225 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1437.208 | 1487.122 | 1404.214 | 1487.122 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.143 | 0.159 | 0.136 | 0.159 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.227 | 3.263 | 2.200 | 3.263 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.017 | 0.032 | 0.015 | 0.032 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.435 | 0.498 | 0.410 | 0.498 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 8.937 | 9.177 | 8.813 | 9.177 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 16.397 | 19.540 | 15.703 | 19.540 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 0.938 | 2.293 | 0.914 | 2.293 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.899 | 4.402 | 2.799 | 4.402 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 161.608 | 163.369 | 160.528 | 163.369 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1433.194 | 1463.259 | 1408.004 | 1463.259 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.132 | 0.154 | 0.127 | 0.154 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.435 | 2.512 | 2.417 | 2.512 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.018 | 0.020 | 0.016 | 0.020 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.473 | 0.509 | 0.457 | 0.509 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 8.140 | 8.404 | 8.139 | 8.404 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 15.686 | 16.298 | 15.184 | 16.298 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 0.697 | 0.782 | 0.691 | 0.782 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.337 | 3.565 | 3.274 | 3.565 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 160.364 | 162.344 | 159.151 | 162.344 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1429.401 | 1648.534 | 1419.092 | 1648.534 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.128 | 0.156 | 0.128 | 0.156 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.437 | 3.346 | 2.378 | 3.346 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.018 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.509 | 0.538 | 0.448 | 0.538 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 10.346 | 10.570 | 10.082 | 10.570 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 17.272 | 17.952 | 16.761 | 17.952 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 0.733 | 0.750 | 0.706 | 0.750 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.325 | 12.769 | 3.288 | 12.769 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 157.836 | 161.209 | 156.050 | 161.209 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1426.226 | 1523.230 | 1422.370 | 1523.230 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.135 | 0.148 | 0.118 | 0.148 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.204 | 2.264 | 2.133 | 2.264 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.020 | 0.028 | 0.018 | 0.028 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.424 | 0.466 | 0.407 | 0.466 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.456 | 10.581 | 10.455 | 10.581 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 17.924 | 18.082 | 17.696 | 18.082 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.872 | 1.973 | 0.851 | 1.973 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.850 | 2.893 | 2.828 | 2.893 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 157.496 | 159.699 | 156.105 | 159.699 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1412.839 | 1419.315 | 1399.378 | 1419.315 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.128 | 0.139 | 0.126 | 0.139 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.186 | 2.218 | 2.171 | 2.218 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.022 | 0.029 | 0.017 | 0.029 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.410 | 0.459 | 0.400 | 0.459 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 7.745 | 7.944 | 7.697 | 7.944 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.554 | 15.592 | 14.501 | 15.592 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.846 | 2.301 | 0.844 | 2.301 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.837 | 2.958 | 2.803 | 2.958 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 167.559 | 175.976 | 167.396 | 175.976 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1440.962 | 1507.715 | 1408.943 | 1507.715 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.143 | 0.223 | 0.136 | 0.223 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.351 | 2.866 | 2.272 | 2.866 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.018 | 0.021 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.440 | 0.509 | 0.430 | 0.509 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 15.443 | 16.879 | 15.067 | 16.879 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 24.904 | 29.796 | 24.490 | 29.796 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 0.945 | 2.674 | 0.686 | 2.674 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.377 | 4.484 | 3.305 | 4.484 | n/a |
| mcmc-logistic-explicit-floor-minmax | fresh-process-restored-uncertainty | effect-prophet | 6 | 184.577 | 231.963 | 174.778 | 231.963 | n/a |
| mcmc-logistic-explicit-floor-minmax | fresh-process-restored-uncertainty | python-prophet | 6 | 1693.998 | 1776.054 | 1638.969 | 1776.054 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 6 | 2.529 | 2.788 | 1.681 | 2.788 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-decode | python-prophet | 6 | 8.634 | 9.672 | 8.426 | 9.672 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 6 | 0.266 | 1.603 | 0.232 | 1.603 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-encode | python-prophet | 6 | 13.284 | 13.893 | 12.946 | 13.893 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-fit | effect-prophet | 6 | 1811.105 | 1834.110 | 1803.719 | 1834.110 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-fit | python-prophet | 6 | 470.897 | 489.594 | 453.958 | 489.594 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-predict | effect-prophet | 6 | 0.296 | 0.692 | 0.254 | 0.692 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-predict | python-prophet | 6 | 4.699 | 5.937 | 4.006 | 5.937 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-uncertainty | effect-prophet | 6 | 2.844 | 3.516 | 2.771 | 3.516 | 173.1 |
| mcmc-logistic-explicit-floor-minmax | warm-uncertainty | python-prophet | 6 | 219.036 | 233.969 | 205.511 | 233.969 | 133.8 |
| mcmc-logistic-rate-changes | fresh-process-restored-uncertainty | effect-prophet | 6 | 251.188 | 312.074 | 239.020 | 312.074 | n/a |
| mcmc-logistic-rate-changes | fresh-process-restored-uncertainty | python-prophet | 6 | 1873.839 | 2122.120 | 1814.849 | 2122.120 | n/a |
| mcmc-logistic-rate-changes | model-json-decode | effect-prophet | 6 | 5.177 | 6.932 | 4.702 | 6.932 | n/a |
| mcmc-logistic-rate-changes | model-json-decode | python-prophet | 6 | 23.994 | 25.263 | 23.232 | 25.263 | n/a |
| mcmc-logistic-rate-changes | model-json-encode | effect-prophet | 6 | 0.674 | 0.772 | 0.651 | 0.772 | n/a |
| mcmc-logistic-rate-changes | model-json-encode | python-prophet | 6 | 45.758 | 46.829 | 44.750 | 46.829 | n/a |
| mcmc-logistic-rate-changes | warm-fit | effect-prophet | 6 | 31636.016 | 31987.699 | 31590.290 | 31987.699 | n/a |
| mcmc-logistic-rate-changes | warm-fit | python-prophet | 6 | 6955.257 | 7035.894 | 6874.690 | 7035.894 | n/a |
| mcmc-logistic-rate-changes | warm-predict | effect-prophet | 6 | 3.509 | 8.752 | 1.637 | 8.752 | n/a |
| mcmc-logistic-rate-changes | warm-predict | python-prophet | 6 | 5.941 | 6.888 | 5.198 | 6.888 | n/a |
| mcmc-logistic-rate-changes | warm-uncertainty | effect-prophet | 6 | 37.364 | 38.397 | 37.245 | 38.397 | 149.9 |
| mcmc-logistic-rate-changes | warm-uncertainty | python-prophet | 6 | 361.150 | 378.866 | 349.276 | 378.866 | 151.1 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 191.233 | 269.531 | 186.204 | 269.531 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1526.839 | 1574.394 | 1522.783 | 1574.394 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.796 | 174.105 | 156.185 | 174.105 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1500.995 | 1642.225 | 1488.405 | 1642.225 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.160 | 0.246 | 0.129 | 0.246 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.463 | 2.635 | 2.385 | 2.635 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.031 | 0.045 | 0.025 | 0.045 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.473 | 0.480 | 0.463 | 0.480 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.068 | 0.038 | 0.068 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.493 | 0.510 | 0.481 | 0.510 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.256 | 2.338 | 1.049 | 2.338 | 147.3 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 90.392 | 90.849 | 89.653 | 90.849 | 133.8 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 190.310 | 196.419 | 188.850 | 196.419 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1462.929 | 1517.324 | 1458.773 | 1517.324 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 161.955 | 174.146 | 159.110 | 174.146 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1436.276 | 1454.766 | 1421.558 | 1454.766 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.157 | 0.197 | 0.126 | 0.197 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.602 | 2.778 | 2.535 | 2.778 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.023 | 1.520 | 0.020 | 1.520 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.481 | 2.845 | 0.456 | 2.845 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.042 | 0.061 | 0.029 | 0.061 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.528 | 0.732 | 0.493 | 0.732 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.681 | 1.661 | 0.676 | 1.661 | 143.9 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 26.301 | 38.607 | 23.955 | 38.607 | 133.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 192.178 | 207.821 | 191.318 | 207.821 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1455.560 | 1520.029 | 1451.927 | 1520.029 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.639 | 175.360 | 161.412 | 175.360 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1456.137 | 1501.765 | 1438.618 | 1501.765 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.222 | 0.277 | 0.136 | 0.277 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.947 | 4.586 | 3.782 | 4.586 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.028 | 0.038 | 0.027 | 0.038 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.682 | 0.793 | 0.645 | 0.793 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.061 | 0.091 | 0.048 | 0.091 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.537 | 0.568 | 0.512 | 0.568 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.727 | 1.807 | 0.673 | 1.807 | 147.4 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 30.264 | 42.627 | 29.674 | 42.627 | 133.8 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 205.829 | 227.270 | 200.284 | 227.270 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1455.637 | 1507.467 | 1444.494 | 1507.467 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 171.113 | 189.118 | 161.803 | 189.118 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1427.129 | 1512.532 | 1423.134 | 1512.532 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.194 | 0.235 | 0.155 | 0.235 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 4.133 | 4.437 | 3.679 | 4.437 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.037 | 0.161 | 0.023 | 0.161 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.731 | 0.986 | 0.713 | 0.986 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.063 | 0.075 | 0.049 | 0.075 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.505 | 0.521 | 0.493 | 0.521 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 1.315 | 1.807 | 0.868 | 1.807 | 146.1 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 25.103 | 37.881 | 24.770 | 37.881 | 133.8 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 170.458 | 179.491 | 168.932 | 179.491 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1513.090 | 1883.316 | 1495.203 | 1883.316 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 160.418 | 162.970 | 158.249 | 162.970 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1498.579 | 1639.359 | 1490.017 | 1639.359 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.143 | 0.149 | 0.142 | 0.149 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.975 | 3.504 | 2.749 | 3.504 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.026 | 0.036 | 0.019 | 0.036 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.670 | 0.834 | 0.628 | 0.834 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.051 | 1.098 | 0.039 | 1.098 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.580 | 0.650 | 0.562 | 0.650 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 1.010 | 1.258 | 0.963 | 1.258 | 142.6 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 27.998 | 44.437 | 25.259 | 44.437 | 133.8 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 190.285 | 200.555 | 186.547 | 200.555 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1544.607 | 1607.307 | 1520.738 | 1607.307 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 161.675 | 165.987 | 158.119 | 165.987 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1560.795 | 1607.114 | 1478.850 | 1607.114 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.149 | 1.560 | 0.143 | 1.560 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.370 | 2.904 | 2.329 | 2.904 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.029 | 0.046 | 0.019 | 0.046 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.456 | 0.522 | 0.445 | 0.522 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.019 | 0.032 | 0.014 | 0.032 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.504 | 0.562 | 0.473 | 0.562 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.190 | 1.527 | 1.137 | 1.527 | 145.0 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 81.713 | 104.321 | 80.733 | 104.321 | 133.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 335.777 | 351.529 | 335.055 | 351.529 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1863.148 | 2007.046 | 1824.158 | 2007.046 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 192.365 | 193.752 | 190.490 | 193.752 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1746.902 | 1815.297 | 1703.895 | 1815.297 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.151 | 0.170 | 0.122 | 0.170 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.777 | 4.731 | 2.693 | 4.731 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.023 | 0.037 | 0.021 | 0.037 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.790 | 1.290 | 0.740 | 1.290 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.064 | 0.071 | 0.050 | 0.071 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.804 | 0.832 | 0.781 | 0.832 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 23.161 | 25.697 | 22.863 | 25.697 | 156.4 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 296.230 | 311.465 | 281.719 | 311.465 | 133.8 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 335.779 | 362.558 | 328.545 | 362.558 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1880.812 | 1933.696 | 1856.960 | 1933.696 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 190.160 | 198.967 | 189.376 | 198.967 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1733.680 | 1830.629 | 1710.050 | 1830.629 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.154 | 0.191 | 0.137 | 0.191 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.780 | 2.874 | 2.727 | 2.874 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.022 | 0.029 | 0.021 | 0.029 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.793 | 0.822 | 0.777 | 0.822 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.069 | 0.096 | 0.048 | 0.096 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.799 | 0.836 | 0.771 | 0.836 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 23.249 | 24.989 | 22.992 | 24.989 | 158.2 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 285.849 | 296.690 | 284.067 | 296.690 | 133.8 |
| warm-start-logistic-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 133.010 | 135.360 | 131.299 | 135.360 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-fit | python-prophet | 6 | 110.746 | 111.722 | 110.553 | 111.722 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 115.919 | 117.111 | 115.006 | 117.111 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 94.394 | 108.049 | 93.301 | 108.049 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `d4edbd51740a32f8a1d8e245aa70e2ba8d313fc7`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `country-us-logistic-additive`, `country-explicit-us-logistic-additive`, `country-us-logistic-multiplicative`, `country-explicit-us-logistic-multiplicative`, `logistic-implicit-floor-absmax`, `logistic-implicit-floor-minmax`, `logistic-explicit-floor-absmax`, `logistic-explicit-floor-minmax`, `logistic-implicit-floor-auto-changepoints`, `logistic-implicit-floor-large`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000`, `uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7`, `uncertainty-logistic-implicit-floor-minmax-full-samples-512`, `uncertainty-logistic-implicit-floor-large-full-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-full-intervals-512`, `uncertainty-logistic-explicit-floor-minmax-full-samples-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128`, `uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128`, `anomalies-logistic-defaults-99`, `warm-start-logistic-defaults-7-new-rows`, `evaluation-logistic-point`, `evaluation-logistic-intervals`, `evaluation-logistic-search`, `evaluation-logistic-large-point`, `evaluation-logistic-large-intervals`, `evaluation-logistic-large-months-metrics`, `evaluation-logistic-large-parallel`, `logistic-reconcile-basic-96-empty-absmax`, `logistic-reconcile-basic-96-explicit-absmax`, `logistic-reconcile-basic-96-auto-absmax`, `logistic-reconcile-basic-96-empty-minmax`, `logistic-reconcile-basic-96-explicit-minmax`, `logistic-reconcile-basic-96-auto-minmax`, `logistic-reconcile-empty-loose-prior-absmax`, `logistic-reconcile-empty-loose-prior-minmax`, `logistic-reconcile-basic-99`, `logistic-reconcile-basic-100`, `logistic-reconcile-basic-256`, `logistic-reconcile-defaults-96`, `logistic-reconcile-defaults-256`, `logistic-reconcile-defaults-rate-changes`, `logistic-reconcile-weekly`, `logistic-reconcile-conditional`, `logistic-reconcile-event`, `logistic-reconcile-regressor-additive`, `logistic-reconcile-regressor-multiplicative`, `logistic-reconcile-explicit-floor-absmax`, `logistic-reconcile-mixed-absmax`, `logistic-reconcile-explicit-floor-minmax`, `logistic-reconcile-mixed-minmax`, `logistic-reconcile-unsorted`, `logistic-reconcile-duplicates`, `logistic-reconcile-declining`, `logistic-reconcile-saturated`, `logistic-reconcile-constant`, `logistic-reconcile-out-of-bounds`, `mcmc-logistic-explicit-floor-minmax`, `mcmc-logistic-rate-changes`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:3a0b8982c7c2549c4371e76ccbb4746eb0a08b745b6e2e5df640f6feaa76418a`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:4a7391c7de7249a9491d08fe69e0eea60542221c2e3d5ed50e6d6bcd8d3c75a6`

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

