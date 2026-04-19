# Specs

## Objetivo

Definir quando criar `specs.md`, qual deve ser o papel desse documento e como estruturar sua leitura em linguagem natural sem duplicar o restante da documentacao tecnica.

`specs.md` deve ser legivel quase como um texto para alguem que nao esta vendo a interface: ele explica comportamento esperado, fluxo passo a passo e, quando fizer diferenca para entendimento, a descricao visual do artefato.

## Quando consultar este arquivo

Consulte este arquivo quando for:

- decidir se um artefato precisa de `specs.md`;
- criar ou revisar `specs.md` de componente, page, store ou service;
- diferenciar `specs.md` de `JSDoc` e docs vivos do dominio;
- padronizar a estrutura minima desse tipo de documento.

## Fonte da verdade e limites do documento

Este arquivo cobre:

- criterio de uso de `specs.md`;
- estrutura base do documento;
- variacoes por tipo de artefato;
- relacao entre `specs.md`, `JSDoc` e docs vivos.

Este arquivo nao cobre:

- regras completas de arquitetura por camada;
- contratos tecnicos oficiais de tipos e schemas;
- documentacao funcional detalhada de dominio.

Para esses temas, consultar:

- [`documentacao.md`](./documentacao.md)
- [`componentes.md`](./componentes.md)
- [`pages.md`](./pages.md)
- [`stores.md`](./stores.md)
- [`services.md`](./services.md)
- [`tipagem.md`](./tipagem.md)

## Regras principais

- `specs.md` e o documento simples em linguagem natural para artefatos importantes do projeto.
- Criar `specs.md` apenas quando ele realmente ajudar alguem a entender o artefato sem entrar primeiro no codigo.
- `specs.md` nao substitui tipos, schemas, store, service ou docs vivos do dominio.
- O documento deve explicar responsabilidade, limites e comportamento esperado, nao repetir implementacao linha a linha.
- Sempre que fizer sentido, descrever o fluxo passo a passo de forma que alguem sem acesso visual a interface consiga entender o que deve acontecer.
- Quando a aparencia fizer parte do contrato, incluir descricao visual suficiente para comunicar hierarquia, estados e diferencas relevantes.
- Se o comportamento mudou, o `specs.md` correspondente deve ser revisado no mesmo ciclo.

## Estrutura recomendada

Estrutura base de `specs.md`:

1. objetivo do artefato
2. responsabilidades
3. entradas e saidas principais
4. fluxo ou comportamento esperado, de preferencia em ordem de leitura
5. regras importantes
6. dependencias e integracoes
7. o que nao pertence a ele

Variacoes por tipo:

- componente
  - props, estados visuais, hover, loading, erro, composicao e descricao visual quando relevante
- page
  - contexto de rota, params, composicao, passo a passo da tela e descricao visual quando relevante
- store
  - estado, grupos de actions, efeitos colaterais, persistencia e sequencia esperada das transicoes
- service
  - operacoes, payloads, retornos, erros e integracao

Como decidir entre niveis de documentacao:

- usar `JSDoc` para explicar uma unidade local
- usar `specs.md` para explicar um artefato importante em linguagem natural
- usar `docs/` para fluxo, contrato e comportamento de integracao Notion

## Checklist de criacao ou revisao

- o artefato realmente precisa de leitura em linguagem natural?
- o texto ajuda a entender responsabilidade, comportamento e limites sem duplicar codigo?
- alguem sem acesso visual a interface conseguiria entender o que deve acontecer?
- quando relevante, a descricao visual ficou suficiente para comunicar o contrato?
- a estrutura base foi respeitada?
- o `specs.md` aponta para dependencias reais e nao inventadas?
- houve revisao do documento no mesmo ciclo da mudanca funcional?

## Relacao com outros patterns

- [`documentacao.md`](./documentacao.md) define a estrategia geral de documentacao e navegacao no codigo.
- [`componentes.md`](./componentes.md), [`pages.md`](./pages.md), [`stores.md`](./stores.md) e [`services.md`](./services.md) definem quando `specs.md` faz sentido em cada camada.
- [`tipagem.md`](./tipagem.md) continua sendo a fonte oficial dos contratos tecnicos.
