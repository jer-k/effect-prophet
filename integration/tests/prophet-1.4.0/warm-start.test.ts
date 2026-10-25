import { Effect, Match } from "effect";
import { describe, expect, it } from "vitest";

import {
  fit,
  prophetFittingBackendLayer,
  warmStartParameters,
  type EncodedBuiltInSeasonalitySetting,
  type EncodedLinearOptimizer,
  type EncodedMapOptions,
  type EncodedProphetOptions,
  type WarmStartParameters,
} from "../../../src/index";
import {
  loadProphetFixtureBundle,
  type WarmStartReferenceFile,
} from "../../helpers/prophet-fixture";

type ReferenceCase = WarmStartReferenceFile["cases"][number];

type ReferenceFit = ReferenceCase["first"] | ReferenceCase["second"];

const options = (
  referenceCase: ReferenceCase,
  reference: ReferenceFit,
  warmStart?: WarmStartParameters,
): EncodedProphetOptions => {
  const optimizer: EncodedLinearOptimizer =
    "maxIterations" in reference && reference.maxIterations !== null
      ? { algorithm: "newton", maxIterations: reference.maxIterations }
      : { algorithm: "newton" };

  const changepoints = { mode: "auto", count: reference.changepointCount } as const;

  const map: EncodedMapOptions =
    warmStart === undefined ? { changepoints, optimizer } : { changepoints, optimizer, warmStart };

  const weekly: EncodedBuiltInSeasonalitySetting = reference.weekly ? { mode: "on" } : "off";

  const common = {
    seasonalityMode: referenceCase.seasonalityMode,
    builtInSeasonalities: { yearly: "off", daily: "off", weekly },
    map,
  } as const;

  return Match.value(referenceCase.growth).pipe(
    Match.when("flat", (growth): EncodedProphetOptions => ({ growth, ...common })),
    Match.when("logistic", (growth): EncodedProphetOptions => ({ growth, ...common })),
    Match.when("linear", (growth): EncodedProphetOptions => ({ growth, ...common })),
    Match.exhaustive,
  );
};

const fitReference = (
  referenceCase: ReferenceCase,
  reference: ReferenceFit,
  warmStart?: WarmStartParameters,
) =>
  Effect.runPromise(
    fit(reference.observations, options(referenceCase, reference, warmStart)).pipe(
      Effect.map(warmStartParameters),
      Effect.provide(prophetFittingBackendLayer),
    ),
  );

const expectValues = (
  actual: ReadonlyArray<number>,
  expected: ReadonlyArray<number>,
  tolerance: number,
) => {
  expect(actual).toHaveLength(expected.length);

  for (const [index, value] of actual.entries()) {
    expect(Math.abs(value - (expected[index] ?? Number.NaN))).toBeLessThanOrEqual(tolerance);
  }
};

// Flat models keep neither Stan's prior-only rate nor its deltas, so neither is compared.
const expectState = (
  growth: ReferenceCase["growth"],
  actual: WarmStartParameters,
  expected: WarmStartParameters,
  tolerance: number,
) => {
  expectValues([actual.m, actual.sigmaObs], [expected.m, expected.sigmaObs], tolerance);
  expectValues(actual.beta, expected.beta, tolerance);

  if (growth === "flat") {
    expect(actual.k).toBe(0);
    expect(actual.delta).toEqual([]);

    return;
  }

  expectValues([actual.k], [expected.k], tolerance);
  expectValues(actual.delta, expected.delta, tolerance);
};

const largestDifference = (left: WarmStartParameters, right: WarmStartParameters) =>
  Math.max(
    ...[left.k - right.k, left.m - right.m, left.sigmaObs - right.sigmaObs].map(Math.abs),
    ...left.delta.map((value, index) => Math.abs(value - (right.delta[index] ?? 0))),
    ...left.beta.map((value, index) => Math.abs(value - (right.beta[index] ?? 0))),
  );

describe("Prophet 1.4.0 warm start compatibility", () => {
  it("reads the same Stan parameters as warm_start_params", async () => {
    const { warmStart } = await Effect.runPromise(loadProphetFixtureBundle());

    for (const referenceCase of warmStart.cases) {
      const actual = await fitReference(referenceCase, referenceCase.first);

      expectState(
        referenceCase.growth,
        actual,
        referenceCase.warmStart,
        warmStart.tolerances.parameterAbsolute,
      );
    }
  });

  it("fits from Python's warm start to Python's endpoint, unlike a cold start", async () => {
    const { warmStart } = await Effect.runPromise(loadProphetFixtureBundle());
    const tolerance = warmStart.tolerances.parameterAbsolute;

    for (const referenceCase of warmStart.cases) {
      const { expected } = referenceCase;

      // A case shows the warm start was used only if it changes Python's result.
      expect(largestDifference(expected.warm, expected.cold)).toBeGreaterThan(100 * tolerance);

      const warm = await fitReference(referenceCase, referenceCase.second, referenceCase.warmStart);
      const cold = await fitReference(referenceCase, referenceCase.second);

      expectState(referenceCase.growth, warm, expected.warm, tolerance);
      expectState(referenceCase.growth, cold, expected.cold, tolerance);
    }
  });
});
