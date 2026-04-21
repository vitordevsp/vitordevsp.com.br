# Specs — PageRenderer

## Objetivo

Traduzir um array de blocks do Notion (formato cru da API) em JSX pronto para exibição em página web. É o renderizador principal de conteúdo de posts e páginas do blog.

## Responsabilidades

- Percorrer a lista de blocks na ordem recebida e emitir JSX equivalente.
- Agrupar itens de lista adjacentes (`bulleted_list_item`/`numbered_list_item`) num único `<ul>`/`<ol>`, já que o Notion devolve um block por item.
- Renderizar recursivamente os filhos (`__children`) de blocks que têm sub-conteúdo — toggles, listas com sub-itens, callouts com conteúdo, headings toggleable, to_do com sub-itens.
- Permitir que o consumidor substitua o JSX de qualquer tipo de block via `overrides`.

## Entradas

| Prop | Tipo | Descrição |
|---|---|---|
| `blocks` | `BaseBlock[]` | Array vindo de `getAllBlockChildren`. Para suportar children, deve ter sido chamado com `{ deep: true }`. |
| `overrides` | `Partial<Record<string, (block, ctx) => ReactNode>>` | Mapa de tipo de block → render customizado. `ctx` expõe `renderBlocks` e `richTextRender`. |

## Saída

Um `<article>` com classe do CSS Module local (`style.rendered`), contendo os blocks renderizados.

## Tipos suportados

Cada um tem render dedicado:

| Tipo | Saída |
|---|---|
| `paragraph` | `<p>` com rich text; quando vazio vira `<p style="height: 8px">` (serve de espaçador). |
| `heading_1` / `heading_2` / `heading_3` | `<h1>`/`<h2>`/`<h3>`. Se `is_toggleable`, envolve em `<details><summary>`. |
| `bulleted_list_item` | `<li>` dentro de `<ul>` agrupado. |
| `numbered_list_item` | `<li>` dentro de `<ol>` agrupado. |
| `quote` | `<blockquote>`. |
| `callout` | `<div role="note">` com borda esquerda; renderiza ícone emoji se houver. |
| `code` | `<figure><pre><code data-lang="...">` + `<figcaption>` se houver caption. |
| `image` | `<figure><img>` + `<figcaption>`. Suporta `external` e `file`. URLs `file` têm `expiry_time` e devem ser renovadas em caches longos. |
| `divider` | `<hr>`. |
| `to_do` | `<div>` com `<input type="checkbox" readOnly>` + label. |
| `toggle` | `<details><summary>`. |

### Tipos não suportados (fallback silencioso)

Caem em `<div data-notion-unknown="<tipo>">` vazio, sem erro:

`audio`, `bookmark`, `breadcrumb`, `child_database`, `child_page`, `column_list`/`column`, `embed`, `equation`, `file`, `link_preview`, `mention` (block-level), `pdf`, `synced_block`, `table`, `table_of_contents`, `tab`, `template`, `transcription`, `video`, `unsupported`.

Se um desses passar a aparecer no conteúdo real, cobrir adicionando um `case` no `switch` de `Block` ou via `override` pontual.

## Agrupamento de listas

Blocks de lista adjacentes do mesmo tipo viram um único container:

```
[bullet A, bullet B, bullet C, paragraph X, bullet D]
  →
<ul>A, B, C</ul>
<p>X</p>
<ul>D</ul>
```

A troca de tipo (bullet → numbered) quebra o grupo. Blocks que não são de lista interrompem o agrupamento.

## Renderização de filhos

Blocks com conteúdo aninhado esperam `block.__children` populado antes de chegar aqui. Isso é responsabilidade do fetch — `getAllBlockChildren(pageId, { deep: true })` varre a árvore e preenche.

Dentro do renderer, qualquer `block.__children?.length` dispara uma chamada recursiva de `BlockList`, que aplica o mesmo agrupamento de listas no nível de dentro. Isso permite, por exemplo, listas dentro de toggles dentro de callouts.

## Overrides

O `overrides` recebe um mapa `{ [tipoDeBlock]: (block, ctx) => ReactNode }` que tem prioridade sobre o render default.

O `ctx` permite reaproveitar os dois componentes internos:

```tsx
<PageRenderer blocks={blocks} overrides={{
  code: (block, ctx) => (
    <MyPrismHighlighter language={block.code.language}>
      {block.code.rich_text.map(n => n.plain_text).join("")}
    </MyPrismHighlighter>
  ),
  image: (block, ctx) => <NextImageWrapper block={block} caption={ctx.richTextRender(block.image.caption)} />,
}} />
```

Override em tipos de lista (`bulleted_list_item`, `numbered_list_item`) substitui só o conteúdo do `<li>` — o `<ul>`/`<ol>` continua sendo gerenciado pelo agrupador.

## Regras importantes

- O renderer **não busca nada** — espera `blocks` prontos.
- URLs de imagem `file` **expiram**. Se a página for SSG/ISR com revalidação longa, considerar override para re-fetch ou usar CDN intermediária.
- O renderer **não aplica segurança extra** em links — delega `target="_blank" rel="noopener noreferrer"` ao `RichTextRender`.
- Render **não envolve `Suspense`** nem faz fallback de loading. É síncrono por design; qualquer loading pertence ao chamador.

## Não pertence a este componente

- Buscar blocks da API (responsabilidade de `features/blocks`).
- Renderizar trecho de rich text inline com annotations (responsabilidade de `RichTextRender`).
- Aplicar syntax highlighting em blocks de código — é override do consumidor.
- Transformar blocks em outro formato (markdown, plain text, etc.).

## Dependências

- `../RichTextRender/index` — consumido para renderizar qualquer rich text dentro dos blocks.
- `./style.module.css` — classe `.rendered` no `<article>`.

## Referências

- [Catálogo oficial de blocks do Notion](../../../../../docs/resources/notion-docs/reference/block.md)
- [README da lib](../../README.md)
- [PLAN-002](../../../../../docs/plans/PLAN-002-refactor-notion/README.md) — decisões em aberto que afetam este componente, incluindo a possibilidade de substituir parte da pipeline pelo endpoint `retrieve-page-markdown`.
