# PLAN-001 — Migrar Implementação Legada do Notion

## Status

| Campo | Valor |
|------|------|
| Status | pendente |
| Criado em | 2026-04-19 |
| Atualizado em | 2026-04-19 |
| Concluído em | — |

## Objetivo

Migrar vídeos e projetos do sistema legacy em `src/app/api/notion/_resources/` para a lib moderna em `src/lib/notion/`, deixando o site com uma única integração principal com o Notion.

## Contexto

O projeto hoje tem duas integrações com o Notion:

- a moderna, em `src/lib/notion/`, usada por posts e baseada em `NOTION_TOKEN`;
- a legacy, em `src/app/api/notion/_resources/`, usada por vídeos e projetos e baseada em `NOTION_KEY`.

Essa duplicidade cria risco de divergência de schema, comportamento e credencial. A migração precisa acontecer antes de planos que criem novas páginas baseadas em Notion.

## Escopo

- validar se as credenciais e bancos atuais permitem migrar sem perda de acesso;
- corrigir `getDatabaseItems` para receber `databaseId` explicitamente;
- migrar listagem de vídeos para `getDatabaseItems<VideoProps>()`;
- migrar listagem de projetos e destaques da home para `getDatabaseItems<ProjectProps>()`;
- remover `_resources/` e `NOTION_KEY` somente quando não houver consumidor externo das rotas antigas;
- atualizar documentação afetada pelo fim do legacy.

## Fora do escopo

- reorganização por domínio em `src/lib/notion/domains/` — coberta pelo PLAN-002;
- mudanças visuais nas páginas de vídeos, projetos ou home;
- criação de novos bancos de dados do Notion;
- leitura ou exposição do `.env` real nos docs.

## Áreas afetadas

| Área | Ação | Observação |
|------|------|------------|
| `src/lib/notion/features/databases/index.ts` | modificar | `databaseId` deixa de vir de `process.env.NOTION_DATABASE_ID` internamente |
| `src/app/(pages)/(home)/page.tsx` | modificar | posts e projetos devem usar IDs explícitos |
| `src/app/(pages)/posts/page.tsx` | modificar | ajustar assinatura de `getDatabaseItems` |
| `src/app/(pages)/videos/page.tsx` | modificar | remover `videoService.list()` |
| `src/app/(pages)/projetos/page.tsx` | modificar | remover `projectService.list()` |
| `src/types/notion.type.ts` | modificar | adicionar `VideoProps` e `ProjectProps` |
| `src/lib/notion/helpers/` | criar/modificar | helpers de YouTube, se não houver alternativa moderna |
| `src/app/api/notion/_resources/` | remover | só depois de validar consumidores externos |
| `.env.example` | modificar | documentar variáveis modernas; remover `NOTION_KEY` após limpeza |
| `docs/product/notion/` | atualizar | refletir o estado pós-migração |

## Backlog

- [ ] Validar credenciais, bancos e consumidores externos das rotas antigas.
- [ ] Corrigir a API moderna para receber `databaseId` explícito e atualizar chamadas existentes.
- [ ] Migrar vídeos para a lib moderna, preservando URLs/thumbnail do YouTube.
- [ ] Migrar projetos para a lib moderna, incluindo destaques da home.
- [ ] Remover o legacy e limpar variáveis/documentação obsoletas quando for seguro.
- [ ] Validar build e rotas afetadas.

## Riscos e dependências

| Tipo | Descrição |
|------|-----------|
| Risco | `NOTION_KEY` e `NOTION_TOKEN` podem pertencer a integrations diferentes. |
| Risco | Rotas `/api/notion/*` podem ter consumidor externo desconhecido. |
| Risco | O legacy gera `thumbnailUrl`, `videoUrl` e `postUrl` para vídeos; a migração precisa preservar esse contrato. |
| Dependência | É o primeiro plano da cadeia Notion. PLAN-002, PLAN-005 e PLAN-006 dependem desta base mais estável. |

## Notas de implementação

Antes de remover arquivos, mapear imports internos para `_resources/` e confirmar se as rotas antigas ainda precisam existir publicamente.

O bloqueio técnico principal é `getDatabaseItems` usar `process.env.NOTION_DATABASE_ID` internamente:

```ts
export async function getDatabaseItems<T extends NotionPropertiesSchema>(
  databaseId: string,
  options?: GetDatabaseItemsOptions<T>,
): Promise<DatabaseItemsResponse<NotionPage<T>>>
```

Uso esperado após a correção:

```ts
getDatabaseItems<PostProps>(process.env.NOTION_DB_POSTS!, { where: ... })
getDatabaseItems<VideoProps>(process.env.NOTION_DB_VIDEOS!, { where: ... })
getDatabaseItems<ProjectProps>(process.env.NOTION_DB_PROJECTS!, { where: ... })
```

O helper de YouTube deve preservar o comportamento do legacy:

```ts
const thumbnailUrl = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
const videoUrl = `https://www.youtube.com/watch?v=${id}`
```

## Conhecimentos consolidados

- Posts já usam o sistema moderno e servem como referência de migração.
- Vídeos e projetos ainda usam services legacy importados diretamente pelas pages.
- `NOTION_DB_VIDEOS` e `NOTION_DB_PROJECTS` já aparecem em `.env.example`, mas os IDs reais precisam ser validados fora do repositório.

## Perguntas em aberto

Perguntas, dúvidas e lacunas vivem em [`questions.md`](./questions.md). Respostas migram para as tasks ou notas de implementação e o item sai do arquivo.

## Referências

- [`docs/product/notion/data-sources.md`](../../product/notion/data-sources.md)
- [`docs/product/notion/framework.md`](../../product/notion/framework.md)
- [`docs/patterns/services.md`](../../patterns/services.md)
- [`docs/patterns/pages.md`](../../patterns/pages.md)

## Log de execução

| Data | O que foi feito |
|------|-----------------|
| 2026-04-19 | Plano revisado para consolidar tarefas pequenas e separar validação, migração e limpeza. |
