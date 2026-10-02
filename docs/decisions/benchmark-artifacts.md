# Benchmark artifact ownership

## Decision

Separate the maintained benchmark catalog, immutable shared inputs, local execution artifacts
and deliberately retained evidence. Scope directories describe tested functionality; architecture
and execution details belong in manifests. Multiple retained runs live beneath the same scope.

- `benchmark/tools/` owns execution, protocol parsing, reporting, comparison and retention.
- `benchmark/cases/` owns declarations grouped by Prophet capability; focused feature cases
  have one primary owner. Mixed growth cases and derived solver/uncertainty/evaluation cases
  reuse their original settings, inputs and gates.
- `benchmark/inputs/<version>/` owns committed dataset bytes and checksum manifests. Running
  never regenerates inputs. Generation is explicit and cannot overwrite an existing version.
- `benchmark/results/runs/` and `comparisons/` are gitignored developer artifacts.
- `benchmark/results/retained/<scope>/<run-id>/` owns explicitly reviewed evidence. Retention
  requires complete selected-case artifacts and exact shared input bytes committed in HEAD,
  refuses overwrite, and can preserve failed comparisons deliberately.
- `baselines.json` contains mutable named pointers to retained evidence, not duplicate copies.
- Generated `CASES.md`, `results/RESULTS.md` and per-run `report.md` provide readable coverage,
  recorded validity and timing. Case coverage documentation does not maintain current pass counts.

## Reuse and boundaries

The existing case/dataset parsers, implementation/manifest parsers, report builder, eligibility
protocol, real adapters and pinned runtime builds remain the owners of their existing behavior.
The former promotion script provided the retention seam; its weak identifier/overwrite checks
were replaced with selected-case/input checks rather than introducing another benchmark harness.
Shared artifact I/O decodes JSON through those parsers before returning domain values. New tool
operations use named Effect spans; measured public operations remain tracing-disabled.

A run freezes only its selected declarations, including input identities, while sharing immutable
input versions. Raw correctness/failures/samples belong to the two implementation files. Reports
are derived views; new runs do not retain a redundant JSONL export or copied datasets.

Comparison displays recorded gate outcomes separately from timing eligibility. Comparable timing
requires passing gates, matching declarations/input identities, gate implementation identities and
compatible environment metadata. Historical runs without gate source hashes require identical
recorded images. A compatible comparison is still descriptive, not a cross-language speed ratio,
clean-release claim or calibration certificate. Replay means recorded settings/inputs on current
code, not restoration of the old executable.

## Migration and trade-offs

Existing manifests, case snapshots, input copies, raw results and generated reports retain their
exact bytes and historical path strings. Review navigation links change only to follow the moved
folders. Historical outcomes are not recomputed against current gates. Older incomplete snapshots
remain readable retained evidence but cannot be replayed/compared without frozen case declarations.

The fixture generator's image-local legacy dataset paths remain intentionally compatible through
Docker COPY mappings. This avoids changing its hashed generator revision or generated oracle bytes
merely to rename the host input directory.

Input versions referenced by retained runs must not be deleted. Shared inputs avoid storage
multiplication but require repository history plus retained manifests for audit; future runs are
not standalone input bundles. Moving a baseline pointer is explicit. Local comparisons are
excluded from the committed overview, and retention is evidence selection rather than a pass stamp.

See [the benchmark guide](../../benchmark/README.md) for current commands.
