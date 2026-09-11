import { describe, expect, it } from "vitest";

import { version } from "../src/index.js";

describe("package entry point", () => {
  it("exports the package version placeholder", () => {
    expect(version).toBe("0.0.0");
  });
});
