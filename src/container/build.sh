#!/usr/bin/env bash
set -euo pipefail

# Contrato com o CLI (src/cli/build.ts):
#   TAURIWRAP_CONFIG — JSON do tauri.conf.json (build.frontendDist = URL remota)
#   volume /out      — destino do(s) .deb gerado(s)
: "${TAURIWRAP_CONFIG:?env TAURIWRAP_CONFIG ausente}"

WORK=/build/work
rm -rf "$WORK"
cp -r /build/template "$WORK"

# tauri::generate_context! lê o tauri.conf.json em tempo de COMPILAÇÃO,
# então a config precisa estar no lugar antes do cargo tauri build.
printf '%s' "$TAURIWRAP_CONFIG" > "$WORK/src-tauri/tauri.conf.json"

cd "$WORK/src-tauri"
cargo tauri build

mkdir -p /out
cp target/release/bundle/deb/*.deb /out/
