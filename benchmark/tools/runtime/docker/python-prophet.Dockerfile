# syntax=docker/dockerfile:1.12

FROM ghcr.io/astral-sh/uv:0.8.15@sha256:a5727064a0de127bdb7c9d3c1383f3a9ac307d9f2d8a391edc7896c54289ced0 AS uv

FROM python:3.12.11-slim-bookworm@sha256:519591d6871b7bc437060736b9f7456b8731f1499a57e22e6c285135ae657bf7

ENV MPLCONFIGDIR=/tmp/matplotlib \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy \
    UV_PROJECT_ENVIRONMENT=/opt/effect-prophet-benchmark

COPY --from=uv /uv /uvx /usr/local/bin/

LABEL org.effect-prophet.benchmark=true

WORKDIR /workspace

COPY benchmark/tools/runtime/python/.python-version benchmark/tools/runtime/python/pyproject.toml benchmark/tools/runtime/python/uv.lock ./benchmark/tools/runtime/python/
RUN uv sync --project benchmark/tools/runtime/python --frozen --no-dev --no-install-project --no-cache

# Cases, datasets, evidence, and results are bind mounts, not image/build-cache inputs.
COPY benchmark/tools/adapters/python-prophet.py benchmark/tools/adapters/evaluation.py ./benchmark/tools/adapters/
COPY tools/prophet/linear_optimizer_evidence.py ./tools/prophet/

CMD ["/opt/effect-prophet-benchmark/bin/python", "benchmark/tools/adapters/python-prophet.py"]
