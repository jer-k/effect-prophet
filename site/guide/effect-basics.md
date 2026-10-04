# Effect in five minutes

Effect Prophet is built on [Effect](https://effect.website). Here is everything you need to know
to use it, even if you have never used Effect before.

## An Effect is a description of work

Calling `fit(history)` does not fit anything yet. It returns an **Effect**: a value that
describes the work to be done. Nothing happens until you run it.

```ts
const fitting = fit(history); // nothing has happened yet
```

## Running an Effect

The simplest way to run an Effect is `Effect.runPromise`, which returns an ordinary `Promise`:

```ts
const model = await Effect.runPromise(fitting.pipe(Effect.provide(prophetFittingBackendLayer)));
```

If you only use plain `async`/`await` code, this is all you need: wrap each call in
`Effect.runPromise(...)` and `await` it.

## Providing the engine

`fit` needs a forecasting engine, the compiled WebAssembly code that does the math. You supply it
with `Effect.provide(prophetFittingBackendLayer)`. In Effect, a bundle of ready-made services like
this is called a **layer**.

Functions that don't need the engine, such as `predict` and the save/load helpers, can be run
without it.

## Doing several steps at once

To fit and then predict in one go, use `Effect.gen`. Inside it, `yield*` waits for each step,
like `await` does in an `async` function:

```ts
const program = Effect.gen(function* () {
  const model = yield* fit(history);
  const forecast = yield* predict(model, futureDates);

  return forecast;
});

const forecast = await Effect.runPromise(program.pipe(Effect.provide(prophetFittingBackendLayer)));
```

Most examples on this site use this pattern.

## Errors are values

When something goes wrong, for example a malformed timestamp, Effect Prophet doesn't throw a
surprise exception from deep inside. Each operation lists the errors it can fail with, and you
can handle each kind by name. See [Handling errors](../examples/errors).

If you don't handle them, `Effect.runPromise` rejects the promise with the error, just like a
normal `async` function would.

## Want to learn more?

The [Effect documentation](https://effect.website/docs) is a good place to start. None of it is
required to use this library.
