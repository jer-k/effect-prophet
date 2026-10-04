# Logistic growth reconciliation

## Target

Unmodified Python Prophet **1.4.0**, source `abf69a215604afcaa7ecb4359f592d13bf6dea9f`, is the default-behavior target. Old documented differences are investigation targets, not permanent exclusions. A better edge-case behavior may eventually be an explicit opt-in; it must not silently replace Python defaults.

`public-api.ts` adds 28 correctness-first cases to the existing runner. No production solver is changed by this first suite. Existing Stage F cases, inputs and tolerances remain unchanged. In particular, old logistic `-stan-v2` declarations are renamed copies, **not** a logistic solver upgrade.

## First runnable selection

| Cases (`logistic-reconcile-` prefix)                                               | User intent / expectation                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaults-96`, `defaults-256`                                                      | Ask only for logistic growth. Python decides built-in seasonalities, automatic changepoints, scaling and optimizer. Effect gets exactly `{ growth: "logistic" }`; the adapter must not fix its defaults on its behalf.          |
| `basic-96-{empty,explicit,auto}-{absmax,minmax}`                                   | Basic curve, both scaling choices, with no changes in rate, one requested change date, or three automatic candidates. Empty-point behavior is tested against Python's actual private dummy/folding lifecycle, not excluded.     |
| `empty-loose-prior-{absmax,minmax}`                                                | Keep no changepoints but permit larger learned rate changes (`changepointPriorScale: 10`). This probes whether Python's private dummy/folding behavior becomes visible in public forecasts; do not classify it as an exclusion. |
| `basic-99`, `basic-100`, `basic-256`                                               | Exercise Python's default Newton/L-BFGS selection either side of 100 retained rows and on a larger history.                                                                                                                     |
| `weekly`, `conditional`, `event`, `regressor-additive`, `regressor-multiplicative` | Isolate each supported effect before attributing a combined-feature mismatch to the solver.                                                                                                                                     |
| `explicit-floor-{absmax,minmax}`                                                   | Supply changing lower and upper bounds; preserve Python's floor-aware scaling.                                                                                                                                                  |
| `mixed-{absmax,minmax}`                                                            | Combine conditional seasonality, event windows and a multiplicative regressor with explicit floors.                                                                                                                             |
| `unsorted`, `duplicates`                                                           | Preserve independent rows and use Python's stable ordering, including repeated final dates.                                                                                                                                     |
| `declining`, `saturated`, `constant`, `out-of-bounds`                              | Decreasing baseline, strong saturation, exact constant observations and noisy targets outside the supplied bounds. A Python success versus an Effect fitting failure remains a mismatch.                                        |

All datasets contain historical prediction rows plus 24 future rows, including complete covariates. Every case exercises fit, predict, public JSON encode/decode and fresh-process restored prediction. Python is allowed to select Newton below 100 retained rows, L-BFGS otherwise, and its normal Newton fallback. Configured Effect cases omit optimizer overrides so they exercise the current production policy, not a special benchmark-only improvement.

The two growth-only Python requests disable uncertainty output solely to measure point prediction; fitting and built-in seasonality defaults remain untouched. `sig_figs=12` changes executable output precision, not stopping criteria. The configured declarations explicitly turn built-ins off to isolate individual features; they are not evidence that the libraries' default requests agree.

## Frozen investigation gates

These gates are declared before running the existing implementation. They are investigation expectations, not a new general statistical acceptance policy:

- Trend and final forecast: absolute `0.01` plus relative `0.0001` (around hundredths of an output unit on these roughly 100-unit curves).
- Named components and additive totals: absolute `0.002` plus relative `0.0001`.
- Output noise: absolute `0.02`; independently normalized noise: absolute `0.0002`.
- Independently evaluated proportional fitting objective: absolute `0.01`.
- Constrained endpoint stationarity difference: absolute `0.01`.
- Public persistence: absolute `1e-8`.
- Metadata, component identities, row alignment, scaling and floor policy must agree under the existing report contract.

The stationarity comparison is a **difference between independently fitted endpoints**, not proof that either endpoint is near an optimum. Keep both raw residuals visible. Do not substitute linear EP-097's diagnostic-only waiver for this logistic investigation. If an expectation turns out to be unsuitable, investigate and document why before proposing a changed gate; never quietly loosen it to obtain green results.

The Python objective/residual are computed with the pinned executable's `log_prob(jacobian=False)`. Logistic diagnostics recover its internal **pre-fold** fitted state, including the dummy delta. Python's public empty-point folding changes the prediction parameters; evaluating those folded parameters would misrepresent the optimizer's fitting score. Forecasts still use Python's unmodified public prediction state. Public Stan fitting now reports its private pre-fold objective too; explicitly selected historical proximal fits retain their own true-empty objective.

## Coverage ledger — not exclusions

The first selection is not the entire release contract. Since it was frozen, real numerical/public
regressions cover nonsingular same-point density/gradient/curvature/one-step checks, shared solver
selection/overrides, honest limits, fallback, persistence, CV, subdaily sorting, candidate reduction
and prediction-instance alignment. That scoped evidence does not close every item below:

- Fixed-parameter zero base/segment rates and nonzero sign crossings now have 18 public-state
  oracle cases, including Python nonfinite results translated to typed failures and historical
  proximal restoration. Extreme arithmetic and randomly sampled future singular states remain
  broader investigation work.
- Explicit Newton/L-BFGS overrides, stopping reasons, iteration exhaustion, qualifying fallback and reset state.
- Independent same-point objective, derivatives and curvature before adapting existing Stan-style solvers to logistic growth.
- Subdaily/irregular histories, automatic built-in daily/yearly patterns and changepoint count reduction/repeated candidates.
- Two-row/zero-time-range histories and invalid or inconsistent capacity/floor inputs.
- Reordered/duplicate prediction rows with distinct covariates: Python sorts its public prediction frame, so the comparison needs row-instance alignment rather than treating sort order as a numerical mismatch.
- Logistic uncertainty defaults and cross-validation: reuse their existing owners, with the same default-parity policy.

## First observed checkpoint

The [red-checkpoint review](../../../../docs/validation/logistic-reconciliation.md) records 28 new
case failures and four unchanged control passes on native release WASM / pinned Python. It separates
default-feature mismatches, the large no-point forecast discrepancy and optimizer diagnostics.
No production fix or gate relaxation is included in that first checkpoint.

The subsequent public cutover run `2026-10-03T175723-858Z-8be8f0e6` uses byte-identical declarations,
datasets and gates: **21 investigation passes / seven failures**, with all four controls passing.
Shared automatic seasonalities and Stan logistic fitting now reach the public API. No failing
case admits timing; the separate sensitive numerical diagnostic is parked but remains asserted
and red. See the same validation review for hashes, remaining failures and limits.

The operation-correction replay `2026-10-03T224208-182Z-8be8f0e6` retains the same declarations,
datasets, gates and budgets: **22 investigation passes / six failures / four control passes**.
The declining case now passes. Six authored private executable probes guard the typed scalar,
packet and column-major arithmetic paths; the defaults-256 objective and parked numerical
stationarity assertions still fail. No failed case admits timing and no release baseline is
retained.

## Reproduce

Generate v2 only when maintaining inputs; normal runs consume committed bytes without regeneration:

```sh
npm run benchmark:setup -- v2
npm run benchmark:typecheck
npm run benchmark:test
npm run benchmark -- $(node --input-type=module -e 'import { logisticReconciliationCases } from "./benchmark/cases/growth/logistic/public-api.ts"; process.stdout.write(logisticReconciliationCases.map(c => `--case ${c.id}`).join(" "));')
```

`v1` remains byte-for-byte unchanged. v2 contains only the new logistic datasets, using the existing shared deterministic noise and 12-significant-digit input canonicalizer. Regenerating an existing version with different bytes fails.

Use the existing Docker runner, raw artifacts and eligibility report. Failed targets admit no timing. Local dirty-tree runs are investigation evidence, not retained clean-release baselines. The retention tool requires shared inputs committed in HEAD before promoting a run; do not bypass it.
