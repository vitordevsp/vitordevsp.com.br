---
name: pre-release
description: Revisar changelog, versão, planos concluídos e riscos antes de considerar uma release pronta.
trigger: antes de publicar, taguear ou comunicar uma release
last_updated: 2026-04-18 17:15
---

# Pre Release

## Quando usar

Use esta routine quando:

- uma release está prestes a ser fechada;
- já existe changelog ou nota de release em preparação;
- há dúvida sobre versão, risco ou escopo do recorte;
- é preciso fazer uma última passada antes de tag, publicação ou comunicação.

## Leitura obrigatória

1. `docs/patterns/versionamento.md`
2. `docs/skills/build-release/SKILL.md`
3. `docs/routines/finalize-changelog/ROUTINE.md`
4. `CHANGELOG.md`, quando existir
5. planos concluídos no recorte

## Entradas

- versão candidata;
- changelog ou nota de release;
- commits e planos da frente;
- riscos conhecidos;
- dependências externas, quando existirem.

## Sequência recomendada

1. Confirme se o recorte da release está claro.
2. Rode ou revise a routine `finalize-changelog`.
3. Verifique se a versão candidata respeita semver.
4. Confira se planos relevantes foram atualizados e fechados.
5. Liste riscos ou pendências que impedem release.
6. Indique se a release está pronta, bloqueada ou precisa de revisão semântica.

## O que esta rotina deve verificar

- changelog coerente;
- versão candidata justificável;
- planos e logs atualizados;
- riscos conhecidos explicitados;
- ausência de pendências críticas para o recorte.

## Saída esperada

1. decisão de prontidão da release;
2. versão recomendada ou ponto de dúvida;
3. pendências bloqueantes, se existirem;
4. resumo curto para comunicação.

## O que esta rotina não deve fazer

- publicar release sem pedido explícito;
- esconder pendência bloqueante por conveniência;
- substituir análise semântica quando ela for necessária.
