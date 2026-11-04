import { readFile } from "node:fs/promises";

import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { mcmcCases } from "../../cases/bayesian/mcmc.ts";
import { parseBenchmarkCases } from "../case.ts";
import { effectOptionsForCase } from "../effect-case.ts";

const cases = async () => {
  const input: unknown = JSON.parse(
    await readFile(new URL("../../cases/growth/linear/public-api.json", import.meta.url), "utf8"),
  );

  return Effect.runPromise(parseBenchmarkCases(input));
};

describe("Effect benchmark case mapping", () => {
  it("preserves event, regressor, and conditional-seasonality declarations", async () => {
    const benchmarkCases = await cases();

    const mixed = benchmarkCases.find(
      (benchmarkCase) => benchmarkCase.id === "map-mixed-features-explicit-small",
    );

    if (mixed === undefined) {
      throw new Error("Expected mixed explicit case");
    }

    const options = effectOptionsForCase(mixed);

    expect(options?.events?.map((event) => event.name)).toEqual(["launch"]);
    expect(options?.regressors).toEqual([
      { name: "promotion", priorScale: 10, standardization: "never" },
    ]);
    expect(options?.seasonalities).toEqual([
      {
        name: "weekly-on",
        periodDays: 7,
        fourierOrder: 1,
        priorScale: 10,
        conditionName: "onSeason",
      },
      { name: "three-day", periodDays: 3, fourierOrder: 1, priorScale: 5 },
    ]);

    if (options?.growth !== "linear") {
      throw new Error("Expected linear options");
    }

    expect(options.map?.changepoints).toEqual({
      mode: "explicit",
      timestamps: ["2020-01-11T00:00:00.000Z"],
    });
  });

  it("omits map only for the automatic-default workload", async () => {
    const benchmarkCases = await cases();

    const automatic = benchmarkCases.find(
      (benchmarkCase) => benchmarkCase.id === "map-mixed-features-automatic-large",
    );

    if (automatic === undefined) {
      throw new Error("Expected mixed automatic case");
    }

    const options = effectOptionsForCase(automatic);

    expect(options).not.toHaveProperty("map");
    expect(options?.seasonalities).toHaveLength(2);
    expect(options?.events).toHaveLength(6);
    expect(options?.regressors?.map((regressor) => regressor.standardization)).toEqual([
      "auto",
      "auto",
      "always",
      "never",
    ]);
  });

  it("passes Python's sampling settings without the gate's point allowance", () => {
    const [linear, , flat] = mcmcCases;

    if (linear === undefined || flat === undefined) {
      throw new Error("Expected declared posterior cases");
    }

    expect(effectOptionsForCase(linear)?.mcmc).toEqual({ samples: 300, seed: 19 });
    expect(effectOptionsForCase(flat)?.mcmc).toEqual({ samples: 500, seed: 19, chains: 2 });
  });

  it("gives a sampled regressor model the case's seed and chains, as Python's fit passes them on", () => {
    const sampled = mcmcCases.find(({ id }) => id === "mcmc-linear-sampled-regressor-model");

    if (
      sampled === undefined ||
      sampled.workload.kind !== "map" ||
      sampled.workload.mcmc === undefined
    ) {
      throw new Error("Expected the sampled regressor model case");
    }

    expect(effectOptionsForCase(sampled)?.regressors?.[1]?.predictor).toEqual({
      mcmc: { samples: 300, seed: 19 },
    });

    const twoChains = {
      ...sampled,
      workload: { ...sampled.workload, mcmc: { ...sampled.workload.mcmc, chains: 2 } },
    };

    expect(effectOptionsForCase(twoChains)?.regressors?.[1]?.predictor).toEqual({
      mcmc: { samples: 300, seed: 19, chains: 2 },
    });
  });
});
