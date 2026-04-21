# PLAN-005 — Perguntas em aberto

Arquivo dedicado para registrar perguntas, dúvidas e lacunas deste plano. Quando uma pergunta for respondida, o conhecimento vai para a task ou nota de implementação correspondente e o item sai daqui.

## 1. Organização dos dados do jardim no Notion

O jardim será alimentado por um banco único (com `tipo` como propriedade discriminadora) ou por várias bases por tipo de conteúdo (textos, vídeos, livros, etc.)?

**Contexto:** o mapa inicial em [`docs/product/jardim-digital-notion-resume.md`](../../product/jardim-digital-notion-resume.md) já lista várias bases separadas. A pergunta é se elas serão unificadas por uma view/propriedade comum ou consumidas individualmente pelo domínio.

**Trade-off:** base única simplifica filtros globais (estágio, ano) mas restringe schemas específicos; múltiplas bases mantêm schema por tipo mas exigem união explícita para listagens agregadas.

**Hipótese reforçada (de `docs/product/notes-context-notion.md` §7 e §10):** múltiplas bases por tipo, cada uma com schema próprio e vocabulário próprio de `Status`. Confirmar.

**Resposta:**


## 2. Recorte do MVP das subpáginas

Quais subpáginas do jardim entram no primeiro ciclo: marcos, ensaios, trilha, vídeos, posts e padrões — ou só um subconjunto?

**Por que importa:** cada subpágina pode ter schema e UI próprias. Entregar todas de uma vez amplia superfície de erro; entregar um recorte permite iterar com conteúdo real antes de generalizar.

**Resposta:**


## 3. Origem do texto explicativo do jardim

A página que explica o conceito de jardim digital (para onde o `CardAvisoEstagio` aponta) será estática no código ou uma nota vinda do Notion?

**Trade-off:** estática é mais simples e versionada no repo; Notion mantém paridade editorial com o resto do conteúdo mas adiciona uma dependência de fetch numa página que muda pouco.

**Hipótese inicial (de `docs/product/notes-context-notion.md` §9.5):** Notion. O princípio operacional "tratar Notion como CMS público: fonte de verdade do conteúdo" sugere que textos editoriais do jardim devem morar lá. Precisa confirmação.

**Resposta:**


## 4. Conexões de um Marco com outros textos

O schema confirma que **Marcos** moram na base `Textos` discriminados por `Wiki = "Marco digital"` (§10). O que ainda falta decidir é como as conexões ramificadas (característica do formato Marco como hub) são expressas:

- apenas via links inline no corpo da página (atual padrão editorial do Notion);
- via propriedade `relation` para outras pages da mesma base;
- via propriedade `multi_select` de tag compartilhada (tema do marco).

**Por que importa:** define se a página de um marco no site precisa resolver relations ou apenas renderizar o corpo com `PageRenderer`.

**Hipótese forte (de `docs/product/notes.context-gpt.md`):** o doc afirma literalmente "conexão entre ideias é feita de forma manual: links diretos entre posts" e trata backlinks como evolução futura. Aponta para **links inline no corpo** no MVP. Confirmar.

**Resposta:**


## 5. Exposição do Changelog no site

O schema confirma que **Changelog** é `Wiki = "Changelog"` dentro da base `Textos` (§10). A pergunta restante é se o formato ganha visibilidade dedicada no site:

- subpágina `/jardim/changelog` listando só os itens `Wiki = "Changelog"` em ordem cronológica reversa;
- apenas aparece misturado no feed geral de textos publicados;
- vira um widget em outra página (ex.: bloco de "últimas atualizações" no `/sobre` ou na home).

**Por que importa:** define se Changelog conta como subpágina do jardim (entra no recorte da Q2).

**Resposta:**


## 6. Regra de publicação (público vs privado)

Qual propriedade do Notion marca uma página como "exposta no jardim público"?

**Pista do código atual:** a home e as páginas de posts hoje filtram por `Publicado Em is_not_empty` (ver [`src/app/(pages)/(home)/page.tsx:29`](src/app/(pages)/(home)/page.tsx#L29)). Ou seja, **ter data em `Publicado Em` já é o filtro de publicação implícito**.

**Dois eixos independentes:** o doc `notes.context-gpt.md` fala em `rascunho / em evolução / publicado`, enquanto o schema real do Notion tem `Status` com vocabulário de maturidade (`Semente / Broto / Muda / Planta / Arvore`). Tratar como dimensões distintas: **publicação** é `Publicado Em is_not_empty` (controla visibilidade pública); **maturidade** é `Status` (controla sinalização visual do estágio via `EstagioNota`). Um texto pode estar publicado e ainda ser `Semente`.

**Hipótese:** adotar `Publicado Em is_not_empty` como regra padrão para todas as bases do jardim (Textos, Vídeos, Projetos) e confirmar se Livros/Cultura/Viagens seguem a mesma regra ou têm filtro próprio (ex.: `State` em Livros).

**Resposta:**


## 7. Estrutura de Trilha

O schema atual da base `Textos` **não tem** propriedade `ordem` nem `trilha`. Como então modelar uma trilha (sequência curada de leitura)?

- criar um texto-hub (como Marco) que lista os textos em ordem no próprio corpo;
- adicionar propriedade `trilha` (multi_select) + `ordem` (number) em `Textos`;
- deixar Trilha fora do MVP até haver necessidade editorial concreta.

**Por que importa:** ou o schema precisa crescer, ou o site lê a ordem de uma página "hub" via `PageRenderer` + parsing de links.

**Resposta:**


## 8. Tratamento de Padrões & Gists como página

O schema confirma que **Padrões & Gists** é uma **página**, não um database, e está vazia hoje (§10). Dois caminhos:

- renderizar com `PageRenderer` como qualquer outra página (fica dinâmico conforme o conteúdo da página crescer no Notion);
- tratar como shell estático no site até haver conteúdo concreto e só depois decidir o formato.

**Hipótese:** usar `PageRenderer` direto — reaproveita a pipeline que já renderiza posts e evita código especial para uma página vazia.

**Resposta:**


## 9. Ensaios como view, formato ou filtro de maturidade

O vocabulário de `Wiki` em `Textos` **não tem** o valor `Ensaio`. Então "Ensaios" na estrutura alvo é:

- uma view sobre `Textos` filtrada por `Status in [Planta, Arvore]` (textos maduros);
- uma view filtrada por `Wiki in [conjunto de editorias ensaísticas]`;
- um formato futuro que vai ser adicionado como novo valor de `Wiki`.

**Por que importa:** define se `/jardim/ensaios` é uma query com filtro conhecido hoje ou espera definição editorial.

**Resposta:**


## 10. Uso da propriedade `Wiki` em Textos

A propriedade `Wiki` (select) tem 17 valores mistos: categorias editoriais (`A.I`, `UI/UX`, `Sociologia`, `Programação`), formatos (`Marco digital`, `Changelog`, `Revisões de alinhamento`), e projetos específicos (`Site pessoal`, `My Finances`, `Monitor de treinos`). Como o site trata essa taxonomia?

- mapeia todos os valores para rotas/categorias (ex.: `/jardim/ai`, `/jardim/ui-ux`, etc.);
- filtra só um subconjunto "editorial" e deixa o resto invisível (ex.: `Site pessoal` e `My Finances` são de organização interna);
- usa `Wiki` como rótulo visual no card, sem gerar rota própria.

**Por que importa:** afeta geração de rotas dinâmicas, listagens e ordenação. A taxonomia mista sugere que nem todo valor deveria virar rota pública.

**Inspiração (de `docs/resources/notes-maggie-site-reference.md`):** tratar tipos/editorias como **formas de leitura**, não como entidades rígidas. Isso favorece usar `Wiki` como filtro/view editorial (rótulo + agrupamento em listagens) em vez de criar rota estática por valor, pelo menos enquanto a taxonomia estiver instável.

**Resposta:**


## 11. Consumo do jardim por IA como requisito de produto

O doc `notes.context-gpt.md` inclui entre os resultados desejados que o site "sirva como base de contexto para IA" e "permita leitura eficiente por agentes". Isso tem implicações que não estão em nenhum plano ainda:

- o site precisa expor feed/sitemap estruturado (RSS, JSON feed, `/llms.txt`) para agentes?
- endpoints de conteúdo em markdown bruto (paralelo ao HTML renderizado) são parte do MVP do jardim ou frente futura?
- o HTML do `PageRenderer` precisa ganhar mais semântica (ex.: `<article>` com microdata, headings com `id` estáveis) para ser legível por agentes?

**Por que importa:** se isso entra no MVP, o `PageRenderer` e as rotas de listagem ganham requisitos semânticos/estruturais antecipados; se fica para depois, vira plano próprio.

**Resposta:**
