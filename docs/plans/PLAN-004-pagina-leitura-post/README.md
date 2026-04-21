# PLAN-004 — Melhorar Página de Leitura de Post

## Status

| Campo | Valor |
|------|------|
| Status | pendente |
| Criado em | 2026-04-19 |
| Atualizado em | 2026-04-19 |
| Concluído em | — |

## Objetivo

Melhorar a experiência de leitura em `/posts/[slug]` com tipografia mais confortável, layout preparado para navegação lateral e índice de seções gerado a partir dos blocos do Notion.

## Contexto

A página de post já renderiza conteúdo do Notion, mas ainda lê como uma página simples. Para o jardim digital, a leitura precisa ganhar orientação: o leitor deve entender onde está no texto e navegar por seções sem depender só da rolagem.

O plano original colocava também uma navegação wiki à esquerda. Essa parte depende do modelo real do jardim digital, então fica registrada como evolução futura ligada ao PLAN-005, não como entrega obrigatória deste plano.

## Escopo

- revisar tipografia, espaçamento e contraste da área de leitura;
- criar um layout de leitura que suporte conteúdo principal e sidebar de índice em desktop;
- extrair headings dos blocos do Notion e gerar âncoras;
- implementar índice lateral com estado ativo durante a leitura, se o custo client-side for aceitável;
- definir comportamento mobile sem exigir a navegação wiki ainda.

## Fora do escopo

- navegação wiki entre notas do jardim — depende do PLAN-005;
- busca dentro do jardim;
- comentários, reações ou edição inline;
- mudança do schema dos posts no Notion.

## Áreas afetadas

| Área | Ação | Observação |
|------|------|------------|
| `src/app/(pages)/posts/[slug]/page.tsx` | modificar | passar headings/anchors para o layout |
| `src/app/(pages)/posts/[slug]/style.scss` | modificar | tipografia e responsividade |
| `src/components/frames/PostLayout/` | criar | layout de leitura, se fizer sentido extrair |
| `src/components/frames/TableOfContents/` | criar | índice a partir dos headings |
| `src/lib/notion/components/PageRenderer/` | revisar | garantir IDs/âncoras em headings |
| `src/components/index.ts` | modificar | exportar componentes novos quando existirem |

## Backlog

- [ ] Revisar tipografia e espaçamento da área de leitura.
- [ ] Criar layout de leitura com conteúdo e índice lateral.
- [ ] Gerar âncoras e índice a partir de `heading_1`, `heading_2` e `heading_3`.
- [ ] Adicionar estado ativo no índice durante a rolagem, se couber bem no modelo de componentes.
- [ ] Validar mobile, acessibilidade do índice e build.

## Riscos e dependências

| Tipo | Descrição |
|------|-----------|
| Dependência parcial | PLAN-002 ajuda se a extração de blocos/headings precisar de tipos melhores. |
| Risco | Scroll spy exige client-side e deve ficar isolado para não transformar a page inteira em client component. |
| Risco | Headings vindos do Notion podem ter textos repetidos; anchors precisam lidar com colisão. |
| Risco | Layout com sidebar pode ficar pesado em mobile se não houver estratégia simples. |

## Notas de implementação

- Gerar anchors estáveis a partir do texto do heading e resolver colisões com sufixo incremental.
- O índice pode ser server-rendered; apenas o destaque ativo precisa de client-side.
- No mobile, preferir índice colapsado ou link de navegação simples antes de drawer complexo.
- Wiki nav à esquerda só deve voltar quando o PLAN-005 definir o domínio de notas e estágios.

## Conhecimentos consolidados

- A página de leitura é uma frente própria, mas não deve assumir o modelo completo do jardim antes do PLAN-005.
- `TableOfContents` é uma entrega real; `WikiNav` ainda é uma decisão dependente de produto/dados.
- Validação de responsividade é critério de fechamento, não task isolada por si só.

## Perguntas em aberto

Perguntas, dúvidas e lacunas vivem em [`questions.md`](./questions.md). Respostas migram para as tasks ou notas de implementação e o item sai do arquivo.

## Referências

- [`docs/patterns/pages.md`](../../patterns/pages.md)
- [`docs/patterns/componentes.md`](../../patterns/componentes.md)
- [`docs/product/notion/framework.md`](../../product/notion/framework.md)

## Log de execução

| Data | O que foi feito |
|------|-----------------|
| 2026-04-19 | Plano revisado para remover dependência incorreta do PLAN-006 e adiar WikiNav para depois do PLAN-005. |
