import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { cpus, platform, release } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Effect } from "effect";

import { parseBenchmarkCases, parseBenchmarkDataset } from "./case.ts";
import { growthScalingAndMixedMapCases } from "./cases/growth-scaling-and-mixed-map.ts";
import { uncertaintyCases } from "./cases/uncertainty.ts";
import { resolveContainerPlatform } from "./container-platform.ts";
import { generateBenchmarkData } from "./generate-data.ts";
import type { RunManifest } from "./result.ts";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

const benchmarkRoot = fileURLToPath(new URL("./", import.meta.url));

const composePath = resolve(benchmarkRoot, "compose.yaml");

const casesPath = resolve(benchmarkRoot, "cases/public-api.json");

const evidencePath = resolve(benchmarkRoot, "evidence/comparisons.json");

const generatedDataRoot = resolve(benchmarkRoot, "data/generated");

const commandOutput = (command: string, args: ReadonlyArray<string>): string => {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `${command} failed`);
  }

  return result.stdout.trim();
};

const runCommand = (
  command: string,
  args: ReadonlyArray<string>,
  environment: NodeJS.ProcessEnv,
): void => {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    env: environment,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} failed with status ${result.status ?? "unknown"}`,
    );
  }
};

const sha256File = async (path: string): Promise<string> => {
  const contents = await readFile(path);

  return createHash("sha256").update(contents).digest("hex");
};

interface RunArguments {
  readonly caseIds: ReadonlyArray<string>;
  readonly build: boolean;
}

const parseArguments = (): RunArguments => {
  const caseIds: Array<string> = [];
  let build = true;

  for (let index = 2; index < process.argv.length; index += 1) {
    const argument = process.argv[index];

    if (argument === "--no-build") {
      build = false;
      continue;
    }

    if (argument === "--case") {
      const caseId = process.argv[index + 1];

      if (caseId === undefined) {
        throw new Error("--case requires a benchmark case id");
      }

      caseIds.push(caseId);
      index += 1;
      continue;
    }

    throw new Error(`Unknown benchmark argument: ${argument ?? "undefined"}`);
  }

  return { caseIds, build };
};

const timestampRunId = (): string =>
  new Date().toISOString().replaceAll(":", "").replaceAll(".", "-");

const main = async (): Promise<void> => {
  const arguments_ = parseArguments();

  await generateBenchmarkData(new URL("data/generated/", import.meta.url));

  const casesInput: unknown = JSON.parse(await readFile(casesPath, "utf8"));
  const originalCases = await Effect.runPromise(parseBenchmarkCases(casesInput));

  const declarations = await Effect.runPromise(
    parseBenchmarkCases([...originalCases, ...growthScalingAndMixedMapCases, ...uncertaintyCases]),
  );

  const cases = await Promise.all(
    declarations.map(async (benchmarkCase) => {
      const path = resolve(benchmarkRoot, "data", benchmarkCase.dataset);
      const bytes = await readFile(path);

      const dataset = await Effect.runPromise(
        parseBenchmarkDataset(JSON.parse(bytes.toString("utf8"))),
      );

      const selection = benchmarkCase.rowSelection;

      const futureRows =
        selection === undefined
          ? dataset.predictionRows
          : dataset.predictionRows
              .filter((_, index) => index % selection.stride === 0)
              .slice(0, selection.future);

      const lastTraining = dataset.observations.at(-1);
      const lastFuture = futureRows.at(-1);

      if (
        lastTraining === undefined ||
        (selection !== undefined && futureRows.length !== selection.future)
      ) {
        throw new Error(`Case ${benchmarkCase.id} cannot select its declared future rows`);
      }

      return {
        ...benchmarkCase,
        datasetIdentity: {
          recipe: dataset.recipe,
          sha256: createHash("sha256").update(bytes).digest("hex"),
          trainingRows: dataset.observations.length,
          predictionRows:
            selection === undefined
              ? dataset.predictionRows.length
              : selection.historical + selection.future,
          futureRows: futureRows.length,
          horizonDays:
            lastFuture === undefined
              ? 0
              : Math.max(
                  0,
                  (Date.parse(lastFuture.timestamp) - Date.parse(lastTraining.timestamp)) /
                    86_400_000,
                ),
        },
      };
    }),
  );

  const knownIds = new Set(cases.map((benchmarkCase) => benchmarkCase.id));

  const selectedCases =
    arguments_.caseIds.length === 0
      ? Array.from(knownIds)
      : Array.from(new Set(arguments_.caseIds));

  for (const caseId of selectedCases) {
    if (!knownIds.has(caseId)) {
      throw new Error(`Unknown benchmark case: ${caseId}`);
    }
  }

  const gitRevision = commandOutput("git", ["rev-parse", "HEAD"]);
  const gitDirty = commandOutput("git", ["status", "--porcelain"]) !== "";
  const runId = `${timestampRunId()}-${gitRevision.slice(0, 8)}`;
  const runDirectory = resolve(benchmarkRoot, "results/runs", runId);

  await mkdir(resolve(runDirectory, "inputs"), { recursive: true });
  await writeFile(resolve(runDirectory, "cases.json"), `${JSON.stringify(cases, null, 2)}\n`);

  for (const dataset of new Set(
    cases
      .filter((benchmarkCase) => selectedCases.includes(benchmarkCase.id))
      .map((benchmarkCase) => benchmarkCase.dataset),
  )) {
    const source = resolve(benchmarkRoot, "data", dataset);
    const snapshot = resolve(runDirectory, "inputs", dataset);

    await mkdir(resolve(snapshot, ".."), { recursive: true });
    await writeFile(snapshot, await readFile(source));
  }

  const inputPaths = Array.from(
    new Set([
      casesPath,
      resolve(benchmarkRoot, "cases/growth-scaling-and-mixed-map.ts"),
      resolve(benchmarkRoot, "cases/uncertainty.ts"),
      resolve(runDirectory, "cases.json"),
      evidencePath,
      resolve(benchmarkRoot, "python/uv.lock"),
      resolve(generatedDataRoot, "manifest.json"),
      resolve(projectRoot, "package-lock.json"),
      ...cases
        .filter((benchmarkCase) => selectedCases.includes(benchmarkCase.id))
        .map((benchmarkCase) =>
          resolve(generatedDataRoot, benchmarkCase.dataset.replace("generated/", "")),
        ),
    ]),
  );

  const inputHashes = await Promise.all(
    inputPaths.map(async (path) => ({
      name: path.slice(projectRoot.length),
      value: await sha256File(path),
    })),
  );

  const hostArchitecture = process.arch;

  const platformResolution = resolveContainerPlatform(
    hostArchitecture,
    process.env.BENCHMARK_CONTAINER_PLATFORM,
  );

  const containerPlatform = platformResolution.platform;

  const commands = [
    `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=${containerPlatform} docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`,
    `BENCHMARK_STAGE=correctness BENCHMARK_CONTAINER_PLATFORM=${containerPlatform} docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`,
    `BENCHMARK_REPORT_MODE=eligibility BENCHMARK_CONTAINER_PLATFORM=${containerPlatform} docker compose -f benchmark/compose.yaml run --rm benchmark-report`,
    `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=${containerPlatform} docker compose -f benchmark/compose.yaml run --rm effect-prophet-benchmark`,
    `BENCHMARK_STAGE=timing BENCHMARK_CONTAINER_PLATFORM=${containerPlatform} docker compose -f benchmark/compose.yaml run --rm python-prophet-benchmark`,
    `BENCHMARK_REPORT_MODE=final BENCHMARK_CONTAINER_PLATFORM=${containerPlatform} docker compose -f benchmark/compose.yaml run --rm benchmark-report`,
  ];

  const environment: NodeJS.ProcessEnv = {
    ...process.env,
    BENCHMARK_CASE_IDS: selectedCases.join(","),
    BENCHMARK_CASES_PATH: "/results/cases.json",
    BENCHMARK_CONTAINER_PLATFORM: containerPlatform,
    BENCHMARK_HOST_RUN_DIRECTORY: runDirectory,
  };

  const compose = ["compose", "-f", composePath];

  if (arguments_.build) {
    runCommand("docker", [...compose, "build"], environment);
  }

  const containerImages = [
    {
      name: "effect-prophet/benchmark-effect:local",
      value: commandOutput("docker", [
        "image",
        "inspect",
        "effect-prophet/benchmark-effect:local",
        "--format",
        "{{.Id}}",
      ]),
    },
    {
      name: "effect-prophet/benchmark-python:1.4.0",
      value: commandOutput("docker", [
        "image",
        "inspect",
        "effect-prophet/benchmark-python:1.4.0",
        "--format",
        "{{.Id}}",
      ]),
    },
  ];

  const manifest: RunManifest = {
    schemaVersion: 1,
    runId,
    createdAt: new Date().toISOString(),
    gitRevision,
    gitDirty,
    hostPlatform: platform(),
    hostRelease: release(),
    hostArchitecture,
    hostProcessor: cpus()[0]?.model ?? "unavailable",
    containerPlatform,
    emulated: platformResolution.emulated,
    selectedCases,
    commands,
    inputHashes,
    containerImages,
  };

  await writeFile(resolve(runDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

  const runService = (service: string, overrides: NodeJS.ProcessEnv): void =>
    runCommand("docker", [...compose, "run", "--rm", "--no-deps", service], {
      ...environment,
      ...overrides,
    });

  runService("effect-prophet-benchmark", { BENCHMARK_STAGE: "correctness" });
  runService("python-prophet-benchmark", { BENCHMARK_STAGE: "correctness" });
  runService("benchmark-report", { BENCHMARK_REPORT_MODE: "eligibility" });
  runService("effect-prophet-benchmark", { BENCHMARK_STAGE: "timing" });
  runService("python-prophet-benchmark", { BENCHMARK_STAGE: "timing" });
  runService("benchmark-report", { BENCHMARK_REPORT_MODE: "final" });

  process.stdout.write(`Benchmark report: ${resolve(runDirectory, "report.md")}\n`);
};

try {
  await main();
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`,
  );
  process.exitCode = 1;
}
