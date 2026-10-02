import { readFile } from "node:fs/promises";

import { Effect, Exit, Match, Option, Schema, Tracer } from "effect";

import { requireEndedSpan } from "./internal/tracing-test-helpers";
import { describe, expect, it } from "vitest";

import {
  fit,
  predict,
  encodeFittedModel,
  decodeFittedModel,
  decodeOptions,
  InputValidationError,
  ModelSerializationError,
  prophetFittingBackendLayer,
  FittingError,
} from "../src/index";

const OracleSchema = Schema.Struct({
  cases: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      rowCount: Schema.Int,
      changepointCount: Schema.Int,
      changepointPrior: Schema.Finite,
      featureCount: Schema.Int,
      design: Schema.Array(Schema.Finite),
      target: Schema.Array(Schema.Finite),
      requestedAlgorithm: Schema.Literals(["auto", "Newton", "LBFGS"]),
      returnedAlgorithm: Schema.NullOr(Schema.Literals(["Newton", "LBFGS"])),
      maxIterations: Schema.Int,
      newtonFallback: Schema.Boolean,
      expected: Schema.Union([
        Schema.Struct({ failure: Schema.Literal("line-search-failure") }),
        Schema.Struct({
          logDensity: Schema.Finite,
          noise: Schema.Finite,
          predictions: Schema.Array(Schema.Finite),
          termination: Schema.String,
        }),
      ]),
    }),
  ),
});

const selected = [
  "auto-99",
  "auto-100",
  "auto-101",
  "auto-duplicate-100",
  "override-newton-101",
  "override-lbfgs-99",
  "lbfgs-fallback-enabled",
  "lbfgs-fallback-disabled",
  "lbfgs-budget-no-fallback",
];

const loadOracle = async () => {
  const input: unknown = JSON.parse(
    await readFile(
      new URL("../integration/fixtures/prophet-1.4.0/stan-linear-optimizer.json", import.meta.url),
      "utf8",
    ),
  );

  return Effect.runPromise(Schema.decodeUnknownEffect(OracleSchema)(input));
};

describe("public linear Stan optimizer lifecycle", () => {
  it.each([{ relativeTolerance: 1e-10 }, { absoluteTolerance: 1e-12 }])(
    "rejects obsolete linear controls through public option parsing: %j",
    async (optimizer) => {
      const failure = await Effect.runPromise(Effect.flip(decodeOptions({ map: { optimizer } })));

      expect(failure).toBeInstanceOf(InputValidationError);
      expect(failure.input).toBe("options");
    },
  );

  it("rejects incompatible coordinate-model identities instead of restoring them", async () => {
    const model = await Effect.runPromise(
      fit(
        Array.from({ length: 8 }, (_, index) => ({
          timestamp: new Date(Date.UTC(2025, 0, index + 1)).toISOString(),
          value: 10 + index * 0.4 + Math.sin(index) * 0.1,
        })),
        { map: {} },
      ).pipe(Effect.provide(prophetFittingBackendLayer)),
    );

    const encoded = await Effect.runPromise(encodeFittedModel(model));

    if (encoded.modelKind !== "linear-piecewise-map") throw new Error("Expected linear MAP");

    for (const method of ["piecewise-map-coordinate-v1", "mixed-piecewise-map-coordinate-v1"]) {
      const failure = await Effect.runPromise(
        Effect.flip(
          decodeFittedModel({ ...encoded, fitSummary: { ...encoded.fitSummary, method } }),
        ),
      );

      expect(failure).toBeInstanceOf(ModelSerializationError);
      expect(failure.operation).toBe("decode");
    }
  });

  it.each(selected)(
    "fits %s through WASM and restores its actual completion without refitting",
    async (id) => {
      const oracle = (await loadOracle()).cases.find((candidate) => candidate.id === id);

      expect(oracle).toBeDefined();

      if (oracle === undefined) return;

      const columns = 2 + oracle.changepointCount + oracle.featureCount;
      const uniqueCount = new Set(oracle.design.filter((_, index) => index % columns === 1)).size;
      const span = (uniqueCount - 1) * 86_400_000;

      const rows = oracle.target.map((value, index) => ({
        timestamp: new Date(
          Date.UTC(2025, 0, 1) +
            Math.round((oracle.design[index * columns + 1] ?? Number.NaN) * span),
        ).toISOString(),
        value,
      }));

      const algorithm = Match.value(oracle.requestedAlgorithm).pipe(
        Match.when("auto", () => "auto" as const),
        Match.when("Newton", () => "newton" as const),
        Match.when("LBFGS", () => "lbfgs" as const),
        Match.exhaustive,
      );

      const optimizer =
        algorithm === "newton"
          ? { algorithm, maxIterations: oracle.maxIterations }
          : {
              algorithm,
              maxIterations: oracle.maxIterations,
              fallback: oracle.newtonFallback ? ("newton" as const) : ("none" as const),
            };

      const spans: Array<Tracer.Span> = [];

      const tracer = Tracer.make({
        span: (options) => {
          const span = new Tracer.NativeSpan(options);
          spans.push(span);

          return span;
        },
      });

      const operation = fit(rows, {
        map: {
          changepoints: { mode: "auto", count: oracle.changepointCount, range: 0.8 },
          changepointPriorScale: oracle.changepointPrior,
          optimizer,
        },
      }).pipe(
        Effect.provide(prophetFittingBackendLayer),
        Effect.withSpan("optimizer.job"),
        Effect.withTracer(tracer),
      );

      const result = await Effect.runPromise(
        operation.pipe(Effect.match({ onFailure: (error) => error, onSuccess: (model) => model })),
      );

      const job = spans.find((span) => span.name === "optimizer.job");
      const publicFit = spans.find((span) => span.name === "Prophet.fit");
      const boundary = spans.find((span) => span.name === "effect-prophet.wasm.fit");

      if (job === undefined || publicFit === undefined || boundary === undefined) {
        throw new Error("Expected the complete real optimizer trace");
      }

      for (const [child, parent] of [
        [publicFit, job],
        [boundary, publicFit],
      ] as const) {
        const childStatus = requireEndedSpan(child);
        const parentStatus = requireEndedSpan(parent);

        expect(child.traceId).toBe(job.traceId);
        expect(child.parent.pipe(Option.getOrUndefined)?.spanId).toBe(parent.spanId);
        expect(childStatus.startTime).toBeGreaterThanOrEqual(parentStatus.startTime);
        expect(childStatus.endTime).toBeLessThanOrEqual(parentStatus.endTime);
        expect(Exit.isSuccess(childStatus.exit)).toBe(!("failure" in oracle.expected));
      }

      const attributes = Object.fromEntries(boundary.attributes);

      expect(attributes).toMatchObject({
        "effect_prophet.optimizer.requested_algorithm": algorithm,
        "effect_prophet.optimizer.max_iterations": oracle.maxIterations,
        "effect_prophet.optimizer.fallback":
          algorithm === "newton" || !oracle.newtonFallback ? "none" : "newton",
      });

      if ("failure" in oracle.expected) {
        expect(result).toBeInstanceOf(FittingError);

        if (!(result instanceof FittingError)) throw new Error("Expected optimizer failure");

        expect(result.cause).toMatchObject({
          first: { reason: oracle.expected.failure },
          fallback: null,
        });
        expect(attributes).not.toHaveProperty("effect_prophet.optimizer.termination");
        expect(attributes).not.toHaveProperty("effect_prophet.optimizer.algorithm");

        return;
      }

      if (!("fitSummary" in result)) throw new Error("Expected a fitted MAP model");

      const model = result;

      expect(attributes).toMatchObject({
        "effect_prophet.optimizer.algorithm":
          oracle.returnedAlgorithm === "Newton" ? "newton" : "lbfgs",
        "effect_prophet.optimizer.termination": oracle.expected.termination,
        "effect_prophet.optimizer.attempt.count": id === "lbfgs-fallback-enabled" ? 2 : 1,
      });
      expect(model.model).toBe("linear-piecewise-map");

      if (model.model !== "linear-piecewise-map") return;

      expect(model.fitSummary.optimization.algorithm).toBe(
        oracle.returnedAlgorithm === "Newton" ? "newton" : "lbfgs",
      );
      expect(model.fitSummary.termination).toBe(oracle.expected.termination);
      expect(model.fitSummary.optimization.attemptCount).toBe(
        id === "lbfgs-fallback-enabled" ? 2 : 1,
      );
      expect(Math.abs(model.fitSummary.objective + oracle.expected.logDensity)).toBeLessThanOrEqual(
        0.01,
      );
      expect(Math.abs(model.noiseScale - oracle.expected.noise)).toBeLessThanOrEqual(0.0002);

      const encoded = await Effect.runPromise(encodeFittedModel(model));

      const restored = await Effect.runPromise(
        decodeFittedModel(JSON.parse(JSON.stringify(encoded))),
      );

      const forecasts = await Effect.runPromise(
        predict(
          restored,
          rows.map((row) => row.timestamp),
        ),
      );

      expect(restored).toEqual(model);

      for (const [index, forecast] of forecasts.entries()) {
        expect(
          Math.abs(forecast.value - (oracle.expected.predictions[index] ?? Number.NaN)),
        ).toBeLessThanOrEqual(0.002);
      }
    },
  );
});
