---
title: Historico de versao da ast-skill-writer
description: Registra a base do framework aplicada a esta skill e as customizacoes locais preservadas ao longo do tempo.
metadata:
  author: agents-studio
  last_updated: 2026-05-12 01:57
  version: "1.0.0"
---

# Historico de versao da ast-skill-writer

## Politica resumida

- todas as skills desta base nascem em `1.0.0`;
- o sufixo `-local` fica reservado para customizacoes locais futuras sobre uma base distribuida do framework;
- toda mudanca relevante deve registrar o que mudou e qual base foi preservada.

## Registro

| Data | Versao | Base do framework | Tipo | Resumo |
|------|------|------|------|------|
| 2026-05-11 | 1.0.0 | 1.0.0 | framework_base | Estrutura base da skill consolidada para a primeira versao do Agents Studio v0.1, com workflow completo em pt-BR, referencias ativas, template copiavel e historico de versao. |
| 2026-05-12 | 1.0.0 | 1.0.0 | refinamento_estrutura | Adocao de `metadata.author`, `metadata.last_updated` e `metadata.version`, migracao do template para `assets/`, criacao de `pattern-skill-scripts.md`, nova acao para incorporar conhecimento e script local de validacao da skill. |
| 2026-05-12 | 1.0.0 | 1.0.0 | refinamento_fluxo | Mermaid passou a ser requisito global do pacote via `references/sequence-workflows.md`, com fluxo por acao e validacao estrutural correspondente. |
