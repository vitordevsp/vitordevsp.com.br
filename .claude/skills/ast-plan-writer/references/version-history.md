---
title: Historico de versao da ast-plan-writer
description: Registra a base do framework aplicada a esta skill e os refinamentos estruturais preservados na recuperacao do Agents Studio v0.1.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 22:06
  version: "1.3.0"
---

# Historico de versao da ast-plan-writer

## Politica resumida

- esta skill nasce em `1.0.0` como base do framework recuperada;
- `-local` fica reservado para customizacoes futuras sobre essa base;
- mudancas relevantes devem registrar o que mudou no contrato da skill.

## Registro

| Data | Versao | Base do framework | Tipo | Resumo |
|------|------|------|------|------|
| 2026-05-12 | 1.3.0 | 1.0.0 | refinamento_local | Tornou `tasks/` parte obrigatoria do contrato do plano, removeu o indice de status de `.claude/plans/README.md` e centralizou o acompanhamento vivo em `PLAN-000-desktop/progress.md`. |
| 2026-05-12 | 1.2.0 | 1.0.0 | refinamento_local | Melhorou os templates de `README.md` de plano e task de plano e consolidou `PLAN-000-desktop` com `progress.md` como arquivo em vez de pasta. |
| 2026-05-12 | 1.1.0 | 1.0.0 | refinamento_local | Formalizou o mesmo ciclo de status das tasks tambem para planos, com `draft`, `refinando`, `refinado`, `pendente`, `revisar` e `concluida`, e passou a exigir `refinado` ao fim do refinamento. |
| 2026-05-12 | 1.0.2 | 1.0.0 | refinamento_local | Ajustou a definicao do desktop para usar `progress.md`, `notes.md`, `report.md` e `references.md` como arquivos sob demanda, em vez de sugerir pastas temporarias. |
| 2026-05-12 | 1.0.1 | 1.0.0 | refinamento_local | Formalizou `PLAN-000-desktop` como plano-base operacional da pasta, com `progress` para acompanhamento local temporario e espaco explicito para notas, relatorios curtos e arquivos provisorios ainda sem destino estavel. |
| 2026-05-12 | 1.0.0 | 1.0.0 | framework_base | Recuperacao da skill com contrato operacional em pt-BR, pacote ativo enxuto, tasks em pasta com `decision-log.md`, Mermaid por acao e handoff de fechamento tecnico para `ast-release-manager`. |
| 2026-05-12 | 1.0.0 | 1.0.0 | convergencia_tasks | A skill deixou de ter acoes proprias de task, passou a explicitar perguntas obrigatorias ao usuario para fechar lacunas e formalizou o handoff de criacao/refinamento de task para `ast-task-writer`. |
