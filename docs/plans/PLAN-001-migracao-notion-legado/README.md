# PLAN-001 — Migrar Implementação Legada do Notion

## Status

| Campo        | Valor      |
|--------------|------------|
| Status       | pendente |
| Criado em    | 2025-01-18 |
| Concluído em | — |

---

## Objetivo

Migrar toda a implementação legada do Notion (em `src/app/api/notion/_resources/`) para a lib moderna (`src/lib/notion/`), eliminando o uso de `NOTION_KEY` e centralizando tudo em `NOTION_TOKEN`.

---

## Contexto

O projeto tem duas implementações paralelas de integração com o Notion. A moderna (`src/lib/notion/`) é tipada, com DSL de filtros e paginação. A legada (`src/app/api/notion/_resources/`) é usada por algumas rotas ainda ativas. Manter as duas gera inconsistência e risco de bugs silenciosos.

---

## Arquivos Afetados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/app/api/notion/_resources/` | remover | Diretório legado inteiro após migração |
| `src/app/(pages)/videos/page.tsx` | modificar | Substituir `videoService.list()` por `getDatabaseItems<VideoProps>()` |
| `src/app/(pages)/projetos/page.tsx` | modificar | Substituir `projectService.list()` por `getDatabaseItems<ProjectProps>()` |
| `src/app/(pages)/(home)/page.tsx` | modificar | Ajustar chamada de projetos para o sistema moderno |
| `src/lib/notion/features/databases/index.ts` | modificar | Corrigir `databaseId` hardcoded — aceitar como parâmetro |
| `src/types/notion.type.ts` | modificar | Adicionar `VideoProps` e `ProjectProps` |
| `src/lib/notion/helpers/` | criar | Helper `videos.ts` com `getYouTubeThumbnailUrl` e `getYouTubeUrl` |
| `.env` / `.env.example` | modificar | Remover `NOTION_KEY`, garantir `NOTION_DB_VIDEOS` e `NOTION_DB_PROJECTS` |

---

## Critério de Conclusão

### Pré-requisitos
- [ ] Confirmar se `NOTION_KEY` e `NOTION_TOKEN` apontam para o mesmo integration secret
- [ ] Confirmar IDs reais de `NOTION_DB_VIDEOS` e `NOTION_DB_PROJECTS` no `.env`
- [ ] Confirmar se as rotas `/api/notion/*` têm algum consumidor externo (se sim, não podem ser removidas ainda)

### Correção bloqueante (fazer primeiro)
- [ ] Corrigir `databaseId` hardcoded em `src/lib/notion/features/databases/index.ts` — passar como parâmetro da função
- [ ] Atualizar chamadas existentes em home e posts para passar o ID explicitamente

### Migração de Vídeos
- [ ] Criar `VideoProps` com `EnsureNotionPropertiesSchema` em `src/types/notion.type.ts`
- [ ] Criar helper `getYouTubeThumbnailUrl(id)` e `getYouTubeUrl(id)` em `src/lib/notion/helpers/videos.ts`
- [ ] Migrar `src/app/(pages)/videos/page.tsx` para `getDatabaseItems<VideoProps>()`

### Migração de Projetos
- [ ] Criar `ProjectProps` com `EnsureNotionPropertiesSchema` em `src/types/notion.type.ts`
- [ ] Migrar `src/app/(pages)/projetos/page.tsx` para `getDatabaseItems<ProjectProps>()`
- [ ] Migrar chamada de projetos na home

### Limpeza
- [ ] Remover `src/app/api/notion/_resources/` (após confirmar que nada externo consome)
- [ ] Remover `NOTION_KEY` do `.env` e `.env.example`
- [ ] `pnpm build` sem erros após a migração
- [ ] Todas as rotas testadas manualmente em desenvolvimento

---

## Fora do Escopo

- Refactor ou melhorias na lib moderna (isso é o PLAN-002)
- Criação de novos domínios ou queries do Notion
- Alterações visuais nas páginas

---

## Riscos e Dependências

| Tipo | Descrição |
|------|-----------|
| Risco | Rotas `/api/notion/*` podem ter consumidores externos — verificar antes de remover |
| Risco | `NOTION_KEY` pode apontar para integration diferente de `NOTION_TOKEN` — confirmar |
| Risco | Legacy usa `videoService.utils.ts` para gerar URLs do YouTube — esse comportamento precisa ser replicado em helper antes da remoção |
| Dependência | Nenhuma — deve ser o primeiro plano executado |

---

## Notas de Implementação

- Antes de deletar qualquer arquivo, mapear todos os `import` que apontam para `_resources/`
- O bloqueio principal é o `databaseId` hardcoded — sem corrigir isso, não é possível chamar `getDatabaseItems` para vídeos e projetos
- O legacy usa `videoService.utils.ts` para derivar `thumbnailUrl`, `videoUrl` e `postUrl` a partir de `idVideoYT` — replicar como helper antes de migrar
- O helper de YouTube: `thumbnail = https://i.ytimg.com/vi/{id}/hqdefault.jpg`, `url = https://www.youtube.com/watch?v={id}`

### Correção do `databaseId` hardcoded

```ts
// atual — só serve para um banco
const databaseId = process.env.NOTION_DATABASE_ID!
export async function getDatabaseItems<T>({ ... })

// corrigido — recebe o ID como parâmetro
export async function getDatabaseItems<T extends NotionPropertiesSchema>(
  databaseId: string,
  options?: GetDatabaseItemsOptions<T>,
): Promise<DatabaseItemsResponse<NotionPage<T>>>
```

Uso nas páginas após a correção:
```ts
getDatabaseItems<PostProps>(process.env.NOTION_DB_POSTS!, { where: ... })
getDatabaseItems<VideoProps>(process.env.NOTION_DB_VIDEOS!, { where: ... })
getDatabaseItems<ProjectProps>(process.env.NOTION_DB_PROJECTS!, { where: ... })
```

### O que o legado faz que o moderno ainda não faz

| Comportamento | Legacy | Moderno | O que fazer |
|---------------|--------|---------|-------------|
| Query com `databaseId` variável | ✅ | ❌ | Corrigir `databaseId` hardcoded (item acima) |
| Transformar `idVideoYT` → URLs do YouTube | ✅ | ❌ | Criar helper em `helpers/videos.ts` |
| Normalizar multi_select → `string[]` | ✅ | parcial | Criar helper genérico |
| Formatar data em pt-BR | ✅ | ✅ (`parseDateDisplay`) | Já resolvido |
| Extrair `plain_text` de rich_text | ✅ | ✅ (`richTextToPlain`) | Já resolvido |
| Extrair slug da URL Notion | ✅ | ✅ (`generateNotionPageSlug`) | Já resolvido |

### Mapa do sistema legacy a eliminar

```
src/app/api/notion/
├── _resources/
│   ├── notionRepository/
│   │   └── notionRepository.ts       ← substituído por src/lib/notion/features/
│   └── modules/
│       ├── posts/
│       │   ├── services/postService.ts       ← migrar para página RSC direta
│       │   ├── services/postService.utils.ts
│       │   └── types/post.type.ts            ← substituído por EnsureNotionPropertiesSchema
│       ├── videos/
│       │   ├── services/videoService.ts
│       │   ├── services/videoService.utils.ts
│       │   └── types/video.type.ts
│       └── projects/
│           ├── services/projectService.ts
│           ├── services/projectService.utils.ts
│           └── types/project.type.ts
├── posts/route.ts       ← pode ser removido se nenhum cliente externo consome
├── videos/route.ts      ← idem
├── projects/route.ts    ← idem
└── contents/route.ts    ← idem
```

### Variáveis de ambiente após a migração

```env
NOTION_TOKEN=           # já existe
NOTION_DB_POSTS=        # já existe (hoje como NOTION_DATABASE_ID — renomear)
NOTION_DB_VIDEOS=       # confirmar/criar
NOTION_DB_PROJECTS=     # confirmar/criar
# NOTION_KEY            # remover após migração
```

### Perguntas em aberto

- As rotas `/api/notion/` são consumidas por algum cliente externo? Se sim, não podem ser removidas ainda.
- `NOTION_KEY` e `NOTION_TOKEN` apontam para o mesmo integration secret ou são diferentes?
- O legacy usa `pageSize` hardcoded nas queries de vídeos/projetos? Verificar antes de migrar.

---

## Log de Execução

| Data | O que foi feito |
|------|-----------------|
| — | — |
