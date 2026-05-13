---
name: ast-task-writer
description: "Crie, refine e converta tasks pequenas e autocontidas, usando uma estrutura compartilhada entre `.claude/tasks/` e `.claude/plans/<plan>/tasks/`, sem abrir planos ou migrações maiores."
compatibility: "Projetada para Agents Studio v0.1. Atua sozinha para `tasks` soltas e em handoff com a `ast-plan-writer` quando a task nasce dentro de um plano."
metadata:
  author: agents-studio
  last_updated: 2026-05-12 21:18
  version: "1.2.0"
---

# ast-task-writer

## Inicio rapido

1. Classifique a acao principal: `avaliar-se-merece-task`, `criar`, `refinar` ou `migrar-legado`.
2. Confirme se a demanda e realmente pequena, autocontida e validavel.
3. Decida o contexto:
   - `task` solta -> `.claude/tasks/`;
   - `task` de plano -> `.claude/plans/<plan>/tasks/`.
4. Mapeie as lacunas reais e faca perguntas objetivas ao usuario antes de congelar a task.
5. Use a mesma estrutura-base nos dois casos e mude apenas o contexto herdado.
6. Se a frente pedir varias etapas, redirecione para `ast-plan-writer`.
7. Nao abra migracao estrutural ampla sem pedido explicito do usuario.

## O que esta skill faz

- avaliar se uma demanda merece `task`, `plan` ou execucao direta;
- criar e refinar tasks pequenas, autocontidas e verificaveis;
- orientar uma estrutura compartilhada entre task solta e task vinculada a plano;
- transformar lacunas importantes em perguntas objetivas antes de fechar a task;
- migrar um artefato legado pontual para o modelo de task quando o usuario pedir;
- explicitar entradas, saidas, criterios de aceite e validacao sem transformar a task em mini-plano.

## Ciclo de status da task

Use apenas estes status, com semantica fixa:

- `draft`: task criada pela skill ou estruturada no formato certo, mas ainda sem refinamento suficiente para execucao segura;
- `refinando`: refinamento em andamento, com lacunas sendo respondidas ou incorporadas;
- `refinado`: refinamento concluido e task pronta para implementacao;
- `pendente`: task em implementacao ou pausada no meio da execucao;
- `revisar`: implementacao concluida e aguardando revisao manual ou automatizada;
- `concluida`: task validada e encerrada.

Transicoes esperadas:

- `draft -> refinando -> refinado`;
- `refinado -> pendente -> revisar -> concluida`;
- `revisar -> pendente` quando a revisao pedir ajuste.

## Quando usar

- o trabalho e pequeno, localizado e com comeco e fim claros;
- existe necessidade de registrar contexto suficiente para outra sessao ou outro agente;
- a demanda cabe em uma unica unidade operacional;
- a task precisa ganhar escopo, exclusoes e validacao antes da implementacao.

## Quando nao usar

- a frente exige varias tasks, dependencias encadeadas ou checkpoints proprios;
- o trabalho atravessa varias areas e vai durar mais de uma sessao;
- o melhor artefato e um `plan`, `SPEC.md` ou documentacao humana;
- a intencao real e migrar a taxonomia do repositorio como um todo.

## Acoes que esta skill interpreta

| Acao | Quando usar | Entradas esperadas | Saidas esperadas |
|------|------|------|------|
| `avaliar-se-merece-task` | quando ha duvida entre task, plan ou execucao direta | objetivo, risco, areas tocadas, dependencias e necessidade de persistencia | recomendacao explicita do artefato correto e do contexto (`solta` ou `de plano`) |
| `criar` | quando a demanda merece uma task nova | contexto alvo, objetivo, escopo, fora de escopo, validacao e dependencias | task nova em `draft`, usando a estrutura-base compartilhada |
| `refinar` | quando a task existe, mas ainda esta vaga ou insegura | caminho da task, lacunas observadas, restricoes, referencias, perguntas em aberto e validacoes | task conduzida por `refinando` e fechada em `refinado` quando pronta para execucao |
| `migrar-legado` | quando o usuario quer converter um artefato legado pontual para o modelo de task | artefato legado, contexto alvo, conteudo a preservar e limites da migracao | proposta de conversao local e rastreavel, sem abrir migracao ampla da camada |

Se a primeira frase do usuario vier ambigua, assuma a acao mais conservadora e registre a premissa. Se a ambiguidade mudar o alcance da migracao, pergunte antes de editar.

## Como decidir entre task pequena e plan

Considere task pequena quando:

- entrega um resultado unico e bem delimitado;
- cabe em uma execucao curta ou numa validacao objetiva;
- nao precisa de ordenacao de varias subetapas;
- nao depende de backlog proprio.

Escalone para `ast-plan-writer` quando:

- a frente precisa de mais de uma task;
- havera varias sessoes, handoffs ou checkpoints;
- o risco cresce se o contexto nao ficar concentrado num plano pai;
- o trabalho mistura descoberta, decisao e execucao em fases distintas.

## Como decidir entre task solta e task vinculada a plano

Use `task` solta quando:

- o trabalho e pequeno e nao pertence claramente a uma frente maior;
- o proprio artefato precisa carregar quase todo o contexto;
- nao existe plano pai que deva concentrar escopo, risco e historico.

Use `task` de plano quando:

- a demanda pertence claramente a um `PLAN-NNN-*` existente;
- o plano pai ja concentra objetivo, riscos, dependencias e mapa da frente;
- a task pode herdar contexto e focar apenas no recorte operacional local.

## Estrutura-base compartilhada

Toda task desta skill segue a mesma base conceitual:

- frontmatter com `title`, `status`, `priority` e `type` na raiz, e `metadata` para ownership, datas e `tags`;
- `status` preso ao ciclo `draft -> refinando -> refinado -> pendente -> revisar -> concluida`, com retorno de `revisar` para `pendente` quando houver ajuste;
- objetivo direto;
- contexto local suficiente;
- escopo e fora do escopo;
- entradas/contratos, quando houver;
- resultado ou comportamento esperado;
- criterios de aceite verificaveis;
- validacao;
- dependencias e referencias.
- perguntas em aberto, quando restar alguma lacuna objetiva.

A diferenca entre os dois contextos e de enquadramento, nao de formato:

- `task` solta precisa ser mais autocontida no proprio arquivo;
- `task` de plano pode herdar contexto, riscos e referencias do plano pai e apontar isso de forma explicita;
- quando a task vier de um plano, a `ast-plan-writer` define o recorte inicial e esta skill assume a criacao/refinamento dali em diante.

## Como fechar lacunas com o usuario

Antes de concluir uma task, pergunte o necessario quando faltar qualquer um destes pontos:

- o objetivo ainda admite mais de uma interpretacao;
- o fora de escopo nao esta claro;
- a validacao minima nao e verificavel;
- a task parece grande demais e pode merecer plano;
- a dependencia de outro artefato ou contrato ainda nao foi fixada.

Prefira poucas perguntas, diretas e com impacto explicito. Depois de respondidas, internalize as respostas na task e deixe a secao `Perguntas em aberto` objetiva.
Nao feche uma task como `refinado` se ainda existir lacuna que muda escopo, validacao ou dependencia.

## Workflow recomendado

1. Classificar a acao principal a partir da frase inicial do usuario.
2. Decidir se a demanda merece task, plan ou execucao direta.
3. Se for task, decidir o contexto: `solta` ou `de plano`.
4. Reunir apenas o contexto minimo necessario para o recorte.
5. Identificar lacunas reais e fazer perguntas objetivas ao usuario antes de fechar a task.
6. Ao criar, usar `draft`. Ao iniciar refinamento real, mover para `refinando`.
7. Fechar a task em `refinado` quando escopo, exclusoes, validacao e dependencias estiverem suficientes para implementacao segura.
8. Registrar dependencias, exclusoes e riscos locais sem duplicar o plano pai.
9. Se a demanda envolver conversao estrutural maior, parar no refinamento e pedir alinhamento.

## Antipadroes

- manter a nomenclatura antiga e a camada viva de `task` em paralelo para a mesma finalidade;
- abrir um `plan` para uma demanda que cabe em task pequena;
- fechar task sem resolver ou registrar claramente as lacunas que restaram;
- escrever task que depende de contexto oral ou conversa nao registrada;
- duplicar a mesma demanda como task solta e task de plano;
- tentar migrar toda a camada historica antiga de uma vez sem recorte explicito;
- transformar task curta em mini-plano com backlog inflado.

## Referencias sob demanda

- `references/pattern-task-authoring.md`
- `references/pattern-task-refinement.md`
- `references/sequence-workflows.md`
- `references/version-history.md`
- `assets/template-task.md`

## Limites e seguranca

- nao implementar codigo como parte da escrita da task;
- nao abrir migracao taxonomica ampla sem pedido explicito do usuario;
- nao absorver a camada historica legada por reflexo, sem recorte aprovado;
- nao puxar `product-owner` para dentro do escopo desta skill.
