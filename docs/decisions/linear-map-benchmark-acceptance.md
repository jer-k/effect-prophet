# Linear Stan MAP benchmark acceptance and stationarity deferral

**Status:** Approved by Jeremy; EP-096 local implementation/validation closeout complete. Pending final review/merge; EP-097 remains TODO.

Related: [alignment plan](linear-map-stan-alignment-plan.md), [same-point investigation](linear-map-stan-same-point-investigation.md), and Hubble EP-097.

## Decision

Jeremy accepted the tiny objective, normalized-noise and forecast differences in the frozen ordered automatic case, requested a separate stationarity ticket, and authorized the remaining benchmark/validation/review closeout with stationarity deferred to EP-097.

This approval changes the **benchmark acceptance policy**, not the optimizer or the meaning of the public `stationarityResidual`. Newton/L-BFGS algorithms, initialization, priors, exact Laplace objective, controls, automatic selection, original-initialization fallback and the 10,000-step per-attempt budget remain unchanged. It is not a promise of bitwise trajectories, small KKT residuals, or global optima.

## Versioned requirements

New version-two solver counterparts use evidence identity `linear-stan-map-fit-quality-v3`:

- Independent proportional posterior objective: absolute difference at most `0.01`.
- Normalized observation noise: absolute difference at most `0.0002`; values must be positive and finite.
- Existing per-case trend, named-component, additive, forecast, output-unit noise, metadata and persistence gates remain unchanged.
- Applicable uncertainty replay, finite dimensions and same-sample reduction checks remain mandatory. This does not establish new fitted distribution parity or calibration.
- Both implementations must report exactly one finite, nonnegative constrained stationarity residual per fitted correctness run. Raw values and their differences appear in JSON and Markdown.
- Stationarity is explicitly `{ kind: "diagnostic-only", followUp: "EP-097" }`. Its endpoint equality and near-stationarity certification do not determine timing eligibility under this policy.

No numerical tolerance for a retained gating quantity is increased. Every selected case must independently pass the remaining gates; results for one small Newton case do not qualify a larger/mixed L-BFGS case.

## Why endpoint residual equality is deferred

The focused investigation found exact preparation/initialization agreement and approximately `1e-10` same-point density/gradient agreement. Slightly different accumulated states take different near-threshold backtracking decisions, then satisfy the same objective-change stopping rule at different endpoints. Noise-coordinate scaling and nonsmooth near-zero deltas make the resulting endpoint residuals sensitive to these small differences.

Comparing two large residuals for near equality is not a certificate that either state is near-stationary. EP-097 retains the full evidence and owns the diagnostic/optimality decision, remaining-case investigation and any separately approved numerical-policy work. A successful benchmark here means the declared fitted-quantity and lifecycle checks passed, not that this open work was resolved.

## Historical evidence and exceptions

Archived `linear-stan-map-v2` cases keep their original `stationarityAbsolute: 0.01` equality requirement. The parser and report continue to apply it when reading those declarations. Original failed case snapshots, reports, raw samples and coordinate-exhaustion evidence are not rewritten or requalified.

The two zero-span linear comparisons remain expected unusable comparisons: Effect returns a typed degenerate-history failure while the reference fails or produces nonfinite output. They retain failure records and no timing. Flat zero-span comparisons continue to use their separate fitting policy.

New runs record their explicit policy and evidence identity. Only correctness-eligible cases contribute timing summaries. Existing benchmark provenance requirements still apply; dirty-tree retained evidence is disclosed and is not promoted as a clean release baseline.

## Closeout requirements

Before marking EP-096 implementation/validation complete:

1. Test diagnostic-only reporting, strict finite/presence checks, historical gate preservation, and all remaining gating failures.
2. Run the full migration set plus original linear feature workloads, large automatic linear features, scaling and mixed-linear cases through real release WASM and the pinned native reference.
3. Retain only eligible timing and preserve expected zero-span failures.
4. Complete public/Rust/WASM/integration/benchmark, fixture, package/example, lint/typecheck/format and diff checks.
5. Review training-row invariants, public controls, completion/fallback, persistence, resource bounds, protocol failures and tracing; reconcile docs and tickets with actual results.

## Completed local evidence

Native-arm64 run `2026-10-02T043132-582Z-4d661a06` is retained in [linear-map-stan-fit-quality-native-arm64](../../benchmark/results/baselines/linear-map-stan-fit-quality-native-arm64/README.md). All 22 usable comparisons pass; both zero-span linear exceptions retain failures and no timing. The 36 stationarity records remain visible. Maximum observed objective difference is about `0.001203`, normalized-noise difference `7.893e-6`, forecast difference `0.006924` in the respective case's output units, and stationarity difference `79.984`. These are case-bounded observations, not universal tolerances or a shared diagnosis.

`npm run check`, `npm run fixtures:check` and `git diff --check` pass. Coverage is 433 public, 100 native Rust, 19 Node-WASM numerical, 25 direct WASM, 29 integration and 46 benchmark tests; package/examples, lint/clippy/typechecks and formatting pass. Additional real optimizer lifecycle tracing checks cover failure, fallback, finite exhaustion, direct parents and interval containment. Hash verification confirms all 62 snapshotted fixture/historical files are unchanged. Contract review covers all items above; the earlier unrelated formatting blocker no longer reproduces.

The retained snapshot explicitly records dirty-tree provenance and overlapping local validation load; its timing is descriptive, not a clean release/performance baseline. No production solver or optimizer setting was changed for this acceptance decision. Everything remains local/uncommitted and pending final review/merge.

Stationarity work remains TODO under EP-097 after this closeout. Completion does not imply that those residuals are small or that every fitting family is Prophet-compatible.
