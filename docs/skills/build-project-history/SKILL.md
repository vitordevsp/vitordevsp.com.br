---
name: build-project-history
description: Criar, revisar ou evoluir um arquivo project-history.md de projeto, módulo ou área relevante, organizando visão, objetivo, escopo, funcionamento, entregas e contexto de manutenção com base em código, planos, docs e histórico real. Use quando a tarefa exigir um documento de contexto estrutural mais estável do que um plano e mais amplo do que um doc de domínio.
last_updated: 2026-04-18 17:45
---

# Build Project History

Use esta skill quando a tarefa for criar, revisar ou evoluir um `project-history.md`.

Ela existe para transformar contexto espalhado em um documento de referência que explique o que um projeto, módulo ou frente realmente é, o que ele resolve e como deve ser entendido antes de novas mudanças.

## Quando usar

Use esta skill quando:

- um projeto ou módulo precisa de um documento estrutural de visão e contexto;
- existe muita informação dispersa entre código, planos, specs e histórico oral;
- o fluxo funcional depende de um entendimento amplo do sistema, e não só de um domínio isolado;
- um projeto consumidor precisa absorver rapidamente o contexto vindo de outro projeto, como no caso do `studio.coding`;
- o documento precisa servir tanto para manutenção humana quanto para uso por IA.

## Quando nao usar

Nao use esta skill quando:

- o conteúdo deveria ser um `product-history.md` de domínio;
- a necessidade real é um `plan`;
- o documento seria só um changelog;
- a mudança é pequena demais para justificar um artefato estrutural de contexto.

## Leitura obrigatoria

Sempre comece por:

1. `docs/patterns/taxonomia-framework.md`
2. `docs/patterns/documentacao.md`
3. `docs/plans/README.md`, quando houver planos ativos relacionados

Depois, carregue conforme o caso:

- `README.md` do projeto ou módulo;
- planos ativos;
- `specs.md` relevantes;
- docs vivos do domínio;
- `CHANGELOG.md`, se existir;
- histórico recente de commits, quando isso ajudar a consolidar evolução real.

## Pergunta principal antes de criar

Antes de escrever, responder:

`este contexto precisa de um documento estrutural relativamente estável sobre o projeto, ou está melhor representado por um plano, por docs vivos de domínio ou por um changelog?`

## O que um bom project-history deve cobrir

Um `project-history.md` costuma ser útil quando explica:

- o que o projeto ou módulo resolve;
- por que ele existe;
- quais camadas ou partes o compõem;
- como o fluxo principal funciona;
- que frentes estruturam sua evolução;
- quais limites, dependências e decisões moldam sua manutenção;
- que tipo de mudança costuma exigir mais cuidado.

## O que esta skill deve cruzar

- código real do projeto ou módulo;
- `README.md` e docs estruturais;
- planos relevantes;
- specs locais;
- docs vivos de domínio;
- histórico de mudanças quando ele ajudar a separar contexto durável de detalhe transitório.

## Sequência recomendada

1. Identifique o recorte do `project-history.md`: projeto inteiro, módulo ou área relevante.
2. Leia o código e a documentação estrutural antes de olhar só para o histórico.
3. Cruze os planos e docs vivos que ajudam a explicar o estado atual.
4. Escreva ou atualize o `project-history.md` com foco em contexto durável.
5. Evite transformar o documento em changelog, plano ou dump de decisões soltas.
6. Valide se o resultado realmente ajuda alguém novo a entender o sistema mais rápido.

## Estrutura sugerida

Se fizer sentido, usar seções como:

- objetivo do projeto ou módulo
- contexto
- o que ele resolve
- composição principal
- fluxo ou funcionamento geral
- dependências e limites
- frentes relevantes de evolução
- referências

## Saída esperada

Uma execução bem fechada desta skill deve terminar com:

1. `project-history.md` criado ou atualizado;
2. distinção clara entre contexto estrutural, plano e changelog;
3. referências úteis para continuar a manutenção;
4. documento legível tanto para onboarding humano quanto para uso por agente.

## O que esta skill nao deve fazer

Esta skill nao deve:

- copiar `product-history.md` de um domínio e renomear para `project-history.md`;
- transformar o documento em backlog;
- recontar todo o histórico de commits sem curadoria;
- substituir `README.md`, `plan` ou docs vivos quando cada um deles já for a fonte correta.
