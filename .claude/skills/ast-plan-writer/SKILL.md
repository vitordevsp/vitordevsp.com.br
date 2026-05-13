---
name: ast-plan-writer
description: "Crie, refine e reestruture planos multi-etapas em `.claude/plans/`, tratando plano como frente grande com começo e fim claros e `tasks/` como unidades operacionais em pasta."
compatibility: "Projetada para Agents Studio v0.1, alinhada ao contrato de pacote consolidado pela ast-skill-writer e ao handoff de tasks para a ast-task-writer."
metadata:
  author: agents-studio
  last_updated: 2026-05-12 22:06
  version: "1.3.0"
---

# ast-plan-writer

## Inicio rapido

1. Leia a primeira frase do usuario e classifique se a necessidade principal e avaliar, criar, refinar ou reestruturar.
2. Confirme se a frente realmente merece um plano ou se ainda cabe melhor em `task` ou execucao direta.
3. Inspecione apenas o plano alvo, o mapa de tasks relacionado e as fontes vivas do dominio que sustentam a decisao.
4. Liste as lacunas reais e faca perguntas objetivas ao usuario antes de fechar o plano ou a estrutura inicial de tasks.
5. Trate `README.md` como dossie do plano e `tasks/` como parte obrigatoria do pacote, porque frente sem decomposicao operacional geralmente ainda nao merece virar plano.
6. Encaminhe criacao, refinamento e manutencao de task para `ast-task-writer`.
7. Pare antes da implementacao do codigo ou da autoria de `SPEC.md`.

## O que esta skill faz

- avaliar se uma frente realmente merece um plano em `.claude/plans/`;
- criar planos novos com objetivo, escopo, riscos, dependencias e validacoes claros;
- refinar planos existentes para reduzir ambiguidade, sobreposicao e perda de contexto entre sessoes;
- reestruturar planos quando o `README.md` deixa de ser suficiente e a frente precisa de `tasks/` ou apoio adicional;
- estruturar o conjunto inicial de tasks de um plano sem assumir a manutencao recorrente dessas tasks;
- explicitar quando chamar `ast-task-writer` para criar ou refinar tasks em contexto de plano;
- transformar lacunas relevantes em perguntas objetivas antes de congelar escopo, riscos e validacoes;
- explicitar dependencias, checkpoints, handoffs e criterio de encerramento da frente;
- tratar `PLAN-000-desktop` como plano-base operacional da pasta, e nao como frente de entrega comum;
- apontar quando a melhor saida ainda e uma `task`, e nao um plano.

## Ciclo de status do plano

Use o mesmo ciclo de status das tasks, adaptado ao contexto do plano:

- `draft`: plano criado na estrutura certa, ainda sem refinamento suficiente;
- `refinando`: lacunas do plano estao sendo respondidas e incorporadas;
- `refinado`: plano pronto para guiar execucao segura;
- `pendente`: plano em execucao, mesmo que alguma task esteja pausada no meio;
- `revisar`: implementacao da frente foi fechada e o plano aguarda revisao final;
- `concluida`: plano validado e encerrado.

Transicoes esperadas:

- `draft -> refinando -> refinado`;
- `refinado -> pendente -> revisar -> concluida`;
- `revisar -> pendente` quando a revisao pedir novo ajuste na frente.

## Quando usar

- a frente vai durar mais de uma sessao;
- existe risco real de perder contexto entre ciclos;
- a entrega atravessa varias camadas, decisoes ou dependencias;
- o trabalho precisa de checkpoints, tasks ou criterios de conclusao explicitos;
- um plano existente esta raso, confuso ou mal particionado.

## Quando nao usar

- a mudanca e pequena, localizada e bem representada como `task`;
- a necessidade principal e descrever comportamento vivo de um artefato do sistema em `SPEC.md`;
- o pedido ja esta pronto para implementacao direta sem depender de contexto duravel;
- a frente nao tem começo e fim claros o suficiente para virar plano.

## Acoes que esta skill interpreta

| Acao | Quando usar | Entradas esperadas | Saidas esperadas |
|------|------|------|------|
| `avaliar-se-merece-plano` | quando ainda existe duvida entre plano, task ou execucao direta | objetivo da frente, risco, areas tocadas, necessidade de persistencia e restricoes | recomendacao explicita do artefato certo, com justificativa curta |
| `criar` | quando a frente merece um plano novo | objetivo, contexto, escopo, fora do escopo, areas afetadas, dependencias, validacoes e lacunas percebidas | pacote de plano em `.claude/plans/PLAN-NNN-slug/`, nascendo em `draft`, com `README.md` e `tasks/` desde a origem |
| `refinar` | quando o plano existe, mas esta raso, ambiguo ou desatualizado | caminho do plano, lacunas observadas, decisoes recentes, perguntas em aberto e fontes relacionadas | plano conduzido por `refinando` e fechado em `refinado` quando pronto para execucao |
| `reestruturar` | quando o problema principal esta na forma do plano | caminho do plano, dor estrutural atual, modelo alvo, limites da reorganizacao e handoff esperado para `ast-task-writer` | plano reorganizado com leitura mais clara, inclusive estrutura inicial de tasks e fronteiras de ownership explicitas |

Se a primeira frase do usuario vier ambigua, assuma a acao mais conservadora e registre a premissa. Se a ambiguidade puder mudar escopo ou risco de forma relevante, pergunte antes de editar.

## Entradas tipicas

- frase inicial do usuario descrevendo a acao esperada;
- plano alvo ou indicacao de que a frente ainda nao tem plano;
- contexto funcional e tecnico minimo;
- areas do repositorio afetadas;
- restricoes de escopo;
- docs ou planos vivos que sustentam a decisao.

## Fronteiras essenciais

- `plan` e frente grande, multi-sessao, com começo e fim claros, sempre acompanhada de `tasks/`;
- `status` do plano deve seguir o ciclo `draft -> refinando -> refinado -> pendente -> revisar -> concluida`, com retorno de `revisar` para `pendente` quando houver ajuste;
- `task` e unidade operacional pequena, seja solta em `.claude/tasks/` ou vinculada a `.claude/plans/<plan>/tasks/`;
- `PLAN-000-desktop` e a excecao estrutural da pasta: um desktop operacional temporario para materiais de execucao ainda sem destino definitivo;
- `ast-task-writer` e a skill dona da criacao, refinamento e manutencao de task;
- `ast-plan-writer` decide quando a frente pede plano e estrutura o conjunto inicial de tasks desse plano;
- `SPEC.md` e artefato vivo do sistema e deve ser criado ou atualizado pelas skills donas dos componentes, stores, pages ou services;
- fechamento tecnico e release readiness devem ser encaminhados para `ast-release-manager`, e nao absorvidos por esta skill como responsabilidade central.

## Excecao estrutural: `PLAN-000-desktop`

Use `PLAN-000-desktop` como ambiente de trabalho temporario dentro de `.claude/plans/` quando o material ainda nao merece plano proprio, task propria ou doc estavel, mas precisa existir por algumas sessoes.

O desktop pode concentrar:

- arquivos temporarios gerados durante investigacao, pesquisa ou organizacao de execucao;
- relatorios curtos para dar compreensao rapida do estado dos planos ou da pasta;
- notas simples, hipoteses, lembretes e observacoes que ainda nao ganharam definicao consolidada;
- checkpoints locais e pendencias curtas em `progress.md`.

Regras para o desktop:

- ele nao substitui planos reais, tasks reais, reports finais nem docs vivos;
- `progress.md` e a area de acompanhamento local e temporario, nao um board externo;
- `notes.md`, `report.md`, `references.md` e arquivos avulsos so entram quando fizerem sentido para a sessao;
- quando algo estabilizar, promova para o lugar correto (`plan`, `task`, `docs/`, `docs/reports/`, `docs/team/`, `MEMORY.md` ou docs locais do dominio);
- quando nao houver mais valor, descarte o material temporario em vez de transforma-lo em backlog permanente.

## Workflow recomendado

1. Classificar a acao principal a partir do pedido.
2. Confirmar se a frente merece plano, ainda cabe em `task` ou deve ficar temporariamente em `PLAN-000-desktop`.
3. Inspecionar o plano alvo, o mapa de tasks relacionado e apenas as fontes exatas necessarias.
4. Definir a menor estrutura que resolve o problema:
   - plano novo;
   - plano existente refinado;
   - uso temporario de `PLAN-000-desktop` para material ainda sem destino estavel;
   - plano com estrutura inicial de tasks;
   - reestruturacao do dossie para preparar handoff a `ast-task-writer`.
5. Criar plano novo em `draft` e mover para `refinando` quando o refinamento comecar de fato.
6. Listar lacunas reais e fazer perguntas objetivas ao usuario antes de fechar o plano ou a estrutura inicial de tasks.
7. Fechar o plano em `refinado` quando o dossie estiver suficiente para guiar execucao segura.
8. Manter o `README.md` do plano como dossie principal e `tasks/` como area operacional obrigatoria do pacote.
9. Quando o usuario pedir para materializar tasks do plano na mesma rodada, usar o contrato da `ast-task-writer` e registrar que a manutencao futura dessas tasks sai desta skill.
10. Usar `report.md`, `references.md` e `source-matrix.md` apenas quando melhorarem a leitura ou forem pedidos explicitamente.
11. Levar detalhe longo para `references/`, templates copiaveis para `assets/` e fluxos para `references/sequence-workflows.md`.
12. Encerrar a mudanca com `agents/openai.yaml`, `references/version-history.md` e alinhamento do report da task de recuperacao, quando existir.

## Estrutura minima esperada da skill

- frontmatter em `SKILL.md` com `name`, `description`, `compatibility` quando fizer sentido e `metadata`;
- `agents/openai.yaml` coerente com o papel da skill;
- `references/` com nomes semanticos e um conjunto curto de arquivos ativos;
- `references/sequence-workflows.md` com Mermaid por acao principal;
- pelo menos um `pattern` ativo;
- pelo menos um template em `assets/`;
- `references/version-history.md` registrando a base inicial e refinamentos relevantes;
- `scripts/` apenas se houver ganho deterministico real em uma rodada futura.

## Versionamento leve

- esta base recuperada nasce em `1.0.0`;
- `1.0.1`, `1.1.0` e `2.0.0` seguem semver simples;
- `-local` fica reservado para customizacoes futuras sobre a base do framework;
- bump `major` quando o contrato da skill mudar de forma incompatível;
- bump `minor` quando a skill ganhar nova capacidade, referencia estrutural ou template relevante;
- bump `patch` quando houver melhoria de clareza, copy ou organizacao sem alterar o comportamento principal.

## Antipadroes

- abrir plano para qualquer ajuste pequeno;
- transformar `PLAN-000-desktop` em backlog permanente, mini-board local ou deposito de verdade estavel;
- fechar plano ou mapa de tasks sem antes expor lacunas relevantes ao usuario;
- tratar `plan`, `task` e `SPEC.md` como equivalentes;
- deixar `README.md` do plano sem fronteiras, riscos e criterio de encerramento;
- tentar manter refinamento recorrente de task dentro desta skill em vez de encaminhar para `ast-task-writer`;
- criar tasks em arquivo solto quando o contrato atual pede pasta;
- reabsorver fechamento tecnico detalhado em vez de encaminhar para `ast-release-manager`;
- espalhar guidance estrutural em muitos arquivos pequenos sem necessidade.

## Referencias sob demanda

- `references/pattern-plan-authoring.md`
- `references/pattern-task-management.md`
- `references/sequence-workflows.md`
- `references/version-history.md`
- `assets/template-plan-package.md`

## Limites e seguranca

- nao implementar codigo como parte do planejamento;
- nao criar ou atualizar `SPEC.md` por conta propria nesta skill;
- nao apagar ou mover planos existentes sem que isso faca parte clara do recorte pedido;
- nao assumir manutencao recorrente de task quando o handoff correto e `ast-task-writer`;
- nao lotar o contexto com leitura ampla de `docs_backup`.
