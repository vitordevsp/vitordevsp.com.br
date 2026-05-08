# ADR-004 — Frontend RSC-first

## Status

Aceita.

## Contexto

O `site-vitorsampaio` é uma aplicação pública, editorial e orientada a leitura.

A maior parte das páginas consome conteúdo do Notion, renderiza dados no servidor e entrega HTML para visitantes. O projeto não exige estado global, autenticação, dashboard ou lógica pesada no client no MVP.

Usar Client Components como padrão aumentaria JavaScript no navegador sem necessidade.

## Decisão

A aplicação será server-first / RSC-first.

Server Components devem ser o padrão para páginas, layouts e componentes sem interação client.

Client Components devem ser usados apenas quando houver necessidade real de execução no navegador.

## Regras derivadas

* Pages devem ser Server Components por padrão.
* Layouts devem ser Server Components por padrão.
* Fetching editorial deve acontecer no servidor.
* Não adicionar `"use client"` em páginas por conveniência.
* Client Components devem ficar restritos a componentes interativos.
* Tokens e secrets nunca devem chegar ao client.
* Dados do Notion devem ser buscados e normalizados no servidor.

## Quando usar Client Component

Permitido quando houver:

* estado local interativo;
* eventos do navegador;
* menu mobile;
* filtros client-side;
* scroll spy;
* animações dependentes do client;
* APIs do browser;
* controles de UI que não existem no servidor.

## Quando não usar Client Component

Não usar para:

* buscar dados do Notion;
* renderizar página inteira;
* resolver import incompatível sem investigar;
* acessar variáveis sensíveis;
* componentes puramente visuais;
* componentes que apenas recebem props e renderizam HTML.

## Consequências

### Positivas

* Menos JavaScript no client.
* Melhor segurança para tokens e dados sensíveis.
* Melhor alinhamento com conteúdo editorial.
* Integração com Notion mais simples e segura.
* Páginas públicas mais previsíveis.

### Negativas

* Exige cuidado ao introduzir interatividade.
* Algumas bibliotecas client-only podem ser inadequadas.
* Pode exigir separação entre componente server e subcomponente client.
* Filtros e interações precisam ser planejados caso a caso.

## Padrão esperado

Fluxo típico:

```txt
app/jardim/page.tsx
  → chama feature server-side
  → recebe TextPost[]
  → renderiza componentes server
```

Quando houver interação:

```txt
Server page
  → Server component
  → Client component pequeno para interação específica
```

## Relação com Notion

A decisão RSC-first reforça que:

* Notion deve ser acessado no servidor;
* mappers devem rodar no servidor;
* UI deve receber modelos internos;
* tokens não devem ser expostos;
* API routes não são necessárias por padrão.

## Alternativas consideradas

### Client-first

Rejeitado porque o projeto não exige aplicação altamente interativa no MVP e isso aumentaria complexidade no navegador.

### SPA

Rejeitada porque o site é público, editorial e precisa priorizar leitura, SEO e renderização server-side.

### Uso misto sem regra explícita

Rejeitado porque tende a espalhar `"use client"` por conveniência e dificulta manutenção por agentes.

## Documentos relacionados

* `docs/architecture/overview.md`
* `docs/architecture/frontend.md`
* `docs/architecture/notion-cms.md`
* `docs/agent/instructions.md`

## Critério de sucesso

Esta decisão será bem-sucedida se:

* páginas forem Server Components por padrão;
* Client Components forem pequenos e justificados;
* Notion permanecer server-only;
* o site carregar pouco JavaScript no client;
* interatividade for adicionada sem transformar páginas inteiras em client components.
