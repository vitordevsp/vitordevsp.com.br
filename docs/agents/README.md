# Agents do projeto

## Objetivo

Esta pasta fica reservada para agentes realmente especializados do projeto.

Ela existe para descrever papéis mais pontuais do que uma `skill`, quando o projeto precisar de um agente com foco muito específico e julgamento próprio.

## O que esta pasta cobre

`docs/agents` deve responder principalmente:

- quais agentes especializados ainda fazem sentido no projeto;
- quando vale um agente, em vez de uma `skill`;
- quais entradas esse agente precisa receber;
- que tipo de saída é esperado dele.

## Relação com `docs/patterns` e `docs/skills`

- `docs/patterns` define o padrão oficial do projeto.
- `docs/skills` concentra os fluxos recorrentes de execução.
- `docs/agents` fica para papéis mais específicos, quando uma `skill` não for a melhor forma de organizar o trabalho.

Em resumo:

- `patterns` definem a regra;
- `skills` definem fluxos de execução reutilizáveis;
- `agents` ficam para papéis realmente especializados.

## Estado atual

Neste momento, os fluxos que antes estavam em `docs/agents` foram migrados para [`docs/skills`](../skills/README.md) ou [`docs/routines`](../routines/README.md):

- [`build-specs`](../skills/build-specs/SKILL.md)
- [`close-implementation`](../routines/close-implementation/ROUTINE.md)
- [`patterns-review`](../skills/patterns-review/SKILL.md)
- [`refactor-review`](../skills/refactor-review/SKILL.md)

Isso foi feito porque esses artefatos descrevem sequências compostas de trabalho, e não uma persona de agente com papel próprio suficientemente distinto.

## Convenção da camada

Cada agente desta pasta deve viver em uma pasta própria contendo:

- `AGENT.md` com o papel especializado;
- `README.md` curto com função, conhecimentos úteis e log da ferramenta.

Essa convenção alinha `docs/agents` ao padrão já adotado em `docs/skills` e `docs/routines`, deixando a camada mais fácil de manter, clonar e evoluir entre projetos.

## Agentes atuais

### [`ui-contract-reviewer`](./ui-contract-reviewer/README.md)

Especialista em coerência visual, estados de interface, aderência a `specs.md` e comparação com referência oficial, quando existir.

Use quando a tarefa pedir revisão de UI com julgamento visual e semântico, especialmente antes de ajustes finos de tela ou componentes.

### [`memory-maintainer`](./memory-maintainer/README.md)

Especialista em curadoria de memórias locais do projeto, preservando a fronteira entre memória, instruções estáveis, `patterns`, `skills`, `plans` e `resources`.

Use quando a sessão produzir aprendizados pequenos, reforços reutilizáveis ou dúvidas sobre o que deve permanecer como memória versus o que deve ser promovido para uma camada mais estável, inclusive em contextos como a raiz e `docs/product/notion/`.

### [`semantic-version-reviewer`](./semantic-version-reviewer/README.md)

Especialista em classificação semântica de releases, cruzando changelog, impacto público e risco de integração para recomendar versão com mais contexto.

Use quando houver dúvida entre `major`, `minor` e `patch` ou quando a release misturar vários tipos de impacto.

### [`documentation-curator`](./documentation-curator/README.md)

Especialista em curadoria da camada documental, detectando duplicação, lacunas e problemas de taxonomia entre `patterns`, `skills`, `agents`, `routines`, `plans` e `resources`.

Use quando a documentação estiver crescendo rápido ou quando surgir dúvida sobre onde um novo conteúdo deve morar.

### [`framework-taxonomy-reviewer`](./framework-taxonomy-reviewer/README.md)

Especialista em revisar se um novo artefato está nascendo na camada certa do framework.

Use quando houver dúvida entre `pattern`, `skill`, `routine`, `agent`, `plan`, `resource`, `memory` ou `template`.

## Regra importante

Se um novo agente entrar aqui, ele deve justificar por que:

- não basta ser uma `skill`;
- existe um papel realmente especializado;
- esse papel não pode ser representado apenas como uma sequência recorrente de execução.

Na dúvida, preferir `docs/skills/`.
