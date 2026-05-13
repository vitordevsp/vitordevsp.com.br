---
title: TASK-001 - Criar pagina Videos
status: draft
priority: P1
type: implementacao
metadata:
  owner: gallery
  created_at: 2026-05-13 00:25
  updated_at: 2026-05-13 00:25
  tags:
    - tasks
    - gallery
    - videos
---

# TASK-001 - Criar pagina Videos

## Objetivo

Implementar `src/app/galeria/videos/page.tsx` como Server Component apresentando estrutura inicial. Dados podem ser estaticos ou via Notion (decidir).

## Contexto local

Base Notion `Videos | Produzindo` existe com pipeline editorial; `videoUrl` ainda nao e propriedade conhecida. Para v1, listar nome + status + descricao basta.

## Escopo

- pagina Server Component;
- usar `Container`, `PageHeading`, `Card`;
- listar videos (estatico ou via Notion);
- estado vazio claro;
- metadata basica.

## Nao inclui

- player embedado;
- categoria por playlist como filtro;
- pagina de detalhe.

## Entradas e contratos

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Videos";
- modelo `Video` em [`docs/content-model.md`](../../../../../docs/content-model.md).

## Resultado esperado

- `/galeria/videos` renderiza listagem inicial.

## Criterios de aceite

- [ ] Server Component;
- [ ] estado vazio se necessario;
- [ ] metadata basica;
- [ ] build passa.

## Validacao minima

- abrir `/galeria/videos` no dev.

## Dependencias

- PLAN-005 TASK-003 (hub linka aqui);
- PLAN-003 (componentes).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Videos | Produzindo".

## Perguntas em aberto

- estatico ou via Notion?
