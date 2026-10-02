# Flat growth coverage

Flat growth means a constant **trend**, not a constant forecast. Seasonalities, holidays and
regressors may vary the forecast. `public-api.ts` derives controls from the shared flat mixed
cases in `../mixed-map.ts`; it does not expose invented Effect optimizer settings.

The runnable direct set includes positive/negative noisy levels, exact constants, additive
weekly patterns, full-history mixed models and exact rolling-prefix fits under absmax/minmax.
Diagnostic zero-span controls also live with the shared training-row edge cases. Canonical flat
CV/interval/search declarations belong to `../../diagnostics/evaluation.ts`, not copied here.

Direct fits gate forecasts/components, noise, scaling, public JSON round trips and fresh-process
restoration. Both adapters disable built-in seasonalities and retain declared Python fitting
settings. These settings do not establish default-algorithm equivalence.

## Coverage and gaps

| Capability    | Runnable coverage                                         | Remaining or intentionally different                                                                                        |
| ------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Basic levels  | Positive, negative and positive constant histories        | Zero/zero-centered histories and zero constants                                                                             |
| Scaling       | absmax/minmax, full mixed histories and exact prefixes    | Broader per-feature scaling controls                                                                                        |
| Seasonalities | Additive custom weekly and conditional mixed patterns     | Flat fitted built-ins and multiple periods/priors; additive-only conditional requests rejected; isolated masks still to add |
| Holidays      | A mixed single-event route                                | Additive-only flat requests rejected; isolated windows/overlaps still to add                                                |
| Regressors    | A mixed binary never-standardized route                   | Additive-only flat requests rejected; isolated transforms still to add                                                      |
| Composition   | Original mixed models, full histories and prefixes        | Toggle one feature at a time; do not add unrelated features to manufacture passing cases                                    |
| Input policy  | Shared sorting/duplicates and zero-span tests             | More flat-specific row-shape timing variants; invalid input policy is not parity timing                                     |
| Lifecycle     | JSON and fresh-process restoration                        | Separate unsorted/repeated/empty prediction workloads                                                                       |
| Uncertainty   | Shared scalar uncertainty and interval-fold workloads     | No identical-RNG or calibration claim                                                                                       |
| Evaluation    | Canonical point/interval/search and exact direct prefixes | Independent CV scaling policy, not an optimizer fix                                                                         |

Planned coverage is not runnable or passing evidence. Add focused datasets through the existing
versioned input generator and preserve original gates. No posterior/MCMC fitting, country
calendars, Python JSON interchange or general calendar generator is implied.

Pinned Prophet's fold copy omits parent scaling. Effect CV therefore defaults independently to
absmax and supports an explicit minmax override. Every fold learns numerical scaling from
training data only. See the [accepted policy](../../../../docs/decisions/cross-validation-scaling.md),
[complete runnable catalog](../../../CASES.md) and [retained outcomes](../../../results/RESULTS.md).

```sh
npm run benchmark -- --case flat-prefix-63-minmax --case flat-prefix-63-absmax \
  --case evaluation-flat-mixed-point --case evaluation-flat-mixed-intervals
```
