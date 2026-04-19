---
name: implement-page
description: Criar, revisar ou evoluir pages e rotas do projeto combinando patterns de aplicação, pages, specs, documentação, código real, integrações e referência visual quando existir. Use quando a tarefa tocar uma page nova ou uma page existente que precise de melhoria relevante.
last_updated: 2026-04-18 05:10
---

# Implement Page

Use esta skill quando a tarefa for criar, revisar ou evoluir uma `page` ou rota do projeto.

Ela existe para organizar a execução de mudanças que cruzam rota, layout, composição de UI, estados de tela, integrações e documentação.

## Quando usar

Use esta skill quando:

- uma nova rota ou page precisa ser criada;
- uma page existente precisa ser melhorada;
- a jornada da tela mudou;
- a page depende de integracao Notion, `specs.md` ou referencia visual;
- a implementacao esta correta tecnicamente, mas a composicao da page ainda precisa ser saneada.

## Leitura obrigatória

Sempre comece por:

1. `docs/patterns/aplicacao.md`
2. `docs/patterns/pages.md`
3. `docs/patterns/documentacao.md`

Depois, carregue também:

- `docs/patterns/specs.md`
- `docs/patterns/componentes.md`, quando a page depender de componentes relevantes;
- `docs/patterns/tipagem.md`, quando a page tocar tipos de fluxo;
- docs do domínio, quando a page pertencer a um fluxo vivo.

## Entradas

O contexto ideal inclui:

- codigo da page alvo;
- componentes usados ou candidatos a extracao;
- funcoes Notion usadas (`getDatabaseItems`, `getPageById`, `getAllBlockChildren`);
- `specs.md` da page, quando existir;
- referencia visual, quando existir.

## Sequência recomendada

1. Leia o código atual da page e entenda sua responsabilidade no fluxo.
2. Verifique a rota, a jornada esperada e a composição atual da tela.
3. Cruze o comportamento com stores, services, specs e referência visual.
4. Implemente a criação ou melhoria da page.
5. Ajuste ou crie `specs.md` quando fizer sentido.
6. Termine com a checagem final em `docs/patterns/documentacao.md`.

## O que esta skill deve verificar

### Estrutura e responsabilidade

- a page e um RSC assincrono (`async function Page`)?
- a page busca dados do Notion via `src/lib/notion/` diretamente (sem client fetching)?
- a responsabilidade entre `page` e `component` continua clara?
- nao ha acoplamento desnecessario com componentes muito especificos?

### Jornada e estados

- a sequência principal da tela continua compreensível;
- loading, vazio, erro e confirmação aparecem quando deveriam;
- ações principais estão visíveis e coerentes;
- a tela responde aos estados do fluxo sem contradição.

### Relação com specs e referência visual

- a implementação respeita a `specs.md`, quando existir;
- a `specs.md` ainda representa o comportamento real da page;
- a hierarquia visual importante continua clara;
- o Figma, quando existir, está sendo respeitado no que importa para manutenção.

## Saída esperada

Uma execucao bem fechada desta skill deve terminar com:

1. page RSC assincrona e funcional;
2. dados buscados do Notion corretamente tipados;
3. jornada principal compreensivel;
4. integracao saudavel com componentes de `frames/` e `shared/`;
5. `specs.md` e docs atualizadas quando aplicavel.

## O que esta skill não deve fazer

Esta skill não deve:

- usar a page para esconder problema de arquitetura maior sem registrar isso;
- insistir em fidelidade visual desnecessária quando o fluxo for o ponto principal;
- transformar toda melhoria de page em refatoração ampla;
- ignorar docs vivos do domínio quando a page fizer parte de um fluxo documentado.
