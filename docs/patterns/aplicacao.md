# Aplicacao

## Objetivo

Definir o papel de `src/app` na arquitetura do projeto e registrar como as rotas se relacionam com a integracao Notion e os componentes.

## Quando consultar este arquivo

Consulte este arquivo quando for:

- criar ou reorganizar rotas;
- revisar a composicao de uma pagina;
- decidir se uma responsabilidade pertence a `src/app` ou a outra camada;
- entender como os fluxos principais se conectam.

## Fonte da verdade e limites do documento

Este arquivo cobre:

- responsabilidades de `src/app`;
- regras de composicao de paginas;
- fronteira entre rota, page e integracao Notion.

Este arquivo nao cobre:

- padrao detalhado de paginas e componentes de rota;
- estrutura interna da integracao Notion;
- contratos de tipagem.

Para esses temas, consultar:

- [`pages.md`](./pages.md)
- [`services.md`](./services.md)
- [`componentes.md`](./componentes.md)
- [`tipagem.md`](./tipagem.md)
- [`documentacao.md`](./documentacao.md)

## Regras principais

- `src/app` monta rotas e compoe paginas.
- `src/app` resolve `params` e `searchParams` de navegacao.
- Todas as pages sao React Server Components (RSC) assincrono — nao usar `"use client"` em pages.
- Dados devem ser buscados diretamente na page via `src/lib/notion/` — sem data fetching no cliente.
- Componentes exclusivos de uma rota podem viver em `src/app/<rota>/components`.
- Componentes compartilhados entre rotas nao devem nascer em `src/app`.
- `src/app` nao deve concentrar logica de acesso ao Notion — essa responsabilidade pertence a `src/lib/notion/`.

## Estrutura real do projeto

```text
src/app/
  (pages)/             ← route group com todas as paginas
    (home)/
      page.tsx
    posts/
      page.tsx
      [slug]/
        page.tsx
    projetos/
      page.tsx
    videos/
      page.tsx
    sobre/
      page.tsx
  api/
    notion/            ← sistema legacy (a migrar)
  layout.tsx           ← layout raiz com header, footer e analytics
```

Camadas da aplicacao:

- `src/app` — rotas, pages e composicao de tela
- `src/lib/notion/` — integracao com o Notion (sistema moderno)
- `src/app/api/notion/` — integracao legacy (em migracao)
- `src/components` — componentes compartilhados (`frames/` e `shared/`)

Fluxo esperado em cada page:

1. a rota resolve `params`/`searchParams`;
2. a page chama funcoes de `src/lib/notion/` diretamente;
3. os dados retornados sao passados como props para os componentes;
4. o componente renderiza sem buscar dados proprios.

Exemplo de page tipica:

```tsx
export default async function PostsPage() {
  const { results } = await getDatabaseItems<PostProps>(NOTION_DB_POSTS, {
    where: { Status: { equals: "Published" } },
    sort: [{ property: "Publicado Em", direction: "descending" }],
  })

  return (
    <PageContainer>
      {results.map((post) => (
        <BlogPostCard key={post.id} {...mapPostToCardProps(post)} />
      ))}
    </PageContainer>
  )
}
```

## Checklist de criacao ou revisao

- a page e um RSC assincrono?
- os dados sao buscados via `src/lib/notion/` na propria page?
- nao ha `"use client"` na page?
- a page evita concentrar logica de acesso ao Notion?
- componentes exclusivos da rota ficaram em `src/app/<rota>/components`?
- [`documentacao.md`](./documentacao.md) foi revisado no fechamento para validar docs e navegacao?

## Relacao com outros patterns

- [`pages.md`](./pages.md) detalha como criar e manter pages e componentes especificos de rota.
- [`services.md`](./services.md) define o padrao de integracao com o Notion.
- [`componentes.md`](./componentes.md) define como organizar componentes compartilhados.
