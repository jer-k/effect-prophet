import { randomInt } from "node:crypto";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { commandOutput, runCommand } from "./commands.ts";
import { resolveContainerPlatform } from "./container-platform.ts";
import {
  applyOracleChecks,
  buildDifferentialReport,
  failingVerdicts,
  oraclePerturbations,
  parseOutcomeLines,
  parsePerturbedOutcomeLines,
  renderDifferentialMarkdown,
  selectOracleChecks,
  type DifferentialCaseResult,
} from "./differential.ts";
import { caseSeeds, generateCase } from "./differential-generate.ts";
import { benchmarkBuilderName, ensureBenchmarkBuilder } from "./docker-builder.ts";
import { cleanupDockerStorage } from "./docker-cleanup.ts";

const benchmarkRoot = fileURLToPath(new URL("../", import.meta.url));

const composePath = resolve(benchmarkRoot, "tools/runtime/compose.yaml");

const defaultCaseCount = 200;

interface DifferentialArguments {
  readonly rootSeed: number | undefined;
  readonly caseCount: number;
  readonly caseSeeds: ReadonlyArray<number>;
  readonly build: boolean;
}

const parseSeed = (flag: string, value: string | undefined): number => {
  const seed = Number(value);

  if (value === undefined || !Number.isSafeInteger(seed) || seed < 0) {
    throw new Error(`${flag} requires a non-negative integer`);
  }

  return seed;
};

const parseArguments = (): DifferentialArguments => {
  let rootSeed: number | undefined;
  let caseCount = defaultCaseCount;
  const seeds: Array<number> = [];
  let build = true;

  for (let index = 2; index < process.argv.length; index += 1) {
    const argument = process.argv[index];
    const value = process.argv[index + 1];

    if (argument === "--no-build") {
      build = false;
      continue;
    }

    if (argument === "--seed") {
      rootSeed = parseSeed(argument, value);
      index += 1;
      continue;
    }

    if (argument === "--case-seed") {
      seeds.push(parseSeed(argument, value));
      index += 1;
      continue;
    }

    if (argument === "--cases") {
      caseCount = parseSeed(argument, value);
      index += 1;

      if (caseCount === 0) throw new Error("--cases requires at least one case");

      continue;
    }

    throw new Error(`Unknown differential argument: ${argument ?? "undefined"}`);
  }

  if (seeds.length > 0 && rootSeed !== undefined) {
    throw new Error("--case-seed replays individual cases; it cannot be combined with --seed");
  }

  return {
    // Without either flag, draw a fresh root seed; it is recorded so the run can be repeated.
    rootSeed: seeds.length > 0 ? undefined : (rootSeed ?? randomInt(0, 2 ** 31)),
    caseCount,
    caseSeeds: seeds,
    build,
  };
};

const timestampRunId = (): string =>
  new Date().toISOString().replaceAll(":", "").replaceAll(".", "-");

const main = async (): Promise<void> => {
  const arguments_ = parseArguments();

  const seeds =
    arguments_.rootSeed === undefined
      ? Array.from(new Set(arguments_.caseSeeds))
      : caseSeeds(arguments_.rootSeed, arguments_.caseCount);

  const cases = seeds.map(generateCase);
  const gitRevision = commandOutput("git", ["rev-parse", "HEAD"]);
  const gitDirty = commandOutput("git", ["status", "--porcelain"]) !== "";
  const runId = `${timestampRunId()}-${gitRevision.slice(0, 8)}`;
  const runDirectory = resolve(benchmarkRoot, "results/differential", runId);

  const platform = resolveContainerPlatform(process.arch, process.env.BENCHMARK_CONTAINER_PLATFORM);

  await mkdir(resolve(runDirectory, "mismatches"), { recursive: true });
  await writeFile(resolve(runDirectory, "cases.json"), `${JSON.stringify(cases)}\n`);

  await writeFile(
    resolve(runDirectory, "manifest.json"),
    `${JSON.stringify(
      {
        runId,
        createdAt: new Date().toISOString(),
        gitRevision,
        gitDirty,
        rootSeed: arguments_.rootSeed,
        caseSeeds: seeds,
        containerPlatform: platform.platform,
        emulated: platform.emulated,
      },
      null,
      2,
    )}\n`,
  );

  process.stdout.write(
    `Differential run ${runId}: ${cases.length} cases${arguments_.rootSeed === undefined ? "" : ` from root seed ${arguments_.rootSeed}`}\n`,
  );

  // Build on the GC-capped builder unless the caller picked one; cleanup inherits the same choice.
  if (process.env.BUILDX_BUILDER === undefined) {
    if (ensureBenchmarkBuilder()) process.env.BUILDX_BUILDER = benchmarkBuilderName;
    else process.stderr.write("Docker builder unavailable; building on the active builder\n");
  }

  const environment: NodeJS.ProcessEnv = {
    ...process.env,
    BENCHMARK_CONTAINER_PLATFORM: platform.platform,
    BENCHMARK_HOST_RUN_DIRECTORY: runDirectory,
  };

  const compose = ["compose", "-f", composePath];

  const runService = (service: string) =>
    runCommand("docker", [...compose, "run", "--rm", "--no-deps", service], environment);

  // Every container runs before cleanup; the perturbed oracle needs the first report.
  const judge = async () => {
    try {
      if (arguments_.build) {
        runCommand(
          "docker",
          [...compose, "build", "effect-prophet-benchmark", "python-prophet-benchmark"],
          environment,
        );
      }

      for (const service of ["effect-prophet-differential", "python-prophet-differential"]) {
        runService(service);
      }

      const effectOutcomes = parseOutcomeLines(
        await readFile(resolve(runDirectory, "effect-prophet.jsonl"), "utf8"),
      );

      const pythonOutcomes = parseOutcomeLines(
        await readFile(resolve(runDirectory, "python-prophet.jsonl"), "utf8"),
      );

      const report = buildDifferentialReport(
        runId,
        arguments_.rootSeed,
        cases,
        effectOutcomes,
        pythonOutcomes,
      );

      const checks = selectOracleChecks(report.results);

      if (checks.length === 0) {
        return { effectOutcomes, pythonOutcomes, perturbedOutcomes: [], report };
      }

      // Noise-scale disagreements rerun the unchanged CmdStan oracle on one-ulp input changes.
      await writeFile(
        resolve(runDirectory, "perturbation-requests.json"),
        `${JSON.stringify({ caseIds: checks.map((result) => result.caseId), perturbations: oraclePerturbations })}\n`,
      );

      runService("python-prophet-perturbation");

      const perturbedOutcomes = parsePerturbedOutcomeLines(
        await readFile(resolve(runDirectory, "python-perturbations.jsonl"), "utf8"),
      );

      return {
        effectOutcomes,
        pythonOutcomes,
        perturbedOutcomes,
        report: applyOracleChecks(report, cases, effectOutcomes, pythonOutcomes, perturbedOutcomes),
      };
    } finally {
      cleanupDockerStorage();
    }
  };

  const { effectOutcomes, pythonOutcomes, perturbedOutcomes, report } = await judge();

  const markdown = renderDifferentialMarkdown(report);
  const failing = report.results.filter((result) => failingVerdicts.has(result.verdict));

  const sensitive = report.results.filter((result) => result.verdict === "oracle-sensitive");

  await mkdir(resolve(runDirectory, "oracle-sensitive"), { recursive: true });

  // Each failure or oracle-sensitive case keeps its complete input, both outcomes and any
  // perturbed oracle outcomes, so it can be promoted to a fixture or rechecked.
  const writeCaseArtifact = async (directory: string, result: DifferentialCaseResult) =>
    writeFile(
      resolve(runDirectory, directory, `${result.caseId}.json`),
      `${JSON.stringify(
        {
          result,
          case: cases.find((item) => item.id === result.caseId),
          effect: effectOutcomes.find((outcome) => outcome.caseId === result.caseId),
          python: pythonOutcomes.find((outcome) => outcome.caseId === result.caseId),
          perturbedPython: perturbedOutcomes.filter((outcome) => outcome.caseId === result.caseId),
        },
        null,
        2,
      )}\n`,
    );

  for (const result of failing) {
    await writeCaseArtifact("mismatches", result);
  }

  for (const result of sensitive) {
    await writeCaseArtifact("oracle-sensitive", result);
  }

  await writeFile(resolve(runDirectory, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(resolve(runDirectory, "report.md"), markdown);

  const summaryPath = process.env.GITHUB_STEP_SUMMARY;

  if (summaryPath !== undefined && summaryPath !== "") {
    await appendFile(summaryPath, markdown);
  }

  process.stdout.write(
    `${failing.length} parity failures and ${sensitive.length} oracle-sensitive cases in ${cases.length} cases. Report: ${resolve(runDirectory, "report.md")}\n`,
  );
};

// Parity failures are reported, never fatal; only infrastructure failures exit non-zero.
try {
  await main();
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`,
  );
  process.exitCode = 1;
}
