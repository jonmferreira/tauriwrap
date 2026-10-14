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

# Cross-compile Windows (NSIS -setup.exe) — Tauri v2: target MSVC via cargo-xwin.
# Ref: https://v2.tauri.app/distribute/windows-installer/
RUN apt-get update && apt-get install -y --no-install-recommends \
    nsis \
    clang \
    lld \
    llvm \
    && rm -rf /var/lib/apt/lists/*
# O pacote clang do Debian não cria o binário `clang-cl` (é um modo do clang,
# acionado pelo nome). O cargo-xwin o exige como compilador C para o target MSVC.
RUN ln -s /usr/bin/clang /usr/bin/clang-cl
RUN rustup target add x86_64-pc-windows-msvc
RUN cargo install --locked cargo-xwin

# O NSIS do Debian é 3.08 e não inclui os headers que o template do Tauri 2.12
# usa (Win/RestartManager.nsh). Sobrepõe os Include/ do NSIS 3.11.
# Camada após o cargo-xwin de propósito, para preservar o cache dele.
RUN apt-get update && apt-get install -y --no-install-recommends unzip \
    && rm -rf /var/lib/apt/lists/* \
    && curl -fsSL -o /tmp/nsis311.zip "https://downloads.sourceforge.net/project/nsis/NSIS%203/3.11/nsis-3.11.zip" \
    && unzip -q /tmp/nsis311.zip -d /tmp \
    && cp -r /tmp/nsis-3.11/Include/* /usr/share/nsis/Include/ \
    && rm -rf /tmp/nsis311.zip /tmp/nsis-3.11

# Template do projeto Tauri (versionado no repo).
WORKDIR /build
COPY template/ /build/template/

# Script de build — contrato: env TAURIWRAP_CONFIG + volume /out.
COPY build.sh /usr/local/bin/build.sh
RUN chmod +x /usr/local/bin/build.sh

ENTRYPOINT ["/usr/local/bin/build.sh"]
