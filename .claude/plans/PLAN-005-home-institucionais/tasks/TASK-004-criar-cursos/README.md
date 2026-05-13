---
title: TASK-004 - Criar pagina Cursos
status: draft
priority: P0
type: implementacao
metadata:
  owner: site-shell
  created_at: 2026-05-13 00:10
  updated_at: 2026-05-13 00:10
  tags:
    - tasks
    - pages
    - courses
---

# TASK-004 - Criar pagina Cursos

## Objetivo

Implementar `src/app/cursos/page.tsx` como Server Component listando cursos/produtos em forma inicial. Conforme decisao do usuario, base do Notion ja existe e pode ser usada na v1 (mesmo com fake para teste).

## Contexto local

Database Cursos documentada em [`docs/notion.md`](../../../../../docs/notion.md). Modelos em [`docs/content-model.md`](../../../../../docs/content-model.md). PLAN-004 nao cobriu mapper de `Course`; esta task pode optar entre criar mapper minimo aqui ou usar dados estaticos. `/cursos/[slug]` postergado para pos-v1 (PLAN-017).

## Escopo

- criar `src/app/cursos/page.tsx`;
- alternativa A (sugerida): mapper minimo de `Course` em `src/integrations/notion/mappers/course.mapper.ts` + query de feature `src/features/courses/api/get-courses.ts`; listagem usa cards;
- alternativa B: dados estaticos em `src/content/courses.ts` ate database amadurecer;
- listar nome, descricao, status, tags;
- estado vazio "em construcao";
- metadata basica.

## Nao inclui

- `/cursos/[slug]` (PLAN-017);
- formulario de waitlist (PLAN-019);
- pagamento, autenticacao, area logada;
- player ou plataforma de cursos.

## Entradas e contratos

- [`docs/content-model.md`](../../../../../docs/content-model.md) secao "Course";
- [`docs/notion.md`](../../../../../docs/notion.md) secao "Cursos".

## Resultado esperado

- `/cursos` renderiza listagem inicial com pelo menos um item (fake aceitavel para teste);
- nao bloqueia v1 se Notion estiver vazio.

## Criterios de aceite

- [ ] Server Component;
- [ ] listagem renderizada;
- [ ] estado vazio aceitavel;
- [ ] metadata basica;
- [ ] build passa.

## Validacao minima

- abrir `/cursos`;
- caso use Notion, validar com env definido.

## Dependencias

- PLAN-003 (componentes);
- PLAN-004 (cliente/queries) se opcao A;
- PLAN-002 TASK-005 (`site.ts`).

## Referencias

- [`docs/notion.md`](../../../../../docs/notion.md)
- [`docs/content-model.md`](../../../../../docs/content-model.md)

## Perguntas em aberto

- escolher alternativa A (Notion via mapper minimo) ou B (estatico)?
- nivel de detalhe da listagem - card simples ou card rico com badge de status?
