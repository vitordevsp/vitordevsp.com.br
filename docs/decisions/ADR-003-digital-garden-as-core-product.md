# ADR-003 — Jardim digital como produto central

## Status

Aceita.

## Contexto

O `site-vitorsampaio` não deve funcionar apenas como portfólio ou blog cronológico. O objetivo é uma presença pública que represente ideias, projetos e aprendizados em evolução. Um blog tradicional trata conteúdos como publicações finalizadas, o que não representa a proposta — o site precisa aceitar notas, insights, ensaios, padrões, marcos e registros em diferentes níveis de maturidade.

## Decisão

O jardim digital é o conceito central do produto. `/jardim` é a principal superfície para conteúdos textuais autorais. Conteúdos textuais são modelados como `TextPost`, com classificação por tipo (`kind`) e estágio de maturidade.

Tipos e estágios canônicos em [`../content-model.md`](../content-model.md).

## Consequências

Positivas: representa melhor o processo de pensamento do autor, permite publicar sem acabamento final, diferencia em relação a portfólios e blogs tradicionais, facilita conexão entre projetos e ideias, favorece uso futuro por agentes de IA.

Negativas: exige comunicação clara sobre maturidade, pode aumentar complexidade de navegação, requer curadoria editorial mínima.

## Limites

O jardim digital não deve virar rede social, wiki sem curadoria, dump automático do Notion, coleção de rascunhos privados, ou grafo complexo antes de existir volume real.

## Alternativas consideradas

* **Blog tradicional** — rejeitado por forçar publicação finalizada e cronológica.
* **Portfólio como produto central** — rejeitado porque projetos são importantes mas não representam toda a proposta autoral.
* **Wiki completa** — rejeitada por aumentar complexidade de estrutura, navegação e manutenção.

## Documentos relacionados

* [`../product.md`](../product.md)
* [`../content-model.md`](../content-model.md)
