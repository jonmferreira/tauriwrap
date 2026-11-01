# TauriWrap

> MIT-licensed CLI to package any web app or URL as a native desktop application using Tauri — without installing Rust.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/tauriwrap)](https://www.npmjs.com/package/tauriwrap)

---

## The problem

[Pake](https://github.com/tw93/Pake) proved the market (61k+ stars) — wrap any URL into a desktop app with Tauri's native WebView (~10MB vs Electron's ~150MB).

**But Pake is GPL-3.0.** Commercial projects and organizations with open source policies that prohibit copyleft cannot use it.

No MIT-licensed alternative with the same ergonomics exists.

---

## The solution

```bash
npx tauriwrap https://myapp.com --name MyApp
# → MyApp.exe / MyApp.dmg / MyApp.deb
```

No Rust installation required. No Tauri setup. One command.

---

## Features v1.0

| Feature | Status |
|---|---|
| MIT license | ✅ |
|  No Rust required (hermetic Docker build) | ✅ provado |
| Native WebView (poucos MB vs ~150MB Electron) | ✅ |
| Linux `.deb` | ✅ provado (v0.1.0) |
| Windows `.exe` (NSIS) | ✅ provado (v0.2.0) |
| Linux AppImage | 🚧 planned (M2) |
| macOS `.dmg` via CI runner | 🚧 planned (M3) |
| `wrap.config.json` declarative | 🚧 planned (M1) |
| Hosted build / security pipeline | 🔭 roadmap (pós-grant) |

---

## AI disclosure

This project code was implemented with substancial help from a coding assistant :
- Claude Sonnet 4.6 
- Claude Opus 4.8

## Status

🚧 **Under development** — funded by [NLnet Restack](https://nlnet.nl/restack/)

- [✅] v0.1.0 — CLI wraps URL → `.deb` on Linux (proven)
- [✅] v0.2.0 — Windows `.exe` (NSIS) cross-compiled from Linux (proven)
- [ ] M1 — `wrap.config.json` (JSON Schema) + npm publish
- [ ] M2 — Linux `.deb` + AppImage + reproducible builds + test matrix
- [ ] M3 — macOS `.dmg` via native CI runner (build + codesigning + notarization)
- [ ] M4 — docs + examples + GitHub Actions template + tests + v1.0

---

## Quick start (coming soon)

```bash
npx tauriwrap <url> --name <AppName>
```

---

## License

MIT — see [LICENSE](LICENSE)
