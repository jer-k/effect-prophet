import { Effect } from "effect";

import { loadRunEvidence } from "./stored-results.ts";

/** Compare recorded validity and eligible absolute timings; refuse changed contracts or environments. */
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

  const gateFiles = [
    "benchmark/tools/case.ts",
    "benchmark/tools/report.ts",
    "benchmark/tools/report-cli.ts",
    "benchmark/evidence/comparisons.json",
  ] as const;

  const gateHash = (manifest: typeof before.manifest, name: string) =>
    manifest.inputHashes.find((entry) => entry.name.replace(/^\//u, "") === name)?.value;

  const hasGateHashes = gateFiles.every(
    (name) =>
      gateHash(before.manifest, name) !== undefined && gateHash(after.manifest, name) !== undefined,
  );

  const gateImplementationMatches = hasGateHashes
    ? gateFiles.every((name) => gateHash(before.manifest, name) === gateHash(after.manifest, name))
    : gateFiles
        .slice(0, 3)
        .every(
          (name) =>
            gateHash(before.manifest, name) === undefined &&
            gateHash(after.manifest, name) === undefined,
        ) &&
      gateHash(before.manifest, gateFiles[3]) === gateHash(after.manifest, gateFiles[3]) &&
      JSON.stringify(before.manifest.containerImages) ===
        JSON.stringify(after.manifest.containerImages) &&
      before.manifest.containerImages.length > 0;

  const lines = [
    "# Benchmark run comparison",
    "",
    `Before: \`${before.manifest.runId}\`; after: \`${after.manifest.runId}\`.`,
    `Environment compatibility: **${environmentsMatch ? "matched" : "different; timings withheld"}**.`,
    `Gate implementation compatibility: **${gateImplementationMatches ? "matched" : "changed or unavailable; timings withheld"}**.`,
    "Legacy runs without gate source hashes require identical recorded images; newer runs compare gate source hashes directly.",
    "Recorded gate outcomes are shown even when timing comparison is unavailable. No cross-language speed ratios or rankings are computed.",
    "Dirty-tree runs remain local diagnostic evidence; compatible metadata does not establish a clean release baseline.",
    "",
    "| Case | Before | After | Timing comparison |",
    "| --- | --- | --- | --- |",
  ];

  const contract = (item: (typeof before.cases)[number]) =>
    JSON.stringify({
      ...item,
      dataset: item.datasetIdentity?.sha256 ?? item.dataset,
    });

  const ids = Array.from(
    new Set([...before.manifest.selectedCases, ...after.manifest.selectedCases]),
  ).sort();

  const eligible = new Set<string>();

  for (const id of ids) {
    const oldCase = before.cases.find((item) => item.id === id);
    const newCase = after.cases.find((item) => item.id === id);

    const oldStatus =
      before.report.correctness.find((item) => item.caseId === id)?.status ?? "not run";

    const newStatus =
      after.report.correctness.find((item) => item.caseId === id)?.status ?? "not run";

    const sameContract =
      oldCase !== undefined && newCase !== undefined && contract(oldCase) === contract(newCase);

    const canCompare =
      sameContract &&
      environmentsMatch &&
      gateImplementationMatches &&
      oldStatus === "passed" &&
      newStatus === "passed";

    if (canCompare) eligible.add(id);
    lines.push(
      `| \`${id}\` | ${oldStatus} | ${newStatus} | ${canCompare ? "eligible" : !sameContract ? "changed/missing case contract or input" : !environmentsMatch ? "environment differs" : !gateImplementationMatches ? "gate implementation changed or unavailable" : "gate did not pass"} |`,
    );
  }

  lines.push(
    "",
    "## Eligible absolute medians",
    "",
    "| Case | Implementation | Phase | Before (ms) | After (ms) |",
    "| --- | --- | --- | ---: | ---: |",
  );

  for (const measurement of after.report.timings.filter((item) => eligible.has(item.caseId))) {
    const old = before.report.timings.find(
      (item) =>
        item.caseId === measurement.caseId &&
        item.phase === measurement.phase &&
        item.implementation === measurement.implementation,
    );

    if (old !== undefined) {
      lines.push(
        `| \`${measurement.caseId}\` | ${measurement.implementation} | ${measurement.phase} | ${(old.medianNanoseconds / 1e6).toFixed(3)} | ${(measurement.medianNanoseconds / 1e6).toFixed(3)} |`,
      );
    }
  }

  lines.push("");

  return lines.join("\n");
});
