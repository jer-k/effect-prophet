# Effect Prophet benchmark — 2026-10-04T184932-255Z-730ead62

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
| evaluation-linear-failure-search | evaluation-holdout | effect-prophet | 4 | 5.912 | 6.681 | 5.822 | 6.681 | 158.7 |
| evaluation-linear-failure-search | evaluation-holdout | python-prophet | 4 | 29.603 | 29.958 | 29.421 | 29.958 | 118.3 |
| evaluation-linear-failure-search | evaluation-report-decode | effect-prophet | 4 | 0.205 | 0.229 | 0.198 | 0.229 | 159.4 |
| evaluation-linear-failure-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 118.3 |
| evaluation-linear-failure-search | evaluation-report-encode | effect-prophet | 4 | 0.234 | 0.700 | 0.222 | 0.700 | 159.2 |
| evaluation-linear-failure-search | evaluation-report-encode | python-prophet | 4 | 0.010 | 0.015 | 0.010 | 0.015 | 118.3 |
| evaluation-linear-failure-search | evaluation-search | effect-prophet | 4 | 18.625 | 23.445 | 18.616 | 23.445 | 156.2 |
| evaluation-linear-failure-search | evaluation-search | python-prophet | 4 | 149.099 | 150.913 | 148.708 | 150.913 | 118.3 |
| evaluation-linear-intervals | evaluation-intervals | effect-prophet | 4 | 9.325 | 12.030 | 9.308 | 12.030 | 146.1 |
| evaluation-linear-intervals | evaluation-intervals | python-prophet | 4 | 77.375 | 86.188 | 76.667 | 86.188 | 118.3 |
| evaluation-linear-point | cold-first-evaluation | effect-prophet | 4 | 190.836 | 194.395 | 187.589 | 194.395 | 149.2 |
| evaluation-linear-point | cold-first-evaluation | python-prophet | 4 | 1499.224 | 1506.519 | 1481.791 | 1506.519 | 118.4 |
| evaluation-linear-point | evaluation-baseline | effect-prophet | 4 | 1.033 | 1.245 | 0.982 | 1.245 | 149.2 |
| evaluation-linear-point | evaluation-baseline | python-prophet | 4 | 1.109 | 1.145 | 1.105 | 1.145 | 118.4 |
| evaluation-linear-point | evaluation-input-conversion | effect-prophet | 4 | 0.011 | 0.013 | 0.010 | 0.013 | 123.9 |
| evaluation-linear-point | evaluation-input-conversion | python-prophet | 4 | 0.411 | 0.447 | 0.408 | 0.447 | 116.0 |
| evaluation-linear-point | evaluation-metrics | effect-prophet | 4 | 0.210 | 0.310 | 0.195 | 0.310 | 144.7 |
| evaluation-linear-point | evaluation-metrics | python-prophet | 4 | 5.365 | 5.462 | 5.318 | 5.462 | 118.4 |
| evaluation-linear-point | evaluation-plan | effect-prophet | 4 | 1.304 | 1.522 | 0.998 | 1.522 | 128.6 |
| evaluation-linear-point | evaluation-plan | python-prophet | 4 | 0.654 | 0.771 | 0.637 | 0.771 | 116.0 |
| evaluation-linear-point | evaluation-point | effect-prophet | 4 | 8.744 | 11.865 | 8.372 | 11.865 | 141.0 |
| evaluation-linear-point | evaluation-point | python-prophet | 4 | 73.105 | 74.549 | 72.910 | 74.549 | 117.9 |
| evaluation-linear-search | evaluation-holdout | effect-prophet | 4 | 5.390 | 5.774 | 5.352 | 5.774 | 155.8 |
| evaluation-linear-search | evaluation-holdout | python-prophet | 4 | 29.462 | 30.589 | 29.266 | 30.589 | 118.2 |
| evaluation-linear-search | evaluation-report-decode | effect-prophet | 4 | 0.228 | 0.596 | 0.210 | 0.596 | 156.7 |
| evaluation-linear-search | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.005 | 0.004 | 0.005 | 118.2 |
| evaluation-linear-search | evaluation-report-encode | effect-prophet | 4 | 0.222 | 0.261 | 0.215 | 0.261 | 156.2 |
| evaluation-linear-search | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.008 | 0.011 | 118.2 |
| evaluation-linear-search | evaluation-search | effect-prophet | 4 | 18.368 | 22.315 | 17.366 | 22.315 | 152.9 |
| evaluation-linear-search | evaluation-search | python-prophet | 4 | 151.709 | 153.801 | 148.720 | 153.801 | 118.2 |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.613 | 3.050 | 1.411 | 3.050 | 152.3 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.367 | 1.440 | 1.365 | 1.440 | 117.7 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 3.207 | 6.281 | 3.033 | 6.281 | 153.9 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 22.082 | 22.488 | 21.913 | 22.488 | 118.1 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 1.081 | 1.669 | 1.071 | 1.669 | 130.8 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 0.969 | 1.019 | 0.908 | 1.019 | 115.8 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 5.065 | 5.469 | 4.755 | 5.469 | 144.0 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 52.925 | 53.235 | 52.111 | 53.235 | 117.7 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.199 | 0.313 | 0.194 | 0.313 | 154.5 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.004 | 0.006 | 0.004 | 0.006 | 118.1 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.224 | 0.251 | 0.217 | 0.251 | 154.4 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.011 | 0.007 | 0.011 | 118.1 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 5.485 | 6.575 | 4.950 | 6.575 | 153.2 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 53.595 | 54.749 | 53.230 | 54.749 | 118.1 |
| fixed-linear-prediction-medium | adapter-input-conversion | effect-prophet | 30 | 0.048 | 0.129 | 0.028 | 0.228 | n/a |
| fixed-linear-prediction-medium | adapter-input-conversion | python-prophet | 30 | 0.572 | 0.655 | 0.543 | 0.810 | n/a |
| fixed-linear-prediction-medium | warm-predict | effect-prophet | 30 | 0.517 | 0.734 | 0.344 | 2.329 | n/a |
| fixed-linear-prediction-medium | warm-predict | python-prophet | 30 | 2.781 | 2.907 | 2.593 | 4.463 | n/a |
| linear-defaults-irregular | adapter-input-conversion | effect-prophet | 6 | 0.031 | 0.035 | 0.030 | 0.035 | n/a |
| linear-defaults-irregular | adapter-input-conversion | python-prophet | 6 | 0.536 | 0.590 | 0.524 | 0.590 | n/a |
| linear-defaults-irregular | cold-first-forecast | effect-prophet | 6 | 188.232 | 206.491 | 180.455 | 206.491 | n/a |
| linear-defaults-irregular | cold-first-forecast | python-prophet | 6 | 1478.193 | 1487.288 | 1475.048 | 1487.288 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | effect-prophet | 6 | 161.580 | 172.233 | 159.173 | 172.233 | n/a |
| linear-defaults-irregular | fresh-process-restored-predict | python-prophet | 6 | 1464.249 | 1515.092 | 1453.258 | 1515.092 | n/a |
| linear-defaults-irregular | model-json-decode | effect-prophet | 6 | 0.090 | 0.164 | 0.076 | 0.164 | n/a |
| linear-defaults-irregular | model-json-decode | python-prophet | 6 | 2.259 | 2.501 | 2.235 | 2.501 | n/a |
| linear-defaults-irregular | model-json-encode | effect-prophet | 6 | 0.051 | 0.069 | 0.045 | 0.069 | n/a |
| linear-defaults-irregular | model-json-encode | python-prophet | 6 | 0.554 | 0.603 | 0.530 | 0.603 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | effect-prophet | 6 | 14.528 | 15.679 | 14.398 | 15.679 | n/a |
| linear-defaults-irregular | warm-fit-predict-with-conversion | python-prophet | 6 | 17.849 | 20.625 | 17.696 | 20.625 | n/a |
| linear-defaults-irregular | warm-fit-predict | effect-prophet | 6 | 14.758 | 15.257 | 14.536 | 15.257 | n/a |
| linear-defaults-irregular | warm-fit-predict | python-prophet | 6 | 17.483 | 17.753 | 17.439 | 17.753 | n/a |
| linear-defaults-irregular | warm-fit | effect-prophet | 6 | 15.610 | 16.117 | 15.548 | 16.117 | n/a |
| linear-defaults-irregular | warm-fit | python-prophet | 6 | 15.693 | 18.019 | 15.109 | 18.019 | n/a |
| linear-defaults-irregular | warm-predict | effect-prophet | 6 | 0.448 | 1.623 | 0.329 | 1.623 | n/a |
| linear-defaults-irregular | warm-predict | python-prophet | 6 | 3.158 | 3.317 | 3.085 | 3.317 | n/a |
| linear-defaults-medium | adapter-input-conversion | effect-prophet | 6 | 0.033 | 0.044 | 0.031 | 0.044 | n/a |
| linear-defaults-medium | adapter-input-conversion | python-prophet | 6 | 0.599 | 2.185 | 0.557 | 2.185 | n/a |
| linear-defaults-medium | cold-first-forecast | effect-prophet | 6 | 255.883 | 273.603 | 238.755 | 273.603 | n/a |
| linear-defaults-medium | cold-first-forecast | python-prophet | 6 | 1615.053 | 2632.489 | 1531.325 | 2632.489 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | effect-prophet | 6 | 168.954 | 196.754 | 158.911 | 196.754 | n/a |
| linear-defaults-medium | fresh-process-restored-predict | python-prophet | 6 | 1545.322 | 2224.512 | 1497.618 | 2224.512 | n/a |
| linear-defaults-medium | model-json-decode | effect-prophet | 6 | 0.099 | 0.106 | 0.084 | 0.106 | n/a |
| linear-defaults-medium | model-json-decode | python-prophet | 6 | 2.795 | 4.485 | 2.418 | 4.485 | n/a |
| linear-defaults-medium | model-json-encode | effect-prophet | 6 | 0.051 | 0.068 | 0.050 | 0.068 | n/a |
| linear-defaults-medium | model-json-encode | python-prophet | 6 | 0.617 | 1.980 | 0.598 | 1.980 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 69.806 | 70.771 | 69.138 | 70.771 | n/a |
| linear-defaults-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 93.554 | 139.214 | 92.094 | 139.214 | n/a |
| linear-defaults-medium | warm-fit-predict | effect-prophet | 6 | 70.080 | 71.213 | 67.327 | 71.213 | n/a |
| linear-defaults-medium | warm-fit-predict | python-prophet | 6 | 96.209 | 149.977 | 90.615 | 149.977 | n/a |
| linear-defaults-medium | warm-fit | effect-prophet | 6 | 70.017 | 74.454 | 67.293 | 74.454 | n/a |
| linear-defaults-medium | warm-fit | python-prophet | 6 | 87.639 | 159.833 | 87.549 | 159.833 | n/a |
| linear-defaults-medium | warm-predict | effect-prophet | 6 | 0.423 | 1.336 | 0.375 | 1.336 | n/a |
| linear-defaults-medium | warm-predict | python-prophet | 6 | 3.832 | 8.721 | 3.254 | 8.721 | n/a |
| linear-defaults-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.008 | 0.006 | 0.008 | n/a |
| linear-defaults-small | adapter-input-conversion | python-prophet | 6 | 0.443 | 0.530 | 0.413 | 0.530 | n/a |
| linear-defaults-small | cold-first-forecast | effect-prophet | 6 | 205.260 | 212.792 | 201.940 | 212.792 | n/a |
| linear-defaults-small | cold-first-forecast | python-prophet | 6 | 1512.070 | 1535.046 | 1510.127 | 1535.046 | n/a |
| linear-defaults-small | fresh-process-restored-predict | effect-prophet | 6 | 166.194 | 202.177 | 157.287 | 202.177 | n/a |
| linear-defaults-small | fresh-process-restored-predict | python-prophet | 6 | 1458.600 | 1710.997 | 1446.355 | 1710.997 | n/a |
| linear-defaults-small | model-json-decode | effect-prophet | 6 | 0.140 | 0.166 | 0.113 | 0.166 | n/a |
| linear-defaults-small | model-json-decode | python-prophet | 6 | 2.067 | 2.174 | 2.016 | 2.174 | n/a |
| linear-defaults-small | model-json-encode | effect-prophet | 6 | 0.067 | 0.072 | 0.062 | 0.072 | n/a |
| linear-defaults-small | model-json-encode | python-prophet | 6 | 0.386 | 0.414 | 0.371 | 0.414 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 34.230 | 37.499 | 33.270 | 37.499 | n/a |
| linear-defaults-small | warm-fit-predict-with-conversion | python-prophet | 6 | 66.037 | 67.160 | 65.364 | 67.160 | n/a |
| linear-defaults-small | warm-fit-predict | effect-prophet | 6 | 34.145 | 35.340 | 32.592 | 35.340 | n/a |
| linear-defaults-small | warm-fit-predict | python-prophet | 6 | 65.515 | 70.798 | 64.907 | 70.798 | n/a |
| linear-defaults-small | warm-fit | effect-prophet | 6 | 34.053 | 36.093 | 32.790 | 36.093 | n/a |
| linear-defaults-small | warm-fit | python-prophet | 6 | 61.784 | 63.129 | 61.093 | 63.129 | n/a |
| linear-defaults-small | warm-predict | effect-prophet | 6 | 0.244 | 0.328 | 0.229 | 0.328 | n/a |
| linear-defaults-small | warm-predict | python-prophet | 6 | 3.150 | 3.246 | 3.124 | 3.246 | n/a |
| linear-mixed-components | adapter-input-conversion | effect-prophet | 4 | 0.044 | 0.073 | 0.043 | 0.073 | n/a |
| linear-mixed-components | adapter-input-conversion | python-prophet | 4 | 0.518 | 0.525 | 0.513 | 0.525 | n/a |
| linear-mixed-components | cold-first-forecast | effect-prophet | 4 | 181.642 | 183.444 | 179.708 | 183.444 | n/a |
| linear-mixed-components | cold-first-forecast | python-prophet | 4 | 1462.860 | 1507.194 | 1459.395 | 1507.194 | n/a |
| linear-mixed-components | fresh-process-restored-predict | effect-prophet | 4 | 162.516 | 175.805 | 162.160 | 175.805 | n/a |
| linear-mixed-components | fresh-process-restored-predict | python-prophet | 4 | 1439.105 | 1441.350 | 1428.130 | 1441.350 | n/a |
| linear-mixed-components | model-json-decode | effect-prophet | 4 | 0.119 | 0.127 | 0.114 | 0.127 | n/a |
| linear-mixed-components | model-json-decode | python-prophet | 4 | 3.649 | 3.849 | 3.635 | 3.849 | n/a |
| linear-mixed-components | model-json-encode | effect-prophet | 4 | 0.063 | 0.207 | 0.061 | 0.207 | n/a |
| linear-mixed-components | model-json-encode | python-prophet | 4 | 0.644 | 0.678 | 0.637 | 0.678 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.586 | 5.631 | 4.402 | 5.631 | n/a |
| linear-mixed-components | warm-fit-predict-with-conversion | python-prophet | 4 | 28.413 | 28.442 | 28.154 | 28.442 | n/a |
| linear-mixed-components | warm-fit-predict | effect-prophet | 4 | 4.690 | 4.745 | 4.501 | 4.745 | n/a |
| linear-mixed-components | warm-fit-predict | python-prophet | 4 | 27.831 | 28.593 | 27.454 | 28.593 | n/a |
| linear-mixed-components | warm-fit | effect-prophet | 4 | 5.187 | 5.344 | 5.167 | 5.344 | n/a |
| linear-mixed-components | warm-fit | python-prophet | 4 | 22.898 | 23.306 | 22.497 | 23.306 | n/a |
| linear-mixed-components | warm-predict | effect-prophet | 4 | 0.503 | 0.525 | 0.498 | 0.525 | n/a |
| linear-mixed-components | warm-predict | python-prophet | 4 | 4.773 | 4.914 | 4.719 | 4.914 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.024 | 0.015 | 0.024 | n/a |
| linear-offset-scaling-absmax | adapter-input-conversion | python-prophet | 4 | 0.457 | 0.467 | 0.432 | 0.467 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | effect-prophet | 4 | 180.149 | 183.825 | 173.421 | 183.825 | n/a |
| linear-offset-scaling-absmax | cold-first-forecast | python-prophet | 4 | 1450.559 | 1462.529 | 1449.975 | 1462.529 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | effect-prophet | 4 | 165.487 | 181.837 | 165.327 | 181.837 | n/a |
| linear-offset-scaling-absmax | fresh-process-restored-predict | python-prophet | 4 | 1438.272 | 1486.130 | 1435.560 | 1486.130 | n/a |
| linear-offset-scaling-absmax | model-json-decode | effect-prophet | 4 | 0.081 | 0.119 | 0.072 | 0.119 | n/a |
| linear-offset-scaling-absmax | model-json-decode | python-prophet | 4 | 2.141 | 2.205 | 2.111 | 2.205 | n/a |
| linear-offset-scaling-absmax | model-json-encode | effect-prophet | 4 | 0.048 | 0.061 | 0.047 | 0.061 | n/a |
| linear-offset-scaling-absmax | model-json-encode | python-prophet | 4 | 0.405 | 0.442 | 0.399 | 0.442 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.063 | 6.144 | 3.950 | 6.144 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.994 | 27.611 | 26.896 | 27.611 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | effect-prophet | 4 | 4.438 | 4.644 | 4.434 | 4.644 | n/a |
| linear-offset-scaling-absmax | warm-fit-predict | python-prophet | 4 | 26.236 | 26.568 | 26.010 | 26.568 | n/a |
| linear-offset-scaling-absmax | warm-fit | effect-prophet | 4 | 4.176 | 4.350 | 4.165 | 4.350 | n/a |
| linear-offset-scaling-absmax | warm-fit | python-prophet | 4 | 23.633 | 24.116 | 23.408 | 24.116 | n/a |
| linear-offset-scaling-absmax | warm-predict | effect-prophet | 4 | 0.211 | 0.268 | 0.204 | 0.268 | n/a |
| linear-offset-scaling-absmax | warm-predict | python-prophet | 4 | 3.065 | 3.101 | 3.045 | 3.101 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | effect-prophet | 4 | 0.016 | 0.024 | 0.016 | 0.024 | n/a |
| linear-offset-scaling-minmax | adapter-input-conversion | python-prophet | 4 | 0.452 | 0.498 | 0.426 | 0.498 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | effect-prophet | 4 | 181.178 | 185.908 | 180.250 | 185.908 | n/a |
| linear-offset-scaling-minmax | cold-first-forecast | python-prophet | 4 | 1452.720 | 1460.983 | 1450.967 | 1460.983 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | effect-prophet | 4 | 166.047 | 167.964 | 164.868 | 167.964 | n/a |
| linear-offset-scaling-minmax | fresh-process-restored-predict | python-prophet | 4 | 1446.110 | 1458.483 | 1427.882 | 1458.483 | n/a |
| linear-offset-scaling-minmax | model-json-decode | effect-prophet | 4 | 0.085 | 0.105 | 0.069 | 0.105 | n/a |
| linear-offset-scaling-minmax | model-json-decode | python-prophet | 4 | 2.340 | 2.594 | 2.163 | 2.594 | n/a |
| linear-offset-scaling-minmax | model-json-encode | effect-prophet | 4 | 0.044 | 0.059 | 0.040 | 0.059 | n/a |
| linear-offset-scaling-minmax | model-json-encode | python-prophet | 4 | 0.459 | 0.480 | 0.408 | 0.480 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | effect-prophet | 4 | 4.019 | 5.487 | 3.951 | 5.487 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict-with-conversion | python-prophet | 4 | 26.821 | 28.926 | 26.687 | 28.926 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | effect-prophet | 4 | 4.475 | 4.616 | 4.450 | 4.616 | n/a |
| linear-offset-scaling-minmax | warm-fit-predict | python-prophet | 4 | 26.424 | 28.480 | 26.396 | 28.480 | n/a |
| linear-offset-scaling-minmax | warm-fit | effect-prophet | 4 | 4.257 | 5.281 | 4.176 | 5.281 | n/a |
| linear-offset-scaling-minmax | warm-fit | python-prophet | 4 | 23.251 | 23.506 | 22.957 | 23.506 | n/a |
| linear-offset-scaling-minmax | warm-predict | effect-prophet | 4 | 0.225 | 0.232 | 0.209 | 0.232 | n/a |
| linear-offset-scaling-minmax | warm-predict | python-prophet | 4 | 3.079 | 3.234 | 3.071 | 3.234 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | effect-prophet | 6 | 0.076 | 0.095 | 0.070 | 0.095 | n/a |
| map-conditional-seasonalities-medium | adapter-input-conversion | python-prophet | 6 | 0.658 | 0.894 | 0.654 | 0.894 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | effect-prophet | 6 | 193.791 | 231.294 | 192.601 | 231.294 | n/a |
| map-conditional-seasonalities-medium | cold-first-forecast | python-prophet | 6 | 1503.682 | 1684.068 | 1486.698 | 1684.068 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | effect-prophet | 6 | 183.952 | 222.031 | 180.183 | 222.031 | n/a |
| map-conditional-seasonalities-medium | fresh-process-restored-predict | python-prophet | 6 | 1491.801 | 1652.624 | 1468.455 | 1652.624 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | effect-prophet | 6 | 0.093 | 0.133 | 0.077 | 0.133 | n/a |
| map-conditional-seasonalities-medium | model-json-decode | python-prophet | 6 | 2.772 | 3.060 | 2.655 | 3.060 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | effect-prophet | 6 | 0.045 | 0.063 | 0.038 | 0.063 | n/a |
| map-conditional-seasonalities-medium | model-json-encode | python-prophet | 6 | 0.640 | 1.172 | 0.626 | 1.172 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.236 | 5.857 | 2.687 | 5.857 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 17.107 | 19.129 | 16.764 | 19.129 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | effect-prophet | 6 | 3.107 | 10.463 | 2.758 | 10.463 | n/a |
| map-conditional-seasonalities-medium | warm-fit-predict | python-prophet | 6 | 16.855 | 18.802 | 16.374 | 18.802 | n/a |
| map-conditional-seasonalities-medium | warm-fit | effect-prophet | 6 | 2.993 | 6.078 | 2.915 | 6.078 | n/a |
| map-conditional-seasonalities-medium | warm-fit | python-prophet | 6 | 12.832 | 14.831 | 12.590 | 14.831 | n/a |
| map-conditional-seasonalities-medium | warm-predict | effect-prophet | 6 | 0.592 | 0.692 | 0.451 | 0.692 | n/a |
| map-conditional-seasonalities-medium | warm-predict | python-prophet | 6 | 3.895 | 4.030 | 3.880 | 4.030 | n/a |
| map-events-small | adapter-input-conversion | effect-prophet | 6 | 0.019 | 0.035 | 0.017 | 0.035 | n/a |
| map-events-small | adapter-input-conversion | python-prophet | 6 | 0.493 | 0.526 | 0.476 | 0.526 | n/a |
| map-events-small | cold-first-forecast | effect-prophet | 6 | 192.851 | 240.630 | 186.324 | 240.630 | n/a |
| map-events-small | cold-first-forecast | python-prophet | 6 | 1499.263 | 1624.209 | 1481.534 | 1624.209 | n/a |
| map-events-small | fresh-process-restored-predict | effect-prophet | 6 | 181.461 | 220.013 | 180.451 | 220.013 | n/a |
| map-events-small | fresh-process-restored-predict | python-prophet | 6 | 1523.766 | 1772.932 | 1461.484 | 1772.932 | n/a |
| map-events-small | model-json-decode | effect-prophet | 6 | 0.156 | 0.199 | 0.138 | 0.199 | n/a |
| map-events-small | model-json-decode | python-prophet | 6 | 3.610 | 4.143 | 3.411 | 4.143 | n/a |
| map-events-small | model-json-encode | effect-prophet | 6 | 0.082 | 0.088 | 0.064 | 0.088 | n/a |
| map-events-small | model-json-encode | python-prophet | 6 | 0.618 | 0.668 | 0.588 | 0.668 | n/a |
| map-events-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 6.531 | 7.883 | 6.261 | 7.883 | n/a |
| map-events-small | warm-fit-predict-with-conversion | python-prophet | 6 | 35.622 | 38.397 | 34.882 | 38.397 | n/a |
| map-events-small | warm-fit-predict | effect-prophet | 6 | 6.581 | 6.849 | 6.197 | 6.849 | n/a |
| map-events-small | warm-fit-predict | python-prophet | 6 | 35.535 | 39.851 | 34.071 | 39.851 | n/a |
| map-events-small | warm-fit | effect-prophet | 6 | 7.203 | 8.823 | 6.572 | 8.823 | n/a |
| map-events-small | warm-fit | python-prophet | 6 | 32.405 | 36.901 | 31.800 | 36.901 | n/a |
| map-events-small | warm-predict | effect-prophet | 6 | 0.982 | 2.302 | 0.504 | 2.302 | n/a |
| map-events-small | warm-predict | python-prophet | 6 | 4.440 | 5.575 | 4.284 | 5.575 | n/a |
| map-explicit-break-small | adapter-input-conversion | effect-prophet | 6 | 0.006 | 0.007 | 0.006 | 0.007 | n/a |
| map-explicit-break-small | adapter-input-conversion | python-prophet | 6 | 0.466 | 0.486 | 0.443 | 0.486 | n/a |
| map-explicit-break-small | cold-first-forecast | effect-prophet | 6 | 209.690 | 216.908 | 188.012 | 216.908 | n/a |
| map-explicit-break-small | cold-first-forecast | python-prophet | 6 | 1498.225 | 1533.033 | 1473.961 | 1533.033 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | effect-prophet | 6 | 208.717 | 255.558 | 173.306 | 255.558 | n/a |
| map-explicit-break-small | fresh-process-restored-predict | python-prophet | 6 | 1484.034 | 1514.608 | 1460.885 | 1514.608 | n/a |
| map-explicit-break-small | model-json-decode | effect-prophet | 6 | 0.085 | 0.104 | 0.074 | 0.104 | n/a |
| map-explicit-break-small | model-json-decode | python-prophet | 6 | 2.030 | 2.108 | 1.950 | 2.108 | n/a |
| map-explicit-break-small | model-json-encode | effect-prophet | 6 | 0.053 | 0.072 | 0.038 | 0.072 | n/a |
| map-explicit-break-small | model-json-encode | python-prophet | 6 | 0.368 | 0.435 | 0.361 | 0.435 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.589 | 3.242 | 1.507 | 3.242 | n/a |
| map-explicit-break-small | warm-fit-predict-with-conversion | python-prophet | 6 | 15.103 | 17.037 | 14.748 | 17.037 | n/a |
| map-explicit-break-small | warm-fit-predict | effect-prophet | 6 | 1.450 | 2.236 | 1.310 | 2.236 | n/a |
| map-explicit-break-small | warm-fit-predict | python-prophet | 6 | 14.301 | 14.447 | 14.049 | 14.447 | n/a |
| map-explicit-break-small | warm-fit | effect-prophet | 6 | 1.892 | 2.416 | 1.580 | 2.416 | n/a |
| map-explicit-break-small | warm-fit | python-prophet | 6 | 11.024 | 11.781 | 10.949 | 11.781 | n/a |
| map-explicit-break-small | warm-predict | effect-prophet | 6 | 0.241 | 0.277 | 0.208 | 0.277 | n/a |
| map-explicit-break-small | warm-predict | python-prophet | 6 | 2.714 | 3.132 | 2.653 | 3.132 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | effect-prophet | 4 | 0.233 | 0.918 | 0.211 | 0.918 | n/a |
| map-mixed-features-automatic-large | adapter-input-conversion | python-prophet | 4 | 1.148 | 1.172 | 1.140 | 1.172 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | effect-prophet | 4 | 302.751 | 310.551 | 251.363 | 310.551 | n/a |
| map-mixed-features-automatic-large | cold-first-forecast | python-prophet | 4 | 1511.044 | 1525.608 | 1505.985 | 1525.608 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | effect-prophet | 4 | 207.190 | 256.261 | 187.175 | 256.261 | n/a |
| map-mixed-features-automatic-large | fresh-process-restored-predict | python-prophet | 4 | 1482.281 | 1494.103 | 1475.588 | 1494.103 | n/a |
| map-mixed-features-automatic-large | model-json-decode | effect-prophet | 4 | 0.317 | 0.572 | 0.317 | 0.572 | n/a |
| map-mixed-features-automatic-large | model-json-decode | python-prophet | 4 | 5.763 | 6.324 | 5.624 | 6.324 | n/a |
| map-mixed-features-automatic-large | model-json-encode | effect-prophet | 4 | 0.139 | 0.993 | 0.123 | 0.993 | n/a |
| map-mixed-features-automatic-large | model-json-encode | python-prophet | 4 | 1.743 | 1.766 | 1.730 | 1.766 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | effect-prophet | 4 | 23.420 | 27.173 | 23.048 | 27.173 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict-with-conversion | python-prophet | 4 | 46.538 | 50.161 | 46.228 | 50.161 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | effect-prophet | 4 | 23.886 | 29.859 | 23.104 | 29.859 | n/a |
| map-mixed-features-automatic-large | warm-fit-predict | python-prophet | 4 | 45.007 | 46.711 | 44.457 | 46.711 | n/a |
| map-mixed-features-automatic-large | warm-fit | effect-prophet | 4 | 23.760 | 26.241 | 23.390 | 26.241 | n/a |
| map-mixed-features-automatic-large | warm-fit | python-prophet | 4 | 38.695 | 43.602 | 38.398 | 43.602 | n/a |
| map-mixed-features-automatic-large | warm-predict | effect-prophet | 4 | 1.148 | 1.966 | 1.140 | 1.966 | n/a |
| map-mixed-features-automatic-large | warm-predict | python-prophet | 4 | 6.227 | 6.821 | 6.186 | 6.821 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | effect-prophet | 6 | 0.014 | 0.038 | 0.012 | 0.038 | n/a |
| map-mixed-features-explicit-small | adapter-input-conversion | python-prophet | 6 | 0.508 | 0.826 | 0.481 | 0.826 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | effect-prophet | 6 | 198.357 | 212.106 | 191.241 | 212.106 | n/a |
| map-mixed-features-explicit-small | cold-first-forecast | python-prophet | 6 | 1536.704 | 1755.357 | 1502.655 | 1755.357 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | effect-prophet | 6 | 178.427 | 194.311 | 173.258 | 194.311 | n/a |
| map-mixed-features-explicit-small | fresh-process-restored-predict | python-prophet | 6 | 1506.778 | 1601.188 | 1479.404 | 1601.188 | n/a |
| map-mixed-features-explicit-small | model-json-decode | effect-prophet | 6 | 0.139 | 0.215 | 0.101 | 0.215 | n/a |
| map-mixed-features-explicit-small | model-json-decode | python-prophet | 6 | 3.647 | 4.164 | 3.512 | 4.164 | n/a |
| map-mixed-features-explicit-small | model-json-encode | effect-prophet | 6 | 0.066 | 0.102 | 0.052 | 0.102 | n/a |
| map-mixed-features-explicit-small | model-json-encode | python-prophet | 6 | 0.632 | 0.648 | 0.600 | 0.648 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.829 | 2.444 | 1.657 | 2.444 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict-with-conversion | python-prophet | 6 | 18.736 | 31.123 | 17.098 | 31.123 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | effect-prophet | 6 | 1.818 | 4.304 | 1.709 | 4.304 | n/a |
| map-mixed-features-explicit-small | warm-fit-predict | python-prophet | 6 | 17.005 | 25.297 | 16.575 | 25.297 | n/a |
| map-mixed-features-explicit-small | warm-fit | effect-prophet | 6 | 2.299 | 3.803 | 1.613 | 3.803 | n/a |
| map-mixed-features-explicit-small | warm-fit | python-prophet | 6 | 13.228 | 13.907 | 13.182 | 13.907 | n/a |
| map-mixed-features-explicit-small | warm-predict | effect-prophet | 6 | 0.221 | 0.295 | 0.196 | 0.295 | n/a |
| map-mixed-features-explicit-small | warm-predict | python-prophet | 6 | 5.171 | 6.675 | 4.949 | 6.675 | n/a |
| map-regressors-medium | adapter-input-conversion | effect-prophet | 6 | 0.146 | 0.256 | 0.138 | 0.256 | n/a |
| map-regressors-medium | adapter-input-conversion | python-prophet | 6 | 0.682 | 0.704 | 0.676 | 0.704 | n/a |
| map-regressors-medium | cold-first-forecast | effect-prophet | 6 | 206.894 | 249.823 | 204.194 | 249.823 | n/a |
| map-regressors-medium | cold-first-forecast | python-prophet | 6 | 1484.717 | 1537.372 | 1457.558 | 1537.372 | n/a |
| map-regressors-medium | fresh-process-restored-predict | effect-prophet | 6 | 197.575 | 264.951 | 181.823 | 264.951 | n/a |
| map-regressors-medium | fresh-process-restored-predict | python-prophet | 6 | 1482.913 | 1569.971 | 1446.509 | 1569.971 | n/a |
| map-regressors-medium | model-json-decode | effect-prophet | 6 | 0.146 | 0.237 | 0.112 | 0.237 | n/a |
| map-regressors-medium | model-json-decode | python-prophet | 6 | 3.153 | 3.808 | 2.993 | 3.808 | n/a |
| map-regressors-medium | model-json-encode | effect-prophet | 6 | 0.079 | 0.084 | 0.073 | 0.084 | n/a |
| map-regressors-medium | model-json-encode | python-prophet | 6 | 0.825 | 0.884 | 0.730 | 0.884 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 3.620 | 5.250 | 2.975 | 5.250 | n/a |
| map-regressors-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 15.307 | 16.758 | 15.105 | 16.758 | n/a |
| map-regressors-medium | warm-fit-predict | effect-prophet | 6 | 3.033 | 4.218 | 2.797 | 4.218 | n/a |
| map-regressors-medium | warm-fit-predict | python-prophet | 6 | 14.078 | 17.014 | 14.020 | 17.014 | n/a |
| map-regressors-medium | warm-fit | effect-prophet | 6 | 3.533 | 7.993 | 3.079 | 7.993 | n/a |
| map-regressors-medium | warm-fit | python-prophet | 6 | 10.629 | 11.326 | 10.345 | 11.326 | n/a |
| map-regressors-medium | warm-predict | effect-prophet | 6 | 0.553 | 2.137 | 0.524 | 2.137 | n/a |
| map-regressors-medium | warm-predict | python-prophet | 6 | 3.601 | 3.721 | 3.562 | 3.721 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | effect-prophet | 6 | 0.044 | 0.066 | 0.039 | 0.066 | n/a |
| map-seasonal-breaks-irregular-medium | adapter-input-conversion | python-prophet | 6 | 0.547 | 0.568 | 0.534 | 0.568 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | effect-prophet | 6 | 180.720 | 201.268 | 169.518 | 201.268 | n/a |
| map-seasonal-breaks-irregular-medium | fresh-process-restored-predict | python-prophet | 6 | 1469.410 | 1493.459 | 1459.231 | 1493.459 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | effect-prophet | 6 | 0.090 | 0.127 | 0.085 | 0.127 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-decode | python-prophet | 6 | 2.282 | 2.549 | 2.240 | 2.549 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | effect-prophet | 6 | 0.046 | 0.092 | 0.038 | 0.092 | n/a |
| map-seasonal-breaks-irregular-medium | model-json-encode | python-prophet | 6 | 0.530 | 0.554 | 0.521 | 0.554 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | effect-prophet | 6 | 1.589 | 2.457 | 1.413 | 2.457 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict-with-conversion | python-prophet | 6 | 12.156 | 15.599 | 12.110 | 15.599 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | effect-prophet | 6 | 1.412 | 4.000 | 1.354 | 4.000 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit-predict | python-prophet | 6 | 11.659 | 14.670 | 11.529 | 14.670 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | effect-prophet | 6 | 2.615 | 4.229 | 2.244 | 4.229 | n/a |
| map-seasonal-breaks-irregular-medium | warm-fit | python-prophet | 6 | 8.583 | 9.512 | 8.529 | 9.512 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | effect-prophet | 6 | 0.537 | 2.442 | 0.310 | 2.442 | n/a |
| map-seasonal-breaks-irregular-medium | warm-predict | python-prophet | 6 | 3.130 | 3.254 | 3.099 | 3.254 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 164.271 | 169.856 | 159.414 | 169.856 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1446.108 | 1455.462 | 1437.097 | 1455.462 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.201 | 0.217 | 0.187 | 0.217 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.505 | 2.572 | 2.494 | 2.572 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.103 | 0.116 | 0.084 | 0.116 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.458 | 0.479 | 0.455 | 0.479 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 80.016 | 84.507 | 79.856 | 84.507 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 112.721 | 113.226 | 111.890 | 113.226 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.362 | 0.384 | 0.350 | 0.384 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 3.549 | 3.626 | 3.452 | 3.626 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 164.420 | 174.944 | 161.393 | 174.944 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1446.303 | 1518.785 | 1442.315 | 1518.785 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.138 | 0.156 | 0.128 | 0.156 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.180 | 2.480 | 2.129 | 2.480 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.047 | 0.052 | 0.042 | 0.052 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.407 | 0.458 | 0.400 | 0.458 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 71.557 | 72.140 | 68.247 | 72.140 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 86.048 | 113.684 | 85.052 | 113.684 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.230 | 0.353 | 0.195 | 0.353 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 2.647 | 2.878 | 2.610 | 2.878 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 160.568 | 184.006 | 160.036 | 184.006 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1443.198 | 1470.037 | 1439.255 | 1470.037 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.106 | 0.145 | 0.103 | 0.145 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.050 | 2.059 | 2.047 | 2.059 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.039 | 0.041 | 0.036 | 0.041 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.405 | 0.433 | 0.399 | 0.433 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 2.803 | 4.084 | 2.753 | 4.084 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 20.414 | 20.897 | 19.726 | 20.897 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.173 | 0.226 | 0.163 | 0.226 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 2.713 | 3.450 | 2.712 | 3.450 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | effect-prophet | 4 | 168.663 | 192.418 | 167.032 | 192.418 | n/a |
| map-training-ordered-auto | fresh-process-restored-predict | python-prophet | 4 | 1454.014 | 1477.761 | 1449.924 | 1477.761 | n/a |
| map-training-ordered-auto | model-json-decode | effect-prophet | 4 | 0.193 | 0.276 | 0.177 | 0.276 | n/a |
| map-training-ordered-auto | model-json-decode | python-prophet | 4 | 2.104 | 2.188 | 2.074 | 2.188 | n/a |
| map-training-ordered-auto | model-json-encode | effect-prophet | 4 | 0.051 | 0.105 | 0.049 | 0.105 | n/a |
| map-training-ordered-auto | model-json-encode | python-prophet | 4 | 0.431 | 0.445 | 0.426 | 0.445 | n/a |
| map-training-ordered-auto | warm-fit | effect-prophet | 4 | 85.838 | 89.606 | 82.154 | 89.606 | n/a |
| map-training-ordered-auto | warm-fit | python-prophet | 4 | 108.108 | 111.046 | 107.448 | 111.046 | n/a |
| map-training-ordered-auto | warm-predict | effect-prophet | 4 | 0.219 | 0.281 | 0.203 | 0.281 | n/a |
| map-training-ordered-auto | warm-predict | python-prophet | 4 | 2.804 | 2.994 | 2.726 | 2.994 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 166.906 | 175.806 | 162.979 | 175.806 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1453.634 | 1465.544 | 1453.118 | 1465.544 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.125 | 0.146 | 0.114 | 0.146 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.085 | 2.172 | 2.082 | 2.172 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.036 | 0.040 | 0.036 | 0.040 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.397 | 0.410 | 0.388 | 0.410 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 3.092 | 4.475 | 2.934 | 4.475 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 20.672 | 21.741 | 20.476 | 21.741 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.177 | 0.249 | 0.170 | 0.249 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 2.727 | 2.770 | 2.682 | 2.770 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | effect-prophet | 4 | 160.706 | 186.321 | 158.300 | 186.321 | n/a |
| map-training-unsorted-auto | fresh-process-restored-predict | python-prophet | 4 | 1454.982 | 1464.937 | 1438.737 | 1464.937 | n/a |
| map-training-unsorted-auto | model-json-decode | effect-prophet | 4 | 0.208 | 0.217 | 0.169 | 0.217 | n/a |
| map-training-unsorted-auto | model-json-decode | python-prophet | 4 | 2.150 | 2.203 | 2.049 | 2.203 | n/a |
| map-training-unsorted-auto | model-json-encode | effect-prophet | 4 | 0.051 | 0.086 | 0.049 | 0.086 | n/a |
| map-training-unsorted-auto | model-json-encode | python-prophet | 4 | 0.417 | 0.446 | 0.403 | 0.446 | n/a |
| map-training-unsorted-auto | warm-fit | effect-prophet | 4 | 84.288 | 85.415 | 82.963 | 85.415 | n/a |
| map-training-unsorted-auto | warm-fit | python-prophet | 4 | 108.578 | 109.558 | 108.342 | 109.558 | n/a |
| map-training-unsorted-auto | warm-predict | effect-prophet | 4 | 0.220 | 0.345 | 0.214 | 0.345 | n/a |
| map-training-unsorted-auto | warm-predict | python-prophet | 4 | 2.737 | 2.858 | 2.730 | 2.858 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 164.611 | 182.516 | 161.145 | 182.516 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1452.242 | 1463.318 | 1447.045 | 1463.318 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.133 | 0.169 | 0.124 | 0.169 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.089 | 2.280 | 2.047 | 2.280 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.037 | 0.055 | 0.035 | 0.055 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.405 | 0.452 | 0.395 | 0.452 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 3.017 | 5.356 | 2.844 | 5.356 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 21.565 | 21.815 | 20.684 | 21.815 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.211 | 0.232 | 0.178 | 0.232 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 2.687 | 2.705 | 2.650 | 2.705 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 180.842 | 190.396 | 179.452 | 190.396 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1478.591 | 1968.516 | 1467.098 | 1968.516 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 168.534 | 183.718 | 163.866 | 183.718 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1448.824 | 1605.972 | 1445.094 | 1605.972 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | effect-prophet | 6 | 0.190 | 0.229 | 0.178 | 0.229 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-decode | python-prophet | 6 | 3.789 | 5.101 | 3.619 | 5.101 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | effect-prophet | 6 | 0.097 | 0.150 | 0.083 | 0.150 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | model-json-encode | python-prophet | 6 | 0.680 | 2.693 | 0.672 | 2.693 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.050 | 0.290 | 0.044 | 0.290 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.515 | 0.559 | 0.495 | 0.559 | n/a |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.594 | 1.656 | 0.463 | 1.656 | 139.2 |
| uncertainty-linear-mixed-components-mixed-intervals-128 | warm-uncertainty | python-prophet | 6 | 25.033 | 37.934 | 24.401 | 37.934 | 118.7 |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | effect-prophet | 6 | 186.437 | 193.908 | 181.457 | 193.908 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | cold-first-uncertainty | python-prophet | 6 | 1518.128 | 1530.254 | 1506.531 | 1530.254 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | effect-prophet | 6 | 171.643 | 175.824 | 167.776 | 175.824 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | fresh-process-restored-uncertainty | python-prophet | 6 | 1485.850 | 1507.019 | 1480.782 | 1507.019 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | effect-prophet | 6 | 0.185 | 0.197 | 0.160 | 0.197 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-decode | python-prophet | 6 | 3.651 | 3.903 | 3.547 | 3.903 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | effect-prophet | 6 | 0.089 | 0.101 | 0.080 | 0.101 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | model-json-encode | python-prophet | 6 | 0.620 | 0.654 | 0.611 | 0.654 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | effect-prophet | 6 | 0.050 | 0.077 | 0.041 | 0.077 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | uncertainty-input-conversion | python-prophet | 6 | 0.516 | 0.616 | 0.483 | 0.616 | n/a |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | effect-prophet | 6 | 0.950 | 1.256 | 0.647 | 1.256 | 140.2 |
| uncertainty-linear-mixed-components-mixed-samples-512 | warm-uncertainty | python-prophet | 6 | 68.414 | 68.959 | 68.143 | 68.959 | 119.2 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | effect-prophet | 6 | 183.473 | 196.794 | 176.548 | 196.794 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | cold-first-uncertainty | python-prophet | 6 | 1477.458 | 1488.090 | 1470.621 | 1488.090 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 161.296 | 183.171 | 156.906 | 183.171 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1452.239 | 1468.663 | 1444.663 | 1468.663 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | effect-prophet | 6 | 0.129 | 0.162 | 0.113 | 0.162 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-decode | python-prophet | 6 | 2.136 | 2.407 | 2.125 | 2.407 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | effect-prophet | 6 | 0.054 | 0.135 | 0.045 | 0.135 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | model-json-encode | python-prophet | 6 | 0.413 | 0.464 | 0.384 | 0.464 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.016 | 0.023 | 0.013 | 0.023 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | uncertainty-input-conversion | python-prophet | 6 | 0.438 | 0.479 | 0.432 | 0.479 | n/a |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | effect-prophet | 6 | 0.418 | 2.969 | 0.399 | 2.969 | 136.3 |
| uncertainty-linear-offset-scaling-absmax-historical-intervals-128 | warm-uncertainty | python-prophet | 6 | 19.314 | 19.778 | 19.191 | 19.778 | 118.3 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | effect-prophet | 6 | 183.596 | 199.798 | 175.156 | 199.798 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | cold-first-uncertainty | python-prophet | 6 | 1471.883 | 1477.806 | 1461.452 | 1477.806 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | effect-prophet | 6 | 167.033 | 176.942 | 160.856 | 176.942 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | fresh-process-restored-uncertainty | python-prophet | 6 | 1444.456 | 1477.760 | 1441.387 | 1477.760 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | effect-prophet | 6 | 0.119 | 0.147 | 0.115 | 0.147 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-decode | python-prophet | 6 | 2.202 | 2.429 | 2.174 | 2.429 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | effect-prophet | 6 | 0.069 | 0.150 | 0.046 | 0.150 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | model-json-encode | python-prophet | 6 | 0.403 | 0.421 | 0.393 | 0.421 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | effect-prophet | 6 | 0.014 | 0.165 | 0.014 | 0.165 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | uncertainty-input-conversion | python-prophet | 6 | 0.439 | 0.457 | 0.433 | 0.457 | n/a |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | effect-prophet | 6 | 0.281 | 0.313 | 0.251 | 0.313 | 132.8 |
| uncertainty-linear-offset-scaling-absmax-one-future-samples-128 | warm-uncertainty | python-prophet | 6 | 16.710 | 16.874 | 16.436 | 16.874 | 118.1 |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 168.353 | 181.062 | 165.796 | 181.062 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1458.863 | 1475.795 | 1458.753 | 1475.795 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.523 | 0.843 | 0.459 | 0.843 | 134.9 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 17.085 | 20.839 | 17.039 | 20.839 | 118.0 |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>18:52:07 - cmdstanpy - INFO - Chain [1] start processing<br>18:52:07 - cmdstanpy - INFO - Chain [1] done processing<br>18:52:07 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=1622 data file=/tmp/tmpr31vtys4/n4u5lx3o.json init=/tmp/tmpr31vtys4/tezstj_b.json output file=/tmp/tmpr31vtys4/prophet_modelhya4qov7/prophet_model-20261004185207.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpr31vtys4/n4u5lx3o.json<br>init = /tmp/tmpr31vtys4/tezstj_b.json<br>random<br>  seed = 1622<br>output<br>  file = /tmp/tmpr31vtys4/prophet_modelhya4qov7/prophet_model-20261004185207.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1154, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1131, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 897, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 692, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 263, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 220, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=1622 data file=/tmp/tmpr31vtys4/n4u5lx3o.json init=/tmp/tmpr31vtys4/tezstj_b.json output file=/tmp/tmpr31vtys4/prophet_modelhya4qov7/prophet_model-20261004185207.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpr31vtys4/n |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>18:52:09 - cmdstanpy - INFO - Chain [1] start processing<br>18:52:09 - cmdstanpy - INFO - Chain [1] done processing<br>18:52:09 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=61962 data file=/tmp/tmprik21nws/8cdstzet.json init=/tmp/tmprik21nws/cvht5fyt.json output file=/tmp/tmprik21nws/prophet_modelu45ci9ln/prophet_model-20261004185209.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmprik21nws/8cdstzet.json<br>init = /tmp/tmprik21nws/cvht5fyt.json<br>random<br>  seed = 61962<br>output<br>  file = /tmp/tmprik21nws/prophet_modelu45ci9ln/prophet_model-20261004185209.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 12<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1154, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1131, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 897, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 692, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 263, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 220, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=61962 data file=/tmp/tmprik21nws/8cdstzet.json init=/tmp/tmprik21nws/cvht5fyt.json output file=/tmp/tmprik21nws/prophet_modelu45ci9ln/prophet_model-20261004185209.csv sig_figs=12 method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmprik21nw |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1154, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1131, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 897, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 695, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 351, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1154, in <module><br>    main()<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 1131, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 897, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 695, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/tools/adapters/python-prophet.py", line 351, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `730ead622275d37c6b7e0a3c863e82a7984de1b2` (dirty)
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
  - `effect-prophet/benchmark-effect:local`: `sha256:7ec501898285cc54f4727a0db0769b80e5cfcae9bcafebd6f6303de5b728c6eb`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:98480b2443479e7ee5dd43f77a98187558effa5d0f6b0f765edc2760e602cadb`

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

