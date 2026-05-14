# Arco da Jornada

Versao baseada em material real extraido das conversas em `claude_experiment`.

## Protagonista

Vitor Sampaio. Desenvolvedor com base tecnica solida, presenca publica anterior (v3.1.x do site, no ar ate maio/2026), agora reconstruindo nao apenas o site, mas o proprio jeito de criar produtos digitais com agentes de IA.

A jornada nao e "quero um site novo". E "quero um metodo proprio de SDD aplicado, e o site pessoal e o primeiro laboratorio onde esse metodo nasce".

## Mundo comum

Antes do reset de 2026-05-04, o site vivia na v3.1.x: Sass + BEM, Notion v2 wrapper proprio (`@notionhq/client` recente, com fonte de dados ja migrada para nova database em set/2025), Vercel Analytics, paginas Home/Sobre/Projetos/Posts/Videos com responsividade SCSS via mixins. Tecnicamente bem. No ar. Estavel.

A v3.1.x ja era o resultado de um reset anterior (2023-12-05, rumo a v3) que tinha apagado a v2 (Chakra UI + Notion antigo + API Routes internas) por motivos tecnicos. Ou seja: o modo antigo apagado em 2026 nao era stack envelhecida — era stack moderna que so nao acomodava SDD por dentro.

O modo de trabalho era o classico: abrir editor, lembrar do contexto, escrever codigo, eventualmente abrir um agente, jogar prompt solto. Quando o agente respondia bem, ganhava-se velocidade. Quando perdia contexto, voltava-se a fazer manualmente.

A documentacao era o `README.md` e a memoria pessoal.

## Incomodo inicial

Dois problemas se misturaram ate virar um so:

1. arquitetura da v3.1.x estava insustentavel para receber SDD por dentro. Introduzir tres camadas (`docs/`, `.claude/`, `.journey/`), CSS Modules e Notion como fonte de verdade controlada exigiria reescrever tanto que sairia mais caro que reconstruir;
2. usar agente sobre o projeto antigo ensinou que sem fonte de verdade estruturada o agente nao ajuda — ele desvia, inventa, esquece, e o custo de auditar a saida fica maior que o ganho.

Os dois somados produziram a virada: este reset nao e troca de stack (como foi o de 2023, rumo a v3), e troca de modo de criar.

## Chamado para a aventura

Em 2026-05-04, decisao explicita: apagar a v3.1.x (apos tentativa frustrada de conserto na branch `codex_experiment`), abrir nova branch `claude_experiment` e comecar Next.js do zero — "deixe so um Hello World e vamos comecar a trabalhar". Reset completo, rumo a v3.2.

A pergunta deixou de ser "qual stack" e virou "como organizar contexto para que humano e agente decidam juntos sem perder coerencia entre sessoes".

## Resistencias

- duvida sobre superengenharia: 10 planos, tres camadas (`docs/`, `.claude/`, `.journey/`), 5 ADRs — vale a pena pra um site pessoal?
- tentacao recorrente de cair no modo antigo ("ja sei o que fazer, deixa eu so codar");
- risco de manter tres camadas em sincronia virar fardo maior que o ganho;
- desconfianca natural de acreditar em metodo no meio do caminho, antes da prova.

> Em aberto: qual e o medo mais honesto por tras dessa reconstrucao?

## Mentores e ferramentas

- **SDD** como filosofia de origem;
- **Claude Code** como agente principal de execucao;
- **Agents Studio v0.1** — framework operacional pessoal do proprio Vitor, desenvolvido em outro projeto e reusado aqui como base para `.claude/skills/`. Este projeto e o primeiro teste de reuso fora do projeto-fonte;
- **Notion** como CMS editorial, deslocando responsabilidade de conteudo pra fora do codigo. Unica decisao arquitetural que sobreviveu aos dois resets totais (absorvida em [`episodes/002-v1-e-v2-anos-de-aprendizado-base.md`](./episodes/002-v1-e-v2-anos-de-aprendizado-base.md), [`episodes/003-v3-e-v3.1-sass-bem-e-notion-continua.md`](./episodes/003-v3-e-v3.1-sass-bem-e-notion-continua.md) e [`episodes/004-reset-total-como-marca.md`](./episodes/004-reset-total-como-marca.md));
- skills proprias: `ast-plan-writer`, `ast-task-writer`, `ast-skill-writer`, `ast-release-manager`, `journey-writer`;
- camada `docs/` como contrato humano para decisao normativa;
- camada `.claude/` como contrato operacional para agentes;
- camada `.journey/` como bastidor narrativo do processo.

## Provacoes

Provacoes ja vividas nesta branch (detalhe nos episodios cronologicos correspondentes):

- **conserto frustrado na branch paralela** ([`episodes/005-v32-nasce-com-sdd-desde-primeira-linha.md`](./episodes/005-v32-nasce-com-sdd-desde-primeira-linha.md)) — `codex_experiment` testou se dava pra introduzir SDD na v3.1.x sem reset. Custo alto demais. Confirmou a necessidade do reset;
- **documentacao inflando sem freio** ([`episodes/006-docs-de-categorizado-pra-flat.md`](./episodes/006-docs-de-categorizado-pra-flat.md)) — `docs/` nasceu em 5 subpastas, virou flat 4 dias depois (-60% linhas). "Mais flat" virou refrao;
- **refs orfas no reuso de skills** ([`episodes/007-skills-trazidas-do-agents-studio.md`](./episodes/007-skills-trazidas-do-agents-studio.md)) — Agents Studio v0.1 chegou com 7 skills, sobreviveram 4. Poda virou metodo;
- **roadmap.md vs `.claude/plans/`** ([`episodes/008-dez-plans-em-draft.md`](./episodes/008-dez-plans-em-draft.md)) — manter os dois virou ruido. Roadmap absorvido integralmente nos plans, depois deletado.

Provacoes esperadas:

- migrar conteudo legado sem recriar padroes antigos;
- manter as tres camadas em sincronia conforme decisoes mudam;
- evitar que `.journey/` vire changelog disfarcado;
- sustentar publicacao continua sem virar refem do proprio metodo.

## Metodo emergente

Dois padroes ja se repetem o suficiente para nomear:

**Ciclo principal:**
1. conversa explora intencao;
2. sintese vira decisao normativa em `docs/` ou contrato operacional em `.claude/`;
3. plano em `.claude/plans/` quebra a frente grande em fases;
4. task em `.claude/tasks/` ou em `plans/<plan>/tasks/` aterriza unidade verificavel;
5. execucao acontece com agente operando sobre contexto governado;
6. registro narrativo em `.journey/` captura tensao, decisao e aprendizado.

**Padrao de reuso entre projetos (`trazer-podar-inflar-enxugar-carregar`):**
1. trazer estrutura de outro projeto (Agents Studio v0.1);
2. podar referencias orfas e nomes que nao cabem no contexto local;
3. inflar (criar tudo o que parece util);
4. enxugar para layout flat depois que a inflacao revela o que e ruido;
5. carregar candidatos pos-v1 num plano carry-over (`plan-000-desktop`) pra nao perder ideia mas nao inflar escopo.

> Hipotese editorial: esses dois ciclos juntos sao o nucleo do metodo que pode ser ensinado depois.

## Transformacao

De executor para designer de sistemas de execucao.

De programador que escreve codigo direto para arquiteto de contexto que governa como humanos e agentes decidem juntos.

De prompts improvisados para artefatos versionados.

De projeto que depende de memoria pessoal para projeto que sustenta o proprio raciocinio em camadas legiveis.

## Elixir

Um framework reusavel — `.claude/` + `.journey/` + skills — para criar produtos digitais com agentes de IA sem perder coerencia, contexto ou autoria.

Algo que outras pessoas possam adotar sem precisar refazer o caminho do zero.

## Oferta futura

A jornada vai sustentar quatro frentes em sequencia, executadas em passos estruturados, nao todas de uma vez:

1. **serie publica de SDD aplicado** — posts e videos no jardim digital, alimentados pelos episodios desta pasta;
2. **templates reusaveis** — `.claude/`, `.journey/` e skills empacotados como kit aberto. Lead magnet e demonstracao do metodo;
3. **curso introdutorio de SDD com agentes** — produto educacional construido a partir do metodo emergente ja consolidado;
4. **comunidade / mentoria** — espaco para praticar SDD em projetos reais, com receita recorrente.

> Decisao registrada: o fluxo `.journey/` sera replicado em outros projetos do Vitor. Cada projeto vira vitrine viva do metodo. Multiplicar implementacoes do framework reforca a oferta antes mesmo do curso ou da comunidade existirem.
