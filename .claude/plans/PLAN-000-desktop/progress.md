# Progress - Acompanhamento local temporario

## Objetivo

Manter um acompanhamento curto e temporario da sessao dentro do [`PLAN-000-desktop`](./README.md) e servir como indice vivo dos planos desta pasta.

## Regras

- manter curto e pragmatico;
- registrar apenas o que ainda nao tem lugar melhor;
- concentrar aqui o status operacional dos planos ativos e consolidados;
- promover para `plan`, `task`, `docs/` ou docs vivos assim que o material estabilizar;
- nao duplicar backlog de frentes ja ativas;
- nao usar este arquivo como board externo.

## Planos ativos

| Plano | Status | Owner | Observacao |
|---|---|---|---|
| [`PLAN-000-desktop`](./README.md) | pendente | agents-studio | desktop operacional temporario da pasta |
| [`PLAN-001-fundacao-documental`](../PLAN-001-fundacao-documental/README.md) | concluida | docs-foundation | fundacao documental da v1 ja entregue em `docs/` |
| [`PLAN-002-bootstrap-tecnico`](../PLAN-002-bootstrap-tecnico/README.md) | draft | app-foundation | base Next.js + estrutura `src/` |
| [`PLAN-003-design-base-layout`](../PLAN-003-design-base-layout/README.md) | draft | design-system | layout raiz, header, footer, componentes compartilhados |
| [`PLAN-004-integracao-notion`](../PLAN-004-integracao-notion/README.md) | draft | notion-integration | cliente, queries, mappers, renderer de blocos |
| [`PLAN-005-home-institucionais`](../PLAN-005-home-institucionais/README.md) | draft | site-shell | Home, Sobre, Galeria hub, Cursos simples |
| [`PLAN-006-jardim-digital`](../PLAN-006-jardim-digital/README.md) | draft | garden | `/jardim` e `/jardim/[slug]` |
| [`PLAN-007-projetos`](../PLAN-007-projetos/README.md) | draft | projects | `/projetos` e `/projetos/[slug]` |
| [`PLAN-008-galeria-v1`](../PLAN-008-galeria-v1/README.md) | draft | gallery | sub-rotas estaticas videos/livros/cultura/viagens |
| [`PLAN-009-seo-acabamento`](../PLAN-009-seo-acabamento/README.md) | draft | editorial-polish | metadata, estados vazios, not-found |
| [`PLAN-010-validacao-release`](../PLAN-010-validacao-release/README.md) | draft | release | lint/build/tsc, secrets, checklist de release |

## Planos consolidados

| Plano | Situacao | Referencia |
|---|---|---|
| nenhum no momento | - | - |

## Itens temporarios em acompanhamento

| Item | Decisao | Destino esperado |
|---|---|---|
| [`post-v1-candidates.md`](./post-v1-candidates.md) | manter ate v1 fechar | promover candidato individual para `.claude/plans/` quando frente for iniciada |

## Ordem recomendada de execucao da v1

```txt
PLAN-001 -> PLAN-002 -> PLAN-003 -> PLAN-004 -> PLAN-005 -> PLAN-006 -> PLAN-007 -> PLAN-008 -> PLAN-009 -> PLAN-010
```

PLAN-005, PLAN-006, PLAN-007 e PLAN-008 podem paralelizar apos PLAN-004 entregar mappers.
