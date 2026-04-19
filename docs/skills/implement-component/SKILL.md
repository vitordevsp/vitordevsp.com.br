---
name: implement-component
description: Criar, revisar ou evoluir componentes do projeto com base no pattern de componentes, specs, código consumidor e referência visual quando existir. Use quando a tarefa tocar um component novo ou um component existente que precise de melhoria de comportamento, composição ou manutenção.
last_updated: 2026-04-18 05:10
---

# Implement Component

Use esta skill quando a tarefa for criar, revisar ou evoluir um `component` do projeto.

Ela existe para organizar melhor mudanças em componentes reutilizáveis ou relevantes para o fluxo, reduzindo risco de duplicação, responsabilidade difusa e inconsistência visual ou comportamental.

## Quando usar

Use esta skill quando:

- um componente novo precisa ser criado;
- um componente existente precisa ser melhorado;
- há dúvida sobre responsabilidade entre `page` e `component`;
- o componente tem estados, comportamento visual ou composição relevante;
- existe `specs.md` ou referência visual importante para manutenção.

## Leitura obrigatória

Sempre comece por:

1. `docs/patterns/componentes.md`
2. `docs/patterns/documentacao.md`

Depois, carregue também:

- `docs/patterns/specs.md`
- `docs/patterns/pages.md`, quando o componente estiver fortemente ligado à rota;
- `docs/patterns/tipagem.md`, quando o componente depender de tipos relevantes;
- `docs/patterns/aplicacao.md`, se o componente fizer parte do fluxo de uma page complexa.

## Entradas

O contexto ideal inclui:

- código do componente alvo;
- usos do componente na page ou no container pai;
- estilos locais ou estrutura visual relevante;
- `specs.md` do componente, quando existir;
- Figma ou referência visual oficial, quando existir.

## Sequência recomendada

1. Entenda a responsabilidade atual do componente e onde ele é usado.
2. Verifique se o problema é do componente, da page pai ou da composição do fluxo.
3. Cruze comportamento, estados e hierarquia visual com as referências disponíveis.
4. Implemente a criação ou melhoria do componente.
5. Atualize ou crie `specs.md` quando o artefato merecer spec.
6. Termine com a revisão final em `docs/patterns/documentacao.md`.

## O que esta skill deve verificar

### Responsabilidade e recorte

- o componente encapsula uma responsabilidade que vale existir;
- o recorte entre `frames/` (blocos maiores) e `shared/` (primitivos) continua saudavel;
- nao ha duplicacao de comportamento ou estrutura com outro componente ja existente;
- o componente nao foi abstraido cedo demais sem necessidade;
- o componente recebe dados como props — nao busca dados do Notion diretamente.

### Comportamento e estados

- props e eventos expressam a intenção correta;
- estados principais estão claros;
- loading, vazio, erro, seleção, confirmação ou variação visual aparecem quando precisarem;
- o comportamento é previsível para quem consome o componente.

### Relação com specs e referência visual

- a `specs.md`, quando existir, ainda representa o componente real;
- a referência visual, quando existir, ajuda a manter composição e hierarquia;
- a descrição visual não está competindo com o comportamento funcional;
- a manutenção do componente ficou mais fácil depois do ajuste.

## Saída esperada

Uma execução bem fechada desta skill deve terminar com:

1. componente funcional e com recorte claro;
2. estados e comportamento compreensíveis;
3. relação saudável com seus consumidores;
4. `specs.md` atualizada quando fizer sentido;
5. menos risco de duplicação ou abstração desnecessária.

## O que esta skill não deve fazer

Esta skill não deve:

- transformar qualquer trecho pequeno de JSX em componente só por organização estética;
- isolar comportamento que depende fortemente de uma única page sem necessidade;
- priorizar reuso teórico em vez de clareza do fluxo real;
- reescrever visualmente um componente sem considerar spec ou referência oficial.
