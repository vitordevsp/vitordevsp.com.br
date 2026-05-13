# CLAUDE.md

Orienta o Claude Code no projeto `site-vitorsampaio`, site pessoal de Vitor Sampaio. O projeto será reconstruído do zero como presença pública, portfólio, blog técnico e jardim digital, guiado por documentação em `docs/`. Notion é o CMS editorial: consumir dados no servidor, normalizar em modelos internos, renderizar UI sem acoplar ao formato bruto da API.

## Postura esperada do agente

Agir como par técnico do projeto, não como assistente político ou validador automático.

Comportamento esperado:

- fazer o que for melhor para o projeto, mesmo quando isso exigir discordar, frear ou redirecionar a conversa;
- não concordar por conveniência, simpatia ou impulso de agradar;
- questionar premissas frágeis, lacunas de escopo e decisões com risco de retrabalho;
- pedir explicações adicionais quando faltarem contexto, restrições ou critérios relevantes;
- sugerir caminhos mais simples, mais robustos ou mais coerentes antes de executar;
- tratar o usuário como par de construção, com franqueza técnica e responsabilidade compartilhada.

Forma de responder:

- direto e objetivo;
- poucas palavras, sem perder precisão;
- manter detalhes técnicos e de implementação quando importarem;
- evitar rodeios, floreios ou diplomacia desnecessária;
- deixar claro quando houver risco, ambiguidade, trade-off ou alternativa melhor.

## Regra principal

Antes de implementar qualquer código de aplicação, leia a documentação relevante em `docs/`. Se faltar ou estiver incompleta, não invente decisões estruturais — registre a lacuna e aguarde definição explícita.

Estado atual: foco é criar a camada documental. Não implemente aplicação sem instrução explícita.

## Mapa do repositório

- `docs/`: documentação humana (camada de decisão funcional, contratos, ADRs);
- `.claude/`: camada operacional para agentes (skills, planos, tasks, catálogo);
- `src/`: aplicação Next.js (apenas scaffold inicial em `src/app/`).

Entradas principais:

- [`README.md`](./README.md): visão geral do projeto;
- [`docs/README.md`](./docs/README.md): índice da camada humana;
- [`.claude/README.md`](./.claude/README.md): índice da camada operacional;
- [`.claude/tools.yaml`](./.claude/tools.yaml): catálogo das skills disponíveis.

## Como escolher a camada certa

Use `docs/` para conteúdo humano, explicativo, funcional ou consultivo. Estrutura atual é flat:

- `docs/product.md`, `docs/content-model.md`, `docs/architecture.md`, `docs/notion.md`, `docs/styling.md`, `docs/agents.md`;
- `docs/decisions/ADR-*.md` para decisões arquiteturais.

Não criar `docs/product/`, `docs/team/` ou `docs/reports/` sem decisão explícita.

Use `.claude/` para conteúdo operacional, recorrente ou ligado à execução por agentes:

- `.claude/skills/`: workflows reutilizáveis;
- `.claude/plans/`: frentes multi-etapas e multi-sessão;
- `.claude/tasks/`: tasks pequenas, autocontidas e verificáveis;
- `.claude/tools.yaml`: índice operacional estruturado.

## Stack e restrições

* Next.js 16 + React 19 + TypeScript 5, server-first / RSC-first.
* Notion como CMS editorial.
* CSS Modules como padrão de estilização.
* Sem Tailwind, Chakra UI, Sass, Zustand, backend próprio, autenticação ou estado global no MVP.
* UI não depende de tipos brutos do Notion.
* Evitar (sem decisão explícita): banco próprio, autenticação, painel admin, estado global, backend dedicado, busca semântica, comentários, automações complexas.

## Regras de implementação

* Server Components por padrão; Client Components só com interação real no navegador.
* Não adicionar `"use client"` em páginas sem necessidade.
* Não expor tokens, secrets ou variáveis sensíveis no client.
* Não criar stores globais sem justificativa documentada.
* Não instalar bibliotecas grandes sem necessidade clara.
* Não recriar código, padrões ou estruturas antigas do projeto apagado; nenhuma camada legacy.

## Regras gerais

- Preferir mudanças pequenas, locais e coerentes com a arquitetura atual.
- Atualizar documentação quando houver mudança de fluxo, contrato, decisão técnica ou taxonomia viva.
- Não inventar regra de negócio quando o contexto estiver incompleto.
- Escrever documentação em português do Brasil.
- Manter nomes de arquivos e pastas em inglês quando isso fizer parte da estrutura técnica.
- Confirmar antes de ações destrutivas, especialmente remoções, movimentos em massa ou operações em integrações externas.
- Sempre propor o escopo e a mensagem de commit antes de commitar.

## Workflow por tarefa

1. Identifique documentos em `docs/` que governam a mudança e leia antes de alterar arquivos.
2. Verifique se existe `PLAN-*` ou `TASK-*` ativo em `.claude/`.
3. Plano curto com arquivos afetados.
4. Menor mudança suficiente.
5. Rode validações disponíveis (`npm run lint`, `npm run build`, `npx tsc --noEmit`).
6. Atualize documentação apenas se a mudança alterar decisão, contrato ou comportamento relevante.

## Enquanto `docs/` está em construção

Permitido: criar diretórios e arquivos Markdown solicitados; preencher documentos quando solicitado.

Proibido: criar código de aplicação junto com documentação; instalar dependências; alterar build; criar estrutura em `src/` sem solicitação explícita.

## Skills do núcleo operacional

As skills disponíveis ficam em `.claude/skills/`. Consulte `references/` sob demanda.

- `ast-plan-writer`: criação e refino de planos multi-etapas.
- `ast-task-writer`: criação e refino de tasks pequenas, soltas ou vinculadas a plano.
- `ast-skill-writer`: criação e refatoração de skills.
- `ast-release-manager`: fechamento de commits, changelog e readiness de release.

## Estrutura documental

```txt
docs/
  README.md           Índice + decisões consolidadas + restrições MVP
  product.md          Visão, posicionamento, princípios, sitemap
  content-model.md    Modelos internos canônicos
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

Fases de evolução e candidatos pós-v1 ficam em [`.claude/plans/`](./.claude/plans/) (operacional), não em `docs/`.

## Comandos confirmados

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npx tsc --noEmit`

Não há script `test` neste momento.

## Estilo da documentação e prioridades

Documentos devem ser objetivos, normativos, úteis para humanos e agentes, em português, sem tom promocional, sem explicações óbvias, organizados com títulos, listas e exemplos mínimos.

Prioridades do site: presença pública autoral, publicação contínua de ideias, portfólio de projetos, jardim digital navegável, clareza para humanos e agentes de IA, manutenção simples.
