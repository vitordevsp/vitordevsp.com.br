# Notion Databases

Este documento registra as bases do Notion usadas como CMS editorial do `site-vitorsampaio`.

Ele descreve a estrutura conhecida das databases, seus campos principais e o mapeamento esperado para os modelos internos da aplicação.

## Regra central

O Notion é fonte editorial.

A aplicação deve consumir dados do Notion no servidor, normalizar por mapper e entregar modelos internos para a UI.

```txt
Notion database
  → integrations/notion
  → mapper por modelo
  → modelo interno
  → feature/UI
```

Componentes comuns não devem receber objetos brutos da API do Notion.

## Página raiz do CMS

| Campo                             | Valor                                                    |
| --------------------------------- | -------------------------------------------------------- |
| Título                            | Jardim Digital                                           |
| ID interno no documento de origem | `notion-1`                                               |
| URL                               | `https://www.notion.so/0d6915f493914098ba7a8e831d238e9e` |

## Bases conhecidas

| Base                    | Modelo interno                 | Área do site       | Prioridade  |
| ----------------------- | ------------------------------ | ------------------ | ----------- |
| 🌳 Textos | Cultivando  | `TextPost`                     | `/jardim`          | Alta        |
| 🚄 Projetos             | `Project`                      | `/projetos`        | Alta        |
| 📽️ Videos | Produzindo | `Video`                        | `/galeria/videos`  | Média       |
| 📚 Livros               | `Book`                         | `/galeria/livros`  | Média/baixa |
| 🏟️ Cultura             | `CultureItem`                  | `/galeria/cultura` | Baixa       |
| 🌎 Viagens & Lugares    | `Place`                        | `/galeria/viagens` | Baixa       |
| 📚 Cursos               | `Course`                       | `/cursos`          | Média       |
| Padrões & Gists         | `TextPost` ou submodelo futuro | `/jardim`          | Baixa       |

## Contrato comum esperado

Sempre que possível, itens vindos do Notion devem ser normalizados para campos comuns.

```ts
type NotionContentBase = {
  id: string
  title: string
  slug?: string
  type: string
  description?: string
  tags: string[]
  publishedAt?: string
  updatedAt?: string
  createdAt?: string
  notionPageId: string
}
```

Esse contrato é referência. Cada modelo interno pode ter campos próprios.

## Regras gerais de mapeamento

* `title` deve vir da propriedade title da database.
* `description` deve vir de `Descricao`, `Descrição`, `descricao` ou equivalente.
* `tags` deve normalizar `Tags`, `tags`, `Gêneros` ou campos equivalentes.
* `publishedAt` deve vir de `Publicado Em`, quando existir.
* `updatedAt` deve vir de `Atualizado Em`, `Editado` ou `last_edited_time`, quando existir.
* `createdAt` deve vir de `Criado Em`, `Criado` ou `created_time`, quando existir.
* `slug` deve vir de propriedade explícita quando existir.
* Se não houver slug explícito, o item deve ser tratado com cautela antes de virar rota pública.

## Publicação vs maturidade

Não misturar status de publicação com maturidade editorial.

### Publicação

Define se o item pode aparecer no site.

```ts
type PublicationStatus = 'draft' | 'public' | 'archived'
```

### Maturidade

Define estágio do conteúdo textual.

```ts
type MaturityStage =
  | 'seed'
  | 'sprout'
  | 'sapling'
  | 'plant'
  | 'tree'
```

Na base de Textos, o campo `Status` representa maturidade do jardim, não necessariamente publicação.

Se o Notion não tiver campo claro de publicação, a regra pública precisa ser definida antes da implementação final.

---

# 🌳 Textos | Cultivando

## Finalidade

Conteúdo principal do Jardim Digital.

Inclui posts, ensaios, marcos, changelogs, notas, padrões, gists e textos em geral.

## Identificação

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/7e80757600484c1ea8d2613f57ee2ace` |
| Data source    | `collection://bcfd5b02-8ea5-494a-8429-a6003ba2bdd2`      |
| Modelo interno | `TextPost`                                               |
| Área do site   | `/jardim` e `/jardim/[slug]`                             |

## Propriedades conhecidas

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

## Opções de `Status`

| Notion    | Modelo interno |
| --------- | -------------- |
| `Semente` | `seed`         |
| `Broto`   | `sprout`       |
| `Muda`    | `sapling`      |
| `Planta`  | `plant`        |
| `Arvore`  | `tree`         |

## Opções conhecidas de `Wiki`

* `Site pessoal`
* `Projetos`
* `Blogando`
* `A.I`
* `UI/UX`
* `My Finances`
* `Desenvolvimento pessoal`
* `Tecnologia`
* `Monitor de treinos`
* `Sociologia`
* `Programação`
* `Livros`
* `Revisões de alinhamento`
* `Reflexões`
* `Marco digital`
* `Changelog`
* `Descobrindo o Brasil`
* `Conceitos e Referencias`

## Mapeamento sugerido

```ts
type TextPost = {
  id: string
  title: string
  slug: string
  description?: string
  kind?: TextPostKind
  maturityStage: MaturityStage
  wiki?: string
  tags: string[]
  year?: string
  publishedAt?: string
  updatedAt?: string
  createdAt?: string
  notionPageId: string
}
```

## Regras

* `Status` deve aparecer na UI como maturidade do conteúdo.
* `Wiki` pode alimentar agrupamentos, filtros ou hubs.
* `Publicado Em` deve ser usado para ordenação cronológica quando existir.
* Se `Publicado Em` não existir, usar fallback documentado.
* Slug precisa ser definido antes de rota pública estável.
* Conteúdo do corpo deve vir dos blocos da página Notion.

## Pendências

* Definir campo explícito de publicação pública, caso ainda não exista.
* Definir fonte final do `slug`.
* Definir se `Wiki` também determina `TextPostKind` ou se haverá campo específico para tipo.

---

# 🚄 Projetos

## Finalidade

Vitrine e narrativa de projetos profissionais, pessoais, experimentais ou produtos.

## Identificação

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/267af38adbb68054956fe7593f1f9cf6` |
| Data source    | `collection://267af38a-dbb6-8040-b7fe-000bed73ad32`      |
| Modelo interno | `Project`                                                |
| Área do site   | `/projetos` e `/projetos/[slug]`                         |

## Propriedades conhecidas

| Propriedade    | Tipo Notion  | Uso esperado            |
| -------------- | ------------ | ----------------------- |
| `Nome`         | title        | Nome do projeto         |
| `Status`       | status       | Status do projeto       |
| `Descricao`    | text         | Resumo do projeto       |
| `Tags`         | multi_select | Tags/categorias         |
| `Versão`       | text         | Versão atual            |
| `Publicado Em` | date         | Data pública/lançamento |

## Opções conhecidas de `Status`

* `Não iniciada`
* `Em andamento`
* `Concluído`

## Mapeamento sugerido

```ts
type Project = {
  id: string
  title: string
  slug: string
  description?: string
  status?: 'not-started' | 'in-progress' | 'completed'
  tags: string[]
  version?: string
  publishedAt?: string
  notionPageId: string
}
```

## Regras

* `Versão` pode alimentar badge visual.
* `Publicado Em` pode ser usado como data de lançamento quando fizer sentido.
* Projetos devem comunicar contexto, não apenas stack.
* Página de detalhe pode usar blocos da página Notion.

## Pendências

* Definir campo de slug.
* Definir se haverá URL pública, repositório, stack, papel do autor e links relacionados como propriedades próprias.
* Definir campo explícito de publicação pública.

---

# 📽️ Videos | Produzindo

## Finalidade

Catálogo editorial de vídeos, da ideia até publicação.

## Identificação

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/255af38adbb680479d6ef30b1f106358` |
| Data source    | `collection://255af38a-dbb6-8130-8d2e-000bee916e70`      |
| Modelo interno | `Video`                                                  |
| Área do site   | `/galeria/videos`                                        |

## Propriedades conhecidas

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

## Opções conhecidas de `Status`

* `Ideia`
* `Semente`
* `Brotando`
* `Escrevendo`
* `Publicado`

## Mapeamento sugerido

```ts
type Video = {
  id: string
  title: string
  slug?: string
  description?: string
  status?: string
  playlist?: string
  tags: string[]
  year?: string
  videoUrl?: string
  publishedAt?: string
  updatedAt?: string
  notionPageId: string
}
```

## Regras

* `Playlist` pode alimentar filtros ou agrupamento.
* Apenas vídeos publicados devem aparecer publicamente, salvo decisão contrária.
* URL do YouTube/Vimeo ainda não aparece como propriedade conhecida.
* Se a URL estiver no corpo da página, criar extração específica só quando necessário.

## Pendências

* Adicionar ou identificar campo `videoUrl`.
* Definir slug público, se houver página de detalhe.
* Definir regra final de publicação pública.

---

# 📚 Livros

## Finalidade

Biblioteca, tracking de leitura e referências para a Galeria.

## Identificação

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/39299fc53b3647af907aa51cd5b50bd6` |
| Data source    | `collection://f088675d-0c72-4381-ad7a-726255510d86`      |
| Modelo interno | `Book`                                                   |
| Área do site   | `/galeria/livros`                                        |

## Propriedades conhecidas

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

## Opções conhecidas de `State`

* `Finalizado`
* `Lendo`
* `Pesquisar`
* `Fila`

## Mapeamento sugerido

```ts
type Book = {
  id: string
  title: string
  description?: string
  author?: string
  state?: 'finished' | 'reading' | 'research' | 'queue'
  tags: string[]
  index?: number
  startedAt?: string
  finishedAt?: string
  createdAt?: string
  updatedAt?: string
  notionPageId: string
}
```

## Regras

* `State` pode alimentar filtros como lendo, finalizados e fila.
* `Indice` pode ser usado para ordenação manual.
* Notas extensas sobre livros devem virar `TextPost`, não inflar `Book`.

## Pendências

* Definir se livros terão página própria.
* Definir campo de publicação pública.
* Definir capa/imagem, se necessário.

---

# 🏟️ Cultura

## Finalidade

Catálogo curado de referências culturais.

Inclui filmes, séries, animes, álbuns e mídias similares.

## Identificação

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/201af38adbb68022bc16cdfd4e468c09` |
| Data source    | `collection://201af38a-dbb6-80d9-95c9-000b17936575`      |
| Modelo interno | `CultureItem`                                            |
| Área do site   | `/galeria/cultura`                                       |

## Propriedades conhecidas

| Propriedade | Tipo Notion  | Uso esperado       |
| ----------- | ------------ | ------------------ |
| `Nome`      | title        | Nome do item       |
| `Tipo`      | select       | Tipo de mídia      |
| `Status`    | status       | Estado de consumo  |
| `Gêneros`   | multi_select | Gêneros/categorias |
| `Descrição` | text         | Resumo/comentário  |
| `URL`       | url          | Referência externa |

## Opções conhecidas de `Tipo`

* `filme`
* `serie`
* `anime`
* `album`

## Opções conhecidas de `Status`

* `Assistir`
* `Assistindo`
* `Assistido`

## Mapeamento sugerido

```ts
type CultureItem = {
  id: string
  title: string
  description?: string
  kind?: 'movie' | 'series' | 'anime' | 'album'
  status?: 'to-watch' | 'watching' | 'watched'
  genres: string[]
  externalUrl?: string
  notionPageId: string
}
```

## Regras

* `Tipo` pode alimentar agrupamentos internos.
* `URL` deve apontar para referência externa.
* A área deve ser curada, não dump automático sem contexto.

## Pendências

* Definir se cultura terá página própria.
* Definir regra de publicação pública.
* Definir se músicas/jogos/podcasts entram aqui ou em novas opções de `Tipo`.

---

# 🌎 Viagens & Lugares

## Finalidade

Registros de lugares, viagens e experiências relacionadas a locais.

## Identificação

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/203af38adbb680d2a840ecb5c5ba49cf` |
| Data source    | `collection://203af38a-dbb6-80c8-83a8-000b3cbede1e`      |
| Modelo interno | `Place`                                                  |
| Área do site   | `/galeria/viagens`                                       |

## Propriedades conhecidas

| Propriedade | Tipo Notion | Uso esperado         |
| ----------- | ----------- | -------------------- |
| `Nome`      | title       | Nome do lugar/viagem |

## Mapeamento sugerido

```ts
type Place = {
  id: string
  title: string
  slug?: string
  description?: string
  location?: string
  country?: string
  city?: string
  visitedAt?: string
  images?: string[]
  notionPageId: string
}
```

## Regras

* Schema atual é mínimo.
* Não implementar seção robusta sem enriquecer a base.
* Conteúdo deve ter curadoria autoral.

## Pendências

* Definir campos de localização.
* Definir campos de data.
* Definir imagens/fotos.
* Definir slug e publicação pública.

---

# 📚 Cursos

## Finalidade

Catálogo de cursos, produtos educacionais, trilhas ou iniciativas futuras.

## Identificação

| Campo          | Valor                                                    |
| -------------- | -------------------------------------------------------- |
| Database       | `https://www.notion.so/265af38adbb680fc97c6e61b13805570` |
| Data source    | `collection://265af38a-dbb6-80bc-b78c-000bb5a1a37e`      |
| Modelo interno | `Course`                                                 |
| Área do site   | `/cursos` e `/cursos/[slug]`                             |

## Propriedades conhecidas

| Propriedade | Tipo Notion  | Uso esperado    |
| ----------- | ------------ | --------------- |
| `Nome`      | title        | Nome do curso   |
| `Status`    | status       | Estado do curso |
| `descricao` | text         | Descrição       |
| `tags`      | multi_select | Tags            |

## Opções conhecidas de `Status`

* `Not started`
* `In progress`
* `Done`

## Mapeamento sugerido

```ts
type Course = {
  id: string
  title: string
  slug?: string
  description?: string
  status?: 'not-started' | 'in-progress' | 'done'
  tags: string[]
  waitlistUrl?: string
  notionPageId: string
}
```

## Regras

* Cursos podem começar como páginas simples.
* Não implementar plataforma de cursos no MVP.
* Não implementar pagamento, autenticação ou área logada sem ADR.
* Lista de espera é requisito possível, mas ainda não aparece como propriedade conhecida.

## Pendências

* Definir slug.
* Definir regra de publicação pública.
* Definir campo de lista de espera, se necessário.
* Definir se cursos terão página de detalhe no primeiro ciclo.

---

# Padrões & Gists

## Finalidade

Espaço previsto para padrões de desenvolvimento, prompts, skills, agents, snippets e gists.

## Identificação

| Campo                   | Valor                                                    |
| ----------------------- | -------------------------------------------------------- |
| Página                  | `https://www.notion.so/336af38adbb68083aaa9e64596b9f742` |
| Tipo                    | Subpage                                                  |
| Modelo interno provável | `TextPost` ou modelo futuro                              |
| Área provável           | `/jardim`                                                |

## Estado atual

Página aparentemente em branco no documento de origem.

## Regras

* Não criar modelo separado sem necessidade real.
* Preferir tratar padrões e gists como `TextPost` com `kind = pattern` ou `kind = gist`.
* Separar em modelo próprio apenas se houver comportamento específico.

## Pendências

* Definir se haverá database própria.
* Definir propriedades.
* Definir relação com `TextPostKind`.

---

# Pendências gerais de CMS

## Campos recomendados para avaliar no Notion

Para conteúdos com página pública, considerar adicionar ou padronizar:

* `Slug`;
* `Publicar` ou `Publicação`;
* `Destaque`;
* `Capa`;
* `URL externa` quando aplicável;
* `Conteúdos relacionados`;
* `Tipo` para textos, se `Wiki` não for suficiente;
* `Resumo` padronizado.

## Decisões pendentes

* Qual campo define publicação pública em cada database.
* Como slugs serão gerenciados.
* Quais bases terão páginas de detalhe.
* Como relações entre conteúdos serão representadas.
* Como imagens/capas serão extraídas.
* Como blocos Notion serão renderizados por tipo.

## Critério de sucesso

A referência de databases está correta quando:

* cada base tem finalidade clara;
* cada base aponta para modelo interno esperado;
* propriedades relevantes estão documentadas;
* diferenças de status/maturidade não são confundidas;
* pendências ficam explícitas;
* a implementação consegue criar mappers sem depender de interpretação implícita.
