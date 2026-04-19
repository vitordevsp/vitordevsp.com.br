---
name: patterns-review
description: Revisar se uma implementação está coerente com os patterns oficiais do projeto, incluindo camadas, nomenclatura, contratos, specs e documentação impactada. Use depois que o código já funciona e o objetivo restante é o fechamento estrutural e documental.
last_updated: 2026-04-18 05:10
---

# Patterns Review

Use esta skill quando a implementação já existe e o próximo passo é verificar se ela terminou coerente com os patterns oficiais do projeto.

## Leitura obrigatória

Carregue os patterns relevantes antes de revisar:

- `docs/patterns/componentes.md`
- `docs/patterns/pages.md`
- `docs/patterns/stores.md`
- `docs/patterns/services.md`
- `docs/patterns/tipagem.md`
- `docs/patterns/documentacao.md`
- `docs/patterns/specs.md`, quando houver artefato com `specs.md` ou dúvida sobre sua necessidade
- `docs/patterns/logging.md`, quando a mudança tocar observabilidade

Também carregue docs do domínio quando existirem.

## Entradas

O contexto ideal inclui:

- diff ou arquivos alterados
- domínio ou fluxo afetado
- patterns relevantes
- docs vivos do domínio

## O que revisar

### Estrutura e responsabilidade

Verifique se:

- cada responsabilidade ficou na camada correta
- o domínio continua concentrando seu próprio contexto
- `service`, `store`, `components`, `pages` e `libs` não trocaram papéis sem motivo claro
- a mudança foi mantida o mais local possível

### Nomenclatura e contratos

Verifique se:

- nomes de arquivo, função, tipo, interface e action fazem sentido no domínio
- a tipagem ainda respeita a organização entre `schemas.ts`, `types.ts` e contratos da store
- a ordem de declaração pai -> filho continua coerente quando contratos foram tocados

### Documentação

Verifique se:

- `specs.md` existe quando o artefato precisa de leitura em linguagem natural
- docs do domínio foram atualizados quando a mudança foi funcional, estrutural ou contratual
- o README do domínio continua navegável
- `docs/patterns/documentacao.md` foi usado como validação final de documentação
- não existe contradição clara entre código, specs e docs vivos

### Logging

Quando aplicável, verifique se:

- os logs estão na camada correta
- não existe ruído excessivo
- não existe logging duplicado sem ganho de rastreabilidade

## Saída esperada

Retorne um resultado objetivo com:

1. aderências confirmadas aos patterns
2. desvios restantes
3. arquivos que ainda precisam de ajuste antes do fechamento
4. docs que ainda precisam ser atualizadas
5. riscos residuais, se existirem

Se tudo estiver coerente, diga explicitamente que a implementação está aderente aos patterns revisados.

## Checklist final

- a mudança respeita a arquitetura por camadas e por domínio
- a responsabilidade ficou no lugar certo
- nomes e contratos continuam coerentes
- `specs.md` e docs impactadas foram atualizados
- o README e a navegação do domínio continuam claros
- logs, quando presentes, estão no lugar certo
