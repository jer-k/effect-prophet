import { Effect, Exit, Option, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
  isProphetWasmModuleInitialized,
  loadProphetWasmModule,
} from "../../src/internal/prophet-wasm-module";
import { attemptWasmFitting, attemptWasmPrediction } from "../../src/internal/wasm-backend";
import { requireEndedSpan } from "./tracing-test-helpers";

const collectSpans = () => {
  const spans: Array<Tracer.Span> = [];

  const tracer = Tracer.make({
    span: (options) => {
      const span = new Tracer.NativeSpan(options);
      spans.push(span);

      return span;
    },
  });

  return { spans, tracer };
};

const coldStartOf = (span: Tracer.Span | undefined) =>
  span === undefined
    ? undefined
    : Object.fromEntries(span.attributes)["effect_prophet.wasm.cold_start"];

describe("WASM load tracing", () => {
  // Vitest isolates each test file, so this file owns the process's first real WASM load.
  it("marks only the load that initializes the generated module as a cold start", async () => {
    const { spans, tracer } = collectSpans();

    const fitLoad = <Bindings>(name: string, loader: () => Bindings) =>
      attemptWasmFitting(loader, 4, { phase: "load", message: "load failed" }).pipe(
        Effect.withSpan(name),
      );

    await Effect.runPromise(
      Effect.gen(function* () {
        const real = loadProphetWasmModule;

        expect(isProphetWasmModuleInitialized()).toBe(false);

        yield* fitLoad("boundary.injected", () => "injected-bindings");
        yield* fitLoad("boundary.first", real);
        yield* fitLoad("boundary.repeat", real);
        yield* attemptWasmPrediction(real, 0, { phase: "load", message: "load failed" }).pipe(
          Effect.withSpan("boundary.predict"),
        );
      }).pipe(Effect.withSpan("job"), Effect.withTracer(tracer)),
    );

    const job = spans.find((span) => span.name === "job");

    expect(coldStartOf(spans.find((span) => span.name === "boundary.injected"))).toBe(false);
    expect(coldStartOf(spans.find((span) => span.name === "boundary.first"))).toBe(true);
    expect(coldStartOf(spans.find((span) => span.name === "boundary.repeat"))).toBe(false);
    expect(coldStartOf(spans.find((span) => span.name === "boundary.predict"))).toBe(false);
    expect(coldStartOf(job)).toBeUndefined();

    for (const span of spans.filter((span) => span.name.startsWith("boundary."))) {
      expect(span.traceId).toBe(job?.traceId);
      expect(span.parent.pipe(Option.getOrUndefined)?.spanId).toBe(job?.spanId);
      expect(Exit.isSuccess(requireEndedSpan(span).exit)).toBe(true);
    }
  });

  it("does not mark execute steps or failed loads", async () => {
    const { spans, tracer } = collectSpans();

    await Effect.runPromise(
      attemptWasmFitting(() => 1, 4, { phase: "execute", message: "execute failed" }).pipe(
        Effect.withSpan("boundary.execute"),
        Effect.withTracer(tracer),
      ),
    );

    const failure = await Effect.runPromise(
      Effect.flip(
        attemptWasmPrediction(
          () => {
            throw new Error("missing bindings");
          },
          0,
          { phase: "load", message: "load failed" },
        ).pipe(Effect.withSpan("boundary.failed-load"), Effect.withTracer(tracer)),
      ),
    );

    const failedLoad = spans.find((span) => span.name === "boundary.failed-load");

    expect(failure.backendPhase).toBe("load");
    expect(coldStartOf(spans.find((span) => span.name === "boundary.execute"))).toBeUndefined();
    expect(coldStartOf(failedLoad)).toBeUndefined();
    expect(failedLoad && Exit.isFailure(requireEndedSpan(failedLoad).exit)).toBe(true);
  });
});
