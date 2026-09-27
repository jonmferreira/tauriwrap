# TauriWrap — Oportunidade de Negócio

**Data:** 2026-09-22

---

## Tamanho do mercado endereçável

| Segmento | Referência | Estimativa |
|---|---|---|
| Devs que usam Pake (GPL, excluídos do comercial) | 61k stars → ~10% pagaria por MIT hosted | ~6.000 potenciais |
| Devs Electron buscando alternativa leve | Electron: 115k stars, downloads/semana em milhões | Enorme, conversão baixa |
| Times que precisam de desktop wrapper sem DevOps | SaaS pequeno, ferramenta interna, produto B2B | Foco inicial |

**Cenário conservador:** 200 clientes pagantes × $19/mês médio = **$3.800 MRR**  
**Cenário realista (18 meses):** 800 clientes × $24/mês = **$19.200 MRR**

---

## Modelo de receita

### Hosted Build (core)

| Plano | Preço | Público |
|---|---|---|
| Free | $0 | 5 builds/mês, Linux apenas |
| Starter | $9/mês | 30 builds, Linux + Windows |
| Pro | $29/mês | 100 builds, todos os SOs + codesigning |
| Team | $79/mês | 500 builds + CI/CD automático + página release |

### Receitas complementares (Fase 2)

| Fonte | Modelo |
|---|---|
| Templates premium | Pack por vertical ($19 único) |
| White-label | Time usa infra com domínio próprio ($199/mês) |
| Enterprise SLA | Contrato anual com suporte dedicado |

---

## Custo de operação (com osxcross — sem Mac Mini)

| Item | Custo/mês |
|---|---|
| VPS 8GB (API + workers Linux/Windows) | $40 |
| Cloudflare R2 (artefatos) | $0 até 10GB |
| Resend (notificações) | $0 até 3k emails |
| **Total fixo** | **~$40/mês** |

Break-even: **3 clientes Starter** ou **2 clientes Pro**.

---

## Vantagens competitivas sustentáveis

1. **MIT** — único na categoria com ergonomia de 1 comando
2. **Hosted build** — ninguém oferece isso para Tauri hoje
3. **osxcross** — cross-compile macOS em Linux (aprendizado do AppBundler)
4. **Pipeline de segurança** — URL scan + SAST antes do build (diferencial enterprise)
5. **Open core** — CLI gratuito cria audiência orgânica para o pago

---

## Riscos e mitigações

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Pake lança versão MIT | Média | Hosted build + segurança pipeline são irreproduzíveis em dias |
| AppBundler expande para webapps | Baixa | Foco deles é Julia/Rust nativo — linguagens diferentes |
| Tauri muda API e quebra builds | Alta (minor) | Fixar versão por plano; upgrade opt-in |
| Mercado pequeno demais | Média | Validar com landing page antes de construir infra |

---

## Estratégia de lançamento

```
Semana 1-2:   Landing page + lista de espera (meta: 100 emails)
Semana 3-4:   CLI MIT publicado no npm
Mês 2:        10 primeiros clientes atendidos manualmente (validar WTP)
Mês 3:        MVP hosted build automatizado
Mês 6:        GitHub Sponsors + Tidelift após tração
```
