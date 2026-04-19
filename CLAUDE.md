# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com o código deste repositório.

## Comandos

```bash
pnpm dev       # Inicia o servidor de desenvolvimento
pnpm build     # Build de produção
pnpm start     # Servidor de produção
pnpm lint      # ESLint (next/core-web-vitals)
```

Nenhum conjunto de testes configurado.

## Arquitetura

**Portfólio pessoal/blog** (Next.js 15 App Router, TypeScript, SCSS, Notion como CMS).

### Páginas e Roteamento

As páginas ficam em `src/app/(pages)/` usando o padrão de route group. Todas as páginas são componentes React Server Components assíncronos que buscam dados do Notion diretamente — sem data fetching no cliente. Rotas: `/` (home), `/posts`, `/posts/[slug]`, `/projetos`, `/videos`, `/sobre`.

### Organização de Componentes

- `src/components/frames/` — componencrtes de layout/container (PageHeader, PageFooter, cards)
- `src/components/shared/` — primitivos reutilizáveis (Heading, Paragraph, Tag, Flexbox, Icon)
- Todos os componentes são exportados via barrel em `src/components/index.ts`

### Integração com o Notion

A integração principal fica em `src/lib/notion/`. Exports principais:

- `getDatabaseItems<T>(databaseId, options)` — query tipada de banco de dados com DSL de filtros que suporta lógica `and`/`or`, operações em multi-select e paginação via `startCursor`/`nextCursor`
- `getPageById<T>(pageId)` — busca metadados e propriedades de uma página
- `getAllBlockChildren(blockId)` — busca recursivamente todos os blocos de uma página com paginação
- `richTextRender(richText)` — converte anotações de rich text do Notion para JSX

**Padrão de tipos para bancos de dados:**
```ts
type PostProperties = EnsureNotionPropertiesSchema<{
  Title: NotionTitleProperty
  Status: NotionSelectProperty
}>

const { results } = await getDatabaseItems<PostProperties>(DB_ID, {
  where: { Status: { equals: "Published" } },
  sort: [{ property: "Title", direction: "ascending" }],
})
```

Existe também uma integração legada do Notion em `src/app/api/notion/_resources/` que usa a variável de ambiente `NOTION_KEY` — a lib moderna usa `NOTION_TOKEN`. Prefira a abordagem de `src/lib/notion/` para novos trabalhos.

### Renderização de Conteúdo

`PageRenderer` (em `src/lib/notion/`) renderiza blocos do Notion para JSX — suporta títulos, parágrafos, listas com marcadores/numeradas (com lógica de agrupamento para itens adjacentes), toggles, blocos de código e imagens. `RichTextRender` cuida das anotações inline (negrito, itálico, links, código, tachado).

### Estilização

SCSS puro — sem Tailwind. Estilos globais e custom properties CSS ficam em `src/styles/`. Tema escuro com variáveis como `--background-color`, `--text-color-white`. Estilos de componentes usam arquivos `.scss` ou CSS Modules (`.module.css`). Breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px.

### Estilo de Código

O ESLint exige: sem ponto e vírgula, aspas duplas, espaços dentro de chaves de objetos. TypeScript em modo strict. O alias de caminho `@/*` aponta para `src/*`.

### Variáveis de Ambiente

- `NOTION_TOKEN` — chave de API do Notion (lib moderna)
- `NOTION_KEY` — chave de API do Notion (rotas legadas)
- `NOTION_DATABASE_ID`, `NOTION_DB_POSTS` — IDs dos bancos de dados
