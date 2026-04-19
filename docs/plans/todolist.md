# TO DO

Bloco de notas rapidas e simples para itens que ainda nao merecem plano proprio:

- [ ] Confirmar IDs das variaveis de ambiente `NOTION_DB_VIDEOS` e `NOTION_DB_PROJECTS` (hoje o legacy usa `NOTION_DATABASE_ID` — sao os mesmos ou IDs diferentes?)
- [ ] Verificar se o `.env` ja tem `NOTION_DB_VIDEOS` e `NOTION_DB_PROJECTS` configurados
- [ ] Confirmar se `NOTION_KEY` e `NOTION_TOKEN` apontam para o mesmo integration secret ou sao diferentes
- [ ] Antes de rodar PLAN-001: verificar se algum cliente externo consome as rotas `/api/notion/*`
- [ ] PLAN-006 depende de decidir onde armazenar e-mails da lista de espera (Notion DB, Resend, planilha) — registrar decisao em `docs/` antes de implementar
