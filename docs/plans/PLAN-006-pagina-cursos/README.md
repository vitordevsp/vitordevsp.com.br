# PLAN-006 — Página de Cursos

## Status

| Campo        | Valor      |
|--------------|------------|
| Status       | pendente |
| Criado em    | 2025-01-18 |
| Concluído em | — |

---

## Objetivo

Criar a página `/cursos` listando os cursos disponíveis, com suporte a lista de espera por e-mail para cursos ainda não lançados.

---

## Contexto

Alguns cursos estarão disponíveis para acesso direto, outros ainda em desenvolvimento. Para os segundos, o visitante deve poder deixar o e-mail para ser notificado quando o curso abrir — sem precisar de uma plataforma externa de e-mail nesse primeiro momento, apenas coletar e armazenar o interesse.

---

## Arquivos Afetados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/app/(pages)/cursos/page.tsx` | criar | Página principal de cursos |
| `src/app/(pages)/cursos/[slug]/page.tsx` | criar | Página individual do curso (se necessário) |
| `src/components/frames/CardCurso/` | criar | Card de curso com status e CTA |
| `src/components/frames/ListaEspera/` | criar | Formulário de lista de espera por e-mail |
| `src/app/api/lista-espera/route.ts` | criar | Route handler para salvar o e-mail |
| `src/lib/notion/domains/cursos/` | criar | Types e queries para cursos do Notion |
| `src/components/index.ts` | modificar | Exportar novos componentes |

---

## Critério de Conclusão

- [ ] Página `/cursos` listando todos os cursos com dados do Notion
- [ ] Card de curso exibindo: título, descrição, status (disponível / em breve)
- [ ] Para cursos "em breve": formulário de lista de espera com campo de e-mail
- [ ] Route handler salvando os e-mails (definir destino: Notion, arquivo, serviço externo)
- [ ] Feedback visual após submissão do formulário (sucesso / erro)
- [ ] Responsivo nos breakpoints do projeto
- [ ] `pnpm lint` sem erros

---

## Fora do Escopo

- Plataforma de pagamento ou acesso ao conteúdo do curso
- Envio de e-mail de confirmação (apenas coleta por enquanto)
- Área do aluno ou autenticação

---

## Riscos e Dependências

| Tipo | Descrição |
|------|-----------|
| Dependência de plano | PLAN-002 (refactor Notion) deve estar concluído |
| Dependência externa | Definir onde os e-mails serão armazenados (Notion DB, planilha, Resend, etc.) |
| Risco | Formulário de e-mail sem rate limiting pode ser abusado — avaliar proteção mínima |

---

## Notas de Implementação

- Status do curso: propriedade `select` no Notion com valores `disponivel` e `em_breve`
- Lista de espera: a decisão de onde salvar os e-mails precisa ser tomada antes de implementar o route handler — registrar em `docs/decisions.md`
- Considerar Notion como destino inicial (banco simples com e-mail + curso + data) para não depender de serviço externo

---

## Log de Execução

| Data | O que foi feito |
|------|-----------------|
| — | — |
