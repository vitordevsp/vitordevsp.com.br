# Ecossistema

## Sistemas e integrações

### Notion

Funcao: CMS (backend de conteudo do site).

- Contem os bancos de dados de Posts, Videos e Projetos.
- O site consome o Notion via `@notionhq/client`.
- Credencial: `NOTION_TOKEN` (sistema moderno) e `NOTION_KEY` (sistema legacy).
- Documentacao dos data sources: [`../notion/data-sources.md`](../notion/data-sources.md).

### Vercel

Funcao: plataforma de deploy e hosting.

- O projeto e deployado automaticamente a cada push no branch principal.
- Fornece variaveis de ambiente de producao.
- Integra Vercel Analytics para metricas de acesso.

### GitHub

Funcao: controle de versao e CI.

- Repositorio: `vitordevsp/vitordevsp.com.br`.
- Branches: `main` (producao), `develop`, feature branches.

### Google Analytics

Funcao: analytics complementar.

- Integrado via `@next/third-parties/google`.
- Carregado no `layout.tsx` raiz.

### YouTube

Funcao: plataforma dos videos do autor.

- Os videos sao gerenciados no Notion (com campo `idVideoYT`).
- O site gera thumbnails e links para YouTube a partir do ID armazenado no Notion.

## Dependências externas principais

| Pacote | Versao | Papel |
|--------|--------|-------|
| `@notionhq/client` | 4.x | SDK oficial do Notion |
| `next` | 15.x | Framework principal |
| `react` | 18.x | UI |
| `sass` | 1.x | Preprocessador CSS |
| `react-icons` | 4.x | Biblioteca de icones |
| `@vercel/analytics` | 1.x | Analytics Vercel |
| `@next/third-parties` | 15.x | Google Analytics |
