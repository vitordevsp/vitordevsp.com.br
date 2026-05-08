# Modelo de Conteúdo

Este documento define os principais modelos de conteúdo do `site-vitorsampaio`.

O objetivo é criar uma camada conceitual estável entre o Notion e a interface pública do site. A aplicação deve consumir dados do Notion, normalizar esses dados em modelos internos e renderizar componentes com base nesses modelos, não com base direta no formato bruto da API do Notion.

## Princípio central

Nem todo conteúdo do site é um post.

Todo texto autoral publicado no Jardim deve ser tratado como `TextPost`, mas o site também possui outros tipos de conteúdo, como projetos, vídeos, livros, referências culturais, viagens e cursos.

```txt
Notion database/page/block
  → mapper de integração
  → modelo interno da aplicação
  → componente de UI
```

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

`ContentItem` é um conceito guarda-chuva, não necessariamente uma interface obrigatória no código inicial.

A implementação pode criar tipos separados por domínio, desde que preserve a separação entre modelo interno e dados brutos do Notion.

## Campos editoriais comuns

Sempre que fizer sentido, modelos públicos podem compartilhar campos editoriais comuns.

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
}
```

Esses campos não precisam existir em todos os modelos desde o início. Eles servem como referência de normalização.

## Status de publicação

Status de publicação responde à pergunta:

> Este conteúdo pode aparecer publicamente no site?

```ts
type PublicationStatus =
  | 'draft'
  | 'public'
  | 'archived'
```

### Valores

| Valor      | Uso                                                        |
| ---------- | ---------------------------------------------------------- |
| `draft`    | Conteúdo ainda privado ou não pronto para exibição pública |
| `public`   | Conteúdo disponível no site                                |
| `archived` | Conteúdo preservado, mas removido do fluxo editorial ativo |

`PublicationStatus` não deve ser confundido com maturidade editorial.

## Estágio de maturidade

Maturidade responde à pergunta:

> Qual é o nível de desenvolvimento deste conteúdo?

```ts
type MaturityStage =
  | 'seed'
  | 'sprout'
  | 'sapling'
  | 'plant'
  | 'tree'
```

### Valores

| Valor     | Nome editorial | Significado                                              |
| --------- | -------------- | -------------------------------------------------------- |
| `seed`    | Semente        | Ideia inicial, nota curta, registro bruto ou hipótese    |
| `sprout`  | Broto          | Ideia com algum desenvolvimento, mas ainda incompleta    |
| `sapling` | Muda           | Conteúdo estruturado, com direção clara, ainda evoluindo |
| `plant`   | Planta         | Conteúdo maduro, útil e publicável como referência       |
| `tree`    | Árvore         | Conteúdo consolidado, denso, central ou canônico         |

A maturidade deve ser visível na experiência do Jardim.

Um conteúdo pode ser público e ainda estar em estágio `seed` ou `sprout`, desde que essa condição esteja clara para o visitante.

## TextPost

`TextPost` representa conteúdo textual autoral publicado no Jardim.

Rota principal:

```txt
/jardim/[slug]
```

### Função

Representar textos, notas, ideias, ensaios, registros e padrões autorais em diferentes níveis de maturidade.

### Tipos de TextPost

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
```

### Valores

| Valor       | Uso                                                           |
| ----------- | ------------------------------------------------------------- |
| `note`      | Nota curta, registro inicial ou fragmento                     |
| `insight`   | Percepção pontual com algum valor conceitual                  |
| `post`      | Texto técnico ou reflexivo com estrutura de publicação        |
| `essay`     | Texto mais longo, argumentativo ou conceitual                 |
| `milestone` | Marco de projeto, carreira, estudo ou trajetória              |
| `changelog` | Registro de evolução de projeto, produto ou processo          |
| `pattern`   | Padrão recorrente, solução reutilizável ou referência prática |
| `gist`      | Recorte técnico curto, snippet explicado ou microdocumentação |

### Modelo interno sugerido

```ts
type TextPost = ContentBase & {
  type: 'text-post'
  kind: TextPostKind
  publicationStatus: PublicationStatus
  maturityStage: MaturityStage
  readingTime?: number
  relatedContentIds?: string[]
  notionPageId?: string
}
```

### Regras

* Todo conteúdo textual autoral público deve pertencer ao Jardim.
* `TextPost` deve ser renderizado a partir de modelo interno, não de objeto bruto do Notion.
* O conteúdo pode ter corpo renderizado a partir dos blocos do Notion.
* Maturidade e tipo devem aparecer na UI quando ajudarem o leitor.
* Links relacionados podem ser manuais no MVP.

## Project

`Project` representa projetos profissionais, pessoais, open source, produtos, experimentos ou estudos aplicados.

Rotas principais:

```txt
/projetos
/projetos/[slug]
```

### Função

Exibir projetos com contexto suficiente para funcionar como portfólio e registro de evolução.

### Modelo interno sugerido

```ts
type Project = ContentBase & {
  type: 'project'
  status?: ProjectStatus
  category?: ProjectCategory
  role?: string
  stack?: string[]
  repositoryUrl?: string
  liveUrl?: string
  relatedContentIds?: string[]
  notionPageId?: string
}
```

### Status sugerido

```ts
type ProjectStatus =
  | 'active'
  | 'paused'
  | 'completed'
  | 'archived'
  | 'concept'
```

### Categorias sugeridas

```ts
type ProjectCategory =
  | 'professional'
  | 'personal'
  | 'open-source'
  | 'experiment'
  | 'product'
  | 'study'
```

### Regras

* Projetos devem comunicar problema, contexto, papel do autor e aprendizados.
* Cards de projeto não devem depender apenas de stack ou links.
* Projetos podem se conectar a textos do Jardim, vídeos, cursos e referências.
* Projetos relevantes podem ter página de detalhe.

## Video

`Video` representa vídeos publicados, referenciados ou destacados pelo autor.

Rotas principais:

```txt
/galeria/videos
```

### Função

Organizar conteúdo audiovisual sem misturar com textos do Jardim.

### Modelo interno sugerido

```ts
type Video = ContentBase & {
  type: 'video'
  platform?: 'youtube' | 'vimeo' | 'other'
  videoUrl: string
  thumbnailUrl?: string
  duration?: number
  relatedContentIds?: string[]
  notionPageId?: string
}
```

### Regras

* Vídeos podem complementar posts e projetos.
* A listagem pode começar simples.
* O site não precisa hospedar vídeo; pode apontar para plataforma externa.

## Book

`Book` representa livros lidos, em leitura, recomendados ou usados como referência.

Rota principal:

```txt
/galeria/livros
```

### Função

Registrar repertório e referências que influenciam ideias, textos e projetos.

### Modelo interno sugerido

```ts
type Book = ContentBase & {
  type: 'book'
  author?: string
  status?: BookStatus
  startedAt?: string
  finishedAt?: string
  rating?: number
  relatedContentIds?: string[]
  notionPageId?: string
}
```

### Status sugerido

```ts
type BookStatus =
  | 'to-read'
  | 'reading'
  | 'read'
  | 'abandoned'
  | 'reference'
```

### Regras

* Livros podem se conectar a textos, ensaios e temas.
* A área pode começar como referência simples.
* Notas extensas sobre livros podem virar `TextPost` no Jardim.

## CultureItem

`CultureItem` representa referências culturais como filmes, séries, músicas, álbuns, jogos ou outras mídias.

Rota principal:

```txt
/galeria/cultura
```

### Função

Organizar repertório cultural de forma curada, sem transformar o site em rede social ou catálogo genérico.

### Modelo interno sugerido

```ts
type CultureItem = ContentBase & {
  type: 'culture-item'
  kind?: CultureKind
  creator?: string
  year?: number
  externalUrl?: string
  relatedContentIds?: string[]
  notionPageId?: string
}
```

### Tipos sugeridos

```ts
type CultureKind =
  | 'movie'
  | 'series'
  | 'music'
  | 'album'
  | 'game'
  | 'podcast'
  | 'other'
```

### Regras

* Referências culturais devem ter curadoria mínima.
* Cultura pode se conectar a textos e reflexões.
* Não deve virar uma listagem automática sem contexto.

## Place

`Place` representa viagens, lugares visitados, registros geográficos ou experiências associadas a locais.

Rota principal:

```txt
/galeria/viagens
```

### Função

Registrar experiências e observações relacionadas a lugares.

### Modelo interno sugerido

```ts
type Place = ContentBase & {
  type: 'place'
  location?: string
  country?: string
  city?: string
  visitedAt?: string
  images?: string[]
  relatedContentIds?: string[]
  notionPageId?: string
}
```

### Regras

* Lugares podem se conectar a textos, fotos e reflexões.
* A área pode ser implementada em fase posterior.
* O foco deve ser curadoria autoral, não catálogo turístico.

## Course

`Course` representa cursos, produtos educacionais, trilhas ou iniciativas de ensino.

Rotas principais:

```txt
/cursos
/cursos/[slug]
```

### Função

Apresentar iniciativas educacionais do autor, mesmo que inicialmente estejam em desenvolvimento ou lista de espera.

### Modelo interno sugerido

```ts
type Course = ContentBase & {
  type: 'course'
  status?: CourseStatus
  audience?: string
  price?: string
  waitlistUrl?: string
  modules?: CourseModule[]
  relatedContentIds?: string[]
  notionPageId?: string
}

type CourseModule = {
  title: string
  description?: string
  lessons?: string[]
}
```

### Status sugerido

```ts
type CourseStatus =
  | 'idea'
  | 'planned'
  | 'building'
  | 'waitlist'
  | 'available'
  | 'archived'
```

### Regras

* Cursos podem começar como páginas simples.
* Não criar plataforma de cursos própria no MVP.
* Não implementar autenticação, pagamento ou área logada sem decisão explícita.
* Cursos podem se conectar a posts, projetos e trilhas.

## Relações entre conteúdos

O site deve permitir conexão entre conteúdos, mesmo que inicialmente de forma manual.

Modelo conceitual:

```ts
type RelatedContent = {
  id: string
  type: ContentType
  title: string
  slug: string
}
```

Tipos possíveis:

```ts
type ContentType =
  | 'text-post'
  | 'project'
  | 'video'
  | 'book'
  | 'culture-item'
  | 'place'
  | 'course'
```

### Regras

* Relações podem ser informadas no Notion.
* Relações podem começar como links manuais no corpo do conteúdo.
* Backlinks automáticos não são requisito inicial.
* Grafos de conteúdo não são requisito inicial.
* Busca semântica não é requisito inicial.

## Tags e temas

Tags devem ajudar descoberta e conexão.

Elas não devem virar taxonomia excessivamente rígida no início.

### Regras

* Tags podem ser compartilhadas entre modelos.
* Tags devem ser strings normalizadas no modelo interno.
* Categorias devem ser usadas quando houver semântica mais forte que tag.
* Evite criar múltiplos campos que representem a mesma ideia.

## Datas

Datas devem ser tratadas com consistência.

Campos possíveis:

```ts
type ContentDates = {
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}
```

### Regras

* `createdAt` representa criação do registro ou conteúdo.
* `updatedAt` representa última atualização relevante.
* `publishedAt` representa publicação pública.
* Quando Notion não fornecer algum campo, a aplicação pode ter fallback documentado.
* Não misturar atualização técnica com atualização editorial sem necessidade.

## Slugs

Todo conteúdo público com página própria deve ter slug estável.

### Regras

* Slug deve vir preferencialmente do Notion.
* Slug não deve depender exclusivamente do título.
* Mudanças de slug devem ser tratadas como decisão editorial.
* Não gerar URLs frágeis a partir de IDs ou títulos sem normalização.

## Capas e imagens

Imagens podem vir do Notion ou de URLs externas.

### Regras

* O modelo interno deve expor imagem já normalizada para a UI.
* Componentes não devem conhecer detalhes de extração de imagem do Notion.
* Conteúdo sem imagem deve ter fallback visual definido na UI.

## Relação com Notion

O Notion pode ter databases separadas para diferentes modelos.

A estrutura real das bases deve ser documentada em:

```txt
docs/reference/notion-databases.md
```

Este documento define o modelo conceitual da aplicação. O documento de referência define como os dados existem no Notion.

## Regras de implementação

* Não renderizar UI diretamente a partir de objetos brutos do Notion.
* Criar mappers entre Notion e modelos internos.
* Manter tipos internos pequenos, legíveis e orientados ao domínio.
* Evitar abstrações genéricas antes de haver necessidade real.
* Tratar diferenças entre databases no nível da integração.
* Preservar clareza entre publicação, maturidade, tipo e categoria.

## Critério de sucesso

O modelo de conteúdo será bem-sucedido quando:

* cada área do site souber quais dados consome;
* a UI usar modelos internos previsíveis;
* mudanças no Notion não vazarem diretamente para componentes;
* conteúdos puderem evoluir sem quebrar a arquitetura;
* o Jardim conseguir representar ideias em diferentes níveis de maturidade;
* projetos, vídeos, livros, cultura, viagens e cursos existirem sem serem forçados dentro de `post`.
