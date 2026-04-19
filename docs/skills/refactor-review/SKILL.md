---
name: refactor-review
description: Revisar a qualidade técnica depois que a implementação já funciona, com foco em nomenclatura, coesão, duplicação leve e legibilidade sem abrir uma refatoração ampla. Use como uma passada técnica leve antes do fechamento final.
last_updated: 2026-04-18 05:10
---

# Refactor Review

Use esta skill quando a implementação já estiver funcionando e você quiser uma passada técnica leve antes do fechamento.

## Entradas

O contexto ideal inclui:

- diff ou arquivos alterados
- domínio ou fluxo afetado
- código das camadas tocadas
- `specs.md` e docs vivos do domínio, quando ajudarem a explicar o comportamento esperado

## O que revisar

### Clareza de nomes

Verifique se:

- nomes de variável, função, interface, tipo e action deixam claro o seu papel
- existem nomes genéricos, ambíguos ou herdados de contexto antigo
- o vocabulário continua coerente com o domínio

### Coesão e recorte

Verifique se:

- funções não cresceram além do necessário
- helpers realmente fazem sentido como helpers
- um módulo não está concentrando responsabilidades demais
- a separação entre `service`, `store`, `component`, `page` e `lib` continua legível

### Duplicação e implementação

Verifique se:

- existe lógica duplicada que pode ser consolidada sem abstração prematura
- condicionais, mapeamentos ou transformações ficaram mais complexos do que precisavam
- algum detalhe básico de implementação pode ser simplificado sem mudar comportamento

### Tipagem e interfaces

Verifique se:

- os contratos estão claros
- existem tipos redundantes ou pouco descritivos
- o arquivo continua legível
- a implementação ainda conversa bem com os contratos existentes

## Saída esperada

Retorne um resultado objetivo com:

1. melhorias leves recomendadas
2. pontos que já estão bons o suficiente
3. inconsistências de nome, recorte ou legibilidade
4. riscos de manutenção que valem corrigir antes do fechamento

Se a implementação já estiver boa o suficiente, diga explicitamente que não foi encontrada necessidade de refatoração relevante.

## O que não fazer

Esta skill não deve:

- inventar grandes refatorações arquiteturais sem necessidade concreta
- quebrar contratos estáveis por preferência de estilo
- trocar clareza por abstração prematura
- substituir o papel da passada estrutural/documental de fechamento
