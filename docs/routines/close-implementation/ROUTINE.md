---
name: close-implementation
description: Fechar um recorte de trabalho com uma passada leve de revisao tecnica, patterns, documentacao e checagens locais antes de considerar a implementacao pronta para commit.
trigger: usar quando a implementacao principal terminou e o proximo passo for validar fechamento antes do commit
last_updated: 2026-04-18 05:31
---

# Close Implementation

Use esta routine quando a implementacao ja estiver funcionalmente pronta e o trabalho restante for garantir que o recorte pode ser encerrado com menos risco tecnico e documental.

Ela cobre um momento especifico do ciclo: a passagem entre "parece pronto" e "pode virar commit".

## Quando usar

Use esta routine quando:

- um dominio ou fluxo foi criado ou alterado de forma relevante;
- mais de uma camada foi tocada, como `page`, `component`, `lib/notion`, `docs` ou `plans`;
- a implementacao principal terminou e o proximo passo e validar fechamento;
- a pessoa desenvolvedora pedir commit ou sinalizar encerramento do recorte.

## Leitura obrigatoria

Antes de executar esta routine, carregue:

1. `git status --short`
2. os patterns relevantes para as camadas tocadas
3. `docs/patterns/documentacao.md`
4. `docs/patterns/specs.md`, quando a mudanca tocar artefatos com `specs.md` ou puder exigir um
5. docs relacionados em `docs/`, quando existirem
6. o plano relacionado, quando a frente estiver registrada em `docs/plans/`

## Entradas

O contexto ideal inclui:

- arquivos `staged`, `changed` e `untracked`
- diff ou conjunto de arquivos alterados
- dominio ou fluxo principal afetado
- patterns relevantes para as camadas tocadas
- docs vivos, specs e planos relacionados
- entendimento do que a pessoa desenvolvedora quer considerar como recorte fechado

## Sequencia recomendada

1. Revise o estado do git para entender se o recorte esta coeso.
2. Rode uma passada tecnica leve usando a skill `refactor-review`, quando fizer sentido.
3. Rode a passada estrutural e documental usando a skill `patterns-review`.
4. Verifique se planos tocados foram atualizados com log e conhecimento adquirido.
5. Verifique se docs, specs, readmes ou indices impactados foram atualizados.
6. Rode validacoes locais possiveis e baratas quando forem compativeis com o recorte, como `npm run lint` ou `npx tsc --noEmit`.
7. Explicite riscos residuais, se ainda existirem.
8. So depois trate o recorte como pronto para commit.

## O que esta rotina deve verificar

- se o conjunto de arquivos alterados forma um recorte coerente
- se a estrutura respeita os patterns do projeto
- se houve atualizacao documental suficiente para manutencao
- se algum plano tocado ficou sem log ou sem reflexo do estado atual
- se novos arquivos estruturais precisam de metadata temporal
- se existe algo validavel de forma segura antes do commit

## Saida esperada

Uma execucao bem fechada desta routine deve terminar com:

1. recorte tecnicamente consistente para commit;
2. documentacao e planos atualizados quando necessario;
3. validacoes locais executadas ou limitacoes explicitadas;
4. riscos residuais conhecidos antes da gravacao no git.

## O que esta rotina nao deve fazer

Esta routine nao deve:

- reabrir a implementacao principal sem necessidade;
- virar refatoracao ampla;
- substituir `patterns`, `skills` ou `plans`;
- assumir que todo commit exige exatamente as mesmas validacoes;
- commitar automaticamente sem que a pessoa desenvolvedora tenha pedido ou sem que a skill responsavel por commit tenha assumido essa etapa.
