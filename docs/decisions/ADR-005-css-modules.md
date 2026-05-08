# ADR-005 — Usar CSS Modules como padrão de estilos

## Status

Aceita.

## Contexto

O `site-vitorsampaio` precisa de uma estratégia de estilos simples, controlável e sustentável.

O projeto deve ter identidade visual própria, boa experiência de leitura e baixa dependência de bibliotecas visuais externas.

A proposta do site não exige um design system complexo no MVP.

## Decisão

CSS Modules será o padrão principal de estilização do projeto.

Componentes devem ter estilos co-localizados sempre que fizer sentido.

Exemplo:

```txt
text-post-card.tsx
text-post-card.module.css
```

## Regras derivadas

* Usar CSS Modules para componentes.
* Usar CSS global apenas para reset, tokens e base.
* Preferir CSS variables para tokens globais.
* Preferir classes semânticas.
* Usar `data-*` para variantes e estados quando apropriado.
* Não usar Tailwind no MVP.
* Não usar Chakra UI no MVP.
* Não adicionar biblioteca CSS-in-JS sem decisão explícita.

## Escopo

CSS Modules deve ser usado em:

* componentes compartilhados;
* componentes de feature;
* componentes de layout;
* renderizadores de conteúdo;
* páginas, quando houver estilo específico da página.

## Estilos globais

Permitido em estilos globais:

* reset;
* tokens;
* variáveis CSS;
* estilos de `html` e `body`;
* tipografia base;
* pequenos utilitários realmente globais.

Evitar em estilos globais:

* classes de componentes;
* regras específicas de feature;
* overrides amplos;
* estilos de página inteira sem necessidade.

## Consequências

### Positivas

* Baixo acoplamento com bibliotecas externas.
* Controle direto sobre CSS.
* Escopo local por componente.
* Menor risco de colisão de classes.
* Combina bem com componentes React e Next.js.
* Facilita identidade visual própria.

### Negativas

* Exige disciplina para manter consistência visual.
* Não oferece sistema de design pronto.
* Pode gerar repetição se tokens e componentes base forem mal definidos.
* Requer criação manual de padrões visuais.

## Alternativas consideradas

### Tailwind

Rejeitado no MVP por não combinar com a preferência atual do projeto e por aumentar a dependência de utility classes na marcação.

### Chakra UI

Rejeitado no MVP por ser uma camada visual pesada para o escopo inicial e por impor padrões de componente/design que o projeto não precisa agora.

### styled-components / Emotion

Rejeitados no MVP por adicionar CSS-in-JS sem necessidade clara.

### CSS global puro

Rejeitado como padrão principal porque aumenta risco de colisão e dificulta manutenção por componente.

## Documentos relacionados

* `docs/architecture/styling.md`
* `docs/architecture/frontend.md`
* `docs/agent/instructions.md`

## Critério de sucesso

Esta decisão será bem-sucedida se:

* componentes tiverem estilos isolados;
* CSS global permanecer pequeno;
* tokens forem simples e úteis;
* a UI tiver consistência visual;
* o projeto não depender de framework visual pesado;
* novos componentes puderem ser criados sem conflito de estilos.
