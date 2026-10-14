#!/usr/bin/env bash
set -euo pipefail

# Contrato com o CLI (src/cli/build.ts):
#   TAURIWRAP_CONFIG — JSON do tauri.conf.json (build.frontendDist = URL remota)
#   TAURIWRAP_TARGET — plataforma-alvo: "linux" (default) ou "windows"
#   volume /out      — destino do artefato gerado
: "${TAURIWRAP_CONFIG:?env TAURIWRAP_CONFIG ausente}"
TARGET="${TAURIWRAP_TARGET:-linux}"

WORK=/build/work
rm -rf "$WORK"
cp -r /build/template "$WORK"

# tauri::generate_context! lê o tauri.conf.json em tempo de COMPILAÇÃO,
# então a config precisa estar no lugar antes do cargo tauri build.
printf '%s' "$TAURIWRAP_CONFIG" > "$WORK/src-tauri/tauri.conf.json"

cd "$WORK/src-tauri"
mkdir -p /out

case "$TARGET" in
  linux)
    cargo tauri build
    cp target/release/bundle/deb/*.deb /out/
    ;;
  windows)
    # Cross-compile Windows via cargo-xwin (target MSVC) → instalador NSIS.
    cargo tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc
    cp target/x86_64-pc-windows-msvc/release/bundle/nsis/*-setup.exe /out/
    ;;
  *)
    echo "TAURIWRAP_TARGET inválido: $TARGET (use linux ou windows)" >&2
    exit 1
    ;;
esac
