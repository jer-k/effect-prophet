# Growth with a ceiling

Some things can't grow forever. A service in a town of 10,000 people can't have more than
10,000 users. Growth slows as it approaches that limit, in an S-shaped curve.

Use `growth: "logistic"` and give every row a `capacity`: the most the value could possibly be.

<<< @/snippets/saturating-growth.ts

```txt [Output]
2025-05-31 9820
2025-06-30 9975
2025-07-30 9997
2025-08-29 10000
2025-09-28 10000
```

The forecast levels off at the capacity instead of growing forever.

## Adding a floor

You can also set a minimum with `floor`. If the history has floors, every future row needs one
too.

<<< @/snippets/saturating-floor.ts

## Things to know

- **The capacity is your judgement.** The model doesn't work it out for you. It is usually a
  market size, a physical limit or a plan.
- **Capacity can change over time.** Give each row its own value, for example if the town grows.
- **Capacity must be greater than the floor** on every row.
- Seasonal patterns and events are added on top of the trend, so the final forecast can go
  slightly above the capacity or below the floor.
