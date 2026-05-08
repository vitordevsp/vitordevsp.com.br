# Arquitetura de Estilos

Este documento define o padrão de estilização do `site-vitorsampaio`.

## Decisão principal

CSS Modules é o padrão de estilização de componentes.

Não usar no MVP:

* Tailwind;
* Chakra UI;
* styled-components;
* Emotion;
* bibliotecas visuais pesadas sem decisão explícita.

## Objetivos

* Manter estilos próximos dos componentes.
* Evitar colisão global de classes.
* Preservar controle fino de CSS.
* Reduzir dependência de design systems externos.
* Criar uma base visual autoral e sustentável.

## Estrutura esperada

```txt
src/
  shared/
    styles/
      globals.css
      reset.css
      tokens.css

  shared/
    ui/
      button/
        button.tsx
        button.module.css
      card/
        card.tsx
        card.module.css

  features/
    garden/
      ui/
        text-post-card.tsx
        text-post-card.module.css
```

A extensão final pode ser `.module.css` ou `.module.scss`, conforme configuração do projeto.

Se não houver necessidade real de SCSS, prefira `.module.css`.

## Estilos globais

Estilos globais devem ser mínimos.

Uso permitido:

* reset/base;
* tokens CSS;
* estilos de `html` e `body`;
* tipografia base;
* variáveis globais;
* classes utilitárias realmente globais e raras.

Evitar:

* classes globais para componentes;
* estilos globais de página;
* regras específicas de feature;
* overrides globais sem necessidade.

## Tokens

Tokens globais devem usar CSS variables.

Exemplo:

```css
:root {
  --color-background: #ffffff;
  --color-foreground: #111111;
  --color-muted: #666666;

  --font-sans: system-ui, sans-serif;
  --font-mono: ui-monospace, monospace;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

Tokens devem representar decisões recorrentes, não todos os valores possíveis.

## CSS Modules

Cada componente relevante deve ter seu próprio arquivo de estilos.

Exemplo:

```txt
text-post-card.tsx
text-post-card.module.css
```

Uso esperado:

```tsx
import styles from './text-post-card.module.css'

export function TextPostCard() {
  return <article className={styles.root}>...</article>
}
```

## Nomes de classes

Preferir nomes semânticos e curtos.

Exemplos:

```css
.root {}
.header {}
.title {}
.description {}
.meta {}
.actions {}
```

Evitar:

```css
.bigBlueTitle {}
.cardWithMarginAndBorder {}
```

A semântica deve representar a função do elemento, não apenas aparência.

## Composição de classes

Para múltiplas classes condicionais, usar helper simples como `cn`, se existir.

Exemplo:

```tsx
<div className={cn(styles.root, active && styles.active)} />
```

Se o projeto ainda não tiver helper, criar apenas quando houver necessidade real.

## Data attributes

Preferir `data-*` para variações de estado ou intenção visual.

Exemplo:

```tsx
<span className={styles.badge} data-stage={stage}>
  {label}
</span>
```

```css
.badge[data-stage='seed'] {}
.badge[data-stage='tree'] {}
```

Uso recomendado para:

* estado visual;
* variações de componente;
* status editorial;
* estágio de maturidade;
* tamanho;
* intenção.

## Variantes

Evitar criar muitos componentes para pequenas variações visuais.

Preferir props simples combinadas com `data-*`.

Exemplo:

```tsx
<Button intent="primary" size="md" />
```

```tsx
<button className={styles.root} data-intent={intent} data-size={size} />
```

## Responsividade

Usar media queries ou container queries quando fizer sentido.

Preferir container queries para componentes reutilizáveis que dependem do espaço disponível.

Exemplo:

```css
.root {
  container-type: inline-size;
}

@container (min-width: 40rem) {
  .content {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## Layout

Componentes de layout reutilizáveis devem ficar em `shared/layout` ou `shared/ui`.

Exemplos:

```txt
container/
section/
stack/
grid/
site-header/
site-footer/
```

Evitar duplicar regras de largura, espaçamento e grid em todas as páginas.

## Tipografia

Definir tipografia base globalmente.

Componentes podem ajustar:

* tamanho;
* peso;
* altura de linha;
* espaçamento;
* largura de leitura.

Páginas de leitura devem priorizar conforto.

Regras:

* largura de linha controlada;
* hierarquia clara de headings;
* espaçamento vertical consistente;
* bom contraste;
* estilos claros para código, citações e links.

## Temas

Tema claro pode ser o padrão inicial.

Tema escuro pode ser planejado, mas não é obrigatório no MVP.

Se houver tema escuro, usar CSS variables e atributo de tema.

Exemplo:

```css
:root {}

[data-theme='dark'] {}
```

Não espalhar lógica de tema por componentes.

## Imagens

Componentes com imagem devem prever fallback.

Regras:

* não quebrar layout sem imagem;
* usar proporção consistente quando necessário;
* evitar CLS em cards/listagens;
* tratar imagem como dado opcional.

## Estados de UI

Componentes devem prever estados comuns.

Exemplos:

* default;
* hover;
* focus-visible;
* disabled;
* loading;
* empty;
* active;
* selected.

Foco visível é obrigatório em elementos interativos.

## Acessibilidade visual

Regras:

* contraste adequado;
* foco visível;
* alvos clicáveis confortáveis;
* não depender apenas de cor para comunicar estado;
* respeitar `prefers-reduced-motion` quando houver animações.

## Animações

Animações devem ser sutis e opcionais.

Regras:

* evitar animações que atrapalhem leitura;
* usar transições simples;
* respeitar `prefers-reduced-motion`;
* não adicionar biblioteca de animação sem necessidade real.

## Estilos de conteúdo Notion

A renderização de blocos do Notion deve ter estilos próprios.

Exemplo:

```txt
features/garden/ui/notion-renderer/
  notion-renderer.tsx
  notion-renderer.module.css
```

Esse estilo deve cobrir:

* parágrafos;
* headings;
* listas;
* quotes;
* callouts;
* code blocks;
* imagens;
* bookmarks;
* embeds.

Não misturar estilos de renderização Notion com estilos globais do site inteiro.

## Organização por componente

Preferir co-localização:

```txt
component-name/
  component-name.tsx
  component-name.module.css
```

Para componentes muito simples, arquivo único pode ser aceitável, mas manter padrão consistente conforme o projeto crescer.

## O que evitar

* Tailwind.
* Chakra UI.
* CSS global para componentes.
* Classes globais genéricas sem controle.
* Estilos acoplados ao formato bruto do Notion.
* Valores mágicos repetidos.
* Muitas variações visuais sem necessidade.
* Animações pesadas.
* Dependência de biblioteca visual antes de necessidade real.

## Critério de sucesso

A arquitetura de estilos está correta quando:

* componentes têm estilos isolados;
* tokens globais são simples e úteis;
* páginas são legíveis;
* a UI tem identidade própria;
* variações usam `data-*` quando apropriado;
* CSS global permanece pequeno;
* novos componentes podem ser criados sem conflito visual ou estrutural.
