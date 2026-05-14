# Changelog

Historico tematico do projeto vitordevsp.com.br.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e [Semantic Versioning](https://semver.org/lang/pt-BR/).

Resumido por tema, nao por commit. Resets totais (apagar tudo e recomecar) sao marcados explicitamente como `Reset`.

---

## [Unreleased] — base para v3.2 (branch `claude_experiment`)

Janela: 2026-05-04 ate hoje. Em desenvolvimento.

Segundo reset total do repositorio. Diferenca em relacao ao reset anterior (v3): este reset e metodologico, nao apenas tecnico. O objetivo nao e trocar de stack — e introduzir SDD, agentes governados por contexto e tres camadas (`docs/`, `.claude/`, `.journey/`) como infraestrutura do projeto.

### Reset

- `218da0a` (2026-05-04): "feat: nova base para a v3.2". Apaga toda a v3.1.x (Sass + BEM + Notion wrapper antigo) e reinicia com Next.js 16 hello world. Primeira mensagem ao agente: "limpe o projeto e deixe so um Hello world sendo renderizado para comecarmos a trabalhar".

### Docs

- `a90a144` (2026-05-08): scaffold inicial de `docs/` em categorias semanticas (`product/`, `architecture/`, `agent/`, `decisions/`, `reference/`).
- `3a91d78` (2026-05-08): preenche scaffold com conteudo inicial.
- `1ae4ffc` (2026-05-12): consolida `docs/` em layout flat. Subpastas viram seis arquivos diretos (`product.md`, `content-model.md`, `architecture.md`, `notion.md`, `styling.md`, `agents.md`) + `decisions/` para ADRs. "Mais flat" vira refrao da branch.
- `16af8bd` (2026-05-12): enxuga ADRs 001-005 para template normativo.
- `4f080ee` (2026-05-12): atualiza `CLAUDE.md` com nova estrutura flat.
- `13b2fb4` (2026-05-12): reescreve `CLAUDE.md` alinhado a camada `.claude/`.

### Chore (camada `.claude/`)

- `71c4d13` (2026-05-12): adiciona camada operacional de skills e planos. Importa estrutura do Agents Studio v0.1, poda referencias orfas, troca `.agents/` por `.claude/`, remove skill `ast-docs-maintainer` por nao caber neste projeto.
- `a656013` (2026-05-13): consolida planos v1 em `.claude/plans/`. Absorve `docs/roadmap.md` nos planos e remove o arquivo. Carrega candidatos pos-v1 em `plan-000-desktop`. Dez planos em draft.
- `eac92f5` (2026-05-13): adiciona skill `journey-writer` para registrar a travessia em `.journey/`.

### Sem versao definida

A v3.2 ainda nao foi tageada. Esta secao vira `[v3.2.0]` quando a base estiver pronta para deploy.

---

## [v3.1.0] — 2025-04-10

Janela: 2025-04-09 a 2025-04-10. Versao incremental sobre v3.0.

### Adicionado

- Integracao com Google Analytics via `next/third-parties` (`d0af023`).

### Chore

- Adiciona dependencia `next/third-parties` (`895c8d9`).

---

## [v3.0.0] — 2025-04-01

Janela: 2023-12-04 a 2025-04-01. Primeira reescrita completa do projeto.

### Reset

- `5fab737` (2023-12-05): "exclui todos os arquivos do projeto". Primeiro reset total. Apaga toda a v2.x (Chakra UI, services hardcoded, API Routes internas, modulo content baseado em Notion antigo).
- `414bdb8` (2023-12-05): "Initial commit v3". Reinicia o projeto com nova estrutura.

### Adicionado

- **Estrutura base nova:** novo arranjo de paginas e componentes, app router do Next.js, grupo `pages` na pasta `app`.
- **Sistema de design proprio:**
  - componentes atomicos `Heading`, `Paragraph`, `Span`, `Icon`, `LinkWithIcon`, `Tag`, `Tags`, `Flexbox`;
  - layout: `Header`, `Footer`, `PageContainer`, `PageHeader`, `PageFooter`;
  - cards: `SkillCard`, `ProjectCard`, `ServiceCard`, `BlogPostCard`, `VideoCard`;
  - sections de home: hero, characteristics, projects, services, posts.
- **Paginas:** Home (com 5 secoes), Sobre, Projetos, Posts, Videos, Post (detalhe).
- **Estilo:** primeiro Tailwind 3.4, depois substituido por Sass + BEM com mixins de responsividade e `variables.scss`.
- **Notion v2:** novo wrapper `@notionhq/client`, `/api/notion`, busca de dados para posts, projetos e videos, renderizacao de post via blocos do Notion.
- **Mobile:** responsividade implementada para todas as paginas e componentes principais.

### Mudado

- Renomeacao de classes seguindo BEM nas paginas Home, Posts, Projetos, Sobre, Videos.
- Reestrutura de pastas em `components/`.
- Refatora renderizacao da pagina do post.
- Atualiza fonte de dados dos posts para nova database do Notion.

### Removido

- Tailwind, substituido por Sass + BEM.
- Arquivos SVG de identidade antiga.
- Mocks legados.

### Chore

- Configura ESLint com regras adicionais.
- `.editorconfig`.
- Atualiza versao da lib do Notion para garantir compatibilidade.
- Migra gerenciador de pacotes.
- Adiciona Vercel Analytics.
- Add `to_do.md` e `check-changes.sh` (artefatos pessoais de planejamento).

---

## [v2.0.0] — 2022-03-11

Janela: 2021-10-14 a 2022-03-11. Migracao para Notion como fonte de dados.

### Adicionado

- **Notion services:**
  - `@notionhq/client`;
  - service `notion:posts`, `notion:projects`, `notion:videos`;
  - tipo `notion type url`;
  - novo formato de retorno do `notionClient`.
- **Modulo `content`:** abstracao para consumir conteudo Notion de forma padronizada.
- **Renderizacao de posts:**
  - `getBlocksFromPage` e `getFullPost` com recursividade para buscar todos os blocos e seus filhos;
  - `parseBlocksToComponents` e `MapComponent` para renderizar blocos do Notion como componentes React (incluindo `numbered_list_item`);
  - estrutura de tipagem dos blocos;
  - pagina `pageSlug` com loading e responsividade.
- **API Routes internas:**
  - rotas `/posts`, `/videos`, `/projects`, `/contents` no formato de API REST;
  - `notionRepository` abstraindo a lib do Notion;
  - controllers e services proprios;
  - arquivos `.http` documentando as rotas.
- **Cliente Axios:** com baseURL completa para chamadas internas.
- **DateUtil:** helper para formatar datas dos posts.
- Prop `dateDisplay` no componente de post.

### Mudado

- Refatora `home`, `posts`, `post`, `projects`, `videos` para buscarem dados via API Routes em vez de chamadas diretas.
- Reorganiza pasta `components` para clareza.
- Renomeia arquivo `postService` e modifica validacao de parametros.
- Ajusta filtros e paginacao (`pageSize`).
- Padroniza retorno dos endpoints e do `contentService.list`.
- Edita ordem da navegacao.

### Fixed

- Garante que tags sempre seja array.
- Trata `tags.multi_select` indefinido.
- Corrige importacao quebrada e problema de carregamento da pagina.

### Chore

- Bloqueia build na Vercel para integracoes que nao sejam `main` ou `homolog`.
- Bump axios e Notion lib.
- ESLint: `no-unused-vars` -> warn.

---

## [v1.0.0] — 2021-10-14

Janela: 2021-05-25 a 2021-10-14. Primeira versao publicavel do site.

### Adicionado

- **Base tecnica:** Next.js + Chakra UI + TypeScript.
- **Componentes:**
  - `ActiveLink`, `IconLink`, `Toolbar`, `Logo`, `Main`, `HeaderMobile`;
  - `TitleSection`, `Badge`, `BadgeTech`, `SectionBadgesTechs`;
  - `CardInfo`, `CardInfoLarge`, `CardPost` (depois renomeado para `CardTexts`);
  - `FlexGap` (workaround para bug do iOS).
- **Paginas:** Home, Projects, Videos, Posts, About.
- **Services hardcoded:**
  - YouTube: busca de videos (titulos, thumbs com fallback de maxres);
  - Dev.to: busca de posts;
  - GitHub: busca de repositorios com tratamento de erro.
- **Responsividade:** Header, Home, CardInfoLarge, paginas Projects e Posts.
- **Design:** scrollbar customizada, ajustes de cor, favicon, title window.
- **Configuracao:** `username` por service via env.

### Mudado

- Substitui `<a>` por `next/link` na navegacao interna.
- Refatora services para isolar em pastas (`service/youtube`, etc.).
- `revalidate` configuravel via `components/config.ts`.

### Fixed

- Pluralidade de texto em `page/videos`.
- Espacamento e altura.
- Tags indefinidas no service do YouTube.
- Total de videos e posts exportado corretamente.
- `maxResults` obrigatorio no service do YouTube.
- Link desativado quando nao ha `href`.
- Tratamento de erros nas chamadas para o GitHub.

### Docs

- README inicial + refatoracao posterior (sem indice).

### Chore

- ESLint, EditorConfig, Commitlint, Husky, Commitizen.
- Bump Next 10.2.3 -> 11.1.1.
- Bump axios 0.21.1 -> 0.21.2.
- Adiciona licenca.
- Bump deps gerais.

---

## Notas sobre versionamento

- Versoes semver (`vMAJOR.MINOR.PATCH`) sao atribuidas em momentos de estabilidade publicavel, nao a cada release tecnica.
- `Reset` e categoria especifica deste projeto: marca apagamentos totais do repositorio com reinicio. Foram **dois** ate agora: `2023-12-05` (rumo a v3) e `2026-05-04` (rumo a v3.2).
- A janela `Unreleased` representa trabalho da branch `claude_experiment` ainda nao tageado. Vira `[v3.2.0]` quando a v3.2 estiver pronta.
- Datas no formato `AAAA-MM-DD`.
