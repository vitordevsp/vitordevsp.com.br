---
name: build-plan
description: Criar, revisar ou evoluir planos estruturados em docs/plans/ organizando contexto, escopo, dependências, checklist, referências, conhecimentos consolidados e perguntas em aberto. Use quando a tarefa exigir transformar uma frente ampla em um plano útil para várias sessões.
last_updated: 2026-04-18 17:45
---

# Build Plan

Use esta skill quando a tarefa for criar, revisar ou evoluir um plano em `docs/plans/`.

Ela existe para transformar uma intenção ampla em um plano útil para várias sessões, evitando que a frente vire apenas uma lista solta de ideias ou uma execução sem contexto compartilhado.

## Quando usar

Use esta skill quando:

- uma frente vai durar mais de uma sessão;
- existe risco de perder contexto entre ciclos;
- a entrega afeta várias camadas, pastas ou áreas do projeto;
- há necessidade de cruzar código, docs vivos, patterns, specs e decisões anteriores;
- um backlog legado precisa ser convertido em plano estruturado;
- um plano existente precisa ser reorganizado, refinado ou ampliado.

## Leitura obrigatória

Sempre comece por:

1. `docs/plans/README.md`
2. `docs/patterns/documentacao.md`

Depois, carregue também:

- patterns relevantes da camada;
- docs vivos do domínio, quando existirem;
- specs do artefato, quando existirem;
- planos já existentes, para evitar duplicação ou conflito;
- `docs/skills/README.md` e `docs/agents/README.md`, quando a frente depender dessas camadas;
- OpenAPI, Figma ou recursos externos, quando forem relevantes para a frente.

## Pergunta principal antes de criar

Antes de escrever o plano, responder:

`essa frente realmente merece um plano, ou ela está melhor representada por uma spec, um bloco de notas curto, um doc vivo do domínio ou uma execução direta?`

Se a resposta for não, a demanda provavelmente não deve virar plano.

## Perguntas que esta skill pode fazer para criar o plano

Quando houver ambiguidade relevante, esta skill pode fazer perguntas como:

- qual é a entrega concreta que este plano precisa produzir;
- esta frente é de implementação, migração, documentação ou consolidação;
- existe outro plano que já cobre parte desse escopo;
- o que precisa ficar explicitamente fora do escopo para evitar expansão;
- quais áreas do código ou da documentação devem ser consideradas fonte de verdade;
- existe dependência de backend, Figma, OpenAPI ou outro time;
- esta frente precisa sobreviver a várias sessões ou é algo de curto prazo;
- o plano deve servir só para execução ou também para tomada de decisão;
- quais critérios definem que o plano pode ser marcado como concluído;
- quais pontos ainda estão abertos e podem mudar o desenho da execução.

## Sequência recomendada

1. Decida se a frente realmente merece plano.
2. Descubra o contexto real no código e na documentação.
3. Escolha o tipo certo de plano: implementação, migração, documentação, consolidação de backlog, bloco de notas ou frente transversal.
4. Estruture o plano com objetivo, contexto, escopo, fora do escopo, áreas afetadas, checklist, riscos, referências e log.
5. Inclua uma seção de `Conhecimentos consolidados` sempre que o plano registrar ou acumular aprendizado útil para sessões futuras.
6. Inclua ao final uma seção de `Perguntas para evoluir este plano` quando ainda existirem dúvidas relevantes.
7. Se o plano fizer parte de uma frente ativa, mantenha o log de execução e os conhecimentos atualizados ao longo do tempo.

## Estrutura que esta skill deve preferir

Sempre que fizer sentido, o plano deve nascer com estas seções:

1. título
2. status
3. objetivo
4. contexto
5. escopo
6. fora do escopo
7. áreas afetadas
8. checklist ou backlog
9. riscos e dependências
10. referências
11. log de execução
12. conhecimentos consolidados
13. perguntas para evoluir este plano

## Formato de arquivo

Planos devem nascer como pasta:

```text
docs/plans/PLAN-NNN-descricao-curta/
  README.md
```

O plano começa inteiro no `README.md`.

Só crie arquivos auxiliares quando o conteúdo crescer a ponto de prejudicar a leitura, por exemplo:

- `logs.md`
- `conhecimentos.md`
- `perguntas.md`
- `referencias.md`

## Conhecimentos consolidados

Sempre que o plano registrar aprendizado reaproveitável, a skill deve preferir incluir:

```markdown
## Conhecimentos consolidados

- ...
- ...
- ...
```

Essa seção deve concentrar:

- padrões que ficaram claros durante a execução;
- decisões de taxonomia ou estrutura que passaram a orientar o projeto;
- aprendizados que podem evitar retrabalho em planos futuros;
- ajustes de entendimento que refinam o próprio objetivo da frente.

## Seção final recomendada no plano criado

Ao final do plano, a skill deve preferir incluir:

```markdown
## Perguntas para evoluir este plano

- ...
- ...
- ...
```

Essa seção deve concentrar perguntas que ajudam a destravar a próxima revisão do plano, por exemplo:

- ainda falta alguma decisão de escopo;
- existe dependência externa ainda não validada;
- alguma etapa do checklist precisa ser quebrada em subtarefas;
- alguma referência ainda precisa ser criada ou atualizada;
- o plano está misturando mais de uma frente e deveria ser dividido;
- o critério de conclusão está claro o suficiente;
- alguma parte do plano já foi concluída e precisa ser refletida no status.

## Saída esperada

Uma execução bem fechada desta skill deve terminar com:

1. nome sugerido do plano, seguindo a convenção `PLAN-NNN-descricao-curta/README.md`;
2. justificativa de por que a frente merece um plano;
3. plano estruturado, já com seções úteis para execução;
4. seção de `Conhecimentos consolidados`, quando houver aprendizado relevante;
5. perguntas em aberto, quando existirem;
6. indicação de quais referências precisam ser revisitadas durante a execução.

## O que esta skill não deve fazer

Esta skill não deve:

- criar plano para mudança pequena e localizada sem necessidade;
- duplicar um plano já existente com outro nome;
- transformar o plano em dump de ideias sem recorte;
- misturar backlog de produto com plano técnico sem sinalizar a diferença;
- esconder dúvidas importantes em vez de registrá-las;
- criar um plano rígido demais para uma frente ainda exploratória;
- substituir `specs.md`, docs vivos do domínio ou patterns quando eles forem a fonte correta.
