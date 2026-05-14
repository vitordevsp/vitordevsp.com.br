# Timeline da Jornada

Marcos cronologicos da reconstrucao. Ordem crescente (mais antigo no topo).

Para abertura geral da serie, ver [`episodes/001-introducao.md`](./episodes/001-introducao.md). Para visao completa do repositorio (cinco anos, tres versoes maiores, dois resets totais), ver [`../CHANGELOG.md`](../CHANGELOG.md).

Marco curto. Quando virar episodio, o registro completo fica em `episodes/<nnn>-titulo.md` e o marco aqui aponta para la.

## 2021-05-25 a 2022-03-11 — v1 e v2: anos da base

### O que aconteceu

Cinco meses de v1 (Next.js + Chakra UI + APIs externas para YouTube, Dev.to, GitHub) seguidos por cinco meses de v2 (migracao integral para Notion como CMS + API Routes internas + renderizacao recursiva de blocos do Notion).

Tag `v1.0.0` em 2021-10-14 (`7a5de59`). Tag `v2.0.0` em 2022-03-11 (`f25632d`).

### Por que importa

A v1 ensinou estrutura. A v2 ensinou curadoria — primeira vez que o Vitor decidiu onde o conteudo nasce, nao apenas onde ele aparece. **Notion entrou como CMS em 2021-12-05** e seria a unica decisao arquitetural a sobreviver aos dois resets totais que viriam depois.

Detalhe completo em [`episodes/002-v1-e-v2-anos-de-aprendizado-base.md`](./episodes/002-v1-e-v2-anos-de-aprendizado-base.md).

## 2023-12-05 — Primeiro reset total (rumo a v3)

### O que aconteceu

Commits `5fab737` ("exclui todos os arquivos do projeto") e `414bdb8` ("Initial commit v3"). Apaga toda a v2 (Chakra UI + Notion antigo + API Routes internas) e reinicia projeto com nova base. Reset por motivo tecnico: stack envelhecida, manter custaria mais que reconstruir.

Notion permaneceu como CMS apesar do reset.

### Por que importa

Estabelece o padrao de "reset total como ferramenta legitima" antes mesmo de o segundo reset acontecer. Sem este antecedente, o reset de 2026 pareceria episodio isolado. Com ele, vira marca do protagonista.

Detalhe meta em [`episodes/004-reset-total-como-marca.md`](./episodes/004-reset-total-como-marca.md).

## 2023-12-05 a 2026-05-04 — v3.0 e v3.1: Sass + BEM e Notion continua

### O que aconteceu

Quase dois anos e meio construindo a base v3: Tailwind por um mes, substituido por Sass + BEM com mixins de responsividade. Notion v2 (`@notionhq/client`), `/api/notion`, renderizacao de post via blocos. Tag `v3.0.0` em 2025-04-01. Tag `v3.1.0` em 2025-04-10 (Google Analytics). Continuou em v3.1.x ate maio/2026 — wrapper proprio do Notion, nova database, Vercel Analytics.

### Por que importa

E o "modo antigo" que seria apagado em 2026-05-04. Diferente da v1/v2 (que envelheceram tecnicamente), a v3.1.x estava bem por dentro — o problema era metodologico, nao tecnico.

Detalhe completo em [`episodes/003-v3-e-v3.1-sass-bem-e-notion-continua.md`](./episodes/003-v3-e-v3.1-sass-bem-e-notion-continua.md).

## 2026-05-04 — Segundo reset total: v3.2 nasce na branch `claude_experiment`

### O que aconteceu

Commit `218da0a` ("feat: nova base para a v3.2"). Apaga v3.1.x (Sass + BEM + Notion v2 wrapper proprio) e reinicia com Next.js 16 hello world. Primeira instrucao ao agente: "limpe o projeto e deixe so um Hello world sendo renderizado para comecarmos a trabalhar".

Antecedente importante: em paralelo, na branch `codex_experiment`, o Vitor tinha tentado consertar a v3.1.x para receber SDD por dentro. Custou demais. Quando ficou claro que o conserto saia mais caro que o reset, abriu nova branch (`claude_experiment`) e apagou tudo nela.

### Por que importa

Marca o ponto em que o projeto deixou de ser "evoluir o site" e virou "reconstruir o jeito de criar". Diferente do reset de 2023 (tecnico), este e metodologico: a v3.1.x estava bem tecnicamente, mas nao acomodava SDD por dentro. ADR-002 formaliza Notion como CMS pela primeira vez.

Detalhe completo em [`episodes/005-v32-nasce-com-sdd-desde-primeira-linha.md`](./episodes/005-v32-nasce-com-sdd-desde-primeira-linha.md).

## 2026-05-08 — Scaffold inicial de `docs/` (categorizado)

### O que aconteceu

Primeira tentativa de organizar a camada documental. Pipeline: ChatGPT gerou conteudo bruto exploratorio sobre o projeto; Claude Code estruturou em cinco subpastas semanticas (`product/`, `architecture/`, `agent/`, `decisions/`, `reference/`) via commits `a90a144` e `3a91d78`.

### Por que importa

Foi o primeiro experimento de tratar documentacao como infraestrutura do projeto. Plantou a semente do que viria a ser refatorado em layout flat quatro dias depois.

## 2026-05-12 — `docs/` inflou e virou flat

### O que aconteceu

Diagnostico critico: "docs ficou muito inflada com informacoes que podem ser menos repetitivas e arquivos mais flat". Commit-chave `1ae4ffc` consolida `docs/` em layout flat. Numeros antes/depois: **19 arquivos / 5921 linhas / 5 subpastas → 13 arquivos / 2335 linhas / flat**. Reducao -60% linhas, -32% arquivos, -80% subpastas. Redundancia estimada em 30-40% identificada (stack/MVP duplicado em 8 arquivos).

Sequencia:
- `1ae4ffc`: consolida em layout flat;
- `16af8bd`: enxuga ADRs 001-005 para template normativo (32-44 linhas cada);
- `4f080ee`: atualiza `CLAUDE.md` com nova estrutura flat.

### Por que importa

Primeira virada metodologica documentada da branch: estrutura categorizada cedo demais quebra; flat sustenta. A frase "mais flat" virou refrao recorrente.

Detalhe completo em [`episodes/006-docs-de-categorizado-pra-flat.md`](./episodes/006-docs-de-categorizado-pra-flat.md).

## 2026-05-12 — Camada `.claude/` chega via Agents Studio v0.1

### O que aconteceu

Commit `71c4d13` ("chore(.claude): adiciona camada operacional de skills e planos"). Estrutura de skills trazida do Agents Studio v0.1 (framework operacional pessoal do proprio Vitor, vindo de outro projeto). Pedido explicito: remover refs a arquivos inexistentes, trocar `.agents/` por `.claude/` (commit `13b2fb4`), ajustar `CLAUDE.md` com base em `AGENTS.md` externo. Skill `ast-docs-maintainer` removida por nao caber neste projeto agora.

### Por que importa

Inaugurou o padrao `trazer-podar-inflar-enxugar-carregar`. Reusar estrutura entre os proprios projetos do Vitor vira metodo, mas exige poda ativa contra refs orfas. Este projeto e o primeiro teste de reuso do Agents Studio v0.1 fora do projeto-fonte.

Detalhe completo em [`episodes/007-skills-trazidas-do-agents-studio.md`](./episodes/007-skills-trazidas-do-agents-studio.md).

## 2026-05-13 — 10 plans em draft em `.claude/plans/`

### O que aconteceu

Commit `a656013` ("chore(.claude): consolida planos v1 em .claude/plans/ e remove insumos legados"). Dez planos criados via `ast-plan-writer`, em draft, com tasks populadas para refinamento posterior. `roadmap.md` foi absorvido integralmente: parte virou planos individuais, parte foi para `plan-000-desktop` (carry-over pos-v1). Arquivo deletado, sem zumbi.

### Por que importa

Aposta no metodo: planejar muito antes de codar muito. Risco visivel de superengenharia para um site pessoal — assumido conscientemente em troca da chance de transformar o processo em material de curso e templates publicos.

Detalhe completo em [`episodes/008-dez-plans-em-draft.md`](./episodes/008-dez-plans-em-draft.md).

## 2026-05-13 — Camada narrativa nasce em `.journey/`

### O que aconteceu

Commit `eac92f5` adiciona skill `journey-writer`. Skill aplicada para criar a estrutura inicial de `.journey/`. Primeira versao foi rascunho generico; depois reescrita com material real extraido das conversas + commits. Na sequencia, `CHANGELOG.md` foi criado como insumo para refinar os episodios — esse passo revelou que houve dois resets totais (nao um), corrigiu inconsistencias, e levou a reorganizacao final dos episodios em 9 posicoes cronologicas (template copiavel vive na propria skill, nao em `episodes/`).

### Por que importa

Ate este ponto, a reconstrucao tinha duas camadas tecnicas. Faltava registro da travessia: tensao, decisao, virada, aprendizado. Sem essa camada, a jornada vira retrospectiva. Esse passo virou tambem prova de conceito: o fluxo `.journey/` sera replicado em outros projetos do Vitor como vitrine viva do metodo.

Detalhe completo em [`episodes/009-criacao-do-fluxo-journey.md`](./episodes/009-criacao-do-fluxo-journey.md) (populado em 2026-05-14 com material de tres sessoes + entrega da skill 1.3.0).

## Mapa rapido de status dos episodios

<!-- BEGIN: status-map -->
| # | Episodio | Status | Tipo | Era |
|---|---|---|---|---|
| 001 | `001-introducao` | draft | introducao | atemporal |
| 002 | `002-v1-e-v2-anos-de-aprendizado-base` | draft | cronologico | v1-v2 |
| 003 | `003-v3-e-v3.1-sass-bem-e-notion-continua` | draft | cronologico | v3 |
| 004 | `004-reset-total-como-marca` | refinando | meta | atemporal |
| 005 | `005-v32-nasce-com-sdd-desde-primeira-linha` | refinando | cronologico | v3.2 |
| 006 | `006-docs-de-categorizado-pra-flat` | refinando | cronologico | v3.2 |
| 007 | `007-skills-trazidas-do-agents-studio` | refinando | cronologico | v3.2 |
| 008 | `008-dez-plans-em-draft` | refinando | cronologico | v3.2 |
| 009 | `009-criacao-do-fluxo-journey` | refinando | cronologico | v3.2 |
<!-- END: status-map -->

Template copiavel vive em [`.claude/skills/journey-writer/assets/template-episode.md`](../.claude/skills/journey-writer/assets/template-episode.md), fora de `episodes/`.
