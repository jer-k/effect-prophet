# MAP forecast uncertainty

**Experimental linear/flat/logistic MAP implementation.** See the [EP-072 decision record](../decisions/map-uncertainty.md) for the accepted linear/flat process, RNG, limits, replay policy and intentionally limited scalar-path evidence. Logistic MAP uncertainty uses the same seeded future-event path with the continuous-logit evaluator and caller-supplied capacity/floor bounds.

The caller supplies complete prediction rows. After fitting a MAP model, an opt-in seeded simulation will hold the fitted component coefficients and known future covariates/conditions fixed. For linear and logistic trends it draws new future changepoints and slope changes according to Python Prophet 1.4.0's _scalar_ predictive process; flat trend stays fixed. Logistic predictions require caller-supplied capacity/floor. Each row also receives independent fitted observation noise. Neither the seasonal/regressor coefficients nor future covariate values are sampled.

For each sample and prediction row:

```text
trend = restored fitted trend + simulated future trend change
value = trend * (1 + fixed multiplicative component)
      + fixed additive component + independent observation noise
```

`trend` and `value` are output units. A sample represents one shared latent trend path across the entire ordered request; equal timestamps share its latent linear/flat trend but may have different supplied features and independent noise. For logistic growth, equal timestamps instead share a latent logit path, while differing row capacities/floors can yield different trends. The package will preserve unsorted/duplicate rows without preprocessing. Intervals are empirical, equal-tailed quantiles of the same draws, not confidence intervals for fitted parameters or guaranteed coverage.

The pinned release defaults to a faster **different vectorized grid approximation**. Comparing fixed-parameter scalar distributions and moments to that release is appropriate; claiming identical seeded samples or default-vectorized parity is not. `predictUncertainty` requires a seed and returns either row intervals or owned row-major trend/value sample buffers. `predict` remains point-only. Fixed-state linear/flat/logistic and mixed-regressor moments and quantiles are compared to [committed pinned Prophet scalar-path fixtures](../../integration/fixtures/prophet-1.4.0/map-uncertainty.json) with predeclared absolute tolerances. This is neither fitted-model coverage evidence nor default-vectorized parity.
