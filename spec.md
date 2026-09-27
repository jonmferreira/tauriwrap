# TauriWrap — Spec

> CLI MIT que transforma qualquer webapp ou URL em app desktop nativo.
> Mesma ergonomia do Pake (61k stars) sem a restrição GPL.
> Camada hosted build = modelo de negócio.

**Criado em:** 2026-09-22  
**Status:** Ideia validada — aguardando início de implementação

---

## Problema

Electron embute Chromium inteiro (~150MB) em cada app.
Pake resolve isso com Tauri + WebView nativo (~10MB) mas é GPL-3.0 — bloqueio para uso comercial.
Instalar Rust + Tauri localmente leva 30-60min e falha em ambientes sem build tools.

## Solução

CLI MIT que:
1. Recebe URL ou pasta `dist/` como input
2. Configura Tauri automaticamente via `wrap.config.json`
3. Gera `.exe` / `.dmg` / `.deb` sem o usuário instalar Rust

Camada hosted: o mesmo fluxo rodando em infra remota — dev não instala nada.

## Stack

| Camada | Tecnologia |
|---|---|
| CLI | Node.js (npx) + Rust (build interno) |
| Empacotamento | Tauri v2 |
| Cross-compile macOS | osxcross em container Linux |
| Hosted build API | FastAPI + Redis + Docker |
| Storage artefatos | Cloudflare R2 |
| Billing | Stripe |

## Modelo open core

```
MIT (público):     npx tauriwrap <url> --name App
                   wrap.config.json declarativo
                   Templates por tipo de app

Pago (hosted):     Build remoto sem instalar Rust
                   CI/CD automático (push → build)
                   Codesigning DMG + MSIX
                   Página de release com badge
                   Pipeline de segurança (URL scan + SAST)
```

## Referências

- Spec completo de negócio: `C:\Projetos\mvp-ideas\tauri-wrap-hosted-build.md`
- Benchmark comparativo: `benchmark.md`
- Oportunidade de negócio: `oportunidade-negocio.md`
- Submissão NLnet: `nlnet-submissao.md`
