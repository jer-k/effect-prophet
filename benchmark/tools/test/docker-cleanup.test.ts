import { describe, expect, it } from "vitest";

import { cleanupDockerStorage, dockerCleanupCommands } from "../docker-cleanup.ts";

describe("benchmark docker cleanup", () => {
  it("runs every cleanup command and only touches benchmark-scoped storage", () => {
    const calls: Array<ReadonlyArray<string>> = [];

    cleanupDockerStorage(
      (args) => {
        calls.push(args);

        return {};
      },
      () => {},
    );

    expect(calls).toEqual(dockerCleanupCommands.map((command) => command.args));
    expect(calls.flat()).not.toContain("volume");
    expect(calls.flat()).not.toContain("system");
    expect(calls[1]).toContain("label=org.effect-prophet.benchmark=true");
    expect(calls[2]).toContain("label=org.effect-prophet.fixtures=true");
  });

  it("reports failures and keeps going instead of throwing", () => {
    const messages: Array<string> = [];
    let count = 0;

    expect(() =>
      cleanupDockerStorage(
        () => {
          count += 1;

          return { error: "daemon unavailable" };
        },
        (message) => messages.push(message),
      ),
    ).not.toThrow();

    expect(count).toBe(dockerCleanupCommands.length);
    expect(messages.filter((message) => message.includes("daemon unavailable"))).toHaveLength(
      dockerCleanupCommands.length,
    );
  });
});
