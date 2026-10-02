# EP-095 — Explicit cross-validation scaling

**Status: accepted by Jeremy; implemented locally, not a merged release.** Jeremy requested
an independent cross-validation scaling option, defaulting to `absmax` to match pinned Python
and allowing an override. This amends the original option-preservation rule in
[the evaluation contract](evaluation-and-selection.md), not the fitting objective or solver.

## Reference behavior and reason

Unmodified Prophet 1.4.0 at `abf69a215604afcaa7ecb4359f592d13bf6dea9f`,
[`python/prophet/diagnostics.py`](https://github.com/facebook/prophet/blob/abf69a215604afcaa7ecb4359f592d13bf6dea9f/python/prophet/diagnostics.py),
constructs fold models in `prophet_copy` without copying `scaling`. Fresh models default to
`absmax`, even when their fitted parent used `minmax`. Public `cross_validation` has no separate
scaling argument. Ordinary Python fitting/prediction still honors the parent's selected mode;
CV does not mutate that parent.

In everyday terms, these methods choose how training target values are put on a smaller
numerical scale. `absmax` scales them without subtracting a baseline; `minmax` first subtracts
a baseline. Python's evaluation helper forgets the parent's choice. The independent
[EP-095 investigation](../../benchmark/results/retained/flat-growth-and-evaluation/2026-10-02T210323-182Z-6cbae03d/README.md) found that differently
scaled folds, not a proven optimizer defect, explained the five original comparison failures.

## Public contract

```ts
// Default: absmax folds, even if fitOptions.scaling is "minmax".
crossValidate(observations, fitOptions, plan);

// Explicit point override; mode: "point" is optional.
crossValidate(observations, fitOptions, plan, { scaling: "minmax" });

// The same override can accompany seeded intervals.
crossValidate(observations, fitOptions, plan, {
  mode: "intervals",
  scaling: "minmax",
  uncertainty: { seed: 19, samples: 128 },
});
```

- MAP fold scaling defaults to `absmax` independently of the fit options. The fourth argument
  accepts `scaling: "absmax" | "minmax"`; it takes precedence over `fitOptions.scaling`.
- Choose a **method**, not a fitted offset/scale. Each ordinary fold fit derives its own
  numerical scaling values from that fold's training observations only. Held-out targets
  never participate. All other fit options and the existing explicit-changepoint projection
  retain their contracts.
- Existing unconfigured featureless linear OLS remains OLS; it has no MAP target-scaling state.
  An explicit CV scaling request selects linear MAP, as an explicit ordinary fit scaling
  request already does. This is an existing package-family distinction, not Python parity.
- Invalid scaling/mode combinations fail validation before any fold/WASM boundary. Point
  controls cannot contain uncertainty controls. Existing interval defaults, budgets, seed
  schedule, prediction order and typed failures are unchanged.
- Caller fit options and observations are not mutated. Ordinary `fit`, prediction and fitted
  model persistence do not change; direct `fit(..., { scaling: "minmax" })` still means minmax.

## Search and final holdout

`searchModels(..., { mode: { scaling: "minmax" }, ... })` uses the same controls; an interval
`mode` may also include `scaling`. Omitted scaling gives every MAP candidate absmax folds,
regardless of the original candidate's fit scaling. This is a shared evaluation policy,
not a per-candidate scaling search. Comparing different scaling policies requires separately
configured searches/cross-validations; declaring two candidates that differ only in their
fit scaling does not override the shared CV policy.

Successful search records retain owned, frozen **effective** fit options, including the scaling
actually used in their folds. Construct the selected receipt from that success record, not from
the original candidate input. `evaluateHoldout` fits those effective options on all development
rows and learns fresh scaling values there; it does not revert to the original candidate's
mode or reuse any fold's numerical offset/scale. Report round trips preserve this choice.
This consistency is our application workflow; Python has no matching search/holdout receipt API.

## Evidence and observability

Real public/WASM tests compare both scaling policies with independent prefix fits and seeded
simulations, poison held-out targets, preserve unconfigured OLS, reject malformed controls before
integration, and check search receipts/final holdout fits and strict report round trips.
Existing `Prophet.crossValidate`, candidate and fold spans retain normal parent/completion
semantics. The bounded `effect_prophet.evaluation.scaling.mode` attribute identifies the CV
policy, not raw target data or fitted scaling values. No tracer/exporter environment is added.

Canonical evaluation case identities, data and gates remain unchanged. Jeremy subsequently
requested that only current valid, passing flat/evaluation benchmark snapshots be retained;
obsolete failure snapshots, investigation scripts and redundant diagnostic cases are removed.
Jeremy then approved fixing the Python harness's numeric input representation: target,
capacity, floor and regressor columns are explicitly float64, matching JavaScript numbers,
while conditions remain boolean. Numeric values and dataset bytes are unchanged. This restores
the constant-minmax benchmark's full public fit/predict/JSON/fresh-restoration lifecycle without
patching fitted state or serialization. Pinned Python remains untouched. The earlier exclusion
is superseded by this tested input mapping, not by weaker gates. This decision does not
resolve flat's additive-only feature restrictions, prove general flat compatibility, or establish
forecast quality/calibration. No flat optimizer rewrite is justified by this diagnosis.
