import { Effect } from "effect";

import { summarizeMeasurements } from "./report.ts";
import { loadRunEvidence } from "./stored-results.ts";

type RunEvidence = Effect.Success<ReturnType<typeof loadRunEvidence>>;

const caseList = (ids: ReadonlyArray<string>) =>
  ids.length === 0 ? "none" : ids.map((id) => `\`${id}\``).join(", ");

/**
 * Summarize what changed between two runs: added and removed cases, changed outcomes and case
 * contracts, and investigation flags that appeared, disappeared or changed value.
 */
const changeSummary = (
  before: RunEvidence,
  after: RunEvidence,
  ids: ReadonlyArray<string>,
  contract: (item: RunEvidence["cases"][number]) => string,
): ReadonlyArray<string> => {
  const status = (run: RunEvidence, id: string) =>
    run.report.correctness.find((item) => item.caseId === id)?.status;

  const added = ids.filter((id) => status(before, id) === undefined);
  const removed = ids.filter((id) => status(after, id) === undefined);

  const kept = ids.filter(
    (id) => status(before, id) !== undefined && status(after, id) !== undefined,
  );

  const outcomes = kept.filter((id) => status(before, id) !== status(after, id));

  const contracts = kept.filter((id) => {
    const oldCase = before.cases.find((item) => item.id === id);
    const newCase = after.cases.find((item) => item.id === id);

    return (
      oldCase !== undefined && newCase !== undefined && contract(oldCase) !== contract(newCase)
    );
  });

  const flags = (run: RunEvidence) =>
    new Map(
      run.report.correctness.flatMap((summary) =>
        (summary.investigations ?? []).map(
          (flag) =>
            [
              `\`${summary.caseId}\` run ${flag.run} ${flag.name}`,
              `${flag.effectValue.toExponential(6)} vs ${flag.pythonValue.toExponential(6)}`,
            ] as const,
        ),
      ),
    );

  const oldFlags = flags(before);
  const newFlags = flags(after);
  const flagKeys = [...new Set([...oldFlags.keys(), ...newFlags.keys()])].sort();

  const flagChanges = flagKeys.flatMap((key) => {
    const oldValue = oldFlags.get(key);
    const newValue = newFlags.get(key);

    if (oldValue === newValue) return [];

    if (oldValue === undefined) return [`- New flag: ${key} (Effect vs Python ${newValue})`];

    if (newValue === undefined) return [`- Cleared flag: ${key} (was ${oldValue})`];

    return [`- Changed flag: ${key}: ${oldValue} → ${newValue}`];
  });

  const unchangedFlags = flagKeys.length - flagChanges.length;

  return [
    "",
    "## What changed",
    "",
    `- Cases: ${before.report.correctness.length} before, ${after.report.correctness.length} after.`,
    `- Added: ${caseList(added)}.`,
    `- Removed: ${caseList(removed)}.`,
    `- Outcome changes: ${outcomes.length === 0 ? "none" : outcomes.map((id) => `\`${id}\` ${status(before, id)} → ${status(after, id)}`).join(", ")}.`,
    `- Case contract or input changes: ${caseList(contracts)}.`,
    `- Investigation flags: ${flagChanges.length === 0 ? "no changes" : `${flagChanges.length} changed`}, ${unchangedFlags} unchanged.`,
    ...flagChanges,
  ];
};

// Files that decide whether a case passes. A change here alters how outcomes are judged, not how
// long work takes, so it is reported but never hides timings.
const gateFiles = [
  "benchmark/tools/case.ts",
  "benchmark/tools/report.ts",
  "benchmark/tools/report-cli.ts",
  "benchmark/evidence/comparisons.json",
  "benchmark/tools/country-holidays.ts",
  "benchmark/tools/result.ts",
] as const;

// Files that run and clock each phase. A change here can shift timings, so the report names it.
const harnessFiles = [
  "benchmark/tools/adapters/effect-prophet.ts",
  "benchmark/tools/adapters/python-prophet.py",
  "benchmark/tools/adapters/evaluation.py",
  "benchmark/tools/effect-case.ts",
  "benchmark/tools/evaluation.ts",
] as const;

/** A phase is flagged only when its median moves by at least this fraction. */
const flagRatio = 0.05;

const milliseconds = (nanoseconds: number) => (nanoseconds / 1e6).toFixed(3);

/** Compare recorded outcomes and timings, flagging phases that consistently got slower or faster. */
export const compareRuns = Effect.fn("benchmark.results.compare")(function* (
  beforeDirectory: string,
  afterDirectory: string,
) {
  const before = yield* loadRunEvidence(beforeDirectory);
  const after = yield* loadRunEvidence(afterDirectory);

  const hardwareMatches =
    before.manifest.containerPlatform === after.manifest.containerPlatform &&
    before.manifest.emulated === after.manifest.emulated &&
    before.manifest.hostProcessor === after.manifest.hostProcessor;

  const runtimeIdentity = (environment: typeof before.effect.environment) =>
    JSON.stringify({
      runtime: environment.runtime,
      version: environment.runtimeVersion,
      versions: environment.versions,
      threads: environment.numericalThreads,
      resources: environment.resources,
    });

  const environmentsMatch =
    hardwareMatches &&
    runtimeIdentity(before.effect.environment) === runtimeIdentity(after.effect.environment) &&
    runtimeIdentity(before.python.environment) === runtimeIdentity(after.python.environment);

  const fileHash = (manifest: typeof before.manifest, name: string) =>
    manifest.inputHashes.find((entry) => entry.name.replace(/^\//u, "") === name)?.value;

  const changedFiles = (names: ReadonlyArray<string>) =>
    names.filter((name) => fileHash(before.manifest, name) !== fileHash(after.manifest, name));

  const changedGates = changedFiles(gateFiles);
  const changedHarness = changedFiles(harnessFiles);

  const lines = [
    "# Benchmark run comparison",
    "",
    `Before: \`${before.manifest.runId}\`; after: \`${after.manifest.runId}\`.`,
    `Environment: **${environmentsMatch ? "matched" : "different; timings withheld"}**.`,
    `Correctness gates: **${changedGates.length === 0 ? "unchanged" : `changed (${caseList(changedGates)}); outcomes were judged under different rules`}**.`,
    `Timing harness: **${changedHarness.length === 0 ? "unchanged" : `changed (${caseList(changedHarness)}); this alone can shift timings`}**.`,
    "Timings are compared for each case that passed in both runs with an unchanged contract and input, from medians of all raw samples. No cross-language speed ratios or rankings are computed.",
    "Dirty-tree runs remain local diagnostic evidence; compatible metadata does not establish a clean release baseline.",
  ];

  const contract = (item: (typeof before.cases)[number]) =>
    JSON.stringify({
      ...item,
      dataset: item.datasetIdentity?.sha256 ?? item.dataset,
    });

  const ids = Array.from(
    new Set([...before.manifest.selectedCases, ...after.manifest.selectedCases]),
  ).sort();

  lines.push(...changeSummary(before, after, ids, contract));

  const comparable = new Set<string>();
  const caseRows: Array<string> = [];

  for (const id of ids) {
    const oldCase = before.cases.find((item) => item.id === id);
    const newCase = after.cases.find((item) => item.id === id);

    const oldStatus =
      before.report.correctness.find((item) => item.caseId === id)?.status ?? "not run";

    const newStatus =
      after.report.correctness.find((item) => item.caseId === id)?.status ?? "not run";

    const sameContract =
      oldCase !== undefined && newCase !== undefined && contract(oldCase) === contract(newCase);

    const timing = !sameContract
      ? "changed/missing case contract or input"
      : !environmentsMatch
        ? "environment differs"
        : oldStatus !== "passed" || newStatus !== "passed"
          ? "did not pass in both runs"
          : "compared";

    if (timing === "compared") comparable.add(id);

    caseRows.push(`| \`${id}\` | ${oldStatus} | ${newStatus} | ${timing} |`);
  }

  const summaries = (run: RunEvidence) =>
    summarizeMeasurements([...run.effect.measurements, ...run.python.measurements]);

  const oldSummaries = summaries(before);

  const timingRows = summaries(after).flatMap((measurement) => {
    if (!comparable.has(measurement.caseId)) return [];

    const old = oldSummaries.find(
      (item) =>
        item.caseId === measurement.caseId &&
        item.phase === measurement.phase &&
        item.implementation === measurement.implementation,
    );

    return old === undefined
      ? []
      : [{ old, measurement, ratio: measurement.medianNanoseconds / old.medianNanoseconds }];
  });

  // Every new sample slower than every old one (or the reverse), and the median moved by at least
  // flagRatio. With six samples per side this happens by chance in about 0.2% of unchanged phases.
  const slower = timingRows.filter(
    (row) =>
      row.measurement.minimumNanoseconds > row.old.maximumNanoseconds && row.ratio >= 1 + flagRatio,
  );

  const faster = timingRows.filter(
    (row) =>
      row.measurement.maximumNanoseconds < row.old.minimumNanoseconds && row.ratio <= 1 - flagRatio,
  );

  const timingRow = (row: (typeof timingRows)[number]) =>
    `| \`${row.measurement.caseId}\` | ${row.measurement.implementation} | ${row.measurement.phase} | ${milliseconds(row.old.medianNanoseconds)} | ${milliseconds(row.measurement.medianNanoseconds)} | ${row.ratio.toFixed(2)}× |`;

  const timingTable = (rows: ReadonlyArray<(typeof timingRows)[number]>) =>
    rows.length === 0
      ? ["None."]
      : [
          "| Case | Implementation | Phase | Before (ms) | After (ms) | After ÷ before |",
          "| --- | --- | --- | ---: | ---: | ---: |",
          ...rows.map(timingRow),
        ];

  const pythonSlower = slower.filter((row) => row.measurement.implementation === "python-prophet");

  lines.push(
    "",
    "## Possible regressions",
    "",
    `Phases where every new sample is slower than every old sample and the median is at least ${flagRatio * 100}% slower. Python Prophet did not change, so Python rows suggest machine noise rather than a code change${pythonSlower.length === 0 ? "; there are none" : ""}.`,
    "",
    ...timingTable(slower),
    "",
    "## Possible improvements",
    "",
    ...timingTable(faster),
    "",
    "## Cases",
    "",
    "| Case | Before | After | Timing comparison |",
    "| --- | --- | --- | --- |",
    ...caseRows,
    "",
    "## Compared medians",
    "",
    ...timingTable(timingRows),
    "",
  );

  return lines.join("\n");
});
