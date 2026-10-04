import { Effect } from "effect";
import { fit, prophetFittingBackendLayer } from "effect-prophet";

// A typo: the timestamp is not a full UTC ISO string.
const history = [
  { timestamp: "2025-01-01", value: 10 },
  { timestamp: "2025-01-02T00:00:00.000Z", value: 12 },
];

const message = await Effect.runPromise(
  fit(history).pipe(
    Effect.as("fitted"),
    // Every failure has a `_tag`, so you can handle each kind separately.
    Effect.catchTag("InputValidationError", (error) =>
      Effect.succeed(`Bad input (${error.input}): ${error.message}`),
    ),
    Effect.catchTag("FittingError", (error) =>
      Effect.succeed(`Could not fit (${error.reason}): ${error.message}`),
    ),
    Effect.provide(prophetFittingBackendLayer),
  ),
);

console.log(message);
