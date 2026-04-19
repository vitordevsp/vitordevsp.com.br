# PLAN-004 — Melhorar Página de Leitura de Post

## Status

| Campo        | Valor      |
|--------------|------------|
| Status       | pendente |
| Criado em    | 2025-01-18 |
| Concluído em | — |

---

## Objetivo

Melhorar a experiência de leitura em `/posts/[slug]`: tipografia, contraste, sidebar direita com índice de navegação por seção e sidebar esquerda com navegação wiki entre notas relacionadas.

---

## Contexto

A leitura é a ação central do jardim digital. A página atual é funcional mas não oferece orientação ao leitor — sem índice, sem contexto de onde aquela nota se encaixa no jardim. A referência é o padrão de wikis e ferramentas como Obsidian Publish.

---

## Arquivos Afetados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/app/(pages)/posts/[slug]/page.tsx` | modificar | Adicionar layout com sidebars |
| `src/components/frames/PostLayout/` | criar | Layout de 3 colunas: wiki / conteúdo / índice |
| `src/components/frames/TableOfContents/` | criar | Índice gerado a partir dos headings do post |
| `src/components/frames/WikiNav/` | criar | Navegação lateral esquerda com notas relacionadas |
| `src/lib/notion/` | modificar | Extrair headings dos blocos para gerar o índice |
| `src/styles/` | modificar | Tipografia e contraste da área de leitura |
| `src/components/index.ts` | modificar | Exportar novos componentes |

---

## Critério de Conclusão

- [ ] Tipografia da área de leitura revisada (font, tamanho, line-height, contraste)
- [ ] Layout de 3 colunas implementado em desktop
- [ ] Sidebar direita com índice gerado automaticamente a partir dos headings do post
- [ ] Índice com scroll spy (destaca a seção atual durante a leitura)
- [ ] Sidebar esquerda com navegação wiki (notas relacionadas ou todas as notas do jardim)
- [ ] Layout colapsado corretamente em mobile (sidebars ocultadas ou em drawer)
- [ ] `pnpm lint` sem erros

---

## Fora do Escopo

- Sistema de busca dentro do jardim
- Comentários ou interações na página
- Edição inline de conteúdo

---

## Riscos e Dependências

| Tipo | Descrição |
|------|-----------|
| Dependência de plano | PLAN-002 (refactor Notion) facilita extração de headings |
| Dependência de plano | PLAN-006 (jardim digital) define quais notas aparecem na wiki nav |
| Risco | Scroll spy pode ter comportamento irregular com blocos do Notion renderizados dinamicamente |
| Risco | Layout 3 colunas pode ser pesado em telas menores — precisa de estratégia clara de responsividade |

---

## Notas de Implementação

- Índice: extrair blocos do tipo `heading_1`, `heading_2`, `heading_3` do retorno do Notion e gerar âncoras
- Scroll spy: `IntersectionObserver` com threshold nos headings
- Wiki nav: a princípio listar todas as notas do jardim com título e estágio (semente, broto, etc.)
- Considerar sticky nas sidebars com `position: sticky; top: Xrem`

---

## Log de Execução

| Data | O que foi feito |
|------|-----------------|
| — | — |
