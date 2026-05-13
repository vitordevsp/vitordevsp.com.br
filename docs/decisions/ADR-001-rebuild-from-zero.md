# ADR-001 — Reconstruir o projeto do zero

## Status

Aceita.

## Contexto

O `site-vitorsampaio` existia como site pessoal, blog técnico e portfólio usando Notion como CMS. A estrutura anterior acumulou decisões, migrações e camadas legadas: documentação misturando produto, arquitetura e planos antigos; integração Notion moderna e legacy coexistindo; código pouco alinhado à visão atual; planos baseados em estado obsoleto; dificuldade para orientar agentes de IA.

## Decisão

Reconstruir o projeto do zero. A nova base começa pela documentação em `docs/` antes da implementação. Planos, estruturas e decisões antigas não são fonte normativa, exceto quando explicitamente reaproveitados na nova documentação.

## Decisões preservadas

* Notion como CMS editorial;
* site como presença pública e jardim digital;
* renderização server-first;
* TypeScript;
* CSS Modules;
* sem backend próprio, autenticação ou estado global no MVP.

## Decisões descartadas

* sistema Notion legacy;
* múltiplos tokens por migração antiga;
* estrutura antiga de `components/frames/shared` como regra obrigatória;
* barrel export global obrigatório;
* planos numerados antigos como fonte de execução;
* Chakra UI;
* estruturas criadas só para compatibilidade com o projeto apagado.

## Consequências

Positivas: reduz dívida, elimina legacy, alinha arquitetura ao produto atual, facilita uso de agentes, decisões explícitas desde o início.

Negativas: exige recriação de estrutura inicial, pode atrasar entrega pública, exige nova documentação antes de implementar.

## Alternativas consideradas

* **Refatorar incrementalmente** — rejeitada por manter contexto legacy, dupla integração e documentação defasada.
* **Projeto novo sem documentação prévia** — rejeitada porque o objetivo inclui testar desenvolvimento assistido por IA com contexto estruturado.
* **Migrar documentação antiga inteira** — rejeitada porque parte significativa era histórica ou obsoleta.
