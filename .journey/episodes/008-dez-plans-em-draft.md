---
title: EP-008 - 10 plans em draft pra um site pessoal
status: refinando
type: cronologico
metadata:
  owner: journey-writer
  created_at: 2026-05-13 17:10
  updated_at: 2026-05-13 20:15
  tags:
    - episode
    - cronologico
    - planejamento
    - sdd
    - superengenharia
    - plans
  era: v3.2
  lentes:
    - metodo
    - oferta
  sources:
    sessions:
      - id: 004c64b5-b8ae-48c7-afce-ad8ef97dd5a4
        date: 2026-05-13
        relevance: primary
        summary: criacao dos 10 planos via ast-plan-writer + decisao de absorver roadmap.md
    commits:
      - a656013
    files:
      - .claude/plans/
      - .claude/plans/PLAN-000-desktop/post-v1-candidates.md
    last_review: 2026-05-13 20:15
---

# EP-008 — 10 plans em draft pra um site pessoal

## Gancho

Antes de escrever a primeira linha de codigo da v1 do site, foram criados dez planos em `.claude/plans/`, cada um com tasks populadas, todos em estado draft (commit `a656013`, 2026-05-13).

Dez. Para um site pessoal.

A pergunta inevitavel: superengenharia ou metodo?

## Contexto

Apos o reset, a `docs/` consolidada e a camada `.claude/` podada e adaptada, a frente seguinte era planejar a v1 do site. Em vez de pular direto para implementacao, o Vitor pediu (sessao `004c64b5`):

> "Vai ser em `.claude/plans` e cada plano vai ser criado usando a skill `ast-plan-writer`. A criacao dos planos e complexa e grande, cada plano precisa analisar os arquivos do projeto, criar um bom plano, popular ele, criar as tasks, popular elas e deixar tudo em draft pra poder ser refinado depois. Temos que fazer esse processo 10 vezes, uma para cada plano sem atropelar as coisas, pra manter a qualidade."

A instrucao explicita "sem atropelar as coisas, pra manter a qualidade" foi a pista do que estava em jogo.

## Os 10 planos criados (+1 carry-over)

| # | Plano | Status | Owner | Objetivo curto |
|---|---|---|---|---|
| 001 | `PLAN-001-fundacao-documental` | **concluida** | docs-foundation | Camada documental inicial em `docs/` + `CLAUDE.md`. Estrutura final flat (divergiu da proposta inicial em subpastas). Insumos legados absorvidos. |
| 002 | `PLAN-002-bootstrap-tecnico` | draft | app-foundation | Base tecnica do Next.js: estrutura de `src/` (`features/`, `integrations/`, `shared/`, `content/`), aliases `@/*`, estilos globais minimos (`reset.css`, `tokens.css`), `src/content/site.ts`. |
| 003 | `PLAN-003-design-base-layout` | draft | design-system | Layout raiz, header, footer, container, section, heading + componentes editoriais base (tag, status badge, card) em CSS Modules. |
| 004 | `PLAN-004-integracao-notion` | draft | notion-integration | Cliente Notion server-only, `databases.ts`, queries reutilizaveis, mappers para `TextPost` e `Project`, renderer minimo de blocos textuais. Sustenta PLAN-005, 006 e 007. |
| 005 | `PLAN-005-home-institucionais` | draft | site-shell | Paginas institucionais: `/` Home, `/sobre`, `/galeria` hub, `/cursos`. Casca publica usando `siteConfig` + componentes compartilhados. |
| 006 | `PLAN-006-jardim-digital` | draft | garden | Area central do produto (ADR-003): `/jardim` listagem + `/jardim/[slug]` detalhe. Consome `TextPost` via PLAN-004. UI propria (`text-post-card`, `maturity-badge`, `text-post-list`). |
| 007 | `PLAN-007-projetos` | draft | projects | Portfolio contextual: `/projetos` listagem + `/projetos/[slug]` detalhe. Consome `Project` via PLAN-004. Projetos comunicam problema, contexto, papel, decisoes, aprendizados. |
| 008 | `PLAN-008-galeria-v1` | draft | gallery | Quatro subrotas: `videos`, `livros`, `cultura`, `viagens`. Foco em estrutura e estado vazio claro; dados podem ser estaticos ou parciais. Prioridade: Videos > Livros > Cultura > Viagens. |
| 009 | `PLAN-009-seo-acabamento` | draft | editorial-polish | Metadata global, metadata dinamica por slug (`[slug]`), Open Graph, twitter, locale, themeColor, revisao de estados vazios e `not-found`. |
| 010 | `PLAN-010-validacao-release` | draft | release | Fechamento: `npm run lint`, `npm run build`, `npx tsc --noEmit`, revisao de exposicao de secrets, conferencia docs vs implementacao, deploy. Encaminha para `ast-release-manager`. |
| 000 | `PLAN-000-desktop` (carry-over) | pendente | agents-studio | Desktop temporario do LLM. Recebeu `roadmap.md` (fases 7-12) e candidatos pos-v1 absorvidos. Guarda PLAN-011 a PLAN-015+ como pistas exploratorias. |

### Cadeia de dependencias entre planos

```
PLAN-001 (docs)  ✓ concluida
   ↓
PLAN-002 (bootstrap tecnico)
   ↓
PLAN-003 (design base) ──┐
                          ↓
                       PLAN-004 (integracao Notion)
                          ↓
              ┌───────────┼───────────┐
              ↓           ↓           ↓
        PLAN-005     PLAN-006     PLAN-007
       (home/inst.) (jardim)    (projetos)
                          ↓
                       PLAN-008 (galeria)
                          ↓
                       PLAN-009 (SEO/polish)
                          ↓
                       PLAN-010 (release)
```

PLAN-000 fica fora do grafo: carry-over que nao bloqueia v1.

### Candidatos pos-v1 em PLAN-000-desktop

Material absorvido de `docs/roadmap.md` (fases 7-12) e `docs/plans/index.md`, ambos removidos apos consolidacao. Sao pistas exploratorias, sem dossie, sem owner, sem escopo fechado:

- `PLAN-011-experiencia-leitura-avancada` — layout refinado, indice lateral, scroll spy;
- `PLAN-012-filtros-navegacao-tematica` — filtros por tipo, tag, maturidade;
- `PLAN-013-renderer-blocos-notion-avancado` — callout, code highlight, embeds, toggle, columns, equacao;
- `PLAN-014-backlinks-conteudos-relacionados` — backlinks automaticos, hubs tematicos;
- e outros (lista cresce conforme ideias surgem).

Regra explicita: "promover para `.claude/plans/PLAN-NNN-slug/` so quando houver decisao de iniciar a frente; remover candidato que perder sentido apos v1".

## Conflito

Investir tanto trabalho em planos antes de codigo encara duas suspeitas legitimas:

1. superengenharia: um site pessoal nao precisa de dez planos. Tres ou quatro chegariam;
2. risco de paralisia: planejar muito antes de codar pode atrasar a v1 indefinidamente.

A tensao real nao era essa. A tensao era: este projeto pessoal vale como laboratorio de um metodo que vai virar oferta publica? Se sim, planejar muito tem destino: cada plano nao serve so a v1 do site, serve tambem como prova viva de que SDD funciona em escala pequena.

## Virada

Decisoes tomadas durante a populacao dos planos revelam o criterio:

- **absorver `docs/roadmap.md` integralmente nos planos e remover.** Ter roadmap separado quando os planos sao a fonte de verdade vira ruido. O `roadmap.md` nao foi parcialmente migrado: foi totalmente absorvido. Fases 1-6 viraram PLAN-001 a PLAN-010; fases 7-12 foram para `PLAN-000-desktop/post-v1-candidates.md`. Nada perdido, nada duplicado;
- **manter cursos na v1 mesmo sem cursos prontos.** Estrutura ja existe no Notion (ate com fake possivel para testar), escopo nao pode ser reduzido so por falta de conteudo atual. Decisao registrada em PLAN-005;
- **reaproveitar `PLAN-000-desktop` como plano carry-over.** PLAN-000 ja existia desde **2026-04-21 — duas semanas antes do reset**, criado durante a fase `codex_experiment` como desktop operacional do LLM. Sobreviveu ao reset (assim como Notion como CMS, ver EP-004) e ganhou nova funcao: container para post-v1 candidates. Carry-over como conceito antecedeu a virada metodologica; foi reaproveitado em vez de recriado;
- **atribuir owner funcional a cada plano** (`docs-foundation`, `app-foundation`, `design-system`, `notion-integration`, `site-shell`, `garden`, `projects`, `gallery`, `editorial-polish`, `release`). Distribuicao por dominio do sistema, nao decoracao;
- **encaminhar release tecnico para `ast-release-manager`** (PLAN-010 explicita isso). Plano nao reinventa o que skill ja faz.

Cada decisao reforcou o mesmo principio: planejar muito agora paga por si mesmo se o planejamento virar material reutilizavel. Plano nao e bibliografia. E artefato.

## Aprendizado

Tres aprendizados se destacam:

1. **plano e fonte de verdade, roadmap e retrato defasado.** Quando os dois coexistem, o roadmap perde rapidamente. Decisao: manter so o que o agente vai consultar de verdade. Absorcao integral evita que o roadmap volte a aparecer como zumbi;
2. **carry-over explicito evita escopo escondido.** `plan-000-desktop` virou container para tudo que e bom mas nao cabe na v1. Sem isso, ideias boas viram divida silenciosa em comentarios soltos;
3. **planejamento como artefato publico.** Se o projeto vai virar vitrine de SDD, o conjunto de planos em draft e parte do produto. Nao e overhead, e demonstracao do metodo.

Aprendizado meta: superengenharia nao se mede pela quantidade de artefatos, e pela razao entre artefato e uso. Dez planos para uma v1 isolada e superengenharia. Dez planos como prototipo do framework Agents Studio aplicado a um projeto real e proporcao saudavel.

Aprendizado meta sobre owner: atribuir owner funcional desde o draft (e nao no fim) muda como o agente le o plano. Owner ja sinaliza a fronteira do dominio; reduz a zona cinzenta entre planos vizinhos (ex: `garden` vs `projects` vs `gallery`).

## Possivel conteudo publico

- Formato sugerido: estudo de caso + thread + modulo de curso
- Titulo possivel: "Dez planos antes de uma linha de codigo: superengenharia ou prototipo?"
- Promessa: como decidir se vale a pena investir em planejamento detalhado em projeto pequeno
- Publico: devs montando produtos pessoais ou indie hackers experimentando SDD

## Perguntas abertas

- [ ] Em que momento da execucao da v1 sera honesto avaliar se os dez planos pagaram seu custo?
- [ ] Quais sao os indicadores objetivos de que o carry-over (`plan-000-desktop`) virou cemiterio em vez de buffer saudavel?
- [ ] Quando uma ideia em `plan-000-desktop` deve ser promovida a plano proprio? Que sinal vai indicar?
- [ ] PLAN-001 ja saiu como `concluida`. Quanto tempo cada plano restante vai levar do draft ao concluido?

## Fragmentos aproveitaveis

> "Sem atropelar as coisas, pra manter a qualidade."

> Plano nao e bibliografia, e artefato.

> Superengenharia nao se mede pela quantidade de artefatos, mas pela razao entre artefato e uso.

> Roadmap absorvido integralmente nao deixa zumbi. Migracao parcial deixa.

> Owner funcional desde o draft reduz zona cinzenta entre planos vizinhos.

## Commits relacionados

- `a656013` (2026-05-13): consolida planos v1 em `.claude/plans/` e remove insumos legados. **Commit-chave do episodio**. Marca a absorcao integral do `roadmap.md`.

Plus PLAN-000-desktop ja existia desde 2026-04-21 — anterior ao reset, criado durante `codex_experiment`. Sobreviveu como artefato carry-over.
