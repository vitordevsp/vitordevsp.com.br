# Notion CMS

Arquitetura da integração com Notion e referência das databases reais usadas como CMS editorial.

Modelos internos canônicos ficam em [`content-model.md`](content-model.md). Este documento cobre a camada de integração e o mapeamento Notion → modelo.

## Papel do Notion

CMS editorial do projeto. Armazena: textos do Jardim, projetos, vídeos, livros, referências culturais, viagens, cursos e metadados editoriais.

Notion **não** define arquitetura de UI.

## Fluxo

```txt
Notion API
  → integração server-only
  → mapper
  → modelo interno
  → UI
```

Componentes não recebem objetos brutos da API. Mudanças no Notion impactam principalmente mappers, não a UI.

## Estrutura da integração

```txt
src/integrations/notion/
  client.ts      cria e exporta cliente; server-only; usa token do ambiente
  queries.ts     chamadas reutilizáveis (database, página por ID, blocos, paginação)
  blocks.ts     fetch e preparo de blocos para renderização
  mappers/       converte dados brutos em modelos internos
  types.ts       tipos auxiliares da integração (não tipos de domínio)
```

Tipos de domínio ficam em `features/*/model`, não aqui.

## Variáveis de ambiente

Server-only:

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

Nomes finais podem mudar, mas devem ser explícitos.

## Segurança

* nunca `NEXT_PUBLIC_` em tokens;
* nunca expor token para Client Components;
* nunca logar token;
* nunca retornar resposta bruta com dados privados sem filtro;
* buscar apenas conteúdos públicos.

## Publicação vs maturidade

São conceitos distintos. Definições e tipos canônicos em [`content-model.md`](content-model.md). Resumo:

* **Publicação** decide se o item aparece publicamente.
* **Maturidade** descreve estágio editorial de conteúdo textual.

Um item pode ser público em estágio `seed`.

Queries públicas filtram por publicação. Mappers normalizam status do Notion para o modelo interno.

## Slugs

Todo conteúdo com página pública precisa de slug estável.

* preferir slug explícito vindo do Notion;
* não depender só do título;
* slug ausente é erro de conteúdo ou item não publicável;
* mudança de slug é decisão editorial.

## Datas

Mappers normalizam datas em formato serializável.

* `createdAt`: `Criado Em` / `Criado` / `created_time`;
* `updatedAt`: `Atualizado Em` / `Editado` / `last_edited_time`;
* `publishedAt`: `Publicado Em`.

Fallback documentado quando campo não existir.

## Imagens

Capas extraídas no mapper. Modelo interno expõe `coverImage` (ou equivalente) já normalizado. Componentes não conhecem `file`/`external` ou estrutura interna do Notion. UI tem fallback quando imagem ausente.

## Rich text

Tratado por camada dedicada. Não espalhar parsing em componentes genéricos. Renderizador ou mapper dedicado preserva links e tem fallback para texto simples.

## Blocos de página

Páginas de detalhe podem renderizar blocos. Blocos brutos podem existir só na camada de renderização específica.

Suporte inicial:

```txt
paragraph, heading_1, heading_2, heading_3,
bulleted_list_item, numbered_list_item,
quote, callout, code, image, divider, bookmark, embed
```

Blocos não suportados têm fallback seguro.

## Paginação

Centralizada em `integrations/notion`. Não espalhar loop em pages. Sem fetch sequencial profundo desnecessário.

## Cache e revalidação

Estratégia explícita: revalidação por tempo, páginas server-rendered, cache por função, revalidação manual. Decidir conforme necessidade real.

## Erros e fallback

Casos esperados:

* token ausente;
* database ID ausente;
* item sem slug;
* item não publicado;
* página não encontrada;
* bloco não suportado;
* imagem ausente;
* resposta incompleta.

UI recebe estado tratável, não exceção bruta.

## Relação com features

```txt
features/garden/api/get-text-posts.ts
  → integrations/notion
  → retorna TextPost[]
```

Evitar componente chamando cliente Notion direto.

## API routes

Não criar API routes para Notion por padrão. Server-side direto em Server Components ou funções server.

API route só com necessidade clara: webhook, revalidação manual, endpoint público específico, integração externa.

## O que evitar

* duas integrações Notion paralelas;
* sistema legacy;
* tokens no client;
* UI acoplada ao Notion bruto;
* mappers dentro de componentes;
* slug só por título sem controle;
* fetch recursivo profundo sem limite;
* API routes desnecessárias;
* tipos genéricos complexos cedo demais.

---

# Referência das databases

Estrutura conhecida das databases do Notion e mapeamento esperado para os modelos internos definidos em [`content-model.md`](content-model.md).

## Página raiz do CMS

| Campo                             | Valor                                                    |
| --------------------------------- | -------------------------------------------------------- |
| Título                            | Jardim Digital                                           |
| ID interno no documento de origem | `notion-1`                                               |
| URL                               | `https://www.notion.so/0d6915f493914098ba7a8e831d238e9e` |

## Bases conhecidas

| Base                                | Modelo interno | Área do site       | Prioridade  |
| ----------------------------------- | -------------- | ------------------ | ----------- |
| 🌳 Textos \| Cultivando             | `TextPost`     | `/jardim`          | Alta        |
| 🚄 Projetos                         | `Project`      | `/projetos`        | Alta        |
| 📽️ Videos \| Produzindo            | `Video`        | `/galeria/videos`  | Média       |
| 📚 Livros                           | `Book`         | `/galeria/livros`  | Média/baixa |
| 🏟️ Cultura                         | `CultureItem`  | `/galeria/cultura` | Baixa       |
| 🌎 Viagens & Lugares                | `Place`        | `/galeria/viagens` | Baixa       |
| 📚 Cursos                           | `Course`       | `/cursos`          | Média       |
| Padrões & Gists                     | `TextPost`     | `/jardim`          | Baixa       |

## Regras gerais de mapeamento

* `title` ← propriedade title da database;
* `description` ← `Descricao` / `Descrição` / `descricao` ou equivalente;
* `tags` ← `Tags` / `tags` / `Gêneros` ou equivalente, normalizado para `string[]`;
* `publishedAt` ← `Publicado Em`;
* `updatedAt` ← `Atualizado Em` / `Editado` / `last_edited_time`;
* `createdAt` ← `Criado Em` / `Criado` / `created_time`;
* `slug` ← propriedade explícita quando existir.

Se não houver slug explícito, item exige cautela antes de virar rota pública.

---

## 🌳 Textos | Cultivando

Conteúdo principal do Jardim. Inclui posts, ensaios, marcos, changelogs, notas, padrões e gists.

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/7e80757600484c1ea8d2613f57ee2ace` |
| Data source    | `collection://bcfd5b02-8ea5-494a-8429-a6003ba2bdd2`      |
| Modelo interno | `TextPost`                                               |
| Área do site   | `/jardim` e `/jardim/[slug]`                             |

### Propriedades conhecidas

| Propriedade     | Tipo Notion  | Uso esperado             |
| --------------- | ------------ | ------------------------ |
| `Nome`          | title        | Título do texto          |
| `Status`        | select       | Maturidade editorial     |
| `Wiki`          | select       | Categoria macro/editoria |
| `Tags`          | multi_select | Tags temáticas           |
| `Ano`           | select       | Ano editorial            |
| `Descricao`     | text         | Resumo curto             |
| `Publicado Em`  | date         | Data de publicação       |
| `Atualizado Em` | date         | Data de atualização      |
| `Criado Em`     | created_time | Data de criação          |

### Mapeamento de `Status` → `MaturityStage`

| Notion    | Modelo interno |
| --------- | -------------- |
| `Semente` | `seed`         |
| `Broto`   | `sprout`       |
| `Muda`    | `sapling`      |
| `Planta`  | `plant`        |
| `Arvore`  | `tree`         |

### Opções conhecidas de `Wiki`

`Site pessoal`, `Projetos`, `Blogando`, `A.I`, `UI/UX`, `My Finances`, `Desenvolvimento pessoal`, `Tecnologia`, `Monitor de treinos`, `Sociologia`, `Programação`, `Livros`, `Revisões de alinhamento`, `Reflexões`, `Marco digital`, `Changelog`, `Descobrindo o Brasil`, `Conceitos e Referencias`.

### Regras de mapeamento

* `Status` → `maturityStage` do `TextPost`.
* `Wiki` alimenta agrupamentos, filtros ou hubs.
* `Publicado Em` é usado para ordenação cronológica.
* `Publicado Em` ausente exige fallback documentado.
* Corpo do texto vem dos blocos da página Notion.

### Pendências

* Definir campo explícito de publicação pública.
* Definir fonte final do `slug`.
* Definir se `Wiki` determina `TextPostKind` ou se haverá campo dedicado.

---

## 🚄 Projetos

Vitrine e narrativa de projetos profissionais, pessoais, experimentais e produtos.

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/267af38adbb68054956fe7593f1f9cf6` |
| Data source    | `collection://267af38a-dbb6-8040-b7fe-000bed73ad32`      |
| Modelo interno | `Project`                                                |
| Área do site   | `/projetos` e `/projetos/[slug]`                         |

### Propriedades conhecidas

| Propriedade    | Tipo Notion  | Uso esperado            |
| -------------- | ------------ | ----------------------- |
| `Nome`         | title        | Nome do projeto         |
| `Status`       | status       | Status do projeto       |
| `Descricao`    | text         | Resumo do projeto       |
| `Tags`         | multi_select | Tags/categorias         |
| `Versão`       | text         | Versão atual            |
| `Publicado Em` | date         | Data pública/lançamento |

### Mapeamento de `Status` → `ProjectStatus`

| Notion          | Modelo interno  |
| --------------- | --------------- |
| `Não iniciada`  | `concept`       |
| `Em andamento`  | `active`        |
| `Concluído`     | `completed`     |

### Regras de mapeamento

* `Versão` pode alimentar badge visual.
* `Publicado Em` é data de lançamento.
* Página de detalhe pode usar blocos da página Notion.

### Pendências

* Definir campo de slug.
* Definir propriedades para repositório, stack, papel do autor, URL pública, links relacionados.
* Definir campo explícito de publicação pública.

---

## 📽️ Videos | Produzindo

Catálogo editorial de vídeos, da ideia até publicação.

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/255af38adbb680479d6ef30b1f106358` |
| Data source    | `collection://255af38a-dbb6-8130-8d2e-000bee916e70`      |
| Modelo interno | `Video`                                                  |
| Área do site   | `/galeria/videos`                                        |

### Propriedades conhecidas

| Propriedade     | Tipo Notion  | Uso esperado         |
| --------------- | ------------ | -------------------- |
| `Name`          | title        | Título do vídeo      |
| `Status`        | status       | Pipeline editorial   |
| `Playlist`      | select       | Agrupamento/editoria |
| `Tags`          | multi_select | Tags temáticas       |
| `Ano`           | select       | Ano editorial        |
| `Publicado Em`  | date         | Data de publicação   |
| `Atualizado Em` | date         | Data de atualização  |
| `Descrição`     | text         | Resumo               |

Opções conhecidas de `Status`: `Ideia`, `Semente`, `Brotando`, `Escrevendo`, `Publicado`.

### Regras de mapeamento

* `Playlist` alimenta filtros ou agrupamento.
* Apenas itens com `Status = Publicado` aparecem publicamente, salvo decisão contrária.
* URL externa ainda não é propriedade conhecida — se vier no corpo, criar extração específica só quando necessário.

### Pendências

* Adicionar ou identificar campo `videoUrl`.
* Definir slug público se houver página de detalhe.
* Definir regra final de publicação pública.

---

## 📚 Livros

Biblioteca, tracking de leitura e referências.

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/39299fc53b3647af907aa51cd5b50bd6` |
| Data source    | `collection://f088675d-0c72-4381-ad7a-726255510d86`      |
| Modelo interno | `Book`                                                   |
| Área do site   | `/galeria/livros`                                        |

### Propriedades conhecidas

| Propriedade   | Tipo Notion      | Uso esperado          |
| ------------- | ---------------- | --------------------- |
| `Name`        | title            | Título do livro       |
| `Autor`       | text             | Autor                 |
| `State`       | select           | Estado de leitura     |
| `Tags`        | multi_select     | Categorias ou temas   |
| `Descrição`   | text             | Resumo/comentário     |
| `Indice`      | number           | Ordem/ranking interno |
| `Inicio`      | date             | Início da leitura     |
| `Finalização` | date             | Fim da leitura        |
| `Criado`      | created_time     | Data de criação       |
| `Editado`     | last_edited_time | Última edição         |

### Mapeamento de `State` → `BookStatus`

| Notion        | Modelo interno |
| ------------- | -------------- |
| `Finalizado`  | `read`         |
| `Lendo`       | `reading`      |
| `Pesquisar`   | `reference`    |
| `Fila`        | `to-read`      |

### Regras de mapeamento

* `Indice` é usado para ordenação manual.
* Notas extensas sobre livros viram `TextPost`, não inflam `Book`.

### Pendências

* Definir se livros terão página própria.
* Definir campo de publicação pública.
* Definir capa/imagem.

---

## 🏟️ Cultura

Catálogo curado de referências culturais (filmes, séries, animes, álbuns).

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/201af38adbb68022bc16cdfd4e468c09` |
| Data source    | `collection://201af38a-dbb6-80d9-95c9-000b17936575`      |
| Modelo interno | `CultureItem`                                            |
| Área do site   | `/galeria/cultura`                                       |

### Propriedades conhecidas

| Propriedade | Tipo Notion  | Uso esperado       |
| ----------- | ------------ | ------------------ |
| `Nome`      | title        | Nome do item       |
| `Tipo`      | select       | Tipo de mídia      |
| `Status`    | status       | Estado de consumo  |
| `Gêneros`   | multi_select | Gêneros/categorias |
| `Descrição` | text         | Resumo/comentário  |
| `URL`       | url          | Referência externa |

### Mapeamento de `Tipo` → `CultureKind`

| Notion   | Modelo interno |
| -------- | -------------- |
| `filme`  | `movie`        |
| `serie`  | `series`       |
| `anime`  | `series`       |
| `album`  | `album`        |

### Opções de `Status`

`Assistir`, `Assistindo`, `Assistido` → mapear conforme necessidade.

### Regras de mapeamento

* `Tipo` alimenta agrupamentos internos.
* `URL` aponta para referência externa.
* Curadoria obrigatória; não criar dump automático.

### Pendências

* Definir se cultura terá página própria.
* Definir regra de publicação pública.
* Definir se músicas, jogos e podcasts entram como novas opções de `Tipo`.

---

## 🌎 Viagens & Lugares

Registros de lugares, viagens e experiências.

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/203af38adbb680d2a840ecb5c5ba49cf` |
| Data source    | `collection://203af38a-dbb6-80c8-83a8-000b3cbede1e`      |
| Modelo interno | `Place`                                                  |
| Área do site   | `/galeria/viagens`                                       |

### Propriedades conhecidas

| Propriedade | Tipo Notion | Uso esperado         |
| ----------- | ----------- | -------------------- |
| `Nome`      | title       | Nome do lugar/viagem |

### Regras de mapeamento

* Schema atual é mínimo.
* Não implementar seção robusta sem enriquecer a base.
* Curadoria autoral obrigatória.

### Pendências

* Definir campos de localização, datas, imagens.
* Definir slug e publicação pública.

---

## 📚 Cursos

Catálogo de cursos, produtos educacionais e iniciativas futuras.

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/265af38adbb680fc97c6e61b13805570` |
| Data source    | `collection://265af38a-dbb6-80bc-b78c-000bb5a1a37e`      |
| Modelo interno | `Course`                                                 |
| Área do site   | `/cursos` e `/cursos/[slug]`                             |

### Propriedades conhecidas

| Propriedade | Tipo Notion  | Uso esperado    |
| ----------- | ------------ | --------------- |
| `Nome`      | title        | Nome do curso   |
| `Status`    | status       | Estado do curso |
| `descricao` | text         | Descrição       |
| `tags`      | multi_select | Tags            |

### Mapeamento de `Status` → `CourseStatus`

| Notion         | Modelo interno |
| -------------- | -------------- |
| `Not started`  | `planned`      |
| `In progress`  | `building`     |
| `Done`         | `available`    |

### Regras de mapeamento

* Cursos podem começar como páginas simples.
* Sem plataforma de cursos no MVP.
* Sem pagamento, autenticação ou área logada sem ADR.

### Pendências

* Definir slug.
* Definir regra de publicação pública.
* Definir campo de lista de espera, se necessário.
* Definir se cursos terão página de detalhe no primeiro ciclo.

---

## Padrões & Gists

Espaço previsto para padrões de desenvolvimento, prompts, skills, snippets e gists.

| Campo                   | Valor                                                    |
| ----------------------- | -------------------------------------------------------- |
| Página                  | `https://www.notion.so/336af38adbb68083aaa9e64596b9f742` |
| Tipo                    | Subpage                                                  |
| Modelo interno provável | `TextPost`                                               |
| Área provável           | `/jardim`                                                |

Página atualmente em branco no documento de origem.

### Regras

* Tratar como `TextPost` com `kind = pattern` ou `kind = gist`.
* Modelo separado só com comportamento específico.

### Pendências

* Definir se haverá database própria.
* Definir propriedades.
* Definir relação com `TextPostKind`.

---

## Pendências gerais

Campos recomendados para padronizar nas databases com página pública:

* `Slug`;
* `Publicar` ou `Publicação`;
* `Destaque`;
* `Capa`;
* `URL externa` quando aplicável;
* `Conteúdos relacionados`;
* `Tipo` para textos, se `Wiki` não for suficiente;
* `Resumo` padronizado.

Decisões abertas:

* qual campo define publicação pública em cada database;
* como slugs serão gerenciados;
* quais bases terão páginas de detalhe;
* como relações entre conteúdos serão representadas;
* como imagens/capas serão extraídas;
* como blocos Notion serão renderizados por tipo.
