import { Predicate, Tracer } from "effect";

/** Collect real native spans without exporters, sleeps or module mocks. */
export const collectTestSpans = () => {
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

type EndedSpanStatus = Extract<Tracer.SpanStatus, { readonly _tag: "Ended" }>;

/** Return a span's ended status or fail the test when the span is still open. */
export const requireEndedSpan = (span: Tracer.Span): EndedSpanStatus => {
  if (!Predicate.isTagged("Ended")(span.status)) {
    throw new Error(`Expected ${span.name} to have ended`);
  }

  return span.status;
};
