import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { FittingError, PredictionError, fit, prophetFittingBackendLayer } from "../../src/index";
import { emptyEventCalendar } from "../../src/event";
import { isMcmcModel } from "../../src/fitted-model";
import { resolveMcmcOptions } from "../../src/mcmc";
import { makeSeasonalityLayout } from "../../src/seasonality";
import {
  fitMcmcWithWasm,
  posteriorComponentRangesWithWasm,
  simulateMcmcWithWasm,
  type WasmMcmcLoader,
} from "../../src/internal/wasm-mcmc-backend";

const timestamps = [0, 1, 2, 3].map((day) => Date.UTC(2025, 0, 1 + day));

const input = {
  timestamps: new Float64Array(timestamps),
  values: new Float64Array([1, 3, 2, 4]),
};

const masks = { rowCount: 4, componentCount: 0, values: new Uint8Array() };

const features = {
  matrix: { rowCount: 4, columnCount: 0, values: new Float64Array() },
  layout: { components: [], coefficientCount: 0, priorScales: [] },
};

const seasonalities = Effect.runSync(makeSeasonalityLayout([]));

const request = {
  growth: "linear" as const,
  scaling: "absmax" as const,
  seasonalities,
  changepoints: { mode: "explicit" as const, timestamps: [] },
  changepointPriorScale: 0.05,
  mcmc: resolveMcmcOptions({ samples: 2, seed: 1, chains: 2 }),
  masks,
  features,
  events: emptyEventCalendar,
  regressors: [],
};

const span = 3 * 86_400_000;

/**
 * A linear frame with no changepoints or features, so each draw is `[intercept, slope, noise]`,
 * and one draw per chain.
 */
const frame = (
  overrides: Readonly<Record<number, number>> = {},
  tail: ReadonlyArray<number> = [],
) => {
  const header = [
    0,
    0,
    0,
    4,
    0,
    2,
    3,
    timestamps[0] ?? 0,
    span,
    4,
    0,
    0,
    0,
    0,
    0.9,
    1,
    50,
    40,
    2,
    0,
  ];

  for (const [index, value] of Object.entries(overrides)) {
    header[Number(index)] = value;
  }

  return new Float64Array([
    ...header,
    0.1,
    0.2,
    1,
    0.5,
    0.1,
    // Draws, one per chain.
    1,
    0.4,
    0.1,
    1,
    0.6,
    0.1,
    ...tail,
  ]);
};

const loaderReturning =
  (frame: Float64Array): WasmMcmcLoader =>
  () => ({
    fit_mixed_linear_mcmc: () => frame,
    fit_mixed_flat_mcmc: () => frame,
    fit_logistic_mcmc_with_features: () => frame,
    simulate_logistic_mcmc_with_features: () => frame,
    simulate_mcmc_with_features: () => frame,
    posterior_component_ranges: () => frame,
  });

const fitError = (frame: Float64Array) =>
  Effect.runPromise(Effect.flip(fitMcmcWithWasm(input, request, loaderReturning(frame))));

describe("posterior WASM adapter", () => {
  it("classifies sampler and limit failures", async () => {
    const cases = [
      [new Float64Array([12]), "sampling-limit"],
      [new Float64Array([13, 3]), "non-finite-result"],
      [new Float64Array([13, 4]), "non-convergence"],
      [new Float64Array([13, 5]), "non-convergence"],
      [new Float64Array([13, 6]), "non-finite-result"],
      [new Float64Array([13, 1]), "backend-failure"],
      [new Float64Array([1]), "insufficient-observations"],
      [new Float64Array([5]), "degenerate-observations"],
    ] as const;

    for (const [frame, reason] of cases) {
      const error = await fitError(frame);

      expect(error).toBeInstanceOf(FittingError);
      expect(error.reason).toBe(reason);
    }
  });

  it("decodes a sampled frame and rejects malformed ones as protocol failures", async () => {
    const model = await Effect.runPromise(
      fitMcmcWithWasm(input, request, loaderReturning(frame())),
    );

    expect(model.model).toBe("linear-piecewise-mcmc");
    expect(model.posterior.noiseScale).toEqual([0.1, 0.1]);
    expect(model.fitSummary.diagnostics?.stepSizes).toEqual([0.1, 0.2]);

    for (const malformed of [
      frame({ 6: 4 }),
      frame({}, [1]),
      frame({ 10: 7 }),
      frame({ 1: 1 }),
      frame({ 9: 3 }),
    ]) {
      const error = await fitError(malformed);

      expect(error.backendPhase).toBe("protocol");
    }
  });

  it("decodes a constant-target frame into a single-draw posterior", async () => {
    const header = [0, 0, 0, 4, 0, 1, 3, timestamps[0] ?? 0, 3 * 86_400_000, 4, 1];

    const frame = new Float64Array([
      ...header,
      0,
      0,
      0,
      Number.NaN,
      Number.NaN,
      Number.NaN,
      Number.NaN,
      0,
      0,
      // The means, then the single draw.
      1,
      0,
      4e-9,
      1,
      0,
      4e-9,
    ]);

    const model = await Effect.runPromise(fitMcmcWithWasm(input, request, loaderReturning(frame)));

    expect(model.fitSummary.termination).toBe("constant-target-shortcut");
    expect(model.fitSummary.diagnostics).toBeNull();
    expect(model.posterior.noiseScale).toEqual([4e-9]);
  });

  it("maps simulation and component failures to prediction errors", async () => {
    const model = await Effect.runPromise(
      fit(
        timestamps.map((timestamp, index) => ({
          timestamp: new Date(timestamp).toISOString(),
          value: index % 2,
        })),
        {
          builtInSeasonalities: { daily: "off", weekly: "off", yearly: "off" },
          mcmc: { samples: 10, seed: 2, chains: 1 },
        },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    if (!isMcmcModel(model)) throw new Error("Expected a posterior");

    const options = { seed: 1, samples: 4, intervalWidth: 0.8, output: "intervals" } as const;

    for (const [frame, reason] of [
      [new Float64Array([3]), "simulation-limit"],
      [new Float64Array([2]), "invalid-model"],
      [new Float64Array([0, 0, 4, 1]), "backend-failure"],
    ] as const) {
      const error = await Effect.runPromise(
        Effect.flip(
          simulateMcmcWithWasm(model, timestamps, masks, features, options, loaderReturning(frame)),
        ),
      );

      expect(error).toBeInstanceOf(PredictionError);
      expect(error.reason).toBe(reason);
    }

    for (const frame of [new Float64Array([3]), new Float64Array([0, 4, 2, 0])]) {
      const error = await Effect.runPromise(
        Effect.flip(
          posteriorComponentRangesWithWasm(
            model,
            timestamps,
            masks,
            features,
            0.8,
            loaderReturning(frame),
          ),
        ),
      );

      expect(error).toBeInstanceOf(PredictionError);
    }
  });
});
