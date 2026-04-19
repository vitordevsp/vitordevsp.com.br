# Componentes

## Objetivo

Definir onde os componentes devem morar, como devem evoluir e quando precisam de documentacao adicional, incluindo `specs.md`.

## Quando consultar este arquivo

Consulte este arquivo quando for:

- criar um novo componente;
- decidir entre `frames/`, `shared/` ou componente de rota;
- revisar responsabilidades de um componente que cresceu;
- definir se um componente precisa de `specs.md`.

## Fonte da verdade e limites do documento

Este arquivo cobre:

- taxonomia de componentes compartilhados;
- limites entre componente compartilhado e componente de rota;
- regras praticas de evolucao de componentes.

Este arquivo nao cobre:

- contratos de integracao Notion;
- arquitetura de paginas;
- padrao detalhado de tipagem.

Para esses temas, consultar:

- [`pages.md`](./pages.md)
- [`services.md`](./services.md)
- [`tipagem.md`](./tipagem.md)
- [`documentacao.md`](./documentacao.md)
- [`specs.md`](./specs.md)

## Regras principais

- Antes de criar um componente, decidir se ele pertence a `src/components` ou a `src/app/<rota>/components`.
- Componentes de `frames/` representam blocos maiores de layout ou cards complexos com multiplas responsabilidades visuais.
- Componentes de `shared/` devem ser pequenos, neutros e reutilizaveis entre qualquer parte do projeto.
- Componentes de rota nao devem buscar dados do Notion — os dados chegam como props vindos da page RSC.
- Quando um componente crescer, primeiro fatiar responsabilidades antes de move-lo de pasta.
- Todos os componentes sao exportados via barrel em `src/components/index.ts`.

## Estrutura real do projeto

```text
src/components/
  frames/              ← blocos maiores de layout e cards compostos
    PageHeader/
    PageFooter/
    PageContainer/
    BlogPostCard/
    BlogPostRendering/
    ProjectCard/
    VideoCard/
    ServiceCard/
    SkillCard/
  shared/              ← primitivos e componentes neutros reutilizaveis
    Heading/
    Paragraph/
    Span/
    Tag/
    Tags/
    Icon/
    LinkWithIcon/
    Flexbox/
  index.ts             ← barrel export de todos os componentes
```

Regra pratica de decisao:

- se for card, secao de pagina, header, footer ou bloco estrutural reutilizavel → `frames/`
- se for primitivo visual (texto, icone, tag, link, flexbox) → `shared/`
- se for exclusivo de uma rota → `src/app/<rota>/components`

Quando criar `specs.md` para componente:

- o componente orquestra comportamento, nao apenas apresentacao;
- o componente tem varios estados visuais relevantes;
- a API de props precisa ser entendida em linguagem natural;
- hover, loading, erro, status ou composicao sao parte importante do contrato;
- a descricao visual ajuda a comunicar hierarquia, diferencas de estado ou composicao relevante.

Para a estrutura base do `specs.md`, consultar [`specs.md`](./specs.md).

## Checklist de criacao ou revisao

- o componente esta na pasta correta (`frames/` ou `shared/`)?
- ele recebe props em vez de buscar dados do Notion diretamente?
- existe separacao entre apresentacao e logica de dados?
- o componente foi exportado em `src/components/index.ts`?
- existe `specs.md` quando o comportamento nao e obvio?
- [`documentacao.md`](./documentacao.md) foi revisado no fechamento para validar docs e navegacao?

## Relacao com outros patterns

- [`pages.md`](./pages.md) cobre componentes exclusivos de rota.
- [`services.md`](./services.md) define onde a logica de integracao Notion deve viver.
- [`documentacao.md`](./documentacao.md) define a estrategia geral de documentacao.
- [`specs.md`](./specs.md) define quando usar e como estruturar `specs.md`.
