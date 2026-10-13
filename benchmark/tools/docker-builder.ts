import { spawnSync } from "node:child_process";

export const benchmarkBuilderName = "effect-prophet-benchmark";

const createArguments: ReadonlyArray<string> = [
  "buildx",
  "create",
  "--name",
  benchmarkBuilderName,
  "--driver",
  "docker-container",
  "--driver-opt",
  "default-load=true",
  "--buildkitd-config",
  "benchmark/tools/runtime/docker/buildkitd.toml",
  "--bootstrap",
];

export type BuilderRunner = (args: ReadonlyArray<string>) => { readonly ok: boolean };

const runDocker: BuilderRunner = (args) => ({
  ok: spawnSync("docker", args, { stdio: "ignore" }).status === 0,
});

/**
 * Ensures the GC-capped benchmark builder exists, creating it when missing.
 * Returns whether it is usable; callers fall back to the active builder otherwise.
 */
export const ensureBenchmarkBuilder = (runner: BuilderRunner = runDocker): boolean =>
  runner(["buildx", "inspect", benchmarkBuilderName]).ok || runner(createArguments).ok;
