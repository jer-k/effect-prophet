import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

/** The repository root, where benchmark commands run. */
export const projectRoot = fileURLToPath(new URL("../../", import.meta.url));

/** Run a command from the repository root and return its trimmed standard output. */
export const commandOutput = (command: string, args: ReadonlyArray<string>): string => {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `${command} failed`);
  }

  return result.stdout.trim();
};

/** Run a command from the repository root with inherited output, failing on a non-zero status. */
export const runCommand = (
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
