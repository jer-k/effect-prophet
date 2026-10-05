# Effect Prophet benchmark — 2026-10-05T144603-352Z-d2a974c1

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| fixed-linear-prediction-medium | equivalent-equation | passed | 1.421e-14 | 0.000e+0 | 0.000e+0 | 1.421e-14 | 0.000e+0 | Verified equivalent behavior for this configuration under evidence fixed-linear-equation-v1. |
| map-explicit-break-small | equivalent-objective | passed | 1.018e-11 | 0.000e+0 | 0.000e+0 | 1.018e-11 | 4.041e-14 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-seasonal-breaks-irregular-medium | equivalent-objective | passed | 6.301e-5 | 1.686e-5 | 1.686e-5 | 6.877e-5 | 1.344e-5 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-explicit-small | equivalent-objective | passed | 7.887e-13 | 1.212e-12 | 1.281e-12 | 1.020e-12 | 1.101e-13 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-mixed-features-automatic-large | equivalent-objective | passed | 5.158e-3 | 1.775e-3 | 2.989e-3 | 6.924e-3 | 1.031e-4 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in stationarity-residual. |
| map-events-small | equivalent-objective | passed | 7.304e-12 | 2.315e-12 | 2.315e-12 | 7.304e-12 | 5.540e-13 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-regressors-medium | equivalent-objective | passed | 3.086e-3 | 1.054e-4 | 1.907e-4 | 3.130e-3 | 4.650e-4 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-conditional-seasonalities-medium | equivalent-objective | passed | 2.682e-3 | 7.941e-4 | 7.454e-4 | 2.722e-3 | 2.397e-4 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in stationarity-residual. |
| linear-defaults-small | equivalent-objective | passed | 2.104e-8 | 3.465e-8 | 3.465e-8 | 4.443e-8 | 3.800e-9 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-medium | equivalent-objective | passed | 1.776e-3 | 2.078e-5 | 2.078e-5 | 1.783e-3 | 3.358e-4 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-defaults-irregular | equivalent-objective | passed | 7.782e-2 | 6.977e-3 | 6.977e-3 | 7.881e-2 | 9.079e-3 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: investigate internal fit differences in objective. |
| map-training-ordered-explicit | equivalent-objective | passed | 3.261e-12 | 0.000e+0 | 0.000e+0 | 3.261e-12 | 5.843e-15 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-ordered-auto | equivalent-objective | passed | 1.619e-9 | 0.000e+0 | 0.000e+0 | 1.619e-9 | 1.022e-10 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-unsorted-explicit | equivalent-objective | passed | 3.261e-12 | 0.000e+0 | 0.000e+0 | 3.261e-12 | 5.843e-15 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-unsorted-auto | equivalent-objective | passed | 1.619e-9 | 0.000e+0 | 0.000e+0 | 1.619e-9 | 1.022e-10 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicates-explicit | equivalent-objective | passed | 1.690e-11 | 0.000e+0 | 0.000e+0 | 1.690e-11 | 5.818e-14 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicates-auto | equivalent-objective | passed | 5.431e-5 | 0.000e+0 | 0.000e+0 | 5.431e-5 | 1.352e-4 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| map-training-duplicate-features-auto | equivalent-objective | passed | 8.106e-4 | 1.475e-4 | 1.620e-4 | 9.252e-4 | 7.159e-5 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-training-duplicates-auto | scalar-process-different-public-work | passed | 5.431e-5 | 0.000e+0 | 0.000e+0 | 5.431e-5 | 1.352e-4 | Verified fitted point behavior under linear-output-first-v4; scalar simulation gated by docs/validation/uncertainty.md. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| map-training-zero-span-linear-varied | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-zero-span-linear-constant | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| evaluation-training-duplicates | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 1.211e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| linear-offset-scaling-absmax | equivalent-objective | passed | 1.226e-11 | 1.420e-13 | 1.420e-13 | 1.236e-11 | 1.023e-14 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-offset-scaling-minmax | equivalent-objective | passed | 6.111e-13 | 2.905e-13 | 2.905e-13 | 8.527e-13 | 4.503e-14 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| linear-mixed-components | equivalent-objective | passed | 1.561e-10 | 2.705e-11 | 0.000e+0 | 1.790e-10 | 1.565e-10 | Verified equivalent behavior for this configuration under evidence linear-output-first-v4. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | scalar-process-different-public-work | passed | 1.194e-11 | 1.420e-13 | 1.420e-13 | 1.208e-11 | 1.023e-14 | Verified fitted point behavior under linear-output-first-v4; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | scalar-process-different-public-work | passed | 1.197e-11 | 4.310e-14 | 4.310e-14 | 1.201e-11 | 1.023e-14 | Verified fitted point behavior under linear-output-first-v4; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-mixed-components-mixed-intervals-128 | scalar-process-different-public-work | passed | 1.516e-10 | 2.582e-11 | 0.000e+0 | 1.830e-10 | 1.565e-10 | Verified fitted point behavior under linear-output-first-v4; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| uncertainty-linear-mixed-components-mixed-samples-512 | scalar-process-different-public-work | passed | 1.516e-10 | 2.582e-11 | 0.000e+0 | 1.830e-10 | 1.565e-10 | Verified fitted point behavior under linear-output-first-v4; scalar simulation gated by docs/validation/uncertainty.md#evidence-classes. Public output work differs. Output-first: internal fit evidence is reported, not gated. |
| evaluation-linear-point | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-intervals | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |
| evaluation-linear-failure-search | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 2.862e-11 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |

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

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-training-duplicates-auto | 96 | 0 | 25 | 8 | 8 | 8 | 128 | samples | 33554432 | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | docs/validation/uncertainty.md |
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
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 6.450 | 7.799 | 6.257 | 7.799 | 157.9 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 33.203 | 34.582 | 32.897 | 34.582 | 118.3 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.202 | 0.212 | 0.192 | 0.212 | 158.5 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.004 | 0.006 | 118.3 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.245 | 0.286 | 0.223 | 0.286 | 158.0 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.016 | 0.008 | 0.016 | 118.3 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 22.059 | 25.355 | 20.436 | 25.355 | 155.0 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 161.469 | 203.855 | 159.316 | 203.855 | 118.3 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 10.584 | 12.104 | 9.851 | 12.104 | 145.9 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 77.386 | 79.121 | 76.619 | 79.121 | 118.2 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 183.166 | 195.734 | 182.066 | 195.734 | 153.7 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1548.852 | 1571.002 | 1547.661 | 1571.002 | 118.2 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.052 | 1.192 | 1.005 | 1.192 | 153.6 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.097 | 1.141 | 1.071 | 1.141 | 118.2 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.010 | 0.013 | 0.010 | 0.013 | 127.2 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.418 | 0.443 | 0.401 | 0.443 | 115.9 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.203 | 0.207 | 0.202 | 0.207 | 148.0 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.360 | 5.381 | 5.354 | 5.381 | 118.2 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 0.937 | 1.173 | 0.934 | 1.173 | 131.7 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.652 | 0.690 | 0.649 | 0.690 | 115.9 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 9.611 | 9.870 | 9.523 | 9.870 | 144.7 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 71.436 | 77.591 | 71.107 | 77.591 | 117.7 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 5.968 | 7.060 | 5.872 | 7.060 | 158.2 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 29.637 | 30.906 | 29.321 | 30.906 | 118.2 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.201 | 1.437 | 0.180 | 1.437 | 159.2 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.006 | 0.004 | 0.006 | 118.2 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.235 | 0.250 | 0.217 | 0.250 | 158.7 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.008 | 0.010 | 118.2 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 18.572 | 23.238 | 18.429 | 23.238 | 157.5 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 150.006 | 156.593 | 149.283 | 156.593 | 118.2 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.548 | 3.344 | 1.370 | 3.344 | 153.9 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.398 | 1.417 | 1.347 | 1.417 | 117.7 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.461 | 3.722 | 3.432 | 3.722 | 154.8 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 22.629 | 23.093 | 22.112 | 23.093 | 118.1 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.966 | 1.201 | 0.908 | 1.201 | 130.4 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.995 | 1.144 | 0.865 | 1.144 | 115.8 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 5.685 | 6.127 | 5.629 | 6.127 | 144.9 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 52.982 | 54.253 | 52.336 | 54.253 | 117.7 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.192 | 0.213 | 0.179 | 0.213 | 157.3 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.004 | 0.004 | 0.004 | 118.1 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.243 | 0.282 | 0.232 | 0.282 | 157.2 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.008 | 0.010 | 0.007 | 0.010 | 118.1 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 5.593 | 6.160 | 5.427 | 6.160 | 154.3 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 58.986 | 70.640 | 55.032 | 70.640 | 118.1 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.025 | 0.053 | 0.015 | 0.143 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.555 | 0.603 | 0.530 | 0.698 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.437 | 0.622 | 0.313 | 0.814 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.630 | 2.700 | 2.560 | 2.730 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.034 | 0.053 | 0.030 | 0.053 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.512 | 0.572 | 0.499 | 0.572 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 177.506 | 209.037 | 170.779 | 209.037 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1467.270 | 1541.479 | 1441.732 | 1541.479 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 159.260 | 169.326 | 155.326 | 169.326 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1449.951 | 1473.325 | 1435.689 | 1473.325 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.132 | 0.239 | 0.097 | 0.239 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.412 | 2.594 | 2.230 | 2.594 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.054 | 0.070 | 0.044 | 0.070 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.551 | 0.719 | 0.509 | 0.719 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.219 | 6.595 | 6.129 | 6.595 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 18.192 | 20.166 | 17.530 | 20.166 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 6.279 | 6.699 | 6.235 | 6.699 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 17.892 | 20.307 | 16.536 | 20.307 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 7.190 | 8.197 | 7.016 | 8.197 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 14.118 | 14.655 | 13.445 | 14.655 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.306 | 2.589 | 0.279 | 2.589 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.058 | 3.242 | 3.009 | 3.242 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.042 | 0.066 | 0.028 | 0.066 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.550 | 0.571 | 0.513 | 0.571 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 198.487 | 216.617 | 189.758 | 216.617 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1548.078 | 1603.659 | 1522.822 | 1603.659 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 165.819 | 231.664 | 163.456 | 231.664 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1437.349 | 1451.573 | 1435.625 | 1451.573 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.105 | 0.119 | 0.087 | 0.119 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.323 | 2.607 | 2.224 | 2.607 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.056 | 0.157 | 0.048 | 0.157 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.607 | 0.756 | 0.555 | 0.756 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 25.846 | 26.229 | 25.483 | 26.229 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 90.344 | 91.330 | 89.410 | 91.330 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 25.599 | 26.258 | 25.380 | 26.258 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 90.786 | 96.500 | 89.094 | 96.500 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 26.380 | 27.572 | 26.283 | 27.572 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 88.016 | 93.690 | 86.425 | 93.690 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.356 | 0.467 | 0.313 | 0.467 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.210 | 4.712 | 3.132 | 4.712 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.009 | 0.005 | 0.009 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.407 | 0.445 | 0.392 | 0.445 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 197.396 | 200.395 | 188.052 | 200.395 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1497.387 | 1534.803 | 1485.785 | 1534.803 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 162.000 | 183.961 | 153.388 | 183.961 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1453.821 | 1482.795 | 1444.913 | 1482.795 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.141 | 0.151 | 0.115 | 0.151 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.042 | 2.208 | 2.012 | 2.208 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.077 | 0.110 | 0.065 | 0.110 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.365 | 0.406 | 0.352 | 0.406 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 20.013 | 20.268 | 19.765 | 20.268 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 64.545 | 65.264 | 64.370 | 65.264 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 20.372 | 21.765 | 19.656 | 21.765 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 64.078 | 67.880 | 63.119 | 67.880 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 20.106 | 20.476 | 19.772 | 20.476 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 61.729 | 64.159 | 61.653 | 64.159 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.210 | 0.253 | 0.202 | 0.253 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.107 | 3.268 | 3.003 | 3.268 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.060 | 0.073 | 0.044 | 0.073 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.524 | 0.572 | 0.499 | 0.572 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 173.729 | 185.241 | 173.424 | 185.241 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1480.760 | 1511.259 | 1468.468 | 1511.259 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 165.779 | 199.486 | 165.722 | 199.486 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1490.489 | 1504.659 | 1470.778 | 1504.659 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.105 | 0.134 | 0.100 | 0.134 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 4.195 | 6.157 | 3.748 | 6.157 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.063 | 0.071 | 0.061 | 0.071 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.660 | 0.724 | 0.636 | 0.724 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.472 | 4.992 | 4.392 | 4.992 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 29.255 | 36.376 | 28.436 | 36.376 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.633 | 4.835 | 4.595 | 4.835 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 29.470 | 43.264 | 28.468 | 43.264 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.211 | 5.405 | 4.872 | 5.405 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 23.670 | 28.162 | 23.609 | 28.162 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.484 | 0.512 | 0.469 | 0.512 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 6.947 | 8.381 | 6.871 | 8.381 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.016 | 0.014 | 0.016 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.445 | 0.480 | 0.436 | 0.480 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 174.485 | 182.166 | 171.103 | 182.166 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1469.718 | 1490.393 | 1462.156 | 1490.393 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 164.345 | 177.695 | 157.290 | 177.695 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1444.971 | 1532.050 | 1444.069 | 1532.050 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.069 | 0.091 | 0.063 | 0.091 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.186 | 2.767 | 2.124 | 2.767 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.038 | 0.061 | 0.038 | 0.061 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.413 | 0.436 | 0.397 | 0.436 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.769 | 6.230 | 4.585 | 6.230 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.981 | 29.687 | 26.744 | 29.687 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 5.073 | 5.366 | 5.028 | 5.366 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 29.957 | 32.818 | 28.027 | 32.818 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 4.833 | 5.074 | 4.718 | 5.074 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 23.230 | 25.156 | 23.210 | 25.156 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.207 | 0.260 | 0.199 | 0.260 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.021 | 3.072 | 2.982 | 3.072 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.015 | 0.025 | 0.014 | 0.025 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.450 | 0.522 | 0.445 | 0.522 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 181.001 | 191.184 | 170.151 | 191.184 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1464.941 | 1499.609 | 1461.807 | 1499.609 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 157.160 | 169.847 | 153.381 | 169.847 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1454.577 | 1487.972 | 1440.638 | 1487.972 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.075 | 0.385 | 0.059 | 0.385 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.252 | 5.120 | 2.217 | 5.120 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.047 | 0.060 | 0.037 | 0.060 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.422 | 0.531 | 0.421 | 0.531 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.686 | 6.622 | 4.596 | 6.622 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.515 | 26.981 | 26.322 | 26.981 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 5.196 | 5.366 | 5.115 | 5.366 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.029 | 26.582 | 25.885 | 26.582 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 4.972 | 6.425 | 4.875 | 6.425 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 23.963 | 24.899 | 23.773 | 24.899 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.297 | 0.893 | 0.289 | 0.893 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.000 | 5.410 | 2.969 | 5.410 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.070 | 0.080 | 0.066 | 0.080 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.642 | 0.661 | 0.624 | 0.661 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 173.008 | 178.696 | 170.404 | 178.696 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1489.447 | 1605.584 | 1468.968 | 1605.584 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 163.688 | 171.577 | 158.128 | 171.577 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1442.929 | 1478.603 | 1436.903 | 1478.603 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.081 | 0.136 | 0.067 | 0.136 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.867 | 3.351 | 2.719 | 3.351 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.044 | 0.069 | 0.041 | 0.069 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.630 | 0.644 | 0.598 | 0.644 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.595 | 3.087 | 2.513 | 3.087 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 17.333 | 18.415 | 16.443 | 18.415 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 2.892 | 4.758 | 2.601 | 4.758 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 16.050 | 17.759 | 15.839 | 17.759 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.829 | 5.224 | 2.557 | 5.224 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 12.249 | 13.317 | 12.035 | 13.317 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.461 | 0.507 | 0.432 | 0.507 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.829 | 4.922 | 3.771 | 4.922 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.017 | 0.026 | 0.015 | 0.026 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.458 | 0.463 | 0.453 | 0.463 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 171.739 | 174.399 | 169.644 | 174.399 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1517.692 | 1573.468 | 1490.539 | 1573.468 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 160.804 | 166.661 | 154.710 | 166.661 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1463.644 | 1558.160 | 1441.155 | 1558.160 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.155 | 0.246 | 0.146 | 0.246 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.559 | 5.989 | 3.411 | 5.989 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.080 | 0.106 | 0.068 | 0.106 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.650 | 0.706 | 0.615 | 0.706 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.613 | 7.185 | 6.396 | 7.185 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 34.967 | 36.333 | 34.279 | 36.333 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.589 | 7.122 | 6.524 | 7.122 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 33.928 | 35.947 | 33.901 | 35.947 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.037 | 7.487 | 6.877 | 7.487 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 30.899 | 33.167 | 30.657 | 33.167 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.464 | 2.038 | 0.442 | 2.038 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.235 | 4.386 | 4.184 | 4.386 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.005 | 0.012 | 0.005 | 0.012 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.442 | 0.546 | 0.426 | 0.546 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 167.646 | 176.173 | 161.387 | 176.173 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1464.342 | 1503.973 | 1448.313 | 1503.973 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 154.316 | 162.146 | 152.213 | 162.146 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1474.118 | 1536.971 | 1448.932 | 1536.971 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.103 | 0.157 | 0.062 | 0.157 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.051 | 2.402 | 1.938 | 2.402 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.061 | 0.087 | 0.036 | 0.087 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.380 | 0.591 | 0.322 | 0.591 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.738 | 1.934 | 1.658 | 1.934 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 13.998 | 15.120 | 13.976 | 15.120 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.654 | 1.754 | 1.541 | 1.754 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 13.785 | 14.084 | 13.676 | 14.084 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.869 | 2.111 | 1.809 | 2.111 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 10.831 | 11.235 | 10.748 | 11.235 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.207 | 0.221 | 0.168 | 0.221 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.665 | 2.785 | 2.642 | 2.785 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.199 | 0.634 | 0.173 | 0.634 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.113 | 1.185 | 1.112 | 1.185 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 203.961 | 204.523 | 197.358 | 204.523 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1519.970 | 1551.155 | 1507.743 | 1551.155 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 171.588 | 184.192 | 164.696 | 184.192 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1488.714 | 1503.187 | 1460.504 | 1503.187 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.228 | 0.258 | 0.214 | 0.258 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.792 | 6.100 | 5.678 | 6.100 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.095 | 0.105 | 0.093 | 0.105 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.759 | 1.864 | 1.741 | 1.864 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 11.723 | 13.515 | 11.673 | 13.515 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 44.945 | 49.485 | 44.792 | 49.485 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 12.280 | 18.021 | 12.187 | 18.021 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 45.135 | 48.879 | 44.723 | 48.879 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 11.872 | 12.345 | 11.849 | 12.345 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 37.417 | 42.742 | 37.251 | 42.742 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 1.195 | 1.272 | 1.072 | 1.272 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.009 | 6.057 | 5.988 | 6.057 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.013 | 0.014 | 0.012 | 0.014 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.464 | 0.510 | 0.455 | 0.510 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 178.181 | 211.359 | 166.978 | 211.359 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1464.379 | 1529.870 | 1451.011 | 1529.870 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 158.389 | 186.225 | 150.070 | 186.225 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1453.200 | 1521.707 | 1440.138 | 1521.707 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.129 | 0.194 | 0.105 | 0.194 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.725 | 4.054 | 3.643 | 4.054 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.078 | 0.110 | 0.065 | 0.110 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.678 | 0.809 | 0.618 | 0.809 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.794 | 1.870 | 1.684 | 1.870 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 16.483 | 16.965 | 16.242 | 16.965 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.849 | 1.948 | 1.793 | 1.948 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 15.984 | 18.949 | 15.757 | 18.949 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 2.079 | 3.486 | 1.804 | 3.486 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 11.074 | 11.959 | 10.989 | 11.959 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.204 | 0.332 | 0.168 | 0.332 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 4.962 | 6.340 | 4.793 | 6.340 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.087 | 0.119 | 0.050 | 0.119 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.638 | 0.712 | 0.625 | 0.712 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 227.537 | 385.613 | 176.126 | 385.613 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1458.331 | 1474.238 | 1455.895 | 1474.238 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 173.687 | 182.527 | 165.503 | 182.527 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1448.807 | 1476.047 | 1432.859 | 1476.047 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.110 | 0.174 | 0.084 | 0.174 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 2.999 | 3.116 | 2.943 | 3.116 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.075 | 0.126 | 0.050 | 0.126 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.735 | 0.766 | 0.727 | 0.766 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 2.804 | 4.046 | 2.608 | 4.046 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 15.328 | 16.297 | 14.603 | 16.297 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 2.688 | 3.158 | 2.529 | 3.158 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 13.911 | 16.286 | 13.571 | 16.286 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 2.854 | 3.480 | 2.598 | 3.480 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.233 | 11.567 | 10.208 | 11.567 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.535 | 0.564 | 0.514 | 0.564 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.591 | 3.709 | 3.484 | 3.709 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.030 | 0.034 | 0.029 | 0.034 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.526 | 0.919 | 0.489 | 0.919 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 157.441 | 175.325 | 152.279 | 175.325 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1458.321 | 1494.938 | 1445.121 | 1494.938 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.072 | 0.089 | 0.057 | 0.089 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.229 | 2.410 | 2.188 | 2.410 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.035 | 0.046 | 0.033 | 0.046 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.511 | 0.537 | 0.501 | 0.537 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.395 | 2.025 | 1.182 | 2.025 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 11.643 | 11.928 | 11.485 | 11.928 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.343 | 2.522 | 1.312 | 2.522 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.128 | 11.917 | 10.945 | 11.917 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.107 | 3.163 | 1.651 | 3.163 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 7.936 | 12.267 | 7.719 | 12.267 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.373 | 1.783 | 0.329 | 1.783 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.110 | 3.312 | 3.045 | 3.312 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 164.060 | 166.132 | 161.383 | 166.132 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1443.874 | 1462.850 | 1441.793 | 1462.850 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.215 | 0.364 | 0.170 | 0.364 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.422 | 2.482 | 2.367 | 2.482 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.089 | 0.104 | 0.087 | 0.104 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.471 | 0.520 | 0.439 | 0.520 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 31.105 | 34.753 | 30.541 | 34.753 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 113.652 | 114.712 | 112.791 | 114.712 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.326 | 0.401 | 0.311 | 0.401 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.544 | 4.877 | 3.475 | 4.877 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 168.588 | 180.129 | 153.252 | 180.129 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1438.407 | 1462.117 | 1423.012 | 1462.117 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.164 | 0.208 | 0.149 | 0.208 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.080 | 2.203 | 2.043 | 2.203 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.047 | 0.050 | 0.047 | 0.050 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.443 | 0.477 | 0.431 | 0.477 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 26.645 | 29.631 | 26.036 | 29.631 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 87.813 | 88.817 | 84.936 | 88.817 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.194 | 0.219 | 0.191 | 0.219 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.768 | 2.887 | 2.689 | 2.887 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 166.908 | 211.441 | 160.841 | 211.441 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1439.916 | 1514.356 | 1437.878 | 1514.356 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.146 | 0.385 | 0.108 | 0.385 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 1.983 | 2.040 | 1.981 | 2.040 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.039 | 0.074 | 0.038 | 0.074 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.401 | 0.427 | 0.389 | 0.427 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 4.076 | 5.033 | 3.713 | 5.033 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 20.068 | 21.182 | 19.454 | 21.182 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.183 | 1.003 | 0.157 | 1.003 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.655 | 2.723 | 2.648 | 2.723 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 157.921 | 168.132 | 154.631 | 168.132 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1447.938 | 1484.103 | 1446.358 | 1484.103 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.168 | 0.246 | 0.149 | 0.246 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.077 | 2.228 | 2.016 | 2.228 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.051 | 0.077 | 0.047 | 0.077 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.464 | 0.481 | 0.457 | 0.481 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 30.342 | 31.994 | 30.287 | 31.994 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 108.995 | 112.819 | 106.912 | 112.819 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.207 | 0.355 | 0.201 | 0.355 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.723 | 3.063 | 2.639 | 3.063 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 154.129 | 157.725 | 153.714 | 157.725 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1448.747 | 1507.666 | 1420.825 | 1507.666 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.102 | 0.249 | 0.102 | 0.249 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.084 | 2.299 | 2.058 | 2.299 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.038 | 0.040 | 0.038 | 0.040 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.429 | 0.468 | 0.429 | 0.468 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 3.895 | 5.016 | 3.716 | 5.016 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 21.206 | 22.780 | 20.483 | 22.780 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.182 | 0.267 | 0.158 | 0.267 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.615 | 2.803 | 2.591 | 2.803 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 154.325 | 168.669 | 152.763 | 168.669 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1448.074 | 1471.796 | 1436.210 | 1471.796 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.162 | 0.192 | 0.157 | 0.192 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.071 | 2.308 | 2.026 | 2.308 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.049 | 0.063 | 0.048 | 0.063 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.472 | 0.509 | 0.426 | 0.509 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 31.339 | 32.038 | 30.226 | 32.038 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 108.121 | 110.467 | 107.527 | 110.467 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.220 | 0.362 | 0.189 | 0.362 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.721 | 2.880 | 2.629 | 2.880 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 158.703 | 168.000 | 153.062 | 168.000 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1462.636 | 1481.402 | 1453.692 | 1481.402 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.140 | 0.176 | 0.127 | 0.176 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.062 | 2.082 | 2.036 | 2.082 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.039 | 0.043 | 0.039 | 0.043 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.424 | 0.573 | 0.415 | 0.573 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 4.414 | 5.335 | 4.118 | 5.335 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 21.075 | 24.171 | 20.163 | 24.171 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.159 | 0.196 | 0.156 | 0.196 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.687 | 2.755 | 2.655 | 2.755 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 181.646 | 193.615 | 172.292 | 193.615 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1488.506 | 1534.675 | 1472.947 | 1534.675 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 163.245 | 173.343 | 158.638 | 173.343 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1461.553 | 1515.706 | 1454.832 | 1515.706 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.173 | 0.200 | 0.163 | 0.200 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.685 | 3.945 | 3.618 | 3.945 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.098 | 0.127 | 0.080 | 0.127 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.633 | 0.717 | 0.622 | 0.717 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.045 | 0.068 | 0.034 | 0.068 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.504 | 0.530 | 0.482 | 0.530 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.439 | 1.979 | 0.408 | 1.979 | 142.1 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 26.867 | 38.164 | 24.540 | 38.164 | 118.7 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 175.678 | 180.663 | 171.298 | 180.663 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1561.591 | 1625.025 | 1537.703 | 1625.025 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 162.769 | 181.885 | 160.260 | 181.885 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1522.186 | 1539.239 | 1488.176 | 1539.239 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.175 | 0.184 | 0.155 | 0.184 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.769 | 4.270 | 3.575 | 4.270 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.087 | 0.100 | 0.077 | 0.100 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.731 | 0.792 | 0.666 | 0.792 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.048 | 0.060 | 0.038 | 0.060 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.506 | 0.553 | 0.476 | 0.553 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.706 | 0.886 | 0.669 | 0.886 | 142.8 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 67.753 | 69.485 | 67.300 | 69.485 | 119.4 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 175.081 | 189.732 | 171.383 | 189.732 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1475.775 | 1515.694 | 1470.084 | 1515.694 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 157.464 | 175.604 | 154.916 | 175.604 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1468.615 | 1510.325 | 1439.491 | 1510.325 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.139 | 0.175 | 0.131 | 0.175 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.183 | 2.403 | 2.081 | 2.403 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.067 | 0.122 | 0.046 | 0.122 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.409 | 0.447 | 0.392 | 0.447 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.020 | 0.013 | 0.020 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.435 | 0.470 | 0.428 | 0.470 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.349 | 0.432 | 0.321 | 0.432 | 137.8 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.494 | 19.750 | 19.374 | 19.750 | 118.3 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 182.129 | 200.815 | 174.726 | 200.815 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1490.964 | 1549.515 | 1478.071 | 1549.515 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 159.495 | 191.338 | 155.748 | 191.338 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1472.552 | 1485.065 | 1456.841 | 1485.065 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.146 | 0.168 | 0.113 | 0.168 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.155 | 2.531 | 2.108 | 2.531 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.069 | 0.178 | 0.046 | 0.178 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.425 | 0.475 | 0.407 | 0.475 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.015 | 0.288 | 0.011 | 0.288 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.442 | 0.510 | 0.435 | 0.510 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.298 | 1.120 | 0.269 | 1.120 | 139.0 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.918 | 17.725 | 16.525 | 17.725 | 118.0 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 156.011 | 165.286 | 153.436 | 165.286 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1460.908 | 1514.744 | 1456.457 | 1514.744 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.553 | 0.698 | 0.469 | 0.698 | 137.0 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 16.883 | 18.064 | 16.859 | 18.064 | 117.9 |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>14:48:29 - cmdstanpy - INFO - Chain [1] start processing<br>14:48:29 - cmdstanpy - INFO - Chain [1] done processing<br>14:48:29 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=52468 data file=/tmp/tmpu0lkf3sd/louo70u9.json init=/tmp/tmpu0lkf3sd/1jdnadqh.json output file=/tmp/tmpu0lkf3sd/prophet_modelxr_v7ek0/prophet_model-20261005144829.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpu0lkf3sd/louo70u9.json<br>init = /tmp/tmpu0lkf3sd/1jdnadqh.json<br>random<br>  seed = 52468<br>output<br>  file = /tmp/tmpu0lkf3sd/prophet_modelxr_v7ek0/prophet_model-20261005144829.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1154, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1131, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 897, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 692, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 263, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 220, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=52468 data file=/tmp/tmpu0lkf3sd/louo70u9.json init=/tmp/tmpu0lkf3sd/1jdnadqh.json output file=/tmp/tmpu0lkf3sd/prophet_modelxr_v7ek0/prophet_model-20261005144829.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpu0lkf3s |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>14:48:30 - cmdstanpy - INFO - Chain [1] start processing<br>14:48:30 - cmdstanpy - INFO - Chain [1] done processing<br>14:48:30 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=26565 data file=/tmp/tmpdg4upog8/y2r8w503.json init=/tmp/tmpdg4upog8/chx5s8bx.json output file=/tmp/tmpdg4upog8/prophet_modelf1_3kwmx/prophet_model-20261005144830.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpdg4upog8/y2r8w503.json<br>init = /tmp/tmpdg4upog8/chx5s8bx.json<br>random<br>  seed = 26565<br>output<br>  file = /tmp/tmpdg4upog8/prophet_modelf1_3kwmx/prophet_model-20261005144830.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1154, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1131, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 897, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 692, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 263, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 220, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=26565 data file=/tmp/tmpdg4upog8/y2r8w503.json init=/tmp/tmpdg4upog8/chx5s8bx.json output file=/tmp/tmpdg4upog8/prophet_modelf1_3kwmx/prophet_model-20261005144830.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpdg4upog |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1154, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1131, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 897, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 695, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 351, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1154, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1131, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 897, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 695, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 351, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `d2a974c150fb09fb54fb4b3aeac555247a1deb35` (dirty)
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `fixed-linear-prediction-medium`, `map-explicit-break-small`, `map-seasonal-breaks-irregular-medium`, `map-mixed-features-explicit-small`, `map-mixed-features-automatic-large`, `map-events-small`, `map-regressors-medium`, `map-conditional-seasonalities-medium`, `linear-defaults-small`, `linear-defaults-medium`, `linear-defaults-irregular`, `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `evaluation-training-duplicates`, `linear-offset-scaling-absmax`, `linear-offset-scaling-minmax`, `linear-mixed-components`, `uncertainty-linear-offset-scaling-absmax-historical-intervals-128`, `uncertainty-linear-offset-scaling-absmax-one-future-samples-128`, `uncertainty-linear-mixed-components-mixed-intervals-128`, `uncertainty-linear-mixed-components-mixed-samples-512`, `evaluation-linear-point`, `evaluation-linear-intervals`, `evaluation-linear-search`, `evaluation-linear-failure-search`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/tools/runtime/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:ecdbf1674372adc3d7d3f78ffa30dbabfe2d98d32f90ca17f5d424a05b4ada05`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:9209b9f8b7905d93190c45ac0caa73f28a714f9fa18d93ff3bd3a2777e81a8d7`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.0`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via process.resourceUsage.maxRSS (Linux KiB); includes imports and previous operations; excludes subprocess peaks; heap/WASM-only peaks unavailable; Effect tracing disabled

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/aarch64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `input-numeric-dtype=float64`, `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

