import { wasmLinearTrendFittingBackendLayer } from "../../src/internal/wasm-linear-trend-backend";
import { registerFittingBackendConformance } from "./fitting-backend-conformance";

registerFittingBackendConformance("Rust/WASM linear-trend", wasmLinearTrendFittingBackendLayer);
