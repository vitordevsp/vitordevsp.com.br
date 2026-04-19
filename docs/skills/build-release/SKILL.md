---
name: build-release
description: Fechar uma release combinando versionamento, changelog, resumo do recorte e recomendação de versão, com foco em consistência histórica e clareza do impacto.
last_updated: 2026-04-18 17:05
---

# Build Release

Use esta skill quando a tarefa for preparar uma release documental, com recomendação de versão, fechamento de changelog e resumo do recorte.

## Quando usar

Use esta skill quando:

- uma frente grande foi concluída;
- existe necessidade de fechar changelog e sugerir versão;
- o projeto ou framework precisa de nota de release;
- a leitura do impacto já não cabe só em commit ou plano.

## Leitura obrigatória

1. `docs/patterns/versionamento.md`
2. `docs/skills/build-changelog/SKILL.md`
3. `CHANGELOG.md`, se existir
4. planos e commits da frente relevante

## Sequência recomendada

1. Confirme o recorte da release.
2. Revise ou gere o changelog do período.
3. Classifique o impacto como `major`, `minor` ou `patch`.
4. Escreva nota curta de release.
5. Registre dúvidas de classificação que ainda dependam de validação.

## Saída esperada

1. recomendação de versão;
2. changelog alinhado ao recorte;
3. nota de release curta;
4. riscos ou dúvidas ainda em aberto.

## O que esta skill não deve fazer

- publicar release automaticamente sem pedido explícito;
- assumir impacto sem base concreta;
- duplicar changelog inteiro dentro da nota de release.
