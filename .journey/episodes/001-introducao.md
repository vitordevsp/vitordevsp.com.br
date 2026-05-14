---
title: EP-001 - Introducao
status: draft
type: introducao
metadata:
  owner: journey-writer
  created_at: 2026-05-13 18:00
  updated_at: 2026-05-13 18:00
  tags:
    - episode
    - introducao
    - prologo
  era: atemporal
  lentes:
    - chamado
    - oferta
  sources:
    sessions: []
    commits: []
    files:
      - .journey/hero.md
      - .journey/timeline.md
      - CHANGELOG.md
      - .journey/episodes/
    derived_from:
      - 002-v1-e-v2-anos-de-aprendizado-base
      - 003-v3-e-v3.1-sass-bem-e-notion-continua
      - 004-reset-total-como-marca
      - 005-v32-nasce-com-sdd-desde-primeira-linha
    last_review: 2026-05-13 20:30
---

# EP-001 — Introducao

## Sobre este episodio

Capa narrativa da serie. Nao tem data exata, nao pertence a uma versao especifica. Existe para situar quem chega aqui pela primeira vez antes de mergulhar nos episodios cronologicos.

## O que e este projeto

`vitordevsp.com.br` e o site pessoal do Vitor Sampaio. Existe ha cinco anos no mesmo repositorio. Passou por tres versoes maiores e dois resets totais. A versao em construcao agora — v3.2 — nao e apenas uma reformulacao tecnica.

E o primeiro projeto pessoal do Vitor construido inteiramente sob SDD (Spec-Driven Development), com agentes de IA governados por contexto, em tres camadas declaradas:

- `docs/` — decisao normativa humana;
- `.claude/` — contrato operacional para agentes;
- `.journey/` — bastidor narrativo do processo (esta pasta).

## A solucao que ele entrega

Para o publico final do site, a entrega visivel e o jardim digital: presenca publica do Vitor, portfolio de projetos, posts, videos e referencias, com Notion como CMS editorial. Conteudo continuo, leitura confortavel, indice navegavel.

Para a comunidade tecnica que acompanha o processo, a entrega menos visivel mas talvez mais valiosa e o **metodo replicavel**:

- como aplicar SDD em escala pessoal sem virar overhead;
- como reusar `.claude/skills/` entre projetos do mesmo autor (framework Agents Studio v0.1);
- como manter `.journey/` versionado para registrar travessia antes que ela vire retrospectiva;
- como governar humano + agente em ciclos curtos sem perder coerencia entre sessoes.

A aposta editorial: registrar tudo isso no proprio repositorio, em portugues, em camadas separadas, com episodios narrativos publicos, e que esse conjunto sirva tanto como produto digital pessoal quanto como vitrine de um framework reusavel.

## Por que esta serie existe

A maioria dos projetos pessoais perde aprendizado porque so documenta no fim. A serie `.journey/` registra a jornada antes que ela vire retrospectiva.

Cada episodio captura uma tensao, uma decisao ou uma virada. Alguns sao cronologicos (ancorados em commits e datas). Outros sao meta — atravessam multiplos momentos da historia do repositorio.

A intencao final: transformar essa pasta em materia-prima para serie de posts publicos, templates reusaveis (`.claude/`, `.journey/`), curso introdutorio de SDD com agentes e, eventualmente, comunidade. Esta pasta e o bastidor antes do palco.

## Como ler os episodios

- **Cronologicos** — contam um momento ou periodo especifico da historia do repo:
  - [`002-v1-e-v2-anos-de-aprendizado-base.md`](./002-v1-e-v2-anos-de-aprendizado-base.md) — 2021 a 2022, fundacao tecnica;
  - [`003-v3-e-v3.1-sass-bem-e-notion-continua.md`](./003-v3-e-v3.1-sass-bem-e-notion-continua.md) — 2023 a 2026, Sass+BEM, Notion sobrevive ao reset 1;
  - [`005-v32-nasce-com-sdd-desde-primeira-linha.md`](./005-v32-nasce-com-sdd-desde-primeira-linha.md) — 2026-05-04, nascimento da branch `claude_experiment`;
  - [`006-docs-de-categorizado-pra-flat.md`](./006-docs-de-categorizado-pra-flat.md) — 2026-05-12, virada na arquitetura documental;
  - [`007-skills-trazidas-do-agents-studio.md`](./007-skills-trazidas-do-agents-studio.md) — 2026-05-12, reuso entre projetos;
  - [`008-dez-plans-em-draft.md`](./008-dez-plans-em-draft.md) — 2026-05-13, planejamento como artefato;
  - [`009-criacao-do-fluxo-journey.md`](./009-criacao-do-fluxo-journey.md) — 2026-05-13, nascimento desta propria pasta.
- **Meta** — atravessa multiplos momentos:
  - [`004-reset-total-como-marca.md`](./004-reset-total-como-marca.md) — padrao multi-reset (cobre os dois resets de 2023 e 2026; absorve antiga reflexao sobre Notion como fio que sobrevive).

Para visao cronologica curta de todos os marcos, ver [`../timeline.md`](../timeline.md). Para arco narrativo do protagonista, ver [`../hero.md`](../hero.md). Para visao completa do repositorio, ver [`../../CHANGELOG.md`](../../CHANGELOG.md).

## Para quem este projeto e relevante

- **devs experientes que tem projetos pessoais antigos travados** em arquiteturas legadas e estao pensando em reset total ou em adotar SDD;
- **criadores de conteudo tecnico** procurando referencia real de como construir bastidor publicavel;
- **indie hackers e arquitetos pessoais** experimentando metodos novos de criar com agentes;
- **estudiosos de SDD** que querem ver o metodo aplicado em escala pequena, num projeto real, com historico publico de erros e correcoes.

Se voce nao esta nessa lista, ainda assim: este e um repositorio publico que conta uma historia. Provavelmente vale mais como narrativa do que como software pronto pra clonar.

## Aviso editorial

Esta serie e bastidor versionado. Esta sendo escrita ao mesmo tempo em que a v3.2 esta sendo construida. Nao e retrospectiva limpa. Tem hipoteses marcadas como hipoteses, perguntas em aberto, episodios em rascunho. Faz parte do contrato.

A precisao editorial vai aumentar conforme os episodios forem refinados. A intencao nunca foi entregar texto polido de primeira — foi capturar a travessia em tempo real.

## Status do episodio

`draft`. Vai ser refinado conforme o restante da serie amadurece e o site v3.2 chega mais perto da publicacao.
