---
title: TASK-003 - Criar pagina Cultura
status: draft
priority: P2
type: implementacao
metadata:
  owner: gallery
  created_at: 2026-05-13 00:25
  updated_at: 2026-05-13 00:25
  tags:
    - tasks
    - gallery
    - culture
---

# TASK-003 - Criar pagina Cultura

## Objetivo

Implementar `src/app/galeria/cultura/page.tsx` apresentando referencias culturais (filmes, series, albuns, etc.). Pode ser estatico na v1.

## Escopo

- pagina Server Component;
- listar itens com `Nome`, `Tipo`, `Genero`, `Descricao`, `URL`;
- estado vazio claro;
- metadata basica.

## Nao inclui

- pagina de detalhe;
- filtros por tipo na v1 (postergar);
- thumbnails de servicos externos.

## Entradas e contratos

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Cultura";
- modelo `CultureItem` em [`docs/content-model.md`](../../../../../docs/content-model.md).

## Resultado esperado

- `/galeria/cultura` renderiza listagem inicial.

## Criterios de aceite

- [ ] Server Component;
- [ ] estado vazio se necessario;
- [ ] metadata basica;
- [ ] build passa.

## Validacao minima

- abrir `/galeria/cultura` no dev.

## Dependencias

- PLAN-005 TASK-003;
- PLAN-003.

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md) secao "Cultura".

## Perguntas em aberto

- estatico ou via Notion?
