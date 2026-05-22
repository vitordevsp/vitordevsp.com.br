---

title: EP-002 - v1 e v2, os anos de aprendizado da base
status: draft
type: cronologico
metadata:
  owner: journey-writer
  created_at: 2026-05-13 18:10
  updated_at: 2026-05-13 18:10
  tags:
    - episode
    - cronologico
    - v1
    - v2
    - historia-antiga
  era: v1-v2
  lentes:
    - chamado
    - metodo
    - descoberta
  sources:
    sessions: []
    commits:
      - 42a2075
      - 36443e0
      - 7c85c1c
      - e2f9738
      - d54dff5
      - 7a5de59
      - a212059
      - c234f81
      - e89bc67
      - 25dd5a5
      - f25632d
    files:
      - CHANGELOG.md
    note: episodio cronologico antigo, anterior a sessoes Claude Code disponiveis. Material vem de git log + CHANGELOG.
last_review: 2026-05-13 20:30

---

# EP-002 — v1 e v2, os anos de aprendizado da base

## Sobre este episodio

Cobre o periodo 2021-05-25 a 2022-03-11, da v1.0.0 (Chakra UI + APIs externas) a v2.0.0 (Notion como CMS + API Routes internas). Os anos da base: aprendizado tecnico que sustentou tudo o que veio depois.

Episodio escrito a partir de commits (CHANGELOG e `git log`). A precisao narrativa virara mais alta quando o Vitor refinar com memoria pessoal. Por enquanto, e mapa cronologico denso, nao narrativa polida.

## Gancho

Antes de existir SDD, antes de existir Notion como fonte de verdade, antes de qualquer agente de IA — existia uma pasta `src/` com componentes Chakra e tres services hardcoded buscando dados de tres APIs externas.

Era assim que se construia presenca publica. E assim foi a v1.

## v1.0.0 — Chakra + APIs externas (2021-05-25 a 2021-10-14)

### Arco

Cinco meses. Da pasta vazia ao primeiro deploy estavel da presenca publica.

A v1 nasceu como exploracao classica do Next.js + Chakra UI, com TypeScript desde o inicio. Tudo construido manualmente: componente por componente, pagina por pagina, service por service.

### Tecnico

Stack: Next.js + Chakra UI + TypeScript + Axios.

Componentes criados: `ActiveLink`, `IconLink`, `Toolbar`, `Logo`, `Main`, `HeaderMobile`, `TitleSection`, `Badge`, `BadgeTech`, `SectionBadgesTechs`, `CardInfo`, `CardInfoLarge`, `CardPost` (depois renomeado para `CardTexts`), `FlexGap` (workaround para bug do iOS).

Paginas: Home, Projects, Videos, Posts, About.

Services hardcoded buscando dados de tres APIs externas:

- YouTube: videos com fallback de thumbnails maxres;
- Dev.to: posts;
- GitHub: repositorios com tratamento de erro.

Configuracao por env: cada service tinha seu proprio `username` parametrizavel.

### Aprendizados visiveis na propria sequencia de commits

- responsividade veio depois da estrutura, nao antes — primeiro cards, depois mobile;
- nomenclatura mudou no meio do caminho (`CardPost` -> `CardTexts`) sinalizando que o conceito original era estreito demais;
- README so apareceu em 2021-06-30, depois do produto ja estar funcional. Documentacao chegou tarde — padrao que a v3.2 inverteria cinco anos depois;
- bumps de dependencia (Next 10 -> 11, Axios 0.21.1 -> 0.21.2) ja apareciam via Dependabot, mostrando que CI/automacao estava em jogo desde cedo.

### Aprendizado meta

A v1 ensinou o basico: como estruturar um Next.js, como abstrair APIs externas, como pensar componentizacao em React. Foi a fundacao tecnica que o Vitor carregaria implicitamente nas versoes seguintes — mesmo apos os resets totais, esses padroes mentais sobreviveram.

> Hipotese editorial (a refinar): o Vitor de 2021 ainda confiava em "buscar dados onde eles vivem". Em 2022, viraria "trazer todo conteudo para um lugar so" (Notion).

## v1.0.0 -> v2.0.0 — Migracao para Notion (2021-10-14 a 2022-03-11)

### Arco

Cinco meses de transformacao. Saiu da arquitetura "tres APIs externas, render direto" e chegou em "Notion como fonte unica + API Routes internas como camada de abstracao".

### Tecnico

Adicionou:

- `@notionhq/client`;
- services Notion para posts, projects e videos;
- modulo `content` como abstracao de leitura;
- `getBlocksFromPage` e `getFullPost` com recursividade para resolver toda a arvore de blocos do Notion (incluindo filhos);
- `parseBlocksToComponents` e `MapComponent` para transformar blocos do Notion em componentes React (`numbered_list_item` foi um dos primeiros tipos suportados);
- estrutura de tipagem para os blocos do Notion;
- `pageSlug` com loading e responsividade para renderizar post completo;
- `notionRepository` abstraindo a lib do Notion;
- API Routes internas: `/posts`, `/videos`, `/projects`, `/contents`;
- arquivos `.http` documentando as rotas;
- cliente Axios proprio com baseURL completa para chamar API Routes internas;
- `DateUtil` para formatar datas.

Mudou:

- todas as paginas (`home`, `posts`, `post`, `projects`, `videos`) passaram a buscar dados via API Routes internas, em vez de chamar APIs externas direto;
- pasta `components` reorganizada para clareza;
- filtros e paginacao (`pageSize`) padronizados;
- ordem da navegacao editada.

### Decisoes que se confirmaram com o tempo

#### Notion como CMS — o fio que sobreviveu a tudo

Esta foi, retrospectivamente, a decisao mais durável tomada no projeto. Em 2021-12-05 (commit `c234f81`), o Notion entrou como fonte de dados. Cinco anos, tres versoes maiores e dois resets totais depois, continua sendo o CMS deste site.

Tudo o mais mudou: Chakra virou Tailwind virou Sass+BEM virou (na v3.2) CSS Modules. Services hardcoded para YouTube/Dev.to/GitHub viraram API Routes internas viraram wrapper proprio. Componentes foram reescritos do zero duas vezes.

Notion ficou.

Razoes que mantiveram a decisao por tanto tempo:

- **Notion ja era onde o conteudo nascia.** O Vitor escrevia no Notion antes de publicar em qualquer lugar. Mover para outro CMS exigiria mudar o local de escrita, nao so o local de leitura;
- **interface de edicao gratis.** Nenhum CMS headless (Sanity, Contentful, Strapi, Hygraph) tem editor melhor que o Notion para texto longo, blocos heterogeneos, listas e referencias cruzadas;
- **aposta de longa duracao por evidencia, nao por preferencia ideologica.** Ja sustentou tres versoes maiores; provavel que sustente a quarta.

A virada formal aconteceria so na v3.2 (2026-05-12), quando a decisao virou `ADR-002-notion-as-cms.md` — primeira vez que foi documentada como compromisso normativo, depois de cinco anos de uso na pratica. Episodios sobre isso: ver `[003-v3-e-v3.1-sass-bem-e-notion-continua.md](./003-v3-e-v3.1-sass-bem-e-notion-continua.md)` (sobrevivencia ao reset 1) e `[005-v32-nasce-com-sdd-desde-primeira-linha.md](./005-v32-nasce-com-sdd-desde-primeira-linha.md)` (formalizacao em ADR).

> Hipotese editorial: identidade tecnica vem da decisao que voce nao troca. Para o Vitor, e Notion como fonte de verdade do conteudo.

#### Outras decisoes da v2 que atravessaram versoes

- **camada de abstracao para a lib do Notion** (`notionRepository`) seria reaproveitada conceitualmente nas versoes seguintes — o wrapper proprio da v3.1 e descendente dessa ideia;
- **API Routes internas** como ponte entre Notion e UI seria abandonada na v3 (que voltaria a buscar dados direto), mas o aprendizado de "ter contrato proprio para fonte externa" permaneceu.

### Aprendizado meta

A v2 marcou a transicao de "consumir dados externos" para "controlar a fonte de conteudo". Pela primeira vez, o Vitor decidiu onde o conteudo nasce (Notion), nao apenas onde ele aparece (site).

Essa mudanca de mentalidade — de consumidor de APIs para curador de conteudo proprio — e o embriao do que viraria SDD anos depois: decidir contratos antes de implementar consumidores.

> Hipotese editorial (a refinar): a v2 e onde o Vitor para de pensar "como faco essa pagina" e comeca a pensar "como organizo o conteudo que alimenta varias paginas". Pequena virada, grande consequencia.

## O que estes anos sustentaram

- **base tecnica:** dominio de Next.js, TypeScript, abstracao de servicos, componentizacao;
- **decisao de longa duracao:** Notion como CMS;
- **postura curatorial:** controlar a fonte de conteudo, nao so o consumo;
- **disciplina minima de devops:** Conventional Commits desde a v1, Husky, Commitlint, Commitizen, Dependabot, ESLint configurado.

Tudo isso atravessou os dois resets totais (2023 e 2026) como conhecimento tacito do protagonista, mesmo quando o codigo foi apagado.

## Possivel conteudo publico

- Formato sugerido: estudo de caso retrospectivo + post arqueologico
- Titulo possivel: "O que ficou dos meus dois primeiros anos de site, mesmo apos apagar tudo duas vezes"
- Promessa: aprendizado tacito que sobrevive a reset total
- Publico: devs reflexivos sobre evolucao de longo prazo de projetos pessoais

## Perguntas abertas

- Qual foi o motivo concreto que fez o Vitor migrar de APIs externas para Notion em dezembro/2021?
- A v1 e v2 foram motivadas por aprendizado pessoal ou por necessidade publica concreta (cliente, oportunidade)?
- Que parte da v1/v2 ainda se reconhece no Vitor de hoje? Que parte parece de outra pessoa?
- Existe algum componente ou abstracao da v1/v2 que voltou a inspirar uma decisao da v3.2?

## Fragmentos aproveitaveis

> A v1 ensinou estrutura. A v2 ensinou curadoria. As duas juntas formaram a base tacita que sobreviveu aos dois resets totais.

> Documentacao chegou tarde na v1 (README so em 2021-06-30, dois meses depois do projeto comecar). A v3.2 inverteria isso cinco anos depois.

> Hipotese editorial: a v2 foi a primeira vez em que o Vitor decidiu onde o conteudo nasce — embriao mental do que viraria SDD.

## Commits relacionados

Marcos da v1:

- `42a2075` (2021-05-25): "Initial commit from Create Next App" — primeiro dia.
- `36443e0` (2021-05-26): "feat: adicionando e configurando o chakra-ui".
- `7c85c1c` (2021-06-05): "feat: add icons" — paginas principais ja existindo.
- `e2f9738` (2021-06-07): primeiro service externo (YouTube).
- `d54dff5` (2021-06-30): "docs: adicionando README" — documentacao tarde.
- `7a5de59` (2021-10-14): tag `v1.0.0`.

Marcos da v2:

- `a212059` (2021-12-05): "chore: add @notionhq/client".
- `c234f81` (2021-12-05): "feat: criando service do notion:posts" — Notion entra como CMS.
- `e89bc67` (2022-02-17): "feat: criando a função getBlocksFromPage" — primeiro passo da renderizacao de post.
- `25dd5a5` (2022-02-28): "feat: criando as rotas /posts -> controller" — API Routes internas.
- `f25632d` (2022-03-11): tag `v2.0.0`.

Para visao completa, ver `[../../CHANGELOG.md](../../CHANGELOG.md)`.