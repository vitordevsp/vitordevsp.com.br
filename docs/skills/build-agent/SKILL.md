---
name: build-agent
description: Criar ou evoluir agentes especializados em docs/agents com base na taxonomia do projeto, nos patterns relevantes, nas skills existentes e nos planos ativos, preservando a fronteira entre fluxo recorrente e papel especializado.
last_updated: 2026-04-18 05:10
---

# Build Agent

Use esta skill quando a tarefa for criar, revisar ou evoluir um agente em `docs/agents/`.

Ela existe para evitar agentes vagos, redundantes ou que deveriam ser apenas `skills`, e para garantir que um novo agente realmente represente um papel especializado do projeto.

## Quando usar

Use esta skill quando:

- um papel especializado recorrente do projeto merece virar agente;
- um agente existente precisa ser refinado ou reposicionado;
- existe dúvida se um caso deve virar `skill` ou `agent`;
- um plano já identificou a necessidade de um agente novo;
- o trabalho exige julgamento especializado, e não apenas sequência de execução.

## Leitura obrigatória

Sempre comece por:

1. `docs/agents/README.md`
2. `docs/skills/README.md`
3. `docs/patterns/README.md`
4. `docs/patterns/documentacao.md`

Depois, carregue também:

- o plano relacionado, quando a criação do agente fizer parte de uma frente registrada em `docs/plans/`;
- os patterns da camada tocada pelo agente;
- skills existentes parecidas, para evitar transformar em agente algo que continua sendo fluxo recorrente;
- docs vivos, specs ou contratos externos do domínio em que o agente vai atuar.

## Pergunta principal antes de criar

Antes de escrever o agente, responder:

`isso exige mesmo um papel especializado com julgamento próprio, ou ainda é melhor representado por uma skill?`

Se a resposta for não, a demanda provavelmente deve continuar como `skill`, `pattern` ou plano.

## Sequência recomendada

1. Identifique o papel especializado que o agente precisa cumprir.
2. Verifique se esse caso realmente não cabe melhor em uma `skill`.
3. Localize as entradas mínimas e o tipo de saída esperada do agente.
4. Defina claramente por que esse agente existe e o que ele revisa ou orienta.
5. Crie a pasta do agente em `docs/agents/<nome-do-agent>/`.
6. Escreva o papel especializado em `docs/agents/<nome-do-agent>/AGENT.md`.
7. Crie também `docs/agents/<nome-do-agent>/README.md` com explicação breve, conhecimentos úteis e log da ferramenta.
8. Atualize `docs/agents/README.md` para registrar o novo papel.
9. Se a frente estiver ligada a um plano, atualize o plano com log e conhecimentos adquiridos.

## O que um bom agente deste projeto costuma ter

### 1. Papel claro

O agente deve deixar explícito:

- o que ele faz;
- quando usar;
- por que isso é agente, e não skill;
- qual tipo de julgamento ele agrega.

### 2. Entrada esperada

O agente deve indicar:

- que contexto mínimo precisa receber;
- que docs, patterns ou artefatos devem ser lidos antes;
- quais arquivos ou referências costumam ser essenciais.

### 3. Escopo de revisão ou orientação

O agente deve dizer com clareza:

- o que ele revisa;
- o que ele não revisa;
- quais limites preserva;
- que tipo de saída objetiva deve produzir.

### 4. Dependências e fronteiras

O agente deve apontar:

- patterns obrigatórios;
- docs vivos relevantes;
- fronteira com `skills`, `plans` e `patterns`.

## O que esta skill deve verificar

- se o novo agente não é apenas uma skill com outro nome;
- se existe um papel especializado suficientemente distinto;
- se a saída esperada depende de julgamento contextual;
- se as dependências do agente estão claras;
- se `docs/agents/README.md` continua coerente com o estado real da pasta.

## Saída esperada

Uma execução bem fechada desta skill deve terminar com:

1. novo agente ou agente evoluído em `docs/agents/<nome-do-agent>/AGENT.md`;
2. `docs/agents/<nome-do-agent>/README.md` criado ou atualizado;
3. `docs/agents/README.md` atualizado;
4. fronteira clara entre `agent`, `skill` e `pattern`;
5. plano atualizado com logs e conhecimentos, quando houver plano relacionado.

## O que esta skill não deve fazer

Esta skill não deve:

- criar agente só porque o tema parece importante;
- duplicar agente existente com diferença pequena de nome;
- transformar fluxo recorrente em persona artificial;
- escrever agente genérico demais para orientar o trabalho;
- esquecer de registrar o aprendizado quando a criação fizer parte de uma frente planejada.
