import { describe, expect, it } from "vitest";

import { resolveContainerPlatform } from "../container-platform.ts";

describe("benchmark container platform", () => {
  it("maps Apple Silicon to native Linux ARM", () => {
    expect(resolveContainerPlatform("arm64")).toEqual({
      platform: "linux/arm64",
      nativePlatform: "linux/arm64",
      emulated: false,
    });
  });

  it("maps x64 to native Linux AMD64", () => {
    expect(resolveContainerPlatform("x64")).toEqual({
      platform: "linux/amd64",
      nativePlatform: "linux/amd64",
      emulated: false,
    });
  });

  it("records an explicit cross-architecture override as emulated", () => {
    expect(resolveContainerPlatform("arm64", "linux/amd64").emulated).toBe(true);
  });

  it("rejects unsupported host and container architectures", () => {
    expect(() => resolveContainerPlatform("riscv64")).toThrow("Unsupported host architecture");
    expect(() => resolveContainerPlatform("arm64", "linux/riscv64")).toThrow(
      "Unsupported container platform",
    );
  });
});
