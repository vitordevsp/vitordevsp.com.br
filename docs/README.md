# Documentação — site-vitorsampaio

Este diretório concentra as decisões de produto, arquitetura e operação do projeto `site-vitorsampaio`.

A documentação deve guiar humanos e agentes de IA durante a reconstrução do site. Antes de implementar funcionalidades, alterar arquitetura ou adicionar dependências, consulte os documentos relevantes em `docs/`.

## Objetivo do projeto

`site-vitorsampaio` é o site pessoal de Vitor Sampaio.

O projeto será reconstruído do zero para funcionar como:

* presença pública autoral;
* portfólio profissional;
* blog técnico;
* jardim digital;
* base pública para projetos, ideias, aprendizados e conteúdos em evolução.

O Notion será usado como CMS editorial. A aplicação deve consumir os dados no servidor, normalizar o conteúdo em modelos internos e renderizar a interface sem acoplar componentes diretamente ao formato bruto da API do Notion.

## Como usar esta documentação

Use esta pasta como fonte de verdade para decisões do projeto.

Para qualquer tarefa relevante:

1. Leia este `README.md`.
2. Identifique a área afetada: produto, arquitetura, agente, decisão ou referência.
3. Consulte os documentos específicos antes de implementar.
4. Mantenha a implementação alinhada às decisões existentes.
5. Atualize a documentação quando uma decisão, contrato ou comportamento relevante mudar.

## Estrutura da documentação

```txt
docs/
  README.md

  product/
    vision.md
    principles.md
    information-architecture.md
    content-model.md
    roadmap.md

  architecture/
    overview.md
    frontend.md
    notion-cms.md
    styling.md

  agent/
    instructions.md
    workflow.md
    definition-of-done.md

  decisions/
    ADR-001-rebuild-from-zero.md
    ADR-002-notion-as-cms.md
    ADR-003-digital-garden-as-core-product.md
    ADR-004-rsc-first-frontend.md
    ADR-005-css-modules.md

  reference/
    notion-databases.md
```

## Leituras por tipo de tarefa

### Produto, escopo e experiência

Leia:

* `docs/product/vision.md`
* `docs/product/principles.md`
* `docs/product/information-architecture.md`
* `docs/product/content-model.md`
* `docs/product/roadmap.md`

Use esses documentos para entender o que o site é, quais áreas existem, como os conteúdos são classificados e quais fases de evolução estão previstas.

### Arquitetura e implementação

Leia:

* `docs/architecture/overview.md`
* `docs/architecture/frontend.md`
* `docs/architecture/notion-cms.md`
* `docs/architecture/styling.md`

Use esses documentos para orientar estrutura de pastas, composição de páginas, integração com Notion, Server Components, Client Components e CSS Modules.

### Trabalho com agentes de IA

Leia:

* `docs/agent/instructions.md`
* `docs/agent/workflow.md`
* `docs/agent/definition-of-done.md`

Use esses documentos para guiar execução com Claude Code ou outros agentes de desenvolvimento.

### Decisões arquiteturais

Leia:

* `docs/decisions/ADR-001-rebuild-from-zero.md`
* `docs/decisions/ADR-002-notion-as-cms.md`
* `docs/decisions/ADR-003-digital-garden-as-core-product.md`
* `docs/decisions/ADR-004-rsc-first-frontend.md`
* `docs/decisions/ADR-005-css-modules.md`

Use ADRs para entender decisões já tomadas, contexto, consequências e restrições.

### Referências operacionais

Leia:

* `docs/reference/notion-databases.md`

Use este documento para consultar as bases do Notion, propriedades, modelos internos esperados e relação entre CMS e páginas do site.

## Decisões iniciais consolidadas

* O projeto será reconstruído do zero.
* A nova documentação substitui planos e estruturas antigas.
* O produto principal é um jardim digital público com presença profissional.
* O Notion será usado como CMS editorial.
* A aplicação será server-first / RSC-first.
* CSS Modules será o padrão principal de estilização.
* Tailwind não será usado no MVP.
* Chakra UI não será usado no MVP.
* Não haverá backend próprio no MVP.
* Não haverá autenticação no MVP.
* Não haverá estado global no MVP.
* A UI não deve depender diretamente dos tipos brutos da API do Notion.
* Conteúdos textuais autorais serão modelados como `TextPost`.
* Nem todo conteúdo do site é um post.
* Maturidade de conteúdo faz parte da experiência do jardim digital.

## Regras gerais para implementação

* Use Server Components por padrão.
* Use Client Components apenas quando houver interação real no navegador.
* Não adicione `"use client"` em páginas sem necessidade.
* Não exponha tokens ou variáveis sensíveis no client.
* Não instale dependências grandes sem justificativa.
* Não recrie estruturas legacy do projeto anterior.
* Não acople componentes de UI ao formato bruto do Notion.
* Não introduza backend, autenticação, banco próprio ou estado global sem decisão explícita.

## Relação entre documentação e código

A documentação deve vir antes da implementação relevante.

Quando uma decisão for tomada, ela deve ser registrada antes ou junto da mudança de código. Quando uma implementação revelar uma decisão nova, a documentação deve ser atualizada para evitar divergência entre intenção e execução.

A documentação não deve ser tratada como registro passivo. Ela é parte do sistema de desenvolvimento do projeto.

## Ordem recomendada de leitura inicial

Para entender o projeto do zero:

1. `docs/README.md`
2. `docs/product/vision.md`
3. `docs/product/principles.md`
4. `docs/product/information-architecture.md`
5. `docs/product/content-model.md`
6. `docs/architecture/overview.md`
7. `docs/architecture/frontend.md`
8. `docs/architecture/notion-cms.md`
9. `docs/agent/instructions.md`

## Status

Esta documentação está em construção.

Enquanto os documentos ainda estiverem sendo preenchidos, qualquer lacuna deve ser tratada como decisão pendente, não como permissão para o agente assumir arquitetura, dependências ou comportamento por conta própria.
