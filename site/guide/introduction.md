# What is Effect Prophet?

Effect Prophet forecasts future values of a time series, such as daily sales, website visits or
server load, from its past values.

It is a TypeScript version of [Prophet](https://facebook.github.io/prophet/), a forecasting
library from Meta that is popular because it works well on everyday business data without much
tuning. Effect Prophet uses the same model and is tested against the Python version.

## How a forecast is built

Prophet treats your data as a few simple pieces added together:

| Piece           | What it captures                                  | Example                            |
| --------------- | ------------------------------------------------- | ---------------------------------- |
| **Trend**       | The long-term direction                           | Sales growing 2% a month           |
| **Seasonality** | Patterns that repeat on a schedule                | Busier on weekends, quiet in March |
| **Events**      | One-off or yearly days that behave differently    | Black Friday, a product launch     |
| **Regressors**  | Other things you know that affect the value       | Temperature, ad spend              |
| **Noise**       | Everything left over that the model can't explain | Random day-to-day wobble           |

Because the pieces are kept separate, every forecast tells you not just _what_ it expects but
_why_: how much comes from the trend, how much from the day of the week, and so on.

## When it works well

- You have at least a few weeks of history, ideally a year or more for yearly patterns.
- The data has clear patterns: weekly or yearly cycles, holidays, a trend.
- You want a reasonable forecast quickly, and want to be able to explain it.

## When to look elsewhere

- Very short or very noisy histories with no repeating patterns.
- Problems that depend on many interacting inputs. A general machine-learning model may do better.
- Minute-by-minute data where the next few points depend mostly on the last few.

## Built with AI

Effect Prophet is a port of Prophet's Python library and was built with the help of AI. Because
it is math-heavy, I have done my best to make sure it behaves the same as the original. The
[benchmarks](/benchmarks/linear) and [accuracy comparison](/python/accuracy) show how closely the
results match. If you find a difference, please open an issue.

## Why "Effect"?

The library is built on [Effect](https://effect.website), a TypeScript library for writing
reliable programs. You don't need to know Effect to use this library. The
[five-minute introduction](./effect-basics) covers everything you need.

Effect is also why [tracing](./tracing) comes built in. Every fit and forecast is traced
automatically, ready to send to Jaeger or any OpenTelemetry backend.

Ready? [Make your first forecast.](./getting-started)
