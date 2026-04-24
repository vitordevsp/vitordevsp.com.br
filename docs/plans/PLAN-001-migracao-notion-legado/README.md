---
id: PLAN-001
linear_id: DEVSP-13
title: Migrar Implementação Legada do Notion
status: todo
created_at: 2026-04-19
updated_at: 2026-04-24
sync_at: "2026-04-24 04:10:00 -0300"
---

# PLAN-001 — Migrar Implementação Legada do Notion

## Contexto

O projeto mantém duas integrações com o Notion:

- a integração moderna em `src/lib/notion/`, usada por posts e baseada em `NOTION_TOKEN`;
- a integração legacy em `src/app/api/notion/_resources/`, usada por vídeos e projetos e baseada em `NOTION_KEY`.

Essa duplicidade cria risco de divergência de schema, comportamento e credencial. Vídeos, projetos e destaques da home precisam sair do legacy antes que novas frentes baseadas em Notion, como jardim digital e cursos, cresçam sobre uma base instável.

## Objetivo

Migrar vídeos, projetos e destaques da home para a lib moderna do Notion, corrigindo a API de leitura para receber `databaseId` explícito e removendo o sistema legacy somente depois de validar credenciais, bancos e consumidores externos.

## Direcionamento

- Posts já usam a integração moderna e servem como referência para a migração.
- `getDatabaseItems` deve receber o `databaseId` como argumento, sem depender de `process.env.NOTION_DATABASE_ID` internamente.
- A migração deve preservar o contrato visual das páginas, especialmente URLs e thumbnails do YouTube.
- `_resources/`, rotas `/api/notion/*` e `NOTION_KEY` só podem ser removidos quando não houver consumidor externo dependente.
- Não expor valores reais de `.env` em documentação.

Uso esperado da lib moderna:

```ts
getDatabaseItems<PostProps>(process.env.NOTION_DB_POSTS!, { where: ... })
getDatabaseItems<VideoProps>(process.env.NOTION_DB_VIDEOS!, { where: ... })
getDatabaseItems<ProjectProps>(process.env.NOTION_DB_PROJECTS!, { where: ... })
```

## Escopo

### Inclui

- Validar paridade de acesso entre `NOTION_KEY` e `NOTION_TOKEN`.
- Validar `NOTION_DB_VIDEOS` e `NOTION_DB_PROJECTS`.
- Confirmar se existem consumidores externos das rotas `/api/notion/*`.
- Corrigir `src/lib/notion/features/databases/index.ts` para receber `databaseId` explícito.
- Migrar vídeos, projetos e destaques da home para a lib moderna.
- Remover o legacy e limpar documentação/variáveis obsoletas quando for seguro.

### Não inclui

- Reorganização por domínio em `src/lib/notion/domains/`, coberta pelo PLAN-002.
- Mudanças visuais nas páginas de vídeos, projetos ou home.
- Criação de novos bancos de dados do Notion.
- Leitura ou exposição do `.env` real nos docs.

## Tarefas relacionadas

- `P001-T001` — Validar credenciais, bancos e consumidores externos do legacy
- `P001-T002` — Corrigir getDatabaseItems para receber databaseId explicito
- `P001-T003` — Migrar videos para a lib moderna preservando URLs do YouTube
- `P001-T004` — Migrar projetos e destaques da home para a lib moderna
- `P001-T005` — Remover _resources, NOTION_KEY e documentacao legacy obsoleta
- `P001-T006` — Validar build e rotas afetadas apos a migracao

## Critérios de aceite da história

- [ ] Vídeos e projetos não dependem mais de `src/app/api/notion/_resources/`.
- [ ] Home, posts, vídeos e projetos usam `getDatabaseItems` com IDs explícitos.
- [ ] URLs e thumbnails do YouTube preservam o comportamento do legacy.
- [ ] Rotas e arquivos legacy só são removidos depois de validar consumidores externos.
- [ ] `.env.example` e docs de Notion refletem a integração moderna.
- [ ] Build e rotas públicas afetadas foram validados.
