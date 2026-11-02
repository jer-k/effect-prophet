import { Effect, Exit, Option, Tracer } from "effect";
import { describe, expect, it } from "vitest";

import {
  isProphetWasmModuleInitialized,
  loadProphetWasmModule,
} from "../../src/internal/prophet-wasm-module";
import {
  attemptWasmFitting,
  loadWasmForFitting,
  loadWasmForPrediction,
} from "../../src/internal/wasm-backend";
import { collectTestSpans, requireEndedSpan } from "./tracing-test-helpers";

const coldStartOf = (span: Tracer.Span | undefined) =>
  span === undefined
    ? undefined
    : Object.fromEntries(span.attributes)["effect_prophet.wasm.cold_start"];

describe("WASM load tracing", () => {
  // Vitest isolates each test file, so this file owns the process's first real WASM load. Running
  // it with `runSync` also checks that the real first load needs no asynchronous step.
  it("marks only the load that initializes the generated module as a cold start", () => {
    const { spans, tracer } = collectTestSpans();

    const fitLoad = <Bindings>(name: string, loader: () => Bindings) =>
      loadWasmForFitting(loader, 4, "load failed").pipe(Effect.withSpan(name));

    Effect.runSync(
      Effect.gen(function* () {
        const real = loadProphetWasmModule;

        expect(isProphetWasmModuleInitialized()).toBe(false);

        yield* fitLoad("boundary.injected", () => "injected-bindings");
        yield* fitLoad("boundary.first", real);
        yield* fitLoad("boundary.repeat", real);
        yield* loadWasmForPrediction(real, 0, "load failed").pipe(
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
    const { spans, tracer } = collectTestSpans();

    await Effect.runPromise(
      attemptWasmFitting(() => 1, 4, { message: "execute failed" }).pipe(
        Effect.withSpan("boundary.execute"),
        Effect.withTracer(tracer),
      ),
    );

    const failure = await Effect.runPromise(
      Effect.flip(
        loadWasmForPrediction(
          () => {
            throw new Error("missing bindings");
          },
          0,
          "load failed",
        ).pipe(Effect.withSpan("boundary.failed-load"), Effect.withTracer(tracer)),
      ),
    );

    const failedLoad = spans.find((span) => span.name === "boundary.failed-load");

    expect(failure.backendPhase).toBe("load");
    expect(coldStartOf(spans.find((span) => span.name === "boundary.execute"))).toBeUndefined();
    expect(coldStartOf(failedLoad)).toBeUndefined();
    expect(failedLoad && Exit.isFailure(requireEndedSpan(failedLoad).exit)).toBe(true);
  });

  it("classifies a rejected asynchronous load as a failed load", async () => {
    const { spans, tracer } = collectTestSpans();
    const cause = new Error("fetch failed");

    const failure = await Effect.runPromise(
      Effect.flip(
        loadWasmForFitting(() => Promise.reject(cause), 4, "load failed").pipe(
          Effect.withSpan("boundary.rejected-load"),
          Effect.withTracer(tracer),
        ),
      ),
    );

    const rejectedLoad = spans.find((span) => span.name === "boundary.rejected-load");

    expect(failure).toMatchObject({
      reason: "backend-failure",
      backendPhase: "load",
      observationCount: 4,
      message: "load failed",
    });
    expect(failure.cause).toBe(cause);
    expect(coldStartOf(rejectedLoad)).toBeUndefined();
    expect(rejectedLoad && Exit.isFailure(requireEndedSpan(rejectedLoad).exit)).toBe(true);
  });
});

describe("WASM load scheduling", () => {
  it("keeps a synchronous load synchronous", () => {
    expect(Effect.runSync(loadWasmForPrediction(() => "bindings", 0, "load failed"))).toBe(
      "bindings",
    );
  });

  it("waits for an asynchronous load within the caller's span", async () => {
    const { spans, tracer } = collectTestSpans();

    const loaded = await Effect.runPromise(
      loadWasmForFitting(() => Promise.resolve("bindings"), 4, "load failed").pipe(
        Effect.withSpan("boundary.async-load"),
        Effect.withTracer(tracer),
      ),
    );

    const asyncLoad = spans.find((span) => span.name === "boundary.async-load");

    expect(loaded).toBe("bindings");
    expect(coldStartOf(asyncLoad)).toBe(false);
    expect(asyncLoad && Exit.isSuccess(requireEndedSpan(asyncLoad).exit)).toBe(true);
  });
});
