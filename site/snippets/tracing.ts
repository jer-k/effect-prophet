import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";
import { OtlpSerialization, OtlpTracer } from "effect/observability";
import { fit, predict, prophetFittingBackendLayer } from "effect-prophet";

// Send spans to any OpenTelemetry collector that accepts OTLP over HTTP, such as Jaeger.
const tracing = OtlpTracer.layer({
  url: "http://localhost:4318/v1/traces",
  resource: { serviceName: "sales-forecast" },
}).pipe(Layer.provide([OtlpSerialization.layerJson, FetchHttpClient.layer]));

const history = Array.from({ length: 90 }, (_, day) => ({
  timestamp: new Date(Date.UTC(2025, 0, 1 + day)).toISOString(),
  value: 100 + day * 0.5 + 10 * Math.sin((2 * Math.PI * day) / 7),
}));

const nextWeek = Array.from({ length: 7 }, (_, offset) =>
  new Date(Date.UTC(2025, 0, 91 + offset)).toISOString(),
);

const forecast = await Effect.runPromise(
  Effect.gen(function* () {
    const model = yield* fit(history);

    return yield* predict(model, nextWeek);
  }).pipe(
    // Your own span. Effect Prophet's spans appear underneath it.
    Effect.withSpan("weekly-sales-forecast"),
    Effect.provide(prophetFittingBackendLayer),
    Effect.provide(tracing),
  ),
);

console.log(forecast.length);
