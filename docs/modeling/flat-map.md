# Reduced flat MAP model

`growth: "flat"` fits a real reduced Prophet MAP model. It is distinct from the internal
`constant-mean-baseline` teaching example: the level, additive Fourier coefficients, and
observation noise are estimated under Prophet's priors.

## Supported scope

The current public slice supports:

- absmax target scaling;
- a featureless flat level or a non-empty ordered list of additive custom seasonalities;
- exact constant-target histories through an explicit shortcut;
- fit, prediction, named component inspection, and JSON round trips.

Minmax scaling, events, regressors, conditional masks, multiplicative components,
changepoints, and uncertainty remain deferred to their own roadmap tickets. A flat fit
requires at least two observations. The internal constant-mean example remains available
to its focused tests but is no longer selected by public `growth: "flat"`.

The fixed upstream reference is Prophet 1.4.0 commit
[`abf69a2`](https://github.com/facebook/prophet/tree/abf69a215604afcaa7ecb4359f592d13bf6dea9f).
Its [Stan model](https://github.com/facebook/prophet/blob/abf69a215604afcaa7ecb4359f592d13bf6dea9f/python/stan/prophet.stan)
defines `flat_trend(m,T)`, normal level/feature/noise priors, and the normal likelihood. Its
[`flat_growth_init` and `fit` implementation](https://github.com/facebook/prophet/blob/abf69a215604afcaa7ecb4359f592d13bf6dea9f/python/prophet/forecaster.py)
shows that the sample mean is only initialization and that exact constant histories bypass
optimization with `sigma_obs=1e-9`.

## Objective and units

For training values `y`, let `v=max(abs(y))`, using `v=1` when every value is zero, and
`z=y/v`. For the ordered Fourier matrix `X`, the reduced objective is

```text
mu = m + X*beta
J = N*log(sigma) + sum((z-mu)^2)/(2*sigma^2)
  + m^2/(2*5^2)
  + sum(beta_l^2/(2*p_l^2))
  + sigma^2/(2*0.5^2)
sigma > 0
```

This is a summed negative log posterior up to constants independent of optimized
parameters. Priors are not divided by the observation count. Prophet's flat Stan trend
contains only `m`; prior-only slope and changepoint-rate parameters are removed at their
MAP modes rather than represented in portable state.

The fitted model restores output units:

```text
level = v*m
seasonal coefficients = v*beta
noiseScale = v*sigma
trend = level
additive = X*(v*beta)
value = trend + additive
```

## Numerical policy

`flat-map-coordinate-v1` alternates two exact conditional updates:

1. At fixed `sigma`, solve Gaussian-prior ridge least squares over `[1, X]`, with
   penalty weight `sigma/priorScale` for every coefficient.
2. At fixed coefficients, calculate `r = sum((z-mu)^2)` and update

   ```text
   sigma^2 = 2*r / (N + sqrt(N^2 + 16*r))
   ```

The implementation stops when the maximum coefficient/noise change is at most `1e-10`
times the maximum current magnitude, with a budget of 200 updates. It returns a finite
objective and maximum first-order residual. A nonconstant fit whose residual collapses
below the documented numerical threshold fails as `noise-collapse`; no hidden sigma floor,
OLS fallback, or ridge model is reported as MAP success.

Prophet 1.4.0 bypasses optimization for exactly constant target histories. This package
preserves that observable policy with termination `constant-target-shortcut`, the exact
constant level, zero feature coefficients, and scaled noise `1e-9`. The shortcut is not
labeled an interior optimizer convergence.

## WASM protocol

The narrow adapter accepts only resolved flat input and an already parsed seasonality
layout. Growth selection and option compatibility belong to the public planner.

Fit success has exact width `9 + K`:

```text
[
  0,
  level,
  noiseScale,
  valueScale,
  observationCount,
  iterations,
  objective,
  stationarityResidual,
  termination,
  ...KCoefficients
]
```

Termination is `0` for convergence and `1` for the constant-target shortcut. Fit failures
are one-entry frames:

| Status | Meaning                        |
| -----: | ------------------------------ |
|      1 | insufficient observations      |
|      2 | mismatched input lengths       |
|      3 | invalid observation            |
|      4 | invalid resolved configuration |
|      5 | size overflow                  |
|      6 | non-finite numerical result    |
|      7 | noise collapse                 |
|      8 | non-convergence                |

Prediction success has exact width `1 + N*(3+S)` and rows
`[trend, additive, value, ...SComponents]`. Metadata failures contain one status; indexed
timestamp/non-finite failures contain `[status, rowIndex]`. The TypeScript adapter rejects
unknown statuses, fractional codes/indexes, incorrect widths, non-finite success values,
and inconsistent summary fields.

Both fit and non-empty prediction use one complete `effect-prophet.wasm.fit` or
`effect-prophet.wasm.predict` span covering packing, loading, execution, result copying,
strict decoding, and expected failure translation. Pure numerical loops have no spans.
