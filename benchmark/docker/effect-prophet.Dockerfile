# syntax=docker/dockerfile:1.12

FROM node:26.7.0-bookworm-slim@sha256:4db36457f406501e6f608802e5da617e5fbd0e80b75901b6a09de1ae5a667d32 AS node

RUN npm install --global npm@11.12.1 && npm cache clean --force

FROM node AS runtime-dependencies

WORKDIR /workspace

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM rust:1.98.1-bookworm@sha256:9a73a5088750b4c95158ab26629c854c3d6fc4b173cb7bc8079ad252d8ed7bfa AS build

ARG TARGETARCH

COPY --from=node /usr/local/ /usr/local/

RUN rustup target add wasm32-unknown-unknown \
    && cargo install wasm-pack --version 0.15.0 --locked \
    && rm -rf /usr/local/cargo/registry /root/.npm

WORKDIR /workspace

COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

# Only package build inputs invalidate the expensive Rust/WASM build.
COPY rust-toolchain.toml rolldown.config.ts tsconfig.json tsconfig.build.json ./
COPY tools/clean-build.ts tools/prepare-wasm-package.ts ./tools/
COPY rust/prophet-wasm/Cargo.toml rust/prophet-wasm/Cargo.lock ./rust/prophet-wasm/
COPY rust/prophet-wasm/src ./rust/prophet-wasm/src
COPY rust/prophet-wasm/third-party ./rust/prophet-wasm/third-party
COPY src ./src

# Reuse compilation state without baking a fresh Cargo target tree into every image.
RUN --mount=type=cache,id=benchmark-cargo-target-${TARGETARCH},target=/workspace/rust/prophet-wasm/target,sharing=locked \
    --mount=type=cache,id=benchmark-cargo-registry-${TARGETARCH},target=/usr/local/cargo/registry,sharing=locked \
    npm run build \
    && mkdir -p /build-tools \
    && rustc --version > /build-tools/rustc-version.txt \
    && wasm-pack --version > /build-tools/wasm-pack-version.txt

FROM runtime-dependencies AS runtime

LABEL org.effect-prophet.benchmark=true

COPY --from=build /workspace/dist ./dist
COPY --from=build /workspace/wasm ./wasm
COPY --from=build /build-tools ./build-tools
COPY benchmark/case.ts benchmark/effect-case.ts benchmark/evaluation.ts benchmark/result.ts benchmark/report.ts benchmark/report-cli.ts benchmark/uncertainty.ts ./benchmark/
COPY benchmark/adapters/effect-prophet.ts ./benchmark/adapters/

CMD ["node", "benchmark/adapters/effect-prophet.ts"]
