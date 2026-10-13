import { spawnSync } from "node:child_process";

export interface CleanupCommand {
  readonly description: string;
  readonly args: ReadonlyArray<string>;
}

// Keep the cache the next run reuses, but cap it so rebuilds cannot accumulate unbounded layers.
export const dockerCleanupCommands: ReadonlyArray<CleanupCommand> = [
  {
    description: "trimming BuildKit cache to 8GB",
    args: ["buildx", "prune", "--force", "--max-used-space", "8GB"],
  },
  {
    description: "removing superseded benchmark images",
    args: ["image", "prune", "--force", "--filter", "label=org.effect-prophet.benchmark=true"],
  },
  {
    description: "removing superseded fixture images",
    args: ["image", "prune", "--force", "--filter", "label=org.effect-prophet.fixtures=true"],
  },
];

export type CleanupRunner = (args: ReadonlyArray<string>) => { readonly error?: string };

const runDocker: CleanupRunner = (args) => {
  const result = spawnSync("docker", args, { encoding: "utf8" });

  if (result.error !== undefined) return { error: result.error.message };

  if (result.status !== 0) return { error: result.stderr.trim() || `exit status ${result.status}` };

  return {};
};

/** Best-effort: a cleanup failure is reported but never fails the benchmark run. */
export const cleanupDockerStorage = (
  runner: CleanupRunner = runDocker,
  log: (message: string) => void = (message) => process.stderr.write(`${message}\n`),
): void => {
  for (const command of dockerCleanupCommands) {
    log(`Docker cleanup: ${command.description}`);

    const { error } = runner(command.args);

    if (error !== undefined) log(`Docker cleanup skipped (${command.description}): ${error}`);
  }
};
