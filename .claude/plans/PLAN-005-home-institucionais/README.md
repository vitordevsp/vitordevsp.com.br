---
title: PLAN-005 - Home e paginas institucionais
status: draft
tags:
  - plans
  - pages
  - institutional
metadata:
  owner: site-shell
  created_at: 2026-05-13 00:10
  updated_at: 2026-05-13 00:10
---

# PLAN-005 - Home e paginas institucionais

## Objetivo

Entregar as paginas institucionais e de porta de entrada da v1: `/` (Home), `/sobre`, `/galeria` (hub) e `/cursos` (pagina simples). Sem dependencia editorial pesada; usam `siteConfig` e componentes compartilhados.

## Contexto

Estas paginas formam a casca publica do site enquanto Jardim, Projetos e Galeria detalhada nao estao prontos. Home destaca quem e o autor e linka areas principais. Sobre apresenta trajetoria. Galeria hub explica subareas. Cursos comunica que area esta em evolucao - na v1 com estrutura ja existente no Notion (decisao do usuario), mas pode comecar como `/cursos` listando dados (ver perguntas em aberto).

## Escopo

- `/` Home (Server Component) usando componentes compartilhados;
- `/sobre` Sobre (Server Component) com texto institucional + dados de `siteConfig`;
- `/galeria` hub estatico linkando subareas (Vídeos, Livros, Cultura, Viagens);
- `/cursos` lista simples; pode ler do Notion (Course mapper opcional) ou estatica - decidir;
- metadata basica por pagina (refino fino em PLAN-009);
- estados vazios simples.

## Fora do escopo

- detalhes do Jardim (PLAN-006);
- detalhes de Projetos (PLAN-007);
- subrotas da Galeria (PLAN-008);
- `/cursos/[slug]` (postergado para pos-v1 PLAN-017);
- formulario de contato/waitlist;
- newsletter.

## Areas afetadas

- `src/app/page.tsx` (Home; pode substituir route group `(home)` ou conviver - decidir)
- `src/app/sobre/page.tsx`
- `src/app/galeria/page.tsx`
- `src/app/cursos/page.tsx`

## Tasks

- [`TASK-001 - Criar Home`](./tasks/TASK-001-criar-home/README.md)
- [`TASK-002 - Criar pagina Sobre`](./tasks/TASK-002-criar-sobre/README.md)
- [`TASK-003 - Criar hub Galeria`](./tasks/TASK-003-criar-galeria-hub/README.md)
- [`TASK-004 - Criar pagina Cursos`](./tasks/TASK-004-criar-cursos/README.md)

## Riscos e dependencias

- depende de PLAN-003 (componentes compartilhados, layout);
- parcial de PLAN-004 caso `/cursos` consuma Notion via mapper de `Course` (decidir; mapper opcional pode ser criado aqui);
- risco: Home generica demais. Mitigar destacando Jardim e Projetos no conteudo;
- risco: `/cursos` ler do Notion exige mapper de `Course` que nao esta em PLAN-004. Alternativa: comecar estatica com placeholder ou criar mapper minimo aqui.

## Validacao

- todas as quatro rotas respondem 200;
- conteudo coerente com [`docs/product.md`](../../../docs/product.md) (Norte, posicionamento, sitemap);
- nenhum `"use client"` adicionado sem justificativa;
- metadata basica presente em cada rota.

## Criterio de encerramento

- visitantes entendem quem e o autor, onde navegar e o que esperar de cada area;
- paginas usam componentes de PLAN-003;
- sem regressao em build/lint/tsc.

## Referencias

- [`docs/product.md`](../../../docs/product.md)
- [`docs/architecture.md`](../../../docs/architecture.md)

## Perguntas em aberto

- Home substitui o route group `(home)` existente ou convive?
- `/cursos` na v1 consome Notion (precisa mapper minimo) ou usa lista estatica em `src/content/`?
- texto institucional do Sobre vem do Notion ou do `src/content/`? Sugestao: `src/content/` para v1, com migracao posterior se virar conteudo vivo.
