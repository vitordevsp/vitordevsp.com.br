# Notion Docs — Clone local (recorte)

Espelho parcial da documentação oficial do Notion API em Markdown, limitado ao que é exercido (ou pode vir a ser) por [src/lib/notion/](../../../src/lib/notion/).

## Origem

- Fonte: `https://developers.notion.com/<path>.md` (a doc oficial disponibiliza cada página como `.md` bruto)
- Indice de descoberta: `https://developers.notion.com/llms.txt`
- Baixado em: 2026-04-21
- Versão da API vigente no texto: **2025-09-03** (ver [reference/versioning.md](reference/versioning.md))

Importante: essas páginas não são atualizadas automaticamente. Tratar como snapshot. Rebaixar quando precisar revalidar.

## Como rebaixar

A lista está fixada no script usado para gerar este clone (ver histórico do commit). Para atualizar tudo, apagar e rodar o mesmo script com `curl -sSL https://developers.notion.com/<path>.md -o <path>.md`.

## Escopo incluído

Conceitos base, objetos (block/page/rich-text/database/data-source/property/parent/file/emoji), endpoints de leitura (`retrieve`, `query`, `get-block-children`), filtros/sorts, autenticação, versionamento, limites. Mais os guides de markdown — novidade que pode influenciar o refactor do `PageRenderer`.

## Fora de propósito (não baixado)

Estas áreas da doc oficial foram deixadas de fora porque nada em `src/lib/notion/` as exerce hoje. Se algum item passar a ser usado, adicionar pontualmente.

### Endpoints de escrita
- `reference/post-page.md` — criar página
- `reference/patch-page.md` — atualizar página
- `reference/move-page.md`, `reference/trash-page.md`
- `reference/patch-block-children.md` — anexar blocks
- `reference/update-a-block.md`, `reference/delete-a-block.md`
- `reference/create-a-database.md`, `reference/create-database.md`, `reference/update-a-database.md`, `reference/update-database.md`
- `reference/create-a-data-source.md`, `reference/update-a-data-source.md`
- `reference/update-data-source-properties.md`, `reference/update-property-schema-object.md`
- `reference/update-page-markdown.md` — variante md da update-page

### Comentários
- `reference/comment-object.md`, `reference/comment-attachment.md`, `reference/comment-display-name.md`
- `reference/create-a-comment.md`, `reference/list-comments.md`, `reference/retrieve-comment.md`, `reference/update-a-comment.md`, `reference/delete-a-comment.md`
- `guides/data-apis/working-with-comments.md`

### Uploads de arquivo
- `reference/file-upload.md`, `reference/create-file.md`, `reference/upload-file.md`, `reference/complete-file-upload.md`
- `reference/list-file-uploads.md`, `reference/retrieve-file-upload.md`
- `guides/data-apis/uploading-small-files.md`, `guides/data-apis/sending-larger-files.md`
- `guides/data-apis/importing-external-files.md`, `guides/data-apis/retrieving-files.md`
- `guides/data-apis/working-with-files-and-media.md`

### Users
- `reference/user.md`, `reference/get-user.md`, `reference/get-users.md`, `reference/get-self.md`

### Search
- `reference/post-search.md`, `reference/search-optimizations-and-limitations.md`

### Views
- `reference/view.md`, `reference/create-view.md`, `reference/list-views.md`
- `reference/retrieve-a-view.md`, `reference/update-a-view.md`, `reference/delete-view.md`
- `reference/create-view-query.md`, `reference/get-view-query-results.md`, `reference/delete-view-query.md`
- `guides/data-apis/working-with-views.md`

### OAuth / integrações públicas
- `reference/create-a-token.md`, `reference/refresh-a-token.md`, `reference/revoke-token.md`, `reference/introspect-token.md`
- `reference/capabilities.md`
- `guides/get-started/public-integrations.md`, `guides/get-started/marketplace-listing.md`, `guides/get-started/preparing-for-users.md`

### Webhooks
- `reference/webhooks.md`, `reference/webhooks-events-delivery.md`
- Todos os eventos em `reference/webhooks/*` (comment/data-source/database/page/view/file-upload — ~25 arquivos)

### Link previews
- `reference/unfurl-attribute-object.md`
- `guides/link-previews/introduction.md`, `guides/link-previews/building-a-link-preview.md`

### MCP (Model Context Protocol)
- Todos os arquivos em `guides/mcp/*`
- `guides/agents/connect-cursor-to-custom-agent.md`

### Compliance / SIEM
- `compliance/audit-log-events.md`, `compliance/overview.md`, `compliance/siem-events.md`

### Templates e emojis customizados
- `reference/list-data-source-templates.md`, `guides/data-apis/creating-pages-from-templates.md`
- `reference/list-custom-emojis.md`

### Upgrade / changelog / exemplos
- `guides/get-started/upgrade-guide-2025-09-03.md`, `guides/get-started/upgrade-faqs-2025-09-03.md`, `guides/get-started/upgrade-guide-2026-03-11.md` — úteis quando formos decidir versão do header, mas não baixados pra não poluir
- `guides/resources/*`, `page/changelog.md`, `page/examples.md`
- `reference/changes-by-version.md`, `reference/get-databases.md` (legado)

### OpenAPI specs
- `openapi.json`, `openapi-undocumented.json` — muito grandes; fetch sob demanda se precisar gerar tipos

## Mapeamento com `src/lib/notion/`

### Cliente e autenticação
- [reference/authentication.md](reference/authentication.md) — bearer token, usado em [client.ts](../../../src/lib/notion/client.ts)
- [reference/versioning.md](reference/versioning.md) — header `Notion-Version` e mudanças por versão
- [guides/get-started/handling-api-keys.md](guides/get-started/handling-api-keys.md)

### Features — blocks ([src/lib/notion/features/blocks/](../../../src/lib/notion/features/blocks))
- [reference/block.md](reference/block.md) — catálogo completo dos tipos de block (referência para `AnyNotionBlock` em [types.ts](../../../src/lib/notion/features/blocks/types.ts))
- [reference/get-block-children.md](reference/get-block-children.md) — endpoint consumido por `getBlockChildren` / `getAllBlockChildren` ([index.ts](../../../src/lib/notion/features/blocks/index.ts))
- [reference/retrieve-a-block.md](reference/retrieve-a-block.md) — não usado hoje, referência para extensão
- [guides/data-apis/working-with-page-content.md](guides/data-apis/working-with-page-content.md) — padrões de leitura recursiva (`has_children`)

### Features — pages ([src/lib/notion/features/pages/](../../../src/lib/notion/features/pages))
- [reference/retrieve-a-page.md](reference/retrieve-a-page.md) — endpoint de `getPageById`
- [reference/page.md](reference/page.md) — objeto Page
- [reference/page-property-values.md](reference/page-property-values.md) — valores de propriedade (base para `NotionPropertiesSchema` / `NotionPage<T>`)
- [reference/parent-object.md](reference/parent-object.md)

### Features — databases ([src/lib/notion/features/databases/](../../../src/lib/notion/features/databases))
- [reference/query-a-data-source.md](reference/query-a-data-source.md) — endpoint moderno (2025-09-03); equivalente atual ao `databases.query`
- [reference/post-database-query.md](reference/post-database-query.md) — endpoint legado mantido por compat
- [reference/retrieve-a-database.md](reference/retrieve-a-database.md) — consumido por `getDatabaseProps`
- [reference/retrieve-a-data-source.md](reference/retrieve-a-data-source.md)
- [reference/database.md](reference/database.md) / [reference/data-source.md](reference/data-source.md) — objetos
- [reference/property-object.md](reference/property-object.md) — schema de propriedades (colunas)
- [reference/filter-data-source-entries.md](reference/filter-data-source-entries.md) — base da DSL em [filters.ts](../../../src/lib/notion/features/databases/filters.ts)
- [reference/post-database-query-filter.md](reference/post-database-query-filter.md) — forma legada do mesmo filtro
- [reference/sort-data-source-entries.md](reference/sort-data-source-entries.md) / [reference/post-database-query-sort.md](reference/post-database-query-sort.md)
- [guides/data-apis/working-with-databases.md](guides/data-apis/working-with-databases.md)

### Rich text e arquivos (usados pelo `RichTextRender` e `PageRenderer`)
- [reference/rich-text.md](reference/rich-text.md) — `annotations`, `plain_text`, links — referência para [RichTextRender/index.tsx](../../../src/lib/notion/components/RichTextRender/index.tsx)
- [reference/file-object.md](reference/file-object.md) — `external` vs `file` (url temporária) — relevante para o case `image` em [PageRenderer/index.tsx](../../../src/lib/notion/components/PageRenderer/index.tsx)
- [reference/emoji-and-icon.md](reference/emoji-and-icon.md) — ícones de callout

### Convenções da API
- [reference/intro.md](reference/intro.md) — paginação cursor-based (`start_cursor`, `has_more`) usada em `getAllBlockChildren` e `getDatabaseItems`
- [reference/status-codes.md](reference/status-codes.md)
- [reference/request-limits.md](reference/request-limits.md) — rate limit ~3 req/s (relevante para o plano de paralelizar `deep: true`)

### Markdown endpoints (insumo para PLAN-002)
- [reference/retrieve-page-markdown.md](reference/retrieve-page-markdown.md) — endpoint que devolve a página renderizada como **enhanced markdown**
- [guides/data-apis/working-with-markdown-content.md](guides/data-apis/working-with-markdown-content.md) — guia de uso (ler/criar/atualizar via md)
- [guides/data-apis/enhanced-markdown.md](guides/data-apis/enhanced-markdown.md) — referência do dialeto

Esses três explicam o que o usuário mencionou sobre "páginas em md". Hoje o `PageRenderer` converte blocks JSON → JSX manualmente. Uma alternativa é trocar parte dessa pipeline por `retrieve-page-markdown` + um parser md → JSX. Trade-offs a avaliar no PLAN-002: controle fino sobre o output, custo de requisições, e fidelidade para blocks não padrão.

### Onboarding (para quem chegar novo na integração)
- [guides/get-started/overview.md](guides/get-started/overview.md)
- [guides/get-started/quick-start.md](guides/get-started/quick-start.md)
- [guides/get-started/authorization.md](guides/get-started/authorization.md)
- [guides/get-started/internal-integrations.md](guides/get-started/internal-integrations.md)
