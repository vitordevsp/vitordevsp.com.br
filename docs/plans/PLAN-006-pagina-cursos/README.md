# PLAN-006 — Página de Cursos

## Status

| Campo | Valor |
|------|------|
| Status | pendente |
| Criado em | 2026-04-19 |
| Atualizado em | 2026-04-19 |
| Concluído em | — |

## Objetivo

Criar `/cursos` para listar cursos disponíveis e permitir lista de espera para cursos ainda não lançados, depois de decidir de forma explícita onde os emails serão armazenados.

## Contexto

As notas originais pedem uma página de cursos com lista de espera por email. A parte visual é simples, mas o armazenamento de emails cria responsabilidade nova: validação, abuso, privacidade e destino dos dados.

Por isso, o plano começa com a decisão de modelo de dados e armazenamento antes de implementar o route handler.

## Escopo

- definir schema de cursos e lista de espera;
- criar domínio Notion de cursos quando a base de domínios estiver pronta;
- criar `/cursos` com cards de cursos disponíveis e em breve;
- criar UI de lista de espera com estados de sucesso/erro;
- implementar route handler somente depois de escolhido o destino dos emails;
- validar responsividade, acessibilidade básica do formulário e build.

## Fora do escopo

- plataforma de pagamento;
- área do aluno;
- autenticação;
- envio de email de confirmação;
- automação de marketing ou newsletter.

## Áreas afetadas

| Área | Ação | Observação |
|------|------|------------|
| `src/app/(pages)/cursos/page.tsx` | criar | página principal |
| `src/app/(pages)/cursos/[slug]/page.tsx` | opcional | só criar se houver detalhe real de curso |
| `src/components/frames/CardCurso/` | criar | card com status e CTA |
| `src/components/frames/ListaEspera/` | criar | formulário de email |
| `src/app/api/lista-espera/route.ts` | criar | apenas depois da decisão de armazenamento |
| `src/lib/notion/domains/cursos/` | criar | types e queries de cursos |
| `docs/product/notion/data-sources.md` | atualizar | registrar schema de cursos/lista |

## Backlog

- [ ] Definir schema de cursos, status e armazenamento da lista de espera.
- [ ] Criar domínio de cursos e página `/cursos` com cards.
- [ ] Criar formulário de lista de espera com estados de envio.
- [ ] Implementar route handler com validação e proteção mínima contra abuso.
- [ ] Validar responsividade, acessibilidade do formulário e build.

## Riscos e dependências

| Tipo | Descrição |
|------|-----------|
| Dependência de plano | PLAN-002 deve orientar a organização do domínio `cursos`. |
| Decisão pendente | Destino dos emails: Notion DB, planilha, serviço externo ou outro armazenamento. |
| Risco | Coletar email sem política mínima de armazenamento/erro cria dívida de produto e privacidade. |
| Risco | Rate limiting em ambiente serverless precisa ser definido com ferramenta compatível com deploy. |

## Notas de implementação

- Status mínimo do curso: `disponivel` e `em_breve`.
- O formulário não deve existir como backend fake. Se não houver destino decidido, a UI pode ficar preparada mas sem submissão real.
- Se Notion for o destino inicial, documentar o banco de lista de espera em `docs/product/notion/data-sources.md`.
- Validar email no server, não apenas no client.

## Conhecimentos consolidados

- Página de cursos é uma frente de produto; lista de espera adiciona backend e decisão de dados.
- O route handler não deve nascer antes da decisão de armazenamento.
- Responsividade e lint/build são critérios de fechamento, não tasks pequenas independentes.

## Perguntas em aberto

Perguntas, dúvidas e lacunas vivem em [`questions.md`](./questions.md). Respostas migram para as tasks ou notas de implementação e o item sai do arquivo.

## Referências

- [`docs/patterns/pages.md`](../../patterns/pages.md)
- [`docs/patterns/services.md`](../../patterns/services.md)

## Log de execução

| Data | O que foi feito |
|------|-----------------|
| 2026-04-19 | Plano revisado para separar página visual, domínio de dados e decisão de armazenamento da lista de espera. |
