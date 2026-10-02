# Effect Prophet benchmark — 2026-09-30T224402-292Z-4d661a06

Descriptive public API timing and correctness evidence; this report presents absolute measurements without ranking implementations.

## Correctness

| Case | Classification | Status | Trend | Component | Additive | Forecast | Noise scale | Note |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| map-training-ordered-explicit | equivalent-objective | passed | 3.026e-7 | 0.000e+0 | 0.000e+0 | 3.026e-7 | 1.302e-6 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-ordered-auto | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-unsorted-explicit | equivalent-objective | passed | 3.026e-7 | 0.000e+0 | 0.000e+0 | 3.026e-7 | 1.302e-6 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-unsorted-auto | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-duplicates-explicit | equivalent-objective | passed | 1.975e-6 | 0.000e+0 | 0.000e+0 | 1.975e-6 | 1.280e-6 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-duplicates-auto | equivalent-objective | passed | 1.858e-4 | 0.000e+0 | 0.000e+0 | 1.858e-4 | 1.364e-4 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-duplicate-features-auto | equivalent-objective | passed | 8.137e-4 | 2.872e-5 | 3.021e-5 | 8.039e-4 | 1.213e-4 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| uncertainty-training-duplicates-auto | scalar-process-different-public-work | passed | 1.858e-4 | 0.000e+0 | 0.000e+0 | 1.858e-4 | 1.364e-4 | Verified fitted point behavior under training-row-map-v1; scalar simulation gated by docs/validation/uncertainty.md. Public output work differs. |
| map-training-zero-span-linear-varied | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-zero-span-flat-varied | equivalent-objective | passed | 8.557e-5 | 0.000e+0 | 0.000e+0 | 8.557e-5 | 3.338e-4 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| map-training-zero-span-linear-constant | equivalent-objective | failed | n/a | n/a | n/a | n/a | n/a | At least one implementation run failed before correctness eligibility was established. |
| map-training-zero-span-flat-constant | equivalent-objective | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | 0.000e+0 | Verified equivalent behavior for this configuration under evidence training-row-map-v1. |
| evaluation-training-duplicates | different-public-work | passed | 0.000e+0 | 0.000e+0 | 0.000e+0 | 3.480e-5 | 0.000e+0 | Aligned folds, rows, targets and point forecasts passed; public evaluation/uncertainty/metric/report work differs. Absolute times only. |

## Uncertainty workloads

Python public `predict(..., vectorized=False)` includes point/component/interval assembly; `predictive_samples(..., vectorized=False)` returns trend/yhat matrices. Effect uses `predictUncertainty` for both modes. Python RNG reset is included in warm operation timings; fitted model/setup and input conversion are excluded. Both use scalar continuous-time algorithms, not identical random draws or equivalent public-output work. Only absolute times are reported. The external EP-080 distribution evidence establishes eligibility; this run checks replay, finite dimensions, same-sample quantiles and fitted point equivalence, not fitted distribution parity or calibration.

| Case | N | Features | Changepoints | Rows | Future | Horizon (days) | S | Output | Effect sampler limit (bytes) | Dataset recipe / SHA-256 | Evidence |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |
| uncertainty-training-duplicates-auto | 96 | 0 | 25 | 8 | 8 | 8 | 128 | samples | 33554432 | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | docs/validation/uncertainty.md |

## Evaluation workloads

Point alignment is gated before timing; the classification `different-public-work` precludes relative performance rankings. Python requires an untimed full-history fit before public CV, copies pandas history, and uses default vectorized intervals; Effect performs per-fold sequential scalar simulation. Python has no public baseline/search/holdout-report APIs: those entries use explicit application-level operations. Metrics and rolling/percentage policies differ. Both adapters disable parallelism. C, F, total training visits, assessment rows, features/changepoints, and S are separate axes.

| Case | Recipe / SHA-256 | Model | C | F | Training visits | Assessment rows | Features | Points | S | Seed / width | Metric / zero policy | Candidate option hashes (input order) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| evaluation-training-duplicates | training-duplicates-v1:n=96:h=8:stable-reverse-source:quadruplicate=true:bounded-row-noise / 4cb336b1befb59c6e212152cf9f292da82dca61867da485e29840acad55a2926 | linear | 1 | 2 | 148 | 24 | 0 | 1 | 0 | n/a / n/a | overall / exclude | b37de3572240abc777d92b02bc9b7b6083d3c5788bc84df8c1f25b7aeb05c0a6 |

## Absolute timings

Only cases with accepted correctness evidence appear below. Values combine retained samples from all independent runs. Percentiles are descriptive; small sample counts do not establish stable tail behavior.

| Case | Phase | Implementation | Samples | Median (ms) | p90 (ms) | Min (ms) | Max (ms) | Worker peak RSS (MiB) |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| evaluation-training-duplicates | evaluation-baseline | effect-prophet | 4 | 1.833 | 2.393 | 1.265 | 2.393 | 144.0 |
| evaluation-training-duplicates | evaluation-baseline | python-prophet | 4 | 1.588 | 1.789 | 1.503 | 1.789 | 117.5 |
| evaluation-training-duplicates | evaluation-holdout | effect-prophet | 4 | 1.889 | 2.311 | 1.695 | 2.311 | 149.3 |
| evaluation-training-duplicates | evaluation-holdout | python-prophet | 4 | 25.161 | 28.563 | 25.075 | 28.563 | 117.9 |
| evaluation-training-duplicates | evaluation-plan | effect-prophet | 4 | 0.821 | 1.305 | 0.818 | 1.305 | 129.0 |
| evaluation-training-duplicates | evaluation-plan | python-prophet | 4 | 1.013 | 1.135 | 0.976 | 1.135 | 115.0 |
| evaluation-training-duplicates | evaluation-point | effect-prophet | 4 | 5.956 | 6.484 | 5.494 | 6.484 | 143.8 |
| evaluation-training-duplicates | evaluation-point | python-prophet | 4 | 60.110 | 66.724 | 58.716 | 66.724 | 117.5 |
| evaluation-training-duplicates | evaluation-report-decode | effect-prophet | 4 | 0.198 | 0.248 | 0.190 | 0.248 | 149.8 |
| evaluation-training-duplicates | evaluation-report-decode | python-prophet | 4 | 0.005 | 0.006 | 0.005 | 0.006 | 117.9 |
| evaluation-training-duplicates | evaluation-report-encode | effect-prophet | 4 | 0.260 | 0.292 | 0.248 | 0.292 | 149.7 |
| evaluation-training-duplicates | evaluation-report-encode | python-prophet | 4 | 0.009 | 0.013 | 0.008 | 0.013 | 117.9 |
| evaluation-training-duplicates | evaluation-search | effect-prophet | 4 | 3.625 | 5.073 | 3.512 | 5.073 | 147.3 |
| evaluation-training-duplicates | evaluation-search | python-prophet | 4 | 62.610 | 63.583 | 61.231 | 63.583 | 117.9 |
| map-training-duplicate-features-auto | fresh-process-restored-predict | effect-prophet | 4 | 173.337 | 184.203 | 167.385 | 184.203 | n/a |
| map-training-duplicate-features-auto | fresh-process-restored-predict | python-prophet | 4 | 1584.501 | 1644.921 | 1560.915 | 1644.921 | n/a |
| map-training-duplicate-features-auto | model-json-decode | effect-prophet | 4 | 0.142 | 0.173 | 0.132 | 0.173 | n/a |
| map-training-duplicate-features-auto | model-json-decode | python-prophet | 4 | 2.772 | 3.034 | 2.763 | 3.034 | n/a |
| map-training-duplicate-features-auto | model-json-encode | effect-prophet | 4 | 0.109 | 0.133 | 0.079 | 0.133 | n/a |
| map-training-duplicate-features-auto | model-json-encode | python-prophet | 4 | 0.509 | 0.544 | 0.502 | 0.544 | n/a |
| map-training-duplicate-features-auto | warm-fit | effect-prophet | 4 | 8.150 | 8.440 | 8.049 | 8.440 | n/a |
| map-training-duplicate-features-auto | warm-fit | python-prophet | 4 | 119.754 | 121.094 | 119.480 | 121.094 | n/a |
| map-training-duplicate-features-auto | warm-predict | effect-prophet | 4 | 0.396 | 0.716 | 0.353 | 0.716 | n/a |
| map-training-duplicate-features-auto | warm-predict | python-prophet | 4 | 4.105 | 4.495 | 3.844 | 4.495 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | effect-prophet | 4 | 172.437 | 176.508 | 169.627 | 176.508 | n/a |
| map-training-duplicates-auto | fresh-process-restored-predict | python-prophet | 4 | 1576.460 | 1614.620 | 1570.765 | 1614.620 | n/a |
| map-training-duplicates-auto | model-json-decode | effect-prophet | 4 | 0.160 | 0.179 | 0.140 | 0.179 | n/a |
| map-training-duplicates-auto | model-json-decode | python-prophet | 4 | 2.213 | 2.678 | 2.159 | 2.678 | n/a |
| map-training-duplicates-auto | model-json-encode | effect-prophet | 4 | 0.066 | 0.084 | 0.061 | 0.084 | n/a |
| map-training-duplicates-auto | model-json-encode | python-prophet | 4 | 0.478 | 0.744 | 0.457 | 0.744 | n/a |
| map-training-duplicates-auto | warm-fit | effect-prophet | 4 | 5.324 | 5.721 | 5.104 | 5.721 | n/a |
| map-training-duplicates-auto | warm-fit | python-prophet | 4 | 91.793 | 92.602 | 90.567 | 92.602 | n/a |
| map-training-duplicates-auto | warm-predict | effect-prophet | 4 | 0.264 | 0.696 | 0.239 | 0.696 | n/a |
| map-training-duplicates-auto | warm-predict | python-prophet | 4 | 3.112 | 3.667 | 2.956 | 3.667 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | effect-prophet | 4 | 167.866 | 170.294 | 164.573 | 170.294 | n/a |
| map-training-duplicates-explicit | fresh-process-restored-predict | python-prophet | 4 | 1558.301 | 1590.558 | 1544.396 | 1590.558 | n/a |
| map-training-duplicates-explicit | model-json-decode | effect-prophet | 4 | 0.131 | 0.167 | 0.109 | 0.167 | n/a |
| map-training-duplicates-explicit | model-json-decode | python-prophet | 4 | 2.262 | 2.503 | 2.215 | 2.503 | n/a |
| map-training-duplicates-explicit | model-json-encode | effect-prophet | 4 | 0.050 | 0.059 | 0.050 | 0.059 | n/a |
| map-training-duplicates-explicit | model-json-encode | python-prophet | 4 | 0.480 | 0.670 | 0.454 | 0.670 | n/a |
| map-training-duplicates-explicit | warm-fit | effect-prophet | 4 | 1.554 | 1.779 | 1.494 | 1.779 | n/a |
| map-training-duplicates-explicit | warm-fit | python-prophet | 4 | 21.992 | 23.000 | 21.887 | 23.000 | n/a |
| map-training-duplicates-explicit | warm-predict | effect-prophet | 4 | 0.260 | 0.387 | 0.229 | 0.387 | n/a |
| map-training-duplicates-explicit | warm-predict | python-prophet | 4 | 3.136 | 3.211 | 2.929 | 3.211 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | effect-prophet | 4 | 177.913 | 204.230 | 175.389 | 204.230 | n/a |
| map-training-ordered-explicit | fresh-process-restored-predict | python-prophet | 4 | 1585.358 | 1624.144 | 1569.634 | 1624.144 | n/a |
| map-training-ordered-explicit | model-json-decode | effect-prophet | 4 | 0.212 | 0.262 | 0.140 | 0.262 | n/a |
| map-training-ordered-explicit | model-json-decode | python-prophet | 4 | 2.284 | 2.519 | 2.254 | 2.519 | n/a |
| map-training-ordered-explicit | model-json-encode | effect-prophet | 4 | 0.055 | 0.118 | 0.051 | 0.118 | n/a |
| map-training-ordered-explicit | model-json-encode | python-prophet | 4 | 0.442 | 0.467 | 0.440 | 0.467 | n/a |
| map-training-ordered-explicit | warm-fit | effect-prophet | 4 | 3.360 | 6.002 | 3.151 | 6.002 | n/a |
| map-training-ordered-explicit | warm-fit | python-prophet | 4 | 23.505 | 24.188 | 23.369 | 24.188 | n/a |
| map-training-ordered-explicit | warm-predict | effect-prophet | 4 | 0.332 | 0.525 | 0.255 | 0.525 | n/a |
| map-training-ordered-explicit | warm-predict | python-prophet | 4 | 3.300 | 3.775 | 2.987 | 3.775 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | effect-prophet | 4 | 169.724 | 171.015 | 169.587 | 171.015 | n/a |
| map-training-unsorted-explicit | fresh-process-restored-predict | python-prophet | 4 | 1621.442 | 1945.956 | 1588.895 | 1945.956 | n/a |
| map-training-unsorted-explicit | model-json-decode | effect-prophet | 4 | 0.126 | 0.145 | 0.110 | 0.145 | n/a |
| map-training-unsorted-explicit | model-json-decode | python-prophet | 4 | 2.284 | 2.849 | 2.282 | 2.849 | n/a |
| map-training-unsorted-explicit | model-json-encode | effect-prophet | 4 | 0.050 | 0.059 | 0.049 | 0.059 | n/a |
| map-training-unsorted-explicit | model-json-encode | python-prophet | 4 | 0.621 | 1.002 | 0.521 | 1.002 | n/a |
| map-training-unsorted-explicit | warm-fit | effect-prophet | 4 | 3.125 | 3.484 | 3.121 | 3.484 | n/a |
| map-training-unsorted-explicit | warm-fit | python-prophet | 4 | 24.156 | 24.656 | 23.375 | 24.656 | n/a |
| map-training-unsorted-explicit | warm-predict | effect-prophet | 4 | 0.252 | 0.335 | 0.221 | 0.335 | n/a |
| map-training-unsorted-explicit | warm-predict | python-prophet | 4 | 3.194 | 3.239 | 3.105 | 3.239 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | effect-prophet | 4 | 172.681 | 182.445 | 170.664 | 182.445 | n/a |
| map-training-zero-span-flat-constant | fresh-process-restored-predict | python-prophet | 4 | 1567.940 | 1594.677 | 1564.491 | 1594.677 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | effect-prophet | 4 | 0.135 | 0.143 | 0.130 | 0.143 | n/a |
| map-training-zero-span-flat-constant | model-json-decode | python-prophet | 4 | 2.134 | 2.422 | 2.122 | 2.422 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | effect-prophet | 4 | 0.043 | 0.072 | 0.038 | 0.072 | n/a |
| map-training-zero-span-flat-constant | model-json-encode | python-prophet | 4 | 0.344 | 0.367 | 0.340 | 0.367 | n/a |
| map-training-zero-span-flat-constant | warm-fit | effect-prophet | 4 | 0.487 | 0.511 | 0.476 | 0.511 | n/a |
| map-training-zero-span-flat-constant | warm-fit | python-prophet | 4 | 3.259 | 4.367 | 3.151 | 4.367 | n/a |
| map-training-zero-span-flat-constant | warm-predict | effect-prophet | 4 | 0.190 | 0.208 | 0.175 | 0.208 | n/a |
| map-training-zero-span-flat-constant | warm-predict | python-prophet | 4 | 2.901 | 3.126 | 2.803 | 3.126 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | effect-prophet | 4 | 175.318 | 232.293 | 166.350 | 232.293 | n/a |
| map-training-zero-span-flat-varied | fresh-process-restored-predict | python-prophet | 4 | 1598.603 | 1686.562 | 1585.717 | 1686.562 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | effect-prophet | 4 | 0.098 | 0.105 | 0.089 | 0.105 | n/a |
| map-training-zero-span-flat-varied | model-json-decode | python-prophet | 4 | 2.107 | 2.224 | 1.973 | 2.224 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | effect-prophet | 4 | 0.046 | 0.072 | 0.043 | 0.072 | n/a |
| map-training-zero-span-flat-varied | model-json-encode | python-prophet | 4 | 0.360 | 0.381 | 0.357 | 0.381 | n/a |
| map-training-zero-span-flat-varied | warm-fit | effect-prophet | 4 | 0.495 | 0.667 | 0.491 | 0.667 | n/a |
| map-training-zero-span-flat-varied | warm-fit | python-prophet | 4 | 6.697 | 7.120 | 6.619 | 7.120 | n/a |
| map-training-zero-span-flat-varied | warm-predict | effect-prophet | 4 | 0.172 | 0.197 | 0.154 | 0.197 | n/a |
| map-training-zero-span-flat-varied | warm-predict | python-prophet | 4 | 3.018 | 3.913 | 2.938 | 3.913 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | effect-prophet | 4 | 171.930 | 207.277 | 170.666 | 207.277 | n/a |
| uncertainty-training-duplicates-auto | fresh-process-restored-uncertainty | python-prophet | 4 | 1592.390 | 1660.685 | 1573.261 | 1660.685 | n/a |
| uncertainty-training-duplicates-auto | warm-uncertainty | effect-prophet | 4 | 0.751 | 1.989 | 0.516 | 1.989 | 132.6 |
| uncertainty-training-duplicates-auto | warm-uncertainty | python-prophet | 4 | 18.734 | 18.892 | 18.374 | 18.892 | 118.0 |

## Failures

| Case | Implementation | Run | Stage | Message |
| --- | --- | ---: | --- | --- |
| map-training-ordered-auto | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting exhausted its deterministic iteration budget [reason=non-convergence] |
| map-training-ordered-auto | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting exhausted its deterministic iteration budget [reason=non-convergence] |
| map-training-unsorted-auto | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting exhausted its deterministic iteration budget [reason=non-convergence] |
| map-training-unsorted-auto | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting exhausted its deterministic iteration budget [reason=non-convergence] |
| map-training-zero-span-linear-varied | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 0 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-constant | effect-prophet | 1 | correctness | FittingError: Linear MAP fitting requires a positive training time range [reason=degenerate-observations] |
| map-training-zero-span-linear-varied | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>22:45:41 - cmdstanpy - INFO - Chain [1] start processing<br>22:45:41 - cmdstanpy - INFO - Chain [1] done processing<br>22:45:41 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=43063 data file=/tmp/tmp4qtti9h1/sjq4w6k_.json init=/tmp/tmp4qtti9h1/5tpvtdu8.json output file=/tmp/tmp4qtti9h1/prophet_modeln4vw6f6o/prophet_model-20260930224541.csv method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp4qtti9h1/sjq4w6k_.json<br>init = /tmp/tmp4qtti9h1/5tpvtdu8.json<br>random<br>  seed = 43063<br>output<br>  file = /tmp/tmp4qtti9h1/prophet_modeln4vw6f6o/prophet_model-20260930224541.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 8 (Default)<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1120, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1097, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 864, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 667, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 250, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 208, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=43063 data file=/tmp/tmp4qtti9h1/sjq4w6k_.json init=/tmp/tmp4qtti9h1/5tpvtdu8.json output file=/tmp/tmp4qtti9h1/prophet_modeln4vw6f6o/prophet_model-20260930224541.csv method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmp4qtti9h1/sjq4w6k_.json<br>init = /tmp/tmp4qtti9h1/5tpvtdu8.js |
| map-training-zero-span-linear-varied | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>22:45:42 - cmdstanpy - INFO - Chain [1] start processing<br>22:45:42 - cmdstanpy - INFO - Chain [1] done processing<br>22:45:42 - cmdstanpy - ERROR - Chain [1] error: code '1' Operation not permitted<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=48083 data file=/tmp/tmpuyz84pc5/qu33upbp.json init=/tmp/tmpuyz84pc5/232x3icx.json output file=/tmp/tmpuyz84pc5/prophet_modelxo8oxj1d/prophet_model-20260930224542.csv method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpuyz84pc5/qu33upbp.json<br>init = /tmp/tmpuyz84pc5/232x3icx.json<br>random<br>  seed = 48083<br>output<br>  file = /tmp/tmpuyz84pc5/prophet_modelxo8oxj1d/prophet_model-20260930224542.csv<br>  diagnostic_file =  (Default)<br>  refresh = 100 (Default)<br>  sig_figs = 8 (Default)<br>  profile_file = profile.csv (Default)<br>  save_cmdstan_config = false (Default)<br>num_threads = 1 (Default)<br><br>Rejecting initial value:<br>  Error evaluating the log probability at the initial value.<br>Exception: normal_lpdf: Random variable is nan, but must be not nan! (in 'prophet.stan', line 130, column 2 to column 19)<br><br>User-specified initialization failed.<br> Try specifying new initial values, using partially specialized initialization, reducing the range of constrained values, or reparameterizing the model.<br>Initialization failed.<br><br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1120, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1097, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 864, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 667, in correctness_projection<br>    model = setup_model(training, benchmark_case)<br>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 250, in setup_model<br>    return fit_model(training, benchmark_case)<br>           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 208, in fit_model<br>    return model.fit(<br>           ^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py", line 1442, in fit<br>    self.params = stan_backend.fit(stan_init, dat, **kwargs)<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 169, in fit<br>    raise e<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/models.py", line 165, in fit<br>    self.stan_fit = self.model.optimize(**args)<br>                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/opt/effect-prophet-benchmark/lib/python3.12/site-packages/cmdstanpy/model.py", line 658, in optimize<br>    raise RuntimeError(msg)<br>RuntimeError: Error during optimization! Command '/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/stan_model/prophet_model.bin random seed=48083 data file=/tmp/tmpuyz84pc5/qu33upbp.json init=/tmp/tmpuyz84pc5/232x3icx.json output file=/tmp/tmpuyz84pc5/prophet_modelxo8oxj1d/prophet_model-20260930224542.csv method=optimize algorithm=newton iter=10000' failed: console log output:<br><br>method = optimize<br>  optimize<br>    algorithm = newton<br>      newton<br>    jacobian = false (Default)<br>    iter = 10000<br>    save_iterations = false (Default)<br>id = 1 (Default)<br>data<br>  file = /tmp/tmpuyz84pc5/qu33upbp.json<br>init = /tmp/tmpuyz84pc5/232x3icx.js |
| map-training-zero-span-linear-constant | python-prophet | 0 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1120, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1097, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 864, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 670, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 338, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |
| map-training-zero-span-linear-constant | python-prophet | 1 | correctness | Importing plotly failed. Interactive plots will not work.<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1619: RuntimeWarning: Mean of empty slice<br>  k = np.nanmean(self.params['k'])<br>/opt/effect-prophet-benchmark/lib/python3.12/site-packages/prophet/forecaster.py:1620: RuntimeWarning: Mean of empty slice<br>  m = np.nanmean(self.params['m'])<br>ValueError: Prophet prediction returned a non-finite value<br>Traceback (most recent call last):<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1120, in <module><br>    main()<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 1097, in main<br>    f"{json.dumps(run_worker(sys.argv[2], int(sys.argv[3]), stage))}"<br>                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 864, in run_worker<br>    else correctness_projection(benchmark_case, dataset, run))<br>         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 670, in correctness_projection<br>    assert_forecasts(benchmark_case, dataset, projections)<br>  File "/workspace/benchmark/adapters/python-prophet.py", line 338, in assert_forecasts<br>    raise ValueError("Prophet prediction returned a non-finite value")<br>ValueError: Prophet prediction returned a non-finite value |

## Provenance

- Git revision: `4d661a06a7e2f588f4b466cdcd4905753e3cce6b` (dirty)
- Host: `darwin 25.5.0/arm64` (`Apple M4 Pro`)
- Container platform: `linux/arm64`
- Execution mode: native architecture
- Selected cases: `map-training-ordered-explicit`, `map-training-ordered-auto`, `map-training-unsorted-explicit`, `map-training-unsorted-auto`, `map-training-duplicates-explicit`, `map-training-duplicates-auto`, `map-training-duplicate-features-auto`, `uncertainty-training-duplicates-auto`, `map-training-zero-span-linear-varied`, `map-training-zero-span-linear-constant`, `map-training-zero-span-flat-varied`, `map-training-zero-span-flat-constant`, `evaluation-training-duplicates`
- Commands:
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`
  - `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`
  - `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=linux/arm64 docker compose -f benchmark/compose.yaml run --rm benchmark-report`
- Container images:
  - `effect-prophet/benchmark-effect:local`: `sha256:b841a38e9cb99612267223a3ebe17866dfc5b2d129997b09fbf61491fd3cfeb0`
  - `effect-prophet/benchmark-python:1.4.0`: `sha256:677bf284d9e558d6ebc660ceb3ef69f6460a8516bebbb981ec72109cd7152a15`

### effect-prophet

- Runtime: `node v26.7.0`
- Container: `linux 7.0.12-linuxkit/arm64`
- Processor: `unknown`
- Versions: `effect-prophet=0.0.0`, `effect=4.0.0-beta.107`, `rustc=rustc 1.98.1 (48a229cea 2026-09-01)`, `wasm-pack=wasm-pack 0.15.0`, `wasm-build-profile=release`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=node:os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via process.resourceUsage.maxRSS (Linux KiB); includes imports and previous operations; excludes subprocess peaks; heap/WASM-only peaks unavailable; Effect tracing disabled

### python-prophet

- Runtime: `python 3.12.11`
- Container: `Linux 7.0.12-linuxkit/aarch64`
- Processor: `unavailable`
- Versions: `cmdstanpy=1.3.0`, `holidays=0.104`, `numpy=2.5.3`, `pandas=3.0.5`, `prophet=1.4.0`
- Numerical threads: `OMP_NUM_THREADS=1`, `OPENBLAS_NUM_THREADS=1`, `MKL_NUM_THREADS=1`
- Resources: `logical-cpu-count=4`, `runtime-total-memory-bytes=8320299008`, `cgroup-memory-max=max`, `collection-method=python-os and cgroup-v2`
- Memory: warm-uncertainty/evaluation: worker high-water RSS via resource.RUSAGE_SELF.ru_maxrss (Linux KiB); includes imports and previous operations; excludes CmdStan fit child and cold subprocesses; heap-only peaks unavailable

