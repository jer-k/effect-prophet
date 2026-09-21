import { Predicate, type Tracer } from "effect";

type EndedSpanStatus = Extract<Tracer.SpanStatus, { readonly _tag: "Ended" }>;

/** Return a span's ended status or fail the test when the span is still open. */
export const requireEndedSpan = (span: Tracer.Span): EndedSpanStatus => {
  if (!Predicate.isTagged("Ended")(span.status)) {
    throw new Error(`Expected ${span.name} to have ended`);
  }

  return span.status;
};
