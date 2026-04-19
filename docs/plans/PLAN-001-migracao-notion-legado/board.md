# Board — PLAN-001 Migracao Notion Legado

| ID | Descricao | Status | Depende de |
|----|-----------|--------|------------|
| P001-T001 | Validar credenciais, bancos e consumidores externos do legacy | todo | — |
| P001-T002 | Corrigir `getDatabaseItems` para receber `databaseId` explicito | todo | P001-T001 |
| P001-T003 | Migrar videos para a lib moderna preservando URLs do YouTube | todo | P001-T002 |
| P001-T004 | Migrar projetos e destaques da home para a lib moderna | todo | P001-T002 |
| P001-T005 | Remover `_resources/`, `NOTION_KEY` e documentacao legacy obsoleta | todo | P001-T003, P001-T004 |
| P001-T006 | Validar build e rotas afetadas apos a migracao | todo | P001-T005 |
