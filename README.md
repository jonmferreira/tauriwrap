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

## Features

| Feature | TauriWrap | Pake | Electron |
|---|---|---|---|
| MIT license | ✅ | ❌ GPL | ✅ |
| No Rust required | ✅ | ❌ | ✅ |
| Native WebView (~10MB) | ✅ | ✅ | ❌ |
| Hosted build service | ✅ | ❌ | ❌ |
| Cross-compile macOS from Linux | ✅ | ❌ | ❌ |
| Security pipeline | ✅ | ❌ | ❌ |

---

## Status

🚧 **Under development** — funded by [NLnet Restack](https://nlnet.nl/restack/)

- [ ] v0.1 — CLI wraps URL → `.deb` on Linux
- [ ] v0.2 — osxcross cross-compile → `.dmg` from Linux
- [ ] v0.3 — `wrap.config.json` declarative schema
- [ ] v0.4 — hosted build MVP
- [ ] v1.0 — codesigning DMG + MSIX + full docs

---

## Quick start (coming soon)

```bash
npx tauriwrap <url> --name <AppName>
```

---

## License

MIT — see [LICENSE](LICENSE)
