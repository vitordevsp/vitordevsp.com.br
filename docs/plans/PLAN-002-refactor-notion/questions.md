# PLAN-002 — Perguntas em aberto

Arquivo dedicado para registrar perguntas, dúvidas e lacunas deste plano. Quando uma pergunta for respondida, o conhecimento vai para a task ou nota de implementação correspondente e o item sai daqui.

## 1. Localização dos tipos de domínio

Os tipos de `PostProps`, `VideoProps` e `ProjectProps` devem morar em `src/types/notion.type.ts` (global) ou dentro de cada domínio em `src/lib/notion/domains/<domínio>/types.ts`?

**Trade-off:** global facilita import de qualquer lugar; por domínio deixa claro o escopo e evita acoplamento entre domínios distintos.

**Resposta:**


## 2. Escopo do que o domínio exporta

O domínio deve exportar apenas queries prontas (`getPublishedPosts`, etc.) ou também helpers de parsing/formatação para os componentes (ex.: extrair capa, parsear data, normalizar tags)?

**Trade-off:** só queries mantém o domínio fino e empurra formatação para o componente; incluir helpers centraliza regras de leitura mas mistura camada de dados com apresentação.

**Resposta:**


## 3. Teste unitário para `generateNotionPageID`

Vale criar teste unitário cobrindo slug com hífen, sem hífen e ID puro antes de mexer no comportamento (P002-T002)?

**Contexto:** o projeto hoje não tem suite de testes. Criar um caso isolado exigiria decidir runner (vitest? jest?) ou só documentar exemplos no diff.

**Resposta:**


## 4. Trocar (parte do) `PageRenderer` por `retrieve-page-markdown`?

A Notion disponibiliza um endpoint que devolve a página inteira como enhanced markdown em 1 request. Comparação:

| Aspecto | Renderer atual (blocks → JSX) | `retrieve-page-markdown` |
|---|---|---|
| Requests por página | 1 + N (um por subtree com children) | 1 |
| Controle do HTML final | Total | Depende do parser md → JSX |
| Cobertura de tipos | 11 mapeados | Todos, **exceto** bookmarks, embeds, link previews |
| Risco de rate limit | Alto em pages com toggles aninhados | Baixo |
| Dependência extra | Nenhuma | Parser md (unified/remark ou custom) |
| Fidelidade | 100% JSON cru | Perde `<unknown>` blocks; callout/columns viram tags XML |

Fora do escopo desta rodada do plano, mas a decisão influencia se vale **isolar o PageRenderer atrás de uma interface estável agora** (pra tornar a troca futura barata) ou seguir evoluindo o renderer atual sem se preocupar.

**Resposta:**


## 5. Ampliar cobertura de block types?

O `PageRenderer` trata hoje 11 dos ~32 tipos documentados. Caem no fallback (renderizam vazio): `audio`, `bookmark`, `breadcrumb`, `child_database`, `child_page`, `column_list`/`column`, `embed`, `equation`, `file`, `link_preview`, `mention`, `pdf`, `synced_block`, `table`, `table_of_contents`, `tab`, `template`, `transcription`, `video`, `unsupported`.

Candidatos prováveis de aparecer em conteúdo real: **table, equation, column_list, video, bookmark, embed**.

Ampliar agora (preventivo) ou esperar necessidade concreta (pull, não push)?

**Resposta:**
