import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import { McmcOptionsSchema, resolveMcmcOptions } from "../src/mcmc";

const decode = Schema.decodeUnknownSync(McmcOptionsSchema);

describe("mcmc options", () => {
  it("applies Python's chain, warmup and draw defaults", () => {
    expect(resolveMcmcOptions(decode({ samples: 301, seed: 4 }))).toEqual({
      samples: 301,
      seed: 4,
      chains: 4,
      warmup: 150,
      drawsPerChain: 150,
    });

    expect(resolveMcmcOptions(decode({ samples: 2, seed: 0, chains: 1, warmup: 0 }))).toEqual({
      samples: 2,
      seed: 0,
      chains: 1,
      warmup: 0,
      drawsPerChain: 1,
    });
  });

  it("rejects counts outside the sampler's limits", () => {
    for (const input of [
      { samples: 1, seed: 1 },
      { samples: 2.5, seed: 1 },
      { samples: 10, seed: 2 ** 32 },
      { samples: 10, seed: 1, chains: 0 },
      { samples: 10, seed: 1, chains: 17 },
      { samples: 10, seed: 1, warmup: 100_001 },
      { samples: 10_002, seed: 1 },
      { samples: 10, seed: 1, extra: true },
    ]) {
      expect(() => decode(input, { onExcessProperty: "error" })).toThrow();
    }

    expect(() => decode({ samples: 10_001, seed: 1 })).not.toThrow();
    expect(resolveMcmcOptions(decode({ samples: 40_001, seed: 1, chains: 1 })).drawsPerChain).toBe(
      20_000,
    );
  });
});
