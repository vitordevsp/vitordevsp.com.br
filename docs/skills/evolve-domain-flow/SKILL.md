---
name: evolve-domain-flow
description: Criar, revisar ou evoluir um fluxo funcional de domínio cruzando docs vivos, stores, services, pages, components, specs e contratos externos quando existirem. Use quando a mudança atravessar várias camadas de um mesmo domínio e precisar preservar contexto de negócio e implementação.
last_updated: 2026-04-18 17:45
---

# Evolve Domain Flow

Use esta skill quando a tarefa for criar, revisar ou evoluir um fluxo funcional de domínio já vivo no projeto.

Ela existe para organizar mudanças ponta a ponta sem perder contexto entre documentação funcional, implementação atual, limitações de contrato e comportamento real da interface.

## Quando usar

Use esta skill quando:

- a mudança atravessa `store`, `service`, `page` e `component`;
- existe documentação viva do domínio;
- o fluxo já existe, mas precisa ser melhorado;
- há divergência entre docs, contrato e código;
- a frente tem impacto funcional maior do que um ajuste isolado de camada.

## Leitura obrigatória

Sempre comece por:

1. `docs/patterns/README.md`
2. `docs/patterns/documentacao.md`

Depois, carregue:

- patterns das camadas tocadas;
- `specs.md` relevantes do fluxo;
- `docs/product/notion/data-sources.md`, quando o fluxo envolver integracao com Notion.

## Docs do domínio que esta skill deve priorizar

Quando existirem, ler nesta ordem:

1. `README.md`
2. `docs/product/history/<domain-or-flow>/product-history.md`, quando existir
3. `step-by-step.md`
4. `event-map.md`
5. `test-cases.md`
6. `decision-log.md`

## Entradas

O contexto ideal inclui:

- domínio ou fluxo principal afetado;
- arquivos centrais da implementação atual;
- docs vivos do domínio;
- specs locais;
- contratos externos e referências visuais, quando relevantes;
- plano ativo, quando a frente já estiver estruturada em `docs/plans/`.

## Sequência recomendada

1. Entenda a jornada ponta a ponta do fluxo.
2. Cruze o que os docs do domínio dizem com o código real.
3. Identifique onde a mudança impacta estado, integração, UI e documentação.
4. Implemente a evolução do fluxo respeitando a fronteira entre camadas.
5. Atualize specs e docs vivas afetadas.
6. Feche a execução revisando `docs/patterns/documentacao.md`.

## O que esta skill deve verificar

### Coerência funcional

- o fluxo continua fazendo sentido do início ao fim;
- os estados importantes continuam representados;
- regras de produto relevantes não se perderam na implementação;
- a mudança não criou contradição entre etapas do fluxo.

### Coerência técnica

- responsabilidade entre `store`, `service`, `page` e `component` continua saudável;
- contratos temporários ou limitações técnicas estão visíveis;
- specs e docs continuam úteis para a próxima sessão;
- logs, erros e fallback continuam coerentes com o comportamento esperado.

### Coerência documental

- `product-history.md` continua tratado como fonte funcional centralizada em `docs/product/`, sem ser reescrito indevidamente;
- anotações de implementação entram em `step-by-step.md` ou docs apropriadas;
- specs locais foram revisitadas quando a mudança alterou comportamento;
- planos ativos continuam refletindo o estado real da frente.

## Saída esperada

Uma execução bem fechada desta skill deve terminar com:

1. fluxo funcional evoluído com menos risco de regressão;
2. docs do domínio alinhadas com a implementação real;
3. specs afetadas atualizadas;
4. fronteiras entre camadas preservadas;
5. limitações e riscos residuais explicitados.

## O que esta skill não deve fazer

Esta skill não deve:

- tratar docs vivas como enfeite sem impacto na implementação;
- reescrever `product-history.md` sem pedido direto;
- empurrar toda a responsabilidade do fluxo para uma única camada;
- misturar backlog futuro com execução do fluxo atual sem sinalizar isso.
