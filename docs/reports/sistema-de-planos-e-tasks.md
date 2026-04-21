# Sistema de Planos e Tasks

Este documento descreve o sistema de gestao de planos e tasks adotado neste projeto. Use-o como entrada para um LLM replicar a mesma estrutura em outro repositorio.

---

## O que e o sistema

O sistema organiza frentes de trabalho que cruzam multiplos arquivos ou duram mais de uma sessao de trabalho. Ele e composto por:

- **planos** — documentos que descrevem uma frente completa de execucao;
- **tasks** — unidades atomicas de trabalho dentro de um plano;
- **board** — visao consolidada das tasks de um plano;
- **PLAN-000** — painel global de status de todos os planos.

Tudo fica em `docs/plans/` e e escrito em markdown puro, sem ferramentas externas.

---

## Estrutura de pastas

```text
docs/plans/
  README.md                          ← convencoes gerais do sistema
  PLAN-000-board/
    README.md                        ← painel global com status de todos os planos
  PLAN-001-nome-curto/
    README.md                        ← objetivo, contexto, escopo, riscos, log
    board.md                         ← tabela resumida de todas as tasks do plano
    tasks/
      P001-T001.md                   ← uma task por arquivo
      P001-T002.md
      ...
  PLAN-002-outro-nome/
    README.md
    board.md
    tasks/
      P002-T001.md
      ...
```

Arquivos opcionais dentro de um plano (criar so quando o README ficar longo demais):

```text
    logs.md
    conhecimentos.md
    perguntas.md
    referencias.md
```

---

## Convencao de nomenclatura

### Pasta do plano

```text
PLAN-{NNN}-{descricao-curta}/
```

- `NNN` e sequencial com 3 digitos: `001`, `002`, `003`...
- nao reutilizar numero;
- descricao curta, estavel, em kebab-case;
- PLAN-000 e reservado para o painel global.

Exemplos: `PLAN-001-migracao-notion-legado/`, `PLAN-005-jardim-digital/`

### ID da task

```text
P{NNN}-T{NNN}
```

- `P{NNN}` e o numero do plano (ex: P001, P006);
- `T{NNN}` e a sequencia dentro do plano (ex: T001, T015).

Exemplos: `P001-T001`, `P006-T003`

O formato migra limpo para Linear (P001 vira projeto/epico) ou Notion (campo ID simples).

---

## Quando criar um plano

Criar plano quando:

- a frente vai durar mais de uma sessao de trabalho;
- existe risco de perder contexto entre ciclos;
- a entrega afeta varias camadas do codigo;
- vale registrar escopo, dependencias e checkpoints;
- um backlog legado precisa de estrutura mais clara.

Nao criar plano quando:

- a mudanca e pequena e localizada;
- o contexto cabe bem no proprio PR, diff ou comentario curto;
- a frente ja esta descrita nos docs vivos do dominio.

---

## Estrutura do README.md de um plano

Campos obrigatorios:

1. titulo
2. status (tabela com status, criado em, atualizado em, concluido em)
3. objetivo
4. contexto
5. escopo
6. fora do escopo
7. areas afetadas (tabela com area, acao e observacao)
8. backlog (checklist simples)
9. riscos e dependencias
10. notas de implementacao
11. referencias
12. log de execucao

Campos opcionais, incluir quando houver aprendizado reaproveitavel:

13. conhecimentos consolidados
14. perguntas para evoluir este plano

### Template completo do README.md

```markdown
# PLAN-NNN — Titulo

## Status

| Campo | Valor |
|------|------|
| Status | pendente / em andamento / concluido / cancelado |
| Criado em | AAAA-MM-DD |
| Atualizado em | AAAA-MM-DD |
| Concluido em | — |

## Objetivo

Descrever de forma direta o que este plano entrega.

## Contexto

Explicar por que esta frente existe agora e qual problema resolve.

## Escopo

- ...
- ...

## Fora do escopo

- ...
- ...

## Areas afetadas

| Area | Acao | Observacao |
|------|------|------------|
| `src/...` | criar / modificar / remover | ... |

## Backlog

- [ ] ...
- [ ] ...

## Riscos e dependencias

| Tipo | Descricao |
|------|-----------|
| Risco | ... |
| Dependencia | ... |

## Notas de implementacao

Detalhes tecnicos relevantes, trechos de codigo esperado, decisoes de design.

## Referencias

- [`docs/patterns/...`](...)
- [`docs/product/...`](...)

## Log de execucao

| Data | O que foi feito |
|------|-----------------|
| AAAA-MM-DD | plano criado |

## Conhecimentos consolidados

- ...

## Perguntas para evoluir este plano

- ...
```

---

## Estrutura do board.md

O `board.md` e a visao consolidada do plano: uma tabela com id, descricao, status e dependencias de todas as tasks.

```markdown
# Board — PLAN-NNN Nome do Plano

| ID | Descricao | Status | Depende de |
|----|-----------|--------|------------|
| P001-T001 | Descricao curta da task | todo | — |
| P001-T002 | Descricao curta da task | todo | P001-T001 |
| P001-T003 | Descricao curta da task | todo | P001-T002 |
```

Regras:

- manter sempre sincronizado com os arquivos de task;
- atualizar o status no board ao mesmo tempo que no arquivo da task;
- nao repetir detalhes — apenas o resumo da coluna `Descricao`.

---

## Estrutura de uma task

Cada task e um arquivo markdown com frontmatter YAML seguido de corpo em texto livre.

```markdown
---
id: P001-T001
title: Titulo da tarefa
status: todo
plan: PLAN-001
created_at: AAAA-MM-DD
updated_at: AAAA-MM-DD
description: Resumo em uma linha do que a task entrega
---

Detalhes de implementacao, referencias e dependencias.

Depende de: P001-T004
```

### Campos do frontmatter

| Campo | Tipo | Descricao |
|-------|------|-----------|
| `id` | string | ID unico no formato `P{NNN}-T{NNN}` |
| `title` | string | Titulo curto e imperativo da task |
| `status` | enum | Estado atual da task (ver tabela abaixo) |
| `plan` | string | Referencia ao plano pai (ex: `PLAN-001`) |
| `created_at` | date | Data de criacao `AAAA-MM-DD` |
| `updated_at` | date | Data da ultima atualizacao `AAAA-MM-DD` |
| `description` | string | Resumo de uma linha do que a task entrega |

### Status validos

| Status | Significado |
|--------|-------------|
| `todo` | ainda nao iniciada |
| `doing` | em andamento na sessao atual |
| `done` | concluida |
| `blocked` | bloqueada por dependencia ou duvida |

### Dependencias no corpo

Quando uma task depende de outra, registrar no corpo do arquivo:

```text
Depende de: P001-T004
```

Para multiplas dependencias:

```text
Depende de: P001-T003, P001-T004
```

---

## PLAN-000 — painel global

O `PLAN-000-board/README.md` e o painel de status de todos os planos do projeto.

Estrutura minima:

```markdown
# PLAN-000 - Painel dos Planos

## Status

| Campo | Valor |
|------|------|
| Status | em andamento |
| Criado em | AAAA-MM-DD |
| Atualizado em | AAAA-MM-DD |

## Objetivo

Manter visao rapida do estado de todos os planos ativos.

## Notas ativas

_Sem notas ativas no momento._

## Status dos planos

| Plano | Titulo | Status | Criado em |
|------|------|------|------|
| [PLAN-001](../PLAN-001-nome/README.md) | Titulo do Plano | pendente | AAAA-MM-DD |
| [PLAN-002](../PLAN-002-nome/README.md) | Titulo do Plano | pendente | AAAA-MM-DD |

## Ordem sugerida de execucao

1. **PLAN-001** — motivo
2. **PLAN-002** — motivo

## Log de execucao

- AAAA-MM-DD - painel criado
```

---

## Como usar no dia a dia

### Antes de executar um plano

1. ler o README.md do plano;
2. ler os patterns da camada relevante (se o projeto tiver `docs/patterns/`);
3. revisar riscos, dependencias e escopo.

Prompt util para LLM:

```text
Leia o plano em docs/plans/PLAN-NNN-*/README.md e o board em board.md.
Resuma o estado atual, os riscos e o proximo passo seguro antes de implementar.
```

### Durante a execucao

- atualizar `status` no arquivo da task e no `board.md` ao mesmo tempo;
- registrar o que foi feito no `Log de execucao` do README.md do plano;
- marcar itens no backlog do plano conforme concluidos;
- evitar misturar no mesmo plano mudancas que merecem frente separada.

### Ao concluir um plano

- atualizar status do plano para `concluido` no README.md;
- atualizar a data em `Concluido em`;
- atualizar o PLAN-000 com o novo status;
- garantir que as referencias continuem uteis para sessoes futuras.

---

## Exemplo real: plano com 6 tasks

Plano ficticio para ilustrar o sistema completo.

### Pasta

```text
docs/plans/PLAN-003-refactor-auth/
  README.md
  board.md
  tasks/
    P003-T001.md
    P003-T002.md
    P003-T003.md
    P003-T004.md
    P003-T005.md
    P003-T006.md
```

### board.md

```markdown
# Board — PLAN-003 Refactor Auth

| ID | Descricao | Status | Depende de |
|----|-----------|--------|------------|
| P003-T001 | Mapear todos os consumidores do modulo de auth atual | todo | — |
| P003-T002 | Criar nova interface AuthProvider com contrato minimo | todo | P003-T001 |
| P003-T003 | Migrar login e registro para o novo AuthProvider | todo | P003-T002 |
| P003-T004 | Migrar middleware de sessao para o novo AuthProvider | todo | P003-T002 |
| P003-T005 | Remover modulo de auth antigo e variaveis de ambiente obsoletas | todo | P003-T003, P003-T004 |
| P003-T006 | Validar build, rotas protegidas e testes de integracao | todo | P003-T005 |
```

### tasks/P003-T001.md

```markdown
---
id: P003-T001
title: Mapear todos os consumidores do modulo de auth atual
status: todo
plan: PLAN-003
created_at: 2026-04-21
updated_at: 2026-04-21
description: Levantamento completo antes de qualquer mudanca estrutural
---

Listar todos os arquivos que importam do modulo de auth atual.
Verificar se existem consumidores externos (webhooks, integrações de terceiros).
Registrar o resultado como comentario neste arquivo antes de iniciar P003-T002.
```

---

## Instrucao para o LLM criar o sistema em um novo projeto

Use o prompt abaixo como entrada para o LLM do outro projeto:

```text
Crie o sistema de planos e tasks descrito abaixo dentro de docs/plans/.

Estrutura de pastas esperada:
- docs/plans/README.md com as convencoes do sistema
- docs/plans/PLAN-000-board/README.md com o painel global vazio
- uma pasta para cada plano no formato PLAN-NNN-nome-curto/
- dentro de cada plano: README.md, board.md e tasks/ com arquivos P{NNN}-T{NNN}.md

Cada task e um arquivo markdown com frontmatter YAML (campos: id, title, status, plan, created_at, updated_at, description) seguido de corpo em texto livre com detalhes de implementacao.

Status validos de task: todo | doing | done | blocked

O board.md de cada plano e uma tabela com colunas: ID, Descricao, Status, Depende de.

O PLAN-000 e o painel global que lista todos os planos com status e ordem de execucao.

Regras importantes:
- IDs no formato P{NNN}-T{NNN} (ex: P001-T001, P006-T003)
- uma task por arquivo
- board.md sempre sincronizado com os arquivos de task
- dependencias registradas no corpo da task como "Depende de: P001-T004"
- status do plano: pendente / em andamento / concluido / cancelado
- log de execucao em todos os README.md de plano

[Descreva aqui os planos e tasks especificos do seu projeto]
```
