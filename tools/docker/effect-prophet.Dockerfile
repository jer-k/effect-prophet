# syntax=docker/dockerfile:1.12

FROM node:26.7.0-bookworm-slim@sha256:4db36457f406501e6f608802e5da617e5fbd0e80b75901b6a09de1ae5a667d32 AS node

FROM rust:1.98.1-bookworm@sha256:9a73a5088750b4c95158ab26629c854c3d6fc4b173cb7bc8079ad252d8ed7bfa

COPY --from=node /usr/local/ /usr/local/

RUN rustup target add wasm32-unknown-unknown \
    && cargo install wasm-pack --version 0.15.0 --locked \
    && npm install --global npm@11.12.1 \
    && rm -rf /usr/local/cargo/registry /root/.npm

WORKDIR /workspace

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build:wasm

CMD ["npm", "exec", "--", "vitest", "run", "--dir", "integration/tests/prophet-1.4.0"]
