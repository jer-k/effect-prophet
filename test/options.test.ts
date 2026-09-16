import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  InputValidationError,
  UnsupportedConfigurationError,
  decodeOptions,
  defaultProphetOptions,
} from "../src/index";

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
    expect(options).toEqual({ growth: "linear", seasonalities: [] });
  });

  it("applies defaults to an empty options object", async () => {
    const options = await Effect.runPromise(decodeOptions({}));

    expect(options).toEqual(defaultProphetOptions);
  });

  it.each(["flat", "linear"] as const)("accepts %s growth", async (growth) => {
    const options = await Effect.runPromise(decodeOptions({ growth }));

    expect(options).toEqual({ growth, seasonalities: [] });
  });

  it("parses ordered explicit seasonalities and applies prior defaults", async () => {
    const options = await Effect.runPromise(
      decodeOptions({
        seasonalities: [
          { name: "work-week", periodDays: 7, fourierOrder: 3 },
          { name: "quarter", periodDays: 91.25, fourierOrder: 2, priorScale: 4 },
        ],
      }),
    );

    expect(options).toEqual({
      growth: "linear",
      seasonalities: [
        { name: "work-week", periodDays: 7, fourierOrder: 3, priorScale: 10 },
        { name: "quarter", periodDays: 91.25, fourierOrder: 2, priorScale: 4 },
      ],
    });
    expect(Object.isFrozen(options.seasonalities)).toBe(true);
  });

  it("reports nested seasonality failures at option-relative paths", async () => {
    const error = await expectOptionsFailure({
      seasonalities: [
        { name: "duplicate", periodDays: 7, fourierOrder: 1 },
        { name: "duplicate", periodDays: 30, fourierOrder: 2 },
      ],
    });

    expect(error.issues).toContainEqual({
      message: expect.stringContaining("duplicated"),
      path: ["seasonalities", 1, "name"],
    });
  });

  it("rejects invalid growth values at the options boundary", async () => {
    const error = await expectOptionsFailure({ growth: "logistic" });

    expect(error).not.toBeInstanceOf(UnsupportedConfigurationError);
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
