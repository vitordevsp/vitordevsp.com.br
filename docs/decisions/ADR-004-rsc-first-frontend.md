# ADR-004 — Frontend RSC-first

## Status

Aceita.

## Contexto

O `site-vitorsampaio` é aplicação pública, editorial e orientada a leitura. A maior parte das páginas consome conteúdo do Notion, renderiza dados no servidor e entrega HTML para visitantes. O projeto não exige estado global, autenticação, dashboard ou lógica pesada no client no MVP. Usar Client Components como padrão aumentaria JavaScript no navegador sem necessidade.

## Decisão

Server-first / RSC-first. Server Components são padrão para páginas, layouts e componentes sem interação client. Client Components apenas com necessidade real de execução no navegador.

Regras operacionais e exemplos em [`../architecture.md`](../architecture.md).

## Consequências

Positivas: menos JavaScript no client, melhor segurança para tokens, melhor alinhamento com conteúdo editorial, integração com Notion mais simples, páginas mais previsíveis.

Negativas: exige cuidado ao introduzir interatividade, algumas bibliotecas client-only podem ser inadequadas, pode exigir separação entre componente server e subcomponente client.

## Alternativas consideradas

* **Client-first** — rejeitado porque o projeto não exige aplicação altamente interativa.
* **SPA** — rejeitada porque o site é editorial e precisa priorizar leitura, SEO e renderização server-side.
* **Uso misto sem regra explícita** — rejeitado por espalhar `"use client"` por conveniência e dificultar manutenção por agentes.

## Documentos relacionados

* [`../architecture.md`](../architecture.md)
* [`../notion.md`](../notion.md)
