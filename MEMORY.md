# MEMORY.md

Contexto reaproveitavel de sessao para o projeto vitordevsp.com.br.
Nao duplica CLAUDE.md nem patterns — registra sinais operacionais que ainda nao viraram regra estavel.

---

## Armadilhas conhecidas

**`databaseId` hardcoded em `src/lib/notion/features/databases/index.ts`**
A funcao `getDatabaseItems` le `process.env.NOTION_DATABASE_ID` internamente.
Qualquer nova query que precise de outro banco vai falhar silenciosamente ate o PLAN-001 corrigir isso.
Nao adicionar novas chamadas antes dessa correcao.

**`generateNotionPageID` quebra sem hifen no slug**
Usa `lastIndexOf("-")`, que retorna `-1` se o titulo do post nao tiver hifen.
Resultado: extrai a string inteira em vez do ID. Correcao planejada no PLAN-002.

**`getAllBlockChildren` com `deep: true` faz fetches sequenciais**
Um post com 10 toggles faz 10 requests em serie. Nao adicionar mais chamadas
aninhadas antes de resolver a paralelizacao com `Promise.all` (PLAN-002).

---

## Dois tokens, dois sistemas

| Sistema | Token | Localizacao |
|---------|-------|-------------|
| Moderno | `NOTION_TOKEN` | `src/lib/notion/` |
| Legacy  | `NOTION_KEY`   | `src/app/api/notion/_resources/` |

Nao misturar. O legacy sera removido apos o PLAN-001.

---

## Estado atual dos planos

PLAN-001 e desbloqueante — nenhum outro plano que dependa de Notion moderno deve comecar antes.
Ver painel em `docs/plans/PLAN-000-board/README.md`.
