---
title: PLAN-008 - Galeria v1
status: draft
tags:
  - plans
  - gallery
  - static
metadata:
  owner: gallery
  created_at: 2026-05-13 00:25
  updated_at: 2026-05-13 00:25
---

# PLAN-008 - Galeria v1

## Objetivo

Criar a primeira versao navegavel da Galeria com quatro subrotas (`videos`, `livros`, `cultura`, `viagens`). Foco em estrutura, navegacao e estado vazio claro; dados podem ser estaticos ou parciais do Notion, decididos por subrota.

## Contexto

Galeria e definida em [`docs/product.md`](../../../docs/product.md) como hub de conteudos nao textuais e referencias. Bases Notion para Videos, Livros, Cultura e Viagens existem mas com schemas incompletos (ver [`docs/notion.md`](../../../docs/notion.md) e pendencias). v1 entrega estrutura; dados ricos vem em PLAN-016.

Prioridade dentro da v1: Videos > Livros > Cultura > Viagens.

## Escopo

- `src/app/galeria/videos/page.tsx`;
- `src/app/galeria/livros/page.tsx`;
- `src/app/galeria/cultura/page.tsx`;
- `src/app/galeria/viagens/page.tsx`;
- cada subrota: pagina basica + estado vazio + metadata;
- dados podem ser:
  - estaticos em `src/content/gallery/*.ts`;
  - parciais via Notion se mapper minimo for criado por subrota (decidir);
- preparacao para PLAN-016 (galeria completa pos-v1).

## Fora do escopo

- mappers completos para `Video`, `Book`, `CultureItem`, `Place` (cobre PLAN-016);
- listagens dinamicas com filtros;
- subareas de subarea (e.g. playlists, paginas individuais);
- embed avancado de video.

## Areas afetadas

- `src/app/galeria/videos/`
- `src/app/galeria/livros/`
- `src/app/galeria/cultura/`
- `src/app/galeria/viagens/`
- eventualmente `src/content/gallery/` para dados estaticos.

## Tasks

- [`TASK-001 - Criar pagina Videos`](./tasks/TASK-001-pagina-videos/README.md)
- [`TASK-002 - Criar pagina Livros`](./tasks/TASK-002-pagina-livros/README.md)
- [`TASK-003 - Criar pagina Cultura`](./tasks/TASK-003-pagina-cultura/README.md)
- [`TASK-004 - Criar pagina Viagens`](./tasks/TASK-004-pagina-viagens/README.md)

## Riscos e dependencias

- depende de PLAN-003 (componentes compartilhados) e PLAN-005 (hub Galeria);
- risco: criar mappers minimos por subrota pode inflar o plano. Mitigar com escolha estatica por default;
- risco: subareas ficarem "vazias-vivas" e parecerem quebradas. Mitigar com texto explicativo e estado vazio cuidadoso.

## Validacao

- quatro rotas respondem 200;
- estado vazio claro em cada rota;
- nenhum `"use client"` adicionado;
- build/lint/tsc passam.

## Criterio de encerramento

- nao textuais tem area propria;
- subareas evoluem independentemente em PLAN-016.

## Referencias

- [`docs/product.md`](../../../docs/product.md)
- [`docs/notion.md`](../../../docs/notion.md)

## Perguntas em aberto

- usar dados estaticos em todas as quatro subrotas ou criar mapper minimo onde a base ja tem dados (Videos, Livros)?
- definir conjunto minimo de itens por subrota para nao parecer abandonada;
- abrir page de detalhe (`[slug]`) em alguma subrota na v1 ou postergar?
