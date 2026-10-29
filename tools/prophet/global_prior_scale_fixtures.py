"""Pinned public Prophet evidence for the global seasonality and holiday prior scales."""

from __future__ import annotations

import importlib.metadata
from typing import Any, Callable

import numpy as np
import pandas as pd
from prophet import Prophet


def make_global_prior_scale_fixture(
    canonical: Callable[[Any], float], fail: Callable[[str], Any],
) -> dict[str, Any]:
    """Fit through Prophet's public constructor defaults, never a per-component prior it filled in."""

    version = importlib.metadata.version("holidays")
    if version != "0.104":
        fail(f"Global prior scale fixture requires holidays 0.104; found {version}")

    def timestamp(value: pd.Timestamp) -> str:
        return value.isoformat(timespec="milliseconds") + "Z"

    def component_prior_scales(model: Prophet) -> dict[str, float]:
        """Each component's prior, read from the columns Prophet actually fitted."""

        features, priors, _, _ = model.make_all_seasonality_features(model.history)
        scales: dict[str, float] = {}
        for column, prior in zip(features.columns, priors, strict=True):
            name = column.split("_delim_")[0]
            if name != "zeros" and scales.setdefault(name, float(prior)) != float(prior):
                fail(f"Component {name} has more than one prior scale")
        return dict(sorted(scales.items()))

    def fitted_case(
        identifier: str, model: Prophet, options: dict[str, Any],
        training: pd.DataFrame, prediction: pd.DataFrame, regressors: list[str],
    ) -> dict[str, Any]:
        model.fit(training, algorithm="Newton", iter=10_000)
        forecast = model.predict(prediction)

        def row(frame: pd.DataFrame, index: int) -> dict[str, Any]:
            values = {name: float(frame[name].iloc[index]) for name in regressors}
            return {"regressors": values} if values else {}

        return {
            "id": identifier,
            "options": options,
            "observations": [
                {"timestamp": timestamp(day), "value": float(value), **row(training, index)}
                for index, (day, value) in enumerate(zip(training["ds"], training["y"], strict=True))
            ],
            "predictionRows": [
                {"timestamp": timestamp(day), **row(prediction, index)}
                for index, day in enumerate(prediction["ds"])
            ],
            "expected": {
                "priorScales": component_prior_scales(model),
                "trend": [canonical(value) for value in forecast["trend"]],
                "value": [canonical(value) for value in forecast["yhat"]],
                "additive": [canonical(value) for value in forecast["additive_terms"]],
                "multiplicative": [canonical(value) for value in forecast["multiplicative_terms"]],
            },
            "tolerance": {"absolute": 1e-4, "relative": 0.0},
        }

    # seasonality_prior_scale reaches automatic daily, weekly with only an order, and a custom
    # seasonality without a prior; the ten-day seasonality's own prior wins.
    dates = pd.date_range("2024-01-01", periods=84, freq="6h")
    days = np.arange(len(dates)) / 4.0
    seasonal = pd.DataFrame({
        "ds": dates,
        "y": [canonical(20.0 + 0.05 * day + 1.5 * np.sin(2 * np.pi * day)
                        + 0.8 * np.cos(2 * np.pi * day / 7) + 0.6 * np.sin(2 * np.pi * day / 3)
                        + 0.4 * np.sin(2 * np.pi * day / 10.5) + 0.05 * np.sin(index * 1.7))
              for index, day in enumerate(days)],
    })
    seasonal_model = Prophet(
        seasonality_prior_scale=0.01, yearly_seasonality=False, weekly_seasonality=2,
        daily_seasonality="auto", n_changepoints=0, uncertainty_samples=0,
    )
    seasonal_model.add_seasonality("three-day", period=3.0, fourier_order=1)
    seasonal_model.add_seasonality("ten-day", period=10.5, fourier_order=1, prior_scale=5.0)
    seasonal_case = fitted_case(
        "seasonality-prior-scale",
        seasonal_model,
        {
            "seasonalityPriorScale": 0.01,
            "builtInSeasonalities": {
                "yearly": "off", "weekly": {"mode": "on", "fourierOrder": 2}, "daily": "auto",
            },
            "seasonalities": [
                {"name": "three-day", "periodDays": 3.0, "fourierOrder": 1},
                {"name": "ten-day", "periodDays": 10.5, "fourierOrder": 1, "priorScale": 5.0},
            ],
        },
        seasonal,
        pd.DataFrame({"ds": pd.date_range("2024-01-22", periods=6, freq="9h")}),
        [],
    )

    # holidays_prior_scale reaches holiday rows without a prior, every country holiday and a
    # regressor without a prior; the sale and price priors win.
    dates = pd.date_range("2024-01-01", periods=120)
    promotion = [float((index * 7) % 5) for index in range(len(dates))]
    price = [float(10 + (index * 3) % 4) for index in range(len(dates))]
    holiday_names = {"2024-01-01", "2024-01-15", "2024-02-19"}
    events = [("launch", "2024-01-20", None), ("launch", "2024-03-15", None), ("sale", "2024-02-10", 5.0)]
    event_days = {date for _, date, _ in events}
    holidays = pd.DataFrame({
        "ds": dates,
        "y": [canonical(30.0 + 0.03 * index + (2.5 if day.date().isoformat() in holiday_names else 0.0)
                        + (1.8 if day.date().isoformat() in event_days else 0.0)
                        + 0.4 * promotion[index] - 0.3 * price[index] + 0.1 * np.sin(index * 0.9))
              for index, day in enumerate(dates)],
        "promotion": promotion,
        "price": price,
    })
    holiday_model = Prophet(
        holidays_prior_scale=0.01,
        holidays=pd.DataFrame({
            "holiday": [name for name, _, _ in events],
            "ds": pd.to_datetime([date for _, date, _ in events]),
            "prior_scale": [np.nan if prior is None else prior for _, _, prior in events],
        }),
        yearly_seasonality=False, weekly_seasonality=False, daily_seasonality=False,
        n_changepoints=0, uncertainty_samples=0,
    )
    holiday_model.add_country_holidays(country_name="US")
    holiday_model.add_regressor("promotion")
    holiday_model.add_regressor("price", prior_scale=4.0)
    holiday_case = fitted_case(
        "holidays-prior-scale",
        holiday_model,
        {
            "holidaysPriorScale": 0.01,
            "countryHolidays": {"country": "US"},
            "builtInSeasonalities": {"yearly": "off", "weekly": "off", "daily": "off"},
            "events": [
                {"name": name, "date": date, **({} if prior is None else {"priorScale": prior})}
                for name, date, prior in events
            ],
            "regressors": [{"name": "promotion"}, {"name": "price", "priorScale": 4.0}],
        },
        holidays,
        pd.DataFrame({
            "ds": pd.to_datetime(["2024-05-01", "2025-01-01", "2025-01-20"]),
            "promotion": [1.0, 3.0, 2.0],
            "price": [11.0, 12.0, 10.0],
        }),
        ["promotion", "price"],
    )

    return {"provider": {"prophet": "1.4.0", "holidays": version},
            "fittedCases": [seasonal_case, holiday_case]}
