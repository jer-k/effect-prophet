import { describe, expect, it } from "vitest";

import { benchmarkBuilderName, ensureBenchmarkBuilder } from "../docker-builder.ts";

describe("benchmark docker builder", () => {
  it("reuses an existing builder without creating one", () => {
    const calls: Array<ReadonlyArray<string>> = [];

    const usable = ensureBenchmarkBuilder((args) => {
      calls.push(args);

      return { ok: true };
    });

    expect(usable).toBe(true);
    expect(calls).toEqual([["buildx", "inspect", benchmarkBuilderName]]);
  });

  it("creates the builder with the checked-in GC config when missing", () => {
    const calls: Array<ReadonlyArray<string>> = [];

    const usable = ensureBenchmarkBuilder((args) => {
      calls.push(args);

      return { ok: args[1] === "create" };
    });

    expect(usable).toBe(true);
    expect(calls).toHaveLength(2);
    expect(calls[1]).toContain("benchmark/tools/runtime/docker/buildkitd.toml");
    expect(calls[1]).toContain(benchmarkBuilderName);
  });

  it("reports unusable when creation fails", () => {
    expect(ensureBenchmarkBuilder(() => ({ ok: false }))).toBe(false);
  });
});
