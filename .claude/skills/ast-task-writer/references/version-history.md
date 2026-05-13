---
title: Historico de versao da ast-task-writer
description: Registra a base aplicada a esta skill e a consolidacao da camada viva de `tasks` no repositorio.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 21:18
  version: "1.2.0"
---

# Historico de versao da ast-task-writer

## Politica resumida

- esta skill nasce como dona da camada viva de `tasks`;
- a mesma estrutura-base vale para task solta e task de plano;
- toda evolucao relevante deve registrar o que mudou e qual limite foi mantido.

## Registro

| Data | Versao | Base do framework | Tipo | Resumo |
|------|------|------|------|------|
| 2026-05-12 | 1.2.0 | 1.0.0 | refinamento_local | Melhorou o template de `README.md` da task e moveu a explicacao do ciclo de status para os pontos de entrada da camada, mantendo a regra operacional na skill. |
| 2026-05-12 | 1.1.0 | 1.0.0 | refinamento_local | Formalizou o ciclo de status `draft -> refinando -> refinado -> pendente -> revisar -> concluida`, com retorno de `revisar` para `pendente`, e passou a exigir `refinado` ao fim do refinamento. |
| 2026-05-12 | 1.0.0 | 1.0.0 | framework_base | Recuperacao inicial da skill com `SKILL.md` em pt-BR, `agents/openai.yaml`, referencias minimas, template copiavel e validacao estrutural. |
| 2026-05-12 | 1.0.0 | 1.0.0 | consolidacao_tasks | Rename para `ast-task-writer`, materializacao de `.claude/tasks/`, adocao de frontmatter com `metadata`, secao `Perguntas em aberto` e refinamento forte da acao `refinar`. |
