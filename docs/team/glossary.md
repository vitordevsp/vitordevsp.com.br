# Glossário

## RSC (React Server Component)

Componente React executado inteiramente no servidor. Neste projeto, todas as pages sao RSC assincronos — eles buscam dados do Notion diretamente no servidor e nao enviam JavaScript de data fetching para o cliente.

## Sistema moderno Notion

Refere-se a integracao em `src/lib/notion/`, que usa `@notionhq/client` com tipagem generica via `EnsureNotionPropertiesSchema`. E o sistema preferido para funcionalidades novas.

## Sistema legacy Notion

Refere-se ao sistema em `src/app/api/notion/_resources/`, que usa uma abordagem menos tipada e esta em processo de migracao para o sistema moderno.

## Slug de post

Identificador URL de um post no formato `titulo-do-post-{notionId}`. O `notionId` e extraido via `generateNotionPageID()` e usado para buscar a pagina no Notion.

## PageRenderer

Componente em `src/lib/notion/components/PageRenderer/` que recebe um array de blocos Notion e renderiza em JSX. Suporta paragrafos, headings, listas, codigo, imagens, toggles e callouts.

## RichTextRender

Componente/funcao em `src/lib/notion/components/RichTextRender/` que converte um array de `NotionRichTextNode` em React elements, respeitando anotacoes como bold, italic, strikethrough, code e links.

## NotionPropertiesSchema

Tipo generico que mapeia nomes de propriedades Notion para seus tipos correspondentes. Usado como parametro de tipo em `getDatabaseItems<T>()` e `getPageById<T>()`.

## EnsureNotionPropertiesSchema

Utilitario de tipo que valida e garante que um schema de propriedades esteja correto. Usado na declaracao de schemas como `PostProps`.

## frames/

Pasta `src/components/frames/` que contem componentes de layout maior e cards compostos: `PageHeader`, `PageFooter`, `BlogPostCard`, `ProjectCard`, `VideoCard`, etc.

## shared/

Pasta `src/components/shared/` que contem primitivos reutilizaveis: `Heading`, `Paragraph`, `Tag`, `Icon`, `Flexbox`, `LinkWithIcon`, etc.

## Jardim digital

Conceito em evolucao para o site, inspirado em `maggieappleton.com`. A ideia e organizar o conteudo com estagios de maturidade (semente → arvore) e filtros por categoria, transformando o site em um espaco de aprendizado publico e continuo.
