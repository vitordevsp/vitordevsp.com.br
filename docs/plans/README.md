# Planos do Projeto

Esta pasta concentra planos de trabalho estruturados do repositório.

Ela existe para transformar frentes relevantes de implementação, documentação ou migração em artefatos mais fáceis de acompanhar ao longo de várias sessões, sem depender de contexto oral.

## Objetivo desta pasta

`docs/plans/` deve responder principalmente:

- quais planos ativos existem no projeto;
- qual é o objetivo de cada frente;
- quais arquivos e camadas tendem a ser afetados;
- o que já foi concluído e o que ainda falta;
- quais dependências, riscos e referências precisam ser consideradas antes de executar.

## Relação com o restante da documentação

- `docs/patterns/` define o padrão oficial do projeto.
- `docs/skills/` define fluxos recorrentes de execução.
- `docs/routines/` define rituais operacionais situacionais, especialmente perto de fechamento e validação.
- `docs/agents/` fica reservado para agentes realmente especializados, quando existirem.
- `docs/plans/` organiza frentes de trabalho que atravessam múltiplos arquivos ou várias sessões.

Em resumo:

- `patterns` define a regra;
- `skills` definem a execução recorrente;
- `routines` definem momentos específicos do ciclo;
- `agents` definem um papel especializado quando necessário;
- `plans` define a frente de execução.

## Quando criar um plano aqui

Criar plano em `docs/plans/` quando:

- a frente vai durar mais de uma sessão;
- existe risco de perder contexto entre ciclos;
- a entrega afeta várias camadas;
- vale registrar escopo, dependências e checkpoints;
- um backlog legado precisa ser trazido para uma estrutura mais clara.

Não criar plano aqui quando:

- a mudança é pequena e localizada;
- o contexto cabe bem no próprio PR, diff ou comentário curto;
- a frente já está suficientemente descrita nos docs vivos do domínio.

## Convenção de nomenclatura

Planos nascem sempre como pasta:

```text
PLAN-NNN-descricao-curta/
  README.md        ← historia: contexto, objetivo, direcionamento, escopo e aceite
  board.md         ← tabela resumida das tasks (id, descricao, status, dependencias)
  tasks/           ← issues autocontidas, uma por arquivo
  logs.md          ← opcional
  conhecimentos.md ← opcional
```

Exemplos:

- `PLAN-001-migracao-notion-legado/README.md`
- `PLAN-000-board/README.md`

Regras:

- `NNN` é sequencial;
- não reutilizar número;
- usar descrição curta e estável;
- escrever o conteúdo do plano em português do Brasil;
- começar com tudo no `README.md` — criar arquivos auxiliares só quando o conteúdo crescer a ponto de prejudicar a leitura.

Quando o plano tratar uma abstracao do framework, preferir nome agnostico ao fornecedor.

Não separar por ansiedade organizacional. Separar apenas quando o `README.md` deixar de ser a melhor forma de leitura.

Perguntas pendentes não devem viver em arquivo separado por padrão. Quando existirem, entram em uma seção `## Questions` no final da história ou da task mais adequada.

Também vale consolidar planos quando várias frentes pequenas passam a representar a mesma evolução estrutural. Nesse caso:

- manter o plano mais abrangente como dossiê vivo;
- mover conhecimentos, decisões, logs e pendências para arquivos temáticos dentro dele;
- preservar um mapa de planos absorvidos;
- atualizar links operacionais para o novo dossiê;
- remover os planos antigos somente depois de garantir que nenhuma referência viva depende deles.

## Estrutura recomendada

Cada plano funciona como uma história. Ele orienta a execução macro, registra motivação e agrupa tarefas, mas não deve ser o único lugar com contexto necessário para implementar uma task.

Cada task funciona como uma issue autocontida. Ela deve conter contexto, objetivo, escopo, detalhes técnicos, critérios de aceite e referências suficientes para uma pessoa executar sem abrir vários arquivos só para entender o problema.

## Template base

```markdown
---
id: PLAN-NNN
linear_id: DEVSP-000
title: Título da história
status: todo
created_at: AAAA-MM-DD
updated_at: AAAA-MM-DD
sync_at: "AAAA-MM-DD HH:MM:SS -0300"
---

# PLAN-NNN - Título

## Contexto

Explicar o problema, motivação e cenário atual.

## Objetivo

Descrever o resultado esperado da história.

## Direcionamento

Explicar decisões macro, restrições e abordagem geral.

## Escopo

### Inclui

- Item incluído no escopo

### Não inclui

- Item fora de escopo

## Tarefas relacionadas

- `PNNN-T001` — Nome da tarefa
- `PNNN-T002` — Nome da tarefa

## Critérios de aceite da história

- [ ] Critério verificável

## Questions

- [ ] Pergunta pendente da história, quando houver
```

## Como usar um plano no dia a dia

### Antes de executar

1. ler o plano;
2. ler os patterns da camada relevante;
3. abrir os docs vivos do domínio quando existirem;
4. revisar direcionamento, dependências, questions e escopo.

Prompt útil:

```text
Leia o plano em docs/plans/PLAN-NNN-*/README.md, os patterns relevantes e os docs do domínio afetado.
Resuma o estado atual, os riscos e o próximo passo seguro antes de implementar.
```

### Durante a execução

- marcar itens concluídos;
- atualizar o log de execução;
- registrar desvios relevantes sem perder o foco do plano;
- evitar misturar no mesmo plano mudanças que merecem frente separada.
- enriquecer a task quando uma informação necessária para execução ainda estiver apenas na história.

### Ao concluir

- revisar `docs/patterns/documentacao.md`;
- atualizar o plano com o estado final;
- garantir que as referências continuem úteis para a próxima sessão.

## Tasks e board

Cada plano tem uma pasta `tasks/` com issues autocontidas e um arquivo `board.md` com visao resumida.

Cada task e um arquivo markdown com frontmatter:

```markdown
---
id: P001-T001
linear_id: DEVSP-000
title: Titulo da tarefa
status: todo
plan: PLAN-001
created_at: AAAA-MM-DD
updated_at: AAAA-MM-DD
sync_at: "AAAA-MM-DD HH:MM:SS -0300"
description: Resumo em uma linha do que a task entrega
---

## Contexto

Explicar por que a tarefa existe e como se conecta à história.

## Objetivo

Descrever o resultado esperado da tarefa.

## Escopo

### Fazer

- Item executável

### Não fazer

- Item fora de escopo

## Detalhes técnicos

Arquivos, funções, contratos, endpoints, tipos, dependências e integrações relevantes.

## Critérios de aceite

- [ ] Critério verificável

## Referências

- Caminho ou doc relevante

## Questions

- [ ] Pergunta pendente da tarefa, quando houver
```

### Formato do ID

`P{NNN}-T{NNN}` onde:

- `P{NNN}` e o numero do plano com 3 digitos (ex: P001, P006)
- `T{NNN}` e a sequencia dentro do plano com 3 digitos (ex: T001, T015)

Exemplos: `P001-T001`, `P006-T003`

O formato migra limpo para Linear (P001 vira projeto/epico) ou Notion (campo ID simples).

### Status validos

| Status    | Significado                        |
|-----------|------------------------------------|
| `todo`    | ainda nao iniciada                 |
| `doing`   | em andamento na sessao atual       |
| `done`    | concluida                          |
| `blocked` | bloqueada por dependencia ou duvida|

### Dependencias

Quando uma task depende de outra, registrar em `## Detalhes técnicos` com `Depende de: P001-T004`.

Quando houver perguntas pendentes, a seção `## Questions` deve ser a última seção do arquivo. Se não houver perguntas, omitir a seção.

### Sincronização com Linear

Quando uma história ou task for criada no Linear, registrar no frontmatter:

- `linear_id`: identificador retornado pelo Linear, como `DEVSP-13`;
- `sync_at`: data/hora da última sincronização local;
- manter `id` como identificador local estável, independente do título usado no Linear.

### board.md

O `board.md` e a visao consolidada do plano: uma tabela com id, descricao, status e dependencias de todas as tasks.

```markdown
| ID        | Descricao                        | Status | Depende de |
|-----------|----------------------------------|--------|------------|
| P001-T001 | Confirmar variaveis de ambiente  | todo   | —          |
| P001-T002 | Corrigir databaseId hardcoded    | todo   | —          |
```

Regras do board:

- manter sempre sincronizado com os arquivos de task;
- atualizar o status no board ao mesmo tempo que no arquivo da task;
- nao e necessario repetir detalhes — apenas o resumo da coluna `Descricao`.

## Status dos planos

O painel rápido de status dos planos fica em:

- [`PLAN-000-board`](./PLAN-000-board/)

## Regra importante

Os planos desta pasta não substituem:

- `docs/patterns/`;
- `docs/skills/`;
- `docs/agents/`, quando houver agentes ativos;
- os docs vivos dos domínios;
- a responsabilidade de manter código e documentação coerentes no mesmo ciclo.
