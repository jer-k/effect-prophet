# Linear growth cases

Every fitted linear case runs both libraries on their default optimizers. The shared settings and
fit-quality gate live in `controls.ts`.

| File                                            | Cases                                                                                  |
| ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| `../defaults.ts`                                | `fit(history)` against `Prophet().fit(df)` with no options on either side              |
| `public-api.json`                               | Fixed-equation prediction, explicit/automatic changepoints and mixed-feature fits      |
| `edge-cases.ts`                                 | Sorted, unsorted and repeated timestamps, uncertainty, evaluation and zero-span probes |
| `../mixed-map.ts`                               | Absmax/minmax scaling and mixed additive/multiplicative components                     |
| `../../holidays`, `regressors`, `seasonalities` | One focused case each                                                                  |

The uncertainty and evaluation suites derive their linear cases from these sources.

Zero-span probes put every row on one timestamp. A trend over zero time is undefined, so Effect
returns a `FittingError`; they are expected to fail the comparison and are never timed.

`scenarios.json` inventories the public calls these cases compare. Run all linear cases with:

```sh
npm run benchmark -- --case linear-defaults-small --case map-explicit-break-small
```

The docs site renders the retained `linear-growth` baseline at `/benchmarks/linear`.
