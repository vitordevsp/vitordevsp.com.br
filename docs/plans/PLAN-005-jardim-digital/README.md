# PLAN-005 — Jardim Digital

## Status

| Campo | Valor |
|------|------|
| Status | pendente |
| Criado em | 2026-04-19 |
| Atualizado em | 2026-04-19 |
| Concluído em | — |

## Objetivo

Criar a base do jardim digital do site: uma seção `/jardim`, modelo editorial de estágios de nota, filtros simples e subpáginas iniciais que organizem conteúdos existentes sem prometer uma plataforma editorial completa no primeiro ciclo.

## Contexto

O site está sendo transformado em um jardim digital alimentado pelo Notion. A intenção é publicar ideias de forma progressiva, com sinalização clara de maturidade:

- **Semente** — ideia bruta ou rascunho inicial;
- **Broto** — ideia com algum desenvolvimento;
- **Muda** — ideia estruturada, mas ainda incompleta;
- **Planta** — ideia desenvolvida;
- **Árvore** — ideia madura e consolidada.

O plano original tentava resolver muitas subpáginas, filtros e componentes de uma vez. A versão revisada separa primeiro o contrato de conteúdo e depois a UI.

O mapa inicial das bases do Notion está registrado em [`docs/product/jardim-digital-notion-resume.md`](../../product/jardim-digital-notion-resume.md). Ele lista a página raiz do jardim e as bases já criadas para livros, cultura, viagens/lugares, textos, vídeos, cursos e projetos.

## Escopo

- definir o schema mínimo do jardim no Notion;
- criar domínio `src/lib/notion/domains/jardim/` depois da base do PLAN-002;
- criar rota `/jardim` e subpáginas iniciais com navegação clara;
- implementar indicativo visual de estágio e card explicativo para notas iniciais;
- implementar filtros simples por ano e ordem via `searchParams`;
- criar suporte inicial para subpáginas "Padrões" e "Trilha" quando o schema permitir.

## Fora do escopo

- busca full-text;
- tags cruzadas avançadas;
- edição de notas pelo site;
- página individual de leitura — coberta pelo PLAN-004;
- galeria de livros, viagens, músicas e fotos.

## Áreas afetadas

| Área | Ação | Observação |
|------|------|------------|
| `src/app/(pages)/jardim/` | criar | rota principal e subpáginas iniciais |
| `src/lib/notion/domains/jardim/` | criar | types e queries do jardim |
| `src/components/frames/EstagioNota/` | criar | indicativo visual do estágio |
| `src/components/frames/CardAvisoEstagio/` | criar | aviso para notas em estágio inicial |
| `src/components/shared/FiltroJardim/` | criar | filtros simples, se não houver componente existente melhor |
| `src/components/index.ts` | modificar | exportar componentes novos quando existirem |
| `docs/product/notion/data-sources.md` | atualizar | registrar schema do jardim quando definido |

## Backlog

- [ ] Definir schema mínimo do jardim e domínio Notion usando o mapa de bases do Notion como referência inicial.
- [ ] Criar shell de `/jardim` e navegação entre subpáginas iniciais.
- [ ] Implementar estágios de nota e texto explicativo do jardim.
- [ ] Implementar filtros por ano e ordem nas listagens.
- [ ] Implementar tratamento específico de "Padrões" e "Trilha" quando houver dados.
- [ ] Validar rotas, responsividade e build.

## Riscos e dependências

| Tipo | Descrição |
|------|-----------|
| Dependência de plano | PLAN-002 deve definir a organização por domínios antes do domínio `jardim`. |
| Dependência externa | O Notion precisa ter propriedades estáveis para estágio, ano, categoria e ordem. |
| Dependência documental | `docs/product/jardim-digital-notion-resume.md` deve continuar atualizado com IDs reais das bases do jardim. |
| Risco | Cada subpágina pode querer schema próprio; forçar um único modelo cedo demais pode criar retrabalho. |
| Risco | O conceito de jardim pode virar texto explicativo demais na UI; a página precisa ser navegável antes de ser didática. |

## Notas de implementação

- Começar pelo menor schema útil: título, status/publicação, estágio, ano, categoria/tipo, data e ordem opcional.
- Preferir filtros por `searchParams` para URLs compartilháveis.
- `CardAvisoEstagio` deve aparecer apenas para `semente`, `broto` e `muda`.
- "Padrões" e "Trilha" dependem de propriedades específicas (`categoria`, `order` ou equivalente).
- A navegação wiki da página de leitura pode consumir esse domínio em uma etapa posterior.

## Conhecimentos consolidados

- Jardim digital é uma frente de produto e conteúdo, não só uma página nova.
- O jardim já tem uma página raiz no Notion e bases separadas para livros, cultura, viagens/lugares, textos, vídeos, cursos e projetos.
- O schema do Notion precisa ser derivado das bases reais antes das subpáginas especiais.
- Os IDs de database do jardim estão documentados em `docs/product/jardim-digital-notion-resume.md`; os `data_source_id` internos ainda não foram confirmados via API.
- A navegação wiki do PLAN-004 depende deste plano, mas não deve bloquear a primeira melhoria da leitura.

## Perguntas em aberto

Perguntas, dúvidas e lacunas vivem em [`questions.md`](./questions.md). Respostas migram para as tasks ou notas de implementação e o item sai do arquivo.

## Referências

- [`docs/product/jardim-digital-notion-resume.md`](../../product/jardim-digital-notion-resume.md)
- [`docs/product/notion/data-sources.md`](../../product/notion/data-sources.md)
- [`docs/patterns/pages.md`](../../patterns/pages.md)

## Log de execução

| Data | O que foi feito |
|------|-----------------|
| 2026-04-19 | Plano revisado para priorizar schema/domínio antes de subpáginas específicas. |
| 2026-04-19 | Adicionada referência ao mapa das bases do jardim digital no Notion. |
