# Changelog

Todas as mudancas relevantes do projeto serao documentadas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).
Versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [Nao lancado]

### Infraestrutura documental

- Adiciona `docs/` como framework interno de desenvolvimento assistido por IA
- Adiciona `CLAUDE.md` e `MEMORY.md` com contexto base do projeto
- Adiciona patterns de arquitetura, componentes, tipagem, servicos, versionamento e documentacao
- Adiciona camada de processo: skills, agents, routines e resources
- Adiciona planos de trabalho PLAN-001 a PLAN-006 com painel PLAN-000

### Adicionado

- Vercel Analytics integrado ao projeto

---

## [3.1.0] - 2025-04-01

### Adicionado

- Componente `Flexbox` para layout
- Google Analytics via `next/third-parties`

### Alterado

- Wrapper lib Notion (`src/lib/notion/`) com tipagem generica e DSL de filtros
- Fonte de dados dos posts migrada para novo banco Notion
- Renderizacao da pagina do post reescrita
- Lib do Notion atualizada; gerenciador de pacotes migrado para pnpm
- Nome do componente `einstein` ajustado

---

## [3.0.0] - 2025-04-01

### Adicionado

- Reescrita completa do projeto como portfolio pessoal/blog
- Next.js 15 App Router com TypeScript e SCSS puro (sem Tailwind)
- Integracao Notion como CMS para posts, projetos e videos
- Renderizacao de blocos Notion via `PageRenderer` e `RichTextRender`
- Componentes reutilizaveis: `Heading`, `Paragraph`, `Tag`, `Icon`, `Flexbox`
- Componentes de layout: `PageHeader`, `PageFooter`, cards de post/projeto/video
- Sistema de design com variaveis CSS e tema escuro
- Mixins SCSS de responsividade (breakpoints sm/md/lg/xl)
- Rotas: `/`, `/posts`, `/posts/[slug]`, `/projetos`, `/videos`, `/sobre`
- Rota de API Notion legada em `src/app/api/notion/`

---

## [2.0.0] - 2022-03-11

### Adicionado

- API Routes do Notion como camada de servicos (posts, projetos, videos, contents)
- Recurso de renderizacao recursiva de blocos Notion
- Suporte a `numbered_list_item` no mapeador de componentes
- Descricao no header da pagina de post
- Axios como client HTTP com baseURL configurada

### Alterado

- Busca de dados migrada das API Routes para chamadas diretas ao Notion (RSC-style)
- Estrutura de tipagem dos blocos Notion formalizada
- Reorganizacao da pasta de componentes

### Corrigido

- Problema de carregamento de pagina
- Abertura de post a partir da listagem
- Tratamento de `tags.multi_select` como array garantido

---

## [1.0.0] - 2021-10-14

### Adicionado

- Estrutura inicial do projeto Next.js
- Integracao basica com Notion via `@notionhq/client`
- Paginas: home, posts, projetos, videos, sobre
- Componentes iniciais: Header, Footer, cards, secoes da home
- Variaveis CSS para cores de texto
- Configuracao de ESLint
