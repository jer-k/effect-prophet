"""Independent linear MAP endpoint diagnostics from the pinned Stan executable.

Tooling only: neither the TypeScript library nor its WASM runtime imports Python.
Keep dummy parameters in the executable's internal state; folding public slope
would change its prior density and invalidate this evidence.
"""

import math

import numpy as np


def linear_optimizer_evidence(model):
    """Return proportional density and constrained infinity-norm KKT residual."""
    if model.growth != "linear":
        raise ValueError("Linear optimizer evidence requires a linear model")

    features, priors, _, _ = model.make_all_seasonality_features(model.history)
    data = {
        "T": len(model.history), "S": len(model.changepoints_t),
        "K": features.shape[1], "tau": model.changepoint_prior_scale,
        "trend_indicator": 0, "y": model.history["y_scaled"].tolist(),
        "t": model.history["t"].tolist(), "t_change": model.changepoints_t.tolist(),
        "cap": np.zeros(len(model.history)).tolist(), "X": features.to_numpy().tolist(),
        "sigmas": list(priors),
        "s_a": model.train_component_cols["additive_terms"].tolist(),
        "s_m": model.train_component_cols["multiplicative_terms"].tolist(),
    }
    params = {
        key: (float(model.params[key][0][0]) if key in ("k", "m", "sigma_obs")
              else model.params[key][0].tolist())
        for key in ("k", "m", "delta", "sigma_obs", "beta")
    }
    result = model.stan_backend.model.log_prob(
        params=params, data=data, jacobian=False, sig_figs=12,
    ).iloc[0]
    gradient = result.iloc[1:].to_numpy().copy()
    gradient[2 + len(params["delta"])] /= params["sigma_obs"]

    for index, delta in enumerate(params["delta"]):
        if delta == 0:
            gradient[2 + index] = max(abs(gradient[2 + index]) - 1 / data["tau"], 0)

    objective = -float(result.iloc[0])
    stationarity = float(np.max(np.abs(gradient)))
    if not math.isfinite(objective) or not math.isfinite(stationarity):
        raise ValueError("Stan returned non-finite linear optimizer evidence")

    return {"objective": objective, "stationarityResidual": stationarity}
