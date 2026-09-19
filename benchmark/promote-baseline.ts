import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Schema } from "effect";

const ReviewedReportSchema = Schema.Struct({
  schemaVersion: Schema.Literal(1),
  run: Schema.Struct({ runId: Schema.String }),
});

const benchmarkRoot = fileURLToPath(new URL("./", import.meta.url));

const runId = process.argv[2];

const baselineId = process.argv[3] ?? runId;

if (runId === undefined || baselineId === undefined) {
  throw new Error("Usage: npm run benchmark:baseline -- <run-id> [baseline-id]");
}

const safeId = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/u;

if (!safeId.test(runId) || !safeId.test(baselineId)) {
  throw new Error(
    "Run and baseline ids may contain only letters, digits, dots, underscores, and dashes",
  );
}

const source = resolve(benchmarkRoot, "results/runs", runId);

const destinationRoot = resolve(benchmarkRoot, "results/baselines");

const destination = resolve(destinationRoot, baselineId);

const reportInput: unknown = JSON.parse(await readFile(resolve(source, "report.json"), "utf8"));

const report = Schema.decodeUnknownSync(ReviewedReportSchema)(reportInput);

if (report.run.runId !== runId) {
  throw new Error(`Report run id ${report.run.runId} does not match selected run ${runId}`);
}

await mkdir(destinationRoot, { recursive: true });

await cp(source, destination, { errorOnExist: true, recursive: true });

const entries = await readdir(destinationRoot, { withFileTypes: true });

const baselineIds = entries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const lines = [
  "# Reviewed benchmark runs",
  "",
  "These snapshots contain raw samples, correctness projections, generated reports, and complete run provenance. They are descriptive comparisons, not performance rankings.",
  "",
  ...baselineIds.map((id) => `- [${id}](${id}/report.md)`),
  "",
];

await writeFile(resolve(destinationRoot, "README.md"), lines.join("\n"));

process.stdout.write(`Promoted benchmark run ${runId} to results/baselines/${baselineId}/\n`);
