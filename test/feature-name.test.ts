import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { InvalidFeatureName, parseFeatureName } from "../src/feature-name";

describe("feature names", () => {
  it("preserves case and whitespace without normalization", async () => {
    const name = await Effect.runPromise(parseFeatureName(" Launch "));

    expect(name).toBe(" Launch ");
  });

  it.each(["", "trend", "events", "launch_delim_+0"])("rejects reserved name %j", async (name) => {
    const error = await Effect.runPromise(Effect.flip(parseFeatureName(name)));

    expect(error).toBeInstanceOf(InvalidFeatureName);
  });
});
