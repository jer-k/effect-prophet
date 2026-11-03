import type { CaseDescription } from "./suite.ts";

/** Full Bayesian fits, the same group on every trend's page and gathered on their own page. */
export const bayesianGroup = {
  id: "bayesian",
  title: "Full Bayesian fitting",
  intro:
    "`fit(history, { mcmc: { samples, seed } })` against `Prophet(mcmc_samples=...)` and `fit(df, seed=...)`: both run Stan's NUTS sampler with the same settings. Their chains can't match draw for draw, so each forecast, component and coefficient, a posterior mean, must agree within 0.15 of the narrowest 80% range, and each range bound within the variation expected from that many posterior draws. Divergences and R-hat are reported, and flagged when Effect's chains mix clearly worse than Python's.",
} as const;

const description = (title: string, summary: string): CaseDescription => ({
  group: "bayesian",
  title,
  summary,
});

/** Reader-facing descriptions of each trend's sampled cases. */
export const bayesianDescriptions = {
  linear: {
    "mcmc-linear-mixed-components": description(
      "Mixed features, 600 draws",
      "96 daily rows with switchable multiplicative weekly seasonality, an event, a binary regressor and two automatic changepoints. `mcmc_samples=300`: 4 chains of 150 draws, and 80% ranges from 1,200 simulated futures, two per draw, on 24 rows.",
    ),
    "mcmc-linear-default-changepoints": description(
      "25 automatic changepoints",
      "256 daily rows with weekly seasonality and Prophet's 25 automatic changepoints, so the posterior carries real uncertainty about trend changes into 64 future rows. `mcmc_samples=300`.",
    ),
    "mcmc-linear-regressor-model": description(
      "A regressor forecast by its own model",
      "256 daily rows and four regressors, one forecast by its own default model. That model is fit by optimizing in both libraries, as `mcmc_samples` doesn't reach it in Python, and each of the 1,200 futures takes the next of its 1,000 draws in turn. Python doesn't save regressor models, so there are no save and load timings.",
    ),
  } satisfies Record<string, CaseDescription>,
  flat: {
    "mcmc-flat-mixed-components": description(
      "Mixed features, two chains",
      "96 daily rows with min-max scaling, switchable multiplicative weekly seasonality, an event and a binary regressor. `mcmc_samples=500` on 2 chains: 500 draws, two futures each.",
    ),
  } satisfies Record<string, CaseDescription>,
  logistic: {
    "mcmc-logistic-explicit-floor-minmax": description(
      "Capacity, floor and a multiplicative regressor",
      "96 daily rows with changing capacities, an explicit floor, min-max scaling, weekly seasonality, a multiplicative regressor and two automatic changepoints. `mcmc_samples=300`.",
    ),
    "mcmc-logistic-rate-changes": description(
      "A year of changing growth rates",
      "365 daily rows of saturating growth whose rate changes, with weekly seasonality and 25 automatic changepoints. Ranges cover every past day and 90 future ones. `mcmc_samples=300`.",
    ),
  } satisfies Record<string, CaseDescription>,
};
