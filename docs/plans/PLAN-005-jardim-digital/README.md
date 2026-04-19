# PLAN-005 — Jardim Digital

## Status

| Campo        | Valor      |
|--------------|------------|
| Status       | pendente |
| Criado em    | 2025-01-18 |
| Concluído em | — |

---

## Objetivo

Criar a seção `/jardim` com suas subpáginas (Marcos, Ensaios, Trilha, Vídeos, Posts, Padrões), implementar o sistema de estágios de nota (semente → broto → muda → planta → árvore), cards de destaque para notas iniciais e filtros básicos por ano e ordem.

---

## Contexto

O site está sendo transformado em um jardim digital — um espaço de build in public onde o conteúdo é compartilhado progressivamente. A inspiração principal é maggieappleton.com. O jardim substitui o blog tradicional: não há posts "prontos", há notas em diferentes estágios de maturidade.

Os estágios refletem o quanto uma ideia foi desenvolvida:
- **Semente** — ideia bruta, mal formada
- **Broto** — ideia com algum desenvolvimento
- **Muda** — ideia estruturada mas incompleta
- **Planta** — ideia desenvolvida
- **Árvore** — ideia madura e consolidada

Para estágios iniciais (semente, broto, muda), exibir um card de aviso destacado linkando para um texto explicando como o jardim funciona.

---

## Arquivos Afetados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/app/(pages)/jardim/` | criar | Diretório da seção jardim |
| `src/app/(pages)/jardim/page.tsx` | criar | Página principal do jardim |
| `src/app/(pages)/jardim/marcos/page.tsx` | criar | Subpágina marcos |
| `src/app/(pages)/jardim/ensaios/page.tsx` | criar | Subpágina ensaios |
| `src/app/(pages)/jardim/trilha/page.tsx` | criar | Subpágina trilha (sequência de leitura) |
| `src/app/(pages)/jardim/videos/page.tsx` | criar | Subpágina vídeos |
| `src/app/(pages)/jardim/posts/page.tsx` | criar | Subpágina posts |
| `src/app/(pages)/jardim/padroes/page.tsx` | criar | Subpágina padrões (prompts, skills, agents, dev) |
| `src/components/frames/EstagioNota/` | criar | Indicativo visual do estágio da nota |
| `src/components/frames/CardAvisoEstagio/` | criar | Card de destaque para notas em estágio inicial |
| `src/components/shared/FiltroJardim/` | criar | Filtros por ano e ordem |
| `src/lib/notion/domains/jardim/` | criar | Types e queries para as notas do jardim |
| `src/components/index.ts` | modificar | Exportar novos componentes |

---

## Critério de Conclusão

- [ ] Rota `/jardim` funcionando com todas as subpáginas acessíveis
- [ ] Sistema de estágios implementado com indicativo visual para cada nota
- [ ] Card de aviso exibido para notas em estágio semente, broto ou muda
- [ ] Texto explicativo sobre o jardim criado e linkado no card de aviso
- [ ] Filtro por ano funcional
- [ ] Filtro de inversão de ordem funcional
- [ ] Dados vindos do Notion via `src/lib/notion/domains/jardim/`
- [ ] Subpágina "Padrões" com suporte a categorias: prompts, skills, agents, dev
- [ ] Subpágina "Trilha" com leitura em sequência específica
- [ ] `pnpm lint` sem erros

---

## Fora do Escopo

- Busca full-text dentro do jardim
- Sistema de tags cruzadas entre subpáginas
- Edição de notas pelo site
- Página de leitura individual (coberta pelo PLAN-004)

---

## Riscos e Dependências

| Tipo | Descrição |
|------|-----------|
| Dependência de plano | PLAN-002 (refactor Notion) deve estar concluído |
| Dependência externa | Bancos de dados do Notion para cada subpágina precisam existir e ter a propriedade de estágio configurada |
| Risco | Cada subpágina pode ter estrutura de dados diferente no Notion — avaliar se um único domínio cobre tudo ou se cada um precisa do seu |

---

## Notas de Implementação

- Estágios: implementar como propriedade `select` no Notion com os 5 valores
- Indicativo visual: considerar ícone + label + cor por estágio (ex: verde escuro para árvore, verde claro para semente)
- Card de aviso: exibir apenas quando `estágio ∈ {semente, broto, muda}`, com link para `/jardim/sobre` ou similar
- Filtros: implementar no cliente com estado React ou via searchParams na URL para permitir compartilhamento de filtro

---

## Log de Execução

| Data | O que foi feito |
|------|-----------------|
| — | — |
