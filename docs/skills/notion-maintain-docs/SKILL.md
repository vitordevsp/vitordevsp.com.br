---
name: notion-maintain-docs
description: Manter viva a camada docs/notion como adapter específico de Notion, cruzando MCP, memoria do dominio, iniciativas clonadas e planos relacionados para evoluir data sources, memoria e referencias locais sem transformar a pasta em espelho cego do workspace.
last_updated: 2026-04-18 23:09
---

# Notion Maintain Docs

Use esta skill quando a tarefa for manter, evoluir ou reorganizar a camada `docs/product/notion/`.

Ela existe para evitar que a documentacao local do Notion envelheca, se fragmente ou vire uma copia desgovernada do workspace.

Esta skill é específica do adapter Notion. Se o projeto estiver usando Azure Boards, Linear ou gestão local pelos próprios docs, use esta skill apenas como referência conceitual e adapte a execução ao contexto real.

## Quando usar

Use esta skill quando:

- uma mudanca no workspace do Notion precisa ser refletida em `docs/product/notion/`;
- a pasta `docs/product/notion/` precisa ganhar novos arquivos estruturais;
- `framework.md`, `data-sources.md`, `README.md` ou `MEMORY.md` precisam ser revisados;
- uma frente de plano trouxe aprendizados que devem ser promovidos para a camada documental do Notion;
- referencias cruzadas entre `docs/product/notion/`, planos e iniciativas clonadas precisam ser sincronizadas.

## Quando nao usar

Nao use esta skill quando:

- a tarefa e clonar uma iniciativa especifica do Notion;
- a tarefa e escrever ou atualizar o conteudo de tasks especificas;
- a mudanca deveria virar `pattern`, e nao doc operacional do Notion;
- a demanda e apenas consultar informacao pontual sem manter a camada viva.

## Leitura obrigatoria

Sempre comece por:

1. `docs/product/notion/README.md`
2. `docs/product/notion/MEMORY.md`
3. `docs/skills/README.md`
4. `docs/patterns/documentacao.md`

Depois, carregue apenas o necessario entre:

- `docs/product/notion/framework.md`
- `docs/product/notion/data-sources.md`
- `docs/product/notion/iniciativas/README.md`
- planos que estejam dirigindo a mudanca atual

## Entradas principais

- pagina, database ou data source do Notion relevante para a atualizacao;
- estado atual dos arquivos em `docs/product/notion/`;
- memoria acumulada da camada;
- planos ativos que estejam dirigindo a mudanca.

## Sequencia recomendada

1. Confirmar se a mudanca pertence a `docs/product/notion/` e nao a uma skill ou plano especifico.
2. Ler a memoria da camada antes de alterar regras ja estabilizadas.
3. Usar o MCP do Notion para buscar a fonte de verdade atual quando a informacao vier do workspace.
4. Decidir onde cada atualizacao deve morar:
   - `README.md` para navegacao da camada;
   - `framework.md` para organizacao conceitual do sistema;
   - `data-sources.md` para semantica dos data sources;
   - `iniciativas/` para snapshots navegaveis;
   - `MEMORY.md` para reforcos e aprendizados operacionais.
5. Atualizar referencias cruzadas com planos, skills e iniciativas quando a camada mudar.
6. Registrar no plano relacionado o que foi consolidado, quando houver plano ativo.

## O que esta skill deve verificar

- se a mudanca esta tentando transformar `docs/product/notion/` em espelho completo do workspace;
- se uma regra nova ja existe em `docs/product/notion/MEMORY.md`;
- se o aprendizado atual merece memoria, documentacao estrutural ou ambos;
- se as referencias cruzadas continuam navegaveis depois da mudanca;
- se os carimbos de `Ultima atualizacao local` estao consistentes com o padrao `AAAA-MM-DD HH:MM`.

## Saida esperada

Uma execucao bem fechada desta skill deve terminar com:

1. arquivos estruturais de `docs/product/notion/` atualizados;
2. memoria da camada consolidada quando houver aprendizado novo;
3. referencias sincronizadas com planos e iniciativas;
4. mudanca claramente atribuida a uma fonte de verdade do Notion ou a um aprendizado do repositorio.

## O que esta skill nao deve fazer

Esta skill nao deve:

- clonar iniciativa inteira quando o foco e apenas manter a camada documental;
- escrever conteudo detalhado de tasks sem um recorte explicito de task update;
- promover toda mudanca pequena para `MEMORY.md`;
- deixar regras de ownership implicitas ou contradizer a memoria da camada;
- editar o Notion diretamente quando o pedido e apenas atualizar a documentacao local.
