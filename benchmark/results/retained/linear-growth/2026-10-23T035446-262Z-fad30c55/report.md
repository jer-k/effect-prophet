# Effect Prophet benchmark — 2026-10-23T035446-262Z-fad30c55

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
| country-us-linear-additive | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12501 | 23713 |
| country-us-linear-additive | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12501 | 23713 |
| country-explicit-us-linear-additive | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3782 | 26529 |
| country-explicit-us-linear-additive | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3782 | 26529 |
| country-us-linear-multiplicative | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12532 | 23723 |
| country-us-linear-multiplicative | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2024 | 12 | 12532 | 23723 |
| country-explicit-us-linear-multiplicative | 0 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3801 | 26539 |
| country-explicit-us-linear-multiplicative | 1 | explicit / n/a | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | false | n/a | 12 | 3801 | 26539 |
| country-boundary-linear | 0 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2010 | 13 | 11765 | 23981 |
| country-boundary-linear | 1 | US / reject-known-gaps | 1.4.0 / 0.104 | sha256:457fc6eed73b9adef1c65e3e2a42a640e0a24b637f07e51f47e66bc9ec7f9b43 | true | 2010 | 13 | 11765 | 23981 |

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

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric aggregation | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-training-duplicates | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | linear | 1 | 2 | 148 | 24 | 0 | 1 | 0 | n/a / n/a | overall | bb5b9efec3c622df6564bc5d4595789a6c4a12fc424a13f2d1e6bc9a64aa6790 |
| evaluation-linear-point | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | n/a |
| evaluation-linear-intervals | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 0 | 2 | 147 | 14 | 4 | 1 | 64 | 19 / 0.8 | overall | n/a |
| evaluation-linear-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 2 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | overall | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93 |
| evaluation-linear-failure-search | linear-offset-scaling-v1:n=96:h=24:offset=100:weekly:bounded-noise / bfea515181446ef72eeed2acaef46db63d6fcee5cd1d6af177ad886a6c973b5e | linear | 3 | 2 | 147 | 14 | 4 | 1 | 0 | n/a / n/a | horizons | 4089057e29e664ceabd0d32de617812efb0c811b837840f4f6a0a3b9aadb8318, d5ace8e185c70ab93914334bca131d5acb01c49274cf3910942e16bcff194f93, 94447b1fe8ef74b557fb74394e1398e83dcd0e237d1ab301bac14978be162329 |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| country-boundary-linear | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.020 | 0.012 | 0.020 | 136.8 |
| country-boundary-linear | adapter-input-conversion | python-prophet | 6 | 0.438 | 0.484 | 0.422 | 0.484 | 146.3 |
| country-boundary-linear | cold-first-forecast | effect-prophet | 6 | 171.020 | 179.270 | 163.393 | 179.270 | 154.0 |
| country-boundary-linear | cold-first-forecast | python-prophet | 6 | 1501.620 | 1544.497 | 1465.098 | 1544.497 | 146.3 |
| country-boundary-linear | fresh-process-restored-predict | effect-prophet | 6 | 155.969 | 187.315 | 149.576 | 187.315 | 154.7 |
| country-boundary-linear | fresh-process-restored-predict | python-prophet | 6 | 1554.303 | 1996.231 | 1478.202 | 1996.231 | 146.3 |
| country-boundary-linear | model-json-decode | effect-prophet | 6 | 0.910 | 1.016 | 0.888 | 1.016 | 154.7 |
| country-boundary-linear | model-json-decode | python-prophet | 6 | 3.244 | 3.698 | 2.915 | 3.698 | 146.3 |
| country-boundary-linear | model-json-encode | effect-prophet | 6 | 0.074 | 0.093 | 0.068 | 0.093 | 154.0 |
| country-boundary-linear | model-json-encode | python-prophet | 6 | 0.509 | 0.579 | 0.474 | 0.579 | 146.3 |
| country-boundary-linear | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.759 | 5.844 | 4.699 | 5.844 | 153.9 |
| country-boundary-linear | warm-fit-predict-with-conversion | python-prophet | 6 | 25.191 | 25.549 | 25.083 | 25.549 | 146.3 |
| country-boundary-linear | warm-fit-predict | effect-prophet | 6 | 5.115 | 5.394 | 4.969 | 5.394 | 152.1 |
| country-boundary-linear | warm-fit-predict | python-prophet | 6 | 25.109 | 25.424 | 24.737 | 25.424 | 146.3 |
| country-boundary-linear | warm-fit | effect-prophet | 6 | 6.300 | 7.004 | 5.044 | 7.004 | 149.5 |
| country-boundary-linear | warm-fit | python-prophet | 6 | 19.712 | 20.301 | 19.439 | 20.301 | 146.3 |
| country-boundary-linear | warm-predict | effect-prophet | 6 | 0.213 | 0.260 | 0.176 | 0.260 | 149.5 |
| country-boundary-linear | warm-predict | python-prophet | 6 | 5.035 | 5.268 | 4.876 | 5.268 | 146.3 |
| country-explicit-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.019 | 0.014 | 0.019 | 134.6 |
| country-explicit-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.432 | 0.480 | 0.417 | 0.480 | 124.7 |
| country-explicit-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 168.214 | 344.296 | 160.489 | 344.296 | 152.0 |
| country-explicit-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1333.597 | 1428.573 | 1324.746 | 1428.573 | 124.7 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 155.210 | 222.135 | 149.200 | 222.135 | 152.1 |
| country-explicit-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1357.853 | 1998.084 | 1319.764 | 1998.084 | 124.7 |
| country-explicit-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.489 | 0.697 | 0.390 | 0.697 | 152.1 |
| country-explicit-us-linear-additive | model-json-decode | python-prophet | 6 | 3.618 | 3.759 | 3.592 | 3.759 | 124.7 |
| country-explicit-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.026 | 0.051 | 0.020 | 0.051 | 152.0 |
| country-explicit-us-linear-additive | model-json-encode | python-prophet | 6 | 0.650 | 0.676 | 0.621 | 0.676 | 124.7 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.590 | 3.854 | 3.503 | 3.854 | 151.6 |
| country-explicit-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 21.925 | 23.734 | 21.285 | 23.734 | 124.7 |
| country-explicit-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 3.732 | 4.086 | 3.650 | 4.086 | 151.5 |
| country-explicit-us-linear-additive | warm-fit-predict | python-prophet | 6 | 20.803 | 21.215 | 20.749 | 21.215 | 124.7 |
| country-explicit-us-linear-additive | warm-fit | effect-prophet | 6 | 4.219 | 4.581 | 3.875 | 4.581 | 142.9 |
| country-explicit-us-linear-additive | warm-fit | python-prophet | 6 | 16.245 | 16.529 | 15.972 | 16.529 | 124.7 |
| country-explicit-us-linear-additive | warm-predict | effect-prophet | 6 | 0.163 | 0.201 | 0.143 | 0.201 | 145.4 |
| country-explicit-us-linear-additive | warm-predict | python-prophet | 6 | 4.276 | 4.553 | 4.268 | 4.553 | 124.7 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.043 | 0.015 | 0.043 | 135.1 |
| country-explicit-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.424 | 0.482 | 0.416 | 0.482 | 124.7 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 203.554 | 373.817 | 175.990 | 373.817 | 154.4 |
| country-explicit-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1354.905 | 1770.117 | 1313.854 | 1770.117 | 124.7 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 156.153 | 231.189 | 147.246 | 231.189 | 154.4 |
| country-explicit-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1321.952 | 1391.852 | 1299.284 | 1391.852 | 124.7 |
| country-explicit-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 0.456 | 0.895 | 0.420 | 0.895 | 154.4 |
| country-explicit-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.679 | 4.624 | 3.581 | 4.624 | 124.7 |
| country-explicit-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.029 | 0.049 | 0.019 | 0.049 | 154.4 |
| country-explicit-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.669 | 0.837 | 0.626 | 0.837 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.497 | 9.046 | 6.341 | 9.046 | 153.9 |
| country-explicit-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 22.339 | 22.635 | 21.960 | 22.635 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 6.883 | 9.141 | 6.336 | 9.141 | 153.9 |
| country-explicit-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 21.664 | 26.289 | 21.369 | 26.289 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 7.859 | 26.457 | 6.992 | 26.457 | 145.1 |
| country-explicit-us-linear-multiplicative | warm-fit | python-prophet | 6 | 17.413 | 23.957 | 16.880 | 23.957 | 124.7 |
| country-explicit-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.248 | 0.888 | 0.214 | 0.888 | 147.6 |
| country-explicit-us-linear-multiplicative | warm-predict | python-prophet | 6 | 4.292 | 5.719 | 4.230 | 5.719 | 124.7 |
| country-us-linear-additive | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.019 | 0.012 | 0.019 | 137.7 |
| country-us-linear-additive | adapter-input-conversion | python-prophet | 6 | 0.427 | 0.477 | 0.416 | 0.477 | 146.8 |
| country-us-linear-additive | cold-first-forecast | effect-prophet | 6 | 166.592 | 174.668 | 165.771 | 174.668 | 153.2 |
| country-us-linear-additive | cold-first-forecast | python-prophet | 6 | 1492.347 | 1547.075 | 1462.907 | 1547.075 | 146.8 |
| country-us-linear-additive | fresh-process-restored-predict | effect-prophet | 6 | 153.639 | 171.345 | 152.291 | 171.345 | 153.7 |
| country-us-linear-additive | fresh-process-restored-predict | python-prophet | 6 | 1493.799 | 1576.658 | 1470.920 | 1576.658 | 146.8 |
| country-us-linear-additive | model-json-decode | effect-prophet | 6 | 0.753 | 0.963 | 0.739 | 0.963 | 153.7 |
| country-us-linear-additive | model-json-decode | python-prophet | 6 | 3.590 | 3.751 | 3.544 | 3.751 | 146.8 |
| country-us-linear-additive | model-json-encode | effect-prophet | 6 | 0.093 | 0.105 | 0.079 | 0.105 | 153.2 |
| country-us-linear-additive | model-json-encode | python-prophet | 6 | 0.675 | 0.704 | 0.639 | 0.704 | 146.8 |
| country-us-linear-additive | warm-fit-predict-with-conversion | effect-prophet | 6 | 4.548 | 5.415 | 4.229 | 5.415 | 153.2 |
| country-us-linear-additive | warm-fit-predict-with-conversion | python-prophet | 6 | 24.877 | 26.990 | 24.776 | 26.990 | 146.8 |
| country-us-linear-additive | warm-fit-predict | effect-prophet | 6 | 4.653 | 5.102 | 4.463 | 5.102 | 151.4 |
| country-us-linear-additive | warm-fit-predict | python-prophet | 6 | 24.789 | 25.268 | 24.470 | 25.268 | 146.8 |
| country-us-linear-additive | warm-fit | effect-prophet | 6 | 5.746 | 6.754 | 4.785 | 6.754 | 150.9 |
| country-us-linear-additive | warm-fit | python-prophet | 6 | 19.242 | 19.568 | 18.997 | 19.568 | 146.8 |
| country-us-linear-additive | warm-predict | effect-prophet | 6 | 0.214 | 0.222 | 0.209 | 0.222 | 150.9 |
| country-us-linear-additive | warm-predict | python-prophet | 6 | 5.032 | 8.869 | 4.944 | 8.869 | 146.8 |
| country-us-linear-multiplicative | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.015 | 0.012 | 0.015 | 135.7 |
| country-us-linear-multiplicative | adapter-input-conversion | python-prophet | 6 | 0.429 | 0.453 | 0.416 | 0.453 | 147.9 |
| country-us-linear-multiplicative | cold-first-forecast | effect-prophet | 6 | 183.853 | 507.060 | 166.955 | 507.060 | 156.6 |
| country-us-linear-multiplicative | cold-first-forecast | python-prophet | 6 | 1517.905 | 1723.190 | 1467.863 | 1723.190 | 147.9 |
| country-us-linear-multiplicative | fresh-process-restored-predict | effect-prophet | 6 | 158.443 | 314.481 | 152.928 | 314.481 | 157.2 |
| country-us-linear-multiplicative | fresh-process-restored-predict | python-prophet | 6 | 1446.188 | 1680.464 | 1437.364 | 1680.464 | 147.9 |
| country-us-linear-multiplicative | model-json-decode | effect-prophet | 6 | 1.199 | 3.912 | 0.739 | 3.912 | 157.1 |
| country-us-linear-multiplicative | model-json-decode | python-prophet | 6 | 3.692 | 4.329 | 3.570 | 4.329 | 147.9 |
| country-us-linear-multiplicative | model-json-encode | effect-prophet | 6 | 0.095 | 0.234 | 0.078 | 0.234 | 156.6 |
| country-us-linear-multiplicative | model-json-encode | python-prophet | 6 | 0.755 | 0.984 | 0.694 | 0.984 | 147.9 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.004 | 14.196 | 5.425 | 14.196 | 156.6 |
| country-us-linear-multiplicative | warm-fit-predict-with-conversion | python-prophet | 6 | 25.957 | 26.374 | 25.649 | 26.374 | 147.9 |
| country-us-linear-multiplicative | warm-fit-predict | effect-prophet | 6 | 6.735 | 32.591 | 5.561 | 32.591 | 155.8 |
| country-us-linear-multiplicative | warm-fit-predict | python-prophet | 6 | 26.871 | 39.218 | 25.504 | 39.218 | 147.9 |
| country-us-linear-multiplicative | warm-fit | effect-prophet | 6 | 7.819 | 10.445 | 6.261 | 10.445 | 155.1 |
| country-us-linear-multiplicative | warm-fit | python-prophet | 6 | 19.809 | 25.358 | 19.758 | 25.358 | 147.9 |
| country-us-linear-multiplicative | warm-predict | effect-prophet | 6 | 0.235 | 0.316 | 0.203 | 0.316 | 155.3 |
| country-us-linear-multiplicative | warm-predict | python-prophet | 6 | 5.835 | 6.441 | 5.199 | 6.441 | 147.9 |
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 5.843 | 6.004 | 5.730 | 6.004 | 155.1 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 30.182 | 30.545 | 28.340 | 30.545 | 124.7 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.149 | 0.167 | 0.144 | 0.167 | 158.0 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 124.7 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.183 | 0.235 | 0.178 | 0.235 | 157.7 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 124.7 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 19.914 | 24.288 | 19.652 | 24.288 | 154.5 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 142.230 | 159.746 | 140.336 | 159.746 | 124.7 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 9.868 | 12.307 | 9.291 | 12.307 | 145.3 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 73.634 | 74.674 | 73.511 | 74.674 | 124.7 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 172.539 | 182.194 | 169.889 | 182.194 | 156.1 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1426.358 | 1467.302 | 1405.498 | 1467.302 | 124.7 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.133 | 2.589 | 1.006 | 2.589 | 156.1 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.017 | 1.039 | 0.988 | 1.039 | 124.7 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.010 | 0.012 | 0.010 | 0.012 | 126.7 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.398 | 0.925 | 0.386 | 0.925 | 124.7 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.056 | 0.084 | 0.047 | 0.084 | 149.4 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 4.835 | 5.242 | 4.747 | 5.242 | 124.7 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.174 | 1.459 | 1.125 | 1.459 | 131.1 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.632 | 0.803 | 0.600 | 0.803 | 124.7 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 9.106 | 9.412 | 9.063 | 9.412 | 146.6 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 70.868 | 73.837 | 66.629 | 73.837 | 124.7 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 5.911 | 6.154 | 5.909 | 6.154 | 153.4 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 27.829 | 28.465 | 27.343 | 28.465 | 124.7 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.151 | 0.185 | 0.149 | 0.185 | 155.9 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 124.7 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.186 | 0.194 | 0.182 | 0.194 | 153.7 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 124.7 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 20.167 | 23.996 | 18.576 | 23.996 | 153.0 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 140.148 | 143.720 | 139.889 | 143.720 | 124.7 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.544 | 1.989 | 1.394 | 1.989 | 147.5 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.363 | 1.410 | 1.308 | 1.410 | 124.7 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.551 | 3.650 | 3.394 | 3.650 | 155.1 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 21.615 | 24.674 | 21.112 | 24.674 | 124.7 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.944 | 1.095 | 0.940 | 1.095 | 131.0 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.927 | 0.991 | 0.846 | 0.991 | 124.7 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 5.350 | 8.414 | 4.983 | 8.414 | 141.4 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 54.310 | 58.293 | 50.152 | 58.293 | 124.7 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.158 | 0.160 | 0.153 | 0.160 | 155.4 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.004 | 0.004 | 0.004 | 124.7 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.216 | 0.341 | 0.215 | 0.341 | 155.1 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.007 | 0.009 | 0.007 | 0.009 | 124.7 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 5.909 | 6.258 | 5.388 | 6.258 | 154.5 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 52.089 | 63.570 | 50.966 | 63.570 | 124.7 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.032 | 0.075 | 0.020 | 0.173 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.540 | 0.598 | 0.496 | 1.274 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.310 | 0.863 | 0.240 | 2.253 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.524 | 3.007 | 2.381 | 3.819 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.029 | 0.040 | 0.027 | 0.040 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.489 | 0.505 | 0.471 | 0.505 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 171.666 | 200.722 | 162.957 | 200.722 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1317.949 | 1564.004 | 1302.898 | 1564.004 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 151.361 | 158.046 | 149.285 | 158.046 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1294.483 | 1370.046 | 1284.381 | 1370.046 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.152 | 0.191 | 0.143 | 0.191 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.141 | 2.351 | 2.013 | 2.351 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.029 | 0.039 | 0.025 | 0.039 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.502 | 0.619 | 0.478 | 0.619 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 5.851 | 6.961 | 5.544 | 6.961 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 16.687 | 17.529 | 16.187 | 17.529 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 5.962 | 6.285 | 5.833 | 6.285 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 16.157 | 17.515 | 15.470 | 17.515 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 6.560 | 6.677 | 6.224 | 6.677 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 12.806 | 13.366 | 12.552 | 13.366 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.366 | 0.421 | 0.303 | 0.421 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 2.809 | 2.918 | 2.799 | 2.918 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.049 | 0.059 | 0.037 | 0.059 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.551 | 0.643 | 0.498 | 0.643 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 200.930 | 215.026 | 191.842 | 215.026 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1401.796 | 1470.241 | 1373.742 | 1470.241 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 156.634 | 173.380 | 150.704 | 173.380 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1334.374 | 1382.895 | 1314.572 | 1382.895 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.194 | 0.432 | 0.156 | 0.432 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.271 | 2.536 | 2.108 | 2.536 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.032 | 0.044 | 0.029 | 0.044 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.552 | 0.595 | 0.531 | 0.595 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 25.717 | 27.547 | 25.361 | 27.547 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 84.640 | 92.121 | 83.175 | 92.121 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 26.312 | 27.078 | 25.785 | 27.078 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 85.862 | 108.059 | 81.984 | 108.059 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.389 | 27.454 | 26.207 | 27.454 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 83.675 | 107.104 | 79.336 | 107.104 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.317 | 0.380 | 0.300 | 0.380 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 2.992 | 5.005 | 2.850 | 5.005 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.014 | 0.005 | 0.014 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.408 | 0.436 | 0.385 | 0.436 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 179.929 | 213.220 | 178.518 | 213.220 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1381.254 | 1429.890 | 1346.336 | 1429.890 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 158.768 | 184.885 | 148.210 | 184.885 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1310.226 | 1362.683 | 1289.585 | 1362.683 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.192 | 0.223 | 0.148 | 0.223 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 1.856 | 1.993 | 1.836 | 1.993 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.034 | 0.067 | 0.025 | 0.067 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.389 | 0.433 | 0.345 | 0.433 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 16.912 | 18.723 | 16.844 | 18.723 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 58.601 | 60.304 | 58.235 | 60.304 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 17.027 | 17.168 | 16.768 | 17.168 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 58.694 | 59.544 | 58.272 | 59.544 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 17.033 | 18.658 | 16.788 | 18.658 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 55.336 | 56.416 | 54.866 | 56.416 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.231 | 0.273 | 0.185 | 0.273 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 2.857 | 2.914 | 2.786 | 2.914 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.052 | 0.073 | 0.043 | 0.073 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.491 | 0.525 | 0.489 | 0.525 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 163.626 | 176.533 | 162.201 | 176.533 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1361.816 | 1561.235 | 1328.594 | 1561.235 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 148.204 | 155.364 | 146.987 | 155.364 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1344.972 | 1744.641 | 1321.988 | 1744.641 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.124 | 0.172 | 0.119 | 0.172 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.701 | 4.525 | 3.575 | 4.525 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.031 | 0.046 | 0.028 | 0.046 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.602 | 0.709 | 0.599 | 0.709 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.351 | 4.533 | 4.350 | 4.533 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 25.965 | 31.187 | 25.857 | 31.187 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.589 | 4.797 | 4.431 | 4.797 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 27.026 | 29.545 | 26.566 | 29.545 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 4.980 | 5.249 | 4.642 | 5.249 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 21.586 | 24.411 | 20.885 | 24.411 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.409 | 0.419 | 0.368 | 0.419 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.333 | 5.070 | 4.275 | 5.070 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.019 | 0.014 | 0.019 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.436 | 0.474 | 0.423 | 0.474 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 162.035 | 171.613 | 157.613 | 171.613 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1319.717 | 1336.387 | 1316.899 | 1336.387 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 145.193 | 155.666 | 144.002 | 155.666 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1297.686 | 1365.633 | 1291.354 | 1365.633 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.113 | 0.138 | 0.100 | 0.138 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.008 | 2.076 | 1.976 | 2.076 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.019 | 0.026 | 0.018 | 0.026 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.422 | 0.479 | 0.402 | 0.479 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.998 | 5.897 | 4.826 | 5.897 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 25.065 | 25.732 | 25.062 | 25.732 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 4.943 | 5.227 | 4.939 | 5.227 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 24.564 | 24.910 | 24.450 | 24.910 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 5.267 | 6.761 | 4.689 | 6.761 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 21.786 | 23.429 | 21.726 | 23.429 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.176 | 0.228 | 0.158 | 0.228 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 2.788 | 2.883 | 2.784 | 2.883 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.014 | 0.016 | 0.014 | 0.016 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.453 | 0.481 | 0.445 | 0.481 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 172.688 | 201.045 | 170.395 | 201.045 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1335.220 | 1354.747 | 1329.908 | 1354.747 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 149.390 | 164.087 | 148.080 | 164.087 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1297.771 | 1336.963 | 1296.969 | 1336.963 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.116 | 0.131 | 0.108 | 0.131 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 1.961 | 2.006 | 1.920 | 2.006 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.027 | 0.129 | 0.016 | 0.129 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.403 | 0.432 | 0.386 | 0.432 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 5.007 | 6.375 | 4.463 | 6.375 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 24.802 | 24.949 | 24.740 | 24.949 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.049 | 5.564 | 4.899 | 5.564 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 24.278 | 24.948 | 23.978 | 24.948 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 5.070 | 6.894 | 4.609 | 6.894 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 21.373 | 22.036 | 21.239 | 22.036 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.165 | 0.253 | 0.140 | 0.253 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 2.787 | 2.877 | 2.715 | 2.877 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.078 | 0.178 | 0.063 | 0.178 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.610 | 0.671 | 0.575 | 0.671 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 160.932 | 181.792 | 158.133 | 181.792 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1346.932 | 1374.772 | 1327.999 | 1374.772 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 151.400 | 160.453 | 150.440 | 160.453 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1322.505 | 1851.260 | 1303.717 | 1851.260 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.110 | 0.135 | 0.094 | 0.135 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.536 | 3.687 | 2.387 | 3.687 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.021 | 0.030 | 0.015 | 0.030 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.582 | 0.644 | 0.560 | 0.644 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.589 | 4.027 | 2.434 | 4.027 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 15.513 | 17.491 | 15.217 | 17.491 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.718 | 3.436 | 2.500 | 3.436 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 15.136 | 16.330 | 14.718 | 16.330 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 3.142 | 7.114 | 2.501 | 7.114 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 13.143 | 27.844 | 11.768 | 27.844 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.409 | 0.505 | 0.378 | 0.505 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.535 | 4.759 | 3.439 | 4.759 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.015 | 0.028 | 0.013 | 0.028 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.439 | 0.475 | 0.434 | 0.475 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 163.098 | 190.690 | 160.670 | 190.690 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1359.675 | 1387.256 | 1345.420 | 1387.256 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 153.666 | 160.861 | 146.337 | 160.861 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1321.526 | 1393.811 | 1307.191 | 1393.811 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.173 | 0.185 | 0.136 | 0.185 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.143 | 3.295 | 2.966 | 3.295 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.025 | 0.027 | 0.018 | 0.027 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.564 | 0.598 | 0.552 | 0.598 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.291 | 6.390 | 6.254 | 6.390 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 32.066 | 36.844 | 31.781 | 36.844 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.373 | 8.181 | 6.259 | 8.181 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 31.116 | 35.245 | 31.019 | 35.245 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 6.494 | 6.632 | 6.406 | 6.632 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 27.473 | 28.401 | 27.177 | 28.401 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.306 | 0.333 | 0.289 | 0.333 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 3.858 | 3.953 | 3.850 | 3.953 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.025 | 0.006 | 0.025 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.408 | 0.460 | 0.393 | 0.460 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 162.757 | 175.369 | 162.414 | 175.369 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1413.060 | 2058.753 | 1329.010 | 2058.753 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 147.489 | 150.117 | 145.331 | 150.117 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1327.026 | 1396.801 | 1287.783 | 1396.801 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.121 | 0.168 | 0.098 | 0.168 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 1.840 | 2.118 | 1.770 | 2.118 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.031 | 0.072 | 0.017 | 0.072 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.339 | 0.381 | 0.319 | 0.381 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.626 | 1.836 | 1.586 | 1.836 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 13.645 | 17.012 | 13.048 | 17.012 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.649 | 1.882 | 1.548 | 1.882 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 12.849 | 14.305 | 12.515 | 14.305 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.834 | 1.917 | 1.727 | 1.917 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.245 | 10.708 | 10.102 | 10.708 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.194 | 0.515 | 0.185 | 0.515 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.443 | 2.542 | 2.378 | 2.542 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.191 | 0.222 | 0.180 | 0.222 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.067 | 1.247 | 1.002 | 1.247 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 186.621 | 221.510 | 184.042 | 221.510 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1440.682 | 1662.117 | 1425.673 | 1662.117 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 160.398 | 171.366 | 158.110 | 171.366 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1315.875 | 1336.163 | 1306.122 | 1336.163 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.245 | 0.535 | 0.237 | 0.535 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.112 | 5.306 | 5.061 | 5.306 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.028 | 0.035 | 0.022 | 0.035 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.599 | 1.665 | 1.562 | 1.665 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 10.274 | 11.465 | 10.172 | 11.465 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 42.462 | 45.501 | 42.162 | 45.501 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 10.873 | 17.051 | 10.703 | 17.051 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 44.781 | 56.416 | 42.836 | 56.416 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.354 | 13.028 | 11.231 | 13.028 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.032 | 44.831 | 35.344 | 44.831 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 0.893 | 1.346 | 0.893 | 1.346 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 5.654 | 8.176 | 5.501 | 8.176 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.020 | 0.011 | 0.020 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.446 | 0.478 | 0.419 | 0.478 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 161.356 | 166.252 | 159.583 | 166.252 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1345.086 | 1382.006 | 1333.197 | 1382.006 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 151.231 | 154.549 | 144.869 | 154.549 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1336.618 | 1409.563 | 1316.780 | 1409.563 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.197 | 0.230 | 0.160 | 0.230 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.375 | 3.857 | 3.185 | 3.857 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.031 | 0.047 | 0.028 | 0.047 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.575 | 0.729 | 0.532 | 0.729 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.696 | 1.804 | 1.551 | 1.804 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 15.664 | 16.079 | 15.172 | 16.079 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.929 | 1.965 | 1.779 | 1.965 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 14.781 | 19.873 | 14.652 | 19.873 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 1.984 | 2.366 | 1.853 | 2.366 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 10.412 | 12.993 | 10.274 | 12.993 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.165 | 0.240 | 0.132 | 0.240 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.414 | 4.594 | 4.274 | 4.594 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.111 | 0.148 | 0.066 | 0.148 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.654 | 0.718 | 0.633 | 0.718 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 158.534 | 165.020 | 155.606 | 165.020 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1438.079 | 2299.215 | 1348.990 | 2299.215 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 151.212 | 164.131 | 149.755 | 164.131 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1320.003 | 1562.951 | 1302.803 | 1562.951 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.100 | 0.117 | 0.077 | 0.117 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 2.765 | 2.957 | 2.694 | 2.957 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.021 | 0.733 | 0.016 | 0.733 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.707 | 0.867 | 0.655 | 0.867 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.490 | 3.753 | 2.351 | 3.753 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 17.001 | 187.988 | 16.583 | 187.988 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.735 | 3.107 | 2.623 | 3.107 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 14.041 | 16.367 | 13.515 | 16.367 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.483 | 2.737 | 2.334 | 2.737 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 12.406 | 18.522 | 12.087 | 18.522 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.477 | 1.937 | 0.436 | 1.937 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.356 | 4.079 | 3.245 | 4.079 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.030 | 0.031 | 0.029 | 0.031 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.487 | 0.555 | 0.468 | 0.555 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 156.328 | 163.399 | 148.432 | 163.399 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1314.266 | 1365.433 | 1305.119 | 1365.433 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.100 | 0.132 | 0.093 | 0.132 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.054 | 2.130 | 2.038 | 2.130 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.016 | 0.029 | 0.015 | 0.029 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.484 | 0.499 | 0.455 | 0.499 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.373 | 1.775 | 1.241 | 1.775 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.224 | 12.473 | 10.750 | 12.473 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.432 | 1.671 | 1.274 | 1.671 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 10.520 | 13.523 | 10.438 | 13.523 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 1.889 | 2.261 | 1.630 | 2.261 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 7.693 | 9.709 | 7.655 | 9.709 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.347 | 0.403 | 0.322 | 0.403 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 2.882 | 3.906 | 2.795 | 3.906 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 148.184 | 153.527 | 147.493 | 153.527 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1339.839 | 1401.034 | 1331.426 | 1401.034 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.209 | 0.250 | 0.202 | 0.250 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.265 | 2.480 | 2.233 | 2.480 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.029 | 0.368 | 0.025 | 0.368 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.446 | 0.457 | 0.427 | 0.457 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 30.944 | 32.235 | 28.854 | 32.235 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 102.514 | 106.345 | 101.204 | 106.345 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.243 | 0.276 | 0.197 | 0.276 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 4.076 | 9.164 | 3.802 | 9.164 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 146.518 | 151.879 | 145.526 | 151.879 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1384.842 | 1745.633 | 1330.550 | 1745.633 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.152 | 0.158 | 0.144 | 0.158 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 1.843 | 1.920 | 1.826 | 1.920 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.020 | 0.030 | 0.019 | 0.030 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.380 | 0.414 | 0.379 | 0.414 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 25.133 | 25.752 | 24.824 | 25.752 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 76.836 | 77.536 | 76.379 | 77.536 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.160 | 0.230 | 0.155 | 0.230 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.486 | 2.564 | 2.424 | 2.564 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 151.400 | 156.476 | 145.288 | 156.476 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1311.492 | 1315.973 | 1306.988 | 1315.973 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.141 | 0.154 | 0.128 | 0.154 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 1.860 | 1.969 | 1.858 | 1.969 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.023 | 0.029 | 0.015 | 0.029 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.399 | 0.413 | 0.395 | 0.413 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 3.667 | 3.723 | 3.482 | 3.723 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 18.623 | 21.427 | 18.541 | 21.427 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.132 | 0.152 | 0.126 | 0.152 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.468 | 2.559 | 2.439 | 2.559 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 157.355 | 175.384 | 154.278 | 175.384 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1354.802 | 2222.701 | 1300.946 | 2222.701 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.189 | 0.208 | 0.176 | 0.208 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 1.892 | 1.979 | 1.880 | 1.979 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.022 | 0.032 | 0.020 | 0.032 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.407 | 0.447 | 0.397 | 0.447 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 29.988 | 30.177 | 29.620 | 30.177 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 98.361 | 102.856 | 98.157 | 102.856 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.189 | 0.241 | 0.169 | 0.241 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.526 | 2.627 | 2.480 | 2.627 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 148.143 | 153.986 | 147.450 | 153.986 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1306.088 | 1329.901 | 1298.622 | 1329.901 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.137 | 0.158 | 0.130 | 0.158 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 1.895 | 1.990 | 1.880 | 1.990 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.023 | 0.034 | 0.017 | 0.034 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.376 | 0.420 | 0.374 | 0.420 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 3.740 | 4.064 | 3.712 | 4.064 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 19.186 | 20.088 | 18.788 | 20.088 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.158 | 0.283 | 0.127 | 0.283 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.479 | 2.572 | 2.427 | 2.572 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 151.484 | 157.004 | 150.204 | 157.004 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1287.160 | 1346.367 | 1286.482 | 1346.367 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.171 | 0.226 | 0.168 | 0.226 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 1.902 | 2.001 | 1.858 | 2.001 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.024 | 0.034 | 0.023 | 0.034 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.400 | 0.420 | 0.386 | 0.420 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 30.284 | 31.821 | 29.207 | 31.821 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 97.542 | 100.418 | 96.730 | 100.418 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.162 | 0.325 | 0.161 | 0.325 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.521 | 2.923 | 2.411 | 2.923 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 153.623 | 157.759 | 149.684 | 157.759 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1319.382 | 1343.774 | 1301.185 | 1343.774 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.148 | 0.197 | 0.129 | 0.197 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 1.880 | 1.947 | 1.870 | 1.947 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.022 | 0.024 | 0.022 | 0.024 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.380 | 0.408 | 0.378 | 0.408 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 3.868 | 4.144 | 3.665 | 4.144 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 19.415 | 19.977 | 19.248 | 19.977 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.179 | 0.265 | 0.133 | 0.265 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.471 | 2.526 | 2.410 | 2.526 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 179.095 | 183.770 | 176.405 | 183.770 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1519.290 | 1741.242 | 1471.010 | 1741.242 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 170.725 | 196.278 | 164.903 | 196.278 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1507.546 | 1546.282 | 1455.066 | 1546.282 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.181 | 0.202 | 0.161 | 0.202 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-decode | python-prophet | 6 | 2.126 | 2.489 | 2.059 | 2.489 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.019 | 0.041 | 0.017 | 0.041 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | model-json-encode | python-prophet | 6 | 0.551 | 0.664 | 0.480 | 0.664 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.054 | 0.119 | 0.048 | 0.119 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 0.545 | 0.566 | 0.534 | 0.566 | n/a |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 11.089 | 12.636 | 10.879 | 12.636 | 146.1 |
| uncertainty-linear-defaults-irregular-intervals-1000 | warm-uncertainty | python-prophet | 6 | 145.475 | 161.026 | 141.812 | 161.026 | 126.3 |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | effect-prophet | 6 | 338.900 | 362.482 | 332.511 | 362.482 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | cold-first-uncertainty | python-prophet | 6 | 1998.008 | 3224.579 | 1954.067 | 3224.579 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | effect-prophet | 6 | 237.692 | 257.763 | 233.587 | 257.763 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | fresh-process-restored-uncertainty | python-prophet | 6 | 1703.527 | 1909.175 | 1652.518 | 1909.175 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | effect-prophet | 6 | 0.226 | 0.260 | 0.193 | 0.260 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-decode | python-prophet | 6 | 3.553 | 4.855 | 3.234 | 4.855 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | effect-prophet | 6 | 0.027 | 0.035 | 0.019 | 0.035 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | model-json-encode | python-prophet | 6 | 1.350 | 1.936 | 1.287 | 1.936 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.057 | 0.048 | 0.057 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | uncertainty-input-conversion | python-prophet | 6 | 1.369 | 2.161 | 1.333 | 2.161 | n/a |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | effect-prophet | 6 | 64.115 | 64.752 | 63.974 | 64.752 | 156.0 |
| uncertainty-linear-defaults-long-history-intervals-1000 | warm-uncertainty | python-prophet | 6 | 350.307 | 404.899 | 346.214 | 404.899 | 162.3 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 167.633 | 175.431 | 163.775 | 175.431 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1333.537 | 1660.042 | 1326.283 | 1660.042 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 154.564 | 214.604 | 150.336 | 214.604 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1332.742 | 1432.254 | 1311.195 | 1432.254 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.236 | 0.378 | 0.209 | 0.378 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.429 | 4.022 | 3.253 | 4.022 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.020 | 0.040 | 0.018 | 0.040 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.616 | 0.749 | 0.586 | 0.749 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.050 | 0.056 | 0.049 | 0.056 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.487 | 0.518 | 0.471 | 0.518 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.429 | 0.533 | 0.396 | 0.533 | 143.2 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 22.312 | 36.469 | 22.069 | 36.469 | 124.7 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 165.957 | 171.632 | 164.095 | 171.632 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1414.008 | 1496.078 | 1390.784 | 1496.078 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 152.096 | 191.821 | 149.775 | 191.821 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1378.491 | 2208.238 | 1375.816 | 2208.238 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.226 | 0.248 | 0.199 | 0.248 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.289 | 3.703 | 3.230 | 3.703 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.022 | 0.029 | 0.020 | 0.029 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.606 | 0.677 | 0.588 | 0.677 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.047 | 0.073 | 0.035 | 0.073 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.484 | 0.518 | 0.462 | 0.518 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.655 | 1.005 | 0.530 | 1.005 | 139.1 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 63.384 | 64.547 | 62.541 | 64.547 | 124.7 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 165.512 | 172.850 | 162.210 | 172.850 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1386.464 | 1431.905 | 1359.984 | 1431.905 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 150.756 | 154.887 | 147.170 | 154.887 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1369.341 | 1812.686 | 1326.959 | 1812.686 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.147 | 0.172 | 0.135 | 0.172 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.471 | 16.258 | 2.091 | 16.258 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.018 | 0.026 | 0.016 | 0.026 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.441 | 0.641 | 0.404 | 0.641 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.016 | 0.012 | 0.016 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.433 | 0.458 | 0.423 | 0.458 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.340 | 0.959 | 0.307 | 0.959 | 134.5 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 18.482 | 19.071 | 18.048 | 19.071 | 124.7 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 166.380 | 178.988 | 158.916 | 178.988 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1335.915 | 1385.885 | 1323.893 | 1385.885 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 173.909 | 184.521 | 152.364 | 184.521 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1334.012 | 1439.463 | 1315.046 | 1439.463 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.183 | 0.336 | 0.137 | 0.336 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 1.971 | 2.446 | 1.908 | 2.446 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.024 | 0.035 | 0.021 | 0.035 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.389 | 0.444 | 0.386 | 0.444 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.013 | 0.025 | 0.012 | 0.025 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.425 | 0.450 | 0.410 | 0.450 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.220 | 0.255 | 0.180 | 0.255 | 136.6 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 15.276 | 15.733 | 14.565 | 15.733 | 124.7 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 149.997 | 153.722 | 146.494 | 153.722 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1329.915 | 1668.777 | 1327.979 | 1668.777 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.448 | 0.500 | 0.404 | 0.500 | 134.4 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 15.170 | 24.189 | 15.032 | 24.189 | 124.7 |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>04:19:05 - cmdstanpy - INFO - Chain [1] start processing<br>04:19:05 - cmdstanpy - INFO - Chain [1] done processing<br>04:19:05 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=68456 data file=/tmp/tmp83rly3w6/dgqv0o6y.json init=/tmp/tmp83rly3w6/2orgogzf.json output file=/tmp/tmp83rly3w6/prophet_model9i9ji7_h/prophet_model-20261023041905.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp83rly3w6/dgqv0o6y.json<br>init = /tmp/tmp83rly3w6/2orgogzf.json<br>random<br>  seed = 68456<br>output<br>  file = /tmp/tmp83rly3w6/prophet_model9i9ji7_h/prophet_model-20261023041905.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 773, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 271, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 228, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=68456 data file=/tmp/tmp83rly3w6/dgqv0o6y.json init=/tmp/tmp83rly3w6/2orgogzf.json output file=/tmp/tmp83rly3w6/prophet_model9i9ji7_h/prophet_model-20261023041905.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp83rly3w |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>04:19:06 - cmdstanpy - INFO - Chain [1] start processing<br>04:19:06 - cmdstanpy - INFO - Chain [1] done processing<br>04:19:06 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=62139 data file=/tmp/tmpel6bgt50/16avi1jw.json init=/tmp/tmpel6bgt50/hbg6kdyb.json output file=/tmp/tmpel6bgt50/prophet_modeljp8ixkwn/prophet_model-20261023041906.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpel6bgt50/16avi1jw.json<br>init = /tmp/tmpel6bgt50/hbg6kdyb.json<br>random<br>  seed = 62139<br>output<br>  file = /tmp/tmpel6bgt50/prophet_modeljp8ixkwn/prophet_model-20261023041906.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 773, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 271, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 228, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=62139 data file=/tmp/tmpel6bgt50/16avi1jw.json init=/tmp/tmpel6bgt50/hbg6kdyb.json output file=/tmp/tmpel6bgt50/prophet_modeljp8ixkwn/prophet_model-20261023041906.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpel6bgt5 |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 776, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 378, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1238, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1215, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 981, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 776, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections, model)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 378, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `fad30c55c03760712503393517c093abe5d6e0c8`
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
  - `effect-prophet/benchmark-effect:local`: `sha256:afea215a8d454312c693b8369934fb94665e4e9cffd67cbb206d35182cd8b614`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:43c20fb254498dcc6cbed89c41d24624a3f22f3d464764ab2480755a55279379`

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

