# How close are the results?

::: info Outline
This page is an outline. The numbers will come from a clean benchmark run once the remaining
alignment work is finished.
:::

## How we test

- Python Prophet 1.4.0, pinned and unmodified
- Both libraries get the same input files and run on the same machine
- Every forecast row, trend and component is compared
- Stored Python results are also checked on every pull request

## Results by feature

- Table: feature area, number of test cases, largest forecast difference as a share of the data's
  range
- Areas: linear trend and changepoints, seasonality, events, regressors, multiplicative effects,
  flat trend, growth with a ceiling, cross-validation

## Why the numbers aren't exactly zero

- Both libraries search for the best-fitting model and stop when it's "close enough"
- Tiny rounding differences can shift where that search stops
- Python itself gives slightly different answers on Intel and ARM computers

## Known exceptions

- Cases where we return an error and Python returns an invalid (NaN) forecast
