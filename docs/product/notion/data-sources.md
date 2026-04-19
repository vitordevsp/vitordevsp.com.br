# Data Sources

Esta pasta documenta os bancos de dados do Notion usados como CMS do site.

---

## Posts

**Variavel de ambiente**: `NOTION_DB_POSTS`

**Sistema**: Moderno (`getDatabaseItems<PostProps>()`)

**Papel**: Armazena os artigos e posts tecnicos publicados no site.

### Propriedades

| Propriedade | Tipo | Uso |
|-------------|------|-----|
| `Nome` | Title | Titulo do post |
| `Status` | Select | Controla publicacao (`Published`, rascunhos, etc) |
| `Descricao` | Rich Text | Descricao curta exibida nos cards |
| `Tags` | Multi-select | Tags do post (exibidas nos cards e filtros) |
| `Publicado Em` | Date | Data de publicacao exibida no site |
| `Criado Em` | Date | Data de criacao interna |
| `Atualizado Em` | Date | Data da ultima atualizacao |
| `Ano` | Select | Ano de publicacao (para filtros futuros) |
| `Wiki` | Select | Campo auxiliar interno |

### Como e usado

- **Listagem** (`/posts`): filtra por `Status = Published`, ordena por `Publicado Em` decrescente.
- **Home** (`/`): busca os 3 posts mais recentes publicados.
- **Pagina do post** (`/posts/[slug]`): busca a pagina por ID + todos os blocos de conteudo.

### Schema TypeScript

```ts
export type PostProps = EnsureNotionPropertiesSchema<{
  Status: NotionSelectProperty
  Wiki: NotionSelectProperty
  Nome: NotionTitleProperty
  Descricao: NotionRichTextProperty
  Tags: NotionMultiSelectProperty<string>
  "Publicado Em": NotionDateProperty
  "Atualizado Em": NotionDateProperty
  "Criado Em": NotionDateProperty
  Ano: NotionSelectProperty
}>
```

---

## Videos

**Variavel de ambiente**: `NOTION_DB_VIDEOS`

**Sistema**: Legacy (`videoService.list()`) — em migracao para o sistema moderno.

**Papel**: Armazena os videos publicados no canal YouTube do autor.

### Propriedades conhecidas

| Propriedade | Tipo | Uso |
|-------------|------|-----|
| Titulo | Title | Titulo do video |
| Tags | Multi-select | Tags do video |
| `idVideoYT` | Text | ID do video no YouTube (para gerar thumbnail e link) |
| Status | Select | Controla publicacao (`published`) |
| Descricao | Rich Text | Descricao curta |
| Data | Date | Data de publicacao |

### Como e usado

- **Listagem** (`/videos`): busca todos os videos com `status = published`.
- Thumbnail gerada a partir de `idVideoYT`: `https://i.ytimg.com/vi/{id}/hqdefault.jpg`.
- Link do video: `https://www.youtube.com/watch?v={id}`.

---

## Projetos

**Variavel de ambiente**: `NOTION_DB_PROJECTS`

**Sistema**: Legacy (`projectService.list()`) — em migracao para o sistema moderno.

**Papel**: Armazena os projetos do portfólio do autor.

### Propriedades conhecidas

| Propriedade | Tipo | Uso |
|-------------|------|-----|
| Titulo | Title | Nome do projeto |
| Descricao | Rich Text | Descricao curta |
| Tags | Multi-select | Tecnologias e categorias |
| Data inicial | Date | Data de inicio do projeto |
| Link site | URL | Link para o site do projeto |
| Link GitHub | URL | Link para o repositorio |
| Link Figma | URL | Link para o design |
| Link YouTube | URL | Link para video do projeto |
| Destaque | Checkbox | Marca projetos para exibicao na home |

### Como e usado

- **Listagem** (`/projetos`): busca todos os projetos.
- **Home** (`/`): busca os 3 projetos com `Destaque = true`.

---

## Notas de migracao

Os bancos de Videos e Projetos ainda sao consumidos pelo sistema legacy. A migracao para `getDatabaseItems<T>()` esta planejada em [`PLAN-001-migracao-notion-legado`](../../plans/PLAN-001-migracao-notion-legado/README.md).

Apos a migracao, cada banco tera seu schema TypeScript em `src/types/notion.type.ts` e usara `NOTION_TOKEN` em vez de `NOTION_KEY`.
