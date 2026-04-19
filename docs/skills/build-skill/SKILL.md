---
name: build-skill
description: Criar ou evoluir skills do projeto com base na taxonomia de docs, nos patterns relevantes, nas skills já existentes e no aprendizado acumulado ao transformar fluxos recorrentes em instruções reutilizáveis. Use quando a tarefa for criar uma skill nova ou melhorar uma skill existente em docs/skills.
last_updated: 2026-04-18 05:31
---

# Build Skill

Use esta skill quando a tarefa for criar, revisar ou evoluir uma skill em `docs/skills/`.

Ela existe para evitar skills redundantes, vagas ou burocráticas, e para garantir que novas skills reflitam o aprendizado real do projeto.

## Quando usar

Use esta skill quando:

- uma tarefa recorrente do projeto merece virar skill;
- uma skill existente precisa ser melhorada;
- um fluxo hoje descrito em docs ou repetido em várias sessões ainda não foi consolidado;
- existe dúvida se algo deve virar `pattern`, `skill`, `routine` ou `agent`;
- uma skill precisa ser ajustada depois de uso real no projeto.

## Leitura obrigatória

Sempre comece por:

1. `docs/skills/README.md`
2. `docs/patterns/README.md`
3. `docs/patterns/documentacao.md`

Depois, carregue também:

- os patterns relacionados ao fluxo da nova skill;
- skills existentes semelhantes em `docs/skills/`;
- `docs/routines/README.md`, quando houver risco de o caso ser mais `routine` do que `skill`;
- `docs/agents/README.md`, quando houver risco de o caso ser mais `agent` do que `skill`;
- o plano relacionado, quando a criação da skill fizer parte de uma frente registrada em `docs/plans/`.

## Pergunta principal antes de criar

Antes de escrever a skill, responder:

`isso é realmente um fluxo recorrente de execução, com ordem de leitura e de ação que valem padronização, ou descreve um momento mais situacional do ciclo de trabalho?`

Se a resposta for não, a demanda provavelmente deve continuar como `pattern`, `routine`, `agent`, plano ou simples convenção local.

## Sequência recomendada

1. Identifique o fluxo recorrente que a skill quer resolver.
2. Verifique se já existe skill parecida o suficiente para ser ampliada em vez de criar outra.
3. Decida se o caso é realmente skill, e não `pattern`, `routine` ou `agent`.
4. Liste leituras obrigatórias e entradas mínimas.
5. Estruture a skill com foco em criação e melhoria, não só em criação.
6. Preencha ou atualize o campo `last_updated` no frontmatter da skill.
7. Atualize `docs/skills/README.md` para refletir a nova base.
8. Se a mudança fizer parte de um plano, atualize o plano com log e conhecimento adquirido.

## O que uma boa skill deste projeto costuma ter

### 1. Papel claro

A skill deve deixar explícito:

- o que ela resolve;
- quando usar;
- quando não usar;
- por que ela existe.

### 2. Leitura obrigatória

A skill deve apontar:

- quais patterns precisam ser lidos;
- quais docs vivos ou specs entram no fluxo;
- quais referências externas são obrigatórias, quando existirem.

### 3. Sequência recomendada

A skill deve descrever um fluxo prático, normalmente com:

1. leitura do contexto
2. inspeção do código atual
3. cruzamento com docs e referências
4. execução da mudança
5. fechamento documental

### 4. Critérios de saída

A skill deve deixar claro como saber que ela foi bem usada:

- o que precisa estar alinhado;
- o que precisa ser atualizado;
- que tipo de inconsistência deve ter sido evitada.

## Conhecimentos consolidados ao criar skills neste projeto

- Skills deste projeto devem servir tanto para criar quanto para melhorar artefatos já existentes.
- A maior parte do valor vem de reduzir esquecimento operacional entre `patterns`, código, docs vivos e specs.
- Uma skill boa precisa nascer a partir de repetição real ou de uma repetição claramente previsível.
- Quando um fluxo é amplo demais, vale separá-lo por camada, como `implement-service`, `implement-page` e `implement-component`.
- Quando o trabalho exige julgamento especializado em vez de execução recorrente, o caso tende mais a `agent`.
- Quando o trabalho descreve um ritual de fechamento, transicao ou validacao em um momento muito especifico do ciclo, o caso tende mais a `routine`.

## Estrutura sugerida

Use uma estrutura como esta:

- frontmatter com `name`, `description` e `last_updated`
- título da skill
- quando usar
- leitura obrigatória
- entradas
- sequência recomendada
- o que esta skill deve verificar
- saída esperada
- o que esta skill não deve fazer

## Saída esperada

Uma execução bem fechada desta skill deve terminar com:

1. nova skill ou skill evoluída em `docs/skills/`;
2. frontmatter da skill com `last_updated` em formato `AAAA-MM-DD HH:MM`;
3. `docs/skills/README.md` atualizado quando necessário;
4. fronteira clara entre `skill`, `pattern`, `routine` e `agent`;
5. plano atualizado com logs e conhecimentos, quando a mudança fizer parte de uma frente planejada.

## O que esta skill não deve fazer

Esta skill não deve:

- criar skill só porque o tema existe no projeto;
- duplicar skill existente com diferença pequena de nome;
- tratar pattern como se fosse skill;
- tratar routine como se fosse skill ampla;
- criar instrução vaga demais para ser reutilizável;
- esquecer de registrar o aprendizado da criação da skill quando isso fizer parte de um plano.
