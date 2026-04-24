---
id: PLAN-004
linear_id: DEVSP-16
title: Melhorar Página de Leitura de Post
status: todo
created_at: 2026-04-19
updated_at: 2026-04-24
sync_at: "2026-04-24 04:10:00 -0300"
---

# PLAN-004 — Melhorar Página de Leitura de Post

## Contexto

A página `/posts/[slug]` já renderiza conteúdo do Notion, mas ainda lê como uma página simples. Para o jardim digital, a leitura precisa ganhar orientação: o leitor deve entender onde está no texto e navegar por seções sem depender só da rolagem.

Navegação wiki entre notas depende do modelo real do jardim digital e fica ligada ao PLAN-005, não como entrega obrigatória desta história.

## Objetivo

Melhorar a experiência de leitura com tipografia confortável, layout preparado para sidebar de índice e índice de seções gerado a partir dos blocos do Notion.

## Direcionamento

- O conteúdo principal deve continuar server-rendered sempre que possível.
- O índice pode ser renderizado no servidor; apenas destaque ativo exige client-side.
- Anchors devem ser estáveis e lidar com headings repetidos.
- Mobile deve preferir alternativa simples antes de drawer complexo.
- Wiki nav à esquerda só deve voltar quando o PLAN-005 definir domínio de notas e estágios.

## Escopo

### Inclui

- Revisar tipografia, espaçamento e contraste da leitura.
- Criar layout com conteúdo principal e índice lateral.
- Extrair headings do Notion e gerar âncoras.
- Implementar estado ativo no índice se o custo client-side for aceitável.
- Validar mobile, acessibilidade do índice e build.

### Não inclui

- Navegação wiki entre notas do jardim.
- Busca dentro do jardim.
- Comentários, reações ou edição inline.
- Mudança do schema de posts no Notion.

## Tarefas relacionadas

- `P004-T001` — Revisar tipografia e espacamento da area de leitura
- `P004-T002` — Criar layout de leitura com conteudo e indice lateral
- `P004-T003` — Gerar ancoras e TableOfContents a partir dos headings do Notion
- `P004-T004` — Adicionar estado ativo no indice durante a rolagem
- `P004-T005` — Validar mobile, acessibilidade do indice e build

## Critérios de aceite da história

- [ ] Página de post tem leitura confortável em desktop e mobile.
- [ ] Layout suporta conteúdo principal e índice.
- [ ] Headings do Notion geram anchors estáveis.
- [ ] Índice navega por seções e não quebra a boundary RSC/client.
- [ ] Mobile e teclado foram validados.

## Questions

- [ ] Quando o PLAN-005 existir, a navegação wiki entre notas deve aparecer neste layout ou em uma página dedicada do jardim?
