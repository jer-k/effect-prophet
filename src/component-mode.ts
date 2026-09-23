import { Schema } from "effect";

/** Supported composition mode for seasonal, event, and regressor components. */
export type ComponentMode = "additive" | "multiplicative";

/** Runtime schema for a component composition mode. */
export const ComponentModeSchema = Schema.Literals(["additive", "multiplicative"]);

/** Encode a component mode for the mixed Rust/WASM protocol. */
export const componentModeCode = (mode: ComponentMode): 0 | 1 => (mode === "additive" ? 0 : 1);
