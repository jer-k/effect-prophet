import { Option, Predicate, Tracer } from "effect";
import { expect } from "vitest";

/** Record real Effect spans without an exporter or module mocks. */
export const makeRecordingTracer = () => {
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

/** Assert safe attributes, ended spans, direct parents and containment over an integration trace. */
export const assertEndedTrace = (spans: ReadonlyArray<Tracer.Span>) => {
  expect(spans.length).toBeGreaterThan(0);

  for (const span of spans) {
    expect(span.attributes.size).toBe(0);
    expect(Predicate.isTagged(span.status, "Ended")).toBe(true);

    if (!Predicate.isTagged(span.status, "Ended")) throw new Error("Unended span");

    if (Option.isSome(span.parent)) {
      const parentId = span.parent.value.spanId;
      const parent = spans.find((candidate) => candidate.spanId === parentId);

      if (parent === undefined || !Predicate.isTagged(parent.status, "Ended"))
        throw new Error("Missing or unended parent");

      expect(span.traceId).toBe(parent.traceId);
      expect(span.status.startTime >= parent.status.startTime).toBe(true);
      expect(span.status.endTime <= parent.status.endTime).toBe(true);
    }
  }
};
