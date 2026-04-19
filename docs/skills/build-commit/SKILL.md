---
name: build-commit
description: Organizar, sugerir e executar commits no padrao do projeto a partir do estado atual do git, do historico recente e do agrupamento logico das mudancas. Use quando a tarefa for preparar commits claros, pequenos o suficiente e com mensagem rica e objetiva.
last_updated: 2026-04-18 05:31
---

# Build Commit

Use esta skill quando a tarefa for analisar mudancas locais, rodar uma passada de fechamento pre-commit, propor agrupamentos de commit e, quando fizer sentido, executar os commits no padrao do repositorio.

Ela existe para evitar commits grandes demais, mensagens vagas e agrupamentos arbitrarios que dificultem leitura de historico, revisao e reaproveitamento do contexto.

## Quando usar

Use esta skill quando:

- houver varios arquivos alterados e for preciso decidir como agrupar os commits;
- a pessoa desenvolvedora pedir sugestao de mensagens e descricoes de commit;
- for importante seguir o padrao de historico ja usado no repositorio;
- a mudanca misturar documentacao, skills, plans, codigo ou memoria e pedir separacao por assunto;
- a tarefa incluir a execucao dos commits no git;
- o pedido de commit implicar fechamento de um recorte de trabalho.

## Leitura obrigatoria

Antes de executar esta skill, carregue:

1. `git status --short`
2. `git diff --stat`
3. `git log --oneline -n 20`
4. exemplos mais ricos com `git log --format='%h%n%s%n%b%n---' -n 10`
5. `CLAUDE.md`
6. `MEMORY.md`, quando houver reforcos relevantes sobre documentacao, planos ou convencoes de sessao
7. `docs/routines/close-implementation/ROUTINE.md`, quando o pedido incluir fechar ou executar commits

Quando o recorte envolver documentacao estrutural, tambem vale carregar:

- `docs/README.md`
- `docs/skills/README.md`
- o plano relacionado, se existir
- `docs/routines/README.md`, quando houver duvida sobre o papel de routines no fluxo

## Entradas

O contexto ideal inclui:

- arquivos em `staged`, `changed` e `untracked`
- historico recente de commits do projeto
- entendimento do agrupamento logico das mudancas
- conhecimento sobre quais arquivos sao de fronteira entre mais de um assunto
- autorizacao para executar `git add` e `git commit`, quando a tarefa incluir gravar os commits

## Sequencia recomendada

1. Levante o estado atual com `git status --short`.
2. Meça o tamanho e a distribuicao das mudancas com `git diff --stat`.
3. Se o pedido incluir commitar, rode primeiro a routine `close-implementation` como passada de pre-commit.
4. Leia o historico recente para identificar:
   - prefixos usados, como `docs:`, `feat:` e `refactor:`;
   - tom do assunto;
   - nivel de detalhe esperado no corpo do commit.
5. Agrupe os arquivos por assunto real, e nao apenas por pasta.
6. Identifique arquivos de fronteira e decida em qual commit eles fazem mais sentido, explicando a escolha quando necessario.
7. Para cada grupo, proponha:
   - lista de arquivos;
   - mensagem curta;
   - descricao rica e objetiva em um ou dois paragrafos curtos.
8. Se a pessoa desenvolvedora pedir execucao, rode `git add` e `git commit` de forma nao interativa.
9. Se o sandbox bloquear o indice ou o commit, solicite permissao elevada e continue.
10. Ao final, confira `git status --short` para garantir que o working tree ficou no estado esperado.

## O que esta skill deve verificar

- se o agrupamento ficou pequeno o suficiente para manter um assunto principal por commit
- se a passada de fechamento pre-commit foi respeitada quando o pedido implicava encerramento do recorte
- se a mensagem curta conversa com o padrao recente do repositorio
- se o corpo do commit explica o recorte e o valor da mudanca sem virar changelog completo
- se arquivos de planos, memoria e readmes de navegacao foram distribuidos no commit mais natural
- se o commit nao mistura, sem necessidade, mudanca estrutural com mudanca incidental

## Heuristicas importantes deste projeto

- O historico recente costuma preferir prefixo curto e assunto direto, especialmente `docs:`.
- O corpo do commit costuma ter dois blocos curtos:
  - o que foi feito;
  - por que esse recorte importa.
- Arquivos como `PLAN-000`, `docs/skills/README.md` e `docs/README.md` podem pertencer a mais de um tema; nesses casos, vale escolher o commit onde eles fazem mais sentido no fluxo narrativo.
- Quando a sessao produziu uma nova taxonomia ou camada documental, faz sentido separar:
  - memoria e curadoria;
  - documentacao de uma frente concreta;
  - camada reutilizavel de skills;
  - consolidacao mais institucional da documentacao.
- Quando a pessoa desenvolvedora pede commit, isso tende a significar fechamento de um recorte; por isso, vale validar docs, plans, arquivos novos e checagens locais antes de gravar no git.
- Preferir alguns commits coerentes a um unico commit gigante de documentacao.

## Saida esperada

Uma execucao bem fechada desta skill deve terminar com:

1. grupos de commit claros e justificaveis;
2. mensagens curtas no padrao do repositorio;
3. corpos de commit ricos e objetivos;
4. commits executados de forma nao interativa, quando isso fizer parte do pedido;
5. confirmacao do estado final do git.

## O que esta skill nao deve fazer

Esta skill nao deve:

- criar commits por pasta de forma cega;
- escrever mensagens vagas como `ajustes`, `wip` ou `update`;
- usar git interativo quando houver alternativa nao interativa;
- misturar em um unico commit assuntos diferentes so para “limpar o status”;
- assumir que arquivos de fronteira sempre precisam de commit proprio.
