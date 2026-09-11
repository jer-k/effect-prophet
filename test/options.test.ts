import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { InputValidationError, decodeOptions, defaultProphetOptions } from "../src/index";

const expectOptionsFailure = async (input: Parameters<typeof decodeOptions>[0]) => {
  const error = await Effect.runPromise(Effect.flip(decodeOptions(input)));

  expect(error).toBeInstanceOf(InputValidationError);
  expect(error._tag).toBe("InputValidationError");
  expect(error.input).toBe("options");

  return error;
};

describe("decodeOptions", () => {
  it("applies defaults when options are omitted", async () => {
    const options = await Effect.runPromise(decodeOptions());

    expect(options).toEqual(defaultProphetOptions);
    expect(options).toEqual({ growth: "linear" });
  });

  it("applies defaults to an empty options object", async () => {
    const options = await Effect.runPromise(decodeOptions({}));

    expect(options).toEqual(defaultProphetOptions);
  });

  it.each(["flat", "linear"] as const)("accepts %s growth", async (growth) => {
    const options = await Effect.runPromise(decodeOptions({ growth }));

    expect(options).toEqual({ growth });
  });

  it("rejects unsupported growth modes with a structured field path", async () => {
    const error = await expectOptionsFailure({ growth: "logistic" });

    expect(error.issues).toContainEqual({
      message: expect.stringContaining("flat"),
      path: ["growth"],
    });
  });

  it("rejects unknown options rather than silently dropping them", async () => {
    const error = await expectOptionsFailure({ seasonality: true });

    expect(error.issues).toContainEqual({
      message: "Expected no excess property",
      path: ["seasonality"],
    });
  });
});
