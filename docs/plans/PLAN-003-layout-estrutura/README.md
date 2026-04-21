# PLAN-003 — Ajustes de Layout e Estrutura

## Status

| Campo | Valor |
|------|------|
| Status | pendente |
| Criado em | 2026-04-19 |
| Atualizado em | 2026-04-19 |
| Concluído em | — |

## Objetivo

Reformular a estrutura visual base do site para aproximar a experiência de um jardim digital: navegação mais presente, home com curadoria visual, footer mais útil, posts em visualização mais ampla e página Sobre mais editorial.

## Contexto

As notas originais citam a Maggie Appleton como referência de atmosfera e organização, mas o plano não deve copiar uma página específica. A mudança precisa respeitar o projeto atual: Next.js App Router, SCSS puro, componentes em `src/components/frames/` e conteúdo vindo do Notion.

## Escopo

- ajustar o `PageHeader` para comportamento fixo com hide/show ao rolar;
- reestruturar a hero da home com foto e melhor hierarquia textual;
- criar uma seção reutilizável para blocos assimétricos na home;
- melhorar `PageFooter` com mapa do site e campo visual de newsletter;
- revisar a listagem de posts para leitura mais ampla em estilo wiki;
- melhorar `/sobre` com composição de foto, título e blocos de texto.

## Fora do escopo

- implementar backend de newsletter;
- criar rotas novas como `/jardim`, `/galeria` ou `/cursos`;
- alterar contratos do Notion;
- fazer redesign completo de todos os componentes do site.

## Áreas afetadas

| Área | Ação | Observação |
|------|------|------------|
| `src/components/frames/PageHeader/` | modificar | comportamento fixo e hide/show |
| `src/app/(pages)/(home)/page.tsx` | modificar | hero e seções da home |
| `src/app/(pages)/(home)/style.scss` | modificar | layout da home |
| `src/components/frames/HomeSection/` | criar | seção assimétrica reutilizável, se simplificar a home |
| `src/components/frames/PageFooter/` | modificar | mapa do site e captura visual |
| `src/app/(pages)/posts/page.tsx` | modificar | listagem com leitura mais ampla |
| `src/app/(pages)/sobre/page.tsx` | modificar | composição editorial |
| `src/components/index.ts` | modificar | exportar componentes novos quando existirem |

## Backlog

- [ ] Ajustar `PageHeader` fixo com hide/show ao rolar.
- [ ] Reestruturar hero e seções da home com foto e blocos assimétricos.
- [ ] Atualizar footer com mapa do site e campo visual de newsletter.
- [ ] Melhorar listagem de posts e página Sobre sem mudar dados do Notion.
- [ ] Validar responsividade, acessibilidade visual básica e build.

## Riscos e dependências

| Tipo | Descrição |
|------|-----------|
| Referência | https://maggieappleton.com/ |
| Risco | Header hide/show pode exigir client component e precisa ser isolado para não contaminar pages RSC. |
| Risco | Seção assimétrica pode ficar frágil no mobile se nascer com proporção rígida demais. |
| Risco | Campo de newsletter sem backend precisa parecer inativo/visual de forma honesta. |

## Notas de implementação

- Preferir CSS Grid com fallback simples em mobile.
- Para a seção assimétrica da home, a referência inicial é proporção 70/30 em desktop (bloco maior com grid 2x2 ou 3x3 à esquerda, lista de cards à direita, invertendo no bloco seguinte). Valor é guia visual, não contrato rígido.
- A assimetria não é apenas geometria: ela expressa hierarquia editorial (bloco dominante = formato principal daquela seção) e passa sensação de "mapa" em vez de feed cronológico. Referência inspiradora em `docs/resources/notes-maggie-site-reference.md`; não copiar as categorias dela.
- Para a listagem de posts em estilo wiki, a referência inicial é um grid multi-coluna em desktop (~4 colunas), colapsando em mobile.
- Evitar transformar a home em landing page genérica; ela deve mostrar conteúdo e caminhos reais do site.
- O campo de newsletter é visual neste plano. A integração real deve virar outro plano/tarefa quando houver destino dos emails.
- Validar textos longos em cards e menus para não quebrar layout em mobile.

## Conhecimentos consolidados

- Este plano é visual/estrutural; dados e domínios do Notion pertencem aos planos 001, 002, 005 e 006.
- A referência da Maggie Appleton serve como direção de curadoria e exploração, não como contrato de UI.
- Responsividade e lint são critérios de fechamento do plano, não tarefas isoladas.

## Perguntas em aberto

Perguntas, dúvidas e lacunas vivem em [`questions.md`](./questions.md). Respostas migram para as tasks ou notas de implementação e o item sai do arquivo.

## Referências

- [`docs/patterns/componentes.md`](../../patterns/componentes.md)
- [`docs/patterns/pages.md`](../../patterns/pages.md)

## Log de execução

| Data | O que foi feito |
|------|-----------------|
| 2026-04-19 | Plano revisado para consolidar tasks visuais e remover validações genéricas como tarefas próprias. |
