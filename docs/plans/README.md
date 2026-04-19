# Planos do Projeto

Esta pasta concentra planos de trabalho estruturados do repositório.

Ela existe para transformar frentes relevantes de implementação, documentação ou migração em artefatos mais fáceis de acompanhar ao longo de várias sessões, sem depender de contexto oral.

## Objetivo desta pasta

`docs/plans/` deve responder principalmente:

- quais planos ativos existem no projeto;
- qual é o objetivo de cada frente;
- quais arquivos e camadas tendem a ser afetados;
- o que já foi concluído e o que ainda falta;
- quais dependências, riscos e referências precisam ser consideradas antes de executar.

## Relação com o restante da documentação

- `docs/patterns/` define o padrão oficial do projeto.
- `docs/skills/` define fluxos recorrentes de execução.
- `docs/routines/` define rituais operacionais situacionais, especialmente perto de fechamento e validação.
- `docs/agents/` fica reservado para agentes realmente especializados, quando existirem.
- `docs/plans/` organiza frentes de trabalho que atravessam múltiplos arquivos ou várias sessões.

Em resumo:

- `patterns` define a regra;
- `skills` definem a execução recorrente;
- `routines` definem momentos específicos do ciclo;
- `agents` definem um papel especializado quando necessário;
- `plans` define a frente de execução.

## Quando criar um plano aqui

Criar plano em `docs/plans/` quando:

- a frente vai durar mais de uma sessão;
- existe risco de perder contexto entre ciclos;
- a entrega afeta várias camadas;
- vale registrar escopo, dependências e checkpoints;
- um backlog legado precisa ser trazido para uma estrutura mais clara.

Não criar plano aqui quando:

- a mudança é pequena e localizada;
- o contexto cabe bem no próprio PR, diff ou comentário curto;
- a frente já está suficientemente descrita nos docs vivos do domínio.

## Convenção de nomenclatura

Planos nascem sempre como pasta:

```text
PLAN-NNN-descricao-curta/
  README.md
  logs.md          ← opcional
  conhecimentos.md ← opcional
```

Exemplos:

- `PLAN-001-migracao-notion-legado/README.md`
- `PLAN-000-bloco-de-notas-dos-planos/README.md`

Regras:

- `NNN` é sequencial;
- não reutilizar número;
- usar descrição curta e estável;
- escrever o conteúdo do plano em português do Brasil;
- começar com tudo no `README.md` — criar arquivos auxiliares só quando o conteúdo crescer a ponto de prejudicar a leitura.

Quando o plano tratar uma abstracao do framework, preferir nome agnostico ao fornecedor.

Quando o plano crescer para pasta, pode ganhar arquivos auxiliares como:
- `perguntas.md`
- `referencias.md`

Não separar por ansiedade organizacional. Separar apenas quando o `README.md` deixar de ser a melhor forma de leitura.

Também vale consolidar planos quando várias frentes pequenas passam a representar a mesma evolução estrutural. Nesse caso:

- manter o plano mais abrangente como dossiê vivo;
- mover conhecimentos, decisões, logs e pendências para arquivos temáticos dentro dele;
- preservar um mapa de planos absorvidos;
- atualizar links operacionais para o novo dossiê;
- remover os planos antigos somente depois de garantir que nenhuma referência viva depende deles.

## Estrutura recomendada

Cada plano deve ter, no mínimo:

1. título
2. status
3. objetivo
4. contexto
5. escopo
6. arquivos ou áreas afetadas
7. checklist ou backlog do plano
8. riscos e dependências
9. referências
10. log de execução

Sempre que houver aprendizado reaproveitável, incluir também:

11. conhecimentos consolidados
12. perguntas para evoluir este plano

## Template base

```markdown
# PLAN-NNN - Título

## Status

| Campo | Valor |
|------|------|
| Status | pendente / em andamento / concluído / cancelado |
| Criado em | AAAA-MM-DD |
| Atualizado em | AAAA-MM-DD |

## Objetivo

Descrever de forma direta o que este plano entrega.

## Contexto

Explicar por que esta frente existe agora e qual problema resolve.

## Escopo

- ...
- ...

## Fora do escopo

- ...
- ...

## Áreas afetadas

- `src/...`
- `docs/...`

## Checklist

- [ ] ...
- [ ] ...

## Riscos e dependências

- ...
- ...

## Referências

- ...
- ...

## Log de execução

- AAAA-MM-DD - plano criado

## Conhecimentos consolidados

- ...
- ...

## Perguntas para evoluir este plano

- ...
- ...
```

## Como usar um plano no dia a dia

### Antes de executar

1. ler o plano;
2. ler os patterns da camada relevante;
3. abrir os docs vivos do domínio quando existirem;
4. revisar riscos, dependências e escopo.

Prompt útil:

```text
Leia o plano em docs/plans/PLAN-NNN-*/README.md, os patterns relevantes e os docs do domínio afetado.
Resuma o estado atual, os riscos e o próximo passo seguro antes de implementar.
```

### Durante a execução

- marcar itens concluídos;
- atualizar o log de execução;
- registrar desvios relevantes sem perder o foco do plano;
- evitar misturar no mesmo plano mudanças que merecem frente separada.

### Ao concluir

- revisar `docs/patterns/documentacao.md`;
- atualizar o plano com o estado final;
- garantir que as referências continuem úteis para a próxima sessão.

## Status dos planos

O painel rápido de status dos planos fica em:

- [`PLAN-000-bloco-de-notas-dos-planos`](./PLAN-000-bloco-de-notas-dos-planos/)

## Regra importante

Os planos desta pasta não substituem:

- `docs/patterns/`;
- `docs/skills/`;
- `docs/agents/`, quando houver agentes ativos;
- os docs vivos dos domínios;
- a responsabilidade de manter código e documentação coerentes no mesmo ciclo.
