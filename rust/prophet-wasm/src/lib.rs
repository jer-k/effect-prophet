pub mod additional_features;
mod compensated_sum;
pub mod flat_map;
pub mod fourier;
pub mod logistic_map;
pub mod map_least_squares;
pub mod map_objective;
pub mod map_uncertainty;
pub mod mixed_map;
pub mod piecewise_linear;
pub mod piecewise_map;
pub mod seasonality;
mod simulation_rng;
pub mod stan;
mod symmetric_eigen;
pub mod target_scaling;
mod wasm;

#[cfg(test)]
mod reference_fixtures;

// Preserve the original public Rust module paths.
pub use stan::{
  lbfgs as stan_lbfgs, linear_optimizer as stan_linear_optimizer, optimizer as stan_optimizer,
};
