import { Effect, Exit, Option, Predicate, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import { InputValidationError } from "../src/errors";
import { decodeLinearOptimizer, defaultLinearOptimizer } from "../src/linear-optimizer";

describe("linear optimizer controls", () => {
  it.each([{}, { relativeTolerance: 1e-10 }])(
    "traces complete decoding without control payloads: %j",
    async (input) => {
      const spans: Array<Tracer.Span> = [];

      const tracer = Tracer.make({
        span: (options) => {
          const span = new Tracer.NativeSpan(options);

          spans.push(span);

          return span;
        },
      });

      const exit = await Effect.runPromiseExit(
        decodeLinearOptimizer(input).pipe(
          Effect.withSpan("linear.controls"),
          Effect.withTracer(tracer),
        ),
      );

      const root = spans.find((span) => span.name === "linear.controls");
      const decodeSpan = spans.find((span) => span.name === "decodeLinearOptimizer");

      expect(root).toBeDefined();
      expect(decodeSpan).toBeDefined();

      if (root === undefined || decodeSpan === undefined) {
        return;
      }

      expect(decodeSpan.traceId).toBe(root.traceId);
      expect(Option.getOrUndefined(decodeSpan.parent)?.spanId).toBe(root.spanId);
      expect(Object.fromEntries(decodeSpan.attributes)).toEqual({});
      expect(root.status._tag).toBe("Ended");
      expect(decodeSpan.status._tag).toBe("Ended");

      if (
        Predicate.isTagged(root.status, "Ended") &&
        Predicate.isTagged(decodeSpan.status, "Ended")
      ) {
        expect(Exit.isSuccess(decodeSpan.status.exit)).toBe(Exit.isSuccess(exit));
        expect(decodeSpan.status.startTime >= root.status.startTime).toBe(true);
        expect(decodeSpan.status.endTime <= root.status.endTime).toBe(true);
      }
    },
  );

  it("defaults to Prophet selection and Stan controls", async () => {
    const parsed = await Effect.runPromise(decodeLinearOptimizer({}));

    expect(parsed).toEqual(defaultLinearOptimizer);
    expect(Object.isFrozen(parsed)).toBe(true);

    if (parsed.algorithm !== "newton") {
      expect(Object.isFrozen(parsed.lbfgs)).toBe(true);
    }
  });

  it("keeps Newton free of inapplicable controls", async () => {
    expect(
      await Effect.runPromise(decodeLinearOptimizer({ algorithm: "newton", maxIterations: 1 })),
    ).toEqual({ algorithm: "newton", maxIterations: 1 });
  });

  it("parses explicit L-BFGS overrides and disabled fallback", async () => {
    const parsed = await Effect.runPromise(
      decodeLinearOptimizer({
        algorithm: "lbfgs",
        maxIterations: 12,
        fallback: "none",
        lbfgs: { historySize: 3, tolParam: 1e-9 },
      }),
    );

    expect(parsed).toMatchObject({
      algorithm: "lbfgs",
      maxIterations: 12,
      fallback: "none",
      lbfgs: { historySize: 3, tolParam: 1e-9, initAlpha: 0.001 },
    });
  });

  it.each([
    { relativeTolerance: 1e-10 },
    { absoluteTolerance: 1e-12 },
    { algorithm: "newton", fallback: "newton" },
    { algorithm: "newton", lbfgs: {} },
    { algorithm: "coordinate" },
    { maxIterations: 0 },
    { maxIterations: 2_147_483_648 },
    { maxIterations: 1.5 },
    { fallback: "flat" },
    { lbfgs: { historySize: 0 } },
    { lbfgs: { initAlpha: Infinity } },
    { lbfgs: { tolObj: 0 } },
    { lbfgs: { tolRelObj: -1 } },
    { lbfgs: { tolGrad: NaN } },
    { lbfgs: { tolRelGrad: 0 } },
    { lbfgs: { tolParam: -1 } },
    { lbfgs: { absoluteTolerance: 1e-12 } },
  ])("rejects obsolete, inapplicable, and unrepresentable settings: %j", async (input) => {
    const failure = await Effect.runPromise(Effect.flip(decodeLinearOptimizer(input)));

    expect(failure).toBeInstanceOf(InputValidationError);
    expect(failure.input).toBe("options");
  });
});
