# syntax=docker/dockerfile:1.12

FROM ghcr.io/astral-sh/uv:0.8.15@sha256:a5727064a0de127bdb7c9d3c1383f3a9ac307d9f2d8a391edc7896c54289ced0 AS uv

FROM python:3.12.11-slim-bookworm@sha256:519591d6871b7bc437060736b9f7456b8731f1499a57e22e6c285135ae657bf7

ENV MPLCONFIGDIR=/tmp/matplotlib \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy \
    UV_PROJECT_ENVIRONMENT=/opt/effect-prophet-benchmark

COPY --from=uv /uv /uvx /usr/local/bin/

WORKDIR /workspace

COPY benchmark/python/.python-version benchmark/python/pyproject.toml benchmark/python/uv.lock ./benchmark/python/
RUN uv sync --project benchmark/python --frozen --no-dev --no-install-project

COPY benchmark ./benchmark

CMD ["/opt/effect-prophet-benchmark/bin/python", "benchmark/adapters/python-prophet.py"]
