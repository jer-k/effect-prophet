# Effect Prophet benchmark — 2026-11-03T222602-469Z-0068e212

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
| anomalies-logistic-defaults-99 | warm-anomalies | effect-prophet | 6 | 73.931 | 77.319 | 72.419 | 77.319 | n/a |
| anomalies-logistic-defaults-99 | warm-anomalies | python-prophet | 6 | 296.743 | 320.144 | 295.191 | 320.144 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | effect-prophet | 6 | 54.496 | 57.234 | 54.126 | 57.234 | n/a |
| anomalies-logistic-defaults-99 | warm-fit | python-prophet | 6 | 44.981 | 45.723 | 44.412 | 45.723 | n/a |
| anomalies-logistic-defaults-99 | warm-uncertainty | effect-prophet | 6 | 14.807 | 15.534 | 14.562 | 15.534 | 154.7 |
| anomalies-logistic-defaults-99 | warm-uncertainty | python-prophet | 6 | 251.238 | 265.951 | 249.599 | 265.951 | 133.7 |
| country-explicit-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.018 | 0.013 | 0.018 | 139.5 |
| country-explicit-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.469 | 0.495 | 0.442 | 0.495 | 133.7 |
| country-explicit-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 208.517 | 221.709 | 206.541 | 221.709 | 152.1 |
| country-explicit-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1501.059 | 1583.985 | 1488.015 | 1583.985 | 133.7 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 162.227 | 165.840 | 160.523 | 165.840 | 152.3 |
| country-explicit-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1465.023 | 1549.299 | 1428.854 | 1549.299 | 133.7 |
| country-explicit-us-logistic-additive | model-json-decode | effect-prophet | 6 | 0.477 | 0.780 | 0.374 | 0.780 | 152.3 |
| country-explicit-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.100 | 4.326 | 4.066 | 4.326 | 133.7 |
| country-explicit-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.031 | 0.044 | 0.018 | 0.044 | 152.1 |
| country-explicit-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.760 | 0.825 | 0.735 | 0.825 | 133.7 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 30.821 | 32.224 | 30.531 | 32.224 | 152.0 |
| country-explicit-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 58.900 | 60.821 | 55.861 | 60.821 | 133.7 |
| country-explicit-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 30.779 | 31.133 | 30.608 | 31.133 | 151.3 |
| country-explicit-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 55.019 | 56.555 | 54.493 | 56.555 | 133.7 |
| country-explicit-us-logistic-additive | warm-fit | effect-prophet | 6 | 31.844 | 34.602 | 31.456 | 34.602 | 148.4 |
| country-explicit-us-logistic-additive | warm-fit | python-prophet | 6 | 49.676 | 51.684 | 49.403 | 51.684 | 133.7 |
| country-explicit-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.156 | 0.175 | 0.142 | 0.175 | 151.3 |
| country-explicit-us-logistic-additive | warm-predict | python-prophet | 6 | 4.774 | 5.046 | 4.705 | 5.046 | 133.7 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.017 | 0.012 | 0.017 | 139.2 |
| country-explicit-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.507 | 0.715 | 0.494 | 0.715 | 133.7 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 221.035 | 235.593 | 217.851 | 235.593 | 155.2 |
| country-explicit-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1543.306 | 1654.372 | 1513.655 | 1654.372 | 133.7 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 160.834 | 164.282 | 159.093 | 164.282 | 155.4 |
| country-explicit-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1451.009 | 1472.739 | 1431.686 | 1472.739 | 133.7 |
| country-explicit-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 0.414 | 0.516 | 0.346 | 0.516 | 155.4 |
| country-explicit-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.534 | 4.882 | 4.200 | 4.882 | 133.7 |
| country-explicit-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.031 | 0.050 | 0.019 | 0.050 | 155.2 |
| country-explicit-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.772 | 0.979 | 0.695 | 0.979 | 133.7 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 43.118 | 44.244 | 43.002 | 44.244 | 155.0 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 78.443 | 90.029 | 65.947 | 90.029 | 133.7 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.537 | 43.814 | 42.871 | 43.814 | 151.9 |
| country-explicit-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 63.357 | 63.662 | 61.658 | 63.662 | 133.7 |
| country-explicit-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.444 | 47.252 | 44.255 | 47.252 | 151.5 |
| country-explicit-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 60.282 | 63.805 | 58.519 | 63.805 | 133.7 |
| country-explicit-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.180 | 0.217 | 0.140 | 0.217 | 151.5 |
| country-explicit-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 4.840 | 6.192 | 4.766 | 6.192 | 133.7 |
| country-us-logistic-additive | adapter-input-conversion | effect-prophet | 6 | 0.019 | 0.041 | 0.016 | 0.041 | 146.8 |
| country-us-logistic-additive | adapter-input-conversion | python-prophet | 6 | 0.490 | 0.525 | 0.459 | 0.525 | 147.6 |
| country-us-logistic-additive | cold-first-forecast | effect-prophet | 6 | 229.026 | 278.018 | 212.262 | 278.018 | 163.8 |
| country-us-logistic-additive | cold-first-forecast | python-prophet | 6 | 1700.957 | 1849.584 | 1690.107 | 1849.584 | 147.6 |
| country-us-logistic-additive | fresh-process-restored-predict | effect-prophet | 6 | 167.282 | 196.704 | 163.507 | 196.704 | 175.5 |
| country-us-logistic-additive | fresh-process-restored-predict | python-prophet | 6 | 1662.129 | 1757.661 | 1602.013 | 1757.661 | 147.6 |
| country-us-logistic-additive | model-json-decode | effect-prophet | 6 | 1.084 | 1.299 | 1.047 | 1.299 | 172.8 |
| country-us-logistic-additive | model-json-decode | python-prophet | 6 | 4.074 | 4.324 | 4.002 | 4.324 | 147.6 |
| country-us-logistic-additive | model-json-encode | effect-prophet | 6 | 0.126 | 0.159 | 0.108 | 0.159 | 164.2 |
| country-us-logistic-additive | model-json-encode | python-prophet | 6 | 0.717 | 0.743 | 0.697 | 0.743 | 147.6 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 31.934 | 32.855 | 31.349 | 32.855 | 163.6 |
| country-us-logistic-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 59.897 | 61.702 | 59.462 | 61.702 | 147.6 |
| country-us-logistic-additive | warm-fit-predict | effect-prophet | 6 | 31.862 | 35.335 | 31.561 | 35.335 | 162.6 |
| country-us-logistic-additive | warm-fit-predict | python-prophet | 6 | 58.437 | 59.668 | 58.022 | 59.668 | 147.6 |
| country-us-logistic-additive | warm-fit | effect-prophet | 6 | 33.328 | 49.813 | 31.922 | 49.813 | 156.7 |
| country-us-logistic-additive | warm-fit | python-prophet | 6 | 53.157 | 55.729 | 52.237 | 55.729 | 147.6 |
| country-us-logistic-additive | warm-predict | effect-prophet | 6 | 0.257 | 0.310 | 0.204 | 0.310 | 156.7 |
| country-us-logistic-additive | warm-predict | python-prophet | 6 | 5.547 | 5.689 | 5.426 | 5.689 | 147.6 |
| country-us-logistic-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.018 | 0.022 | 0.017 | 0.022 | 138.2 |
| country-us-logistic-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.482 | 0.510 | 0.471 | 0.510 | 148.6 |
| country-us-logistic-multiplicative | cold-first-forecast | effect-prophet | 6 | 230.719 | 235.297 | 219.363 | 235.297 | 154.3 |
| country-us-logistic-multiplicative | cold-first-forecast | python-prophet | 6 | 1691.141 | 1751.991 | 1663.192 | 1751.991 | 148.6 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 170.880 | 175.411 | 165.503 | 175.411 | 166.4 |
| country-us-logistic-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1641.380 | 1675.780 | 1638.770 | 1675.780 | 148.6 |
| country-us-logistic-multiplicative | model-json-decode | effect-prophet | 6 | 1.229 | 1.628 | 1.109 | 1.628 | 163.7 |
| country-us-logistic-multiplicative | model-json-decode | python-prophet | 6 | 4.112 | 4.527 | 4.034 | 4.527 | 148.6 |
| country-us-logistic-multiplicative | model-json-encode | effect-prophet | 6 | 0.123 | 0.153 | 0.122 | 0.153 | 154.9 |
| country-us-logistic-multiplicative | model-json-encode | python-prophet | 6 | 0.704 | 0.736 | 0.691 | 0.736 | 148.6 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 44.002 | 45.268 | 43.652 | 45.268 | 154.2 |
| country-us-logistic-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 68.916 | 72.888 | 66.817 | 72.888 | 148.6 |
| country-us-logistic-multiplicative | warm-fit-predict | effect-prophet | 6 | 43.672 | 44.320 | 43.217 | 44.320 | 153.0 |
| country-us-logistic-multiplicative | warm-fit-predict | python-prophet | 6 | 68.251 | 69.907 | 67.734 | 69.907 | 148.6 |
| country-us-logistic-multiplicative | warm-fit | effect-prophet | 6 | 44.670 | 44.884 | 44.033 | 44.884 | 149.3 |
| country-us-logistic-multiplicative | warm-fit | python-prophet | 6 | 61.059 | 64.879 | 60.571 | 64.879 | 148.6 |
| country-us-logistic-multiplicative | warm-predict | effect-prophet | 6 | 0.254 | 0.337 | 0.215 | 0.337 | 149.8 |
| country-us-logistic-multiplicative | warm-predict | python-prophet | 6 | 6.426 | 7.310 | 5.875 | 7.310 | 148.6 |
| evaluation-logistic-intervals | evaluation-intervals | effect-prophet | 4 | 18.788 | 20.215 | 18.650 | 20.215 | 148.1 |
| evaluation-logistic-intervals | evaluation-intervals | python-prophet | 4 | 64.400 | 67.700 | 63.986 | 67.700 | 133.7 |
| evaluation-logistic-large-intervals | evaluation-intervals | effect-prophet | 4 | 15.376 | 19.611 | 14.838 | 19.611 | 154.5 |
| evaluation-logistic-large-intervals | evaluation-intervals | python-prophet | 4 | 56.475 | 74.957 | 55.941 | 74.957 | 133.7 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | effect-prophet | 4 | 1.329 | 1.804 | 1.294 | 1.804 | 158.2 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-custom | python-prophet | 4 | 12.814 | 13.710 | 12.685 | 13.710 | 133.7 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | effect-prophet | 4 | 0.356 | 0.406 | 0.323 | 0.406 | 154.3 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-monthly | python-prophet | 4 | 5.056 | 5.827 | 5.037 | 5.827 | 133.7 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | effect-prophet | 4 | 1.768 | 2.196 | 1.620 | 2.196 | 159.2 |
| evaluation-logistic-large-months-metrics | evaluation-metrics-scaled | python-prophet | 4 | 5.444 | 5.774 | 5.400 | 5.774 | 133.7 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | effect-prophet | 4 | 0.505 | 0.871 | 0.433 | 0.871 | 154.2 |
| evaluation-logistic-large-months-metrics | evaluation-metrics | python-prophet | 4 | 5.466 | 5.744 | 5.436 | 5.744 | 133.7 |
| evaluation-logistic-large-parallel | evaluation-point-processes | python-prophet | 4 | 1498.617 | 1518.805 | 1495.947 | 1518.805 | 133.7 |
| evaluation-logistic-large-parallel | evaluation-point-threads | python-prophet | 4 | 165.273 | 168.432 | 161.600 | 168.432 | 133.7 |
| evaluation-logistic-large-parallel | evaluation-point | effect-prophet | 4 | 66.217 | 67.794 | 65.047 | 67.794 | 157.8 |
| evaluation-logistic-large-parallel | evaluation-point | python-prophet | 4 | 195.533 | 291.458 | 182.248 | 291.458 | 133.7 |
| evaluation-logistic-large-parallel | evaluation-search-processes | python-prophet | 4 | 4565.745 | 4729.080 | 4552.084 | 4729.080 | 133.7 |
| evaluation-logistic-large-parallel | evaluation-search-threads | python-prophet | 4 | 507.986 | 524.693 | 501.392 | 524.693 | 133.7 |
| evaluation-logistic-large-parallel | evaluation-search | effect-prophet | 4 | 191.475 | 195.962 | 185.181 | 195.962 | 196.1 |
| evaluation-logistic-large-parallel | evaluation-search | python-prophet | 4 | 527.928 | 556.178 | 527.712 | 556.178 | 133.7 |
| evaluation-logistic-large-point | cold-first-evaluation | effect-prophet | 4 | 204.044 | 224.145 | 199.995 | 224.145 | 159.2 |
| evaluation-logistic-large-point | cold-first-evaluation | python-prophet | 4 | 1466.679 | 1544.824 | 1465.451 | 1544.824 | 133.7 |
| evaluation-logistic-large-point | evaluation-baseline | effect-prophet | 4 | 2.301 | 2.834 | 2.176 | 2.834 | 159.1 |
| evaluation-logistic-large-point | evaluation-baseline | python-prophet | 4 | 1.260 | 1.322 | 1.256 | 1.322 | 133.7 |
| evaluation-logistic-large-point | evaluation-input-conversion | effect-prophet | 4 | 0.043 | 0.064 | 0.025 | 0.064 | 130.0 |
| evaluation-logistic-large-point | evaluation-input-conversion | python-prophet | 4 | 0.490 | 0.525 | 0.487 | 0.525 | 133.7 |
| evaluation-logistic-large-point | evaluation-metrics | effect-prophet | 4 | 0.085 | 0.092 | 0.063 | 0.092 | 158.7 |
| evaluation-logistic-large-point | evaluation-metrics | python-prophet | 4 | 5.320 | 5.526 | 5.295 | 5.526 | 133.7 |
| evaluation-logistic-large-point | evaluation-plan | effect-prophet | 4 | 1.669 | 1.956 | 1.418 | 1.956 | 136.6 |
| evaluation-logistic-large-point | evaluation-plan | python-prophet | 4 | 0.754 | 0.793 | 0.741 | 0.793 | 133.7 |
| evaluation-logistic-large-point | evaluation-point | effect-prophet | 4 | 14.428 | 14.554 | 14.081 | 14.554 | 157.6 |
| evaluation-logistic-large-point | evaluation-point | python-prophet | 4 | 41.850 | 42.800 | 41.405 | 42.800 | 133.7 |
| evaluation-logistic-point | cold-first-evaluation | effect-prophet | 4 | 201.758 | 224.696 | 196.812 | 224.696 | 152.3 |
| evaluation-logistic-point | cold-first-evaluation | python-prophet | 4 | 1479.824 | 1508.012 | 1467.681 | 1508.012 | 133.7 |
| evaluation-logistic-point | evaluation-baseline | effect-prophet | 4 | 1.067 | 1.187 | 0.980 | 1.187 | 152.1 |
| evaluation-logistic-point | evaluation-baseline | python-prophet | 4 | 0.789 | 0.816 | 0.760 | 0.816 | 133.7 |
| evaluation-logistic-point | evaluation-input-conversion | effect-prophet | 4 | 0.010 | 0.011 | 0.010 | 0.011 | 130.6 |
| evaluation-logistic-point | evaluation-input-conversion | python-prophet | 4 | 0.411 | 0.419 | 0.396 | 0.419 | 133.7 |
| evaluation-logistic-point | evaluation-metrics | effect-prophet | 4 | 0.094 | 0.129 | 0.063 | 0.129 | 152.0 |
| evaluation-logistic-point | evaluation-metrics | python-prophet | 4 | 5.293 | 5.464 | 5.257 | 5.464 | 133.7 |
| evaluation-logistic-point | evaluation-plan | effect-prophet | 4 | 1.243 | 1.491 | 0.982 | 1.491 | 134.1 |
| evaluation-logistic-point | evaluation-plan | python-prophet | 4 | 0.557 | 0.687 | 0.544 | 0.687 | 133.7 |
| evaluation-logistic-point | evaluation-point | effect-prophet | 4 | 18.107 | 19.337 | 17.221 | 19.337 | 146.5 |
| evaluation-logistic-point | evaluation-point | python-prophet | 4 | 58.953 | 63.796 | 58.590 | 63.796 | 133.7 |
| evaluation-logistic-search | evaluation-holdout | effect-prophet | 4 | 17.822 | 17.953 | 17.564 | 17.953 | 158.7 |
| evaluation-logistic-search | evaluation-holdout | python-prophet | 4 | 30.104 | 31.017 | 29.552 | 31.017 | 133.7 |
| evaluation-logistic-search | evaluation-report-decode | effect-prophet | 4 | 0.197 | 0.208 | 0.170 | 0.208 | 159.0 |
| evaluation-logistic-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 133.7 |
| evaluation-logistic-search | evaluation-report-encode | effect-prophet | 4 | 0.284 | 0.305 | 0.271 | 0.305 | 158.9 |
| evaluation-logistic-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 133.7 |
| evaluation-logistic-search | evaluation-search | effect-prophet | 4 | 35.912 | 40.101 | 35.752 | 40.101 | 153.6 |
| evaluation-logistic-search | evaluation-search | python-prophet | 4 | 113.728 | 128.140 | 113.048 | 128.140 | 133.7 |
| logistic-explicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.028 | 0.029 | 0.027 | 0.029 | n/a |
| logistic-explicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.492 | 0.506 | 0.490 | 0.506 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 194.184 | 201.074 | 189.653 | 201.074 | n/a |
| logistic-explicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1473.582 | 1566.630 | 1468.640 | 1566.630 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.175 | 163.370 | 158.915 | 163.370 | n/a |
| logistic-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1451.774 | 1517.935 | 1419.275 | 1517.935 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.097 | 0.159 | 0.089 | 0.159 | n/a |
| logistic-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.484 | 2.573 | 2.478 | 2.573 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.049 | 0.034 | 0.049 | n/a |
| logistic-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.505 | 0.518 | 0.445 | 0.518 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 21.436 | 21.806 | 20.866 | 21.806 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 36.223 | 36.726 | 35.903 | 36.726 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 21.216 | 21.786 | 21.141 | 21.786 | n/a |
| logistic-explicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 35.702 | 36.347 | 35.490 | 36.347 | n/a |
| logistic-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 21.533 | 21.724 | 21.306 | 21.724 | n/a |
| logistic-explicit-floor-absmax | warm-fit | python-prophet | 4 | 32.708 | 35.061 | 31.882 | 35.061 | n/a |
| logistic-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.370 | 1.916 | 0.364 | 1.916 | n/a |
| logistic-explicit-floor-absmax | warm-predict | python-prophet | 4 | 3.640 | 3.908 | 3.626 | 3.908 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.041 | 0.054 | 0.039 | 0.054 | n/a |
| logistic-explicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.488 | 0.524 | 0.481 | 0.524 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 190.831 | 194.096 | 188.393 | 194.096 | n/a |
| logistic-explicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1452.865 | 1488.863 | 1445.987 | 1488.863 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 161.090 | 172.946 | 158.963 | 172.946 | n/a |
| logistic-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1489.779 | 1603.957 | 1412.011 | 1603.957 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.106 | 0.158 | 0.087 | 0.158 | n/a |
| logistic-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.540 | 2.724 | 2.457 | 2.724 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.034 | 0.050 | 0.030 | 0.050 | n/a |
| logistic-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.494 | 0.577 | 0.432 | 0.577 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 17.701 | 18.360 | 17.554 | 18.360 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 30.852 | 31.262 | 30.845 | 31.262 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 17.340 | 17.939 | 17.296 | 17.939 | n/a |
| logistic-explicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 29.903 | 32.278 | 29.835 | 32.278 | n/a |
| logistic-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 17.816 | 18.365 | 17.686 | 18.365 | n/a |
| logistic-explicit-floor-minmax | warm-fit | python-prophet | 4 | 26.780 | 27.200 | 26.697 | 27.200 | n/a |
| logistic-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.275 | 0.420 | 0.270 | 0.420 | n/a |
| logistic-explicit-floor-minmax | warm-predict | python-prophet | 4 | 3.582 | 4.011 | 3.533 | 4.011 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | effect-prophet | 4 | 0.017 | 0.021 | 0.015 | 0.021 | n/a |
| logistic-implicit-floor-absmax | adapter-input-conversion | python-prophet | 4 | 0.469 | 0.524 | 0.467 | 0.524 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | effect-prophet | 4 | 192.883 | 199.840 | 192.659 | 199.840 | n/a |
| logistic-implicit-floor-absmax | cold-first-forecast | python-prophet | 4 | 1465.508 | 1525.518 | 1459.519 | 1525.518 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 160.914 | 161.738 | 160.786 | 161.738 | n/a |
| logistic-implicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1428.717 | 1508.838 | 1426.007 | 1508.838 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.130 | 0.205 | 0.099 | 0.205 | n/a |
| logistic-implicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.300 | 2.354 | 2.299 | 2.354 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.030 | 0.042 | 0.029 | 0.042 | n/a |
| logistic-implicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.440 | 0.500 | 0.437 | 0.500 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.775 | 18.906 | 18.554 | 18.906 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 32.805 | 35.034 | 32.746 | 35.034 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | effect-prophet | 4 | 19.972 | 20.961 | 18.686 | 20.961 | n/a |
| logistic-implicit-floor-absmax | warm-fit-predict | python-prophet | 4 | 32.367 | 32.763 | 32.198 | 32.763 | n/a |
| logistic-implicit-floor-absmax | warm-fit | effect-prophet | 4 | 19.138 | 20.454 | 19.001 | 20.454 | n/a |
| logistic-implicit-floor-absmax | warm-fit | python-prophet | 4 | 29.738 | 30.185 | 29.212 | 30.185 | n/a |
| logistic-implicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.417 | 0.466 | 0.347 | 0.466 | n/a |
| logistic-implicit-floor-absmax | warm-predict | python-prophet | 4 | 3.257 | 4.350 | 3.167 | 4.350 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.030 | 0.015 | 0.030 | n/a |
| logistic-implicit-floor-auto-changepoints | adapter-input-conversion | python-prophet | 4 | 0.495 | 0.559 | 0.492 | 0.559 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | effect-prophet | 4 | 194.235 | 214.213 | 188.365 | 214.213 | n/a |
| logistic-implicit-floor-auto-changepoints | cold-first-forecast | python-prophet | 4 | 1459.041 | 1556.259 | 1453.975 | 1556.259 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | effect-prophet | 4 | 163.856 | 164.771 | 159.039 | 164.771 | n/a |
| logistic-implicit-floor-auto-changepoints | fresh-process-restored-predict | python-prophet | 4 | 1423.756 | 1475.382 | 1422.761 | 1475.382 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | effect-prophet | 4 | 0.104 | 0.191 | 0.098 | 0.191 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-decode | python-prophet | 4 | 2.242 | 2.324 | 2.219 | 2.324 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | effect-prophet | 4 | 0.042 | 0.054 | 0.037 | 0.054 | n/a |
| logistic-implicit-floor-auto-changepoints | model-json-encode | python-prophet | 4 | 0.434 | 0.475 | 0.430 | 0.475 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | effect-prophet | 4 | 18.874 | 20.103 | 18.718 | 20.103 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict-with-conversion | python-prophet | 4 | 32.548 | 38.086 | 32.037 | 38.086 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | effect-prophet | 4 | 19.017 | 21.759 | 18.837 | 21.759 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit-predict | python-prophet | 4 | 31.638 | 32.626 | 31.608 | 32.626 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | effect-prophet | 4 | 19.277 | 19.338 | 19.243 | 19.338 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-fit | python-prophet | 4 | 30.511 | 31.009 | 29.890 | 31.009 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | effect-prophet | 4 | 0.371 | 0.457 | 0.354 | 0.457 | n/a |
| logistic-implicit-floor-auto-changepoints | warm-predict | python-prophet | 4 | 3.198 | 3.333 | 3.154 | 3.333 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | effect-prophet | 4 | 0.072 | 0.678 | 0.056 | 0.678 | n/a |
| logistic-implicit-floor-large | adapter-input-conversion | python-prophet | 4 | 0.587 | 0.600 | 0.544 | 0.600 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | effect-prophet | 4 | 217.171 | 221.263 | 182.660 | 221.263 | n/a |
| logistic-implicit-floor-large | cold-first-forecast | python-prophet | 4 | 1453.664 | 1497.963 | 1452.723 | 1497.963 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | effect-prophet | 4 | 166.881 | 201.107 | 166.754 | 201.107 | n/a |
| logistic-implicit-floor-large | fresh-process-restored-predict | python-prophet | 4 | 1446.490 | 1520.848 | 1416.894 | 1520.848 | n/a |
| logistic-implicit-floor-large | model-json-decode | effect-prophet | 4 | 0.108 | 0.166 | 0.102 | 0.166 | n/a |
| logistic-implicit-floor-large | model-json-decode | python-prophet | 4 | 2.790 | 2.952 | 2.703 | 2.952 | n/a |
| logistic-implicit-floor-large | model-json-encode | effect-prophet | 4 | 0.036 | 0.069 | 0.032 | 0.069 | n/a |
| logistic-implicit-floor-large | model-json-encode | python-prophet | 4 | 0.629 | 0.661 | 0.627 | 0.661 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.612 | 4.781 | 4.061 | 4.781 | n/a |
| logistic-implicit-floor-large | warm-fit-predict-with-conversion | python-prophet | 4 | 13.922 | 15.655 | 13.866 | 15.655 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | effect-prophet | 4 | 5.045 | 6.443 | 4.407 | 6.443 | n/a |
| logistic-implicit-floor-large | warm-fit-predict | python-prophet | 4 | 12.862 | 14.557 | 12.655 | 14.557 | n/a |
| logistic-implicit-floor-large | warm-fit | effect-prophet | 4 | 4.678 | 6.704 | 4.334 | 6.704 | n/a |
| logistic-implicit-floor-large | warm-fit | python-prophet | 4 | 9.626 | 10.012 | 9.489 | 10.012 | n/a |
| logistic-implicit-floor-large | warm-predict | effect-prophet | 4 | 0.409 | 0.471 | 0.403 | 0.471 | n/a |
| logistic-implicit-floor-large | warm-predict | python-prophet | 4 | 3.215 | 3.299 | 3.198 | 3.299 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | effect-prophet | 4 | 0.018 | 0.022 | 0.017 | 0.022 | n/a |
| logistic-implicit-floor-minmax | adapter-input-conversion | python-prophet | 4 | 0.467 | 0.478 | 0.460 | 0.478 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | effect-prophet | 4 | 193.639 | 196.558 | 192.469 | 196.558 | n/a |
| logistic-implicit-floor-minmax | cold-first-forecast | python-prophet | 4 | 1469.040 | 1487.968 | 1466.424 | 1487.968 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 160.719 | 163.295 | 160.565 | 163.295 | n/a |
| logistic-implicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1456.629 | 1500.741 | 1451.294 | 1500.741 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.115 | 0.234 | 0.104 | 0.234 | n/a |
| logistic-implicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.317 | 2.330 | 2.239 | 2.330 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.036 | 0.059 | 0.029 | 0.059 | n/a |
| logistic-implicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.450 | 0.552 | 0.429 | 0.552 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 20.396 | 21.495 | 20.353 | 21.495 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 38.336 | 55.279 | 37.420 | 55.279 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | effect-prophet | 4 | 20.699 | 22.109 | 20.612 | 22.109 | n/a |
| logistic-implicit-floor-minmax | warm-fit-predict | python-prophet | 4 | 37.000 | 37.283 | 36.382 | 37.283 | n/a |
| logistic-implicit-floor-minmax | warm-fit | effect-prophet | 4 | 20.985 | 21.708 | 20.937 | 21.708 | n/a |
| logistic-implicit-floor-minmax | warm-fit | python-prophet | 4 | 32.818 | 33.425 | 32.306 | 33.425 | n/a |
| logistic-implicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.319 | 0.376 | 0.305 | 0.376 | n/a |
| logistic-implicit-floor-minmax | warm-predict | python-prophet | 4 | 3.336 | 3.449 | 3.245 | 3.449 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | effect-prophet | 4 | 186.731 | 253.924 | 178.587 | 253.924 | n/a |
| logistic-reconcile-basic-100 | fresh-process-restored-predict | python-prophet | 4 | 1434.084 | 1457.548 | 1419.041 | 1457.548 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | effect-prophet | 4 | 0.120 | 0.160 | 0.120 | 0.160 | n/a |
| logistic-reconcile-basic-100 | model-json-decode | python-prophet | 4 | 2.225 | 2.302 | 2.153 | 2.302 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | effect-prophet | 4 | 0.017 | 0.020 | 0.015 | 0.020 | n/a |
| logistic-reconcile-basic-100 | model-json-encode | python-prophet | 4 | 0.438 | 0.462 | 0.428 | 0.462 | n/a |
| logistic-reconcile-basic-100 | warm-fit | effect-prophet | 4 | 2.073 | 2.402 | 1.742 | 2.402 | n/a |
| logistic-reconcile-basic-100 | warm-fit | python-prophet | 4 | 6.368 | 6.705 | 5.701 | 6.705 | n/a |
| logistic-reconcile-basic-100 | warm-predict | effect-prophet | 4 | 1.105 | 3.099 | 0.639 | 3.099 | n/a |
| logistic-reconcile-basic-100 | warm-predict | python-prophet | 4 | 2.903 | 2.944 | 2.888 | 2.944 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | effect-prophet | 4 | 175.915 | 181.225 | 167.977 | 181.225 | n/a |
| logistic-reconcile-basic-256 | fresh-process-restored-predict | python-prophet | 4 | 1463.564 | 1541.088 | 1442.890 | 1541.088 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | effect-prophet | 4 | 0.124 | 0.142 | 0.117 | 0.142 | n/a |
| logistic-reconcile-basic-256 | model-json-decode | python-prophet | 4 | 2.467 | 2.590 | 2.451 | 2.590 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | effect-prophet | 4 | 0.034 | 0.490 | 0.018 | 0.490 | n/a |
| logistic-reconcile-basic-256 | model-json-encode | python-prophet | 4 | 0.614 | 0.634 | 0.613 | 0.634 | n/a |
| logistic-reconcile-basic-256 | warm-fit | effect-prophet | 4 | 3.833 | 5.250 | 2.980 | 5.250 | n/a |
| logistic-reconcile-basic-256 | warm-fit | python-prophet | 4 | 7.301 | 7.729 | 7.126 | 7.729 | n/a |
| logistic-reconcile-basic-256 | warm-predict | effect-prophet | 4 | 1.363 | 2.586 | 1.228 | 2.586 | n/a |
| logistic-reconcile-basic-256 | warm-predict | python-prophet | 4 | 2.935 | 2.985 | 2.899 | 2.985 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | effect-prophet | 4 | 200.974 | 242.750 | 192.071 | 242.750 | n/a |
| logistic-reconcile-basic-96-auto-absmax | fresh-process-restored-predict | python-prophet | 4 | 1454.935 | 1518.420 | 1440.476 | 1518.420 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | effect-prophet | 4 | 0.179 | 0.227 | 0.175 | 0.227 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-decode | python-prophet | 4 | 2.172 | 2.256 | 2.161 | 2.256 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | effect-prophet | 4 | 0.035 | 0.040 | 0.018 | 0.040 | n/a |
| logistic-reconcile-basic-96-auto-absmax | model-json-encode | python-prophet | 4 | 0.447 | 0.456 | 0.430 | 0.456 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | effect-prophet | 4 | 20.212 | 20.544 | 19.703 | 20.544 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-fit | python-prophet | 4 | 27.356 | 28.211 | 26.804 | 28.211 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | effect-prophet | 4 | 0.965 | 2.598 | 0.917 | 2.598 | n/a |
| logistic-reconcile-basic-96-auto-absmax | warm-predict | python-prophet | 4 | 2.920 | 2.957 | 2.860 | 2.957 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | effect-prophet | 4 | 186.162 | 274.702 | 185.771 | 274.702 | n/a |
| logistic-reconcile-basic-96-auto-minmax | fresh-process-restored-predict | python-prophet | 4 | 1454.790 | 1484.191 | 1422.238 | 1484.191 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | effect-prophet | 4 | 0.144 | 0.210 | 0.133 | 0.210 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-decode | python-prophet | 4 | 2.241 | 2.566 | 2.220 | 2.566 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.072 | 0.017 | 0.072 | n/a |
| logistic-reconcile-basic-96-auto-minmax | model-json-encode | python-prophet | 4 | 0.469 | 0.724 | 0.432 | 0.724 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | effect-prophet | 4 | 10.476 | 11.954 | 10.436 | 11.954 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-fit | python-prophet | 4 | 17.242 | 17.691 | 17.228 | 17.691 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | effect-prophet | 4 | 1.809 | 3.184 | 0.881 | 3.184 | n/a |
| logistic-reconcile-basic-96-auto-minmax | warm-predict | python-prophet | 4 | 2.930 | 4.162 | 2.862 | 4.162 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | effect-prophet | 4 | 196.901 | 241.070 | 187.883 | 241.070 | n/a |
| logistic-reconcile-basic-96-empty-absmax | fresh-process-restored-predict | python-prophet | 4 | 1502.930 | 1516.988 | 1458.713 | 1516.988 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | effect-prophet | 4 | 0.185 | 0.372 | 0.131 | 0.372 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-decode | python-prophet | 4 | 2.277 | 3.045 | 2.178 | 3.045 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.034 | 0.016 | 0.034 | n/a |
| logistic-reconcile-basic-96-empty-absmax | model-json-encode | python-prophet | 4 | 0.495 | 1.016 | 0.490 | 1.016 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | effect-prophet | 4 | 7.935 | 10.009 | 7.666 | 10.009 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-fit | python-prophet | 4 | 14.873 | 17.144 | 14.458 | 17.144 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | effect-prophet | 4 | 1.062 | 2.985 | 1.040 | 2.985 | n/a |
| logistic-reconcile-basic-96-empty-absmax | warm-predict | python-prophet | 4 | 4.204 | 7.232 | 3.794 | 7.232 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | effect-prophet | 4 | 194.497 | 282.266 | 193.543 | 282.266 | n/a |
| logistic-reconcile-basic-96-empty-minmax | fresh-process-restored-predict | python-prophet | 4 | 1450.564 | 1612.294 | 1441.012 | 1612.294 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | effect-prophet | 4 | 0.150 | 0.218 | 0.124 | 0.218 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-decode | python-prophet | 4 | 2.110 | 2.328 | 2.060 | 2.328 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.026 | 0.019 | 0.026 | n/a |
| logistic-reconcile-basic-96-empty-minmax | model-json-encode | python-prophet | 4 | 0.429 | 0.466 | 0.428 | 0.466 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | effect-prophet | 4 | 8.769 | 9.510 | 8.635 | 9.510 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-fit | python-prophet | 4 | 16.211 | 16.721 | 16.082 | 16.721 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | effect-prophet | 4 | 1.012 | 2.574 | 0.948 | 2.574 | n/a |
| logistic-reconcile-basic-96-empty-minmax | warm-predict | python-prophet | 4 | 3.001 | 3.059 | 2.998 | 3.059 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | effect-prophet | 4 | 212.024 | 262.452 | 188.228 | 262.452 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | fresh-process-restored-predict | python-prophet | 4 | 1467.952 | 1497.492 | 1451.663 | 1497.492 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | effect-prophet | 4 | 0.129 | 0.179 | 0.112 | 0.179 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-decode | python-prophet | 4 | 2.218 | 2.266 | 2.193 | 2.266 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.041 | 0.016 | 0.041 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | model-json-encode | python-prophet | 4 | 0.452 | 0.454 | 0.437 | 0.454 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | effect-prophet | 4 | 8.205 | 8.963 | 7.731 | 8.963 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-fit | python-prophet | 4 | 15.624 | 16.390 | 15.410 | 16.390 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | effect-prophet | 4 | 1.270 | 2.706 | 0.716 | 2.706 | n/a |
| logistic-reconcile-basic-96-explicit-absmax | warm-predict | python-prophet | 4 | 2.884 | 2.912 | 2.858 | 2.912 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | effect-prophet | 4 | 216.720 | 411.644 | 179.801 | 411.644 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | fresh-process-restored-predict | python-prophet | 4 | 1469.791 | 1518.702 | 1463.677 | 1518.702 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | effect-prophet | 4 | 0.160 | 0.298 | 0.137 | 0.298 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-decode | python-prophet | 4 | 2.192 | 2.493 | 2.159 | 2.493 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | effect-prophet | 4 | 0.032 | 0.141 | 0.025 | 0.141 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | model-json-encode | python-prophet | 4 | 0.433 | 0.441 | 0.408 | 0.441 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | effect-prophet | 4 | 18.116 | 204.839 | 17.853 | 204.839 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-fit | python-prophet | 4 | 24.334 | 26.028 | 24.160 | 26.028 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | effect-prophet | 4 | 1.893 | 21.132 | 1.022 | 21.132 | n/a |
| logistic-reconcile-basic-96-explicit-minmax | warm-predict | python-prophet | 4 | 3.023 | 3.339 | 2.837 | 3.339 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | effect-prophet | 4 | 181.695 | 193.156 | 176.339 | 193.156 | n/a |
| logistic-reconcile-basic-99 | fresh-process-restored-predict | python-prophet | 4 | 1424.507 | 1458.386 | 1423.699 | 1458.386 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | effect-prophet | 4 | 0.142 | 0.178 | 0.126 | 0.178 | n/a |
| logistic-reconcile-basic-99 | model-json-decode | python-prophet | 4 | 2.319 | 3.491 | 2.295 | 3.491 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | effect-prophet | 4 | 0.017 | 0.020 | 0.016 | 0.020 | n/a |
| logistic-reconcile-basic-99 | model-json-encode | python-prophet | 4 | 0.423 | 0.511 | 0.412 | 0.511 | n/a |
| logistic-reconcile-basic-99 | warm-fit | effect-prophet | 4 | 17.604 | 17.812 | 17.526 | 17.812 | n/a |
| logistic-reconcile-basic-99 | warm-fit | python-prophet | 4 | 25.246 | 33.341 | 25.145 | 33.341 | n/a |
| logistic-reconcile-basic-99 | warm-predict | effect-prophet | 4 | 0.949 | 3.380 | 0.652 | 3.380 | n/a |
| logistic-reconcile-basic-99 | warm-predict | python-prophet | 4 | 2.812 | 3.827 | 2.800 | 3.827 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | effect-prophet | 4 | 166.802 | 213.503 | 162.497 | 213.503 | n/a |
| logistic-reconcile-conditional | fresh-process-restored-predict | python-prophet | 4 | 1409.519 | 1448.678 | 1409.203 | 1448.678 | n/a |
| logistic-reconcile-conditional | model-json-decode | effect-prophet | 4 | 0.137 | 0.149 | 0.136 | 0.149 | n/a |
| logistic-reconcile-conditional | model-json-decode | python-prophet | 4 | 2.422 | 2.650 | 2.407 | 2.650 | n/a |
| logistic-reconcile-conditional | model-json-encode | effect-prophet | 4 | 0.020 | 0.022 | 0.018 | 0.022 | n/a |
| logistic-reconcile-conditional | model-json-encode | python-prophet | 4 | 0.431 | 0.452 | 0.429 | 0.452 | n/a |
| logistic-reconcile-conditional | warm-fit | effect-prophet | 4 | 16.933 | 18.430 | 16.894 | 18.430 | n/a |
| logistic-reconcile-conditional | warm-fit | python-prophet | 4 | 26.202 | 27.152 | 26.033 | 27.152 | n/a |
| logistic-reconcile-conditional | warm-predict | effect-prophet | 4 | 0.733 | 0.775 | 0.730 | 0.775 | n/a |
| logistic-reconcile-conditional | warm-predict | python-prophet | 4 | 3.409 | 3.556 | 3.385 | 3.556 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | effect-prophet | 4 | 182.934 | 193.869 | 178.052 | 193.869 | n/a |
| logistic-reconcile-constant | fresh-process-restored-predict | python-prophet | 4 | 1427.433 | 1503.326 | 1423.378 | 1503.326 | n/a |
| logistic-reconcile-constant | model-json-decode | effect-prophet | 4 | 0.130 | 0.149 | 0.118 | 0.149 | n/a |
| logistic-reconcile-constant | model-json-decode | python-prophet | 4 | 2.163 | 2.228 | 2.144 | 2.228 | n/a |
| logistic-reconcile-constant | model-json-encode | effect-prophet | 4 | 0.018 | 0.046 | 0.017 | 0.046 | n/a |
| logistic-reconcile-constant | model-json-encode | python-prophet | 4 | 0.410 | 0.451 | 0.404 | 0.451 | n/a |
| logistic-reconcile-constant | warm-fit | effect-prophet | 4 | 17.724 | 20.702 | 17.696 | 20.702 | n/a |
| logistic-reconcile-constant | warm-fit | python-prophet | 4 | 25.468 | 25.798 | 24.526 | 25.798 | n/a |
| logistic-reconcile-constant | warm-predict | effect-prophet | 4 | 1.034 | 2.332 | 0.899 | 2.332 | n/a |
| logistic-reconcile-constant | warm-predict | python-prophet | 4 | 2.829 | 2.964 | 2.809 | 2.964 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | effect-prophet | 4 | 169.308 | 184.646 | 167.171 | 184.646 | n/a |
| logistic-reconcile-declining | fresh-process-restored-predict | python-prophet | 4 | 1444.043 | 1507.325 | 1436.748 | 1507.325 | n/a |
| logistic-reconcile-declining | model-json-decode | effect-prophet | 4 | 0.132 | 0.158 | 0.129 | 0.158 | n/a |
| logistic-reconcile-declining | model-json-decode | python-prophet | 4 | 2.182 | 2.203 | 2.157 | 2.203 | n/a |
| logistic-reconcile-declining | model-json-encode | effect-prophet | 4 | 0.021 | 0.032 | 0.017 | 0.032 | n/a |
| logistic-reconcile-declining | model-json-encode | python-prophet | 4 | 0.423 | 0.432 | 0.420 | 0.432 | n/a |
| logistic-reconcile-declining | warm-fit | effect-prophet | 4 | 6.805 | 7.017 | 6.595 | 7.017 | n/a |
| logistic-reconcile-declining | warm-fit | python-prophet | 4 | 13.269 | 13.965 | 13.191 | 13.965 | n/a |
| logistic-reconcile-declining | warm-predict | effect-prophet | 4 | 1.031 | 1.990 | 0.884 | 1.990 | n/a |
| logistic-reconcile-declining | warm-predict | python-prophet | 4 | 2.878 | 2.959 | 2.764 | 2.959 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | effect-prophet | 4 | 171.669 | 198.295 | 171.544 | 198.295 | n/a |
| logistic-reconcile-defaults-256 | fresh-process-restored-predict | python-prophet | 4 | 1485.382 | 1522.624 | 1419.134 | 1522.624 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | effect-prophet | 4 | 0.147 | 0.185 | 0.137 | 0.185 | n/a |
| logistic-reconcile-defaults-256 | model-json-decode | python-prophet | 4 | 2.614 | 4.125 | 2.552 | 4.125 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | effect-prophet | 4 | 0.018 | 0.021 | 0.016 | 0.021 | n/a |
| logistic-reconcile-defaults-256 | model-json-encode | python-prophet | 4 | 0.635 | 0.664 | 0.629 | 0.664 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | effect-prophet | 4 | 38.522 | 40.690 | 37.395 | 40.690 | n/a |
| logistic-reconcile-defaults-256 | warm-fit | python-prophet | 4 | 40.235 | 43.503 | 38.809 | 43.503 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | effect-prophet | 4 | 1.490 | 1.871 | 1.446 | 1.871 | n/a |
| logistic-reconcile-defaults-256 | warm-predict | python-prophet | 4 | 3.384 | 3.627 | 3.361 | 3.627 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | effect-prophet | 4 | 168.125 | 173.082 | 165.303 | 173.082 | n/a |
| logistic-reconcile-defaults-96 | fresh-process-restored-predict | python-prophet | 4 | 1431.405 | 1468.920 | 1427.445 | 1468.920 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | effect-prophet | 4 | 0.176 | 0.234 | 0.147 | 0.234 | n/a |
| logistic-reconcile-defaults-96 | model-json-decode | python-prophet | 4 | 2.309 | 2.333 | 2.243 | 2.333 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | effect-prophet | 4 | 0.019 | 0.027 | 0.019 | 0.027 | n/a |
| logistic-reconcile-defaults-96 | model-json-encode | python-prophet | 4 | 0.455 | 0.480 | 0.445 | 0.480 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | effect-prophet | 4 | 102.047 | 103.258 | 101.610 | 103.258 | n/a |
| logistic-reconcile-defaults-96 | warm-fit | python-prophet | 4 | 121.504 | 122.865 | 121.359 | 122.865 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | effect-prophet | 4 | 1.291 | 3.325 | 1.062 | 3.325 | n/a |
| logistic-reconcile-defaults-96 | warm-predict | python-prophet | 4 | 3.394 | 3.510 | 3.375 | 3.510 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | effect-prophet | 4 | 172.011 | 178.224 | 169.973 | 178.224 | n/a |
| logistic-reconcile-defaults-rate-changes | fresh-process-restored-predict | python-prophet | 4 | 1440.054 | 1473.865 | 1439.096 | 1473.865 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | effect-prophet | 4 | 0.149 | 0.189 | 0.144 | 0.189 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-decode | python-prophet | 4 | 2.671 | 2.766 | 2.657 | 2.766 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | effect-prophet | 4 | 0.021 | 0.024 | 0.018 | 0.024 | n/a |
| logistic-reconcile-defaults-rate-changes | model-json-encode | python-prophet | 4 | 0.753 | 0.786 | 0.743 | 0.786 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | effect-prophet | 4 | 132.234 | 152.335 | 132.116 | 152.335 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-fit | python-prophet | 4 | 112.621 | 114.748 | 110.844 | 114.748 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | effect-prophet | 4 | 1.677 | 1.728 | 1.575 | 1.728 | n/a |
| logistic-reconcile-defaults-rate-changes | warm-predict | python-prophet | 4 | 3.559 | 3.638 | 3.483 | 3.638 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | effect-prophet | 4 | 197.294 | 489.242 | 161.090 | 489.242 | n/a |
| logistic-reconcile-duplicates | fresh-process-restored-predict | python-prophet | 4 | 1421.475 | 1452.182 | 1407.920 | 1452.182 | n/a |
| logistic-reconcile-duplicates | model-json-decode | effect-prophet | 4 | 0.129 | 0.157 | 0.127 | 0.157 | n/a |
| logistic-reconcile-duplicates | model-json-decode | python-prophet | 4 | 2.203 | 2.328 | 2.172 | 2.328 | n/a |
| logistic-reconcile-duplicates | model-json-encode | effect-prophet | 4 | 0.025 | 0.051 | 0.017 | 0.051 | n/a |
| logistic-reconcile-duplicates | model-json-encode | python-prophet | 4 | 0.444 | 0.485 | 0.442 | 0.485 | n/a |
| logistic-reconcile-duplicates | warm-fit | effect-prophet | 4 | 6.208 | 6.615 | 6.115 | 6.615 | n/a |
| logistic-reconcile-duplicates | warm-fit | python-prophet | 4 | 13.543 | 15.236 | 13.010 | 15.236 | n/a |
| logistic-reconcile-duplicates | warm-predict | effect-prophet | 4 | 0.839 | 1.703 | 0.832 | 1.703 | n/a |
| logistic-reconcile-duplicates | warm-predict | python-prophet | 4 | 3.047 | 3.157 | 2.973 | 3.157 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | effect-prophet | 4 | 181.171 | 223.945 | 181.166 | 223.945 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | fresh-process-restored-predict | python-prophet | 4 | 1446.704 | 1469.856 | 1445.122 | 1469.856 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | effect-prophet | 4 | 0.144 | 0.186 | 0.143 | 0.186 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-decode | python-prophet | 4 | 2.058 | 2.085 | 1.992 | 2.085 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.043 | 0.019 | 0.043 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | model-json-encode | python-prophet | 4 | 0.425 | 0.431 | 0.417 | 0.431 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | effect-prophet | 4 | 124.413 | 160.101 | 123.373 | 160.101 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-fit | python-prophet | 4 | 129.073 | 148.000 | 127.889 | 148.000 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | effect-prophet | 4 | 1.076 | 3.164 | 0.995 | 3.164 | n/a |
| logistic-reconcile-empty-loose-prior-absmax | warm-predict | python-prophet | 4 | 2.912 | 3.015 | 2.907 | 3.015 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | effect-prophet | 4 | 205.088 | 221.397 | 178.299 | 221.397 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | fresh-process-restored-predict | python-prophet | 4 | 1459.088 | 1479.655 | 1454.656 | 1479.655 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | effect-prophet | 4 | 0.138 | 0.230 | 0.129 | 0.230 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-decode | python-prophet | 4 | 2.219 | 2.324 | 2.168 | 2.324 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | effect-prophet | 4 | 0.018 | 0.035 | 0.017 | 0.035 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | model-json-encode | python-prophet | 4 | 0.448 | 0.489 | 0.438 | 0.489 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | effect-prophet | 4 | 15.750 | 43.559 | 15.697 | 43.559 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-fit | python-prophet | 4 | 20.535 | 20.715 | 20.395 | 20.715 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | effect-prophet | 4 | 1.031 | 2.392 | 1.020 | 2.392 | n/a |
| logistic-reconcile-empty-loose-prior-minmax | warm-predict | python-prophet | 4 | 2.857 | 2.973 | 2.853 | 2.973 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | effect-prophet | 4 | 167.255 | 169.169 | 159.844 | 169.169 | n/a |
| logistic-reconcile-event | fresh-process-restored-predict | python-prophet | 4 | 1436.497 | 1558.132 | 1425.325 | 1558.132 | n/a |
| logistic-reconcile-event | model-json-decode | effect-prophet | 4 | 0.178 | 0.180 | 0.175 | 0.180 | n/a |
| logistic-reconcile-event | model-json-decode | python-prophet | 4 | 3.327 | 3.447 | 3.312 | 3.447 | n/a |
| logistic-reconcile-event | model-json-encode | effect-prophet | 4 | 0.022 | 0.038 | 0.019 | 0.038 | n/a |
| logistic-reconcile-event | model-json-encode | python-prophet | 4 | 0.617 | 0.648 | 0.615 | 0.648 | n/a |
| logistic-reconcile-event | warm-fit | effect-prophet | 4 | 9.386 | 9.457 | 9.327 | 9.457 | n/a |
| logistic-reconcile-event | warm-fit | python-prophet | 4 | 17.613 | 18.029 | 17.500 | 18.029 | n/a |
| logistic-reconcile-event | warm-predict | effect-prophet | 4 | 0.675 | 0.951 | 0.672 | 0.951 | n/a |
| logistic-reconcile-event | warm-predict | python-prophet | 4 | 4.204 | 4.208 | 4.153 | 4.208 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | effect-prophet | 4 | 161.794 | 182.598 | 161.687 | 182.598 | n/a |
| logistic-reconcile-explicit-floor-absmax | fresh-process-restored-predict | python-prophet | 4 | 1439.225 | 1497.820 | 1416.399 | 1497.820 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | effect-prophet | 4 | 0.131 | 0.140 | 0.118 | 0.140 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-decode | python-prophet | 4 | 2.278 | 7.073 | 2.175 | 7.073 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.022 | 0.016 | 0.022 | n/a |
| logistic-reconcile-explicit-floor-absmax | model-json-encode | python-prophet | 4 | 0.431 | 0.453 | 0.425 | 0.453 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | effect-prophet | 4 | 6.708 | 6.755 | 6.695 | 6.755 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-fit | python-prophet | 4 | 13.798 | 15.423 | 13.774 | 15.423 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | effect-prophet | 4 | 0.905 | 2.890 | 0.693 | 2.890 | n/a |
| logistic-reconcile-explicit-floor-absmax | warm-predict | python-prophet | 4 | 2.879 | 2.958 | 2.863 | 2.958 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | effect-prophet | 4 | 169.725 | 189.064 | 163.107 | 189.064 | n/a |
| logistic-reconcile-explicit-floor-minmax | fresh-process-restored-predict | python-prophet | 4 | 1428.110 | 1460.270 | 1421.611 | 1460.270 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | effect-prophet | 4 | 0.140 | 0.164 | 0.116 | 0.164 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-decode | python-prophet | 4 | 2.158 | 2.194 | 2.149 | 2.194 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | effect-prophet | 4 | 0.017 | 0.029 | 0.016 | 0.029 | n/a |
| logistic-reconcile-explicit-floor-minmax | model-json-encode | python-prophet | 4 | 0.425 | 0.439 | 0.408 | 0.439 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | effect-prophet | 4 | 10.145 | 10.217 | 10.053 | 10.217 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-fit | python-prophet | 4 | 15.419 | 16.122 | 15.248 | 16.122 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | effect-prophet | 4 | 0.664 | 2.280 | 0.640 | 2.280 | n/a |
| logistic-reconcile-explicit-floor-minmax | warm-predict | python-prophet | 4 | 2.805 | 2.904 | 2.750 | 2.904 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | effect-prophet | 4 | 167.656 | 175.399 | 164.658 | 175.399 | n/a |
| logistic-reconcile-mixed-absmax | fresh-process-restored-predict | python-prophet | 4 | 1436.314 | 1475.408 | 1419.902 | 1475.408 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | effect-prophet | 4 | 0.186 | 0.201 | 0.175 | 0.201 | n/a |
| logistic-reconcile-mixed-absmax | model-json-decode | python-prophet | 4 | 3.690 | 4.610 | 3.655 | 4.610 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | effect-prophet | 4 | 0.028 | 0.043 | 0.024 | 0.043 | n/a |
| logistic-reconcile-mixed-absmax | model-json-encode | python-prophet | 4 | 0.631 | 0.718 | 0.623 | 0.718 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | effect-prophet | 4 | 28.879 | 29.673 | 28.841 | 29.673 | n/a |
| logistic-reconcile-mixed-absmax | warm-fit | python-prophet | 4 | 43.313 | 44.845 | 43.013 | 44.845 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | effect-prophet | 4 | 0.921 | 0.932 | 0.905 | 0.932 | n/a |
| logistic-reconcile-mixed-absmax | warm-predict | python-prophet | 4 | 4.992 | 5.528 | 4.980 | 5.528 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | effect-prophet | 4 | 171.076 | 186.655 | 164.568 | 186.655 | n/a |
| logistic-reconcile-mixed-minmax | fresh-process-restored-predict | python-prophet | 4 | 1436.444 | 1453.995 | 1423.951 | 1453.995 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | effect-prophet | 4 | 0.177 | 0.193 | 0.172 | 0.193 | n/a |
| logistic-reconcile-mixed-minmax | model-json-decode | python-prophet | 4 | 3.671 | 3.757 | 3.671 | 3.757 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.035 | 0.021 | 0.035 | n/a |
| logistic-reconcile-mixed-minmax | model-json-encode | python-prophet | 4 | 0.658 | 0.672 | 0.629 | 0.672 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | effect-prophet | 4 | 26.518 | 27.348 | 25.913 | 27.348 | n/a |
| logistic-reconcile-mixed-minmax | warm-fit | python-prophet | 4 | 39.375 | 40.414 | 39.032 | 40.414 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | effect-prophet | 4 | 0.940 | 1.002 | 0.896 | 1.002 | n/a |
| logistic-reconcile-mixed-minmax | warm-predict | python-prophet | 4 | 5.049 | 5.318 | 5.045 | 5.318 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | effect-prophet | 4 | 188.363 | 251.204 | 181.547 | 251.204 | n/a |
| logistic-reconcile-out-of-bounds | fresh-process-restored-predict | python-prophet | 4 | 1432.961 | 1447.761 | 1421.384 | 1447.761 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | effect-prophet | 4 | 0.112 | 0.166 | 0.109 | 0.166 | n/a |
| logistic-reconcile-out-of-bounds | model-json-decode | python-prophet | 4 | 2.155 | 2.183 | 2.125 | 2.183 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | effect-prophet | 4 | 0.019 | 0.046 | 0.016 | 0.046 | n/a |
| logistic-reconcile-out-of-bounds | model-json-encode | python-prophet | 4 | 0.423 | 0.435 | 0.417 | 0.435 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | effect-prophet | 4 | 9.501 | 10.054 | 9.385 | 10.054 | n/a |
| logistic-reconcile-out-of-bounds | warm-fit | python-prophet | 4 | 16.083 | 16.528 | 15.755 | 16.528 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | effect-prophet | 4 | 1.086 | 2.552 | 0.791 | 2.552 | n/a |
| logistic-reconcile-out-of-bounds | warm-predict | python-prophet | 4 | 2.807 | 2.849 | 2.799 | 2.849 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | effect-prophet | 4 | 165.525 | 221.266 | 164.085 | 221.266 | n/a |
| logistic-reconcile-regressor-additive | fresh-process-restored-predict | python-prophet | 4 | 1446.126 | 1481.204 | 1438.640 | 1481.204 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | effect-prophet | 4 | 0.136 | 0.141 | 0.134 | 0.141 | n/a |
| logistic-reconcile-regressor-additive | model-json-decode | python-prophet | 4 | 2.379 | 2.535 | 2.359 | 2.535 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | effect-prophet | 4 | 0.019 | 0.020 | 0.018 | 0.020 | n/a |
| logistic-reconcile-regressor-additive | model-json-encode | python-prophet | 4 | 0.439 | 0.466 | 0.431 | 0.466 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | effect-prophet | 4 | 8.099 | 8.446 | 7.970 | 8.446 | n/a |
| logistic-reconcile-regressor-additive | warm-fit | python-prophet | 4 | 15.008 | 15.095 | 14.849 | 15.095 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | effect-prophet | 4 | 0.717 | 0.795 | 0.705 | 0.795 | n/a |
| logistic-reconcile-regressor-additive | warm-predict | python-prophet | 4 | 3.204 | 3.217 | 3.161 | 3.217 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | effect-prophet | 4 | 162.055 | 164.836 | 161.350 | 164.836 | n/a |
| logistic-reconcile-regressor-multiplicative | fresh-process-restored-predict | python-prophet | 4 | 1429.081 | 1440.368 | 1422.787 | 1440.368 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | effect-prophet | 4 | 0.136 | 0.142 | 0.132 | 0.142 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-decode | python-prophet | 4 | 2.478 | 2.517 | 2.477 | 2.517 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | effect-prophet | 4 | 0.019 | 0.023 | 0.018 | 0.023 | n/a |
| logistic-reconcile-regressor-multiplicative | model-json-encode | python-prophet | 4 | 0.461 | 0.554 | 0.460 | 0.554 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | effect-prophet | 4 | 10.090 | 10.295 | 9.873 | 10.295 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-fit | python-prophet | 4 | 16.783 | 17.552 | 16.575 | 17.552 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | effect-prophet | 4 | 0.754 | 0.764 | 0.713 | 0.764 | n/a |
| logistic-reconcile-regressor-multiplicative | warm-predict | python-prophet | 4 | 3.233 | 5.020 | 3.204 | 5.020 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | effect-prophet | 4 | 186.711 | 513.103 | 161.802 | 513.103 | n/a |
| logistic-reconcile-saturated | fresh-process-restored-predict | python-prophet | 4 | 1465.210 | 1501.828 | 1444.749 | 1501.828 | n/a |
| logistic-reconcile-saturated | model-json-decode | effect-prophet | 4 | 0.136 | 0.187 | 0.130 | 0.187 | n/a |
| logistic-reconcile-saturated | model-json-decode | python-prophet | 4 | 2.185 | 2.241 | 2.180 | 2.241 | n/a |
| logistic-reconcile-saturated | model-json-encode | effect-prophet | 4 | 0.021 | 0.031 | 0.017 | 0.031 | n/a |
| logistic-reconcile-saturated | model-json-encode | python-prophet | 4 | 0.427 | 0.452 | 0.420 | 0.452 | n/a |
| logistic-reconcile-saturated | warm-fit | effect-prophet | 4 | 10.874 | 13.841 | 10.728 | 13.841 | n/a |
| logistic-reconcile-saturated | warm-fit | python-prophet | 4 | 17.491 | 18.996 | 17.460 | 18.996 | n/a |
| logistic-reconcile-saturated | warm-predict | effect-prophet | 4 | 0.938 | 2.521 | 0.887 | 2.521 | n/a |
| logistic-reconcile-saturated | warm-predict | python-prophet | 4 | 2.867 | 2.983 | 2.808 | 2.983 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | effect-prophet | 4 | 166.369 | 170.368 | 166.167 | 170.368 | n/a |
| logistic-reconcile-unsorted | fresh-process-restored-predict | python-prophet | 4 | 1455.213 | 1496.985 | 1434.477 | 1496.985 | n/a |
| logistic-reconcile-unsorted | model-json-decode | effect-prophet | 4 | 0.133 | 0.158 | 0.124 | 0.158 | n/a |
| logistic-reconcile-unsorted | model-json-decode | python-prophet | 4 | 2.180 | 2.199 | 2.132 | 2.199 | n/a |
| logistic-reconcile-unsorted | model-json-encode | effect-prophet | 4 | 0.019 | 0.030 | 0.016 | 0.030 | n/a |
| logistic-reconcile-unsorted | model-json-encode | python-prophet | 4 | 0.438 | 0.449 | 0.422 | 0.449 | n/a |
| logistic-reconcile-unsorted | warm-fit | effect-prophet | 4 | 8.111 | 8.302 | 7.833 | 8.302 | n/a |
| logistic-reconcile-unsorted | warm-fit | python-prophet | 4 | 14.757 | 18.865 | 14.537 | 18.865 | n/a |
| logistic-reconcile-unsorted | warm-predict | effect-prophet | 4 | 0.945 | 2.106 | 0.915 | 2.106 | n/a |
| logistic-reconcile-unsorted | warm-predict | python-prophet | 4 | 2.853 | 2.898 | 2.816 | 2.898 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | effect-prophet | 4 | 163.222 | 212.924 | 162.360 | 212.924 | n/a |
| logistic-reconcile-weekly | fresh-process-restored-predict | python-prophet | 4 | 1431.804 | 1443.534 | 1427.976 | 1443.534 | n/a |
| logistic-reconcile-weekly | model-json-decode | effect-prophet | 4 | 0.138 | 0.156 | 0.137 | 0.156 | n/a |
| logistic-reconcile-weekly | model-json-decode | python-prophet | 4 | 2.185 | 2.318 | 2.174 | 2.318 | n/a |
| logistic-reconcile-weekly | model-json-encode | effect-prophet | 4 | 0.019 | 0.028 | 0.018 | 0.028 | n/a |
| logistic-reconcile-weekly | model-json-encode | python-prophet | 4 | 0.437 | 0.463 | 0.417 | 0.463 | n/a |
| logistic-reconcile-weekly | warm-fit | effect-prophet | 4 | 14.881 | 15.173 | 14.838 | 15.173 | n/a |
| logistic-reconcile-weekly | warm-fit | python-prophet | 4 | 24.576 | 26.398 | 24.099 | 26.398 | n/a |
| logistic-reconcile-weekly | warm-predict | effect-prophet | 4 | 0.962 | 2.573 | 0.727 | 2.573 | n/a |
| logistic-reconcile-weekly | warm-predict | python-prophet | 4 | 3.362 | 3.793 | 3.322 | 3.793 | n/a |
| mcmc-logistic-explicit-floor-minmax | fresh-process-restored-uncertainty | effect-prophet | 6 | 210.551 | 263.711 | 206.329 | 263.711 | n/a |
| mcmc-logistic-explicit-floor-minmax | fresh-process-restored-uncertainty | python-prophet | 6 | 1683.549 | 1743.859 | 1643.554 | 1743.859 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-decode | effect-prophet | 6 | 2.412 | 3.305 | 1.878 | 3.305 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-decode | python-prophet | 6 | 8.114 | 8.589 | 8.088 | 8.589 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-encode | effect-prophet | 6 | 0.287 | 3.512 | 0.246 | 3.512 | n/a |
| mcmc-logistic-explicit-floor-minmax | model-json-encode | python-prophet | 6 | 12.499 | 12.754 | 12.367 | 12.754 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-fit | effect-prophet | 6 | 1850.948 | 1884.272 | 1826.892 | 1884.272 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-fit | python-prophet | 6 | 451.413 | 592.600 | 450.248 | 592.600 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-predict | effect-prophet | 6 | 0.534 | 1.194 | 0.423 | 1.194 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-predict | python-prophet | 6 | 3.845 | 4.007 | 3.728 | 4.007 | n/a |
| mcmc-logistic-explicit-floor-minmax | warm-uncertainty | effect-prophet | 6 | 3.694 | 4.065 | 3.470 | 4.065 | 170.4 |
| mcmc-logistic-explicit-floor-minmax | warm-uncertainty | python-prophet | 6 | 209.217 | 277.148 | 207.536 | 277.148 | 133.7 |
| mcmc-logistic-rate-changes | fresh-process-restored-uncertainty | effect-prophet | 6 | 244.463 | 318.571 | 236.752 | 318.571 | n/a |
| mcmc-logistic-rate-changes | fresh-process-restored-uncertainty | python-prophet | 6 | 1871.859 | 2093.412 | 1843.489 | 2093.412 | n/a |
| mcmc-logistic-rate-changes | model-json-decode | effect-prophet | 6 | 5.283 | 6.701 | 4.524 | 6.701 | n/a |
| mcmc-logistic-rate-changes | model-json-decode | python-prophet | 6 | 22.745 | 25.944 | 22.090 | 25.944 | n/a |
| mcmc-logistic-rate-changes | model-json-encode | effect-prophet | 6 | 0.888 | 2.780 | 0.732 | 2.780 | n/a |
| mcmc-logistic-rate-changes | model-json-encode | python-prophet | 6 | 45.452 | 48.433 | 44.627 | 48.433 | n/a |
| mcmc-logistic-rate-changes | warm-fit | effect-prophet | 6 | 32047.920 | 32184.333 | 31668.726 | 32184.333 | n/a |
| mcmc-logistic-rate-changes | warm-fit | python-prophet | 6 | 6880.408 | 7919.849 | 6843.747 | 7919.849 | n/a |
| mcmc-logistic-rate-changes | warm-predict | effect-prophet | 6 | 2.209 | 6.013 | 1.871 | 6.013 | n/a |
| mcmc-logistic-rate-changes | warm-predict | python-prophet | 6 | 4.823 | 5.106 | 4.755 | 5.106 | n/a |
| mcmc-logistic-rate-changes | warm-uncertainty | effect-prophet | 6 | 38.243 | 39.061 | 37.670 | 39.061 | 152.7 |
| mcmc-logistic-rate-changes | warm-uncertainty | python-prophet | 6 | 357.125 | 382.768 | 346.193 | 382.768 | 154.9 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | effect-prophet | 6 | 194.567 | 224.591 | 190.400 | 224.591 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | cold-first-uncertainty | python-prophet | 6 | 1561.942 | 1594.163 | 1541.963 | 1594.163 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 174.254 | 198.718 | 163.658 | 198.718 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1533.567 | 1584.288 | 1528.907 | 1584.288 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | effect-prophet | 6 | 0.175 | 0.223 | 0.124 | 0.223 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-decode | python-prophet | 6 | 2.472 | 2.612 | 2.434 | 2.612 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | effect-prophet | 6 | 0.034 | 0.055 | 0.024 | 0.055 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | model-json-encode | python-prophet | 6 | 0.482 | 0.540 | 0.471 | 0.540 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.030 | 0.043 | 0.028 | 0.043 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | uncertainty-input-conversion | python-prophet | 6 | 0.516 | 0.542 | 0.485 | 0.542 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | effect-prophet | 6 | 1.036 | 1.374 | 1.007 | 1.374 | 141.4 |
| uncertainty-logistic-explicit-floor-minmax-full-intervals-512 | warm-uncertainty | python-prophet | 6 | 90.728 | 91.866 | 88.749 | 91.866 | 133.7 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 211.794 | 229.760 | 193.987 | 229.760 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1472.574 | 1644.873 | 1462.456 | 1644.873 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.490 | 177.514 | 161.757 | 177.514 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1465.368 | 1518.294 | 1437.771 | 1518.294 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | effect-prophet | 6 | 0.156 | 0.184 | 0.132 | 0.184 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-decode | python-prophet | 6 | 2.475 | 2.621 | 2.463 | 2.621 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | effect-prophet | 6 | 0.031 | 0.051 | 0.020 | 0.051 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | model-json-encode | python-prophet | 6 | 0.557 | 0.634 | 0.482 | 0.634 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.040 | 0.069 | 0.038 | 0.069 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.482 | 0.531 | 0.460 | 0.531 | n/a |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.720 | 0.967 | 0.606 | 0.967 | 147.1 |
| uncertainty-logistic-explicit-floor-minmax-full-samples-128 | warm-uncertainty | python-prophet | 6 | 23.451 | 36.582 | 23.130 | 36.582 | 133.7 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 212.637 | 246.877 | 200.935 | 246.877 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1496.070 | 1533.946 | 1488.453 | 1533.946 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 184.965 | 216.655 | 169.491 | 216.655 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1472.264 | 1506.957 | 1463.541 | 1506.957 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | effect-prophet | 6 | 0.243 | 0.313 | 0.159 | 0.313 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-decode | python-prophet | 6 | 3.687 | 3.970 | 3.658 | 3.970 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | effect-prophet | 6 | 0.034 | 0.058 | 0.025 | 0.058 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | model-json-encode | python-prophet | 6 | 0.669 | 0.691 | 0.658 | 0.691 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.065 | 0.104 | 0.042 | 0.104 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.514 | 0.531 | 0.501 | 0.531 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.866 | 1.239 | 0.698 | 1.239 | 142.9 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-intervals-128 | warm-uncertainty | python-prophet | 6 | 31.096 | 44.941 | 30.668 | 44.941 | 133.7 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 207.360 | 354.846 | 200.083 | 354.846 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1527.501 | 1557.702 | 1482.810 | 1557.702 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 185.397 | 199.518 | 167.017 | 199.518 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1494.675 | 1563.126 | 1483.232 | 1563.126 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | effect-prophet | 6 | 0.243 | 0.313 | 0.149 | 0.313 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-decode | python-prophet | 6 | 3.685 | 3.911 | 3.663 | 3.911 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | effect-prophet | 6 | 0.036 | 0.067 | 0.032 | 0.067 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | model-json-encode | python-prophet | 6 | 0.688 | 0.701 | 0.661 | 0.701 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.075 | 0.132 | 0.058 | 0.132 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.528 | 0.534 | 0.524 | 0.534 | n/a |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.978 | 1.838 | 0.748 | 1.838 | 144.4 |
| uncertainty-logistic-explicit-floor-minmax-mixed-conditions-events-samples-128 | warm-uncertainty | python-prophet | 6 | 25.671 | 38.832 | 24.980 | 38.832 | 133.7 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 180.705 | 186.960 | 175.099 | 186.960 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1457.007 | 1518.376 | 1452.976 | 1518.376 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 170.564 | 189.403 | 170.386 | 189.403 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1451.107 | 1496.906 | 1444.919 | 1496.906 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | effect-prophet | 6 | 0.145 | 0.161 | 0.139 | 0.161 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-decode | python-prophet | 6 | 2.586 | 2.799 | 2.549 | 2.799 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | effect-prophet | 6 | 0.027 | 0.051 | 0.019 | 0.051 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | model-json-encode | python-prophet | 6 | 0.619 | 0.677 | 0.591 | 0.677 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.052 | 2.157 | 0.040 | 2.157 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.590 | 0.662 | 0.556 | 0.662 | n/a |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | effect-prophet | 6 | 1.034 | 2.281 | 0.962 | 2.281 | 148.9 |
| uncertainty-logistic-implicit-floor-large-full-intervals-128 | warm-uncertainty | python-prophet | 6 | 26.319 | 43.891 | 25.047 | 43.891 | 133.7 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 205.955 | 215.749 | 199.810 | 215.749 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1638.896 | 1748.833 | 1540.778 | 1748.833 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 175.805 | 186.227 | 171.884 | 186.227 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1514.574 | 1684.816 | 1504.689 | 1684.816 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | effect-prophet | 6 | 0.207 | 3.080 | 0.141 | 3.080 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-decode | python-prophet | 6 | 2.382 | 2.529 | 2.286 | 2.529 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | effect-prophet | 6 | 0.039 | 0.047 | 0.020 | 0.047 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | model-json-encode | python-prophet | 6 | 0.471 | 0.590 | 0.462 | 0.590 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.026 | 0.041 | 0.020 | 0.041 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.454 | 0.480 | 0.445 | 0.480 | n/a |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | effect-prophet | 6 | 1.362 | 1.704 | 1.197 | 1.704 | 148.2 |
| uncertainty-logistic-implicit-floor-minmax-full-samples-512 | warm-uncertainty | python-prophet | 6 | 79.421 | 80.418 | 78.449 | 80.418 | 133.7 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | effect-prophet | 6 | 347.694 | 415.347 | 338.357 | 415.347 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | cold-first-uncertainty | python-prophet | 6 | 1832.205 | 1867.522 | 1816.798 | 1867.522 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | effect-prophet | 6 | 203.540 | 218.978 | 196.876 | 218.978 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | fresh-process-restored-uncertainty | python-prophet | 6 | 1731.121 | 1825.046 | 1718.096 | 1825.046 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | effect-prophet | 6 | 0.214 | 0.362 | 0.193 | 0.362 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-decode | python-prophet | 6 | 2.659 | 2.727 | 2.607 | 2.727 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | effect-prophet | 6 | 0.040 | 0.070 | 0.036 | 0.070 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | model-json-encode | python-prophet | 6 | 0.765 | 0.849 | 0.753 | 0.849 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | effect-prophet | 6 | 0.069 | 0.094 | 0.049 | 0.094 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | uncertainty-input-conversion | python-prophet | 6 | 0.778 | 0.863 | 0.724 | 0.863 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | effect-prophet | 6 | 24.590 | 27.724 | 23.514 | 27.724 | 156.6 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000-seed-7 | warm-uncertainty | python-prophet | 6 | 280.533 | 294.807 | 277.135 | 294.807 | 133.7 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 342.856 | 382.469 | 339.332 | 382.469 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1869.166 | 2078.166 | 1857.840 | 2078.166 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 199.416 | 221.092 | 189.466 | 221.092 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1708.198 | 1759.703 | 1703.713 | 1759.703 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.170 | 0.187 | 0.137 | 0.187 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-decode | python-prophet | 6 | 2.686 | 3.019 | 2.659 | 3.019 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.043 | 0.688 | 0.025 | 0.688 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | model-json-encode | python-prophet | 6 | 0.810 | 0.877 | 0.792 | 0.877 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.065 | 0.079 | 0.052 | 0.079 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.768 | 0.805 | 0.738 | 0.805 | n/a |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 23.976 | 26.151 | 22.898 | 26.151 | 156.3 |
| uncertainty-logistic-reconcile-defaults-rate-changes-intervals-1000 | warm-uncertainty | python-prophet | 6 | 287.870 | 295.773 | 280.345 | 295.773 | 133.7 |
| warm-start-logistic-defaults-7-new-rows | warm-fit | effect-prophet | 6 | 135.993 | 182.636 | 133.048 | 182.636 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-fit | python-prophet | 6 | 112.515 | 112.657 | 112.103 | 112.657 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | effect-prophet | 6 | 117.748 | 122.737 | 117.630 | 122.737 | n/a |
| warm-start-logistic-defaults-7-new-rows | warm-start-fit | python-prophet | 6 | 94.554 | 97.653 | 93.592 | 97.653 | n/a |

## Failures

No structured failures were recorded.

## Provenance

- Git revision: `0068e212d593db1dc80d41477a9b2105398faec4`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:fa036ac57316cb13968ef42625383ab67e987b95f6fd18ec9737c52fd5c3c108`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:80fdd0ae0db1dc3113e9c8e353127a25670c8454d1c42f398d283166db5a2a5b`

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

