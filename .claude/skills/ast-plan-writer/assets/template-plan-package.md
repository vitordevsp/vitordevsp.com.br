---
title: Template de pacote de plano
description: Template copiavel para plano e estrutura inicial de tasks no Agents Studio v0.1, alinhado ao handoff posterior para a ast-task-writer.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 22:06
  version: "1.3.0"
---

# Template de pacote de plano

## Estrutura base

```text
.claude/plans/PLAN-NNN-slug/
├── README.md
└── tasks/
    └── TASK-001-slug/
        └── README.md
```

Se a frente nao tiver recorte suficiente para abrir `tasks/`, ela provavelmente ainda cabe melhor como task solta em `.claude/tasks/`.

Arquivos opcionais dentro da task:

```text
decision-log.md
report.md
references.md
source-matrix.md
```

## Excecao: `PLAN-000-desktop`

`PLAN-000-desktop` e o unico plano-base da pasta. Ele nao segue a mesma logica de frente de entrega.

Estrutura comum quando precisar existir:

```text
.claude/plans/PLAN-000-desktop/
├── README.md
├── progress.md
├── notes.md
├── report.md
└── references.md
```

Regras:

- `progress.md` concentra checkpoints e pendencias locais temporarias;
- `notes.md`, `report.md`, `references.md` e arquivos temporarios so nascem sob demanda;
- relatorios curtos sobre o estado dos planos podem morar aqui antes de virar documentacao mais estavel;
- o desktop nao substitui backlog persistente, plano de entrega nem ponte externa de coordenacao.

## Frontmatter sugerido do plano

```yaml
---
title: PLAN-NNN - Titulo da frente
status: draft
tags:
  - plans
metadata:
  owner: nome-da-frente
  created_at: AAAA-MM-DD HH:MM
  updated_at: AAAA-MM-DD HH:MM
---
```

## Template de `README.md` do plano

Frontmatter sugerido:

```yaml
---
title: PLAN-NNN - Titulo da frente
status: draft
tags:
  - plans
metadata:
  owner: nome-da-frente
  created_at: AAAA-MM-DD HH:MM
  updated_at: AAAA-MM-DD HH:MM
---
```

```md
# PLAN-NNN - Titulo da frente

## Objetivo

[o que esta frente entrega]

## Contexto

[por que esta frente existe agora]

## Escopo

- [...]

## Fora do escopo

- [...]

## Areas afetadas

- `...`

## Tasks

- [`TASK-001 - ...`](./tasks/TASK-001-slug/README.md)

## Riscos e dependencias

- [...]

## Referencias

- [...]

## Perguntas em aberto

- [lacuna que precisa de confirmacao humana]
```

## Template de `README.md` da task

Use a `ast-task-writer` como contrato da task. Todo plano deve nascer com `tasks/`; quando a task inicial precisar ser materializada na mesma rodada, reaproveite o schema abaixo.

Frontmatter sugerido da task:

```yaml
---
title: TASK-001 - Titulo da subfrente
status: draft
priority: P1
type: ajuste pontual
metadata:
  owner: nome-da-frente-ou-skill
  created_at: AAAA-MM-DD HH:MM
  updated_at: AAAA-MM-DD HH:MM
  tags:
    - tasks
---
```

```md
# TASK-001 - Titulo da subfrente

## Objetivo

[o que a task entrega]

## Contexto local

[contexto minimo que esta task precisa para ser executada]

## Escopo

- [...]

## Nao inclui

- [...]

## Entradas e contratos

- [...]

## Resultado esperado

- [...]

## Criterios de aceite

- [ ] [...]

## Validacao minima

- [...]

## Dependencias

- [...]

## Referencias

- [...]

## Perguntas em aberto

- nenhuma no momento.
```
