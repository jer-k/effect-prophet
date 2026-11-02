import { readFile, writeFile } from "node:fs/promises";

import {
  countryHolidayImportsPath,
  renderCountryHolidayImports,
} from "./country-holiday-imports.ts";

// Regenerates the per-country import map from the calendar manifest after calendars change.
const projectRoot = new URL("../", import.meta.url);

const manifest: { readonly countries: Readonly<Record<string, { readonly file: string }>> } =
  JSON.parse(await readFile(new URL("calendars/manifest.json", projectRoot), "utf8"));

await writeFile(
  new URL(countryHolidayImportsPath, projectRoot),
  renderCountryHolidayImports(manifest.countries),
);
