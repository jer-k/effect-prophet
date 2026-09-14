# syntax=docker/dockerfile:1.12

FROM ghcr.io/astral-sh/uv:0.8.15@sha256:a5727064a0de127bdb7c9d3c1383f3a9ac307d9f2d8a391edc7896c54289ced0 AS uv

FROM python:3.12.11-slim-bookworm@sha256:519591d6871b7bc437060736b9f7456b8731f1499a57e22e6c285135ae657bf7

ARG TARGETPLATFORM

ENV EFFECT_PROPHET_REFERENCE_BASE_IMAGE="python:3.12.11-slim-bookworm@sha256:519591d6871b7bc437060736b9f7456b8731f1499a57e22e6c285135ae657bf7" \
    EFFECT_PROPHET_TARGET_PLATFORM="${TARGETPLATFORM}" \
    MPLCONFIGDIR=/tmp/matplotlib \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy \
    UV_PROJECT_ENVIRONMENT=/opt/effect-prophet-reference

COPY --from=uv /uv /uvx /usr/local/bin/

WORKDIR /workspace

COPY tools/prophet/.python-version tools/prophet/pyproject.toml tools/prophet/uv.lock ./tools/prophet/

RUN uv sync --project tools/prophet --frozen --no-dev --no-install-project

COPY tools/prophet/generate.py tools/prophet/reference.json ./tools/prophet/

ENTRYPOINT ["/opt/effect-prophet-reference/bin/python", "tools/prophet/generate.py"]
