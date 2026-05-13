# ADR-005 — CSS Modules como padrão de estilos

## Status

Aceita.

## Contexto

O `site-vitorsampaio` precisa de estratégia de estilos simples, controlável e sustentável. O projeto deve ter identidade visual própria, boa experiência de leitura e baixa dependência de bibliotecas visuais externas. A proposta não exige um design system complexo no MVP.

## Decisão

CSS Modules é o padrão principal de estilização. Componentes têm estilos co-localizados sempre que fizer sentido.

```txt
text-post-card.tsx
text-post-card.module.css
```

Regras operacionais (tokens, nomes, variantes, responsividade, acessibilidade visual) em [`../styling.md`](../styling.md).

## Consequências

Positivas: baixo acoplamento com bibliotecas externas, controle direto sobre CSS, escopo local por componente, menor risco de colisão, combina bem com React/Next, facilita identidade visual própria.

Negativas: exige disciplina para manter consistência visual, não oferece design system pronto, pode gerar repetição se tokens e componentes base forem mal definidos, requer criação manual de padrões visuais.

## Alternativas consideradas

* **Tailwind** — rejeitado por não combinar com a preferência atual do projeto e por aumentar dependência de utility classes na marcação.
* **Chakra UI** — rejeitado por ser camada visual pesada para o escopo inicial e impor padrões de componente/design desnecessários.
* **styled-components / Emotion** — rejeitados por adicionar CSS-in-JS sem necessidade clara.
* **CSS global puro** — rejeitado por aumentar risco de colisão e dificultar manutenção por componente.

## Documentos relacionados

* [`../styling.md`](../styling.md)
* [`../architecture.md`](../architecture.md)
