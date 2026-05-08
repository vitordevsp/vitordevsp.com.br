# Arquitetura Notion CMS

Este documento define como o `site-vitorsampaio` deve integrar com o Notion.

## Papel do Notion

O Notion é o CMS editorial do projeto.

Ele armazena:

* textos do Jardim;
* projetos;
* vídeos;
* livros;
* referências culturais;
* viagens;
* cursos;
* metadados editoriais.

O Notion não deve definir diretamente a arquitetura da UI.

## Regra central

A aplicação deve seguir este fluxo:

```txt
Notion API
  → integração server-only
  → mapper
  → modelo interno
  → UI
```

Componentes não devem receber objetos brutos da API do Notion.

## Local esperado da integração

```txt
src/integrations/notion/
  client.ts
  queries.ts
  blocks.ts
  mappers/
  types.ts
```

A estrutura pode evoluir, mas a integração deve continuar isolada.

## Responsabilidades

### `client.ts`

Responsável por criar e exportar o cliente Notion.

Regras:

* server-only;
* usa token de ambiente;
* não expõe segredo ao client;
* não contém lógica de domínio.

### `queries.ts`

Responsável por chamadas reutilizáveis à API do Notion.

Exemplos:

* buscar itens de database;
* buscar página por ID;
* buscar blocos de página;
* lidar com paginação.

### `blocks.ts`

Responsável por buscar e preparar blocos do Notion.

Uso esperado:

* recuperar blocos filhos;
* lidar com blocos aninhados, se necessário;
* preparar dados para renderização de conteúdo.

Evitar fetch recursivo excessivo sem necessidade.

### `mappers/`

Responsável por converter dados do Notion em modelos internos.

Exemplos:

```txt
mappers/text-post.mapper.ts
mappers/project.mapper.ts
mappers/video.mapper.ts
mappers/book.mapper.ts
mappers/course.mapper.ts
```

### `types.ts`

Responsável por tipos auxiliares da integração.

Não deve concentrar todos os tipos do produto.

Tipos de domínio devem ficar nas features correspondentes.

## Modelos internos

A UI deve trabalhar com modelos internos, como:

* `TextPost`;
* `Project`;
* `Video`;
* `Book`;
* `CultureItem`;
* `Place`;
* `Course`.

Referência conceitual:

```txt
docs/product/content-model.md
```

## Databases Notion

As databases reais devem ser documentadas em:

```txt
docs/reference/notion-databases.md
```

Esse documento deve registrar:

* nome da database;
* finalidade;
* propriedades relevantes;
* relação com modelo interno;
* páginas que consomem os dados;
* observações de mapeamento.

## Variáveis de ambiente

Variáveis sensíveis devem existir apenas no servidor.

Exemplos esperados:

```txt
NOTION_TOKEN
NOTION_DATABASE_TEXTS_ID
NOTION_DATABASE_PROJECTS_ID
NOTION_DATABASE_VIDEOS_ID
NOTION_DATABASE_BOOKS_ID
NOTION_DATABASE_CULTURE_ID
NOTION_DATABASE_PLACES_ID
NOTION_DATABASE_COURSES_ID
```

Os nomes finais podem mudar, mas devem ser explícitos.

## Regras de segurança

* Nunca usar `NEXT_PUBLIC_` em tokens do Notion.
* Nunca expor token para Client Components.
* Nunca logar token.
* Nunca retornar resposta bruta contendo dados privados sem filtro.
* Buscar apenas conteúdos marcados como públicos.

## Status público

A aplicação deve diferenciar publicação de maturidade.

### Publicação

Define se o conteúdo aparece no site:

```ts
type PublicationStatus = 'draft' | 'public' | 'archived'
```

### Maturidade

Define estágio editorial:

```ts
type MaturityStage =
  | 'seed'
  | 'sprout'
  | 'sapling'
  | 'plant'
  | 'tree'
```

Um conteúdo pode ser público e ainda estar em estágio inicial.

## Filtros obrigatórios

Queries públicas devem filtrar conteúdo publicado.

Regra esperada:

```txt
Só renderizar publicamente itens com publicationStatus = public
```

Se a database do Notion usar nomes diferentes, o mapper deve normalizar.

## Slugs

Todo conteúdo com página pública deve ter slug estável.

Regras:

* preferir slug explícito vindo do Notion;
* não depender apenas do título;
* não gerar slug frágil sem fallback;
* tratar slug ausente como erro de conteúdo ou item não publicável.

## Datas

Campos esperados nos modelos internos:

```ts
type ContentDates = {
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}
```

Regras:

* manter datas em formato serializável;
* normalizar datas no mapper;
* UI não deve interpretar estrutura bruta do Notion;
* usar fallback documentado quando necessário.

## Imagens

Capas e imagens devem ser normalizadas antes da UI.

Regras:

* extrair URL no mapper;
* fornecer `coverImage` ou campo equivalente no modelo interno;
* componente deve ter fallback quando não houver imagem;
* não deixar componente conhecer detalhes de `file`, `external` ou estrutura interna do Notion.

## Rich text

Rich text do Notion deve ser tratado por camada específica.

Regras:

* não espalhar parsing de rich text em componentes genéricos;
* criar renderizador ou mapper dedicado;
* preservar links quando possível;
* manter fallback para textos simples.

## Blocos de página

Páginas de detalhe podem precisar renderizar blocos do Notion.

Regras:

* blocos brutos podem existir na camada de renderização específica;
* não passar blocos brutos para componentes que não renderizam conteúdo Notion;
* suportar inicialmente os blocos mais usados;
* blocos não suportados devem ter fallback seguro.

## Blocos iniciais suportados

Prioridade inicial:

* paragraph;
* heading_1;
* heading_2;
* heading_3;
* bulleted_list_item;
* numbered_list_item;
* quote;
* callout;
* code;
* image;
* divider;
* bookmark;
* embed.

A lista pode evoluir conforme uso real.

## Paginação

A API do Notion pode retornar dados paginados.

Regras:

* centralizar paginação em `integrations/notion`;
* não espalhar loop de paginação em pages;
* evitar fetch sequencial profundo sem necessidade;
* documentar decisões de performance quando surgirem.

## Cache e revalidação

Estratégia de cache deve ser explícita.

Possibilidades:

* revalidação por tempo;
* páginas dinâmicas server-rendered;
* cache por função;
* revalidação manual futura.

Não escolher estratégia complexa antes de validar necessidade.

## Erros e fallback

A integração deve tratar falhas previsíveis.

Casos esperados:

* token ausente;
* database ID ausente;
* item sem slug;
* item não publicado;
* página não encontrada;
* bloco não suportado;
* imagem ausente;
* resposta incompleta da API.

A UI deve receber estado tratável, não exceções brutas sem contexto.

## Relação com features

Features devem consumir funções orientadas ao domínio.

Exemplo:

```txt
features/garden/api/get-text-posts.ts
  → integrations/notion
  → retorna TextPost[]
```

Evitar:

```txt
component.tsx
  → Notion client direto
```

## API routes

Não criar API routes para Notion por padrão.

Use server-side direto em Server Components ou funções chamadas no servidor.

API routes só devem existir quando houver necessidade clara, como:

* webhook futuro;
* revalidação manual;
* endpoint público específico;
* integração externa.

## O que evitar

* Duas integrações Notion paralelas.
* Sistema legacy.
* Tokens no client.
* UI acoplada ao Notion bruto.
* Mappers dentro de componentes.
* Slug gerado apenas por título sem controle.
* Fetch recursivo profundo sem limite.
* API routes desnecessárias.
* Tipos genéricos complexos cedo demais.

## Critério de sucesso

A integração está correta quando:

* Notion é acessado apenas no servidor;
* secrets ficam protegidos;
* dados públicos são filtrados corretamente;
* UI recebe modelos internos;
* mudanças no Notion impactam principalmente mappers;
* páginas conseguem renderizar conteúdo real;
* blocos não suportados não quebram a aplicação.
