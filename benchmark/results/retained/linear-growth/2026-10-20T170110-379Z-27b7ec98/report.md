# Effect Prophet benchmark — 2026-10-20T170110-379Z-27b7ec98

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Interval bounds | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| fixed-linear-prediction-medium | equivalent-equation | passed | 1.421e-14 | 0.000e+0 | 0.000e+0 | 1.421e-14 | 0.000e+0 | n/a | Verified equivalent behavior for this configuration under evidence fixed-linear-equation-v1. |
| map-explicit-break-small | equivalent-objective | passed | 1.018e-11 | 0.000e+0 | 0.000e+0 | 1.018e-11 | 4.041e-14 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-seasonal-breaks-irregular-medium | equivalent-objective | passed | 6.301e-5 | 1.686e-5 | 1.686e-5 | 6.877e-5 | 1.344e-5 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-explicit-small | equivalent-objective | passed | 7.887e-13 | 1.212e-12 | 1.281e-12 | 1.020e-12 | 1.101e-13 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-automatic-large | equivalent-objective | passed | 5.158e-3 | 1.775e-3 | 2.989e-3 | 6.924e-3 | 1.031e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in stationarity-residual. |
| map-events-small | equivalent-objective | passed | 7.304e-12 | 2.315e-12 | 2.315e-12 | 7.304e-12 | 5.540e-13 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-regressors-medium | equivalent-objective | passed | 3.086e-3 | 1.054e-4 | 1.907e-4 | 3.130e-3 | 4.650e-4 | n/a | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
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
| country-us-linear-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12501 | 23713 |
| country-us-linear-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12501 | 23713 |
| country-explicit-us-linear-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3782 | 26529 |
| country-explicit-us-linear-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3782 | 26529 |
| country-us-linear-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12532 | 23723 |
| country-us-linear-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2024 | 12 | 12532 | 23723 |
| country-explicit-us-linear-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3801 | 26539 |
| country-explicit-us-linear-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | false | n/a | 12 | 3801 | 26539 |
| country-boundary-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2010 | 13 | 11765 | 23981 |
| country-boundary-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:57d9b33f0f7999c0bbda5aa00588b7c4553117bea2e9449ad1f9a94bc665b3f7 | true | 2010 | 13 | 11765 | 23981 |

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
| map-mixed-features-automatic-large | 0 | 1.761731e+2 | 1.734560e+2 | 2.717050e+0 | output-first | n/a |
| map-mixed-features-automatic-large | 1 | 1.761731e+2 | 1.734560e+2 | 2.717050e+0 | output-first | n/a |
| map-events-small | 0 | 1.662652e-1 | 1.662652e-1 | 3.640158e-9 | output-first | n/a |
| map-events-small | 1 | 1.662652e-1 | 1.662652e-1 | 3.640158e-9 | output-first | n/a |
| map-regressors-medium | 0 | 2.268414e+1 | 3.524345e+1 | 1.255931e+1 | output-first | n/a |
| map-regressors-medium | 1 | 2.268414e+1 | 3.524345e+1 | 1.255931e+1 | output-first | n/a |
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
| map-mixed-features-automatic-large | 0 | stationarity-residual | 1.761731e+2 | 1.734560e+2 | 2.717050e+0 | 1.000e-2 |
| map-mixed-features-automatic-large | 1 | stationarity-residual | 1.761731e+2 | 1.734560e+2 | 2.717050e+0 | 1.000e-2 |
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
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.020 | 0.013 | 0.020 | 137.3 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.474 | 0.575 | 0.422 | 0.575 | 146.3 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 172.667 | 174.300 | 169.890 | 174.300 | 152.8 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1616.085 | 1744.222 | 1586.562 | 1744.222 | 146.3 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 159.036 | 162.441 | 156.847 | 162.441 | 153.6 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1578.918 | 1587.860 | 1574.431 | 1587.860 | 146.3 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 0.956 | 0.973 | 0.939 | 0.973 | 153.6 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.373 | 3.708 | 3.180 | 3.708 | 146.3 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.081 | 0.094 | 0.077 | 0.094 | 152.8 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.537 | 0.566 | 0.495 | 0.566 | 146.3 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.131 | 5.887 | 4.890 | 5.887 | 152.8 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 28.352 | 33.528 | 27.117 | 33.528 | 146.3 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.501 | 5.805 | 5.173 | 5.805 | 150.8 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 27.225 | 49.535 | 26.131 | 49.535 | 146.3 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 6.443 | 7.847 | 5.452 | 7.847 | 150.2 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 20.727 | 23.113 | 20.414 | 23.113 | 146.3 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.217 | 0.236 | 0.199 | 0.236 | 150.2 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.306 | 5.424 | 5.296 | 5.424 | 146.3 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.031 | 0.012 | 0.031 | 131.0 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.493 | 0.766 | 0.473 | 0.766 | 124.8 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 174.800 | 197.136 | 169.144 | 197.136 | 147.9 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1514.188 | 1841.945 | 1456.289 | 1841.945 | 124.8 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 156.440 | 162.878 | 154.162 | 162.878 | 148.2 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1484.552 | 1556.090 | 1483.152 | 1556.090 | 124.8 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.395 | 0.533 | 0.392 | 0.533 | 147.9 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 4.157 | 4.736 | 4.000 | 4.736 | 124.8 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.025 | 0.035 | 0.021 | 0.035 | 147.9 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.709 | 0.751 | 0.686 | 0.751 | 124.8 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.798 | 4.082 | 3.683 | 4.082 | 147.8 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 22.848 | 28.070 | 22.375 | 28.070 | 124.8 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.972 | 5.048 | 3.850 | 5.048 | 147.5 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 22.363 | 23.930 | 22.285 | 23.930 | 124.8 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.552 | 4.816 | 4.210 | 4.816 | 139.0 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 18.773 | 21.095 | 18.449 | 21.095 | 124.8 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.190 | 0.217 | 0.177 | 0.217 | 141.5 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.803 | 5.237 | 4.767 | 5.237 | 124.8 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.015 | 0.013 | 0.015 | 133.7 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.473 | 0.537 | 0.433 | 0.537 | 124.8 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 172.441 | 176.082 | 169.719 | 176.082 | 155.7 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1521.236 | 1551.701 | 1456.057 | 1551.701 | 124.8 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 158.895 | 160.321 | 154.736 | 160.321 | 155.7 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1466.807 | 1508.418 | 1424.736 | 1508.418 | 124.8 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.421 | 0.537 | 0.384 | 0.537 | 155.7 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 4.016 | 4.242 | 3.905 | 4.242 | 124.8 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.022 | 0.036 | 0.016 | 0.036 | 155.7 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.733 | 0.768 | 0.699 | 0.768 | 124.8 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.069 | 5.153 | 3.895 | 5.153 | 155.2 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 25.626 | 28.985 | 24.055 | 28.985 | 124.8 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.663 | 6.327 | 4.124 | 6.327 | 155.1 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 25.793 | 26.427 | 23.769 | 26.427 | 124.8 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 5.454 | 5.933 | 4.740 | 5.933 | 145.4 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 18.769 | 20.150 | 18.473 | 20.150 | 124.8 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.182 | 0.206 | 0.174 | 0.206 | 148.2 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.838 | 6.916 | 4.720 | 6.916 | 124.8 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.017 | 0.013 | 0.017 | 130.0 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.460 | 0.492 | 0.456 | 0.492 | 146.9 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 173.539 | 186.850 | 170.010 | 186.850 | 146.9 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1654.626 | 2061.123 | 1636.721 | 2061.123 | 146.9 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 164.189 | 177.904 | 155.479 | 177.904 | 147.5 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1643.327 | 1698.749 | 1573.571 | 1698.749 | 146.9 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.960 | 0.986 | 0.947 | 0.986 | 147.5 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 4.302 | 4.515 | 3.937 | 4.515 | 146.9 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.104 | 0.122 | 0.083 | 0.122 | 146.9 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.720 | 0.950 | 0.711 | 0.950 | 146.9 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.528 | 5.262 | 4.428 | 5.262 | 146.6 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 28.509 | 51.724 | 26.855 | 51.724 | 146.9 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 5.010 | 6.624 | 4.647 | 6.624 | 144.9 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 28.228 | 32.181 | 26.533 | 32.181 | 146.9 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 5.808 | 6.998 | 4.877 | 6.998 | 144.0 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 20.589 | 22.737 | 19.896 | 22.737 | 146.9 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.214 | 0.220 | 0.213 | 0.220 | 144.3 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.362 | 5.491 | 5.278 | 5.491 | 146.9 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.011 | 0.014 | 133.3 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.466 | 0.517 | 0.444 | 0.517 | 146.9 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 172.444 | 175.553 | 169.702 | 175.553 | 153.4 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1634.841 | 1760.628 | 1592.975 | 1760.628 | 146.9 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 161.226 | 168.395 | 159.078 | 168.395 | 154.0 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1623.022 | 1677.346 | 1593.828 | 1677.346 | 146.9 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.968 | 1.017 | 0.937 | 1.017 | 154.0 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.982 | 4.135 | 3.862 | 4.135 | 146.9 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.092 | 0.109 | 0.077 | 0.109 | 153.4 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.675 | 0.731 | 0.655 | 0.731 | 146.9 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.952 | 6.024 | 4.818 | 6.024 | 153.3 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 27.433 | 35.689 | 27.160 | 35.689 | 146.9 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 4.927 | 5.441 | 4.900 | 5.441 | 151.3 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 28.524 | 33.580 | 27.438 | 33.580 | 146.9 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 6.211 | 7.129 | 5.287 | 7.129 | 150.4 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 23.768 | 25.795 | 21.856 | 25.795 | 146.9 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.240 | 0.345 | 0.211 | 0.345 | 150.6 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.938 | 6.617 | 5.441 | 6.617 | 146.9 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.195 | 6.411 | 6.081 | 6.411 | 152.8 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 31.566 | 41.505 | 29.974 | 41.505 | 124.8 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.218 | 0.525 | 0.196 | 0.525 | 154.0 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.006 | 0.004 | 0.006 | 124.8 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.268 | 0.449 | 0.248 | 0.449 | 153.4 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 124.8 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 20.536 | 27.154 | 20.484 | 27.154 | 151.8 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 156.307 | 178.355 | 153.850 | 178.355 | 124.8 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 9.735 | 13.358 | 9.384 | 13.358 | 145.6 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 76.915 | 79.718 | 76.884 | 79.718 | 124.8 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 224.094 | 234.383 | 194.577 | 234.383 | 151.3 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1479.718 | 1521.005 | 1474.531 | 1521.005 | 124.8 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.079 | 2.887 | 1.064 | 2.887 | 151.3 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.099 | 1.221 | 1.070 | 1.221 | 124.8 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.012 | 0.025 | 0.011 | 0.025 | 120.5 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.402 | 0.509 | 0.376 | 0.509 | 124.8 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.214 | 0.238 | 0.199 | 0.238 | 144.0 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.403 | 5.550 | 5.357 | 5.550 | 124.8 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.172 | 1.305 | 1.124 | 1.305 | 125.3 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.659 | 0.801 | 0.606 | 0.801 | 124.8 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 9.515 | 10.940 | 9.319 | 10.940 | 140.5 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 75.695 | 78.718 | 71.308 | 78.718 | 124.8 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 6.352 | 7.420 | 6.280 | 7.420 | 152.3 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 29.714 | 30.448 | 29.291 | 30.448 | 124.8 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.234 | 0.281 | 0.205 | 0.281 | 153.2 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 124.8 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.234 | 0.260 | 0.227 | 0.260 | 152.8 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 124.8 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 20.483 | 25.014 | 18.951 | 25.014 | 151.8 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 163.997 | 175.205 | 152.398 | 175.205 | 124.8 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.596 | 1.824 | 1.504 | 1.824 | 144.4 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.549 | 1.655 | 1.447 | 1.655 | 124.8 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.854 | 4.080 | 3.792 | 4.080 | 149.8 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 23.456 | 24.091 | 23.235 | 24.091 | 124.8 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 1.157 | 1.447 | 0.962 | 1.447 | 126.1 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.972 | 1.318 | 0.934 | 1.318 | 124.8 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 5.760 | 8.034 | 5.334 | 8.034 | 138.4 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 60.353 | 62.789 | 59.419 | 62.789 | 124.8 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.185 | 0.220 | 0.174 | 0.220 | 150.4 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.012 | 0.005 | 0.012 | 124.8 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.266 | 0.742 | 0.262 | 0.742 | 150.3 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.007 | 0.011 | 124.8 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 5.821 | 6.289 | 5.651 | 6.289 | 149.3 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 62.325 | 66.660 | 61.342 | 66.660 | 124.8 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.039 | 0.054 | 0.012 | 0.066 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.561 | 0.641 | 0.527 | 0.879 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.304 | 0.637 | 0.247 | 10.859 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.666 | 2.916 | 2.604 | 3.756 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.030 | 0.033 | 0.029 | 0.033 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.497 | 0.516 | 0.482 | 0.516 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 176.639 | 224.648 | 171.611 | 224.648 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1444.681 | 1453.687 | 1412.279 | 1453.687 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 158.506 | 163.007 | 156.298 | 163.007 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1429.624 | 1460.514 | 1400.209 | 1460.514 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.142 | 0.181 | 0.129 | 0.181 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.344 | 2.495 | 2.238 | 2.495 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.036 | 0.078 | 0.028 | 0.078 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.525 | 0.560 | 0.487 | 0.560 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.466 | 7.312 | 6.165 | 7.312 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.314 | 18.493 | 17.221 | 18.493 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.453 | 6.543 | 6.357 | 6.543 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.735 | 17.145 | 16.441 | 17.145 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 6.829 | 7.064 | 6.425 | 7.064 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 13.321 | 13.947 | 13.183 | 13.947 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.355 | 0.416 | 0.325 | 0.416 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.125 | 3.183 | 3.030 | 3.183 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.040 | 0.055 | 0.037 | 0.055 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.556 | 0.753 | 0.524 | 0.753 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 193.485 | 230.329 | 192.002 | 230.329 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1509.569 | 1547.120 | 1483.919 | 1547.120 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 155.332 | 168.881 | 153.091 | 168.881 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1442.300 | 1527.144 | 1413.430 | 1527.144 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.157 | 0.207 | 0.131 | 0.207 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.347 | 2.498 | 2.280 | 2.498 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.029 | 0.044 | 0.024 | 0.044 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.583 | 0.622 | 0.561 | 0.622 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 26.113 | 26.521 | 25.608 | 26.521 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 91.336 | 93.033 | 90.160 | 93.033 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 26.224 | 26.750 | 25.924 | 26.750 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 89.487 | 97.316 | 89.140 | 97.316 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.884 | 27.288 | 26.610 | 27.288 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 87.366 | 120.436 | 86.504 | 120.436 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.316 | 0.346 | 0.283 | 0.346 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.277 | 3.501 | 3.138 | 3.501 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.015 | 0.006 | 0.015 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.437 | 0.482 | 0.398 | 0.482 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 182.397 | 183.771 | 181.527 | 183.771 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1582.983 | 1832.790 | 1549.786 | 1832.790 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 152.394 | 155.093 | 148.472 | 155.093 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1471.746 | 1574.592 | 1434.836 | 1574.592 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.162 | 0.195 | 0.143 | 0.195 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.064 | 2.246 | 2.052 | 2.246 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.029 | 0.039 | 0.026 | 0.039 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.393 | 0.448 | 0.362 | 0.448 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 17.935 | 18.399 | 17.904 | 18.399 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 65.949 | 106.062 | 64.892 | 106.062 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 17.918 | 18.138 | 17.834 | 18.138 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 66.614 | 423.913 | 64.544 | 423.913 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 18.233 | 18.504 | 17.975 | 18.504 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 60.967 | 61.760 | 59.598 | 61.760 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.203 | 0.327 | 0.189 | 0.327 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.042 | 3.350 | 2.973 | 3.350 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.051 | 0.064 | 0.049 | 0.064 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.522 | 0.548 | 0.517 | 0.548 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 176.121 | 186.926 | 173.007 | 186.926 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1474.005 | 1578.100 | 1439.924 | 1578.100 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 166.438 | 179.709 | 156.901 | 179.709 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1419.653 | 1545.264 | 1406.032 | 1545.264 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.141 | 0.162 | 0.139 | 0.162 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.599 | 3.820 | 3.567 | 3.820 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.031 | 0.039 | 0.025 | 0.039 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.625 | 0.662 | 0.624 | 0.662 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.868 | 18.220 | 4.623 | 18.220 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 31.551 | 37.015 | 31.513 | 37.015 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.907 | 5.390 | 4.807 | 5.390 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 31.759 | 33.021 | 31.332 | 33.021 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.376 | 5.586 | 5.131 | 5.586 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 23.829 | 25.704 | 23.587 | 25.704 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.428 | 0.476 | 0.401 | 0.476 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.957 | 6.152 | 4.818 | 6.152 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.031 | 0.015 | 0.031 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.459 | 0.471 | 0.449 | 0.471 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 170.371 | 183.024 | 166.215 | 183.024 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1451.481 | 1554.282 | 1432.885 | 1554.282 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 156.519 | 169.225 | 152.319 | 169.225 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1442.381 | 1462.563 | 1438.019 | 1462.563 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.106 | 0.110 | 0.104 | 0.110 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.132 | 2.224 | 2.131 | 2.224 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.021 | 0.029 | 0.018 | 0.029 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.419 | 0.432 | 0.397 | 0.432 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.835 | 6.397 | 4.790 | 6.397 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.805 | 27.550 | 26.561 | 27.550 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.444 | 5.803 | 5.256 | 5.803 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.103 | 26.999 | 25.987 | 26.999 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.548 | 7.612 | 5.201 | 7.612 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 23.303 | 24.954 | 23.047 | 24.954 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.177 | 0.325 | 0.168 | 0.325 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.017 | 3.236 | 3.000 | 3.236 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.018 | 0.015 | 0.018 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.437 | 0.476 | 0.435 | 0.476 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 179.183 | 189.378 | 166.888 | 189.378 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1490.567 | 1650.204 | 1455.074 | 1650.204 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 153.443 | 177.112 | 152.528 | 177.112 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1431.822 | 1441.163 | 1413.793 | 1441.163 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.110 | 0.126 | 0.106 | 0.126 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.153 | 2.177 | 2.120 | 2.177 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.030 | 0.018 | 0.030 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.409 | 0.528 | 0.382 | 0.528 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.647 | 6.591 | 5.173 | 6.591 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.947 | 29.986 | 26.011 | 29.986 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.275 | 6.110 | 5.181 | 6.110 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.685 | 28.789 | 26.160 | 28.789 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.414 | 6.915 | 5.395 | 6.915 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 24.253 | 24.637 | 23.654 | 24.637 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.179 | 0.346 | 0.174 | 0.346 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.139 | 4.505 | 3.047 | 4.505 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.075 | 0.109 | 0.064 | 0.109 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.617 | 0.643 | 0.605 | 0.643 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 173.974 | 186.207 | 168.265 | 186.207 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1423.125 | 1461.677 | 1419.078 | 1461.677 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 158.281 | 204.448 | 154.731 | 204.448 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1424.918 | 1504.985 | 1399.996 | 1504.985 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.103 | 0.131 | 0.091 | 0.131 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.696 | 2.835 | 2.633 | 2.835 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.020 | 0.026 | 0.015 | 0.026 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.646 | 0.677 | 0.615 | 0.677 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.604 | 3.512 | 2.506 | 3.512 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 16.204 | 16.784 | 15.978 | 16.784 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 3.110 | 4.006 | 2.635 | 4.006 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 15.652 | 15.950 | 15.299 | 15.950 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 3.691 | 7.779 | 2.650 | 7.779 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 11.849 | 12.149 | 11.551 | 12.149 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.527 | 0.610 | 0.446 | 0.610 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.903 | 4.495 | 3.760 | 4.495 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.067 | 0.016 | 0.067 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.479 | 0.613 | 0.452 | 0.613 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 177.074 | 209.304 | 171.727 | 209.304 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1442.774 | 1662.567 | 1420.472 | 1662.567 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 158.083 | 160.590 | 152.748 | 160.590 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1429.509 | 1517.460 | 1415.514 | 1517.460 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.184 | 0.209 | 0.141 | 0.209 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.407 | 4.090 | 3.308 | 4.090 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.026 | 0.041 | 0.016 | 0.041 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.632 | 0.696 | 0.623 | 0.696 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.684 | 7.001 | 6.484 | 7.001 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 34.337 | 37.339 | 34.083 | 37.339 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.775 | 7.437 | 6.543 | 7.437 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 33.101 | 34.533 | 32.956 | 34.533 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.177 | 7.432 | 6.829 | 7.432 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 28.938 | 29.560 | 28.794 | 29.560 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.331 | 0.515 | 0.309 | 0.515 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.212 | 4.300 | 4.196 | 4.300 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.007 | 0.005 | 0.007 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.453 | 0.503 | 0.427 | 0.503 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 171.631 | 184.003 | 163.137 | 184.003 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1476.834 | 1542.191 | 1448.215 | 1542.191 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 166.785 | 248.032 | 153.911 | 248.032 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1438.886 | 1476.151 | 1406.842 | 1476.151 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.113 | 0.208 | 0.095 | 0.208 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.056 | 2.280 | 1.949 | 2.280 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.026 | 0.040 | 0.021 | 0.040 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.350 | 0.543 | 0.342 | 0.543 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.804 | 1.951 | 1.707 | 1.951 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 14.777 | 16.414 | 14.057 | 16.414 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.655 | 1.854 | 1.644 | 1.854 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 15.005 | 18.275 | 14.120 | 18.275 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.876 | 2.026 | 1.784 | 2.026 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 11.137 | 12.538 | 10.803 | 12.538 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.191 | 0.228 | 0.177 | 0.228 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.738 | 2.878 | 2.637 | 2.878 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.182 | 0.200 | 0.180 | 0.200 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.105 | 1.122 | 1.100 | 1.122 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 206.953 | 393.729 | 196.046 | 393.729 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1452.945 | 1475.900 | 1444.437 | 1475.900 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 170.609 | 235.440 | 168.889 | 235.440 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1412.117 | 1432.512 | 1402.617 | 1432.512 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.269 | 0.322 | 0.250 | 0.322 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.752 | 6.078 | 5.643 | 6.078 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.024 | 0.053 | 0.023 | 0.053 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.708 | 1.724 | 1.701 | 1.724 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.576 | 12.614 | 11.283 | 12.614 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 44.494 | 46.080 | 44.285 | 46.080 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 12.873 | 17.714 | 12.506 | 17.714 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 43.062 | 43.904 | 42.943 | 43.904 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.684 | 12.613 | 11.519 | 12.613 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.263 | 38.411 | 36.639 | 38.411 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.957 | 1.021 | 0.874 | 1.021 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 5.991 | 6.079 | 5.962 | 6.079 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.017 | 0.011 | 0.017 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.703 | 5.235 | 0.497 | 5.235 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 188.787 | 196.927 | 168.075 | 196.927 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1464.301 | 1570.450 | 1430.275 | 1570.450 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 161.157 | 185.164 | 155.827 | 185.164 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1420.941 | 1506.584 | 1404.483 | 1506.584 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.164 | 0.190 | 0.154 | 0.190 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.688 | 4.596 | 3.531 | 4.596 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.027 | 0.045 | 0.020 | 0.045 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.579 | 1.107 | 0.559 | 1.107 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.676 | 2.358 | 1.577 | 2.358 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.621 | 17.132 | 16.193 | 17.132 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.649 | 1.752 | 1.593 | 1.752 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 16.563 | 17.157 | 16.414 | 17.157 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 2.018 | 2.179 | 1.890 | 2.179 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 13.755 | 51.710 | 12.008 | 51.710 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.154 | 0.205 | 0.146 | 0.205 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 5.121 | 5.941 | 4.842 | 5.941 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.089 | 0.113 | 0.054 | 0.113 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.660 | 0.681 | 0.644 | 0.681 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 169.608 | 177.014 | 165.679 | 177.014 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1427.621 | 1792.186 | 1405.403 | 1792.186 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 164.973 | 168.248 | 153.004 | 168.248 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1447.661 | 1538.679 | 1418.953 | 1538.679 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.107 | 0.272 | 0.079 | 0.272 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 2.966 | 3.092 | 2.930 | 3.092 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.024 | 0.042 | 0.016 | 0.042 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.718 | 0.756 | 0.706 | 0.756 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.687 | 3.085 | 2.671 | 3.085 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 15.121 | 16.819 | 14.794 | 16.819 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.958 | 3.356 | 2.809 | 3.356 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 13.630 | 14.105 | 13.361 | 14.105 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.959 | 3.656 | 2.632 | 3.656 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.296 | 11.409 | 9.906 | 11.409 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.473 | 0.505 | 0.450 | 0.505 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.517 | 3.616 | 3.445 | 3.616 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.030 | 0.041 | 0.027 | 0.041 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.533 | 0.559 | 0.523 | 0.559 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 164.832 | 215.683 | 151.666 | 215.683 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1423.949 | 1793.449 | 1408.112 | 1793.449 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.095 | 0.119 | 0.076 | 0.119 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.353 | 3.421 | 2.237 | 3.421 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.017 | 0.025 | 0.013 | 0.025 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.515 | 0.545 | 0.509 | 0.545 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.572 | 2.426 | 1.274 | 2.426 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.613 | 12.485 | 11.451 | 12.485 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.486 | 2.723 | 1.397 | 2.723 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.278 | 11.625 | 11.214 | 11.625 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.002 | 3.041 | 1.667 | 3.041 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 8.047 | 8.680 | 7.939 | 8.680 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.399 | 0.460 | 0.314 | 0.460 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.169 | 3.235 | 3.100 | 3.235 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 157.982 | 164.275 | 153.873 | 164.275 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1508.599 | 1594.579 | 1490.730 | 1594.579 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.243 | 0.281 | 0.214 | 0.281 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.749 | 3.329 | 2.622 | 3.329 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.024 | 0.043 | 0.023 | 0.043 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.461 | 0.682 | 0.458 | 0.682 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 32.554 | 35.215 | 31.032 | 35.215 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 112.260 | 119.904 | 109.041 | 119.904 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.239 | 0.303 | 0.192 | 0.303 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.494 | 4.017 | 3.457 | 4.017 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 163.148 | 178.276 | 156.109 | 178.276 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1414.868 | 1462.462 | 1403.971 | 1462.462 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.170 | 0.321 | 0.162 | 0.321 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 1.995 | 2.036 | 1.965 | 2.036 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.022 | 0.036 | 0.020 | 0.036 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.390 | 0.411 | 0.380 | 0.411 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.153 | 27.143 | 25.936 | 27.143 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 83.848 | 86.917 | 83.559 | 86.917 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.133 | 0.169 | 0.130 | 0.169 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.717 | 2.748 | 2.650 | 2.748 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 155.492 | 162.914 | 152.977 | 162.914 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1547.798 | 1787.476 | 1496.992 | 1787.476 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.137 | 0.188 | 0.135 | 0.188 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.049 | 2.253 | 1.991 | 2.253 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.018 | 0.030 | 0.017 | 0.030 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.405 | 0.418 | 0.379 | 0.418 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.963 | 4.284 | 3.651 | 4.284 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 19.833 | 20.901 | 19.806 | 20.901 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.178 | 0.384 | 0.138 | 0.384 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.611 | 2.678 | 2.567 | 2.678 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 156.653 | 164.984 | 150.916 | 164.984 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1429.829 | 1449.962 | 1425.648 | 1449.962 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.155 | 0.301 | 0.149 | 0.301 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.121 | 2.209 | 2.065 | 2.209 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.020 | 0.025 | 0.020 | 0.025 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.408 | 0.514 | 0.403 | 0.514 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 30.878 | 31.824 | 30.671 | 31.824 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 107.217 | 111.276 | 106.704 | 111.276 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.151 | 0.249 | 0.123 | 0.249 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.718 | 2.845 | 2.662 | 2.845 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 154.362 | 160.521 | 151.373 | 160.521 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1479.302 | 1504.365 | 1467.141 | 1504.365 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.135 | 0.143 | 0.132 | 0.143 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.057 | 2.231 | 2.019 | 2.231 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.018 | 0.024 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.403 | 0.425 | 0.382 | 0.425 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 4.011 | 4.269 | 3.903 | 4.269 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.933 | 22.010 | 20.491 | 22.010 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.169 | 0.280 | 0.160 | 0.280 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.694 | 2.807 | 2.657 | 2.807 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 158.852 | 176.536 | 158.611 | 176.536 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1420.057 | 1445.233 | 1409.998 | 1445.233 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.169 | 0.176 | 0.163 | 0.176 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.063 | 2.111 | 2.037 | 2.111 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.019 | 0.037 | 0.018 | 0.037 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.404 | 0.434 | 0.395 | 0.434 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 31.517 | 35.173 | 31.046 | 35.173 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 106.503 | 108.760 | 105.703 | 108.760 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.151 | 0.209 | 0.138 | 0.209 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.694 | 2.865 | 2.687 | 2.865 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 158.474 | 162.960 | 153.157 | 162.960 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1474.525 | 1521.664 | 1449.770 | 1521.664 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.125 | 0.140 | 0.124 | 0.140 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.010 | 2.110 | 1.988 | 2.110 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.019 | 0.025 | 0.016 | 0.025 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.388 | 0.401 | 0.373 | 0.401 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 4.025 | 4.337 | 4.023 | 4.337 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 20.732 | 21.137 | 20.066 | 21.137 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.170 | 0.286 | 0.120 | 0.286 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.633 | 2.944 | 2.621 | 2.944 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 197.346 | 218.433 | 190.770 | 218.433 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1725.765 | 1799.873 | 1605.047 | 1799.873 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 175.215 | 185.890 | 171.136 | 185.890 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1684.907 | 1959.468 | 1638.119 | 1959.468 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.189 | 0.228 | 0.172 | 0.228 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.308 | 2.891 | 2.240 | 2.891 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.019 | 0.030 | 0.018 | 0.030 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.527 | 0.585 | 0.491 | 0.585 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.049 | 0.067 | 0.043 | 0.067 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.609 | 0.753 | 0.576 | 0.753 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 11.873 | 12.214 | 11.691 | 12.214 | 146.4 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 157.825 | 174.249 | 155.480 | 174.249 | 126.0 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 368.012 | 397.480 | 347.466 | 397.480 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 2290.598 | 2572.561 | 2124.416 | 2572.561 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 265.389 | 300.274 | 259.611 | 300.274 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 2079.433 | 2318.675 | 1830.190 | 2318.675 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.233 | 0.281 | 0.210 | 0.281 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 4.302 | 5.751 | 4.043 | 5.751 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.028 | 0.037 | 0.018 | 0.037 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.499 | 1.736 | 1.442 | 1.736 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 0.098 | 0.047 | 0.098 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.425 | 2.119 | 1.393 | 2.119 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 71.329 | 92.202 | 70.711 | 92.202 | 155.6 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 379.442 | 760.111 | 365.162 | 760.111 | 162.3 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 178.003 | 187.707 | 169.725 | 187.707 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1476.691 | 1587.338 | 1462.904 | 1587.338 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 156.828 | 262.247 | 155.231 | 262.247 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1474.682 | 1494.540 | 1431.418 | 1494.540 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.236 | 0.339 | 0.230 | 0.339 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.682 | 4.862 | 3.608 | 4.862 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.025 | 0.032 | 0.022 | 0.032 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.694 | 0.722 | 0.664 | 0.722 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.053 | 0.064 | 0.041 | 0.064 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.520 | 0.723 | 0.503 | 0.723 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.398 | 0.710 | 0.386 | 0.710 | 141.2 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 26.049 | 43.362 | 24.457 | 43.362 | 124.8 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 191.755 | 212.935 | 184.085 | 212.935 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1522.456 | 1603.370 | 1493.350 | 1603.370 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 174.562 | 230.375 | 170.353 | 230.375 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1507.384 | 1751.719 | 1476.756 | 1751.719 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.290 | 0.502 | 0.215 | 0.502 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.624 | 4.028 | 3.544 | 4.028 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.027 | 0.044 | 0.022 | 0.044 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.643 | 0.661 | 0.619 | 0.661 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.057 | 0.066 | 0.035 | 0.066 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.522 | 0.538 | 0.510 | 0.538 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.726 | 0.989 | 0.560 | 0.989 | 137.7 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 68.612 | 75.523 | 67.826 | 75.523 | 124.8 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 174.178 | 178.494 | 170.907 | 178.494 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1490.042 | 1611.461 | 1460.928 | 1611.461 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.519 | 174.155 | 152.557 | 174.155 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1482.496 | 2056.880 | 1442.119 | 2056.880 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.143 | 0.188 | 0.138 | 0.188 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.225 | 2.886 | 2.075 | 2.886 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.019 | 0.026 | 0.016 | 0.026 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.467 | 0.840 | 0.421 | 0.840 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.018 | 0.013 | 0.018 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.472 | 0.508 | 0.462 | 0.508 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.327 | 0.371 | 0.280 | 0.371 | 134.7 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 20.297 | 22.274 | 19.607 | 22.274 | 124.8 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 170.893 | 178.707 | 166.445 | 178.707 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1462.423 | 1494.244 | 1452.875 | 1494.244 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 155.685 | 194.429 | 153.504 | 194.429 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1452.087 | 1656.906 | 1442.845 | 1656.906 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.149 | 0.172 | 0.147 | 0.172 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.245 | 2.714 | 2.190 | 2.714 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.020 | 0.026 | 0.017 | 0.026 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.428 | 0.485 | 0.426 | 0.485 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.026 | 0.013 | 0.026 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.462 | 0.510 | 0.441 | 0.510 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.208 | 0.254 | 0.187 | 0.254 | 135.6 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 17.153 | 17.853 | 16.600 | 17.853 | 124.8 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 153.917 | 163.724 | 153.088 | 163.724 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1439.942 | 1683.975 | 1425.545 | 1683.975 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.498 | 0.559 | 0.401 | 0.559 | 128.2 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 16.871 | 17.879 | 16.713 | 17.879 | 124.8 |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>17:04:24 - cmdstanpy - INFO - Chain [1] start processing<br>17:04:24 - cmdstanpy - INFO - Chain [1] done processing<br>17:04:24 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=88090 data file=/tmp/tmpr6ay_rmv/k6nk7dgg.json init=/tmp/tmpr6ay_rmv/pma_gv5y.json output file=/tmp/tmpr6ay_rmv/prophet_model9nbkfd_o/prophet_model-20261020170424.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpr6ay_rmv/k6nk7dgg.json<br>init = /tmp/tmpr6ay_rmv/pma_gv5y.json<br>random<br>  seed = 88090<br>output<br>  file = /tmp/tmpr6ay_rmv/prophet_model9nbkfd_o/prophet_model-20261020170424.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 773, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 271, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 228, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=88090 data file=/tmp/tmpr6ay_rmv/k6nk7dgg.json init=/tmp/tmpr6ay_rmv/pma_gv5y.json output file=/tmp/tmpr6ay_rmv/prophet_model9nbkfd_o/prophet_model-20261020170424.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpr6ay_rm |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>17:04:25 - cmdstanpy - INFO - Chain [1] start processing<br>17:04:25 - cmdstanpy - INFO - Chain [1] done processing<br>17:04:25 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=89281 data file=/tmp/tmpl5n4ahgd/v4sxvtzs.json init=/tmp/tmpl5n4ahgd/j7dq5eju.json output file=/tmp/tmpl5n4ahgd/prophet_modelh2vtf6ng/prophet_model-20261020170425.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpl5n4ahgd/v4sxvtzs.json<br>init = /tmp/tmpl5n4ahgd/j7dq5eju.json<br>random<br>  seed = 89281<br>output<br>  file = /tmp/tmpl5n4ahgd/prophet_modelh2vtf6ng/prophet_model-20261020170425.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 773, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 271, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 228, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=89281 data file=/tmp/tmpl5n4ahgd/v4sxvtzs.json init=/tmp/tmpl5n4ahgd/j7dq5eju.json output file=/tmp/tmpl5n4ahgd/prophet_modelh2vtf6ng/prophet_model-20261020170425.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpl5n4ahg |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 776, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 378, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 776, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 378, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `27b7ec98aff8098fc16dd0abc828045b94569e9a`
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

