import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import { countryHolidayCatalog } from "../../src/internal/country-holiday-catalog";
import { countryHolidayImports } from "../../src/internal/country-holiday-imports";
import {
  countryHolidayImportsPath,
  renderCountryHolidayImports,
} from "../../tools/country-holiday-imports";

const projectRoot = new URL("../../", import.meta.url);

describe("country holiday import map", () => {
  it("matches the catalog; run `npm run calendars:imports` after the calendars change", async () => {
    const committed = await readFile(new URL(countryHolidayImportsPath, projectRoot), "utf8");

    expect(committed).toBe(renderCountryHolidayImports(countryHolidayCatalog.countries));
    expect([...countryHolidayImports.keys()].sort()).toEqual(
      Object.keys(countryHolidayCatalog.countries).sort(),
    );
  });

  it("rejects a file that is not the country's own calendar", () => {
    expect(() => renderCountryHolidayImports({ US: { file: "countries/CA.json" } })).toThrowError(
      "Unexpected country calendar file for US",
    );
    expect(() => renderCountryHolidayImports({ US: { file: "../secrets.json" } })).toThrowError(
      "Unexpected country calendar file for US",
    );
  });
});
