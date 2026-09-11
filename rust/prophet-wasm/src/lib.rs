use wasm_bindgen::prelude::wasm_bindgen;

/// Calculates the arithmetic mean of a borrowed numeric slice.
///
/// Returns `NaN` for an empty slice. When called from JavaScript, `wasm-bindgen`
/// copies the source `Float64Array` into WASM linear memory before constructing
/// the borrowed Rust slice.
#[must_use]
#[wasm_bindgen]
pub fn mean(values: &[f64]) -> f64 {
    values.iter().sum::<f64>() / values.len() as f64
}

#[cfg(test)]
mod tests {
    use super::mean;

    #[test]
    fn calculates_the_arithmetic_mean() {
        assert_eq!(mean(&[1.0, 2.0, 6.0, 7.0]), 4.0);
    }

    #[test]
    fn returns_the_only_value_for_a_single_element() {
        assert_eq!(mean(&[42.5]), 42.5);
    }

    #[test]
    fn returns_nan_for_an_empty_slice() {
        assert!(mean(&[]).is_nan());
    }
}
