# Trends and changepoints

The trend is the long-term direction of your data. Real trends rarely stay perfectly straight:
a launch, a price change or a new competitor can make growth speed up or slow down. The points
where the trend changes direction are called **changepoints**.

## The default

With no options, the model places 25 possible changepoints evenly across the first 80% of your
history and uses only the ones the data supports. Most changepoints end up with almost no effect.

```ts
fit(history);
```

## Making the trend more or less flexible

`changepointPriorScale` controls how easily the trend can bend:

- **Smaller** (e.g. `0.01`): a smoother trend that ignores short bumps.
- **Larger** (e.g. `0.5`): a trend that follows changes closely, but may overreact to noise.

The default is `0.05`. [Choosing settings](./tuning) shows how to compare values on your own data.

## Example

<<< @/snippets/changepoints.ts

```txt [Output]
automatic: 152.0, 153.5, 155.0, 156.5, 158.0, 159.5, 161.0
explicit:  152.0, 153.5, 155.0, 156.5, 158.0, 159.5, 161.0
```

Both models pick up the faster growth after day 60.

## Automatic changepoints

`{ mode: "auto" }` takes two optional settings:

| Setting | Default | Meaning                                                          |
| ------- | ------- | ---------------------------------------------------------------- |
| `count` | `25`    | How many candidate changepoints to place                         |
| `range` | `0.8`   | How far into the history they may go. `0.9` means the first 90%. |

Keeping `range` below `1` stops the trend from overreacting to the last few days of data.

## Changepoints you already know about

If you know when something changed, list the dates with `{ mode: "explicit", timestamps: [...] }`.
Each date must fall within your history.

::: warning Include `changepoints` whenever you pass `map`
Right now, a `map` option without a `changepoints` field turns changepoints off entirely, giving a
straight-line trend. Until that is fixed, always include `changepoints: { mode: "auto" }` when you
pass `map`, as the example above does.
:::

## Other trend shapes

- [Growth with a ceiling](./saturating-growth), for values that level off at a maximum.
- [Flat trends](./flat-trend), for values that don't grow at all.
