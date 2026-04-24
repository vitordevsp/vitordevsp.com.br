---
id: PLAN-006
linear_id: DEVSP-18
title: Página de Cursos
status: todo
created_at: 2026-04-19
updated_at: 2026-04-24
sync_at: "2026-04-24 04:10:00 -0300"
---

# PLAN-006 — Página de Cursos

## Contexto

As notas originais pedem uma página de cursos com lista de espera por email. A parte visual é simples, mas capturar emails cria responsabilidade nova: validação, abuso, privacidade e destino dos dados.

## Objetivo

Criar `/cursos` para listar cursos disponíveis e permitir lista de espera para cursos ainda não lançados, depois de decidir explicitamente onde os emails serão armazenados.

## Direcionamento

- O route handler não deve nascer antes da decisão de armazenamento.
- Se não houver backend definido, o formulário pode ficar visual/preparado sem submissão real.
- Cursos dependem da organização por domínios do PLAN-002.
- Qualquer destino de email deve ser documentado em produto/Notion quando aplicável.

## Escopo

### Inclui

- Definir schema de cursos, status e lista de espera.
- Criar domínio Notion de cursos quando a base estiver pronta.
- Criar `/cursos` com cards de cursos disponíveis e em breve.
- Criar UI de lista de espera com estados.
- Implementar route handler apenas depois da decisão de armazenamento.
- Validar responsividade, acessibilidade do formulário e build.

### Não inclui

- Plataforma de pagamento.
- Área do aluno.
- Autenticação.
- Email de confirmação.
- Automação de marketing ou newsletter.

## Tarefas relacionadas

- `P006-T001` — Definir schema de cursos, status e armazenamento da lista de espera
- `P006-T002` — Criar dominio de cursos e pagina /cursos com cards
- `P006-T003` — Criar formulario de lista de espera com estados de envio
- `P006-T004` — Implementar route handler com validacao e protecao minima
- `P006-T005` — Validar responsividade, acessibilidade do formulario e build

## Critérios de aceite da história

- [ ] Schema e destino da lista de espera estão decididos ou bloqueio está explícito.
- [ ] `/cursos` lista cursos com CTA coerente com status.
- [ ] Formulário não simula persistência inexistente.
- [ ] Route handler valida email e aplica proteção mínima quando houver destino.
- [ ] Responsividade, acessibilidade e build foram validados.
