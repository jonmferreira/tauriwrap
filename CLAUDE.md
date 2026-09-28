# CLAUDE.md — TauriWrap

Ao iniciar sessão aqui: leia este arquivo. Pasta de implementação é `src/` — o resto fica fora do repo.

---

## O que é

CLI MIT que transforma qualquer URL ou webapp em app desktop nativo usando Tauri.  
Alternativa ao Pake (61k stars, GPL-3.0) — mesmo ergonomia, sem restrição comercial.

```bash
npx tauriwrap https://myapp.com --name MyApp
# → MyApp.exe / MyApp.dmg / MyApp.deb  (sem instalar Rust)
```

---

## Implementação — `src/`

O que entra no repo público:

```
src/
├── cli/
│   ├── index.ts        ← entry point: npx tauriwrap <url> [options]
│   ├── config.ts       ← lê e valida wrap.config.json
│   └── build.ts        ← dispara container Docker hermético
├── container/
│   ├── Dockerfile      ← ambiente hermético com Tauri + Rust + osxcross
│   └── build.sh        ← script interno do container
└── schema/
    └── wrap.config.json ← JSON Schema do arquivo de configuração
```

### PoC mínimo (semana 2 — 29/set–5/out)

**Objetivo:** `npx tauriwrap https://example.com --name TestApp` gera `.deb` no Linux.

```
1. CLI lê URL + nome do argumento
2. Gera tauri.conf.json mínimo na memória
3. Roda `docker run tauriwrap-builder` com os parâmetros
4. Container executa `cargo tauri build --target x86_64-unknown-linux-gnu`
5. Copia .deb para ./dist/
```

### Desafios técnicos a resolver

| Desafio | Abordagem |
|---|---|
| Hermetic container (sem state do host) | Docker multi-stage com versões fixadas |
| osxcross (macOS .dmg do Linux) | `joseluisq/rust-linux-darwin-builder` como base |
| wrap.config.json → tauri.conf.json | Mapeamento declarativo TypeScript |
| Codesigning DMG | Mac Mini físico (milestone 7-8) |

---

## Ordem de build

```
v0.1  CLI wrappa URL → .deb Linux
v0.2  osxcross: .dmg a partir de Linux
v0.3  wrap.config.json schema completo
v0.4  Hosted build MVP (FastAPI + Docker)
v1.0  Codesigning DMG + MSIX + docs
```

---

## Contexto externo (fora do repo)

| Pasta | Conteúdo |
|---|---|
| `../propostas/tauriwrap/diretrizes/` | spec.md · benchmark.md · oportunidade-negocio.md |
| `../propostas/tauriwrap/metas/` | nlnet-submissao.md · gsoc-submissao.md |
| `../propostas/tauriwrap/proposta/` | LaTeX EN/ES/PT-BR + diagramas Mermaid |

**Grant:** NLnet Restack €50k — deadline **3 nov/2026**  
**Financiamento completo:** `C:\Projetos\dev-hub\financiamento-oportunidades.md`
