"""Pinned public Prophet country-holiday feature and fitted-forecast evidence."""

from __future__ import annotations

import importlib.metadata
from typing import Any, Callable

import numpy as np
import pandas as pd
from prophet import Prophet
from prophet.make_holidays import make_holidays_df


def make_country_holiday_fixture(
    canonical: Callable[[Any], float], fail: Callable[[str], Any],
) -> dict[str, Any]:
    """Use real add_country_holidays and shared fitted-value canonicalization."""

    version = importlib.metadata.version("holidays")
    if version != "0.104":
        fail(f"Country fixture requires holidays 0.104; found {version}")

    def timestamp(value: pd.Timestamp) -> str:
        return value.isoformat(timespec="milliseconds") + "Z"

    def model_for(country: str, growth: str, mode: str, custom: bool) -> Prophet:
        holidays = pd.DataFrame({
            "holiday": ["launch", "launch"],
            "ds": ["2024-01-05", "2025-01-05"],
            "prior_scale": [10.0, 10.0],
        }) if custom else None
        model = Prophet(
            growth=growth, holidays=holidays, holidays_prior_scale=10.0,
            holidays_mode=mode, yearly_seasonality=False,
            weekly_seasonality=False, daily_seasonality=False,
            n_changepoints=0, uncertainty_samples=0,
        )
        model.add_country_holidays(country_name=country)
        return model

    def features(model: Prophet, prediction: pd.DataFrame) -> dict[str, Any]:
        training, priors, _, _ = model.make_all_seasonality_features(model.history)
        future, _, _, _ = model.make_all_seasonality_features(prediction)
        names = sorted(model.train_holiday_names.tolist()) if model.train_holiday_names is not None else []
        columns = [column for column in training.columns if column != "zeros"]
        future_names = set(make_holidays_df(
            year_list=sorted(set(prediction["ds"].dt.year)), country=model.country_holidays,
        )["holiday"])
        return {
            "columnNames": columns,
            "eventNames": names,
            "ignoredCountryNames": sorted(future_names - set(names)),
            "priorScales": [prior for column, prior in zip(training.columns, priors, strict=True) if column != "zeros"],
            "trainingRowMajor": training[columns].to_numpy(dtype=float).ravel().tolist(),
            "predictionRowMajor": future[columns].to_numpy(dtype=float).ravel().tolist(),
        }

    feature_cases = []
    for country, training_year, future_dates, identifier in (
        ("US", 2010, ["2021-06-19", "2021-12-31"], "unseen-juneteenth-and-observed-day"),
        ("SG", 2024, ["2028-01-01", "2028-10-29", "2028-12-25"], "estimated-name-transition"),
        ("CN", 2024, ["2060-01-01", "2060-10-01"], "name-rich-2060"),
        ("BV", 2024, ["2060-01-01"], "deliberately-empty"),
    ):
        model = model_for(country, "flat", "additive", False)
        dates = pd.date_range(f"{training_year}-01-01", periods=4)
        training = pd.DataFrame({"ds": dates, "y": [10.0, 10.1, 9.9, 10.2]})
        model.preprocess(training)
        if country == "SG":
            future_dates = sorted({day.date().isoformat() for day in make_holidays_df(year_list=[2028], country="SG")["ds"]})
        prediction = pd.DataFrame({"ds": pd.to_datetime(future_dates)})
        feature_cases.append({
            "id": identifier, "country": country,
            "observations": [{"timestamp": timestamp(day), "value": value}
                             for day, value in zip(dates, training["y"], strict=True)],
            "predictionTimestamps": [timestamp(day) for day in prediction["ds"]],
            "expected": features(model, prediction),
        })

    fitted_cases = []
    for growth in ("linear", "flat", "logistic"):
        for mode in ("additive", "multiplicative"):
            model = model_for("US", growth, mode, True)
            dates = pd.date_range("2024-01-01", periods=90)
            values = []
            for index in range(len(dates)):
                trend = (10.0 + 60.0 / (1.0 + np.exp(-(index - 40.0) / 25.0))
                         if growth == "logistic" else
                         20.0 + (0.02 * index if growth == "linear" else 0.0))
                holiday = (0.1 * trend if mode == "multiplicative" else 3.0) if index == 0 else 0.0
                launch = (0.04 * trend if mode == "multiplicative" else 1.3) if index == 4 else 0.0
                values.append(canonical(trend + holiday + launch + 0.05 * np.sin(index * 0.8)))
            training = pd.DataFrame({"ds": dates, "y": values})
            prediction = pd.DataFrame({"ds": pd.to_datetime(["2025-01-01", "2025-01-02", "2025-01-05"])})
            if growth == "logistic":
                training["cap"], training["floor"] = 100.0, 0.0
                prediction["cap"], prediction["floor"] = 100.0, 0.0
            model.fit(training, algorithm="Newton", iter=10_000)
            forecast = model.predict(prediction)
            feature_state = features(model, prediction)
            fitted_cases.append({
                "id": f"{growth}-{mode}-country-and-custom", "growth": growth,
                "mode": mode, "country": "US",
                "observations": [{"timestamp": timestamp(day), "value": value,
                                  **({"capacity": 100.0, "floor": 0.0} if growth == "logistic" else {})}
                                 for day, value in zip(dates, values, strict=True)],
                "predictionRows": [{"timestamp": timestamp(day),
                                    **({"capacity": 100.0, "floor": 0.0} if growth == "logistic" else {})}
                                   for day in prediction["ds"]],
                "events": [{"name": "launch", "date": date, "priorScale": 10.0}
                           for date in ("2024-01-05", "2025-01-05")],
                "expected": {
                    **feature_state,
                    "trend": [canonical(value) for value in forecast["trend"]],
                    "value": [canonical(value) for value in forecast["yhat"]],
                    "additive": [canonical(value) for value in forecast["additive_terms"]],
                    "multiplicative": [canonical(value) for value in forecast["multiplicative_terms"]],
                },
                "tolerance": {"absolute": 0.07, "relative": 0.001},
            })

    return {"provider": {"prophet": "1.4.0", "holidays": version},
            "featureCases": feature_cases, "fittedCases": fitted_cases}
