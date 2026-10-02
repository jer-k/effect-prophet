//! Stan-compatible optimization and reference-aligned numerical primitives.

pub mod lbfgs;
pub mod linear_optimizer;
pub mod optimizer;

pub(crate) mod math;
pub(crate) mod reductions;
