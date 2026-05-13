# `.claude/`

Camada operacional do repositório.

Esta pasta concentra o que ajuda agentes e colaboradores a executar trabalho recorrente, acompanhar frentes longas e registrar unidades operacionais pequenas sem depender de contexto oral.

## Estrutura

- [`skills/`](./skills/): workflows reutilizáveis e instruções operacionais;
- [`plans/`](./plans/README.md): frentes multi-etapas, multi-sessão ou com risco próprio;
- [`tasks/`](./tasks/README.md): tasks pequenas, autocontidas e verificáveis;
- [`tools.yaml`](./tools.yaml): catálogo operacional estruturado das skills locais.

## Como escolher o artefato certo

- use `skill` quando a necessidade for recorrente e reutilizável;
- use `plan` quando a frente exigir várias etapas, checkpoints ou várias sessões;
- use `task` quando o trabalho couber em uma unidade pequena e bem delimitada;
- use `tools.yaml` como índice rápido da camada.

## Convenções desta camada

- não usar `.claude/skills/.system/`;
- skills nativas do framework usam prefixo `ast-*`;
- skills locais da aplicação usam prefixo `app-*` ou outro prefixo do domínio;
- evitar recriar categorias legadas como camadas principais paralelas;
- `.claude/agents/` permanece reservado para definições de subagent do Claude Code, não como camada operacional paralela.

## Relação com `docs/` e `MEMORY.md`

- `docs/` continua sendo a camada humana;
- `.claude/` é a camada operacional;
- `MEMORY.md` guarda apenas reforços curtos e temporários, que depois devem subir para `docs/`, `.claude/` ou docs locais do código.
