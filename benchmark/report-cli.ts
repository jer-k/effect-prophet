import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { Effect, Schema } from "effect";

import { parseBenchmarkCases } from "./case.ts";
import { buildBenchmarkReport, renderBenchmarkMarkdown } from "./report.ts";
import { parseImplementationResult, parseRunManifest } from "./result.ts";

const EvidenceFileSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  evidence: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      classification: Schema.Literals([
        "equivalent-equation",
        "equivalent-objective",
        "different-public-work",
      ]),
      statement: Schema.String,
      checks: Schema.Array(Schema.String),
    }),
  ),
});

const runDirectory = process.env.BENCHMARK_RUN_DIRECTORY;

if (runDirectory === undefined) {
  throw new Error("BENCHMARK_RUN_DIRECTORY is required");
}

const casesPath = process.env.BENCHMARK_CASES_PATH ?? "/workspace/benchmark/cases/public-api.json";

const evidencePath =
  process.env.BENCHMARK_EVIDENCE_PATH ?? "/workspace/benchmark/evidence/comparisons.json";

const manifestInput: Parameters<typeof parseRunManifest>[0] = JSON.parse(
  await readFile(resolve(runDirectory, "manifest.json"), "utf8"),
);

const manifest = await Effect.runPromise(parseRunManifest(manifestInput));

const casesInput: Parameters<typeof parseBenchmarkCases>[0] = JSON.parse(
  await readFile(casesPath, "utf8"),
);

const allCases = await Effect.runPromise(parseBenchmarkCases(casesInput));

const selectedCases = allCases.filter((benchmarkCase) =>
  manifest.selectedCases.includes(benchmarkCase.id),
);

const effectInput: Parameters<typeof parseImplementationResult>[0] = JSON.parse(
  await readFile(resolve(runDirectory, "effect-prophet.json"), "utf8"),
);

const effectResult = await Effect.runPromise(parseImplementationResult(effectInput));

const pythonInput: Parameters<typeof parseImplementationResult>[0] = JSON.parse(
  await readFile(resolve(runDirectory, "python-prophet.json"), "utf8"),
);

const pythonResult = await Effect.runPromise(parseImplementationResult(pythonInput));

const evidenceInput: unknown = JSON.parse(await readFile(evidencePath, "utf8"));

const evidence = Schema.decodeUnknownSync(EvidenceFileSchema)(evidenceInput);

const evidenceIds = new Set(evidence.evidence.map((entry) => entry.id));

const report = buildBenchmarkReport(
  manifest,
  selectedCases,
  effectResult,
  pythonResult,
  evidenceIds,
);

const records: Array<unknown> = [];

for (const result of [effectResult, pythonResult]) {
  for (const measurement of result.measurements) {
    records.push({ record: "measurement", ...measurement });
  }

  for (const correctness of result.correctness) {
    records.push({ record: "correctness", implementation: result.implementation, ...correctness });
  }

  for (const failure of result.failures) {
    records.push({ record: "failure", ...failure });
  }
}

if (process.env.BENCHMARK_REPORT_MODE === "eligibility") {
  const caseIds = report.correctness
    .filter((summary) => summary.status === "passed")
    .map((summary) => summary.caseId);

  await writeFile(
    resolve(runDirectory, "eligible-cases.json"),
    `${JSON.stringify({ schemaVersion: 1, caseIds }, null, 2)}\n`,
  );
} else {
  await Promise.all([
    writeFile(resolve(runDirectory, "report.json"), `${JSON.stringify(report, null, 2)}\n`),
    writeFile(resolve(runDirectory, "report.md"), renderBenchmarkMarkdown(report)),
    writeFile(
      resolve(runDirectory, "records.jsonl"),
      `${records.map((record) => JSON.stringify(record)).join("\n")}\n`,
    ),
  ]);
}
