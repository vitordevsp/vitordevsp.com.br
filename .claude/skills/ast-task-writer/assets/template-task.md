---
title: Template base de task pequena
description: Template copiavel para tasks pequenas e autocontidas, reutilizavel tanto para task solta quanto para task vinculada a plano.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 21:18
  version: "1.2.0"
---

# Template base de task pequena

## Onde esta task mora

- `task` solta: `.claude/tasks/TASK-xxx-slug/README.md`;
- `task` de plano: `.claude/plans/PLAN-xxx-.../tasks/TASK-xxx-slug/README.md`;
- o formato-base e o mesmo nos dois casos; muda apenas o contexto herdado.

Arquivos auxiliares opcionais:

```text
decision-log.md
report.md
references.md
source-matrix.md
```

## Frontmatter sugerido

```yaml
---
title: TASK-XXX - Titulo da task
status: draft
priority: P1
type: ajuste pontual
metadata:
  owner: nome-da-skill-ou-frente
  created_at: AAAA-MM-DD HH:MM
  updated_at: AAAA-MM-DD HH:MM
  tags:
    - tasks
---
```

## Estrutura sugerida

```markdown
# TASK-XXX - Titulo da task

## Objetivo

Descrever a entrega direta desta task.

## Contexto local

Explicar apenas o contexto necessario para executar esta task.

## Escopo

- ...

## Nao inclui

- ...

## Entradas e contratos

- ...

## Resultado esperado

- ...

## Criterios de aceite

- [ ] ...

## Validacao minima

- ...

## Dependencias

- ...

## Referencias

- ...

## Perguntas em aberto

- nenhuma no momento.
```

## Leitura rapida para preencher

- `Objetivo`: o que a task entrega, em uma frase;
- `Contexto local`: o minimo que precisa ser lembrado para executar;
- `Escopo`: o que entra;
- `Nao inclui`: o que fica explicitamente fora;
- `Entradas e contratos`: arquivos, APIs, skills ou regras que sustentam a task;
- `Resultado esperado`: comportamento ou artefato que deve existir ao final;
- `Criterios de aceite`: o que precisa ser verdade para considerar pronto;
- `Validacao minima`: como verificar sem depender de memoria oral.

## Ajuste por contexto

### Task solta

- escreva o contexto de forma mais autocontida;
- nao dependa de um plano pai para explicar objetivo ou risco principal.

### Task vinculada a plano

- explicite qual `PLAN-*` a task herda;
- deixe no arquivo apenas o recorte local e as referencias minimas para o plano pai.

## Regra de refinamento

- se faltar escopo, exclusao, validacao ou dependencia, pergunte antes de fechar a task;
- ao abrir o refinamento, mova para `refinando`;
- ao fechar o refinamento com seguranca, mova para `refinado`;
- registre apenas perguntas que mudam o recorte ou a seguranca da execucao;
- depois de respondidas, internalize as respostas no corpo da task e limpe a secao final.
