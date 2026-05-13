# `.claude/tasks/`

Tasks pequenas e autocontidas.

## Papel desta pasta

- registrar trabalho curto, local e verificavel que nao precisa virar plano;
- servir como contexto compartilhado para a mesma estrutura-base usada em `.claude/plans/<plan>/tasks/`;
- concentrar tasks soltas que carregam o proprio contexto sem depender de uma frente maior.

## Estrutura

```text
.claude/tasks/
  TASK-XXX-slug/
    README.md
```

Arquivos auxiliares entram so quando melhorarem a leitura:

```text
decision-log.md
report.md
references.md
source-matrix.md
```

## Quando usar esta pasta

- a demanda cabe em uma unica unidade operacional;
- o escopo e pequeno, direto e com validacao objetiva;
- nao existe `PLAN-*` pai claro que deva concentrar risco, historico e dependencias.

## Quando nao usar esta pasta

- a frente exige varias tasks, checkpoints ou mais de uma sessao;
- existe um plano pai claro, e a task pertence a `.claude/plans/<plan>/tasks/`;
- o pedido ainda esta ambíguo e precisa de perguntas antes de virar task segura.

## Skill dona

Use `ast-task-writer` para criar, refinar e endurecer tasks desta pasta.
