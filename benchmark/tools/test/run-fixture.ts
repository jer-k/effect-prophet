import { execFileSync } from "node:child_process";
import { cp, mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Effect } from "effect";

import type { BenchmarkCase } from "../case.ts";
import { buildBenchmarkReport, renderBenchmarkMarkdown } from "../report.ts";
import { loadRunEvidence } from "../stored-results.ts";

/** Create a real filesystem/git fixture from retained adapter evidence, without module mocks. */
export const makeRunFixture = async () => {
  const root = await mkdtemp(resolve(tmpdir(), "prophet-benchmark-layout-"));
  const benchmarkRoot = resolve(root, "benchmark");

  const retained = fileURLToPath(
    new URL("../../results/retained/flat-growth/2026-10-05T010915-213Z-730ead62/", import.meta.url),
  );

  const evidence = await Effect.runPromise(loadRunEvidence(retained));
  const item = evidence.cases.find((candidate) => candidate.id === "flat-level-minmax");

  if (item === undefined) throw new Error("Missing retained case fixture");

  const benchmarkCase = { ...item, dataset: item.dataset.replace("generated/", "v1/") };
  const inputRoot = fileURLToPath(new URL("../../inputs/", import.meta.url));
  await mkdir(resolve(benchmarkRoot, "inputs/v1"), { recursive: true });
  await cp(
    resolve(inputRoot, benchmarkCase.dataset),
    resolve(benchmarkRoot, "inputs", benchmarkCase.dataset),
  );
  execFileSync("git", ["init", "--quiet"], { cwd: root });
  execFileSync("git", ["add", "benchmark/inputs"], { cwd: root });
  execFileSync(
    "git",
    [
      "-c",
      "user.name=Benchmark Test",
      "-c",
      "user.email=benchmark@example.invalid",
      "-c",
      "commit.gpgsign=false",
      "-c",
      "core.hooksPath=/dev/null",
      "commit",
      "--quiet",
      "-m",
      "Test input",
    ],
    { cwd: root },
  );

  const writeRun = async (
    runId: string,
    options: {
      readonly failed?: boolean;
      readonly case?: BenchmarkCase;
      readonly processor?: string;
      readonly gateHash?: string;
    } = {},
  ) => {
    const selectedCase = options.case ?? benchmarkCase;
    const directory = resolve(benchmarkRoot, "results/runs", runId);

    const manifest = {
      ...evidence.manifest,
      runId,
      selectedCases: [selectedCase.id],
      hostProcessor: options.processor ?? evidence.manifest.hostProcessor,
      inputHashes:
        options.gateHash === undefined
          ? evidence.manifest.inputHashes
          : [
              "benchmark/tools/case.ts",
              "benchmark/tools/report.ts",
              "benchmark/tools/report-cli.ts",
              "benchmark/evidence/comparisons.json",
            ].map((name) => ({ name, value: options.gateHash ?? "" })),
    };

    const effect = {
      ...evidence.effect,
      correctness: evidence.effect.correctness.filter((entry) => entry.caseId === selectedCase.id),
      measurements: evidence.effect.measurements.filter(
        (entry) => entry.caseId === selectedCase.id,
      ),
    };

    const python = {
      ...evidence.python,
      correctness: evidence.python.correctness
        .filter((entry) => entry.caseId === selectedCase.id)
        .map((entry) =>
          options.failed
            ? {
                ...entry,
                forecasts: entry.forecasts.map((row) => ({ ...row, value: row.value + 100 })),
              }
            : entry,
        ),
      measurements: evidence.python.measurements.filter(
        (entry) => entry.caseId === selectedCase.id,
      ),
    };

    const report = buildBenchmarkReport(
      manifest,
      [selectedCase],
      effect,
      python,
      new Set([selectedCase.workload.comparison.evidenceId]),
    );

    const files = {
      "manifest.json": manifest,
      "cases.json": [selectedCase],
      "effect-prophet.json": effect,
      "python-prophet.json": python,
      "report.json": report,
      "eligible-cases.json": {
        schemaVersion: 1,
        caseIds: report.correctness
          .filter((entry) => entry.status === "passed")
          .map((entry) => entry.caseId),
      },
    };

    await mkdir(directory, { recursive: true });
    await Promise.all(
      Object.entries(files).map(([name, value]) =>
        writeFile(resolve(directory, name), `${JSON.stringify(value, null, 2)}\n`),
      ),
    );
    await writeFile(resolve(directory, "report.md"), renderBenchmarkMarkdown(report));

    return directory;
  };

  return { root, benchmarkRoot, benchmarkCase, writeRun };
};
