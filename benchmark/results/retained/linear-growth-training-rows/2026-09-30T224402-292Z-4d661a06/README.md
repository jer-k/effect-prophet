# Linear-growth migration edge review (EP-096)

[Full report](report.md) · [Raw run manifest](manifest.json) · [Shared cases](cases.json)

Reviewed native `linux/arm64` run `2026-09-30T224402-292Z-4d661a06` on Apple M4 Pro. The source revision is dirty; immutable container identities, locks, input hashes and complete row snapshots are retained. Each case has two independent correctness runs; only accepted cases retain timing samples. This is bounded compatibility evidence, not a speed ranking or a blanket migration guarantee.

## Outcomes

13 selected cases: **9 passed, 4 withheld from timing**.

| Scenario | Outcome |
| --- | --- |
| Ordered / unsorted unique rows, explicit MAP points | Passed; identical projected differences against Python, maximum forecast difference `3.026e-7` |
| Duplicate dates with differing targets, explicit points | Passed; maximum forecast difference `1.975e-6` |
| Duplicate dates, repeated automatic candidates | Passed; maximum forecast difference `1.858e-4` |
| Duplicate dates with differing regressors / condition masks | Passed; maximum forecast difference `8.039e-4`, component difference `2.872e-5` |
| Repeated candidates through uncertainty and fresh-process restoration | Passed point/noise, replay, dimensions and sample-reduction gates; not bitwise RNG or fitted-distribution parity |
| Zero-span flat, varied / constant targets | Passed; varied-target forecast difference `8.557e-5`; constant-target difference zero |
| Duplicate-aware CV, application baselines, search, final holdout and report persistence | Passed; maximum point-forecast difference `3.480e-5` |
| Ordered / unsorted unique rows, automatic MAP points | **Migration blocker:** Effect exhausts its 10,000-iteration budget while Python succeeds in both independent runs. The sorted control reproduces the failure, so it is not caused by stable input sorting. |
| Zero-span linear, varied targets | Both implementations fail; Effect reports typed degenerate observations, Python fails optimization at NaN initialization |
| Zero-span linear, constant targets | Effect rejects degenerate observations; Python nominally fits but forecasts NaN, rejected by the correctness gate |

The largest forecast discrepancy in an accepted point-fitting case is `8.039e-4` in this dataset's output units. Tolerances were declared before running and were not loosened after failures. The known automatic-MAP convergence gap must be investigated before claiming general no-regression migration support. Do not drop the failed controls, silently increase their iteration budgets, or compare timings without correctness eligibility.

## Interpretation and harness checks

The same complete source rows reach both fitting APIs; no benchmark parser sorts or deduplicates training histories. Application-owned temporal evaluation partitions use stable chronological order with complete timestamp groups on one side of the development/holdout boundary. Assessment alignment is by ordered row instance, not first matching timestamp. Package/application baseline ties are stable-last, while means count every row; Prophet has no baseline API.

Python's exact-constant shortcut stores noise in a scalar-shaped array and never calls CmdStan. The adapter normalizes that public parameter shape and records verified shortcut noise, not a fabricated optimizer objective. Forecast, metadata and fresh-process persistence gates remain in force. Zero-span invalid linear fits are diagnostic outcomes and admit no timing.

Featureless default Effect OLS versus Python default MAP, canonical UTC versus pandas ingestion, missing-target rejection, prediction order and uncertainty/metric policy differences remain explicit migration considerations. This run does not claim full API or numerical parity.
