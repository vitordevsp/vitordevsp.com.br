# Modelo de conteúdo

Tipos canônicos da aplicação. Camada conceitual estável entre Notion e UI pública.

A aplicação consome dados do Notion, normaliza em modelos internos via mapper e renderiza UI a partir desses modelos. UI não consome objetos brutos da API.

```txt
Notion database/page/block
  → mapper de integração
  → modelo interno da aplicação
  → componente de UI
```

Mapeamento real Notion → modelo fica em [`notion.md`](notion.md).

## Princípio central

Nem todo conteúdo do site é um post. Todo texto autoral publicado no Jardim é `TextPost`. Outros tipos têm modelos próprios (`Project`, `Video`, `Book`, `CultureItem`, `Place`, `Course`).

## Modelos principais

```txt
ContentItem
  ├── TextPost
  ├── Project
  ├── Video
  ├── Book
  ├── CultureItem
  ├── Place
  └── Course
```

`ContentItem` é conceito guarda-chuva, não interface obrigatória.

## Campos comuns

Referência de normalização. Campos específicos por modelo abaixo.

```ts
type ContentBase = {
  id: string
  title: string
  slug: string
  description?: string
  excerpt?: string
  coverImage?: string
  tags: string[]
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  sourceUrl?: string
  notionPageId?: string
}
```

## Publicação vs maturidade

Conceitos distintos.

**Publicação** — o conteúdo aparece no site?

```ts
type PublicationStatus = 'draft' | 'public' | 'archived'
```

| Valor      | Uso                                                  |
| ---------- | ---------------------------------------------------- |
| `draft`    | Conteúdo privado, não pronto para exibição pública.  |
| `public`   | Conteúdo disponível no site.                         |
| `archived` | Preservado, removido do fluxo editorial ativo.       |

**Maturidade** — qual o nível de desenvolvimento do conteúdo textual?

```ts
type MaturityStage = 'seed' | 'sprout' | 'sapling' | 'plant' | 'tree'
```

| Valor     | Editorial | Significado                                              |
| --------- | --------- | -------------------------------------------------------- |
| `seed`    | Semente   | Ideia inicial, nota curta, registro bruto.               |
| `sprout`  | Broto     | Ideia com algum desenvolvimento, ainda incompleta.       |
| `sapling` | Muda      | Conteúdo estruturado, direção clara, ainda evoluindo.    |
| `plant`   | Planta    | Maduro, útil e publicável como referência.               |
| `tree`    | Árvore    | Consolidado, denso, central ou canônico.                 |

Maturidade deve ser visível no Jardim. Um item pode ser `public` em estágio `seed`.

## TextPost

Conteúdo textual autoral publicado no Jardim. Rota: `/jardim/[slug]`.

```ts
type TextPostKind =
  | 'note'
  | 'insight'
  | 'post'
  | 'essay'
  | 'milestone'
  | 'changelog'
  | 'pattern'
  | 'gist'

type TextPost = ContentBase & {
  type: 'text-post'
  kind: TextPostKind
  publicationStatus: PublicationStatus
  maturityStage: MaturityStage
  wiki?: string
  year?: string
  readingTime?: number
  relatedContentIds?: string[]
}
```

| `kind`      | Uso                                                               |
| ----------- | ----------------------------------------------------------------- |
| `note`      | Nota curta, registro inicial, fragmento.                          |
| `insight`   | Percepção pontual com valor conceitual.                           |
| `post`      | Texto técnico ou reflexivo com estrutura de publicação.           |
| `essay`     | Texto mais longo, argumentativo ou conceitual.                    |
| `milestone` | Marco de projeto, carreira, estudo ou trajetória.                 |
| `changelog` | Registro de evolução de projeto, produto ou processo.             |
| `pattern`   | Padrão recorrente, solução reutilizável, referência prática.      |
| `gist`      | Recorte técnico curto, snippet explicado, microdocumentação.      |

### Regras

* todo conteúdo textual autoral público pertence ao Jardim;
* renderização vem do modelo interno, não do objeto bruto do Notion;
* corpo do texto vem dos blocos da página Notion;
* `kind` e `maturityStage` aparecem na UI quando ajudarem o leitor;
* `wiki` (categoria macro vinda do Notion) pode alimentar agrupamentos e hubs;
* links relacionados podem ser manuais no MVP.

## Project

Projetos profissionais, pessoais, open source, produtos, experimentos e estudos aplicados. Rotas: `/projetos`, `/projetos/[slug]`.

```ts
type ProjectStatus =
  | 'active'
  | 'paused'
  | 'completed'
  | 'archived'
  | 'concept'

type ProjectCategory =
  | 'professional'
  | 'personal'
  | 'open-source'
  | 'experiment'
  | 'product'
  | 'study'

type Project = ContentBase & {
  type: 'project'
  status?: ProjectStatus
  category?: ProjectCategory
  role?: string
  stack?: string[]
  version?: string
  repositoryUrl?: string
  liveUrl?: string
  relatedContentIds?: string[]
}
```

### Regras

* projetos comunicam problema, contexto, papel do autor e aprendizados;
* cards de projeto não dependem só de stack ou links;
* projetos podem se conectar a textos do Jardim, vídeos, cursos e referências;
* projetos relevantes podem ter página de detalhe.

## Video

Vídeos publicados, referenciados ou destacados pelo autor. Rota: `/galeria/videos`.

```ts
type Video = ContentBase & {
  type: 'video'
  platform?: 'youtube' | 'vimeo' | 'other'
  videoUrl?: string
  thumbnailUrl?: string
  duration?: number
  playlist?: string
  year?: string
  status?: string
  relatedContentIds?: string[]
}
```

### Regras

* vídeos podem complementar posts e projetos;
* listagem pode começar simples;
* site não hospeda vídeo; aponta para plataforma externa.

## Book

Livros lidos, em leitura, recomendados ou usados como referência. Rota: `/galeria/livros`.

```ts
type BookStatus =
  | 'to-read'
  | 'reading'
  | 'read'
  | 'abandoned'
  | 'reference'

type Book = ContentBase & {
  type: 'book'
  author?: string
  status?: BookStatus
  startedAt?: string
  finishedAt?: string
  rating?: number
  index?: number
  relatedContentIds?: string[]
}
```

### Regras

* livros podem se conectar a textos, ensaios e temas;
* área pode começar como referência simples;
* notas extensas sobre livros viram `TextPost` no Jardim.

## CultureItem

Referências culturais — filmes, séries, animes, álbuns, músicas, jogos, podcasts. Rota: `/galeria/cultura`.

```ts
type CultureKind =
  | 'movie'
  | 'series'
  | 'music'
  | 'album'
  | 'game'
  | 'podcast'
  | 'other'

type CultureItem = ContentBase & {
  type: 'culture-item'
  kind?: CultureKind
  creator?: string
  year?: number
  externalUrl?: string
  relatedContentIds?: string[]
}
```

### Regras

* curadoria mínima obrigatória;
* cultura pode se conectar a textos e reflexões;
* não vira listagem automática sem contexto.

## Place

Viagens, lugares visitados, registros geográficos. Rota: `/galeria/viagens`.

```ts
type Place = ContentBase & {
  type: 'place'
  location?: string
  country?: string
  city?: string
  visitedAt?: string
  images?: string[]
  relatedContentIds?: string[]
}
```

### Regras

* lugares podem se conectar a textos, fotos e reflexões;
* área implementada em fase posterior;
* foco em curadoria autoral, não catálogo turístico.

## Course

Cursos, produtos educacionais, trilhas, iniciativas de ensino. Rotas: `/cursos`, `/cursos/[slug]`.

```ts
type CourseStatus =
  | 'idea'
  | 'planned'
  | 'building'
  | 'waitlist'
  | 'available'
  | 'archived'

type CourseModule = {
  title: string
  description?: string
  lessons?: string[]
}

type Course = ContentBase & {
  type: 'course'
  status?: CourseStatus
  audience?: string
  price?: string
  waitlistUrl?: string
  modules?: CourseModule[]
  relatedContentIds?: string[]
}
```

### Regras

* cursos podem começar como páginas simples;
* sem plataforma de cursos própria no MVP;
* sem autenticação, pagamento ou área logada sem decisão explícita;
* cursos podem se conectar a posts, projetos e trilhas.

## Relações entre conteúdos

```ts
type ContentType =
  | 'text-post'
  | 'project'
  | 'video'
  | 'book'
  | 'culture-item'
  | 'place'
  | 'course'

type RelatedContent = {
  id: string
  type: ContentType
  title: string
  slug: string
}
```

### Regras

* relações podem ser informadas no Notion;
* links manuais no corpo são suficientes no MVP;
* backlinks automáticos, grafos e busca semântica são evoluções futuras.

## Tags e temas

* compartilhadas entre modelos;
* strings normalizadas;
* categorias usadas quando houver semântica mais forte que tag;
* evitar múltiplos campos para a mesma ideia.

## Datas

```ts
type ContentDates = {
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}
```

* `createdAt`: criação do registro/conteúdo;
* `updatedAt`: última atualização relevante;
* `publishedAt`: publicação pública;
* fallback documentado quando Notion não fornecer campo;
* não misturar atualização técnica com editorial sem necessidade.

## Slugs

* preferir slug explícito do Notion;
* não depender só do título;
* mudança de slug é decisão editorial;
* não gerar URLs frágeis a partir de ID ou título sem normalização.

## Capas e imagens

* modelo interno expõe imagem já normalizada para UI;
* componente não conhece detalhes de extração do Notion;
* conteúdo sem imagem tem fallback visual na UI.

## Regras de implementação

* não renderizar UI direto a partir de objeto bruto do Notion;
* criar mappers entre Notion e modelos internos;
* tipos internos pequenos, legíveis, orientados ao domínio;
* sem abstrações genéricas antes de necessidade real;
* preservar distinção entre publicação, maturidade, tipo e categoria.
