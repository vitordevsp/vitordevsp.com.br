---
name: build-resource
description: Criar, revisar ou evoluir resources de apoio estável, como mapas, referências, históricos preservados e materiais auxiliares que sustentam execução e manutenção.
last_updated: 2026-04-18 17:45
---

# Build Resource

Use esta skill quando a tarefa for criar, revisar ou evoluir um resource em `docs/resources/`.

## Quando usar

Use esta skill quando:

- o material é estável e útil como referência;
- ele apoia várias frentes, mas não organiza sozinho o fluxo;
- o conteúdo não cabe melhor em `pattern`, `plan`, `skill`, `product`, `team` ou memória;
- existe mapa, histórico ou apoio de leitura que merece preservação.

## Leitura obrigatória

1. `docs/resources/README.md`
2. `docs/patterns/taxonomia-framework.md`
3. `docs/patterns/documentacao.md`

## Sequência recomendada

1. Verifique se o caso é mesmo `resource`.
2. Defina o papel do material e seu limite.
3. Escreva o arquivo com foco em apoio reutilizável.
4. Atualize índices e planos relacionados.

## Saída esperada

1. resource criado ou evoluído;
2. relação clara com a camada que ele apoia;
3. índice de resources atualizado, quando necessário.

## O que esta skill não deve fazer

- usar `resource` como pasta genérica para qualquer sobra;
- transformar material normativo em referência passiva;
- guardar em `resources` histórias, critérios ou contratos de produto que pertencem a `docs/product/`;
- guardar em `resources` contexto de time, projeto ou ecossistema que pertence a `docs/team/`;
- esconder ali decisões que deveriam virar pattern ou plan.
