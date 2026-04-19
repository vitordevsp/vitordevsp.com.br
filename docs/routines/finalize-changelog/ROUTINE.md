---
name: finalize-changelog
description: Fechar o CHANGELOG.md antes de uma release, garantindo que entradas, categorias, versão sugerida e referências estejam coerentes.
trigger: antes de considerar o changelog pronto para release, merge ou publicação
last_updated: 2026-04-18 17:15
---

# Finalize Changelog

## Quando usar

Use esta routine quando:

- o `CHANGELOG.md` foi criado ou atualizado;
- uma frente relevante está perto de virar release;
- é preciso validar se o changelog está legível e consistente;
- existe dúvida se uma entrada deveria permanecer, sair ou mudar de categoria.

## Leitura obrigatória

1. `docs/patterns/versionamento.md`
2. `docs/skills/build-changelog/SKILL.md`
3. `CHANGELOG.md`, quando existir
4. planos relacionados à frente

## Entradas

- changelog atual;
- commits ou planos que sustentam a alteração;
- versão atual ou versão pretendida, quando houver;
- dúvidas de classificação ainda abertas.

## Sequência recomendada

1. Verifique se as entradas representam mudanças relevantes, e não apenas commits.
2. Confirme se as categorias ajudam leitura humana.
3. Revise se há mudança que deveria sugerir `major`, `minor` ou `patch`.
4. Confira se planos concluídos relevantes foram considerados.
5. Remova duplicações e linguagem vaga.
6. Registre dúvidas restantes antes de considerar o changelog pronto.

## O que esta rotina deve verificar

- se o changelog está consistente com o impacto real da mudança;
- se há entradas excessivamente técnicas ou genéricas;
- se a ordem e a categoria das mudanças fazem sentido;
- se a versão sugerida conversa com `docs/patterns/versionamento.md`.

## Saída esperada

1. changelog revisado e pronto para fechamento;
2. dúvidas de versão explicitadas, se existirem;
3. recomendação de próximo passo: release, revisão semântica ou nova edição.

## O que esta rotina não deve fazer

- criar changelog do zero sem usar `build-changelog`;
- publicar release;
- decidir versão sem contexto suficiente.
