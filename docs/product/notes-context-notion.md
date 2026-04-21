# product_story — vitorsampaio.com.br (Jardim Digital + CMS no Notion)

> Este arquivo descreve a história do produto, sua visão e decisões de IA/arquitetura de informação para servir como **contexto de repositório** (Codex/LLM).
> O site é um **Jardim Digital** público alimentado por uma base no Notion que funciona como **CMS**.

---

## 1) História do produto (narrativa)

O vitorsampaio.com.br começou como um site para centralizar projetos, vídeos e artigos. Com o tempo, o objetivo deixou de ser apenas “portfólio” e passou a ser construir um espaço próprio na internet, onde ideias e aprendizados possam existir e amadurecer no longo prazo.[^https://www.notion.so/9ccf1e20868b477bb20a51d6fad22a97]

Em 23/11/2023, enquanto trabalhava na v3 do site e buscava referências de portfólios, Vitor esbarrou no conceito de **Digital Garden**. A ideia de um espaço de conhecimento vivo, navegável por hyperlinks e com textos em evolução, destravou uma mudança importante: não seria mais um blog tradicional com “posts finalizados”, mas sim um jardim onde publicar pode ser incremental.[^https://www.notion.so/5fb7f57f523c4631983bb30c1b8bca34]

O Notion passa a ser entendido como o **jardim privado** (onde as ideias são plantadas, organizadas e cultivadas) e o site como o **jardim público** (onde parte desse conteúdo é exposta com intencionalidade). Esse processo de manutenção, reorganização, revisita e conexão entre notas é chamado de **jardinagem digital**.[^https://www.notion.so/201af38adbb68054aac3de0de2ca7adf]

Durante um período de férias focado em projetos pessoais, a pesquisa sobre jardim digital, segundo cérebro, aprender em público e gestão do conhecimento se intensifica. Desse período surgem decisões estruturais: criar textos que conectam outros textos, definir formatos (como *changelog* e *marcos*), e evoluir a integração Notion → site para transformar o Notion em base publicável (CMS).[^https://www.notion.so/277af38adbb68092be99f834bb01e30d]

---

## 2) Visão do produto

### Visão
Transformar vitorsampaio.com.br em um **Jardim Digital**: um espaço que acumula conhecimento ao longo do tempo, com navegação não linear e textos em diferentes estágios de maturidade.

### Promessa para quem visita
- Encontrar ideias e aprendizados reais, não apenas “resultados finais”.
- Navegar por temas seguindo curiosidade e links, como uma teia de conhecimento.
- Entender o contexto por meio de páginas “hub” que conectam assuntos (marcos).

### Promessa para quem constrói
- Reduzir o bloqueio do perfeccionismo, aumentando consistência de escrita e produção.[^https://www.notion.so/258af38adbb68007b61fef9821076430]
- Criar uma identidade digital com continuidade histórica (anos).
- Usar o ato de publicar como reforço de aprendizado (aprender em público).

---

## 3) Core loop (como o produto funciona)

1. **Capturar**: ideias, referências e rascunhos entram no Notion (Segundo Cérebro / Jardim Digital).
2. **Cultivar (jardinagem digital)**: revisar, organizar, reescrever, conectar, manter vivo.
3. **Publicar incrementalmente**: permitir rascunhos públicos com transparência de maturidade.
4. **Conectar por links**: cada texto pode apontar para outros, formando caminhos.

Esse ciclo é reforçado por formatos como **Changelog** e **Marco Digital**.[^https://www.notion.so/258af38adbb68007b61fef9821076430][^https://www.notion.so/25aaf38adbb68077a7a5f365c63f4f63]

---

## 4) Princípios de conteúdo e UX (regras do jardim)

### 4.1) Maturidade visível (status do texto é parte do produto)
O site deve apresentar sinalização clara do estágio do conteúdo:
- semente
- broto
- muda
- planta
- árvore

Isso não é só metadado. É UX e “contrato” com o leitor: o conteúdo pode estar em evolução.[^https://www.notion.so/336af38adbb68021af93ed0c36a7ce91]

### 4.2) Marcos como hubs (navegação por história + sumário)
**Marco Digital** é um formato central: um texto que funciona como fio condutor e índice narrativo, conectando ramificações que detalham o tema.[^https://www.notion.so/25aaf38adbb68077a7a5f365c63f4f63]

### 4.3) Construir em público como mecanismo de consistência
O formato **Changelog** serve como publicação de progresso e cadência, diminuindo atrito de publicar.[^https://www.notion.so/258af38adbb68007b61fef9821076430][^https://www.notion.so/26aaf38adbb680fbbc47c4d81f5bfccd]

---

## 5) Estrutura do site (Information Architecture)

A estrutura alvo do site está descrita no documento “Remodelando o site”:[^https://www.notion.so/336af38adbb68021af93ed0c36a7ce91]

- Home
- Projetos
- Jardim
	- Marcos
	- Ensaios
	- Trilha (sequência curada de leitura)
	- Vídeos
	- Posts
	- Padrões (prompts, skills, agents, gists, dev patterns)
- Galeria
	- livros
	- viagens
	- musicas
	- fotos
- Cursos (inclui lista de espera por email em alguns casos)
- Sobre

---

## 6) CMS no Notion (fonte de verdade do conteúdo público)

### Premissa
O “Jardim Digital” no Notion concentra as bases (databases) que funcionam como CMS. O site deve consumir essas fontes como **repositório de conteúdo público** e montar as seções de acordo com o tipo de conteúdo (textos, vídeos, projetos etc.).[^https://www.notion.so/0d6915f493914098ba7a8e831d238e9e]

---

## 7) Site-map — Jardim Digital (Notion) (CMS público)

> Página raiz que organiza o CMS no Notion.

### Raiz
- Título: Jardim Digital
- ID: notion-1
- Link: https://www.notion.so/0d6915f493914098ba7a8e831d238e9e

### Bases (Databases / coleções)
- Título: 📚 Livros
	- ID: notion-2
	- Data source: data-source-3
	- Link: https://www.notion.so/39299fc53b3647af907aa51cd5b50bd6

- Título: 🏟️ Cultura
	- ID: notion-4
	- Data source: data-source-5
	- Link: https://www.notion.so/201af38adbb68022bc16cdfd4e468c09

- Título: 🌎 Viagens & Lugares
	- ID: notion-6
	- Data source: data-source-7
	- Link: https://www.notion.so/203af38adbb680d2a840ecb5c5ba49cf

- Título: 🌳 Textos | Cultivando (Postagens, ensaios)
	- ID: notion-8
	- Data source: data-source-9
	- Link: https://www.notion.so/7e80757600484c1ea8d2613f57ee2ace

- Título: 📽️ Videos | Produzindo (vlogs, tutoriais)
	- ID: notion-10
	- Data source: data-source-11
	- Link: https://www.notion.so/255af38adbb680479d6ef30b1f106358

- Título: 📚 Cursos
	- ID: notion-12
	- Data source: data-source-13
	- Link: https://www.notion.so/265af38adbb680fc97c6e61b13805570

- Título: 🚄 Projetos
	- ID: notion-14
	- Data source: data-source-15
	- Link: https://www.notion.so/267af38adbb68054956fe7593f1f9cf6

### Páginas (subpages)
- Título: Padrões & Gists
	- ID: notion-16
	- Link: https://www.notion.so/336af38adbb68083aaa9e64596b9f742

---

## 8) Notas técnicas mínimas (pistas para implementação)

- Stack/tecnologias citadas no planejamento do site: NextJS, TypeScript, ChakraUI.[^https://www.notion.so/64f29696f3a6462fa00a24d04269b1e2]
- SEO e referências de implementação com Next.js fazem parte do backlog.[^https://www.notion.so/1e7af38adbb680c88658d932cc63363f]
- Existe uma linha de evolução do site por versão (ex.: 3.1.0 em “Vitor Sampaio Site”).[^https://www.notion.so/267af38adbb68054bdefcaba3fdf0b9c]

---

## 9) Regras operacionais para IA (coding agent)

1. Não assumir que todo texto é “final”. Publicação incremental é requisito do produto.
2. Sempre preservar e expor “maturidade/status” na UI e no modelo de dados.
3. Priorizar navegação por teia (links, hubs, trilhas) além de cronologia.
4. Tratar “Marcos” como páginas especiais de onboarding e índice narrativo.
5. Considerar o Notion (Jardim Digital) como CMS público: fonte de verdade do conteúdo.

---

## 10) CMS no Notion — Schemas dos bancos (guia para desenvolvimento)

Esta seção descreve **como os dados estão estruturados no Notion** (na página **Jardim Digital**), para facilitar a implementação do CMS no site: mapeamento de campos, enums e sugestões de uso.

### Referência: Raiz do CMS
- Página CMS: **Jardim Digital** — https://www.notion.so/0d6915f493914098ba7a8e831d238e9e

---

### 🌳 Textos | Cultivando (Postagens, ensaios)
- Database: https://www.notion.so/7e80757600484c1ea8d2613f57ee2ace
- Data source: collection://bcfd5b02-8ea5-494a-8429-a6003ba2bdd2
- Finalidade: Posts, ensaios, marcos e textos em geral (conteúdo principal do “Jardim” no site).

**Propriedades (schema)**
- `Nome` (title): título do texto.
- `Status` (select): estágio de maturidade do texto (contrato do jardim).
	- Opções: `Semente`, `Broto`, `Muda`, `Planta`, `Arvore`
- `Wiki` (select): categoria macro/editoria (usada para agrupamento e navegação).
	- Opções (lista grande): `Site pessoal`, `Projetos`, `Blogando`, `A.I`, `UI/UX`, `My Finances`, `Desenvolvimento pessoal`, `Tecnologia`, `Monitor de treinos`, `Sociologia`, `Programação`, `Livros`, `Revisões de alinhamento`, `Reflexões`, `Marco digital`, `Changelog`, `Descobrindo o Brasil`, `Conceitos e Referencias`
- `Tags` (multi_select): tags temáticas (ex.: `next.js`, `typescript`, `jardim-digital`, `site-pessoal`, `notion`, etc.).
- `Ano` (select): `2021`, `2025`, `2026`
- `Descricao` (text): descrição curta/resumo.
- `Publicado Em` (date): data de publicação (pode ter hora).
- `Atualizado Em` (date): data de atualização (pode ter hora).
- `Criado Em` (created_time): data de criação automática.

**Notas de implementação**
- Para rotas/URLs, normalmente você vai querer um `slug` derivado de `Nome` + um sufixo (ou usar o próprio `id` do Notion) para garantir unicidade.
- `Status` deve virar um **componente visível** no site (card/label/badge), já que é parte do UX do jardim.
- `Wiki` pode ser usado para:
	- gerar páginas de categoria (ex.: `/jardim/programacao`)
	- gerar “hubs” (ex.: `/jardim/marco-digital`, `/jardim/changelog`)
- `Publicado Em` deve ser a fonte de verdade para ordenação cronológica quando existir. Se ausente, fallback para `Criado Em` (ou `createdTime`).

---

### 📽️ Videos | Produzindo (vlogs, tutoriais)
- Database: https://www.notion.so/255af38adbb680479d6ef30b1f106358
- Data source: collection://255af38a-dbb6-8130-8d2e-000bee916e70
- Finalidade: catálogo editorial de vídeos (ideia → produção → publicado), com playlist e tags.

**Propriedades (schema)**
- `Name` (title): título do vídeo.
- `Status` (status): pipeline editorial.
	- Opções: `Ideia`, `Semente`, `Brotando`, `Escrevendo`, `Publicado`
- `Playlist` (select): agrupamento (ex.: `Site pessoal`, `blogando`, `Programação`, `A.I`, etc.).
- `Tags` (multi_select): tags temáticas.
- `Ano` (select): `2021`, `2025`
- `Publicado Em` (date)
- `Atualizado Em` (date)
- `Descrição` (text)

**Notas de implementação**
- `Playlist` tende a mapear bem para uma navegação do tipo `/videos/{playlist}`.
- Para vídeos publicados, provavelmente o schema vai precisar (no futuro) de um `url` do YouTube/Vimeo. Hoje não aparece como propriedade; pode estar no conteúdo da página.

---

### 🚄 Projetos
- Database: https://www.notion.so/267af38adbb68054956fe7593f1f9cf6
- Data source: collection://267af38a-dbb6-8040-b7fe-000bed73ad32
- Finalidade: vitrine de projetos (pessoais, blog, finanças etc.).

**Propriedades (schema)**
- `Nome` (title): nome do projeto.
- `Status` (status): `Não iniciada`, `Em andamento`, `Concluído`
- `Descricao` (text)
- `Tags` (multi_select): `pessoal`, `blog`, `jardim-digital`, `finanças`, `notion`
- `Versão` (text): versão atual (ex.: `3.1.0`)
- `Publicado Em` (date)

**Notas de implementação**
- `Versão` pode alimentar um badge (ex.: “v3.1.0”).
- `Publicado Em` pode ser usado como “lançamento” do projeto, mas nem todo projeto terá data.

---

### 📚 Livros
- Database: https://www.notion.so/39299fc53b3647af907aa51cd5b50bd6
- Data source: collection://f088675d-0c72-4381-ad7a-726255510d86
- Finalidade: biblioteca e tracking de leitura (galeria do site).

**Propriedades (schema)**
- `Name` (title): título do livro.
- `Autor` (text)
- `State` (select): `Finalizado`, `Lendo`, `Pesquisar`, `Fila`
- `Tags` (multi_select): categorias (ex.: `filosofia`, `escrita`, `produtividade`, etc.)
- `Descrição` (text)
- `Indice` (number): parece ser um ranking/ordem interna.
- `Inicio` (date)
- `Finalização` (date)
- `Criado` (created_time)
- `Editado` (last_edited_time)

**Notas de implementação**
- Para uma “prateleira” pública, `State` pode virar filtros (ex.: “Lendo agora”, “Finalizados”).
- `Indice` pode ordenar quando fizer sentido (senão, ordenar por `Finalização` desc).

---

### 🏟️ Cultura
- Database: https://www.notion.so/201af38adbb68022bc16cdfd4e468c09
- Data source: collection://201af38a-dbb6-80d9-95c9-000b17936575
- Finalidade: catálogo cultural (filmes/séries/anime/álbuns) para a “Galeria”.

**Propriedades (schema)**
- `Nome` (title): nome do item.
- `Tipo` (select): `filme`, `serie`, `anime`, `album`
- `Status` (status): `Assistir`, `Assistindo`, `Assistido`
- `Gêneros` (multi_select): (ex.: `drama`, `terror`, `ficção científica`, etc.)
- `Descrição` (text)
- `URL` (url)

**Notas de implementação**
- `Tipo` define rotas e agrupamento (ex.: `/galeria/filmes`, `/galeria/series`).
- `URL` pode apontar para referência externa (IMDB, Google, etc.).

---

### 🌎 Viagens & Lugares
- Database: https://www.notion.so/203af38adbb680d2a840ecb5c5ba49cf
- Data source: collection://203af38a-dbb6-80c8-83a8-000b3cbede1e
- Finalidade: lugares/viagens (galeria e/ou páginas de viagens).

**Propriedades (schema)**
- `Nome` (title)

**Notas de implementação**
- Schema mínimo hoje. Se virar seção pública robusta, pode precisar de:
	- `país`, `estado`, `cidade`, `datas`, `mapa`, `fotos`, `slug`, etc.

---

### 📚 Cursos
- Database: https://www.notion.so/265af38adbb680fc97c6e61b13805570
- Data source: collection://265af38a-dbb6-80bc-b78c-000bb5a1a37e
- Finalidade: catálogo de cursos (com possibilidade de “lista de espera” no site).

**Propriedades (schema)**
- `Nome` (title)
- `Status` (status): `Not started`, `In progress`, `Done`
- `descricao` (text)
- `tags` (multi_select): atualmente inclui `tecnologia`

**Notas de implementação**
- Boa base para página `/cursos` com filtros por status/tags.
- Lista de espera (email) parece ser requisito de produto, mas não existe como propriedade aqui ainda.

---

### Padrões & Gists (subpage)
- Página: https://www.notion.so/336af38adbb68083aaa9e64596b9f742
- Observação: está em branco hoje (provável destino para padrões de dev, prompts, agents, snippets).

---

### Sugestão de “contrato” do CMS (para código)
Ao consumir do Notion, o site deve tratar cada item como tendo:
- `id` (UUID/Notion page id)
- `title`
- `type` (qual database/data source originou)
- `status` (quando existir)
- `tags` (quando existir)
- `publishedAt` (quando existir)
- `updatedAt` (quando existir)

E manter mapeamentos específicos por coleção (ex.: `Textos.Status` ≈ maturidade; `Videos.Status` ≈ pipeline).
