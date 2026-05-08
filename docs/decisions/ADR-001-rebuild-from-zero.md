# ADR-001 — Reconstruir o projeto do zero

## Status

Aceita.

## Contexto

O `site-vitorsampaio` existia como site pessoal, blog técnico e portfólio usando Notion como CMS.

A estrutura anterior acumulou decisões, migrações e camadas legadas que dificultavam manutenção e evolução.

Problemas principais:

* documentação misturando produto, arquitetura e planos antigos;
* integração Notion moderna e legacy coexistindo;
* estrutura de código pouco alinhada à visão atual do produto;
* planos de refatoração baseados no estado antigo;
* dificuldade para orientar agentes de IA com clareza;
* acúmulo de contexto obsoleto.

O objetivo atual é reconstruir o projeto com uma base mais clara, documentada e adequada para desenvolvimento assistido por IA.

## Decisão

O projeto será reconstruído do zero.

A nova base deve começar pela documentação em `docs/`, antes da implementação da aplicação.

Planos, estruturas e decisões antigas não devem ser tratados como fonte normativa, exceto quando forem explicitamente reaproveitados na nova documentação.

## Consequências

### Positivas

* Reduz dívida técnica herdada.
* Elimina sistemas legacy.
* Permite criar arquitetura alinhada ao produto atual.
* Facilita uso de Claude Code e outros agentes.
* Torna decisões explícitas desde o início.
* Evita carregar padrões antigos por inércia.

### Negativas

* Exige recriação de estrutura inicial.
* Pode atrasar a entrega pública no curto prazo.
* Requer nova documentação antes de implementar.
* Exige cuidado para não perder decisões úteis do projeto anterior.

## Regras derivadas

* Não recriar estrutura antiga automaticamente.
* Não recriar integração Notion legacy.
* Não migrar planos antigos como fonte normativa.
* Não implementar aplicação antes de consolidar a base documental inicial.
* Reaproveitar apenas decisões explicitamente registradas nos novos documentos.

## Decisões preservadas

Algumas decisões continuam válidas e devem ser preservadas:

* Notion como CMS editorial;
* site como presença pública e jardim digital;
* renderização server-first;
* TypeScript;
* CSS Modules;
* ausência de backend próprio no MVP;
* ausência de autenticação no MVP;
* ausência de estado global no MVP.

## Decisões descartadas

Decisões antigas que não devem ser recriadas por padrão:

* sistema Notion legacy;
* múltiplos tokens por causa de migração antiga;
* estrutura antiga de `components/frames/shared` como regra obrigatória;
* barrel export global obrigatório;
* planos numerados antigos como fonte de execução;
* Chakra UI;
* qualquer estrutura criada apenas para compatibilidade com o projeto apagado.

## Alternativas consideradas

### Refatorar incrementalmente

Manter o projeto antigo e seguir refatorando por planos.

Rejeitada porque manteria contexto legacy, dupla integração e documentação defasada.

### Criar projeto novo sem documentação prévia

Começar direto pela implementação.

Rejeitada porque o objetivo também é testar desenvolvimento assistido por IA com contexto bem estruturado.

### Migrar documentação antiga inteira

Copiar os documentos anteriores para a nova base.

Rejeitada porque parte significativa do conteúdo era histórico, operacional ou obsoleto.

## Critério de sucesso

Esta decisão será bem-sucedida se:

* a nova estrutura começar simples e coerente;
* os documentos em `docs/` orientarem a implementação;
* o código não reintroduzir estruturas legadas;
* a integração com Notion for única e server-side;
* agentes conseguirem trabalhar no projeto sem depender do contexto antigo.
