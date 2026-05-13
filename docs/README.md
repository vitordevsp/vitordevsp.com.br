# Documentação — site-vitorsampaio

Concentra decisões de produto, arquitetura e operação do projeto `site-vitorsampaio`. Guia humanos e agentes de IA durante a reconstrução. Antes de implementar, alterar arquitetura ou adicionar dependências, consulte os documentos relevantes.

## Objetivo do projeto

`site-vitorsampaio` é o site pessoal de Vitor Sampaio. Funciona como presença pública autoral, portfólio, blog técnico e jardim digital. O Notion é o CMS editorial; a aplicação consome dados no servidor, normaliza em modelos internos e renderiza UI sem acoplar ao formato bruto da API.

## Estrutura

```txt
docs/
  README.md           Este arquivo. Índice + decisões consolidadas + restrições MVP.
  product.md          Visão, posicionamento, princípios, sitemap.
  content-model.md    Modelos internos canônicos (TextPost, Project, etc.).
  architecture.md     Arquitetura geral e organização frontend.
  notion.md           Integração Notion + referência das databases.
  styling.md          Padrão de estilos (CSS Modules).
  agents.md           Guia para agentes (instruções, workflow, DoD).
  decisions/
    ADR-001-rebuild-from-zero.md
    ADR-002-notion-as-cms.md
    ADR-003-digital-garden-as-core-product.md
    ADR-004-rsc-first-frontend.md
    ADR-005-css-modules.md
```

Fases de evolução, planos multi-etapas e candidatos pós-v1 ficam em [`.claude/plans/`](../.claude/plans/).

## Onde olhar

| Tarefa                            | Documento                                                          |
| --------------------------------- | ------------------------------------------------------------------ |
| Produto, escopo, sitemap          | [`product.md`](product.md)                                         |
| Modelos de conteúdo               | [`content-model.md`](content-model.md)                             |
| Planos e fases de evolução        | [`.claude/plans/`](../.claude/plans/)                              |
| Arquitetura, código, organização  | [`architecture.md`](architecture.md)                               |
| Integração com Notion             | [`notion.md`](notion.md)                                           |
| Estilos                           | [`styling.md`](styling.md)                                         |
| Trabalhar com agentes de IA       | [`agents.md`](agents.md)                                           |
| Decisões registradas              | [`decisions/`](decisions/)                                         |

## Decisões consolidadas

* projeto reconstruído do zero — [ADR-001](decisions/ADR-001-rebuild-from-zero.md);
* Notion como CMS editorial — [ADR-002](decisions/ADR-002-notion-as-cms.md);
* jardim digital como produto central — [ADR-003](decisions/ADR-003-digital-garden-as-core-product.md);
* frontend RSC-first — [ADR-004](decisions/ADR-004-rsc-first-frontend.md);
* CSS Modules como padrão de estilos — [ADR-005](decisions/ADR-005-css-modules.md).

Decisões editoriais:

* conteúdos textuais autorais são modelados como `TextPost`;
* nem todo conteúdo do site é um post;
* maturidade de conteúdo faz parte da experiência do jardim digital;
* UI não depende dos tipos brutos da API do Notion.

## Restrições do MVP

Sem decisão explícita registrada, **não adicionar**:

* Tailwind;
* Chakra UI;
* styled-components, Emotion, CSS-in-JS;
* Zustand, Redux, Context global;
* backend próprio;
* banco de dados próprio;
* autenticação;
* painel administrativo;
* área de membros;
* pagamentos;
* sistema de comentários;
* busca semântica, embeddings, chat com IA;
* múltiplos CMS.

**Regras gerais sempre válidas**:

* Server Components por padrão; Client Components só com interação real;
* não adicionar `"use client"` em página inteira por conveniência;
* tokens e secrets ficam server-only;
* sem dependências grandes sem justificativa;
* sem estruturas legacy do projeto apagado;
* UI não recebe objetos brutos da API do Notion.

## Relação entre documentação e código

A documentação vem antes da implementação relevante. Decisão é registrada antes ou junto da mudança de código. Implementação que revelar decisão nova exige atualização da documentação.

`docs/` é parte estrutural do projeto, não registro passivo.

## Status

Documentação em construção. Lacuna é tratada como decisão pendente, não como permissão para o agente assumir arquitetura, dependências ou comportamento por conta própria.
