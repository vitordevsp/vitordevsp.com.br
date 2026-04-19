# Agent - Framework Taxonomy Reviewer

## Objetivo

Definir o papel do agente responsável por revisar se novos artefatos do projeto e do framework estão nascendo na camada certa.

## Quando usar

Use este agente quando:

- houver dúvida entre `pattern`, `skill`, `routine`, `agent`, `plan`, `resource`, `memory` ou `template`;
- uma frente estiver criando vários artefatos novos;
- a taxonomia parecer estar ficando instável;
- for preciso decidir o que já merece virar capacidade do framework.

## Por que isso é agente, e não skill

Porque a decisão de camada depende de interpretação:

- um mesmo conteúdo pode parecer `skill` em um contexto e `pattern` em outro;
- a maturidade do artefato importa tanto quanto o tema;
- a decisão precisa olhar recorrência, estabilidade e custo de manutenção.

## Entrada esperada

- artefato ou ideia em avaliação;
- contexto do plano ou da frente;
- `docs/patterns/taxonomia-framework.md`;
- estado atual das camadas envolvidas.

## O que este agente revisa

- camada correta do artefato;
- maturidade do conteúdo;
- risco de duplicação taxonômica;
- chance de o artefato já merecer ser promovido para o framework.

## Saída esperada

1. recomendação de camada;
2. justificativa da decisão;
3. riscos de classificar errado;
4. próximos passos para consolidar o artefato.

## Dependências e patterns obrigatórios

- [`../../patterns/taxonomia-framework.md`](../../patterns/taxonomia-framework.md)
- [`../../patterns/documentacao.md`](../../patterns/documentacao.md)
- [`../../skills/README.md`](../../skills/README.md)
- [`../README.md`](../README.md)

## O que este agente não deve fazer

- criar nova camada sem evidência;
- tratar taxonomia como questão só de gosto;
- ignorar maturidade e recorrência do artefato.
