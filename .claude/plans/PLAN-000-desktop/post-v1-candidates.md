---
title: Candidatos pos-v1 - planos sugeridos
status: rascunho
tags:
  - desktop
  - candidates
  - post-v1
metadata:
  owner: agents-studio
  created_at: 2026-05-12 22:30
  updated_at: 2026-05-13 00:50
---

# Candidatos pos-v1 - planos sugeridos

## Objetivo

Registrar candidatos a planos futuros do `site-vitorsampaio`. Sao pistas para frentes que entram apos a v1, sem virar backlog estavel ate decisao explicita.

Conteudo absorvido de `docs/roadmap.md` (fases 7 a 12) e do indice legado `docs/plans/index.md`, ambos removidos apos consolidacao em [`.claude/plans/`](../).

## Status

Lista exploratoria. Nenhum destes virou plano em `.claude/plans/`. Promover so quando v1 fechar e existir necessidade real.

## Regras de uso

- candidato aqui nao tem dossie, escopo fechado nem owner;
- promover para `.claude/plans/PLAN-NNN-slug/` so quando houver decisao de iniciar a frente;
- remover candidato que perder sentido apos v1;
- nao confundir com backlog formal externo.

## Candidatos

| Slug sugerido | Origem | Resumo |
|---|---|---|
| PLAN-011-experiencia-leitura-avancada | leitura avancada | layout de leitura refinado, indice lateral, scroll spy, blocos especiais, navegacao entre conteudos relacionados |
| PLAN-012-filtros-navegacao-tematica | gap v1 | filtros por tipo, tag, maturidade; navegacao tematica server-side |
| PLAN-013-renderer-blocos-notion-avancado | leitura avancada + content-model | suporte a callout, code com syntax highlight, embeds, toggle, columns, equacao |
| PLAN-014-backlinks-conteudos-relacionados | conexoes e descoberta | backlinks automaticos, conteudos relacionados, hubs tematicos derivados |
| PLAN-015-busca-textual | conexoes e descoberta | busca textual server-side, indexacao simples; semantica adiada para fase de IA |
| PLAN-016-galeria-notion-completo | galeria completa | mappers `Video`, `Book`, `CultureItem`, `Place`; listagens dinamicas; curadoria |
| PLAN-017-cursos-slug-waitlist | cursos | `/cursos/[slug]`, modulos, status, lista de espera, formulario de interesse |
| PLAN-018-ia-contextual | IA contextual | chat publico sobre conteudos, resumos, recomendacoes, busca semantica, embeddings |
| PLAN-019-newsletter-monetizacao | monetizacao e comunidade | newsletter, lista de espera, produtos digitais, formularios de contato qualificado |

## Ordem indicativa pos-v1

```txt
1. PLAN-016 galeria-notion-completo            (preencher area com dados reais)
2. PLAN-017 cursos-slug-waitlist               (estender area de cursos)
3. PLAN-013 renderer-blocos-notion-avancado    (qualidade de leitura)
4. PLAN-011 experiencia-leitura-avancada       (qualidade de leitura)
5. PLAN-012 filtros-navegacao-tematica         (descoberta)
6. PLAN-014 backlinks-conteudos-relacionados   (descoberta, exige volume)
7. PLAN-015 busca-textual                      (descoberta, exige volume)
8. PLAN-018 ia-contextual                      (so com base editorial)
9. PLAN-019 newsletter-monetizacao             (decisao de produto separada)
```

Ordem nao e contrato. Pode ser reordenada conforme demanda real e volume de conteudo no Notion.

## Dependencias amplas

- todos exigem v1 publicada e estavel;
- PLAN-011/013 dependem de modelos `TextPost` consolidados;
- PLAN-014/015 exigem volume real de conteudo no Jardim;
- PLAN-016 depende de databases Notion preenchidas para videos/livros/cultura/viagens;
- PLAN-018 exige decisao explicita sobre custos recorrentes de IA e politica de conteudo publico vs privado;
- PLAN-019 depende de decisao de produto sobre monetizacao.

## Restricoes herdadas

- nao antecipar autenticacao, area de membros, pagamentos internos, comentarios, comunidade propria ou CRM proprio sem ADR;
- nao criar dependencia critica de IA para navegacao basica;
- nao expor conteudo privado por meio de busca, IA ou backlink;
- sem custos recorrentes sem decisao explicita registrada.

## Referencias

- [`../../../docs/product.md`](../../../docs/product.md)
- [`../../../docs/content-model.md`](../../../docs/content-model.md)
- [`../../../docs/notion.md`](../../../docs/notion.md)

## Criterio de limpeza

Apagar ou consolidar quando:

- candidato virar plano real em `.claude/plans/`;
- decisao explicita descartar a frente;
- v1 mudar de escopo e tornar o candidato obsoleto.
