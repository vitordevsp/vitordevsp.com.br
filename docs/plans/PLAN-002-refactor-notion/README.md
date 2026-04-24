---
id: PLAN-002
linear_id: DEVSP-14
title: Refactor da Implementação Moderna do Notion
status: todo
created_at: 2026-04-19
updated_at: 2026-04-24
sync_at: "2026-04-24 04:10:00 -0300"
---

# PLAN-002 — Refactor da Implementação Moderna do Notion

## Contexto

O PLAN-001 reduz a dependência do sistema legacy. Depois disso, `src/lib/notion/` precisa sustentar posts, vídeos, projetos e novas frentes como jardim digital e cursos sem acumular lógica solta nas pages.

A lib moderna também tem pontos frágeis independentes: busca recursiva de blocos com risco de rate limit, `generateNotionPageID` dependente de hífen, casts do SDK e ausência de `Notion-Version` explícita.

## Objetivo

Fortalecer a integração moderna com o Notion para virar a base única do projeto, com contratos mais explícitos, melhor performance em blocos aninhados, versão de API fixada e organização por domínios após a migração do legacy.

## Direcionamento

- Melhorias independentes podem acontecer antes do fim do PLAN-001.
- Criação de domínios de posts, vídeos e projetos depende do PLAN-001 concluído.
- O refactor deve reduzir fragilidade sem esconder a complexidade real dos tipos do SDK.
- A busca profunda de blocos deve respeitar o rate limit oficial do Notion: média de 3 req/s e `Retry-After` em 429.
- A lib deve parar de depender do default de versão do SDK.

## Escopo

### Inclui

- Melhorar concorrência e tipagem de `getAllBlockChildren`.
- Corrigir `generateNotionPageID` para slugs com ou sem hífen.
- Revisar casts nos wrappers de database e page.
- Fixar `Notion-Version` no client.
- Migrar o wrapper de database para `data_sources.query`.
- Criar domínios de posts, vídeos e projetos após PLAN-001.
- Validar rotas que usam Notion.

### Não inclui

- Criar domínios de jardim ou cursos.
- Mudar visual ou comportamento das páginas.
- Reescrever o renderer de blocos inteiro.
- Perseguir todo `any` interno da DSL de filtros se isso exigir refactor maior que o plano.

## Tarefas relacionadas

- `P002-T001` — Melhorar concorrencia e tipagem de getAllBlockChildren
- `P002-T002` — Corrigir generateNotionPageID para slugs com ou sem hifen
- `P002-T003` — Revisar casts dos wrappers de database e page
- `P002-T006` — Fixar Notion-Version explicita no client
- `P002-T007` — Migrar wrapper de database para data_sources.query
- `P002-T004` — Criar dominios de posts, videos e projetos na lib Notion
- `P002-T005` — Validar rotas que usam Notion apos o refactor

## Critérios de aceite da história

- [ ] `getAllBlockChildren` mantém assinatura pública e melhora busca profunda sem `Promise.all` cego.
- [ ] `__children` tem tipo explícito usado pelo renderer.
- [ ] `generateNotionPageID` aceita slug com hífen, slug sem hífen e ID puro.
- [ ] Client Notion fixa `Notion-Version`.
- [ ] Wrapper de database usa o endpoint canônico compatível com data sources.
- [ ] Domínios de posts, vídeos e projetos existem depois da migração do legacy.
- [ ] Rotas dependentes de Notion continuam carregando.

## Questions

- [ ] `PageRenderer` deve ser isolado atrás de uma interface estável agora para facilitar troca futura por `retrieve-page-markdown`?
- [ ] A cobertura de block types deve ser ampliada preventivamente para `table`, `equation`, `column_list`, `video`, `bookmark` e `embed`, ou esperar necessidade concreta?
