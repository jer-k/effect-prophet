//! Stan-compatible optimization and reference-aligned numerical primitives.

pub mod lbfgs;
pub mod linear_optimizer;
pub mod optimizer;

// Retained only to distinguish the old packetized fitting path in regressions.
#[cfg(test)]
pub(crate) mod eigen_math;
pub(crate) mod math;
pub(crate) mod reductions;
