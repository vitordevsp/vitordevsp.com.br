# Notion como CMS

## Papel do Notion neste projeto

O Notion funciona exclusivamente como **CMS (Content Management System)** — fonte de conteudo do site, nao ferramenta de gestao de trabalho.

O autor cria e edita conteudo diretamente no Notion (posts, projetos, videos). O site consome esses dados via API em tempo de request, sem necessidade de rebuild ou redeployamento.

## Como o conteudo flui

```
Autor edita no Notion
       ↓
Banco de dados Notion (Posts / Videos / Projetos)
       ↓
API Notion (@notionhq/client)
       ↓
Page RSC no Next.js (async Server Component)
       ↓
getDatabaseItems<T>() / getPageById<T>() / getAllBlockChildren()
       ↓
Renderizacao via PageRenderer / RichTextRender
       ↓
HTML servido ao usuario
```

## Dois sistemas de consumo

### Sistema moderno (`src/lib/notion/`)

- Usa `NOTION_TOKEN` para autenticacao.
- Oferece `getDatabaseItems<T>()`, `getPageById<T>()`, `getAllBlockChildren()`.
- Tipagem generica via `EnsureNotionPropertiesSchema`.
- Usado por: Posts (listagem e pagina individual).

### Sistema legacy (`src/app/api/notion/_resources/`)

- Usa `NOTION_KEY` para autenticacao.
- Servicos especificos: `videoService.list()`, `projectService.list()`.
- Em processo de migracao para o sistema moderno.
- Usado por: Videos, Projetos.

## Estrutura de conteudo no Notion

O workspace do Notion contem tres bancos de dados principais:

1. **Posts** — artigos tecnicos e de reflexao do autor
2. **Videos** — videos publicados no canal YouTube
3. **Projetos** — portfólio de projetos desenvolvidos

Para detalhes de propriedades de cada banco, consultar [`data-sources.md`](./data-sources.md).

## Renderizacao de conteudo

Paginas de post buscam os blocos de conteudo via `getAllBlockChildren()` e os renderizam com `PageRenderer`.

`PageRenderer` suporta:

- paragrafos, headings (H1/H2/H3)
- listas com marcadores e numeradas (com agrupamento automatico)
- toggles, callouts, citacoes
- blocos de codigo (com destaque de sintaxe)
- imagens e divisores

Anotacoes inline (bold, italic, code, links, cores) sao tratadas por `RichTextRender`.

## Regra de uso

- Conteudo publicado no site sempre vem do Notion.
- O Notion nao e usado para gestao de tarefas ou planejamento deste projeto — apenas para conteudo editorial.
- Novos bancos de dados devem ser integrados via sistema moderno.
