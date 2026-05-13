---
name: journey-writer
description: "Transforma conversas, decisões, planos e registros de desenvolvimento em narrativa pública dentro de `.journey/`, com foco editorial, storytelling de SDD e geração futura de conteúdo, sem virar documentação técnica."
compatibility: "Projetada para Agents Studio v0.1. Opera somente em projetos que aceitam manter uma camada narrativa `.journey/` separada de `docs/` e da implementação."
metadata:
  author: agents-studio
  last_updated: 2026-05-13 00:00
  version: "1.0.0"
---

# journey-writer

## Inicio rapido

1. Leia a primeira frase do usuario e classifique a acao principal: `inicializar`, `analisar-insumo`, `registrar`, `refinar` ou `colher-conteudo`.
2. Verifique se `.journey/` ja existe na raiz do projeto e mapeie quais arquivos estao presentes.
3. Identifique o tipo de insumo (`conversa`, `decisao`, `plano`, `erro`, `reflexao`, `mudanca-de-direcao`, `duvida`, `conteudo-bruto`).
4. Classifique o material pelas lentes narrativas (`chamado`, `atrito`, `descoberta`, `metodo`, `transformacao`, `oferta`) antes de decidir destino.
5. Escreva ou atualize apenas o arquivo certo dentro de `.journey/`, sem misturar com `docs/` ou changelog.
6. Quando faltar contexto editorial, faca perguntas objetivas guiadas por `references/pattern-journey-authoring.md`.
7. Feche cada registro validando a checklist de qualidade e marcando seeds de conteudo futuro.

## O que esta skill faz

- inicializar a estrutura `.journey/` quando ela ainda nao existe;
- analisar insumos brutos (conversa, decisao, plano, reflexao, erro) e decidir onde virar registro narrativo;
- registrar marcos em `timeline.md`, episódios em `episodes/`, sementes em `seeds/content-seeds.md` e fragmentos em `notes/raw-insights.md`;
- refinar o arco principal em `hero.md` e perguntas abertas em `open-questions.md`;
- colher seeds de conteudo publico (post, video, aula, newsletter, lead magnet) a partir de registros ja existentes;
- preservar separacao estrita entre narrativa (`.journey/`) e documentacao tecnica (`docs/`).

## Quando usar

- houve conversa, decisao, virada ou aprendizado relevante sobre SDD, agentes, contexto ou reconstrucao do projeto;
- o projeto comecou e ainda nao tem camada narrativa registrada;
- existe insumo bruto que pode virar post, video, aula, newsletter ou lead magnet;
- uma mudanca de direcao precisa ser capturada antes de virar retrospectiva;
- ha duvida ou frustracao com agentes que ensina algo reutilizavel.

## Quando nao usar

- o pedido e documentacao tecnica, README, PRD, SPEC, AGENTS.md, ADR ou changelog;
- o conteudo e detalhe sensivel interno do projeto;
- nao existe elemento narrativo (transformacao, tensao, decisao, aprendizado) no insumo;
- o objetivo e marketing artificial ou narrativa inventada que nao aparece nos insumos.

## Acoes que esta skill interpreta

| Acao | Quando usar | Entradas esperadas | Saidas esperadas |
|------|------|------|------|
| `inicializar` | `.journey/` ainda nao existe ou esta incompleto | confirmacao do usuario, contexto inicial do projeto, nome do protagonista | estrutura base em `.journey/` com `README.md`, `hero.md` rascunho, `timeline.md`, `open-questions.md`, `episodes/000-template.md`, `seeds/content-seeds.md`, `notes/raw-insights.md` |
| `analisar-insumo` | usuario traz material bruto e quer saber onde registrar | trecho da conversa, link/cita do plano ou decisao, contexto temporal | classificacao por tipo, lente e estagio da jornada; recomendacao de destino antes de escrever |
| `registrar` | ja existe clareza editorial sobre o destino | tipo de registro alvo (`marco`, `episodio`, `semente`, `fragmento`) e material destilado | arquivo certo criado ou atualizado em `.journey/`, com tom autoral preservado |
| `refinar` | `hero.md`, episódio ou `open-questions.md` precisa amadurecer | arquivo alvo, nova evidencia, lacuna a fechar | mesmo arquivo evoluido sem duplicacao, com hipoteses marcadas como hipoteses |
| `colher-conteudo` | registros existentes ja tem material para virar oferta publica | recorte de episódios ou marcos relevantes | entradas novas em `seeds/content-seeds.md` com formato, tese, publico e relacao com SDD |

Se a primeira frase do usuario vier ambigua, prefira `analisar-insumo` e devolva a recomendacao de destino antes de escrever. Pergunte antes de escrever quando a duvida afetar `hero.md` ou criar episódio novo.

Nomes equivalentes que podem aparecer na frase inicial do usuario:

- `iniciar-jornada`, `bootstrap-journey`
- `classificar-insumo`, `triagem-narrativa`
- `adicionar-marco`, `novo-episodio`, `nova-semente`
- `atualizar-hero`, `evoluir-arco`

## Entradas tipicas

- frase inicial descrevendo a acao;
- insumo bruto: trecho de conversa, decisao, plano, erro, reflexao ou conteudo;
- data ou marco temporal do acontecimento;
- nivel de exposicao desejado (privado, semi-publico, publico);
- referencias relacionadas em `docs/`, `.claude/plans/` ou commits.

Se a data nao for explicita, registre a data atual em formato ISO `AAAA-MM-DD` e marque como hipotese quando o acontecimento for retroativo.

## Como ler um insumo

Para cada novo insumo, siga o workflow:

1. classificar tipo (`conversa`, `decisao`, `plano`, `erro`, `reflexao`, `mudanca-de-direcao`, `duvida`, `conteudo-bruto`);
2. extrair elementos narrativos (`conflito`, `decisao`, `aprendizado`, `virada`, `consequencia`, `pergunta-aberta`, `conteudo-potencial`);
3. classificar estagio da jornada (`mundo-comum`, `chamado`, `resistencia`, `metodo`, `provacao`, `recompensa`, `integracao`, `ensino`);
4. escolher destino (`hero.md`, `timeline.md`, `episodes/`, `open-questions.md`, `seeds/content-seeds.md`, `notes/raw-insights.md`);
5. separar fato, interpretacao e hipotese editorial;
6. so escrever quando o destino estiver decidido.

Detalhe completo das lentes, principios editoriais e tom em [`references/pattern-journey-authoring.md`](./references/pattern-journey-authoring.md).

## Workflow recomendado

1. Ler a frase inicial e classificar a acao principal.
2. Verificar estado atual de `.journey/` (existe ou nao, quais arquivos, quais marcos).
3. Para `inicializar`, copiar templates de `assets/` e adaptar protagonista, mundo comum e incomodo inicial com material do usuario.
4. Para `analisar-insumo`, devolver classificacao + destino sugerido antes de escrever.
5. Para `registrar`/`refinar`, abrir o arquivo alvo, preservar estilo existente e acrescentar sem duplicar.
6. Para `colher-conteudo`, varrer episódios e marcos e adicionar seeds com formato, titulo possivel, tese, publico e relacao com SDD.
7. Validar a checklist de qualidade em `references/pattern-journey-authoring.md`.
8. Atualizar `references/version-history.md` quando a estrutura ou o contrato da skill mudar.

## Estrutura minima esperada da pasta `.journey/`

```text
.journey/
├── README.md
├── hero.md
├── timeline.md
├── open-questions.md
├── episodes/
│   └── 000-template.md
├── seeds/
│   └── content-seeds.md
└── notes/
    └── raw-insights.md
```

`.journey/` fica na raiz do projeto, fora de `docs/` e fora de `.claude/`. Nao misture registros narrativos com documentacao tecnica.

## Versionamento leve

- a skill nasce em `1.0.0`;
- bump `patch` para refino de copy, idioma ou pequenos ajustes que nao mudam destino;
- bump `minor` quando uma nova acao, lente ou tipo de registro for incorporado;
- bump `major` quando a estrutura padrao de `.journey/` ou o contrato com o usuario mudar;
- `-local` fica reservado para customizacoes futuras quando a base do framework for distribuida.

## Antipadroes

- transformar `.journey/` em `docs/`;
- escrever changelog tecnico no lugar de narrativa;
- inventar conflito, virada ou aprendizado que nao aparece no insumo;
- comecar registro por stack, ferramenta ou arquitetura;
- empilhar registros rasos em vez de poucos registros bons;
- duplicar conteudo entre `timeline.md`, `episodes/` e `seeds/`;
- forcar tom motivacional, corporativo ou marketing artificial;
- expor detalhe sensivel do projeto sem checar nivel de exposicao desejado.

## Referencias sob demanda

Carregue primeiro as referencias ativas desta skill:

- [`references/pattern-journey-authoring.md`](./references/pattern-journey-authoring.md) — principios editoriais, tom, lentes narrativas, estrategia de perguntas e checklist de qualidade.
- [`references/pattern-journey-structure.md`](./references/pattern-journey-structure.md) — papel de cada arquivo em `.journey/`, comportamento na criacao e separacao com `docs/`.
- [`references/sequence-workflows.md`](./references/sequence-workflows.md) — fluxos Mermaid por acao.
- [`references/version-history.md`](./references/version-history.md) — historico de versao da skill.

Carregue assets quando precisar copiar templates para `.journey/`:

- [`assets/template-journey-readme.md`](./assets/template-journey-readme.md)
- [`assets/template-hero-arc.md`](./assets/template-hero-arc.md)
- [`assets/template-timeline-entry.md`](./assets/template-timeline-entry.md)
- [`assets/template-episode.md`](./assets/template-episode.md)
- [`assets/template-content-seed.md`](./assets/template-content-seed.md)

## Limites e seguranca

- nao escrever em `docs/`, `.claude/` ou `src/` a partir desta skill;
- nao deletar arquivos existentes em `.journey/` sem confirmacao explicita do usuario;
- preservar tom autoral do usuario; nao reescrever frase ja consolidada sem pedido;
- marcar hipotese como hipotese, separada de fato;
- escrever em portugues brasileiro;
- respeitar nivel de exposicao desejado antes de registrar detalhe sensivel.
