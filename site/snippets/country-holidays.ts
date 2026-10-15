import { Effect } from "effect";
import {
  decodeFittedModel,
  encodeFittedModel,
  fit,
  inspectCountryHolidays,
  predict,
  prophetFittingBackendLayer,
} from "effect-prophet";

// Country-level provider defaults, with registered aliases such as UK and USA.
const calendar = await Effect.runPromise(inspectCountryHolidays({ country: "USA" }, [2024, 2060]));

console.log(calendar.country, calendar.provider, calendar.horizon);

console.log(calendar.occurrences.length, "occurrences; completeness is not verified");

const history = Array.from({ length: 80 }, (_, index) => ({
  timestamp: new Date(Date.UTC(2024, 0, index + 1, 12)).toISOString(),
  value: 20 + index * 0.03 + Math.sin(index) * 0.15 + (index === 0 ? 5 : 0),
}));

const model = await Effect.runPromise(
  fit(history, { countryHolidays: { country: "US" } }).pipe(
    Effect.provide(prophetFittingBackendLayer),
  ),
);

// Only the selected country's complete snapshot is embedded in the saved model.
const encoded = await Effect.runPromise(encodeFittedModel(model));

const restored = await Effect.runPromise(decodeFittedModel(JSON.parse(JSON.stringify(encoded))));

const forecasts = await Effect.runPromise(predict(restored, ["2025-01-01T12:00:00.000Z"]));

console.log(forecasts[0]?.events.find((event) => event.name === "New Year's Day"));

// Known missing coverage requires an explicit opt-in. This does not invent dates.
const partial = await Effect.runPromise(
  inspectCountryHolidays({ country: "IN", coverage: "allow-known-gaps" }, [2036]),
);

for (const issue of partial.issues) {
  console.log(issue.disposition, issue.reason, issue.rule);
}
