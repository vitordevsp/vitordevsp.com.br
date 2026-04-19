---
name: implement-service
description: Criar, revisar ou evoluir services do projeto com base nos patterns de service e tipagem, no código consumidor, nos docs do domínio e no OpenAPI quando a integração depender da API. Use quando a tarefa tocar criação, ajuste ou saneamento de integração em service.
last_updated: 2026-04-18 17:45
---

# Implement Service

Use esta skill quando a tarefa for criar, revisar ou evoluir um `service` do projeto.

Ela existe para reduzir inconsistências entre contrato, tipagem, tratamento de erro, nomenclatura e consumo real do frontend.

## Quando usar

Use esta skill quando:

- um novo `service` precisa ser criado;
- uma integração existente precisa ser melhorada;
- houve mudança de contrato, payload ou tipagem;
- a page consumidora esta sofrendo com ambiguidades da integracao Notion;
- existe suspeita de workaround mal documentado ou regra de integracao espalhada.

## Leitura obrigatória

Sempre comece por:

1. `docs/patterns/services.md`
2. `docs/patterns/tipagem.md`
3. `docs/patterns/documentacao.md`

Depois, carregue também:

- `docs/patterns/specs.md`, se o service tiver ou merecer spec;
- `docs/product/notion/data-sources.md`, quando a integracao envolver um banco de dados Notion.

## Entradas

O contexto ideal inclui:

- arquivo do service alvo;
- codigo consumidor, como `page` ou `component`;
- tipos e schemas relacionados;
- contrato de API, quando aplicável;
- docs vivos do domínio, quando o service fizer parte de um fluxo funcional.

## Sequência recomendada

1. Inspecione primeiro o código atual do service e seus consumidores.
2. Identifique a responsabilidade real do service e o limite com `store` e `page`.
3. Confira contrato, tipos, nomes e tratamento de erro.
4. Implemente a criação ou melhoria necessária.
5. Verifique se o service merece `specs.md` novo ou atualização da spec existente.
6. Feche a frente revisando `docs/patterns/documentacao.md`.

## O que esta skill deve verificar

### Contrato e payload

- nomes de parâmetros coerentes com o contrato real;
- adaptação de payload concentrada em lugar correto;
- respostas mapeadas de forma previsível;
- workarounds temporários claramente identificados.

### Tipagem

- tipos locais compatíveis com o que o frontend usa de fato;
- ausência de tipagem frouxa desnecessária;
- schemas e parsing coerentes com o contrato;
- nomes que expressem intenção de domínio.

### Tratamento de erro

- erro técnico não vazando sem contexto quando deveria ser tratado;
- fronteira clara entre erro de integração e erro de interface;
- mensagens ou estados esperados pelo consumidor respeitados;
- fallback ou retry documentado quando existir.

### Relação com o restante do fluxo

- `service` não absorver responsabilidade de estado;
- `store` não fazer trabalho que deveria estar no service;
- `page` e `component` não duplicarem adaptação de contrato;
- docs do domínio continuarem coerentes com a integração real.

## Saída esperada

Uma execução bem fechada desta skill deve terminar com:

1. service funcional e com responsabilidade clara;
2. integração coerente com o contrato real;
3. tipagem suficiente para manutenção;
4. consumidor alinhado com o service atualizado;
5. `specs.md` e docs ajustadas quando fizer sentido.

## O que esta skill não deve fazer

Esta skill não deve:

- mover regra de produto para o service sem necessidade;
- esconder divergência de contrato sem registrar a limitação;
- reabrir refatoração ampla quando o ajuste for localizado;
- inventar comportamento da API sem evidência no código ou no OpenAPI.
