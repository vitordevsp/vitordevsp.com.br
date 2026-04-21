# Board — PLAN-002 Refactor Notion

| ID | Descricao | Status | Depende de |
|----|-----------|--------|------------|
| P002-T001 | Melhorar concorrencia e tipagem de `getAllBlockChildren` | todo | — |
| P002-T002 | Corrigir `generateNotionPageID` para slugs com ou sem hifen | todo | — |
| P002-T003 | Revisar casts dos wrappers de database e page | todo | P001-T002 |
| P002-T006 | Fixar `Notion-Version` explicita no client | todo | — |
| P002-T007 | Migrar wrapper de database para `data_sources.query` | todo | P002-T006 |
| P002-T004 | Criar dominios de posts, videos e projetos na lib Notion | todo | PLAN-001 concluido, P002-T007 |
| P002-T005 | Validar rotas que usam Notion apos o refactor | todo | P002-T001, P002-T002, P002-T003, P002-T004, P002-T006, P002-T007 |
