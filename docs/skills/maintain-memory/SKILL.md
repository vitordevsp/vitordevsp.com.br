---
name: maintain-memory
description: Criar, revisar ou evoluir memorias locais do projeto em diferentes camadas, como MEMORY.md da raiz, MEMORY.md de subpastas ou memorias de contexto em docs especificos. Use quando a tarefa exigir consolidar aprendizados reaproveitaveis sem promovê-los cedo demais para patterns, plans ou instrucoes estaveis.
last_updated: 2026-04-18 16:38
---

# Maintain Memory

Use esta skill quando a tarefa for criar, revisar ou evoluir uma memoria local do projeto.

Ela existe para tratar memoria como camada propria de contexto reaproveitavel, sem confundir esse papel com `pattern`, `plan`, `resource`, `README` ou instrucoes estaveis como `CLAUDE.md`.

## Quando usar

Use esta skill quando:

- uma sessao gerou aprendizados pequenos, mas reaproveitaveis;
- uma camada local precisa de memoria propria, como a raiz do projeto ou `docs/product/notion/`;
- existe duvida se um aprendizado deve continuar como memoria ou subir para um artefato mais estavel;
- uma memoria local ja existe, mas precisa de curadoria, reorganizacao ou limpeza;
- o contexto acumulado de uma area esta ficando oral demais e precisa ser preservado.

## Quando nao usar

Nao use esta skill quando:

- a informacao ja e claramente uma regra estavel e deveria virar `pattern` ou entrar em `CLAUDE.md`;
- a necessidade real e um `plan`;
- o conteudo e apenas referencia auxiliar e deveria virar `resource`;
- o arquivo local deveria ser um `README.md` ou um doc vivo funcional do dominio.

## Leitura obrigatoria

Sempre comece por:

1. `docs/patterns/taxonomia-framework.md`
2. `docs/patterns/documentacao.md`
3. `docs/skills/README.md`

Depois, carregue conforme o caso:

- `MEMORY.md` da raiz, quando o contexto for do projeto inteiro;
- `MEMORY.md` da camada local, quando existir;
- `README.md` da camada local;
- planos relacionados;
- `CLAUDE.md`, quando a memoria tocar instrucoes estaveis;
- docs vivos do dominio, quando a memoria estiver dentro de um contexto funcional especifico.

## Casos comuns de uso

### 1. Memoria da raiz

Use quando o projeto precisar preservar:

- reforcos operacionais pequenos;
- aprendizados de sessao;
- sinais recorrentes de conflito entre pedido e padrao do repositorio;
- decisoes pequenas que ainda nao viraram regra estavel.

Exemplo:

- `MEMORY.md` na raiz

### 2. Memoria de uma camada documental

Use quando uma subpasta do projeto precisar preservar:

- ownership local;
- regras de operacao daquela camada;
- aprendizados recorrentes que nao devem poluir a memoria global.

Exemplos:

- `docs/product/notion/MEMORY.md`
- memorias futuras de outras camadas documentais, se fizer sentido

### 3. Memoria de modulo ou area

Use quando um modulo ou area complexa:

- ainda nao merece um `pattern`;
- precisa preservar contexto entre ciclos;
- se beneficiaria de uma memoria local antes de consolidar regras maiores.

## Pergunta principal antes de criar ou manter

Antes de escrever, responder:

`isso precisa continuar como memoria local, ou ja amadureceu o suficiente para virar pattern, plano, recurso ou instrucao estavel?`

## Sequência recomendada

1. Identifique a camada da memoria: raiz, docs local, dominio ou outra area.
2. Leia a memoria local e os docs que ja definem a fronteira dela.
3. Classifique cada item como:
   - permanece em memoria;
   - sobe para `CLAUDE.md`;
   - sobe para `pattern`;
   - sobe para `plan`;
   - vira `resource`;
   - pode ser removido.
4. Atualize a memoria de forma curta e navegavel.
5. Registre em plano relacionado o aprendizado consolidado, quando houver.

## O que esta skill deve verificar

- se a memoria continua curta e util;
- se existem itens especificos demais de uma unica sessao;
- se ha duplicacao com `CLAUDE.md`, `patterns`, `plans` ou `README.md`;
- se a camada local realmente precisa de memoria propria;
- se o arquivo esta funcionando como memoria e nao como dump de contexto.

## Saída esperada

Uma execucao bem fechada desta skill deve terminar com:

1. memoria local criada ou atualizada;
2. fronteira clara entre memoria e artefatos mais estaveis;
3. itens promovidos quando necessario;
4. contexto reaproveitavel preservado sem inflar a documentacao.

## O que esta skill nao deve fazer

Esta skill nao deve:

- transformar qualquer observacao pequena em memoria permanente;
- usar memoria local como substituto de `pattern`;
- criar memorias em cascata sem necessidade real;
- competir com `README.md`, `plan` ou docs vivos de dominio;
- manter historico morto apenas por apego.
