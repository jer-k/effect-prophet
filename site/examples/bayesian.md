---
description: "Full Bayesian fitting with the mcmc option, like Python's mcmc_samples: posterior sampling, ranges for every component, and sampler diagnostics."
---

# Full Bayesian fitting

By default, `fit` finds the single most likely set of parameters (the MAP estimate). With the
`mcmc` option it instead draws thousands of plausible parameter sets from the posterior with Stan's
NUTS sampler, exactly as Python's `mcmc_samples` does. Ranges then cover how unsure the model is
about its trend and seasonality, not just future trend changes and noise.

<<< @/snippets/bayesian.ts

```txt [Output]
linear-piecewise-mcmc: 0 divergences, max R-hat 1.03
1200 simulated paths
2025-04-01 135.9 (80% range 131.8 to 139.8) weekly -8.80 to -6.84
2025-04-02 143.9 (80% range 139.8 to 148.1) weekly -1.20 to 0.65
2025-04-03 152.3 (80% range 148.2 to 156.5) weekly 6.82 to 8.68
```

## Options

| Option    | Default       | Meaning                                                                        |
| --------- | ------------- | ------------------------------------------------------------------------------ |
| `samples` | required      | Iterations per chain, like `mcmc_samples`. Each chain keeps half, rounded down |
| `seed`    | required      | Any whole number. The same seed always gives the same draws                    |
| `chains`  | `4`           | Independent chains, up to 16                                                   |
| `warmup`  | `samples / 2` | Iterations each chain spends tuning itself before it keeps draws               |

Python's `mcmc_samples=300` is `mcmc: { samples: 300, seed }`: 4 chains of 150 warmup and 150
kept iterations, 600 draws in all. Model kinds are `"flat-mcmc"`, `"linear-piecewise-mcmc"` and
`"logistic-piecewise-mcmc"`; `isMcmcModel` tells them from MAP models. Python picks a random seed when you don't give one; here the
seed is required, so a fit is repeatable.

The sampler is a port of Stan 2.37.0's adaptive NUTS with CmdStan's default settings, run on
Prophet's own model. Its chains can't match CmdStan's draw for draw, since tiny rounding
differences grow along a chain, so the [benchmarks](/benchmarks/bayesian) compare the posterior
means and ranges with Python's instead, within the variation expected from that many draws.

## What changes

- **Point forecasts** use the posterior means, as Python's do. `model.slope`, `model.coefficients`
  and the other fields hold those means, and `model.posterior` holds every draw.
- **Ranges** come from `ceil(samples / draws)` simulated futures for each draw, as in Python, so
  `sampleCount` can be more than the `samples` you asked for: 1,200 for 1,000 samples over 600
  draws. `simulation` is `prophet-mcmc-scalar-xoshiro128ss-v1`.
- **Component ranges.** `predictWithIntervals` adds `componentIntervals` to each row: the range of
  the additive and multiplicative totals and of every seasonality, event and regressor over the
  draws, like Python's `weekly_lower` and `weekly_upper` columns. Multiplicative ranges are
  factors, as in Python.
- **Regressor coefficients.** `getRegressorCoefficients` gives each coefficient's posterior mean
  and `coefficientInterval`, its 80% range over the draws, like Python's `coef_lower` and
  `coef_upper`.
- **Warm starts.** `warmStartParameters` returns the posterior means, as Python's
  `warm_start_params` does, and `map.warmStart` sets where every chain starts.
- **Saved models** keep every draw, so a loaded model forecasts and simulates exactly as before.

## Checking the sampler

`model.fitSummary.diagnostics` reports the sampler's health, as CmdStan's `diagnose` and
`summary` do:

| Field                         | Look for                                                                  |
| ----------------------------- | ------------------------------------------------------------------------- |
| `divergences`                 | Zero. Any mean the sampler struggled, and the ranges may be too narrow    |
| `maxTreeDepthHits`            | Few. Many mean slow, awkward exploration                                  |
| `maxRhat`                     | Below about 1.01 to 1.05. Higher means the chains disagree: sample more   |
| `minBulkEss`, `minTailEss`    | At least a few hundred, for stable means and ranges                       |
| `meanAcceptStat`, `stepSizes` | Acceptance near or above the 0.8 target, and each chain's tuned step size |
| `warmupDivergences`           | Divergences while tuning, which CmdStan doesn't report; usually harmless  |

A flat or linear history whose values are all the same keeps Prophet's single fixed state, as
Python does: its `termination` is `"constant-target-shortcut"`, it has one draw and no
diagnostics. Logistic growth always samples.

## Things to know

- **Short warmups never tune the metric.** CmdStan only adapts the sampler's per-parameter scales
  once warmup is long enough for its tuning windows, so Python fits with `mcmc_samples` under 300
  keep the default scales and smaller steps. This sampler does the same, to match Python.
- **Sampling is slower than MAP fitting**: hundreds of gradient evaluations per draw instead of a
  few dozen in all. The 90-day example above takes about a second. Linear and flat fits take
  about as long as Python's, but logistic fits take 3–4 times as long as Python's native CmdStan.
  See the [benchmarks](/benchmarks/bayesian), which also time ranges from a posterior. Python's
  calls there also compute point forecasts and components, so those times aren't compared.
- **Limits.** Up to 16 chains, 100,000 warmup iterations per chain and 20,000 kept draws in all,
  and at most 2,000,000 kept values (draws times parameters), so models stay a reasonable size.
  The first three are checked against your `mcmc` options before sampling: past them, `fit` fails
  with an `InputValidationError` whose `input` is `"options"`, with an issue at `mcmc.chains`,
  `mcmc.warmup` or `mcmc.samples`. Kept values depend on how many parameters the model has, so
  only fitting can check them: past that, `fit` fails with a `FittingError` whose `reason` is
  `"sampling-limit"`.
- **Every growth and feature.** Flat, linear and logistic growth all sample, with events,
  country holidays, conditional seasonalities and regressors. Regressors
  [forecast by their own models](./regressors#forecasting-a-regressor) optimize unless their own
  options set `mcmc`, as in Python, where `mcmc_samples` doesn't reach them; when a posterior runs
  more futures than the regressor models drew, it reuses their draws in turn, as Python does.
- **Evaluation.** `crossValidate`, `searchModels` and `evaluateHoldout` sample a posterior for
  every fit. Each round's ranges run `ceil(samples / draws)` futures per draw, and holdout reports
  record the posterior's draw count, divergences and largest R-hat instead of optimizer progress.
