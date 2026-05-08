# Workflow para Agentes

Este documento define o fluxo de trabalho esperado para agentes de IA no `site-vitorsampaio`.

## Objetivo

Garantir que mudanças sejam feitas com contexto, escopo controlado e alinhamento com a documentação do projeto.

## Fluxo padrão

```txt
1. Entender a tarefa
2. Ler documentação relevante
3. Identificar arquivos afetados
4. Planejar a mudança
5. Executar a menor alteração suficiente
6. Validar
7. Atualizar documentação, se necessário
8. Reportar resultado
```

## 1. Entender a tarefa

Antes de alterar arquivos:

* identifique o objetivo real;
* separe pedido explícito de inferência;
* verifique se é documentação, código, refatoração ou investigação;
* identifique riscos de escopo;
* não amplie a tarefa sem necessidade.

## 2. Ler documentação relevante

Sempre comece por:

```txt
docs/README.md
```

Depois leia os documentos da área afetada.

### Produto

```txt
docs/product/vision.md
docs/product/principles.md
docs/product/information-architecture.md
docs/product/content-model.md
docs/product/roadmap.md
```

### Arquitetura

```txt
docs/architecture/overview.md
docs/architecture/frontend.md
docs/architecture/notion-cms.md
docs/architecture/styling.md
```

### Agentes

```txt
docs/agent/instructions.md
docs/agent/workflow.md
docs/agent/definition-of-done.md
```

### Decisões

```txt
docs/decisions/
```

### Referências

```txt
docs/reference/notion-databases.md
```

## 3. Identificar arquivos afetados

Antes de editar, liste mentalmente ou na resposta:

* arquivos que serão criados;
* arquivos que serão alterados;
* arquivos que precisam ser consultados;
* arquivos que não devem ser tocados.

Evite buscas ou leituras massivas sem necessidade.

## 4. Planejar a mudança

Para tarefas simples, o plano pode ser curto.

Para tarefas maiores, descreva:

* objetivo;
* arquivos afetados;
* ordem de execução;
* validações previstas;
* riscos ou lacunas.

Não transforme o plano em documentação extensa se a tarefa for pequena.

## 5. Executar a menor alteração suficiente

Durante a execução:

* faça mudanças pequenas;
* preserve conteúdo existente;
* evite reescrever arquivos inteiros sem necessidade;
* não misture refatoração com feature sem pedido explícito;
* não instale dependências sem justificativa;
* não crie estrutura vazia sem uso real;
* não implemente escopo futuro.

## 6. Validar

Verifique quais comandos existem antes de rodar.

Possíveis validações:

```bash
npm run lint
npm run build
npx tsc --noEmit
```

Se a tarefa for apenas documentação, validações podem ser:

```bash
find docs -maxdepth 3 -type f | sort
```

ou:

```bash
tree docs
```

Não declare validações que não foram executadas.

## 7. Atualizar documentação, se necessário

Atualize documentação quando a mudança alterar:

* decisão técnica;
* estrutura de pastas;
* modelo de conteúdo;
* fluxo de dados;
* integração externa;
* padrão de estilos;
* regra de implementação;
* comportamento relevante do produto.

Não atualize documentação por mudanças triviais.

## 8. Reportar resultado

A resposta final deve incluir:

* resumo objetivo do que foi feito;
* arquivos criados ou alterados;
* validações executadas;
* pendências, se existirem.

Exemplo:

```txt
Criado:
- docs/product/content-model.md

Validação:
- tree docs

Pendências:
- preencher referência das databases do Notion.
```

## Fluxo para criação de documentação

Quando a tarefa for criar documentação:

1. Confirmar o arquivo alvo.
2. Manter tom objetivo e normativo.
3. Evitar conteúdo promocional.
4. Não repetir explicações já cobertas em outros docs.
5. Linkar documentos relacionados quando útil.
6. Registrar decisões, não apenas intenção genérica.

## Fluxo para criação de código

Quando a tarefa for implementar código:

1. Ler docs relevantes.
2. Verificar estrutura atual do projeto.
3. Identificar domínio afetado.
4. Criar ou alterar feature correspondente.
5. Usar integração server-side quando envolver Notion.
6. Retornar modelos internos para UI.
7. Usar CSS Modules para estilos.
8. Validar TypeScript/build/lint quando disponíveis.

## Fluxo para integração com Notion

Quando a tarefa envolver Notion:

1. Ler `docs/architecture/notion-cms.md`.
2. Ler `docs/reference/notion-databases.md`.
3. Identificar database e modelo interno.
4. Criar query server-side.
5. Criar mapper.
6. Filtrar conteúdo público.
7. Normalizar slug, datas, tags e imagens.
8. Expor apenas modelo interno para feature/UI.

## Fluxo para componentes

Quando a tarefa envolver componente de UI:

1. Verificar se é componente de feature ou shared.
2. Criar componente no local correto.
3. Usar CSS Module co-localizado.
4. Evitar dependência de dados brutos do Notion.
5. Definir props explícitas.
6. Prever estados básicos quando necessário.
7. Evitar `"use client"` sem interação real.

## Fluxo para páginas

Quando a tarefa envolver página:

1. Confirmar rota em `docs/product/information-architecture.md`.
2. Identificar feature relacionada.
3. Buscar dados no servidor.
4. Compor UI com componentes de feature/shared.
5. Definir metadata quando possível.
6. Manter página como Server Component, salvo necessidade real.

## Fluxo para estilos

Quando a tarefa envolver estilos:

1. Ler `docs/architecture/styling.md`.
2. Usar CSS Modules.
3. Usar tokens globais quando existirem.
4. Evitar estilos globais para componentes.
5. Usar `data-*` para variantes quando apropriado.
6. Preservar foco visível e acessibilidade básica.

## Quando parar e pedir definição

Pare antes de implementar se a tarefa exigir decisão sobre:

* nova dependência estrutural;
* mudança de arquitetura;
* introdução de backend;
* autenticação;
* estado global;
* mudança de CMS;
* alteração grande no sitemap;
* regra de publicação privada/pública;
* acesso a dados sensíveis.

## Quando criar ADR

Crie ou atualize ADR quando houver decisão durável sobre:

* stack;
* arquitetura;
* CMS;
* renderização;
* estilo;
* dependências estruturais;
* modelo de dados;
* infraestrutura.

## O que evitar

* Executar antes de ler contexto.
* Fazer mudanças amplas sem plano.
* Reescrever documentação inteira sem necessidade.
* Misturar várias tarefas em uma entrega.
* Criar abstrações não solicitadas.
* Instalar dependências por conveniência.
* Implementar roadmap futuro antes da base.
* Declarar validações não executadas.

## Critério de sucesso

O workflow foi seguido corretamente quando:

* a tarefa foi compreendida;
* os docs relevantes foram considerados;
* a mudança ficou dentro do escopo;
* os arquivos alterados têm relação direta com o pedido;
* validações foram executadas ou justificadas;
* pendências ficaram explícitas;
* a documentação continua coerente com o código.
