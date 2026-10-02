# Current passing flat-growth and evaluation benchmarks

**36/36 cases passed; no structured failures.** Source run:
`2026-10-02T210323-182Z-6cbae03d`. Rebuilt release images; native Linux/arm64 on Apple M4 Pro;
pinned Prophet 1.4.0; git `6cbae03dc72a263bd0e77a8360a762643b4a7a37` with dirty provenance.
This is descriptive local evidence, not a clean-tree release/performance baseline.

## Scope and gates

- **22 direct flat cases:** eight basic/additive fits, ten exact prefix/scaling pairs and four
  full-history mixed fits. Forecast/component/noise/scaling and JSON/fresh-restoration gates pass.
- **14 current evaluation cases:** five flat, five logistic and four linear workloads.
  The four linear `-stan-v2` cases reuse existing Stan-aligned mappings instead of retired
  optimizer controls. Canonical declarations and all tolerances remain unchanged.
- **27 flat cases total**, including both constant scaling modes and canonical evaluation.

Both correctness stages passed before timing. Each adapter retains 338 measurement records;
raw samples, reports, projections, exact case/data snapshots and manifest are included.
The expected missing-capacity candidate in the passing linear search is a deliberate workflow
check, not a failed benchmark case.

## Explicit Python numeric input mapping

Python's adapter now supplies float64 target/capacity/floor/regressor columns, matching
JavaScript numbers; condition masks remain boolean. This preserves numeric values and dataset
bytes while avoiding integer-typed fitted offsets. The integer-spelled constant dataset is
unchanged, and `flat-constant-minmax` passes ordinary fit, prediction, public JSON round-trip
and fresh-process restoration. No fitted state or upstream serializer is patched.

Three real pinned-Python adapter tests cover numeric values/types, masks, timestamps, duplicate
order, empty frames and constant public lifecycles in both scaling modes. The mapping is
recorded as `input-numeric-dtype=float64` in Python environment resources and in source/image
identities. Conversion cost belongs to the existing input-conversion phase; persistence gates
and timings retain their original scope. See the [test command](../../../../README.md#python-input-adapter-regressions).

## Evaluation and retention

MAP CV defaults independently to absmax, matching Python's fold-copy behavior. Effect permits
an explicit minmax override; every fold learns scaling values from training data only.
See [the accepted decision](../../../../../docs/decisions/cross-validation-scaling.md).

At Jeremy's request, only the current passing snapshot is retained for this scope. It replaces
the earlier 35-case snapshot and its constant-minmax exclusion. Obsolete failure/preliminary
runs, redundant absmax evaluation copies and the investigation-only script remain removed.

Evaluation remains `different-public-work`: interval distributions, report payloads and
cross-language holdout forecasts are not equality claims. Effect's selected receipt retains
effective scaling, whereas Python's application holdout loop uses its original configuration.
Absolute timings are descriptive only; worker high-water RSS excludes CmdStan child processes
and is not a per-call allocation or RAM ranking. No calibration, global optimality or general
flat compatibility claim is made.

Use `manifest.json` for selected IDs, image/source identities and commands. A clean-tree
PR/release checkpoint remains required.
