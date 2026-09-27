# TauriWrap — Google Summer of Code

**Próximo ciclo:** GSoC 2027 (aplicações de org: jan-fev 2027)  
**Situação atual:** projeto ainda não existe — ciclo 2026 já encerrou (orgs aplicaram jan/fev 2026)

---

## Como o GSoC funciona para nós

No GSoC existem dois papéis:

| Papel | Quem | O que faz |
|---|---|---|
| **Contributor** | Dev novato | Propõe projeto para org existente, recebe stipend |
| **Mentor Org** | Projeto open source | Define ideias de projeto, recebe contributors, recebe stipend por contributor aceito |

**Nosso caminho:** ser **Mentor Org** — TauriWrap como organização mentora recebendo contribuidores pagos pelo Google para construir features.

---

## Stipends (o Google paga os contributors, não a org)

| Tamanho do projeto | Mínimo | Máximo |
|---|---|---|
| Small (90h) | $750 | $1.650 |
| Medium (175h) | $1.500 | $3.300 |
| Large (350h) | $3.000 | $6.600 |

Valor ajustado por PPP do país do contributor. Brasil recebe menos que EUA pelo mesmo projeto.
A org recebe um **pequeno stipend fixo** por contributor aceito (valor não divulgado, ~$500).

**Ou seja:** Google paga contributors para trabalhar no TauriWrap. Nós mentoreamos e o projeto cresce com mão de obra paga externamente.

---

## Requisitos para ser Mentor Org

| Requisito | Status atual | O que fazer |
|---|---|---|
| **Projeto open source ativo** | ❌ Não existe ainda | Criar repo e começar |
| **18+ meses de histórico** | ❌ Precisa de tempo | Criar agora → elegível jan/2028 |
| **Licença OSI aprovada** | ✅ MIT planejada | Declarar no repo |
| **Comunidade ativa** | ❌ Zero | Stars, issues, PRs, discussions |
| **Mínimo 2 mentores** | ❌ Só Jonathan | Recrutar 1 co-mentor da comunidade Tauri |
| **Lista de ideias de projeto** | ❌ Não existe | Documentar features que contributors podem implementar |
| **Atividade regular** | ❌ Não existe | Commits, releases, changelog |
| **Aplicação aprovada pelo Google** | ❌ | Submeter em jan-fev 2027 |

---

## O que projetos aprovados têm em comum

Analisando os 184 orgs aceitas no GSoC 2026:

- **Histórico real:** projetos com 2-5 anos de atividade pública consistente
- **Comunidade mensurável:** issues respondidas, PRs mergeados de externos, discussions ativas
- **Ideas list clara:** cada ideia tem escopo definido, dificuldade, tecnologia, e mentor nomeado
- **Documentação de contribuição:** CONTRIBUTING.md, roadmap público, setup em minutos
- **Releases regulares:** pelo menos 1 release a cada 2-3 meses
- **Presença além do GitHub:** blog, Twitter/X, Discord/Slack da comunidade

---

## Roadmap para GSoC 2027

```
Set/2026 — Dez/2026  (4 meses)
  ✓ Criar repo público MIT
  ✓ PoC funcional: CLI wrappando URL → binário
  ✓ 3-5 releases incrementais
  ✓ README + CONTRIBUTING + roadmap público
  ✓ Publicar no npm

Jan/2027 — Mar/2027  (3 meses)
  ✓ 50+ GitHub stars (tração mínima)
  ✓ 10+ issues externas (comunidade começando)
  ✓ Recrutar co-mentor (contribuidor Tauri na EU ou BR)
  ✓ Escrever ideas list para GSoC

Fev/2027
  → Submeter aplicação de Mentor Org (janela: jan-fev 2027)

Mai/2027
  → Contributors selecionados começam
  → Google paga contributors para implementar features do TauriWrap
```

---

## Ideas list (features que contributors poderiam implementar)

Documentar antes da aplicação — Google exige lista detalhada:

| Ideia | Tamanho | Tecnologia | Dificuldade |
|---|---|---|---|
| osxcross integration — build macOS a partir de Linux | Large | Rust, Docker, osxcross | Alta |
| Security pipeline — URL scan + SAST antes do build | Large | Python, Semgrep, Playwright | Alta |
| wrap.config.json schema + validação + docs | Medium | TypeScript, JSON Schema | Média |
| Auto-update integrado (Tauri updater) | Medium | Rust, Tauri | Média |
| Templates por vertical (dashboard, chatbot, tool) | Small | TypeScript, Tauri | Baixa |
| CI/CD GitHub Actions integration | Small | YAML, GitHub Actions | Baixa |

---

## NLnet vs GSoC — qual perseguir primeiro

| | NLnet | GSoC |
|---|---|---|
| **Prazo próximo** | 3 nov 2026 ✅ | jan-fev 2027 |
| **Precisa de histórico** | Não obrigatório | Sim — 18 meses |
| **Valor** | €20-30k direto | Contributors pagos externamente |
| **O que entrega** | Dinheiro para construir | Mão de obra para crescer |
| **Prioridade** | **1ª** | **2ª** |

**Estratégia:** usar grant NLnet para construir o projeto (4 meses) → projeto tem histórico → submeter GSoC 2027 como org já estabelecida.

---

## Referências

- [GSoC Timeline 2026](https://developers.google.com/open-source/gsoc/timeline)
- [Como funciona para orgs](https://summerofcode.withgoogle.com/how-it-works)
- [Org applications 2026 (referência para 2027)](https://opensource.googleblog.com/2026/01/mentor-org-applications-for-google-summer-of-code-2026-open-through-feb-3.html)
