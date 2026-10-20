# syntax=docker/dockerfile:1.12

FROM node:26.7.0-bookworm-slim@sha256:4db36457f406501e6f608802e5da617e5fbd0e80b75901b6a09de1ae5a667d32 AS node

FROM rust:1.98.1-bookworm@sha256:9a73a5088750b4c95158ab26629c854c3d6fc4b173cb7bc8079ad252d8ed7bfa

LABEL org.effect-prophet.fixtures=true

COPY --from=node /usr/local/ /usr/local/

RUN rustup target add wasm32-unknown-unknown \
    && cargo install wasm-pack --version 0.15.0 --locked \
    && npm install --global npm@11.12.1 \
    && rm -rf /usr/local/cargo/registry /root/.npm

WORKDIR /workspace

COPY package.json package-lock.json ./
RUN npm ci

# Only WASM build inputs invalidate the expensive Rust build; other source edits skip it.
COPY rust-toolchain.toml ./
COPY tools/prepare-wasm-package.ts ./tools/
COPY rust/prophet-wasm/Cargo.toml rust/prophet-wasm/Cargo.lock ./rust/prophet-wasm/
COPY rust/prophet-wasm/.cargo ./rust/prophet-wasm/.cargo
COPY rust/prophet-wasm/src ./rust/prophet-wasm/src
COPY rust/prophet-wasm/third-party ./rust/prophet-wasm/third-party

# Reuse compilation state without baking a fresh Cargo target tree into every image.
# Cargo judges freshness by mtime and COPY keeps the context's mtimes, so a cache last
# written by another checkout could look newer than these sources. Touch them first.
RUN --mount=type=cache,id=fixtures-cargo-target,target=/workspace/rust/prophet-wasm/target,sharing=locked \
    --mount=type=cache,id=fixtures-cargo-registry,target=/usr/local/cargo/registry,sharing=locked \
    find rust/prophet-wasm/src -type f -exec touch {} + \
    && npm run build:wasm

COPY . .

CMD ["npm", "exec", "--", "vitest", "run", "--dir", "integration/tests/prophet-1.4.0"]
