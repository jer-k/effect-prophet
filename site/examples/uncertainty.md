# Uncertainty ranges

A single number is never the whole story. `predictUncertainty` gives a **range** for each
forecast: "between 133 and 140, most likely around 136".

::: tip Benchmarked against Python Prophet
Both libraries simulate ranges with random draws, so individual values never match exactly. The
[uncertainty benchmarks](/benchmarks/uncertainty) check the fitted model behind the ranges against
Python Prophet 1.4.0 on all three trend types, and time the work.
:::

<<< @/snippets/uncertainty.ts

```txt [Output]
2025-04-01 136.5  (80% range 133.1 to 140.1)
2025-04-02 144.7  (80% range 141.2 to 148.4)
2025-04-03 153.0  (80% range 149.6 to 156.8)
2025-04-04 155.5  (80% range 152.0 to 159.1)
2025-04-05 150.7  (80% range 147.2 to 154.3)
2025-04-06 142.5  (80% range 138.9 to 146.0)
2025-04-07 137.6  (80% range 134.4 to 141.3)
```

## How it works

The model simulates many possible futures. In each one, the trend might change direction the way
it did in the past, and day-to-day noise is added. The range covers the middle 80% of those
simulated futures.

| Option          | Default       | Meaning                                                                  |
| --------------- | ------------- | ------------------------------------------------------------------------ |
| `seed`          | required      | Any whole number. The same seed always gives the same ranges.            |
| `samples`       | `1000`        | How many futures to simulate (up to 2,048). More is smoother but slower. |
| `intervalWidth` | `0.8`         | How much of the simulated futures to cover. `0.95` gives a wider range.  |
| `output`        | `"intervals"` | `"samples"` returns every simulated value instead of a range             |

## Working with the raw samples

Use `output: "samples"` to answer questions like "what's the chance we go over 150?":

<<< @/snippets/samples.ts

## Things to know

- **Ranges get wider further out.** The further ahead you forecast, the more the trend could
  change.
- **The ranges reflect trend changes and noise only.** They don't account for uncertainty in the
  seasonal patterns, so treat them as a minimum, not a guarantee.
- **The seed is required** so that results are repeatable. Pick any number and keep it.
