# Effect Prophet benchmark — 2026-10-22T191453-457Z-bc4f2208

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| fixed-linear-prediction-medium | equivalent-equation | passed | 1.421e-14 | 0.000e+0 | 0.000e+0 | 1.421e-14 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence fixed-linear-equation-v1. |
| map-explicit-break-small | equivalent-objective | passed | 1.018e-11 | 0.000e+0 | 0.000e+0 | 1.018e-11 | 4.041e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-seasonal-breaks-irregular-medium | equivalent-objective | passed | 6.301e-5 | 1.686e-5 | 1.686e-5 | 6.877e-5 | 1.344e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-explicit-small | equivalent-objective | passed | 7.887e-13 | 1.212e-12 | 1.281e-12 | 1.020e-12 | 1.101e-13 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-automatic-large | equivalent-objective | passed | 6.238e-3 | 1.135e-2 | 1.318e-2 | 1.804e-2 | 4.515e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-events-small | equivalent-objective | passed | 7.304e-12 | 2.315e-12 | 2.315e-12 | 7.304e-12 | 5.540e-13 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-regressors-medium | equivalent-objective | passed | 4.291e-3 | 1.333e-4 | 2.226e-4 | 4.248e-3 | 3.923e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in stationarity-residual. |
| map-conditional-seasonalities-medium | equivalent-objective | passed | 2.682e-3 | 7.941e-4 | 7.454e-4 | 2.722e-3 | 2.397e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in stationarity-residual. |
| country-us-linear-additive | equivalent-objective | passed | 6.775e-12 | 1.065e-12 | 1.065e-12 | 6.835e-12 | 1.652e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-linear-additive | equivalent-objective | passed | 6.775e-12 | 1.065e-12 | 1.065e-12 | 6.835e-12 | 1.652e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-us-linear-multiplicative | equivalent-objective | passed | 4.270e-12 | 1.024e-12 | 0.000e+0 | 6.022e-12 | 2.594e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-explicit-us-linear-multiplicative | equivalent-objective | passed | 4.270e-12 | 1.024e-12 | 0.000e+0 | 6.022e-12 | 2.594e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| country-boundary-linear | equivalent-objective | passed | 1.866e-9 | 3.610e-12 | 3.610e-12 | 1.862e-9 | 6.639e-14 | n/a | Verified equivalent behavior for this configuration under evidence country-calendar-public-v1. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-small | equivalent-objective | passed | 2.104e-8 | 3.465e-8 | 3.465e-8 | 4.443e-8 | 3.800e-9 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-medium | equivalent-objective | passed | 1.776e-3 | 2.078e-5 | 2.078e-5 | 1.783e-3 | 3.358e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-irregular | equivalent-objective | passed | 7.782e-2 | 6.977e-3 | 6.977e-3 | 7.881e-2 | 9.079e-3 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in objective. |
| map-training-ordered-explicit | equivalent-objective | passed | 3.261e-12 | 0.000e+0 | 0.000e+0 | 3.261e-12 | 5.843e-15 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-ordered-auto | equivalent-objective | passed | 1.619e-9 | 0.000e+0 | 0.000e+0 | 1.619e-9 | 1.022e-10 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-unsorted-explicit | equivalent-objective | passed | 3.261e-12 | 0.000e+0 | 0.000e+0 | 3.261e-12 | 5.843e-15 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-unsorted-auto | equivalent-objective | passed | 1.619e-9 | 0.000e+0 | 0.000e+0 | 1.619e-9 | 1.022e-10 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicates-explicit | equivalent-objective | passed | 1.690e-11 | 0.000e+0 | 0.000e+0 | 1.690e-11 | 5.818e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicates-auto | equivalent-objective | passed | 5.431e-5 | 0.000e+0 | 0.000e+0 | 5.431e-5 | 1.352e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicate-features-auto | equivalent-objective | passed | 8.106e-4 | 1.475e-4 | 1.620e-4 | 9.252e-4 | 7.159e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-training-duplicates-auto | scalar-process-different-public-work | passed | 5.431e-5 | 0.000e+0 | 0.000e+0 | 5.431e-5 | 1.352e-4 | 0.313 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| map-training-zero-span-linear-varied | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-zero-span-linear-constant | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| evaluation-training-duplicates | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.211e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| linear-offset-scaling-absmax | equivalent-objective | passed | 1.226e-11 | 1.420e-13 | 1.420e-13 | 1.236e-11 | 1.023e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-offset-scaling-minmax | equivalent-objective | passed | 6.111e-13 | 2.905e-13 | 2.905e-13 | 8.527e-13 | 4.503e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-mixed-components | equivalent-objective | passed | 1.561e-10 | 2.705e-11 | 0.000e+0 | 1.790e-10 | 1.565e-10 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-defaults-long-history-intervals-1000 | scalar-process-different-public-work | passed | 5.708e-2 | 1.814e-2 | 1.818e-2 | 4.692e-2 | 2.608e-4 | 0.394 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective, stationarity-residual. |
| uncertainty-linear-defaults-irregular-intervals-1000 | scalar-process-different-public-work | passed | 1.096e-1 | 6.977e-3 | 6.977e-3 | 1.070e-1 | 9.079e-3 | 0.483 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: investigate internal fit differences in objective. |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | scalar-process-different-public-work | passed | 1.194e-11 | 1.420e-13 | 1.420e-13 | 1.208e-11 | 1.023e-14 | 0.013 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | scalar-process-different-public-work | passed | 1.197e-11 | 4.310e-14 | 4.310e-14 | 1.201e-11 | 1.023e-14 | 0.005 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-mixed-components-mixed-intervals-128 | scalar-process-different-public-work | passed | 1.516e-10 | 2.582e-11 | 0.000e+0 | 1.830e-10 | 1.565e-10 | 0.016 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-mixed-components-mixed-samples-512 | scalar-process-different-public-work | passed | 1.516e-10 | 2.582e-11 | 0.000e+0 | 1.830e-10 | 1.565e-10 | 0.010 | Verified fitted point behavior under linear-output-first-v4; every interval bound matched Python's scalar simulation within its Monte Carlo allowance. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| evaluation-linear-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-failure-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | n/a | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |

## Country calendars and serialized models

Country fits include bundled lookup/decoding; prediction and restoration use embedded per-country data without replacing the saved snapshot. Explicit controls use identical fitted names, occurrences, priors and modes. Bytes are UTF-8 public model JSON, not gzip or per-call allocation. Empty/partial provider output is not completeness evidence. Failed cases remain visible; missing measurements are n/a.

| Case | Run | Country / coverage | Provider | Snapshot | Embedded country | Represented training years | Event columns | Effect model bytes | Python model bytes |
| --- | ---: | --- | --- | --- | --- | --- | ---: | ---: | ---: |
| country-us-linear-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12501 | 23713 |
| country-us-linear-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12501 | 23713 |
| country-explicit-us-linear-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3782 | 26529 |
| country-explicit-us-linear-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3782 | 26529 |
| country-us-linear-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12532 | 23723 |
| country-us-linear-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2024 | 12 | 12532 | 23723 |
| country-explicit-us-linear-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3801 | 26539 |
| country-explicit-us-linear-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | false | n/a | 12 | 3801 | 26539 |
| country-boundary-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2010 | 13 | 11765 | 23981 |
| country-boundary-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:d8bc5bd9034bc32a8c791e0b4cf2e1f9e89df3d9d7d16af3a274e68b8a612107 | true | 2010 | 13 | 11765 | 23981 |

## Stationarity diagnostics

Constrained normalized infinity-norm residuals at independently fitted endpoints, not a same-point gradient comparison. Deltas within the Laplace kink tolerance use the subgradient interval on both sides. Equality-gate rows bound the absolute difference. Output-first rows never gate eligibility; they are flagged for investigation when Effect's residual exceeds Python's by more than the declared threshold. Diagnostic-only rows do not certify near-stationarity; EP-097 owns that deferred requirement. Forecast, component, metadata, persistence and applicable uncertainty gates always apply; density and normalized noise also gate except under output-first.

| Case | Run | Effect residual | Python residual | Absolute difference | Policy | Follow-up |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| map-explicit-break-small | 0 | 3.070796e-2 | 3.070796e-2 | 5.727387e-11 | output-first | n/a |
| map-explicit-break-small | 1 | 3.070796e-2 | 3.070796e-2 | 5.727387e-11 | output-first | n/a |
| map-seasonal-breaks-irregular-medium | 0 | 1.201279e+1 | 1.251701e+1 | 5.042147e-1 | output-first | n/a |
| map-seasonal-breaks-irregular-medium | 1 | 1.201279e+1 | 1.251701e+1 | 5.042147e-1 | output-first | n/a |
| map-mixed-features-explicit-small | 0 | 2.483610e-2 | 2.483610e-2 | 1.594271e-9 | output-first | n/a |
| map-mixed-features-explicit-small | 1 | 2.483610e-2 | 2.483610e-2 | 1.594271e-9 | output-first | n/a |
| map-mixed-features-automatic-large | 0 | 1.719064e+2 | 1.734560e+2 | 1.549680e+0 | output-first | n/a |
| map-mixed-features-automatic-large | 1 | 1.719064e+2 | 1.734560e+2 | 1.549680e+0 | output-first | n/a |
| map-events-small | 0 | 1.662652e-1 | 1.662652e-1 | 3.640158e-9 | output-first | n/a |
| map-events-small | 1 | 1.662652e-1 | 1.662652e-1 | 3.640158e-9 | output-first | n/a |
| map-regressors-medium | 0 | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | output-first | n/a |
| map-regressors-medium | 1 | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | output-first | n/a |
| map-conditional-seasonalities-medium | 0 | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | output-first | n/a |
| map-conditional-seasonalities-medium | 1 | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | output-first | n/a |
| country-us-linear-additive | 0 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-us-linear-additive | 1 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-explicit-us-linear-additive | 0 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-explicit-us-linear-additive | 1 | 7.770950e-3 | 7.770857e-3 | 9.255976e-8 | output-first | n/a |
| country-us-linear-multiplicative | 0 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-us-linear-multiplicative | 1 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-explicit-us-linear-multiplicative | 0 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-explicit-us-linear-multiplicative | 1 | 8.559718e-3 | 8.559777e-3 | 5.935953e-8 | output-first | n/a |
| country-boundary-linear | 0 | 1.622527e+0 | 1.622527e+0 | 1.016670e-8 | output-first | n/a |
| country-boundary-linear | 1 | 1.622527e+0 | 1.622527e+0 | 1.016670e-8 | output-first | n/a |
| linear-defaults-small | 0 | 2.798504e+1 | 2.797839e+1 | 6.650479e-3 | output-first | n/a |
| linear-defaults-small | 1 | 2.798504e+1 | 2.797839e+1 | 6.650479e-3 | output-first | n/a |
| linear-defaults-medium | 0 | 3.399954e+3 | 9.062191e+3 | 5.662238e+3 | output-first | n/a |
| linear-defaults-medium | 1 | 3.399954e+3 | 9.062191e+3 | 5.662238e+3 | output-first | n/a |
| linear-defaults-irregular | 0 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| linear-defaults-irregular | 1 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| map-training-ordered-explicit | 0 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-ordered-explicit | 1 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-ordered-auto | 0 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-ordered-auto | 1 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-unsorted-explicit | 0 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-unsorted-explicit | 1 | 2.141087e+0 | 2.141087e+0 | 3.056164e-9 | output-first | n/a |
| map-training-unsorted-auto | 0 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-unsorted-auto | 1 | 1.612665e+2 | 1.612664e+2 | 1.471759e-4 | output-first | n/a |
| map-training-duplicates-explicit | 0 | 1.044064e+0 | 1.044064e+0 | 5.043985e-8 | output-first | n/a |
| map-training-duplicates-explicit | 1 | 1.044064e+0 | 1.044064e+0 | 5.043985e-8 | output-first | n/a |
| map-training-duplicates-auto | 0 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| map-training-duplicates-auto | 1 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| map-training-duplicate-features-auto | 0 | 4.784026e+1 | 1.075811e+2 | 5.974084e+1 | output-first | n/a |
| map-training-duplicate-features-auto | 1 | 4.784026e+1 | 1.075811e+2 | 5.974084e+1 | output-first | n/a |
| uncertainty-training-duplicates-auto | 0 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| uncertainty-training-duplicates-auto | 1 | 1.183216e+1 | 1.072297e+2 | 9.539758e+1 | output-first | n/a |
| linear-offset-scaling-absmax | 0 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| linear-offset-scaling-absmax | 1 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| linear-offset-scaling-minmax | 0 | 4.443357e-1 | 4.443357e-1 | 2.258696e-8 | output-first | n/a |
| linear-offset-scaling-minmax | 1 | 4.443357e-1 | 4.443357e-1 | 2.258696e-8 | output-first | n/a |
| linear-mixed-components | 0 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| linear-mixed-components | 1 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | 0 | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | output-first | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1 | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | output-first | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | 0 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | 1 | 2.696500e+1 | 2.541009e+2 | 2.271359e+2 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | 0 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | 1 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | 0 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | 1 | 5.840638e+0 | 5.840638e+0 | 5.844527e-8 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | 0 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | 1 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | 0 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | 1 | 3.489411e+0 | 3.489839e+0 | 4.283950e-4 | output-first | n/a |

## Output-first investigation flags

Internal fit evidence that differs from Python beyond its declared investigation threshold. These rows do not fail the case: fitted outputs gate eligibility. Each flag should be explained in validation notes. Stationarity is flagged only when Effect's residual exceeds Python's.

| Case | Run | Quantity | Effect | Python | Effect - Python | Threshold |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| map-regressors-medium | 0 | stationarity-residual | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | 1.000e-2 |
| map-regressors-medium | 1 | stationarity-residual | 8.391875e+1 | 3.524345e+1 | 4.867531e+1 | 1.000e-2 |
| map-conditional-seasonalities-medium | 0 | stationarity-residual | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | 1.000e-2 |
| map-conditional-seasonalities-medium | 1 | stationarity-residual | 2.098281e+1 | 6.111300e+0 | 1.487151e+1 | 1.000e-2 |
| linear-defaults-irregular | 0 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| linear-defaults-irregular | 1 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 0 | objective | -5.819508e+3 | -5.819647e+3 | 1.389642e-1 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 0 | stationarity-residual | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1 | objective | -5.819508e+3 | -5.819647e+3 | 1.389642e-1 | 1.000e-2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1 | stationarity-residual | 3.892734e+2 | 2.207123e+2 | 1.685611e+2 | 1.000e-2 |
| uncertainty-linear-defaults-irregular-intervals-1000 | 0 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |
| uncertainty-linear-defaults-irregular-intervals-1000 | 1 | objective | -7.454706e+2 | -7.448759e+2 | -5.946746e-1 | 1.000e-2 |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-training-duplicates-auto | 96 | 0 | 25 | 8 | 8 | 8 | 128 | samples | 33554432 | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | docs/validation/uncertainty.md |
| uncertainty-linear-defaults-long-history-intervals-1000 | 1095 | 26 | 25 | 1460 | 365 | 365 | 1000 | intervals | 67108864 | long-history-v1:piecewise+weekly+yearly+bounded-noise-x20:n=1095:h=365 / 30f02c063165126f62a0964a83fef842d557b54fab6300c692ef69225bb94d41 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-defaults-irregular-intervals-1000 | 192 | 6 | 25 | 240 | 48 | 57 | 1000 | intervals | 67108864 | deterministic-piecewise-weekly-v2:n=192:h=48:irregular=true / 62f195edf2bc788b67f26471e00eee77ec55c61670a7c61be3c23230664418a1 | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | 96 | 4 | 1 | 8 | 0 | 0 | 128 | intervals | 67108864 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | 96 | 4 | 1 | 1 | 1 | 1 | 128 | samples | 67108864 | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-mixed-components-mixed-intervals-128 | 96 | 6 | 1 | 12 | 8 | 15 | 128 | intervals | 67108864 | linear-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 48c87b33c9ffb95217c18f0dc10baf441141cf937b79d1081d16f29057cd6b1c | docs/validation/uncertainty.md#evidence-classes |
| uncertainty-linear-mixed-components-mixed-samples-512 | 96 | 6 | 1 | 12 | 8 | 15 | 512 | samples | 67108864 | linear-mixed-components-v1:n=96:h=24:conditional-weekly+event+regressor / 48c87b33c9ffb95217c18f0dc10baf441141cf937b79d1081d16f29057cd6b1c | docs/validation/uncertainty.md#evidence-classes |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-training-duplicates | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | linear | 1 | 2 | 148 | 24 | 0 | 1 | 0 | n/a / n/a | overall / exclude | bb5b9efec3c622df6564bc5d4595789a6c4a12fc424a13f2d1e6bc9a64aa6790 |
| evaluation-linear-point | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall / exclude | n/a |
| evaluation-linear-intervals | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 64 | 19 / 0.8 | overall / exclude | n/a |
| evaluation-linear-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall / exclude | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
| evaluation-linear-failure-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 3 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | horizons / exclude | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93, 94447b1fe8ef74b557fb74394e1398e83dcd0e237d1ab301bac14978be162329 |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.017 | 0.013 | 0.017 | 136.9 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.463 | 0.483 | 0.453 | 0.483 | 146.1 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 175.735 | 177.283 | 170.969 | 177.283 | 153.0 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1618.365 | 1650.721 | 1614.677 | 1650.721 | 146.1 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 161.784 | 168.675 | 158.583 | 168.675 | 153.5 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1609.865 | 1657.265 | 1593.073 | 1657.265 | 146.1 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 0.957 | 1.046 | 0.908 | 1.046 | 153.5 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.324 | 3.525 | 3.235 | 3.525 | 146.1 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.076 | 0.097 | 0.076 | 0.097 | 153.0 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.542 | 0.562 | 0.530 | 0.562 | 146.1 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.982 | 5.749 | 4.942 | 5.749 | 153.0 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 26.919 | 27.308 | 26.661 | 27.308 | 146.1 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.260 | 5.893 | 5.141 | 5.893 | 150.5 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 26.827 | 29.212 | 26.522 | 29.212 | 146.1 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 6.239 | 7.606 | 5.377 | 7.606 | 149.8 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 20.931 | 21.578 | 20.806 | 21.578 | 146.1 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.218 | 0.231 | 0.190 | 0.231 | 149.8 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.366 | 5.495 | 5.328 | 5.495 | 146.1 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.021 | 0.013 | 0.021 | 135.3 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.461 | 0.479 | 0.441 | 0.479 | 124.7 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 171.457 | 190.602 | 168.332 | 190.602 | 153.1 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1529.779 | 1561.040 | 1463.713 | 1561.040 | 124.7 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 156.815 | 158.939 | 153.246 | 158.939 | 153.2 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1475.505 | 1514.631 | 1427.176 | 1514.631 | 124.7 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.436 | 0.540 | 0.378 | 0.540 | 153.2 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 4.016 | 4.504 | 3.953 | 4.504 | 124.7 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.023 | 0.033 | 0.017 | 0.033 | 153.1 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.714 | 0.785 | 0.678 | 0.785 | 124.7 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.722 | 3.815 | 3.631 | 3.815 | 152.8 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 23.010 | 25.076 | 22.732 | 25.076 | 124.7 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.922 | 3.995 | 3.794 | 3.995 | 152.4 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 22.268 | 23.988 | 22.160 | 23.988 | 124.7 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.455 | 4.866 | 4.119 | 4.866 | 143.6 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 17.677 | 18.748 | 17.311 | 18.748 | 124.7 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.186 | 0.210 | 0.166 | 0.210 | 146.1 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.711 | 4.879 | 4.692 | 4.879 | 124.7 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.025 | 0.013 | 0.025 | 138.2 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.459 | 0.639 | 0.434 | 0.639 | 124.7 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 168.460 | 178.059 | 167.787 | 178.059 | 157.4 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1473.157 | 1566.165 | 1448.546 | 1566.165 | 124.7 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 155.381 | 161.241 | 154.989 | 161.241 | 157.5 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1476.629 | 1550.556 | 1451.952 | 1550.556 | 124.7 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.402 | 0.504 | 0.383 | 0.504 | 157.5 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.948 | 4.059 | 3.915 | 4.059 | 124.7 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.023 | 0.029 | 0.016 | 0.029 | 157.4 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.676 | 0.744 | 0.664 | 0.744 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.039 | 6.069 | 3.873 | 6.069 | 156.9 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 23.399 | 23.669 | 23.152 | 23.669 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.247 | 5.831 | 4.037 | 5.831 | 156.7 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 23.058 | 23.537 | 22.888 | 23.537 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 4.950 | 6.442 | 4.425 | 6.442 | 148.1 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 18.527 | 22.505 | 18.306 | 22.505 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.181 | 0.218 | 0.170 | 0.218 | 150.6 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.688 | 4.829 | 4.639 | 4.829 | 124.7 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.017 | 0.013 | 0.017 | 139.3 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.474 | 0.534 | 0.431 | 0.534 | 146.8 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 174.465 | 180.493 | 172.514 | 180.493 | 154.9 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1668.339 | 1767.037 | 1595.087 | 1767.037 | 146.8 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 165.528 | 169.496 | 158.865 | 169.496 | 155.6 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1642.447 | 1762.868 | 1593.119 | 1762.868 | 146.8 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 1.086 | 1.171 | 1.033 | 1.171 | 155.6 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 4.037 | 4.196 | 3.998 | 4.196 | 146.8 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.119 | 0.145 | 0.090 | 0.145 | 154.9 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.683 | 0.732 | 0.678 | 0.732 | 146.8 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.490 | 5.251 | 4.480 | 5.251 | 154.9 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 28.794 | 29.953 | 27.191 | 29.953 | 146.8 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.740 | 5.085 | 4.657 | 5.085 | 153.1 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 31.304 | 39.900 | 29.871 | 39.900 | 146.8 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 6.180 | 6.516 | 5.019 | 6.516 | 152.6 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 21.615 | 25.367 | 20.335 | 25.367 | 146.8 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.220 | 0.247 | 0.218 | 0.247 | 152.8 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.721 | 6.429 | 5.607 | 6.429 | 146.8 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.016 | 0.029 | 0.013 | 0.029 | 139.5 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.456 | 0.471 | 0.442 | 0.471 | 147.9 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 171.436 | 182.791 | 170.130 | 182.791 | 157.1 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1620.589 | 1821.038 | 1608.321 | 1821.038 | 147.9 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 158.472 | 159.544 | 156.143 | 159.544 | 157.8 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1620.664 | 1669.689 | 1601.193 | 1669.689 | 147.9 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.977 | 1.003 | 0.727 | 1.003 | 157.6 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.989 | 4.265 | 3.894 | 4.265 | 147.9 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.096 | 0.106 | 0.083 | 0.106 | 157.1 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.695 | 0.730 | 0.664 | 0.730 | 147.9 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.974 | 5.359 | 4.772 | 5.359 | 157.0 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 27.947 | 30.169 | 27.577 | 30.169 | 147.9 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.957 | 5.524 | 4.882 | 5.524 | 155.1 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 30.063 | 30.741 | 27.425 | 30.741 | 147.9 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 6.249 | 7.059 | 5.185 | 7.059 | 154.6 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 21.518 | 21.950 | 21.177 | 21.950 | 147.9 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.234 | 0.338 | 0.212 | 0.338 | 154.6 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.467 | 5.591 | 5.419 | 5.591 | 147.9 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.293 | 6.959 | 6.025 | 6.959 | 157.6 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 30.281 | 31.139 | 30.131 | 31.139 | 124.7 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.203 | 0.272 | 0.187 | 0.272 | 158.9 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.006 | 0.004 | 0.006 | 124.7 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.252 | 0.283 | 0.240 | 0.283 | 158.1 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 124.7 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 20.768 | 27.213 | 19.856 | 27.213 | 156.9 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 155.695 | 160.632 | 150.658 | 160.632 | 124.7 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 9.425 | 12.958 | 9.231 | 12.958 | 145.4 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 77.395 | 79.164 | 77.353 | 79.164 | 124.7 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 189.140 | 196.349 | 185.798 | 196.349 | 156.6 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1519.897 | 1555.978 | 1494.716 | 1555.978 | 124.7 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.065 | 2.576 | 1.065 | 2.576 | 156.5 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.098 | 1.200 | 1.066 | 1.200 | 124.7 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.010 | 0.012 | 0.009 | 0.012 | 126.2 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.419 | 0.459 | 0.372 | 0.459 | 124.7 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.203 | 0.216 | 0.195 | 0.216 | 150.1 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.863 | 6.191 | 5.618 | 6.191 | 124.7 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.117 | 1.249 | 1.035 | 1.249 | 130.8 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.627 | 0.730 | 0.616 | 0.730 | 124.7 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 9.695 | 10.122 | 9.438 | 10.122 | 146.9 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 71.144 | 72.980 | 69.990 | 72.980 | 124.7 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.092 | 6.416 | 6.082 | 6.416 | 155.0 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 30.569 | 31.835 | 30.443 | 31.835 | 124.7 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.199 | 0.214 | 0.189 | 0.214 | 157.2 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 124.7 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.240 | 0.247 | 0.231 | 0.247 | 157.1 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 124.7 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 20.552 | 23.921 | 20.267 | 23.921 | 154.4 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 151.523 | 160.838 | 150.344 | 160.838 | 124.7 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.606 | 1.826 | 1.573 | 1.826 | 150.8 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.371 | 1.443 | 1.365 | 1.443 | 124.7 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.952 | 4.228 | 3.736 | 4.228 | 156.2 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 22.188 | 24.423 | 21.921 | 24.423 | 124.7 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.984 | 1.188 | 0.910 | 1.188 | 130.3 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.886 | 0.936 | 0.884 | 0.936 | 124.7 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 5.883 | 7.222 | 5.816 | 7.222 | 145.0 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 52.695 | 53.709 | 52.517 | 53.709 | 124.7 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.206 | 0.226 | 0.199 | 0.226 | 156.7 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 124.7 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.314 | 0.729 | 0.295 | 0.729 | 156.5 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.013 | 0.007 | 0.013 | 124.7 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 5.977 | 6.612 | 5.587 | 6.612 | 155.8 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 58.158 | 60.597 | 55.248 | 60.597 | 124.7 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.022 | 0.065 | 0.014 | 0.070 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.557 | 0.582 | 0.541 | 0.588 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.280 | 0.719 | 0.238 | 1.902 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.658 | 2.714 | 2.615 | 2.741 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.030 | 0.041 | 0.029 | 0.041 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.506 | 0.522 | 0.487 | 0.522 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 174.519 | 182.829 | 168.721 | 182.829 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1439.823 | 1479.731 | 1433.006 | 1479.731 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 159.779 | 212.353 | 155.766 | 212.353 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1436.386 | 1634.168 | 1414.575 | 1634.168 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.138 | 0.162 | 0.122 | 0.162 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.279 | 2.489 | 2.236 | 2.489 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.027 | 0.035 | 0.024 | 0.035 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.535 | 0.580 | 0.532 | 0.580 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.246 | 6.679 | 6.080 | 6.679 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.152 | 17.388 | 17.081 | 17.388 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.215 | 6.359 | 6.155 | 6.359 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.810 | 17.425 | 16.573 | 17.425 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 7.006 | 7.160 | 6.254 | 7.160 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.428 | 13.736 | 13.258 | 13.736 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.414 | 0.425 | 0.362 | 0.425 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.068 | 3.110 | 3.022 | 3.110 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.041 | 0.075 | 0.040 | 0.075 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.542 | 0.580 | 0.521 | 0.580 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 200.399 | 232.410 | 192.462 | 232.410 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1539.822 | 1707.801 | 1510.485 | 1707.801 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 158.916 | 203.284 | 158.268 | 203.284 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1435.588 | 1467.928 | 1416.076 | 1467.928 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.164 | 0.206 | 0.142 | 0.206 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.371 | 2.646 | 2.251 | 2.646 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.036 | 0.049 | 0.026 | 0.049 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.615 | 0.679 | 0.591 | 0.679 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 25.755 | 28.048 | 25.559 | 28.048 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 91.607 | 99.961 | 90.232 | 99.961 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 25.957 | 28.201 | 25.707 | 28.201 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 89.876 | 96.950 | 89.405 | 96.950 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.836 | 28.317 | 26.154 | 28.317 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 86.252 | 91.375 | 85.169 | 91.375 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.328 | 0.346 | 0.300 | 0.346 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.194 | 3.291 | 3.123 | 3.291 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.009 | 0.006 | 0.009 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.431 | 0.496 | 0.403 | 0.496 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 189.715 | 199.071 | 185.375 | 199.071 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1484.887 | 1538.227 | 1473.715 | 1538.227 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 154.061 | 166.110 | 151.270 | 166.110 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1465.620 | 1607.800 | 1450.697 | 1607.800 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.192 | 0.210 | 0.147 | 0.210 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.057 | 2.180 | 2.019 | 2.180 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.038 | 0.060 | 0.027 | 0.060 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.366 | 0.412 | 0.346 | 0.412 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 18.049 | 18.272 | 17.991 | 18.272 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 64.157 | 68.099 | 63.946 | 68.099 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 17.946 | 18.052 | 17.908 | 18.052 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 63.194 | 64.243 | 62.995 | 64.243 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.239 | 18.577 | 18.157 | 18.577 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 60.419 | 62.576 | 60.221 | 62.576 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.225 | 0.290 | 0.194 | 0.290 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.132 | 3.176 | 3.041 | 3.176 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.063 | 0.084 | 0.051 | 0.084 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.513 | 0.528 | 0.510 | 0.528 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 183.800 | 243.640 | 168.695 | 243.640 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1530.692 | 1614.762 | 1493.405 | 1614.762 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 163.816 | 184.909 | 156.509 | 184.909 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1527.282 | 1550.841 | 1473.071 | 1550.841 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.188 | 0.252 | 0.154 | 0.252 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.713 | 3.918 | 3.642 | 3.918 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.036 | 0.081 | 0.035 | 0.081 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.701 | 0.714 | 0.671 | 0.714 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.595 | 4.854 | 4.593 | 4.854 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 27.469 | 28.574 | 27.263 | 28.574 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.826 | 4.992 | 4.787 | 4.992 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 27.518 | 28.779 | 27.166 | 28.779 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.368 | 5.547 | 5.133 | 5.547 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 22.850 | 24.415 | 22.738 | 24.415 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.447 | 0.505 | 0.424 | 0.505 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.792 | 5.332 | 4.736 | 5.332 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.017 | 0.020 | 0.016 | 0.020 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.485 | 0.515 | 0.481 | 0.515 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 174.205 | 181.361 | 167.975 | 181.361 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1479.048 | 1507.963 | 1470.952 | 1507.963 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 152.143 | 155.005 | 151.519 | 155.005 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1438.746 | 1506.694 | 1437.490 | 1506.694 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.103 | 0.107 | 0.102 | 0.107 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.207 | 2.360 | 2.195 | 2.360 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.023 | 0.041 | 0.021 | 0.041 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.420 | 0.445 | 0.419 | 0.445 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.194 | 6.646 | 4.760 | 6.646 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 27.037 | 34.607 | 26.824 | 34.607 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.370 | 5.864 | 5.356 | 5.864 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.929 | 27.156 | 26.545 | 27.156 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 4.876 | 6.988 | 4.860 | 6.988 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 24.789 | 26.347 | 23.990 | 26.347 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.183 | 0.317 | 0.153 | 0.317 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.012 | 3.162 | 2.958 | 3.162 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.022 | 0.015 | 0.022 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.457 | 0.483 | 0.455 | 0.483 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 172.746 | 173.655 | 171.753 | 173.655 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1493.034 | 1512.001 | 1488.914 | 1512.001 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 168.120 | 186.922 | 159.326 | 186.922 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1426.357 | 1468.195 | 1424.906 | 1468.195 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.105 | 0.121 | 0.102 | 0.121 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.229 | 2.353 | 2.212 | 2.353 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.020 | 0.030 | 0.019 | 0.030 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.443 | 0.503 | 0.407 | 0.503 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.141 | 6.544 | 4.757 | 6.544 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.384 | 26.847 | 26.361 | 26.847 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.352 | 5.423 | 5.191 | 5.423 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.088 | 26.295 | 25.967 | 26.295 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.348 | 6.472 | 4.863 | 6.472 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 25.016 | 27.734 | 23.568 | 27.734 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.172 | 0.256 | 0.155 | 0.256 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.105 | 3.303 | 3.073 | 3.303 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.071 | 0.106 | 0.062 | 0.106 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.639 | 0.665 | 0.633 | 0.665 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 178.547 | 216.221 | 172.039 | 216.221 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1426.442 | 1439.763 | 1417.065 | 1439.763 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 161.483 | 185.397 | 158.648 | 185.397 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1418.016 | 1440.789 | 1408.731 | 1440.789 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.121 | 0.214 | 0.105 | 0.214 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.633 | 2.742 | 2.626 | 2.742 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.022 | 0.028 | 0.018 | 0.028 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.627 | 0.643 | 0.617 | 0.643 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.552 | 3.190 | 2.511 | 3.190 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.489 | 16.572 | 16.082 | 16.572 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.750 | 3.253 | 2.620 | 3.253 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 15.813 | 17.064 | 15.484 | 17.064 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 3.535 | 4.284 | 2.510 | 4.284 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 12.080 | 12.256 | 11.798 | 12.256 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.412 | 0.439 | 0.403 | 0.439 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.850 | 3.904 | 3.812 | 3.904 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.029 | 0.014 | 0.029 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.455 | 0.491 | 0.442 | 0.491 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 180.997 | 201.721 | 172.647 | 201.721 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1450.797 | 1546.866 | 1444.792 | 1546.866 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 165.931 | 190.860 | 159.542 | 190.860 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1452.547 | 1533.403 | 1424.766 | 1533.403 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.181 | 0.297 | 0.160 | 0.297 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.347 | 3.624 | 3.289 | 3.624 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.019 | 0.035 | 0.015 | 0.035 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.614 | 0.650 | 0.598 | 0.650 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.383 | 6.486 | 6.352 | 6.486 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 34.210 | 36.105 | 33.959 | 36.105 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.526 | 8.677 | 6.498 | 8.677 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 33.532 | 34.117 | 33.203 | 34.117 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 6.958 | 8.139 | 6.775 | 8.139 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 29.580 | 29.859 | 29.371 | 29.859 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.429 | 0.516 | 0.388 | 0.516 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.219 | 4.274 | 4.201 | 4.274 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.010 | 0.005 | 0.010 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.442 | 0.472 | 0.433 | 0.472 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 187.466 | 220.922 | 183.500 | 220.922 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1434.165 | 1464.556 | 1426.318 | 1464.556 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 177.127 | 193.836 | 157.658 | 193.836 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1421.227 | 1621.758 | 1413.959 | 1621.758 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.143 | 0.195 | 0.088 | 0.195 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.018 | 2.086 | 2.005 | 2.086 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.025 | 0.044 | 0.019 | 0.044 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.369 | 0.443 | 0.360 | 0.443 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.894 | 2.394 | 1.772 | 2.394 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 14.071 | 15.672 | 13.897 | 15.672 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.745 | 2.189 | 1.659 | 2.189 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.697 | 14.622 | 13.186 | 14.622 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.939 | 2.551 | 1.881 | 2.551 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 11.672 | 12.847 | 11.326 | 12.847 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.259 | 0.353 | 0.222 | 0.353 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.721 | 2.856 | 2.604 | 2.856 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.197 | 0.282 | 0.194 | 0.282 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.110 | 1.133 | 1.097 | 1.133 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 199.871 | 212.823 | 191.102 | 212.823 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1457.710 | 1542.021 | 1451.107 | 1542.021 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 170.884 | 190.358 | 166.929 | 190.358 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1437.126 | 1466.490 | 1431.482 | 1466.490 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.246 | 0.253 | 0.238 | 0.253 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.668 | 10.352 | 5.622 | 10.352 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.033 | 0.055 | 0.032 | 0.055 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.725 | 1.778 | 1.714 | 1.778 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.134 | 11.832 | 10.649 | 11.832 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 44.583 | 44.847 | 44.562 | 44.847 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 11.438 | 17.970 | 11.320 | 17.970 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 43.228 | 45.393 | 43.215 | 45.393 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 12.220 | 13.472 | 11.594 | 13.472 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.259 | 37.788 | 37.104 | 37.788 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 1.435 | 2.043 | 1.318 | 2.043 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.151 | 6.174 | 6.100 | 6.174 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.028 | 0.011 | 0.028 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.480 | 0.501 | 0.463 | 0.501 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 173.524 | 210.930 | 164.102 | 210.930 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1473.996 | 1526.183 | 1447.113 | 1526.183 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 153.522 | 163.866 | 152.973 | 163.866 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1450.346 | 1527.178 | 1424.971 | 1527.178 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.191 | 0.217 | 0.145 | 0.217 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.556 | 3.783 | 3.517 | 3.783 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.031 | 0.048 | 0.021 | 0.048 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.581 | 0.634 | 0.572 | 0.634 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.781 | 2.084 | 1.597 | 2.084 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 17.551 | 22.310 | 16.394 | 22.310 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.667 | 4.619 | 1.620 | 4.619 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 15.934 | 20.793 | 15.606 | 20.793 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.929 | 4.960 | 1.911 | 4.960 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 11.134 | 15.137 | 10.943 | 15.137 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.179 | 0.544 | 0.135 | 0.544 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 5.025 | 7.436 | 4.855 | 7.436 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.089 | 0.104 | 0.055 | 0.104 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.657 | 0.699 | 0.654 | 0.699 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 179.064 | 198.391 | 170.439 | 198.391 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1464.910 | 1550.116 | 1439.676 | 1550.116 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 161.335 | 189.964 | 158.891 | 189.964 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1451.549 | 1458.342 | 1418.280 | 1458.342 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.109 | 0.121 | 0.087 | 0.121 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 2.990 | 3.183 | 2.980 | 3.183 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.023 | 0.039 | 0.015 | 0.039 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.753 | 0.782 | 0.727 | 0.782 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.484 | 3.195 | 2.468 | 3.195 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 14.596 | 16.719 | 14.348 | 16.719 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.746 | 2.978 | 2.683 | 2.978 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 13.471 | 13.996 | 13.441 | 13.996 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.725 | 2.864 | 2.580 | 2.864 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.156 | 27.139 | 9.878 | 27.139 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.485 | 0.943 | 0.454 | 0.943 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.567 | 3.937 | 3.479 | 3.937 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.031 | 0.036 | 0.029 | 0.036 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.548 | 0.852 | 0.518 | 0.852 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 158.895 | 166.168 | 154.773 | 166.168 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1437.321 | 1447.830 | 1432.012 | 1447.830 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.097 | 0.116 | 0.089 | 0.116 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.244 | 2.342 | 2.217 | 2.342 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.016 | 0.023 | 0.015 | 0.023 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.513 | 0.530 | 0.506 | 0.530 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.434 | 1.852 | 1.355 | 1.852 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.702 | 11.935 | 11.569 | 11.935 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.535 | 2.438 | 1.384 | 2.438 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.210 | 13.146 | 10.982 | 13.146 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.093 | 2.591 | 1.794 | 2.591 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 8.300 | 15.468 | 8.019 | 15.468 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.389 | 0.501 | 0.325 | 0.501 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.326 | 3.688 | 3.177 | 3.688 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 161.395 | 168.217 | 157.097 | 168.217 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1462.333 | 1520.364 | 1453.387 | 1520.364 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.203 | 0.240 | 0.201 | 0.240 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.444 | 2.462 | 2.443 | 2.462 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.026 | 0.037 | 0.026 | 0.037 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.465 | 0.556 | 0.452 | 0.556 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 32.344 | 34.342 | 30.729 | 34.342 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 111.732 | 132.321 | 111.717 | 132.321 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.256 | 0.360 | 0.251 | 0.360 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.692 | 5.323 | 3.672 | 5.323 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 155.956 | 195.815 | 152.664 | 195.815 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1445.569 | 1688.090 | 1412.809 | 1688.090 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.164 | 0.172 | 0.162 | 0.172 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.041 | 2.076 | 2.000 | 2.076 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.019 | 0.032 | 0.019 | 0.032 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.392 | 0.406 | 0.382 | 0.406 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 27.214 | 28.427 | 26.214 | 28.427 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 83.392 | 84.850 | 82.826 | 84.850 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.138 | 0.188 | 0.131 | 0.188 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.623 | 2.833 | 2.599 | 2.833 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 157.693 | 161.544 | 155.207 | 161.544 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1431.941 | 1475.037 | 1412.518 | 1475.037 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.149 | 0.206 | 0.134 | 0.206 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.014 | 2.084 | 2.003 | 2.084 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.019 | 0.025 | 0.017 | 0.025 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.398 | 0.411 | 0.380 | 0.411 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 4.128 | 4.268 | 3.900 | 4.268 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 19.648 | 20.418 | 19.299 | 20.418 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.173 | 0.262 | 0.160 | 0.262 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.690 | 2.803 | 2.640 | 2.803 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 155.098 | 156.409 | 153.991 | 156.409 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1477.505 | 1535.838 | 1470.867 | 1535.838 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.152 | 0.236 | 0.145 | 0.236 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.100 | 2.202 | 2.090 | 2.202 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.025 | 0.046 | 0.021 | 0.046 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.430 | 0.443 | 0.426 | 0.443 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 31.383 | 33.340 | 30.778 | 33.340 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 107.217 | 124.862 | 106.078 | 124.862 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.164 | 0.232 | 0.162 | 0.232 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.676 | 3.199 | 2.650 | 3.199 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 152.759 | 158.554 | 151.091 | 158.554 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1483.049 | 1525.457 | 1452.990 | 1525.457 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.136 | 0.149 | 0.128 | 0.149 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.090 | 3.273 | 2.072 | 3.273 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.023 | 0.045 | 0.018 | 0.045 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.424 | 0.435 | 0.411 | 0.435 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 4.170 | 4.405 | 4.135 | 4.405 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 21.748 | 25.934 | 20.090 | 25.934 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.157 | 0.394 | 0.132 | 0.394 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.694 | 3.696 | 2.669 | 3.696 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 156.014 | 244.932 | 155.608 | 244.932 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1432.103 | 1505.206 | 1427.811 | 1505.206 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.174 | 0.197 | 0.172 | 0.197 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.114 | 2.392 | 2.100 | 2.392 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.020 | 0.025 | 0.019 | 0.025 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.419 | 0.433 | 0.407 | 0.433 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 31.087 | 31.951 | 30.875 | 31.951 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 106.581 | 108.055 | 106.528 | 108.055 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.163 | 0.199 | 0.159 | 0.199 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.663 | 2.788 | 2.646 | 2.788 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 156.138 | 160.873 | 151.129 | 160.873 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1430.418 | 1485.377 | 1413.078 | 1485.377 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.142 | 0.175 | 0.129 | 0.175 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.088 | 2.269 | 2.047 | 2.269 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.022 | 0.025 | 0.019 | 0.025 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.409 | 0.438 | 0.397 | 0.438 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 4.165 | 4.634 | 3.924 | 4.634 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 21.169 | 22.849 | 20.390 | 22.849 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.163 | 0.259 | 0.129 | 0.259 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.765 | 3.265 | 2.652 | 3.265 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 195.734 | 226.397 | 185.352 | 226.397 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1638.386 | 1710.987 | 1608.566 | 1710.987 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 185.315 | 204.959 | 171.915 | 204.959 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1666.244 | 1866.922 | 1650.279 | 1866.922 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.201 | 0.222 | 0.195 | 0.222 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.302 | 2.462 | 2.274 | 2.462 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.021 | 0.043 | 0.019 | 0.043 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.571 | 0.594 | 0.531 | 0.594 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.055 | 0.060 | 0.051 | 0.060 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.585 | 0.606 | 0.580 | 0.606 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 12.392 | 13.145 | 11.778 | 13.145 | 145.7 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 157.432 | 191.824 | 154.732 | 191.824 | 126.2 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 356.636 | 362.455 | 352.058 | 362.455 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2194.129 | 2446.138 | 2128.485 | 2446.138 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 246.020 | 265.035 | 241.557 | 265.035 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1816.067 | 1846.959 | 1801.567 | 1846.959 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.286 | 0.527 | 0.209 | 0.527 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.537 | 3.724 | 3.505 | 3.724 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.025 | 0.050 | 0.019 | 0.050 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.455 | 1.492 | 1.411 | 1.492 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.063 | 0.133 | 0.053 | 0.133 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.467 | 1.532 | 1.450 | 1.532 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 69.150 | 69.317 | 68.746 | 69.317 | 156.7 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 399.102 | 487.131 | 380.619 | 487.131 | 162.3 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 205.057 | 236.151 | 182.298 | 236.151 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1556.615 | 1830.752 | 1479.614 | 1830.752 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.526 | 181.322 | 161.374 | 181.322 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1486.176 | 1511.677 | 1467.394 | 1511.677 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.239 | 0.295 | 0.219 | 0.295 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.727 | 4.115 | 3.659 | 4.115 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.024 | 0.032 | 0.021 | 0.032 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.692 | 0.753 | 0.686 | 0.753 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.063 | 0.073 | 0.037 | 0.073 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.540 | 0.568 | 0.510 | 0.568 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.460 | 0.659 | 0.393 | 0.659 | 141.5 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.309 | 69.830 | 24.716 | 69.830 | 124.7 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 177.348 | 224.165 | 175.420 | 224.165 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1530.225 | 1594.567 | 1526.843 | 1594.567 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.927 | 180.044 | 156.927 | 180.044 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1489.591 | 1555.627 | 1474.699 | 1555.627 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.223 | 0.270 | 0.219 | 0.270 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.577 | 3.793 | 3.546 | 3.793 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.024 | 0.033 | 0.020 | 0.033 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.653 | 0.715 | 0.641 | 0.715 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.042 | 0.075 | 0.037 | 0.075 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.506 | 0.579 | 0.499 | 0.579 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.985 | 1.101 | 0.739 | 1.101 | 140.7 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 69.314 | 89.018 | 67.622 | 89.018 | 124.7 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 172.607 | 180.835 | 171.100 | 180.835 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1501.824 | 1601.776 | 1454.040 | 1601.776 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 169.195 | 203.959 | 159.138 | 203.959 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1468.887 | 1543.613 | 1453.816 | 1543.613 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.157 | 0.186 | 0.132 | 0.186 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.268 | 3.060 | 2.115 | 3.060 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.017 | 0.024 | 0.017 | 0.024 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.451 | 0.481 | 0.424 | 0.481 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.016 | 0.018 | 0.013 | 0.018 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.477 | 0.585 | 0.432 | 0.585 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.323 | 0.380 | 0.301 | 0.380 | 138.8 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 21.117 | 24.291 | 20.518 | 24.291 | 124.7 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 183.782 | 214.639 | 173.265 | 214.639 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1470.319 | 1550.560 | 1448.578 | 1550.560 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.370 | 185.536 | 154.276 | 185.536 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1444.427 | 1502.723 | 1436.624 | 1502.723 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.158 | 0.187 | 0.140 | 0.187 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.230 | 2.419 | 2.123 | 2.419 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.025 | 0.039 | 0.017 | 0.039 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.400 | 0.485 | 0.389 | 0.485 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.016 | 0.013 | 0.016 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.517 | 0.647 | 0.478 | 0.647 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.219 | 0.235 | 0.193 | 0.235 | 137.7 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.521 | 18.233 | 16.282 | 18.233 | 124.7 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 158.995 | 162.612 | 158.249 | 162.612 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1487.051 | 1559.921 | 1471.550 | 1559.921 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.428 | 1.238 | 0.409 | 1.238 | 137.1 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 17.801 | 22.119 | 17.163 | 22.119 | 124.7 |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>19:18:10 - cmdstanpy - INFO - Chain [1] start processing<br>19:18:10 - cmdstanpy - INFO - Chain [1] done processing<br>19:18:10 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=32277 data file=/tmp/tmpseg63wka/hedw9uvs.json init=/tmp/tmpseg63wka/t464dmii.json output file=/tmp/tmpseg63wka/prophet_model7rkngsp_/prophet_model-20261022191810.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpseg63wka/hedw9uvs.json<br>init = /tmp/tmpseg63wka/t464dmii.json<br>random<br>  seed = 32277<br>output<br>  file = /tmp/tmpseg63wka/prophet_model7rkngsp_/prophet_model-20261022191810.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 773, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 271, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 228, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=32277 data file=/tmp/tmpseg63wka/hedw9uvs.json init=/tmp/tmpseg63wka/t464dmii.json output file=/tmp/tmpseg63wka/prophet_model7rkngsp_/prophet_model-20261022191810.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpseg63wk |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>19:18:12 - cmdstanpy - INFO - Chain [1] start processing<br>19:18:12 - cmdstanpy - INFO - Chain [1] done processing<br>19:18:12 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=63964 data file=/tmp/tmplytkglgc/kj5219vz.json init=/tmp/tmplytkglgc/hewr082p.json output file=/tmp/tmplytkglgc/prophet_model0plg222v/prophet_model-20261022191812.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmplytkglgc/kj5219vz.json<br>init = /tmp/tmplytkglgc/hewr082p.json<br>random<br>  seed = 63964<br>output<br>  file = /tmp/tmplytkglgc/prophet_model0plg222v/prophet_model-20261022191812.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 773, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 271, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 228, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=63964 data file=/tmp/tmplytkglgc/kj5219vz.json init=/tmp/tmplytkglgc/hewr082p.json output file=/tmp/tmplytkglgc/prophet_model0plg222v/prophet_model-20261022191812.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmplytkglg |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 776, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 378, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 776, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 378, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `bc4f2208715745367a9d8a2b9708bfefd1a48b2d`
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `country-us-linear-additive`, `country-explicit-us-linear-additive`, `country-us-linear-multiplicative`, `country-explicit-us-linear-multiplicative`, `country-boundary-linear`, `linear-defaults-small`, `linear-defaults-medium`, `linear-defaults-irregular`, `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `evaluation-training-duplicates`, `linear-offset-scaling-absmax`, `linear-offset-scaling-minmax`, `linear-mixed-components`, `uncertainty-linear-defaults-long-history-intervals-1000`, `uncertainty-linear-defaults-irregular-intervals-1000`, `uncertainty-linear-offset-scaling-absmax-historical-intervals-128`, `uncertainty-linear-offset-scaling-absmax-one-future-samples-128`, `uncertainty-linear-mixed-components-mixed-intervals-128`, `uncertainty-linear-mixed-components-mixed-samples-512`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-linear-failure-search`
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

