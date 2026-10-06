# Handling errors

Every operation can fail in a few specific, named ways. Each error has a `_tag`, so you can
handle the ones you care about and let the rest through.

<<< @/snippets/errors.ts

```txt [Output]
Bad input (observations): Expected a valid canonical UTC timestamp (for example, 2024-01-01T00:00:00.000Z)
  at [0]["timestamp"]
```

## The errors you may see

| Error                         | Meaning                                                                                         | Typical fix                                             |
| ----------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `InputValidationError`        | The data or options are malformed: a bad timestamp, a missing field, an unknown option          | The message and `issues` point to the exact field       |
| `FittingError`                | The model couldn't be fitted to this data. `reason` says why, e.g. `insufficient-observations`. | Check for too few rows or all-identical timestamps      |
| `PredictionError`             | A forecast couldn't be computed for a row                                                       | Check that future rows have every field the model needs |
| `ModelSerializationError`     | Saved model data couldn't be read                                                               | Make sure it was saved by the same version              |
| `EvaluationError` and friends | Cross-validation, search or holdout checks failed                                               | `reason` and the wrapped `cause` explain which step     |

## Without Effect

If you just `await Effect.runPromise(...)` and an error happens, the promise rejects with that
error, so a normal `try`/`catch` works:

```ts
try {
  const model = await Effect.runPromise(
    fit(history).pipe(Effect.provide(prophetFittingBackendLayer)),
  );
} catch (error) {
  console.error(error);
}
```
