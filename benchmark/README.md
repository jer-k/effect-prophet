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
| `results/differential/`                  | Gitignored [differential comparison](#differential-comparison) runs               |
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
Each comparison opens with a **What changed** summary: added and removed cases, outcome and
contract changes, and investigation flags that appeared, cleared or changed value.

Timings are compared for every case that passed in both runs with an unchanged contract and
input, on matching hardware and runtime metadata, using medians recomputed from all raw samples.
The header names changed **correctness gates** (`case.ts`, `report.ts`, `report-cli.ts`,
`comparisons.json`, `country-holidays.ts`, `result.ts`) and a changed **timing harness** (the
adapters, `effect-case.ts`, `evaluation.ts`). Changed gates alter how outcomes are judged, not
how long work takes, so they never hide timings. A changed harness can shift timings by itself,
so read flagged phases with it in mind.

**Possible regressions** lists phases where every new sample is slower than every old sample and
the median is at least 5% slower; **Possible improvements** is the mirror image. With six samples
per side, an unchanged phase lands in either list by chance about 0.2% of the time. Python Prophet
is pinned, so flagged Python rows point to machine noise rather than a code change.
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
4. **Report what changed.** Before repointing anything, compare each run with the baseline it
   replaces. The baseline names still point at the previous runs at this stage:

   ```sh
   npm run benchmark:compare -- linear-growth runs/<linear-run-id>
   npm run benchmark:compare -- flat-growth runs/<flat-run-id>
   npm run benchmark:compare -- logistic-growth runs/<logistic-run-id>
   ```

   Each report starts with **What changed**: cases added and removed, changed outcomes, cases
   whose contract or input changed, and investigation flags that appeared, cleared or changed
   value. Then come **Possible regressions** and **Possible improvements**, every case, and all
   compared medians. Put the three **What changed** summaries and any possible regressions in the
   pull request description. Explain every outcome change, flag change and Effect regression
   there before retaining; fix a regression the change caused, then commit and start over.

5. **Record new benchmarks in the changelog.** Under `### Benchmarks` in the upcoming release's section
   of the root `CHANGELOG.md`, say in a line or two what the reports' **Added** cases cover, in
   terms a reader of the changelog understands, and why any cases were removed. Don't list case
   IDs; the reports and `CASES.md` have them.
6. **Retain and repoint.** `--baseline` moves the named pointer. It refuses a run that covers
   only part of a suite it contains, or contains cases the catalog does not declare, and names the
   missing cases; fix that by rerunning with `--suite` rather than by overriding the check:

   ```sh
   npm run benchmark:retain -- <linear-run-id> linear-growth --baseline
   npm run benchmark:retain -- <flat-run-id> flat-growth --baseline
   npm run benchmark:retain -- <logistic-run-id> logistic-growth --baseline
   npm run benchmark:results
   ```

7. **Delete the superseded retained folders.** Keep only the directories `baselines.json` points
   to, then run `npm run benchmark:results` again so `RESULTS.md` lists only what remains. Git
   history keeps the old evidence.
8. **Check the consumers.** The docs site builds its benchmark pages, counts and the overview
   from the baselines, and fails the build if a case has no description (add one in
   `site/.vitepress/benchmarks/<trend>-cases.ts`). Then run:

   ```sh
   npm run docs:build
   npm run benchmark:typecheck
   npm run benchmark:test
   ```

   The benchmark tests read the `flat-growth` baseline through `baselines.json`, so they follow
   the pointer. If they fail, a declaration changed after the baseline was run: rerun it.

9. **Commit the retained folders, `baselines.json`, `RESULTS.md`, the changelog and any test or site changes**
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

Country calendars add pinned-provider parity, dynamic future-year activations, explicit-event
controls and model byte/RSS reporting through this same harness. See the
[country benchmark contract](cases/holidays/README.md); coverage-policy rejections are intentional
differences, not comparable timing work. Country snapshots are not preloaded into measured fits.

See the [Python-default logistic reconciliation](cases/growth/logistic/README.md),
[flat coverage gaps](cases/growth/flat/README.md),
[linear input-policy cases](cases/growth/linear/README.md),
and [measurement contracts](tools/MEASUREMENTS.md).

## Differential comparison

The benchmarks compare fixed, reviewed cases. The differential comparison generates new inputs
on every run instead, to find parity gaps those cases miss. It requires a built package
(`npm run build`) and Docker, like a benchmark run.

```sh
npm run differential                       # 200 cases from a fresh root seed
npm run differential -- --seed 60 --cases 500
npm run differential -- --case-seed 123456 --case-seed 789  # replay individual cases
npm run differential -- --no-build --seed 60
```

`tools/differential-generate.ts` turns each case seed into a `map` workload and dataset with
`fast-check`, so a seed always regenerates the same case. Cases vary growth, cadence (hourly,
daily, weekly), length (2 to 800 rows), gaps, duplicate and unsorted timestamps, outliers,
noiseless targets, target magnitudes, scaling, component modes, custom and conditional
seasonalities, events, regressors, logistic capacities and floors, and explicit or automatic
changepoints. About one case in six uses only library defaults. Both libraries run through the
benchmark images: Effect via `effectOptionsForCase` and Python via the benchmark adapter's
`configure_model`, `fit_model` and `forecast_projection`, so a case means the same thing here as
in a benchmark. Nothing is timed.

Each case is judged by `tools/differential.ts`. Forecast, trend, additive and component
differences are divided by the training target's span, because generated targets range from
0.01 to 10⁶ and offsets far from zero would hide real differences under a value-relative
tolerance. When forecasts differ by more than 10⁻³ of the span, the fitted noise scales decide.
Both are MAP estimates of the residual scale in target units, so equal noise means both
libraries explain the training data equally well and differ only where the data does not
determine the model: extrapolation from an ill-conditioned design, or how a fit splits into
trend and components.

| Verdict            | Meaning                                                                  | Parity failure |
| ------------------ | ------------------------------------------------------------------------ | -------------- |
| `match`            | Forecasts and components agree within tolerance                          | no             |
| `equivalent-fit`   | They differ, but both noise scales agree within 10⁻³ of the span         | no             |
| `python-worse-fit` | They differ, and Python's noise scale is larger                          | no             |
| `neither-fits`     | Both noise scales exceed the span, so neither fit resolves the data      | no             |
| `mismatch`         | They differ, and Effect's noise scale is larger: Effect fits worse       | yes            |
| `incomparable`     | Both fitted, but rows, component names or modes differ                   | yes            |
| `effect-failed`    | Python fitted; Effect failed with a fitting/prediction error or a defect | yes            |
| `effect-rejected`  | Python fitted; Effect rejected the input as invalid                      | no, listed     |
| `python-failed`    | Effect fitted; Python failed                                             | no, listed     |
| `both-failed`      | Neither fitted                                                           | no             |

Fit objectives are not compared. On near-noiseless data they are dominated by `log σ` and move by
hundreds while forecasts agree to 10⁻¹², and the two libraries' objective constants differ for
some configurations. One case in five is deliberately ill-posed (`ill-posed` trait): it keeps
seasonalities longer than the history and Fourier orders close to the row count, which exercises
the triage. The rest keep only seasonalities with two full periods of history, as Prophet's
automatic seasonalities do. With `minmax` scaling and multiplicative components, Prophet's
prediction applies multiplicative terms in data units rather than the scaled units it fitted in,
so in-sample predictions can differ from the fit on both sides; Effect reproduces this.

Runs are written to the gitignored `results/differential/<run-id>/`: `cases.json`,
`manifest.json` (root seed and every case seed), both implementations' JSON-lines outcomes,
`report.json`, `report.md`, and one file per parity failure under `mismatches/` with the complete
input and both outcomes. The weekly
[Differential workflow](../.github/workflows/differential.yml) runs 200 cases on a new root seed,
writes `report.md` to the job summary and uploads the run directory. Parity failures never fail
the job. When one exposes a real bug, fix it and promote the input to a deterministic fixture
with `npm run fixtures:generate`; generated cases are never committed on their own.

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
  -v "$PWD/benchmark/cases:/workspace/benchmark/cases:ro" \
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
