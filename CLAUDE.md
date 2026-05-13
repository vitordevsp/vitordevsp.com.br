# CLAUDE.md

Orienta o Claude Code no projeto `site-vitorsampaio`, site pessoal de Vitor Sampaio. O projeto será reconstruído do zero como presença pública, portfólio, blog técnico e jardim digital, guiado por documentação em `docs/`. Notion é o CMS editorial: consumir dados no servidor, normalizar em modelos internos, renderizar UI sem acoplar ao formato bruto da API.

## Regra principal

Antes de implementar qualquer código de aplicação, leia a documentação relevante em `docs/`. Se faltar ou estiver incompleta, não invente decisões estruturais — registre a lacuna e aguarde definição explícita.

Estado atual: foco é criar a camada documental. Não implemente aplicação sem instrução explícita.

## Stack e restrições

* Next.js + TypeScript, server-first / RSC-first.
* Notion como CMS editorial.
* CSS Modules como padrão de estilização.
* Sem Tailwind, Chakra UI, backend próprio, autenticação ou estado global no MVP.
* UI não depende de tipos brutos do Notion.
* Evitar (sem decisão explícita): banco próprio, autenticação, painel admin, estado global, backend dedicado, busca semântica, comentários, automações complexas.

## Regras de implementação

* Server Components por padrão; Client Components só com interação real no navegador.
* Não adicionar `"use client"` em páginas sem necessidade.
* Não expor tokens, secrets ou variáveis sensíveis no client.
* Não criar stores globais sem justificativa documentada.
* Não instalar bibliotecas grandes sem necessidade clara.
* Não recriar código, padrões ou estruturas antigas do projeto apagado; nenhuma camada legacy.

## Workflow por tarefa

1. Identifique documentos em `docs/` que governam a mudança e leia antes de alterar arquivos.
2. Plano curto com arquivos afetados.
3. Menor mudança suficiente.
4. Rode validações disponíveis.
5. Atualize documentação apenas se a mudança alterar decisão, contrato ou comportamento relevante.

Comandos finais ainda não definidos. Quando o projeto Next.js existir, prefira `npm run lint`, `npm run build`, `npx tsc --noEmit` — verificar `package.json` antes de assumir que existem.

## Enquanto `docs/` está em construção

Permitido: criar diretórios e arquivos Markdown solicitados; preencher documentos quando solicitado.

Proibido: criar código de aplicação junto com documentação; instalar dependências; alterar build; criar estrutura em `src/` sem solicitação explícita.

## Estrutura documental

```txt
docs/
  README.md           Índice + decisões consolidadas + restrições MVP
  product.md          Visão, posicionamento, princípios, sitemap
  content-model.md    Modelos internos canônicos
  roadmap.md          Fases de evolução
  architecture.md     Arquitetura geral e organização frontend
  notion.md           Integração Notion + referência das databases
  styling.md          Padrão de estilos (CSS Modules)
  agents.md           Guia para agentes (instruções, workflow, DoD)
  decisions/
    ADR-001-rebuild-from-zero.md
    ADR-002-notion-as-cms.md
    ADR-003-digital-garden-as-core-product.md
    ADR-004-rsc-first-frontend.md
    ADR-005-css-modules.md
```

## Estilo da documentação e prioridades

Documentos devem ser objetivos, normativos, úteis para humanos e agentes, em português, sem tom promocional, sem explicações óbvias, organizados com títulos, listas e exemplos mínimos.

Prioridades do site: presença pública autoral, publicação contínua de ideias, portfólio de projetos, jardim digital navegável, clareza para humanos e agentes de IA, manutenção simples.
