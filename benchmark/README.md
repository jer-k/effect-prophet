# Prophet benchmarks

Correctness-gated public API benchmarks for Effect Prophet and pinned Python Prophet 1.4.0.
Passing evidence is bounded by each case's contract—not universal compatibility, optimizer
optimality, interval calibration, a speed ranking or a RAM comparison.

## Where things live

| Folder / file                            | Responsibility                                                                    |
| ---------------------------------------- | --------------------------------------------------------------------------------- |
| `tools/`                                 | Runner, adapters, schemas, reports, comparison and retention tools                |
| `tools/runtime/`                         | Compose, pinned Docker builds, Python lockfile and isolated builder configuration |
| `cases/`                                 | Maintained declarations grouped by primary Prophet functionality                  |
| [CASES.md](CASES.md)                     | Generated list of runnable coverage; declarations are not passing evidence        |
| [inputs/](inputs/README.md)              | Committed versioned datasets, complete future covariates and checksum manifests   |
| `results/runs/`                          | Gitignored developer runs, including failures and partial attempts                |
| `results/comparisons/`                   | Gitignored developer comparison reports                                           |
| `results/retained/<scope>/<run-id>/`     | Explicitly reviewed, checked-in evidence                                          |
| `results/baselines.json`                 | Named pointers to retained evidence, never duplicate snapshots                    |
| [results/RESULTS.md](results/RESULTS.md) | Generated human-readable retained outcomes and report links                       |

Scope names describe what was tested. Architecture, emulation, processor, git revision and
build identities belong in manifests/reports, not descriptive directory names. Each retained
scope can contain multiple immutable run IDs.

## Run

Requires Docker with Compose and enough memory to build the release Rust/WASM and Prophet
images. No local Python or Rust installation is needed. Committed inputs are used directly:
**running benchmarks never regenerates datasets**. Input bytes are checked before Docker runs,
and adapters verify their recorded identities again before measuring.

```sh
npm run benchmark
npm run benchmark -- --case flat-level-minmax --case evaluation-flat-mixed-point
npm run benchmark -- --suite flat
npm run benchmark -- --no-build --case map-events-small
```

Rebuild after source/adapter changes; `--no-build` deliberately reuses existing images.
Apple Silicon uses `linux/arm64`; x64 uses `linux/amd64`. An explicit
`BENCHMARK_CONTAINER_PLATFORM=linux/amd64` override is recorded as emulated on ARM.

Each run freezes **only selected cases**, including configuration, gates and input hashes.
Both adapters pass independent correctness checks and the cross-language eligibility gate
before timing. Failed cases stay visible with no accepted timing. Incomplete infrastructure
attempts stay local and cannot be retained as complete evidence.

```text
results/runs/<run-id>/
  manifest.json
  cases.json
  effect-prophet.json
  python-prophet.json
  eligible-cases.json
  report.json
  report.md
```

Raw samples and correctness projections belong to the two adapter files. `report.json` and
`report.md` are derived summaries; no additional `records.jsonl` export or per-run dataset copy
is written. Historical retained snapshots preserve their original redundant artifacts and
recorded paths/hashes; they are not rewritten or requalified during this migration.

## Replay and compare

Replay freezes the recorded selection/options but runs the **current code/images**, not an
old executable. It verifies exact shared input bytes; it does not regenerate missing inputs.
You can further restrict the recorded selection with `--case`.

```sh
npm run benchmark -- --replay flat-growth
npm run benchmark -- --replay runs/<run-id> --case flat-constant-minmax
npm run benchmark:compare -- flat-growth runs/<new-run-id>
npm run benchmark:compare -- runs/<before-id> runs/<after-id>
```

References are baseline names or `runs/...` / `retained/...` paths relative to `results/`.
Comparison shows recorded validity even when timing cannot be compared. Timing columns require
both gates to pass, unchanged case/input contracts, matching gate implementation identities and
compatible hardware/runtime metadata. Legacy snapshots without gate source hashes require
identical recorded images.
No cross-language speed ratios are calculated. Dirty-tree comparisons are diagnostic evidence.
Legacy snapshots without frozen cases cannot be replayed or compared with this tool. Historical
`generated/` references map to shared `v1/` inputs only when recorded bytes match; otherwise
restore those inputs under a new immutable version before creating a new declaration.

## Retain reviewed evidence

```sh
npm run benchmark:retain -- <run-id> flat-growth
# Explicitly update that scope's named baseline as well:
npm run benchmark:retain -- <another-run-id> flat-growth --baseline
npm run benchmark:results
```

Review correctness, failures, input/configuration identities, environment, git state and raw
samples before retention. The tool checks selected-case completeness, input hashes and that
exact shared input bytes are committed in HEAD. It refuses existing destinations and does not
copy arbitrary local files. Failed cases may be retained deliberately; retention is not a pass
stamp. Naming an emulated or dirty snapshot does not make it a native/clean release baseline.
`benchmark:baseline` is an alias for the retention command; baseline pointers change only with
`--baseline`. Local comparisons are never included in the checked-in results overview.

## Refresh release baselines

Each trend has one named baseline (`linear-growth`, `flat-growth`, `logistic-growth`) that feeds
the docs site's benchmark pages. Refresh all three together from a clean commit whenever fitting,
prediction, uncertainty or a gate changes, and before each release. Baselines from a dirty tree
are diagnostic only and must not replace these.

1. **Commit everything first.** Code, adapters, case declarations and any new inputs must be in
   `HEAD`; `git status` must print nothing. Retention also requires the shared inputs to be
   committed. Do not edit files while a run is in progress.
2. **Run the trends one at a time.** `--suite` selects every declared case of a trend, so a case
   added since the last refresh is included without listing it. A case belongs to the suite of
   the growth type it exercises; uncertainty and evaluation cases follow their source case.
   Overlapping runs compete for CPU and distort timings. Each run builds the Rust/WASM and Python
   images, so allow time for the first one:

   ```sh
   npm run benchmark -- --suite linear
   npm run benchmark -- --suite flat
   npm run benchmark -- --suite logistic
   ```

   (`--replay <baseline>` instead reruns exactly what a baseline recorded. It cannot add cases,
   and it cannot be combined with `--suite`.)

3. **Review each run** in `results/runs/<run-id>/`. The manifest must say `"gitDirty": false`
   at the intended commit. Every case must pass, except intentional differences (today: the two
   zero-span linear cases). Investigate anything else, including cases flagged
   "investigate internal fit differences", before retaining. If a gate or declaration needs to
   change, fix it, commit and start over: do not retain a run made on an older commit.
4. **Retain and repoint.** `--baseline` moves the named pointer. It refuses a run that covers
   only part of a suite it contains, or contains cases the catalog does not declare, and names the
   missing cases; fix that by rerunning with `--suite` rather than by overriding the check:

   ```sh
   npm run benchmark:retain -- <linear-run-id> linear-growth --baseline
   npm run benchmark:retain -- <flat-run-id> flat-growth --baseline
   npm run benchmark:retain -- <logistic-run-id> logistic-growth --baseline
   npm run benchmark:results
   ```

5. **Delete the superseded retained folders.** Keep only the directories `baselines.json` points
   to, then run `npm run benchmark:results` again so `RESULTS.md` lists only what remains. Git
   history keeps the old evidence.
6. **Check the consumers.** The docs site builds its benchmark pages, counts and the overview
   from the baselines, and fails the build if a case has no description (add one in
   `site/.vitepress/benchmarks/<trend>-cases.ts`). Then run:

   ```sh
   npm run docs:build
   npm run benchmark:typecheck
   npm run benchmark:test
   ```

   The benchmark tests read the `flat-growth` baseline through `baselines.json`, so they follow
   the pointer. If they fail, a declaration changed after the baseline was run: rerun it.

7. **Commit the retained folders, `baselines.json`, `RESULTS.md` and any test or site changes**
   together, in a commit after the one the runs were made on. The manifests record the code
   commit that was measured.

New cases follow the same path: declare them under `cases/`, add site descriptions, commit, and
the next `--suite` run picks them up. Timings come from one machine; compare them only
with runs from the same hardware.

## Maintain inputs and coverage

```sh
npm run benchmark:catalog
npm run benchmark:setup -- v2
```

Generation is explicit maintenance. Existing version bytes cannot be overwritten; recipe changes
require a new version and updated case references. Commit inputs before retaining dependent
runs. Cases have one primary capability owner; mixed-feature cases reuse declarations and
lifecycle serialization phases instead of being copied into every feature folder.

See the [Python-default logistic reconciliation](cases/growth/logistic/README.md),
[flat coverage gaps](cases/growth/flat/README.md),
[linear input-policy cases](cases/growth/linear/README.md),
and [measurement contracts](tools/MEASUREMENTS.md).

## Tests

```sh
npm run benchmark:typecheck
npm run benchmark:test
```

These tests require no Docker or Python. Normal package tests remain Python-free.

### Python input-adapter regressions

After building the pinned Python image, run its real pandas/Prophet conversion and constant
fit/predict/JSON lifecycle checks:

```sh
docker run --rm --network none --read-only --tmpfs /tmp \
  -e OMP_NUM_THREADS=1 -e OPENBLAS_NUM_THREADS=1 -e MKL_NUM_THREADS=1 \
  -v "$PWD/benchmark/tools/adapters:/workspace/benchmark/tools/adapters:ro" \
  -v "$PWD/benchmark/tools/test/adapters:/workspace/benchmark/tools/test/adapters:ro" \
  -v "$PWD/benchmark/inputs:/workspace/benchmark/inputs:ro" \
  effect-prophet/benchmark-python:1.4.0 \
  /opt/effect-prophet-benchmark/bin/python \
  /workspace/benchmark/tools/test/adapters/python-prophet.test.py
```

## Docker storage

`run --rm` removes containers, not images or BuildKit cache. Results are host mounts; no persistent
runtime volumes are created. `npm run benchmark` builds on the isolated `effect-prophet-benchmark`
builder (created on first use from the checked-in GC budget, or the builder named by `BUILDX_BUILDER`).
When it finishes, pass or fail, it trims that builder's cache to 8 GB and removes superseded benchmark
images (`benchmark/tools/docker-cleanup.ts`). Cleanup is best-effort and never fails the run. To
create the builder or inspect it by hand:

```sh
npm run benchmark:builder
npm run benchmark -- --case flat-level-minmax
docker buildx du --builder effect-prophet-benchmark
docker buildx prune --builder effect-prophet-benchmark --max-used-space 8GB
docker image prune --filter label=org.effect-prophet.benchmark=true
```

GC targets 8 GB of cache, with a 2 GB floor and 10 GB free-space target; this is not a filesystem
quota. Loaded images are separate. These cleanup commands prompt for confirmation. Avoid blanket
volume pruning: it can delete unrelated application data. Other/default builders are unaffected.
