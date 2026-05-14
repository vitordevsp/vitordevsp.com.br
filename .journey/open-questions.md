# Perguntas abertas

Lacunas narrativas, editoriais e estrategicas que precisam ser respondidas para fortalecer o arco, a oferta futura ou o metodo.

Convencao:
- `[ ]` aberta. `[x]` respondida com link para onde a resposta vive;
- cada pergunta carrega tag de origem `[origem: ep-NNN]` ou `[origem: hero]` / `[origem: timeline]`;
- agrupadas por tema, nao por origem.

## Sobre o protagonista e o chamado

- [x] **[origem: ep-005]** Qual foi a gota dagua que motivou o reset rumo a v3.2? — Mistura de arquitetura insustentavel + impossibilidade de operar com agente sem fonte de verdade estruturada. Respondida em [`hero.md`](./hero.md) ("Incomodo inicial") e [`episodes/005-v32-nasce-com-sdd-desde-primeira-linha.md`](./episodes/005-v32-nasce-com-sdd-desde-primeira-linha.md).
- [ ] **[origem: ep-005]** Em que momento exato a sensacao de "nao da mais" virou decisao de apagar a v3.1.x? Detalhe pessoal que pode virar abertura de post confessional.
- [ ] **[origem: hero]** Qual e o medo mais honesto por tras desta reconstrucao?
- [ ] **[origem: hero]** O que precisa estar verdadeiro no fim da v1 para essa jornada ter valido a pena para o protagonista?
- [ ] **[origem: ep-005]** O que do legado da v3.1.x ainda merece resgate (textos, imagens, arquitetura de informacao)?
- [ ] **[origem: ep-005]** Quanto tempo o experimento na `codex_experiment` durou antes de o reset ser decidido?
- [ ] **[origem: ep-005]** A branch `codex_experiment` vai continuar viva no repo como prova do experimento, ou sera deletada apos a v3.2 sair?

## Sobre o metodo

- [ ] **[origem: hero]** O ciclo `conversa -> sintese -> plano -> task -> execucao -> registro` se sustenta quando o projeto tiver mais de uma frente simultanea?
- [ ] **[origem: hero]** Em que ponto o custo de manter `docs/`, `.claude/` e `.journey/` sincronizados ultrapassa o ganho?
- [ ] **[origem: hero]** Como diferenciar, no dia a dia, decisao que vai para `docs/` de decisao que vira episodio em `.journey/`?
- [ ] **[origem: ep-006]** Quando, ao longo do projeto, sera honesto reabrir subpastas em `docs/`? Que sinal vai indicar?
- [ ] **[origem: ep-006]** O aprendizado "flat vence categorizado" vale tambem para `.claude/skills/` e `.journey/episodes/`, ou e especifico de `docs/`?
- [ ] **[origem: ep-006]** Qual o limite de inflacao aceitavel quando se usa um agente para gerar conteudo inicial vs editar?
- [ ] **[origem: ep-008]** Em que momento da execucao da v1 sera honesto avaliar se os dez planos pagaram seu custo?
- [ ] **[origem: ep-008]** Quais sao os indicadores objetivos de que `plan-000-desktop` virou cemiterio em vez de buffer saudavel?
- [ ] **[origem: ep-008]** Quando uma ideia em `plan-000-desktop` deve ser promovida a plano proprio? Que sinal vai indicar?

## Sobre agentes e contexto

- [x] **[origem: ep-006]** Que tipo de erro de agente tem ensinado mais ate agora? — Documentacao inflando sem freio: agente preenche caixa que humano cria, e a inflacao so e visivel depois. Respondida em [`notes/raw-insights.md`](./notes/raw-insights.md) e [`episodes/006-docs-de-categorizado-pra-flat.md`](./episodes/006-docs-de-categorizado-pra-flat.md).
- [ ] **[origem: hero]** Qual e a fronteira saudavel entre escrever skill nova e usar agente generico com bom prompt?
- [ ] **[origem: hero]** Como medir, mesmo qualitativamente, quando o contexto governado esta de fato reduzindo retrabalho?
- [ ] **[origem: ep-007]** Quais skills do Agents Studio v0.1 vao precisar voltar mais para frente neste projeto (ex: `ast-docs-maintainer`)?
- [ ] **[origem: ep-007]** Qual deveria ser o caminho oficial de versionamento do framework Agents Studio para que reuso entre projetos nao dependa de copy-paste?
- [ ] **[origem: ep-007]** Em que momento o Agents Studio v0.1 deixa de ser framework pessoal e vira framework publico/distribuivel?

## Sobre os resets (meta)

- [ ] **[origem: ep-004]** Se SDD funcionar como antidoto, este sera o ultimo reset total deste repo? Ou reset e padrao permanente?
- [ ] **[origem: ep-004]** Existe um terceiro tipo de reset (filosofico, identitario) que ainda nao apareceu mas pode aparecer?
- [ ] **[origem: ep-004]** Quanto tempo precisa passar entre o reset de 2026 e o proximo (se houver) para confirmar que SDD quebrou o ciclo?
- [ ] **[origem: ep-004]** Existe outra decisao deste repo que sobreviveu a tudo e ainda nao foi formalizada como ADR (portugues, conventional commits, deploy na Vercel)?

## Sobre v1 e v2 (historia antiga)

- [ ] **[origem: ep-002]** Qual foi o motivo concreto que fez o Vitor migrar de APIs externas para Notion em dezembro/2021?
- [ ] **[origem: ep-002]** A v1 e v2 foram motivadas por aprendizado pessoal ou por necessidade publica concreta (cliente, oportunidade)?
- [ ] **[origem: ep-002]** Que parte da v1/v2 ainda se reconhece no Vitor de hoje? Que parte parece de outra pessoa?
- [ ] **[origem: ep-002]** Existe algum componente ou abstracao da v1/v2 que voltou a inspirar uma decisao da v3.2?

## Sobre v3 e v3.1 (historia recente)

- [ ] **[origem: ep-003]** Por que Tailwind durou so um mes (dezembro/2023 a janeiro/2024)? Foi performance, ergonomia, ideologia ou outro motivo?
- [ ] **[origem: ep-003]** O wrapper proprio do Notion (setembro/2025) ainda inspira o codigo da v3.2, mesmo apos o reset total?
- [ ] **[origem: ep-003]** Que parte da v3.1.x merecia ter sobrevivido ao reset 2 e nao sobreviveu?

## Sobre a oferta futura

- [x] **[origem: hero]** Qual e a primeira oferta concreta que faria sentido lancar depois da v1 do site? — Quatro frentes em sequencia: serie publica de SDD aplicado -> templates reusaveis -> curso introdutorio -> comunidade. O fluxo `.journey/` sera replicado em outros projetos como vitrine viva. Respondida em [`hero.md`](./hero.md) ("Oferta futura") e [`seeds/content-seeds.md`](./seeds/content-seeds.md).
- [ ] **[origem: hero]** Que parte desta jornada poderia virar a primeira aula de um curso de SDD?
- [ ] **[origem: hero]** Que transformacao uma pessoa precisa enxergar acompanhando essa serie para querer adotar o metodo?
- [ ] **[origem: hero]** Quais sao os primeiros projetos do Vitor que vao receber o fluxo `.journey/` para virar vitrine?

## Sobre o jardim digital

- [ ] **[origem: ep-001]** Qual e a unidade minima de conteudo que vai sustentar publicacao continua sem virar fardo?
- [ ] **[origem: ep-001]** Como o jardim digital se relaciona com episodios de `.journey/` sem duplicar texto?
- [ ] **[origem: ep-009]** Os episodios publicos no jardim digital vao apontar para os arquivos brutos em `.journey/`, ou vao tratar `.journey/` como bastidor privado?

## Sobre `.journey/` (meta-narrativa)

- [x] **[origem: ep-009]** Quando o EP-009 (criacao do fluxo journey) vai ser populado de verdade? — Resolvido em 2026-05-14, apos a entrega da skill `1.3.0` (camada de scripts). Marco simbolico do fechamento do ciclo de criacao do fluxo. Detalhe em [`episodes/009-criacao-do-fluxo-journey.md`](./episodes/009-criacao-do-fluxo-journey.md).
- [x] **[origem: ep-009]** O fluxo `.journey/` precisa de scripts proprios? — Sim. Resolvido em `1.3.0` (2026-05-14) com 7 scripts em `.claude/skills/journey-writer/scripts/`: `validate.sh`, `extract-sessions.sh` (interativo, 6 perguntas), `extract-conversation.sh` (USER+ASSISTANT), `reorganize.py`, `gen-rescue-prompt.py`, `episode-status-map.py`, `source-add.py`. Pattern em [`pattern-scripts.md`](../.claude/skills/journey-writer/references/pattern-scripts.md).
- [ ] **[origem: ep-009]** Qual o primeiro projeto do Vitor que vai receber `.journey/` apos esse?
- [ ] **[origem: ep-009]** Quando promover scripts de PyYAML para `ruamel.yaml`? — Adiar ate preservacao de formato/comentarios virar problema real.
