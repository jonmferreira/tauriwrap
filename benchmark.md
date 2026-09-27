# TauriWrap — Benchmark Comparativo

**Data:** 2026-09-22

---

## Comparativo direto

| Critério | **Electron** | **Pake** | **AppBundler** | **Neutralinojs** | **TauriWrap** |
|---|---|---|---|---|---|
| **Licença** | MIT | GPL-3.0 ⚠️ | MIT | MIT | MIT ✅ |
| **Tamanho app** | 300MB+ | ~10MB | N/A (packager) | ~2MB | ~10MB |
| **Input** | Código fonte | URL / dist/ | App compilado | Código fonte | URL / dist/ |
| **Hosted build** | Não | GitHub Actions (manual) | Não | Não | **Sim** ✅ |
| **Instala Rust?** | Não | Sim (local) | Sim (Julia) | Não | **Não** ✅ |
| **Cross-compile macOS** | N/A | Não | Sim (osxcross) | Não | **Sim** (osxcross) ✅ |
| **Pipeline segurança** | Não | Não | Não | Não | **Sim** ✅ |
| **Codesigning** | Manual | Não | Sim | Não | Sim (hosted) |
| **Auto-update** | Manual | Não | Não | Manual | **Sim** ✅ |
| **Uso comercial** | Livre | Bloqueado | Livre | Livre | **Livre** ✅ |
| **Stars GitHub** | N/A | 61k | <100 | 7k | 0 (novo) |
| **Target** | Dev geral | Dev web (pessoal) | Dev Julia/Rust | Dev geral | **Dev web (comercial)** |

---

## Gap real do mercado

```
Pake provou o mercado (61k stars) mas tem 1 problema crítico: GPL-3.0
Nenhuma alternativa tem:
  ✗ MIT + ergonomia de 1 comando
  ✗ Hosted build (sem instalar Rust)
  ✗ Pipeline de segurança integrado
  ✗ Cross-compile macOS a partir de Linux
```

TauriWrap preenche exatamente esse gap.

---

## Aprendizados absorvidos do AppBundler (NLnet-funded)

AppBundler provou em produção que cross-compile macOS via osxcross funciona.
Isso elimina a necessidade de Mac Mini no hosted build — maior custo do modelo original.

**Impacto no modelo econômico:**

| | Sem osxcross | Com osxcross |
|---|---|---|
| Build macOS | Mac Mini ~$100/mês | Container Linux ~$5/mês |
| Margem plano Pro ($29) | Negativa | Positiva desde o 1º cliente |

---

## Posicionamento

```
Pake        → pessoal, GPL, 1 comando, sem hosted
Electron    → enterprise, MIT, enorme, sem Rust necessário
TauriWrap   → comercial, MIT, 1 comando, hosted build, segurança
```
