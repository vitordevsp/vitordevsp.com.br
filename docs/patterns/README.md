# Patterns do projeto

## Objetivo

Esta pasta concentra os patterns tecnicos do projeto.

O objetivo de `docs/patterns` e orientar como o codigo deve ser estruturado, nomeado, documentado e evoluido, com instrucoes uteis para pessoas desenvolvedoras e agentes atuando no repositorio.

## O que esta pasta cobre

`docs/patterns` deve responder principalmente:

- como organizar camadas, pastas e arquivos;
- como distribuir responsabilidades entre aplicacao, pages, components e integracao Notion;
- como escrever contratos de tipagem, documentacao e logs;
- quais convencoes devem ser mantidas ao criar codigo novo ou refatorar codigo existente.

## Estrutura

Todos os arquivos desta pasta seguem a mesma estrutura-base:

1. objetivo
2. quando consultar este arquivo
3. fonte da verdade e limites do documento
4. regras principais
5. estrutura recomendada
6. checklist de criacao ou revisao
7. relacao com outros patterns

A taxonomia oficial e por assunto, com nomes curtos e previsiveis.

## Regras da pasta

Estas regras valem para criar, revisar, juntar, dividir ou remover patterns.

### Regras principais

- A taxonomia oficial de `docs/patterns` e por assunto, nao por formato.
- Cada arquivo deve ter um tema central claro e uma unica fonte da verdade.
- Arquivos que compartilham a mesma fonte e tendem a repetir informacao devem ser consolidados.
- Um pattern novo so deve nascer quando o tema for transversal, recorrente e importante para manter qualidade no projeto.
- O nome do arquivo deve ser curto, direto e baseado no assunto principal.
- O documento deve ser util para leitura isolada, mas sem duplicar o que ja foi definido em outro pattern.
- O texto deve ajudar tanto pessoas quanto agentes a decidir onde colocar responsabilidade, como estruturar o codigo e como documentar o contexto.

### Como decidir criar, juntar, dividir ou remover um pattern

Criar um novo pattern quando:

- o tema aparece de forma recorrente em varios dominios ou camadas;
- o tema ajuda a manter qualidade, consistencia ou velocidade de implementacao;
- o tema precisa ser facilmente injetado no contexto de um agente sem carregar documentos irrelevantes.

Juntar patterns quando:

- dois arquivos compartilham a mesma fonte da verdade;
- a diferenca entre eles e mais de forma do que de assunto;
- ha repeticao frequente de conceito, checklist ou exemplos.

Dividir um pattern quando:

- o arquivo ficou grande demais para consulta rapida;
- o tema passou a misturar responsabilidades que deveriam ser independentes;
- uma pessoa ou agente precisa consultar um subtema sem carregar o restante do contexto.

Remover ou absorver um pattern quando:

- ele deixou de ser transversal;
- o conteudo foi incorporado integralmente por um pattern mais claro;
- ele sobrevive apenas por historico e nao por utilidade atual.

### Regras editoriais

- Comecar pelo que muda decisao de implementacao.
- Evitar contexto historico desnecessario quando ele nao altera a regra atual.
- Preferir bullets curtos para regras e checklists.
- Evitar repetir conceitos identicos em varios arquivos.
- Se um tema pertence oficialmente a outro pattern, resumir em uma frase e apontar para ele.
- Manter linguagem natural simples o bastante para apoiar geracao de codigo por agente.
- Explicitar limites para evitar que um arquivo vire deposito de regras de varias camadas.

### Checklist de qualidade da pasta

- o tema do arquivo e realmente transversal ao projeto?
- existe uma unica fonte da verdade clara para esse assunto?
- o nome do arquivo representa o assunto principal sem ambiguidade?
- a estrutura-base de `docs/patterns` foi respeitada?
- o documento ajuda a tomar decisao de implementacao sem ficar prolixo?
- existe duplicacao com outro pattern que deveria ser consolidada?
- o texto esta util para leitura humana e para uso em contexto de agente?
- os links cruzados apontam apenas para complementos reais?

## Relacao com o restante da documentacao

- [`../README.md`](../README.md) organiza a navegacao geral da documentacao
- [`../team/README.md`](../team/README.md) concentra contexto de projeto, ecossistema e glossario
- [`../notion/README.md`](../notion/README.md) documenta o Notion como CMS
- [`../resources/README.md`](../resources/README.md) concentra contexto complementar

## Como ler esta pasta

Ordem recomendada:

1. este `README.md`
2. [`aplicacao.md`](./aplicacao.md)
3. [`pages.md`](./pages.md)
4. [`componentes.md`](./componentes.md)
5. [`services.md`](./services.md)
6. [`tipagem.md`](./tipagem.md)
7. [`documentacao.md`](./documentacao.md)
8. [`taxonomia-framework.md`](./taxonomia-framework.md)
9. [`versionamento.md`](./versionamento.md)
10. [`specs.md`](./specs.md)
11. [`logging.md`](./logging.md)

Leitura prática por tarefa:

- criar ou revisar os próprios patterns
  - este `README.md`
  - [`documentacao.md`](./documentacao.md)
- criar ou revisar `specs.md`
  - [`specs.md`](./specs.md)
  - [`documentacao.md`](./documentacao.md)
- criar ou revisar taxonomia de framework e camadas documentais
  - [`taxonomia-framework.md`](./taxonomia-framework.md)
  - [`documentacao.md`](./documentacao.md)
- criar ou revisar versionamento, changelog e release
  - [`versionamento.md`](./versionamento.md)
  - [`documentacao.md`](./documentacao.md)
- rota e page
  - [`aplicacao.md`](./aplicacao.md)
  - [`pages.md`](./pages.md)
  - fechar em [`documentacao.md`](./documentacao.md)
- componente
  - [`componentes.md`](./componentes.md)
  - [`specs.md`](./specs.md)
  - fechar em [`documentacao.md`](./documentacao.md)
- integracao Notion e tipagem
  - [`services.md`](./services.md)
  - [`tipagem.md`](./tipagem.md)
  - fechar em [`documentacao.md`](./documentacao.md)
- observabilidade e manutencao
  - [`logging.md`](./logging.md)
  - [`documentacao.md`](./documentacao.md)

## Quando atualizar

Atualize esta pasta sempre que houver mudanca em:

- organizacao de camadas ou diretorios;
- convencoes de criacao de arquivos;
- padroes de components, integracao Notion ou tipagem;
- estrategia de documentacao tecnica;
- regras de logging.

## Regra de uso

- `docs/patterns` define como o codigo deve ser construido.
- `docs/product/notion/` documenta o Notion como CMS e os data sources disponíveis.
- [`../resources/README.md`](../resources/README.md) oferece contexto complementar.
