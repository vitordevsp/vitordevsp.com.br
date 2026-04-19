# Pages

## Objetivo

Definir o padrao de criacao e manutencao de pages e componentes especificos de rota em `src/app`.

## Quando consultar este arquivo

Consulte este arquivo quando for:

- criar uma nova page;
- extrair componentes locais de uma rota;
- decidir se um componente deve ficar em `src/app` ou em `src/components`;
- escrever ou revisar um `specs.md` de page.

## Fonte da verdade e limites do documento

Este arquivo cobre:

- responsabilidade de pages;
- uso de `src/app/<rota>/components`;
- quando `specs.md` faz sentido para pages.

Este arquivo nao cobre:

- arquitetura macro da aplicacao;
- padrao de integracao com o Notion;
- padrao de componentes compartilhados.

Para esses temas, consultar:

- [`aplicacao.md`](./aplicacao.md)
- [`services.md`](./services.md)
- [`componentes.md`](./componentes.md)
- [`documentacao.md`](./documentacao.md)
- [`specs.md`](./specs.md)

## Regras principais

- A page deve ser um React Server Component (RSC) assincrono.
- A page busca dados do Notion diretamente — sem hooks, effects ou fetching no cliente.
- A page recebe `params` e `searchParams` como props e os resolve antes de buscar dados.
- Componentes em `src/app/<rota>/components` devem existir apenas quando forem especificos daquela rota.
- Se um componente passar a ter valor claro de reuso entre rotas, ele deve migrar para `src/components`.
- Pages nao devem reimplementar logica de acesso ao Notion ja coberta por `src/lib/notion/`.

## Estrutura recomendada

Estrutura comum:

```text
src/app/(pages)/<rota>/
  page.tsx
  components/
    ...
```

Responsabilidades da page:

- ler `params` e `searchParams`;
- chamar funcoes de `src/lib/notion/` para buscar dados;
- escolher o fluxo visual;
- compor layout passando dados como props para os componentes.

Padrao de page tipica:

```tsx
export default async function PostPage({ params }: { params: { slug: string } }) {
  const pageId = generateNotionPageID(params.slug)
  const page = await getPageById<PostProps>(pageId)
  const blocks = await getAllBlockChildren(pageId, { deep: true })

  return (
    <PageContainer>
      <BlogPostRendering page={page} blocks={blocks} />
    </PageContainer>
  )
}
```

Quando criar `specs.md` para page:

- a page orquestra mais de um estado relevante;
- a page tem variacoes por parametro;
- o passo a passo esperado da tela precisa ficar claro em linguagem natural;
- a descricao visual ajuda a explicar hierarquia da tela, estados ou diferencas relevantes entre secoes.

Para a estrutura base do `specs.md`, consultar [`specs.md`](./specs.md).

## Checklist de criacao ou revisao

- a page e um RSC assincrono (`async function Page`)?
- os dados sao buscados via `src/lib/notion/` na propria page?
- a page nao usa `"use client"`?
- os componentes locais sao realmente exclusivos da rota?
- existe `specs.md` quando o fluxo da page nao e trivial?
- [`documentacao.md`](./documentacao.md) foi revisado no fechamento para validar docs e navegacao?

## Relacao com outros patterns

- [`aplicacao.md`](./aplicacao.md) define o papel de `src/app`.
- [`componentes.md`](./componentes.md) cobre componentes compartilhados.
- [`services.md`](./services.md) define o padrao de integracao com o Notion.
- [`specs.md`](./specs.md) define o padrao geral de `specs.md`.
