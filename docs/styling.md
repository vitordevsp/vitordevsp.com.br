# Estilos

Padrão de estilização do `site-vitorsampaio`. Decisão e alternativas em [ADR-005](decisions/ADR-005-css-modules.md).

## Padrão

CSS Modules. Estilos co-localizados ao componente.

```txt
text-post-card.tsx
text-post-card.module.css
```

Extensão final: `.module.css`. SCSS apenas com necessidade real.

## Estrutura

```txt
src/
  shared/
    styles/
      globals.css
      reset.css
      tokens.css
    ui/
      button/
        button.tsx
        button.module.css
  features/
    garden/
      ui/
        text-post-card.tsx
        text-post-card.module.css
```

## Estilos globais

Permitido:

* reset/base;
* tokens CSS;
* estilos de `html`/`body`;
* tipografia base;
* variáveis globais;
* utilitários globais raros.

Evitar:

* classes globais para componentes;
* estilos de página inteira sem necessidade;
* regras específicas de feature;
* overrides amplos.

## Tokens

CSS variables. Representam decisões recorrentes, não todos os valores possíveis.

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

## Uso de CSS Modules

```tsx
import styles from './text-post-card.module.css'

export function TextPostCard() {
  return <article className={styles.root}>...</article>
}
```

## Nomes de classes

Semânticos e curtos. Representam função, não aparência.

```css
.root {}
.header {}
.title {}
.description {}
.meta {}
.actions {}
```

Evitar `.bigBlueTitle`, `.cardWithMarginAndBorder`.

## Composição

Helper simples (`cn`) para múltiplas classes condicionais. Criar só com necessidade real.

```tsx
<div className={cn(styles.root, active && styles.active)} />
```

## Data attributes

`data-*` para variações de estado ou intenção visual.

```tsx
<span className={styles.badge} data-stage={stage}>{label}</span>
```

```css
.badge[data-stage='seed'] {}
.badge[data-stage='tree'] {}
```

Uso recomendado: estado visual, variações de componente, status editorial, maturidade, tamanho, intenção.

## Variantes

Props simples + `data-*`. Evitar múltiplos componentes para pequenas variações visuais.

```tsx
<Button intent="primary" size="md" />
```

```tsx
<button className={styles.root} data-intent={intent} data-size={size} />
```

## Responsividade

Media queries ou container queries. Preferir container queries para componentes reutilizáveis que dependem do espaço disponível.

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

Componentes de layout reutilizáveis em `shared/layout` ou `shared/ui`:

```txt
container, section, stack, grid, site-header, site-footer
```

Evitar duplicar regras de largura, espaçamento e grid por página.

## Tipografia

Base global. Componentes ajustam tamanho, peso, altura de linha, espaçamento e largura de leitura.

Páginas de leitura priorizam:

* largura de linha controlada;
* hierarquia clara de headings;
* espaçamento vertical consistente;
* contraste alto;
* estilos para código, citações e links.

## Temas

Tema claro como padrão inicial. Tema escuro planejado mas não obrigatório no MVP.

```css
:root {}
[data-theme='dark'] {}
```

Sem espalhar lógica de tema por componentes.

## Imagens

* fallback obrigatório;
* proporção consistente quando necessário;
* evitar CLS em cards/listagens;
* imagem é dado opcional.

## Estados de UI

Prever: `default`, `hover`, `focus-visible`, `disabled`, `loading`, `empty`, `active`, `selected`.

Foco visível obrigatório em elementos interativos.

## Acessibilidade visual

* contraste adequado;
* foco visível;
* alvos clicáveis confortáveis;
* sem depender só de cor para estado;
* respeitar `prefers-reduced-motion`.

## Animações

Sutis e opcionais. Evitar animações que atrapalhem leitura. Sem biblioteca de animação sem necessidade real.

## Estilos de conteúdo Notion

Renderizador de blocos tem estilos próprios:

```txt
features/garden/ui/notion-renderer/
  notion-renderer.tsx
  notion-renderer.module.css
```

Cobre: parágrafos, headings, listas, quotes, callouts, code blocks, imagens, bookmarks, embeds.

Sem misturar com estilos globais do site.

## Co-localização

```txt
component-name/
  component-name.tsx
  component-name.module.css
```

Arquivo único aceitável para componentes muito simples. Padrão consistente conforme projeto crescer.
