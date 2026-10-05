---
layout: home

hero:
  name: Effect Prophet
  text: Forecasting for TypeScript
  tagline: Give it your history. Get back a forecast you can explain, with the trend, weekly and yearly patterns, and holidays each broken out.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: See examples
      link: /examples/trend
    - theme: alt
      text: Compare with Python Prophet
      link: /python/accuracy

features:
  - title: Prophet's model, in TypeScript
    details: Uses the same model as Prophet, the forecasting library from Meta, and is tested against Python Prophet 1.4.0 so the results match.
  - title: No Python, no servers
    details: The math runs in WebAssembly inside your Node.js process. Install one npm package and you are ready to go.
  - title: Explainable forecasts
    details: Every forecast is split into its trend, seasonal patterns, holidays and extra factors, so you can see why it says what it says.
  - title: Tracing built in
    details: Every fit and forecast is traced out of the box. Send spans to Jaeger or any OpenTelemetry backend and see what each step did and how long it took. Spans carry counts and labels, never your data.
    link: /guide/tracing
    linkText: Learn about tracing
  - title: Built on Effect
    details: Errors are typed values, not surprise exceptions. Works naturally in Effect apps and is easy to use from plain async code.
---

## A forecast in a few lines

<<< @/snippets/quick-start.ts

```txt [Output]
2025-04-01 137.2
2025-04-02 145.5
2025-04-03 153.8
2025-04-04 156.2
2025-04-05 151.3
2025-04-06 143.2
2025-04-07 138.3
```
