---
name: build-specs
description: Criar, revisar ou evoluir specs.md de um artefato real do projeto combinando o pattern de specs, o código atual, docs do domínio, contratos de API quando relevantes e referências visuais quando existirem. Use quando a tarefa for escrever, melhorar ou alinhar specs de page, component, store, service ou fluxo de domínio neste repositório.
last_updated: 2026-04-18 17:45
---

# Build Specs

Use esta skill quando a tarefa for criar, revisar ou evoluir um `specs.md` de um artefato concreto deste repositório.

Não use esta skill para inventar requisitos do zero. O objetivo é sintetizar o comportamento esperado a partir de fontes reais que já existem no código e na documentação do projeto.

## Leitura obrigatória

Sempre comece por:

1. `docs/patterns/specs.md`
2. `docs/patterns/documentacao.md`

Depois, leia o pattern que corresponde ao tipo de artefato:

- page ou rota: `docs/patterns/aplicacao.md` e `docs/patterns/pages.md`
- component: `docs/patterns/componentes.md`
- store ou estado de domínio: `docs/patterns/stores.md` e `docs/patterns/tipagem.md`
- service ou integração com API: `docs/patterns/services.md` e `docs/patterns/tipagem.md`

## Fluxo principal

1. Identifique o artefato concreto e inspecione primeiro o código atual dele.
2. Identifique as fontes complementares mais autoritativas para esse tipo de artefato.
3. Escreva, atualize ou reorganize o `specs.md` perto do artefato.
4. Valide links, referências e alinhamento com o código atual antes de concluir.

## Prioridade das fontes

Prefira as fontes nesta ordem:

1. código atual do artefato alvo
2. contratos atuais e fontes técnicas
3. docs vivos do domínio
4. specs locais já existentes
5. referências visuais

Quando houver divergência entre fontes:

- prefira o código atual em vez de docs defasados para a realidade da implementação;
- prefira o OpenAPI em vez de docs textuais antigas de API;
- não sobrescreva ambiguidades de produto silenciosamente;
- quando regras de produto forem contraditórias, registre essa tensão com clareza na spec em vez de inventar uma regra final.

## Fontes complementares por tipo de artefato

### Page

Ler:

- código da rota/page
- componentes usados pela page
- código relacionado de store/service quando o comportamento depender deles
- docs do domínio quando a page pertencer a um fluxo documentado
- link do Figma, se existir

A spec deve descrever:

- propósito da page
- jornada esperada
- estados e transições
- hierarquia visual relevante quando isso ajudar a manutenção

### Component

Ler:

- código do component
- uso na page pai ou no container
- estilos locais quando o comportamento visual importar
- link do Figma, se existir

A spec deve descrever:

- pelo que o componente é responsável
- comportamento esperado
- estados relevantes
- descrição visual apenas quando isso afetar entendimento ou manutenção

### Store

Ler:

- `store.ts`
- `types.ts`
- `schemas.ts`
- docs do domínio: `README.md`, `step-by-step.md`, `event-map.md`, `test-cases.md`, `decision-log.md`, quando existirem

A spec deve descrever:

- responsabilidades do estado
- ações importantes
- comportamento assíncrono
- fronteiras com services e pages

### Service

Ler:

- código do service
- `docs/product/notion/data-sources.md`, quando o comportamento depender de dados do Notion
- store/page consumidora
- docs do domínio quando o service fizer parte de um fluxo de produto

A spec deve descrever:

- propósito da integração
- entradas e saídas que importam para o frontend
- ressalvas de contrato
- workarounds temporários ou limitações conhecidas

### Fluxo de domínio

Ler:

- `README.md` do domínio
- `docs/product/history/<domain-or-flow>/product-history.md`, quando existir
- `step-by-step.md`
- `event-map.md`
- `test-cases.md`
- `decision-log.md`
- stores, pages e services relevantes

A spec deve descrever:

- objetivo principal do fluxo
- fronteiras
- jornada e estados-chave
- restrições de negócio e técnicas importantes

## Figma e referências visuais

Se o artefato tiver uma referência visual oficial, inclua-a na spec.

Use Figma principalmente para:

- pages
- route-specific components
- components with meaningful visual behavior

Não force referências de Figma para artefatos puramente técnicos, como a maioria das stores e services.

## Regras de escrita

- escrever em linguagem natural
- otimizar para manutenção, não para exaustividade
- não repetir o código linha por linha
- melhorar o que já existir antes de recriar desnecessariamente a spec
- não copiar `product-history.md`
- não transformar detalhes de implementação em requisitos falsos
- descrever o comportamento esperado de forma que alguém entenda o artefato sem abrir todos os arquivos primeiro
- para artefatos visuais, incluir descrição visual apenas quando isso trouxer clareza real

## Estrutura sugerida da saída

Use a estrutura de `docs/patterns/specs.md`.

Seções típicas:

- objetivo
- fronteiras ou contexto
- comportamento esperado
- estados e variacoes
- regras importantes
- integracoes
- referencias

Adapte as seções quando necessário, mas mantenha o documento enxuto.

## Validação final

Antes de concluir:

- confirme que a spec ainda corresponde ao código atual
- confirme que os links são válidos
- confirme que `docs/patterns/documentacao.md` foi respeitado
- se o artefato for visual, confirme se uma referência de Figma deve ser incluída
