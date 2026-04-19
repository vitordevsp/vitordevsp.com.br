# Product History — vitordevsp.com.br

## Objetivo

Site pessoal e blog de Vitor Sampaio, funcionando como portfolio profissional e plataforma de publicacao de conteudo tecnico com o Notion como CMS.

## Por que existe

Centralizar presenca online do autor — publicacao de posts tecnicos, exibicao de projetos, videos e informacoes pessoais — sem depender de um CMS dedicado ou plataforma de terceiros para o frontend.

O Notion resolve o problema editorial: o autor cria e edita no Notion, o site consome via API e renderiza como RSC sem necessidade de rebuild.

## O que resolve

- Portfolio de projetos profissionais e pessoais com links e contexto
- Blog tecnico com posts renderizados a partir de blocos do Notion
- Galeria de videos linkados ao YouTube
- Presenca publica do autor como desenvolvedor

## Composicao principal

```
src/
  app/
    (pages)/        — rotas do site (home, posts, projetos, videos, sobre)
    api/notion/     — sistema legacy em migracao
    layout.tsx      — layout raiz com header, footer e analytics
  components/
    frames/         — blocos maiores (PageHeader, BlogPostCard, ProjectCard, VideoCard...)
    shared/         — primitivos reutilizaveis (Heading, Tag, Icon, Flexbox...)
    index.ts        — barrel export
  lib/
    notion/         — sistema moderno de integracao com o Notion
  styles/           — variaveis CSS, reset global, mixins SCSS
  types/
    notion.type.ts  — schemas de banco (PostProps e futuros)
```

## Fluxo principal

```
Autor edita no Notion
  → banco de dados Notion (Posts / Videos / Projetos)
  → requisicao chega no Next.js
  → page RSC assincrona busca dados via src/lib/notion/
  → getDatabaseItems<T>() / getPageById<T>() / getAllBlockChildren()
  → renderizacao com PageRenderer e RichTextRender
  → HTML servido ao usuario
```

Nao ha estado global de cliente, autenticacao nem fetching no browser. Tudo acontece no servidor.

## Dois sistemas de integracao em paralelo

| Sistema | Localizacao | Usado por | Estado |
|---------|-------------|-----------|--------|
| Moderno | `src/lib/notion/` | Posts | Ativo, tipado, preferido para tudo novo |
| Legacy | `src/app/api/notion/_resources/` | Videos, Projetos | Funcional, sendo migrado |

A unificacao e o objetivo do PLAN-001. Apos a migracao, o legacy sera removido.

## Frentes de evolucao

Em ordem de dependencia:

1. **PLAN-001** — Migrar legacy Notion para o sistema moderno
2. **PLAN-002** — Refactor da lib Notion (paralelizacao, remocao de `any`, organizacao por dominio)
3. **PLAN-003** — Reformulacao de layout (navbar hide-on-scroll, hero com foto, grid assimetrico, footer)
4. **PLAN-004** — Experiencia de leitura de post (3 colunas, indice, scroll spy, wiki nav)
5. **PLAN-005** — Jardim digital (sistema de estagios de nota, subpaginas, filtros)
6. **PLAN-006** — Pagina de cursos com lista de espera por e-mail

Ver status atual em `docs/plans/PLAN-000-board/`.

## Dependencias e limites

- **Notion como CMS**: todo o conteudo editorial vem do Notion. Sem Notion, o site nao tem dados.
- **Vercel**: deploy e ambiente de producao. Variaveis de ambiente vivem la.
- **`NOTION_TOKEN`** e **`NOTION_KEY`**: dois tokens em uso enquanto o legacy nao for removido.
- Nao ha backend proprio, autenticacao, banco de dados proprio nem estado de usuario.
- O site e publico e estatico do ponto de vista do usuario.

## Decisoes que moldam a manutencao

- **RSC-first**: pages sao `async function` que buscam dados no servidor. Nao usar `"use client"` em pages.
- **SCSS puro**: sem Tailwind. Estilos em `.scss` ou CSS Modules. Variaveis em `src/styles/variables.scss`.
- **Barrel export**: todos os componentes exportados via `src/components/index.ts`.
- **Tipagem generica no Notion**: schemas de banco usam `EnsureNotionPropertiesSchema<{...}>` em `src/types/notion.type.ts`.
- **Sem stores**: nao ha Zustand nem estado global. Dados passam como props das pages para os componentes.

## Onde cuidar mais

- Mudancas em `src/lib/notion/features/databases/index.ts` afetam todas as queries do site
- `generateNotionPageID` em `src/lib/notion/helpers/utils.ts` e fragil para slugs sem hifen
- `getAllBlockChildren` com `deep: true` faz fetches sequenciais — nao adicionar mais chamadas aninhadas sem resolver a paralelizacao primeiro (PLAN-002)
- O sistema legacy e o moderno usam tokens diferentes — nao misturar

## Referencias

- `docs/plans/PLAN-002-refactor-notion/README.md` — problemas tecnicos detalhados e sugestoes de correcao
- `docs/patterns/services.md` — padrao de integracao Notion
- `docs/patterns/aplicacao.md` — regras de composicao de pages
- `docs/product/notion/data-sources.md` — propriedades dos bancos Posts, Videos, Projetos
- `docs/plans/` — frentes de trabalho ativas
