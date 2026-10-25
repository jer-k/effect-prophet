import { Schema } from "effect";

import type { SeasonalityLayout } from "./seasonality";

/** Supported composition mode for seasonal, event, and regressor components. */
export type ComponentMode = "additive" | "multiplicative";

/** Runtime schema for a component composition mode. */
export const ComponentModeSchema = Schema.Literals(["additive", "multiplicative"]);

/** Encode a component mode for the mixed Rust/WASM protocol. */
export const componentModeCode = (mode: ComponentMode): 0 | 1 => (mode === "additive" ? 0 : 1);

/** Per-coefficient mode codes for seasonal columns followed by additional columns. */
export const coefficientModeCodes = (
  seasonalities: SeasonalityLayout,
  features: {
    readonly layout: {
      readonly components: ReadonlyArray<{
        readonly mode: ComponentMode;
        readonly coefficientCount: number;
      }>;
      readonly coefficientCount: number;
    };
  },
): Float64Array => {
  const modes = new Float64Array(seasonalities.coefficientCount + features.layout.coefficientCount);
  let offset = 0;

  for (const component of seasonalities.components) {
    modes.fill(
      componentModeCode(component.definition.mode),
      offset,
      offset + component.coefficientCount,
    );
    offset += component.coefficientCount;
  }

  for (const component of features.layout.components) {
    modes.fill(componentModeCode(component.mode), offset, offset + component.coefficientCount);
    offset += component.coefficientCount;
  }

  return modes;
};
