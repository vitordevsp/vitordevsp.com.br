# Logging

## Objetivo

Definir quando e como usar logs neste projeto, que nao possui biblioteca de logging dedicada.

## Quando consultar este arquivo

Consulte este arquivo quando for:

- decidir se um ponto do codigo precisa de log;
- revisar logs existentes antes de commitar;
- avaliar se um log deve ou nao ir para producao.

## Fonte da verdade e limites do documento

Este arquivo cobre:

- quando logar;
- quando nao logar;
- como tratar logs antes de commitar.

## Regras principais

- Este projeto nao possui biblioteca de logging dedicada.
- Usar `console.log`, `console.warn` e `console.error` apenas para diagnostico em desenvolvimento.
- Nao deixar `console.log` em codigo que vai para producao — remover antes de commitar.
- `console.error` pode ser mantido em catches de erros criticos, desde que o contexto seja claro.
- Nao logar em render de componente ou page — apenas em acoes e eventos pontuais.

## Quando logar (apenas em desenvolvimento)

- Inicio e retorno de chamadas ao Notion para diagnosticar problemas de integracao.
- Erros de parsing de slug ou ID de pagina Notion.
- Valores inesperados em propriedades Notion.

## Quando nao logar

- Render de componente ou page.
- Fluxos normais que funcionam como esperado.
- Dados completos de resposta do Notion (evitar expor tokens e IDs em console).

## Checklist de revisao antes de commitar

- ha `console.log` que ficou de debug?
- os `console.error` que restaram tem contexto suficiente para entender o erro?
- nenhum dado sensivel (token, ID privado) esta sendo logado?

## Relacao com outros patterns

- [`services.md`](./services.md) define onde a integracao com o Notion acontece — ponto mais comum de necessidade de log de diagnostico.
- [`documentacao.md`](./documentacao.md) define a estrategia geral de documentacao.
