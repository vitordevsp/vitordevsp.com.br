# PLAN-000 - Bloco de notas dos planos

## Status

| Campo | Valor |
|------|------|
| Status | em andamento |
| Criado em | 2026-04-19 |
| Atualizado em | 2026-04-19 |

## Objetivo

Manter um bloco de notas curto e vivo para observacoes rapidas sobre os planos do projeto, alem de concentrar uma visao simples do estado atual das frentes mais importantes.

## Escopo

- registrar notas rapidas que ainda nao merecem um plano proprio;
- preservar lembretes tecnicos de baixo peso;
- apontar para planos maiores quando a pendencia ja ganhou frente propria;
- servir como painel simples de status dos planos.

## Fora do escopo

- virar backlog paralelo de qualquer frente ja estruturada;
- duplicar tarefas ja estruturadas em outros planos;
- guardar historico longo de execucao.

## Notas ativas

_Sem notas ativas no momento._

## Status dos planos

| Plano | Título | Status | Criado em |
|------|------|------|------|
| [PLAN-001](../PLAN-001-migracao-notion-legado/README.md) | Migrar Implementação Legada do Notion | pendente | 2025-01-18 |
| [PLAN-002](../PLAN-002-refactor-notion/README.md) | Refactor da Implementação Moderna do Notion | pendente | 2025-01-18 |
| [PLAN-003](../PLAN-003-layout-estrutura/README.md) | Ajustes de Layout e Estrutura | pendente | 2025-01-18 |
| [PLAN-004](../PLAN-004-pagina-leitura-post/README.md) | Melhorar Página de Leitura de Post | pendente | 2025-01-18 |
| [PLAN-005](../PLAN-005-jardim-digital/README.md) | Jardim Digital | pendente | 2025-01-18 |
| [PLAN-006](../PLAN-006-pagina-cursos/README.md) | Página de Cursos | pendente | 2025-01-18 |

## Ordem sugerida de execução

1. **PLAN-001** — desbloqueante: remove o legacy e unifica o sistema Notion
2. **PLAN-002** — desbloqueante técnico: refatora a lib para suportar tudo que vem depois
3. **PLAN-003** — layout e estrutura visual geral do site
4. **PLAN-004** — experiência de leitura de post (depende do PLAN-002 para extração de headings)
5. **PLAN-005** — jardim digital completo (depende do PLAN-002 para domínios)
6. **PLAN-006** — página de cursos (depende do PLAN-002 para domínio de cursos)

## Log de execução

- 2026-04-19 - painel recriado para o projeto vitordevsp.com.br
