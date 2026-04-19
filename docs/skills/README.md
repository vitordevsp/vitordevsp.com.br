# Skills do projeto

Esta pasta concentra skills versionadas junto com a documentacao do repositorio.

Ela existe para transformar patterns, docs vivos e contexto tecnico em instrucoes operacionais reutilizaveis, sem criar uma camada paralela de workflow fora da taxonomia principal de `docs/`.

Cada skill deve funcionar tambem como artefato portavel entre projetos. Por isso, a camada de `skills` passa a manter metadata minima no frontmatter para facilitar comparacao, sincronizacao e futura consolidacao de uma fonte de verdade compartilhada.

## Papel desta pasta

- `docs/patterns/` define a regra;
- `docs/skills/` define como executar tarefas recorrentes que combinam varias regras e fontes;
- `docs/routines/` define rituais operacionais situacionais, especialmente perto de fechamento e validacao;
- `docs/agents/` fica reservado para agentes realmente especializados, quando houver necessidade de uma persona ou acao muito especifica.

Em resumo:

- `pattern` diz como pensar;
- `skill` diz como executar um fluxo recorrente;
- `routine` diz como passar por um momento especifico do ciclo;
- `agent` fica para um papel especializado e mais pontual.

## Skills atuais

### [build-specs](./build-specs/SKILL.md)

Criar, revisar ou evoluir `specs.md` de um artefato real usando:

- pattern de `specs`;
- codigo atual;
- docs vivos do dominio;
- OpenAPI, quando aplicavel;
- referencia visual, quando houver.

### [build-project-history](./build-project-history/SKILL.md)

Criar, revisar ou evoluir `project-history.md` de projeto, modulo ou area relevante usando codigo, planos, docs vivos, specs e contexto estrutural do sistema.

### [build-changelog](./build-changelog/SKILL.md)

Criar, revisar ou evoluir `CHANGELOG.md` com base em commits, planos, impacto histórico e regras de versionamento.

### [build-release](./build-release/SKILL.md)

Fechar uma release documental combinando changelog, recomendação de versão e nota resumida do recorte.

### [maintain-memory](./maintain-memory/SKILL.md)

Criar, revisar ou evoluir memorias locais em diferentes camadas do projeto, como a raiz, `docs/product/notion/` e outros contextos que precisem preservar aprendizado reaproveitavel.

### [patterns-review](./patterns-review/SKILL.md)

Revisar aderencia estrutural, documental e de responsabilidade entre camadas antes de considerar a entrega fechada.

### [refactor-review](./refactor-review/SKILL.md)

Revisar nomes, coesao, duplicacao leve e clareza tecnica sem abrir refatoracao ampla.

### [evolve-domain-flow](./evolve-domain-flow/SKILL.md)

Criar, revisar ou evoluir fluxo funcional de dominio cruzando docs vivos, stores, services, pages, components, specs e contratos externos.

### [implement-service](./implement-service/SKILL.md)

Criar, revisar ou evoluir services com base em patterns, OpenAPI, tipos, consumidores reais e docs do dominio.

### [implement-page](./implement-page/SKILL.md)

Criar, revisar ou evoluir pages e rotas cruzando jornada, integracoes, specs, referencia visual e fechamento documental.

### [implement-component](./implement-component/SKILL.md)

Criar, revisar ou evoluir componentes com foco em recorte de responsabilidade, estados, comportamento e relacao com specs e referencia visual.

### [build-skill](./build-skill/SKILL.md)

Criar, revisar ou evoluir skills do projeto com base na taxonomia de `docs/`, nas skills existentes e no aprendizado acumulado da camada.

### [build-pattern](./build-pattern/SKILL.md)

Criar, revisar ou evoluir patterns do projeto e do framework a partir de recorrência real, fronteiras estáveis e fonte de verdade clara.

### [build-routine](./build-routine/SKILL.md)

Criar, revisar ou evoluir routines quando um fluxo representar um momento situacional do ciclo de trabalho.

### [build-resource](./build-resource/SKILL.md)

Criar, revisar ou evoluir resources estáveis de apoio, como mapas, referências e históricos preservados.

### [build-agent](./build-agent/SKILL.md)

Criar, revisar ou evoluir agentes especializados em `docs/agents/`, preservando a fronteira entre fluxo recorrente de execucao e papel que exige julgamento especializado.

### [build-plan](./build-plan/SKILL.md)

Criar, revisar ou evoluir planos estruturados em `docs/plans/`, incluindo contexto, checklist, log, conhecimentos consolidados e perguntas para evolução.

### [build-commit](./build-commit/SKILL.md)

Organizar, sugerir e executar commits no padrao do projeto a partir do estado atual do git, do historico recente e do agrupamento logico das mudancas.

### [notion-maintain-docs](./notion-maintain-docs/SKILL.md)

Manter viva a camada específica de Notion deste projeto, cruzando MCP, memória do domínio, data sources, iniciativas clonadas e referências locais.

### [notion-clone-initiative](./notion-clone-initiative/SKILL.md)

Clonar iniciativas do Notion para `docs/product/notion/iniciativas/`, preservando hierarquia, metadados úteis de tasks e regras locais de ownership.

### [notion-update-tasks](./notion-update-tasks/SKILL.md)

Criar, revisar, atualizar e sincronizar o conteúdo de tasks do Notion usando iniciativa, docs vivos do domínio, lacunas de fluxo e planos relacionados.

As skills `notion-*` são adapters específicos para o contexto atual deste projeto. Elas não devem virar regra universal do framework sem uma camada agnóstica acima delas. Projetos que usam Azure Boards, Linear ou gestão local pelos próprios docs podem precisar de skills equivalentes com outro prefixo ou de uma skill agnóstica de gestão de trabalho.

### [clone-docs-structure](./clone-docs-structure/SKILL.md)

Clonar ou reconstruir a camada `docs/` deste repositório em outro projeto, preservando taxonomia, arquivos-base, fronteiras entre pastas e capacidade de recriar a estrutura mesmo a partir de uma cópia parcial.

## Regra de criacao

Criar uma nova skill apenas quando:

- a tarefa for recorrente;
- houver uma ordem de leitura ou execucao que valha padronizar;
- a combinacao entre patterns, docs e codigo trouxer risco de inconsistencias sem essa orquestracao.

Nao criar skill nova apenas porque ja existe um pattern sobre o assunto.

Para skills ligadas a ferramentas externas, usar nome específico apenas quando a skill depender de um fornecedor real, como `notion-*`, `linear-*` ou `azure-*`. Quando o fluxo puder operar com ferramenta externa, docs locais ou modo híbrido, preferir nome agnóstico.

## Regra de metadata

Toda skill em `docs/skills/*/SKILL.md` deve manter no frontmatter:

- `name`
- `description`
- `last_updated`

O campo `last_updated` deve usar o formato `AAAA-MM-DD HH:MM`.

Atualizar esse campo sempre que a skill mudar de forma relevante, especialmente quando houver:

- ajuste de fluxo;
- nova regra de uso;
- ampliacao de escopo;
- refinamento importante de criterio de entrada ou saida;
- adaptacao para portabilidade entre projetos.

## Regra de README por ferramenta

Toda skill em pasta propria deve manter tambem um `README.md` curto na mesma pasta com:

- explicacao breve do papel da ferramenta;
- conhecimento util consolidado;
- log de evolucao da propria ferramenta.

Essa regra ajuda manutencao humana, onboarding e futura automatizacao da camada de ferramentas.

## Relacao com a documentacao

- [`../patterns/README.md`](../patterns/README.md)
- [`../patterns/documentacao.md`](../patterns/documentacao.md)
- [`../patterns/specs.md`](../patterns/specs.md)
- [`../routines/README.md`](../routines/README.md)
- [`../agents/README.md`](../agents/README.md)
