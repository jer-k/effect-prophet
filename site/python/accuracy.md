# How close are the results?

Effect Prophet is checked against Python Prophet 1.4.0, feature by feature. Here's where each
trend type stands:

| Trend                                                  | Status                                        | Evidence                                       |
| ------------------------------------------------------ | --------------------------------------------- | ---------------------------------------------- |
| [Linear](../examples/trend)                            | <Badge type="tip" text="matches Python" />    | [Linear growth benchmarks](/benchmarks/linear) |
| [Flat](../examples/flat-trend)                         | <Badge type="tip" text="matches Python" />    | [Flat growth benchmarks](/benchmarks/flat)     |
| [Growth with a ceiling](../examples/saturating-growth) | <Badge type="warning" text="being checked" /> | Coming soon                                    |

Linear and flat growth are ready to use. That covers changepoints, seasonality, events,
regressors, multiplicative effects, uncertainty ranges, cross-validation and choosing settings. The
benchmarks for [linear](/benchmarks/linear) and [flat](/benchmarks/flat) growth show every case: its
input, both libraries' forecasts side by side, and how long each took.

## How we test

1. Both libraries get the **same input file**: the same history rows and the same future dates.
2. They run with the **same settings**, either both on their defaults or both with the same options.
3. Each runs in its own container on the same machine. Python Prophet is version 1.4.0,
   unmodified.
4. We compare **every forecast row**, the trend, each seasonal pattern, event and regressor, and
   the fitted noise level.
5. A case matches when every number agrees within a small tolerance. Only matching cases are timed.

Separately, every pull request checks the library against stored Python Prophet results for each
feature.

## Why the numbers aren't exactly zero

Fitting a model means searching for the best parameters, and both libraries stop searching once
they're close enough. Tiny rounding differences between computers can shift exactly where that
search stops, so forecasts often agree to many decimal places rather than all of them. Python
Prophet itself gives slightly different answers on Intel and ARM computers for the same reason.

## Known exceptions

A few inputs are handled differently on purpose. For example, if every row has the same
timestamp, there's no way to draw a trend through them, so we return an error where Python
Prophet returns `NaN` forecasts. Each exception is listed in the
[benchmarks](/benchmarks/linear#intentional-differences) and in
[What's different](./differences).
