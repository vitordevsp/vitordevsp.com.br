# MEMORY — Notion do projeto

## Objetivo

Registrar memoria especifica da camada `docs/product/notion/`, preservando convencoes, aprendizados e decisoes sobre a integracao Notion deste projeto.

## Relação com o restante da documentacao

- `docs/product/notion/README.md` explica a pasta.
- `framework.md` explica o papel do Notion como CMS e o fluxo de dados.
- `data-sources.md` explica os data sources (Posts, Videos, Projetos).
- este `MEMORY.md` guarda convencoes e aprendizados acumulados sobre esta integracao.

## Convencoes reforçadas

- O Notion e exclusivamente CMS de conteudo neste projeto — nao ferramenta de gestao de trabalho.
- O sistema moderno (`src/lib/notion/`) e a unica abordagem para funcionalidades novas.
- O sistema legacy (`src/app/api/notion/_resources/`) existe apenas para Videos e Projetos, em processo de migracao.
- Os dois sistemas usam tokens diferentes: `NOTION_TOKEN` (moderno) e `NOTION_KEY` (legacy).
- Novos bancos de dados devem ter seu schema documentado em `data-sources.md` e seu tipo em `src/types/notion.type.ts`.

## Conhecimentos consolidados

- O banco de Posts e o unico totalmente migrado para o sistema moderno.
- Videos e Projetos ainda dependem do sistema legacy por conta do `databaseId` hardcoded em `features/databases/index.ts`.
- A migracao para o sistema moderno para Videos e Projetos esta planejada em `docs/plans/PLAN-001-migracao-notion-legacy/`.
- O slug de posts no formato `titulo-do-post-{notionId}` usa `lastIndexOf("-")` para extrair o ID — fragil, mas funcional enquanto todos os posts tiverem hifen no titulo.
- `getAllBlockChildren` com `deep: true` faz fetches sequenciais — paralelizar com `Promise.all` e uma das melhorias planejadas.
