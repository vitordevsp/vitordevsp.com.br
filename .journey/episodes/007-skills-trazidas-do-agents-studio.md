---
title: EP-007 - Skills do Agents Studio chegam e sao podadas
status: refinando
type: cronologico
metadata:
  owner: journey-writer
  created_at: 2026-05-13 17:00
  updated_at: 2026-05-13 18:15
  tags:
    - episode
    - cronologico
    - skills
    - agents-studio
    - reuso-entre-projetos
  era: v3.2
  lentes:
    - metodo
    - descoberta
  sources:
    sessions:
      - id: 3b53758c-7c6d-4b1e-bf0b-8a241a6ac06d
        date: 2026-05-13
        relevance: primary
        summary: importacao do Agents Studio v0.1 + poda de refs orfas + remocao ast-docs-maintainer
    commits:
      - 71c4d13
      - 13b2fb4
    files:
      - .claude/skills/
      - .claude/tools.yaml
    last_review: 2026-05-13 20:15
---

# EP-007 — Skills do Agents Studio chegam e sao podadas

## Gancho

A camada `.claude/` deste projeto nao nasceu daqui. Veio inteira de outro projeto do proprio Vitor — o **Agents Studio v0.1**, framework operacional pessoal que vinha sendo construido em paralelo — junto com skills, README, `tools.yaml`, plans, tasks.

Veio com tudo. Inclusive com referencias a arquivos que nao existem aqui.

A primeira instrucao foi simples: "Trouxe algumas skills e uma estrutura de outro projeto, analise e remova as refs de arquivos que nao estao presentes no contexto atual" (commit `71c4d13`, 2026-05-12).

Reuso entre os proprios projetos comeca pela poda, nao pela importacao.

## Contexto

Apos `docs/` consolidada em flat (ver [`006-docs-de-categorizado-pra-flat.md`](./006-docs-de-categorizado-pra-flat.md)), faltava a camada operacional para agentes. Em vez de criar do zero, o Vitor importou a estrutura que ja vinha funcionando em outro projeto pessoal — o Agents Studio v0.1, framework proprio que ele vinha desenvolvendo como forma de organizar trabalho com agentes em escala multi-projeto.

A importacao trouxe **7 skills** + estrutura completa de `tools.yaml`, AGENTS.md externo, README e plans/tasks de origem.

### Inventario das 7 skills importadas

| Skill | Destino | Motivo |
|---|---|---|
| `ast-plan-writer` | mantida | criar planos multi-etapas, usavel em qualquer projeto |
| `ast-task-writer` | mantida | criar tasks pequenas autocontidas, usavel em qualquer projeto |
| `ast-skill-writer` | mantida | criar/refatorar skills, meta-skill universal |
| `ast-release-manager` | mantida | commit, changelog, versionamento, agnostica de stack |
| `ast-react-component` | **removida** | acoplada a `src/stores/`, `src/services/` (stack do projeto-fonte) |
| `ast-api-service` | **removida** | acoplada a Zustand + Sass (stack do projeto-fonte) |
| `ast-docs-maintainer` | **removida** | docs distribuidas em `src/stores/<domain>/docs/` (modelo do projeto-fonte). Aqui `docs/` ficou flat — nao precisa de roteador entre camadas |

Resultado: **4 skills sobreviveram ao primeiro reuso**. Posteriormente, em 2026-05-13, foi adicionada `journey-writer` (criada via `ast-skill-writer` no proprio repo). Estado atual em `.claude/skills/`: **5 skills** (`ast-plan-writer`, `ast-task-writer`, `ast-skill-writer`, `ast-release-manager`, `journey-writer`).

Boa parte da estrutura era reaproveitavel. Outra parte fazia referencia ao repositorio de origem, que tem `src/stores/`, `src/services/`, Sass, Zustand — stack que este projeto nem usa nem vai usar.

Detalhe importante: Agents Studio v0.1 nao e biblioteca de terceiros nem framework publico. E codigo do proprio Vitor sendo reusado entre seus proprios projetos. O reuso aqui e um teste critico — se o framework so funciona no projeto onde nasceu, nao e framework, e accidental architecture.

### Taxa de sobrevivencia: 4/7 = ~57%

Esse numero pode virar metrica do framework. Quanto mais alto a cada reuso, mais maduro o Agents Studio v0.1 esta. Hipotese: reuso 2 (proximo projeto) pode chegar em 80-90% se as skills generalistas estiverem bem desenhadas. Reuso 1 (este) ja deu sinal claro de quais skills sao stack-bound (ast-react-component, ast-api-service) — sera que essas voltam reformuladas?

## Conflito

A estrutura importada chegou com tres tipos de sujeira:

1. **referencias a arquivos que nao existem.** Skills apontavam para `references/legacy-build-*.md` que vieram, e para outras que nao vieram. Exemplos: `ast-docs-maintainer` referenciava `docs/team/notion/`, `docs/reports/`, `MEMORY.md` — nada disso existe aqui;
2. **nomes de pasta do projeto de origem.** `.agents/` em vez do padrao do CLI (`.claude/`). `AGENTS.md` na raiz em vez de `CLAUDE.md`;
3. **skills cujo escopo nao casava com este projeto.** `ast-docs-maintainer` fazia sentido la (com docs distribuidas em `src/stores/<domain>/docs/`), aqui era ruido. `ast-react-component` e `ast-api-service` foram desenhadas pra um codigo com `src/stores/`, `src/services/`, Sass+Zustand — stack que esta v3.2 nem tem nem vai ter.

Importar sem podar geraria divida silenciosa: agentes seguiriam refs para arquivos inexistentes, contratos ficariam inconsistentes, decisoes futuras seriam tomadas em cima de premissas erradas.

E mais: se o Agents Studio v0.1 chegou aqui assim, vai chegar igual nos proximos projetos do Vitor. O processo de poda precisava virar metodo, nao improviso.

## Virada

Em vez de aceitar a importacao como pacote fechado, decisao explicita de podar antes de usar:

- remover refs orfas em todas as skills;
- substituir `.agents/` por `.claude/` em todo lugar (commit `13b2fb4`);
- ajustar `CLAUDE.md` com base em uma versao externa do `AGENTS.md` enviada como referencia, adaptando ao projeto atual;
- remover a skill `ast-docs-maintainer` ("vamos remover a skill ast-docs-maintainer por enquanto, ela nao vai ser tao util aqui agora");
- manter o contrato de "agente como par tecnico, nao validador automatico" colado quase literal porque servia bem.

O processo nao foi mecanico. Cada decisao de manter ou remover passou por filtro: serve ao escopo deste projeto, agora, na v1?

## Aprendizado

Reusar estrutura entre projetos do mesmo autor sem virar copy-paste estragado exige cinco passos disciplinados:

1. **trazer** — importar a base do projeto fonte;
2. **podar** — cortar refs orfas, nomes de pasta legados, skills fora de escopo;
3. **inflar** — criar tudo que parece util na v1;
4. **enxugar** — consolidar em layout flat depois que a inflacao revela o que e ruido (ver EP-006);
5. **carregar** — mover candidatos pos-v1 para um plano carry-over (`plan-000-desktop`) pra nao perder ideia mas tambem nao inflar escopo.

Pular qualquer um introduz divida silenciosa. Pular `podar` e o pior: o codigo passa a operar em cima de mentiras.

Aprendizado meta: o "framework Agents Studio" so vira framework de verdade quando sobrevive ao primeiro reuso fora do projeto de origem. Este projeto foi esse teste. Sobreviveu com poda, e sobreviver com poda e parte do contrato — nao defeito.

Esse processo vai se repetir nos proximos projetos. Cada importacao gera novo aprendizado sobre o que e essencial e o que era especifico do projeto de origem. O Agents Studio v0.1 vai ficando mais limpo a cada reuso.

## Possivel conteudo publico

- Formato sugerido: post tecnico + capitulo em curso futuro
- Titulo possivel: "trazer-podar-inflar-enxugar-carregar: como reusar arquitetura entre os meus proprios projetos sem virar copia estragada"
- Promessa: cinco passos disciplinados para reuso entre projetos pessoais
- Publico: devs que mantem multiplos projetos pessoais ou que estao montando estrutura de monorepo / metarepo

## Perguntas abertas

- [ ] Quais skills do Agents Studio v0.1 vao precisar voltar mais para frente neste projeto (ex: `ast-docs-maintainer`)?
- [ ] Qual deveria ser o caminho oficial de versionamento do framework Agents Studio para que reuso entre os projetos do Vitor nao dependa de copy-paste?
- [ ] Em que momento o Agents Studio v0.1 deixa de ser framework pessoal e vira framework publico/distribuivel?

## Fragmentos aproveitaveis

> "Vamos remover a skill ast-docs-maintainer por enquanto, ela nao vai ser tao util aqui agora."

> O reuso entre os proprios projetos so e reuso depois da poda. Antes disso, e contrabando.

> Hipotese editorial: o numero de refs orfas que sobrevivem ao primeiro reuso e uma metrica de saude do framework.

## Commits relacionados

- `71c4d13` (2026-05-12): adiciona camada operacional de skills e planos. **Commit-chave do episodio**. Importa Agents Studio v0.1 + poda inicial.
- `13b2fb4` (2026-05-12): reescreve `CLAUDE.md` alinhado a camada `.claude/`. Substitui `.agents/` por `.claude/` em todo lugar.
