import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { InputValidationError } from "../src/errors";
import { decodePredictionRows } from "../src/prediction-row";

describe("decodePredictionRows", () => {
  it("parses mixed timestamp and object rows without reordering duplicates", async () => {
    const rows = await Effect.runPromise(
      decodePredictionRows([
        "2025-01-01T00:00:00.000Z",
        {
          timestamp: "2025-01-01T00:00:00.000Z",
          regressors: { price: 3 },
        },
      ]),
    );

    expect(rows).toEqual([
      { timestamp: 1_735_689_600_000 },
      { timestamp: 1_735_689_600_000, regressors: { price: 3 } },
    ]);
    expect(Object.isFrozen(rows)).toBe(true);
    expect(Object.isFrozen(rows[1]?.regressors)).toBe(true);
  });

  it("retains legacy diagnostics for object-free invalid inputs", async () => {
    const error = await Effect.runPromise(Effect.flip(decodePredictionRows(["invalid"])));

    expect(error).toBeInstanceOf(InputValidationError);
    expect(error.input).toBe("prediction-timestamps");
  });

  it("uses row diagnostics for mixed batches and rejects unknown fields", async () => {
    for (const input of [
      ["invalid", { timestamp: "also-invalid" }],
      [{ timestamp: "2025-01-01T00:00:00.000Z", typo: true }],
      [{ timestamp: "2025-01-01T00:00:00.000Z", regressors: { price: true } }],
    ]) {
      const error = await Effect.runPromise(Effect.flip(decodePredictionRows(input)));

      expect(error).toBeInstanceOf(InputValidationError);
      expect(error.input).toBe("prediction-rows");
    }
  });
});
