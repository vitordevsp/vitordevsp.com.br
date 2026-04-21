# PLAN-006 — Perguntas em aberto

Arquivo dedicado para registrar perguntas, dúvidas e lacunas deste plano. Quando uma pergunta for respondida, o conhecimento vai para a task ou nota de implementação correspondente e o item sai daqui.

## 1. Destino dos emails da lista de espera

Qual será o armazenamento inicial dos emails da lista de espera: Notion DB novo, planilha (Google Sheets), serviço externo (Resend, Buttondown, Mailchimp) ou outro?

**Estado atual:** a base `📚 Cursos` no Notion (schema em `docs/product/notes-context-notion.md` §10) **não tem** propriedade de email nem base relacionada de inscritos. Ou seja, Notion hoje não tem destino pronto; qualquer caminho exige criar base/serviço novo antes.

**Por que importa:** bloqueia o route handler `src/app/api/lista-espera/route.ts`. Antes dessa decisão o formulário deve ficar visual, sem submissão real. A escolha também define rate limiting, política de privacidade e onde documentar o schema.

**Resposta:**


## 2. Página individual de curso no MVP

Haverá rota `/cursos/[slug]` no MVP ou só a listagem com cards?

**Trade-off:** só listagem é mais rápido e suficiente enquanto não houver conteúdo rico por curso; página individual exige decidir seções (ementa, cronograma, CTA), aumentando escopo.

**Resposta:**


## 3. Destino do CTA de curso disponível

O CTA de um curso disponível aponta para onde: link externo (plataforma de venda), página interna (`/cursos/[slug]`) ou contato direto?

**Por que importa:** define o tipo do campo no Notion (URL externa vs slug interno), o comportamento do card e se o MVP depende da pergunta 2.

**Resposta:**
