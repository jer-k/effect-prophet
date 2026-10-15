import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { comparePythonStrings, InvalidFeatureName, parseFeatureName } from "../src/feature-name";

describe("feature names", () => {
  it("orders scalar Unicode feature identities like Python, including supplementary characters", () => {
    expect(["😀", "\uffff", "a😀", "a\uffff", "a"].sort(comparePythonStrings)).toEqual([
      "a",
      "a\uffff",
      "a😀",
      "\uffff",
      "😀",
    ]);
    expect(comparePythonStrings("same", "same")).toBe(0);
  });

  it("preserves case and whitespace without normalization", async () => {
    const name = await Effect.runPromise(parseFeatureName(" Launch "));

    expect(name).toBe(" Launch ");
  });

  it.each(["", "trend", "events", "multiplicative", "factor", "contribution", "launch_delim_+0"])(
    "rejects reserved name %j",
    async (name) => {
      const error = await Effect.runPromise(Effect.flip(parseFeatureName(name)));

      expect(error).toBeInstanceOf(InvalidFeatureName);
    },
  );
});
