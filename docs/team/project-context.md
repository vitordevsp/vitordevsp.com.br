# Contexto do Projeto

## O que é este projeto

Site pessoal e blog de Vitor Sampaio ([@vitordevsp](https://github.com/vitordevsp)), hospedado em `vitordevsp.com.br`.

O projeto funciona como portfólio profissional e plataforma de publicacao de conteudo tecnico.

## Problema que resolve

Centralizar presença online do autor: publicacao de posts técnicos, exibicao de projetos, videos e informacoes pessoais — com o Notion como backend de conteudo, sem necessidade de um CMS dedicado.

## Modulos principais

- **Posts** — artigos tecnicos publicados pelo autor, renderizados a partir do Notion
- **Projetos** — portfólio de projetos profissionais e pessoais
- **Videos** — videos publicados no YouTube, listados no site
- **Sobre** — pagina institucional do autor
- **Home** — vitrine com destaques de posts e projetos

## Tecnologias principais

- **Framework**: Next.js 15 (App Router, React Server Components)
- **Linguagem**: TypeScript (strict mode)
- **Estilizacao**: SCSS puro (sem Tailwind)
- **CMS**: Notion via `@notionhq/client`
- **Deploy**: Vercel
- **Analytics**: Vercel Analytics + Google Analytics

## Decisões de produto que explicam o estado atual

- **Notion como CMS**: toda a gestao de conteudo e feita pelo Notion; o site consome os bancos de dados via API e renderiza o conteudo em RSC.
- **Dois sistemas de integracao Notion**: o sistema moderno (`src/lib/notion/`) e mais tipado e generico; o legacy (`src/app/api/notion/_resources/`) ainda esta ativo para videos e projetos, em processo de migracao.
- **RSC-first**: nao ha fetching de dados no cliente; todas as pages sao async Server Components.
- **"Jardim digital" (conceito em evolucao)**: o projeto esta sendo reestruturado para se tornar um jardim digital no estilo de `maggieappleton.com`, com estagios de conteudo e filtros por categoria.

## Limites do projeto

- Nao e uma aplicacao com usuarios — e um site estatico gerado sob demanda no servidor.
- Nao ha autenticacao, sessao nem estado global de cliente.
- A gestao do conteudo acontece exclusivamente no Notion.
