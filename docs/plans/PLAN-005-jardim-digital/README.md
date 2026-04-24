---
id: PLAN-005
linear_id: DEVSP-17
title: Jardim Digital
status: todo
created_at: 2026-04-19
updated_at: 2026-04-24
sync_at: "2026-04-24 04:10:00 -0300"
---

# PLAN-005 — Jardim Digital

## Contexto

O site está sendo transformado em um jardim digital alimentado pelo Notion. A intenção é publicar ideias de forma progressiva, com sinalização clara de maturidade: Semente, Broto, Muda, Planta e Árvore.

O mapa inicial das bases do Notion está em `docs/product/jardim-digital-notion-resume.md` e lista página raiz, livros, cultura, viagens/lugares, textos, vídeos, cursos e projetos. A primeira versão deve separar contrato de conteúdo e UI, sem prometer uma plataforma editorial completa.

## Objetivo

Criar a base de `/jardim`: domínio de dados, navegação inicial, estágios de nota, filtros simples e suporte cuidadoso a subpáginas quando o schema permitir.

## Direcionamento

- Jardim digital é frente de produto e conteúdo, não só uma rota nova.
- O schema deve ser derivado das bases reais antes de especializar subpáginas.
- `Publicado Em is_not_empty` é a hipótese de publicação pública para bases que têm esse campo; `Status` representa maturidade.
- `Padrões`, `Trilha`, `Ensaios` e `Changelog` dependem de decisões editoriais/schema.
- A leitura individual continua no PLAN-004; esta história organiza listagens e navegação do jardim.

## Escopo

### Inclui

- Definir schema mínimo do jardim.
- Criar `src/lib/notion/domains/jardim/` depois do PLAN-002.
- Criar `/jardim` e subpáginas iniciais.
- Implementar estágios de nota e card explicativo.
- Implementar filtros por ano e ordem via `searchParams`.
- Validar rotas, responsividade e build.

### Não inclui

- Busca full-text.
- Tags cruzadas avançadas.
- Edição de notas pelo site.
- Página individual de leitura, coberta pelo PLAN-004.
- Galeria completa de livros, viagens, músicas e fotos.
- Feed para IA, `/llms.txt` ou markdown bruto sem nova decisão.

## Tarefas relacionadas

- `P005-T001` — Definir schema minimo do jardim e dominio Notion
- `P005-T002` — Criar shell de /jardim e navegacao entre subpaginas iniciais
- `P005-T003` — Implementar estagios de nota e texto explicativo do jardim
- `P005-T004` — Implementar filtros por ano e ordem nas listagens
- `P005-T005` — Implementar tratamentos de Padroes e Trilha quando houver dados
- `P005-T006` — Validar rotas, responsividade e build

## Critérios de aceite da história

- [ ] Schema mínimo do jardim está documentado a partir das bases reais.
- [ ] `/jardim` existe e responde bem com poucos dados.
- [ ] Estágios de maturidade aparecem de forma clara.
- [ ] Filtros simples usam URL compartilhável.
- [ ] Subpáginas dependentes de schema ficam implementadas ou explicitamente adiadas.
- [ ] Rotas e build foram validados.

## Questions

- [ ] O jardim será consumido por IA no MVP com feed/sitemap estruturado, `/llms.txt`, endpoints markdown ou HTML mais semântico, ou isso vira história futura?
