---
id: PLAN-003
linear_id: DEVSP-15
title: Ajustes de Layout e Estrutura
status: todo
created_at: 2026-04-19
updated_at: 2026-04-24
sync_at: "2026-04-24 04:10:00 -0300"
---

# PLAN-003 — Ajustes de Layout e Estrutura

## Contexto

O site precisa se aproximar de uma experiência de jardim digital sem copiar uma página específica. A referência da Maggie Appleton é direção de curadoria e exploração, mas a implementação deve respeitar o projeto atual: Next.js App Router, SCSS puro, componentes em `src/components/frames/` e conteúdo vindo do Notion.

## Objetivo

Reformular a estrutura visual base do site com navegação mais presente, home com curadoria visual, footer mais útil, posts em visualização mais ampla e página Sobre mais editorial.

## Direcionamento

- A home deve mostrar conteúdo e caminhos reais do site, não virar landing page genérica.
- Mudanças visuais não devem alterar contratos do Notion.
- Componentes client-side devem ficar isolados quando necessários, especialmente no header.
- A assimetria visual deve expressar hierarquia editorial, não só geometria.
- O campo de newsletter é visual nesta história; captura real pertence a outra frente.

## Escopo

### Inclui

- Ajustar `PageHeader` fixo com hide/show ao rolar.
- Reestruturar hero e seções assimétricas da home.
- Atualizar footer com mapa do site e campo visual de newsletter.
- Melhorar listagem de posts e página Sobre sem mudar dados.
- Validar responsividade, acessibilidade visual e build.

### Não inclui

- Backend de newsletter.
- Novas rotas como `/jardim`, `/galeria` ou `/cursos`.
- Alterações de schema do Notion.
- Redesign completo de todos os componentes do site.

## Tarefas relacionadas

- `P003-T001` — Ajustar PageHeader fixo com hide/show ao rolar
- `P003-T002` — Reestruturar hero e secoes assimetricas da home
- `P003-T003` — Atualizar footer com mapa do site e campo visual de newsletter
- `P003-T004` — Melhorar listagem de posts e pagina Sobre
- `P003-T005` — Validar responsividade, acessibilidade visual e build

## Critérios de aceite da história

- [ ] Header funciona em desktop/mobile sem prejudicar foco e navegação por teclado.
- [ ] Home tem hero e seções com hierarquia editorial clara.
- [ ] Footer apresenta mapa do site e newsletter visual sem backend falso.
- [ ] `/posts` e `/sobre` seguem a nova direção visual sem mudar queries.
- [ ] Layouts passam por validação responsiva e build.
