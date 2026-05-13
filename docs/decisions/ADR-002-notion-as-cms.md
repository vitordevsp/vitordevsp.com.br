# ADR-002 — Usar Notion como CMS editorial

## Status

Aceita.

## Contexto

O `site-vitorsampaio` precisa de fonte editorial simples para textos, projetos, vídeos, referências e outros conteúdos. O autor já usa Notion como ambiente de escrita e organização; a maior parte do conteúdo previsto já existe ou está planejada lá. Criar CMS próprio aumentaria complexidade sem necessidade real.

## Decisão

Notion é o CMS editorial do projeto. A aplicação consome dados no servidor, normaliza em modelos internos via mapper e renderiza UI a partir desses modelos.

Regras operacionais detalhadas em [`../notion.md`](../notion.md). Modelos internos em [`../content-model.md`](../content-model.md).

## Consequências

Positivas: aproveita fluxo editorial existente, evita CMS próprio, permite edição sem alterar código, mantém autonomia editorial.

Negativas: dependência da API e disponibilidade do Notion, mudanças nas databases exigem ajustes nos mappers, performance/cache exigem cuidado, renderização de blocos exige suporte incremental.

## Limites

Notion é fonte editorial, não arquitetura de UI. Não deve vazar para componentes compartilhados, props públicas, regras de layout, nomes de classes, decisões visuais ou contratos internos de domínio.

## Alternativas consideradas

* **CMS próprio** — rejeitado por adicionar backend, banco, autenticação e painel admin antes da necessidade.
* **Markdown local** — rejeitado porque conteúdo já vive no Notion.
* **Headless CMS dedicado** — rejeitado por exigir migração editorial e custo/complexidade adicional.

## Documentos relacionados

* [`../notion.md`](../notion.md)
* [`../content-model.md`](../content-model.md)
