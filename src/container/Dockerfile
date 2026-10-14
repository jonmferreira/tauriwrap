# Base Debian 12 (bookworm) + Rust — fornece webkit2gtk-4.1, requisito do Tauri v2.
FROM rust:1-bookworm

# Dependências de sistema do Tauri v2 no Linux (Debian/Ubuntu).
RUN apt-get update && apt-get install -y --no-install-recommends \
    libwebkit2gtk-4.1-dev \
    build-essential \
    curl \
    wget \
    file \
    libxdo-dev \
    libssl-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# Tauri CLI v2 (comando `cargo tauri build`).
RUN cargo install tauri-cli --version "^2.0.0" --locked

# Template do projeto Tauri (versionado no repo).
WORKDIR /build
COPY template/ /build/template/

# Script de build — contrato: env TAURIWRAP_CONFIG + volume /out.
COPY build.sh /usr/local/bin/build.sh
RUN chmod +x /usr/local/bin/build.sh

ENTRYPOINT ["/usr/local/bin/build.sh"]
