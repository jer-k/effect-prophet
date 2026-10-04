# Linear growth coverage

`public-api.json` owns fixed-equation prediction, explicit/automatic changepoints, irregular
seasonal trends and mixed-feature linear fits. Focused holidays, regressors and conditional
seasonality cases have their own capability folders. `../mixed-map.ts` supplies scaling and
mixed-component growth cases.

`edge-cases.ts` covers ordered/unsorted histories, repeated timestamps and differing covariates,
uncertainty/restoration, duplicate-aware evaluation and zero-time-range linear/flat probes.
Source rows are never sorted or deduplicated by the dataset parser. Public adapters preserve
complete rows; temporal evaluation stably partitions timestamp groups without leakage.

`stan-aligned.ts` derives current `-stan-v2` counterparts without copying input datasets or
weakening original forecast/lifecycle gates. Unsuffixed declarations remain historical controls.
Use current IDs for reviewed fit-quality work:

```sh
npm run benchmark -- --case map-training-duplicates-auto-stan-v2 \
  --case map-training-duplicate-features-auto-stan-v2
```

`scenarios.json` also inventories non-timing policy comparisons. A catalog entry is not passing
evidence. Featureless linear fitting uses MAP with automatic changepoints, even when built-in
seasonalities resolve empty or are explicitly off. Partial map requests retain those defaults.
Fixed-equation prediction cases use authored MAP state, not an alternate fitting objective. Zero-span linear probes produce no usable matched fit; their
failures must not be relabeled passing or timed as equivalent work.

See [all runnable declarations](../../../CASES.md),
[recorded results](../../../results/RESULTS.md), and the
[accepted fit-quality policy](../../../../docs/decisions/linear-map-benchmark-acceptance.md).
Stationarity is diagnostic-only under EP-097, not a global-optimality certificate.
