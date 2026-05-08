# ADR-003 — Jardim digital como produto central

## Status

Aceita.

## Contexto

O `site-vitorsampaio` não deve funcionar apenas como portfólio ou blog cronológico.

O objetivo é criar uma presença pública que represente ideias, projetos e aprendizados em evolução.

Um modelo tradicional de blog tende a tratar conteúdos como publicações finalizadas. Isso não representa bem a proposta do projeto, que precisa aceitar notas, insights, ensaios, padrões, marcos e registros em diferentes níveis de maturidade.

## Decisão

O jardim digital será o conceito central do produto.

A área `/jardim` será a principal superfície para conteúdos textuais autorais.

Conteúdos textuais serão modelados como `TextPost`, com classificação por tipo e estágio de maturidade.

## Implicações de produto

O site deve permitir:

* publicação incremental;
* conteúdos em evolução;
* navegação por temas e relações;
* distinção entre conteúdo inicial e conteúdo maduro;
* conexão entre textos, projetos, vídeos e referências;
* amadurecimento de ideias ao longo do tempo.

## Modelo editorial

Conteúdos do Jardim podem ser classificados por tipo:

```txt
note
insight
post
essay
milestone
changelog
pattern
gist
```

E por maturidade:

```txt
seed
sprout
sapling
plant
tree
```

Maturidade não é a mesma coisa que status de publicação.

Um conteúdo pode ser público mesmo estando em estágio inicial.

## Regras derivadas

* A rota `/jardim` deve ser tratada como área central do produto.
* Todo texto autoral público deve pertencer ao Jardim.
* Conteúdos devem exibir tipo e/ou maturidade quando isso ajudar a leitura.
* Navegação não deve depender apenas de cronologia.
* Links manuais entre conteúdos são suficientes no início.
* Backlinks automáticos são evolução futura.
* Busca semântica é evolução futura.

## Consequências

### Positivas

* Representa melhor o processo de pensamento do autor.
* Permite publicar sem exigir acabamento final.
* Cria diferenciação em relação a portfólios e blogs tradicionais.
* Facilita conexão entre projetos, ideias e aprendizados.
* Favorece uso futuro por agentes de IA.

### Negativas

* Exige comunicação clara sobre maturidade do conteúdo.
* Pode aumentar complexidade de navegação.
* Requer cuidado para não virar depósito desorganizado.
* Precisa de curadoria editorial mínima.

## Limites

O jardim digital não deve virar:

* rede social;
* wiki pública sem curadoria;
* dump automático do Notion;
* coleção de rascunhos privados;
* grafo complexo antes de existir volume real de conteúdo.

## Alternativas consideradas

### Blog tradicional

Rejeitado como modelo central porque força uma lógica de publicação finalizada e cronológica.

### Portfólio como produto central

Rejeitado como centro do produto porque projetos são parte importante da presença pública, mas não representam toda a proposta autoral.

### Wiki completa

Rejeitada no início por aumentar complexidade de estrutura, navegação e manutenção.

## Documentos relacionados

* `docs/product/vision.md`
* `docs/product/principles.md`
* `docs/product/information-architecture.md`
* `docs/product/content-model.md`

## Critério de sucesso

Esta decisão será bem-sucedida se:

* o Jardim for a área principal de publicação textual;
* conteúdos puderem evoluir sem parecer quebrados;
* maturidade editorial for compreensível para visitantes;
* textos se conectarem a projetos e referências;
* o site comunicar pensamento em evolução, não apenas publicações finalizadas.
