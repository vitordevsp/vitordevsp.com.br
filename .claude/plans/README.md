# `.claude/plans/`

Frentes multi-etapas, multi-sessao ou com risco proprio.

## Papel desta pasta

- registrar frentes que precisam sobreviver a varias sessoes;
- concentrar escopo, dependencias, riscos e criterio de encerramento;
- servir de contexto pai para `tasks/`, que fazem parte do contrato operacional do plano;
- manter um desktop operacional temporario em `PLAN-000-desktop` sem transformar isso em board local.

## Quando usar um plano

Use `.claude/plans/` quando:

- a frente atravessa varias etapas ou varias sessoes;
- existe risco de perder contexto se tudo ficar espalhado;
- o trabalho depende de checkpoints, handoffs e decomposicao em tasks;
- a demanda precisa de dossie proprio antes da implementacao.

Nao use quando:

- a demanda cabe em uma task pequena e autocontida em [`.claude/tasks/`](../tasks/README.md);
- o melhor artefato e `SPEC.md` ou doc vivo do dominio;
- a mudanca ja esta pronta para execucao direta sem contexto duravel;
- a coordenacao principal precisa acontecer em board externo ou em `docs/team/`, e nao em um dossie local persistente.

## Estrutura base

```text
.claude/plans/
  PLAN-NNN-slug/
    README.md
    tasks/
      TASK-001-slug/
        README.md
```

Se nao existir recorte suficiente para pelo menos uma `task`, a frente provavelmente ainda nao merece virar plano.

Arquivos auxiliares entram so quando melhorarem a leitura:

```text
report.md
references.md
source-matrix.md
```

## Contrato do plano

Planos desta pasta usam:

- frontmatter com `title` e `status` na raiz;
- `tags` na raiz quando fizer sentido;
- `metadata` para `owner`, datas e sinais auxiliares;
- `README.md` como dossie principal da frente;
- `tasks/` como area operacional obrigatoria do plano.

Template e refinamento vivem na skill:

- [`ast-plan-writer/SKILL.md`](../skills/ast-plan-writer/SKILL.md)
- [`ast-plan-writer/assets/template-plan-package.md`](../skills/ast-plan-writer/assets/template-plan-package.md)

## Ciclo de status dos planos

Planos usam o mesmo ciclo-base das tasks, adaptado ao contexto da frente:

- `draft`: plano criado na estrutura certa, ainda sem refinamento suficiente;
- `refinando`: refinamento em andamento, com perguntas e respostas sendo incorporadas;
- `refinado`: plano pronto para guiar execucao segura;
- `pendente`: plano em execucao;
- `revisar`: implementacao da frente concluida e aguardando revisao;
- `concluida`: plano validado e encerrado.

Transicao esperada:

- `draft -> refinando -> refinado -> pendente -> revisar -> concluida`
- `revisar -> pendente` quando a revisao pedir ajuste

## Excecao estrutural: `PLAN-000-desktop`

`PLAN-000-desktop` e o unico plano-base da pasta.

Use para:

- notas curtas ainda sem destino definitivo;
- checkpoints locais e temporarios;
- relatorios exploratorios ou referencias provisoriais;
- material que ainda nao virou `plan`, `task`, `report` ou doc vivo.

Estrutura esperada:

```text
.claude/plans/PLAN-000-desktop/
  README.md
  progress.md
  notes.md
  report.md
  references.md
```

`progress.md` e arquivo, nao pasta.

## Como usar um plano no dia a dia

### Planos-base

Use [`PLAN-000-desktop`](./PLAN-000-desktop/README.md) como desktop temporario do LLM. Dentro dele, use [`progress.md`](./PLAN-000-desktop/progress.md) para estado local, temporario e para o indice vivo dos planos da pasta.

Ao final de cada sessao, promova o que estabilizou para o lugar certo e limpe o que era apenas temporario.

### Antes de executar

1. ler o plano;
2. ler a skill ou docs vivos da camada relevante;
3. abrir os docs do dominio quando existirem;
4. fechar lacunas reais com perguntas objetivas antes de congelar plano ou estrutura inicial de tasks;
5. revisar riscos, dependencias e escopo.

Prompt util:

```text
Leia o plano em .claude/plans/PLAN-NNN-*/README.md, a skill de planejamento e os docs do dominio afetado.
Resuma o estado atual, os riscos e o próximo passo seguro antes de implementar.
```

### Durante a execução

- atualizar o plano quando o estado da frente mudar;
- registrar desvios relevantes sem perder o foco;
- criar ou refinar tasks do plano com `ast-task-writer` quando necessario;
- evitar misturar no mesmo plano mudancas que merecem frente separada.

### Ao concluir

- atualizar o plano com o estado final;
- garantir que as referencias continuem uteis para a proxima sessao;
- revisar se links e caminhos ainda apontam para a estrutura atual.

O acompanhamento vivo dos planos desta pasta fica em:

- [`PLAN-000-desktop`](./PLAN-000-desktop/)
- [`PLAN-000-desktop/progress.md`](./PLAN-000-desktop/progress.md)

## Regra importante

Os planos desta pasta não substituem:

- a documentação humana em `docs/product/`, `docs/team/` e `docs/reports/`;
- a camada operacional em `.claude/skills/` (regras e fluxos recorrentes);
- os docs vivos de domínio próximos do código (ex.: `src/**/docs` e `specs.md`);
- a responsabilidade de manter código e documentação coerentes no mesmo ciclo.
